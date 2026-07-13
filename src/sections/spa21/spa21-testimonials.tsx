import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  PEARL,
  SILVER,
  LAVENDER,
  CHARCOAL,
  SPA21_TESTIMONIALS,
} from 'src/sections/spa21/spa21-data';

export function Spa21Testimonials() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: PEARL,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: LAVENDER,
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
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: CHARCOAL,
              lineHeight: 1.2,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Khách hàng
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              nói gì
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA21_TESTIMONIALS.map((testimonial) => (
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
                  p: 3,
                  background: '#FFF',
                  borderRadius: 1,
                  height: '100%',
                  border: `1px solid ${SILVER}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 8px 30px ${CHARCOAL}08`,
                    borderColor: LAVENDER,
                  },
                }}
              >
                {/* Rating */}
                <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Iconify
                      key={i}
                      icon="solar:star-bold"
                      sx={{ color: LAVENDER, fontSize: 14 }}
                    />
                  ))}
                </Stack>

                {/* Quote */}
                <Typography
                  sx={{
                    color: '#5A5A6A',
                    fontSize: 13,
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    mb: 2.5,
                  }}
                >
                  &ldquo;{testimonial.text}&rdquo;
                </Typography>

                {/* Author */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${LAVENDER}, ${CHARCOAL})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: '#FFF', fontSize: 12, fontWeight: 500 }}>
                      {testimonial.name.charAt(0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: CHARCOAL, fontSize: 13, fontWeight: 500 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: '#8A8A9A', fontSize: 11 }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>

                {/* Treatment tag */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    px: 1,
                    py: 0.5,
                    bgcolor: PEARL,
                    borderRadius: 0.5,
                  }}
                >
                  <Typography sx={{ color: LAVENDER, fontSize: 9, fontWeight: 600 }}>
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
