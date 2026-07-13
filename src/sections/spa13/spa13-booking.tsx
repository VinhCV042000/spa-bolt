import type { Spa13Lang } from 'src/sections/spa13/spa13-data';

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

import { FRESH, JUNGLE, TROP_GOLD, SPA13_TREATMENTS } from 'src/sections/spa13/spa13-data';

export function Spa13Booking() {
  const { t, currentLang } = useTranslate('spa13');
  const lang = currentLang.value as Spa13Lang;

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      color: FRESH,
      bgcolor: 'rgba(240,255,244,0.03)',
      '& fieldset': { borderColor: 'rgba(247,201,72,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(247,201,72,0.45)' },
      '&.Mui-focused fieldset': { borderColor: TROP_GOLD },
    },
    '& .MuiInputLabel-root': { color: 'rgba(240,255,244,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: TROP_GOLD },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: JUNGLE }}>
      <Container component={MotionViewport}>
        {/* Treatment menu */}
        <Box sx={{ mb: 10 }}>
          <Stack spacing={2} alignItems="center" sx={{ mb: 6, textAlign: 'center' }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="overline"
                sx={{ color: TROP_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
              >
                {t('treatments.label')}
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: FRESH }}>
                {t('treatments.title')}{' '}
                <Box component="span" sx={{ color: TROP_GOLD }}>
                  {t('treatments.titleHighlight')}
                </Box>
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(240,255,244,0.45)', maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}
              >
                {t('treatments.description')}
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              maxWidth: 680,
              mx: 'auto',
              borderRadius: 4,
              border: '1px solid rgba(247,201,72,0.12)',
              bgcolor: 'rgba(247,201,72,0.03)',
              overflow: 'hidden',
            }}
          >
            <Stack divider={<Divider sx={{ borderColor: 'rgba(247,201,72,0.08)' }} />}>
              {SPA13_TREATMENTS.map((tr) => (
                <Stack
                  key={tr.name.en}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    px: 4,
                    py: 3,
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'rgba(247,201,72,0.04)' },
                  }}
                >
                  <Stack spacing={0.25}>
                    <Typography variant="body2" sx={{ color: FRESH, fontWeight: 700 }}>
                      {tr.name[lang]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(240,255,244,0.35)' }}>
                      {tr.duration[lang]}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="subtitle2" sx={{ color: TROP_GOLD, fontWeight: 800 }}>
                      {tr.price[lang]}
                    </Typography>
                    <Button
                      size="small"
                      sx={{
                        bgcolor: TROP_GOLD,
                        color: JUNGLE,
                        borderRadius: 1.5,
                        px: 1.5,
                        py: 0.5,
                        fontWeight: 700,
                        fontSize: 11,
                        '&:hover': { bgcolor: '#D4A820' },
                      }}
                    >
                      {t('treatments.book')}
                    </Button>
                  </Stack>
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
                    sx={{ color: TROP_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: FRESH, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: TROP_GOLD }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(247,201,72,0.06)',
                    border: '1px solid rgba(247,201,72,0.15)',
                  }}
                >
                  <Typography sx={{ fontSize: 36, mb: 1 }}>🌿</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(240,255,244,0.55)', lineHeight: 1.7, fontStyle: 'italic' }}
                  >
                    &ldquo;A floresta cura — Rừng chữa lành. Người bản địa Amazon biết điều này từ
                    hàng nghìn năm trước.&rdquo;
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Iconify icon="solar:leaf-bold-duotone" width={16} sx={{ color: '#4CAF50' }} />
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(240,255,244,0.5)', fontStyle: 'italic', fontSize: 12 }}
                  >
                    {t('booking.ecoNote')}
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
                border: '1px solid rgba(247,201,72,0.12)',
                bgcolor: 'rgba(0,0,0,0.2)',
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
                      label={t('booking.date')}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label={t('booking.treatment')}
                  select
                  defaultValue=""
                  sx={inputSx}
                >
                  {SPA13_TREATMENTS.map((tr) => (
                    <MenuItem key={tr.name.en} value={tr.name[lang]}>
                      {tr.name[lang]}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField fullWidth label={t('booking.notes')} multiline rows={2} sx={inputSx} />
                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:compass-bold-duotone" />}
                  sx={{
                    bgcolor: TROP_GOLD,
                    color: JUNGLE,
                    borderRadius: 2,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#D4A820' },
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
