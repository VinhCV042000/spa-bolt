import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { CRYSTAL, AMETHYST, ROSE_QUARTZ, SPA17_CRYSTALS } from 'src/sections/spa17/spa17-data';

export function Spa17Crystals() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${CRYSTAL} 0%, #EDE7F6 100%)`,
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
            CRYSTAL ENERGY · 수정 에너지
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
            Năng lượng đá quý
            <Box component="span" sx={{ color: ROSE_QUARTZ }}>
              {' '}
              chữa lành
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA17_CRYSTALS.map((crystal, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={crystal.name}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 5,
                  overflow: 'hidden',
                  background: '#FFF',
                  boxShadow: `0 8px 32px ${crystal.color}20`,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: `0 20px 48px ${crystal.color}30`,
                  },
                }}
              >
                <Box sx={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={crystal.img}
                    alt={crystal.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(180deg, transparent 40%, ${crystal.color}ee 100%)`,
                    }}
                  />
                  <Typography
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: 20,
                      color: CRYSTAL,
                      fontSize: 11,
                      letterSpacing: 2,
                      fontFamily: '"Noto Serif KR", serif',
                    }}
                  >
                    {crystal.kor}
                  </Typography>
                </Box>

                <Stack spacing={1.5} sx={{ p: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      sx={{
                        color: '#2D2A4A',
                        fontSize: 20,
                        fontWeight: 500,
                        fontFamily: '"Noto Serif KR", serif',
                      }}
                    >
                      {crystal.name}
                    </Typography>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${crystal.color}50 0%, ${crystal.color}25 100%)`,
                        animation: index === 0 ? 'pulse 3s ease-in-out infinite' : 'none',
                        '@keyframes pulse': {
                          '0%, 100%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.1)' },
                        },
                      }}
                    />
                  </Stack>
                  <Typography sx={{ color: crystal.color, fontSize: 13, fontWeight: 600 }}>
                    {crystal.benefit}
                  </Typography>
                  <Typography sx={{ color: '#8A88A8', fontSize: 13, lineHeight: 1.6 }}>
                    {crystal.treatment}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Crystal benefits summary */}
        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            mt: 8,
            p: { xs: 3, md: 5 },
            background: 'linear-gradient(135deg, #FFF 0%, rgba(248,246,255,0.8) 100%)',
            borderRadius: 4,
            border: `1px solid ${AMETHYST}15`,
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="space-around"
            alignItems="center"
          >
            {[
              { icon: 'solar:atom-bold-duotone', label: 'Cân bằng chakra' },
              { icon: 'solar:meditation-round-bold-duotone', label: 'Giảm stress sâu' },
              { icon: 'solar:sleeping-circle-bold-duotone', label: 'Ngủ ngon hơn' },
              { icon: 'solar:heart-pulse-bold-duotone', label: 'Cải thiện tuần hoàn' },
            ].map((item) => (
              <Stack key={item.label} direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${AMETHYST}20 0%, ${ROSE_QUARTZ}15 100%)`,
                  }}
                >
                  <Box
                    component="img"
                    src={`https://api.iconify.design/${item.icon}.svg?color=${AMETHYST}`}
                    alt={item.label}
                    sx={{ width: 22, height: 22 }}
                  />
                </Box>
                <Typography sx={{ color: '#2D2A4A', fontSize: 14, fontWeight: 500 }}>
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
