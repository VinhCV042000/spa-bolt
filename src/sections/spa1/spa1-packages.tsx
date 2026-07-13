import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA1_GOLD, SPA1_DARK, SPA1_DARK_ALT, SPA_PACKAGE_META } from 'src/sections/spa1/spa1-data';

// ----------------------------------------------------------------------

type PackageItem = { name: string; caption: string; features: string[] };

export function Spa1Packages({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa1');

  const packages = (t('packages.items', { returnObjects: true }) as PackageItem[]).map(
    (pkg, index) => ({ ...pkg, ...SPA_PACKAGE_META[index] })
  );

  const white = (opacity: number) => varAlpha(theme.vars.palette.common.whiteChannel, opacity);

  return (
    <Box
      component="section"
      id="packages"
      sx={{ py: { xs: 8, md: 16 }, color: 'common.white', bgcolor: SPA1_DARK, ...sx }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Stack
          spacing={2}
          sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center', maxWidth: 640, mx: 'auto' }}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
        >
          <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
            {t('packages.eyebrow')}
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.typography.fontSecondaryFamily,
              fontWeight: 'fontWeightMedium',
              fontSize: { xs: 30, md: 48 },
              lineHeight: 1.15,
            }}
          >
            {t('packages.title')}
          </Typography>
          <Typography sx={{ color: white(0.6) }}>{t('packages.subtitle')}</Typography>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {packages.map((pkg) => (
            <Grid key={pkg.name} xs={12} md={4}>
              <Stack
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                spacing={3}
                sx={{
                  p: 4,
                  height: 1,
                  position: 'relative',
                  bgcolor: SPA1_DARK_ALT,
                  border: `1px solid ${pkg.popular ? SPA1_GOLD : white(0.12)}`,
                  ...(pkg.popular && {
                    boxShadow: `0 24px 64px -24px ${varAlpha('200 161 90', 0.5)}`,
                  }),
                }}
              >
                {pkg.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 24,
                      transform: 'translateY(-50%)',
                      px: 1.5,
                      py: 0.5,
                      bgcolor: SPA1_GOLD,
                      color: 'common.black',
                      fontSize: 11,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      fontWeight: 'fontWeightBold',
                    }}
                  >
                    {t('packages.popular')}
                  </Box>
                )}

                <Stack spacing={1}>
                  <Typography
                    sx={{
                      fontFamily: theme.typography.fontSecondaryFamily,
                      fontSize: 26,
                    }}
                  >
                    {pkg.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: white(0.56) }}>
                    {pkg.caption}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontFamily: theme.typography.fontSecondaryFamily,
                    fontSize: 40,
                    color: SPA1_GOLD,
                  }}
                >
                  {fCurrency(pkg.price)}
                </Typography>

                <Divider sx={{ borderColor: white(0.12) }} />

                <Stack spacing={1.5} sx={{ flex: 1 }}>
                  {pkg.features.map((feature) => (
                    <Stack key={feature} direction="row" spacing={1.5} alignItems="center">
                      <Iconify
                        icon="solar:check-circle-linear"
                        width={20}
                        sx={{ color: SPA1_GOLD, flexShrink: 0 }}
                      />
                      <Typography variant="body2" sx={{ color: white(0.8) }}>
                        {feature}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  component={RouterLink}
                  href={paths.spa.booking}
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 0,
                    ...(pkg.popular
                      ? {
                          color: 'common.black',
                          bgcolor: SPA1_GOLD,
                          '&:hover': { bgcolor: white(0.9) },
                        }
                      : {
                          color: 'common.white',
                          border: `1px solid ${white(0.32)}`,
                          '&:hover': { borderColor: SPA1_GOLD, color: SPA1_GOLD },
                        }),
                  }}
                >
                  {t('packages.choose')}
                </Button>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
