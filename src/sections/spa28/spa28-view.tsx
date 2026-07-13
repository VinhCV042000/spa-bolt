import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { BackToTop } from 'src/components/animate/back-to-top';
import { varFade, MotionViewport } from 'src/components/animate';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import {
  POP_HOT,
  POP_INK,
  POP_LIME,
  POP_CANDY,
  POP_LILAC,
  POP_CREAM,
  POP_BUBBLE,
  SPA28_HERO,
  SPA28_MENU,
  SPA28_TEAM,
  SPA28_VIBES,
  SPA28_PERKS,
  SPA28_REVIEWS,
  SPA28_LOOKBOOK,
  SPA28_LOCATION,
} from './spa28-data';

const DISPLAY = '"Archivo Black", "Anton", sans-serif';
const BODY = '"Space Grotesk", "Inter", sans-serif';

function Marquee({ text, bg, color }: { text: string; bg: string; color: string }) {
  return (
    <Box
      sx={{
        bgcolor: bg,
        py: 2,
        overflow: 'hidden',
        borderTop: `3px solid ${POP_INK}`,
        borderBottom: `3px solid ${POP_INK}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'scroll 30s linear infinite',
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <Typography
            key={i}
            sx={{ fontFamily: DISPLAY, fontSize: 28, color, px: 4, letterSpacing: 2 }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

function Hero() {
  return (
    <Box
      sx={{
        bgcolor: POP_CANDY,
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `4px solid ${POP_INK}`,
      }}
    >
      {/* Sticker shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          right: 60,
          width: 80,
          height: 80,
          bgcolor: POP_LIME,
          borderRadius: '50%',
          border: `4px solid ${POP_INK}`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 120,
          left: 40,
          width: 120,
          height: 120,
          bgcolor: POP_LILAC,
          transform: 'rotate(15deg)',
          border: `4px solid ${POP_INK}`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '5%',
          fontSize: 80,
          transform: 'rotate(-15deg)',
        }}
      >
        🦋
      </Box>

      <Container
        component={MotionViewport}
        sx={{ py: { xs: 10, md: 16 }, position: 'relative' }}
        maxWidth="xl"
      >
        <m.div variants={varFade().inUp}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: POP_INK,
              color: POP_LIME,
              px: 3,
              py: 1,
              fontFamily: DISPLAY,
              fontSize: 14,
              letterSpacing: 3,
              mb: 5,
              transform: 'rotate(-2deg)',
            }}
          >
            {SPA28_HERO.eyebrow}
          </Box>
        </m.div>

        <m.div variants={varFade({ distance: 80 }).inUp}>
          <Typography
            sx={{
              fontFamily: DISPLAY,
              fontSize: { xs: 80, md: 200 },
              color: POP_INK,
              lineHeight: 0.85,
              letterSpacing: -4,
            }}
          >
            {SPA28_HERO.title1}
          </Typography>
          <Typography
            sx={{
              fontFamily: DISPLAY,
              fontSize: { xs: 60, md: 160 },
              color: POP_HOT,
              lineHeight: 0.85,
              letterSpacing: -3,
              ml: { md: 10 },
              WebkitTextStroke: `3px ${POP_INK}`,
            }}
          >
            {SPA28_HERO.title2}
          </Typography>
          <Typography
            sx={{
              fontFamily: DISPLAY,
              fontSize: { xs: 100, md: 240 },
              color: POP_LILAC,
              lineHeight: 0.85,
              letterSpacing: -6,
              ml: { md: 20 },
              WebkitTextStroke: `3px ${POP_INK}`,
            }}
          >
            {SPA28_HERO.title3}
          </Typography>
        </m.div>

        <Grid container spacing={4} sx={{ mt: 6 }} alignItems="center">
          <Grid xs={12} md={6}>
            <Typography
              sx={{
                fontFamily: BODY,
                fontSize: 17,
                color: POP_INK,
                lineHeight: 1.7,
                maxWidth: 480,
                fontWeight: 500,
              }}
            >
              {SPA28_HERO.desc}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                sx={{
                  px: 4,
                  py: 2,
                  bgcolor: POP_HOT,
                  color: '#fff',
                  fontFamily: DISPLAY,
                  fontSize: 14,
                  letterSpacing: 2,
                  border: `3px solid ${POP_INK}`,
                  borderRadius: 0,
                  boxShadow: `6px 6px 0 ${POP_INK}`,
                  '&:hover': {
                    transform: 'translate(2px,2px)',
                    boxShadow: `4px 4px 0 ${POP_INK}`,
                    bgcolor: POP_HOT,
                  },
                  transition: 'all 0.15s',
                }}
              >
                {SPA28_HERO.cta1}
              </Button>
              <Button
                sx={{
                  px: 4,
                  py: 2,
                  bgcolor: POP_LIME,
                  color: POP_INK,
                  fontFamily: DISPLAY,
                  fontSize: 14,
                  letterSpacing: 2,
                  border: `3px solid ${POP_INK}`,
                  borderRadius: 0,
                  boxShadow: `6px 6px 0 ${POP_INK}`,
                  '&:hover': {
                    transform: 'translate(2px,2px)',
                    boxShadow: `4px 4px 0 ${POP_INK}`,
                    bgcolor: POP_LIME,
                  },
                  transition: 'all 0.15s',
                }}
              >
                {SPA28_HERO.cta2}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Marquee text={SPA28_HERO.marquee} bg={POP_INK} color={POP_LIME} />
    </Box>
  );
}

function Vibes() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: POP_CREAM }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontSize: { xs: 48, md: 96 },
            color: POP_INK,
            mb: 6,
            lineHeight: 0.9,
          }}
        >
          THE{' '}
          <Box component="span" sx={{ color: POP_HOT, WebkitTextStroke: `2px ${POP_INK}` }}>
            VIBES
          </Box>
        </Typography>
        <Grid container spacing={3}>
          {SPA28_VIBES.map((v, i) => (
            <Grid xs={12} sm={6} md={4} key={v.title}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    bgcolor: v.color,
                    border: `3px solid ${POP_INK}`,
                    p: 4,
                    height: '100%',
                    boxShadow: `8px 8px 0 ${POP_INK}`,
                    transform: i % 2 ? 'rotate(-1deg)' : 'rotate(1deg)',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'rotate(0) translateY(-6px)',
                      boxShadow: `12px 12px 0 ${POP_INK}`,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: 60, mb: 2 }}>{v.emoji}</Typography>
                  <Typography sx={{ fontFamily: DISPLAY, fontSize: 32, color: POP_INK, mb: 1 }}>
                    {v.title}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: BODY, fontSize: 14, color: POP_INK, fontWeight: 500 }}
                  >
                    {v.desc}
                  </Typography>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function MenuSection() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: POP_HOT,
        borderTop: `4px solid ${POP_INK}`,
        borderBottom: `4px solid ${POP_INK}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'flex-end' }}
          justifyContent="space-between"
          sx={{ mb: 6 }}
        >
          <Typography
            sx={{
              fontFamily: DISPLAY,
              fontSize: { xs: 64, md: 120 },
              color: POP_CREAM,
              lineHeight: 0.9,
              WebkitTextStroke: `3px ${POP_INK}`,
            }}
          >
            MENU
          </Typography>
          <Typography sx={{ fontFamily: BODY, color: POP_INK, fontSize: 14, fontWeight: 600 }}>
            ★ Giá đã bao gồm VAT ★
          </Typography>
        </Stack>
        <Box
          sx={{
            bgcolor: POP_CREAM,
            border: `4px solid ${POP_INK}`,
            boxShadow: `12px 12px 0 ${POP_INK}`,
          }}
        >
          {SPA28_MENU.map((m2, i) => (
            <Stack
              key={m2.name}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: { xs: 3, md: 5 },
                py: 3,
                borderBottom: i < SPA28_MENU.length - 1 ? `2px dashed ${POP_INK}` : 'none',
                '&:hover': { bgcolor: POP_LIME },
                transition: 'all 0.2s',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography
                  sx={{ fontFamily: DISPLAY, fontSize: { xs: 20, md: 28 }, color: POP_INK }}
                >
                  {m2.name}
                </Typography>
                <Box
                  sx={{
                    bgcolor: POP_INK,
                    color: POP_LIME,
                    px: 1.5,
                    py: 0.3,
                    fontFamily: DISPLAY,
                    fontSize: 10,
                    letterSpacing: 1,
                  }}
                >
                  {m2.tag}
                </Box>
              </Stack>
              <Typography
                sx={{
                  fontFamily: DISPLAY,
                  fontSize: { xs: 22, md: 32 },
                  color: POP_HOT,
                  WebkitTextStroke: `1.5px ${POP_INK}`,
                }}
              >
                {m2.price}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function Lookbook() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: POP_CANDY }}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="baseline" spacing={3} sx={{ mb: 6, flexWrap: 'wrap' }}>
          <Typography
            sx={{
              fontFamily: DISPLAY,
              fontSize: { xs: 48, md: 96 },
              color: POP_INK,
              lineHeight: 0.9,
            }}
          >
            LOOK
          </Typography>
          <Typography
            sx={{
              fontFamily: DISPLAY,
              fontSize: { xs: 48, md: 96 },
              color: POP_HOT,
              lineHeight: 0.9,
              WebkitTextStroke: `2px ${POP_INK}`,
              fontStyle: 'italic',
            }}
          >
            BOOK
          </Typography>
          <Typography sx={{ fontFamily: BODY, color: POP_INK, fontSize: 14, fontWeight: 600 }}>
            2026 collection
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {SPA28_LOOKBOOK.map((src, i) => (
            <Grid xs={6} md={3} key={src}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    position: 'relative',
                    border: `3px solid ${POP_INK}`,
                    transform:
                      i % 3 === 0
                        ? 'rotate(-2deg)'
                        : i % 3 === 1
                          ? 'rotate(1deg)'
                          : 'rotate(-1deg)',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'rotate(0) scale(1.05)', zIndex: 2 },
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    sx={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: POP_LIME,
                      border: `2px solid ${POP_INK}`,
                      px: 1,
                      fontFamily: DISPLAY,
                      fontSize: 11,
                    }}
                  >
                    #{String(i + 1).padStart(2, '0')}
                  </Box>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Team() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: POP_LILAC, borderTop: `4px solid ${POP_INK}` }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontSize: { xs: 48, md: 96 },
            color: POP_INK,
            mb: 6,
            lineHeight: 0.9,
            textAlign: 'center',
          }}
        >
          MEET THE{' '}
          <Box component="span" sx={{ color: POP_LIME, WebkitTextStroke: `3px ${POP_INK}` }}>
            SQUAD
          </Box>
        </Typography>
        <Grid container spacing={4}>
          {SPA28_TEAM.map((t, i) => (
            <Grid xs={6} md={3} key={t.name}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    bgcolor: t.color,
                    border: `3px solid ${POP_INK}`,
                    p: 3,
                    textAlign: 'center',
                    boxShadow: `8px 8px 0 ${POP_INK}`,
                    transform: i % 2 ? 'rotate(2deg)' : 'rotate(-2deg)',
                  }}
                >
                  <Box
                    sx={{
                      width: 110,
                      height: 110,
                      borderRadius: '50%',
                      bgcolor: POP_CREAM,
                      border: `3px solid ${POP_INK}`,
                      mx: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 56,
                      mb: 2,
                    }}
                  >
                    {t.emoji}
                  </Box>
                  <Typography sx={{ fontFamily: DISPLAY, fontSize: 26, color: POP_INK }}>
                    {t.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: BODY,
                      fontSize: 12,
                      color: POP_INK,
                      fontWeight: 600,
                      letterSpacing: 1,
                    }}
                  >
                    {t.role}
                  </Typography>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Perks() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 14 },
        bgcolor: POP_LIME,
        borderTop: `4px solid ${POP_INK}`,
        borderBottom: `4px solid ${POP_INK}`,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontSize: { xs: 48, md: 96 },
            color: POP_INK,
            mb: 6,
            lineHeight: 0.9,
          }}
        >
          + PERKS
        </Typography>
        <Grid container spacing={3}>
          {SPA28_PERKS.map((p) => (
            <Grid xs={12} sm={6} md={3} key={p.title}>
              <Box
                sx={{ bgcolor: POP_CREAM, border: `3px solid ${POP_INK}`, p: 3, height: '100%' }}
              >
                <Typography sx={{ fontSize: 48, mb: 1 }}>{p.icon}</Typography>
                <Typography sx={{ fontFamily: DISPLAY, fontSize: 22, color: POP_INK, mb: 0.5 }}>
                  {p.title}
                </Typography>
                <Typography
                  sx={{ fontFamily: BODY, fontSize: 14, color: POP_INK, fontWeight: 500 }}
                >
                  {p.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Reviews() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: POP_CREAM }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontSize: { xs: 48, md: 96 },
            color: POP_INK,
            mb: 6,
            lineHeight: 0.9,
            textAlign: 'center',
          }}
        >
          ♡{' '}
          <Box component="span" sx={{ color: POP_HOT, WebkitTextStroke: `2px ${POP_INK}` }}>
            REAL TALK
          </Box>{' '}
          ♡
        </Typography>
        <Grid container spacing={3}>
          {SPA28_REVIEWS.map((r, i) => (
            <Grid xs={12} sm={6} key={r.name}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    bgcolor: [POP_CANDY, POP_LILAC, POP_LIME, POP_BUBBLE][i % 4],
                    border: `3px solid ${POP_INK}`,
                    p: 4,
                    boxShadow: `6px 6px 0 ${POP_INK}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: BODY,
                      fontSize: 16,
                      color: POP_INK,
                      fontWeight: 500,
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    {r.text}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontFamily: DISPLAY, fontSize: 16, color: POP_INK }}>
                      {r.name}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{'★'.repeat(r.stars)}</Typography>
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

function Location() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: POP_INK,
        color: POP_CREAM,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: POP_HOT,
          opacity: 0.4,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontSize: { xs: 64, md: 140 },
            color: POP_HOT,
            lineHeight: 0.9,
            WebkitTextStroke: `3px ${POP_LIME}`,
          }}
        >
          PULL UP
        </Typography>
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontSize: { xs: 48, md: 100 },
            color: POP_LIME,
            lineHeight: 0.9,
            mb: 6,
          }}
        >
          BABE ♡
        </Typography>
        <Grid container spacing={4}>
          {[
            { label: 'WHERE', value: SPA28_LOCATION.address },
            { label: 'CALL', value: SPA28_LOCATION.phone },
            { label: 'INSTA', value: SPA28_LOCATION.insta },
            { label: 'OPEN', value: SPA28_LOCATION.hours },
          ].map((item) => (
            <Grid xs={12} sm={6} md={3} key={item.label}>
              <Typography
                sx={{ fontFamily: DISPLAY, color: POP_LIME, fontSize: 12, letterSpacing: 3, mb: 1 }}
              >
                ★ {item.label}
              </Typography>
              <Typography
                sx={{ fontFamily: BODY, fontSize: 18, color: POP_CREAM, fontWeight: 600 }}
              >
                {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Button
          sx={{
            mt: 8,
            px: 6,
            py: 2.5,
            bgcolor: POP_HOT,
            color: '#fff',
            fontFamily: DISPLAY,
            fontSize: 18,
            letterSpacing: 3,
            border: `3px solid ${POP_LIME}`,
            borderRadius: 0,
            boxShadow: `8px 8px 0 ${POP_LIME}`,
            '&:hover': {
              transform: 'translate(2px,2px)',
              boxShadow: `4px 4px 0 ${POP_LIME}`,
              bgcolor: POP_HOT,
            },
            transition: 'all 0.15s',
          }}
        >
          BOOK YOUR GLOW UP ↗
        </Button>
      </Container>
    </Box>
  );
}

export function Spa28View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Hero />
      <Vibes />
      <MenuSection />
      <Lookbook />
      <Team />
      <Perks />
      <Reviews />
      <Location />
    </>
  );
}
