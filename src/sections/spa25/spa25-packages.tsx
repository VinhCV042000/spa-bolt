import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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

export function Spa25Packages() {
  const { t } = useTranslate('spa25');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${NEON_BLACK} 0%, ${NEON_DARK} 50%, ${NEON_BLACK} 100%)`,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Typography
              sx={{
                color: NEON_CYAN,
                letterSpacing: 6,
                fontSize: 11,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {t('packages.eyebrow')}
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
              {t('packages.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_PINK,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_PINK}60`,
                }}
              >
                {' '}
                {t('packages.titleAccent')}
              </Box>
            </Typography>
          </m.div>
        </Box>

        {/* Packages */}
        <Stack spacing={{ xs: 4, md: 3 }} direction={{ xs: 'column', md: 'row' }}>
          {SPA25_PACKAGES.map((pkg, index) => (
            <m.div key={pkg.code} variants={varFade({ distance: 40 }).inUp} style={{ flex: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  p: 4,
                  background: pkg.highlight ? NEON_DARK : 'transparent',
                  border: pkg.highlight ? `2px solid ${NEON_PINK}` : `1px solid ${NEON_CYAN}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: pkg.highlight ? NEON_PINK : NEON_CYAN,
                    boxShadow: pkg.highlight
                      ? `0 0 60px ${NEON_PINK}40`
                      : `0 0 40px ${NEON_CYAN}20`,
                  },
                }}
              >
                {/* Highlight Badge */}
                {pkg.highlight && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      px: 2,
                      py: 0.5,
                      bgcolor: NEON_PINK,
                      color: NEON_BLACK,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('packages.popularBadge')}
                  </Box>
                )}

                {/* Code Badge */}
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    mb: 2,
                    bgcolor: pkg.highlight ? NEON_CYAN : NEON_DARK,
                    color: pkg.highlight ? NEON_BLACK : NEON_CYAN,
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: '"Orbitron", sans-serif',
                    letterSpacing: 1,
                    border: `1px solid ${NEON_CYAN}50`,
                  }}
                >
                  {pkg.code}
                </Box>

                <Typography
                  sx={{
                    color: NEON_WHITE,
                    fontSize: 22,
                    fontWeight: 600,
                    mb: 1,
                    fontFamily: '"Orbitron", sans-serif',
                  }}
                >
                  {pkg.name}
                </Typography>

                <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                  <Typography sx={{ color: NEON_GRAY, fontSize: 12 }}>{pkg.duration}</Typography>
                  <Typography sx={{ color: NEON_GRAY, fontSize: 12 }}>{pkg.sessions}</Typography>
                </Stack>

                {/* Includes */}
                <Stack spacing={1} sx={{ mb: 4 }}>
                  {pkg.includes.map((item) => (
                    <Stack key={item} direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:check-circle-bold"
                        sx={{ color: NEON_CYAN, fontSize: 16 }}
                      />
                      <Typography sx={{ color: NEON_GRAY, fontSize: 13 }}>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Price */}
                <Box sx={{ border: `1px solid ${NEON_CYAN}20`, p: 2, mb: 3 }}>
                  <Typography
                    sx={{
                      color: NEON_GRAY,
                      fontSize: 11,
                      textDecoration: 'line-through',
                      mb: 0.5,
                    }}
                  >
                    {pkg.originalPrice}
                  </Typography>
                  <Typography
                    sx={{
                      color: pkg.highlight ? NEON_PINK : NEON_CYAN,
                      fontSize: 28,
                      fontWeight: 700,
                      fontFamily: '"Orbitron", sans-serif',
                      textShadow: pkg.highlight
                        ? `0 0 20px ${NEON_PINK}60`
                        : `0 0 20px ${NEON_CYAN}60`,
                    }}
                  >
                    {pkg.price}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  sx={{
                    py: 1.5,
                    bgcolor: 'transparent',
                    border: `1px solid ${pkg.highlight ? NEON_PINK : NEON_CYAN}`,
                    color: pkg.highlight ? NEON_PINK : NEON_CYAN,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 2,
                    borderRadius: 0,
                    '&:hover': {
                      bgcolor: pkg.highlight ? NEON_PINK : NEON_CYAN,
                      color: NEON_BLACK,
                    },
                  }}
                >
                  {t('packages.bookNow')}
                </Button>
              </Box>
            </m.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
