import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa15Tea } from 'src/sections/spa15/spa15-tea';
import { Spa15Hero } from 'src/sections/spa15/spa15-hero';
import { Spa15Onsen } from 'src/sections/spa15/spa15-onsen';
import { Spa15Suites } from 'src/sections/spa15/spa15-suites';
import { Spa15Masters } from 'src/sections/spa15/spa15-masters';
import { Spa15Booking } from 'src/sections/spa15/spa15-booking';
import { Spa15Rituals } from 'src/sections/spa15/spa15-rituals';
import { Spa15Philosophy } from 'src/sections/spa15/spa15-philosophy';
import { Spa15Testimonials } from 'src/sections/spa15/spa15-testimonials';

export function Spa15View() {
  const pageProgress = useScrollProgress();
  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa15Hero />
      <Spa15Philosophy />
      <Spa15Onsen />
      <Spa15Rituals />
      <Spa15Suites />
      <Spa15Tea />
      <Spa15Masters />
      <Spa15Testimonials />
      <Spa15Booking />
    </>
  );
}
