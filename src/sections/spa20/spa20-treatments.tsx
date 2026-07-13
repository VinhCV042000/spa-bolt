import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  GOLD,
  ROSE_GOLD,
  CHAMPAGNE,
  DEEP_PLUM,
  SPA20_TREATMENTS,
} from 'src/sections/spa20/spa20-data';

export function Spa20Treatments() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${CHAMPAGNE}20 0%, #FFF 100%)`,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            TRỊ LIỆU · TREATMENTS
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 400,
              color: DEEP_PLUM,
              lineHeight: 1.2,
            }}
          >
            Công nghệ
            <Box
              component="span"
              sx={{
                background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              tiên tiến
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA20_TREATMENTS.map((treatment, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={treatment.code}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 3.5,
                  background: '#FFF',
                  borderRadius: 3,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${ROSE_GOLD}15`,
                  boxShadow: `0 4px 20px ${DEEP_PLUM}06`,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 16px 40px ${ROSE_GOLD}20`,
                    borderColor: `${ROSE_GOLD}40`,
                  },
                }}
              >
                {/* Gradient accent */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${index % 2 === 0 ? ROSE_GOLD : GOLD}, ${DEEP_PLUM})`,
                  }}
                />

                <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, ${ROSE_GOLD}15, ${GOLD}15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={treatment.icon} sx={{ color: ROSE_GOLD, fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        color: DEEP_PLUM,
                        fontSize: 18,
                        fontWeight: 500,
                      }}
                    >
                      {treatment.name}
                    </Typography>
                    <Chip
                      label={treatment.category}
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: CHAMPAGNE,
                        color: ROSE_GOLD,
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: GOLD,
                      fontSize: 22,
                      fontWeight: 600,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {treatment.code}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: '#6A5A6A',
                    fontSize: 14,
                    lineHeight: 1.7,
                    mb: 2.5,
                  }}
                >
                  {treatment.desc}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    pt: 2,
                    borderTop: `1px solid ${ROSE_GOLD}15`,
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Iconify
                      icon="solar:clock-circle-linear"
                      sx={{ color: ROSE_GOLD, fontSize: 16 }}
                    />
                    <Typography sx={{ color: '#8A7A8A', fontSize: 12 }}>
                      {treatment.duration}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      background: `linear-gradient(90deg, ${ROSE_GOLD}, ${DEEP_PLUM})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {treatment.price}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
