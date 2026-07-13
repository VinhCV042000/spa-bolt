import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import {
  spa1Meta,
  spa1Faqs,
  SPA1_DARK,
  SPA1_GOLD,
  spa1Offers,
  spa1Gallery,
  spa1Careers,
  spa1Branches,
  spa1Partners,
  spa1Services,
  spa1Policies,
  spa1BlogPosts,
  spa1Feedbacks,
  SPA1_DARK_ALT,
  spa1Treatments,
  spa1Promotions,
  SPA1_GOLD_SOFT,
  spa1ContactInfo,
  spa1BeforeAfters,
  SPA1_PAGE_IMAGES,
  spa1TrainingPrograms,
} from '../spa1-pages-data';

import type { Spa1Lang } from '../spa1-pages-data';

// ----------------------------------------------------------------------

function useSpa1Lang(): Spa1Lang {
  const { currentLang } = useTranslate();
  return currentLang.value as Spa1Lang;
}

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------

function Spa1PageHero({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 14, md: 20 },
        color: 'common.white',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(135deg, rgba(14,14,16,0.92) 0%, rgba(14,14,16,0.60) 100%), url(${image})`,
      }}
    >
      <Container>
        <Stack spacing={3} sx={{ maxWidth: 760 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 40, height: '1px', bgcolor: SPA1_GOLD }} />
            <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
              Luxe Spa
            </Typography>
          </Stack>
          <Typography variant="h1" sx={{ fontWeight: 'fontWeightMedium' }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.76, lineHeight: 1.7 }}>
            {subtitle}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={RouterLink}
              href={paths.spa1.booking}
              size="large"
              sx={{
                px: 4,
                borderRadius: 0,
                color: 'common.black',
                bgcolor: SPA1_GOLD,
                '&:hover': { bgcolor: SPA1_GOLD_SOFT },
              }}
            >
              {
                (
                  {
                    en: 'Book now',
                    vi: 'Đặt lịch ngay',
                    fr: 'Réserver',
                    cn: '立即预约',
                    ar: 'احجز الآن',
                  } as const
                )[useSpa1Lang()]
              }
            </Button>
            <Button
              component={RouterLink}
              href={paths.spa1.contact}
              size="large"
              sx={{
                px: 4,
                borderRadius: 0,
                color: 'common.white',
                border: '1px solid rgba(255,255,255,0.3)',
                '&:hover': { borderColor: 'common.white' },
              }}
            >
              {
                ({ en: 'Contact', vi: 'Liên hệ', fr: 'Contact', cn: '联系', ar: 'اتصال' } as const)[
                  useSpa1Lang()
                ]
              }
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function Spa1SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <Stack
      spacing={2}
      sx={{ mb: 6, textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start' }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ justifyContent: align }}>
        <Box sx={{ width: 32, height: '1px', bgcolor: SPA1_GOLD }} />
        <Typography variant="overline" sx={{ color: SPA1_GOLD, letterSpacing: 3 }}>
          {eyebrow}
        </Typography>
      </Stack>
      <Typography variant="h2" sx={{ color: 'common.white' }}>
        {title}
      </Typography>
      {subtitle && <Typography sx={{ maxWidth: 720, color: 'grey.500' }}>{subtitle}</Typography>}
    </Stack>
  );
}

function Spa1CtaBanner() {
  const lang = useSpa1Lang();

  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <Card
        sx={{
          p: { xs: 3, md: 5 },
          color: 'common.white',
          background: `linear-gradient(135deg, ${SPA1_DARK_ALT} 0%, ${SPA1_DARK} 100%)`,
          border: `1px solid ${SPA1_GOLD}`,
          borderRadius: 0,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ color: SPA1_GOLD }}>
              {
                (
                  {
                    en: 'Experience luxury today',
                    vi: 'Trải nghiệm đẳng cấp ngay hôm nay',
                    fr: 'Vivez le luxe dès aujourd\u2019hui',
                    cn: '今天就体验奢华',
                    ar: 'استمتع بالرفاهية اليوم',
                  } as const
                )[lang]
              }
            </Typography>
            <Typography sx={{ color: 'grey.400' }}>
              {
                (
                  {
                    en: 'Book now for exclusive first-visit offers at Luxe Spa.',
                    vi: 'Đặt lịch để nhận ưu đãi đặc biệt cho lần đầu đến Luxe Spa.',
                    fr: 'Réservez maintenant pour des offres exclusives de première visite à Luxe Spa.',
                    cn: '立即预约，享受 Luxe Spa 首次到访专属优惠。',
                    ar: 'احجز الآن للحصول على عروض حصرية لأول زيارة في Luxe Spa.',
                  } as const
                )[lang]
              }
            </Typography>
          </Stack>
          <Button
            component={RouterLink}
            href={paths.spa1.booking}
            size="large"
            sx={{
              px: 4,
              borderRadius: 0,
              color: 'common.black',
              bgcolor: SPA1_GOLD,
              '&:hover': { bgcolor: SPA1_GOLD_SOFT },
            }}
          >
            {
              (
                {
                  en: 'Book now',
                  vi: 'Đặt lịch ngay',
                  fr: 'Réserver',
                  cn: '立即预约',
                  ar: 'احجز الآن',
                } as const
              )[lang]
            }
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

// ==============================================================================
// PAGE VIEWS
// ==============================================================================

// 1. ABOUT
export function Spa1AboutPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.about;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.aboutHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Spa1SectionTitle
          eyebrow={
            (
              {
                en: 'Our story',
                vi: 'Câu chuyện',
                fr: 'Notre histoire',
                cn: '我们的故事',
                ar: 'قصتنا',
              } as const
            )[lang]
          }
          title={
            (
              {
                en: 'The Luxe Spa journey',
                vi: 'Hành trình Luxe Spa',
                fr: 'Le parcours Luxe Spa',
                cn: 'Luxe Spa 之旅',
                ar: 'رحلة Luxe Spa',
              } as const
            )[lang]
          }
          subtitle={
            (
              {
                en: 'Born from a passion for wellness, Luxe Spa grew into a premium chain with a distinctive style.',
                vi: 'Khởi đầu từ niềm đam mê chăm sóc sức khỏe, Luxe Spa đã phát triển thành chuỗi spa cao cấp với phong cách độc đáo.',
                fr: 'Né d’une passion pour le bien-être, Luxe Spa est devenu une chaîne haut de gamme au style distinctif.',
                cn: '源于对健康的热爱，Luxe Spa 发展成为风格独特的高端连锁品牌。',
                ar: 'ولدت Luxe Spa من شغف بالعافية، ونمت لتصبح سلسلة راقية بأسلوب مميز.',
              } as const
            )[lang]
          }
        />

        <Grid container spacing={4}>
          {[
            {
              icon: 'solar:star-bold',
              num: '8+',
              label: (
                {
                  en: 'Years of experience',
                  vi: 'Năm kinh nghiệm',
                  fr: 'Années d’expérience',
                  cn: '年经验',
                  ar: 'سنوات الخبرة',
                } as const
              )[lang],
            },
            {
              icon: 'solar:users-group-rounded-bold',
              num: '50K+',
              label: (
                {
                  en: 'Happy clients',
                  vi: 'Khách hàng hài lòng',
                  fr: 'Clients satisfaits',
                  cn: '满意客户',
                  ar: 'عملاء سعداء',
                } as const
              )[lang],
            },
            {
              icon: 'solar:home-2-bold',
              num: '5',
              label: (
                {
                  en: 'Branches',
                  vi: 'Chi nhánh',
                  fr: 'Succursales',
                  cn: '分店',
                  ar: 'فروع',
                } as const
              )[lang],
            },
            {
              icon: 'solar:medal-ribbons-star-bold',
              num: '15+',
              label: (
                {
                  en: 'Awards',
                  vi: 'Giải thưởng',
                  fr: 'Récompenses',
                  cn: '奖项',
                  ar: 'جوائز',
                } as const
              )[lang],
            },
          ].map((item) => (
            <Grid xs={6} md={3} key={item.label}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: SPA1_DARK_ALT,
                  border: `1px solid rgba(200,161,90,0.2)`,
                  borderRadius: 0,
                }}
              >
                <Iconify icon={item.icon} width={40} sx={{ color: SPA1_GOLD, mb: 1 }} />
                <Typography variant="h3" sx={{ color: 'common.white' }}>
                  {item.num}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.500' }}>
                  {item.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack spacing={3} sx={{ mt: 8, maxWidth: 800, mx: 'auto' }}>
          <Typography sx={{ color: 'grey.300', lineHeight: 2 }}>
            {
              (
                {
                  en: 'Luxe Spa was founded on the philosophy "Care from the heart, serve through artistry." We combine traditional therapy techniques with modern technology, delivering a 5-star spa experience. Our therapists are professionally trained and use premium products from leading international brands.',
                  vi: 'Luxe Spa được thành lập với triết lý "Chăm sóc từ tâm, phục vụ bằng nghệ thuật". Chúng tôi kết hợp giữa kỹ thuật trị liệu truyền thống và công nghệ hiện đại, mang đến trải nghiệm spa đẳng cấp 5 sao. Đội ngũ kỹ thuật viên được đào tạo bài bản, sử dụng mỹ phẩm cao cấp từ các thương hiệu quốc tế hàng đầu.',
                  fr: 'Luxe Spa a été fondé sur la philosophie « Prendre soin avec le cœur, servir avec art ». Nous combinons des techniques de thérapie traditionnelles avec une technologie moderne, offrant une expérience spa 5 étoiles. Nos thérapeutes sont formés professionnellement et utilisent des produits haut de gamme de grandes marques internationales.',
                  cn: 'Luxe Spa 秉持“用心关怀，以艺服务”的理念创立。我们将传统理疗技术与现代科技相结合，提供五星级水疗体验。我们的理疗师经过专业培训，使用国际顶级品牌的高端产品。',
                  ar: 'تأسست Luxe Spa على فلسفة "العناية من القلب، والخدمة بفن". ندمج تقنيات العلاج التقليدية مع التكنولوجيا الحديثة، لنقدم تجربة سبا بخمس نجوم. خبراؤنا مدربون احترافيًا ويستخدمون منتجات راقية من أشهر العلامات التجارية العالمية.',
                } as const
              )[lang]
            }
          </Typography>
          <Typography sx={{ color: 'grey.300', lineHeight: 2 }}>
            {
              (
                {
                  en: 'With an expanding branch network, every Luxe Spa space is designed in minimalist luxury style, creating an atmosphere of absolute relaxation from the moment guests arrive until they leave.',
                  vi: 'Với hệ thống chi nhánh trải rộng, mỗi không gian Luxe Spa đều được thiết kế theo phong cách sang trọng tối giản, tạo nên môi trường thư giãn tuyệt đối cho khách hàng từ lúc bước vào cho đến khi ra về.',
                  fr: 'Avec un réseau de succursales en expansion, chaque espace Luxe Spa est conçu dans un style de luxe minimaliste, créant une atmosphère de détente absolue dès l’arrivée des clients jusqu’à leur départ.',
                  cn: '随着分店网络不断扩展，每个 Luxe Spa 空间都采用极简奢华风格设计，从客人踏入到离开，营造绝对放松的氛围。',
                  ar: 'مع شبكة فروع متوسعة، صُمّم كل فضاء في Luxe Spa بأسلوب فاخر بسيط، مما يخلق أجواء من الاسترخاء التام منذ لحظة وصول الضيوف حتى مغادرتهم.',
                } as const
              )[lang]
            }
          </Typography>
        </Stack>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 2. SERVICES
export function Spa1ServicesPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.services;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.servicesHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Spa1SectionTitle
          eyebrow={
            ({ en: 'Services', vi: 'Dịch vụ', fr: 'Services', cn: '服务', ar: 'الخدمات' } as const)[
              lang
            ]
          }
          title={
            (
              {
                en: 'Our services',
                vi: 'Danh mục dịch vụ',
                fr: 'Nos services',
                cn: '服务项目',
                ar: 'قائمة الخدمات',
              } as const
            )[lang]
          }
        />

        <Grid container spacing={3}>
          {spa1Services.map((service) => (
            <Grid xs={12} sm={6} md={4} key={service.slug}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                  transition: 'border-color 0.3s',
                  '&:hover': { borderColor: SPA1_GOLD },
                }}
              >
                <Box
                  component="img"
                  src={service.image}
                  alt={service.title[lang]}
                  sx={{ width: 1, height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon={service.icon} width={24} sx={{ color: SPA1_GOLD }} />
                      <Typography variant="h6" sx={{ color: 'common.white' }}>
                        {service.title[lang]}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                      {service.subtitle[lang]}
                    </Typography>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        {service.duration[lang]}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: SPA1_GOLD }}>
                        {service.price[lang]}
                      </Typography>
                    </Stack>
                    <Button
                      component={RouterLink}
                      href={paths.spa1.serviceDetails(service.slug)}
                      size="small"
                      sx={{
                        color: SPA1_GOLD,
                        justifyContent: 'flex-start',
                        px: 0,
                        '&:hover': { bgcolor: 'transparent', color: SPA1_GOLD_SOFT },
                      }}
                      endIcon={<Iconify icon="solar:arrow-right-linear" />}
                    >
                      {
                        (
                          {
                            en: 'View details',
                            vi: 'Xem chi tiết',
                            fr: 'Voir les détails',
                            cn: '查看详情',
                            ar: 'عرض التفاصيل',
                          } as const
                        )[lang]
                      }
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 3. SERVICE DETAILS
export function Spa1ServiceDetailsPageView() {
  const lang = useSpa1Lang();
  const { slug } = useParams();
  const service = spa1Services.find((s) => s.slug === slug) || spa1Services[0];

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={service.image}
        title={service.title[lang]}
        subtitle={service.description[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          <Grid xs={12} md={8}>
            <Stack spacing={4}>
              <Box>
                <Spa1SectionTitle
                  eyebrow={
                    (
                      {
                        en: 'Process',
                        vi: 'Quy trình',
                        fr: 'Processus',
                        cn: '流程',
                        ar: 'الإجراء',
                      } as const
                    )[lang]
                  }
                  title={
                    (
                      {
                        en: 'Treatment steps',
                        vi: 'Các bước thực hiện',
                        fr: 'Étapes du soin',
                        cn: '疗程步骤',
                        ar: 'خطوات العلاج',
                      } as const
                    )[lang]
                  }
                  align="left"
                />
                {service.process[lang].map((step, idx) => (
                  <Stack key={idx} direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        minWidth: 32,
                        height: 32,
                        borderRadius: 0,
                        bgcolor: SPA1_GOLD,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: 'common.black' }}>
                        {idx + 1}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'grey.300', pt: 0.5 }}>{step}</Typography>
                  </Stack>
                ))}
              </Box>

              <Box>
                <Spa1SectionTitle
                  eyebrow={
                    (
                      {
                        en: 'Results',
                        vi: 'Kết quả',
                        fr: 'Résultats',
                        cn: '效果',
                        ar: 'النتائج',
                      } as const
                    )[lang]
                  }
                  title={
                    (
                      {
                        en: 'Expected outcomes',
                        vi: 'Hiệu quả mang lại',
                        fr: 'Résultats attendus',
                        cn: '预期效果',
                        ar: 'النتائج المتوقعة',
                      } as const
                    )[lang]
                  }
                  align="left"
                />
                {service.outcomes[lang].map((outcome, idx) => (
                  <Stack key={idx} direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Iconify icon="solar:check-circle-bold" sx={{ color: SPA1_GOLD, mt: 0.3 }} />
                    <Typography sx={{ color: 'grey.300' }}>{outcome}</Typography>
                  </Stack>
                ))}
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                bgcolor: SPA1_DARK_ALT,
                border: `1px solid ${SPA1_GOLD}`,
                borderRadius: 0,
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h5" sx={{ color: SPA1_GOLD }}>
                  {
                    (
                      {
                        en: 'Service info',
                        vi: 'Thông tin dịch vụ',
                        fr: 'Infos du service',
                        cn: '服务信息',
                        ar: 'معلومات الخدمة',
                      } as const
                    )[lang]
                  }
                </Typography>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ color: 'grey.400' }}>
                    {
                      (
                        {
                          en: 'Duration',
                          vi: 'Thời gian',
                          fr: 'Durée',
                          cn: '时长',
                          ar: 'المدة',
                        } as const
                      )[lang]
                    }
                  </Typography>
                  <Typography sx={{ color: 'common.white' }}>{service.duration[lang]}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ color: 'grey.400' }}>
                    {
                      ({ en: 'Price', vi: 'Giá', fr: 'Prix', cn: '价格', ar: 'السعر' } as const)[
                        lang
                      ]
                    }
                  </Typography>
                  <Typography sx={{ color: SPA1_GOLD, fontWeight: 'bold' }}>
                    {service.price[lang]}
                  </Typography>
                </Stack>
                <Button
                  component={RouterLink}
                  href={paths.spa1.booking}
                  fullWidth
                  size="large"
                  sx={{
                    mt: 2,
                    borderRadius: 0,
                    color: 'common.black',
                    bgcolor: SPA1_GOLD,
                    '&:hover': { bgcolor: SPA1_GOLD_SOFT },
                  }}
                >
                  {
                    (
                      {
                        en: 'Book now',
                        vi: 'Đặt lịch ngay',
                        fr: 'Réserver',
                        cn: '立即预约',
                        ar: 'احجز الآن',
                      } as const
                    )[lang]
                  }
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 4. TRAINING
export function Spa1TrainingPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.training;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.trainingHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Spa1SectionTitle
          eyebrow={
            (
              { en: 'Training', vi: 'Đào tạo', fr: 'Formation', cn: '培训', ar: 'التدريب' } as const
            )[lang]
          }
          title={
            (
              {
                en: 'Training programs',
                vi: 'Chương trình đào tạo',
                fr: 'Programmes de formation',
                cn: '培训课程',
                ar: 'برامج التدريب',
              } as const
            )[lang]
          }
        />

        <Grid container spacing={3}>
          {spa1TrainingPrograms.map((program, idx) => (
            <Grid xs={12} md={4} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" sx={{ color: 'common.white' }}>
                    {program.title[lang]}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      label={program.duration[lang]}
                      size="small"
                      sx={{ bgcolor: 'rgba(200,161,90,0.15)', color: SPA1_GOLD, borderRadius: 0 }}
                    />
                    <Chip
                      label={program.level[lang]}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'grey.400', borderRadius: 0 }}
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {program.description[lang]}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                  <Typography variant="subtitle2" sx={{ color: SPA1_GOLD }}>
                    {
                      (
                        {
                          en: 'Key modules:',
                          vi: 'Nội dung chính:',
                          fr: 'Modules clés :',
                          cn: '主要内容：',
                          ar: 'الوحدات الرئيسية:',
                        } as const
                      )[lang]
                    }
                  </Typography>
                  {program.modules[lang].map((mod, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={16}
                        sx={{ color: SPA1_GOLD }}
                      />
                      <Typography variant="body2" sx={{ color: 'grey.300' }}>
                        {mod}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 5. BLOG
export function Spa1BlogPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.blog;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.blogHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spa1BlogPosts.map((post) => (
            <Grid xs={12} md={4} key={post.slug}>
              <Card
                sx={{
                  height: '100%',
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                }}
              >
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title[lang]}
                  sx={{ width: 1, height: 200, objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={1.5}>
                    <Chip
                      label={post.category[lang]}
                      size="small"
                      sx={{
                        width: 'fit-content',
                        bgcolor: 'rgba(200,161,90,0.15)',
                        color: SPA1_GOLD,
                        borderRadius: 0,
                      }}
                    />
                    <Typography variant="h6" sx={{ color: 'common.white' }}>
                      {post.title[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.500' }}>
                      {post.excerpt[lang]}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ color: 'grey.600' }}>
                        {post.readTime[lang]}
                      </Typography>
                      <Button
                        component={RouterLink}
                        href={paths.spa1.blogDetails(post.slug)}
                        size="small"
                        sx={{ color: SPA1_GOLD, '&:hover': { color: SPA1_GOLD_SOFT } }}
                        endIcon={<Iconify icon="solar:arrow-right-linear" />}
                      >
                        {
                          (
                            {
                              en: 'Read more',
                              vi: 'Đọc thêm',
                              fr: 'Lire la suite',
                              cn: '阅读更多',
                              ar: 'اقرأ المزيد',
                            } as const
                          )[lang]
                        }
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 5b. BLOG DETAILS
export function Spa1BlogDetailsPageView() {
  const lang = useSpa1Lang();
  const { slug } = useParams();
  const post = spa1BlogPosts.find((p) => p.slug === slug) || spa1BlogPosts[0];

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero image={post.image} title={post.title[lang]} subtitle={post.excerpt[lang]} />

      <Container sx={{ py: { xs: 8, md: 12 }, maxWidth: 'md' }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip
              label={post.category[lang]}
              size="small"
              sx={{ bgcolor: 'rgba(200,161,90,0.15)', color: SPA1_GOLD, borderRadius: 0 }}
            />
            <Typography variant="caption" sx={{ color: 'grey.500' }}>
              {post.readTime[lang]}
            </Typography>
          </Stack>
          {post.body[lang].map((paragraph, idx) => (
            <Typography key={idx} sx={{ color: 'grey.300', lineHeight: 2, fontSize: 16 }}>
              {paragraph}
            </Typography>
          ))}
        </Stack>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 6. CAREERS
export function Spa1CareersPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.careers;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.careersHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Spa1SectionTitle
          eyebrow={
            (
              {
                en: 'Opportunities',
                vi: 'Cơ hội',
                fr: 'Opportunités',
                cn: '机会',
                ar: 'الفرص',
              } as const
            )[lang]
          }
          title={
            (
              {
                en: 'Open positions',
                vi: 'Vị trí đang tuyển',
                fr: 'Postes ouverts',
                cn: '招聘职位',
                ar: 'الوظائف الشاغرة',
              } as const
            )[lang]
          }
        />

        <Stack spacing={3}>
          {spa1Careers.map((job, idx) => (
            <Card
              key={idx}
              sx={{
                p: 3,
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.15)',
                borderRadius: 0,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid xs={12} md={4}>
                  <Typography variant="h6" sx={{ color: 'common.white' }}>
                    {job.title[lang]}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label={job.department[lang]}
                      size="small"
                      sx={{ bgcolor: 'rgba(200,161,90,0.15)', color: SPA1_GOLD, borderRadius: 0 }}
                    />
                    <Chip
                      label={job.type[lang]}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'grey.400', borderRadius: 0 }}
                    />
                  </Stack>
                </Grid>
                <Grid xs={12} md={8}>
                  <Typography variant="subtitle2" sx={{ color: 'grey.400', mb: 1 }}>
                    {
                      (
                        {
                          en: 'Requirements:',
                          vi: 'Yêu cầu:',
                          fr: 'Exigences :',
                          cn: '要求：',
                          ar: 'المتطلبات:',
                        } as const
                      )[lang]
                    }
                  </Typography>
                  {job.requirements[lang].map((req, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={16}
                        sx={{ color: SPA1_GOLD }}
                      />
                      <Typography variant="body2" sx={{ color: 'grey.300' }}>
                        {req}
                      </Typography>
                    </Stack>
                  ))}
                </Grid>
              </Grid>
            </Card>
          ))}
        </Stack>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography sx={{ color: 'grey.400', mb: 2 }}>
            {
              (
                {
                  en: 'Send your CV to:',
                  vi: 'Gửi CV về email:',
                  fr: 'Envoyez votre CV à :',
                  cn: '将简历发送至：',
                  ar: 'أرسل سيرتك الذاتية إلى:',
                } as const
              )[lang]
            }
          </Typography>
          <Typography variant="h5" sx={{ color: SPA1_GOLD }}>
            {spa1ContactInfo.email}
          </Typography>
        </Box>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 7. BOOKING
export function Spa1BookingPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.booking;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.bookingHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={7}>
            <Card
              sx={{
                p: 4,
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.2)',
                borderRadius: 0,
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h4" sx={{ color: 'common.white' }}>
                  {
                    (
                      {
                        en: 'Booking information',
                        vi: 'Thông tin đặt lịch',
                        fr: 'Informations de réservation',
                        cn: '预约信息',
                        ar: 'معلومات الحجز',
                      } as const
                    )[lang]
                  }
                </Typography>
                <TextField
                  fullWidth
                  label={
                    (
                      {
                        en: 'Full name',
                        vi: 'Họ và tên',
                        fr: 'Nom complet',
                        cn: '姓名',
                        ar: 'الاسم الكامل',
                      } as const
                    )[lang]
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                />
                <TextField
                  fullWidth
                  label={
                    (
                      {
                        en: 'Phone number',
                        vi: 'Số điện thoại',
                        fr: 'Numéro de téléphone',
                        cn: '电话号码',
                        ar: 'رقم الهاتف',
                      } as const
                    )[lang]
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                />
                <TextField
                  fullWidth
                  select
                  label={
                    (
                      {
                        en: 'Select service',
                        vi: 'Chọn dịch vụ',
                        fr: 'Choisir un service',
                        cn: '选择服务',
                        ar: 'اختر الخدمة',
                      } as const
                    )[lang]
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                >
                  {spa1Services.map((s) => (
                    <MenuItem key={s.slug} value={s.slug}>
                      {s.title[lang]}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  select
                  label={
                    (
                      {
                        en: 'Select branch',
                        vi: 'Chọn chi nhánh',
                        fr: 'Choisir une succursale',
                        cn: '选择分店',
                        ar: 'اختر الفرع',
                      } as const
                    )[lang]
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                >
                  {spa1Branches.map((b, i) => (
                    <MenuItem key={i} value={b.name[lang]}>
                      {b.name[lang]}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label={
                    (
                      {
                        en: 'Notes',
                        vi: 'Ghi chú',
                        fr: 'Remarques',
                        cn: '备注',
                        ar: 'ملاحظات',
                      } as const
                    )[lang]
                  }
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                />
                <Button
                  size="large"
                  fullWidth
                  sx={{
                    borderRadius: 0,
                    color: 'common.black',
                    bgcolor: SPA1_GOLD,
                    '&:hover': { bgcolor: SPA1_GOLD_SOFT },
                  }}
                >
                  {
                    (
                      {
                        en: 'Confirm booking',
                        vi: 'Xác nhận đặt lịch',
                        fr: 'Confirmer la réservation',
                        cn: '确认预约',
                        ar: 'تأكيد الحجز',
                      } as const
                    )[lang]
                  }
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid xs={12} md={5}>
            <Stack spacing={3}>
              <Card
                sx={{
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ color: SPA1_GOLD }}>
                    {
                      (
                        {
                          en: 'Contact info',
                          vi: 'Thông tin liên hệ',
                          fr: 'Coordonnées',
                          cn: '联系信息',
                          ar: 'معلومات الاتصال',
                        } as const
                      )[lang]
                    }
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:phone-bold" sx={{ color: SPA1_GOLD }} />
                    <Typography sx={{ color: 'grey.300' }}>{spa1ContactInfo.hotline}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:letter-bold" sx={{ color: SPA1_GOLD }} />
                    <Typography sx={{ color: 'grey.300' }}>{spa1ContactInfo.email}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA1_GOLD }} />
                    <Typography sx={{ color: 'grey.300' }}>
                      {spa1ContactInfo.workingHours[lang]}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
              <Card
                sx={{
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                }}
              >
                <Typography variant="subtitle2" sx={{ color: SPA1_GOLD, mb: 1 }}>
                  {
                    (
                      {
                        en: 'Notes:',
                        vi: 'Lưu ý:',
                        fr: 'Remarques :',
                        cn: '注意事项：',
                        ar: 'ملاحظات:',
                      } as const
                    )[lang]
                  }
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400', lineHeight: 1.8 }}>
                  {
                    (
                      {
                        en: '• Please arrive 15 minutes early\n• Free cancellation 24h before\n• Comfortable attire recommended',
                        vi: '• Vui lòng đến sớm 15 phút trước giờ hẹn\n• Hủy miễn phí trước 24 giờ\n• Trang phục thoải mái được khuyến khích',
                        fr: '• Veuillez arriver 15 minutes en avance\n• Annulation gratuite 24h avant\n• Tenue confortable recommandée',
                        cn: '• 请提前 15 分钟到达\n• 提前 24 小时免费取消\n• 建议穿着舒适',
                        ar: '• يرجى الحضور قبل 15 دقيقة\n• إلغاء مجاني قبل 24 ساعة\n• يُنصح بارتداء ملابس مريحة',
                      } as const
                    )[lang]
                  }
                </Typography>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// 8. CONTACT
export function Spa1ContactPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.contact;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.contactHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={5}>
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ color: 'common.white' }}>
                {
                  (
                    {
                      en: 'Contact details',
                      vi: 'Thông tin liên hệ',
                      fr: 'Coordonnées',
                      cn: '联系详情',
                      ar: 'تفاصيل الاتصال',
                    } as const
                  )[lang]
                }
              </Typography>
              {[
                { icon: 'solar:phone-bold', label: 'Hotline', value: spa1ContactInfo.hotline },
                { icon: 'solar:letter-bold', label: 'Email', value: spa1ContactInfo.email },
                {
                  icon: 'solar:map-point-bold',
                  label: (
                    {
                      en: 'Address',
                      vi: 'Địa chỉ',
                      fr: 'Adresse',
                      cn: '地址',
                      ar: 'العنوان',
                    } as const
                  )[lang],
                  value: spa1ContactInfo.address[lang],
                },
                {
                  icon: 'solar:clock-circle-bold',
                  label: (
                    {
                      en: 'Hours',
                      vi: 'Giờ làm việc',
                      fr: 'Horaires',
                      cn: '营业时间',
                      ar: 'ساعات العمل',
                    } as const
                  )[lang],
                  value: spa1ContactInfo.workingHours[lang],
                },
              ].map((item) => (
                <Stack key={item.label} direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ p: 1.5, bgcolor: 'rgba(200,161,90,0.1)', borderRadius: 0 }}>
                    <Iconify icon={item.icon} width={24} sx={{ color: SPA1_GOLD }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'grey.500' }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ color: 'common.white' }}>{item.value}</Typography>
                  </Box>
                </Stack>
              ))}

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

              <Stack direction="row" spacing={2}>
                <Link
                  href={spa1ContactInfo.socials.facebook}
                  target="_blank"
                  sx={{ color: SPA1_GOLD }}
                >
                  <Iconify icon="mdi:facebook" width={28} />
                </Link>
                <Link
                  href={spa1ContactInfo.socials.instagram}
                  target="_blank"
                  sx={{ color: SPA1_GOLD }}
                >
                  <Iconify icon="mdi:instagram" width={28} />
                </Link>
                <Link href={spa1ContactInfo.socials.zalo} target="_blank" sx={{ color: SPA1_GOLD }}>
                  <Iconify icon="simple-icons:zalo" width={28} />
                </Link>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Card
              sx={{
                p: 4,
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.2)',
                borderRadius: 0,
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ color: 'common.white' }}>
                  {
                    (
                      {
                        en: 'Send a message',
                        vi: 'Gửi tin nhắn',
                        fr: 'Envoyer un message',
                        cn: '发送消息',
                        ar: 'إرسال رسالة',
                      } as const
                    )[lang]
                  }
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={
                        ({ en: 'Name', vi: 'Họ tên', fr: 'Nom', cn: '姓名', ar: 'الاسم' } as const)[
                          lang
                        ]
                      }
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 0,
                          color: 'common.white',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        },
                        '& .MuiInputLabel-root': { color: 'grey.500' },
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 0,
                          color: 'common.white',
                          '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        },
                        '& .MuiInputLabel-root': { color: 'grey.500' },
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label={
                    (
                      {
                        en: 'Subject',
                        vi: 'Chủ đề',
                        fr: 'Sujet',
                        cn: '主题',
                        ar: 'الموضوع',
                      } as const
                    )[lang]
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                />
                <TextField
                  fullWidth
                  label={
                    (
                      {
                        en: 'Message',
                        vi: 'Nội dung',
                        fr: 'Message',
                        cn: '内容',
                        ar: 'الرسالة',
                      } as const
                    )[lang]
                  }
                  multiline
                  rows={4}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      color: 'common.white',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    },
                    '& .MuiInputLabel-root': { color: 'grey.500' },
                  }}
                />
                <Button
                  size="large"
                  sx={{
                    borderRadius: 0,
                    color: 'common.black',
                    bgcolor: SPA1_GOLD,
                    '&:hover': { bgcolor: SPA1_GOLD_SOFT },
                  }}
                >
                  {
                    (
                      {
                        en: 'Send message',
                        vi: 'Gửi tin nhắn',
                        fr: 'Envoyer le message',
                        cn: '发送消息',
                        ar: 'إرسال الرسالة',
                      } as const
                    )[lang]
                  }
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// 9. OFFERS
export function Spa1OffersPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.offers;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.offersHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spa1Offers.map((offer, idx) => (
            <Grid xs={12} md={4} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                }}
              >
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      bgcolor: 'rgba(200,161,90,0.1)',
                      borderRadius: 0,
                    }}
                  >
                    <Typography variant="h4" sx={{ color: SPA1_GOLD }}>
                      {offer.discount}
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ color: 'common.white' }}>
                    {offer.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {offer.description[lang]}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                  <Typography variant="caption" sx={{ color: SPA1_GOLD }}>
                    {
                      (
                        {
                          en: 'Valid: ',
                          vi: 'Hiệu lực: ',
                          fr: 'Valable : ',
                          cn: '有效期：',
                          ar: 'صالح حتى: ',
                        } as const
                      )[lang]
                    }
                    {offer.validUntil[lang]}
                  </Typography>
                  {offer.conditions[lang].map((cond, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:info-circle-bold"
                        width={14}
                        sx={{ color: 'grey.600' }}
                      />
                      <Typography variant="caption" sx={{ color: 'grey.500' }}>
                        {cond}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 10. FEEDBACK
export function Spa1FeedbackPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.feedback;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.feedbackHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spa1Feedbacks.map((fb, idx) => (
            <Grid xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Avatar
                    src={fb.avatar}
                    alt={fb.name}
                    sx={{ width: 64, height: 64, border: `2px solid ${SPA1_GOLD}` }}
                  />
                  <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                    {fb.name}
                  </Typography>
                  <Rating
                    value={fb.rating}
                    readOnly
                    size="small"
                    sx={{ '& .MuiRating-iconFilled': { color: SPA1_GOLD } }}
                  />
                  <Chip
                    label={fb.service[lang]}
                    size="small"
                    sx={{ bgcolor: 'rgba(200,161,90,0.1)', color: SPA1_GOLD, borderRadius: 0 }}
                  />
                  <Typography variant="body2" sx={{ color: 'grey.400', fontStyle: 'italic' }}>
                    &ldquo;{fb.comment[lang]}&rdquo;
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'grey.600' }}>
                    {fb.date}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 11. PROMOTIONS
export function Spa1PromotionsPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.promotions;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.promotionsHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={3}>
          {spa1Promotions.map((promo, idx) => (
            <Card
              key={idx}
              sx={{
                p: 3,
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.15)',
                borderRadius: 0,
              }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                alignItems={{ md: 'center' }}
              >
                <Chip
                  label={promo.badge[lang]}
                  sx={{
                    bgcolor: SPA1_GOLD,
                    color: 'common.black',
                    fontWeight: 'bold',
                    borderRadius: 0,
                    width: 'fit-content',
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ color: 'common.white' }}>
                    {promo.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400', mt: 1 }}>
                    {promo.description[lang]}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: SPA1_GOLD, whiteSpace: 'nowrap' }}>
                  {promo.period[lang]}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 12. BRANCHES
export function Spa1BranchesPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.branches;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.branchesHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spa1Branches.map((branch, idx) => (
            <Grid xs={12} md={4} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" sx={{ color: 'common.white' }}>
                    {branch.name[lang]}
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Iconify icon="solar:map-point-bold" sx={{ color: SPA1_GOLD, mt: 0.3 }} />
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      {branch.address[lang]}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:phone-bold" sx={{ color: SPA1_GOLD }} />
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      {branch.phone}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA1_GOLD }} />
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      {branch.hours[lang]}
                    </Typography>
                  </Stack>
                  <Button
                    component={Link}
                    href={branch.mapUrl}
                    target="_blank"
                    size="small"
                    sx={{
                      color: SPA1_GOLD,
                      justifyContent: 'flex-start',
                      px: 0,
                      '&:hover': { color: SPA1_GOLD_SOFT },
                    }}
                    startIcon={<Iconify icon="solar:map-arrow-right-bold" />}
                  >
                    {
                      (
                        {
                          en: 'View map',
                          vi: 'Xem bản đồ',
                          fr: 'Voir la carte',
                          cn: '查看地图',
                          ar: 'عرض الخريطة',
                        } as const
                      )[lang]
                    }
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 13. ACCOUNT
export function Spa1AccountPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.account;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.accountHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.2)',
                borderRadius: 0,
                textAlign: 'center',
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'rgba(200,161,90,0.2)',
                    border: `2px solid ${SPA1_GOLD}`,
                  }}
                >
                  <Iconify icon="solar:user-bold" width={40} sx={{ color: SPA1_GOLD }} />
                </Avatar>
                <Typography variant="h6" sx={{ color: 'common.white' }}>
                  {
                    (
                      {
                        en: 'Customer',
                        vi: 'Khách hàng',
                        fr: 'Client',
                        cn: '客户',
                        ar: 'عميل',
                      } as const
                    )[lang]
                  }
                </Typography>
                <Chip
                  label={
                    (
                      {
                        en: 'Gold Member',
                        vi: 'Gold Member',
                        fr: 'Gold Member',
                        cn: 'Gold Member',
                        ar: 'Gold Member',
                      } as const
                    )[lang]
                  }
                  sx={{ bgcolor: 'rgba(200,161,90,0.15)', color: SPA1_GOLD, borderRadius: 0 }}
                />
                <Typography variant="body2" sx={{ color: 'grey.500' }}>
                  {
                    (
                      {
                        en: 'Loyalty points: 2,450',
                        vi: 'Điểm tích lũy: 2,450',
                        fr: 'Points de fidélité : 2,450',
                        cn: '积分：2,450',
                        ar: 'نقاط الولاء: 2,450',
                      } as const
                    )[lang]
                  }
                </Typography>
              </Stack>
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Stack spacing={3}>
              {[
                {
                  icon: 'solar:calendar-bold',
                  title: (
                    {
                      en: 'Booking history',
                      vi: 'Lịch sử đặt lịch',
                      fr: 'Historique des réservations',
                      cn: '预约记录',
                      ar: 'سجل الحجوزات',
                    } as const
                  )[lang],
                  desc: (
                    {
                      en: '12 service visits',
                      vi: '12 lần sử dụng dịch vụ',
                      fr: '12 visites de service',
                      cn: '12 次服务体验',
                      ar: '12 زيارة خدمة',
                    } as const
                  )[lang],
                },
                {
                  icon: 'solar:gift-bold',
                  title: (
                    {
                      en: 'My offers',
                      vi: 'Ưu đãi của tôi',
                      fr: 'Mes offres',
                      cn: '我的优惠',
                      ar: 'عروضي',
                    } as const
                  )[lang],
                  desc: (
                    {
                      en: '3 available vouchers',
                      vi: '3 voucher khả dụng',
                      fr: '3 bons disponibles',
                      cn: '3 张可用优惠券',
                      ar: '3 قسائم متاحة',
                    } as const
                  )[lang],
                },
                {
                  icon: 'solar:heart-bold',
                  title: (
                    {
                      en: 'Favorite services',
                      vi: 'Dịch vụ yêu thích',
                      fr: 'Services favoris',
                      cn: '收藏服务',
                      ar: 'الخدمات المفضلة',
                    } as const
                  )[lang],
                  desc: (
                    {
                      en: '5 saved services',
                      vi: '5 dịch vụ đã lưu',
                      fr: '5 services enregistrés',
                      cn: '5 项已保存服务',
                      ar: '5 خدمات محفوظة',
                    } as const
                  )[lang],
                },
                {
                  icon: 'solar:settings-bold',
                  title: (
                    {
                      en: 'Account settings',
                      vi: 'Cài đặt tài khoản',
                      fr: 'Paramètres du compte',
                      cn: '账户设置',
                      ar: 'إعدادات الحساب',
                    } as const
                  )[lang],
                  desc: (
                    {
                      en: 'Personal info & password',
                      vi: 'Thông tin cá nhân & mật khẩu',
                      fr: 'Infos personnelles & mot de passe',
                      cn: '个人信息与密码',
                      ar: 'المعلومات الشخصية وكلمة المرور',
                    } as const
                  )[lang],
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  sx={{
                    p: 3,
                    bgcolor: SPA1_DARK_ALT,
                    border: '1px solid rgba(200,161,90,0.15)',
                    borderRadius: 0,
                    cursor: 'pointer',
                    '&:hover': { borderColor: SPA1_GOLD },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(200,161,90,0.1)', borderRadius: 0 }}>
                      <Iconify icon={item.icon} width={24} sx={{ color: SPA1_GOLD }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.500' }}>
                        {item.desc}
                      </Typography>
                    </Box>
                    <Iconify icon="solar:arrow-right-linear" sx={{ color: 'grey.600' }} />
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// 14. PARTNERS
export function Spa1PartnersPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.partners;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.partnersHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Spa1SectionTitle
          eyebrow={
            (
              {
                en: 'Partners',
                vi: 'Đối tác',
                fr: 'Partenaires',
                cn: '合作伙伴',
                ar: 'الشركاء',
              } as const
            )[lang]
          }
          title={
            (
              {
                en: 'Strategic partners',
                vi: 'Đối tác chiến lược',
                fr: 'Partenaires stratégiques',
                cn: '战略合作伙伴',
                ar: 'الشركاء الاستراتيجيون',
              } as const
            )[lang]
          }
        />

        <Grid container spacing={3}>
          {spa1Partners.map((partner, idx) => (
            <Grid xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                  textAlign: 'center',
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={partner.name}
                    sx={{
                      height: 48,
                      objectFit: 'contain',
                      filter: 'brightness(0.9) contrast(1.1)',
                    }}
                  />
                  <Typography variant="h6" sx={{ color: 'common.white' }}>
                    {partner.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {partner.description[lang]}
                  </Typography>
                  <Link
                    href={partner.website}
                    target="_blank"
                    sx={{ color: SPA1_GOLD, fontSize: 14 }}
                  >
                    {
                      (
                        {
                          en: 'Learn more',
                          vi: 'Xem thêm',
                          fr: 'En savoir plus',
                          cn: '了解更多',
                          ar: 'اعرف المزيد',
                        } as const
                      )[lang]
                    }{' '}
                    →
                  </Link>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 15. TREATMENTS
export function Spa1TreatmentsPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.treatments;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.treatmentHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spa1Treatments.map((treatment, idx) => (
            <Grid xs={12} md={4} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: SPA1_DARK_ALT,
                  border: treatment.popular
                    ? `2px solid ${SPA1_GOLD}`
                    : '1px solid rgba(200,161,90,0.15)',
                  borderRadius: 0,
                  position: 'relative',
                }}
              >
                {treatment.popular && (
                  <Chip
                    label={
                      (
                        {
                          en: 'Most popular',
                          vi: 'Phổ biến nhất',
                          fr: 'Le plus populaire',
                          cn: '最受欢迎',
                          ar: 'الأكثر شعبية',
                        } as const
                      )[lang]
                    }
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: SPA1_GOLD,
                      color: 'common.black',
                      borderRadius: 0,
                      fontWeight: 'bold',
                    }}
                  />
                )}
                <Stack spacing={2}>
                  <Typography variant="h5" sx={{ color: 'common.white' }}>
                    {treatment.name[lang]}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      label={`${treatment.sessions} ${({ en: 'sessions', vi: 'buổi', fr: 'séances', cn: '次', ar: 'جلسات' } as const)[lang]}`}
                      size="small"
                      sx={{ bgcolor: 'rgba(200,161,90,0.1)', color: SPA1_GOLD, borderRadius: 0 }}
                    />
                    <Chip
                      label={treatment.duration[lang]}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'grey.400', borderRadius: 0 }}
                    />
                  </Stack>
                  <Typography variant="h4" sx={{ color: SPA1_GOLD }}>
                    {treatment.price[lang]}
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                  {treatment.benefits[lang].map((benefit, i) => (
                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={18}
                        sx={{ color: SPA1_GOLD }}
                      />
                      <Typography variant="body2" sx={{ color: 'grey.300' }}>
                        {benefit}
                      </Typography>
                    </Stack>
                  ))}
                  <Button
                    component={RouterLink}
                    href={paths.spa1.booking}
                    fullWidth
                    size="large"
                    sx={{
                      mt: 2,
                      borderRadius: 0,
                      color: treatment.popular ? 'common.black' : SPA1_GOLD,
                      bgcolor: treatment.popular ? SPA1_GOLD : 'transparent',
                      border: treatment.popular ? 'none' : `1px solid ${SPA1_GOLD}`,
                      '&:hover': {
                        bgcolor: treatment.popular ? SPA1_GOLD_SOFT : 'rgba(200,161,90,0.1)',
                      },
                    }}
                  >
                    {
                      (
                        {
                          en: 'Register now',
                          vi: 'Đăng ký ngay',
                          fr: 'S’inscrire',
                          cn: '立即报名',
                          ar: 'سجل الآن',
                        } as const
                      )[lang]
                    }
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 16. BEFORE-AFTER
export function Spa1BeforeAfterPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.beforeAfter;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.beforeAfterHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={6}>
          {spa1BeforeAfters.map((item, idx) => (
            <Card
              key={idx}
              sx={{
                p: 3,
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.15)',
                borderRadius: 0,
              }}
            >
              <Typography variant="h5" sx={{ color: 'common.white', mb: 2 }}>
                {item.title[lang]}
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={5}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.beforeImage}
                      alt="Before"
                      sx={{ width: 1, height: 250, objectFit: 'cover', borderRadius: 0 }}
                    />
                    <Chip
                      label={
                        (
                          { en: 'Before', vi: 'Trước', fr: 'Avant', cn: '之前', ar: 'قبل' } as const
                        )[lang]
                      }
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: 'error.main',
                        color: 'common.white',
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} md={5}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.afterImage}
                      alt="After"
                      sx={{ width: 1, height: 250, objectFit: 'cover', borderRadius: 0 }}
                    />
                    <Chip
                      label={
                        ({ en: 'After', vi: 'Sau', fr: 'Après', cn: '之后', ar: 'بعد' } as const)[
                          lang
                        ]
                      }
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: 'success.main',
                        color: 'common.white',
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid xs={12} md={2}>
                  <Stack spacing={1} sx={{ height: '100%', justifyContent: 'center' }}>
                    <Chip
                      label={item.service[lang]}
                      size="small"
                      sx={{ bgcolor: 'rgba(200,161,90,0.1)', color: SPA1_GOLD, borderRadius: 0 }}
                    />
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                      {item.sessions}{' '}
                      {
                        (
                          {
                            en: 'sessions',
                            vi: 'buổi',
                            fr: 'séances',
                            cn: '次',
                            ar: 'جلسات',
                          } as const
                        )[lang]
                      }
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      {item.description[lang]}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Stack>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 17. FAQ
export function Spa1FaqPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.faq;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.faqHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 }, maxWidth: 'md' }}>
        <Stack spacing={2}>
          {spa1Faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              sx={{
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.15)',
                borderRadius: '0 !important',
                '&::before': { display: 'none' },
                '&.Mui-expanded': { borderColor: SPA1_GOLD },
              }}
            >
              <AccordionSummary
                expandIcon={<Iconify icon="solar:alt-arrow-down-bold" sx={{ color: SPA1_GOLD }} />}
              >
                <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                  {faq.question[lang]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'grey.400' }}>{faq.answer[lang]}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}

// 18. POLICY
export function Spa1PolicyPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.policy;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.policyHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={4}>
          {spa1Policies.map((policy, idx) => (
            <Card
              key={idx}
              sx={{
                p: 3,
                bgcolor: SPA1_DARK_ALT,
                border: '1px solid rgba(200,161,90,0.15)',
                borderRadius: 0,
              }}
            >
              <Typography variant="h5" sx={{ color: SPA1_GOLD, mb: 2 }}>
                {policy.title[lang]}
              </Typography>
              <Stack spacing={1.5}>
                {policy.content[lang].map((item, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                    <Iconify
                      icon="solar:check-circle-bold"
                      width={18}
                      sx={{ color: SPA1_GOLD, mt: 0.3 }}
                    />
                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// 19. GALLERY
export function Spa1GalleryPageView() {
  const lang = useSpa1Lang();
  const meta = spa1Meta.gallery;

  return (
    <Box sx={{ bgcolor: SPA1_DARK }}>
      <Spa1PageHero
        image={SPA1_PAGE_IMAGES.galleryHero}
        title={meta.title[lang]}
        subtitle={meta.subtitle[lang]}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={2}>
          {spa1Gallery.map((item, idx) => (
            <Grid xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 0,
                  '&:hover .gallery-overlay': { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title[lang]}
                  sx={{ width: 1, height: 280, objectFit: 'cover' }}
                />
                <Box
                  className="gallery-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(14,14,16,0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 2.5,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Chip
                    label={item.category[lang]}
                    size="small"
                    sx={{
                      width: 'fit-content',
                      mb: 1,
                      bgcolor: 'rgba(200,161,90,0.2)',
                      color: SPA1_GOLD,
                      borderRadius: 0,
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                    {item.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400', mt: 0.5 }}>
                    {item.caption[lang]}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Spa1CtaBanner />
    </Box>
  );
}
