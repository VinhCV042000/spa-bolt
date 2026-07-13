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

const TEAM_MEMBERS = [
  {
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    name: 'Dr. Lê Minh Tâm',
    title: {
      vi: 'Giám đốc Y khoa',
      en: 'Medical Director',
      fr: 'Directrice médicale',
      cn: '医疗总监',
      ar: 'المدير الطبي',
    },
    specialty: {
      vi: 'Da liễu thẩm mỹ · 18 năm kinh nghiệm',
      en: 'Aesthetic dermatology · 18 years experience',
      fr: "Dermatologie esthétique · 18 ans d'expérience",
      cn: '美容皮肤科 · 18年经验',
      ar: 'جلدية تجميلية · 18 سنة خبرة',
    },
    credentials: [
      'Board-certified dermatologist',
      'Former Seoul National University Hospital',
      'VISIA expert certification',
    ],
    color: CHAMPAGNE,
  },
  {
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    name: 'Dr. Park Ji-eun',
    title: {
      vi: 'Chuyên gia LED Protocol',
      en: 'LED Protocol Specialist',
      fr: 'Spécialiste protocole LED',
      cn: 'LED方案专家',
      ar: 'أخصائي بروتوكول LED',
    },
    specialty: {
      vi: 'Phototherapy · K-beauty protocols',
      en: 'Phototherapy · K-beauty protocols',
      fr: 'Photothérapie · Protocoles K-beauty',
      cn: '光疗 · 韩式美容方案',
      ar: 'العلاج الضوئي · بروتوكولات الجمال الكوري',
    },
    credentials: [
      'LED Academy Korea certified',
      '12 years clinical experience',
      'Author of LED therapy protocols',
    ],
    color: ROSE_GOLD,
  },
  {
    img: 'https://images.unsplash.com/photo-1594824476967-48c706ec3e2c?w=400&q=80',
    name: 'Nguyễn Thanh Hương',
    title: {
      vi: 'Lead Aesthetician',
      en: 'Lead Aesthetician',
      fr: 'Esthéticienne principale',
      cn: '首席美容师',
      ar: 'خبيرة التجميل الرئيسية',
    },
    specialty: {
      vi: 'Chăm sóc da cao cấp · 10 năm',
      en: 'Luxury skincare · 10 years',
      fr: 'Soins de luxe · 10 ans',
      cn: '奢华护肤 · 10年',
      ar: 'العناية الفاخرة · 10 سنوات',
    },
    credentials: ['CIDESCO certified', 'Pearl facial specialist', 'VIP client consultant'],
    color: '#7ECEF4',
  },
  {
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218b7?w=400&q=80',
    name: 'Trần Văn Đức',
    title: {
      vi: 'Spa Concierge Manager',
      en: 'Spa Concierge Manager',
      fr: 'Responsable conciergerie spa',
      cn: '水疗礼宾经理',
      ar: 'مدير خدمات الضيافة',
    },
    specialty: {
      vi: 'Trải nghiệm khách hàng · CRM',
      en: 'Guest experience · CRM',
      fr: 'Expérience client · CRM',
      cn: '客户体验 · 客户关系管理',
      ar: 'تجربة الضيوف · إدارة العلاقات',
    },
    credentials: ['Hospitality management', 'VIP relations expert', '5-star service trained'],
    color: '#C77DFF',
  },
];

// ----------------------------------------------------------------------

export function Spa12Team() {
  const { currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#040D18' }}>
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
                  vi: 'ĐỘI NGŨ CHUYÊN GIA',
                  en: 'EXPERT TEAM',
                  fr: "ÉQUIPE D'EXPERTS",
                  cn: '专家团队',
                  ar: 'فريق الخبراء',
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
                  vi: 'Bác sĩ Hàn,',
                  en: 'Korean doctors,',
                  fr: 'Médecins coréens,',
                  cn: '韩国医生，',
                  ar: 'أطباء كوريون،',
                }[lang]
              }{' '}
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {
                  {
                    vi: 'tay nghề Việt',
                    en: 'Vietnamese skill',
                    fr: 'savoir-faire vietnamien',
                    cn: '越南技艺',
                    ar: 'موهبة فيتنامية',
                  }[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(249,246,238,0.4)',
                maxWidth: 520,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              {
                {
                  vi: 'Đội ngũ bác sĩ da liễu và chuyên gia thẩm mỹ được đào tạo bài bản từ Seoul, Tokyo và New York — mang đến tiêu chuẩn y khoa quốc tế.',
                  en: 'Our dermatologists and aesthetic specialists trained in Seoul, Tokyo and New York — bringing international medical standards to Vietnam.',
                  fr: 'Nos dermatologues et spécialistes esthétiques formés à Séoul, Tokyo et New York — apportant les normes médicales internationales au Vietnam.',
                  cn: '我们的皮肤科医生和美容专家曾在首尔、东京和纽约接受培训——将国际医疗标准带到越南。',
                  ar: 'أطباء الجلدية وأخصائيو التجميل لدينا تدربوا في سيول وطوكيو ونيويورك — جالبين معايير طبية دولية إلى فيتنام.',
                }[lang]
              }
            </Typography>
          </Box>
        </Stack>

        {/* Team Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' },
            gap: 3,
          }}
        >
          {TEAM_MEMBERS.map((member, index) => (
            <Box
              key={member.name}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: DEEP_NAVY,
                border: `1px solid rgba(212,175,55,0.08)`,
                transition: 'all 0.35s ease',
                '&:hover': {
                  borderColor: member.color,
                  transform: 'translateY(-6px)',
                  boxShadow: `0 24px 60px ${member.color}12`,
                  '& .member-img': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              {/* Image */}
              <Box sx={{ overflow: 'hidden' }}>
                <Box
                  className="member-img"
                  component="img"
                  src={member.img}
                  alt={member.name}
                  sx={{
                    width: '100%',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
              </Box>

              {/* Info */}
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: member.color,
                    letterSpacing: 2,
                    fontWeight: 700,
                    fontSize: 10,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography variant="h6" sx={{ color: PEARL_WHITE, fontWeight: 900, mt: 1 }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" sx={{ color: member.color, fontWeight: 600, mt: 0.5 }}>
                  {member.title[lang]}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(249,246,238,0.45)', display: 'block', mt: 1 }}
                >
                  {member.specialty[lang]}
                </Typography>

                {/* Credentials */}
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid rgba(212,175,55,0.08)`,
                  }}
                >
                  {member.credentials.map((cred, i) => (
                    <Stack
                      key={cred}
                      direction="row"
                      spacing={1}
                      alignItems="flex-start"
                      sx={{ mb: i < member.credentials.length - 1 ? 1 : 0 }}
                    >
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={14}
                        sx={{ color: member.color, mt: 0.25 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: 'rgba(249,246,238,0.4)', fontSize: 11 }}
                      >
                        {cred}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom CTA */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${CHAMPAGNE}08 0%, ${ROSE_GOLD}06 100%)`,
            border: `1px solid rgba(212,175,55,0.12)`,
            textAlign: 'center',
          }}
        >
          <Stack spacing={1.5} alignItems="center">
            <Iconify
              icon="solar:shield-check-bold-duotone"
              sx={{ color: CHAMPAGNE, fontSize: 32 }}
            />
            <Typography variant="subtitle2" sx={{ color: CHAMPAGNE }}>
              {
                {
                  vi: 'CHỨNG NHẬN & CREDENTIALS',
                  en: 'CERTIFIED & CREDENTIALS',
                  fr: 'CERTIFIÉS & CREDENTIALS',
                  cn: '认证与资质',
                  ar: 'معتمدون ومؤهلون',
                }[lang]
              }
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(249,246,238,0.5)', maxWidth: 480, lineHeight: 1.8 }}
            >
              {
                {
                  vi: 'Tất cả bác sĩ được cấp phép bởi Bộ Y Tế Việt Nam. Các thiết bị đạt FDA (Mỹ), CE (Châu Âu) và KFDA (Hàn Quốc) chứng nhận.',
                  en: 'All doctors are licensed by Vietnam Ministry of Health. Equipment is FDA (USA), CE (Europe) and KFDA (Korea) certified.',
                  fr: 'Tous les médecins sont agréés par le ministère vietnamien de la Santé. Les équipements sont certifiés FDA (USA), CE (Europe) et KFDA (Corée).',
                  cn: '所有医生均获越南卫生部颁发执照。设备通过FDA（美国）、CE（欧洲）和KFDA（韩国）认证。',
                  ar: 'جميع الأطباء مرخصون من وزارة الصحة فيتنام. المعدات معتمدة من FDA وCE وKFDA.',
                }[lang]
              }
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
