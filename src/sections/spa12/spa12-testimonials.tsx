import type { Spa12Lang } from 'src/sections/spa12/spa12-data';

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

const CHAMPAGNE = '#D4AF37';
const DEEP_NAVY = '#0A1628';
const PEARL = '#F9F6EE';
const ROSE_GOLD = '#B76E79';

const TESTIMONIALS = [
  {
    quote: {
      vi: '"Phòng suite vàng 24K — tôi đã ở Four Seasons Paris, Aman Tokyo, Bvlgari Rome. Đây là trải nghiệm duy nhất làm tôi quên mình đang ở Việt Nam."',
      en: '"The 24K gold suite — I\'ve stayed at Four Seasons Paris, Aman Tokyo, Bvlgari Rome. This is the only experience that made me forget I was in Vietnam."',
      fr: "\"La suite à l'or 24K — j'ai séjourné au Four Seasons Paris, à l'Aman Tokyo, au Bvlgari Rome. C'est la seule expérience qui m'a fait oublier que j'étais au Vietnam.\"",
      cn: '"24K黄金套房——我住过巴黎四季酒店、东京安缩、罗马宝格丽。这是唯一让我忘记自己身在越南的体验。"',
      ar: '"جناح الذهب عيار 24 — لقد أقمت في فور سيزونز باريس وأمان طوكيو وبولغاري روما. هذه التجربة الوحيدة التي أنستني أنني في فيتنام."',
    },
    name: 'James Harrison',
    role: {
      vi: 'CEO · Singapore',
      en: 'CEO · Singapore',
      fr: 'CEO · Singapour',
      cn: '首席执行官 · 新加坡',
      ar: 'الرئيس التنفيذي · سنغافورة',
    },
    color: CHAMPAGNE,
    stars: 5,
  },
  {
    quote: {
      vi: '"Massage vàng 24K kết hợp với liệu pháp ánh sáng LED — da tôi căng mịn như 10 năm trước. Kỹ thuật viên được đào tạo tại Pháp, chuẩn Châu Âu hoàn toàn."',
      en: '"24K gold massage combined with LED light therapy — my skin was as firm and smooth as 10 years ago. Therapist trained in France, completely European standard."',
      fr: '"Le massage à l\'or 24K associé à la luminothérapie LED — ma peau était aussi ferme et lisse qu\'il y a 10 ans. Thérapeute formée en France, standard européen absolu."',
      cn: '"24K黄金按摩结合LED光疗——我的肌肤像10年前一样紧致光滑。技师在法国受训，完全符合欧洲标准。"',
      ar: '"تدليك الذهب عيار 24 مع العلاج بضوء LED — أصبحت بشرتي مشدودة وناعمة كما كانت قبل 10 سنوات. الأخصائية مدرّبة في فرنسا وفق المعايير الأوروبية بالكامل."',
    },
    name: 'Sophie Delacroix',
    role: {
      vi: 'Fashion Designer · Paris',
      en: 'Fashion Designer · Paris',
      fr: 'Créatrice de mode · Paris',
      cn: '时装设计师 · 巴黎',
      ar: 'مصممة أزياء · باريس',
    },
    color: ROSE_GOLD,
    stars: 5,
  },
  {
    quote: {
      vi: '"Là CEO thường xuyên bay dài, tôi cần phục hồi nhanh. Chương trình Jet-Lag Recovery 3 giờ của họ xóa hết mệt mỏi của chuyến bay 14 tiếng — kỳ diệu thực sự."',
      en: '"As a CEO who frequently flies long-haul, I need rapid recovery. Their 3-hour Jet-Lag Recovery program erased all fatigue from a 14-hour flight — truly miraculous."',
      fr: "\"En tant que CEO qui prend souvent des vols long-courriers, j'ai besoin d'une récupération rapide. Leur programme Jet-Lag Recovery de 3 heures a effacé toute la fatigue d'un vol de 14 heures — vraiment miraculeux.\"",
      cn: '"作为经常长途飞行的首席执行官，我需要快速恢复。他们3小时的时差恢复计划消除了14小时航班的所有疲劳——真是神奇。"',
      ar: '"بصفتي رئيساً تنفيذياً أسافر كثيراً لمسافات طويلة، أحتاج إلى تعافٍ سريع. برنامج التعافي من السفر الذي يستغرق 3 ساعات أزال كل إرهاق رحلة مدتها 14 ساعة — معجزة حقاً."',
    },
    name: 'Kenji Yamamoto',
    role: {
      vi: 'CEO · Tokyo',
      en: 'CEO · Tokyo',
      fr: 'CEO · Tokyo',
      cn: '首席执行官 · 东京',
      ar: 'الرئيس التنفيذي · طوكيو',
    },
    color: '#7ECEF4',
    stars: 5,
  },
];

const STATS = [
  {
    val: '98%',
    label: {
      vi: 'khách hàng hài lòng hoàn toàn',
      en: 'completely satisfied guests',
      fr: 'clients entièrement satisfaits',
      cn: '顾客完全满意',
      ar: 'عملاء راضون تماماً',
    },
    color: CHAMPAGNE,
  },
  {
    val: '76%',
    label: {
      vi: 'khách hàng quay lại lần 2+',
      en: 'guests return for 2nd+ visit',
      fr: 'clients revenant pour une 2e visite ou plus',
      cn: '顾客再次光临',
      ar: 'عملاء يعودون لزيارة ثانية أو أكثر',
    },
    color: ROSE_GOLD,
  },
  {
    val: '4.9/5',
    label: {
      vi: 'trung bình rating Google',
      en: 'average Google rating',
      fr: 'note moyenne Google',
      cn: 'Google平均评分',
      ar: 'متوسط تقييم Google',
    },
    color: '#7ECEF4',
  },
  {
    val: '500+',
    label: {
      vi: 'thành viên VIP hiện tại',
      en: 'current VIP members',
      fr: 'membres VIP actuels',
      cn: '现有VIP会员',
      ar: 'أعضاء VIP حاليون',
    },
    color: '#9B59B6',
  },
];

export function Spa12Testimonials() {
  const { currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#060E1A', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'International guests',
                    vi: 'Khách hàng quốc tế',
                    fr: 'Clients internationaux',
                    cn: '国际贵宾',
                    ar: 'ضيوف دوليون',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: PEARL, maxWidth: 420, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'Standard ',
                    vi: 'Tiêu chuẩn ',
                    fr: 'Norme ',
                    cn: '标准 ',
                    ar: 'معيار ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {
                  (
                    {
                      en: 'global',
                      vi: 'toàn cầu',
                      fr: 'mondiale',
                      cn: '全球',
                      ar: 'عالمي',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {TESTIMONIALS.map((t) => (
            <Grid key={t.name} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255,255,255,0.025)',
                    border: `1px solid ${t.color}20`,
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: t.color,
                      transform: 'translateY(-5px)',
                      boxShadow: `0 20px 50px ${t.color}12`,
                    },
                  }}
                >
                  <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={0.5}>
                      {[...Array(t.stars)].map((_, i) => (
                        <Iconify
                          key={i}
                          icon="solar:star-bold-duotone"
                          width={14}
                          sx={{ color: CHAMPAGNE }}
                        />
                      ))}
                    </Stack>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(249,246,238,0.65)',
                        lineHeight: 1.85,
                        fontStyle: 'italic',
                        flexGrow: 1,
                        fontSize: 14,
                      }}
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
                          sx={{ color: DEEP_NAVY, fontWeight: 800, fontSize: 14 }}
                        >
                          {t.name[0]}
                        </Typography>
                      </Box>
                      <Stack spacing={0.25}>
                        <Typography variant="subtitle2" sx={{ color: PEARL, fontWeight: 800 }}>
                          {t.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: t.color, fontSize: 12, fontWeight: 600 }}
                        >
                          {t.role[lang]}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
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
          {STATS.map((s) => (
            <Grid key={s.label.en} item xs={6} md={3}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: `${s.color}06`,
                  border: `1px solid ${s.color}15`,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 32, md: 38 },
                    fontWeight: 900,
                    color: PEARL,
                    lineHeight: 1,
                  }}
                >
                  {s.val}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(249,246,238,0.4)', fontSize: 12 }}>
                  {s.label[lang]}
                </Typography>
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
            startIcon={<Iconify icon="solar:crown-bold-duotone" />}
            sx={{
              bgcolor: CHAMPAGNE,
              color: DEEP_NAVY,
              borderRadius: 3,
              px: 5,
              py: 2,
              fontWeight: 900,
              fontSize: 16,
              '&:hover': { bgcolor: '#C0A030' },
            }}
          >
            {
              (
                {
                  en: 'Become VIP member',
                  vi: 'Trở thành thành viên VIP',
                  fr: 'Devenir membre VIP',
                  cn: '成为VIP会员',
                  ar: 'انضم كعضو VIP',
                } as const
              )[lang]
            }
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
