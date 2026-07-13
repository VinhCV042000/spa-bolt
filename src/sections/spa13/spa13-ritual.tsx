import type { Spa13Lang } from 'src/sections/spa13/spa13-data';

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

const JUNGLE = '#0D4A2A';
const TROP_GOLD = '#F7C948';
const FLAME = '#E05D2A';
const FRESH = '#F0FFF4';

const RITUALS = [
  {
    name: {
      vi: 'Jungle Awakening',
      en: 'Jungle Awakening',
      fr: 'Jungle Awakening',
      cn: 'Jungle Awakening',
      ar: 'Jungle Awakening',
    },
    price: '1.200.000₫',
    duration: '90 min',
    desc: {
      vi: 'Massage thảo mộc nhiệt đới với gừng rừng và dầu dừa tươi. Bắt đầu bằng foot ritual với muối Himalaya và lá pandan. Kết thúc với mask bùn cao lanh nhiệt đới.',
      en: 'Tropical herbal massage with wild ginger and fresh coconut oil. Begins with foot ritual using Himalayan salt and pandan leaves. Ends with tropical kaolin mud mask.',
      fr: "Massage aux herbes tropicales au gingembre sauvage et à l'huile de coco fraîche. Commence par un rituel des pieds au sel de l'Himalaya et aux feuilles de pandan. Se termine par un masque de boue de kaolin tropical.",
      cn: '采用野姜与新鲜椰子油的热带草本按摩。以喜马拉雅盐与斑兰叶的足部仪式开始，以热带高岭土泥膜收尾。',
      ar: 'تدليك بالأعشاب الاستوائية مع الزنجبيل البري وزيت جوز الهند الطازج. يبدأ بطقس للقدمين باستخدام ملح الهيمالايا وأوراق الباندان، وينتهي بقناع طيني من الكاولين الاستوائي.',
    },
    icon: 'solar:leaf-bold-duotone',
    color: JUNGLE,
    tag: {
      vi: 'Khai thông năng lượng',
      en: 'Energy awakening',
      fr: 'Éveil énergétique',
      cn: '唤醒能量',
      ar: 'إيقاظ الطاقة',
    },
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80',
  },
  {
    name: {
      vi: 'Rainforest Detox Wrap',
      en: 'Rainforest Detox Wrap',
      fr: 'Rainforest Detox Wrap',
      cn: 'Rainforest Detox Wrap',
      ar: 'Rainforest Detox Wrap',
    },
    price: '1.800.000₫',
    duration: '2h',
    desc: {
      vi: 'Gói xổ độc hoàn chỉnh: tẩy da chết với muối biển và ylang-ylang, đắp bùn xanh rừng nhiệt đới, quấn lá chuối tươi 30 phút, massage phục hồi kết thúc.',
      en: 'Complete detox wrap: exfoliation with sea salt and ylang-ylang, tropical green forest mud mask, fresh banana leaf wrap for 30 minutes, ending with recovery massage.',
      fr: "Enveloppe détox complète : exfoliation au sel marin et à l'ylang-ylang, masque de boue verte de la forêt tropicale, enveloppement de feuilles de bananier fraîches pendant 30 minutes, suivi d'un massage de récupération.",
      cn: '完整排毒裹敷：以海盐与依兰依兰去角质，敷热带绿林泥膜，用新鲜香蕉叶包裹30分钟，最后以修复按摩收尾。',
      ar: 'لفّة كاملة لإزالة السموم: تقشير بملح البحر والإيلنغ إيلنغ، قناع طيني أخضر من الغابة الاستوائية، لفّ بأوراق الموز الطازجة لمدة 30 دقيقة، ثم تدليك للتعافي.',
    },
    icon: 'solar:fire-bold-duotone',
    color: FLAME,
    tag: {
      vi: 'Best seller',
      en: 'Best seller',
      fr: 'Best-seller',
      cn: '畅销之选',
      ar: 'الأكثر مبيعًا',
    },
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80',
  },
  {
    name: {
      vi: 'Sacred Borneo Ritual',
      en: 'Sacred Borneo Ritual',
      fr: 'Sacred Borneo Ritual',
      cn: 'Sacred Borneo Ritual',
      ar: 'Sacred Borneo Ritual',
    },
    price: '2.400.000₫',
    duration: '3h',
    desc: {
      vi: 'Nghi lễ xông hơi trầm hương Borneo truyền thống, massage 4 tay với 2 trị liệu viên đồng bộ, ngâm bồn hoa rừng, thiền hướng dẫn trong tiếng chim và nước chảy.',
      en: 'Traditional Borneo agarwood steam ritual, 4-hand massage with 2 synchronized therapists, forest flower bath, guided meditation to birdsong and flowing water.',
      fr: "Rituel traditionnel de vapeur au bois d'agar de Bornéo, massage à 4 mains avec 2 thérapeutes synchronisés, bain de fleurs de la forêt, méditation guidée au chant des oiseaux et au murmure de l'eau.",
      cn: '传统婆罗洲沉香蒸汽仪式，由两名同步理疗师进行的四手按摩，林间花浴，伴随鸟鸣与流水的引导冥想。',
      ar: 'طقس بخار تقليدي بخشب العود من بورنيو، تدليك بأربع أيدٍ مع معالِجين متزامنين، حمّام بأزهار الغابة، وتأمّل موجّه على وقع تغريد الطيور وخرير الماء.',
    },
    icon: 'solar:meditation-bold-duotone',
    color: TROP_GOLD,
    tag: {
      vi: 'Signature',
      en: 'Signature',
      fr: 'Signature',
      cn: '招牌之选',
      ar: 'مميّز',
    },
    img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&q=80',
  },
];

const TESTIMONIALS = [
  {
    quote: {
      vi: '"Rainforest Wrap — da tôi sạch như được thay mới. Mùi ylang-ylang còn phảng phất 3 ngày sau. Không cần đi Bali."',
      en: '"Rainforest Wrap — my skin felt completely renewed. The ylang-ylang scent lingered for 3 days after. No need to go to Bali."',
      fr: "« Rainforest Wrap — ma peau semblait entièrement renouvelée. Le parfum d'ylang-ylang a persisté 3 jours après. Pas besoin d'aller à Bali. »",
      cn: '“热带雨林裹敷——我的肌肤如焕然一新。依兰依兰的香气在三天后仍萦绕不散。无需远赴巴里岛。”',
      ar: '«لفّة الغابة المطيرة — شعرت بأن بشرتي تجدّدت تمامًا. ظلّ عبير الإيلنغ إيلنغ عالقًا لثلاثة أيام بعدها. لا حاجة للسفر إلى بالي.»',
    },
    name: 'Linh Trần',
    color: FLAME,
  },
  {
    quote: {
      vi: '"Sacred Borneo 4 tay — lần đầu trong đời tôi biết thế nào là thực sự thư giãn toàn thân. Sau đó ngủ 10 tiếng liên tục."',
      en: '"Sacred Borneo 4-hand — the first time in my life I knew what full-body relaxation truly feels like. Slept 10 hours straight afterward."',
      fr: "« Sacred Borneo à 4 mains — pour la première fois de ma vie, j'ai su ce qu'est une vraie détente du corps entier. J'ai ensuite dormi 10 heures d'affilée. »",
      cn: '“婆罗洲圣礼四手按摩——我人生第一次体会到何谓全身彻底放松。之后一觉睡了整整十个小时。”',
      ar: '«طقس بورنيو المقدّس بأربع أيدٍ — لأول مرة في حياتي أدركت معنى الاسترخاء الكامل للجسم. نمت بعدها عشر ساعات متواصلة.»',
    },
    name: 'Minh Đức',
    color: TROP_GOLD,
  },
];

export function Spa13Ritual() {
  const { currentLang } = useTranslate('spa13');
  const lang = currentLang.value as Spa13Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#030C05', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TROP_GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Signature rituals',
                    vi: 'Nghi lễ đặc trưng',
                    fr: 'Rituels signature',
                    cn: '招牌仪式',
                    ar: 'طقوس مميّزة',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: FRESH, maxWidth: 440, mx: 'auto', lineHeight: 1.1 }}
            >
              {
                (
                  {
                    en: 'Healing through ',
                    vi: 'Chữa lành bằng ',
                    fr: 'Guérir par ',
                    cn: '以',
                    ar: 'الشفاء عبر ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: FLAME }}>
                {
                  (
                    {
                      en: "the forest's breath",
                      vi: 'hơi thở của rừng',
                      fr: 'le souffle de la forêt',
                      cn: '森林气息的疗愈',
                      ar: 'أنفاس الغابة',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} sx={{ mb: 7 }}>
          {RITUALS.map((r, idx) => (
            <Grid key={r.name.en} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 40 }).inUp}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: r.color,
                    transform: 'translateY(-6px)',
                    boxShadow: `0 24px 60px ${r.color}18`,
                  },
                  '&:hover img': { transform: 'scale(1.06)' },
                }}
              >
                <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <Box
                    component="img"
                    src={r.img}
                    alt={r.name[lang]}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      filter: 'brightness(0.7)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: r.color,
                      opacity: 0.15,
                      mixBlendMode: 'multiply',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      bgcolor: r.color,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: 'white', fontWeight: 700, fontSize: 10 }}
                    >
                      {r.tag[lang]}
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', bottom: 14, left: 14 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2.5,
                        bgcolor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={r.icon} width={20} sx={{ color: r.color }} />
                    </Box>
                  </Box>
                </Box>
                <Stack spacing={2} sx={{ p: 3, flexGrow: 1 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle1" sx={{ color: FRESH, fontWeight: 800 }}>
                      {r.name[lang]}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography variant="caption" sx={{ color: r.color, fontWeight: 700 }}>
                        {r.price}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(240,255,244,0.4)' }}>
                        · {r.duration}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(240,255,244,0.5)',
                      lineHeight: 1.75,
                      fontSize: 13,
                      flexGrow: 1,
                    }}
                  >
                    {r.desc[lang]}
                  </Typography>
                  <Button
                    size="small"
                    fullWidth
                    sx={{
                      bgcolor: `${r.color}15`,
                      color: r.color,
                      border: `1px solid ${r.color}30`,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      '&:hover': { bgcolor: r.color, color: '#030C05' },
                    }}
                  >
                    {
                      (
                        {
                          en: 'Book now',
                          vi: 'Đặt lịch',
                          fr: 'Réserver',
                          cn: '立即预约',
                          ar: 'احجز الآن',
                        } as const
                      )[lang]
                    }
                  </Button>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} component={m.div} variants={varFade({ distance: 20 }).inUp}>
          {TESTIMONIALS.map((t) => (
            <Grid key={t.name} item xs={12} md={6}>
              <Box
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${t.color}20`,
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: t.color },
                }}
              >
                <Stack spacing={2}>
                  <Iconify
                    icon="solar:double-alt-arrow-right-bold-duotone"
                    width={22}
                    sx={{ color: t.color, opacity: 0.5 }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(240,255,244,0.6)', lineHeight: 1.85, fontStyle: 'italic' }}
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
                      <Typography variant="caption" sx={{ color: '#030C05', fontWeight: 800 }}>
                        {t.name[0]}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: FRESH, fontWeight: 700 }}>
                      {t.name}
                    </Typography>
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
