import type { Spa11Lang } from 'src/sections/spa11/spa11-data';

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

import { COBALT, TERRACOTTA, ARGAN_GOLD, CREAM_WARM } from 'src/sections/spa11/spa11-data';

const JOURNEY_STEPS = [
  {
    step: '01',
    title: {
      vi: 'Chào đón & Trà Bạc Hà',
      en: 'Welcome & Mint Tea',
      fr: 'Accueil & thé à la menthe',
      cn: '迎宾与薄荷茶',
      ar: 'الترحيب وشاي النعناع',
    },
    desc: {
      vi: 'Đón bạn theo kiểu Marrakech — trà bạc hà nóng ba lần: lần 1 ngọt như tình yêu, lần 2 mạnh như cuộc đời, lần 3 đắng như cái chết. Truyền thống Berber ngàn năm.',
      en: 'Welcomed Marrakech-style — hot mint tea poured three times: first sweet as love, second strong as life, third bitter as death. A thousand-year Berber tradition.',
      fr: "Accueil à la manière de Marrakech — thé à la menthe chaud versé trois fois : la première douce comme l'amour, la deuxième forte comme la vie, la troisième amère comme la mort. Une tradition berbère millénaire.",
      cn: '以马拉喀什的方式迎接您——热薄荷茶斟三次：第一杯甜如爱情，第二杯浓如人生，第三杯苦如死亡。千年柏柏尔传统。',
      ar: 'الترحيب على الطريقة المراكشية — شاي النعناع الساخن يُسكب ثلاث مرات: الأولى حلوة كالحب، والثانية قوية كالحياة، والثالثة مرة كالموت. تقليد أمازيغي عمره ألف عام.',
    },
    icon: 'solar:cup-hot-bold-duotone',
    color: ARGAN_GOLD,
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
  {
    step: '02',
    title: {
      vi: 'Buồng Ghasl — Xả Hơi & Mở Lỗ Chân Lông',
      en: 'Ghasl Chamber — Steam & Open Pores',
      fr: 'Chambre Ghasl — Vapeur & ouverture des pores',
      cn: 'Ghasl 豆茸 — 蒸汽与打开毛孔',
      ar: 'غرفة الغسل — البخار وفتح المسام',
    },
    desc: {
      vi: 'Phòng hơi truyền thống 45°C có hương eucalyptus và hoa cam. 20 phút hơi nước mở toàn bộ lỗ chân lông — chuẩn bị hoàn hảo cho bước kessa.',
      en: '45°C traditional steam room with eucalyptus and orange blossom. 20 minutes of steam completely opens pores — perfect preparation for the kessa step.',
      fr: "Hammam traditionnel à 45°C aux notes d'eucalyptus et de fleur d'oranger. 20 minutes de vapeur ouvrent complètement les pores — préparation parfaite pour l'étape kessa.",
      cn: '45°C 传统蒸房，带有桉树和橙花香。蒸汽 20 分钟彻底打开毛孔——为 kessa 步骤做好完美准备。',
      ar: 'غرفة بخار تقليدية بدرجة 45 مئوية برائحة الأوكالبتوس وزهر البرتقال. 20 دقيقة من البخار تفتح المسام بالكامل — تحضير مثالي لخطوة الكيسة.',
    },
    icon: 'solar:cloudy-bold-duotone',
    color: '#7ECEF4',
    img: 'https://images.unsplash.com/photo-1609436132311-e4b80a0e0b45?w=600&q=80',
  },
  {
    step: '03',
    title: {
      vi: 'Beldi & Kessa — Tẩy Chay Nghi Thức',
      en: 'Beldi & Kessa — Ritual Cleansing',
      fr: 'Beldi & Kessa — Nettoyage rituel',
      cn: 'Beldi 与 Kessa — 仪式清洁',
      ar: 'بلدي وكيسة — التنظيف الطقوسي',
    },
    desc: {
      vi: 'Xà phòng đen Beldi xoa khắp người, nghỉ 10 phút. Rồi nghệ nhân kessa tẩy từng vùng cơ thể theo chuyển động tròn truyền thống — lớp da chết bong ra thành từng cuộn.',
      en: 'Beldi black soap applied all over, rest 10 minutes. Then the kessa artisan exfoliates each body area in traditional circular movements — dead skin rolls away in ribbons.',
      fr: 'Savon noir Beldi appliqué partout, repos de 10 minutes. Puis l’artisan kessa exfolie chaque zone du corps en mouvements circulaires traditionnels — la peau morte se détache en rubans.',
      cn: 'Beldi 黑皂涂抹全身，休息 10 分钟。随后 kessa 匠人以传统画圈动作逐区去角质——死皮成条脱落。',
      ar: 'يُوضع صابون بلدي الأسود على الجسم بالكامل، ثم راحة 10 دقائق. بعد ذلك يقوم حرفي الكيسة بتقشير كل منطقة من الجسم بحركات دائرية تقليدية — تتساقط الجلد الميت على شكل خيوط.',
    },
    icon: 'solar:soap-bold-duotone',
    color: TERRACOTTA,
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  },
  {
    step: '04',
    title: {
      vi: 'Rhassoul — Đắp Mặt Nạ Đất Atlas',
      en: 'Rhassoul — Atlas Clay Mask',
      fr: "Rhassoul — Masque d'argile de l'Atlas",
      cn: 'Rhassoul — 阿特拉斯泥膜',
      ar: 'الغاسول — قناع طين الأطلس',
    },
    desc: {
      vi: 'Đất sét rhassoul pha nước hoa hồng đắp toàn thân. Nằm yên 15 phút trong căn phòng ấm — đất hút độc tố, tinh chất khoáng thẩm thấu vào da.',
      en: 'Rhassoul clay mixed with rose water applied to full body. Rest 15 minutes in the warm room — clay draws out toxins, mineral essence penetrates skin.',
      fr: "Argile rhassoul mélangée à l'eau de rose appliquée sur tout le corps. Repos de 15 minutes dans la salle chaude — l'argile extrait les toxines, l'essence minérale pénètre la peau.",
      cn: 'Rhassoul 泥与玫瑰水混合后敷满全身。在温暖的房间里静卧 15 分钟——泥土抽出毒素，矿物精华渗入肌肤。',
      ar: 'طين الغاسول الممزوج بماء الورد يُوضع على الجسم بالكامل. استرح 15 دقيقة في الغرفة الدافئة — يسحب الطين السموم وتتغلغل الخلاصة المعدنية في البشرة.',
    },
    icon: 'solar:leaf-bold-duotone',
    color: '#8B4513',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
  },
  {
    step: '05',
    title: {
      vi: 'Dầu Argan — Nuôi Dưỡng & Phong Tỏa',
      en: 'Argan Oil — Nourish & Seal',
      fr: "Huile d'argan — Nourrir & sceller",
      cn: '阿甘油 — 滋养与锁水',
      ar: 'زيت أركان — التغذية والحبس',
    },
    desc: {
      vi: 'Dầu argan Agadir ấm massage toàn thân — kỹ thuật massage Marrakech kết hợp áp lực sâu và nâng cơ. Da thẩm thấu dầu trong khi cơ thư giãn hoàn toàn.',
      en: 'Warm Agadir argan oil full body massage — Marrakech technique combining deep pressure and muscle lifting. Skin absorbs oil while body fully relaxes.',
      fr: "Massage complet du corps à l'huile d'argan chaude d'Agadir — technique de Marrakech alliant pression profonde et lifting musculaire. La peau absorbe l'huile pendant que le corps se détend complètement.",
      cn: '温热的 Agadir 阿甘油全身按摩——马拉喀什手法结合深层压力与提拉。肌肤吸收油分，身体完全放松。',
      ar: 'تدليك كامل للجسم بزيت أركان أغادير الدافئ — تقنية مراكشية تجمع بين الضغط العميق وشد العضلات. تمتص البشرة الزيت بينما يسترخي الجسم تماماً.',
    },
    icon: 'solar:drop-bold-duotone',
    color: ARGAN_GOLD,
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
  {
    step: '06',
    title: {
      vi: 'Trà Kết Thúc & Quà Tặng',
      en: 'Closing Tea & Gift',
      fr: 'Thé de clôture & cadeau',
      cn: '结束茶与礼物',
      ar: 'شاي الختام والهدية',
    },
    desc: {
      vi: 'Trở lại với trà bạc hà và kẹo chà là Medjool. Nhận túi sản phẩm Morocco mini: savon beldi 50g + nước hoa hồng 30ml + argan oil 10ml để duy trì tại nhà.',
      en: 'Return to mint tea and Medjool dates. Receive a mini Moroccan product bag: 50g beldi soap + 30ml rose water + 10ml argan oil for home maintenance.',
      fr: "Retour au thé à la menthe et aux dattes Medjool. Recevez un mini sac de produits marocains : 50g de savon beldi + 30ml d'eau de rose + 10ml d'huile d'argan pour l'entretien à domicile.",
      cn: '重新享用薄荷茶和 Medjool 蜜枣。获赠摩洛哥迷你产品袋：50g beldi 黑皂 + 30ml 玫瑰水 + 10ml 阿甘油，供居家护理。',
      ar: 'العودة إلى شاي النعناع وتمور المجهول. احصل على حقيبة منتجات مغربية مصغرة: 50 غرام صابون بلدي + 30 مل ماء ورد + 10 مل زيت أركان للعناية المنزلية.',
    },
    icon: 'solar:gift-bold-duotone',
    color: COBALT,
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  },
];

export function Spa11Journey() {
  const { currentLang } = useTranslate('spa11');
  const lang = currentLang.value as Spa11Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0E0804', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ARGAN_GOLD, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
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
              sx={{
                fontWeight: 900,
                color: CREAM_WARM,
                maxWidth: 440,
                mx: 'auto',
                lineHeight: 1.1,
              }}
            >
              {
                (
                  {
                    en: 'Inside a ',
                    vi: 'Bên trong ',
                    fr: "À l'intérieur d'une ",
                    cn: '走进 ',
                    ar: 'داخل ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {
                  (
                    {
                      en: 'Hammam session',
                      vi: 'một buổi Hammam',
                      fr: 'séance de Hammam',
                      cn: 'Hammam 体验',
                      ar: 'جلسة الحمام',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(253,243,227,0.4)', maxWidth: 500, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: '5,000 years of tradition compressed into 2 hours. Each step is not a procedure — it is a ritual passed from generation to generation.',
                    vi: '5.000 năm truyền thống được nén trong 2 giờ. Mỗi bước không phải quy trình — đó là nghi lễ được truyền dạy từ thế hệ này sang thế hệ khác.',
                    fr: 'Cinq mille ans de tradition condensés en 2 heures. Chaque étape n’est pas une procédure — c’est un rituel transmis de génération en génération.',
                    cn: '五千年的传统浓缩于两小时。每一步都不是程序——而是世代相传的仪式。',
                    ar: 'خمسة آلاف عام من التقاليد مضغوطة في ساعتين. كل خطوة ليست إجراءً — بل طقس ينتقل من جيل إلى جيل.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={2.5}>
          {JOURNEY_STEPS.map((s, idx) => (
            <Grid key={s.step} item xs={12} sm={6} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  bgcolor: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    borderColor: s.color,
                    transform: 'translateY(-5px)',
                    boxShadow: `0 20px 50px ${s.color}15`,
                  },
                  '&:hover img': { transform: 'scale(1.06)' },
                }}
              >
                <Box sx={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                  <Box
                    component="img"
                    src={s.img}
                    alt={s.title[lang]}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      filter: 'brightness(0.7) saturate(0.8)',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: s.color,
                      opacity: 0.15,
                      mixBlendMode: 'multiply',
                    }}
                  />
                  <Box sx={{ position: 'absolute', top: 14, left: 14 }}>
                    <Typography
                      sx={{
                        fontSize: 40,
                        fontWeight: 900,
                        color: 'rgba(255,255,255,0.12)',
                        lineHeight: 1,
                      }}
                    >
                      {s.step}
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', bottom: 14, right: 14 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        bgcolor: s.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={s.icon} width={20} sx={{ color: 'white' }} />
                    </Box>
                  </Box>
                </Box>
                <Stack spacing={1.5} sx={{ p: 2.5 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: s.color, fontWeight: 800, lineHeight: 1.3 }}
                  >
                    {s.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(253,243,227,0.45)', lineHeight: 1.7, fontSize: 12 }}
                  >
                    {s.desc[lang]}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}
        >
          <Button
            size="large"
            startIcon={<Iconify icon="solar:bath-bold-duotone" />}
            sx={{
              bgcolor: TERRACOTTA,
              color: CREAM_WARM,
              borderRadius: 3,
              px: 5,
              py: 2,
              fontWeight: 900,
              fontSize: 16,
              '&:hover': { bgcolor: '#A33D24' },
            }}
          >
            {
              (
                {
                  en: 'Experience Hammam now',
                  vi: 'Trải nghiệm Hammam ngay',
                  fr: 'Vivez le Hammam maintenant',
                  cn: '立即体验 Hammam',
                  ar: 'اختبر الحمام الآن',
                } as const
              )[lang]
            }
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
