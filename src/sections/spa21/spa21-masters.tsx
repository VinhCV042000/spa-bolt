import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { PEARL, LAVENDER, CHARCOAL, SPA21_MASTERS } from 'src/sections/spa21/spa21-data';

export function Spa21Masters() {
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
              color: LAVENDER,
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
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: CHARCOAL,
              lineHeight: 1.2,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Bác sĩ
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              chuyên khoa
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA21_MASTERS.map((master, index) => (
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
                {/* Avatar */}
                <Box
                  sx={{
                    position: 'relative',
                    width: 140,
                    height: 140,
                    mx: 'auto',
                    mb: 2.5,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `2px solid ${index % 2 === 0 ? LAVENDER : CHARCOAL}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 12px 40px ${CHARCOAL}15`,
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
                    color: CHARCOAL,
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {master.name}
                </Typography>

                <Typography
                  sx={{
                    color: LAVENDER,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    mt: 0.5,
                  }}
                >
                  {master.role}
                </Typography>

                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    mt: 1,
                    bgcolor: PEARL,
                    borderRadius: 0.5,
                  }}
                >
                  <Typography sx={{ color: CHARCOAL, fontSize: 10, fontWeight: 500 }}>
                    {master.credential}
                  </Typography>
                </Box>

                <Typography sx={{ color: '#8A8A9A', fontSize: 12, mt: 1.5 }}>
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
