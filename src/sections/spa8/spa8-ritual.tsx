import type { Spa8Lang } from 'src/sections/spa8/spa8-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const SAKURA = '#FFB7C5';
const CREAM = '#FDFAF5';
const BAMBOO = '#4A7C59';
const DARK = '#0A1520';

const STEPS = [
  {
    num: '01',
    kanji: '入浴',
    name: {
      vi: 'Nyūyoku — Nghi lễ nhập bồn',
      en: 'Nyūyoku — The Entry Bath',
      fr: 'Nyūyoku — Le Bain d’Entrée',
      cn: '入浴 — 入池仪式',
      ar: 'نيويوكو — حمّام الدخول',
    },
    desc: {
      vi: 'Ngâm mình trong nước ấm 40°C có thảo mộc thiền trúc và hoa anh đào. Cơ thể bắt đầu buông xả và chuẩn bị tiếp nhận liệu trình.',
      en: 'Immerse in 40°C herbal water infused with bamboo and cherry blossom. The body begins to release and prepare to receive.',
      fr: 'Immergez-vous dans une eau aux herbes à 40°C infusée de bambou et de fleur de cerisier. Le corps commence à se relâcher et à se préparer à recevoir.',
      cn: '浸泡在注入竹与樱花的 40°C 草本温水中。身体开始释放并准备接受疗程。',
      ar: 'انغمس في ماء عشبي بدرجة 40°م مُشبَع بالخيزران وزهر الكرز. يبدأ الجسم بالاسترخاء والاستعداد للتلقي.',
    },
    duration: '15 min',
    icon: 'solar:water-bold-duotone',
    color: '#7ECEF4',
  },
  {
    num: '02',
    kanji: '洗浄',
    name: {
      vi: 'Senjō — Thanh tẩy',
      en: 'Senjō — The Cleansing',
      fr: 'Senjō — La Purification',
      cn: '洗净 — 洁净仪式',
      ar: 'سينجو — التطهير',
    },
    desc: {
      vi: 'Tẩy da chết với muối biển Nhật Bản, tảo nori và nước dừa. Loại bỏ lớp da chết, lộ ra làn da tươi mới phía dưới.',
      en: 'Full body exfoliation with Japanese sea salt, nori seaweed and coconut water. Remove dead skin to reveal fresh skin beneath.',
      fr: 'Exfoliation du corps entier au sel marin japonais, à l’algue nori et à l’eau de coco. Élimine les peaux mortes pour révéler une peau fraîche.',
      cn: '以日本海盐、海苔与椰子水全身去角质。去除老化角质，释放底层新生肌肤。',
      ar: 'تقشير كامل للجسم بملح البحر الياباني وأعشاب النوري وماء جوز الهند. إزالة الجلد الميت للكشف عن بشرة نضرة.',
    },
    duration: '20 min',
    icon: 'solar:soap-bold-duotone',
    color: SAKURA,
  },
  {
    num: '03',
    kanji: '湯治',
    name: {
      vi: 'Tōji — Onsen trị liệu',
      en: 'Tōji — Onsen therapy',
      fr: 'Tōji — Thérapie Onsen',
      cn: '湯治 — 温泉疗法',
      ar: 'توجي — علاج الأونسن',
    },
    desc: {
      vi: 'Ngâm trong suối khoáng thiên nhiên có khoáng chất sulfur, natri và canxi. Các khoáng chất thẩm thấu vào da, nuôi dưỡng từ bên trong.',
      en: 'Soak in natural mineral spring water with sulfur, sodium and calcium minerals. Minerals penetrate skin, nourishing from within.',
      fr: 'Immersion dans une source minérale naturelle riche en soufre, sodium et calcium. Les minéraux pénètrent la peau et la nourrissent de l’intérieur.',
      cn: '浸泡在含硫、钠与钙矿物质的天然矿泉中。矿物质渗入肌肤，由内而外滋养。',
      ar: 'انغمس في مياه الينابيع المعدنية الطبيعية الغنية بالكبريت والصوديوم والكالسيوم. تتغلغل المعادن في البشرة وتغذّيها من الداخل.',
    },
    duration: '25 min',
    icon: 'solar:fire-bold-duotone',
    color: '#F4A460',
  },
  {
    num: '04',
    kanji: '按摩',
    name: {
      vi: 'Anma — Massage truyền thống',
      en: 'Anma — Traditional massage',
      fr: 'Anma — Massage traditionnel',
      cn: '按摩 — 传统按摩',
      ar: 'أمّا — التدليك التقليدي',
    },
    desc: {
      vi: 'Kỹ thuật massage 2.500 năm tuổi dựa trên kinh lạc (meridians). Áp lực ngón tay giải phóng tắc nghẽn khí và phục hồi dòng chảy năng lượng.',
      en: '2,500-year-old massage technique based on meridians. Finger pressure releases qi blockages and restores energy flow.',
      fr: 'Technique de massage vieille de 2 500 ans basée sur les méridiens. La pression des doigts libère les blocages du qi et rétablit la circulation de l’énergie.',
      cn: '基于经络的 2500 年古老按摩技法。指压释放气的阻塞，恢复能量流动。',
      ar: 'تقنية تدليك عمرها 2500 عام تعتمد على خطوط الطاقة (المريديانات). يحرّر ضغط الأصابع انسدادات الطاقة ويعيد تدفقها.',
    },
    duration: '40 min',
    icon: 'solar:hand-heart-bold-duotone',
    color: BAMBOO,
  },
  {
    num: '05',
    kanji: '瞑想',
    name: {
      vi: 'Meisō — Thiền định',
      en: 'Meisō — Meditation',
      fr: 'Meisō — Méditation',
      cn: '冥想 — 静心冥想',
      ar: 'ميسو — التأمّل',
    },
    desc: {
      vi: 'Thiền trong phòng tối với tiếng nước chảy và nhang trầm hương. Tích hợp những gì cơ thể và tâm trí vừa trải qua.',
      en: 'Meditation in a darkened room with flowing water sounds and incense. Integrate what body and mind have just experienced.',
      fr: 'Méditation dans une pièce sombre, avec le bruit de l’eau qui coule et l’encens. Intégrez ce que le corps et l’esprit viennent de vivre.',
      cn: '在昂暗的房间里，伴随流水声与香薕冥想。融合身心刚刚经历的一切。',
      ar: 'تأمّل في غرفة معتمة مع أصوات المياه المتدفقة والبخور. دمج ما اختبره الجسد والعقل للتو.',
    },
    duration: '15 min',
    icon: 'solar:brain-bold-duotone',
    color: '#9B59B6',
  },
  {
    num: '06',
    kanji: '茶',
    name: {
      vi: 'Cha — Trà đạo kết thúc',
      en: 'Cha — Tea ceremony close',
      fr: 'Cha — Clôture par la cérémonie du thé',
      cn: '茶 — 茶道收尾',
      ar: 'شا — ختام بمراسم الشاي',
    },
    desc: {
      vi: 'Kết thúc với buổi trà đạo matcha truyền thống. Uống trà trong im lặng, trân trọng khoảnh khắc hiện tại — tinh thần Wabi-Sabi.',
      en: 'Close with a traditional matcha tea ceremony. Drink tea in silence, appreciating the present moment — the spirit of Wabi-Sabi.',
      fr: 'Terminez par une cérémonie traditionnelle du thé matcha. Buvez le thé en silence, en appréciant l’instant présent — l’esprit du Wabi-Sabi.',
      cn: '以传统抹茶茶道作结。静默品茶，珍惜当下——侗寂的精神。',
      ar: 'اختتم بمراسم شاي الماتشا التقليدية. اشرب الشاي في صمت، مقدّرًا اللحظة الراهنة — روح الوابي-سابي.',
    },
    duration: '20 min',
    icon: 'solar:cup-hot-bold-duotone',
    color: BAMBOO,
  },
];

export function Spa8Ritual() {
  const { currentLang } = useTranslate('spa8');
  const lang = currentLang.value as Spa8Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: DARK, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: SAKURA, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'The 6-step journey',
                    vi: 'Hành trình 6 bước',
                    fr: 'Le parcours en 6 étapes',
                    cn: '六步之旅',
                    ar: 'رحلة الست خطوات',
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
                    en: 'The Onsen ',
                    vi: 'Nghi lễ Onsen ',
                    fr: 'Le rituel Onsen ',
                    cn: '温泉仪式 ',
                    ar: 'طقس الأونسن ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: SAKURA }}>
                {
                  (
                    {
                      en: 'complete ritual',
                      vi: 'toàn diện',
                      fr: 'complet',
                      cn: '完整呈现',
                      ar: 'الكامل',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,250,245,0.45)', maxWidth: 520, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: 'Japanese people do not consider bathing as hygiene — it is a full-body restoration ritual. 2,000 years of living philosophy in 2 hours 15 minutes.',
                    vi: 'Người Nhật không coi tắm là vệ sinh — đó là nghi lễ phục hồi toàn thân. 2.000 năm triết học sống trong 2 giờ 15 phút.',
                    fr: 'Les Japonais ne considèrent pas le bain comme une simple hygiène — c’est un rituel de restauration du corps entier. 2 000 ans de philosophie vivante en 2 heures 15 minutes.',
                    cn: '日本人不视沐浴为清洁——而是全身修复的仪式。2000 年的生活哲学，浓缩于 2 小时 15 分钟之中。',
                    ar: 'لا يعتبر اليابانيون الاستحمام مجرد نظافة — بل هو طقس لاستعادة حيوية الجسم بالكامل. 2000 عام من الفلسفة الحية في ساعتين و48 دقيقة.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ pt: 1 }}>
            <Typography
              sx={{ fontSize: 28, letterSpacing: 12, color: SAKURA, opacity: 0.4, fontWeight: 300 }}
            >
              和
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2.5}>
          {STEPS.map((step, idx) => (
            <Grid key={step.num} item xs={12} sm={6} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: '100%',
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: step.color,
                    bgcolor: `${step.color}05`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography
                        sx={{
                          fontSize: 42,
                          fontWeight: 900,
                          color: step.color,
                          opacity: 0.18,
                          lineHeight: 1,
                          letterSpacing: -2,
                        }}
                      >
                        {step.num}
                      </Typography>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2.5,
                          bgcolor: `${step.color}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon={step.icon} width={22} sx={{ color: step.color }} />
                      </Box>
                    </Stack>
                    <Typography sx={{ fontSize: 22, color: SAKURA, opacity: 0.3, fontWeight: 700 }}>
                      {step.kanji}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.75}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: CREAM, fontWeight: 800, lineHeight: 1.3, fontSize: 15 }}
                    >
                      {step.name[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(253,250,245,0.45)', lineHeight: 1.7, fontSize: 13 }}
                    >
                      {step.desc[lang]}
                    </Typography>
                  </Stack>
                  <Box sx={{ pt: 0.5, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:clock-circle-bold-duotone"
                        width={14}
                        sx={{ color: step.color, opacity: 0.7 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: step.color, fontWeight: 700, fontSize: 12 }}
                      >
                        {step.duration}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 5,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            bgcolor: 'rgba(255,183,197,0.06)',
            border: '1px solid rgba(255,183,197,0.12)',
            textAlign: 'center',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify icon="solar:clock-circle-bold-duotone" width={20} sx={{ color: SAKURA }} />
              <Typography variant="body2" sx={{ color: 'rgba(253,250,245,0.6)' }}>
                {
                  (
                    {
                      en: 'Total duration: 2h15 minutes',
                      vi: 'Tổng thời gian: 2h15 phút',
                      fr: 'Durée totale : 2h15 minutes',
                      cn: '总时长：2 小时 15 分钟',
                      ar: 'المدة الإجمالية: ساعتان و15 دقيقة',
                    } as const
                  )[lang]
                }
              </Typography>
            </Stack>
            <Box
              sx={{
                width: 1,
                height: 20,
                bgcolor: 'rgba(255,255,255,0.1)',
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify icon="solar:user-bold-duotone" width={20} sx={{ color: SAKURA }} />
              <Typography variant="body2" sx={{ color: 'rgba(253,250,245,0.6)' }}>
                {
                  (
                    {
                      en: 'Completely private suite',
                      vi: 'Phòng riêng tư hoàn toàn',
                      fr: 'Suite entièrement privée',
                      cn: '完全私密的套房',
                      ar: 'جناح خاص تمامًا',
                    } as const
                  )[lang]
                }
              </Typography>
            </Stack>
            <Box
              sx={{
                width: 1,
                height: 20,
                bgcolor: 'rgba(255,255,255,0.1)',
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify icon="solar:star-bold-duotone" width={20} sx={{ color: SAKURA }} />
              <Typography variant="body2" sx={{ color: 'rgba(253,250,245,0.6)' }}>
                {
                  (
                    {
                      en: 'Includes tea ceremony & yukata',
                      vi: 'Bao gồm trà đạo & yukata',
                      fr: 'Inclut cérémonie du thé & yukata',
                      cn: '含茶道与浴衣',
                      ar: 'يشمل مراسم الشاي واليوكاتا',
                    } as const
                  )[lang]
                }
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
