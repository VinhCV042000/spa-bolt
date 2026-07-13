import type { Spa4Lang } from 'src/sections/spa4/spa4-data';

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

import { SPA4_IMAGES, SPA4_BOOKING_SERVICES } from 'src/sections/spa4/spa4-data';

// ----------------------------------------------------------------------

const JADE_GREEN = '#1B4332';
const ROSE_GOLD = '#C9956C';

const TIME_SLOTS = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
];

export function Spa4Booking() {
  const { t, currentLang } = useTranslate('spa4');
  const lang = currentLang.value as Spa4Lang;
  const services = SPA4_BOOKING_SERVICES[lang];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Left image */}
          <Grid item xs={12} md={5}>
            <Box
              component={m.div}
              variants={varFade({ distance: 40 }).inLeft}
              sx={{ position: 'relative' }}
            >
              <Box
                sx={{
                  borderRadius: 6,
                  overflow: 'hidden',
                  height: { xs: 300, md: 520 },
                  boxShadow: '0 32px 80px rgba(27,67,50,0.15)',
                }}
              >
                <Box
                  component="img"
                  src={SPA4_IMAGES.booking}
                  alt={t('booking.label')}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  bgcolor: JADE_GREEN,
                  color: 'white',
                  borderRadius: 4,
                  p: 3,
                  maxWidth: 220,
                  boxShadow: '0 16px 40px rgba(27,67,50,0.3)',
                }}
              >
                <Iconify
                  icon="solar:shield-check-bold-duotone"
                  width={32}
                  sx={{ color: ROSE_GOLD, mb: 1 }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {t('booking.refund')}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.5 }}>
                  {t('booking.refundDesc')}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right form */}
          <Grid item xs={12} md={7}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inRight}>
              <Stack spacing={1} sx={{ mb: 5 }}>
                <Typography
                  variant="overline"
                  sx={{ color: ROSE_GOLD, letterSpacing: 3, fontWeight: 700 }}
                >
                  {t('booking.label')}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: JADE_GREEN }}>
                  {t('booking.title')}
                  <br />
                  {t('booking.titleHighlight')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {t('booking.description')}
                </Typography>
              </Stack>

              <Stack spacing={2.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.fullName')}
                      placeholder={t('booking.fullNamePlaceholder')}
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="solar:user-bold-duotone"
                            sx={{ mr: 1, color: 'text.disabled' }}
                          />
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.phone')}
                      placeholder={t('booking.phonePlaceholder')}
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="solar:phone-bold-duotone"
                            sx={{ mr: 1, color: 'text.disabled' }}
                          />
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  select
                  label={t('booking.selectTreatment')}
                  defaultValue=""
                  InputProps={{
                    startAdornment: (
                      <Iconify
                        icon="solar:leaf-bold-duotone"
                        sx={{ mr: 1, color: 'text.disabled' }}
                      />
                    ),
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                >
                  {services.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.appointmentDate')}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="solar:calendar-bold-duotone"
                            sx={{ mr: 1, color: 'text.disabled' }}
                          />
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label={t('booking.timeSlot')}
                      defaultValue=""
                      InputProps={{
                        startAdornment: (
                          <Iconify
                            icon="solar:clock-bold-duotone"
                            sx={{ mr: 1, color: 'text.disabled' }}
                          />
                        ),
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    >
                      {TIME_SLOTS.map((slot) => (
                        <MenuItem key={slot} value={slot}>
                          {slot}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label={t('booking.specialRequest')}
                  placeholder={t('booking.specialRequestPlaceholder')}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                  sx={{
                    bgcolor: JADE_GREEN,
                    borderRadius: 3,
                    py: 1.75,
                    fontSize: 16,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#154428' },
                  }}
                >
                  {t('booking.confirmBooking')}
                </Button>

                <Stack direction="row" spacing={3} justifyContent="center" pt={1}>
                  {[
                    { icon: 'solar:lock-bold-duotone', labelKey: 'booking.badge1' },
                    { icon: 'solar:clock-circle-bold-duotone', labelKey: 'booking.badge2' },
                    { icon: 'solar:shield-check-bold-duotone', labelKey: 'booking.badge3' },
                  ].map((badge) => (
                    <Stack key={badge.labelKey} alignItems="center" spacing={0.5}>
                      <Iconify icon={badge.icon} width={20} sx={{ color: ROSE_GOLD }} />
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.disabled', textAlign: 'center' }}
                      >
                        {t(badge.labelKey)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
