'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { CSSProperties, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  number: string;
  message: string;
  createdAt: string;
};

const LOCAL_STORAGE_KEY = 'visaFlowContactLeads';

export default function ContactUsModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const closeModal = useCallback(() => {
    setOpen(false);
    setError('');
    setSubmitted(false);
    if (window.location.hash === '#contact-us') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const syncFromHash = () => setOpen(window.location.hash === '#contact-us');
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
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const storeLeadLocally = (payload: ContactPayload) => {
    try {
      const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existing: ContactPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.push(payload);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // Keep the contact flow non-blocking if local storage is unavailable.
    }
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill Name, Email, and Number.');
      return;
    }

    setSubmitting(true);

    const payload: ContactPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      number: form.phone.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    };

    storeLeadLocally(payload);

    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        setSubmitting(false);
        setError(result.message || 'Could not save your details. Please try again.');
        return;
      }

      setSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      return;
    } catch {
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
            {!submitted ? (
              <>
                <div style={{ padding: '22px 24px', borderBottom: '1px solid #e5e7eb' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', letterSpacing: '0.03em' }}>VISAFLOW</p>
                  <h3 style={{ fontSize: '24px', lineHeight: 1.2, color: '#0f172a', marginTop: '8px', fontWeight: 800 }}>
                    Contact Us
                  </h3>
                  <p style={{ marginTop: '8px', color: '#475569', fontSize: '14px' }}>
                    Share your details and our team will contact you soon.
                  </p>
                </div>

                <form onSubmit={submitContact} style={{ padding: '22px 24px', display: 'grid', gap: '12px' }}>
                  <label style={{ display: 'grid', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Name *</span>
                    <input
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder="Your full name"
                      style={inputStyle}
                      required
                    />
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <label style={{ display: 'grid', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Email *</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        placeholder="you@company.com"
                        style={inputStyle}
                        required
                      />
                    </label>
                    <label style={{ display: 'grid', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Number *</span>
                      <input
                        value={form.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                        placeholder="+91 98xxxxxx"
                        style={inputStyle}
                        required
                      />
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
                      {submitting ? 'Saving...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ padding: '44px 24px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '9999px',
                    background: 'rgba(37, 99, 235, 0.12)',
                    color: '#2563eb',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '30px',
                    margin: '0 auto 18px',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: '26px', lineHeight: 1.2, color: '#0f172a', fontWeight: 800 }}>
                  Thanks for contacting us
                </h3>
                <p style={{ marginTop: '10px', color: '#475569', fontSize: '15px', lineHeight: 1.65 }}>
                  We will contact you soon.
                </p>
                <div style={{ marginTop: '28px' }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      borderRadius: '9999px',
                      border: 'none',
                      padding: '12px 20px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: '#2563eb',
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
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