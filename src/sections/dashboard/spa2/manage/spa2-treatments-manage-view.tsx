import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
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
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { spa2TreatmentsBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  formatVND,
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Treatments,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  spa2TreatmentProcess,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/treatments page (Spa2TreatmentsPageView)
// renders that is driven by spa2Treatments: banner + the treatment-card grid.
// The "Kích hoạt / Tắt" toggle now writes to a real `active` field, so it
// actually controls whether a treatment appears in the public list —
// previously the public page ignored this and always rendered every item.
// ─────────────────────────────────────────────────────────────────────────────

type Treatment = (typeof spa2Treatments)[number];
type ProcessStep = (typeof spa2TreatmentProcess)[number] & { id: string };

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_FORM = {
  name: '',
  sessions: 8,
  duration: '2 tháng',
  price: 0,
  target: '',
  includes: '',
};

function formatVNDShort(value: number) {
  return `${value.toLocaleString('vi-VN')}đ`;
}

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

function TreatmentPreviewCard({
  form,
}: {
  form: {
    name: string;
    target: string;
    sessions: number;
    duration: string;
    price: number;
    includes: string[];
  };
}) {
  return (
    <Spa2SoftCard>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <Stack>
          <Typography variant="h6" sx={{ color: SPA2_INK }}>
            {form.name || '(Chưa đặt tên)'}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{form.target}</Typography>
        </Stack>
        <Chip label={`${form.sessions} buổi`} sx={{ bgcolor: SPA2_TEAL, color: 'white' }} />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Iconify icon="solar:calendar-bold" sx={{ color: SPA2_TEAL }} />
        <Typography sx={{ color: 'text.secondary' }}>Thời lượng: {form.duration}</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography sx={{ color: SPA2_INK, mb: 1.5, fontWeight: 600 }}>Bao gồm:</Typography>
      <Stack spacing={1}>
        {form.includes.length === 0 ? (
          <Typography sx={{ fontSize: 13, color: 'text.disabled' }}>—</Typography>
        ) : (
          form.includes.map((i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="center">
              <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} width={18} />
              <Typography sx={{ color: 'text.secondary' }}>{i}</Typography>
            </Stack>
          ))
        )}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ color: SPA2_TEAL }}>
          {formatVND(form.price)}
        </Typography>
        <Button
          disabled
          sx={{ borderRadius: 999, px: 3, bgcolor: SPA2_TEAL, color: 'white', opacity: 0.7 }}
        >
          Đăng ký
        </Button>
      </Stack>
    </Spa2SoftCard>
  );
}

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

function ProcessStepPreview({
  title,
  desc,
  index,
  isLast,
}: {
  title: string;
  desc: string;
  index: number;
  isLast: boolean;
}) {
  return (
    <Stack direction="row" spacing={3}>
      <Stack alignItems="center" sx={{ minWidth: 56 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </Box>
        {!isLast && <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }} />}
      </Stack>
      <Box sx={{ pb: 4 }}>
        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
          {title || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{desc}</Typography>
      </Box>
    </Stack>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: SPA2_CREAM,
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

export function Spa2TreatmentsManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2TreatmentsBanner,
    image: { ...spa2TreatmentsBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'process' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
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
    setBanner({ ...spa2TreatmentsBanner, image: { ...spa2TreatmentsBanner.image } });
    setProcess(spa2TreatmentProcess.map((p) => withId({ ...p })));
    setDirty(false);
  };

  const [items, setItems] = useState<Treatment[]>(spa2Treatments);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'all' || (statusFilter === 'active' ? item.active : !item.active);
    return matchSearch && matchStatus;
  });
  const activePreviewItems = items.filter((item) => item.active);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({
        ...p,
        [field]:
          field === 'sessions' || field === 'price' ? Number(e.target.value) : e.target.value,
      }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Treatment) => {
    setForm({
      name: item.name,
      sessions: item.sessions,
      duration: item.duration,
      price: item.price,
      target: item.target,
      includes: item.includes.join(', '),
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = {
      name: form.name,
      sessions: Number(form.sessions),
      duration: form.duration,
      price: Number(form.price),
      target: form.target,
      includes: form.includes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...next, id: newId, active: true }]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  const handleToggle = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
    setDirty(true);
  }, []);

  const stats = useMemo(() => {
    const activeCount = items.filter((x) => x.active).length;
    const prices = items.map((x) => x.price);
    const avgPrice = prices.length
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : 0;
    const avgSessions = items.length
      ? Math.round(items.reduce((a, b) => a + b.sessions, 0) / items.length)
      : 0;
    return {
      total: items.length,
      active: activeCount,
      inactive: items.length - activeCount,
      avgPrice,
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      avgSessions,
    };
  }, [items]);

  // ---- Quy trình điều trị (spa2TreatmentProcess) - inline sortable edit, no popup ----
  const [process, setProcess] = useState<ProcessStep[]>(() =>
    spa2TreatmentProcess.map((p) => withId({ ...p }))
  );
  const updateProcessStep = (id: string, key: 'title' | 'desc', value: string) => {
    setProcess((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    setDirty(true);
  };
  const addProcessStep = () => {
    setProcess((prev) => [...prev, withId({ title: '', desc: '' })]);
    setDirty(true);
  };
  const [processDeleteId, setProcessDeleteId] = useState<string | null>(null);
  const confirmDeleteProcess = () => {
    setProcess((prev) => prev.filter((p) => p.id !== processDeleteId));
    setProcessDeleteId(null);
    setDirty(true);
  };
  const reorderProcess = (next: ProcessStep[]) => {
    setProcess(next);
    setDirty(true);
  };

  const previewForm = {
    name: form.name,
    target: form.target,
    sessions: Number(form.sessions),
    duration: form.duration,
    price: Number(form.price),
    includes: form.includes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  };

  return (
    <Spa2ManageShell
      title={t('treatments.page_title')}
      description="Banner và danh sách liệu trình hiển thị trên trang Liệu trình công khai."
      breadcrumbLabel={t('nav.treatments')}
      publicPath={paths.spa2.treatments}
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
          label={t('treatments.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('treatments.list_section')}
          icon={<Iconify icon="solar:health-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="process"
          label={t('treatments.process_section')}
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('treatments.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('treatments.banner_image_help')}
                />
                <TextField
                  label={t('treatments.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('treatments.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('treatments.banner_subtitle')}
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
              <Spa2PageHero
                image={banner.image.url}
                imageStyle={banner.image}
                eyebrow={banner.eyebrow}
                title={banner.title}
                subtitle={banner.subtitle}
              />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Danh sách liệu trình */}
      {tab === 'list' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={12} md={8}>
              <Card sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2, height: '100%' }}>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
                >
                  {t('treatments.stat_by_status')}
                </Typography>
                <Scrollbar sx={{ maxHeight: 120 }}>
                  <Stack
                    direction="row"
                    divider={
                      <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                    }
                    spacing={2}
                    sx={{ py: 1 }}
                  >
                    <Spa2ListAnalytic
                      icon="solar:health-bold-duotone"
                      title={t('common.all')}
                      total={stats.total}
                      percent={100}
                      active={statusFilter === 'all'}
                      onClick={() => setStatusFilter('all')}
                    />
                    <Spa2ListAnalytic
                      icon="solar:eye-bold-duotone"
                      title={t('common.active')}
                      total={stats.active}
                      percent={stats.total ? (stats.active / stats.total) * 100 : 0}
                      color="success"
                      active={statusFilter === 'active'}
                      onClick={() => setStatusFilter('active')}
                    />
                    <Spa2ListAnalytic
                      icon="solar:eye-closed-bold-duotone"
                      title={t('common.inactive')}
                      total={stats.inactive}
                      percent={stats.total ? (stats.inactive / stats.total) * 100 : 0}
                      color="warning"
                      active={statusFilter === 'inactive'}
                      onClick={() => setStatusFilter('inactive')}
                    />
                  </Stack>
                </Scrollbar>
              </Card>
            </Grid>
            <Grid xs={6} md={2}>
              <StatCard
                icon="solar:tag-price-bold"
                label={t('treatments.stat_avg_price')}
                value={formatVNDShort(stats.avgPrice)}
              />
            </Grid>
            <Grid xs={6} md={2}>
              <StatCard
                icon="solar:calendar-bold"
                label={t('treatments.stat_avg_sessions')}
                value={`${stats.avgSessions} buổi`}
              />
            </Grid>
          </Grid>

          <Card>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              <TextField
                placeholder={t('treatments.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{ width: 280 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreate}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('treatments.add_btn')}
              </Button>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('treatments.col_name')}</TableCell>
                    <TableCell>{t('treatments.col_target')}</TableCell>
                    <TableCell align="center">{t('treatments.col_sessions')}</TableCell>
                    <TableCell>{t('treatments.col_duration')}</TableCell>
                    <TableCell align="right">{t('treatments.col_price')}</TableCell>
                    <TableCell>{t('common.status')}</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2">{item.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.includes.slice(0, 2).join(' · ')}
                            {item.includes.length > 2 && ' ...'}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{item.target}</TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={`${item.sessions} buổi`}
                          color="primary"
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" fontWeight={600}>
                          {item.price.toLocaleString('vi-VN')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={item.active ? t('common.active') : t('common.inactive')}
                          color={item.active ? 'success' : 'default'}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          <Tooltip title={item.active ? t('common.disable') : t('common.enable')}>
                            <IconButton size="small" onClick={() => handleToggle(item.id)}>
                              <Iconify
                                icon={item.active ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
                                color={item.active ? 'warning.main' : 'success.main'}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.edit')}>
                            <IconButton size="small" onClick={() => openEdit(item)}>
                              <Iconify icon="solar:pen-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.delete')}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteId(item.id)}
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
        </Stack>
      )}

      {/* Quy trình điều trị - inline sortable edit (like Careers "Quy trình tuyển dụng") */}
      {tab === 'process' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('treatments.process_section')}
              icon="solar:routing-2-bold-duotone"
              action={
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={addProcessStep}
                  sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
                >
                  {t('treatments.process_add_btn')}
                </Button>
              }
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1.5, display: 'block' }}
              >
                {t('common.drag_hint')}
              </Typography>
                <Spa2SortableGrid items={process} onReorder={reorderProcess}>
                {process.map((step: ProcessStep, idx: number) => (
                  <Spa2SortableItem key={step.id} id={step.id}>
                    {(sortable) => (
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="flex-start"
                        sx={{ bgcolor: SPA2_CREAM, borderRadius: 2, p: 1.5, mb: 1.5 }}
                      >
                        <Spa2DragHandle sortable={sortable} sx={{ mt: 1 }} />
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 13,
                            flexShrink: 0,
                            mt: 0.5,
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                          <TextField
                            size="small"
                            label={t('treatments.process_col_title')}
                            value={step.title}
                            onChange={(e) => updateProcessStep(step.id, 'title', e.target.value)}
                            fullWidth
                          />
                          <TextField
                            size="small"
                            label={t('treatments.process_col_desc')}
                            value={step.desc}
                            onChange={(e) => updateProcessStep(step.id, 'desc', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                          />
                        </Stack>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setProcessDeleteId(step.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                ))}
                </Spa2SortableGrid>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Box sx={{ bgcolor: SPA2_CREAM, p: 3 }}>
                  <Spa2SectionTitle eyebrow="Quy trình" title="4 bước điều trị chuẩn y khoa" />
                  <Stack spacing={0}>
                    {process.map((p, idx) => (
                      <ProcessStepPreview
                        key={p.id}
                        title={p.title}
                        desc={p.desc}
                        index={idx}
                        isLast={idx === process.length - 1}
                      />
                    ))}
                  </Stack>
                </Box>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Live preview — mirrors Spa2TreatmentsPageView: banner + card grid (active only) + process */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />

          <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container>
              {activePreviewItems.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có liệu trình nào đang hiển thị.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {activePreviewItems.map((t2) => (
                    <Grid key={t2.id} xs={12} md={6}>
                      <TreatmentPreviewCard form={t2} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
            <Container maxWidth="md">
              <Spa2SectionTitle eyebrow="Quy trình" title="4 bước điều trị chuẩn y khoa" />
              <Grid container spacing={3}>
                {process.map((p, idx) => (
                  <Grid key={p.id} xs={6} md={3}>
                    <Spa2SoftCard sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h3"
                        sx={{ color: SPA2_TEAL_LIGHT, fontWeight: 700, mb: 1 }}
                      >
                        {idx + 1}
                      </Typography>
                      <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 1 }}>
                        {p.title}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {p.desc}
                      </Typography>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
      )}

      {/* Create / Edit dialog - left: form, right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editId !== null ? t('treatments.form_edit') : t('treatments.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('treatments.form_name')}
                  value={form.name}
                  onChange={handleChange('name')}
                  fullWidth
                />
                <TextField
                  label={t('treatments.form_target')}
                  value={form.target}
                  onChange={handleChange('target')}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('treatments.col_sessions')}
                    type="number"
                    value={form.sessions}
                    onChange={handleChange('sessions')}
                    fullWidth
                  />
                  <TextField
                    label={t('treatments.col_duration')}
                    value={form.duration}
                    onChange={handleChange('duration')}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('treatments.col_price')}
                  type="number"
                  value={form.price}
                  onChange={handleChange('price')}
                  fullWidth
                />
                <TextField
                  label={t('treatments.form_includes')}
                  value={form.includes}
                  onChange={handleChange('includes')}
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
                <TreatmentPreviewCard form={previewForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('treatments.form_edit') : t('treatments.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('treatments.delete_title')}
        content={t('treatments.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!processDeleteId}
        onClose={() => setProcessDeleteId(null)}
        title={t('treatments.process_delete_title')}
        content={t('treatments.process_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProcess}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
