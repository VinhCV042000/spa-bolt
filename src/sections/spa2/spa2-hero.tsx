import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_LIGHT,
  SPA2_PAGE_IMAGES,
} from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

export function Spa2Hero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa2');

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: SPA2_CREAM,
        minHeight: { xs: 600, md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        pt: 'var(--layout-header-desktop-height)',
        ...sx,
      }}
      {...other}
    >
      {/* Decorative circle */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL_LIGHT,
          opacity: 0.08,
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Container component={MotionContainer} sx={{ position: 'relative', zIndex: 9 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid xs={12} md={6}>
            <Stack spacing={4}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: SPA2_TEAL }} />
                  <Typography
                    variant="overline"
                    sx={{ color: SPA2_TEAL, letterSpacing: 3, fontWeight: 'fontWeightBold' }}
                  >
                    {t('hero.brand')}
                  </Typography>
                </Stack>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 36, sm: 48, md: 56 },
                    lineHeight: 1.15,
                    color: 'grey.900',
                  }}
                >
                  {t('hero.titleLine1')}
                  <Box component="span" sx={{ display: 'block', color: SPA2_TEAL }}>
                    {t('hero.titleLine2')}
                  </Box>
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Typography
                  sx={{ maxWidth: 480, fontSize: 17, lineHeight: 1.8, color: 'grey.600' }}
                >
                  {t('hero.subtitle')}
                </Typography>
              </Box>

              <Box
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
              >
                <Button
                  component={RouterLink}
                  href={paths.spa.booking}
                  size="large"
                  startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                  sx={{
                    px: 4,
                    borderRadius: 50,
                    color: 'common.white',
                    bgcolor: SPA2_TEAL,
                    '&:hover': { bgcolor: SPA2_TEAL_LIGHT },
                  }}
                >
                  {t('hero.ctaPrimary')}
                </Button>

                <Button
                  component={RouterLink}
                  href={paths.spa.services}
                  size="large"
                  sx={{
                    px: 4,
                    borderRadius: 50,
                    color: SPA2_TEAL,
                    border: `2px solid ${SPA2_TEAL}`,
                    '&:hover': { bgcolor: 'rgba(46,139,122,0.06)' },
                  }}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Box>

              {/* Stats row */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
                  {[
                    { num: '10+', label: t('hero.stat1') },
                    { num: '25K+', label: t('hero.stat2') },
                    { num: '98%', label: t('hero.stat3') },
                  ].map((stat) => (
                    <Box key={stat.label}>
                      <Typography variant="h4" sx={{ color: SPA2_TEAL }}>
                        {stat.num}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'grey.500' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inRight}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={SPA2_PAGE_IMAGES.hero}
                  alt="Spa environment"
                  sx={{
                    width: '100%',
                    height: 520,
                    objectFit: 'cover',
                    borderRadius: 4,
                  }}
                />
                {/* Floating card overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -24,
                    left: -24,
                    p: 2.5,
                    bgcolor: 'common.white',
                    borderRadius: 3,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(46,139,122,0.1)' }}>
                    <Iconify icon="solar:star-bold" width={24} sx={{ color: SPA2_TEAL }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">{t('hero.floatingTitle')}</Typography>
                    <Typography variant="caption" sx={{ color: 'grey.500' }}>
                      {t('hero.floatingSub')}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
