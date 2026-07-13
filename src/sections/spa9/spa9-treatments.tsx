import type { Spa9Lang } from 'src/sections/spa9/spa9-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA9_TREATMENTS } from 'src/sections/spa9/spa9-data';

// ----------------------------------------------------------------------

const SUN = '#F5A623';
const DARK = '#0A2840';

export function Spa9Treatments() {
  const { t, currentLang } = useTranslate('spa9');
  const lang = currentLang.value as Spa9Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: DARK }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: SUN, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('treatments.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: '#FDF5E6', maxWidth: 440, mx: 'auto' }}
            >
              {t('treatments.title')}{' '}
              <Box component="span" sx={{ color: SUN }}>
                {t('treatments.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,245,230,0.5)', maxWidth: 500, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('treatments.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA9_TREATMENTS.map((treatment, idx) => (
            <Grid key={treatment.name.en} item xs={12} md={6}>
              <Box
                component={m.div}
                variants={varFade({ distance: idx % 2 === 0 ? -40 : 40, axis: 'x' }).in}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `1px solid rgba(253,245,230,0.06)`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: treatment.color,
                      transform: 'translateY(-6px)',
                      boxShadow: `0 24px 64px ${treatment.color}20`,
                    },
                    '&:hover .tr-img': { transform: 'scale(1.08)' },
                  }}
                >
                  {/* Image strip */}
                  <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                    <Box
                      className="tr-img"
                      component="img"
                      src={
                        treatment.icon === 'solar:bath-bold-duotone'
                          ? 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80'
                          : treatment.icon === 'solar:leaf-bold-duotone'
                            ? 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80'
                            : treatment.icon === 'solar:stars-bold-duotone'
                              ? 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80'
                              : 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=800&q=80'
                      }
                      alt={treatment.name[lang]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'brightness(0.65)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to top, ${DARK} 0%, transparent 60%)`,
                      }}
                    />
                    {/* Origin badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(10,40,64,0.7)',
                        backdropFilter: 'blur(8px)',
                        border: `1px solid ${treatment.color}40`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: treatment.color, fontWeight: 700, fontSize: 10 }}
                      >
                        {treatment.origin[lang]}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 3.5, bgcolor: '#0E2D45' }}>
                    <Stack spacing={1.5}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Iconify icon={treatment.icon} width={22} sx={{ color: treatment.color }} />
                        <Typography variant="h6" sx={{ color: '#FDF5E6', fontWeight: 800 }}>
                          {treatment.name[lang]}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(253,245,230,0.55)',
                          lineHeight: 1.75,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {treatment.description[lang]}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack spacing={0.25}>
                          <Typography variant="caption" sx={{ color: 'rgba(253,245,230,0.35)' }}>
                            {treatment.duration[lang]}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: treatment.color, fontWeight: 800 }}
                          >
                            {treatment.price[lang]}
                          </Typography>
                        </Stack>
                        <Button
                          size="small"
                          sx={{
                            bgcolor: treatment.color,
                            color: '#FDF5E6',
                            borderRadius: 2,
                            px: 2.5,
                            fontWeight: 700,
                            '&:hover': { bgcolor: `${treatment.color}CC` },
                          }}
                        >
                          {t('treatments.bookTreatment')}
                        </Button>
                      </Stack>
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
