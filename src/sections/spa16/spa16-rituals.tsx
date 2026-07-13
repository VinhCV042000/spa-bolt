import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, NIGHT, TERRA, SAFFRON, SPA16_RITUALS } from 'src/sections/spa16/spa16-data';

export function Spa16Rituals() {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SAND }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center', alignItems: 'center' }}
        >
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: TERRA, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              طقوس · NGHI LỄ
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 54 },
                fontWeight: 300,
                color: NIGHT,
                lineHeight: 1.15,
                maxWidth: 760,
              }}
            >
              Sáu nghi lễ{' '}
              <Box component="em" sx={{ color: TERRA }}>
                argan & rhassoul
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA16_RITUALS.map((r) => (
            <Grid key={r.name} item xs={12} md={6}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 4 },
                  bgcolor: '#fff',
                  border: `1px solid ${NIGHT}10`,
                  transition: 'all .4s',
                  '&:hover': {
                    borderColor: TERRA,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 50px -25px ${TERRA}55`,
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                      border: `1px solid ${SAFFRON}66`,
                      color: TERRA,
                      fontFamily: '"Cormorant Garamond",serif',
                      fontSize: 28,
                      fontStyle: 'italic',
                    }}
                  >
                    {r.code}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Cormorant Garamond",serif',
                          fontSize: 24,
                          fontWeight: 500,
                          color: NIGHT,
                        }}
                      >
                        {r.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: TERRA,
                          fontWeight: 700,
                          fontSize: 16,
                          ml: 2,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {r.price}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        color: SAFFRON,
                        letterSpacing: 2,
                        fontSize: 11,
                        fontWeight: 700,
                        mb: 1.5,
                      }}
                    >
                      {r.duration.toUpperCase()}
                    </Typography>
                    <Typography sx={{ color: `${NIGHT}99`, fontSize: 14, lineHeight: 1.8, mb: 2 }}>
                      {r.desc}
                    </Typography>
                    <Button
                      size="small"
                      endIcon={<Iconify icon="solar:arrow-right-linear" />}
                      sx={{
                        color: NIGHT,
                        p: 0,
                        fontWeight: 700,
                        letterSpacing: 2,
                        fontSize: 11,
                        '&:hover': { bgcolor: 'transparent', color: TERRA },
                      }}
                    >
                      ĐẶT NGHI LỄ
                    </Button>
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
