import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  NORDIC_GRAY,
  NORDIC_SAGE,
  NORDIC_WHITE,
  NORDIC_CREAM,
  NORDIC_BLACK,
  SPA26_SPACES,
} from 'src/sections/spa26/spa26-data';

export function Spa26Spaces() {
  const { t } = useTranslate('spa26');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_CREAM,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
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
              {t('spaces.eyebrow')}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 32, md: 48 },
                fontWeight: 300,
                color: NORDIC_BLACK,
                letterSpacing: -1.5,
              }}
            >
              {t('spaces.title')}
            </Typography>
          </Box>
        </m.div>

        {/* Spaces - Asymmetric Editorial Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gridAutoRows: 240,
            gridAutoFlow: 'dense',
            gap: 2,
          }}
        >
          {SPA26_SPACES.map((space, index) => {
            const spanStyle =
              index % 5 === 0
                ? {
                    gridColumn: { md: 'span 2' },
                    gridRow: { md: 'span 2' }, // ✅ KEY FIX
                  }
                : {};

            return (
              <Box
                component={m.div}
                key={space.name}
                variants={varFade({ distance: 40 }).inUp}
                sx={spanStyle}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 28px 80px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Image
                    alt={space.name}
                    src={space.image}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: 1,
                      height: 1,
                      objectFit: 'cover',
                      filter: 'brightness(0.9)',
                    }}
                  />

                  {/* overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
                    }}
                  />

                  {/* number */}
                  <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                    <Typography
                      sx={{
                        color: NORDIC_WHITE,
                        fontSize: 28,
                        fontWeight: 600,
                        opacity: 0.9,
                      }}
                    >
                      0{index + 1}
                    </Typography>
                  </Box>

                  {/* content */}
                  <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                    <Typography
                      sx={{
                        color: NORDIC_WHITE,
                        fontSize: 18,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {space.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: NORDIC_WHITE,
                        fontSize: 13,
                        lineHeight: 1.6,
                        opacity: 0.9,
                      }}
                    >
                      {space.desc}
                    </Typography>
                  </Box>

                  {/* dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: NORDIC_SAGE,
                      boxShadow: `0 0 0 6px ${NORDIC_SAGE}20`,
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
