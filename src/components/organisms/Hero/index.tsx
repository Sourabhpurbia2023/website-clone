'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Hero() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #eef2ff 0%, #f8faff 60%, #ffffff 100%)',
        paddingTop: '140px',
        paddingBottom: '80px',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Eyebrow badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
        >
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '13px',
              color: '#374151',
              background: '#fff',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                border: '1px solid #e5e7eb',
                borderRadius: '9999px',
                padding: '2px 9px',
                background: '#f9fafb',
              }}
            >
              VISAFLOW360
            </span>
            <span style={{ fontWeight: 500 }}>Built for modern visa and immigration teams</span>
            <span style={{ fontSize: '16px' }}>🌐</span>
            <span style={{ color: '#6b7280' }}>›</span>
          </a>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 'clamp(36px, 5.8vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            color: '#111827',
            marginBottom: '24px',
            maxWidth: '760px',
            margin: '0 auto 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span className="hero-headline-line">Manage every visa case from</span>
          <span className="hero-headline-line">lead to approval in one place.</span>
        </motion.h1>

        {/* Subtext */}
        
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: 'clamp(15px, 1.45vw, 17px)',
            color: '#6b7280',
            maxWidth: '960px',
            margin: '0 auto 40px',
            lineHeight: 1.55,
          }}
        >
          <span className="hero-subtext-line">
            VisaFlow gives your team a complete operating system for immigration services: capture leads, schedule consultations, collect payments,
          </span>
          <span className="hero-subtext-line">
            manage documents, track application stages, assign tasks, and keep clients updated through a secure portal.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '16px',
          }}
        >
          <motion.a
            href="#take-demo"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#111827',
              color: '#fff',
              padding: '13px 28px',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            Take a Demo ›
          </motion.a>
          <motion.a
            href="#features"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              color: '#111827',
              padding: '13px 28px',
              borderRadius: '9999px',
              fontSize: '15px',
              fontWeight: 500,
              textDecoration: 'none',
              border: '1.5px solid #d1d5db',
            }}
          >
            Explore Features ›
          </motion.a>
        </motion.div>

        {/* <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ fontSize: '13px', color: '#2563eb', marginBottom: '60px' }}
        >
          Lead management, client portal, document vault, payments, tasks, and application tracking in one workflow.
        </motion.p> */}
      </div>

      <style>{`
        .hero-headline-line {
          display: block;
          text-align: center;
        }

        .hero-subtext-line {
          display: block;
          text-align: center;
          margin: 0 auto;
          max-width: 820px;
          white-space: normal;
        }

        @media (min-width: 768px) {
          .hero-headline-line {
            white-space: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
