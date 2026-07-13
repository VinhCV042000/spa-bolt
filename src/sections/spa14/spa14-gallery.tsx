import type { Spa14Lang } from 'src/sections/spa14/spa14-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

const GARNET = '#8B1A2F';
const ANT_GOLD = '#C9A55A';
const IMP_CREAM = '#FAF0E6';
const EMERALD = '#2E7D32';
const DARK = '#0D0409';

const IMGS = [
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    caption: {
      vi: 'Đại sảnh Cung Đình',
      en: 'Imperial Grand Hall',
      fr: 'Grand Hall Impérial',
      cn: '皇家大厅',
      ar: 'القاعة الإمبراطورية الكبرى',
    },
    h: 420,
    span: 7,
  },
  {
    src: 'https://images.unsplash.com/photo-1615396462640-7a3d57d73e4e?w=600&q=80',
    caption: {
      vi: 'Phòng trị liệu Đế Vương',
      en: 'Royal Treatment Suite',
      fr: 'Suite de soins royale',
      cn: '皇家疗理套房',
      ar: 'جناح العلاج الملكي',
    },
    h: 200,
    span: 5,
  },
  {
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
    caption: {
      vi: 'Bồn tắm ngọc bích',
      en: 'Jade bathing basin',
      fr: 'Bassin de bain en jade',
      cn: '翡翠浴池',
      ar: 'حوض استحمام من اليشب',
    },
    h: 200,
    span: 5,
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
    caption: {
      vi: 'Vườn thư giãn hoàng gia',
      en: 'Royal relaxation garden',
      fr: 'Jardin de détente royal',
      cn: '皇家放松花园',
      ar: 'حديقة الاسترخاء الملكية',
    },
    h: 360,
    span: 7,
  },
];

const HERITAGE = [
  {
    year: '1500s',
    event: {
      vi: 'Triều Lê — Các nghi lễ tắm gội của vương phi được ghi chép lần đầu trong cung đình Thăng Long',
      en: 'Lê Dynasty — Royal bathing rituals of imperial consorts first documented in Thang Long citadel',
      fr: 'Dynastie Lê — Les rituels de bain royaux des concubines impériales documentés pour la première fois dans la citadelle de Thang Long',
      cn: '黎朝 — 后妃的沐浴仪式首次记载于升龙皇城',
      ar: 'سلالة لي — أُوثِّقت طقوس الاستحمام الملكية للمحظيات لأول مرة في قلعة تانغ لونغ',
    },
    color: GARNET,
  },
  {
    year: '1800s',
    event: {
      vi: 'Triều Nguyễn — Hoàng đế Tự Đức dùng nước ngâm thảo dược 36 vị, mỗi vị có công năng chữa bệnh riêng',
      en: 'Nguyễn Dynasty — Emperor Tự Đức used herbal soaks with 36 ingredients, each with specific medicinal properties',
      fr: 'Dynastie Nguyễn — L’empereur Tự Đức utilisait des bains aux plantes à 36 ingrédients, chacun aux propriétés médicinales spécifiques',
      cn: '阮朝 — 嗣德皇帝使用36味草药浸泡，每味都有特定的药用功效',
      ar: 'سلالة نغويين — استخدم الإمبراطور تو دوك نقعات عشبية من 36 مكونًا، لكل منها خصائص طبية محددة',
    },
    color: ANT_GOLD,
  },
  {
    year: '2024',
    event: {
      vi: 'Imperial Spa — phục dựng và hiện đại hóa 500 năm nghi lễ hoàng gia, kết hợp khoa học hiện đại',
      en: 'Imperial Spa — restoration and modernization of 500 years of royal rituals, combined with modern science',
      fr: 'Imperial Spa — restauration et modernisation de 500 ans de rituels royaux, combinées à la science moderne',
      cn: 'Imperial Spa — 修复并现代化500年皇家仪式，融合现代科学',
      ar: 'Imperial Spa — ترميم وتحديث 500 عام من الطقوس الملكية، بالدمج مع العلوم الحديثة',
    },
    color: EMERALD,
  },
];

export function Spa14Gallery() {
  const { currentLang } = useTranslate('spa14');
  const lang = currentLang.value as Spa14Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: DARK, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ANT_GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Royal spaces',
                    vi: 'Không gian hoàng gia',
                    fr: 'Espaces royaux',
                    cn: '皇家空间',
                    ar: 'المساحات الملكية',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: IMP_CREAM, maxWidth: 440, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                (
                  {
                    en: 'Architecture ',
                    vi: 'Kiến trúc ',
                    fr: 'Architecture ',
                    cn: '建筑 ',
                    ar: 'عمارة ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: GARNET }}>
                {
                  (
                    {
                      en: 'of millennial heritage',
                      vi: 'nghìn năm văn hiến',
                      fr: 'au patrimoine millénaire',
                      cn: '千年文化遗产',
                      ar: 'من التراث الألفي',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(250,240,230,0.4)', maxWidth: 500, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: 'Every space in Imperial Spa is a work of art — from thousands of mother-of-pearl inlays on the walls to jade stone floors imported from Yunnan.',
                    vi: 'Mỗi không gian trong Imperial Spa là một tác phẩm nghệ thuật — từ ngàn mảnh khảm trai trên tường đến sàn đá ngọc bích được nhập từ Vân Nam.',
                    fr: "Chaque espace de l'Imperial Spa est une œuvre d'art — des milliers d'incrustations de nacre sur les murs aux sols en jade importés du Yunnan.",
                    cn: 'Imperial Spa的每一个空间都是一件艺术品——从墙上成千上万的螺钿镛嵌到从云南进口的翡翠石地板。',
                    ar: 'كل مساحة في Imperial Spa هي عمل فني — من آلاف تطعيمات عرق اللؤلؤ على الجدران إلى أرضيات اليشب المستوردة من يونان.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 6 }}>
          {IMGS.map((img) => (
            <Grid key={img.src} item xs={12} sm={img.span}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: { xs: 260, md: img.h },
                  position: 'relative',
                  '&:hover img': { transform: 'scale(1.05)' },
                  '&:hover .cap': { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={img.src}
                  alt={img.caption[lang]}
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
                    bgcolor: GARNET,
                    opacity: 0.08,
                    mixBlendMode: 'multiply',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(13,4,9,0.8) 0%, transparent 55%)',
                  }}
                />
                <Box
                  className="cap"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2.5,
                    opacity: 0.8,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 14, height: 2, bgcolor: ANT_GOLD, borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: IMP_CREAM, fontWeight: 600 }}>
                      {img.caption[lang]}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            bgcolor: 'rgba(139,26,47,0.06)',
            border: '1px solid rgba(201,165,90,0.15)',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: ANT_GOLD,
              letterSpacing: 4,
              fontWeight: 700,
              fontSize: 11,
              display: 'block',
              mb: 3.5,
              textAlign: 'center',
            }}
          >
            {
              (
                {
                  en: '500 years of royal ritual heritage',
                  vi: '500 năm di sản nghi lễ hoàng gia',
                  fr: '500 ans de patrimoine de rituels royaux',
                  cn: '500年皇家仪式遗产',
                  ar: '500 عام من تراث الطقوس الملكية',
                } as const
              )[lang]
            }
          </Typography>
          <Stack spacing={0}>
            {HERITAGE.map((h, idx) => (
              <Stack key={h.year} direction="row" spacing={3} alignItems="flex-start">
                <Stack alignItems="center" spacing={0}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: h.color,
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  />
                  {idx < HERITAGE.length - 1 && (
                    <Box sx={{ width: 2, height: 48, bgcolor: `${h.color}30` }} />
                  )}
                </Stack>
                <Stack spacing={0.5} sx={{ pb: idx < HERITAGE.length - 1 ? 2 : 0 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: h.color, fontWeight: 800, fontSize: 12 }}
                  >
                    {h.year}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(250,240,230,0.55)', lineHeight: 1.7 }}
                  >
                    {h.event[lang]}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
