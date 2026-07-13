import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa11Hero } from 'src/sections/spa11/spa11-hero';
import { Spa11Steps } from 'src/sections/spa11/spa11-steps';
import { Spa11Booking } from 'src/sections/spa11/spa11-booking';
import { Spa11Gallery } from 'src/sections/spa11/spa11-gallery';
import { Spa11Masters } from 'src/sections/spa11/spa11-masters';
import { Spa11Journey } from 'src/sections/spa11/spa11-journey';
import { Spa11Products } from 'src/sections/spa11/spa11-products';

export function Spa11View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa11Hero />
      <Spa11Gallery />
      <Spa11Journey />
      <Spa11Products />
      <Spa11Steps />
      <Spa11Masters />
      <Spa11Booking />
    </>
  );
}
