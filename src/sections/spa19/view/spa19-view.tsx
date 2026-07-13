import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa19Hero } from 'src/sections/spa19/spa19-hero';
import { Spa19Masters } from 'src/sections/spa19/spa19-masters';
import { Spa19Booking } from 'src/sections/spa19/spa19-booking';
import { Spa19Gallery } from 'src/sections/spa19/spa19-gallery';
import { Spa19Therapies } from 'src/sections/spa19/spa19-therapies';
import { Spa19Apothecary } from 'src/sections/spa19/spa19-apothecary';
import { Spa19Philosophy } from 'src/sections/spa19/spa19-philosophy';
import { Spa19Testimonials } from 'src/sections/spa19/spa19-testimonials';

export function Spa19View() {
  const pageProgress = useScrollProgress();
  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa19Hero />
      <Spa19Philosophy />
      <Spa19Gallery />
      <Spa19Therapies />
      <Spa19Apothecary />
      <Spa19Masters />
      <Spa19Testimonials />
      <Spa19Booking />
    </>
  );
}
