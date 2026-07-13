import type { Spa10Lang } from 'src/sections/spa10/spa10-data';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { ICE, TEAL } from 'src/sections/spa10/spa10-data';

// ----------------------------------------------------------------------

type StatItem = {
  value: string;
  unit: string;
  label: Record<Spa10Lang, string>;
  desc: Record<Spa10Lang, string>;
  icon: string;
  color: string;
};

const STATS: StatItem[] = [
  {
    value: '42',
    unit: '%',
    label: {
      vi: 'Giảm Cortisol',
      en: 'Cortisol Reduction',
      fr: 'Réduction du cortisol',
      cn: '皮质醇降低',
      ar: 'خفض الكورتيزول',
    },
    desc: {
      vi: 'Hormone stress giảm trung bình 42% sau 1 buổi sauna + cold plunge theo nghiên cứu đại học Helsinki.',
      en: 'Stress hormone reduced by average 42% after 1 sauna + cold plunge session per University of Helsinki research.',
      fr: "L'hormone du stress réduite de 42 % en moyenne après une séance de sauna + bain froid, selon une recherche de l'Université d'Helsinki.",
      cn: '根据赫尔辛基大学研究，进行一次桑拿 + 冷水浴后，压力荷尔蒙平均降低 42%。',
      ar: 'ينخفض هرمون التوتر بمعدل 42% بعد جلسة واحدة من الساونا + الغطس البارد وفقًا لأبحاث جامعة هلسنكي.',
    },
    icon: 'solar:brain-bold-duotone',
    color: '#7C3AED',
  },
  {
    value: '300',
    unit: '%',
    label: {
      vi: 'Tăng NK Cells',
      en: 'NK Cells Increase',
      fr: 'Augmentation des cellules NK',
      cn: 'NK 细胞增加',
      ar: 'زيادة خلايا NK',
    },
    desc: {
      vi: 'Tế bào diệt tự nhiên (NK cells) — hàng phòng thủ chống ung thư — tăng 300% sau 3 buổi tắm rừng liên tiếp.',
      en: "Natural killer cells — the body's cancer-fighting defense — increase 300% after 3 consecutive forest bathing sessions.",
      fr: 'Les cellules tueuses naturelles — la défense anticancéreuse du corps — augmentent de 300 % après 3 séances consécutives de bain de forêt.',
      cn: '自然杀伤细胞——人体的抗癌防线——在连续 3 次森林浴后增加 300%。',
      ar: 'تزداد الخلايا القاتلة الطبيعية — خط دفاع الجسم ضد السرطان — بنسبة 300% بعد 3 جلسات متتالية من حمام الغابة.',
    },
    icon: 'solar:shield-check-bold-duotone',
    color: TEAL,
  },
  {
    value: '80',
    unit: '°C',
    label: {
      vi: 'Nhiệt độ Sauna',
      en: 'Sauna Temperature',
      fr: 'Température du sauna',
      cn: '桑拿温度',
      ar: 'درجة حرارة الساونا',
    },
    desc: {
      vi: 'Nhiệt độ tiêu chuẩn sauna Phần Lan. Kích thích sản sinh heat shock proteins — sửa chữa tế bào hư tổn và bảo vệ tim mạch.',
      en: 'Standard Finnish sauna temperature. Stimulates heat shock protein production — repairs damaged cells and protects cardiovascular health.',
      fr: 'Température standard du sauna finlandais. Stimule la production de protéines de choc thermique — répare les cellules endommagées et protège la santé cardiovasculaire.',
      cn: '芬兰桑拿的标准温度。刺激热休克蛋白的生成——修复受损细胞并保护心血管健康。',
      ar: 'درجة حرارة الساونا الفنلندية القياسية. تحفّز إنتاج بروتينات الصدمة الحرارية — تُصلح الخلايا التالفة وتحمي صحة القلب والأوعية الدموية.',
    },
    icon: 'solar:fire-bold-duotone',
    color: '#E85D04',
  },
  {
    value: '4',
    unit: '°C',
    label: {
      vi: 'Cold Plunge',
      en: 'Cold Plunge',
      fr: 'Bain froid',
      cn: '冷水浴',
      ar: 'الغطس البارد',
    },
    desc: {
      vi: 'Ngâm 2 phút ở 4°C giải phóng norepinephrine gấp 3 lần baseline — giúp tập trung tốt hơn, tăng cường khí sắc và kháng viêm.',
      en: '2 minutes at 4°C releases norepinephrine 3× baseline — improves focus, elevates mood and reduces inflammation.',
      fr: "2 minutes à 4°C libèrent de la noradrénaline 3× la valeur de base — améliore la concentration, élève l'humeur et réduit l'inflammation.",
      cn: '在 4°C 下 2 分钟可释放出基线 3 倍的去甲肾上腺素——提升专注力、改善情绪并减少炎症。',
      ar: 'دقيقتان عند 4°C تطلقان النورإبينفرين بثلاثة أضعاف المستوى الأساسي — يحسّن التركيز ويرفع المزاج ويقلل الالتهاب.',
    },
    icon: 'solar:snowflake-bold-duotone',
    color: '#0096C7',
  },
  {
    value: '127',
    unit: '+',
    label: {
      vi: 'Phytoncide/m³',
      en: 'Phytoncides/m³',
      fr: 'Phytoncides/m³',
      cn: '植物杀菌素/m³',
      ar: 'فيتونسيد/م³',
    },
    desc: {
      vi: 'Rừng thông phát ra 127+ hợp chất phytoncide kháng khuẩn tự nhiên mỗi m³ không khí. Hít thở rừng = liệu pháp kháng sinh tự nhiên.',
      en: 'Pine forest releases 127+ natural antibacterial phytoncide compounds per m³ of air. Breathing forest = natural antibiotic therapy.',
      fr: "La forêt de pins libère plus de 127 composés phytoncides antibactériens naturels par m³ d'air. Respirer la forêt = thérapie antibiotique naturelle.",
      cn: '松林每立方米空气释放 127 种以上天然抗菌植物杀菌素化合物。呼吸森林 = 天然抗生素疗法。',
      ar: 'تطلق غابة الصنوبر أكثر من 127 مركبًا فيتونسيديًا مضادًا للبكتيريا طبيعيًا لكل م³ من الهواء. تنفّس الغابة = علاج مضاد حيوي طبيعي.',
    },
    icon: 'solar:leaf-bold-duotone',
    color: '#2D6A4F',
  },
  {
    value: '30',
    unit: 'min',
    label: {
      vi: 'Thời gian hiệu quả',
      en: 'Effective duration',
      fr: 'Durée efficace',
      cn: '有效时长',
      ar: 'المدة الفعّالة',
    },
    desc: {
      vi: '30 phút tắm rừng chánh niệm đủ để hạ huyết áp tâm thu 6 mmHg và nhịp tim giảm 4 bpm theo Journal of Environmental Psychology.',
      en: '30 minutes of mindful forest bathing is sufficient to lower systolic blood pressure by 6 mmHg and heart rate by 4 bpm per Journal of Environmental Psychology.',
      fr: '30 minutes de bain de forêt en pleine conscience suffisent à abaisser la pression artérielle systolique de 6 mmHg et le rythme cardiaque de 4 bpm, selon le Journal of Environmental Psychology.',
      cn: '根据《环境心理学杂志》，30 分钟的正念森林浴足以使收缩压降低 6 mmHg、心率降低 4 bpm。',
      ar: '30 دقيقة من حمام الغابة الواعي تكفي لخفض ضغط الدم الانقباضي بمقدار 6 ملم زئبق ومعدل ضربات القلب بمقدار 4 نبضة/دقيقة وفقًا لمجلة علم النفس البيئي.',
    },
    icon: 'solar:clock-circle-bold-duotone',
    color: '#C8A951',
  },
];

const WHY_POINTS = [
  {
    title: {
      vi: 'Hormesis — Stress tích cực',
      en: 'Hormesis — Positive stress',
      fr: 'Hormèse — Stress positif',
      cn: '毒物兴奋效应——积极压力',
      ar: 'الهرمسة — توتر إيجابي',
    },
    body: {
      vi: 'Khoa học sinh học gọi là "hormesis": liều nhỏ stress (nóng/lạnh) kích hoạt cơ chế phục hồi và tăng cường. Cơ thể trở nên mạnh hơn sau mỗi lần trải nghiệm.',
      en: 'Biology calls it "hormesis": small doses of stress (hot/cold) activate recovery and strengthening mechanisms. The body becomes stronger after each experience.',
      fr: "La biologie l'appelle « hormèse » : de petites doses de stress (chaud/froid) activent les mécanismes de récupération et de renforcement. Le corps devient plus fort après chaque expérience.",
      cn: '生物学称之为“毒物兴奋效应”：小剂量的压力（冷/热）会激活恢复与强化机制。身体在每次体验后都会变得更强。',
      ar: 'يسميها علم الأحياء "الهرمسة": جرعات صغيرة من التوتر (حار/بارد) تنشّط آليات التعافي والتقوية. يصبح الجسم أقوى بعد كل تجربة.',
    },
    icon: 'solar:bolt-bold-duotone',
    color: '#F59E0B',
  },
  {
    title: {
      vi: 'Neuroplasticity',
      en: 'Neuroplasticity',
      fr: 'Neuroplasticité',
      cn: '神经可塑性',
      ar: 'المرونة العصبية',
    },
    body: {
      vi: 'Sự chuyển đổi giữa nhiệt độ nóng-lạnh tạo ra norepinephrine — neurotransmitter tối ưu hóa sự tập trung và khả năng học tập. Đây là lý do vận động viên Olympic dùng cold plunge sau tập.',
      en: 'The hot-cold temperature shift creates norepinephrine — the neurotransmitter optimizing focus and learning ability. This is why Olympic athletes use cold plunge after training.',
      fr: "L'alternance chaud-froid crée de la noradrénaline — le neurotransmetteur qui optimise la concentration et la capacité d'apprentissage. C'est pourquoi les athlètes olympiques utilisent le bain froid après l'entraînement.",
      cn: '冷热温度的转换会产生去甲肾上腺素——一种优化专注力和学习能力的神经递质。这就是奥运选手在训练后使用冷水浴的原因。',
      ar: 'يخلق التحوّل الحراري بين الحار والبارد النورإبينفرين — الناقل العصبي الذي يحسّن التركيز والقدرة على التعلّم. لهذا يستخدم الرياضيون الأولمبيون الغطس البارد بعد التدريب.',
    },
    icon: 'solar:brain-bold-duotone',
    color: '#8B5CF6',
  },
  {
    title: {
      vi: 'Parasympathetic Activation',
      en: 'Parasympathetic Activation',
      fr: 'Activation parasympathique',
      cn: '副交感神经激活',
      ar: 'تنشيط الجهاز نظير الودي',
    },
    body: {
      vi: 'Sau đỉnh stress của cold plunge, hệ phó giao cảm kích hoạt mạnh — trạng thái "rest and digest" sâu nhất mà cơ thể có thể đạt được. Sâu hơn cả thiền định thông thường.',
      en: 'After the cold plunge stress peak, the parasympathetic system activates strongly — the deepest "rest and digest" state the body can achieve. Deeper than ordinary meditation.',
      fr: "Après le pic de stress du bain froid, le système parasympathique s'active fortement — l'état de « repos et digestion » le plus profond que le corps puisse atteindre. Plus profond que la méditation ordinaire.",
      cn: '在冷水浴的压力高峰之后，副交感神经系统强烈激活——这是身体所能达到的最深“休息与消化”状态。比普通冥想更深。',
      ar: 'بعد ذروة توتر الغطس البارد، يُنشّط الجهاز نظير الودي بقوة — أعمق حالة "راحة وهضم" يمكن للجسم بلوغها. أعمق من التأمل العادي.',
    },
    icon: 'solar:heart-pulse-bold-duotone',
    color: TEAL,
  },
];

function AnimatedNumber({ value, unit }: { value: string; unit: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <Box
      ref={ref}
      component={m.div}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={0.5}>
        <Typography
          sx={{
            fontSize: { xs: 52, md: 68 },
            fontWeight: 900,
            color: ICE,
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          {value}
        </Typography>
        <Typography sx={{ fontSize: { xs: 22, md: 30 }, fontWeight: 700, color: TEAL, mt: 1 }}>
          {unit}
        </Typography>
      </Stack>
    </Box>
  );
}

export function Spa10Science() {
  const { currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#060E18', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TEAL, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'The Science of Nordic',
                    vi: 'Khoa học đằng sau Nordic',
                    fr: 'La science du Nordic',
                    cn: 'Nordic 背后的科学',
                    ar: 'علم الشمال',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: ICE, maxWidth: 520, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                (
                  {
                    en: 'Why hot–cold–forest ',
                    vi: 'Vì sao nóng–lạnh–rừng ',
                    fr: 'Pourquoi le chaud–froid–forêt ',
                    cn: '为何热–冷–森林 ',
                    ar: 'لماذا الحار–البارد–الغابة ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: TEAL }}>
                {
                  (
                    {
                      en: 'truly heals',
                      vi: 'thực sự chữa lành',
                      fr: 'guérit vraiment',
                      cn: '真正能疗愈',
                      ar: 'يشفي حقًا',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(234,249,246,0.45)', maxWidth: 560, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: 'Not a trend — this is 200 years of science. Finns have an average lifespan of 81 years — sauna bathing 2-3 times per week from childhood.',
                    vi: 'Không phải xu hướng, đây là khoa học 200 năm. Người Phần Lan có tuổi thọ trung bình 81 tuổi — tắm sauna 2-3 lần/tuần từ thời thơ ấu.',
                    fr: "Pas une tendance — c'est 200 ans de science. Les Finlandais ont une espérance de vie moyenne de 81 ans — sauna 2 à 3 fois par semaine dès l'enfance.",
                    cn: '这不是潮流，而是 200 年的科学。芬兰人的平均寿命为 81 岁——从童年起每周桑拿 2-3 次。',
                    ar: 'ليست موضة — إنها 200 عام من العلم. يبلغ متوسط عمر الفنلنديين 81 عامًا — يستحمون بالساونا 2-3 مرات أسبوعيًا منذ الطفولة.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        {/* Stats grid */}
        <Grid container spacing={2.5} sx={{ mb: { xs: 8, md: 12 } }}>
          {STATS.map((stat, idx) => (
            <Grid key={stat.unit + stat.value + idx} item xs={12} sm={6} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  height: '100%',
                  bgcolor: '#0B1A28',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: stat.color,
                    transform: 'translateY(-6px)',
                    boxShadow: `0 24px 60px ${stat.color}18`,
                  },
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <AnimatedNumber value={stat.value} unit={stat.unit} />
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        bgcolor: `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={stat.icon} width={24} sx={{ color: stat.color }} />
                    </Box>
                  </Stack>
                  <Stack spacing={0.75}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: stat.color, fontWeight: 800, fontSize: 13 }}
                    >
                      {stat.label[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(234,249,246,0.45)', lineHeight: 1.7, fontSize: 13 }}
                    >
                      {stat.desc[lang]}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Why it works — 3 columns */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 5,
            background: `linear-gradient(135deg, rgba(0,201,167,0.06) 0%, rgba(11,29,53,0.8) 100%)`,
            border: '1px solid rgba(0,201,167,0.12)',
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: TEAL,
              letterSpacing: 4,
              fontWeight: 700,
              fontSize: 11,
              display: 'block',
              mb: 4,
              textAlign: 'center',
            }}
          >
            {
              (
                {
                  en: 'The Biology',
                  vi: 'Cơ chế sinh học',
                  fr: 'La biologie',
                  cn: '生物机制',
                  ar: 'علم الأحياء',
                } as const
              )[lang]
            }
          </Typography>
          <Grid container spacing={4}>
            {WHY_POINTS.map((pt) => (
              <Grid key={pt.title.en} item xs={12} md={4}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2.5,
                        bgcolor: `${pt.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={pt.icon} width={22} sx={{ color: pt.color }} />
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: ICE, fontWeight: 800, lineHeight: 1.3 }}
                    >
                      {pt.title[lang]}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(234,249,246,0.5)', lineHeight: 1.75 }}
                  >
                    {pt.body[lang]}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
