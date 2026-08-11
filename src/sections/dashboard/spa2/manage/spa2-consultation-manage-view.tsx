import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
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

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2Consultants,
  type Spa2Consultant,
  spa2ConsultationBanner,
  type Spa2AdjustableImage,
  type Spa2ConsultationBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  Spa2ContentPageHero4,
  Spa2ConsultationPageView,
} from 'src/sections/spa2/view/spa2-content-pages4';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
  spa2ConsultationBookings,
  type Spa2ConsultationBooking,
  type Spa2ConsultationBookingStatus,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2ConsultationPageView renders on the public /spa2/consultation page:
// the page banner and the expert consultant roster - read from and written
// back in the same shape as src/_mock/_spa2, the single source of truth
// shared with the public view. The "banner" tab reuses Spa2ContentPageHero4
// and the "preview" tab reuses Spa2ConsultationPageView itself, fed with the
// in-progress edited state. The online/offline toggle and booking flow on
// the public page are purely interactive UI (no admin-editable content) and
// are intentionally not mocked here, matching the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_CONSULTANT_FORM = {
  name: '',
  role: '',
  exp: '',
  certs: [] as string[],
  avatar: '',
  rating: 5,
  reviews: 0,
  slots: [] as string[],
  specialty: [] as string[],
};

type ConsultantListKey = 'certs' | 'slots' | 'specialty';

const BOOKING_STATUS_OPTIONS: Spa2ConsultationBookingStatus[] = [
  'Mới',
  'Đang xử lý',
  'Hoàn tất',
  'Đã huỷ',
];

type BookingStatusFilter = 'all' | Spa2ConsultationBookingStatus;

const BOOKING_STATUS_META: Record<Spa2ConsultationBookingStatus, { icon: string; color: string }> = {
  Mới: { icon: 'solar:bell-bold-duotone', color: '#2E90FA' },
  'Đang xử lý': { icon: 'solar:phone-calling-bold-duotone', color: '#F79009' },
  'Hoàn tất': { icon: 'solar:check-circle-bold-duotone', color: '#12B76A' },
  'Đã huỷ': { icon: 'solar:close-circle-bold-duotone', color: '#F04438' },
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

// Mirrors a single consultant SoftCard in the public roster grid.
function ConsultantPreviewCard({ name, role, avatar, rating, reviews, specialty }: Spa2Consultant) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Avatar
        src={avatar}
        sx={{ width: 64, height: 64, mx: 'auto', mb: 1.5, border: `3px solid ${SPA2_TEAL_LIGHT}` }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.25, fontSize: 14 }}>
        {name || 'Tên chuyên gia'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: SPA2_TEAL, mb: 1 }}>{role || 'Chức danh'}</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
        sx={{ mb: 1 }}
      >
        <Rating
          value={rating}
          readOnly
          size="small"
          precision={0.1}
          sx={{ fontSize: 13, '& .MuiRating-icon': { color: '#EF9F27' } }}
        />
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>({reviews})</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        flexWrap="wrap"
        justifyContent="center"
        sx={{ gap: 0.5 }}
      >
        {specialty.map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            sx={{ bgcolor: '#F5F5F5', color: SPA2_TEAL_DARK, fontSize: 10 }}
          />
        ))}
      </Stack>
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows) used for certs/slots/specialty,
// replacing the old single "one item per line" multiline textarea.
function ConsultantMiniListField({
  label,
  addLabel,
  items,
  onChangeItem,
  onAddItem,
  onRemoveItem,
}: {
  label: string;
  addLabel: string;
  items: string[];
  onChangeItem: (idx: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (idx: number) => void;
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        {label}
      </Typography>
      <Stack spacing={1}>
        {items.map((value, idx) => (
          <Stack
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TextField
              fullWidth
              size="small"
              value={value}
              onChange={(e) => onChangeItem(idx, e.target.value)}
            />
            <IconButton size="small" color="error" onClick={() => onRemoveItem(idx)}>
              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            </IconButton>
          </Stack>
        ))}
        <Button
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onAddItem}
          sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
        >
          {addLabel}
        </Button>
      </Stack>
    </Box>
  );
}

// Mirrors the "select a time slot" step of the public booking flow
// (Spa2ConsultationPageView in src/sections/spa2/view/spa2-content-pages4.tsx),
// non-interactive, driven by the live consultant form state.
function ConsultantBookingFlowPreviewCard({
  avatar,
  name,
  role,
  exp,
  rating,
  slots,
}: {
  avatar: string;
  name: string;
  role: string;
  exp: string;
  rating: number;
  slots: string[];
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ bgcolor: SPA2_CREAM, p: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={avatar} sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
              {name || 'Tên chuyên gia'}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: SPA2_TEAL }}>{role || 'Chức danh'}</Typography>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Rating
                value={rating}
                readOnly
                size="small"
                precision={0.1}
                sx={{ fontSize: 12, '& .MuiRating-icon': { color: '#EF9F27' } }}
              />
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                · {exp || '—'} kinh nghiệm
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1.5, fontSize: 13 }}>
          Chọn khung giờ
        </Typography>
        <Grid container spacing={1}>
          {slots.length ? (
            slots.map((s, idx) => (
              <Grid key={`${s}-${idx}`} xs={6}>
                <Box
                  sx={{
                    textAlign: 'center',
                    borderRadius: 2,
                    border: `1.5px solid ${SPA2_CREAM_DARK}`,
                    color: 'text.secondary',
                    fontSize: 12.5,
                    py: 0.8,
                  }}
                >
                  {s}
                </Box>
              </Grid>
            ))
          ) : (
            <Grid xs={12}>
              <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                Chưa có khung giờ nào
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Card>
  );
}

export function Spa2ConsultationManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2ConsultationBanner>(() => ({
    ...spa2ConsultationBanner,
    image: { ...spa2ConsultationBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'consultants' | 'bookings' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Consultants ----
  const [consultants, setConsultants] = useState<Spa2Consultant[]>(() =>
    spa2Consultants.map((c) => ({
      ...c,
      certs: [...c.certs],
      slots: [...c.slots],
      specialty: [...c.specialty],
    }))
  );
  const [consultantForm, setConsultantForm] = useState(EMPTY_CONSULTANT_FORM);
  const [consultantDialog, setConsultantDialog] = useState(false);
  const [consultantEditId, setConsultantEditId] = useState<string | null>(null);
  const [consultantDeleteId, setConsultantDeleteId] = useState<string | null>(null);

  const openCreateConsultant = () => {
    setConsultantForm(EMPTY_CONSULTANT_FORM);
    setConsultantEditId(null);
    setConsultantDialog(true);
  };
  const openEditConsultant = (item: Spa2Consultant) => {
    setConsultantForm({
      name: item.name,
      role: item.role,
      exp: item.exp,
      certs: [...item.certs],
      avatar: item.avatar,
      rating: item.rating,
      reviews: item.reviews,
      slots: [...item.slots],
      specialty: [...item.specialty],
    });
    setConsultantEditId(item.id);
    setConsultantDialog(true);
  };
  const submitConsultant = () => {
    const cleanList = (v: string[]) => v.map((s) => s.trim()).filter(Boolean);
    const next = {
      name: consultantForm.name,
      role: consultantForm.role,
      exp: consultantForm.exp,
      certs: cleanList(consultantForm.certs),
      avatar: consultantForm.avatar,
      rating: Number(consultantForm.rating),
      reviews: Number(consultantForm.reviews),
      slots: cleanList(consultantForm.slots),
      specialty: cleanList(consultantForm.specialty),
    };
    if (consultantEditId) {
      setConsultants((prev) =>
        prev.map((c) => (c.id === consultantEditId ? { ...c, ...next } : c))
      );
    } else {
      setConsultants((prev) => [...prev, withId(next)]);
    }
    setConsultantDialog(false);
    markDirty();
  };
  const confirmDeleteConsultant = () => {
    setConsultants((prev) => prev.filter((c) => c.id !== consultantDeleteId));
    setConsultantDeleteId(null);
    markDirty();
  };
  const reorderConsultants = (next: Spa2Consultant[]) => {
    setConsultants(next);
    markDirty();
  };

  // ---- Consultant mini-lists (certs / slots / specialty) ----
  const addConsultantListItem = (key: ConsultantListKey) => {
    setConsultantForm((p) => ({ ...p, [key]: [...p[key], ''] }));
  };
  const updateConsultantListItem = (key: ConsultantListKey, idx: number, value: string) => {
    setConsultantForm((p) => {
      const nextList = [...p[key]];
      nextList[idx] = value;
      return { ...p, [key]: nextList };
    });
  };
  const removeConsultantListItem = (key: ConsultantListKey, idx: number) => {
    setConsultantForm((p) => ({ ...p, [key]: p[key].filter((_, i) => i !== idx) }));
  };

  // ---- Bookings ----
  const [bookings, setBookings] = useState<Spa2ConsultationBooking[]>(() =>
    spa2ConsultationBookings.map((b) => ({ ...b }))
  );
  const [bookingViewId, setBookingViewId] = useState<string | null>(null);
  const viewBooking = bookings.find((b) => b.id === bookingViewId) ?? null;
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatusFilter>('all');
  const bookingTable = useTable({ defaultRowsPerPage: 5 });

  const handleSetBookingStatus = (id: string, status: Spa2ConsultationBookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    markDirty();
  };

  const filteredBookings = bookings.filter((b) => {
    const q = bookingSearch.trim().toLowerCase();
    const matchSearch =
      !q || b.customerName.toLowerCase().includes(q) || b.phone.includes(bookingSearch.trim());
    const matchStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    return matchSearch && matchStatus;
  });

  const bookingCounts: Record<BookingStatusFilter, number> = {
    all: bookings.length,
    Mới: bookings.filter((b) => b.status === 'Mới').length,
    'Đang xử lý': bookings.filter((b) => b.status === 'Đang xử lý').length,
    'Hoàn tất': bookings.filter((b) => b.status === 'Hoàn tất').length,
    'Đã huỷ': bookings.filter((b) => b.status === 'Đã huỷ').length,
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ConsultationBanner, image: { ...spa2ConsultationBanner.image } });
    setConsultants(
      spa2Consultants.map((c) => ({
        ...c,
        certs: [...c.certs],
        slots: [...c.slots],
        specialty: [...c.specialty],
      }))
    );
    setBookings(spa2ConsultationBookings.map((b) => ({ ...b })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('consultation.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.consultation')}
      publicPath={paths.spa2.consultation}
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
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="banner"
          label={t('consultation.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="consultants"
          label={t('consultation.consultants_section')}
          icon={<Iconify icon="solar:users-group-rounded-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="bookings"
          label={t('consultation.bookings_section', 'Lịch đặt tư vấn')}
          icon={<Iconify icon="solar:calendar-mark-bold-duotone" width={20} />}
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
              title={t('consultation.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('consultation.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('consultation.banner_image_help')}
                />
                <TextField
                  label={t('consultation.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('consultation.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('consultation.banner_subtitle')}
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
                <Spa2ContentPageHero4
                  img={banner.image.url}
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

      {/* Consultants */}
      {tab === 'consultants' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('consultation.consultants_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateConsultant}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('consultation.add_consultant_btn')}
            </Button>
          </Stack>
          <Spa2SortableGrid items={consultants} onReorder={reorderConsultants}>
            <Grid container spacing={2}>
              {consultants.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ConsultantPreviewCard {...item} />
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
                            onClick={() => openEditConsultant(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setConsultantDeleteId(item.id)}
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
        </Card>
      )}

      {/* Bookings */}
      {tab === 'bookings' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="solar:calendar-mark-bold-duotone"
                width={22}
                sx={{ color: SPA2_TEAL }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('consultation.bookings_section', 'Lịch đặt tư vấn')}
              </Typography>
            </Stack>
          </Box>

          {/* Thống kê */}
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2, px: 1 }}
            >
              <Spa2ListAnalytic
                title={t('common.all')}
                total={bookingCounts.all}
                percent={100}
                icon="solar:calendar-mark-bold-duotone"
                color={SPA2_TEAL}
                unitLabel={t('consultation.booking_unit', 'lịch hẹn')}
                active={bookingStatusFilter === 'all'}
                onClick={() => {
                  setBookingStatusFilter('all');
                  bookingTable.onResetPage();
                }}
              />
              {BOOKING_STATUS_OPTIONS.map((status) => (
                <Spa2ListAnalytic
                  key={status}
                  title={status}
                  total={bookingCounts[status]}
                  percent={
                    bookingCounts.all ? (bookingCounts[status] / bookingCounts.all) * 100 : 0
                  }
                  icon={BOOKING_STATUS_META[status].icon}
                  color={BOOKING_STATUS_META[status].color}
                  unitLabel={t('consultation.booking_unit', 'lịch hẹn')}
                  active={bookingStatusFilter === status}
                  onClick={() => {
                    setBookingStatusFilter(status);
                    bookingTable.onResetPage();
                  }}
                />
              ))}
            </Stack>
          </Scrollbar>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder={t(
                'consultation.booking_search_placeholder',
                'Tìm theo tên hoặc số điện thoại...'
              )}
              value={bookingSearch}
              onChange={(e) => {
                setBookingSearch(e.target.value);
                bookingTable.onResetPage();
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
              value={bookingStatusFilter}
              onChange={(_, v: BookingStatusFilter) => {
                setBookingStatusFilter(v);
                bookingTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`${t('common.all')} (${bookingCounts.all})`} />
              {BOOKING_STATUS_OPTIONS.map((status) => (
                <Tab key={status} value={status} label={`${status} (${bookingCounts[status]})`} />
              ))}
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('consultation.booking_col_customer', 'Khách hàng')}</TableCell>
                  <TableCell>{t('consultation.booking_col_consultant', 'Chuyên gia')}</TableCell>
                  <TableCell>{t('consultation.booking_col_mode', 'Hình thức')}</TableCell>
                  <TableCell>{t('consultation.booking_col_datetime', 'Thời gian')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings
                  .slice(
                    bookingTable.page * bookingTable.rowsPerPage,
                    bookingTable.page * bookingTable.rowsPerPage + bookingTable.rowsPerPage
                  )
                  .map((b) => {
                    const consultant = consultants.find((c) => c.id === b.consultantId);
                    return (
                      <TableRow
                        key={b.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => setBookingViewId(b.id)}
                      >
                        <TableCell>
                          <Stack>
                            <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                              {b.customerName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {b.phone}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{consultant?.name ?? '—'}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            variant="soft"
                            color={b.mode === 'online' ? 'info' : 'default'}
                            icon={
                              <Iconify
                                icon={
                                  b.mode === 'online'
                                    ? 'solar:video-camera-bold'
                                    : 'solar:map-point-bold'
                                }
                                width={14}
                              />
                            }
                            label={
                              b.mode === 'online'
                                ? t('consultation.mode_online', 'Online')
                                : t('consultation.mode_offline', 'Tại spa')
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{b.date}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {b.slot}
                          </Typography>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <TextField
                            select
                            size="small"
                            value={b.status}
                            onChange={(e) =>
                              handleSetBookingStatus(
                                b.id,
                                e.target.value as Spa2ConsultationBookingStatus
                              )
                            }
                            sx={{ minWidth: 150 }}
                          >
                            {BOOKING_STATUS_OPTIONS.map((s) => (
                              <MenuItem key={s} value={s}>
                                {s}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => setBookingViewId(b.id)}>
                            <Iconify icon="solar:eye-bold" width={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {filteredBookings.length === 0 && (
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
            count={filteredBookings.length}
            page={bookingTable.page}
            rowsPerPage={bookingTable.rowsPerPage}
            onPageChange={bookingTable.onChangePage}
            onRowsPerPageChange={bookingTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2ConsultationPageView banner={banner} consultants={consultants} />
        </Box>
      )}

      {/* Consultant add/edit dialog */}
      <Dialog
        open={consultantDialog}
        onClose={() => setConsultantDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {consultantEditId ? t('common.edit') : t('consultation.add_consultant_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('consultation.form_name')}
                    fullWidth
                    size="small"
                    value={consultantForm.name}
                    onChange={(e) => setConsultantForm((p) => ({ ...p, name: e.target.value }))}
                  />
                  <TextField
                    label={t('consultation.form_role')}
                    fullWidth
                    size="small"
                    value={consultantForm.role}
                    onChange={(e) => setConsultantForm((p) => ({ ...p, role: e.target.value }))}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('consultation.form_exp')}
                    fullWidth
                    size="small"
                    value={consultantForm.exp}
                    onChange={(e) => setConsultantForm((p) => ({ ...p, exp: e.target.value }))}
                  />
                  <TextField
                    label={t('consultation.form_rating')}
                    type="number"
                    fullWidth
                    size="small"
                    value={consultantForm.rating}
                    onChange={(e) =>
                      setConsultantForm((p) => ({ ...p, rating: Number(e.target.value) }))
                    }
                    inputProps={{ step: 0.1, min: 0, max: 5 }}
                  />
                  <TextField
                    label={t('consultation.form_reviews')}
                    type="number"
                    fullWidth
                    size="small"
                    value={consultantForm.reviews}
                    onChange={(e) =>
                      setConsultantForm((p) => ({ ...p, reviews: Number(e.target.value) }))
                    }
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('consultation.form_avatar')}
                  value={consultantForm.avatar}
                  onChange={(url) => setConsultantForm((p) => ({ ...p, avatar: url }))}
                  rounded
                />
                <ConsultantMiniListField
                  label={t('consultation.form_certs')}
                  addLabel={t('consultation.add_item_btn', 'Thêm mục')}
                  items={consultantForm.certs}
                  onChangeItem={(idx, value) => updateConsultantListItem('certs', idx, value)}
                  onAddItem={() => addConsultantListItem('certs')}
                  onRemoveItem={(idx) => removeConsultantListItem('certs', idx)}
                />
                <ConsultantMiniListField
                  label={t('consultation.form_slots')}
                  addLabel={t('consultation.add_item_btn', 'Thêm mục')}
                  items={consultantForm.slots}
                  onChangeItem={(idx, value) => updateConsultantListItem('slots', idx, value)}
                  onAddItem={() => addConsultantListItem('slots')}
                  onRemoveItem={(idx) => removeConsultantListItem('slots', idx)}
                />
                <ConsultantMiniListField
                  label={t('consultation.form_specialty')}
                  addLabel={t('consultation.add_item_btn', 'Thêm mục')}
                  items={consultantForm.specialty}
                  onChangeItem={(idx, value) => updateConsultantListItem('specialty', idx, value)}
                  onAddItem={() => addConsultantListItem('specialty')}
                  onRemoveItem={(idx) => removeConsultantListItem('specialty', idx)}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    {t('consultation.roster_preview_section', 'Xem trước thẻ danh sách')}
                  </Typography>
                  <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                    <ConsultantPreviewCard
                      id={consultantEditId ?? 'preview'}
                      name={consultantForm.name}
                      role={consultantForm.role}
                      exp={consultantForm.exp}
                      certs={consultantForm.certs.filter(Boolean)}
                      avatar={consultantForm.avatar}
                      rating={consultantForm.rating}
                      reviews={consultantForm.reviews}
                      slots={consultantForm.slots.filter(Boolean)}
                      specialty={consultantForm.specialty.filter(Boolean)}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    {t('consultation.booking_preview_section', 'Xem trước bước đặt lịch')}
                  </Typography>
                  <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                    <ConsultantBookingFlowPreviewCard
                      avatar={consultantForm.avatar}
                      name={consultantForm.name}
                      role={consultantForm.role}
                      exp={consultantForm.exp}
                      rating={consultantForm.rating}
                      slots={consultantForm.slots.filter(Boolean)}
                    />
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConsultantDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitConsultant}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {consultantEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!consultantDeleteId}
        onClose={() => setConsultantDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteConsultant}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Booking detail dialog */}
      <Dialog open={!!bookingViewId} onClose={() => setBookingViewId(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {t('consultation.booking_detail_title', 'Chi tiết lịch đặt tư vấn')}
        </DialogTitle>
        <DialogContent dividers>
          {viewBooking && (
            <Stack spacing={1.5}>
              {[
                [t('consultation.booking_detail_customer', 'Khách hàng'), viewBooking.customerName],
                [t('consultation.booking_detail_phone', 'Số điện thoại'), viewBooking.phone],
                [
                  t('consultation.booking_detail_consultant', 'Chuyên gia'),
                  consultants.find((c) => c.id === viewBooking.consultantId)?.name ?? '—',
                ],
                [
                  t('consultation.booking_detail_mode', 'Hình thức'),
                  viewBooking.mode === 'online'
                    ? t('consultation.mode_online', 'Online')
                    : t('consultation.mode_offline', 'Tại spa'),
                ],
                [t('consultation.booking_detail_slot', 'Khung giờ'), viewBooking.slot],
                [t('consultation.booking_detail_date', 'Ngày hẹn'), viewBooking.date],
                [t('consultation.booking_detail_note', 'Ghi chú'), viewBooking.note || '–'],
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
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                  {t('consultation.booking_detail_status', 'Trạng thái')}:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewBooking.status}
                  onChange={(e) =>
                    handleSetBookingStatus(
                      viewBooking.id,
                      e.target.value as Spa2ConsultationBookingStatus
                    )
                  }
                  sx={{ flex: 1 }}
                >
                  {BOOKING_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingViewId(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
