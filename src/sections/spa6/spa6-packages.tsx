import type { Spa6Lang } from 'src/sections/spa6/spa6-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA6_IMAGES, SPA6_PACKAGES } from 'src/sections/spa6/spa6-data';

// ----------------------------------------------------------------------

const TERRACOTTA = '#C1440E';
const CREAM = '#F9F4ED';

export function Spa6Packages() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM }}>
      <Container component={MotionViewport}>
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('packages.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, maxWidth: 440, mx: 'auto' }}>
              {t('packages.title')}{' '}
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {t('packages.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('packages.description')}
            </Typography>
          </Box>
        </Stack>

        {/* Background nature image with overlay */}
        <Box sx={{ position: 'relative', borderRadius: 5, overflow: 'hidden', mb: 6 }}>
          <Box
            component="img"
            src={SPA6_IMAGES.retreat}
            alt="Retreat"
            sx={{ width: '100%', height: 200, objectFit: 'cover', filter: 'brightness(0.4)' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: CREAM,
                fontWeight: 700,
                fontStyle: 'italic',
                textAlign: 'center',
                px: 4,
              }}
            >
              &ldquo;The journey of a thousand miles begins with a single breath.&rdquo;
            </Typography>
          </Box>
        </Box>

        {/* Package cards */}
        <Grid container spacing={3} alignItems="stretch">
          {SPA6_PACKAGES.map((pkg) => (
            <Grid key={pkg.name.en} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    border: pkg.popular ? `2px solid ${pkg.color}` : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: pkg.popular ? `0 24px 64px ${pkg.color}30` : 'none',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 32px 80px ${pkg.color}25`,
                    },
                    bgcolor: 'white',
                    position: 'relative',
                  }}
                >
                  {/* Popular banner */}
                  {pkg.popular && (
                    <Chip
                      label={t('packages.mostPopular')}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: pkg.color,
                        color: CREAM,
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: 0.5,
                        zIndex: 1,
                      }}
                    />
                  )}

                  {/* Colored header */}
                  <Box sx={{ bgcolor: pkg.color, p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: CREAM, fontWeight: 800 }}>
                      {pkg.name[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(249,244,237,0.7)', mt: 0.5 }}>
                      {pkg.duration[lang]}
                    </Typography>
                    <Box sx={{ mt: 2.5 }}>
                      <Typography
                        variant="h3"
                        sx={{ color: CREAM, fontWeight: 900, lineHeight: 1 }}
                      >
                        {pkg.price[lang]}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.6)' }}>
                        {t('packages.perPerson')}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Stack spacing={0} sx={{ p: 4, flex: 1, justifyContent: 'space-between' }}>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 1 }}
                      >
                        {pkg.description[lang]}
                      </Typography>
                      <Typography
                        variant="overline"
                        sx={{ color: pkg.color, fontWeight: 700, fontSize: 10, letterSpacing: 2 }}
                      >
                        {t('packages.includes')}
                      </Typography>
                      {pkg.includes[lang].map((item) => (
                        <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                          <Iconify
                            icon="solar:check-circle-bold-duotone"
                            width={18}
                            sx={{ color: pkg.color, flexShrink: 0, mt: 0.25 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.primary', lineHeight: 1.5 }}
                          >
                            {item}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      fullWidth
                      size="large"
                      sx={{
                        bgcolor: pkg.popular ? pkg.color : 'transparent',
                        color: pkg.popular ? CREAM : pkg.color,
                        border: `2px solid ${pkg.color}`,
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 700,
                        '&:hover': { bgcolor: pkg.color, color: CREAM },
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {t('packages.bookRetreat')}
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
