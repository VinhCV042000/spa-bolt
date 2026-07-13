import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA_IMAGES, SPA_AMENITY_ICONS } from 'src/sections/spa/spa-data';

// ----------------------------------------------------------------------

type AmenityItem = { title: string; description: string };

export function SpaAmenities({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa');

  const amenities = (t('amenities.items', { returnObjects: true }) as AmenityItem[]).map(
    (item, index) => ({ ...item, icon: SPA_AMENITY_ICONS[index] })
  );

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, ...sx }} {...other}>
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid xs={12} md={5}>
            <Stack spacing={3}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                  {t('amenities.eyebrow')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography variant="h2">
                  {t('amenities.titleLead')}
                  <Box component="span" sx={{ opacity: 0.4 }}>
                    {' '}
                    {t('amenities.titleRest')}
                  </Box>
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography sx={{ color: 'text.secondary' }}>
                  {t('amenities.description')}
                </Typography>
              </Box>

              <Stack spacing={0}>
                {amenities.map((item, index) => (
                  <Stack
                    key={item.title}
                    component={m.div}
                    variants={varFade({ distance: 24 }).inUp}
                    direction="row"
                    spacing={2.5}
                    sx={{
                      py: 2.5,
                      ...(index < amenities.length - 1 && {
                        borderBottom: (theme) =>
                          `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                      }),
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: (theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                        color: 'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={item.icon} width={28} />
                    </Box>
                    <Stack spacing={0.5} sx={{ pt: 0.5 }}>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.description}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Grid container spacing={2}>
              {[
                SPA_IMAGES.gallery1,
                SPA_IMAGES.gallery2,
                SPA_IMAGES.gallery3,
                // SPA_IMAGES.gallery4,
              ].map((img, index) => (
                <Grid key={img} xs={12} sm={index === 0 ? 12 : 6}>
                  <Box
                    component={m.div}
                    variants={varFade({ distance: 24 }).inRight}
                    sx={{ overflow: 'hidden', borderRadius: 2 }}
                  >
                    <Box
                      component="img"
                      alt={`Spa gallery ${index + 1}`}
                      src={img}
                      sx={{
                        width: 1,
                        objectFit: 'cover',
                        height: index === 0 ? 280 : 200,
                        transition: (theme) =>
                          theme.transitions.create('transform', { duration: 500 }),
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
