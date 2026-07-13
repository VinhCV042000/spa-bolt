import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, SAKURA, KINPAKU, SPA15_IMAGES } from 'src/sections/spa15/spa15-data';

export function Spa15Tea() {
  const { t } = useTranslate('spa15');
  const courses = (t('tea.courses', { returnObjects: true }) as string[][]) || [];
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: WASHI }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
              <Box sx={{ position: 'relative', height: { xs: 320, md: 540 } }}>
                <Box
                  component="img"
                  src={SPA15_IMAGES.kaiseki}
                  alt="Kaiseki"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '78%',
                    height: '70%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  component="img"
                  src={SPA15_IMAGES.tea}
                  alt="Tea"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '55%',
                    height: '55%',
                    objectFit: 'cover',
                    border: `8px solid ${WASHI}`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 0,
                    color: `${SAKURA}88`,
                    writingMode: 'vertical-rl',
                    fontSize: 36,
                    fontWeight: 200,
                    letterSpacing: 8,
                    fontFamily: 'serif',
                  }}
                >
                  茶道
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
              <Typography
                sx={{ color: KINPAKU, letterSpacing: 6, fontSize: 11, fontWeight: 600, mb: 2 }}
              >
                {t('tea.eyebrow')}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond",serif',
                  fontSize: { xs: 36, md: 52 },
                  fontWeight: 300,
                  color: SUMI,
                  lineHeight: 1.1,
                  mb: 3,
                }}
              >
                {t('tea.title')}{' '}
                <Box component="em" sx={{ color: SAKURA }}>
                  {t('tea.titleAccent')}
                </Box>
              </Typography>
              <Typography sx={{ color: `${SUMI}aa`, lineHeight: 1.95, mb: 3 }}>
                {t('tea.description')}
              </Typography>
              <Stack spacing={2} sx={{ borderLeft: `2px solid ${KINPAKU}`, pl: 3 }}>
                {courses.map(([k, v]) => (
                  <Box key={k}>
                    <Typography
                      sx={{ fontSize: 13, color: SAKURA, letterSpacing: 2, fontWeight: 600 }}
                    >
                      {k.toUpperCase()}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: `${SUMI}99` }}>{v}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
