import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2CorporateBanner,
  spa2CorporatePlans,
  spa2CorporateBenefits,
  type Spa2AdjustableImage,
  type Spa2CorporatePlan,
  type Spa2CorporateBenefit,
  spa2CorporateServiceChannels,
  type Spa2CorporateServiceChannel,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  Spa2ContentPageHero,
  Spa2CorporatePageView,
} from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2CorporatePageView renders on the public /spa2/corporate page: the page
// banner, the "why invest" benefits, the pricing plans and the per-channel
// service checklist (office/spa/online) - read from and written back in the
// same shape as src/_mock/_spa2, the single source of truth shared with the
// public view. The "banner" tab reuses Spa2ContentPageHero and the "preview"
// tab reuses Spa2CorporatePageView itself, fed with the in-progress edited
// state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_BENEFIT_FORM = { icon: 'solar:health-bold-duotone', title: '', desc: '' };
const EMPTY_PLAN_FORM = {
  name: '',
  members: '',
  price: 0,
  period: 'tháng',
  hot: false,
  perks: '',
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

function BenefitPreviewCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Spa2SoftCard>
      <Iconify
        icon={icon || 'solar:health-bold-duotone'}
        width={40}
        sx={{ color: SPA2_TEAL, mb: 1.5 }}
      />
      <Typography sx={{ fontWeight: 600, mb: 0.75 }}>{title || 'Tiêu đề lợi ích'}</Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Spa2SoftCard>
  );
}

function PlanPreviewCard({
  name,
  members,
  price,
  period,
  hot,
  perks,
}: {
  name: string;
  members: string;
  price: number;
  period: string;
  hot: boolean;
  perks: string[];
}) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        p: 2.5,
        border: hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
      }}
    >
      {hot && (
        <Chip
          size="small"
          label="PHỔ BIẾN NHẤT"
          sx={{ mb: 1, bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700 }}
        />
      )}
      <Typography variant="subtitle1">{name || 'Tên gói'}</Typography>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
        {members || 'Số lượng người'}
      </Typography>
      <Typography variant="h6" sx={{ color: SPA2_TEAL, mb: 1 }}>
        {price === 0 ? 'Liên hệ báo giá' : `${formatVND(price)}${period ? `/${period}` : ''}`}
      </Typography>
      <Stack spacing={0.5}>
        {perks.map((p) => (
          <Typography key={p} variant="caption" sx={{ display: 'block' }}>
            ✓ {p}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

export function Spa2CorporateManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2CorporateBanner,
    image: { ...spa2CorporateBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'benefits' | 'plans' | 'services' | 'preview'>(
    'banner'
  );
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

  // ---- Benefits ----
  const [benefits, setBenefits] = useState<Spa2CorporateBenefit[]>(() =>
    spa2CorporateBenefits.map((b) => ({ ...b }))
  );
  const [benefitForm, setBenefitForm] = useState(EMPTY_BENEFIT_FORM);
  const [benefitDialog, setBenefitDialog] = useState(false);
  const [benefitEditId, setBenefitEditId] = useState<string | null>(null);
  const [benefitDeleteId, setBenefitDeleteId] = useState<string | null>(null);

  const openCreateBenefit = () => {
    setBenefitForm(EMPTY_BENEFIT_FORM);
    setBenefitEditId(null);
    setBenefitDialog(true);
  };
  const openEditBenefit = (item: Spa2CorporateBenefit) => {
    setBenefitForm({ icon: item.icon, title: item.title, desc: item.desc });
    setBenefitEditId(item.id);
    setBenefitDialog(true);
  };
  const submitBenefit = () => {
    const next = { icon: benefitForm.icon, title: benefitForm.title, desc: benefitForm.desc };
    if (benefitEditId) {
      setBenefits((prev) => prev.map((b) => (b.id === benefitEditId ? { ...b, ...next } : b)));
    } else {
      setBenefits((prev) => [...prev, withId(next)]);
    }
    setBenefitDialog(false);
    markDirty();
  };
  const confirmDeleteBenefit = () => {
    setBenefits((prev) => prev.filter((b) => b.id !== benefitDeleteId));
    setBenefitDeleteId(null);
    markDirty();
  };

  // ---- Plans ----
  const [plans, setPlans] = useState<Spa2CorporatePlan[]>(() =>
    spa2CorporatePlans.map((p) => ({ ...p, perks: [...p.perks] }))
  );
  const [planForm, setPlanForm] = useState(EMPTY_PLAN_FORM);
  const [planDialog, setPlanDialog] = useState(false);
  const [planEditId, setPlanEditId] = useState<string | null>(null);
  const [planDeleteId, setPlanDeleteId] = useState<string | null>(null);

  const openCreatePlan = () => {
    setPlanForm(EMPTY_PLAN_FORM);
    setPlanEditId(null);
    setPlanDialog(true);
  };
  const openEditPlan = (item: Spa2CorporatePlan) => {
    setPlanForm({
      name: item.name,
      members: item.members,
      price: item.price,
      period: item.period,
      hot: item.hot,
      perks: item.perks.join('\n'),
    });
    setPlanEditId(item.id);
    setPlanDialog(true);
  };
  const planPerksPreview = planForm.perks
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);
  const submitPlan = () => {
    const next = {
      name: planForm.name,
      members: planForm.members,
      price: planForm.price,
      period: planForm.period,
      hot: planForm.hot,
      perks: planPerksPreview,
    };
    if (planEditId) {
      setPlans((prev) => prev.map((p) => (p.id === planEditId ? { ...p, ...next } : p)));
    } else {
      setPlans((prev) => [...prev, withId(next)]);
    }
    setPlanDialog(false);
    markDirty();
  };
  const confirmDeletePlan = () => {
    setPlans((prev) => prev.filter((p) => p.id !== planDeleteId));
    setPlanDeleteId(null);
    markDirty();
  };

  // ---- Service channels ----
  const [channels, setChannels] = useState<Spa2CorporateServiceChannel[]>(() =>
    spa2CorporateServiceChannels.map((c) => ({ ...c, items: [...c.items] }))
  );
  const [channelTab, setChannelTab] = useState(0);

  const updateChannelItem = (channelIdx: number, itemIdx: number, value: string) => {
    setChannels((prev) =>
      prev.map((c, ci) =>
        ci === channelIdx
          ? { ...c, items: c.items.map((it, ii) => (ii === itemIdx ? value : it)) }
          : c
      )
    );
    markDirty();
  };
  const addChannelItem = (channelIdx: number) => {
    setChannels((prev) =>
      prev.map((c, ci) => (ci === channelIdx ? { ...c, items: [...c.items, ''] } : c))
    );
    markDirty();
  };
  const removeChannelItem = (channelIdx: number, itemIdx: number) => {
    setChannels((prev) =>
      prev.map((c, ci) =>
        ci === channelIdx ? { ...c, items: c.items.filter((_, ii) => ii !== itemIdx) } : c
      )
    );
    markDirty();
  };
  const updateChannelLabel = (channelIdx: number, value: string) => {
    setChannels((prev) => prev.map((c, ci) => (ci === channelIdx ? { ...c, label: value } : c)));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2CorporateBanner, image: { ...spa2CorporateBanner.image } });
    setBenefits(spa2CorporateBenefits.map((b) => ({ ...b })));
    setPlans(spa2CorporatePlans.map((p) => ({ ...p, perks: [...p.perks] })));
    setChannels(spa2CorporateServiceChannels.map((c) => ({ ...c, items: [...c.items] })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('corporate.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.corporate')}
      publicPath={paths.spa2.corporate}
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
          label={t('corporate.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="benefits"
          label={t('corporate.benefits_section')}
          icon={<Iconify icon="solar:medal-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="plans"
          label={t('corporate.plans_section')}
          icon={<Iconify icon="solar:bill-list-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="services"
          label={t('corporate.channels_section')}
          icon={<Iconify icon="solar:widget-5-bold-duotone" width={20} />}
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
              title={t('corporate.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('corporate.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('corporate.banner_image_help')}
                />
                <TextField
                  label={t('corporate.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('corporate.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('corporate.banner_subtitle')}
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

      {/* Benefits */}
      {tab === 'benefits' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('corporate.benefits_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateBenefit}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('corporate.add_benefit_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {benefits.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <BenefitPreviewCard icon={item.icon} title={item.title} desc={item.desc} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditBenefit(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setBenefitDeleteId(item.id)}
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

      {/* Plans */}
      {tab === 'plans' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('corporate.plans_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreatePlan}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('corporate.add_plan_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {plans.map((item) => (
              <Grid key={item.id} xs={12} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <PlanPreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditPlan(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setPlanDeleteId(item.id)}
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

      {/* Service channels */}
      {tab === 'services' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            {t('corporate.channels_section')}
          </Typography>
          <Tabs
            value={channelTab}
            onChange={(_, v) => setChannelTab(v)}
            sx={{ mb: 2, '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL } }}
          >
            {channels.map((c) => (
              <Tab key={c.id} label={c.label} sx={{ textTransform: 'none' }} />
            ))}
          </Tabs>
          {channels[channelTab] && (
            <Stack spacing={2}>
              <TextField
                label={t('corporate.form_channel_label')}
                size="small"
                value={channels[channelTab].label}
                onChange={(e) => updateChannelLabel(channelTab, e.target.value)}
                sx={{ maxWidth: 320 }}
              />
              <Stack spacing={1.5}>
                {channels[channelTab].items.map((item, itemIdx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Stack key={itemIdx} direction="row" spacing={1} alignItems="center">
                    <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                    <TextField
                      size="small"
                      fullWidth
                      value={item}
                      onChange={(e) => updateChannelItem(channelTab, itemIdx, e.target.value)}
                    />
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeChannelItem(channelTab, itemIdx)}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
              <Button
                size="small"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => addChannelItem(channelTab)}
                sx={{ alignSelf: 'flex-start' }}
              >
                {t('corporate.add_channel_item_btn')}
              </Button>
            </Stack>
          )}
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2CorporatePageView
            banner={banner}
            benefits={benefits}
            plans={plans}
            serviceChannels={channels}
          />
        </Box>
      )}

      {/* Benefit add/edit dialog */}
      <Dialog open={benefitDialog} onClose={() => setBenefitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {benefitEditId ? t('common.edit') : t('corporate.add_benefit_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('corporate.form_icon')}
                  fullWidth
                  size="small"
                  value={benefitForm.icon}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:health-bold-duotone"
                />
                <TextField
                  label={t('corporate.form_benefit_title')}
                  fullWidth
                  size="small"
                  value={benefitForm.title}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('corporate.form_benefit_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={benefitForm.desc}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <BenefitPreviewCard
                  icon={benefitForm.icon}
                  title={benefitForm.title}
                  desc={benefitForm.desc}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBenefitDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitBenefit}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {benefitEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!benefitDeleteId}
        onClose={() => setBenefitDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteBenefit}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Plan add/edit dialog */}
      <Dialog open={planDialog} onClose={() => setPlanDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{planEditId ? t('common.edit') : t('corporate.add_plan_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('corporate.form_plan_name')}
                  fullWidth
                  size="small"
                  value={planForm.name}
                  onChange={(e) => setPlanForm((p) => ({ ...p, name: e.target.value }))}
                />
                <TextField
                  label={t('corporate.form_plan_members')}
                  fullWidth
                  size="small"
                  value={planForm.members}
                  onChange={(e) => setPlanForm((p) => ({ ...p, members: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('corporate.form_plan_price')}
                    type="number"
                    size="small"
                    value={planForm.price}
                    onChange={(e) => setPlanForm((p) => ({ ...p, price: Number(e.target.value) }))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('corporate.form_plan_period')}
                    size="small"
                    value={planForm.period}
                    onChange={(e) => setPlanForm((p) => ({ ...p, period: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <FormControlLabel
                  control={
                    <Switch
                      checked={planForm.hot}
                      onChange={(e) => setPlanForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('corporate.form_plan_hot')}
                />
                <TextField
                  label={t('corporate.form_plan_perks')}
                  fullWidth
                  multiline
                  minRows={4}
                  value={planForm.perks}
                  onChange={(e) => setPlanForm((p) => ({ ...p, perks: e.target.value }))}
                  helperText={t('corporate.form_plan_perks_help')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <PlanPreviewCard
                  name={planForm.name}
                  members={planForm.members}
                  price={planForm.price}
                  period={planForm.period}
                  hot={planForm.hot}
                  perks={planPerksPreview}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPlanDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPlan}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {planEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!planDeleteId}
        onClose={() => setPlanDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePlan}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
