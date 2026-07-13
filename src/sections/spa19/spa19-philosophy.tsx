import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { INK, TEA, RICE, JADE, SPA19_PILLARS } from 'src/sections/spa19/spa19-data';

export function Spa19Philosophy() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: RICE,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ink brush background */}
      <Box
        sx={{
          position: 'absolute',
          left: -100,
          top: '20%',
          width: 300,
          height: 600,
          background: `linear-gradient(180deg, ${INK}06 0%, transparent 100%)`,
          transform: 'rotate(12deg)',
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: TEA,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            TỨ ĐẠI · 四大
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: INK,
              lineHeight: 1.2,
            }}
          >
            Bốn trụ cột
            <Box component="span" sx={{ color: JADE }}>
              {' '}
              dưỡng sinh
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA19_PILLARS.map((item, index) => (
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
                  borderBottom: `3px solid ${index % 2 === 0 ? JADE : TEA}`,
                  background: '#FFF',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 20px ${INK}08`,
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 12px 40px ${INK}12`,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: index % 2 === 0 ? JADE : TEA,
                    fontSize: 40,
                    fontWeight: 200,
                    mb: 1.5,
                    fontFamily: '"Noto Serif SC", serif',
                  }}
                >
                  {item.numeral}
                </Typography>
                <Typography
                  sx={{
                    color: INK,
                    fontSize: 18,
                    fontWeight: 500,
                    mb: 1.5,
                    fontFamily: '"Noto Serif SC", serif',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#6A6A6A',
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
