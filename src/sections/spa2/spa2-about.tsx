import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { SPA2_TEAL, SPA2_TEAL_LIGHT, SPA2_PAGE_IMAGES } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

export function Spa2About({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa2');

  const features = t('about.features', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  const featureIcons = [
    'solar:leaf-bold-duotone',
    'solar:heart-pulse-bold-duotone',
    'solar:magic-stick-3-bold-duotone',
  ];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, ...sx }} {...other}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* Image side */}
          <Grid xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={SPA2_PAGE_IMAGES.about}
                  alt="About spa"
                  sx={{ width: '100%', height: 480, objectFit: 'cover', borderRadius: 4 }}
                />
                {/* Accent shape */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -16,
                    right: -16,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: `3px solid ${SPA2_TEAL_LIGHT}`,
                    opacity: 0.5,
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Content side */}
          <Grid xs={12} md={7}>
            <Stack spacing={4}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inRight}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Box sx={{ width: 32, height: 3, borderRadius: 2, bgcolor: SPA2_TEAL }} />
                  <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 2 }}>
                    {t('about.eyebrow')}
                  </Typography>
                </Stack>
                <Typography variant="h2" sx={{ color: 'grey.900' }}>
                  {t('about.title')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inRight}>
                <Typography sx={{ color: 'grey.600', lineHeight: 1.9, fontSize: 16 }}>
                  {t('about.description')}
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {Array.isArray(features) &&
                  features.map((feature, idx) => (
                    <Grid xs={12} sm={4} key={idx}>
                      <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                        <Stack
                          spacing={1.5}
                          sx={{
                            p: 2.5,
                            borderRadius: 3,
                            bgcolor: 'rgba(46,139,122,0.04)',
                            border: '1px solid rgba(46,139,122,0.1)',
                          }}
                        >
                          <Iconify icon={featureIcons[idx]} width={32} sx={{ color: SPA2_TEAL }} />
                          <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'grey.500' }}>
                            {feature.desc}
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
