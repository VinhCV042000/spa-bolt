import type { Spa14Lang } from 'src/sections/spa14/spa14-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  GARNET,
  ANTIQUE_GOLD,
  IMPERIAL_CREAM,
  SPA14_TIMELINE,
  SPA14_TREATMENTS,
} from 'src/sections/spa14/spa14-data';

export function Spa14Treatments() {
  const { t, currentLang } = useTranslate('spa14');
  const lang = currentLang.value as Spa14Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: IMPERIAL_CREAM }}>
      <Container component={MotionViewport}>
        {/* Heritage timeline */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: GARNET, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('heritage.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, maxWidth: 440, mx: 'auto' }}>
              {t('heritage.title')}{' '}
              <Box component="span" sx={{ color: GARNET }}>
                {t('heritage.titleHighlight')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ maxWidth: 720, mx: 'auto', mb: 12, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              left: 40,
              top: 0,
              bottom: 0,
              width: 1,
              bgcolor: `${ANTIQUE_GOLD}30`,
            }}
          />
          <Stack spacing={4}>
            {SPA14_TIMELINE.map((item) => (
              <Box component={m.div} key={item.year} variants={varFade({ distance: 30 }).inLeft}>
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box sx={{ width: 80, flexShrink: 0, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: GARNET,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: IMPERIAL_CREAM,
                          fontWeight: 800,
                          fontSize: 13,
                          letterSpacing: -0.5,
                        }}
                      >
                        {item.year}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, pt: 1.5 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, color: '#2A0A12', mb: 0.75 }}
                    >
                      {item.title[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {item.desc[lang]}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Treatments */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: GARNET, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('treatments.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {t('treatments.title')}{' '}
              <Box component="span" sx={{ color: GARNET }}>
                {t('treatments.titleHighlight')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA14_TREATMENTS.map((tr, idx) => (
            <Grid key={tr.name.en} item xs={12} sm={6}>
              <Box
                component={m.div}
                variants={varFade({ distance: idx % 2 === 0 ? -30 : 30, axis: 'x' }).in}
              >
                <Box
                  sx={{
                    p: 3.5,
                    borderRadius: 4,
                    border: `1px solid ${tr.color}20`,
                    bgcolor: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: tr.color,
                      transform: 'translateY(-5px)',
                      boxShadow: `0 20px 50px ${tr.color}12`,
                    },
                  }}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1.5,
                        bgcolor: `${tr.color}10`,
                        width: 'fit-content',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: tr.color, fontWeight: 700, fontSize: 11, fontStyle: 'italic' }}
                      >
                        {tr.origin[lang]}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 800, color: '#2A0A12', lineHeight: 1.3 }}
                    >
                      {tr.name[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.75,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {tr.description[lang]}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack spacing={0.25}>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {tr.duration[lang]}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: tr.color, fontWeight: 800 }}>
                          {tr.price[lang]}
                        </Typography>
                      </Stack>
                      <Button
                        size="small"
                        sx={{
                          bgcolor: tr.color,
                          color: IMPERIAL_CREAM,
                          borderRadius: 2,
                          px: 2.5,
                          fontWeight: 700,
                          '&:hover': { opacity: 0.85 },
                        }}
                      >
                        {t('treatments.book')}
                      </Button>
                    </Stack>
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
