import React from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Chip,
  Paper,
  Stack,
  alpha,
  Button,
  Avatar,
  Rating,
  Divider,
  Container,
  CardMedia,
  TextField,
  Accordion,
  Typography,
  CardContent,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import {
  getLang,
  formatVND,
  FRESH_LEAF,
  SPA13_FAQS,
  DEEP_FOREST,
  SPA13_BLOGS,
  JUNGLE_GREEN,
  AMAZON_FLAME,
  SPA13_OFFERS,
  TROPICAL_GOLD,
  SPA13_CAREERS,
  SPA13_GALLERY,
  SPA13_SERVICES,
  SPA13_TRAINING,
  SPA13_BRANCHES,
  SPA13_PACKAGES,
  SPA13_PARTNERS,
  SPA13_FEEDBACKS,
  SPA13_PROMOTIONS,
  SPA13_BEFORE_AFTER,
} from './spa13-pages-data';

// Helper component for hero sections
const PageHero: React.FC<{
  title: string;
  desc: string;
  image?: string;
  overlay?: boolean;
}> = ({ title, desc, image, overlay = true }) => (
  <Box
    sx={{
      position: 'relative',
      height: { xs: 300, md: 400 },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: image
        ? `url(${image})`
        : `linear-gradient(135deg, ${JUNGLE_GREEN} 0%, ${DEEP_FOREST} 100%)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      mb: 6,
    }}
  >
    {overlay && (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: alpha(DEEP_FOREST, 0.7),
        }}
      />
    )}
    <Container sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ color: alpha('#fff', 0.9), maxWidth: 600, mx: 'auto' }}>
        {desc}
      </Typography>
    </Container>
  </Box>
);

// About Page
export function Spa13AboutView() {
  const { t } = useTranslate('spa13');
  const stats = [
    { value: '8+', label: t('about.stats1') },
    { value: '12K+', label: t('about.stats2') },
    { value: '15+', label: t('about.stats3') },
    { value: '50K+', label: t('about.stats4') },
  ];

  const values = [
    {
      icon: 'solar:leaf-bold-duotone',
      title: t('about.values1Title'),
      desc: t('about.values1Desc'),
    },
    {
      icon: 'solar:heart-bold-duotone',
      title: t('about.values2Title'),
      desc: t('about.values2Desc'),
    },
    {
      icon: 'solar:test-tube-bold-duotone',
      title: t('about.values3Title'),
      desc: t('about.values3Desc'),
    },
  ];

  return (
    <Box>
      <PageHero title={t('about.heroTitle')} desc={t('about.heroDesc')} />

      <Container>
        {/* Story Section */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
              alt="Amazon rainforest"
              sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <Typography variant="h3" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 3 }}>
              {t('about.storyTitle')}
            </Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: 18 }}>
              {t('about.storyDesc')}
            </Typography>
          </Grid>
        </Grid>

        {/* Values */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 6 }}>
            Giá trị cốt lõi
          </Typography>
          <Grid container spacing={4}>
            {values.map((v, i) => (
              <Grid key={i} xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    bgcolor: FRESH_LEAF,
                    height: '100%',
                  }}
                >
                  <Iconify icon={v.icon} width={48} sx={{ color: JUNGLE_GREEN, mb: 2 }} />
                  <Typography variant="h6" sx={{ color: JUNGLE_GREEN, fontWeight: 600, mb: 1 }}>
                    {v.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{v.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mission */}
        <Box
          sx={{
            bgcolor: JUNGLE_GREEN,
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography variant="h4" sx={{ color: TROPICAL_GOLD, fontWeight: 700, mb: 2 }}>
            {t('about.missionTitle')}
          </Typography>
          <Typography sx={{ color: 'white', fontSize: 18, maxWidth: 800, mx: 'auto' }}>
            {t('about.missionDesc')}
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {stats.map((s, i) => (
            <Grid key={i} xs={6} md={3}>
              <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h2" sx={{ color: AMAZON_FLAME, fontWeight: 700 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{s.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Team */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 3 }}>
            {t('about.teamTitle')}
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            {t('about.teamDesc')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// Services Page
export function Spa13ServicesView() {
  const { t, currentLang } = useTranslate('spa13');
  const [filter, setFilter] = React.useState('all');

  const filters = [
    { key: 'all', label: t('services.filterAll') },
    { key: 'signature', label: t('services.filterSignature') },
    { key: 'Body', label: t('services.filterBody') },
    { key: 'Face', label: t('services.filterFace') },
    { key: 'Retreat', label: t('services.filterRetreat') },
  ];

  const filtered =
    filter === 'all'
      ? SPA13_SERVICES
      : filter === 'signature'
        ? SPA13_SERVICES.filter((s) => s.isSignature)
        : SPA13_SERVICES.filter((s) => s.category === (filter as any));

  return (
    <Box>
      <PageHero title={t('services.heroTitle')} desc={t('services.heroDesc')} />

      <Container>
        {/* Filters */}
        <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
          {filters.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              onClick={() => setFilter(f.key)}
              sx={{
                bgcolor: filter === f.key ? JUNGLE_GREEN : 'grey.100',
                color: filter === f.key ? 'white' : 'text.primary',
                fontWeight: 600,
                '&:hover': { bgcolor: filter === f.key ? JUNGLE_GREEN : 'grey.200' },
              }}
            />
          ))}
        </Stack>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {filtered.map((service) => (
            <Grid key={service.id} xs={12} md={6} lg={4}>
              <RouterLink href={`/spa13/services/${service.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: 8 },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={getLang(service.name, currentLang.value)}
                  />
                  <CardContent>
                    {service.isSignature && (
                      <Chip
                        label="Signature"
                        size="small"
                        sx={{ bgcolor: TROPICAL_GOLD, color: 'white', mb: 1 }}
                      />
                    )}
                    <Typography variant="h6" sx={{ color: JUNGLE_GREEN, fontWeight: 600 }}>
                      {getLang(service.name, currentLang.value)}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: 14,
                        mt: 1,
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {getLang(service.description, currentLang.value)}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {service.duration} {t('serviceDetails.duration')}
                      </Typography>
                      <Typography variant="h6" sx={{ color: AMAZON_FLAME, fontWeight: 700 }}>
                        {formatVND(service.price)}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </RouterLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Service Details Page
export function Spa13ServiceDetailsView() {
  const { serviceId } = useParams();
  const { t, currentLang } = useTranslate('spa13');
  const service = SPA13_SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Service not found</Typography>
        <Button href="/spa13/services" sx={{ mt: 2 }}>
          {t('serviceDetails.backBtn')}
        </Button>
      </Container>
    );
  }

  return (
    <Box>
      <PageHero title={getLang(service.name, currentLang.value)} desc="" image={service.image} />

      <Container>
        <Button
          href="/spa13/services"
          startIcon={<Iconify icon="solar:arrow-left-linear" />}
          sx={{ mb: 4, color: JUNGLE_GREEN }}
        >
          {t('serviceDetails.backBtn')}
        </Button>

        <Grid container spacing={6}>
          <Grid xs={12} md={6}>
            <Box
              component="img"
              src={service.image}
              alt={getLang(service.name, currentLang.value)}
              sx={{ width: '100%', borderRadius: 3 }}
            />
          </Grid>
          <Grid xs={12} md={6}>
            {service.isSignature && (
              <Chip label="Signature" sx={{ bgcolor: TROPICAL_GOLD, color: 'white', mb: 2 }} />
            )}
            <Typography variant="h3" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 2 }}>
              {getLang(service.name, currentLang.value)}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
              {getLang(service.description, currentLang.value)}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Duration
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {service.duration} {t('serviceDetails.duration')}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Category
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {getLang(service.category, currentLang.value)}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="h5" sx={{ color: AMAZON_FLAME, fontWeight: 700, mb: 3 }}>
              {formatVND(service.price)}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: JUNGLE_GREEN, fontWeight: 600, mb: 2 }}>
              {t('serviceDetails.benefits')}
            </Typography>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {(
                service.benefits[currentLang as unknown as keyof typeof service.benefits] ||
                service.benefits.en
              ).map((b: string, i: number) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Iconify icon="solar:check-circle-bold" sx={{ color: JUNGLE_GREEN }} />
                  <Typography>{b}</Typography>
                </Stack>
              ))}
            </Stack>

            <Button
              variant="contained"
              size="large"
              href="/spa13/booking"
              sx={{
                bgcolor: JUNGLE_GREEN,
                '&:hover': { bgcolor: DEEP_FOREST },
                px: 4,
              }}
            >
              {t('serviceDetails.bookNow')}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Training Page
export function Spa13TrainingView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('training.heroTitle')} desc={t('training.heroDesc')} />

      <Container>
        <Typography variant="h4" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 4 }}>
          {t('training.programsTitle')}
        </Typography>
        <Grid container spacing={4}>
          {SPA13_TRAINING.map((prog) => (
            <Grid key={prog.id} xs={12} md={4}>
              <Card sx={{ borderRadius: 3, height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={prog.image}
                  alt={getLang(prog.name, currentLang.value)}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: JUNGLE_GREEN, fontWeight: 600, mb: 1 }}>
                    {getLang(prog.name, currentLang.value)}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                    {getLang(prog.duration, currentLang.value)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: AMAZON_FLAME, fontWeight: 700, mb: 2 }}>
                    {formatVND(prog.price)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: JUNGLE_GREEN, '&:hover': { bgcolor: DEEP_FOREST } }}
                  >
                    {t('training.enroll')}
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

// Blog Page
export function Spa13BlogView() {
  const { t, currentLang } = useTranslate('spa13');
  const [category, setCategory] = React.useState('all');

  const categories = [
    { key: 'all', label: t('blog.categoriesAll') },
    { key: 'Tips', label: t('blog.categoriesTips') },
    { key: 'Stories', label: t('blog.categoriesStories') },
    { key: 'News', label: t('blog.categoriesNews') },
  ];

  const filtered =
    category === 'all'
      ? SPA13_BLOGS
      : SPA13_BLOGS.filter((b) => getLang(b.category, currentLang.value) === category);

  return (
    <Box>
      <PageHero title={t('blog.heroTitle')} desc={t('blog.heroDesc')} />

      <Container>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          {categories.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              onClick={() => setCategory(c.key)}
              sx={{
                bgcolor: category === c.key ? JUNGLE_GREEN : 'grey.100',
                color: category === c.key ? 'white' : 'text.primary',
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={4}>
          {filtered.map((post) => (
            <Grid key={post.id} xs={12} md={4}>
              <RouterLink href={`/spa13/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    textDecoration: 'none',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-8px)' },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={getLang(post.title, currentLang.value)}
                  />
                  <CardContent>
                    <Chip
                      label={getLang(post.category, currentLang.value)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h6" sx={{ color: JUNGLE_GREEN, mb: 1 }}>
                      {getLang(post.title, currentLang.value)}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: 14,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {getLang(post.excerpt, currentLang.value)}
                    </Typography>
                  </CardContent>
                </Card>
              </RouterLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Blog Details Page
export function Spa13BlogDetailsView() {
  const { t, currentLang } = useTranslate('spa13');
  const { blogId } = useParams();
  const blog = SPA13_BLOGS.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Blog not found</Typography>
        <Button href="/spa13/blog" sx={{ mt: 2 }}>
          {t('blogDetails.backBtn')}
        </Button>
      </Container>
    );
  }

  return (
    <Box>
      <Container sx={{ py: 6 }}>
        <Button
          href="/spa13/blog"
          startIcon={<Iconify icon="solar:arrow-left-linear" />}
          sx={{ mb: 4, color: JUNGLE_GREEN }}
        >
          {t('blogDetails.backBtn')}
        </Button>

        <Box
          component="img"
          src={blog.image}
          alt={getLang(blog.title, currentLang.value)}
          sx={{ width: '100%', borderRadius: 3, mb: 4 }}
        />

        <Chip label={getLang(blog.category, currentLang.value)} sx={{ mb: 2 }} />
        <Typography variant="h3" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 2 }}>
          {getLang(blog.title, currentLang.value)}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>{blog.date}</Typography>
        <Typography sx={{ lineHeight: 1.8 }}>{getLang(blog.excerpt, currentLang.value)}</Typography>
      </Container>
    </Box>
  );
}

// Careers Page
export function Spa13CareersView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('careers.heroTitle')} desc={t('careers.heroDesc')} />

      <Container>
        <Typography variant="h4" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 4 }}>
          {t('careers.openPositions')}
        </Typography>
        <Grid container spacing={4}>
          {SPA13_CAREERS.map((job) => (
            <Grid key={job.id} xs={12} md={4}>
              <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" sx={{ color: JUNGLE_GREEN, fontWeight: 600, mb: 2 }}>
                  {getLang(job.title, currentLang.value)}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Chip label={getLang(job.location, currentLang.value)} size="small" />
                  <Chip
                    label={getLang(job.type, currentLang.value)}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Button variant="contained" sx={{ bgcolor: JUNGLE_GREEN }}>
                  {t('careers.apply')}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Booking Page
export function Spa13BookingView() {
  const { t, currentLang } = useTranslate('spa13');
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    treatment: '',
    notes: '',
  });

  return (
    <Box>
      <PageHero title={t('bookingPage.heroTitle')} desc={t('bookingPage.heroDesc')} />

      <Container>
        <Grid container spacing={6}>
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ color: JUNGLE_GREEN, fontWeight: 600, mb: 3 }}>
                {t('bookingPage.summaryTitle')}
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('bookingPage.formName')}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('bookingPage.formEmail')}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('bookingPage.formPhone')}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label={t('bookingPage.formDate')}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label={t('bookingPage.formTreatment')}
                    value={form.treatment}
                    onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                    SelectProps={{ native: true }}
                  >
                    <option value="">-- Select --</option>
                    {SPA13_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {getLang(s.name, currentLang.value)}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="time"
                    label={t('bookingPage.formTime')}
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={t('bookingPage.formNotes')}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 3, bgcolor: FRESH_LEAF }}>
              <Typography variant="h6" sx={{ color: JUNGLE_GREEN, mb: 3 }}>
                {t('bookingPage.ecoNote')}
              </Typography>
              <Button fullWidth variant="contained" sx={{ bgcolor: JUNGLE_GREEN, py: 1.5 }}>
                {t('bookingPage.confirm')}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Contact Page
export function Spa13ContactView() {
  const { t } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('contact.heroTitle')} desc={t('contact.heroDesc')} />

      <Container>
        <Grid container spacing={6}>
          <Grid xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ color: JUNGLE_GREEN, fontWeight: 600, mb: 3 }}>
                {t('contact.formSubmit')}
              </Typography>
              <Stack spacing={3}>
                <TextField fullWidth label={t('contact.formName')} />
                <TextField fullWidth label={t('contact.formEmail')} />
                <TextField fullWidth label={t('contact.formSubject')} />
                <TextField fullWidth multiline rows={4} label={t('contact.formMessage')} />
                <Button variant="contained" sx={{ bgcolor: JUNGLE_GREEN, py: 1.5 }}>
                  {t('contact.formSubmit')}
                </Button>
              </Stack>
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper sx={{ p: 4, borderRadius: 3, height: '100%' }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {t('contact.infoAddress')}
                  </Typography>
                  <Typography>26 Nguyễn Văn Hưởng, Thảo Điền, TP.HCM</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {t('contact.infoPhone')}
                  </Typography>
                  <Typography>+84 28 1234 5678</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {t('contact.infoEmail')}
                  </Typography>
                  <Typography>contact@spa13.com</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {t('contact.infoHours')}
                  </Typography>
                  <Typography>9:00 AM - 9:00 PM</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Offers Page
export function Spa13OffersView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('offers.heroTitle')} desc={t('offers.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          {SPA13_OFFERS.map((offer) => (
            <Grid key={offer.id} xs={12} md={6}>
              <Card sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={offer.image}
                  alt={getLang(offer.title, currentLang.value)}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: AMAZON_FLAME,
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {offer.discount} OFF
                  </Typography>
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ color: JUNGLE_GREEN, mb: 1 }}>
                    {getLang(offer.title, currentLang.value)}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                    {getLang(offer.description, currentLang.value)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {t('offers.validUntil')}: {offer.validUntil}
                  </Typography>
                  <Button variant="contained" sx={{ bgcolor: JUNGLE_GREEN }}>
                    {t('offers.claim')}
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

// Feedback Page
export function Spa13FeedbackView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('feedback.heroTitle')} desc={t('feedback.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          {SPA13_FEEDBACKS.map((fb) => (
            <Grid key={fb.id} xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <Avatar>{fb.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{fb.name}</Typography>
                    <Rating value={fb.rating} readOnly size="small" />
                  </Box>
                </Stack>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                  {getLang(fb.comment, currentLang.value)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {fb.date}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Promotions Page
export function Spa13PromotionsView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('promotions.heroTitle')} desc={t('promotions.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          {SPA13_PROMOTIONS.map((promo) => (
            <Grid key={promo.id} xs={12} md={6}>
              <Card sx={{ borderRadius: 3, bgcolor: FRESH_LEAF }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ color: JUNGLE_GREEN, mb: 1 }}>
                    {getLang(promo.title, currentLang.value)}
                  </Typography>
                  <Typography variant="h4" sx={{ color: AMAZON_FLAME, fontWeight: 700, mb: 2 }}>
                    Code: {promo.code}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {t('promotions.validTo')}: {promo.validUntil}
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: JUNGLE_GREEN, color: JUNGLE_GREEN }}
                  >
                    {t('promotions.terms')}
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

// Branches Page
export function Spa13BranchesView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('branches.heroTitle')} desc={t('branches.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          {SPA13_BRANCHES.map((branch) => (
            <Grid key={branch.id} xs={12} md={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={branch.image}
                  alt={getLang(branch.name, currentLang.value)}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: JUNGLE_GREEN, fontWeight: 600, mb: 1 }}>
                    {getLang(branch.name, currentLang.value)}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 1 }}>
                    {getLang(branch.address, currentLang.value)}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
                    {branch.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('branches.hours')}: {getLang(branch.hours, currentLang.value)}
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

// Account Page
export function Spa13AccountView() {
  const { t } = useTranslate('spa13');
  return (
    <Box>
      <PageHero title={t('account.heroTitle')} desc={t('account.heroDesc')} />

      <Container>
        <Grid container spacing={6}>
          <Grid xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: JUNGLE_GREEN }}>
                U
              </Avatar>
              <Typography variant="h6">User Name</Typography>
              <Typography sx={{ color: 'text.secondary' }}>user@email.com</Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: JUNGLE_GREEN, mb: 3 }}>
                {t('account.profileTitle')}
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField fullWidth label={t('account.profileName')} />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField fullWidth label={t('account.profileEmail')} />
                </Grid>
                <Grid xs={12}>
                  <TextField fullWidth label={t('account.profilePhone')} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Partners Page
export function Spa13PartnersView() {
  const { t } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('partners.heroTitle')} desc={t('partners.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          {SPA13_PARTNERS.map((partner) => (
            <Grid key={partner.id} xs={6} md={3}>
              <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h6" sx={{ color: JUNGLE_GREEN }}>
                  {partner.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button variant="contained" sx={{ bgcolor: JUNGLE_GREEN, px: 4 }}>
            {t('partners.become')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// Packages Page
export function Spa13PackagesView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('packages.heroTitle')} desc={t('packages.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          {SPA13_PACKAGES.map((pkg) => (
            <Grid key={pkg.id} xs={12} md={4}>
              <Card sx={{ borderRadius: 3, height: '100%', bgcolor: FRESH_LEAF }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ color: JUNGLE_GREEN, fontWeight: 700, mb: 2 }}>
                    {getLang(pkg.name, currentLang.value)}
                  </Typography>
                  <Typography variant="h2" sx={{ color: AMAZON_FLAME, fontWeight: 700 }}>
                    {pkg.sessions}
                    <Typography component="span" variant="body1" sx={{ color: 'text.secondary' }}>
                      {t('packages.perSession')}
                    </Typography>
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, my: 2 }}>
                    {formatVND(pkg.price)}
                  </Typography>
                  <Typography sx={{ color: JUNGLE_GREEN, mb: 3 }}>
                    Save {formatVND(pkg.savings)}
                  </Typography>
                  <Button variant="contained" sx={{ bgcolor: JUNGLE_GREEN }} fullWidth>
                    {t('packages.buyNow')}
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

// Before/After Page
export function Spa13BeforeAfterView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('beforeAfter.heroTitle')} desc={t('beforeAfter.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          {SPA13_BEFORE_AFTER.map((item) => (
            <Grid key={item.id} xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ color: JUNGLE_GREEN, mb: 3 }}>
                  {getLang(item.treatment, currentLang.value)}
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={6}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {t('beforeAfter.resultsBefore')}
                    </Typography>
                    <Box
                      component="img"
                      src={item.beforeImage}
                      alt="Before"
                      sx={{ width: '100%', borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid xs={6}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      {t('beforeAfter.resultsAfter')}
                    </Typography>
                    <Box
                      component="img"
                      src={item.afterImage}
                      alt="After"
                      sx={{ width: '100%', borderRadius: 2 }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// FAQ Page
export function Spa13FaqView() {
  const { t, currentLang } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('faq.heroTitle')} desc={t('faq.heroDesc')} />

      <Container sx={{ mb: 8 }}>
        {SPA13_FAQS.map((faq) => (
          <Accordion key={faq.id} sx={{ mb: 2, borderRadius: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-linear" />}>
              <Typography sx={{ fontWeight: 600, color: JUNGLE_GREEN }}>
                {getLang(faq.question, currentLang.value)}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                {getLang(faq.answer, currentLang.value)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>{t('faq.stillQuestion')}</Typography>
          <Button variant="contained" href="/spa13/contact" sx={{ bgcolor: JUNGLE_GREEN }}>
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// Policy Page
export function Spa13PolicyView() {
  const { t } = useTranslate('spa13');

  return (
    <Box>
      <PageHero title={t('policy.heroTitle')} desc={t('policy.heroDesc')} />

      <Container>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Stack spacing={2}>
              <Button variant="outlined" sx={{ borderColor: JUNGLE_GREEN, color: JUNGLE_GREEN }}>
                {t('policy.sectionsPrivacy')}
              </Button>
              <Button variant="outlined" sx={{ borderColor: JUNGLE_GREEN, color: JUNGLE_GREEN }}>
                {t('policy.sectionsTerms')}
              </Button>
              <Button variant="outlined" sx={{ borderColor: JUNGLE_GREEN, color: JUNGLE_GREEN }}>
                {t('policy.sectionsRefund')}
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ color: JUNGLE_GREEN, mb: 3 }}>
                {t('policy.sectionsPrivacy')}
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                At Spa 13, we are committed to protecting your privacy. We collect only the
                information necessary to provide our services and never share your data with third
                parties without your consent.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Gallery Page
export function Spa13GalleryView() {
  const { t } = useTranslate('spa13');
  const [category, setCategory] = React.useState('all');

  const categories = [
    { key: 'all', label: t('gallery.categoriesAll') },
    { key: 'spa', label: t('gallery.categoriesSpa') },
    { key: 'treatments', label: t('gallery.categoriesTreatments') },
    { key: 'nature', label: t('gallery.categoriesNature') },
  ];

  const filtered =
    category === 'all' ? SPA13_GALLERY : SPA13_GALLERY.filter((g) => g.category === category);

  return (
    <Box>
      <PageHero title={t('gallery.heroTitle')} desc={t('gallery.heroDesc')} />

      <Container>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          {categories.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              onClick={() => setCategory(c.key)}
              sx={{
                bgcolor: category === c.key ? JUNGLE_GREEN : 'grey.100',
                color: category === c.key ? 'white' : 'text.primary',
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {filtered.map((img) => (
            <Grid key={img.id} xs={12} sm={6} md={4}>
              <Box
                component="img"
                src={img.src}
                alt={`Gallery ${img.id}`}
                sx={{
                  width: '100%',
                  height: 250,
                  objectFit: 'cover',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Home Page (existing)
export { Spa13View } from './view';
