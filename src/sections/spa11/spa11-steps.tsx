import type { Spa11Lang } from 'src/sections/spa11/spa11-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { TERRACOTTA, ARGAN_GOLD, CREAM_WARM, SPA11_STEPS } from 'src/sections/spa11/spa11-data';

export function Spa11Steps() {
  const { t, currentLang } = useTranslate('spa11');
  const lang = currentLang.value as Spa11Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#1E0C05' }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ARGAN_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('steps.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: CREAM_WARM, maxWidth: 440, mx: 'auto' }}
            >
              {t('steps.title')}{' '}
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {t('steps.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,243,227,0.45)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('steps.description')}
            </Typography>
          </Box>
        </Stack>

        {/* Steps timeline */}
        <Box sx={{ maxWidth: 780, mx: 'auto', position: 'relative' }}>
          {/* Vertical line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 24, md: 40 },
              top: 20,
              bottom: 20,
              width: 2,
              bgcolor: 'rgba(212,160,23,0.15)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          <Stack spacing={4}>
            {SPA11_STEPS.map((step, idx) => (
              <Box component={m.div} key={step.step} variants={varFade({ distance: 40 }).inUp}>
                <Grid container spacing={{ xs: 2, md: 4 }} alignItems="flex-start">
                  {/* Step number circle */}
                  <Grid item xs={12} md="auto">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        flexShrink: 0,
                        mx: { xs: 'auto', md: 0 },
                        background: `radial-gradient(circle, ${step.color}20, rgba(0,0,0,0))`,
                        border: `2px solid ${step.color}40`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: 22, lineHeight: 1 }}>{step.icon}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: step.color, fontWeight: 800, fontSize: 10, letterSpacing: 1 }}
                      >
                        {step.step}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Content */}
                  <Grid item xs={12} md>
                    <Box
                      sx={{
                        p: 3.5,
                        borderRadius: 3,
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${step.color}15`,
                        transition: 'all 0.3s ease',
                        '&:hover': { borderColor: `${step.color}40`, bgcolor: `${step.color}04` },
                      }}
                    >
                      <Stack spacing={1.5}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: step.color,
                              fontWeight: 800,
                              fontSize: 11,
                              letterSpacing: 2,
                              textTransform: 'uppercase',
                            }}
                          >
                            {step.arabic}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: CREAM_WARM, fontWeight: 800 }}
                          >
                            {step.name[lang]}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(253,243,227,0.55)', lineHeight: 1.75 }}
                        >
                          {step.description[lang]}
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
