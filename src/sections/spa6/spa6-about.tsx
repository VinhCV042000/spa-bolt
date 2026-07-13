import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA6_IMAGES } from 'src/sections/spa6/spa6-data';

// ----------------------------------------------------------------------

const TERRACOTTA = '#C1440E';
const FOREST = '#2D5016';
const CREAM = '#F9F4ED';

const PILLARS = [
  {
    titleKey: 'about.pillar1Title',
    descKey: 'about.pillar1Desc',
    icon: 'solar:yin-yang-bold-duotone',
    color: TERRACOTTA,
    number: '01',
  },
  {
    titleKey: 'about.pillar2Title',
    descKey: 'about.pillar2Desc',
    icon: 'solar:leaf-bold-duotone',
    color: FOREST,
    number: '02',
  },
  {
    titleKey: 'about.pillar3Title',
    descKey: 'about.pillar3Desc',
    icon: 'solar:bolt-bold-duotone',
    color: '#8B4513',
    number: '03',
  },
] as const;

export function Spa6About() {
  const { t } = useTranslate('spa6');

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM }}>
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          {/* Left — image */}
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Box sx={{ position: 'relative' }}>
                {/* Main image */}
                <Box
                  sx={{
                    borderRadius: 5,
                    overflow: 'hidden',
                    height: { xs: 320, md: 500 },
                  }}
                >
                  <Box
                    component="img"
                    src={SPA6_IMAGES.about}
                    alt="Terra Heal Philosophy"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>

                {/* Floating badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -24,
                    right: -24,
                    bgcolor: TERRACOTTA,
                    borderRadius: 4,
                    p: 3,
                    boxShadow: `0 16px 48px rgba(193,68,14,0.35)`,
                    minWidth: 140,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h3" sx={{ color: CREAM, fontWeight: 900, lineHeight: 1 }}>
                    5000
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(249,244,237,0.8)', fontWeight: 600, letterSpacing: 1 }}
                  >
                    {t('about.label')}
                  </Typography>
                </Box>

                {/* Organic shape background */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    width: '60%',
                    height: '60%',
                    bgcolor: 'rgba(45,80,22,0.08)',
                    borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
                    zIndex: -1,
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right — text + pillars */}
          <Grid item xs={12} md={7}>
            <Stack spacing={5}>
              {/* Header */}
              <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('about.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                    {t('about.title')}{' '}
                    <Box component="span" sx={{ color: FOREST }}>
                      {t('about.titleHighlight')}
                    </Box>
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    {t('about.description')}
                  </Typography>
                </Stack>
              </Box>

              {/* Pillars */}
              {PILLARS.map(({ titleKey, descKey, icon, color, number }) => (
                <Box
                  key={number}
                  component={m.div}
                  variants={varFade({ distance: 30 }).inRight}
                  sx={{
                    display: 'flex',
                    gap: 2.5,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: color,
                      transform: 'translateX(8px)',
                      boxShadow: `0 8px 32px rgba(0,0,0,0.06)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: `${color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={icon} width={28} sx={{ color }} />
                  </Box>
                  <Stack spacing={0.75}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {t(titleKey)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {t(descKey)}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
