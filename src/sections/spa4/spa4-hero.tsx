import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import { SPA4_IMAGES } from 'src/sections/spa4/spa4-data';

// ----------------------------------------------------------------------

const JADE_GREEN = '#1B4332';
const ROSE_GOLD = '#C9956C';

export function Spa4Hero() {
  const { t } = useTranslate('spa4');

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#FAFAF7',
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        pt: {
          xs: 'calc(var(--layout-header-desktop-height) + 40px)',
          md: 'var(--layout-header-desktop-height)',
        },
        pb: { xs: 6, md: 0 },
      }}
    >
      {/* Decorative circle */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -100, md: -200 },
          right: { xs: -100, md: -200 },
          width: { xs: 400, md: 700 },
          height: { xs: 400, md: 700 },
          borderRadius: '50%',
          bgcolor: '#E8F5E9',
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: -60, md: -120 },
          left: { xs: -60, md: -120 },
          width: { xs: 250, md: 450 },
          height: { xs: 250, md: 450 },
          borderRadius: '50%',
          bgcolor: '#FFF0F3',
          opacity: 0.8,
          zIndex: 0,
        }}
      />

      <Container component={MotionContainer} sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* LEFT: Content */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Chip
                  label={t('hero.badge')}
                  sx={{
                    bgcolor: '#E8F5E9',
                    color: JADE_GREEN,
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: 12,
                    px: 1,
                  }}
                />
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: 36, md: 56, lg: 64 },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: JADE_GREEN,
                    letterSpacing: -1,
                  }}
                >
                  {t('hero.title1')}{' '}
                  <Box
                    component="span"
                    sx={{
                      position: 'relative',
                      color: ROSE_GOLD,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: 0,
                        right: 0,
                        height: 3,
                        bgcolor: ROSE_GOLD,
                        opacity: 0.3,
                        borderRadius: 1,
                      },
                    }}
                  >
                    {t('hero.title2')}
                  </Box>{' '}
                  {t('hero.title3')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', maxWidth: 480, lineHeight: 1.8, fontSize: 16 }}
                >
                  {t('hero.description')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button
                    size="large"
                    variant="contained"
                    startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                    sx={{
                      bgcolor: JADE_GREEN,
                      '&:hover': { bgcolor: '#154428' },
                      borderRadius: 3,
                      px: 3,
                      py: 1.5,
                      fontSize: 15,
                    }}
                  >
                    {t('hero.bookNow')}
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    startIcon={<Iconify icon="solar:play-circle-bold-duotone" />}
                    sx={{
                      borderColor: JADE_GREEN,
                      color: JADE_GREEN,
                      borderRadius: 3,
                      px: 3,
                      py: 1.5,
                      fontSize: 15,
                      '&:hover': { borderColor: JADE_GREEN, bgcolor: '#E8F5E9' },
                    }}
                  >
                    {t('hero.watchVideo')}
                  </Button>
                </Stack>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Stack direction="row" spacing={4} pt={1}>
                  {[
                    {
                      value: '12+',
                      labelKey: 'hero.yearsExp',
                      icon: 'solar:medal-ribbons-star-bold-duotone',
                    },
                    { value: '8K+', labelKey: 'hero.clients', icon: 'solar:hearts-bold-duotone' },
                    {
                      value: '30+',
                      labelKey: 'hero.exclusiveTreatments',
                      icon: 'solar:star-shine-bold-duotone',
                    },
                  ].map((stat) => (
                    <Stack key={stat.labelKey} alignItems="flex-start" spacing={0.25}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify icon={stat.icon} width={18} sx={{ color: ROSE_GOLD }} />
                        <Typography variant="h5" sx={{ fontWeight: 800, color: JADE_GREEN }}>
                          {stat.value}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', lineHeight: 1.2 }}
                      >
                        {t(stat.labelKey)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT: Images */}
          <Grid item xs={12} md={6}>
            <Box
              component={m.div}
              variants={varFade({ distance: 40 }).inRight}
              sx={{ position: 'relative', height: { xs: 380, md: 580 } }}
            >
              {/* Main image */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: { xs: 0, md: 40 },
                  right: 0,
                  bottom: { xs: 60, md: 80 },
                  borderRadius: 6,
                  overflow: 'hidden',
                  boxShadow: '0 32px 80px rgba(27,67,50,0.15)',
                }}
              >
                <Box
                  component="img"
                  src={SPA4_IMAGES.hero1}
                  alt="Jade Blossom Spa"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              {/* Secondary image */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: { xs: 160, md: 200 },
                  height: { xs: 140, md: 180 },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(27,67,50,0.2)',
                  border: '4px solid #FAFAF7',
                }}
              >
                <Box
                  component="img"
                  src={SPA4_IMAGES.hero2}
                  alt="Spa treatment"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              {/* Rating badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: 12, md: 24 },
                  right: { xs: 8, md: 0 },
                  bgcolor: 'white',
                  borderRadius: 3,
                  px: 2,
                  py: 1.5,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Iconify icon="solar:star-bold" sx={{ color: '#FFB800', width: 20, height: 20 }} />
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 800, lineHeight: 1, color: JADE_GREEN }}
                  >
                    4.9/5
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    500+ {t('hero.ratingLabel')}
                  </Typography>
                </Box>
              </Box>

              {/* Today's booking badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: 20, md: 100 },
                  right: { xs: 8, md: 0 },
                  bgcolor: JADE_GREEN,
                  color: 'white',
                  borderRadius: 3,
                  px: 2,
                  py: 1.5,
                  boxShadow: '0 8px 24px rgba(27,67,50,0.3)',
                }}
              >
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                  {t('hero.availableToday')}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  3 {t('hero.slotsLeft')}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
