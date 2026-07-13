import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { PEARL, SILVER, LAVENDER, CHARCOAL, SPA21_RESULTS } from 'src/sections/spa21/spa21-data';

export function Spa21Results() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: PEARL,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: LAVENDER,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            KẾT QUẢ · RESULTS
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: CHARCOAL,
              lineHeight: 1.2,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Hình ảnh
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              thực tế
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA21_RESULTS.map((result) => (
            <Grid
              item
              xs={12}
              md={4}
              key={result.title}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 1,
                  overflow: 'hidden',
                  background: '#FFF',
                  border: `1px solid ${SILVER}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 16px 50px ${CHARCOAL}10`,
                    borderColor: LAVENDER,
                  },
                }}
              >
                <Box
                  component="img"
                  src={result.img}
                  alt={result.title}
                  sx={{
                    width: '100%',
                    height: 280,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      color: CHARCOAL,
                      fontSize: 18,
                      fontWeight: 500,
                      mb: 1.5,
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {result.title}
                  </Typography>

                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: LAVENDER }} />
                      <Typography sx={{ color: '#6A6A7A', fontSize: 13 }}>
                        {result.treatment}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: CHARCOAL }} />
                      <Typography sx={{ color: '#8A8A9A', fontSize: 12 }}>
                        {result.client} · {result.duration}
                      </Typography>
                    </Stack>
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
