import type { Spa14Lang } from 'src/sections/spa14/spa14-data';

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
  GARNET,
  ANTIQUE_GOLD,
  SPA14_IMAGES,
  IMPERIAL_CREAM,
  SPA14_TREATMENTS,
} from 'src/sections/spa14/spa14-data';

export function Spa14Booking() {
  const { t, currentLang } = useTranslate('spa14');
  const lang = currentLang.value as Spa14Lang;

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      color: '#2A0A12',
      '& fieldset': { borderColor: 'rgba(139,26,47,0.2)' },
      '&:hover fieldset': { borderColor: GARNET },
      '&.Mui-focused fieldset': { borderColor: GARNET },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: GARNET },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#1A0A12' }}>
      <Container component={MotionViewport}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={4}>
                <Stack spacing={2}>
                  <Typography
                    variant="overline"
                    sx={{ color: ANTIQUE_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                  >
                    {t('booking.label')}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 800, color: IMPERIAL_CREAM, lineHeight: 1.15 }}
                  >
                    {t('booking.title')}{' '}
                    <Box component="span" sx={{ color: ANTIQUE_GOLD }}>
                      {t('booking.titleHighlight')}
                    </Box>
                  </Typography>
                </Stack>

                <Box sx={{ borderRadius: 4, overflow: 'hidden', height: 220 }}>
                  <Box
                    component="img"
                    src={SPA14_IMAGES.wine}
                    alt="Vinotherapy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.7) sepia(0.2)',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid rgba(201,165,90,0.2)`,
                    bgcolor: 'rgba(201,165,90,0.04)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 22,
                      color: ANTIQUE_GOLD,
                      fontWeight: 300,
                      letterSpacing: 4,
                      mb: 1,
                    }}
                  >
                    Kaiserlich & Königlich
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(250,240,230,0.5)', lineHeight: 1.7, fontStyle: 'italic' }}
                  >
                    &ldquo;Imperial & Royal — mỗi khách hàng Imperial Vienna được phục vụ như một vị
                    khách của Hoàng đế.&rdquo;
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(250,240,230,0.45)', fontStyle: 'italic', fontSize: 12 }}
                  >
                    {t('booking.conciergeNote')}
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
                bgcolor: IMPERIAL_CREAM,
                boxShadow: `0 8px 60px rgba(139,26,47,0.2)`,
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
                  {SPA14_TREATMENTS.map((tr) => (
                    <MenuItem key={tr.name.en} value={tr.name[lang]}>
                      {tr.name[lang]}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label={t('booking.notes')}
                  multiline
                  rows={3}
                  placeholder={
                    (
                      {
                        en: 'Special occasion, private requests...',
                        vi: 'Kỷ niệm đặc biệt, yêu cầu riêng tư...',
                        fr: 'Occasion spéciale, demandes privées...',
                        cn: '特殊纪念日、私人请求…',
                        ar: 'مناسبة خاصة، طلبات خاصة...',
                      } as const
                    )[lang]
                  }
                  sx={inputSx}
                />
                <Button
                  fullWidth
                  size="large"
                  startIcon={<Iconify icon="solar:crown-bold-duotone" />}
                  sx={{
                    bgcolor: GARNET,
                    color: IMPERIAL_CREAM,
                    borderRadius: 2,
                    py: 1.75,
                    fontWeight: 800,
                    fontSize: 15,
                    '&:hover': { bgcolor: '#701525' },
                  }}
                >
                  {t('booking.confirm')}
                </Button>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.disabled',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    display: 'block',
                  }}
                >
                  👑 {t('booking.conciergeNote')}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
