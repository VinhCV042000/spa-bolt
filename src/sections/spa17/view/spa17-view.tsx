import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa17Faq } from 'src/sections/spa17/spa17-faq';
import { Spa17Hero } from 'src/sections/spa17/spa17-hero';
import { Spa17Rituals } from 'src/sections/spa17/spa17-rituals';
import { Spa17Masters } from 'src/sections/spa17/spa17-masters';
import { Spa17Gallery } from 'src/sections/spa17/spa17-gallery';
import { Spa17Booking } from 'src/sections/spa17/spa17-booking';
import { Spa17Crystals } from 'src/sections/spa17/spa17-crystals';
import { Spa17Philosophy } from 'src/sections/spa17/spa17-philosophy';
import { Spa17Membership } from 'src/sections/spa17/spa17-membership';
import { Spa17Testimonials } from 'src/sections/spa17/spa17-testimonials';

export function Spa17View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa17Hero />
      <Spa17Philosophy />
      <Spa17Rituals />
      <Spa17Crystals />
      <Spa17Masters />
      <Spa17Gallery />
      <Spa17Testimonials />
      <Spa17Faq />
      <Spa17Membership />
      <Spa17Booking />
    </>
  );
}
