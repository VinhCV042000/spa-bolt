import type { ReactNode } from 'react';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2Services,
  SPA2_BOOKINGS,
  spa2BookingBanner,
  spa2BookingPackages,
  type Spa2BookingItem,
  SPA2_BOOKING_BRANCHES,
  type Spa2BookingStatus,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  Spa2Cta,
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every content block src/sections/spa2/view/spa2-content-pages.tsx
// (Spa2BookingPageView) renders on the public /spa2/booking page — banner and
// treatment packages — plus the actual customer booking requests, all in one
// place. Package/banner data is read from and written back in the same shape
// as src/_mock/_spa2 (the single source of truth shared with the public
// view); booking requests are the operational queue admins triage day to day.
// ─────────────────────────────────────────────────────────────────────────────

type PackageItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  sessions: number;
  hot: boolean;
  perks: string[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `goi-${Date.now()}`;

const EMPTY_PACKAGE: Omit<PackageItem, 'id' | 'slug'> = {
  name: '',
  price: 0,
  sessions: 1,
  hot: false,
  perks: [],
};

const STATUS_COLOR: Record<Spa2BookingStatus, 'warning' | 'success' | 'error' | 'default'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'error',
  completed: 'default',
};

const STATUS_LABEL: Record<Spa2BookingStatus, string> = {
  pending: 'bookings.status_pending',
  confirmed: 'bookings.status_confirmed',
  cancelled: 'bookings.status_cancelled',
  completed: 'bookings.status_completed',
};

const STATUS_OPTIONS: Spa2BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];

type StatusFilter = Spa2BookingStatus | 'all';

const formatVND = (n: number) => `${fCurrency(n)} ₫`;

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
    <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
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

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BookingsManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');
  const statusLabel = (s: Spa2BookingStatus) => t(STATUS_LABEL[s]);

  const [banner, setBanner] = useState(() => ({
    ...spa2BookingBanner,
    image: { ...spa2BookingBanner.image },
  }));
  const [packages, setPackages] = useState<PackageItem[]>(() =>
    spa2BookingPackages.map((p) => ({ ...p, id: p.slug }))
  );
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'packages' | 'requests' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Preview tab: simplified static category switcher over the same
  // spa2Services data Spa2BookingPageView filters by category ----
  const previewCategories = useMemo(
    () => Array.from(new Set(spa2Services.map((s) => s.category))),
    []
  );
  const [previewCategory, setPreviewCategory] = useState<string>(previewCategories[0] ?? '');
  const previewServices = spa2Services.filter((s) => s.category === previewCategory);

  const [items, setItems] = useState<Spa2BookingItem[]>(SPA2_BOOKINGS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [viewItem, setViewItem] = useState<Spa2BookingItem | null>(null);
  const table = useTable({ defaultRowsPerPage: 5 });

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Packages CRUD ----
  const [packageDialog, setPackageDialog] = useState(false);
  const [packageEditId, setPackageEditId] = useState<string | null>(null);
  const [packageForm, setPackageForm] = useState<
    Omit<PackageItem, 'id' | 'slug'> & {
      perksInput: string;
    }
  >({ ...EMPTY_PACKAGE, perksInput: '' });
  const [packageDeleteId, setPackageDeleteId] = useState<string | null>(null);
  // Same parsing rule as submitPackage - keeps the live preview in sync with what gets saved.
  const packageFormPerks = packageForm.perksInput
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

  const openCreatePackage = () => {
    setPackageForm({ ...EMPTY_PACKAGE, perksInput: '' });
    setPackageEditId(null);
    setPackageDialog(true);
  };
  const openEditPackage = (p: PackageItem) => {
    setPackageForm({
      name: p.name,
      price: p.price,
      sessions: p.sessions,
      hot: p.hot,
      perks: p.perks,
      perksInput: p.perks.join(', '),
    });
    setPackageEditId(p.id);
    setPackageDialog(true);
  };
  const submitPackage = () => {
    const perks = packageForm.perksInput
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean);
    if (packageEditId) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === packageEditId
            ? {
                ...p,
                name: packageForm.name,
                price: Number(packageForm.price),
                sessions: Number(packageForm.sessions),
                hot: packageForm.hot,
                perks,
              }
            : p
        )
      );
    } else {
      const slug = slugify(packageForm.name);
      setPackages((prev) => [
        ...prev,
        {
          id: slug,
          slug,
          name: packageForm.name,
          price: Number(packageForm.price),
          sessions: Number(packageForm.sessions),
          hot: packageForm.hot,
          perks,
        },
      ]);
    }
    setPackageDialog(false);
    markDirty();
  };
  const confirmDeletePackage = () => {
    setPackages((prev) => prev.filter((p) => p.id !== packageDeleteId));
    setPackageDeleteId(null);
    markDirty();
  };
  const reorderPackages = (next: PackageItem[]) => {
    setPackages(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2BookingBanner, image: { ...spa2BookingBanner.image } });
    setPackages(spa2BookingPackages.map((p) => ({ ...p, id: p.slug })));
    setItems(SPA2_BOOKINGS);
    setDirty(false);
  };

  // ---- Booking requests ----
  const filtered = useMemo(
    () =>
      items.filter((b) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          b.customer.toLowerCase().includes(q) ||
          b.service.toLowerCase().includes(q) ||
          b.phone.includes(search);
        const matchStatus = filterStatus === 'all' || b.status === filterStatus;
        const matchBranch = filterBranch === 'all' || b.branch === filterBranch;
        return matchSearch && matchStatus && matchBranch;
      }),
    [items, search, filterStatus, filterBranch]
  );

  const handleSetStatus = useCallback((id: number, status: Spa2BookingStatus) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status } : v));
  }, []);

  const counts = {
    all: items.length,
    pending: items.filter((b) => b.status === 'pending').length,
    confirmed: items.filter((b) => b.status === 'confirmed').length,
    completed: items.filter((b) => b.status === 'completed').length,
    cancelled: items.filter((b) => b.status === 'cancelled').length,
  };

  const packageBookingCount = (slug: string) =>
    items.filter((b) => b.packageSlug === slug && b.status !== 'cancelled').length;

  return (
    <Spa2ManageShell
      title={t('bookings.page_title')}
      description="Banner, gói liệu trình và danh sách đặt lịch của khách – dữ liệu đồng bộ với trang đặt lịch công khai."
      breadcrumbLabel={t('nav.bookings')}
      publicPath={paths.spa2.booking}
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
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
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
      </Stack>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v: 'banner' | 'packages' | 'requests' | 'preview') => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 64,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="banner"
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
          label={t('bookings.banner_section')}
        />
        <Tab
          value="packages"
          icon={<Iconify icon="solar:wallet-money-bold-duotone" width={20} />}
          iconPosition="start"
          label={t('bookings.packages_section')}
        />
        <Tab
          value="requests"
          icon={<Iconify icon="solar:calendar-bold-duotone" width={20} />}
          iconPosition="start"
          label={t('bookings.page_title')}
        />
        <Tab
          value="preview"
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
          label={t('common.preview_btn')}
        />
      </Tabs>

      {/* Banner - left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('bookings.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('bookings.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('bookings.banner_image_help')}
                />
                <TextField
                  label={t('bookings.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('bookings.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('bookings.banner_subtitle')}
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

      {/* Gói liệu trình */}
      {tab === 'packages' && (
        <SectionCard
          title={t('bookings.packages_section')}
          icon="solar:wallet-money-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreatePackage}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('bookings.packages_add')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('common.drag_hint')}
          </Typography>
          {packages.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('bookings.packages_empty')}
            </Typography>
          )}
          <Spa2SortableGrid items={packages} onReorder={reorderPackages}>
            <Grid container spacing={2} alignItems="stretch">
              {packages.map((p) => (
                <Grid key={p.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={p.id}>
                    {(sortable) => (
                      <Stack
                        spacing={1}
                        sx={{
                          p: 2,
                          height: '100%',
                          borderRadius: 2,
                          position: 'relative',
                          bgcolor: SPA2_CREAM,
                          border: p.hot ? `1.5px solid ${SPA2_TEAL}` : undefined,
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title={t('common.edit')}>
                              <IconButton size="small" onClick={() => openEditPackage(p)}>
                                <Iconify icon="solar:pen-bold" width={16} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('common.delete')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setPackageDeleteId(p.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                        {p.hot && (
                          <Chip
                            label="PHỔ BIẾN NHẤT"
                            size="small"
                            sx={{
                              alignSelf: 'flex-start',
                              bgcolor: SPA2_TEAL,
                              color: 'common.white',
                              fontWeight: 700,
                              fontSize: 10,
                              height: 20,
                            }}
                          />
                        )}
                        <Typography variant="subtitle2" sx={{ color: SPA2_INK }}>
                          {p.name || '(Chưa đặt tên)'}
                        </Typography>
                        <Typography variant="h6" sx={{ color: SPA2_TEAL }}>
                          {formatVND(p.price)}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            {p.sessions} buổi
                          </Typography>
                          <Chip
                            size="small"
                            label={`${packageBookingCount(p.slug)} đặt`}
                            sx={{
                              bgcolor: `${SPA2_TEAL}15`,
                              color: SPA2_TEAL_DARK,
                              fontSize: 11,
                              height: 20,
                            }}
                          />
                        </Stack>
                        <Divider />
                        <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
                          {p.perks.slice(0, 3).map((perk) => (
                            <Stack key={perk} direction="row" spacing={0.75} alignItems="center">
                              <Iconify
                                icon="solar:check-circle-bold"
                                width={12}
                                sx={{ color: SPA2_TEAL }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {perk}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Danh sách đặt lịch */}
      {tab === 'requests' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:calendar-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('bookings.page_title')}
              </Typography>
            </Stack>
          </Box>

          {/* KPI */}
          <Scrollbar sx={{ mb: 1, minHeight: 108 }}>
            <Stack spacing={2} direction="row" sx={{ py: 2, px: 1 }}>
              {[
                {
                  key: 'all',
                  label: t('common.all'),
                  value: counts.all,
                  icon: 'solar:calendar-bold-duotone',
                },
                {
                  key: 'pending',
                  label: statusLabel('pending'),
                  value: counts.pending,
                  icon: 'solar:hourglass-bold-duotone',
                },
                {
                  key: 'confirmed',
                  label: statusLabel('confirmed'),
                  value: counts.confirmed,
                  icon: 'solar:check-circle-bold-duotone',
                },
                {
                  key: 'completed',
                  label: statusLabel('completed'),
                  value: counts.completed,
                  icon: 'solar:diploma-bold-duotone',
                },
                {
                  key: 'cancelled',
                  label: statusLabel('cancelled'),
                  value: counts.cancelled,
                  icon: 'solar:close-circle-bold-duotone',
                },
              ].map((k) => (
                <Card
                  onClick={() => {
                    setFilterStatus(k.key as StatusFilter);
                    table.onResetPage();
                  }}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    width: 1,
                    minWidth: 180,
                    bgcolor: filterStatus === k.key ? `${SPA2_TEAL}12` : SPA2_CREAM,
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
              ))}
            </Stack>
          </Scrollbar>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder={t('bookings.search_placeholder')}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                table.onResetPage();
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
            <TextField
              select
              size="small"
              value={filterBranch}
              onChange={(e) => {
                setFilterBranch(e.target.value);
                table.onResetPage();
              }}
              sx={{ minWidth: 180 }}
              label={t('bookings.col_branch')}
            >
              <MenuItem value="all">{t('common.all')}</MenuItem>
              {SPA2_BOOKING_BRANCHES.map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Box sx={{ px: 2.5 }}>
            <Tabs
              value={filterStatus}
              onChange={(_, v) => {
                setFilterStatus(v);
                table.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab
                value="all"
                label={`${t('common.all')}`}
                iconPosition="end"
                icon={
                  <Label variant={(filterStatus === 'all' && 'filled') || 'soft'} color="default">
                    {counts.all}
                  </Label>
                }
              />
              <Tab
                value="pending"
                label={`${statusLabel('pending')}`}
                iconPosition="end"
                icon={
                  <Label
                    variant={(filterStatus === 'pending' && 'filled') || 'soft'}
                    color="warning"
                  >
                    {counts.pending}
                  </Label>
                }
              />
              <Tab
                value="confirmed"
                label={`${statusLabel('confirmed')}`}
                iconPosition="end"
                icon={
                  <Label
                    variant={(filterStatus === 'confirmed' && 'filled') || 'soft'}
                    color="info"
                  >
                    {counts.confirmed}
                  </Label>
                }
              />
              <Tab
                value="completed"
                label={`${statusLabel('completed')}`}
                iconPosition="end"
                icon={
                  <Label
                    variant={(filterStatus === 'completed' && 'filled') || 'soft'}
                    color="success"
                  >
                    {counts.completed}
                  </Label>
                }
              />
              <Tab
                value="cancelled"
                label={`${statusLabel('cancelled')}`}
                iconPosition="end"
                icon={
                  <Label
                    variant={(filterStatus === 'cancelled' && 'filled') || 'soft'}
                    color="error"
                  >
                    {counts.cancelled}
                  </Label>
                }
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('bookings.col_customer')}</TableCell>
                  <TableCell>{t('bookings.col_service')}</TableCell>
                  <TableCell>{t('bookings.col_datetime')}</TableCell>
                  <TableCell>{t('bookings.col_branch')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
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
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2">{item.service}</Typography>
                          {item.packageSlug && (
                            <Chip
                              size="small"
                              label={
                                packages.find((p) => p.slug === item.packageSlug)?.name ??
                                item.packageSlug
                              }
                              sx={{
                                mt: 0.5,
                                width: 'fit-content',
                                bgcolor: SPA2_CREAM,
                                color: SPA2_TEAL_DARK,
                                fontSize: 11,
                              }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.date}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.time}
                        </Typography>
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
                        <Chip
                          size="small"
                          label={statusLabel(item.status)}
                          color={STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'pending' && (
                            <>
                              <Tooltip title={t('bookings.action_confirm')}>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetStatus(item.id, 'confirmed')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t('bookings.action_cancel')}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetStatus(item.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {item.status === 'confirmed' && (
                            <Tooltip title={t('bookings.action_complete')}>
                              <IconButton
                                size="small"
                                sx={{ color: SPA2_TEAL_DARK }}
                                onClick={() => handleSetStatus(item.id, 'completed')}
                              >
                                <Iconify icon="solar:diploma-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title={t('common.view')}>
                            <IconButton size="small" onClick={() => setViewItem(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filtered.length === 0 && (
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
            count={filtered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full-page live preview - same block order as the public /spa2/booking page:
          Hero -> services-by-category tabs (simplified, static category switcher since
          this is a preview, not the real interactive booking flow) -> package cards
          (fully live, built from the editable `packages` state) -> Spa2Cta. */}
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
                <Spa2SectionTitle eyebrow="Dịch vụ" title="Chọn nhóm dịch vụ bạn quan tâm" />
                <Tabs
                  value={previewCategory}
                  onChange={(_, v: string) => setPreviewCategory(v)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    mb: 5,
                    '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                    '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
                  }}
                >
                  {previewCategories.map((c) => (
                    <Tab key={c} value={c} label={c} sx={{ textTransform: 'capitalize' }} />
                  ))}
                </Tabs>
                <Grid container spacing={3} sx={{ mb: 8 }}>
                  {previewServices.map((s) => (
                    <Grid key={s.slug} xs={12} sm={6} md={4}>
                      <Spa2SoftCard sx={{ textAlign: 'center' }}>
                        <Iconify icon={s.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 0.5 }}>
                          {s.name}
                        </Typography>
                        <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, mb: 1 }}>
                          {formatVND(s.price)}
                        </Typography>
                        <Button size="small" disabled sx={{ color: SPA2_TEAL_DARK }}>
                          Xem chi tiết
                        </Button>
                      </Spa2SoftCard>
                    </Grid>
                  ))}
                </Grid>

                <Spa2SectionTitle eyebrow="Gói liệu trình" title="Chọn gói phù hợp với bạn" />
                <Grid container spacing={3} alignItems="stretch">
                  {packages.map((p) => (
                    <Grid key={p.id} xs={12} sm={6} md={3}>
                      <Spa2SoftCard
                        sx={{
                          position: 'relative',
                          textAlign: 'center',
                          border: p.hot ? `2px solid ${SPA2_TEAL}` : undefined,
                          transform: p.hot ? { md: 'scale(1.05)' } : undefined,
                        }}
                      >
                        {p.hot && (
                          <Chip
                            label="PHỔ BIẾN NHẤT"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: -14,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              bgcolor: SPA2_TEAL,
                              color: 'white',
                              fontWeight: 700,
                            }}
                          />
                        )}
                        <Typography
                          variant="h6"
                          sx={{ color: SPA2_INK, mt: p.hot ? 1.5 : 0, mb: 1 }}
                        >
                          {p.name}
                        </Typography>
                        <Typography variant="h4" sx={{ color: SPA2_TEAL, mb: 0.5 }}>
                          {formatVND(p.price)}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                          {p.sessions} buổi
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Stack spacing={1} sx={{ mb: 3, textAlign: 'left' }}>
                          {p.perks.map((perk) => (
                            <Stack key={perk} direction="row" spacing={1} alignItems="center">
                              <Iconify
                                icon="solar:check-circle-bold"
                                width={16}
                                sx={{ color: SPA2_TEAL }}
                              />
                              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                                {perk}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                        <Button
                          fullWidth
                          disabled
                          sx={{
                            borderRadius: 999,
                            bgcolor: p.hot ? SPA2_TEAL : 'transparent',
                            color: p.hot ? 'white' : SPA2_TEAL_DARK,
                            border: p.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                            '&.Mui-disabled': {
                              bgcolor: p.hot ? SPA2_TEAL : 'transparent',
                              color: p.hot ? 'white' : SPA2_TEAL_DARK,
                              opacity: 0.9,
                            },
                          }}
                        >
                          Chọn gói
                        </Button>
                      </Spa2SoftCard>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </Box>
          <Spa2Cta />
        </Box>
      )}

      {/* Package dialog - left: form, right: live preview of the exact public
          package card markup (Spa2SoftCard, same as Spa2BookingPageView) so the
          "hot" highlight and copy can be checked before saving. */}
      <Dialog open={packageDialog} onClose={() => setPackageDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {packageEditId ? t('common.edit') : t('bookings.packages_add')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('bookings.packages_name')}
                  value={packageForm.name}
                  onChange={(e) => setPackageForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('bookings.packages_price')}
                    type="number"
                    value={packageForm.price}
                    onChange={(e) =>
                      setPackageForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('bookings.packages_sessions')}
                    type="number"
                    value={packageForm.sessions}
                    onChange={(e) =>
                      setPackageForm((p) => ({ ...p, sessions: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('bookings.packages_perks')}
                  value={packageForm.perksInput}
                  onChange={(e) => setPackageForm((p) => ({ ...p, perksInput: e.target.value }))}
                  fullWidth
                  multiline
                  rows={3}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={packageForm.hot}
                      onChange={(e) => setPackageForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('bookings.packages_hot')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Spa2SoftCard
                  sx={{
                    position: 'relative',
                    textAlign: 'center',
                    maxWidth: 260,
                    width: '100%',
                    border: packageForm.hot ? `2px solid ${SPA2_TEAL}` : undefined,
                  }}
                >
                  {packageForm.hot && (
                    <Chip
                      label="PHỔ BIẾN NHẤT"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -14,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        fontWeight: 700,
                      }}
                    />
                  )}
                  <Typography
                    variant="h6"
                    sx={{ color: SPA2_INK, mt: packageForm.hot ? 1.5 : 0, mb: 1 }}
                  >
                    {packageForm.name || '(Chưa đặt tên)'}
                  </Typography>
                  <Typography variant="h4" sx={{ color: SPA2_TEAL, mb: 0.5 }}>
                    {formatVND(packageForm.price)}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                    {packageForm.sessions} buổi
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={1} sx={{ mb: 3, textAlign: 'left' }}>
                    {packageFormPerks.map((perk) => (
                      <Stack key={perk} direction="row" spacing={1} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          width={16}
                          sx={{ color: SPA2_TEAL }}
                        />
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {perk}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    disabled
                    sx={{
                      borderRadius: 999,
                      bgcolor: packageForm.hot ? SPA2_TEAL : 'transparent',
                      color: packageForm.hot ? 'white' : SPA2_TEAL_DARK,
                      border: packageForm.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                      '&.Mui-disabled': {
                        bgcolor: packageForm.hot ? SPA2_TEAL : 'transparent',
                        color: packageForm.hot ? 'white' : SPA2_TEAL_DARK,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Chọn gói
                  </Button>
                </Spa2SoftCard>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPackage}
            disabled={!packageForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {packageEditId ? t('common.save') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!packageDeleteId}
        onClose={() => setPackageDeleteId(null)}
        title={t('bookings.packages_delete_title')}
        content={t('bookings.packages_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePackage}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* View detail dialog */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {t('bookings.detail_title', { id: viewItem?.id })}
        </DialogTitle>
        <DialogContent dividers>
          {viewItem && (
            <Stack spacing={1.5}>
              {[
                [t('bookings.detail_customer'), viewItem.customer],
                [t('bookings.detail_phone'), viewItem.phone],
                [t('bookings.detail_service'), viewItem.service],
                [t('bookings.detail_date'), viewItem.date],
                [t('bookings.detail_time'), viewItem.time],
                [t('bookings.detail_branch'), viewItem.branch],
                [t('bookings.detail_note'), viewItem.note || '–'],
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
                  {t('bookings.detail_status')}:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewItem.status}
                  onChange={(e) =>
                    handleSetStatus(viewItem.id, e.target.value as Spa2BookingStatus)
                  }
                  sx={{ flex: 1 }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {statusLabel(s)}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewItem(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
