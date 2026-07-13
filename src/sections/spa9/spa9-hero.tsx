import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import { SPA9_IMAGES, SPA9_HERO_SLIDES } from 'src/sections/spa9/spa9-data';

// ----------------------------------------------------------------------

const AZURE = '#1B6CA8';
const SUN = '#F5A623';
const SAND = '#FDF5E6';
const DARK = '#0A2840';

export function Spa9Hero() {
  const { t } = useTranslate('spa9');

  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        bgcolor: DARK,
      }}
    >
      {/* Hero Carousel */}
      <Carousel
        carousel={carousel}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
        slotProps={{
          container: { height: '100%' },
          slide: { height: '100%', position: 'relative' },
        }}
      >
        {SPA9_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 60%',
              position: 'absolute',
              inset: 0,
            }}
          />
        ))}
      </Carousel>

      {/* Gradient overlay — bottom-heavy */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(160deg, rgba(10,40,64,0.75) 0%, rgba(10,40,64,0.6) 40%, rgba(10,40,64,0.85) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Dot navigation */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 40 },
          left: 0,
          right: 0,
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          sx={{ color: SAND }}
        />
      </Box>

      {/* Wave decoration at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: 80,
          bgcolor: SAND,
          clipPath: 'ellipse(55% 100% at 50% 100%)',
          zIndex: 1,
        }}
      />

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: 'calc(var(--layout-header-desktop-height) + 60px)',
          pb: 14,
        }}
      >
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Left — main content */}
          <Grid item xs={12} md={7}>
            <Stack spacing={4}>
              {/* Tagline */}
              <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Iconify icon="solar:sun-bold-duotone" width={18} sx={{ color: SUN }} />
                  <Typography
                    variant="overline"
                    sx={{ color: SUN, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('hero.tagline')}
                  </Typography>
                </Stack>
              </Box>

              {/* Badge */}
              <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
                <Chip
                  label={t('hero.badge')}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: AZURE,
                    fontWeight: 800,
                    letterSpacing: 1,
                    fontSize: 12,
                  }}
                />
              </Box>

              {/* Title */}
              <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: 36, md: 56, lg: 64 },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: -1.5,
                  }}
                >
                  <Box component="span" sx={{ color: SAND }}>
                    {t('hero.title1')}
                  </Box>{' '}
                  <Box component="span" sx={{ color: SUN }}>
                    {t('hero.title2')}
                  </Box>
                  <br />
                  <Box
                    component="span"
                    sx={{
                      color: SAND,
                      fontSize: { xs: 20, md: 28 },
                      fontWeight: 500,
                      letterSpacing: -0.5,
                    }}
                  >
                    {t('hero.title3')}
                  </Box>
                </Typography>
              </Box>

              {/* Description */}
              <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(253,245,230,0.65)',
                    lineHeight: 1.85,
                    maxWidth: 500,
                    fontSize: 15,
                  }}
                >
                  {t('hero.description')}
                </Typography>
              </Box>

              {/* CTAs */}
              <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    size="large"
                    startIcon={<Iconify icon="solar:compass-bold-duotone" />}
                    sx={{
                      bgcolor: SUN,
                      color: DARK,
                      borderRadius: 3,
                      px: 4,
                      py: 1.75,
                      fontWeight: 800,
                      fontSize: 14,
                      '&:hover': { bgcolor: '#E09517' },
                    }}
                  >
                    {t('hero.startJourney')}
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    startIcon={<Iconify icon="solar:ticket-bold-duotone" />}
                    sx={{
                      borderColor: 'rgba(253,245,230,0.35)',
                      color: SAND,
                      borderRadius: 3,
                      px: 4,
                      py: 1.75,
                      '&:hover': { borderColor: SAND, bgcolor: 'rgba(253,245,230,0.06)' },
                    }}
                  >
                    {t('hero.viewDayPass')}
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Right — info card */}
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inRight}>
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  bgcolor: 'rgba(253,245,230,0.08)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid rgba(245,166,35,0.2)`,
                  p: 4,
                }}
              >
                <Stack spacing={3}>
                  {/* Pool temp */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: `${AZURE}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${AZURE}50`,
                      }}
                    >
                      <Iconify
                        icon="solar:waterdrops-bold-duotone"
                        width={24}
                        sx={{ color: AZURE }}
                      />
                    </Box>
                    <Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(253,245,230,0.5)', fontSize: 11 }}
                      >
                        {t('hero.tempLabel')}
                      </Typography>
                      <Typography variant="h6" sx={{ color: SAND, fontWeight: 800 }}>
                        {t('hero.tempValue')}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Box sx={{ height: 1, bgcolor: 'rgba(245,166,35,0.15)' }} />

                  {/* Open year-round */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(253,245,230,0.65)' }}>
                      {t('hero.openLabel')}
                    </Typography>
                  </Stack>

                  {/* Scenic photo */}
                  <Box sx={{ borderRadius: 3, overflow: 'hidden', height: 200 }}>
                    <Box
                      component="img"
                      src={SPA9_IMAGES.roman}
                      alt="Roman bath"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
