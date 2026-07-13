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

import { CHAMPAGNE, DEEP_NAVY, ROSE_GOLD, PEARL_WHITE } from 'src/sections/spa12/spa12-data';

// ----------------------------------------------------------------------

const TECHNOLOGIES = [
  {
    icon: 'solar:visor-bold-duotone',
    name: {
      vi: 'VISIA 7th Generation',
      en: 'VISIA 7th Generation',
      fr: 'VISIA 7e génération',
      cn: 'VISIA 第七代',
      ar: 'VISIA الجيل السابع',
    },
    desc: {
      vi: 'Phân tích da 14 chỉ số: nếp nhăn, sắc tố, lỗ chân lông, lỗ chân lông UV, vi thể tích, vân đỏ, nâu, porphyrin, v.v. AI so sánh với 500.000+ trường hợp lâm sàng.',
      en: '14-indicator skin analysis: wrinkles, pigment, pores, UV pores, micro-volume, red veins, brown spots, porphyrins, etc. AI compares with 500,000+ clinical cases.',
      fr: "Analyse cutanée à 14 indicateurs : rides, pigmentation, pores, pores UV, micro-volume, veines rouges, taches brunes, porphyrines, etc. L'IA compare avec plus de 500 000 cas cliniques.",
      cn: '14项皮肤指标分析：皱纹、色素、毛孔、紫外线毛孔、微体积、红血丝、褐斑、卟啉等。AI对比50万+临床案例。',
      ar: 'تحليل البشرة بـ 14 مؤشرًا: التجاعيم، التصبغ، المسام، مسام الأشعة فوق البنفسجية، الحجم الدقيق، الأوردة الحمراء، البقع البنية، البورفيرينات، إلخ. الذكاء الاصطناعي يقارن مع أكثر من 500,000 حالة سريرية.',
    },
    badge: {
      vi: 'FDA Approved',
      en: 'FDA Approved',
      fr: 'Approuvé FDA',
      cn: 'FDA 认证',
      ar: 'معتمد من FDA',
    },
    color: CHAMPAGNE,
  },
  {
    icon: 'solar:lightbulb-bolt-bold-duotone',
    name: {
      vi: 'LED Phototherapy 7 Wavelengths',
      en: 'LED Phototherapy 7 Wavelengths',
      fr: "Photothérapie LED 7 longueurs d'onde",
      cn: 'LED 光疗七波长',
      ar: 'العلاج الضوئي LED بسبعة أطوال موجية',
    },
    desc: {
      vi: 'Red 633nm (collagen), Blue 415nm (acne), Yellow 590nm (brightening), Green 532nm (pigment), Purple (anti-inflammatory), Cyan (calming), Near-IR 830nm (healing).',
      en: 'Red 633nm (collagen), Blue 415nm (acne), Yellow 590nm (brightening), Green 532nm (pigment), Purple (anti-inflammatory), Cyan (calming), Near-IR 830nm (healing).',
      fr: 'Rouge 633nm (collagène), Bleu 415nm (acné), Jaune 590nm (éclaircissement), Vert 532nm (pigmentation), Violet (anti-inflammatoire), Cyan (apaisant), Proche-IR 830nm (guérison).',
      cn: '红光633nm（胶原蛋白）、蓝光415nm（痤疮）、黄光590nm（提亮）、绿光532nm（色素）、紫光（抗炎）、青光（镇静）、近红外830nm（愈合）。',
      ar: 'الأحمر 633nm (كولاجين)، الأزرق 415nm (حب الشباب)، الأصفر 590nm (تفتيح)، الأخضر 532nm (تصبغ)، البنفسجي (مضاد للالتهاب)، السماوي (مهدئ)، الأشعة تحت الحمراء القريبة 830nm (شفاء).',
    },
    badge: {
      vi: 'NASA Technology',
      en: 'NASA Technology',
      fr: 'Technologie NASA',
      cn: 'NASA 技术',
      ar: 'تقنية ناسا',
    },
    color: '#7ECEF4',
  },
  {
    icon: 'solar:atom-bold-duotone',
    name: {
      vi: 'Exosome Therapy',
      en: 'Exosome Therapy',
      fr: 'Thérapie par exosomes',
      cn: '外泌体疗法',
      ar: 'علاج الإكسوزومات',
    },
    desc: {
      vi: 'Hạt nano truyền tin từ tế bào gốc thực vật, chứa 300+ loại protein tăng trưởng, miRNA và growth factor. Thâm nhập 3mm, kích hoạt tái tạo da ở tầng trung bì.',
      en: 'Nano-messengers from plant stem cells, containing 300+ growth proteins, miRNA and growth factors. Penetrates 3mm, activates skin regeneration at the dermis layer.',
      fr: 'Nano-messagers des cellules souches végétales, contenant plus de 300 protéines de croissance, miARN et facteurs de croissance. Pénètre à 3mm, active la régénération cutanée au niveau du derme.',
      cn: '植物干细胞的纳米信使，含300+种生长蛋白、miRNA和生长因子。渗透3mm，激活真皮层的皮肤再生。',
      ar: 'رسائل نانوية من خلايا جذعية نباتية، تحتوي أكثر من 300 بروتين نمو وmiRNA وعوامل نمو. تخترق 3 مم، تُفعّل تجديد البشرة في طبقة الأدمة.',
    },
    badge: {
      vi: 'K-beauty',
      en: 'K-beauty',
      fr: 'K-beauty',
      cn: '韩式美容',
      ar: 'جمال كوري',
    },
    color: '#C77DFF',
  },
  {
    icon: 'solar:temperature-bold-duotone',
    name: {
      vi: 'Cryo Therapy (-196°C)',
      en: 'Cryo Therapy (-196°C)',
      fr: 'Cryothérapie (-196°C)',
      cn: '冷冻疗法 (-196°C)',
      ar: 'العلاج بالتبريد (-196°م)',
    },
    desc: {
      vi: 'Nitơ lỏng cô lập tế bào mỡ mục tiêu ở -196°C, phá vỡ màng tế bào mà không tổn thương周围的 da. Kết quả giảm mỡ cục bộ sau 1-3 tháng, không xâm lấn.',
      en: 'Liquid nitrogen isolates target fat cells at -196°C, rupturing cell membranes without damaging surrounding skin. Localized fat reduction results in 1-3 months, non-invasive.',
      fr: "L'azote liquide isole les cellules graisseuses cibles à -196°C, rompant les membranes cellulaires sans endommager la peau environnante. Réduction graisseuse localisée en 1 à 3 mois, non invasive.",
      cn: '液氮在-196°C下锁定目标脂肪细胞，破坏细胞膜而不损伤周围皮肤。1-3个月内局部减脂，无创。',
      ar: 'النيتروجين السائل يعزل خلايا الدهون المستهدفة عند -196°م، يكسر أغشية الخلايا دون الإضرار بالبشرة المحيطة. نتائج تقليل الدهون الموضعية خلال 1-3 أشهر، غير جراحي.',
    },
    badge: {
      vi: 'Non-invasive',
      en: 'Non-invasive',
      fr: 'Non invasif',
      cn: '无创',
      ar: 'غير جراحي',
    },
    color: '#00B4D8',
  },
  {
    icon: 'solar:needle-bold-duotone',
    name: {
      vi: 'RF Microneedle Fractional',
      en: 'RF Microneedle Fractional',
      fr: 'RF Microneedle Fractionnel',
      cn: '射频微针点阵',
      ar: 'RF إبر دقيقة تجزئي',
    },
    desc: {
      vi: '25-81 kim siêu nhỏ 0.1mm phát RF 2MHz xuyên suốt lớp biều bì, kích thích collagen co thắt tại chỗ. Làm mờ sẹo rỗ, thâm, nếp nhăn sâu chỉ sau 3 buổi.',
      en: '25-81 ultra-fine 0.1mm needles emitting 2MHz RF through epidermis, stimulating collagen contraction in place. Fades pitted scars, pigmentation, deep wrinkles in just 3 sessions.',
      fr: "25 à 81 aiguilles ultra-fines de 0,1 mm émettant une RF à 2 MHz à travers l'épiderme, stimulant la contraction du collagène sur place. Atténue les cicatrices, la pigmentation, les rides profondes en seulement 3 séances.",
      cn: '25-81根0.1mm超细针发射2MHz射频穿透表皮，原位刺激胶原蛋白收缩。仅3次疗程即可淡化痘坑、色素和深层皱纹。',
      ar: '25-81 إبرة فائقة الدقة 0.1 مم تبث RF بتردد 2 ميجاهرتز عبر البشرة، تحفز تقلص الكولاجين في مكانه. تُخفّف ندبات الحبوب والتصبغ وتجاعيد العميقة في 3 جلسات فقط.',
    },
    badge: {
      vi: 'FDA Cleared',
      en: 'FDA Cleared',
      fr: 'Approuvé FDA',
      cn: 'FDA 认证',
      ar: 'معتمد من FDA',
    },
    color: ROSE_GOLD,
  },
  {
    icon: 'solar:stars-bold-duotone',
    name: {
      vi: 'HIFU Ultrasonic Lifting',
      en: 'HIFU Ultrasonic Lifting',
      fr: 'lifting ultrasonique HIFU',
      cn: 'HIFU 超声提拉',
      ar: 'شد الموجات فوق الصوتية HIFU',
    },
    desc: {
      vi: 'Ultrasound tập trung cường độ cao 4.5mm/3.0mm/1.5mm đánh thức SMAS — lớp màng cơ nâng cơ mặt. Lifting không phẫu thuật, hiệu quả kéo dài 12-18 tháng.',
      en: 'High-intensity focused ultrasound at 4.5mm/3.0mm/1.5mm awakens SMAS — facial lifting muscle layer. Non-surgical lifting, lasting 12-18 months.',
      fr: 'Échographie focalisée de haute intensité à 4,5 mm/3,0 mm/1,5 mm réveille le SMAS — couche musculaire de lifting facial. Lifting non chirurgical, durée de 12 à 18 mois.',
      cn: '高强聚焦超声4.5mm/3.0mm/1.5mm深度唤醒SMAS——面部提拉肌层。非手术提拉，效果持续12-18个月。',
      ar: 'الموجات فوق الصوتية المركزة عالية الكثافة بعمق 4.5/3.0/1.5 مم تُوقظ SMAS — طبقة عضلات شد الوجه. شد غير جراحي، يدوم 12-18 شهرًا.',
    },
    badge: {
      vi: 'CE Medical',
      en: 'CE Medical',
      fr: 'CE Médical',
      cn: 'CE 医疗',
      ar: 'CE طبي',
    },
    color: '#F72585',
  },
];

export function Spa12Technology() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#020810' }}>
      <Container component={MotionViewport} maxWidth="xl">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('tech.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: PEARL_WHITE,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              {t('tech.title')}{' '}
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {t('tech.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(249,246,238,0.4)',
                maxWidth: 560,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              {t('tech.description')}
            </Typography>
          </Box>
        </Stack>

        {/* Tech Grid */}
        <Grid container spacing={3}>
          {TECHNOLOGIES.map((tech) => (
            <Grid key={tech.name.en} item xs={12} md={6}>
              <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: DEEP_NAVY,
                    border: `1px solid rgba(212,175,55,0.08)`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: tech.color,
                      transform: 'translateY(-8px)',
                      boxShadow: `0 32px 80px ${tech.color}15`,
                    },
                    '&:hover .tech-icon': {
                      transform: 'scale(1.1) rotate(6deg)',
                    },
                  }}
                >
                  <Stack spacing={2.5} sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box
                        className="tech-icon"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 3,
                          bgcolor: `${tech.color}12`,
                          border: `1px solid ${tech.color}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'transform 0.4s ease',
                        }}
                      >
                        <Iconify icon={tech.icon} width={30} sx={{ color: tech.color }} />
                      </Box>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.5,
                          bgcolor: `${tech.color}15`,
                          border: `1px solid ${tech.color}30`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: tech.color, fontWeight: 800, fontSize: 10 }}
                        >
                          {tech.badge[lang]}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography
                      variant="h6"
                      sx={{ color: PEARL_WHITE, fontWeight: 900, lineHeight: 1.3 }}
                    >
                      {tech.name[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(249,246,238,0.45)', lineHeight: 1.85, flex: 1 }}
                    >
                      {tech.desc[lang]}
                    </Typography>
                    <Button
                      size="small"
                      sx={{
                        alignSelf: 'flex-start',
                        color: tech.color,
                        fontWeight: 700,
                        p: 0,
                        '&:hover': { bgcolor: 'transparent' },
                      }}
                      endIcon={<Iconify icon="solar:arrow-right-bold-duotone" />}
                    >
                      {t('tech.learnMore')}
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Stats Banner */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: `linear-gradient(135deg, ${CHAMPAGNE}08 0%, ${ROSE_GOLD}06 100%)`,
            border: `1px solid rgba(212,175,55,0.12)`,
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                k: '15+',
                v: {
                  vi: 'Thiết bị tiên tiến',
                  en: 'Advanced devices',
                  fr: 'Appareils avancés',
                  cn: '先进设备',
                  ar: 'جهاز متقدم',
                },
              },
              {
                k: '100%',
                v: {
                  vi: 'FDA/CE Approved',
                  en: 'FDA/CE Approved',
                  fr: 'Approuvé FDA/CE',
                  cn: 'FDA/CE认证',
                  ar: 'معتمد FDA/CE',
                },
              },
              {
                k: '5',
                v: {
                  vi: 'Năm bảo hành',
                  en: 'Year warranty',
                  fr: 'Ans de garantie',
                  cn: '年保修',
                  ar: 'سنة ضمان',
                },
              },
              {
                k: '24/7',
                v: {
                  vi: 'Hỗ trợ kỹ thuật',
                  en: 'Technical support',
                  fr: 'Support technique',
                  cn: '技术支持',
                  ar: 'دعم فني',
                },
              },
            ].map((stat) => (
              <Grid key={stat.k} item xs={6} md={3}>
                <Stack spacing={0.5} alignItems="center">
                  <Typography
                    variant="h4"
                    sx={{ color: CHAMPAGNE, fontWeight: 900, letterSpacing: -1 }}
                  >
                    {stat.k}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(249,246,238,0.5)' }}>
                    {stat.v[lang]}
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
