import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA1_GOLD, SPA_IMAGES, SPA1_GOLD_SOFT } from 'src/sections/spa1/spa1-data';

// ----------------------------------------------------------------------

export function Spa1Contact({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa1');

  const white = (opacity: number) => varAlpha(theme.vars.palette.common.whiteChannel, opacity);

  const infos = [
    { icon: 'solar:phone-bold-duotone', label: t('contact.hotlineLabel'), value: '1900 6868' },
    {
      icon: 'solar:map-point-bold-duotone',
      label: t('contact.addressLabel'),
      value: t('contact.addressValue'),
    },
    {
      icon: 'solar:clock-circle-bold-duotone',
      label: t('contact.hoursLabel'),
      value: t('contact.hoursValue'),
    },
  ];

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: 'common.white',
        py: { xs: 10, md: 18 },
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          inset: 0,
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(180deg, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.86) 100%), url(${SPA_IMAGES.booking})`,
        }}
      />

      <Container component={MotionViewport} sx={{ position: 'relative', zIndex: 9 }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          <Grid xs={12} md={7}>
            <Stack spacing={3}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
                  {t('contact.eyebrow')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography
                  sx={{
                    fontFamily: theme.typography.fontSecondaryFamily,
                    fontWeight: 'fontWeightMedium',
                    fontSize: { xs: 36, md: 60 },
                    lineHeight: 1.1,
                  }}
                >
                  {t('contact.title')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography sx={{ maxWidth: 520, color: white(0.7), lineHeight: 1.8 }}>
                  {t('contact.description')}
                </Typography>
              </Box>

              <Box
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, pt: 1 }}
              >
                <Button
                  component={RouterLink}
                  href={paths.spa.booking}
                  size="large"
                  endIcon={<Iconify icon="solar:arrow-right-linear" />}
                  sx={{
                    px: 4,
                    borderRadius: 0,
                    color: 'common.black',
                    bgcolor: SPA1_GOLD,
                    '&:hover': { bgcolor: SPA1_GOLD_SOFT },
                  }}
                >
                  {t('contact.cta')}
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.spa.contact}
                  size="large"
                  sx={{
                    px: 4,
                    borderRadius: 0,
                    color: 'common.white',
                    border: `1px solid ${white(0.4)}`,
                    '&:hover': { borderColor: 'common.white', bgcolor: white(0.08) },
                  }}
                >
                  {t('contact.secondary')}
                </Button>
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <Stack
              spacing={0}
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              sx={{ borderTop: `1px solid ${white(0.16)}` }}
            >
              {infos.map((info) => (
                <Stack
                  key={info.label}
                  direction="row"
                  alignItems="center"
                  spacing={2.5}
                  sx={{ py: 3, borderBottom: `1px solid ${white(0.16)}` }}
                >
                  <Iconify icon={info.icon} width={28} sx={{ color: SPA1_GOLD }} />
                  <Stack>
                    <Typography
                      variant="caption"
                      sx={{ color: white(0.56), letterSpacing: 1, textTransform: 'uppercase' }}
                    >
                      {info.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 'fontWeightSemiBold' }}>{info.value}</Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
