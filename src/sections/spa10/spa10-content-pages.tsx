import React from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/material/ToggleButton';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import {
  ICE,
  TEAL,
  FIRE,
  SNOW,
  WHITE,
  SILVER,
  SPA10_FAQ,
  SPA10_BLOG,
  NORDIC_BLUE,
  SPA10_OFFERS,
  SPA10_CAREERS,
  SPA10_GALLERY,
  SPA10_SERVICES,
  SPA10_TRAINING,
  SPA10_BRANCHES,
  SPA10_PACKAGES,
  SPA10_FEEDBACK,
  SPA10_PARTNERS,
  SPA10_PROMOTIONS,
  SPA10_PAGE_IMAGES,
  SPA10_BEFORE_AFTER,
} from './spa10-pages-data';

import type { Spa10Lang } from './spa10-data';

// ----------------------------------------------------------------------

function getLang<T extends Record<string, string>>(obj: T, lang: string): string {
  return obj[lang as Spa10Lang] || obj.en || '';
}

function formatVND(n: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(n)}₫`;
}

// ----------------------------------------------------------------------

function Spa10PageHero({
  title,
  subtitle,
  image,
  children,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 500,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: NORDIC_BLUE,
      }}
    >
      {/* Background image */}
      {image && (
        <Box
          component="img"
          src={image}
          alt=""
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
          }}
        />
      )}

      {/* Aurora overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${NORDIC_BLUE}F2 0%, rgba(0,201,167,0.15) 50%, ${NORDIC_BLUE}F2 100%)`,
          zIndex: 1,
        }}
      />

      {/* Aurora streaks */}
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          component={m.div}
          animate={{ opacity: [0.15, 0.35, 0.15], scaleX: [1, 1.1, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.5 }}
          sx={{
            position: 'absolute',
            top: `${20 + i * 25}%`,
            left: '-10%',
            right: '-10%',
            height: 2,
            background: `linear-gradient(90deg, transparent, ${TEAL}${40 + i * 20}, transparent)`,
            transform: `rotate(${-3 + i * 2}deg)`,
            zIndex: 2,
          }}
        />
      ))}

      {/* Bottom wave decoration */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          height: 80,
          background: 'background.default',
          clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)',
          zIndex: 3,
        }}
      />

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{ position: 'relative', zIndex: 4, py: 12 }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 40, height: 2, bgcolor: TEAL }} />
              <Typography
                variant="overline"
                sx={{ color: TEAL, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
              >
                Nordic Spa
              </Typography>
              <Box sx={{ width: 40, height: 2, bgcolor: TEAL }} />
            </Stack>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
            <Typography
              variant="h1"
              sx={{
                color: ICE,
                fontSize: { xs: 36, md: 56 },
                fontWeight: 900,
                letterSpacing: -1.5,
                lineHeight: 1.1,
              }}
            >
              {title}
            </Typography>
          </Box>

          {subtitle && (
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(234,249,246,0.65)', maxWidth: 600, fontSize: 16 }}
              >
                {subtitle}
              </Typography>
            </Box>
          )}

          {children}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TemperatureBadge({ temp, type }: { temp: string; type: 'hot' | 'cold' }) {
  const isHot = type === 'hot';
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        bgcolor: alpha(isHot ? FIRE : SNOW, 0.15),
        border: `1px solid ${alpha(isHot ? FIRE : SNOW, 0.3)}`,
      }}
    >
      <Iconify
        icon={isHot ? 'solar:fire-bold-duotone' : 'solar:snowflake-bold-duotone'}
        width={14}
        sx={{ color: isHot ? FIRE : SNOW }}
      />
      <Typography
        variant="caption"
        sx={{ color: isHot ? FIRE : SNOW, fontWeight: 700, fontSize: 11 }}
      >
        {temp}
      </Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------
// ABOUT PAGE
// ----------------------------------------------------------------------

export function Spa10AboutPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  const stats = [
    {
      value: '80°C',
      label: getLang(
        {
          vi: 'Sauna chuẩn',
          en: 'Authentic Sauna',
          fr: 'Sauna Authentique',
          cn: '正宗桑拿',
          ar: 'ساونا أصلية',
        },
        lang
      ),
    },
    {
      value: '4°C',
      label: getLang(
        { vi: 'Cold Plunge', en: 'Cold Plunge', fr: 'Bain Froid', cn: '冷水浴', ar: 'غطس بارد' },
        lang
      ),
    },
    {
      value: '5',
      label: getLang(
        { vi: 'Chi nhánh', en: 'Branches', fr: 'Filiales', cn: '分店', ar: 'فروع' },
        lang
      ),
    },
    {
      value: '10K+',
      label: getLang(
        { vi: 'Khách hàng', en: 'Clients', fr: 'Clients', cn: '客户', ar: 'عملاء' },
        lang
      ),
    },
  ];

  return (
    <Box>
      <Spa10PageHero
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        image={SPA10_PAGE_IMAGES.about}
      />

      {/* Story Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inLeft}>
              <Box
                component="img"
                src={SPA10_PAGE_IMAGES.about}
                alt="Nordic Spa"
                sx={{
                  width: '100%',
                  borderRadius: 3,
                  boxShadow: `-20px 20px 60px ${alpha(NORDIC_BLUE, 0.3)}`,
                }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <Typography
                variant="overline"
                sx={{ color: TEAL, letterSpacing: 4, fontWeight: 700 }}
              >
                {t('about.storyLabel')}
              </Typography>
              <Typography variant="h3" sx={{ color: NORDIC_BLUE, fontWeight: 800 }}>
                {t('about.storyTitle')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                {t('about.storyDesc1')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                {t('about.storyDesc2')}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                <TemperatureBadge temp="80°C" type="hot" />
                <TemperatureBadge temp="4°C" type="cold" />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: NORDIC_BLUE, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, i) => (
              <Grid key={i} xs={6} md={3}>
                <Stack spacing={1} alignItems="center" textAlign="center">
                  <Typography variant="h2" sx={{ color: TEAL, fontWeight: 900, letterSpacing: -2 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(234,249,246,0.6)' }}>
                    {stat.label}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ color: NORDIC_BLUE, fontWeight: 800, mb: 6 }}
        >
          {t('about.valuesTitle')}
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: 'solar:fire-bold-duotone',
              title: t('about.value1Title'),
              desc: t('about.value1Desc'),
              color: FIRE,
            },
            {
              icon: 'solar:snowflake-bold-duotone',
              title: t('about.value2Title'),
              desc: t('about.value2Desc'),
              color: SNOW,
            },
            {
              icon: 'solar:leaf-bold-duotone',
              title: t('about.value3Title'),
              desc: t('about.value3Desc'),
              color: TEAL,
            },
          ].map((value, i) => (
            <Grid key={i} xs={12} md={4}>
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: alpha(NORDIC_BLUE, 0.03),
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                  borderRadius: 3,
                  textAlign: 'center',
                }}
              >
                <Iconify icon={value.icon} width={48} sx={{ color: value.color, mb: 2 }} />
                <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {value.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// SERVICES PAGE
// ----------------------------------------------------------------------

export function Spa10ServicesPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        image={SPA10_PAGE_IMAGES.services}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_SERVICES.map((service) => (
            <Grid key={service.id} xs={12} sm={6} md={4}>
              <Card
                component={RouterLink}
                href={paths.spa10.serviceDetails(service.slug)}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                  '&:hover': {
                    boxShadow: `0 20px 40px ${alpha(NORDIC_BLUE, 0.15)}`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={getLang(service.name, lang)}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <TemperatureBadge
                      temp={service.temp}
                      type={service.temp.includes('4') ? 'cold' : 'hot'}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: TEAL, fontWeight: 700, mb: 0.5, display: 'block' }}
                  >
                    {getLang(service.category, lang)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1 }}>
                    {getLang(service.name, lang)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}
                  >
                    {getLang(service.shortDesc, lang)}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: SILVER }}>
                      {getLang(service.duration, lang)}
                    </Typography>
                    <Typography variant="h6" sx={{ color: TEAL, fontWeight: 800 }}>
                      {formatVND(service.price)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// SERVICE DETAILS PAGE
// ----------------------------------------------------------------------

export function Spa10ServiceDetailsPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  const service = SPA10_SERVICES[0]; // In real app, fetch by slug

  return (
    <Box>
      <Spa10PageHero
        title={getLang(service.name, lang)}
        subtitle={getLang(service.shortDesc, lang)}
        image={service.image}
      />

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Stack spacing={4}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              border: `1px solid ${alpha(TEAL, 0.1)}`,
            }}
          >
            <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800, mb: 3 }}>
              {t('serviceDetails.description')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
              {getLang(service.fullDesc, lang)}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              border: `1px solid ${alpha(TEAL, 0.1)}`,
            }}
          >
            <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800, mb: 3 }}>
              {t('serviceDetails.benefits')}
            </Typography>
            <Stack spacing={2}>
              {service.benefits[lang]?.map((benefit: string, i: number) => (
                <Stack key={i} direction="row" spacing={2} alignItems="center">
                  <Iconify icon="solar:check-circle-bold-duotone" sx={{ color: TEAL }} />
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {benefit}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>

          <Stack direction="row" spacing={2} sx={{ pt: 4 }}>
            <Button
              size="large"
              startIcon={<Iconify icon="solar:calendar-add-bold-duotone" />}
              sx={{
                bgcolor: TEAL,
                color: NORDIC_BLUE,
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 800,
                '&:hover': { bgcolor: '#00A88A' },
              }}
            >
              {t('serviceDetails.bookNow')}
            </Button>
            <Button
              size="large"
              variant="outlined"
              startIcon={<Iconify icon="solar:arrow-left-bold-duotone" />}
              sx={{
                borderColor: alpha(TEAL, 0.3),
                color: NORDIC_BLUE,
                borderRadius: 2,
                px: 4,
                py: 1.5,
                '&:hover': { borderColor: TEAL },
              }}
            >
              {t('serviceDetails.back')}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// TRAINING PAGE
// ----------------------------------------------------------------------

export function Spa10TrainingPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('training.title')}
        subtitle={t('training.subtitle')}
        image={SPA10_PAGE_IMAGES.training}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_TRAINING.map((course) => (
            <Grid key={course.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={course.image}
                    alt={getLang(course.title, lang)}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: course.color,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: WHITE, fontWeight: 700, fontSize: 11 }}
                    >
                      {getLang(course.level, lang)}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1 }}>
                    {getLang(course.title, lang)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}
                  >
                    {getLang(course.description, lang)}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: SILVER }}>
                      {getLang(course.duration, lang)}
                    </Typography>
                    <Typography variant="h6" sx={{ color: course.color, fontWeight: 800 }}>
                      {formatVND(course.price)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BLOG PAGE
// ----------------------------------------------------------------------

export function Spa10BlogPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('blog.title')}
        subtitle={t('blog.subtitle')}
        image={SPA10_PAGE_IMAGES.blog}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_BLOG.map((post) => (
            <Grid key={post.id} xs={12} sm={6} md={4}>
              <Card
                component={RouterLink}
                href={paths.spa10.blogDetails(post.slug)}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: `0 20px 40px ${alpha(NORDIC_BLUE, 0.15)}`,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={getLang(post.title, lang)}
                />
                <CardContent sx={{ p: 3 }}>
                  <Chip
                    label={getLang(post.category, lang)}
                    size="small"
                    sx={{
                      bgcolor: alpha(TEAL, 0.1),
                      color: TEAL,
                      fontWeight: 600,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1.5 }}>
                    {getLang(post.title, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {getLang(post.excerpt, lang)}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" sx={{ color: SILVER }}>
                      {post.author}
                    </Typography>
                    <Typography variant="caption" sx={{ color: SILVER }}>
                      {post.date}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BLOG DETAILS PAGE
// ----------------------------------------------------------------------

export function Spa10BlogDetailsPageView() {
  const { currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  const post = SPA10_BLOG[0]; // In real app, fetch by slug

  return (
    <Box>
      <Box
        component="img"
        src={post.image}
        alt={getLang(post.title, lang)}
        sx={{ width: '100%', height: 400, objectFit: 'cover' }}
      />

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Chip
          label={getLang(post.category, lang)}
          size="small"
          sx={{
            bgcolor: alpha(TEAL, 0.1),
            color: TEAL,
            fontWeight: 600,
            mb: 3,
          }}
        />
        <Typography variant="h3" sx={{ color: NORDIC_BLUE, fontWeight: 800, mb: 3 }}>
          {getLang(post.title, lang)}
        </Typography>
        <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ color: SILVER }}>
            {post.author}
          </Typography>
          <Typography variant="body2" sx={{ color: SILVER }}>
            {post.date}
          </Typography>
          <Typography variant="body2" sx={{ color: SILVER }}>
            {getLang(post.readTime, lang)}
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
          {getLang(post.excerpt, lang)}
        </Typography>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// CAREERS PAGE
// ----------------------------------------------------------------------

export function Spa10CareersPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('careers.title')}
        subtitle={t('careers.subtitle')}
        image={SPA10_PAGE_IMAGES.careers}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_CAREERS.map((job) => (
            <Grid key={job.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  p: 3,
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Iconify
                  icon="solar:buildings-bold-duotone"
                  width={40}
                  sx={{ color: TEAL, mb: 2 }}
                />
                <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1 }}>
                  {getLang(job.title, lang)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  {getLang(job.department, lang)}
                </Typography>
                <Typography variant="body2" sx={{ color: SILVER, mb: 2 }}>
                  {getLang(job.location, lang)}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {getLang(job.description, lang)}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ color: SILVER }}>
                    {getLang(job.type, lang)}
                  </Typography>
                  <Typography variant="body1" sx={{ color: TEAL, fontWeight: 700 }}>
                    {getLang(job.salary, lang)}
                  </Typography>
                </Stack>
                <Button
                  fullWidth
                  sx={{
                    mt: 3,
                    bgcolor: NORDIC_BLUE,
                    color: ICE,
                    borderRadius: 2,
                    '&:hover': { bgcolor: '#152D4B' },
                  }}
                >
                  {t('careers.apply')}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BOOKING PAGE
// ----------------------------------------------------------------------

export function Spa10BookingPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('booking.title')}
        subtitle={t('booking.subtitle')}
        image={SPA10_PAGE_IMAGES.booking}
      />

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper
          sx={{
            p: 5,
            borderRadius: 3,
            border: `1px solid ${alpha(TEAL, 0.1)}`,
          }}
        >
          <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800, mb: 4 }}>
            {t('booking.formTitle')}
          </Typography>

          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField fullWidth label={t('booking.name')} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label={t('booking.phone')} />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField fullWidth label={t('booking.email')} type="email" />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('booking.date')}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  select
                  label={t('booking.service')}
                  SelectProps={{ native: true }}
                >
                  {SPA10_SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {getLang(service.name, lang)} - {formatVND(service.price)}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12}>
                <TextField fullWidth label={t('booking.notes')} multiline rows={4} />
              </Grid>
            </Grid>

            <Button
              size="large"
              sx={{
                bgcolor: TEAL,
                color: NORDIC_BLUE,
                borderRadius: 2,
                py: 2,
                fontWeight: 800,
                '&:hover': { bgcolor: '#00A88A' },
              }}
            >
              {t('booking.submit')}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// CONTACT PAGE
// ----------------------------------------------------------------------

export function Spa10ContactPageView() {
  const { t } = useTranslate('spa10');

  return (
    <Box>
      <Spa10PageHero
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        image={SPA10_PAGE_IMAGES.contact}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6}>
          <Grid xs={12} md={4}>
            <Stack spacing={4}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Iconify icon="solar:phone-bold-duotone" width={32} sx={{ color: TEAL, mb: 2 }} />
                <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                  {t('contact.phone')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  1900 1234
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Iconify icon="solar:letter-bold-duotone" width={32} sx={{ color: TEAL, mb: 2 }} />
                <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                  {t('contact.email')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  info@nordicspa.vn
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 4,
                  borderRadius: 3,
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Iconify
                  icon="solar:clock-circle-bold-duotone"
                  width={32}
                  sx={{ color: TEAL, mb: 2 }}
                />
                <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                  {t('contact.hours')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  07:00 - 22:00
                </Typography>
              </Paper>
            </Stack>
          </Grid>
          <Grid xs={12} md={8}>
            <Paper
              sx={{
                p: 5,
                borderRadius: 3,
                border: `1px solid ${alpha(TEAL, 0.1)}`,
                height: '100%',
              }}
            >
              <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800, mb: 4 }}>
                {t('contact.sendMessage')}
              </Typography>
              <Stack spacing={3}>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <TextField fullWidth label={t('contact.name')} />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField fullWidth label={t('contact.email')} type="email" />
                  </Grid>
                  <Grid xs={12}>
                    <TextField fullWidth label={t('contact.subject')} />
                  </Grid>
                  <Grid xs={12}>
                    <TextField fullWidth label={t('contact.message')} multiline rows={4} />
                  </Grid>
                </Grid>
                <Button
                  size="large"
                  sx={{
                    bgcolor: TEAL,
                    color: NORDIC_BLUE,
                    borderRadius: 2,
                    py: 2,
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#00A88A' },
                  }}
                >
                  {t('contact.send')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// OFFERS PAGE
// ----------------------------------------------------------------------

export function Spa10OffersPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('offers.title')}
        subtitle={t('offers.subtitle')}
        image={SPA10_PAGE_IMAGES.offers}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_OFFERS.map((offer) => (
            <Grid key={offer.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(offer.color, 0.2)}`,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={offer.image}
                  alt={getLang(offer.title, lang)}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1 }}>
                    {getLang(offer.title, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: TEAL, mb: 1 }}>
                    {getLang(offer.subtitle, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {getLang(offer.description, lang)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// FEEDBACK PAGE
// ----------------------------------------------------------------------

export function Spa10FeedbackPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('feedback.title')}
        subtitle={t('feedback.subtitle')}
        image={SPA10_PAGE_IMAGES.feedback}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_FEEDBACK.map((item) => (
            <Grid key={item.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  p: 4,
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={item.avatar} sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                        {item.name}
                      </Typography>
                      <Rating value={item.rating} readOnly size="small" sx={{ color: TEAL }} />
                    </Box>
                  </Stack>
                  <Chip
                    label={getLang(item.treatment, lang)}
                    size="small"
                    sx={{ bgcolor: alpha(TEAL, 0.1), color: TEAL, width: 'fit-content' }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, fontStyle: 'italic' }}
                  >
                    &quot;{getLang(item.comment, lang)}&quot;
                  </Typography>
                  <Typography variant="caption" sx={{ color: SILVER }}>
                    {item.date}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// PROMOTIONS PAGE
// ----------------------------------------------------------------------

export function Spa10PromotionsPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('promotions.title')}
        subtitle={t('promotions.subtitle')}
        image={SPA10_PAGE_IMAGES.promotions}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_PROMOTIONS.map((promo) => (
            <Grid key={promo.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  bgcolor: alpha(NORDIC_BLUE, 0.03),
                  border: `1px solid ${alpha(promo.color, 0.2)}`,
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={promo.image}
                    alt={getLang(promo.title, lang)}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: promo.color,
                    }}
                  >
                    <Typography variant="h5" sx={{ color: WHITE, fontWeight: 900 }}>
                      -{promo.discount}%
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1 }}>
                    {getLang(promo.title, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {getLang(promo.description, lang)}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={promo.code}
                      size="small"
                      sx={{ bgcolor: alpha(TEAL, 0.1), color: TEAL, fontWeight: 700 }}
                    />
                    <Typography variant="caption" sx={{ color: SILVER }}>
                      {t('promotions.valid')}: {promo.validUntil}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BRANCHES PAGE
// ----------------------------------------------------------------------

export function Spa10BranchesPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('branches.title')}
        subtitle={t('branches.subtitle')}
        image={SPA10_PAGE_IMAGES.branches}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_BRANCHES.map((branch) => (
            <Grid key={branch.id} xs={12} md={6} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={branch.image}
                  alt={getLang(branch.name, lang)}
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1.5 }}>
                    {getLang(branch.name, lang)}
                  </Typography>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <Iconify
                        icon="solar:map-point-bold-duotone"
                        width={18}
                        sx={{ color: TEAL, mt: 0.25 }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {getLang(branch.address, lang)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify icon="solar:phone-bold-duotone" width={18} sx={{ color: TEAL }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {branch.phone}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:clock-circle-bold-duotone"
                        width={18}
                        sx={{ color: TEAL }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {getLang(branch.hours, lang)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// ACCOUNT PAGE
// ----------------------------------------------------------------------

export function Spa10AccountPageView() {
  const { t } = useTranslate('spa10');

  return (
    <Box>
      <Spa10PageHero
        title={t('account.title')}
        subtitle={t('account.subtitle')}
        image={SPA10_PAGE_IMAGES.account}
      />

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Paper
              sx={{
                p: 5,
                borderRadius: 3,
                border: `1px solid ${alpha(TEAL, 0.1)}`,
                height: '100%',
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800 }}>
                  {t('account.login')}
                </Typography>
                <TextField fullWidth label={t('account.email')} type="email" />
                <TextField fullWidth label={t('account.password')} type="password" />
                <Button
                  size="large"
                  sx={{
                    bgcolor: TEAL,
                    color: NORDIC_BLUE,
                    borderRadius: 2,
                    py: 2,
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#00A88A' },
                  }}
                >
                  {t('account.loginBtn')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper
              sx={{
                p: 5,
                borderRadius: 3,
                border: `1px solid ${alpha(TEAL, 0.1)}`,
                height: '100%',
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800 }}>
                  {t('account.register')}
                </Typography>
                <TextField fullWidth label={t('account.fullName')} />
                <TextField fullWidth label={t('account.email')} type="email" />
                <TextField fullWidth label={t('account.password')} type="password" />
                <TextField fullWidth label={t('account.confirmPassword')} type="password" />
                <Button
                  size="large"
                  sx={{
                    bgcolor: NORDIC_BLUE,
                    color: ICE,
                    borderRadius: 2,
                    py: 2,
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#152D4B' },
                  }}
                >
                  {t('account.registerBtn')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// PARTNERS PAGE
// ----------------------------------------------------------------------

export function Spa10PartnersPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('partners.title')}
        subtitle={t('partners.subtitle')}
        image={SPA10_PAGE_IMAGES.partners}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_PARTNERS.map((partner) => (
            <Grid key={partner.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'center',
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Avatar
                  src={partner.logo}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: alpha(NORDIC_BLUE, 0.05),
                  }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 0.5 }}
                >
                  {getLang(partner.name, lang)}
                </Typography>
                <Typography variant="caption" sx={{ color: TEAL, mb: 1, display: 'block' }}>
                  {getLang(partner.type, lang)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {getLang(partner.description, lang)}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// PACKAGES PAGE
// ----------------------------------------------------------------------

export function Spa10PackagesPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('packages.title')}
        subtitle={t('packages.subtitle')}
        image={SPA10_PAGE_IMAGES.packages}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_PACKAGES.map((pkg) => (
            <Grid key={pkg.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `2px solid ${alpha(pkg.color, 0.3)}`,
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: alpha(pkg.color, 0.1),
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800 }}>
                    {getLang(pkg.name, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: pkg.color }}>
                    {getLang(pkg.subtitle, lang)}
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                      variant="h3"
                      sx={{ color: TEAL, fontWeight: 900, display: 'inline' }}
                    >
                      {formatVND(pkg.price)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: SILVER,
                        textDecoration: 'line-through',
                        ml: 1,
                        display: 'inline',
                      }}
                    >
                      {formatVND(pkg.originalPrice)}
                    </Typography>
                  </Box>
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('packages.treatments')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                        {pkg.treatments}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t('packages.validity')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                        {getLang(pkg.validity, lang)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="caption"
                    sx={{ color: TEAL, fontWeight: 700, mb: 1, display: 'block' }}
                  >
                    {t('packages.includes')}:
                  </Typography>
                  <Stack spacing={1}>
                    {pkg.includes[lang]?.map((item: string, i: number) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold-duotone"
                          width={16}
                          sx={{ color: TEAL }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    sx={{
                      mt: 3,
                      bgcolor: pkg.color,
                      color: WHITE,
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 800,
                      '&:hover': { bgcolor: alpha(pkg.color, 0.85) },
                    }}
                  >
                    {t('packages.bookNow')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// BEFORE/AFTER PAGE
// ----------------------------------------------------------------------

export function Spa10BeforeAfterPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('beforeAfter.title')}
        subtitle={t('beforeAfter.subtitle')}
        image={SPA10_PAGE_IMAGES.beforeAfter}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {SPA10_BEFORE_AFTER.map((item) => (
            <Grid key={item.id} xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(TEAL, 0.1)}`,
                }}
              >
                <Grid container>
                  <Grid xs={6}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.before}
                        alt="Before"
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          left: 8,
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          bgcolor: SILVER,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: WHITE, fontWeight: 700 }}>
                          Before
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid xs={6}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.after}
                        alt="After"
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          left: 8,
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          bgcolor: TEAL,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                          After
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: NORDIC_BLUE, fontWeight: 700, mb: 1 }}
                  >
                    {getLang(item.treatment, lang)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {getLang(item.description, lang)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: TEAL }}>
                    {getLang(item.duration, lang)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// FAQ PAGE
// ----------------------------------------------------------------------

export function Spa10FaqPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  return (
    <Box>
      <Spa10PageHero
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        image={SPA10_PAGE_IMAGES.faq}
      />

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Stack spacing={2}>
          {SPA10_FAQ.map((item) => (
            <Accordion
              key={item.id}
              sx={{
                borderRadius: 2,
                border: `1px solid ${alpha(TEAL, 0.1)}`,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Iconify icon="solar:alt-arrow-down-bold-duotone" sx={{ color: TEAL }} />
                }
              >
                <Typography variant="subtitle1" sx={{ color: NORDIC_BLUE, fontWeight: 700 }}>
                  {getLang(item.question, lang)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {getLang(item.answer, lang)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// POLICY PAGE
// ----------------------------------------------------------------------

export function Spa10PolicyPageView() {
  const { t } = useTranslate('spa10');

  return (
    <Box>
      <Spa10PageHero
        title={t('policy.title')}
        subtitle={t('policy.subtitle')}
        image={SPA10_PAGE_IMAGES.policy}
      />

      <Container maxWidth="md" sx={{ py: 10 }}>
        <Stack spacing={5}>
          {[
            {
              title: t('policy.termsTitle'),
              content: t('policy.termsContent'),
            },
            {
              title: t('policy.privacyTitle'),
              content: t('policy.privacyContent'),
            },
            {
              title: t('policy.refundTitle'),
              content: t('policy.refundContent'),
            },
          ].map((section, i) => (
            <Paper
              key={i}
              sx={{
                p: 4,
                borderRadius: 3,
                border: `1px solid ${alpha(TEAL, 0.1)}`,
              }}
            >
              <Typography variant="h5" sx={{ color: NORDIC_BLUE, fontWeight: 800, mb: 2 }}>
                {section.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                {section.content}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------
// GALLERY PAGE
// ----------------------------------------------------------------------

export function Spa10GalleryPageView() {
  const { t, currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;

  const [filter, setFilter] = React.useState('all');

  const categories = [
    { value: 'all', label: t('gallery.all') },
    { value: 'facilities', label: t('gallery.facilities') },
    { value: 'exterior', label: t('gallery.exterior') },
    { value: 'treatments', label: t('gallery.treatments') },
    { value: 'team', label: t('gallery.team') },
  ];

  const filteredGallery =
    filter === 'all' ? SPA10_GALLERY : SPA10_GALLERY.filter((item) => item.category === filter);

  return (
    <Box>
      <Spa10PageHero
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
        image={SPA10_PAGE_IMAGES.gallery}
      />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Stack direction="row" justifyContent="center" sx={{ mb: 5 }}>
          <ToggleButtonGroup
            value={filter}
            onChange={(_, newFilter) => {
              if (newFilter !== null) setFilter(newFilter);
            }}
            exclusive
            sx={{
              bgcolor: alpha(NORDIC_BLUE, 0.03),
              borderRadius: 2,
              p: 0.5,
            }}
          >
            {categories.map((cat) => (
              <ToggleButton
                key={cat.value}
                value={cat.value}
                sx={{
                  px: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&.Mui-selected': {
                    bgcolor: TEAL,
                    color: NORDIC_BLUE,
                    fontWeight: 700,
                  },
                }}
              >
                {cat.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>

        <Grid container spacing={3}>
          {filteredGallery.map((item) => (
            <Grid key={item.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: `0 12px 24px ${alpha(NORDIC_BLUE, 0.15)}`,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={item.src}
                  alt={getLang(item.alt, lang)}
                  sx={{ objectFit: 'cover' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
