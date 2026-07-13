import type { Spa5Lang } from 'src/sections/spa5/spa5-data';

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

import { SPA5_IMAGES, SPA5_BOOKING_RITUALS } from 'src/sections/spa5/spa5-data';

// ----------------------------------------------------------------------

const NAVY = '#0A0A2E';
const CHAMPAGNE = '#C9A84C';
const CREAM = '#FAF7F2';

export function Spa5Booking() {
  const { t, currentLang } = useTranslate('spa5');
  const lang = currentLang.value as Spa5Lang;
  const rituals = SPA5_BOOKING_RITUALS[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      bgcolor: 'rgba(250,247,242,0.04)',
      color: CREAM,
      '& fieldset': { borderColor: 'rgba(201,168,76,0.25)' },
      '&:hover fieldset': { borderColor: 'rgba(201,168,76,0.5)' },
      '&.Mui-focused fieldset': { borderColor: CHAMPAGNE },
    },
    '& .MuiInputLabel-root': { color: 'rgba(250,247,242,0.45)' },
    '& .MuiInputLabel-root.Mui-focused': { color: CHAMPAGNE },
    '& .MuiSelect-icon': { color: 'rgba(250,247,242,0.45)' },
    '& .MuiMenuItem-root': { color: NAVY },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: NAVY }}>
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 4, md: 10 }} alignItems="flex-start">
          {/* Left — info */}
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: CREAM, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: CHAMPAGNE }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(250,247,242,0.55)', lineHeight: 1.8 }}
                  >
                    {t('booking.description')}
                  </Typography>
                </Stack>

                {/* Image */}
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: 240,
                    position: 'relative',
                    border: `1px solid rgba(201,168,76,0.2)`,
                  }}
                >
                  <Box
                    component="img"
                    src={SPA5_IMAGES.booking}
                    alt="Lumière Balnéo"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.7)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,10,46,0.7), transparent 50%)',
                    }}
                  />
                  <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 800 }}>
                      {t('booking.privateExperience')}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(250,247,242,0.65)' }}>
                      {t('booking.privateDesc')}
                    </Typography>
                  </Box>
                </Box>

                {/* Phone CTA */}
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: 'rgba(201,168,76,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid rgba(201,168,76,0.3)`,
                    }}
                  >
                    <Iconify icon="solar:phone-bold-duotone" width={22} sx={{ color: CHAMPAGNE }} />
                  </Box>
                  <Stack>
                    <Typography variant="caption" sx={{ color: 'rgba(250,247,242,0.45)' }}>
                      {t('booking.callUs')}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: CREAM, fontWeight: 700 }}>
                      1900 6868
                    </Typography>
                  </Stack>
                </Stack>

                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(250,247,242,0.35)', fontStyle: 'italic' }}
                >
                  * {t('booking.guarantee')}
                </Typography>
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
                border: `1px solid rgba(201,168,76,0.2)`,
                bgcolor: 'rgba(201,168,76,0.04)',
              }}
            >
              <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.firstName')} sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.lastName')} sx={inputSx} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.email')} type="email" sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.phone')} sx={inputSx} />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  select
                  label={t('booking.selectRitual')}
                  defaultValue=""
                  sx={inputSx}
                >
                  {rituals.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </TextField>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      fullWidth
                      label={t('booking.date')}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      select
                      label={t('booking.guests')}
                      defaultValue="1"
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

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label={t('booking.notes')}
                  placeholder={t('booking.notesPlaceholder')}
                  sx={inputSx}
                />

                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                  sx={{
                    bgcolor: CHAMPAGNE,
                    color: NAVY,
                    borderRadius: 2,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    letterSpacing: 0.5,
                    '&:hover': { bgcolor: '#B8963D' },
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
