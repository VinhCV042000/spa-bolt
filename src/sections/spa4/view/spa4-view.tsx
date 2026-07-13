import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa4Hero } from 'src/sections/spa4/spa4-hero';
import { Spa4Booking } from 'src/sections/spa4/spa4-booking';
import { Spa4Philosophy } from 'src/sections/spa4/spa4-philosophy';
import { Spa4Treatments } from 'src/sections/spa4/spa4-treatments';
import { Spa4Membership } from 'src/sections/spa4/spa4-membership';
import { Spa4Specialists } from 'src/sections/spa4/spa4-specialists';
import { Spa4Testimonials } from 'src/sections/spa4/spa4-testimonials';

// ----------------------------------------------------------------------

export function Spa4View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed', zIndex: 9999, bgcolor: 'transparent', color: '#C9956C' }}
      />

      <BackToTop />

      <Spa4Hero />
      <Spa4Philosophy />
      <Spa4Treatments />
      <Spa4Specialists />
      <Spa4Membership />
      <Spa4Testimonials />
      <Spa4Booking />
    </>
  );
}
