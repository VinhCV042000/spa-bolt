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
  SAND,
  NIGHT,
  TERRA,
  SAFFRON,
  SPA16_IMAGES,
  SPA16_RITUALS,
} from 'src/sections/spa16/spa16-data';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: SAND,
    borderRadius: 0,
    '& fieldset': { borderColor: `${SAFFRON}55` },
    '&:hover fieldset': { borderColor: SAFFRON },
    '&.Mui-focused fieldset': { borderColor: TERRA },
  },
  '& .MuiInputLabel-root': { color: `${SAND}99` },
  '& .MuiInputLabel-root.Mui-focused': { color: TERRA },
  '& .MuiSvgIcon-root': { color: SAFFRON },
};

export function Spa16Booking() {
  const { t } = useTranslate('spa16');
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 16 },
        bgcolor: NIGHT,
        color: SAND,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={SPA16_IMAGES.arch}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.15,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${NIGHT}f0 0%, ${NIGHT}ee 100%)`,
        }}
      />
      <Container component={MotionViewport} maxWidth="md" sx={{ position: 'relative' }}>
        <Stack spacing={3} sx={{ textAlign: 'center', mb: 6, alignItems: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: SAFFRON, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              {t('booking.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 58 },
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              {t('booking.title')}{' '}
              <Box component="em" sx={{ color: TERRA }}>
                {t('booking.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: `${SAND}99`, maxWidth: 540, lineHeight: 1.9 }}>
              {t('booking.description')}
            </Typography>
          </Box>
        </Stack>

        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            p: { xs: 3, md: 5 },
            bgcolor: `${SAND}08`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${SAFFRON}33`,
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
                {SPA16_RITUALS.map((r) => (
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
                  startIcon={<Iconify icon="solar:fire-bold-duotone" />}
                  sx={{
                    bgcolor: TERRA,
                    color: SAND,
                    borderRadius: 0,
                    px: 5,
                    py: 1.75,
                    fontWeight: 700,
                    letterSpacing: 1,
                    '&:hover': { bgcolor: '#a84a31' },
                  }}
                >
                  {t('booking.submit')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:phone-bold" />}
                  sx={{
                    borderColor: SAFFRON,
                    color: SAFFRON,
                    borderRadius: 0,
                    px: 5,
                    py: 1.75,
                    fontWeight: 700,
                    letterSpacing: 1,
                    '&:hover': { borderColor: SAFFRON, bgcolor: `${SAFFRON}1a` },
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
            <Box sx={{ width: { sm: '1px' }, height: { sm: 32 }, bgcolor: `${SAFFRON}33` }} />
          }
          sx={{ mt: 6, textAlign: 'center' }}
        >
          {[
            { i: 'solar:map-point-bold-duotone', l: '12 Trần Hưng Đạo, Hội An' },
            { i: 'solar:phone-bold-duotone', l: '+84 88 16 16 16' },
            { i: 'solar:clock-circle-bold-duotone', l: '10:00 – 23:00 mỗi ngày' },
          ].map((c) => (
            <Stack
              key={c.l}
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon={c.i} width={20} sx={{ color: SAFFRON }} />
              <Typography sx={{ color: `${SAND}cc`, fontSize: 14 }}>{c.l}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
