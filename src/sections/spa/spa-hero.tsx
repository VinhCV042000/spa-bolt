import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { varAlpha, textGradient } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import { SPA1_HERO_SLIDES } from 'src/sections/spa/spa-data';

// ----------------------------------------------------------------------

type HeroStat = { value: string; label: string };

export function SpaHero({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa');

  const stats = t('hero.stats', { returnObjects: true }) as HeroStat[];

  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        minHeight: { xs: 560, md: '100vh' },
        maxHeight: { md: 900 },
        display: 'flex',
        alignItems: 'center',
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
        {SPA1_HERO_SLIDES.map((slide) => (
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
          inset: 0,
          position: 'absolute',
          background: `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.72)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.48)})`,
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
        sx={{ position: 'relative', zIndex: 2, py: { xs: 8, md: 10 } }}
      >
        <Stack
          spacing={4}
          alignItems="center"
          sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto' }}
        >
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.light',
                letterSpacing: 3,
                fontWeight: 'fontWeightBold',
              }}
            >
              {t('hero.brand')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                color: 'common.white',
                fontFamily: theme.typography.fontSecondaryFamily,
                fontSize: { xs: 40, md: 64 },
                lineHeight: { xs: 1.2, md: 1.15 },
              }}
            >
              {t('hero.titleLead')}{' '}
              <Box
                component="span"
                sx={{
                  ...textGradient(
                    `135deg, ${theme.vars.palette.primary.light} 0%, ${theme.vars.palette.warning.light} 100%`
                  ),
                }}
              >
                {t('hero.titleHighlight')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              variant="h6"
              sx={{
                color: varAlpha(theme.vars.palette.common.whiteChannel, 0.72),
                fontWeight: 'fontWeightRegular',
                maxWidth: 560,
              }}
            >
              {t('hero.subtitle')}
            </Typography>
          </Box>

          <Box
            component={m.div}
            variants={varFade({ distance: 24 }).inUp}
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}
          >
            <Button
              component={RouterLink}
              href={paths.spa.booking}
              size="large"
              variant="contained"
              color="primary"
              startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
            >
              {t('hero.bookNow')}
            </Button>

            <Button
              component={RouterLink}
              href={paths.spa.services}
              size="large"
              variant="outlined"
              sx={{
                color: 'common.white',
                borderColor: varAlpha(theme.vars.palette.common.whiteChannel, 0.48),
                '&:hover': {
                  borderColor: 'common.white',
                  bgcolor: varAlpha(theme.vars.palette.common.whiteChannel, 0.08),
                },
              }}
            >
              {t('hero.exploreServices')}
            </Button>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Stack
              direction="row"
              spacing={4}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: 'rgba(255,255,255,0.24)' }}
                />
              }
              sx={{ color: 'common.white' }}
            >
              {stats.map((stat) => (
                <Stack key={stat.label} spacing={0.5} alignItems="center">
                  <Typography variant="h3" sx={{ fontWeight: 'fontWeightBold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.72 }}>
                    {stat.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
