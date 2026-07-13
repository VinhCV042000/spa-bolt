import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { AMETHYST, ROSE_QUARTZ, SPA17_TESTIMONIALS } from 'src/sections/spa17/spa17-data';

export function Spa17Testimonials() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#EDE7F6',
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: AMETHYST,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            ĐÁNH GIÁ · 후기
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: '#2D2A4A',
              lineHeight: 1.2,
            }}
          >
            Trải nghiệm
            <Box component="span" sx={{ color: ROSE_QUARTZ }}>
              {' '}
              khách hàng
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA17_TESTIMONIALS.map((testimonial, index) => (
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
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  background: '#FFF',
                  borderRadius: 4,
                  borderTop: `3px solid ${index % 2 === 0 ? AMETHYST : ROSE_QUARTZ}`,
                  boxShadow: `0 8px 32px ${AMETHYST}10`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 16px 48px ${AMETHYST}18`,
                  },
                }}
              >
                {/* Quote mark */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: -8,
                    left: 20,
                    fontSize: 64,
                    color: `${AMETHYST}20`,
                    fontFamily: 'Georgia, serif',
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </Typography>

                <Typography
                  sx={{
                    color: '#5A5878',
                    fontSize: 14,
                    lineHeight: 1.85,
                    fontStyle: 'italic',
                    mb: 3,
                    position: 'relative',
                    zIndex: 2,
                    pt: 2,
                  }}
                >
                  {testimonial.text}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${AMETHYST}30 0%, ${ROSE_QUARTZ}25 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: AMETHYST, fontSize: 20, fontWeight: 500 }}>
                      {testimonial.name.charAt(0)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: '#2D2A4A', fontSize: 14, fontWeight: 500 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: '#8A88A8', fontSize: 12, mt: 0.25 }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Stack>

                {/* Stars */}
                <Box sx={{ mt: 3 }}>
                  <Stack direction="row" spacing={0.25}>
                    {[...Array(5)].map((_, i) => (
                      <Typography key={i} sx={{ color: '#FFB800', fontSize: 14 }}>
                        ★
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Stats bar */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 6,
            p: 4,
            background: 'linear-gradient(135deg, #FFF 0%, rgba(237,231,246,0.5) 100%)',
            borderRadius: 4,
            border: `1px solid ${AMETHYST}15`,
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 0 }}
            justifyContent="space-around"
            textAlign="center"
            divider={<Box sx={{ width: '1px', height: 40, bgcolor: `${AMETHYST}20` }} />}
          >
            {[
              { value: '4.98', label: 'Đánh giá trung bình' },
              { value: '2,500+', label: 'Khách hàng' },
              { value: '98%', label: 'Tỷ lệ hài lòng' },
            ].map((stat) => (
              <Box key={stat.label}>
                <Typography
                  sx={{
                    background: `linear-gradient(135deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: 32,
                    fontWeight: 300,
                    fontFamily: '"Noto Serif KR", serif',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ color: '#8A88A8', fontSize: 12, letterSpacing: 1 }}>
                  {stat.label.toUpperCase()}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
