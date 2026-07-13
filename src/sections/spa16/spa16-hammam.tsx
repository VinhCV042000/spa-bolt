import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, NIGHT, TERRA, SAFFRON, SPA16_HAMMAMS } from 'src/sections/spa16/spa16-data';

export function Spa16Hammam() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: NIGHT, color: SAND }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-end" sx={{ mb: { xs: 6, md: 10 } }}>
          <Grid item xs={12} md={7}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                sx={{ color: SAFFRON, letterSpacing: 6, fontSize: 11, fontWeight: 600, mb: 2 }}
              >
                حمام · BỐN PHÒNG HAMMAM
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond",serif',
                  fontSize: { xs: 36, md: 56 },
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: -1,
                }}
              >
                Hơi nóng{' '}
                <Box component="em" sx={{ color: TERRA }}>
                  vọng từ Marrakech
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography sx={{ color: `${SAND}aa`, lineHeight: 1.9 }}>
                Hệ thống bốn phòng theo nhiệt độ tăng dần — hành trình thanh tẩy 800 năm tuổi của
                Marrakech, từ phòng ấm zellige đến mái sân ngắm sao Sahara.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {SPA16_HAMMAMS.map((o, i) => (
            <Grid key={o.name} item xs={12} sm={6} lg={3}>
              <Box
                component={m.div}
                variants={varFade({ distance: 40 }).inUp}
                sx={{
                  position: 'relative',
                  height: 480,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.08)' },
                  '&:hover .overlay': {
                    background: `linear-gradient(180deg, transparent 20%, ${NIGHT}f5 100%)`,
                  },
                }}
              >
                <Box
                  component="img"
                  src={o.img}
                  alt={o.name}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform .8s ease',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 30%, ${NIGHT}ee 100%)`,
                    transition: 'background .5s',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    px: 1.5,
                    py: 0.5,
                    bgcolor: `${SAND}1a`,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${SAFFRON}55`,
                  }}
                >
                  <Typography
                    sx={{ color: SAFFRON, fontSize: 11, fontWeight: 700, letterSpacing: 2 }}
                  >
                    0{i + 1} · {o.temp}
                  </Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3 }}>
                  <Typography sx={{ color: TERRA, fontSize: 11, letterSpacing: 3, mb: 1 }}>
                    {o.sub.toUpperCase()}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Cormorant Garamond",serif',
                      fontSize: 28,
                      fontWeight: 400,
                      mb: 1.5,
                      color: SAND,
                    }}
                  >
                    {o.name}
                  </Typography>
                  <Typography sx={{ color: `${SAND}aa`, fontSize: 13, lineHeight: 1.7, mb: 2 }}>
                    {o.desc}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      icon={<Iconify icon="solar:leaf-bold" width={12} />}
                      label={o.mineral}
                      sx={{
                        bgcolor: `${SAFFRON}1a`,
                        color: SAFFRON,
                        border: `1px solid ${SAFFRON}44`,
                        fontSize: 10,
                        fontWeight: 600,
                        height: 22,
                        '& .MuiChip-icon': { color: SAFFRON },
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
