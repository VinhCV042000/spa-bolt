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

import { SAND, NIGHT, TERRA, SAFFRON, SPA16_HERO_SLIDES } from 'src/sections/spa16/spa16-data';

export function Spa16Hero() {
  const { t } = useTranslate('spa16');
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
        bgcolor: NIGHT,
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
        {SPA16_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.5) saturate(1.2)',
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
          background: `radial-gradient(ellipse at 30% 50%, ${TERRA}55 0%, ${NIGHT}ee 70%)`,
          zIndex: 1,
        }}
      />

      {/* Decorative arabesque pattern */}
      <Box
        sx={{
          position: 'absolute',
          right: -120,
          top: '10%',
          width: 380,
          height: 380,
          border: `1px solid ${SAFFRON}33`,
          borderRadius: '50%',
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 24,
            border: `1px dashed ${SAFFRON}44`,
            borderRadius: '50%',
          },
        }}
      />

      {/* Arabic text */}
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 16, md: 64 },
          top: '14%',
          writingMode: 'vertical-rl',
          color: `${SAFFRON}55`,
          fontSize: { xs: 36, md: 64 },
          fontWeight: 300,
          letterSpacing: 12,
          zIndex: 2,
          fontFamily: '"Cormorant Garamond",serif',
        }}
      >
        المرفأ
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
          zIndex: 3,
          pt: 'calc(var(--layout-header-desktop-height) + 48px)',
          pb: 12,
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: 760, ml: { xs: 0, md: 8 } }}>
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 48, height: '1px', bgcolor: SAFFRON }} />
              <Typography
                variant="overline"
                sx={{ color: SAFFRON, letterSpacing: 6, fontWeight: 600, fontSize: 11 }}
              >
                {t('hero.eyebrow')}
              </Typography>
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 44, md: 88 },
                fontWeight: 200,
                lineHeight: 1.02,
                letterSpacing: -2,
                color: SAND,
                fontFamily: '"Cormorant Garamond","Times New Roman",serif',
              }}
            >
              {t('hero.title')}
              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: TERRA,
                  fontStyle: 'italic',
                  fontWeight: 300,
                }}
              >
                — {t('hero.titleAccent')}{' '}
                <Box component="span" sx={{ color: SAFFRON }}>
                  {t('hero.titleHighlight')}
                </Box>
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography
              sx={{
                color: 'rgba(242,229,208,0.7)',
                maxWidth: 560,
                lineHeight: 1.9,
                fontSize: 16,
              }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:fire-bold-duotone" />}
                sx={{
                  bgcolor: TERRA,
                  color: SAND,
                  borderRadius: 0,
                  px: 4,
                  py: 1.75,
                  fontWeight: 700,
                  letterSpacing: 1,
                  '&:hover': { bgcolor: '#a84a31' },
                }}
              >
                {t('hero.ctaPrimary')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:cup-hot-bold-duotone" />}
                sx={{
                  borderColor: `${SAFFRON}55`,
                  color: SAFFRON,
                  borderRadius: 0,
                  px: 4,
                  py: 1.75,
                  letterSpacing: 1,
                  '&:hover': { borderColor: SAFFRON, bgcolor: `${SAFFRON}0d` },
                }}
              >
                {t('hero.ctaSecondary')}
              </Button>
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ pt: 4 }}>
            <Stack
              direction="row"
              spacing={4}
              divider={<Box sx={{ width: '1px', bgcolor: `${SAFFRON}33` }} />}
            >
              {(t('hero.stats', { returnObjects: true }) as string[]).map((s, index) => (
                <Box key={`${s}-${index}`}>
                  <Typography
                    sx={{ color: SAFFRON, fontSize: 28, fontWeight: 300, fontFamily: 'serif' }}
                  >
                    {['4', '16', '24'][index]}
                  </Typography>
                  <Typography
                    sx={{ color: 'rgba(242,229,208,0.55)', fontSize: 12, letterSpacing: 2 }}
                  >
                    {s.toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          color: `${SAND}66`,
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: 4, fontSize: 10, display: 'block' }}>
          SCROLL · مخطوطة
        </Typography>
        <Box sx={{ width: '1px', height: 32, bgcolor: `${SAFFRON}55`, mx: 'auto', mt: 1 }} />
      </Box>
    </Box>
  );
}
