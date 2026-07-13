import type { Spa9Lang } from 'src/sections/spa9/spa9-data';

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

const OCEAN = '#1B6CA8';
const SAGE = '#6B8E23';
const AMBER = '#F5A623';
const CREAM = '#FFFDF8';

const PRACTICES = [
  {
    title: {
      vi: 'Thiền Vipassana',
      en: 'Vipassana Meditation',
      fr: 'Méditation Vipassana',
      cn: '内观冥想',
      ar: 'تأمل فيباسانا',
    },
    duration: '45 min',
    level: {
      vi: 'Mọi cấp độ',
      en: 'All levels',
      fr: 'Tous niveaux',
      cn: '所有级别',
      ar: 'جميع المستويات',
    },
    desc: {
      vi: 'Quan sát hơi thở và cảm giác thân thể mà không phán xét. Kỹ thuật Phật giáo 2.500 năm tuổi, được khoa học thần kinh hiện đại kiểm chứng.',
      en: 'Observe breath and body sensations without judgment. A 2,500-year-old Buddhist technique validated by modern neuroscience.',
      fr: 'Observez la respiration et les sensations corporelles sans jugement. Une technique bouddhiste vieille de 2 500 ans, validée par les neurosciences modernes.',
      cn: '不加评判地观察呼吸与身体感受。这是一项拥有 2,500 年历史的佛教技法，已获现代神经科学验证。',
      ar: 'راقب التنفس وأحاسيس الجسد دون إصدار أحكام. تقنية بوذية عمرها 2,500 عام أكدتها علوم الأعصاب الحديثة.',
    },
    icon: 'solar:meditation-bold-duotone',
    color: OCEAN,
    schedule: {
      vi: '6:00 & 17:00 hàng ngày',
      en: '6:00 & 17:00 daily',
      fr: '6:00 & 17:00 tous les jours',
      cn: '每日 6:00 与 17:00',
      ar: '6:00 و 17:00 يوميًا',
    },
  },
  {
    title: {
      vi: 'Yoga Nidra',
      en: 'Yoga Nidra',
      fr: 'Yoga Nidra',
      cn: 'Yoga Nidra',
      ar: 'Yoga Nidra',
    },
    duration: '60 min',
    level: {
      vi: 'Người mới',
      en: 'Beginners welcome',
      fr: 'Débutants bienvenus',
      cn: '欢迎初学者',
      ar: 'مرحبًا بالمبتدئين',
    },
    desc: {
      vi: '"Giấc ngủ yogic" — nằm yên hoàn toàn trong khi ý thức vẫn tỉnh thức. 1 giờ yoga nidra = 4 giờ ngủ sâu về mức phục hồi sinh lý.',
      en: '"Yogic sleep" — lying completely still while consciousness remains awake. 1 hour yoga nidra = 4 hours deep sleep in physiological restoration.',
      fr: '« Sommeil yogique » — rester totalement immobile tandis que la conscience demeure éveillée. 1 heure de yoga nidra = 4 heures de sommeil profond en récupération physiologique.',
      cn: '“瑜伽睡眠”——身体完全静止，意识却保持清醒。一小时瑜伽睡眠 = 四小时生理修复的深度睡眠。',
      ar: '«النوم اليوغي» — الاستلقاء بسكون تام بينما يبقى الوعي يقظًا. ساعة واحدة من يوغا نيدرا = 4 ساعات من النوم العميق في الاستعادة الفسيولوجية.',
    },
    icon: 'solar:moon-bold-duotone',
    color: AMBER,
    schedule: {
      vi: '19:30 Thứ 3, 5, 7',
      en: '19:30 Tue, Thu, Sat',
      fr: '19:30 mar, jeu, sam',
      cn: '周二、四、六 19:30',
      ar: '19:30 الثلاثاء والخميس والسبت',
    },
  },
  {
    title: {
      vi: 'Sound Bath',
      en: 'Sound Bath',
      fr: 'Sound Bath',
      cn: 'Sound Bath',
      ar: 'Sound Bath',
    },
    duration: '75 min',
    level: {
      vi: 'Mọi cấp độ',
      en: 'All levels',
      fr: 'Tous niveaux',
      cn: '所有级别',
      ar: 'جميع المستويات',
    },
    desc: {
      vi: 'Âm thanh chuông Tây Tạng 432Hz và đàn crystal bowl kích hoạt sóng gamma trong não — giải phóng trauma và sâu thẳm ký ức bị tắc nghẽn.',
      en: 'Tibetan singing bowls at 432Hz and crystal bowls activate gamma waves in the brain — releasing trauma and deeply blocked memories.',
      fr: 'Les bols chantants tibétains à 432 Hz et les bols de cristal activent les ondes gamma du cerveau — libérant les traumatismes et les souvenirs profondément bloqués.',
      cn: '432Hz 的西藏唱钵与水晶钵激发大脑的伽马波——释放创伤与被深深压抑的记忆。',
      ar: 'أوعية الغناء التبتية بتردد 432 هرتز وأوعية الكريستال تنشّط موجات غاما في الدماغ — مطلقةً الصدمات والذكريات المحجوبة بعمق.',
    },
    icon: 'solar:music-note-bold-duotone',
    color: '#9B59B6',
    schedule: {
      vi: 'Thứ 6 & Chủ nhật 20:00',
      en: 'Fri & Sun 20:00',
      fr: 'ven & dim 20:00',
      cn: '周五与周日 20:00',
      ar: 'الجمعة والأحد 20:00',
    },
  },
  {
    title: {
      vi: 'Forest Bathing',
      en: 'Forest Bathing',
      fr: 'Forest Bathing',
      cn: 'Forest Bathing',
      ar: 'Forest Bathing',
    },
    duration: '90 min',
    level: {
      vi: 'Mọi người',
      en: 'Everyone',
      fr: 'Pour tous',
      cn: '人人适宜',
      ar: 'للجميع',
    },
    desc: {
      vi: 'Shinrin-yoku — đi chậm trong rừng, dùng tất cả 5 giác quan. Không smartphone, không mục tiêu. Chỉ hiện diện. Giảm cortisol 12% trung bình.',
      en: 'Shinrin-yoku — walk slowly in the forest using all 5 senses. No smartphones, no goals. Just presence. Reduces cortisol by 12% on average.',
      fr: 'Shinrin-yoku — marchez lentement dans la forêt en utilisant vos 5 sens. Pas de smartphone, pas d’objectif. Juste la présence. Réduit le cortisol de 12 % en moyenne.',
      cn: 'Shinrin-yoku——调动五感在森林中缓步。不用手机，没有目标，只是当下的专注。平均降低皮质醇 12%。',
      ar: 'Shinrin-yoku — امشِ ببطء في الغابة مستخدمًا حواسك الخمس. لا هواتف ولا أهداف. فقط الحضور. يخفّض الكورتيزول بنسبة 12% في المتوسط.',
    },
    icon: 'solar:leaf-bold-duotone',
    color: SAGE,
    schedule: {
      vi: '7:00 cuối tuần',
      en: '7:00 weekends',
      fr: '7:00 le week-end',
      cn: '周末 7:00',
      ar: '7:00 في عطلة نهاية الأسبوع',
    },
  },
];

const TESTIMONIALS = [
  {
    quote: {
      vi: '"Yoga Nidra đầu tiên — tôi chưa bao giờ trải qua trạng thái thư giãn sâu như vậy trong suốt 40 năm cuộc đời. Đầu óc tôi hoàn toàn trống rỗng và bình an."',
      en: '"My first Yoga Nidra — I\'ve never experienced such deep relaxation in 40 years of life. My mind was completely empty and at peace."',
      fr: "« Mon premier Yoga Nidra — je n'avais jamais connu une relaxation aussi profonde en 40 ans de vie. Mon esprit était totalement vide et en paix. »",
      cn: '“第一次体验瑜伽睡眠——40 年来我从未感受过如此深度的放松。我的头脑完全空灵而平静。”',
      ar: '«أول تجربة لي مع يوغا نيدرا — لم أشعر قط بهذا الاسترخاء العميق طوال 40 عامًا من حياتي. كان عقلي خاليًا تمامًا وفي سلام.»',
    },
    name: 'Phạm Văn An',
    role: {
      vi: 'Kỹ sư · 40 tuổi',
      en: 'Engineer · 40 years old',
      fr: 'Ingénieur · 40 ans',
      cn: '工程师 · 40 岁',
      ar: 'مهندس · 40 عامًا',
    },
    color: AMBER,
  },
  {
    quote: {
      vi: '"Sound bath đã giải thoát tôi khỏi chứng mất ngủ 3 năm trong 1 buổi duy nhất. Các tần số âm thanh làm điều gì đó sâu xa trong não tôi."',
      en: '"Sound bath freed me from 3 years of insomnia in a single session. The sound frequencies did something profound in my brain."',
      fr: "« Le sound bath m'a libérée de 3 ans d'insomnie en une seule séance. Les fréquences sonores ont opéré quelque chose de profond dans mon cerveau. »",
      cn: '“一次声音浴就让我摆脱了三年的失眠。那些声波在我的大脑中产生了某种深远的作用。”',
      ar: '«حرّرني حمام الصوت من ثلاث سنوات من الأرق في جلسة واحدة. أحدثت الترددات الصوتية شيئًا عميقًا في دماغي.»',
    },
    name: 'Nguyễn Bảo Ngọc',
    role: {
      vi: 'Giáo viên · 36 tuổi',
      en: 'Teacher · 36 years old',
      fr: 'Enseignante · 36 ans',
      cn: '教师 · 36 岁',
      ar: 'معلمة · 36 عامًا',
    },
    color: '#9B59B6',
  },
];

export function Spa9Mindfulness() {
  const { currentLang } = useTranslate('spa9');
  const lang = currentLang.value as Spa9Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#060E16', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: AMBER, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Mindfulness programs',
                    vi: 'Chương trình chánh niệm',
                    fr: 'Programmes de pleine conscience',
                    cn: '正念课程',
                    ar: 'برامج اليقظة الذهنية',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: CREAM, maxWidth: 440, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'The silence ',
                    vi: 'Tĩnh lặng ',
                    fr: 'Le silence ',
                    cn: '宁静',
                    ar: 'الصمت ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: SAGE }}>
                {
                  (
                    {
                      en: 'is the foundation',
                      vi: 'là nền tảng',
                      fr: 'est le fondement',
                      cn: '是根基',
                      ar: 'هو الأساس',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255,253,248,0.4)', maxWidth: 500, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: 'Real health begins when you learn to be with yourself. Our mindfulness programs not only relax — they rewire the brain.',
                    vi: 'Sức khỏe thực sự bắt đầu khi bạn học cách ở cùng chính mình. Các chương trình chánh niệm của chúng tôi không chỉ thư giãn — chúng thay đổi não bộ.',
                    fr: 'La véritable santé commence lorsque vous apprenez à être avec vous-même. Nos programmes de pleine conscience ne font pas que détendre — ils reconfigurent le cerveau.',
                    cn: '真正的健康始于学会与自己独处。我们的正念课程不仅能放松，更能重塑大脑。',
                    ar: 'تبدأ الصحة الحقيقية عندما تتعلم أن تكون مع نفسك. برامج اليقظة الذهنية لدينا لا ترخي فحسب — بل تعيد تشكيل الدماغ.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2.5} sx={{ mb: 7 }}>
          {PRACTICES.map((p) => (
            <Grid key={p.title.en} item xs={12} sm={6}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.025)',
                  border: `1px solid rgba(255,255,255,0.04)`,
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: p.color,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 24px 60px ${p.color}15`,
                  },
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        bgcolor: `${p.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={p.icon} width={24} sx={{ color: p.color }} />
                    </Box>
                    <Stack spacing={0.25} alignItems="flex-end">
                      <Typography
                        variant="caption"
                        sx={{ color: p.color, fontWeight: 700, fontSize: 12 }}
                      >
                        {p.duration}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(255,253,248,0.3)', fontSize: 11 }}
                      >
                        {p.level[lang]}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={1}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: CREAM, fontWeight: 800, lineHeight: 1.2 }}
                    >
                      {p.title[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,253,248,0.5)', lineHeight: 1.75, fontSize: 13 }}
                    >
                      {p.desc[lang]}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ pt: 0.5, borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <Iconify
                      icon="solar:calendar-bold-duotone"
                      width={14}
                      sx={{ color: p.color, opacity: 0.7 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: p.color, fontWeight: 600, fontSize: 12 }}
                    >
                      {p.schedule[lang]}
                    </Typography>
                  </Stack>
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
          sx={{ mb: 6 }}
        >
          {TESTIMONIALS.map((t) => (
            <Grid key={t.name} item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.03)',
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
                    sx={{ color: 'rgba(255,253,248,0.65)', lineHeight: 1.85, fontStyle: 'italic' }}
                  >
                    {t.quote[lang]}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: t.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#040C16', fontWeight: 800 }}>
                        {t.name[0]}
                      </Typography>
                    </Box>
                    <Stack spacing={0.25}>
                      <Typography variant="subtitle2" sx={{ color: CREAM, fontWeight: 700 }}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,253,248,0.35)' }}>
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
          <Button
            size="large"
            startIcon={<Iconify icon="solar:leaf-bold-duotone" />}
            sx={{
              bgcolor: SAGE,
              color: 'white',
              borderRadius: 3,
              px: 5,
              py: 2,
              fontWeight: 800,
              fontSize: 16,
              '&:hover': { bgcolor: '#5A7A1E' },
            }}
          >
            {
              (
                {
                  en: 'Register free trial class',
                  vi: 'Đăng ký lớp học miễn phí',
                  fr: 'Inscrivez-vous à un cours d’essai gratuit',
                  cn: '报名免费体验课',
                  ar: 'سجّل في حصة تجريبية مجانية',
                } as const
              )[lang]
            }
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
