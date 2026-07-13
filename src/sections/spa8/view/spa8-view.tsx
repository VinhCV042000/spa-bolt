import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa8Hero } from 'src/sections/spa8/spa8-hero';
import { Spa8Onsen } from 'src/sections/spa8/spa8-onsen';
import { Spa8Ritual } from 'src/sections/spa8/spa8-ritual';
import { Spa8Seasons } from 'src/sections/spa8/spa8-seasons';
import { Spa8Gallery } from 'src/sections/spa8/spa8-gallery';
import { Spa8Booking } from 'src/sections/spa8/spa8-booking';

export function Spa8View() {
  const pageProgress = useScrollProgress();
  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa8Hero />
      <Spa8Ritual />
      <Spa8Seasons />
      <Spa8Gallery />
      <Spa8Onsen />
      <Spa8Booking />
    </>
  );
}
