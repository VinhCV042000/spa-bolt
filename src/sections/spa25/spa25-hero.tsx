import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  NEON_PINK,
  NEON_CYAN,
  NEON_GRAY,
  NEON_BLACK,
  NEON_WHITE,
  SPA25_HERO,
} from 'src/sections/spa25/spa25-data';

export function Spa25Hero() {
  const { t } = useTranslate('spa25');

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100vh',
        background: NEON_BLACK,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Grid Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${NEON_PINK}08 1px, transparent 1px),
            linear-gradient(90deg, ${NEON_PINK}08 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.4,
        }}
      />

      {/* Glow Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${NEON_PINK}30 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${NEON_CYAN}25 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* Tagline */}
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Typography
              sx={{
                color: NEON_CYAN,
                letterSpacing: 8,
                fontSize: 12,
                fontWeight: 600,
                mb: 3,
                textShadow: `0 0 20px ${NEON_CYAN}80`,
              }}
            >
              {t('hero.tagline')}
            </Typography>
          </m.div>

          {/* Title */}
          <m.div variants={varFade({ distance: 60 }).inUp}>
            <Typography
              sx={{
                fontSize: { xs: 60, md: 120 },
                fontWeight: 200,
                color: NEON_WHITE,
                lineHeight: 0.9,
                fontFamily: '"Orbitron", "Inter", sans-serif',
                letterSpacing: -2,
                mb: 1,
              }}
            >
              {t('hero.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_PINK,
                  fontWeight: 700,
                  textShadow: `0 0 40px ${NEON_PINK}, 0 0 80px ${NEON_PINK}60`,
                }}
              >
                {' '}
                {t('hero.titleAccent')}
              </Box>
            </Typography>
          </m.div>

          {/* Subtitle */}
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Typography
              sx={{
                color: NEON_GRAY,
                fontSize: { xs: 14, md: 18 },
                fontWeight: 300,
                maxWidth: 600,
                mx: 'auto',
                mb: 5,
                lineHeight: 1.8,
              }}
            >
              {t('hero.subtitle')}
            </Typography>
          </m.div>

          {/* CTA Button */}
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Button
              sx={{
                px: 5,
                py: 2,
                bgcolor: 'transparent',
                border: `2px solid ${NEON_PINK}`,
                color: NEON_PINK,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                borderRadius: 0,
                boxShadow: `0 0 30px ${NEON_PINK}40, inset 0 0 20px ${NEON_PINK}20`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: NEON_PINK,
                  color: NEON_BLACK,
                  boxShadow: `0 0 50px ${NEON_PINK}80, inset 0 0 30px transparent`,
                },
              }}
            >
              {t('hero.cta')}
            </Button>
          </m.div>

          {/* Stats */}
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 3, md: 8 }}
              justifyContent="center"
              sx={{ mt: 8 }}
            >
              {SPA25_HERO.stats.map((stat, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 36, md: 48 },
                      fontWeight: 700,
                      color: index % 2 === 0 ? NEON_CYAN : NEON_PINK,
                      fontFamily: '"Orbitron", sans-serif',
                      textShadow: `0 0 30px ${index % 2 === 0 ? NEON_CYAN : NEON_PINK}60`,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: NEON_GRAY, fontSize: 11, letterSpacing: 2, mt: 1 }}>
                    {stat.label.toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </m.div>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <Iconify icon="solar:arrow-down-linear" sx={{ color: NEON_PINK, fontSize: 24 }} />
      </Box>
    </Box>
  );
}
