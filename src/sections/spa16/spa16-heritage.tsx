import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, NIGHT, TERRA, SAFFRON, SPA16_HERITAGE } from 'src/sections/spa16/spa16-data';

export function Spa16Heritage() {
  const { t } = useTranslate('spa16');
  return (
    <Box
      component="section"
      sx={{ py: { xs: 10, md: 16 }, bgcolor: SAND, position: 'relative', overflow: 'hidden' }}
    >
      {/* Moorish arch background motif */}
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          left: -80,
          width: 320,
          height: 320,
          border: `1px solid ${TERRA}22`,
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 360,
          height: 360,
          border: `1px dashed ${SAFFRON}44`,
          borderRadius: '50%',
        }}
      />
      <Container component={MotionViewport} maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack spacing={3} alignItems="center" sx={{ mb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: TERRA, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              {t('heritage.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 56 },
                fontWeight: 300,
                color: NIGHT,
                lineHeight: 1.15,
                maxWidth: 760,
              }}
            >
              {t('heritage.title')}{' '}
              <Box component="em" sx={{ color: TERRA }}>
                {t('heritage.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: `${NIGHT}99`, maxWidth: 600, lineHeight: 1.9 }}>
              {t('heritage.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={0} sx={{ borderTop: `1px solid ${NIGHT}15` }}>
          {SPA16_HERITAGE.map((p, i) => (
            <Grid
              key={p.numeral}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                borderRight: { md: i < 3 ? `1px solid ${NIGHT}15` : 'none' },
                borderBottom: { xs: i < 3 ? `1px solid ${NIGHT}15` : 'none', md: 'none' },
              }}
            >
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: { xs: 4, md: 5 },
                  height: '100%',
                  transition: 'background .4s',
                  '&:hover': { bgcolor: `${TERRA}10` },
                }}
              >
                <Stack spacing={3}>
                  <Typography
                    sx={{
                      fontSize: 84,
                      fontWeight: 200,
                      color: TERRA,
                      lineHeight: 1,
                      fontFamily: '"Cormorant Garamond",serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {p.numeral}
                  </Typography>
                  <Box>
                    <Typography
                      sx={{
                        color: SAFFRON,
                        letterSpacing: 3,
                        fontSize: 11,
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      CHƯƠNG {p.numeral}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Cormorant Garamond",serif',
                        fontSize: 24,
                        color: NIGHT,
                        fontWeight: 500,
                        mb: 1.5,
                      }}
                    >
                      {p.title}
                    </Typography>
                    <Typography sx={{ color: `${NIGHT}99`, fontSize: 14, lineHeight: 1.8 }}>
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
