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

import { SPA6_HERO_SLIDES } from 'src/sections/spa6/spa6-data';

// ----------------------------------------------------------------------

const TERRACOTTA = '#C1440E';
const FOREST = '#2D5016';
const CREAM = '#F9F4ED';
const DARK = '#1C1008';

export function Spa6Hero() {
  const { t } = useTranslate('spa6');

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
          height: '100%',
        }}
        slotProps={{
          container: { height: '100%' },
          slide: { height: '100%', position: 'relative' },
        }}
      >
        {SPA6_HERO_SLIDES.map((slide) => (
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

      {/* Multi-layer overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(28,16,8,0.88) 0%, rgba(28,16,8,0.5) 50%, rgba(45,80,22,0.3) 100%)`,
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

      {/* Decorative circle pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: `1px solid rgba(193,68,14,0.2)`,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: `1px solid rgba(193,68,14,0.12)`,
          zIndex: 1,
        }}
      />

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: 'calc(var(--layout-header-desktop-height) + 60px)',
          pb: 10,
        }}
      >
        <Stack spacing={4} sx={{ maxWidth: 680 }}>
          {/* Tagline */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 40, height: 1.5, bgcolor: TERRACOTTA }} />
              <Typography
                variant="overline"
                sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
              >
                {t('hero.tagline')}
              </Typography>
            </Stack>
          </Box>

          {/* Badge */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Chip
              label={t('hero.badge')}
              icon={
                <Iconify
                  icon="solar:leaf-bold-duotone"
                  width={16}
                  sx={{ color: `${FOREST} !important` }}
                />
              }
              sx={{
                bgcolor: CREAM,
                color: FOREST,
                fontWeight: 800,
                px: 1,
                letterSpacing: 1.5,
                fontSize: 12,
              }}
            />
          </Box>

          {/* Title */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 38, md: 62, lg: 72 },
                fontWeight: 900,
                lineHeight: 1.05,
                color: CREAM,
                letterSpacing: -2,
              }}
            >
              {t('hero.title1')}{' '}
              <Box
                component="span"
                sx={{
                  color: 'transparent',
                  WebkitTextStroke: `2px ${TERRACOTTA}`,
                }}
              >
                {t('hero.title2')}
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  color: CREAM,
                  fontSize: { xs: 24, md: 36 },
                  fontWeight: 500,
                  letterSpacing: -1,
                }}
              >
                {t('hero.title3')}
              </Box>
            </Typography>
          </Box>

          {/* Description */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(249,244,237,0.65)',
                lineHeight: 1.85,
                maxWidth: 520,
                fontSize: 15,
              }}
            >
              {t('hero.description')}
            </Typography>
          </Box>

          {/* Tags */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              {(
                [
                  {
                    key: 'hero.certifiedOrganic',
                    icon: 'solar:verified-check-bold-duotone',
                    color: FOREST,
                  },
                  {
                    key: 'hero.sustainableTag',
                    icon: 'solar:leaf-bold-duotone',
                    color: TERRACOTTA,
                  },
                  {
                    key: 'hero.holisticTag',
                    icon: 'solar:heart-shine-bold-duotone',
                    color: '#8B4513',
                  },
                  { key: 'hero.naturalbTag', icon: 'solar:sun-bold-duotone', color: '#C17817' },
                ] as const
              ).map((tag) => (
                <Stack
                  key={tag.key}
                  direction="row"
                  alignItems="center"
                  spacing={0.75}
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    bgcolor: 'rgba(249,244,237,0.08)',
                    border: '1px solid rgba(249,244,237,0.15)',
                  }}
                >
                  <Iconify icon={tag.icon} width={14} sx={{ color: tag.color }} />
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(249,244,237,0.8)', fontWeight: 600, fontSize: 11 }}
                  >
                    {t(tag.key)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* CTAs */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:compass-bold-duotone" />}
                sx={{
                  bgcolor: TERRACOTTA,
                  color: CREAM,
                  borderRadius: 3,
                  px: 4,
                  py: 1.75,
                  fontWeight: 700,
                  fontSize: 14,
                  '&:hover': { bgcolor: '#A83A0C' },
                }}
              >
                {t('hero.startJourney')}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<Iconify icon="solar:calendar-search-bold-duotone" />}
                sx={{
                  borderColor: 'rgba(249,244,237,0.35)',
                  color: CREAM,
                  borderRadius: 3,
                  px: 4,
                  py: 1.75,
                  '&:hover': { borderColor: CREAM, bgcolor: 'rgba(249,244,237,0.06)' },
                }}
              >
                {t('hero.viewRetreats')}
              </Button>
            </Stack>
          </Box>

          {/* Rating */}
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Stack direction="row">
                {[
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80',
                ].map((src, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={src}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: `2px solid ${DARK}`,
                      ml: i > 0 ? -1 : 0,
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Iconify key={i} icon="solar:star-bold" width={14} sx={{ color: '#F5C842' }} />
                ))}
              </Stack>
              <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.5)' }}>
                4.9 · 500+ {t('hero.ratingText')}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* Scroll indicator */}
      <Box
        component={m.div}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 46,
            borderRadius: 14,
            border: `2px solid rgba(249,244,237,0.3)`,
            display: 'flex',
            justifyContent: 'center',
            pt: 1,
          }}
        >
          <Box
            component={m.div}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: TERRACOTTA }}
          />
        </Box>
      </Box>
    </Box>
  );
}
