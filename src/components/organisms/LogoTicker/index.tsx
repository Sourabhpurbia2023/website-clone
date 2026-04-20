'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'Immigration Consultants' },
  { name: 'Citizenship Advisors' },
  { name: 'Residency Firms' },
  { name: 'Dubai Setup Teams' },
  { name: 'Global Mobility Teams' },
  { name: 'Legal Case Teams' },
  { name: 'Concierge Services' },
  { name: 'Relocation Agencies' },
];

// Duplicate for seamless infinite scroll
const allLogos = [...logos, ...logos];

export default function LogoTicker() {
  return (
    <section
      style={{
        background: '#ffffff',
        padding: '40px 0',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #f3f4f6',
        overflow: 'hidden',
      }}
    >
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280', marginBottom: '18px', padding: '0 24px' }}>
        Designed for service teams that manage high-trust, document-heavy client journeys.
      </p>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '140px',
            background: 'linear-gradient(to right, #fff, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '140px',
            background: 'linear-gradient(to left, #fff, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <motion.div
          style={{
            display: 'flex',
            gap: '64px',
            alignItems: 'center',
            width: 'max-content',
            padding: '8px 0',
          }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                opacity: 0.65,
                filter: 'grayscale(100%)',
                transition: 'opacity 0.2s, filter 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.filter = 'grayscale(0%)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.65';
                (e.currentTarget as HTMLElement).style.filter = 'grayscale(100%)';
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#374151',
                  whiteSpace: 'nowrap',
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
