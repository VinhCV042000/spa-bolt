import type { Spa7Lang } from 'src/sections/spa7/spa7-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA7_RESULTS, SPA7_TIME_SLOTS } from 'src/sections/spa7/spa7-data';

// ----------------------------------------------------------------------

const BLACK = '#0D0D0D';
const PINK = '#F4A7B9';
const WHITE = '#FAFAFA';

export function Spa7Booking() {
  const { t, currentLang } = useTranslate('spa7');
  const lang = currentLang.value as Spa7Lang;
  const timeSlots = SPA7_TIME_SLOTS[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: 'rgba(250,250,250,0.04)',
      color: WHITE,
      '& fieldset': { borderColor: 'rgba(244,167,185,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(244,167,185,0.4)' },
      '&.Mui-focused fieldset': { borderColor: PINK },
    },
    '& .MuiInputLabel-root': { color: 'rgba(250,250,250,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: PINK },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: BLACK }}>
      <Container component={MotionViewport}>
        {/* Results row */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{ mb: { xs: 6, md: 10 } }}
        >
          <Stack spacing={2} alignItems="center" sx={{ mb: 5, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: PINK, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('results.label')}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: WHITE }}>
              {t('results.title')}{' '}
              <Box component="span" sx={{ color: PINK }}>
                {t('results.titleHighlight')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(250,250,250,0.4)', maxWidth: 460, mx: 'auto' }}
            >
              {t('results.description')}
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {SPA7_RESULTS.map((r) => (
              <Grid key={r.concern.en} item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid rgba(244,167,185,0.12)',
                    bgcolor: '#141414',
                    transition: 'all 0.3s ease',
                    '&:hover': { borderColor: PINK, transform: 'translateY(-4px)' },
                  }}
                >
                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" sx={{ color: PINK, fontWeight: 700 }}>
                      {r.concern[lang]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.35)' }}>
                      {r.program[lang]}
                    </Typography>
                    <Box sx={{ height: 1, bgcolor: 'rgba(244,167,185,0.1)' }} />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:chart-bold-duotone"
                        width={16}
                        sx={{ color: '#4CAF50' }}
                      />
                      <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                        {r.improvement[lang]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Booking form */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={3}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: PINK, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: WHITE, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: PINK }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(250,250,250,0.5)', lineHeight: 1.8 }}
                  >
                    {t('booking.description')}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Iconify
                    icon="solar:shield-check-bold-duotone"
                    width={20}
                    sx={{ color: '#4CAF50' }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(250,250,250,0.4)', fontStyle: 'italic', fontSize: 13 }}
                  >
                    {t('booking.guarantee')}
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
                border: '1px solid rgba(244,167,185,0.12)',
                bgcolor: '#141414',
              }}
            >
              <Stack spacing={2.5}>
                <TextField fullWidth label={t('booking.name')} sx={inputSx} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.phone')} sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.email')} type="email" sx={inputSx} />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label={t('booking.concern')}
                  placeholder={t('booking.concernPlaceholder')}
                  sx={inputSx}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      fullWidth
                      label={t('booking.preferTime')}
                      select
                      defaultValue=""
                      sx={inputSx}
                    >
                      {timeSlots.map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      label="Date"
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                  sx={{
                    bgcolor: PINK,
                    color: BLACK,
                    borderRadius: 2,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#E894AD' },
                  }}
                >
                  {t('booking.submit')}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
