'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const faqs = [
  {
    q: 'What is VisaFlow?',
    a: 'VisaFlow is an operations platform for visa, residency, citizenship, and immigration service teams. It helps manage leads, consultations, payments, documents, application workflows, client communication, team tasks, and reporting from one place.',
  },
  {
    q: 'Who is this product built for?',
    a: 'It is built for immigration consultants, residency advisors, citizenship by investment firms, Dubai business setup teams, relocation agencies, and global mobility service providers.',
  },
  {
    q: 'Does VisaFlow include a client portal?',
    a: 'Yes. Clients can log in to view ongoing applications, see case details, upload required documents, access their document vault, and follow application progress.',
  },
  {
    q: 'Which visa workflows are included in the current demo?',
    a: 'The demo includes workflows for Dubai, Portugal, Dominica, and Grenada. These can be adapted into custom workflows for other services.',
  },
  {
    q: 'Can admins verify or reject uploaded documents?',
    a: 'Yes. Admins can review uploaded documents, mark them as verified, approve steps, reject steps, or request re-upload with a reason.',
  },
  {
    q: 'Does it support payments and invoices?',
    a: 'Yes. The platform supports payment link flows, payment status tracking, invoice management, and revenue visibility. The demo includes a mock payment gateway, and the backend structure is Stripe-ready.',
  },
  {
    q: 'Can our team assign tasks internally?',
    a: 'Yes. Teams can create tasks, assign work, attach tasks to leads or applications, upload related files, and track task status.',
  },
  {
    q: 'Does it include role-based access control?',
    a: 'Yes. Admins can manage employees, create roles, update permissions, and control access to different sections of the admin workspace.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="faqs"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #fff 0%, #eef2ff 100%)',
        padding: '96px 0',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#111827',
              marginBottom: '16px',
            }}
          >
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.6 }}>
            Everything you need to know about using VisaFlow. Still have questions?
            <br />
            Drop us a message — we&apos;ll get back to you quickly.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#111827', flex: 1 }}>
                  {faq.q}
                </span>
                <span
                  style={{
                    fontSize: '20px',
                    color: '#6b7280',
                    fontWeight: 300,
                    marginLeft: '16px',
                    flexShrink: 0,
                    transition: 'transform 0.2s',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  {open === i ? '×' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' as const }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f3f4f6' }}>
                      <p style={{ paddingTop: '16px', fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
