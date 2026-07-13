import { useMemo, useState } from 'react';

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

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Services,
  spa2Branches,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
  SPA2_PAGE_IMAGES,
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
  eyebrow,
  title,
  subtitle,
  cta,
  dark,
}: {
  img: string;
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
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
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

// ══════════════════════════════════════════════════════════
// 1. NUTRITION & DETOX
// ══════════════════════════════════════════════════════════

const NUTRITION_PLANS = [
  {
    name: 'Juice Cleanse 3 ngày',
    price: 1890000,
    cal: '800–1200 kcal/ngày',
    icon: 'solar:cup-bold-duotone',
    color: '#4CAF50',
    desc: 'Ép lạnh rau củ quả hữu cơ, không đường, giải độc nhẹ nhàng và hiệu quả.',
    includes: [
      '6 loại nước ép/ngày',
      'Tư vấn dinh dưỡng',
      'Hướng dẫn sau cleanse',
      'Bộ kit tại nhà',
    ],
  },
  {
    name: 'Detox & Thải Độc 7 ngày',
    price: 3990000,
    cal: '1200–1500 kcal/ngày',
    icon: 'solar:leaf-bold-duotone',
    color: SPA2_TEAL,
    desc: 'Kế hoạch ăn sạch 7 ngày, kết hợp liệu trình massage detox và thiền định.',
    includes: [
      'Thực đơn cá nhân hóa',
      '2 buổi massage detox',
      'App theo dõi tiến trình',
      'Coaching online hàng ngày',
      'Sách thực phẩm lành mạnh',
    ],
  },
  {
    name: 'Gói Dinh Dưỡng Toàn Diện 30 ngày',
    price: 8900000,
    cal: 'Tùy thể trạng',
    icon: 'solar:chart-2-bold-duotone',
    color: '#7F77DD',
    desc: 'Hành trình 30 ngày thay đổi thói quen ăn uống với chuyên gia dinh dưỡng.',
    includes: [
      'Phân tích thể trạng',
      'Thực đơn tuần hóa mỗi tuần',
      'Check-in 1-1 hàng tuần',
      'Công thức nấu ăn healthy',
      '4 buổi spa phục hồi',
      'Xét nghiệm đầu & cuối',
    ],
  },
];

const SUPERFOOD_TIPS = [
  { food: 'Nghệ & tiêu đen', icon: '🌿', benefit: 'Chống viêm, kháng khuẩn, sáng da từ bên trong' },
  {
    food: 'Collagen từ cá biển',
    icon: '🐟',
    benefit: 'Tái tạo da, tăng đàn hồi, chống nhăn tự nhiên',
  },
  {
    food: 'Trà xanh Matcha',
    icon: '🍵',
    benefit: 'Detox gan, giàu chất chống oxy hóa, giảm stress',
  },
  { food: 'Quả bơ', icon: '🥑', benefit: 'Dưỡng ẩm da từ trong ra ngoài, giàu vitamin E' },
  { food: 'Gừng & chanh', icon: '🍋', benefit: 'Tăng miễn dịch, giải độc, cải thiện tiêu hóa' },
  { food: 'Hạt chia & lanh', icon: '🌱', benefit: 'Omega-3 nuôi dưỡng da, điều hòa hormone' },
];

export function Spa2NutritionPageView() {
  const [selected, setSelected] = useState<(typeof NUTRITION_PLANS)[0] | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const QUIZ = [
    {
      q: 'Mục tiêu chính của bạn?',
      opts: ['Giảm cân', 'Làn da đẹp hơn', 'Tăng năng lượng', 'Cải thiện tiêu hóa'],
    },
    {
      q: 'Bạn đang ăn uống thế nào?',
      opts: [
        'Ăn nhiều tinh bột & đường',
        'Ăn khá lành mạnh',
        'Ăn chay / thuần thực vật',
        'Không kiểm soát được',
      ],
    },
    {
      q: 'Thời gian bạn có?',
      opts: ['3 ngày cuối tuần', '1 tuần', '1 tháng trở lên', 'Linh hoạt theo lịch'],
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.blog}
        eyebrow="DINH DƯỠNG"
        title="Đẹp từ bên trong, sáng từ bên ngoài"
        subtitle="Chương trình dinh dưỡng lành mạnh kết hợp liệu trình spa — chăm sóc toàn diện cơ thể và tâm trí."
      />

      {/* Stats */}
      <Box sx={{ py: 4, bgcolor: SPA2_TEAL }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {[
              { n: '94%', l: 'Khách hàng cảm thấy khỏe hơn' },
              { n: '–3kg', l: 'Trung bình sau 7 ngày detox' },
              { n: '30+', l: 'Chuyên gia dinh dưỡng' },
              { n: '500+', l: 'Thực đơn healthy' },
            ].map((s) => (
              <Grid key={s.l} xs={6} sm={3}>
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
            {NUTRITION_PLANS.map((p) => (
              <Grid key={p.name} xs={12} md={4}>
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
            {SUPERFOOD_TIPS.map((tip) => (
              <Grid key={tip.food} xs={12} sm={6} md={4}>
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
                value={(quizStep / QUIZ.length) * 100}
                sx={{
                  height: 4,
                  bgcolor: SPA2_CREAM_DARK,
                  '& .MuiLinearProgress-bar': { bgcolor: SPA2_TEAL },
                }}
              />
              <Box sx={{ p: 3 }}>
                <Typography sx={{ fontSize: 12, color: 'text.disabled', mb: 2 }}>
                  Câu {quizStep + 1} / {QUIZ.length}
                </Typography>
                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3 }}>
                  {QUIZ[quizStep].q}
                </Typography>
                <Stack spacing={1.5}>
                  {QUIZ[quizStep].opts.map((opt) => (
                    <Button
                      key={opt}
                      fullWidth
                      onClick={() =>
                        quizStep < QUIZ.length - 1 ? setQuizStep(quizStep + 1) : setQuizDone(true)
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

const CONSULTANTS = [
  {
    name: 'BS. Hoàng Anh Tuấn',
    role: 'Bác sĩ Da liễu',
    exp: '10 năm',
    certs: ['Chứng chỉ Da liễu', 'CIDESCO'],
    avatar: 'https://i.pravatar.cc/200?img=15',
    rating: 4.9,
    reviews: 247,
    slots: ['9:00', '10:30', '14:00', '15:30'],
    specialty: ['Trị mụn', 'Lão hóa', 'Sắc tố'],
  },
  {
    name: 'Th.S Đặng Thu Trang',
    role: 'Chuyên gia Skincare',
    exp: '12 năm',
    certs: ['CIDESCO', 'CIBTAC'],
    avatar: 'https://i.pravatar.cc/200?img=45',
    rating: 4.8,
    reviews: 189,
    slots: ['8:00', '11:00', '14:30', '16:00'],
    specialty: ['Dưỡng ẩm', 'Nhạy cảm', 'Chống lão hóa'],
  },
  {
    name: 'Nguyễn Thảo Vy',
    role: 'Chuyên gia Wellness',
    exp: '15 năm',
    certs: ['CIDESCO', 'Master Trainer'],
    avatar: 'https://i.pravatar.cc/200?img=47',
    rating: 5.0,
    reviews: 312,
    slots: ['10:00', '13:00', '15:00'],
    specialty: ['Wellness tổng quát', 'Detox', 'Stress'],
  },
  {
    name: 'Lê Gia Huy',
    role: 'Chuyên gia Dinh dưỡng',
    exp: '8 năm',
    certs: ['Chứng chỉ Dinh dưỡng', 'ISO Trainer'],
    avatar: 'https://i.pravatar.cc/200?img=14',
    rating: 4.9,
    reviews: 156,
    slots: ['9:30', '12:00', '14:00', '17:00'],
    specialty: ['Dinh dưỡng', 'Giảm cân', 'Detox'],
  },
];

export function Spa2ConsultationPageView() {
  const [mode, setMode] = useState<'online' | 'offline'>('online');
  const [selected, setSelected] = useState<(typeof CONSULTANTS)[0] | null>(null);
  const [slot, setSlot] = useState('');
  const [booked, setBooked] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.contact}
        eyebrow="TƯ VẤN CHUYÊN GIA"
        title="Kết nối với chuyên gia của bạn"
        subtitle="Tư vấn 1-1 với bác sĩ da liễu và chuyên gia wellness — trực tiếp hoặc qua video call."
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
              {CONSULTANTS.map((c) => (
                <Grid key={c.name} xs={12} sm={6} md={3}>
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

const VIP_ROOMS = [
  {
    name: 'The Garden Suite',
    size: '45m²',
    capacity: '1–2 người',
    price: 2500000,
    duration: 'Từ 3 giờ',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
    features: [
      'Bồn tắm đá hoa cương',
      'Vườn thiên nhiên thu nhỏ',
      'Trà & bánh cao cấp',
      'Hệ thống âm thanh vòm',
      'Nến thơm Diptyque',
      'Butler riêng',
    ],
  },
  {
    name: 'The Lotus Penthouse',
    size: '65m²',
    capacity: '2 người',
    price: 4200000,
    duration: 'Từ 4 giờ',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    features: [
      'View toàn thành phố',
      'Bồn tắm sục hoa',
      'Champagne & trái cây',
      'Massage ghế Inada',
      'Tủ quần áo & đồ vệ sinh cao cấp',
      'Check-in riêng tư',
    ],
  },
  {
    name: 'The Bamboo Haven',
    size: '35m²',
    capacity: '1 người',
    price: 1800000,
    duration: 'Từ 2 giờ',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    features: [
      'Thiết kế tre nứa truyền thống',
      'Giường massage Japanse style',
      'Xông hơi tích hợp',
      'Trà sưu tầm & mật ong rừng',
      'Âm nhạc thiên nhiên',
    ],
  },
];

const PREMIUM_PERKS = [
  {
    icon: 'solar:user-bold-duotone',
    title: 'Butler cá nhân',
    desc: 'Phục vụ riêng từ khi đến đến khi ra về — không cần tự mình chuẩn bị bất cứ điều gì.',
  },
  {
    icon: 'solar:car-bold-duotone',
    title: 'Đưa đón tận nơi',
    desc: 'Xe đưa đón tại nhà hoặc khách sạn trong bán kính 15km — miễn phí cho gói Platinum.',
  },
  {
    icon: 'solar:bottle-bold-duotone',
    title: 'Champagne & ẩm thực',
    desc: 'Menu đồ uống và bánh ngọt cao cấp được chuẩn bị theo sở thích riêng của bạn.',
  },
  {
    icon: 'solar:camera-bold-duotone',
    title: 'Chụp ảnh kỷ niệm',
    desc: 'Photographer chuyên nghiệp ghi lại khoảnh khắc — ảnh được giao trong 24 giờ.',
  },
];

export function Spa2VIPRoomPageView() {
  const [activeRoom, setActiveRoom] = useState(0);
  const room = VIP_ROOMS[activeRoom];

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
            backgroundImage: `url(${SPA2_PAGE_IMAGES.account})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
              PHÒNG VIP & PREMIUM
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 720 }}
            >
              Trải nghiệm sang trọng không giới hạn
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 540 }}>
              Phòng VIP riêng tư với dịch vụ butler cá nhân, nội thất cao cấp và mọi tiện nghi đẳng
              cấp nhất.
            </Typography>
            <Chip
              label="Chỉ từ 1.800.000đ / 2 giờ"
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
            {VIP_ROOMS.map((r, i) => (
              <Chip
                key={r.name}
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
            {PREMIUM_PERKS.map((p) => (
              <Grid key={p.title} xs={12} sm={6} md={3}>
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

export function Spa2PackageBuilderPageView() {
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

  useMemo(() => {
    if (cart.length >= 3) setDiscount(15);
    else if (cart.length >= 2) setDiscount(10);
    else setDiscount(0);
  }, [cart.length]);

  const finalTotal = total * (1 - discount / 100);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.services}
        eyebrow="TỰ TẠO COMBO"
        title="Thiết kế gói spa theo ý bạn"
        subtitle="Chọn các dịch vụ yêu thích — tự ghép combo và nhận ưu đãi đặc biệt cho gói từ 2 dịch vụ trở lên."
      />

      {/* Discount banner */}
      <Box sx={{ py: 2, bgcolor: cart.length >= 2 ? SPA2_TEAL : SPA2_CREAM_DARK }}>
        <Container>
          <Stack direction="row" justifyContent="center" spacing={2} alignItems="center">
            <Iconify
              icon="solar:gift-bold"
              width={18}
              sx={{ color: cart.length >= 2 ? 'white' : 'text.secondary' }}
            />
            <Typography
              sx={{
                color: cart.length >= 2 ? 'white' : 'text.secondary',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {cart.length === 0 && 'Chọn 2 dịch vụ → giảm 10% · Chọn 3+ dịch vụ → giảm 15%'}
              {cart.length === 1 && 'Thêm 1 dịch vụ nữa để nhận giảm 10%!'}
              {cart.length >= 2 &&
                cart.length < 3 &&
                `🎉 Bạn đang được giảm 10%! Thêm 1 dịch vụ nữa để giảm 15%.`}
              {cart.length >= 3 &&
                `🎉 Tuyệt vời! Bạn đang được giảm 15% cho combo ${cart.length} dịch vụ!`}
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

const APPOINTMENTS = {
  upcoming: [
    {
      id: 'A001',
      date: '15/07/2026',
      time: '10:00',
      service: 'Facial Organic',
      branch: 'Quận 1, TP.HCM',
      ktv: 'Phạm Hồng Nhi',
      status: 'confirmed',
      price: 890000,
    },
    {
      id: 'A002',
      date: '22/07/2026',
      time: '14:30',
      service: 'Massage Thảo Dược',
      branch: 'Quận 1, TP.HCM',
      ktv: 'Trần Minh Khôi',
      status: 'pending',
      price: 690000,
    },
  ],
  history: [
    {
      id: 'B001',
      date: '01/07/2026',
      time: '09:00',
      service: 'Aromatherapy',
      branch: 'Quận 1, TP.HCM',
      ktv: 'Phạm Hồng Nhi',
      status: 'done',
      rating: 5,
      price: 790000,
    },
    {
      id: 'B002',
      date: '15/06/2026',
      time: '15:00',
      service: 'Body Scrub & Wrap',
      branch: 'Hồ Tây, Hà Nội',
      ktv: 'Nguyễn Bích Ngọc',
      status: 'done',
      rating: 4,
      price: 990000,
    },
    {
      id: 'B003',
      date: '01/06/2026',
      time: '10:00',
      service: 'Facial Organic',
      branch: 'Quận 1, TP.HCM',
      ktv: 'Trần Minh Khôi',
      status: 'cancelled',
      price: 890000,
    },
  ],
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bgcolor: string }> = {
  confirmed: { label: 'Đã xác nhận', color: '#2E7D32', bgcolor: '#E8F5E9' },
  pending: { label: 'Chờ xác nhận', color: '#854F0B', bgcolor: '#FEF3E2' },
  done: { label: 'Đã hoàn thành', color: '#0C447C', bgcolor: '#EBF5FF' },
  cancelled: { label: 'Đã hủy', color: '#C62828', bgcolor: '#FFEBEE' },
};

export function Spa2AppointmentPageView() {
  const [tab, setTab] = useState(0);
  const [reschedule, setReschedule] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.account}
        eyebrow="LỊCH HẸN CỦA TÔI"
        title="Quản lý lịch hẹn"
        subtitle="Xem, đổi và theo dõi tất cả lịch hẹn spa của bạn tại một nơi."
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {/* Summary cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {[
              {
                n: APPOINTMENTS.upcoming.length,
                l: 'Lịch sắp tới',
                icon: 'solar:calendar-bold',
                color: SPA2_TEAL,
              },
              {
                n: APPOINTMENTS.history.filter((a) => a.status === 'done').length,
                l: 'Đã hoàn thành',
                icon: 'solar:check-circle-bold',
                color: '#2E7D32',
              },
              { n: '3.250', l: 'Điểm tích lũy', icon: 'solar:star-bold', color: '#EF9F27' },
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
            <Tab
              label={`Sắp tới (${APPOINTMENTS.upcoming.length})`}
              sx={{ textTransform: 'none' }}
            />
            <Tab
              label={`Lịch sử (${APPOINTMENTS.history.length})`}
              sx={{ textTransform: 'none' }}
            />
          </Tabs>

          <Stack spacing={2}>
            {(tab === 0 ? APPOINTMENTS.upcoming : APPOINTMENTS.history).map((apt) => {
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

export function Spa2NewsletterPageView() {
  const [email, setEmail] = useState('');
  const [prefs, setPrefs] = useState({ deals: true, tips: true, events: false, new: true });
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [done, setDone] = useState(false);

  const NEWSLETTER_CONTENT = [
    {
      icon: 'solar:tag-bold-duotone',
      title: 'Ưu đãi độc quyền',
      desc: 'Deal flash sale chỉ gửi qua email — không đăng công khai.',
    },
    {
      icon: 'solar:leaf-bold-duotone',
      title: 'Mẹo chăm sóc da',
      desc: 'Bí quyết skincare theo mùa từ chuyên gia Nature Spa.',
    },
    {
      icon: 'solar:calendar-bold-duotone',
      title: 'Sự kiện sắp đến',
      desc: 'Workshop, retreat và sự kiện cộng đồng thông báo sớm nhất.',
    },
    {
      icon: 'solar:star-bold-duotone',
      title: 'Sản phẩm mới',
      desc: 'Review và mẫu dùng thử miễn phí cho subscriber đầu tiên.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.blog}
        eyebrow="BẢN TIN"
        title="Nhận tin tức sức khỏe hàng tuần"
        subtitle="Ưu đãi độc quyền, mẹo chăm sóc da và sự kiện mới nhất — thẳng vào hộp thư của bạn."
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5} alignItems="center">
            {/* Benefits */}
            <Grid xs={12} md={5}>
              <SectionTitle eyebrow="Nội dung" title="Bạn sẽ nhận được" align="left" />
              <Stack spacing={2.5}>
                {NEWSLETTER_CONTENT.map((c) => (
                  <Stack key={c.title} direction="row" spacing={2} alignItems="flex-start">
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
                Đăng ký nhận ngay voucher <strong>100.000đ</strong> cho lần đặt lịch đầu tiên từ bản
                tin.
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
                      Cảm ơn bạn đã đăng ký! Voucher <strong>100.000đ</strong> đã được gửi đến{' '}
                      <strong>{email}</strong>. Kiểm tra hộp thư ngay nhé!
                    </Typography>
                    <Chip
                      label="Mã: WELCOME100"
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
              Cùng 28.000+ người đăng ký
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
              Độ hài lòng bản tin: 4.8/5 ⭐
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

const PRESS_COVERAGE = [
  {
    outlet: 'VnExpress',
    logo: 'VE',
    date: '15/06/2026',
    title: 'Nature Spa: Thương hiệu spa xanh được lòng giới trẻ Việt',
    type: 'Feature',
    url: '#',
  },
  {
    outlet: 'Thanh Niên',
    logo: 'TN',
    date: '01/06/2026',
    title: 'Top 10 Spa được yêu thích nhất 2026 tại TP.HCM',
    type: 'Ranking',
    url: '#',
  },
  {
    outlet: 'Forbes Vietnam',
    logo: 'FV',
    date: '15/05/2026',
    title: 'Startup spa hữu cơ tăng trưởng 300% sau đại dịch',
    type: 'Business',
    url: '#',
  },
  {
    outlet: 'Dép Plus',
    logo: 'DP',
    date: '01/05/2026',
    title: 'Review chi tiết: 8 giờ tại Nature Spa Retreat Day',
    type: 'Review',
    url: '#',
  },
  {
    outlet: 'Cosmopolitan VN',
    logo: 'CV',
    date: '01/04/2026',
    title: 'Nature Spa đoạt giải "Eco-Friendly Brand of the Year"',
    type: 'Award',
    url: '#',
  },
  {
    outlet: 'VTV Online',
    logo: 'VT',
    date: '15/03/2026',
    title: 'Nature Spa chia sẻ bí quyết chăm sóc da mùa hè',
    type: 'Interview',
    url: '#',
  },
];

const AWARDS = [
  {
    name: 'Eco-Friendly Brand of the Year',
    org: 'Vietnam Beauty Awards 2026',
    icon: 'solar:leaf-bold-duotone',
    color: '#2E7D32',
  },
  {
    name: 'Best Wellness Experience',
    org: 'Travel & Leisure Awards 2025',
    icon: 'solar:star-bold-duotone',
    color: '#EF9F27',
  },
  {
    name: 'Top 10 Trusted Spa',
    org: 'Consumer Choice Awards 2025',
    icon: 'solar:medal-ribbon-star-bold-duotone',
    color: SPA2_TEAL,
  },
  {
    name: 'Best Green Initiative',
    org: 'Sustainable Business Awards 2024',
    icon: 'solar:trees-bold-duotone',
    color: '#4CAF50',
  },
];

export function Spa2PressPageView() {
  const [filter, setFilter] = useState('all');
  const TYPE_FILTERS = ['all', 'Feature', 'Ranking', 'Business', 'Review', 'Award', 'Interview'];
  const filtered =
    filter === 'all' ? PRESS_COVERAGE : PRESS_COVERAGE.filter((p) => p.type === filter);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.partners}
        eyebrow="BÁO CHÍ & TRUYỀN THÔNG"
        title="Nature Spa trên mặt báo"
        subtitle="Được đề cập bởi các tạp chí và kênh truyền thông uy tín hàng đầu Việt Nam và quốc tế."
      />

      {/* Awards */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Giải thưởng" title="Vinh danh & công nhận" />
          <Grid container spacing={3}>
            {AWARDS.map((a) => (
              <Grid key={a.name} xs={12} sm={6} md={3}>
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
              <SoftCard key={p.title} sx={{ bgcolor: 'common.white' }}>
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
                href="mailto:press@naturespa.vn"
                sx={{
                  borderRadius: 99,
                  px: 3,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                press@naturespa.vn
              </Button>
              <Button
                startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
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

const AFFILIATE_TIERS = [
  {
    name: 'Starter',
    commission: '8%',
    threshold: '0đ',
    color: '#9E9E9E',
    perks: ['Link cá nhân', 'Dashboard cơ bản', 'Thanh toán hàng tháng', 'Hỗ trợ email'],
  },
  {
    name: 'Pro',
    commission: '12%',
    threshold: '10 triệu đ/tháng',
    color: SPA2_TEAL,
    hot: true,
    perks: [
      '8% + thưởng theo KPI',
      'Dashboard nâng cao',
      'Thanh toán 2 lần/tháng',
      'Banner & tài liệu marketing',
      'Hỗ trợ ưu tiên',
    ],
  },
  {
    name: 'Elite',
    commission: '18%',
    threshold: '50 triệu đ/tháng',
    color: '#7F77DD',
    perks: [
      '18% + override bonus',
      'Báo cáo real-time',
      'Account manager riêng',
      'Co-marketing budget',
      'Xuất hiện trên website Nature Spa',
    ],
  },
];

export function Spa2AffiliatePageView() {
  const [applied, setApplied] = useState(false);

  const HOW_IT_WORKS = [
    {
      icon: 'solar:user-plus-bold-duotone',
      title: 'Đăng ký miễn phí',
      desc: 'Điền form, được duyệt trong 24 giờ.',
    },
    {
      icon: 'solar:link-bold-duotone',
      title: 'Nhận link riêng',
      desc: 'Link tracking cá nhân theo dõi mọi lượt click.',
    },
    {
      icon: 'solar:share-bold-duotone',
      title: 'Chia sẻ nội dung',
      desc: 'Blog, social, email — bất kỳ kênh nào bạn có.',
    },
    {
      icon: 'solar:wallet-money-bold-duotone',
      title: 'Nhận hoa hồng',
      desc: 'Thanh toán qua ngân hàng hoặc ví điện tử.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.careers}
        eyebrow="CỘNG TÁC VIÊN"
        title="Kiếm thu nhập cùng Nature Spa"
        subtitle="Chia sẻ về lối sống lành mạnh và nhận hoa hồng lên đến 18% cho mỗi giao dịch thành công."
      />

      {/* Stats */}
      <Box sx={{ py: 4, bgcolor: SPA2_TEAL }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {[
              { n: '18%', l: 'Hoa hồng tối đa' },
              { n: '1.200+', l: 'CTV đang hoạt động' },
              { n: '24h', l: 'Duyệt đơn' },
              { n: '0đ', l: 'Chi phí tham gia' },
            ].map((s) => (
              <Grid key={s.l} xs={6} sm={3}>
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
            {HOW_IT_WORKS.map((s, i) => (
              <Grid key={s.title} xs={12} sm={6} md={3}>
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
            {AFFILIATE_TIERS.map((tier) => (
              <Grid key={tier.name} xs={12} md={4}>
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

const KTV_LIST = [
  {
    name: 'Phạm Hồng Nhi',
    role: 'Facial Specialist',
    avatar: 'https://i.pravatar.cc/200?img=32',
    branch: 'Quận 1, TP.HCM',
    rating: 4.9,
    reviews: 312,
    exp: '8 năm',
    available: true,
    specialties: ['Facial', 'Lão hóa', 'Mụn'],
    nextSlot: '09:00 hôm nay',
  },
  {
    name: 'Trần Minh Khôi',
    role: 'Massage Therapist',
    avatar: 'https://i.pravatar.cc/200?img=12',
    branch: 'Hồ Tây, Hà Nội',
    rating: 4.8,
    reviews: 256,
    exp: '10 năm',
    available: true,
    specialties: ['Massage', 'Detox', 'Body'],
    nextSlot: '14:30 hôm nay',
  },
  {
    name: 'Nguyễn Bích Ngọc',
    role: 'Wellness Expert',
    avatar: 'https://i.pravatar.cc/200?img=47',
    branch: 'Biển Mỹ Khê, Đà Nẵng',
    rating: 5.0,
    reviews: 189,
    exp: '6 năm',
    available: false,
    specialties: ['Yoga', 'Thiền', 'Aromatherapy'],
    nextSlot: 'Sáng mai',
  },
  {
    name: 'Lê Văn An',
    role: 'Body Care Specialist',
    avatar: 'https://i.pravatar.cc/200?img=14',
    branch: 'Nha Trang',
    rating: 4.7,
    reviews: 145,
    exp: '5 năm',
    available: true,
    specialties: ['Body Scrub', 'Wrap', 'Tắm thảo dược'],
    nextSlot: '11:00 hôm nay',
  },
];

export function Spa2SpaFinderPageView() {
  const [city, setCity] = useState('all');
  const [specialty, setSpecialty] = useState('all');
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [selected, setSelected] = useState<(typeof KTV_LIST)[0] | null>(null);

  const CITIES = ['all', 'TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Nha Trang'];
  const SPECIALTIES = ['all', 'Facial', 'Massage', 'Body', 'Yoga', 'Detox'];

  const filtered = KTV_LIST.filter((k) => {
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
        img={SPA2_PAGE_IMAGES.branches}
        eyebrow="TÌM KTV"
        title="Tìm chuyên viên & chi nhánh phù hợp"
        subtitle="Tìm kỹ thuật viên theo chuyên môn và địa điểm — đặt lịch thẳng với người bạn tin tưởng."
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
                      key={k.name}
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

const MENU_SECTIONS = [
  {
    category: 'Signature Treatments',
    icon: 'solar:stars-bold-duotone',
    color: '#EF9F27',
    items: [
      {
        name: 'Nature Spa Signature Massage',
        desc: 'Kết hợp kỹ thuật Thụy Điển, Thái Lan và Bali với tinh dầu sả gừng đặc chế.',
        duration: '90 phút',
        price: 1290000,
        badge: 'Bestseller',
      },
      {
        name: 'Green Forest Facial',
        desc: 'Facial thương hiệu với chiết xuất lá sen, trà xanh Đà Lạt và collagen cá hồi.',
        duration: '90 phút',
        price: 1490000,
        badge: 'Award Winner',
      },
      {
        name: 'Full Body Ritual',
        desc: 'Tẩy da chết, ủ thảo dược, massage toàn thân và đắp mặt nạ — trọn gói 3 giờ.',
        duration: '180 phút',
        price: 2990000,
        badge: '',
      },
    ],
  },
  {
    category: 'Facial Treatments',
    icon: 'solar:face-scan-circle-bold-duotone',
    color: SPA2_TEAL,
    items: [
      {
        name: 'Hydrating Facial',
        desc: 'Cấp ẩm chuyên sâu với Hyaluronic Acid và mặt nạ ngọc trai thiên nhiên.',
        duration: '60 phút',
        price: 790000,
        badge: '',
      },
      {
        name: 'Anti-Aging Facial',
        desc: 'Chống lão hóa với retinol, peptide và công nghệ siêu âm vi điểm.',
        duration: '75 phút',
        price: 1190000,
        badge: '',
      },
      {
        name: 'Acne Control Facial',
        desc: 'Làm sạch sâu, diệt khuẩn và phục hồi da mụn bằng ánh sáng sinh học.',
        duration: '75 phút',
        price: 990000,
        badge: 'New',
      },
    ],
  },
  {
    category: 'Body Treatments',
    icon: 'solar:body-bold-duotone',
    color: '#7F77DD',
    items: [
      {
        name: 'Herbal Body Scrub',
        desc: 'Tẩy da chết với muối biển, mật ong và tinh dầu sả — da mềm mại tức thì.',
        duration: '60 phút',
        price: 690000,
        badge: '',
      },
      {
        name: 'Detox Body Wrap',
        desc: 'Ủ thảo dược tươi, giải độc và kiểm soát cân nặng hiệu quả.',
        duration: '75 phút',
        price: 890000,
        badge: '',
      },
      {
        name: 'Slimming & Firming',
        desc: 'Massage định hình cùng tinh chất cà phê và bùn núi lửa khoáng chất.',
        duration: '90 phút',
        price: 1090000,
        badge: '',
      },
    ],
  },
  {
    category: 'Massage Therapies',
    icon: 'solar:hand-stars-bold-duotone',
    color: '#E57373',
    items: [
      {
        name: 'Swedish Massage',
        desc: 'Massage nhẹ nhàng thư giãn, tăng tuần hoàn máu và giảm căng cơ.',
        duration: '60 phút',
        price: 590000,
        badge: '',
      },
      {
        name: 'Deep Tissue Massage',
        desc: 'Tác động sâu vào cơ và mô liên kết, giảm đau mãn tính hiệu quả.',
        duration: '60 phút',
        price: 690000,
        badge: '',
      },
      {
        name: 'Hot Stone Massage',
        desc: 'Đá bazan núi lửa nung nóng giải phóng cơ bắp căng cứng, tăng lưu thông.',
        duration: '75 phút',
        price: 890000,
        badge: '',
      },
      {
        name: 'Thai Herbal Compress',
        desc: 'Túi thảo dược nóng kết hợp xoa bóp truyền thống Thái Lan.',
        duration: '90 phút',
        price: 990000,
        badge: 'Hot',
      },
    ],
  },
  {
    category: 'Nail & Beauty',
    icon: 'solar:hand-heart-bold-duotone',
    color: '#F48FB1',
    items: [
      {
        name: 'Manicure Cơ Bản',
        desc: 'Dũa, sơn móng và dưỡng da tay với sản phẩm Essie Salon Series.',
        duration: '45 phút',
        price: 290000,
        badge: '',
      },
      {
        name: 'Luxury Spa Pedicure',
        desc: 'Thư giãn chân với bồn ngâm muối hồng, tẩy da chết và massage bàn chân.',
        duration: '60 phút',
        price: 390000,
        badge: '',
      },
      {
        name: 'Gel Nail Premium',
        desc: 'Sơn gel cao cấp, màu sắc phong phú, bền đến 3 tuần.',
        duration: '60 phút',
        price: 450000,
        badge: '',
      },
    ],
  },
];

export function Spa2SpaMenuPageView() {
  const [activeSection, setActiveSection] = useState(0);
  const [search, setSearch] = useState('');

  const allItems = MENU_SECTIONS.flatMap((s) =>
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
        img={SPA2_PAGE_IMAGES.services}
        eyebrow="MENU DỊCH VỤ"
        title="Toàn bộ menu dịch vụ"
        subtitle="Khám phá đầy đủ các liệu trình tại Nature Spa — từ cơ bản đến chuyên sâu, từ thư giãn đến trị liệu."
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
            sx={{ mb: 4, maxWidth: 480 }}
          />

          {search ? (
            /* Search results */
            <Stack spacing={2}>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
                Tìm thấy {searchResults.length} kết quả cho &ldquo;<strong>{search}</strong>&rdquo;
              </Typography>
              {searchResults.map((item) => (
                <Card
                  key={item.name}
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
                    {MENU_SECTIONS.map((s, i) => (
                      <Button
                        key={s.category}
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
                {MENU_SECTIONS.map(
                  (section, secIdx) =>
                    secIdx === activeSection && (
                      <Box key={section.category}>
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
                              key={item.name}
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
