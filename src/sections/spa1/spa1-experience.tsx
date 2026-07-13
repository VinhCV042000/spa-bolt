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

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA1_GOLD, SPA1_DARK_ALT, SPA_AMENITY_ICONS } from 'src/sections/spa1/spa1-data';

// ----------------------------------------------------------------------

type ExperienceItem = { title: string; description: string };

export function Spa1Experience({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa1');

  const items = (t('experience.items', { returnObjects: true }) as ExperienceItem[]).map(
    (item, index) => ({ ...item, icon: SPA_AMENITY_ICONS[index] })
  );

  const white = (opacity: number) => varAlpha(theme.vars.palette.common.whiteChannel, opacity);

  return (
    <Box
      component="section"
      id="experience"
      sx={{ py: { xs: 8, md: 16 }, color: 'common.white', bgcolor: SPA1_DARK_ALT, ...sx }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Stack
          spacing={2}
          sx={{ maxWidth: 600, mb: { xs: 5, md: 8 } }}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
        >
          <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
            {t('experience.eyebrow')}
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.typography.fontSecondaryFamily,
              fontWeight: 'fontWeightMedium',
              fontSize: { xs: 30, md: 48 },
              lineHeight: 1.15,
            }}
          >
            {t('experience.title')}
          </Typography>
          <Typography sx={{ color: white(0.6), lineHeight: 1.7 }}>
            {t('experience.description')}
          </Typography>
        </Stack>

        <Grid container spacing={0}>
          {items.map((item, index) => (
            <Grid
              key={item.title}
              xs={12}
              sm={6}
              md={3}
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
            >
              <Stack
                spacing={2.5}
                sx={{
                  height: 1,
                  px: { md: 4 },
                  py: { xs: 3, md: 1 },
                  borderLeft: { md: index === 0 ? 'none' : `1px solid ${white(0.12)}` },
                  borderTop: { xs: index === 0 ? 'none' : `1px solid ${white(0.12)}`, md: 'none' },
                }}
              >
                <Iconify icon={item.icon} width={40} sx={{ color: SPA1_GOLD }} />
                <Typography
                  sx={{
                    fontFamily: theme.typography.fontSecondaryFamily,
                    fontSize: 22,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: white(0.56), lineHeight: 1.7 }}>
                  {item.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
