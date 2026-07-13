import type { Spa6Lang } from 'src/sections/spa6/spa6-data';

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

const TERRA = '#C1440E';
const FOREST = '#2D5016';
const CREAM = '#FFF8F0';
const EARTH = '#8B4513';

const DOSHAS = [
  {
    name: 'Vata',
    element: {
      vi: 'Khí & Không gian',
      en: 'Air & Space',
      fr: 'Air et Espace',
      cn: '风与空',
      ar: 'الهواء والفضاء',
    },
    traits: {
      vi: 'Sáng tạo, nhanh nhạy, dễ lo lắng và mất ngủ',
      en: 'Creative, quick-minded, prone to anxiety and insomnia',
      fr: 'Créatif, vif d’esprit, sujet à l’anxiété et à l’insomnie',
      cn: '富有创造力、思维敏捷、易焦虑与失眠',
      ar: 'مبدع، سريع البديهة، عرضة للقلق والأرق',
    },
    imbalance: {
      vi: 'Khô da, táo bón, bồn chồn',
      en: 'Dry skin, constipation, restlessness',
      fr: 'Peau sèche, constipation, agitation',
      cn: '皮肤干燥、便秘、不安',
      ar: 'جفاف البشرة، الإمساك، التوتر',
    },
    treatment: {
      vi: 'Abhyanga massage với dầu mè ấm',
      en: 'Abhyanga massage with warm sesame oil',
      fr: 'Massage Abhyanga à l’huile de sésame chaude',
      cn: '使用温热芝麻油的 Abhyanga 按摩',
      ar: 'تدليك أبهيانجا بزيت السمسم الدافئ',
    },
    color: '#7ECEF4',
    icon: 'solar:wind-bold-duotone',
    bg: '#EBF8FF',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80',
  },
  {
    name: 'Pitta',
    element: {
      vi: 'Lửa & Nước',
      en: 'Fire & Water',
      fr: 'Feu et Eau',
      cn: '火与水',
      ar: 'النار والماء',
    },
    traits: {
      vi: 'Quyết đoán, thông minh, dễ tức giận và viêm nhiễm',
      en: 'Decisive, intelligent, prone to anger and inflammation',
      fr: 'Décisif, intelligent, sujet à la colère et à l’inflammation',
      cn: '果断、聪明、易怒与炎症',
      ar: 'حاسم، ذكي، عرضة للغضب والالتهاب',
    },
    imbalance: {
      vi: 'Nổi mụn, tiêu hóa kém, đau đầu',
      en: 'Acne, poor digestion, headaches',
      fr: 'Acné, mauvaise digestion, maux de tête',
      cn: '痘痘、消化不良、头痛',
      ar: 'حب الشباب، سوء الهضم، الصداع',
    },
    treatment: {
      vi: 'Shirodhara + liệu pháp nước dừa mát',
      en: 'Shirodhara + cooling coconut water therapy',
      fr: 'Shirodhara + thérapie rafraîchissante à l’eau de coco',
      cn: 'Shirodhara + 清凉椰子水疗法',
      ar: 'شيرودارا + علاج منعش بماء جوز الهند',
    },
    color: TERRA,
    icon: 'solar:fire-bold-duotone',
    bg: '#FFF5F0',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80',
  },
  {
    name: 'Kapha',
    element: {
      vi: 'Đất & Nước',
      en: 'Earth & Water',
      fr: 'Terre et Eau',
      cn: '土与水',
      ar: 'الأرض والماء',
    },
    traits: {
      vi: 'Bình tĩnh, nhẫn nại, dễ tăng cân và uể oải',
      en: 'Calm, patient, prone to weight gain and lethargy',
      fr: 'Calme, patient, sujet à la prise de poids et à la léthargie',
      cn: '平静、耐心、易体重增加与倦怠',
      ar: 'هادئ، صبور، عرضة لزيادة الوزن والخمول',
    },
    imbalance: {
      vi: 'Phù nề, nghẹt mũi, trầm cảm',
      en: 'Edema, congestion, depression',
      fr: 'Œdème, congestion, dépression',
      cn: '水肿、鼻塞、抑郁',
      ar: 'وذمة، احتقان، اكتئاب',
    },
    treatment: {
      vi: 'Udvartana — tẩy da bằng bột thảo mộc',
      en: 'Udvartana — herbal powder body scrub',
      fr: 'Udvartana — gommage corporel aux poudres d’herbes',
      cn: 'Udvartana — 草本粉末身体磨砂',
      ar: 'أودفارتانا — تقشير الجسم بمسحوق الأعشاب',
    },
    color: FOREST,
    icon: 'solar:leaf-bold-duotone',
    bg: '#F0FAF0',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80',
  },
];

export function Spa6Dosha() {
  const { currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TERRA, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Ayurveda science',
                    vi: 'Khoa học Ayurveda',
                    fr: 'Science Ayurveda',
                    cn: '阿育吠陀科学',
                    ar: 'علم الأيورفيدا',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 900, maxWidth: 500, mx: 'auto' }}>
              {
                (
                  {
                    en: 'Discover your ',
                    vi: 'Bạn thuộc ',
                    fr: 'Découvrez votre ',
                    cn: '你属于',
                    ar: 'اكتشف ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: TERRA }}>
                {
                  (
                    {
                      en: 'Dosha',
                      vi: 'Dosha nào?',
                      fr: 'Dosha',
                      cn: '哪种 Dosha？',
                      ar: 'الدوشا الخاص بك',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 540, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: 'Ayurveda 5,000 years identifies 3 fundamental body types. Know your Dosha = find the healing therapy most aligned with your body.',
                    vi: 'Ayurveda 5.000 năm xác định 3 thể chất căn bản. Hiểu Dosha của bạn = tìm được liệu pháp chữa lành đúng nhất cho cơ thể.',
                    fr: 'L’Ayurveda, vieille de 5 000 ans, identifie 3 types de constitution fondamentaux. Connaître votre Dosha = trouver la thérapie de guérison la plus adaptée à votre corps.',
                    cn: '五千年的阿育吠陀确立了三种基本体质。了解你的 Dosha = 找到最契合你身体的疗愈方法。',
                    ar: 'تحدد الأيورفيدا منذ 5000 عام ثلاثة أنماط جسدية أساسية. معرفة الدوشا الخاص بك = إيجاد العلاج الأنسب لجسدك.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {DOSHAS.map((d, idx) => (
            <Grid key={d.name} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 40 + idx * 10 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    bgcolor: 'white',
                    border: `1px solid ${d.color}20`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 32px 80px ${d.color}18`,
                      borderColor: d.color,
                    },
                    '&:hover img': { transform: 'scale(1.06)' },
                  }}
                >
                  <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                    <Box
                      component="img"
                      src={d.image}
                      alt={d.name}
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
                        bgcolor: d.color,
                        opacity: 0.25,
                        mixBlendMode: 'multiply',
                      }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 14, left: 14 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            bgcolor: d.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon={d.icon} width={20} sx={{ color: 'white' }} />
                        </Box>
                        <Box>
                          <Typography variant="h5" sx={{ color: 'white', fontWeight: 900 }}>
                            {d.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            {d.element[lang]}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Stack spacing={0.5}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: d.color,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: 2,
                          fontSize: 10,
                        }}
                      >
                        {
                          (
                            {
                              en: 'Traits',
                              vi: 'Đặc điểm',
                              fr: 'Traits',
                              cn: '特征',
                              ar: 'السمات',
                            } as const
                          )[lang]
                        }
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {d.traits[lang]}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.5}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: EARTH,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: 2,
                          fontSize: 10,
                        }}
                      >
                        {
                          (
                            {
                              en: 'Recommended therapy',
                              vi: 'Liệu pháp phù hợp',
                              fr: 'Thérapie recommandée',
                              cn: '推荐疗法',
                              ar: 'العلاج الموصى به',
                            } as const
                          )[lang]
                        }
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.primary', fontWeight: 600, lineHeight: 1.6 }}
                      >
                        {d.treatment[lang]}
                      </Typography>
                    </Stack>
                    <Box sx={{ pt: 0.5, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: 11 }}>
                        {
                          (
                            {
                              en: '⚠ Imbalance: ',
                              vi: '⚠ Mất cân bằng: ',
                              fr: '⚠ Déséquilibre : ',
                              cn: '⚠ 失衡：',
                              ar: '⚠ اختلال التوازن: ',
                            } as const
                          )[lang]
                        }
                        {d.imbalance[lang]}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ height: 3, bgcolor: d.color }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}
        >
          <Stack spacing={1.5} alignItems="center">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {
                (
                  {
                    en: "Don't know your Dosha? Take our free quiz now.",
                    vi: 'Chưa biết Dosha của mình? Làm bài kiểm tra miễn phí ngay.',
                    fr: 'Vous ne connaissez pas votre Dosha ? Faites notre quiz gratuit maintenant.',
                    cn: '还不知道你的 Dosha？立即参加我们的免费测验。',
                    ar: 'لا تعرف الدوشا الخاص بك؟ قم بإجراء اختبارنا المجاني الآن.',
                  } as const
                )[lang]
              }
            </Typography>
            <Button
              size="large"
              startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
              sx={{
                bgcolor: TERRA,
                color: 'white',
                borderRadius: 3,
                px: 5,
                py: 1.75,
                fontWeight: 800,
                '&:hover': { bgcolor: '#A33A0C' },
              }}
            >
              {
                (
                  {
                    en: 'Free Dosha quiz',
                    vi: 'Kiểm tra Dosha miễn phí',
                    fr: 'Quiz Dosha gratuit',
                    cn: '免费 Dosha 测验',
                    ar: 'اختبار الدوشا المجاني',
                  } as const
                )[lang]
              }
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
