import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa14Hero } from 'src/sections/spa14/spa14-hero';
import { Spa14Gallery } from 'src/sections/spa14/spa14-gallery';
import { Spa14Booking } from 'src/sections/spa14/spa14-booking';
import { Spa14SisiRituals } from 'src/sections/spa14/spa14-sisi';
import { Spa14Treatments } from 'src/sections/spa14/spa14-treatments';
import { Spa14Philosophy } from 'src/sections/spa14/spa14-philosophy';
import { Spa14Testimonials } from 'src/sections/spa14/spa14-testimonials';

export function Spa14View() {
  const pageProgress = useScrollProgress();
  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa14Hero />
      <Spa14Gallery />
      <Spa14Treatments />
      <Spa14Philosophy />
      <Spa14SisiRituals />
      <Spa14Testimonials />
      <Spa14Booking />
    </>
  );
}
