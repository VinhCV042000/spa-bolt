import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, LOTUS, JUNGLE, BAMBOO, SPA18_PHILOSOPHY } from 'src/sections/spa18/spa18-data';

export function Spa18Philosophy() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: JUNGLE,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative bamboo pattern */}
      <Box
        sx={{
          position: 'absolute',
          left: -100,
          top: 0,
          bottom: 0,
          width: 200,
          background: `linear-gradient(90deg, ${JUNGLE} 0%, transparent 100%)`,
          opacity: 0.5,
        }}
      />

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
            TRIẾT LÝ · FILOSOFI
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
            Bốn trụ cột
            <Box component="span" sx={{ color: BAMBOO }}>
              {' '}
              Bali
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA18_PHILOSOPHY.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item.title}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 3.5,
                  borderLeft: `3px solid ${index % 2 === 0 ? LOTUS : BAMBOO}`,
                  background: 'rgba(0,0,0,0.2)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(0,0,0,0.35)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: index % 2 === 0 ? LOTUS : BAMBOO,
                    fontSize: 36,
                    fontWeight: 200,
                    mb: 1.5,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {item.numeral}
                </Typography>
                <Typography
                  sx={{
                    color: SAND,
                    fontSize: 18,
                    fontWeight: 500,
                    mb: 1.5,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(253,246,227,0.65)',
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
