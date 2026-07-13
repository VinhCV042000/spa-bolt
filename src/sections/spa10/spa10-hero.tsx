import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import { ICE, TEAL, NORDIC_BLUE, SPA10_HERO_SLIDES } from 'src/sections/spa10/spa10-data';

// ----------------------------------------------------------------------

export function Spa10Hero() {
  const { t } = useTranslate('spa10');

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
        bgcolor: NORDIC_BLUE,
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
        {SPA10_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
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
          background: `linear-gradient(135deg, rgba(11,29,53,0.96) 0%, rgba(11,29,53,0.7) 50%, rgba(0,201,167,0.15) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Aurora animated streaks */}
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          component={m.div}
          animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [1, 1.1, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5 }}
          sx={{
            position: 'absolute',
            top: `${15 + i * 20}%`,
            left: '-10%',
            right: '-10%',
            height: 2,
            background: `linear-gradient(90deg, transparent, ${TEAL}${60 + i * 20}, transparent)`,
            transform: `rotate(${-5 + i * 3}deg)`,
            zIndex: 1,
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
          sx={{ color: ICE }}
        />
      </Box>

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: 'calc(var(--layout-header-desktop-height) + 60px)',
          pb: 12,
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: 620 }}>
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ width: 40, height: 1.5, bgcolor: TEAL }} />
              <Typography
                variant="overline"
                sx={{ color: TEAL, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
              >
                {t('hero.tagline')}
              </Typography>
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 40, md: 62 },
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: -2,
              }}
            >
              <Box component="span" sx={{ color: ICE }}>
                {t('hero.title1')}
              </Box>
              <br />
              <Box component="span" sx={{ color: TEAL }}>
                {t('hero.title2')}
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  color: 'rgba(234,249,246,0.65)',
                  fontSize: { xs: 22, md: 32 },
                  fontWeight: 500,
                  letterSpacing: -0.5,
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
                color: 'rgba(234,249,246,0.55)',
                lineHeight: 1.85,
                maxWidth: 500,
                fontSize: 15,
              }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          {/* Temperature badges */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" spacing={2}>
              {[
                {
                  icon: 'solar:fire-bold-duotone',
                  label: t('hero.tempWarm'),
                  color: '#E85D04',
                  bg: 'rgba(232,93,4,0.12)',
                },
                {
                  icon: 'solar:snowflake-bold-duotone',
                  label: t('hero.tempCold'),
                  color: '#7ECEF4',
                  bg: 'rgba(126,206,244,0.12)',
                },
              ].map(({ icon, label, color, bg }) => (
                <Box
                  key={label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: bg,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Iconify icon={icon} width={16} sx={{ color }} />
                  <Typography variant="caption" sx={{ color, fontWeight: 700, fontSize: 12 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                sx={{
                  bgcolor: TEAL,
                  color: NORDIC_BLUE,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#00A88A' },
                }}
              >
                {t('hero.bookRitual')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                sx={{
                  borderColor: 'rgba(234,249,246,0.2)',
                  color: ICE,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  '&:hover': { borderColor: TEAL, color: TEAL, bgcolor: 'transparent' },
                }}
              >
                {t('hero.viewRituals')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
