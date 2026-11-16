/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AOS from 'aos';
import { useEffect } from 'react';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 550,
      easing: 'ease-out-cubic',
      once: true,
      offset: 48,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#11100E] text-[#F6F2EC] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MenuSection />
        <GallerySection />
        <ReservationSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
