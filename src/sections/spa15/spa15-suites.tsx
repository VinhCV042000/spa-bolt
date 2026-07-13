import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SUMI, WASHI, MATSU, SAKURA, KINPAKU, SPA15_SUITES } from 'src/sections/spa15/spa15-data';

export function Spa15Suites() {
  const { t } = useTranslate('spa15');
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: MATSU,
        color: WASHI,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `radial-gradient(${WASHI} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      <Container component={MotionViewport} maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack spacing={2} sx={{ mb: { xs: 6, md: 10 } }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography sx={{ color: KINPAKU, letterSpacing: 6, fontSize: 11, fontWeight: 600 }}>
              {t('suites.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond",serif',
                fontSize: { xs: 36, md: 56 },
                fontWeight: 300,
                lineHeight: 1.1,
                maxWidth: 720,
              }}
            >
              {t('suites.title')}{' '}
              <Box component="em" sx={{ color: SAKURA }}>
                {t('suites.titleAccent')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={4}>
          {SPA15_SUITES.map((s, i) => (
            <Box
              key={s.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: i % 2 === 0 ? '5fr 7fr' : '7fr 5fr' },
                gap: { xs: 3, md: 6 },
                alignItems: 'center',
                py: 4,
                borderBottom: i < SPA15_SUITES.length - 1 ? `1px solid ${WASHI}1f` : 'none',
              }}
            >
              <Box
                sx={{
                  order: { xs: 1, md: i % 2 === 0 ? 1 : 2 },
                  position: 'relative',
                  height: { xs: 280, md: 380 },
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={s.img}
                  alt={s.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform .8s',
                    '&:hover': { transform: 'scale(1.06)' },
                  }}
                />
              </Box>
              <Box sx={{ order: { xs: 2, md: i % 2 === 0 ? 2 : 1 } }}>
                <Typography sx={{ color: KINPAKU, fontSize: 12, letterSpacing: 4, mb: 2 }}>
                  {t('suites.roomLabel')} 0{i + 1}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond",serif',
                    fontSize: { xs: 32, md: 44 },
                    fontWeight: 400,
                    mb: 1,
                    lineHeight: 1.1,
                  }}
                >
                  {s.name}
                </Typography>
                <Typography sx={{ color: SAKURA, fontSize: 14, letterSpacing: 2, mb: 3 }}>
                  {s.size}
                </Typography>
                <Stack spacing={1.25} sx={{ mb: 4 }}>
                  {s.feats.map((f) => (
                    <Stack key={f} direction="row" spacing={1.5} alignItems="center">
                      <Iconify icon="solar:leaf-bold" width={14} sx={{ color: KINPAKU }} />
                      <Typography sx={{ fontSize: 14, color: `${WASHI}cc` }}>{f}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Typography
                    sx={{ fontFamily: 'serif', fontSize: 26, color: KINPAKU, fontWeight: 500 }}
                  >
                    {s.price}
                  </Typography>
                  <Button
                    variant="outlined"
                    endIcon={<Iconify icon="eva:arrow-forward-fill" />}
                    sx={{
                      borderColor: WASHI,
                      color: WASHI,
                      borderRadius: 0,
                      px: 3,
                      '&:hover': { bgcolor: WASHI, color: SUMI, borderColor: WASHI },
                    }}
                  >
                    {t('suites.bookCta')}
                  </Button>
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
