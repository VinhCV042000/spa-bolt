import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import { SPA7_IMAGES } from 'src/sections/spa7/spa7-data';

// ----------------------------------------------------------------------

const BLACK = '#0D0D0D';
const PINK = '#F4A7B9';
const WHITE = '#FAFAFA';

export function Spa7Hero() {
  const { t } = useTranslate('spa7');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: BLACK,
        overflow: 'hidden',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
      }}
    >
      {/* Background image — right half */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '100%', md: '55%' },
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={SPA7_IMAGES.hero}
          alt="Noir & Rose"
          sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        {/* Gradient fade to left */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'rgba(13,13,13,0.7)',
              md: 'linear-gradient(to right, #0D0D0D 15%, transparent 60%)',
            },
          }}
        />
      </Box>

      {/* Large decorative "N&R" text */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: -60,
          right: -20,
          fontSize: { xs: 160, md: 280 },
          fontWeight: 900,
          letterSpacing: -12,
          color: 'rgba(244,167,185,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        N&R
      </Typography>

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: 'calc(var(--layout-header-desktop-height) + 60px)',
          pb: 10,
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
          <Stack spacing={4}>
            {/* Top label */}
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ width: 32, height: 1.5, bgcolor: PINK }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: PINK,
                    letterSpacing: 4,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: 11,
                  }}
                >
                  {t('hero.tagline')}
                </Typography>
              </Stack>
            </Box>

            {/* Badge */}
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Chip
                label={t('hero.badge')}
                sx={{
                  bgcolor: PINK,
                  color: BLACK,
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: 2,
                  px: 1,
                }}
              />
            </Box>

            {/* Title */}
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 40, md: 58, lg: 68 },
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: -2,
                }}
              >
                <Box component="span" sx={{ color: WHITE }}>
                  {t('hero.title1')}
                </Box>
                <br />
                <Box component="span" sx={{ color: PINK }}>
                  {t('hero.title2')}
                </Box>
                <br />
                <Box component="span" sx={{ color: WHITE }}>
                  {t('hero.title3')}
                </Box>
              </Typography>
            </Box>

            {/* Description */}
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(250,250,250,0.55)', lineHeight: 1.8, maxWidth: 460 }}
              >
                {t('hero.description')}
              </Typography>
            </Box>

            {/* Free consult badge */}
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: 'rgba(244,167,185,0.1)',
                  border: `1px solid rgba(244,167,185,0.25)`,
                }}
              >
                <Iconify icon="solar:gift-bold-duotone" width={16} sx={{ color: PINK }} />
                <Typography variant="caption" sx={{ color: PINK, fontWeight: 700, fontSize: 12 }}>
                  {t('hero.freeConsultBadge')}
                </Typography>
              </Box>
            </Box>

            {/* Stats */}
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Stack direction="row" spacing={4}>
                {[
                  { value: '3,500+', labelKey: 'hero.stat1' },
                  { value: '4', labelKey: 'hero.stat2' },
                  { value: '8', labelKey: 'hero.stat3' },
                ].map(({ value, labelKey }) => (
                  <Stack key={labelKey} spacing={0.25}>
                    <Typography
                      variant="h5"
                      sx={{ color: PINK, fontWeight: 900, letterSpacing: -1 }}
                    >
                      {value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(250,250,250,0.4)',
                        fontSize: 11,
                        lineHeight: 1.3,
                        maxWidth: 80,
                      }}
                    >
                      {t(labelKey as any)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* CTAs */}
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  size="large"
                  startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                  sx={{
                    bgcolor: PINK,
                    color: BLACK,
                    borderRadius: 2,
                    px: 3.5,
                    py: 1.75,
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#E894AD' },
                  }}
                >
                  {t('hero.bookConsult')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:eye-bold-duotone" />}
                  sx={{
                    borderColor: 'rgba(250,250,250,0.2)',
                    color: WHITE,
                    borderRadius: 2,
                    px: 3.5,
                    py: 1.75,
                    '&:hover': { borderColor: PINK, color: PINK, bgcolor: 'transparent' },
                  }}
                >
                  {t('hero.viewTech')}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
