import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA_PACKAGE_META } from 'src/sections/spa/spa-data';

// ----------------------------------------------------------------------

type PackageItem = { name: string; caption: string; features: string[] };

export function SpaPackages({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa');

  const packages = (t('packages.items', { returnObjects: true }) as PackageItem[]).map(
    (pkg, index) => ({ ...pkg, ...SPA_PACKAGE_META[index] })
  );

  return (
    <Box
      component="section"
      id="packages"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center', maxWidth: 640, mx: 'auto' }}
        >
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              {t('packages.eyebrow')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2">
              {t('packages.titleLead')}
              <Box component="span" sx={{ opacity: 0.4 }}>
                {' '}
                {t('packages.titleRest')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography sx={{ color: 'text.secondary' }}>{t('packages.subtitle')}</Typography>
          </Box>
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
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  ...(pkg.popular && {
                    border: (theme) => `2px solid ${theme.vars.palette.primary.main}`,
                    boxShadow: (theme) => theme.customShadows.z24,
                  }),
                }}
              >
                {pkg.popular && (
                  <Label color="primary" sx={{ position: 'absolute', top: 16, right: 16 }}>
                    {t('packages.popular')}
                  </Label>
                )}

                <Stack spacing={1}>
                  <Typography variant="h5">{pkg.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {pkg.caption}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="baseline" spacing={0.5}>
                  <Typography variant="h3" color="primary.main">
                    {fCurrency(pkg.price)}
                  </Typography>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack spacing={1.5} sx={{ flex: 1 }}>
                  {pkg.features.map((feature) => (
                    <Stack key={feature} direction="row" spacing={1.5} alignItems="center">
                      <Iconify
                        icon="eva:checkmark-circle-2-fill"
                        width={20}
                        sx={{ color: 'primary.main' }}
                      />
                      <Typography variant="body2">{feature}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  component={RouterLink}
                  href={paths.spa.booking}
                  fullWidth
                  size="large"
                  variant={pkg.popular ? 'contained' : 'outlined'}
                  color="primary"
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
