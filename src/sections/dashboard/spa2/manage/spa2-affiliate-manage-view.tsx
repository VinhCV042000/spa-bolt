import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
  spa2AffiliateTiers,
  spa2AffiliateBanner,
  spa2AffiliateStats,
  spa2AffiliateSteps,
  type Spa2AffiliateTier,
  type Spa2AffiliateStat,
  type Spa2AffiliateStep,
  type Spa2AffiliateBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2AffiliatePageView } from 'src/sections/spa2/view/spa2-content-pages4';
import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2AffiliatePageView renders on the public /spa2/affiliate page: the page
// banner, the stat strip, the "how it works" steps and the commission-tier
// cards — read from and written back in the same shape as src/_mock/_spa2,
// the single source of truth shared with the public view. The application
// form on the public page is purely interactive UI (no admin-editable
// content) and is intentionally not mocked here, matching the project
// convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STAT_FORM = { n: '', l: '' };
const EMPTY_STEP_FORM = { icon: 'solar:user-plus-bold-duotone', title: '', desc: '' };
const EMPTY_TIER_FORM = {
  name: '',
  commission: '',
  threshold: '',
  color: '#2E8B7A',
  hot: false,
  perks: '',
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

export function Spa2AffiliateManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2AffiliateBanner>(() => ({
    ...spa2AffiliateBanner,
    image: { ...spa2AffiliateBanner.image },
  }));
  const [stats, setStats] = useState<Spa2AffiliateStat[]>(spa2AffiliateStats);
  const [steps, setSteps] = useState<Spa2AffiliateStep[]>(spa2AffiliateSteps);
  const [tiers, setTiers] = useState<Spa2AffiliateTier[]>(spa2AffiliateTiers);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'stats' | 'steps' | 'tiers' | 'preview'>('banner');

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
    setBanner({ ...spa2AffiliateBanner, image: { ...spa2AffiliateBanner.image } });
    setStats(spa2AffiliateStats);
    setSteps(spa2AffiliateSteps);
    setTiers(spa2AffiliateTiers);
    setDirty(false);
  };

  // ---- Stats ----
  const [openStatForm, setOpenStatForm] = useState(false);
  const [editStatId, setEditStatId] = useState<string | null>(null);
  const [deleteStatId, setDeleteStatId] = useState<string | null>(null);
  const [statForm, setStatForm] = useState(EMPTY_STAT_FORM);

  const openCreateStat = () => {
    setStatForm(EMPTY_STAT_FORM);
    setEditStatId(null);
    setOpenStatForm(true);
  };
  const openEditStat = (stat: Spa2AffiliateStat) => {
    setStatForm({ n: stat.n, l: stat.l });
    setEditStatId(stat.id);
    setOpenStatForm(true);
  };
  const handleStatSubmit = useCallback(() => {
    if (editStatId !== null) {
      setStats((p) => p.map((x) => (x.id === editStatId ? { ...x, ...statForm } : x)));
    } else {
      setStats((p) => [...p, withId({ ...statForm })]);
    }
    setOpenStatForm(false);
    setDirty(true);
  }, [statForm, editStatId]);
  const handleStatDelete = useCallback(() => {
    setStats((p) => p.filter((x) => x.id !== deleteStatId));
    setDeleteStatId(null);
    setDirty(true);
  }, [deleteStatId]);

  // ---- Steps ----
  const [openStepForm, setOpenStepForm] = useState(false);
  const [editStepId, setEditStepId] = useState<string | null>(null);
  const [deleteStepId, setDeleteStepId] = useState<string | null>(null);
  const [stepForm, setStepForm] = useState(EMPTY_STEP_FORM);

  const openCreateStep = () => {
    setStepForm(EMPTY_STEP_FORM);
    setEditStepId(null);
    setOpenStepForm(true);
  };
  const openEditStep = (step: Spa2AffiliateStep) => {
    setStepForm({ icon: step.icon, title: step.title, desc: step.desc });
    setEditStepId(step.id);
    setOpenStepForm(true);
  };
  const handleStepSubmit = useCallback(() => {
    if (editStepId !== null) {
      setSteps((p) => p.map((x) => (x.id === editStepId ? { ...x, ...stepForm } : x)));
    } else {
      setSteps((p) => [...p, withId({ ...stepForm })]);
    }
    setOpenStepForm(false);
    setDirty(true);
  }, [stepForm, editStepId]);
  const handleStepDelete = useCallback(() => {
    setSteps((p) => p.filter((x) => x.id !== deleteStepId));
    setDeleteStepId(null);
    setDirty(true);
  }, [deleteStepId]);

  // ---- Tiers ----
  const [openTierForm, setOpenTierForm] = useState(false);
  const [editTierId, setEditTierId] = useState<string | null>(null);
  const [deleteTierId, setDeleteTierId] = useState<string | null>(null);
  const [tierForm, setTierForm] = useState(EMPTY_TIER_FORM);

  const openCreateTier = () => {
    setTierForm(EMPTY_TIER_FORM);
    setEditTierId(null);
    setOpenTierForm(true);
  };
  const openEditTier = (tier: Spa2AffiliateTier) => {
    setTierForm({
      name: tier.name,
      commission: tier.commission,
      threshold: tier.threshold,
      color: tier.color,
      hot: !!tier.hot,
      perks: tier.perks.join(', '),
    });
    setEditTierId(tier.id);
    setOpenTierForm(true);
  };
  const handleTierSubmit = useCallback(() => {
    const next = {
      name: tierForm.name,
      commission: tierForm.commission,
      threshold: tierForm.threshold,
      color: tierForm.color,
      hot: tierForm.hot,
      perks: tierForm.perks
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editTierId !== null) {
      setTiers((p) => p.map((x) => (x.id === editTierId ? { ...x, ...next } : x)));
    } else {
      setTiers((p) => [...p, withId(next)]);
    }
    setOpenTierForm(false);
    setDirty(true);
  }, [tierForm, editTierId]);
  const handleTierDelete = useCallback(() => {
    setTiers((p) => p.filter((x) => x.id !== deleteTierId));
    setDeleteTierId(null);
    setDirty(true);
  }, [deleteTierId]);

  return (
    <Spa2ManageShell
      title={t('affiliate.page_title')}
      description="Banner, số liệu, các bước tham gia và cấp độ hoa hồng hiển thị trên trang Cộng tác viên công khai."
      breadcrumbLabel={t('nav.affiliate')}
      publicPath={paths.spa2.affiliate}
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
          label={t('affiliate.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stats"
          label={t('affiliate.stats_section')}
          icon={<Iconify icon="solar:chart-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="steps"
          label={t('affiliate.steps_section')}
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tiers"
          label={t('affiliate.tiers_section')}
          icon={<Iconify icon="solar:medal-ribbon-star-bold-duotone" width={20} />}
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
                  label={t('affiliate.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('affiliate.banner_image_help')}
                />
                <TextField
                  label={t('affiliate.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('affiliate.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('affiliate.banner_subtitle')}
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
              <Spa2AffiliatePageView banner={banner} stats={stats} steps={steps} tiers={tiers} />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Stats */}
      {tab === 'stats' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateStat}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('affiliate.stat_add_btn')}
              </Button>
            </Stack>
          </Grid>
          {stats.map((stat) => (
            <Grid key={stat.id} xs={6} sm={3}>
              <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                <Typography variant="h4" sx={{ color: SPA2_TEAL, fontWeight: 700, mb: 0.5 }}>
                  {stat.n}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5 }}>
                  {stat.l}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={0.5}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton size="small" onClick={() => openEditStat(stat)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton size="small" color="error" onClick={() => setDeleteStatId(stat.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Steps */}
      {tab === 'steps' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateStep}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('affiliate.step_add_btn')}
              </Button>
            </Stack>
          </Grid>
          {steps.map((step, idx) => (
            <Grid key={step.id} xs={12} sm={6} md={3}>
              <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                <Chip
                  label={idx + 1}
                  size="small"
                  sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700, mb: 1 }}
                />
                <Iconify icon={step.icon} width={32} sx={{ color: SPA2_TEAL, mb: 1, mx: 'auto' }} />
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{step.title}</Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                  {step.desc}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={0.5}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton size="small" onClick={() => openEditStep(step)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton size="small" color="error" onClick={() => setDeleteStepId(step.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Tiers */}
      {tab === 'tiers' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateTier}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('affiliate.tier_add_btn')}
              </Button>
            </Stack>
          </Grid>
          {tiers.map((tier) => (
            <Grid key={tier.id} xs={12} md={4}>
              <Card
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  height: '100%',
                  border: tier.hot ? `2px solid ${tier.color}` : undefined,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: tier.color }} />
                  <Typography variant="h6">{tier.name}</Typography>
                  {tier.hot && (
                    <Chip label={t('affiliate.tier_hot_label')} size="small" color="warning" />
                  )}
                </Stack>
                <Typography sx={{ fontWeight: 700, color: tier.color, fontSize: 24, mb: 0.25 }}>
                  {tier.commission}
                </Typography>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5 }}>
                  {t('affiliate.tier_threshold_prefix')} {tier.threshold}
                </Typography>
                <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                  {tier.perks.map((p) => (
                    <Stack key={p} direction="row" spacing={1} alignItems="center">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={14}
                        sx={{ color: tier.color, flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: 12.5 }}>{p}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton size="small" onClick={() => openEditTier(tier)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton size="small" color="error" onClick={() => setDeleteTierId(tier.id)}>
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
          <Spa2AffiliatePageView banner={banner} stats={stats} steps={steps} tiers={tiers} />
        </Box>
      )}

      {/* Stat create / edit dialog */}
      <Dialog open={openStatForm} onClose={() => setOpenStatForm(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editStatId !== null ? t('affiliate.stat_form_edit') : t('affiliate.stat_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('affiliate.stat_form_value')}
              value={statForm.n}
              onChange={(e) => setStatForm((p) => ({ ...p, n: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('affiliate.stat_form_label')}
              value={statForm.l}
              onChange={(e) => setStatForm((p) => ({ ...p, l: e.target.value }))}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleStatSubmit}
            disabled={!statForm.l}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editStatId !== null ? t('affiliate.stat_form_edit') : t('affiliate.stat_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Step create / edit dialog */}
      <Dialog open={openStepForm} onClose={() => setOpenStepForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editStepId !== null ? t('affiliate.step_form_edit') : t('affiliate.step_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('affiliate.step_form_icon')}
              value={stepForm.icon}
              onChange={(e) => setStepForm((p) => ({ ...p, icon: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('affiliate.step_form_title')}
              value={stepForm.title}
              onChange={(e) => setStepForm((p) => ({ ...p, title: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('affiliate.step_form_desc')}
              value={stepForm.desc}
              onChange={(e) => setStepForm((p) => ({ ...p, desc: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStepForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleStepSubmit}
            disabled={!stepForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editStepId !== null ? t('affiliate.step_form_edit') : t('affiliate.step_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tier create / edit dialog */}
      <Dialog open={openTierForm} onClose={() => setOpenTierForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editTierId !== null ? t('affiliate.tier_form_edit') : t('affiliate.tier_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('affiliate.tier_form_name')}
              value={tierForm.name}
              onChange={(e) => setTierForm((p) => ({ ...p, name: e.target.value }))}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('affiliate.tier_form_commission')}
                value={tierForm.commission}
                onChange={(e) => setTierForm((p) => ({ ...p, commission: e.target.value }))}
                fullWidth
              />
              <TextField
                label={t('affiliate.tier_form_threshold')}
                value={tierForm.threshold}
                onChange={(e) => setTierForm((p) => ({ ...p, threshold: e.target.value }))}
                fullWidth
              />
            </Stack>
            <TextField
              label={t('affiliate.tier_form_color')}
              value={tierForm.color}
              onChange={(e) => setTierForm((p) => ({ ...p, color: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('affiliate.tier_form_perks')}
              value={tierForm.perks}
              onChange={(e) => setTierForm((p) => ({ ...p, perks: e.target.value }))}
              fullWidth
              multiline
              rows={3}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={tierForm.hot}
                  onChange={(e) => setTierForm((p) => ({ ...p, hot: e.target.checked }))}
                />
              }
              label={t('affiliate.tier_form_hot')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTierForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleTierSubmit}
            disabled={!tierForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editTierId !== null ? t('affiliate.tier_form_edit') : t('affiliate.tier_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteStatId}
        onClose={() => setDeleteStatId(null)}
        title={t('affiliate.stat_delete_title')}
        content={t('affiliate.stat_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleStatDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteStepId}
        onClose={() => setDeleteStepId(null)}
        title={t('affiliate.step_delete_title')}
        content={t('affiliate.step_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleStepDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteTierId}
        onClose={() => setDeleteTierId(null)}
        title={t('affiliate.tier_delete_title')}
        content={t('affiliate.tier_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleTierDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
