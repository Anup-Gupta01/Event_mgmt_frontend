import Hero from './sections/Hero';
import TrustStats from './sections/TrustStats';
import ServicesPreview from './sections/ServicesPreview';
import PackagesPreview from './sections/PackagesPreview';
import VenueHighlights from './sections/VenueHighlights';
import HowItWorks from './sections/HowItWorks';
import Testimonials from './sections/Testimonials';
import FaqSection from './sections/FaqSection';
import ContactSection from './sections/ContactSection';
import CtaBanner from './sections/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <ServicesPreview />
      <PackagesPreview />
      <VenueHighlights />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <ContactSection />
      <CtaBanner />
    </>
  );
}
