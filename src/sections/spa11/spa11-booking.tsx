import type { Spa11Lang } from 'src/sections/spa11/spa11-data';

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

import {
  TERRACOTTA,
  ARGAN_GOLD,
  CREAM_WARM,
  SPA11_PRODUCTS,
  SPA11_PACKAGES,
} from 'src/sections/spa11/spa11-data';

export function Spa11Booking() {
  const { t, currentLang } = useTranslate('spa11');
  const lang = currentLang.value as Spa11Lang;
  const packages = SPA11_PACKAGES[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      color: '#1E0C05',
      '& fieldset': { borderColor: 'rgba(30,12,5,0.15)' },
      '&:hover fieldset': { borderColor: TERRACOTTA },
      '&.Mui-focused fieldset': { borderColor: TERRACOTTA },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: TERRACOTTA },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM_WARM }}>
      <Container component={MotionViewport}>
        {/* Products */}
        <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ mb: 10 }}>
          <Stack spacing={2} alignItems="center" sx={{ mb: 5, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('products.label')}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {t('products.title')}{' '}
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {t('products.titleHighlight')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('products.description')}
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {SPA11_PRODUCTS.map((p) => (
              <Grid key={p.name.en} item xs={12} sm={6} md={3}>
                <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: 'white',
                      border: '1px solid rgba(194,75,46,0.12)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: TERRACOTTA,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 16px 40px rgba(194,75,46,0.1)`,
                      },
                    }}
                  >
                    <Stack spacing={1.5}>
                      {p.badge && (
                        <Box
                          sx={{
                            display: 'inline-flex',
                            width: 'fit-content',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1.5,
                            bgcolor: `${ARGAN_GOLD}18`,
                            border: `1px solid ${ARGAN_GOLD}30`,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: ARGAN_GOLD, fontWeight: 700, fontSize: 10 }}
                          >
                            {p.badge[lang]}
                          </Typography>
                        </Box>
                      )}
                      <Typography
                        variant="subtitle2"
                        sx={{ color: '#1E0C05', fontWeight: 800, lineHeight: 1.3 }}
                      >
                        {p.name[lang]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.disabled', fontStyle: 'italic' }}
                      >
                        {p.origin[lang]}
                      </Typography>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" sx={{ color: TERRACOTTA, fontWeight: 800 }}>
                          {p.price[lang]}
                        </Typography>
                        <Button
                          size="small"
                          sx={{
                            bgcolor: TERRACOTTA,
                            color: CREAM_WARM,
                            borderRadius: 1.5,
                            px: 1.5,
                            fontSize: 11,
                            fontWeight: 700,
                            '&:hover': { bgcolor: '#A33D24' },
                          }}
                        >
                          {t('products.shopNow')}
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Booking */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={3}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: TERRACOTTA }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(194,75,46,0.05)',
                    border: '1px solid rgba(194,75,46,0.15)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 28,
                      letterSpacing: 4,
                      color: TERRACOTTA,
                      fontWeight: 300,
                      mb: 1,
                    }}
                  >
                    الحمام
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, fontStyle: 'italic' }}
                  >
                    &ldquo;Hammam — không gian thiêng liêng của người Morocco, nơi thân xác và tâm
                    hồn được thanh lọc cùng nhau.&rdquo;
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Iconify
                    icon="solar:info-circle-bold-duotone"
                    width={16}
                    sx={{ color: ARGAN_GOLD, flexShrink: 0, mt: 0.2 }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.disabled', fontStyle: 'italic', lineHeight: 1.6 }}
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
                bgcolor: 'white',
                boxShadow: '0 8px 40px rgba(194,75,46,0.08)',
                border: '1px solid rgba(194,75,46,0.12)',
              }}
            >
              <Stack spacing={2.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.name')} sx={inputSx} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label={t('booking.phone')} sx={inputSx} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7}>
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
                  <Grid item xs={12} sm={5}>
                    <TextField
                      fullWidth
                      label={t('booking.date')}
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.time')}
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.gender')}
                      select
                      defaultValue=""
                      sx={inputSx}
                    >
                      {(
                        {
                          en: ['Women', 'Men', 'Couples (private)'],
                          vi: ['Nữ', 'Nam', 'Cặp đôi (riêng tư)'],
                          fr: ['Femmes', 'Hommes', 'Couples (privé)'],
                          cn: ['女士', '男士', '情侣（私密）'],
                          ar: ['نساء', 'رجال', 'أزواج (خاص)'],
                        } as const
                      )[lang].map((g) => (
                        <MenuItem key={g} value={g}>
                          {g}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <TextField fullWidth label={t('booking.notes')} multiline rows={2} sx={inputSx} />
                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:bath-bold-duotone" />}
                  sx={{
                    bgcolor: TERRACOTTA,
                    color: CREAM_WARM,
                    borderRadius: 2,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#A33D24' },
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
