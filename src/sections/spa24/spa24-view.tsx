import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import {
  SPA24_ONYX,
  SPA24_GOLD,
  SPA24_FAQS,
  SPA24_IVORY,
  SPA24_PEARL,
  SPA24_PRESS,
  SPA24_IMAGES,
  SPA24_SUITES,
  SPA24_PILLARS,
  SPA24_JOURNEY,
  SPA24_BORDEAUX,
  SPA24_ONYX_SOFT,
  SPA24_FONT_BODY,
  SPA24_GOLD_LIGHT,
  SPA24_SIGNATURES,
  SPA24_THERAPISTS,
  SPA24_MEMBERSHIP,
  SPA24_FONT_SCRIPT,
  SPA24_FONT_DISPLAY,
  SPA24_TESTIMONIALS,
} from './spa24-data';

// ----------------------------------------------------------------------

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

const GoldRule = ({ width = 64 }: { width?: number }) => (
  <Box
    sx={{
      width,
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${SPA24_GOLD}, transparent)`,
    }}
  />
);

const Eyebrow = ({
  children,
  color = SPA24_GOLD,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
    <GoldRule width={48} />
    <Typography
      sx={{
        fontFamily: SPA24_FONT_BODY,
        fontSize: 11,
        letterSpacing: 6,
        fontWeight: 500,
        color,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
    <GoldRule width={48} />
  </Stack>
);

// ----------------------------------------------------------------------

function Hero() {
  const { t } = useTranslate('spa24');

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: SPA24_ONYX,
        color: SPA24_IVORY,
        overflow: 'hidden',
        minHeight: { xs: '100vh', md: '100vh' },
      }}
    >
      {/* Bg image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${SPA24_IMAGES.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 0%, ${SPA24_ONYX} 80%), linear-gradient(180deg, rgba(11,11,15,0.6), ${SPA24_ONYX} 100%)`,
        }}
      />

      {/* Top bar */}
      <Container maxWidth="xl" sx={{ position: 'relative', pt: { xs: 4, md: 6 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 38,
                height: 38,
                border: `1px solid ${SPA24_GOLD}`,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: SPA24_FONT_DISPLAY,
                  color: SPA24_GOLD,
                  fontSize: 18,
                  fontStyle: 'italic',
                }}
              >
                M
              </Typography>
            </Box>
            <Stack>
              <Typography
                sx={{
                  fontFamily: SPA24_FONT_DISPLAY,
                  fontSize: 14,
                  color: SPA24_IVORY,
                  lineHeight: 1,
                  letterSpacing: 4,
                }}
              >
                MAISON
              </Typography>
              <Typography
                sx={{
                  fontFamily: SPA24_FONT_DISPLAY,
                  fontSize: 11,
                  color: SPA24_GOLD,
                  letterSpacing: 6,
                }}
              >
                DE LUMIÈRE
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {(t('hero.nav', { returnObjects: true }) as string[]).map((n: string) => (
              <Typography
                key={n}
                sx={{
                  fontFamily: SPA24_FONT_BODY,
                  fontSize: 11,
                  letterSpacing: 3,
                  color: 'rgba(245,239,228,0.7)',
                  cursor: 'pointer',
                  '&:hover': { color: SPA24_GOLD },
                }}
              >
                {n.toUpperCase()}
              </Typography>
            ))}
          </Stack>
          <Button
            variant="outlined"
            sx={{
              borderColor: SPA24_GOLD,
              color: SPA24_GOLD,
              borderRadius: 0,
              px: 3,
              py: 1,
              fontFamily: SPA24_FONT_BODY,
              fontSize: 11,
              letterSpacing: 3,
              '&:hover': { borderColor: SPA24_GOLD_LIGHT, bgcolor: 'rgba(201,168,106,0.08)' },
            }}
          >
            {t('hero.cta')}
          </Button>
        </Stack>
      </Container>

      <Container
        maxWidth="lg"
        sx={{ position: 'relative', pt: { xs: 10, md: 16 }, pb: { xs: 10, md: 12 } }}
      >
        <Stack spacing={5} alignItems="center" textAlign="center">
          <m.div {...fadeUp}>
            <Typography
              sx={{
                fontFamily: SPA24_FONT_SCRIPT,
                fontSize: { xs: 36, md: 56 },
                color: SPA24_GOLD,
                lineHeight: 1,
              }}
            >
              {t('hero.tagline')}
            </Typography>
          </m.div>

          <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <Typography
              sx={{
                fontFamily: SPA24_FONT_DISPLAY,
                fontSize: { xs: 56, sm: 80, md: 128 },
                lineHeight: 0.95,
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: SPA24_IVORY,
              }}
            >
              {t('hero.title')}
              <Box
                component="span"
                sx={{ display: 'block', fontStyle: 'italic', color: SPA24_GOLD_LIGHT }}
              >
                {t('hero.titleAccent')}
              </Box>
            </Typography>
          </m.div>

          <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <GoldRule width={80} />
              <Typography
                sx={{
                  fontFamily: SPA24_FONT_BODY,
                  fontSize: 11,
                  letterSpacing: 8,
                  color: SPA24_GOLD,
                }}
              >
                {t('hero.eyebrow')}
              </Typography>
              <GoldRule width={80} />
            </Stack>
          </m.div>

          <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}>
            <Typography
              sx={{
                fontFamily: SPA24_FONT_DISPLAY,
                fontStyle: 'italic',
                fontSize: { xs: 18, md: 22 },
                maxWidth: 720,
                color: 'rgba(245,239,228,0.78)',
                lineHeight: 1.7,
              }}
            >
              {t('hero.subtitle')}
            </Typography>
          </m.div>

          <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Button
                sx={{
                  bgcolor: SPA24_GOLD,
                  color: SPA24_ONYX,
                  borderRadius: 0,
                  px: 5,
                  py: 1.8,
                  fontFamily: SPA24_FONT_BODY,
                  fontSize: 12,
                  letterSpacing: 4,
                  fontWeight: 600,
                  '&:hover': { bgcolor: SPA24_GOLD_LIGHT },
                }}
              >
                {t('reservation.cta1')}
              </Button>
              <Button
                startIcon={<Iconify icon="solar:play-bold" />}
                sx={{
                  color: SPA24_IVORY,
                  borderRadius: 0,
                  px: 4,
                  fontFamily: SPA24_FONT_BODY,
                  fontSize: 12,
                  letterSpacing: 3,
                }}
              >
                {t('reservation.cta2')}
              </Button>
            </Stack>
          </m.div>
        </Stack>
      </Container>

      {/* Press strip */}
      <Box
        sx={{
          position: 'relative',
          borderTop: `1px solid rgba(201,168,106,0.2)`,
          borderBottom: `1px solid rgba(201,168,106,0.2)`,
          py: 3,
          bgcolor: 'rgba(0,0,0,0.4)',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 0 }}
            justifyContent="space-around"
            alignItems="center"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderColor: 'rgba(201,168,106,0.2)', display: { xs: 'none', md: 'block' } }}
              />
            }
          >
            {(t('hero.press', { returnObjects: true }) as string[]).map((n: string) => (
              <Typography
                key={n}
                sx={{
                  fontFamily: SPA24_FONT_DISPLAY,
                  color: SPA24_GOLD,
                  letterSpacing: 6,
                  fontSize: 13,
                  fontStyle: 'italic',
                }}
              >
                {n}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Manifesto() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_IVORY, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          <Grid xs={12} md={6}>
            <m.div {...fadeUp}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={SPA24_IMAGES.manifesto}
                  sx={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    filter: 'sepia(0.1) contrast(0.95)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 16,
                    border: `1px solid ${SPA24_GOLD}`,
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -40,
                    right: -20,
                    bgcolor: SPA24_ONYX,
                    color: SPA24_GOLD,
                    p: 4,
                    maxWidth: 240,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontSize: 64,
                      lineHeight: 1,
                      fontStyle: 'italic',
                    }}
                  >
                    11
                  </Typography>
                  <Typography
                    sx={{ fontFamily: SPA24_FONT_BODY, fontSize: 11, letterSpacing: 3, mt: 1 }}
                  >
                    NĂM KIẾN TẠO NGHỆ THUẬT SỐNG ĐẸP
                  </Typography>
                </Box>
              </Box>
            </m.div>
          </Grid>
          <Grid xs={12} md={6}>
            <m.div {...fadeUp}>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <GoldRule width={48} />
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_BODY,
                      fontSize: 11,
                      letterSpacing: 6,
                      color: SPA24_BORDEAUX,
                    }}
                  >
                    {t('manifesto.eyebrow')}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_DISPLAY,
                    fontSize: { xs: 36, md: 56 },
                    color: SPA24_ONYX,
                    lineHeight: 1.05,
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t('manifesto.title')}{' '}
                  <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_BORDEAUX }}>
                    {t('manifesto.titleAccent')}
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 16,
                    color: 'rgba(11,11,15,0.7)',
                    lineHeight: 1.9,
                  }}
                >
                  {t('manifesto.description')}
                </Typography>
                <Typography
                  sx={{ fontFamily: SPA24_FONT_SCRIPT, fontSize: 36, color: SPA24_GOLD, mt: 1 }}
                >
                  {t('manifesto.quote')}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 11,
                    letterSpacing: 3,
                    color: 'rgba(11,11,15,0.5)',
                  }}
                >
                  {t('manifesto.role')}
                </Typography>
              </Stack>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Pillars() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_ONYX, color: SPA24_IVORY, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" mb={10}>
          <Eyebrow>{t('pillars.eyebrow')}</Eyebrow>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 56 },
              textAlign: 'center',
              fontWeight: 300,
              color: SPA24_IVORY,
              letterSpacing: '-0.01em',
            }}
          >
            {t('pillars.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_GOLD }}>
              {t('pillars.titleAccent')}
            </Box>
          </Typography>
        </Stack>
        <Grid container spacing={{ xs: 4, md: 0 }}>
          {SPA24_PILLARS.map((p, i) => (
            <Grid key={p.title} xs={12} sm={6} md={3}>
              <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <Stack
                  spacing={3}
                  sx={{
                    p: { xs: 3, md: 5 },
                    borderLeft: { md: i === 0 ? `1px solid rgba(201,168,106,0.25)` : 'none' },
                    borderRight: { md: `1px solid rgba(201,168,106,0.25)` },
                    minHeight: 320,
                  }}
                >
                  <Iconify icon={p.icon} sx={{ width: 48, height: 48, color: SPA24_GOLD }} />
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontSize: 28,
                      fontStyle: 'italic',
                      color: SPA24_IVORY,
                      lineHeight: 1.2,
                    }}
                  >
                    {p.title}
                  </Typography>
                  <GoldRule width={32} />
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_BODY,
                      fontSize: 14,
                      color: 'rgba(245,239,228,0.65)',
                      lineHeight: 1.8,
                    }}
                  >
                    {p.desc}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontStyle: 'italic',
                      color: SPA24_GOLD,
                      fontSize: 14,
                      mt: 'auto',
                    }}
                  >
                    0{i + 1} / 04
                  </Typography>
                </Stack>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Signatures() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_PEARL, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3} alignItems="center" mb={10}>
          <Eyebrow color={SPA24_BORDEAUX}>{t('signatures.eyebrow')}</Eyebrow>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 64 },
              textAlign: 'center',
              fontWeight: 300,
              color: SPA24_ONYX,
              lineHeight: 1.05,
            }}
          >
            {t('signatures.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_BORDEAUX }}>
              {t('signatures.titleAccent')}
            </Box>
          </Typography>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_BODY,
              fontSize: 15,
              textAlign: 'center',
              maxWidth: 640,
              color: 'rgba(11,11,15,0.65)',
              lineHeight: 1.8,
            }}
          >
            {t('signatures.description')}
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 8, md: 14 }}>
          {SPA24_SIGNATURES.map((s, i) => (
            <m.div key={s.code} {...fadeUp}>
              <Grid
                container
                spacing={{ xs: 4, md: 8 }}
                alignItems="center"
                direction={i % 2 === 0 ? 'row' : 'row-reverse'}
              >
                <Grid xs={12} sm={6} md={3}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={s.image}
                      sx={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        bgcolor: SPA24_ONYX,
                        color: SPA24_GOLD,
                        fontFamily: SPA24_FONT_DISPLAY,
                        fontStyle: 'italic',
                        fontSize: 28,
                        px: 2.5,
                        py: 1,
                        letterSpacing: 4,
                      }}
                    >
                      № {s.code}
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} md={9}>
                  <Stack
                    spacing={3}
                    sx={{ pl: { md: i % 2 === 0 ? 4 : 0 }, pr: { md: i % 2 === 0 ? 0 : 4 } }}
                  >
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_BODY,
                        fontSize: 11,
                        letterSpacing: 5,
                        color: SPA24_BORDEAUX,
                      }}
                    >
                      {s.subtitle.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_DISPLAY,
                        fontSize: { xs: 38, md: 56 },
                        fontStyle: 'italic',
                        color: SPA24_ONYX,
                        lineHeight: 1,
                        fontWeight: 300,
                      }}
                    >
                      {s.name}
                    </Typography>
                    <GoldRule width={64} />
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_BODY,
                        fontSize: 16,
                        color: 'rgba(11,11,15,0.7)',
                        lineHeight: 1.9,
                      }}
                    >
                      {s.desc}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={4}
                      alignItems="center"
                      sx={{ pt: 2, borderTop: `1px solid rgba(11,11,15,0.1)` }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            fontFamily: SPA24_FONT_BODY,
                            fontSize: 10,
                            letterSpacing: 3,
                            color: 'rgba(11,11,15,0.5)',
                          }}
                        >
                          THỜI LƯỢNG
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: SPA24_FONT_DISPLAY,
                            fontSize: 22,
                            color: SPA24_ONYX,
                            fontStyle: 'italic',
                          }}
                        >
                          {s.duration}
                        </Typography>
                      </Stack>
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: 'rgba(11,11,15,0.1)' }}
                      />
                      <Stack>
                        <Typography
                          sx={{
                            fontFamily: SPA24_FONT_BODY,
                            fontSize: 10,
                            letterSpacing: 3,
                            color: 'rgba(11,11,15,0.5)',
                          }}
                        >
                          ĐẦU TƯ
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: SPA24_FONT_DISPLAY,
                            fontSize: 22,
                            color: SPA24_BORDEAUX,
                            fontStyle: 'italic',
                          }}
                        >
                          {s.price}
                        </Typography>
                      </Stack>
                      <Button
                        sx={{
                          ml: 'auto',
                          bgcolor: SPA24_ONYX,
                          color: SPA24_GOLD,
                          borderRadius: 0,
                          px: 4,
                          py: 1.5,
                          fontFamily: SPA24_FONT_BODY,
                          fontSize: 11,
                          letterSpacing: 3,
                          '&:hover': { bgcolor: SPA24_ONYX_SOFT },
                        }}
                      >
                        ĐẶT
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </m.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Gems() {
  const { t } = useTranslate('spa24');
  const gems = [
    { name: 'Kim cương', detail: 'Bột vi tinh thể D-Flawless', icon: 'solar:diamond-bold-duotone' },
    { name: 'Saphir', detail: 'Đá nóng-lạnh xen kẽ', icon: 'solar:gem-bold-duotone' },
    {
      name: 'Ngọc trai Mikimoto',
      detail: 'Bột ngọc Akoya 9mm',
      icon: 'solar:moon-stars-bold-duotone',
    },
    {
      name: 'Thạch anh hồng',
      detail: 'Trị liệu năng lượng chakra',
      icon: 'solar:heart-shine-bold-duotone',
    },
    { name: 'Vàng 24K', detail: 'Lá vàng nguyên chất Nhật Bản', icon: 'solar:crown-bold-duotone' },
    {
      name: 'Bạc Sterling',
      detail: 'Mặt nạ kháng khuẩn ion bạc',
      icon: 'solar:cup-star-bold-duotone',
    },
  ];
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: SPA24_ONYX,
        color: SPA24_IVORY,
        py: { xs: 10, md: 18 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${SPA24_IMAGES.gems})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${SPA24_ONYX}, rgba(11,11,15,0.7), ${SPA24_ONYX})`,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Stack spacing={3} alignItems="center" mb={10}>
          <Eyebrow>{t('gems.eyebrow')}</Eyebrow>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 64 },
              textAlign: 'center',
              fontWeight: 300,
              color: SPA24_IVORY,
              lineHeight: 1.05,
            }}
          >
            {t('gems.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_GOLD }}>
              {t('gems.titleAccent')}
            </Box>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {gems.map((g, i) => (
            <Grid key={g.name} xs={6} md={4}>
              <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
                <Stack
                  spacing={2}
                  sx={{
                    p: { xs: 3, md: 5 },
                    border: `1px solid rgba(201,168,106,0.2)`,
                    height: '100%',
                    transition: 'all .4s',
                    '&:hover': { bgcolor: 'rgba(201,168,106,0.05)', borderColor: SPA24_GOLD },
                  }}
                >
                  <Iconify icon={g.icon} sx={{ width: 40, height: 40, color: SPA24_GOLD }} />
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontSize: 26,
                      fontStyle: 'italic',
                      color: SPA24_IVORY,
                    }}
                  >
                    {g.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_BODY,
                      fontSize: 13,
                      color: 'rgba(245,239,228,0.6)',
                      letterSpacing: 1,
                    }}
                  >
                    {g.detail}
                  </Typography>
                </Stack>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Journey() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_IVORY, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <GoldRule width={48} />
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_BODY,
                      fontSize: 11,
                      letterSpacing: 6,
                      color: SPA24_BORDEAUX,
                    }}
                  >
                    {t('journey.eyebrow')}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_DISPLAY,
                    fontSize: { xs: 40, md: 56 },
                    fontWeight: 300,
                    color: SPA24_ONYX,
                    lineHeight: 1.05,
                  }}
                >
                  {t('journey.title')}{' '}
                  <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_BORDEAUX }}>
                    {t('journey.titleAccent')}
                  </Box>
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 16,
                    color: 'rgba(11,11,15,0.7)',
                    lineHeight: 1.9,
                  }}
                >
                  {t('journey.description')}
                </Typography>
                <Typography
                  sx={{ fontFamily: SPA24_FONT_SCRIPT, fontSize: 48, color: SPA24_GOLD, mt: 2 }}
                >
                  {t('journey.duration')}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid xs={12} md={7}>
            <Stack spacing={0}>
              {SPA24_JOURNEY.map((j, i) => (
                <m.div
                  key={j.time}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                >
                  <Stack
                    direction="row"
                    spacing={4}
                    sx={{
                      py: 4,
                      borderBottom:
                        i === SPA24_JOURNEY.length - 1 ? 'none' : `1px solid rgba(11,11,15,0.1)`,
                    }}
                  >
                    <Box sx={{ minWidth: 80 }}>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_DISPLAY,
                          fontStyle: 'italic',
                          fontSize: 28,
                          color: SPA24_GOLD,
                        }}
                      >
                        {j.time}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_DISPLAY,
                          fontSize: 24,
                          color: SPA24_ONYX,
                          mb: 1,
                          fontWeight: 400,
                        }}
                      >
                        {j.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_BODY,
                          fontSize: 15,
                          color: 'rgba(11,11,15,0.65)',
                          lineHeight: 1.8,
                        }}
                      >
                        {j.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </m.div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Suites() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_ONYX_SOFT, color: SPA24_IVORY, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3} alignItems="center" mb={10}>
          <Eyebrow>{t('suites.eyebrow')}</Eyebrow>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 64 },
              textAlign: 'center',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            {t('suites.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_GOLD }}>
              {t('suites.titleAccent')}
            </Box>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {SPA24_SUITES.map((s, i) => (
            <Grid key={s.name} xs={12} sm={6} md={4}>
              <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover img': { transform: 'scale(1.05)' },
                  }}
                >
                  <Box
                    component="img"
                    src={s.image}
                    sx={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      transition: 'transform 1s ease',
                      filter: 'brightness(0.85)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(180deg, transparent 40%, ${SPA24_ONYX} 100%)`,
                    }}
                  />
                  <Stack
                    sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 4 }}
                    spacing={2}
                  >
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_BODY,
                        fontSize: 11,
                        letterSpacing: 4,
                        color: SPA24_GOLD,
                      }}
                    >
                      SUITE 0{i + 1} · {s.sqm.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_DISPLAY,
                        fontSize: 32,
                        fontStyle: 'italic',
                        color: SPA24_IVORY,
                        lineHeight: 1,
                      }}
                    >
                      {s.name}
                    </Typography>
                    <GoldRule width={48} />
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_BODY,
                        fontSize: 13,
                        color: 'rgba(245,239,228,0.75)',
                        lineHeight: 1.8,
                      }}
                    >
                      {s.feature}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 2 }}>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_BODY,
                          fontSize: 11,
                          letterSpacing: 3,
                          color: SPA24_GOLD,
                        }}
                      >
                        KHÁM PHÁ
                      </Typography>
                      <Iconify
                        icon="solar:arrow-right-linear"
                        sx={{ width: 16, height: 16, color: SPA24_GOLD }}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Therapists() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_IVORY, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" mb={10}>
          <Eyebrow color={SPA24_BORDEAUX}>{t('therapists.eyebrow')}</Eyebrow>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 56 },
              textAlign: 'center',
              fontWeight: 300,
              color: SPA24_ONYX,
              lineHeight: 1.05,
            }}
          >
            {t('therapists.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_BORDEAUX }}>
              {t('therapists.titleAccent')}
            </Box>
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          {SPA24_THERAPISTS.map((therapist: (typeof SPA24_THERAPISTS)[0], i: number) => (
            <Grid key={therapist.name} xs={12} sm={6} md={3}>
              <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <Stack spacing={2.5}>
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={therapist.image}
                      sx={{
                        width: '100%',
                        aspectRatio: '3/4',
                        objectFit: 'cover',
                        filter: 'grayscale(0.3) contrast(0.95)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: SPA24_ONYX,
                        color: SPA24_GOLD,
                        px: 1.5,
                        py: 0.5,
                        fontFamily: SPA24_FONT_BODY,
                        fontSize: 10,
                        letterSpacing: 2,
                      }}
                    >
                      {therapist.years} NĂM
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_DISPLAY,
                        fontSize: 22,
                        color: SPA24_ONYX,
                        lineHeight: 1.2,
                        fontStyle: 'italic',
                      }}
                    >
                      {therapist.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_BODY,
                        fontSize: 12,
                        color: SPA24_BORDEAUX,
                        letterSpacing: 2,
                        mt: 1,
                      }}
                    >
                      {therapist.title}
                    </Typography>
                  </Box>
                </Stack>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Membership() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_ONYX, color: SPA24_IVORY, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" mb={10}>
          <Eyebrow>{t('membership.eyebrow')}</Eyebrow>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 56 },
              textAlign: 'center',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            {t('membership.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_GOLD }}>
              {t('membership.titleAccent')}
            </Box>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {SPA24_MEMBERSHIP.map((m_, i) => (
            <Grid key={m_.tier} xs={12} sm={6} md={4}>
              <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <Box
                  sx={{
                    position: 'relative',
                    p: { xs: 4, md: 6 },
                    border: `1px solid ${m_.featured ? SPA24_GOLD : 'rgba(201,168,106,0.25)'}`,
                    bgcolor: m_.featured ? 'rgba(201,168,106,0.04)' : 'transparent',
                    height: '100%',
                    minHeight: 580,
                  }}
                >
                  {m_.featured && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: SPA24_GOLD,
                        color: SPA24_ONYX,
                        px: 2,
                        py: 0.5,
                        fontFamily: SPA24_FONT_BODY,
                        fontSize: 10,
                        letterSpacing: 3,
                        fontWeight: 600,
                      }}
                    >
                      RECOMMANDÉ
                    </Box>
                  )}
                  <Stack spacing={3} sx={{ height: '100%' }}>
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_DISPLAY,
                        fontStyle: 'italic',
                        fontSize: 14,
                        color: SPA24_GOLD,
                        letterSpacing: 6,
                      }}
                    >
                      {m_.tier}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: SPA24_FONT_DISPLAY,
                        fontSize: 38,
                        color: SPA24_IVORY,
                        lineHeight: 1,
                      }}
                    >
                      {m_.name}
                    </Typography>
                    <GoldRule width={48} />
                    <Stack direction="row" alignItems="baseline" spacing={1}>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_DISPLAY,
                          fontSize: 36,
                          color: SPA24_IVORY,
                          fontWeight: 300,
                        }}
                      >
                        {m_.price}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_BODY,
                          fontSize: 13,
                          color: 'rgba(245,239,228,0.5)',
                        }}
                      >
                        {m_.period}
                      </Typography>
                    </Stack>
                    <Stack spacing={2} sx={{ pt: 2 }}>
                      {m_.perks.map((p) => (
                        <Stack key={p} direction="row" spacing={2} alignItems="flex-start">
                          <Iconify
                            icon="solar:diamond-bold"
                            sx={{
                              width: 14,
                              height: 14,
                              color: SPA24_GOLD,
                              mt: 0.5,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: SPA24_FONT_BODY,
                              fontSize: 14,
                              color: 'rgba(245,239,228,0.8)',
                              lineHeight: 1.7,
                            }}
                          >
                            {p}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Box sx={{ mt: 'auto', pt: 4 }}>
                      <Button
                        fullWidth
                        sx={{
                          bgcolor: m_.featured ? SPA24_GOLD : 'transparent',
                          color: m_.featured ? SPA24_ONYX : SPA24_GOLD,
                          border: `1px solid ${SPA24_GOLD}`,
                          borderRadius: 0,
                          py: 1.8,
                          fontFamily: SPA24_FONT_BODY,
                          fontSize: 11,
                          letterSpacing: 4,
                          fontWeight: 600,
                          '&:hover': { bgcolor: SPA24_GOLD, color: SPA24_ONYX },
                        }}
                      >
                        ĐĂNG KÝ
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Testimonials() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_BORDEAUX, color: SPA24_IVORY, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" mb={10}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ width: 48, height: '1px', bgcolor: SPA24_GOLD }} />
            <Typography
              sx={{
                fontFamily: SPA24_FONT_BODY,
                fontSize: 11,
                letterSpacing: 6,
                color: SPA24_GOLD,
              }}
            >
              {t('testimonials.eyebrow')}
            </Typography>
            <Box sx={{ width: 48, height: '1px', bgcolor: SPA24_GOLD }} />
          </Stack>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 36, md: 56 },
              textAlign: 'center',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            {t('testimonials.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_GOLD_LIGHT }}>
              {t('testimonials.titleAccent')}
            </Box>
          </Typography>
        </Stack>
        <Grid container spacing={4}>
          {SPA24_TESTIMONIALS.map((testimonial: (typeof SPA24_TESTIMONIALS)[0], i: number) => (
            <Grid key={t.name} xs={12} sm={6} md={4}>
              <m.div {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
                <Stack
                  spacing={3}
                  sx={{ p: 4, borderTop: `1px solid rgba(201,168,106,0.4)`, height: '100%' }}
                >
                  <Iconify
                    icon="solar:quote-up-square-bold"
                    sx={{ width: 40, height: 40, color: SPA24_GOLD }}
                  />
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontStyle: 'italic',
                      fontSize: 19,
                      lineHeight: 1.7,
                      color: SPA24_IVORY,
                    }}
                  >
                    « {testimonial.quote} »
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ pt: 2, borderTop: `1px solid rgba(245,239,228,0.15)` }}
                  >
                    <Box
                      component="img"
                      src={testimonial.avatar}
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `1px solid ${SPA24_GOLD}`,
                      }}
                    />
                    <Stack>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_DISPLAY,
                          fontStyle: 'italic',
                          fontSize: 18,
                          color: SPA24_IVORY,
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: SPA24_FONT_BODY,
                          fontSize: 11,
                          letterSpacing: 2,
                          color: SPA24_GOLD_LIGHT,
                        }}
                      >
                        {testimonial.title.toUpperCase()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </m.div>
            </Grid>
          ))}
        </Grid>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={5}
          sx={{ mt: 10, pt: 6, borderTop: `1px solid rgba(201,168,106,0.3)` }}
          flexWrap="wrap"
        >
          {SPA24_PRESS.map((p) => (
            <Stack
              key={p.name}
              alignItems="center"
              spacing={1}
              sx={{ maxWidth: 260, textAlign: 'center', mb: 3 }}
            >
              <Typography
                sx={{
                  fontFamily: SPA24_FONT_DISPLAY,
                  fontStyle: 'italic',
                  color: SPA24_GOLD_LIGHT,
                  letterSpacing: 4,
                  fontSize: 14,
                }}
              >
                {p.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: SPA24_FONT_DISPLAY,
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: 'rgba(245,239,228,0.7)',
                }}
              >
                « {p.quote} »
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Faqs() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: SPA24_PEARL, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center" mb={8}>
          <Eyebrow color={SPA24_BORDEAUX}>{t('faqs.eyebrow')}</Eyebrow>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 52 },
              textAlign: 'center',
              fontWeight: 300,
              color: SPA24_ONYX,
              lineHeight: 1.1,
            }}
          >
            {t('faqs.title')}{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: SPA24_BORDEAUX }}>
              {t('faqs.titleAccent')}
            </Box>
          </Typography>
        </Stack>
        <Stack>
          {SPA24_FAQS.map((f, i) => (
            <Accordion
              key={i}
              disableGutters
              elevation={0}
              sx={{
                bgcolor: 'transparent',
                borderBottom: `1px solid rgba(11,11,15,0.15)`,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Iconify
                    icon="solar:add-circle-linear"
                    sx={{ color: SPA24_BORDEAUX, width: 24, height: 24 }}
                  />
                }
                sx={{ py: 2 }}
              >
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_DISPLAY,
                    fontSize: { xs: 19, md: 22 },
                    color: SPA24_ONYX,
                    fontWeight: 400,
                  }}
                >
                  {f.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 15,
                    color: 'rgba(11,11,15,0.7)',
                    lineHeight: 1.9,
                    pb: 2,
                  }}
                >
                  {f.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Reservation() {
  const { t } = useTranslate('spa24');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    ritual: '',
    date: '',
    notes: '',
  });

  return (
    <Box
      sx={{
        bgcolor: SPA24_ONYX,
        color: SPA24_IVORY,
        py: { xs: 10, md: 18 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${SPA24_IMAGES.atelier})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at top right, rgba(201,168,106,0.12), transparent 50%), ${SPA24_ONYX}`,
        }}
      />
      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Stack spacing={3} alignItems="center" mb={8}>
          <Typography
            sx={{ fontFamily: SPA24_FONT_SCRIPT, fontSize: 56, color: SPA24_GOLD, lineHeight: 1 }}
          >
            {t('reservation.title')}
          </Typography>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_DISPLAY,
              fontSize: { xs: 38, md: 56 },
              textAlign: 'center',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            {t('reservation.subtitle')}
          </Typography>
          <Typography
            sx={{
              fontFamily: SPA24_FONT_BODY,
              fontSize: 14,
              textAlign: 'center',
              maxWidth: 560,
              color: 'rgba(245,239,228,0.65)',
              lineHeight: 1.9,
            }}
          >
            {t('reservation.description')}
          </Typography>
        </Stack>

        <Box
          sx={{
            border: `1px solid ${SPA24_GOLD}`,
            p: { xs: 3, md: 6 },
            bgcolor: 'rgba(11,11,15,0.6)',
          }}
        >
          <Grid container spacing={3}>
            {[
              { k: 'name', label: t('reservation.name'), md: 6 },
              { k: 'email', label: t('reservation.email'), md: 6 },
              { k: 'phone', label: t('reservation.phone'), md: 6 },
              { k: 'date', label: t('reservation.date'), md: 6, type: 'date' },
            ].map((f) => (
              <Grid key={f.k} xs={12} sm={6} md={f.md as 6}>
                <TextField
                  fullWidth
                  variant="standard"
                  type={f.type || 'text'}
                  label={f.label}
                  value={(form as Record<string, string>)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  InputLabelProps={{
                    shrink: f.type === 'date' || undefined,
                    sx: {
                      color: 'rgba(245,239,228,0.6)',
                      fontFamily: SPA24_FONT_BODY,
                      fontSize: 12,
                      letterSpacing: 2,
                    },
                  }}
                  sx={{
                    '& .MuiInput-root': {
                      color: SPA24_IVORY,
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontSize: 20,
                      py: 1,
                    },
                    '& .MuiInput-underline:before': { borderBottomColor: 'rgba(201,168,106,0.3)' },
                    '& .MuiInput-underline:hover:before': {
                      borderBottomColor: `${SPA24_GOLD} !important`,
                    },
                    '& .MuiInput-underline:after': { borderBottomColor: SPA24_GOLD },
                  }}
                />
              </Grid>
            ))}
            <Grid xs={12}>
              <TextField
                select
                fullWidth
                variant="standard"
                label={t('reservation.ritual')}
                value={form.ritual}
                onChange={(e) => setForm({ ...form, ritual: e.target.value })}
                InputLabelProps={{
                  sx: {
                    color: 'rgba(245,239,228,0.6)',
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 12,
                    letterSpacing: 2,
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: SPA24_ONYX_SOFT,
                        color: SPA24_IVORY,
                        border: `1px solid ${SPA24_GOLD}`,
                      },
                    },
                  },
                }}
                sx={{
                  '& .MuiInput-root': {
                    color: SPA24_IVORY,
                    fontFamily: SPA24_FONT_DISPLAY,
                    fontSize: 20,
                    py: 1,
                  },
                  '& .MuiInput-underline:before': { borderBottomColor: 'rgba(201,168,106,0.3)' },
                  '& .MuiInput-underline:after': { borderBottomColor: SPA24_GOLD },
                  '& .MuiSvgIcon-root': { color: SPA24_GOLD },
                }}
              >
                {SPA24_SIGNATURES.map((s) => (
                  <MenuItem
                    key={s.code}
                    value={s.name}
                    sx={{ fontFamily: SPA24_FONT_DISPLAY, fontStyle: 'italic' }}
                  >
                    № {s.code} — {s.name} · {s.price}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                variant="standard"
                label={t('reservation.notes')}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                InputLabelProps={{
                  sx: {
                    color: 'rgba(245,239,228,0.6)',
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 12,
                    letterSpacing: 2,
                  },
                }}
                sx={{
                  '& .MuiInput-root': {
                    color: SPA24_IVORY,
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 15,
                  },
                  '& .MuiInput-underline:before': { borderBottomColor: 'rgba(201,168,106,0.3)' },
                  '& .MuiInput-underline:after': { borderBottomColor: SPA24_GOLD },
                }}
              />
            </Grid>
            <Grid xs={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                alignItems="center"
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Iconify icon="solar:shield-check-bold-duotone" sx={{ color: SPA24_GOLD }} />
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_BODY,
                      fontSize: 11,
                      letterSpacing: 2,
                      color: 'rgba(245,239,228,0.6)',
                    }}
                  >
                    {t('reservation.nda')}
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    bgcolor: SPA24_GOLD,
                    color: SPA24_ONYX,
                    borderRadius: 0,
                    px: 6,
                    py: 2,
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 12,
                    letterSpacing: 4,
                    fontWeight: 600,
                    '&:hover': { bgcolor: SPA24_GOLD_LIGHT },
                  }}
                >
                  {t('reservation.submit')}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Footer() {
  const { t } = useTranslate('spa24');
  return (
    <Box sx={{ bgcolor: '#050507', color: SPA24_IVORY, py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid xs={12} md={4}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    border: `1px solid ${SPA24_GOLD}`,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      color: SPA24_GOLD,
                      fontSize: 18,
                      fontStyle: 'italic',
                    }}
                  >
                    M
                  </Typography>
                </Box>
                <Stack>
                  <Typography
                    sx={{ fontFamily: SPA24_FONT_DISPLAY, fontSize: 14, letterSpacing: 4 }}
                  >
                    MAISON
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontSize: 11,
                      color: SPA24_GOLD,
                      letterSpacing: 6,
                    }}
                  >
                    DE LUMIÈRE
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                sx={{
                  fontFamily: SPA24_FONT_DISPLAY,
                  fontStyle: 'italic',
                  fontSize: 16,
                  color: 'rgba(245,239,228,0.65)',
                  lineHeight: 1.8,
                }}
              >
                {t('footer.description')}
              </Typography>
              <Stack direction="row" spacing={1}>
                {[
                  'ri:instagram-line',
                  'ri:facebook-fill',
                  'ri:youtube-fill',
                  'ri:pinterest-fill',
                ].map((ic) => (
                  <IconButton
                    key={ic}
                    sx={{
                      border: `1px solid rgba(201,168,106,0.3)`,
                      borderRadius: 0,
                      color: SPA24_GOLD,
                      '&:hover': { borderColor: SPA24_GOLD, bgcolor: 'rgba(201,168,106,0.08)' },
                    }}
                  >
                    <Iconify icon={ic} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>
          {[
            { title: 'MAISON', items: t('footer.sections.maison', { returnObjects: true }) },
            { title: 'NGHI LỄ', items: t('footer.sections.rituals', { returnObjects: true }) },
            {
              title: 'LIÊN HỆ',
              items: t('footer.sections.contact', { returnObjects: true }),
            },
          ].map((col) => (
            <Grid key={col.title} xs={6} md={col.title === 'LIÊN HỆ' ? 4 : 2}>
              <Stack spacing={2.5}>
                <Typography
                  sx={{
                    fontFamily: SPA24_FONT_BODY,
                    fontSize: 11,
                    letterSpacing: 5,
                    color: SPA24_GOLD,
                  }}
                >
                  {col.title}
                </Typography>
                <GoldRule width={32} />
                {(col.items as string[]).map((it: string) => (
                  <Typography
                    key={it}
                    sx={{
                      fontFamily: SPA24_FONT_DISPLAY,
                      fontStyle: 'italic',
                      fontSize: 15,
                      color: 'rgba(245,239,228,0.7)',
                      cursor: 'pointer',
                      '&:hover': { color: SPA24_GOLD },
                    }}
                  >
                    {it}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 8, pt: 4, borderTop: `1px solid rgba(201,168,106,0.2)` }}
        >
          <Typography
            sx={{
              fontFamily: SPA24_FONT_BODY,
              fontSize: 11,
              letterSpacing: 2,
              color: 'rgba(245,239,228,0.4)',
            }}
          >
            {t('footer.copyright')}
          </Typography>
          <Stack direction="row" spacing={3}>
            {(t('footer.badges', { returnObjects: true }) as string[]).map((badge: string) => (
              <Chip
                key={badge}
                label={badge}
                size="small"
                sx={{
                  bgcolor: 'transparent',
                  color: SPA24_GOLD,
                  border: `1px solid ${SPA24_GOLD}`,
                  borderRadius: 0,
                  fontFamily: SPA24_FONT_BODY,
                  fontSize: 10,
                  letterSpacing: 2,
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa24View() {
  const pageProgress = useScrollProgress();
  return (
    <Box sx={{ bgcolor: SPA24_ONYX, fontFamily: SPA24_FONT_BODY }}>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />
      <BackToTop />

      <Hero />
      <Manifesto />
      <Pillars />
      <Signatures />
      <Gems />
      <Journey />
      <Suites />
      <Therapists />
      <Membership />
      <Testimonials />
      <Faqs />
      <Reservation />
      <Footer />
    </Box>
  );
}
