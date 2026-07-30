import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2SeasonalSeasons,
  spa2SeasonalPackages,
  type Spa2SeasonalSeason,
  type Spa2SeasonalPackageItem,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { SPA2_TEAL, SPA2_TEAL_DARK } from 'src/sections/spa2/spa2-pages-data';
import { Spa2SeasonalPackagePageView } from 'src/sections/spa2/view/spa2-content-pages3';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2SeasonalPackagePageView renders on the public /spa2/seasonal-package
// page - read from and written back in the same shape as src/_mock/_spa2,
// the single source of truth shared with the public view. This page has no
// static "banner": the public hero dynamically re-colors/re-icons itself
// based on the currently active season, so the season list itself IS the
// manageable "banner" content (the "seasons" tab). The "packages" tab manages
// the per-season offer catalog, and the "preview" tab reuses
// Spa2SeasonalPackagePageView itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_SEASON_FORM = {
  season: '',
  period: '',
  icon: '☀️',
  color: '#FF8F00',
  accent: '#FFF8E1',
  bg: 'linear-gradient(135deg, #FFB300 0%, #E65100 100%)',
};

const EMPTY_PACKAGE_FORM = {
  seasonId: '',
  name: '',
  price: 0,
  desc: '',
  image: '',
};

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

// Mirrors the "other seasons preview" tile in the public season switcher.
function SeasonPreviewTile({ season, period, icon, bg, accent }: Partial<Spa2SeasonalSeason>) {
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 'none' }}>
      <Box
        sx={{
          height: 96,
          background: bg || 'linear-gradient(135deg, #ccc 0%, #999 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          gap: 0.5,
        }}
      >
        <Typography sx={{ fontSize: 30 }}>{icon || '🗓️'}</Typography>
        <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{season || 'Tên mùa'}</Typography>
      </Box>
      <Box sx={{ p: 1.5, bgcolor: accent || '#F5F5F5' }}>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', textAlign: 'center' }}>
          {period || 'Giai đoạn áp dụng'}
        </Typography>
      </Box>
    </Card>
  );
}

// Mirrors a single package Card in the public packages grid.
function PackagePreviewCard({
  name,
  price,
  desc,
  image,
  color,
}: Partial<Spa2SeasonalPackageItem> & { color: string }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: `2px solid ${color}22`,
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          height: 140,
          backgroundImage: image ? `url(${image})` : undefined,
          bgcolor: '#EEE',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 15 }}>
            {name || 'Tên gói'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: 'text.secondary', fontSize: 12, mb: 1, lineHeight: 1.6 }}>
          {desc || 'Mô tả gói ưu đãi...'}
        </Typography>
        <Typography sx={{ color, fontWeight: 700, fontSize: 15 }}>
          {new Intl.NumberFormat('vi-VN').format(price || 0)}đ
        </Typography>
      </Box>
    </Card>
  );
}

export function Spa2SeasonalPackageManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'seasons' | 'packages' | 'preview'>('seasons');
  const markDirty = () => setDirty(true);

  // ---- Seasons ----
  const [seasons, setSeasons] = useState<Spa2SeasonalSeason[]>(() =>
    spa2SeasonalSeasons.map((s) => ({ ...s }))
  );
  const [seasonForm, setSeasonForm] = useState(EMPTY_SEASON_FORM);
  const [seasonDialog, setSeasonDialog] = useState(false);
  const [seasonEditId, setSeasonEditId] = useState<string | null>(null);
  const [seasonDeleteId, setSeasonDeleteId] = useState<string | null>(null);

  const openCreateSeason = () => {
    setSeasonForm(EMPTY_SEASON_FORM);
    setSeasonEditId(null);
    setSeasonDialog(true);
  };
  const openEditSeason = (item: Spa2SeasonalSeason) => {
    setSeasonForm({
      season: item.season,
      period: item.period,
      icon: item.icon,
      color: item.color,
      accent: item.accent,
      bg: item.bg,
    });
    setSeasonEditId(item.id);
    setSeasonDialog(true);
  };
  const submitSeason = () => {
    const next = { ...seasonForm };
    if (seasonEditId) {
      setSeasons((prev) => prev.map((s) => (s.id === seasonEditId ? { ...s, ...next } : s)));
    } else {
      setSeasons((prev) => [...prev, withId(next)]);
    }
    setSeasonDialog(false);
    markDirty();
  };
  const confirmDeleteSeason = () => {
    setSeasons((prev) => prev.filter((s) => s.id !== seasonDeleteId));
    setPackages((prev) => prev.filter((p) => p.seasonId !== seasonDeleteId));
    setSeasonDeleteId(null);
    markDirty();
  };

  // ---- Packages ----
  const [packages, setPackages] = useState<Spa2SeasonalPackageItem[]>(() =>
    spa2SeasonalPackages.map((p) => ({ ...p }))
  );
  const [packageFilter, setPackageFilter] = useState('all');
  const filteredPackages = useMemo(
    () =>
      packageFilter === 'all' ? packages : packages.filter((p) => p.seasonId === packageFilter),
    [packages, packageFilter]
  );
  const [packageForm, setPackageForm] = useState(EMPTY_PACKAGE_FORM);
  const [packageDialog, setPackageDialog] = useState(false);
  const [packageEditId, setPackageEditId] = useState<string | null>(null);
  const [packageDeleteId, setPackageDeleteId] = useState<string | null>(null);

  const openCreatePackage = () => {
    setPackageForm({ ...EMPTY_PACKAGE_FORM, seasonId: seasons[0]?.id ?? '' });
    setPackageEditId(null);
    setPackageDialog(true);
  };
  const openEditPackage = (item: Spa2SeasonalPackageItem) => {
    setPackageForm({
      seasonId: item.seasonId,
      name: item.name,
      price: item.price,
      desc: item.desc,
      image: item.image,
    });
    setPackageEditId(item.id);
    setPackageDialog(true);
  };
  const submitPackage = () => {
    const next = {
      seasonId: packageForm.seasonId,
      name: packageForm.name,
      price: Number(packageForm.price),
      desc: packageForm.desc,
      image: packageForm.image,
    };
    if (packageEditId) {
      setPackages((prev) => prev.map((p) => (p.id === packageEditId ? { ...p, ...next } : p)));
    } else {
      setPackages((prev) => [...prev, withId(next)]);
    }
    setPackageDialog(false);
    markDirty();
  };
  const confirmDeletePackage = () => {
    setPackages((prev) => prev.filter((p) => p.id !== packageDeleteId));
    setPackageDeleteId(null);
    markDirty();
  };
  const reorderPackages = (next: Spa2SeasonalPackageItem[]) => {
    if (packageFilter === 'all') {
      setPackages(next);
    } else {
      // Filtered view: splice the reordered subset back into its original
      // slots within the full list so packages outside the current filter
      // keep their relative position.
      const queue = [...next];
      const nextIds = new Set(next.map((p) => p.id));
      setPackages((prev) => prev.map((p) => (nextIds.has(p.id) ? queue.shift()! : p)));
    }
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setSeasons(spa2SeasonalSeasons.map((s) => ({ ...s })));
    setPackages(spa2SeasonalPackages.map((p) => ({ ...p })));
    setDirty(false);
  };

  const packageFormSeason = seasons.find((s) => s.id === packageForm.seasonId);

  return (
    <Spa2ManageShell
      title={t('seasonal_package.page_title')}
      description={t('seasonal_package.page_description')}
      breadcrumbLabel={t('nav.seasonal_package')}
      publicPath={paths.spa2.seasonalPackage}
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
          top: 64,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="seasons"
          label={t('seasonal_package.seasons_section')}
          icon={<Iconify icon="solar:calendar-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="packages"
          label={t('seasonal_package.packages_section')}
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

      {/* Seasons */}
      {tab === 'seasons' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('seasonal_package.seasons_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateSeason}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('seasonal_package.add_season_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {seasons.map((s) => (
              <Grid key={s.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <SeasonPreviewTile {...s} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditSeason(s)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setSeasonDeleteId(s.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Packages */}
      {tab === 'packages' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
            flexWrap="wrap"
            useFlexGap
            gap={1}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('seasonal_package.packages_section')}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                select
                size="small"
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value="all">{t('common.all')}</MenuItem>
                {seasons.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.season}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreatePackage}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('seasonal_package.add_package_btn')}
              </Button>
            </Stack>
          </Stack>
          {packageFilter !== 'all' && (
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('seasonal_package.reorder_filter_hint')}
            </Typography>
          )}
          <Spa2SortableGrid items={filteredPackages} onReorder={reorderPackages}>
            <Grid container spacing={2}>
              {filteredPackages.map((item) => {
                const itemSeason = seasons.find((s) => s.id === item.seasonId);
                return (
                  <Grid key={item.id} xs={12} sm={6} md={3}>
                    <Spa2SortableItem id={item.id}>
                      {(sortable) => (
                        <Box sx={{ position: 'relative' }}>
                          <PackagePreviewCard {...item} color={itemSeason?.color ?? SPA2_TEAL} />
                          <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{ position: 'absolute', top: 8, left: 8 }}
                          >
                            <Spa2DragHandle
                              sortable={sortable}
                              sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => openEditPackage(item)}
                              sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                            >
                              <Iconify icon="solar:pen-bold" width={14} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setPackageDeleteId(item.id)}
                              sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                            </IconButton>
                          </Stack>
                        </Box>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                );
              })}
            </Grid>
          </Spa2SortableGrid>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SeasonalPackagePageView seasons={seasons} packages={packages} />
        </Box>
      )}

      {/* Season add/edit dialog */}
      <Dialog open={seasonDialog} onClose={() => setSeasonDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {seasonEditId ? t('common.edit') : t('seasonal_package.add_season_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('seasonal_package.form_season_name')}
                    fullWidth
                    size="small"
                    value={seasonForm.season}
                    onChange={(e) => setSeasonForm((p) => ({ ...p, season: e.target.value }))}
                  />
                  <TextField
                    label={t('seasonal_package.form_season_period')}
                    fullWidth
                    size="small"
                    value={seasonForm.period}
                    onChange={(e) => setSeasonForm((p) => ({ ...p, period: e.target.value }))}
                  />
                </Stack>
                <TextField
                  label={t('seasonal_package.form_season_icon')}
                  fullWidth
                  size="small"
                  value={seasonForm.icon}
                  onChange={(e) => setSeasonForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="☀️ 🍂 ❄️ 🌸"
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('seasonal_package.form_season_color')}
                    fullWidth
                    size="small"
                    value={seasonForm.color}
                    onChange={(e) => setSeasonForm((p) => ({ ...p, color: e.target.value }))}
                    helperText="#FF8F00"
                  />
                  <TextField
                    label={t('seasonal_package.form_season_accent')}
                    fullWidth
                    size="small"
                    value={seasonForm.accent}
                    onChange={(e) => setSeasonForm((p) => ({ ...p, accent: e.target.value }))}
                    helperText="#FFF8E1"
                  />
                </Stack>
                <TextField
                  label={t('seasonal_package.form_season_bg')}
                  fullWidth
                  size="small"
                  multiline
                  minRows={2}
                  value={seasonForm.bg}
                  onChange={(e) => setSeasonForm((p) => ({ ...p, bg: e.target.value }))}
                  helperText="linear-gradient(135deg, #FFB300 0%, #E65100 100%)"
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <SeasonPreviewTile {...seasonForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSeasonDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitSeason}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {seasonEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Package add/edit dialog */}
      <Dialog open={packageDialog} onClose={() => setPackageDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {packageEditId ? t('common.edit') : t('seasonal_package.add_package_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label={t('seasonal_package.form_package_season')}
                    fullWidth
                    size="small"
                    value={packageForm.seasonId}
                    onChange={(e) => setPackageForm((p) => ({ ...p, seasonId: e.target.value }))}
                  >
                    {seasons.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.season}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={t('seasonal_package.form_package_price')}
                    type="number"
                    fullWidth
                    size="small"
                    value={packageForm.price}
                    onChange={(e) =>
                      setPackageForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                  />
                </Stack>
                <TextField
                  label={t('seasonal_package.form_package_name')}
                  fullWidth
                  size="small"
                  value={packageForm.name}
                  onChange={(e) => setPackageForm((p) => ({ ...p, name: e.target.value }))}
                />
                <TextField
                  label={t('seasonal_package.form_package_desc')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={packageForm.desc}
                  onChange={(e) => setPackageForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <Spa2SimpleImageField
                  label={t('seasonal_package.form_package_image')}
                  value={packageForm.image}
                  onChange={(url) => setPackageForm((p) => ({ ...p, image: url }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <PackagePreviewCard
                  {...packageForm}
                  color={packageFormSeason?.color ?? SPA2_TEAL}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPackage}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {packageEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!seasonDeleteId}
        onClose={() => setSeasonDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteSeason}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!packageDeleteId}
        onClose={() => setPackageDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePackage}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
