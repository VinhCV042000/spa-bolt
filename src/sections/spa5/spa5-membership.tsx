import type { Spa5Lang } from 'src/sections/spa5/spa5-data';

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

const DEEP_NAVY = '#0B0D2E';
const GOLD = '#C9A84C';
const CREAM = '#FDF8F0';

type Tier = {
  name: Record<Spa5Lang, string>;
  price: string;
  period: Record<Spa5Lang, string>;
  color: string;
  bg: string;
  features: Record<Spa5Lang, string>[];
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: { vi: 'Bạc', en: 'Silver', fr: 'Argent', cn: '银卡', ar: 'فضي' },
    price: '3.500.000',
    period: { vi: '/tháng', en: '/month', fr: '/mois', cn: '/月', ar: '/شهر' },
    color: '#B0B8C8',
    bg: '#0E1235',
    features: [
      {
        vi: '4 buổi trị liệu/tháng',
        en: '4 therapy sessions/month',
        fr: '4 séances de soin/mois',
        cn: '每月4次理疗',
        ar: '4 جلسات علاج/شهر',
      },
      {
        vi: 'Sử dụng hồ bơi & sauna',
        en: 'Pool & sauna access',
        fr: 'Accès piscine & sauna',
        cn: '泳池与桑拿使用权',
        ar: 'دخول المسبح والساونا',
      },
      {
        vi: 'Tư vấn chuyên gia miễn phí',
        en: 'Free expert consultation',
        fr: 'Consultation expert gratuite',
        cn: '免费专家咨询',
        ar: 'استشارة خبير مجانية',
      },
      {
        vi: 'Ưu đãi 15% dịch vụ lẻ',
        en: '15% off à la carte',
        fr: '15% de réduction à la carte',
        cn: '单项服务85折',
        ar: 'خصم 15% على الخدمات الفردية',
      },
    ],
  },
  {
    name: { vi: 'Vàng', en: 'Gold', fr: 'Or', cn: '金卡', ar: 'ذهبي' },
    price: '6.900.000',
    period: { vi: '/tháng', en: '/month', fr: '/mois', cn: '/月', ar: '/شهر' },
    color: GOLD,
    bg: '#110F05',
    popular: true,
    features: [
      {
        vi: '8 buổi trị liệu/tháng',
        en: '8 therapy sessions/month',
        fr: '8 séances de soin/mois',
        cn: '每月8次理疗',
        ar: '8 جلسات علاج/شهر',
      },
      {
        vi: 'VIP lounge & in-room service',
        en: 'VIP lounge & in-room service',
        fr: 'Salon VIP & service en chambre',
        cn: 'VIP休息室及客房服务',
        ar: 'صالة VIP وخدمة داخل الغرفة',
      },
      {
        vi: 'Sản phẩm cao cấp tặng hàng tháng',
        en: 'Monthly luxury product gift',
        fr: 'Cadeau produit de luxe mensuel',
        cn: '每月赠送奢华产品',
        ar: 'هدية منتج فاخر شهريًا',
      },
      {
        vi: 'Ưu đãi 25% toàn bộ dịch vụ',
        en: '25% off all services',
        fr: '25% de réduction sur tous les services',
        cn: '全部服务75折',
        ar: 'خصم 25% على جميع الخدمات',
      },
      {
        vi: 'Ưu tiên đặt lịch',
        en: 'Priority booking',
        fr: 'Réservation prioritaire',
        cn: '优先预约',
        ar: 'حجز ذو أولوية',
      },
    ],
  },
  {
    name: { vi: 'Bạch Kim', en: 'Platinum', fr: 'Platine', cn: '白金卡', ar: 'بلاتيني' },
    price: '12.000.000',
    period: { vi: '/tháng', en: '/month', fr: '/mois', cn: '/月', ar: '/شهر' },
    color: '#E0E8F5',
    bg: '#0A0B1E',
    features: [
      {
        vi: 'Không giới hạn buổi trị liệu',
        en: 'Unlimited therapy sessions',
        fr: 'Séances de soin illimitées',
        cn: '无限次理疗',
        ar: 'جلسات علاج غير محدودة',
      },
      {
        vi: 'Butler riêng cho từng buổi',
        en: 'Personal butler per session',
        fr: 'Majordome personnel à chaque séance',
        cn: '每次专属管家服务',
        ar: 'خادم شخصي لكل جلسة',
      },
      {
        vi: 'Suite riêng ưu tiên',
        en: 'Priority private suite',
        fr: 'Suite privée prioritaire',
        cn: '优先专属套房',
        ar: 'جناح خاص ذو أولوية',
      },
      {
        vi: 'Ưu đãi 40% + quà tặng VIP',
        en: '40% off + VIP gifts',
        fr: '40% de réduction + cadeaux VIP',
        cn: '6折优惠+VIP礼品',
        ar: 'خصم 40% + هدايا VIP',
      },
      {
        vi: 'Cổng đặt lịch 24/7',
        en: '24/7 concierge booking',
        fr: 'Conciergerie 24/7',
        cn: '24/7礼宾预约',
        ar: 'حجز كونسيرج على مدار الساعة',
      },
      {
        vi: 'Hoa tươi & champagne chào đón',
        en: 'Fresh flowers & champagne on arrival',
        fr: "Fleurs fraîches & champagne à l'arrivée",
        cn: '到访时鲜花与香槟迎宾',
        ar: 'زهور طازجة وشمبانيا عند الوصول',
      },
    ],
  },
];

export function Spa5Membership() {
  const { currentLang } = useTranslate('spa5');
  const lang = currentLang.value as Spa5Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#080A1F', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Premium membership',
                    vi: 'Thành viên cao cấp',
                    fr: 'Adhésion premium',
                    cn: '尊贵会员',
                    ar: 'عضوية مميزة',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: CREAM, maxWidth: 420, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'Exclusive ',
                    vi: 'Đặc quyền ',
                    fr: 'Exclusif ',
                    cn: '专属',
                    ar: 'حصري ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: GOLD }}>
                {
                  (
                    {
                      en: 'for you',
                      vi: 'dành cho bạn',
                      fr: 'pour vous',
                      cn: '于你',
                      ar: 'لك',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,248,240,0.45)', maxWidth: 480, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'Join our VIP membership community — unlimited luxury experiences at the best possible rate.',
                    vi: 'Tham gia cộng đồng thành viên VIP — trải nghiệm luxury không giới hạn với mức chi phí hợp lý nhất.',
                    fr: 'Rejoignez notre communauté de membres VIP — des expériences de luxe illimitées au meilleur tarif possible.',
                    cn: '加入我们的 VIP 会员社区——以最优惠的价格享受无限奢华体验。',
                    ar: 'انضم إلى مجتمع أعضاء VIP لدينا — تجارب فاخرة غير محدودة بأفضل سعر ممكن.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {TIERS.map((tier, idx) => (
            <Grid key={tier.name.en} item xs={12} md={4}>
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
                    bgcolor: tier.bg,
                    border: `1px solid ${tier.color}30`,
                    position: 'relative',
                    overflow: 'hidden',
                    transform: tier.popular ? { md: 'scale(1.04)' } : 'none',
                    boxShadow: tier.popular ? `0 32px 80px ${tier.color}20` : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: tier.color,
                      boxShadow: `0 24px 60px ${tier.color}25`,
                    },
                  }}
                >
                  {tier.popular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        height: 3,
                        bgcolor: tier.color,
                      }}
                    />
                  )}
                  <Stack spacing={3} sx={{ flexGrow: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack spacing={0.5}>
                        <Typography
                          variant="overline"
                          sx={{
                            color: tier.color,
                            letterSpacing: 4,
                            fontSize: 10,
                            fontWeight: 700,
                          }}
                        >
                          {tier.name[lang]}
                        </Typography>
                        <Stack direction="row" alignItems="baseline" spacing={0.5}>
                          <Typography
                            sx={{
                              fontSize: { xs: 28, md: 32 },
                              fontWeight: 900,
                              color: CREAM,
                              lineHeight: 1,
                            }}
                          >
                            {tier.price}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(253,248,240,0.4)' }}>
                            {tier.period[lang]}
                          </Typography>
                        </Stack>
                      </Stack>
                      {tier.popular && (
                        <Chip
                          label={
                            (
                              {
                                en: 'Most popular',
                                vi: 'Phổ biến nhất',
                                fr: 'Le plus populaire',
                                cn: '最受欢迎',
                                ar: 'الأكثر شيوعًا',
                              } as const
                            )[lang]
                          }
                          size="small"
                          sx={{
                            bgcolor: `${tier.color}20`,
                            color: tier.color,
                            fontWeight: 700,
                            fontSize: 10,
                          }}
                        />
                      )}
                    </Stack>

                    <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                      {tier.features.map((f) => (
                        <Stack key={f.en} direction="row" spacing={1.5} alignItems="flex-start">
                          <Iconify
                            icon="solar:check-circle-bold-duotone"
                            width={18}
                            sx={{ color: tier.color, flexShrink: 0, mt: 0.1 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: 'rgba(253,248,240,0.65)', lineHeight: 1.6 }}
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
                        bgcolor: tier.popular ? tier.color : 'transparent',
                        color: tier.popular ? DEEP_NAVY : tier.color,
                        border: `1.5px solid ${tier.color}`,
                        borderRadius: 2.5,
                        fontWeight: 800,
                        '&:hover': { bgcolor: tier.color, color: DEEP_NAVY },
                      }}
                    >
                      {
                        (
                          {
                            en: 'Join now',
                            vi: 'Đăng ký ngay',
                            fr: 'Adhérer maintenant',
                            cn: '立即加入',
                            ar: 'انضم الآن',
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
