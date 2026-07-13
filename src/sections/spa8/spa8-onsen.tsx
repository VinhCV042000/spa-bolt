import type { Spa8Lang } from 'src/sections/spa8/spa8-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA8_IMAGES, SPA8_SHIATSU_MENU, SPA8_ONSEN_OPTIONS } from 'src/sections/spa8/spa8-data';

// ----------------------------------------------------------------------

const INK = '#1A0A2E';
const GOLD = '#C8A951';
const SAKURA = '#FFB7C5';
const CREAM = '#FFF8F0';

export function Spa8Onsen() {
  const { t, currentLang } = useTranslate('spa8');
  const lang = currentLang.value as Spa8Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: INK }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('onsen.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: CREAM, maxWidth: 480, mx: 'auto' }}
            >
              {t('onsen.title')}{' '}
              <Box component="span" sx={{ color: SAKURA }}>
                {t('onsen.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255,248,240,0.5)', maxWidth: 540, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('onsen.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4} alignItems="flex-start">
          {/* Left — onsen image + options */}
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={3}>
                {/* Hero onsen image */}
                <Box
                  sx={{ borderRadius: 4, overflow: 'hidden', height: 280, position: 'relative' }}
                >
                  <Box
                    component="img"
                    src={SPA8_IMAGES.onsen}
                    alt="Amaya Onsen"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.65)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 72, color: 'rgba(200,169,81,0.3)', fontWeight: 900 }}
                    >
                      湯
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 800 }}>
                      Onsen · 温泉
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.6)' }}>
                      Khoáng chất tự nhiên · 42°C
                    </Typography>
                  </Box>
                </Box>

                {/* Onsen options */}
                {SPA8_ONSEN_OPTIONS.map((opt) => (
                  <Box
                    key={opt.type.en}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: `1px solid rgba(200,169,81,0.2)`,
                      bgcolor: 'rgba(200,169,81,0.04)',
                      transition: 'all 0.3s',
                      '&:hover': { borderColor: GOLD, bgcolor: 'rgba(200,169,81,0.08)' },
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ mb: 1.5 }}
                    >
                      <Stack spacing={0.25}>
                        <Typography variant="subtitle1" sx={{ color: CREAM, fontWeight: 800 }}>
                          {opt.type[lang]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.4)' }}>
                          {opt.duration[lang]}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ color: GOLD, fontWeight: 800 }}>
                        {opt.price[lang]}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="caption"
                      sx={{
                        color: SAKURA,
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t('onsen.includesLabel')}
                    </Typography>
                    <Stack spacing={0.5} sx={{ mt: 1 }}>
                      {opt.includes[lang].map((inc) => (
                        <Stack key={inc} direction="row" spacing={1} alignItems="center">
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              bgcolor: GOLD,
                              flexShrink: 0,
                            }}
                          />
                          <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.6)' }}>
                            {inc}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      size="small"
                      sx={{
                        mt: 2,
                        bgcolor: GOLD,
                        color: INK,
                        borderRadius: 2,
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#B89641' },
                      }}
                    >
                      {t('onsen.bookOnsen')}
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Right — Shiatsu menu */}
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inRight}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: `1px solid rgba(200,169,81,0.15)`,
                  bgcolor: 'rgba(200,169,81,0.03)',
                }}
              >
                <Stack spacing={0.5} sx={{ mb: 3 }}>
                  <Typography
                    variant="overline"
                    sx={{ color: SAKURA, letterSpacing: 3, fontWeight: 700, fontSize: 10 }}
                  >
                    Shiatsu · 指圧
                  </Typography>
                  <Typography variant="h5" sx={{ color: CREAM, fontWeight: 800 }}>
                    Menu liệu trình
                  </Typography>
                </Stack>

                <Stack divider={<Divider sx={{ borderColor: 'rgba(200,169,81,0.1)' }} />}>
                  {SPA8_SHIATSU_MENU.map((item) => (
                    <Stack
                      key={item.name.en}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        py: 2.5,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover .sh-name': { color: GOLD },
                      }}
                    >
                      <Stack spacing={0.25}>
                        <Typography
                          className="sh-name"
                          variant="body2"
                          sx={{ color: CREAM, fontWeight: 600, transition: 'color 0.2s' }}
                        >
                          {item.name[lang]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.35)' }}>
                          {item.duration[lang]}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: GOLD, fontWeight: 700, whiteSpace: 'nowrap' }}
                      >
                        {item.price[lang]}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Zen quote */}
                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,183,197,0.06)',
                    border: `1px solid rgba(255,183,197,0.15)`,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    sx={{ fontSize: 20, color: SAKURA, mb: 1, fontWeight: 300, letterSpacing: 4 }}
                  >
                    間
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,248,240,0.4)',
                      fontStyle: 'italic',
                      display: 'block',
                      lineHeight: 1.7,
                    }}
                  >
                    &ldquo;Ma — khoảng lặng thiêng liêng giữa hai hơi thở là nơi sự chữa lành thực
                    sự bắt đầu.&rdquo;
                  </Typography>
                </Box>

                <Iconify
                  icon="solar:info-circle-bold-duotone"
                  width={16}
                  sx={{ color: 'rgba(200,169,81,0.4)', mt: 2 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,248,240,0.3)', ml: 1, fontStyle: 'italic' }}
                >
                  Vui lòng đến trước 15 phút để thư giãn trước liệu trình
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
