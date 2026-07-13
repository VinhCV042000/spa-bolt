import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA1_GOLD, SPA1_DARK_ALT, SPA_TESTIMONIAL_META } from 'src/sections/spa1/spa1-data';

// ----------------------------------------------------------------------

type TestimonialItem = { name: string; role: string; content: string };

export function Spa1Testimonials({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa1');

  const testimonials = (t('testimonials.items', { returnObjects: true }) as TestimonialItem[]).map(
    (item, index) => ({ ...item, ...SPA_TESTIMONIAL_META[index] })
  );

  const white = (opacity: number) => varAlpha(theme.vars.palette.common.whiteChannel, opacity);

  return (
    <Box
      component="section"
      id="testimonials"
      sx={{ py: { xs: 8, md: 16 }, color: 'common.white', bgcolor: SPA1_DARK_ALT, ...sx }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Stack
          spacing={2}
          alignItems="center"
          sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
        >
          <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
            {t('testimonials.eyebrow')}
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.typography.fontSecondaryFamily,
              fontWeight: 'fontWeightMedium',
              fontSize: { xs: 30, md: 48 },
            }}
          >
            {t('testimonials.title')}
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {testimonials.map((item) => (
            <Grid key={item.name} xs={12} md={6}>
              <Stack
                spacing={3}
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                sx={{
                  height: 1,
                  p: { xs: 3, md: 5 },
                  border: `1px solid ${white(0.12)}`,
                }}
              >
                <Iconify icon="solar:quote-up-square-bold" width={40} sx={{ color: SPA1_GOLD }} />

                <Typography
                  sx={{
                    flex: 1,
                    fontFamily: theme.typography.fontSecondaryFamily,
                    fontStyle: 'italic',
                    fontSize: { xs: 20, md: 24 },
                    lineHeight: 1.6,
                    color: white(0.9),
                  }}
                >
                  “{item.content}”
                </Typography>

                <Rating value={item.rating} readOnly size="small" />

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar src={item.avatar} alt={item.name} sx={{ width: 48, height: 48 }} />
                  <Stack>
                    <Typography sx={{ fontWeight: 'fontWeightSemiBold' }}>{item.name}</Typography>
                    <Typography variant="caption" sx={{ color: SPA1_GOLD }}>
                      {item.role}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
