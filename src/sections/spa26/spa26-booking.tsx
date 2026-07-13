import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  NORDIC_GRAY,
  NORDIC_WHITE,
  NORDIC_STONE,
  NORDIC_BLACK,
} from 'src/sections/spa26/spa26-data';

export function Spa26Booking() {
  const { t } = useTranslate('spa26');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_BLACK,
        color: NORDIC_WHITE,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* Left: Info */}
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Box>
              <Typography
                sx={{
                  color: NORDIC_GRAY,
                  letterSpacing: 4,
                  fontSize: 10,
                  fontWeight: 500,
                  mb: 4,
                }}
              >
                {t('booking.eyebrow')}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 36, md: 56 },
                  fontWeight: 300,
                  color: NORDIC_WHITE,
                  letterSpacing: -2,
                  lineHeight: 1.1,
                  mb: 6,
                }}
              >
                {t('booking.title')}
                <br />
                <Box component="span" sx={{ color: NORDIC_STONE }}>
                  {t('booking.titleAccent')}
                </Box>
              </Typography>

              <Stack spacing={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: `1px solid ${NORDIC_STONE}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon="solar:map-point-linear"
                      sx={{ color: NORDIC_STONE, fontSize: 18 }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ color: NORDIC_GRAY, fontSize: 10, mb: 0.5 }}>
                      {t('booking.addressLabel')}
                    </Typography>
                    <Typography sx={{ color: NORDIC_WHITE, fontSize: 14 }}>
                      {t('booking.addressValue')}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: `1px solid ${NORDIC_STONE}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="solar:phone-linear" sx={{ color: NORDIC_STONE, fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: NORDIC_GRAY, fontSize: 10, mb: 0.5 }}>
                      {t('booking.phoneLabel')}
                    </Typography>
                    <Typography sx={{ color: NORDIC_WHITE, fontSize: 14 }}>
                      {t('booking.phoneValue')}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: `1px solid ${NORDIC_STONE}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify
                      icon="solar:clock-circle-linear"
                      sx={{ color: NORDIC_STONE, fontSize: 18 }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ color: NORDIC_GRAY, fontSize: 10, mb: 0.5 }}>
                      {t('booking.hoursLabel')}
                    </Typography>
                    <Typography sx={{ color: NORDIC_WHITE, fontSize: 14 }}>
                      {t('booking.hoursValue')}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </m.div>

          {/* Right: Form */}
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Box
              sx={{
                p: { xs: 4, md: 5 },
                border: `1px solid ${NORDIC_STONE}30`,
              }}
            >
              <Typography
                sx={{
                  color: NORDIC_WHITE,
                  fontSize: 18,
                  fontWeight: 400,
                  mb: 4,
                }}
              >
                {t('booking.formTitle')}
              </Typography>

              <Stack spacing={3}>
                <TextField
                  fullWidth
                  placeholder={t('booking.namePlaceholder')}
                  InputProps={{
                    sx: {
                      bgcolor: 'transparent',
                      border: `1px solid ${NORDIC_STONE}40`,
                      borderRadius: 0,
                      color: NORDIC_WHITE,
                      '&:hover': { borderColor: NORDIC_STONE },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder={t('booking.emailPlaceholder')}
                  InputProps={{
                    sx: {
                      bgcolor: 'transparent',
                      border: `1px solid ${NORDIC_STONE}40`,
                      borderRadius: 0,
                      color: NORDIC_WHITE,
                      '&:hover': { borderColor: NORDIC_STONE },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder={t('booking.phonePlaceholder')}
                  InputProps={{
                    sx: {
                      bgcolor: 'transparent',
                      border: `1px solid ${NORDIC_STONE}40`,
                      borderRadius: 0,
                      color: NORDIC_WHITE,
                      '&:hover': { borderColor: NORDIC_STONE },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder={t('booking.messagePlaceholder')}
                  InputProps={{
                    sx: {
                      bgcolor: 'transparent',
                      border: `1px solid ${NORDIC_STONE}40`,
                      borderRadius: 0,
                      color: NORDIC_WHITE,
                      '&:hover': { borderColor: NORDIC_STONE },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  }}
                />

                <Button
                  fullWidth
                  sx={{
                    py: 2,
                    bgcolor: NORDIC_WHITE,
                    color: NORDIC_BLACK,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    borderRadius: 0,
                    '&:hover': {
                      bgcolor: NORDIC_STONE,
                      color: NORDIC_WHITE,
                    },
                  }}
                >
                  {t('booking.submit')}
                </Button>
              </Stack>
            </Box>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
