import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, LOTUS, JUNGLE, BAMBOO, SPA18_TESTIMONIALS } from 'src/sections/spa18/spa18-data';

export function Spa18Testimonials() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: JUNGLE,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: LOTUS,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            ĐÁNH GIÁ · ULASAN
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: SAND,
              lineHeight: 1.2,
            }}
          >
            Trải nghiệm
            <Box component="span" sx={{ color: BAMBOO }}>
              {' '}
              khách hàng
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA18_TESTIMONIALS.map((testimonial, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={testimonial.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 3.5,
                  background: 'rgba(0,0,0,0.25)',
                  border: `1px solid ${BAMBOO}20`,
                  borderTop: `3px solid ${index % 2 === 0 ? LOTUS : BAMBOO}`,
                  height: '100%',
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    fontSize: 48,
                    color: `${LOTUS}25`,
                    fontFamily: '"Playfair Display", serif',
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(253,246,227,0.75)',
                    fontSize: 14,
                    lineHeight: 1.85,
                    fontStyle: 'italic',
                    mb: 2.5,
                  }}
                >
                  {testimonial.text}
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: `${BAMBOO}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: LOTUS, fontSize: 14 }}>
                      {testimonial.name.charAt(0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: SAND, fontSize: 14, fontWeight: 500 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(253,246,227,0.55)', fontSize: 11 }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
