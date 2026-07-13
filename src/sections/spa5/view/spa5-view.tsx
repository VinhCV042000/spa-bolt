import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa5Hero } from 'src/sections/spa5/spa5-hero';
import { Spa5Gallery } from 'src/sections/spa5/spa5-gallery';
import { Spa5Booking } from 'src/sections/spa5/spa5-booking';
import { Spa5Experience } from 'src/sections/spa5/spa5-experience';
import { Spa5Treatments } from 'src/sections/spa5/spa5-treatments';
import { Spa5Membership } from 'src/sections/spa5/spa5-membership';
import { Spa5Testimonials } from 'src/sections/spa5/spa5-testimonials';

export function Spa5View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa5Hero />
      <Spa5Gallery />
      <Spa5Experience />
      <Spa5Treatments />
      <Spa5Membership />
      <Spa5Testimonials />
      <Spa5Booking />
    </>
  );
}
