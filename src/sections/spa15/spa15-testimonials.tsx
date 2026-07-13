import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, SAKURA, KINPAKU, SPA15_TESTIMONIALS } from 'src/sections/spa15/spa15-data';

export function Spa15Testimonials() {
  const { t } = useTranslate('spa15');
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: WASHI }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }} alignItems="center">
          <Typography sx={{ color: KINPAKU, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
            {t('testimonials.eyebrow')}
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Cormorant Garamond",serif',
              fontSize: { xs: 32, md: 48 },
              fontWeight: 300,
              color: SUMI,
            }}
          >
            {t('testimonials.title')}{' '}
            <Box component="em" sx={{ color: SAKURA }}>
              {t('testimonials.titleAccent')}
            </Box>{' '}
            {t('testimonials.titleSuffix')}
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          {SPA15_TESTIMONIALS.map((d) => (
            <Grid key={d.name} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: 4,
                  bgcolor: 'white',
                  height: '100%',
                  position: 'relative',
                  borderTop: `2px solid ${SAKURA}`,
                }}
              >
                <Iconify
                  icon="solar:quote-up-square-bold-duotone"
                  width={32}
                  sx={{ color: SAKURA, opacity: 0.4, mb: 2 }}
                />
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond",serif',
                    fontSize: 19,
                    fontStyle: 'italic',
                    color: SUMI,
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  &ldquo;{d.text}&rdquo;
                </Typography>
                <Box sx={{ borderTop: `1px solid ${SUMI}15`, pt: 2 }}>
                  <Typography sx={{ fontWeight: 700, color: SUMI, fontSize: 14 }}>
                    {d.name}
                  </Typography>
                  <Typography sx={{ color: KINPAKU, fontSize: 12, letterSpacing: 1 }}>
                    {d.role}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
