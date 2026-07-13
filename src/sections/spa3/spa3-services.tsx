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

import {
  SPA3_BROWN,
  SPA3_TERRA,
  SPA3_TERRA_LIGHT,
  SPA3_SERVICE_META,
} from 'src/sections/spa3/spa3-data';

// ----------------------------------------------------------------------

type ServiceItem = { title: string; desc: string };

export function Spa3Services({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa3');

  const services = t('services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} sx={{ mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA3_TERRA, letterSpacing: 3 }}>
              {t('services.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: SPA3_BROWN, maxWidth: 480 }}>
              {t('services.title')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {Array.isArray(services) &&
            services.map((service, idx) => {
              const meta = SPA3_SERVICE_META[idx] || SPA3_SERVICE_META[0];
              return (
                <Grid xs={12} sm={6} key={idx}>
                  <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: '1px solid rgba(199,91,57,0.12)',
                        boxShadow: 'none',
                        transition: 'border-color 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          borderColor: SPA3_TERRA,
                          boxShadow: '0 8px 24px rgba(199,91,57,0.1)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={meta.image}
                        alt={service.title}
                        sx={{
                          width: { xs: '100%', sm: 180 },
                          height: { xs: 160, sm: 'auto' },
                          objectFit: 'cover',
                        }}
                      />
                      <Stack spacing={1.5} sx={{ p: 3, justifyContent: 'center' }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify icon={meta.icon} width={22} sx={{ color: SPA3_TERRA }} />
                          <Typography variant="h6" sx={{ color: SPA3_BROWN }}>
                            {service.title}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: 'grey.600', lineHeight: 1.7 }}>
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
              borderRadius: 1,
              color: 'common.white',
              bgcolor: SPA3_TERRA,
              fontWeight: 700,
              '&:hover': { bgcolor: SPA3_TERRA_LIGHT },
            }}
          >
            {t('services.viewAll')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
