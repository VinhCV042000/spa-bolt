import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import {
  NORDIC_GRAY,
  NORDIC_WHITE,
  NORDIC_CREAM,
  NORDIC_STONE,
  NORDIC_BLACK,
  SPA26_HERO_SLIDES,
} from 'src/sections/spa26/spa26-data';

export function Spa26Hero() {
  const { t } = useTranslate('spa26');
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        background: NORDIC_WHITE,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Hero Carousel */}
      <Carousel
        carousel={carousel}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.08,
        }}
        slotProps={{
          container: { height: '100%' },
          slide: { height: '100%', position: 'relative' },
        }}
      >
        {SPA26_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
            }}
          />
        ))}
      </Carousel>

      {/* Subtle Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${NORDIC_STONE}08 1px, transparent 1px),
            linear-gradient(90deg, ${NORDIC_STONE}08 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
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
          sx={{ color: NORDIC_BLACK }}
        />
      </Box>

      <Container component={MotionViewport} maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}
        >
          {/* Left: Text Content */}
          <Box sx={{ flex: { md: 1 }, pr: { md: 8 }, mb: { xs: 8, md: 0 } }}>
            <m.div variants={varFade({ distance: 30 }).inUp}>
              <Typography
                sx={{
                  color: NORDIC_GRAY,
                  letterSpacing: 6,
                  fontSize: 10,
                  fontWeight: 500,
                  mb: 4,
                  textTransform: 'uppercase',
                }}
              >
                {t('hero.tagline')}
              </Typography>
            </m.div>

            <m.div variants={varFade({ distance: 60 }).inUp}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: 72, md: 120 },
                    fontWeight: 300,
                    color: NORDIC_BLACK,
                    lineHeight: 0.9,
                    letterSpacing: -4,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {t('hero.title')}
                </Typography>
                <Box
                  sx={{
                    width: { xs: 40, md: 60 },
                    height: { xs: 40, md: 60 },
                    borderRadius: '50%',
                    background: NORDIC_STONE,
                    ml: 2,
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: 48, md: 80 },
                  fontWeight: 300,
                  color: NORDIC_STONE,
                  lineHeight: 0.95,
                  letterSpacing: -2,
                }}
              >
                {t('hero.titleAccent')}
              </Typography>
            </m.div>

            <m.div variants={varFade({ distance: 40 }).inUp}>
              <Box sx={{ mt: 6, maxWidth: 400 }}>
                <Typography sx={{ color: NORDIC_BLACK, fontSize: 14, fontWeight: 400, mb: 1 }}>
                  {t('hero.subtitle')}
                </Typography>
                <Typography sx={{ color: NORDIC_GRAY, fontSize: 13, lineHeight: 1.8 }}>
                  {t('hero.description')}
                </Typography>
              </Box>
            </m.div>

            <m.div variants={varFade({ distance: 30 }).inUp}>
              <Stack direction="row" spacing={3} sx={{ mt: 6 }}>
                <Button
                  sx={{
                    px: 4,
                    py: 2,
                    bgcolor: NORDIC_BLACK,
                    color: NORDIC_WHITE,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    borderRadius: 0,
                    '&:hover': { bgcolor: NORDIC_STONE },
                  }}
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Button
                  sx={{
                    px: 4,
                    py: 2,
                    bgcolor: 'transparent',
                    color: NORDIC_BLACK,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    borderRadius: 0,
                    border: `1px solid ${NORDIC_BLACK}`,
                    '&:hover': { bgcolor: NORDIC_CREAM },
                  }}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Stack>
            </m.div>
          </Box>

          {/* Right: Visual Element */}
          <m.div variants={varFade({ distance: 60 }).inUp} style={{ flex: 1 }}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: '100%', md: 400 },
                height: { xs: 400, md: 500 },
                background: NORDIC_CREAM,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Overlapping shapes */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 40,
                  left: -20,
                  width: 200,
                  height: 200,
                  border: `1px solid ${NORDIC_STONE}`,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 60,
                  right: -40,
                  width: 120,
                  height: 300,
                  background: NORDIC_STONE,
                  opacity: 0.3,
                }}
              />
              {/* Center circle */}
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  border: `1px solid ${NORDIC_BLACK}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  color: NORDIC_BLACK,
                  fontWeight: 300,
                  textAlign: 'center',
                  lineHeight: 1.6,
                  px: 3,
                }}
              >
                Est. 2024
                <br />
                Wellness Space
              </Box>
            </Box>
          </m.div>
        </Box>
      </Container>

      {/* Bottom line */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 80,
          left: { xs: 24, md: 80 },
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}
      >
        <Typography
          sx={{
            color: NORDIC_GRAY,
            fontSize: 9,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          Scroll to explore —
        </Typography>
      </Box>
    </Box>
  );
}
