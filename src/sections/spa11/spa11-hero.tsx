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
  TERRACOTTA,
  ARGAN_GOLD,
  CREAM_WARM,
  SPA11_HERO_SLIDES,
} from 'src/sections/spa11/spa11-data';

// ----------------------------------------------------------------------

export function Spa11Hero() {
  const { t } = useTranslate('spa11');

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
        {SPA11_HERO_SLIDES.map((slide) => (
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

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, rgba(30,12,5,0.97) 0%, rgba(30,12,5,0.6) 40%, rgba(30,12,5,0.2) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Arabesque pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.04,
          backgroundImage: `radial-gradient(${ARGAN_GOLD} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Right side Arabic decorative text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: 16, md: 48 },
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 12, md: 15 },
            letterSpacing: 6,
            color: `rgba(212,160,23,0.35)`,
            fontWeight: 300,
          }}
        >
          حمام مراكش · HAMMAM MARRAKECH
        </Typography>
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
          sx={{ color: CREAM_WARM }}
        />
      </Box>

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: 'calc(var(--layout-header-desktop-height) + 20px)',
          pb: { xs: 8, md: 14 },
        }}
      >
        <Stack spacing={3.5} sx={{ maxWidth: { md: 580 } }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 28, height: 1.5, bgcolor: TERRACOTTA }} />
              <Typography
                variant="overline"
                sx={{ color: ARGAN_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
              >
                {t('hero.tagline')}
              </Typography>
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 36, md: 58 },
                fontWeight: 900,
                lineHeight: 1.1,
                color: CREAM_WARM,
                letterSpacing: -1,
              }}
            >
              {t('hero.title1')}{' '}
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {t('hero.title2')}
              </Box>
              <br />
              <Box
                component="span"
                sx={{ color: ARGAN_GOLD, fontSize: { xs: 22, md: 34 }, fontWeight: 600 }}
              >
                {t('hero.title3')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,243,227,0.6)', lineHeight: 1.85, maxWidth: 480, fontSize: 15 }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Stack direction="row" spacing={3}>
              {[
                { icon: 'solar:clock-circle-bold-duotone', text: t('hero.openHours') },
                { icon: 'solar:users-group-bold-duotone', text: t('hero.genderNote') },
              ].map(({ icon, text }) => (
                <Stack key={text} direction="row" spacing={1} alignItems="center">
                  <Iconify icon={icon} width={15} sx={{ color: ARGAN_GOLD }} />
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(253,243,227,0.5)', fontSize: 12 }}
                  >
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:bath-bold-duotone" />}
                sx={{
                  bgcolor: TERRACOTTA,
                  color: CREAM_WARM,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#A33D24' },
                }}
              >
                {t('hero.bookHammam')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:document-bold-duotone" />}
                sx={{
                  borderColor: `rgba(212,160,23,0.35)`,
                  color: ARGAN_GOLD,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  '&:hover': { borderColor: ARGAN_GOLD, bgcolor: 'rgba(212,160,23,0.06)' },
                }}
              >
                {t('hero.viewMenu')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
