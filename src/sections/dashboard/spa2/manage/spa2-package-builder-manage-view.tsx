import { useState, useCallback } from 'react';

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
import Tooltip from '@mui/material/Tooltip';
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

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2PackageBuilderBanner,
  type Spa2PackageBuilderBanner,
  spa2PackageBuilderDiscountTiers,
  type Spa2PackageBuilderDiscountTier,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';
import {
  Spa2ContentPageHero4,
  Spa2PackageBuilderPageView,
} from 'src/sections/spa2/view/spa2-content-pages4';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2PackageBuilderPageView renders on the public /spa2/package-builder page:
// the page banner and the combo discount-tier thresholds (e.g. "choose 2
// services -> 10% off"), read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The service catalog itself is managed on the Dịch vụ (Services) page and
// branches on the Chi nhánh (Branches) page — this view links out to both.
// The cart/step/branch/date selection flow on the public page is purely
// interactive UI (no admin-editable content) and is intentionally not mocked
// here, matching the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

type DiscountTier = Spa2PackageBuilderDiscountTier;

const EMPTY_TIER_FORM = { minServices: 2, discountPercent: 10 };

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

export function Spa2PackageBuilderManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2PackageBuilderBanner>(() => ({
    ...spa2PackageBuilderBanner,
    image: { ...spa2PackageBuilderBanner.image },
  }));
  const [tiers, setTiers] = useState<DiscountTier[]>(spa2PackageBuilderDiscountTiers);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'tiers' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2PackageBuilderBanner['image']) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2PackageBuilderBanner, image: { ...spa2PackageBuilderBanner.image } });
    setTiers(spa2PackageBuilderDiscountTiers);
    setDirty(false);
  };

  const sortedTiers = [...tiers].sort((a, b) => a.minServices - b.minServices);

  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_TIER_FORM);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: Number(e.target.value) }));

  const openCreate = () => {
    setForm(EMPTY_TIER_FORM);
    setEditId(null);
    setOpenForm(true);
  };
  const openEdit = (tier: DiscountTier) => {
    setForm({ minServices: tier.minServices, discountPercent: tier.discountPercent });
    setEditId(tier.id);
    setOpenForm(true);
  };
  const handleSubmit = useCallback(() => {
    const next = {
      minServices: Number(form.minServices),
      discountPercent: Number(form.discountPercent),
    };
    if (editId !== null) {
      setTiers((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      setTiers((p) => [...p, withId(next)]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId]);
  const handleDelete = useCallback(() => {
    setTiers((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  return (
    <Spa2ManageShell
      title={t('package_builder.page_title')}
      description="Banner và các mốc ưu đãi combo hiển thị trên trang Tự tạo combo công khai."
      breadcrumbLabel={t('nav.package_builder')}
      publicPath={paths.spa2.packageBuilder}
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

      <Alert
        severity="info"
        sx={{ mb: 3 }}
        action={
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} href={paths.dashboard.spa2.services} size="small">
              {t('package_builder.link_services')}
            </Button>
            <Button component={RouterLink} href={paths.dashboard.spa2.branches} size="small">
              {t('package_builder.link_branches')}
            </Button>
          </Stack>
        }
      >
        {t('package_builder.scope_note')}
      </Alert>

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
          label={t('package_builder.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tiers"
          label={t('package_builder.tiers_section')}
          icon={<Iconify icon="solar:gift-bold-duotone" width={20} />}
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
                  label={t('package_builder.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('package_builder.banner_image_help')}
                />
                <TextField
                  label={t('package_builder.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('package_builder.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('package_builder.banner_subtitle')}
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

      {/* Discount tiers */}
      {tab === 'tiers' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('package_builder.tiers_section')} ({tiers.length})
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('package_builder.tier_add_btn')}
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('package_builder.col_min_services')}</TableCell>
                  <TableCell>{t('package_builder.col_discount_percent')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTiers.map((tier) => (
                  <TableRow key={tier.id} hover>
                    <TableCell>
                      <Chip
                        size="small"
                        label={`${tier.minServices}+`}
                        color="primary"
                        variant="soft"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{tier.discountPercent}%</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openEdit(tier)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteId(tier.id)}
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

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PackageBuilderPageView banner={banner} discountTiers={tiers} />
        </Box>
      )}

      {/* Create / edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editId !== null
            ? t('package_builder.tier_form_edit')
            : t('package_builder.tier_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('package_builder.col_min_services')}
              type="number"
              value={form.minServices}
              onChange={handleChange('minServices')}
              fullWidth
            />
            <TextField
              label={t('package_builder.col_discount_percent')}
              type="number"
              value={form.discountPercent}
              onChange={handleChange('discountPercent')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null
              ? t('package_builder.tier_form_edit')
              : t('package_builder.tier_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('package_builder.tier_delete_title')}
        content={t('package_builder.tier_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
