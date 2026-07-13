import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { LAVENDER, CHARCOAL, SPA21_FACILITIES } from 'src/sections/spa21/spa21-data';

export function Spa21Facilities() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: CHARCOAL,
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
            CƠ SỞ · FACILITIES
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
            Clinical
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              luxury
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA21_FACILITIES.map((facility) => (
            <Grid
              item
              xs={12}
              md={4}
              key={facility.title}
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
                    borderColor: `${LAVENDER}30`,
                  },
                }}
              >
                <Box
                  component="img"
                  src={facility.img}
                  alt={facility.title}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <Iconify
                      icon="solar:buildings-bold-duotone"
                      sx={{ color: LAVENDER, fontSize: 18 }}
                    />
                    <Typography
                      sx={{
                        color: '#FFF',
                        fontSize: 16,
                        fontWeight: 500,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {facility.title}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                    {facility.desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Features */}
        <Grid container spacing={3} sx={{ mt: 6 }}>
          {[
            { icon: 'solar:shield-check-bold-duotone', text: 'Sterilization Protocols' },
            { icon: 'solar:temperature-bold-duotone', text: 'Temperature Controlled' },
            { icon: 'solar:lightbulb-bolt-duotone', text: 'Medical-Grade Lighting' },
            { icon: 'solar:accessibility-bold-duotone', text: 'Private Recovery Areas' },
          ].map((feature) => (
            <Grid item xs={6} md={3} key={feature.text}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                  p: 2,
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 1,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <Iconify icon={feature.icon} sx={{ color: LAVENDER, fontSize: 20 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                  {feature.text}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
