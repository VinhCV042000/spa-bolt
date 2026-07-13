import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, NIGHT, TERRA, COPPER, SAFFRON, SPA16_RIADS } from 'src/sections/spa16/spa16-data';

export function Spa16Riads() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: COPPER, color: SAND }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center', alignItems: 'center' }}
        >
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: SAFFRON, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              إقامة · LƯU TRÚ
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 54 },
                fontWeight: 300,
                lineHeight: 1.15,
                maxWidth: 720,
              }}
            >
              Ba riad{' '}
              <Box component="em" sx={{ color: SAFFRON }}>
                mái vòm zellige
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={4}>
          {SPA16_RIADS.map((r, i) => (
            <Box key={r.name} component={m.div} variants={varFade({ distance: 40 }).inUp}>
              <Grid
                container
                spacing={0}
                sx={{
                  bgcolor: NIGHT,
                  overflow: 'hidden',
                  alignItems: 'stretch',
                  flexDirection: { xs: 'column', md: i % 2 ? 'row-reverse' : 'row' },
                }}
              >
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={r.img}
                    alt={r.name}
                    sx={{
                      width: '100%',
                      height: { xs: 260, md: 380 },
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: { xs: 4, md: 6 },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        color: SAFFRON,
                        letterSpacing: 4,
                        fontSize: 11,
                        fontWeight: 700,
                        mb: 2,
                      }}
                    >
                      0{i + 1} · {r.size.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Cormorant Garamond",serif',
                        fontSize: { xs: 30, md: 40 },
                        fontWeight: 400,
                        color: SAND,
                        mb: 2,
                        lineHeight: 1.1,
                      }}
                    >
                      {r.name}
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      {r.feats.map((f) => (
                        <Stack key={f} direction="row" spacing={1.5} alignItems="center">
                          <Iconify icon="solar:diamond-bold" width={12} sx={{ color: TERRA }} />
                          <Typography sx={{ color: `${SAND}cc`, fontSize: 14 }}>{f}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mb: 3 }}>
                      <Typography
                        sx={{ color: TERRA, fontSize: 28, fontWeight: 700, fontFamily: 'serif' }}
                      >
                        {r.price}
                      </Typography>
                    </Stack>
                    <Button
                      variant="outlined"
                      sx={{
                        alignSelf: 'flex-start',
                        borderColor: SAFFRON,
                        color: SAFFRON,
                        borderRadius: 0,
                        px: 3,
                        py: 1.25,
                        letterSpacing: 2,
                        fontSize: 12,
                        fontWeight: 700,
                        '&:hover': { bgcolor: SAFFRON, color: NIGHT, borderColor: SAFFRON },
                      }}
                    >
                      ĐẶT RIAD
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
