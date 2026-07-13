import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa2Hero } from 'src/sections/spa2/spa2-hero';
import { Spa2About } from 'src/sections/spa2/spa2-about';
import { Spa2Gallery } from 'src/sections/spa2/spa2-gallery';
import { Spa2Contact } from 'src/sections/spa2/spa2-contact';
import { Spa2Services } from 'src/sections/spa2/spa2-services';
import { Spa2Packages } from 'src/sections/spa2/spa2-packages';
import { Spa2Testimonials } from 'src/sections/spa2/spa2-testimonials';

// ----------------------------------------------------------------------

export function Spa2View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa2Hero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <Spa2About />
        <Spa2Services />
        <Spa2Packages />
        <Spa2Gallery />
        <Spa2Testimonials />
        <Spa2Contact />
      </Stack>
    </>
  );
}
