'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const useCases = [
  {
    icon: '🏢',
    title: 'Immigration Consultancies',
    desc: 'Manage enquiries, consultations, case progress, documents, invoices, and client updates in one dashboard.',
  },
  {
    icon: '📜',
    title: 'Citizenship by Investment Firms',
    desc: 'Track Dominica and Grenada passport journeys with due diligence, government processing, and issuance milestones.',
  },
  {
    icon: '🌍',
    title: 'Dubai and Portugal Advisory Teams',
    desc: 'Run trade name, MOA, medical, NIF, bank, and appointment steps in one structured process flow.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="use-cases"
      ref={ref}
      style={{
        background: '#ffffff',
        padding: '96px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left: use cases list */}
        <div>
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#111827',
              lineHeight: 1.15,
              marginBottom: '48px',
            }}
          >
            Made for every team handling <span style={{ color: '#2563eb' }}>complex visa journeys</span>.
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{
                  background: '#f9fafb',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                whileHover={{ borderColor: '#2563eb', scale: 1.01 }}
              >
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>{uc.icon}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
                  {uc.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>{uc.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#2563eb',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Map Your Workflow ›
          </motion.a>
        </div>

        {/* Right: LinkedIn profile mockup */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
            borderRadius: '24px',
            padding: '40px',
            minHeight: '400px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Floating platform icons */}
          {[
            { top: '10%', left: '5%', rotate: '-15deg', size: 52 },
            { top: '8%', right: '8%', rotate: '10deg', size: 60 },
            { bottom: '12%', right: '6%', rotate: '-8deg', size: 48 },
          ].map((item, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', ...item }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                style={{
                  width: item.size,
                  height: item.size,
                  background: '#2563eb',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `rotate(${item.rotate})`,
                  boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
                }}
              >
                <span style={{ color: '#fff', fontWeight: 900, fontSize: item.size * 0.36 }}>VF</span>
              </div>
            </motion.div>
          ))}

          {/* Application card */}
          <div
            style={{
              background: '#1e1e2e',
              borderRadius: '16px',
              padding: '0',
              width: '260px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Header */}
            <div style={{ background: '#2563eb', height: '72px' }} />
            <div style={{ padding: '0 20px 20px', marginTop: '-32px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#d1d5db',
                  border: '3px solid #1e1e2e',
                  overflow: 'hidden',
                  marginBottom: '12px',
                }}
              >
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #93c5fd, #3b82f6)' }} />
              </div>
              <p style={{ color: '#dbeafe', fontSize: '12px', marginBottom: '8px', fontWeight: 700 }}>Case ID: VF-2026-0412</p>
              <p style={{ color: '#93c5fd', fontSize: '12px', marginBottom: '6px' }}>Visa Type: Portugal D7</p>
              <p style={{ color: '#93c5fd', fontSize: '12px', marginBottom: '6px' }}>Submission Date: 12 Apr 2026</p>
              <p style={{ color: '#d1fae5', fontSize: '12px', marginBottom: '16px' }}>Status: In Review</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    height: '30px',
                    width: '140px',
                    background: '#2563eb',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  View Application
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
