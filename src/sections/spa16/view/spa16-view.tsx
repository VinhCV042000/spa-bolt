import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa16Hero } from 'src/sections/spa16/spa16-hero';
import { Spa16Riads } from 'src/sections/spa16/spa16-riads';
import { Spa16Hammam } from 'src/sections/spa16/spa16-hammam';
import { Spa16Rituals } from 'src/sections/spa16/spa16-rituals';
import { Spa16Booking } from 'src/sections/spa16/spa16-booking';
import { Spa16Heritage } from 'src/sections/spa16/spa16-heritage';
import { Spa16Courtyard } from 'src/sections/spa16/spa16-courtyard';
import { Spa16Apothecary } from 'src/sections/spa16/spa16-apothecary';
import { Spa16Therapists } from 'src/sections/spa16/spa16-therapists';
import { Spa16Testimonials } from 'src/sections/spa16/spa16-testimonials';

export function Spa16View() {
  const pageProgress = useScrollProgress();
  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa16Hero />
      <Spa16Heritage />
      <Spa16Hammam />
      <Spa16Rituals />
      <Spa16Riads />
      <Spa16Apothecary />
      <Spa16Courtyard />
      <Spa16Therapists />
      <Spa16Testimonials />
      <Spa16Booking />
    </>
  );
}
