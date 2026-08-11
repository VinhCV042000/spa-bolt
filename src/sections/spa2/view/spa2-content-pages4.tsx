import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import { spa2ImageBackgroundStyle } from '../spa2-image-utils';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Services,
  spa2Branches,
  spa2VipRooms,
  SPA2_TEAL_DARK,
  spa2Consultants,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
  spa2PressAwards,
  spa2PressBanner,
  spa2VipRoomPerks,
  type Spa2VipRoom,
  spa2PressContact,
  spa2SuperfoodTips,
  spa2VipRoomBanner,
  spa2PressArticles,
  spa2SpaMenuBanner,
  spa2NutritionPlans,
  spa2NutritionStats,
  spa2AffiliateTiers,
  spa2AffiliateStats,
  spa2AffiliateSteps,
  spa2NutritionBanner,
  type Spa2Consultant,
  type Spa2PressAward,
  spa2AffiliateBanner,
  spa2SpaFinderBanner,
  spa2SpaMenuSections,
  type Spa2VipRoomPerk,
  type Spa2PressBanner,
  spa2NewsletterConfig,
  spa2NewsletterBanner,
  type Spa2SuperfoodTip,
  spa2AppointmentBanner,
  type Spa2PressArticle,
  type Spa2PressContact,
  type Spa2NutritionPlan,
  type Spa2NutritionStat,
  spa2ConsultationBanner,
  type Spa2VipRoomBanner,
  spa2AppointmentHistory,
  type Spa2AffiliateTier,
  type Spa2AffiliateStat,
  type Spa2AffiliateStep,
  spa2NewsletterBenefits,
  type Spa2SpaMenuBanner,
  spa2AppointmentUpcoming,
  type Spa2SpaMenuSection,
  spa2SpaFinderTherapists,
  type Spa2AdjustableImage,
  type Spa2NutritionBanner,
  spa2PackageBuilderBanner,
  type Spa2AffiliateBanner,
  type Spa2SpaFinderBanner,
  type Spa2NewsletterConfig,
  type Spa2NewsletterBanner,
  spa2NutritionQuizQuestions,
  type Spa2AppointmentRecord,
  type Spa2AppointmentBanner,
  type Spa2NewsletterBenefit,
  type Spa2ConsultationBanner,
  type Spa2SpaFinderTherapist,
  spa2AppointmentLoyaltyPoints,
  type Spa2PackageBuilderBanner,
  type Spa2NutritionQuizQuestion,
  spa2PackageBuilderDiscountTiers,
  type Spa2PackageBuilderDiscountTier,
} from '../spa2-pages-data';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// ─── SHARED ────────────────────────────────────────────────────────
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

function PageHero({
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

export { PageHero as Spa2ContentPageHero4 };

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

// ══════════════════════════════════════════════════════════
// 1. NUTRITION & DETOX
// ══════════════════════════════════════════════════════════

export function Spa2NutritionPageView({
  banner = spa2NutritionBanner,
  stats = spa2NutritionStats,
  plans = spa2NutritionPlans,
  superfoodTips = spa2SuperfoodTips,
  quiz = spa2NutritionQuizQuestions,
}: {
  banner?: Spa2NutritionBanner;
  stats?: Spa2NutritionStat[];
  plans?: Spa2NutritionPlan[];
  superfoodTips?: Spa2SuperfoodTip[];
  quiz?: Spa2NutritionQuizQuestion[];
} = {}) {
  const [selected, setSelected] = useState<Spa2NutritionPlan | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Stats */}
      <Box sx={{ py: 4, bgcolor: SPA2_TEAL }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {stats.map((s) => (
              <Grid key={s.id} xs={6} sm={3}>
                <Stack alignItems="center" sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {s.n}
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.8 }}>{s.l}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Plans */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle
            eyebrow="Chương trình"
            title="Lộ trình dinh dưỡng của bạn"
            subtitle="Mỗi chương trình được cá nhân hóa theo thể trạng, mục tiêu và lịch sinh hoạt."
          />
          <Grid container spacing={3} alignItems="stretch">
            {plans.map((p) => (
              <Grid key={p.id} xs={12} md={4}>
                <SoftCard>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      bgcolor: `${p.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={p.icon} width={28} sx={{ color: p.color }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 16 }}>
                    {p.name}
                  </Typography>
                  <Chip
                    label={p.cal}
                    size="small"
                    sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: 'text.secondary' }}
                  />
                  <Typography
                    sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                  >
                    {p.desc}
                  </Typography>
                  <Stack spacing={1} sx={{ mb: 3 }}>
                    {p.includes.map((inc) => (
                      <Stack key={inc} direction="row" spacing={1.5} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          width={15}
                          sx={{ color: p.color, flexShrink: 0 }}
                        />
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {inc}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 700, color: p.color, fontSize: 18 }}>
                      {formatVND(p.price)}
                    </Typography>
                    <Button
                      onClick={() => setSelected(p)}
                      sx={{
                        borderRadius: 99,
                        px: 2.5,
                        bgcolor: p.color,
                        color: 'white',
                        '&:hover': { opacity: 0.88, bgcolor: p.color },
                      }}
                    >
                      Tư vấn ngay
                    </Button>
                  </Stack>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Superfood tips */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Bí quyết" title="Thực phẩm siêu tốt cho làn da" />
          <Grid container spacing={2}>
            {superfoodTips.map((tip) => (
              <Grid key={tip.id} xs={12} sm={6} md={4}>
                <SoftCard
                  sx={{
                    p: 2.5,
                    bgcolor: 'common.white',
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>
                    {tip.icon}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
                      {tip.food}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6 }}>
                      {tip.benefit}
                    </Typography>
                  </Box>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Quiz */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm">
          <SectionTitle eyebrow="Trắc nghiệm" title="Tìm chương trình phù hợp cho bạn" />
          {!quizDone ? (
            <Card
              sx={{
                borderRadius: 4,
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: 'none',
                overflow: 'hidden',
              }}
            >
              <LinearProgress
                variant="determinate"
                value={(quizStep / quiz.length) * 100}
                sx={{
                  height: 4,
                  bgcolor: SPA2_CREAM_DARK,
                  '& .MuiLinearProgress-bar': { bgcolor: SPA2_TEAL },
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography sx={{ fontSize: 12, color: 'text.disabled', mb: 2 }}>
                  Câu {quizStep + 1} / {quiz.length}
                </Typography>
                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3 }}>
                  {quiz[quizStep].question}
                </Typography>
                <Stack spacing={1.5}>
                  {quiz[quizStep].options.map((opt) => (
                    <Button
                      key={opt}
                      fullWidth
                      onClick={() =>
                        quizStep < quiz.length - 1 ? setQuizStep(quizStep + 1) : setQuizDone(true)
                      }
                      sx={{
                        justifyContent: 'flex-start',
                        py: 1.6,
                        px: 2.5,
                        borderRadius: 3,
                        border: `1.5px solid ${SPA2_CREAM_DARK}`,
                        color: SPA2_INK,
                        '&:hover': { bgcolor: SPA2_CREAM, borderColor: SPA2_TEAL },
                      }}
                    >
                      {opt}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Card>
          ) : (
            <Card
              sx={{
                borderRadius: 4,
                border: `2px solid ${SPA2_TEAL}`,
                boxShadow: 'none',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ bgcolor: SPA2_TEAL, p: 3, color: 'white', textAlign: 'center' }}>
                <Iconify icon="solar:leaf-bold-duotone" width={40} sx={{ mb: 1 }} />
                <Typography variant="h6">Gợi ý cho bạn</Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                  Dựa trên trả lời của bạn, chúng tôi gợi ý{' '}
                  <strong style={{ color: SPA2_TEAL }}>Detox & Thải Độc 7 ngày</strong> — chương
                  trình toàn diện nhất cho mục tiêu cải thiện da và năng lượng.
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={paths.spa2.contact}
                    sx={{
                      borderRadius: 99,
                      py: 1.3,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    Đăng ký tư vấn
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => {
                      setQuizDone(false);
                      setQuizStep(0);
                    }}
                    sx={{
                      borderRadius: 99,
                      py: 1.3,
                      color: SPA2_TEAL_DARK,
                      border: `1.5px solid ${SPA2_TEAL}`,
                    }}
                  >
                    Làm lại
                  </Button>
                </Stack>
              </Box>
            </Card>
          )}
        </Container>
      </Box>

      {/* Dialog */}
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
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
              Đăng ký tư vấn: {selected.name}
            </Typography>
            <Stack spacing={2}>
              <TextField fullWidth size="small" label="Họ và tên" />
              <TextField fullWidth size="small" label="Số điện thoại" />
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="Mục tiêu & tình trạng sức khỏe"
              />
              <Button
                fullWidth
                onClick={() => setSelected(null)}
                sx={{
                  borderRadius: 99,
                  py: 1.3,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Gửi yêu cầu
              </Button>
            </Stack>
          </DialogContent>
        )}
      </Dialog>

      <GradientCta
        title="Bắt đầu hành trình dinh dưỡng lành mạnh"
        sub="Tư vấn miễn phí với chuyên gia dinh dưỡng — không cam kết."
        btnLabel="Đặt lịch tư vấn"
        href={paths.spa2.contact}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 2. ONLINE CONSULTATION
// ══════════════════════════════════════════════════════════

export function Spa2ConsultationPageView({
  banner = spa2ConsultationBanner,
  consultants = spa2Consultants,
}: {
  banner?: Spa2ConsultationBanner;
  consultants?: Spa2Consultant[];
} = {}) {
  const [mode, setMode] = useState<'online' | 'offline'>('online');
  const [selected, setSelected] = useState<Spa2Consultant | null>(null);
  const [slot, setSlot] = useState('');
  const [booked, setBooked] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Mode toggle */}
          <Stack alignItems="center" sx={{ mb: 5 }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, v) => v && setMode(v)}
              sx={{ bgcolor: SPA2_CREAM, borderRadius: 99, p: 0.5 }}
            >
              <ToggleButton
                value="online"
                sx={{
                  borderRadius: 99,
                  px: 4,
                  border: 'none',
                  '&.Mui-selected': { bgcolor: SPA2_TEAL, color: 'white' },
                }}
              >
                <Iconify icon="solar:video-camera-bold" width={18} sx={{ mr: 1 }} />
                Video call
              </ToggleButton>
              <ToggleButton
                value="offline"
                sx={{
                  borderRadius: 99,
                  px: 4,
                  border: 'none',
                  '&.Mui-selected': { bgcolor: SPA2_TEAL, color: 'white' },
                }}
              >
                <Iconify icon="solar:map-point-bold" width={18} sx={{ mr: 1 }} />
                Tại spa
              </ToggleButton>
            </ToggleButtonGroup>
            <Alert
              severity="info"
              sx={{ mt: 2, borderRadius: 2.5, bgcolor: '#EBF5FF', color: '#0C447C', fontSize: 13 }}
            >
              {mode === 'online'
                ? 'Tư vấn qua Zoom / Google Meet — linh hoạt mọi lúc mọi nơi.'
                : 'Tư vấn trực tiếp tại chi nhánh — được thăm khám chi tiết hơn.'}
            </Alert>
          </Stack>

          {/* Consultants grid */}
          {!selected ? (
            <Grid container spacing={3}>
              {consultants.map((c) => (
                <Grid key={c.id} xs={12} sm={6} md={3}>
                  <Box sx={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                    <SoftCard sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={c.avatar}
                        sx={{
                          width: 80,
                          height: 80,
                          mx: 'auto',
                          mb: 1.5,
                          border: `3px solid ${SPA2_TEAL_LIGHT}`,
                        }}
                      />
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.25, fontSize: 15 }}>
                        {c.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: SPA2_TEAL, mb: 1 }}>
                        {c.role}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0.75}
                        sx={{ mb: 1 }}
                      >
                        <Rating
                          value={c.rating}
                          readOnly
                          size="small"
                          precision={0.1}
                          sx={{ fontSize: 14, '& .MuiRating-icon': { color: '#EF9F27' } }}
                        />
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                          ({c.reviews})
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        justifyContent="center"
                        sx={{ mb: 2, gap: 0.5 }}
                      >
                        {c.specialty.map((s) => (
                          <Chip
                            key={s}
                            label={s}
                            size="small"
                            sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
                          />
                        ))}
                      </Stack>
                      <Button
                        fullWidth
                        sx={{
                          borderRadius: 99,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Đặt lịch ngay
                      </Button>
                    </SoftCard>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : !booked ? (
            <Grid container spacing={4} justifyContent="center">
              <Grid xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: 'none',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ bgcolor: SPA2_CREAM, p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={selected.avatar} sx={{ width: 56, height: 56 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
                          {selected.name}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>
                          {selected.role}
                        </Typography>
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Rating
                            value={selected.rating}
                            readOnly
                            size="small"
                            precision={0.1}
                            sx={{ fontSize: 13, '& .MuiRating-icon': { color: '#EF9F27' } }}
                          />
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            · {selected.exp} kinh nghiệm
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 2, fontSize: 14 }}>
                      Chọn khung giờ
                    </Typography>
                    <Grid container spacing={1} sx={{ mb: 3 }}>
                      {selected.slots.map((s) => (
                        <Grid key={s} xs={6} sm={3}>
                          <Button
                            fullWidth
                            onClick={() => setSlot(s)}
                            sx={{
                              borderRadius: 2,
                              border: `1.5px solid ${slot === s ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                              bgcolor: slot === s ? SPA2_CREAM : 'transparent',
                              color: slot === s ? SPA2_TEAL_DARK : 'text.secondary',
                              fontWeight: slot === s ? 700 : 400,
                            }}
                          >
                            {s}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                    <Stack spacing={2} sx={{ mb: 3 }}>
                      <TextField fullWidth size="small" label="Họ và tên" />
                      <TextField fullWidth size="small" label="Số điện thoại" />
                      <TextField
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        label="Vấn đề cần tư vấn"
                      />
                    </Stack>
                    <Stack direction="row" spacing={1.5}>
                      <Button
                        onClick={() => setSelected(null)}
                        sx={{ borderRadius: 99, color: 'text.secondary' }}
                      >
                        Chọn lại
                      </Button>
                      <Button
                        fullWidth
                        disabled={!slot}
                        onClick={() => setBooked(true)}
                        sx={{
                          borderRadius: 99,
                          py: 1.3,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          '&.Mui-disabled': { bgcolor: SPA2_CREAM_DARK },
                        }}
                      >
                        Xác nhận đặt lịch {slot ? `lúc ${slot}` : ''}
                      </Button>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Stack alignItems="center" spacing={3} sx={{ py: 6 }}>
              <Iconify icon="solar:check-circle-bold" width={64} sx={{ color: SPA2_TEAL }} />
              <Typography variant="h4" sx={{ color: SPA2_INK }}>
                Đặt lịch thành công!
              </Typography>
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 440 }}>
                Buổi tư vấn với <strong>{selected.name}</strong> lúc <strong>{slot}</strong>{' '}
                {mode === 'online'
                  ? '— Link Zoom sẽ được gửi qua email trước 15 phút.'
                  : `— Vui lòng đến ${spa2Branches[0].name} trước 10 phút.`}
              </Typography>
              <Button
                onClick={() => {
                  setBooked(false);
                  setSelected(null);
                  setSlot('');
                }}
                sx={{
                  borderRadius: 99,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  px: 4,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Đặt lịch khác
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      <GradientCta
        title="Chuyên gia luôn sẵn sàng cho bạn"
        sub="Tư vấn lần đầu miễn phí — không cần cam kết sử dụng dịch vụ."
        btnLabel="Đặt tư vấn ngay"
        href="#"
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 3. VIP ROOM & PREMIUM EXPERIENCE
// ══════════════════════════════════════════════════════════

export function Spa2VIPRoomPageView({
  banner = spa2VipRoomBanner,
  rooms = spa2VipRooms,
  perks = spa2VipRoomPerks,
}: {
  banner?: Spa2VipRoomBanner;
  rooms?: Spa2VipRoom[];
  perks?: Spa2VipRoomPerk[];
} = {}) {
  const [activeRoom, setActiveRoom] = useState(0);
  const room = rooms[activeRoom];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Dark luxury hero */}
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
            inset: 0,
            ...spa2ImageBackgroundStyle(banner.image),
            opacity: 0.15,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            opacity: 0.08,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
              {banner.eyebrow}
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 720 }}
            >
              {banner.title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 540 }}>
              {banner.subtitle}
            </Typography>
            <Chip
              label={banner.badge}
              sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700, fontSize: 14, height: 36 }}
            />
          </Stack>
        </Container>
      </Box>

      {/* Room explorer */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Phòng VIP" title="Chọn không gian của bạn" />

          {/* Tabs */}
          <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
            {rooms.map((r, i) => (
              <Chip
                key={r.id}
                label={r.name}
                onClick={() => setActiveRoom(i)}
                sx={{
                  cursor: 'pointer',
                  height: 38,
                  fontSize: 14,
                  bgcolor: activeRoom === i ? SPA2_INK : 'transparent',
                  color: activeRoom === i ? 'white' : 'text.secondary',
                  border: `1.5px solid ${activeRoom === i ? SPA2_INK : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={5}>
            <Grid xs={12} md={7}>
              <Box
                sx={{
                  borderRadius: 5,
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  position: 'relative',
                  boxShadow: '0 24px 56px rgba(0,0,0,0.2)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${room.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'background .4s ease',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <Box sx={{ bgcolor: 'rgba(31,42,40,0.85)', borderRadius: 2, px: 2, py: 1 }}>
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>{room.name}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                      {room.size} · {room.capacity}
                    </Typography>
                  </Box>
                  <Chip label={room.duration} sx={{ bgcolor: SPA2_TEAL, color: 'white' }} />
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={5}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h4" sx={{ color: SPA2_INK, mb: 0.5 }}>
                    {room.name}
                  </Typography>
                  <Stack direction="row" alignItems="baseline" spacing={0.75}>
                    <Typography variant="h3" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                      {formatVND(room.price)}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {room.duration}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1.5, fontSize: 14 }}>
                    Tiện nghi phòng:
                  </Typography>
                  <Grid container spacing={1}>
                    {room.features.map((f) => (
                      <Grid key={f} xs={12} sm={6}>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Iconify
                            icon="solar:check-circle-bold"
                            width={15}
                            sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                          />
                          <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{f}</Typography>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Stack spacing={1.5}>
                  <Button
                    component={RouterLink}
                    href={paths.spa2.booking}
                    size="large"
                    sx={{
                      borderRadius: 99,
                      py: 1.5,
                      bgcolor: SPA2_INK,
                      color: 'white',
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    Đặt phòng VIP
                  </Button>
                  <Button
                    component={RouterLink}
                    href={paths.spa2.contact}
                    size="large"
                    sx={{
                      borderRadius: 99,
                      py: 1.5,
                      color: SPA2_INK,
                      border: `1.5px solid ${SPA2_CREAM_DARK}`,
                    }}
                  >
                    Hỏi thêm về phòng
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Premium perks */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Đặc quyền" title="Trải nghiệm VIP độc quyền" />
          <Grid container spacing={3}>
            {perks.map((p) => (
              <Grid key={p.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center', bgcolor: 'common.white' }}>
                  <Iconify icon={p.icon} width={44} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
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

      <GradientCta
        title="Tặng gói VIP cho người đặc biệt"
        sub="Voucher phòng VIP — món quà sang trọng và đáng nhớ nhất."
        btnLabel="Mua voucher VIP"
        href={paths.spa2.booking}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 4. PACKAGE BUILDER (TỰ TẠO COMBO)
// ══════════════════════════════════════════════════════════

type SelectedService = {
  slug: string;
  name: string;
  price: number;
  duration: string;
  icon: string;
};

export function Spa2PackageBuilderPageView({
  banner = spa2PackageBuilderBanner,
  discountTiers = spa2PackageBuilderDiscountTiers,
}: {
  banner?: Spa2PackageBuilderBanner;
  discountTiers?: Spa2PackageBuilderDiscountTier[];
} = {}) {
  const [cart, setCart] = useState<SelectedService[]>([]);
  const [branch, setBranch] = useState('');
  const [date, setDate] = useState('');
  const [step, setStep] = useState<'build' | 'confirm' | 'done'>('build');
  const [discount, setDiscount] = useState(0);

  const toggleService = (s: SelectedService) => {
    const exists = cart.find((c) => c.slug === s.slug);
    if (exists) {
      setCart(cart.filter((c) => c.slug !== s.slug));
    } else {
      setCart([...cart, s]);
    }
  };

  const total = cart.reduce((acc, s) => acc + s.price, 0);
  const totalDuration = cart.reduce((acc, s) => {
    const mins = parseInt(s.duration, 10);
    return acc + (Number.isNaN(mins) ? 0 : mins);
  }, 0);

  const sortedTiers = useMemo(
    () => [...discountTiers].sort((a, b) => a.minServices - b.minServices),
    [discountTiers]
  );
  const currentTierIndex = sortedTiers.reduce(
    (acc, tier, idx) => (cart.length >= tier.minServices ? idx : acc),
    -1
  );
  const currentTier = currentTierIndex >= 0 ? sortedTiers[currentTierIndex] : undefined;
  const nextTier = sortedTiers[currentTierIndex + 1];

  useMemo(() => {
    setDiscount(currentTier?.discountPercent ?? 0);
  }, [currentTier]);

  const finalTotal = total * (1 - discount / 100);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Discount banner */}
      <Box sx={{ py: 2, bgcolor: currentTier ? SPA2_TEAL : SPA2_CREAM_DARK }}>
        <Container>
          <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
            <Iconify
              icon="solar:gift-bold"
              width={18}
              sx={{ color: currentTier ? 'white' : 'text.secondary' }}
            />
            <Typography
              sx={{
                color: currentTier ? 'white' : 'text.secondary',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {cart.length === 0 &&
                sortedTiers.length > 0 &&
                `Chọn ${sortedTiers[0].minServices} dịch vụ → giảm ${sortedTiers[0].discountPercent}%${
                  sortedTiers.length > 1
                    ? ` · Chọn ${sortedTiers[sortedTiers.length - 1].minServices}+ dịch vụ → giảm ${sortedTiers[sortedTiers.length - 1].discountPercent}%`
                    : ''
                }`}
              {cart.length > 0 &&
                nextTier &&
                (currentTier
                  ? `🎉 Bạn đang được giảm ${currentTier.discountPercent}%! Thêm ${nextTier.minServices - cart.length} dịch vụ nữa để giảm ${nextTier.discountPercent}%.`
                  : `Thêm ${nextTier.minServices - cart.length} dịch vụ nữa để nhận giảm ${nextTier.discountPercent}%!`)}
              {cart.length > 0 &&
                !nextTier &&
                currentTier &&
                `🎉 Tuyệt vời! Bạn đang được giảm ${currentTier.discountPercent}% cho combo ${cart.length} dịch vụ!`}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          {step === 'build' && (
            <Grid container spacing={4}>
              {/* Service selector */}
              <Grid xs={12} md={8}>
                <SectionTitle eyebrow="Bước 1" title="Chọn dịch vụ yêu thích" align="left" />
                <Grid container spacing={2}>
                  {spa2Services.map((s: any) => {
                    const inCart = !!cart.find((c) => c.slug === s.slug);
                    return (
                      <Grid key={s.slug} xs={12} sm={6}>
                        <Card
                          onClick={() => toggleService(s)}
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            cursor: 'pointer',
                            border: `2px solid ${inCart ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                            bgcolor: inCart ? `${SPA2_TEAL}08` : 'common.white',
                            boxShadow: 'none',
                            transition: 'all .2s',
                            '&:hover': { borderColor: SPA2_TEAL },
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                bgcolor: inCart ? SPA2_TEAL : SPA2_CREAM,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all .2s',
                              }}
                            >
                              <Iconify
                                icon={s.icon}
                                width={22}
                                sx={{ color: inCart ? 'white' : SPA2_TEAL }}
                              />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                                {s.name}
                              </Typography>
                              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                                {s.duration} · {formatVND(s.price)}
                              </Typography>
                            </Box>
                            <Iconify
                              icon={inCart ? 'solar:check-circle-bold' : 'solar:add-circle-linear'}
                              width={22}
                              sx={{ color: inCart ? SPA2_TEAL : 'text.disabled' }}
                            />
                          </Stack>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>

              {/* Cart summary */}
              <Grid xs={12} md={4}>
                <Box sx={{ position: 'sticky', top: 100 }}>
                  <SoftCard>
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                      Combo của bạn
                    </Typography>
                    {cart.length === 0 ? (
                      <Stack alignItems="center" sx={{ py: 3 }}>
                        <Iconify
                          icon="solar:cart-plus-bold"
                          width={40}
                          sx={{ color: SPA2_CREAM_DARK, mb: 1 }}
                        />
                        <Typography
                          sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center' }}
                        >
                          Chưa có dịch vụ nào. Chọn ít nhất 1 dịch vụ để bắt đầu.
                        </Typography>
                      </Stack>
                    ) : (
                      <Stack spacing={1.5} sx={{ mb: 3 }}>
                        {cart.map((s) => (
                          <Stack key={s.slug} direction="row" alignItems="center" spacing={1.5}>
                            <Iconify
                              icon={s.icon}
                              width={18}
                              sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                                {s.name}
                              </Typography>
                              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                                {s.duration}
                              </Typography>
                            </Box>
                            <Typography sx={{ fontSize: 13, color: SPA2_TEAL, fontWeight: 600 }}>
                              {formatVND(s.price)}
                            </Typography>
                            <IconButton size="small" onClick={() => toggleService(s)}>
                              <Iconify
                                icon="solar:close-circle-bold"
                                width={16}
                                sx={{ color: 'text.disabled' }}
                              />
                            </IconButton>
                          </Stack>
                        ))}
                      </Stack>
                    )}

                    {cart.length > 0 && (
                      <>
                        <Divider sx={{ mb: 2 }} />
                        <Stack spacing={0.75} sx={{ mb: 2.5 }}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                              Tổng thời gian
                            </Typography>
                            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                              {totalDuration} phút
                            </Typography>
                          </Stack>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                              Tạm tính
                            </Typography>
                            <Typography sx={{ fontSize: 13 }}>{formatVND(total)}</Typography>
                          </Stack>
                          {discount > 0 && (
                            <Stack direction="row" justifyContent="space-between">
                              <Typography sx={{ fontSize: 13, color: 'error.main' }}>
                                Giảm combo {discount}%
                              </Typography>
                              <Typography sx={{ fontSize: 13, color: 'error.main' }}>
                                -{formatVND((total * discount) / 100)}
                              </Typography>
                            </Stack>
                          )}
                          <Divider />
                          <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontWeight: 700, color: SPA2_INK }}>
                              Tổng thanh toán
                            </Typography>
                            <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 16 }}>
                              {formatVND(finalTotal)}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Button
                          fullWidth
                          size="large"
                          onClick={() => setStep('confirm')}
                          sx={{
                            borderRadius: 99,
                            py: 1.4,
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          }}
                        >
                          Tiếp theo → Đặt lịch
                        </Button>
                      </>
                    )}
                  </SoftCard>
                </Box>
              </Grid>
            </Grid>
          )}

          {step === 'confirm' && (
            <Grid container spacing={4} justifyContent="center">
              <Grid xs={12} md={7}>
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3 }}>
                    Xác nhận & đặt lịch combo
                  </Typography>
                  <Stack spacing={2}>
                    <TextField fullWidth size="small" label="Họ và tên" />
                    <TextField fullWidth size="small" label="Số điện thoại" />
                    <TextField
                      fullWidth
                      size="small"
                      select
                      label="Chi nhánh"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      {spa2Branches.map((b: any) => (
                        <MenuItem key={b.name} value={b.name}>
                          {b.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      label="Ngày"
                      InputLabelProps={{ shrink: true }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK, mb: 1 }}>
                        Combo đã chọn:
                      </Typography>
                      {cart.map((s) => (
                        <Typography key={s.slug} sx={{ fontSize: 13, color: 'text.secondary' }}>
                          • {s.name}
                        </Typography>
                      ))}
                      <Divider sx={{ my: 1 }} />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontWeight: 700, color: SPA2_INK }}>Tổng</Typography>
                        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL }}>
                          {formatVND(finalTotal)}
                          {discount > 0 ? ` (đã giảm ${discount}%)` : ''}
                        </Typography>
                      </Stack>
                    </Box>
                    <Stack direction="row" spacing={1.5}>
                      <Button
                        onClick={() => setStep('build')}
                        sx={{ borderRadius: 99, color: 'text.secondary' }}
                      >
                        Quay lại
                      </Button>
                      <Button
                        fullWidth
                        onClick={() => setStep('done')}
                        sx={{
                          borderRadius: 99,
                          py: 1.4,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Xác nhận đặt lịch
                      </Button>
                    </Stack>
                  </Stack>
                </SoftCard>
              </Grid>
            </Grid>
          )}

          {step === 'done' && (
            <Stack alignItems="center" spacing={3} sx={{ py: 8 }}>
              <Iconify icon="solar:check-circle-bold" width={72} sx={{ color: SPA2_TEAL }} />
              <Typography variant="h4" sx={{ color: SPA2_INK }}>
                Đặt combo thành công!
              </Typography>
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 480 }}>
                Combo <strong>{cart.length} dịch vụ</strong> trị giá{' '}
                <strong style={{ color: SPA2_TEAL }}>{formatVND(finalTotal)}</strong> đã được đặt.
                Xác nhận sẽ gửi qua SMS trong 15 phút.
              </Typography>
              <Button
                onClick={() => {
                  setCart([]);
                  setStep('build');
                }}
                sx={{
                  borderRadius: 99,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  px: 4,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Tạo combo khác
              </Button>
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 5. APPOINTMENT MANAGEMENT
// ══════════════════════════════════════════════════════════

const STATUS_CONFIG: Record<string, { label: string; color: string; bgcolor: string }> = {
  confirmed: { label: 'Đã xác nhận', color: '#2E7D32', bgcolor: '#E8F5E9' },
  pending: { label: 'Chờ xác nhận', color: '#854F0B', bgcolor: '#FEF3E2' },
  done: { label: 'Đã hoàn thành', color: '#0C447C', bgcolor: '#EBF5FF' },
  cancelled: { label: 'Đã hủy', color: '#C62828', bgcolor: '#FFEBEE' },
};

export function Spa2AppointmentPageView({
  banner = spa2AppointmentBanner,
  upcoming = spa2AppointmentUpcoming,
  history = spa2AppointmentHistory,
  loyaltyPoints = spa2AppointmentLoyaltyPoints,
}: {
  banner?: Spa2AppointmentBanner;
  upcoming?: Spa2AppointmentRecord[];
  history?: Spa2AppointmentRecord[];
  loyaltyPoints?: number;
} = {}) {
  const [tab, setTab] = useState(0);
  const [reschedule, setReschedule] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {/* Summary cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              {
                n: upcoming.length,
                l: 'Lịch sắp tới',
                icon: 'solar:calendar-bold',
                color: SPA2_TEAL,
              },
              {
                n: history.filter((a) => a.status === 'done').length,
                l: 'Đã hoàn thành',
                icon: 'solar:check-circle-bold',
                color: '#2E7D32',
              },
              {
                n: loyaltyPoints.toLocaleString('vi-VN'),
                l: 'Điểm tích lũy',
                icon: 'solar:star-bold',
                color: '#EF9F27',
              },
            ].map((s) => (
              <Grid key={s.l} xs={4}>
                <SoftCard sx={{ textAlign: 'center', py: 2 }}>
                  <Iconify icon={s.icon} width={24} sx={{ color: s.color, mb: 0.5 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 22, color: s.color }}>
                    {s.n}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{s.l}</Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>

          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              mb: 3,
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
            }}
          >
            <Tab label={`Sắp tới (${upcoming.length})`} sx={{ textTransform: 'none' }} />
            <Tab label={`Lịch sử (${history.length})`} sx={{ textTransform: 'none' }} />
          </Tabs>

          <Stack spacing={2}>
            {(tab === 0 ? upcoming : history).map((apt) => {
              const status = STATUS_CONFIG[apt.status];
              return (
                <Card
                  key={apt.id}
                  sx={{
                    p: 2.5,
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
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: SPA2_CREAM,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11,
                          color: SPA2_TEAL,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {apt.date.split('/')[1]}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 20, fontWeight: 700, color: SPA2_TEAL_DARK, lineHeight: 1 }}
                      >
                        {apt.date.split('/')[0]}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
                          {apt.service}
                        </Typography>
                        <Chip
                          label={status.label}
                          size="small"
                          sx={{
                            bgcolor: status.bgcolor,
                            color: status.color,
                            fontSize: 11,
                            height: 20,
                          }}
                        />
                      </Stack>
                      <Stack direction="row" spacing={2} flexWrap="wrap">
                        {[
                          { icon: 'solar:clock-circle-bold', text: apt.time },
                          { icon: 'solar:map-point-bold', text: apt.branch },
                          { icon: 'solar:user-bold', text: `KTV: ${apt.ktv}` },
                        ].map((i) => (
                          <Stack key={i.text} direction="row" spacing={0.75} alignItems="center">
                            <Iconify icon={i.icon} width={13} sx={{ color: SPA2_TEAL }} />
                            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                              {i.text}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      {apt.status === 'done' && (apt as any).rating && (
                        <Rating
                          value={(apt as any).rating}
                          readOnly
                          size="small"
                          sx={{ mt: 0.5, '& .MuiRating-icon': { color: '#EF9F27' } }}
                        />
                      )}
                    </Box>
                    <Stack spacing={1} sx={{ flexShrink: 0 }}>
                      <Typography
                        sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 15, textAlign: 'right' }}
                      >
                        {formatVND(apt.price)}
                      </Typography>
                      {apt.status === 'confirmed' && (
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            onClick={() => setReschedule(apt.id)}
                            sx={{
                              borderRadius: 99,
                              fontSize: 12,
                              border: `1px solid ${SPA2_CREAM_DARK}`,
                              color: 'text.secondary',
                            }}
                          >
                            Đổi lịch
                          </Button>
                          <Button
                            size="small"
                            component={RouterLink}
                            href={paths.spa2.booking}
                            sx={{
                              borderRadius: 99,
                              fontSize: 12,
                              bgcolor: SPA2_TEAL,
                              color: 'white',
                              '&:hover': { bgcolor: SPA2_TEAL_DARK },
                            }}
                          >
                            Đặt lại
                          </Button>
                        </Stack>
                      )}
                      {apt.status === 'done' && !(apt as any).rating && (
                        <Button
                          size="small"
                          onClick={() => setReviewing(apt.id)}
                          sx={{
                            borderRadius: 99,
                            fontSize: 12,
                            bgcolor: '#EF9F27',
                            color: 'white',
                          }}
                        >
                          Đánh giá
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Card>
              );
            })}
          </Stack>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              component={RouterLink}
              href={paths.spa2.booking}
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              sx={{
                borderRadius: 99,
                px: 4,
                bgcolor: SPA2_TEAL,
                color: 'white',
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
              }}
            >
              Đặt lịch mới
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Reschedule dialog */}
      <Dialog
        open={!!reschedule}
        onClose={() => setReschedule(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <IconButton
            onClick={() => setReschedule(null)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
          <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
            Đổi lịch hẹn
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Ngày mới"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              size="small"
              type="time"
              label="Giờ mới"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label="Lý do đổi lịch (không bắt buộc)"
            />
            <Button
              fullWidth
              onClick={() => setReschedule(null)}
              sx={{
                borderRadius: 99,
                py: 1.3,
                bgcolor: SPA2_TEAL,
                color: 'white',
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
              }}
            >
              Xác nhận đổi lịch
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Review dialog */}
      <Dialog
        open={!!reviewing}
        onClose={() => setReviewing(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <IconButton
            onClick={() => setReviewing(null)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
          <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
            Đánh giá dịch vụ
          </Typography>
          <Stack spacing={2} alignItems="center">
            <Rating
              value={reviewRating}
              onChange={(_, v) => setReviewRating(v ?? 5)}
              size="large"
              sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
            />
            <TextField fullWidth multiline rows={3} label="Chia sẻ cảm nhận của bạn" />
            <Button
              fullWidth
              onClick={() => setReviewing(null)}
              sx={{
                borderRadius: 99,
                py: 1.3,
                bgcolor: SPA2_TEAL,
                color: 'white',
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
              }}
            >
              Gửi đánh giá · +50 điểm
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 6. NEWSLETTER
// ══════════════════════════════════════════════════════════

export function Spa2NewsletterPageView({
  banner = spa2NewsletterBanner,
  benefits = spa2NewsletterBenefits,
  config = spa2NewsletterConfig,
}: {
  banner?: Spa2NewsletterBanner;
  benefits?: Spa2NewsletterBenefit[];
  config?: Spa2NewsletterConfig;
} = {}) {
  const [email, setEmail] = useState('');
  const [prefs, setPrefs] = useState({ deals: true, tips: true, events: false, new: true });
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [done, setDone] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5} alignItems="center">
            {/* Benefits */}
            <Grid xs={12} md={5}>
              <SectionTitle eyebrow="Nội dung" title="Bạn sẽ nhận được" align="left" />
              <Stack spacing={2.5}>
                {benefits.map((c) => (
                  <Stack key={c.id} direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 3,
                        bgcolor: SPA2_CREAM,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={c.icon} width={22} sx={{ color: SPA2_TEAL }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.25 }}>
                        {c.title}
                      </Typography>
                      <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.6 }}>
                        {c.desc}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
              <Alert
                severity="success"
                sx={{ mt: 3, borderRadius: 2.5, bgcolor: '#E8F5E9', color: '#1B5E20' }}
              >
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>🎁 Quà chào mừng</Typography>
                Đăng ký nhận ngay voucher <strong>{formatVND(config.welcomeGiftAmount)}</strong> cho
                lần đặt lịch đầu tiên từ bản tin.
              </Alert>
            </Grid>

            {/* Form */}
            <Grid xs={12} md={7}>
              <SoftCard>
                {!done ? (
                  <Stack spacing={3}>
                    <Typography variant="h6" sx={{ color: SPA2_INK }}>
                      Đăng ký nhận bản tin
                    </Typography>
                    <TextField
                      fullWidth
                      label="Email của bạn"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon="solar:letter-bold" sx={{ color: SPA2_TEAL }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box>
                      <Typography sx={{ fontWeight: 500, color: SPA2_INK, mb: 1.5, fontSize: 14 }}>
                        Tần suất nhận mail:
                      </Typography>
                      <ToggleButtonGroup
                        value={frequency}
                        exclusive
                        onChange={(_, v) => v && setFrequency(v)}
                        sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 0.5 }}
                      >
                        {(
                          [
                            ['weekly', 'Hàng tuần'],
                            ['biweekly', '2 tuần/lần'],
                            ['monthly', 'Hàng tháng'],
                          ] as const
                        ).map(([v, l]) => (
                          <ToggleButton
                            key={v}
                            value={v}
                            sx={{
                              borderRadius: 2.5,
                              px: 2.5,
                              py: 0.75,
                              border: 'none',
                              fontSize: 13,
                              '&.Mui-selected': { bgcolor: SPA2_TEAL, color: 'white' },
                            }}
                          >
                            {l}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 500, color: SPA2_INK, mb: 1, fontSize: 14 }}>
                        Chủ đề quan tâm:
                      </Typography>
                      <Grid container spacing={1}>
                        {[
                          ['deals', 'Ưu đãi & Deal'],
                          ['tips', 'Mẹo chăm sóc da'],
                          ['events', 'Sự kiện & Workshop'],
                          ['new', 'Sản phẩm mới'],
                        ].map(([key, label]) => (
                          <Grid key={key} xs={6}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={prefs[key as keyof typeof prefs]}
                                  onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked })}
                                  sx={{ color: SPA2_TEAL, '&.Mui-checked': { color: SPA2_TEAL } }}
                                />
                              }
                              label={<Typography sx={{ fontSize: 13.5 }}>{label}</Typography>}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    <Button
                      fullWidth
                      size="large"
                      disabled={!email}
                      onClick={() => setDone(true)}
                      sx={{
                        borderRadius: 99,
                        py: 1.5,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        '&.Mui-disabled': { bgcolor: SPA2_CREAM_DARK },
                      }}
                    >
                      Đăng ký & nhận voucher 100K
                    </Button>
                    <Typography sx={{ fontSize: 12, color: 'text.disabled', textAlign: 'center' }}>
                      Không spam. Hủy đăng ký bất kỳ lúc nào chỉ với 1 click.
                    </Typography>
                  </Stack>
                ) : (
                  <Stack alignItems="center" spacing={2.5} sx={{ py: 4 }}>
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        bgcolor: SPA2_CREAM,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={44}
                        sx={{ color: SPA2_TEAL }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ color: SPA2_INK }}>
                      Đăng ký thành công!
                    </Typography>
                    <Typography
                      sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 380 }}
                    >
                      Cảm ơn bạn đã đăng ký! Voucher{' '}
                      <strong>{formatVND(config.welcomeGiftAmount)}</strong> đã được gửi đến{' '}
                      <strong>{email}</strong>. Kiểm tra hộp thư ngay nhé!
                    </Typography>
                    <Chip
                      label={`Mã: ${config.voucherCode}`}
                      sx={{
                        bgcolor: SPA2_CREAM,
                        color: SPA2_TEAL_DARK,
                        fontWeight: 700,
                        fontSize: 16,
                        height: 40,
                        px: 1,
                      }}
                    />
                  </Stack>
                )}
              </SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Social proof */}
      <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h5" sx={{ color: SPA2_INK }}>
              Cùng {config.subscriberCount.toLocaleString('vi-VN')}+ người đăng ký
            </Typography>
            <Stack direction="row" spacing={-1.5}>
              {['img=11', 'img=16', 'img=23', 'img=32', 'img=47'].map((img) => (
                <Avatar
                  key={img}
                  src={`https://i.pravatar.cc/60?${img}`}
                  sx={{ width: 40, height: 40, border: '2px solid white' }}
                />
              ))}
            </Stack>
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
              Độ hài lòng bản tin: {config.satisfactionRating}/5 ⭐
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 7. PRESS & MEDIA
// ══════════════════════════════════════════════════════════

export function Spa2PressPageView({
  banner = spa2PressBanner,
  awards = spa2PressAwards,
  articles = spa2PressArticles,
  contact = spa2PressContact,
}: {
  banner?: Spa2PressBanner;
  awards?: Spa2PressAward[];
  articles?: Spa2PressArticle[];
  contact?: Spa2PressContact;
} = {}) {
  const [filter, setFilter] = useState('all');
  const TYPE_FILTERS = ['all', 'Feature', 'Ranking', 'Business', 'Review', 'Award', 'Interview'];
  const filtered = filter === 'all' ? articles : articles.filter((p) => p.type === filter);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Awards */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Giải thưởng" title="Vinh danh & công nhận" />
          <Grid container spacing={3}>
            {awards.map((a) => (
              <Grid key={a.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 3,
                      bgcolor: `${a.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={a.icon} width={30} sx={{ color: a.color }} />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: SPA2_INK,
                      mb: 0.5,
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    {a.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{a.org}</Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Press coverage */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Đề cập" title="Báo chí nói gì về chúng tôi" />
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {TYPE_FILTERS.map((f) => (
              <Chip
                key={f}
                label={f === 'all' ? 'Tất cả' : f}
                onClick={() => setFilter(f)}
                sx={{
                  cursor: 'pointer',
                  height: 32,
                  bgcolor: filter === f ? SPA2_TEAL : 'transparent',
                  color: filter === f ? 'white' : 'text.secondary',
                  border: `1.5px solid ${filter === f ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>
          <Stack spacing={2}>
            {filtered.map((p) => (
              <SoftCard key={p.id} sx={{ bgcolor: 'common.white' }}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  alignItems={{ sm: 'center' }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 2.5,
                      bgcolor: SPA2_INK,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {p.logo}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
                        {p.title}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>{p.outlet}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>·</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {p.date}
                      </Typography>
                      <Chip
                        label={p.type}
                        size="small"
                        sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                      />
                    </Stack>
                  </Box>
                  <Button
                    href={p.url}
                    startIcon={<Iconify icon="solar:arrow-right-up-linear" width={14} />}
                    sx={{
                      borderRadius: 99,
                      color: SPA2_TEAL_DARK,
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Đọc bài
                  </Button>
                </Stack>
              </SoftCard>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Press contact */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm">
          <SoftCard sx={{ textAlign: 'center' }}>
            <Iconify
              icon="solar:pen-new-round-bold-duotone"
              width={44}
              sx={{ color: SPA2_TEAL, mb: 2 }}
            />
            <Typography variant="h5" sx={{ color: SPA2_INK, mb: 1 }}>
              Yêu cầu phỏng vấn & tài liệu
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
              Liên hệ bộ phận truyền thông để nhận media kit, bộ ảnh thương hiệu hoặc đặt lịch phỏng
              vấn.
            </Typography>
            <Stack direction="row" spacing={1.5} justifyContent="center">
              <Button
                startIcon={<Iconify icon="solar:letter-bold" />}
                component={RouterLink}
                href={`mailto:${contact.email}`}
                sx={{
                  borderRadius: 99,
                  px: 3,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                {contact.email}
              </Button>
              <Button
                startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
                href={contact.mediaKitUrl || undefined}
                sx={{
                  borderRadius: 99,
                  px: 3,
                  color: SPA2_TEAL_DARK,
                  border: `1.5px solid ${SPA2_TEAL}`,
                }}
              >
                Tải Media Kit
              </Button>
            </Stack>
          </SoftCard>
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 8. AFFILIATE PROGRAM
// ══════════════════════════════════════════════════════════

export function Spa2AffiliatePageView({
  banner = spa2AffiliateBanner,
  stats = spa2AffiliateStats,
  steps = spa2AffiliateSteps,
  tiers = spa2AffiliateTiers,
}: {
  banner?: Spa2AffiliateBanner;
  stats?: Spa2AffiliateStat[];
  steps?: Spa2AffiliateStep[];
  tiers?: Spa2AffiliateTier[];
} = {}) {
  const [applied, setApplied] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      {/* Stats */}
      <Box sx={{ py: 4, bgcolor: SPA2_TEAL }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {stats.map((s) => (
              <Grid key={s.id} xs={6} sm={3}>
                <Stack alignItems="center" sx={{ color: 'white', textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {s.n}
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.8 }}>{s.l}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How it works */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Cách thức" title="4 bước để bắt đầu kiếm tiền" />
          <Grid container spacing={3}>
            {steps.map((s, i) => (
              <Grid key={s.id} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 2 }}>
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
                      }}
                    >
                      <Iconify icon={s.icon} width={28} sx={{ color: 'white' }} />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: 'calc(50% - 36px)',
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        bgcolor: SPA2_INK,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </Box>
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {s.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {s.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Tiers */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Hoa hồng" title="Các cấp độ cộng tác viên" />
          <Grid container spacing={3} alignItems="stretch">
            {tiers.map((tier) => (
              <Grid key={tier.id} xs={12} md={4}>
                <Card
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    border: tier.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: tier.hot ? '0 20px 48px rgba(46,139,122,0.18)' : 'none',
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
                      }}
                    >
                      PHỔ BIẾN NHẤT
                    </Box>
                  )}
                  <Box sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                      <Box
                        sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: tier.color }}
                      />
                      <Typography variant="h5" sx={{ color: SPA2_INK }}>
                        {tier.name}
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontWeight: 700, color: tier.color, fontSize: 32, mb: 0.25 }}>
                      {tier.commission}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 2 }}>
                      hoa hồng · từ {tier.threshold}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={1.25} sx={{ mb: 3 }}>
                      {tier.perks.map((p) => (
                        <Stack key={p} direction="row" spacing={1.5} alignItems="center">
                          <Iconify
                            icon="solar:check-circle-bold"
                            width={15}
                            sx={{ color: tier.color, flexShrink: 0 }}
                          />
                          <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{p}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      onClick={() => setApplied(true)}
                      sx={{
                        borderRadius: 99,
                        py: 1.3,
                        bgcolor: tier.hot ? SPA2_TEAL : 'transparent',
                        color: tier.hot ? 'white' : SPA2_TEAL_DARK,
                        border: tier.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                        '&:hover': { bgcolor: SPA2_TEAL_DARK, color: 'white' },
                      }}
                    >
                      Đăng ký {tier.name}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Application form */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="sm">
          <SoftCard>
            {!applied ? (
              <Stack spacing={3}>
                <SectionTitle eyebrow="Đăng ký" title="Tham gia ngay hôm nay" align="left" />
                <TextField fullWidth size="small" label="Họ và tên" />
                <TextField fullWidth size="small" label="Email" type="email" />
                <TextField fullWidth size="small" label="Số điện thoại" />
                <TextField
                  fullWidth
                  size="small"
                  label="Kênh của bạn (blog, Instagram, TikTok...)"
                />
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  label="Tại sao bạn muốn làm CTV của Nature Spa?"
                />
                <Button
                  fullWidth
                  size="large"
                  onClick={() => setApplied(true)}
                  sx={{
                    borderRadius: 99,
                    py: 1.5,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  Gửi đơn đăng ký
                </Button>
              </Stack>
            ) : (
              <Stack alignItems="center" spacing={2.5} sx={{ py: 4 }}>
                <Iconify icon="solar:check-circle-bold" width={56} sx={{ color: SPA2_TEAL }} />
                <Typography variant="h5" sx={{ color: SPA2_INK }}>
                  Đơn đã được gửi!
                </Typography>
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 380 }}>
                  Chúng tôi sẽ xem xét và phản hồi trong vòng 24 giờ làm việc. Kiểm tra email để
                  nhận thông tin đăng nhập vào dashboard.
                </Typography>
                <Button
                  onClick={() => setApplied(false)}
                  sx={{
                    borderRadius: 99,
                    color: SPA2_TEAL_DARK,
                    border: `1.5px solid ${SPA2_TEAL}`,
                    px: 3,
                  }}
                >
                  Quay về
                </Button>
              </Stack>
            )}
          </SoftCard>
        </Container>
      </Box>

      {/* Cross-promo: Loyalty Rewards */}
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="sm">
          <SoftCard
            sx={{
              textAlign: 'center',
              border: `1.5px dashed ${SPA2_TEAL}`,
              bgcolor: SPA2_CREAM,
            }}
          >
            <Iconify icon="solar:gift-bold" width={32} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
            <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
              Là khách hàng thân thiết?
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
              Xem chương trình tích điểm Loyalty Rewards và đổi ngay các phần thưởng hấp dẫn.
            </Typography>
            <Button
              component={RouterLink}
              href={paths.spa2.loyaltyRewards}
              endIcon={<Iconify icon="solar:arrow-right-linear" width={16} />}
              sx={{
                borderRadius: 99,
                px: 3,
                bgcolor: SPA2_TEAL,
                color: 'white',
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
              }}
            >
              Xem chương trình Loyalty Rewards
            </Button>
          </SoftCard>
        </Container>
      </Box>

      <GradientCta
        title="Bắt đầu kiếm tiền cùng Nature Spa"
        sub="Không cần vốn, không cần kinh nghiệm — chỉ cần đam mê."
        btnLabel="Đăng ký miễn phí"
        href="#"
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 9. SPA FINDER (TÌM CHI NHÁNH & KTV)
// ══════════════════════════════════════════════════════════

export function Spa2SpaFinderPageView({
  banner = spa2SpaFinderBanner,
  therapists = spa2SpaFinderTherapists,
}: {
  banner?: Spa2SpaFinderBanner;
  therapists?: Spa2SpaFinderTherapist[];
} = {}) {
  const [city, setCity] = useState('all');
  const [specialty, setSpecialty] = useState('all');
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [selected, setSelected] = useState<Spa2SpaFinderTherapist | null>(null);

  const CITIES = ['all', 'TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Nha Trang'];
  const SPECIALTIES = ['all', 'Facial', 'Massage', 'Body', 'Yoga', 'Detox'];

  const filtered = therapists.filter((k) => {
    if (city !== 'all' && !k.branch.includes(city.replace('TP.HCM', 'Q'))) return false;
    if (
      specialty !== 'all' &&
      !k.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase()))
    )
      return false;
    if (onlyAvail && !k.available) return false;
    return true;
  });

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Filter */}
          <SoftCard sx={{ mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Thành phố"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {CITIES.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c === 'all' ? 'Tất cả thành phố' : c}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Chuyên môn"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {SPECIALTIES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s === 'all' ? 'Tất cả chuyên môn' : s}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={onlyAvail}
                      onChange={(e) => setOnlyAvail(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-thumb': { bgcolor: SPA2_TEAL },
                        '& .Mui-checked + .MuiSwitch-track': { bgcolor: SPA2_TEAL_LIGHT },
                      }}
                    />
                  }
                  label={<Typography sx={{ fontSize: 13.5 }}>Chỉ hiện KTV đang rảnh</Typography>}
                />
              </Grid>
            </Grid>
          </SoftCard>

          {/* Header row + link to full therapist profiles */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 3 }}
          >
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
              {filtered.length} chuyên viên phù hợp với bộ lọc của bạn
            </Typography>
            <Button
              component={RouterLink}
              href={paths.spa2.therapistProfile}
              endIcon={<Iconify icon="solar:arrow-right-linear" width={16} />}
              sx={{ color: SPA2_TEAL_DARK, fontSize: 13.5 }}
            >
              Xem đầy đủ hồ sơ chuyên viên
            </Button>
          </Stack>

          {/* Map + list */}
          <Grid container spacing={4}>
            <Grid xs={12} md={5}>
              <Box sx={{ borderRadius: 4, overflow: 'hidden', height: 400, position: 'relative' }}>
                <iframe
                  title="Bản đồ chi nhánh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://www.google.com/maps?q=Ho+Chi+Minh+City+spa&output=embed"
                />
              </Box>
            </Grid>
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
                {filtered.length === 0 ? (
                  <Stack alignItems="center" sx={{ py: 6 }}>
                    <Iconify
                      icon="solar:magnifer-broken"
                      width={40}
                      sx={{ color: SPA2_CREAM_DARK, mb: 1 }}
                    />
                    <Typography sx={{ color: 'text.secondary' }}>
                      Không tìm thấy KTV phù hợp. Thử thay đổi bộ lọc.
                    </Typography>
                  </Stack>
                ) : (
                  filtered.map((k) => (
                    <Card
                      key={k.id}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: `1px solid ${SPA2_CREAM_DARK}`,
                        boxShadow: 'none',
                        cursor: 'pointer',
                        '&:hover': { borderColor: SPA2_TEAL },
                      }}
                      onClick={() => setSelected(k)}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ position: 'relative', flexShrink: 0 }}>
                          <Avatar src={k.avatar} sx={{ width: 56, height: 56 }} />
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              bgcolor: k.available ? '#4CAF50' : '#9E9E9E',
                              border: '2px solid white',
                            }}
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.25 }}>
                            <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
                              {k.name}
                            </Typography>
                            <Chip
                              label={k.available ? 'Đang rảnh' : 'Bận'}
                              size="small"
                              sx={{
                                bgcolor: k.available ? '#E8F5E9' : SPA2_CREAM_DARK,
                                color: k.available ? '#2E7D32' : 'text.secondary',
                                fontSize: 11,
                                height: 20,
                              }}
                            />
                          </Stack>
                          <Typography sx={{ fontSize: 13, color: SPA2_TEAL, mb: 0.5 }}>
                            {k.role} · {k.exp}
                          </Typography>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Rating
                              value={k.rating}
                              readOnly
                              size="small"
                              precision={0.1}
                              sx={{ fontSize: 13, '& .MuiRating-icon': { color: '#EF9F27' } }}
                            />
                            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                              ({k.reviews})
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>·</Typography>
                            <Iconify
                              icon="solar:map-point-bold"
                              width={12}
                              sx={{ color: SPA2_TEAL }}
                            />
                            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                              {k.branch}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>
                            Sớm nhất
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: k.available ? '#2E7D32' : 'text.secondary',
                            }}
                          >
                            {k.nextSlot}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  ))
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* KTV detail dialog */}
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
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Stack alignItems="center" spacing={1.5} sx={{ mb: 2.5, textAlign: 'center' }}>
              <Avatar
                src={selected.avatar}
                sx={{ width: 80, height: 80, border: `3px solid ${SPA2_TEAL_LIGHT}` }}
              />
              <Box>
                <Typography variant="h6" sx={{ color: SPA2_INK }}>
                  {selected.name}
                </Typography>
                <Typography sx={{ fontSize: 14, color: SPA2_TEAL }}>{selected.role}</Typography>
                <Stack direction="row" justifyContent="center" spacing={0.75} alignItems="center">
                  <Rating
                    value={selected.rating}
                    readOnly
                    size="small"
                    precision={0.1}
                    sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                  />
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                    ({selected.reviews} đánh giá)
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack spacing={1} sx={{ mb: 2 }}>
              {[
                { icon: 'solar:calendar-bold', text: `${selected.exp} kinh nghiệm` },
                { icon: 'solar:map-point-bold', text: selected.branch },
              ].map((i) => (
                <Stack key={i.text} direction="row" spacing={1.5} alignItems="center">
                  <Iconify icon={i.icon} width={16} sx={{ color: SPA2_TEAL }} />
                  <Typography sx={{ fontSize: 13.5, color: 'text.secondary' }}>{i.text}</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mb: 3, gap: 0.75 }}>
              {selected.specialties.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                />
              ))}
            </Stack>
            <Alert
              severity={selected.available ? 'success' : 'info'}
              sx={{ mb: 2, borderRadius: 2, fontSize: 13 }}
            >
              {selected.available
                ? `Đang rảnh · Slot sớm nhất: ${selected.nextSlot}`
                : `Hiện đang bận · Slot gần nhất: ${selected.nextSlot}`}
            </Alert>
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
              Đặt lịch với {selected.name.split(' ').pop()}
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 10. SPA MENU (MENU ĐẦY ĐỦ)
// ══════════════════════════════════════════════════════════

export function Spa2SpaMenuPageView({
  banner = spa2SpaMenuBanner,
  sections = spa2SpaMenuSections,
}: {
  banner?: Spa2SpaMenuBanner;
  sections?: Spa2SpaMenuSection[];
} = {}) {
  const [activeSection, setActiveSection] = useState(0);
  const [search, setSearch] = useState('');

  const allItems = sections.flatMap((s) =>
    s.items.map((item) => ({ ...item, category: s.category }))
  );
  const searchResults = search
    ? allItems.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.desc.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={banner.image.url}
        imageStyle={banner.image}
        eyebrow={banner.eyebrow}
        title={banner.title}
        subtitle={banner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Tìm kiếm dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch('')}>
                    <Iconify icon="solar:close-circle-bold" width={18} />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{ mb: 2, maxWidth: 480 }}
          />

          <Link
            component={RouterLink}
            href={paths.spa2.services}
            underline="hover"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              mb: 4,
              fontSize: 13.5,
              fontWeight: 600,
              color: SPA2_TEAL_DARK,
            }}
          >
            Xem chi tiết & đặt lịch từng dịch vụ
            <Iconify icon="solar:arrow-right-linear" width={16} />
          </Link>

          {search ? (
            /* Search results */
            <Stack spacing={2}>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
                Tìm thấy {searchResults.length} kết quả cho &ldquo;<strong>{search}</strong>&rdquo;
              </Typography>
              {searchResults.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: 'none',
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
                          {item.name}
                        </Typography>
                        {item.badge && (
                          <Chip
                            label={item.badge}
                            size="small"
                            sx={{ bgcolor: SPA2_TEAL, color: 'white', fontSize: 11 }}
                          />
                        )}
                        <Chip
                          label={item.category}
                          size="small"
                          sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                        />
                      </Stack>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {item.duration}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 15, flexShrink: 0 }}
                    >
                      {formatVND(item.price)}
                    </Typography>
                  </Stack>
                </Card>
              ))}
            </Stack>
          ) : (
            <Grid container spacing={4}>
              {/* Category nav */}
              <Grid xs={12} md={3}>
                <Box sx={{ position: 'sticky', top: 100 }}>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 2, fontSize: 14 }}>
                    Danh mục
                  </Typography>
                  <Stack spacing={0.75}>
                    {sections.map((s, i) => (
                      <Button
                        key={s.id}
                        fullWidth
                        onClick={() => setActiveSection(i)}
                        startIcon={
                          <Iconify
                            icon={s.icon}
                            width={18}
                            sx={{ color: i === activeSection ? 'white' : s.color }}
                          />
                        }
                        sx={{
                          justifyContent: 'flex-start',
                          py: 1.2,
                          px: 2,
                          borderRadius: 2.5,
                          bgcolor: i === activeSection ? SPA2_INK : 'transparent',
                          color: i === activeSection ? 'white' : SPA2_INK,
                          fontWeight: i === activeSection ? 600 : 400,
                          '&:hover': { bgcolor: i === activeSection ? SPA2_INK : SPA2_CREAM },
                        }}
                      >
                        {s.category}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Grid>

              {/* Items */}
              <Grid xs={12} md={9}>
                {sections.map(
                  (section, secIdx) =>
                    secIdx === activeSection && (
                      <Box key={section.id}>
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{ mb: 3, pb: 2, borderBottom: `2px solid ${SPA2_CREAM_DARK}` }}
                        >
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 3,
                              bgcolor: `${section.color}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Iconify icon={section.icon} width={22} sx={{ color: section.color }} />
                          </Box>
                          <Typography variant="h5" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                            {section.category}
                          </Typography>
                        </Stack>
                        <Stack spacing={2}>
                          {section.items.map((item) => (
                            <Card
                              key={item.id}
                              sx={{
                                p: 2.5,
                                borderRadius: 3,
                                border: `1px solid ${SPA2_CREAM_DARK}`,
                                boxShadow: 'none',
                                '&:hover': { borderColor: SPA2_TEAL, bgcolor: SPA2_CREAM },
                              }}
                            >
                              <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                alignItems={{ sm: 'center' }}
                              >
                                <Box sx={{ flex: 1 }}>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mb: 0.5 }}
                                  >
                                    <Typography
                                      sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}
                                    >
                                      {item.name}
                                    </Typography>
                                    {item.badge && (
                                      <Chip
                                        label={item.badge}
                                        size="small"
                                        sx={{
                                          bgcolor:
                                            section.color === SPA2_TEAL ? SPA2_TEAL : section.color,
                                          color: 'white',
                                          fontSize: 11,
                                          height: 20,
                                        }}
                                      />
                                    )}
                                  </Stack>
                                  <Typography
                                    sx={{
                                      fontSize: 13.5,
                                      color: 'text.secondary',
                                      lineHeight: 1.65,
                                    }}
                                  >
                                    {item.desc}
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mt: 1 }}
                                  >
                                    <Iconify
                                      icon="solar:clock-circle-bold"
                                      width={14}
                                      sx={{ color: section.color }}
                                    />
                                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                                      {item.duration}
                                    </Typography>
                                  </Stack>
                                </Box>
                                <Stack
                                  alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
                                  spacing={1}
                                  sx={{ flexShrink: 0 }}
                                >
                                  <Typography
                                    sx={{ fontWeight: 700, color: section.color, fontSize: 17 }}
                                  >
                                    {formatVND(item.price)}
                                  </Typography>
                                  <Button
                                    component={RouterLink}
                                    href={paths.spa2.booking}
                                    size="small"
                                    sx={{
                                      borderRadius: 99,
                                      bgcolor: SPA2_TEAL,
                                      color: 'white',
                                      fontSize: 12,
                                      px: 2,
                                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                                    }}
                                  >
                                    Đặt ngay
                                  </Button>
                                </Stack>
                              </Stack>
                            </Card>
                          ))}
                        </Stack>
                      </Box>
                    )
                )}
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>

      <GradientCta
        title="Không biết chọn dịch vụ nào?"
        sub="Để KTV tư vấn phù hợp nhất với tình trạng da và nhu cầu của bạn."
        btnLabel="Tư vấn miễn phí"
        href={paths.spa2.contact}
      />
    </Box>
  );
}
