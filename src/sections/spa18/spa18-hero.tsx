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
  SAND,
  LOTUS,
  CORAL,
  JUNGLE,
  BAMBOO,
  SPA18_IMAGES,
  SPA18_HERO_SLIDES,
} from 'src/sections/spa18/spa18-data';

export function Spa18Hero() {
  const { t } = useTranslate('spa18');
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
        background: `linear-gradient(135deg, ${JUNGLE} 0%, ${JUNGLE}dd 50%, #0D2818 100%)`,
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
        {SPA18_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.25,
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
          background: `linear-gradient(180deg, ${JUNGLE}99 0%, ${JUNGLE}cc 60%, #0D2818 100%)`,
          zIndex: 1,
        }}
      />

      {/* Tropical leaves decoration */}
      <Box
        sx={{
          position: 'absolute',
          right: -80,
          top: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: `2px solid ${BAMBOO}25`,
          transform: 'rotate(15deg)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: 40,
          top: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: `1px dashed ${LOTUS}30`,
          transform: 'rotate(-10deg)',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: -60,
          bottom: '20%',
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${BAMBOO}15 0%, transparent 70%)`,
          zIndex: 1,
        }}
      />

      {/* Balinese text */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 16, md: 48 },
          top: '16%',
          writingMode: 'vertical-rl',
          color: `${LOTUS}20`,
          fontSize: { xs: 36, md: 72 },
          fontWeight: 200,
          letterSpacing: 8,
          zIndex: 2,
          fontFamily: '"Playfair Display", serif',
        }}
      >
        Swastiastu
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
          sx={{ color: SAND }}
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
          <Stack spacing={3} sx={{ flex: 1, maxWidth: { md: 560 } }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 48,
                    height: '2px',
                    background: LOTUS,
                  }}
                />
                <Typography
                  sx={{
                    color: LOTUS,
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
                  fontSize: { xs: 40, md: 60 },
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: SAND,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                {t('hero.title')}
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    color: BAMBOO,
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  {t('hero.titleAccent')}
                </Box>
              </Typography>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                sx={{
                  color: 'rgba(253,246,227,0.75)',
                  maxWidth: 440,
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
                  startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                  sx={{
                    bgcolor: BAMBOO,
                    color: SAND,
                    borderRadius: 0,
                    px: 4,
                    py: 1.75,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    '&:hover': { bgcolor: '#3d9268' },
                  }}
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:flower-bold-duotone" />}
                  sx={{
                    borderColor: `${LOTUS}60`,
                    color: LOTUS,
                    borderRadius: 0,
                    px: 4,
                    py: 1.75,
                    letterSpacing: 0.5,
                    '&:hover': { borderColor: LOTUS, bgcolor: `${LOTUS}12` },
                  }}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Stack>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ pt: 3 }}>
              <Stack direction="row" spacing={4}>
                {[
                  { k: '12', v: 'Loại thảo mộc' },
                  { k: '6', v: 'Villa tropical' },
                  { k: '100%', v: 'Dầu dừa tươi' },
                ].map((s) => (
                  <Box key={s.v}>
                    <Typography
                      sx={{
                        color: LOTUS,
                        fontSize: 28,
                        fontWeight: 300,
                        fontFamily: 'serif',
                      }}
                    >
                      {s.k}
                    </Typography>
                    <Typography
                      sx={{ color: 'rgba(253,246,227,0.55)', fontSize: 11, letterSpacing: 2 }}
                    >
                      {s.v.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* Right - Ritual cards */}
          <Stack
            component={m.div}
            variants={varFade({ distance: 40 }).inLeft}
            spacing={2}
            sx={{ flex: 1, maxWidth: { md: 380 } }}
          >
            {SPA18_IMAGES.ritual1 && (
              <>
                <Box
                  sx={{
                    position: 'relative',
                    p: 2.5,
                    bgcolor: 'rgba(27,67,50,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${BAMBOO}30`,
                    borderLeft: `4px solid ${LOTUS}`,
                  }}
                >
                  <Typography sx={{ color: LOTUS, fontSize: 11, letterSpacing: 2, mb: 1 }}>
                    BALINESE RITUAL
                  </Typography>
                  <Typography sx={{ color: SAND, fontSize: 18, fontWeight: 500, mb: 0.5 }}>
                    Lulur Sữa Dừa
                  </Typography>
                  <Typography sx={{ color: 'rgba(253,246,227,0.65)', fontSize: 13 }}>
                    Tẩy da chết truyền thống Java — da mịn màng hương tropical
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    p: 2.5,
                    bgcolor: 'rgba(27,67,50,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${BAMBOO}30`,
                    borderLeft: `4px solid ${BAMBOO}`,
                  }}
                >
                  <Typography sx={{ color: BAMBOO, fontSize: 11, letterSpacing: 2, mb: 1 }}>
                    HOT STONE THERAPY
                  </Typography>
                  <Typography sx={{ color: SAND, fontSize: 18, fontWeight: 500, mb: 0.5 }}>
                    Basalt Massage
                  </Typography>
                  <Typography sx={{ color: 'rgba(253,246,227,0.65)', fontSize: 13 }}>
                    Đá núi lửa nóng + dầu dừa nguyên chất — lưu thông khí huyết
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'relative',
                    p: 2.5,
                    bgcolor: 'rgba(27,67,50,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${BAMBOO}30`,
                    borderLeft: `4px solid ${CORAL}`,
                  }}
                >
                  <Typography sx={{ color: CORAL, fontSize: 11, letterSpacing: 2, mb: 1 }}>
                    FLOWER BATH
                  </Typography>
                  <Typography sx={{ color: SAND, fontSize: 18, fontWeight: 500, mb: 0.5 }}>
                    Frangipani soak
                  </Typography>
                  <Typography sx={{ color: 'rgba(253,246,227,0.65)', fontSize: 13 }}>
                    Tắm hoa nhiệt đới — thư giãn tuyệt đối giữa vườn xanh
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
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
        <Typography sx={{ color: LOTUS, fontSize: 10, letterSpacing: 3, mb: 1 }}>SCROLL</Typography>
        <Box sx={{ width: '1px', height: 40, bgcolor: BAMBOO, mx: 'auto' }} />
      </Box>
    </Box>
  );
}
