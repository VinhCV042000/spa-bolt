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
  INK,
  TEA,
  RICE,
  JADE,
  CINNABAR,
  SPA19_IMAGES,
  SPA19_HERO_SLIDES,
} from 'src/sections/spa19/spa19-data';

export function Spa19Hero() {
  const { t } = useTranslate('spa19');
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
        background: RICE,
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
        {SPA19_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.15,
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
          background: `linear-gradient(135deg, ${RICE}f0 0%, ${RICE}e8 100%)`,
          zIndex: 1,
        }}
      />

      {/* Ink brush strokes */}
      <Box
        sx={{
          position: 'absolute',
          right: -40,
          top: '8%',
          width: 200,
          height: 400,
          background: `linear-gradient(180deg, ${INK}08 0%, ${INK}12 100%)`,
          transform: 'rotate(15deg)',
          borderRadius: '100px',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '10%',
          bottom: '10%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: `1px solid ${JADE}30`,
          zIndex: 1,
        }}
      />

      {/* Chinese calligraphy */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 16, md: 48 },
          top: '14%',
          writingMode: 'vertical-rl',
          color: `${INK}15`,
          fontSize: { xs: 48, md: 80 },
          fontWeight: 200,
          letterSpacing: 8,
          zIndex: 2,
          fontFamily: '"Noto Serif SC", serif',
        }}
      >
        养生之道
      </Box>

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
          sx={{ color: INK }}
        />
      </Box>

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 3,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
        >
          {/* Left content */}
          <Stack spacing={3} sx={{ flex: 1, maxWidth: { md: 540 } }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 48,
                    height: '2px',
                    background: TEA,
                  }}
                />
                <Typography
                  sx={{
                    color: TEA,
                    letterSpacing: 4,
                    fontWeight: 600,
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
                  fontSize: { xs: 38, md: 58 },
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: INK,
                  fontFamily: '"Noto Serif SC", "Playfair Display", serif',
                }}
              >
                {t('hero.title')}
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    color: JADE,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '0.85em',
                  }}
                >
                  {t('hero.titleAccent')}
                </Box>
              </Typography>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                sx={{
                  color: '#5A5A5A',
                  maxWidth: 400,
                  lineHeight: 1.85,
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
                  startIcon={<Iconify icon="solar:tea-cup-bold-duotone" />}
                  sx={{
                    bgcolor: JADE,
                    color: RICE,
                    borderRadius: 0,
                    px: 4,
                    py: 1.75,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    '&:hover': { bgcolor: '#4a7560' },
                  }}
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:meditation-round-bold-duotone" />}
                  sx={{
                    borderColor: `${TEA}60`,
                    color: TEA,
                    borderRadius: 0,
                    px: 4,
                    py: 1.75,
                    fontWeight: 500,
                    '&:hover': { borderColor: TEA, bgcolor: `${TEA}0a` },
                  }}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Stack>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ pt: 3 }}>
              <Stack direction="row" spacing={4}>
                {[
                  { k: '18', v: 'Thế khí công' },
                  { k: '36', v: 'Huyệt đạo' },
                  { k: '100%', v: 'Thuốc Nam' },
                ].map((s) => (
                  <Box key={s.v}>
                    <Typography
                      sx={{
                        color: TEA,
                        fontSize: 26,
                        fontWeight: 300,
                        fontFamily: '"Noto Serif SC", serif',
                      }}
                    >
                      {s.k}
                    </Typography>
                    <Typography sx={{ color: '#8A8A8A', fontSize: 11, letterSpacing: 1.5 }}>
                      {s.v.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* Right - Zen image */}
          <Box
            component={m.div}
            variants={varFade({ distance: 40 }).inLeft}
            sx={{
              position: 'relative',
              flex: 1,
              maxWidth: { md: 420 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRadius: '200px 200px 4px 4px',
                overflow: 'hidden',
                border: `1px solid ${JADE}20`,
                boxShadow: `0 24px 80px ${INK}12`,
              }}
            >
              <Box
                component="img"
                src={SPA19_IMAGES.hero}
                alt="Dưỡng Sinh"
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
                  background: `linear-gradient(180deg, transparent 60%, ${RICE}f0 100%)`,
                }}
              />
            </Box>
            {/* Ink seal */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: -20,
                width: 64,
                height: 64,
                borderRadius: '4px',
                background: CINNABAR,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 16px ${CINNABAR}40`,
              }}
            >
              <Typography
                sx={{
                  color: RICE,
                  fontSize: 28,
                  fontFamily: '"Noto Serif SC", serif',
                  fontWeight: 600,
                }}
              >
                道
              </Typography>
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
        <Typography sx={{ color: JADE, fontSize: 10, letterSpacing: 3, mb: 1 }}>
          CUỘN · 滚动
        </Typography>
        <Box sx={{ width: '1px', height: 40, bgcolor: INK, mx: 'auto', opacity: 0.3 }} />
      </Box>
    </Box>
  );
}
