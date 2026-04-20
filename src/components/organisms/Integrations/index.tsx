'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const integrations = [
  { name: 'Jotform', status: 'Demo' },
  { name: 'Calendly', status: 'Demo' },
  { name: 'Stripe', status: 'Available' },
  { name: 'Amazon S3', status: 'Available' },
  { name: 'Gmail / Email', status: 'Available' },
  { name: 'Excel', status: 'Available' },
  { name: 'WhatsApp', status: 'Planned' },
  { name: 'CRM API', status: 'Planned' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Integrations() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="integrations"
      ref={ref}
      style={{
        background: '#fff',
        padding: '96px 0',
        borderTop: '1px solid #f3f4f6',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#111827',
            marginBottom: '12px',
          }}
        >
          Connect the tools your team already uses.
        </motion.h2>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ fontSize: '15px', color: '#6b7280', marginBottom: '56px', lineHeight: 1.6 }}
        >
          VisaFlow is designed to fit into your existing sales, scheduling, payment,
          storage, and communication stack.
        </motion.p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {integrations.map((integration, i) => (
            <motion.div
              key={`${integration.name}-${i}`}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -4, scale: 1.06, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '16px 28px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '120px',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{integration.name}</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: integration.status === 'Available' ? '#065f46' : integration.status === 'Demo' ? '#1e40af' : '#6b7280',
                  background: integration.status === 'Available' ? '#d1fae5' : integration.status === 'Demo' ? '#dbeafe' : '#f3f4f6',
                  borderRadius: '9999px',
                  padding: '2px 10px',
                }}
              >
                {integration.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
