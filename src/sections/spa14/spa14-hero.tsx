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

import {
  GARNET,
  ANTIQUE_GOLD,
  IMPERIAL_CREAM,
  SPA14_HERO_SLIDES,
} from 'src/sections/spa14/spa14-data';

// ----------------------------------------------------------------------

export function Spa14Hero() {
  const { t } = useTranslate('spa14');

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
        bgcolor: '#1A0A12',
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
        {SPA14_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.4) sepia(0.3)',
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
          background: `linear-gradient(to right, rgba(26,10,18,0.97) 0%, rgba(26,10,18,0.75) 50%, rgba(26,10,18,0.5) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Ornamental divider lines */}
      {[20, 80].map((pos) => (
        <Box
          key={pos}
          sx={{
            position: 'absolute',
            top: `${pos}%`,
            left: '5%',
            right: '5%',
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(201,165,90,0.15), transparent)`,
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
          sx={{ color: IMPERIAL_CREAM }}
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
        <Stack spacing={4} sx={{ maxWidth: 600 }}>
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Chip
              label={t('hero.badge')}
              sx={{
                bgcolor: GARNET,
                color: IMPERIAL_CREAM,
                fontWeight: 800,
                letterSpacing: 2,
                fontSize: 11,
                px: 1,
              }}
            />
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 24, height: 1, bgcolor: ANTIQUE_GOLD }} />
              <Typography
                variant="overline"
                sx={{ color: ANTIQUE_GOLD, letterSpacing: 4, fontWeight: 600, fontSize: 11 }}
              >
                {t('hero.tagline')}
              </Typography>
              <Box sx={{ width: 24, height: 1, bgcolor: ANTIQUE_GOLD }} />
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 36, md: 56 },
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: -1.5,
              }}
            >
              <Box component="span" sx={{ color: IMPERIAL_CREAM }}>
                {t('hero.title1')}
              </Box>
              <br />
              <Box component="span" sx={{ color: ANTIQUE_GOLD }}>
                {t('hero.title2')}
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  color: 'rgba(250,240,230,0.5)',
                  fontSize: { xs: 18, md: 26 },
                  fontWeight: 400,
                  letterSpacing: 0,
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
                color: 'rgba(250,240,230,0.55)',
                lineHeight: 1.85,
                maxWidth: 500,
                fontSize: 15,
              }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.5,
                py: 1.25,
                borderRadius: 2,
                border: `1px solid rgba(201,165,90,0.3)`,
                bgcolor: 'rgba(201,165,90,0.06)',
              }}
            >
              <Iconify
                icon="solar:buildings-bold-duotone"
                width={16}
                sx={{ color: ANTIQUE_GOLD }}
              />
              <Typography
                variant="caption"
                sx={{ color: ANTIQUE_GOLD, fontWeight: 700, fontSize: 12, letterSpacing: 1 }}
              >
                {t('hero.heritageBadge')}
              </Typography>
            </Box>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:crown-bold-duotone" />}
                sx={{
                  bgcolor: GARNET,
                  color: IMPERIAL_CREAM,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#701525' },
                }}
              >
                {t('hero.bookImperial')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:wine-bold-duotone" />}
                sx={{
                  borderColor: `rgba(201,165,90,0.3)`,
                  color: ANTIQUE_GOLD,
                  borderRadius: 2,
                  px: 3.5,
                  py: 1.75,
                  '&:hover': { borderColor: ANTIQUE_GOLD, bgcolor: 'rgba(201,165,90,0.05)' },
                }}
              >
                {t('hero.viewWines')}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
