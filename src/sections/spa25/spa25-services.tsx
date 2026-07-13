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
  SPA25_SERVICES,
} from 'src/sections/spa25/spa25-data';

export function Spa25Services() {
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
      {/* Border Line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${NEON_CYAN}, ${NEON_PINK}, transparent)`,
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Typography
              sx={{
                color: NEON_CYAN,
                letterSpacing: 6,
                fontSize: 11,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {t('services.eyebrow')}
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
              {t('services.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_PINK,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_PINK}60`,
                }}
              >
                {' '}
                {t('services.titleAccent')}
              </Box>
            </Typography>
          </m.div>
        </Box>

        {/* Services Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {SPA25_SERVICES.map((service, index) => (
            <m.div key={service.title} variants={varFade({ distance: 40 }).inUp}>
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  background: NEON_BLACK,
                  border: `1px solid ${NEON_CYAN}30`,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    borderColor: NEON_CYAN,
                    boxShadow: `0 0 40px ${NEON_CYAN}20, inset 0 0 40px ${NEON_CYAN}10`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Corner Accents */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 20,
                    height: 20,
                    borderTop: `2px solid ${NEON_PINK}`,
                    borderLeft: `2px solid ${NEON_PINK}`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 20,
                    height: 20,
                    borderBottom: `2px solid ${NEON_CYAN}`,
                    borderRight: `2px solid ${NEON_CYAN}`,
                  }}
                />

                {/* Tag */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: NEON_BLACK,
                    bgcolor: index % 2 === 0 ? NEON_PINK : NEON_CYAN,
                    px: 1.5,
                    py: 0.5,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  {service.tag}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${NEON_PINK}50`,
                      background: `${NEON_PINK}10`,
                    }}
                  >
                    <Iconify icon={service.icon} sx={{ color: NEON_PINK, fontSize: 28 }} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        color: NEON_WHITE,
                        fontSize: 20,
                        fontWeight: 600,
                        mb: 1,
                        fontFamily: '"Orbitron", sans-serif',
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography sx={{ color: NEON_GRAY, fontSize: 13, lineHeight: 1.6, mb: 2 }}>
                      {service.desc}
                    </Typography>
                    <Typography
                      sx={{
                        color: NEON_CYAN,
                        fontSize: 18,
                        fontWeight: 700,
                        fontFamily: '"Orbitron", sans-serif',
                      }}
                    >
                      {service.price}
                    </Typography>
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
