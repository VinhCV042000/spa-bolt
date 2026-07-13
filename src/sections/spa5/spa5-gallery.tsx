import type { Spa5Lang } from 'src/sections/spa5/spa5-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const DEEP_NAVY = '#0B0D2E';
const GOLD = '#C9A84C';
const CREAM = '#FDF8F0';

const GALLERY = [
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    caption: {
      vi: 'Hồ bơi ngập tràn ánh sáng',
      en: 'Light-flooded infinity pool',
      fr: 'À débordement baignée de lumière',
      cn: '光影流泻的无边泳池',
      ar: 'مسبح لا متناهٍ يغمره الضوء',
    },
    span: 8,
    h: 460,
  },
  {
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
    caption: {
      vi: 'Phòng trị liệu đá nóng',
      en: 'Hot stone therapy suite',
      fr: 'Suite de thérapie aux pierres chaudes',
      cn: '热石理疗套房',
      ar: 'جناح العلاج بالحجر الساخن',
    },
    span: 4,
    h: 460,
  },
  {
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    caption: {
      vi: 'Liệu pháp vàng 24K',
      en: '24K gold therapy',
      fr: "À l'or 24 carats",
      cn: '24K 黄金疗法',
      ar: 'علاج الذهب عيار 24',
    },
    span: 4,
    h: 360,
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
    caption: {
      vi: 'Lounge thư giãn riêng',
      en: 'Private relaxation lounge',
      fr: 'Salon de détente privé',
      cn: '私人放松休息室',
      ar: 'صالة استرخاء خاصة',
    },
    span: 8,
    h: 360,
  },
];

const STATS = [
  {
    val: '14',
    unit: { vi: 'năm', en: 'years', fr: 'ans', cn: '年', ar: 'سنة' },
    label: {
      vi: 'kinh nghiệm luxury',
      en: 'luxury experience',
      fr: "d'expérience luxe",
      cn: '奢华体验',
      ar: 'خبرة فاخرة',
    },
    icon: 'solar:star-bold-duotone',
    color: GOLD,
  },
  {
    val: '98',
    unit: { vi: '%', en: '%', fr: '%', cn: '%', ar: '%' },
    label: { vi: 'hài lòng', en: 'satisfaction', fr: 'satisfaction', cn: '满意度', ar: 'رضا' },
    icon: 'solar:heart-bold-duotone',
    color: '#E85D04',
  },
  {
    val: '3',
    unit: { vi: 'X', en: 'X', fr: 'X', cn: 'X', ar: 'X' },
    label: {
      vi: 'giải thưởng Forbes',
      en: 'Forbes awards',
      fr: 'prix Forbes',
      cn: '福布斯奖项',
      ar: 'جوائز فوربس',
    },
    icon: 'solar:medal-bold-duotone',
    color: '#7C3AED',
  },
  {
    val: '500',
    unit: { vi: '+', en: '+', fr: '+', cn: '+', ar: '+' },
    label: {
      vi: 'VIP thành viên',
      en: 'VIP members',
      fr: 'membres VIP',
      cn: 'VIP 会员',
      ar: 'أعضاء VIP',
    },
    icon: 'solar:crown-bold-duotone',
    color: '#00C9A7',
  },
];

export function Spa5Gallery() {
  const { currentLang } = useTranslate('spa5');
  const lang = currentLang.value as Spa5Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: DEEP_NAVY, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Exclusive Spaces',
                    vi: 'Không gian cao cấp',
                    fr: 'Espaces exclusifs',
                    cn: '尊享空间',
                    ar: 'مساحات حصرية',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: CREAM, maxWidth: 460, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                (
                  {
                    en: 'Where luxury ',
                    vi: 'Nơi xa xỉ ',
                    fr: 'Là où le luxe ',
                    cn: '当奢华',
                    ar: 'حيث تصبح الفخامة ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: GOLD }}>
                {
                  (
                    {
                      en: 'becomes real',
                      vi: 'trở thành hiện thực',
                      fr: 'devient réalité',
                      cn: '成为现实',
                      ar: 'حقيقة',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 5 }}>
          {GALLERY.map((img) => (
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
                    background: 'linear-gradient(to top, rgba(11,13,46,0.75) 0%, transparent 55%)',
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
                    <Box sx={{ width: 14, height: 2, bgcolor: GOLD, borderRadius: 1 }} />
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
          {STATS.map((s) => (
            <Grid key={s.label.en} item xs={6} md={3}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  textAlign: 'center',
                }}
              >
                <Stack spacing={1} alignItems="center">
                  <Iconify icon={s.icon} width={28} sx={{ color: s.color }} />
                  <Stack direction="row" alignItems="baseline" spacing={0.5}>
                    <Typography
                      sx={{
                        fontSize: { xs: 36, md: 44 },
                        fontWeight: 900,
                        color: CREAM,
                        lineHeight: 1,
                      }}
                    >
                      {s.val}
                    </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: s.color }}>
                      {s.unit[lang]}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(253,248,240,0.5)', fontSize: 12 }}
                  >
                    {s.label[lang]}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
