import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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

import {
  SPA3_SAND,
  SPA3_BROWN,
  SPA3_TERRA,
  SPA3_TERRA_LIGHT,
  SPA3_PACKAGE_META,
} from 'src/sections/spa3/spa3-data';

// ----------------------------------------------------------------------

type PackageItem = { name: string; features: string[] };

export function Spa3Packages({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa3');

  const packages = t('packages.items', { returnObjects: true }) as PackageItem[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SPA3_SAND, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA3_TERRA, letterSpacing: 3 }}>
              {t('packages.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: SPA3_BROWN }}>
              {t('packages.title')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} justifyContent="center">
          {Array.isArray(packages) &&
            packages.map((pkg, idx) => {
              const meta = SPA3_PACKAGE_META[idx] || SPA3_PACKAGE_META[0];
              const isPopular = meta.popular;

              return (
                <Grid xs={12} sm={6} md={4} key={idx}>
                  <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                    <Card
                      sx={{
                        height: '100%',
                        p: 4,
                        borderRadius: 2,
                        bgcolor: isPopular ? SPA3_TERRA : 'common.white',
                        border: isPopular ? 'none' : `1px solid rgba(199,91,57,0.15)`,
                        boxShadow: isPopular ? '0 16px 48px rgba(199,91,57,0.25)' : 'none',
                        transform: isPopular ? 'scale(1.04)' : 'none',
                      }}
                    >
                      <Stack spacing={3}>
                        <Typography
                          variant="h5"
                          sx={{ color: isPopular ? 'common.white' : SPA3_BROWN }}
                        >
                          {pkg.name}
                        </Typography>

                        <Stack direction="row" alignItems="baseline" spacing={0.5}>
                          <Typography
                            variant="h3"
                            sx={{ color: isPopular ? SPA3_SAND : SPA3_TERRA }}
                          >
                            {meta.price.toLocaleString('vi-VN')}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: isPopular ? 'rgba(255,255,255,0.7)' : 'grey.500' }}
                          >
                            VNĐ
                          </Typography>
                        </Stack>

                        <Divider
                          sx={{ borderColor: isPopular ? 'rgba(255,255,255,0.2)' : undefined }}
                        />

                        <Stack spacing={1.5}>
                          {pkg.features.map((feature, i) => (
                            <Stack key={i} direction="row" spacing={1} alignItems="center">
                              <Iconify
                                icon="solar:check-circle-bold"
                                width={18}
                                sx={{ color: isPopular ? SPA3_SAND : SPA3_TERRA }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ color: isPopular ? 'rgba(255,255,255,0.9)' : 'grey.600' }}
                              >
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
                            borderRadius: 1,
                            fontWeight: 700,
                            color: isPopular ? SPA3_TERRA : 'common.white',
                            bgcolor: isPopular ? 'common.white' : SPA3_TERRA,
                            '&:hover': {
                              bgcolor: isPopular ? SPA3_SAND : SPA3_TERRA_LIGHT,
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
