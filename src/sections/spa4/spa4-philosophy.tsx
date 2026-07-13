import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SPA4_IMAGES } from 'src/sections/spa4/spa4-data';

// ----------------------------------------------------------------------

const JADE_GREEN = '#1B4332';
const ROSE_GOLD = '#C9956C';

export function Spa4Philosophy() {
  const { t } = useTranslate('spa4');

  const pillars = [
    {
      number: '01',
      titleKey: 'philosophy.pillar1Title',
      descKey: 'philosophy.pillar1Desc',
      image: SPA4_IMAGES.philosophy1,
      color: '#E8F5E9',
    },
    {
      number: '02',
      titleKey: 'philosophy.pillar2Title',
      descKey: 'philosophy.pillar2Desc',
      image: SPA4_IMAGES.philosophy2,
      color: '#FFF0F3',
    },
    {
      number: '03',
      titleKey: 'philosophy.pillar3Title',
      descKey: 'philosophy.pillar3Desc',
      image: SPA4_IMAGES.philosophy3,
      color: '#FFF8E1',
    },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
      <Container component={MotionViewport}>
        <Stack spacing={1} alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ROSE_GOLD, letterSpacing: 3, fontWeight: 700 }}
            >
              {t('philosophy.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: JADE_GREEN, maxWidth: 480, mx: 'auto' }}
            >
              {t('philosophy.title')}
              <br />
              {t('philosophy.titleHighlight')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          {pillars.map((pillar) => (
            <Grid key={pillar.number} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    bgcolor: pillar.color,
                    borderRadius: 5,
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <Box sx={{ height: 220, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={pillar.image}
                      alt={t(pillar.titleKey)}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                    />
                  </Box>
                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Typography
                      variant="h1"
                      sx={{
                        fontSize: 56,
                        fontWeight: 900,
                        color: JADE_GREEN,
                        opacity: 0.08,
                        lineHeight: 1,
                        letterSpacing: -4,
                      }}
                    >
                      {pillar.number}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: JADE_GREEN, mt: -4 }}>
                      {t(pillar.titleKey)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {t(pillar.descKey)}
                    </Typography>
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
