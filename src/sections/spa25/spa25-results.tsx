import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  NEON_DARK,
  NEON_PINK,
  NEON_CYAN,
  NEON_GRAY,
  NEON_BLACK,
  NEON_WHITE,
  SPA25_RESULTS,
} from 'src/sections/spa25/spa25-data';

export function Spa25Results() {
  const { t } = useTranslate('spa25');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: NEON_DARK,
        position: 'relative',
      }}
    >
      {/* Vertical Scan Lines */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 1,
              left: `${20 + i * 15}%`,
              background: `linear-gradient(180deg, transparent, ${NEON_CYAN}10, transparent)`,
            }}
          />
        ))}
      </Box>

      <Container component={MotionViewport} maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
              {t('results.eyebrow')}
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
              {t('results.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_CYAN,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_CYAN}60`,
                }}
              >
                {' '}
                {t('results.titleAccent')}
              </Box>
            </Typography>
          </m.div>
        </Box>

        {/* Timeline */}
        <Box sx={{ position: 'relative' }}>
          {/* Horizontal Line */}
          <Box
            sx={{
              position: { xs: 'absolute', md: 'absolute' },
              top: { xs: 24, md: '50%' },
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${NEON_PINK}, ${NEON_CYAN})`,
              transform: { md: 'translateY(-50%)' },
              boxShadow: `0 0 20px ${NEON_CYAN}40`,
            }}
          />

          {/* Results Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: 4,
            }}
          >
            {SPA25_RESULTS.map((result, index) => (
              <m.div key={result.day} variants={varFade({ distance: 40 }).inUp}>
                <Box sx={{ textAlign: { xs: 'left', md: 'center' }, position: 'relative' }}>
                  {/* Dot */}
                  <Box
                    sx={{
                      position: { xs: 'absolute', md: 'relative' },
                      left: { xs: 0, md: 'auto' },
                      top: { xs: 24, md: 'auto' },
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      bgcolor: NEON_BLACK,
                      border: `3px solid ${index % 2 === 0 ? NEON_PINK : NEON_CYAN}`,
                      mx: { md: 'auto' },
                      mb: { md: 3 },
                      boxShadow: `0 0 20px ${index % 2 === 0 ? NEON_PINK : NEON_CYAN}60`,
                    }}
                  />

                  {/* Content */}
                  <Box sx={{ pl: { xs: 4, md: 0 }, pt: { xs: 4, md: 0 } }}>
                    <Typography
                      sx={{
                        color: index % 2 === 0 ? NEON_PINK : NEON_CYAN,
                        fontSize: 14,
                        fontWeight: 700,
                        fontFamily: '"Orbitron", sans-serif',
                        letterSpacing: 1,
                        mb: 1,
                      }}
                    >
                      {result.day}
                    </Typography>

                    {/* Progress Bar */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          height: 4,
                          background: NEON_BLACK,
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            height: '100%',
                            width: `${result.percent}%`,
                            background:
                              index % 2 === 0
                                ? `linear-gradient(90deg, ${NEON_PINK}, ${NEON_PINK}80)`
                                : `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_CYAN}80)`,
                            boxShadow: `0 0 10px ${index % 2 === 0 ? NEON_PINK : NEON_CYAN}60`,
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          color: NEON_WHITE,
                          fontSize: 24,
                          fontWeight: 700,
                          fontFamily: '"Orbitron", sans-serif',
                          mt: 1,
                        }}
                      >
                        {result.percent}%
                      </Typography>
                    </Box>

                    <Typography sx={{ color: NEON_GRAY, fontSize: 12, lineHeight: 1.6 }}>
                      {result.effect}
                    </Typography>
                  </Box>
                </Box>
              </m.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
