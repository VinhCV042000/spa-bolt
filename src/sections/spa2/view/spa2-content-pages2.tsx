import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import StepLabel from '@mui/material/StepLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import ToggleButton from '@mui/material/ToggleButton';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import { spa2ImageBackgroundStyle } from '../spa2-image-utils';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Events,
  spa2Services,
  SPA2_TEAL_DARK,
  spa2ShopBanner,
  type Spa2Event,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
  spa2ShopProducts,
  spa2EventsBanner,
  spa2ReferralSteps,
  spa2AppDownloadQr,
  spa2GiftCardBanner,
  spa2WellnessAddons,
  spa2ShopCategories,
  spa2CorporatePlans,
  spa2SkinQuizBanner,
  spa2ReferralBanner,
  spa2GiftCardReasons,
  spa2GiftCardDesigns,
  spa2MembershipTiers,
  spa2CorporateBanner,
  spa2SkinQuizResults,
  spa2ReferralProgram,
  spa2EventCategories,
  spa2AppDownloadHero,
  spa2MembershipBanner,
  spa2WellnessPackages,
  type Spa2ShopProduct,
  spa2CorporateBenefits,
  spa2SkinQuizQuestions,
  type Spa2ShopCategory,
  type Spa2EventsBanner,
  type Spa2ReferralStep,
  spa2AppDownloadStores,
  type Spa2WellnessAddon,
  type Spa2CorporatePlan,
  type Spa2EventCategory,
  spa2AppDownloadCompats,
  spa2AppDownloadScreens,
  type Spa2AppDownloadQr,
  spa2AppDownloadReviews,
  type Spa2GiftCardDesign,
  type Spa2GiftCardReason,
  type Spa2MembershipTier,
  type Spa2SkinQuizResult,
  spa2ReferralLeaderboard,
  spa2SustainabilityStats,
  type Spa2ReferralBanner,
  spa2AppDownloadFeatures,
  type Spa2AdjustableImage,
  spa2SustainabilityBanner,
  type Spa2ReferralProgram,
  type Spa2AppDownloadHero,
  spa2MembershipCompareRows,
  spa2WellnessPackageBanner,
  spa2GiftCardDenominations,
  type Spa2CorporateBenefit,
  type Spa2SkinQuizQuestion,
  type Spa2AppDownloadStore,
  spa2AppDownloadRatingStats,
  type Spa2AppDownloadCompat,
  type Spa2AppDownloadReview,
  type Spa2SustainabilityStat,
  type Spa2AppDownloadFeature,
  type Spa2WellnessPackageItem,
  spa2CorporateServiceChannels,
  spa2SustainabilityMilestones,
  type Spa2MembershipCompareRow,
  spa2SustainabilityCommitments,
  type Spa2SustainabilityBanner,
  type Spa2AppDownloadRatingStat,
  type Spa2CorporateServiceChannel,
  type Spa2SustainabilityMilestone,
  type Spa2ReferralLeaderboardEntry,
  type Spa2SustainabilityCommitment,
} from '../spa2-pages-data';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// ─────────────────────────────────────────────────────
// SHARED BLOCKS
// ─────────────────────────────────────────────────────

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

export function Spa2ContentPageHero({
  img,
  imageStyle,
  eyebrow,
  title,
  subtitle,
  cta,
}: {
  img: string;
  imageStyle?: Spa2AdjustableImage;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta?: React.ReactNode;
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: SPA2_CREAM,
        pt: { xs: 10, md: 14 },
        pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.07,
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
            sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1, maxWidth: 720 }}
          >
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 17, maxWidth: 560 }}>
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

// ─────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────

// Membership tiers/compare-rows, gift-card denominations/designs/reasons,
// wellness packages/add-ons and skin-quiz/corporate/shop content are shared
// with the dashboard "manage" views - the single source of truth for them
// lives in src/_mock/_spa2 (imported above as spa2MembershipTiers/
// spa2MembershipCompareRows/spa2GiftCardDenominations/spa2GiftCardDesigns/
// spa2WellnessPackages/spa2WellnessAddons/spa2SkinQuizQuestions/
// spa2SkinQuizResults/spa2CorporatePlans/spa2ShopProducts/etc.).

// NOTE: sustainability green stats/commitments/milestones, events, the
// referral program/steps/leaderboard, and the app-download hero/store
// badges/rating stats/screens/features/QR section are all shared with the
// dashboard "manage" views - the single source of truth for them lives in
// src/_mock/_spa2 (imported above as spa2SustainabilityStats/
// spa2SustainabilityCommitments/spa2SustainabilityMilestones/spa2Events/
// spa2ReferralProgram/spa2ReferralSteps/spa2ReferralLeaderboard/
// spa2AppDownloadHero/spa2AppDownloadStores/spa2AppDownloadRatingStats/
// spa2AppDownloadScreens/spa2AppDownloadFeatures/spa2AppDownloadQr/
// spa2AppDownloadCompats).

// ══════════════════════════════════════════════════════════════
// 1. MEMBERSHIP
// ══════════════════════════════════════════════════════════════

export function Spa2MembershipPageView({
  banner = spa2MembershipBanner,
  tiers = spa2MembershipTiers,
  compareRows = spa2MembershipCompareRows,
}: {
  banner?: typeof spa2MembershipBanner;
  tiers?: Spa2MembershipTier[];
  compareRows?: Spa2MembershipCompareRow[];
} = {}) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [toast, setToast] = useState('');

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
        cta={
          <ToggleButtonGroup
            value={billing}
            exclusive
            onChange={(_, v) => v && setBilling(v)}
            sx={{
              bgcolor: 'common.white',
              borderRadius: 99,
              p: 0.5,
              border: `1px solid ${SPA2_CREAM_DARK}`,
            }}
          >
            <ToggleButton
              value="monthly"
              sx={{
                borderRadius: 99,
                px: 3,
                border: 'none',
                '&.Mui-selected': { bgcolor: SPA2_TEAL, color: 'white' },
              }}
            >
              Hàng tháng
            </ToggleButton>
            <ToggleButton
              value="yearly"
              sx={{
                borderRadius: 99,
                px: 3,
                border: 'none',
                '&.Mui-selected': { bgcolor: SPA2_TEAL, color: 'white' },
              }}
            >
              Hàng năm{' '}
              <Chip
                label="-20%"
                size="small"
                sx={{ ml: 1, bgcolor: '#E8F5E9', color: '#2E7D32', fontSize: 11 }}
              />
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />

      {/* Tier cards */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={3} alignItems="stretch">
            {tiers.map((tier) => {
              const price = billing === 'yearly' ? Math.round(tier.price * 12 * 0.8) : tier.price;
              return (
                <Grid key={tier.id} xs={12} md={4}>
                  <Card
                    sx={{
                      p: 0,
                      borderRadius: 5,
                      overflow: 'hidden',
                      height: '100%',
                      border: tier.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
                      boxShadow: tier.hot ? `0 20px 48px rgba(46,139,122,0.2)` : 'none',
                      transform: tier.hot ? { md: 'scale(1.03)' } : undefined,
                    }}
                  >
                    {tier.hot && (
                      <Box
                        sx={{
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          textAlign: 'center',
                          py: 0.75,
                          fontSize: 12,
                          fontWeight: 700,
                          letterSpacing: 1,
                        }}
                      >
                        PHỔ BIẾN NHẤT
                      </Box>
                    )}
                    <Box
                      sx={{
                        bgcolor: tier.accent,
                        p: 3,
                        borderBottom: `1px solid ${SPA2_CREAM_DARK}`,
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '50%',
                            bgcolor: tier.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon="solar:crown-bold" width={22} sx={{ color: 'white' }} />
                        </Box>
                        <Typography variant="h5" sx={{ color: SPA2_INK, fontWeight: 700 }}>
                          {tier.name}
                        </Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
                        {tier.desc}
                      </Typography>
                      {price === 0 ? (
                        <Typography variant="h3" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                          Miễn phí
                        </Typography>
                      ) : (
                        <Stack direction="row" alignItems="baseline" spacing={0.5}>
                          <Typography variant="h3" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                            {formatVND(price)}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                            / {billing === 'yearly' ? 'năm' : 'tháng'}
                          </Typography>
                        </Stack>
                      )}
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Stack spacing={1.25} sx={{ mb: 3 }}>
                        {tier.perks.map((p) => (
                          <Stack key={p} direction="row" spacing={1.5} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              width={16}
                              sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                            />
                            <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{p}</Typography>
                          </Stack>
                        ))}
                        {tier.notIncluded.map((p) => (
                          <Stack key={p} direction="row" spacing={1.5} alignItems="center">
                            <Iconify
                              icon="solar:close-circle-bold"
                              width={16}
                              sx={{ color: 'text.disabled', flexShrink: 0 }}
                            />
                            <Typography sx={{ fontSize: 13.5, color: 'text.disabled' }}>
                              {p}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        fullWidth
                        onClick={() => setToast(`Đã đăng ký gói ${tier.name}!`)}
                        sx={{
                          borderRadius: 999,
                          py: 1.4,
                          bgcolor: tier.hot ? SPA2_TEAL : 'transparent',
                          color: tier.hot ? 'white' : SPA2_TEAL_DARK,
                          border: tier.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                          '&:hover': { bgcolor: SPA2_TEAL_DARK, color: 'white' },
                        }}
                      >
                        {tier.price === 0 ? 'Tham gia miễn phí' : `Đăng ký ${tier.name}`}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Compare table */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="So sánh" title="Chi tiết quyền lợi các hạng thẻ" />
          <Card
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              border: `1px solid ${SPA2_CREAM_DARK}`,
              boxShadow: 'none',
            }}
          >
            <Box sx={{ overflowX: 'auto' }}>
              <Box
                component="table"
                sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}
              >
                <Box component="thead">
                  <Box component="tr" sx={{ bgcolor: SPA2_INK }}>
                    <Box
                      component="th"
                      sx={{
                        p: 2,
                        textAlign: 'left',
                        color: 'white',
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      Quyền lợi
                    </Box>
                    {tiers.map((t) => (
                      <Box
                        component="th"
                        key={t.id}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          color: t.hot ? SPA2_TEAL_LIGHT : 'rgba(255,255,255,0.8)',
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {t.name}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box component="tbody">
                  {compareRows.map((row, i) => (
                    <Box
                      component="tr"
                      key={row.feature}
                      sx={{
                        bgcolor: i % 2 ? SPA2_CREAM : 'white',
                        '&:hover': { bgcolor: '#F0FAF8' },
                      }}
                    >
                      <Box
                        component="td"
                        sx={{ p: 1.75, fontSize: 13, color: SPA2_INK, fontWeight: 500 }}
                      >
                        {row.feature}
                      </Box>
                      {(['silver', 'gold', 'platinum'] as const).map((tier) => (
                        <Box
                          component="td"
                          key={tier}
                          sx={{
                            p: 1.75,
                            textAlign: 'center',
                            fontSize: 13,
                            color: row[tier] === '—' ? 'text.disabled' : 'text.secondary',
                          }}
                        >
                          {row[tier] === '✓' ? (
                            <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                          ) : (
                            row[tier]
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>

      <GradientCta
        title="Bắt đầu hành trình thành viên ngay hôm nay"
        sub="Đăng ký trong 1 phút – hưởng ưu đãi ngay lập tức."
        btnLabel="Đăng ký ngay"
        href={paths.spa2.booking}
      />
      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast('')}
        message={toast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
// 2. GIFT CARD
// ══════════════════════════════════════════════════════════════

export function Spa2GiftCardPageView({
  banner = spa2GiftCardBanner,
  denominations = spa2GiftCardDenominations,
  designs = spa2GiftCardDesigns,
  reasons = spa2GiftCardReasons,
}: {
  banner?: typeof spa2GiftCardBanner;
  denominations?: number[];
  designs?: Spa2GiftCardDesign[];
  reasons?: Spa2GiftCardReason[];
} = {}) {
  const [amount, setAmount] = useState(denominations[2] ?? denominations[0] ?? 0);
  const [custom, setCustom] = useState('');
  const [design, setDesign] = useState(0);
  const [form, setForm] = useState({
    senderName: '',
    receiverName: '',
    receiverEmail: '',
    message: '',
  });
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const DESIGNS = designs;

  const finalAmount = custom ? parseInt(custom, 10) * 1000 : amount;

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {!sent ? (
            <Grid container spacing={5}>
              <Grid xs={12} md={7}>
                <Stepper activeStep={step} orientation="vertical">
                  {/* Step 1 – Mệnh giá */}
                  <Step expanded={step >= 0}>
                    <StepLabel StepIconProps={{ sx: { color: SPA2_TEAL } }}>
                      Chọn mệnh giá
                    </StepLabel>
                    <StepContent>
                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
                        {denominations.map((d) => (
                          <Chip
                            key={d}
                            label={formatVND(d)}
                            onClick={() => {
                              setAmount(d);
                              setCustom('');
                            }}
                            sx={{
                              cursor: 'pointer',
                              height: 38,
                              fontSize: 14,
                              bgcolor: amount === d && !custom ? SPA2_TEAL : 'transparent',
                              color: amount === d && !custom ? 'white' : 'text.secondary',
                              border: `1.5px solid ${amount === d && !custom ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                            }}
                          />
                        ))}
                      </Stack>
                      <TextField
                        size="small"
                        label="Mệnh giá tùy chỉnh (nghìn đ)"
                        type="number"
                        value={custom}
                        onChange={(e) => {
                          setCustom(e.target.value);
                          setAmount(0);
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">K</InputAdornment>,
                        }}
                        sx={{ maxWidth: 240, mb: 2 }}
                      />
                      <Button
                        onClick={() => setStep(1)}
                        sx={{
                          borderRadius: 99,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          px: 3,
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Tiếp theo
                      </Button>
                    </StepContent>
                  </Step>
                  {/* Step 2 – Thiết kế */}
                  <Step expanded={step >= 1}>
                    <StepLabel StepIconProps={{ sx: { color: step >= 1 ? SPA2_TEAL : undefined } }}>
                      Chọn thiết kế
                    </StepLabel>
                    <StepContent>
                      <Stack direction="row" spacing={1.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        {DESIGNS.map((d, i) => (
                          <Box
                            key={d.label}
                            onClick={() => setDesign(i)}
                            sx={{
                              width: 80,
                              height: 52,
                              borderRadius: 2,
                              background: d.bg,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 24,
                              border:
                                design === i ? `3px solid ${SPA2_INK}` : '3px solid transparent',
                              transition: 'border .15s',
                            }}
                          >
                            {d.emoji}
                          </Box>
                        ))}
                      </Stack>
                      <Stack direction="row" spacing={1.5}>
                        <Button
                          onClick={() => setStep(0)}
                          sx={{ borderRadius: 99, color: 'text.secondary' }}
                        >
                          Quay lại
                        </Button>
                        <Button
                          onClick={() => setStep(2)}
                          sx={{
                            borderRadius: 99,
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            px: 3,
                            '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          }}
                        >
                          Tiếp theo
                        </Button>
                      </Stack>
                    </StepContent>
                  </Step>
                  {/* Step 3 – Thông tin */}
                  <Step expanded={step >= 2}>
                    <StepLabel StepIconProps={{ sx: { color: step >= 2 ? SPA2_TEAL : undefined } }}>
                      Thông tin người nhận
                    </StepLabel>
                    <StepContent>
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Người tặng"
                            value={form.senderName}
                            onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Người nhận"
                            value={form.receiverName}
                            onChange={(e) => setForm({ ...form, receiverName: e.target.value })}
                          />
                        </Grid>
                        <Grid xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Email người nhận"
                            type="email"
                            value={form.receiverEmail}
                            onChange={(e) => setForm({ ...form, receiverEmail: e.target.value })}
                          />
                        </Grid>
                        <Grid xs={12}>
                          <TextField
                            fullWidth
                            size="small"
                            multiline
                            rows={3}
                            label="Lời chúc"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                          />
                        </Grid>
                      </Grid>
                      <Stack direction="row" spacing={1.5}>
                        <Button
                          onClick={() => setStep(1)}
                          sx={{ borderRadius: 99, color: 'text.secondary' }}
                        >
                          Quay lại
                        </Button>
                        <Button
                          onClick={() => setSent(true)}
                          sx={{
                            borderRadius: 99,
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            px: 4,
                            '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          }}
                        >
                          Gửi thẻ quà {finalAmount ? `– ${formatVND(finalAmount)}` : ''}
                        </Button>
                      </Stack>
                    </StepContent>
                  </Step>
                </Stepper>
              </Grid>

              {/* Preview card */}
              <Grid xs={12} md={5}>
                <Box sx={{ position: 'sticky', top: 100 }}>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>
                    Xem trước thẻ
                  </Typography>
                  <Box
                    sx={{
                      background: DESIGNS[design].bg,
                      borderRadius: 4,
                      p: 3.5,
                      color: 'white',
                      aspectRatio: '8/5',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 20px 48px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 11,
                            opacity: 0.75,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                          }}
                        >
                          Nature Spa
                        </Typography>
                        <Typography sx={{ fontSize: 11, opacity: 0.6 }}>Thẻ quà tặng</Typography>
                      </Box>
                      <Typography sx={{ fontSize: 30 }}>{DESIGNS[design].emoji}</Typography>
                    </Stack>
                    <Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {finalAmount ? formatVND(finalAmount) : '—'}
                      </Typography>
                      {form.receiverName && (
                        <Typography sx={{ fontSize: 13, opacity: 0.85 }}>
                          Kính tặng {form.receiverName}
                        </Typography>
                      )}
                      {form.message && (
                        <Typography
                          sx={{ fontSize: 12, opacity: 0.7, mt: 0.5, fontStyle: 'italic' }}
                        >
                          &ldquo;{form.message.slice(0, 60)}
                          {form.message.length > 60 ? '...' : ''}&rdquo;
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  <Typography
                    sx={{ fontSize: 12, color: 'text.disabled', mt: 1.5, textAlign: 'center' }}
                  >
                    HSD 12 tháng · Áp dụng tại tất cả chi nhánh
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Stack alignItems="center" spacing={3} sx={{ py: 8 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: SPA2_CREAM,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:check-circle-bold" width={48} sx={{ color: SPA2_TEAL }} />
              </Box>
              <Typography variant="h4" sx={{ color: SPA2_INK }}>
                Thẻ quà đã được gửi thành công!
              </Typography>
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 440 }}>
                Thẻ quà trị giá <strong>{formatVND(finalAmount)}</strong> đã được gửi đến{' '}
                <strong>{form.receiverEmail || 'người nhận'}</strong>.
              </Typography>
              <Button
                onClick={() => {
                  setSent(false);
                  setStep(0);
                }}
                sx={{
                  borderRadius: 99,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  px: 4,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Tặng thêm thẻ khác
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Lý do" title="Tại sao chọn thẻ quà Nature Spa?" />
          <Grid container spacing={3}>
            {reasons.map((r) => (
              <Grid key={r.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={r.icon} width={44} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {r.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{r.desc}</Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
// 3. WELLNESS PACKAGES
// ══════════════════════════════════════════════════════════════

export function Spa2WellnessPackagePageView({
  banner = spa2WellnessPackageBanner,
  packages = spa2WellnessPackages,
  addons = spa2WellnessAddons,
}: {
  banner?: typeof spa2WellnessPackageBanner;
  packages?: Spa2WellnessPackageItem[];
  addons?: Spa2WellnessAddon[];
} = {}) {
  const ADDONS = addons;

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Stack spacing={5}>
            {packages.map((pkg, idx) => (
              <Card
                key={pkg.name}
                sx={{
                  borderRadius: 5,
                  overflow: 'hidden',
                  border: pkg.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
                  boxShadow: pkg.hot ? `0 20px 48px rgba(46,139,122,0.15)` : 'none',
                }}
              >
                <Grid container>
                  <Grid xs={12} md={5} sx={{ order: { md: idx % 2 ? 2 : 1 } }}>
                    <Box
                      sx={{
                        height: { xs: 240, md: '100%' },
                        minHeight: { md: 300 },
                        backgroundImage: `url(${pkg.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                    >
                      {pkg.hot && (
                        <Chip
                          label="PHỔ BIẾN NHẤT"
                          sx={{
                            position: 'absolute',
                            top: 14,
                            left: 14,
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            fontWeight: 700,
                          }}
                        />
                      )}
                      <Chip
                        label={pkg.tag}
                        sx={{
                          position: 'absolute',
                          top: pkg.hot ? 52 : 14,
                          left: 14,
                          bgcolor: 'rgba(31,42,40,0.75)',
                          color: 'white',
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid xs={12} md={7} sx={{ order: { md: idx % 2 ? 1 : 2 } }}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                      <Typography variant="h4" sx={{ color: SPA2_INK, mb: 1.5 }}>
                        {pkg.name}
                      </Typography>
                      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                        <Chip
                          label={pkg.duration}
                          size="small"
                          icon={<Iconify icon="solar:clock-circle-bold" width={13} />}
                          sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                        />
                        <Chip
                          label={formatVND(pkg.price)}
                          size="small"
                          sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700 }}
                        />
                      </Stack>
                      <Typography
                        sx={{ fontSize: 13, color: 'text.secondary', mb: 1, fontWeight: 600 }}
                      >
                        Bao gồm:
                      </Typography>
                      <Grid container spacing={1} sx={{ mb: 3 }}>
                        {pkg.includes.map((inc) => (
                          <Grid key={inc} xs={12} sm={6}>
                            <CheckItem>{inc}</CheckItem>
                          </Grid>
                        ))}
                      </Grid>
                      <Stack direction="row" spacing={1.5}>
                        <Button
                          component={RouterLink}
                          href={paths.spa2.booking}
                          sx={{
                            borderRadius: 999,
                            px: 3.5,
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          }}
                        >
                          Đặt gói ngay
                        </Button>
                        <Button
                          sx={{
                            borderRadius: 999,
                            px: 3,
                            color: SPA2_TEAL_DARK,
                            border: `1.5px solid ${SPA2_TEAL}`,
                          }}
                        >
                          Xem chi tiết
                        </Button>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Tuỳ chọn thêm" title="Nâng cấp trải nghiệm của bạn" />
          <Grid container spacing={2}>
            {ADDONS.map((a) => (
              <Grid key={a.name} xs={6} sm={4} md={2}>
                <SoftCard sx={{ textAlign: 'center', py: 2.5 }}>
                  <Iconify icon={a.icon} width={30} sx={{ color: SPA2_TEAL, mb: 1 }} />
                  <Typography sx={{ fontSize: 12.5, color: SPA2_INK, fontWeight: 500, mb: 0.5 }}>
                    {a.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: SPA2_TEAL_DARK, fontWeight: 700 }}>
                    {a.price ? `+${formatVND(a.price)}` : 'Miễn phí'}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <GradientCta
        title="Dành trọn một ngày cho bản thân"
        sub="Tặng kèm trà thảo mộc & xông hơi đá muối cho mọi gói."
        btnLabel="Đặt lịch ngay"
        href={paths.spa2.booking}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
// 4. SKIN QUIZ
// ══════════════════════════════════════════════════════════════

export function Spa2SkinQuizPageView({
  banner = spa2SkinQuizBanner,
  questions = spa2SkinQuizQuestions,
  results = spa2SkinQuizResults,
}: {
  banner?: typeof spa2SkinQuizBanner;
  questions?: Spa2SkinQuizQuestion[];
  results?: Spa2SkinQuizResult[];
} = {}) {
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<Spa2SkinQuizResult | null>(null);
  const [loading, setLoading] = useState(false);

  const pick = (optIdx: number) => {
    const next = [...answers, optIdx];
    if (qIdx < questions.length - 1) {
      setAnswers(next);
      setQIdx(qIdx + 1);
    } else {
      const tally = new Array(results.length).fill(0);
      next.forEach((a) => {
        tally[a] += 1;
      });
      const top = tally.indexOf(Math.max(...tally));
      setLoading(true);
      setTimeout(() => {
        setResult(results[top]);
        setLoading(false);
      }, 1800);
    }
  };

  const reset = () => {
    setQIdx(0);
    setAnswers([]);
    setResult(null);
  };
  const progress =
    ((qIdx + (answers.length === questions.length ? 1 : 0)) / questions.length) * 100;

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm">
          {!result && !loading && (
            <Card
              sx={{
                borderRadius: 5,
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: 'none',
                overflow: 'hidden',
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 5,
                  bgcolor: SPA2_CREAM_DARK,
                  '& .MuiLinearProgress-bar': { bgcolor: SPA2_TEAL },
                }}
              />
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                    Câu {qIdx + 1} / {questions.length}
                  </Typography>
                  {qIdx > 0 && (
                    <Button
                      size="small"
                      onClick={() => {
                        setQIdx(qIdx - 1);
                        setAnswers(answers.slice(0, -1));
                      }}
                      sx={{ color: 'text.secondary', fontSize: 12 }}
                    >
                      ← Câu trước
                    </Button>
                  )}
                </Stack>
                <Typography variant="h5" sx={{ color: SPA2_INK, mb: 3, lineHeight: 1.4 }}>
                  {questions[qIdx].question}
                </Typography>
                <Stack spacing={1.5}>
                  {questions[qIdx].options.map((opt, i) => (
                    <Button
                      key={opt}
                      fullWidth
                      onClick={() => pick(i)}
                      sx={{
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        py: 1.8,
                        px: 2.5,
                        borderRadius: 3,
                        border: `1.5px solid ${SPA2_CREAM_DARK}`,
                        color: SPA2_INK,
                        bgcolor: 'transparent',
                        '&:hover': {
                          bgcolor: SPA2_CREAM,
                          borderColor: SPA2_TEAL,
                          color: SPA2_TEAL_DARK,
                        },
                        transition: 'all .15s',
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: SPA2_CREAM_DARK,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </Box>
                      {opt}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Card>
          )}

          {loading && (
            <Stack alignItems="center" spacing={3} sx={{ py: 8 }}>
              <CircularProgress sx={{ color: SPA2_TEAL }} size={56} />
              <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 500 }}>
                Đang phân tích kết quả...
              </Typography>
            </Stack>
          )}

          {result && (
            <Stack spacing={3}>
              <Card
                sx={{
                  borderRadius: 5,
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                  boxShadow: 'none',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ bgcolor: SPA2_TEAL, p: 4, color: 'white', textAlign: 'center' }}>
                  <Iconify icon={result.icon} width={56} sx={{ mb: 1.5 }} />
                  <Typography variant="h4">Bạn có {result.type}</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Alert
                    severity="info"
                    sx={{ mb: 3, borderRadius: 2.5, bgcolor: '#EBF5FF', color: '#0C447C' }}
                  >
                    {result.desc}
                  </Alert>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1.5, fontSize: 14 }}>
                    Liệu trình được gợi ý:
                  </Typography>
                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    {result.services.map((s) => {
                      const srv = spa2Services.find((x: any) => x.name === s);
                      return (
                        <Stack
                          key={s}
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            p: 1.75,
                            borderRadius: 2.5,
                            bgcolor: SPA2_CREAM,
                            border: `1px solid ${SPA2_CREAM_DARK}`,
                          }}
                        >
                          {srv && (
                            <Iconify
                              icon={srv.icon}
                              width={22}
                              sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                            />
                          )}
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: 14, fontWeight: 500, color: SPA2_INK }}>
                              {s}
                            </Typography>
                            {srv && (
                              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                                {srv.duration} · {formatVND(srv.price)}
                              </Typography>
                            )}
                          </Box>
                          {srv && (
                            <Button
                              component={RouterLink}
                              href={paths.spa2.serviceDetails(srv.slug)}
                              size="small"
                              sx={{ borderRadius: 99, color: SPA2_TEAL_DARK, fontSize: 12 }}
                            >
                              Xem
                            </Button>
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      fullWidth
                      component={RouterLink}
                      href={paths.spa2.booking}
                      sx={{
                        borderRadius: 999,
                        py: 1.4,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      Đặt lịch tư vấn
                    </Button>
                    <Button
                      fullWidth
                      onClick={reset}
                      sx={{
                        borderRadius: 999,
                        py: 1.4,
                        color: SPA2_TEAL_DARK,
                        border: `1.5px solid ${SPA2_TEAL}`,
                      }}
                    >
                      Làm lại
                    </Button>
                  </Stack>
                </Box>
              </Card>
              <Alert severity="warning" sx={{ borderRadius: 3 }}>
                Kết quả chỉ mang tính tham khảo. Vui lòng đặt lịch tư vấn trực tiếp với KTV tại
                Nature Spa để chẩn đoán chính xác.
              </Alert>
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
// 5. CORPORATE WELLNESS
// ══════════════════════════════════════════════════════════════

export function Spa2CorporatePageView({
  banner = spa2CorporateBanner,
  benefits = spa2CorporateBenefits,
  plans = spa2CorporatePlans,
  serviceChannels = spa2CorporateServiceChannels,
}: {
  banner?: typeof spa2CorporateBanner;
  benefits?: Spa2CorporateBenefit[];
  plans?: Spa2CorporatePlan[];
  serviceChannels?: Spa2CorporateServiceChannel[];
} = {}) {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Lợi ích" title="Tại sao đầu tư vào sức khỏe nhân viên?" />
          <Grid container spacing={3}>
            {benefits.map((b) => (
              <Grid key={b.id} xs={12} sm={6} md={3}>
                <SoftCard>
                  <Iconify icon={b.icon} width={44} sx={{ color: SPA2_TEAL, mb: 2 }} />
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1 }}>
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

      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Gói dịch vụ" title="Chọn gói phù hợp với doanh nghiệp của bạn" />
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid key={plan.id} xs={12} md={4}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    border: plan.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: plan.hot ? `0 16px 40px rgba(46,139,122,0.18)` : 'none',
                    transform: plan.hot ? { md: 'scale(1.03)' } : undefined,
                  }}
                >
                  {plan.hot && (
                    <Box
                      sx={{
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        textAlign: 'center',
                        py: 0.75,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}
                    >
                      PHỔ BIẾN NHẤT
                    </Box>
                  )}
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ color: SPA2_INK, mb: 0.5 }}>
                      {plan.name}
                    </Typography>
                    <Chip
                      label={plan.members}
                      size="small"
                      sx={{ mb: 2, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                    />
                    <Box sx={{ mb: 2 }}>
                      {plan.price === 0 ? (
                        <Typography variant="h4" sx={{ color: SPA2_TEAL }}>
                          Liên hệ báo giá
                        </Typography>
                      ) : (
                        <Stack direction="row" alignItems="baseline" spacing={0.5}>
                          <Typography variant="h4" sx={{ color: SPA2_TEAL }}>
                            {formatVND(plan.price)}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                            /{plan.period}
                          </Typography>
                        </Stack>
                      )}
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={1.25} sx={{ mb: 3 }}>
                      {plan.perks.map((p) => (
                        <CheckItem key={p}>{p}</CheckItem>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      component={RouterLink}
                      href={paths.spa2.contact}
                      sx={{
                        borderRadius: 999,
                        py: 1.4,
                        bgcolor: plan.hot ? SPA2_TEAL : 'transparent',
                        color: plan.hot ? 'white' : SPA2_TEAL_DARK,
                        border: plan.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                        '&:hover': { bgcolor: SPA2_TEAL_DARK, color: 'white' },
                      }}
                    >
                      {plan.price === 0 ? 'Liên hệ tư vấn' : 'Đăng ký dùng thử'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Dịch vụ" title="Những gì chúng tôi cung cấp" />
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              mb: 3,
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
            }}
          >
            {serviceChannels.map((c) => (
              <Tab key={c.id} label={c.label} sx={{ textTransform: 'none' }} />
            ))}
          </Tabs>
          {serviceChannels[tab]?.items.map((item) => (
            <Stack
              key={item}
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ py: 1.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}
            >
              <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
              <Typography sx={{ fontSize: 14, color: SPA2_INK }}>{item}</Typography>
            </Stack>
          ))}
        </Container>
      </Box>

      <GradientCta
        title="Bắt đầu chương trình wellness cho doanh nghiệp"
        sub="Đội ngũ tư vấn sẽ thiết kế chương trình phù hợp nhất."
        btnLabel="Liên hệ ngay"
        href={paths.spa2.contact}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
// 6. SHOP
// ══════════════════════════════════════════════════════════════

export function Spa2ShopPageView({
  banner = spa2ShopBanner,
  categories = spa2ShopCategories,
  products = spa2ShopProducts,
}: {
  banner?: typeof spa2ShopBanner;
  categories?: Spa2ShopCategory[];
  products?: Spa2ShopProduct[];
} = {}) {
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('popular');
  const [cart, setCart] = useState<string[]>([]);
  const [toast, setToast] = useState('');

  const filtered = useMemo(() => {
    let list = products;
    if (cat !== 'all') list = list.filter((p) => p.category === cat);
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, cat, sort]);

  const addToCart = (name: string) => {
    setCart((c) => [...c, name]);
    setToast(`Đã thêm "${name}" vào giỏ hàng`);
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Card
            sx={{
              p: 2.5,
              mb: 4,
              borderRadius: 3,
              border: `1px solid ${SPA2_CREAM_DARK}`,
              boxShadow: 'none',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ sm: 'center' }}
            >
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, flex: 1 }}>
                {categories.map((c) => (
                  <Chip
                    key={c.value}
                    label={c.label}
                    onClick={() => setCat(c.value)}
                    sx={{
                      cursor: 'pointer',
                      height: 32,
                      bgcolor: cat === c.value ? SPA2_TEAL : 'transparent',
                      color: cat === c.value ? 'white' : 'text.secondary',
                      border: `1.5px solid ${cat === c.value ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                    }}
                  />
                ))}
              </Stack>
              <TextField
                select
                size="small"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                sx={{ minWidth: 160 }}
                label="Sắp xếp"
              >
                <MenuItem value="popular">Phổ biến nhất</MenuItem>
                <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                <MenuItem value="price-desc">Giá giảm dần</MenuItem>
              </TextField>
              <Badge badgeContent={cart.length} color="error">
                <Button
                  startIcon={<Iconify icon="solar:cart-bold" />}
                  sx={{
                    borderRadius: 99,
                    border: `1.5px solid ${SPA2_CREAM_DARK}`,
                    color: SPA2_INK,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Giỏ hàng
                </Button>
              </Badge>
            </Stack>
          </Card>

          <Grid container spacing={3}>
            {filtered.map((p) => (
              <Grid key={p.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        height: 200,
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    {p.tag && (
                      <Chip
                        label={p.tag}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          fontWeight: 700,
                        }}
                      />
                    )}
                    <IconButton
                      onClick={() => addToCart(p.name)}
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'common.white',
                        boxShadow: '0 2px 8px rgba(0,0,0,.15)',
                        '&:hover': { bgcolor: SPA2_CREAM },
                      }}
                      aria-label="Thêm vào giỏ"
                    >
                      <Iconify icon="solar:cart-plus-bold" width={20} sx={{ color: SPA2_TEAL }} />
                    </IconButton>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: SPA2_INK,
                        mb: 0.5,
                        fontSize: 14,
                        lineHeight: 1.4,
                      }}
                    >
                      {p.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 1.5 }}>
                      <Rating
                        value={p.rating}
                        readOnly
                        size="small"
                        precision={0.1}
                        sx={{ fontSize: 14 }}
                      />
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        ({p.reviews})
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 15 }}>
                        {formatVND(p.price)}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => addToCart(p.name)}
                        sx={{
                          borderRadius: 99,
                          fontSize: 12,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          px: 1.5,
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Mua ngay
                      </Button>
                    </Stack>
                  </Box>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
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

// ══════════════════════════════════════════════════════════════
// 7. SUSTAINABILITY
// ══════════════════════════════════════════════════════════════

export function Spa2SustainabilityPageView({
  banner = spa2SustainabilityBanner,
  stats = spa2SustainabilityStats,
  commitments = spa2SustainabilityCommitments,
  milestones = spa2SustainabilityMilestones,
}: {
  banner?: Spa2SustainabilityBanner;
  stats?: Spa2SustainabilityStat[];
  commitments?: Spa2SustainabilityCommitment[];
  milestones?: Spa2SustainabilityMilestone[];
} = {}) {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: SPA2_TEAL }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {stats.map((s) => (
              <Grid key={s.id} xs={6} sm={4} md={2}>
                <Stack alignItems="center" sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.8 }}>{s.label}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Hành động" title="6 cam kết xanh của chúng tôi" />
          <Grid container spacing={3}>
            {commitments.map((c) => (
              <Grid key={c.id} xs={12} sm={6} md={4}>
                <SoftCard>
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        bgcolor: SPA2_CREAM,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={c.icon} width={28} sx={{ color: SPA2_TEAL }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 20 }}>
                        {c.value}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                        {c.label}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {c.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {c.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Hành trình" title="Các cột mốc xanh" />
          <Stack spacing={0}>
            {milestones.map((m, i) => (
              <Stack key={m.id} direction="row" spacing={2.5}>
                <Stack alignItems="center" sx={{ width: 72, flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: m.pending ? SPA2_CREAM_DARK : SPA2_TEAL,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: m.pending ? `2px dashed ${SPA2_TEAL}` : 'none',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 700, fontSize: 12, color: m.pending ? SPA2_TEAL : 'white' }}
                    >
                      {m.year}
                    </Typography>
                  </Box>
                  {i < milestones.length - 1 && (
                    <Box sx={{ width: 2, flex: 1, bgcolor: SPA2_CREAM_DARK, my: 0.5 }} />
                  )}
                </Stack>
                <Box sx={{ pb: 4 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{m.title}</Typography>
                    {m.pending && (
                      <Chip
                        label="Sắp đến"
                        size="small"
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
                      />
                    )}
                  </Stack>
                  <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
                    {m.desc}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      <GradientCta
        title="Cùng chúng tôi bảo vệ hành tinh"
        sub="Mỗi lịch hẹn bạn đặt = 1 cây xanh được trồng tại rừng phòng hộ."
        btnLabel="Đặt lịch & trồng cây"
        href={paths.spa2.booking}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
// 8. EVENTS
// ══════════════════════════════════════════════════════════════

export function Spa2EventsPageView({
  banner = spa2EventsBanner,
  categories = spa2EventCategories,
  events = spa2Events,
}: {
  banner?: Spa2EventsBanner;
  categories?: Spa2EventCategory[];
  events?: Spa2Event[];
} = {}) {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Spa2Event | null>(null);
  const [registered, setRegistered] = useState(false);

  const filtered = filter === 'all' ? events : events.filter((e) => e.category === filter);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {categories.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                onClick={() => setFilter(c.value)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: filter === c.value ? SPA2_TEAL : 'transparent',
                  color: filter === c.value ? 'white' : 'text.secondary',
                  border: `1.5px solid ${filter === c.value ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((ev) => {
              const pct = Math.round((ev.booked / ev.seats) * 100);
              const full = ev.booked >= ev.seats;
              return (
                <Grid key={ev.id} xs={12} sm={6} md={4}>
                  <SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          height: 190,
                          backgroundImage: `url(${ev.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <Chip
                        label={ev.price ? formatVND(ev.price) : 'Miễn phí'}
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          bgcolor: ev.price ? SPA2_TEAL : '#2E7D32',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      />
                      {full && (
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Chip
                            label="HẾT CHỖ"
                            sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 700 }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: SPA2_INK,
                          mb: 1,
                          fontSize: 14.5,
                          lineHeight: 1.4,
                        }}
                      >
                        {ev.title}
                      </Typography>
                      <Stack spacing={0.5} sx={{ mb: 2 }}>
                        {[
                          { icon: 'solar:calendar-bold', text: `${ev.date} · ${ev.time}` },
                          { icon: 'solar:map-point-bold', text: ev.location },
                        ].map((i) => (
                          <Stack key={i.text} direction="row" spacing={1} alignItems="center">
                            <Iconify
                              icon={i.icon}
                              width={14}
                              sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                            />
                            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                              {i.text}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Box sx={{ mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            Chỗ trống: {ev.seats - ev.booked}/{ev.seats}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: pct >= 90 ? 'error.main' : SPA2_TEAL,
                              fontWeight: 500,
                            }}
                          >
                            {pct}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 5,
                            borderRadius: 99,
                            bgcolor: SPA2_CREAM_DARK,
                            '& .MuiLinearProgress-bar': {
                              bgcolor: pct >= 90 ? 'error.main' : SPA2_TEAL,
                            },
                          }}
                        />
                      </Box>
                      <Button
                        fullWidth
                        disabled={full}
                        onClick={() => {
                          setSelected(ev);
                          setRegistered(false);
                        }}
                        sx={{
                          borderRadius: 99,
                          py: 1.2,
                          bgcolor: full ? 'action.disabledBackground' : SPA2_TEAL,
                          color: full ? 'text.disabled' : 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        {full ? 'Hết chỗ' : 'Đăng ký tham gia'}
                      </Button>
                    </Box>
                  </SoftCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selected && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setSelected(null)}
              sx={{ position: 'absolute', top: 12, right: 12 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            {!registered ? (
              <>
                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5, pr: 3 }}>
                  {selected.title}
                </Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
                  {selected.date} · {selected.location}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <TextField fullWidth size="small" label="Họ và tên" />
                  <TextField fullWidth size="small" label="Số điện thoại" />
                  <TextField fullWidth size="small" label="Email" />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ p: 1.5, bgcolor: SPA2_CREAM, borderRadius: 2 }}
                  >
                    <Typography sx={{ fontSize: 14, color: SPA2_INK }}>Phí tham dự</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: SPA2_TEAL }}>
                      {selected.price ? formatVND(selected.price) : 'Miễn phí'}
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    onClick={() => setRegistered(true)}
                    sx={{
                      borderRadius: 99,
                      py: 1.4,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    Xác nhận đăng ký
                  </Button>
                </Stack>
              </>
            ) : (
              <Stack alignItems="center" spacing={2} sx={{ py: 3, textAlign: 'center' }}>
                <Iconify icon="solar:check-circle-bold" width={48} sx={{ color: SPA2_TEAL }} />
                <Typography variant="h6" sx={{ color: SPA2_INK }}>
                  Đăng ký thành công!
                </Typography>
                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                  Thông tin xác nhận đã được gửi qua email. Hẹn gặp bạn tại sự kiện!
                </Typography>
                <Button
                  onClick={() => setSelected(null)}
                  sx={{
                    borderRadius: 99,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    px: 4,
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
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

// ══════════════════════════════════════════════════════════════
// 9. REFERRAL
// ══════════════════════════════════════════════════════════════

export function Spa2ReferralPageView({
  banner = spa2ReferralBanner,
  program = spa2ReferralProgram,
  steps = spa2ReferralSteps,
  leaderboard = spa2ReferralLeaderboard,
}: {
  banner?: Spa2ReferralBanner;
  program?: Spa2ReferralProgram;
  steps?: Spa2ReferralStep[];
  leaderboard?: Spa2ReferralLeaderboardEntry[];
} = {}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(program.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const RANK_ICONS = ['🥇', '🥈', '🥉'];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Spa2ContentPageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 5,
              overflow: 'hidden',
              border: `2px solid ${SPA2_TEAL}`,
              boxShadow: `0 20px 48px rgba(46,139,122,0.18)`,
              mb: 4,
            }}
          >
            <Box sx={{ bgcolor: SPA2_TEAL, p: 3, color: 'white', textAlign: 'center' }}>
              <Iconify icon="solar:users-group-rounded-bold-duotone" width={44} sx={{ mb: 1 }} />
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                Mã giới thiệu của bạn
              </Typography>
              <Typography sx={{ opacity: 0.85, fontSize: 14 }}>
                Chia sẻ để nhận {formatVND(program.rewardPerReferral)} / người
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: SPA2_CREAM,
                  border: `1.5px dashed ${SPA2_TEAL}`,
                  borderRadius: 3,
                  p: 2,
                  mb: 2.5,
                }}
              >
                <Typography
                  sx={{
                    flex: 1,
                    fontWeight: 700,
                    fontSize: 22,
                    color: SPA2_TEAL,
                    letterSpacing: 3,
                    textAlign: 'center',
                  }}
                >
                  {program.code}
                </Typography>
                <IconButton
                  onClick={copy}
                  sx={{
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  <Iconify
                    icon={copied ? 'solar:check-circle-bold' : 'solar:copy-bold'}
                    width={18}
                  />
                </IconButton>
              </Box>
              {copied && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 2.5 }}>
                  Đã sao chép mã!
                </Alert>
              )}
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>
                Chia sẻ qua:
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {[
                  { label: 'Zalo', icon: 'solar:chat-round-dots-bold' },
                  { label: 'Facebook', icon: 'solar:share-bold' },
                  { label: 'Sao chép link', icon: 'solar:link-bold' },
                ].map((s) => (
                  <Button
                    key={s.label}
                    startIcon={<Iconify icon={s.icon} width={16} />}
                    sx={{
                      flex: 1,
                      borderRadius: 99,
                      border: `1.5px solid ${SPA2_CREAM_DARK}`,
                      color: SPA2_INK,
                      fontSize: 12,
                      '&:hover': { bgcolor: SPA2_CREAM },
                    }}
                  >
                    {s.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Card>

          <Grid container spacing={2} sx={{ mb: 5 }}>
            {[
              {
                n: String(program.totalReferred),
                l: 'Người đã giới thiệu',
                icon: 'solar:users-group-bold',
              },
              {
                n: formatVND(program.totalEarned),
                l: 'Tổng thưởng nhận được',
                icon: 'solar:wallet-money-bold',
              },
            ].map((s) => (
              <Grid key={s.l} xs={6}>
                <SoftCard sx={{ textAlign: 'center', py: 2 }}>
                  <Iconify icon={s.icon} width={28} sx={{ color: SPA2_TEAL, mb: 0.75 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 18, color: SPA2_TEAL }}>
                    {s.n}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{s.l}</Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container>
          <SectionTitle eyebrow="Cách thức" title="3 bước đơn giản" />
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {steps.map((s, i) => (
              <Grid key={s.id} xs={12} md={4}>
                <SoftCard sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={s.icon} width={28} sx={{ color: 'white' }} />
                  </Box>
                  <Chip
                    label={`Bước ${i + 1}`}
                    size="small"
                    sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                  />
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1 }}>
                    {s.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
                    {s.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>

          <SectionTitle eyebrow="Bảng xếp hạng" title="Top người giới thiệu tháng này" />
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${SPA2_CREAM_DARK}`,
              boxShadow: 'none',
              overflow: 'hidden',
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            {leaderboard.map((u, i) => (
              <Stack
                key={u.id}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  px: 2.5,
                  py: 2,
                  bgcolor: u.highlight ? SPA2_CREAM : 'common.white',
                  borderBottom:
                    i < leaderboard.length - 1 ? `1px solid ${SPA2_CREAM_DARK}` : 'none',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: i < 3 ? ['#EF9F27', '#9E9E9E', '#CD7F32'][i] : 'text.disabled',
                    width: 30,
                  }}
                >
                  {i < 3 ? RANK_ICONS[i] : i + 1}
                </Typography>
                <Avatar
                  src={u.avatar}
                  sx={{ width: 38, height: 38, bgcolor: u.highlight ? SPA2_TEAL : undefined }}
                >
                  {u.highlight ? 'B' : undefined}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: u.highlight ? SPA2_TEAL : SPA2_INK,
                      fontSize: 14,
                    }}
                  >
                    {u.name}
                    {u.highlight ? ' (Bạn)' : ''}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                    {u.refs} người giới thiệu
                  </Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 14 }}>
                  {formatVND(u.earned)}
                </Typography>
              </Stack>
            ))}
          </Card>
        </Container>
      </Box>

      <GradientCta
        title="Chia sẻ ngay – nhận thưởng không giới hạn"
        sub="Không giới hạn số lượt. Thưởng về tài khoản trong 24h làm việc."
        btnLabel="Sao chép mã ngay"
        href="#"
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════════
// 10. APP DOWNLOAD
// ══════════════════════════════════════════════════════════════

export function Spa2AppDownloadPageView({
  hero = spa2AppDownloadHero,
  stores = spa2AppDownloadStores,
  ratingStats = spa2AppDownloadRatingStats,
  screens = spa2AppDownloadScreens,
  features = spa2AppDownloadFeatures,
  reviews = spa2AppDownloadReviews,
  qr = spa2AppDownloadQr,
  compats = spa2AppDownloadCompats,
}: {
  hero?: Spa2AppDownloadHero;
  stores?: Spa2AppDownloadStore[];
  ratingStats?: Spa2AppDownloadRatingStat[];
  screens?: string[];
  features?: Spa2AppDownloadFeature[];
  reviews?: Spa2AppDownloadReview[];
  qr?: Spa2AppDownloadQr;
  compats?: Spa2AppDownloadCompat[];
} = {}) {
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveScreen((p) => (p + 1) % screens.length), 2500);
    return () => clearInterval(t);
  }, [screens.length]);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Dark hero */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: SPA2_INK,
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            opacity: 0.08,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: -40,
            width: 280,
            height: 280,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL_LIGHT,
            opacity: 0.06,
          }}
        />
        <Container sx={{ position: 'relative' }}>
          <Grid container spacing={6} alignItems="center">
            <Grid xs={12} md={6}>
              <Stack spacing={2.5}>
                <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                  {hero.eyebrow}
                </Typography>
                <Typography variant="h1" sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1 }}>
                  {hero.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7 }}>
                  {hero.subtitle}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ pt: 1, gap: 1.5 }}>
                  {stores.map((s) => (
                    <Button
                      key={s.id}
                      startIcon={<Iconify icon={s.icon} width={24} />}
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.5,
                        bgcolor: 'white',
                        color: SPA2_INK,
                        fontWeight: 600,
                        '&:hover': { bgcolor: SPA2_CREAM },
                      }}
                    >
                      <Stack sx={{ textAlign: 'left' }}>
                        <Typography sx={{ fontSize: 10, lineHeight: 1, color: 'text.secondary' }}>
                          {s.sub}
                        </Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 700 }}>{s.store}</Typography>
                      </Stack>
                    </Button>
                  ))}
                </Stack>
                <Stack direction="row" spacing={3} sx={{ pt: 1 }}>
                  {ratingStats.map((s) => (
                    <Box key={s.id}>
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL_LIGHT, fontSize: 18 }}>
                        {s.n}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                        {s.l}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Box sx={{ position: 'relative', maxWidth: 300, mx: 'auto' }}>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '9/19.5',
                    borderRadius: '40px',
                    border: '8px solid rgba(255,255,255,0.12)',
                    overflow: 'hidden',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                    background: `url(${screens[activeScreen]}) center/cover`,
                    transition: 'background .5s ease',
                  }}
                />
                <Stack direction="row" spacing={0.75} justifyContent="center" sx={{ mt: 2 }}>
                  {screens.map((_, i) => (
                    <Box
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      onClick={() => setActiveScreen(i)}
                      sx={{
                        width: i === activeScreen ? 24 : 8,
                        height: 8,
                        borderRadius: 99,
                        bgcolor: i === activeScreen ? SPA2_TEAL : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                        transition: 'all .25s',
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle
            eyebrow="Tính năng"
            title="Tất cả trong một ứng dụng"
            subtitle="Được thiết kế để đặt lịch nhanh hơn, chăm sóc sức khỏe thông minh hơn."
          />
          <Grid container spacing={3}>
            {features.map((f) => (
              <Grid key={f.id} xs={12} sm={6} md={4}>
                <SoftCard>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: SPA2_CREAM,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={f.icon} width={28} sx={{ color: SPA2_TEAL }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {f.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
                    {f.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Reviews */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Đánh giá" title="Người dùng nói gì về app?" />
          <Grid container spacing={3}>
            {reviews.map((f) => (
              <Grid key={f.id} xs={12} sm={6} md={4}>
                <SoftCard sx={{ bgcolor: 'common.white' }}>
                  <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography
                    sx={{
                      color: SPA2_INK,
                      lineHeight: 1.7,
                      mb: 2,
                      fontStyle: 'italic',
                      fontSize: 14,
                    }}
                  >
                    &ldquo;{f.comment}&rdquo;
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={f.avatar} />
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                        {f.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {f.service}
                      </Typography>
                    </Box>
                  </Stack>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* QR */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 5,
              border: `1px solid ${SPA2_CREAM_DARK}`,
              boxShadow: 'none',
              p: { xs: 3, md: 4 },
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: SPA2_INK, mb: 1 }}>
              {qr.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, fontSize: 14 }}>
              {qr.subtitle}
            </Typography>
            <Box
              sx={{
                width: 140,
                height: 140,
                bgcolor: SPA2_CREAM,
                borderRadius: 3,
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                border: `3px solid ${SPA2_TEAL}`,
                ...(qr.image
                  ? {
                      backgroundImage: `url(${qr.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {}),
              }}
            >
              {!qr.image && (
                <Iconify icon="solar:qr-code-bold" width={80} sx={{ color: SPA2_TEAL }} />
              )}
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center">
              {compats.map((s) => (
                <Chip
                  key={s.id}
                  icon={<Iconify icon={s.icon} width={16} />}
                  label={s.label}
                  sx={{ bgcolor: SPA2_CREAM, color: SPA2_INK }}
                />
              ))}
            </Stack>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
