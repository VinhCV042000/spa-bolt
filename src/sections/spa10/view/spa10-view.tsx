import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa10Faq } from 'src/sections/spa10/spa10-faq';
import { Spa10Hero } from 'src/sections/spa10/spa10-hero';
import { Spa10Rituals } from 'src/sections/spa10/spa10-rituals';
import { Spa10Booking } from 'src/sections/spa10/spa10-booking';
import { Spa10Science } from 'src/sections/spa10/spa10-science';
import { Spa10Ambiance } from 'src/sections/spa10/spa10-ambiance';
import { Spa10Packages } from 'src/sections/spa10/spa10-packages';

export function Spa10View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa10Hero />
      <Spa10Science />
      <Spa10Packages />
      <Spa10Rituals />
      <Spa10Ambiance />
      <Spa10Faq />
      <Spa10Booking />
    </>
  );
}
