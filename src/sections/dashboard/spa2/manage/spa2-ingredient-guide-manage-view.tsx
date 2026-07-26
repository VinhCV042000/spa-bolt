import { useMemo, useState, useCallback } from 'react';

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
  SPA2_INGREDIENT_CATEGORIES,
  type Spa2IngredientCategory,
  type Spa2IngredientGuideBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2IngredientGuidePageView } from 'src/sections/spa2/view/spa2-content-pages5';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages5.tsx's
// Spa2IngredientGuidePageView renders on the public /spa2/ingredient-guide
// page: the hero copy (no image — the page uses a plain cream background,
// same as the original), the ingredient category list (used to drive the
// ingredient dropdown + label lookup below) and the ingredient encyclopedia
// entries — read from and written back in the same shape as src/_mock/_spa2,
// the single source of truth shared with the public view. The search box and
// category filter chips are purely interactive UI (no admin-editable content)
// and are intentionally not mocked here, matching the project convention.
// Category *colors* (used only for the admin preview card accents) stay a
// small hardcoded lookup, same as how other fixed-enum color maps were
// handled in prior batches — only the label/order is admin-editable.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const SAFETY_OPTIONS: { value: Spa2IngredientSafety; label: string }[] = [
  { value: 'safe', label: 'An toàn' },
  { value: 'caution', label: 'Dùng đúng cách' },
];

// Accent colors for the preview card only — mirrors CATEGORY_CONFIG's colors
// in the public view. Falls back to the brand teal for any custom category
// an admin adds that isn't one of the original six.
const CATEGORY_COLORS: Record<string, string> = {
  moisturizing: '#0D47A1',
  brightening: '#F9A825',
  'anti-aging': '#7F77DD',
  acne: '#C62828',
  exfoliating: '#EF9F27',
  soothing: SPA2_TEAL,
};

const SAFETY_STYLE: Record<Spa2IngredientSafety, { color: string; bg: string }> = {
  safe: { color: '#2E7D32', bg: '#E8F5E9' },
  caution: { color: '#854F0B', bg: '#FEF3E2' },
};

const EMPTY_FORM = {
  name: '',
  origin: '',
  category: 'moisturizing',
  icon: '🌿',
  description: '',
  safety: 'safe' as Spa2IngredientSafety,
};

type ListRow = { id: string; value: string };

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

// Mirrors a single ingredient card exactly as rendered in the public
// encyclopedia grid (see Spa2IngredientGuidePageView in
// src/sections/spa2/view/spa2-content-pages5.tsx, ~line 298+): icon, name,
// category + safety chips, then a truncated description.
function IngredientPreviewCard({
  icon,
  name,
  category,
  safety,
  description,
  categories,
}: Spa2Ingredient & { categories: Spa2IngredientCategory[] }) {
  const categoryLabel = categories.find((c) => c.value === category)?.label ?? category;
  const categoryColor = CATEGORY_COLORS[category] ?? SPA2_TEAL_DARK;
  const safetyLabel = SAFETY_OPTIONS.find((s) => s.value === safety)?.label ?? safety;
  const safetyStyle = SAFETY_STYLE[safety];

  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Typography sx={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{icon || '🌿'}</Typography>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 15 }}>
            {name || 'Tên thành phần'}
          </Typography>
          <Stack direction="row" spacing={0.75} sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
            <Chip
              label={categoryLabel}
              size="small"
              sx={{ bgcolor: `${categoryColor}15`, color: categoryColor, fontSize: 11, height: 18 }}
            />
            <Chip
              label={safetyLabel}
              size="small"
              sx={{ bgcolor: safetyStyle.bg, color: safetyStyle.color, fontSize: 11, height: 18 }}
            />
          </Stack>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.5 }}>
            {(description || 'Mô tả thành phần…').slice(0, 80)}...
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

export function Spa2IngredientGuideManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2IngredientGuideBanner>(spa2IngredientGuideBanner);
  const [ingredients, setIngredients] = useState<Spa2Ingredient[]>(spa2Ingredients);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'categories' | 'ingredients' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  // ---- Categories ----
  const [categories, setCategories] = useState<Spa2IngredientCategory[]>(() =>
    SPA2_INGREDIENT_CATEGORIES.map((c) => ({ ...c }))
  );
  const realCategories = useMemo(() => categories.filter((c) => c.value !== 'all'), [categories]);
  const updateCategory = (idx: number, patch: Partial<Spa2IngredientCategory>) => {
    setCategories((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
    setDirty(true);
  };
  const addCategory = () => {
    setCategories((prev) => [...prev, { value: `cat-${prev.length}`, label: '' }]);
    setDirty(true);
  };
  const removeCategory = (idx: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
    setDirty(true);
  };
  const reorderCategories = (next: (Spa2IngredientCategory & { id: string })[]) => {
    const cleaned = next.map(({ id, ...rest }) => rest);
    setCategories((prev) => {
      const allEntry = prev.find((c) => c.value === 'all');
      return allEntry ? [allEntry, ...cleaned] : cleaned;
    });
    setDirty(true);
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner(spa2IngredientGuideBanner);
    setIngredients(spa2Ingredients);
    setCategories(SPA2_INGREDIENT_CATEGORIES.map((c) => ({ ...c })));
    setDirty(false);
  };

  // ---- Ingredients ----
  const reorderIngredients = (next: Spa2Ingredient[]) => {
    setIngredients(next);
    setDirty(true);
  };

  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [benefitRows, setBenefitRows] = useState<ListRow[]>([]);
  const [usedInRows, setUsedInRows] = useState<ListRow[]>([]);

  const addBenefitRow = () => setBenefitRows((prev) => [...prev, { id: uuidv4(), value: '' }]);
  const updateBenefitRow = (id: string, value: string) =>
    setBenefitRows((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));
  const removeBenefitRow = (id: string) =>
    setBenefitRows((prev) => prev.filter((r) => r.id !== id));

  const addUsedInRow = () => setUsedInRows((prev) => [...prev, { id: uuidv4(), value: '' }]);
  const updateUsedInRow = (id: string, value: string) =>
    setUsedInRows((prev) => prev.map((r) => (r.id === id ? { ...r, value } : r)));
  const removeUsedInRow = (id: string) =>
    setUsedInRows((prev) => prev.filter((r) => r.id !== id));

  const openCreate = () => {
    setForm({ ...EMPTY_FORM, category: realCategories[0]?.value ?? 'moisturizing' });
    setBenefitRows([]);
    setUsedInRows([]);
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
      safety: item.safety,
    });
    setBenefitRows(item.benefits.map((b) => ({ id: uuidv4(), value: b })));
    setUsedInRows(item.usedIn.map((s) => ({ id: uuidv4(), value: s })));
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
      benefits: benefitRows.map((r) => r.value.trim()).filter(Boolean),
      safety: form.safety,
      usedIn: usedInRows.map((r) => r.value.trim()).filter(Boolean),
    };
    if (editId !== null) {
      setIngredients((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      setIngredients((p) => [...p, withId(next)]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, benefitRows, usedInRows, editId]);
  const handleDelete = useCallback(() => {
    setIngredients((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  const previewIngredient: Spa2Ingredient = {
    id: editId ?? 'preview',
    name: form.name,
    origin: form.origin,
    category: form.category,
    icon: form.icon,
    description: form.description,
    benefits: benefitRows.map((r) => r.value.trim()).filter(Boolean),
    safety: form.safety,
    usedIn: usedInRows.map((r) => r.value.trim()).filter(Boolean),
  };

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
          value="categories"
          label="Danh mục"
          icon={<Iconify icon="solar:folder-bold-duotone" width={20} />}
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

      {/* Categories */}
      {tab === 'categories' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Danh mục
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addCategory}
            >
              Thêm danh mục
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {categories
              .filter((c) => c.value === 'all')
              .map((c) => (
                <Stack key={c.value} direction="row" spacing={1.5} alignItems="center">
                  <Chip
                    size="small"
                    label="Tất cả (khóa)"
                    sx={{ bgcolor: SPA2_CREAM_DARK, minWidth: 100 }}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label="Tên danh mục"
                    value={c.label}
                    onChange={(e) =>
                      updateCategory(
                        categories.findIndex((cat) => cat.value === c.value),
                        { label: e.target.value }
                      )
                    }
                  />
                </Stack>
              ))}
            <Spa2SortableGrid
              items={realCategories.map((c) => ({ ...c, id: c.value }))}
              onReorder={reorderCategories}
            >
              <Stack spacing={1.5}>
                {realCategories.map((c) => (
                  <Spa2SortableItem key={c.value} id={c.value}>
                    {(sortable) => (
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Spa2DragHandle sortable={sortable} />
                        <Chip
                          size="small"
                          label={c.value}
                          sx={{ bgcolor: SPA2_CREAM_DARK, minWidth: 100 }}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          label="Tên danh mục"
                          value={c.label}
                          onChange={(e) =>
                            updateCategory(
                              categories.findIndex((cat) => cat.value === c.value),
                              { label: e.target.value }
                            )
                          }
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            removeCategory(categories.findIndex((cat) => cat.value === c.value))
                          }
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                ))}
              </Stack>
            </Spa2SortableGrid>
          </Stack>
        </Card>
      )}

      {/* Ingredients */}
      {tab === 'ingredients' && (
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('ingredientGuide.ingredient_add_btn')}
            </Button>
          </Stack>
          <Spa2SortableGrid items={ingredients} onReorder={reorderIngredients}>
            <Grid container spacing={2}>
              {ingredients.map((item) => {
                const categoryLabel =
                  categories.find((c) => c.value === item.category)?.label ?? item.category;
                const safetyLabel =
                  SAFETY_OPTIONS.find((s) => s.value === item.safety)?.label ?? item.safety;
                return (
                  <Grid key={item.id} xs={12} sm={6} md={4}>
                    <Spa2SortableItem id={item.id}>
                      {(sortable) => (
                        <Card sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="flex-start"
                            sx={{ mb: 1 }}
                          >
                            <Spa2DragHandle sortable={sortable} sx={{ mt: -0.5, ml: -1 }} />
                            <Typography sx={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>
                              {item.icon}
                            </Typography>
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography sx={{ fontWeight: 600, fontSize: 14.5 }} noWrap>
                                {item.name}
                              </Typography>
                              <Typography sx={{ fontSize: 12, color: 'text.secondary' }} noWrap>
                                {item.origin}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={0.75}
                            sx={{ mb: 1, flexWrap: 'wrap', gap: 0.5 }}
                          >
                            <Chip
                              label={categoryLabel}
                              size="small"
                              sx={{ fontSize: 11, height: 20 }}
                            />
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
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeleteId(item.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Card>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                );
              })}
            </Grid>
          </Spa2SortableGrid>
        </Stack>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2IngredientGuidePageView banner={banner} ingredients={ingredients} />
        </Box>
      )}

      {/* Ingredient create / edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editId !== null
            ? t('ingredientGuide.ingredient_form_edit')
            : t('ingredientGuide.ingredient_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
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
                    {realCategories.map((c) => (
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
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Công dụng
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                      onClick={addBenefitRow}
                    >
                      Thêm công dụng
                    </Button>
                  </Stack>
                  {benefitRows.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Chưa có công dụng nào — nhấn &quot;Thêm công dụng&quot; để bắt đầu.
                    </Typography>
                  )}
                  <Stack spacing={1}>
                    {benefitRows.map((row) => (
                      <Stack key={row.id} direction="row" spacing={1} alignItems="center">
                        <TextField
                          fullWidth
                          size="small"
                          value={row.value}
                          onChange={(e) => updateBenefitRow(row.id, e.target.value)}
                          placeholder="VD: Cấp ẩm tức thì"
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeBenefitRow(row.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Có trong liệu trình
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                      onClick={addUsedInRow}
                    >
                      Thêm liệu trình
                    </Button>
                  </Stack>
                  {usedInRows.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Chưa có liệu trình nào — nhấn &quot;Thêm liệu trình&quot; để bắt đầu.
                    </Typography>
                  )}
                  <Stack spacing={1}>
                    {usedInRows.map((row) => (
                      <Stack key={row.id} direction="row" spacing={1} alignItems="center">
                        <TextField
                          fullWidth
                          size="small"
                          value={row.value}
                          onChange={(e) => updateUsedInRow(row.id, e.target.value)}
                          placeholder="VD: Facial Organic"
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeUsedInRow(row.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <IngredientPreviewCard {...previewIngredient} categories={categories} />
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
