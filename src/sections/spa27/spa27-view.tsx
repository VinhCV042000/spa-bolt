import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { Iconify } from 'src/components/iconify';
import { BackToTop } from 'src/components/animate/back-to-top';
import { varFade, MotionViewport } from 'src/components/animate';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import {
  ROSE_INK,
  ROSE_PINK,
  ROSE_DEEP,
  ROSE_GOLD,
  ROSE_BLUSH,
  ROSE_CREAM,
  ROSE_MUTED,
  SPA27_HERO,
  SPA27_FAQS,
  SPA27_RITUAL,
  SPA27_CONTACT,
  SPA27_SERVICES,
  SPA27_PRODUCTS,
  SPA27_PHILOSOPHY,
  SPA27_THERAPISTS,
  SPA27_TESTIMONIALS,
} from './spa27-data';

const SERIF = '"Cormorant Garamond", "Playfair Display", serif';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        color: ROSE_DEEP,
        letterSpacing: 4,
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        mb: 2,
      }}
    >
      — {children}
    </Typography>
  );
}

function Hero() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${ROSE_CREAM} 0%, ${ROSE_BLUSH} 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ROSE_PINK}80 0%, transparent 70%)`,
        }}
      />
      <Container component={MotionViewport} maxWidth="xl" sx={{ position: 'relative', py: 12 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid xs={12} md={6}>
            <m.div variants={varFade().inUp}>
              <Typography
                sx={{
                  color: ROSE_DEEP,
                  letterSpacing: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  mb: 4,
                  textTransform: 'uppercase',
                }}
              >
                {SPA27_HERO.eyebrow}
              </Typography>
            </m.div>
            <m.div variants={varFade({ distance: 60 }).inUp}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: SERIF,
                  fontSize: { xs: 80, md: 160 },
                  fontWeight: 400,
                  color: ROSE_INK,
                  lineHeight: 0.9,
                  fontStyle: 'italic',
                }}
              >
                {SPA27_HERO.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontSize: { xs: 60, md: 120 },
                  fontWeight: 300,
                  color: ROSE_DEEP,
                  lineHeight: 0.9,
                  ml: { md: 12 },
                }}
              >
                {SPA27_HERO.titleAccent}
              </Typography>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Typography sx={{ mt: 5, color: ROSE_INK, fontSize: 18, fontWeight: 500 }}>
                {SPA27_HERO.subtitle}
              </Typography>
              <Typography
                sx={{ mt: 2, color: ROSE_MUTED, fontSize: 15, lineHeight: 1.8, maxWidth: 480 }}
              >
                {SPA27_HERO.description}
              </Typography>
            </m.div>
            <m.div variants={varFade().inUp}>
              <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                <Button
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.8,
                    bgcolor: ROSE_DEEP,
                    color: '#fff',
                    borderRadius: 50,
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    '&:hover': { bgcolor: ROSE_INK },
                  }}
                >
                  Đặt lịch ngay
                </Button>
                <Button
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.8,
                    color: ROSE_INK,
                    borderRadius: 50,
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    border: `1px solid ${ROSE_INK}`,
                    '&:hover': { bgcolor: '#fff' },
                  }}
                >
                  Khám phá services
                </Button>
              </Stack>
            </m.div>
            <Stack direction="row" spacing={4} sx={{ mt: 6, flexWrap: 'wrap' }}>
              {SPA27_HERO.badges.map((b) => (
                <Typography
                  key={b}
                  sx={{
                    color: ROSE_MUTED,
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ {b}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <m.div variants={varFade({ distance: 80 }).inRight}>
              <Box sx={{ position: 'relative', height: { xs: 400, md: 640 } }}>
                <Box
                  component="img"
                  src={SPA27_HERO.hero}
                  sx={{
                    width: '85%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50% 50% 8px 8px / 40% 40% 8px 8px',
                    boxShadow: `0 30px 60px ${ROSE_PINK}80`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 40,
                    right: 0,
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    bgcolor: ROSE_GOLD,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: SERIF,
                    fontSize: 22,
                    fontStyle: 'italic',
                    color: '#fff',
                    textAlign: 'center',
                    p: 3,
                    boxShadow: `0 20px 40px ${ROSE_GOLD}60`,
                  }}
                >
                  Bloom your beauty
                </Box>
              </Box>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Philosophy() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: ROSE_CREAM }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <Box
                component="img"
                src={SPA27_PHILOSOPHY.image}
                sx={{ width: '100%', borderRadius: 4, aspectRatio: '3/4', objectFit: 'cover' }}
              />
            </m.div>
          </Grid>
          <Grid xs={12} md={7}>
            <SectionLabel>{SPA27_PHILOSOPHY.eyebrow}</SectionLabel>
            <m.div variants={varFade().inUp}>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontSize: { xs: 36, md: 56 },
                  fontWeight: 400,
                  color: ROSE_INK,
                  lineHeight: 1.1,
                  fontStyle: 'italic',
                }}
              >
                {SPA27_PHILOSOPHY.title}
              </Typography>
              <Typography sx={{ mt: 4, color: ROSE_MUTED, fontSize: 15, lineHeight: 1.9 }}>
                {SPA27_PHILOSOPHY.body}
              </Typography>
            </m.div>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {SPA27_PHILOSOPHY.stats.map((s) => (
                <Grid xs={6} md={3} key={s.label}>
                  <Typography
                    sx={{ fontFamily: SERIF, fontSize: 40, color: ROSE_DEEP, fontWeight: 500 }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{
                      color: ROSE_MUTED,
                      fontSize: 11,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Services() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fff' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <SectionLabel>Signature Services</SectionLabel>
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 40, md: 64 },
              color: ROSE_INK,
              fontStyle: 'italic',
            }}
          >
            Liệu trình ký kết
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {SPA27_SERVICES.map((s) => (
            <Grid xs={12} sm={6} md={4} key={s.no}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 4,
                    bgcolor: ROSE_CREAM,
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${ROSE_PINK}60`,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={s.img}
                    sx={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 3, mb: 3 }}
                  />
                  <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography
                      sx={{ color: ROSE_DEEP, fontSize: 12, letterSpacing: 2, fontWeight: 600 }}
                    >
                      {s.no}
                    </Typography>
                    <Typography sx={{ color: ROSE_MUTED, fontSize: 11 }}>{s.duration}</Typography>
                  </Stack>
                  <Typography
                    sx={{ fontFamily: SERIF, fontSize: 28, color: ROSE_INK, mt: 1, mb: 1 }}
                  >
                    {s.name}
                  </Typography>
                  <Typography sx={{ color: ROSE_MUTED, fontSize: 13, lineHeight: 1.7, mb: 2 }}>
                    {s.desc}
                  </Typography>
                  <Typography sx={{ color: ROSE_DEEP, fontSize: 18, fontWeight: 600 }}>
                    {s.price}
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

function Ritual() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${ROSE_BLUSH} 0%, ${ROSE_CREAM} 100%)`,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <SectionLabel>The Ritual</SectionLabel>
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 40, md: 64 },
              color: ROSE_INK,
              fontStyle: 'italic',
            }}
          >
            {SPA27_RITUAL.title}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {SPA27_RITUAL.steps.map((step, i) => (
            <Grid xs={12} sm={6} md={3} key={step.no}>
              <m.div variants={varFade().inUp}>
                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      mx: 'auto',
                      mb: 3,
                      bgcolor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${ROSE_PINK}`,
                      fontFamily: SERIF,
                      fontSize: 36,
                      color: ROSE_DEEP,
                      fontStyle: 'italic',
                    }}
                  >
                    {step.no}
                  </Box>
                  <Typography sx={{ fontFamily: SERIF, fontSize: 24, color: ROSE_INK, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: ROSE_MUTED, fontSize: 13, lineHeight: 1.7 }}>
                    {step.desc}
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

function Products() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fff' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'flex-end' }}
          sx={{ mb: 8 }}
        >
          <Box>
            <SectionLabel>Rosé Cosmetics</SectionLabel>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: { xs: 36, md: 56 },
                color: ROSE_INK,
                fontStyle: 'italic',
              }}
            >
              Bộ sưu tập riêng
            </Typography>
          </Box>
          <Button
            sx={{ color: ROSE_DEEP, fontSize: 12, letterSpacing: 2, fontWeight: 600 }}
            endIcon={<Iconify icon="solar:arrow-right-bold" />}
          >
            Xem toàn bộ
          </Button>
        </Stack>
        <Grid container spacing={4}>
          {SPA27_PRODUCTS.map((p) => (
            <Grid xs={6} md={3} key={p.name}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    bgcolor: ROSE_CREAM,
                    borderRadius: 4,
                    p: 3,
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    '&:hover': { bgcolor: ROSE_BLUSH },
                  }}
                >
                  <Box
                    component="img"
                    src={p.img}
                    sx={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 3, mb: 2 }}
                  />
                  <Typography sx={{ fontFamily: SERIF, fontSize: 20, color: ROSE_INK }}>
                    {p.name}
                  </Typography>
                  <Typography sx={{ color: ROSE_DEEP, fontSize: 15, fontWeight: 600, mt: 1 }}>
                    {p.price}
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

function Therapists() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: ROSE_BLUSH }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <SectionLabel>The Atelier Team</SectionLabel>
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 40, md: 64 },
              color: ROSE_INK,
              fontStyle: 'italic',
            }}
          >
            Đội ngũ nghệ nhân
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {SPA27_THERAPISTS.map((t) => (
            <Grid xs={6} md={3} key={t.name}>
              <m.div variants={varFade().inUp}>
                <Box
                  component="img"
                  src={t.img}
                  sx={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    borderRadius: '8px 8px 200px 200px',
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: SERIF,
                    fontSize: 24,
                    color: ROSE_INK,
                    mt: 3,
                    textAlign: 'center',
                  }}
                >
                  {t.name}
                </Typography>
                <Typography
                  sx={{
                    color: ROSE_DEEP,
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    mt: 0.5,
                  }}
                >
                  {t.role}
                </Typography>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function Testimonials() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: ROSE_CREAM }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <SectionLabel>Love Letters</SectionLabel>
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 40, md: 64 },
              color: ROSE_INK,
              fontStyle: 'italic',
            }}
          >
            Khách hàng nói gì
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {SPA27_TESTIMONIALS.map((t) => (
            <Grid xs={12} md={4} key={t.name}>
              <m.div variants={varFade().inUp}>
                <Box
                  sx={{
                    bgcolor: '#fff',
                    p: 4,
                    borderRadius: 4,
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: SERIF,
                      fontSize: 80,
                      color: ROSE_PINK,
                      position: 'absolute',
                      top: -10,
                      left: 16,
                      lineHeight: 1,
                    }}
                  >
                    “
                  </Typography>
                  <Typography
                    sx={{
                      color: ROSE_INK,
                      fontSize: 15,
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                      mt: 4,
                      mb: 3,
                    }}
                  >
                    {t.text}
                  </Typography>
                  <Typography sx={{ fontFamily: SERIF, fontSize: 18, color: ROSE_INK }}>
                    {t.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: ROSE_DEEP,
                      fontSize: 11,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
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

function Faqs() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fff' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <SectionLabel>FAQ</SectionLabel>
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 40, md: 56 },
              color: ROSE_INK,
              fontStyle: 'italic',
            }}
          >
            Câu hỏi thường gặp
          </Typography>
        </Box>
        {SPA27_FAQS.map((f, i) => (
          <Accordion
            key={i}
            sx={{ bgcolor: ROSE_CREAM, mb: 2, borderRadius: 3, '&:before': { display: 'none' } }}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<Iconify icon="solar:alt-arrow-down-bold" sx={{ color: ROSE_DEEP }} />}
            >
              <Typography sx={{ fontFamily: SERIF, fontSize: 20, color: ROSE_INK }}>
                {f.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: ROSE_MUTED, fontSize: 14, lineHeight: 1.8 }}>
                {f.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

function Booking() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(135deg, ${ROSE_DEEP} 0%, ${ROSE_INK} 100%)`,
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={6}>
            <Typography
              sx={{
                color: ROSE_PINK,
                letterSpacing: 4,
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              — Đặt lịch hẹn
            </Typography>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: { xs: 40, md: 64 },
                lineHeight: 1.1,
                fontStyle: 'italic',
              }}
            >
              Hành trình làm đẹp bắt đầu hôm nay
            </Typography>
            <Stack spacing={2} sx={{ mt: 5 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Iconify icon="solar:map-point-bold" />{' '}
                <Typography>{SPA27_CONTACT.address}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Iconify icon="solar:phone-bold" /> <Typography>{SPA27_CONTACT.phone}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Iconify icon="solar:clock-circle-bold" />{' '}
                <Typography>{SPA27_CONTACT.hours}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Iconify icon="solar:letter-bold" /> <Typography>{SPA27_CONTACT.email}</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ bgcolor: '#fff', p: { xs: 3, md: 5 }, borderRadius: 4, color: ROSE_INK }}>
              <Typography sx={{ fontFamily: SERIF, fontSize: 28, mb: 3, fontStyle: 'italic' }}>
                Gửi yêu cầu của bạn
              </Typography>
              <Stack spacing={2}>
                <TextField fullWidth label="Họ và tên" variant="outlined" />
                <TextField fullWidth label="Số điện thoại" variant="outlined" />
                <TextField fullWidth label="Dịch vụ quan tâm" variant="outlined" />
                <TextField fullWidth multiline rows={3} label="Lời nhắn" variant="outlined" />
                <Button
                  size="large"
                  sx={{
                    py: 1.8,
                    bgcolor: ROSE_DEEP,
                    color: '#fff',
                    borderRadius: 50,
                    fontSize: 12,
                    letterSpacing: 2,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    '&:hover': { bgcolor: ROSE_INK },
                  }}
                >
                  Gửi yêu cầu
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export function Spa27View() {
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
      <Philosophy />
      <Services />
      <Ritual />
      <Products />
      <Therapists />
      <Testimonials />
      <Faqs />
      <Booking />
    </>
  );
}
