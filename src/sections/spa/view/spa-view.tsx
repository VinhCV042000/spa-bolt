import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { SpaHero } from 'src/sections/spa/spa-hero';
import { SpaFaqs } from 'src/sections/spa/spa-faqs';
import { SpaAbout } from 'src/sections/spa/spa-about';
import { SpaBooking } from 'src/sections/spa/spa-booking';
import { SpaServices } from 'src/sections/spa/spa-services';
import { SpaPackages } from 'src/sections/spa/spa-packages';
import { SpaAmenities } from 'src/sections/spa/spa-amenities';
import { SpaTestimonials } from 'src/sections/spa/spa-testimonials';

// ----------------------------------------------------------------------

export function SpaView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <SpaHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <SpaAbout />
        <SpaServices />
        <SpaAmenities />
        <SpaPackages />
        <SpaTestimonials />
        <SpaFaqs />
        <SpaBooking />
      </Stack>
    </>
  );
}
