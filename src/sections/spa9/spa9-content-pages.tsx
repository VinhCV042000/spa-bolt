// ----------------------------------------------------------------------
import React from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  SUN,
  SAND,
  DARK,
  AZURE,
  OLIVE,
  WHITE,
  getLang,
  SPA9_FAQ,
  formatVND,
  SPA9_BLOG,
  SPA9_OFFERS,
  SPA9_POLICY,
  SPA9_CAREERS,
  SPA9_GALLERY,
  SPA9_SERVICES,
  SPA9_TRAINING,
  SPA9_BRANCHES,
  SPA9_PACKAGES,
  SPA9_FEEDBACK,
  SPA9_PARTNERS,
  SPA9_PROMOTIONS,
  SPA9_PAGE_IMAGES,
  SPA9_BEFORE_AFTER,
} from './spa9-pages-data';

// ----------------------------------------------------------------------
// SHARED HERO COMPONENT
// ----------------------------------------------------------------------

type Spa9PageHeroProps = {
  image: string;
  greek?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

function Spa9PageHero({ image, greek, eyebrow, title, subtitle }: Spa9PageHeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 360, md: 480 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: DARK,
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={image}
        alt=""
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.45,
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: DARK,
          background: `linear-gradient(160deg, rgba(10,40,64,0.7) 0%, rgba(10,40,64,0.5) 50%, rgba(10,40,64,0.85) 100%)`,
        }}
      />

      {/* Greek decorative text */}
      {greek && (
        <Box
          sx={{
            position: 'absolute',
            right: { xs: 20, md: 60 },
            top: '50%',
            transform: 'translateY(-50%)',
            writingMode: 'vertical-rl',
            color: SUN,
            opacity: 0.15,
            display: { xs: 'none', lg: 'block' },
          }}
        >
          <Typography sx={{ fontSize: { md: 64, lg: 80 }, fontWeight: 300, letterSpacing: 4 }}>
            {greek}
          </Typography>
        </Box>
      )}

      {/* Wave decoration */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          height: 60,
          bgcolor: SAND,
          clipPath: 'ellipse(60% 100% at 50% 100%)',
        }}
      />

      <Container
        component={MotionViewport}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: { xs: 16, md: 20 },
          pb: { xs: 10, md: 12 },
        }}
      >
        <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
          <Stack spacing={3}>
            {eyebrow && (
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Iconify icon="solar:sun-bold-duotone" width={18} sx={{ color: SUN }} />
                <Typography
                  variant="overline"
                  sx={{ color: SUN, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
                >
                  {eyebrow}
                </Typography>
              </Stack>
            )}

            <Typography
              variant="h2"
              sx={{
                color: SAND,
                fontWeight: 900,
                fontSize: { xs: 32, md: 48 },
                lineHeight: 1.2,
                maxWidth: 600,
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body1"
                sx={{ color: 'rgba(253,245,230,0.7)', maxWidth: 500, lineHeight: 1.8 }}
              >
                {subtitle}
              </Typography>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// ABOUT PAGE
// ----------------------------------------------------------------------

export function Spa9AboutPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.about}
        greek="Θάλασσα"
        eyebrow={getLang(
          { vi: 'Về chúng tôi', en: 'About Us', fr: 'À Propos', cn: '关于我们', ar: 'من نحن' },
          lang
        )}
        title={getLang(
          {
            vi: 'Thalassa Spa & Wellness',
            en: 'Thalassa Spa & Wellness',
            fr: 'Thalassa Spa & Wellness',
            cn: 'Thalassa水疗养生',
            ar: 'ثالاسا سبا آند ويلنس',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Nơi hội tụ tinh hoa trị liệu Địa Trung Hải giữa lòng thành phố',
            en: 'The essence of Mediterranean therapy in the heart of the city',
            fr: "L'essence de la thérapie méditerranéenne au cœur de la ville",
            cn: '城市中心的地中海疗愈精华',
            ar: 'جوهر العلاج المتوسطي في قلب المدينة',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* Story Section */}
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={3}>
                <Typography
                  variant="overline"
                  sx={{ color: AZURE, letterSpacing: 4, fontWeight: 700 }}
                >
                  {getLang(
                    {
                      vi: 'Câu chuyện của chúng tôi',
                      en: 'Our Story',
                      fr: 'Notre Histoire',
                      cn: '我们的故事',
                      ar: 'قصتنا',
                    },
                    lang
                  )}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: DARK }}>
                  {getLang(
                    {
                      vi: 'Mang tinh hoa Địa Trung Hải đến Việt Nam',
                      en: 'Bringing Mediterranean Wellness to Vietnam',
                      fr: 'Apporter le Bien-Être Méditerranéen au Vietnam',
                      cn: '将地中海养生之道带到越南',
                      ar: 'جلب العافية المتوسطية إلى فيتنام',
                    },
                    lang
                  )}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                  {getLang(
                    {
                      vi: 'Thalassa Spa ra đời từ tình yêu với văn hóa trị liệu Địa Trung Hải, nơi mà người Hy Lạp và La Mã cổ đại đã phát triển nghệ thuật thư giãn và rèn luyện cơ thể. Chúng tôi tin rằng biển cả, olive, ánh nắng và khoáng chất là liều thuốc tuyệt vời nhất cho cơ thể và tâm trí.',
                      en: 'Thalassa Spa was born from a love for Mediterranean wellness culture, where ancient Greeks and Romans developed the art of relaxation and physical cultivation. We believe the sea, olives, sunshine, and minerals are the best medicine for body and mind.',
                      fr: "Thalassa Spa est né de l'amour de la culture du bien-être méditerranéen. Nous croyons que la mer, les olives, le soleil et les minéraux sont les meilleurs remèdes.",
                      cn: 'Thalassa水疗诞生于对地中海养生文化的热爱。我们相信大海、橄榄、阳光与矿物质是身心最好的良药。',
                      ar: 'وُلد منتجع ثالاسا من حب ثقافة العافية المتوسطية. نؤمن أن البحر والزيتون والشمس والمعادن هي أفضل دواء للجسد والروح.',
                    },
                    lang
                  )}
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inRight}>
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: `0 24px 80px rgba(27,108,168,0.15)`,
                }}
              >
                <Box
                  component="img"
                  src={SPA9_PAGE_IMAGES.about}
                  alt="Thalassa Spa"
                  sx={{ width: '100%', display: 'block' }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Philosophy */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Stack spacing={3} alignItems="center" sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ color: SUN, letterSpacing: 4, fontWeight: 700 }}>
              {getLang(
                { vi: 'Triết lý', en: 'Philosophy', fr: 'Philosophie', cn: '理念', ar: 'الفلسفة' },
                lang
              )}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: DARK }}>
              {getLang(
                {
                  vi: 'Θάλασσα — Biển Cả',
                  en: 'Θάλασσα — The Sea',
                  fr: 'Θάλασσα — La Mer',
                  cn: 'Θάλασσα — 大海',
                  ar: 'Θάλασσα — البحر',
                },
                lang
              )}
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {[
              {
                icon: 'solar:waterdrops-bold-duotone',
                title: {
                  vi: 'Thalassotherapy',
                  en: 'Thalassotherapy',
                  fr: 'Thalassothérapie',
                  cn: '海洋疗法',
                  ar: 'الثالاسوترابي',
                },
                desc: {
                  vi: 'Trị liệu bằng nước biển, tảo và khoáng chất biển',
                  en: 'Therapy using seawater, algae and marine minerals',
                  fr: 'Thérapie avec eau de mer, algues et minéraux',
                  cn: '使用海水、海藻和海洋矿物质的疗法',
                  ar: 'علاج بماء البحر والطحالب والمعادن البحرية',
                },
                color: AZURE,
              },
              {
                icon: 'solar:leaf-bold-duotone',
                title: {
                  vi: 'Olive & Botanica',
                  en: 'Olive & Botanica',
                  fr: 'Olive & Botanique',
                  cn: '橄榄与植物',
                  ar: 'الزيتون والنبات',
                },
                desc: {
                  vi: 'Dầu olive Hy Lạp và thảo mộc Địa Trung Hải',
                  en: 'Greek olive oil and Mediterranean herbs',
                  fr: "Huile d'olive grecque et herbes méditerranéennes",
                  cn: '希腊橄榄油与地中海草本',
                  ar: 'زيت زيتون يوناني وأعشاب متوسطية',
                },
                color: OLIVE,
              },
              {
                icon: 'solar:sun-bold-duotone',
                title: {
                  vi: 'Heliotherapy',
                  en: 'Heliotherapy',
                  fr: 'Héliothérapie',
                  cn: '日光疗法',
                  ar: 'العلاج الشمسي',
                },
                desc: {
                  vi: 'Nguyên lý ánh nắng và nhiệt trị liệu',
                  en: 'Principles of sunshine and thermotherapy',
                  fr: 'Principes du soleil et thermothérapie',
                  cn: '阳光与热疗法原理',
                  ar: 'مبادئ الشمس والعلاج الحراري',
                },
                color: SUN,
              },
              {
                icon: 'solar:bath-bold-duotone',
                title: {
                  vi: 'Roman Rituals',
                  en: 'Roman Rituals',
                  fr: 'Rituels Romains',
                  cn: '罗马浴礼',
                  ar: 'الطقوس الرومانية',
                },
                desc: {
                  vi: 'Nghi lễ tắm cổ đại phục hồi thân tâm',
                  en: 'Ancient bathing rituals restoring body and soul',
                  fr: 'Rituels du bain anciens restaurant corps et âme',
                  cn: '恢复身心的古浴礼',
                  ar: 'طقوس استحمام قديمة تستعيد الجسد والروح',
                },
                color: '#8B7355',
              },
            ].map((item) => (
              <Grid key={item.title.en} item xs={12} sm={6} md={3}>
                <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      bgcolor: WHITE,
                      border: `1px solid ${item.color}20`,
                      textAlign: 'center',
                      transition: 'all 0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 60px ${item.color}18`,
                        borderColor: item.color,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        bgcolor: `${item.color}12`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Iconify icon={item.icon} width={32} sx={{ color: item.color }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                      {getLang(item.title as Record<string, string>, lang)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {getLang(item.desc as Record<string, string>, lang)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// SERVICES PAGE
// ----------------------------------------------------------------------

export function Spa9ServicesPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.services}
        greek="Θεραπεία"
        eyebrow={getLang(
          { vi: 'Dịch vụ', en: 'Services', fr: 'Services', cn: '服务', ar: 'الخدمات' },
          lang
        )}
        title={getLang(
          {
            vi: 'Liệu Trình Địa Trung Hải',
            en: 'Mediterranean Treatments',
            fr: 'Soins Méditerranéens',
            cn: '地中海疗程',
            ar: 'علاجات البحر المتوسط',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Trải nghiệm tinh hoa trị liệu La Mã và Hy Lạp cổ đại',
            en: 'Experience the essence of ancient Roman and Greek healing',
            fr: "L'essence de la guérison romaine et grecque antique",
            cn: '体验古罗马与希腊疗愈的精华',
            ar: 'تجربة جوهر الشفاء الروماني واليوناني القديم',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_SERVICES.map((service) => (
            <Grid key={service.id} item xs={12} md={6}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  component={RouterLink}
                  href={paths.spa9.serviceDetails(service.slug)}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    border: `1px solid ${service.color}20`,
                    textDecoration: 'none',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 20px 60px ${service.color}18`,
                      borderColor: service.color,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      height: { xs: 180, sm: 'auto' },
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    <Box
                      component="img"
                      src={service.image}
                      alt={getLang(service.name, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: service.color,
                        opacity: 0.25,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Stack spacing={1.5}>
                      <Chip
                        label={getLang(service.category, lang)}
                        size="small"
                        sx={{
                          width: 'fit-content',
                          bgcolor: `${service.color}12`,
                          color: service.color,
                          fontWeight: 600,
                          fontSize: 10,
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: DARK }}>
                        {getLang(service.name, lang)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {getLang(service.shortDesc, lang)}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Iconify
                            icon="solar:clock-circle-bold-duotone"
                            width={16}
                            sx={{ color: OLIVE }}
                          />
                          <Typography variant="caption" sx={{ color: OLIVE }}>
                            {getLang(service.duration, lang)}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: service.color, fontWeight: 800 }}
                        >
                          {formatVND(service.price)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// SERVICE DETAILS PAGE
// ----------------------------------------------------------------------

export function Spa9ServiceDetailsPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  const service = SPA9_SERVICES[0];

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={service.image}
        greek="Λουτρόν"
        eyebrow={getLang(service.category, lang)}
        title={getLang(service.name, lang)}
        subtitle={getLang(service.shortDesc, lang)}
      />

      <Container component={MotionViewport} maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={6}>
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: DARK, mb: 2 }}>
              {getLang(
                {
                  vi: 'Mô tả chi tiết',
                  en: 'Detailed Description',
                  fr: 'Description Détaillée',
                  cn: '详细介绍',
                  ar: 'وصف تفصيلي',
                },
                lang
              )}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
              {getLang(service.fullDesc, lang)}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: DARK, mb: 2 }}>
              {getLang(
                { vi: 'Quy trình', en: 'Procedure', fr: 'Procédure', cn: '流程', ar: 'الإجراء' },
                lang
              )}
            </Typography>
            <Stack spacing={2}>
              {(
                getLang(
                  service.benefits as unknown as Record<string, string>,
                  lang
                ) as unknown as string[]
              ).map((benefit: string, idx: number) => (
                <Stack key={idx} direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: `${service.color}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: service.color, fontWeight: 700 }}>
                      {idx + 1}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: DARK }}>
                    {benefit}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ p: 3, borderRadius: 3, bgcolor: WHITE, border: `1px solid ${service.color}20` }}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Iconify icon="solar:clock-circle-bold-duotone" width={24} sx={{ color: OLIVE }} />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {getLang(
                      { vi: 'Thời lượng', en: 'Duration', fr: 'Durée', cn: '时长', ar: 'المدة' },
                      lang
                    )}
                  </Typography>
                  <Typography variant="h6" sx={{ color: DARK }}>
                    {getLang(service.duration, lang)}
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {getLang(
                    { vi: 'Giá từ', en: 'From', fr: 'À partir de', cn: '起价', ar: 'من' },
                    lang
                  )}
                </Typography>
                <Typography variant="h5" sx={{ color: service.color, fontWeight: 800 }}>
                  {formatVND(service.price)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Button
              component={RouterLink}
              href={paths.spa9.booking}
              size="large"
              startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
              sx={{
                bgcolor: SUN,
                color: DARK,
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 800,
                '&:hover': { bgcolor: '#E09517' },
              }}
            >
              {getLang(
                {
                  vi: 'Đặt lịch ngay',
                  en: 'Book Now',
                  fr: 'Réserver',
                  cn: '立即预约',
                  ar: 'احجز الآن',
                },
                lang
              )}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// TRAINING PAGE
// ----------------------------------------------------------------------

export function Spa9TrainingPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.training}
        greek="Παιδεία"
        eyebrow={getLang(
          { vi: 'Đào tạo', en: 'Training', fr: 'Formation', cn: '培训', ar: 'التدريب' },
          lang
        )}
        title={getLang(
          {
            vi: 'Chứng Chỉ Trị Liệu Địa Trung Hải',
            en: 'Mediterranean Therapy Certification',
            fr: 'Certification en Thérapie Méditerranéenne',
            cn: '地中海疗法认证',
            ar: 'شهادة العلاج المتوسطي',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Khóa học chuyên sâu từ các chuyên gia quốc tế',
            en: 'In-depth courses from international experts',
            fr: 'Cours approfondis par des experts internationaux',
            cn: '国际专家授课的深度课程',
            ar: 'دورات متعمقة من خبراء دوليين',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_TRAINING.map((course) => (
            <Grid key={course.id} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    border: `1px solid ${course.color}20`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 80px ${course.color}18`,
                      borderColor: course.color,
                    },
                  }}
                >
                  <Box sx={{ height: 180, position: 'relative' }}>
                    <Box
                      component="img"
                      src={course.image}
                      alt={getLang(course.title, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{ position: 'absolute', inset: 0, bgcolor: course.color, opacity: 0.3 }}
                    />
                    <Chip
                      label={getLang(course.level, lang)}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: WHITE,
                        color: course.color,
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: DARK }}>
                        {getLang(course.title, lang)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {getLang(course.description, lang)}
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Iconify
                            icon="solar:clock-circle-bold-duotone"
                            width={14}
                            sx={{ color: OLIVE }}
                          />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {getLang(course.duration, lang)}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: course.color, fontWeight: 800 }}
                        >
                          {formatVND(course.price)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BLOG PAGE
// ----------------------------------------------------------------------

export function Spa9BlogPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.blog}
        greek="Ἱστορία"
        eyebrow={getLang({ vi: 'Blog', en: 'Blog', fr: 'Blog', cn: '博客', ar: 'المدونة' }, lang)}
        title={getLang(
          {
            vi: 'Kiến Thức Địa Trung Hải',
            en: 'Mediterranean Knowledge',
            fr: 'Savoir Méditerranéen',
            cn: '地中海知识',
            ar: 'المعرفة المتوسطية',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Khám phá bí quyết sống khỏe từ vùng Địa Trung Hải',
            en: 'Discover wellness secrets from the Mediterranean',
            fr: 'Découvrez les secrets du bien-être méditerranéen',
            cn: '探索来自地中海的健康秘诀',
            ar: 'اكتشف أسرار العافية من البحر المتوسط',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_BLOG.map((post) => (
            <Grid key={post.id} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  component={RouterLink}
                  href={paths.spa9.blogDetails(post.slug)}
                  sx={{
                    display: 'block',
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    textDecoration: 'none',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 24px 80px rgba(27,108,168,0.12)',
                    },
                  }}
                >
                  <Box sx={{ height: 200, position: 'relative' }}>
                    <Box
                      component="img"
                      src={post.image}
                      alt={getLang(post.title, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Chip
                      label={getLang(post.category, lang)}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        bgcolor: WHITE,
                        color: AZURE,
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="body2" sx={{ color: OLIVE, mb: 1, fontWeight: 600 }}>
                      {post.date} • {getLang(post.readTime, lang)}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                      {getLang(post.title, lang)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {getLang(post.excerpt, lang)}
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BLOG DETAILS PAGE
// ----------------------------------------------------------------------

export function Spa9BlogDetailsPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  const post = SPA9_BLOG[0];

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={post.image}
        greek="Άρθρο"
        eyebrow={getLang(post.category, lang)}
        title={getLang(post.title, lang)}
        subtitle={`${post.date} • ${post.author} • ${getLang(post.readTime, lang)}`}
      />

      <Container component={MotionViewport} maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.9, fontSize: 17 }}
          >
            {getLang(post.excerpt, lang)}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// CAREERS PAGE
// ----------------------------------------------------------------------

export function Spa9CareersPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.careers}
        greek="Καριέρα"
        eyebrow={getLang(
          { vi: 'Tuyển dụng', en: 'Careers', fr: 'Carrières', cn: '招聘', ar: 'الوظائف' },
          lang
        )}
        title={getLang(
          {
            vi: 'Gia Nhập Đội Ngũ Thalassa',
            en: 'Join the Thalassa Team',
            fr: "Rejoignez l'Équipe Thalassa",
            cn: '加入Thalassa团队',
            ar: 'انضم إلى فريق ثالاسا',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Cơ hội phát triển nghề nghiệp trong lĩnh vực spa & wellness',
            en: 'Career opportunities in spa & wellness',
            fr: 'Carrières dans le spa et le bien-être',
            cn: '水疗与健康领域的职业机会',
            ar: 'فرص مهنية في السبا والعافية',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={4}>
          {SPA9_CAREERS.map((job) => (
            <Box key={job.id} component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: WHITE,
                  border: `1px solid ${AZURE}15`,
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: AZURE,
                    boxShadow: '0 16px 48px rgba(27,108,168,0.1)',
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK }}>
                      {getLang(job.title, lang)}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                      <Chip
                        label={getLang(job.department, lang)}
                        size="small"
                        sx={{ bgcolor: `${AZURE}12`, color: AZURE }}
                      />
                      <Chip
                        label={getLang(job.location, lang)}
                        size="small"
                        sx={{ bgcolor: `${OLIVE}12`, color: OLIVE }}
                      />
                      <Chip
                        label={getLang(job.type, lang)}
                        size="small"
                        sx={{ bgcolor: `${SUN}12`, color: '#7A3800' }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {getLang(job.description, lang)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2} sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle2" sx={{ color: AZURE, fontWeight: 800 }}>
                      {getLang(job.salary, lang)}
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Iconify icon="solar:send-bold-duotone" />}
                      sx={{ mt: 1, color: SUN, fontWeight: 600 }}
                    >
                      {getLang(
                        { vi: 'Ứng tuyển', en: 'Apply', fr: 'Postuler', cn: '申请', ar: 'قدم' },
                        lang
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BOOKING PAGE
// ----------------------------------------------------------------------

export function Spa9BookingPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.booking}
        greek="Κράτηση"
        eyebrow={getLang(
          { vi: 'Đặt lịch', en: 'Booking', fr: 'Réservation', cn: '预约', ar: 'الحجز' },
          lang
        )}
        title={getLang(
          {
            vi: 'Đặt Lịch Trực Tuyến',
            en: 'Online Booking',
            fr: 'Réservation en Ligne',
            cn: '在线预约',
            ar: 'الحجز عبر الإنترنت',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Chọn dịch vụ và thời gian phù hợp với bạn',
            en: 'Choose the service and time that suits you',
            fr: "Choisissez le service et l'heure qui vous conviennent",
            cn: '选择适合您的服务与时间',
            ar: 'اختر الخدمة والوقت المناسب لك',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
          <Stack spacing={4}>
            <Box sx={{ p: 4, borderRadius: 3, bgcolor: WHITE, border: `1px solid ${AZURE}15` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 3 }}>
                {getLang(
                  {
                    vi: 'Thông tin liên hệ',
                    en: 'Contact Information',
                    fr: 'Informations de Contact',
                    cn: '联系信息',
                    ar: 'معلومات الاتصال',
                  },
                  lang
                )}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Họ tên',
                        en: 'Full Name',
                        fr: 'Nom Complet',
                        cn: '姓名',
                        ar: 'الاسم الكامل',
                      },
                      lang
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Số điện thoại',
                        en: 'Phone',
                        fr: 'Téléphone',
                        cn: '电话',
                        ar: 'الهاتف',
                      },
                      lang
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Email',
                        en: 'Email',
                        fr: 'Email',
                        cn: '邮箱',
                        ar: 'البريد الإلكتروني',
                      },
                      lang
                    )}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ p: 4, borderRadius: 3, bgcolor: WHITE, border: `1px solid ${AZURE}15` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 3 }}>
                {getLang(
                  {
                    vi: 'Chọn dịch vụ',
                    en: 'Select Service',
                    fr: 'Choisir le Service',
                    cn: '选择服务',
                    ar: 'اختر الخدمة',
                  },
                  lang
                )}
              </Typography>
              <Stack spacing={2}>
                {SPA9_SERVICES.slice(0, 4).map((service) => (
                  <Box
                    key={service.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${service.color}20`,
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      '&:hover': { borderColor: service.color, bgcolor: `${service.color}08` },
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: DARK }}>
                          {getLang(service.name, lang)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {getLang(service.duration, lang)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: service.color, fontWeight: 800 }}
                      >
                        {formatVND(service.price)}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Button
              size="large"
              startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
              sx={{
                bgcolor: SUN,
                color: DARK,
                borderRadius: 3,
                py: 2,
                fontWeight: 800,
                fontSize: 16,
                '&:hover': { bgcolor: '#E09517' },
              }}
            >
              {getLang(
                {
                  vi: 'Xác nhận đặt lịch',
                  en: 'Confirm Booking',
                  fr: 'Confirmer la Réservation',
                  cn: '确认预约',
                  ar: 'تأكيد الحجز',
                },
                lang
              )}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// CONTACT PAGE
// ----------------------------------------------------------------------

export function Spa9ContactPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.contact}
        greek="Επικοινωνία"
        eyebrow={getLang(
          { vi: 'Liên hệ', en: 'Contact', fr: 'Contact', cn: '联系我们', ar: 'اتصل بنا' },
          lang
        )}
        title={getLang(
          {
            vi: 'Kết Nối Với Thalassa',
            en: 'Connect With Thalassa',
            fr: 'Connectez-Vous à Thalassa',
            cn: '与Thalassa联系',
            ar: 'تواصل مع ثالاسا',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn',
            en: 'We are always ready to support you',
            fr: 'Nous sommes toujours prêts à vous aider',
            cn: '我们随时准备为您提供支持',
            ar: 'نحن دائمًا جاهزون لمساعدتك',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
              <Stack spacing={4}>
                {[
                  {
                    icon: 'solar:phone-bold-duotone',
                    label: {
                      vi: 'Hotline',
                      en: 'Hotline',
                      fr: 'Hotline',
                      cn: '热线',
                      ar: 'الخط الساخن',
                    },
                    value: '1900 6789',
                  },
                  {
                    icon: 'solar:letter-bold-duotone',
                    label: {
                      vi: 'Email',
                      en: 'Email',
                      fr: 'Email',
                      cn: '邮箱',
                      ar: 'البريد الإلكتروني',
                    },
                    value: 'hello@thalassa.vn',
                  },
                  {
                    icon: 'solar:clock-circle-bold-duotone',
                    label: {
                      vi: 'Giờ làm việc',
                      en: 'Working Hours',
                      fr: "Heures d'Ouverture",
                      cn: '工作时间',
                      ar: 'ساعات العمل',
                    },
                    value: '08:00 - 22:00 (T2-CN)',
                  },
                ].map((item) => (
                  <Box
                    key={item.label.en}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: WHITE,
                      border: `1px solid ${AZURE}15`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: `${AZURE}12`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={item.icon} width={28} sx={{ color: AZURE }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {getLang(item.label as Record<string, string>, lang)}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: DARK }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
              <Box sx={{ p: 4, borderRadius: 3, bgcolor: WHITE, border: `1px solid ${AZURE}15` }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 3 }}>
                  {getLang(
                    {
                      vi: 'Gửi tin nhắn',
                      en: 'Send Message',
                      fr: 'Envoyer un Message',
                      cn: '发送消息',
                      ar: 'أرسل رسالة',
                    },
                    lang
                  )}
                </Typography>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label={getLang(
                      { vi: 'Họ tên', en: 'Name', fr: 'Nom', cn: '姓名', ar: 'الاسم' },
                      lang
                    )}
                  />
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Email',
                        en: 'Email',
                        fr: 'Email',
                        cn: '邮箱',
                        ar: 'البريد الإلكتروني',
                      },
                      lang
                    )}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={getLang(
                      { vi: 'Nội dung', en: 'Message', fr: 'Message', cn: '内容', ar: 'الرسالة' },
                      lang
                    )}
                  />
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: SUN,
                      color: DARK,
                      fontWeight: 800,
                      '&:hover': { bgcolor: '#E09517' },
                    }}
                  >
                    {getLang(
                      { vi: 'Gửi', en: 'Send', fr: 'Envoyer', cn: '发送', ar: 'إرسال' },
                      lang
                    )}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// OFFERS PAGE
// ----------------------------------------------------------------------

export function Spa9OffersPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.offers}
        greek="Προσφορές"
        eyebrow={getLang(
          { vi: 'Ư đãi', en: 'Offers', fr: 'Offres', cn: '优惠', ar: 'العروض' },
          lang
        )}
        title={getLang(
          {
            vi: 'Ưu Đãi Đặc Biệt',
            en: 'Special Offers',
            fr: 'Offres Spéciales',
            cn: '特别优惠',
            ar: 'عروض خاصة',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Khám phá các ưu đãi hấp dẫn từ Thalassa Spa',
            en: 'Discover attractive offers from Thalassa Spa',
            fr: 'Découvrez les offres attractives de Thalassa',
            cn: '探索Thalassa水疗的精彩优惠',
            ar: 'اكتشف العروض الجذابة من ثالاسا سبا',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_OFFERS.map((offer) => (
            <Grid key={offer.id} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    border: `1px solid ${offer.color}20`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 80px ${offer.color}18`,
                      borderColor: offer.color,
                    },
                  }}
                >
                  <Box sx={{ height: 160, position: 'relative' }}>
                    <Box
                      component="img"
                      src={offer.image}
                      alt={getLang(offer.title, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{ position: 'absolute', inset: 0, bgcolor: offer.color, opacity: 0.4 }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                      {getLang(offer.title, lang)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {getLang(offer.description, lang)}
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// FEEDBACK PAGE
// ----------------------------------------------------------------------

export function Spa9FeedbackPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.feedback}
        greek="Κριτικές"
        eyebrow={getLang(
          { vi: 'Phản hồi', en: 'Feedback', fr: 'Avis', cn: '反馈', ar: 'آراء' },
          lang
        )}
        title={getLang(
          {
            vi: 'Đánh Giá Từ Khách Hàng',
            en: 'Customer Reviews',
            fr: 'Avis Clients',
            cn: '客户评价',
            ar: 'آراء العملاء',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Những trải nghiệm thực tế từ khách hàng của chúng tôi',
            en: 'Real experiences from our customers',
            fr: 'Expériences réelles de nos clients',
            cn: '来自我们客户的真实体验',
            ar: 'تجارب حقيقية من عملائنا',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_FEEDBACK.map((feedback) => (
            <Grid key={feedback.id} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: WHITE,
                    border: `1px solid ${AZURE}15`,
                    height: '100%',
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar src={feedback.avatar} sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: DARK }}>
                          {feedback.name}
                        </Typography>
                        <Rating value={feedback.rating} size="small" readOnly />
                      </Box>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.8, fontStyle: 'italic' }}
                    >
                      &ldquo;{getLang(feedback.comment, lang)}&rdquo;
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Chip
                        label={getLang(feedback.treatment, lang)}
                        size="small"
                        sx={{ bgcolor: `${OLIVE}12`, color: OLIVE }}
                      />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {feedback.date}
                      </Typography>
                    </Stack>
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

// ----------------------------------------------------------------------
// PROMOTIONS PAGE
// ----------------------------------------------------------------------

export function Spa9PromotionsPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.promotions}
        greek="Εκπτώσεις"
        eyebrow={getLang(
          { vi: 'Khuyến mãi', en: 'Promotions', fr: 'Promotions', cn: '促销', ar: 'التخفيضات' },
          lang
        )}
        title={getLang(
          {
            vi: 'Khuyến Mãi Hấp Dẫn',
            en: 'Amazing Promotions',
            fr: 'Promotions Incroyables',
            cn: '精彩促销',
            ar: 'تخفيضات مذهلة',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Sử dụng mã giảm giá để tiết kiệm cho liệu trình',
            en: 'Use discount codes to save on treatments',
            fr: 'Utilisez les codes pour économiser',
            cn: '使用优惠码节省疗程费用',
            ar: 'استخدم أكواد الخصم لتوفير المال',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_PROMOTIONS.map((promo) => (
            <Grid key={promo.id} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    border: `2px solid ${promo.color}`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 80px ${promo.color}25`,
                    },
                  }}
                >
                  <Box sx={{ height: 140, position: 'relative' }}>
                    <Box
                      component="img"
                      src={promo.image}
                      alt={getLang(promo.title, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Chip
                      label={`-${promo.discount}%`}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: promo.color,
                        color: WHITE,
                        fontWeight: 800,
                        fontSize: 16,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                      {getLang(promo.title, lang)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                    >
                      {getLang(promo.description, lang)}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Chip
                        label={`Code: ${promo.code}`}
                        size="small"
                        sx={{ bgcolor: `${promo.color}12`, color: promo.color, fontWeight: 700 }}
                      />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {getLang(
                          { vi: 'Đến', en: 'Until', fr: "Jusqu'au", cn: '至', ar: 'حتى' },
                          lang
                        )}
                        : {promo.validUntil}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BRANCHES PAGE
// ----------------------------------------------------------------------

export function Spa9BranchesPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.branches}
        greek="Υπουργεία"
        eyebrow={getLang(
          { vi: 'Hệ thống', en: 'Locations', fr: 'Emplacements', cn: '位置', ar: 'المواقع' },
          lang
        )}
        title={getLang(
          {
            vi: 'Hệ Thống Chi Nhánh',
            en: 'Branch Network',
            fr: 'Réseau de Succursales',
            cn: '分店网络',
            ar: 'شبكة الفروع',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: '5 chi nhánh tại các thành phố lớn trên toàn quốc',
            en: '5 branches in major cities nationwide',
            fr: '5 succursales dans les grandes villes',
            cn: '全国主要城市共5家分店',
            ar: '5 فروع في المدن الكبرى',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_BRANCHES.map((branch) => (
            <Grid key={branch.id} item xs={12} md={6}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    border: `1px solid ${AZURE}15`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: AZURE,
                      boxShadow: '0 16px 48px rgba(27,108,168,0.1)',
                    },
                  }}
                >
                  <Box sx={{ width: 180, flexShrink: 0, display: { xs: 'none', sm: 'block' } }}>
                    <Box
                      component="img"
                      src={branch.image}
                      alt={getLang(branch.name, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                      {getLang(branch.name, lang)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}
                    >
                      {getLang(branch.address, lang)}
                    </Typography>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="solar:phone-bold-duotone" width={16} sx={{ color: OLIVE }} />
                        <Typography variant="caption" sx={{ color: DARK }}>
                          {branch.phone}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="solar:clock-circle-bold-duotone"
                          width={16}
                          sx={{ color: SUN }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {getLang(branch.hours, lang)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// ACCOUNT PAGE
// ----------------------------------------------------------------------

export function Spa9AccountPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.account}
        greek="Λογαριασμός"
        eyebrow={getLang(
          { vi: 'Tài khoản', en: 'Account', fr: 'Compte', cn: '账户', ar: 'الحساب' },
          lang
        )}
        title={getLang(
          {
            vi: 'Quản Lý Tài Khoản',
            en: 'Account Management',
            fr: 'Gestion du Compte',
            cn: '账户管理',
            ar: 'إدارة الحساب',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Xem và quản lý thông tin thành viên của bạn',
            en: 'View and manage your member information',
            fr: 'Consultez et gérez vos informations',
            cn: '查看与管理您的会员信息',
            ar: 'عرض وإدارة معلومات عضويتك',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
          <Stack spacing={4}>
            <Box sx={{ p: 4, borderRadius: 3, bgcolor: WHITE, border: `1px solid ${AZURE}15` }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 3 }}>
                {getLang(
                  {
                    vi: 'Thông tin cá nhân',
                    en: 'Personal Information',
                    fr: 'Informations Personnelles',
                    cn: '个人信息',
                    ar: 'المعلومات الشخصية',
                  },
                  lang
                )}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Họ tên',
                        en: 'Full Name',
                        fr: 'Nom Complet',
                        cn: '姓名',
                        ar: 'الاسم الكامل',
                      },
                      lang
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Email',
                        en: 'Email',
                        fr: 'Email',
                        cn: '邮箱',
                        ar: 'البريد الإلكتروني',
                      },
                      lang
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Số điện thoại',
                        en: 'Phone',
                        fr: 'Téléphone',
                        cn: '电话',
                        ar: 'الهاتف',
                      },
                      lang
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={getLang(
                      {
                        vi: 'Ngày sinh',
                        en: 'Birthday',
                        fr: 'Anniversaire',
                        cn: '生日',
                        ar: 'تاريخ الميلاد',
                      },
                      lang
                    )}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Button
              size="large"
              variant="contained"
              sx={{ bgcolor: SUN, color: DARK, fontWeight: 800, '&:hover': { bgcolor: '#E09517' } }}
            >
              {getLang(
                {
                  vi: 'Lưu thay đổi',
                  en: 'Save Changes',
                  fr: 'Enregistrer',
                  cn: '保存更改',
                  ar: 'حفظ التغييرات',
                },
                lang
              )}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// PARTNERS PAGE
// ----------------------------------------------------------------------

export function Spa9PartnersPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.partners}
        greek="Συνεργάτες"
        eyebrow={getLang(
          { vi: 'Đối tác', en: 'Partners', fr: 'Partenaires', cn: '合作伙伴', ar: 'الشركاء' },
          lang
        )}
        title={getLang(
          {
            vi: 'Đối Tác Chiến Lược',
            en: 'Strategic Partners',
            fr: 'Partenaires Stratégiques',
            cn: '战略合作伙伴',
            ar: 'الشركاء الاستراتيجيون',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Những thương hiệu hàng đầu cùng đồng hành với chúng tôi',
            en: 'Leading brands accompany us',
            fr: 'Des marques de premier plan nous accompagnent',
            cn: '领先品牌与我们同行',
            ar: 'علامات تجارية رائدة ترافقنا',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_PARTNERS.map((partner) => (
            <Grid key={partner.id} item xs={12} sm={6} md={3}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: WHITE,
                    border: `1px solid ${AZURE}15`,
                    textAlign: 'center',
                    transition: 'all 0.35s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      borderColor: AZURE,
                      boxShadow: '0 16px 48px rgba(27,108,168,0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: 'hidden',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={partner.logo}
                      alt={getLang(partner.name, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: DARK, mb: 0.5 }}>
                    {getLang(partner.name, lang)}
                  </Typography>
                  <Chip
                    label={getLang(partner.type, lang)}
                    size="small"
                    sx={{ mt: 1, bgcolor: `${OLIVE}12`, color: OLIVE, fontSize: 10 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mt: 2, lineHeight: 1.6 }}
                  >
                    {getLang(partner.description, lang)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// PACKAGES PAGE
// ----------------------------------------------------------------------

export function Spa9PackagesPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.packages}
        greek="Πακέτα"
        eyebrow={getLang(
          { vi: 'Gói liệu trình', en: 'Packages', fr: 'Forfaits', cn: '套餐', ar: 'الباقات' },
          lang
        )}
        title={getLang(
          {
            vi: 'Gói Liệu Trình Ưu Đãi',
            en: 'Value Packages',
            fr: 'Forfaits Valeur',
            cn: '超值套餐',
            ar: 'باقات القيمة',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Tiết kiệm với các gói liệu trình được thiết kế riêng',
            en: 'Save with specially designed treatment packages',
            fr: 'Économisez avec des forfaits spécialement conçus',
            cn: '特别设计的疗程套餐让您更省钱',
            ar: 'وفّر مع باقات علاج مصممة خصيصًا',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_PACKAGES.map((pkg) => (
            <Grid key={pkg.id} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    border: `2px solid ${pkg.color}`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 80px ${pkg.color}20`,
                    },
                  }}
                >
                  <Box sx={{ height: 140, position: 'relative' }}>
                    <Box
                      component="img"
                      src={pkg.image}
                      alt={getLang(pkg.name, lang)}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{ position: 'absolute', inset: 0, bgcolor: pkg.color, opacity: 0.35 }}
                    />
                    <Box sx={{ position: 'absolute', top: 12, left: 12, right: 12 }}>
                      <Chip
                        label={`-${pkg.discount}%`}
                        size="small"
                        sx={{ bgcolor: WHITE, color: pkg.color, fontWeight: 800 }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK }}>
                      {getLang(pkg.name, lang)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', my: 1 }}>
                      {getLang(pkg.subtitle, lang)}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                      >
                        {formatVND(pkg.originalPrice)}
                      </Typography>
                      <Typography variant="h6" sx={{ color: pkg.color, fontWeight: 800 }}>
                        {formatVND(pkg.price)}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: OLIVE, fontWeight: 600 }}>
                      {pkg.treatments}{' '}
                      {getLang(
                        {
                          vi: 'liệu trình',
                          en: 'treatments',
                          fr: 'soins',
                          cn: '项疗程',
                          ar: 'علاجات',
                        },
                        lang
                      )}{' '}
                      • {getLang(pkg.validity, lang)}
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BEFORE/AFTER PAGE
// ----------------------------------------------------------------------

export function Spa9BeforeAfterPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.beforeAfter}
        greek="Αποτελέσματα"
        eyebrow={getLang(
          { vi: 'Kết quả', en: 'Results', fr: 'Résultats', cn: '结果', ar: 'النتائج' },
          lang
        )}
        title={getLang(
          {
            vi: 'Kết Quả Trước - Sau',
            en: 'Before & After Results',
            fr: 'Résultats Avant-Après',
            cn: '前后对比',
            ar: 'النتائج قبل وبعد',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Hiệu quả thực tế từ khách hàng của chúng tôi',
            en: 'Real results from our customers',
            fr: 'Résultats réels de nos clients',
            cn: '来自客户的真实效果',
            ar: 'نتائج حقيقية من عملائنا',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {SPA9_BEFORE_AFTER.map((item) => (
            <Grid key={item.id} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: WHITE,
                    border: `1px solid ${AZURE}15`,
                  }}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={item.before}
                          alt="Before"
                          sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                        />
                        <Chip
                          label="Before"
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            bgcolor: 'rgba(0,0,0,0.6)',
                            color: WHITE,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={item.after}
                          alt="After"
                          sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                        />
                        <Chip
                          label="After"
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: AZURE,
                            color: WHITE,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: DARK }}>
                      {getLang(item.treatment, lang)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', my: 1 }}>
                      {getLang(item.description, lang)}
                    </Typography>
                    <Chip
                      label={getLang(item.duration, lang)}
                      size="small"
                      sx={{ bgcolor: `${OLIVE}12`, color: OLIVE }}
                    />
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// FAQ PAGE
// ----------------------------------------------------------------------

export function Spa9FaqPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.faq}
        greek="Ερωτήσεις"
        eyebrow={getLang(
          { vi: 'FAQ', en: 'FAQ', fr: 'FAQ', cn: '常见问题', ar: 'الأسئلة الشائعة' },
          lang
        )}
        title={getLang(
          {
            vi: 'Câu Hỏi Thường Gặp',
            en: 'Frequently Asked Questions',
            fr: 'Questions Fréquentes',
            cn: '常见问题',
            ar: 'الأسئلة الشائعة',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Tìm câu trả lời cho những thắc mắc phổ biến',
            en: 'Find answers to common questions',
            fr: 'Trouvez des réponses aux questions courantes',
            cn: '找到常见问题的答案',
            ar: 'اعثر على إجابات للأسئلة الشائعة',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={3}>
          {SPA9_FAQ.map((faq, idx) => (
            <Box key={faq.id} component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: WHITE,
                  border: `1px solid ${AZURE}15`,
                  transition: 'all 0.3s ease',
                  '&:hover': { borderColor: AZURE },
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: `${AZURE}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: AZURE, fontWeight: 800 }}>
                      Q{idx + 1}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                      {getLang(faq.question, lang)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {getLang(faq.answer, lang)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// POLICY PAGE
// ----------------------------------------------------------------------

export function Spa9PolicyPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.policy}
        greek="Πολιτική"
        eyebrow={getLang(
          { vi: 'Chính sách', en: 'Policy', fr: 'Politique', cn: '政策', ar: 'السياسة' },
          lang
        )}
        title={getLang(
          {
            vi: 'Chính Sách Sử Dụng',
            en: 'Usage Policy',
            fr: "Politique d'Utilisation",
            cn: '使用政策',
            ar: 'سياسة الاستخدام',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Thông tin về các chính sách và quy định của chúng tôi',
            en: 'Information about our policies and regulations',
            fr: 'Informations sur nos politiques et règlements',
            cn: '关于我们政策与规定的信息',
            ar: 'معلومات عن سياساتنا ولوائحنا',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={4}>
          {SPA9_POLICY.map((policy, idx) => (
            <Box key={policy.id} component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Box sx={{ p: 4, borderRadius: 3, bgcolor: WHITE, border: `1px solid ${AZURE}15` }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${AZURE}12`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify
                      icon={
                        [
                          'solar:calendar-bold-duotone',
                          'solar:card-bold-duotone',
                          'solar:shield-check-bold-duotone',
                        ][idx] || 'solar:document-bold-duotone'
                      }
                      width={24}
                      sx={{ color: AZURE }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: DARK, mb: 1 }}>
                      {getLang(policy.title, lang)}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.85 }}>
                      {getLang(policy.content, lang)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// GALLERY PAGE
// ----------------------------------------------------------------------

export function Spa9GalleryPageView() {
  const { t } = useTranslate('spa9');
  const currentLang = useTranslate('common');
  const lang = currentLang.currentLang?.value || 'en';

  const [selected, setSelected] = React.useState('all');

  const categories = [
    { value: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tout', cn: '全部', ar: 'الكل' } },
    {
      value: 'facilities',
      label: {
        vi: 'Cơ sở vật chất',
        en: 'Facilities',
        fr: 'Installations',
        cn: '设施',
        ar: 'المرافق',
      },
    },
    {
      value: 'treatments',
      label: { vi: 'Liệu trình', en: 'Treatments', fr: 'Soins', cn: '疗程', ar: 'العلاجات' },
    },
    {
      value: 'interior',
      label: { vi: 'Nội thất', en: 'Interior', fr: 'Intérieur', cn: '内部', ar: 'الداخل' },
    },
  ];

  const filtered =
    selected === 'all' ? SPA9_GALLERY : SPA9_GALLERY.filter((g) => g.category === selected);

  return (
    <Box sx={{ bgcolor: SAND }}>
      <Spa9PageHero
        image={SPA9_PAGE_IMAGES.gallery}
        greek="Συλλογή"
        eyebrow={getLang(
          { vi: 'Thư viện', en: 'Gallery', fr: 'Galerie', cn: '画廊', ar: 'المعرض' },
          lang
        )}
        title={getLang(
          {
            vi: 'Thư Viện Hình Ảnh',
            en: 'Photo Gallery',
            fr: 'Galerie Photos',
            cn: '图片库',
            ar: 'معرض الصور',
          },
          lang
        )}
        subtitle={getLang(
          {
            vi: 'Khám phá không gian và dịch vụ của Thalassa',
            en: "Explore Thalassa's space and services",
            fr: "Explorez l'espace et les services de Thalassa",
            cn: '探索Thalassa的空间与服务',
            ar: 'استكشف مساحة وخدمات ثالاسا',
          },
          lang
        )}
      />

      <Container component={MotionViewport} maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ mb: 4 }}>
          <ToggleButtonGroup
            value={selected}
            exclusive
            onChange={(_, v) => v && setSelected(v)}
            sx={{ gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {categories.map((cat) => (
              <ToggleButton
                key={cat.value}
                value={cat.value}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  border: `1px solid ${AZURE}30`,
                  color: DARK,
                  '&.Mui-selected': { bgcolor: AZURE, color: WHITE, borderColor: AZURE },
                }}
              >
                {getLang(cat.label as Record<string, string>, lang)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3}>
          {filtered.map((img) => (
            <Grid key={img.id} item xs={12} sm={6} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    height: 260,
                    position: 'relative',
                    transition: 'all 0.35s ease',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                >
                  <Box
                    component="img"
                    src={img.src}
                    alt={getLang(img.alt, lang)}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,40,64,0.8) 0%, transparent 50%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 2,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: WHITE, fontWeight: 600 }}>
                      {getLang(img.alt, lang)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
