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
  SPA25_TESTIMONIALS,
} from 'src/sections/spa25/spa25-data';

export function Spa25Testimonials() {
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
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          background: `linear-gradient(180deg, ${NEON_BLACK} 0%, transparent 100%)`,
        }}
      />

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
              {t('testimonials.eyebrow')}
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
              {t('testimonials.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_CYAN,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_CYAN}60`,
                }}
              >
                {' '}
                {t('testimonials.titleAccent')}
              </Box>
            </Typography>
          </m.div>
        </Box>

        {/* Testimonials Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {SPA25_TESTIMONIALS.map((testimonial, index) => (
            <m.div key={testimonial.name} variants={varFade({ distance: 40 }).inUp}>
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  background: NEON_BLACK,
                  border: `1px solid ${NEON_CYAN}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: NEON_CYAN,
                    boxShadow: `0 0 40px ${NEON_CYAN}20`,
                  },
                }}
              >
                {/* Quote Mark */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 16,
                    color: NEON_PINK,
                    fontSize: 48,
                    fontFamily: 'Georgia, serif',
                    opacity: 0.3,
                  }}
                >
                  &rdquo;
                </Typography>

                {/* Rating */}
                <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Iconify
                      key={i}
                      icon="solar:star-bold"
                      sx={{
                        color: index % 2 === 0 ? NEON_PINK : NEON_CYAN,
                        fontSize: 14,
                        filter: `drop-shadow(0 0 4px ${index % 2 === 0 ? NEON_PINK : NEON_CYAN})`,
                      }}
                    />
                  ))}
                </Stack>

                <Typography
                  sx={{
                    color: NEON_GRAY,
                    fontSize: 14,
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    mb: 3,
                  }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${NEON_PINK}, ${NEON_CYAN})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      color: NEON_WHITE,
                      fontFamily: '"Orbitron", sans-serif',
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </Box>
                  <Box>
                    <Typography sx={{ color: NEON_WHITE, fontSize: 14, fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: NEON_GRAY, fontSize: 11 }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ml: 'auto',
                      px: 1.5,
                      py: 0.5,
                      bgcolor: NEON_DARK,
                      border: `1px solid ${NEON_PINK}50`,
                      color: NEON_PINK,
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                  >
                    {testimonial.treatment}
                  </Box>
                </Stack>
              </Box>
            </m.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
