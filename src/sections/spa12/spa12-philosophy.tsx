import type { Spa12Lang } from 'src/sections/spa12/spa12-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { CHAMPAGNE, DEEP_NAVY, ROSE_GOLD, PEARL_WHITE } from 'src/sections/spa12/spa12-data';

// ----------------------------------------------------------------------

const PHILOSOPHY_POINTS = [
  {
    icon: 'solar:microscope-bold-duotone',
    title: {
      vi: 'Khoa học dẫn lối',
      en: 'Science-Led',
      fr: 'Guidé par la science',
      cn: '科学为先',
      ar: 'العلم في المقدمة',
    },
    body: {
      vi: 'Mỗi liệu trình được thiết kế dựa trên nghiên cứu lâm sàng. Không cảm tính — chỉ có dữ liệu VISIA, phân tích DNA và protocol được kiểm chứng bởi hiệp hội da liễu quốc tế.',
      en: 'Every treatment is designed based on clinical research. No guesswork — only VISIA data, DNA analysis and protocols verified by the international dermatology association.',
      fr: "Chaque traitement est conçu sur la base de la recherche clinique. Pas de suppositions — seulement des données VISIA, une analyse ADN et des protocoles vérifiés par l'association internationale de dermatologie.",
      cn: '每项疗程均基于临床研究设计。拒绝估算——只有VISIA数据、DNA分析以及经过国际皮肤病学会验证的方案。',
      ar: 'كل علاج مصمم على أساس الأبحاث السريرية. لا تخمينات — فقط بيانات VISIA وتحليل الحمض النووي وبروتوكولات معتمدة من الجمعية الدولية للأمراض الجلدية.',
    },
    color: CHAMPAGNE,
  },
  {
    icon: 'solar:user-speak-bold-duotone',
    title: {
      vi: 'Mỗi người là duy nhất',
      en: 'Uniquely Yours',
      fr: 'Unique à vous',
      cn: '独一无二',
      ar: 'فريد من نوعه',
    },
    body: {
      vi: 'Không có "một cỡ vừa tất cả". Facial của bạn là kết quả của 12 chỉ số sinh học riêng biệt, kết hợp với lịch sử da và mục tiêu thẩm mỹ cá nhân. Protocol thay đổi theo từng buổi.',
      en: 'No "one size fits all". Your facial is the result of 12 unique biological metrics, combined with skin history and personal aesthetic goals. Protocol evolves with each session.',
      fr: "Pas de « taille unique ». Votre soin du visage est le résultat de 12 métriques biologiques uniques, combinées à l'historique de la peau et aux objectifs esthétiques personnels. Le protocole évolue à chaque séance.",
      cn: '没有"一刀切"。您的面部护理是12项独特生物指标的结果，结合皮肤病史和个人美学目标。每次疗程方案都会演进。',
      ar: 'لا يوجد "حجم واحد يناسب الجميع". العناية ببشرتك هي نتاج 12 مؤشرًا بيولوجيًا فريدًا، مقترنًا بتاريخ البشرة والأهداف الجمالية الشخصية. يتطور البروتوكول مع كل جلسة.',
    },
    color: ROSE_GOLD,
  },
  {
    icon: 'solar:shield-check-bold-duotone',
    title: {
      vi: 'Minh bạch tuyệt đối',
      en: 'Radical Transparency',
      fr: 'Transparence radicale',
      cn: '绝对透明',
      ar: 'شفافية مطلقة',
    },
    body: {
      vi: 'Báo cáo trước/sau chi tiết trong app — bạn nhìn thấy từng thay đổi, từng số liệu. Không che giấu, không thổi phồng. Kết quả thực tế, hình ảnh chứng minh.',
      en: 'Detailed before/after report in the app — you see every change, every metric. No hiding, no exaggeration. Real results, proven imagery.',
      fr: "Rapport détaillé avant/après dans l'application — vous voyez chaque changement, chaque métrique. Pas de dissimulation, pas d'exagération. Résultats réels, images probantes.",
      cn: 'App中有详细的前后对比报告——您能看到每一个变化、每一项数据。不隐瞒、不夸大。真实结果，有图有真相。',
      ar: 'تقرير قبل/بعد مفصل في التطبيق — ترى كل تغيير وكل رقم. لا إخفاء ولا مبالغة. نتائج حقيقية، صور مثبتة.',
    },
    color: '#7ECEF4',
  },
  {
    icon: 'solar:infinity-bold-duotone',
    title: {
      vi: 'Không ngừng tiến hóa',
      en: 'Ever-Evolving',
      fr: 'Toujours en évolution',
      cn: '持续进化',
      ar: 'تطور مستمر',
    },
    body: {
      vi: 'Công nghệ làm đẹp thay đổi từng tháng. Chúng tôi liên tục cập nhật thiết bị, training đội ngũ và protocol. Bạn luôn được trải nghiệm những gì tốt nhất hiện có.',
      en: 'Beauty technology changes monthly. We continuously update equipment, train staff and protocols. You always experience the best available.',
      fr: "La technologie de beauté change chaque mois. Nous mettons continuellement à jour l'équipement, formons le personnel et les protocoles. Vous vivez toujours le meilleur disponible.",
      cn: '美容科技日新月异。我们持续更新设备、培训团队和方案。您总是能体验当下最好的。',
      ar: 'تقنيات التجميل تتغير شهريًا. نحدّث باستمرار المعدات وندرب الفريق والبروتوكولات. أنت تحصل دائمًا على الأفضل المتاح.',
    },
    color: '#C77DFF',
  },
];

const QUOTE = {
  text: {
    vi: 'Vẻ đẹp thực sự không phải là che phủ — mà là đánh thức những gì đã có sẵn bên trong bạn.',
    en: 'True beauty is not about covering up — it is about awakening what already exists within you.',
    fr: "La vraie beauté n'est pas de dissimuler — c'est d'éveiller ce qui existe déjà en vous.",
    cn: '真正的美不是遮盖，而是唤醒你内在已有的东西。',
    ar: 'الجمال الحقيقي ليس إخفاءً — بل إيقاظ ما يوجد بالفعل في داخلك.',
  },
  author: {
    vi: 'Triết lý Pearl Luminary',
    en: 'Pearl Luminary Philosophy',
    fr: 'Philosophie Pearl Luminary',
    cn: 'Pearl Luminary 理念',
    ar: 'فلسفة Pearl Luminary',
  },
};

export function Spa12Philosophy() {
  const { currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#050C16' }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Hero Quote */}
        <Box sx={{ mb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Box
            component={m.div}
            variants={varFade({ distance: 30 }).inUp}
            sx={{
              maxWidth: 720,
              mx: 'auto',
              position: 'relative',
              '&::before': {
                content: '"❝"',
                position: 'absolute',
                top: -20,
                left: -10,
                fontSize: 80,
                color: `${CHAMPAGNE}20`,
                fontFamily: 'serif',
              },
              '&::after': {
                content: '"❞"',
                position: 'absolute',
                bottom: -40,
                right: -10,
                fontSize: 80,
                color: `${CHAMPAGNE}20`,
                fontFamily: 'serif',
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: PEARL_WHITE,
                fontWeight: 400,
                lineHeight: 1.5,
                fontStyle: 'italic',
                fontSize: { xs: 22, md: 32 },
              }}
            >
              {QUOTE.text[lang]}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: CHAMPAGNE,
                display: 'block',
                mt: 3,
                letterSpacing: 3,
                fontWeight: 700,
              }}
            >
              — {QUOTE.author[lang]}
            </Typography>
          </Box>
        </Box>

        {/* Philosophy Grid */}
        <Grid container spacing={3}>
          {PHILOSOPHY_POINTS.map((point, idx) => (
            <Grid key={point.title.en} item xs={12} sm={6}>
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
                      borderColor: point.color,
                      transform: 'translateY(-6px)',
                      boxShadow: `0 24px 60px ${point.color}12`,
                    },
                  }}
                >
                  <Stack spacing={2.5} sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2.5,
                        bgcolor: `${point.color}12`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${point.color}30`,
                      }}
                    >
                      <Iconify icon={point.icon} width={28} sx={{ color: point.color }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ color: point.color, fontWeight: 900, letterSpacing: 0.5 }}
                    >
                      {point.title[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(249,246,238,0.45)', lineHeight: 1.85, flex: 1 }}
                    >
                      {point.body[lang]}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA Banner */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: `linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(183,110,121,0.06) 100%)`,
            border: `1px solid rgba(212,175,55,0.15)`,
            textAlign: 'center',
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify
                icon="solar:verified-check-bold-duotone"
                sx={{ color: CHAMPAGNE, fontSize: 24 }}
              />
              <Typography
                variant="overline"
                sx={{ color: CHAMPAGNE, letterSpacing: 3, fontWeight: 700 }}
              >
                {
                  (
                    {
                      en: 'CERTIFIED EXCELLENCE',
                      vi: 'CHỨNG NHẬN XUẤT SẮC',
                      fr: 'EXCELLENCE CERTIFIÉE',
                      cn: '卓越认证',
                      ar: 'التميز المعتمد',
                    } as const
                  )[lang]
                }
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(249,246,238,0.6)', maxWidth: 560, lineHeight: 1.8 }}
            >
              {
                (
                  {
                    en: 'Our protocols are developed in collaboration with Seoul National University Hospital Dermatology Department and reviewed annually by the International Association of Applied Aesthetics.',
                    vi: 'Protocol của chúng tôi được phát triển hợp tác cùng khoa da liễu Bệnh viện Đại học Quốc gia Seoul và được Hiệp hội Thẩm mỹ Ứng dụng Quốc tế rà soát hàng năm.',
                    fr: "Nos protocoles sont développés en collaboration avec le département de dermatologie de l'hôpital de l'Université nationale de Séoul et révisés annuellement par l'Association internationale de l'esthétique appliquée.",
                    cn: '我们的方案与首尔国立大学医院皮肤科合作开发，并由国际应用美容协会每年审核。',
                    ar: 'يتم تطوير بروتوكولاتنا بالتعاون مع قسم الأمراض الجلدية في مستشفى جامعة سيول الوطنية وتراجعها سنويًا الجمعية الدولية للجمال التطبيقي.',
                  } as const
                )[lang]
              }
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
