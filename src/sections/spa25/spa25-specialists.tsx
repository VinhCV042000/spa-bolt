import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
  SPA25_SPECIALISTS,
} from 'src/sections/spa25/spa25-data';

export function Spa25Specialists() {
  const { t } = useTranslate('spa25');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: NEON_BLACK,
      }}
    >
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
              {t('specialists.eyebrow')}
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
              {t('specialists.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_PINK,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_PINK}60`,
                }}
              >
                {' '}
                {t('specialists.titleAccent')}
              </Box>
            </Typography>
          </m.div>
        </Box>

        {/* Specialists */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {SPA25_SPECIALISTS.map((specialist, index) => (
            <m.div key={specialist.name} variants={varFade({ distance: 40 }).inUp}>
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {/* Avatar Circle */}
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 3,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${NEON_PINK}, ${NEON_CYAN})`,
                    p: '3px',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: NEON_DARK,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                      fontWeight: 700,
                      fontFamily: '"Orbitron", sans-serif',
                      color: NEON_WHITE,
                    }}
                  >
                    {specialist.name.charAt(4)}
                    {specialist.name.split(' ')[1]?.charAt(0) || ''}
                  </Box>
                </Box>

                <Typography
                  sx={{
                    color: NEON_WHITE,
                    fontSize: 20,
                    fontWeight: 600,
                    mb: 0.5,
                    fontFamily: '"Orbitron", sans-serif',
                  }}
                >
                  {specialist.name}
                </Typography>

                <Typography
                  sx={{
                    color: index % 2 === 0 ? NEON_PINK : NEON_CYAN,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 2,
                    mb: 1,
                  }}
                >
                  {specialist.role.toUpperCase()}
                </Typography>

                <Typography sx={{ color: NEON_GRAY, fontSize: 13, mb: 2 }}>
                  {specialist.specialty}
                </Typography>

                <Typography sx={{ color: NEON_GRAY, fontSize: 11, mb: 2 }}>
                  {specialist.exp}
                </Typography>

                {/* Certifications */}
                <Stack direction="row" spacing={1} justifyContent="center">
                  {specialist.certifications.map((cert) => (
                    <Box
                      key={cert}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        bgcolor: NEON_DARK,
                        border: `1px solid ${NEON_CYAN}40`,
                        color: NEON_CYAN,
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: 0.5,
                      }}
                    >
                      {cert}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </m.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
