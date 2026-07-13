import type { Spa8Lang } from 'src/sections/spa8/spa8-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SPA8_SEASONS } from 'src/sections/spa8/spa8-data';

// ----------------------------------------------------------------------

const INK = '#1A0A2E';
const GOLD = '#C8A951';
const CREAM = '#FFF8F0';

export function Spa8Seasons() {
  const { t, currentLang } = useTranslate('spa8');
  const lang = currentLang.value as Spa8Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('seasons.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: INK, maxWidth: 440, mx: 'auto' }}
            >
              {t('seasons.title')}{' '}
              <Box component="span" sx={{ color: GOLD }}>
                {t('seasons.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('seasons.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA8_SEASONS.map((season) => (
            <Grid key={season.kanji} item xs={12} sm={6} md={3}>
              <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: `0 32px 80px ${season.color}30`,
                    },
                    '&:hover .season-img': { transform: 'scale(1.08)' },
                    '&:hover .season-cta': { opacity: 1 },
                    border: `1px solid ${season.color}30`,
                    cursor: 'pointer',
                  }}
                >
                  {/* Image with overlay */}
                  <Box
                    sx={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}
                  >
                    <Box
                      className="season-img"
                      component="img"
                      src={
                        season.kanji === '春'
                          ? 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=80'
                          : season.kanji === '夏'
                            ? 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80'
                            : season.kanji === '秋'
                              ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'
                              : 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80'
                      }
                      alt={season.name[lang]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    {/* Kanji overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: `${season.darkColor}70`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 80,
                          color: 'rgba(255,255,255,0.25)',
                          fontWeight: 900,
                          lineHeight: 1,
                        }}
                      >
                        {season.kanji}
                      </Typography>
                    </Box>
                    {/* Season name badge */}
                    <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                      <Typography
                        sx={{ fontSize: 13, color: CREAM, fontWeight: 700, fontStyle: 'italic' }}
                      >
                        {season.romaji}
                      </Typography>
                    </Box>
                    {/* Availability */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: season.color, fontWeight: 700, fontSize: 10 }}
                      >
                        {season.available[lang]}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: 'white',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack spacing={1.5} sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: INK, fontWeight: 800, lineHeight: 1.3 }}
                      >
                        {season.name[lang]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: season.darkColor, fontWeight: 600, fontStyle: 'italic' }}
                      >
                        {season.subtitle[lang]}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.65,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {season.description[lang]}
                      </Typography>
                    </Stack>

                    <Box sx={{ mt: 2.5 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1.5 }}
                      >
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {season.duration[lang]}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: season.darkColor, fontWeight: 800 }}
                        >
                          {season.price[lang]}
                        </Typography>
                      </Stack>
                      <Button
                        className="season-cta"
                        fullWidth
                        size="small"
                        sx={{
                          bgcolor: season.color,
                          color: INK,
                          borderRadius: 2,
                          fontWeight: 700,
                          opacity: { xs: 1, md: 0 },
                          transition: 'opacity 0.3s ease',
                          '&:hover': { bgcolor: season.darkColor, color: CREAM },
                        }}
                      >
                        {t('seasons.bookSeason')}
                      </Button>
                    </Box>
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
