import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  NORDIC_GRAY,
  NORDIC_SAGE,
  NORDIC_CREAM,
  NORDIC_STONE,
  NORDIC_BLACK,
  SPA26_TESTIMONIALS,
} from 'src/sections/spa26/spa26-data';

export function Spa26Testimonials() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_CREAM,
      }}
    >
      <Container component={MotionViewport} maxWidth="md">
        {/* Header */}
        <m.div variants={varFade({ distance: 40 }).inUp}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography
              sx={{
                color: NORDIC_GRAY,
                letterSpacing: 4,
                fontSize: 10,
                fontWeight: 500,
                mb: 2,
              }}
            >
              WORDS
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 36, md: 48 },
                fontWeight: 300,
                color: NORDIC_BLACK,
                letterSpacing: -1.5,
              }}
            >
              They said —
            </Typography>
          </Box>
        </m.div>

        {/* Testimonials */}
        <Stack spacing={6}>
          {SPA26_TESTIMONIALS.map((item, index) => (
            <m.div key={item.author} variants={varFade({ distance: 40 }).inUp}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 4,
                  py: 6,
                  borderBottom:
                    index < SPA26_TESTIMONIALS.length - 1 ? `1px solid ${NORDIC_STONE}30` : 'none',
                }}
              >
                {/* Quote Mark */}
                <Typography
                  sx={{
                    color: NORDIC_STONE,
                    fontSize: 72,
                    fontWeight: 300,
                    lineHeight: 0.5,
                    opacity: 0.3,
                  }}
                >
                  &ldquo;
                </Typography>

                {/* Quote */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      color: NORDIC_BLACK,
                      fontSize: { xs: 18, md: 22 },
                      fontWeight: 300,
                      lineHeight: 1.6,
                      mb: 3,
                      fontStyle: 'italic',
                    }}
                  >
                    {item.quote}
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: NORDIC_SAGE,
                      }}
                    />
                    <Box>
                      <Typography sx={{ color: NORDIC_BLACK, fontSize: 13, fontWeight: 500 }}>
                        {item.author}
                      </Typography>
                      <Typography sx={{ color: NORDIC_GRAY, fontSize: 11 }}>
                        {item.title}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </m.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
