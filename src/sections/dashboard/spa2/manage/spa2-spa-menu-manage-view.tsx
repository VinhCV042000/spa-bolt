import type {
  Spa2SpaMenuItem,
  Spa2SpaMenuBanner,
  Spa2SpaMenuSection,
  Spa2AdjustableImage} from 'src/_mock/_spa2';

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
import { spa2SpaMenuBanner ,
  spa2SpaMenuSections
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SpaMenuPageView } from 'src/sections/spa2/view/spa2-content-pages4';
import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2SpaMenuPageView renders on the public /spa2/spa-menu page: the page
// banner, the category list (icon/color/name) and the items nested under
// each category — read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The search box on the public page is purely interactive UI (no admin-
// editable content) and is intentionally not mocked here, matching the
// project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_SECTION_FORM = { category: '', icon: 'solar:stars-bold-duotone', color: '#2E8B7A' };
const EMPTY_ITEM_FORM = { name: '', desc: '', duration: '', price: 0, badge: '' };

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

export function Spa2SpaMenuManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SpaMenuBanner>(() => ({
    ...spa2SpaMenuBanner,
    image: { ...spa2SpaMenuBanner.image },
  }));
  const [sections, setSections] = useState<Spa2SpaMenuSection[]>(spa2SpaMenuSections);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'categories' | 'items' | 'preview'>('banner');
  const [activeSectionId, setActiveSectionId] = useState<string>(spa2SpaMenuSections[0]?.id ?? '');

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
    setBanner({ ...spa2SpaMenuBanner, image: { ...spa2SpaMenuBanner.image } });
    setSections(spa2SpaMenuSections);
    setDirty(false);
  };

  // ---- Categories (sections) ----
  const [openSectionForm, setOpenSectionForm] = useState(false);
  const [editSectionId, setEditSectionId] = useState<string | null>(null);
  const [deleteSectionId, setDeleteSectionId] = useState<string | null>(null);
  const [sectionForm, setSectionForm] = useState(EMPTY_SECTION_FORM);

  const openCreateSection = () => {
    setSectionForm(EMPTY_SECTION_FORM);
    setEditSectionId(null);
    setOpenSectionForm(true);
  };
  const openEditSection = (section: Spa2SpaMenuSection) => {
    setSectionForm({ category: section.category, icon: section.icon, color: section.color });
    setEditSectionId(section.id);
    setOpenSectionForm(true);
  };
  const handleSectionSubmit = useCallback(() => {
    if (editSectionId !== null) {
      setSections((p) => p.map((x) => (x.id === editSectionId ? { ...x, ...sectionForm } : x)));
    } else {
      setSections((p) => [...p, withId({ ...sectionForm, items: [] })]);
    }
    setOpenSectionForm(false);
    setDirty(true);
  }, [sectionForm, editSectionId]);
  const handleSectionDelete = useCallback(() => {
    setSections((p) => p.filter((x) => x.id !== deleteSectionId));
    if (activeSectionId === deleteSectionId) setActiveSectionId('');
    setDeleteSectionId(null);
    setDirty(true);
  }, [deleteSectionId, activeSectionId]);

  // ---- Items ----
  const activeSection = sections.find((s) => s.id === activeSectionId) ?? sections[0];
  const [openItemForm, setOpenItemForm] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState(EMPTY_ITEM_FORM);

  const openCreateItem = () => {
    setItemForm(EMPTY_ITEM_FORM);
    setEditItemId(null);
    setOpenItemForm(true);
  };
  const openEditItem = (item: Spa2SpaMenuItem) => {
    setItemForm({
      name: item.name,
      desc: item.desc,
      duration: item.duration,
      price: item.price,
      badge: item.badge,
    });
    setEditItemId(item.id);
    setOpenItemForm(true);
  };
  const handleItemSubmit = useCallback(() => {
    if (!activeSection) return;
    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== activeSection.id) return s;
        if (editItemId !== null) {
          return {
            ...s,
            items: s.items.map((x) => (x.id === editItemId ? { ...x, ...itemForm } : x)),
          };
        }
        return { ...s, items: [...s.items, withId({ ...itemForm })] };
      })
    );
    setOpenItemForm(false);
    setDirty(true);
  }, [itemForm, editItemId, activeSection]);
  const handleItemDelete = useCallback(() => {
    if (!activeSection) return;
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSection.id
          ? { ...s, items: s.items.filter((x) => x.id !== deleteItemId) }
          : s
      )
    );
    setDeleteItemId(null);
    setDirty(true);
  }, [deleteItemId, activeSection]);

  return (
    <Spa2ManageShell
      title={t('spaMenu.page_title')}
      description="Banner, danh mục và các dịch vụ hiển thị trên trang Menu dịch vụ công khai."
      breadcrumbLabel={t('nav.spa_menu')}
      publicPath={paths.spa2.spaMenu}
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
          label={t('spaMenu.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('spaMenu.categories_section')}
          icon={<Iconify icon="solar:widget-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="items"
          label={t('spaMenu.items_section')}
          icon={<Iconify icon="solar:list-bold-duotone" width={20} />}
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
                  label={t('spaMenu.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('spaMenu.banner_image_help')}
                />
                <TextField
                  label={t('spaMenu.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('spaMenu.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('spaMenu.banner_subtitle')}
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
              <Spa2SpaMenuPageView banner={banner} sections={sections} />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Categories */}
      {tab === 'categories' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateSection}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('spaMenu.category_add_btn')}
              </Button>
            </Stack>
          </Grid>
          {sections.map((section) => (
            <Grid key={section.id} xs={12} sm={6} md={4}>
              <Card sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: 2,
                      bgcolor: `${section.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon={section.icon} width={20} sx={{ color: section.color }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>
                    {section.category}
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                  {section.items.length} {t('spaMenu.items_count_suffix')}
                </Typography>
                <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton size="small" onClick={() => openEditSection(section)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteSectionId(section.id)}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Items */}
      {tab === 'items' && (
        <Stack spacing={2.5}>
          <TextField
            select
            label={t('spaMenu.items_category_select')}
            value={activeSection?.id ?? ''}
            onChange={(e) => setActiveSectionId(e.target.value)}
            sx={{ maxWidth: 360 }}
            size="small"
          >
            {sections.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.category}
              </MenuItem>
            ))}
          </TextField>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateItem}
              disabled={!activeSection}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('spaMenu.item_add_btn')}
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {(activeSection?.items ?? []).map((item) => (
              <Grid key={item.id} xs={12} sm={6}>
                <Card sx={{ p: 2.5, borderRadius: 3, height: '100%' }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14.5, flex: 1 }}>
                      {item.name}
                    </Typography>
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{ bgcolor: SPA2_TEAL, color: 'white', fontSize: 11 }}
                      />
                    )}
                  </Stack>
                  <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1 }}>
                    {item.desc}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                      {item.duration}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 14.5 }}>
                      {new Intl.NumberFormat('vi-VN').format(item.price)}đ
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="flex-end" spacing={0.5} sx={{ mt: 1 }}>
                    <Tooltip title={t('common.edit')}>
                      <IconButton size="small" onClick={() => openEditItem(item)}>
                        <Iconify icon="solar:pen-bold" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete')}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDeleteItemId(item.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SpaMenuPageView banner={banner} sections={sections} />
        </Box>
      )}

      {/* Category create / edit dialog */}
      <Dialog
        open={openSectionForm}
        onClose={() => setOpenSectionForm(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {editSectionId !== null
            ? t('spaMenu.category_form_edit')
            : t('spaMenu.category_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('spaMenu.category_form_name')}
              value={sectionForm.category}
              onChange={(e) => setSectionForm((p) => ({ ...p, category: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('spaMenu.category_form_icon')}
              value={sectionForm.icon}
              onChange={(e) => setSectionForm((p) => ({ ...p, icon: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('spaMenu.category_form_color')}
              value={sectionForm.color}
              onChange={(e) => setSectionForm((p) => ({ ...p, color: e.target.value }))}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSectionForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSectionSubmit}
            disabled={!sectionForm.category}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editSectionId !== null
              ? t('spaMenu.category_form_edit')
              : t('spaMenu.category_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Item create / edit dialog */}
      <Dialog open={openItemForm} onClose={() => setOpenItemForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editItemId !== null ? t('spaMenu.item_form_edit') : t('spaMenu.item_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('spaMenu.item_form_name')}
              value={itemForm.name}
              onChange={(e) => setItemForm((p) => ({ ...p, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('spaMenu.item_form_desc')}
              value={itemForm.desc}
              onChange={(e) => setItemForm((p) => ({ ...p, desc: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('spaMenu.item_form_duration')}
                value={itemForm.duration}
                onChange={(e) => setItemForm((p) => ({ ...p, duration: e.target.value }))}
                fullWidth
              />
              <TextField
                label={t('spaMenu.item_form_price')}
                type="number"
                value={itemForm.price}
                onChange={(e) => setItemForm((p) => ({ ...p, price: Number(e.target.value) }))}
                fullWidth
              />
            </Stack>
            <TextField
              label={t('spaMenu.item_form_badge')}
              value={itemForm.badge}
              onChange={(e) => setItemForm((p) => ({ ...p, badge: e.target.value }))}
              fullWidth
              helperText={t('spaMenu.item_form_badge_help')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenItemForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleItemSubmit}
            disabled={!itemForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editItemId !== null ? t('spaMenu.item_form_edit') : t('spaMenu.item_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteSectionId}
        onClose={() => setDeleteSectionId(null)}
        title={t('spaMenu.category_delete_title')}
        content={t('spaMenu.category_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleSectionDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteItemId}
        onClose={() => setDeleteItemId(null)}
        title={t('spaMenu.item_delete_title')}
        content={t('spaMenu.item_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleItemDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
