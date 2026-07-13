import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  SPA26_TEAM,
  NORDIC_GRAY,
  NORDIC_SAGE,
  NORDIC_WHITE,
  NORDIC_CREAM,
  NORDIC_STONE,
  NORDIC_BLACK,
} from 'src/sections/spa26/spa26-data';

export function Spa26Team() {
  const { t } = useTranslate('spa26');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_WHITE,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <m.div variants={varFade({ distance: 40 }).inUp}>
          <Box sx={{ mb: 10, textAlign: 'center' }}>
            <Typography
              sx={{
                color: NORDIC_GRAY,
                letterSpacing: 4,
                fontSize: 10,
                fontWeight: 500,
                mb: 2,
              }}
            >
              {t('team.eyebrow')}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 32, md: 56 },
                fontWeight: 300,
                color: NORDIC_BLACK,
                letterSpacing: -1.5,
              }}
            >
              {t('team.title')}
            </Typography>
          </Box>
        </m.div>

        {/* Team Members */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {SPA26_TEAM.map((member) => (
            <m.div key={member.name} variants={varFade({ distance: 40 }).inUp}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 4, md: 5 },
                  minHeight: 420,
                  borderRadius: 3,
                  background: NORDIC_CREAM,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 240,
                    background: `linear-gradient(180deg, rgba(250,250,248,0.96), rgba(250,250,248,0.24))`,
                    zIndex: 0,
                  }}
                />

                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 220, md: 240 },
                    mb: 3,
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: `1px solid ${NORDIC_STONE}20`,
                    zIndex: 1,
                  }}
                >
                  <Image
                    alt={member.name}
                    src={member.avatarUrl}
                    ratio="4/3"
                    sx={{ width: 1, height: 1, objectFit: 'cover' }}
                  />
                </Box>

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography
                    sx={{
                      color: NORDIC_BLACK,
                      fontSize: 22,
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {member.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: NORDIC_SAGE,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      mb: 1,
                    }}
                  >
                    {member.role}
                  </Typography>

                  <Typography
                    sx={{
                      color: NORDIC_GRAY,
                      fontSize: 12,
                      fontStyle: 'italic',
                      mb: 2,
                    }}
                  >
                    {member.origin}
                  </Typography>

                  <Typography sx={{ color: NORDIC_GRAY, fontSize: 14, lineHeight: 1.8 }}>
                    {member.desc}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    width: 50,
                    height: 3,
                    borderRadius: 1.5,
                    background: NORDIC_SAGE,
                    zIndex: 1,
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
