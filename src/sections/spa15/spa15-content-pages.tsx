import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import InputAdornment from '@mui/material/InputAdornment';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import { SUMI, WASHI, MATSU, SAKURA, INDIGO, KINPAKU } from './spa15-data';
import {
  getLang,
  spa15Faqs,
  formatVND,
  spa15Offers,
  spa15Careers,
  spa15Gallery,
  spa15Branches,
  spa15Policies,
  spa15Services,
  spa15Packages,
  spa15Partners,
  spa15BlogPosts,
  spa15Feedbacks,
  spa15Promotions,
  spa15AboutStory,
  spa15ContactInfo,
  SPA15_PAGE_IMAGES,
  spa15BeforeAfters,
  spa15VisionMission,
  spa15Certifications,
  spa15BlogCategories,
  spa15BookingPackages,
  spa15TrainingPrograms,
  spa15ServiceCategories,
} from './spa15-pages-data';

// ----------------------------------------------------------------------
// SHARED BUILDING BLOCKS – Japanese Onsen Ryokan theme (wabi-sabi minimalist)
// Dark SUMI background, SAKURA pink, KINPAKU gold, WASHI cream accents
// ----------------------------------------------------------------------

function Spa15PageHero({
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
        bgcolor: SUMI,
        pt: { xs: 10, md: 14 },
        pb: { xs: 12, md: 16 },
        overflow: 'hidden',
      }}
    >
      {/* Background image with overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35) saturate(1.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${SUMI}ee 0%, ${SUMI}88 50%, ${SUMI}ee 100%)`,
        }}
      />

      {/* Vertical kanji */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 16, md: 48 },
          top: '20%',
          writingMode: 'vertical-rl',
          color: `${KINPAKU}33`,
          fontSize: { xs: 32, md: 64 },
          fontWeight: 300,
          letterSpacing: 8,
          zIndex: 1,
        }}
      >
        桜温泉
      </Box>

      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={7}>
            <Stack spacing={2.5}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{ width: 40, height: '1px', bgcolor: KINPAKU }} />
                <Typography
                  variant="overline"
                  sx={{ color: KINPAKU, letterSpacing: 4, fontWeight: 600, fontSize: 11 }}
                >
                  {eyebrow}
                </Typography>
              </Stack>
              <Typography
                variant="h1"
                sx={{
                  color: WASHI,
                  fontWeight: 300,
                  lineHeight: 1.1,
                  fontFamily: '"Cormorant Garamond","Times New Roman",serif',
                  letterSpacing: -1,
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{ color: `${WASHI}99`, fontSize: 18, lineHeight: 1.8, maxWidth: 560 }}
              >
                {subtitle}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                <Button
                  component={RouterLink}
                  href={paths.spa15.booking}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 0,
                    bgcolor: SAKURA,
                    color: SUMI,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#d98aab' },
                  }}
                  startIcon={<Iconify icon="solar:bath-bold-duotone" />}
                >
                  Đặt lịch ngay
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.spa15.contact}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 0,
                    color: KINPAKU,
                    border: `1px solid ${KINPAKU}55`,
                    '&:hover': { borderColor: KINPAKU, bgcolor: `${KINPAKU}0d` },
                  }}
                >
                  Liên hệ tư vấn
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: '4px',
                overflow: 'hidden',
                border: `1px solid ${KINPAKU}33`,
                boxShadow: `0 20px 60px ${SUMI}cc`,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Spa15SectionTitle({
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
      spacing={1.5}
      sx={{
        mb: 6,
        textAlign: align,
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      <Typography variant="overline" sx={{ color: SAKURA, letterSpacing: 4, fontWeight: 600 }}>
        {eyebrow}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          color: WASHI,
          fontWeight: 400,
          fontFamily: '"Cormorant Garamond","Times New Roman",serif',
        }}
      >
        {title}
      </Typography>
      {subtitle && <Typography sx={{ maxWidth: 720, color: `${WASHI}88` }}>{subtitle}</Typography>}
    </Stack>
  );
}

function Spa15SoftCard({ children, sx }: { children: React.ReactNode; sx?: object }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: '4px',
        bgcolor: `${SUMI}ee`,
        border: `1px solid ${KINPAKU}22`,
        boxShadow: `0 8px 32px ${SUMI}88`,
        height: '100%',
        transition: 'all .3s',
        '&:hover': {
          borderColor: `${KINPAKU}44`,
          boxShadow: `0 16px 48px ${SUMI}cc`,
        },
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function Spa15Cta() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SUMI }}>
      <Container>
        <Box
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '4px',
            color: WASHI,
            background: `linear-gradient(135deg, ${MATSU} 0%, ${SUMI} 100%)`,
            border: `1px solid ${KINPAKU}33`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 220,
              height: 220,
              borderRadius: '50%',
              bgcolor: `${SAKURA}11`,
            }}
          />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            sx={{ position: 'relative' }}
          >
            <Stack spacing={1}>
              <Typography
                variant="h3"
                sx={{ fontFamily: '"Cormorant Garamond","Times New Roman",serif' }}
              >
                Sẵn sàng cho trải nghiệm Onsen?
              </Typography>
              <Typography sx={{ color: `${WASHI}aa` }}>
                Đặt lịch ngay hôm nay – tặng kèm trà đạo matcha & ngâm onsen riêng.
              </Typography>
            </Stack>
            <Button
              component={RouterLink}
              href={paths.spa15.booking}
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 0,
                bgcolor: SAKURA,
                color: SUMI,
                fontWeight: 700,
                '&:hover': { bgcolor: '#d98aab' },
              }}
            >
              Đặt lịch ngay
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function Spa15PageShell({ children }: { children: React.ReactNode }) {
  return <Box sx={{ bgcolor: SUMI }}>{children}</Box>;
}

// ======================================================================
// 1. ABOUT
// ======================================================================
export function Spa15AboutView() {
  const { t, currentLang } = useTranslate('spa15');
  const story = getLang(spa15AboutStory, currentLang.value);

  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.about}
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />

      {/* Story */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: `1px solid ${KINPAKU}33`,
                  boxShadow: `0 20px 60px ${SUMI}cc`,
                  backgroundImage: `url(${SPA15_PAGE_IMAGES.about})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Spa15SectionTitle
                eyebrow={t('about.storyEyebrow')}
                title={t('about.storyTitle')}
                align="left"
              />
              <Typography sx={{ color: `${WASHI}88`, lineHeight: 1.9 }}>{story}</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Vision & Mission */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: `${SUMI}ee` }}>
        <Container>
          <Spa15SectionTitle eyebrow={t('about.visionEyebrow')} title={t('about.visionTitle')} />
          <Grid container spacing={3}>
            {spa15VisionMission.map((v) => (
              <Grid key={v.title.en} xs={12} md={6}>
                <Spa15SoftCard sx={{ textAlign: 'center', py: 5 }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 2.5,
                      borderRadius: '50%',
                      bgcolor: `${SAKURA}22`,
                      border: `1px solid ${SAKURA}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={v.icon} width={36} sx={{ color: SAKURA }} />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ color: KINPAKU, mb: 1.5, fontFamily: '"Cormorant Garamond",serif' }}
                  >
                    {getLang(v.title, currentLang.value)}
                  </Typography>
                  <Typography sx={{ color: `${WASHI}99`, maxWidth: 420, mx: 'auto' }}>
                    {getLang(v.desc, currentLang.value)}
                  </Typography>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Certifications */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa15SectionTitle eyebrow={t('about.certEyebrow')} title={t('about.certTitle')} />
          <Grid container spacing={3}>
            {spa15Certifications.map((c) => (
              <Grid key={c.name} xs={12} sm={6} md={3}>
                <Spa15SoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={c.icon} width={48} sx={{ color: KINPAKU, mb: 2 }} />
                  <Typography variant="subtitle1" sx={{ color: WASHI, mb: 0.5 }}>
                    {c.name}
                  </Typography>
                  <Chip
                    label={c.year}
                    size="small"
                    sx={{ mt: 1.5, bgcolor: `${SAKURA}22`, color: SAKURA }}
                  />
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 2. SERVICES
// ======================================================================
export function Spa15ServicesView() {
  const { t, currentLang } = useTranslate('spa15');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let list = spa15Services.filter((s) =>
      getLang(s.name, currentLang.value).toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'all') {
      list = list.filter((s) => s.category === category);
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, category, sort, currentLang]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.services}
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Filters */}
          <Spa15SoftCard sx={{ mb: 5 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder={t('services.searchPlaceholder')}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:magnifer-linear" sx={{ color: KINPAKU }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: `${SUMI}cc`,
                      '& fieldset': { borderColor: `${KINPAKU}33` },
                      '&:hover fieldset': { borderColor: KINPAKU },
                      '&.Mui-focused fieldset': { borderColor: SAKURA },
                    },
                    '& input': { color: WASHI },
                  }}
                />
              </Grid>
              <Grid xs={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label={t('services.categoryLabel')}
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: `${SUMI}cc`,
                      '& fieldset': { borderColor: `${KINPAKU}33` },
                      '&:hover fieldset': { borderColor: KINPAKU },
                    },
                    '& .MuiInputLabel-root': { color: `${WASHI}88` },
                    '& .MuiSelect-select': { color: WASHI },
                    '& .MuiSvgIcon-root': { color: KINPAKU },
                  }}
                >
                  {spa15ServiceCategories.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {getLang(c.label, currentLang.value)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={6} md={3}>
                <TextField
                  fullWidth
                  select
                  label={t('services.sortLabel')}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: `${SUMI}cc`,
                      '& fieldset': { borderColor: `${KINPAKU}33` },
                      '&:hover fieldset': { borderColor: KINPAKU },
                    },
                    '& .MuiInputLabel-root': { color: `${WASHI}88` },
                    '& .MuiSelect-select': { color: WASHI },
                    '& .MuiSvgIcon-root': { color: KINPAKU },
                  }}
                >
                  <MenuItem value="default">{t('services.sortDefault')}</MenuItem>
                  <MenuItem value="price-asc">{t('services.sortPriceAsc')}</MenuItem>
                  <MenuItem value="price-desc">{t('services.sortPriceDesc')}</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Spa15SoftCard>

          {filtered.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: `${WASHI}88`, py: 8 }}>
              {t('services.noResults')}
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {paginated.map((s) => (
                <Grid key={s.slug} xs={12} sm={6} md={4}>
                  <Spa15SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        height: 220,
                        backgroundImage: `url(${s.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box sx={{ p: 3 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                        <Iconify icon={s.icon} sx={{ color: SAKURA }} width={28} />
                        <Typography variant="h6" sx={{ color: WASHI }}>
                          {getLang(s.name, currentLang.value)}
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: `${WASHI}88`, mb: 2 }}>
                        {getLang(s.short, currentLang.value)}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          size="small"
                          label={`${s.duration}'`}
                          sx={{ bgcolor: `${MATSU}44`, color: WASHI }}
                        />
                        <Chip
                          size="small"
                          label={formatVND(s.price)}
                          sx={{ bgcolor: SAKURA, color: SUMI }}
                        />
                      </Stack>
                      <Button
                        component={RouterLink}
                        href={paths.spa15.serviceDetails(s.slug)}
                        endIcon={<Iconify icon="solar:arrow-right-linear" />}
                        sx={{
                          color: KINPAKU,
                          p: 0,
                          '&:hover': { bgcolor: 'transparent', color: SAKURA },
                        }}
                      >
                        {t('services.viewDetails')}
                      </Button>
                    </Box>
                  </Spa15SoftCard>
                </Grid>
              ))}
            </Grid>
          )}

          {pageCount > 1 && (
            <Stack alignItems="center" sx={{ mt: 6 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, v) => setPage(v)}
                shape="rounded"
                sx={{
                  '& .Mui-selected': {
                    bgcolor: `${SAKURA} !important`,
                    color: SUMI,
                  },
                }}
              />
            </Stack>
          )}
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 3. SERVICE DETAILS
// ======================================================================
export function Spa15ServiceDetailsView() {
  const { t, currentLang } = useTranslate('spa15');
  const { slug } = useParams<{ slug: string }>();
  const service = spa15Services.find((s) => s.slug === slug) ?? spa15Services[0];

  const benefits =
    service.benefits[currentLang.value as keyof typeof service.benefits] ||
    service.benefits.en ||
    [];

  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={service.image}
        eyebrow={t('serviceDetails.eyebrow')}
        title={getLang(service.name, currentLang.value)}
        subtitle={getLang(service.short, currentLang.value)}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={8}>
              <Spa15SectionTitle
                eyebrow={t('serviceDetails.descEyebrow')}
                title={t('serviceDetails.descTitle')}
                align="left"
              />
              <Typography sx={{ color: `${WASHI}88`, mb: 3, lineHeight: 1.8 }}>
                {t('serviceDetails.descText', {
                  name: getLang(service.name, currentLang.value),
                  duration: service.duration,
                })}
              </Typography>
              <Typography variant="h6" sx={{ color: KINPAKU, mb: 2 }}>
                {t('serviceDetails.benefitsTitle')}
              </Typography>
              <Grid container spacing={2}>
                {benefits.map((b: string) => (
                  <Grid key={b} xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Iconify icon="solar:check-circle-bold" sx={{ color: SAKURA }} />
                      <Typography sx={{ color: WASHI }}>{b}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={12} md={4}>
              <Spa15SoftCard sx={{ position: 'sticky', top: 100 }}>
                <Typography variant="overline" sx={{ color: KINPAKU }}>
                  {t('serviceDetails.fromLabel')}
                </Typography>
                <Typography variant="h3" sx={{ color: WASHI, mb: 1 }}>
                  {formatVND(service.price)}
                </Typography>
                <Typography sx={{ color: `${WASHI}88`, mb: 3 }}>{service.duration} phút</Typography>
                <Button
                  fullWidth
                  component={RouterLink}
                  href={paths.spa15.booking}
                  size="large"
                  sx={{
                    borderRadius: 0,
                    py: 1.5,
                    bgcolor: SAKURA,
                    color: SUMI,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#d98aab' },
                  }}
                >
                  {t('serviceDetails.bookNow')}
                </Button>
                <Divider sx={{ my: 3, borderColor: `${KINPAKU}22` }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:phone-bold" sx={{ color: KINPAKU }} />
                    <Typography sx={{ color: WASHI }}>{spa15ContactInfo.hotline}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: KINPAKU }} />
                    <Typography sx={{ color: WASHI }}>
                      {getLang(spa15ContactInfo.workingHours, currentLang.value)}
                    </Typography>
                  </Stack>
                </Stack>
              </Spa15SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 4. TRAINING
// ======================================================================
export function Spa15TrainingView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.training}
        eyebrow={t('training.eyebrow')}
        title={t('training.title')}
        subtitle={t('training.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa15SectionTitle
            eyebrow={t('training.programsEyebrow')}
            title={t('training.programsTitle')}
          />
          <Grid container spacing={3}>
            {spa15TrainingPrograms.map((p) => (
              <Grid key={p.slug} xs={12} md={4}>
                <Spa15SoftCard>
                  <Chip
                    label={getLang(p.level, currentLang.value)}
                    size="small"
                    sx={{ bgcolor: `${SAKURA}22`, color: SAKURA, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ color: WASHI, mb: 1 }}>
                    {getLang(p.name, currentLang.value)}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: KINPAKU }} />
                    <Typography sx={{ color: `${WASHI}88` }}>
                      {getLang(p.duration, currentLang.value)}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: `${WASHI}88`, mb: 2 }}>
                    {getLang(p.outcome, currentLang.value)}
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: `${KINPAKU}22` }} />
                  <Typography variant="h5" sx={{ color: SAKURA, mb: 2 }}>
                    {formatVND(p.price)}
                  </Typography>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={paths.spa15.contact}
                    sx={{
                      borderRadius: 0,
                      bgcolor: MATSU,
                      color: WASHI,
                      '&:hover': { bgcolor: INDIGO },
                    }}
                  >
                    {t('training.registerCta')}
                  </Button>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 5. BLOG
// ======================================================================
export function Spa15BlogView() {
  const { t, currentLang } = useTranslate('spa15');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered =
    category === 'all' ? spa15BlogPosts : spa15BlogPosts.filter((p) => p.category === category);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.blog}
        eyebrow={t('blog.eyebrow')}
        title={t('blog.title')}
        subtitle={t('blog.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Categories */}
          <Stack direction="row" spacing={2} sx={{ mb: 5, flexWrap: 'wrap', gap: 2 }}>
            <Chip
              label={t('blog.allCategories')}
              onClick={() => {
                setCategory('all');
                setPage(1);
              }}
              sx={{
                bgcolor: category === 'all' ? SAKURA : `${MATSU}44`,
                color: category === 'all' ? SUMI : WASHI,
                borderRadius: 0,
              }}
            />
            {spa15BlogCategories.map((c) => (
              <Chip
                key={c.name}
                label={`${c.name} (${c.count})`}
                onClick={() => {
                  setCategory(c.name);
                  setPage(1);
                }}
                sx={{
                  bgcolor: category === c.name ? SAKURA : `${MATSU}44`,
                  color: category === c.name ? SUMI : WASHI,
                  borderRadius: 0,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={4}>
            {paginated.map((post) => (
              <Grid key={post.slug} xs={12} sm={6} md={4}>
                <Spa15SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 220,
                      backgroundImage: `url(${post.cover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{ bgcolor: `${SAKURA}22`, color: SAKURA, mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: WASHI, mb: 1, fontFamily: '"Cormorant Garamond",serif' }}
                    >
                      {getLang(post.title, currentLang.value)}
                    </Typography>
                    <Typography sx={{ color: `${WASHI}88`, mb: 2, lineHeight: 1.6 }}>
                      {getLang(post.excerpt, currentLang.value)}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography sx={{ color: KINPAKU, fontSize: 13 }}>
                        {getLang(post.author, currentLang.value)}
                      </Typography>
                      <Typography sx={{ color: `${WASHI}66`, fontSize: 12 }}>
                        {post.date}
                      </Typography>
                    </Stack>
                    <Button
                      component={RouterLink}
                      href={paths.spa15.blogDetails(post.slug)}
                      endIcon={<Iconify icon="solar:arrow-right-linear" />}
                      sx={{
                        color: SAKURA,
                        p: 0,
                        mt: 2,
                        '&:hover': { bgcolor: 'transparent', color: KINPAKU },
                      }}
                    >
                      {t('blog.readMore')}
                    </Button>
                  </Box>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <Stack alignItems="center" sx={{ mt: 6 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, v) => setPage(v)}
                shape="rounded"
                sx={{
                  '& .Mui-selected': {
                    bgcolor: `${SAKURA} !important`,
                    color: SUMI,
                  },
                }}
              />
            </Stack>
          )}
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 6. BLOG DETAILS
// ======================================================================
export function Spa15BlogDetailsView() {
  const { currentLang } = useTranslate('spa15');
  const { slug } = useParams<{ slug: string }>();
  const post = spa15BlogPosts.find((p) => p.slug === slug) ?? spa15BlogPosts[0];

  return (
    <Spa15PageShell>
      <Box
        sx={{
          height: 400,
          backgroundImage: `url(${post.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, ${SUMI}33 0%, ${SUMI}ee 100%)`,
          }}
        />
        <Container sx={{ position: 'relative', pb: 6 }}>
          <Chip label={post.category} size="small" sx={{ bgcolor: SAKURA, color: SUMI, mb: 2 }} />
          <Typography
            variant="h2"
            sx={{
              color: WASHI,
              fontFamily: '"Cormorant Garamond","Times New Roman",serif',
              fontWeight: 400,
              maxWidth: 800,
            }}
          >
            {getLang(post.title, currentLang.value)}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
            <Typography sx={{ color: KINPAKU }}>
              {getLang(post.author, currentLang.value)}
            </Typography>
            <Typography sx={{ color: `${WASHI}88` }}>{post.date}</Typography>
            <Typography sx={{ color: `${WASHI}66` }}>{post.readTime}</Typography>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography sx={{ color: `${WASHI}cc`, lineHeight: 1.9, fontSize: 18 }}>
            {getLang(post.excerpt, currentLang.value)}
          </Typography>
        </Container>
      </Box>

      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 7. CAREERS
// ======================================================================
export function Spa15CareersView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.careers}
        eyebrow={t('careers.eyebrow')}
        title={t('careers.title')}
        subtitle={t('careers.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa15SectionTitle
            eyebrow={t('careers.openingEyebrow')}
            title={t('careers.openingTitle')}
          />
          <Grid container spacing={4}>
            {spa15Careers.map((job) => (
              <Grid key={job.slug} xs={12} md={4}>
                <Spa15SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: `url(${job.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: WASHI, mb: 1 }}>
                      {getLang(job.title, currentLang.value)}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify icon="solar:map-point-bold" width={14} sx={{ color: KINPAKU }} />
                        <Typography sx={{ color: `${WASHI}88`, fontSize: 13 }}>
                          {getLang(job.location, currentLang.value)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify
                          icon="solar:clock-circle-bold"
                          width={14}
                          sx={{ color: KINPAKU }}
                        />
                        <Typography sx={{ color: `${WASHI}88`, fontSize: 13 }}>
                          {getLang(job.type, currentLang.value)}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography sx={{ color: SAKURA, mb: 2 }}>
                      {getLang(job.salary, currentLang.value)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa15.contact}
                      sx={{ color: SAKURA, p: 0 }}
                    >
                      {t('careers.applyCta')}
                    </Button>
                  </Box>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 8. BOOKING
// ======================================================================
export function Spa15BookingView() {
  const { t, currentLang } = useTranslate('spa15');
  const [selected, setSelected] = useState('sakura');

  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.booking}
        eyebrow={t('bookingPage.eyebrow')}
        title={t('bookingPage.title')}
        subtitle={t('bookingPage.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Spa15SectionTitle
            eyebrow={t('bookingPage.selectEyebrow')}
            title={t('bookingPage.selectTitle')}
          />

          <Grid container spacing={3} sx={{ mb: 5 }}>
            {spa15BookingPackages.map((pkg) => (
              <Grid key={pkg.slug} xs={12} sm={6} md={3}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => setSelected(pkg.slug)}>
                  <Spa15SoftCard
                    sx={{
                      textAlign: 'center',
                      border: selected === pkg.slug ? `2px solid ${SAKURA}` : undefined,
                      bgcolor: selected === pkg.slug ? `${SAKURA}11` : undefined,
                    }}
                  >
                    {pkg.isPopular && (
                      <Chip
                        label={t('bookingPage.popular')}
                        size="small"
                        sx={{ bgcolor: SAKURA, color: SUMI, mb: 2 }}
                      />
                    )}
                    <Typography variant="h6" sx={{ color: WASHI, mb: 1 }}>
                      {getLang(pkg.name, currentLang.value)}
                    </Typography>
                    <Typography variant="h4" sx={{ color: SAKURA, mb: 1 }}>
                      {formatVND(pkg.price)}
                    </Typography>
                    <Typography sx={{ color: `${WASHI}88`, mb: 2 }}>
                      {pkg.sessions} {t('bookingPage.sessions')}
                    </Typography>
                  </Spa15SoftCard>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Spa15SoftCard sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: WASHI, mb: 3 }}>
              {t('bookingPage.formTitle')}
            </Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('bookingPage.nameLabel')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: `${SUMI}cc`,
                      '& fieldset': { borderColor: `${KINPAKU}33` },
                    },
                    '& .MuiInputLabel-root': { color: `${WASHI}88` },
                    '& input': { color: WASHI },
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t('bookingPage.phoneLabel')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: `${SUMI}cc`,
                      '& fieldset': { borderColor: `${KINPAKU}33` },
                    },
                    '& .MuiInputLabel-root': { color: `${WASHI}88` },
                    '& input': { color: WASHI },
                  }}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t('bookingPage.noteLabel')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: `${SUMI}cc`,
                      '& fieldset': { borderColor: `${KINPAKU}33` },
                    },
                    '& .MuiInputLabel-root': { color: `${WASHI}88` },
                    '& textarea': { color: WASHI },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              size="large"
              sx={{
                mt: 4,
                borderRadius: 0,
                py: 1.5,
                bgcolor: SAKURA,
                color: SUMI,
                fontWeight: 700,
                '&:hover': { bgcolor: '#d98aab' },
              }}
            >
              {t('bookingPage.submitCta')}
            </Button>
          </Spa15SoftCard>
        </Container>
      </Box>
    </Spa15PageShell>
  );
}

// ======================================================================
// 9. CONTACT
// ======================================================================
export function Spa15ContactView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.contact}
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={6}>
            <Grid xs={12} md={5}>
              <Spa15SoftCard sx={{ height: '100%' }}>
                <Typography variant="h5" sx={{ color: WASHI, mb: 3 }}>
                  {t('contact.infoTitle')}
                </Typography>
                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Iconify icon="solar:phone-bold-duotone" width={28} sx={{ color: SAKURA }} />
                    <Box>
                      <Typography sx={{ color: KINPAKU, fontSize: 12 }}>
                        {t('contact.hotline')}
                      </Typography>
                      <Typography sx={{ color: WASHI }}>{spa15ContactInfo.hotline}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Iconify icon="solar:letter-bold-duotone" width={28} sx={{ color: SAKURA }} />
                    <Box>
                      <Typography sx={{ color: KINPAKU, fontSize: 12 }}>
                        {t('contact.email')}
                      </Typography>
                      <Typography sx={{ color: WASHI }}>{spa15ContactInfo.email}</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Iconify
                      icon="solar:map-point-bold-duotone"
                      width={28}
                      sx={{ color: SAKURA }}
                    />
                    <Box>
                      <Typography sx={{ color: KINPAKU, fontSize: 12 }}>
                        {t('contact.address')}
                      </Typography>
                      <Typography sx={{ color: WASHI }}>
                        {getLang(spa15ContactInfo.address, currentLang.value)}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Iconify
                      icon="solar:clock-circle-bold-duotone"
                      width={28}
                      sx={{ color: SAKURA }}
                    />
                    <Box>
                      <Typography sx={{ color: KINPAKU, fontSize: 12 }}>
                        {t('contact.hours')}
                      </Typography>
                      <Typography sx={{ color: WASHI }}>
                        {getLang(spa15ContactInfo.workingHours, currentLang.value)}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Spa15SoftCard>
            </Grid>
            <Grid xs={12} md={7}>
              <Spa15SoftCard>
                <Typography variant="h5" sx={{ color: WASHI, mb: 3 }}>
                  {t('contact.formTitle')}
                </Typography>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('contact.nameLabel')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: `${SUMI}cc`,
                          '& fieldset': { borderColor: `${KINPAKU}33` },
                        },
                        '& .MuiInputLabel-root': { color: `${WASHI}88` },
                        '& input': { color: WASHI },
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label={t('contact.phoneLabel')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: `${SUMI}cc`,
                          '& fieldset': { borderColor: `${KINPAKU}33` },
                        },
                        '& .MuiInputLabel-root': { color: `${WASHI}88` },
                        '& input': { color: WASHI },
                      }}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label={t('contact.messageLabel')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: `${SUMI}cc`,
                          '& fieldset': { borderColor: `${KINPAKU}33` },
                        },
                        '& .MuiInputLabel-root': { color: `${WASHI}88` },
                        '& textarea': { color: WASHI },
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    mt: 4,
                    borderRadius: 0,
                    py: 1.5,
                    bgcolor: SAKURA,
                    color: SUMI,
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#d98aab' },
                  }}
                >
                  {t('contact.submitCta')}
                </Button>
              </Spa15SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Spa15PageShell>
  );
}

// ======================================================================
// 10. OFFERS
// ======================================================================
export function Spa15OffersView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.offers}
        eyebrow={t('offers.eyebrow')}
        title={t('offers.title')}
        subtitle={t('offers.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {spa15Offers.map((offer) => (
              <Grid key={offer.id} xs={12} md={6}>
                <Spa15SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 220,
                      backgroundImage: `linear-gradient(135deg, ${SAKURA}44 0%, ${MATSU}66 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h2"
                        sx={{
                          color: KINPAKU,
                          fontFamily: '"Cormorant Garamond",serif',
                          fontWeight: 400,
                        }}
                      >
                        {offer.code}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: WASHI, mb: 1 }}>
                      {getLang(offer.title, currentLang.value)}
                    </Typography>
                    <Typography sx={{ color: `${WASHI}88`, mb: 2 }}>
                      {getLang(offer.description, currentLang.value)}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ color: KINPAKU, fontSize: 13 }}>
                        {t('offers.expires')}: {getLang(offer.expires, currentLang.value)}
                      </Typography>
                      <Button
                        component={RouterLink}
                        href={paths.spa15.booking}
                        sx={{ color: SAKURA, p: 0 }}
                      >
                        {t('offers.useCta')}
                      </Button>
                    </Stack>
                  </Box>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 11. FEEDBACK
// ======================================================================
export function Spa15FeedbackView() {
  const { t } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.feedback}
        eyebrow={t('feedback.eyebrow')}
        title={t('feedback.title')}
        subtitle={t('feedback.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {spa15Feedbacks.map((fb) => (
              <Grid key={fb.id} xs={12} sm={6} md={4}>
                <Spa15SoftCard>
                  <Rating
                    value={fb.rating}
                    readOnly
                    size="small"
                    sx={{ mb: 2, '& .MuiRating-iconFilled': { color: KINPAKU } }}
                  />
                  <Typography
                    sx={{
                      color: WASHI,
                      lineHeight: 1.8,
                      mb: 3,
                      fontStyle: 'italic',
                      fontFamily: '"Cormorant Garamond",serif',
                    }}
                  >
                    &ldquo;{fb.comment.en}&rdquo;
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: `${KINPAKU}22` }} />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={fb.avatar} sx={{ border: `2px solid ${SAKURA}` }} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: WASHI }}>{fb.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: `${WASHI}88` }}>
                        {fb.service}
                      </Typography>
                    </Box>
                  </Stack>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 12. PROMOTIONS
// ======================================================================
export function Spa15PromotionsView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.promotions}
        eyebrow={t('promotions.eyebrow')}
        title={t('promotions.title')}
        subtitle={t('promotions.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {spa15Promotions.map((promo) => (
              <Grid key={promo.id} xs={12} md={6}>
                <Spa15SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 280,
                      backgroundImage: `url(${promo.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: SAKURA,
                        color: SUMI,
                        px: 2,
                        py: 0.5,
                        fontWeight: 700,
                      }}
                    >
                      -{promo.discount}
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ color: WASHI, mb: 1 }}>
                      {getLang(promo.title, currentLang.value)}
                    </Typography>
                    <Typography sx={{ color: KINPAKU, mb: 2 }}>
                      {getLang(promo.period, currentLang.value)}
                    </Typography>
                    <Typography sx={{ color: `${WASHI}88`, mb: 2 }}>
                      {getLang(promo.save, currentLang.value)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa15.booking}
                      sx={{
                        color: SAKURA,
                        p: 0,
                        '&:hover': { color: KINPAKU },
                      }}
                    >
                      {t('promotions.bookCta')}
                    </Button>
                  </Box>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 13. BRANCHES
// ======================================================================
export function Spa15BranchesView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.branches}
        eyebrow={t('branches.eyebrow')}
        title={t('branches.title')}
        subtitle={t('branches.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {spa15Branches.map((branch) => (
              <Grid key={branch.id} xs={12} md={4}>
                <Spa15SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${branch.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ color: WASHI, mb: 0.5 }}>
                      {getLang(branch.name, currentLang.value)}
                    </Typography>
                    <Typography sx={{ color: KINPAKU, fontSize: 13, mb: 2 }}>
                      {getLang(branch.city, currentLang.value)}
                    </Typography>
                    <Stack spacing={1.5}>
                      <Stack direction="row" alignItems="flex-start" spacing={1}>
                        <Iconify
                          icon="solar:map-point-bold"
                          width={18}
                          sx={{ color: SAKURA, mt: 0.3 }}
                        />
                        <Typography sx={{ color: `${WASHI}88`, fontSize: 14 }}>
                          {getLang(branch.address, currentLang.value)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="solar:phone-bold" width={18} sx={{ color: SAKURA }} />
                        <Typography sx={{ color: `${WASHI}88`, fontSize: 14 }}>
                          {branch.phone}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="solar:clock-circle-bold" width={18} sx={{ color: SAKURA }} />
                        <Typography sx={{ color: `${WASHI}88`, fontSize: 14 }}>
                          {getLang(branch.hours, currentLang.value)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 14. ACCOUNT
// ======================================================================
export function Spa15AccountView() {
  const { t } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.account}
        eyebrow={t('account.eyebrow')}
        title={t('account.title')}
        subtitle={t('account.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm">
          <Spa15SoftCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ color: WASHI, mb: 3, textAlign: 'center' }}>
              {t('account.loginTitle')}
            </Typography>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label={t('account.emailLabel')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: `${SUMI}cc`,
                    '& fieldset': { borderColor: `${KINPAKU}33` },
                  },
                  '& .MuiInputLabel-root': { color: `${WASHI}88` },
                  '& input': { color: WASHI },
                }}
              />
              <TextField
                fullWidth
                type="password"
                label={t('account.passwordLabel')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: `${SUMI}cc`,
                    '& fieldset': { borderColor: `${KINPAKU}33` },
                  },
                  '& .MuiInputLabel-root': { color: `${WASHI}88` },
                  '& input': { color: WASHI },
                }}
              />
              <Button
                fullWidth
                size="large"
                sx={{
                  borderRadius: 0,
                  py: 1.5,
                  bgcolor: SAKURA,
                  color: SUMI,
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#d98aab' },
                }}
              >
                {t('account.loginCta')}
              </Button>
            </Stack>
            <Divider sx={{ my: 3, borderColor: `${KINPAKU}22` }} />
            <Typography sx={{ textAlign: 'center', color: `${WASHI}88` }}>
              {t('account.noAccount')}{' '}
              <Button sx={{ color: SAKURA, p: 0 }}>{t('account.registerCta')}</Button>
            </Typography>
          </Spa15SoftCard>
        </Container>
      </Box>
    </Spa15PageShell>
  );
}

// ======================================================================
// 15. PARTNERS
// ======================================================================
export function Spa15PartnersView() {
  const { t } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.partners}
        eyebrow={t('partners.eyebrow')}
        title={t('partners.title')}
        subtitle={t('partners.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {spa15Partners.map((partner) => (
              <Grid key={partner.id} xs={12} sm={6} md={3}>
                <Spa15SoftCard sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      bgcolor: `${KINPAKU}22`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        color: KINPAKU,
                        fontWeight: 700,
                        fontSize: 24,
                        fontFamily: '"Cormorant Garamond",serif',
                      }}
                    >
                      {partner.logo}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: WASHI, mb: 0.5 }}>
                    {partner.name}
                  </Typography>
                  <Typography sx={{ color: KINPAKU, fontSize: 13, mb: 0.5 }}>
                    {partner.country}
                  </Typography>
                  <Typography sx={{ color: `${WASHI}88`, fontSize: 13 }}>
                    {partner.specialty}
                  </Typography>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 16. PACKAGES
// ======================================================================
export function Spa15PackagesView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.packages}
        eyebrow={t('packages.eyebrow')}
        title={t('packages.title')}
        subtitle={t('packages.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {spa15Packages.map((pkg) => (
              <Grid key={pkg.slug} xs={12} md={4}>
                <Spa15SoftCard
                  sx={{
                    textAlign: 'center',
                    border: pkg.isPopular ? `2px solid ${SAKURA}` : undefined,
                  }}
                >
                  {pkg.isPopular && (
                    <Chip
                      label={t('packages.popular')}
                      sx={{ bgcolor: SAKURA, color: SUMI, mb: 2 }}
                    />
                  )}
                  <Typography
                    variant="h5"
                    sx={{
                      color: WASHI,
                      mb: 2,
                      fontFamily: '"Cormorant Garamond",serif',
                    }}
                  >
                    {getLang(pkg.name, currentLang.value)}
                  </Typography>
                  <Typography variant="h3" sx={{ color: SAKURA, mb: 1 }}>
                    {formatVND(pkg.price)}
                  </Typography>
                  <Typography sx={{ color: `${WASHI}66`, mb: 3 }}>
                    {t('packages.sessions', { count: pkg.sessions })}
                  </Typography>
                  <Divider sx={{ my: 2, borderColor: `${KINPAKU}22` }} />
                  <Stack spacing={1}>
                    {(
                      getLang(
                        pkg.perks as unknown as Record<string, string>,
                        currentLang.value
                      ) as unknown as string[]
                    ).map((perk: string) => (
                      <Stack key={perk} direction="row" spacing={1} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          width={16}
                          sx={{ color: KINPAKU }}
                        />
                        <Typography sx={{ color: WASHI, fontSize: 14 }}>{perk}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={paths.spa15.booking}
                    sx={{
                      mt: 3,
                      borderRadius: 0,
                      bgcolor: pkg.isPopular ? SAKURA : MATSU,
                      color: SUMI,
                      fontWeight: 700,
                      '&:hover': { bgcolor: pkg.isPopular ? '#d98aab' : INDIGO },
                    }}
                  >
                    {t('packages.selectCta')}
                  </Button>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 17. BEFORE/AFTER
// ======================================================================
export function Spa15BeforeAfterView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.beforeAfter}
        eyebrow={t('beforeAfter.eyebrow')}
        title={t('beforeAfter.title')}
        subtitle={t('beforeAfter.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {spa15BeforeAfters.map((ba) => (
              <Grid key={ba.id} xs={12} sm={6}>
                <Spa15SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Grid container>
                    <Grid xs={6}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            height: 260,
                            backgroundImage: `url(${ba.beforeImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <Chip
                          label={t('beforeAfter.before')}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: `${SUMI}cc`,
                            color: WASHI,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            height: 260,
                            backgroundImage: `url(${ba.afterImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <Chip
                          label={t('beforeAfter.after')}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: SAKURA,
                            color: SUMI,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ color: WASHI, fontWeight: 600, mb: 0.5 }}>
                      {getLang(ba.title, currentLang.value)}
                    </Typography>
                    <Typography sx={{ color: KINPAKU, fontSize: 13, mb: 1 }}>
                      {getLang(ba.duration, currentLang.value)}
                    </Typography>
                    <Typography sx={{ color: `${WASHI}88`, fontSize: 14 }}>
                      {getLang(ba.note, currentLang.value)}
                    </Typography>
                  </Box>
                </Spa15SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 18. FAQ
// ======================================================================
export function Spa15FaqView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.faq}
        eyebrow={t('faq.eyebrow')}
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {spa15Faqs.map((f, idx) => (
            <Accordion
              key={f.id}
              defaultExpanded={idx === 0}
              sx={{
                mb: 1.5,
                borderRadius: '4px !important',
                bgcolor: `${SUMI}ee`,
                border: `1px solid ${KINPAKU}22`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { borderColor: `${SAKURA}44` },
              }}
            >
              <AccordionSummary
                expandIcon={<Iconify icon="solar:alt-arrow-down-bold" sx={{ color: SAKURA }} />}
              >
                <Typography sx={{ fontWeight: 600, color: WASHI }}>
                  {getLang(f.q, currentLang.value)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: `${WASHI}88`, lineHeight: 1.8 }}>
                  {getLang(f.a, currentLang.value)}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 19. POLICY
// ======================================================================
export function Spa15PolicyView() {
  const { t, currentLang } = useTranslate('spa15');
  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.policy}
        eyebrow={t('policy.eyebrow')}
        title={t('policy.title')}
        subtitle={t('policy.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {spa15Policies.map((p) => (
            <Spa15SoftCard key={getLang(p.title, currentLang.value)} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: KINPAKU, mb: 2 }}>
                {getLang(p.title, currentLang.value)}
              </Typography>
              <Stack spacing={1.5}>
                {(
                  getLang(
                    p.items as unknown as Record<string, string>,
                    currentLang.value
                  ) as unknown as string[]
                ).map((item: string) => (
                  <Stack key={item} direction="row" spacing={1.5} alignItems="flex-start">
                    <Iconify
                      icon="solar:check-circle-bold"
                      width={18}
                      sx={{ color: SAKURA, mt: 0.3 }}
                    />
                    <Typography sx={{ color: WASHI }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Spa15SoftCard>
          ))}
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}

// ======================================================================
// 20. GALLERY
// ======================================================================
export function Spa15GalleryView() {
  const { t } = useTranslate('spa15');
  const categories = ['all', 'onsen', 'treatment', 'ryokan', 'nature', 'zen'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered =
    selectedCategory === 'all'
      ? spa15Gallery
      : spa15Gallery.filter((g) => g.category === selectedCategory);

  return (
    <Spa15PageShell>
      <Spa15PageHero
        image={SPA15_PAGE_IMAGES.gallery}
        eyebrow={t('gallery.eyebrow')}
        title={t('gallery.title')}
        subtitle={t('gallery.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Category filter */}
          <Stack direction="row" spacing={2} sx={{ mb: 5, flexWrap: 'wrap', gap: 2 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={
                  cat === 'all' ? t('gallery.all') : cat.charAt(0).toUpperCase() + cat.slice(1)
                }
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  bgcolor: selectedCategory === cat ? SAKURA : `${MATSU}44`,
                  color: selectedCategory === cat ? SUMI : WASHI,
                  borderRadius: 0,
                  textTransform: 'capitalize',
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={2}>
            {filtered.map((item) => (
              <Grid key={item.id} xs={6} sm={4} md={3}>
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '100%',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: `1px solid ${KINPAKU}22`,
                    '&:hover': { borderColor: `${SAKURA}66` },
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${item.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform .4s',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa15Cta />
    </Spa15PageShell>
  );
}
