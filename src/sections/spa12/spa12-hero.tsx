import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import {
  CHAMPAGNE,
  DEEP_NAVY,
  PEARL_WHITE,
  SPA12_HERO_SLIDES,
} from 'src/sections/spa12/spa12-data';

// ----------------------------------------------------------------------

export function Spa12Hero() {
  const { t } = useTranslate('spa12');

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
        bgcolor: DEEP_NAVY,
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
        {SPA12_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.3) saturate(0.6)',
              position: 'absolute',
              inset: 0,
            }}
          />
        ))}
      </Carousel>

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, rgba(10,22,40,0.4) 0%, rgba(10,22,40,0.95) 70%)`,
          zIndex: 1,
        }}
      />

      {/* Floating pearl particles */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          component={m.div}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          sx={{
            position: 'absolute',
            width: 6 + i * 2,
            height: 6 + i * 2,
            borderRadius: '50%',
            bgcolor: CHAMPAGNE,
            top: `${20 + i * 12}%`,
            right: `${5 + i * 4}%`,
            opacity: 0.4,
            zIndex: 2,
          }}
        />
      ))}

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
          sx={{ color: PEARL_WHITE }}
        />
      </Box>

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 3,
          pt: 'calc(var(--layout-header-desktop-height) + 60px)',
          pb: 12,
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: 600 }}>
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Chip
              label={t('hero.badge')}
              sx={{
                bgcolor: CHAMPAGNE,
                color: DEEP_NAVY,
                fontWeight: 900,
                letterSpacing: 2,
                fontSize: 11,
                px: 1,
              }}
            />
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 38, md: 60 },
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: -2,
              }}
            >
              <Box component="span" sx={{ color: PEARL_WHITE }}>
                {t('hero.title1')}
              </Box>
              <br />
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {t('hero.title2')}
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  color: 'rgba(249,246,238,0.5)',
                  fontSize: { xs: 20, md: 30 },
                  fontWeight: 500,
                  letterSpacing: 0,
                }}
              >
                {t('hero.title3')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(249,246,238,0.55)',
                lineHeight: 1.85,
                maxWidth: 480,
                fontSize: 15,
              }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" spacing={2}>
              {[
                {
                  icon: 'solar:calendar-bold-duotone',
                  text: t('hero.byAppointment'),
                  color: CHAMPAGNE,
                },
                {
                  icon: 'solar:users-group-bold-duotone',
                  text: t('hero.limitedSlots'),
                  color: '#B76E79',
                },
              ].map(({ icon, text, color }) => (
                <Box
                  key={text}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: `${color}10`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <Iconify icon={icon} width={14} sx={{ color }} />
                  <Typography variant="caption" sx={{ color, fontWeight: 600, fontSize: 11 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:star-bold-duotone" />}
                sx={{
                  bgcolor: CHAMPAGNE,
                  color: DEEP_NAVY,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  fontWeight: 900,
                  '&:hover': { bgcolor: '#B89641' },
                }}
              >
                {t('hero.bookPrivate')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:diamond-bold-duotone" />}
                sx={{
                  borderColor: 'rgba(249,246,238,0.15)',
                  color: PEARL_WHITE,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  '&:hover': { borderColor: CHAMPAGNE, color: CHAMPAGNE, bgcolor: 'transparent' },
                }}
              >
                {t('hero.viewMembership')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
