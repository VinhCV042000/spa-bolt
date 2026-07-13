import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, SAKURA, KINPAKU, SPA15_ONSEN } from 'src/sections/spa15/spa15-data';

export function Spa15Onsen() {
  const { t } = useTranslate('spa15');
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SUMI, color: WASHI }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-end" sx={{ mb: { xs: 6, md: 10 } }}>
          <Grid item xs={12} md={7}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                sx={{ color: KINPAKU, letterSpacing: 6, fontSize: 11, fontWeight: 600, mb: 2 }}
              >
                {t('onsen.eyebrow')}
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
                {t('onsen.title')}{' '}
                <Box component="em" sx={{ color: SAKURA }}>
                  {t('onsen.titleAccent')}
                </Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography sx={{ color: `${WASHI}99`, lineHeight: 1.9 }}>
                {t('onsen.description')}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {SPA15_ONSEN.map((o, i) => (
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
                    background: `linear-gradient(180deg, transparent 20%, ${SUMI}f5 100%)`,
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
                    background: `linear-gradient(180deg, transparent 30%, ${SUMI}ee 100%)`,
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
                    bgcolor: `${WASHI}1a`,
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${KINPAKU}55`,
                  }}
                >
                  <Typography
                    sx={{ color: KINPAKU, fontSize: 11, fontWeight: 700, letterSpacing: 2 }}
                  >
                    0{i + 1} · {o.temp}
                  </Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3 }}>
                  <Typography sx={{ color: SAKURA, fontSize: 11, letterSpacing: 3, mb: 1 }}>
                    {o.sub.toUpperCase()}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Cormorant Garamond",serif',
                      fontSize: 28,
                      fontWeight: 400,
                      mb: 1.5,
                      color: WASHI,
                    }}
                  >
                    {o.name}
                  </Typography>
                  <Typography sx={{ color: `${WASHI}aa`, fontSize: 13, lineHeight: 1.7, mb: 2 }}>
                    {o.desc}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      icon={<Iconify icon="solar:droplet-bold" width={12} />}
                      label={o.mineral}
                      sx={{
                        bgcolor: `${KINPAKU}1a`,
                        color: KINPAKU,
                        border: `1px solid ${KINPAKU}44`,
                        fontSize: 10,
                        fontWeight: 600,
                        height: 22,
                        '& .MuiChip-icon': { color: KINPAKU },
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
