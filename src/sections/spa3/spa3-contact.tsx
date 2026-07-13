import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { SPA3_SAND, SPA3_BROWN, SPA3_TERRA_DARK } from 'src/sections/spa3/spa3-data';

// ----------------------------------------------------------------------

export function Spa3Contact({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa3');

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 }, bgcolor: SPA3_BROWN, ...sx }} {...other}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={7}>
            <Stack spacing={3}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography variant="h2" sx={{ color: SPA3_SAND }}>
                  {t('contact.title')}
                </Typography>
              </Box>

              <Box component={m.div} variants={varFade({ distance: 24 }).inLeft}>
                <Typography
                  sx={{
                    color: 'rgba(245,230,211,0.7)',
                    fontSize: 17,
                    lineHeight: 1.8,
                    maxWidth: 500,
                  }}
                >
                  {t('contact.subtitle')}
                </Typography>
              </Box>

              <Box
                component={m.div}
                variants={varFade({ distance: 24 }).inLeft}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, pt: 1 }}
              >
                <Button
                  component={RouterLink}
                  href={paths.spa.booking}
                  size="large"
                  startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                  sx={{
                    px: 4,
                    borderRadius: 1,
                    color: SPA3_BROWN,
                    bgcolor: SPA3_SAND,
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'common.white' },
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
                    borderRadius: 1,
                    color: SPA3_SAND,
                    border: `2px solid ${SPA3_SAND}`,
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'rgba(245,230,211,0.08)' },
                  }}
                >
                  {t('contact.ctaCall')}
                </Button>
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 24 }).inRight}>
              <Stack spacing={3} sx={{ color: SPA3_SAND }}>
                {[
                  { icon: 'solar:phone-bold', text: '0903 456 789' },
                  { icon: 'solar:letter-bold', text: 'info@mediterraneanspa.vn' },
                  { icon: 'solar:map-point-bold', text: t('contact.address') },
                  { icon: 'solar:clock-circle-bold', text: t('contact.hours') },
                ].map((item) => (
                  <Stack key={item.icon} direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: SPA3_TERRA_DARK,
                        display: 'flex',
                      }}
                    >
                      <Iconify icon={item.icon} width={20} sx={{ color: SPA3_SAND }} />
                    </Box>
                    <Typography variant="body2">{item.text}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
