import Hero from './sections/Hero';
import FeatureStrip from './sections/FeatureStrip';
import AboutPreview from './sections/AboutPreview';
import ServicesSection from './sections/ServicesSection';
import VenuesPreview from './sections/VenuesPreview';
import Testimonials from './sections/Testimonials';
import GalleryPreview from './sections/GalleryPreview';
import CtaBanner from './sections/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <AboutPreview />
      <ServicesSection />
      <VenuesPreview />
      <GalleryPreview />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
