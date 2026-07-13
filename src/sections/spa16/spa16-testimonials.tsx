import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, NIGHT, TERRA, SAFFRON, SPA16_TESTIMONIALS } from 'src/sections/spa16/spa16-data';

export function Spa16Testimonials() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: NIGHT, color: SAND }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center', alignItems: 'center' }}
        >
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: SAFFRON, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              شهادات · LỜI KHÁCH
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 32, md: 48 },
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              Từ những người{' '}
              <Box component="em" sx={{ color: TERRA }}>
                đã trở lại
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA16_TESTIMONIALS.map((t) => (
            <Grid key={t.name} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: 4,
                  height: '100%',
                  border: `1px solid ${SAFFRON}33`,
                  position: 'relative',
                  bgcolor: `${SAND}05`,
                }}
              >
                <Iconify
                  icon="solar:quote-up-square-bold"
                  width={28}
                  sx={{ color: TERRA, mb: 2 }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond",serif',
                    fontSize: 20,
                    color: SAND,
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    mb: 3,
                    fontWeight: 300,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </Typography>
                <Box sx={{ pt: 2, borderTop: `1px solid ${SAFFRON}33` }}>
                  <Typography
                    sx={{ color: SAFFRON, fontWeight: 700, fontSize: 14, fontFamily: 'serif' }}
                  >
                    {t.name}
                  </Typography>
                  <Typography sx={{ color: `${SAND}77`, fontSize: 12, letterSpacing: 1 }}>
                    {t.role}
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
