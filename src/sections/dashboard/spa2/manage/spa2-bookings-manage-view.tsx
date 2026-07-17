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
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
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
import {
  SPA2_BOOKINGS,
  spa2BookingBanner,
  spa2BookingPackages,
  type Spa2BookingItem,
  SPA2_BOOKING_BRANCHES,
  type Spa2BookingStatus,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
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

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BookingsManageView() {
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
          top: 65,
          zIndex: 10,
          bgcolor: 'background.paper',
          '& .MuiTab-root': { minHeight: 56, fontWeight: 600 },
          '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
          '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
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

      {/* Banner */}
      {tab === 'banner' && (
        <SectionCard title={t('bookings.banner_section')} icon="solar:gallery-wide-bold-duotone">
          <Grid container spacing={3}>
            <Grid xs={12} md={5}>
              <Spa2ImageField
                label={t('bookings.banner_image')}
                value={banner.image}
                onChange={updateBannerImage}
                height={220}
                helperText={t('bookings.banner_image_help')}
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
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
            </Grid>
          </Grid>
        </SectionCard>
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
          <Grid container spacing={2} sx={{ p: 2.5 }}>
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
              <Grid key={k.key} xs={6} md={2.4}>
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
              </Grid>
            ))}
          </Grid>

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
              <Tab value="all" label={`${t('common.all')} (${counts.all})`} />
              <Tab value="pending" label={`${statusLabel('pending')} (${counts.pending})`} />
              <Tab value="confirmed" label={`${statusLabel('confirmed')} (${counts.confirmed})`} />
              <Tab value="completed" label={`${statusLabel('completed')} (${counts.completed})`} />
              <Tab value="cancelled" label={`${statusLabel('cancelled')} (${counts.cancelled})`} />
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

      {/* Preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'relative',
              height: 260,
              bgcolor: SPA2_CREAM_DARK,
              ...spa2ImageBackgroundStyle(banner.image),
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.65), rgba(0,0,0,0))',
              }}
            />
            <Stack
              spacing={0.75}
              sx={{ position: 'absolute', left: 24, right: 24, bottom: 20, color: 'common.white' }}
            >
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
                {banner.eyebrow}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {banner.title}
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 520, opacity: 0.9 }}>
                {banner.subtitle}
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ p: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              {t('bookings.packages_section')}
            </Typography>
            <Grid container spacing={2}>
              {packages.map((p) => (
                <Grid key={p.id} xs={6} sm={3}>
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      textAlign: 'center',
                      border: p.hot ? `2px solid ${SPA2_TEAL}` : undefined,
                    }}
                  >
                    <Typography variant="subtitle2">{p.name}</Typography>
                    <Typography variant="h6" sx={{ color: SPA2_TEAL }}>
                      {formatVND(p.price)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.sessions} buổi
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}

      {/* Package dialog */}
      <Dialog open={packageDialog} onClose={() => setPackageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {packageEditId ? t('common.edit') : t('bookings.packages_add')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
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
                onChange={(e) => setPackageForm((p) => ({ ...p, price: Number(e.target.value) }))}
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
