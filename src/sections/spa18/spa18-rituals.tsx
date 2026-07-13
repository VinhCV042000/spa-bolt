import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, LOTUS, CORAL, JUNGLE, BAMBOO, SPA18_RITUALS } from 'src/sections/spa18/spa18-data';

export function Spa18Rituals() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${JUNGLE} 0%, #0D2818 100%)`,
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
            NGHI LỄ · RITUAL
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
            Balinese
            <Box component="span" sx={{ color: BAMBOO }}>
              {' '}
              healing
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA18_RITUALS.map((ritual, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={ritual.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 3.5,
                  background: 'rgba(0,0,0,0.25)',
                  border: `1px solid ${BAMBOO}25`,
                  borderLeft: `3px solid ${index % 3 === 0 ? LOTUS : index % 3 === 1 ? BAMBOO : CORAL}`,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    background: 'rgba(0,0,0,0.4)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Ritual code */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${LOTUS}40`,
                    color: LOTUS,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {ritual.code}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      color: 'rgba(253,246,227,0.35)',
                      fontSize: 11,
                      letterSpacing: 2,
                      fontStyle: 'italic',
                    }}
                  >
                    {ritual.balinese}
                  </Typography>
                  <Typography
                    sx={{
                      color: SAND,
                      fontSize: 20,
                      fontWeight: 500,
                      fontFamily: '"Playfair Display", serif',
                      mt: 0.5,
                    }}
                  >
                    {ritual.name}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Typography sx={{ color: BAMBOO, fontSize: 13 }}>{ritual.duration}</Typography>
                  <Typography sx={{ color: 'rgba(253,246,227,0.35)' }}>·</Typography>
                  <Typography sx={{ color: LOTUS, fontSize: 13, fontWeight: 600 }}>
                    {ritual.price}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: 'rgba(253,246,227,0.65)',
                    fontSize: 13,
                    lineHeight: 1.7,
                    flexGrow: 1,
                  }}
                >
                  {ritual.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
