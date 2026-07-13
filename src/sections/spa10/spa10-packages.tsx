import type { Spa10Lang } from 'src/sections/spa10/spa10-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { ICE, TEAL, NORDIC_BLUE } from 'src/sections/spa10/spa10-data';

const PACKAGES = [
  {
    id: 'day',
    name: {
      vi: 'Ngày Aurora',
      en: 'Aurora Day',
      fr: 'Journée Aurora',
      cn: 'Aurora 一日',
      ar: 'يوم أورورا',
    },
    tagline: {
      vi: 'Phục hồi trong một ngày',
      en: 'One-day restoration',
      fr: 'Récupération en une journée',
      cn: '一日修复',
      ar: 'استعادة في يوم واحد',
    },
    price: '1.850.000',
    duration: { vi: '4 giờ', en: '4 hours', fr: '4 heures', cn: '4 小时', ar: '4 ساعات' },
    color: '#7ECEF4',
    bg: '#060E18',
    includes: [
      {
        vi: 'Sauna bạch dương 80°C × 3 vòng',
        en: 'Birch sauna 80°C × 3 rounds',
        fr: 'Sauna au bouleau 80°C × 3 tours',
        cn: '桦木桑拿 80°C × 3 轮',
        ar: 'ساونا البتولا 80°C × 3 جولات',
      },
      {
        vi: 'Cold plunge 4°C × 3 lần',
        en: 'Cold plunge 4°C × 3 times',
        fr: 'Bain froid 4°C × 3 fois',
        cn: '4°C 冷水浴 × 3 次',
        ar: 'الغطس البارد 4°C × 3 مرات',
      },
      {
        vi: 'Tắm rừng phytoncide 30 phút',
        en: '30-min phytoncide forest bath',
        fr: 'Bain de forêt aux phytoncides 30 min',
        cn: '30 分钟植物杀菌素森林浴',
        ar: 'حمام غابة بالفيتونسيد 30 دقيقة',
      },
      {
        vi: 'Trà nordic & snack',
        en: 'Nordic tea & snacks',
        fr: 'Thé nordique & collations',
        cn: '北欧茶与小食',
        ar: 'شاي إسكندنافي ووجبات خفيفة',
      },
    ],
  },
  {
    id: 'full',
    name: {
      vi: 'Nghi lễ Aurora Đầy Đủ',
      en: 'Full Aurora Ritual',
      fr: 'Rituel Aurora Complet',
      cn: 'Aurora 完整仪式',
      ar: 'طقس أورورا الكامل',
    },
    tagline: {
      vi: 'Trải nghiệm Nordic hoàn chỉnh',
      en: 'Complete Nordic experience',
      fr: 'Expérience nordique complète',
      cn: '完整的北欧体验',
      ar: 'تجربة إسكندنافية كاملة',
    },
    price: '3.900.000',
    duration: { vi: '7 giờ', en: '7 hours', fr: '7 heures', cn: '7 小时', ar: '7 ساعات' },
    color: TEAL,
    bg: '#0A1620',
    popular: true,
    includes: [
      {
        vi: 'Toàn bộ nghi lễ Aurora Day',
        en: 'All Aurora Day rituals',
        fr: 'Tous les rituels Aurora Day',
        cn: '全部 Aurora Day 仪式',
        ar: 'جميع طقوس Aurora Day',
      },
      {
        vi: 'Massage Swedish 90 phút',
        en: '90-min Swedish massage',
        fr: 'Massage suédois 90 min',
        cn: '90 分钟瑞典按摩',
        ar: 'تدليك سويدي 90 دقيقة',
      },
      {
        vi: 'Gói Birch Scrub truyền thống',
        en: 'Traditional Birch Scrub wrap',
        fr: 'Enveloppement Birch Scrub traditionnel',
        cn: '传统桦木磨砂裹敷',
        ar: 'لفافة تقشير البتولا التقليدية',
      },
      {
        vi: 'Bữa trưa Nordic hữu cơ',
        en: 'Organic Nordic lunch',
        fr: 'Déjeuner nordique biologique',
        cn: '有机北欧午餐',
        ar: 'غداء إسكندنافي عضوي',
      },
      {
        vi: 'Private lounge & yukata',
        en: 'Private lounge & yukata',
        fr: 'Salon privé & yukata',
        cn: '私人休息区与浴衣',
        ar: 'صالة خاصة ويوكاتا',
      },
    ],
  },
  {
    id: 'retreat',
    name: {
      vi: 'Retreat 2 Đêm',
      en: '2-Night Retreat',
      fr: 'Retraite de 2 nuits',
      cn: '2 夜退隐',
      ar: 'اعتكاف ليلتين',
    },
    tagline: {
      vi: 'Tái sinh hoàn toàn',
      en: 'Complete rebirth',
      fr: 'Renaissance complète',
      cn: '彻底重生',
      ar: 'ولادة جديدة كاملة',
    },
    price: '12.500.000',
    duration: {
      vi: '2 đêm 3 ngày',
      en: '2 nights 3 days',
      fr: '2 nuits 3 jours',
      cn: '2 夜 3 天',
      ar: 'ليلتان وثلاثة أيام',
    },
    color: '#C8A951',
    bg: '#0A0E1A',
    includes: [
      {
        vi: 'Phòng cabin rừng deluxe',
        en: 'Deluxe forest cabin suite',
        fr: 'Suite cabane en forêt de luxe',
        cn: '豪华森林木屋套房',
        ar: 'جناح كوخ الغابة الفاخر',
      },
      {
        vi: 'Toàn bộ nghi lễ đầy đủ × 3',
        en: 'Full ritual × 3 sessions',
        fr: 'Rituel complet × 3 séances',
        cn: '完整仪式 × 3 场',
        ar: 'الطقس الكامل × 3 جلسات',
      },
      {
        vi: 'Tư vấn dinh dưỡng Nordic',
        en: 'Nordic nutrition consultation',
        fr: 'Consultation nutritionnelle nordique',
        cn: '北欧营养咨询',
        ar: 'استشارة تغذية إسكندنافية',
      },
      {
        vi: 'Yoga & thiền buổi sáng',
        en: 'Morning yoga & meditation',
        fr: 'Yoga & méditation du matin',
        cn: '晨间瑜伽与冥想',
        ar: 'يوغا وتأمّل صباحي',
      },
      {
        vi: 'Chương trình cold exposure cá nhân hóa',
        en: 'Personalized cold exposure program',
        fr: 'Programme d’exposition au froid personnalisé',
        cn: '个性化冷暴露计划',
        ar: 'برنامج تعرّض للبرودة مخصص',
      },
      {
        vi: 'Tất cả bữa ăn hữu cơ included',
        en: 'All organic meals included',
        fr: 'Tous les repas biologiques inclus',
        cn: '包含所有有机餐食',
        ar: 'جميع الوجبات العضوية مشمولة',
      },
    ],
  },
];

export function Spa10Packages() {
  const { currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#050C16', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TEAL, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Experience packages',
                    vi: 'Gói trải nghiệm',
                    fr: 'Forfaits d’expérience',
                    cn: '体验套餐',
                    ar: 'باقات التجربة',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: ICE, maxWidth: 420, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'Choose your ',
                    vi: 'Chọn ',
                    fr: 'Choisissez votre ',
                    cn: '选择你的',
                    ar: 'اختر ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: TEAL }}>
                {
                  (
                    {
                      en: 'journey',
                      vi: 'hành trình của bạn',
                      fr: 'voyage',
                      cn: '旅程',
                      ar: 'رحلتك',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {PACKAGES.map((pkg) => (
            <Grid key={pkg.id} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 40 }).inUp}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: pkg.bg,
                    border: `1px solid ${pkg.color}25`,
                    position: 'relative',
                    overflow: 'hidden',
                    transform: pkg.popular ? { md: 'scale(1.04)' } : 'none',
                    boxShadow: pkg.popular ? `0 32px 80px ${pkg.color}18` : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': { borderColor: pkg.color, boxShadow: `0 24px 60px ${pkg.color}22` },
                  }}
                >
                  {pkg.popular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        bgcolor: TEAL,
                      }}
                    />
                  )}
                  <Stack spacing={3} sx={{ flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography
                          variant="overline"
                          sx={{ color: pkg.color, letterSpacing: 4, fontSize: 10, fontWeight: 700 }}
                        >
                          {pkg.name[lang]}
                        </Typography>
                        {pkg.popular && (
                          <Chip
                            label={
                              (
                                {
                                  en: 'Most popular',
                                  vi: 'Phổ biến nhất',
                                  fr: 'Le plus populaire',
                                  cn: '最受欢迎',
                                  ar: 'الأكثر شعبية',
                                } as const
                              )[lang]
                            }
                            size="small"
                            sx={{
                              bgcolor: `${TEAL}20`,
                              color: TEAL,
                              fontWeight: 700,
                              fontSize: 10,
                            }}
                          />
                        )}
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(234,249,246,0.4)', fontSize: 13 }}
                      >
                        {pkg.tagline[lang]}
                      </Typography>
                      <Stack direction="row" alignItems="baseline" spacing={0.5}>
                        <Typography
                          sx={{
                            fontSize: { xs: 28, md: 34 },
                            fontWeight: 900,
                            color: ICE,
                            lineHeight: 1,
                          }}
                        >
                          {pkg.price}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(234,249,246,0.4)' }}>
                          ₫ / {pkg.duration[lang]}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                      {pkg.includes.map((f) => (
                        <Stack key={f.en} direction="row" spacing={1.5} alignItems="flex-start">
                          <Iconify
                            icon="solar:check-circle-bold-duotone"
                            width={16}
                            sx={{ color: pkg.color, flexShrink: 0, mt: 0.15 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: 'rgba(234,249,246,0.6)', fontSize: 13 }}
                          >
                            {f[lang]}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      fullWidth
                      size="large"
                      sx={{
                        bgcolor: pkg.popular ? TEAL : 'transparent',
                        color: pkg.popular ? NORDIC_BLUE : pkg.color,
                        border: `1.5px solid ${pkg.color}`,
                        borderRadius: 2.5,
                        fontWeight: 800,
                        '&:hover': { bgcolor: pkg.color, color: NORDIC_BLUE },
                      }}
                    >
                      {
                        (
                          {
                            en: 'Book now',
                            vi: 'Đặt ngay',
                            fr: 'Réserver',
                            cn: '立即预订',
                            ar: 'احجز الآن',
                          } as const
                        )[lang]
                      }
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
