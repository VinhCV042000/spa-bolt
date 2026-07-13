import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa20Hero } from 'src/sections/spa20/spa20-hero';
import { Spa20Gallery } from 'src/sections/spa20/spa20-gallery';
import { Spa20Pricing } from 'src/sections/spa20/spa20-pricing';
import { Spa20Masters } from 'src/sections/spa20/spa20-masters';
import { Spa20Booking } from 'src/sections/spa20/spa20-booking';
import { Spa20Products } from 'src/sections/spa20/spa20-products';
import { Spa20Philosophy } from 'src/sections/spa20/spa20-philosophy';
import { Spa20Treatments } from 'src/sections/spa20/spa20-treatments';
import { Spa20Testimonials } from 'src/sections/spa20/spa20-testimonials';

export function Spa20View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa20Hero />
      <Spa20Philosophy />
      <Spa20Treatments />
      <Spa20Products />
      <Spa20Gallery />
      <Spa20Pricing />
      <Spa20Masters />
      <Spa20Testimonials />
      <Spa20Booking />
    </>
  );
}
