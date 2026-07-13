import type { Spa7Lang } from 'src/sections/spa7/spa7-data';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const BG = '#0A0014';
const PINK = '#FF6B9D';
const CYAN = '#7ECEF4';
const GOLD = '#C9A84C';
const PURPLE = '#9B59B6';

const RESULTS = [
  {
    label: {
      vi: 'Giảm nếp nhăn sau 4 tuần',
      en: 'Wrinkle reduction after 4 weeks',
      fr: 'Réduction des rides après 4 semaines',
      cn: '4 周后皱纹减少',
      ar: 'تقليل التجاعيد بعد 4 أسابيع',
    },
    pct: 87,
    color: PINK,
    icon: 'solar:face-scan-bold-duotone',
  },
  {
    label: {
      vi: 'Tăng collagen đo bằng ultrasound',
      en: 'Collagen increase measured by ultrasound',
      fr: 'Augmentation du collagène mesurée par ultrasons',
      cn: '经超声测量胶原蛋白增加',
      ar: 'زيادة الكولاجين مقاسة بالموجات فوق الصوتية',
    },
    pct: 73,
    color: CYAN,
    icon: 'solar:dna-bold-duotone',
  },
  {
    label: {
      vi: 'Cải thiện độ ẩm da',
      en: 'Skin hydration improvement',
      fr: "Amélioration de l'hydratation de la peau",
      cn: '肌肤保湿度提升',
      ar: 'تحسّن ترطيب البشرة',
    },
    pct: 94,
    color: GOLD,
    icon: 'solar:drop-bold-duotone',
  },
  {
    label: {
      vi: 'Hài lòng sau 1 liệu trình',
      en: 'Satisfaction after 1 course',
      fr: 'Satisfaction après 1 cure',
      cn: '1 个疗程后满意度',
      ar: 'الرضا بعد دورة واحدة',
    },
    pct: 98,
    color: PURPLE,
    icon: 'solar:heart-bold-duotone',
  },
];

const CASES = [
  {
    before: {
      vi: 'Da khô, lão hóa sớm, thiếu sức sống',
      en: 'Dry skin, premature aging, dull complexion',
      fr: 'Peau sèche, vieillissement prématuré, teint terne',
      cn: '皮肤干燥、过早衰老、肤色暗沉',
      ar: 'بشرة جافة، شيخوخة مبكرة، بشرة باهتة',
    },
    after: {
      vi: 'Da căng bóng, trẻ trung hơn 7 tuổi',
      en: 'Firmer skin, 7 years younger appearance',
      fr: 'Peau plus ferme, apparence rajeunie de 7 ans',
      cn: '肌肤更紧致，外貌年轻 7 岁',
      ar: 'بشرة أكثر شدّاً، مظهر أصغر بـ 7 سنوات',
    },
    tech: 'HydraFacial + Ultherapy',
    sessions: { vi: '6 buổi', en: '6 sessions', fr: '6 séances', cn: '6 次', ar: '6 جلسات' },
    color: PINK,
  },
  {
    before: {
      vi: 'Rãnh mũi má sâu, da chảy xệ',
      en: 'Deep nasolabial folds, sagging skin',
      fr: 'Sillons nasogéniens profonds, peau relâchée',
      cn: '深法令纹、皮肤松弛',
      ar: 'تجاعيد أنفية شفوية عميقة، بشرة مترهلة',
    },
    after: {
      vi: 'Khuôn mặt nâng tự nhiên, không phẫu thuật',
      en: 'Natural face lift, no surgery',
      fr: 'Lifting naturel du visage, sans chirurgie',
      cn: '自然提拉脸部，无需手术',
      ar: 'شدّ طبيعي للوجه، دون جراحة',
    },
    tech: 'Thermage FLX + RF Microneedling',
    sessions: { vi: '4 buổi', en: '4 sessions', fr: '4 séances', cn: '4 次', ar: '4 جلسات' },
    color: CYAN,
  },
  {
    before: {
      vi: 'Sẹo mụn, lỗ chân lông to, da không đều màu',
      en: 'Acne scars, enlarged pores, uneven skin tone',
      fr: "Cicatrices d'acné, pores dilatés, teint irrégulier",
      cn: '痘疤、毛孔粗大、肤色不均',
      ar: 'ندوب حب الشباب، مسام واسعة، لون بشرة غير موحّد',
    },
    after: {
      vi: 'Da mịn đều, tươi sáng, lỗ chân lông thu nhỏ',
      en: 'Smooth, radiant skin, minimized pores',
      fr: 'Peau lisse et éclatante, pores resserrés',
      cn: '肌肤光滑亮泽、毛孔细致',
      ar: 'بشرة ناعمة مشرقة، مسام مصغّرة',
    },
    tech: 'PicoLaser + LED Bio-Light',
    sessions: { vi: '8 buổi', en: '8 sessions', fr: '8 séances', cn: '8 次', ar: '8 جلسات' },
    color: GOLD,
  },
];

function AnimBar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <Box ref={ref}>
      <LinearProgress
        variant="determinate"
        value={inView ? pct : 0}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'rgba(255,255,255,0.06)',
          '& .MuiLinearProgress-bar': {
            bgcolor: color,
            borderRadius: 4,
            transition: 'transform 1.5s ease',
          },
        }}
      />
    </Box>
  );
}

export function Spa7Results() {
  const { currentLang } = useTranslate('spa7');
  const lang = currentLang.value as Spa7Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: BG, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: PINK, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Clinical results',
                    vi: 'Kết quả lâm sàng',
                    fr: 'Résultats cliniques',
                    cn: '临床结果',
                    ar: 'النتائج السريرية',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: 'white', maxWidth: 440, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'Technology ',
                    vi: 'Công nghệ đo ',
                    fr: 'Technologie ',
                    cn: '科技 ',
                    ar: 'تقنية ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: PINK }}>
                {
                  (
                    {
                      en: 'measured in numbers',
                      vi: 'được bằng con số',
                      fr: 'mesurée en chiffres',
                      cn: '用数据衡量',
                      ar: 'مقيسة بالأرقام',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={5}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Stack spacing={3.5}>
                {RESULTS.map((r) => (
                  <Box key={r.label.en}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Iconify icon={r.icon} width={20} sx={{ color: r.color }} />
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}
                        >
                          {r.label[lang]}
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: r.color, fontWeight: 900, fontSize: 22 }}>
                        {r.pct}%
                      </Typography>
                    </Stack>
                    <AnimBar pct={r.pct} color={r.color} />
                  </Box>
                ))}
              </Stack>
              <Box
                component={m.div}
                variants={varFade({ distance: 20 }).inUp}
                sx={{
                  mt: 3,
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: 'rgba(255,107,157,0.06)',
                  border: '1px solid rgba(255,107,157,0.12)',
                }}
              >
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
                  *{' '}
                  {
                    (
                      {
                        en: 'Data from 2023-2024 clinical study on 1,240 clients. Results may vary individually.',
                        vi: 'Dữ liệu từ nghiên cứu lâm sàng 2023-2024 trên 1.240 khách hàng. Kết quả có thể thay đổi tùy cá nhân.',
                        fr: "Données d'une étude clinique 2023-2024 sur 1 240 clients. Les résultats peuvent varier selon les individus.",
                        cn: '数据来自 2023-2024 年针对 1,240 名客户的临床研究。结果因人而异。',
                        ar: 'بيانات من دراسة سريرية 2023-2024 على 1,240 عميلاً. قد تختلف النتائج من شخص لآخر.',
                      } as const
                    )[lang]
                  }
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inRight}>
              <Stack spacing={2.5}>
                {CASES.map((c, idx) => (
                  <Box
                    key={c.tech}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${c.color}20`,
                      transition: 'all 0.3s',
                      '&:hover': { borderColor: c.color, bgcolor: `${c.color}05` },
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Stack spacing={0.5}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255,255,255,0.3)',
                              textTransform: 'uppercase',
                              letterSpacing: 2,
                              fontSize: 9,
                            }}
                          >
                            Before
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontSize: 12 }}
                          >
                            {c.before[lang]}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={1} sx={{ textAlign: 'center' }}>
                        <Iconify
                          icon="solar:arrow-right-bold-duotone"
                          width={20}
                          sx={{ color: c.color }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Stack spacing={0.5}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: c.color,
                              textTransform: 'uppercase',
                              letterSpacing: 2,
                              fontSize: 9,
                            }}
                          >
                            After
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255,255,255,0.75)',
                              lineHeight: 1.5,
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {c.after[lang]}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Stack spacing={0.25} alignItems={{ sm: 'flex-end' }}>
                          <Typography
                            variant="caption"
                            sx={{ color: c.color, fontWeight: 700, fontSize: 11 }}
                          >
                            {c.tech}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                          >
                            {c.sessions[lang]}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
