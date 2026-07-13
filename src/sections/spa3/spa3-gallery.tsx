import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';

import { SPA3_BROWN, SPA3_TERRA, SPA3_IMAGES } from 'src/sections/spa3/spa3-data';

// ----------------------------------------------------------------------

const galleryImages = [
  SPA3_IMAGES.gallery1,
  SPA3_IMAGES.gallery2,
  SPA3_IMAGES.gallery3,
  SPA3_IMAGES.gallery4,
  SPA3_IMAGES.gallery5,
  SPA3_IMAGES.gallery6,
];

export function Spa3Gallery({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa3');

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA3_TERRA, letterSpacing: 3 }}>
              {t('gallery.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: SPA3_BROWN }}>
              {t('gallery.title')}
            </Typography>
          </Box>
        </Stack>

        {/* Masonry-style grid */}
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' },
            gridTemplateRows: 'auto',
          }}
        >
          {galleryImages.map((img, idx) => (
            <Box key={idx} component={m.div} variants={varFade({ distance: 24 }).inUp}>
              <Box
                component="img"
                src={img}
                alt={`Gallery ${idx + 1}`}
                sx={{
                  width: '100%',
                  height: idx % 3 === 0 ? { xs: 200, md: 300 } : { xs: 160, md: 220 },
                  objectFit: 'cover',
                  borderRadius: 2,
                  transition: 'opacity 0.3s',
                  '&:hover': { opacity: 0.85 },
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
