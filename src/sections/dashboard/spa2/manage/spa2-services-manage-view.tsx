import type { ReactNode } from 'react';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  SPA2_SERVICES,
  spa2ServicesBanner,
  type Spa2ServiceItem,
  type Spa2ServiceStatus,
  SPA2_SERVICE_CATEGORIES,
  type Spa2AdjustableImage,
  SPA2_SERVICE_REGISTRATIONS,
  type Spa2ServiceRegistration,
  type Spa2ServiceRegistrationStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2Cta, Spa2PageHero, Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_SAGE,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block src/sections/spa2/view/spa2-content-pages.tsx's
// Spa2ServicesPageView renders on the public /spa2/services page: the page
// banner and the service catalogue itself — read from and written back in
// the same shape as src/_mock/_spa2 (the single source of truth shared with
// the public view).
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = SPA2_SERVICE_CATEGORIES.filter((c) => c.value !== 'all');
const PER_PAGE = 6;

// Cycled across the "Theo danh mục" ring widgets so each category reads as a
// distinct color while staying within the spa2 teal/sage palette.
const CATEGORY_COLORS = [SPA2_TEAL, SPA2_TEAL_DARK, SPA2_SAGE, SPA2_TEAL_LIGHT];

const STATUS_COLOR: Record<Spa2ServiceStatus, 'success' | 'default' | 'warning'> = {
  'Đang hiển thị': 'success',
  'Bản nháp': 'default',
  Ẩn: 'warning',
};

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// ---- Đăng ký dịch vụ (service registrations) ----
const REG_STATUS_COLOR: Record<
  Spa2ServiceRegistrationStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  contacted: 'warning',
  confirmed: 'success',
  cancelled: 'error',
};

const REG_STATUS_LABEL: Record<Spa2ServiceRegistrationStatus, string> = {
  new: 'Mới',
  contacted: 'Đã liên hệ',
  confirmed: 'Đã xác nhận',
  cancelled: 'Đã huỷ',
};

const REG_STATUS_OPTIONS: Spa2ServiceRegistrationStatus[] = [
  'new',
  'contacted',
  'confirmed',
  'cancelled',
];

type RegStatusFilter = Spa2ServiceRegistrationStatus | 'all';

const EMPTY_FORM: Spa2ServiceItem = {
  id: '',
  slug: '',
  category: 'massage',
  name: '',
  short: '',
  description: '',
  duration: '',
  price: 0,
  icon: 'solar:hand-stars-bold-duotone',
  image: '',
  benefits: [],
  status: 'Đang hiển thị',
  steps: [],
  beforeAfters: [],
  feedbacks: [],
  faqs: [],
  gallery: [],
};

// Spa2ServiceItem.image is a plain URL string (no focal point/zoom fields on
// the shared type), but Spa2ImageField needs a full Spa2AdjustableImage. This
// local-only adjust state lets the dialog offer drag-drop + focal/zoom
// editing UX without changing the persisted Spa2ServiceItem shape.
type ImageAdjust = Pick<Spa2AdjustableImage, 'focalX' | 'focalY' | 'zoom'>;
const DEFAULT_IMAGE_ADJUST: ImageAdjust = { focalX: 50, focalY: 50, zoom: 100 };

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon={icon} width={22} sx={{ color: SPA2_TEAL }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Stack>
        {action}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Card>
  );
}

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

// Mirrors Spa2ServicesPageView's real service card markup exactly (same
// Spa2SoftCard, same icon+name row, short text, duration+price chips, "Xem
// chi tiết" button) so admin previews can never visually drift from the
// public page. `interactive` is true only for real, already-saved items
// (the full-page "preview" tab) where paths.spa2.serviceDetails(slug) is a
// valid live link; it's false for the in-progress add/edit dialog, where the
// slug may not exist yet, so the button is shown disabled instead.
function Spa2ServiceCardPreview({
  item,
  interactive = false,
}: {
  item: Pick<Spa2ServiceItem, 'slug' | 'name' | 'short' | 'icon' | 'image' | 'duration' | 'price'>;
  interactive?: boolean;
}) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          height: 220,
          bgcolor: SPA2_CREAM_DARK,
          backgroundImage: item.image ? `url(${item.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <Iconify
            icon={item.icon || 'solar:hand-stars-bold-duotone'}
            sx={{ color: SPA2_TEAL }}
            width={28}
          />
          <Typography variant="h6" sx={{ color: SPA2_INK }}>
            {item.name || 'Tên dịch vụ'}
          </Typography>
        </Stack>
        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          {item.short || 'Mô tả ngắn của dịch vụ…'}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            size="small"
            label={item.duration || '—'}
            sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
          />
          <Chip
            size="small"
            label={formatVND(item.price)}
            sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
          />
        </Stack>
        {interactive ? (
          <Button
            component={RouterLink}
            href={paths.spa2.serviceDetails(item.slug)}
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{ color: SPA2_TEAL_DARK, p: 0, '&:hover': { bgcolor: 'transparent' } }}
          >
            Xem chi tiết
          </Button>
        ) : (
          <Button
            disabled
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{ color: SPA2_TEAL_DARK, p: 0 }}
          >
            Xem chi tiết
          </Button>
        )}
      </Box>
    </Spa2SoftCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2ServicesManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2ServicesBanner,
    image: { ...spa2ServicesBanner.image },
  }));
  const [items, setItems] = useState<Spa2ServiceItem[]>([...SPA2_SERVICES]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Spa2ServiceStatus>('all');
  const [sortBy, setSortBy] = useState<'default' | 'name-asc' | 'price-asc' | 'price-desc'>(
    'default'
  );
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Spa2ServiceItem>(EMPTY_FORM);
  const [benefitsText, setBenefitsText] = useState('');
  const [imageAdjust, setImageAdjust] = useState<ImageAdjust>(DEFAULT_IMAGE_ADJUST);

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'registrations' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Đăng ký dịch vụ ----
  const [registrations, setRegistrations] = useState<Spa2ServiceRegistration[]>([
    ...SPA2_SERVICE_REGISTRATIONS,
  ]);
  const [regSearch, setRegSearch] = useState('');
  const [regFilterStatus, setRegFilterStatus] = useState<RegStatusFilter>('all');
  const [regViewItem, setRegViewItem] = useState<Spa2ServiceRegistration | null>(null);
  const regTable = useTable({ defaultRowsPerPage: 5 });

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // Live counts for the KPI cards — recomputed from `items` (not hardcoded)
  // so they stay correct as services are added/edited/removed.
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach((c) => {
      counts[c.value] = items.filter((s) => s.category === c.value).length;
    });
    return counts;
  }, [items]);

  const statusCounts = useMemo(
    () => ({
      'Đang hiển thị': items.filter((s) => s.status === 'Đang hiển thị').length,
      'Bản nháp': items.filter((s) => s.status === 'Bản nháp').length,
      Ẩn: items.filter((s) => s.status === 'Ẩn').length,
    }),
    [items]
  );

  const filtered = useMemo(() => {
    let list = items.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'all') list = list.filter((s) => s.category === category);
    if (statusFilter !== 'all') list = list.filter((s) => s.status === statusFilter);
    return list;
  }, [items, search, category, statusFilter]);

  // Sort is applied on top of the filtered set; Spa2ServiceItem has no
  // created/order field, so "newest" isn't meaningful — only name/price sorts.
  const sortedFiltered = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case 'name-asc':
        arr.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
        break;
      case 'price-asc':
        arr.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        arr.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return arr;
  }, [filtered, sortBy]);

  const pageCount = Math.max(1, Math.ceil(sortedFiltered.length / PER_PAGE));
  const paginated = sortedFiltered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleChange =
    (field: keyof Spa2ServiceItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = useCallback(() => {
    setForm(EMPTY_FORM);
    setBenefitsText('');
    setImageAdjust(DEFAULT_IMAGE_ADJUST);
    setEditSlug(null);
    setOpenForm(true);
  }, []);

  const updateFormImage = useCallback((img: Spa2AdjustableImage) => {
    setForm((p) => ({ ...p, image: img.url }));
    setImageAdjust({ focalX: img.focalX, focalY: img.focalY, zoom: img.zoom });
  }, []);

  const handleSubmit = useCallback(() => {
    const benefits = benefitsText
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    const newItem: Spa2ServiceItem = { ...form, slug, benefits };
    if (editSlug) {
      setItems((p) => p.map((s) => (s.slug === editSlug ? newItem : s)));
    } else {
      setItems((p) => [...p, newItem]);
    }
    setOpenForm(false);
    markDirty();
  }, [form, editSlug, benefitsText]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((s) => s.slug !== deleteSlug));
    setDeleteSlug(null);
    markDirty();
  }, [deleteSlug]);

  const handleToggle = useCallback((slug: string) => {
    setItems((p) =>
      p.map((s) =>
        s.slug === slug
          ? { ...s, status: s.status === 'Đang hiển thị' ? 'Ẩn' : 'Đang hiển thị' }
          : s
      )
    );
    markDirty();
  }, []);

  // ---- Đăng ký dịch vụ ----
  const filteredRegistrations = useMemo(
    () =>
      registrations.filter((r) => {
        const q = regSearch.toLowerCase();
        const matchSearch =
          !q ||
          r.customer.toLowerCase().includes(q) ||
          r.phone.includes(regSearch) ||
          r.email.toLowerCase().includes(q) ||
          r.serviceName.toLowerCase().includes(q);
        const matchStatus = regFilterStatus === 'all' || r.status === regFilterStatus;
        return matchSearch && matchStatus;
      }),
    [registrations, regSearch, regFilterStatus]
  );

  const handleSetRegStatus = useCallback((id: number, status: Spa2ServiceRegistrationStatus) => {
    setRegistrations((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
    setRegViewItem((v) => (v?.id === id ? { ...v, status } : v));
  }, []);

  const regCounts = {
    all: registrations.length,
    new: registrations.filter((r) => r.status === 'new').length,
    contacted: registrations.filter((r) => r.status === 'contacted').length,
    confirmed: registrations.filter((r) => r.status === 'confirmed').length,
    cancelled: registrations.filter((r) => r.status === 'cancelled').length,
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ServicesBanner, image: { ...spa2ServicesBanner.image } });
    setItems([...SPA2_SERVICES]);
    setRegistrations([...SPA2_SERVICE_REGISTRATIONS]);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('services.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.services')}
      publicPath={paths.spa2.services}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={!dirty}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            {t('common.discard_changes')}
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{
              borderRadius: 50,
              px: 3,
              bgcolor: 'common.white',
              color: SPA2_TEAL,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
            }}
          >
            {t('common.save_changes')}
          </Button>
        </>
      }
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        {dirty && (
          <Chip
            size="small"
            variant="soft"
            color="warning"
            label={t('common.unsaved_changes')}
            icon={<Iconify icon="solar:pen-bold" width={14} />}
          />
        )}
        {savedAt && !dirty && (
          <Chip
            size="small"
            variant="soft"
            color="success"
            label={t('common.saved_at', { time: savedAt.toLocaleTimeString('vi-VN') })}
            icon={<Iconify icon="solar:check-circle-bold" width={14} />}
          />
        )}
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 64,
          zIndex: 1,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="banner"
          label={t('services.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('services.list_section')}
          icon={<Iconify icon="solar:hand-stars-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="registrations"
          label="Đăng ký dịch vụ"
          icon={<Iconify icon="solar:user-plus-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner — left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('services.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('services.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('services.banner_image_help')}
                />
                <TextField
                  label={t('services.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('services.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('services.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Spa2PageHero
                  image={banner.image.url}
                  imageStyle={banner.image}
                  eyebrow={banner.eyebrow}
                  title={banner.title}
                  subtitle={banner.subtitle}
                />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Danh sách dịch vụ */}
      {tab === 'list' && (
        <>
          {/* Thống kê — số lượng dịch vụ theo danh mục & trạng thái, tính trực tiếp
              từ danh sách hiện tại; bấm vào từng vòng tròn để lọc (đồng bộ với ô
              lọc bên dưới). Phỏng theo InvoiceAnalytic của trang dashboard/invoice. */}
          <Card sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                px: 2.5,
                pt: 2,
                display: 'block',
                color: 'text.secondary',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Theo danh mục
            </Typography>
            <Scrollbar sx={{ minHeight: 108 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2 }}
              >
                <Spa2ListAnalytic
                  title="Tất cả"
                  total={items.length}
                  percent={100}
                  icon="solar:hand-stars-bold-duotone"
                  color={SPA2_TEAL}
                  unitLabel="dịch vụ"
                  active={category === 'all'}
                  onClick={() => {
                    setCategory('all');
                    setPage(1);
                  }}
                />

                {CATEGORIES.map((c, index) => (
                  <Spa2ListAnalytic
                    key={c.value}
                    title={c.label}
                    total={categoryCounts[c.value] ?? 0}
                    percent={
                      items.length ? ((categoryCounts[c.value] ?? 0) / items.length) * 100 : 0
                    }
                    icon="solar:folder-bold-duotone"
                    color={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    unitLabel="dịch vụ"
                    active={category === c.value}
                    onClick={() => {
                      setCategory(c.value);
                      setPage(1);
                    }}
                  />
                ))}
              </Stack>
            </Scrollbar>
          </Card>

          <Card sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              sx={{
                px: 2.5,
                pt: 2,
                display: 'block',
                color: 'text.secondary',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Theo trạng thái
            </Typography>
            <Scrollbar sx={{ minHeight: 108 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2 }}
              >
                <Spa2ListAnalytic
                  title="Tất cả"
                  total={items.length}
                  percent={100}
                  icon="solar:notebook-bold-duotone"
                  color={theme.vars.palette.info.main}
                  unitLabel="dịch vụ"
                  active={statusFilter === 'all'}
                  onClick={() => {
                    setStatusFilter('all');
                    setPage(1);
                  }}
                />

                <Spa2ListAnalytic
                  title="Đang hiển thị"
                  total={statusCounts['Đang hiển thị']}
                  percent={
                    items.length ? (statusCounts['Đang hiển thị'] / items.length) * 100 : 0
                  }
                  icon="solar:eye-bold-duotone"
                  color={theme.vars.palette.success.main}
                  unitLabel="dịch vụ"
                  active={statusFilter === 'Đang hiển thị'}
                  onClick={() => {
                    setStatusFilter('Đang hiển thị');
                    setPage(1);
                  }}
                />

                <Spa2ListAnalytic
                  title="Bản nháp"
                  total={statusCounts['Bản nháp']}
                  percent={items.length ? (statusCounts['Bản nháp'] / items.length) * 100 : 0}
                  icon="solar:pen-bold"
                  color={theme.vars.palette.text.secondary}
                  unitLabel="dịch vụ"
                  active={statusFilter === 'Bản nháp'}
                  onClick={() => {
                    setStatusFilter('Bản nháp');
                    setPage(1);
                  }}
                />

                <Spa2ListAnalytic
                  title="Ẩn"
                  total={statusCounts.Ẩn}
                  percent={items.length ? (statusCounts.Ẩn / items.length) * 100 : 0}
                  icon="solar:eye-closed-bold"
                  color={theme.vars.palette.warning.main}
                  unitLabel="dịch vụ"
                  active={statusFilter === 'Ẩn'}
                  onClick={() => {
                    setStatusFilter('Ẩn');
                    setPage(1);
                  }}
                />
              </Stack>
            </Scrollbar>
          </Card>

          {/* Filter bar */}
          <Card
            sx={{
              p: 2.5,
              mb: 4,
              borderRadius: 4,
              bgcolor: SPA2_CREAM,
              border: `1px solid ${SPA2_CREAM_DARK}`,
              boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder={t('services.search_placeholder')}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Danh mục"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  {SPA2_SERVICE_CATEGORIES.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={6} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Sắp xếp"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(
                      e.target.value as 'default' | 'name-asc' | 'price-asc' | 'price-desc'
                    );
                    setPage(1);
                  }}
                >
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="name-asc">Tên A-Z</MenuItem>
                  <MenuItem value="price-asc">Giá thấp → cao</MenuItem>
                  <MenuItem value="price-desc">Giá cao → thấp</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Card>

          <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreate}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('services.add_btn')}
            </Button>
          </Stack>

          {/* Service cards grid (matches public view, uniform sizing) */}
          <Grid container spacing={2}>
            {paginated.map((item) => (
              <Grid key={item.slug} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    p: 0,
                    overflow: 'hidden',
                    borderRadius: 4,
                    bgcolor: 'common.white',
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all .25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(46,139,122,0.15)',
                      borderColor: SPA2_TEAL_LIGHT,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        height: 220,
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Chip
                      label={
                        CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category
                      }
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        color: SPA2_TEAL_DARK,
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={item.status}
                      size="small"
                      color={STATUS_COLOR[item.status]}
                      sx={{ position: 'absolute', top: 12, right: 12 }}
                    />
                  </Box>

                  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                      <Iconify icon={item.icon} sx={{ color: SPA2_TEAL }} width={28} />
                      <Typography variant="h6" sx={{ color: SPA2_INK }}>
                        {item.name}
                      </Typography>
                    </Stack>
                    <Typography sx={{ color: 'text.secondary', mb: 2, minHeight: 44, flexGrow: 1 }}>
                      {item.short}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        size="small"
                        label={item.duration}
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                      />
                      <Chip
                        size="small"
                        label={formatVND(item.price)}
                        sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1} justifyContent="space-between">
                      <Button
                        component={RouterLink}
                        href={paths.dashboard.spa2.serviceDetails(item.slug)}
                        size="small"
                        startIcon={<Iconify icon="solar:pen-bold" />}
                        sx={{ color: SPA2_TEAL_DARK, p: 0, '&:hover': { bgcolor: 'transparent' } }}
                      >
                        Chỉnh sửa
                      </Button>
                      <Stack direction="row" spacing={0.5}>
                        <Tooltip title={item.status === 'Đang hiển thị' ? 'Ẩn' : 'Hiện'}>
                          <IconButton size="small" onClick={() => handleToggle(item.slug)}>
                            <Iconify
                              icon={
                                item.status === 'Đang hiển thị'
                                  ? 'solar:eye-closed-bold'
                                  : 'solar:eye-bold'
                              }
                              color={
                                item.status === 'Đang hiển thị' ? 'warning.main' : 'success.main'
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteSlug(item.slug)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}

            {filtered.length === 0 && (
              <Grid xs={12}>
                <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 10 }}>
                  <Iconify icon="solar:leaf-linear" width={48} sx={{ color: SPA2_SAGE, mb: 2 }} />
                  <Typography>{t('common.no_data')}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {pageCount > 1 && (
            <Stack alignItems="center" sx={{ mt: 4 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, v) => setPage(v)}
                shape="rounded"
                sx={{
                  '& .Mui-selected': {
                    bgcolor: `${SPA2_TEAL} !important`,
                    color: 'white',
                  },
                }}
              />
            </Stack>
          )}
        </>
      )}

      {/* Đăng ký dịch vụ */}
      {tab === 'registrations' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:user-plus-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Đăng ký dịch vụ
              </Typography>
            </Stack>
          </Box>

          {/* KPI */}
          <Grid container spacing={2} sx={{ p: 2.5 }}>
            {[
              {
                key: 'all',
                label: 'Tất cả',
                value: regCounts.all,
                icon: 'solar:user-plus-bold-duotone',
              },
              {
                key: 'new',
                label: REG_STATUS_LABEL.new,
                value: regCounts.new,
                icon: 'solar:bell-bing-bold-duotone',
              },
              {
                key: 'contacted',
                label: REG_STATUS_LABEL.contacted,
                value: regCounts.contacted,
                icon: 'solar:phone-calling-bold-duotone',
              },
              {
                key: 'confirmed',
                label: REG_STATUS_LABEL.confirmed,
                value: regCounts.confirmed,
                icon: 'solar:check-circle-bold-duotone',
              },
              {
                key: 'cancelled',
                label: REG_STATUS_LABEL.cancelled,
                value: regCounts.cancelled,
                icon: 'solar:close-circle-bold-duotone',
              },
            ].map((k) => (
              <Grid key={k.key} xs={6} md={2.4}>
                <Card
                  onClick={() => {
                    setRegFilterStatus(k.key as RegStatusFilter);
                    regTable.onResetPage();
                  }}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: regFilterStatus === k.key ? `${SPA2_TEAL}12` : SPA2_CREAM,
                    transition: 'all .2s',
                    '&:hover': { borderColor: SPA2_TEAL },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: `${SPA2_TEAL}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={k.icon} width={22} sx={{ color: SPA2_TEAL_DARK }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}>
                      {k.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {k.label}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder="Tìm theo tên, SĐT, email hoặc dịch vụ..."
              value={regSearch}
              onChange={(e) => {
                setRegSearch(e.target.value);
                regTable.onResetPage();
              }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Box sx={{ px: 2.5 }}>
            <Tabs
              value={regFilterStatus}
              onChange={(_, v) => {
                setRegFilterStatus(v);
                regTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${regCounts.all})`} />
              <Tab value="new" label={`${REG_STATUS_LABEL.new} (${regCounts.new})`} />
              <Tab
                value="contacted"
                label={`${REG_STATUS_LABEL.contacted} (${regCounts.contacted})`}
              />
              <Tab
                value="confirmed"
                label={`${REG_STATUS_LABEL.confirmed} (${regCounts.confirmed})`}
              />
              <Tab
                value="cancelled"
                label={`${REG_STATUS_LABEL.cancelled} (${regCounts.cancelled})`}
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Dịch vụ</TableCell>
                  <TableCell>Chi nhánh</TableCell>
                  <TableCell>Ngày đăng ký</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRegistrations
                  .slice(
                    regTable.page * regTable.rowsPerPage,
                    regTable.page * regTable.rowsPerPage + regTable.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.phone}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2">{item.serviceName}</Typography>
                          <Chip
                            size="small"
                            label={item.serviceSlug}
                            sx={{
                              mt: 0.5,
                              width: 'fit-content',
                              bgcolor: SPA2_CREAM,
                              color: SPA2_TEAL_DARK,
                              fontSize: 11,
                            }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Iconify
                            icon="solar:map-point-bold"
                            width={14}
                            sx={{ color: SPA2_TEAL }}
                          />
                          <Typography variant="body2">{item.branch}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.createdAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={REG_STATUS_LABEL[item.status]}
                          color={REG_STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'new' && (
                            <>
                              <Tooltip title="Đánh dấu đã liên hệ">
                                <IconButton
                                  size="small"
                                  color="warning"
                                  onClick={() => handleSetRegStatus(item.id, 'contacted')}
                                >
                                  <Iconify icon="solar:phone-calling-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ đăng ký">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetRegStatus(item.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {item.status === 'contacted' && (
                            <>
                              <Tooltip title="Xác nhận">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetRegStatus(item.id, 'confirmed')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ đăng ký">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetRegStatus(item.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="Xem chi tiết">
                            <IconButton size="small" onClick={() => setRegViewItem(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredRegistrations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      {t('common.no_data')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filteredRegistrations.length}
            page={regTable.page}
            rowsPerPage={regTable.rowsPerPage}
            onPageChange={regTable.onChangePage}
            onRowsPerPageChange={regTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full-page live preview — pixel-for-pixel same layout/order as the public /spa2/services page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Box sx={{ bgcolor: 'background.default' }}>
            <Spa2PageHero
              image={banner.image.url}
              imageStyle={banner.image}
              eyebrow={banner.eyebrow}
              title={banner.title}
              subtitle={banner.subtitle}
            />
            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Container>
                {/* Bộ lọc — static illustration only (search/sort aren't live here, they're on the admin list itself) */}
                <Spa2SoftCard sx={{ mb: 5 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid xs={12} md={5}>
                      <TextField
                        fullWidth
                        disabled
                        placeholder="Tìm kiếm dịch vụ..."
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid xs={6} md={4}>
                      <TextField fullWidth disabled select label="Danh mục" value="all">
                        <MenuItem value="all">Tất cả</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid xs={6} md={3}>
                      <TextField fullWidth disabled select label="Sắp xếp" value="default">
                        <MenuItem value="default">Mặc định</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </Spa2SoftCard>

                <Grid container spacing={4}>
                  {paginated.map((item) => (
                    <Grid key={item.slug} xs={12} sm={6} md={4}>
                      <Spa2ServiceCardPreview item={item} interactive />
                    </Grid>
                  ))}
                  {filtered.length === 0 && (
                    <Grid xs={12}>
                      <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 8 }}>
                        Không tìm thấy dịch vụ phù hợp.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Container>
            </Box>
            <Spa2Cta />
          </Box>
        </Box>
      )}

      {/* Form dialog — left: edit, right: live preview of the card being created */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: SPA2_CREAM, color: SPA2_INK, fontWeight: 700 }}>
          {editSlug ? t('services.form_edit') : t('services.add_btn')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: SPA2_CREAM,
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                  }}
                >
                  <TextField
                    label="Trạng thái"
                    select
                    value={form.status}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, status: e.target.value as Spa2ServiceStatus }))
                    }
                    fullWidth
                    size="small"
                    sx={{ bgcolor: 'common.white', borderRadius: 1 }}
                  >
                    <MenuItem value="Đang hiển thị">Đang hiển thị</MenuItem>
                    <MenuItem value="Bản nháp">Bản nháp</MenuItem>
                    <MenuItem value="Ẩn">Ẩn</MenuItem>
                  </TextField>
                </Box>
                <TextField
                  label={t('services.form_name')}
                  value={form.name}
                  onChange={handleChange('name')}
                  fullWidth
                />
                <TextField
                  select
                  label={t('services.form_category')}
                  value={form.category}
                  onChange={handleChange('category')}
                  fullWidth
                >
                  {CATEGORIES.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label={t('services.form_short')}
                  value={form.short}
                  onChange={handleChange('short')}
                  fullWidth
                  multiline
                  rows={2}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('services.form_duration')}
                    value={form.duration}
                    onChange={handleChange('duration')}
                    fullWidth
                  />
                  <TextField
                    label={t('services.col_price')}
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
                    fullWidth
                  />
                </Stack>
                <Spa2ImageField
                  label={t('common.image_url')}
                  value={{ url: form.image, ...imageAdjust }}
                  onChange={updateFormImage}
                  height={180}
                  helperText="Kéo thả ảnh, dán URL, hoặc tải ảnh từ máy — kéo trên ảnh để chọn điểm lấy nét."
                />
                <TextField
                  label="Icon (solar:*)"
                  value={form.icon}
                  onChange={handleChange('icon')}
                  fullWidth
                />
                <TextField
                  label={t('services.form_benefits')}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <Spa2ServiceCardPreview
                  item={{
                    slug: form.slug,
                    name: form.name,
                    short: form.short,
                    icon: form.icon,
                    image: form.image,
                    duration: form.duration,
                    price: form.price,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenForm(false)} sx={{ borderRadius: 999 }}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name}
            sx={{ borderRadius: 999, bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editSlug ? t('services.form_edit') : t('services.add_btn')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteSlug}
        onClose={() => setDeleteSlug(null)}
        title={t('services.delete_title')}
        content={t('services.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Đăng ký dịch vụ — xem chi tiết */}
      <Dialog open={!!regViewItem} onClose={() => setRegViewItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          Chi tiết đăng ký #{regViewItem?.id}
        </DialogTitle>
        <DialogContent dividers>
          {regViewItem && (
            <Stack spacing={1.5}>
              {[
                ['Khách hàng', regViewItem.customer],
                ['Điện thoại', regViewItem.phone],
                ['Email', regViewItem.email],
                ['Dịch vụ', regViewItem.serviceName],
                ['Chi nhánh', regViewItem.branch],
                ['Ngày đăng ký', regViewItem.createdAt],
                ['Ghi chú', regViewItem.note || '–'],
              ].map(([label, value]) => (
                <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                  Trạng thái:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={regViewItem.status}
                  onChange={(e) =>
                    handleSetRegStatus(
                      regViewItem.id,
                      e.target.value as Spa2ServiceRegistrationStatus
                    )
                  }
                  sx={{ flex: 1 }}
                >
                  {REG_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {REG_STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegViewItem(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
