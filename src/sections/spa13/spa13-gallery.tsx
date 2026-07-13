import type { Spa13Lang } from 'src/sections/spa13/spa13-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const JUNGLE = '#0D4A2A';
const TROP_GOLD = '#F7C948';
const FLAME = '#E05D2A';
const FRESH = '#F0FFF4';

const IMGS = [
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80',
    caption: {
      vi: 'Rừng nhiệt đới hoang sơ',
      en: 'Wild tropical forest',
      fr: 'Forêt tropicale sauvage',
      cn: '原始热带雨林',
      ar: 'غابة استوائية برية',
    },
    h: 400,
    span: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    caption: {
      vi: 'Cabana tắm nước suối',
      en: 'Natural spring cabana',
      fr: 'Cabane de source naturelle',
      cn: '天然泉水小屋',
      ar: 'كوخ الينابيع الطبيعية',
    },
    h: 190,
    span: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    caption: {
      vi: 'Dầu thảo mộc nhiệt đới',
      en: 'Tropical botanical oils',
      fr: 'Huiles botaniques tropicales',
      cn: '热带植物精油',
      ar: 'زيوت نباتية استوائية',
    },
    h: 190,
    span: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80',
    caption: {
      vi: 'Open-air massage jungle',
      en: 'Open-air jungle massage',
      fr: 'Massage en plein air dans la jungle',
      cn: '丛林露天按摩',
      ar: 'تدليك في الهواء الطلق بالأدغال',
    },
    h: 360,
    span: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    caption: {
      vi: 'Yoga bình minh trên đỉnh đồi',
      en: 'Sunrise yoga on hilltop',
      fr: 'Yoga au lever du soleil sur la colline',
      cn: '山顶日出瑜伽',
      ar: 'يوغا عند الشروق على قمة التل',
    },
    h: 280,
    span: 12,
  },
];

const BOTANICALS = [
  {
    name: {
      vi: 'Gừng Rừng',
      en: 'Wild Ginger',
      fr: 'Gingembre sauvage',
      cn: '野姜',
      ar: 'الزنجبيل البري',
    },
    benefit: {
      vi: 'Kháng viêm, làm nóng, tăng tuần hoàn',
      en: 'Anti-inflammatory, warming, improves circulation',
      fr: 'Anti-inflammatoire, réchauffant, améliore la circulation',
      cn: '抗炎、温热、促进血液循环',
      ar: 'مضاد للالتهاب، مُدفئ، يحسّن الدورة الدموية',
    },
    icon: 'solar:leaf-bold-duotone',
    color: FLAME,
  },
  {
    name: {
      vi: 'Tinh Dầu Ylang-Ylang',
      en: 'Ylang-Ylang Essential Oil',
      fr: "Huile essentielle d'ylang-ylang",
      cn: '依兰依兰精油',
      ar: 'زيت الإيلنغ إيلنغ العطري',
    },
    benefit: {
      vi: 'Giảm huyết áp, cân bằng hormone, aphrodisiac tự nhiên',
      en: 'Lowers blood pressure, balances hormones, natural aphrodisiac',
      fr: 'Abaisse la tension artérielle, équilibre les hormones, aphrodisiaque naturel',
      cn: '降低血压、平衡荷尔蒙、天然催情',
      ar: 'يخفض ضغط الدم، يوازن الهرمونات، مثير طبيعي للرغبة',
    },
    icon: 'solar:flower-bold-duotone',
    color: TROP_GOLD,
  },
  {
    name: {
      vi: 'Trầm Hương Borneo',
      en: 'Borneo Agarwood',
      fr: "Bois d'agar de Bornéo",
      cn: '婆罗洲沉香',
      ar: 'عود بورنيو',
    },
    benefit: {
      vi: 'Chống trầm cảm, thiền định, bảo vệ thần kinh',
      en: 'Anti-depression, meditation, neuroprotective',
      fr: 'Anti-dépression, méditation, neuroprotecteur',
      cn: '抗抑郁、助冥想、保护神经',
      ar: 'مضاد للاكتئاب، للتأمل، واقٍ للأعصاب',
    },
    icon: 'solar:fire-bold-duotone',
    color: '#8B4513',
  },
  {
    name: {
      vi: 'Lá Pandan & Nước Dừa',
      en: 'Pandan & Coconut Water',
      fr: 'Pandan & eau de coco',
      cn: '斑兰叶与椰子水',
      ar: 'الباندان وماء جوز الهند',
    },
    benefit: {
      vi: 'Giải độc, làm mát cơ thể, kháng khuẩn tự nhiên',
      en: 'Detox, body cooling, natural antibacterial',
      fr: 'Détox, rafraîchit le corps, antibactérien naturel',
      cn: '排毒、清凉身体、天然抗菌',
      ar: 'إزالة السموم، تبريد الجسم، مضاد بكتيري طبيعي',
    },
    icon: 'solar:drop-bold-duotone',
    color: JUNGLE,
  },
];

export function Spa13Gallery() {
  const { currentLang } = useTranslate('spa13');
  const lang = currentLang.value as Spa13Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#040F08', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TROP_GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Tropical paradise',
                    vi: 'Thiên đường nhiệt đới',
                    fr: 'Paradis tropical',
                    cn: '热带天堂',
                    ar: 'الفردوس الاستوائي',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: FRESH, maxWidth: 440, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                (
                  {
                    en: 'Tropical forest ',
                    vi: 'Rừng nhiệt đới ',
                    fr: 'La forêt tropicale ',
                    cn: '热带雨林',
                    ar: 'الغابة الاستوائية ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: FLAME }}>
                {
                  (
                    {
                      en: 'is the treatment room',
                      vi: 'là phòng trị liệu',
                      fr: 'est la salle de soin',
                      cn: '即是疗愈室',
                      ar: 'هي غرفة العلاج',
                    } as const
                  )[lang]
                }
              </Box>
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
                  height: { xs: 240, md: img.h },
                  position: 'relative',
                  '&:hover img': { transform: 'scale(1.06)' },
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
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(4,15,8,0.8) 0%, transparent 55%)',
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
                    <Box sx={{ width: 14, height: 2, bgcolor: TROP_GOLD, borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: FRESH, fontWeight: 600 }}>
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
            bgcolor: 'rgba(13,74,42,0.2)',
            border: '1px solid rgba(247,201,72,0.12)',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: TROP_GOLD,
              letterSpacing: 4,
              fontWeight: 700,
              fontSize: 11,
              display: 'block',
              mb: 3,
              textAlign: 'center',
            }}
          >
            {
              (
                {
                  en: 'Signature tropical botanicals',
                  vi: 'Thảo mộc nhiệt đới đặc trưng',
                  fr: 'Plantes tropicales signature',
                  cn: '招牌热带植物',
                  ar: 'نباتات استوائية مميّزة',
                } as const
              )[lang]
            }
          </Typography>
          <Grid container spacing={3}>
            {BOTANICALS.map((b) => (
              <Grid key={b.name.en} item xs={12} sm={6} md={3}>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        bgcolor: `${b.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={b.icon} width={20} sx={{ color: b.color }} />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: FRESH, fontWeight: 800, fontSize: 14 }}
                    >
                      {b.name[lang]}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(240,255,244,0.45)', lineHeight: 1.7, fontSize: 12 }}
                  >
                    {b.benefit[lang]}
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
