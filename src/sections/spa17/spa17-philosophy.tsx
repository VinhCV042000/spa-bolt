import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { CRYSTAL, AMETHYST, ROSE_QUARTZ, SPA17_PHILOSOPHY } from 'src/sections/spa17/spa17-data';

export function Spa17Philosophy() {
  const { t } = useTranslate('spa17');
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: CRYSTAL,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          right: -150,
          top: '20%',
          width: 400,
          height: 400,
          background: `linear-gradient(135deg, ${ROSE_QUARTZ}12 0%, ${AMETHYST}08 100%)`,
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          transform: 'rotate(-15deg)',
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: AMETHYST,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            {t('philosophy.eyebrow')}
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: '#2D2A4A',
              lineHeight: 1.2,
            }}
          >
            Bốn trụ cột
            <Box component="span" sx={{ color: AMETHYST }}>
              {' '}
              hạnh phúc
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA17_PHILOSOPHY.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={item.title}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${AMETHYST}15`,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${AMETHYST}15`,
                    borderColor: `${AMETHYST}30`,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: index % 2 === 0 ? AMETHYST : ROSE_QUARTZ,
                    fontSize: 48,
                    fontWeight: 200,
                    mb: 2,
                    fontFamily: '"Noto Serif KR", serif',
                  }}
                >
                  {item.numeral}
                </Typography>
                <Typography
                  sx={{
                    color: '#2D2A4A',
                    fontSize: 18,
                    fontWeight: 500,
                    mb: 1.5,
                    fontFamily: '"Noto Serif KR", serif',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#6A6890',
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
