import type { IDatePickerControl } from 'src/types/common';

import dayjs from 'dayjs';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
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
import TableContainer from '@mui/material/TableContainer';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2AppointmentBanner,
  spa2AppointmentHistory,
  spa2AppointmentUpcoming,
  type Spa2AppointmentBanner,
  type Spa2AppointmentStatus,
  type Spa2AppointmentRecord,
  spa2AppointmentLoyaltyPoints,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';
import {
  Spa2ContentPageHero4,
  Spa2AppointmentPageView,
} from 'src/sections/spa2/view/spa2-content-pages4';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2AppointmentPageView renders on the public /spa2/appointment page: the
// page banner, the upcoming/history appointment lists and the loyalty-points
// balance — read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The tab selector, reschedule dialog and review-submission UI on the public
// page are purely interactive UI (no admin-editable content) and are
// intentionally not mocked here, matching the project convention. The status
// label/color mapping is kept as a local UI-styling constant here too,
// mirroring the same choice made on the public page.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const STATUS_CONFIG: Record<
  Spa2AppointmentStatus,
  { label: string; color: string; bgcolor: string }
> = {
  confirmed: { label: 'Đã xác nhận', color: '#2E7D32', bgcolor: '#E8F5E9' },
  pending: { label: 'Chờ xác nhận', color: '#854F0B', bgcolor: '#FEF3E2' },
  done: { label: 'Đã hoàn thành', color: '#0C447C', bgcolor: '#EBF5FF' },
  cancelled: { label: 'Đã hủy', color: '#C62828', bgcolor: '#FFEBEE' },
};

const STATUS_OPTIONS: Spa2AppointmentStatus[] = ['pending', 'confirmed', 'done', 'cancelled'];

// Non-final statuses can always be cancelled; each non-final status also has
// exactly one "advance" action, following the pending -> confirmed -> done
// flow (mirrors the same convention used for the "onway" advance button in
// spa2-home-service-manage-view.tsx).
const NEXT_APPOINTMENT_STATUS: Partial<Record<Spa2AppointmentStatus, Spa2AppointmentStatus>> = {
  pending: 'confirmed',
  confirmed: 'done',
};

const APPOINTMENT_ADVANCE_META: Partial<
  Record<Spa2AppointmentStatus, { icon: string; tooltip: string }>
> = {
  pending: { icon: 'solar:check-circle-bold', tooltip: 'Xác nhận lịch hẹn' },
  confirmed: { icon: 'solar:flag-2-bold', tooltip: 'Đánh dấu hoàn thành' },
};

const APPOINTMENT_KPI_META: Record<Spa2AppointmentStatus, { icon: string; color: string }> = {
  pending: { icon: 'solar:bell-bold-duotone', color: STATUS_CONFIG.pending.color },
  confirmed: { icon: 'solar:check-circle-bold-duotone', color: STATUS_CONFIG.confirmed.color },
  done: { icon: 'solar:cup-star-bold-duotone', color: STATUS_CONFIG.done.color },
  cancelled: { icon: 'solar:close-circle-bold-duotone', color: STATUS_CONFIG.cancelled.color },
};

// The mock data (and the table/preview display) stores date/time as plain
// dd/mm/yyyy + hh:mm strings; these helpers bridge that stored string format
// with the Dayjs values the native MUI DatePicker/TimePicker (already used
// project-wide, e.g. src/sections/order/order-table-toolbar.tsx, with the
// dayjs adapter wired up globally in src/locales/localization-provider.tsx)
// work with.
const DATE_STORE_FORMAT = 'DD/MM/YYYY';
const TIME_STORE_FORMAT = 'HH:mm';

const parseStoredDate = (value: string): IDatePickerControl =>
  value ? dayjs(value, DATE_STORE_FORMAT) : null;

const parseStoredTime = (value: string): IDatePickerControl =>
  value ? dayjs(value, TIME_STORE_FORMAT) : null;

const formatPickerValue = (value: IDatePickerControl, format: string): string =>
  value && value.isValid() ? value.format(format) : '';

type AppointmentFormState = {
  date: IDatePickerControl;
  time: IDatePickerControl;
  service: string;
  branch: string;
  ktv: string;
  status: Spa2AppointmentStatus;
  price: number;
  rating: number;
};

const EMPTY_FORM: AppointmentFormState = {
  date: null,
  time: null,
  service: '',
  branch: '',
  ktv: '',
  status: 'confirmed',
  price: 0,
  rating: 0,
};

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

// Compact live-preview summary shown in the add/edit dialog — appointments
// have no per-item card on the public page to mirror, so this is a
// purpose-built summary consistent with the teal/rounded card language used
// across spa2 (see Spa2SoftCard in src/sections/spa2/view/spa2-content-pages.tsx).
function AppointmentPreviewCard({ form }: { form: AppointmentFormState }) {
  const status = STATUS_CONFIG[form.status];
  const dateLabel = formatPickerValue(form.date, DATE_STORE_FORMAT) || '—';
  const timeLabel = formatPickerValue(form.time, TIME_STORE_FORMAT) || '—';

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        bgcolor: 'common.white',
        border: `1px solid ${SPA2_CREAM_DARK}`,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Chip
          size="small"
          label={status.label}
          sx={{ color: status.color, bgcolor: status.bgcolor, fontWeight: 600 }}
        />
        <Typography variant="subtitle1" sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
          {form.price ? `${Number(form.price).toLocaleString('vi-VN')}đ` : '—'}
        </Typography>
      </Stack>
      <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, mb: 2 }}>
        {form.service || '(Chưa đặt tên dịch vụ)'}
      </Typography>
      <Stack spacing={1.25}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="solar:calendar-bold" width={18} sx={{ color: SPA2_TEAL }} />
          <Typography variant="body2">
            {dateLabel} · {timeLabel}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="solar:map-point-bold" width={18} sx={{ color: SPA2_TEAL }} />
          <Typography variant="body2">{form.branch || '—'}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="solar:user-bold" width={18} sx={{ color: SPA2_TEAL }} />
          <Typography variant="body2">{form.ktv || '—'}</Typography>
        </Stack>
        {form.rating > 0 && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating value={form.rating} readOnly size="small" />
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export function Spa2AppointmentManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2AppointmentBanner>(() => ({
    ...spa2AppointmentBanner,
    image: { ...spa2AppointmentBanner.image },
  }));
  const [loyaltyPoints, setLoyaltyPoints] = useState(spa2AppointmentLoyaltyPoints);
  const [upcoming, setUpcoming] = useState<Spa2AppointmentRecord[]>(spa2AppointmentUpcoming);
  const [history, setHistory] = useState<Spa2AppointmentRecord[]>(spa2AppointmentHistory);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'upcoming' | 'history' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AppointmentBanner['image']) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2AppointmentBanner, image: { ...spa2AppointmentBanner.image } });
    setLoyaltyPoints(spa2AppointmentLoyaltyPoints);
    setUpcoming(spa2AppointmentUpcoming);
    setHistory(spa2AppointmentHistory);
    setDirty(false);
  };

  const [openForm, setOpenForm] = useState(false);
  const [editKey, setEditKey] = useState<{ list: 'upcoming' | 'history'; id: string } | null>(null);
  const [deleteKey, setDeleteKey] = useState<{ list: 'upcoming' | 'history'; id: string } | null>(
    null
  );
  const [formList, setFormList] = useState<'upcoming' | 'history'>('upcoming');
  const [form, setForm] = useState<AppointmentFormState>(EMPTY_FORM);

  const [upcomingStatusFilter, setUpcomingStatusFilter] = useState<Spa2AppointmentStatus | 'all'>(
    'all'
  );
  const [historyStatusFilter, setHistoryStatusFilter] = useState<Spa2AppointmentStatus | 'all'>(
    'all'
  );

  const upcomingCounts = useMemo(
    () => ({
      all: upcoming.length,
      confirmed: upcoming.filter((x) => x.status === 'confirmed').length,
      pending: upcoming.filter((x) => x.status === 'pending').length,
      done: upcoming.filter((x) => x.status === 'done').length,
      cancelled: upcoming.filter((x) => x.status === 'cancelled').length,
    }),
    [upcoming]
  );
  const historyCounts = useMemo(
    () => ({
      all: history.length,
      confirmed: history.filter((x) => x.status === 'confirmed').length,
      pending: history.filter((x) => x.status === 'pending').length,
      done: history.filter((x) => x.status === 'done').length,
      cancelled: history.filter((x) => x.status === 'cancelled').length,
    }),
    [history]
  );
  const historyAvgRating = useMemo(() => {
    const rated = history.filter((x) => (x.rating ?? 0) > 0);
    return rated.length
      ? rated.reduce((sum, x) => sum + (x.rating ?? 0), 0) / rated.length
      : 0;
  }, [history]);

  const filteredUpcoming = useMemo(
    () =>
      upcomingStatusFilter === 'all'
        ? upcoming
        : upcoming.filter((x) => x.status === upcomingStatusFilter),
    [upcoming, upcomingStatusFilter]
  );
  const filteredHistory = useMemo(
    () =>
      historyStatusFilter === 'all'
        ? history
        : history.filter((x) => x.status === historyStatusFilter),
    [history, historyStatusFilter]
  );

  const handleChange =
    (field: 'service' | 'branch' | 'ktv' | 'price' | 'rating') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({
        ...p,
        [field]: field === 'price' || field === 'rating' ? Number(e.target.value) : e.target.value,
      }));

  const openCreate = (list: 'upcoming' | 'history') => {
    setForm(EMPTY_FORM);
    setFormList(list);
    setEditKey(null);
    setOpenForm(true);
  };
  const openEdit = (list: 'upcoming' | 'history', item: Spa2AppointmentRecord) => {
    setForm({
      date: parseStoredDate(item.date),
      time: parseStoredTime(item.time),
      service: item.service,
      branch: item.branch,
      ktv: item.ktv,
      status: item.status,
      price: item.price,
      rating: item.rating ?? 0,
    });
    setFormList(list);
    setEditKey({ list, id: item.id });
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next: Omit<Spa2AppointmentRecord, 'id'> = {
      date: formatPickerValue(form.date, DATE_STORE_FORMAT),
      time: formatPickerValue(form.time, TIME_STORE_FORMAT),
      service: form.service,
      branch: form.branch,
      ktv: form.ktv,
      status: form.status,
      price: Number(form.price),
      ...(form.rating > 0 ? { rating: Number(form.rating) } : {}),
    };
    const setList = formList === 'upcoming' ? setUpcoming : setHistory;
    if (editKey !== null) {
      setList((p) => p.map((x) => (x.id === editKey.id ? { ...x, ...next } : x)));
    } else {
      setList((p) => [...p, withId(next)]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editKey, formList]);

  const handleDelete = useCallback(() => {
    if (!deleteKey) return;
    const setList = deleteKey.list === 'upcoming' ? setUpcoming : setHistory;
    setList((p) => p.filter((x) => x.id !== deleteKey.id));
    setDeleteKey(null);
    setDirty(true);
  }, [deleteKey]);

  const handleSetStatus = useCallback(
    (list: 'upcoming' | 'history', id: string, status: Spa2AppointmentStatus) => {
      const setList = list === 'upcoming' ? setUpcoming : setHistory;
      setList((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
      setDirty(true);
    },
    []
  );

  const renderTable = (list: 'upcoming' | 'history', rows: Spa2AppointmentRecord[]) => {
    const counts = list === 'upcoming' ? upcomingCounts : historyCounts;
    const statusFilter = list === 'upcoming' ? upcomingStatusFilter : historyStatusFilter;
    const setStatusFilter = list === 'upcoming' ? setUpcomingStatusFilter : setHistoryStatusFilter;
    const columnCount = list === 'history' ? 8 : 7;

    return (
      <Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {list === 'upcoming'
              ? t('appointment.upcoming_section')
              : t('appointment.history_section')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => openCreate(list)}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {t('appointment.add_btn')}
          </Button>
        </Stack>

        {/* KPI */}
        <Scrollbar sx={{ minHeight: 108 }}>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2, px: 2.5 }}
          >
            <Spa2ListAnalytic
              title="Tất cả"
              total={counts.all}
              percent={100}
              icon="solar:calendar-mark-bold-duotone"
              color={SPA2_TEAL}
              unitLabel="lịch hẹn"
              active={statusFilter === 'all'}
              onClick={() => setStatusFilter('all')}
            />
            {STATUS_OPTIONS.map((s) => (
              <Spa2ListAnalytic
                key={s}
                title={STATUS_CONFIG[s].label}
                total={counts[s]}
                percent={counts.all ? (counts[s] / counts.all) * 100 : 0}
                icon={APPOINTMENT_KPI_META[s].icon}
                color={APPOINTMENT_KPI_META[s].color}
                unitLabel="lịch hẹn"
                active={statusFilter === s}
                onClick={() => setStatusFilter(s)}
              />
            ))}
            {list === 'history' && (
              <Spa2ListAnalytic
                title="Đánh giá trung bình"
                total={Number(historyAvgRating.toFixed(1))}
                percent={100}
                icon="solar:star-bold-duotone"
                color={SPA2_TEAL_DARK}
                unitLabel="/5"
                secondaryLine={
                  <Rating value={historyAvgRating} precision={0.1} readOnly size="small" />
                }
              />
            )}
          </Stack>
        </Scrollbar>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('appointment.col_date')}</TableCell>
                <TableCell>{t('appointment.col_service')}</TableCell>
                <TableCell>{t('appointment.col_branch')}</TableCell>
                <TableCell>{t('appointment.col_ktv')}</TableCell>
                <TableCell align="right">{t('appointment.col_price')}</TableCell>
                <TableCell>{t('common.status')}</TableCell>
                {list === 'history' && <TableCell>{t('appointment.col_rating')}</TableCell>}
                <TableCell align="right">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item) => {
                const status = STATUS_CONFIG[item.status];
                const nextStatus = NEXT_APPOINTMENT_STATUS[item.status];
                const advanceMeta = nextStatus ? APPOINTMENT_ADVANCE_META[item.status] : undefined;
                const isFinal = item.status === 'done' || item.status === 'cancelled';
                return (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2">{item.date}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>{item.branch}</TableCell>
                    <TableCell>{item.ktv}</TableCell>
                    <TableCell align="right">{item.price.toLocaleString('vi-VN')}đ</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={status.label}
                        sx={{ color: status.color, bgcolor: status.bgcolor, fontWeight: 600 }}
                      />
                    </TableCell>
                    {list === 'history' && (
                      <TableCell>
                        {item.rating ? <Rating value={item.rating} size="small" readOnly /> : '—'}
                      </TableCell>
                    )}
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        {nextStatus && advanceMeta && (
                          <Tooltip title={advanceMeta.tooltip}>
                            <IconButton
                              size="small"
                              sx={{ color: SPA2_TEAL_DARK }}
                              onClick={() => handleSetStatus(list, item.id, nextStatus)}
                            >
                              <Iconify icon={advanceMeta.icon} />
                            </IconButton>
                          </Tooltip>
                        )}
                        {!isFinal && (
                          <Tooltip title="Huỷ lịch hẹn">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleSetStatus(list, item.id, 'cancelled')}
                            >
                              <Iconify icon="solar:close-circle-bold" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openEdit(list, item)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteKey({ list, id: item.id })}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columnCount} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                    {t('common.no_data')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    );
  };

  return (
    <Spa2ManageShell
      title={t('appointment.page_title')}
      description="Banner, lịch hẹn sắp tới, lịch sử và điểm tích lũy hiển thị trên trang Lịch hẹn công khai."
      breadcrumbLabel={t('nav.appointment')}
      publicPath={paths.spa2.appointment}
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
          label={t('appointment.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="upcoming"
          label={`${t('appointment.upcoming_section')} (${upcoming.length})`}
          icon={<Iconify icon="solar:calendar-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="history"
          label={`${t('appointment.history_section')} (${history.length})`}
          icon={<Iconify icon="solar:history-bold-duotone" width={20} />}
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
                  label={t('appointment.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('appointment.banner_image_help')}
                />
                <TextField
                  label={t('appointment.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('appointment.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('appointment.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('appointment.loyalty_points_label')}
                  type="number"
                  value={loyaltyPoints}
                  onChange={(e) => {
                    setLoyaltyPoints(Number(e.target.value));
                    setDirty(true);
                  }}
                  helperText={t('appointment.loyalty_points_help')}
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

      {/* Upcoming */}
      {tab === 'upcoming' && renderTable('upcoming', filteredUpcoming)}

      {/* History */}
      {tab === 'history' && renderTable('history', filteredHistory)}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2AppointmentPageView
            banner={banner}
            upcoming={upcoming}
            history={history}
            loyaltyPoints={loyaltyPoints}
          />
        </Box>
      )}

      {/* Create / edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editKey !== null ? t('appointment.form_edit') : t('appointment.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <DatePicker
                    label={t('appointment.form_date')}
                    value={form.date}
                    onChange={(value: IDatePickerControl) => setForm((p) => ({ ...p, date: value }))}
                    format={DATE_STORE_FORMAT}
                    slotProps={{ textField: { fullWidth: true } }}
                    sx={{ width: 1 }}
                  />
                  <TimePicker
                    label={t('appointment.form_time')}
                    value={form.time}
                    onChange={(value: IDatePickerControl) => setForm((p) => ({ ...p, time: value }))}
                    ampm={false}
                    slotProps={{ textField: { fullWidth: true } }}
                    sx={{ width: 1 }}
                  />
                </Stack>
                <TextField
                  label={t('appointment.col_service')}
                  value={form.service}
                  onChange={handleChange('service')}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('appointment.col_branch')}
                    value={form.branch}
                    onChange={handleChange('branch')}
                    fullWidth
                  />
                  <TextField
                    label={t('appointment.col_ktv')}
                    value={form.ktv}
                    onChange={handleChange('ktv')}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('appointment.col_price')}
                    type="number"
                    value={form.price}
                    onChange={handleChange('price')}
                    fullWidth
                  />
                  <TextField
                    select
                    label={t('common.status')}
                    value={form.status}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, status: e.target.value as Spa2AppointmentStatus }))
                    }
                    fullWidth
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <MenuItem key={s} value={s}>
                        {STATUS_CONFIG[s].label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                {formList === 'history' && (
                  <TextField
                    label={t('appointment.col_rating')}
                    type="number"
                    value={form.rating}
                    onChange={handleChange('rating')}
                    helperText={t('appointment.rating_help')}
                    inputProps={{ min: 0, max: 5 }}
                    fullWidth
                  />
                )}
              </Stack>
            </Grid>
            <Grid xs={12} md={5}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <AppointmentPreviewCard form={form} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.service || !form.date}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editKey !== null ? t('appointment.form_edit') : t('appointment.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteKey}
        onClose={() => setDeleteKey(null)}
        title={t('appointment.delete_title')}
        content={t('appointment.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
