import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import { spa2ImageBackgroundStyle } from '../spa2-image-utils';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Services,
  spa2Feedbacks,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
  spa2ReviewStats,
  spa2HomeServices,
  spa2EtiquetteDos,
  spa2ReviewBanner,
  spa2ReviewAspects,
  spa2EtiquetteDonts,
  spa2EtiquetteOffer,
  spa2LoyaltyRewards,
  spa2HomeServiceFaqs,
  spa2SkinDiaryBanner,
  spa2EtiquetteGuides,
  spa2HomeServiceAreas,
  type Spa2HomeService,
  spa2OccasionPackages,
  spa2SkinDiaryEntries,
  spa2MedicalSpaBanner,
  spa2LoyaltyEarnRules,
  type Spa2ReviewStats,
  spa2HomeServiceBanner,
  spa2MindfulnessBanner,
  spa2MedicalTreatments,
  type Spa2ReviewAspect,
  type Spa2ReviewBanner,
  spa2HomeServiceProcess,
  type Spa2EtiquetteRule,
  spa2SpaEtiquetteBanner,
  type Spa2LoyaltyReward,
  type Spa2HomeServiceFaq,
  type Spa2SkinDiaryEntry,
  spa2MindfulnessBenefits,
  spa2MindfulnessPrograms,
  type Spa2EtiquetteOffer,
  type Spa2EtiquetteGuide,
  type Spa2AdjustableImage,
  type Spa2HomeServiceArea,
  type Spa2OccasionPackage,
  type Spa2SkinDiaryBanner,
  spa2MindfulnessChallenge,
  spa2MedicalSpaCategories,
  spa2LoyaltyRewardsBanner,
  spa2LoyaltyPointsBalance,
  type Spa2LoyaltyEarnRule,
  spa2MedicalSpaCredentials,
  type Spa2MedicalSpaBanner,
  type Spa2MedicalTreatment,
  type Spa2HomeServiceBanner,
  spa2SpecialOccasionsBanner,
  type Spa2MindfulnessBanner,
  type Spa2MindfulnessBenefit,
  type Spa2MindfulnessProgram,
  type Spa2MedicalSpaCategory,
  type Spa2SpaEtiquetteBanner,
  spa2LoyaltyRewardCategories,
  type Spa2MindfulnessChallenge,
  type Spa2MedicalSpaCredential,
  type Spa2LoyaltyRewardsBanner,
  type Spa2LoyaltyRewardCategory,
  type Spa2HomeServiceProcessStep,
  type Spa2SpecialOccasionsBanner,
} from '../spa2-pages-data';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// ─── SHARED ────────────────────────────────────────────────────────────
function SoftCard({ children, sx }: { children: React.ReactNode; sx?: object }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: '0 8px 24px rgba(31,42,40,0.05)',
        height: '100%',
        transition: 'all .22s',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 16px 36px rgba(46,139,122,0.12)',
          borderColor: SPA2_TEAL_LIGHT,
        },
        ...sx,
      }}
    >
      {children}
    </Card>
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
      spacing={1}
      sx={{ mb: 5, textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start' }}
    >
      <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
        {eyebrow}
      </Typography>
      <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: 'text.secondary', maxWidth: 620 }}>{subtitle}</Typography>
      )}
    </Stack>
  );
}

// Exported so the sustainability/special-occasions/home-service manage
// views (spa2-special-occasions-manage-view.tsx, spa2-home-service-manage-
// view.tsx) can reuse the exact same hero markup for their "banner" tab live
// preview, fed with in-progress edited state - same convention as
// Spa2ContentPageHero in spa2-content-pages2.tsx.
export function Spa2ContentPageHero3({
  img,
  imageStyle,
  eyebrow,
  title,
  subtitle,
  cta,
  dark,
}: {
  img: string;
  imageStyle?: Spa2AdjustableImage;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: dark ? SPA2_INK : SPA2_CREAM,
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          ...(imageStyle
            ? spa2ImageBackgroundStyle(imageStyle)
            : {
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }),
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL_LIGHT,
          opacity: 0.1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          left: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL,
          opacity: 0.07,
        }}
      />
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <Stack spacing={2.5} alignItems="center">
          <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
            {eyebrow}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: dark ? 'white' : SPA2_INK,
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 720,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: dark ? 'rgba(255,255,255,0.75)' : 'text.secondary',
              fontSize: 17,
              maxWidth: 560,
            }}
          >
            {subtitle}
          </Typography>
          {cta}
        </Stack>
      </Container>
    </Box>
  );
}

function GradientCta({
  title,
  sub,
  btnLabel,
  href,
}: {
  title: string;
  sub: string;
  btnLabel: string;
  href: string;
}) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
      <Container>
        <Card
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            color: 'common.white',
            background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
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
              bgcolor: 'rgba(255,255,255,0.08)',
            }}
          />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            sx={{ position: 'relative' }}
          >
            <Stack spacing={0.75}>
              <Typography variant="h4">{title}</Typography>
              <Typography sx={{ opacity: 0.85, fontSize: 15 }}>{sub}</Typography>
            </Stack>
            <Button
              component={RouterLink}
              href={href}
              size="large"
              sx={{
                borderRadius: 999,
                px: 4,
                py: 1.5,
                bgcolor: 'common.white',
                color: SPA2_TEAL_DARK,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: SPA2_CREAM },
              }}
            >
              {btnLabel}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Iconify
        icon="solar:check-circle-bold"
        width={16}
        sx={{ color: SPA2_TEAL, flexShrink: 0, mt: '3px' }}
      />
      <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
        {children}
      </Typography>
    </Stack>
  );
}

// ══════════════════════════════════════════════════════════
// 1. SPECIAL OCCASIONS
// ══════════════════════════════════════════════════════════

// NOTE: the special-occasions banner and package catalog are shared with the
// dashboard "manage" view - the single source of truth lives in
// src/_mock/_spa2 (imported above as spa2SpecialOccasionsBanner/
// spa2OccasionPackages).

export function Spa2SpecialOccasionsPageView({
  banner = spa2SpecialOccasionsBanner,
  packages = spa2OccasionPackages,
}: {
  banner?: Spa2SpecialOccasionsBanner;
  packages?: Spa2OccasionPackage[];
} = {}) {
  const [active, setActive] = useState<Spa2OccasionPackage | null>(null);
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 5,
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
            }}
          >
            {packages.map((p) => (
              <Tab
                key={p.id}
                label={p.label}
                icon={<Iconify icon={p.icon} width={18} />}
                iconPosition="start"
                sx={{ textTransform: 'none', minHeight: 52, gap: 0.75 }}
              />
            ))}
          </Tabs>

          {packages.map(
            (pkg, idx) =>
              idx === tab && (
                <Grid key={pkg.id} container spacing={5} alignItems="center">
                  <Grid xs={12} md={6}>
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 5,
                        overflow: 'hidden',
                        aspectRatio: '4/3',
                        boxShadow: '0 24px 56px rgba(0,0,0,0.15)',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${pkg.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                        }}
                      />
                      <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
                        <Chip
                          label={pkg.tag}
                          sx={{ bgcolor: pkg.color, color: 'white', fontWeight: 700, mb: 1 }}
                        />
                        <Typography variant="h4" sx={{ color: 'white' }}>
                          {pkg.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Stack spacing={3}>
                      <Box>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: '50%',
                              bgcolor: pkg.accent,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: `2px solid ${pkg.color}`,
                            }}
                          >
                            <Iconify icon={pkg.icon} width={22} sx={{ color: pkg.color }} />
                          </Box>
                          <Typography variant="h5" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                            {pkg.title}
                          </Typography>
                        </Stack>
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                          {pkg.desc}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1.5} alignItems="baseline">
                        <Typography variant="h3" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                          {formatVND(pkg.price)}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{pkg.duration}</Typography>
                      </Stack>
                      <Box>
                        <Typography
                          sx={{ fontWeight: 600, color: SPA2_INK, mb: 1.5, fontSize: 14 }}
                        >
                          Bao gồm:
                        </Typography>
                        <Grid container spacing={1}>
                          {pkg.includes.map((inc) => (
                            <Grid key={inc} xs={12} sm={6}>
                              <CheckItem>{inc}</CheckItem>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                      <Stack direction="row" spacing={2}>
                        <Button
                          component={RouterLink}
                          href={paths.spa2.booking}
                          size="large"
                          sx={{
                            borderRadius: 999,
                            px: 4,
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          }}
                        >
                          Đặt gói ngay
                        </Button>
                        <Button
                          onClick={() => setActive(pkg)}
                          size="large"
                          sx={{
                            borderRadius: 999,
                            px: 3,
                            color: SPA2_TEAL_DARK,
                            border: `1.5px solid ${SPA2_TEAL}`,
                          }}
                        >
                          Tư vấn thêm
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              )
          )}

          {/* All packages quick view */}
          <Box sx={{ mt: 8 }}>
            <SectionTitle eyebrow="Tổng quan" title="Tất cả gói dịp đặc biệt" />
            <Grid container spacing={3}>
              {packages.map((pkg) => (
                <Grid key={pkg.id} xs={12} sm={6} md={4}>
                  <Box onClick={() => setTab(packages.indexOf(pkg))} sx={{ cursor: 'pointer' }}>
                    <SoftCard sx={{ borderTop: `3px solid ${pkg.color}` }}>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: pkg.accent,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Iconify icon={pkg.icon} width={20} sx={{ color: pkg.color }} />
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                            {pkg.label}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            {pkg.duration}
                          </Typography>
                        </Box>
                      </Stack>
                      <Typography
                        sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}
                      >
                        {pkg.desc.slice(0, 80)}...
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL }}>
                        {formatVND(pkg.price)}
                      </Typography>
                    </SoftCard>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Enquiry dialog */}
      <Dialog
        open={!!active}
        onClose={() => setActive(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {active && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setActive(null)}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5, pr: 4 }}>
              {active.title}
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
              {active.duration} · {formatVND(active.price)}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <TextField fullWidth size="small" label="Họ và tên" />
              <TextField fullWidth size="small" label="Số điện thoại" />
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Ngày mong muốn"
                InputLabelProps={{ shrink: true }}
              />
              <TextField fullWidth size="small" multiline rows={2} label="Ghi chú thêm" />
              <Button
                fullWidth
                onClick={() => setActive(null)}
                sx={{
                  borderRadius: 99,
                  py: 1.4,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Gửi yêu cầu tư vấn
              </Button>
            </Stack>
          </DialogContent>
        )}
      </Dialog>

      <GradientCta
        title="Có dịp đặc biệt sắp đến?"
        sub="Liên hệ ngay để được tư vấn gói phù hợp và nhận ưu đãi."
        btnLabel="Tư vấn ngay"
        href={paths.spa2.contact}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 2. HOME SERVICE (SPA TẠI NHÀ)
// ══════════════════════════════════════════════════════════

// NOTE: the home-service banner, coverage areas, services, process steps and
// FAQ are shared with the dashboard "manage" view - the single source of
// truth lives in src/_mock/_spa2 (imported above as spa2HomeServiceBanner/
// spa2HomeServiceAreas/spa2HomeServices/spa2HomeServiceProcess/
// spa2HomeServiceFaqs).

export function Spa2HomeServicePageView({
  banner = spa2HomeServiceBanner,
  areas = spa2HomeServiceAreas,
  services = spa2HomeServices,
  process = spa2HomeServiceProcess,
  faqs = spa2HomeServiceFaqs,
}: {
  banner?: Spa2HomeServiceBanner;
  areas?: Spa2HomeServiceArea[];
  services?: Spa2HomeService[];
  process?: Spa2HomeServiceProcessStep[];
  faqs?: Spa2HomeServiceFaq[];
} = {}) {
  const [area, setArea] = useState(areas[0]?.value ?? 'hcm');
  const [toast, setToast] = useState('');

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Coverage badge */}
      <Box sx={{ py: 2, bgcolor: SPA2_TEAL }}>
        <Container>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Typography sx={{ color: 'white', fontSize: 14 }}>Khu vực phục vụ:</Typography>
            <Stack direction="row" spacing={1}>
              {areas.map((a) => (
                <Chip
                  key={a.value}
                  label={a.label}
                  onClick={() => setArea(a.value)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: area === a.value ? 'white' : 'rgba(255,255,255,0.2)',
                    color: area === a.value ? SPA2_TEAL_DARK : 'white',
                    fontWeight: area === a.value ? 700 : 400,
                  }}
                />
              ))}
            </Stack>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
              {areas.find((a) => a.value === area)?.note}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Services */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Dịch vụ" title="Chọn dịch vụ spa tại nhà" />
          <Grid container spacing={3}>
            {services.map((s) => (
              <Grid key={s.id} xs={12} sm={6} md={4}>
                <SoftCard>
                  <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        bgcolor: SPA2_CREAM,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={s.icon} width={26} sx={{ color: SPA2_TEAL }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
                          {s.name}
                        </Typography>
                        {s.tag && (
                          <Chip
                            label={s.tag}
                            size="small"
                            sx={{ bgcolor: SPA2_TEAL, color: 'white', fontSize: 11 }}
                          />
                        )}
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={s.duration}
                          size="small"
                          sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                  <Typography
                    sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                  >
                    {s.desc}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 16 }}>
                      {formatVND(s.price)}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => setToast(`Đã chọn: ${s.name}`)}
                      sx={{
                        borderRadius: 99,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        px: 2,
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      Đặt ngay
                    </Button>
                  </Stack>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How it works */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Quy trình" title="4 bước đơn giản" />
          <Grid container spacing={3}>
            {process.map((p, i) => (
              <Grid key={p.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center', bgcolor: 'common.white' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 20,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {p.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {p.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="FAQ" title="Câu hỏi về dịch vụ tại nhà" />
          {faqs.map((faq, i) => (
            <Accordion
              key={faq.id}
              defaultExpanded={i === 0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { borderColor: SPA2_TEAL_LIGHT },
              }}
            >
              <AccordionSummary
                expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}
                sx={{ '& .MuiAccordionSummary-content': { my: 1.5 } }}
              >
                <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: 13.5 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <GradientCta
        title="Spa cao cấp ngay tại nhà bạn"
        sub="Đặt lịch ngay — KTV đến trong vòng 60 phút."
        btnLabel="Đặt lịch tại nhà"
        href={paths.spa2.booking}
      />
      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast('')}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 3. SKIN DIARY (NHẬT KÝ DA)
// ══════════════════════════════════════════════════════════

// NOTE: the skin-diary banner and tracked entries are shared with the
// dashboard "manage" view - the single source of truth lives in
// src/_mock/_spa2 (imported above as spa2SkinDiaryBanner/spa2SkinDiaryEntries).

const SKIN_METRICS = [
  {
    key: 'moisture' as const,
    label: 'Độ ẩm',
    icon: 'solar:drop-bold',
    color: '#4FC3F7',
    good: 'high',
  },
  {
    key: 'oiliness' as const,
    label: 'Dầu nhờn',
    icon: 'solar:sun-bold',
    color: '#EF9F27',
    good: 'low',
  },
  {
    key: 'sensitivity' as const,
    label: 'Độ nhạy',
    icon: 'solar:shield-bold',
    color: '#E57373',
    good: 'low',
  },
];

export function Spa2SkinDiaryPageView({
  banner = spa2SkinDiaryBanner,
  entries: entriesProp = spa2SkinDiaryEntries,
}: {
  banner?: Spa2SkinDiaryBanner;
  entries?: Spa2SkinDiaryEntry[];
} = {}) {
  const [entries] = useState<Spa2SkinDiaryEntry[]>(entriesProp);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    moisture: 70,
    oiliness: 50,
    sensitivity: 30,
    note: '',
    service: '',
  });

  const latest = entries[entries.length - 1] ?? {
    id: '',
    date: '—',
    moisture: 0,
    oiliness: 0,
    sensitivity: 0,
    note: 'Chưa có nhật ký nào.',
    service: '',
  };
  const prev = entries[entries.length - 2];

  const diff = (key: keyof typeof newEntry) => {
    if (!latest || !prev || typeof latest[key as keyof Spa2SkinDiaryEntry] !== 'number')
      return null;
    const d =
      (latest[key as keyof Spa2SkinDiaryEntry] as number) -
      (prev[key as keyof Spa2SkinDiaryEntry] as number);
    return d;
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {/* Current status */}
            <Grid xs={12} md={4}>
              <SoftCard>
                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
                  Tình trạng da hiện tại
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 3 }}>
                  Cập nhật lần cuối: {latest.date}
                </Typography>
                <Stack spacing={2.5}>
                  {SKIN_METRICS.map((m) => {
                    const val = latest[m.key];
                    const d = diff(m.key);
                    const goodDir = m.good === 'high' ? 1 : -1;
                    return (
                      <Box key={m.key}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Iconify icon={m.icon} width={16} sx={{ color: m.color }} />
                            <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                              {m.label}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.75} alignItems="center">
                            <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK }}>
                              {val}%
                            </Typography>
                            {d !== null && d !== 0 && (
                              <Chip
                                label={`${d > 0 ? '+' : ''}${d}%`}
                                size="small"
                                sx={{
                                  fontSize: 11,
                                  height: 20,
                                  bgcolor: d * goodDir > 0 ? '#E8F5E9' : '#FFEBEE',
                                  color: d * goodDir > 0 ? '#2E7D32' : '#C62828',
                                }}
                              />
                            )}
                          </Stack>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={val}
                          sx={{
                            height: 8,
                            borderRadius: 99,
                            bgcolor: SPA2_CREAM_DARK,
                            '& .MuiLinearProgress-bar': { bgcolor: m.color, borderRadius: 99 },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
                <Divider sx={{ my: 2.5 }} />
                <Typography sx={{ fontSize: 13, color: 'text.secondary', fontStyle: 'italic' }}>
                  &ldquo;{latest.note}&rdquo;
                </Typography>
                <Button
                  fullWidth
                  onClick={() => setShowForm(true)}
                  sx={{
                    mt: 2.5,
                    borderRadius: 99,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  + Ghi nhật ký mới
                </Button>
              </SoftCard>
            </Grid>

            {/* History */}
            <Grid xs={12} md={8}>
              <SoftCard>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Typography variant="h6" sx={{ color: SPA2_INK }}>
                    Lịch sử theo dõi
                  </Typography>
                  <Chip
                    label={`${entries.length} lần ghi`}
                    size="small"
                    sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                  />
                </Stack>
                <Stack spacing={2}>
                  {[...entries].reverse().map((e, i) => (
                    <Card
                      key={e.id}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: i === 0 ? SPA2_CREAM : 'common.white',
                        border: `1px solid ${i === 0 ? SPA2_TEAL_LIGHT : SPA2_CREAM_DARK}`,
                        boxShadow: 'none',
                      }}
                    >
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems={{ sm: 'center' }}
                      >
                        <Box sx={{ minWidth: 90 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_TEAL_DARK }}>
                            {e.date}
                          </Typography>
                          <Chip
                            label={e.service}
                            size="small"
                            sx={{
                              mt: 0.5,
                              bgcolor: SPA2_CREAM,
                              color: 'text.secondary',
                              fontSize: 11,
                            }}
                          />
                        </Box>
                        <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                          {SKIN_METRICS.map((m) => (
                            <Box key={m.key} sx={{ textAlign: 'center' }}>
                              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                                {m.label}
                              </Typography>
                              <Typography sx={{ fontSize: 15, fontWeight: 700, color: m.color }}>
                                {e[m.key]}%
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: 'text.secondary',
                            fontStyle: 'italic',
                            maxWidth: 160,
                          }}
                        >
                          &ldquo;{e.note.slice(0, 50)}...&rdquo;
                        </Typography>
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Add entry dialog */}
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <IconButton
            onClick={() => setShowForm(false)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
          <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
            Ghi nhật ký hôm nay
          </Typography>
          <Stack spacing={3}>
            {SKIN_METRICS.map((m) => (
              <Box key={m.key}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Iconify icon={m.icon} width={16} sx={{ color: m.color }} />
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{m.label}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: m.color }}>
                    {newEntry[m.key as 'moisture' | 'oiliness' | 'sensitivity']}%
                  </Typography>
                </Stack>
                <Slider
                  value={newEntry[m.key as 'moisture' | 'oiliness' | 'sensitivity']}
                  onChange={(_, v) => setNewEntry({ ...newEntry, [m.key]: v as number })}
                  sx={{ color: m.color }}
                />
              </Box>
            ))}
            <TextField
              fullWidth
              size="small"
              select
              label="Dịch vụ vừa thực hiện"
              value={newEntry.service}
              onChange={(e) => setNewEntry({ ...newEntry, service: e.target.value })}
            >
              {spa2Services.map((s: any) => (
                <MenuItem key={s.slug} value={s.name}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label="Ghi chú cảm nhận"
              value={newEntry.note}
              onChange={(e) => setNewEntry({ ...newEntry, note: e.target.value })}
            />
            <Button
              fullWidth
              onClick={() => setShowForm(false)}
              sx={{
                borderRadius: 99,
                py: 1.4,
                bgcolor: SPA2_TEAL,
                color: 'white',
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
              }}
            >
              Lưu nhật ký
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 4. MINDFULNESS & YOGA
// ══════════════════════════════════════════════════════════

// NOTE: the mindfulness banner, benefits, weekly programs and 7-day
// challenge are shared with the dashboard "manage" view - the single source
// of truth lives in src/_mock/_spa2 (imported above as
// spa2MindfulnessBanner/spa2MindfulnessBenefits/spa2MindfulnessPrograms/
// spa2MindfulnessChallenge).

export function Spa2MindfulnessPageView({
  banner = spa2MindfulnessBanner,
  benefits = spa2MindfulnessBenefits,
  programs = spa2MindfulnessPrograms,
  challenge = spa2MindfulnessChallenge,
}: {
  banner?: Spa2MindfulnessBanner;
  benefits?: Spa2MindfulnessBenefit[];
  programs?: Spa2MindfulnessProgram[];
  challenge?: Spa2MindfulnessChallenge;
} = {}) {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Benefits */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Lợi ích" title="Khoa học về chánh niệm" />
          <Grid container spacing={3}>
            {benefits.map((b) => (
              <Grid key={b.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={b.icon} width={44} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {b.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {b.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Programs */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle
            eyebrow="Lớp học"
            title="Chương trình hàng tuần"
            subtitle="Tham gia lớp học trực tiếp tại spa hoặc online — linh hoạt theo lịch của bạn."
          />
          <Grid container spacing={3}>
            {programs.map((p) => (
              <Grid key={p.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ p: 0, overflow: 'hidden', bgcolor: 'common.white' }}>
                  <Box
                    sx={{
                      height: 160,
                      backgroundImage: `url(${p.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <Chip
                      label={p.level}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: SPA2_INK,
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Box sx={{ p: 2.5 }}>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
                      {p.name}
                    </Typography>
                    <Stack spacing={0.5} sx={{ mb: 2 }}>
                      {[
                        { icon: 'solar:clock-circle-bold', text: `${p.duration} · ${p.schedule}` },
                        { icon: 'solar:user-bold', text: p.instructor },
                      ].map((i) => (
                        <Stack key={i.text} direction="row" spacing={1} alignItems="center">
                          <Iconify
                            icon={i.icon}
                            width={13}
                            sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                          />
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            {i.text}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL }}>
                        {p.price ? formatVND(p.price) : 'Miễn phí'}
                      </Typography>
                      <Button
                        size="small"
                        component={RouterLink}
                        href={paths.spa2.booking}
                        sx={{
                          borderRadius: 99,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          px: 1.5,
                          fontSize: 12,
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Đăng ký
                      </Button>
                    </Stack>
                  </Box>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 7-day challenge */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Card
            sx={{
              borderRadius: 5,
              overflow: 'hidden',
              border: `2px solid ${SPA2_TEAL}`,
              boxShadow: `0 16px 40px rgba(46,139,122,0.15)`,
            }}
          >
            <Box sx={{ bgcolor: SPA2_TEAL, p: 3, color: 'white', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                {challenge.title}
              </Typography>
              <Typography sx={{ opacity: 0.85, fontSize: 14 }}>{challenge.subtitle}</Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={1.5}>
                {challenge.days.map((d, i) => {
                  const done = i < challenge.completedDays;
                  return (
                    <Grid key={d} xs={12} sm={6}>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: done ? SPA2_CREAM : 'transparent',
                          border: `1px solid ${done ? SPA2_TEAL_LIGHT : SPA2_CREAM_DARK}`,
                        }}
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: done ? SPA2_TEAL : SPA2_CREAM_DARK,
                            color: done ? 'white' : 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </Box>
                        <Typography
                          sx={{ fontSize: 13, color: done ? SPA2_INK : 'text.secondary' }}
                        >
                          {d}
                        </Typography>
                        {done && (
                          <Iconify
                            icon="solar:check-circle-bold"
                            width={16}
                            sx={{ color: SPA2_TEAL, ml: 'auto' }}
                          />
                        )}
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
              <Button
                fullWidth
                sx={{
                  mt: 3,
                  borderRadius: 99,
                  py: 1.4,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                {challenge.buttonLabel}
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>

      <GradientCta
        title="Bắt đầu hành trình cân bằng tâm trí"
        sub="Kết hợp yoga & spa — ưu đãi 15% cho combo lớp học + liệu trình."
        btnLabel="Xem ưu đãi"
        href={paths.spa2.booking}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 5. MEDICAL SPA (THẨM MỸ Y KHOA)
// ══════════════════════════════════════════════════════════

// NOTE: the medical-spa banner, credentials bar, treatment categories and
// treatment catalog are shared with the dashboard "manage" view - the
// single source of truth lives in src/_mock/_spa2 (imported above as
// spa2MedicalSpaBanner/spa2MedicalSpaCredentials/spa2MedicalSpaCategories/
// spa2MedicalTreatments).

export function Spa2MedicalSpaPageView({
  banner = spa2MedicalSpaBanner,
  credentials = spa2MedicalSpaCredentials,
  categories = spa2MedicalSpaCategories,
  treatments = spa2MedicalTreatments,
}: {
  banner?: Spa2MedicalSpaBanner;
  credentials?: Spa2MedicalSpaCredential[];
  categories?: Spa2MedicalSpaCategory[];
  treatments?: Spa2MedicalTreatment[];
} = {}) {
  const [catFilter, setCatFilter] = useState('all');
  const [selected, setSelected] = useState<Spa2MedicalTreatment | null>(null);

  const filtered =
    catFilter === 'all' ? treatments : treatments.filter((t) => t.category === catFilter);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Credentials bar */}
      <Box sx={{ py: 2.5, bgcolor: SPA2_INK }}>
        <Container>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 1.5, sm: 4 }}
            flexWrap="wrap"
          >
            {credentials.map((i) => (
              <Stack key={i.id} direction="row" spacing={1} alignItems="center">
                <Iconify icon={i.icon} width={16} sx={{ color: SPA2_TEAL_LIGHT }} />
                <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                  {i.text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {categories.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                onClick={() => setCatFilter(c.value)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: catFilter === c.value ? SPA2_TEAL : 'transparent',
                  color: catFilter === c.value ? 'white' : 'text.secondary',
                  border: `1.5px solid ${catFilter === c.value ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((t) => (
              <Grid key={t.id} xs={12} sm={6} md={4}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => setSelected(t)}>
                  <SoftCard>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 3,
                        bgcolor: SPA2_CREAM,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Iconify icon={t.icon} width={24} sx={{ color: SPA2_TEAL }} />
                    </Box>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75, fontSize: 15 }}>
                      {t.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                    >
                      {t.desc.slice(0, 90)}...
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.75 }}>
                      <Chip
                        label={t.sessions}
                        size="small"
                        sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                      />
                      <Chip
                        label={`Downtime: ${t.downtime}`}
                        size="small"
                        sx={{
                          bgcolor: t.downtime === 'Không' ? '#E8F5E9' : '#FFF8EE',
                          color: t.downtime === 'Không' ? '#2E7D32' : '#854F0B',
                          fontSize: 11,
                        }}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 15 }}>
                        {formatVND(t.price)}
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          borderRadius: 99,
                          fontSize: 12,
                          color: SPA2_TEAL_DARK,
                          border: `1px solid ${SPA2_TEAL}`,
                        }}
                      >
                        Chi tiết
                      </Button>
                    </Stack>
                  </SoftCard>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Detail dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selected && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setSelected(null)}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  bgcolor: SPA2_CREAM,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Iconify icon={selected.icon} width={26} sx={{ color: SPA2_TEAL }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: SPA2_INK }}>
                  {selected.name}
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
                  {selected.certifications.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      size="small"
                      sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2, fontSize: 14 }}>
              {selected.desc}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {[
                { label: 'Số buổi', value: selected.sessions },
                { label: 'Thời gian hồi phục', value: selected.downtime },
              ].map((i) => (
                <Grid key={i.label} xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: SPA2_CREAM, borderRadius: 2 }}>
                    <Typography sx={{ fontSize: 11, color: 'text.secondary', mb: 0.25 }}>
                      {i.label}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 13 }}>
                      {i.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {[
                {
                  label: 'Trước điều trị',
                  value: selected.before,
                  icon: 'solar:info-circle-bold',
                  color: '#0C447C',
                },
                {
                  label: 'Sau điều trị',
                  value: selected.after,
                  icon: 'solar:check-circle-bold',
                  color: SPA2_TEAL,
                },
              ].map((i) => (
                <Grid key={i.label} xs={6}>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Iconify
                      icon={i.icon}
                      width={15}
                      sx={{ color: i.color, flexShrink: 0, mt: '2px' }}
                    />
                    <Box>
                      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                        {i.label}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: SPA2_INK }}>{i.value}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontSize: 12 }}>
              Bắt buộc tư vấn bác sĩ 1-1 trước khi thực hiện bất kỳ liệu trình nào.
            </Alert>
            <Stack direction="row" spacing={1.5}>
              <Button
                fullWidth
                component={RouterLink}
                href={paths.spa2.booking}
                sx={{
                  borderRadius: 99,
                  py: 1.3,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Đặt lịch tư vấn
              </Button>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: SPA2_TEAL,
                  alignSelf: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {formatVND(selected.price)}
              </Typography>
            </Stack>
          </DialogContent>
        )}
      </Dialog>

      <GradientCta
        title="Khám phá vẻ đẹp không giới hạn"
        sub="Tư vấn bác sĩ miễn phí — không áp lực, không cam kết."
        btnLabel="Đặt tư vấn ngay"
        href={paths.spa2.contact}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 6. SPA ETIQUETTE (HƯỚNG DẪN LẦN ĐẦU)
// ══════════════════════════════════════════════════════════

export function Spa2SpaEtiquettePageView({
  banner = spa2SpaEtiquetteBanner,
  guides = spa2EtiquetteGuides,
  dos = spa2EtiquetteDos,
  donts = spa2EtiquetteDonts,
  offer = spa2EtiquetteOffer,
}: {
  banner?: Spa2SpaEtiquetteBanner;
  guides?: Spa2EtiquetteGuide[];
  dos?: Spa2EtiquetteRule[];
  donts?: Spa2EtiquetteRule[];
  offer?: Spa2EtiquetteOffer;
} = {}) {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Step guide */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Hướng dẫn" title="8 điều nên biết khi đến spa" />
          <Grid container spacing={3}>
            {guides.map((g, i) => (
              <Grid key={g.id} xs={12} sm={6} md={3}>
                <SoftCard>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Iconify icon={g.icon} width={20} sx={{ color: SPA2_TEAL }} />
                  </Stack>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75, fontSize: 14 }}>
                    {g.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {g.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Do & Don't */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Quy tắc ứng xử" title="Nên và không nên" />
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: `1.5px solid #A5D6A7`,
                  boxShadow: 'none',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ bgcolor: '#2E7D32', p: 2, color: 'white' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Iconify icon="solar:check-circle-bold" width={20} />
                    <Typography sx={{ fontWeight: 600 }}>Nên làm</Typography>
                  </Stack>
                </Box>
                <Stack spacing={0}>
                  {dos.map((d, i) => (
                    <Stack
                      key={d.id}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        bgcolor: i % 2 ? '#F1F8E9' : 'white',
                        borderBottom: i < dos.length - 1 ? `1px solid #E8F5E9` : 'none',
                      }}
                    >
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={15}
                        sx={{ color: '#2E7D32', flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{d.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 4,
                  border: `1.5px solid #FFCDD2`,
                  boxShadow: 'none',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ bgcolor: '#C62828', p: 2, color: 'white' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Iconify icon="solar:close-circle-bold" width={20} />
                    <Typography sx={{ fontWeight: 600 }}>Không nên</Typography>
                  </Stack>
                </Box>
                <Stack spacing={0}>
                  {donts.map((d, i) => (
                    <Stack
                      key={d.id}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        bgcolor: i % 2 ? '#FFF5F5' : 'white',
                        borderBottom: i < donts.length - 1 ? `1px solid #FFEBEE` : 'none',
                      }}
                    >
                      <Iconify
                        icon="solar:close-circle-bold"
                        width={15}
                        sx={{ color: '#C62828', flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{d.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* First-timer offer */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 5,
              border: `2px solid ${SPA2_TEAL}`,
              boxShadow: `0 16px 40px rgba(46,139,122,0.15)`,
              overflow: 'hidden',
            }}
          >
            <Box sx={{ bgcolor: SPA2_TEAL, p: 3, color: 'white', textAlign: 'center' }}>
              <Iconify icon="solar:gift-bold" width={36} sx={{ mb: 1 }} />
              <Typography variant="h5">{offer.title}</Typography>
            </Box>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                {offer.description}
              </Typography>
              <Box
                sx={{
                  bgcolor: SPA2_CREAM,
                  border: `1.5px dashed ${SPA2_TEAL}`,
                  borderRadius: 3,
                  p: 2,
                  mb: 3,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 22, color: SPA2_TEAL, letterSpacing: 3 }}
                >
                  {offer.code}
                </Typography>
              </Box>
              <Button
                fullWidth
                component={RouterLink}
                href={paths.spa2.booking}
                sx={{
                  borderRadius: 99,
                  py: 1.4,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                {offer.buttonLabel}
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 7. LOYALTY REWARDS (ĐỔI ĐIỂM THƯỞNG)
// ══════════════════════════════════════════════════════════

export function Spa2LoyaltyRewardsPageView({
  banner = spa2LoyaltyRewardsBanner,
  pointsBalance = spa2LoyaltyPointsBalance,
  earnRules = spa2LoyaltyEarnRules,
  categories = spa2LoyaltyRewardCategories,
  rewards = spa2LoyaltyRewards,
}: {
  banner?: Spa2LoyaltyRewardsBanner;
  pointsBalance?: number;
  earnRules?: Spa2LoyaltyEarnRule[];
  categories?: Spa2LoyaltyRewardCategory[];
  rewards?: Spa2LoyaltyReward[];
} = {}) {
  const [cat, setCat] = useState('all');
  const [redeeming, setRedeeming] = useState<Spa2LoyaltyReward | null>(null);
  const [redeemed, setRedeemed] = useState(false);
  const POINTS_BALANCE = pointsBalance;

  const filtered = cat === 'all' ? rewards : rewards.filter((r) => r.category === cat);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Points balance */}
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container>
          <Card
            sx={{
              p: 0,
              borderRadius: 4,
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
              color: 'white',
            }}
          >
            <Grid container>
              <Grid xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRight: { md: `1px solid rgba(255,255,255,0.15)` },
                    borderBottom: { xs: `1px solid rgba(255,255,255,0.15)`, md: 'none' },
                  }}
                >
                  <Typography sx={{ opacity: 0.8, fontSize: 13, mb: 1 }}>
                    Điểm tích lũy của bạn
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight: 700 }}>
                    {POINTS_BALANCE.toLocaleString()}
                  </Typography>
                  <Typography sx={{ opacity: 0.75, fontSize: 13 }}>
                    điểm · tương đương {formatVND(POINTS_BALANCE * 1000)}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={8}>
                <Box sx={{ p: 3 }}>
                  <Typography sx={{ opacity: 0.8, fontSize: 13, mb: 1.5 }}>
                    Cách kiếm thêm điểm
                  </Typography>
                  <Grid container spacing={1.5}>
                    {earnRules.map((i) => (
                      <Grid key={i.id} xs={6} sm={3}>
                        <Box
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.12)',
                            borderRadius: 2,
                            p: 1.5,
                            textAlign: 'center',
                          }}
                        >
                          <Typography sx={{ fontSize: 11, opacity: 0.8, mb: 0.25 }}>
                            {i.label}
                          </Typography>
                          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{i.ratio}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>

      {/* Catalog */}
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {categories.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                onClick={() => setCat(c.value)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: cat === c.value ? SPA2_TEAL : 'transparent',
                  color: cat === c.value ? 'white' : 'text.secondary',
                  border: `1.5px solid ${cat === c.value ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((r) => {
              const canRedeem = POINTS_BALANCE >= r.points;
              return (
                <Grid key={r.id} xs={12} sm={6} md={3}>
                  <SoftCard sx={{ p: 0, overflow: 'hidden', opacity: canRedeem ? 1 : 0.65 }}>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          height: 160,
                          backgroundImage: `url(${r.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          bgcolor: SPA2_INK,
                          color: 'white',
                          borderRadius: 99,
                          px: 1.5,
                          py: 0.5,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <Iconify icon="solar:star-bold" width={12} />
                        <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                          {r.points} điểm
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
                        {r.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5 }}>
                        Còn lại: {r.stock} phần thưởng
                      </Typography>
                      <Button
                        fullWidth
                        size="small"
                        disabled={!canRedeem}
                        onClick={() => {
                          setRedeeming(r);
                          setRedeemed(false);
                        }}
                        sx={{
                          borderRadius: 99,
                          py: 1,
                          bgcolor: canRedeem ? SPA2_TEAL : 'action.disabledBackground',
                          color: canRedeem ? 'white' : 'text.disabled',
                          fontSize: 13,
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          '&.Mui-disabled': { color: 'text.disabled' },
                        }}
                      >
                        {canRedeem ? 'Đổi ngay' : `Thiếu ${r.points - POINTS_BALANCE} điểm`}
                      </Button>
                    </Box>
                  </SoftCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Redeem dialog */}
      <Dialog
        open={!!redeeming}
        onClose={() => setRedeeming(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {redeeming && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setRedeeming(null)}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            {!redeemed ? (
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ color: SPA2_INK }}>
                  Xác nhận đổi điểm
                </Typography>
                <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 0.5 }}>
                    {redeeming.name}
                  </Typography>
                  <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                        Trừ điểm
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: 'error.main' }}>
                        -{redeeming.points}
                      </Typography>
                    </Box>
                    <Iconify
                      icon="solar:arrow-right-bold"
                      sx={{ color: 'text.secondary', alignSelf: 'center' }}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                        Còn lại
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL }}>
                        {POINTS_BALANCE - redeeming.points}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Button
                  fullWidth
                  onClick={() => setRedeemed(true)}
                  sx={{
                    borderRadius: 99,
                    py: 1.4,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  Xác nhận đổi
                </Button>
              </Stack>
            ) : (
              <Stack alignItems="center" spacing={2} sx={{ py: 3, textAlign: 'center' }}>
                <Iconify icon="solar:check-circle-bold" width={48} sx={{ color: SPA2_TEAL }} />
                <Typography variant="h6" sx={{ color: SPA2_INK }}>
                  Đổi thưởng thành công!
                </Typography>
                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                  Voucher đã được gửi qua email. Xuất trình tại quầy lễ tân khi đến.
                </Typography>
                <Button
                  onClick={() => setRedeeming(null)}
                  sx={{ borderRadius: 99, bgcolor: SPA2_TEAL, color: 'white', px: 4 }}
                >
                  Đóng
                </Button>
              </Stack>
            )}
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 8. REVIEW PAGE (GỬI ĐÁNH GIÁ)
// ══════════════════════════════════════════════════════════

export function Spa2ReviewPageView({
  banner = spa2ReviewBanner,
  ratingAspects = spa2ReviewAspects,
  stats = spa2ReviewStats,
}: {
  banner?: Spa2ReviewBanner;
  ratingAspects?: Spa2ReviewAspect[];
  stats?: Spa2ReviewStats;
} = {}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [form, setForm] = useState({
    service: '',
    branch: '',
    title: '',
    comment: '',
    recommend: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const LABELS: Record<number, string> = {
    1: 'Rất tệ',
    2: 'Tệ',
    3: 'Bình thường',
    4: 'Tốt',
    5: 'Tuyệt vời!',
  };
  const [aspects, setAspects] = useState(ratingAspects.map((a) => ({ ...a, value: 0 })));

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero3
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {!submitted ? (
            <Grid container spacing={4}>
              <Grid xs={12} md={7}>
                <Stack spacing={4}>
                  {/* Overall rating */}
                  <SoftCard>
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                      Đánh giá tổng thể
                    </Typography>
                    <Stack alignItems="center" spacing={1.5}>
                      <Rating
                        value={rating}
                        size="large"
                        onChange={(_, v) => setRating(v ?? 0)}
                        onChangeActive={(_, v) => setHover(v)}
                        sx={{ fontSize: 48, '& .MuiRating-icon': { color: '#EF9F27' } }}
                      />
                      {(hover !== -1 || rating !== 0) && (
                        <Chip
                          label={LABELS[hover !== -1 ? hover : rating]}
                          sx={{ bgcolor: '#FFF8EE', color: '#854F0B', fontWeight: 600 }}
                        />
                      )}
                    </Stack>
                  </SoftCard>

                  {/* Aspect ratings */}
                  <SoftCard>
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2.5 }}>
                      Đánh giá chi tiết
                    </Typography>
                    <Stack spacing={2.5}>
                      {aspects.map((a, i) => (
                        <Stack key={a.id} direction="row" alignItems="center" spacing={2}>
                          <Typography sx={{ fontSize: 13.5, color: SPA2_INK, minWidth: 160 }}>
                            {a.label}
                          </Typography>
                          <Rating
                            value={a.value}
                            onChange={(_, v) => {
                              const next = [...aspects];
                              next[i].value = v ?? 0;
                              setAspects(next);
                            }}
                            size="small"
                            sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                          />
                        </Stack>
                      ))}
                    </Stack>
                  </SoftCard>

                  {/* Form */}
                  <SoftCard>
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                      Thông tin chi tiết
                    </Typography>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        size="small"
                        select
                        label="Dịch vụ đã sử dụng"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                      >
                        {spa2Services.map((s: any) => (
                          <MenuItem key={s.slug} value={s.name}>
                            {s.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        fullWidth
                        size="small"
                        select
                        label="Chi nhánh"
                        value={form.branch}
                        onChange={(e) => setForm({ ...form, branch: e.target.value })}
                      >
                        {[
                          'Quận 1, TP.HCM',
                          'Hồ Tây, Hà Nội',
                          'Biển Mỹ Khê, Đà Nẵng',
                          'Nha Trang',
                        ].map((b) => (
                          <MenuItem key={b} value={b}>
                            {b}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        fullWidth
                        size="small"
                        label="Tiêu đề đánh giá"
                        placeholder="Tóm tắt ngắn gọn trải nghiệm của bạn"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Nội dung đánh giá"
                        placeholder="Chia sẻ chi tiết về trải nghiệm — điều bạn thích, điều có thể cải thiện..."
                        value={form.comment}
                        onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      />

                      {/* Photo upload */}
                      <Box>
                        <Typography sx={{ fontSize: 13, color: SPA2_INK, mb: 1 }}>
                          Thêm ảnh (tuỳ chọn)
                        </Typography>
                        <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ gap: 1 }}>
                          {photos.map((_, i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 72,
                                height: 72,
                                borderRadius: 2,
                                bgcolor: SPA2_CREAM,
                                border: `1px solid ${SPA2_CREAM_DARK}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Iconify
                                icon="solar:gallery-bold"
                                width={28}
                                sx={{ color: SPA2_TEAL }}
                              />
                            </Box>
                          ))}
                          {photos.length < 5 && (
                            <Button
                              component="label"
                              sx={{
                                width: 72,
                                height: 72,
                                borderRadius: 2,
                                border: `1.5px dashed ${SPA2_TEAL}`,
                                color: SPA2_TEAL,
                                minWidth: 0,
                                p: 0,
                                flexDirection: 'column',
                                gap: 0.5,
                                fontSize: 11,
                              }}
                            >
                              <Iconify icon="solar:camera-add-bold" width={22} />
                              Thêm
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                multiple
                                onChange={() => setPhotos((p) => [...p, 'photo'])}
                              />
                            </Button>
                          )}
                        </Stack>
                      </Box>

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={form.recommend}
                            onChange={(e) => setForm({ ...form, recommend: e.target.checked })}
                            sx={{ color: SPA2_TEAL, '&.Mui-checked': { color: SPA2_TEAL } }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: 13.5 }}>
                            Tôi sẽ giới thiệu Nature Spa cho bạn bè và gia đình
                          </Typography>
                        }
                      />

                      <Button
                        fullWidth
                        size="large"
                        disabled={!rating || !form.comment}
                        onClick={() => setSubmitted(true)}
                        sx={{
                          borderRadius: 999,
                          py: 1.5,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          '&.Mui-disabled': { bgcolor: SPA2_CREAM_DARK },
                        }}
                      >
                        Gửi đánh giá
                      </Button>
                    </Stack>
                  </SoftCard>
                </Stack>
              </Grid>

              {/* Sidebar – community stats */}
              <Grid xs={12} md={5}>
                <Stack spacing={3} sx={{ position: 'sticky', top: 100 }}>
                  <SoftCard>
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                      Cộng đồng đánh giá
                    </Typography>
                    <Stack alignItems="center" spacing={0.5} sx={{ mb: 2.5 }}>
                      <Typography variant="h2" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                        {stats.average}
                      </Typography>
                      <Rating
                        value={stats.average}
                        readOnly
                        precision={0.1}
                        sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                      />
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        Từ {stats.total.toLocaleString('vi-VN')} đánh giá
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      {stats.distribution.map((row) => (
                        <Stack key={row.star} direction="row" spacing={1.5} alignItems="center">
                          <Typography sx={{ fontSize: 12, color: 'text.secondary', minWidth: 12 }}>
                            {row.star}
                          </Typography>
                          <Iconify icon="solar:star-bold" width={12} sx={{ color: '#EF9F27' }} />
                          <LinearProgress
                            variant="determinate"
                            value={row.percent}
                            sx={{
                              flex: 1,
                              height: 7,
                              borderRadius: 99,
                              bgcolor: SPA2_CREAM_DARK,
                              '& .MuiLinearProgress-bar': { bgcolor: '#EF9F27' },
                            }}
                          />
                          <Typography sx={{ fontSize: 12, color: 'text.secondary', minWidth: 30 }}>
                            {row.percent}%
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </SoftCard>

                  <SoftCard>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 2, fontSize: 14 }}>
                      Đánh giá gần đây
                    </Typography>
                    <Stack spacing={2}>
                      {spa2Feedbacks.slice(0, 3).map((f) => (
                        <Box key={f.name}>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            sx={{ mb: 0.75 }}
                          >
                            <Avatar src={f.avatar} sx={{ width: 32, height: 32 }} />
                            <Box>
                              <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                                {f.name}
                              </Typography>
                              <Rating
                                value={f.rating}
                                readOnly
                                size="small"
                                sx={{ fontSize: 12, '& .MuiRating-icon': { color: '#EF9F27' } }}
                              />
                            </Box>
                          </Stack>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: 'text.secondary',
                              fontStyle: 'italic',
                              lineHeight: 1.6,
                            }}
                          >
                            &ldquo;{f.comment.slice(0, 80)}...&rdquo;
                          </Typography>
                          <Divider sx={{ mt: 1.5 }} />
                        </Box>
                      ))}
                    </Stack>
                  </SoftCard>
                </Stack>
              </Grid>
            </Grid>
          ) : (
            <Stack alignItems="center" spacing={3} sx={{ py: 8 }}>
              <Box
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  bgcolor: SPA2_CREAM,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:check-circle-bold" width={56} sx={{ color: SPA2_TEAL }} />
              </Box>
              <Typography variant="h4" sx={{ color: SPA2_INK, textAlign: 'center' }}>
                Cảm ơn bạn đã đánh giá!
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  maxWidth: 440,
                  lineHeight: 1.7,
                }}
              >
                Đánh giá của bạn sẽ được kiểm duyệt và đăng lên trong vòng 24 giờ. Bạn nhận được{' '}
                <strong style={{ color: SPA2_TEAL }}>50 điểm thưởng</strong> cho đánh giá này.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  component={RouterLink}
                  href={paths.spa2.booking}
                  sx={{
                    borderRadius: 99,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    px: 4,
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  Đặt lịch tiếp
                </Button>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setRating(0);
                  }}
                  sx={{
                    borderRadius: 99,
                    color: SPA2_TEAL_DARK,
                    border: `1.5px solid ${SPA2_TEAL}`,
                    px: 4,
                  }}
                >
                  Đánh giá khác
                </Button>
              </Stack>
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 9. SEASONAL PACKAGES
// ══════════════════════════════════════════════════════════

const SEASONAL_PACKAGES = [
  {
    season: 'Hè 2026',
    period: 'Tháng 6 – 8',
    icon: '☀️',
    color: '#FF8F00',
    accent: '#FFF8E1',
    bg: 'linear-gradient(135deg, #FFB300 0%, #E65100 100%)',
    packages: [
      {
        name: 'Summer Glow Facial',
        price: 990000,
        desc: 'Làm sạch, dưỡng ẩm và phục hồi da sau nắng hè — đặc trị tia UV.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      },
      {
        name: 'Cool Body Wrap',
        price: 890000,
        desc: 'Ủ dưỡng toàn thân với bạc hà và dưa leo — mát lạnh tức thì.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      },
    ],
  },
  {
    season: 'Thu 2026',
    period: 'Tháng 9 – 11',
    icon: '🍂',
    color: '#795548',
    accent: '#FBE9E7',
    bg: 'linear-gradient(135deg, #A1887F 0%, #4E342E 100%)',
    packages: [
      {
        name: 'Autumn Harvest Scrub',
        price: 1090000,
        desc: 'Tẩy da chết với muối hồng Himalaya và dầu quả bí đỏ — mềm mại đón thu.',
        image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80',
      },
      {
        name: 'Mid-Autumn Gift Set',
        price: 3900000,
        desc: 'Bộ quà tặng cao cấp mùa Trung Thu — tặng người thân ý nghĩa.',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
      },
    ],
  },
  {
    season: 'Đông 2026',
    period: 'Tháng 12',
    icon: '❄️',
    color: '#1565C0',
    accent: '#E3F2FD',
    bg: 'linear-gradient(135deg, #42A5F5 0%, #1565C0 100%)',
    packages: [
      {
        name: 'Winter Warmth Ritual',
        price: 1290000,
        desc: 'Massage nến ấm, đá lăn mặt lạnh — nghi thức cân bằng nhiệt cho mùa đông.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      },
      {
        name: 'New Year Detox',
        price: 4590000,
        desc: 'Chào năm mới với cơ thể thanh lọc hoàn toàn — gói detox 3 ngày.',
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
      },
    ],
  },
  {
    season: 'Xuân 2027',
    period: 'Tháng 1 – 3',
    icon: '🌸',
    color: '#C2185B',
    accent: '#FCE4EC',
    bg: 'linear-gradient(135deg, #F48FB1 0%, #C2185B 100%)',
    packages: [
      {
        name: 'Spring Renewal Facial',
        price: 1190000,
        desc: 'Facial phục hồi & sáng da đón Xuân — hồng hào như hoa đào.',
        image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80',
      },
      {
        name: 'Tết Luxury Package',
        price: 5900000,
        desc: 'Trọn gói sang trọng đón Tết — tặng kèm hamper quà độc quyền.',
        image: 'https://images.unsplash.com/photo-1531112068337-3cd6d0d2b56b?w=800&q=80',
      },
    ],
  },
];

export function Spa2SeasonalPackagePageView() {
  const [activeSeason, setActiveSeason] = useState(0);
  const season = SEASONAL_PACKAGES[activeSeason];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Dynamic hero */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
          background: season.bg,
          transition: 'background 0.5s ease',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.07)',
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center', color: 'white' }}>
          <Typography sx={{ fontSize: 64, lineHeight: 1, mb: 1 }}>{season.icon}</Typography>
          <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.85 }}>
            GÓI THEO MÙA
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 600, lineHeight: 1.1, my: 1.5 }}>
            Đặc biệt {season.season}
          </Typography>
          <Typography sx={{ opacity: 0.85, fontSize: 17, maxWidth: 500, mx: 'auto', mb: 3 }}>
            {season.period} — Ưu đãi có hạn, đừng bỏ lỡ!
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            {SEASONAL_PACKAGES.map((s, i) => (
              <Button
                key={s.season}
                onClick={() => setActiveSeason(i)}
                sx={{
                  borderRadius: 99,
                  px: 2.5,
                  py: 0.75,
                  bgcolor: i === activeSeason ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)',
                  color: i === activeSeason ? season.color : 'white',
                  fontSize: 13,
                  fontWeight: i === activeSeason ? 700 : 400,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.85)' },
                  transition: 'all .2s',
                }}
              >
                {s.icon} {s.season.split(' ')[0]}
              </Button>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle
            eyebrow={season.season}
            title={`Gói đặc biệt ${season.season}`}
            subtitle={`Áp dụng trong giai đoạn ${season.period}. Số lượng có hạn — đặt sớm để có ưu đãi tốt nhất.`}
          />

          <Grid container spacing={4}>
            {season.packages.map((pkg) => (
              <Grid key={pkg.name} xs={12} sm={6}>
                <Card
                  sx={{
                    borderRadius: 5,
                    overflow: 'hidden',
                    border: `2px solid ${season.color}22`,
                    boxShadow: `0 16px 40px rgba(0,0,0,0.1)`,
                  }}
                >
                  <Box
                    sx={{
                      height: 260,
                      backgroundImage: `url(${pkg.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)`,
                      }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                      <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                        {pkg.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                      {pkg.desc}
                    </Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack>
                        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                          Giá đặc biệt mùa {season.season.split(' ')[0]}
                        </Typography>
                        <Typography variant="h5" sx={{ color: season.color, fontWeight: 700 }}>
                          {formatVND(pkg.price)}
                        </Typography>
                      </Stack>
                      <Button
                        component={RouterLink}
                        href={paths.spa2.booking}
                        sx={{
                          borderRadius: 99,
                          px: 3.5,
                          bgcolor: season.color,
                          color: 'white',
                          '&:hover': { opacity: 0.88, bgcolor: season.color },
                        }}
                      >
                        Đặt ngay
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Other seasons preview */}
          <Box sx={{ mt: 8 }}>
            <SectionTitle eyebrow="Sắp đến" title="Gói sắp ra mắt" />
            <Grid container spacing={3}>
              {SEASONAL_PACKAGES.filter((_, i) => i !== activeSeason).map((s) => (
                <Grid key={s.season} xs={12} sm={4}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                      boxShadow: 'none',
                    }}
                    onClick={() => setActiveSeason(SEASONAL_PACKAGES.indexOf(s))}
                  >
                    <Box
                      sx={{
                        height: 120,
                        background: s.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        color: 'white',
                        gap: 0.5,
                      }}
                    >
                      <Typography sx={{ fontSize: 36 }}>{s.icon}</Typography>
                      <Typography sx={{ fontWeight: 600 }}>{s.season}</Typography>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: s.accent }}>
                      <Typography
                        sx={{ fontSize: 12, color: 'text.secondary', textAlign: 'center' }}
                      >
                        {s.period} · {s.packages.length} gói ưu đãi
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <GradientCta
        title="Ưu đãi theo mùa — số lượng có hạn"
        sub="Đặt lịch sớm để đảm bảo suất và giá tốt nhất trong mùa."
        btnLabel="Đặt ngay"
        href={paths.spa2.booking}
      />
    </Box>
  );
}
