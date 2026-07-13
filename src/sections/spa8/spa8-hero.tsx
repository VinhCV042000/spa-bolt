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

import { SPA8_HERO_SLIDES } from 'src/sections/spa8/spa8-data';

// ----------------------------------------------------------------------

const INK = '#1A0A2E';
const GOLD = '#C8A951';
const SAKURA = '#FFB7C5';
const CREAM = '#FFF8F0';

export function Spa8Hero() {
  const { t } = useTranslate('spa8');

  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
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
        {SPA8_HERO_SLIDES.map((slide) => (
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

      {/* Deep ink overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, rgba(26,10,46,0.96) 0%, rgba(26,10,46,0.5) 40%, rgba(26,10,46,0.15) 100%)`,
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
          sx={{ color: CREAM }}
        />
      </Box>

      {/* Vertical Japanese text decoration (right side) */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: 16, md: 48 },
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 14, md: 18 },
            letterSpacing: 8,
            color: 'rgba(200,169,81,0.4)',
            fontWeight: 300,
          }}
        >
          あまや温泉 · AMAYA ONSEN
        </Typography>
      </Box>

      {/* Decorative circle — inspired by "Enso" Zen brush circle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          borderRadius: '50%',
          border: `1px solid rgba(200,169,81,0.12)`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 220, md: 380 },
          height: { xs: 220, md: 380 },
          borderRadius: '50%',
          border: `1px solid rgba(200,169,81,0.06)`,
          zIndex: 1,
        }}
      />

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: 'calc(var(--layout-header-desktop-height) + 20px)',
          pb: { xs: 8, md: 12 },
        }}
      >
        <Stack
          spacing={3}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: { md: 640 } }}
        >
          {/* Japanese characters */}
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              sx={{
                fontSize: { xs: 28, md: 42 },
                fontWeight: 300,
                color: GOLD,
                letterSpacing: 4,
                fontStyle: 'italic',
              }}
            >
              {t('hero.kana')}
            </Typography>
          </Box>

          {/* Subtitle */}
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Box
                sx={{ width: 24, height: 1, bgcolor: SAKURA, display: { xs: 'none', md: 'block' } }}
              />
              <Typography
                variant="overline"
                sx={{ color: SAKURA, letterSpacing: 4, fontWeight: 600, fontSize: 11 }}
              >
                {t('hero.subtitle')}
              </Typography>
              <Box
                sx={{ width: 24, height: 1, bgcolor: SAKURA, display: { xs: 'none', md: 'block' } }}
              />
            </Stack>
          </Box>

          {/* Main title */}
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 36, md: 58, lg: 68 },
                fontWeight: 800,
                lineHeight: 1.1,
                color: CREAM,
                letterSpacing: -1,
              }}
            >
              {t('hero.title1')}{' '}
              <Box component="span" sx={{ color: GOLD }}>
                {t('hero.title2')}
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  fontSize: { xs: 22, md: 36 },
                  fontWeight: 400,
                  letterSpacing: 0,
                  color: 'rgba(255,248,240,0.65)',
                }}
              >
                {t('hero.title3')}
              </Box>
            </Typography>
          </Box>

          {/* Description */}
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255,248,240,0.6)', lineHeight: 1.85, maxWidth: 520, fontSize: 15 }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          {/* Hours */}
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50' }} />
              <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                {t('hero.openDaily')}:{' '}
                <Box component="span" sx={{ color: CREAM, fontWeight: 600 }}>
                  {t('hero.hours')}
                </Box>
              </Typography>
            </Stack>
          </Box>

          {/* CTAs */}
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                sx={{
                  bgcolor: GOLD,
                  color: INK,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#B89641' },
                }}
              >
                {t('hero.bookOmakase')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                sx={{
                  borderColor: 'rgba(255,183,197,0.35)',
                  color: SAKURA,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  '&:hover': { borderColor: SAKURA, bgcolor: 'rgba(255,183,197,0.05)' },
                }}
              >
                {t('hero.viewSeasons')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
