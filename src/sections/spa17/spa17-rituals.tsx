import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { GOLD, CRYSTAL, AMETHYST, ROSE_QUARTZ, SPA17_RITUALS } from 'src/sections/spa17/spa17-data';

export function Spa17Rituals() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#EDE7F6',
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: AMETHYST,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            NĂNG LƯỢNG · 에너지 원데이터
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: '#2D2A4A',
              lineHeight: 1.2,
            }}
          >
            Nghi lễ
            <Box component="span" sx={{ color: GOLD }}>
              {' '}
              K-Beauty
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA17_RITUALS.map((ritual, index) => (
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
                  borderRadius: 4,
                  background: '#FFF',
                  border: `1px solid ${AMETHYST}10`,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 16px 40px ${AMETHYST}15`,
                    borderColor: `${AMETHYST}25`,
                  },
                }}
              >
                {/* Ritual code badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                    color: CRYSTAL,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {ritual.code}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      color: '#EAE0F0',
                      fontSize: 11,
                      letterSpacing: 1.5,
                      fontFamily: '"Noto Serif KR", serif',
                    }}
                  >
                    {ritual.korean}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#2D2A4A',
                      fontSize: 20,
                      fontWeight: 500,
                      fontFamily: '"Noto Serif KR", serif',
                      mt: 0.5,
                    }}
                  >
                    {ritual.name}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Typography sx={{ color: AMETHYST, fontSize: 13, fontWeight: 600 }}>
                    {ritual.duration}
                  </Typography>
                  <Typography sx={{ color: '#B0AEBE', fontSize: 13 }}>·</Typography>
                  <Typography
                    sx={{
                      background: `linear-gradient(90deg, ${GOLD} 0%, ${AMETHYST} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {ritual.price}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: '#7A7898',
                    fontSize: 13,
                    lineHeight: 1.7,
                    flexGrow: 1,
                  }}
                >
                  {ritual.desc}
                </Typography>

                {/* Gradient line accent */}
                <Box
                  sx={{
                    mt: 3,
                    height: 3,
                    borderRadius: 2,
                    background: `linear-gradient(90deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} ${index % 2 === 0 ? '40%' : '60%'}, transparent 100%)`,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
