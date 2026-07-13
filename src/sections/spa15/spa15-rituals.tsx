import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, AKANE, SAKURA, KINPAKU, SPA15_RITUALS } from 'src/sections/spa15/spa15-data';

export function Spa15Rituals() {
  const { t } = useTranslate('spa15');
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: WASHI }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }} alignItems="center">
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: AKANE, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              {t('rituals.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 56 },
                fontWeight: 300,
                color: SUMI,
                lineHeight: 1.1,
              }}
            >
              {t('rituals.title')}{' '}
              <Box component="em" sx={{ color: AKANE }}>
                {t('rituals.titleAccent')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={0} sx={{ border: `1px solid ${SUMI}15` }}>
          {SPA15_RITUALS.map((r, i) => (
            <Grid
              key={r.name}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                borderRight: {
                  sm: i % 2 === 0 ? `1px solid ${SUMI}15` : 'none',
                  md: (i + 1) % 3 !== 0 ? `1px solid ${SUMI}15` : 'none',
                },
                borderBottom:
                  i < SPA15_RITUALS.length - (i < 3 ? 0 : 0) ? `1px solid ${SUMI}15` : 'none',
              }}
            >
              <Box
                component={m.div}
                variants={varFade({ distance: 20 }).inUp}
                sx={{
                  p: { xs: 4, md: 5 },
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all .4s',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: SUMI,
                    color: WASHI,
                    '& .ritual-code': { color: SAKURA },
                    '& .ritual-price': { color: KINPAKU },
                  },
                }}
              >
                <Stack spacing={2.5} sx={{ height: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      className="ritual-code"
                      sx={{
                        fontSize: 56,
                        color: AKANE,
                        fontWeight: 200,
                        lineHeight: 1,
                        fontFamily: 'serif',
                        transition: 'color .4s',
                      }}
                    >
                      {r.code}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: KINPAKU, letterSpacing: 2 }}>
                      0{i + 1} / 06
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontFamily: '"Cormorant Garamond",serif',
                      fontSize: 26,
                      fontWeight: 500,
                    }}
                  >
                    {r.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, lineHeight: 1.8, opacity: 0.8, flex: 1 }}>
                    {r.desc}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    sx={{
                      pt: 2,
                      borderTop: '1px solid currentColor',
                      borderColor: 'inherit',
                      opacity: 0.85,
                    }}
                  >
                    <Stack spacing={0.25}>
                      <Typography sx={{ fontSize: 11, letterSpacing: 1, opacity: 0.6 }}>
                        <Iconify
                          icon="solar:clock-circle-bold"
                          width={11}
                          sx={{ mr: 0.5, verticalAlign: -1 }}
                        />
                        {r.duration}
                      </Typography>
                      <Typography
                        className="ritual-price"
                        sx={{ fontSize: 18, fontWeight: 600, color: AKANE, fontFamily: 'serif' }}
                      >
                        {r.price}
                      </Typography>
                    </Stack>
                    <Button
                      size="small"
                      endIcon={<Iconify icon="eva:arrow-forward-fill" />}
                      sx={{
                        color: 'inherit',
                        borderRadius: 0,
                        fontSize: 12,
                        letterSpacing: 1,
                      }}
                    >
                      {t('rituals.bookCta')}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
