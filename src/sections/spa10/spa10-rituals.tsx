import type { Spa10Lang } from 'src/sections/spa10/spa10-data';

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

import { ICE, TEAL, SPA10_RITUALS } from 'src/sections/spa10/spa10-data';

export function Spa10Rituals() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0E2535' }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TEAL, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('rituals.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: ICE, maxWidth: 440, mx: 'auto' }}
            >
              {t('rituals.title')}{' '}
              <Box component="span" sx={{ color: TEAL }}>
                {t('rituals.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(234,249,246,0.45)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('rituals.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA10_RITUALS.map((ritual, idx) => (
            <Grid key={ritual.name.en} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid rgba(255,255,255,0.05)`,
                    background: `linear-gradient(145deg, #0B1D35, #0E2535)`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: ritual.color,
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 60px ${ritual.color}20`,
                    },
                  }}
                >
                  <Stack spacing={2.5} sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Typography sx={{ fontSize: 48, lineHeight: 1 }}>{ritual.icon}</Typography>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.5,
                          bgcolor: `${ritual.color}15`,
                          border: `1px solid ${ritual.color}30`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: ritual.color, fontWeight: 800, fontSize: 13 }}
                        >
                          {ritual.temp}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack spacing={0.5}>
                      <Typography
                        variant="h6"
                        sx={{ color: ICE, fontWeight: 800, lineHeight: 1.3 }}
                      >
                        {ritual.name[lang]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: ritual.color, fontWeight: 600, fontStyle: 'italic' }}
                      >
                        {ritual.subtitle[lang]}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(234,249,246,0.5)', lineHeight: 1.75, flexGrow: 1 }}
                    >
                      {ritual.description[lang]}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ color: 'rgba(234,249,246,0.3)' }}>
                        {ritual.duration[lang]}
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          color: ritual.color,
                          fontWeight: 700,
                          p: 0,
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                        endIcon={<Iconify icon="solar:arrow-right-bold-duotone" />}
                      >
                        {t('rituals.bookRitual')}
                      </Button>
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
