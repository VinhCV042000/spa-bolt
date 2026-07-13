import type { Spa14Lang } from 'src/sections/spa14/spa14-data';

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

const GARNET = '#8B1A2F';
const ANT_GOLD = '#C9A55A';
const IMP_CREAM = '#FAF0E6';
const EMERALD = '#2E7D32';

const FIVE_ELEMENTS = [
  {
    name: {
      vi: 'Kim — Tinh Thần',
      en: 'Metal — Spirit',
      fr: 'Métal — Esprit',
      cn: '金 — 精神',
      ar: 'المعدن — الروح',
    },
    desc: {
      vi: 'Liệu pháp vàng 24K và bạc nguyên chất tác động lên hệ thần kinh, tăng cường trí tuệ và làm sắc nét tư duy. Kim tướng ứng với phổi và đại tràng.',
      en: '24K gold and pure silver therapy impacts the nervous system, enhancing intelligence and sharpening thinking. Metal governs lungs and large intestine.',
      fr: "La thérapie à l'or 24 carats et à l'argent pur agit sur le système nerveux, améliorant l'intelligence et aiguisant la pensée. Le Métal gouverne les poumons et le gros intestin.",
      cn: '24K黄金和纯银疗法作用于神经系统，增强智力并使思维敏锐。金主肺与大肠。',
      ar: 'يؤثر العلاج بالذهب عيار 24 والفضة النقية على الجهاز العصبي، مما يعزز الذكاء ويصقل التفكير. المعدن يحكم الرئتين والأمعاء الغليظة.',
    },
    icon: 'solar:star-bold-duotone',
    color: ANT_GOLD,
  },
  {
    name: {
      vi: 'Mộc — Sinh Khí',
      en: 'Wood — Life Force',
      fr: 'Bois — Force vitale',
      cn: '木 — 生气',
      ar: 'الخشب — قوة الحياة',
    },
    desc: {
      vi: 'Thảo dược và tinh dầu thiên nhiên nuôi dưỡng can và đớm — bộ đôi chịu trách nhiệm cho tầm nhìn, quyết đoán và khả năng lập kế hoạch dài hạn.',
      en: 'Natural herbs and essential oils nourish liver and gallbladder — the pair responsible for vision, decisiveness and long-term planning.',
      fr: 'Les herbes naturelles et les huiles essentielles nourrissent le foie et la vésicule biliaire — le duo responsable de la vision, de la décision et de la planification à long terme.',
      cn: '天然草药和精油滋养肝与胆——负责视野、果断和长远规划的组合。',
      ar: 'تغذي الأعشاب الطبيعية والزيوت الأساسية الكبد والمرارة — الثنائي المسؤول عن الرؤية والحسم والتخطيط طويل الأمد.',
    },
    icon: 'solar:leaf-bold-duotone',
    color: EMERALD,
  },
  {
    name: {
      vi: 'Thủy — Tiềm Năng',
      en: 'Water — Potential',
      fr: 'Eau — Potentiel',
      cn: '水 — 潜能',
      ar: 'الماء — الإمكانات',
    },
    desc: {
      vi: 'Nghi lễ tắm khoáng và thủy liệu pháp kích hoạt thận và bàng quang — nơi trú ngụ của Tiên Thiên Khí, nguồn gốc sức sống bẩm sinh và tuổi thọ.',
      en: 'Mineral bathing and hydrotherapy activate kidneys and bladder — dwelling of Original Qi, the source of innate vitality and longevity.',
      fr: "Les bains minéraux et l'hydrothérapie activent les reins et la vessie — demeure du Qi originel, source de vitalité innée et de longévité.",
      cn: '矿物浴和水疗激活肾与膀胱——先天之气的居所，先天活力与长寿的源泉。',
      ar: 'ينشِّط الاستحمام بالمعادن والعلاج المائي الكلى والمثانة — موطن الطاقة الأصلية، مصدر الحيوية الفطرية وطول العمر.',
    },
    icon: 'solar:drop-bold-duotone',
    color: '#4A90D9',
  },
  {
    name: {
      vi: 'Hỏa — Hỷ Lạc',
      en: 'Fire — Joy',
      fr: 'Feu — Joie',
      cn: '火 — 喜乐',
      ar: 'النار — الفرح',
    },
    desc: {
      vi: 'Liệu pháp nhiệt đặc biệt nuôi dưỡng tâm và tiểu tràng — cai quản cảm xúc, tư duy và ý thức. Hỏa bừng cháy tạo ra hỷ lạc và kết nối tâm linh.',
      en: 'Special heat therapy nourishes heart and small intestine — governing emotions, thought and consciousness. Awakened Fire creates joy and spiritual connection.',
      fr: "La thérapie thermique spéciale nourrit le cœur et l'intestin grêle — gouvernant les émotions, la pensée et la conscience. Le Feu éveillé crée la joie et la connexion spirituelle.",
      cn: '特调热疗法滋养心与小肠——主管情感、思维和意识。点燃的火元素带来喜乐与心灵连接。',
      ar: 'يغذي العلاج الحراري الخاص القلب والأمعاء الدقيقة — حيث يحكم المشاعر والفكر والوعي. النار المتقدة تخلق الفرح والاتصال الروحي.',
    },
    icon: 'solar:fire-bold-duotone',
    color: GARNET,
  },
  {
    name: {
      vi: 'Thổ — Trung Hòa',
      en: 'Earth — Harmony',
      fr: 'Terre — Harmonie',
      cn: '土 — 中和',
      ar: 'الأرض — الانسجام',
    },
    desc: {
      vi: 'Liệu pháp đất sét và bùn khoáng tác động lên tỳ và vị — trung tâm tiêu hóa và hấp thụ, cả vật chất lẫn cảm xúc. Thổ nuôi dưỡng và cân bằng.',
      en: 'Clay and mineral mud therapy impacts spleen and stomach — the center of digestion and absorption, both physical and emotional. Earth nourishes and balances.',
      fr: "La thérapie à l'argile et à la boue minérale agit sur la rate et l'estomac — le centre de la digestion et de l'absorption, tant physique qu'émotionnelle. La Terre nourrit et équilibre.",
      cn: '黏土和矿物泥疗法作用于脾与胃——消化与吸收的中心，兼及身体与情感。土滋养并平衡。',
      ar: 'يؤثر العلاج بالطين والوحل المعدني على الطحال والمعدة — مركز الهضم والامتصاص، جسديًا وعاطفيًا. الأرض تغذي وتوازن.',
    },
    icon: 'solar:planet-bold-duotone',
    color: '#8B6914',
  },
];

const TESTIMONIALS = [
  {
    quote: {
      vi: '"Sau 3 tháng điều trị Ngũ Hành, huyết áp tôi giảm từ 150/95 xuống 128/82 — không cần thuốc. Bác sĩ của tôi không tin nổi."',
      en: '"After 3 months of Five Elements treatment, my blood pressure dropped from 150/95 to 128/82 — without medication. My doctor couldn\'t believe it."',
      fr: "« Après 3 mois de traitement des Cinq Éléments, ma tension artérielle est passée de 150/95 à 128/82 — sans médicaments. Mon médecin n'arrivait pas à y croire. »",
      cn: '“经过3个月的五行治疗，我的血压从150/95降到128/82——无需用药。我的医生简直不敢相信。”',
      ar: '"بعد 3 أشهر من علاج العناصر الخمسة، انخفض ضغط دمي من 150/95 إلى 128/82 — دون أدوية. لم يصدّق طبيبي ذلك."',
    },
    name: 'GS. Trần Minh',
    role: {
      vi: 'Giáo sư Y khoa · 58 tuổi',
      en: 'Medical Professor · 58 years old',
      fr: 'Professeur de médecine · 58 ans',
      cn: '医学教授 · 58岁',
      ar: 'أستاذ طب · 58 عامًا',
    },
    color: ANT_GOLD,
  },
  {
    quote: {
      vi: '"Imperial Spa không chỉ là spa — đó là y học cổ truyền Việt Nam được đưa vào thế kỷ 21. Tôi đã đến nhiều nơi ở Châu Á, đây là nơi duy nhất tôi cảm thấy hiểu mình nhất."',
      en: '"Imperial Spa is not just a spa — it is Vietnamese traditional medicine brought into the 21st century. I\'ve been to many places in Asia; this is the only place I felt most understood."',
      fr: "« Imperial Spa n'est pas seulement un spa — c'est la médecine traditionnelle vietnamienne portée au XXIe siècle. J'ai visité de nombreux endroits en Asie ; c'est le seul où je me suis sentie le mieux comprise. »",
      cn: '“Imperial Spa不仅仅是一家spa——它是被带入21世纪的越南传统医学。我去过亚洲许多地方，这是唯一让我感到最被理解的地方。”',
      ar: '"Imperial Spa ليس مجرد منتجع — إنه الطب التقليدي الفيتنامي المنقول إلى القرن الحادي والعشرين. لقد زرت أماكن كثيرة في آسيا؛ وهذا المكان الوحيد الذي شعرت فيه بأنني مفهومة أكثر."',
    },
    name: 'Yuki Nakamura',
    role: {
      vi: 'Bác sĩ · Tokyo',
      en: 'Doctor · Tokyo',
      fr: 'Médecin · Tokyo',
      cn: '医生 · 东京',
      ar: 'طبيب · طوكيو',
    },
    color: GARNET,
  },
];

export function Spa14Philosophy() {
  const { currentLang } = useTranslate('spa14');
  const lang = currentLang.value as Spa14Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0A0306', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ANT_GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Five elements philosophy',
                    vi: 'Triết học ngũ hành',
                    fr: 'Philosophie des cinq éléments',
                    cn: '五行哲学',
                    ar: 'فلسفة العناصر الخمسة',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: IMP_CREAM, maxWidth: 480, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                (
                  {
                    en: 'Metal · Wood · Water · ',
                    vi: 'Kim · Mộc · Thủy · ',
                    fr: 'Métal · Bois · Eau · ',
                    cn: '金 · 木 · 水 · ',
                    ar: 'المعدن · الخشب · الماء · ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: GARNET }}>
                {
                  (
                    {
                      en: 'Fire · Earth',
                      vi: 'Hỏa · Thổ',
                      fr: 'Feu · Terre',
                      cn: '火 · 土',
                      ar: 'النار · الأرض',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(250,240,230,0.4)', maxWidth: 560, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: 'Five Elements is not abstract philosophy — it is a 3,000-year-old comprehensive health map. Each Imperial Spa therapy is designed to balance a specific element.',
                    vi: 'Ngũ Hành không phải triết học trừu tượng — đó là bản đồ sức khỏe toàn diện 3.000 năm tuổi. Mỗi liệu pháp tại Imperial Spa được thiết kế để cân bằng một hành cụ thể.',
                    fr: "Les Cinq Éléments ne sont pas une philosophie abstraite — c'est une carte de santé complète vieille de 3 000 ans. Chaque soin de l'Imperial Spa est conçu pour équilibrer un élément spécifique.",
                    cn: '五行并非抽象哲学——它是一张拥有3000年历史的全面健康图谱。Imperial Spa的每一项疗法都旨在平衡特定的一行。',
                    ar: 'العناصر الخمسة ليست فلسفة مجردة — إنها خريطة صحية شاملة عمرها 3000 عام. صُمِّم كل علاج في Imperial Spa لموازنة عنصر محدد.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2.5} sx={{ mb: 8 }}>
          {FIVE_ELEMENTS.map((el, idx) => (
            <Grid key={el.name.en} item xs={12} sm={6} md={idx < 3 ? 4 : 6}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.025)',
                  border: `1px solid ${el.color}15`,
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: el.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 50px ${el.color}12`,
                  },
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        bgcolor: `${el.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={el.icon} width={24} sx={{ color: el.color }} />
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: el.color, fontWeight: 800, lineHeight: 1.3 }}
                    >
                      {el.name[lang]}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(250,240,230,0.5)', lineHeight: 1.75, fontSize: 13 }}
                  >
                    {el.desc[lang]}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          spacing={3}
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{ mb: 7 }}
        >
          {TESTIMONIALS.map((t) => (
            <Grid key={t.name} item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${t.color}20`,
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: t.color },
                }}
              >
                <Stack spacing={2.5}>
                  <Iconify
                    icon="solar:double-alt-arrow-right-bold-duotone"
                    width={22}
                    sx={{ color: t.color, opacity: 0.5 }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(250,240,230,0.65)', lineHeight: 1.85, fontStyle: 'italic' }}
                  >
                    {t.quote[lang]}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        bgcolor: t.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: '#0A0306', fontWeight: 800, fontSize: 13 }}
                      >
                        {t.name[0]}
                      </Typography>
                    </Box>
                    <Stack spacing={0.25}>
                      <Typography variant="subtitle2" sx={{ color: IMP_CREAM, fontWeight: 800 }}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(250,240,230,0.35)' }}>
                        {t.role[lang]}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{ textAlign: 'center' }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography
              sx={{
                fontSize: 32,
                letterSpacing: 12,
                color: ANT_GOLD,
                opacity: 0.3,
                fontWeight: 300,
              }}
            >
              龍鳳
            </Typography>
            <Button
              size="large"
              startIcon={<Iconify icon="solar:crown-bold-duotone" />}
              sx={{
                bgcolor: GARNET,
                color: IMP_CREAM,
                borderRadius: 3,
                px: 5,
                py: 2,
                fontWeight: 900,
                fontSize: 16,
                '&:hover': { bgcolor: '#720F22' },
              }}
            >
              {
                (
                  {
                    en: 'Book royal ritual',
                    vi: 'Đặt nghi lễ hoàng gia',
                    fr: 'Réserver un rituel royal',
                    cn: '预订皇家仪式',
                    ar: 'احجز طقسًا ملكيًا',
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
