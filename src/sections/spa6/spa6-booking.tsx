import type { Spa6Lang } from 'src/sections/spa6/spa6-data';

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

import { SPA6_HOW_HEAR, SPA6_BOOKING_CONCERNS } from 'src/sections/spa6/spa6-data';

// ----------------------------------------------------------------------

const TERRACOTTA = '#C1440E';
const FOREST = '#2D5016';
const CREAM = '#F9F4ED';

const STEPS = [
  {
    stepKey: 'booking.step1',
    descKey: 'booking.step1Desc',
    icon: 'solar:user-speak-bold-duotone',
    color: TERRACOTTA,
  },
  {
    stepKey: 'booking.step2',
    descKey: 'booking.step2Desc',
    icon: 'solar:document-bold-duotone',
    color: FOREST,
  },
  {
    stepKey: 'booking.step3',
    descKey: 'booking.step3Desc',
    icon: 'solar:heart-pulse-bold-duotone',
    color: '#8B4513',
  },
] as const;

export function Spa6Booking() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;
  const concerns = SPA6_BOOKING_CONCERNS[lang];
  const howHear = SPA6_HOW_HEAR[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' },
      '&:hover fieldset': { borderColor: TERRACOTTA },
      '&.Mui-focused fieldset': { borderColor: TERRACOTTA },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: TERRACOTTA },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#1C1008' }}>
      <Container component={MotionViewport}>
        {/* Steps */}
        <Grid container spacing={3} sx={{ mb: { xs: 6, md: 10 } }}>
          {STEPS.map(({ stepKey, descKey, icon, color }, i) => (
            <Grid key={stepKey} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'rgba(249,244,237,0.04)',
                  border: `1px solid rgba(249,244,237,0.08)`,
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    bgcolor: `${color}20`,
                    border: `1px solid ${color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon={icon} width={24} sx={{ color }} />
                </Box>
                <Stack spacing={0.25}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="caption"
                      sx={{ color, fontWeight: 800, fontSize: 10, letterSpacing: 1 }}
                    >
                      0{i + 1}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: CREAM, fontWeight: 700 }}>
                      {t(stepKey)}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.45)' }}>
                    {t(descKey)}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Main form area */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Left — header */}
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: CREAM, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: TERRACOTTA }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(249,244,237,0.55)', lineHeight: 1.8 }}
                  >
                    {t('booking.description')}
                  </Typography>
                </Stack>

                {/* WhatsApp CTA */}
                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="logos:whatsapp-icon" width={22} />}
                  sx={{
                    bgcolor: '#25D366',
                    color: 'white',
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#20B858' },
                  }}
                >
                  {t('booking.whatsapp')}
                </Button>

                {/* Divider with OR */}
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ flex: 1, height: 1, bgcolor: 'rgba(249,244,237,0.1)' }} />
                  <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.3)' }}>
                    OR
                  </Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: 'rgba(249,244,237,0.1)' }} />
                </Stack>

                {/* Call block */}
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${TERRACOTTA}20`,
                      border: `1px solid ${TERRACOTTA}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon="solar:phone-bold-duotone"
                      width={22}
                      sx={{ color: TERRACOTTA }}
                    />
                  </Box>
                  <Stack>
                    <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.4)' }}>
                      Hotline
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: CREAM, fontWeight: 700 }}>
                      0901 234 567
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
                bgcolor: CREAM,
              }}
            >
              <Stack spacing={2.5}>
                <TextField fullWidth label={t('booking.name')} sx={inputSx} />
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
                  label={t('booking.concern')}
                  defaultValue=""
                  sx={inputSx}
                >
                  {concerns.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      fullWidth
                      label={t('booking.preferredDate')}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      select
                      label={t('booking.howHear')}
                      defaultValue=""
                      sx={inputSx}
                    >
                      {howHear.map((h) => (
                        <MenuItem key={h} value={h}>
                          {h}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                  sx={{
                    bgcolor: TERRACOTTA,
                    color: CREAM,
                    borderRadius: 3,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#A83A0C' },
                  }}
                >
                  {t('booking.submit')}
                </Button>

                <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
                  🌿{' '}
                  {
                    (
                      {
                        en: 'Free · No commitment · Response within 2 hours',
                        vi: 'Miễn phí · Không cam kết · Phản hồi trong 2 giờ',
                        fr: 'Gratuit · Sans engagement · Réponse sous 2 heures',
                        cn: '免费 · 无需承诺 · 2 小时内回复',
                        ar: 'مجاني · دون التزام · رد خلال ساعتين',
                      } as const
                    )[lang]
                  }
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
