import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa7Hero } from 'src/sections/spa7/spa7-hero';
import { Spa7Tech } from 'src/sections/spa7/spa7-tech';
import { Spa7Menu } from 'src/sections/spa7/spa7-menu';
import { Spa7Results } from 'src/sections/spa7/spa7-results';
import { Spa7Gallery } from 'src/sections/spa7/spa7-gallery';
import { Spa7Booking } from 'src/sections/spa7/spa7-booking';

export function Spa7View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa7Hero />
      <Spa7Tech />
      <Spa7Results />
      <Spa7Menu />
      <Spa7Gallery />
      <Spa7Booking />
    </>
  );
}
