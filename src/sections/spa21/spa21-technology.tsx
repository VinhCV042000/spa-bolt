import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { LAVENDER, CHARCOAL, SPA21_TECHNOLOGY } from 'src/sections/spa21/spa21-data';

export function Spa21Technology() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: CHARCOAL,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: LAVENDER,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            CÔNG NGHỆ · TECHNOLOGY
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: '#FFF',
              lineHeight: 1.2,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Thiết bị
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              FDA approved
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA21_TECHNOLOGY.map((tech, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={tech.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.06)',
                    borderColor: `${LAVENDER}40`,
                  },
                }}
              >
                <Box
                  component="img"
                  src={tech.img}
                  alt={tech.name}
                  sx={{
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      color: '#FFF',
                      fontSize: 18,
                      fontWeight: 500,
                      mb: 0.5,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {tech.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: LAVENDER,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1,
                      mb: 1.5,
                    }}
                  >
                    {tech.type.toUpperCase()}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                    {tech.desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Certification badges */}
        <Stack direction="row" justifyContent="center" spacing={4} sx={{ mt: 8 }}>
          {['FDA Cleared', 'CE Certified', 'ISO 13485', 'TGA Listed'].map((badge) => (
            <Box
              key={badge}
              component={m.div}
              variants={varFade({ distance: 20 }).inUp}
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Typography sx={{ color: '#FFF', fontSize: 12, fontWeight: 500, letterSpacing: 0.5 }}>
                {badge}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
