import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa26Hero } from 'src/sections/spa26/spa26-hero';
import { Spa26Team } from 'src/sections/spa26/spa26-team';
import { Spa26Spaces } from 'src/sections/spa26/spa26-spaces';
import { Spa26Pricing } from 'src/sections/spa26/spa26-pricing';
import { Spa26Booking } from 'src/sections/spa26/spa26-booking';
import { Spa26Programs } from 'src/sections/spa26/spa26-programs';
import { Spa26Philosophy } from 'src/sections/spa26/spa26-philosophy';
import { Spa26Treatments } from 'src/sections/spa26/spa26-treatments';
import { Spa26Testimonials } from 'src/sections/spa26/spa26-testimonials';

export function Spa26View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa26Hero />
      <Spa26Philosophy />
      <Spa26Treatments />
      <Spa26Programs />
      <Spa26Spaces />
      <Spa26Team />
      <Spa26Testimonials />
      <Spa26Pricing />
      <Spa26Booking />
    </>
  );
}
