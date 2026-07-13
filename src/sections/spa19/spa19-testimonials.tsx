import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { INK, TEA, JADE, SPA19_TESTIMONIALS } from 'src/sections/spa19/spa19-data';

export function Spa19Testimonials() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#F8F5F0',
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: TEA,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            ĐÁNH GIÁ · 评价
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: INK,
              lineHeight: 1.2,
            }}
          >
            Trải nghiệm
            <Box component="span" sx={{ color: JADE }}>
              {' '}
              khách hàng
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA19_TESTIMONIALS.map((testimonial, index) => (
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
                  background: '#FFF',
                  border: `1px solid ${JADE}15`,
                  borderBottom: `3px solid ${index % 2 === 0 ? JADE : TEA}`,
                  height: '100%',
                  boxShadow: `0 4px 20px ${INK}06`,
                }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    fontSize: 48,
                    color: `${TEA}20`,
                    fontFamily: '"Noto Serif SC", serif',
                    lineHeight: 1,
                  }}
                >
                  引
                </Typography>
                <Typography
                  sx={{
                    color: '#5A5A5A',
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
                      borderRadius: '2px',
                      border: `1px solid ${JADE}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{ color: JADE, fontSize: 14, fontFamily: '"Noto Serif SC", serif' }}
                    >
                      {testimonial.name.charAt(0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: INK, fontSize: 14, fontWeight: 500 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: '#8A8A8A', fontSize: 11 }}>
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
