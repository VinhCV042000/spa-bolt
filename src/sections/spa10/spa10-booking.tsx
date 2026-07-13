import type { Spa10Lang } from 'src/sections/spa10/spa10-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  ICE,
  TEAL,
  NORDIC_BLUE,
  SPA10_SERVICES,
  SPA10_RITUAL_OPTIONS,
} from 'src/sections/spa10/spa10-data';

export function Spa10Booking() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;
  const rituals = SPA10_RITUAL_OPTIONS[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      color: ICE,
      bgcolor: 'rgba(234,249,246,0.03)',
      '& fieldset': { borderColor: 'rgba(0,201,167,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(0,201,167,0.4)' },
      '&.Mui-focused fieldset': { borderColor: TEAL },
    },
    '& .MuiInputLabel-root': { color: 'rgba(234,249,246,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: TEAL },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: NORDIC_BLUE }}>
      <Container component={MotionViewport}>
        {/* Services */}
        <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ mb: 10 }}>
          <Stack spacing={2} alignItems="center" sx={{ mb: 5, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: TEAL, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('services.label')}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: ICE }}>
              {t('services.title')}{' '}
              <Box component="span" sx={{ color: TEAL }}>
                {t('services.titleHighlight')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(234,249,246,0.4)', maxWidth: 460, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('services.description')}
            </Typography>
          </Stack>
          <Box
            sx={{
              maxWidth: 640,
              mx: 'auto',
              borderRadius: 4,
              border: `1px solid rgba(0,201,167,0.12)`,
              bgcolor: 'rgba(0,201,167,0.03)',
              overflow: 'hidden',
            }}
          >
            <Stack divider={<Divider sx={{ borderColor: 'rgba(0,201,167,0.08)' }} />}>
              {SPA10_SERVICES.map((s) => (
                <Stack
                  key={s.name.en}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ px: 4, py: 2.5 }}
                >
                  <Stack spacing={0.25}>
                    <Typography variant="body2" sx={{ color: ICE, fontWeight: 600 }}>
                      {s.name[lang]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(234,249,246,0.35)' }}>
                      {s.duration[lang]}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2" sx={{ color: TEAL, fontWeight: 800 }}>
                    {s.price[lang]}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Booking form */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={3}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: TEAL, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: ICE, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: TEAL }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(0,201,167,0.05)',
                    border: '1px solid rgba(0,201,167,0.15)',
                  }}
                >
                  <Typography sx={{ fontSize: 32, mb: 1 }}>🌲</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(234,249,246,0.5)', lineHeight: 1.7, fontStyle: 'italic' }}
                  >
                    &ldquo;Friluftsliv — cuộc sống ngoài trời tự do. Người Na Uy tin rằng thiên
                    nhiên là phòng khách lớn nhất.&rdquo;
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Iconify
                    icon="solar:shield-check-bold-duotone"
                    width={16}
                    sx={{ color: '#4CAF50' }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(234,249,246,0.4)', fontStyle: 'italic', fontSize: 12 }}
                  >
                    {t('booking.policy')}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              component={m.div}
              variants={varFade({ distance: 40 }).inRight}
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 4,
                border: '1px solid rgba(0,201,167,0.12)',
                bgcolor: '#0E2535',
              }}
            >
              <Stack spacing={2.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.name')} sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.email')} type="email" sx={inputSx} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.phone')} sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.guests')}
                      select
                      defaultValue="2"
                      sx={inputSx}
                    >
                      {['1', '2', '3', '4'].map((n) => (
                        <MenuItem key={n} value={n}>
                          {n}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label={t('booking.ritual')}
                  select
                  defaultValue=""
                  sx={inputSx}
                >
                  {rituals.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label={t('booking.date')}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={inputSx}
                />
                <TextField fullWidth label={t('booking.notes')} multiline rows={2} sx={inputSx} />
                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                  sx={{
                    bgcolor: TEAL,
                    color: NORDIC_BLUE,
                    borderRadius: 2,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#00A88A' },
                  }}
                >
                  {t('booking.confirm')}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
