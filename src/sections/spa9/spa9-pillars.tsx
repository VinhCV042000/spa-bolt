import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA9_PILLARS } from 'src/sections/spa9/spa9-data';

// ----------------------------------------------------------------------

const AZURE = '#1B6CA8';
const SUN = '#F5A623';
const SAND = '#FDF5E6';

export function Spa9Pillars() {
  const { t } = useTranslate('spa9');

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: SAND }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: SUN, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('pillars.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, maxWidth: 480, mx: 'auto' }}>
              {t('pillars.title')}{' '}
              <Box component="span" sx={{ color: AZURE }}>
                {t('pillars.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('pillars.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA9_PILLARS.map((pillar, idx) => (
            <Grid key={pillar.greek} item xs={12} sm={6} md={3}>
              <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid`,
                    borderColor: `${pillar.color}20`,
                    bgcolor: 'white',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 64px ${pillar.color}18`,
                      borderColor: pillar.color,
                    },
                    '&:hover .pillar-img': { transform: 'scale(1.08)' },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{ height: 180, overflow: 'hidden', position: 'relative', flexShrink: 0 }}
                  >
                    <Box
                      className="pillar-img"
                      component="img"
                      src={pillar.image}
                      alt={pillar.greek}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'brightness(0.75) saturate(1.1)',
                      }}
                    />
                    {/* Color overlay */}
                    <Box
                      sx={{ position: 'absolute', inset: 0, bgcolor: pillar.color, opacity: 0.25 }}
                    />
                    {/* Number */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: pillar.color, fontWeight: 900, fontSize: 13 }}
                      >
                        0{idx + 1}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 3, flex: 1 }}>
                    <Stack spacing={1.5}>
                      {/* Greek word */}
                      <Typography
                        sx={{
                          fontSize: 11,
                          color: pillar.color,
                          fontWeight: 700,
                          letterSpacing: 1,
                          fontStyle: 'italic',
                        }}
                      >
                        {pillar.greek}
                      </Typography>

                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            bgcolor: `${pillar.color}12`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon={pillar.icon} width={20} sx={{ color: pillar.color }} />
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: '#0A2840', fontWeight: 800, lineHeight: 1.3 }}
                        >
                          {t(pillar.titleKey)}
                        </Typography>
                      </Stack>

                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {t(pillar.descKey)}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
