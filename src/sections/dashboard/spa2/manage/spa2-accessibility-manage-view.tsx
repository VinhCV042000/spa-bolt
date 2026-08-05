import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
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

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2AccessibilityPageView } from 'src/sections/spa2/view/spa2-content-pages9';
import {
  SPA2_INK,
  SPA2_TEAL,
  spa2Branches,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  spa2AccessibilityBanner,
  spa2AccessibilityFeatures,
  spa2AccessibilityChecklist,
  spa2SpecialNeedsCategories,
  type Spa2AccessibilityBanner,
  type Spa2AccessibilityFeature,
  type Spa2SpecialNeedsCategory,
  type Spa2AccessibilityChecklistItem,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages9.tsx's
// Spa2AccessibilityPageView renders on the public /spa2/accessibility page: the
// hero banner (eyebrow/title/subtitle), the "Cơ sở vật chất" features grid
// (icon/title/desc cards), the "Đối tượng hỗ trợ" special-needs categories grid
// (icon/name/note cards - also reused as the support-need dropdown options in
// the public contact form) and the shared branch accessibility checklist (a
// single list of checkmark labels rendered identically under every branch
// card on the public page) - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The public page's contact-form "submitted" step and the trailing
// GradientCta are hardcoded/interactive demo content and intentionally not
// mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_FEATURE: Omit<Spa2AccessibilityFeature, 'id'> = {
  icon: 'solar:wheelchair-bold-duotone',
  title: '',
  desc: '',
};

const EMPTY_CATEGORY: Omit<Spa2SpecialNeedsCategory, 'id'> = {
  name: '',
  icon: 'solar:user-bold',
  note: '',
};

const EMPTY_CHECKLIST_ITEM: Omit<Spa2AccessibilityChecklistItem, 'id'> = {
  label: '',
};

// A representative branch used purely to preview how the shared checklist
// renders once embedded inside a branch card on the public page - the
// checklist itself is not branch-specific, so any branch works.
const PREVIEW_BRANCH_NAME = spa2Branches[0]?.name ?? 'Chi nhánh mẫu';

// Builds the checklist array as it will look once the in-progress dialog
// form value is applied: replacing the item in place when editing, or
// appended at the end when creating a new one.
function buildPreviewChecklist(
  base: Spa2AccessibilityChecklistItem[],
  form: Omit<Spa2AccessibilityChecklistItem, 'id'>,
  editId: string | null
): Omit<Spa2AccessibilityChecklistItem, 'id'>[] {
  if (editId) {
    return base.map((item) => (item.id === editId ? form : item));
  }
  return [...base, form];
}

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

// Mirrors the hero section rendered by Spa2AccessibilityPageView on the
// public page - eyebrow/title/subtitle over the cream PageHero background.
function BannerPreview({ banner }: { banner: Spa2AccessibilityBanner }) {
  return (
    <Box sx={{ bgcolor: '#F5F1EC', py: { xs: 5, md: 6 }, textAlign: 'center' }}>
      <Stack spacing={1.5} alignItems="center" sx={{ px: 3 }}>
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
    </Box>
  );
}

// Mirrors one "Cơ sở vật chất" feature card exactly as rendered in the
// public features grid: icon chip, title, desc.
function FeaturePreviewCard({ feature }: { feature: Omit<Spa2AccessibilityFeature, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 3,
          bgcolor: '#F5F1EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Iconify
          icon={feature.icon || 'solar:wheelchair-bold-duotone'}
          width={26}
          sx={{ color: SPA2_TEAL }}
        />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {feature.title || '(Chưa đặt tiêu đề)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {feature.desc}
      </Typography>
    </Card>
  );
}

// Mirrors one "Đối tượng hỗ trợ" category card exactly as rendered in the
// public special-needs grid: round icon avatar, name, note.
function CategoryPreviewCard({ category }: { category: Omit<Spa2SpecialNeedsCategory, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            bgcolor: '#F5F1EC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon={category.icon || 'solar:user-bold'} width={22} sx={{ color: SPA2_TEAL }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
            {category.name || '(Chưa đặt tên)'}
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.65 }}>
            {category.note}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

// Mirrors one checkmark row of the shared branch accessibility checklist -
// this exact list is rendered identically under every branch card on the
// public page, so this preview shows the single canonical row, not per
// branch.
function ChecklistItemPreviewRow({ item }: { item: Omit<Spa2AccessibilityChecklistItem, 'id'> }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Iconify icon="solar:check-circle-bold" width={14} sx={{ color: '#2E7D32' }} />
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
        {item.label || '(Chưa đặt nội dung)'}
      </Typography>
    </Stack>
  );
}

// Mirrors one full branch card exactly as rendered in the public
// "Tình trạng tiếp cận từng chi nhánh" grid (spa2-content-pages9.tsx,
// Spa2AccessibilityPageView): branch name header followed by the shared
// checklist rendered as a column of checkmark rows. Used to preview how the
// checklist looks embedded in-context, rather than as a flat standalone list.
function BranchChecklistPreviewCard({
  branchName,
  items,
}: {
  branchName: string;
  items: Omit<Spa2AccessibilityChecklistItem, 'id'>[];
}) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
        {branchName}
      </Typography>
      <Stack spacing={0.75}>
        {items.length === 0 && (
          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', fontStyle: 'italic' }}>
            (Chưa có mục nào)
          </Typography>
        )}
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:check-circle-bold" width={14} sx={{ color: '#2E7D32' }} />
            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
              {item.label || '(Chưa đặt nội dung)'}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2AccessibilityManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2AccessibilityBanner>(() => ({
    ...spa2AccessibilityBanner,
  }));
  const [features, setFeatures] = useState<Spa2AccessibilityFeature[]>(() =>
    spa2AccessibilityFeatures.map((item) => ({ ...item }))
  );
  const [categories, setCategories] = useState<Spa2SpecialNeedsCategory[]>(() =>
    spa2SpecialNeedsCategories.map((item) => ({ ...item }))
  );
  const [checklist, setChecklist] = useState<Spa2AccessibilityChecklistItem[]>(() =>
    spa2AccessibilityChecklist.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'features' | 'categories' | 'checklist' | 'preview'>(
    'banner'
  );
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Features CRUD ----
  const [featureDialog, setFeatureDialog] = useState(false);
  const [featureEditId, setFeatureEditId] = useState<string | null>(null);
  const [featureForm, setFeatureForm] =
    useState<Omit<Spa2AccessibilityFeature, 'id'>>(EMPTY_FEATURE);
  const [featureDeleteId, setFeatureDeleteId] = useState<string | null>(null);

  const openCreateFeature = () => {
    setFeatureForm(EMPTY_FEATURE);
    setFeatureEditId(null);
    setFeatureDialog(true);
  };
  const openEditFeature = (item: Spa2AccessibilityFeature) => {
    const { id, ...rest } = item;
    setFeatureForm({ ...rest });
    setFeatureEditId(id);
    setFeatureDialog(true);
  };
  const submitFeature = () => {
    const next: Omit<Spa2AccessibilityFeature, 'id'> = { ...featureForm };
    if (featureEditId) {
      setFeatures((prev) =>
        prev.map((item) => (item.id === featureEditId ? { ...item, ...next } : item))
      );
    } else {
      setFeatures((prev) => [...prev, withId(next)]);
    }
    setFeatureDialog(false);
    markDirty();
  };
  const confirmDeleteFeature = () => {
    setFeatures((prev) => prev.filter((item) => item.id !== featureDeleteId));
    setFeatureDeleteId(null);
    markDirty();
  };
  const reorderFeatures = (next: Spa2AccessibilityFeature[]) => {
    setFeatures(next);
    markDirty();
  };

  // ---- Special needs categories CRUD ----
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [categoryEditId, setCategoryEditId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] =
    useState<Omit<Spa2SpecialNeedsCategory, 'id'>>(EMPTY_CATEGORY);
  const [categoryDeleteId, setCategoryDeleteId] = useState<string | null>(null);

  const openCreateCategory = () => {
    setCategoryForm(EMPTY_CATEGORY);
    setCategoryEditId(null);
    setCategoryDialog(true);
  };
  const openEditCategory = (item: Spa2SpecialNeedsCategory) => {
    const { id, ...rest } = item;
    setCategoryForm({ ...rest });
    setCategoryEditId(id);
    setCategoryDialog(true);
  };
  const submitCategory = () => {
    const next: Omit<Spa2SpecialNeedsCategory, 'id'> = { ...categoryForm };
    if (categoryEditId) {
      setCategories((prev) =>
        prev.map((item) => (item.id === categoryEditId ? { ...item, ...next } : item))
      );
    } else {
      setCategories((prev) => [...prev, withId(next)]);
    }
    setCategoryDialog(false);
    markDirty();
  };
  const confirmDeleteCategory = () => {
    setCategories((prev) => prev.filter((item) => item.id !== categoryDeleteId));
    setCategoryDeleteId(null);
    markDirty();
  };
  const reorderCategories = (next: Spa2SpecialNeedsCategory[]) => {
    setCategories(next);
    markDirty();
  };

  // ---- Branch checklist CRUD ----
  const [checklistDialog, setChecklistDialog] = useState(false);
  const [checklistEditId, setChecklistEditId] = useState<string | null>(null);
  const [checklistForm, setChecklistForm] =
    useState<Omit<Spa2AccessibilityChecklistItem, 'id'>>(EMPTY_CHECKLIST_ITEM);
  const [checklistDeleteId, setChecklistDeleteId] = useState<string | null>(null);

  const openCreateChecklistItem = () => {
    setChecklistForm(EMPTY_CHECKLIST_ITEM);
    setChecklistEditId(null);
    setChecklistDialog(true);
  };
  const openEditChecklistItem = (item: Spa2AccessibilityChecklistItem) => {
    const { id, ...rest } = item;
    setChecklistForm({ ...rest });
    setChecklistEditId(id);
    setChecklistDialog(true);
  };
  const submitChecklistItem = () => {
    const next: Omit<Spa2AccessibilityChecklistItem, 'id'> = { ...checklistForm };
    if (checklistEditId) {
      setChecklist((prev) =>
        prev.map((item) => (item.id === checklistEditId ? { ...item, ...next } : item))
      );
    } else {
      setChecklist((prev) => [...prev, withId(next)]);
    }
    setChecklistDialog(false);
    markDirty();
  };
  const confirmDeleteChecklistItem = () => {
    setChecklist((prev) => prev.filter((item) => item.id !== checklistDeleteId));
    setChecklistDeleteId(null);
    markDirty();
  };
  const reorderChecklist = (next: Spa2AccessibilityChecklistItem[]) => {
    setChecklist(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2AccessibilityBanner });
    setFeatures(spa2AccessibilityFeatures.map((item) => ({ ...item })));
    setCategories(spa2SpecialNeedsCategories.map((item) => ({ ...item })));
    setChecklist(spa2AccessibilityChecklist.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('accessibility.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.accessibility')}
      publicPath={paths.spa2.accessibility}
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
          label={t('accessibility.tab_banner')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="features"
          label={t('accessibility.tab_features')}
          icon={<Iconify icon="solar:wheelchair-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('accessibility.tab_categories')}
          icon={<Iconify icon="solar:users-group-rounded-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="checklist"
          label={t('accessibility.tab_checklist')}
          icon={<Iconify icon="solar:checklist-minimalistic-bold-duotone" width={20} />}
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
              title={t('accessibility.tab_banner')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('accessibility.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('accessibility.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('accessibility.banner_subtitle')}
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
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Features */}
      {tab === 'features' && (
        <SectionCard
          title={t('accessibility.tab_features')}
          icon="solar:wheelchair-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateFeature}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('accessibility.add_feature_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('accessibility.drag_hint')}
          </Typography>
          {features.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('accessibility.no_features')}
            </Typography>
          )}
          <Spa2SortableGrid items={features} onReorder={reorderFeatures}>
            <Grid container spacing={2}>
              {features.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <FeaturePreviewCard feature={item} />
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
                            onClick={() => openEditFeature(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setFeatureDeleteId(item.id)}
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
        </SectionCard>
      )}

      {/* Special needs categories */}
      {tab === 'categories' && (
        <SectionCard
          title={t('accessibility.tab_categories')}
          icon="solar:users-group-rounded-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateCategory}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('accessibility.add_category_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('accessibility.drag_hint')}
          </Typography>
          {categories.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('accessibility.no_categories')}
            </Typography>
          )}
          <Spa2SortableGrid items={categories} onReorder={reorderCategories}>
            <Grid container spacing={2}>
              {categories.map((item) => (
                <Grid key={item.id} xs={12} sm={6}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <CategoryPreviewCard category={item} />
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
                            onClick={() => openEditCategory(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setCategoryDeleteId(item.id)}
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
        </SectionCard>
      )}

      {/* Branch checklist */}
      {tab === 'checklist' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <SectionCard
              title={t('accessibility.tab_checklist')}
              icon="solar:checklist-minimalistic-bold-duotone"
              action={
                <Button
                  size="small"
                  onClick={openCreateChecklistItem}
                  startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                >
                  {t('accessibility.add_checklist_item_btn')}
                </Button>
              }
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 1.5 }}
              >
                {t('accessibility.checklist_shared_hint')}
              </Typography>
              {checklist.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {t('accessibility.no_checklist_items')}
                </Typography>
              )}
              <Spa2SortableGrid items={checklist} onReorder={reorderChecklist}>
                <Stack spacing={1.5}>
                  {checklist.map((item) => (
                    <Spa2SortableItem key={item.id} id={item.id}>
                      {(sortable) => (
                        <Card
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            border: `1px solid ${SPA2_CREAM_DARK}`,
                            boxShadow: 'none',
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Spa2DragHandle sortable={sortable} />
                            <Box sx={{ flex: 1 }}>
                              <ChecklistItemPreviewRow item={item} />
                            </Box>
                            <IconButton size="small" onClick={() => openEditChecklistItem(item)}>
                              <Iconify icon="solar:pen-bold" width={14} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setChecklistDeleteId(item.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                            </IconButton>
                          </Stack>
                        </Card>
                      )}
                    </Spa2SortableItem>
                  ))}
                </Stack>
              </Spa2SortableGrid>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: 130 }}>
              <SectionCard
                title={t('accessibility.checklist_preview_title')}
                icon="solar:eye-bold-duotone"
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 1.5 }}
                >
                  {t('accessibility.checklist_preview_hint')}
                </Typography>
                <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                  <BranchChecklistPreviewCard branchName={PREVIEW_BRANCH_NAME} items={checklist} />
                </Box>
              </SectionCard>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2AccessibilityPageView
            banner={banner}
            features={features}
            categories={categories}
            checklist={checklist}
          />
        </Box>
      )}

      {/* Feature add/edit dialog */}
      <Dialog open={featureDialog} onClose={() => setFeatureDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {featureEditId ? t('common.edit') : t('accessibility.add_feature_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('accessibility.form_feature_icon')}
                  value={featureForm.icon}
                  onChange={(e) => setFeatureForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="vd: solar:wheelchair-bold-duotone"
                />
                <TextField
                  label={t('accessibility.form_feature_title')}
                  value={featureForm.title}
                  onChange={(e) => setFeatureForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('accessibility.form_feature_desc')}
                  value={featureForm.desc}
                  onChange={(e) => setFeatureForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <FeaturePreviewCard feature={featureForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeatureDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitFeature}
            disabled={!featureForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {featureEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!featureDeleteId}
        onClose={() => setFeatureDeleteId(null)}
        title={t('accessibility.feature_delete_title')}
        content={t('accessibility.feature_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteFeature}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Category add/edit dialog */}
      <Dialog
        open={categoryDialog}
        onClose={() => setCategoryDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {categoryEditId ? t('common.edit') : t('accessibility.add_category_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('accessibility.form_category_icon')}
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="vd: solar:user-bold"
                />
                <TextField
                  label={t('accessibility.form_category_name')}
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('accessibility.form_category_note')}
                  value={categoryForm.note}
                  onChange={(e) => setCategoryForm((p) => ({ ...p, note: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <CategoryPreviewCard category={categoryForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitCategory}
            disabled={!categoryForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {categoryEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!categoryDeleteId}
        onClose={() => setCategoryDeleteId(null)}
        title={t('accessibility.category_delete_title')}
        content={t('accessibility.category_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteCategory}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Checklist item add/edit dialog */}
      <Dialog
        open={checklistDialog}
        onClose={() => setChecklistDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {checklistEditId ? t('common.edit') : t('accessibility.add_checklist_item_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={6}>
              <TextField
                label={t('accessibility.form_checklist_label')}
                value={checklistForm.label}
                onChange={(e) => setChecklistForm((p) => ({ ...p, label: e.target.value }))}
                fullWidth
                multiline
                minRows={2}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ChecklistItemPreviewRow item={checklistForm} />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('accessibility.checklist_preview_hint')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <BranchChecklistPreviewCard
                  branchName={PREVIEW_BRANCH_NAME}
                  items={buildPreviewChecklist(checklist, checklistForm, checklistEditId)}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChecklistDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitChecklistItem}
            disabled={!checklistForm.label}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {checklistEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!checklistDeleteId}
        onClose={() => setChecklistDeleteId(null)}
        title={t('accessibility.checklist_delete_title')}
        content={t('accessibility.checklist_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteChecklistItem}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
