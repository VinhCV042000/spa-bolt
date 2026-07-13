import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { Spa3Hero } from 'src/sections/spa3/spa3-hero';
import { Spa3About } from 'src/sections/spa3/spa3-about';
import { Spa3Contact } from 'src/sections/spa3/spa3-contact';
import { Spa3Gallery } from 'src/sections/spa3/spa3-gallery';
import { Spa3Packages } from 'src/sections/spa3/spa3-packages';
import { Spa3Services } from 'src/sections/spa3/spa3-services';
import { Spa3Testimonials } from 'src/sections/spa3/spa3-testimonials';

// ----------------------------------------------------------------------

export function Spa3View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa3Hero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <Spa3About />
        <Spa3Services />
        <Spa3Packages />
        <Spa3Gallery />
        <Spa3Testimonials />
        <Spa3Contact />
      </Stack>
    </>
  );
}
