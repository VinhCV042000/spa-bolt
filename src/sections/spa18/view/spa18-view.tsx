import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa18Faq } from 'src/sections/spa18/spa18-faq';
import { Spa18Hero } from 'src/sections/spa18/spa18-hero';
import { Spa18Villas } from 'src/sections/spa18/spa18-villas';
import { Spa18Rituals } from 'src/sections/spa18/spa18-rituals';
import { Spa18Masters } from 'src/sections/spa18/spa18-masters';
import { Spa18Booking } from 'src/sections/spa18/spa18-booking';
import { Spa18Gallery } from 'src/sections/spa18/spa18-gallery';
import { Spa18Philosophy } from 'src/sections/spa18/spa18-philosophy';
import { Spa18Testimonials } from 'src/sections/spa18/spa18-testimonials';

export function Spa18View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa18Hero />
      <Spa18Philosophy />
      <Spa18Gallery />
      <Spa18Rituals />
      <Spa18Villas />
      <Spa18Masters />
      <Spa18Testimonials />
      <Spa18Faq />
      <Spa18Booking />
    </>
  );
}
