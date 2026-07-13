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

import {
  PEARL,
  SILVER,
  LAVENDER,
  CHARCOAL,
  ROSE_QUARTZ,
  SPA21_IMAGES,
  SPA21_HERO_SLIDES,
} from 'src/sections/spa21/spa21-data';

export function Spa21Hero() {
  const { t } = useTranslate('spa21');
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
        pt: 'calc(var(--layout-header-desktop-height))',
        background: PEARL,
      }}
    >
      {/* Hero Carousel */}
      <Carousel
        carousel={carousel}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.12,
        }}
        slotProps={{
          container: { height: '100%' },
          slide: { height: '100%', position: 'relative' },
        }}
      >
        {SPA21_HERO_SLIDES.map((slide) => (
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

      {/* Clean geometric shapes */}
      <Box
        sx={{
          position: 'absolute',
          right: '-8%',
          top: '-5%',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${LAVENDER}15, ${ROSE_QUARTZ}10)`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '-5%',
          bottom: '10%',
          width: { xs: 200, md: 350 },
          height: { xs: 200, md: 350 },
          borderRadius: '50%',
          background: `linear-gradient(225deg, ${SILVER}15, ${LAVENDER}08)`,
          zIndex: 1,
        }}
      />
      {/* Grid lines */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${CHARCOAL}03 1px, transparent 1px),
            linear-gradient(90deg, ${CHARCOAL}03 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.5,
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
          sx={{ color: CHARCOAL }}
        />
      </Box>

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 12 }}
          alignItems="center"
        >
          {/* Left content */}
          <Stack spacing={3} sx={{ flex: 1, maxWidth: { md: 500 } }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: `2px solid ${LAVENDER}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify
                    icon="solar:medical-kit-bold-duotone"
                    sx={{ color: LAVENDER, fontSize: 18 }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: CHARCOAL,
                    letterSpacing: 3,
                    fontWeight: 500,
                    fontSize: 11,
                    textTransform: 'uppercase',
                  }}
                >
                  {t('hero.eyebrow')}
                </Typography>
              </Stack>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 38, md: 56 },
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: CHARCOAL,
                  fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('hero.title')}
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    color: LAVENDER,
                    fontWeight: 500,
                  }}
                >
                  {t('hero.titleAccent')}
                </Box>
              </Typography>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                sx={{
                  color: '#6A6A7A',
                  maxWidth: 380,
                  lineHeight: 1.8,
                  fontSize: 15,
                }}
              >
                {t('hero.description')}
              </Typography>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  size="large"
                  startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                  sx={{
                    bgcolor: CHARCOAL,
                    color: '#FFF',
                    borderRadius: 1,
                    px: 4,
                    py: 1.75,
                    fontWeight: 500,
                    letterSpacing: 0.3,
                    '&:hover': { bgcolor: '#2a3640' },
                  }}
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:document-text-bold-duotone" />}
                  sx={{
                    borderColor: `${CHARCOAL}40`,
                    color: CHARCOAL,
                    borderRadius: 1,
                    px: 4,
                    py: 1.75,
                    fontWeight: 500,
                    '&:hover': { borderColor: CHARCOAL, bgcolor: `${CHARCOAL}08` },
                  }}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Stack>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ pt: 2 }}>
              <Stack direction="row" spacing={4}>
                {[
                  { k: 'FDA', v: 'Công nghệ' },
                  { k: 'MD', v: 'Bác sĩ' },
                  { k: 'ISO', v: 'Chứng nhận' },
                ].map((s) => (
                  <Box key={s.v}>
                    <Typography
                      sx={{
                        color: LAVENDER,
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      {s.k}
                    </Typography>
                    <Typography
                      sx={{ color: '#8A8A9A', fontSize: 11, letterSpacing: 1.5, mt: 0.25 }}
                    >
                      {s.v.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* Right - Clinical luxury image */}
          <Box
            component={m.div}
            variants={varFade({ distance: 40 }).inLeft}
            sx={{
              position: 'relative',
              flex: 1,
              maxWidth: { md: 460 },
            }}
          >
            {/* Main image */}
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: `0 24px 80px ${CHARCOAL}12`,
                border: `1px solid ${SILVER}30`,
              }}
            >
              <Box
                component="img"
                src={SPA21_IMAGES.hero}
                alt="MediSpa"
                sx={{
                  width: '100%',
                  height: { xs: 380, md: 480 },
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 60%, ${PEARL}f0 100%)`,
                }}
              />
            </Box>

            {/* Clinical badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                background: '#FFF',
                p: 2,
                borderRadius: 1,
                boxShadow: `0 8px 24px ${CHARCOAL}10`,
                border: `1px solid ${SILVER}30`,
              }}
            >
              <Stack spacing={1}>
                <Typography sx={{ color: CHARCOAL, fontSize: 13, fontWeight: 600 }}>
                  Clinical Grade
                </Typography>
                <Stack direction="row" spacing={0.5}>
                  {['FDA', 'CE', 'ISO'].map((badge) => (
                    <Box
                      key={badge}
                      sx={{
                        px: 1,
                        py: 0.25,
                        bgcolor: LAVENDER,
                        color: '#FFF',
                        fontSize: 9,
                        fontWeight: 600,
                        borderRadius: 0.5,
                      }}
                    >
                      {badge}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>

            {/* Floating tech icon */}
            <Box
              sx={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 24px ${CHARCOAL}10`,
                border: `1px solid ${SILVER}30`,
              }}
            >
              <Iconify
                icon="solar:microscope-bold-duotone"
                sx={{ color: LAVENDER, fontSize: 28 }}
              />
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: 1,
            height: 50,
            bgcolor: CHARCOAL,
            mx: 'auto',
            opacity: 0.15,
          }}
        />
      </Box>
    </Box>
  );
}
