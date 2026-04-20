'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '4 Visa Programs', label: 'Dubai, Portugal, Dominica, and Grenada workflows are included in the current demo.' },
  { value: '360 Degree Case View', label: 'Leads, payments, documents, consultations, application stages, logs, and tasks stay connected.' },
  { value: '2 Portals', label: 'Dedicated admin workspace and customer portal for a cleaner client experience.' },
  { value: '1 Source of Truth', label: 'Every case update, document action, payment event, and task can be tracked from one platform.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        background: '#0a0a0a',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Blue border accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        {/* Heading */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Built for the <span style={{ color: '#2563eb' }}>full client journey</span>.
            <br />
            Not just one form.
          </h2>
          <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '500px', margin: '0 auto' }}>
            VisaFlow gives teams a real-time view of business performance and case progress,
            from new leads and revenue to pending and completed applications.
          </p>
        </motion.div>

        {/* Dashboard visual */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: '#fff',
            borderRadius: '20px',
            border: '3px solid #2563eb',
            padding: '36px',
            position: 'relative',
            marginBottom: '64px',
            boxShadow: '0 0 80px rgba(37,99,235,0.2)',
          }}
        >
          {/* Floating coins */}
          {[
            { top: '-20px', left: '5%', size: 48 },
            { top: '-10px', right: '8%', size: 56 },
            { bottom: '10%', left: '2%', size: 44 },
            { bottom: '-10px', right: '5%', size: 52 },
          ].map((coin, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', ...coin }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                style={{
                  width: coin.size,
                  height: coin.size,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                }}
              />
            </motion.div>
          ))}

          {/* Grid charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div
                style={{
                  background: '#eff6ff',
                  borderRadius: '12px',
                  padding: '20px',
                  height: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <p style={{ fontSize: '12px', color: '#374151', fontWeight: 700, marginBottom: '10px' }}>Revenue</p>
                <svg viewBox="0 0 200 80" style={{ width: '100%' }}>
                  <polyline
                    points="0,70 30,55 60,45 90,48 120,30 160,20 200,8"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="200" cy="8" r="5" fill="#2563eb" />
                </svg>
              </div>
            </div>
            <div>
              <div
                style={{
                  background: '#f9fafb',
                  borderRadius: '12px',
                  padding: '20px',
                  height: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ fontSize: '11px', color: '#6b7280', fontWeight: 700, marginBottom: '8px' }}>Lead Conversion Rate</p>
                <svg viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="14" />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#111827"
                    strokeWidth="14"
                    strokeDasharray="140 60"
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {['New Leads This Month', 'Pending Applications', 'Completed Applications'].map((label) => (
              <div
                key={label}
                style={{ background: '#f9fafb', borderRadius: '10px', padding: '14px' }}
              >
                <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px', fontWeight: 700 }}>{label}</p>
                <div style={{ height: '8px', width: '70%', background: '#e5e7eb', borderRadius: '4px', marginBottom: '6px' }} />
                <div style={{ height: '8px', width: '50%', background: '#e5e7eb', borderRadius: '4px' }} />
              </div>
            ))}
          </div>

          {/* Recent updates label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              background: '#f9fafb',
              borderRadius: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>Cost:</span>
              <div
                style={{
                  width: '40px',
                  height: '22px',
                  background: '#2563eb',
                  borderRadius: '11px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: '3px',
                    top: '3px',
                    width: '16px',
                    height: '16px',
                    background: '#fff',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <div style={{ width: '160px', height: '6px', background: '#e5e7eb', borderRadius: '3px' }} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>Recent Updates</span>
          </div>
        </motion.div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  marginBottom: '4px',
                }}
              >
                {i === 0 ? '🛂' : i === 1 ? '🔄' : i === 2 ? '🧑‍💼' : '📍'}
              </div>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                {stat.value}
              </span>
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.5 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
