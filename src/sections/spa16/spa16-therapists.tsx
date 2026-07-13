import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, NIGHT, TERRA, SAFFRON, SPA16_THERAPISTS } from 'src/sections/spa16/spa16-data';

export function Spa16Therapists() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SAND }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center', alignItems: 'center' }}
        >
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: TERRA, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              معالجون · NGHỆ NHÂN
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 54 },
                fontWeight: 300,
                color: NIGHT,
                lineHeight: 1.15,
              }}
            >
              Therapist{' '}
              <Box component="em" sx={{ color: TERRA }}>
                đến từ Maroc
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA16_THERAPISTS.map((t) => (
            <Grid key={t.name} item xs={6} md={3}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover img': { transform: 'scale(1.06)' },
                }}
              >
                <Box
                  sx={{ position: 'relative', height: { xs: 240, md: 360 }, overflow: 'hidden' }}
                >
                  <Box
                    component="img"
                    src={t.img}
                    alt={t.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform .7s ease',
                      filter: 'sepia(0.15)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(180deg, transparent 50%, ${NIGHT}cc 100%)`,
                    }}
                  />
                  <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <Typography
                      sx={{
                        color: SAFFRON,
                        fontSize: 10,
                        letterSpacing: 3,
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {t.from.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: 'serif', fontSize: 20, color: SAND, fontWeight: 500 }}
                    >
                      {t.name}
                    </Typography>
                    <Typography sx={{ color: `${SAND}aa`, fontSize: 12 }}>{t.role}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
