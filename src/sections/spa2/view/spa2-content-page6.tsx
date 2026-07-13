import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Feedbacks,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
  SPA2_PAGE_IMAGES,
} from '../spa2-pages-data';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// ─── SHARED ─────────────────────────────────────────────────────────

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
  accentColor,
}: {
  img: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta?: React.ReactNode;
  dark?: boolean;
  accentColor?: string;
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
          bgcolor: accentColor || SPA2_TEAL_LIGHT,
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
          <Typography variant="overline" sx={{ color: accentColor || SPA2_TEAL, letterSpacing: 3 }}>
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
  color,
}: {
  title: string;
  sub: string;
  btnLabel: string;
  href: string;
  color?: string;
}) {
  const bg = color || SPA2_TEAL;
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
      <Container>
        <Card
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            color: 'common.white',
            background: `linear-gradient(135deg, ${bg} 0%, ${SPA2_TEAL_DARK} 100%)`,
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

// ══════════════════════════════════════════════════════════
// 1. MEN'S SPA
// ══════════════════════════════════════════════════════════

const MEN_SERVICES = [
  {
    name: 'Deep Clean Facial For Men',
    price: 790000,
    duration: '60 phút',
    icon: 'solar:face-scan-circle-bold-duotone',
    desc: 'Làm sạch sâu, kiểm soát dầu và thu nhỏ lỗ chân lông — dành riêng cho da nam.',
    tags: ['Da dầu', 'Mụn đầu đen'],
  },
  {
    name: 'Sports Recovery Massage',
    price: 890000,
    duration: '75 phút',
    icon: 'solar:running-bold-duotone',
    desc: 'Giải phóng cơ bắp căng cứng sau tập luyện bằng deep tissue massage chuyên biệt.',
    tags: ['Thể thao', 'Đau cơ'],
  },
  {
    name: 'Executive Stress Relief',
    price: 1190000,
    duration: '90 phút',
    icon: 'solar:briefcase-bold-duotone',
    desc: 'Massage toàn thân + facial + head massage — dành cho doanh nhân bận rộn.',
    tags: ['Stress', 'Mệt mỏi'],
  },
  {
    name: 'Gentleman Grooming Package',
    price: 690000,
    duration: '60 phút',
    icon: 'solar:scissor-bold-duotone',
    desc: 'Cạo râu cổ điển, chăm sóc da mặt và massage đầu thư giãn.',
    tags: ['Grooming', 'Cổ điển'],
  },
  {
    name: 'Anti-Aging For Men',
    price: 1090000,
    duration: '75 phút',
    icon: 'solar:star-shine-bold-duotone',
    desc: 'Liệu trình chống lão hóa chuyên biệt — cấu trúc da nam khác hoàn toàn với da nữ.',
    tags: ['Lão hóa', 'Collagen'],
  },
  {
    name: 'Detox Body For Men',
    price: 990000,
    duration: '90 phút',
    icon: 'solar:drop-bold-duotone',
    desc: 'Tẩy da chết với muối biển + massage detox — thải độc hiệu quả cho cơ thể nam.',
    tags: ['Detox', 'Thể hình'],
  },
];

const MEN_FAQS = [
  {
    q: 'Nam giới có nên đi spa không?',
    a: 'Hoàn toàn có. Da nam dày hơn và tiết dầu nhiều hơn, cần được chăm sóc đúng cách. Ngày càng nhiều nam giới nhận ra lợi ích của việc chăm sóc da và thư giãn định kỳ.',
  },
  {
    q: 'Có thoải mái không khi là nam giới đến spa?',
    a: 'Nature Spa có phòng riêng, KTV chuyên biệt cho nam. Không gian hoàn toàn riêng tư và thoải mái — không khác gì phòng gym hay tiệm barber.',
  },
  {
    q: 'Nên bắt đầu từ dịch vụ nào?',
    a: 'Gentleman Grooming Package hoặc Deep Clean Facial là lựa chọn lý tưởng cho lần đầu. KTV sẽ tư vấn thêm dựa trên tình trạng da thực tế của bạn.',
  },
];

export function Spa2MenSpaPageView() {
  const [toast, setToast] = useState('');

  const MEN_PACKAGES = [
    {
      name: 'Monthly Gentleman',
      price: 2990000,
      sessions: '1 lần/tháng',
      desc: 'Facial + Grooming hàng tháng — duy trì làn da tươi trẻ, chuyên nghiệp.',
    },
    {
      name: 'Executive Monthly',
      price: 4990000,
      sessions: '2 lần/tháng',
      desc: 'Stress relief + Facial + Grooming — dành cho doanh nhân bận rộn.',
    },
    {
      name: 'All-In Annual',
      price: 24900000,
      sessions: 'Không giới hạn',
      desc: 'Tất cả dịch vụ men spa không giới hạn trong 12 tháng.',
      hot: true,
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
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
            backgroundImage: `url(${SPA2_PAGE_IMAGES.careers})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 340,
            height: 340,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            opacity: 0.07,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
              SPA DÀNH CHO NAM
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 680 }}
            >
              Chăm sóc bản thân không phân biệt giới tính
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 520 }}>
              Liệu trình thiết kế riêng cho da và cơ thể nam — thư giãn, trẻ hóa và phục hồi năng
              lượng.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                component={RouterLink}
                href={paths.spa2.booking}
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Đặt lịch ngay
              </Button>
              <Button
                size="large"
                sx={{
                  borderRadius: 999,
                  px: 4,
                  py: 1.5,
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Xem menu
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ py: 4, bgcolor: SPA2_TEAL }}>
        <Container>
          <Grid container spacing={3} justifyContent="center">
            {[
              { n: '40%', l: 'Khách hàng là nam' },
              { n: '4.9★', l: 'Đánh giá từ nam giới' },
              { n: '6', l: 'Dịch vụ chuyên biệt' },
              { n: '0', l: 'Phán xét' },
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

      {/* Services */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle
            eyebrow="Dịch vụ"
            title="Menu Men's Spa"
            subtitle="Tất cả liệu trình được điều chỉnh phù hợp với cấu trúc da và cơ thể đặc thù của nam giới."
          />
          <Grid container spacing={3}>
            {MEN_SERVICES.map((s) => (
              <Grid key={s.name} xs={12} sm={6} md={4}>
                <SoftCard>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      bgcolor: SPA2_CREAM,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={s.icon} width={26} sx={{ color: SPA2_TEAL }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 15 }}>
                    {s.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Chip
                      label={s.duration}
                      size="small"
                      sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                    />
                    {s.tags.map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        size="small"
                        sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontSize: 11 }}
                      />
                    ))}
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
                      Đặt lịch
                    </Button>
                  </Stack>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Packages */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Gói thành viên" title="Gói định kỳ dành cho nam" />
          <Grid container spacing={3}>
            {MEN_PACKAGES.map((p) => (
              <Grid key={p.name} xs={12} md={4}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: p.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: p.hot ? '0 16px 40px rgba(46,139,122,0.18)' : 'none',
                    transform: p.hot ? { md: 'scale(1.04)' } : undefined,
                    height: '100%',
                  }}
                >
                  {p.hot && (
                    <Chip
                      label="GIÁ TRỊ NHẤT"
                      sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700, mb: 1.5 }}
                    />
                  )}
                  <Typography sx={{ fontWeight: 700, color: SPA2_INK, fontSize: 17, mb: 0.5 }}>
                    {p.name}
                  </Typography>
                  <Chip
                    label={p.sessions}
                    size="small"
                    sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: 'text.secondary' }}
                  />
                  <Typography
                    sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                  >
                    {p.desc}
                  </Typography>
                  <Typography variant="h4" sx={{ color: SPA2_TEAL, mb: 2 }}>
                    {formatVND(p.price)}
                  </Typography>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={paths.spa2.contact}
                    sx={{
                      borderRadius: 99,
                      py: 1.3,
                      bgcolor: p.hot ? SPA2_TEAL : 'transparent',
                      color: p.hot ? 'white' : SPA2_TEAL_DARK,
                      border: p.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                      '&:hover': { bgcolor: SPA2_TEAL_DARK, color: 'white' },
                    }}
                  >
                    Đăng ký gói
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="FAQ" title="Câu hỏi từ khách hàng nam" />
          {MEN_FAQS.map((f, i) => (
            <Accordion
              key={f.q}
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
              <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                  {f.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: 13.5 }}>
                  {f.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <GradientCta
        title="Thử nghiệm men's spa hôm nay"
        sub="Giảm 20% cho lần đầu tiên — mã MENSFIRST."
        btnLabel="Đặt lịch ngay"
        href={paths.spa2.booking}
        color={SPA2_INK}
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
// 2. HAIR & SCALP TREATMENTS
// ══════════════════════════════════════════════════════════

const HAIR_SERVICES = [
  {
    name: 'Gội Đầu Thảo Mộc Cao Cấp',
    price: 290000,
    duration: '45 phút',
    icon: 'solar:magic-stick-3-bold-duotone',
    desc: 'Gội sạch với thảo dược tự nhiên, massage da đầu kích thích tuần hoàn.',
    concerns: ['Gàu', 'Da đầu nhờn'],
  },
  {
    name: 'Deep Conditioning Treatment',
    price: 590000,
    duration: '60 phút',
    icon: 'solar:drop-bold-duotone',
    desc: 'Ủ dưỡng chuyên sâu phục hồi mái tóc hư tổn, khô xơ và chẻ ngọn.',
    concerns: ['Tóc khô', 'Hư tổn'],
  },
  {
    name: 'Scalp Detox & Massage',
    price: 490000,
    duration: '60 phút',
    icon: 'solar:leaf-bold-duotone',
    desc: 'Tẩy tế bào chết da đầu, làm sạch nang tóc và kích thích mọc tóc.',
    concerns: ['Rụng tóc', 'Da đầu khô'],
  },
  {
    name: 'Keratin Repair Treatment',
    price: 1290000,
    duration: '90 phút',
    icon: 'solar:stars-bold-duotone',
    desc: 'Phục hồi keratin tóc bằng protein tự nhiên — tóc mềm mượt bền đến 6 tuần.',
    concerns: ['Tóc hư nặng', 'Uốn/nhuộm'],
  },
  {
    name: 'Anti Hair Loss Program',
    price: 890000,
    duration: '75 phút',
    icon: 'solar:shield-bold-duotone',
    desc: 'Liệu trình trị rụng tóc chuyên sâu: serum + massage + ánh sáng hồng ngoại.',
    concerns: ['Rụng tóc', 'Thưa tóc'],
  },
  {
    name: 'Scalp Hydration Facial',
    price: 690000,
    duration: '60 phút',
    icon: 'solar:snowflake-bold-duotone',
    desc: 'Cấp ẩm sâu cho da đầu khô ngứa — kết hợp chiết xuất lô hội và dầu argan.',
    concerns: ['Da đầu khô', 'Ngứa'],
  },
];

export function Spa2HairBeautyPageView() {
  const [concern, setConcern] = useState('all');
  const [toast, setToast] = useState('');

  const CONCERNS = ['all', 'Rụng tóc', 'Tóc khô', 'Hư tổn', 'Da đầu khô', 'Gàu', 'Ngứa'];
  const filtered =
    concern === 'all'
      ? HAIR_SERVICES
      : HAIR_SERVICES.filter((s) => s.concerns.some((c) => c === concern));

  const HAIR_TIPS = [
    { icon: '💧', tip: 'Gội đầu đúng cách: xoa nhẹ da đầu 3–5 phút thay vì cọ mạnh.' },
    { icon: '🌿', tip: 'Sử dụng nước lạnh để xả tóc — giúp đóng vảy tóc và tăng độ bóng.' },
    { icon: '🌞', tip: 'Tránh để tóc ướt khi ra nắng — gốc tóc dễ tổn thương nhất khi ẩm.' },
    { icon: '🥚', tip: 'Ăn đủ protein và biotin — dinh dưỡng quyết định 80% sức khỏe của tóc.' },
    { icon: '✂️', tip: 'Cắt ngọn tóc mỗi 8–12 tuần để ngăn chẻ ngọn lan lên phần thân tóc.' },
    { icon: '🧴', tip: 'Dùng dầu xả cách gốc tóc 5cm để tránh làm tắc nghẽn nang lông.' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.gallery}
        eyebrow="TÓC & DA ĐẦU"
        title="Liệu trình chăm sóc tóc & da đầu"
        subtitle="Phục hồi mái tóc hư tổn, trị rụng tóc và nuôi dưỡng da đầu từ tầng sâu nhất bằng thảo dược hữu cơ."
      />

      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {CONCERNS.map((c) => (
              <Chip
                key={c}
                label={c === 'all' ? 'Tất cả' : c}
                onClick={() => setConcern(c)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: concern === c ? SPA2_TEAL : 'transparent',
                  color: concern === c ? 'white' : 'text.secondary',
                  border: `1.5px solid ${concern === c ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((s) => (
              <Grid key={s.name} xs={12} sm={6} md={4}>
                <SoftCard>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      bgcolor: SPA2_CREAM,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={s.icon} width={26} sx={{ color: SPA2_TEAL }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
                    {s.name}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}
                  >
                    <Chip
                      label={s.duration}
                      size="small"
                      sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                    />
                    {s.concerns.map((c) => (
                      <Chip
                        key={c}
                        label={c}
                        size="small"
                        sx={{ bgcolor: '#E3F2FD', color: '#0C447C', fontSize: 11 }}
                      />
                    ))}
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

      {/* Hair tips */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Bí quyết" title="6 thói quen bảo vệ mái tóc" />
          <Grid container spacing={2}>
            {HAIR_TIPS.map((t, i) => (
              <Grid key={i} xs={12} sm={6} md={4}>
                <SoftCard sx={{ bgcolor: 'common.white' }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Typography sx={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>
                      {t.icon}
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: SPA2_INK, lineHeight: 1.7 }}>
                      {t.tip}
                    </Typography>
                  </Stack>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <GradientCta
        title="Mái tóc khỏe đẹp bắt đầu từ da đầu"
        sub="Tư vấn miễn phí — KTV đánh giá da đầu trước khi chọn liệu trình."
        btnLabel="Đặt lịch tư vấn"
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
// 3. KIDS & TEEN SPA
// ══════════════════════════════════════════════════════════

const KIDS_SERVICES = [
  {
    name: 'Mini Facial Cho Bé',
    ageRange: '8–12 tuổi',
    price: 390000,
    duration: '30 phút',
    icon: 'solar:face-scan-circle-bold-duotone',
    desc: 'Làm sạch nhẹ nhàng và dưỡng ẩm với sản phẩm 100% thiên nhiên, pH trung tính.',
    color: '#F48FB1',
  },
  {
    name: 'Teen Skin Clear',
    ageRange: '13–17 tuổi',
    price: 590000,
    duration: '45 phút',
    icon: 'solar:leaf-bold-duotone',
    desc: 'Kiểm soát dầu và mụn đầu đen giai đoạn dậy thì — không dùng hóa chất mạnh.',
    color: SPA2_TEAL,
  },
  {
    name: 'Nail Art Cho Bé',
    ageRange: '6–12 tuổi',
    price: 290000,
    duration: '45 phút',
    icon: 'solar:hand-heart-bold-duotone',
    desc: 'Làm đẹp móng với sơn không độc hại, an toàn cho trẻ em — màu sắc ngộ nghĩnh.',
    color: '#EF9F27',
  },
  {
    name: 'Gội Đầu Thư Giãn',
    ageRange: '5+ tuổi',
    price: 190000,
    duration: '30 phút',
    icon: 'solar:magic-stick-3-bold-duotone',
    desc: 'Gội đầu với shampoo thảo mộc dành riêng cho trẻ, massage nhẹ nhàng thư giãn.',
    color: '#7F77DD',
  },
  {
    name: 'Mẹ & Bé Spa Together',
    ageRange: 'Mọi lứa tuổi',
    price: 1290000,
    duration: '90 phút',
    icon: 'solar:heart-bold-duotone',
    desc: 'Trải nghiệm spa song song — mẹ làm facial, bé làm nail — kỷ niệm đáng nhớ.',
    color: '#C2185B',
  },
  {
    name: 'Birthday Princess Party',
    ageRange: '6–14 tuổi',
    price: 2490000,
    duration: '2 giờ (nhóm 4+)',
    icon: 'solar:gift-bold-duotone',
    desc: 'Tiệc sinh nhật spa phong cách công chúa — nail, facial nhẹ, makeup và chụp ảnh.',
    color: '#E91E63',
  },
];

const SAFETY_BADGES = [
  { icon: 'solar:leaf-bold', label: 'pH trung tính' },
  { icon: 'solar:shield-check-bold', label: 'Không paraben' },
  { icon: 'solar:drop-bold', label: 'Không cồn' },
  { icon: 'solar:check-circle-bold', label: 'Bác sĩ nhi chứng nhận' },
  { icon: 'solar:heart-bold', label: 'An toàn từ 5 tuổi' },
  { icon: 'solar:star-bold', label: 'Sản phẩm hữu cơ' },
];

export function Spa2KidsSpaPageView() {
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Colorful hero */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #F8BBD9 0%, #E1F5FE 50%, #E8F5E9 100%)',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: '50%',
            bgcolor: '#F48FB1',
            opacity: 0.15,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            opacity: 0.1,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography sx={{ fontSize: 64, lineHeight: 1 }}>🌸✨💆</Typography>
            <Typography variant="overline" sx={{ color: '#C2185B', letterSpacing: 3 }}>
              SPA DÀNH CHO TRẺ EM & TEEN
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1, maxWidth: 720 }}
            >
              Những khoảnh khắc làm đẹp an toàn & vui vẻ cho bé
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 17, maxWidth: 560 }}>
              Sản phẩm 100% hữu cơ, an toàn cho trẻ — mang đến trải nghiệm spa đầu tiên thật đặc
              biệt.
            </Typography>
            <Alert
              severity="success"
              sx={{ borderRadius: 3, bgcolor: '#E8F5E9', color: '#1B5E20', maxWidth: 420 }}
            >
              <strong>Phụ huynh có thể ở lại</strong> trong suốt quá trình thực hiện dịch vụ cho
              con.
            </Alert>
          </Stack>
        </Container>
      </Box>

      {/* Safety certifications */}
      <Box sx={{ py: 3, bgcolor: SPA2_CREAM }}>
        <Container>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            flexWrap="wrap"
            sx={{ gap: 1 }}
          >
            {SAFETY_BADGES.map((b) => (
              <Chip
                key={b.label}
                icon={<Iconify icon={b.icon} width={14} />}
                label={b.label}
                sx={{
                  bgcolor: 'common.white',
                  color: SPA2_TEAL_DARK,
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                  '& .MuiChip-icon': { color: SPA2_TEAL },
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Services */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Dịch vụ" title="Trải nghiệm spa cho bé yêu" />
          <Grid container spacing={3}>
            {KIDS_SERVICES.map((s) => (
              <Grid key={s.name} xs={12} sm={6} md={4}>
                <SoftCard sx={{ borderTop: `4px solid ${s.color}` }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: 3,
                        bgcolor: `${s.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={s.icon} width={24} sx={{ color: s.color }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, mb: 0.25 }}>
                        {s.name}
                      </Typography>
                      <Stack direction="row" spacing={0.75}>
                        <Chip
                          label={s.ageRange}
                          size="small"
                          sx={{
                            bgcolor: `${s.color}15`,
                            color: s.color,
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        />
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
                    <Typography sx={{ fontWeight: 700, color: s.color, fontSize: 16 }}>
                      {formatVND(s.price)}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedService(s.name);
                        setOpenBooking(true);
                      }}
                      sx={{
                        borderRadius: 99,
                        bgcolor: s.color,
                        color: 'white',
                        px: 2,
                        '&:hover': { opacity: 0.88, bgcolor: s.color },
                      }}
                    >
                      Đặt cho bé
                    </Button>
                  </Stack>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Parent note */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FFF8E1' }}>
        <Container maxWidth="md">
          <Card sx={{ borderRadius: 4, border: '1.5px solid #FFD54F', boxShadow: 'none', p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Typography sx={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>👨‍👩‍👧</Typography>
              <Box>
                <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 16 }}>
                  Thông tin dành cho phụ huynh
                </Typography>
                <Stack spacing={1}>
                  {[
                    'Phụ huynh bắt buộc đi cùng với trẻ dưới 12 tuổi.',
                    'Phụ huynh có thể ở lại trong phòng trị liệu trong suốt quá trình.',
                    'KTV được đào tạo chuyên biệt về chăm sóc trẻ em — nhẹ nhàng và kiên nhẫn.',
                    'Trẻ có quyền dừng dịch vụ bất kỳ lúc nào mà không bị tính phí.',
                    'Tất cả sản phẩm được kiểm nghiệm da học và chứng nhận an toàn cho trẻ em.',
                  ].map((note) => (
                    <Stack key={note} direction="row" spacing={1.5} alignItems="flex-start">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={16}
                        sx={{ color: '#F9A825', flexShrink: 0, mt: '2px' }}
                      />
                      <Typography sx={{ fontSize: 13.5, color: 'text.secondary' }}>
                        {note}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Container>
      </Box>

      <GradientCta
        title="Tặng bé trải nghiệm spa đầu tiên thật đặc biệt"
        sub="Đặt trước 1 tuần để chuẩn bị không gian riêng cho bé."
        btnLabel="Đặt lịch cho bé"
        href={paths.spa2.booking}
        color="#C2185B"
      />

      {/* Booking dialog */}
      <Dialog
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <IconButton
            onClick={() => setOpenBooking(false)}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
          <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
            Đặt lịch cho bé
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
            {selectedService}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <TextField fullWidth size="small" label="Tên phụ huynh" />
            <TextField fullWidth size="small" label="Số điện thoại" />
            <TextField fullWidth size="small" label="Tên & tuổi của bé" />
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Ngày muốn đặt"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label="Dị ứng hoặc lưu ý sức khỏe"
              placeholder="Nhập nếu có..."
            />
            <Button
              fullWidth
              onClick={() => setOpenBooking(false)}
              sx={{
                borderRadius: 99,
                py: 1.4,
                bgcolor: '#C2185B',
                color: 'white',
                '&:hover': { opacity: 0.88 },
              }}
            >
              Xác nhận đặt lịch
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 4. ANTI-AGING PROGRAM
// ══════════════════════════════════════════════════════════

const AGING_CONCERNS = [
  {
    concern: 'Nếp nhăn',
    icon: '〰️',
    treatments: ['HIFU nâng cơ', 'RF trẻ hóa', 'Collagen Infusion'],
  },
  { concern: 'Da chùng nhão', icon: '📉', treatments: ['RF nâng cơ', 'Tế bào gốc', 'Laser CO2'] },
  {
    concern: 'Đốm nâu & sắc tố',
    icon: '🍂',
    treatments: ['Laser trị nám', 'Vitamin C điện di', 'Peel'],
  },
  {
    concern: 'Lỗ chân lông to',
    icon: '🔍',
    treatments: ['Laser se khít', 'RF vi điểm', 'Retinol Facial'],
  },
  {
    concern: 'Da xỉn màu',
    icon: '🌥️',
    treatments: ['Tế bào gốc', 'Brightening Facial', 'Mặt nạ ngọc trai'],
  },
  {
    concern: 'Quầng thâm mắt',
    icon: '👁️',
    treatments: ['Lymphatic Drainage', 'Vitamin K serum', 'Cooling Eye Mask'],
  },
];

const ANTIAGING_STAGES = [
  {
    age: '25–35',
    title: 'Phòng ngừa',
    color: '#4CAF50',
    icon: 'solar:shield-bold-duotone',
    desc: 'Duy trì collagen, chống nắng và dưỡng ẩm sâu để làm chậm lão hóa.',
    services: ['Hydrating Facial', 'Collagen Infusion', 'SPF Treatment'],
  },
  {
    age: '35–45',
    title: 'Phục hồi sớm',
    color: SPA2_TEAL,
    icon: 'solar:refresh-bold-duotone',
    desc: 'Kích thích tái tạo collagen, cải thiện độ đàn hồi và mờ nếp nhăn đầu tiên.',
    services: ['RF Facial', 'Vitamin C Infusion', 'Eye Zone Treatment'],
  },
  {
    age: '45–55',
    title: 'Tái cấu trúc',
    color: '#EF9F27',
    icon: 'solar:chart-2-bold-duotone',
    desc: 'Nâng cơ, xóa nếp nhăn sâu và phục hồi khung xương mặt bằng công nghệ tiên tiến.',
    services: ['HIFU', 'Filler nhẹ', 'Stem Cell Treatment'],
  },
  {
    age: '55+',
    title: 'Phục hồi toàn diện',
    color: '#7F77DD',
    icon: 'solar:stars-bold-duotone',
    desc: 'Chương trình kết hợp đa phương pháp — phục hồi sức sống cho làn da theo từng giai đoạn.',
    services: ['Multi-Modal Program', 'Platelet Rich Plasma', 'Luxury Anti-Aging Ritual'],
  },
];

export function Spa2AntiAgingPageView() {
  const [activeAge, setActiveAge] = useState(0);
  const stage = ANTIAGING_STAGES[activeAge];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
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
            backgroundImage: `url(${SPA2_PAGE_IMAGES.treatments})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
              CHỐNG LÃO HÓA
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 700 }}
            >
              Giải pháp chống lão hóa cá nhân hóa theo từng độ tuổi
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 560 }}>
              Không có một công thức chống lão hóa chung. Chương trình của bạn phụ thuộc vào tuổi,
              tình trạng da và mục tiêu riêng.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Age stage selector */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Lộ trình" title="Chọn giai đoạn tuổi của bạn" />
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mb: 5, gap: 1 }}
          >
            {ANTIAGING_STAGES.map((s, i) => (
              <Chip
                key={s.age}
                label={`${s.age}: ${s.title}`}
                onClick={() => setActiveAge(i)}
                sx={{
                  cursor: 'pointer',
                  height: 38,
                  fontSize: 14,
                  bgcolor: activeAge === i ? s.color : 'transparent',
                  color: activeAge === i ? 'white' : 'text.secondary',
                  border: `1.5px solid ${activeAge === i ? s.color : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={4} alignItems="center">
            <Grid xs={12} md={5}>
              <Card
                sx={{
                  p: 4,
                  borderRadius: 5,
                  background: `linear-gradient(135deg, ${stage.color}18 0%, ${stage.color}08 100%)`,
                  border: `2px solid ${stage.color}30`,
                  boxShadow: 'none',
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    bgcolor: stage.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Iconify icon={stage.icon} width={32} sx={{ color: 'white' }} />
                </Box>
                <Chip
                  label={stage.age}
                  sx={{ bgcolor: stage.color, color: 'white', fontWeight: 700, mb: 2 }}
                />
                <Typography variant="h4" sx={{ color: SPA2_INK, mb: 1.5 }}>
                  {stage.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                  {stage.desc}
                </Typography>
                <Stack spacing={1}>
                  {stage.services.map((s) => (
                    <Stack key={s} direction="row" spacing={1.5} alignItems="center">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={16}
                        sx={{ color: stage.color, flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: 14, color: SPA2_INK }}>{s}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Button
                  component={RouterLink}
                  href={paths.spa2.booking}
                  fullWidth
                  sx={{
                    mt: 3,
                    borderRadius: 99,
                    py: 1.4,
                    bgcolor: stage.color,
                    color: 'white',
                    '&:hover': { opacity: 0.88, bgcolor: stage.color },
                  }}
                >
                  Đặt lịch tư vấn
                </Button>
              </Card>
            </Grid>
            <Grid xs={12} md={7}>
              <SectionTitle eyebrow="Vấn đề" title="Chúng tôi giải quyết được gì?" align="left" />
              <Grid container spacing={2}>
                {AGING_CONCERNS.map((c) => (
                  <Grid key={c.concern} xs={12} sm={6}>
                    <Card
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: `1px solid ${SPA2_CREAM_DARK}`,
                        boxShadow: 'none',
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <Typography sx={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>
                          {c.icon}
                        </Typography>
                        <Box>
                          <Typography
                            sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}
                          >
                            {c.concern}
                          </Typography>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ gap: 0.5 }}>
                            {c.treatments.map((t) => (
                              <Chip
                                key={t}
                                label={t}
                                size="small"
                                sx={{
                                  bgcolor: SPA2_CREAM,
                                  color: 'text.secondary',
                                  fontSize: 10,
                                  height: 18,
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <GradientCta
        title="Bắt đầu hành trình trẻ hóa của bạn"
        sub="Tư vấn miễn phí với bác sĩ da liễu — không cam kết."
        btnLabel="Đặt tư vấn ngay"
        href={paths.spa2.contact}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 5. WATER THERAPY (THỦY TRỊ LIỆU)
// ══════════════════════════════════════════════════════════

const WATER_TREATMENTS = [
  {
    name: 'Bồn Tắm Khoáng Himalaya',
    price: 590000,
    duration: '45 phút',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
    desc: 'Ngâm mình trong nước muối hồng Himalaya giàu khoáng chất — detox và thư giãn cơ sâu.',
    benefits: ['Thải độc cơ thể', 'Giảm đau cơ', 'Cân bằng pH da'],
  },
  {
    name: 'Bồn Tắm Sữa & Hoa Hồng',
    price: 790000,
    duration: '45 phút',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    desc: 'Bồn tắm Cleopatra với sữa bò tươi, cánh hoa hồng và tinh dầu dưỡng ẩm sâu.',
    benefits: ['Dưỡng ẩm sâu', 'Sáng da tự nhiên', 'Thư giãn toàn thân'],
  },
  {
    name: 'Xông Hơi Thảo Dược',
    price: 390000,
    duration: '30 phút',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    desc: 'Xông hơi với hỗn hợp sả, gừng, lá bưởi và thảo mộc Việt — khai thông hệ hô hấp.',
    benefits: ['Khai thông lỗ chân lông', 'Giảm stress', 'Tăng miễn dịch'],
  },
  {
    name: 'Liệu Pháp Đá Lạnh & Đá Nóng',
    price: 890000,
    duration: '60 phút',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    desc: 'Kết hợp nhiệt học — đá nóng giãn cơ, đá lạnh kích thích tuần hoàn và làn da.',
    benefits: ['Tuần hoàn máu', 'Giảm viêm', 'Sức sống làn da'],
  },
];

export function Spa2WaterTherapyPageView() {
  const [selected, setSelected] = useState<(typeof WATER_TREATMENTS)[0] | null>(null);
  const [step, setStep] = useState<'browse' | 'book' | 'done'>('browse');

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #0D47A1 0%, #00695C 100%)',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            background:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography sx={{ fontSize: 56, lineHeight: 1 }}>💧</Typography>
            <Typography variant="overline" sx={{ color: '#80DEEA', letterSpacing: 3 }}>
              THỦY TRỊ LIỆU
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 680 }}
            >
              Sức mạnh chữa lành của nước
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 540 }}>
              Hydrotherapy — liệu pháp dùng nước ở các nhiệt độ và áp suất khác nhau để chữa bệnh và
              phục hồi từ ngàn năm trước.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Liệu pháp" title="Các liệu pháp thủy trị liệu" />
          <Grid container spacing={4}>
            {WATER_TREATMENTS.map((t) => (
              <Grid key={t.name} xs={12} sm={6} md={3}>
                <SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: `url(${t.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                      }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 14 }}>
                        {t.duration}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 2.5 }}>
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
                      {t.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}
                    >
                      {t.desc}
                    </Typography>
                    <Stack spacing={0.5} sx={{ mb: 2 }}>
                      {t.benefits.map((b) => (
                        <Stack key={b} direction="row" spacing={1} alignItems="center">
                          <Iconify
                            icon="solar:check-circle-bold"
                            width={13}
                            sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                          />
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            {b}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography sx={{ fontWeight: 700, color: '#0D47A1', fontSize: 15 }}>
                        {formatVND(t.price)}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => {
                          setSelected(t);
                          setStep('book');
                        }}
                        sx={{
                          borderRadius: 99,
                          bgcolor: '#0D47A1',
                          color: 'white',
                          px: 1.5,
                          fontSize: 12,
                          '&:hover': { opacity: 0.88 },
                        }}
                      >
                        Đặt ngay
                      </Button>
                    </Stack>
                  </Box>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Science */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#E3F2FD' }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Khoa học" title="Tại sao nước lại có sức mạnh chữa lành?" />
          <Grid container spacing={3}>
            {[
              {
                icon: '🌡️',
                title: 'Nhiệt độ',
                desc: 'Nước nóng (38–42°C) giãn cơ, kích thích tuần hoàn. Nước lạnh (15–20°C) giảm viêm, tăng cường miễn dịch.',
              },
              {
                icon: '⚗️',
                title: 'Khoáng chất',
                desc: 'Muối khoáng được hấp thụ qua da, bổ sung Mg, K, Ca — cân bằng điện giải tự nhiên.',
              },
              {
                icon: '💨',
                title: 'Áp suất',
                desc: 'Áp lực nước tạo hiệu ứng massage tự nhiên, kích thích hệ bạch huyết và giải phóng endorphin.',
              },
            ].map((s) => (
              <Grid key={s.title} xs={12} md={4}>
                <SoftCard sx={{ bgcolor: 'common.white', textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 48, lineHeight: 1, mb: 1.5 }}>{s.icon}</Typography>
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

      <GradientCta
        title="Thư giãn theo phong cách Châu Âu"
        sub="Tặng kèm trà thảo mộc & khăn tắm cao cấp cho mọi liệu trình."
        btnLabel="Đặt lịch thủy trị liệu"
        href={paths.spa2.booking}
        color="#0D47A1"
      />

      {/* Booking dialog */}
      <Dialog
        open={step === 'book' && !!selected}
        onClose={() => setStep('browse')}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {selected && step === 'book' && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setStep('browse')}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
              Đặt lịch: {selected.name}
            </Typography>
            <Stack spacing={2}>
              <TextField fullWidth size="small" label="Họ và tên" />
              <TextField fullWidth size="small" label="Số điện thoại" />
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Ngày"
                InputLabelProps={{ shrink: true }}
              />
              <Button
                fullWidth
                onClick={() => setStep('done')}
                sx={{
                  borderRadius: 99,
                  py: 1.3,
                  bgcolor: '#0D47A1',
                  color: 'white',
                  '&:hover': { opacity: 0.88 },
                }}
              >
                Xác nhận đặt lịch
              </Button>
            </Stack>
          </DialogContent>
        )}
        {step === 'done' && (
          <DialogContent sx={{ p: 3 }}>
            <Stack alignItems="center" spacing={2} sx={{ py: 3, textAlign: 'center' }}>
              <Iconify icon="solar:check-circle-bold" width={52} sx={{ color: '#0D47A1' }} />
              <Typography variant="h6" sx={{ color: SPA2_INK }}>
                Đặt lịch thành công!
              </Typography>
              <Button
                onClick={() => {
                  setStep('browse');
                  setSelected(null);
                }}
                sx={{ borderRadius: 99, bgcolor: '#0D47A1', color: 'white', px: 4 }}
              >
                Đóng
              </Button>
            </Stack>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 6. AYURVEDA & TRADITIONAL MEDICINE
// ══════════════════════════════════════════════════════════

const AYURVEDA_TREATMENTS = [
  {
    name: 'Abhyanga Full Body Massage',
    origin: 'Ấn Độ',
    price: 1190000,
    duration: '90 phút',
    icon: 'solar:hand-stars-bold-duotone',
    desc: 'Massage toàn thân bằng dầu thảo dược ấm — kỹ thuật Ayurveda 5000 năm tuổi, cân bằng 3 dosha.',
  },
  {
    name: 'Shirodhara (Rót Dầu Đầu)',
    origin: 'Ấn Độ',
    price: 890000,
    duration: '60 phút',
    icon: 'solar:drop-bold-duotone',
    desc: 'Rót dầu thảo dược ấm liên tục lên trán — kích hoạt trực giác, giảm lo âu và mất ngủ sâu.',
  },
  {
    name: 'Tuina Therapeutic Massage',
    origin: 'Trung Quốc',
    price: 890000,
    duration: '75 phút',
    icon: 'solar:lightning-bold-duotone',
    desc: 'Massage y học cổ truyền Trung Quốc — tác động vào kinh lạc và huyệt đạo, điều hòa khí huyết.',
  },
  {
    name: 'Đông Y Herbal Bath',
    origin: 'Việt Nam',
    price: 690000,
    duration: '60 phút',
    icon: 'solar:leaf-bold-duotone',
    desc: 'Ngâm trong bồn thuốc Đông Y với 20+ thảo dược truyền thống — phục hồi sức khỏe toàn diện.',
  },
  {
    name: 'Thai Yoga Massage',
    origin: 'Thái Lan',
    price: 1090000,
    duration: '90 phút',
    icon: 'solar:body-bold-duotone',
    desc: 'Kết hợp yoga thụ động và ấn huyệt — mở rộng các đường năng lượng và tăng linh hoạt cơ thể.',
  },
  {
    name: 'Balinese Spirit Ritual',
    origin: 'Indonesia',
    price: 1390000,
    duration: '120 phút',
    icon: 'solar:stars-bold-duotone',
    desc: 'Nghi thức Bali đầy đủ: tẩy tế bào chết + massage + hoa + dầu thơm — trải nghiệm hoàn toàn khác biệt.',
  },
];

export function Spa2AyurvedaPageView() {
  const [origin, setOrigin] = useState('all');

  const ORIGINS = ['all', 'Ấn Độ', 'Trung Quốc', 'Việt Nam', 'Thái Lan', 'Indonesia'];
  const filtered =
    origin === 'all' ? AYURVEDA_TREATMENTS : AYURVEDA_TREATMENTS.filter((t) => t.origin === origin);

  const ORIGIN_FLAGS: Record<string, string> = {
    'Ấn Độ': '🇮🇳',
    'Trung Quốc': '🇨🇳',
    'Việt Nam': '🇻🇳',
    'Thái Lan': '🇹🇭',
    Indonesia: '🇮🇩',
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #3E2723 0%, #BF360C 50%, #E65100 100%)',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.06,
            backgroundImage: `url(${SPA2_PAGE_IMAGES.about})`,
            backgroundSize: 'cover',
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography sx={{ fontSize: 56, lineHeight: 1 }}>🪔</Typography>
            <Typography variant="overline" sx={{ color: '#FFCC80', letterSpacing: 3 }}>
              Y HỌC CỔ TRUYỀN
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 700 }}
            >
              Trí tuệ chữa lành từ phương Đông ngàn năm
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 540 }}>
              Ayurveda, Tuina, Đông Y Việt Nam, Thai Massage và Bali Ritual — được thực hiện bởi KTV
              được đào tạo chính thống.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{ mb: 5, gap: 1, justifyContent: 'center' }}
          >
            {ORIGINS.map((o) => (
              <Chip
                key={o}
                label={o === 'all' ? '🌏 Tất cả' : `${ORIGIN_FLAGS[o]} ${o}`}
                onClick={() => setOrigin(o)}
                sx={{
                  cursor: 'pointer',
                  height: 36,
                  fontSize: 13,
                  bgcolor: origin === o ? '#BF360C' : 'transparent',
                  color: origin === o ? 'white' : 'text.secondary',
                  border: `1.5px solid ${origin === o ? '#BF360C' : SPA2_CREAM_DARK}`,
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={3}>
            {filtered.map((t) => (
              <Grid key={t.name} xs={12} sm={6} md={4}>
                <SoftCard>
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        bgcolor: '#FBE9E7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Iconify icon={t.icon} width={26} sx={{ color: '#BF360C' }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, mb: 0.25 }}>
                        {t.name}
                      </Typography>
                      <Stack direction="row" spacing={0.75}>
                        <Chip
                          label={`${ORIGIN_FLAGS[t.origin]} ${t.origin}`}
                          size="small"
                          sx={{ bgcolor: '#FBE9E7', color: '#BF360C', fontSize: 11 }}
                        />
                        <Chip
                          label={t.duration}
                          size="small"
                          sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                  <Typography
                    sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                  >
                    {t.desc}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 700, color: '#BF360C', fontSize: 16 }}>
                      {formatVND(t.price)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa2.booking}
                      size="small"
                      sx={{
                        borderRadius: 99,
                        bgcolor: '#BF360C',
                        color: 'white',
                        px: 2,
                        fontSize: 12,
                        '&:hover': { bgcolor: '#B71C1C' },
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

      {/* Philosophy */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#FBE9E7' }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Triết lý" title="Chúng tôi tin vào gì?" />
          <Grid container spacing={3}>
            {[
              {
                q: 'Cơ thể tự chữa lành',
                a: 'Mọi liệu pháp truyền thống đều hướng đến việc kích hoạt khả năng tự phục hồi bẩm sinh của cơ thể, không chỉ điều trị triệu chứng.',
                icon: '♾️',
              },
              {
                q: 'Cân bằng tổng thể',
                a: 'Sức khỏe không chỉ là thiếu bệnh tật — mà là sự cân bằng hoàn hảo giữa thể xác, tâm trí và năng lượng sống.',
                icon: '⚖️',
              },
              {
                q: 'Thiên nhiên là thầy thuốc',
                a: 'Hơn 5000 năm kinh nghiệm của y học phương Đông chứng minh: thiên nhiên cung cấp tất cả những gì cơ thể cần để khỏe mạnh.',
                icon: '🌿',
              },
            ].map((p) => (
              <Grid key={p.q} xs={12} md={4}>
                <SoftCard sx={{ textAlign: 'center', bgcolor: 'common.white' }}>
                  <Typography sx={{ fontSize: 44, lineHeight: 1, mb: 1.5 }}>{p.icon}</Typography>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1 }}>{p.q}</Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {p.a}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <GradientCta
        title="Khám phá trí tuệ chữa lành phương Đông"
        sub="Tư vấn để chọn liệu pháp phù hợp nhất với thể trạng của bạn."
        btnLabel="Đặt lịch tư vấn"
        href={paths.spa2.booking}
        color="#BF360C"
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 7. SPA HOTEL / STAYCATION
// ══════════════════════════════════════════════════════════

const STAYCATION_PACKAGES = [
  {
    name: 'Spa Escape Weeknight',
    nights: 1,
    price: 3900000,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
    hotel: 'Khách sạn đối tác 4★',
    spa: '2 giờ spa trọn gói',
    includes: [
      'Phòng Superior 1 đêm',
      'Bữa sáng 2 người',
      'Facial Organic 60 phút',
      'Massage thư giãn 60 phút',
      'Minibar không cồn',
    ],
    badge: '',
  },
  {
    name: 'Weekend Wellness Retreat',
    nights: 2,
    price: 7900000,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    hotel: 'Khách sạn đối tác 5★',
    spa: '5 giờ spa cao cấp',
    includes: [
      'Phòng Deluxe 2 đêm',
      'Bữa sáng & tối 2 người',
      'Body Ritual 90 phút',
      'Anti-Aging Facial 75 phút',
      'Yoga buổi sáng',
      'Bồn tắm hoa',
      'Xe đưa đón',
    ],
    badge: 'Best Value',
  },
  {
    name: 'Luxury Detox Journey 3D2N',
    nights: 3,
    price: 14900000,
    image: 'https://images.unsplash.com/photo-1531112068337-3cd6d0d2b56b?w=900&q=80',
    hotel: 'Resort 5★ Nha Trang',
    spa: 'Unlimited spa',
    includes: [
      'Suite 3 đêm view biển',
      'All meals healthy menu',
      'Spa không giới hạn',
      'Detox program',
      'Personal trainer',
      'Yoga & thiền 2x/ngày',
      'Tư vấn dinh dưỡng',
      'Spa photo session',
    ],
    badge: 'Premium',
  },
];

export function Spa2SpaHotelPageView() {
  const [selected, setSelected] = useState<(typeof STAYCATION_PACKAGES)[0] | null>(null);

  const HOTEL_PARTNERS = [
    { name: 'InterContinental Saigon', stars: 5, location: 'TP.HCM', logo: 'IC' },
    { name: 'Sofitel Legend', stars: 5, location: 'Hà Nội', logo: 'SL' },
    { name: 'Vinpearl Resort', stars: 5, location: 'Nha Trang', logo: 'VP' },
    { name: 'Hyatt Regency', stars: 5, location: 'Đà Nẵng', logo: 'HY' },
    { name: 'Melia Ho Chi Minh', stars: 4, location: 'TP.HCM', logo: 'ME' },
    { name: 'Lotte Hotel', stars: 5, location: 'Hà Nội', logo: 'LT' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
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
            backgroundImage: `url(${SPA2_PAGE_IMAGES.branches})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
              SPA HOTEL & STAYCATION
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 720 }}
            >
              Kỳ nghỉ dưỡng spa ngay tại thành phố của bạn
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 17, maxWidth: 540 }}>
              Kết hợp lưu trú khách sạn 4–5 sao với liệu trình spa trọn gói — không cần ra nước
              ngoài.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Chip
                label="4★ & 5★ Hotels"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
              />
              <Chip
                label="Gói từ 2 người"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
              />
              <Chip
                label="Spa không giới hạn"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Packages */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Gói staycation" title="Chọn kỳ nghỉ dưỡng của bạn" />
          <Grid container spacing={4}>
            {STAYCATION_PACKAGES.map((pkg) => (
              <Grid key={pkg.name} xs={12} md={4}>
                <SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        height: 220,
                        backgroundImage: `url(${pkg.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      }}
                    />
                    {pkg.badge && (
                      <Chip
                        label={pkg.badge}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          fontWeight: 700,
                        }}
                      />
                    )}
                    <Box sx={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 16 }}>
                        {pkg.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip
                          label={`${pkg.nights} đêm`}
                          size="small"
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11 }}
                        />
                        <Chip
                          label={pkg.hotel}
                          size="small"
                          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11 }}
                        />
                      </Stack>
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Stack spacing={0.75} sx={{ mb: 2 }}>
                      {pkg.includes.map((inc) => (
                        <Stack key={inc} direction="row" spacing={1.5} alignItems="center">
                          <Iconify
                            icon="solar:check-circle-bold"
                            width={14}
                            sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                          />
                          <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                            {inc}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Divider sx={{ mb: 2 }} />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                          Giá 2 người
                        </Typography>
                        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 18 }}>
                          {formatVND(pkg.price)}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() => setSelected(pkg)}
                        sx={{
                          borderRadius: 99,
                          px: 3,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Đặt ngay
                      </Button>
                    </Stack>
                  </Box>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Hotel partners */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Đối tác" title="Khách sạn đối tác" />
          <Grid container spacing={2} justifyContent="center">
            {HOTEL_PARTNERS.map((h) => (
              <Grid key={h.name} xs={6} sm={4} md={2}>
                <SoftCard sx={{ textAlign: 'center', bgcolor: 'common.white', py: 3 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      bgcolor: SPA2_INK,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      mx: 'auto',
                      mb: 1.5,
                    }}
                  >
                    {h.logo}
                  </Box>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK, lineHeight: 1.3 }}
                  >
                    {h.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                    {'⭐'.repeat(h.stars)} · {h.location}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <GradientCta
        title="Không cần đặt vé máy bay để nghỉ dưỡng 5★"
        sub="Kỳ nghỉ spa sang trọng ngay tại thành phố của bạn."
        btnLabel="Xem tất cả gói"
        href={paths.spa2.booking}
      />

      {/* Booking dialog */}
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
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
              Đặt: {selected.name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
              {selected.hotel} · {selected.nights} đêm · {formatVND(selected.price)}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <TextField fullWidth size="small" label="Họ và tên" />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth size="small" label="Số điện thoại" />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="Ngày nhận phòng"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth size="small" label="Số người lớn" type="number" />
              </Grid>
              <Grid xs={12}>
                <TextField fullWidth size="small" multiline rows={2} label="Yêu cầu đặc biệt" />
              </Grid>
            </Grid>
            <Button
              fullWidth
              onClick={() => setSelected(null)}
              sx={{
                mt: 2,
                borderRadius: 99,
                py: 1.4,
                bgcolor: SPA2_TEAL,
                color: 'white',
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
              }}
            >
              Xác nhận đặt gói staycation
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 8. COMMUNITY & LIFESTYLE
// ══════════════════════════════════════════════════════════

const COMMUNITY_POSTS = [
  {
    id: 1,
    author: 'Minh Anh',
    avatar: 'https://i.pravatar.cc/60?img=11',
    role: 'Gold Member',
    time: '2 giờ trước',
    content:
      'Vừa hoàn thành liệu trình Anti-Aging 10 buổi — da mình thay đổi hoàn toàn! Nếp nhăn mờ đi 70%, da căng và sáng hơn hẳn. Cảm ơn team Nature Spa ❤️',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    likes: 48,
    comments: 12,
    tags: ['AntiAging', 'Kết quả thực tế'],
  },
  {
    id: 2,
    author: 'Thu Hà',
    avatar: 'https://i.pravatar.cc/60?img=16',
    role: 'Platinum Member',
    time: '5 giờ trước',
    content:
      'Tip nhỏ cho chị em: uống đủ 2.5L nước/ngày và ngủ trước 11pm — kết hợp cùng facial định kỳ, da của mình không cần makeup vẫn đẹp tự nhiên 🌿',
    likes: 89,
    comments: 23,
    tags: ['Skincare Tips', 'Lối sống lành mạnh'],
  },
  {
    id: 3,
    author: 'Hoàng Nam',
    avatar: 'https://i.pravatar.cc/60?img=23',
    role: 'Silver Member',
    time: '1 ngày trước',
    content:
      "Lần đầu thử Men's Spa — ban đầu hơi ngại nhưng thật sự rất đáng! Massage phục hồi sau gym xịn hơn foam roller rất nhiều lần. Anh em cứ thử đi, không hối hận đâu 💪",
    likes: 67,
    comments: 18,
    tags: ['MenSpa', 'Recovery'],
  },
];

const CHALLENGES = [
  {
    name: 'Thử thách 7 ngày uống nước',
    participants: 1243,
    icon: '💧',
    color: '#0D47A1',
    progress: 65,
  },
  { name: 'Thiền 10 phút mỗi sáng', participants: 876, icon: '🧘', color: SPA2_TEAL, progress: 43 },
  { name: 'Không đường 14 ngày', participants: 534, icon: '🥗', color: '#2E7D32', progress: 28 },
  {
    name: 'Skincare tối giản 30 ngày',
    participants: 1891,
    icon: '✨',
    color: '#C2185B',
    progress: 80,
  },
];

export function Spa2CommunityPageView() {
  const [liked, setLiked] = useState<number[]>([]);
  const [joined, setJoined] = useState<string[]>([]);
  const [toast, setToast] = useState('');
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);

  const toggleLike = (id: number) =>
    setLiked((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));
  const toggleChallenge = (name: string) => {
    setJoined((prev) => (prev.includes(name) ? prev.filter((j) => j !== name) : [...prev, name]));
    setToast(joined.includes(name) ? `Đã rời thử thách: ${name}` : `Đã tham gia: ${name}!`);
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.blog}
        eyebrow="CỘNG ĐỒNG"
        title="Nature Spa Community"
        subtitle="Chia sẻ hành trình chăm sóc sức khỏe, tham gia thử thách và kết nối với những người cùng chí hướng."
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={4}>
            {/* Feed */}
            <Grid xs={12} md={8}>
              {/* Post composer */}
              <SoftCard sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar sx={{ width: 40, height: 40, bgcolor: SPA2_TEAL, flexShrink: 0 }}>
                    B
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={posting ? 3 : 1}
                      placeholder="Chia sẻ trải nghiệm spa của bạn..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      onFocus={() => setPosting(true)}
                      sx={{
                        mb: posting ? 1.5 : 0,
                        '& .MuiOutlinedInput-root': { borderRadius: 3 },
                      }}
                    />
                    {posting && (
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label="📷 Ảnh"
                            size="small"
                            sx={{ cursor: 'pointer', bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                          />
                          <Chip
                            label="🏷️ Tag"
                            size="small"
                            sx={{ cursor: 'pointer', bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                          />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            onClick={() => {
                              setPosting(false);
                              setNewPost('');
                            }}
                            sx={{ color: 'text.secondary', borderRadius: 99 }}
                          >
                            Hủy
                          </Button>
                          <Button
                            size="small"
                            disabled={!newPost.trim()}
                            onClick={() => {
                              setToast('Đã đăng bài!');
                              setPosting(false);
                              setNewPost('');
                            }}
                            sx={{
                              borderRadius: 99,
                              bgcolor: SPA2_TEAL,
                              color: 'white',
                              px: 2,
                              '&:hover': { bgcolor: SPA2_TEAL_DARK },
                              '&.Mui-disabled': { bgcolor: SPA2_CREAM_DARK },
                            }}
                          >
                            Đăng bài
                          </Button>
                        </Stack>
                      </Stack>
                    )}
                  </Box>
                </Stack>
              </SoftCard>

              {/* Posts */}
              <Stack spacing={3}>
                {COMMUNITY_POSTS.map((post) => (
                  <SoftCard key={post.id}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Avatar src={post.avatar} sx={{ width: 44, height: 44 }} />
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                            {post.author}
                          </Typography>
                          <Chip
                            label={post.role}
                            size="small"
                            sx={{
                              bgcolor: SPA2_CREAM,
                              color: SPA2_TEAL_DARK,
                              fontSize: 10,
                              height: 18,
                            }}
                          />
                        </Stack>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                          {post.time}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography sx={{ color: SPA2_INK, lineHeight: 1.75, mb: 2, fontSize: 14 }}>
                      {post.content}
                    </Typography>
                    {post.image && (
                      <Box
                        sx={{
                          height: 200,
                          borderRadius: 3,
                          backgroundImage: `url(${post.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          mb: 2,
                        }}
                      />
                    )}
                    <Stack
                      direction="row"
                      spacing={0.75}
                      sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}
                    >
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={`#${tag}`}
                          size="small"
                          sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
                        />
                      ))}
                    </Stack>
                    <Divider sx={{ mb: 1.5 }} />
                    <Stack direction="row" spacing={2}>
                      <Button
                        size="small"
                        onClick={() => toggleLike(post.id)}
                        startIcon={
                          <Iconify
                            icon={liked.includes(post.id) ? 'solar:like-bold' : 'solar:like-linear'}
                            width={16}
                          />
                        }
                        sx={{
                          borderRadius: 99,
                          color: liked.includes(post.id) ? SPA2_TEAL : 'text.secondary',
                          bgcolor: liked.includes(post.id) ? SPA2_CREAM : 'transparent',
                        }}
                      >
                        {post.likes + (liked.includes(post.id) ? 1 : 0)}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Iconify icon="solar:chat-round-dots-linear" width={16} />}
                        sx={{ borderRadius: 99, color: 'text.secondary' }}
                      >
                        {post.comments}
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Iconify icon="solar:share-linear" width={16} />}
                        sx={{ borderRadius: 99, color: 'text.secondary' }}
                      >
                        Chia sẻ
                      </Button>
                    </Stack>
                  </SoftCard>
                ))}
              </Stack>
            </Grid>

            {/* Sidebar */}
            <Grid xs={12} md={4}>
              <Stack spacing={3}>
                {/* Challenges */}
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
                    🏆 Thử thách cộng đồng
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 2 }}>
                    Tháng 7/2026
                  </Typography>
                  <Stack spacing={2}>
                    {CHALLENGES.map((c) => (
                      <Box key={c.name}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 0.75 }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ fontSize: 18 }}>{c.icon}</Typography>
                            <Box>
                              <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                                {c.name}
                              </Typography>
                              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                                {c.participants.toLocaleString()} người tham gia
                              </Typography>
                            </Box>
                          </Stack>
                          <Button
                            size="small"
                            onClick={() => toggleChallenge(c.name)}
                            sx={{
                              borderRadius: 99,
                              px: 1.5,
                              fontSize: 11,
                              bgcolor: joined.includes(c.name) ? c.color : 'transparent',
                              color: joined.includes(c.name) ? 'white' : c.color,
                              border: `1px solid ${c.color}`,
                              '&:hover': { bgcolor: c.color, color: 'white' },
                            }}
                          >
                            {joined.includes(c.name) ? '✓ Đã tham gia' : 'Tham gia'}
                          </Button>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={c.progress}
                          sx={{
                            height: 5,
                            borderRadius: 99,
                            bgcolor: SPA2_CREAM_DARK,
                            '& .MuiLinearProgress-bar': { bgcolor: c.color, borderRadius: 99 },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </SoftCard>

                {/* Top members */}
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    👑 Top thành viên tháng
                  </Typography>
                  <Stack spacing={2}>
                    {spa2Feedbacks.slice(0, 4).map((f, i) => (
                      <Stack key={f.name} direction="row" spacing={1.5} alignItems="center">
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: i === 0 ? '#EF9F27' : 'text.disabled',
                            minWidth: 20,
                          }}
                        >
                          {i + 1}
                        </Typography>
                        <Avatar src={f.avatar} sx={{ width: 34, height: 34 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                            {f.name}
                          </Typography>
                          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                            {f.role}
                          </Typography>
                        </Box>
                        <Rating
                          value={f.rating}
                          readOnly
                          size="small"
                          sx={{ fontSize: 12, '& .MuiRating-icon': { color: '#EF9F27' } }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </SoftCard>

                {/* Quick links */}
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    🌿 Khám phá thêm
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      {
                        icon: 'solar:calendar-bold',
                        text: 'Đặt lịch spa',
                        href: paths.spa2.booking,
                      },
                      {
                        icon: 'solar:leaf-bold',
                        text: 'Dịch vụ của chúng tôi',
                        href: paths.spa2.services,
                      },
                      {
                        icon: 'solar:gift-bold',
                        text: 'Ưu đãi tháng này',
                        href: paths.spa2.offers,
                      },
                      { icon: 'solar:star-bold', text: 'Viết đánh giá', href: paths.spa2.feedback },
                    ].map((l) => (
                      <Button
                        key={l.text}
                        component={RouterLink}
                        href={l.href}
                        fullWidth
                        startIcon={<Iconify icon={l.icon} width={16} sx={{ color: SPA2_TEAL }} />}
                        sx={{
                          justifyContent: 'flex-start',
                          py: 1.2,
                          borderRadius: 2.5,
                          color: SPA2_INK,
                          bgcolor: 'transparent',
                          '&:hover': { bgcolor: SPA2_CREAM },
                        }}
                      >
                        {l.text}
                      </Button>
                    ))}
                  </Stack>
                </SoftCard>
              </Stack>
            </Grid>
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
