import type { Spa7Lang } from 'src/sections/spa7/spa7-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

const BG = '#0D0010';
const PINK = '#FF6B9D';
const CYAN = '#7ECEF4';
const GOLD = '#C9A84C';

const IMGS = [
  {
    src: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80',
    caption: {
      vi: 'Phòng công nghệ HydraFacial',
      en: 'HydraFacial technology suite',
      fr: 'Suite technologique HydraFacial',
      cn: 'HydraFacial 科技套房',
      ar: 'جناح تقنية HydraFacial',
    },
    h: 440,
    span: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    caption: {
      vi: 'Máy Ultherapy siêu âm',
      en: 'Ultherapy ultrasound machine',
      fr: 'À ultrasons Ultherapy',
      cn: 'Ultherapy 超声仪器',
      ar: 'جهاز الموجات فوق الصوتية Ultherapy',
    },
    h: 210,
    span: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&q=80',
    caption: {
      vi: 'LED Bio-Light therapy',
      en: 'LED Bio-Light therapy',
      fr: 'Thérapie LED Bio-Light',
      cn: 'LED Bio-Light 疗法',
      ar: 'علاج LED Bio-Light',
    },
    h: 210,
    span: 6,
  },
];

const TESTIMONIALS = [
  {
    quote: {
      vi: '"PicoLaser xóa vết nám tôi giữ 8 năm chỉ sau 3 buổi. Không đau, không downtime, kết quả vượt mọi kỳ vọng."',
      en: '"PicoLaser erased my 8-year old melasma in just 3 sessions. No pain, no downtime, results beyond any expectation."',
      fr: "« PicoLaser a effacé le mélasma que j'avais depuis 8 ans en seulement 3 séances. Sans douleur, sans temps de récupération, des résultats au-delà de toute attente. »",
      cn: '“PicoLaser 仅用 3 次就消除了我保留 8 年的黄褐斑。无痛、无恢复期，效果超出一切预期。”',
      ar: '«أزال PicoLaser الكلف الذي رافقني 8 سنوات في 3 جلسات فقط. دون ألم ودون فترة نقاهة، ونتائج فاقت كل التوقعات.»',
    },
    name: 'Thu Hương',
    age: '42',
    color: PINK,
  },
  {
    quote: {
      vi: '"Thermage lift khuôn mặt tôi mà không cần dao kéo. Bạn bè cứ hỏi tôi dùng filler gì — tôi nói là công nghệ, không phải tiêm."',
      en: '"Thermage lifted my face without any surgery. Friends kept asking what filler I use — I said it\'s technology, not injections."',
      fr: "« Thermage a lifté mon visage sans aucune chirurgie. Mes amis me demandaient sans cesse quel filler j'utilise — je leur disais que c'est de la technologie, pas des injections. »",
      cn: '“Thermage 在没有任何手术的情况下提拉了我的脸。朋友们一直问我用的是什么填充剂——我说是科技，不是注射。”',
      ar: '«شدّ Thermage وجهي دون أي جراحة. ظل أصدقائي يسألونني عن نوع الفيلر الذي أستخدمه — قلت لهم إنها تقنية وليست حقناً.»',
    },
    name: 'Minh Tân',
    age: '38',
    color: CYAN,
  },
  {
    quote: {
      vi: '"Tôi là bác sĩ da liễu nên biết chọn nơi uy tín. Bio-Tech Spa có thiết bị y tế chuẩn châu Âu, quy trình rất chuyên nghiệp."',
      en: '"As a dermatologist I know how to choose quality. Bio-Tech Spa has European-standard medical equipment and very professional protocols."',
      fr: "« En tant que dermatologue, je sais choisir la qualité. Bio-Tech Spa dispose d'équipements médicaux aux normes européennes et de protocoles très professionnels. »",
      cn: '“作为皮肤科医生，我懂得如何选择优质机构。Bio-Tech Spa 拥有欧洲标准的医疗设备和非常专业的流程。”',
      ar: '«بصفتي طبيبة جلدية، أعرف كيف أختار الجودة. يمتلك Bio-Tech Spa معدات طبية بمعايير أوروبية وبروتوكولات احترافية للغاية.»',
    },
    name: 'BS. Quốc Hùng',
    age: '45',
    color: GOLD,
  },
];

export function Spa7Gallery() {
  const { currentLang } = useTranslate('spa7');
  const lang = currentLang.value as Spa7Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: BG, overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: PINK, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Our facilities',
                    vi: 'Cơ sở vật chất',
                    fr: 'Nos installations',
                    cn: '我们的设施',
                    ar: 'مرافقنا',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: 'white', maxWidth: 420, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'Lab spa ',
                    vi: 'Lab spa ',
                    fr: 'Lab spa ',
                    cn: 'Lab spa ',
                    ar: 'Lab spa ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: PINK }}>
                {
                  (
                    {
                      en: 'most advanced in Vietnam',
                      vi: 'tiên tiến nhất Việt Nam',
                      fr: 'le plus avancé du Vietnam',
                      cn: '越南最先进',
                      ar: 'الأكثر تقدماً في فيتنام',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 6 }}>
          {IMGS.map((img) => (
            <Grid key={img.src} item xs={12} sm={img.span}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: { xs: 240, md: img.h },
                  position: 'relative',
                  '&:hover img': { transform: 'scale(1.05)' },
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
                    filter: 'brightness(0.75) saturate(0.9)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(13,0,16,0.8) 0%, transparent 60%)',
                  }}
                />
                <Box
                  className="cap"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    opacity: 0.8,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                    {img.caption[lang]}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} component={m.div} variants={varFade({ distance: 20 }).inUp}>
          {TESTIMONIALS.map((t) => (
            <Grid key={t.name} item xs={12} md={4}>
              <Box
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${t.color}20`,
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: t.color, transform: 'translateY(-4px)' },
                }}
              >
                <Stack spacing={2.5}>
                  <Iconify
                    icon="solar:double-alt-arrow-right-bold-duotone"
                    width={24}
                    sx={{ color: t.color, opacity: 0.6 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.8,
                      fontStyle: 'italic',
                      flexGrow: 1,
                    }}
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
                      <Typography variant="caption" sx={{ color: BG, fontWeight: 800 }}>
                        {t.name[0]}
                      </Typography>
                    </Box>
                    <Stack spacing={0.25}>
                      <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700 }}>
                        {t.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)' }}>
                        {t.age}{' '}
                        {
                          (
                            {
                              en: 'years old',
                              vi: 'tuổi',
                              fr: 'ans',
                              cn: '岁',
                              ar: 'سنة',
                            } as const
                          )[lang]
                        }
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
