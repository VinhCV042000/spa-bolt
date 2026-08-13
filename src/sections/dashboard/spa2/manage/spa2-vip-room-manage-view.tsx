import type {
  Spa2VipRoom,
  Spa2VipRoomPerk,
  Spa2VipRoomBanner,
  Spa2VipRoomBooking,
  Spa2AdjustableImage,
  Spa2VipRoomBookingStatus,
} from 'src/_mock/_spa2';

import { useMemo, useState, useCallback } from 'react';

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
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
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
import LinearProgress from '@mui/material/LinearProgress';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2VipRooms,
  spa2VipRoomPerks,
  spa2VipRoomBanner,
  SPA2_VIP_ROOM_BOOKINGS,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
import { Spa2VIPRoomPageView } from 'src/sections/spa2/view/spa2-content-pages4';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2VIPRoomPageView renders on the public /spa2/vip-room page: the dark
// luxury banner (incl. its extra promo "badge" Chip), the VIP room roster and
// the premium-perks grid — read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The active-room tab selector on the public page is purely interactive UI
// (no admin-editable content) and is intentionally not mocked here, matching
// the project convention. The banner keeps its bespoke dark-hero layout
// (rather than the shared Spa2ContentPageHero4) since that's how the public
// page renders it.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_ROOM_FORM = {
  name: '',
  size: '',
  capacity: '',
  price: 0,
  duration: '',
  image: '',
};

const EMPTY_PERK_FORM = { icon: 'solar:star-bold-duotone', title: '', desc: '' };

const VIP_BOOKING_STATUS_LABEL: Record<Spa2VipRoomBookingStatus, string> = {
  new: 'Mới',
  confirmed: 'Đã xác nhận',
  completed: 'Đã hoàn tất',
  cancelled: 'Đã huỷ',
};

const VIP_BOOKING_STATUS_COLOR: Record<
  Spa2VipRoomBookingStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  confirmed: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const VIP_BOOKING_STATUS_OPTIONS: Spa2VipRoomBookingStatus[] = [
  'new',
  'confirmed',
  'completed',
  'cancelled',
];

type VipBookingStatusFilter = Spa2VipRoomBookingStatus | 'all';

type FeatureRow = { id: string; value: string };

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: string;
  action?: React.ReactNode;
  children: React.ReactNode;
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

function VipRoomHeroPreview({ banner }: { banner: Spa2VipRoomBanner }) {
  return (
    <Box sx={{ position: 'relative', bgcolor: SPA2_INK, py: 6, overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          ...spa2ImageBackgroundStyle(banner.image),
          opacity: 0.15,
        }}
      />
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
            {banner.eyebrow}
          </Typography>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, maxWidth: 520 }}>
            {banner.title}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, maxWidth: 440 }}>
            {banner.subtitle}
          </Typography>
          <Chip
            label={banner.badge}
            sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700, fontSize: 13 }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

function RoomPreviewCard({
  form,
}: {
  form: {
    name: string;
    size: string;
    capacity: string;
    price: number;
    duration: string;
    image: string;
    features: string[];
  };
}) {
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box
        sx={{
          height: 160,
          backgroundImage: `url(${form.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ mb: 1 }}
        >
          <Typography variant="h6" sx={{ color: SPA2_INK }}>
            {form.name || '(Chưa đặt tên)'}
          </Typography>
          <Chip label={form.duration} size="small" sx={{ bgcolor: SPA2_TEAL, color: 'white' }} />
        </Stack>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>
          {form.size} · {form.capacity}
        </Typography>
        <Typography variant="h5" sx={{ color: SPA2_TEAL, fontWeight: 700, mb: 1.5 }}>
          {formatVND(form.price)}
        </Typography>
        <Stack spacing={0.75}>
          {form.features.length === 0 ? (
            <Typography sx={{ fontSize: 13, color: 'text.disabled' }}>—</Typography>
          ) : (
            form.features.map((f) => (
              <Stack key={f} direction="row" spacing={1} alignItems="center">
                <Iconify icon="solar:check-circle-bold" width={14} sx={{ color: SPA2_TEAL }} />
                <Typography sx={{ fontSize: 12.5, color: SPA2_INK }}>{f}</Typography>
              </Stack>
            ))
          )}
        </Stack>
      </Box>
    </Card>
  );
}

// Mirrors a single perk's SoftCard exactly as rendered in the "Trải nghiệm
// VIP độc quyền" grid on the public page (see Spa2VIPRoomPageView in
// src/sections/spa2/view/spa2-content-pages4.tsx).
function PerkPreviewCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: '0 8px 24px rgba(31,42,40,0.05)',
        textAlign: 'center',
        bgcolor: 'common.white',
      }}
    >
      <Iconify
        icon={icon || 'solar:star-bold-duotone'}
        width={44}
        sx={{ color: SPA2_TEAL, mb: 1.5 }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {title || 'Tiêu đề đặc quyền'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {desc || 'Mô tả đặc quyền…'}
      </Typography>
    </Card>
  );
}

// KPI tile used on the "booking_stats" tab.
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

export function Spa2VipRoomManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2VipRoomBanner>(() => ({
    ...spa2VipRoomBanner,
    image: { ...spa2VipRoomBanner.image },
  }));
  const [rooms, setRooms] = useState<Spa2VipRoom[]>(spa2VipRooms);
  const [perks, setPerks] = useState<Spa2VipRoomPerk[]>(spa2VipRoomPerks);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'rooms' | 'perks' | 'bookings' | 'booking_stats' | 'preview'
  >('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle' | 'badge', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2VipRoomBanner, image: { ...spa2VipRoomBanner.image } });
    setRooms(spa2VipRooms);
    setPerks(spa2VipRoomPerks);
    setBookings(SPA2_VIP_ROOM_BOOKINGS);
    setDirty(false);
  };

  // ---- Rooms ----
  const [openRoomForm, setOpenRoomForm] = useState(false);
  const [editRoomId, setEditRoomId] = useState<string | null>(null);
  const [deleteRoomId, setDeleteRoomId] = useState<string | null>(null);
  const [roomForm, setRoomForm] = useState(EMPTY_ROOM_FORM);
  const [roomFeatures, setRoomFeatures] = useState<FeatureRow[]>([]);

  const handleRoomChange =
    (field: keyof typeof roomForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setRoomForm((p) => ({
        ...p,
        [field]: field === 'price' ? Number(e.target.value) : e.target.value,
      }));

  const addRoomFeature = () => {
    setRoomFeatures((prev) => [...prev, { id: uuidv4(), value: '' }]);
  };
  const updateRoomFeature = (id: string, value: string) => {
    setRoomFeatures((prev) => prev.map((row) => (row.id === id ? { ...row, value } : row)));
  };
  const removeRoomFeature = (id: string) => {
    setRoomFeatures((prev) => prev.filter((row) => row.id !== id));
  };

  const openCreateRoom = () => {
    setRoomForm(EMPTY_ROOM_FORM);
    setRoomFeatures([]);
    setEditRoomId(null);
    setOpenRoomForm(true);
  };
  const openEditRoom = (room: Spa2VipRoom) => {
    setRoomForm({
      name: room.name,
      size: room.size,
      capacity: room.capacity,
      price: room.price,
      duration: room.duration,
      image: room.image,
    });
    setRoomFeatures(room.features.map((f) => ({ id: uuidv4(), value: f })));
    setEditRoomId(room.id);
    setOpenRoomForm(true);
  };
  const roomFeaturesPreview = roomFeatures.map((row) => row.value.trim()).filter(Boolean);
  const handleRoomSubmit = useCallback(() => {
    const next = {
      name: roomForm.name,
      size: roomForm.size,
      capacity: roomForm.capacity,
      price: Number(roomForm.price),
      duration: roomForm.duration,
      image: roomForm.image,
      features: roomFeatures.map((row) => row.value.trim()).filter(Boolean),
    };
    if (editRoomId !== null) {
      setRooms((p) => p.map((x) => (x.id === editRoomId ? { ...x, ...next } : x)));
    } else {
      setRooms((p) => [...p, withId(next)]);
    }
    setOpenRoomForm(false);
    setDirty(true);
  }, [roomForm, roomFeatures, editRoomId]);
  const handleRoomDelete = useCallback(() => {
    setRooms((p) => p.filter((x) => x.id !== deleteRoomId));
    setDeleteRoomId(null);
    setDirty(true);
  }, [deleteRoomId]);

  const roomPreviewForm = {
    name: roomForm.name,
    size: roomForm.size,
    capacity: roomForm.capacity,
    price: Number(roomForm.price),
    duration: roomForm.duration,
    image: roomForm.image,
    features: roomFeaturesPreview,
  };

  // ---- Perks ----
  const [openPerkForm, setOpenPerkForm] = useState(false);
  const [editPerkId, setEditPerkId] = useState<string | null>(null);
  const [deletePerkId, setDeletePerkId] = useState<string | null>(null);
  const [perkForm, setPerkForm] = useState(EMPTY_PERK_FORM);

  const handlePerkChange =
    (field: keyof typeof perkForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setPerkForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreatePerk = () => {
    setPerkForm(EMPTY_PERK_FORM);
    setEditPerkId(null);
    setOpenPerkForm(true);
  };
  const openEditPerk = (perk: Spa2VipRoomPerk) => {
    setPerkForm({ icon: perk.icon, title: perk.title, desc: perk.desc });
    setEditPerkId(perk.id);
    setOpenPerkForm(true);
  };
  const handlePerkSubmit = useCallback(() => {
    if (editPerkId !== null) {
      setPerks((p) => p.map((x) => (x.id === editPerkId ? { ...x, ...perkForm } : x)));
    } else {
      setPerks((p) => [...p, withId({ ...perkForm })]);
    }
    setOpenPerkForm(false);
    setDirty(true);
  }, [perkForm, editPerkId]);
  const handlePerkDelete = useCallback(() => {
    setPerks((p) => p.filter((x) => x.id !== deletePerkId));
    setDeletePerkId(null);
    setDirty(true);
  }, [deletePerkId]);
  const reorderPerks = (next: Spa2VipRoomPerk[]) => {
    setPerks(next);
    setDirty(true);
  };

  // ---- Đặt phòng VIP (bookings) ----
  const [bookings, setBookings] = useState<Spa2VipRoomBooking[]>(SPA2_VIP_ROOM_BOOKINGS);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<VipBookingStatusFilter>('all');
  const [bookingRoomFilter, setBookingRoomFilter] = useState('all');
  const [viewBooking, setViewBooking] = useState<Spa2VipRoomBooking | null>(null);
  const bookingTable = useTable({ defaultRowsPerPage: 5 });

  const filteredBookings = bookings.filter((b) => {
    const q = bookingSearch.toLowerCase();
    const matchSearch =
      !q ||
      b.customer.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.roomName.toLowerCase().includes(q) ||
      b.phone.includes(bookingSearch);
    const matchStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    const matchRoom = bookingRoomFilter === 'all' || b.roomId === bookingRoomFilter;
    return matchSearch && matchStatus && matchRoom;
  });

  const handleSetBookingStatus = (id: number, status: Spa2VipRoomBookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setViewBooking((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const bookingCounts = {
    all: bookings.length,
    new: bookings.filter((b) => b.status === 'new').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  // ---- Thống kê đặt phòng VIP (theo phòng) ----
  const bookingRoomStats = useMemo(
    () =>
      rooms.map((room) => {
        const inRoom = bookings.filter((b) => b.roomId === room.id);
        const completed = inRoom.filter((b) => b.status === 'completed').length;
        const cancelled = inRoom.filter((b) => b.status === 'cancelled').length;
        const resolved = completed + cancelled;
        return {
          id: room.id,
          name: room.name,
          image: room.image,
          count: inRoom.length,
          new: inRoom.filter((b) => b.status === 'new').length,
          confirmed: inRoom.filter((b) => b.status === 'confirmed').length,
          completed,
          cancelled,
          completionRate: resolved ? Math.round((completed / resolved) * 100) : null,
        };
      }),
    [rooms, bookings]
  );

  const mostBookedRoom = useMemo(
    () => [...bookingRoomStats].sort((a, b) => b.count - a.count)[0] ?? null,
    [bookingRoomStats]
  );

  const bookingCompletionRate =
    bookingCounts.completed + bookingCounts.cancelled
      ? Math.round(
          (bookingCounts.completed / (bookingCounts.completed + bookingCounts.cancelled)) * 100
        )
      : null;

  const bookingCancellationRate = bookingCounts.all
    ? Math.round((bookingCounts.cancelled / bookingCounts.all) * 100)
    : null;

  return (
    <Spa2ManageShell
      title={t('vip_room.page_title')}
      description="Banner, danh sách phòng VIP và các đặc quyền hiển thị trên trang Phòng VIP công khai."
      breadcrumbLabel={t('nav.vip_room')}
      publicPath={paths.spa2.vipRoom}
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
          label={t('vip_room.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="rooms"
          label={t('vip_room.rooms_section')}
          icon={<Iconify icon="solar:bed-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="perks"
          label={t('vip_room.perks_section')}
          icon={<Iconify icon="solar:star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="bookings"
          label={t('vip_room.bookings_section')}
          icon={<Iconify icon="solar:calendar-mark-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="booking_stats"
          label={t('vip_room.booking_stats_section')}
          icon={<Iconify icon="solar:chart-square-bold-duotone" width={20} />}
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
                  label={t('vip_room.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('vip_room.banner_image_help')}
                />
                <TextField
                  label={t('vip_room.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('vip_room.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('vip_room.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('vip_room.banner_badge')}
                  value={banner.badge}
                  onChange={(e) => updateBanner('badge', e.target.value)}
                  fullWidth
                  size="small"
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <VipRoomHeroPreview banner={banner} />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Rooms */}
      {tab === 'rooms' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('vip_room.rooms_section')} ({rooms.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateRoom}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('vip_room.room_add_btn')}
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('vip_room.col_name')}</TableCell>
                  <TableCell>{t('vip_room.col_size')}</TableCell>
                  <TableCell>{t('vip_room.col_capacity')}</TableCell>
                  <TableCell align="right">{t('vip_room.col_price')}</TableCell>
                  <TableCell>{t('vip_room.col_duration')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 1.5,
                            flexShrink: 0,
                            backgroundImage: `url(${room.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <Typography variant="subtitle2">{room.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{room.size}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell align="right">{formatVND(room.price)}</TableCell>
                    <TableCell>{room.duration}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openEditRoom(room)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteRoomId(room.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Perks */}
      {tab === 'perks' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreatePerk}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('vip_room.perk_add_btn')}
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Spa2SortableGrid items={perks} onReorder={reorderPerks}>
              <Grid container spacing={2}>
                {perks.map((perk) => (
                  <Grid key={perk.id} xs={12} sm={6} md={3}>
                    <Spa2SortableItem id={perk.id}>
                      {(sortable) => (
                        <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                          <Iconify icon={perk.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1 }} />
                          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
                            {perk.title}
                          </Typography>
                          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                            {perk.desc}
                          </Typography>
                          <Stack direction="row" justifyContent="center" spacing={0.5}>
                            <Spa2DragHandle sortable={sortable} />
                            <Tooltip title={t('common.edit')}>
                              <IconButton size="small" onClick={() => openEditPerk(perk)}>
                                <Iconify icon="solar:pen-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('common.delete')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeletePerkId(perk.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Card>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                ))}
              </Grid>
            </Spa2SortableGrid>
          </Grid>
        </Grid>
      )}

      {/* Quản lý đặt phòng VIP (bookings) */}
      {tab === 'bookings' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
            flexWrap="wrap"
            useFlexGap
            gap={1}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('vip_room.bookings_section')}
            </Typography>
            <TextField
              select
              size="small"
              value={bookingRoomFilter}
              onChange={(e) => {
                setBookingRoomFilter(e.target.value);
                bookingTable.onResetPage();
              }}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="all">Tất cả phòng</MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Card sx={{ bgcolor: SPA2_TEAL_DARK, mb: 2.5 }}>
            <Scrollbar sx={{ minHeight: 108 }}>
              <Stack
                spacing={1}
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2, px: 1 }}
              >
                <Spa2ListAnalytic
                  title="Tất cả"
                  total={bookingCounts.all}
                  percent={100}
                  icon="solar:calendar-mark-bold-duotone"
                  color={SPA2_TEAL}
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'all'}
                  onClick={() => {
                    setBookingStatusFilter('all');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={VIP_BOOKING_STATUS_LABEL.new}
                  total={bookingCounts.new}
                  percent={bookingCounts.all ? (bookingCounts.new / bookingCounts.all) * 100 : 0}
                  icon="solar:bell-bold-duotone"
                  color="#0C447C"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'new'}
                  onClick={() => {
                    setBookingStatusFilter('new');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={VIP_BOOKING_STATUS_LABEL.confirmed}
                  total={bookingCounts.confirmed}
                  percent={
                    bookingCounts.all ? (bookingCounts.confirmed / bookingCounts.all) * 100 : 0
                  }
                  icon="solar:phone-calling-bold-duotone"
                  color="#FFAB00"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'confirmed'}
                  onClick={() => {
                    setBookingStatusFilter('confirmed');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={VIP_BOOKING_STATUS_LABEL.completed}
                  total={bookingCounts.completed}
                  percent={
                    bookingCounts.all ? (bookingCounts.completed / bookingCounts.all) * 100 : 0
                  }
                  icon="solar:check-circle-bold-duotone"
                  color="#22C55E"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'completed'}
                  onClick={() => {
                    setBookingStatusFilter('completed');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={VIP_BOOKING_STATUS_LABEL.cancelled}
                  total={bookingCounts.cancelled}
                  percent={
                    bookingCounts.all ? (bookingCounts.cancelled / bookingCounts.all) * 100 : 0
                  }
                  icon="solar:close-circle-bold-duotone"
                  color="#637381"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'cancelled'}
                  onClick={() => {
                    setBookingStatusFilter('cancelled');
                    bookingTable.onResetPage();
                  }}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <TextField
            placeholder="Tìm theo khách hàng, SĐT, email hoặc phòng..."
            value={bookingSearch}
            onChange={(e) => {
              setBookingSearch(e.target.value);
              bookingTable.onResetPage();
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
            value={bookingStatusFilter}
            onChange={(_, v: VipBookingStatusFilter) => {
              setBookingStatusFilter(v);
              bookingTable.onResetPage();
            }}
            variant="scrollable"
            sx={{
              mb: 2,
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
            }}
          >
            <Tab value="all" label={`Tất cả (${bookingCounts.all})`} />
            <Tab value="new" label={`${VIP_BOOKING_STATUS_LABEL.new} (${bookingCounts.new})`} />
            <Tab
              value="confirmed"
              label={`${VIP_BOOKING_STATUS_LABEL.confirmed} (${bookingCounts.confirmed})`}
            />
            <Tab
              value="completed"
              label={`${VIP_BOOKING_STATUS_LABEL.completed} (${bookingCounts.completed})`}
            />
            <Tab
              value="cancelled"
              label={`${VIP_BOOKING_STATUS_LABEL.cancelled} (${bookingCounts.cancelled})`}
            />
          </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Phòng đặt</TableCell>
                  <TableCell>Ngày & giờ mong muốn</TableCell>
                  <TableCell align="center">Số khách</TableCell>
                  <TableCell>Ngày đặt</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings
                  .slice(
                    bookingTable.page * bookingTable.rowsPerPage,
                    bookingTable.page * bookingTable.rowsPerPage + bookingTable.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.phone} · {item.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                          <Typography variant="body2">{item.roomName}</Typography>
                          <Chip
                            size="small"
                            label={item.roomId}
                            sx={{ bgcolor: 'background.neutral', fontSize: 11 }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.preferredDate} · {item.preferredTime}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{item.guests}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.createdAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={VIP_BOOKING_STATUS_LABEL[item.status]}
                          color={VIP_BOOKING_STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'new' && (
                            <>
                              <Tooltip title="Xác nhận đặt phòng">
                                <IconButton
                                  size="small"
                                  sx={{ color: SPA2_TEAL_DARK }}
                                  onClick={() => handleSetBookingStatus(item.id, 'confirmed')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ đặt phòng">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetBookingStatus(item.id, 'cancelled')}
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
                                  onClick={() => handleSetBookingStatus(item.id, 'completed')}
                                >
                                  <Iconify icon="solar:diploma-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ đặt phòng">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetBookingStatus(item.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="Xem chi tiết">
                            <IconButton size="small" onClick={() => setViewBooking(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredBookings.length === 0 && (
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
            count={filteredBookings.length}
            page={bookingTable.page}
            rowsPerPage={bookingTable.rowsPerPage}
            onPageChange={bookingTable.onChangePage}
            onRowsPerPageChange={bookingTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Thống kê đặt phòng VIP — KPI tổng quan → phân bổ theo trạng thái (lọc nhanh)
          → bảng chi tiết theo từng phòng VIP */}
      {tab === 'booking_stats' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:calendar-mark-bold"
                label="Tổng lượt đặt phòng"
                value={bookingCounts.all}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:bed-bold"
                label="Phòng được đặt nhiều nhất"
                value={mostBookedRoom?.name ?? '—'}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:check-circle-bold"
                label="Tỷ lệ hoàn tất"
                value={bookingCompletionRate === null ? '—' : `${bookingCompletionRate}%`}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:close-circle-bold"
                label="Tỷ lệ huỷ đặt phòng"
                value={bookingCancellationRate === null ? '—' : `${bookingCancellationRate}%`}
              />
            </Grid>
          </Grid>

          <Card sx={{ bgcolor: SPA2_CREAM_DARK, borderRadius: 3, p: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
            >
              Phân bổ theo trạng thái
            </Typography>
            <Scrollbar sx={{ maxHeight: 120 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                spacing={2}
                sx={{ py: 1 }}
              >
                <Spa2ListAnalytic
                  icon="solar:calendar-mark-bold-duotone"
                  title="Tất cả"
                  total={bookingCounts.all}
                  percent={100}
                  active={bookingStatusFilter === 'all'}
                  onClick={() => setBookingStatusFilter('all')}
                />
                <Spa2ListAnalytic
                  icon="solar:bell-bold-duotone"
                  title={VIP_BOOKING_STATUS_LABEL.new}
                  total={bookingCounts.new}
                  percent={bookingCounts.all ? (bookingCounts.new / bookingCounts.all) * 100 : 0}
                  active={bookingStatusFilter === 'new'}
                  onClick={() => setBookingStatusFilter('new')}
                />
                <Spa2ListAnalytic
                  icon="solar:phone-calling-bold-duotone"
                  title={VIP_BOOKING_STATUS_LABEL.confirmed}
                  total={bookingCounts.confirmed}
                  percent={
                    bookingCounts.all ? (bookingCounts.confirmed / bookingCounts.all) * 100 : 0
                  }
                  active={bookingStatusFilter === 'confirmed'}
                  onClick={() => setBookingStatusFilter('confirmed')}
                />
                <Spa2ListAnalytic
                  icon="solar:check-circle-bold-duotone"
                  title={VIP_BOOKING_STATUS_LABEL.completed}
                  total={bookingCounts.completed}
                  percent={
                    bookingCounts.all ? (bookingCounts.completed / bookingCounts.all) * 100 : 0
                  }
                  active={bookingStatusFilter === 'completed'}
                  onClick={() => setBookingStatusFilter('completed')}
                />
                <Spa2ListAnalytic
                  icon="solar:close-circle-bold-duotone"
                  title={VIP_BOOKING_STATUS_LABEL.cancelled}
                  total={bookingCounts.cancelled}
                  percent={
                    bookingCounts.all ? (bookingCounts.cancelled / bookingCounts.all) * 100 : 0
                  }
                  active={bookingStatusFilter === 'cancelled'}
                  onClick={() => setBookingStatusFilter('cancelled')}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Phòng VIP</TableCell>
                    <TableCell align="center">Lượt đặt</TableCell>
                    <TableCell align="center">Mới / Đã xác nhận</TableCell>
                    <TableCell align="center">Hoàn tất / Huỷ</TableCell>
                    <TableCell sx={{ minWidth: 180 }}>Tỷ lệ hoàn tất</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookingRoomStats.map((room) => (
                    <TableRow key={room.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              flexShrink: 0,
                              backgroundImage: `url(${room.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                          <Typography variant="body2">{room.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{room.count}</TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={`${room.new}/${room.confirmed}`}
                          sx={{ bgcolor: 'background.neutral' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Box component="span" sx={{ fontSize: 13, color: 'success.main' }}>
                            {room.completed}
                          </Box>
                          <Box component="span" sx={{ fontSize: 13, color: 'error.main' }}>
                            {room.cancelled}
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {room.completionRate === null ? (
                          <Typography variant="caption" color="text.disabled">
                            —
                          </Typography>
                        ) : (
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <LinearProgress
                              variant="determinate"
                              value={room.completionRate}
                              sx={{
                                flex: 1,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: SPA2_CREAM_DARK,
                                '& .MuiLinearProgress-bar': { bgcolor: SPA2_TEAL },
                              }}
                            />
                            <Typography variant="caption" sx={{ minWidth: 34, fontWeight: 600 }}>
                              {room.completionRate}%
                            </Typography>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2VIPRoomPageView banner={banner} rooms={rooms} perks={perks} />
        </Box>
      )}

      {/* Room create / edit dialog */}
      <Dialog open={openRoomForm} onClose={() => setOpenRoomForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editRoomId !== null ? t('vip_room.room_form_edit') : t('vip_room.room_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('vip_room.col_name')}
                  value={roomForm.name}
                  onChange={handleRoomChange('name')}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('vip_room.col_size')}
                    value={roomForm.size}
                    onChange={handleRoomChange('size')}
                    fullWidth
                  />
                  <TextField
                    label={t('vip_room.col_capacity')}
                    value={roomForm.capacity}
                    onChange={handleRoomChange('capacity')}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('vip_room.col_price')}
                    type="number"
                    value={roomForm.price}
                    onChange={handleRoomChange('price')}
                    fullWidth
                  />
                  <TextField
                    label={t('vip_room.col_duration')}
                    value={roomForm.duration}
                    onChange={handleRoomChange('duration')}
                    fullWidth
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('vip_room.room_form_image')}
                  value={roomForm.image}
                  onChange={(next) => setRoomForm((p) => ({ ...p, image: next }))}
                  height={160}
                  helperText={t('vip_room.room_form_image_help')}
                />
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Tiện nghi phòng
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                      onClick={addRoomFeature}
                    >
                      Thêm tiện nghi
                    </Button>
                  </Stack>
                  {roomFeatures.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Chưa có tiện nghi nào — nhấn &quot;Thêm tiện nghi&quot; để bắt đầu.
                    </Typography>
                  )}
                  <Stack spacing={1}>
                    {roomFeatures.map((row) => (
                      <Stack key={row.id} direction="row" spacing={1} alignItems="center">
                        <TextField
                          fullWidth
                          size="small"
                          value={row.value}
                          onChange={(e) => updateRoomFeature(row.id, e.target.value)}
                          placeholder="VD: Bồn tắm đá hoa cương"
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeRoomFeature(row.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
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
                <RoomPreviewCard form={roomPreviewForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoomForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleRoomSubmit}
            disabled={!roomForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editRoomId !== null ? t('vip_room.room_form_edit') : t('vip_room.room_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Perk create / edit dialog */}
      <Dialog open={openPerkForm} onClose={() => setOpenPerkForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editPerkId !== null ? t('vip_room.perk_form_edit') : t('vip_room.perk_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('vip_room.perk_form_icon')}
                  value={perkForm.icon}
                  onChange={handlePerkChange('icon')}
                  helperText={t('vip_room.perk_form_icon_help')}
                  fullWidth
                />
                <TextField
                  label={t('vip_room.perk_form_title')}
                  value={perkForm.title}
                  onChange={handlePerkChange('title')}
                  fullWidth
                />
                <TextField
                  label={t('vip_room.perk_form_desc')}
                  value={perkForm.desc}
                  onChange={handlePerkChange('desc')}
                  fullWidth
                  multiline
                  rows={3}
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
                <PerkPreviewCard icon={perkForm.icon} title={perkForm.title} desc={perkForm.desc} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPerkForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handlePerkSubmit}
            disabled={!perkForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editPerkId !== null ? t('vip_room.perk_form_edit') : t('vip_room.perk_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking detail dialog */}
      <Dialog open={!!viewBooking} onClose={() => setViewBooking(null)} maxWidth="sm" fullWidth>
        {viewBooking && (
          <>
            <DialogTitle>Chi tiết đặt phòng VIP</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ pt: 0.5 }}>
                <TextField
                  label="Khách hàng"
                  value={viewBooking.customer}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Số điện thoại"
                    value={viewBooking.phone}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Email"
                    value={viewBooking.email}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <TextField
                  label="Phòng VIP"
                  value={`${viewBooking.roomName} (${viewBooking.roomId})`}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Ngày & giờ mong muốn"
                    value={`${viewBooking.preferredDate} · ${viewBooking.preferredTime}`}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Số khách"
                    value={viewBooking.guests}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <TextField
                  label="Ngày đặt"
                  value={viewBooking.createdAt}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label="Ghi chú"
                  value={viewBooking.note || '—'}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  select
                  label="Trạng thái"
                  value={viewBooking.status}
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    handleSetBookingStatus(
                      viewBooking.id,
                      e.target.value as Spa2VipRoomBookingStatus
                    )
                  }
                >
                  {VIP_BOOKING_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {VIP_BOOKING_STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewBooking(null)}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <ConfirmDialog
        open={!!deleteRoomId}
        onClose={() => setDeleteRoomId(null)}
        title={t('vip_room.room_delete_title')}
        content={t('vip_room.room_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleRoomDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deletePerkId}
        onClose={() => setDeletePerkId(null)}
        title={t('vip_room.perk_delete_title')}
        content={t('vip_room.perk_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handlePerkDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
