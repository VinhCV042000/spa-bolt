import type { Spa9Lang } from 'src/sections/spa9/spa9-data';

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

import { SPA9_DAY_PASS_OPTIONS } from 'src/sections/spa9/spa9-data';

// ----------------------------------------------------------------------

const AZURE = '#1B6CA8';
const SUN = '#F5A623';
const DARK = '#0A2840';
const SAND = '#FDF5E6';

export function Spa9Booking() {
  const { t, currentLang } = useTranslate('spa9');
  const lang = currentLang.value as Spa9Lang;
  const packages = SPA9_DAY_PASS_OPTIONS[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      color: SAND,
      bgcolor: 'rgba(253,245,230,0.04)',
      '& fieldset': { borderColor: 'rgba(253,245,230,0.15)' },
      '&:hover fieldset': { borderColor: 'rgba(245,166,35,0.4)' },
      '&.Mui-focused fieldset': { borderColor: SUN },
    },
    '& .MuiInputLabel-root': { color: 'rgba(253,245,230,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: SUN },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: DARK }}>
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left — info */}
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: SUN, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: SAND, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: SUN }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(253,245,230,0.55)', lineHeight: 1.8 }}
                  >
                    {t('booking.description')}
                  </Typography>
                </Stack>

                {/* Mediterranean landscape image */}
                <Box sx={{ borderRadius: 4, overflow: 'hidden', height: 220 }}>
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80"
                    alt="Mediterranean"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.6) saturate(1.2)',
                    }}
                  />
                </Box>

                {/* Hotline */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: `${SUN}20`,
                      border: `1px solid ${SUN}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="solar:phone-bold-duotone" width={20} sx={{ color: SUN }} />
                  </Box>
                  <Stack>
                    <Typography variant="caption" sx={{ color: 'rgba(253,245,230,0.4)' }}>
                      {t('booking.callLine')}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: SAND, fontWeight: 700 }}>
                      1800 1234
                    </Typography>
                  </Stack>
                </Stack>

                {/* Features */}
                <Stack spacing={1}>
                  {[
                    {
                      icon: 'solar:lock-bold-duotone',
                      text: (
                        {
                          en: 'Secure payment',
                          vi: 'Thanh toán an toàn',
                          fr: 'Paiement sécurisé',
                          cn: '安全支付',
                          ar: 'دفع آمن',
                        } as const
                      )[lang],
                    },
                    {
                      icon: 'solar:refresh-bold-duotone',
                      text: (
                        {
                          en: 'Free cancellation before 24h',
                          vi: 'Hủy miễn phí trước 24h',
                          fr: 'Annulation gratuite avant 24 h',
                          cn: '24 小时前免费取消',
                          ar: 'إلغاء مجاني قبل 24 ساعة',
                        } as const
                      )[lang],
                    },
                    {
                      icon: 'solar:shield-bold-duotone',
                      text: (
                        {
                          en: 'Quality guaranteed',
                          vi: 'Đảm bảo chất lượng',
                          fr: 'Qualité garantie',
                          cn: '品质保证',
                          ar: 'جودة مضمونة',
                        } as const
                      )[lang],
                    },
                  ].map((f) => (
                    <Stack key={f.text} direction="row" spacing={1.5} alignItems="center">
                      <Iconify icon={f.icon} width={16} sx={{ color: AZURE }} />
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(253,245,230,0.5)', fontSize: 13 }}
                      >
                        {f.text}
                      </Typography>
                    </Stack>
                  ))}
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
                border: `1px solid rgba(253,245,230,0.08)`,
                bgcolor: '#0E2D45',
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
                      {['1', '2', '3', '4', '5+'].map((n) => (
                        <MenuItem key={n} value={n}>
                          {n}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
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
                      label={t('booking.package')}
                      select
                      defaultValue=""
                      sx={inputSx}
                    >
                      {packages.map((p) => (
                        <MenuItem key={p} value={p}>
                          {p}
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
                  startIcon={<Iconify icon="solar:sun-bold-duotone" />}
                  sx={{
                    bgcolor: SUN,
                    color: DARK,
                    borderRadius: 3,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#E09517' },
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
