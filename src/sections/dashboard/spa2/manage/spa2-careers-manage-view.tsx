import type { ReactNode } from 'react';
import type { Spa2CareerItem, Spa2AdjustableImage } from 'src/_mock/_spa2';

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
  SPA2_CAREERS,
  spa2JoinReasons,
  spa2CareersBanner,
  spa2WorkplaceGallery,
  spa2RecruitmentProcess,
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

// ----------------------------------------------------------------------
// Manages every content block src/sections/spa2/view/spa2-content-pages.tsx
// (Spa2CareersPageView / Spa2CareerDetailsPageView) renders on the public
// /spa2/careers pages: banner, join reasons, recruitment process, workplace
// gallery, and the job listings themselves — all read from and written back
// in the same shape as src/_mock/_spa2 (the single source of truth shared
// with the public view).
// ----------------------------------------------------------------------

type ReasonItem = { id: string; icon: string; text: string };
type ProcessItem = { id: string; step: string; desc: string };
type GalleryItem = { id: string; image: Spa2AdjustableImage };

const JOB_TYPES = ['Toàn thời gian', 'Bán thời gian', 'Linh hoạt', 'Remote'];

const EMPTY_FORM = {
  title: '',
  location: '',
  type: 'Toàn thời gian',
  salary: '',
  benefits: '',
  description: '',
};

type StatusFilter = 'all' | 'open' | 'closed';

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

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

// ----------------------------------------------------------------------

export function Spa2CareersManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2CareersBanner,
    image: { ...spa2CareersBanner.image },
  }));
  const [reasons, setReasons] = useState<ReasonItem[]>(() =>
    spa2JoinReasons.map((r) => withId({ ...r }))
  );
  const [process, setProcess] = useState<ProcessItem[]>(() =>
    spa2RecruitmentProcess.map((p) => withId({ ...p }))
  );
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    spa2WorkplaceGallery.map((image) => withId({ image: { ...image } }))
  );
  const [items, setItems] = useState<Spa2CareerItem[]>(SPA2_CAREERS);

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'reasons' | 'positions' | 'process' | 'gallery' | 'preview'
  >('banner');
  const markDirty = () => setDirty(true);

  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<StatusFilter>('all');
  const table = useTable({ defaultRowsPerPage: 5 });
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Reasons CRUD ----
  const updateReason = (id: string, key: 'icon' | 'text', value: string) => {
    setReasons((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
    markDirty();
  };
  const addReason = () => {
    setReasons((prev) => [...prev, withId({ icon: 'solar:star-bold-duotone', text: '' })]);
    markDirty();
  };
  const [reasonDeleteId, setReasonDeleteId] = useState<string | null>(null);
  const confirmDeleteReason = () => {
    setReasons((prev) => prev.filter((r) => r.id !== reasonDeleteId));
    setReasonDeleteId(null);
    markDirty();
  };
  const reorderReasons = (next: ReasonItem[]) => {
    setReasons(next);
    markDirty();
  };

  // ---- Recruitment process CRUD ----
  const updateProcessStep = (id: string, key: 'step' | 'desc', value: string) => {
    setProcess((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    markDirty();
  };
  const addProcessStep = () => {
    setProcess((prev) => [...prev, withId({ step: '', desc: '' })]);
    markDirty();
  };
  const [processDeleteId, setProcessDeleteId] = useState<string | null>(null);
  const confirmDeleteProcess = () => {
    setProcess((prev) => prev.filter((p) => p.id !== processDeleteId));
    setProcessDeleteId(null);
    markDirty();
  };
  const reorderProcess = (next: ProcessItem[]) => {
    setProcess(next);
    markDirty();
  };

  // ---- Workplace gallery CRUD ----
  const addGalleryImage = () => {
    setGallery((prev) => [
      ...prev,
      withId({ image: { url: '', focalX: 50, focalY: 50, zoom: 100 } }),
    ]);
    markDirty();
  };
  const updateGalleryImage = (id: string, img: Spa2AdjustableImage) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, image: img } : g)));
    markDirty();
  };
  const [galleryDeleteId, setGalleryDeleteId] = useState<string | null>(null);
  const confirmDeleteGallery = () => {
    setGallery((prev) => prev.filter((g) => g.id !== galleryDeleteId));
    setGalleryDeleteId(null);
    markDirty();
  };
  const reorderGallery = (next: GalleryItem[]) => {
    setGallery(next);
    markDirty();
  };

  // ---- Job listings CRUD ----
  const filtered = useMemo(
    () =>
      items.filter((c) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
        const matchStatus = statusTab === 'all' || c.status === statusTab;
        return matchSearch && matchStatus;
      }),
    [items, search, statusTab]
  );

  const counts = {
    all: items.length,
    open: items.filter((c) => c.status === 'open').length,
    closed: items.filter((c) => c.status === 'closed').length,
    applications: items.reduce((sum, c) => sum + (c.applications ?? 0), 0),
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = {
      title: form.title,
      location: form.location,
      type: form.type,
      salary: form.salary,
      benefits: form.benefits
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean),
      description: form.description,
    };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [
        {
          ...next,
          id: newId,
          status: 'open',
          applications: 0,
          postedAt: new Date().toISOString().slice(0, 10),
        },
        ...p,
      ]);
    }
    setOpenForm(false);
    markDirty();
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    markDirty();
  }, [deleteId]);

  const handleToggleStatus = useCallback((id: number) => {
    setItems((p) =>
      p.map((x) => (x.id === id ? { ...x, status: x.status === 'open' ? 'closed' : 'open' } : x))
    );
    markDirty();
  }, []);

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2CareersBanner, image: { ...spa2CareersBanner.image } });
    setReasons(spa2JoinReasons.map((r) => withId({ ...r })));
    setProcess(spa2RecruitmentProcess.map((p) => withId({ ...p })));
    setGallery(spa2WorkplaceGallery.map((image) => withId({ image: { ...image } })));
    setItems(SPA2_CAREERS);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('careers.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.careers')}
      publicPath={paths.spa2.careers}
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
          label={t('careers.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reasons"
          label={t('careers.reasons_section')}
          icon={<Iconify icon="solar:star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="positions"
          label={t('careers.positions_section')}
          icon={<Iconify icon="solar:case-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="process"
          label={t('careers.process_section')}
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="gallery"
          label={t('careers.gallery_section')}
          icon={<Iconify icon="solar:gallery-add-bold-duotone" width={20} />}
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
        <SectionCard title={t('careers.banner_section')} icon="solar:gallery-wide-bold-duotone">
          <Grid container spacing={3}>
            <Grid xs={12} md={5}>
              <Spa2ImageField
                label={t('careers.banner_image')}
                value={banner.image}
                onChange={updateBannerImage}
                height={220}
                helperText={t('careers.banner_image_help')}
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('careers.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('careers.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('careers.banner_subtitle')}
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

      {/* Lý do gia nhập */}
      {tab === 'reasons' && (
        <SectionCard
          title={t('careers.reasons_section')}
          icon="solar:star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={addReason}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('careers.reasons_add')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('common.drag_hint')}
          </Typography>
          {reasons.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('careers.reasons_empty')}
            </Typography>
          )}
          <Spa2SortableGrid items={reasons} onReorder={reorderReasons}>
            <Grid container spacing={2}>
              {reasons.map((r) => (
                <Grid key={r.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={r.id}>
                    {(sortable) => (
                      <Stack spacing={1} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setReasonDeleteId(r.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                        <TextField
                          value={r.icon}
                          onChange={(e) => updateReason(r.id, 'icon', e.target.value)}
                          size="small"
                          label={t('careers.reasons_icon')}
                          fullWidth
                        />
                        <TextField
                          value={r.text}
                          onChange={(e) => updateReason(r.id, 'text', e.target.value)}
                          size="small"
                          label={t('careers.reasons_text')}
                          fullWidth
                          multiline
                          minRows={2}
                        />
                      </Stack>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Danh sách vị trí */}
      {tab === 'positions' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Iconify icon="solar:case-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {t('careers.positions_section')}
                </Typography>
              </Stack>
              <Button
                size="small"
                onClick={openCreate}
                startIcon={<Iconify icon="mingcute:add-line" width={16} />}
              >
                {t('careers.add_btn')}
              </Button>
            </Stack>
          </Box>

          {/* KPI cards */}
          <Grid container spacing={2} sx={{ p: 2.5 }}>
            {[
              { label: t('common.all'), value: counts.all, icon: 'solar:case-bold-duotone' },
              {
                label: t('careers.status_open'),
                value: counts.open,
                icon: 'solar:play-circle-bold-duotone',
              },
              {
                label: t('careers.status_closed'),
                value: counts.closed,
                icon: 'solar:pause-circle-bold-duotone',
              },
              {
                label: t('careers.col_applications'),
                value: counts.applications,
                icon: 'solar:users-group-rounded-bold-duotone',
              },
            ].map((k) => (
              <Grid key={k.label} xs={6} md={3}>
                <Card
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: SPA2_CREAM,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: `${SPA2_TEAL}15`,
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

          <Box sx={{ px: 2.5 }}>
            <Tabs
              value={statusTab}
              onChange={(_, v) => {
                setStatusTab(v);
                table.onResetPage();
              }}
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab
                value="all"
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{t('common.all')}</span>
                    <Chip size="small" label={counts.all} />
                  </Stack>
                }
              />
              <Tab
                value="open"
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{t('careers.status_open')}</span>
                    <Chip size="small" color="success" label={counts.open} />
                  </Stack>
                }
              />
              <Tab
                value="closed"
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{t('careers.status_closed')}</span>
                    <Chip size="small" label={counts.closed} />
                  </Stack>
                }
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 2 }}>
            <TextField
              placeholder={t('careers.search_placeholder')}
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
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('careers.col_position')}</TableCell>
                  <TableCell>{t('careers.col_location')}</TableCell>
                  <TableCell>{t('careers.col_salary')}</TableCell>
                  <TableCell align="center">{t('careers.col_applications')}</TableCell>
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
                            {item.title}
                          </Typography>
                          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} flexWrap="wrap">
                            <Chip
                              size="small"
                              label={item.type}
                              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                            />
                            {item.benefits.slice(0, 2).map((b) => (
                              <Chip
                                key={b}
                                size="small"
                                variant="outlined"
                                label={b}
                                sx={{ borderColor: `${SPA2_TEAL}55`, color: 'text.secondary' }}
                              />
                            ))}
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Iconify
                            icon="solar:map-point-bold"
                            width={14}
                            sx={{ color: SPA2_TEAL }}
                          />
                          <Typography variant="body2">{item.location}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: SPA2_TEAL_DARK, fontWeight: 600 }}>
                          {item.salary}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={item.applications ?? 0}
                          sx={{ bgcolor: `${SPA2_TEAL}15`, color: SPA2_TEAL_DARK, fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            item.status === 'open'
                              ? t('careers.status_open')
                              : t('careers.status_closed')
                          }
                          color={item.status === 'open' ? 'success' : 'default'}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          <Tooltip
                            title={
                              item.status === 'open' ? t('common.disable') : t('common.enable')
                            }
                          >
                            <IconButton size="small" onClick={() => handleToggleStatus(item.id)}>
                              <Iconify
                                icon={
                                  item.status === 'open'
                                    ? 'solar:lock-bold'
                                    : 'solar:lock-unlocked-bold'
                                }
                                sx={{
                                  color: item.status === 'open' ? 'warning.main' : 'success.main',
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.edit')}>
                            <IconButton
                              size="small"
                              component={RouterLink}
                              href={paths.dashboard.spa2.careerDetails(item.id)}
                            >
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

      {/* Quy trình tuyển dụng */}
      {tab === 'process' && (
        <SectionCard
          title={t('careers.process_section')}
          icon="solar:routing-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={addProcessStep}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('careers.process_add')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('common.drag_hint')}
          </Typography>
          {process.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('careers.process_empty')}
            </Typography>
          )}
          <Spa2SortableGrid items={process} onReorder={reorderProcess}>
            <Stack spacing={1.5}>
              {process.map((p, idx) => (
                <Spa2SortableItem key={p.id} id={p.id}>
                  {(sortable) => (
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ p: 1.5, borderRadius: 2, bgcolor: SPA2_CREAM }}
                    >
                      <Spa2DragHandle sortable={sortable} />
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: SPA2_TEAL,
                          color: 'common.white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <TextField
                        value={p.step}
                        onChange={(e) => updateProcessStep(p.id, 'step', e.target.value)}
                        size="small"
                        label={t('careers.process_step')}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        value={p.desc}
                        onChange={(e) => updateProcessStep(p.id, 'desc', e.target.value)}
                        size="small"
                        label={t('careers.process_desc')}
                        sx={{ flex: 2 }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setProcessDeleteId(p.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Stack>
                  )}
                </Spa2SortableItem>
              ))}
            </Stack>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Môi trường làm việc */}
      {tab === 'gallery' && (
        <SectionCard
          title={t('careers.gallery_section')}
          icon="solar:gallery-add-bold-duotone"
          action={
            <Button
              size="small"
              onClick={addGalleryImage}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('careers.gallery_add')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('common.drag_hint')}
          </Typography>
          {gallery.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('careers.gallery_empty')}
            </Typography>
          )}
          <Spa2SortableGrid items={gallery} onReorder={reorderGallery}>
            <Grid container spacing={2}>
              {gallery.map((g) => (
                <Grid key={g.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={g.id}>
                    {(sortable) => (
                      <Stack spacing={1} sx={{ p: 1.5, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setGalleryDeleteId(g.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                        <Spa2ImageField
                          value={g.image}
                          onChange={(img) => updateGalleryImage(g.id, img)}
                          height={130}
                          allowZoom={false}
                        />
                      </Stack>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Job listing dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {editId !== null ? t('careers.form_edit') : t('careers.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('careers.form_title')}
              value={form.title}
              onChange={handleChange('title')}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('careers.form_location')}
                value={form.location}
                onChange={handleChange('location')}
                fullWidth
              />
              <TextField
                select
                label={t('careers.form_type')}
                value={form.type}
                onChange={handleChange('type')}
                fullWidth
              >
                {JOB_TYPES.map((jobType) => (
                  <MenuItem key={jobType} value={jobType}>
                    {jobType}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              label={t('careers.form_salary')}
              value={form.salary}
              onChange={handleChange('salary')}
              fullWidth
            />
            <TextField
              label={t('careers.form_description')}
              value={form.description}
              onChange={handleChange('description')}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label={t('careers.form_benefits')}
              value={form.benefits}
              onChange={handleChange('benefits')}
              fullWidth
              multiline
              rows={2}
              helperText={t('common.comma_hint')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('careers.form_edit') : t('careers.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('careers.delete_title')}
        content={t('careers.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!reasonDeleteId}
        onClose={() => setReasonDeleteId(null)}
        title={t('careers.reasons_delete_title')}
        content={t('careers.reasons_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteReason}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!processDeleteId}
        onClose={() => setProcessDeleteId(null)}
        title={t('careers.process_delete_title')}
        content={t('careers.process_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProcess}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!galleryDeleteId}
        onClose={() => setGalleryDeleteId(null)}
        title={t('careers.gallery_section')}
        content={t('careers.reasons_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteGallery}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Live preview */}
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
              {t('careers.reasons_section')}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {reasons.map((r) => (
                <Grid key={r.id} xs={6} sm={3}>
                  <Card sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                    <Iconify icon={r.icon} width={28} sx={{ color: SPA2_TEAL, mb: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block' }}>
                      {r.text}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              {t('careers.positions_section')}
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 4 }}>
              {items.map((c) => (
                <Card key={c.id} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2">{c.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {c.location} · {c.type} · {c.salary}
                  </Typography>
                </Card>
              ))}
            </Stack>

            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              {t('careers.process_section')}
            </Typography>
            <Stack spacing={0} sx={{ mb: 4 }}>
              {process.map((p, idx) => (
                <Stack key={p.id} direction="row" spacing={2}>
                  <Stack alignItems="center" sx={{ minWidth: 30 }}>
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        bgcolor: SPA2_TEAL,
                        color: 'common.white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </Box>
                    {idx < process.length - 1 && (
                      <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }} />
                    )}
                  </Stack>
                  <Box sx={{ pb: 2.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: SPA2_INK }}>
                      {p.step}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.desc}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              {t('careers.gallery_section')}
            </Typography>
            <Grid container spacing={1.5}>
              {gallery.map((g) => (
                <Grid key={g.id} xs={6} sm={3}>
                  <Box
                    sx={{
                      aspectRatio: '4/3',
                      borderRadius: 2,
                      bgcolor: SPA2_CREAM_DARK,
                      backgroundImage: `url(${g.image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
