import Navbar from '@/components/organisms/Navbar';
import Hero from '@/components/organisms/Hero';
import Features from '@/components/organisms/Features';
import UseCases from '@/components/organisms/UseCases';
import Integrations from '@/components/organisms/Integrations';
import FAQ from '@/components/organisms/FAQ';
import CTA from '@/components/organisms/CTA';
import Footer from '@/components/organisms/Footer';
import BookDemoModal from '@/components/organisms/BookDemoModal';
import ContactUsModal from '@/components/organisms/ContactUsModal';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <Integrations />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <BookDemoModal />
      <ContactUsModal />
    </>
  );
}
