import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';

import { SPA2_TEAL, SPA2_IMAGES } from 'src/sections/spa2/spa2-data';

// ----------------------------------------------------------------------

const galleryImages = [
  SPA2_IMAGES.gallery1,
  SPA2_IMAGES.gallery2,
  SPA2_IMAGES.gallery3,
  SPA2_IMAGES.gallery4,
];

export function Spa2Gallery({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa2');

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
              {t('gallery.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: 'grey.900' }}>
              {t('gallery.title')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2}>
          {galleryImages.map((img, idx) => (
            <Grid xs={12} sm={6} key={idx}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Box
                  component="img"
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  sx={{
                    width: '100%',
                    height: { xs: 200, md: 280 },
                    objectFit: 'cover',
                    borderRadius: 3,
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
