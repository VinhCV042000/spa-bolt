import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, LOTUS, JUNGLE, BAMBOO, SPA18_MASTERS } from 'src/sections/spa18/spa18-data';

export function Spa18Masters() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, #0D2818 0%, ${JUNGLE} 100%)`,
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
            ĐIỀU HÀNH · PENGELOLA
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
            Bậc thầy
            <Box component="span" sx={{ color: BAMBOO }}>
              {' '}
              Bali
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA18_MASTERS.map((master) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={master.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: 160,
                    height: 160,
                    mx: 'auto',
                    mb: 2.5,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `2px solid ${BAMBOO}40`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: LOTUS,
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={master.img}
                    alt={master.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    color: SAND,
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {master.name}
                </Typography>
                <Typography sx={{ color: LOTUS, fontSize: 11, mt: 0.5, letterSpacing: 1 }}>
                  {master.role}
                </Typography>
                <Typography sx={{ color: 'rgba(253,246,227,0.55)', fontSize: 12, mt: 0.5 }}>
                  {master.from}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
