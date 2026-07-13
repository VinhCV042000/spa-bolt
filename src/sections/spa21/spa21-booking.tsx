import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { PEARL, SILVER, LAVENDER, CHARCOAL, SPA21_TREATMENTS } from 'src/sections/spa21/spa21-data';

export function Spa21Booking() {
  const { t } = useTranslate('spa21');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#FFF',
      }}
    >
      <Container component={MotionViewport} maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              color: LAVENDER,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            {t('booking.eyebrow')}
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: CHARCOAL,
              lineHeight: 1.2,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Đặt lịch
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              khám da
            </Box>
          </Typography>
          <Typography
            sx={{
              color: '#6A6A7A',
              maxWidth: 480,
              mx: 'auto',
              mt: 2,
              fontSize: 14,
            }}
          >
            {t('booking.description')}
          </Typography>
        </Box>

        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            p: { xs: 3, md: 5 },
            background: PEARL,
            borderRadius: 1,
            border: `1px solid ${SILVER}30`,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('booking.name')}
                variant="standard"
                InputProps={{
                  sx: { '&:before': { borderColor: `${SILVER}50` } },
                }}
                InputLabelProps={{
                  sx: { color: CHARCOAL, fontWeight: 500 },
                }}
                sx={{
                  '& .MuiInput-input': { color: CHARCOAL },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('booking.phone')}
                variant="standard"
                InputProps={{
                  sx: { '&:before': { borderColor: `${SILVER}50` } },
                }}
                InputLabelProps={{
                  sx: { color: CHARCOAL, fontWeight: 500 },
                }}
                sx={{
                  '& .MuiInput-input': { color: CHARCOAL },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label={t('booking.service')}
                variant="standard"
                defaultValue=""
                InputProps={{
                  sx: { '&:before': { borderColor: `${SILVER}50` } },
                }}
                InputLabelProps={{
                  sx: { color: CHARCOAL, fontWeight: 500 },
                }}
                sx={{
                  '& .MuiInput-input': { color: CHARCOAL },
                  '& .MuiSvgIcon-root': { color: CHARCOAL },
                }}
              >
                {SPA21_TREATMENTS.map((v) => (
                  <MenuItem key={v.code} value={v.code}>
                    {v.name} — {v.price}
                  </MenuItem>
                ))}
                <MenuItem value="consultation">Soi da & Tư vấn — Miễn phí</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('booking.date')}
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true, sx: { color: CHARCOAL, fontWeight: 500 } }}
                InputProps={{
                  sx: { '&:before': { borderColor: `${SILVER}50` } },
                }}
                sx={{
                  '& .MuiInput-input': { color: CHARCOAL },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('booking.notes')}
                multiline
                rows={2}
                variant="standard"
                InputProps={{
                  sx: { '&:before': { borderColor: `${SILVER}50` } },
                }}
                InputLabelProps={{
                  sx: { color: CHARCOAL, fontWeight: 500 },
                }}
                sx={{
                  '& .MuiInput-input': { color: CHARCOAL },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                size="large"
                startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                sx={{
                  bgcolor: CHARCOAL,
                  color: '#FFF',
                  borderRadius: 0,
                  py: 1.75,
                  fontWeight: 500,
                  letterSpacing: 0.3,
                  '&:hover': {
                    bgcolor: LAVENDER,
                    boxShadow: `0 8px 24px ${LAVENDER}30`,
                  },
                }}
              >
                {t('booking.submit')}
              </Button>
            </Grid>
          </Grid>

          {/* Contact info */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            spacing={4}
            sx={{ mt: 4, pt: 3, borderTop: `1px solid ${SILVER}20` }}
          >
            {[
              { icon: 'solar:phone-calling-bold-duotone', text: 'Hotline: 1900 8888' },
              { icon: 'solar:map-point-bold-duotone', text: '3 chi nhánh HN, HCM, ĐN' },
              { icon: 'solar:clock-circle-bold-duotone', text: '8:00 - 20:00 daily' },
            ].map((item) => (
              <Stack key={item.text} direction="row" spacing={1} alignItems="center">
                <Iconify icon={item.icon} sx={{ color: LAVENDER, fontSize: 18 }} />
                <Typography sx={{ color: CHARCOAL, fontSize: 13 }}>{item.text}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
