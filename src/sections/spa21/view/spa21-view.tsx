import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa21Hero } from 'src/sections/spa21/spa21-hero';
import { Spa21Process } from 'src/sections/spa21/spa21-process';
import { Spa21Results } from 'src/sections/spa21/spa21-results';
import { Spa21Masters } from 'src/sections/spa21/spa21-masters';
import { Spa21Booking } from 'src/sections/spa21/spa21-booking';
import { Spa21Services } from 'src/sections/spa21/spa21-services';
import { Spa21Treatments } from 'src/sections/spa21/spa21-treatments';
import { Spa21Technology } from 'src/sections/spa21/spa21-technology';
import { Spa21Facilities } from 'src/sections/spa21/spa21-facilities';
import { Spa21Testimonials } from 'src/sections/spa21/spa21-testimonials';

export function Spa21View() {
  const pageProgress = useScrollProgress();
  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa21Hero />
      <Spa21Services />
      <Spa21Treatments />
      <Spa21Technology />
      <Spa21Process />
      <Spa21Results />
      <Spa21Facilities />
      <Spa21Masters />
      <Spa21Testimonials />
      <Spa21Booking />
    </>
  );
}
