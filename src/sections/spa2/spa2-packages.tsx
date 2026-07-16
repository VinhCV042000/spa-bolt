import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { SPA2_TEAL, SPA2_TEAL_LIGHT, SPA2_PACKAGE_META } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

type PackageItem = { name: string; features: string[] };

export function Spa2Packages({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa2');

  const packages = t('packages.items', { returnObjects: true }) as PackageItem[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
              {t('packages.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: 'grey.900' }}>
              {t('packages.title')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography sx={{ maxWidth: 560, color: 'grey.600' }}>
              {t('packages.subtitle')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} justifyContent="center">
          {Array.isArray(packages) &&
            packages.map((pkg, idx) => {
              const meta = SPA2_PACKAGE_META[idx] || SPA2_PACKAGE_META[0];
              const isPopular = meta.popular;

              return (
                <Grid xs={12} sm={6} md={4} key={idx}>
                  <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                    <Card
                      sx={{
                        height: '100%',
                        p: 4,
                        borderRadius: 3,
                        border: isPopular ? `2px solid ${SPA2_TEAL}` : '1px solid rgba(0,0,0,0.08)',
                        boxShadow: isPopular
                          ? '0 8px 32px rgba(46,139,122,0.15)'
                          : '0 2px 12px rgba(0,0,0,0.04)',
                        position: 'relative',
                      }}
                    >
                      {isPopular && (
                        <Chip
                          label={t('packages.popular')}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            bgcolor: SPA2_TEAL,
                            color: 'common.white',
                            borderRadius: 50,
                            fontWeight: 'bold',
                          }}
                        />
                      )}

                      <Stack spacing={3}>
                        <Typography variant="h5" sx={{ color: 'grey.800' }}>
                          {pkg.name}
                        </Typography>

                        <Stack direction="row" alignItems="baseline" spacing={0.5}>
                          <Typography variant="h3" sx={{ color: SPA2_TEAL }}>
                            {meta.price.toLocaleString('vi-VN')}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'grey.500' }}>
                            VNĐ
                          </Typography>
                        </Stack>

                        <Divider />

                        <Stack spacing={1.5}>
                          {pkg.features.map((feature, i) => (
                            <Stack key={i} direction="row" spacing={1} alignItems="center">
                              <Iconify
                                icon="solar:check-circle-bold"
                                width={18}
                                sx={{ color: SPA2_TEAL }}
                              />
                              <Typography variant="body2" sx={{ color: 'grey.600' }}>
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
                            mt: 'auto',
                            borderRadius: 50,
                            color: isPopular ? 'common.white' : SPA2_TEAL,
                            bgcolor: isPopular ? SPA2_TEAL : 'transparent',
                            border: isPopular ? 'none' : `2px solid ${SPA2_TEAL}`,
                            '&:hover': {
                              bgcolor: isPopular ? SPA2_TEAL_LIGHT : 'rgba(46,139,122,0.06)',
                            },
                          }}
                        >
                          {t('packages.cta')}
                        </Button>
                      </Stack>
                    </Card>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Box>
  );
}
