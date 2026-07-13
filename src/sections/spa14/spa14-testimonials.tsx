import type { Spa14Lang } from 'src/sections/spa14/spa14-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { GARNET, EMERALD, ANTIQUE_GOLD, IMPERIAL_CREAM } from 'src/sections/spa14/spa14-data';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    text: {
      vi: 'Vinotherapy — tắm rượu vang Grüner Veltliner 30 phút, da mềm như lụa. Cảm giác được đưa về một cung điện Áo-Hung thế kỷ XIX.',
      en: 'Vinotherapy — Grüner Veltliner wine bath for 30 minutes, skin soft as silk. Felt transported to a 19th-century Austro-Hungarian palace.',
      fr: "Vinotherapy — bain de vin Grüner Veltliner pendant 30 minutes, peau douce comme la soie. J'avais l'impression d'être transporté dans un palais austro-hongrois du XIXe siècle.",
      cn: '葡萄酒疗法——绿维特利纳葡萄酒浴30分钟，肌肤如丝绸般柔软。仿佛穿越到19世纪的奥匈帝国宫殿。',
      ar: 'العلاج بالنبيذ — حمام نبيذ غرونر فيلتلينر لمدة 30 دقيقة، البشرة ناعمة كالحرير. شعرت وكأنني نُقلت إلى قصر نمساوي مجري من القرن التاسع عشر.',
    },
    name: 'Sophie Marchand',
    role: {
      vi: 'Paris · Du khách',
      en: 'Paris · Visitor',
      fr: 'Paris · Visiteuse',
      cn: '巴黎 · 游客',
      ar: 'باريس · زائرة',
    },
    rating: 5,
    color: GARNET,
  },
  {
    text: {
      vi: 'Empress Sisi Facial dùng mặt nạ trứng cút + sữa ngựa Lipizzaner. Da sáng rõ rệt sau 1 buổi, và mùi hương hoa hồng Bulgaria thật thư giãn.',
      en: 'Empress Sisi Facial with quail egg mask + Lipizzaner horse milk. Skin visibly brighter after 1 session, and Bulgarian rose scent was deeply relaxing.',
      fr: 'Soin du visage Impératrice Sissi avec masque aux œufs de caille et lait de jument Lipizzan. Peau visiblement plus lumineuse après 1 séance, et le parfum de rose bulgare était profondément relaxant.',
      cn: '茜茜皇后焕颜护理使用鹌鹑蛋面膜+利皮扎马奶。仅一次疗程后肌肤明显提亮，保加利亚玫瑰香气令人深度放松。',
      ar: 'العناية بوجه الإمبراطورة سيسي بقناع بيض السمان وحليب خيل ليبيتسانر. البشرة أكثر إشراقًا بوضوح بعد جلسة واحدة، ورائحة الورد البلغاري مريحة حقًا.',
    },
    name: 'Nguyễn Thanh Hà',
    role: {
      vi: 'TP.HCM · Khách thường niên',
      en: 'Ho Chi Minh City · Regular',
      fr: 'Ho Chi Minh Ville · Cliente régulière',
      cn: '胡志明市 · 常客',
      ar: 'مدينة هوشي منه · عميلة دائمة',
    },
    rating: 5,
    color: ANTIQUE_GOLD,
  },
  {
    text: {
      vi: 'Vienna Waltz Massage theo nhịp 3/4 với nhạc Mozart — thư giãn sâu hơn bất kỳ liệu trình nào từng trải nghiệm. Dầu hoa oải hương Alps thật tinh tế.',
      en: 'Vienna Waltz Massage in 3/4 rhythm to Mozart — more deeply relaxing than any treatment I have ever experienced. Alpine lavender oil was truly exquisite.',
      fr: "Massage Valse de Vienne au rythme 3/4 sur Mozart — plus relaxant que tout traitement que j'ai jamais vécu. L'huile de lavande alpine était vraiment exquise.",
      cn: '以莫扎特3/4节拍进行的维也纳华尔兹按摩——比任何体验过的疗程都更深度放松。阿尔卑斯薰衣草精油确实精致。',
      ar: 'تدليك فالس فيينا بإيقاع 3/4 مع موتسارت — استرخاء أعمق من أي علاج جربته قط. زيت الخزامى الألبي كان فائقًا حقًا.',
    },
    name: 'Johannes Müller',
    role: {
      vi: 'Vienna · Du khách',
      en: 'Vienna · Visitor',
      fr: 'Vienne · Visiteur',
      cn: '维也纳 · 游客',
      ar: 'فيينا · زائر',
    },
    rating: 5,
    color: EMERALD,
  },
];

// ----------------------------------------------------------------------

export function Spa14Testimonials() {
  const { currentLang } = useTranslate('spa14');
  const lang = currentLang.value as Spa14Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#1A0A0A' }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ANTIQUE_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {
                {
                  vi: 'ĐÁNH GIÁ KHÁCH HÀNG',
                  en: 'GUEST REVIEWS',
                  fr: 'AVIS DES CLIENTS',
                  cn: '客户评价',
                  ar: 'آراء الضيوف',
                }[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: IMPERIAL_CREAM,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              {
                {
                  vi: 'Tiếng nói từ',
                  en: 'Voices from',
                  fr: 'Voix de',
                  cn: '来自',
                  ar: 'أصوات من',
                }[lang]
              }{' '}
              <Box component="span" sx={{ color: ANTIQUE_GOLD }}>
                {
                  {
                    vi: 'triều đình Áo-Hung',
                    en: 'Austro-Hungarian court',
                    fr: 'la cour austro-hongroise',
                    cn: '奥匈帝国宫廷',
                    ar: 'البلاط النمساوي المجري',
                  }[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        {/* Testimonials Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
            gap: 3,
          }}
        >
          {TESTIMONIALS.map((item, index) => (
            <Box
              key={item.name}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                bgcolor: '#2A1515',
                border: `1px solid ${item.color}30`,
                transition: 'all 0.35s ease',
                '&:hover': {
                  borderColor: item.color,
                  transform: 'translateY(-6px)',
                  boxShadow: `0 24px 60px ${item.color}15`,
                },
              }}
            >
              {/* Quote mark */}
              <Typography sx={{ color: item.color, fontSize: 48, lineHeight: 1, mb: 1 }}>
                &ldquo;
              </Typography>

              {/* Rating */}
              <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Iconify key={i} icon="solar:star-bold" width={14} sx={{ color: ANTIQUE_GOLD }} />
                ))}
              </Stack>

              {/* Quote text */}
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(250,240,230,0.75)',
                  lineHeight: 1.85,
                  fontStyle: 'italic',
                  mb: 3,
                }}
              >
                {item.text[lang]}
              </Typography>

              {/* Author */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: '#1A0A0A', fontWeight: 900 }}>
                    {item.name.charAt(0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: IMPERIAL_CREAM, fontWeight: 700 }} variant="body2">
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(250,240,230,0.5)' }}>
                    {item.role[lang]}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
