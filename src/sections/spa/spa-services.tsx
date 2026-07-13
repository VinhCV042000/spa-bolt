import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA_SERVICE_META } from 'src/sections/spa/spa-data';

// ----------------------------------------------------------------------

type ServiceItem = { title: string; description: string; duration: string };

export function SpaServices({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa');

  const services = (t('services.items', { returnObjects: true }) as ServiceItem[]).map(
    (service, index) => ({ ...service, ...SPA_SERVICE_META[index] })
  );

  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center', maxWidth: 640, mx: 'auto' }}
        >
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              {t('services.eyebrow')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2">
              {t('services.titleLead')}
              <Box component="span" sx={{ opacity: 0.4 }}>
                {' '}
                {t('services.titleRest')}
              </Box>
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography sx={{ color: 'text.secondary' }}>{t('services.subtitle')}</Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid key={service.title} xs={12} sm={6} md={3}>
              <Card
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                sx={{
                  height: 1,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: (theme) =>
                    theme.transitions.create(['transform', 'box-shadow'], { duration: 300 }),
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.customShadows.z24,
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    alt={service.title}
                    src={service.image}
                    sx={{
                      width: 1,
                      height: 200,
                      objectFit: 'cover',
                      transition: (theme) =>
                        theme.transitions.create('transform', { duration: 500 }),
                      '.MuiCard-root:hover &': { transform: 'scale(1.08)' },
                    }}
                  />
                  <Box
                    sx={{
                      top: 16,
                      right: 16,
                      width: 40,
                      height: 40,
                      display: 'flex',
                      borderRadius: 1,
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'background.paper',
                      color: 'primary.main',
                    }}
                  >
                    <Iconify icon={service.icon} width={22} />
                  </Box>
                </Box>

                <Stack spacing={2} sx={{ p: 3, flex: 1 }}>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
                    {service.description}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify
                      icon="solar:clock-circle-bold-duotone"
                      width={18}
                      sx={{ color: 'text.disabled' }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {service.duration}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          sx={{ mt: 5, textAlign: 'center' }}
        >
          <Button
            component={RouterLink}
            href={paths.spa.services}
            size="large"
            variant="contained"
            endIcon={<Iconify icon="eva:arrow-forward-fill" />}
          >
            {t('services.cta')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
