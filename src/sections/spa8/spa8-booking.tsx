import type { Spa8Lang } from 'src/sections/spa8/spa8-data';

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

import { SPA8_DURATION_OPTIONS } from 'src/sections/spa8/spa8-data';

// ----------------------------------------------------------------------

const INK = '#1A0A2E';
const GOLD = '#C8A951';
const SAKURA = '#FFB7C5';
const CREAM = '#FFF8F0';

export function Spa8Booking() {
  const { t, currentLang } = useTranslate('spa8');
  const lang = currentLang.value as Spa8Lang;
  const durations = SPA8_DURATION_OPTIONS[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      color: INK,
      '& fieldset': { borderColor: 'rgba(26,10,46,0.15)' },
      '&:hover fieldset': { borderColor: GOLD },
      '&.Mui-focused fieldset': { borderColor: GOLD },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: GOLD },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM }}>
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 4, md: 10 }} alignItems="flex-start">
          {/* Left — text */}
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: INK, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: GOLD }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    {t('booking.description')}
                  </Typography>
                </Stack>

                {/* Omakase explanation */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(200,169,81,0.08)',
                    border: `1px solid rgba(200,169,81,0.2)`,
                  }}
                >
                  <Typography
                    sx={{ fontSize: 28, color: GOLD, fontWeight: 300, letterSpacing: 4, mb: 1 }}
                  >
                    お任せ
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, fontStyle: 'italic' }}
                  >
                    &ldquo;Omakase&rdquo; — &ldquo;tôi tin tưởng bạn&rdquo;. Một truyền thống Nhật
                    Bản khi thực khách đặt trọn niềm tin cho nghệ nhân. Tại Amaya, đó là khoảnh khắc
                    bạn trao tâm trí và cơ thể cho chúng tôi.
                  </Typography>
                </Box>

                {/* Contact */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: `${SAKURA}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="solar:phone-bold-duotone" width={20} sx={{ color: SAKURA }} />
                  </Box>
                  <Stack>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      Hotline
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: INK, fontWeight: 700 }}>
                      0902 888 999
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* Right — form */}
          <Grid item xs={12} md={7}>
            <Box
              component={m.div}
              variants={varFade({ distance: 40 }).inRight}
              sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 4,
                bgcolor: 'white',
                boxShadow: '0 8px 40px rgba(26,10,46,0.08)',
                border: `1px solid rgba(200,169,81,0.15)`,
              }}
            >
              <Stack spacing={2.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.name')} sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.guests')}
                      select
                      defaultValue="2"
                      sx={inputSx}
                    >
                      {['1', '2', '3', '4', '5+'].map((n) => (
                        <MenuItem key={n} value={n}>
                          {n}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.date')}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.time')}
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label={t('booking.duration')}
                  select
                  defaultValue=""
                  sx={inputSx}
                >
                  {durations.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label={t('booking.special')}
                  multiline
                  rows={3}
                  placeholder={t('booking.specialPlaceholder')}
                  sx={inputSx}
                />
                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                  sx={{
                    bgcolor: GOLD,
                    color: INK,
                    borderRadius: 2,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#B89641' },
                  }}
                >
                  {t('booking.confirm')}
                </Button>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', textAlign: 'center', fontStyle: 'italic' }}
                >
                  🌸 {t('booking.policy')}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
