import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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

import { SPA2_TEAL, SPA2_CREAM, SPA2_SERVICE_META } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

type ServiceItem = { title: string; desc: string };

export function Spa2Services({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa2');

  const services = t('services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SPA2_CREAM, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: SPA2_TEAL }} />
              <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                {t('services.eyebrow')}
              </Typography>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: SPA2_TEAL }} />
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: 'grey.900' }}>
              {t('services.title')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography sx={{ maxWidth: 600, color: 'grey.600' }}>
              {t('services.subtitle')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {Array.isArray(services) &&
            services.map((service, idx) => {
              const meta = SPA2_SERVICE_META[idx] || SPA2_SERVICE_META[0];
              return (
                <Grid xs={12} sm={6} md={4} key={idx}>
                  <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                    <Card
                      sx={{
                        height: '100%',
                        overflow: 'hidden',
                        borderRadius: 3,
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(46,139,122,0.12)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={meta.image}
                        alt={service.title}
                        sx={{ width: 1, height: 180, objectFit: 'cover' }}
                      />
                      <Stack spacing={1.5} sx={{ p: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify icon={meta.icon} width={24} sx={{ color: SPA2_TEAL }} />
                          <Typography variant="h6" sx={{ color: 'grey.800' }}>
                            {service.title}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: 'grey.500', lineHeight: 1.7 }}>
                          {service.desc}
                        </Typography>
                      </Stack>
                    </Card>
                  </Box>
                </Grid>
              );
            })}
        </Grid>

        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Button
            component={RouterLink}
            href={paths.spa.services}
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{
              px: 4,
              borderRadius: 50,
              color: SPA2_TEAL,
              border: `2px solid ${SPA2_TEAL}`,
              '&:hover': { bgcolor: 'rgba(46,139,122,0.06)' },
            }}
          >
            {t('services.viewAll')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
