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

import { FRESH, JUNGLE, TROP_GOLD, SPA13_HERO_SLIDES } from 'src/sections/spa13/spa13-data';

// ----------------------------------------------------------------------

export function Spa13Hero() {
  const { t } = useTranslate('spa13');

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
        {SPA13_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
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
          background: `linear-gradient(145deg, rgba(13,74,42,0.92) 0%, rgba(13,74,42,0.7) 45%, rgba(13,74,42,0.85) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Rain particles */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          component={m.div}
          animate={{ y: ['-5%', '105%'] }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'linear',
          }}
          sx={{
            position: 'absolute',
            left: `${10 + i * 11}%`,
            top: '-2%',
            width: 1.5,
            height: 20,
            bgcolor: `rgba(240,255,244,0.15)`,
            borderRadius: 4,
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
          sx={{ color: FRESH }}
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
        <Stack spacing={4} sx={{ maxWidth: 620 }}>
          <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
            <Chip
              label={t('hero.badge')}
              sx={{
                bgcolor: TROP_GOLD,
                color: JUNGLE,
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: 1,
              }}
            />
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 40, md: 62 },
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: -2,
              }}
            >
              <Box component="span" sx={{ color: TROP_GOLD }}>
                {t('hero.title1')}
              </Box>
              <br />
              <Box component="span" sx={{ color: FRESH }}>
                {t('hero.title2')}
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  color: 'rgba(240,255,244,0.55)',
                  fontSize: { xs: 20, md: 30 },
                  fontWeight: 500,
                }}
              >
                {t('hero.title3')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(240,255,244,0.6)', lineHeight: 1.85, maxWidth: 500, fontSize: 15 }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {[
                {
                  icon: 'solar:leaf-bold-duotone',
                  text: t('hero.rainforestNote'),
                  color: TROP_GOLD,
                },
                {
                  icon: 'solar:shield-check-bold-duotone',
                  text: t('hero.certNote'),
                  color: '#4CAF50',
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
                    bgcolor: `${color}12`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <Iconify icon={icon} width={14} sx={{ color }} />
                  <Typography variant="caption" sx={{ color, fontWeight: 700, fontSize: 11 }}>
                    {text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:compass-bold-duotone" />}
                sx={{
                  bgcolor: TROP_GOLD,
                  color: JUNGLE,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#D4A820' },
                }}
              >
                {t('hero.startJourney')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                sx={{
                  borderColor: 'rgba(240,255,244,0.2)',
                  color: FRESH,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  '&:hover': { borderColor: TROP_GOLD, color: TROP_GOLD, bgcolor: 'transparent' },
                }}
              >
                {t('hero.viewBotanicals')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
