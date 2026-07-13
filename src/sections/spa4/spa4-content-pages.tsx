import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { Tab, Tabs } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';

import {
  INK,
  JADE,
  CREAM,
  SAKURA,
  spa4Faqs,
  ROSE_GOLD,
  JADE_LIGHT,
  spa4Offers,
  spa4Gallery,
  spa4Careers,
  spa4Branches,
  spa4Policies,
  spa4Services,
  spa4Packages,
  spa4Partners,
  type Spa4Lang,
  spa4BlogPosts,
  spa4Feedbacks,
  spa4Promotions,
  spa4ContactInfo,
  spa4Instructors,
  spa4AboutContent,
  spa4BeforeAfters,
  SPA4_PAGE_IMAGES,
  spa4FaqCategories,
  spa4BlogCategories,
  spa4CareerBenefits,
  spa4TrainingPrograms,
  spa4ServiceCategories,
} from './spa4-pages-data';

// ----------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------

const JADE_LIME = '#E8F5E9';

// ----------------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------------

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const getLang = (val?: string): Spa4Lang => {
  if (val === 'vi' || val === 'en' || val === 'fr' || val === 'cn' || val === 'ar') return val;
  return 'vi';
};

// ----------------------------------------------------------------------
// SHARED HERO COMPONENT
// ----------------------------------------------------------------------

function Spa4PageHero({
  image,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: CREAM,
        pt: { xs: 12, md: 18 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          bgcolor: JADE_LIGHT,
          opacity: 0.5,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -120,
          left: -100,
          width: 350,
          height: 350,
          borderRadius: '50%',
          bgcolor: SAKURA,
          opacity: 0.6,
        }}
      />

      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={6}>
            <Stack spacing={2.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Iconify icon="solar:leaf-bold-duotone" sx={{ color: JADE }} />
                <Typography
                  variant="overline"
                  sx={{ color: JADE, letterSpacing: 3, fontWeight: 700 }}
                >
                  {eyebrow}
                </Typography>
              </Stack>
              <Typography
                variant="h1"
                sx={{
                  color: INK,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  fontSize: { xs: 36, md: 48, lg: 56 },
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{ color: 'text.secondary', fontSize: 18, lineHeight: 1.7, maxWidth: 520 }}
              >
                {subtitle}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                <Button
                  component={RouterLink}
                  href={paths.spa4.booking}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: JADE,
                    color: 'common.white',
                    '&:hover': { bgcolor: '#154428' },
                  }}
                  startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                >
                  Đặt lịch ngay
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.spa4.contact}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    color: JADE,
                    border: `2px solid ${JADE}`,
                    '&:hover': { bgcolor: JADE_LIGHT },
                  }}
                >
                  Liên hệ tư vấn
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(27,67,50,0.2)',
              }}
            >
              <Box
                component="img"
                src={image}
                alt="hero"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// ABOUT PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4AboutPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);
  const content = spa4AboutContent;

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.about}
        eyebrow={content.eyebrow[lang]}
        title={content.title[lang]}
        subtitle={content.story[lang]}
      />

      {/* Values Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container component={MotionViewport}>
          <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{ color: ROSE_GOLD, letterSpacing: 4, fontWeight: 700 }}
            >
              Giá Trị Cốt Lõi
            </Typography>
            <Typography variant="h2" sx={{ color: INK, fontWeight: 800, textAlign: 'center' }}>
              Triết lý Jade Blossom
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {content.values.map((value) => (
              <Card
                key={value.title.en}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: `1px solid ${JADE_LIGHT}`,
                  boxShadow: '0 8px 32px rgba(27,67,50,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                  },
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      bgcolor: JADE_LIGHT,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={value.icon} width={36} sx={{ color: JADE }} />
                  </Box>
                  <Typography variant="h5" sx={{ color: INK, fontWeight: 700 }}>
                    {value.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    {value.desc[lang]}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: JADE }}>
        <Container>
          <Typography
            variant="h3"
            sx={{ color: '#ffffff', fontWeight: 800, textAlign: 'center', mb: 6 }}
          >
            Hành trình phát triển
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            spacing={{ xs: 4, md: 8 }}
            useFlexGap
          >
            {content.milestones.map((m, index) => (
              <Stack key={m.year} alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: ROSE_GOLD,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: 'white', fontWeight: 800 }}>{m.year}</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {m.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CREAM }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
              gap: 4,
            }}
          >
            {content.stats.map((stat) => (
              <Stack key={stat.label.en} alignItems="center" spacing={1}>
                <Typography variant="h2" sx={{ color: JADE, fontWeight: 900 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {stat.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// SERVICES PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4ServicesPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  const filtered = useMemo(
    () => (category === 'all' ? spa4Services : spa4Services.filter((s) => s.category === category)),
    [category]
  );

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.services}
        eyebrow="DỊCH VỤ"
        title="Liệu trình độc quyền"
        subtitle="Kết hợp phương pháp truyền thống Á Đông với công nghệ tiên tiến phương Tây"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4 }}
          >
            {spa4ServiceCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: INK }}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
              gap: 3,
            }}
          >
            {filtered.map((service) => (
              <Card
                key={service.id}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(27,67,50,0.15)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.title.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h6" sx={{ color: INK, fontWeight: 700 }}>
                      {service.title[lang]}
                    </Typography>
                    {service.badge && (
                      <Chip
                        label={service.badge[lang]}
                        size="small"
                        sx={{ bgcolor: ROSE_GOLD, color: 'white', fontWeight: 600 }}
                      />
                    )}
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                  >
                    {service.desc[lang]}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify icon="solar:clock-circle-bold" width={16} sx={{ color: JADE }} />
                      <Typography variant="caption" sx={{ color: JADE }}>
                        {service.duration} phút
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2" sx={{ color: ROSE_GOLD, fontWeight: 800 }}>
                      {formatVND(service.price)}
                    </Typography>
                  </Stack>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// SERVICE DETAILS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4ServiceDetailsPageView() {
  const { id = '' } = useParams();
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  const service = spa4Services.find((s) => s.id === id);

  if (!service) {
    return (
      <Box sx={{ py: 20, textAlign: 'center' }}>
        <Typography>Dịch vụ không tìm thấy</Typography>
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ pt: 16, pb: 10, bgcolor: CREAM }}>
      <Container>
        <Button
          component={RouterLink}
          href={paths.spa4.services}
          startIcon={<Iconify icon="solar:arrow-left-bold" />}
          sx={{ mb: 3, color: JADE }}
        >
          Quay lại dịch vụ
        </Button>
        <Grid container spacing={6}>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(27,67,50,0.15)',
              }}
            >
              <Box
                component="img"
                src={service.image}
                alt={service.title.en}
                sx={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              {service.badge && (
                <Chip
                  label={service.badge[lang]}
                  sx={{
                    alignSelf: 'flex-start',
                    bgcolor: ROSE_GOLD,
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}
              <Typography variant="h3" sx={{ color: INK, fontWeight: 800 }}>
                {service.title[lang]}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {service.desc[lang]}
              </Typography>
              <Stack direction="row" spacing={4}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Iconify icon="solar:clock-circle-bold-duotone" width={20} sx={{ color: JADE }} />
                  <Typography sx={{ color: INK }}>{service.duration} phút</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Giá tham khảo
                  </Typography>
                  <Typography variant="h4" sx={{ color: ROSE_GOLD, fontWeight: 800 }}>
                    {formatVND(service.price)}
                  </Typography>
                </Stack>
                <Button
                  component={RouterLink}
                  href={paths.spa4.booking}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: JADE,
                    color: 'white',
                    '&:hover': { bgcolor: '#154428' },
                  }}
                  startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                >
                  Đặt lịch ngay
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// TRAINING PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4TrainingPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.training}
        eyebrow="ĐÀO TẠO"
        title="Học viện Jade"
        subtitle="Khóa học chuyên nghiệp từ các chuyên gia hàng đầu, chứng nhận quốc tế"
      />

      {/* Programs */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Typography variant="h3" sx={{ color: INK, fontWeight: 800, textAlign: 'center', mb: 6 }}>
            Chương trình đào tạo
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa4TrainingPrograms.map((prog) => (
              <Card
                key={prog.title.en}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    boxShadow: '0 16px 40px rgba(27,67,50,0.12)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/9', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                  <Box
                    component="img"
                    src={prog.image}
                    alt={prog.title.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Typography variant="h6" sx={{ color: INK, fontWeight: 700, mb: 1 }}>
                  {prog.title[lang]}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 1.5 }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Iconify icon="solar:clock-circle-bold" width={16} sx={{ color: JADE }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {prog.duration[lang]}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                >
                  {prog.desc[lang]}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: ROSE_GOLD, fontWeight: 800 }}>
                  {formatVND(prog.price)}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Instructors */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: JADE_LIGHT }}>
        <Container>
          <Typography variant="h3" sx={{ color: INK, fontWeight: 800, textAlign: 'center', mb: 6 }}>
            Đội ngũ giảng viên
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa4Instructors.map((instructor) => (
              <Stack key={instructor.name} alignItems="center" textAlign="center" spacing={2}>
                <Avatar
                  src={instructor.image}
                  sx={{ width: 120, height: 120, border: `3px solid ${JADE}` }}
                />
                <Typography variant="h6" sx={{ color: INK, fontWeight: 700 }}>
                  {instructor.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {instructor.title} · {instructor.exp}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BLOG PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4BlogPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  const filtered = useMemo(
    () =>
      category === 'all'
        ? spa4BlogPosts
        : spa4BlogPosts.filter((p) => {
            const catMap: Record<string, string> = {
              skincare: 'skincare',
              therapy: 'therapy',
              ingredients: 'ingredients',
              tips: 'tips',
            };
            return p.category.en.toLowerCase().includes(catMap[category] || '');
          }),
    [category]
  );

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.blog}
        eyebrow="BLOG"
        title="Beauty Journal"
        subtitle="Kiến thức làm đẹp, mẹo chăm sóc da và xu hướng mới nhất"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4 }}
          >
            {spa4BlogCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: INK }}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {filtered.map((post) => (
              <Card
                key={post.id}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={post.image}
                    alt={post.title.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <Chip
                      label={post.category[lang]}
                      size="small"
                      sx={{ bgcolor: JADE_LIGHT, color: JADE }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {post.date}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      · {post.readTime}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h6"
                    sx={{ color: INK, fontWeight: 700, mb: 1, lineHeight: 1.3 }}
                  >
                    {post.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {post.excerpt[lang]}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>

          <Stack alignItems="center" sx={{ mt: 4 }}>
            <Pagination count={3} color="primary" />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BLOG DETAILS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4BlogDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  const post = spa4BlogPosts.find((p) => p.slug === slug) ?? spa4BlogPosts[0];
  const related = spa4BlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Spa4PageHero
        image={post.image}
        eyebrow={post.category[lang]}
        title={post.title[lang]}
        subtitle={post.excerpt[lang]}
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Avatar sx={{ bgcolor: JADE, color: 'white', fontWeight: 700 }}>
              {post.author[0]}
            </Avatar>
            <Stack>
              <Typography sx={{ color: INK, fontWeight: 600 }}>{post.author}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
                {post.date} · {post.readTime}
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              height: { xs: 220, md: 360 },
              borderRadius: 4,
              mb: 4,
              backgroundImage: `url(${post.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <Typography sx={{ color: INK, lineHeight: 1.9, mb: 3 }}>
            Chăm sóc bản thân là một hành trình dài, không phải đích đến. Mỗi ngày dành ra 15–30
            phút cho cơ thể và tâm trí có thể tạo ra sự khác biệt lớn theo thời gian. Tại Jade
            Blossom, chúng tôi tin rằng vẻ đẹp đến từ sự cân bằng giữa truyền thống Á Đông và khoa
            học hiện đại.
          </Typography>

          <Typography variant="h5" sx={{ color: JADE, mb: 2, fontWeight: 700 }}>
            1. Bắt đầu từ những điều nhỏ nhất
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
            Một tách trà thảo mộc vào buổi sáng, vài phút thiền định, hoặc một liệu trình massage
            nhẹ nhàng — đây là những bước khởi đầu đơn giản nhưng mang lại hiệu quả bền vững cho cơ
            thể và tâm trí.
          </Typography>

          <Typography variant="h5" sx={{ color: JADE, mb: 2, fontWeight: 700 }}>
            2. Lắng nghe cơ thể
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
            Cơ thể luôn thì thầm những gì nó cần. Khi mệt mỏi, hãy nghỉ ngơi. Khi căng thẳng, hãy
            cho phép bản thân được chăm sóc với các liệu pháp từ thiên nhiên.
          </Typography>

          <Box
            sx={{
              p: 3,
              borderLeft: `4px solid ${ROSE_GOLD}`,
              bgcolor: JADE_LIGHT,
              my: 4,
              borderRadius: '0 2 2 0',
            }}
          >
            <Typography sx={{ color: INK, fontStyle: 'italic', lineHeight: 1.8 }}>
              &ldquo;Vẻ đẹp thực sự đến từ sự cân bằng giữa cơ thể, tâm trí và thiên nhiên — triết
              lý ngàn năm của Á Đông.&rdquo;
            </Typography>
          </Box>

          {/* Related Posts */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ color: INK, fontWeight: 700, mb: 3 }}>
              Bài viết liên quan
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
                gap: 3,
              }}
            >
              {related.map((r) => (
                <Card
                  key={r.id}
                  component={RouterLink}
                  href={paths.spa4.blogDetails(r.slug)}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    border: `1px solid ${JADE_LIGHT}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: JADE,
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 30px rgba(27,67,50,0.1)',
                    },
                  }}
                >
                  <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={r.image}
                      alt={r.title.en}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: INK, fontWeight: 600, lineHeight: 1.4 }}
                    >
                      {r.title[lang]}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// CAREERS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4CareersPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.careers}
        eyebrow="TUYỂN DỤNG"
        title="Gia nhập Jade Blossom"
        subtitle="Cơ hội nghề nghiệp tại môi trường chuyên nghiệp và đầy cảm hứng"
      />

      {/* Benefits */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: JADE }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ color: '#ffffff', fontWeight: 800, textAlign: 'center', mb: 4 }}
          >
            Quyền lợi
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(6,1fr)' },
              gap: 3,
            }}
          >
            {spa4CareerBenefits.map((benefit) => (
              <Stack key={benefit.label.en} alignItems="center" textAlign="center" spacing={1}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    bgcolor: ROSE_GOLD,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon={benefit.icon} width={28} sx={{ color: 'white' }} />
                </Box>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  {benefit.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Job Openings */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Typography variant="h3" sx={{ color: INK, fontWeight: 800, textAlign: 'center', mb: 6 }}>
            Vị trí tuyển dụng
          </Typography>
          <Stack spacing={3}>
            {spa4Careers.map((job, index) => (
              <Card
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    boxShadow: '0 12px 32px rgba(27,67,50,0.1)',
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid xs={12} md={4}>
                    <Typography variant="h6" sx={{ color: INK, fontWeight: 700 }}>
                      {job.title[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {job.location[lang]} · {job.type[lang]}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={5}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {job.desc[lang]}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: ROSE_GOLD, fontWeight: 700, mb: 1 }}
                    >
                      {job.salary}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: JADE,
                        color: JADE,
                        borderRadius: 2,
                        '&:hover': { bgcolor: JADE_LIGHT },
                      }}
                    >
                      Ứng tuyển
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BOOKING PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4BookingPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.booking}
        eyebrow="ĐẶT LỊCH"
        title="Đặt lịch online"
        subtitle="Chọn liệu trình, chi nhánh và thời gian phù hợp với bạn"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: `1px solid ${JADE_LIGHT}` }}>
            <Stack spacing={4}>
              <Typography variant="h5" sx={{ color: INK, fontWeight: 700 }}>
                Thông tin đặt lịch
              </Typography>

              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: JADE }}>
                  Chọn liệu trình
                </Typography>
                <TextField select defaultValue="" size="medium">
                  <MenuItem value="">-- Chọn liệu trình --</MenuItem>
                  {spa4Services.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.title[lang]} ({s.duration} phút - {formatVND(s.price)})
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: JADE }}>
                  Chọn chi nhánh
                </Typography>
                <TextField select defaultValue="" size="medium">
                  <MenuItem value="">-- Chọn chi nhánh --</MenuItem>
                  {spa4Branches.map((b, i) => (
                    <MenuItem key={i} value={i}>
                      {b.name[lang]}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: JADE }}>
                  Chọn ngày và giờ
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField type="date" size="medium" sx={{ flex: 1 }} />
                  <TextField select defaultValue="" size="medium" sx={{ flex: 1 }}>
                    <MenuItem value="">-- Chọn giờ --</MenuItem>
                    {[
                      '09:00',
                      '10:00',
                      '11:00',
                      '14:00',
                      '15:00',
                      '16:00',
                      '17:00',
                      '18:00',
                      '19:00',
                    ].map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Stack>

              <Divider />

              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: JADE }}>
                  Thông tin khách hàng
                </Typography>
                <TextField label="Họ và tên" size="medium" />
                <TextField label="Số điện thoại" size="medium" />
                <TextField label="Ghi chú (tùy chọn)" multiline rows={3} />
              </Stack>

              <Button
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: JADE,
                  color: 'white',
                  '&:hover': { bgcolor: '#154428' },
                }}
              >
                Xác nhận đặt lịch
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// CONTACT PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4ContactPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);
  const info = spa4ContactInfo;

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.contact}
        eyebrow="LIÊN HỆ"
        title="Kết nối với chúng tôi"
        subtitle="Mọi thắc mắc xin liên hệ qua các kênh bên dưới"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Grid container spacing={6}>
            <Grid xs={12} md={6}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: JADE, mb: 1 }}>
                    Địa chỉ
                  </Typography>
                  <Typography variant="body1" sx={{ color: INK }}>
                    {info.address[lang]}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: JADE, mb: 1 }}>
                    Hotline
                  </Typography>
                  <Typography variant="body1" sx={{ color: INK }}>
                    {info.phone}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: JADE, mb: 1 }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ color: INK }}>
                    {info.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: JADE, mb: 1 }}>
                    Giờ hoạt động
                  </Typography>
                  <Typography variant="body1" sx={{ color: INK }}>
                    {info.hours[lang]}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  {info.socials.map((social) => (
                    <Button
                      key={social.icon}
                      href={social.url}
                      target="_blank"
                      sx={{
                        minWidth: 40,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: JADE_LIME,
                        color: JADE,
                        p: 0,
                        '&:hover': { bgcolor: JADE, color: 'white' },
                      }}
                    >
                      <Iconify icon={social.icon} width={20} />
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Card
                sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: `1px solid ${JADE_LIGHT}` }}
              >
                <Typography variant="h6" sx={{ color: INK, fontWeight: 700, mb: 3 }}>
                  Gửi tin nhắn
                </Typography>
                <Stack spacing={2}>
                  <TextField label="Họ và tên" size="medium" />
                  <TextField label="Email" size="medium" />
                  <TextField label="Tiêu đề" size="medium" />
                  <TextField label="Nội dung" multiline rows={4} />
                  <Button
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      bgcolor: JADE,
                      color: 'white',
                      '&:hover': { bgcolor: '#154428' },
                    }}
                  >
                    Gửi tin nhắn
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// OFFERS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4OffersPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.offers}
        eyebrow="ƯU ĐÃI"
        title="Ưu đãi đặc biệt"
        subtitle="Các chương trình ưu đãi hấp dẫn dành riêng cho bạn"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa4Offers.map((offer, index) => (
              <Card
                key={index}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center',
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    bgcolor: JADE_LIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon={offer.icon} width={36} sx={{ color: JADE }} />
                </Box>
                <Typography variant="h5" sx={{ color: INK, fontWeight: 700, mb: 1 }}>
                  {offer.title[lang]}
                </Typography>
                <Typography variant="h2" sx={{ color: ROSE_GOLD, fontWeight: 900, mb: 1 }}>
                  {offer.discount}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {offer.desc[lang]}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// FEEDBACK PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4FeedbackPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.feedback}
        eyebrow="ĐÁNH GIÁ"
        title="Phản hồi từ khách hàng"
        subtitle="Những chia sẻ chân thật từ khách hàng sau khi trải nghiệm dịch vụ"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa4Feedbacks.map((fb, index) => (
              <Card
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    boxShadow: '0 16px 40px rgba(27,67,50,0.1)',
                  },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ mb: 2 }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: JADE, color: 'white', fontWeight: 700 }}>
                      {fb.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: INK, fontWeight: 700 }}>
                        {fb.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {fb.branch[lang]}
                      </Typography>
                    </Box>
                  </Stack>
                  <Rating value={fb.rating} readOnly size="small" />
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}
                >
                  &ldquo;{fb.comment[lang]}&rdquo;
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Chip label={fb.service} size="small" sx={{ bgcolor: JADE_LIGHT, color: JADE }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {fb.date}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// PROMOTIONS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4PromotionsPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.promotions}
        eyebrow="KHUYẾN MÃI"
        title="Khuyến mãi.hot"
        subtitle="Săn khuyến mãi với mã giảm giá hấp dẫn"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa4Promotions.map((promo, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={promo.image}
                    alt={promo.title.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: ROSE_GOLD,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 700 }}>
                      -{promo.discount}%
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: INK, fontWeight: 700, mb: 1 }}>
                    {promo.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                  >
                    {promo.desc[lang]}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Mã:
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: JADE, fontWeight: 800, ml: 0.5, display: 'inline' }}
                      >
                        {promo.code}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Đến {promo.validUntil}
                    </Typography>
                  </Stack>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BRANCHES PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4BranchesPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.branches}
        eyebrow="CHI NHÁNH"
        title="Hệ thống chi nhánh"
        subtitle="Gần 5 chi nhánh trên toàn quốc, thuận tiện cho bạn"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa4Branches.map((branch, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: branch.isHQ ? `2px solid ${JADE}` : `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={branch.image}
                    alt={branch.name.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Typography variant="h6" sx={{ color: INK, fontWeight: 700 }}>
                      {branch.name[lang]}
                    </Typography>
                    {branch.isHQ && (
                      <Chip
                        label="HQ"
                        size="small"
                        sx={{ bgcolor: JADE, color: 'white', height: 20 }}
                      />
                    )}
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {branch.address[lang]}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Iconify icon="solar:phone-bold" width={16} sx={{ color: JADE }} />
                      <Typography variant="caption">{branch.phone}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Iconify icon="solar:clock-circle-bold" width={16} sx={{ color: JADE }} />
                      <Typography variant="caption">{branch.hours}</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// ACCOUNT PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4AccountPageView() {
  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.branches}
        eyebrow="TÀI KHOẢN"
        title="Quản lý tài khoản"
        subtitle="Xem lịch sử đặt lịch và thông tin cá nhân"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Tabs defaultValue="profile" sx={{ mb: 4 }}>
            <Tab value="profile" label="Thông tin cá nhân" />
            <Tab value="bookings" label="Lịch sử đặt lịch" />
            <Tab value="membership" label="Thành viên" />
          </Tabs>

          <Card sx={{ p: 4, borderRadius: 4, border: `1px solid ${JADE_LIGHT}` }}>
            <Stack spacing={3}>
              <Typography variant="h6" sx={{ color: INK, fontWeight: 700 }}>
                Thông tin cá nhân
              </Typography>
              <TextField label="Họ và tên" defaultValue="Nguyễn Văn A" size="medium" />
              <TextField label="Email" defaultValue="nguyenvana@email.com" size="medium" />
              <TextField label="Số điện thoại" defaultValue="0123456789" size="medium" />
              <TextField label="Ngày sinh" type="date" size="medium" />
              <Button
                size="large"
                sx={{
                  alignSelf: 'flex-start',
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  bgcolor: JADE,
                  color: 'white',
                  '&:hover': { bgcolor: '#154428' },
                }}
              >
                Cập nhật thông tin
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// PARTNERS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4PartnersPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.partners}
        eyebrow="CỘNG SỰ"
        title="Đối tác chiến lược"
        subtitle="Các thương hiệu hàng đầu đồng hành cùng Jade Blossom"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' },
              gap: 4,
            }}
          >
            {spa4Partners.map((partner, index) => (
              <Card
                key={index}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  textAlign: 'center',
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    boxShadow: '0 16px 40px rgba(27,67,50,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: 80,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={partner.name}
                    sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </Box>
                <Typography variant="h6" sx={{ color: INK, fontWeight: 700, mb: 0.5 }}>
                  {partner.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {partner.type[lang]}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// PACKAGES PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4PackagesPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.packages}
        eyebrow="GÓI LIỆU TRÌNH"
        title="Gói liệu trình tiết kiệm"
        subtitle="Mua gói tiết kiệm hơn đến 30% so với lẻ"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa4Packages.map((pkg, index) => (
              <Card
                key={index}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  textAlign: 'center',
                  border: pkg.popular ? `2px solid ${JADE}` : `1px solid ${JADE_LIGHT}`,
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                  },
                }}
              >
                {pkg.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -1,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: JADE,
                      px: 2,
                      py: 0.5,
                      borderRadius: '0 0 8px 8px',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 700 }}>
                      Phổ biến
                    </Typography>
                  </Box>
                )}
                <Typography variant="h5" sx={{ color: INK, fontWeight: 700, mb: 2 }}>
                  {pkg.name[lang]}
                </Typography>
                <Typography variant="h2" sx={{ color: ROSE_GOLD, fontWeight: 900, mb: 0.5 }}>
                  {formatVND(pkg.price)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  {pkg.sessions} buổi · {pkg.validity[lang]}
                </Typography>
                <Stack spacing={1} sx={{ mb: 3, textAlign: 'left' }}>
                  {pkg.treatments.map((t) => (
                    <Stack key={t} direction="row" spacing={1} alignItems="flex-start">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={18}
                        sx={{ color: JADE, mt: 0.25 }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
                <Box
                  sx={{
                    py: 1,
                    px: 2,
                    bgcolor: JADE_LIGHT,
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: JADE, fontWeight: 700 }}>
                    Tiết kiệm {pkg.save}%
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 2,
                    bgcolor: JADE,
                    color: 'white',
                    '&:hover': { bgcolor: '#154428' },
                  }}
                >
                  Đặt mua
                </Button>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BEFORE-AFTER PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4BeforeAfterPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.beforeAfter}
        eyebrow="KẾT QUẢ"
        title="Kết quả trước - sau"
        subtitle="Thành quả thực tế từ khách hàng sau liệu trình"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 5,
            }}
          >
            {spa4BeforeAfters.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${JADE_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: JADE,
                    boxShadow: '0 20px 50px rgba(27,67,50,0.12)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', height: 220 }}>
                  <Box sx={{ flex: 1, position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.beforeImage}
                      alt="Before"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        px: 1,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'white' }}>
                        Trước
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.afterImage}
                      alt="After"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: JADE,
                        px: 1,
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'white' }}>
                        Sau
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h6" sx={{ color: INK, fontWeight: 700 }}>
                      {item.name}, {item.age}
                    </Typography>
                    <Chip
                      label={`${item.sessions} buổi`}
                      size="small"
                      sx={{ bgcolor: JADE_LIGHT, color: JADE }}
                    />
                  </Stack>
                  <Typography variant="subtitle2" sx={{ color: ROSE_GOLD, mb: 1 }}>
                    {item.treatment}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.7 }}
                  >
                    &ldquo;{item.testimonial[lang]}&rdquo;
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// FAQ PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4FaqPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  const filtered = useMemo(
    () =>
      category === 'all'
        ? spa4Faqs
        : spa4Faqs.filter((f) => {
            const catMap: Record<string, string> = {
              general: 'Tổng quan',
              treatment: 'Liệu trình',
              booking: 'Đặt lịch',
              policy: 'Chính sách',
              membership: 'Thành viên',
            };
            return f.category.vi === catMap[category];
          }),
    [category]
  );

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.gallery}
        eyebrow="FAQ"
        title="Câu hỏi thường gặp"
        subtitle="Giải đáp mọi thắc mắc về dịch vụ của chúng tôi"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4 }}
          >
            {spa4FaqCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: INK }}
              />
            ))}
          </Tabs>

          <Stack spacing={2}>
            {filtered.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${JADE_LIGHT}`,
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: JADE },
                }}
              >
                <AccordionSummary
                  sx={{
                    '& .MuiAccordionSummary-content': { alignItems: 'center' },
                    '& .MuiAccordionSummary-expandIconWrapper': { color: JADE },
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: INK, fontWeight: 700 }}>
                    {faq.q[lang]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    {faq.a[lang]}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// POLICY PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4PolicyPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.gallery}
        eyebrow="CHÍNH SÁCH"
        title="Chính sách & Quy định"
        subtitle="Thông tin chính sách của Jade Blossom"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            {spa4Policies.map((policy, index) => (
              <Card
                key={index}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: `1px solid ${JADE_LIGHT}`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: JADE,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 700 }}>{index + 1}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: INK, fontWeight: 700, mb: 1 }}>
                      {policy.title[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {policy.content[lang]}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// GALLERY PAGE VIEW
// ----------------------------------------------------------------------

export function Spa4GalleryPageView() {
  const { currentLang } = useTranslate('spa4');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa4PageHero
        image={SPA4_PAGE_IMAGES.gallery}
        eyebrow="GALLERY"
        title="Không gian Jade Blossom"
        subtitle="Tận hưởng không gian thư giãn yên bình"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
              gap: 2,
            }}
          >
            {spa4Gallery.map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  aspectRatio: '1/1',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    '& img': { transform: 'scale(1.1)' },
                    '& .overlay': { opacity: 1 },
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.src}
                  alt={item.caption.en}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(27,67,50,0.7)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                    {item.caption[lang]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
