import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { PEARL, SILVER, LAVENDER, CHARCOAL, SPA21_SERVICES } from 'src/sections/spa21/spa21-data';

export function Spa21Services() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#FFF',
        position: 'relative',
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
            DỊCH VỤ · SERVICES
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
            Bốn lĩnh vực
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              chuyên sâu
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA21_SERVICES.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={service.title}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  height: '100%',
                  background: PEARL,
                  borderRadius: 1,
                  transition: 'all 0.3s ease',
                  border: `1px solid ${SILVER}30`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    background: '#FFF',
                    boxShadow: `0 16px 40px ${CHARCOAL}08`,
                    borderColor: LAVENDER,
                  },
                }}
              >
                {/* Top accent line */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 24,
                    right: 24,
                    height: 2,
                    background: index % 2 === 0 ? LAVENDER : CHARCOAL,
                  }}
                />

                <Typography
                  sx={{
                    color: SILVER,
                    fontSize: 32,
                    fontWeight: 200,
                    mb: 2,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {service.numeral}
                </Typography>

                <Typography
                  sx={{
                    color: CHARCOAL,
                    fontSize: 20,
                    fontWeight: 500,
                    mb: 2,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {service.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#6A6A7A',
                    fontSize: 14,
                    lineHeight: 1.75,
                  }}
                >
                  {service.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
