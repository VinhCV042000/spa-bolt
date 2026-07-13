import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { INK, TEA, RICE, JADE, SPA19_MASTERS } from 'src/sections/spa19/spa19-data';

export function Spa19Masters() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: RICE,
      }}
    >
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
            ĐÔNG Y SƯ · 医师
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
            Bậc thầy
            <Box component="span" sx={{ color: JADE }}>
              {' '}
              đông y
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA19_MASTERS.map((master) => (
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
                    width: 140,
                    height: 140,
                    mx: 'auto',
                    mb: 2.5,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: `1px solid ${JADE}30`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: TEA,
                      transform: 'scale(1.03)',
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
                    color: INK,
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: '"Noto Serif SC", serif',
                  }}
                >
                  {master.name}
                </Typography>
                <Typography sx={{ color: JADE, fontSize: 11, mt: 0.5, letterSpacing: 1 }}>
                  {master.role}
                </Typography>
                <Typography sx={{ color: '#8A8A8A', fontSize: 12, mt: 0.5 }}>
                  {master.specialty}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
