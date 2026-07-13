import type { Spa6Lang } from 'src/sections/spa6/spa6-data';

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

import { SPA6_RITUALS } from 'src/sections/spa6/spa6-data';

// ----------------------------------------------------------------------

const TERRACOTTA = '#C1440E';
const CREAM = '#F9F4ED';

export function Spa6Rituals() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#1C1008' }}>
      <Container component={MotionViewport}>
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('rituals.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: CREAM, maxWidth: 480, mx: 'auto' }}
            >
              {t('rituals.title')}{' '}
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {t('rituals.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(249,244,237,0.5)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('rituals.description')}
            </Typography>
          </Box>
        </Stack>

        {/* Ritual cards — 2 per row */}
        <Grid container spacing={3}>
          {SPA6_RITUALS.map((ritual, idx) => (
            <Grid key={ritual.title.en} item xs={12} md={6}>
              <Box
                component={m.div}
                variants={varFade({ distance: idx % 2 === 0 ? -40 : 40, axis: 'x' }).in}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: `1px solid rgba(193,68,14,0.15)`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: ritual.color,
                      transform: 'translateY(-6px)',
                      boxShadow: `0 24px 64px rgba(0,0,0,0.3)`,
                    },
                    '&:hover .ritual-img': { transform: 'scale(1.08)' },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: { xs: '100%', sm: 200 },
                      height: { xs: 220, sm: 'auto' },
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      className="ritual-img"
                      component="img"
                      src={ritual.image}
                      alt={ritual.title[lang]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: ritual.bg,
                      p: { xs: 3, sm: 3.5 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Stack spacing={1.5}>
                      {/* Origin badge */}
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          px: 1.25,
                          py: 0.4,
                          borderRadius: 1.5,
                          bgcolor: `${ritual.color}15`,
                          border: `1px solid ${ritual.color}30`,
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Box
                          sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: ritual.color }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: ritual.color,
                            fontWeight: 700,
                            fontSize: 10,
                            letterSpacing: 0.5,
                          }}
                        >
                          {ritual.origin[lang]}
                        </Typography>
                      </Box>

                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon={ritual.icon} width={20} sx={{ color: ritual.color }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1C1008' }}>
                          {ritual.title[lang]}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {ritual.description[lang]}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 2.5 }}
                    >
                      <Stack spacing={0.25}>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {ritual.duration[lang]}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: ritual.color, fontWeight: 800 }}
                        >
                          {ritual.price[lang]}
                        </Typography>
                      </Stack>
                      <Button
                        size="small"
                        sx={{
                          borderRadius: 2,
                          px: 2,
                          bgcolor: ritual.color,
                          color: CREAM,
                          fontWeight: 700,
                          fontSize: 12,
                          '&:hover': { bgcolor: `${ritual.color}CC` },
                        }}
                      >
                        {t('rituals.bookRitual')}
                      </Button>
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
