import type { Spa10Lang } from 'src/sections/spa10/spa10-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { ICE, TEAL, NORDIC_BLUE } from 'src/sections/spa10/spa10-data';

// ----------------------------------------------------------------------

const IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    ratio: '3/4',
    caption: {
      vi: 'Sauna bạch dương truyền thống',
      en: 'Traditional birch sauna',
      fr: 'Sauna au bouleau traditionnel',
      cn: '传统桦木桑拿',
      ar: 'ساونا البتولا التقليدية',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1609436132311-e4b80a0e0b45?w=800&q=80',
    ratio: '4/3',
    caption: {
      vi: 'Cold plunge 4°C',
      en: 'Cold plunge 4°C',
      fr: 'Bain froid 4°C',
      cn: '4°C 冷水浴',
      ar: 'الغطس البارد 4°C',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    ratio: '1/1',
    caption: {
      vi: 'Rừng bạch dương Nordic',
      en: 'Nordic birch forest',
      fr: 'Forêt de bouleaux nordique',
      cn: '北欧桦木森林',
      ar: 'غابة البتولا الإسكندنافية',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1578674473215-9e07ee2e577d?w=800&q=80',
    ratio: '4/3',
    caption: {
      vi: 'Thư giãn sau nghi lễ',
      en: 'Post-ritual relaxation',
      fr: 'Détente après le rituel',
      cn: '仪式后的放松',
      ar: 'الاسترخاء بعد الطقس',
    },
  },
];

const TESTIMONIALS = [
  {
    quote: {
      vi: '"Lần đầu tiên trong 5 năm tôi ngủ được 8 tiếng liên tục sau buổi Aurora Full Ritual. Không thuốc, không thiền định — chỉ nóng, lạnh và rừng."',
      en: '"For the first time in 5 years I slept 8 consecutive hours after the Aurora Full Ritual. No medication, no meditation — just heat, cold and forest."',
      fr: '« Pour la première fois en 5 ans, j’ai dormi 8 heures d’affilée après l’Aurora Full Ritual. Sans médicaments, sans méditation — juste le chaud, le froid et la forêt. »',
      cn: '“5 年来我第一次在 Aurora Full Ritual 后连续睡了 8 个小时。不靠药物，不靠冥想——只靠热、冷和森林。”',
      ar: '"لأول مرة منذ 5 سنوات نمت 8 ساعات متواصلة بعد طقس Aurora Full Ritual. دون أدوية، دون تأمّل — فقط حرارة وبرودة وغابة."',
    },
    name: 'Nguyễn Minh Anh',
    role: {
      vi: 'Giám đốc điều hành · 38 tuổi',
      en: 'CEO · 38 years old',
      fr: 'PDG · 38 ans',
      cn: '首席执行官 · 38 岁',
      ar: 'الرئيس التنفيذي · 38 عامًا',
    },
    avatar: 'MA',
    color: TEAL,
  },
  {
    quote: {
      vi: '"Cold plunge 4°C — tôi sợ chết. Nhưng sau 2 phút bước ra, cảm giác hưng phấn không thể tả. Người Phần Lan gọi đúng là the best high."',
      en: '"Cold plunge 4°C — I was terrified. But after 2 minutes stepping out, the euphoria was indescribable. The Finns are right to call it the best high."',
      fr: '« Bain froid 4°C — j’étais terrifié. Mais 2 minutes après en être sorti, l’euphorie était indescriptible. Les Finlandais ont raison de l’appeler le meilleur high. »',
      cn: '“4°C 冷水浴——我吓坏了。但走出来的 2 分钟后，那种欢愉无法言表。芬兰人称它为最佳快感，一点也没错。”',
      ar: '"الغطس البارد 4°C — كنت مرعوبًا. لكن بعد دقيقتين من الخروج، كانت النشوة تفوق الوصف. الفنلنديون محقّون في تسميتها أفضل نشوة."',
    },
    name: 'Trần Việt Hưng',
    role: {
      vi: 'Bác sĩ · 45 tuổi',
      en: 'Doctor · 45 years old',
      fr: 'Médecin · 45 ans',
      cn: '医生 · 45 岁',
      ar: 'طبيب · 45 عامًا',
    },
    avatar: 'VH',
    color: '#E85D04',
  },
  {
    quote: {
      vi: '"Phytoncide thực sự có hiệu quả — sau 30 phút tắm rừng, tôi cảm thấy đầu óc sáng và bình an hơn bất kỳ buổi yoga nào tôi từng làm."',
      en: '"Phytoncides truly work — after 30 minutes of forest bathing, I felt clearer and more peaceful than any yoga session I\'ve ever done."',
      fr: '« Les phytoncides fonctionnent vraiment — après 30 minutes de bain de forêt, je me suis senti plus clair et plus apaisé qu’à l’issue de n’importe quelle séance de yoga. »',
      cn: '“植物杀菌素真的有效——森林浴 30 分钟后，我感觉比以往任何一次瑜伽都更清明、更宁静。”',
      ar: '"الفيتونسيدات تعمل حقًا — بعد 30 دقيقة من حمام الغابة، شعرت بصفاء وسلام أكثر من أي جلسة يوغا مارستها."',
    },
    name: 'Lê Thị Phương',
    role: {
      vi: 'Kiến trúc sư · 31 tuổi',
      en: 'Architect · 31 years old',
      fr: 'Architecte · 31 ans',
      cn: '建筑师 · 31 岁',
      ar: 'مهندس معماري · 31 عامًا',
    },
    avatar: 'LP',
    color: '#2D6A4F',
  },
];

export function Spa10Ambiance() {
  const { currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <>
      {/* Gallery section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: NORDIC_BLUE,
          overflow: 'hidden',
        }}
      >
        <Container component={MotionViewport} maxWidth="xl">
          <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="overline"
                sx={{ color: TEAL, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
              >
                {
                  (
                    {
                      en: 'Aurora Nordic Spaces',
                      vi: 'Không gian Aurora Nordic',
                      fr: 'Espaces Aurora Nordic',
                      cn: 'Aurora 北欧空间',
                      ar: 'مساحات أورورا الإسكندنافية',
                    } as const
                  )[lang]
                }
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, color: ICE, maxWidth: 480, mx: 'auto', lineHeight: 1.1 }}
              >
                {
                  (
                    {
                      en: 'Spaces ',
                      vi: 'Không gian ',
                      fr: 'Des espaces ',
                      cn: '空间 ',
                      ar: 'مساحات ',
                    } as const
                  )[lang]
                }
                <Box component="span" sx={{ color: TEAL }}>
                  {
                    (
                      {
                        en: 'designed to heal',
                        vi: 'được thiết kế để chữa lành',
                        fr: 'conçus pour guérir',
                        cn: '为疗愈而设计',
                        ar: 'مصممة للشفاء',
                      } as const
                    )[lang]
                  }
                </Box>
              </Typography>
            </Box>
          </Stack>

          {/* Masonry-style grid */}
          <Grid container spacing={2}>
            {/* Left column: tall portrait */}
            <Grid item xs={12} sm={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 40 }).inLeft}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: { xs: 300, md: '100%' },
                    minHeight: { md: 520 },
                    position: 'relative',
                    '&:hover .img-overlay': { opacity: 1 },
                    '&:hover img': { transform: 'scale(1.06)' },
                  }}
                >
                  <Box
                    component="img"
                    src={IMAGES[0].src}
                    alt={IMAGES[0].caption[lang]}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box
                    className="img-overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, rgba(11,29,53,0.8) 0%, transparent 50%)`,
                      opacity: 0.7,
                      transition: 'opacity 0.3s',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: ICE, fontWeight: 600, fontSize: 13 }}
                    >
                      {IMAGES[0].caption[lang]}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right: 2 rows */}
            <Grid item xs={12} sm={8}>
              <Stack spacing={2} sx={{ height: '100%' }}>
                {/* Top row */}
                <Box
                  component={m.div}
                  variants={varFade({ distance: 40 }).inRight}
                  sx={{
                    flex: 1,
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: 220,
                    '&:hover .img-overlay2': { opacity: 1 },
                    '&:hover img': { transform: 'scale(1.05)' },
                  }}
                >
                  <Box
                    component="img"
                    src={IMAGES[1].src}
                    alt={IMAGES[1].caption[lang]}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box
                    className="img-overlay2"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(to top, rgba(11,29,53,0.8) 0%, transparent 60%)`,
                      opacity: 0.6,
                      transition: 'opacity 0.3s',
                      display: 'flex',
                      alignItems: 'flex-end',
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: ICE, fontWeight: 600, fontSize: 13 }}
                    >
                      {IMAGES[1].caption[lang]}
                    </Typography>
                  </Box>
                </Box>

                {/* Bottom row: 2 side-by-side */}
                <Grid container spacing={2} sx={{ flex: 1 }}>
                  {IMAGES.slice(2).map((img, i) => (
                    <Grid key={img.src} item xs={6}>
                      <Box
                        component={m.div}
                        variants={varFade({ distance: 30 }).inUp}
                        sx={{
                          borderRadius: 4,
                          overflow: 'hidden',
                          height: { xs: 180, md: 240 },
                          position: 'relative',
                          '&:hover img': { transform: 'scale(1.08)' },
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
                          className="cap"
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 2,
                            background: `linear-gradient(to top, rgba(11,29,53,0.85), transparent)`,
                            opacity: 0.7,
                            transition: 'opacity 0.3s',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: ICE, fontWeight: 600, fontSize: 11 }}
                          >
                            {img.caption[lang]}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: '#08141F',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background quote mark */}
        <Typography
          sx={{
            position: 'absolute',
            top: -40,
            left: '5%',
            fontSize: 400,
            fontWeight: 900,
            color: 'rgba(0,201,167,0.03)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          &ldquo;
        </Typography>

        <Container component={MotionViewport} maxWidth="lg">
          <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="overline"
                sx={{ color: TEAL, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
              >
                {
                  (
                    {
                      en: 'Real experiences',
                      vi: 'Trải nghiệm thực tế',
                      fr: 'Expériences réelles',
                      cn: '真实体验',
                      ar: 'تجارب حقيقية',
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
                      en: 'They experienced it',
                      vi: 'Họ đã trải nghiệm',
                      fr: 'Ils l’ont vécu',
                      cn: '他们亲身体验',
                      ar: 'لقد اختبروه',
                    } as const
                  )[lang]
                }
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3}>
            {TESTIMONIALS.map((test, idx) => (
              <Grid key={test.name} item xs={12} md={4}>
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
                      bgcolor: '#0B1A28',
                      border: `1px solid rgba(255,255,255,0.04)`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: test.color,
                        transform: 'translateY(-6px)',
                        boxShadow: `0 24px 60px ${test.color}18`,
                      },
                    }}
                  >
                    <Iconify
                      icon="solar:double-alt-arrow-right-bold-duotone"
                      width={28}
                      sx={{ color: test.color, mb: 2.5, opacity: 0.7 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(234,249,246,0.75)',
                        lineHeight: 1.85,
                        fontStyle: 'italic',
                        flexGrow: 1,
                        mb: 3,
                        fontSize: 14,
                      }}
                    >
                      {test.quote[lang]}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          bgcolor: test.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: NORDIC_BLUE, fontWeight: 800, fontSize: 13 }}
                        >
                          {test.avatar}
                        </Typography>
                      </Box>
                      <Stack spacing={0.25}>
                        <Typography variant="subtitle2" sx={{ color: ICE, fontWeight: 800 }}>
                          {test.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgba(234,249,246,0.4)', fontSize: 12 }}
                        >
                          {test.role[lang]}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* CTA */}
          <Box
            component={m.div}
            variants={varFade({ distance: 20 }).inUp}
            sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}
          >
            <Button
              size="large"
              startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
              sx={{
                bgcolor: TEAL,
                color: NORDIC_BLUE,
                borderRadius: 3,
                px: 5,
                py: 2,
                fontWeight: 900,
                fontSize: 16,
                '&:hover': { bgcolor: '#00A88A' },
              }}
            >
              {
                (
                  {
                    en: 'Book Aurora ritual now',
                    vi: 'Đặt nghi lễ Aurora ngay',
                    fr: 'Réserver le rituel Aurora',
                    cn: '立即预约 Aurora 仪式',
                    ar: 'احجز طقس أورورا الآن',
                  } as const
                )[lang]
              }
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
