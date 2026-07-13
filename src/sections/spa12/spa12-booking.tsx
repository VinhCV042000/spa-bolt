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
  CHAMPAGNE,
  DEEP_NAVY,
  PEARL_WHITE,
  SPA12_INTERESTS,
  SPA12_MEMBERSHIPS,
} from 'src/sections/spa12/spa12-data';

import type { Spa12Lang } from './spa12-data';

export function Spa12Booking() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;
  const interests = SPA12_INTERESTS[lang];

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      color: PEARL_WHITE,
      bgcolor: 'rgba(249,246,238,0.03)',
      '& fieldset': { borderColor: 'rgba(212,175,55,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(212,175,55,0.45)' },
      '&.Mui-focused fieldset': { borderColor: CHAMPAGNE },
    },
    '& .MuiInputLabel-root': { color: 'rgba(249,246,238,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: CHAMPAGNE },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: DEEP_NAVY }}>
      <Container component={MotionViewport}>
        {/* Membership tiers */}
        <Box sx={{ mb: 12 }}>
          <Stack spacing={2} alignItems="center" sx={{ mb: 6, textAlign: 'center' }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="overline"
                sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
              >
                {t('membership.label')}
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: PEARL_WHITE }}>
                {t('membership.title')}{' '}
                <Box component="span" sx={{ color: CHAMPAGNE }}>
                  {t('membership.titleHighlight')}
                </Box>
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(249,246,238,0.4)', maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}
              >
                {t('membership.description')}
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3} alignItems="stretch">
            {SPA12_MEMBERSHIPS.map((m_) => (
              <Grid key={m_.tier} item xs={12} md={4}>
                <Box
                  component={m.div}
                  variants={varFade({ distance: 30 }).inUp}
                  sx={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: m_.color,
                      border: `1px solid ${m_.textColor}20`,
                      transition: 'all 0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 32px 80px ${m_.textColor}20`,
                      },
                    }}
                  >
                    <Stack spacing={2.5} sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{ color: m_.textColor, fontWeight: 900, letterSpacing: 2 }}
                      >
                        {m_.tier}
                      </Typography>
                      <Box>
                        <Typography variant="h4" sx={{ color: m_.textColor, fontWeight: 900 }}>
                          {m_.price[lang]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: `${m_.textColor}70` }}>
                          {t('membership.perYear')}
                        </Typography>
                      </Box>
                      <Stack spacing={1} sx={{ flex: 1 }}>
                        {m_.perks[lang].map((perk) => (
                          <Stack key={perk} direction="row" spacing={1.5} alignItems="flex-start">
                            <Iconify
                              icon="solar:check-circle-bold-duotone"
                              width={16}
                              sx={{ color: m_.textColor, opacity: 0.7, flexShrink: 0, mt: 0.2 }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: `${m_.textColor}90`, lineHeight: 1.5 }}
                            >
                              {perk}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        fullWidth
                        sx={{
                          bgcolor: m_.textColor,
                          color: m_.color,
                          borderRadius: 2,
                          fontWeight: 800,
                          py: 1.25,
                          '&:hover': { opacity: 0.9 },
                        }}
                      >
                        {t('membership.joinNow')}
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Booking form */}
        <Box sx={{ maxWidth: 640, mx: 'auto' }}>
          <Box
            component={m.div}
            variants={varFade({ distance: 30 }).inUp}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              border: `1px solid rgba(212,175,55,0.15)`,
              bgcolor: '#0A1628',
            }}
          >
            <Stack spacing={3} sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                variant="overline"
                sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
              >
                {t('booking.label')}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: PEARL_WHITE }}>
                {t('booking.title')}{' '}
                <Box component="span" sx={{ color: CHAMPAGNE }}>
                  {t('booking.titleHighlight')}
                </Box>
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(249,246,238,0.45)', lineHeight: 1.8 }}>
                {t('booking.description')}
              </Typography>
            </Stack>
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label={t('booking.name')} sx={inputSx} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label={t('booking.email')} type="email" sx={inputSx} />
                </Grid>
              </Grid>
              <TextField fullWidth label={t('booking.phone')} sx={inputSx} />
              <TextField
                fullWidth
                label={t('booking.interest')}
                select
                defaultValue=""
                sx={inputSx}
              >
                {interests.map((i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label={t('booking.preferDate')}
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={inputSx}
              />
              <Button
                fullWidth
                size="large"
                startIcon={<Iconify icon="solar:diamond-bold-duotone" />}
                sx={{
                  bgcolor: CHAMPAGNE,
                  color: DEEP_NAVY,
                  borderRadius: 2,
                  py: 1.75,
                  fontWeight: 900,
                  fontSize: 15,
                  '&:hover': { bgcolor: '#B89641' },
                }}
              >
                {t('booking.confirm')}
              </Button>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(249,246,238,0.3)',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  display: 'block',
                }}
              >
                🔒 {t('booking.confidential')}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
