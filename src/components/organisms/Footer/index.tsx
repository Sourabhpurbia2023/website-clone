'use client';

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
  { label: 'Take a Demo', href: '#take-demo' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '80px 24px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '64px',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em' }}>VisaFlow</span>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, maxWidth: '220px', marginBottom: '32px' }}>
              The operating system for visa, residency, citizenship, and immigration service teams.
            </p>
            <p style={{ fontSize: '13px', color: '#4b5563' }}>
              © 2026 VisaFlow. All rights reserved.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#9ca3af')}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Large watermark */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: '20px',
          paddingBottom: '0',
          overflow: 'hidden',
          lineHeight: 0.85,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(80px, 18vw, 220px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.03)',
            letterSpacing: '-0.04em',
            display: 'block',
          }}
        >
          VisaFlow
        </span>
      </div>
    </footer>
  );
}
