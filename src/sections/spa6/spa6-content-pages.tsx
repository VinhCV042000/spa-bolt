import { useState } from 'react';
import { m } from 'framer-motion';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import DialogContent from '@mui/material/DialogContent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  DARK,
  SAND,
  CREAM,
  BROWN,
  FOREST,
  spa6Faqs,
  TERRACOTTA,
  spa6Offers,
  spa6Careers,
  spa6Gallery,
  spa6Services,
  spa6Branches,
  spa6Packages,
  spa6Partners,
  spa6Policies,
  spa6BlogPosts,
  spa6Feedbacks,
  spa6Promotions,
  spa6Instructors,
  spa6ContactInfo,
  spa6AboutContent,
  spa6BeforeAfters,
  spa6FaqCategories,
  spa6BlogCategories,
  spa6CareerBenefits,
  spa6TrainingPrograms,
  spa6ServiceCategories,
} from './spa6-pages-data';

import type { Spa6Lang } from './spa6-pages-data';

// ----------------------------------------------------------------------

function Spa6PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  buttonText,
  buttonLink,
}: {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 400, md: 500 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: DARK,
      }}
    >
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
          opacity: 0.4,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, rgba(28,16,8,0.9) 0%, rgba(28,16,8,0.6) 100%)`,
        }}
      />
      <Container sx={{ position: 'relative', zIndex: 2 }}>
        <MotionViewport>
          <Stack spacing={3} sx={{ maxWidth: 700 }}>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Chip
                label={eyebrow}
                sx={{
                  bgcolor: TERRACOTTA,
                  color: CREAM,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              />
            </Box>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                variant="h2"
                sx={{
                  color: CREAM,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: -1.5,
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(249,244,237,0.7)', lineHeight: 1.8, maxWidth: 500 }}
              >
                {subtitle}
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Button
                href={buttonLink}
                size="large"
                sx={{
                  bgcolor: TERRACOTTA,
                  color: CREAM,
                  borderRadius: 3,
                  px: 4,
                  py: 1.75,
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#A83A0C' },
                }}
              >
                {buttonText}
              </Button>
            </Box>
          </Stack>
        </MotionViewport>
      </Container>
      {/* Organic decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: `1px solid rgba(193,68,14,0.15)`,
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6AboutPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=80"
        eyebrow={spa6AboutContent.eyebrow[lang]}
        title={spa6AboutContent.title[lang]}
        subtitle={spa6AboutContent.description[lang]}
        buttonText={t('hero.startJourney') || 'Start Journey'}
        buttonLink="/spa6/booking"
      />

      {/* Philosophy Section */}
      <Container component={MotionViewport} sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={6}>
            <Box component={m.div} variants={varFade({ distance: 40 }).inLeft}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 6,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                  alt="Terra Heal"
                  sx={{ width: '100%', height: 480, objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    bgcolor: FOREST,
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Typography variant="h3" sx={{ color: CREAM, fontWeight: 900 }}>
                    5000+
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.8)' }}>
                    {spa6AboutContent.stats.guests[lang]}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <MotionViewport>
              <Stack spacing={3}>
                <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
                  <Typography
                    variant="overline"
                    sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700 }}
                  >
                    {spa6AboutContent.eyebrow[lang]}
                  </Typography>
                </Box>
                <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
                  <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2, color: DARK }}>
                    {spa6AboutContent.title[lang]}
                  </Typography>
                </Box>
                <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                    {spa6AboutContent.philosophy[lang]}
                  </Typography>
                </Box>

                {/* Stats */}
                <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
                  <Grid container spacing={2}>
                    {Object.entries(spa6AboutContent.stats).map(([key, value]) => (
                      <Grid key={key} xs={6} sm={3}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            bgcolor: 'white',
                            border: '1px solid',
                            borderColor: 'rgba(0,0,0,0.06)',
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: 800, color: TERRACOTTA }}>
                            {value[lang]}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box component={m.div} variants={varFade({ distance: 30 }).inRight}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: FOREST,
                      borderRadius: 3,
                      px: 4,
                      '&:hover': { bgcolor: '#234512' },
                    }}
                  >
                    {t('about.learnMore') || 'Learn More'}
                  </Button>
                </Box>
              </Stack>
            </MotionViewport>
          </Grid>
        </Grid>
      </Container>

      {/* Three Pillars */}
      <Box sx={{ bgcolor: DARK, py: { xs: 8, md: 12 } }}>
        <Container component={MotionViewport}>
          <Stack spacing={2} sx={{ textAlign: 'center', mb: 6 }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="overline"
                sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700 }}
              >
                {t('about.pillars') || 'Three Pillars'}
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography variant="h3" sx={{ color: CREAM, fontWeight: 800 }}>
                {t('about.pillarsTitle') || 'Ayurveda • Forest Bathing • Boreh'}
              </Typography>
            </Box>
          </Stack>
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(193,68,14,0.08)',
                    border: '1px solid rgba(193,68,14,0.2)',
                    height: '100%',
                  }}
                >
                  <Iconify
                    icon="solar:yin-yang-bold-duotone"
                    width={48}
                    sx={{ color: TERRACOTTA, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                    Ayurveda
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(249,244,237,0.6)', lineHeight: 1.7 }}
                  >
                    {t('about.ayurvedaDesc') ||
                      'Traditional Indian medicine addressing body, mind, and spirit through Dosha balance.'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(45,80,22,0.08)',
                    border: '1px solid rgba(45,80,22,0.3)',
                    height: '100%',
                  }}
                >
                  <Iconify
                    icon="solar:leaf-bold-duotone"
                    width={48}
                    sx={{ color: FOREST, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                    Shinrin-yoku
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(249,244,237,0.6)', lineHeight: 1.7 }}
                  >
                    {t('about.forestDesc') ||
                      'Japanese forest bathing practice for stress reduction and immune enhancement.'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'rgba(139,69,19,0.08)',
                    border: '1px solid rgba(139,69,19,0.3)',
                    height: '100%',
                  }}
                >
                  <Iconify
                    icon="solar:flower-bold-duotone"
                    width={48}
                    sx={{ color: BROWN, mb: 2 }}
                  />
                  <Typography variant="h5" sx={{ color: CREAM, fontWeight: 700, mb: 1 }}>
                    Boreh Bali
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(249,244,237,0.6)', lineHeight: 1.7 }}
                  >
                    {t('about.borehDesc') ||
                      'Balinese spice ritual for deep detoxification and warming therapy.'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6ServicesPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;
  const [category, setCategory] = useState('all');

  const filteredServices =
    category === 'all' ? spa6Services : spa6Services.filter((s) => s.category === category);

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
        eyebrow={t('services.eyebrow') || 'Our Rituals'}
        title={t('services.title') || 'Healing Treatments'}
        subtitle={t('services.subtitle') || 'Ancient wisdom meets modern wellness'}
        buttonText={t('services.book') || 'Book Now'}
        buttonLink="/spa6/booking"
      />

      {/* Categories */}
      <Box sx={{ py: 4, bgcolor: 'white', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Container>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Chip
              label={t('services.all') || 'All'}
              onClick={() => setCategory('all')}
              sx={{
                bgcolor: category === 'all' ? TERRACOTTA : 'transparent',
                color: category === 'all' ? CREAM : DARK,
                fontWeight: 700,
                border: '1px solid',
                borderColor: category === 'all' ? TERRACOTTA : 'rgba(0,0,0,0.12)',
                '&:hover': { bgcolor: TERRACOTTA, color: CREAM },
              }}
            />
            {spa6ServiceCategories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.title[lang]}
                onClick={() => setCategory(cat.id)}
                icon={<Iconify icon={cat.icon} width={16} />}
                sx={{
                  bgcolor: category === cat.id ? cat.color : 'transparent',
                  color: category === cat.id ? CREAM : DARK,
                  fontWeight: 700,
                  border: '1px solid',
                  borderColor: category === cat.id ? cat.color : 'rgba(0,0,0,0.12)',
                  '&:hover': { bgcolor: cat.color, color: CREAM },
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container component={MotionViewport} sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {filteredServices.map((service, idx) => (
            <Grid key={service.id} xs={12} md={6} lg={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: service.color,
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 48px rgba(0,0,0,0.12)`,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={service.image}
                      alt={service.title[lang]}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Chip
                      label={service.origin[lang]}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        bgcolor: service.color,
                        color: CREAM,
                        fontWeight: 700,
                        fontSize: 10,
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                      <Iconify icon={service.icon} width={20} sx={{ color: service.color }} />
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {service.title[lang]}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                    >
                      {service.description[lang]}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {service.duration[lang]}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: service.color, fontWeight: 800 }}
                      >
                        {service.price[lang]}
                      </Typography>
                    </Stack>
                    <Button
                      fullWidth
                      href={`/spa6/services/${service.slug}`}
                      sx={{
                        mt: 2,
                        bgcolor: service.color,
                        color: CREAM,
                        borderRadius: 2,
                        fontWeight: 700,
                        '&:hover': { bgcolor: `${service.color}CC` },
                      }}
                    >
                      {t('services.viewDetails') || 'View Details'}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6ServiceDetailsPageView() {
  const { slug } = useParams();
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  const service = spa6Services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4">{t('services.notFound') || 'Service not found'}</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: CREAM }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          bgcolor: DARK,
        }}
      >
        <Box
          component="img"
          src={service.image}
          alt={service.title[lang]}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(28,16,8,0.9) 0%, rgba(45,80,22,0.4) 100%)',
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Stack spacing={2} sx={{ maxWidth: 600 }}>
            <Chip
              label={service.origin[lang]}
              sx={{ bgcolor: service.color, color: CREAM, fontWeight: 700, width: 'fit-content' }}
            />
            <Typography variant="h2" sx={{ color: CREAM, fontWeight: 900 }}>
              {service.title[lang]}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Typography variant="body1" sx={{ color: TERRACOTTA, fontWeight: 800 }}>
                {service.duration[lang]}
              </Typography>
              <Typography variant="body1" sx={{ color: CREAM, fontWeight: 800 }}>
                {service.price[lang]}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          <Grid xs={12} md={8}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: DARK }}>
                  {t('services.about') || 'About This Treatment'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                  {service.description[lang]}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: DARK }}>
                  {t('services.benefits') || 'Benefits'}
                </Typography>
                <Grid container spacing={2}>
                  {service.benefits[lang].map((benefit: string, idx: number) => (
                    <Grid key={idx} xs={6} sm={4}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="solar:check-circle-bold" width={20} sx={{ color: FOREST }} />
                        <Typography variant="body2">{benefit}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                position: 'sticky',
                top: 100,
                border: `2px solid ${service.color}`,
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ fontWeight: 800, textAlign: 'center' }}>
                  {t('services.bookTreatment') || 'Book This Treatment'}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 900, color: service.color, textAlign: 'center' }}
                >
                  {service.price[lang]}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  {service.duration[lang]}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  href="/spa6/booking"
                  sx={{
                    bgcolor: service.color,
                    color: CREAM,
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 700,
                    '&:hover': { bgcolor: `${service.color}CC` },
                  }}
                >
                  {t('services.bookNow') || 'Book Now'}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6TrainingPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1920&q=80"
        eyebrow={t('training.eyebrow') || 'Training Programs'}
        title={t('training.title') || 'Become a Wellness Professional'}
        subtitle={
          t('training.subtitle') || 'Certified training in Ayurveda, yoga, and holistic wellness'
        }
        buttonText={t('training.apply') || 'Apply Now'}
        buttonLink="#programs"
      />

      {/* Programs */}
      <Container component={MotionViewport} id="programs" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={2} sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700 }}
          >
            {t('training.programs') || 'Our Programs'}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: DARK }}>
            {t('training.programsTitle') || 'Professional Training'}
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {spa6TrainingPrograms.map((program, idx) => (
            <Grid key={program.id} xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    transition: 'all 0.3s',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
                  }}
                >
                  <Box sx={{ height: 180, overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={program.image}
                      alt={program.title[lang]}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      {program.title[lang]}
                    </Typography>
                    <Chip
                      label={program.duration[lang]}
                      size="small"
                      sx={{ bgcolor: SAND, color: DARK, fontWeight: 700, mb: 2 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                    >
                      {program.description[lang]}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: TERRACOTTA, fontWeight: 800 }}>
                      {program.price[lang]}
                    </Typography>
                    <Button
                      fullWidth
                      sx={{
                        mt: 2,
                        bgcolor: FOREST,
                        color: CREAM,
                        borderRadius: 2,
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#234512' },
                      }}
                    >
                      {t('training.learnMore') || 'Learn More'}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Instructors */}
      <Box sx={{ bgcolor: DARK, py: { xs: 8, md: 12 } }}>
        <Container component={MotionViewport}>
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700 }}
            >
              {t('training.instructors') || 'Our Instructors'}
            </Typography>
            <Typography variant="h3" sx={{ color: CREAM, fontWeight: 800 }}>
              {t('training.instructorsTitle') || 'Expert Teachers'}
            </Typography>
          </Stack>
          <Grid container spacing={4}>
            {spa6Instructors.map((instructor) => (
              <Grid key={instructor.name} xs={12} sm={6} md={4}>
                <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={instructor.avatar}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 2,
                        border: `3px solid ${TERRACOTTA}`,
                      }}
                    />
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 800 }}>
                      {instructor.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: TERRACOTTA, fontWeight: 600, mb: 1 }}>
                      {instructor.role[lang]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.6)' }}>
                      {instructor.bio[lang]}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6BlogPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;
  const [category, setCategory] = useState('all');

  const filteredPosts =
    category === 'all' ? spa6BlogPosts : spa6BlogPosts.filter((p) => p.category === category);

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=80"
        eyebrow={t('blog.eyebrow') || 'Wellness Journal'}
        title={t('blog.title') || 'Insights & Wisdom'}
        subtitle={t('blog.subtitle') || 'Ayurvedic knowledge and natural healing practices'}
        buttonText={t('blog.read') || 'Read Articles'}
        buttonLink="#articles"
      />

      {/* Categories */}
      <Box sx={{ py: 4, bgcolor: 'white', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Container>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Chip
              label={t('blog.all') || 'All'}
              onClick={() => setCategory('all')}
              sx={{
                bgcolor: category === 'all' ? TERRACOTTA : 'transparent',
                color: category === 'all' ? CREAM : DARK,
                fontWeight: 700,
                border: '1px solid',
                borderColor: category === 'all' ? TERRACOTTA : 'rgba(0,0,0,0.12)',
              }}
            />
            {spa6BlogCategories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.label[lang]}
                onClick={() => setCategory(cat.id)}
                sx={{
                  bgcolor: category === cat.id ? FOREST : 'transparent',
                  color: category === cat.id ? CREAM : DARK,
                  fontWeight: 700,
                  border: '1px solid',
                  borderColor: category === cat.id ? FOREST : 'rgba(0,0,0,0.12)',
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      <Container id="articles" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {filteredPosts.map((post, idx) => (
            <Grid key={post.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
                }}
              >
                <Box sx={{ height: 200, overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={post.image}
                    alt={post.title[lang]}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Chip
                    label={spa6BlogCategories.find((c) => c.id === post.category)?.label[lang]}
                    size="small"
                    sx={{ bgcolor: SAND, color: DARK, fontWeight: 700, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.3 }}>
                    {post.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                  >
                    {post.excerpt[lang]}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {post.author}
                    </Typography>
                    <Typography variant="caption" sx={{ color: TERRACOTTA }}>
                      {post.date}
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    href={`/spa6/blog/${post.slug}`}
                    sx={{
                      mt: 2,
                      color: FOREST,
                      fontWeight: 700,
                      '&:hover': { bgcolor: FOREST, color: CREAM },
                    }}
                  >
                    {t('blog.readMore') || 'Read More'}
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

export function Spa6BlogDetailsPageView() {
  const { slug } = useParams();
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  const post = spa6BlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4">{t('blog.notFound') || 'Article not found'}</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: CREAM }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          bgcolor: DARK,
        }}
      >
        <Box
          component="img"
          src={post.image}
          alt={post.title[lang]}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Stack spacing={2} sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
            <Chip
              label={spa6BlogCategories.find((c) => c.id === post.category)?.label[lang]}
              sx={{ bgcolor: TERRACOTTA, color: CREAM, fontWeight: 700 }}
            />
            <Typography variant="h2" sx={{ color: CREAM, fontWeight: 900 }}>
              {post.title[lang]}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(249,244,237,0.7)' }}>
              {post.excerpt[lang]}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.5)' }}>
              {post.author} · {post.date}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 10 }, maxWidth: 800 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.9, color: 'text.secondary' }}>
          {post.excerpt[lang]}
        </Typography>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6CareersPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1920&q=80"
        eyebrow={t('careers.eyebrow') || 'Join Our Team'}
        title={t('careers.title') || 'Careers at Terra Heal'}
        subtitle={t('careers.subtitle') || 'Build your wellness career in a healing environment'}
        buttonText={t('careers.viewJobs') || 'View Openings'}
        buttonLink="#jobs"
      />

      {/* Benefits */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          {spa6CareerBenefits.map((benefit, idx) => (
            <Grid key={idx} xs={6} sm={4} md={2}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'white',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Iconify icon={benefit.icon} width={32} sx={{ color: TERRACOTTA, mb: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {benefit.text[lang]}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Jobs */}
      <Container id="jobs" sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={2} sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: TERRACOTTA, letterSpacing: 4, fontWeight: 700 }}
          >
            {t('careers.openings') || 'Open Positions'}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: DARK }}>
            {t('careers.openingsTitle') || 'Join Our Team'}
          </Typography>
        </Stack>

        <Stack spacing={3}>
          {spa6Careers.map((job) => (
            <Card
              key={job.id}
              sx={{
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'all 0.3s',
                '&:hover': { borderColor: TERRACOTTA },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {job.title[lang]}
                    </Typography>
                  </Grid>
                  <Grid xs={6} md={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon="solar:map-point-bold" width={16} sx={{ color: FOREST }} />
                      <Typography variant="body2">{job.location[lang]}</Typography>
                    </Stack>
                  </Grid>
                  <Grid xs={6} md={2}>
                    <Chip label={job.type[lang]} size="small" sx={{ bgcolor: SAND }} />
                  </Grid>
                  <Grid xs={12} md={2}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: TERRACOTTA,
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#A83A0C' },
                      }}
                    >
                      {t('careers.apply') || 'Apply'}
                    </Button>
                  </Grid>
                </Grid>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                  {job.description[lang]}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6BookingPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    concern: '',
    message: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
        eyebrow={t('booking.eyebrow') || 'Book Your Journey'}
        title={t('booking.title') || 'Schedule a Consultation'}
        subtitle={t('booking.subtitle') || 'Begin your healing journey with Terra Heal'}
        buttonText={t('booking.scroll') || 'Book Now'}
        buttonLink="#booking-form"
      />

      <Container id="booking-form" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          <Grid xs={12} md={4}>
            <Stack spacing={3}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: DARK }}>
                {t('booking.contactInfo') || 'Contact Information'}
              </Typography>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Iconify icon="solar:map-point-bold" width={24} sx={{ color: TERRACOTTA }} />
                  <Typography variant="body2">{spa6ContactInfo.address[lang]}</Typography>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Iconify icon="solar:phone-bold" width={24} sx={{ color: TERRACOTTA }} />
                  <Typography variant="body2">{spa6ContactInfo.phone}</Typography>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Iconify icon="solar:clock-circle-bold" width={24} sx={{ color: TERRACOTTA }} />
                  <Typography variant="body2">{spa6ContactInfo.hours[lang]}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid xs={12} md={8}>
            <Card sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: DARK }}>
                {t('booking.formTitle') || 'Booking Form'}
              </Typography>
              <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.name') || 'Full Name'}
                      value={formData.name}
                      onChange={handleChange('name')}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.email') || 'Email'}
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.phone') || 'Phone'}
                      value={formData.phone}
                      onChange={handleChange('phone')}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>{t('booking.service') || 'Service'}</InputLabel>
                      <Select
                        value={formData.service}
                        label={t('booking.service') || 'Service'}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        {spa6Services.map((s) => (
                          <MenuItem key={s.id} value={s.id}>
                            {s.title[lang]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t('booking.date') || 'Preferred Date'}
                      type="date"
                      value={formData.date}
                      onChange={handleChange('date')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>{t('booking.concern') || 'Health Concern'}</InputLabel>
                      <Select
                        value={formData.concern}
                        label={t('booking.concern') || 'Health Concern'}
                        onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                      >
                        <MenuItem value="">
                          {t('booking.selectConcern') || 'Select concern'}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t('booking.message') || 'Additional Notes'}
                  value={formData.message}
                  onChange={handleChange('message')}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: TERRACOTTA,
                    color: CREAM,
                    borderRadius: 3,
                    py: 1.75,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#A83A0C' },
                  }}
                >
                  {t('booking.submit') || 'Book Appointment'}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6ContactPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        eyebrow={t('contact.eyebrow') || 'Contact Us'}
        title={t('contact.title') || 'Get in Touch'}
        subtitle={t('contact.subtitle') || 'We are here to answer your questions'}
        buttonText={t('contact.call') || 'Call Now'}
        buttonLink={`tel:${spa6ContactInfo.phone}`}
      />

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 4, height: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: DARK }}>
                {t('contact.info') || 'Contact Information'}
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${TERRACOTTA}15` }}>
                    <Iconify icon="solar:map-point-bold" width={24} sx={{ color: TERRACOTTA }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {t('contact.address') || 'Address'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {spa6ContactInfo.address[lang]}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${FOREST}15` }}>
                    <Iconify icon="solar:phone-bold" width={24} sx={{ color: FOREST }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {t('contact.phone') || 'Phone'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {spa6ContactInfo.phone}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${BROWN}15` }}>
                    <Iconify icon="solar:clock-circle-bold" width={24} sx={{ color: BROWN }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {t('contact.hours') || 'Hours'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {spa6ContactInfo.hours[lang]}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 4, height: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: DARK }}>
                {t('contact.form') || 'Send a Message'}
              </Typography>
              <Stack spacing={3}>
                <TextField fullWidth label={t('contact.yourName') || 'Your Name'} />
                <TextField fullWidth label={t('contact.yourEmail') || 'Your Email'} type="email" />
                <TextField fullWidth label={t('contact.subject') || 'Subject'} />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t('contact.yourMessage') || 'Message'}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: TERRACOTTA,
                    color: CREAM,
                    borderRadius: 3,
                    py: 1.75,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#A83A0C' },
                  }}
                >
                  {t('contact.send') || 'Send Message'}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6OffersPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80"
        eyebrow={t('offers.eyebrow') || 'Special Offers'}
        title={t('offers.title') || 'Exclusive Deals'}
        subtitle={t('offers.subtitle') || 'Limited-time offers for our wellness treatments'}
        buttonText={t('offers.claim') || 'Claim Offer'}
        buttonLink="#offers"
      />

      <Container id="offers" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {spa6Offers.map((offer, idx) => (
            <Grid key={offer.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
                }}
              >
                <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <Box
                    component="img"
                    src={offer.image}
                    alt={offer.title[lang]}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Chip
                    label={t('offers.special') || 'Special'}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: TERRACOTTA,
                      color: CREAM,
                      fontWeight: 700,
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    {offer.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                  >
                    {offer.description[lang]}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: TERRACOTTA }}>
                      {offer.price[lang]}
                    </Typography>
                    {offer.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
                      >
                        {offer.originalPrice[lang]}
                      </Typography>
                    )}
                  </Stack>
                  <Button
                    fullWidth
                    sx={{
                      mt: 2,
                      bgcolor: FOREST,
                      color: CREAM,
                      borderRadius: 2,
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#234512' },
                    }}
                  >
                    {t('offers.claim') || 'Claim Offer'}
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

export function Spa6FeedbackPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1920&q=80"
        eyebrow={t('feedback.eyebrow') || 'Guest Stories'}
        title={t('feedback.title') || 'Healing Journeys'}
        subtitle={t('feedback.subtitle') || 'Real experiences from our wellness community'}
        buttonText={t('feedback.share') || 'Share Your Story'}
        buttonLink="#feedbacks"
      />

      <Container id="feedbacks" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {spa6Feedbacks.map((feedback, idx) => (
            <Grid key={feedback.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  p: 4,
                  bgcolor: 'white',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar src={feedback.avatar} sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {feedback.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {feedback.role[lang]}
                      </Typography>
                    </Box>
                  </Stack>
                  <Rating value={feedback.rating} readOnly size="small" />
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.8, fontStyle: 'italic' }}
                  >
                    &ldquo;{feedback.quote[lang]}&rdquo;
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

export function Spa6PromotionsPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
        eyebrow={t('promotions.eyebrow') || 'Promotions'}
        title={t('promotions.title') || 'Current Promotions'}
        subtitle={t('promotions.subtitle') || 'Special offers for your wellness journey'}
        buttonText={t('promotions.view') || 'View All'}
        buttonLink="#promos"
      />

      <Container id="promos" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {spa6Promotions.map((promo, idx) => (
            <Grid key={promo.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: `2px solid ${promo.color}`,
                  background: `linear-gradient(135deg, ${promo.color}08 0%, ${promo.color}03 100%)`,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Chip
                    label={promo.code}
                    sx={{ bgcolor: promo.color, color: CREAM, fontWeight: 800, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    {promo.title[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}
                  >
                    {promo.description?.[lang] || (promo as any).treatment?.[lang]}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {t('promotions.validUntil') || 'Valid until'}: {promo.validUntil}
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

export function Spa6BranchesPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=80"
        eyebrow={t('branches.eyebrow') || 'Our Locations'}
        title={t('branches.title') || 'Terra Heal Branches'}
        subtitle={t('branches.subtitle') || 'Find healing spaces across Vietnam'}
        buttonText={t('branches.find') || 'Find Location'}
        buttonLink="#branches"
      />

      <Container id="branches" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {spa6Branches.map((branch, idx) => (
            <Grid key={branch.id} xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: branch.isMain ? `2px solid ${TERRACOTTA}` : '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Box sx={{ height: 200, overflow: 'hidden' }}>
                  <Box
                    component="img"
                    src={branch.image}
                    alt={branch.name[lang]}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {branch.name[lang]}
                    </Typography>
                    {branch.isMain && (
                      <Chip
                        label={t('branches.main') || 'Main'}
                        size="small"
                        sx={{ bgcolor: TERRACOTTA, color: CREAM, fontWeight: 700 }}
                      />
                    )}
                    {branch.isRetreat && (
                      <Chip
                        label={t('branches.retreat') || 'Retreat'}
                        size="small"
                        sx={{ bgcolor: FOREST, color: CREAM, fontWeight: 700 }}
                      />
                    )}
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {branch.address[lang]}
                  </Typography>
                  <Stack direction="row" spacing={3}>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Iconify icon="solar:phone-bold" width={16} sx={{ color: TERRACOTTA }} />
                      <Typography variant="caption">{branch.phone}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Iconify icon="solar:clock-circle-bold" width={16} sx={{ color: FOREST }} />
                      <Typography variant="caption">{branch.hours[lang]}</Typography>
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

export function Spa6AccountPageView() {
  const { t } = useTranslate('spa6');

  return (
    <Box sx={{ bgcolor: CREAM, minHeight: '80vh', py: 8 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 4, borderRadius: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: TERRACOTTA }}>
              <Iconify icon="solar:user-bold" width={40} sx={{ color: CREAM }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 800, color: DARK }}>
              {t('account.login') || 'Member Login'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('account.subtitle') || 'Access your Terra account'}
            </Typography>
          </Box>
          <Stack spacing={3}>
            <TextField fullWidth label={t('account.email') || 'Email'} type="email" />
            <TextField fullWidth label={t('account.password') || 'Password'} type="password" />
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                bgcolor: TERRACOTTA,
                color: CREAM,
                borderRadius: 3,
                py: 1.75,
                fontWeight: 700,
                '&:hover': { bgcolor: '#A83A0C' },
              }}
            >
              {t('account.signIn') || 'Sign In'}
            </Button>
            <Button fullWidth sx={{ color: FOREST, fontWeight: 700 }}>
              {t('account.signUp') || 'Create Account'}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6PartnersPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1920&q=80"
        eyebrow={t('partners.eyebrow') || 'Our Partners'}
        title={t('partners.title') || 'Trusted Partnerships'}
        subtitle={t('partners.subtitle') || 'Collaborating with global wellness leaders'}
        buttonText={t('partners.connect') || 'Connect With Us'}
        buttonLink="#partners"
      />

      <Container id="partners" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {spa6Partners.map((partner) => (
            <Grid key={partner.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  border: '1px solid rgba(0,0,0,0.06)',
                  transition: 'all 0.3s',
                  '&:hover': { borderColor: TERRACOTTA },
                }}
              >
                <Avatar src={partner.logo} sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  {partner.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {partner.description[lang]}
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

export function Spa6PackagesPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1920&q=80"
        eyebrow={t('packages.eyebrow') || 'Retreat Packages'}
        title={t('packages.title') || 'Wellness Retreats'}
        subtitle={t('packages.subtitle') || 'Multi-day healing journeys for transformation'}
        buttonText={t('packages.explore') || 'Explore Retreats'}
        buttonLink="#packages"
      />

      <Container id="packages" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {spa6Packages.map((pkg, idx) => (
            <Grid key={pkg.id} xs={12} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: pkg.popular ? `2px solid ${TERRACOTTA}` : '1px solid rgba(0,0,0,0.06)',
                  position: 'relative',
                }}
              >
                {pkg.popular && (
                  <Chip
                    label={t('packages.popular') || 'Most Popular'}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: TERRACOTTA,
                      color: CREAM,
                      fontWeight: 700,
                    }}
                  />
                )}
                <Box
                  sx={{
                    height: 160,
                    background: `linear-gradient(135deg, ${pkg.color}20 0%, ${pkg.color}05 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon="solar:sun-bold-duotone" width={64} sx={{ color: pkg.color }} />
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    {pkg.name[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: pkg.color, fontWeight: 700, mb: 2 }}>
                    {pkg.duration[lang]}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}
                  >
                    {pkg.description[lang]}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    {pkg.includes[lang].map((item: string, i: number) => (
                      <Stack
                        key={i}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 0.5 }}
                      >
                        <Iconify icon="solar:check-circle-bold" width={16} sx={{ color: FOREST }} />
                        <Typography variant="caption">{item}</Typography>
                      </Stack>
                    ))}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: pkg.color, mb: 2 }}>
                    {pkg.price[lang]}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: pkg.color,
                      color: CREAM,
                      borderRadius: 2,
                      fontWeight: 700,
                      '&:hover': { bgcolor: `${pkg.color}CC` },
                    }}
                  >
                    {t('packages.book') || 'Book Retreat'}
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

export function Spa6BeforeAfterPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        eyebrow={t('beforeAfter.eyebrow') || 'Results'}
        title={t('beforeAfter.title') || 'Transformation Stories'}
        subtitle={t('beforeAfter.subtitle') || 'Real healing journeys from our guests'}
        buttonText={t('beforeAfter.view') || 'View Results'}
        buttonLink="#results"
      />

      <Container id="results" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {spa6BeforeAfters.map((item, idx) => (
            <Grid key={item.id} xs={12} md={4}>
              <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <Box sx={{ height: 400, position: 'relative' }}>
                  <Box
                    component="img"
                    src={item.afterImage}
                    alt={item.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(28,16,8,0.9) 0%, transparent 100%)',
                      p: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: CREAM, fontWeight: 800 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(249,244,237,0.7)' }}>
                      {item.concern[lang]}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.treatment[lang]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: FOREST, fontWeight: 600 }}>
                    {item.result[lang]}
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

export function Spa6FaqPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;
  const [category, setCategory] = useState('dosha');

  const filteredFaqs = spa6Faqs.filter((f) => f.category === category);

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=80"
        eyebrow={t('faq.eyebrow') || 'FAQ'}
        title={t('faq.title') || 'Common Questions'}
        subtitle={t('faq.subtitle') || 'Answers about Ayurveda and our treatments'}
        buttonText={t('faq.browse') || 'Browse FAQ'}
        buttonLink="#faq"
      />

      <Container id="faq" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6}>
          <Grid xs={12} md={3}>
            <Stack spacing={1}>
              {spa6FaqCategories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  sx={{
                    justifyContent: 'flex-start',
                    bgcolor: category === cat.id ? TERRACOTTA : 'transparent',
                    color: category === cat.id ? CREAM : DARK,
                    fontWeight: 700,
                    borderRadius: 2,
                    '&:hover': { bgcolor: TERRACOTTA, color: CREAM },
                  }}
                >
                  {cat.label[lang]}
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid xs={12} md={9}>
            <Stack spacing={2}>
              {filteredFaqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.06)',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { borderColor: TERRACOTTA },
                  }}
                >
                  <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {faq.question[lang]}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {faq.answer[lang]}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6PolicyPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
        eyebrow={t('policy.eyebrow') || 'Policies'}
        title={t('policy.title') || 'Our Policies'}
        subtitle={t('policy.subtitle') || 'Important information for your visit'}
        buttonText={t('policy.read') || 'Read Policies'}
        buttonLink="#policies"
      />

      <Container id="policies" sx={{ py: { xs: 8, md: 12 } }}>
        <Stack spacing={4}>
          {spa6Policies.map((policy) => (
            <Card key={policy.id} sx={{ borderRadius: 4, p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: TERRACOTTA }}>
                {policy.title[lang]}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                {policy.content[lang]}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa6GalleryPageView() {
  const { t, currentLang } = useTranslate('spa6');
  const lang = currentLang.value as Spa6Lang;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Box sx={{ bgcolor: CREAM }}>
      <Spa6PageHero
        image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
        eyebrow={t('gallery.eyebrow') || 'Gallery'}
        title={t('gallery.title') || 'Our Spaces'}
        subtitle={t('gallery.subtitle') || 'Explore Terra Heal healing environments'}
        buttonText={t('gallery.view') || 'View Gallery'}
        buttonLink="#gallery"
      />

      <Container id="gallery" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={2}>
          {spa6Gallery.map((image) => (
            <Grid key={image.id} xs={6} md={3}>
              <Box
                onClick={() => setSelectedImage(image.src)}
                sx={{
                  position: 'relative',
                  paddingTop: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              >
                <Box
                  component="img"
                  src={image.src}
                  alt={image.alt[lang]}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(28,16,8,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Iconify icon="solar:magnifer-zoom-in-bold" width={32} sx={{ color: CREAM }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="lg">
        <DialogContent sx={{ p: 0 }}>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt=""
              sx={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
