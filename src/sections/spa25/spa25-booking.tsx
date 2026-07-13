import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  NEON_DARK,
  NEON_PINK,
  NEON_CYAN,
  NEON_GRAY,
  NEON_BLACK,
  NEON_WHITE,
  SPA25_PACKAGES,
} from 'src/sections/spa25/spa25-data';

export function Spa25Booking() {
  const { t } = useTranslate('spa25');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${NEON_DARK} 0%, ${NEON_BLACK} 100%)`,
        position: 'relative',
      }}
    >
      {/* Top Border */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${NEON_PINK}, ${NEON_CYAN}, ${NEON_PINK})`,
          boxShadow: `0 0 20px ${NEON_PINK}`,
        }}
      />

      <Container component={MotionViewport} maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Typography
              sx={{
                color: NEON_PINK,
                letterSpacing: 6,
                fontSize: 11,
                fontWeight: 600,
                mb: 2,
                textShadow: `0 0 20px ${NEON_PINK}60`,
              }}
            >
              {t('booking.eyebrow')}
            </Typography>
          </m.div>
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 32, md: 48 },
                fontWeight: 200,
                color: NEON_WHITE,
                fontFamily: '"Orbitron", "Inter", sans-serif',
              }}
            >
              {t('booking.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_CYAN,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_CYAN}60`,
                }}
              >
                {' '}
                {t('booking.titleAccent')}
              </Box>
            </Typography>
          </m.div>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Typography sx={{ color: NEON_GRAY, fontSize: 14, mt: 2 }}>
              {t('booking.description')}
            </Typography>
          </m.div>
        </Box>

        <m.div variants={varFade({ distance: 40 }).inUp}>
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              background: NEON_DARK,
              border: `1px solid ${NEON_CYAN}30`,
            }}
          >
            {/* Contact Info */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 3, md: 6 }}
              sx={{ mb: 4 }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Iconify icon="solar:phone-calling-bold" sx={{ color: NEON_PINK, fontSize: 20 }} />
                <Box>
                  <Typography sx={{ color: NEON_GRAY, fontSize: 10, letterSpacing: 1 }}>
                    {t('booking.hotlineLabel').toUpperCase()}
                  </Typography>
                  <Typography sx={{ color: NEON_WHITE, fontSize: 14, fontWeight: 600 }}>
                    1900 2525
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Iconify icon="solar:map-point-bold" sx={{ color: NEON_PINK, fontSize: 20 }} />
                <Box>
                  <Typography sx={{ color: NEON_GRAY, fontSize: 10, letterSpacing: 1 }}>
                    {t('booking.addressLabel').toUpperCase()}
                  </Typography>
                  <Typography sx={{ color: NEON_WHITE, fontSize: 14, fontWeight: 600 }}>
                    123 Nguyễn Huệ, Q.1, TP.HCM
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Iconify icon="solar:clock-circle-bold" sx={{ color: NEON_PINK, fontSize: 20 }} />
                <Box>
                  <Typography sx={{ color: NEON_GRAY, fontSize: 10, letterSpacing: 1 }}>
                    {t('booking.hoursLabel').toUpperCase()}
                  </Typography>
                  <Typography sx={{ color: NEON_WHITE, fontSize: 14, fontWeight: 600 }}>
                    08:00 — 21:00
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            {/* Form */}
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                  fullWidth
                  placeholder={t('booking.namePlaceholder')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: NEON_BLACK,
                      border: `1px solid ${NEON_CYAN}30`,
                      borderRadius: 0,
                      color: NEON_WHITE,
                      '&:hover': { borderColor: NEON_CYAN },
                      '&.Mui-focused': { borderColor: NEON_CYAN },
                    },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder={t('booking.phonePlaceholder')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: NEON_BLACK,
                      border: `1px solid ${NEON_CYAN}30`,
                      borderRadius: 0,
                      color: NEON_WHITE,
                      '&:hover': { borderColor: NEON_CYAN },
                      '&.Mui-focused': { borderColor: NEON_CYAN },
                    },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  }}
                />
              </Stack>

              <TextField
                select
                fullWidth
                defaultValue=""
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: NEON_BLACK,
                    border: `1px solid ${NEON_CYAN}30`,
                    borderRadius: 0,
                    color: NEON_WHITE,
                    '&:hover': { borderColor: NEON_CYAN },
                    '&.Mui-focused': { borderColor: NEON_CYAN },
                  },
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& .MuiSvgIcon-root': { color: NEON_CYAN },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: { bgcolor: NEON_DARK, border: `1px solid ${NEON_CYAN}30` },
                    },
                  },
                }}
              >
                <MenuItem value="" sx={{ color: NEON_WHITE, bgcolor: NEON_DARK }}>
                  {t('booking.packagePlaceholder')}
                </MenuItem>
                {SPA25_PACKAGES.map((pkg) => (
                  <MenuItem
                    key={pkg.code}
                    value={pkg.code}
                    sx={{ color: NEON_WHITE, bgcolor: NEON_DARK }}
                  >
                    {pkg.name} — {pkg.price}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                fullWidth
                size="large"
                sx={{
                  py: 2,
                  bgcolor: NEON_PINK,
                  color: NEON_WHITE,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 2,
                  borderRadius: 0,
                  boxShadow: `0 0 30px ${NEON_PINK}40`,
                  '&:hover': {
                    bgcolor: NEON_CYAN,
                    boxShadow: `0 0 40px ${NEON_CYAN}60`,
                  },
                }}
              >
                {t('booking.submit')}
              </Button>
            </Stack>
          </Box>
        </m.div>

        {/* Decorative Elements */}
        <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          {['Zalo', 'Messenger', 'Website'].map((channel) => (
            <m.div key={channel} variants={varFade({ distance: 20 }).inUp}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  color: NEON_GRAY,
                  fontSize: 12,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': { color: NEON_CYAN },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: NEON_PINK,
                    boxShadow: `0 0 10px ${NEON_PINK}`,
                  }}
                />
                {channel}
              </Stack>
            </m.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
