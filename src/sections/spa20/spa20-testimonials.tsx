import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
  SPA20_TESTIMONIALS,
} from 'src/sections/spa20/spa20-data';

export function Spa20Testimonials() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: CHAMPAGNE,
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
            ĐÁNH GIÁ · TESTIMONIALS
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
            Trải nghiệm
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
              khách hàng
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA20_TESTIMONIALS.map((testimonial) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={testimonial.name}
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
                  border: `1px solid ${ROSE_GOLD}15`,
                  boxShadow: `0 4px 20px ${DEEP_PLUM}06`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 12px 40px ${ROSE_GOLD}15`,
                  },
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    fontSize: 48,
                    color: `${ROSE_GOLD}15`,
                    fontFamily: 'Georgia, serif',
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </Typography>

                <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Iconify key={i} icon="solar:star-bold" sx={{ color: GOLD, fontSize: 16 }} />
                  ))}
                </Stack>

                <Typography
                  sx={{
                    color: '#5A5A6A',
                    fontSize: 14,
                    lineHeight: 1.85,
                    fontStyle: 'italic',
                    mb: 2.5,
                  }}
                >
                  {testimonial.text}
                </Typography>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${ROSE_GOLD}, ${GOLD})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: '#FFF', fontSize: 14, fontWeight: 500 }}>
                      {testimonial.name.charAt(0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: DEEP_PLUM, fontSize: 14, fontWeight: 500 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: '#8A7A8A', fontSize: 11 }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 12,
                    right: 16,
                    px: 1.5,
                    py: 0.5,
                    bgcolor: CHAMPAGNE,
                    borderRadius: 5,
                  }}
                >
                  <Typography sx={{ color: ROSE_GOLD, fontSize: 10, fontWeight: 500 }}>
                    {testimonial.treatment}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
