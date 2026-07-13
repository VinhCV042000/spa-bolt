import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  GOLD,
  ROSE_GOLD,
  CHAMPAGNE,
  DEEP_PLUM,
  SPA20_PHILOSOPHY,
} from 'src/sections/spa20/spa20-data';

export function Spa20Philosophy() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#FFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: `linear-gradient(180deg, ${CHAMPAGNE}30 0%, transparent 100%)`,
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            PHƯƠNG TRÂM · PHILOSOPHY
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 400,
              color: DEEP_PLUM,
              lineHeight: 1.2,
            }}
          >
            Bốn giá trị
            <Box
              component="span"
              sx={{
                background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              cốt lõi
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA20_PHILOSOPHY.map((item, index) => (
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
                  p: 4,
                  background: index % 2 === 0 ? CHAMPAGNE : '#FFF',
                  borderRadius: 3,
                  height: '100%',
                  transition: 'all 0.4s ease',
                  border: `1px solid ${ROSE_GOLD}15`,
                  boxShadow: `0 4px 20px ${DEEP_PLUM}06`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 16px 40px ${ROSE_GOLD}20`,
                    borderColor: `${ROSE_GOLD}40`,
                  },
                }}
              >
                <Typography
                  sx={{
                    background: `linear-gradient(135deg, ${ROSE_GOLD}, ${GOLD})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: 36,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {item.numeral}
                </Typography>
                <Typography
                  sx={{
                    color: DEEP_PLUM,
                    fontSize: 20,
                    fontWeight: 500,
                    mb: 0.5,
                    fontFamily: '"Playfair Display", Georgia, serif',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: ROSE_GOLD,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    mb: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.subtitle}
                </Typography>
                <Typography
                  sx={{
                    color: '#6A5A6A',
                    fontSize: 14,
                    lineHeight: 1.75,
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
