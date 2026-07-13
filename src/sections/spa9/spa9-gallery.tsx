import type { Spa9Lang } from 'src/sections/spa9/spa9-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const OCEAN = '#1B6CA8';
const SAGE = '#6B8E23';
const AMBER = '#F5A623';
const CREAM = '#FFFDF8';
const DARK = '#080F1A';

const IMGS = [
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    caption: {
      vi: 'Trị liệu ngoài trời',
      en: 'Outdoor therapy',
      fr: 'Thérapie en plein air',
      cn: '户外疗愈',
      ar: 'علاج في الهواء الطلق',
    },
    h: 420,
    span: 8,
    accent: SAGE,
  },
  {
    src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    caption: {
      vi: 'Thiền trong rừng',
      en: 'Forest meditation',
      fr: 'Méditation en forêt',
      cn: '森林冥想',
      ar: 'تأمل في الغابة',
    },
    h: 420,
    span: 4,
    accent: OCEAN,
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    caption: {
      vi: 'Yoga buổi sáng',
      en: 'Morning yoga',
      fr: 'Yoga du matin',
      cn: '晨间瑶伽',
      ar: 'يوغا الصباح',
    },
    h: 320,
    span: 4,
    accent: AMBER,
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    caption: {
      vi: 'Hồ bơi vô cực thiên nhiên',
      en: 'Infinity nature pool',
      fr: 'Piscine à débordement naturelle',
      cn: '自然无边泳池',
      ar: 'مسبح لانهائي طبيعي',
    },
    h: 320,
    span: 8,
    accent: OCEAN,
  },
];

const AWARDS = [
  {
    icon: 'solar:medal-bold-duotone',
    label: {
      vi: 'Spa sinh thái tốt nhất Đông Nam Á 2024',
      en: 'Best Eco Spa SEA 2024',
      fr: 'Meilleur éco-spa d’Asie du Sud-Est 2024',
      cn: '2024 东南亚最佳生态水疗',
      ar: 'أفضل سبا بيئي في جنوب شرق آسيا 2024',
    },
    org: 'World Spa Awards',
    color: AMBER,
  },
  {
    icon: 'solar:leaf-bold-duotone',
    label: {
      vi: 'Chứng nhận xanh LEED Platinum',
      en: 'LEED Platinum Green Certification',
      fr: 'Certification verte LEED Platinum',
      cn: 'LEED 铂级绿色认证',
      ar: 'شهادة LEED الخضراء البلاتينية',
    },
    org: 'USGBC',
    color: SAGE,
  },
  {
    icon: 'solar:heart-bold-duotone',
    label: {
      vi: 'Top 10 Wellness Resort Châu Á',
      en: 'Top 10 Wellness Resort Asia',
      fr: 'Top 10 des resorts bien-être d’Asie',
      cn: '亚洲十大康养度假酒店',
      ar: 'أفضل 10 منتجعات عافية في آسيا',
    },
    org: 'Condé Nast Traveller',
    color: OCEAN,
  },
];

export function Spa9Gallery() {
  const { currentLang } = useTranslate('spa9');
  const lang = currentLang.value as Spa9Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: DARK, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: AMBER, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {(
                {
                  en: 'Natural spaces',
                  vi: 'Không gian thiên nhiên',
                  fr: 'Espaces naturels',
                  cn: '自然空间',
                  ar: 'مساحات طبيعية',
                } as const
              )[lang]}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: CREAM, maxWidth: 440, mx: 'auto' }}
            >
              {(
                {
                  en: 'Merge with ',
                  vi: 'Hòa mình ',
                  fr: 'Fusionner avec ',
                  cn: '融入',
                  ar: 'اندمج مع ',
                } as const
              )[lang]}
              <Box component="span" sx={{ color: SAGE }}>
                {(
                  {
                    en: 'nature',
                    vi: 'vào thiên nhiên',
                    fr: 'la nature',
                    cn: '大自然',
                    ar: 'الطبيعة',
                  } as const
                )[lang]}
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
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, rgba(8,15,26,0.75) 0%, transparent 55%)`,
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
                    <Box sx={{ width: 14, height: 2, bgcolor: img.accent, borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: CREAM, fontWeight: 600 }}>
                      {img.caption[lang]}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} component={m.div} variants={varFade({ distance: 20 }).inUp}>
          {AWARDS.map((a) => (
            <Grid key={a.label.en} item xs={12} md={4}>
              <Box
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${a.color}25`,
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: a.color, bgcolor: `${a.color}05` },
                }}
              >
                <Stack direction="row" spacing={2.5} alignItems="center">
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: `${a.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon={a.icon} width={26} sx={{ color: a.color }} />
                  </Box>
                  <Stack spacing={0.25}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: CREAM, fontWeight: 700, lineHeight: 1.4 }}
                    >
                      {a.label[lang]}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: a.color, fontWeight: 600, fontSize: 11 }}
                    >
                      {a.org}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
