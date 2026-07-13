import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import { SPA3_SAND, SPA3_BROWN, SPA3_HERO_SLIDES } from 'src/sections/spa3/spa3-data';

// ----------------------------------------------------------------------

export function Spa3Hero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa3');

  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        minHeight: { xs: 600, md: '100vh' },
        display: 'flex',
        alignItems: 'flex-end',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        pt: 'var(--layout-header-desktop-height)',
        ...sx,
      }}
      {...other}
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
        {SPA3_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'absolute',
              inset: 0,
            }}
          />
        ))}
      </Carousel>

      {/* Overlay */}
      <Box
        sx={{
          inset: 0,
          position: 'absolute',
          background: `linear-gradient(to top, ${SPA3_BROWN} 0%, rgba(74,50,40,0.4) 50%, transparent 100%)`,
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
          sx={{ color: 'common.white' }}
        />
      </Box>

      <Container
        component={MotionContainer}
        sx={{ position: 'relative', zIndex: 2, pb: { xs: 8, md: 12 } }}
      >
        <Stack spacing={3} sx={{ maxWidth: 640 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              variant="overline"
              sx={{
                color: SPA3_SAND,
                letterSpacing: 4,
                fontWeight: 'fontWeightBold',
                fontSize: { xs: 11, md: 13 },
              }}
            >
              {t('hero.brand')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              component="h1"
              sx={{
                color: 'common.white',
                fontWeight: 300,
                fontSize: { xs: 36, sm: 48, md: 64 },
                lineHeight: 1.1,
                letterSpacing: -1,
              }}
            >
              {t('hero.titleLine1')}
              <Box component="span" sx={{ display: 'block', fontWeight: 700, color: SPA3_SAND }}>
                {t('hero.titleLine2')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 480 }}>
              {t('hero.subtitle')}
            </Typography>
          </Box>

          <Box
            component={m.div}
            variants={varFade({ distance: 24 }).inUp}
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, pt: 1 }}
          >
            <Button
              component={RouterLink}
              href={paths.spa.booking}
              size="large"
              startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
              sx={{
                px: 4,
                borderRadius: 1,
                color: SPA3_BROWN,
                bgcolor: SPA3_SAND,
                fontWeight: 700,
                '&:hover': { bgcolor: 'common.white' },
              }}
            >
              {t('hero.ctaPrimary')}
            </Button>

            <Button
              component={RouterLink}
              href={paths.spa.services}
              size="large"
              sx={{
                px: 4,
                borderRadius: 1,
                color: SPA3_SAND,
                border: `2px solid ${SPA3_SAND}`,
                fontWeight: 700,
                '&:hover': { bgcolor: 'rgba(245,230,211,0.1)' },
              }}
            >
              {t('hero.ctaSecondary')}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
