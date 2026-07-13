import type { Spa11Lang } from 'src/sections/spa11/spa11-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { TERRACOTTA, ARGAN_GOLD, CREAM_WARM } from 'src/sections/spa11/spa11-data';

// ----------------------------------------------------------------------

const GALLERY_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=900&q=80',
    caption: {
      vi: 'Vòm Hammam cổ kính',
      en: 'Ancient Hammam vaults',
      fr: 'Voûtes anciennes du Hammam',
      cn: '古老的 Hammam 拱顶',
      ar: 'أقبية الحمام القديمة',
    },
    span: { xs: 12, sm: 8 },
    height: 420,
  },
  {
    src: 'https://images.unsplash.com/photo-1615396462640-7a3d57d73e4e?w=600&q=80',
    caption: {
      vi: 'Dầu Argan Agadir',
      en: 'Agadir argan oil',
      fr: "Huile d'argan d'Agadir",
      cn: 'Agadir 阿甘油',
      ar: 'زيت أركان أغادير',
    },
    span: { xs: 12, sm: 4 },
    height: 420,
  },
  {
    src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    caption: {
      vi: 'Kessa thủ công Morocco',
      en: 'Handmade Moroccan kessa',
      fr: 'Kessa marocain fait main',
      cn: '手工摩洛哥 Kessa',
      ar: 'كيسة مغربية صنع يدوي',
    },
    span: { xs: 12, sm: 4 },
    height: 340,
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    caption: {
      vi: 'Nghi lễ Beldi xà phòng đen',
      en: 'Black soap Beldi ritual',
      fr: 'Rituel du savon noir Beldi',
      cn: 'Beldi 黑皂仪式',
      ar: 'طقوس الصابون الأسود بلدي',
    },
    span: { xs: 12, sm: 8 },
    height: 340,
  },
];

const FACTS = [
  {
    num: '5000',
    unit: { vi: 'năm', en: 'years', fr: 'ans', cn: '年', ar: 'سنة' },
    label: {
      vi: 'lịch sử Hammam',
      en: 'of Hammam history',
      fr: "d'histoire du Hammam",
      cn: 'Hammam 历史',
      ar: 'من تاريخ الحمام',
    },
    color: TERRACOTTA,
  },
  {
    num: '40',
    unit: { vi: '%', en: '%', fr: '%', cn: '%', ar: '%' },
    label: {
      vi: 'da sạch hơn sau 1 buổi',
      en: 'cleaner skin after 1 session',
      fr: 'peau plus nette après 1 séance',
      cn: '一次后肌肤更清洁',
      ar: 'بشرة أنظف بعد جلسة واحدة',
    },
    color: ARGAN_GOLD,
  },
  {
    num: '3',
    unit: { vi: '×', en: '×', fr: '×', cn: '×', ar: '×' },
    label: {
      vi: 'độ ẩm da tăng gấp 3',
      en: 'skin hydration increase',
      fr: "d'hydratation de la peau",
      cn: '肌肤水分提升 3 倍',
      ar: 'زيادة ترطيب البشرة',
    },
    color: '#1A3A6B',
  },
];

export function Spa11Gallery() {
  const { currentLang } = useTranslate('spa11');
  const lang = currentLang.value as Spa11Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#120804', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ARGAN_GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'The Hammam World',
                    vi: 'Không gian Hammam',
                    fr: 'Le monde du Hammam',
                    cn: 'Hammam 世界',
                    ar: 'عالم الحمام',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: CREAM_WARM,
                maxWidth: 480,
                mx: 'auto',
                lineHeight: 1.1,
              }}
            >
              {
                (
                  {
                    en: 'Step into ',
                    vi: 'Bước vào ',
                    fr: 'Entrez dans ',
                    cn: '踏入 ',
                    ar: 'ادخل إلى ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {
                  (
                    {
                      en: 'Marrakech',
                      vi: 'Marrakech',
                      fr: 'Marrakech',
                      cn: '马拉喀什',
                      ar: 'مراكش',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,243,227,0.45)', maxWidth: 520, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: 'Moorish architecture, candlelight, steam scented with eucalyptus oil — every corner of Hammam Marrakech is a living painting from the Medina.',
                    vi: 'Kiến trúc Moorish, ánh nến, hơi nước thơm dầu bạch đàn — mỗi góc của Hammam Marrakech là một bức tranh sống động từ Medina.',
                    fr: "Architecture mauresque, lumière des bougies, vapeur parfumée à l'huile d'eucalyptus — chaque coin du Hammam Marrakech est un tableau vivant de la Médina.",
                    cn: '摩尔式建筑、烛光、桉树油香的蒸汽——Hammam Marrakech 的每个角落都是来自麦迪那的生动画卷。',
                    ar: 'عمارة مغربية، ضوء الشموع، بخار معطر بزيت الأوكالبتوس — كل ركن من حمام مراكش لوحة حية من المدينة.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        {/* Mosaic gallery */}
        <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {GALLERY_ITEMS.map((item, idx) => (
              <Grid key={item.src} item xs={item.span.xs} sm={item.span.sm}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: item.height,
                    position: 'relative',
                    transition: 'all 0.35s ease',
                    '&:hover img': { transform: 'scale(1.06)' },
                    '&:hover .gallery-caption': { opacity: 1, y: 0 },
                  }}
                >
                  <Box
                    component="img"
                    src={item.src}
                    alt={item.caption[lang]}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  {/* Dark overlay gradient */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, rgba(18,8,4,0.75) 0%, rgba(18,8,4,0.1) 50%, transparent 100%)`,
                    }}
                  />
                  {/* Terracotta tint on hover */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: TERRACOTTA,
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      '&:hover': { opacity: 0.08 },
                      mixBlendMode: 'color',
                    }}
                  />
                  {/* Caption */}
                  <Box
                    className="gallery-caption"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: { xs: 2, md: 3 },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ width: 16, height: 2, bgcolor: ARGAN_GOLD, borderRadius: 1 }} />
                      <Typography
                        variant="caption"
                        sx={{ color: CREAM_WARM, fontWeight: 600, fontSize: { xs: 12, md: 13 } }}
                      >
                        {item.caption[lang]}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats bar */}
        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            p: { xs: 3.5, md: 5 },
            borderRadius: 4,
            background: `linear-gradient(135deg, rgba(194,75,46,0.08) 0%, rgba(30,12,5,0.9) 100%)`,
            border: `1px solid rgba(212,160,23,0.15)`,
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            {FACTS.map((fact) => (
              <Grid key={fact.label.en} item xs={12} sm={4}>
                <Stack alignItems="center" spacing={0.75} sx={{ textAlign: 'center' }}>
                  <Stack direction="row" alignItems="flex-end" spacing={0.5}>
                    <Typography
                      sx={{
                        fontSize: { xs: 48, md: 60 },
                        fontWeight: 900,
                        color: CREAM_WARM,
                        lineHeight: 1,
                        letterSpacing: -2,
                      }}
                    >
                      {fact.num}
                    </Typography>
                    <Typography sx={{ fontSize: 24, fontWeight: 700, color: fact.color, mb: 0.5 }}>
                      {fact.unit[lang]}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'rgba(253,243,227,0.55)', fontWeight: 600 }}
                  >
                    {fact.label[lang]}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
