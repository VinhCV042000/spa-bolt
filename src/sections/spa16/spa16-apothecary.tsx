import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  SAND,
  NIGHT,
  TERRA,
  SAFFRON,
  SPA16_IMAGES,
  SPA16_APOTHECARY,
} from 'src/sections/spa16/spa16-data';

export function Spa16Apothecary() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SAND }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              component={m.div}
              variants={varFade({ distance: 30 }).inLeft}
              sx={{ position: 'relative' }}
            >
              <Box
                component="img"
                src={SPA16_IMAGES.apothecary}
                alt="Apothecary souk"
                sx={{
                  width: '100%',
                  height: { xs: 320, md: 540 },
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -24,
                  right: -24,
                  px: 3,
                  py: 2,
                  bgcolor: TERRA,
                  color: SAND,
                  display: { xs: 'none', md: 'block' },
                }}
              >
                <Typography sx={{ fontSize: 11, letterSpacing: 3, fontWeight: 700 }}>
                  SOUK
                </Typography>
                <Typography sx={{ fontFamily: 'serif', fontSize: 22, fontWeight: 400 }}>
                  24 nguyên liệu Berber
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
              <Typography
                sx={{ color: TERRA, letterSpacing: 6, fontSize: 11, fontWeight: 600, mb: 2 }}
              >
                صيدلية · NHÀ THUỐC
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond",serif',
                  fontSize: { xs: 32, md: 46 },
                  fontWeight: 300,
                  color: NIGHT,
                  mb: 2,
                  lineHeight: 1.15,
                }}
              >
                Apothecary{' '}
                <Box component="em" sx={{ color: TERRA }}>
                  Maghreb
                </Box>
              </Typography>
              <Typography sx={{ color: `${NIGHT}99`, lineHeight: 1.9, mb: 4 }}>
                Toàn bộ nguyên liệu được tuyển chọn trực tiếp từ các souk Marrakech, Fez và rừng
                argan Essaouira — bạn có thể mua mang về sau mỗi nghi lễ.
              </Typography>

              <Stack divider={<Box sx={{ height: '1px', bgcolor: `${NIGHT}15` }} />}>
                {SPA16_APOTHECARY.map((p) => (
                  <Stack
                    key={p.name}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ py: 2 }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: `${SAFFRON}22`,
                        color: TERRA,
                      }}
                    >
                      <Iconify icon="solar:bottle-bold-duotone" width={20} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ sm: 'baseline' }}
                        spacing={1}
                      >
                        <Typography
                          sx={{ fontFamily: 'serif', fontSize: 18, color: NIGHT, fontWeight: 500 }}
                        >
                          {p.name}
                        </Typography>
                        <Typography
                          sx={{ color: SAFFRON, fontSize: 11, letterSpacing: 2, fontWeight: 700 }}
                        >
                          · {p.origin.toUpperCase()}
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: `${NIGHT}88`, fontSize: 13 }}>{p.use}</Typography>
                    </Box>
                    <Typography
                      sx={{ color: TERRA, fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}
                    >
                      {p.price}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
