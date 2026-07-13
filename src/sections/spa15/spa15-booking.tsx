import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, SAKURA, KINPAKU, SPA15_IMAGES } from 'src/sections/spa15/spa15-data';

export function Spa15Booking() {
  const { t } = useTranslate('spa15');
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 10, md: 16 },
        bgcolor: SUMI,
        color: WASHI,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={SPA15_IMAGES.zen}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.18,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${SUMI}f5, ${SUMI}ee)`,
        }}
      />
      <Container component={MotionViewport} maxWidth="md" sx={{ position: 'relative' }}>
        <Stack spacing={3} sx={{ textAlign: 'center', mb: 6 }} alignItems="center">
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: KINPAKU, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              {t('booking.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 38, md: 60 },
                fontWeight: 300,
                lineHeight: 1.1,
                maxWidth: 720,
              }}
            >
              {t('booking.title')}{' '}
              <Box component="em" sx={{ color: SAKURA }}>
                {t('booking.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: `${WASHI}aa`, maxWidth: 520, lineHeight: 1.9 }}>
              {t('booking.description')}
            </Typography>
          </Box>
        </Stack>

        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            bgcolor: `${WASHI}08`,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${KINPAKU}33`,
            p: { xs: 3, md: 5 },
          }}
        >
          <Grid container spacing={2.5}>
            {[
              { label: t('booking.name'), xs: 12, sm: 6 },
              { label: t('booking.phone'), xs: 12, sm: 6 },
              { label: t('booking.email'), xs: 12, sm: 6 },
              { label: t('booking.date'), xs: 12, sm: 6, type: 'date' },
            ].map((f) => (
              <Grid key={f.label} item xs={f.xs} sm={f.sm}>
                <TextField
                  fullWidth
                  variant="standard"
                  label={f.label}
                  type={f.type}
                  InputLabelProps={{
                    shrink: f.type === 'date' || undefined,
                    sx: { color: `${WASHI}99` },
                  }}
                  sx={{
                    '& .MuiInput-root': { color: WASHI },
                    '& .MuiInput-underline:before': { borderColor: `${WASHI}33` },
                    '& .MuiInput-underline:hover:before': {
                      borderColor: `${KINPAKU}88 !important`,
                    },
                    '& .MuiInput-underline:after': { borderColor: KINPAKU },
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                variant="standard"
                label={t('booking.notes')}
                InputLabelProps={{ sx: { color: `${WASHI}99` } }}
                sx={{
                  '& .MuiInput-root': { color: WASHI },
                  '& .MuiInput-underline:before': { borderColor: `${WASHI}33` },
                  '& .MuiInput-underline:after': { borderColor: KINPAKU },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ pt: 2 }}
              >
                <Typography sx={{ fontSize: 12, color: `${WASHI}66` }}>
                  <Iconify
                    icon="solar:shield-check-bold-duotone"
                    width={14}
                    sx={{ verticalAlign: -3, mr: 0.5, color: KINPAKU }}
                  />
                  {t('booking.privacy')}
                </Typography>
                <Button
                  size="large"
                  endIcon={<Iconify icon="solar:letter-opened-bold" />}
                  sx={{
                    bgcolor: SAKURA,
                    color: SUMI,
                    borderRadius: 0,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    letterSpacing: 1,
                    '&:hover': { bgcolor: '#d98aab' },
                  }}
                >
                  {t('booking.submit')}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
