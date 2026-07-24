import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2Ingredients,
  type Spa2Ingredient,
  spa2IngredientGuideBanner,
  type Spa2IngredientSafety,
  type Spa2IngredientGuideBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2IngredientGuidePageView } from 'src/sections/spa2/view/spa2-content-pages5';
import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages5.tsx's
// Spa2IngredientGuidePageView renders on the public /spa2/ingredient-guide
// page: the hero copy (no image — the page uses a plain cream background,
// same as the original) and the ingredient encyclopedia entries — read from
// and written back in the same shape as src/_mock/_spa2, the single source
// of truth shared with the public view. The search box and category filter
// chips are purely interactive UI (no admin-editable content) and are
// intentionally not mocked here, matching the project convention. The
// CATEGORY/SAFETY label+color maps are fixed reference enums (same as the
// public view) and stay hardcoded rather than mocked, consistent with how
// other fixed select-option enums (e.g. press article types) were handled
// in prior batches.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const CATEGORY_OPTIONS = [
  { value: 'moisturizing', label: 'Dưỡng ẩm' },
  { value: 'brightening', label: 'Sáng da' },
  { value: 'anti-aging', label: 'Chống lão hóa' },
  { value: 'acne', label: 'Trị mụn' },
  { value: 'exfoliating', label: 'Tẩy tế bào' },
  { value: 'soothing', label: 'Làm dịu' },
];

const SAFETY_OPTIONS: { value: Spa2IngredientSafety; label: string }[] = [
  { value: 'safe', label: 'An toàn' },
  { value: 'caution', label: 'Dùng đúng cách' },
];

const EMPTY_FORM = {
  name: '',
  origin: '',
  category: 'moisturizing',
  icon: '🌿',
  description: '',
  benefits: '',
  safety: 'safe' as Spa2IngredientSafety,
  usedIn: '',
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

export function Spa2IngredientGuideManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2IngredientGuideBanner>(spa2IngredientGuideBanner);
  const [ingredients, setIngredients] = useState<Spa2Ingredient[]>(spa2Ingredients);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'ingredients' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner(spa2IngredientGuideBanner);
    setIngredients(spa2Ingredients);
    setDirty(false);
  };

  // ---- Ingredients ----
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };
  const openEdit = (item: Spa2Ingredient) => {
    setForm({
      name: item.name,
      origin: item.origin,
      category: item.category,
      icon: item.icon,
      description: item.description,
      benefits: item.benefits.join(', '),
      safety: item.safety,
      usedIn: item.usedIn.join(', '),
    });
    setEditId(item.id);
    setOpenForm(true);
  };
  const handleSubmit = useCallback(() => {
    const next = {
      name: form.name,
      origin: form.origin,
      category: form.category,
      icon: form.icon,
      description: form.description,
      benefits: form.benefits
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      safety: form.safety,
      usedIn: form.usedIn
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editId !== null) {
      setIngredients((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      setIngredients((p) => [...p, withId(next)]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId]);
  const handleDelete = useCallback(() => {
    setIngredients((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  return (
    <Spa2ManageShell
      title={t('ingredientGuide.page_title')}
      description="Tiêu đề trang và danh sách thành phần hiển thị trên trang Bách khoa thành phần công khai."
      breadcrumbLabel={t('nav.ingredient_guide')}
      publicPath={paths.spa2.ingredientGuide}
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
          label={t('ingredientGuide.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="ingredients"
          label={t('ingredientGuide.ingredients_section')}
          icon={<Iconify icon="solar:flask-bold-duotone" width={20} />}
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
                <TextField
                  label={t('ingredientGuide.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('ingredientGuide.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('ingredientGuide.banner_subtitle')}
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
              <Spa2IngredientGuidePageView banner={banner} ingredients={ingredients} />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Ingredients */}
      {tab === 'ingredients' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreate}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('ingredientGuide.ingredient_add_btn')}
              </Button>
            </Stack>
          </Grid>
          {ingredients.map((item) => {
            const categoryLabel =
              CATEGORY_OPTIONS.find((c) => c.value === item.category)?.label ?? item.category;
            const safetyLabel =
              SAFETY_OPTIONS.find((s) => s.value === item.safety)?.label ?? item.safety;
            return (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Card sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>
                      {item.icon}
                    </Typography>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 14.5 }} noWrap>
                        {item.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }} noWrap>
                        {item.origin}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={0.75} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
                    <Chip label={categoryLabel} size="small" sx={{ fontSize: 11, height: 20 }} />
                    <Chip
                      label={safetyLabel}
                      size="small"
                      color={item.safety === 'caution' ? 'warning' : 'success'}
                      variant="soft"
                      sx={{ fontSize: 11, height: 20 }}
                    />
                  </Stack>
                  <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                    {item.description.length > 90
                      ? `${item.description.slice(0, 90)}...`
                      : item.description}
                  </Typography>
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
            );
          })}
        </Grid>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2IngredientGuidePageView banner={banner} ingredients={ingredients} />
        </Box>
      )}

      {/* Ingredient create / edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editId !== null
            ? t('ingredientGuide.ingredient_form_edit')
            : t('ingredientGuide.ingredient_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('ingredientGuide.ingredient_form_icon')}
                value={form.icon}
                onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                sx={{ width: 120 }}
                helperText={t('ingredientGuide.ingredient_form_icon_help')}
              />
              <TextField
                label={t('ingredientGuide.ingredient_form_name')}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                fullWidth
              />
            </Stack>
            <TextField
              label={t('ingredientGuide.ingredient_form_origin')}
              value={form.origin}
              onChange={(e) => setForm((p) => ({ ...p, origin: e.target.value }))}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                select
                label={t('ingredientGuide.ingredient_form_category')}
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                fullWidth
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label={t('ingredientGuide.ingredient_form_safety')}
                value={form.safety}
                onChange={(e) =>
                  setForm((p) => ({ ...p, safety: e.target.value as Spa2IngredientSafety }))
                }
                fullWidth
              >
                {SAFETY_OPTIONS.map((s) => (
                  <MenuItem key={s.value} value={s.value}>
                    {s.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              label={t('ingredientGuide.ingredient_form_description')}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label={t('ingredientGuide.ingredient_form_benefits')}
              value={form.benefits}
              onChange={(e) => setForm((p) => ({ ...p, benefits: e.target.value }))}
              fullWidth
              helperText={t('common.comma_hint')}
            />
            <TextField
              label={t('ingredientGuide.ingredient_form_used_in')}
              value={form.usedIn}
              onChange={(e) => setForm((p) => ({ ...p, usedIn: e.target.value }))}
              fullWidth
              helperText={t('common.comma_hint')}
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
              ? t('ingredientGuide.ingredient_form_edit')
              : t('ingredientGuide.ingredient_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('ingredientGuide.ingredient_delete_title')}
        content={t('ingredientGuide.ingredient_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
