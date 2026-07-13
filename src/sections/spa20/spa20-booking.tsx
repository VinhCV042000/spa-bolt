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

import { GOLD, ROSE_GOLD, DEEP_PLUM, SPA20_TREATMENTS } from 'src/sections/spa20/spa20-data';

export function Spa20Booking() {
  const { t } = useTranslate('spa20');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: DEEP_PLUM,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ROSE_GOLD}15 0%, transparent 70%)`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-5%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD}10 0%, transparent 70%)`,
        }}
      />

      <Container component={MotionViewport} maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              color: ROSE_GOLD,
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
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 400,
              color: '#FFF',
              lineHeight: 1.2,
            }}
          >
            Đặt lịch
            <Box component="span" sx={{ color: ROSE_GOLD }}>
              {' '}
              tư vấn
            </Box>
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 500,
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
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 4,
            border: `1px solid rgba(255,255,255,0.1)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('booking.name')}
                variant="filled"
                InputProps={{
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  },
                }}
                InputLabelProps={{
                  sx: { color: 'rgba(255,255,255,0.6)' },
                }}
                sx={{
                  '& .MuiFilledInput-input': { color: '#FFF' },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('booking.phone')}
                variant="filled"
                InputProps={{
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  },
                }}
                InputLabelProps={{
                  sx: { color: 'rgba(255,255,255,0.6)' },
                }}
                sx={{
                  '& .MuiFilledInput-input': { color: '#FFF' },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label={t('booking.service')}
                variant="filled"
                defaultValue=""
                InputProps={{
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  },
                }}
                InputLabelProps={{
                  sx: { color: 'rgba(255,255,255,0.6)' },
                }}
                sx={{
                  '& .MuiFilledInput-input': { color: '#FFF' },
                  '& .MuiSvgIcon-root': { color: 'rgba(255,255,255,0.6)' },
                }}
              >
                {SPA20_TREATMENTS.map((v) => (
                  <MenuItem key={v.code} value={v.code}>
                    {v.name} — {v.price}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('booking.date')}
                type="date"
                variant="filled"
                InputLabelProps={{ shrink: true, sx: { color: 'rgba(255,255,255,0.6)' } }}
                InputProps={{
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  },
                }}
                sx={{
                  '& .MuiFilledInput-input': { color: '#FFF' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('booking.notes')}
                multiline
                rows={3}
                variant="filled"
                InputProps={{
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  },
                }}
                InputLabelProps={{
                  sx: { color: 'rgba(255,255,255,0.6)' },
                }}
                sx={{
                  '& .MuiFilledInput-input': { color: '#FFF' },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                size="large"
                startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                sx={{
                  background: `linear-gradient(135deg, ${ROSE_GOLD}, ${GOLD})`,
                  color: '#FFF',
                  borderRadius: 50,
                  py: 1.75,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  boxShadow: `0 8px 24px ${ROSE_GOLD}40`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${GOLD}, ${ROSE_GOLD})`,
                    boxShadow: `0 12px 32px ${ROSE_GOLD}50`,
                  },
                }}
              >
                {t('booking.submit')}
              </Button>
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            spacing={4}
            sx={{ mt: 4 }}
          >
            {[
              { icon: 'solar:phone-calling-bold-duotone', text: 'Hotline: 1900 9999' },
              { icon: 'solar:letter-bold-duotone', text: 'hello@glow.vn' },
              { icon: 'solar:clock-circle-bold-duotone', text: '8:00 - 21:00 daily' },
            ].map((item) => (
              <Stack key={item.text} direction="row" spacing={1} alignItems="center">
                <Iconify icon={item.icon} sx={{ color: ROSE_GOLD, fontSize: 20 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                  {item.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
