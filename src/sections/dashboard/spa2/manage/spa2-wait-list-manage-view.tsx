import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

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

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2WaitlistPageView } from 'src/sections/spa2/view/spa2-content-pages9';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  spa2WaitlistSlots,
  spa2WaitlistBanner,
  type Spa2WaitlistSlot,
  SPA2_WAITLIST_ENTRIES,
  type Spa2WaitlistEntry,
  type Spa2WaitlistBanner,
  type Spa2WaitlistEntryStatus,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages9.tsx's
// Spa2WaitlistPageView renders on the public /spa2/wait-list page: the hero
// banner (eyebrow/title/subtitle), the info alert (infoNote) and the list of
// full waitlist slots (service/branch/date/time/waiting count) - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The "Tham gia chờ" join flow and the
// flexible opt-in box on the public page are purely client-derived
// interactive demo state and are intentionally not mocked/editable here; the
// flexible box's service dropdown is derived automatically from the slots'
// `service` values.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_SLOT: Omit<Spa2WaitlistSlot, 'id'> = {
  service: '',
  branch: '',
  date: '',
  time: '',
  waiting: 0,
};

type WaitlistEntryStatusFilter = Spa2WaitlistEntryStatus | 'all';

const ENTRY_STATUS_OPTIONS: Spa2WaitlistEntryStatus[] = ['waiting', 'notified', 'booked', 'expired'];

const ENTRY_STATUS_LABEL: Record<Spa2WaitlistEntryStatus, string> = {
  waiting: 'Đang chờ',
  notified: 'Đã thông báo',
  booked: 'Đã đặt lịch',
  expired: 'Hết hạn',
};

const ENTRY_STATUS_COLOR: Record<
  Spa2WaitlistEntryStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  waiting: 'info',
  notified: 'warning',
  booked: 'success',
  expired: 'error',
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

// Mirrors the hero + info-alert block rendered at the top of the public
// Spa2WaitlistPageView page: eyebrow/title/subtitle over a cream background,
// followed by the "thông báo ưu tiên" info alert (banner.infoNote).
function BannerPreview({ banner }: { banner: Spa2WaitlistBanner }) {
  return (
    <Box sx={{ bgcolor: 'background.neutral', py: { xs: 5, md: 6 }, px: 3 }}>
      <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
      <Alert severity="info" icon={<Iconify icon="solar:bell-bold" />} sx={{ borderRadius: 3 }}>
        {banner.infoNote}
      </Alert>
    </Box>
  );
}

// Mirrors one waitlist slot card exactly as rendered in the public list:
// calendar icon, service name, branch/date/time meta, "N người đang chờ"
// chip and the (here inert) "Tham gia chờ" button.
function SlotPreviewCard({ slot }: { slot: Omit<Spa2WaitlistSlot, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: 'background.neutral',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon="solar:calendar-mark-bold" width={24} sx={{ color: SPA2_TEAL }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
            {slot.service || '(Chưa đặt tên dịch vụ)'}
          </Typography>
          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Iconify icon="solar:map-point-bold" width={13} sx={{ color: SPA2_TEAL }} />
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                {slot.branch}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Iconify icon="solar:calendar-bold" width={13} sx={{ color: SPA2_TEAL }} />
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                {slot.date} · {slot.time}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Chip
          label={`${slot.waiting} người đang chờ`}
          size="small"
          sx={{ bgcolor: '#FEF3E2', color: '#854F0B' }}
        />
        <Button
          disabled
          sx={{
            borderRadius: 99,
            px: 2.5,
            bgcolor: SPA2_TEAL,
            color: 'white',
            flexShrink: 0,
            '&.Mui-disabled': { bgcolor: SPA2_TEAL, color: 'white', opacity: 0.6 },
          }}
        >
          Tham gia chờ
        </Button>
      </Stack>
    </Card>
  );
}

// KPI tile used at the top of the "entries" tab.
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

export function Spa2WaitListManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2WaitlistBanner>(() => ({ ...spa2WaitlistBanner }));
  const [slots, setSlots] = useState<Spa2WaitlistSlot[]>(() =>
    spa2WaitlistSlots.map((item) => ({ ...item }))
  );
  const [entries, setEntries] = useState<Spa2WaitlistEntry[]>(() =>
    SPA2_WAITLIST_ENTRIES.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'slots' | 'entries' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Danh sách người chờ (entries) ----
  const [entrySearch, setEntrySearch] = useState('');
  const [entryStatusFilter, setEntryStatusFilter] = useState<WaitlistEntryStatusFilter>('all');
  const [entrySlotFilter, setEntrySlotFilter] = useState('all');
  const entryTable = useTable({ defaultRowsPerPage: 5 });

  const slotById = useMemo(() => new Map(slots.map((item) => [item.id, item])), [slots]);

  const filteredEntries = entries.filter((e) => {
    const q = entrySearch.trim().toLowerCase();
    const matchSearch =
      !q || e.customerName.toLowerCase().includes(q) || e.phone.includes(entrySearch.trim());
    const matchStatus = entryStatusFilter === 'all' || e.status === entryStatusFilter;
    const matchSlot = entrySlotFilter === 'all' || e.slotId === entrySlotFilter;
    return matchSearch && matchStatus && matchSlot;
  });

  const entryCounts = {
    all: entries.length,
    waiting: entries.filter((e) => e.status === 'waiting').length,
    notified: entries.filter((e) => e.status === 'notified').length,
    booked: entries.filter((e) => e.status === 'booked').length,
    expired: entries.filter((e) => e.status === 'expired').length,
  };

  const entryConversionRate =
    entryCounts.booked + entryCounts.expired
      ? Math.round((entryCounts.booked / (entryCounts.booked + entryCounts.expired)) * 100)
      : null;

  const handleSetEntryStatus = (id: string, status: Spa2WaitlistEntryStatus) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    markDirty();
  };

  // ---- Banner ----
  const updateBanner = (key: keyof Spa2WaitlistBanner, value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Slots CRUD ----
  const [slotDialog, setSlotDialog] = useState(false);
  const [slotEditId, setSlotEditId] = useState<string | null>(null);
  const [slotForm, setSlotForm] = useState<Omit<Spa2WaitlistSlot, 'id'>>(EMPTY_SLOT);
  const [slotDeleteId, setSlotDeleteId] = useState<string | null>(null);

  const openCreateSlot = () => {
    setSlotForm(EMPTY_SLOT);
    setSlotEditId(null);
    setSlotDialog(true);
  };
  const openEditSlot = (item: Spa2WaitlistSlot) => {
    const { id, ...rest } = item;
    setSlotForm({ ...rest });
    setSlotEditId(id);
    setSlotDialog(true);
  };
  const submitSlot = () => {
    const next: Omit<Spa2WaitlistSlot, 'id'> = {
      ...slotForm,
      waiting: Number(slotForm.waiting),
    };
    if (slotEditId) {
      setSlots((prev) =>
        prev.map((item) => (item.id === slotEditId ? { ...item, ...next } : item))
      );
    } else {
      setSlots((prev) => [...prev, withId(next)]);
    }
    setSlotDialog(false);
    markDirty();
  };
  const confirmDeleteSlot = () => {
    setSlots((prev) => prev.filter((item) => item.id !== slotDeleteId));
    setSlotDeleteId(null);
    markDirty();
  };
  const reorderSlots = (next: Spa2WaitlistSlot[]) => {
    setSlots(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2WaitlistBanner });
    setSlots(spa2WaitlistSlots.map((item) => ({ ...item })));
    setEntries(SPA2_WAITLIST_ENTRIES.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('wait_list.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.wait_list')}
      publicPath={paths.spa2.waitList}
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
          label={t('wait_list.tab_banner')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="slots"
          label={t('wait_list.tab_slots')}
          icon={<Iconify icon="solar:clock-circle-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="entries"
          label={t('wait_list.tab_entries')}
          icon={<Iconify icon="solar:users-group-rounded-bold-duotone" width={20} />}
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
            <SectionCard title={t('wait_list.tab_banner')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <TextField
                  label={t('wait_list.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('wait_list.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('wait_list.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('wait_list.banner_info_note')}
                  value={banner.infoNote}
                  onChange={(e) => updateBanner('infoNote', e.target.value)}
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

      {/* Slots */}
      {tab === 'slots' && (
        <SectionCard
          title={t('wait_list.tab_slots')}
          icon="solar:clock-circle-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateSlot}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('wait_list.add_slot_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('wait_list.drag_hint')}
          </Typography>
          {slots.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('wait_list.no_slots')}
            </Typography>
          )}
          <Spa2SortableGrid items={slots} onReorder={reorderSlots}>
            <Stack spacing={2}>
              {slots.map((item) => (
                <Spa2SortableItem key={item.id} id={item.id}>
                  {(sortable) => (
                    <Box sx={{ position: 'relative' }}>
                      <SlotPreviewCard slot={item} />
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
                          onClick={() => openEditSlot(item)}
                          sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:pen-bold" width={14} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setSlotDeleteId(item.id)}
                          sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                        </IconButton>
                      </Stack>
                    </Box>
                  )}
                </Spa2SortableItem>
              ))}
            </Stack>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Danh sách người chờ (entries) */}
      {tab === 'entries' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:users-group-rounded-bold"
                label="Tổng người chờ"
                value={entryCounts.all}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:bell-bold"
                label="Đang chờ"
                value={entryCounts.waiting}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:check-circle-bold"
                label="Đã đặt lịch"
                value={entryCounts.booked}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:graph-up-bold"
                label="Tỷ lệ chuyển đổi"
                value={entryConversionRate === null ? '—' : `${entryConversionRate}%`}
              />
            </Grid>
          </Grid>

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
                {t('wait_list.tab_entries')}
              </Typography>
              <TextField
                select
                size="small"
                value={entrySlotFilter}
                onChange={(e) => {
                  setEntrySlotFilter(e.target.value);
                  entryTable.onResetPage();
                }}
                sx={{ minWidth: 240 }}
              >
                <MenuItem value="all">Tất cả khung giờ</MenuItem>
                {slots.map((slot) => (
                  <MenuItem key={slot.id} value={slot.id}>
                    {slot.service} · {slot.date} {slot.time}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

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
                    total={entryCounts.all}
                    percent={100}
                    icon="solar:users-group-rounded-bold-duotone"
                    color={SPA2_TEAL}
                    unitLabel="người"
                    active={entryStatusFilter === 'all'}
                    onClick={() => {
                      setEntryStatusFilter('all');
                      entryTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={ENTRY_STATUS_LABEL.waiting}
                    total={entryCounts.waiting}
                    percent={entryCounts.all ? (entryCounts.waiting / entryCounts.all) * 100 : 0}
                    icon="solar:bell-bold-duotone"
                    color="#0C447C"
                    unitLabel="người"
                    active={entryStatusFilter === 'waiting'}
                    onClick={() => {
                      setEntryStatusFilter('waiting');
                      entryTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={ENTRY_STATUS_LABEL.notified}
                    total={entryCounts.notified}
                    percent={entryCounts.all ? (entryCounts.notified / entryCounts.all) * 100 : 0}
                    icon="solar:phone-calling-bold-duotone"
                    color="#FFAB00"
                    unitLabel="người"
                    active={entryStatusFilter === 'notified'}
                    onClick={() => {
                      setEntryStatusFilter('notified');
                      entryTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={ENTRY_STATUS_LABEL.booked}
                    total={entryCounts.booked}
                    percent={entryCounts.all ? (entryCounts.booked / entryCounts.all) * 100 : 0}
                    icon="solar:check-circle-bold-duotone"
                    color="#22C55E"
                    unitLabel="người"
                    active={entryStatusFilter === 'booked'}
                    onClick={() => {
                      setEntryStatusFilter('booked');
                      entryTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title={ENTRY_STATUS_LABEL.expired}
                    total={entryCounts.expired}
                    percent={entryCounts.all ? (entryCounts.expired / entryCounts.all) * 100 : 0}
                    icon="solar:close-circle-bold-duotone"
                    color="#637381"
                    unitLabel="người"
                    active={entryStatusFilter === 'expired'}
                    onClick={() => {
                      setEntryStatusFilter('expired');
                      entryTable.onResetPage();
                    }}
                  />
                </Stack>
              </Scrollbar>
            </Card>

            <TextField
              placeholder="Tìm theo tên khách hoặc số điện thoại..."
              value={entrySearch}
              onChange={(e) => {
                setEntrySearch(e.target.value);
                entryTable.onResetPage();
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
              value={entryStatusFilter}
              onChange={(_, v: WaitlistEntryStatusFilter) => {
                setEntryStatusFilter(v);
                entryTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                mb: 2,
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${entryCounts.all})`} />
              {ENTRY_STATUS_OPTIONS.map((status) => (
                <Tab
                  key={status}
                  value={status}
                  label={`${ENTRY_STATUS_LABEL[status]} (${entryCounts[status]})`}
                />
              ))}
            </Tabs>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Khung giờ chờ</TableCell>
                    <TableCell align="center">Vị trí xếp hàng</TableCell>
                    <TableCell>Ngày tham gia</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align="right">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEntries
                    .slice(
                      entryTable.page * entryTable.rowsPerPage,
                      entryTable.page * entryTable.rowsPerPage + entryTable.rowsPerPage
                    )
                    .map((item) => {
                      const slot = slotById.get(item.slotId);
                      return (
                        <TableRow key={item.id} hover>
                          <TableCell>
                            <Stack>
                              <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                                {item.customerName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.phone}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{slot?.service ?? item.slotId}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {slot ? `${slot.date} · ${slot.time}` : '—'}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip size="small" label={`#${item.position}`} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{item.joinedAt}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={ENTRY_STATUS_LABEL[item.status]}
                              color={ENTRY_STATUS_COLOR[item.status]}
                              variant="soft"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                              {item.status === 'waiting' && (
                                <>
                                  <Tooltip title="Đánh dấu đã thông báo">
                                    <IconButton
                                      size="small"
                                      sx={{ color: SPA2_TEAL_DARK }}
                                      onClick={() => handleSetEntryStatus(item.id, 'notified')}
                                    >
                                      <Iconify icon="solar:bell-bold" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Đánh dấu hết hạn">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleSetEntryStatus(item.id, 'expired')}
                                    >
                                      <Iconify icon="solar:close-circle-bold" />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                              {item.status === 'notified' && (
                                <>
                                  <Tooltip title="Đánh dấu đã đặt lịch">
                                    <IconButton
                                      size="small"
                                      color="success"
                                      onClick={() => handleSetEntryStatus(item.id, 'booked')}
                                    >
                                      <Iconify icon="solar:check-circle-bold" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Đánh dấu hết hạn">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleSetEntryStatus(item.id, 'expired')}
                                    >
                                      <Iconify icon="solar:close-circle-bold" />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {filteredEntries.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                        Không có dữ liệu
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePaginationCustom
              count={filteredEntries.length}
              page={entryTable.page}
              rowsPerPage={entryTable.rowsPerPage}
              onPageChange={entryTable.onChangePage}
              onRowsPerPageChange={entryTable.onChangeRowsPerPage}
            />
          </Card>
        </Stack>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2WaitlistPageView banner={banner} slots={slots} />
        </Box>
      )}

      {/* Slot add/edit dialog */}
      <Dialog open={slotDialog} onClose={() => setSlotDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {slotEditId ? t('common.edit') : t('wait_list.add_slot_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('wait_list.form_slot_service')}
                  value={slotForm.service}
                  onChange={(e) => setSlotForm((p) => ({ ...p, service: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('wait_list.form_slot_branch')}
                  value={slotForm.branch}
                  onChange={(e) => setSlotForm((p) => ({ ...p, branch: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('wait_list.form_slot_date')}
                    value={slotForm.date}
                    onChange={(e) => setSlotForm((p) => ({ ...p, date: e.target.value }))}
                    placeholder="dd/mm/yyyy"
                    fullWidth
                  />
                  <TextField
                    label={t('wait_list.form_slot_time')}
                    value={slotForm.time}
                    onChange={(e) => setSlotForm((p) => ({ ...p, time: e.target.value }))}
                    placeholder="hh:mm"
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('wait_list.form_slot_waiting')}
                  type="number"
                  value={slotForm.waiting}
                  onChange={(e) => setSlotForm((p) => ({ ...p, waiting: Number(e.target.value) }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <SlotPreviewCard slot={slotForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSlotDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitSlot}
            disabled={!slotForm.service}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {slotEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!slotDeleteId}
        onClose={() => setSlotDeleteId(null)}
        title={t('wait_list.slot_delete_title')}
        content={t('wait_list.slot_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteSlot}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
