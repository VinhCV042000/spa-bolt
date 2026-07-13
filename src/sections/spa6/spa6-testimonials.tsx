import type { Spa6Lang } from 'src/sections/spa6/spa6-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA6_TESTIMONIALS } from 'src/sections/spa6/spa6-data';

// ----------------------------------------------------------------------

const TERRACOTTA = '#C1440E';
const FOREST = '#2D5016';
const CREAM = '#F9F4ED';
const DARK = '#1C1008';

export function Spa6Testimonials() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('testimonials.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, maxWidth: 400, mx: 'auto' }}>
              {t('testimonials.title')}{' '}
              <Box component="span" sx={{ color: FOREST }}>
                {t('testimonials.titleHighlight')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA6_TESTIMONIALS.map((item, idx) => (
            <Grid key={item.name} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 40 }).inUp}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.06)',
                  bgcolor: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 24px 64px rgba(193,68,14,0.1)`,
                    borderColor: TERRACOTTA,
                  },
                }}
              >
                {/* Colored top stripe */}
                <Box
                  sx={{
                    height: 6,
                    bgcolor: idx === 0 ? TERRACOTTA : idx === 1 ? FOREST : '#8B4513',
                  }}
                />

                <Stack spacing={3} sx={{ p: { xs: 3, md: 4 }, flex: 1 }}>
                  {/* Stars */}
                  <Stack direction="row" spacing={0.5}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Iconify
                        key={i}
                        icon="solar:star-bold"
                        width={16}
                        sx={{ color: '#F5C842' }}
                      />
                    ))}
                  </Stack>

                  {/* Quote */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.75,
                      fontStyle: 'italic',
                      flexGrow: 1,
                    }}
                  >
                    &ldquo;{item.quote[lang]}&rdquo;
                  </Typography>

                  {/* Improvement badge */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor:
                        idx === 0 ? `${TERRACOTTA}10` : idx === 1 ? `${FOREST}10` : '#8B451310',
                      border: `1px solid ${idx === 0 ? TERRACOTTA : idx === 1 ? FOREST : '#8B4513'}25`,
                    }}
                  >
                    <Iconify
                      icon="solar:chart-bold-duotone"
                      width={16}
                      sx={{ color: idx === 0 ? TERRACOTTA : idx === 1 ? FOREST : '#8B4513' }}
                    />
                    <Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.disabled', lineHeight: 1, fontSize: 10 }}
                      >
                        {item.beforeAfter[lang]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: idx === 0 ? TERRACOTTA : idx === 1 ? FOREST : '#8B4513',
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      >
                        {item.improvement[lang]}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Author */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      sx={{
                        width: 48,
                        height: 48,
                        border: `2px solid ${idx === 0 ? TERRACOTTA : idx === 1 ? FOREST : '#8B4513'}`,
                      }}
                    />
                    <Stack spacing={0.25}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: DARK }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {item.role[lang]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
