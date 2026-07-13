import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa25Faq } from 'src/sections/spa25/spa25-faq';
import { Spa25Hero } from 'src/sections/spa25/spa25-hero';
import { Spa25Results } from 'src/sections/spa25/spa25-results';
import { Spa25Booking } from 'src/sections/spa25/spa25-booking';
import { Spa25Services } from 'src/sections/spa25/spa25-services';
import { Spa25Packages } from 'src/sections/spa25/spa25-packages';
import { Spa25Technology } from 'src/sections/spa25/spa25-technology';
import { Spa25Specialists } from 'src/sections/spa25/spa25-specialists';
import { Spa25Testimonials } from 'src/sections/spa25/spa25-testimonials';

export function Spa25View() {
  const pageProgress = useScrollProgress();
  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa25Hero />
      <Spa25Services />
      <Spa25Technology />
      <Spa25Packages />
      <Spa25Results />
      <Spa25Specialists />
      <Spa25Testimonials />
      <Spa25Faq />
      <Spa25Booking />
    </>
  );
}
