import React from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import {
  getLang,
  PLATINUM,
  DEEP_NAVY,
  ROSE_GOLD,
  formatVND,
  SPA12_BLOG,
  SPA12_FAQS,
  PEARL_WHITE,
  SPA12_OFFERS,
  SPA12_CAREERS,
  SPA12_GALLERY,
  CHAMPAGNE_GOLD,
  SPA12_SERVICES,
  SPA12_TRAINING,
  SPA12_BRANCHES,
  SPA12_PACKAGES,
  SPA12_PARTNERS,
  SPA12_FEEDBACKS,
  SPA12_PROMOTIONS,
  SPA12_BEFORE_AFTER,
} from './spa12-pages-data';

import type { Spa12Lang } from './spa12-data';

// Shared Hero Component
function Spa12PageHero({
  title,
  subtitle,
  image,
  badge,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 320, md: 420 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: DEEP_NAVY,
      }}
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.25)',
          }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom, rgba(10,22,40,0.7), rgba(10,22,40,0.95))`,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <MotionContainer>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            {badge && (
              <Chip
                label={badge}
                sx={{
                  bgcolor: CHAMPAGNE_GOLD,
                  color: DEEP_NAVY,
                  fontWeight: 900,
                  letterSpacing: 2,
                  fontSize: 10,
                  mb: 2,
                }}
              />
            )}
            <Typography
              variant="h1"
              sx={{
                color: PEARL_WHITE,
                fontSize: { xs: 32, md: 52 },
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: -1,
                mb: 2,
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(249,246,238,0.65)',
                  maxWidth: 600,
                  lineHeight: 1.7,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </m.div>
        </MotionContainer>
      </Container>
    </Box>
  );
}

// ABOUT PAGE
export function Spa12AboutPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  const stats = [
    {
      value: '12+',
      label: {
        vi: 'Năm kinh nghiệm',
        en: 'Years Experience',
        fr: "Années d'expérience",
        cn: '年经验',
        ar: 'سنوات الخبرة',
      },
    },
    {
      value: '50K+',
      label: {
        vi: 'Khách hàng VIP',
        en: 'VIP Clients',
        fr: 'Clients VIP',
        cn: 'VIP客户',
        ar: 'عملاء VIP',
      },
    },
    {
      value: '30+',
      label: {
        vi: 'Giải thưởng quốc tế',
        en: 'International Awards',
        fr: 'Prix Internationaux',
        cn: '国际奖项',
        ar: 'جوائز دولية',
      },
    },
    {
      value: '4.9',
      label: {
        vi: 'Đánh giá trung bình',
        en: 'Average Rating',
        fr: 'Note Moyenne',
        cn: '平均评分',
        ar: 'متوسط التقييم',
      },
    },
  ];

  return (
    <>
      <Spa12PageHero
        title={t('about.heroTitle')}
        subtitle={t('about.heroSubtitle')}
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        badge={t('about.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Typography
              variant="h2"
              sx={{ color: DEEP_NAVY, fontSize: { xs: 28, md: 40 }, fontWeight: 900, mb: 4 }}
            >
              {t('about.philosophy')}
            </Typography>
          </m.div>

          <Grid container spacing={4}>
            <Grid xs={12} md={6}>
              <m.div variants={varFade({ distance: 30 }).inUp}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80"
                  alt="About"
                  sx={{
                    width: '100%',
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(10,22,40,0.15)',
                  }}
                />
              </m.div>
            </Grid>
            <Grid xs={12} md={6}>
              <m.div variants={varFade({ distance: 30 }).inUp}>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2, mb: 3 }}>
                  {t('about.story')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2 }}>
                  {t('about.vision')}
                </Typography>
              </m.div>
            </Grid>
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid xs={6} md={3} key={index}>
                  <m.div variants={varFade({ distance: 30 }).inUp}>
                    <Card
                      sx={{
                        bgcolor: DEEP_NAVY,
                        color: PEARL_WHITE,
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 3,
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{ color: CHAMPAGNE_GOLD, fontWeight: 900, mb: 1 }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(249,246,238,0.7)' }}>
                        {getLang(stat.label, lang)}
                      </Typography>
                    </Card>
                  </m.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </MotionContainer>
      </Container>
    </>
  );
}

// SERVICES PAGE
export function Spa12ServicesPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('services.heroTitle')}
        subtitle={t('services.heroSubtitle')}
        image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
        badge={t('services.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_SERVICES.map((service, index) => (
              <Grid xs={12} sm={6} md={4} key={service.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card
                    component={RouterLink}
                    href={paths.spa10.serviceDetails(service.id)}
                    sx={{
                      textDecoration: 'none',
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(10,22,40,0.15)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 220 }}>
                      <Box
                        component="img"
                        src={service.image}
                        alt={getLang(service.name, lang)}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Chip
                        label={getLang(service.badge, lang)}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: service.color,
                          color:
                            service.color === PEARL_WHITE || service.color === PLATINUM
                              ? DEEP_NAVY
                              : PEARL_WHITE,
                          fontWeight: 700,
                          fontSize: 10,
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 1 }}>
                        {getLang(service.name, lang)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}
                      >
                        {getLang(service.tagline, lang)}
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{ color: CHAMPAGNE_GOLD, fontWeight: 900 }}>
                          {formatVND(service.price)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {getLang(service.duration, lang)}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// SERVICE DETAILS PAGE
export function Spa12ServiceDetailsPageView() {
  const { t } = useTranslate('spa12');

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <MotionContainer>
        <m.div variants={varFade({ distance: 30 }).inUp}>
          <Typography variant="h2" sx={{ color: DEEP_NAVY, fontWeight: 900, mb: 4 }}>
            {t('serviceDetails.title')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2 }}>
            {t('serviceDetails.description')}
          </Typography>
        </m.div>
      </MotionContainer>
    </Container>
  );
}

// TRAINING PAGE
export function Spa12TrainingPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('training.heroTitle')}
        subtitle={t('training.heroSubtitle')}
        image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1920&q=80"
        badge={t('training.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_TRAINING.map((program) => (
              <Grid xs={12} md={4} key={program.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <Box
                        component="img"
                        src={program.image}
                        alt={getLang(program.title, lang)}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 1 }}>
                        {getLang(program.title, lang)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                      >
                        {getLang(program.description, lang)}
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                          {getLang(program.duration, lang)}
                        </Typography>
                        <Typography variant="h6" sx={{ color: CHAMPAGNE_GOLD, fontWeight: 900 }}>
                          {formatVND(program.price)}
                        </Typography>
                      </Stack>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 2,
                          bgcolor: DEEP_NAVY,
                          color: PEARL_WHITE,
                          fontWeight: 700,
                          '&:hover': { bgcolor: CHAMPAGNE_GOLD, color: DEEP_NAVY },
                        }}
                      >
                        {t('training.enroll')}
                      </Button>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// BLOG PAGE
export function Spa12BlogPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('blog.heroTitle')}
        subtitle={t('blog.heroSubtitle')}
        image="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1920&q=80"
        badge={t('blog.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_BLOG.map((post) => (
              <Grid xs={12} md={4} key={post.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card
                    component={RouterLink}
                    href={paths.spa10.blogDetails(post.slug)}
                    sx={{
                      textDecoration: 'none',
                      borderRadius: 3,
                      overflow: 'hidden',
                      height: '100%',
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <Box
                        component="img"
                        src={post.image}
                        alt={getLang(post.title, lang)}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="caption" sx={{ color: ROSE_GOLD, fontWeight: 700 }}>
                        {post.date}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 1, mt: 0.5 }}
                      >
                        {getLang(post.title, lang)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {getLang(post.excerpt, lang)}
                      </Typography>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// BLOG DETAILS PAGE
export function Spa12BlogDetailsPageView() {
  const { t } = useTranslate('spa12');

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <MotionContainer>
        <m.div variants={varFade({ distance: 30 }).inUp}>
          <Typography variant="h2" sx={{ color: DEEP_NAVY, fontWeight: 900, mb: 4 }}>
            {t('blogDetails.title')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2 }}>
            {t('blogDetails.content')}
          </Typography>
        </m.div>
      </MotionContainer>
    </Container>
  );
}

// CAREERS PAGE
export function Spa12CareersPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('careers.heroTitle')}
        subtitle={t('careers.heroSubtitle')}
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        badge={t('careers.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_CAREERS.map((career) => (
              <Grid xs={12} md={4} key={career.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      height: '100%',
                      bgcolor: PEARL_WHITE,
                      border: `1px solid ${CHAMPAGNE_GOLD}30`,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 2 }}>
                      {getLang(career.title, lang)}
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="solar:buildings-bold-duotone"
                          width={16}
                          sx={{ color: CHAMPAGNE_GOLD }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {getLang(career.department, lang)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="solar:map-point-bold-duotone"
                          width={16}
                          sx={{ color: CHAMPAGNE_GOLD }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {getLang(career.location, lang)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify
                          icon="solar:money-bag-bold-duotone"
                          width={16}
                          sx={{ color: CHAMPAGNE_GOLD }}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {getLang(career.salary, lang)}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                    >
                      {getLang(career.description, lang)}
                    </Typography>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderColor: DEEP_NAVY,
                        color: DEEP_NAVY,
                        fontWeight: 700,
                        '&:hover': {
                          bgcolor: DEEP_NAVY,
                          color: PEARL_WHITE,
                          borderColor: DEEP_NAVY,
                        },
                      }}
                    >
                      {t('careers.apply')}
                    </Button>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// BOOKING PAGE
export function Spa12BookingPageView() {
  const { t } = useTranslate('spa12');

  return (
    <>
      <Spa12PageHero
        title={t('bookingPage.heroTitle')}
        subtitle={t('bookingPage.heroSubtitle')}
        image="https://images.unsplash.com/photo-1600334129120-276ff4fb63d3?w=1920&q=80"
        badge={t('bookingPage.badge')}
      />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Card sx={{ borderRadius: 4, p: { xs: 3, md: 5 }, bgcolor: DEEP_NAVY }}>
              <Typography
                variant="h4"
                sx={{ color: PEARL_WHITE, fontWeight: 900, mb: 4, textAlign: 'center' }}
              >
                {t('bookingPage.formTitle')}
              </Typography>
              <Stack spacing={3}>
                <TextField
                  label={t('bookingPage.name')}
                  variant="filled"
                  InputProps={{ sx: { color: PEARL_WHITE } }}
                  InputLabelProps={{ sx: { color: 'rgba(249,246,238,0.7)' } }}
                />
                <TextField
                  label={t('bookingPage.phone')}
                  variant="filled"
                  InputProps={{ sx: { color: PEARL_WHITE } }}
                  InputLabelProps={{ sx: { color: 'rgba(249,246,238,0.7)' } }}
                />
                <TextField
                  label={t('bookingPage.email')}
                  variant="filled"
                  InputProps={{ sx: { color: PEARL_WHITE } }}
                  InputLabelProps={{ sx: { color: 'rgba(249,246,238,0.7)' } }}
                />
                <TextField
                  label={t('bookingPage.service')}
                  select
                  variant="filled"
                  InputProps={{ sx: { color: PEARL_WHITE } }}
                  InputLabelProps={{ sx: { color: 'rgba(249,246,238,0.7)' } }}
                  SelectProps={{ native: true }}
                >
                  <option value="pearl">Pearl Radiance Facial</option>
                  <option value="gold">24K Gold Leaf Facial</option>
                  <option value="diamond">Diamond Microdermabrasion</option>
                  <option value="stem">Stem Cell Rejuvenation</option>
                </TextField>
                <TextField
                  label={t('bookingPage.notes')}
                  multiline
                  rows={4}
                  variant="filled"
                  InputProps={{ sx: { color: PEARL_WHITE } }}
                  InputLabelProps={{ sx: { color: 'rgba(249,246,238,0.7)' } }}
                />
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    bgcolor: CHAMPAGNE_GOLD,
                    color: DEEP_NAVY,
                    fontWeight: 900,
                    py: 1.5,
                    fontSize: 16,
                    '&:hover': { bgcolor: ROSE_GOLD },
                  }}
                >
                  {t('bookingPage.submit')}
                </Button>
              </Stack>
            </Card>
          </m.div>
        </MotionContainer>
      </Container>
    </>
  );
}

// CONTACT PAGE
export function Spa12ContactPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('contact.heroTitle')}
        subtitle={t('contact.heroSubtitle')}
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        badge={t('contact.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={6}>
            <Grid xs={12} md={5}>
              <m.div variants={varFade({ distance: 30 }).inUp}>
                <Card sx={{ borderRadius: 3, bgcolor: DEEP_NAVY, color: PEARL_WHITE, p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: CHAMPAGNE_GOLD }}>
                    {t('contact.info')}
                  </Typography>
                  <Stack spacing={2.5}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Iconify
                        icon="solar:phone-bold-duotone"
                        width={24}
                        sx={{ color: CHAMPAGNE_GOLD }}
                      />
                      <Typography variant="body1">+84 24 3939 1212</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Iconify
                        icon="solar:letter-bold-duotone"
                        width={24}
                        sx={{ color: CHAMPAGNE_GOLD }}
                      />
                      <Typography variant="body1">concierge@pearlmansion.com</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Iconify
                        icon="solar:map-point-bold-duotone"
                        width={24}
                        sx={{ color: CHAMPAGNE_GOLD }}
                      />
                      <Typography variant="body1">
                        {getLang(SPA12_BRANCHES[0].address, lang)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Iconify
                        icon="solar:clock-circle-bold-duotone"
                        width={24}
                        sx={{ color: CHAMPAGNE_GOLD }}
                      />
                      <Typography variant="body1">
                        {getLang(SPA12_BRANCHES[0].hours, lang)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </m.div>
            </Grid>
            <Grid xs={12} md={7}>
              <m.div variants={varFade({ distance: 30 }).inUp}>
                <Card sx={{ borderRadius: 3, p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 3 }}>
                    {t('contact.sendMessage')}
                  </Typography>
                  <Stack spacing={2.5}>
                    <TextField label={t('contact.name')} fullWidth />
                    <TextField label={t('contact.email')} fullWidth />
                    <TextField label={t('contact.subject')} fullWidth />
                    <TextField label={t('contact.message')} multiline rows={4} fullWidth />
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: DEEP_NAVY,
                        color: PEARL_WHITE,
                        fontWeight: 700,
                        '&:hover': { bgcolor: CHAMPAGNE_GOLD, color: DEEP_NAVY },
                      }}
                    >
                      {t('contact.send')}
                    </Button>
                  </Stack>
                </Card>
              </m.div>
            </Grid>
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// OFFERS PAGE
export function Spa12OffersPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('offers.heroTitle')}
        subtitle={t('offers.heroSubtitle')}
        image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
        badge={t('offers.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_OFFERS.map((offer) => (
              <Grid xs={12} md={4} key={offer.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      p: 3,
                      bgcolor: DEEP_NAVY,
                      color: PEARL_WHITE,
                      height: '100%',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 900, color: CHAMPAGNE_GOLD, mb: 1 }}>
                      {getLang(offer.title, lang)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(249,246,238,0.7)', mb: 2, lineHeight: 1.7 }}
                    >
                      {getLang(offer.description, lang)}
                    </Typography>
                    <Divider sx={{ borderColor: 'rgba(249,246,238,0.1)', my: 2 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Chip
                        label={offer.code}
                        size="small"
                        sx={{ bgcolor: CHAMPAGNE_GOLD, color: DEEP_NAVY, fontWeight: 700 }}
                      />
                      <Typography variant="caption" sx={{ color: 'rgba(249,246,238,0.5)' }}>
                        {offer.validUntil}
                      </Typography>
                    </Stack>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// FEEDBACK PAGE
export function Spa12FeedbackPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('feedback.heroTitle')}
        subtitle={t('feedback.heroSubtitle')}
        image="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=1920&q=80"
        badge={t('feedback.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_FEEDBACKS.map((fb) => (
              <Grid xs={12} md={4} key={fb.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card sx={{ borderRadius: 3, p: 3, height: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                      <Avatar src={fb.avatar} sx={{ width: 48, height: 48 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 900, color: DEEP_NAVY }}>
                          {fb.name}
                        </Typography>
                        <Rating value={fb.rating} size="small" readOnly />
                      </Box>
                    </Stack>
                    <Typography
                      variant="caption"
                      sx={{ color: ROSE_GOLD, fontWeight: 700, mb: 1, display: 'block' }}
                    >
                      {fb.service}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {getLang(fb.comment, lang)}
                    </Typography>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// PROMOTIONS PAGE
export function Spa12PromotionsPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('promotions.heroTitle')}
        subtitle={t('promotions.heroSubtitle')}
        image="https://images.unsplash.com/photo-1600334129120-276ff4fb63d3?w=1920&q=80"
        badge={t('promotions.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_PROMOTIONS.map((promo) => (
              <Grid xs={12} md={4} key={promo.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative', height: 180 }}>
                      <Box
                        component="img"
                        src={promo.image}
                        alt={getLang(promo.title, lang)}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Chip
                        label={
                          typeof promo.discount === 'string'
                            ? promo.discount
                            : getLang(promo.discount, lang)
                        }
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: CHAMPAGNE_GOLD,
                          color: DEEP_NAVY,
                          fontWeight: 900,
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 1 }}>
                        {getLang(promo.title, lang)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                      >
                        {getLang(promo.description, lang)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {t('promotions.validUntil')}: {promo.validUntil}
                      </Typography>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// BRANCHES PAGE
export function Spa12BranchesPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('branches.heroTitle')}
        subtitle={t('branches.heroSubtitle')}
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        badge={t('branches.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_BRANCHES.map((branch) => (
              <Grid xs={12} md={6} key={branch.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <Box
                        component="img"
                        src={branch.image}
                        alt={getLang(branch.name, lang)}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {branch.isFlagship && (
                        <Chip
                          label={t('branches.flagship')}
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: CHAMPAGNE_GOLD,
                            color: DEEP_NAVY,
                            fontWeight: 900,
                          }}
                        />
                      )}
                    </Box>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 1 }}>
                        {getLang(branch.name, lang)}
                      </Typography>
                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="flex-start" spacing={1}>
                          <Iconify
                            icon="solar:map-point-bold-duotone"
                            width={18}
                            sx={{ color: CHAMPAGNE_GOLD, mt: 0.3 }}
                          />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {getLang(branch.address, lang)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify
                            icon="solar:phone-bold-duotone"
                            width={18}
                            sx={{ color: CHAMPAGNE_GOLD }}
                          />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {branch.phone}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Iconify
                            icon="solar:clock-circle-bold-duotone"
                            width={18}
                            sx={{ color: CHAMPAGNE_GOLD }}
                          />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {getLang(branch.hours, lang)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// ACCOUNT PAGE
export function Spa12AccountPageView() {
  const { t } = useTranslate('spa12');

  return (
    <>
      <Spa12PageHero
        title={t('account.heroTitle')}
        subtitle={t('account.heroSubtitle')}
        image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
        badge={t('account.badge')}
      />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Card sx={{ borderRadius: 3, p: { xs: 3, md: 5 } }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 4, textAlign: 'center' }}
              >
                {t('account.loginTitle')}
              </Typography>
              <Stack spacing={3}>
                <TextField label={t('account.email')} fullWidth />
                <TextField label={t('account.password')} type="password" fullWidth />
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    bgcolor: DEEP_NAVY,
                    color: PEARL_WHITE,
                    fontWeight: 700,
                    '&:hover': { bgcolor: CHAMPAGNE_GOLD, color: DEEP_NAVY },
                  }}
                >
                  {t('account.login')}
                </Button>
                <Button variant="text" sx={{ color: ROSE_GOLD }}>
                  {t('account.forgot')}
                </Button>
                <Divider sx={{ my: 2 }}>{t('account.or')}</Divider>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{ borderColor: DEEP_NAVY, color: DEEP_NAVY, fontWeight: 700 }}
                >
                  {t('account.register')}
                </Button>
              </Stack>
            </Card>
          </m.div>
        </MotionContainer>
      </Container>
    </>
  );
}

// PARTNERS PAGE
export function Spa12PartnersPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('partners.heroTitle')}
        subtitle={t('partners.heroSubtitle')}
        image="https://images.unsplash.com/photo-1600334129120-276ff4fb63d3?w=1920&q=80"
        badge={t('partners.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_PARTNERS.map((partner) => (
              <Grid xs={12} sm={6} md={3} key={partner.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card sx={{ borderRadius: 3, p: 3, textAlign: 'center', height: '100%' }}>
                    <Box
                      component="img"
                      src={partner.logo}
                      alt={getLang(partner.name, lang)}
                      sx={{
                        width: 120,
                        height: 60,
                        objectFit: 'contain',
                        mb: 2,
                        filter: 'grayscale(0.2)',
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 1 }}>
                      {getLang(partner.name, lang)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {getLang(partner.description, lang)}
                    </Typography>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// PACKAGES PAGE
export function Spa12PackagesPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('packages.heroTitle')}
        subtitle={t('packages.heroSubtitle')}
        image="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1920&q=80"
        badge={t('packages.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_PACKAGES.map((pkg) => (
              <Grid xs={12} md={4} key={pkg.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: 'hidden',
                      height: '100%',
                      bgcolor:
                        pkg.color === PEARL_WHITE || pkg.color === PLATINUM ? DEEP_NAVY : pkg.color,
                      color:
                        pkg.color === PEARL_WHITE || pkg.color === PLATINUM
                          ? PEARL_WHITE
                          : DEEP_NAVY,
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 160 }}>
                      <Box
                        component="img"
                        src={pkg.image}
                        alt={getLang(pkg.name, lang)}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'brightness(0.6)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 900, color: PEARL_WHITE }}>
                          {getLang(pkg.name, lang)}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: 'inherit' }}>
                        {formatVND(pkg.price)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'inherit', opacity: 0.8, mb: 2 }}>
                        {pkg.sessions} {t('packages.sessions')} · {getLang(pkg.validity, lang)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'inherit', opacity: 0.7, lineHeight: 1.7, mb: 3 }}
                      >
                        {getLang(pkg.description, lang)}
                      </Typography>
                      <Button
                        fullWidth
                        variant={
                          pkg.color === PEARL_WHITE || pkg.color === PLATINUM
                            ? 'outlined'
                            : 'contained'
                        }
                        sx={{
                          fontWeight: 700,
                          borderColor:
                            pkg.color === PEARL_WHITE || pkg.color === PLATINUM
                              ? PEARL_WHITE
                              : DEEP_NAVY,
                          color:
                            pkg.color === PEARL_WHITE || pkg.color === PLATINUM
                              ? PEARL_WHITE
                              : DEEP_NAVY,
                          bgcolor:
                            pkg.color === PEARL_WHITE || pkg.color === PLATINUM
                              ? 'transparent'
                              : PEARL_WHITE,
                          '&:hover': {
                            bgcolor: CHAMPAGNE_GOLD,
                            color: DEEP_NAVY,
                            borderColor: CHAMPAGNE_GOLD,
                          },
                        }}
                      >
                        {t('packages.book')}
                      </Button>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// BEFORE AFTER PAGE
export function Spa12BeforeAfterPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('beforeAfter.heroTitle')}
        subtitle={t('beforeAfter.heroSubtitle')}
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        badge={t('beforeAfter.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <Grid container spacing={4}>
            {SPA12_BEFORE_AFTER.map((item) => (
              <Grid xs={12} md={4} key={item.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box sx={{ display: 'flex', height: 200 }}>
                      <Box sx={{ width: '50%', position: 'relative' }}>
                        <Box
                          component="img"
                          src={item.beforeImage}
                          alt="Before"
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Chip
                          label={t('beforeAfter.before')}
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            left: 8,
                            bgcolor: 'grey.800',
                            color: 'white',
                          }}
                        />
                      </Box>
                      <Box sx={{ width: '50%', position: 'relative' }}>
                        <Box
                          component="img"
                          src={item.afterImage}
                          alt="After"
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Chip
                          label={t('beforeAfter.after')}
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: CHAMPAGNE_GOLD,
                            color: DEEP_NAVY,
                          }}
                        />
                      </Box>
                    </Box>
                    <CardContent>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 1 }}
                      >
                        {item.service}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {getLang(item.caption, lang)}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: ROSE_GOLD, fontWeight: 700, mt: 1, display: 'block' }}
                      >
                        {item.duration}
                      </Typography>
                    </CardContent>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}

// FAQ PAGE
export function Spa12FaqPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  return (
    <>
      <Spa12PageHero
        title={t('faq.heroTitle')}
        subtitle={t('faq.heroSubtitle')}
        image="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=1920&q=80"
        badge={t('faq.badge')}
      />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Stack spacing={2}>
              {SPA12_FAQS.map((faq) => (
                <Accordion
                  key={faq.id}
                  sx={{
                    borderRadius: 2,
                    '&:before': { display: 'none' },
                    border: `1px solid ${CHAMPAGNE_GOLD}30`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Iconify icon="solar:alt-arrow-down-bold" sx={{ color: CHAMPAGNE_GOLD }} />
                    }
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: DEEP_NAVY }}>
                      {getLang(faq.question, lang)}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {getLang(faq.answer, lang)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </m.div>
        </MotionContainer>
      </Container>
    </>
  );
}

// POLICY PAGE
export function Spa12PolicyPageView() {
  const { t } = useTranslate('spa12');

  return (
    <>
      <Spa12PageHero
        title={t('policy.heroTitle')}
        subtitle={t('policy.heroSubtitle')}
        image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
        badge={t('policy.badge')}
      />

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Card sx={{ borderRadius: 3, p: { xs: 3, md: 5 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 3 }}>
                {t('policy.terms')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2, mb: 4 }}>
                {t('policy.termsContent')}
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 3 }}>
                {t('policy.privacy')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2, mb: 4 }}>
                {t('policy.privacyContent')}
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 900, color: DEEP_NAVY, mb: 3 }}>
                {t('policy.refund')}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2 }}>
                {t('policy.refundContent')}
              </Typography>
            </Card>
          </m.div>
        </MotionContainer>
      </Container>
    </>
  );
}

// GALLERY PAGE
export function Spa12GalleryPageView() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang as unknown as Spa12Lang;

  const [value, setValue] = React.useState(0);

  const categories = [
    { label: { vi: 'Tất cả', en: 'All', fr: 'Tout', cn: '全部', ar: 'الكل' }, filter: 'all' },
    {
      label: { vi: 'Nội thất', en: 'Interior', fr: 'Intérieur', cn: '室内', ar: 'داخلي' },
      filter: 'interior',
    },
    {
      label: { vi: 'Điều trị', en: 'Treatment', fr: 'Traitement', cn: '治疗', ar: 'علاج' },
      filter: 'treatment',
    },
    {
      label: { vi: 'Công nghệ', en: 'Technology', fr: 'Technologie', cn: '技术', ar: 'تكنولوجيا' },
      filter: 'technology',
    },
  ];

  const filteredGallery =
    value === 0
      ? SPA12_GALLERY
      : SPA12_GALLERY.filter((item) => item.category === categories[value].filter);

  return (
    <>
      <Spa12PageHero
        title={t('gallery.heroTitle')}
        subtitle={t('gallery.heroSubtitle')}
        image="https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=1920&q=80"
        badge={t('gallery.badge')}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionContainer>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Tabs
              value={value}
              onChange={(_, newValue) => setValue(newValue)}
              sx={{ mb: 4 }}
              TabIndicatorProps={{ sx: { bgcolor: CHAMPAGNE_GOLD } }}
            >
              {categories.map((cat, index) => (
                <Tab
                  key={cat.filter}
                  label={getLang(cat.label, lang)}
                  sx={{
                    fontWeight: 700,
                    color: value === index ? DEEP_NAVY : 'text.disabled',
                    '&.Mui-selected': { color: DEEP_NAVY },
                  }}
                />
              ))}
            </Tabs>
          </m.div>

          <Grid container spacing={3}>
            {filteredGallery.map((item) => (
              <Grid xs={12} sm={6} md={3} key={item.id}>
                <m.div variants={varFade({ distance: 30 }).inUp}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  >
                    <Box sx={{ position: 'relative', height: 200 }}>
                      <Box
                        component="img"
                        src={item.src}
                        alt={getLang(item.title, lang)}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          p: 1.5,
                          background: 'linear-gradient(to top, rgba(10,22,40,0.9), transparent)',
                        }}
                      >
                        <Typography variant="caption" sx={{ color: PEARL_WHITE, fontWeight: 600 }}>
                          {getLang(item.title, lang)}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </MotionContainer>
      </Container>
    </>
  );
}
