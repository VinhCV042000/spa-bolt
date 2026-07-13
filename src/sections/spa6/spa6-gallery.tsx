import type { Spa6Lang } from 'src/sections/spa6/spa6-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

const TERRA = '#C1440E';
const FOREST = '#2D5016';
const CREAM = '#FFF8F0';

const IMGS = [
  {
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    caption: {
      vi: 'Phòng Panchakarma',
      en: 'Panchakarma suite',
      fr: 'Suite Panchakarma',
      cn: '五业排毒套房',
      ar: 'جناح بانشاكارما',
    },
    h: 380,
    span: 5,
  },
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    caption: {
      vi: 'Thảo dược Ayurvedic',
      en: 'Ayurvedic herbs',
      fr: 'Herbes ayurvédiques',
      cn: '阿育吠陀草药',
      ar: 'أعشاب أيورفيدية',
    },
    h: 380,
    span: 7,
  },
  {
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
    caption: {
      vi: 'Vườn thảo mộc thiêng liêng',
      en: 'Sacred herb garden',
      fr: 'Jardin d’herbes sacré',
      cn: '神圣草药园',
      ar: 'حديقة الأعشاب المقدسة',
    },
    h: 300,
    span: 7,
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
    caption: {
      vi: 'Hồ tắm dầu thảo mộc',
      en: 'Herbal oil bath pool',
      fr: 'Bassin de bain à l’huile d’herbes',
      cn: '草本油浴池',
      ar: 'حوض حمام الزيت العشبي',
    },
    h: 300,
    span: 5,
  },
];

const QUOTES = [
  {
    text: {
      vi: '"Khi thân tâm trí hòa hợp, bạn ở trong trạng thái hoàn toàn khỏe mạnh"',
      en: '"When body, mind and spirit are in harmony, you are in a state of perfect health"',
      fr: '"Lorsque le corps, l’esprit et l’âme sont en harmonie, vous êtes en parfaite santé"',
      cn: '“当身、心、灵和谐一致时，你便处于完美的健康状态”',
      ar: '"عندما يكون الجسد والعقل والروح في انسجام، تكون في حالة صحة تامة"',
    },
    author: 'Charaka Samhita — 300 BCE',
    color: TERRA,
  },
  {
    text: {
      vi: '"Thực phẩm là thuốc. Thuốc là thực phẩm"',
      en: '"Food is medicine. Medicine is food"',
      fr: '"La nourriture est un médicament. Le médicament est une nourriture"',
      cn: '“食物即是药。药即是食物”',
      ar: '"الغذاء دواء. الدواء غذاء"',
    },
    author: 'Hippocrates — 400 BCE',
    color: FOREST,
  },
  {
    text: {
      vi: '"Sức khỏe không phải vắng mặt của bệnh — đó là sự dư thừa sức sống"',
      en: '"Health is not the absence of disease — it is an abundance of vitality"',
      fr: '"La santé n’est pas l’absence de maladie — c’est une abondance de vitalité"',
      cn: '“健康不是没有疾病 — 而是活力的充盈”',
      ar: '"الصحة ليست غياب المرض — بل هي وفرة من الحيوية"',
    },
    author: 'Deepak Chopra',
    color: '#8B4513',
  },
];

export function Spa6Gallery() {
  const { currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FDFAF5', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TERRA, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Ayurvedic spaces',
                    vi: 'Không gian Ayurveda',
                    fr: 'Espaces ayurvédiques',
                    cn: '阿育吠陀空间',
                    ar: 'مساحات أيورفيدية',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 900, maxWidth: 440, mx: 'auto' }}>
              {
                (
                  {
                    en: 'Nature ',
                    vi: 'Thiên nhiên ',
                    fr: 'La nature ',
                    cn: '自然',
                    ar: 'الطبيعة ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: FOREST }}>
                {
                  (
                    {
                      en: 'in every breath',
                      vi: 'trong từng hơi thở',
                      fr: 'dans chaque souffle',
                      cn: '在每一次呼吸中',
                      ar: 'في كل نفس',
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
                  '&:hover img': { transform: 'scale(1.06)' },
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
                    filter: 'saturate(0.85)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(44,80,22,0.6) 0%, transparent 55%)',
                  }}
                />
                <Box
                  className="cap"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2.5,
                    opacity: 0.8,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 14, height: 2, bgcolor: TERRA, borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: CREAM, fontWeight: 600 }}>
                      {img.caption[lang]}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} component={m.div} variants={varFade({ distance: 20 }).inUp}>
          {QUOTES.map((q) => (
            <Grid key={q.author} item xs={12} md={4}>
              <Box
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  bgcolor: 'white',
                  border: `1px solid ${q.color}15`,
                  height: '100%',
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: q.color, boxShadow: `0 16px 40px ${q.color}10` },
                }}
              >
                <Stack spacing={2.5}>
                  <Box sx={{ width: 28, height: 4, bgcolor: q.color, borderRadius: 2 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      fontStyle: 'italic',
                      lineHeight: 1.8,
                      fontWeight: 500,
                    }}
                  >
                    {q.text[lang]}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: q.color, fontWeight: 700, letterSpacing: 1 }}
                  >
                    — {q.author}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
