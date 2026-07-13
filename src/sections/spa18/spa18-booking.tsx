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

import { SAND, LOTUS, JUNGLE, BAMBOO, SPA18_RITUALS } from 'src/sections/spa18/spa18-data';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: SAND,
    background: 'rgba(0,0,0,0.3)',
    borderRadius: 0,
    '& fieldset': { borderColor: `${BAMBOO}40` },
    '&:hover fieldset': { borderColor: BAMBOO },
    '&.Mui-focused fieldset': { borderColor: LOTUS },
  },
  '& .MuiInputLabel-root': { color: 'rgba(253,246,227,0.65)' },
  '& .MuiInputLabel-root.Mui-focused': { color: LOTUS },
  '& .MuiSvgIcon-root': { color: BAMBOO },
};

export function Spa18Booking() {
  const { t } = useTranslate('spa18');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${JUNGLE} 0%, #0D2818 100%)`,
      }}
    >
      <Container component={MotionViewport} maxWidth="md">
        <Stack spacing={2} sx={{ textAlign: 'center', mb: 6, alignItems: 'center' }}>
          <Typography
            sx={{
              color: LOTUS,
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
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: 32, md: 48 },
              fontWeight: 300,
              color: SAND,
              lineHeight: 1.2,
            }}
          >
            {t('booking.title')}{' '}
            <Box component="span" sx={{ color: BAMBOO }}>
              {t('booking.titleHighlight')}
            </Box>
          </Typography>
          <Typography sx={{ color: 'rgba(253,246,227,0.65)', maxWidth: 480, lineHeight: 1.8 }}>
            {t('booking.description')}
          </Typography>
        </Stack>

        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            p: { xs: 3, md: 5 },
            background: 'rgba(0,0,0,0.35)',
            border: `1px solid ${BAMBOO}25`,
            borderLeft: `4px solid ${LOTUS}`,
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
                label={t('booking.ritual')}
                defaultValue=""
                variant="outlined"
                sx={fieldSx}
              >
                {SPA18_RITUALS.map((r) => (
                  <MenuItem key={r.name} value={r.name}>
                    {r.name} — {r.duration}
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
                  startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
                  sx={{
                    bgcolor: BAMBOO,
                    color: SAND,
                    borderRadius: 0,
                    px: 5,
                    py: 1.75,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    '&:hover': { bgcolor: '#3d9268' },
                  }}
                >
                  {t('booking.submit')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:phone-bold-duotone" />}
                  sx={{
                    borderColor: `${LOTUS}60`,
                    color: LOTUS,
                    borderRadius: 0,
                    px: 5,
                    py: 1.75,
                    fontWeight: 600,
                    '&:hover': { borderColor: LOTUS, bgcolor: `${LOTUS}12` },
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
          divider={
            <Box sx={{ width: { sm: '1px' }, height: { sm: 32 }, bgcolor: `${BAMBOO}25` }} />
          }
          sx={{ mt: 6, textAlign: 'center' }}
        >
          {[
            { i: 'solar:map-point-bold-duotone', l: '88 Nguyễn Huệ, Quận 1, TP.HCM' },
            { i: 'solar:phone-bold-duotone', l: '+84 28 38 38 38' },
            { i: 'solar:clock-circle-bold-duotone', l: '9:00 – 22:00 mỗi ngày' },
          ].map((c) => (
            <Stack
              key={c.l}
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon={c.i} width={20} sx={{ color: LOTUS }} />
              <Typography sx={{ color: 'rgba(253,246,227,0.75)', fontSize: 13 }}>{c.l}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
