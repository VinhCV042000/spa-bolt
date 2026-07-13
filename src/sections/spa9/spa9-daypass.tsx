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

import { SPA9_DAY_PACKAGES } from 'src/sections/spa9/spa9-data';

// ----------------------------------------------------------------------

const SUN = '#F5A623';
const SAND = '#FDF5E6';

export function Spa9DayPass() {
  const { t, currentLang } = useTranslate('spa9');
  const lang = currentLang.value as Spa9Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: SAND }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: SUN, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('daypass.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, maxWidth: 440, mx: 'auto' }}>
              {t('daypass.title')}{' '}
              <Box component="span" sx={{ color: SUN }}>
                {t('daypass.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('daypass.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {SPA9_DAY_PACKAGES.map((pkg) => (
            <Grid key={pkg.name.en} item xs={12} md={4}>
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
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid transparent`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: pkg.color,
                      transform: 'translateY(-8px)',
                      boxShadow: `0 32px 80px ${pkg.color}20`,
                    },
                    bgcolor: 'white',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Colorful header */}
                  <Box
                    sx={{
                      bgcolor: pkg.color,
                      px: 4,
                      py: 4,
                      textAlign: 'center',
                    }}
                  >
                    <Typography sx={{ fontSize: 36, mb: 1 }}>{pkg.emoji}</Typography>
                    <Typography variant="h5" sx={{ color: SAND, fontWeight: 900, lineHeight: 1.2 }}>
                      {pkg.name[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: `${SAND}99`, mb: 2 }}>
                      {pkg.subtitle[lang]}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: `${SAND}80`, display: 'block', mb: 1.5 }}
                    >
                      {pkg.time[lang]}
                    </Typography>
                    <Typography variant="h4" sx={{ color: SAND, fontWeight: 900 }}>
                      {pkg.price[lang]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: `${SAND}80` }}>
                      {t('daypass.perPerson')}
                    </Typography>
                  </Box>

                  {/* Includes */}
                  <Box
                    sx={{
                      p: 4,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      <Typography
                        variant="overline"
                        sx={{ color: pkg.color, fontWeight: 700, fontSize: 10, letterSpacing: 2 }}
                      >
                        {t('daypass.includes')}
                      </Typography>
                      {pkg.includes[lang].map((inc) => (
                        <Stack key={inc} direction="row" spacing={1.5} alignItems="flex-start">
                          <Iconify
                            icon="solar:check-circle-bold-duotone"
                            width={18}
                            sx={{ color: pkg.color, flexShrink: 0, mt: 0.2 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.primary', lineHeight: 1.5 }}
                          >
                            {inc}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      fullWidth
                      size="large"
                      sx={{
                        bgcolor: pkg.color,
                        color: SAND,
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 700,
                        '&:hover': { bgcolor: pkg.textColor, color: SAND },
                        transition: 'all 0.25s',
                      }}
                    >
                      {t('daypass.book')}
                    </Button>
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
