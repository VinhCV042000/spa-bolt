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
  GOLD,
  CREAM,
  SAKURA,
  CHARCOAL,
  spa8Faqs,
  ONSEN_RED,
  spa8Offers,
  spa8Gallery,
  spa8Careers,
  spa8Branches,
  spa8Policies,
  spa8Services,
  spa8Packages,
  spa8Partners,
  type Spa8Lang,
  spa8BlogPosts,
  spa8Feedbacks,
  spa8Promotions,
  spa8ContactInfo,
  spa8Instructors,
  spa8AboutContent,
  spa8BeforeAfters,
  SPA8_PAGE_IMAGES,
  spa8FaqCategories,
  spa8BlogCategories,
  spa8CareerBenefits,
  spa8TrainingPrograms,
  spa8ServiceCategories,
} from './spa8-pages-data';

// ----------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------

const CHARCOAL_LIGHT = '#3D3856';

// ----------------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------------

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}₫`;

const getLang = (val?: string): Spa8Lang => {
  if (val === 'vi' || val === 'en' || val === 'fr' || val === 'cn' || val === 'ar') return val;
  return 'vi';
};

// ----------------------------------------------------------------------
// SHARED HERO COMPONENT - JAPANESE ONSEN STYLE
// ----------------------------------------------------------------------

function Spa8PageHero({
  image,
  kanji,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  kanji?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: INK,
        pt: { xs: 12, md: 18 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      {/* Japanese vertical text decoration */}
      {kanji && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: { xs: 8, md: 32 },
            transform: 'translateY(-50%)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 28, md: 48 },
              fontWeight: 300,
              color: SAKURA,
              opacity: 0.2,
              letterSpacing: 8,
            }}
          >
            {kanji}
          </Typography>
        </Box>
      )}

      {/* Enso-inspired decorative circle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 280, md: 450 },
          height: { xs: 280, md: 450 },
          borderRadius: '50%',
          border: `1px solid rgba(200,169,81,0.1)`,
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ width: 32, height: 2, bgcolor: SAKURA }} />
                <Typography
                  variant="overline"
                  sx={{
                    color: SAKURA,
                    letterSpacing: 4,
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  {eyebrow}
                </Typography>
              </Stack>
              <Typography
                variant="h2"
                sx={{
                  color: CREAM,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: -0.5,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'rgba(255,248,240,0.65)', fontWeight: 400, lineHeight: 1.6 }}
              >
                {subtitle}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: GOLD,
                    color: INK,
                    borderRadius: 2,
                    px: 4,
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#B89641' },
                  }}
                >
                  予約する
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,183,197,0.35)',
                    color: SAKURA,
                    borderRadius: 2,
                    px: 4,
                    '&:hover': { borderColor: SAKURA, bgcolor: 'rgba(255,183,197,0.05)' },
                  }}
                >
                  お問い合わせ
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
              }}
            >
              <Box
                component="img"
                src={image}
                alt="hero"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26,10,46,0.4) 0%, transparent 50%)',
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

export function Spa8AboutPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);
  const content = spa8AboutContent;

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.about}
        kanji="温泉"
        eyebrow={content.eyebrow[lang]}
        title={content.title[lang]}
        subtitle={content.subtitle[lang]}
      />

      {/* Story Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Typography
            variant="h3"
            sx={{ color: CREAM, fontWeight: 700, mb: 4, textAlign: 'center' }}
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
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,248,240,0.6)', textAlign: 'center' }}
                >
                  {m.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Values Section */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: INK }}>
        <Container>
          <Typography
            variant="overline"
            sx={{
              color: SAKURA,
              letterSpacing: 6,
              fontWeight: 600,
              display: 'block',
              textAlign: 'center',
              mb: 2,
            }}
          >
            私たちの価値
          </Typography>
          <Typography
            variant="h3"
            sx={{ color: CREAM, fontWeight: 700, textAlign: 'center', mb: 6 }}
          >
            Giá trị cốt lõi
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
              gap: 4,
            }}
          >
            {content.values.map((value) => (
              <Card
                key={value.title.en}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  bgcolor: CHARCOAL,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: GOLD,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px rgba(200,169,81,0.15)`,
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: INK,
                      border: `1px solid ${GOLD}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon={value.icon} width={28} sx={{ color: GOLD }} />
                  </Box>
                  <Stack spacing={1}>
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700 }}>
                      {value.title[lang]}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,248,240,0.65)', lineHeight: 1.8 }}
                    >
                      {value.desc[lang]}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Stats */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: CHARCOAL }}>
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
                <Iconify icon={stat.icon} width={28} sx={{ color: SAKURA }} />
                <Typography variant="h3" sx={{ color: GOLD, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)' }}>
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

export function Spa8ServicesPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  const filtered = useMemo(
    () => (category === 'all' ? spa8Services : spa8Services.filter((s) => s.category === category)),
    [category]
  );

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.services}
        kanji="施術"
        eyebrow="ONSEN & SHIATSU"
        title="Liệu Trình Đặc Trưng"
        subtitle="Trải nghiệm onsen, shiatsu và nghi thức mùa chuẩn Nhật Bản"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, '& .MuiTabs-indicator': { bgcolor: SAKURA } }}
          >
            {spa8ServiceCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: CREAM, '&.Mui-selected': { color: SAKURA } }}
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
                href={paths.spa8.serviceDetails(service.slug)}
                sx={{
                  textDecoration: 'none',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: GOLD,
                    boxShadow: '0 20px 50px rgba(200,169,81,0.15)',
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
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700 }}>
                      {service.name[lang]}
                    </Typography>
                    <Iconify icon={service.icon} width={24} sx={{ color: SAKURA }} />
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,248,240,0.6)', lineHeight: 1.6, mb: 2 }}
                  >
                    {service.shortDesc[lang]}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.5)' }}>
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

export function Spa8ServiceDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  const service = spa8Services.find((s) => s.slug === slug) ?? spa8Services[0];

  return (
    <>
      <Spa8PageHero
        image={service.image}
        kanji="療"
        eyebrow="TREATMENT"
        title={service.name[lang]}
        subtitle={service.shortDesc[lang]}
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 4,
                p: 3,
                bgcolor: INK,
                borderRadius: 2,
                border: `1px solid ${CHARCOAL_LIGHT}`,
              }}
            >
              <Stack alignItems="center">
                <Typography variant="overline" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                  Thời lượng
                </Typography>
                <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700 }}>
                  {service.duration[lang]}
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography variant="overline" sx={{ color: 'rgba(255,248,240,0.5)' }}>
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
                bgcolor: GOLD,
                color: INK,
                borderRadius: 2,
                py: 2,
                fontWeight: 800,
                '&:hover': { bgcolor: '#B89641' },
              }}
            >
              予約する
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

export function Spa8TrainingPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.training}
        kanji="修行"
        eyebrow="Training"
        title="Đào Tạo Chuyên Sâu"
        subtitle="Chương trình đào tạo shiatsu, onsen và thiền định chuẩn Nhật Bản"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa8TrainingPrograms.map((program) => (
              <Card
                key={program.id}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: GOLD,
                    boxShadow: '0 20px 40px rgba(200,169,81,0.15)',
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
                    sx={{ bgcolor: SAKURA, color: INK, fontWeight: 600, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                    {program.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,248,240,0.6)', lineHeight: 1.7, mb: 2 }}
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
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: INK }}>
        <Container>
          <Typography
            variant="h3"
            sx={{ color: CREAM, fontWeight: 700, textAlign: 'center', mb: 6 }}
          >
            講師 — Giảng viên
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa8Instructors.map((instructor) => (
              <Stack key={instructor.name} alignItems="center" spacing={2}>
                <Avatar
                  src={instructor.avatar}
                  sx={{ width: 100, height: 100, border: `3px solid ${SAKURA}` }}
                />
                <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700 }}>
                  {instructor.name}
                </Typography>
                <Typography variant="body2" sx={{ color: SAKURA }}>
                  {instructor.title[lang]}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,248,240,0.6)', textAlign: 'center' }}
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

export function Spa8BlogPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  const filtered = useMemo(
    () =>
      category === 'all'
        ? spa8BlogPosts
        : spa8BlogPosts.filter((p) => {
            const catMap: Record<string, string> = {
              onsen: 'onsen',
              wellness: 'wellness',
              culture: 'culture',
            };
            return p.category.en.toLowerCase().includes(catMap[category] || '');
          }),
    [category]
  );

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.blog}
        kanji="日記"
        eyebrow="JOURNAL"
        title="Blog Amaya"
        subtitle="Cẩm nang onsen, shiatsu và văn hóa Nhật Bản"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, '& .MuiTabs-indicator': { bgcolor: SAKURA } }}
          >
            {spa8BlogCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: CREAM, '&.Mui-selected': { color: SAKURA } }}
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
                href={paths.spa8.blogDetails(post.slug)}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: GOLD,
                    boxShadow: '0 20px 50px rgba(200,169,81,0.15)',
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
                      sx={{ bgcolor: CHARCOAL, color: SAKURA }}
                    />
                    <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                      {post.date}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                      · {post.readTime[lang]}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h6"
                    sx={{ color: CREAM, fontWeight: 700, mb: 1, lineHeight: 1.3 }}
                  >
                    {post.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,248,240,0.6)', lineHeight: 1.7 }}
                  >
                    {post.excerpt[lang]}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>

          <Stack alignItems="center" sx={{ mt: 4 }}>
            <Pagination count={3} sx={{ '& .Mui-selected': { bgcolor: GOLD, color: INK } }} />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------
// BLOG DETAILS PAGE VIEW
// ----------------------------------------------------------------------

export function Spa8BlogDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  const post = spa8BlogPosts.find((p) => p.slug === slug) ?? spa8BlogPosts[0];
  const related = spa8BlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Spa8PageHero
        image={post.image}
        kanji="日記"
        eyebrow={post.category[lang]}
        title={post.title[lang]}
        subtitle={post.excerpt[lang]}
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Avatar sx={{ bgcolor: SAKURA, color: INK, fontWeight: 700 }}>{post.author[0]}</Avatar>
            <Stack>
              <Typography sx={{ color: CREAM, fontWeight: 600 }}>{post.author}</Typography>
              <Typography sx={{ color: 'rgba(255,248,240,0.5)', fontSize: 13 }}>
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
              borderRadius: 2,
            }}
          />

          <Typography sx={{ color: CREAM, lineHeight: 1.9, mb: 3 }}>
            Onsen Nhật Bản không chỉ là nơi thư giãn mà còn là một nghi thức thanh lọc tâm hồn. Lịch
            sử của onsen bắt nguồn từ thời kỳ Nara, khi những tu sĩ Phật giáo sử dụng nước khoáng
            nóng để chữa bệnh và thanh tịnh.
          </Typography>

          <Typography variant="h5" sx={{ color: CREAM, mb: 2, fontWeight: 700 }}>
            1. Nguyên tắc onsen
          </Typography>
          <Typography sx={{ color: 'rgba(255,248,240,0.65)', lineHeight: 1.9, mb: 3 }}>
            Nước khoáng nóng được gọi là &quot;onsen&quot; khi đạt tiêu chuẩn về nhiệt độ và thành
            phần khoáng chất. Nước từ suối thiên nhiên luôn ấm áp quanh năm.
          </Typography>

          <Typography variant="h5" sx={{ color: CREAM, mb: 2, fontWeight: 700 }}>
            2. Cách thưởng thức onsen
          </Typography>
          <Typography sx={{ color: 'rgba(255,248,240,0.65)', lineHeight: 1.9, mb: 3 }}>
            Người Nhật tin rằng onsen giúp lưu thông khí huyết, thư giãn tinh thần và chữa nhiều
            bệnh mãn tính. Tắm onsen đúng cách là một nghệ thuật.
          </Typography>

          <Box
            sx={{
              p: 3,
              borderLeft: `4px solid ${GOLD}`,
              bgcolor: INK,
              my: 4,
              borderRadius: '0 2px 2px 0',
            }}
          >
            <Typography sx={{ color: CREAM, fontStyle: 'italic', lineHeight: 1.8 }}>
              「温泉は日本の心。静寂の中で、体と魂が浄化される。」
            </Typography>
          </Box>

          {/* Related Posts */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700, mb: 3 }}>
              bài viết liên quan
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
                  href={paths.spa8.blogDetails(r.slug)}
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    bgcolor: INK,
                    border: `1px solid ${CHARCOAL_LIGHT}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: GOLD,
                      boxShadow: '0 16px 40px rgba(200,169,81,0.1)',
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
                      sx={{ color: CREAM, fontWeight: 600, lineHeight: 1.4 }}
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

export function Spa8CareersPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.careers}
        kanji="採用"
        eyebrow="CAREERS"
        title="Tuyển Dụng"
        subtitle="Cơ hội nghề nghiệp tại Amaya Onsen — môi trường chuẩn Nhật Bản"
      />

      {/* Benefits */}
      <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: INK }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ color: CREAM, fontWeight: 700, textAlign: 'center', mb: 4 }}
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
            {spa8CareerBenefits.map((benefit) => (
              <Stack key={benefit.label.en} alignItems="center" textAlign="center" spacing={1}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    border: `1px solid ${SAKURA}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon={benefit.icon} width={28} sx={{ color: SAKURA }} />
                </Box>
                <Typography variant="body2" sx={{ color: CREAM, fontWeight: 600 }}>
                  {benefit.label[lang]}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Job Listings */}
      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {spa8Careers.map((career) => (
              <Card
                key={career.id}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: GOLD,
                    boxShadow: `0 8px 24px rgba(200,169,81,0.1)`,
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700, mb: 0.5 }}>
                      {career.title[lang]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                      {career.department[lang]} · {career.location[lang]}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={4}>
                    <Chip
                      label={career.type[lang]}
                      size="small"
                      sx={{ bgcolor: CHARCOAL, color: SAKURA }}
                    />
                  </Grid>
                  <Grid xs={12} md={2}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: GOLD,
                        color: GOLD,
                        borderRadius: 2,
                        '&:hover': { borderColor: GOLD, bgcolor: 'rgba(200,169,81,0.08)' },
                      }}
                    >
                      応募
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

export function Spa8BookingPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.booking}
        kanji="予約"
        eyebrow="BOOKING"
        title="Đặt Lịch Online"
        subtitle="Đặt lịch hẹn — chúng tôi sẽ liên hệ xác nhận trong 30 phút"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container maxWidth="md">
          <Card sx={{ p: 4, borderRadius: 2, bgcolor: INK, border: `1px solid ${CHARCOAL_LIGHT}` }}>
            <Stack spacing={3}>
              <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700 }}>
                Thông tin đặt lịch
              </Typography>
              <TextField
                label="Họ và tên"
                variant="outlined"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
              />
              <TextField
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
              />
              <TextField
                label="Chọn liệu trình"
                select
                fullWidth
                defaultValue=""
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
              >
                {spa8Services.map((s) => (
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
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
              />
              <TextField
                label="Giờ mong muốn"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
              />
              <TextField
                label="Ghi chú thêm"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
              />
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: GOLD,
                  color: INK,
                  borderRadius: 2,
                  py: 2,
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#B89641' },
                }}
                startIcon={<Iconify icon="solar:calendar-mark-bold-duotone" />}
              >
                予約を送信
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

export function Spa8ContactPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.contact}
        kanji="連絡"
        eyebrow="CONTACT"
        title="Liên Hệ"
        subtitle="Chúng tôi sẵn sàng tư vấn và hỗ trợ bạn mọi lúc"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container maxWidth="md">
          <Grid container spacing={6}>
            <Grid xs={12} md={6}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 2,
                  height: '100%',
                  bgcolor: INK,
                  border: `1px solid ${SAKURA}`,
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700 }}>
                    お問い合わせ
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Iconify
                      icon="solar:map-point-bold-duotone"
                      width={24}
                      sx={{ color: SAKURA }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                        住所
                      </Typography>
                      <Typography variant="body2" sx={{ color: CREAM }}>
                        {spa8ContactInfo.address[lang]}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:phone-bold-duotone" width={24} sx={{ color: SAKURA }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                        電話
                      </Typography>
                      <Typography variant="body2" sx={{ color: CREAM }}>
                        {spa8ContactInfo.phone}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify icon="solar:letter-bold-duotone" width={24} sx={{ color: SAKURA }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                        メール
                      </Typography>
                      <Typography variant="body2" sx={{ color: CREAM }}>
                        {spa8ContactInfo.email}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Iconify
                      icon="solar:clock-circle-bold-duotone"
                      width={24}
                      sx={{ color: SAKURA }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                        営業時間
                      </Typography>
                      <Typography variant="body2" sx={{ color: CREAM }}>
                        {spa8ContactInfo.hours[lang]}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Card>
            </Grid>

            <Grid xs={12} md={6}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 2,
                  height: '100%',
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                }}
              >
                <Stack spacing={3}>
                  <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700 }}>
                    メッセージ
                  </Typography>
                  <TextField
                    label="Họ và tên"
                    variant="outlined"
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
                  />
                  <TextField
                    label="Tin nhắn"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: SAKURA,
                      color: INK,
                      borderRadius: 2,
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#E8A4B0' },
                    }}
                  >
                    送信
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

export function Spa8OffersPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.offers}
        kanji="特典"
        eyebrow="OFFERS"
        title="Gói Ưu Đãi"
        subtitle="Những gói trải nghiệm đặc biệt với giá trị vượt trội"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa8Offers.map((offer) => (
              <Card
                key={offer.id}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: GOLD,
                    boxShadow: '0 16px 40px rgba(200,169,81,0.15)',
                  },
                  ...(offer.featured && {
                    borderColor: GOLD,
                    transform: { md: 'scale(1.05)' },
                    boxShadow: '0 20px 50px rgba(200,169,81,0.2)',
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
                      color: INK,
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
                    borderRadius: 2,
                  }}
                />
                <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
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
                      sx={{ color: SAKURA, mt: 0.3 }}
                    />
                    <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)' }}>
                      {b[lang]}
                    </Typography>
                  </Stack>
                ))}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  {!offer.isCustom && (
                    <>
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255,248,240,0.4)', textDecoration: 'line-through' }}
                      >
                        {formatVND(offer.originalPrice)}
                      </Typography>
                      <Typography variant="h4" sx={{ color: GOLD, fontWeight: 700 }}>
                        {formatVND(offer.price)}
                      </Typography>
                    </>
                  )}
                  {offer.isCustom && (
                    <Typography variant="h6" sx={{ color: CREAM }}>
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

export function Spa8FeedbackPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.feedback}
        kanji="声"
        eyebrow="FEEDBACK"
        title="Phản Hồi Khách Hàng"
        subtitle="Những đánh giá chân thực từ khách hàng đã trải nghiệm"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa8Feedbacks.map((fb) => (
              <Card
                key={fb.id}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: SAKURA,
                    boxShadow: '0 12px 30px rgba(255,183,197,0.1)',
                  },
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Stack direction="row" spacing={1.5}>
                      <Avatar src={fb.avatar} sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: CREAM, fontWeight: 600 }}>
                          {fb.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: SAKURA }}>
                          {fb.treatment}
                        </Typography>
                      </Box>
                    </Stack>
                    <Rating value={fb.rating} readOnly size="small" sx={{ color: GOLD }} />
                  </Stack>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,248,240,0.65)', lineHeight: 1.7 }}
                  >
                    &ldquo;{fb.comment[lang]}&rdquo;
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.35)' }}>
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
                borderColor: SAKURA,
                color: SAKURA,
                borderRadius: 2,
                px: 4,
                '&:hover': { borderColor: SAKURA, bgcolor: 'rgba(255,183,197,0.08)' },
              }}
              startIcon={<Iconify icon="solar:pen-bold-duotone" />}
            >
              Gửi đánh giáのあなた
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

export function Spa8PromotionsPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.promotions}
        kanji="催事"
        eyebrow="PROMOTIONS"
        title="Khuyến Mãi"
        subtitle="Các chương trình ưu đãi đặc biệt đang diễn ra"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: INK }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa8Promotions.map((promo) => (
              <Card
                key={promo.id}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: CHARCOAL,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: GOLD,
                    boxShadow: '0 20px 50px rgba(200,169,81,0.15)',
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
                        bgcolor: SAKURA,
                        color: INK,
                        px: 1.5,
                        py: 0.5,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      -{promo.discount}%
                    </Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                      まで {promo.validUntil}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                    {promo.title[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)' }}>
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

export function Spa8BranchesPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.branches}
        kanji="店舗"
        eyebrow="BRANCHES"
        title="Hệ Thống Chi Nhánh"
        subtitle="5 cơ sở trải nghiệm onsen chuẩn Nhật Bản khắp Việt Nam"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' },
              gap: 4,
            }}
          >
            {spa8Branches.map((branch) => (
              <Card
                key={branch.id}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: SAKURA,
                    boxShadow: '0 20px 50px rgba(255,183,197,0.1)',
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
                  <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                    {branch.name}
                  </Typography>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:map-point-bold-duotone"
                        width={16}
                        sx={{ color: SAKURA }}
                      />
                      <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)' }}>
                        {branch.address[lang]}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify icon="solar:phone-bold-duotone" width={16} sx={{ color: SAKURA }} />
                      <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)' }}>
                        {branch.phone}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:clock-circle-bold-duotone"
                        width={16}
                        sx={{ color: SAKURA }}
                      />
                      <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)' }}>
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
                        sx={{ bgcolor: CHARCOAL, color: SAKURA, fontSize: 11 }}
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

export function Spa8AccountPageView() {
  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.account}
        kanji="会員"
        eyebrow="MEMBER"
        title="Tài Khoản"
        subtitle="Quản lý thông tin cá nhân và lịch sử đặt lịch"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container maxWidth="md">
          <Card sx={{ p: 4, borderRadius: 2, bgcolor: INK, border: `1px solid ${CHARCOAL_LIGHT}` }}>
            <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700, mb: 3 }}>
              個人情報
            </Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  label="Họ và tên"
                  variant="outlined"
                  fullWidth
                  defaultValue="Nguyễn Thị Hương"
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  defaultValue="huong@ex.com"
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  label="Số điện thoại"
                  variant="outlined"
                  fullWidth
                  defaultValue="0909123456"
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
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
                  sx={{ '& .MuiOutlinedInput-root': { bgcolor: CHARCOAL, color: CREAM } }}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: GOLD,
                  color: INK,
                  borderRadius: 2,
                  fontWeight: 800,
                  '&:hover': { bgcolor: '#B89641' },
                }}
              >
                保存
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: ONSEN_RED, color: ONSEN_RED, borderRadius: 2 }}
              >
                ログアウト
              </Button>
            </Stack>
          </Card>

          {/* History */}
          <Card
            sx={{
              p: 4,
              borderRadius: 2,
              mt: 4,
              bgcolor: INK,
              border: `1px solid ${CHARCOAL_LIGHT}`,
            }}
          >
            <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700, mb: 3 }}>
              予約履歴
            </Typography>
            <Divider sx={{ mb: 2, borderColor: CHARCOAL_LIGHT }} />
            <Stack spacing={2}>
              {[1, 2, 3].map((i) => (
                <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: CREAM }}>
                      Shiatsu Classic
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,248,240,0.5)' }}>
                      15/06/2024 — 完了
                    </Typography>
                  </Box>
                  <Chip label="780,000₫" size="small" sx={{ bgcolor: CHARCOAL, color: SAKURA }} />
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

export function Spa8PartnersPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.partners}
        kanji="協力"
        eyebrow="PARTNERS"
        title="Đối Tác"
        subtitle="Các thương hiệu uy tín cùng đồng hành với Amaya Onsen"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' },
              gap: 4,
            }}
          >
            {spa8Partners.map((partner) => (
              <Card
                key={partner.id}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  textAlign: 'center',
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: GOLD,
                    boxShadow: '0 8px 20px rgba(200,169,81,0.1)',
                  },
                }}
              >
                <Avatar
                  src={partner.logo}
                  sx={{ width: 80, height: 80, mb: 2, mx: 'auto', border: `2px solid ${SAKURA}` }}
                />
                <Typography variant="subtitle2" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                  {partner.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)' }}>
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

export function Spa8PackagesPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.packages}
        kanji="套餐"
        eyebrow="PACKAGES"
        title="Gói Liệu Trình"
        subtitle="Combo trải nghiệm với mức giá ưu đãi"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            {spa8Packages.map((pkg) => (
              <Card
                key={pkg.id}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  transition: 'all 0.3s ease',
                  ...(pkg.featured && {
                    transform: { md: 'scale(1.05)' },
                    boxShadow: '0 20px 50px rgba(200,169,81,0.2)',
                    border: `2px solid ${GOLD}`,
                  }),
                  '&:hover': {
                    transform: pkg.featured ? 'scale(1.08)' : 'translateY(-4px)',
                    boxShadow: '0 20px 50px rgba(200,169,81,0.15)',
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
                      color: INK,
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
                  <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                    {pkg.name[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,248,240,0.6)', mb: 2 }}>
                    {pkg.description[lang]}
                  </Typography>
                  <Typography variant="caption" sx={{ color: SAKURA, fontWeight: 600 }}>
                    所要時間: {pkg.duration[lang]}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(255,248,240,0.4)', textDecoration: 'line-through' }}
                    >
                      {formatVND(pkg.originalPrice)}
                    </Typography>
                    <Typography variant="h5" sx={{ color: GOLD, fontWeight: 700 }}>
                      {formatVND(pkg.price)}
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      bgcolor: GOLD,
                      color: INK,
                      borderRadius: 2,
                      fontWeight: 800,
                      '&:hover': { bgcolor: '#B89641' },
                    }}
                  >
                    予約
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

export function Spa8BeforeAfterPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.beforeAfter}
        kanji="結果"
        eyebrow="RESULTS"
        title="Kết Quả Trước-Sau"
        subtitle="Những thay đổi thực tế từ khách hàng sau liệu trình"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 6,
            }}
          >
            {spa8BeforeAfters.map((item) => (
              <Stack key={item.id} spacing={2}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: CREAM, fontWeight: 700, textAlign: 'center' }}
                >
                  {item.treatment[lang]}
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src={item.before}
                      alt="Before"
                      sx={{
                        width: '100%',
                        aspectRatio: '3/4',
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        px: 1,
                        py: 0.5,
                        fontSize: 12,
                        borderRadius: 1,
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
                      sx={{
                        width: '100%',
                        aspectRatio: '3/4',
                        objectFit: 'cover',
                        borderRadius: 2,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: GOLD,
                        color: INK,
                        px: 1,
                        py: 0.5,
                        fontSize: 12,
                        fontWeight: 700,
                        borderRadius: 1,
                      }}
                    >
                      After
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,248,240,0.6)', fontStyle: 'italic', mb: 0.5 }}
                  >
                    &ldquo;{item.testimonial[lang]}&rdquo;
                  </Typography>
                  <Typography variant="caption" sx={{ color: SAKURA, fontWeight: 600 }}>
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

export function Spa8FaqPageView() {
  const [category, setCategory] = useState('all');
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  const filtered = category === 'all' ? spa8Faqs : spa8Faqs.filter((f) => f.category === category);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.faq}
        kanji="質問"
        eyebrow="FAQ"
        title="Câu Hỏi Thường Gặp"
        subtitle="Những thắc mắc phổ biến về dịch vụ của Amaya Onsen"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container maxWidth="md">
          <Tabs
            value={category}
            onChange={(_, v) => setCategory(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4, '& .MuiTabs-indicator': { bgcolor: SAKURA } }}
          >
            {spa8FaqCategories.map((cat) => (
              <Tab
                key={cat.id}
                value={cat.id}
                label={cat.label[lang]}
                sx={{ fontWeight: 600, color: CREAM, '&.Mui-selected': { color: SAKURA } }}
              />
            ))}
          </Tabs>

          <Stack spacing={2}>
            {filtered.map((faq, idx) => (
              <Accordion
                key={faq.id}
                sx={{
                  borderRadius: 2,
                  bgcolor: INK,
                  border: `1px solid ${CHARCOAL_LIGHT}`,
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { borderColor: SAKURA },
                }}
              >
                <AccordionSummary
                  expandIcon={<Iconify icon="solar:alt-arrow-down-bold" sx={{ color: SAKURA }} />}
                  sx={{ '& .MuiAccordionSummary-content': { my: 2 } }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: SAKURA,
                        color: INK,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 14,
                        borderRadius: 1,
                      }}
                    >
                      {idx + 1}
                    </Box>
                    <Typography variant="subtitle1" sx={{ color: CREAM, fontWeight: 600 }}>
                      {faq.question[lang]}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'rgba(255,248,240,0.65)', pl: 5, lineHeight: 1.8 }}>
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

export function Spa8PolicyPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.policy}
        kanji="規約"
        eyebrow="POLICY"
        title="Chính Sách"
        subtitle="Các điều khoản và chính sách của Amaya Onsen"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            {spa8Policies.map((policy) => (
              <Card
                key={policy.id}
                sx={{ p: 4, borderRadius: 2, bgcolor: INK, border: `1px solid ${CHARCOAL_LIGHT}` }}
              >
                <Typography variant="h6" sx={{ color: CREAM, fontWeight: 700, mb: 2 }}>
                  {policy.title[lang]}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(255,248,240,0.65)', lineHeight: 1.9 }}
                >
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

export function Spa8GalleryPageView() {
  const { currentLang } = useTranslate('spa8');
  const lang = getLang(currentLang.value);

  return (
    <>
      <Spa8PageHero
        image={SPA8_PAGE_IMAGES.gallery}
        kanji="写真"
        eyebrow="GALLERY"
        title="Gallery"
        subtitle="Không gian và trải nghiệm tại Amaya Onsen"
      />

      <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: CHARCOAL }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
              gap: 3,
            }}
          >
            {spa8Gallery.map((item) => (
              <Box
                key={item.id}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '1/1',
                  cursor: 'pointer',
                  borderRadius: 2,
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
                    bgcolor: 'rgba(26,10,46,0.7)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    p: 2,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Typography variant="body2" sx={{ color: CREAM, fontWeight: 600 }}>
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
