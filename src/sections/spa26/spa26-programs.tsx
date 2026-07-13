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
  NORDIC_STONE,
  NORDIC_BLACK,
  SPA26_PROGRAMS,
} from 'src/sections/spa26/spa26-data';

export function Spa26Programs() {
  const { t } = useTranslate('spa26');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_BLACK,
        color: NORDIC_WHITE,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <m.div variants={varFade({ distance: 40 }).inUp}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ mb: { xs: 6, md: 10 } }}
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
                {t('programs.eyebrow')}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 36, md: 48 },
                  fontWeight: 300,
                  color: NORDIC_WHITE,
                  letterSpacing: -1.5,
                }}
              >
                {t('programs.title')}
              </Typography>
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                border: `1px solid ${NORDIC_STONE}`,
                display: { xs: 'none', md: 'block' },
              }}
            >
              <Typography sx={{ color: NORDIC_STONE, fontSize: 10, letterSpacing: 1 }}>
                {t('programs.count', { count: SPA26_PROGRAMS.length })}
              </Typography>
            </Box>
          </Stack>
        </m.div>

        {/* Programs */}
        <Stack spacing={{ xs: 4, md: 1 }} direction={{ xs: 'column', md: 'row' }}>
          {SPA26_PROGRAMS.map((program, index) => (
            <m.div key={program.name} variants={varFade({ distance: 40 }).inUp} style={{ flex: 1 }}>
              <Box
                sx={{
                  height: '100%',
                  p: { xs: 4, md: 5 },
                  border: '1px solid',
                  borderColor: index === 1 ? NORDIC_STONE : 'rgba(255,255,255,0.1)',
                  background: index === 1 ? 'rgba(139,115,85,0.1)' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: NORDIC_STONE,
                  },
                }}
              >
                {/* Number */}
                <Typography
                  sx={{
                    color: NORDIC_STONE,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 1,
                    mb: 4,
                  }}
                >
                  0{index + 1}
                </Typography>

                <Typography
                  sx={{
                    color: NORDIC_WHITE,
                    fontSize: 24,
                    fontWeight: 400,
                    mb: 2,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {program.name}
                </Typography>

                <Typography
                  sx={{
                    color: NORDIC_GRAY,
                    fontSize: 13,
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  {program.desc}
                </Typography>

                {/* Include */}
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                  {program.include.map((item) => (
                    <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: NORDIC_SAGE,
                        }}
                      />
                      <Typography sx={{ color: NORDIC_GRAY, fontSize: 12 }}>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Ideal */}
                <Typography
                  sx={{
                    color: NORDIC_SAGE,
                    fontSize: 11,
                    fontStyle: 'italic',
                    borderTop: `1px solid rgba(255,255,255,0.1)`,
                    pt: 3,
                  }}
                >
                  {program.ideal}
                </Typography>
              </Box>
            </m.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
