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

import { INK, TEA, RICE, JADE, SPA19_THERAPIES } from 'src/sections/spa19/spa19-data';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: INK,
    background: '#FFF',
    borderRadius: 0,
    '& fieldset': { borderColor: `${JADE}40` },
    '&:hover fieldset': { borderColor: JADE },
    '&.Mui-focused fieldset': { borderColor: TEA },
  },
  '& .MuiInputLabel-root': { color: '#6A6A6A' },
  '& .MuiInputLabel-root.Mui-focused': { color: TEA },
  '& .MuiSvgIcon-root': { color: JADE },
};

export function Spa19Booking() {
  const { t } = useTranslate('spa19');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: RICE,
      }}
    >
      <Container component={MotionViewport} maxWidth="md">
        <Stack spacing={2} sx={{ textAlign: 'center', mb: 6, alignItems: 'center' }}>
          <Typography
            sx={{
              color: TEA,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {t('booking.eyebrow')}
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: { xs: 32, md: 48 },
              fontWeight: 300,
              color: INK,
              lineHeight: 1.2,
            }}
          >
            {t('booking.title')}{' '}
            <Box component="span" sx={{ color: JADE }}>
              {t('booking.titleHighlight')}
            </Box>
          </Typography>
          <Typography sx={{ color: '#6A6A6A', maxWidth: 480, lineHeight: 1.8 }}>
            {t('booking.description')}
          </Typography>
        </Stack>

        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            p: { xs: 3, md: 5 },
            background: '#FFF',
            border: `1px solid ${JADE}20`,
            borderBottom: `4px solid ${TEA}`,
            boxShadow: `0 8px 40px ${INK}08`,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t('booking.name')} variant="outlined" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label={t('booking.phone')} variant="outlined" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('booking.email')}
                type="email"
                variant="outlined"
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label={t('booking.therapy')}
                defaultValue=""
                variant="outlined"
                sx={fieldSx}
              >
                {SPA19_THERAPIES.map((v) => (
                  <MenuItem key={v.name} value={v.name}>
                    {v.name} — {v.duration}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label={t('booking.date')}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label={t('booking.time')}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label={t('booking.notes')}
                variant="outlined"
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ pt: 1 }}
              >
                <Button
                  size="large"
                  startIcon={<Iconify icon="solar:tea-cup-bold-duotone" />}
                  sx={{
                    bgcolor: JADE,
                    color: RICE,
                    borderRadius: 0,
                    px: 5,
                    py: 1.75,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    '&:hover': { bgcolor: '#4a7560' },
                  }}
                >
                  {t('booking.submit')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:phone-bold-duotone" />}
                  sx={{
                    borderColor: `${TEA}60`,
                    color: TEA,
                    borderRadius: 0,
                    px: 5,
                    py: 1.75,
                    fontWeight: 600,
                    '&:hover': { borderColor: TEA, bgcolor: `${TEA}0a` },
                  }}
                >
                  {t('booking.call')}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          justifyContent="center"
          divider={<Box sx={{ width: { sm: '1px' }, height: { sm: 32 }, bgcolor: `${JADE}25` }} />}
          sx={{ mt: 6, textAlign: 'center' }}
        >
          {[
            { i: 'solar:map-point-bold-duotone', l: '168 Bạch Đằng, Quận 1, TP.HCM' },
            { i: 'solar:phone-bold-duotone', l: '+84 28 38 38 88' },
            { i: 'solar:clock-circle-bold-duotone', l: '8:00 – 20:00 mỗi ngày' },
          ].map((c) => (
            <Stack
              key={c.l}
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon={c.i} width={20} sx={{ color: TEA }} />
              <Typography sx={{ color: '#6A6A6A', fontSize: 13 }}>{c.l}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
