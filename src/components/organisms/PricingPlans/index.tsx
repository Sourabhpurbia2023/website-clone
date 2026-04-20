'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Badge from '@/components/atoms/Badge';

const plans = [
  {
    name: 'Starter',
    price: 'Custom',
    period: ' monthly pricing',
    desc: 'For small teams moving away from spreadsheets.',
    highlight: false,
    features: [
      'Lead management',
      'Consultation tracking',
      'Basic customer portal',
      'Document uploads',
      'Application status tracking',
      'Basic payment link tracking',
      'Email support',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'Growth',
    price: 'Custom',
    period: ' monthly pricing',
    desc: 'For teams managing multiple visa programs and active client operations.',
    highlight: true,
    badge: 'Recommended',
    features: [
      'Everything in Starter',
      'Multi-program visa workflows',
      'Document vault',
      'Payment and invoice management',
      'Task management',
      'Admin dashboard and analytics',
      'Logs and activity history',
      'Role-based permissions',
      'Priority support',
    ],
    cta: 'Book a Growth Demo',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: ' quote',
    desc: 'For established immigration firms with custom workflows, teams, and integrations.',
    highlight: false,
    features: [
      'Everything in Growth',
      'Custom visa workflow setup',
      'Custom fields and service configuration',
      'Advanced roles and permissions',
      'Migration support',
      'Integration support',
      'Dedicated onboarding',
      'Dedicated account manager',
    ],
    cta: 'Talk to Sales',
  },
];

const trustedLogos = ['Secure client portal', 'Structured document workflows', 'Built for high-touch advisory teams'];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function PricingPlans() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        background: '#0a0a0a',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(37,99,235,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        {/* Header */}
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
            Choose the setup that fits
            <br />
            <span style={{ color: '#2563eb' }}>your visa operations</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Pricing shown here is recommended website copy for positioning.
            Replace with final commercial pricing before publishing.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              style={{
                background: plan.highlight ? '#161616' : '#111111',
                border: plan.highlight ? '1px solid #2d2d2d' : '1px solid #1f1f1f',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{plan.name}</h3>
                {plan.badge && <Badge variant="popular">{plan.badge}</Badge>}
              </div>

              {/* Price */}
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '42px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: '16px', color: '#9ca3af' }}>{plan.period}</span>
              </div>

              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '24px' }}>
                {plan.desc}
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #222', marginBottom: '20px' }} />

              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px', fontWeight: 500 }}>
                What&apos;s included
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: plan.highlight ? '#2563eb' : '#1f2937',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '10px',
                        color: '#fff',
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ fontSize: '13px', color: '#d1d5db' }}>{feat}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#take-demo"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: '28px',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  background: plan.highlight ? '#2563eb' : '#1f2937',
                  color: '#fff',
                  border: plan.highlight ? 'none' : '1px solid #374151',
                }}
              >
                {plan.cta} ›
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Trusted logos */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>
            Secure client portal. Structured document workflows. Built for high-touch advisory teams.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              opacity: 0.5,
            }}
          >
            {trustedLogos.map((logo) => (
              <span key={logo} style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
