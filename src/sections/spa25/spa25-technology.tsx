import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  NEON_DARK,
  NEON_PINK,
  NEON_CYAN,
  NEON_GRAY,
  NEON_BLACK,
  NEON_WHITE,
  NEON_PURPLE,
  SPA25_TECHNOLOGIES,
} from 'src/sections/spa25/spa25-data';

export function Spa25Technology() {
  const { t } = useTranslate('spa25');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: NEON_BLACK,
        position: 'relative',
      }}
    >
      {/* Horizontal Scan Line Animation Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          background: `linear-gradient(180deg, ${NEON_CYAN}08 0%, transparent 100%)`,
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Typography
              sx={{
                color: NEON_PINK,
                letterSpacing: 6,
                fontSize: 11,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {t('technology.eyebrow')}
            </Typography>
          </m.div>
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 32, md: 48 },
                fontWeight: 200,
                color: NEON_WHITE,
                fontFamily: '"Orbitron", "Inter", sans-serif',
              }}
            >
              {t('technology.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_CYAN,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_CYAN}60`,
                }}
              >
                {' '}
                {t('technology.titleAccent')}
              </Box>
            </Typography>
          </m.div>
        </Box>

        {/* Tech Grid - Hexagonal-inspired layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {SPA25_TECHNOLOGIES.map((tech, index) => (
            <m.div key={tech.name} variants={varFade({ distance: 30 }).inUp}>
              <Box
                sx={{
                  position: 'relative',
                  p: 3,
                  background: 'transparent',
                  border: `1px solid ${NEON_PURPLE}40`,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  clipPath:
                    'polygon(10% 0%, 90% 0%, 100% 15%, 100% 85%, 90% 100%, 10% 100%, 0% 85%, 0% 15%)',
                  '&:hover': {
                    borderColor: NEON_PURPLE,
                    background: `${NEON_PURPLE}10`,
                    boxShadow: `0 0 40px ${NEON_PURPLE}30`,
                  },
                }}
              >
                {/* Tech Icon */}
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${NEON_CYAN}`,
                    borderRadius: '50%',
                    background: `${NEON_CYAN}10`,
                  }}
                >
                  <Iconify icon={tech.icon} sx={{ color: NEON_CYAN, fontSize: 28 }} />
                </Box>

                <Typography
                  sx={{
                    color: NEON_WHITE,
                    fontSize: 16,
                    fontWeight: 600,
                    mb: 1,
                    fontFamily: '"Orbitron", sans-serif',
                  }}
                >
                  {tech.name}
                </Typography>

                <Typography sx={{ color: NEON_GRAY, fontSize: 12, lineHeight: 1.6, mb: 2 }}>
                  {tech.desc}
                </Typography>

                {/* Spec Badge */}
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    bgcolor: NEON_PINK,
                    color: NEON_BLACK,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  {tech.spec}
                </Box>
              </Box>
            </m.div>
          ))}
        </Box>

        {/* Bottom Spec Bar */}
        <m.div variants={varFade({ distance: 20 }).inUp}>
          <Box
            sx={{
              mt: 6,
              p: 2,
              background: NEON_DARK,
              border: `1px solid ${NEON_CYAN}30`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 6 },
              flexWrap: 'wrap',
            }}
          >
            {['FDA Approved', 'CE Certified', 'ISO 13485', 'GMP Standard'].map((cert, i) => (
              <Stack key={cert} direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: i % 2 === 0 ? NEON_PINK : NEON_CYAN,
                    boxShadow: `0 0 10px ${i % 2 === 0 ? NEON_PINK : NEON_CYAN}`,
                  }}
                />
                <Typography sx={{ color: NEON_GRAY, fontSize: 11, letterSpacing: 1 }}>
                  {cert}
                </Typography>
              </Stack>
            ))}
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}
