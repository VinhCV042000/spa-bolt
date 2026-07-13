import { m } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { BackToTop } from 'src/components/animate/back-to-top';
import { varFade, MotionContainer } from 'src/components/animate';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import {
  SPA22_LAB,
  SPA22_FAQ,
  AURORA_INK,
  SPA22_TEAM,
  AURORA_MINT,
  AURORA_PINK,
  SPA22_PRESS,
  AURORA_INK_2,
  AURORA_LILAC,
  AURORA_PEACH,
  AURORA_CREAM,
  SPA22_IMAGES,
  SPA22_TIMELINE,
  SPA22_CAPSULES,
  AURORA_GRADIENT,
  SPA22_PROTOCOLS,
  SPA22_MEMBERSHIP,
  SPA22_HERO_SLIDES,
} from './spa22-data';

// ----------------------------------------------------------------------

const MONO = '"JetBrains Mono","SF Mono",ui-monospace,monospace';
const SERIF = '"Cormorant Garamond","Times New Roman",serif';

function Eyebrow({
  no,
  label,
  color = AURORA_LILAC,
}: {
  no: string;
  label: string;
  color?: string;
}) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography sx={{ fontFamily: MONO, color, fontSize: 11, letterSpacing: 3 }}>
        / {no}
      </Typography>
      <Box sx={{ width: 36, height: '1px', bgcolor: `${color}66` }} />
      <Typography sx={{ fontFamily: MONO, color, fontSize: 11, letterSpacing: 3 }}>
        {label}
      </Typography>
    </Stack>
  );
}

function SectionTitle({ children, gradient }: { children: React.ReactNode; gradient?: boolean }) {
  return (
    <Typography
      sx={{
        fontFamily: SERIF,
        fontWeight: 300,
        fontSize: { xs: 40, md: 72 },
        lineHeight: 1.02,
        letterSpacing: -1.5,
        color: AURORA_CREAM,
        ...(gradient && {
          background: AURORA_GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }),
      }}
    >
      {children}
    </Typography>
  );
}

// ============================================================
// 1. HERO — split asymmetric with rotating aurora orb
// ============================================================
function Spa22Hero() {
  const { t } = useTranslate('spa22');
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: AURORA_INK,
        overflow: 'hidden',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
      }}
    >
      {/* Hero Carousel */}
      <Carousel
        carousel={carousel}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.08,
        }}
        slotProps={{
          container: { height: '100%' },
          slide: { height: '100%', position: 'relative' },
        }}
      >
        {SPA22_HERO_SLIDES.map((slide) => (
          <Box
            key={slide.src}
            component="img"
            src={slide.src}
            alt={slide.alt}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
            }}
          />
        ))}
      </Carousel>

      {/* Aurora orb */}
      <Box
        component={m.div}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        sx={{
          position: 'absolute',
          right: { xs: '-40%', md: '-15%' },
          top: '10%',
          width: { xs: 520, md: 780 },
          height: { xs: 520, md: 780 },
          borderRadius: '50%',
          background: AURORA_GRADIENT,
          filter: 'blur(80px)',
          opacity: 0.55,
          zIndex: 1,
        }}
      />
      {/* Grid lines */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${AURORA_CREAM}08 1px, transparent 1px), linear-gradient(90deg, ${AURORA_CREAM}08 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          zIndex: 1,
        }}
      />

      {/* Dot navigation */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 40 },
          left: 0,
          right: 0,
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
          sx={{ color: AURORA_CREAM }}
        />
      </Box>

      <Container
        component={MotionContainer}
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 3,
          pt: 'calc(var(--layout-header-desktop-height) + 80px)',
          pb: 12,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={4}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Eyebrow no="00" label={t('hero.eyebrow')} color={AURORA_MINT} />
            </Box>
            <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: SERIF,
                  fontWeight: 200,
                  fontSize: { xs: 56, md: 132 },
                  lineHeight: 0.95,
                  letterSpacing: -4,
                  color: AURORA_CREAM,
                }}
              >
                {t('hero.title')}
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: AURORA_GRADIENT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontStyle: 'italic',
                  }}
                >
                  {t('hero.titleAccent')}
                </Box>
                <Box component="span" sx={{ display: 'block', color: `${AURORA_CREAM}aa` }}>
                  {t('hero.titleSuffix')}
                </Box>
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                sx={{
                  color: `${AURORA_CREAM}aa`,
                  maxWidth: 520,
                  lineHeight: 1.8,
                  fontSize: 17,
                }}
              >
                {t('hero.description')}
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  size="large"
                  endIcon={<Iconify icon="solar:arrow-right-up-linear" />}
                  sx={{
                    background: AURORA_GRADIENT,
                    color: AURORA_INK,
                    borderRadius: 0,
                    px: 4,
                    py: 1.75,
                    fontWeight: 700,
                    fontFamily: MONO,
                    letterSpacing: 2,
                    fontSize: 12,
                    '&:hover': { opacity: 0.9, background: AURORA_GRADIENT },
                  }}
                >
                  ĐẶT BUỔI SCAN MIỄN PHÍ
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{
                    borderColor: `${AURORA_CREAM}33`,
                    color: AURORA_CREAM,
                    borderRadius: 0,
                    px: 4,
                    py: 1.75,
                    fontFamily: MONO,
                    letterSpacing: 2,
                    fontSize: 12,
                    '&:hover': { borderColor: AURORA_LILAC, bgcolor: `${AURORA_LILAC}0d` },
                  }}
                >
                  XEM PROTOCOLS →
                </Button>
              </Stack>
            </Box>
          </Stack>

          <Box
            component={m.div}
            variants={varFade({ distance: 60 }).inRight}
            sx={{ position: 'relative' }}
          >
            <Box
              component="img"
              src={SPA22_IMAGES.hero}
              alt="Aurora Beauty Lab"
              sx={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                borderRadius: 0,
                filter: 'saturate(1.15) contrast(1.05)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                right: 24,
                bgcolor: `${AURORA_INK}cc`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${AURORA_LILAC}33`,
                p: 2.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack>
                <Typography
                  sx={{ fontFamily: MONO, fontSize: 10, color: AURORA_MINT, letterSpacing: 2 }}
                >
                  VISIA SCAN
                </Typography>
                <Typography sx={{ fontFamily: SERIF, fontSize: 22, color: AURORA_CREAM }}>
                  +218% Độ ẩm
                </Typography>
              </Stack>
              <Box
                sx={{ width: 40, height: 40, borderRadius: '50%', background: AURORA_GRADIENT }}
              />
            </Box>
          </Box>
        </Box>

        {/* Bottom ticker */}
        <Box
          sx={{
            mt: 10,
            pt: 4,
            borderTop: `1px solid ${AURORA_CREAM}1a`,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          {(t('hero.locations', { returnObjects: true }) as string[]).map((c, i) => (
            <Typography
              key={c}
              sx={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: 3,
                color: i === 3 ? AURORA_MINT : `${AURORA_CREAM}55`,
              }}
            >
              ◉ {c}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 2. PHILOSOPHY — large quote + 3 numbered tenets
// ============================================================
function Spa22Philosophy() {
  const tenets = [
    {
      n: '01',
      t: 'Đo lường',
      d: 'Mỗi quyết định bắt đầu từ dữ liệu VISIA. Không cảm tính, không phỏng đoán.',
    },
    {
      n: '02',
      t: 'Tùy chỉnh',
      d: 'Protocol cá nhân hóa theo 12 chỉ số sinh học — không có liệu trình “một cỡ vừa tất cả”.',
    },
    {
      n: '03',
      t: 'Minh bạch',
      d: 'Báo cáo trước/sau hiển thị trực tiếp trong app — khách hàng nhìn thấy chuyển biến từng tuần.',
    },
  ];
  return (
    <Box component="section" sx={{ bgcolor: AURORA_INK_2, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="xl">
        <Stack spacing={8}>
          <Eyebrow no="01" label="MANIFESTO" />
          <SectionTitle>
            Không phải spa.
            <br />
            <Box component="span" sx={{ fontStyle: 'italic', color: AURORA_LILAC }}>
              Một phòng lab
            </Box>{' '}
            đo từng micron làn da.
          </SectionTitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: { xs: 4, md: 6 },
              pt: 4,
              borderTop: `1px solid ${AURORA_CREAM}1a`,
            }}
          >
            {tenets.map((t) => (
              <Stack key={t.n} spacing={2} sx={{ pt: 4 }}>
                <Typography
                  sx={{
                    fontFamily: MONO,
                    fontSize: 64,
                    fontWeight: 200,
                    color: AURORA_MINT,
                    lineHeight: 1,
                  }}
                >
                  {t.n}
                </Typography>
                <Typography
                  sx={{ fontFamily: SERIF, fontSize: 32, color: AURORA_CREAM, fontWeight: 300 }}
                >
                  {t.t}
                </Typography>
                <Typography sx={{ color: `${AURORA_CREAM}88`, lineHeight: 1.9 }}>{t.d}</Typography>
              </Stack>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

// ============================================================
// 3. PROTOCOLS — 4 large editorial cards, alternating offset
// ============================================================
function Spa22Protocols() {
  const { t } = useTranslate('spa22');

  return (
    <Box component="section" sx={{ bgcolor: AURORA_INK, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3} sx={{ mb: 8 }}>
          <Eyebrow no="02" label={t('protocols.eyebrow')} color={AURORA_PINK} />
          <SectionTitle gradient>{t('protocols.title')}</SectionTitle>
        </Stack>

        <Stack spacing={{ xs: 6, md: 10 }}>
          {SPA22_PROTOCOLS.map((p, i) => (
            <Box
              key={p.no}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 4, md: 8 },
                alignItems: 'center',
                direction: i % 2 ? 'rtl' : 'ltr',
              }}
            >
              <Box
                sx={{
                  direction: 'ltr',
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${AURORA_CREAM}22`,
                }}
              >
                <Box
                  component="img"
                  src={p.img}
                  alt={p.name}
                  sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    transition: '1s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    px: 1.5,
                    py: 0.5,
                    bgcolor: AURORA_INK,
                    border: `1px solid ${p.accent}`,
                    fontFamily: MONO,
                    fontSize: 11,
                    color: p.accent,
                    letterSpacing: 2,
                  }}
                >
                  PROTOCOL · {p.no}
                </Box>
              </Box>
              <Stack spacing={3} sx={{ direction: 'ltr' }}>
                <Typography
                  sx={{ fontFamily: MONO, fontSize: 12, color: p.accent, letterSpacing: 3 }}
                >
                  {p.tech}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SERIF,
                    fontSize: { xs: 38, md: 56 },
                    fontWeight: 300,
                    color: AURORA_CREAM,
                    lineHeight: 1,
                  }}
                >
                  {p.name}
                </Typography>
                <Typography sx={{ color: `${AURORA_CREAM}99`, fontSize: 16, lineHeight: 1.9 }}>
                  {p.desc}
                </Typography>
                <Stack
                  direction="row"
                  spacing={3}
                  divider={<Box sx={{ width: '1px', bgcolor: `${AURORA_CREAM}22` }} />}
                  sx={{ pt: 2 }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: MONO,
                        fontSize: 10,
                        color: `${AURORA_CREAM}55`,
                        letterSpacing: 2,
                      }}
                    >
                      {t('protocols.duration')}
                    </Typography>
                    <Typography sx={{ color: AURORA_CREAM, fontFamily: SERIF, fontSize: 22 }}>
                      {p.duration}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: MONO,
                        fontSize: 10,
                        color: `${AURORA_CREAM}55`,
                        letterSpacing: 2,
                      }}
                    >
                      {t('protocols.price')}
                    </Typography>
                    <Typography sx={{ color: AURORA_CREAM, fontFamily: SERIF, fontSize: 22 }}>
                      {p.price}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ============================================================
// 4. LAB SPEC — technical grid of wavelengths/numbers
// ============================================================
function Spa22LabSpec() {
  const { t } = useTranslate('spa22');

  return (
    <Box
      component="section"
      sx={{
        bgcolor: AURORA_INK_2,
        py: { xs: 10, md: 16 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '-10%',
          top: '20%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${AURORA_PINK}55, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 8 }}>
          <Stack spacing={3}>
            <Eyebrow no="03" label={t('lab.eyebrow')} color={AURORA_PEACH} />
            <SectionTitle>
              {t('lab.title')}
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: AURORA_PEACH }}>
                {t('lab.titleAccent')}
              </Box>
            </SectionTitle>
            <Typography sx={{ color: `${AURORA_CREAM}88`, maxWidth: 380, lineHeight: 1.9 }}>
              {t('lab.description')}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
              borderTop: `1px solid ${AURORA_CREAM}1a`,
              borderLeft: `1px solid ${AURORA_CREAM}1a`,
            }}
          >
            {SPA22_LAB.map((l) => (
              <Box
                key={l.k}
                sx={{
                  p: 4,
                  borderRight: `1px solid ${AURORA_CREAM}1a`,
                  borderBottom: `1px solid ${AURORA_CREAM}1a`,
                  minHeight: 180,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: '.4s',
                  '&:hover': { bgcolor: `${AURORA_LILAC}0a` },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: MONO,
                    fontSize: 28,
                    fontWeight: 300,
                    background: AURORA_GRADIENT,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {l.k}
                </Typography>
                <Typography sx={{ color: `${AURORA_CREAM}99`, fontSize: 14, lineHeight: 1.7 }}>
                  {l.v}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 5. TIMELINE — 90-minute journey
// ============================================================
function Spa22Timeline() {
  const { t, currentLang } = useTranslate('spa22');
  const lang = currentLang.value as 'vi' | 'en';

  return (
    <Box component="section" sx={{ bgcolor: AURORA_INK, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3} sx={{ mb: 8 }}>
          <Eyebrow no="04" label={t('timeline.eyebrow')} color={AURORA_MINT} />
          <SectionTitle>{t('timeline.title')}</SectionTitle>
        </Stack>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 0, md: '50%' },
              left: { xs: 24, md: 0 },
              right: { xs: 'auto', md: 0 },
              bottom: { xs: 0, md: 'auto' },
              width: { xs: '1px', md: '100%' },
              height: { xs: '100%', md: '1px' },
              background: AURORA_GRADIENT,
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(5,1fr)' },
              gap: { xs: 6, md: 3 },
              position: 'relative',
            }}
          >
            {SPA22_TIMELINE.map((s, i) => (
              <Stack key={s.t} spacing={2} sx={{ pl: { xs: 6, md: 0 }, position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 16, md: '50%' },
                    top: { xs: 8, md: -8 },
                    transform: { xs: 'translateX(-50%)', md: 'translateX(-50%)' },
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: AURORA_GRADIENT,
                    boxShadow: `0 0 24px ${AURORA_PINK}88`,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: AURORA_MINT,
                    letterSpacing: 2,
                    pt: { md: 5 },
                  }}
                >
                  {s.t}
                </Typography>
                <Typography sx={{ fontFamily: SERIF, fontSize: 26, color: AURORA_CREAM }}>
                  {s.step[lang]}
                </Typography>
                <Typography sx={{ color: `${AURORA_CREAM}88`, fontSize: 14, lineHeight: 1.8 }}>
                  {s.desc[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 6. CAPSULES — product capsules
// ============================================================
function Spa22Capsules() {
  return (
    <Box component="section" sx={{ bgcolor: AURORA_INK_2, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'flex-end' }}
          spacing={3}
          sx={{ mb: 8 }}
        >
          <Stack spacing={3}>
            <Eyebrow no="05" label="CAPSULE LINE" color={AURORA_LILAC} />
            <SectionTitle>
              Phòng lab,
              <br />
              <Box component="span" sx={{ fontStyle: 'italic' }}>
                đóng chai.
              </Box>
            </SectionTitle>
          </Stack>
          <Typography sx={{ color: `${AURORA_CREAM}88`, maxWidth: 380, lineHeight: 1.9 }}>
            Bốn sản phẩm chủ lực cô đặc thành phần dùng trong phòng lab. Hiệu quả tương đương một
            buổi điều trị nhẹ — dùng tại nhà.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' },
            gap: 3,
          }}
        >
          {SPA22_CAPSULES.map((c, i) => (
            <Box
              key={c.name}
              sx={{
                position: 'relative',
                aspectRatio: '3/4',
                bgcolor: AURORA_INK,
                border: `1px solid ${AURORA_CREAM}1a`,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                transition: '.4s',
                '&:hover': {
                  borderColor: AURORA_LILAC,
                  transform: 'translateY(-4px)',
                  '& .orb': { transform: 'translate(-50%,-50%) scale(1.15)' },
                },
              }}
            >
              <Box
                className="orb"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: AURORA_GRADIENT,
                  filter: 'blur(40px)',
                  opacity: 0.35,
                  transition: '.6s',
                }}
              />
              <Stack direction="row" justifyContent="space-between" sx={{ position: 'relative' }}>
                <Typography
                  sx={{ fontFamily: MONO, fontSize: 11, color: AURORA_MINT, letterSpacing: 2 }}
                >
                  CAP·0{i + 1}
                </Typography>
                <Typography sx={{ fontFamily: MONO, fontSize: 11, color: `${AURORA_CREAM}77` }}>
                  {c.vol}
                </Typography>
              </Stack>
              <Stack spacing={1} sx={{ position: 'relative' }}>
                <Typography
                  sx={{ fontFamily: MONO, fontSize: 10, color: AURORA_LILAC, letterSpacing: 2 }}
                >
                  {c.tag.toUpperCase()}
                </Typography>
                <Typography
                  sx={{ fontFamily: SERIF, fontSize: 28, color: AURORA_CREAM, lineHeight: 1.1 }}
                >
                  {c.name}
                </Typography>
                <Typography sx={{ fontFamily: MONO, fontSize: 14, color: AURORA_CREAM }}>
                  {c.price}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 7. TEAM
// ============================================================
function Spa22Team() {
  return (
    <Box component="section" sx={{ bgcolor: AURORA_INK, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3} sx={{ mb: 8 }}>
          <Eyebrow no="06" label="THE LAB TEAM" color={AURORA_PINK} />
          <SectionTitle>
            Bác sĩ Hàn.{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: AURORA_PINK }}>
              Bàn tay Việt.
            </Box>
          </SectionTitle>
        </Stack>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 4 }}
        >
          {SPA22_TEAM.map((t, i) => (
            <Box key={t.name} sx={{ position: 'relative', mt: { md: i % 2 ? 12 : 0 } }}>
              <Box
                component="img"
                src={t.img}
                alt={t.name}
                sx={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  filter: 'grayscale(0.2)',
                  transition: '.5s',
                  '&:hover': { filter: 'grayscale(0)' },
                }}
              />
              <Box sx={{ pt: 3, borderTop: `1px solid ${AURORA_CREAM}22`, mt: 2 }}>
                <Typography
                  sx={{ fontFamily: MONO, fontSize: 11, color: AURORA_MINT, letterSpacing: 2 }}
                >
                  0{i + 1} / 0{SPA22_TEAM.length}
                </Typography>
                <Typography sx={{ fontFamily: SERIF, fontSize: 28, color: AURORA_CREAM, mt: 1 }}>
                  {t.name}
                </Typography>
                <Typography sx={{ color: `${AURORA_CREAM}88`, fontSize: 14, mt: 0.5 }}>
                  {t.role}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 8. PRESS MARQUEE
// ============================================================
function Spa22Press() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: AURORA_INK_2,
        py: { xs: 10, md: 14 },
        borderTop: `1px solid ${AURORA_CREAM}11`,
        borderBottom: `1px solid ${AURORA_CREAM}11`,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3} sx={{ mb: 6 }}>
          <Eyebrow no="07" label="IN THE PRESS" color={AURORA_PEACH} />
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
            gap: 0,
            borderTop: `1px solid ${AURORA_CREAM}1a`,
          }}
        >
          {SPA22_PRESS.map((p, i) => (
            <Box
              key={p.name}
              sx={{
                p: { xs: 4, md: 6 },
                borderBottom: `1px solid ${AURORA_CREAM}1a`,
                borderRight: { md: i % 2 === 0 ? `1px solid ${AURORA_CREAM}1a` : 'none' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontSize: { xs: 22, md: 30 },
                  color: AURORA_CREAM,
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.3,
                }}
              >
                {p.quote}
              </Typography>
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: AURORA_LILAC,
                  letterSpacing: 4,
                  mt: 3,
                }}
              >
                — {p.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 9. MEMBERSHIP
// ============================================================
function Spa22Membership() {
  return (
    <Box component="section" sx={{ bgcolor: AURORA_INK, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3} sx={{ mb: 8 }}>
          <Eyebrow no="08" label="MEMBERSHIP TIERS" color={AURORA_MINT} />
          <SectionTitle gradient>Glow · Aurora · Solar.</SectionTitle>
        </Stack>
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}
        >
          {SPA22_MEMBERSHIP.map((m1) => (
            <Box
              key={m1.tier}
              sx={{
                p: 5,
                position: 'relative',
                bgcolor: m1.popular ? AURORA_CREAM : AURORA_INK_2,
                color: m1.popular ? AURORA_INK : AURORA_CREAM,
                border: `1px solid ${m1.popular ? AURORA_CREAM : `${AURORA_CREAM}1a`}`,
                minHeight: 480,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {m1.popular && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -1,
                    right: -1,
                    px: 2,
                    py: 0.5,
                    background: AURORA_GRADIENT,
                    color: AURORA_INK,
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: 2,
                    fontWeight: 700,
                  }}
                >
                  ĐƯỢC CHỌN
                </Box>
              )}
              <Typography sx={{ fontFamily: MONO, fontSize: 12, letterSpacing: 4, opacity: 0.6 }}>
                TIER · {m1.tier}
              </Typography>
              <Typography
                sx={{ fontFamily: SERIF, fontSize: 64, fontWeight: 200, lineHeight: 1, mt: 2 }}
              >
                {m1.tier}
              </Typography>
              <Box
                sx={{
                  mt: 3,
                  pb: 3,
                  borderBottom: `1px solid ${m1.popular ? `${AURORA_INK}22` : `${AURORA_CREAM}22`}`,
                }}
              >
                <Typography sx={{ fontFamily: SERIF, fontSize: 32 }}>{m1.price}</Typography>
                <Typography sx={{ fontFamily: MONO, fontSize: 11, opacity: 0.7, letterSpacing: 2 }}>
                  / {m1.period.toUpperCase()}
                </Typography>
              </Box>
              <Stack spacing={1.5} sx={{ mt: 3, flex: 1 }}>
                {m1.perks.map((p) => (
                  <Stack key={p} direction="row" spacing={1.5} alignItems="flex-start">
                    <Iconify
                      icon="solar:check-circle-bold"
                      sx={{ color: m1.popular ? AURORA_INK : AURORA_MINT, mt: 0.3 }}
                    />
                    <Typography sx={{ fontSize: 14, lineHeight: 1.7 }}>{p}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Button
                fullWidth
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 0,
                  fontFamily: MONO,
                  letterSpacing: 2,
                  fontSize: 12,
                  bgcolor: m1.popular ? AURORA_INK : 'transparent',
                  color: m1.popular ? AURORA_CREAM : AURORA_CREAM,
                  border: m1.popular ? 'none' : `1px solid ${AURORA_CREAM}33`,
                  '&:hover': { bgcolor: m1.popular ? '#000' : `${AURORA_CREAM}0d` },
                }}
              >
                CHỌN GÓI →
              </Button>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 10. FAQ
// ============================================================
function Spa22Faq() {
  return (
    <Box component="section" sx={{ bgcolor: AURORA_INK_2, py: { xs: 10, md: 14 } }}>
      <Container maxWidth="md">
        <Stack spacing={3} sx={{ mb: 6 }}>
          <Eyebrow no="09" label="FREQUENTLY ASKED" color={AURORA_LILAC} />
          <SectionTitle>Câu hỏi thường gặp.</SectionTitle>
        </Stack>
        <Stack divider={<Box sx={{ height: '1px', bgcolor: `${AURORA_CREAM}1a` }} />}>
          {SPA22_FAQ.map((f, i) => (
            <Stack
              key={f.q}
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              sx={{ py: 4, alignItems: 'flex-start' }}
            >
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: AURORA_MINT,
                  minWidth: 60,
                  letterSpacing: 2,
                }}
              >
                Q.0{i + 1}
              </Typography>
              <Stack spacing={1.5} sx={{ flex: 1 }}>
                <Typography
                  sx={{ fontFamily: SERIF, fontSize: 24, color: AURORA_CREAM, fontWeight: 300 }}
                >
                  {f.q}
                </Typography>
                <Typography sx={{ color: `${AURORA_CREAM}88`, lineHeight: 1.9 }}>{f.a}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ============================================================
// 11. CTA / Booking
// ============================================================
function Spa22Cta() {
  const { t } = useTranslate('spa22');

  return (
    <Box
      component="section"
      sx={{ bgcolor: AURORA_INK, py: { xs: 10, md: 18 }, position: 'relative', overflow: 'hidden' }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 100%, ${AURORA_PINK}33, transparent 60%)`,
        }}
      />
      <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
        <Stack spacing={4} alignItems="center">
          <Eyebrow no="10" label={t('booking.eyebrow')} />
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 44, md: 88 },
              fontWeight: 200,
              lineHeight: 1,
              color: AURORA_CREAM,
              letterSpacing: -2,
            }}
          >
            {t('booking.title')}{' '}
            <Box
              component="span"
              sx={{
                fontStyle: 'italic',
                background: AURORA_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('booking.titleAccent')}
            </Box>{' '}
            {t('booking.titleSuffix')}
          </Typography>
          <Typography sx={{ color: `${AURORA_CREAM}99`, maxWidth: 480, lineHeight: 1.8 }}>
            {t('booking.description')}
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 520, mt: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                placeholder={t('booking.placeholder')}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: `${AURORA_CREAM}0d`,
                    color: AURORA_CREAM,
                    fontFamily: MONO,
                    borderRadius: 0,
                    '& fieldset': { borderColor: `${AURORA_CREAM}33` },
                    '&:hover fieldset': { borderColor: AURORA_LILAC },
                  },
                }}
              />
              <Button
                sx={{
                  background: AURORA_GRADIENT,
                  color: AURORA_INK,
                  borderRadius: 0,
                  px: 4,
                  fontFamily: MONO,
                  letterSpacing: 2,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  '&:hover': { opacity: 0.9, background: AURORA_GRADIENT },
                }}
              >
                {t('booking.submit')}
              </Button>
            </Stack>
          </Box>
          <Typography
            sx={{
              fontFamily: MONO,
              fontSize: 11,
              color: `${AURORA_CREAM}55`,
              letterSpacing: 3,
              pt: 2,
            }}
          >
            ◉ AURORA BEAUTY LAB · 22 LÝ TỰ TRỌNG · QUẬN 1 · HCMC
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

// ============================================================
// VIEW
// ============================================================
export function Spa22View() {
  const pageProgress = useScrollProgress();
  return (
    <Box sx={{ bgcolor: AURORA_INK }}>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa22Hero />
      <Spa22Philosophy />
      <Spa22Protocols />
      <Spa22LabSpec />
      <Spa22Timeline />
      <Spa22Capsules />
      <Spa22Team />
      <Spa22Press />
      <Spa22Membership />
      <Spa22Faq />
      <Spa22Cta />
    </Box>
  );
}
