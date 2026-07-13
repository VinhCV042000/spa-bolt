import type { Spa13Lang } from 'src/sections/spa13/spa13-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { FLAME, FRESH, JUNGLE, TROP_GOLD } from 'src/sections/spa13/spa13-data';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    text: {
      vi: 'Açaí Glow Scrub thật sự khác biệt — da sáng lên ngay sau buổi đầu. Được trải nghiệm tinh dầu andiroba nguyên chất từ Kayapó là điều vô giá.',
      en: 'The Açaí Glow Scrub is truly different — my skin glowed right after the first session. Experiencing pure andiroba oil from the Kayapó people is priceless.',
      fr: "L'Açaí Glow Scrub est vraiment différent — ma peau brillait juste après la première séance. Vivre l'huile d'andiroba pure du peuple Kayapó est inestimable.",
      cn: '阿萨伊焕采磨砂真的与众不同——第一次疗程后肌肤即刻焕发光彩。体验来自卡雅波人的纯安迪罗巴油是无价的。',
      ar: 'تقشير الأساي المضيء مختلف حقًا — بشرتي تألقت بعد الجلسة الأولى. تجربة زيت الأنديروبا النقي من شعب الكايابو لا تُقدّر بثمن.',
    },
    name: 'Minh Anh',
    role: {
      vi: 'TP.HCM · Thường niên',
      en: 'Ho Chi Minh City · Regular',
      fr: 'Ho Chi Minh Ville · Client régulier',
      cn: '胡志明市 · 常客',
      ar: 'مدينة هوشي منه · عميل دائم',
    },
    rating: 5,
  },
  {
    text: {
      vi: 'Argila Detox — 90 phút trong bùn trắng Amazon, cảm giác như được về nguyên bản. Đất sét khoáng chất từ hàng triệu năm địa tầng hút sạch độc tố.',
      en: 'Argila Detox — 90 minutes in white Amazon clay, feels like returning to the source. Mineral clay from millions of years of sediment draws out all toxins.',
      fr: "Argila Detox — 90 minutes dans l'argile blanche amazonienne, c'est comme revenir à la source. L'argile minérale issue de millions d'années de sédiments draine toutes les toxines.",
      cn: '白黏土排毒——在亚马逊白黏土中度过90分钟，感觉像回归本源。数百万年沉积形成的矿物黏土吸走所有毒素。',
      ar: 'أرغيلا ديتوكس — 90 دقيقة في طين الأمازون الأبيض، شعور كالعودة إلى الأصل. الطين المعدني من ملايين السنين من الرواسب يسحب كل السموم.',
    },
    name: 'Thomas Laurent',
    role: {
      vi: 'Paris · Du khách',
      en: 'Paris · Visitor',
      fr: 'Paris · Visiteur',
      cn: '巴黎 · 游客',
      ar: 'باريس · زائر',
    },
    rating: 5,
  },
  {
    text: {
      vi: 'Selva Completa 3 tiếng — từ tắm açaí đến massage andiroba, đắp argila và kết thúc với trà cacao thảo dược. Thoáng như lạc vào rừng già Amazon.',
      en: 'Selva Completa 3 hours — from açaí bath to andiroba massage, argila wrap and ending with herbal cocoa tea. Feels like getting lost in the ancient Amazon.',
      fr: "Selva Completa 3 heures — du bain d'açaí au massage à l'andiroba, enveloppement d'argile et finissant avec du thé cacao aux herbes. On se croirait perdu dans l'ancienne forêt amazonienne.",
      cn: 'Selva Completa 3小时——从阿萨伊浴到安迪罗巴按摩、白黏土裹敷，再以草本可可茶收尾。仿佛迷失在古老的亚马逊雨林中。',
      ar: 'سيلفا كومبليتا 3 ساعات — من حمام الأساي إلى تدليك الأنديروبا ولفّ الطين وشاي الكاكاو العشبي. أشعر كأنني ضلعت في غابة الأمازون القديمة.',
    },
    name: 'Nguyễn Thanh Hằng',
    role: {
      vi: 'Hà Nội · Beauty blogger',
      en: 'Hanoi · Beauty blogger',
      fr: 'Hanoï · Blogueuse beauté',
      cn: '河内 · 美妆博主',
      ar: 'هانوي · مدونة تجميل',
    },
    rating: 5,
  },
];

// ----------------------------------------------------------------------

export function Spa13Testimonials() {
  const { currentLang } = useTranslate('spa13');
  const lang = currentLang.value as Spa13Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: JUNGLE }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TROP_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
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
                color: FRESH,
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
              <Box component="span" sx={{ color: TROP_GOLD }}>
                {
                  {
                    vi: 'rừng già Amazon',
                    en: 'the Amazon forest',
                    fr: 'la forêt amazonienne',
                    cn: '亚马逊雨林',
                    ar: 'غابة الأمازون',
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
                borderRadius: 3,
                bgcolor: 'rgba(0,0,0,0.3)',
                border: `1px solid rgba(212,169,72,0.15)`,
                transition: 'all 0.35s ease',
                '&:hover': {
                  borderColor: TROP_GOLD,
                  transform: 'translateY(-6px)',
                  boxShadow: `0 24px 60px rgba(212,169,72,0.08)`,
                },
              }}
            >
              {/* Rating stars */}
              <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Iconify key={i} icon="solar:star-bold" width={16} sx={{ color: TROP_GOLD }} />
                ))}
              </Stack>

              {/* Quote */}
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(240,255,244,0.8)',
                  lineHeight: 1.85,
                  fontStyle: 'italic',
                  mb: 3,
                }}
              >
                &ldquo;{item.text[lang]}&rdquo;
              </Typography>

              {/* Author */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: FLAME,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: FRESH, fontWeight: 900 }}>
                    {item.name.charAt(0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: FRESH, fontWeight: 700 }}>{item.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(240,255,244,0.5)' }}>
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
