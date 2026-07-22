import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2WellnessAddons,
  spa2WellnessPackages,
  type Spa2AdjustableImage,
  type Spa2WellnessAddon,
  spa2WellnessPackageBanner,
  type Spa2WellnessPackageItem,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2ContentPageHero,
  Spa2WellnessPackagePageView,
} from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2SimpleImageField } from './spa2-simple-image-field';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2WellnessPackagePageView renders on the public /spa2/wellness-package
// page: the page banner, the package cards + add-on grid
// (spa2WellnessPackages/spa2WellnessAddons) - read from and written back in
// the same shape as src/_mock/_spa2, the single source of truth shared with
// the public view. The "banner" tab reuses Spa2ContentPageHero and the
// "preview" tab reuses Spa2WellnessPackagePageView itself, fed with the
// in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_PACKAGE_FORM = {
  name: '',
  duration: '',
  price: 0,
  image: '',
  includesInput: '',
  tag: '',
  hot: false,
};

const EMPTY_ADDON_FORM = {
  name: '',
  price: 0,
  icon: 'solar:leaf-bold',
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

function PackagePreviewCard({
  name,
  duration,
  price,
  image,
  includes,
  tag,
  hot,
}: {
  name: string;
  duration: string;
  price: number;
  image: string;
  includes: string[];
  tag: string;
  hot: boolean;
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: hot ? '0 16px 36px rgba(46,139,122,0.15)' : 'none',
      }}
    >
      <Box
        sx={{
          height: 140,
          bgcolor: SPA2_CREAM_DARK,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {tag && (
          <Chip
            label={tag}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: 'rgba(31,42,40,0.75)',
              color: 'white',
            }}
          />
        )}
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 1 }}>
          {name || 'Tên gói'}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Chip
            label={duration || '—'}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
          />
          <Chip
            label={formatVND(price)}
            size="small"
            sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700 }}
          />
        </Stack>
        <Stack spacing={0.5}>
          {includes.map((inc) => (
            <Stack key={inc} direction="row" spacing={1} alignItems="center">
              <Iconify icon="solar:check-circle-bold" width={14} sx={{ color: SPA2_TEAL }} />
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>{inc}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

function AddonPreviewCard({ name, price, icon }: { name: string; price: number; icon: string }) {
  return (
    <Card
      sx={{ borderRadius: 3, p: 2.5, textAlign: 'center', border: `1px solid ${SPA2_CREAM_DARK}` }}
    >
      <Iconify icon={icon || 'solar:leaf-bold'} width={30} sx={{ color: SPA2_TEAL, mb: 1 }} />
      <Typography sx={{ fontSize: 12.5, color: SPA2_INK, fontWeight: 500, mb: 0.5 }}>
        {name || 'Tên tuỳ chọn'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: SPA2_TEAL_DARK, fontWeight: 700 }}>
        {price ? `+${formatVND(price)}` : 'Miễn phí'}
      </Typography>
    </Card>
  );
}

export function Spa2WellnessPackageManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2WellnessPackageBanner,
    image: { ...spa2WellnessPackageBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'packages' | 'addons' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Packages ----
  const [packages, setPackages] = useState<Spa2WellnessPackageItem[]>(() =>
    spa2WellnessPackages.map((p) => ({ ...p }))
  );
  const [packageForm, setPackageForm] = useState(EMPTY_PACKAGE_FORM);
  const [packageDialog, setPackageDialog] = useState(false);
  const [packageEditId, setPackageEditId] = useState<string | null>(null);
  const [packageDeleteId, setPackageDeleteId] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<'all' | string>('all');

  const openCreatePackage = () => {
    setPackageForm(EMPTY_PACKAGE_FORM);
    setPackageEditId(null);
    setPackageDialog(true);
  };

  const openEditPackage = (item: Spa2WellnessPackageItem) => {
    setPackageForm({
      name: item.name,
      duration: item.duration,
      price: item.price,
      image: item.image,
      includesInput: item.includes.join(', '),
      tag: item.tag,
      hot: item.hot,
    });
    setPackageEditId(item.id);
    setPackageDialog(true);
  };

  const packageIncludesList = useMemo(
    () =>
      packageForm.includesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    [packageForm.includesInput]
  );

  const submitPackage = () => {
    const next = {
      name: packageForm.name,
      duration: packageForm.duration,
      price: Number(packageForm.price),
      image: packageForm.image,
      includes: packageIncludesList,
      tag: packageForm.tag,
      hot: packageForm.hot,
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

  const packageTags = useMemo(
    () => Array.from(new Set(packages.map((p) => p.tag).filter(Boolean))),
    [packages]
  );

  const filteredPackages = useMemo(
    () => packages.filter((p) => tagFilter === 'all' || p.tag === tagFilter),
    [packages, tagFilter]
  );

  const packageCounts = useMemo(
    () => ({
      all: packages.length,
      hot: packages.filter((p) => p.hot).length,
      byTag: Object.fromEntries(
        packageTags.map((tag) => [tag, packages.filter((p) => p.tag === tag).length])
      ),
    }),
    [packages, packageTags]
  );

  // ---- Addons ----
  const [addons, setAddons] = useState<Spa2WellnessAddon[]>(() =>
    spa2WellnessAddons.map((a) => ({ ...a }))
  );
  const [addonForm, setAddonForm] = useState(EMPTY_ADDON_FORM);
  const [addonDialog, setAddonDialog] = useState(false);
  const [addonEditId, setAddonEditId] = useState<string | null>(null);
  const [addonDeleteId, setAddonDeleteId] = useState<string | null>(null);

  const openCreateAddon = () => {
    setAddonForm(EMPTY_ADDON_FORM);
    setAddonEditId(null);
    setAddonDialog(true);
  };

  const openEditAddon = (item: Spa2WellnessAddon) => {
    setAddonForm({ name: item.name, price: item.price, icon: item.icon });
    setAddonEditId(item.id);
    setAddonDialog(true);
  };

  const submitAddon = () => {
    const next = { name: addonForm.name, price: Number(addonForm.price), icon: addonForm.icon };
    if (addonEditId) {
      setAddons((prev) => prev.map((a) => (a.id === addonEditId ? { ...a, ...next } : a)));
    } else {
      setAddons((prev) => [...prev, withId(next)]);
    }
    setAddonDialog(false);
    markDirty();
  };

  const confirmDeleteAddon = () => {
    setAddons((prev) => prev.filter((a) => a.id !== addonDeleteId));
    setAddonDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2WellnessPackageBanner, image: { ...spa2WellnessPackageBanner.image } });
    setPackages(spa2WellnessPackages.map((p) => ({ ...p })));
    setAddons(spa2WellnessAddons.map((a) => ({ ...a })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('wellness_package.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.wellness_package')}
      publicPath={paths.spa2.wellnessPackage}
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
          value="banner"
          label={t('wellness_package.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="packages"
          label={t('wellness_package.packages_section')}
          icon={<Iconify icon="solar:box-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="addons"
          label={t('wellness_package.addons_section')}
          icon={<Iconify icon="solar:add-circle-bold-duotone" width={20} />}
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
              title={t('wellness_package.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('wellness_package.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('wellness_package.banner_image_help')}
                />
                <TextField
                  label={t('wellness_package.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('wellness_package.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('wellness_package.banner_subtitle')}
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
                <Spa2ContentPageHero
                  img={banner.image.url}
                  imageStyle={banner.image}
                  eyebrow={banner.eyebrow}
                  title={banner.title}
                  subtitle={banner.subtitle}
                />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Packages */}
      {tab === 'packages' && (
        <Stack spacing={3}>
          <Card sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
            >
              {t('wellness_package.stat_by_tag')}
            </Typography>
            <Scrollbar sx={{ maxHeight: 120 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                spacing={2}
                sx={{ py: 1 }}
              >
                <Spa2ListAnalytic
                  icon="solar:box-bold-duotone"
                  title={t('common.all')}
                  total={packageCounts.all}
                  percent={100}
                  active={tagFilter === 'all'}
                  onClick={() => setTagFilter('all')}
                  unitLabel={t('wellness_package.unit_package')}
                />
                {packageTags.map((tag) => (
                  <Spa2ListAnalytic
                    key={tag}
                    icon="solar:tag-bold-duotone"
                    title={tag}
                    total={packageCounts.byTag[tag] ?? 0}
                    percent={
                      packageCounts.all
                        ? ((packageCounts.byTag[tag] ?? 0) / packageCounts.all) * 100
                        : 0
                    }
                    active={tagFilter === tag}
                    onClick={() => setTagFilter(tag)}
                    unitLabel={t('wellness_package.unit_package')}
                  />
                ))}
                <Spa2ListAnalytic
                  icon="solar:star-bold-duotone"
                  title={t('wellness_package.stat_hot')}
                  total={packageCounts.hot}
                  percent={packageCounts.all ? (packageCounts.hot / packageCounts.all) * 100 : 0}
                  unitLabel={t('wellness_package.unit_package')}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('wellness_package.packages_section')}
              </Typography>
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
                {t('wellness_package.add_package_btn')}
              </Button>
            </Stack>
            <Grid container spacing={2.5}>
              {filteredPackages.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Box sx={{ position: 'relative' }}>
                    <PackagePreviewCard {...item} />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => openEditPackage(item)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:pen-bold" width={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setPackageDeleteId(item.id)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      )}

      {/* Addons */}
      {tab === 'addons' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('wellness_package.addons_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateAddon}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('wellness_package.add_addon_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {addons.map((item) => (
              <Grid key={item.id} xs={6} sm={4} md={2}>
                <Box sx={{ position: 'relative' }}>
                  <AddonPreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 4, right: 4 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditAddon(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={12} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setAddonDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={12} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2WellnessPackagePageView banner={banner} packages={packages} addons={addons} />
        </Box>
      )}

      {/* Package add/edit dialog */}
      <Dialog open={packageDialog} onClose={() => setPackageDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {packageEditId ? t('common.edit') : t('wellness_package.add_package_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('wellness_package.form_name')}
                  fullWidth
                  size="small"
                  value={packageForm.name}
                  onChange={(e) => setPackageForm((p) => ({ ...p, name: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('wellness_package.form_duration')}
                    fullWidth
                    size="small"
                    value={packageForm.duration}
                    onChange={(e) => setPackageForm((p) => ({ ...p, duration: e.target.value }))}
                  />
                  <TextField
                    label={t('common.price_vnd')}
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
                  label={t('wellness_package.form_tag')}
                  fullWidth
                  size="small"
                  value={packageForm.tag}
                  onChange={(e) => setPackageForm((p) => ({ ...p, tag: e.target.value }))}
                />
                <Spa2SimpleImageField
                  label={t('wellness_package.form_image')}
                  value={packageForm.image}
                  onChange={(url) => setPackageForm((p) => ({ ...p, image: url }))}
                  height={160}
                />
                <TextField
                  label={t('wellness_package.form_includes')}
                  helperText={t('common.comma_hint')}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  value={packageForm.includesInput}
                  onChange={(e) => setPackageForm((p) => ({ ...p, includesInput: e.target.value }))}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={packageForm.hot}
                      onChange={(e) => setPackageForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('wellness_package.form_hot')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <PackagePreviewCard
                  name={packageForm.name}
                  duration={packageForm.duration}
                  price={Number(packageForm.price)}
                  image={packageForm.image}
                  includes={packageIncludesList}
                  tag={packageForm.tag}
                  hot={packageForm.hot}
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

      {/* Addon add/edit dialog */}
      <Dialog open={addonDialog} onClose={() => setAddonDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {addonEditId ? t('common.edit') : t('wellness_package.add_addon_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('wellness_package.form_name')}
                  fullWidth
                  size="small"
                  value={addonForm.name}
                  onChange={(e) => setAddonForm((p) => ({ ...p, name: e.target.value }))}
                />
                <TextField
                  label={t('common.price_vnd')}
                  type="number"
                  fullWidth
                  size="small"
                  value={addonForm.price}
                  onChange={(e) => setAddonForm((p) => ({ ...p, price: Number(e.target.value) }))}
                />
                <TextField
                  label={t('wellness_package.form_icon')}
                  fullWidth
                  size="small"
                  value={addonForm.icon}
                  onChange={(e) => setAddonForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:leaf-bold, solar:crown-bold, ..."
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <AddonPreviewCard
                  name={addonForm.name}
                  price={Number(addonForm.price)}
                  icon={addonForm.icon}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddonDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitAddon}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {addonEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

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

      <ConfirmDialog
        open={!!addonDeleteId}
        onClose={() => setAddonDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteAddon}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
