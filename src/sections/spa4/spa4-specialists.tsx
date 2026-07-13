import type { Spa4Lang } from 'src/sections/spa4/spa4-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA4_SPECIALISTS } from 'src/sections/spa4/spa4-data';

// ----------------------------------------------------------------------

const JADE_GREEN = '#1B4332';
const ROSE_GOLD = '#C9956C';

export function Spa4Specialists() {
  const { t, currentLang } = useTranslate('spa4');
  const lang = currentLang.value as Spa4Lang;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${JADE_GREEN} 0%, #2D6A4F 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          border: '60px solid rgba(255,255,255,0.04)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 240,
          height: 240,
          borderRadius: '50%',
          border: '50px solid rgba(255,255,255,0.04)',
        }}
      />

      <Container component={MotionViewport} sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={1} alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ROSE_GOLD, letterSpacing: 3, fontWeight: 700 }}
            >
              {t('specialists.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: 'white', maxWidth: 480, mx: 'auto' }}
            >
              {t('specialists.title')}
              <br />
              {t('specialists.titleHighlight')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 480, mx: 'auto' }}
            >
              {t('specialists.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA4_SPECIALISTS.map((specialist) => (
            <Grid key={specialist.name} item xs={12} sm={6} md={3}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 5,
                    overflow: 'hidden',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', transform: 'translateY(-6px)' },
                  }}
                >
                  <Box sx={{ height: 260, overflow: 'hidden', position: 'relative' }}>
                    <Box
                      component="img"
                      src={specialist.image}
                      alt={specialist.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(20%)',
                        transition: 'filter 0.3s ease',
                        '&:hover': { filter: 'grayscale(0%)' },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: 2,
                        px: 1.5,
                        py: 0.75,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Iconify icon="solar:star-bold" width={14} sx={{ color: '#FFB800' }} />
                      <Typography variant="caption" sx={{ color: 'white', fontWeight: 700 }}>
                        {specialist.rating}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        ({specialist.reviews})
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={0.5} sx={{ p: 3 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white' }}>
                      {specialist.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: ROSE_GOLD, fontWeight: 600 }}>
                      {specialist.title[lang]}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.75} pt={0.5}>
                      <Iconify
                        icon="solar:diploma-bold-duotone"
                        width={16}
                        sx={{ color: 'rgba(255,255,255,0.5)' }}
                      />
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        {specialist.experience} {t('specialists.experience')}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                      <Iconify
                        icon="solar:heart-bold-duotone"
                        width={16}
                        sx={{ color: 'rgba(255,255,255,0.5)' }}
                      />
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        {specialist.specialty[lang]}
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
