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

import {
  INK,
  NAVY,
  GOLD,
  CREAM,
  BURGUNDY,
  spa5Faqs,
  spa5Offers,
  spa5Gallery,
  spa5Careers,
  spa5Partners,
  spa5Branches,
  spa5Policies,
  spa5Services,
  spa5Packages,
  type Spa5Lang,
  spa5BlogPosts,
  spa5Feedbacks,
  spa5Promotions,
  spa5ContactInfo,
  spa5Instructors,
  spa5AboutContent,
  spa5BeforeAfters,
  SPA5_PAGE_IMAGES,
  spa5FaqCategories,
  spa5BlogCategories,
  spa5CareerBenefits,
  spa5TrainingPrograms,
  spa5ServiceCategories,
} from './spa5-pages-data';

// ----------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------

const NAVY_LIGHTER = '#E8E8F0';

// ----------------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------------

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const getLang = (val?: string): Spa5Lang => {
  if (val === 'vi' || val === 'en' || val === 'fr' || val === 'cn' || val === 'ar') return val;
  return 'vi';
};

// ----------------------------------------------------------------------
// SHARED HERO COMPONENT - FRENCH LUXURY STYLE
// ----------------------------------------------------------------------

function Spa5PageHero({
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
      {/* Decorative gold lines */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '1px',
          height: '40%',
          bgcolor: GOLD,
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: '10%',
          width: '1px',
          height: '30%',
          bgcolor: GOLD,
          opacity: 0.3,
        }}
      />

      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <Typography
                variant="overline"
                sx={{
                  color: GOLD,
                  letterSpacing: 6,
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {eyebrow}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: NAVY,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: -0.5,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}
              >
                {subtitle}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: NAVY,
                    '&:hover': { bgcolor: INK },
                    borderRadius: 0,
                    px: 4,
                  }}
                >
                  Đặt lịch
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: GOLD,
                    color: GOLD,
                    borderRadius: 0,
                    px: 4,
                    '&:hover': { borderColor: GOLD, bgcolor: 'rgba(201,168,76,0.08)' },
                  }}
                >
                  Liên hệ
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '4/5',
                boxShadow: '0 40px 80px rgba(26,26,62,0.15)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  border: `2px solid ${GOLD}`,
                  transform: 'translate(16px, 16px)',
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src={image}
                alt="hero"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
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

export function Spa5AboutPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);
  const content = spa5AboutContent;

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.about}
        eyebrow={content.eyebrow[lang]}
        title={content.title[lang]}
        subtitle={content.subtitle[lang]}
      />

      {/* Story Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Typography
            variant="h3"
            sx={{ color: NAVY, fontWeight: 700, mb: 4, textAlign: 'center' }}
          >
            {content.story[lang]}
          </Typography>

          {/* Milestones */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 2, md: 6 },
              flexWrap: 'wrap',
              my: 6,
            }}
          >
            {content.milestones.map((m, idx) => (
              <Stack key={m.year} alignItems="center" sx={{ position: 'relative' }}>
                {idx < content.milestones.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: -30,
                      top: '50%',
                      width: 40,
                      height: 1,
                      bgcolor: GOLD,
                      display: { xs: 'none', md: 'block' },
                    }}
                  />
                )}
                <Typography variant="h2" sx={{ color: GOLD, fontWeight: 700 }}>
                  {m.year}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  {m.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Values Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CREAM }}>
        <Container>
          <Typography
            variant="overline"
            sx={{
              color: GOLD,
              letterSpacing: 6,
              fontWeight: 600,
              display: 'block',
              textAlign: 'center',
              mb: 2,
            }}
          >
            NOS VALEURS
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: NAVY, fontWeight: 700, textAlign: 'center', mb: 6 }}
          >
            Giá trị cốt lõi
          </Typography>

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
                  borderRadius: 0,
                  border: `1px solid ${NAVY_LIGHTER}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: GOLD,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px rgba(201,168,76,0.1)`,
                  },
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      border: `2px solid ${GOLD}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={value.icon} width={32} sx={{ color: NAVY }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700 }}>
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

      {/* Stats */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: NAVY }}>
        <Container>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={{ xs: 4, md: 10 }}
            flexWrap="wrap"
            useFlexGap
          >
            {content.stats.map((stat) => (
              <Stack key={stat.label.en} alignItems="center" spacing={1}>
                <Iconify icon={stat.icon} width={28} sx={{ color: GOLD }} />
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {stat.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// SERVICES PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5ServicesPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  const filtered = useMemo(
    () => (category === 'all' ? spa5Services : spa5Services.filter((s) => s.category === category)),
    [category]
  );

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.services}
        eyebrow="NOS SOINS"
        title="Liệu Trình Đặc Trưng"
        subtitle="Balnéothérapie chuẩn Pháp với nguyên liệu thượng hạng từ Bordeaux, Brittany và Provence"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, '& .MuiTabs-indicator': { bgcolor: GOLD } }}
          >
            {spa5ServiceCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: NAVY, '&.Mui-selected': { color: GOLD } }}
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
            {filtered.map((service) => (
              <Card
                key={service.id}
                component={RouterLink}
                href={paths.spa5.serviceDetails(service.slug)}
                sx={{
                  textDecoration: 'none',
                  borderRadius: 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(26,26,62,0.12)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.name.en}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700 }}>
                      {service.name[lang]}
                    </Typography>
                    <Iconify icon={service.icon} width={24} sx={{ color: GOLD }} />
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}
                  >
                    {service.shortDesc[lang]}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {service.duration[lang]}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: GOLD, fontWeight: 700 }}>
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

export function Spa5ServiceDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  const service = spa5Services.find((s) => s.slug === slug) ?? spa5Services[0];

  return (
    <>
      <Spa5PageHero
        image={service.image}
        eyebrow="SOIN"
        title={service.name[lang]}
        subtitle={service.shortDesc[lang]}
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 4,
                p: 3,
                bgcolor: CREAM,
                borderRadius: 0,
              }}
            >
              <Stack alignItems="center">
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Thời lượng
                </Typography>
                <Typography variant="h5" sx={{ color: NAVY, fontWeight: 700 }}>
                  {service.duration[lang]}
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Giá
                </Typography>
                <Typography variant="h5" sx={{ color: GOLD, fontWeight: 700 }}>
                  {formatVND(service.price)}
                </Typography>
              </Stack>
            </Box>

            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: NAVY,
                '&:hover': { bgcolor: INK },
                borderRadius: 0,
                py: 2,
              }}
            >
              Đặt lịch ngay
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// TRAINING PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5TrainingPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.training}
        eyebrow="FORMATION"
        title="Đào Tạo Chuyên Sâu"
        subtitle="Chương trình đào tạo chuẩn Pháp về balnéothérapie và thẩm mỹ"
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
            {spa5TrainingPrograms.map((program) => (
              <Card
                key={program.id}
                sx={{
                  borderRadius: 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(26,26,62,0.1)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={program.image}
                    alt={program.title.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Chip
                    label={program.level[lang]}
                    size="small"
                    sx={{ bgcolor: GOLD, color: 'white', fontWeight: 600, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700, mb: 1 }}>
                    {program.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                  >
                    {program.description[lang]}
                  </Typography>
                  <Typography variant="caption" sx={{ color: GOLD, fontWeight: 600 }}>
                    {program.duration[lang]}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Instructors */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: NAVY }}>
        <Container>
          <Typography
            variant="h3"
            sx={{ color: 'white', fontWeight: 700, textAlign: 'center', mb: 6 }}
          >
            Giảng viên
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa5Instructors.map((instructor) => (
              <Stack key={instructor.name} alignItems="center" spacing={2}>
                <Avatar
                  src={instructor.avatar}
                  sx={{ width: 100, height: 100, border: `3px solid ${GOLD}` }}
                />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                  {instructor.name}
                </Typography>
                <Typography variant="body2" sx={{ color: GOLD }}>
                  {instructor.title[lang]}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}
                >
                  {instructor.bio[lang]}
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

export function Spa5BlogPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  const filtered = useMemo(
    () =>
      category === 'all'
        ? spa5BlogPosts
        : spa5BlogPosts.filter((p) => {
            const catMap: Record<string, string> = {
              skincare: 'skincare',
              wellness: 'wellness',
              lifestyle: 'lifestyle',
            };
            return p.category.en.toLowerCase().includes(catMap[category] || '');
          }),
    [category]
  );

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.blog}
        eyebrow="JOURNAL"
        title="Blog Lumière"
        subtitle="Cẩm nang balnéothérapie, bí quyết chăm sóc da và phong cách sống Pháp"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, '& .MuiTabs-indicator': { bgcolor: GOLD } }}
          >
            {spa5BlogCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: NAVY, '&.Mui-selected': { color: GOLD } }}
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
                component={RouterLink}
                href={paths.spa5.blogDetails(post.slug)}
                sx={{
                  borderRadius: 0,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 50px rgba(26,26,62,0.12)',
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
                      sx={{ bgcolor: CREAM, color: NAVY }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {post.date}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      · {post.readTime[lang]}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h6"
                    sx={{ color: NAVY, fontWeight: 700, mb: 1, lineHeight: 1.3 }}
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
            <Pagination count={3} sx={{ '& .Mui-selected': { bgcolor: GOLD, color: 'white' } }} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BLOG DETAILS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5BlogDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  const post = spa5BlogPosts.find((p) => p.slug === slug) ?? spa5BlogPosts[0];
  const related = spa5BlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Spa5PageHero
        image={post.image}
        eyebrow={post.category[lang]}
        title={post.title[lang]}
        subtitle={post.excerpt[lang]}
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Avatar sx={{ bgcolor: NAVY, color: 'white', fontWeight: 700 }}>
              {post.author[0]}
            </Avatar>
            <Stack>
              <Typography sx={{ color: NAVY, fontWeight: 600 }}>{post.author}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
                {post.date} · {post.readTime[lang]}
              </Typography>
            </Stack>
          </Stack>

          <Box
            sx={{
              height: { xs: 220, md: 360 },
              mb: 4,
              backgroundImage: `url(${post.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <Typography sx={{ color: NAVY, lineHeight: 1.9, mb: 3 }}>
            Balnéothérapie là nghệ thuật tắm khoáng Pháp với lịch sử hàng trăm năm. Khởi nguồn từ
            các suối khoáng ở Vichy, phương pháp này đã trở thành biểu tượng của chăm sóc sức khỏe
            sang trọng.
          </Typography>

          <Typography variant="h5" sx={{ color: NAVY, mb: 2, fontWeight: 700 }}>
            1. Nguyên lý cơ bản
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
            Nước khoáng giàu magie và canxi, kết hợp với nhiệt độ tối ưu 38–42°C, tạo ra hiệu ứng
            thư giãn sâu và thanh lọc tự nhiên.
          </Typography>

          <Typography variant="h5" sx={{ color: NAVY, mb: 2, fontWeight: 700 }}>
            2. Quy trình chuẩn Pháp
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
            Từ tiền xử lý đến phục hồi, mỗi bước đều được thiết kế để tối đa hóa trải nghiệm
            therapeutic và mang lại sự thư thái trọn vẹn.
          </Typography>

          <Box
            sx={{
              p: 3,
              borderLeft: `4px solid ${GOLD}`,
              bgcolor: CREAM,
              my: 4,
            }}
          >
            <Typography sx={{ color: NAVY, fontStyle: 'italic', lineHeight: 1.8 }}>
              &ldquo;La balnéothérapie est l&ldquo;art de soigner le corps et l&ldquo;esprit par
              l&ldquo;eau thermale.&rdquo;
            </Typography>
          </Box>

          {/* Related Posts */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ color: NAVY, fontWeight: 700, mb: 3 }}>
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
                  href={paths.spa5.blogDetails(r.slug)}
                  sx={{
                    borderRadius: 0,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 16px 40px rgba(26,26,62,0.1)',
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
                      sx={{ color: NAVY, fontWeight: 600, lineHeight: 1.4 }}
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

export function Spa5CareersPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.careers}
        eyebrow="CARRIÈRES"
        title="Tuyển Dụng"
        subtitle="Cơ hội nghề nghiệp tại Lumière Balnéo — môi trường chuyên nghiệp chuẩn Pháp"
      />

      {/* Benefits */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: NAVY }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ color: 'white', fontWeight: 700, textAlign: 'center', mb: 4 }}
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
            {spa5CareerBenefits.map((benefit) => (
              <Stack key={benefit.label.en} alignItems="center" textAlign="center" spacing={1}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    border: `2px solid ${GOLD}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon={benefit.icon} width={28} sx={{ color: GOLD }} />
                </Box>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  {benefit.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Job Listings */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {spa5Careers.map((career) => (
              <Card
                key={career.id}
                sx={{
                  p: 3,
                  borderRadius: 0,
                  border: `1px solid ${NAVY_LIGHTER}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: GOLD,
                    boxShadow: `0 8px 24px rgba(201,168,76,0.1)`,
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700, mb: 0.5 }}>
                      {career.title[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {career.department[lang]} · {career.location[lang]}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={4}>
                    <Chip
                      label={career.type[lang]}
                      size="small"
                      sx={{ bgcolor: CREAM, color: NAVY }}
                    />
                  </Grid>
                  <Grid xs={12} md={2}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: GOLD,
                        color: GOLD,
                        borderRadius: 0,
                        '&:hover': { borderColor: GOLD, bgcolor: 'rgba(201,168,76,0.08)' },
                      }}
                    >
                      Ứng tuyển
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BOOKING PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5BookingPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.booking}
        eyebrow="RÉSERVATION"
        title="Đặt Lịch Online"
        subtitle="Đặt lịch hẹn dễ dàng — chúng tôi sẽ liên hệ xác nhận trong 30 phút"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Card sx={{ p: 4, borderRadius: 0 }}>
            <Stack spacing={3}>
              <Typography variant="h5" sx={{ color: NAVY, fontWeight: 700 }}>
                Thông tin đặt lịch
              </Typography>
              <TextField label="Họ và tên" variant="outlined" fullWidth />
              <TextField label="Số điện thoại" variant="outlined" fullWidth />
              <TextField label="Email" variant="outlined" fullWidth />
              <TextField label="Chọn liệu trình" select fullWidth defaultValue="">
                {spa5Services.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name[lang]} — {formatVND(s.price)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Ngày mong muốn"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Giờ mong muốn"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField label="Ghi chú thêm" variant="outlined" fullWidth multiline rows={3} />
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: NAVY,
                  '&:hover': { bgcolor: INK },
                  borderRadius: 0,
                  py: 2,
                }}
                startIcon={<Iconify icon="solar:calendar-mark-bold-duotone" />}
              >
                Gửi yêu cầu đặt lịch
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

export function Spa5ContactPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.contact}
        eyebrow="CONTACT"
        title="Liên Hệ"
        subtitle="Chúng tôi sẵn sàng tư vấn và hỗ trợ bạn mọi lúc"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Grid container spacing={6}>
            <Grid xs={12} md={6}>
              <Card sx={{ p: 4, borderRadius: 0, height: '100%', bgcolor: NAVY }}>
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                    Thông tin liên hệ
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Iconify icon="solar:map-point-bold-duotone" width={24} sx={{ color: GOLD }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Địa chỉ
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {spa5ContactInfo.address[lang]}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:phone-bold-duotone" width={24} sx={{ color: GOLD }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Điện thoại
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {spa5ContactInfo.phone}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:letter-bold-duotone" width={24} sx={{ color: GOLD }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Email
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {spa5ContactInfo.email}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify
                      icon="solar:clock-circle-bold-duotone"
                      width={24}
                      sx={{ color: GOLD }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Giờ mở cửa
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        {spa5ContactInfo.hours[lang]}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Card>
            </Grid>

            <Grid xs={12} md={6}>
              <Card sx={{ p: 4, borderRadius: 0, height: '100%' }}>
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ color: NAVY, fontWeight: 700 }}>
                    Gửi tin nhắn
                  </Typography>
                  <TextField label="Họ và tên" variant="outlined" fullWidth />
                  <TextField label="Email" variant="outlined" fullWidth />
                  <TextField label="Tin nhắn" variant="outlined" fullWidth multiline rows={4} />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: GOLD,
                      color: 'white',
                      borderRadius: 0,
                      '&:hover': { bgcolor: '#B8913D' },
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

export function Spa5OffersPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.offers}
        eyebrow="OFFRES"
        title="Gói Ưu Đãi"
        subtitle="Những gói trải nghiệm đặc biệt với giá trị vượt trội"
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
            {spa5Offers.map((offer) => (
              <Card
                key={offer.id}
                sx={{
                  p: 3,
                  borderRadius: 0,
                  border: `1px solid ${NAVY_LIGHTER}`,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: GOLD,
                    boxShadow: '0 16px 40px rgba(201,168,76,0.15)',
                  },
                  ...(offer.featured && {
                    borderColor: GOLD,
                    transform: { md: 'scale(1.05)' },
                    boxShadow: '0 20px 50px rgba(201,168,76,0.2)',
                  }),
                }}
              >
                {offer.featured && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: GOLD,
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    BEST VALUE
                  </Box>
                )}
                <Box
                  sx={{
                    height: 180,
                    mb: 3,
                    backgroundImage: `url(${offer.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700, mb: 1 }}>
                  {offer.title[lang]}
                </Typography>
                {offer.benefits.map((b, idx) => (
                  <Stack
                    key={idx}
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    sx={{ mb: 0.5 }}
                  >
                    <Iconify
                      icon="solar:check-circle-bold"
                      width={16}
                      sx={{ color: GOLD, mt: 0.3 }}
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {b[lang]}
                    </Typography>
                  </Stack>
                ))}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  {!offer.isCustom && (
                    <>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                      >
                        {formatVND(offer.originalPrice)}
                      </Typography>
                      <Typography variant="h4" sx={{ color: GOLD, fontWeight: 700 }}>
                        {formatVND(offer.price)}
                      </Typography>
                    </>
                  )}
                  {offer.isCustom && (
                    <Typography variant="h6" sx={{ color: NAVY }}>
                      Liên hệ để nhận báo giá
                    </Typography>
                  )}
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
// FEEDBACK PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5FeedbackPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.feedback}
        eyebrow="AVIS"
        title="Phản Hồi Khách Hàng"
        subtitle="Những đánh giá chân thực từ khách hàng đã trải nghiệm"
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
            {spa5Feedbacks.map((fb) => (
              <Card
                key={fb.id}
                sx={{
                  p: 3,
                  borderRadius: 0,
                  border: `1px solid ${NAVY_LIGHTER}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: GOLD,
                    boxShadow: '0 12px 30px rgba(201,168,76,0.1)',
                  },
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={1.5}>
                      <Avatar src={fb.avatar} sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: NAVY, fontWeight: 600 }}>
                          {fb.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: GOLD }}>
                          {fb.treatment}
                        </Typography>
                      </Box>
                    </Stack>
                    <Rating value={fb.rating} readOnly size="small" sx={{ color: GOLD }} />
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    &ldquo;{fb.comment[lang]}&rdquo;
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {fb.date}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Box>

          {/* Submit feedback CTA */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: GOLD,
                color: GOLD,
                borderRadius: 0,
                px: 4,
                '&:hover': { borderColor: GOLD, bgcolor: 'rgba(201,168,76,0.08)' },
              }}
              startIcon={<Iconify icon="solar:pen-bold-duotone" />}
            >
              Gửi đánh giá của bạn
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// PROMOTIONS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5PromotionsPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.promotions}
        eyebrow="PROMOTIONS"
        title="Khuyến Mãi"
        subtitle="Các chương trình ưu đãi đặc biệt đang diễn ra"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CREAM }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa5Promotions.map((promo) => (
              <Card
                key={promo.id}
                sx={{
                  borderRadius: 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 50px rgba(26,26,62,0.15)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={promo.image}
                    alt={promo.title.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Box
                      sx={{
                        bgcolor: GOLD,
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      -{promo.discount} OFF
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Đến {promo.validUntil}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700, mb: 1 }}>
                    {promo.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {promo.description[lang]}
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
// BRANCHES PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5BranchesPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.branches}
        eyebrow="ÉTABLISSEMENTS"
        title="Hệ Thống Chi Nhánh"
        subtitle="5 cơ sở trải nghiệm balnéothérapie chuẩn Pháp khắp TP.HCM"
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
            {spa5Branches.map((branch) => (
              <Card
                key={branch.id}
                sx={{
                  borderRadius: 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 50px rgba(26,26,62,0.1)',
                  },
                }}
              >
                <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={branch.image}
                    alt={branch.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700, mb: 1 }}>
                    {branch.name}
                  </Typography>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:map-point-bold-duotone"
                        width={16}
                        sx={{ color: GOLD }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {branch.address[lang]}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify icon="solar:phone-bold-duotone" width={16} sx={{ color: GOLD }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {branch.phone}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:clock-circle-bold-duotone"
                        width={16}
                        sx={{ color: GOLD }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {branch.hours}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 0.5 }}>
                    {branch.features.map((f) => (
                      <Chip
                        key={f}
                        label={f}
                        size="small"
                        sx={{ bgcolor: CREAM, color: NAVY, fontSize: 11 }}
                      />
                    ))}
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

export function Spa5AccountPageView() {
  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.contact}
        eyebrow="MON COMPTE"
        title="Tài Khoản"
        subtitle="Quản lý thông tin cá nhân và lịch sử đặt lịch"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Card sx={{ p: 4, borderRadius: 0 }}>
            <Typography variant="h5" sx={{ color: NAVY, fontWeight: 700, mb: 3 }}>
              Thông tin cá nhân
            </Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  label="Họ và tên"
                  variant="outlined"
                  fullWidth
                  defaultValue="Nguyễn Thị Hương"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField label="Email" variant="outlined" fullWidth defaultValue="huong@ex.com" />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Số điện thoại"
                  variant="outlined"
                  fullWidth
                  defaultValue="0909123456"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Ngày sinh"
                  type="date"
                  variant="outlined"
                  fullWidth
                  defaultValue="1990-01-01"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{ bgcolor: NAVY, borderRadius: 0, '&:hover': { bgcolor: INK } }}
              >
                Lưu thay đổi
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: BURGUNDY, color: BURGUNDY, borderRadius: 0 }}
              >
                Đăng xuất
              </Button>
            </Stack>
          </Card>

          {/* History */}
          <Card sx={{ p: 4, borderRadius: 0, mt: 4 }}>
            <Typography variant="h5" sx={{ color: NAVY, fontWeight: 700, mb: 3 }}>
              Lịch sử đặt lịch
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {[1, 2, 3].map((i) => (
                <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: NAVY }}>
                      Vinothérapie
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      15/06/2024 — Hoàn thành
                    </Typography>
                  </Box>
                  <Chip label="1,290,000đ" size="small" sx={{ bgcolor: CREAM, color: NAVY }} />
                </Stack>
              ))}
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

export function Spa5PartnersPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.partners}
        eyebrow="PARTENAIRES"
        title="Đối Tác"
        subtitle="Các thương hiệu uy tín cùng đồng hành với Lumière Balnéo"
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
            {spa5Partners.map((partner) => (
              <Card
                key={partner.id}
                sx={{
                  p: 3,
                  borderRadius: 0,
                  textAlign: 'center',
                  border: `1px solid ${NAVY_LIGHTER}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: GOLD,
                    boxShadow: '0 8px 20px rgba(201,168,76,0.1)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={partner.logo}
                  alt={partner.name}
                  sx={{ width: 80, height: 80, objectFit: 'cover', mb: 2, mx: 'auto' }}
                />
                <Typography variant="subtitle2" sx={{ color: NAVY, fontWeight: 700, mb: 1 }}>
                  {partner.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {partner.description[lang]}
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

export function Spa5PackagesPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.packages}
        eyebrow="FORFAITS"
        title="Gói Liệu Trình"
        subtitle="Combo trải nghiệm với mức giá ưu đãi"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            {spa5Packages.map((pkg) => (
              <Card
                key={pkg.id}
                sx={{
                  borderRadius: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  ...(pkg.featured && {
                    transform: { md: 'scale(1.05)' },
                    boxShadow: '0 20px 50px rgba(201,168,76,0.2)',
                    border: `2px solid ${GOLD}`,
                  }),
                  '&:hover': {
                    transform: pkg.featured ? 'scale(1.08)' : 'translateY(-4px)',
                    boxShadow: '0 20px 50px rgba(26,26,62,0.15)',
                  },
                }}
              >
                {pkg.featured && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: GOLD,
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      fontSize: 12,
                      fontWeight: 700,
                      zIndex: 1,
                    }}
                  >
                    RECOMMENDED
                  </Box>
                )}
                <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={pkg.image}
                    alt={pkg.name.en}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700, mb: 1 }}>
                    {pkg.name[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {pkg.description[lang]}
                  </Typography>
                  <Typography variant="caption" sx={{ color: GOLD, fontWeight: 600 }}>
                    Thời lượng: {pkg.duration[lang]}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                    >
                      {formatVND(pkg.originalPrice)}
                    </Typography>
                    <Typography variant="h5" sx={{ color: BURGUNDY, fontWeight: 700 }}>
                      {formatVND(pkg.price)}
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: NAVY,
                      borderRadius: 0,
                      '&:hover': { bgcolor: INK },
                    }}
                  >
                    Đặt ngay
                  </Button>
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
// BEFORE/AFTER PAGE VIEW
// ----------------------------------------------------------------------

export function Spa5BeforeAfterPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.beforeAfter}
        eyebrow="RÉSULTATS"
        title="Kết Quả Trước-Sau"
        subtitle="Những thay đổi thực tế từ khách hàng sau liệu trình"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 6,
            }}
          >
            {spa5BeforeAfters.map((item) => (
              <Stack key={item.id} spacing={2}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: NAVY, fontWeight: 700, textAlign: 'center' }}
                >
                  {item.treatment[lang]}
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.before}
                      alt="Before"
                      sx={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        fontSize: 12,
                      }}
                    >
                      Before
                    </Box>
                  </Box>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.after}
                      alt="After"
                      sx={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: GOLD,
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      After
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 0.5 }}
                  >
                    &ldquo;{item.testimonial[lang]}&rdquo;
                  </Typography>
                  <Typography variant="caption" sx={{ color: GOLD, fontWeight: 600 }}>
                    — {item.client}
                  </Typography>
                </Box>
              </Stack>
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

export function Spa5FaqPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  const filtered = category === 'all' ? spa5Faqs : spa5Faqs.filter((f) => f.category === category);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.contact}
        eyebrow="FAQ"
        title="Câu Hỏi Thường Gặp"
        subtitle="Những thắc mắc phổ biến về dịch vụ của Lumière Balnéo"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, '& .MuiTabs-indicator': { bgcolor: GOLD } }}
          >
            {spa5FaqCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: NAVY, '&.Mui-selected': { color: GOLD } }}
              />
            ))}
          </Tabs>

          <Stack spacing={2}>
            {filtered.map((faq, idx) => (
              <Accordion
                key={faq.id}
                sx={{
                  borderRadius: 0,
                  border: `1px solid ${NAVY_LIGHTER}`,
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: GOLD },
                }}
              >
                <AccordionSummary
                  expandIcon={<Iconify icon="solar:alt-arrow-down-bold" sx={{ color: GOLD }} />}
                  sx={{ '& .MuiAccordionSummary-content': { my: 2 } }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: GOLD,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {idx + 1}
                    </Box>
                    <Typography variant="subtitle1" sx={{ color: NAVY, fontWeight: 600 }}>
                      {faq.question[lang]}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'text.secondary', pl: 5, lineHeight: 1.8 }}>
                    {faq.answer[lang]}
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

export function Spa5PolicyPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.contact}
        eyebrow="POLITIQUE"
        title="Chính Sách"
        subtitle="Các điều khoản và chính sách của Lumière Balnéo"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            {spa5Policies.map((policy) => (
              <Card
                key={policy.id}
                sx={{ p: 4, borderRadius: 0, border: `1px solid ${NAVY_LIGHTER}` }}
              >
                <Typography variant="h6" sx={{ color: NAVY, fontWeight: 700, mb: 2 }}>
                  {policy.title[lang]}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                  {policy.content[lang]}
                </Typography>
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

export function Spa5GalleryPageView() {
  const { currentLang } = useTranslate('spa5');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa5PageHero
        image={SPA5_PAGE_IMAGES.gallery}
        eyebrow="GALERIE"
        title="Gallery"
        subtitle="Không gian và trải nghiệm tại Lumière Balnéo"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 3,
            }}
          >
            {spa5Gallery.map((item) => (
              <Box
                key={item.id}
                sx={{
                  position: 'relative',
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
                    bgcolor: 'rgba(26,26,62,0.7)',
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
