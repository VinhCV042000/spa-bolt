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

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Services,
  spa2Feedbacks,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
  SPA2_PAGE_IMAGES,
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

const OCCASION_PACKAGES = [
  {
    id: 'bridal',
    icon: 'solar:crown-bold-duotone',
    label: 'Gói Cô Dâu',
    title: 'Bridal Glow Package',
    color: '#F48FB1',
    accent: '#FFF0F5',
    price: 8900000,
    duration: '2 ngày',
    tag: 'Phổ biến nhất',
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80',
    desc: 'Trọn gói chăm sóc nhan sắc cho ngày trọng đại — từ 2 tuần trước đám cưới.',
    includes: [
      'Facial chuyên sâu 2 buổi',
      'Body Scrub & Wrap toàn thân',
      'Massage thư giãn 90 phút',
      'Chăm sóc tay chân',
      'Bồn tắm hoa hồng',
      'Tư vấn skincare cá nhân',
      'Quà tặng cô dâu',
    ],
  },
  {
    id: 'birthday',
    icon: 'solar:gift-bold-duotone',
    label: 'Sinh Nhật',
    title: 'Birthday Luxe Spa',
    color: '#EF9F27',
    accent: '#FFF8EE',
    price: 2490000,
    duration: '4 giờ',
    tag: 'Best gift',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    desc: 'Sinh nhật đáng nhớ nhất — tự thưởng cho bản thân hoặc tặng người thân.',
    includes: [
      'Massage thảo dược 60 phút',
      'Facial Organic 60 phút',
      'Xông hơi đá muối',
      'Bánh sinh nhật mini',
      'Thiệp & hoa tươi',
      'Trà & snack cao cấp',
    ],
  },
  {
    id: 'bachelorette',
    icon: 'solar:users-group-rounded-bold-duotone',
    label: 'Tiệc Độc Thân',
    title: 'Bachelorette Spa Party',
    color: '#7F77DD',
    accent: '#F3F2FF',
    price: 1890000,
    duration: '3 giờ / người',
    tag: 'Nhóm 4–10 người',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    desc: 'Tiệc chia tay độc thân kiểu mới — thư giãn, đẹp và đáng nhớ cùng hội bạn.',
    includes: [
      'Facial nhóm đồng giờ',
      'Massage tay chân',
      'Prosecco không cồn & snack',
      'Chụp ảnh kỷ niệm',
      'Phòng VIP riêng cho nhóm',
      'DIY mặt nạ thảo mộc',
    ],
  },
  {
    id: 'anniversary',
    icon: 'solar:heart-bold-duotone',
    label: 'Kỷ Niệm',
    title: 'Anniversary Couple Retreat',
    color: SPA2_TEAL,
    accent: SPA2_CREAM,
    price: 3990000,
    duration: '5 giờ (2 người)',
    tag: 'Dành cho cặp đôi',
    image: 'https://plus.unsplash.com/premium_photo-1661574718355-82659c0c74cc?w=800&q=80',
    desc: 'Kỷ niệm tình yêu bằng trải nghiệm spa dành riêng cho hai người.',
    includes: [
      'Massage cặp đôi 90 phút',
      'Bồn tắm hoa hồng chung',
      'Facial đồng giờ',
      'Champagne & chocolate',
      'Trang trí phòng VIP',
      'Chụp ảnh kỷ niệm',
    ],
  },
  {
    id: 'corporate-gift',
    icon: 'solar:buildings-2-bold-duotone',
    label: 'Quà Doanh Nghiệp',
    title: 'Corporate Gift Package',
    color: '#455A64',
    accent: '#F5F5F5',
    price: 5000000,
    duration: 'Voucher linh hoạt',
    tag: 'Số lượng lớn',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80',
    desc: 'Quà tặng sếp, đối tác, nhân viên xuất sắc — sang trọng và ý nghĩa.',
    includes: [
      'Voucher linh hoạt theo mệnh giá',
      'Hộp quà cao cấp có logo',
      'Thiệp chúc mừng cá nhân hóa',
      'Giao tận nơi miễn phí (HCM, HN)',
      'Chiết khấu 10–25% khi mua 10+ voucher',
    ],
  },
  {
    id: 'postpartum',
    icon: 'solar:baby-bold-duotone',
    label: 'Sau Sinh',
    title: 'Postpartum Recovery Spa',
    color: '#81C784',
    accent: '#F1F8E9',
    price: 3290000,
    duration: '3 buổi',
    tag: 'An toàn sau sinh',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80',
    desc: 'Phục hồi sức khỏe toàn diện cho mẹ sau sinh — nhẹ nhàng và an toàn.',
    includes: [
      'Massage phục hồi đặc biệt',
      'Chăm sóc vùng bụng',
      'Aromatherapy thư giãn',
      'Tư vấn dinh dưỡng sau sinh',
      'Sản phẩm lành tính cho mẹ cho con bú',
    ],
  },
];

export function Spa2SpecialOccasionsPageView() {
  const [active, setActive] = useState<(typeof OCCASION_PACKAGES)[0] | null>(null);
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.promotions}
        eyebrow="DỊP ĐẶC BIỆT"
        title="Gói spa cho mọi dịp đặc biệt"
        subtitle="Từ ngày cưới đến sinh nhật, từ cặp đôi đến hội bạn — Nature Spa có gói riêng cho bạn."
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
            {OCCASION_PACKAGES.map((p) => (
              <Tab
                key={p.id}
                label={p.label}
                icon={<Iconify icon={p.icon} width={18} />}
                iconPosition="start"
                sx={{ textTransform: 'none', minHeight: 52, gap: 0.75 }}
              />
            ))}
          </Tabs>

          {OCCASION_PACKAGES.map(
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
              {OCCASION_PACKAGES.map((pkg) => (
                <Grid key={pkg.id} xs={12} sm={6} md={4}>
                  <Box
                    onClick={() => setTab(OCCASION_PACKAGES.indexOf(pkg))}
                    sx={{ cursor: 'pointer' }}
                  >
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

const HOME_SERVICES = [
  {
    name: 'Massage Tại Nhà',
    icon: 'solar:hand-stars-bold-duotone',
    price: 890000,
    duration: '90 phút',
    desc: 'KTV đến tận nơi, mang theo đầy đủ dụng cụ và tinh dầu hữu cơ.',
    tag: 'Phổ biến',
  },
  {
    name: 'Facial Tại Nhà',
    icon: 'solar:face-scan-circle-bold-duotone',
    price: 1090000,
    duration: '75 phút',
    desc: 'Liệu trình chăm sóc da hoàn chỉnh ngay tại phòng ngủ của bạn.',
    tag: '',
  },
  {
    name: 'Nail & Chăm Sóc Tay Chân',
    icon: 'solar:hand-heart-bold-duotone',
    price: 490000,
    duration: '60 phút',
    desc: 'Làm đẹp móng, dưỡng da tay chân chuyên nghiệp.',
    tag: '',
  },
  {
    name: 'Gội Đầu & Massage Da Đầu',
    icon: 'solar:magic-stick-3-bold-duotone',
    price: 390000,
    duration: '45 phút',
    desc: 'Thư giãn đầu óc với liệu pháp massage da đầu và gội đầu thảo mộc.',
    tag: '',
  },
  {
    name: 'Gói Spa Tại Nhà Đầy Đủ',
    icon: 'solar:stars-bold-duotone',
    price: 2490000,
    duration: '3.5 giờ',
    desc: 'Combo massage + facial + nail: trải nghiệm spa 5 sao ngay tại nhà.',
    tag: 'Hot',
  },
  {
    name: 'Spa Sau Sinh Tại Nhà',
    icon: 'solar:heart-bold-duotone',
    price: 1290000,
    duration: '2 giờ',
    desc: 'Liệu trình nhẹ nhàng, an toàn cho mẹ sau sinh — không cần ra khỏi nhà.',
    tag: 'Mới',
  },
];

const HOME_PROCESS = [
  {
    title: 'Đặt lịch online',
    desc: 'Chọn dịch vụ, địa chỉ và khung giờ phù hợp. Xác nhận trong 15 phút.',
  },
  {
    title: 'KTV chuẩn bị',
    desc: 'Kỹ thuật viên được cấp phép chuẩn bị đầy đủ thiết bị và sản phẩm hữu cơ.',
  },
  {
    title: 'KTV đến đúng giờ',
    desc: 'Đến đúng giờ hẹn ±15 phút. Cài đặt không gian thư giãn tại nhà bạn.',
  },
  {
    title: 'Trải nghiệm & đánh giá',
    desc: 'Sau dịch vụ, để lại đánh giá và đặt lịch lần sau với ưu đãi 10%.',
  },
];

export function Spa2HomeServicePageView() {
  const [area, setArea] = useState('hcm');
  const [toast, setToast] = useState('');

  const AREAS = [
    { v: 'hcm', l: 'TP.HCM', note: 'Quận 1–12, Bình Thạnh, Gò Vấp, Tân Bình' },
    { v: 'hn', l: 'Hà Nội', note: 'Hoàn Kiếm, Ba Đình, Đống Đa, Cầu Giấy, Tây Hồ' },
    { v: 'dn', l: 'Đà Nẵng', note: 'Hải Châu, Ngũ Hành Sơn, Sơn Trà' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.booking}
        eyebrow="SPA TẠI NHÀ"
        title="Nature Spa đến tận nơi của bạn"
        subtitle="Kỹ thuật viên được chứng nhận mang toàn bộ dụng cụ và sản phẩm đến nhà bạn trong vòng 60 phút."
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
              {AREAS.map((a) => (
                <Chip
                  key={a.v}
                  label={a.l}
                  onClick={() => setArea(a.v)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: area === a.v ? 'white' : 'rgba(255,255,255,0.2)',
                    color: area === a.v ? SPA2_TEAL_DARK : 'white',
                    fontWeight: area === a.v ? 700 : 400,
                  }}
                />
              ))}
            </Stack>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
              {AREAS.find((a) => a.v === area)?.note}
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Services */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Dịch vụ" title="Chọn dịch vụ spa tại nhà" />
          <Grid container spacing={3}>
            {HOME_SERVICES.map((s) => (
              <Grid key={s.name} xs={12} sm={6} md={4}>
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
            {HOME_PROCESS.map((p, i) => (
              <Grid key={p.title} xs={12} sm={6} md={3}>
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
          {[
            {
              q: 'Cần chuẩn bị gì trước khi KTV đến?',
              a: 'Bạn chỉ cần chuẩn bị một không gian sạch sẽ, thoải mái (phòng ngủ hoặc phòng khách). KTV sẽ mang theo đầy đủ giường massage, dụng cụ và sản phẩm.',
            },
            {
              q: 'KTV có được kiểm tra lý lịch không?',
              a: 'Tất cả KTV tại nhà đều trải qua quy trình kiểm tra lý lịch nghiêm ngặt, có chứng chỉ hành nghề và đeo thẻ nhân viên Nature Spa khi đến nhà khách.',
            },
            {
              q: 'Phí di chuyển có tính thêm không?',
              a: 'Miễn phí di chuyển trong bán kính 10km từ chi nhánh gần nhất. Từ 10–20km phụ phí 50.000đ. Trên 20km vui lòng liên hệ tư vấn.',
            },
            {
              q: 'Có thể đặt theo nhóm (nhiều người cùng lúc) không?',
              a: 'Có. Nhóm 2–4 người sẽ được 2 KTV phục vụ song song. Nhóm trên 4 người vui lòng liên hệ trước ít nhất 2 ngày.',
            },
          ].map((faq, i) => (
            <Accordion
              key={faq.q}
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

type DiaryEntry = {
  date: string;
  moisture: number;
  oiliness: number;
  sensitivity: number;
  note: string;
  service: string;
};

const SAMPLE_ENTRIES: DiaryEntry[] = [
  {
    date: '01/06/2026',
    moisture: 55,
    oiliness: 70,
    sensitivity: 40,
    note: 'Da còn khá nhờn sau đợt nắng nóng.',
    service: 'Facial Organic',
  },
  {
    date: '15/06/2026',
    moisture: 65,
    oiliness: 55,
    sensitivity: 35,
    note: 'Cải thiện rõ sau 1 buổi facial.',
    service: 'Body Scrub',
  },
  {
    date: '01/07/2026',
    moisture: 75,
    oiliness: 45,
    sensitivity: 25,
    note: 'Da căng mượt hơn hẳn, giảm mụn vùng T.',
    service: 'Aromatherapy',
  },
  {
    date: '15/07/2026',
    moisture: 80,
    oiliness: 40,
    sensitivity: 20,
    note: 'Kết quả tốt nhất từ trước đến nay!',
    service: 'Facial Organic',
  },
];

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

export function Spa2SkinDiaryPageView() {
  const [entries] = useState<DiaryEntry[]>(SAMPLE_ENTRIES);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    moisture: 70,
    oiliness: 50,
    sensitivity: 30,
    note: '',
    service: '',
  });

  const latest = entries[entries.length - 1];
  const prev = entries[entries.length - 2];

  const diff = (key: keyof typeof newEntry) => {
    if (typeof latest[key as keyof DiaryEntry] !== 'number') return null;
    const d =
      (latest[key as keyof DiaryEntry] as number) - (prev[key as keyof DiaryEntry] as number);
    return d;
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.faq}
        eyebrow="NHẬT KÝ DA"
        title="Theo dõi hành trình làn da của bạn"
        subtitle="Ghi lại sự thay đổi của da sau mỗi liệu trình — nhìn thấy kết quả rõ ràng theo thời gian."
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
                      key={e.date}
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

const MINDFULNESS_PROGRAMS = [
  {
    name: 'Morning Flow Yoga',
    duration: '60 phút',
    schedule: 'Thứ 2, 4, 6 lúc 7:00',
    instructor: 'Nguyễn Bích Ngọc',
    level: 'Mọi cấp độ',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
  {
    name: 'Thiền Chánh Niệm',
    duration: '45 phút',
    schedule: 'Hàng ngày lúc 6:30 sáng',
    instructor: 'Trần Minh Khôi',
    level: 'Mọi cấp độ',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
  },
  {
    name: 'Yin Yoga Phục Hồi',
    duration: '75 phút',
    schedule: 'Thứ 3, 5, 7 lúc 18:30',
    instructor: 'Phạm Hồng Nhi',
    level: 'Trung cấp',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  },
  {
    name: 'Hơi Thở & Cân Bằng',
    duration: '30 phút',
    schedule: 'Online – mọi lúc',
    instructor: 'Lê Gia Huy',
    level: 'Cơ bản',
    price: 0,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
  },
];

const MINDFULNESS_BENEFITS = [
  {
    icon: 'solar:brain-bold-duotone',
    title: 'Giảm stress & lo âu',
    desc: 'Thực hành chánh niệm đều đặn giảm cortisol – hormone stress – xuống tới 30%.',
  },
  {
    icon: 'solar:heart-pulse-bold-duotone',
    title: 'Cải thiện giấc ngủ',
    desc: 'Thiền trước khi ngủ giúp não bộ thư giãn, đi vào giấc ngủ sâu nhanh hơn 50%.',
  },
  {
    icon: 'solar:leaf-bold-duotone',
    title: 'Tăng cường miễn dịch',
    desc: 'Yoga và thiền kết hợp giúp hệ miễn dịch hoạt động hiệu quả hơn.',
  },
  {
    icon: 'solar:sun-fog-bold-duotone',
    title: 'Sáng suốt & tập trung',
    desc: 'Chỉ 10 phút thiền mỗi ngày cải thiện khả năng tập trung lên đến 40%.',
  },
];

export function Spa2MindfulnessPageView() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.about}
        eyebrow="MINDFULNESS"
        title="Yoga, thiền & sức khỏe tinh thần"
        subtitle="Kết hợp liệu trình spa với thực hành chánh niệm — chăm sóc cơ thể lẫn tâm trí."
      />

      {/* Benefits */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Lợi ích" title="Khoa học về chánh niệm" />
          <Grid container spacing={3}>
            {MINDFULNESS_BENEFITS.map((b) => (
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

      {/* Programs */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle
            eyebrow="Lớp học"
            title="Chương trình hàng tuần"
            subtitle="Tham gia lớp học trực tiếp tại spa hoặc online — linh hoạt theo lịch của bạn."
          />
          <Grid container spacing={3}>
            {MINDFULNESS_PROGRAMS.map((p) => (
              <Grid key={p.name} xs={12} sm={6} md={3}>
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
                🌿 Thử thách 7 ngày chánh niệm
              </Typography>
              <Typography sx={{ opacity: 0.85, fontSize: 14 }}>
                Miễn phí — 10 phút mỗi ngày — thay đổi thói quen trong 1 tuần
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={1.5}>
                {[
                  'Ngày 1: Hơi thở cơ bản',
                  'Ngày 2: Body scan',
                  'Ngày 3: Thiền walking',
                  'Ngày 4: Chánh niệm ăn uống',
                  'Ngày 5: Yoga nhẹ buổi sáng',
                  'Ngày 6: Viết nhật ký cảm xúc',
                  'Ngày 7: Thiền metta từ bi',
                ].map((d, i) => (
                  <Grid key={d} xs={12} sm={6}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: i < 3 ? SPA2_CREAM : 'transparent',
                        border: `1px solid ${i < 3 ? SPA2_TEAL_LIGHT : SPA2_CREAM_DARK}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          bgcolor: i < 3 ? SPA2_TEAL : SPA2_CREAM_DARK,
                          color: i < 3 ? 'white' : 'text.secondary',
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
                      <Typography sx={{ fontSize: 13, color: i < 3 ? SPA2_INK : 'text.secondary' }}>
                        {d.split(': ')[1]}
                      </Typography>
                      {i < 3 && (
                        <Iconify
                          icon="solar:check-circle-bold"
                          width={16}
                          sx={{ color: SPA2_TEAL, ml: 'auto' }}
                        />
                      )}
                    </Stack>
                  </Grid>
                ))}
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
                Tham gia thử thách miễn phí
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

const MEDICAL_TREATMENTS = [
  {
    name: 'HIFU Nâng Cơ Mặt',
    category: 'anti-aging',
    icon: 'solar:bolt-bold-duotone',
    price: 5900000,
    sessions: '1–3 buổi',
    downtime: 'Không',
    desc: 'Nâng cơ, săn chắc da bằng sóng siêu âm hội tụ mà không cần phẫu thuật.',
    certifications: ['FDA Cleared', 'CE Mark'],
    before: 'Nghe tư vấn bác sĩ',
    after: 'Tái khám sau 1 tháng',
  },
  {
    name: 'RF Trẻ Hóa Da Toàn Mặt',
    category: 'anti-aging',
    icon: 'solar:sun-bold-duotone',
    price: 3500000,
    sessions: '4–6 buổi',
    downtime: 'Không',
    desc: 'Sóng radio tần số cao kích thích collagen, cải thiện nếp nhăn và độ đàn hồi.',
    certifications: ['FDA Cleared'],
    before: 'Vệ sinh da kỹ',
    after: 'Tránh nắng 48 giờ',
  },
  {
    name: 'Laser Trị Nám & Tàn Nhang',
    category: 'pigmentation',
    icon: 'solar:lightbulb-bolt-bold-duotone',
    price: 2900000,
    sessions: '3–6 buổi',
    downtime: '3–5 ngày',
    desc: 'Công nghệ laser thế hệ mới phân rã hắc sắc tố, làm đều màu da hiệu quả.',
    certifications: ['CE Mark', 'ISO 13485'],
    before: 'Không tiếp xúc nắng 2 tuần',
    after: 'Dưỡng ẩm & chống nắng',
  },
  {
    name: 'Tiêm Filler Môi & Rãnh Mũi',
    category: 'filler',
    icon: 'solar:drop-bold-duotone',
    price: 4500000,
    sessions: '1 buổi',
    downtime: '1–3 ngày',
    desc: 'Filler hyaluronic acid cao cấp — tạo hình môi tự nhiên, xóa rãnh nông nhanh chóng.',
    certifications: ['FDA Approved', 'Bộ Y Tế VN'],
    before: 'Không uống aspirin 1 tuần',
    after: 'Không massage vùng tiêm 1 tuần',
  },
  {
    name: 'Trị Mụn Ánh Sáng Sinh Học',
    category: 'acne',
    icon: 'solar:cpu-bolt-bold-duotone',
    price: 1800000,
    sessions: '6–10 buổi',
    downtime: 'Không',
    desc: 'Kết hợp LED xanh & đỏ kháng viêm, diệt vi khuẩn gây mụn, tái tạo da không xâm lấn.',
    certifications: ['CE Mark', 'FDA Cleared'],
    before: 'Da sạch, không trang điểm',
    after: 'Không ra nắng 24 giờ',
  },
  {
    name: 'Tế Bào Gốc Tái Sinh Da',
    category: 'regeneration',
    icon: 'solar:dna-bold-duotone',
    price: 8900000,
    sessions: '3 buổi',
    downtime: '1–2 ngày',
    desc: 'Công nghệ tiên tiến nhất — kích thích tái sinh tế bào, trẻ hóa toàn diện ở mức tế bào.',
    certifications: ['CE Mark', 'ISO 13485', 'Bộ Y Tế VN'],
    before: 'Tư vấn bác sĩ 1-1 bắt buộc',
    after: 'Theo dõi 30 ngày',
  },
];

export function Spa2MedicalSpaPageView() {
  const [catFilter, setCatFilter] = useState('all');
  const [selected, setSelected] = useState<(typeof MEDICAL_TREATMENTS)[0] | null>(null);

  const CATS = [
    { v: 'all', l: 'Tất cả' },
    { v: 'anti-aging', l: 'Chống lão hóa' },
    { v: 'pigmentation', l: 'Sắc tố' },
    { v: 'acne', l: 'Trị mụn' },
    { v: 'filler', l: 'Filler' },
    { v: 'regeneration', l: 'Tái sinh' },
  ];
  const filtered =
    catFilter === 'all'
      ? MEDICAL_TREATMENTS
      : MEDICAL_TREATMENTS.filter((t) => t.category === catFilter);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.treatments}
        eyebrow="THẨM MỸ Y KHOA"
        title="Liệu pháp thẩm mỹ công nghệ cao"
        subtitle="Kết hợp giữa y học và làm đẹp — kết quả rõ rệt, an toàn, được bác sĩ giám sát."
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
            {[
              { icon: 'solar:diploma-bold', text: 'Bác sĩ da liễu giám sát' },
              { icon: 'solar:shield-check-bold', text: 'Thiết bị FDA & CE chứng nhận' },
              { icon: 'solar:medal-star-bold', text: 'Giấy phép Bộ Y tế Việt Nam' },
              { icon: 'solar:user-heart-bold', text: 'Tư vấn 1-1 trước mỗi liệu trình' },
            ].map((i) => (
              <Stack key={i.text} direction="row" spacing={1} alignItems="center">
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
            {CATS.map((c) => (
              <Chip
                key={c.v}
                label={c.l}
                onClick={() => setCatFilter(c.v)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: catFilter === c.v ? SPA2_TEAL : 'transparent',
                  color: catFilter === c.v ? 'white' : 'text.secondary',
                  border: `1.5px solid ${catFilter === c.v ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((t) => (
              <Grid key={t.name} xs={12} sm={6} md={4}>
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

export function Spa2SpaEtiquettePageView() {
  const GUIDES = [
    {
      icon: 'solar:clock-circle-bold-duotone',
      title: 'Đến trước 10–15 phút',
      desc: 'Thời gian để hoàn tất lễ tân, thay đồ và thư giãn trước khi bắt đầu liệu trình. Đến trễ có thể cắt ngắn thời gian của bạn.',
    },
    {
      icon: 'solar:phone-cross-bold-duotone',
      title: 'Để điện thoại ở chế độ im lặng',
      desc: 'Không gian spa là nơi để tách khỏi thế giới số. Chúng tôi có tủ khóa an toàn cho thiết bị cá nhân.',
    },
    {
      icon: 'solar:t-shirt-bold-duotone',
      title: 'Trang phục phù hợp',
      desc: 'Không cần chuẩn bị gì đặc biệt. Spa cung cấp đồ choàng, khăn và dép dùng một lần thoải mái.',
    },
    {
      icon: 'solar:cup-bold-duotone',
      title: 'Không ăn no trước 1–2 giờ',
      desc: 'Tránh ăn no ngay trước massage toàn thân để cảm giác thoải mái nhất. Uống đủ nước để tối ưu hiệu quả detox.',
    },
    {
      icon: 'solar:chat-round-dots-bold-duotone',
      title: 'Nói với KTV nhu cầu của bạn',
      desc: 'Hãy thông báo nếu bạn muốn nhẹ hơn/mạnh hơn, có vùng đau hay dị ứng nào. KTV ở đây để phục vụ bạn tốt nhất.',
    },
    {
      icon: 'solar:leaf-bold-duotone',
      title: 'Thư giãn hoàn toàn',
      desc: 'Không cần lo lắng về nói chuyện hay im lặng — theo bản năng của bạn. Đây là thời gian của bạn.',
    },
    {
      icon: 'solar:shower-bold-duotone',
      title: 'Sau liệu trình',
      desc: 'Uống nhiều nước để hỗ trợ detox. Tránh tắm nước nóng ít nhất 4 giờ sau liệu trình thảo dược.',
    },
    {
      icon: 'solar:card-bold-duotone',
      title: 'Tiền thưởng & thanh toán',
      desc: 'Tiền thưởng (tip) không bắt buộc nhưng được đánh giá cao. Thanh toán tại lễ tân sau khi kết thúc dịch vụ.',
    },
  ];

  const DO_DONTS = {
    dos: [
      'Đến đúng giờ hoặc sớm hơn',
      'Thông báo tình trạng sức khỏe đặc biệt',
      'Tắt hoặc im lặng điện thoại',
      'Uống nhiều nước trước và sau',
      'Phản hồi thành thật với KTV',
      'Nghỉ ngơi sau liệu trình nếu có thể',
    ],
    donts: [
      'Không đến nếu đang bệnh sốt/cúm',
      'Không dùng rượu bia trước khi đến',
      'Không để đồ quý giá bên ngoài tủ khóa',
      'Không nói chuyện điện thoại trong phòng trị liệu',
      'Không cố ý trễ hơn 15 phút',
      'Không so sánh với cơ sở khác trong phòng',
    ],
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.about}
        eyebrow="HƯỚNG DẪN"
        title="Lần đầu đến spa? Đừng lo!"
        subtitle="Mọi điều bạn cần biết để có trải nghiệm spa hoàn hảo nhất — từ chuẩn bị đến sau khi về."
      />

      {/* Step guide */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Hướng dẫn" title="8 điều nên biết khi đến spa" />
          <Grid container spacing={3}>
            {GUIDES.map((g, i) => (
              <Grid key={g.title} xs={12} sm={6} md={3}>
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
                  {DO_DONTS.dos.map((d, i) => (
                    <Stack
                      key={d}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        bgcolor: i % 2 ? '#F1F8E9' : 'white',
                        borderBottom: i < DO_DONTS.dos.length - 1 ? `1px solid #E8F5E9` : 'none',
                      }}
                    >
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={15}
                        sx={{ color: '#2E7D32', flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{d}</Typography>
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
                  {DO_DONTS.donts.map((d, i) => (
                    <Stack
                      key={d}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        bgcolor: i % 2 ? '#FFF5F5' : 'white',
                        borderBottom: i < DO_DONTS.donts.length - 1 ? `1px solid #FFEBEE` : 'none',
                      }}
                    >
                      <Iconify
                        icon="solar:close-circle-bold"
                        width={15}
                        sx={{ color: '#C62828', flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{d}</Typography>
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
              <Typography variant="h5">Ưu đãi khách lần đầu</Typography>
            </Box>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                Giảm <strong style={{ color: SPA2_TEAL }}>30%</strong> cho liệu trình đầu tiên tại
                Nature Spa. Áp dụng cho tất cả dịch vụ, tất cả chi nhánh.
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
                  NEW30
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
                Đặt lịch & dùng mã ngay
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

const REWARDS_CATALOG = [
  {
    name: 'Aromatherapy 30 phút',
    points: 500,
    category: 'service',
    icon: 'solar:leaf-bold',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80',
    stock: 20,
  },
  {
    name: 'Tinh dầu hương thiên nhiên',
    points: 300,
    category: 'product',
    icon: 'solar:drop-bold',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
    stock: 50,
  },
  {
    name: 'Voucher 200K dịch vụ',
    points: 200,
    category: 'voucher',
    icon: 'solar:card-bold',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    stock: 100,
  },
  {
    name: 'Body Scrub 45 phút',
    points: 800,
    category: 'service',
    icon: 'solar:body-bold',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
    stock: 15,
  },
  {
    name: 'Bộ quà thảo mộc Nature',
    points: 600,
    category: 'product',
    icon: 'solar:gift-bold',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&q=80',
    stock: 30,
  },
  {
    name: 'Voucher 500K dịch vụ',
    points: 500,
    category: 'voucher',
    icon: 'solar:ticket-bold',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    stock: 50,
  },
  {
    name: 'Massage 90 phút miễn phí',
    points: 1200,
    category: 'service',
    icon: 'solar:hand-stars-bold',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80',
    stock: 10,
  },
  {
    name: 'Thẻ thành viên Gold 1 tháng',
    points: 1500,
    category: 'membership',
    icon: 'solar:crown-bold',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
    stock: 5,
  },
];

export function Spa2LoyaltyRewardsPageView() {
  const [cat, setCat] = useState('all');
  const [redeeming, setRedeeming] = useState<(typeof REWARDS_CATALOG)[0] | null>(null);
  const [redeemed, setRedeemed] = useState(false);
  const POINTS_BALANCE = 3250;

  const CATS = [
    { v: 'all', l: 'Tất cả' },
    { v: 'service', l: 'Dịch vụ' },
    { v: 'product', l: 'Sản phẩm' },
    { v: 'voucher', l: 'Voucher' },
    { v: 'membership', l: 'Thành viên' },
  ];
  const filtered =
    cat === 'all' ? REWARDS_CATALOG : REWARDS_CATALOG.filter((r) => r.category === cat);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.account}
        eyebrow="ĐỔI THƯỞNG"
        title="Đổi điểm lấy phần thưởng"
        subtitle="Tích điểm qua mỗi lần sử dụng dịch vụ và đổi lấy những phần thưởng giá trị."
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
                    {[
                      { label: 'Dịch vụ', ratio: '1đ / 10K' },
                      { label: 'Thẻ Gold (cuối tuần)', ratio: '2đ / 10K' },
                      { label: 'Giới thiệu bạn', ratio: '200đ / người' },
                      { label: 'Review dịch vụ', ratio: '50đ / lần' },
                    ].map((i) => (
                      <Grid key={i.label} xs={6} sm={3}>
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
            {CATS.map((c) => (
              <Chip
                key={c.v}
                label={c.l}
                onClick={() => setCat(c.v)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: cat === c.v ? SPA2_TEAL : 'transparent',
                  color: cat === c.v ? 'white' : 'text.secondary',
                  border: `1.5px solid ${cat === c.v ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((r) => {
              const canRedeem = POINTS_BALANCE >= r.points;
              return (
                <Grid key={r.name} xs={12} sm={6} md={3}>
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

export function Spa2ReviewPageView() {
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
  const RATING_ASPECTS = [
    { label: 'Chất lượng dịch vụ', value: 0 },
    { label: 'Thái độ KTV', value: 0 },
    { label: 'Không gian & vệ sinh', value: 0 },
    { label: 'Giá cả xứng đáng', value: 0 },
  ];
  const [aspects, setAspects] = useState(RATING_ASPECTS);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.feedback}
        eyebrow="ĐÁNH GIÁ"
        title="Chia sẻ trải nghiệm của bạn"
        subtitle="Mỗi đánh giá giúp Nature Spa cải thiện và là nguồn động lực lớn cho đội ngũ chúng tôi."
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
                        <Stack key={a.label} direction="row" alignItems="center" spacing={2}>
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
                        4.9
                      </Typography>
                      <Rating
                        value={4.9}
                        readOnly
                        precision={0.1}
                        sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                      />
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        Từ 3.840 đánh giá
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      {[
                        [5, 82],
                        [4, 14],
                        [3, 3],
                        [2, 0],
                        [1, 1],
                      ].map(([star, pct]) => (
                        <Stack key={star} direction="row" spacing={1.5} alignItems="center">
                          <Typography sx={{ fontSize: 12, color: 'text.secondary', minWidth: 12 }}>
                            {star}
                          </Typography>
                          <Iconify icon="solar:star-bold" width={12} sx={{ color: '#EF9F27' }} />
                          <LinearProgress
                            variant="determinate"
                            value={pct}
                            sx={{
                              flex: 1,
                              height: 7,
                              borderRadius: 99,
                              bgcolor: SPA2_CREAM_DARK,
                              '& .MuiLinearProgress-bar': { bgcolor: '#EF9F27' },
                            }}
                          />
                          <Typography sx={{ fontSize: 12, color: 'text.secondary', minWidth: 30 }}>
                            {pct}%
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
