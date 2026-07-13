import type { Spa13Lang } from 'src/sections/spa13/spa13-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { FRESH, JUNGLE, TROP_GOLD, SPA13_BOTANICALS } from 'src/sections/spa13/spa13-data';

export function Spa13Botanicals() {
  const { t, currentLang } = useTranslate('spa13');
  const lang = currentLang.value as Spa13Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: FRESH }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TROP_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('botanicals.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, maxWidth: 440, mx: 'auto' }}>
              {t('botanicals.title')}{' '}
              <Box component="span" sx={{ color: JUNGLE }}>
                {t('botanicals.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 540, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('botanicals.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA13_BOTANICALS.map((bot, idx) => (
            <Grid key={bot.portuguese} item xs={12} sm={6}>
              <Box
                component={m.div}
                variants={varFade({ distance: idx % 2 === 0 ? -40 : 40, axis: 'x' }).in}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    border: `1px solid ${bot.color}18`,
                    bgcolor: 'white',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: bot.color,
                      transform: 'translateY(-5px)',
                      boxShadow: `0 20px 60px ${bot.color}15`,
                    },
                    '&:hover .bot-img': { transform: 'scale(1.08)' },
                  }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: { xs: '100%', md: 180 },
                      height: { xs: 200, md: 'auto' },
                      minHeight: { md: 200 },
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Box
                      className="bot-img"
                      component="img"
                      src={bot.image}
                      alt={bot.portuguese}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'brightness(0.75) saturate(1.2)',
                      }}
                    />
                    <Box
                      sx={{ position: 'absolute', inset: 0, bgcolor: bot.color, opacity: 0.25 }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 10, left: 12 }}>
                      <Typography sx={{ fontSize: 28, lineHeight: 1 }}>{bot.icon}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 3, flex: 1 }}>
                    <Stack spacing={1.5}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: bot.color,
                          fontWeight: 800,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          fontStyle: 'italic',
                        }}
                      >
                        {bot.portuguese}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: '#0D1F14', fontWeight: 800, lineHeight: 1.3 }}
                      >
                        {bot.name[lang]}
                      </Typography>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          width: 'fit-content',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.5,
                          bgcolor: `${TROP_GOLD}15`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: TROP_GOLD, fontWeight: 700, fontSize: 10 }}
                        >
                          {bot.benefit[lang]}
                        </Typography>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                      >
                        {bot.tribe[lang]}
                      </Typography>
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
                        {bot.description[lang]}
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
