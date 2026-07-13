import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, SAKURA, KINPAKU, SPA15_PHILOSOPHY } from 'src/sections/spa15/spa15-data';

export function Spa15Philosophy() {
  const { t } = useTranslate('spa15');
  return (
    <Box
      component="section"
      sx={{ py: { xs: 10, md: 16 }, bgcolor: WASHI, position: 'relative', overflow: 'hidden' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 380,
          height: 380,
          borderRadius: '50%',
          bgcolor: SAKURA,
          opacity: 0.07,
        }}
      />
      <Container component={MotionViewport} maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: KINPAKU, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              {t('philosophy.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 54 },
                fontWeight: 300,
                color: SUMI,
                lineHeight: 1.15,
                maxWidth: 720,
              }}
            >
              {t('philosophy.title')}{' '}
              <Box component="em" sx={{ color: SAKURA }}>
                {t('philosophy.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: `${SUMI}99`, maxWidth: 580, lineHeight: 1.9 }}>
              {t('philosophy.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={0} sx={{ borderTop: `1px solid ${SUMI}15` }}>
          {SPA15_PHILOSOPHY.map((p, i) => (
            <Grid
              key={p.romaji}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                borderRight: { md: i < 3 ? `1px solid ${SUMI}15` : 'none' },
                borderBottom: { xs: i < 3 ? `1px solid ${SUMI}15` : 'none', md: 'none' },
              }}
            >
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: { xs: 4, md: 5 },
                  height: '100%',
                  transition: 'background .4s',
                  '&:hover': { bgcolor: `${SAKURA}10` },
                }}
              >
                <Stack spacing={3}>
                  <Typography
                    sx={{
                      fontSize: 84,
                      fontWeight: 200,
                      color: SAKURA,
                      lineHeight: 1,
                      fontFamily: 'serif',
                    }}
                  >
                    {p.kanji}
                  </Typography>
                  <Box>
                    <Typography
                      sx={{
                        color: KINPAKU,
                        letterSpacing: 3,
                        fontSize: 11,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {p.romaji.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Cormorant Garamond",serif',
                        fontSize: 24,
                        color: SUMI,
                        fontWeight: 500,
                        mb: 1.5,
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography sx={{ color: `${SUMI}99`, fontSize: 14, lineHeight: 1.8 }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
