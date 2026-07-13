import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';

import { SPA1_GOLD, SPA_IMAGES, SPA1_DARK_ALT } from 'src/sections/spa1/spa1-data';

// ----------------------------------------------------------------------

type IntroStat = { value: string; label: string };

export function Spa1Intro({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa1');

  const stats = t('intro.stats', { returnObjects: true }) as IntroStat[];

  return (
    <Box
      component="section"
      id="intro"
      sx={{
        py: { xs: 8, md: 16 },
        color: 'common.white',
        bgcolor: SPA1_DARK_ALT,
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          <Grid xs={12} md={6}>
            <Box
              component={m.div}
              variants={varFade({ distance: 24 }).inLeft}
              sx={{ position: 'relative', pr: { md: 4 }, pb: { md: 4 } }}
            >
              <Box
                component="img"
                alt={t('intro.title')}
                src={SPA_IMAGES.about}
                sx={{ width: 1, height: { xs: 360, md: 540 }, objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  transform: { md: 'translate(28px, 28px)' },
                  border: `1px solid ${SPA1_GOLD}`,
                  pointerEvents: 'none',
                }}
              />
            </Box>
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={4}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
                  {t('intro.eyebrow')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography
                  sx={{
                    fontFamily: theme.typography.fontSecondaryFamily,
                    fontWeight: 'fontWeightMedium',
                    fontSize: { xs: 30, md: 44 },
                    lineHeight: 1.2,
                  }}
                >
                  {t('intro.title')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography
                  sx={{
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: varAlpha(theme.vars.palette.common.whiteChannel, 0.66),
                  }}
                >
                  {t('intro.paragraph')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography
                  sx={{
                    fontFamily: theme.typography.fontSecondaryFamily,
                    fontStyle: 'italic',
                    fontSize: 24,
                    color: SPA1_GOLD,
                  }}
                >
                  Lumière
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: varAlpha(theme.vars.palette.common.whiteChannel, 0.48) }}
                >
                  {t('intro.signature')}
                </Typography>
              </Box>

              <Box
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                sx={{
                  pt: 2,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  borderTop: `1px solid ${varAlpha(theme.vars.palette.common.whiteChannel, 0.12)}`,
                }}
              >
                {stats.map((stat) => (
                  <Stack key={stat.label} spacing={0.5} sx={{ pt: 3 }}>
                    <Typography
                      sx={{
                        fontFamily: theme.typography.fontSecondaryFamily,
                        fontSize: { xs: 32, md: 40 },
                        color: SPA1_GOLD,
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: varAlpha(theme.vars.palette.common.whiteChannel, 0.56) }}
                    >
                      {stat.label}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
