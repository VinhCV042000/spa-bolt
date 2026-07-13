import type { Spa4Lang } from 'src/sections/spa4/spa4-data';

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
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA4_TREATMENTS } from 'src/sections/spa4/spa4-data';

// ----------------------------------------------------------------------

const JADE_GREEN = '#1B4332';
const ROSE_GOLD = '#C9956C';

export function Spa4Treatments() {
  const { t, currentLang } = useTranslate('spa4');
  const lang = currentLang.value as Spa4Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAFAF7' }}>
      <Container component={MotionViewport}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'flex-end' }}
          justifyContent="space-between"
          sx={{ mb: 7 }}
          spacing={2}
        >
          <Stack spacing={1}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inLeft}>
              <Typography
                variant="overline"
                sx={{ color: ROSE_GOLD, letterSpacing: 3, fontWeight: 700 }}
              >
                {t('treatments.label')}
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inLeft}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: JADE_GREEN }}>
                {t('treatments.title')}
              </Typography>
            </Box>
          </Stack>
          <Box component={m.div} variants={varFade({ distance: 20 }).inRight}>
            <Button
              variant="outlined"
              endIcon={<Iconify icon="solar:arrow-right-bold" />}
              sx={{ borderColor: JADE_GREEN, color: JADE_GREEN, borderRadius: 3 }}
            >
              {t('treatments.viewAll')}
            </Button>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA4_TREATMENTS.map((treatment) => (
            <Grid key={treatment.title.en} item xs={12} sm={6} md={3}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 5,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                    border: '1px solid',
                    borderColor: 'grey.100',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                    },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={treatment.image}
                      alt={treatment.title[lang]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                        '&:hover': { transform: 'scale(1.08)' },
                      }}
                    />
                    {treatment.badge && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          bgcolor: JADE_GREEN,
                          color: 'white',
                          borderRadius: 2,
                          px: 1.5,
                          py: 0.5,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {treatment.badge[lang]}
                      </Box>
                    )}
                  </Box>

                  {/* Content */}
                  <Stack spacing={1.5} sx={{ p: 3, flexGrow: 1 }}>
                    <Chip
                      label={treatment.category[lang]}
                      size="small"
                      sx={{
                        bgcolor: treatment.color,
                        color: JADE_GREEN,
                        fontWeight: 600,
                        fontSize: 11,
                        width: 'fit-content',
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: JADE_GREEN }}>
                      {treatment.title[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.6, flexGrow: 1 }}
                    >
                      {treatment.description[lang]}
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      pt={1}
                      sx={{ borderTop: '1px solid', borderColor: 'grey.100' }}
                    >
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify
                          icon="solar:clock-circle-bold-duotone"
                          width={16}
                          sx={{ color: 'text.disabled' }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {treatment.duration[lang]}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: ROSE_GOLD }}>
                        {treatment.price[lang]}
                      </Typography>
                    </Stack>

                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: JADE_GREEN,
                        color: JADE_GREEN,
                        borderRadius: 2,
                        mt: 0.5,
                        '&:hover': { bgcolor: '#E8F5E9', borderColor: JADE_GREEN },
                      }}
                    >
                      {t('treatments.bookNow')}
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
