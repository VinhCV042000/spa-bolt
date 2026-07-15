import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormControlLabel from '@mui/material/FormControlLabel';

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
  spa2Treatments,
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
  cta,
}: {
  img: string;
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
// 1. FULL PRICE LIST (BẢNG GIÁ ĐẦY ĐỦ)
// ══════════════════════════════════════════════════════════

export function Spa2PriceListPageView() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');

  const allItems = useMemo(
    () => [
      ...spa2Services.map((s: any) => ({
        name: s.name,
        price: s.price,
        duration: s.duration,
        category: 'Dịch vụ lẻ',
        icon: s.icon,
      })),
      ...spa2Treatments.map((t: any) => ({
        name: t.name,
        price: t.price,
        duration: `${t.sessions} buổi`,
        category: 'Liệu trình',
        icon: 'solar:stars-bold-duotone',
      })),
    ],
    []
  );

  const filtered = useMemo(() => {
    let list = allItems.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allItems, search, sort]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof filtered> = {};
    filtered.forEach((item) => {
      if (!g[item.category]) g[item.category] = [];
      g[item.category].push(item);
    });
    return g;
  }, [filtered]);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.services}
        eyebrow="BẢNG GIÁ"
        title="Bảng giá dịch vụ đầy đủ"
        subtitle="Minh bạch từng mức giá — không phụ phí ẩn, áp dụng đồng nhất tại tất cả chi nhánh."
        cta={
          <Button
            startIcon={<Iconify icon="solar:printer-bold" />}
            onClick={() => window.print()}
            sx={{
              borderRadius: 99,
              px: 3,
              bgcolor: SPA2_TEAL,
              color: 'white',
              '&:hover': { bgcolor: SPA2_TEAL_DARK },
            }}
          >
            In bảng giá
          </Button>
        }
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {/* Search + sort */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Tìm dịch vụ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              sx={{ minWidth: { sm: 200 } }}
              label="Sắp xếp"
            >
              <MenuItem value="name">Tên A–Z</MenuItem>
              <MenuItem value="price-asc">Giá tăng dần</MenuItem>
              <MenuItem value="price-desc">Giá giảm dần</MenuItem>
            </TextField>
          </Stack>

          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 3 }}>
            {filtered.length} dịch vụ được tìm thấy
          </Typography>

          {Object.entries(grouped).map(([category, items]) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, mb: 1.5 }}>
                {category}
              </Typography>
              <TableContainer
                component={Card}
                sx={{ borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
              >
                <Table size="small">
                  <TableBody>
                    {items.map((item, i) => (
                      <TableRow
                        key={item.name}
                        sx={{
                          '&:last-child td': { border: 0 },
                          '&:hover td': { bgcolor: SPA2_CREAM },
                        }}
                      >
                        <TableCell sx={{ width: 36, pl: 2 }}>
                          <Iconify icon={item.icon} width={18} sx={{ color: SPA2_TEAL }} />
                        </TableCell>
                        <TableCell sx={{ fontSize: 14, color: SPA2_INK, fontWeight: 500 }}>
                          {item.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {item.duration}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 14, pr: 2 }}
                        >
                          {formatVND(item.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}

          <Alert severity="info" sx={{ borderRadius: 3, mt: 2 }}>
            Giá đã bao gồm VAT. Chưa bao gồm phụ phí giờ vàng (nếu có) và phí spa tại nhà. Giá có
            thể thay đổi theo chương trình khuyến mãi.
          </Alert>
        </Container>
      </Box>

      <GradientCta
        title="Sẵn sàng trải nghiệm?"
        sub="Đặt lịch ngay để nhận ưu đãi 10% cho lần đầu tiên."
        btnLabel="Đặt lịch ngay"
        href={paths.spa2.booking}
      />
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 2. WAITLIST (DANH SÁCH CHỜ)
// ══════════════════════════════════════════════════════════

const FULL_SLOTS = [
  {
    service: 'Facial Organic',
    branch: 'Quận 1, TP.HCM',
    date: '15/07/2026',
    time: '14:00',
    waiting: 4,
  },
  {
    service: 'Massage Thảo Dược',
    branch: 'Hồ Tây, Hà Nội',
    date: '16/07/2026',
    time: '10:00',
    waiting: 2,
  },
  { service: 'Spa Đôi', branch: 'Quận 1, TP.HCM', date: '18/07/2026', time: '18:00', waiting: 7 },
  { service: 'Detox 3 ngày', branch: 'Nha Trang', date: '20/07/2026', time: 'Cả ngày', waiting: 3 },
];

export function Spa2WaitlistPageView() {
  const [joined, setJoined] = useState<number[]>([]);
  const [notifyDialog, setNotifyDialog] = useState<(typeof FULL_SLOTS)[0] | null>(null);
  const [toast, setToast] = useState('');
  const [flexible, setFlexible] = useState(false);

  const join = (idx: number) => {
    setJoined((prev) => [...prev, idx]);
    setNotifyDialog(null);
    setToast('Đã thêm vào danh sách chờ! Chúng tôi sẽ báo ngay khi có chỗ trống.');
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.booking}
        eyebrow="DANH SÁCH CHỜ"
        title="Khung giờ yêu thích đã kín? Đừng lo!"
        subtitle="Tham gia danh sách chờ — chúng tôi tự động thông báo ngay khi có người hủy lịch."
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Alert
            severity="info"
            icon={<Iconify icon="solar:bell-bold" />}
            sx={{ mb: 4, borderRadius: 3 }}
          >
            Khách trong danh sách chờ được ưu tiên nhận thông báo qua SMS/Zalo trong vòng 5 phút khi
            có slot trống — trước khi mở đặt công khai.
          </Alert>

          <SectionTitle
            eyebrow="Khung giờ đầy"
            title="Các khung giờ đang có người chờ"
            align="left"
          />

          <Stack spacing={2}>
            {FULL_SLOTS.map((slot, idx) => {
              const isJoined = joined.includes(idx);
              return (
                <Card
                  key={idx}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: `1px solid ${isJoined ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                    bgcolor: isJoined ? `${SPA2_TEAL}08` : 'common.white',
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
                      <Iconify
                        icon="solar:calendar-mark-bold"
                        width={24}
                        sx={{ color: SPA2_TEAL }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
                        {slot.service}
                      </Typography>
                      <Stack direction="row" spacing={1.5} flexWrap="wrap">
                        {[
                          { icon: 'solar:map-point-bold', text: slot.branch },
                          { icon: 'solar:calendar-bold', text: `${slot.date} · ${slot.time}` },
                        ].map((i) => (
                          <Stack key={i.text} direction="row" spacing={0.5} alignItems="center">
                            <Iconify icon={i.icon} width={13} sx={{ color: SPA2_TEAL }} />
                            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                              {i.text}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
                    <Chip
                      label={`${slot.waiting} người đang chờ`}
                      size="small"
                      sx={{ bgcolor: '#FEF3E2', color: '#854F0B' }}
                    />
                    <Button
                      disabled={isJoined}
                      onClick={() => setNotifyDialog(slot)}
                      sx={{
                        borderRadius: 99,
                        px: 2.5,
                        bgcolor: isJoined ? '#E8F5E9' : SPA2_TEAL,
                        color: isJoined ? '#2E7D32' : 'white',
                        flexShrink: 0,
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        '&.Mui-disabled': { bgcolor: '#E8F5E9', color: '#2E7D32' },
                      }}
                    >
                      {isJoined ? '✓ Đã tham gia' : 'Tham gia chờ'}
                    </Button>
                  </Stack>
                </Card>
              );
            })}
          </Stack>

          {/* Flexible option */}
          <SoftCard sx={{ mt: 4 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Iconify
                icon="solar:magic-stick-3-bold-duotone"
                width={32}
                sx={{ color: SPA2_TEAL, flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
                  Không tìm thấy khung giờ mong muốn?
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: 'text.secondary', mb: 2 }}>
                  Đăng ký linh hoạt — cho chúng tôi biết dịch vụ và khoảng thời gian bạn muốn, hệ
                  thống sẽ tự tìm slot phù hợp nhất.
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={flexible}
                      onChange={(e) => setFlexible(e.target.checked)}
                      sx={{ color: SPA2_TEAL, '&.Mui-checked': { color: SPA2_TEAL } }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 13 }}>
                      Tôi linh hoạt về ngày giờ trong tuần này
                    </Typography>
                  }
                />
                {flexible && (
                  <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                    <TextField fullWidth size="small" select label="Dịch vụ mong muốn">
                      {['Facial Organic', 'Massage Thảo Dược', 'Spa Đôi', 'Detox 3 ngày'].map(
                        (s) => (
                          <MenuItem key={s} value={s}>
                            {s}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                    <TextField fullWidth size="small" label="Số điện thoại" />
                    <Button
                      onClick={() => setToast('Đã đăng ký chờ linh hoạt!')}
                      sx={{
                        borderRadius: 99,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        alignSelf: 'flex-start',
                        px: 3,
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      Đăng ký
                    </Button>
                  </Stack>
                )}
              </Box>
            </Stack>
          </SoftCard>
        </Container>
      </Box>

      <Dialog
        open={!!notifyDialog}
        onClose={() => setNotifyDialog(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        {notifyDialog && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setNotifyDialog(null)}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
              Tham gia danh sách chờ
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
              {notifyDialog.service} · {notifyDialog.date} · {notifyDialog.time}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <TextField fullWidth size="small" label="Họ và tên" />
              <TextField fullWidth size="small" label="Số điện thoại (nhận SMS)" />
              <Button
                fullWidth
                onClick={() => join(FULL_SLOTS.indexOf(notifyDialog))}
                sx={{
                  borderRadius: 99,
                  py: 1.3,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                Xác nhận tham gia
              </Button>
            </Stack>
          </DialogContent>
        )}
      </Dialog>

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

// ══════════════════════════════════════════════════════════
// 3. VOUCHER / GIFT CARD BALANCE CHECK
// ══════════════════════════════════════════════════════════

export function Spa2VoucherCheckPageView() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<null | {
    valid: boolean;
    balance?: number;
    expiry?: string;
    type?: string;
  }>(null);
  const [checking, setChecking] = useState(false);

  const MOCK_VOUCHERS: Record<string, { balance: number; expiry: string; type: string }> = {
    'NSP-A7K92': { balance: 500000, expiry: '31/12/2026', type: 'Thẻ quà tặng' },
    NEW30: { balance: 0, expiry: '31/12/2026', type: 'Mã giảm giá 30%' },
    GIFT500K: { balance: 500000, expiry: '15/08/2026', type: 'Thẻ quà tặng' },
  };

  const checkVoucher = () => {
    if (!code.trim()) return;
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      const found = MOCK_VOUCHERS[code.toUpperCase().trim()];
      setResult(found ? { valid: true, ...found } : { valid: false });
      setChecking(false);
    }, 1200);
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.offers}
        eyebrow="KIỂM TRA VOUCHER"
        title="Tra cứu số dư thẻ quà tặng & voucher"
        subtitle="Nhập mã để kiểm tra số dư, thời hạn và tình trạng hiệu lực của voucher."
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm">
          <SoftCard>
            <Stack spacing={2.5}>
              <Box sx={{ textAlign: 'center' }}>
                <Iconify
                  icon="solar:card-search-bold-duotone"
                  width={44}
                  sx={{ color: SPA2_TEAL, mb: 1 }}
                />
                <Typography variant="h6" sx={{ color: SPA2_INK }}>
                  Nhập mã voucher hoặc thẻ quà tặng
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.5}>
                <TextField
                  fullWidth
                  placeholder="Ví dụ: NSP-A7K92"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkVoucher()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:ticket-bold" sx={{ color: SPA2_TEAL }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  onClick={checkVoucher}
                  disabled={checking}
                  sx={{
                    borderRadius: 2.5,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    px: 3,
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    '&.Mui-disabled': { bgcolor: SPA2_CREAM_DARK },
                  }}
                >
                  {checking ? 'Đang kiểm tra...' : 'Kiểm tra'}
                </Button>
              </Stack>

              {result && result.valid && (
                <Card
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: '#E8F5E9',
                    border: '1.5px solid #A5D6A7',
                    boxShadow: 'none',
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                    <Iconify icon="solar:check-circle-bold" width={22} sx={{ color: '#2E7D32' }} />
                    <Typography sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      Voucher hợp lệ
                    </Typography>
                  </Stack>
                  <Stack spacing={0.75}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Loại</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK }}>
                        {result.type}
                      </Typography>
                    </Stack>
                    {result.balance! > 0 && (
                      <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          Số dư
                        </Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#2E7D32' }}>
                          {formatVND(result.balance!)}
                        </Typography>
                      </Stack>
                    )}
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        Hạn sử dụng
                      </Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK }}>
                        {result.expiry}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={paths.spa2.booking}
                    sx={{
                      mt: 2,
                      borderRadius: 99,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    Dùng ngay khi đặt lịch
                  </Button>
                </Card>
              )}

              {result && !result.valid && (
                <Alert severity="error" sx={{ borderRadius: 2.5 }}>
                  Không tìm thấy mã voucher này. Vui lòng kiểm tra lại chính tả hoặc liên hệ hotline
                  để được hỗ trợ.
                </Alert>
              )}
            </Stack>
          </SoftCard>

          {/* FAQ */}
          <Box sx={{ mt: 5 }}>
            <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 2, textAlign: 'center' }}>
              Câu hỏi thường gặp
            </Typography>
            {[
              {
                q: 'Tôi tìm mã voucher ở đâu?',
                a: 'Mã voucher được gửi qua email/SMS khi bạn nhận thẻ quà tặng, hoặc in trên phiếu voucher vật lý.',
              },
              {
                q: 'Voucher hết hạn có gia hạn được không?',
                a: 'Voucher hết hạn không tự động gia hạn. Vui lòng liên hệ hotline trong vòng 30 ngày sau hết hạn để được xem xét từng trường hợp.',
              },
              {
                q: 'Có thể dùng nhiều voucher cùng lúc không?',
                a: 'Có thể kết hợp tối đa 2 voucher cho 1 hóa đơn, miễn tổng giá trị không vượt quá 80% hóa đơn.',
              },
            ].map((f, i) => (
              <Accordion
                key={f.q}
                sx={{
                  mb: 1,
                  borderRadius: '10px !important',
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: SPA2_INK }}>
                    {f.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {f.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

// ══════════════════════════════════════════════════════════
// 4. ACCESSIBILITY & SPECIAL NEEDS
// ══════════════════════════════════════════════════════════

const ACCESSIBILITY_FEATURES = [
  {
    icon: 'solar:wheelchair-bold-duotone',
    title: 'Lối đi cho xe lăn',
    desc: 'Toàn bộ 4 chi nhánh có lối vào không bậc thềm, thang máy và phòng vệ sinh đạt chuẩn tiếp cận.',
  },
  {
    icon: 'solar:hearing-bold-duotone',
    title: 'Hỗ trợ khiếm thính',
    desc: 'KTV được đào tạo giao tiếp bằng chữ viết và ngôn ngữ ký hiệu cơ bản khi cần thiết.',
  },
  {
    icon: 'solar:eye-closed-bold-duotone',
    title: 'Hỗ trợ khiếm thị',
    desc: 'Nhân viên hỗ trợ dẫn đường tận nơi, mô tả chi tiết quy trình trước khi thực hiện.',
  },
  {
    icon: 'solar:health-bold-duotone',
    title: 'Điều chỉnh cho bệnh mãn tính',
    desc: 'Tham vấn với KTV về tiểu đường, cao huyết áp, hoặc các tình trạng sức khỏe đặc biệt trước liệu trình.',
  },
  {
    icon: 'solar:accessibility-bold-duotone',
    title: 'Giường & ghế điều chỉnh',
    desc: 'Giường massage có thể điều chỉnh độ cao, ghế hỗ trợ cho khách hạn chế vận động.',
  },
  {
    icon: 'solar:user-heart-bold-duotone',
    title: 'Người đồng hành miễn phí',
    desc: 'Người chăm sóc/phiên dịch đi cùng được miễn phí vào khu vực chờ và hỗ trợ trong phòng nếu cần.',
  },
];

const SPECIAL_NEEDS_CATEGORIES = [
  {
    name: 'Người cao tuổi',
    icon: 'solar:user-bold',
    note: 'Áp lực massage nhẹ nhàng hơn, thời gian nghỉ giữa các bước dài hơn.',
  },
  {
    name: 'Khuyết tật vận động',
    icon: 'solar:wheelchair-bold',
    note: 'Hỗ trợ di chuyển, giường/ghế điều chỉnh, không gian đủ rộng.',
  },
  {
    name: 'Bệnh nhân ung thư (đang/đã điều trị)',
    icon: 'solar:health-bold',
    note: 'Liệu trình Oncology-safe, tránh vùng nhạy cảm, tham vấn bác sĩ điều trị.',
  },
  {
    name: 'Rối loạn cảm giác (tự kỷ, ASD)',
    icon: 'solar:magic-stick-bold',
    note: 'Không gian yên tĩnh riêng, giảm ánh sáng/mùi hương mạnh, thời gian linh hoạt.',
  },
];

export function Spa2AccessibilityPageView() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <PageHero
        img={SPA2_PAGE_IMAGES.about}
        eyebrow="TIẾP CẬN CHO MỌI NGƯỜI"
        title="Chăm sóc sức khỏe không rào cản"
        subtitle="Nature Spa cam kết mang đến trải nghiệm thư giãn trọn vẹn cho mọi khách hàng, không phân biệt khả năng."
      />

      {/* Features */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <SectionTitle eyebrow="Cơ sở vật chất" title="Những gì chúng tôi hỗ trợ" />
          <Grid container spacing={3}>
            {ACCESSIBILITY_FEATURES.map((f) => (
              <Grid key={f.title} xs={12} sm={6} md={4}>
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
                    <Iconify icon={f.icon} width={26} sx={{ color: SPA2_TEAL }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {f.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {f.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Special needs categories */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Đối tượng" title="Chúng tôi hỗ trợ đặc biệt cho" />
          <Grid container spacing={2.5}>
            {SPECIAL_NEEDS_CATEGORIES.map((c) => (
              <Grid key={c.name} xs={12} sm={6}>
                <SoftCard sx={{ bgcolor: 'common.white' }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
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
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
                        {c.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.65 }}>
                        {c.note}
                      </Typography>
                    </Box>
                  </Stack>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Branch accessibility check */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Chi nhánh" title="Tình trạng tiếp cận từng chi nhánh" />
          <Grid container spacing={2}>
            {spa2Branches.map((b: any) => (
              <Grid key={b.name} xs={12} sm={6}>
                <Card
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: 'none',
                  }}
                >
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
                    {b.name}
                  </Typography>
                  <Stack spacing={0.75}>
                    {[
                      'Lối vào không bậc thềm',
                      'Phòng vệ sinh đạt chuẩn',
                      'Thang máy / lối đi rộng',
                    ].map((f) => (
                      <Stack key={f} direction="row" spacing={1} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          width={14}
                          sx={{ color: '#2E7D32' }}
                        />
                        <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                          {f}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact form */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="sm">
          <SoftCard sx={{ bgcolor: 'common.white' }}>
            {!submitted ? (
              <Stack spacing={2.5}>
                <Box sx={{ textAlign: 'center' }}>
                  <Iconify
                    icon="solar:chat-round-dots-bold-duotone"
                    width={40}
                    sx={{ color: SPA2_TEAL, mb: 1 }}
                  />
                  <Typography variant="h6" sx={{ color: SPA2_INK }}>
                    Cho chúng tôi biết nhu cầu của bạn
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.5 }}>
                    Đội ngũ sẽ chuẩn bị chu đáo trước khi bạn đến
                  </Typography>
                </Box>
                <TextField fullWidth size="small" label="Họ và tên" />
                <TextField fullWidth size="small" label="Số điện thoại" />
                <TextField fullWidth size="small" select label="Nhu cầu hỗ trợ">
                  {SPECIAL_NEEDS_CATEGORIES.map((c) => (
                    <MenuItem key={c.name} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                  <MenuItem value="other">Khác</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  label="Mô tả chi tiết nhu cầu của bạn"
                  placeholder="Ví dụ: cần chỗ đậu xe lăn gần cửa, cần thời gian nghỉ giữa liệu trình..."
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
                  Gửi yêu cầu hỗ trợ
                </Button>
              </Stack>
            ) : (
              <Stack alignItems="center" spacing={2.5} sx={{ py: 4 }}>
                <Iconify icon="solar:check-circle-bold" width={56} sx={{ color: SPA2_TEAL }} />
                <Typography variant="h5" sx={{ color: SPA2_INK }}>
                  Đã ghi nhận!
                </Typography>
                <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 380 }}>
                  Đội ngũ CSKH sẽ liên hệ trong 24 giờ để trao đổi chi tiết và chuẩn bị tốt nhất cho
                  buổi hẹn của bạn.
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
                  Gửi yêu cầu khác
                </Button>
              </Stack>
            )}
          </SoftCard>
        </Container>
      </Box>

      <GradientCta
        title="Mọi người đều xứng đáng được chăm sóc"
        sub="Liên hệ trước để chúng tôi chuẩn bị trải nghiệm tốt nhất cho bạn."
        btnLabel="Liên hệ ngay"
        href={paths.spa2.contact}
      />
    </Box>
  );
}
