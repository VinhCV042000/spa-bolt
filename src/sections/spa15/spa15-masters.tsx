import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, SAKURA, KINPAKU, SPA15_MASTERS } from 'src/sections/spa15/spa15-data';

export function Spa15Masters() {
  const { t } = useTranslate('spa15');
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SUMI, color: WASHI }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }} alignItems="center">
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: KINPAKU, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              {t('masters.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 54 },
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              {t('masters.title')}{' '}
              <Box component="em" sx={{ color: SAKURA }}>
                {t('masters.titleAccent')}
              </Box>{' '}
              {t('masters.titleSuffix')}
            </Typography>
          </Box>
        </Stack>
        <Grid container spacing={3}>
          {SPA15_MASTERS.map((m_, i) => (
            <Grid key={m_.name} item xs={6} md={3}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover .m-img': { transform: 'scale(1.08)', filter: 'grayscale(0)' },
                }}
              >
                <Box sx={{ aspectRatio: '3/4', overflow: 'hidden', mb: 2 }}>
                  <Box
                    className="m-img"
                    component="img"
                    src={m_.img}
                    alt={m_.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(0.6)',
                      transition: 'all .8s',
                    }}
                  />
                </Box>
                <Typography sx={{ color: KINPAKU, fontSize: 10, letterSpacing: 3 }}>
                  0{i + 1} · {m_.from.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond",serif',
                    fontSize: 22,
                    fontWeight: 500,
                    mt: 0.5,
                  }}
                >
                  {m_.name}
                </Typography>
                <Typography sx={{ fontSize: 12, color: `${WASHI}99` }}>{m_.role}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
