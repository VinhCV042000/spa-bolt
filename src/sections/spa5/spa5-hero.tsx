import type { Spa5Lang } from 'src/sections/spa5/spa5-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import { SPA5_IMAGES } from 'src/sections/spa5/spa5-data';

// ----------------------------------------------------------------------

const NAVY = '#0A0A2E';
const CHAMPAGNE = '#C9A84C';
const CREAM = '#FAF7F2';

export function Spa5Hero() {
  const { t, currentLang } = useTranslate('spa5');
  const lang = currentLang.value as Spa5Lang;

  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        pt: { xs: 'calc(var(--layout-header-desktop-height) + 40px)', md: 0 },
      }}
    >
      <Grid container sx={{ flexGrow: 1, width: '100%' }}>
        {/* LEFT — dark content panel */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            bgcolor: NAVY,
            display: 'flex',
            alignItems: 'center',
            py: { xs: 6, md: 0 },
            pt: { md: 'var(--layout-header-desktop-height)' },
          }}
        >
          <Container component={MotionContainer} maxWidth="sm" sx={{ px: { xs: 4, md: 6 } }}>
            <Stack spacing={4}>
              {/* Pretitle italic */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: 'italic', color: CHAMPAGNE, letterSpacing: 2, fontSize: 13 }}
                >
                  {t('hero.pretitle')}
                </Typography>
              </Box>

              {/* Badge */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Chip
                  label={t('hero.badge')}
                  sx={{
                    bgcolor: 'transparent',
                    border: `1px solid ${CHAMPAGNE}`,
                    color: CHAMPAGNE,
                    fontWeight: 700,
                    letterSpacing: 2,
                    fontSize: 11,
                  }}
                />
              </Box>

              {/* Title */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: 36, md: 54, lg: 60 },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: CREAM,
                    letterSpacing: -1,
                  }}
                >
                  {t('hero.title1')}{' '}
                  <Box component="span" sx={{ color: CHAMPAGNE }}>
                    {t('hero.title2')}
                  </Box>
                  <br />
                  {t('hero.title3')}
                </Typography>
              </Box>

              {/* Description */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(250,247,242,0.65)', lineHeight: 1.8, maxWidth: 440 }}
                >
                  {t('hero.description')}
                </Typography>
              </Box>

              {/* Tags */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {(['hero.tag1', 'hero.tag2', 'hero.tag3'] as const).map((k) => (
                    <Box
                      key={k}
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: 'rgba(201,168,76,0.12)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: CHAMPAGNE,
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      {t(k)}
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* CTAs */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    size="large"
                    startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
                    sx={{
                      bgcolor: CHAMPAGNE,
                      color: NAVY,
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#B8963D' },
                    }}
                  >
                    {t('hero.bookNow')}
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    startIcon={<Iconify icon="solar:menu-dots-bold-duotone" />}
                    sx={{
                      borderColor: 'rgba(250,247,242,0.3)',
                      color: CREAM,
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                      '&:hover': { borderColor: CREAM, bgcolor: 'rgba(250,247,242,0.05)' },
                    }}
                  >
                    {t('hero.discoverMenu')}
                  </Button>
                </Stack>
              </Box>

              {/* Hours */}
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4CAF50' }} />
                  <Typography variant="caption" sx={{ color: 'rgba(250,247,242,0.5)' }}>
                    {t('hero.openingHours')}:{' '}
                    <Box component="span" sx={{ color: CREAM }}>
                      {t('hero.hoursValue')}
                    </Box>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Grid>

        {/* RIGHT — image panel */}
        <Grid item xs={12} md={6} sx={{ position: 'relative', minHeight: { xs: 360, md: 'auto' } }}>
          <Box
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              inset: 0,
              overflow: 'hidden',
              minHeight: { xs: 360, md: 'auto' },
            }}
          >
            <Box
              component="img"
              src={SPA5_IMAGES.heroRight}
              alt="Lumière Balnéo"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Gold overlay gradient */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, rgba(10,10,46,0.4) 0%, transparent 60%)`,
              }}
            />
            {/* Floating stats card */}
            <Box
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
              sx={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                bgcolor: 'rgba(10,10,46,0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: 3,
                px: 3,
                py: 2.5,
                border: `1px solid rgba(201,168,76,0.3)`,
              }}
            >
              <Stack spacing={2}>
                {[
                  {
                    value: '20+',
                    label: {
                      vi: 'Năm balnéotherapy',
                      en: 'Years of balnéotherapy',
                      fr: 'Ans de balnéothérapie',
                      cn: '年水疗经验',
                      ar: 'عامًا من العلاج المائي',
                    },
                  },
                  {
                    value: '4',
                    label: {
                      vi: 'Liệu trình signature',
                      en: 'Signature rituals',
                      fr: 'Rituels signature',
                      cn: '招牌疗程',
                      ar: 'طقوس مميزة',
                    },
                  },
                ].map((s) => (
                  <Stack key={s.value} direction="row" alignItems="center" spacing={1.5}>
                    <Typography
                      variant="h5"
                      sx={{ color: CHAMPAGNE, fontWeight: 800, minWidth: 40 }}
                    >
                      {s.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(250,247,242,0.65)', lineHeight: 1.3 }}
                    >
                      {s.label[lang]}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
