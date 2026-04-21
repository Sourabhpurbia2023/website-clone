'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties, FormEvent } from 'react';
import { sanitizePhoneNumberInput, validateLeadForm, type LeadFieldErrors } from '@/lib/leadValidation';

type DemoLead = {
  name: string;
  email: string;
  phone: string;
  number: string;
  message: string;
  createdAt: string;
};

const LOCAL_STORAGE_KEY = 'visaFlowDemoLeads';

export default function BookDemoModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const closeModal = useCallback(() => {
    setOpen(false);
    setError('');
    setFieldErrors({});
    if (window.location.hash === '#take-demo') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const syncFromHash = () => setOpen(window.location.hash === '#take-demo');
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [closeModal, open]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === 'phone' ? sanitizePhoneNumberInput(value) : value,
    }));
    setFieldErrors((prev) => {
      if (field === 'message') {
        return prev;
      }

      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handlePhoneKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Enter',
    ];

    if (allowedKeys.includes(event.key) || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.key === '+') {
      if ((event.currentTarget.selectionStart ?? 0) !== 0 || event.currentTarget.value.includes('+')) {
        event.preventDefault();
      }

      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const storeLeadLocally = (payload: DemoLead) => {
    try {
      const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existing: DemoLead[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // Keep form flow non-blocking if local storage fails.
    }
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const validation = validateLeadForm(form);
    if (Object.keys(validation.errors).length > 0) {
      setFieldErrors(validation.errors);
      setError('Please fix the highlighted fields.');
      return;
    }

    setSubmitting(true);
    setFieldErrors({});

    const payload: DemoLead = {
      name: validation.values.name,
      email: validation.values.email,
      phone: validation.values.phone,
      number: validation.values.phone,
      message: validation.values.message,
      createdAt: new Date().toISOString(),
    };

    storeLeadLocally(payload);

    const endpoint = process.env.NEXT_PUBLIC_DEMO_FORM_ENDPOINT?.trim() || '/api/take-demo';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        redirectUrl?: string;
        fieldErrors?: LeadFieldErrors;
      };

      if (!response.ok || !result.success) {
        setSubmitting(false);
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setError(result.message || 'Could not save your details. Please try again.');
        return;
      }

      const finalRedirect = result.redirectUrl?.trim();
      if (!finalRedirect) {
        setSubmitting(false);
        setError('Demo URL is not configured yet. Please set NEXT_PUBLIC_VISAFLOW_DEMO_URL or VISAFLOW_DEMO_URL.');
        return;
      }

      window.location.href = finalRedirect;
      return;
    } catch {
      // Local storage backup ensures no data loss for basic lead capture.
      setSubmitting(false);
      setError('Network issue while submitting details. Please try again.');
      return;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ y: 14, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '560px',
              background: '#ffffff',
              borderRadius: '18px',
              boxShadow: '0 20px 70px rgba(2, 6, 23, 0.35)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '22px 24px', borderBottom: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', letterSpacing: '0.03em' }}>VISAFLOW</p>
              <h3 style={{ fontSize: '24px', lineHeight: 1.2, color: '#0f172a', marginTop: '8px', fontWeight: 800 }}>
                Start Demo Now
              </h3>
              <p style={{ marginTop: '8px', color: '#475569', fontSize: '14px' }}>
                Share your details and we will take you to the VisaFlow product demo website.
              </p>
            </div>

            <form noValidate onSubmit={submitLead} style={{ padding: '22px 24px', display: 'grid', gap: '12px' }}>
              <label style={{ display: 'grid', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Name *</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  placeholder="Your full name"
                  style={inputStyle}
                  autoComplete="name"
                  required
                />
                {fieldErrors.name ? <span style={fieldErrorStyle}>{fieldErrors.name}</span> : null}
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <label style={{ display: 'grid', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="you@company.com"
                    style={inputStyle}
                    autoComplete="email"
                    required
                  />
                  {fieldErrors.email ? <span style={fieldErrorStyle}>{fieldErrors.email}</span> : null}
                </label>
                <label style={{ display: 'grid', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Number *</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    onKeyDown={handlePhoneKeyDown}
                    placeholder="+91 9876543210"
                    style={inputStyle}
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="^\\+?[0-9\\s().-]{7,20}$"
                    title="Enter a mobile number with 7 to 15 digits, optionally starting with +."
                    required
                  />
                  {fieldErrors.phone ? <span style={fieldErrorStyle}>{fieldErrors.phone}</span> : null}
                </label>
              </div>

              <label style={{ display: 'grid', gap: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Message</span>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  placeholder="Type a Message (optional)"
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '84px' }}
                />
              </label>

              {error ? <p style={{ fontSize: '13px', color: '#dc2626' }}>{error}</p> : null}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    borderRadius: '9999px',
                    border: '1px solid #cbd5e1',
                    padding: '10px 16px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#334155',
                    background: '#ffffff',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    borderRadius: '9999px',
                    border: 'none',
                    padding: '10px 18px',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: '#2563eb',
                    opacity: submitting ? 0.75 : 1,
                  }}
                >
                  {submitting ? 'Saving...' : 'Start Demo'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  border: '1px solid #cbd5e1',
  borderRadius: '10px',
  padding: '10px 12px',
  fontSize: '14px',
  color: '#0f172a',
  background: '#ffffff',
};

const fieldErrorStyle: CSSProperties = {
  fontSize: '12px',
  lineHeight: 1.4,
  color: '#dc2626',
};
