import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa9Hero } from 'src/sections/spa9/spa9-hero';
import { Spa9Gallery } from 'src/sections/spa9/spa9-gallery';
import { Spa9Pillars } from 'src/sections/spa9/spa9-pillars';
import { Spa9DayPass } from 'src/sections/spa9/spa9-daypass';
import { Spa9Booking } from 'src/sections/spa9/spa9-booking';
import { Spa9Treatments } from 'src/sections/spa9/spa9-treatments';
import { Spa9Mindfulness } from 'src/sections/spa9/spa9-mindfulness';

export function Spa9View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa9Hero />
      <Spa9Pillars />
      <Spa9Gallery />
      <Spa9Treatments />
      <Spa9Mindfulness />
      <Spa9DayPass />
      <Spa9Booking />
    </>
  );
}
