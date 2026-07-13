import type { Spa5Lang } from 'src/sections/spa5/spa5-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SPA5_TREATMENTS } from 'src/sections/spa5/spa5-data';

// ----------------------------------------------------------------------

const NAVY = '#0A0A2E';
const CHAMPAGNE = '#C9A84C';

export function Spa5Treatments() {
  const { t, currentLang } = useTranslate('spa5');
  const lang = currentLang.value as Spa5Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: NAVY }}>
      <Container component={MotionViewport}>
        {/* Header */}
        <Stack spacing={2} sx={{ mb: { xs: 6, md: 10 } }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inLeft}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('treatments.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inLeft}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#FAF7F2' }}>
              {t('treatments.title')}{' '}
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {t('treatments.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inLeft}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(250,247,242,0.55)', maxWidth: 500, lineHeight: 1.8 }}
            >
              {t('treatments.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          {SPA5_TREATMENTS.map((group) => (
            <Grid key={group.category.en} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                {/* Category header */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Box sx={{ width: 3, height: 24, bgcolor: CHAMPAGNE, borderRadius: 2 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: CHAMPAGNE,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      fontSize: 13,
                    }}
                  >
                    {group.category[lang]}
                  </Typography>
                </Stack>

                {/* Items */}
                <Stack
                  spacing={0}
                  divider={<Divider sx={{ borderColor: 'rgba(201,168,76,0.1)' }} />}
                >
                  {group.items.map((item) => (
                    <Stack
                      key={item.name.en}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                      sx={{
                        py: 2.5,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover .item-name': { color: CHAMPAGNE },
                        '&:hover .item-price': { color: '#FAF7F2' },
                      }}
                    >
                      <Stack spacing={0.5} sx={{ flex: 1 }}>
                        <Typography
                          className="item-name"
                          variant="body2"
                          sx={{
                            color: '#FAF7F2',
                            fontWeight: 600,
                            transition: 'color 0.2s',
                            lineHeight: 1.4,
                          }}
                        >
                          {item.name[lang]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(250,247,242,0.35)' }}>
                          {item.duration[lang]}
                        </Typography>
                      </Stack>
                      <Typography
                        className="item-price"
                        variant="body2"
                        sx={{
                          color: CHAMPAGNE,
                          fontWeight: 700,
                          whiteSpace: 'nowrap',
                          transition: 'color 0.2s',
                          flexShrink: 0,
                        }}
                      >
                        {item.price[lang]}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Note */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{ mt: 6, textAlign: 'center' }}
        >
          <Divider sx={{ borderColor: 'rgba(201,168,76,0.15)', mb: 4 }} />
          <Typography variant="body2" sx={{ color: 'rgba(250,247,242,0.35)', fontStyle: 'italic' }}>
            * Tous les soins comprennent l&apos;accès aux installations thermales · Reservations
            recommandées
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
