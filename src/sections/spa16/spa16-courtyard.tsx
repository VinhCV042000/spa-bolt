import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, JADE, TERRA, SAFFRON, SPA16_IMAGES } from 'src/sections/spa16/spa16-data';

export function Spa16Courtyard() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 18 },
        bgcolor: JADE,
        color: SAND,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={SPA16_IMAGES.courtyard}
        alt="Courtyard"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.18,
        }}
      />
      <Container component={MotionViewport} maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                sx={{ color: SAFFRON, letterSpacing: 6, fontSize: 11, fontWeight: 600, mb: 2 }}
              >
                فناء · SÂN TRONG
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond",serif',
                  fontSize: { xs: 36, md: 60 },
                  fontWeight: 300,
                  lineHeight: 1.1,
                  mb: 3,
                  letterSpacing: -1,
                }}
              >
                Trà bạc hà &{' '}
                <Box component="em" sx={{ color: TERRA }}>
                  tagine hoàng hôn
                </Box>
              </Typography>
              <Typography
                sx={{ color: `${SAND}cc`, lineHeight: 2, fontSize: 16, maxWidth: 580, mb: 4 }}
              >
                Mỗi 17h chiều, sân trong riad được dọn với gối thổ cẩm Berber, ấm trà bạc hà nóng và
                mâm tagine bảy gia vị. Nhạc oud sống biểu diễn dưới ánh đèn dầu thủ công.
              </Typography>

              <Grid container spacing={3}>
                {[
                  { t: '17:00', l: 'Trà bạc hà Atrai' },
                  { t: '18:30', l: 'Tagine hoàng hôn' },
                  { t: '20:00', l: 'Nhạc oud sống' },
                  { t: '22:00', l: 'Shisha hoa hồng' },
                ].map((s) => (
                  <Grid key={s.t} item xs={6} sm={3}>
                    <Box sx={{ borderTop: `1px solid ${SAFFRON}55`, pt: 2 }}>
                      <Typography
                        sx={{ fontFamily: 'serif', fontSize: 22, color: SAFFRON, fontWeight: 400 }}
                      >
                        {s.t}
                      </Typography>
                      <Typography sx={{ color: `${SAND}aa`, fontSize: 12, letterSpacing: 1 }}>
                        {s.l}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              component={m.div}
              variants={varFade({ distance: 30 }).inRight}
              sx={{ position: 'relative' }}
            >
              <Box
                component="img"
                src={SPA16_IMAGES.argan}
                alt="Tea ceremony"
                sx={{
                  width: '100%',
                  height: { xs: 320, md: 480 },
                  objectFit: 'cover',
                  display: 'block',
                  border: `4px solid ${SAFFRON}77`,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
