import type { Spa2AdjustableImage, Spa2BeforeAfterStatus } from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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

import { useTranslate } from 'src/locales';
import { spa2BeforeAfterBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
  Spa2BeforeAfterSlider,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2BeforeAfters,
  SPA2_TEAL_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/before-after page
// (Spa2BeforeAfterPageView) renders that is driven by spa2BeforeAfters: banner
// + the before/after slider grid. Only status 'approved' items render on the
// public page — the dashboard's Duyệt / Từ chối actions directly control this
// via a real, persisted `status` field (previously synthesized locally and
// never wired to the public page).
// ─────────────────────────────────────────────────────────────────────────────

type BeforeAfter = (typeof spa2BeforeAfters)[number];

const EMPTY_FORM = { title: '', before: '', after: '', duration: '', note: '' };

const STATUS_COLOR: Record<Spa2BeforeAfterStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};
const STATUS_LABEL: Record<Spa2BeforeAfterStatus, string> = {
  pending: 'common.pending',
  approved: 'common.approved',
  rejected: 'common.rejected',
};

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

function BeforeAfterPreviewCard({
  form,
}: {
  form: { title: string; before: string; after: string; duration: string; note: string };
}) {
  return (
    <Spa2SoftCard sx={{ p: 2 }}>
      <Spa2BeforeAfterSlider before={form.before} after={form.after} />
      <Box sx={{ pt: 2 }}>
        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {form.title || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          Thời gian: {form.duration}
        </Typography>
        <Typography sx={{ fontSize: 14, color: SPA2_TEAL_DARK, mt: 0.5 }}>{form.note}</Typography>
      </Box>
    </Spa2SoftCard>
  );
}

export function Spa2BeforeAfterManageView() {
  const { t } = useTranslate('spa2-manage');
  const statusLabel = (s: Spa2BeforeAfterStatus) => t(STATUS_LABEL[s]);

  const [banner, setBanner] = useState(() => ({
    ...spa2BeforeAfterBanner,
    image: { ...spa2BeforeAfterBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'preview'>('banner');

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
    setBanner({ ...spa2BeforeAfterBanner, image: { ...spa2BeforeAfterBanner.image } });
    setDirty(false);
  };

  const [items, setItems] = useState<BeforeAfter[]>(spa2BeforeAfters);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<BeforeAfter | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));
  const approvedItems = items.filter((b) => b.status === 'approved');

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: BeforeAfter) => {
    setForm({
      title: item.title,
      before: item.before,
      after: item.after,
      duration: item.duration,
      note: item.note,
    });
    setEditId(item.id.toString());
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = (Math.max(0, ...items.map((x) => parseInt(x.id, 10))) + 1).toString();
      setItems((p) => [...p, { ...form, id: newId, status: 'pending' }]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  const handleSetStatus = useCallback((id: string, status: Spa2BeforeAfterStatus) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status } : v));
    setDirty(true);
  }, []);

  return (
    <Spa2ManageShell
      title={t('before_after.page_title')}
      description="Banner và các ca trước/sau hiển thị trên trang Trước & Sau công khai."
      breadcrumbLabel={t('nav.before_after')}
      publicPath={paths.spa2.beforeAfter}
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
          label={t('before_after.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('before_after.list_section')}
          icon={<Iconify icon="solar:gallery-round-bold-duotone" width={20} />}
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
                  label={t('before_after.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('before_after.banner_image_help')}
                />
                <TextField
                  label={t('before_after.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('before_after.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('before_after.banner_subtitle')}
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

      {/* Danh sách case trước/sau */}
      {tab === 'list' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <TextField
              placeholder={t('before_after.search_placeholder')}
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
              {t('before_after.add_btn')}
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('before_after.col_case')}</TableCell>
                  <TableCell>{t('before_after.col_duration')}</TableCell>
                  <TableCell>{t('before_after.col_note')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          component="img"
                          src={item.before}
                          sx={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 0.5 }}
                        />
                        <Iconify
                          icon="solar:arrow-right-bold"
                          width={14}
                          sx={{ color: 'text.disabled' }}
                        />
                        <Box
                          component="img"
                          src={item.after}
                          sx={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 0.5 }}
                        />
                        <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                          {item.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell sx={{ maxWidth: 240 }}>
                      <Typography variant="body2" noWrap color="text.secondary">
                        {item.note}
                      </Typography>
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
                            <Tooltip title={t('common.approve')}>
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleSetStatus(item.id, 'approved')}
                              >
                                <Iconify icon="solar:check-circle-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('common.reject')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleSetStatus(item.id, 'rejected')}
                              >
                                <Iconify icon="solar:close-circle-bold" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        <Tooltip title={t('common.view')}>
                          <IconButton size="small" onClick={() => setViewItem(item)}>
                            <Iconify icon="solar:eye-bold" />
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
      )}

      {/* Live preview — mirrors Spa2BeforeAfterPageView's slider grid (approved only) */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />

          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container>
              <Spa2SectionTitle eyebrow="Trải nghiệm" title="Kéo để so sánh" />
              {approvedItems.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có ca nào được duyệt để hiển thị công khai.
                </Typography>
              ) : (
                <Grid container spacing={4}>
                  {approvedItems.map((ba) => (
                    <Grid key={ba.id} xs={12} sm={6}>
                      <BeforeAfterPreviewCard form={ba} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>
        </Box>
      )}

      {/* View dialog */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="md" fullWidth>
        <DialogTitle>{t('before_after.detail_title')}</DialogTitle>
        <DialogContent dividers>
          {viewItem && <BeforeAfterPreviewCard form={viewItem} />}
        </DialogContent>
        <DialogActions>
          {viewItem?.status === 'pending' && (
            <>
              <Button
                color="error"
                onClick={() => {
                  handleSetStatus(viewItem.id, 'rejected');
                  setViewItem(null);
                }}
              >
                {t('common.reject')}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleSetStatus(viewItem.id, 'approved');
                  setViewItem(null);
                }}
              >
                {t('common.approve')}
              </Button>
            </>
          )}
          <Button onClick={() => setViewItem(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>

      {/* Create / Edit dialog - left: form, right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editId !== null ? t('before_after.form_edit') : t('before_after.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('before_after.form_title')}
                  value={form.title}
                  onChange={handleChange('title')}
                  fullWidth
                />
                <TextField
                  label={t('before_after.form_before')}
                  value={form.before}
                  onChange={handleChange('before')}
                  fullWidth
                />
                <TextField
                  label={t('before_after.form_after')}
                  value={form.after}
                  onChange={handleChange('after')}
                  fullWidth
                />
                <TextField
                  label={t('before_after.form_duration')}
                  value={form.duration}
                  onChange={handleChange('duration')}
                  fullWidth
                />
                <TextField
                  label={t('before_after.form_note')}
                  value={form.note}
                  onChange={handleChange('note')}
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
                <BeforeAfterPreviewCard form={form} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('before_after.form_edit') : t('before_after.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('before_after.delete_title')}
        content={t('before_after.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
