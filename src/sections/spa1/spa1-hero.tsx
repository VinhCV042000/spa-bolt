import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import { SPA1_GOLD, SPA_IMAGES, SPA1_GOLD_SOFT } from 'src/sections/spa1/spa1-data';

// ----------------------------------------------------------------------

export function Spa1Hero({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa1');

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        color: 'common.white',
        minHeight: { xs: 620, md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        pt: 'var(--layout-header-desktop-height)',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          inset: 0,
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `linear-gradient(90deg, rgba(10,10,12,0.92) 0%, rgba(10,10,12,0.70) 45%, rgba(10,10,12,0.35) 100%), url(${SPA_IMAGES.hero})`,
        }}
      />

      {/* Vertical brand mark */}
      <Typography
        sx={{
          position: 'absolute',
          right: { xs: 16, md: 48 },
          top: '50%',
          transform: 'translateY(-50%) rotate(180deg)',
          writingMode: 'vertical-rl',
          letterSpacing: 8,
          textTransform: 'uppercase',
          fontSize: 13,
          color: varAlpha(theme.vars.palette.common.whiteChannel, 0.4),
          display: { xs: 'none', md: 'block' },
        }}
      >
        {t('hero.brand')}
      </Typography>

      <Container component={MotionContainer} sx={{ position: 'relative', zIndex: 9 }}>
        <Stack spacing={4} sx={{ maxWidth: 760 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box sx={{ width: 40, height: '1px', bgcolor: SPA1_GOLD }} />
              <Typography
                variant="overline"
                sx={{ color: SPA1_GOLD_SOFT, letterSpacing: 3, fontWeight: 'fontWeightSemiBold' }}
              >
                {t('hero.tagline')}
              </Typography>
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              component="h1"
              sx={{
                fontFamily: theme.typography.fontSecondaryFamily,
                fontWeight: 'fontWeightMedium',
                fontSize: { xs: 48, sm: 64, md: 84 },
                lineHeight: 1.05,
              }}
            >
              {t('hero.titleLine1')}
              <Box
                component="span"
                sx={{ display: 'block', fontStyle: 'italic', color: SPA1_GOLD }}
              >
                {t('hero.titleLine2')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              sx={{
                maxWidth: 520,
                fontSize: 18,
                lineHeight: 1.7,
                color: varAlpha(theme.vars.palette.common.whiteChannel, 0.72),
              }}
            >
              {t('hero.subtitle')}
            </Typography>
          </Box>

          <Box
            component={m.div}
            variants={varFade({ distance: 24 }).inUp}
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, pt: 1 }}
          >
            <Button
              component={RouterLink}
              href={paths.spa.booking}
              size="large"
              endIcon={<Iconify icon="solar:arrow-right-linear" />}
              sx={{
                px: 4,
                borderRadius: 0,
                color: 'common.black',
                bgcolor: SPA1_GOLD,
                '&:hover': { bgcolor: SPA1_GOLD_SOFT },
              }}
            >
              {t('hero.ctaPrimary')}
            </Button>

            <Button
              component={RouterLink}
              href={paths.spa.services}
              size="large"
              sx={{
                px: 4,
                borderRadius: 0,
                color: 'common.white',
                border: `1px solid ${varAlpha(theme.vars.palette.common.whiteChannel, 0.4)}`,
                '&:hover': {
                  borderColor: 'common.white',
                  bgcolor: varAlpha(theme.vars.palette.common.whiteChannel, 0.08),
                },
              }}
            >
              {t('hero.ctaSecondary')}
            </Button>
          </Box>
        </Stack>
      </Container>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 32,
          justifyContent: 'center',
          color: varAlpha(theme.vars.palette.common.whiteChannel, 0.56),
        }}
      >
        <Iconify icon="solar:mouse-bold-duotone" width={20} />
        <Typography variant="caption" sx={{ letterSpacing: 2, textTransform: 'uppercase' }}>
          {t('hero.scroll')}
        </Typography>
      </Stack>
    </Box>
  );
}
