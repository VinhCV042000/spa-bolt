import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  NORDIC_GRAY,
  NORDIC_CREAM,
  NORDIC_STONE,
  NORDIC_BLACK,
  SPA26_PHILOSOPHY,
} from 'src/sections/spa26/spa26-data';

export function Spa26Philosophy() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_CREAM,
        position: 'relative',
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 8 }}>
          {/* Left: Large Quote */}
          <m.div variants={varFade({ distance: 60 }).inUp}>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 32, md: 56 },
                  fontWeight: 300,
                  color: NORDIC_BLACK,
                  lineHeight: 1.15,
                  letterSpacing: -1.5,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {SPA26_PHILOSOPHY.quote.split(' ').slice(0, 4).join(' ')}
                <Box component="span" sx={{ color: NORDIC_STONE }}>
                  {' '}
                  {SPA26_PHILOSOPHY.quote.split(' ').slice(4).join(' ')}
                </Box>
              </Typography>

              {/* Decorative line */}
              <Box sx={{ mt: 6, width: 80, height: 2, background: NORDIC_STONE }} />
            </Box>
          </m.div>

          {/* Right: Principles */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {SPA26_PHILOSOPHY.principles.map((principle, index) => (
              <m.div key={principle.title} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    py: 4,
                    borderBottom:
                      index === SPA26_PHILOSOPHY.principles.length - 1
                        ? 'none'
                        : `1px solid ${NORDIC_STONE}30`,
                  }}
                >
                  {/* Number */}
                  <Typography
                    sx={{
                      color: NORDIC_STONE,
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: 1,
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      mr: 3,
                      mt: 1,
                    }}
                  >
                    0{index + 1}
                  </Typography>

                  <Box>
                    <Typography
                      sx={{
                        color: NORDIC_BLACK,
                        fontSize: 24,
                        fontWeight: 400,
                        mb: 1,
                        fontFamily: '"Inter", sans-serif',
                        fontStyle: 'italic',
                      }}
                    >
                      {principle.title}
                    </Typography>
                    <Typography sx={{ color: NORDIC_GRAY, fontSize: 13, lineHeight: 1.7 }}>
                      {principle.desc}
                    </Typography>
                  </Box>
                </Box>
              </m.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
