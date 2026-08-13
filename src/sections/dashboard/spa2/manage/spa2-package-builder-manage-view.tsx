import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
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

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2PackageBuilderBanner,
  SPA2_PACKAGE_BUILDER_ORDERS,
  type Spa2PackageBuilderOrder,
  type Spa2PackageBuilderBanner,
  spa2PackageBuilderDiscountTiers,
  type Spa2PackageBuilderOrderStatus,
  type Spa2PackageBuilderDiscountTier,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  Spa2ContentPageHero4,
  Spa2PackageBuilderPageView,
} from 'src/sections/spa2/view/spa2-content-pages4';
import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2PackageBuilderPageView renders on the public /spa2/package-builder page:
// the page banner and the combo discount-tier thresholds (e.g. "choose 2
// services -> 10% off"), read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The service catalog itself is managed on the Dịch vụ (Services) page and
// branches on the Chi nhánh (Branches) page — this view links out to both.
// The cart/step/branch/date selection flow on the public page is purely
// interactive UI (no admin-editable content) and is intentionally not mocked
// here, matching the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

type DiscountTier = Spa2PackageBuilderDiscountTier;

const EMPTY_TIER_FORM = { minServices: 2, discountPercent: 10 };

const ORDER_STATUS_LABEL: Record<Spa2PackageBuilderOrderStatus, string> = {
  new: 'Mới',
  confirmed: 'Đã xác nhận',
  completed: 'Đã hoàn tất',
  cancelled: 'Đã huỷ',
};

const ORDER_STATUS_COLOR: Record<
  Spa2PackageBuilderOrderStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  confirmed: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const ORDER_STATUS_ANALYTIC_COLOR: Record<Spa2PackageBuilderOrderStatus, string> = {
  new: '#0C68E9',
  confirmed: '#FFAB00',
  completed: '#22C55E',
  cancelled: '#FF5630',
};

const ORDER_STATUS_ICON: Record<Spa2PackageBuilderOrderStatus, string> = {
  new: 'solar:bell-bing-bold-duotone',
  confirmed: 'solar:check-circle-bold-duotone',
  completed: 'solar:diploma-bold-duotone',
  cancelled: 'solar:close-circle-bold-duotone',
};

const ORDER_STATUS_OPTIONS: Spa2PackageBuilderOrderStatus[] = [
  'new',
  'confirmed',
  'completed',
  'cancelled',
];

type OrderStatusFilter = Spa2PackageBuilderOrderStatus | 'all';

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

function PreviewFrame({ children }: { children: React.ReactNode }) {
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

export function Spa2PackageBuilderManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2PackageBuilderBanner>(() => ({
    ...spa2PackageBuilderBanner,
    image: { ...spa2PackageBuilderBanner.image },
  }));
  const [tiers, setTiers] = useState<DiscountTier[]>(spa2PackageBuilderDiscountTiers);
  const [orders, setOrders] = useState<Spa2PackageBuilderOrder[]>(SPA2_PACKAGE_BUILDER_ORDERS);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'tiers' | 'orders' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2PackageBuilderBanner['image']) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2PackageBuilderBanner, image: { ...spa2PackageBuilderBanner.image } });
    setTiers(spa2PackageBuilderDiscountTiers);
    setOrders(SPA2_PACKAGE_BUILDER_ORDERS);
    setDirty(false);
  };

  const handleReorderTiers = useCallback((next: DiscountTier[]) => {
    setTiers(next);
    setDirty(true);
  }, []);

  // ---- Đơn đặt combo (orders) ----
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatusFilter>('all');
  const [viewOrder, setViewOrder] = useState<Spa2PackageBuilderOrder | null>(null);
  const orderTable = useTable({ defaultRowsPerPage: 5 });

  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.trim().toLowerCase();
    const matchSearch = !q || o.customer.toLowerCase().includes(q) || o.phone.includes(q);
    const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchSearch && matchStatus;
  });

  const orderCounts = {
    all: orders.length,
    new: orders.filter((o) => o.status === 'new').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  const orderRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const handleSetOrderStatus = (id: number, status: Spa2PackageBuilderOrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setViewOrder((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_TIER_FORM);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: Number(e.target.value) }));

  const openCreate = () => {
    setForm(EMPTY_TIER_FORM);
    setEditId(null);
    setOpenForm(true);
  };
  const openEdit = (tier: DiscountTier) => {
    setForm({ minServices: tier.minServices, discountPercent: tier.discountPercent });
    setEditId(tier.id);
    setOpenForm(true);
  };
  const handleSubmit = useCallback(() => {
    const next = {
      minServices: Number(form.minServices),
      discountPercent: Number(form.discountPercent),
    };
    if (editId !== null) {
      setTiers((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      setTiers((p) => [...p, withId(next)]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId]);
  const handleDelete = useCallback(() => {
    setTiers((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  return (
    <Spa2ManageShell
      title={t('package_builder.page_title')}
      description="Banner và các mốc ưu đãi combo hiển thị trên trang Tự tạo combo công khai."
      breadcrumbLabel={t('nav.package_builder')}
      publicPath={paths.spa2.packageBuilder}
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

      <Alert
        severity="info"
        sx={{ mb: 3 }}
        action={
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} href={paths.dashboard.spa2.services} size="small">
              {t('package_builder.link_services')}
            </Button>
            <Button component={RouterLink} href={paths.dashboard.spa2.branches} size="small">
              {t('package_builder.link_branches')}
            </Button>
          </Stack>
        }
      >
        {t('package_builder.scope_note')}
      </Alert>

      <Tabs
        value={tab}
        onChange={(_, v: typeof tab) => setTab(v)}
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
          label={t('package_builder.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tiers"
          label={t('package_builder.tiers_section')}
          icon={<Iconify icon="solar:gift-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="orders"
          label={`Đơn đặt combo (${orders.length})`}
          icon={<Iconify icon="solar:cart-check-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('package_builder.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('package_builder.banner_image_help')}
                />
                <TextField
                  label={t('package_builder.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('package_builder.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('package_builder.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <Spa2ContentPageHero4
                img={banner.image.url}
                imageStyle={banner.image}
                eyebrow={banner.eyebrow}
                title={banner.title}
                subtitle={banner.subtitle}
              />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Discount tiers */}
      {tab === 'tiers' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('package_builder.tiers_section')} ({tiers.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('package_builder.tier_add_btn')}
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('common.drag_hint')}
          </Typography>
          <Spa2SortableGrid items={tiers} onReorder={handleReorderTiers}>
            <Grid container spacing={2}>
              {tiers.map((tier) => (
                <Grid key={tier.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={tier.id}>
                    {(sortable) => (
                      <Card
                        variant="outlined"
                        sx={{ p: 2.5, borderRadius: 2, position: 'relative' }}
                      >
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle sortable={sortable} />
                          <Tooltip title={t('common.edit')}>
                            <IconButton size="small" onClick={() => openEdit(tier)}>
                              <Iconify icon="solar:pen-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.delete')}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteId(tier.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                        <Stack spacing={0.5} sx={{ pr: 12 }}>
                          <Chip
                            size="small"
                            label={`${tier.minServices}+`}
                            color="primary"
                            variant="soft"
                            sx={{ width: 'fit-content' }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {t('package_builder.col_min_services')}
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, pt: 0.5 }}
                          >
                            {tier.discountPercent}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {t('package_builder.col_discount_percent')}
                          </Typography>
                        </Stack>
                      </Card>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
          {tiers.length === 0 && (
            <Typography variant="body2" color="text.disabled" sx={{ py: 4, textAlign: 'center' }}>
              {t('common.no_data')}
            </Typography>
          )}
        </Card>
      )}

      {/* Đơn đặt combo (orders) */}
      {tab === 'orders' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:cart-check-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Đơn đặt combo
              </Typography>
            </Stack>
          </Box>

          {/* KPI */}
          <Card sx={{ mx: 2.5, mt: 2.5, bgcolor: SPA2_CREAM }}>
            <Scrollbar sx={{ minHeight: 108 }}>
              <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2, px: 2 }}
              >
                <Spa2ListAnalytic
                  title="Tất cả"
                  total={orderCounts.all}
                  percent={100}
                  icon="solar:widget-5-bold-duotone"
                  color={SPA2_TEAL}
                  unitLabel="đơn"
                  active={orderStatusFilter === 'all'}
                  onClick={() => {
                    setOrderStatusFilter('all');
                    orderTable.onResetPage();
                  }}
                  secondaryLine={
                    <Typography variant="caption" sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
                      Doanh thu: {formatVND(orderRevenue)}
                    </Typography>
                  }
                />
                {(['new', 'confirmed', 'completed', 'cancelled'] as Spa2PackageBuilderOrderStatus[]).map(
                  (status) => (
                    <Spa2ListAnalytic
                      key={status}
                      title={ORDER_STATUS_LABEL[status]}
                      total={orderCounts[status]}
                      percent={
                        orderCounts.all ? (orderCounts[status] / orderCounts.all) * 100 : 0
                      }
                      icon={ORDER_STATUS_ICON[status]}
                      color={ORDER_STATUS_ANALYTIC_COLOR[status]}
                      unitLabel="đơn"
                      active={orderStatusFilter === status}
                      onClick={() => {
                        setOrderStatusFilter(status);
                        orderTable.onResetPage();
                      }}
                    />
                  )
                )}
              </Stack>
            </Scrollbar>
          </Card>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ p: 2.5 }}>
            <TextField
              placeholder="Tìm theo tên khách hàng hoặc số điện thoại..."
              value={orderSearch}
              onChange={(e) => {
                setOrderSearch(e.target.value);
                orderTable.onResetPage();
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
              value={orderStatusFilter}
              onChange={(_, v: OrderStatusFilter) => {
                setOrderStatusFilter(v);
                orderTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${orderCounts.all})`} />
              {ORDER_STATUS_OPTIONS.map((status) => (
                <Tab
                  key={status}
                  value={status}
                  label={`${ORDER_STATUS_LABEL[status]} (${orderCounts[status]})`}
                />
              ))}
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Dịch vụ đã chọn</TableCell>
                  <TableCell>Giảm giá</TableCell>
                  <TableCell>Tổng tiền</TableCell>
                  <TableCell>Lịch hẹn</TableCell>
                  <TableCell>Ngày đặt</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(
                    orderTable.page * orderTable.rowsPerPage,
                    orderTable.page * orderTable.rowsPerPage + orderTable.rowsPerPage
                  )
                  .map((o) => (
                    <TableRow key={o.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {o.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {o.phone}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ maxWidth: 260 }}>
                          {o.services.slice(0, 2).map((s) => (
                            <Chip key={s} size="small" label={s} sx={{ bgcolor: SPA2_CREAM }} />
                          ))}
                          {o.services.length > 2 && (
                            <Chip size="small" label={`+${o.services.length - 2}`} variant="outlined" />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={`${o.discountPercent}%`}
                          color="warning"
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} sx={{ color: SPA2_TEAL_DARK }}>
                          {formatVND(o.total)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{o.scheduledAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{o.createdAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={ORDER_STATUS_LABEL[o.status]}
                          color={ORDER_STATUS_COLOR[o.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {o.status === 'new' && (
                            <>
                              <Tooltip title="Xác nhận">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetOrderStatus(o.id, 'confirmed')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetOrderStatus(o.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {o.status === 'confirmed' && (
                            <>
                              <Tooltip title="Đánh dấu hoàn tất">
                                <IconButton
                                  size="small"
                                  sx={{ color: SPA2_TEAL_DARK }}
                                  onClick={() => handleSetOrderStatus(o.id, 'completed')}
                                >
                                  <Iconify icon="solar:diploma-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetOrderStatus(o.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title={t('common.view')}>
                            <IconButton size="small" onClick={() => setViewOrder(o)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      {t('common.no_data')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filteredOrders.length}
            page={orderTable.page}
            rowsPerPage={orderTable.rowsPerPage}
            onPageChange={orderTable.onChangePage}
            onRowsPerPageChange={orderTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PackageBuilderPageView banner={banner} discountTiers={tiers} />
        </Box>
      )}

      {/* Create / edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editId !== null
            ? t('package_builder.tier_form_edit')
            : t('package_builder.tier_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('package_builder.col_min_services')}
              type="number"
              value={form.minServices}
              onChange={handleChange('minServices')}
              fullWidth
            />
            <TextField
              label={t('package_builder.col_discount_percent')}
              type="number"
              value={form.discountPercent}
              onChange={handleChange('discountPercent')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null
              ? t('package_builder.tier_form_edit')
              : t('package_builder.tier_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('package_builder.tier_delete_title')}
        content={t('package_builder.tier_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Order view-detail dialog */}
      <Dialog open={!!viewOrder} onClose={() => setViewOrder(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>Đơn đặt combo #{viewOrder?.id}</DialogTitle>
        <DialogContent dividers>
          {viewOrder && (
            <Stack spacing={1.5}>
              {[
                ['Khách hàng', viewOrder.customer],
                ['Số điện thoại', viewOrder.phone],
                ['Giảm giá', `${viewOrder.discountPercent}%`],
                ['Tổng tiền', formatVND(viewOrder.total)],
                ['Lịch hẹn', viewOrder.scheduledAt],
                ['Ngày đặt', viewOrder.createdAt],
              ].map(([label, value]) => (
                <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              ))}
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Dịch vụ đã chọn:
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {viewOrder.services.map((s) => (
                    <Chip key={s} size="small" label={s} sx={{ bgcolor: SPA2_CREAM }} />
                  ))}
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                  Trạng thái:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewOrder.status}
                  onChange={(e) =>
                    handleSetOrderStatus(viewOrder.id, e.target.value as Spa2PackageBuilderOrderStatus)
                  }
                  sx={{ flex: 1 }}
                >
                  {ORDER_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {ORDER_STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOrder(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
