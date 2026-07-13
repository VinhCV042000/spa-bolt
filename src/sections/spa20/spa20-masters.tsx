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
  SPA20_MASTERS,
} from 'src/sections/spa20/spa20-data';

export function Spa20Masters() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#FFF',
      }}
    >
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
            ĐỘI NGŨ · TEAM
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
            Chuyên gia
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
              hàng đầu
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA20_MASTERS.map((master, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={master.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  '&:hover .master-img': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 20px 50px ${ROSE_GOLD}30`,
                  },
                }}
              >
                <Box
                  className="master-img"
                  sx={{
                    width: { xs: 140, md: 160 },
                    height: { xs: 140, md: 160 },
                    borderRadius: '50%',
                    overflow: 'hidden',
                    mx: 'auto',
                    mb: 2.5,
                    border: `3px solid ${index % 2 === 0 ? ROSE_GOLD : GOLD}`,
                    boxShadow: `0 8px 30px ${DEEP_PLUM}15`,
                    transition: 'all 0.4s ease',
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
                    color: DEEP_PLUM,
                    fontSize: 18,
                    fontWeight: 500,
                    fontFamily: '"Playfair Display", serif',
                    mb: 0.5,
                  }}
                >
                  {master.name}
                </Typography>

                <Typography
                  sx={{
                    color: ROSE_GOLD,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    mb: 1,
                  }}
                >
                  {master.role}
                </Typography>

                <Box
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.5,
                    background: CHAMPAGNE,
                    borderRadius: 5,
                    mb: 1.5,
                  }}
                >
                  <Typography sx={{ color: DEEP_PLUM, fontSize: 12 }}>
                    {master.experience}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: '#8A7A8A',
                    fontSize: 13,
                  }}
                >
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
