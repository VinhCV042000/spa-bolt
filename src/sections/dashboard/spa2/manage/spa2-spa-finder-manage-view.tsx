import type { Spa2AdjustableImage ,
  Spa2SpaFinderBanner,
  Spa2SpaFinderTherapist} from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2SpaFinderBanner,
  spa2SpaFinderTherapists
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SpaFinderPageView } from 'src/sections/spa2/view/spa2-content-pages4';
import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2SpaFinderPageView renders on the public /spa2/spa-finder page: the page
// banner and the KTV (therapist) directory — read from and written back in
// the same shape as src/_mock/_spa2, the single source of truth shared with
// the public view. City/specialty filter chips and the availability toggle
// are purely interactive UI (no admin-editable content) and are intentionally
// not mocked here, matching the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_THERAPIST_FORM = {
  name: '',
  role: '',
  avatar: '',
  branch: '',
  rating: 4.8,
  reviews: 0,
  exp: '',
  available: true,
  specialties: '',
  nextSlot: '',
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

export function Spa2SpaFinderManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SpaFinderBanner>(() => ({
    ...spa2SpaFinderBanner,
    image: { ...spa2SpaFinderBanner.image },
  }));
  const [therapists, setTherapists] = useState<Spa2SpaFinderTherapist[]>(spa2SpaFinderTherapists);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'therapists' | 'preview'>('banner');

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
    setBanner({ ...spa2SpaFinderBanner, image: { ...spa2SpaFinderBanner.image } });
    setTherapists(spa2SpaFinderTherapists);
    setDirty(false);
  };

  // ---- Therapists ----
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_THERAPIST_FORM);

  const openCreate = () => {
    setForm(EMPTY_THERAPIST_FORM);
    setEditId(null);
    setOpenForm(true);
  };
  const openEdit = (item: Spa2SpaFinderTherapist) => {
    setForm({
      name: item.name,
      role: item.role,
      avatar: item.avatar,
      branch: item.branch,
      rating: item.rating,
      reviews: item.reviews,
      exp: item.exp,
      available: item.available,
      specialties: item.specialties.join(', '),
      nextSlot: item.nextSlot,
    });
    setEditId(item.id);
    setOpenForm(true);
  };
  const handleSubmit = useCallback(() => {
    const next = {
      name: form.name,
      role: form.role,
      avatar: form.avatar,
      branch: form.branch,
      rating: form.rating,
      reviews: form.reviews,
      exp: form.exp,
      available: form.available,
      specialties: form.specialties
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      nextSlot: form.nextSlot,
    };
    if (editId !== null) {
      setTherapists((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      setTherapists((p) => [...p, withId(next)]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId]);
  const handleDelete = useCallback(() => {
    setTherapists((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  return (
    <Spa2ManageShell
      title={t('spaFinder.page_title')}
      description="Banner và danh sách kỹ thuật viên/chi nhánh hiển thị trên trang Tìm KTV công khai."
      breadcrumbLabel={t('nav.spa_finder')}
      publicPath={paths.spa2.spaFinder}
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
          label={t('spaFinder.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="therapists"
          label={t('spaFinder.therapists_section')}
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
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('spaFinder.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('spaFinder.banner_image_help')}
                />
                <TextField
                  label={t('spaFinder.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('spaFinder.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('spaFinder.banner_subtitle')}
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
              <Spa2SpaFinderPageView banner={banner} therapists={therapists} />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Therapists */}
      {tab === 'therapists' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreate}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('spaFinder.therapist_add_btn')}
              </Button>
            </Stack>
          </Grid>
          {therapists.map((item) => (
            <Grid key={item.id} xs={12} sm={6} md={4}>
              <Card sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
                  <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar src={item.avatar} sx={{ width: 52, height: 52 }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 13,
                        height: 13,
                        borderRadius: '50%',
                        bgcolor: item.available ? '#4CAF50' : '#9E9E9E',
                        border: '2px solid white',
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14.5 }} noWrap>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: SPA2_TEAL }} noWrap>
                      {item.role}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1 }}>
                  <Rating
                    value={item.rating}
                    readOnly
                    size="small"
                    precision={0.1}
                    sx={{ fontSize: 14, '& .MuiRating-icon': { color: '#EF9F27' } }}
                  />
                  <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
                    ({item.reviews})
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 0.5 }}>
                  {item.branch}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                  {item.exp} · {item.nextSlot}
                </Typography>
                <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mb: 1.5, gap: 0.5 }}>
                  {item.specialties.map((s) => (
                    <Chip key={s} label={s} size="small" sx={{ fontSize: 11, height: 20 }} />
                  ))}
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton size="small" onClick={() => openEdit(item)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SpaFinderPageView banner={banner} therapists={therapists} />
        </Box>
      )}

      {/* Therapist create / edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editId !== null
            ? t('spaFinder.therapist_form_edit')
            : t('spaFinder.therapist_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('spaFinder.therapist_form_name')}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('spaFinder.therapist_form_role')}
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('spaFinder.therapist_form_avatar')}
              value={form.avatar}
              onChange={(e) => setForm((p) => ({ ...p, avatar: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('spaFinder.therapist_form_branch')}
              value={form.branch}
              onChange={(e) => setForm((p) => ({ ...p, branch: e.target.value }))}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('spaFinder.therapist_form_rating')}
                type="number"
                value={form.rating}
                onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
                fullWidth
                inputProps={{ min: 0, max: 5, step: 0.1 }}
              />
              <TextField
                label={t('spaFinder.therapist_form_reviews')}
                type="number"
                value={form.reviews}
                onChange={(e) => setForm((p) => ({ ...p, reviews: Number(e.target.value) }))}
                fullWidth
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('spaFinder.therapist_form_exp')}
                value={form.exp}
                onChange={(e) => setForm((p) => ({ ...p, exp: e.target.value }))}
                fullWidth
              />
              <TextField
                label={t('spaFinder.therapist_form_next_slot')}
                value={form.nextSlot}
                onChange={(e) => setForm((p) => ({ ...p, nextSlot: e.target.value }))}
                fullWidth
              />
            </Stack>
            <TextField
              label={t('spaFinder.therapist_form_specialties')}
              value={form.specialties}
              onChange={(e) => setForm((p) => ({ ...p, specialties: e.target.value }))}
              fullWidth
              helperText={t('common.comma_hint')}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={form.available}
                  onChange={(e) => setForm((p) => ({ ...p, available: e.target.checked }))}
                />
              }
              label={t('spaFinder.therapist_form_available')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null
              ? t('spaFinder.therapist_form_edit')
              : t('spaFinder.therapist_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('spaFinder.therapist_delete_title')}
        content={t('spaFinder.therapist_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
