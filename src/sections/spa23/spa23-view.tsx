import { m } from 'framer-motion';

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
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import {
  FLORA_INK,
  FLORA_GOLD,
  SPA23_TEAM,
  FLORA_PAPER,
  FLORA_CREAM,
  FLORA_BLUSH,
  SPA23_HOURS,
  SPA23_IMAGES,
  SPA23_GARDEN,
  FLORA_EMERALD,
  FLORA_MAGENTA,
  SPA23_ATELIER,
  SPA23_RITUALS,
  SPA23_JOURNAL,
  SPA23_TESTIMONIALS,
} from './spa23-data';

// ----------------------------------------------------------------------

const SERIF = '"Cormorant Garamond","Times New Roman",serif';
const SCRIPT = '"Pinyon Script","Allura","Dancing Script",cursive';
const SANS = '"Work Sans","Helvetica Neue",sans-serif';

function ChapterTag({ no, label }: { no: string; label: string }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ width: 40, height: '1px', bgcolor: FLORA_EMERALD }} />
      <Typography
        sx={{
          fontFamily: SANS,
          fontSize: 11,
          letterSpacing: 5,
          color: FLORA_EMERALD,
          fontWeight: 500,
        }}
      >
        {no} · {label}
      </Typography>
    </Stack>
  );
}

function ScriptLine({
  children,
  color = FLORA_MAGENTA,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <Typography
      sx={{
        fontFamily: SCRIPT,
        fontSize: { xs: 38, md: 56 },
        color,
        lineHeight: 1,
        fontStyle: 'italic',
      }}
    >
      {children}
    </Typography>
  );
}

// ============================================================
// 1. HERO — magazine cover with framed central image
// ============================================================
function Spa23Hero() {
  const { t } = useTranslate('spa23');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: FLORA_PAPER,
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        overflow: 'hidden',
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(27,34,24,0.06) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}
    >
      <Container
        component={MotionContainer}
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: 'calc(var(--layout-header-desktop-height) + 64px)',
          pb: 10,
        }}
      >
        {/* top meta bar */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderTop: `1px solid ${FLORA_INK}33`,
            borderBottom: `1px solid ${FLORA_INK}33`,
            py: 1.5,
            mb: 6,
          }}
        >
          <Typography sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: 3, color: FLORA_INK }}>
            {t('hero.meta.0')}
          </Typography>
          <Typography
            sx={{
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: 3,
              color: FLORA_INK,
              display: { xs: 'none', md: 'block' },
            }}
          >
            {t('hero.meta.1')}
          </Typography>
          <Typography
            sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: 3, color: FLORA_MAGENTA }}
          >
            {t('hero.meta.2')}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          <Stack
            spacing={2}
            sx={{ textAlign: { md: 'right' } }}
            component={m.div}
            variants={varFade({ distance: 30 }).inLeft}
          >
            <Typography
              sx={{ fontFamily: SCRIPT, fontSize: 44, color: FLORA_MAGENTA, lineHeight: 1 }}
            >
              {t('hero.leftTitle')}
            </Typography>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: 22,
                color: FLORA_INK,
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}
            >
              {t('hero.leftSubtitle')}
            </Typography>
            <Box sx={{ width: 60, height: '1px', bgcolor: FLORA_EMERALD, ml: { md: 'auto' } }} />
            <Typography
              sx={{
                fontFamily: SANS,
                fontSize: 12,
                color: `${FLORA_INK}aa`,
                lineHeight: 1.9,
                maxWidth: 260,
                ml: { md: 'auto' },
              }}
            >
              {t('hero.leftDescription')}
            </Typography>
          </Stack>

          <Box
            component={m.div}
            variants={varFade({ distance: 40 }).inUp}
            sx={{ position: 'relative' }}
          >
            <Box
              component="img"
              src={SPA23_IMAGES.hero}
              alt="Maison Florale"
              sx={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                borderTopLeftRadius: '50% 30%',
                borderTopRightRadius: '50% 30%',
                border: `1px solid ${FLORA_INK}22`,
              }}
            />
            <Typography
              sx={{
                position: 'absolute',
                bottom: -24,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: SCRIPT,
                fontSize: { xs: 80, md: 140 },
                color: FLORA_MAGENTA,
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Florale.
            </Typography>
          </Box>

          <Stack spacing={2} component={m.div} variants={varFade({ distance: 30 }).inRight}>
            <Typography
              sx={{ fontFamily: SANS, fontSize: 11, color: FLORA_GOLD, letterSpacing: 4 }}
            >
              ◈ SIGNATURE
            </Typography>
            <Typography sx={{ fontFamily: SERIF, fontSize: 28, color: FLORA_INK, lineHeight: 1.3 }}>
              {t('hero.rightTitle')}
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: FLORA_EMERALD }}>
                {t('hero.rightAccent')}
              </Box>
            </Typography>
            <Typography
              sx={{ fontFamily: SANS, fontSize: 13, color: `${FLORA_INK}aa`, lineHeight: 1.9 }}
            >
              {t('hero.rightDescription')}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="baseline">
              <Typography sx={{ fontFamily: SERIF, fontSize: 28, color: FLORA_INK }}>
                {t('hero.price')}
              </Typography>
              <Typography
                sx={{ fontFamily: SANS, fontSize: 11, color: `${FLORA_INK}88`, letterSpacing: 2 }}
              >
                {t('hero.duration')}
              </Typography>
            </Stack>
            <Button
              sx={{
                mt: 1,
                bgcolor: FLORA_INK,
                color: FLORA_PAPER,
                borderRadius: 0,
                py: 1.5,
                px: 3,
                fontFamily: SANS,
                letterSpacing: 3,
                fontSize: 11,
                fontWeight: 600,
                '&:hover': { bgcolor: FLORA_EMERALD },
              }}
            >
              ĐẶT SIGNATURE →
            </Button>
          </Stack>
        </Box>

        {/* bottom tagline */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'center' }}
          spacing={2}
          sx={{ mt: { xs: 8, md: 16 }, pt: 4, borderTop: `1px solid ${FLORA_INK}22` }}
        >
          <Typography
            sx={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 18,
              color: `${FLORA_INK}aa`,
              maxWidth: 460,
            }}
          >
            “Mọi liệu trình bắt đầu bằng một bó hoa tươi cắm cho riêng bạn — và kết thúc bằng một
            lời chào tạm biệt bằng tiếng Pháp.”
          </Typography>
          <Typography
            sx={{ fontFamily: SANS, fontSize: 11, color: `${FLORA_INK}77`, letterSpacing: 3 }}
          >
            ↓ FAITES DÉFILER · LẬT TRANG
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

// ============================================================
// 2. PHILOSOPHY — paper double-spread
// ============================================================
function Spa23Philosophy() {
  return (
    <Box component="section" sx={{ bgcolor: FLORA_CREAM, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.4fr' },
            gap: { xs: 4, md: 10 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={3}>
            <ChapterTag no="I" label="LA PHILOSOPHIE" />
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: { xs: 40, md: 64 },
                fontWeight: 300,
                color: FLORA_INK,
                lineHeight: 1.05,
                letterSpacing: -1,
              }}
            >
              Hoa nở.
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: FLORA_EMERALD }}>
                Tâm tĩnh.
              </Box>
              <br />
              Da rạng.
            </Typography>
            <ScriptLine>— une promesse</ScriptLine>
          </Stack>
          <Stack spacing={4}>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: 22,
                color: FLORA_INK,
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              Chúng tôi không phải spa. Chúng tôi là một{' '}
              <Box component="span" sx={{ color: FLORA_MAGENTA }}>
                atelier
              </Box>{' '}
              — nơi mỗi lọ tinh dầu được chiết chậm 72 giờ, mỗi bó hoa cắm thủ công, và mỗi nghi lễ
              là một bài thơ Pháp viết bằng tay bạn.
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' },
                gap: 3,
                pt: 2,
              }}
            >
              {SPA23_ATELIER.map((a) => (
                <Stack key={a.label} spacing={1.5}>
                  <Iconify icon={a.icon} width={32} sx={{ color: FLORA_EMERALD }} />
                  <Typography
                    sx={{ fontFamily: SERIF, fontSize: 20, color: FLORA_INK, fontStyle: 'italic' }}
                  >
                    {a.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: SANS,
                      fontSize: 13,
                      color: `${FLORA_INK}99`,
                      lineHeight: 1.7,
                    }}
                  >
                    {a.desc}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 3. RITUALS — zigzag four-step menu
// ============================================================
function Spa23Rituals() {
  return (
    <Box component="section" sx={{ bgcolor: FLORA_PAPER, py: { xs: 10, md: 18 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} alignItems="center" sx={{ mb: 10, textAlign: 'center' }}>
          <ChapterTag no="II" label="LE MENU" />
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 44, md: 72 },
              fontWeight: 300,
              color: FLORA_INK,
              lineHeight: 1,
              letterSpacing: -1,
            }}
          >
            Bốn nghi lễ.{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: FLORA_MAGENTA }}>
              Một mùa hoa.
            </Box>
          </Typography>
        </Stack>

        <Stack spacing={{ xs: 6, md: 12 }}>
          {SPA23_RITUALS.map((r, i) => (
            <Box
              key={r.no}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: i % 2 ? '1.2fr 1fr' : '1fr 1.2fr' },
                gap: { xs: 4, md: 8 },
                alignItems: 'center',
              }}
            >
              <Box sx={{ order: { xs: 1, md: i % 2 ? 2 : 1 }, position: 'relative' }}>
                <Box
                  component="img"
                  src={r.img}
                  alt={r.name}
                  sx={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderTopRightRadius: i % 2 ? '50% 18%' : 0,
                    borderTopLeftRadius: i % 2 ? 0 : '50% 18%',
                    border: `1px solid ${FLORA_INK}22`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    px: 1.5,
                    py: 0.5,
                    bgcolor: FLORA_PAPER,
                    border: `1px solid ${FLORA_INK}33`,
                    fontFamily: SANS,
                    fontSize: 10,
                    color: FLORA_EMERALD,
                    letterSpacing: 2,
                  }}
                >
                  ◈ {r.note}
                </Box>
              </Box>
              <Stack
                spacing={2.5}
                sx={{
                  order: { xs: 2, md: i % 2 ? 1 : 2 },
                  pl: { md: i % 2 ? 0 : 4 },
                  pr: { md: i % 2 ? 4 : 0 },
                }}
              >
                <Typography
                  sx={{ fontFamily: SCRIPT, fontSize: 48, color: FLORA_MAGENTA, lineHeight: 1 }}
                >
                  {r.no}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SERIF,
                    fontSize: { xs: 38, md: 52 },
                    fontWeight: 300,
                    color: FLORA_INK,
                    lineHeight: 1,
                    letterSpacing: -1,
                  }}
                >
                  {r.name}
                </Typography>
                <Typography
                  sx={{ fontFamily: SANS, fontSize: 11, color: FLORA_EMERALD, letterSpacing: 3 }}
                >
                  {r.sub.toUpperCase()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SERIF,
                    fontSize: 17,
                    color: `${FLORA_INK}aa`,
                    lineHeight: 1.9,
                    fontStyle: 'italic',
                  }}
                >
                  {r.desc}
                </Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{ pt: 1.5, borderTop: `1px solid ${FLORA_INK}22` }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: SANS,
                        fontSize: 10,
                        color: `${FLORA_INK}77`,
                        letterSpacing: 2,
                      }}
                    >
                      DURÉE
                    </Typography>
                    <Typography sx={{ fontFamily: SERIF, fontSize: 22, color: FLORA_INK }}>
                      {r.duration}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: SANS,
                        fontSize: 10,
                        color: `${FLORA_INK}77`,
                        letterSpacing: 2,
                      }}
                    >
                      TARIF
                    </Typography>
                    <Typography sx={{ fontFamily: SERIF, fontSize: 22, color: FLORA_MAGENTA }}>
                      {r.price}
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
// 4. GARDEN MAP — ingredient origins masonry
// ============================================================
function Spa23Garden() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: FLORA_EMERALD, py: { xs: 10, md: 16 }, color: FLORA_PAPER }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'flex-end' }}
          spacing={3}
          sx={{ mb: 8 }}
        >
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 40, height: '1px', bgcolor: FLORA_BLUSH }} />
              <Typography
                sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: 5, color: FLORA_BLUSH }}
              >
                III · LE JARDIN GLOBAL
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: { xs: 40, md: 64 },
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: -1,
              }}
            >
              Sáu khu vườn.
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: FLORA_BLUSH }}>
                Một atelier.
              </Box>
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontFamily: SANS,
              fontSize: 14,
              color: `${FLORA_PAPER}cc`,
              maxWidth: 380,
              lineHeight: 1.9,
            }}
          >
            Chúng tôi không mua nguyên liệu chợ. Mỗi loại hoa, mỗi giọt tinh dầu được nhập trực tiếp
            từ trang trại organic — kèm chứng nhận truy xuất từng lô.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(6,1fr)' },
            gridAutoRows: { xs: 220, md: 240 },
            gap: 2,
          }}
        >
          {SPA23_GARDEN.map((g, i) => (
            <Box
              key={g.label}
              sx={{
                position: 'relative',
                gridRow: { md: i === 1 || i === 4 ? 'span 2' : 'span 1' },
                gridColumn: { md: i === 0 ? 'span 2' : 'span 1' },
                overflow: 'hidden',
                '&:hover img': { transform: 'scale(1.08)' },
              }}
            >
              <Box
                component="img"
                src={g.img}
                alt={g.label}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: '1s',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 50%, ${FLORA_EMERALD}cc 100%)`,
                }}
              />
              <Stack sx={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                <Typography
                  sx={{ fontFamily: SANS, fontSize: 9, color: FLORA_BLUSH, letterSpacing: 2 }}
                >
                  ◉ {g.lat}
                </Typography>
                <Typography
                  sx={{ fontFamily: SERIF, fontSize: 18, color: FLORA_PAPER, fontStyle: 'italic' }}
                >
                  {g.label}
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
// 5. TEAM — three-up portraits with script signature
// ============================================================
function Spa23Team() {
  return (
    <Box component="section" sx={{ bgcolor: FLORA_PAPER, py: { xs: 10, md: 16 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ mb: 8, textAlign: 'center', alignItems: 'center' }}>
          <ChapterTag no="IV" label="L’ÉQUIPE" />
          <Typography
            sx={{
              fontFamily: SERIF,
              fontSize: { xs: 38, md: 56 },
              fontWeight: 300,
              color: FLORA_INK,
              letterSpacing: -1,
            }}
          >
            Những đôi tay{' '}
            <Box component="span" sx={{ fontStyle: 'italic', color: FLORA_MAGENTA }}>
              biết cắm hoa.
            </Box>
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
            gap: { xs: 5, md: 4 },
          }}
        >
          {SPA23_TEAM.map((t, i) => (
            <Stack key={t.name} spacing={2.5} sx={{ mt: { md: i === 1 ? 6 : 0 } }}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={t.img}
                  alt={t.name}
                  sx={{
                    width: '100%',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    borderTopLeftRadius: '50% 22%',
                    borderTopRightRadius: '50% 22%',
                    border: `1px solid ${FLORA_INK}22`,
                  }}
                />
                <Typography
                  sx={{
                    position: 'absolute',
                    bottom: -16,
                    right: -8,
                    fontFamily: SCRIPT,
                    fontSize: 56,
                    color: FLORA_MAGENTA,
                    transform: 'rotate(-8deg)',
                  }}
                >
                  N°{i + 1}
                </Typography>
              </Box>
              <Stack spacing={0.5} sx={{ pt: 2, borderTop: `1px solid ${FLORA_INK}33` }}>
                <Typography
                  sx={{ fontFamily: SERIF, fontSize: 26, color: FLORA_INK, fontStyle: 'italic' }}
                >
                  {t.name}
                </Typography>
                <Typography
                  sx={{ fontFamily: SANS, fontSize: 11, color: FLORA_EMERALD, letterSpacing: 3 }}
                >
                  {t.role.toUpperCase()}
                </Typography>
                <Typography sx={{ fontFamily: SCRIPT, fontSize: 22, color: `${FLORA_INK}99` }}>
                  {t.sign}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 6. JOURNAL — editorial article links
// ============================================================
function Spa23Journal() {
  return (
    <Box component="section" sx={{ bgcolor: FLORA_CREAM, py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'flex-end' }}
          spacing={3}
          sx={{ mb: 6 }}
        >
          <Stack spacing={3}>
            <ChapterTag no="V" label="LE JOURNAL" />
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: { xs: 36, md: 52 },
                fontWeight: 300,
                color: FLORA_INK,
                letterSpacing: -1,
              }}
            >
              Cuốn nhật ký{' '}
              <Box component="span" sx={{ fontStyle: 'italic', color: FLORA_EMERALD }}>
                của atelier
              </Box>
              .
            </Typography>
          </Stack>
          <Button
            sx={{
              fontFamily: SANS,
              color: FLORA_INK,
              letterSpacing: 3,
              fontSize: 11,
              borderRadius: 0,
              borderBottom: `1px solid ${FLORA_INK}`,
              px: 0,
            }}
          >
            XEM TẤT CẢ →
          </Button>
        </Stack>
        <Box>
          {SPA23_JOURNAL.map((j) => (
            <Box
              key={j.title}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '160px 1fr 120px' },
                gap: 3,
                alignItems: 'center',
                py: 4,
                borderTop: `1px solid ${FLORA_INK}33`,
                cursor: 'pointer',
                transition: '.3s',
                '&:hover': {
                  bgcolor: `${FLORA_INK}06`,
                  '& .title': { color: FLORA_MAGENTA, fontStyle: 'italic' },
                },
              }}
            >
              <Typography
                sx={{ fontFamily: SANS, fontSize: 11, color: FLORA_GOLD, letterSpacing: 3 }}
              >
                {j.tag}
              </Typography>
              <Typography
                className="title"
                sx={{
                  fontFamily: SERIF,
                  fontSize: { xs: 22, md: 30 },
                  color: FLORA_INK,
                  transition: '.3s',
                }}
              >
                {j.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: SANS,
                  fontSize: 11,
                  color: `${FLORA_INK}88`,
                  letterSpacing: 2,
                  textAlign: { md: 'right' },
                }}
              >
                {j.read.toUpperCase()} →
              </Typography>
            </Box>
          ))}
          <Box sx={{ borderTop: `1px solid ${FLORA_INK}33` }} />
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 7. TESTIMONIALS — two large quotes side-by-side
// ============================================================
function Spa23Testimonials() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: FLORA_PAPER,
        py: { xs: 10, md: 16 },
        position: 'relative',
        backgroundImage: `radial-gradient(circle at 90% 10%, ${FLORA_BLUSH}55, transparent 40%), radial-gradient(circle at 10% 90%, ${FLORA_EMERALD}22, transparent 40%)`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3} sx={{ mb: 8, textAlign: 'center', alignItems: 'center' }}>
          <ChapterTag no="VI" label="LES VOIX" />
          <ScriptLine color={FLORA_EMERALD}>— ils nous écrivent</ScriptLine>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 8 },
          }}
        >
          {SPA23_TESTIMONIALS.map((t, i) => (
            <Box
              key={t.name}
              sx={{
                bgcolor: FLORA_PAPER,
                border: `1px solid ${FLORA_INK}22`,
                p: { xs: 4, md: 6 },
                position: 'relative',
                transform: { md: i ? 'translateY(40px)' : 'none' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: SCRIPT,
                  fontSize: 120,
                  color: `${FLORA_MAGENTA}44`,
                  position: 'absolute',
                  top: -20,
                  left: 16,
                  lineHeight: 1,
                }}
              >
                “
              </Typography>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontSize: { xs: 20, md: 26 },
                  color: FLORA_INK,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  position: 'relative',
                }}
              >
                {t.text}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mt: 4, pt: 3, borderTop: `1px solid ${FLORA_INK}22` }}
              >
                <Box sx={{ width: 36, height: '1px', bgcolor: FLORA_EMERALD }} />
                <Stack>
                  <Typography sx={{ fontFamily: SERIF, fontSize: 18, color: FLORA_INK }}>
                    {t.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: SANS,
                      fontSize: 11,
                      color: `${FLORA_INK}88`,
                      letterSpacing: 2,
                    }}
                  >
                    {t.role.toUpperCase()}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// 8. RESERVATION — paper form
// ============================================================
function Spa23Reservation() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: FLORA_INK, py: { xs: 10, md: 16 }, color: FLORA_PAPER }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 10 },
          }}
        >
          <Stack spacing={4}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: 40, height: '1px', bgcolor: FLORA_BLUSH }} />
              <Typography
                sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: 5, color: FLORA_BLUSH }}
              >
                VII · RÉSERVATION
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontSize: { xs: 40, md: 64 },
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: -1,
              }}
            >
              Đặt chỗ
              <br />
              <Box component="span" sx={{ fontStyle: 'italic', color: FLORA_BLUSH }}>
                tại atelier.
              </Box>
            </Typography>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 18,
                color: `${FLORA_PAPER}aa`,
                lineHeight: 1.8,
                maxWidth: 420,
              }}
            >
              Mỗi buổi chỉ phục vụ tối đa 6 khách — để mỗi nghi lễ là một buổi gặp riêng, không vội
              vã, không chen lấn.
            </Typography>
            <Stack spacing={2.5} sx={{ pt: 4, borderTop: `1px solid ${FLORA_PAPER}33` }}>
              <Stack direction="row" spacing={2}>
                <Iconify icon="solar:phone-bold" sx={{ color: FLORA_BLUSH }} />
                <Typography sx={{ fontFamily: SERIF, fontSize: 18 }}>+84 28 3823 0023</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Iconify icon="solar:map-point-bold" sx={{ color: FLORA_BLUSH }} />
                <Typography sx={{ fontFamily: SERIF, fontSize: 18 }}>
                  23 Đồng Khởi · Q.1 · TP.HCM
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={1.5} sx={{ pt: 3 }}>
              <Typography
                sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: 3, color: FLORA_BLUSH }}
              >
                HEURES D&lsquo;OUVERTURE
              </Typography>
              {SPA23_HOURS.map((h) => (
                <Stack
                  key={h.day}
                  direction="row"
                  justifyContent="space-between"
                  sx={{ borderBottom: `1px solid ${FLORA_PAPER}22`, pb: 1 }}
                >
                  <Typography sx={{ fontFamily: SERIF, fontSize: 16 }}>{h.day}</Typography>
                  <Typography sx={{ fontFamily: SANS, fontSize: 13, color: `${FLORA_PAPER}aa` }}>
                    {h.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <Box
            sx={{
              bgcolor: FLORA_PAPER,
              color: FLORA_INK,
              p: { xs: 4, md: 6 },
              border: `1px solid ${FLORA_GOLD}66`,
            }}
          >
            <Typography
              sx={{ fontFamily: SCRIPT, fontSize: 44, color: FLORA_MAGENTA, lineHeight: 1, mb: 1 }}
            >
              Réservez,
            </Typography>
            <Typography
              sx={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, color: FLORA_INK, mb: 4 }}
            >
              s&lsquo;il vous plaît.
            </Typography>
            <Stack spacing={2.5}>
              {[
                { label: 'NOM · HỌ TÊN', placeholder: 'Nguyễn Thu Hà' },
                { label: 'TÉLÉPHONE', placeholder: '+84 ...' },
                { label: 'RITUEL · CHỌN NGHI LỄ', placeholder: 'Camélia Royale' },
              ].map((f) => (
                <Box key={f.label}>
                  <Typography
                    sx={{
                      fontFamily: SANS,
                      fontSize: 10,
                      color: FLORA_EMERALD,
                      letterSpacing: 3,
                      mb: 0.5,
                    }}
                  >
                    {f.label}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder={f.placeholder}
                    InputProps={{
                      sx: {
                        fontFamily: SERIF,
                        fontSize: 20,
                        color: FLORA_INK,
                        '&:before': { borderColor: `${FLORA_INK}55` },
                        '&:hover:not(.Mui-disabled):before': { borderColor: FLORA_EMERALD },
                        '&:after': { borderColor: FLORA_MAGENTA },
                      },
                    }}
                  />
                </Box>
              ))}
              <Button
                fullWidth
                sx={{
                  mt: 3,
                  bgcolor: FLORA_INK,
                  color: FLORA_PAPER,
                  borderRadius: 0,
                  py: 1.75,
                  fontFamily: SANS,
                  letterSpacing: 3,
                  fontSize: 11,
                  '&:hover': { bgcolor: FLORA_EMERALD },
                }}
              >
                CONFIRMER LA RÉSERVATION
              </Button>
              <Typography
                sx={{
                  fontFamily: SANS,
                  fontSize: 10,
                  color: `${FLORA_INK}77`,
                  textAlign: 'center',
                  letterSpacing: 2,
                  pt: 1,
                }}
              >
                ◈ ĐỘI NGŨ XÁC NHẬN TRONG VÒNG 2 GIỜ
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ============================================================
// VIEW
// ============================================================
export function Spa23View() {
  const pageProgress = useScrollProgress();

  return (
    <Box sx={{ bgcolor: FLORA_PAPER }}>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Spa23Hero />
      <Spa23Philosophy />
      <Spa23Rituals />
      <Spa23Garden />
      <Spa23Team />
      <Spa23Journal />
      <Spa23Testimonials />
      <Spa23Reservation />
    </Box>
  );
}
