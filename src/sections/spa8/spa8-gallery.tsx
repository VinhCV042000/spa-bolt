import type { Spa8Lang } from 'src/sections/spa8/spa8-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

const SAKURA = '#FFB7C5';
const OCEAN_DEEP = '#0A1F35';
const CREAM = '#FDFAF5';
const BAMBOO = '#4A7C59';

const SEASONS_IMGS = [
  {
    src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
    season: {
      vi: 'Xuân — Hoa anh đào nở',
      en: 'Spring — Cherry blossoms',
      fr: 'Printemps — Fleurs de cerisier',
      cn: '春 — 樱花绽放',
      ar: 'الربيع — أزهار الكرز',
    },
    accent: SAKURA,
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
    season: {
      vi: 'Hè — Rừng xanh mát',
      en: 'Summer — Cool green forest',
      fr: 'Été — Forêt verte et fraîche',
      cn: '夏 — 清凉绿林',
      ar: 'الصيف — غابة خضراء منعشة',
    },
    accent: BAMBOO,
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    season: {
      vi: 'Thu — Lá phong đỏ',
      en: 'Autumn — Red maple leaves',
      fr: 'Automne — Feuilles d’érable rouges',
      cn: '秋 — 红枫叶',
      ar: 'الخريف — أوراق القيقب الحمراء',
    },
    accent: '#F4A460',
  },
  {
    src: 'https://images.unsplash.com/photo-1479030160180-b1860951d696?w=900&q=80',
    season: {
      vi: 'Đông — Tuyết trắng',
      en: 'Winter — Pure white snow',
      fr: 'Hiver — Neige d’un blanc pur',
      cn: '冬 — 纯白白雪',
      ar: 'الشتاء — ثلج أبيض ناصع',
    },
    accent: '#B8D4F0',
  },
];

const HAIKU_QUOTES = [
  {
    jp: '古池や\n蛙飛び込む\n水の音',
    author: 'Matsuo Bashō',
    trans: {
      vi: 'Ao thu lặng lẽ\nMột con ếch nhảy xuống\nTiếng nước vang xa',
      en: 'An old silent pond\nA frog jumps into the pond\nSplash! Silence again',
      fr: 'Un vieil étang silencieux\nUne grenouille y plonge\nPlouf ! Le silence revient',
      cn: '古老寂静的池塘\n一只青蛙跃入\n水声之后又归寂静',
      ar: 'بركة قديمة ساكنة\nتقفز فيها ضفدعة\nخرير الماء ثم الصمت',
    },
    color: SAKURA,
  },
  {
    jp: '雪解けや\n村いっぱいの\n子どもかな',
    author: 'Kobayashi Issa',
    trans: {
      vi: 'Tuyết tan chảy\nKhắp làng đầy ắp\nTiếng trẻ con cười',
      en: 'The snow is melting\nAnd the village is flooded\nWith children',
      fr: 'La neige fond\nEt le village déborde\nD’enfants',
      cn: '白雪消融\n村庄里处处\n洋溢着孩童',
      ar: 'الثلج يذوب\nوالقرية تمتلئ\nبالأطفال',
    },
    color: BAMBOO,
  },
];

export function Spa8Gallery() {
  const { currentLang } = useTranslate('spa8');
  const lang = currentLang.value as Spa8Lang;

  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: OCEAN_DEEP, overflow: 'hidden' }}
    >
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: SAKURA, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                ({
                  en: 'Four seasons of Japan',
                  vi: 'Bốn mùa Nhật Bản',
                  fr: 'Les quatre saisons du Japon',
                  cn: '日本四季',
                  ar: 'فصول اليابان الأربعة',
                } as const)[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: CREAM, maxWidth: 420, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                ({
                  en: 'Every season ',
                  vi: 'Mỗi mùa ',
                  fr: 'Chaque saison ',
                  cn: '每一季 ',
                  ar: 'كل فصل ',
                } as const)[lang]
              }
              <Box component="span" sx={{ color: SAKURA }}>
                {
                  ({
                    en: 'a unique ritual',
                    vi: 'một nghi lễ riêng',
                    fr: 'un rituel unique',
                    cn: '一场专属的仪式',
                    ar: 'طقس فريد',
                  } as const)[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,250,245,0.4)', maxWidth: 500, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                ({
                  en: 'Japanese believe each season carries a different healing energy. Onsen treatments change to the rhythm of nature.',
                  vi: 'Người Nhật tin rằng mỗi mùa mang một năng lượng chữa lành khác nhau. Liệu trình tại Onsen thay đổi theo nhịp điệu thiên nhiên.',
                  fr: 'Les Japonais croient que chaque saison porte une énergie de guérison différente. Les soins Onsen évoluent au rythme de la nature.',
                  cn: '日本人相信每个季节都蕴含不同的疗愈能量。温泉疗程随着大自然的节奏而变化。',
                  ar: 'يؤمن اليابانيون بأن كل فصل يحمل طاقة شفاء مختلفة. تتغير علاجات الأونسن على إيقاع الطبيعة.',
                } as const)[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 6 }}>
          {SEASONS_IMGS.map((img, idx) => (
            <Grid key={img.src} item xs={12} sm={6} md={3}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 + idx * 10 }).inUp}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: { xs: 280, md: 420 },
                  position: 'relative',
                  '&:hover img': { transform: 'scale(1.06)' },
                  '&:hover .season-badge': { opacity: 1, y: 0 },
                }}
              >
                <Box
                  component="img"
                  src={img.src}
                  alt={img.season[lang]}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    filter: 'brightness(0.7) saturate(0.8)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: img.accent,
                    opacity: 0.12,
                    mixBlendMode: 'screen',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,31,53,0.85) 0%, transparent 50%)',
                  }}
                />
                <Box
                  className="season-badge"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2.5,
                    opacity: 0.85,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <Box sx={{ width: 24, height: 3, bgcolor: img.accent, borderRadius: 1, mb: 1 }} />
                  <Typography variant="subtitle2" sx={{ color: CREAM, fontWeight: 700 }}>
                    {img.season[lang]}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} component={m.div} variants={varFade({ distance: 20 }).inUp}>
          {HAIKU_QUOTES.map((h) => (
            <Grid key={h.author} item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${h.color}20`,
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: h.color },
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <Typography
                      sx={{
                        fontSize: { xs: 28, md: 32 },
                        color: h.color,
                        opacity: 0.5,
                        lineHeight: 2,
                        whiteSpace: 'pre-line',
                        letterSpacing: 4,
                        textAlign: 'center',
                        fontWeight: 300,
                      }}
                    >
                      {h.jp}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Stack spacing={2}>
                      <Box sx={{ width: 24, height: 3, bgcolor: h.color }} />
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(253,250,245,0.7)',
                          lineHeight: 1.9,
                          fontStyle: 'italic',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {h.trans[lang]}
                      </Typography>
                      <Typography variant="caption" sx={{ color: h.color, fontWeight: 700 }}>
                        — {h.author}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
