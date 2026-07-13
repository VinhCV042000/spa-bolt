import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  NORDIC_GRAY,
  NORDIC_SAGE,
  NORDIC_WHITE,
  NORDIC_CREAM,
  NORDIC_STONE,
  NORDIC_BLACK,
  SPA26_TREATMENTS,
} from 'src/sections/spa26/spa26-data';

export function Spa26Treatments() {
  const { t } = useTranslate('spa26');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_WHITE,
      }}
    >
      <Container component={MotionViewport} maxWidth="xl">
        {/* Editorial Header */}
        <m.div variants={varFade({ distance: 40 }).inUp}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: { xs: 6, md: 10 },
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: NORDIC_GRAY,
                  letterSpacing: 4,
                  fontSize: 10,
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                {t('treatments.eyebrow')}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 36, md: 56 },
                  fontWeight: 300,
                  color: NORDIC_BLACK,
                  letterSpacing: -2,
                }}
              >
                {t('treatments.title')}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: NORDIC_STONE,
                fontSize: 64,
                fontWeight: 200,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              04
            </Typography>
          </Box>
        </m.div>

        {/* Treatments - Editorial Grid */}
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 1 }}
        >
          {SPA26_TREATMENTS.map((treatment, index) => (
            <m.div key={treatment.numeral} variants={varFade({ distance: 40 }).inUp}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 4, md: 6 },
                  background: index % 3 === 0 ? NORDIC_CREAM : 'transparent',
                  border: `1px solid ${NORDIC_STONE}15`,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    background: NORDIC_CREAM,
                  },
                }}
              >
                {/* Left: Number & Category */}
                <Stack
                  direction="row"
                  spacing={4}
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      sx={{
                        color: NORDIC_STONE,
                        fontSize: 48,
                        fontWeight: 200,
                        fontFamily: '"Inter", sans-serif',
                        letterSpacing: -2,
                        mb: 2,
                      }}
                    >
                      {treatment.numeral}
                    </Typography>
                    <Typography
                      sx={{
                        color: NORDIC_BLACK,
                        fontSize: 22,
                        fontWeight: 400,
                        mb: 0.5,
                      }}
                    >
                      {treatment.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: NORDIC_SAGE,
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                      }}
                    >
                      {treatment.category}
                    </Typography>
                  </Box>

                  {/* Right: Price */}
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      sx={{
                        color: NORDIC_BLACK,
                        fontSize: 18,
                        fontWeight: 400,
                      }}
                    >
                      {treatment.price}
                    </Typography>
                    <Typography sx={{ color: NORDIC_GRAY, fontSize: 11, mt: 0.5 }}>
                      {treatment.duration}
                    </Typography>
                  </Box>
                </Stack>

                {/* Description */}
                <Typography
                  sx={{
                    color: NORDIC_GRAY,
                    fontSize: 13,
                    lineHeight: 1.7,
                    mt: 4,
                    maxWidth: 400,
                  }}
                >
                  {treatment.desc}
                </Typography>

                {/* Bottom Accent */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: { xs: 40, md: 60 },
                    height: 2,
                    background: NORDIC_STONE,
                  }}
                />
              </Box>
            </m.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
