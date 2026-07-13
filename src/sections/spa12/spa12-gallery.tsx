import type { Spa12Lang } from 'src/sections/spa12/spa12-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const CHAMPAGNE = '#D4AF37';
const DEEP_NAVY = '#0A1628';
const PEARL = '#F9F6EE';
const ROSE_GOLD = '#B76E79';

const IMGS = [
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    caption: {
      vi: 'Grand Spa Suite — tầng 35',
      en: 'Grand Spa Suite — floor 35',
      fr: 'Grand Spa Suite — étage 35',
      cn: 'Grand Spa Suite — 35层',
      ar: 'Grand Spa Suite — الطابق 35',
    },
    h: 440,
    span: 7,
    color: CHAMPAGNE,
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
    caption: {
      vi: 'Phòng massage vàng 24K',
      en: '24K gold massage room',
      fr: 'Salle de massage à l’or 24K',
      cn: '24K黄金按摩室',
      ar: 'غرفة التدليك بالذهب عيار 24',
    },
    h: 210,
    span: 5,
    color: ROSE_GOLD,
  },
  {
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    caption: {
      vi: 'Hồ bơi ngập tràn tầng thượng',
      en: 'Rooftop infinity pool',
      fr: 'Piscine à débordement sur le toit',
      cn: '天台无边际泳池',
      ar: 'مسبح لامتناهي على السطح',
    },
    h: 210,
    span: 5,
    color: '#7ECEF4',
  },
  {
    src: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=900&q=80',
    caption: {
      vi: 'Sky Lounge — tầm nhìn toàn thành phố',
      en: 'Sky Lounge — panoramic city view',
      fr: 'Sky Lounge — vue panoramique sur la ville',
      cn: 'Sky Lounge — 全城全景视野',
      ar: 'Sky Lounge — إطلالة بانورامية على المدينة',
    },
    h: 320,
    span: 7,
    color: CHAMPAGNE,
  },
];

const AWARDS = [
  {
    label: {
      vi: 'Spa Sang trọng nhất Đông Nam Á 2024',
      en: 'Most Luxurious Spa SEA 2024',
      fr: 'Spa le plus luxueux d’Asie du Sud-Est 2024',
      cn: '2024东南亚最奢华水疗中心',
      ar: 'أفخم سبا في جنوب شرق آسيا 2024',
    },
    org: 'World Luxury Spa Awards',
    icon: 'solar:crown-bold-duotone',
    color: CHAMPAGNE,
  },
  {
    label: {
      vi: 'Five Star Rating — Luxury Spa Category',
      en: 'Five Star Rating — Luxury Spa Category',
      fr: 'Note cinq étoiles — Catégorie Spa de luxe',
      cn: '五星评级 — 奢华水疗类别',
      ar: 'تصنيف خمس نجوم — فئة السبا الفاخر',
    },
    org: 'Forbes Travel Guide',
    icon: 'solar:star-bold-duotone',
    color: ROSE_GOLD,
  },
  {
    label: {
      vi: 'Best Urban Wellness Retreat 2024',
      en: 'Best Urban Wellness Retreat 2024',
      fr: 'Meilleure retraite bien-être urbaine 2024',
      cn: '2024最佳都市健康静修地',
      ar: 'أفضل ملاذ صحي حضري 2024',
    },
    org: 'Condé Nast Traveller Asia',
    icon: 'solar:medal-bold-duotone',
    color: '#C8B8A2',
  },
];

export function Spa12Gallery() {
  const { currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: DEEP_NAVY, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Exclusive spaces',
                    vi: 'Không gian độc quyền',
                    fr: 'Espaces exclusifs',
                    cn: '专属空间',
                    ar: 'مساحات حصرية',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: PEARL, maxWidth: 440, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                (
                  {
                    en: 'Where luxury ',
                    vi: 'Nơi sang trọng ',
                    fr: 'Où le luxe ',
                    cn: '豪华之处 ',
                    ar: 'حيث الفخامة ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {
                  (
                    {
                      en: 'reaches its peak',
                      vi: 'chạm đỉnh cao',
                      fr: 'atteint son sommet',
                      cn: '臻至巅峰',
                      ar: 'تبلغ ذروتها',
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
                    filter: 'brightness(0.75) saturate(0.85)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, rgba(10,22,40,0.8) 0%, transparent 55%)`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: img.color,
                    opacity: 0.05,
                    mixBlendMode: 'screen',
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
                    opacity: 0.75,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 14, height: 2, bgcolor: CHAMPAGNE, borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: PEARL, fontWeight: 600 }}>
                      {img.caption[lang]}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2.5} component={m.div} variants={varFade({ distance: 20 }).inUp}>
          {AWARDS.map((a) => (
            <Grid key={a.label.en} item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'rgba(212,175,55,0.04)',
                  border: `1px solid ${a.color}20`,
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: a.color, bgcolor: `${a.color}06` },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      bgcolor: `${a.color}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon={a.icon} width={24} sx={{ color: a.color }} />
                  </Box>
                  <Stack spacing={0.25}>
                    <Typography
                      variant="body2"
                      sx={{ color: PEARL, fontWeight: 700, lineHeight: 1.4, fontSize: 13 }}
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
