import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa1Hero } from 'src/sections/spa1/spa1-hero';
import { SPA1_DARK } from 'src/sections/spa1/spa1-data';
import { Spa1Intro } from 'src/sections/spa1/spa1-intro';
import { Spa1Contact } from 'src/sections/spa1/spa1-contact';
import { Spa1Services } from 'src/sections/spa1/spa1-services';
import { Spa1Packages } from 'src/sections/spa1/spa1-packages';
import { Spa1Experience } from 'src/sections/spa1/spa1-experience';
import { Spa1Testimonials } from 'src/sections/spa1/spa1-testimonials';

// ----------------------------------------------------------------------

export function Spa1View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa1Hero />

      <Stack sx={{ position: 'relative', bgcolor: SPA1_DARK }}>
        <Spa1Intro />
        <Spa1Services />
        <Spa1Experience />
        <Spa1Packages />
        <Spa1Testimonials />
        <Spa1Contact />
      </Stack>
    </>
  );
}
