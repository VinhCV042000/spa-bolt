import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_TEAL_LIGHT } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

export function Spa2Contact({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa2');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: `linear-gradient(135deg, ${SPA2_TEAL_DARK} 0%, ${SPA2_TEAL} 50%, ${SPA2_TEAL_LIGHT} 100%)`,
        ...sx,
      }}
      {...other}
    >
      <Container>
        <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: 'common.white' }}>
              {t('contact.title')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography
              sx={{ maxWidth: 600, color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.8 }}
            >
              {t('contact.subtitle')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                href={paths.spa.booking}
                size="large"
                startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                sx={{
                  px: 4,
                  borderRadius: 50,
                  color: SPA2_TEAL,
                  bgcolor: 'common.white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                {t('contact.ctaBook')}
              </Button>

              <Button
                component={RouterLink}
                href={paths.spa.contact}
                size="large"
                startIcon={<Iconify icon="solar:phone-bold-duotone" />}
                sx={{
                  px: 4,
                  borderRadius: 50,
                  color: 'common.white',
                  border: '2px solid rgba(255,255,255,0.6)',
                  '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                {t('contact.ctaCall')}
              </Button>
            </Stack>
          </Box>

          {/* Contact info row */}
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              sx={{ pt: 3, color: 'rgba(255,255,255,0.9)' }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Iconify icon="solar:phone-bold" width={20} />
                <Typography variant="body2">0901 234 567</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Iconify icon="solar:letter-bold" width={20} />
                <Typography variant="body2">hello@naturespa.vn</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Iconify icon="solar:map-point-bold" width={20} />
                <Typography variant="body2">{t('contact.address')}</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
