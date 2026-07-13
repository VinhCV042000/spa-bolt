import type { Spa5Lang } from 'src/sections/spa5/spa5-data';

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

import { SPA5_RITUALS } from 'src/sections/spa5/spa5-data';

// ----------------------------------------------------------------------

const CHAMPAGNE = '#C9A84C';
const CREAM = '#FAF7F2';

export function Spa5Experience() {
  const { t, currentLang } = useTranslate('spa5');
  const lang = currentLang.value as Spa5Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM }}>
      <Container component={MotionViewport}>
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('experience.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, maxWidth: 440, mx: 'auto' }}>
              {t('experience.title')}{' '}
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {t('experience.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('experience.description')}
            </Typography>
          </Box>
        </Stack>

        {/* Ritual cards */}
        <Grid container spacing={3}>
          {SPA5_RITUALS.map((ritual) => (
            <Grid key={ritual.number} item xs={12} sm={6} md={3}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: `0 30px 70px rgba(0,0,0,0.2)`,
                    },
                    '&:hover .ritual-overlay': { opacity: 0.85 },
                    '&:hover .ritual-cta': { opacity: 1, transform: 'translateY(0)' },
                  }}
                >
                  {/* Background image */}
                  <Box
                    component="img"
                    src={
                      ritual.icon === 'solar:water-sun-bold-duotone'
                        ? 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80'
                        : ritual.icon === 'solar:leaf-bold-duotone'
                          ? 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80'
                          : ritual.icon === 'solar:stars-bold-duotone'
                            ? 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80'
                            : 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80'
                    }
                    alt={ritual.title[lang]}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Dark overlay */}
                  <Box
                    className="ritual-overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: ritual.color,
                      opacity: 0.72,
                      transition: 'opacity 0.35s ease',
                    }}
                  />

                  {/* Content */}
                  <Stack
                    spacing={2}
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      p: 3,
                      height: '100%',
                      minHeight: 340,
                      justifyContent: 'flex-end',
                    }}
                  >
                    {/* Number */}
                    <Typography
                      sx={{
                        fontSize: 64,
                        fontWeight: 900,
                        lineHeight: 1,
                        color: 'rgba(201,168,76,0.2)',
                        letterSpacing: -4,
                        position: 'absolute',
                        top: 16,
                        right: 16,
                      }}
                    >
                      {ritual.number}
                    </Typography>

                    <Iconify icon={ritual.icon} width={32} sx={{ color: CHAMPAGNE }} />
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 800 }}>
                      {ritual.title[lang]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: CHAMPAGNE, fontStyle: 'italic' }}>
                      {ritual.subtitle[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(250,247,242,0.75)',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {ritual.description[lang]}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ color: 'rgba(250,247,242,0.55)' }}>
                        {ritual.duration[lang]} · {ritual.price[lang]}
                      </Typography>
                    </Stack>

                    {/* CTA on hover */}
                    <Button
                      className="ritual-cta"
                      fullWidth
                      size="small"
                      sx={{
                        bgcolor: CHAMPAGNE,
                        color: '#0A0A2E',
                        borderRadius: 2,
                        fontWeight: 700,
                        opacity: 0,
                        transform: 'translateY(8px)',
                        transition: 'all 0.3s ease',
                        '&:hover': { bgcolor: '#B8963D' },
                      }}
                    >
                      {t('experience.bookRitual')}
                    </Button>
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
