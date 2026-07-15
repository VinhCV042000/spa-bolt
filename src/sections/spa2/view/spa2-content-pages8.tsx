import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Branches,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
  SPA2_PAGE_IMAGES,
} from '../spa2-pages-data';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// ─── SHARED ──────────────────────────────────────────────
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
  dark,
}: {
  img: string;
  eyebrow: string;
  title: string;
  subtitle: string;
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
              <Typography sx={{ opacity: 0.85 }}>{sub}</Typography>
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
// 1. FRANCHISE (NHƯỢNG QUYỀN)
// ══════════════════════════════════════════════════════════

const FRANCHISE_MODELS = [
  {
    name: 'Compact',
    area: '80–120m²',
    investment: '1.2 – 1.8 tỷ',
    color: '#9E9E9E',
    roomCount: '3–4 phòng',
    perks: [
      'Đào tạo 4 tuần',
      'Hỗ trợ setup ban đầu',
      'Marketing khai trương',
      'Hệ thống quản lý cơ bản',
    ],
  },
  {
    name: 'Standard',
    area: '150–200m²',
    investment: '2.5 – 3.5 tỷ',
    color: SPA2_TEAL,
    hot: true,
    roomCount: '6–8 phòng',
    perks: [
      'Đào tạo 6 tuần',
      'Hỗ trợ setup toàn diện',
      'Marketing 3 tháng đầu',
      'Hệ thống quản lý đầy đủ',
      'Chuyên gia vận hành hỗ trợ 6 tháng',
    ],
  },
  {
    name: 'Premium',
    area: '250m²+',
    investment: '5 – 8 tỷ',
    color: '#7F77DD',
    roomCount: '10+ phòng + VIP',
    perks: [
      'Đào tạo 8 tuần',
      'Thiết kế nội thất trọn gói',
      'Marketing 6 tháng đầu',
      'Hệ thống quản lý AI',
      'Account manager riêng trọn đời',
      'Ưu tiên nguồn hàng độc quyền',
    ],
  },
];

const FRANCHISE_STEPS = [
  {
    title: 'Tìm hiểu & liên hệ',
    desc: 'Gửi đơn quan tâm, nhận bộ tài liệu nhượng quyền chi tiết (FDD).',
  },
  {
    title: 'Khảo sát & phê duyệt',
    desc: 'Đội ngũ khảo sát địa điểm, đánh giá tiềm năng thị trường khu vực.',
  },
  {
    title: 'Ký hợp đồng',
    desc: 'Ký hợp đồng nhượng quyền, thanh toán phí ban đầu theo mô hình đã chọn.',
  },
  {
    title: 'Đào tạo & setup',
    desc: 'Đào tạo đội ngũ, setup không gian theo chuẩn thương hiệu Nature Spa.',
  },
  { title: 'Khai trương', desc: 'Hỗ trợ marketing khai trương, vận hành thử nghiệm 2 tuần đầu.' },
];

const FRANCHISE_BENEFITS = [
  {
    icon: 'solar:medal-star-bold-duotone',
    title: 'Thương hiệu đã được kiểm chứng',
    desc: '10 năm hoạt động, 25.000+ khách hàng, 4 chi nhánh thành công trên toàn quốc.',
  },
  {
    icon: 'solar:book-bold-duotone',
    title: 'Chuyển giao công thức độc quyền',
    desc: 'Full quy trình vận hành, công thức sản phẩm và menu dịch vụ đã được tối ưu.',
  },
  {
    icon: 'solar:chart-2-bold-duotone',
    title: 'Hỗ trợ vận hành liên tục',
    desc: 'Đội ngũ chuyên gia hỗ trợ trực tiếp trong 6–12 tháng đầu vận hành.',
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    title: 'Cộng đồng đối tác nhượng quyền',
    desc: 'Kết nối, chia sẻ kinh nghiệm với các đối tác franchise khác trên toàn quốc.',
  },
];

export function Spa2FranchisePageView() {
  const [selectedModel, setSelectedModel] = useState<(typeof FRANCHISE_MODELS)[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.partners}
        eyebrow="NHƯỢNG QUYỀN"
        title="Trở thành đối tác nhượng quyền Nature Spa"
        subtitle="Khởi nghiệp cùng thương hiệu spa hữu cơ đã được kiểm chứng — hệ thống vận hành trọn gói, ROI trung bình 18–24 tháng."
      />

      {/* Stats */}
      <Box sx={{ py: 4, bgcolor: SPA2_TEAL }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {[
              { n: '4', l: 'Chi nhánh thành công' },
              { n: '18–24', l: 'Tháng hoàn vốn TB' },
              { n: '10', l: 'Năm kinh nghiệm' },
              { n: '92%', l: 'Đối tác tái ký hợp đồng' },
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

      {/* Benefits */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Lợi thế" title="Vì sao chọn nhượng quyền Nature Spa?" />
          <Grid container spacing={3}>
            {FRANCHISE_BENEFITS.map((b) => (
              <Grid key={b.title} xs={12} sm={6} md={3}>
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

      {/* Investment models */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Mô hình" title="Chọn quy mô đầu tư phù hợp" />
          <Grid container spacing={3} alignItems="stretch">
            {FRANCHISE_MODELS.map((m) => (
              <Grid key={m.name} xs={12} md={4}>
                <Card
                  sx={{
                    p: 0,
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    border: m.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: m.hot ? '0 16px 40px rgba(46,139,122,0.18)' : 'none',
                    transform: m.hot ? { md: 'scale(1.03)' } : undefined,
                  }}
                >
                  {m.hot && (
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
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: m.color }} />
                      <Typography variant="h5" sx={{ color: SPA2_INK }}>
                        {m.name}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        label={m.area}
                        size="small"
                        sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary' }}
                      />
                      <Chip
                        label={m.roomCount}
                        size="small"
                        sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary' }}
                      />
                    </Stack>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 0.25 }}>
                      Vốn đầu tư dự kiến
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: m.color, fontSize: 22, mb: 2 }}>
                      {m.investment} đ
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Stack spacing={1.25} sx={{ mb: 3 }}>
                      {m.perks.map((p) => (
                        <CheckItem key={p}>{p}</CheckItem>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      onClick={() => setSelectedModel(m)}
                      sx={{
                        borderRadius: 99,
                        py: 1.3,
                        bgcolor: m.hot ? SPA2_TEAL : 'transparent',
                        color: m.hot ? 'white' : SPA2_TEAL_DARK,
                        border: m.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                        '&:hover': { bgcolor: SPA2_TEAL_DARK, color: 'white' },
                      }}
                    >
                      Tìm hiểu gói {m.name}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Process */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Quy trình" title="5 bước trở thành đối tác" />
          <Stack spacing={0}>
            {FRANCHISE_STEPS.map((s, i) => (
              <Stack key={s.title} direction="row" spacing={2.5}>
                <Stack alignItems="center" sx={{ width: 48, flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </Box>
                  {i < FRANCHISE_STEPS.length - 1 && (
                    <Box sx={{ width: 2, flex: 1, bgcolor: SPA2_CREAM_DARK, my: 0.5 }} />
                  )}
                </Stack>
                <Box sx={{ pb: 4 }}>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
                    {s.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
                    {s.desc}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Application form */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="sm">
          <SoftCard sx={{ bgcolor: 'common.white' }}>
            {!submitted ? (
              <Stack spacing={2.5}>
                <SectionTitle
                  eyebrow="Đăng ký"
                  title="Nhận bộ tài liệu nhượng quyền"
                  align="left"
                />
                <TextField fullWidth size="small" label="Họ và tên" />
                <TextField fullWidth size="small" label="Số điện thoại" />
                <TextField fullWidth size="small" label="Email" />
                <TextField fullWidth size="small" label="Thành phố dự kiến mở spa" />
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Mô hình quan tâm"
                  defaultValue={selectedModel?.name || ''}
                >
                  {FRANCHISE_MODELS.map((m) => (
                    <MenuItem key={m.name} value={m.name}>
                      {m.name} — {m.investment} đ
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={2}
                  label="Kinh nghiệm kinh doanh (nếu có)"
                />
                <Button
                  fullWidth
                  size="large"
                  onClick={() => setSubmitted(true)}
                  sx={{
                    borderRadius: 99,
                    py: 1.5,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  Gửi đơn quan tâm
                </Button>
              </Stack>
            ) : (
              <Stack alignItems="center" spacing={2.5} sx={{ py: 4 }}>
                <Iconify icon="solar:check-circle-bold" width={56} sx={{ color: SPA2_TEAL }} />
                <Typography variant="h5" sx={{ color: SPA2_INK }}>
                  Đã gửi thành công!
                </Typography>
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 380 }}>
                  Đội ngũ phát triển nhượng quyền sẽ liên hệ và gửi bộ tài liệu FDD trong vòng 48
                  giờ làm việc.
                </Typography>
                <Button
                  onClick={() => setSubmitted(false)}
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
        title="Cơ hội kinh doanh trong ngành wellness 5 tỷ đô"
        sub="Thị trường spa Việt Nam tăng trưởng 15%/năm — bắt đầu ngay hôm nay."
        btnLabel="Tư vấn nhượng quyền"
        href={paths.spa2.contact}
      />

      <Dialog
        open={!!selectedModel}
        onClose={() => setSelectedModel(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selectedModel && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setSelectedModel(null)}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
              Gói {selectedModel.name}
            </Typography>
            <Typography sx={{ color: SPA2_TEAL, fontWeight: 700, fontSize: 20, mb: 2 }}>
              {selectedModel.investment} đ
            </Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
              <CheckItem>Diện tích: {selectedModel.area}</CheckItem>
              <CheckItem>Số phòng: {selectedModel.roomCount}</CheckItem>
              {selectedModel.perks.map((p) => (
                <CheckItem key={p}>{p}</CheckItem>
              ))}
            </Stack>
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
              Liên hệ tư vấn chi tiết
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 2. GROUP BOOKING (ĐẶT LỊCH NHÓM)
// ══════════════════════════════════════════════════════════

const GROUP_TIERS = [
  { min: 4, max: 7, discount: 10, label: 'Nhóm nhỏ' },
  { min: 8, max: 15, discount: 15, label: 'Nhóm vừa' },
  { min: 16, max: 30, discount: 20, label: 'Nhóm lớn' },
  { min: 31, max: 999, discount: 25, label: 'Sự kiện doanh nghiệp' },
];

const GROUP_OCCASIONS = [
  {
    name: 'Team Building',
    icon: 'solar:users-group-rounded-bold-duotone',
    desc: 'Gắn kết đội nhóm qua trải nghiệm thư giãn chung.',
  },
  {
    name: 'Tiệc công ty',
    icon: 'solar:buildings-2-bold-duotone',
    desc: 'Year-end party, kick-off — kết hợp spa và tiệc nhẹ.',
  },
  {
    name: 'Hội bạn thân',
    icon: 'solar:heart-bold-duotone',
    desc: 'Girls day out, reunion — trọn gói cho nhóm bạn.',
  },
  {
    name: 'Gia đình đoàn tụ',
    icon: 'solar:home-2-bold-duotone',
    desc: 'Trải nghiệm chung cho nhiều thế hệ trong gia đình.',
  },
];

export function Spa2GroupBookingPageView() {
  const [groupSize, setGroupSize] = useState(8);
  const [service, setService] = useState('massage');
  const [step, setStep] = useState<'plan' | 'form' | 'done'>('plan');

  const currentTier =
    GROUP_TIERS.find((t) => groupSize >= t.min && groupSize <= t.max) || GROUP_TIERS[0];
  const basePrice = 690000;
  const totalBefore = basePrice * groupSize;
  const totalAfter = totalBefore * (1 - currentTier.discount / 100);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.booking}
        eyebrow="ĐẶT LỊCH NHÓM"
        title="Trải nghiệm spa cùng nhau, tiết kiệm cùng nhau"
        subtitle="Đặt từ 4 người trở lên — nhận ưu đãi lên đến 25% và không gian riêng cho cả nhóm."
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {step === 'plan' && (
            <Grid container spacing={4}>
              <Grid xs={12} md={7}>
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3 }}>
                    Tính ưu đãi nhóm của bạn
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: SPA2_INK }}>
                        Số người trong nhóm
                      </Typography>
                      <Chip
                        label={`${groupSize} người`}
                        sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700 }}
                      />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      {[4, 6, 8, 12, 16, 20, 30, 50].map((n) => (
                        <Chip
                          key={n}
                          label={n}
                          onClick={() => setGroupSize(n)}
                          sx={{
                            cursor: 'pointer',
                            bgcolor: groupSize === n ? SPA2_TEAL : 'transparent',
                            color: groupSize === n ? 'white' : 'text.secondary',
                            border: `1.5px solid ${groupSize === n ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="Dịch vụ chính"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    sx={{ mb: 3 }}
                  >
                    <MenuItem value="massage">Massage Thảo Dược — 690.000đ/người</MenuItem>
                    <MenuItem value="facial">Facial Organic — 890.000đ/người</MenuItem>
                    <MenuItem value="combo">Combo Massage + Facial — 1.390.000đ/người</MenuItem>
                  </TextField>

                  <Box sx={{ p: 2.5, bgcolor: SPA2_CREAM, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        Hạng ưu đãi
                      </Typography>
                      <Chip
                        label={`${currentTier.label} — Giảm ${currentTier.discount}%`}
                        size="small"
                        sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
                      />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        Giá gốc
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 13,
                          textDecoration: 'line-through',
                          color: 'text.disabled',
                        }}
                      >
                        {formatVND(totalBefore)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 700, color: SPA2_INK }}>Tổng ưu đãi</Typography>
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 18 }}>
                        {formatVND(totalAfter)}
                      </Typography>
                    </Stack>
                  </Box>

                  <Button
                    fullWidth
                    size="large"
                    onClick={() => setStep('form')}
                    sx={{
                      mt: 3,
                      borderRadius: 99,
                      py: 1.4,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    Tiếp tục đặt lịch
                  </Button>
                </SoftCard>
              </Grid>

              <Grid xs={12} md={5}>
                <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 2 }}>
                  Bảng ưu đãi theo quy mô
                </Typography>
                <Stack spacing={1.5}>
                  {GROUP_TIERS.map((t) => (
                    <Card
                      key={t.label}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: `1.5px solid ${currentTier.label === t.label ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                        bgcolor: currentTier.label === t.label ? `${SPA2_TEAL}08` : 'common.white',
                        boxShadow: 'none',
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                            {t.label}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            {t.min}–{t.max === 999 ? '30+' : t.max} người
                          </Typography>
                        </Box>
                        <Chip
                          label={`-${t.discount}%`}
                          sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700 }}
                        />
                      </Stack>
                    </Card>
                  ))}
                </Stack>

                <Typography sx={{ fontWeight: 600, color: SPA2_INK, mt: 4, mb: 2 }}>
                  Phù hợp cho dịp nào?
                </Typography>
                <Stack spacing={1.5}>
                  {GROUP_OCCASIONS.map((o) => (
                    <Stack key={o.name} direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2,
                          bgcolor: SPA2_CREAM,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Iconify icon={o.icon} width={18} sx={{ color: SPA2_TEAL }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                          {o.name}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                          {o.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          )}

          {step === 'form' && (
            <Grid container justifyContent="center">
              <Grid xs={12} md={7}>
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3 }}>
                    Thông tin đặt lịch nhóm
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 2 }}>
                    <TextField fullWidth size="small" label="Người đại diện liên hệ" />
                    <TextField fullWidth size="small" label="Số điện thoại" />
                    <TextField fullWidth size="small" select label="Chi nhánh">
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
                      label="Ngày mong muốn"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Yêu cầu đặc biệt (phòng riêng, tiệc nhẹ...)"
                    />
                  </Stack>
                  <Box sx={{ p: 2, bgcolor: SPA2_CREAM, borderRadius: 2.5, mb: 3 }}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {groupSize} người × ưu đãi {currentTier.discount}%
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL }}>
                        {formatVND(totalAfter)}
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={1.5}>
                    <Button
                      onClick={() => setStep('plan')}
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
                      Xác nhận đặt lịch nhóm
                    </Button>
                  </Stack>
                </SoftCard>
              </Grid>
            </Grid>
          )}

          {step === 'done' && (
            <Stack alignItems="center" spacing={3} sx={{ py: 8 }}>
              <Iconify icon="solar:check-circle-bold" width={72} sx={{ color: SPA2_TEAL }} />
              <Typography variant="h4" sx={{ color: SPA2_INK }}>
                Đặt lịch nhóm thành công!
              </Typography>
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 480 }}>
                Nhóm <strong>{groupSize} người</strong> với ưu đãi{' '}
                <strong style={{ color: SPA2_TEAL }}>{currentTier.discount}%</strong> đã được đặt.
                Đội ngũ sẽ liên hệ xác nhận chi tiết trong 30 phút.
              </Typography>
              <Button
                onClick={() => setStep('plan')}
                sx={{
                  borderRadius: 99,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  px: 4,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Đặt nhóm khác
              </Button>
            </Stack>
          )}
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 3. CERTIFICATE WALL (CHỨNG NHẬN KHÁCH HÀNG)
// ══════════════════════════════════════════════════════════

const COMPLETION_PROGRAMS = [
  {
    name: 'Detox Master 7 Ngày',
    graduates: 234,
    icon: 'solar:leaf-bold-duotone',
    color: '#4CAF50',
  },
  {
    name: 'Anti-Aging Journey 10 Buổi',
    graduates: 156,
    icon: 'solar:star-shine-bold-duotone',
    color: SPA2_TEAL,
  },
  {
    name: 'Acne-Free Program',
    graduates: 189,
    icon: 'solar:shield-check-bold-duotone',
    color: '#0D47A1',
  },
  {
    name: '30-Day Nutrition Reset',
    graduates: 98,
    icon: 'solar:chart-2-bold-duotone',
    color: '#7F77DD',
  },
];

const GRADUATES = [
  {
    name: 'Nguyễn Thị Lan',
    program: 'Detox Master 7 Ngày',
    date: '01/07/2026',
    avatar: 'https://i.pravatar.cc/100?img=25',
    result: 'Giảm 3.2kg, da sáng mịn rõ rệt',
  },
  {
    name: 'Trần Văn Hùng',
    program: 'Anti-Aging Journey',
    date: '28/06/2026',
    avatar: 'https://i.pravatar.cc/100?img=51',
    result: 'Nếp nhăn giảm 65%, da căng bóng',
  },
  {
    name: 'Lê Thị Mai',
    program: 'Acne-Free Program',
    date: '25/06/2026',
    avatar: 'https://i.pravatar.cc/100?img=44',
    result: 'Sạch mụn 95%, không còn thâm',
  },
  {
    name: 'Phạm Đức Anh',
    program: '30-Day Nutrition Reset',
    date: '20/06/2026',
    avatar: 'https://i.pravatar.cc/100?img=13',
    result: 'Năng lượng tăng, ngủ ngon hơn',
  },
];

export function Spa2CertificateWallPageView() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [nameCheck, setNameCheck] = useState('');
  const [checkResult, setCheckResult] = useState<null | 'found' | 'not-found'>(null);

  const filteredGraduates = selectedProgram
    ? GRADUATES.filter((g) => g.program === selectedProgram)
    : GRADUATES;

  const checkCertificate = () => {
    const found = GRADUATES.some((g) => g.name.toLowerCase().includes(nameCheck.toLowerCase()));
    setCheckResult(nameCheck.trim() ? (found ? 'found' : 'not-found') : null);
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.faq}
        eyebrow="TƯỜNG CHỨNG NHẬN"
        title="Vinh danh hành trình của bạn"
        subtitle="Mỗi chương trình hoàn thành là một cột mốc đáng tự hào — tra cứu và tải chứng nhận của bạn."
      />

      {/* Program stats */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Chương trình" title="Các chương trình đã cấp chứng nhận" />
          <Grid container spacing={3}>
            {COMPLETION_PROGRAMS.map((p) => (
              <Grid key={p.name} xs={12} sm={6} md={3}>
                <Card
                  onClick={() => setSelectedProgram(selectedProgram === p.name ? null : p.name)}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: `2px solid ${selectedProgram === p.name ? p.color : SPA2_CREAM_DARK}`,
                    boxShadow: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all .2s',
                    '&:hover': { borderColor: p.color },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      bgcolor: `${p.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1.5,
                    }}
                  >
                    <Iconify icon={p.icon} width={28} sx={{ color: p.color }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, mb: 0.5 }}>
                    {p.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: p.color, fontSize: 22 }}>
                    {p.graduates}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                    học viên tốt nghiệp
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Certificate lookup */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="sm">
          <SoftCard sx={{ bgcolor: 'common.white', textAlign: 'center' }}>
            <Iconify
              icon="solar:diploma-verified-bold-duotone"
              width={40}
              sx={{ color: SPA2_TEAL, mb: 1.5 }}
            />
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
              Tra cứu chứng nhận của bạn
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập tên đầy đủ"
                value={nameCheck}
                onChange={(e) => setNameCheck(e.target.value)}
              />
              <Button
                onClick={checkCertificate}
                sx={{
                  borderRadius: 2.5,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  px: 3,
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Tra cứu
              </Button>
            </Stack>
            {checkResult === 'found' && (
              <Alert severity="success" sx={{ borderRadius: 2.5, textAlign: 'left' }}>
                🎉 Tìm thấy chứng nhận! Bạn có thể tải về từ email đã đăng ký hoặc liên hệ lễ tân để
                nhận bản in.
              </Alert>
            )}
            {checkResult === 'not-found' && (
              <Alert severity="info" sx={{ borderRadius: 2.5, textAlign: 'left' }}>
                Không tìm thấy chứng nhận với tên này. Vui lòng kiểm tra chính tả hoặc liên hệ
                hotline để được hỗ trợ.
              </Alert>
            )}
          </SoftCard>
        </Container>
      </Box>

      {/* Wall of graduates */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow={selectedProgram || 'Tất cả'} title="Tường vinh danh học viên" />
          <Grid container spacing={3}>
            {filteredGraduates.map((g) => (
              <Grid key={g.name} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                    <Iconify
                      icon="solar:medal-ribbons-star-bold"
                      width={22}
                      sx={{ color: '#EF9F27' }}
                    />
                  </Box>
                  <Avatar
                    src={g.avatar}
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 1.5,
                      border: `3px solid ${SPA2_TEAL_LIGHT}`,
                    }}
                  />
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                    {g.name}
                  </Typography>
                  <Chip
                    label={g.program}
                    size="small"
                    sx={{
                      mt: 0.75,
                      mb: 1,
                      bgcolor: SPA2_CREAM,
                      color: SPA2_TEAL_DARK,
                      fontSize: 10,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.6, mb: 0.5 }}
                  >
                    &ldquo;{g.result}&rdquo;
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                    Hoàn thành {g.date}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <GradientCta
        title="Bắt đầu hành trình của riêng bạn"
        sub="Hoàn thành chương trình — nhận chứng nhận và tự hào chia sẻ."
        btnLabel="Xem chương trình"
        href={paths.spa2.treatments}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 4. VIDEO GUIDE / TUTORIAL LIBRARY
// ══════════════════════════════════════════════════════════

const VIDEO_LIBRARY = [
  {
    title: 'Cách chọn liệu trình phù hợp với loại da',
    duration: '4:32',
    category: 'Hướng dẫn',
    views: '12.4K',
    thumb: SPA2_PAGE_IMAGES.faq,
    icon: 'solar:face-scan-circle-bold',
  },
  {
    title: '5 bước skincare cơ bản mỗi ngày',
    duration: '6:15',
    category: 'Skincare',
    views: '28.1K',
    thumb: SPA2_PAGE_IMAGES.services,
    icon: 'solar:magic-stick-3-bold',
  },
  {
    title: 'Kỹ thuật massage giảm đau đầu tại nhà',
    duration: '8:47',
    category: 'Tự chăm sóc',
    views: '19.8K',
    thumb: SPA2_PAGE_IMAGES.training,
    icon: 'solar:hand-stars-bold',
  },
  {
    title: 'Cách đọc bảng thành phần mỹ phẩm',
    duration: '5:20',
    category: 'Kiến thức',
    views: '15.6K',
    thumb: SPA2_PAGE_IMAGES.blog,
    icon: 'solar:document-text-bold',
  },
  {
    title: 'Chuẩn bị gì trước buổi facial đầu tiên',
    duration: '3:48',
    category: 'Hướng dẫn',
    views: '9.2K',
    thumb: SPA2_PAGE_IMAGES.about,
    icon: 'solar:calendar-bold',
  },
  {
    title: 'Bài tập thở thư giãn 5 phút',
    duration: '5:00',
    category: 'Tự chăm sóc',
    views: '31.7K',
    thumb: SPA2_PAGE_IMAGES.branches,
    icon: 'solar:wind-bold',
  },
];

export function Spa2VideoGuidePageView() {
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState<(typeof VIDEO_LIBRARY)[0] | null>(null);

  const CATS = ['all', 'Hướng dẫn', 'Skincare', 'Tự chăm sóc', 'Kiến thức'];
  const filtered = cat === 'all' ? VIDEO_LIBRARY : VIDEO_LIBRARY.filter((v) => v.category === cat);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.blog}
        eyebrow="THƯ VIỆN VIDEO"
        title="Học cùng Nature Spa"
        subtitle="Video hướng dẫn ngắn gọn từ chuyên gia — chăm sóc bản thân đúng cách mỗi ngày."
        dark
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {CATS.map((c) => (
              <Chip
                key={c}
                label={c === 'all' ? 'Tất cả' : c}
                onClick={() => setCat(c)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: cat === c ? SPA2_TEAL : 'transparent',
                  color: cat === c ? 'white' : 'text.secondary',
                  border: `1.5px solid ${cat === c ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((v) => (
              <Grid key={v.title} xs={12} sm={6} md={4}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => setSelected(v)}>
                  <SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          height: 190,
                          backgroundImage: `url(${v.thumb})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          bgcolor: 'rgba(31,42,40,0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.92)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon="solar:play-bold" width={26} sx={{ color: SPA2_TEAL }} />
                        </Box>
                      </Box>
                      <Chip
                        label={v.duration}
                        size="small"
                        sx={{
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                          bgcolor: 'rgba(0,0,0,0.75)',
                          color: 'white',
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <Chip
                        label={v.category}
                        size="small"
                        icon={<Iconify icon={v.icon} width={13} />}
                        sx={{
                          mb: 1,
                          bgcolor: SPA2_CREAM,
                          color: SPA2_TEAL_DARK,
                          '& .MuiChip-icon': { color: SPA2_TEAL },
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: SPA2_INK,
                          fontSize: 14,
                          lineHeight: 1.4,
                          mb: 1,
                        }}
                      >
                        {v.title}
                      </Typography>
                      <Stack direction="row" spacing={0.75} alignItems="center">
                        <Iconify icon="solar:eye-bold" width={13} sx={{ color: 'text.disabled' }} />
                        <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                          {v.views} lượt xem
                        </Typography>
                      </Stack>
                    </Box>
                  </SoftCard>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Video player dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
      >
        {selected && (
          <>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '16/9',
                bgcolor: SPA2_INK,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                onClick={() => setSelected(null)}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.15)',
                }}
              >
                <Iconify icon="solar:close-circle-bold" />
              </IconButton>
              <Box sx={{ textAlign: 'center', color: 'white' }}>
                <Iconify icon="solar:play-circle-bold" width={56} sx={{ mb: 1 }} />
                <Typography sx={{ fontSize: 13, opacity: 0.7 }}>Video demo player</Typography>
              </Box>
            </Box>
            <DialogContent sx={{ p: 2.5 }}>
              <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
                {selected.title}
              </Typography>
              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                {selected.category} · {selected.duration} · {selected.views} lượt xem
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>

      <GradientCta
        title="Đăng ký nhận video mới hàng tuần"
        sub="Kiến thức chăm sóc sức khỏe và làm đẹp gửi thẳng đến email."
        btnLabel="Đăng ký ngay"
        href={paths.spa2.newsletter || '#'}
      />
    </Box>
  );
}
