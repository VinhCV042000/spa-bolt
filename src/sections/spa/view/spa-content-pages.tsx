import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import {
  spaMeta,
  spaGallery,
  spaServices,
  spaPackages,
  spaBlogPosts,
  spaContactInfo,
  SPA_PAGE_IMAGES,
  spaCareerOpenings,
  spaTrainingPrograms,
} from '../spa-pages-data';

import type { SpaLang } from '../spa-pages-data';

// ----------------------------------------------------------------------

function useSpaLang(): SpaLang {
  const { currentLang } = useTranslate();

  return currentLang.value as SpaLang;
}

function PageHero({ image, title, subtitle }: { image: string; title: string; subtitle: string }) {
  const { t } = useTranslate('spa');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 18 },
        color: 'common.white',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(90deg, rgba(22, 28, 36, 0.82), rgba(22, 28, 36, 0.34)), url(${image})`,
      }}
    >
      <Container>
        <Stack spacing={3} sx={{ maxWidth: 760 }}>
          <Chip
            color="primary"
            label="Serenity Spa"
            sx={{ width: 'fit-content', color: 'primary.contrastText' }}
          />
          <Typography variant="h1">{title}</Typography>
          <Typography variant="h5" sx={{ opacity: 0.84, lineHeight: 1.6 }}>
            {subtitle}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={RouterLink}
              href={paths.spa.booking}
              size="large"
              variant="contained"
            >
              {t('cta.bookNow')}
            </Button>
            <Button
              component={RouterLink}
              href={paths.spa.contact}
              size="large"
              variant="outlined"
              sx={{ color: 'common.white', borderColor: 'common.white' }}
            >
              {t('cta.contact')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function SectionTitle({
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
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        {eyebrow}
      </Typography>
      <Typography variant="h2">{title}</Typography>
      {subtitle && (
        <Typography sx={{ maxWidth: 720, color: 'text.secondary' }}>{subtitle}</Typography>
      )}
    </Stack>
  );
}

function CtaBanner() {
  const { t } = useTranslate('spa');

  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <Card
        sx={{
          p: { xs: 3, md: 5 },
          color: 'common.white',
          background: 'linear-gradient(135deg, #6D9886 0%, #2F4F4F 100%)',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            <Typography variant="h3">{t('cta.title')}</Typography>
            <Typography sx={{ opacity: 0.82 }}>{t('cta.subtitle')}</Typography>
          </Stack>
          <Button component={RouterLink} href={paths.spa.booking} size="large" variant="contained">
            {t('cta.button')}
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}

function ServiceCard({ service }: { service: (typeof spaServices)[number] }) {
  const lang = useSpaLang();

  return (
    <Card sx={{ height: 1 }}>
      <Box
        component="img"
        src={service.image}
        alt={service.title[lang]}
        sx={{ width: 1, height: 240, objectFit: 'cover' }}
      />
      <CardContent>
        <Stack spacing={2}>
          <Iconify icon={service.icon} width={40} sx={{ color: 'primary.main' }} />
          <Stack spacing={0.75}>
            <Typography variant="h5">{service.title[lang]}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {service.subtitle[lang]}
            </Typography>
          </Stack>
          <Typography sx={{ color: 'text.secondary' }}>{service.description[lang]}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip size="small" label={service.duration[lang]} />
            <Chip color="primary" size="small" label={service.price[lang]} variant="soft" />
          </Stack>
          <Button
            component={RouterLink}
            href={paths.spa.serviceDetails(service.slug)}
            variant="outlined"
          >
            {({ en: 'View details', vi: 'Xem chi tiết', fr: 'Voir les détails', cn: '查看详情', ar: 'عرض التفاصيل' } as const)[lang]}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

function PackageCard({ item }: { item: (typeof spaPackages)[number] }) {
  const lang = useSpaLang();

  return (
    <Card sx={{ height: 1, border: item.popular ? 2 : 0, borderColor: 'primary.main' }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={1}>
            {item.popular && (
              <Chip
                color="primary"
                label={({ en: 'Popular', vi: 'Phổ biến', fr: 'Populaire', cn: '热门', ar: 'شائع' } as const)[lang]}
                sx={{ width: 'fit-content' }}
              />
            )}
            <Typography variant="h4">{item.name[lang]}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{item.caption[lang]}</Typography>
          </Stack>
          <Typography variant="h3" color="primary.main">
            {item.price[lang]}
          </Typography>
          <Divider />
          <Stack spacing={1.5}>
            {item.features[lang].map((feature) => (
              <Stack key={feature} direction="row" spacing={1.5}>
                <Iconify icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
                <Typography variant="body2">{feature}</Typography>
              </Stack>
            ))}
          </Stack>
          <Button
            component={RouterLink}
            href={paths.spa.booking}
            variant={item.popular ? 'contained' : 'outlined'}
          >
            {({ en: 'Choose package', vi: 'Chọn gói', fr: 'Choisir le forfait', cn: '选择套餐', ar: 'اختر الباقة' } as const)[lang]}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function SpaAboutPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.aboutHero}
        title={spaMeta.about.title[lang]}
        subtitle={spaMeta.about.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={5} alignItems="center">
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <SectionTitle
                align="left"
                eyebrow={({ en: 'Our story', vi: 'Câu chuyện', fr: 'Notre histoire', cn: '我们的故事', ar: 'قصتنا' } as const)[lang]}
                title={
                  ({
                    en: 'An urban spa for balanced living',
                    vi: 'Spa đô thị cho lối sống cân bằng',
                    fr: 'Un spa urbain pour une vie équilibrée',
                    cn: '为均衡生活而生的都市水疗',
                    ar: 'سبا حضري لحياة متوازنة',
                  } as const)[lang]
                }
                subtitle={
                  ({
                    en: 'We believe wellness is not a luxury, but a personalized routine that deserves consistent care.',
                    vi: 'Chúng tôi tin rằng chăm sóc sức khỏe không phải là xa xỉ, mà là thói quen cần được cá nhân hóa và duy trì đều đặn.',
                    fr: 'Nous croyons que le bien-être n’est pas un luxe, mais une routine personnalisée qui mérite des soins réguliers.',
                    cn: '我们相信健康不是奢侈品，而是值得持续呆护的个性化习惯。',
                    ar: 'نؤمن بأن العافية ليست ترفًا، بل روتين شخصي يستحق عناية مستمرة.',
                  } as const)[lang]
                }
              />
              {[
                ({
                  en: 'Therapists are trained regularly in anatomy, hygiene, communication, and guest care.',
                  vi: 'Đội ngũ kỹ thuật viên được đào tạo định kỳ về giải phẫu, vệ sinh, giao tiếp và chăm sóc khách hàng.',
                  fr: 'Les thérapeutes sont régulièrement formés à l’anatomie, l’hygiène, la communication et l’accueil des clients.',
                  cn: '技师定期接受解剖、卫生、沟通和宾客护理方面的培训。',
                  ar: 'يتلقى المعالجون تدريبًا دوريًا على التشريح والنظافة والتواصل والعناية بالضيوف.',
                } as const)[lang],
                ({
                  en: 'The space follows a Zen philosophy: less noise, more natural light, gentle scent, and healing sound.',
                  vi: 'Không gian được thiết kế theo triết lý Zen: ít nhiễu, nhiều ánh sáng tự nhiên, hương thơm dịu và âm thanh chữa lành.',
                  fr: 'L’espace suit une philosophie Zen : moins de bruit, plus de lumière naturelle, un parfum doux et un son apaisant.',
                  cn: '空间遵循禅意哲学：更少喙杂、更多自然光、柔和香氛和疗愈音乐。',
                  ar: 'تتبع المساحة فلسفة زِن: ضوضاء أقل وضوء طبيعي أكثر ورائحة لطيفة وصوت شافٍ.',
                } as const)[lang],
                ({
                  en: 'Every treatment begins with a short consultation to align pressure, products, and goals.',
                  vi: 'Mỗi liệu trình đều bắt đầu bằng tư vấn nhanh để đảm bảo mức lực, sản phẩm và mục tiêu phù hợp.',
                  fr: 'Chaque soin commence par une brève consultation pour ajuster la pression, les produits et les objectifs.',
                  cn: '每次疗程都以简短咨询开始，以确保力度、产品和目标相匹配。',
                  ar: 'يبدأ كل علاج باستشارة قصيرة لمواءمة الضغط والمنتجات والأهداف.',
                } as const)[lang],
              ].map((item) => (
                <Stack key={item} direction="row" spacing={2}>
                  <Iconify
                    icon="solar:leaf-bold-duotone"
                    width={28}
                    sx={{ color: 'primary.main' }}
                  />
                  <Typography sx={{ color: 'text.secondary' }}>{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Grid container spacing={2}>
              {[
                ['12+', ({ en: 'years of experience', vi: 'năm kinh nghiệm', fr: 'ans d’expérience', cn: '年经验', ar: 'سنوات من الخبرة' } as const)[lang]],
                ['24k+', ({ en: 'guest visits', vi: 'lượt khách chăm sóc', fr: 'visites de clients', cn: '宾客到访', ar: 'زيارات الضيوف' } as const)[lang]],
                ['4.9/5', ({ en: 'guest rating', vi: 'điểm hài lòng', fr: 'note des clients', cn: '宾客评分', ar: 'تقييم الضيوف' } as const)[lang]],
                ['100%', ({ en: 'curated products', vi: 'sản phẩm chọn lọc', fr: 'produits sélectionnés', cn: '精选产品', ar: 'منتجات منتقاة' } as const)[lang]],
              ].map(([value, label]) => (
                <Grid key={label} xs={6}>
                  <Card sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h3" color="primary.main">
                      {value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {label}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <CtaBanner />
    </>
  );
}

export function SpaServicesPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.servicesHero}
        title={spaMeta.services.title[lang]}
        subtitle={spaMeta.services.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <SectionTitle
          eyebrow={({ en: 'Menu', vi: 'Danh mục', fr: 'Menu', cn: '菜单', ar: 'القائمة' } as const)[lang]}
          title={({ en: 'Featured treatments', vi: 'Liệu trình nổi bật', fr: 'Soins phares', cn: '精选疗程', ar: 'علاجات مميزة' } as const)[lang]}
          subtitle={
            ({
              en: 'Each service has a dedicated detail page so guests can choose confidently before booking.',
              vi: 'Mỗi dịch vụ có trang chi tiết riêng để khách hàng dễ chọn trước khi đặt lịch.',
              fr: 'Chaque service dispose d’une page dédiée pour que les clients choisissent en toute confiance avant de réserver.',
              cn: '每项服务都有专属详情页，让宾客在预约前能放心选择。',
              ar: 'لكل خدمة صفحة تفاصيل مخصصة حتى يختار الضيوف بثقة قبل الحجز.',
            } as const)[lang]
          }
        />
        <Grid container spacing={3}>
          {spaServices.map((service) => (
            <Grid key={service.slug} xs={12} sm={6} md={4}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <CtaBanner />
    </>
  );
}

export function SpaServiceDetailsPageView() {
  const lang = useSpaLang();
  const { slug = spaServices[0].slug } = useParams();
  const service = spaServices.find((item) => item.slug === slug) ?? spaServices[0];

  return (
    <>
      <PageHero
        image={service.image}
        title={service.title[lang]}
        subtitle={service.description[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={5}>
          <Grid xs={12} md={7}>
            <Stack spacing={4}>
              <SectionTitle
                align="left"
                eyebrow={({ en: 'Service details', vi: 'Chi tiết dịch vụ', fr: 'Détails du service', cn: '服务详情', ar: 'تفاصيل الخدمة' } as const)[lang]}
                title={service.subtitle[lang]}
                subtitle={service.description[lang]}
              />
              <Grid container spacing={2}>
                {service.outcomes[lang].map((outcome) => (
                  <Grid key={outcome} xs={12} sm={4}>
                    <Card sx={{ p: 2.5, height: 1 }}>
                      <Iconify
                        icon="solar:star-bold-duotone"
                        width={28}
                        sx={{ mb: 1, color: 'warning.main' }}
                      />
                      <Typography variant="subtitle1">{outcome}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Card sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h4">
                    {({ en: 'Treatment flow', vi: 'Quy trình', fr: 'Déroulement du soin', cn: '疗程流程', ar: 'مراحل العلاج' } as const)[lang]}
                  </Typography>
                  {service.process[lang].map((step, index) => (
                    <Stack key={step} direction="row" spacing={2} alignItems="center">
                      <Chip color="primary" label={index + 1} />
                      <Typography>{step}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>
          <Grid xs={12} md={5}>
            <Card sx={{ p: 3, position: { md: 'sticky' }, top: { md: 96 } }}>
              <Stack spacing={3}>
                <Typography variant="h4">
                  {({ en: 'Quick info', vi: 'Thông tin nhanh', fr: 'Infos rapides', cn: '快速信息', ar: 'معلومات سريعة' } as const)[lang]}
                </Typography>
                <Stack spacing={1.5}>
                  <Chip
                    icon={<Iconify icon="solar:clock-circle-bold" />}
                    label={service.duration[lang]}
                  />
                  <Chip
                    icon={<Iconify icon="solar:tag-price-bold" />}
                    label={service.price[lang]}
                  />
                </Stack>
                <Button
                  component={RouterLink}
                  href={paths.spa.booking}
                  size="large"
                  variant="contained"
                >
                  {({ en: 'Book this service', vi: 'Đặt dịch vụ này', fr: 'Réserver ce service', cn: '预约此服务', ar: 'احجز هذه الخدمة' } as const)[lang]}
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.spa.services}
                  size="large"
                  variant="outlined"
                >
                  {({ en: 'View all services', vi: 'Xem tất cả dịch vụ', fr: 'Voir tous les services', cn: '查看所有服务', ar: 'عرض جميع الخدمات' } as const)[lang]}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export function SpaTrainingPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.trainingHero}
        title={spaMeta.training.title[lang]}
        subtitle={spaMeta.training.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <SectionTitle
          eyebrow={({ en: 'Academy', vi: 'Học viện', fr: 'Académie', cn: '学院', ar: 'الأكاديمية' } as const)[lang]}
          title={({ en: 'Practice-first learning paths', vi: 'Lộ trình học thực chiến', fr: 'Parcours axés sur la pratique', cn: '实践优先的学习路径', ar: 'مسارات تعلّم تركّز على التطبيق' } as const)[lang]}
          subtitle={
            ({
              en: 'Students learn concise theory, practice extensively, and receive direct trainer feedback.',
              vi: 'Học viên được học lý thuyết ngắn, thực hành nhiều và nhận phản hồi trực tiếp từ trainer.',
              fr: 'Les étudiants apprennent une théorie concise, pratiquent intensément et reçoivent un retour direct du formateur.',
              cn: '学员学习精简理论、大量实践，并获得培训师的直接反馈。',
              ar: 'يتعلم الطلاب نظرية موجزة ويتدربون بكثافة ويتلقون ملاحظات مباشرة من المدرب.',
            } as const)[lang]
          }
        />
        <Grid container spacing={3}>
          {spaTrainingPrograms.map((program) => (
            <Grid key={program.title[lang]} xs={12} md={4}>
              <Card sx={{ p: 3, height: 1 }}>
                <Stack spacing={2.5}>
                  <Chip label={program.duration[lang]} sx={{ width: 'fit-content' }} />
                  <Typography variant="h4">{program.title[lang]}</Typography>
                  {program.points[lang].map((point) => (
                    <Stack key={point} direction="row" spacing={1.5}>
                      <Iconify icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
                      <Typography variant="body2">{point}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <CtaBanner />
    </>
  );
}

export function SpaBlogPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.wellnessHero}
        title={spaMeta.blog.title[lang]}
        subtitle={spaMeta.blog.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spaBlogPosts.map((post) => (
            <Grid key={post.slug} xs={12} md={4}>
              <Card sx={{ height: 1 }}>
                <Box
                  component="img"
                  src={post.image}
                  alt={post.title[lang]}
                  sx={{ width: 1, height: 240, objectFit: 'cover' }}
                />
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip size="small" label={post.category[lang]} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {post.readTime[lang]}
                      </Typography>
                    </Stack>
                    <Typography variant="h5">{post.title[lang]}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{post.excerpt[lang]}</Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa.blogDetails(post.slug)}
                      variant="outlined"
                    >
                      {({ en: 'Read article', vi: 'Đọc bài viết', fr: 'Lire l’article', cn: '阅读文章', ar: 'اقرأ المقال' } as const)[lang]}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export function SpaBlogDetailsPageView() {
  const lang = useSpaLang();
  const { slug = spaBlogPosts[0].slug } = useParams();
  const post = spaBlogPosts.find((item) => item.slug === slug) ?? spaBlogPosts[0];

  return (
    <>
      <PageHero image={post.image} title={post.title[lang]} subtitle={post.excerpt[lang]} />
      <Container sx={{ py: { xs: 8, md: 12 }, maxWidth: 900 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip color="primary" label={post.category[lang]} />
            <Typography sx={{ color: 'text.secondary' }}>{post.readTime[lang]}</Typography>
          </Stack>
          {post.body[lang].map((paragraph) => (
            <Typography
              key={paragraph}
              variant="h6"
              sx={{ color: 'text.secondary', lineHeight: 1.8 }}
            >
              {paragraph}
            </Typography>
          ))}
          <Button
            component={RouterLink}
            href={paths.spa.blog}
            variant="outlined"
            sx={{ width: 'fit-content' }}
          >
            {({ en: 'Back to blog', vi: 'Quay lại blog', fr: 'Retour au blog', cn: '返回博客', ar: 'العودة إلى المدونة' } as const)[lang]}
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export function SpaCareersPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.careersHero}
        title={spaMeta.careers.title[lang]}
        subtitle={spaMeta.careers.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spaCareerOpenings.map((job) => (
            <Grid key={job.role[lang]} xs={12} md={4}>
              <Card sx={{ p: 3, height: 1 }}>
                <Stack spacing={2}>
                  <Typography variant="h4">{job.role[lang]}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip label={job.location[lang]} />
                    <Chip label={job.type[lang]} />
                  </Stack>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {({
                      en: 'Ideal for service-minded candidates with strong communication and willingness to learn Serenity workflows.',
                      vi: 'Ứng viên yêu nghề dịch vụ, giao tiếp tốt và sẵn sàng học quy trình Serenity.',
                      fr: 'Idéal pour les candidats au sens du service, dotés d’une bonne communication et prêts à apprendre les procédures Serenity.',
                      cn: '适合热爱服务、沟通良好且愿意学习 Serenity 流程的候选人。',
                      ar: 'مثالي للمرشحين المهتمين بالخدمة وأصحاب التواصل الجيد والاستعداد لتعلم إجراءات Serenity.',
                    } as const)[lang]}
                  </Typography>
                  <Button component={RouterLink} href={paths.spa.contact} variant="outlined">
                    {({ en: 'Apply', vi: 'Ứng tuyển', fr: 'Postuler', cn: '申请', ar: 'قدّم الآن' } as const)[lang]}
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export function SpaOffersPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.membershipHero}
        title={spaMeta.offers.title[lang]}
        subtitle={spaMeta.offers.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {spaPackages.map((item) => (
            <Grid key={item.name[lang]} xs={12} md={4}>
              <PackageCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export function SpaContactPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.contactHero}
        title={spaMeta.contact.title[lang]}
        subtitle={spaMeta.contact.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={5}>
            <Stack spacing={2.5}>
              {spaContactInfo.map((item) => (
                <Card key={item.label[lang]} sx={{ p: 2.5 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />
                    <Stack>
                      <Typography variant="subtitle2">{item.label[lang]}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{item.value}</Typography>
                    </Stack>
                  </Stack>
                </Card>
              ))}
              <Box
                component="iframe"
                title="Serenity Spa map"
                src="https://www.google.com/maps?q=District%201%20Ho%20Chi%20Minh%20City&output=embed"
                sx={{ width: 1, height: 320, border: 0, borderRadius: 2 }}
              />
            </Stack>
          </Grid>
          <Grid xs={12} md={7}>
            <Card component="form" sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={2.5}>
                <Typography variant="h3">
                  {({ en: 'Send a message', vi: 'Gửi thông tin liên hệ', fr: 'Envoyer un message', cn: '发送消息', ar: 'أرسل رسالة' } as const)[lang]}
                </Typography>
                <TextField fullWidth label={({ en: 'Full name', vi: 'Họ và tên', fr: 'Nom complet', cn: '姓名', ar: 'الاسم الكامل' } as const)[lang]} />
                <TextField fullWidth label={({ en: 'Phone number', vi: 'Số điện thoại', fr: 'Numéro de téléphone', cn: '电话号码', ar: 'رقم الهاتف' } as const)[lang]} />
                <TextField fullWidth label="Email" />
                <TextField
                  fullWidth
                  label={({ en: 'How can we help?', vi: 'Nội dung cần tư vấn', fr: 'Comment pouvons-nous vous aider ?', cn: '有什么可以帮到您？', ar: 'كيف يمكننا مساعدتك؟' } as const)[lang]}
                  multiline
                  rows={5}
                />
                <Button size="large" variant="contained">
                  {({ en: 'Send message', vi: 'Gửi liên hệ', fr: 'Envoyer le message', cn: '发送消息', ar: 'إرسال الرسالة' } as const)[lang]}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export function SpaBookingPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.bookingHero}
        title={spaMeta.booking.title[lang]}
        subtitle={spaMeta.booking.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 }, maxWidth: 920 }}>
        <Card component="form" sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={3}>
            <Typography variant="h3">
              {({ en: 'Booking information', vi: 'Thông tin đặt lịch', fr: 'Informations de réservation', cn: '预约信息', ar: 'معلومات الحجز' } as const)[lang]}
            </Typography>
            <Grid container spacing={2.5}>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label={({ en: 'Full name', vi: 'Họ và tên', fr: 'Nom complet', cn: '姓名', ar: 'الاسم الكامل' } as const)[lang]} />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label={({ en: 'Phone number', vi: 'Số điện thoại', fr: 'Numéro de téléphone', cn: '电话号码', ar: 'رقم الهاتف' } as const)[lang]} />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label="Email" />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={({ en: 'Preferred date', vi: 'Ngày mong muốn', fr: 'Date souhaitée', cn: '期望日期', ar: 'التاريخ المفضل' } as const)[lang]}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label={({ en: 'Service', vi: 'Dịch vụ', fr: 'Service', cn: '服务', ar: 'الخدمة' } as const)[lang]}
                  defaultValue={spaServices[0].slug}
                >
                  {spaServices.map((service) => (
                    <MenuItem key={service.slug} value={service.slug}>
                      {service.title[lang]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label={({ en: 'Time slot', vi: 'Khung giờ', fr: 'Créneau horaire', cn: '时间段', ar: 'الفترة الزمنية' } as const)[lang]}
                  defaultValue="10:00"
                >
                  {['10:00', '13:30', '16:00', '19:00'].map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  label={({ en: 'Notes', vi: 'Ghi chú', fr: 'Notes', cn: '备注', ar: 'ملاحظات' } as const)[lang]}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Button size="large" variant="contained">
              {({ en: 'Submit booking request', vi: 'Gửi yêu cầu đặt lịch', fr: 'Envoyer la demande de réservation', cn: '提交预约请求', ar: 'إرسال طلب الحجز' } as const)[lang]}
            </Button>
          </Stack>
        </Card>
      </Container>
    </>
  );
}

export function SpaGalleryPageView() {
  const lang = useSpaLang();

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.galleryHero}
        title={spaMeta.gallery.title[lang]}
        subtitle={spaMeta.gallery.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <SectionTitle
          eyebrow="VI / EN"
          title={({ en: 'Images with bilingual captions', vi: 'Hình ảnh & chú thích song ngữ', fr: 'Images avec légendes multilingues', cn: '多语言图文', ar: 'صور مع تعليقات متعددة اللغات' } as const)[lang]}
          subtitle={
            ({
              en: 'Switch language in the header to view the gallery in English or Vietnamese.',
              vi: 'Đổi ngôn ngữ ở header để xem nội dung gallery bằng tiếng Anh hoặc tiếng Việt.',
              fr: 'Changez de langue dans l’en-tête pour voir la galerie dans votre langue.',
              cn: '在顶部切换语言，以不同语言查看图库内容。',
              ar: 'غيّر اللغة في الرأس لعرض المعرض بلغتك.',
            } as const)[lang]
          }
        />
        <Grid container spacing={3}>
          {spaGallery.map((item) => (
            <Grid key={item.title[lang]} xs={12} sm={6} md={4}>
              <Card sx={{ height: 1 }}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title[lang]}
                  sx={{ width: 1, height: 280, objectFit: 'cover' }}
                />
                <CardContent>
                  <Stack spacing={1.5}>
                    <Chip size="small" label={item.category[lang]} sx={{ width: 'fit-content' }} />
                    <Typography variant="h5">{item.title[lang]}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.caption[lang]}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export function SpaWellnessPageView() {
  const lang = useSpaLang();
  const tips = [
    {
      icon: 'solar:cup-hot-bold-duotone',
      title: { vi: 'Uống nước ấm', en: 'Drink warm water', fr: 'Buvez de l’eau tiède', cn: '饮用温水', ar: 'اشرب الماء الدافئ' },
      text: {
        vi: 'Bổ sung nước sau massage giúp cơ thể đào thải tốt hơn.',
        en: 'Hydration after massage supports natural recovery.',
        fr: 'S’hydrater après le massage favorise une récupération naturelle.',
        cn: '按摩后补充水分有助于身体自然恢复。',
        ar: 'الترطيب بعد التدليك يدعم التعافي الطبيعي.',
      },
    },
    {
      icon: 'solar:sun-bold-duotone',
      title: { vi: 'Chống nắng kỹ', en: 'Protect from sun', fr: 'Protégez-vous du soleil', cn: '做好防晒', ar: 'احم بشرتك من الشمس' },
      text: {
        vi: 'Sau facial, hãy dùng SPF và hạn chế nắng gắt trong 24 giờ.',
        en: 'After facials, use SPF and avoid harsh sun for 24 hours.',
        fr: 'Après un soin du visage, utilisez un SPF et évitez le soleil intense pendant 24 heures.',
        cn: '面部护理后，请使用防晒并在 24 小时内避免强烈阳光。',
        ar: 'بعد العناية بالوجه، استخدم واقي الشمس وتجنب الشمس القوية لمدة 24 ساعة.',
      },
    },
    {
      icon: 'solar:moon-bold-duotone',
      title: { vi: 'Ngủ sớm', en: 'Sleep early', fr: 'Couchez-vous tôt', cn: '早睡', ar: 'نم مبكرًا' },
      text: {
        vi: 'Giấc ngủ sâu kéo dài hiệu quả thư giãn và phục hồi da.',
        en: 'Deep sleep extends relaxation and skin recovery benefits.',
        fr: 'Un sommeil profond prolonge les bienfaits de la détente et de la récupération de la peau.',
        cn: '深度睡眠能延长放松和肌肤修复的效果。',
        ar: 'النوم العميق يطيل فوائد الاسترخاء وتعافي البشرة.',
      },
    },
  ];

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.wellnessHero}
        title={spaMeta.wellness.title[lang]}
        subtitle={spaMeta.wellness.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={3}>
          {tips.map((tip) => (
            <Grid key={tip.title[lang]} xs={12} md={4}>
              <Card sx={{ p: 3, height: 1 }}>
                <Stack spacing={2}>
                  <Iconify icon={tip.icon} width={40} sx={{ color: 'primary.main' }} />
                  <Typography variant="h4">{tip.title[lang]}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{tip.text[lang]}</Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export function SpaMembershipPageView() {
  const lang = useSpaLang();
  const benefits = [
    ({
      en: 'Earn 5% points on every service bill',
      vi: 'Tích điểm 5% cho mỗi hóa đơn dịch vụ',
      fr: 'Gagnez 5 % de points sur chaque facture de service',
      cn: '每笔服务账单可获得 5% 积分',
      ar: 'اكسب 5% نقاط على كل فاتورة خدمة',
    } as const)[lang],
    ({
      en: 'Priority weekend booking and VIP rooms',
      vi: 'Ưu tiên đặt lịch cuối tuần và phòng VIP',
      fr: 'Réservation prioritaire le week-end et salles VIP',
      cn: '优先预约周末及 VIP 房间',
      ar: 'أولوية الحجز في عطلة نهاية الأسبوع وغرف VIP',
    } as const)[lang],
    ({
      en: 'Birthday gifts and quarterly complimentary skin checks',
      vi: 'Quà sinh nhật và kiểm tra da miễn phí mỗi quý',
      fr: 'Cadeaux d’anniversaire et bilans de peau gratuits chaque trimestre',
      cn: '生日礼物及每季免费肌肤检测',
      ar: 'هدايا عيد الميلاد وفحوصات بشرة مجانية كل ربع سنة',
    } as const)[lang],
    ({
      en: 'Automated reminders for recurring care plans',
      vi: 'Lịch chăm sóc định kỳ được nhắc tự động',
      fr: 'Rappels automatiques pour les programmes de soins récurrents',
      cn: '定期护理计划的自动提醒',
      ar: 'تذكيرات تلقائية لخطط العناية الدورية',
    } as const)[lang],
  ];

  return (
    <>
      <PageHero
        image={SPA_PAGE_IMAGES.membershipHero}
        title={spaMeta.membership.title[lang]}
        subtitle={spaMeta.membership.subtitle[lang]}
      />
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Card sx={{ p: { xs: 3, md: 5 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid xs={12} md={5}>
              <Typography variant="h2">
                {({ en: 'Serenity Club', vi: 'Serenity Club', fr: 'Serenity Club', cn: 'Serenity Club', ar: 'Serenity Club' } as const)[lang]}
              </Typography>
              <Typography sx={{ mt: 2, color: 'text.secondary' }}>
                {({
                  en: 'A membership program that helps guests keep a consistent care routine at better value.',
                  vi: 'Chương trình hội viên giúp khách hàng duy trì thói quen chăm sóc đều đặn với chi phí tối ưu.',
                  fr: 'Un programme d’adhésion qui aide les clients à maintenir une routine de soins régulière à meilleur prix.',
                  cn: '会员计划帮助宾客以更优惠的价格保持规律的护理习惯。',
                  ar: 'برنامج عضوية يساعد الضيوف على الحفاظ على روتين عناية منتظم بقيمة أفضل.',
                } as const)[lang]}
              </Typography>
            </Grid>
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
                {benefits.map((benefit) => (
                  <Stack key={benefit} direction="row" spacing={1.5}>
                    <Iconify icon="solar:verified-check-bold" sx={{ color: 'success.main' }} />
                    <Typography>{benefit}</Typography>
                  </Stack>
                ))}
                <Link component={RouterLink} href={paths.spa.contact} variant="subtitle1">
                  {({
                    en: 'Contact us to activate membership',
                    vi: 'Liên hệ để kích hoạt hội viên',
                    fr: 'Contactez-nous pour activer l’adhésion',
                    cn: '联系我们以激活会员',
                    ar: 'تواصل معنا لتفعيل العضوية',
                  } as const)[lang]}
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
