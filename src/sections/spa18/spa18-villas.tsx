import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, LOTUS, JUNGLE, BAMBOO, SPA18_VILLAS } from 'src/sections/spa18/spa18-data';

export function Spa18Villas() {
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
            VILLA TROPICAL · วิลล่า
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
            Khu nghỉ dưỡng
            <Box component="span" sx={{ color: BAMBOO }}>
              {' '}
              giữa rừng
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA18_VILLAS.map((villa) => (
            <Grid
              item
              xs={12}
              md={4}
              key={villa.name}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  background: '#000',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .villa-img': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={villa.img}
                  alt={villa.name}
                  className="villa-img"
                  sx={{
                    width: '100%',
                    height: 280,
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 40%, ${JUNGLE}ee 100%)`,
                  }}
                />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3 }}>
                  <Typography
                    sx={{
                      color: SAND,
                      fontSize: 20,
                      fontWeight: 500,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {villa.name}
                  </Typography>
                  <Typography sx={{ color: 'rgba(253,246,227,0.65)', fontSize: 13, mt: 0.5 }}>
                    {villa.size}
                  </Typography>
                  <Typography sx={{ color: LOTUS, fontSize: 14, fontWeight: 600, mt: 1 }}>
                    {villa.price}
                  </Typography>
                  <Stack spacing={0.5} sx={{ mt: 2 }}>
                    {villa.feats.map((feat) => (
                      <Stack key={feat} direction="row" spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            bgcolor: BAMBOO,
                          }}
                        />
                        <Typography sx={{ color: 'rgba(253,246,227,0.75)', fontSize: 12 }}>
                          {feat}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
