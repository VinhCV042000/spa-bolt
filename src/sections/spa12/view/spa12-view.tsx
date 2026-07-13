import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa12Hero } from 'src/sections/spa12/spa12-hero';
import { Spa12Team } from 'src/sections/spa12/spa12-team';
import { Spa12Gallery } from 'src/sections/spa12/spa12-gallery';
import { Spa12Booking } from 'src/sections/spa12/spa12-booking';
import { Spa12Journey } from 'src/sections/spa12/spa12-journey';
import { Spa12Signatures } from 'src/sections/spa12/spa12-signatures';
import { Spa12Philosophy } from 'src/sections/spa12/spa12-philosophy';
import { Spa12Technology } from 'src/sections/spa12/spa12-technology';
import { Spa12Testimonials } from 'src/sections/spa12/spa12-testimonials';

export function Spa12View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa12Hero />
      <Spa12Gallery />
      <Spa12Philosophy />
      <Spa12Signatures />
      <Spa12Technology />
      <Spa12Journey />
      <Spa12Team />
      <Spa12Testimonials />
      <Spa12Booking />
    </>
  );
}
