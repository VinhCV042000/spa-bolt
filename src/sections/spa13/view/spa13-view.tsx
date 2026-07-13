import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa13Hero } from 'src/sections/spa13/spa13-hero';
import { Spa13Ritual } from 'src/sections/spa13/spa13-ritual';
import { Spa13Gallery } from 'src/sections/spa13/spa13-gallery';
import { Spa13Journey } from 'src/sections/spa13/spa13-journey';
import { Spa13Booking } from 'src/sections/spa13/spa13-booking';
import { Spa13Botanicals } from 'src/sections/spa13/spa13-botanicals';
import { Spa13Testimonials } from 'src/sections/spa13/spa13-testimonials';

export function Spa13View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa13Hero />
      <Spa13Gallery />
      <Spa13Botanicals />
      <Spa13Ritual />
      <Spa13Journey />
      <Spa13Testimonials />
      <Spa13Booking />
    </>
  );
}
