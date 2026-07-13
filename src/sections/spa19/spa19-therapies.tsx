import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { INK, TEA, JADE, CINNABAR, SPA19_THERAPIES } from 'src/sections/spa19/spa19-data';

export function Spa19Therapies() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#F8F5F0',
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: TEA,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            LIỆU PHÁP · 疗法
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: INK,
              lineHeight: 1.2,
            }}
          >
            Dưỡng sinh
            <Box component="span" sx={{ color: JADE }}>
              {' '}
              cổ truyền
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA19_THERAPIES.map((therapy, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={therapy.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 3.5,
                  background: '#FFF',
                  border: `1px solid ${JADE}15`,
                  borderBottom: `3px solid ${index % 3 === 0 ? JADE : index % 3 === 1 ? TEA : CINNABAR}`,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 40px ${INK}10`,
                  },
                }}
              >
                {/* Ink seal badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    borderRadius: '2px',
                    border: `1px solid ${INK}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      color: INK,
                      fontSize: 12,
                      fontFamily: '"Noto Serif SC", serif',
                    }}
                  >
                    {therapy.code}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      color: '#B5B5B5',
                      fontSize: 11,
                      letterSpacing: 1.5,
                      fontFamily: '"Noto Serif SC", serif',
                    }}
                  >
                    {therapy.chinese}
                  </Typography>
                  <Typography
                    sx={{
                      color: INK,
                      fontSize: 18,
                      fontWeight: 500,
                      fontFamily: '"Noto Serif SC", serif',
                      mt: 0.5,
                    }}
                  >
                    {therapy.name}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Typography sx={{ color: JADE, fontSize: 13 }}>{therapy.duration}</Typography>
                  <Typography sx={{ color: '#C5C5C5', fontSize: 13 }}>·</Typography>
                  <Typography sx={{ color: TEA, fontSize: 13, fontWeight: 600 }}>
                    {therapy.price}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: '#6A6A6A',
                    fontSize: 13,
                    lineHeight: 1.7,
                    flexGrow: 1,
                  }}
                >
                  {therapy.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
