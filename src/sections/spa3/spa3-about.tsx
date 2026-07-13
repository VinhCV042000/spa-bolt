import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';

import { SPA3_SAND, SPA3_BROWN, SPA3_TERRA, SPA3_IMAGES } from 'src/sections/spa3/spa3-data';

// ----------------------------------------------------------------------

export function Spa3About({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa3');

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SPA3_SAND, ...sx }} {...other}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* Text */}
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  variant="overline"
                  sx={{ color: SPA3_TERRA, letterSpacing: 3, fontSize: 12 }}
                >
                  {t('about.eyebrow')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  variant="h2"
                  sx={{ color: SPA3_BROWN, fontWeight: 700, lineHeight: 1.2 }}
                >
                  {t('about.title')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography sx={{ color: 'grey.700', lineHeight: 1.9, fontSize: 16 }}>
                  {t('about.description')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
                  {[
                    { num: '12+', label: t('about.stat1') },
                    { num: '50+', label: t('about.stat2') },
                    { num: '30K+', label: t('about.stat3') },
                  ].map((stat) => (
                    <Box key={stat.label} sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ color: SPA3_TERRA }}>
                        {stat.num}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'grey.600' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Images - stacked/offset */}
          <Grid xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
              <Box sx={{ position: 'relative', pl: { md: 4 } }}>
                <Box
                  component="img"
                  src={SPA3_IMAGES.about}
                  alt="About"
                  sx={{
                    width: '75%',
                    height: 380,
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
                <Box
                  component="img"
                  src={SPA3_IMAGES.aboutSecond}
                  alt="About detail"
                  sx={{
                    position: 'absolute',
                    bottom: -40,
                    right: 0,
                    width: '55%',
                    height: 240,
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: `4px solid ${SPA3_SAND}`,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
