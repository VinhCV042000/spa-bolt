import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa6Hero } from 'src/sections/spa6/spa6-hero';
import { Spa6About } from 'src/sections/spa6/spa6-about';
import { Spa6Dosha } from 'src/sections/spa6/spa6-dosha';
import { Spa6Rituals } from 'src/sections/spa6/spa6-rituals';
import { Spa6Gallery } from 'src/sections/spa6/spa6-gallery';
import { Spa6Booking } from 'src/sections/spa6/spa6-booking';
import { Spa6Packages } from 'src/sections/spa6/spa6-packages';
import { Spa6Testimonials } from 'src/sections/spa6/spa6-testimonials';

export function Spa6View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa6Hero />
      <Spa6About />
      <Spa6Dosha />
      <Spa6Rituals />
      <Spa6Gallery />
      <Spa6Packages />
      <Spa6Testimonials />
      <Spa6Booking />
    </>
  );
}
