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
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA1_GOLD, SPA1_DARK, SPA_SERVICE_META } from 'src/sections/spa1/spa1-data';

// ----------------------------------------------------------------------

type ServiceItem = { index: string; title: string; description: string; duration: string };

export function Spa1Services({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('spa1');

  const services = (t('services.items', { returnObjects: true }) as ServiceItem[]).map(
    (service, index) => ({ ...service, ...SPA_SERVICE_META[index] })
  );

  const white = (opacity: number) => varAlpha(theme.vars.palette.common.whiteChannel, opacity);

  return (
    <Box
      component="section"
      id="services"
      sx={{ py: { xs: 8, md: 16 }, color: 'common.white', bgcolor: SPA1_DARK, ...sx }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'flex-end' }}
          spacing={3}
          sx={{ mb: { xs: 5, md: 8 } }}
        >
          <Stack spacing={2} component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
              {t('services.eyebrow')}
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.fontSecondaryFamily,
                fontWeight: 'fontWeightMedium',
                fontSize: { xs: 30, md: 48 },
                lineHeight: 1.15,
              }}
            >
              {t('services.title')}
            </Typography>
          </Stack>

          <Typography
            component={m.p}
            variants={varFade({ distance: 24 }).inUp}
            sx={{ maxWidth: 360, color: white(0.6), lineHeight: 1.7 }}
          >
            {t('services.subtitle')}
          </Typography>
        </Stack>

        <Box>
          {services.map((service) => (
            <Stack
              key={service.title}
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              direction="row"
              alignItems="center"
              spacing={{ xs: 2, md: 4 }}
              sx={{
                py: { xs: 3, md: 4 },
                px: { md: 2 },
                cursor: 'pointer',
                borderTop: `1px solid ${white(0.12)}`,
                transition: theme.transitions.create(['background-color', 'padding-left']),
                '&:last-of-type': { borderBottom: `1px solid ${white(0.12)}` },
                '&:hover': {
                  bgcolor: white(0.03),
                  pl: { md: 4 },
                  '& .spa1-service-title': { color: SPA1_GOLD },
                  '& .spa1-service-img': { opacity: 1, transform: 'scale(1)' },
                  '& .spa1-service-arrow': { opacity: 1, transform: 'translateX(0)' },
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.typography.fontSecondaryFamily,
                  fontSize: { xs: 20, md: 24 },
                  color: SPA1_GOLD,
                  width: { xs: 36, md: 48 },
                  flexShrink: 0,
                }}
              >
                {service.index}
              </Typography>

              <Box
                component="img"
                alt={service.title}
                src={service.image}
                className="spa1-service-img"
                sx={{
                  width: 72,
                  height: 72,
                  flexShrink: 0,
                  objectFit: 'cover',
                  opacity: 0.5,
                  transform: 'scale(0.92)',
                  display: { xs: 'none', sm: 'block' },
                  transition: theme.transitions.create(['opacity', 'transform']),
                }}
              />

              <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  className="spa1-service-title"
                  sx={{
                    fontFamily: theme.typography.fontSecondaryFamily,
                    fontSize: { xs: 22, md: 30 },
                    transition: theme.transitions.create('color'),
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  sx={{ color: white(0.56), maxWidth: 560, display: { xs: 'none', md: 'block' } }}
                >
                  {service.description}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={2} sx={{ flexShrink: 0 }}>
                <Typography
                  variant="body2"
                  sx={{ color: white(0.6), whiteSpace: 'nowrap', letterSpacing: 1 }}
                >
                  {service.duration}
                </Typography>
                <Iconify
                  icon="solar:arrow-right-up-linear"
                  width={24}
                  className="spa1-service-arrow"
                  sx={{
                    color: SPA1_GOLD,
                    opacity: 0,
                    transform: 'translateX(-8px)',
                    transition: theme.transitions.create(['opacity', 'transform']),
                    display: { xs: 'none', md: 'block' },
                  }}
                />
              </Stack>
            </Stack>
          ))}
        </Box>

        <Box
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          sx={{ mt: 6, textAlign: 'center' }}
        >
          <Button
            component={RouterLink}
            href={paths.spa.services}
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{
              px: 4,
              borderRadius: 0,
              color: 'common.white',
              border: `1px solid ${SPA1_GOLD}`,
              '&:hover': { bgcolor: SPA1_GOLD, color: 'common.black' },
            }}
          >
            {t('services.cta')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
