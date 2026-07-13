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
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';

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
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
      <Container>
        <Card
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            color: 'common.white',
            background: `linear-gradient(135deg, ${color || SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
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

// ═══════════════════════════════════════════════════════════
// 1. INGREDIENT ENCYCLOPEDIA
// ═══════════════════════════════════════════════════════════

const INGREDIENTS = [
  {
    name: 'Hyaluronic Acid',
    origin: 'Tổng hợp sinh học',
    category: 'moisturizing',
    icon: '💧',
    description:
      'Phân tử giữ nước mạnh nhất tự nhiên — giữ lại gấp 1000 lần trọng lượng nước, lấp đầy nếp nhăn tức thì.',
    benefits: ['Cấp ẩm tức thì', 'Làm đầy nếp nhăn', 'Phù hợp mọi loại da'],
    safety: 'safe',
    usedIn: ['Facial Organic', 'Anti-Aging Facial'],
  },
  {
    name: 'Nghệ Tươi (Curcumin)',
    origin: 'Việt Nam',
    category: 'brightening',
    icon: '🌿',
    description:
      'Hoạt chất chống viêm, kháng khuẩn mạnh mẽ từ củ nghệ Hưng Yên. Làm sáng da, mờ thâm tự nhiên.',
    benefits: ['Chống viêm', 'Sáng da', 'Kháng khuẩn'],
    safety: 'safe',
    usedIn: ['Herbal Massage', 'Body Scrub'],
  },
  {
    name: 'Retinol (Vitamin A)',
    origin: 'Tổng hợp',
    category: 'anti-aging',
    icon: '⭐',
    description:
      'Vua của các hoạt chất chống lão hóa — kích thích collagen, tăng tốc tái tạo tế bào, mờ nếp nhăn.',
    benefits: ['Chống lão hóa', 'Tái tạo da', 'Trị mụn'],
    safety: 'caution',
    usedIn: ['Anti-Aging Facial'],
  },
  {
    name: 'Niacinamide (B3)',
    origin: 'Tổng hợp sinh học',
    category: 'brightening',
    icon: '✨',
    description:
      'Vitamin B3 đa năng: thu nhỏ lỗ chân lông, kiểm soát dầu, mờ thâm và cải thiện đều màu da.',
    benefits: ['Thu nhỏ lỗ chân lông', 'Kiểm soát dầu', 'Mờ thâm'],
    safety: 'safe',
    usedIn: ['Deep Clean Facial', 'Facial Organic'],
  },
  {
    name: 'Collagen Biển',
    origin: 'Nhật Bản',
    category: 'anti-aging',
    icon: '🐟',
    description:
      'Collagen type I từ da cá biển sâu — kích thước phân tử nhỏ, hấp thu qua da hiệu quả nhất.',
    benefits: ['Tăng đàn hồi', 'Giảm nhăn', 'Tái tạo mô'],
    safety: 'safe',
    usedIn: ['Collagen Infusion', 'Anti-Aging'],
  },
  {
    name: 'Dầu Argan',
    origin: 'Morocco',
    category: 'moisturizing',
    icon: '🌰',
    description:
      '"Vàng lỏng" Morocco — giàu vitamin E và axit béo omega, nuôi dưỡng tóc và da không gây nhờn.',
    benefits: ['Dưỡng ẩm sâu', 'Phục hồi tóc', 'Chống oxy hóa'],
    safety: 'safe',
    usedIn: ['Body Wrap', 'Hair Treatment'],
  },
  {
    name: 'Tinh Dầu Tràm Trà',
    origin: 'Úc',
    category: 'acne',
    icon: '🌿',
    description:
      'Kháng khuẩn, kháng nấm tự nhiên từ cây Melaleuca alternifolia — trị mụn hiệu quả, không gây kháng kháng sinh.',
    benefits: ['Kháng khuẩn', 'Trị mụn', 'Giảm viêm'],
    safety: 'caution',
    usedIn: ['Acne Control Facial'],
  },
  {
    name: 'Squalane',
    origin: 'Ô liu / Mía đường',
    category: 'moisturizing',
    icon: '🫒',
    description:
      'Emollient cực kỳ nhẹ, giống với dầu tự nhiên của da người — thấm nhanh, không cảm giác bóng nhờn.',
    benefits: ['Siêu nhẹ', 'Không cắn pore', 'Cân bằng dầu'],
    safety: 'safe',
    usedIn: ['Facial Organic', 'Body Treatment'],
  },
  {
    name: 'AHA (Alpha Hydroxy Acid)',
    origin: 'Trái cây tự nhiên',
    category: 'exfoliating',
    icon: '🍊',
    description:
      'Axit từ trái cây (lactic, glycolic, malic) tẩy tế bào chết nhẹ nhàng, thúc đẩy turnover da.',
    benefits: ['Tẩy tế bào chết', 'Sáng đều màu', 'Tăng hấp thu'],
    safety: 'caution',
    usedIn: ['Body Scrub', 'Brightening Facial'],
  },
  {
    name: 'Aloe Vera (Lô hội)',
    origin: 'Việt Nam',
    category: 'soothing',
    icon: '🌵',
    description:
      '200+ hợp chất sinh học: làm dịu tức thì, dưỡng ẩm, kháng viêm — an toàn tuyệt đối cho da nhạy cảm nhất.',
    benefits: ['Làm dịu da', 'Dưỡng ẩm nhẹ', 'Kháng viêm'],
    safety: 'safe',
    usedIn: ['Sensitive Facial', 'After Sun Care'],
  },
  {
    name: 'Vitamin C (L-Ascorbic Acid)',
    origin: 'Tổng hợp',
    category: 'brightening',
    icon: '🍋',
    description:
      'Chất chống oxy hóa mạnh nhất cho da — ức chế melanin, kích thích collagen và bảo vệ khỏi tia UV.',
    benefits: ['Sáng da', 'Chống lão hóa', 'Bảo vệ UV'],
    safety: 'safe',
    usedIn: ['Brightening Facial', 'Vitamin C Infusion'],
  },
  {
    name: 'Peptides',
    origin: 'Tổng hợp sinh học',
    category: 'anti-aging',
    icon: '🔬',
    description:
      'Chuỗi axit amin ngắn ra tín hiệu cho da tự sản sinh collagen — chống lão hóa thế hệ mới không gây kích ứng.',
    benefits: ['Kích thích collagen', 'Không kích ứng', 'Phù hợp mọi loại da'],
    safety: 'safe',
    usedIn: ['Anti-Aging Facial', 'Eye Zone'],
  },
];

const SAFETY_CONFIG = {
  safe: { label: 'An toàn', color: '#2E7D32', bg: '#E8F5E9' },
  caution: { label: 'Dùng đúng cách', color: '#854F0B', bg: '#FEF3E2' },
};
const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  moisturizing: { label: 'Dưỡng ẩm', color: '#0D47A1' },
  brightening: { label: 'Sáng da', color: '#F9A825' },
  'anti-aging': { label: 'Chống lão hóa', color: '#7F77DD' },
  acne: { label: 'Trị mụn', color: '#C62828' },
  exfoliating: { label: 'Tẩy tế bào', color: '#EF9F27' },
  soothing: { label: 'Làm dịu', color: SPA2_TEAL },
};

export function Spa2IngredientGuidePageView() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState<(typeof INGREDIENTS)[0] | null>(null);

  const categories = ['all', ...Object.keys(CATEGORY_CONFIG)];
  const filtered = useMemo(() => {
    let list = INGREDIENTS;
    if (cat !== 'all') list = list.filter((i) => i.category === cat);
    if (search.trim())
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase())
      );
    return list;
  }, [cat, search]);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
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
            top: -80,
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
              THÀNH PHẦN
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1, maxWidth: 700 }}
            >
              Bách khoa toàn thư thành phần mỹ phẩm
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 17, maxWidth: 540 }}>
              Hiểu rõ từng hoạt chất trong sản phẩm bạn đang dùng — để chọn liệu trình phù hợp nhất.
            </Typography>
            <TextField
              placeholder="Tìm thành phần..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: 440,
                bgcolor: 'common.white',
                borderRadius: 99,
                '& .MuiOutlinedInput-root': { borderRadius: 99 },
              }}
            />
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {categories.map((c) => (
              <Chip
                key={c}
                label={c === 'all' ? 'Tất cả' : CATEGORY_CONFIG[c]?.label}
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

          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 3 }}>
            Hiển thị {filtered.length} / {INGREDIENTS.length} thành phần
          </Typography>

          <Grid container spacing={2}>
            {filtered.map((ing) => {
              const catInfo = CATEGORY_CONFIG[ing.category];
              const safety = SAFETY_CONFIG[ing.safety as keyof typeof SAFETY_CONFIG];
              return (
                <Grid key={ing.name} xs={12} sm={6} md={4}>
                  <Card
                    onClick={() => setSelected(ing)}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                      boxShadow: 'none',
                      cursor: 'pointer',
                      transition: 'all .2s',
                      '&:hover': {
                        borderColor: SPA2_TEAL,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(46,139,122,0.1)',
                      },
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Typography sx={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>
                        {ing.icon}
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 15 }}
                        >
                          {ing.name}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={0.75}
                          sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}
                        >
                          <Chip
                            label={catInfo?.label}
                            size="small"
                            sx={{
                              bgcolor: `${catInfo?.color}15`,
                              color: catInfo?.color,
                              fontSize: 11,
                              height: 18,
                            }}
                          />
                          <Chip
                            label={safety?.label}
                            size="small"
                            sx={{
                              bgcolor: safety?.bg,
                              color: safety?.color,
                              fontSize: 11,
                              height: 18,
                            }}
                          />
                        </Stack>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.5 }}>
                          {ing.description.slice(0, 80)}...
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
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
              <Typography sx={{ fontSize: 48, lineHeight: 1 }}>{selected.icon}</Typography>
              <Box>
                <Typography variant="h5" sx={{ color: SPA2_INK }}>
                  {selected.name}
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ mt: 0.5 }}>
                  <Chip
                    label={CATEGORY_CONFIG[selected.category]?.label}
                    size="small"
                    sx={{
                      bgcolor: `${CATEGORY_CONFIG[selected.category]?.color}15`,
                      color: CATEGORY_CONFIG[selected.category]?.color,
                      fontSize: 11,
                    }}
                  />
                  <Chip
                    label={`🌍 ${selected.origin}`}
                    size="small"
                    sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                  />
                  <Chip
                    label={SAFETY_CONFIG[selected.safety as keyof typeof SAFETY_CONFIG]?.label}
                    size="small"
                    sx={{
                      bgcolor: SAFETY_CONFIG[selected.safety as keyof typeof SAFETY_CONFIG]?.bg,
                      color: SAFETY_CONFIG[selected.safety as keyof typeof SAFETY_CONFIG]?.color,
                      fontSize: 11,
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2.5 }}>
              {selected.description}
            </Typography>
            <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
              Công dụng:
            </Typography>
            <Stack spacing={0.75} sx={{ mb: 2.5 }}>
              {selected.benefits.map((b) => (
                <Stack key={b} direction="row" spacing={1.5} alignItems="center">
                  <Iconify icon="solar:check-circle-bold" width={15} sx={{ color: SPA2_TEAL }} />
                  <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{b}</Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
              Có trong liệu trình:
            </Typography>
            <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: 0.75, mb: 2 }}>
              {selected.usedIn.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                />
              ))}
            </Stack>
            {selected.safety === 'caution' && (
              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                Thành phần này cần được sử dụng đúng nồng độ và tần suất. KTV sẽ tư vấn phù hợp với
                loại da của bạn.
              </Alert>
            )}
          </DialogContent>
        )}
      </Dialog>

      <GradientCta
        title="Biết thành phần để chọn đúng liệu trình"
        sub="KTV của chúng tôi giải thích chi tiết mọi sản phẩm trước khi sử dụng."
        btnLabel="Đặt lịch tư vấn"
        href={paths.spa2.contact}
      />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════
// 2. SKIN SCHOOL (eLEARNING)
// ═══════════════════════════════════════════════════════════

const SKIN_COURSES = [
  {
    id: 'basics',
    title: 'Skincare 101: Nền tảng chăm sóc da',
    level: 'Cơ bản',
    lessons: 8,
    duration: '2 giờ',
    icon: 'solar:book-bold-duotone',
    color: '#4CAF50',
    enrolled: 2341,
    rating: 4.9,
    free: true,
    topics: [
      'Cấu trúc da',
      'pH và da',
      'Thứ tự bước skincare',
      'Đọc bảng thành phần',
      'Chọn sản phẩm theo loại da',
    ],
  },
  {
    id: 'actives',
    title: 'Hoạt Chất Skincare: A–Z',
    level: 'Trung cấp',
    lessons: 12,
    duration: '3.5 giờ',
    icon: 'solar:flask-bold-duotone',
    color: SPA2_TEAL,
    enrolled: 1876,
    rating: 4.8,
    free: false,
    price: 290000,
    topics: [
      'Vitamin C, Niacinamide, Retinol',
      'AHA/BHA/PHA',
      'Peptides & Growth factors',
      'Cách phối trộn & thứ tự dùng',
      'Lịch skincare theo tuần',
    ],
  },
  {
    id: 'advanced',
    title: 'Liệu Pháp Da Nâng Cao',
    level: 'Nâng cao',
    lessons: 10,
    duration: '4 giờ',
    icon: 'solar:medal-star-bold-duotone',
    color: '#7F77DD',
    enrolled: 892,
    rating: 5.0,
    free: false,
    price: 590000,
    topics: [
      'Microneedling & RF',
      'Laser & IPL cơ bản',
      'Filler & Botox kiến thức',
      'Đọc hiểu đơn điều trị',
      'Lịch trình phục hồi sau điều trị',
    ],
  },
  {
    id: 'nutrition',
    title: 'Dinh Dưỡng & Làn Da',
    level: 'Cơ bản',
    lessons: 6,
    duration: '1.5 giờ',
    icon: 'solar:leaf-bold-duotone',
    color: '#EF9F27',
    enrolled: 1543,
    rating: 4.7,
    free: true,
    topics: [
      'Gut-skin connection',
      'Thực phẩm pro-skin',
      'Thực phẩm gây mụn',
      'Uống nước đúng cách',
      'Supplement cho da',
    ],
  },
];

const QUIZ_LESSONS = [
  {
    q: 'Bạn nên dùng Vitamin C vào buổi nào?',
    opts: ['Sáng', 'Tối', 'Cả hai đều được', 'Không quan trọng'],
    correct: 0,
    explain: 'Vitamin C dùng buổi sáng để bảo vệ da khỏi ô nhiễm và tia UV trong ngày.',
  },
  {
    q: 'AHA hoạt động hiệu quả nhất ở pH bao nhiêu?',
    opts: ['pH 6–7', 'pH 3–4', 'pH 8–9', 'pH 10+'],
    correct: 1,
    explain:
      'AHA cần môi trường axit (pH 3–4) để hoạt động, tương ứng với pH da lành mạnh (4.5–5.5).',
  },
  {
    q: 'Thứ tự nào đúng khi dùng nhiều serum?',
    opts: [
      'Đặc trước, loãng sau',
      'Loãng trước, đặc sau',
      'Thứ tự không quan trọng',
      'Chỉ dùng 1 serum mỗi lần',
    ],
    correct: 1,
    explain: 'Serum loãng (nước) thấm trước để tạo nền, serum đặc (dầu/gel) phủ lên sau.',
  },
];

export function Spa2SkinSchoolPageView() {
  const [activeTab, setActiveTab] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['basics', 'nutrition']);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const enroll = (id: string) => {
    setEnrolledCourses((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setToast('Đã đăng ký khóa học thành công!');
  };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${SPA2_INK} 0%, #1a3d35 100%)`,
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            opacity: 0.08,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
              HỌC VIỆN DA
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 700 }}
            >
              Skin School by Nature Spa
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 540 }}>
              Học skincare đúng từ các chuyên gia — video bài giảng, bài kiểm tra và chứng chỉ hoàn
              thành.
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              justifyContent="center"
              sx={{ gap: 1 }}
            >
              <Chip label="4 khóa học" sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }} />
              <Chip
                label="2 khóa miễn phí"
                sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 600 }}
              />
              <Chip
                label="Chứng chỉ Nature Spa"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            sx={{
              mb: 5,
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
            }}
          >
            <Tab label="Tất cả khóa học" sx={{ textTransform: 'none' }} />
            <Tab label={`Của tôi (${enrolledCourses.length})`} sx={{ textTransform: 'none' }} />
            <Tab label="Bài kiểm tra nhanh" sx={{ textTransform: 'none' }} />
          </Tabs>

          {activeTab === 0 && (
            <Grid container spacing={3}>
              {SKIN_COURSES.map((c) => {
                const isEnrolled = enrolledCourses.includes(c.id);
                return (
                  <Grid key={c.id} xs={12} sm={6} md={3}>
                    <Card
                      sx={{
                        p: 0,
                        borderRadius: 4,
                        border: `1px solid ${SPA2_CREAM_DARK}`,
                        boxShadow: 'none',
                        overflow: 'hidden',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{ p: 3, bgcolor: `${c.color}12`, borderBottom: `3px solid ${c.color}` }}
                      >
                        <Iconify icon={c.icon} width={36} sx={{ color: c.color, mb: 1 }} />
                        <Chip
                          label={c.level}
                          size="small"
                          sx={{ bgcolor: `${c.color}20`, color: c.color, fontSize: 11, mb: 1.5 }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, lineHeight: 1.4 }}
                        >
                          {c.title}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:play-circle-bold"
                              width={14}
                              sx={{ color: 'text.secondary' }}
                            />
                            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                              {c.lessons} bài
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:clock-circle-bold"
                              width={14}
                              sx={{ color: 'text.secondary' }}
                            />
                            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                              {c.duration}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 2 }}>
                          <Rating
                            value={c.rating}
                            readOnly
                            size="small"
                            precision={0.1}
                            sx={{ fontSize: 13, '& .MuiRating-icon': { color: '#EF9F27' } }}
                          />
                          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                            ({c.enrolled.toLocaleString()})
                          </Typography>
                        </Stack>
                        <Box sx={{ flex: 1 }} />
                        <Stack spacing={1}>
                          {c.free ? (
                            <Chip
                              label="MIỄN PHÍ"
                              sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 700 }}
                            />
                          ) : (
                            <Typography sx={{ fontWeight: 700, color: c.color, fontSize: 16 }}>
                              {formatVND(c.price!)}
                            </Typography>
                          )}
                          <Button
                            fullWidth
                            onClick={() => enroll(c.id)}
                            disabled={isEnrolled}
                            sx={{
                              borderRadius: 99,
                              py: 1.2,
                              bgcolor: isEnrolled ? '#E8F5E9' : c.color,
                              color: isEnrolled ? '#2E7D32' : 'white',
                              fontSize: 13,
                              '&:hover': {
                                opacity: 0.88,
                                bgcolor: isEnrolled ? '#E8F5E9' : c.color,
                              },
                              '&.Mui-disabled': { color: '#2E7D32', bgcolor: '#E8F5E9' },
                            }}
                          >
                            {isEnrolled ? '✓ Đã đăng ký' : 'Đăng ký học'}
                          </Button>
                        </Stack>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              {SKIN_COURSES.filter((c) => enrolledCourses.includes(c.id)).map((c) => (
                <Grid key={c.id} xs={12} sm={6}>
                  <SoftCard>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Iconify icon={c.icon} width={32} sx={{ color: c.color }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                          {c.title}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                          {c.lessons} bài · {c.duration}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ mb: 1.5 }}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                          Tiến độ
                        </Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: c.color }}>
                          60%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={60}
                        sx={{
                          height: 7,
                          borderRadius: 99,
                          bgcolor: SPA2_CREAM_DARK,
                          '& .MuiLinearProgress-bar': { bgcolor: c.color, borderRadius: 99 },
                        }}
                      />
                    </Box>
                    <Stack spacing={0.75}>
                      {c.topics.slice(0, 3).map((t, i) => (
                        <Stack key={t} direction="row" spacing={1.5} alignItems="center">
                          <Iconify
                            icon={i < 2 ? 'solar:check-circle-bold' : 'solar:play-circle-bold'}
                            width={15}
                            sx={{ color: i < 2 ? '#2E7D32' : 'text.disabled', flexShrink: 0 }}
                          />
                          <Typography
                            sx={{ fontSize: 13, color: i < 2 ? SPA2_INK : 'text.disabled' }}
                          >
                            {t}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                    <Button
                      fullWidth
                      sx={{
                        mt: 2,
                        borderRadius: 99,
                        bgcolor: c.color,
                        color: 'white',
                        '&:hover': { opacity: 0.88, bgcolor: c.color },
                      }}
                    >
                      Tiếp tục học
                    </Button>
                  </SoftCard>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 2 && (
            <Box maxWidth={540} sx={{ mx: 'auto' }}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                  boxShadow: 'none',
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={(quizIdx / QUIZ_LESSONS.length) * 100}
                  sx={{
                    height: 4,
                    bgcolor: SPA2_CREAM_DARK,
                    '& .MuiLinearProgress-bar': { bgcolor: SPA2_TEAL },
                  }}
                />
                <Box sx={{ p: 3 }}>
                  <Typography sx={{ fontSize: 12, color: 'text.disabled', mb: 2 }}>
                    Câu {quizIdx + 1} / {QUIZ_LESSONS.length}
                  </Typography>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3, lineHeight: 1.4 }}>
                    {QUIZ_LESSONS[quizIdx].q}
                  </Typography>
                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    {QUIZ_LESSONS[quizIdx].opts.map((opt, i) => {
                      let bg = 'transparent';
                      let border = SPA2_CREAM_DARK;
                      let color = SPA2_INK;
                      if (quizAnswer !== null) {
                        if (i === QUIZ_LESSONS[quizIdx].correct) {
                          bg = '#E8F5E9';
                          border = '#2E7D32';
                          color = '#2E7D32';
                        } else if (
                          i === quizAnswer &&
                          quizAnswer !== QUIZ_LESSONS[quizIdx].correct
                        ) {
                          bg = '#FFEBEE';
                          border = '#C62828';
                          color = '#C62828';
                        }
                      }
                      return (
                        <Button
                          key={opt}
                          fullWidth
                          disabled={quizAnswer !== null}
                          onClick={() => setQuizAnswer(i)}
                          sx={{
                            justifyContent: 'flex-start',
                            py: 1.5,
                            px: 2.5,
                            borderRadius: 3,
                            border: `1.5px solid ${border}`,
                            bgcolor: bg,
                            color,
                            textAlign: 'left',
                            fontWeight:
                              quizAnswer !== null && i === QUIZ_LESSONS[quizIdx].correct
                                ? 600
                                : 400,
                          }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              border: `1.5px solid ${border}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              mr: 2,
                              flexShrink: 0,
                              fontWeight: 600,
                            }}
                          >
                            {String.fromCharCode(65 + i)}
                          </Box>
                          {opt}
                        </Button>
                      );
                    })}
                  </Stack>
                  {quizAnswer !== null && (
                    <Alert
                      severity={quizAnswer === QUIZ_LESSONS[quizIdx].correct ? 'success' : 'error'}
                      sx={{ borderRadius: 2.5, mb: 2 }}
                    >
                      {quizAnswer === QUIZ_LESSONS[quizIdx].correct
                        ? '🎉 Chính xác! '
                        : '❌ Chưa đúng. '}
                      {QUIZ_LESSONS[quizIdx].explain}
                    </Alert>
                  )}
                  {quizAnswer !== null && (
                    <Button
                      fullWidth
                      onClick={() => {
                        setQuizIdx((q) => (q + 1) % QUIZ_LESSONS.length);
                        setQuizAnswer(null);
                      }}
                      sx={{
                        borderRadius: 99,
                        py: 1.3,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      {quizIdx < QUIZ_LESSONS.length - 1 ? 'Câu tiếp theo →' : 'Bắt đầu lại'}
                    </Button>
                  )}
                </Box>
              </Card>
            </Box>
          )}
        </Container>
      </Box>

      <GradientCta
        title="Học đúng để chăm sóc da đúng cách"
        sub="Kiến thức kết hợp liệu trình chuyên nghiệp — kết quả tốt nhất."
        btnLabel="Đăng ký học ngay"
        href="#"
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

// ═══════════════════════════════════════════════════════════
// 3. THERAPIST PROFILE
// ═══════════════════════════════════════════════════════════

const THERAPISTS = [
  {
    id: 'hong-nhi',
    name: 'Phạm Hồng Nhi',
    role: 'Senior Facial Specialist',
    avatar: 'https://i.pravatar.cc/300?img=32',
    exp: '8 năm',
    branch: 'Quận 1, TP.HCM',
    rating: 4.9,
    reviews: 312,
    certs: ['CIDESCO', 'CIBTAC', 'Skin Analysis'],
    specialties: ['Facial chuyên sâu', 'Điều trị mụn', 'Chống lão hóa'],
    bio: 'Tốt nghiệp CIDESCO tại Pháp năm 2016, Hồng Nhi có 8 năm kinh nghiệm điều trị da liễu thẩm mỹ. Chuyên gia trong các liệu trình facial phục hồi và chống lão hóa không xâm lấn.',
    achievements: [
      'Top 3 KTV xuất sắc 2024',
      '500+ khách hàng thành công',
      'Giảng viên khóa đào tạo nội bộ',
    ],
    gallery: [SPA2_PAGE_IMAGES.treatments, SPA2_PAGE_IMAGES.services, SPA2_PAGE_IMAGES.beforeAfter],
    slots: ['9:00', '11:00', '14:00', '16:00'],
  },
  {
    id: 'minh-khoi',
    name: 'Trần Minh Khôi',
    role: 'Master Massage Therapist',
    avatar: 'https://i.pravatar.cc/300?img=12',
    exp: '10 năm',
    branch: 'Hồ Tây, Hà Nội',
    rating: 4.8,
    reviews: 256,
    certs: ['CIDESCO', 'Thai Massage', 'Sports Therapy'],
    specialties: ['Massage phục hồi', 'Deep tissue', 'Sports recovery'],
    bio: 'Tu nghiệp tại Pháp và Hàn Quốc về liệu pháp thể chất. Minh Khôi nổi tiếng với kỹ thuật massage deep tissue giảm đau mãn tính và phục hồi chấn thương thể thao.',
    achievements: [
      'Chứng chỉ Thai Massage Chiang Mai',
      'Cố vấn đội tuyển bóng đá 2022',
      'Master Trainer nội bộ',
    ],
    gallery: [SPA2_PAGE_IMAGES.training, SPA2_PAGE_IMAGES.gallery, SPA2_PAGE_IMAGES.services],
    slots: ['10:00', '13:00', '15:30', '18:00'],
  },
  {
    id: 'thao-vy',
    name: 'Nguyễn Thảo Vy',
    role: 'Wellness & Detox Expert',
    avatar: 'https://i.pravatar.cc/300?img=47',
    exp: '15 năm',
    branch: 'Biển Mỹ Khê, Đà Nẵng',
    rating: 5.0,
    reviews: 189,
    certs: ['CIDESCO', 'Master Trainer', 'Ayurveda'],
    specialties: ['Detox toàn thân', 'Wellness coaching', 'Ayurveda'],
    bio: 'Nhà sáng lập và CEO Nature Spa, 15 năm kinh nghiệm trong ngành spa cao cấp. Thạc sĩ Dược học và chứng chỉ Ayurveda từ Ấn Độ.',
    achievements: [
      'Founder Nature Spa',
      '25.000+ khách hàng đồng hành',
      'Speaker tại Vietnam Beauty Summit 2024',
    ],
    gallery: [SPA2_PAGE_IMAGES.about, SPA2_PAGE_IMAGES.training, SPA2_PAGE_IMAGES.contact],
    slots: ['10:00', '14:00', '16:00'],
  },
];

export function Spa2TherapistProfilePageView() {
  const [selected, setSelected] = useState(THERAPISTS[0]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [slot, setSlot] = useState('');
  const [booked, setBooked] = useState(false);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          bgcolor: SPA2_CREAM,
          pt: { xs: 10, md: 12 },
          pb: { xs: 8, md: 10 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 280,
            height: 280,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL_LIGHT,
            opacity: 0.1,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
            ĐỘI NGŨ CHUYÊN VIÊN
          </Typography>
          <Typography variant="h1" sx={{ color: SPA2_INK, fontWeight: 600, mt: 1, mb: 2 }}>
            Gặp gỡ chuyên viên của bạn
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 16, maxWidth: 500, mx: 'auto' }}>
            Mỗi liệu trình tại Nature Spa được thực hiện bởi chuyên viên được đào tạo chính thống và
            tận tâm.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          {/* Therapist selector */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ mb: 6, gap: 2 }}
          >
            {THERAPISTS.map((t) => (
              <Card
                key={t.id}
                onClick={() => setSelected(t)}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: `2px solid ${selected.id === t.id ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                  boxShadow: 'none',
                  cursor: 'pointer',
                  textAlign: 'center',
                  minWidth: 140,
                  transition: 'all .2s',
                  '&:hover': { borderColor: SPA2_TEAL },
                }}
              >
                <Avatar
                  src={t.avatar}
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 1,
                    border:
                      selected.id === t.id ? `3px solid ${SPA2_TEAL}` : '3px solid transparent',
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: selected.id === t.id ? SPA2_TEAL : SPA2_INK,
                    fontSize: 13,
                  }}
                >
                  {t.name.split(' ').pop()}
                </Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                  {t.role.split(' ')[0]}
                </Typography>
              </Card>
            ))}
          </Stack>

          {/* Profile detail */}
          <Grid container spacing={5}>
            <Grid xs={12} md={4}>
              <Stack spacing={3}>
                <SoftCard sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={selected.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      border: `4px solid ${SPA2_TEAL_LIGHT}`,
                    }}
                  />
                  <Typography variant="h5" sx={{ color: SPA2_INK, mb: 0.5 }}>
                    {selected.name}
                  </Typography>
                  <Typography sx={{ color: SPA2_TEAL, mb: 1.5 }}>{selected.role}</Typography>
                  <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ mb: 2 }}>
                    <Rating
                      value={selected.rating}
                      readOnly
                      size="small"
                      precision={0.1}
                      sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                    />
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      ({selected.reviews})
                    </Typography>
                  </Stack>
                  <Stack spacing={1} sx={{ mb: 2.5 }}>
                    {[
                      { icon: 'solar:buildings-bold', text: selected.branch },
                      { icon: 'solar:calendar-bold', text: `${selected.exp} kinh nghiệm` },
                    ].map((i) => (
                      <Stack
                        key={i.text}
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Iconify icon={i.icon} width={15} sx={{ color: SPA2_TEAL }} />
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {i.text}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.75}
                    flexWrap="wrap"
                    justifyContent="center"
                    sx={{ gap: 0.75, mb: 2.5 }}
                  >
                    {selected.certs.map((c) => (
                      <Chip
                        key={c}
                        label={c}
                        size="small"
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
                      />
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    onClick={() => setBookingOpen(true)}
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
                </SoftCard>

                <SoftCard>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1.5 }}>
                    Thành tựu nổi bật
                  </Typography>
                  <Stack spacing={1.25}>
                    {selected.achievements.map((a) => (
                      <Stack key={a} direction="row" spacing={1.5} alignItems="flex-start">
                        <Iconify
                          icon="solar:medal-star-bold"
                          width={16}
                          sx={{ color: '#EF9F27', flexShrink: 0, mt: '2px' }}
                        />
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{a}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </SoftCard>
              </Stack>
            </Grid>

            <Grid xs={12} md={8}>
              <Stack spacing={3}>
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    Giới thiệu
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                    {selected.bio}
                  </Typography>
                </SoftCard>

                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    Chuyên môn
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                    {selected.specialties.map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontWeight: 500 }}
                      />
                    ))}
                  </Stack>
                </SoftCard>

                {/* Gallery */}
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    Album hình
                  </Typography>
                  <Grid container spacing={1.5}>
                    {selected.gallery.map((img, i) => (
                      <Grid key={i} xs={4}>
                        <Box
                          sx={{
                            aspectRatio: '1',
                            borderRadius: 2.5,
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                            transition: 'transform .2s',
                            '&:hover': { transform: 'scale(1.03)' },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </SoftCard>

                {/* Reviews */}
                <SoftCard>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="h6" sx={{ color: SPA2_INK }}>
                      Đánh giá gần đây
                    </Typography>
                    <Chip
                      label={`${selected.rating}★ · ${selected.reviews} reviews`}
                      sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                    />
                  </Stack>
                  <Stack spacing={2}>
                    {spa2Feedbacks.slice(0, 2).map((f) => (
                      <Box key={f.name}>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.75 }}>
                          <Avatar src={f.avatar} sx={{ width: 36, height: 36 }} />
                          <Box>
                            <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                              {f.name}
                            </Typography>
                            <Rating
                              value={f.rating}
                              readOnly
                              size="small"
                              sx={{ fontSize: 13, '& .MuiRating-icon': { color: '#EF9F27' } }}
                            />
                          </Box>
                        </Stack>
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: 'text.secondary',
                            fontStyle: 'italic',
                            lineHeight: 1.6,
                            pl: 6.5,
                          }}
                        >
                          &ldquo;{f.comment}&rdquo;
                        </Typography>
                        <Divider sx={{ mt: 1.5 }} />
                      </Box>
                    ))}
                  </Stack>
                </SoftCard>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Booking dialog */}
      <Dialog
        open={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setBooked(false);
          setSlot('');
        }}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <DialogContent sx={{ p: 3 }}>
          <IconButton
            onClick={() => {
              setBookingOpen(false);
              setBooked(false);
              setSlot('');
            }}
            sx={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
          {!booked ? (
            <>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar src={selected.avatar} sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{selected.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                    {selected.branch}
                  </Typography>
                </Box>
              </Stack>
              <Typography sx={{ fontWeight: 500, color: SPA2_INK, mb: 1.5, fontSize: 14 }}>
                Chọn khung giờ
              </Typography>
              <Grid container spacing={1} sx={{ mb: 2 }}>
                {selected.slots.map((s) => (
                  <Grid key={s} xs={6}>
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
              <Stack spacing={1.5} sx={{ mb: 2 }}>
                <TextField fullWidth size="small" label="Họ và tên" />
                <TextField fullWidth size="small" label="Số điện thoại" />
                <TextField fullWidth size="small" select label="Dịch vụ">
                  {selected.specialties.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Button
                fullWidth
                disabled={!slot}
                onClick={() => setBooked(true)}
                sx={{
                  borderRadius: 99,
                  py: 1.4,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  '&.Mui-disabled': { bgcolor: SPA2_CREAM_DARK },
                }}
              >
                Xác nhận với {selected.name.split(' ').pop()} lúc {slot || '...'}
              </Button>
            </>
          ) : (
            <Stack alignItems="center" spacing={2} sx={{ py: 3, textAlign: 'center' }}>
              <Iconify icon="solar:check-circle-bold" width={52} sx={{ color: SPA2_TEAL }} />
              <Typography variant="h6" sx={{ color: SPA2_INK }}>
                Đặt lịch thành công!
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                Hẹn gặp bạn với <strong>{selected.name}</strong> lúc <strong>{slot}</strong>. Xác
                nhận gửi qua SMS trong 15 phút.
              </Typography>
              <Button
                onClick={() => {
                  setBookingOpen(false);
                  setBooked(false);
                  setSlot('');
                }}
                sx={{ borderRadius: 99, bgcolor: SPA2_TEAL, color: 'white', px: 4 }}
              >
                Đóng
              </Button>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════
// 4. SLEEP WELLNESS
// ═══════════════════════════════════════════════════════════

const SLEEP_PROGRAMS = [
  {
    name: 'Sleep Reset 1 buổi',
    price: 990000,
    duration: '90 phút',
    icon: 'solar:moon-bold-duotone',
    color: '#3949AB',
    desc: 'Massage thư giãn + Aromatherapy lavender + Âm thanh binaural beats — reset nhịp sinh học.',
    includes: [
      'Massage toàn thân nhẹ',
      'Tinh dầu lavender & chamomile',
      'Headphone + binaural beats',
      'Trà valerian & mật ong',
    ],
  },
  {
    name: 'Deep Sleep Program 4 tuần',
    price: 3990000,
    duration: '1 buổi/tuần',
    icon: 'solar:stars-bold-duotone',
    color: '#1A237E',
    desc: 'Chương trình 4 tuần kết hợp spa + hướng dẫn vệ sinh giấc ngủ tại nhà.',
    includes: [
      '4 buổi massage thư giãn',
      'Sleep journal',
      'App theo dõi giấc ngủ 1 tháng',
      'Bộ sản phẩm sleep ritual',
      'Coaching online hàng tuần',
    ],
  },
];

const SLEEP_TIPS = [
  { time: '21:00', emoji: '📵', tip: 'Tắt màn hình xanh, chuyển sang đèn vàng ấm.' },
  { time: '21:30', emoji: '🛁', tip: 'Tắm nước ấm 37–40°C trong 10–15 phút.' },
  { time: '22:00', emoji: '🌿', tip: 'Uống trà thảo mộc (lavender, chamomile, valerian).' },
  { time: '22:15', emoji: '✍️', tip: 'Viết 3 điều biết ơn trong ngày — giải phóng lo âu.' },
  { time: '22:30', emoji: '🧘', tip: 'Thở 4-7-8: hít 4s, nín 7s, thở 8s — lặp 4 lần.' },
  { time: '23:00', emoji: '😴', tip: 'Mục tiêu: ngủ trước 23:00 để đạt đủ giấc deep sleep.' },
];

export function Spa2SleepWellnessPageView() {
  const [sleepScore, setSleepScore] = useState({ quality: 50, duration: 6, stress: 70 });
  const [toast, setToast] = useState('');

  const totalScore = Math.round(
    (sleepScore.quality + (sleepScore.duration / 9) * 100 + (100 - sleepScore.stress)) / 3
  );
  const scoreColor = totalScore >= 70 ? '#2E7D32' : totalScore >= 40 ? '#EF9F27' : '#C62828';
  const scoreLabel =
    totalScore >= 70 ? 'Giấc ngủ tốt' : totalScore >= 40 ? 'Cần cải thiện' : 'Kém — cần can thiệp';

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #0D0D2B 0%, #1A237E 50%, #283593 100%)',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: '#7986CB',
            opacity: 0.08,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography sx={{ fontSize: 60, lineHeight: 1 }}>🌙</Typography>
            <Typography variant="overline" sx={{ color: '#9FA8DA', letterSpacing: 3 }}>
              GIẤC NGỦ & SỨC KHỎE
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: 'white', fontWeight: 600, lineHeight: 1.1, maxWidth: 700 }}
            >
              Ngủ đủ giấc là nền tảng của mọi vẻ đẹp
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 540 }}>
              Trong giấc ngủ sâu, cơ thể tiết hormone tăng trưởng — tái tạo da, phục hồi cơ bắp và
              xử lý stress.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Sleep score calculator */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Đánh giá" title="Chất lượng giấc ngủ của bạn" />
          <Grid container spacing={4}>
            <Grid xs={12} md={6}>
              <SoftCard>
                <Stack spacing={3.5}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: SPA2_INK }}>
                        Chất lượng giấc ngủ
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#3949AB' }}>
                        {sleepScore.quality}%
                      </Typography>
                    </Stack>
                    <Slider
                      value={sleepScore.quality}
                      onChange={(_, v) => setSleepScore({ ...sleepScore, quality: v as number })}
                      sx={{ color: '#3949AB' }}
                    />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>Rất kém</Typography>
                      <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                        Tuyệt vời
                      </Typography>
                    </Stack>
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: SPA2_INK }}>
                        Số giờ ngủ trung bình
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1565C0' }}>
                        {sleepScore.duration} giờ
                      </Typography>
                    </Stack>
                    <Slider
                      value={sleepScore.duration}
                      min={3}
                      max={9}
                      onChange={(_, v) => setSleepScore({ ...sleepScore, duration: v as number })}
                      sx={{ color: '#1565C0' }}
                    />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>3 giờ</Typography>
                      <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>9+ giờ</Typography>
                    </Stack>
                  </Box>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: SPA2_INK }}>
                        Mức độ stress khi đi ngủ
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#C62828' }}>
                        {sleepScore.stress}%
                      </Typography>
                    </Stack>
                    <Slider
                      value={sleepScore.stress}
                      onChange={(_, v) => setSleepScore({ ...sleepScore, stress: v as number })}
                      sx={{ color: '#C62828' }}
                    />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                        Thoải mái
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
                        Rất căng thẳng
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </SoftCard>
            </Grid>
            <Grid xs={12} md={6}>
              <SoftCard
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>
                  Điểm giấc ngủ của bạn
                </Typography>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    bgcolor: `${scoreColor}15`,
                    border: `6px solid ${scoreColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 700, fontSize: 32, color: scoreColor, lineHeight: 1 }}
                  >
                    {totalScore}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: scoreColor }}>/ 100</Typography>
                </Box>
                <Chip
                  label={scoreLabel}
                  sx={{
                    bgcolor: `${scoreColor}15`,
                    color: scoreColor,
                    fontWeight: 600,
                    mb: 2,
                    mx: 'auto',
                  }}
                />
                {totalScore < 70 && (
                  <Alert
                    severity={totalScore < 40 ? 'error' : 'warning'}
                    sx={{ borderRadius: 2.5, mb: 2, textAlign: 'left' }}
                  >
                    {totalScore < 40
                      ? 'Chất lượng giấc ngủ kém đang ảnh hưởng nghiêm trọng đến da và sức khỏe của bạn. Nên tham khảo chuyên gia.'
                      : 'Giấc ngủ chưa tối ưu. Các liệu trình Sleep Wellness có thể giúp bạn cải thiện đáng kể.'}
                  </Alert>
                )}
                <Button
                  onClick={() => setToast('Đang chuyển đến tư vấn...')}
                  component={RouterLink}
                  href={paths.spa2.contact}
                  sx={{
                    borderRadius: 99,
                    py: 1.3,
                    bgcolor: '#1A237E',
                    color: 'white',
                    '&:hover': { bgcolor: '#0D1B6E' },
                  }}
                >
                  Nhận tư vấn cải thiện giấc ngủ
                </Button>
              </SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sleep routine */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#E8EAF6' }}>
        <Container maxWidth="md">
          <SectionTitle eyebrow="Thói quen" title="Ritual đêm tối ưu hóa giấc ngủ" />
          <Stack spacing={0}>
            {SLEEP_TIPS.map((tip, i) => (
              <Stack key={tip.time} direction="row" spacing={2.5}>
                <Stack alignItems="center" sx={{ width: 72, flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#1A237E',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 700, fontSize: 11, color: 'white', lineHeight: 1 }}
                    >
                      {tip.time}
                    </Typography>
                  </Box>
                  {i < SLEEP_TIPS.length - 1 && (
                    <Box sx={{ width: 2, flex: 1, bgcolor: '#9FA8DA', my: 0.5 }} />
                  )}
                </Stack>
                <Box sx={{ pb: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25 }}>
                    <Typography sx={{ fontSize: 20 }}>{tip.emoji}</Typography>
                    <Typography sx={{ fontSize: 14, color: SPA2_INK, lineHeight: 1.6 }}>
                      {tip.tip}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Programs */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          <SectionTitle eyebrow="Chương trình" title="Sleep Wellness tại Nature Spa" />
          <Grid container spacing={3} justifyContent="center">
            {SLEEP_PROGRAMS.map((p) => (
              <Grid key={p.name} xs={12} md={5}>
                <SoftCard sx={{ borderTop: `4px solid ${p.color}` }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      bgcolor: `${p.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={p.icon} width={26} sx={{ color: p.color }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 16 }}>
                    {p.name}
                  </Typography>
                  <Chip
                    label={p.duration}
                    size="small"
                    sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: 'text.secondary' }}
                  />
                  <Typography
                    sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                  >
                    {p.desc}
                  </Typography>
                  <Stack spacing={0.75} sx={{ mb: 3 }}>
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
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 700, color: p.color, fontSize: 18 }}>
                      {formatVND(p.price)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa2.booking}
                      sx={{
                        borderRadius: 99,
                        px: 3,
                        bgcolor: p.color,
                        color: 'white',
                        '&:hover': { opacity: 0.88, bgcolor: p.color },
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

      <GradientCta
        title="Ngủ ngon, da đẹp — mọi ngày"
        sub="Liệu trình Sleep Wellness kết hợp spa + hướng dẫn tại nhà."
        btnLabel="Bắt đầu hành trình ngủ ngon"
        href={paths.spa2.booking}
        color="#1A237E"
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

// ═══════════════════════════════════════════════════════════
// 5. PRENATAL SPA (SPA THAI KỲ)
// ═══════════════════════════════════════════════════════════

const PRENATAL_SERVICES = [
  {
    name: 'Prenatal Massage',
    trimester: '2–3',
    price: 890000,
    duration: '75 phút',
    icon: 'solar:heart-bold-duotone',
    desc: 'Massage nhẹ nhàng giảm đau lưng, phù chân và stress thai kỳ. Tư thế nằm nghiêng an toàn.',
    safe: true,
  },
  {
    name: 'Pregnancy Facial',
    trimester: '1–3',
    price: 790000,
    duration: '60 phút',
    icon: 'solar:face-scan-circle-bold-duotone',
    desc: 'Facial không retinol, không AHA mạnh — dưỡng ẩm và kiểm soát nám thai kỳ an toàn tuyệt đối.',
    safe: true,
  },
  {
    name: 'Foot & Leg Relief',
    trimester: '2–3',
    price: 490000,
    duration: '45 phút',
    icon: 'solar:hand-heart-bold-duotone',
    desc: 'Ngâm chân muối khoáng và massage nhẹ kích thích tuần hoàn, giảm phù nề hiệu quả.',
    safe: true,
  },
  {
    name: 'Stretch Mark Prevention',
    trimester: '2–3',
    price: 690000,
    duration: '60 phút',
    icon: 'solar:leaf-bold-duotone',
    desc: 'Ủ dưỡng bụng với dầu rosehip và shea butter — giảm thiểu rạn da trong và sau thai kỳ.',
    safe: true,
  },
  {
    name: 'Postpartum Recovery',
    trimester: 'Sau sinh',
    price: 1290000,
    duration: '90 phút',
    icon: 'solar:stars-bold-duotone',
    desc: 'Massage phục hồi sau sinh, chăm sóc vùng bụng và hỗ trợ tâm lý cho mẹ mới.',
    safe: true,
  },
  {
    name: 'Mom & Baby Bonding',
    trimester: 'Sau sinh 2–6 tháng',
    price: 690000,
    duration: '60 phút',
    icon: 'solar:smile-bold-duotone',
    desc: 'Hướng dẫn massage cho bé và massage thư giãn cho mẹ — tăng cường gắn kết tình cảm.',
    safe: true,
  },
];

export function Spa2PrenatalSpaPageView() {
  const [trimester, setTrimester] = useState('all');

  const TRIMESTERS = ['all', '1–3', '2–3', 'Sau sinh', 'Sau sinh 2–6 tháng'];
  const filtered =
    trimester === 'all'
      ? PRENATAL_SERVICES
      : PRENATAL_SERVICES.filter((s) => s.trimester === trimester);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #FCE4EC 0%, #F3E5F5 50%, #E8F5E9 100%)',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: '#F48FB1',
            opacity: 0.15,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography sx={{ fontSize: 56, lineHeight: 1 }}>🤰</Typography>
            <Typography variant="overline" sx={{ color: '#C2185B', letterSpacing: 3 }}>
              SPA THAI KỲ
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1, maxWidth: 700 }}
            >
              Chăm sóc đặc biệt cho mẹ bầu & mẹ sau sinh
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 17, maxWidth: 560 }}>
              Tất cả dịch vụ được thiết kế dưới sự tư vấn của bác sĩ sản khoa — an toàn tuyệt đối
              cho mẹ và bé.
            </Typography>
            <Alert
              severity="info"
              sx={{ borderRadius: 3, bgcolor: '#E3F2FD', color: '#0C447C', maxWidth: 480 }}
            >
              <strong>Khuyến cáo:</strong> Tham khảo ý kiến bác sĩ sản khoa trước khi sử dụng bất kỳ
              dịch vụ spa nào trong thai kỳ.
            </Alert>
          </Stack>
        </Container>
      </Box>

      {/* Safety badges */}
      <Box sx={{ py: 3, bgcolor: '#FFF9C4' }}>
        <Container>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            flexWrap="wrap"
            sx={{ gap: 1 }}
          >
            {[
              '✅ Không retinol',
              '✅ Không BHA/AHA mạnh',
              '✅ Không tinh dầu cấm',
              '✅ Áp lực massage nhẹ',
              '✅ Tư thế an toàn',
              '✅ Sản phẩm hữu cơ',
            ].map((b) => (
              <Chip
                key={b}
                label={b}
                sx={{ bgcolor: '#FFFDE7', color: '#5D4037', border: '1px solid #F9A825' }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {TRIMESTERS.map((t) => (
              <Chip
                key={t}
                label={t === 'all' ? 'Tất cả giai đoạn' : t}
                onClick={() => setTrimester(t)}
                sx={{
                  cursor: 'pointer',
                  height: 34,
                  bgcolor: trimester === t ? '#C2185B' : 'transparent',
                  color: trimester === t ? 'white' : 'text.secondary',
                  border: `1.5px solid ${trimester === t ? '#C2185B' : SPA2_CREAM_DARK}`,
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
                      bgcolor: '#FCE4EC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Iconify icon={s.icon} width={26} sx={{ color: '#C2185B' }} />
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
                    <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15, flex: 1 }}>
                      {s.name}
                    </Typography>
                    <Chip
                      label="✅ An toàn"
                      size="small"
                      sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontSize: 11 }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Chip
                      label={`Thai kỳ: ${s.trimester}`}
                      size="small"
                      sx={{ bgcolor: '#FCE4EC', color: '#C2185B', fontSize: 11 }}
                    />
                    <Chip
                      label={s.duration}
                      size="small"
                      sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
                    />
                  </Stack>
                  <Typography
                    sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}
                  >
                    {s.desc}
                  </Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 700, color: '#C2185B', fontSize: 16 }}>
                      {formatVND(s.price)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa2.booking}
                      size="small"
                      sx={{
                        borderRadius: 99,
                        bgcolor: '#C2185B',
                        color: 'white',
                        px: 2,
                        '&:hover': { bgcolor: '#AD1457' },
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

      {/* Why choose */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <SectionTitle eyebrow="Cam kết" title="Tại sao mẹ bầu chọn Nature Spa?" />
          <Grid container spacing={3}>
            {[
              {
                icon: 'solar:shield-check-bold-duotone',
                title: 'Được bác sĩ tư vấn',
                desc: 'Mọi liệu trình được đội ngũ bác sĩ sản khoa và da liễu kiểm duyệt — đảm bảo an toàn tuyệt đối.',
              },
              {
                icon: 'solar:leaf-bold-duotone',
                title: 'Sản phẩm an toàn tuyệt đối',
                desc: 'Loại bỏ hoàn toàn các thành phần có hại: retinol, salicylic acid, tinh dầu cấm trong thai kỳ.',
              },
              {
                icon: 'solar:heart-bold-duotone',
                title: 'KTV được đào tạo chuyên biệt',
                desc: 'KTV được học riêng về giải phẫu thai kỳ, tư thế an toàn và kỹ thuật massage nhẹ nhàng.',
              },
              {
                icon: 'solar:users-group-bold-duotone',
                title: 'Cộng đồng mẹ bầu',
                desc: 'Kết nối với cộng đồng 500+ mẹ bầu đã tin tưởng Nature Spa trong hành trình thai kỳ.',
              },
            ].map((i) => (
              <Grid key={i.title} xs={12} sm={6} md={3}>
                <SoftCard sx={{ textAlign: 'center', bgcolor: 'common.white' }}>
                  <Iconify icon={i.icon} width={44} sx={{ color: '#C2185B', mb: 1.5 }} />
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
                    {i.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                    {i.desc}
                  </Typography>
                </SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <GradientCta
        title="Chăm sóc bản thân trong hành trình làm mẹ"
        sub="Tư vấn miễn phí — KTV hiểu rõ nhu cầu đặc biệt của mẹ bầu."
        btnLabel="Đặt lịch ngay"
        href={paths.spa2.booking}
        color="#C2185B"
      />
    </Box>
  );
}

// ═══════════════════════════════════════════════════════════
// 6. WELLNESS ASSESSMENT (ĐÁNH GIÁ SỨC KHỎE TỔNG QUÁT)
// ═══════════════════════════════════════════════════════════

const ASSESSMENT_QUESTIONS = [
  {
    id: 'sleep',
    label: 'Chất lượng giấc ngủ',
    icon: 'solar:moon-bold',
    question: 'Bạn ngủ bao nhiêu tiếng mỗi đêm và cảm thấy thế nào khi thức dậy?',
  },
  {
    id: 'stress',
    label: 'Mức độ stress',
    icon: 'solar:bolt-bold',
    question: 'Bạn cảm thấy căng thẳng như thế nào trong cuộc sống hàng ngày?',
  },
  {
    id: 'skin',
    label: 'Tình trạng da',
    icon: 'solar:face-scan-circle-bold',
    question: 'Da bạn đang gặp vấn đề gì? (mụn, khô, dầu, lão hóa...)',
  },
  {
    id: 'energy',
    label: 'Năng lượng',
    icon: 'solar:sun-bold',
    question: 'Bạn cảm thấy mức năng lượng của mình trong ngày như thế nào?',
  },
  {
    id: 'nutrition',
    label: 'Chế độ ăn',
    icon: 'solar:leaf-bold',
    question: 'Bạn ăn uống lành mạnh và cân bằng như thế nào?',
  },
  {
    id: 'activity',
    label: 'Vận động',
    icon: 'solar:running-bold',
    question: 'Bạn có tập thể dục hoặc vận động thường xuyên không?',
  },
];

export function Spa2WellnessAssessmentPageView() {
  const [scores, setScores] = useState<Record<string, number>>({
    sleep: 50,
    stress: 60,
    skin: 40,
    energy: 50,
    nutrition: 60,
    activity: 40,
  });
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const totalScore = Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
  );

  const getRecommendations = () => {
    const recs = [];
    if (scores.sleep < 50)
      recs.push({
        area: 'Giấc ngủ',
        service: 'Sleep Wellness Program',
        icon: 'solar:moon-bold-duotone',
        color: '#1A237E',
      });
    if (scores.stress > 60)
      recs.push({
        area: 'Stress',
        service: 'Aromatherapy + Massage',
        icon: 'solar:leaf-bold-duotone',
        color: SPA2_TEAL,
      });
    if (scores.skin < 50)
      recs.push({
        area: 'Làn da',
        service: 'Skin Assessment + Facial',
        icon: 'solar:face-scan-circle-bold-duotone',
        color: '#C2185B',
      });
    if (scores.energy < 50)
      recs.push({
        area: 'Năng lượng',
        service: 'Detox 7 ngày',
        icon: 'solar:sun-bold-duotone',
        color: '#EF9F27',
      });
    if (recs.length === 0)
      recs.push({
        area: 'Duy trì sức khỏe',
        service: 'Wellness Maintenance Package',
        icon: 'solar:star-bold-duotone',
        color: '#4CAF50',
      });
    return recs;
  };

  const SCORE_CONFIG = (s: number) =>
    s >= 70
      ? { label: 'Tốt', color: '#2E7D32', bg: '#E8F5E9' }
      : s >= 40
        ? { label: 'Trung bình', color: '#854F0B', bg: '#FEF3E2' }
        : { label: 'Cần cải thiện', color: '#C62828', bg: '#FFEBEE' };

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
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
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL_LIGHT,
            opacity: 0.1,
          }}
        />
        <Container sx={{ position: 'relative', textAlign: 'center' }}>
          <Stack spacing={2.5} alignItems="center">
            <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
              ĐÁNH GIÁ SỨC KHỎE
            </Typography>
            <Typography
              variant="h1"
              sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1, maxWidth: 700 }}
            >
              Wellness Score — Sức khỏe tổng thể của bạn
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 17, maxWidth: 560 }}>
              6 chỉ số quan trọng nhất — đánh giá nhanh và nhận lộ trình chăm sóc cá nhân hóa.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {!submitted ? (
            <Grid container spacing={4}>
              {/* Sliders */}
              <Grid xs={12} md={7}>
                <SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3 }}>
                    Di chuyển thanh trượt để đánh giá
                  </Typography>
                  <Stack spacing={3}>
                    {ASSESSMENT_QUESTIONS.map((q) => {
                      const scoreInfo = SCORE_CONFIG(scores[q.id]);
                      return (
                        <Box key={q.id}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Iconify icon={q.icon} width={18} sx={{ color: SPA2_TEAL }} />
                              <Typography sx={{ fontSize: 14, fontWeight: 500, color: SPA2_INK }}>
                                {q.label}
                              </Typography>
                            </Stack>
                            <Chip
                              label={scoreInfo.label}
                              size="small"
                              sx={{
                                bgcolor: scoreInfo.bg,
                                color: scoreInfo.color,
                                fontSize: 11,
                                height: 20,
                              }}
                            />
                          </Stack>
                          <Slider
                            value={scores[q.id]}
                            onChange={(_, v) => setScores({ ...scores, [q.id]: v as number })}
                            sx={{
                              color: SPA2_TEAL,
                              '& .MuiSlider-thumb': { width: 16, height: 16 },
                            }}
                          />
                          <Typography sx={{ fontSize: 12, color: 'text.disabled', mt: 0.5 }}>
                            {q.question}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </SoftCard>
              </Grid>

              {/* Score preview */}
              <Grid xs={12} md={5}>
                <Box sx={{ position: 'sticky', top: 100 }}>
                  <SoftCard sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>
                      Wellness Score
                    </Typography>
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        bgcolor: `${SCORE_CONFIG(totalScore).color}15`,
                        border: `6px solid ${SCORE_CONFIG(totalScore).color}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 32,
                          color: SCORE_CONFIG(totalScore).color,
                          lineHeight: 1,
                        }}
                      >
                        {totalScore}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: SCORE_CONFIG(totalScore).color }}>
                        / 100
                      </Typography>
                    </Box>
                    <Chip
                      label={SCORE_CONFIG(totalScore).label}
                      sx={{
                        bgcolor: SCORE_CONFIG(totalScore).bg,
                        color: SCORE_CONFIG(totalScore).color,
                        fontWeight: 600,
                        mb: 2,
                      }}
                    />
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      {ASSESSMENT_QUESTIONS.map((q) => (
                        <Stack
                          key={q.id}
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            {q.label}
                          </Typography>
                          <Box
                            sx={{
                              width: 80,
                              height: 5,
                              borderRadius: 99,
                              bgcolor: SPA2_CREAM_DARK,
                              overflow: 'hidden',
                            }}
                          >
                            <Box
                              sx={{
                                width: `${scores[q.id]}%`,
                                height: '100%',
                                bgcolor: SCORE_CONFIG(scores[q.id]).color,
                                borderRadius: 99,
                              }}
                            />
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                    <TextField
                      fullWidth
                      size="small"
                      label="Tên của bạn"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      sx={{ mb: 1.5 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Email nhận kết quả"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      fullWidth
                      disabled={!name || !email}
                      onClick={() => setSubmitted(true)}
                      sx={{
                        borderRadius: 99,
                        py: 1.4,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        '&.Mui-disabled': { bgcolor: SPA2_CREAM_DARK },
                      }}
                    >
                      Nhận kết quả & gợi ý
                    </Button>
                  </SoftCard>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Stack spacing={4}>
              {/* Result card */}
              <Card
                sx={{
                  p: 0,
                  borderRadius: 5,
                  overflow: 'hidden',
                  border: `2px solid ${SCORE_CONFIG(totalScore).color}`,
                  boxShadow: 'none',
                }}
              >
                <Box
                  sx={{
                    bgcolor: SCORE_CONFIG(totalScore).color,
                    p: 3,
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 0.5 }}>
                    Wellness Score của {name}: {totalScore}/100
                  </Typography>
                  <Typography sx={{ opacity: 0.85 }}>Kết quả đã được gửi đến {email}</Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {ASSESSMENT_QUESTIONS.map((q) => {
                      const info = SCORE_CONFIG(scores[q.id]);
                      return (
                        <Grid key={q.id} xs={6} sm={4}>
                          <Box
                            sx={{
                              p: 1.5,
                              bgcolor: info.bg,
                              borderRadius: 2.5,
                              textAlign: 'center',
                            }}
                          >
                            <Iconify icon={q.icon} width={20} sx={{ color: info.color, mb: 0.5 }} />
                            <Typography sx={{ fontSize: 12, color: SPA2_INK, fontWeight: 500 }}>
                              {q.label}
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight: 700, color: info.color }}>
                              {scores[q.id]}
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 2 }}>
                    Gợi ý liệu trình cho bạn:
                  </Typography>
                  <Stack spacing={1.5}>
                    {getRecommendations().map((rec) => (
                      <Stack
                        key={rec.area}
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ p: 2, bgcolor: SPA2_CREAM, borderRadius: 3 }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: `${rec.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Iconify icon={rec.icon} width={22} sx={{ color: rec.color }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            {rec.area}
                          </Typography>
                          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                            {rec.service}
                          </Typography>
                        </Box>
                        <Button
                          component={RouterLink}
                          href={paths.spa2.booking}
                          size="small"
                          sx={{
                            borderRadius: 99,
                            bgcolor: rec.color,
                            color: 'white',
                            fontSize: 12,
                            '&:hover': { opacity: 0.88, bgcolor: rec.color },
                          }}
                        >
                          Đặt lịch
                        </Button>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Card>
              <Button
                onClick={() => setSubmitted(false)}
                sx={{
                  alignSelf: 'center',
                  borderRadius: 99,
                  color: SPA2_TEAL_DARK,
                  border: `1.5px solid ${SPA2_TEAL}`,
                  px: 4,
                }}
              >
                Đánh giá lại
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      <GradientCta
        title="Sức khỏe tổng thể bắt đầu từ một bước nhỏ"
        sub="Đặt lịch tư vấn — chuyên gia lên lộ trình phù hợp cho bạn."
        btnLabel="Đặt lịch tư vấn miễn phí"
        href={paths.spa2.contact}
      />
    </Box>
  );
}
