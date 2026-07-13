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
  GOLD,
  BLUSH,
  ROSE_GOLD,
  CHAMPAGNE,
  DEEP_PLUM,
  SPA20_IMAGES,
  SPA20_HERO_SLIDES,
} from 'src/sections/spa20/spa20-data';

export function Spa20Hero() {
  const { t } = useTranslate('spa20');
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
        background: `linear-gradient(135deg, ${CHAMPAGNE} 0%, #FFF 50%, ${BLUSH}40 100%)`,
      }}
    >
      {/* Hero Carousel */}
      <Carousel
        carousel={carousel}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.15,
        }}
        slotProps={{
          container: { height: '100%' },
          slide: { height: '100%', position: 'relative' },
        }}
      >
        {SPA20_HERO_SLIDES.map((slide) => (
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

      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          right: '-5%',
          top: '10%',
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ROSE_GOLD}15 0%, transparent 70%)`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '-3%',
          bottom: '15%',
          width: { xs: 150, md: 300 },
          height: { xs: 150, md: 300 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD}10 0%, transparent 70%)`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '20%',
          top: '20%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${ROSE_GOLD}30`,
          opacity: 0.6,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: '25%',
          bottom: '25%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: `${GOLD}20`,
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
          sx={{ color: DEEP_PLUM }}
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
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
        >
          {/* Left content */}
          <Stack spacing={3} sx={{ flex: 1, maxWidth: { md: 520 } }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 48,
                    height: '2px',
                    background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
                  }}
                />
                <Typography
                  sx={{
                    background: `linear-gradient(90deg, ${ROSE_GOLD}, ${DEEP_PLUM})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: 3,
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
                  fontSize: { xs: 42, md: 64 },
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: DEEP_PLUM,
                  fontFamily: '"Playfair Display", Georgia, serif',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('hero.title')}
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontStyle: 'italic',
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
                  color: '#6A5A6A',
                  maxWidth: 420,
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
                  startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                  sx={{
                    background: `linear-gradient(135deg, ${ROSE_GOLD}, ${DEEP_PLUM})`,
                    color: '#FFF',
                    borderRadius: 50,
                    px: 4,
                    py: 1.75,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    boxShadow: `0 8px 24px ${ROSE_GOLD}40`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${DEEP_PLUM}, ${ROSE_GOLD})`,
                      boxShadow: `0 12px 32px ${ROSE_GOLD}50`,
                    },
                  }}
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:gallery-bold-duotone" />}
                  sx={{
                    borderColor: `${ROSE_GOLD}60`,
                    color: ROSE_GOLD,
                    borderRadius: 50,
                    px: 4,
                    py: 1.75,
                    fontWeight: 500,
                    '&:hover': { borderColor: ROSE_GOLD, bgcolor: `${ROSE_GOLD}0a` },
                  }}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Stack>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ pt: 2 }}>
              <Stack direction="row" spacing={4}>
                {[
                  { k: '10K+', v: 'Khách hàng' },
                  { k: '15+', v: 'Công nghệ' },
                  { k: '98%', v: 'Hài lòng' },
                ].map((s) => (
                  <Box key={s.v}>
                    <Typography
                      sx={{
                        background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: 28,
                        fontWeight: 600,
                      }}
                    >
                      {s.k}
                    </Typography>
                    <Typography sx={{ color: '#8A7A8A', fontSize: 11, letterSpacing: 1.5 }}>
                      {s.v.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* Right - Beauty image */}
          <Box
            component={m.div}
            variants={varFade({ distance: 40 }).inLeft}
            sx={{
              position: 'relative',
              flex: 1,
              maxWidth: { md: 440 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRadius: '200px 200px 40px 40px',
                overflow: 'hidden',
                border: `3px solid ${ROSE_GOLD}30`,
                boxShadow: `0 30px 60px ${DEEP_PLUM}15`,
              }}
            >
              <Box
                component="img"
                src={SPA20_IMAGES.hero}
                alt="Beauty Spa"
                sx={{
                  width: '100%',
                  height: { xs: 380, md: 500 },
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 50%, ${CHAMPAGNE}f0 100%)`,
                }}
              />
            </Box>

            {/* Floating badge */}
            <Box
              component={m.div}
              variants={varFade({ distance: 20 }).inLeft}
              sx={{
                position: 'absolute',
                bottom: 30,
                right: -20,
                background: '#FFF',
                borderRadius: 3,
                p: 2,
                boxShadow: `0 8px 24px ${DEEP_PLUM}12`,
                border: `1px solid ${ROSE_GOLD}20`,
              }}
            >
              <Stack spacing={0.5}>
                <Typography sx={{ color: DEEP_PLUM, fontSize: 14, fontWeight: 600 }}>
                  Premium Care
                </Typography>
                <Stack direction="row" spacing={0.5}>
                  {[...Array(5)].map((_, i) => (
                    <Iconify key={i} icon="solar:star-bold" sx={{ color: GOLD, fontSize: 14 }} />
                  ))}
                </Stack>
              </Stack>
            </Box>

            {/* Gold accent */}
            <Box
              sx={{
                position: 'absolute',
                top: -15,
                left: -15,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${GOLD}, ${ROSE_GOLD})`,
                opacity: 0.2,
              }}
            />
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
        <Typography sx={{ color: ROSE_GOLD, fontSize: 10, letterSpacing: 3, mb: 1 }}>
          KHÁM PHÁ · DISCOVER
        </Typography>
        <Box
          sx={{
            width: 24,
            height: 40,
            border: `1px solid ${ROSE_GOLD}50`,
            borderRadius: 12,
            mx: 'auto',
          }}
        >
          <Box
            component={m.div}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            sx={{
              width: 4,
              height: 8,
              bgcolor: ROSE_GOLD,
              borderRadius: 2,
              mx: 'auto',
              mt: 1,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
