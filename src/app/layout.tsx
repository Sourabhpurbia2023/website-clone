import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VisaFlow | Visa Application Management Software',
  description:
    'Manage visa leads, consultations, payments, documents, applications, tasks, and client updates from one secure immigration operations platform.',
  openGraph: {
    title: 'VisaFlow - Visa Operations and Client Portal Platform',
    description:
      'An end-to-end platform for immigration teams to manage leads, consultations, documents, payments, application workflows, tasks, and client communication.',
    url: 'https://visaflow360.com/',
    type: 'website',
    images: [
      {
        url: 'https://visaflow360.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VisaFlow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VisaFlow - Visa Operations and Client Portal Platform',
    description:
      'An end-to-end platform for immigration teams to manage leads, consultations, documents, payments, application workflows, tasks, and client communication.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
