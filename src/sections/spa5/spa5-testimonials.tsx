import type { Spa5Lang } from 'src/sections/spa5/spa5-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA5_TESTIMONIALS } from 'src/sections/spa5/spa5-data';

// ----------------------------------------------------------------------

const NAVY = '#0A0A2E';
const CHAMPAGNE = '#C9A84C';
const CREAM = '#FAF7F2';

export function Spa5Testimonials() {
  const { t, currentLang } = useTranslate('spa5');
  const lang = currentLang.value as Spa5Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('testimonials.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: NAVY, maxWidth: 500, mx: 'auto' }}
            >
              {t('testimonials.title')}{' '}
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {t('testimonials.titleHighlight')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA5_TESTIMONIALS.map((item) => (
            <Grid key={item.name} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: 'rgba(201,168,76,0.15)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 20px 60px rgba(10,10,46,0.08)`,
                    borderColor: CHAMPAGNE,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Quote icon */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      fontSize: 64,
                      lineHeight: 1,
                      color: CHAMPAGNE,
                      fontFamily: 'Georgia, serif',
                      fontWeight: 900,
                    }}
                  >
                    &ldquo;
                  </Typography>
                </Box>

                {/* Stars */}
                <Stack direction="row" spacing={0.5} sx={{ mb: 2.5 }}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Iconify key={i} icon="solar:star-bold" width={16} sx={{ color: CHAMPAGNE }} />
                  ))}
                </Stack>

                {/* Quote */}
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.75,
                    fontStyle: 'italic',
                    flexGrow: 1,
                    mb: 4,
                  }}
                >
                  {item.quote[lang]}
                </Typography>

                {/* Author */}
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    sx={{ width: 48, height: 48, border: `2px solid ${CHAMPAGNE}` }}
                  />
                  <Stack spacing={0.25}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: NAVY }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {item.role[lang]}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
