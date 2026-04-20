'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  CalendarDays,
  CreditCard,
  FileText,
  FolderLock,
  LayoutDashboard,
  ReceiptText,
  UserRoundPlus,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const featureTabs = [
  {
    title: 'Lead management',
    eyebrow: 'Pipeline clarity',
    description: 'Capture new enquiries, assign owners, and move prospects from first touch to consultation.',
    imageSrc: '/assets-feature-tabs/lead-management.png',
    mediaType: 'image',
    icon: UserRoundPlus,
    accent: '#2563eb',
    metrics: ['12 hot leads', '4 consults today', '89% follow-up rate'],
  },
  {
    title: 'Invoicing',
    eyebrow: 'Cleaner billing',
    description: 'Create service invoices, track balances, and keep every visa payment request tied to the client.',
    imageSrc: '/assets-feature-tabs/invoicing.png',
    mediaType: 'image',
    icon: ReceiptText,
    accent: '#0f766e',
    metrics: ['18 open invoices', '7 due this week', '3 draft invoices'],
  },
  {
    title: 'Payments',
    eyebrow: 'Payment visibility',
    description: 'Monitor paid, pending, and overdue amounts without searching through spreadsheets or chats.',
    imageSrc: '/assets-feature-tabs/payments.png',
    mediaType: 'image',
    icon: CreditCard,
    accent: '#ca8a04',
    metrics: ['AED 42k collected', '5 pending links', '2 overdue items'],
  },
  {
    title: 'Document vault',
    eyebrow: 'Secure files',
    description: 'Organize passports, bank statements, forms, and approvals in one client-ready document space.',
    imageSrc: '/assets-feature-tabs/document-vault.png',
    mediaType: 'image',
    icon: FolderLock,
    accent: '#2563eb',
    metrics: ['46 verified files', '8 need review', '2 missing uploads'],
  },
  {
    title: 'Calendly integration',
    eyebrow: 'Booked calls',
    description: 'Sync booked consultations and give your team a shared view of upcoming client meetings.',
    imageSrc: '/assets-feature-tabs/calendly-integration.png',
    mediaType: 'image',
    icon: CalendarDays,
    accent: '#0f766e',
    metrics: ['9 calls booked', '2 reschedules', '1 no-show risk'],
  },
  {
    title: 'Admin and Client Portal',
    eyebrow: 'Two clean workspaces',
    description: 'Give internal teams operational controls while clients see status, requests, and next actions.',
    imageSrc: '/assets-feature-tabs/admin-client-portal.webm',
    mediaType: 'video',
    icon: LayoutDashboard,
    accent: '#ca8a04',
    metrics: ['24 active clients', '6 admin tasks', '14 client updates'],
  },
];

const workflowSteps = ['Lead created', 'Invoice sent', 'Payment received', 'Documents verified', 'Portal updated'];

const panelMotion = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -14, scale: 0.985 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: 'easeOut' as const },
  }),
};

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);
  const [manualTabSelection, setManualTabSelection] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const activeFeature = featureTabs[activeTab];
  const ActiveIcon = activeFeature.icon;
  const showImage = !failedImages[activeFeature.imageSrc];
  const showVideo = showImage && activeFeature.mediaType === 'video';

  useEffect(() => {
    if (!inView || manualTabSelection) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveTab((currentTab) => (currentTab + 1) % featureTabs.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [inView, manualTabSelection]);

  return (
    <section id="features" ref={ref} className="feature-showcase-section">
      <div className="feature-showcase-container">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="feature-showcase-heading"
        >
          <span className="feature-section-kicker feature-section-pill">Features</span>
          <h2>
            <span>One operating system for your visa team,</span>
            <span>from first lead to final approval.</span>
          </h2>
          <p>
            Sales, finance, document handling, meetings, and client updates stay connected in one workflow.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="feature-tab-bar"
          role="tablist"
          aria-label="VisaFlow features"
        >
          {featureTabs.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeTab;

            return (
              <motion.button
                key={feature.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="feature-preview-panel"
                className={`feature-tab ${isActive ? 'feature-tab-active' : ''}`}
                onClick={() => {
                  setManualTabSelection(true);
                  setActiveTab(index);
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {isActive ? <motion.span className="feature-tab-glow" layoutId="feature-tab-glow" /> : null}
                <Icon size={18} strokeWidth={2} />
                <span>{feature.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          id="feature-preview-panel"
          role="tabpanel"
          className="feature-preview-shell"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.title}
              {...panelMotion}
              transition={{ duration: 0.34, ease: 'easeOut' }}
            >
              {!showImage ? (
                <div className="feature-preview-titlebar">
                  <div className="feature-preview-title">
                    <ActiveIcon size={20} strokeWidth={2} />
                    <span>{activeFeature.title}</span>
                  </div>
                  <div className="feature-preview-status">
                    <span />
                    Live workspace
                  </div>
                </div>
              ) : null}

              <div className={`feature-preview-body ${showImage ? 'feature-preview-body-full' : ''}`}>
                {showImage ? (
                  <div className="feature-lead-page-card">
                    <div className="feature-lead-image-wrap">
                      {showVideo ? (
                        <video
                          key={activeFeature.imageSrc}
                          className="feature-lead-product-video"
                          src={activeFeature.imageSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          onError={() =>
                            setFailedImages((current) => ({ ...current, [activeFeature.imageSrc]: true }))
                          }
                        />
                      ) : (
                        <Image
                          src={activeFeature.imageSrc}
                          alt={`${activeFeature.title} product preview`}
                          fill
                          priority={activeTab === 0}
                          sizes="(max-width: 980px) 100vw, 1100px"
                          className="feature-lead-product-image"
                          onError={() =>
                            setFailedImages((current) => ({ ...current, [activeFeature.imageSrc]: true }))
                          }
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="feature-preview-column feature-preview-sidebar">
                      <div>
                        <p className="feature-mini-label">{activeFeature.eyebrow}</p>
                        <h3>{activeFeature.title}</h3>
                        <p>{activeFeature.description}</p>
                      </div>

                      <div className="feature-metric-list">
                        {activeFeature.metrics.map((metric, index) => (
                          <motion.div
                            key={metric}
                            className="feature-metric-row"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.06 + 0.1, duration: 0.28 }}
                          >
                            <span style={{ background: activeFeature.accent }} />
                            <p>{metric}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="feature-preview-column feature-placeholder-stage">
                      <div className="feature-image-frame" style={{ borderColor: activeFeature.accent }}>
                        {showImage ? (
                          <Image
                            key={activeFeature.imageSrc}
                            src={activeFeature.imageSrc}
                            alt={`${activeFeature.title} product preview`}
                            fill
                            sizes="(max-width: 980px) 100vw, 42vw"
                            className="feature-product-image"
                            onError={() =>
                              setFailedImages((current) => ({ ...current, [activeFeature.imageSrc]: true }))
                            }
                          />
                        ) : (
                          <div className="feature-image-placeholder">
                            <div className="feature-placeholder-orbit" style={{ borderColor: activeFeature.accent }}>
                              <ActiveIcon size={38} strokeWidth={1.8} />
                            </div>
                            <p className="feature-mini-label">Image placeholder</p>
                            <h3>{activeFeature.title} preview</h3>
                            <p>Drop the media at {activeFeature.imageSrc}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="feature-preview-column feature-workflow-card">
                      <div className="feature-workflow-header">
                        <FileText size={18} strokeWidth={2} />
                        <span>Workflow</span>
                      </div>

                      <div className="feature-workflow-list">
                        {workflowSteps.map((step, index) => (
                          <motion.div
                            key={step}
                            className="feature-workflow-row"
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.08, duration: 0.28 }}
                          >
                            <span
                              className="feature-workflow-dot"
                              style={{
                                background:
                                  index <= activeTab % workflowSteps.length ? activeFeature.accent : '#d1d5db',
                              }}
                            />
                            <p>{step}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
