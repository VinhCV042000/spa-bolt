import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
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

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2GroupTiers,
  spa2GroupServices,
  spa2GroupOccasions,
  type Spa2GroupTier,
  type Spa2GroupService,
  spa2GroupBookingBanner,
  type Spa2GroupOccasion,
  SPA2_GROUP_BOOKING_REQUESTS,
  type Spa2GroupBookingBanner,
  type Spa2GroupBookingRequest,
  type Spa2GroupBookingRequestStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2GroupBookingPageView } from 'src/sections/spa2/view/spa2-content-pages8';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages8.tsx's
// Spa2GroupBookingPageView renders on the public /spa2/group-booking page: the
// cream PageHero banner (eyebrow/title/subtitle), the discount-by-group-size
// tiers, the "phù hợp cho dịp nào" occasions list and the group-bookable
// services (name/price used in the price calculator) - read from and written
// back in the same shape as src/_mock/_spa2, the single source of truth
// shared with the public view. The "chọn quy mô -> tính ưu đãi -> đặt lịch"
// calculator/step flow on the public page is purely client-derived
// interactive demo state and is intentionally not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_TIER: Omit<Spa2GroupTier, 'id'> = {
  label: '',
  min: 0,
  max: 0,
  discount: 0,
};

const EMPTY_OCCASION: Omit<Spa2GroupOccasion, 'id'> = {
  name: '',
  icon: 'solar:star-bold-duotone',
  desc: '',
};

const EMPTY_SERVICE: Omit<Spa2GroupService, 'id'> = {
  name: '',
  price: 0,
};

type GroupRequestStatusFilter = Spa2GroupBookingRequestStatus | 'all';

const REQUEST_STATUS_OPTIONS: Spa2GroupBookingRequestStatus[] = [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
];

const REQUEST_STATUS_LABEL: Record<Spa2GroupBookingRequestStatus, string> = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  completed: 'Đã hoàn tất',
  cancelled: 'Đã huỷ',
};

const REQUEST_STATUS_COLOR: Record<
  Spa2GroupBookingRequestStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  pending: 'info',
  confirmed: 'warning',
  completed: 'success',
  cancelled: 'error',
};

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

// Mirrors the cream PageHero hero section rendered by Spa2GroupBookingPageView
// on the public page - teal eyebrow overline, ink title, gray subtitle,
// centered, using the exact teal/cream/ink brand tokens the public view uses.
function BannerPreview({ banner }: { banner: Spa2GroupBookingBanner }) {
  return (
    <Box
      sx={{
        bgcolor: SPA2_CREAM,
        borderRadius: 2,
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 480 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors one discount-tier card exactly as rendered in the public "Bảng ưu
// đãi theo quy mô" list (see Spa2GroupBookingPageView): label + min-max range
// on the left, discount% chip on the right.
function TierPreviewCard({ tier }: { tier: Omit<Spa2GroupTier, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
            {tier.label || '(Chưa đặt tên)'}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {tier.min}–{tier.max >= 999 ? '30+' : tier.max} người
          </Typography>
        </Box>
        <Chip
          label={`-${tier.discount}%`}
          sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700 }}
        />
      </Stack>
    </Card>
  );
}

// Mirrors one occasion row exactly as rendered in the public "Phù hợp cho dịp
// nào" list (see Spa2GroupBookingPageView): icon square + name + desc.
function OccasionPreviewCard({ occasion }: { occasion: Omit<Spa2GroupOccasion, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
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
          <Iconify
            icon={occasion.icon || 'solar:star-bold-duotone'}
            width={18}
            sx={{ color: SPA2_TEAL }}
          />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
            {occasion.name || '(Chưa đặt tên)'}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{occasion.desc}</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

// Mirrors one service row as used to build the public "Dịch vụ chính" select
// options in Spa2GroupBookingPageView (name + formatted per-person price).
function ServicePreviewCard({ service }: { service: Omit<Spa2GroupService, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: SPA2_INK }}>
          {service.name || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 14 }}>
          {formatVND(service.price ?? 0)}/người
        </Typography>
      </Stack>
    </Card>
  );
}

// KPI tile used at the top of the "requests" tab.
function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: SPA2_CREAM_DARK,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={20} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: SPA2_INK, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2GroupBookingManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2GroupBookingBanner>(() => ({
    ...spa2GroupBookingBanner,
  }));
  const [tiers, setTiers] = useState<Spa2GroupTier[]>(() =>
    spa2GroupTiers.map((item) => ({ ...item }))
  );
  const [occasions, setOccasions] = useState<Spa2GroupOccasion[]>(() =>
    spa2GroupOccasions.map((item) => ({ ...item }))
  );
  const [services, setServices] = useState<Spa2GroupService[]>(() =>
    spa2GroupServices.map((item) => ({ ...item }))
  );
  const [requests, setRequests] = useState<Spa2GroupBookingRequest[]>(() =>
    SPA2_GROUP_BOOKING_REQUESTS.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'tiers' | 'occasions' | 'services' | 'requests' | 'preview'
  >('banner');
  const markDirty = () => setDirty(true);

  // ---- Group booking requests (Quản lý đặt lịch nhóm) ----
  const [requestSearch, setRequestSearch] = useState('');
  const [requestStatusFilter, setRequestStatusFilter] = useState<GroupRequestStatusFilter>('all');
  const requestTable = useTable({ defaultRowsPerPage: 5 });

  const tierLabelById = useMemo(
    () => new Map(tiers.map((item) => [item.id, item.label])),
    [tiers]
  );
  const occasionNameById = useMemo(
    () => new Map(occasions.map((item) => [item.id, item.name])),
    [occasions]
  );

  const filteredRequests = requests.filter((r) => {
    const q = requestSearch.trim().toLowerCase();
    const matchSearch =
      !q || r.contactName.toLowerCase().includes(q) || r.phone.includes(requestSearch.trim());
    const matchStatus = requestStatusFilter === 'all' || r.status === requestStatusFilter;
    return matchSearch && matchStatus;
  });

  const requestCounts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    confirmed: requests.filter((r) => r.status === 'confirmed').length,
    completed: requests.filter((r) => r.status === 'completed').length,
    cancelled: requests.filter((r) => r.status === 'cancelled').length,
  };

  const totalGroupGuests = useMemo(
    () => requests.reduce((sum, r) => sum + r.groupSize, 0),
    [requests]
  );

  const requestCompletionRate =
    requestCounts.completed + requestCounts.cancelled
      ? Math.round(
          (requestCounts.completed / (requestCounts.completed + requestCounts.cancelled)) * 100
        )
      : null;

  const requestCancellationRate = requestCounts.all
    ? Math.round((requestCounts.cancelled / requestCounts.all) * 100)
    : null;

  const handleSetRequestStatus = (id: string, status: Spa2GroupBookingRequestStatus) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    markDirty();
  };

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Tiers CRUD ----
  const [tierDialog, setTierDialog] = useState(false);
  const [tierEditId, setTierEditId] = useState<string | null>(null);
  const [tierForm, setTierForm] = useState<Omit<Spa2GroupTier, 'id'>>(EMPTY_TIER);
  const [tierDeleteId, setTierDeleteId] = useState<string | null>(null);

  const openCreateTier = () => {
    setTierForm(EMPTY_TIER);
    setTierEditId(null);
    setTierDialog(true);
  };
  const openEditTier = (item: Spa2GroupTier) => {
    const { id, ...rest } = item;
    setTierForm({ ...rest });
    setTierEditId(id);
    setTierDialog(true);
  };
  const submitTier = () => {
    const next: Omit<Spa2GroupTier, 'id'> = {
      ...tierForm,
      min: Number(tierForm.min),
      max: Number(tierForm.max),
      discount: Number(tierForm.discount),
    };
    if (tierEditId) {
      setTiers((prev) =>
        prev.map((item) => (item.id === tierEditId ? { ...item, ...next } : item))
      );
    } else {
      setTiers((prev) => [...prev, withId(next)]);
    }
    setTierDialog(false);
    markDirty();
  };
  const confirmDeleteTier = () => {
    setTiers((prev) => prev.filter((item) => item.id !== tierDeleteId));
    setTierDeleteId(null);
    markDirty();
  };
  const reorderTiers = (next: Spa2GroupTier[]) => {
    setTiers(next);
    markDirty();
  };

  // ---- Occasions CRUD ----
  const [occasionDialog, setOccasionDialog] = useState(false);
  const [occasionEditId, setOccasionEditId] = useState<string | null>(null);
  const [occasionForm, setOccasionForm] = useState<Omit<Spa2GroupOccasion, 'id'>>(EMPTY_OCCASION);
  const [occasionDeleteId, setOccasionDeleteId] = useState<string | null>(null);

  const openCreateOccasion = () => {
    setOccasionForm(EMPTY_OCCASION);
    setOccasionEditId(null);
    setOccasionDialog(true);
  };
  const openEditOccasion = (item: Spa2GroupOccasion) => {
    const { id, ...rest } = item;
    setOccasionForm({ ...rest });
    setOccasionEditId(id);
    setOccasionDialog(true);
  };
  const submitOccasion = () => {
    const next: Omit<Spa2GroupOccasion, 'id'> = { ...occasionForm };
    if (occasionEditId) {
      setOccasions((prev) =>
        prev.map((item) => (item.id === occasionEditId ? { ...item, ...next } : item))
      );
    } else {
      setOccasions((prev) => [...prev, withId(next)]);
    }
    setOccasionDialog(false);
    markDirty();
  };
  const confirmDeleteOccasion = () => {
    setOccasions((prev) => prev.filter((item) => item.id !== occasionDeleteId));
    setOccasionDeleteId(null);
    markDirty();
  };
  const reorderOccasions = (next: Spa2GroupOccasion[]) => {
    setOccasions(next);
    markDirty();
  };

  // ---- Services CRUD ----
  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceEditId, setServiceEditId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Spa2GroupService, 'id'>>(EMPTY_SERVICE);
  const [serviceDeleteId, setServiceDeleteId] = useState<string | null>(null);

  const openCreateService = () => {
    setServiceForm(EMPTY_SERVICE);
    setServiceEditId(null);
    setServiceDialog(true);
  };
  const openEditService = (item: Spa2GroupService) => {
    const { id, ...rest } = item;
    setServiceForm({ ...rest });
    setServiceEditId(id);
    setServiceDialog(true);
  };
  const submitService = () => {
    const next: Omit<Spa2GroupService, 'id'> = {
      ...serviceForm,
      price: Number(serviceForm.price),
    };
    if (serviceEditId) {
      setServices((prev) =>
        prev.map((item) => (item.id === serviceEditId ? { ...item, ...next } : item))
      );
    } else {
      setServices((prev) => [...prev, withId(next)]);
    }
    setServiceDialog(false);
    markDirty();
  };
  const confirmDeleteService = () => {
    setServices((prev) => prev.filter((item) => item.id !== serviceDeleteId));
    setServiceDeleteId(null);
    markDirty();
  };
  const reorderServices = (next: Spa2GroupService[]) => {
    setServices(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2GroupBookingBanner });
    setTiers(spa2GroupTiers.map((item) => ({ ...item })));
    setOccasions(spa2GroupOccasions.map((item) => ({ ...item })));
    setServices(spa2GroupServices.map((item) => ({ ...item })));
    setRequests(SPA2_GROUP_BOOKING_REQUESTS.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('group_booking.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.group_booking')}
      publicPath={paths.spa2.groupBooking}
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
          label={t('group_booking.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tiers"
          label={t('group_booking.tiers_section')}
          icon={<Iconify icon="solar:tag-price-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="occasions"
          label={t('group_booking.occasions_section')}
          icon={<Iconify icon="solar:calendar-mark-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="services"
          label={t('group_booking.services_section')}
          icon={<Iconify icon="solar:spa-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="requests"
          label={t('group_booking.requests_section')}
          icon={<Iconify icon="solar:clipboard-list-bold-duotone" width={20} />}
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
            <SectionCard
              title={t('group_booking.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('group_booking.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('group_booking.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('group_booking.banner_subtitle')}
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
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Tiers */}
      {tab === 'tiers' && (
        <SectionCard
          title={t('group_booking.tiers_section')}
          icon="solar:tag-price-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateTier}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('group_booking.add_tier_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('group_booking.drag_hint')}
          </Typography>
          {tiers.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('group_booking.no_tiers')}
            </Typography>
          )}
          <Spa2SortableGrid items={tiers} onReorder={reorderTiers}>
            <Grid container spacing={2}>
              {tiers.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <TierPreviewCard tier={item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditTier(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setTierDeleteId(item.id)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Occasions */}
      {tab === 'occasions' && (
        <SectionCard
          title={t('group_booking.occasions_section')}
          icon="solar:calendar-mark-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateOccasion}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('group_booking.add_occasion_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('group_booking.drag_hint')}
          </Typography>
          {occasions.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('group_booking.no_occasions')}
            </Typography>
          )}
          <Spa2SortableGrid items={occasions} onReorder={reorderOccasions}>
            <Grid container spacing={2}>
              {occasions.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <OccasionPreviewCard occasion={item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditOccasion(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setOccasionDeleteId(item.id)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Services */}
      {tab === 'services' && (
        <SectionCard
          title={t('group_booking.services_section')}
          icon="solar:spa-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateService}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('group_booking.add_service_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('group_booking.drag_hint')}
          </Typography>
          {services.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('group_booking.no_services')}
            </Typography>
          )}
          <Spa2SortableGrid items={services} onReorder={reorderServices}>
            <Grid container spacing={2}>
              {services.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ServicePreviewCard service={item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditService(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setServiceDeleteId(item.id)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Quản lý đặt lịch nhóm (requests) */}
      {tab === 'requests' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:clipboard-list-bold"
                label="Tổng yêu cầu"
                value={requestCounts.all}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:users-group-rounded-bold"
                label="Tổng số khách"
                value={totalGroupGuests}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:check-circle-bold"
                label="Tỷ lệ hoàn tất"
                value={requestCompletionRate === null ? '—' : `${requestCompletionRate}%`}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:close-circle-bold"
                label="Tỷ lệ huỷ"
                value={requestCancellationRate === null ? '—' : `${requestCancellationRate}%`}
              />
            </Grid>
          </Grid>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              {t('group_booking.requests_section')}
            </Typography>

            <Card sx={{ bgcolor: SPA2_TEAL_DARK, mb: 2.5 }}>
              <Scrollbar sx={{ minHeight: 108 }}>
                <Stack
                  spacing={1}
                  direction="row"
                  divider={
                    <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                  }
                  sx={{ py: 2, px: 1 }}
                >
                  <Spa2ListAnalytic
                    title="Tất cả"
                    total={requestCounts.all}
                    percent={100}
                    icon="solar:clipboard-list-bold-duotone"
                    color={SPA2_TEAL}
                    unitLabel="yêu cầu"
                    active={requestStatusFilter === 'all'}
                    onClick={() => {
                      setRequestStatusFilter('all');
                      requestTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={REQUEST_STATUS_LABEL.pending}
                    total={requestCounts.pending}
                    percent={
                      requestCounts.all ? (requestCounts.pending / requestCounts.all) * 100 : 0
                    }
                    icon="solar:bell-bold-duotone"
                    color="#0C447C"
                    unitLabel="yêu cầu"
                    active={requestStatusFilter === 'pending'}
                    onClick={() => {
                      setRequestStatusFilter('pending');
                      requestTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={REQUEST_STATUS_LABEL.confirmed}
                    total={requestCounts.confirmed}
                    percent={
                      requestCounts.all ? (requestCounts.confirmed / requestCounts.all) * 100 : 0
                    }
                    icon="solar:phone-calling-bold-duotone"
                    color="#FFAB00"
                    unitLabel="yêu cầu"
                    active={requestStatusFilter === 'confirmed'}
                    onClick={() => {
                      setRequestStatusFilter('confirmed');
                      requestTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={REQUEST_STATUS_LABEL.completed}
                    total={requestCounts.completed}
                    percent={
                      requestCounts.all ? (requestCounts.completed / requestCounts.all) * 100 : 0
                    }
                    icon="solar:check-circle-bold-duotone"
                    color="#22C55E"
                    unitLabel="yêu cầu"
                    active={requestStatusFilter === 'completed'}
                    onClick={() => {
                      setRequestStatusFilter('completed');
                      requestTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={REQUEST_STATUS_LABEL.cancelled}
                    total={requestCounts.cancelled}
                    percent={
                      requestCounts.all ? (requestCounts.cancelled / requestCounts.all) * 100 : 0
                    }
                    icon="solar:close-circle-bold-duotone"
                    color="#637381"
                    unitLabel="yêu cầu"
                    active={requestStatusFilter === 'cancelled'}
                    onClick={() => {
                      setRequestStatusFilter('cancelled');
                      requestTable.onResetPage();
                    }}
                  />
                </Stack>
              </Scrollbar>
            </Card>

            <TextField
              placeholder="Tìm theo tên liên hệ hoặc số điện thoại..."
              value={requestSearch}
              onChange={(e) => {
                setRequestSearch(e.target.value);
                requestTable.onResetPage();
              }}
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Tabs
              value={requestStatusFilter}
              onChange={(_, v: GroupRequestStatusFilter) => {
                setRequestStatusFilter(v);
                requestTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                mb: 2,
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${requestCounts.all})`} />
              {REQUEST_STATUS_OPTIONS.map((status) => (
                <Tab
                  key={status}
                  value={status}
                  label={`${REQUEST_STATUS_LABEL[status]} (${requestCounts[status]})`}
                />
              ))}
            </Tabs>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Người liên hệ</TableCell>
                    <TableCell>Quy mô nhóm</TableCell>
                    <TableCell>Dịp</TableCell>
                    <TableCell>Ngày & giờ mong muốn</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align="right">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRequests
                    .slice(
                      requestTable.page * requestTable.rowsPerPage,
                      requestTable.page * requestTable.rowsPerPage + requestTable.rowsPerPage
                    )
                    .map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Stack>
                            <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                              {item.contactName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.phone}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <Typography variant="body2">{item.groupSize} người</Typography>
                            <Chip
                              size="small"
                              label={tierLabelById.get(item.tierId) ?? item.tierId}
                              sx={{ bgcolor: 'background.neutral', fontSize: 11 }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {occasionNameById.get(item.occasionId) ?? item.occasionId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item.date} · {item.time}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{item.createdAt}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={REQUEST_STATUS_LABEL[item.status]}
                            color={REQUEST_STATUS_COLOR[item.status]}
                            variant="soft"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                            {item.status === 'pending' && (
                              <>
                                <Tooltip title="Xác nhận yêu cầu">
                                  <IconButton
                                    size="small"
                                    sx={{ color: SPA2_TEAL_DARK }}
                                    onClick={() => handleSetRequestStatus(item.id, 'confirmed')}
                                  >
                                    <Iconify icon="solar:check-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Huỷ yêu cầu">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleSetRequestStatus(item.id, 'cancelled')}
                                  >
                                    <Iconify icon="solar:close-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {item.status === 'confirmed' && (
                              <>
                                <Tooltip title="Đánh dấu đã hoàn tất">
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => handleSetRequestStatus(item.id, 'completed')}
                                  >
                                    <Iconify icon="solar:diploma-bold" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Huỷ yêu cầu">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleSetRequestStatus(item.id, 'cancelled')}
                                  >
                                    <Iconify icon="solar:close-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredRequests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                        Không có dữ liệu
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePaginationCustom
              count={filteredRequests.length}
              page={requestTable.page}
              rowsPerPage={requestTable.rowsPerPage}
              onPageChange={requestTable.onChangePage}
              onRowsPerPageChange={requestTable.onChangeRowsPerPage}
            />
          </Card>
        </Stack>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2GroupBookingPageView
            banner={banner}
            tiers={tiers}
            occasions={occasions}
            services={services}
          />
        </Box>
      )}

      {/* Tier add/edit dialog */}
      <Dialog open={tierDialog} onClose={() => setTierDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {tierEditId ? t('common.edit') : t('group_booking.add_tier_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('group_booking.form_tier_label')}
                  value={tierForm.label}
                  onChange={(e) => setTierForm((p) => ({ ...p, label: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('group_booking.form_tier_min')}
                    type="number"
                    value={tierForm.min}
                    onChange={(e) => setTierForm((p) => ({ ...p, min: Number(e.target.value) }))}
                    fullWidth
                  />
                  <TextField
                    label={t('group_booking.form_tier_max')}
                    type="number"
                    value={tierForm.max}
                    onChange={(e) => setTierForm((p) => ({ ...p, max: Number(e.target.value) }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('group_booking.form_tier_discount')}
                  type="number"
                  value={tierForm.discount}
                  onChange={(e) => setTierForm((p) => ({ ...p, discount: Number(e.target.value) }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <TierPreviewCard tier={tierForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTierDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitTier}
            disabled={!tierForm.label}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {tierEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!tierDeleteId}
        onClose={() => setTierDeleteId(null)}
        title={t('group_booking.tier_delete_title')}
        content={t('group_booking.tier_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTier}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Occasion add/edit dialog */}
      <Dialog
        open={occasionDialog}
        onClose={() => setOccasionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {occasionEditId ? t('common.edit') : t('group_booking.add_occasion_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('group_booking.form_occasion_name')}
                  value={occasionForm.name}
                  onChange={(e) => setOccasionForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('group_booking.form_occasion_icon')}
                  value={occasionForm.icon}
                  onChange={(e) => setOccasionForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:users-group-rounded-bold-duotone"
                />
                <TextField
                  label={t('group_booking.form_occasion_desc')}
                  value={occasionForm.desc}
                  onChange={(e) => setOccasionForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <OccasionPreviewCard occasion={occasionForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOccasionDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitOccasion}
            disabled={!occasionForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {occasionEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!occasionDeleteId}
        onClose={() => setOccasionDeleteId(null)}
        title={t('group_booking.occasion_delete_title')}
        content={t('group_booking.occasion_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteOccasion}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Service add/edit dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {serviceEditId ? t('common.edit') : t('group_booking.add_service_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('group_booking.form_service_name')}
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('group_booking.form_service_price')}
                  type="number"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm((p) => ({ ...p, price: Number(e.target.value) }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ServicePreviewCard service={serviceForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitService}
            disabled={!serviceForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {serviceEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!serviceDeleteId}
        onClose={() => setServiceDeleteId(null)}
        title={t('group_booking.service_delete_title')}
        content={t('group_booking.service_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteService}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
