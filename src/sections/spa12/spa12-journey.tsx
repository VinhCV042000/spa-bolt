import type { Spa12Lang } from 'src/sections/spa12/spa12-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { CHAMPAGNE, DEEP_NAVY, ROSE_GOLD, PEARL_WHITE } from 'src/sections/spa12/spa12-data';

// ----------------------------------------------------------------------

const JOURNEY_STEPS = [
  {
    icon: 'solar:document-medicine-bold-duotone',
    title: {
      vi: 'Khởi đầu',
      en: 'Beginning',
      fr: 'Début',
      cn: '起点',
      ar: 'البداية',
    },
    subtitle: {
      vi: 'Đăng ký & Tư vấn',
      en: 'Registration & Consultation',
      fr: 'Inscription & Consultation',
      cn: '预约与咨询',
      ar: 'التسجيل والاستشارة',
    },
    desc: {
      vi: 'Khi đặt lịch, bạn nhận được bảng hỏi sức khoẻ và mong muốn thẩm mỹ. Trước buổi đầu 48h, chúng tôi gửi nhắc nhở kèm hướng dẫn chuẩn bị.',
      en: 'Upon booking, you receive a health questionnaire and aesthetic goals form. 48 hours before your first session, we send a reminder with preparation guidelines.',
      fr: "À la réservation, vous recevez un questionnaire de santé et un formulaire d'objectifs esthétiques. 48 heures avant la première séance, nous envoyons un rappel avec les instructions de préparation.",
      cn: '预约时，您将收到健康问卷和美学目标表。首次疗程前48小时，我们会发送提醒及准备指南。',
      ar: 'عند الحجز، تتلقى استبيانًا صحيًا ونموذج أهداف جمالية. قبل الجلسة الأولى بـ 48 ساعة، نرسل تذكيرًا مع إرشادات التحضير.',
    },
    color: CHAMPAGNE,
  },
  {
    icon: 'solar:face-scan-circle-bold-duotone',
    title: {
      vi: 'Phân tích',
      en: 'Analysis',
      fr: 'Analyse',
      cn: '分析',
      ar: 'التحليل',
    },
    subtitle: {
      vi: 'VISIA Scan & Bản đồ da',
      en: 'VISIA Scan & Skin Map',
      fr: 'Scan VISIA & Carte de la peau',
      cn: 'VISIA扫描与肌肤图',
      ar: 'مسح VISIA وخريطة البشرة',
    },
    desc: {
      vi: 'VISIA 7th Gen phân tích 14 chỉ số: nếp nhăn, sắc tố, lỗ chân lông, vi thể tích, vân đỏ, nâu, porphyrin. AI so sánh với 500.000+ trường hợp lâm sàng.',
      en: 'VISIA 7th Gen analyzes 14 indicators: wrinkles, pigment, pores, micro-volume, red veins, brown spots, porphyrins. AI compares with 500,000+ clinical cases.',
      fr: "Le VISIA 7e gén analyse 14 indicateurs : rides, pigmentation, pores, micro-volume, veines rouges, taches brunes, porphyrines. L'IA compare avec plus de 500 000 cas cliniques.",
      cn: 'VISIA第七代分析14项指标：皱纹、色素、毛孔、微体积、红血丝、褐斑、卟啉。AI对比50万+临床案例。',
      ar: 'يحلل VISIA الجيل السابع 14 مؤشرًا: التجاعيد، التصبغ، المسام، الحجم الدقيق، الأوردة الحمراء، البقع البنية، البورفيرينات. الذكاء الاصطناعي يقارن مع أكثر من 500,000 حالة سريرية.',
    },
    color: ROSE_GOLD,
  },
  {
    icon: 'solar:clipboard-check-bold-duotone',
    title: {
      vi: 'Thiết kế',
      en: 'Design',
      fr: 'Conception',
      cn: '设计',
      ar: 'التصميم',
    },
    subtitle: {
      vi: 'Protocol cá nhân hóa',
      en: 'Personalized Protocol',
      fr: 'Protocole personnalisé',
      cn: '个性化方案',
      ar: 'بروتوكول مخصص',
    },
    desc: {
      vi: 'Bác sĩ da liễu thiết kế protocol dựa trên dữ liệu VISIA, lịch sử da và mục tiêu của bạn. Không có "một cỡ vừa tất cả" — mỗi protocol là duy nhất.',
      en: 'Dermatologist designs protocol based on VISIA data, your skin history and goals. No "one size fits all" — every protocol is unique.',
      fr: "Le dermatologue conçoit un protocole basé sur les données VISIA, l'historique de votre peau et vos objectifs. Pas de « taille unique » — chaque protocole est unique.",
      cn: '皮肤科医生根据VISIA数据、您的皮肤病史和目标设计方案。没有"一刀切"——每个方案都是独一无二的。',
      ar: 'يصمم طبيب الجلدية بروتوكول بناءً على بيانات VISIA وتاريخ بشرتك وأهدافك. لا يوجد "حجم واحد يناسب الجميع" — كل بروتوكول فريد.',
    },
    color: '#7ECEF4',
  },
  {
    icon: 'solar:health-bold-duotone',
    title: {
      vi: 'Trải nghiệm',
      en: 'Experience',
      fr: 'Expérience',
      cn: '体验',
      ar: 'التجربة',
    },
    subtitle: {
      vi: 'Thực hiện liệu trình',
      en: 'Treatment Session',
      fr: 'Séance de traitement',
      cn: '疗程执行',
      ar: 'جلسة العلاج',
    },
    desc: {
      vi: 'Trong phòng suite riêng, bạn trải nghiệm liệu trình với thiết bị FDA/CE. Bác sĩ theo dõi trực tiếp, điều chỉnh cường độ theo phản ứng da thời gian thực.',
      en: 'In a private suite, you experience treatment with FDA/CE-approved equipment. Doctor oversees directly, adjusting intensity based on real-time skin response.',
      fr: "Dans une suite privée, vous vivez le traitement avec des appareils approuvés FDA/CE. Le médecin supervise directement, ajustant l'intensité selon la réponse cutanée en temps réel.",
      cn: '在私人套房中，您将体验FDA/CE认证设备的疗程。医生直接监督，根据实时皮肤反应调整强度。',
      ar: 'في جناح خاص، تختبر العلاج بمعدات معتمدة من FDA/CE. يُشرف الطبيب مباشرة، ويُعدّل الشدة بناءً على استجابة البشرة في الوقت الفعلي.',
    },
    color: '#C77DFF',
  },
  {
    icon: 'solar:chart-bold-duotone',
    title: {
      vi: 'Theo dõi',
      en: 'Monitoring',
      fr: 'Suivi',
      cn: '追踪',
      ar: 'المتابعة',
    },
    subtitle: {
      vi: 'Báo cáo trước/sau',
      en: 'Before/After Report',
      fr: 'Rapport avant/après',
      cn: '前后对比报告',
      ar: 'تقرير قبل/بعد',
    },
    desc: {
      vi: 'VISIA so sánh trước và sau hiển thị trong app. Bạn xem từng chỉ số: độ ẩm +89%, nếp nhăn -32%, sắc tố -28%. Dữ liệu thực, thay vì cảm tính.',
      en: 'VISIA before/after comparison displayed in app. You see each indicator: moisture +89%, wrinkles -32%, pigment -28%. Real data, not guesswork.',
      fr: "La comparaison avant/après VISIA s'affiche dans l'appli. Vous voyez chaque indicateur : hydratation +89%, rides -32%, pigmentation -28%. Données réelles, pas de suppositions.",
      cn: 'VISIA前后对比在App中显示。您能看到每个指标：保湿度+89%、皱纹-32%、色素-28%。真实数据，而非猜测。',
      ar: 'تُعرض مقارنة قبل/بعد VISIA في التطبيق. ترى كل مؤشر: الترطيب +89%، التجاعيد -32%， التصبغ -28%. بيانات حقيقية، لا تخمين.',
    },
    color: CHAMPAGNE,
  },
];

const STATS = [
  {
    value: '45+',
    label: {
      vi: 'phút tư vấn',
      en: 'min consultation',
      fr: 'min de consultation',
      cn: '分钟咨询',
      ar: 'دقيقة استشارة',
    },
  },
  {
    value: '14',
    label: {
      vi: 'chỉ số VISIA',
      en: 'VISIA metrics',
      fr: 'métriques VISIA',
      cn: '项VISIA指标',
      ar: 'مقياس VISIA',
    },
  },
  {
    value: '100%',
    label: { vi: 'cá nhân hóa', en: 'personalized', fr: 'personnalisé', cn: '个性化', ar: 'مخصص' },
  },
  {
    value: '24/7',
    label: { vi: 'hỗ trợ', en: 'support', fr: 'assistance', cn: '支持', ar: 'دعم' },
  },
];

// ----------------------------------------------------------------------

export function Spa12Journey() {
  const { currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#030812' }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {
                {
                  vi: 'HÀNH TRÌNH CỦA BẠN',
                  en: 'YOUR JOURNEY',
                  fr: 'VOTRE PARCOURS',
                  cn: '您的旅程',
                  ar: 'رحلتك',
                }[lang]
              }
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
              {
                {
                  vi: 'Từ đăng ký đến',
                  en: 'From booking to',
                  fr: 'De la réservation à',
                  cn: '从预约到',
                  ar: 'من الحجز إلى',
                }[lang]
              }{' '}
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {
                  {
                    vi: 'kết quả đo được',
                    en: 'measurable results',
                    fr: 'résultats mesurables',
                    cn: '可量化结果',
                    ar: 'نتائج قابلة للقياس',
                  }[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        {/* Journey Steps */}
        <Box sx={{ position: 'relative' }}>
          {/* Vertical connector line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 32, md: '50%' },
              top: 0,
              bottom: 0,
              width: '2px',
              background: `linear-gradient(180deg, ${CHAMPAGNE}40 0%, ${ROSE_GOLD}40 50%, ${CHAMPAGNE}40 100%)`,
              transform: { xs: 'translateX(-50%)', md: 'translateX(-50%)' },
            }}
          />

          <Stack spacing={{ xs: 6, md: 8 }}>
            {JOURNEY_STEPS.map((step, index) => (
              <Box
                key={step.title.en}
                component={m.div}
                variants={varFade({ distance: 40 }).inUp}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'flex-start', md: 'center' },
                  gap: { xs: 3, md: 6 },
                  position: 'relative',
                }}
              >
                {/* Step number circle */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 32, md: '50%' },
                    top: { xs: 0, md: '50%' },
                    transform: { xs: 'translateX(-50%)', md: 'translate(-50%, -50%)' },
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    bgcolor: DEEP_NAVY,
                    border: `2px solid ${step.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    boxShadow: `0 0 40px ${step.color}30`,
                  }}
                >
                  <Iconify icon={step.icon} width={28} sx={{ color: step.color }} />
                </Box>

                {/* Content box */}
                <Box
                  sx={{
                    flex: 1,
                    ml: { xs: '80px', md: index % 2 === 0 ? 0 : 'auto' },
                    mr: { md: index % 2 === 0 ? 'auto' : 0 },
                    maxWidth: { md: 420 },
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    bgcolor: DEEP_NAVY,
                    border: `1px solid ${step.color}20`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: step.color,
                      boxShadow: `0 24px 60px ${step.color}15`,
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: step.color, letterSpacing: 2, fontWeight: 700, fontSize: 10 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="h5" sx={{ color: PEARL_WHITE, fontWeight: 900, mt: 1 }}>
                    {step.title[lang]}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: step.color, fontWeight: 600, mt: 0.5 }}
                  >
                    {step.subtitle[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(249,246,238,0.5)', mt: 2, lineHeight: 1.85 }}
                  >
                    {step.desc[lang]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Stats banner */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${CHAMPAGNE}08 0%, ${ROSE_GOLD}06 100%)`,
            border: `1px solid rgba(212,175,55,0.12)`,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
              gap: 3,
            }}
          >
            {STATS.map((stat) => (
              <Stack key={stat.value} spacing={0.5} alignItems="center">
                <Typography variant="h4" sx={{ color: CHAMPAGNE, fontWeight: 900 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(249,246,238,0.5)' }}>
                  {stat.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
