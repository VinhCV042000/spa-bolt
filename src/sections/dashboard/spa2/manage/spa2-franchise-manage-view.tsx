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
  spa2FranchiseSteps,
  spa2FranchiseStats,
  spa2FranchiseModels,
  spa2FranchiseBanner,
  spa2FranchiseBenefits,
  type Spa2FranchiseStep,
  type Spa2FranchiseStat,
  type Spa2FranchiseModel,
  type Spa2FranchiseBanner,
  type Spa2FranchiseBenefit,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2FranchisePageView } from 'src/sections/spa2/view/spa2-content-pages8';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages8.tsx's
// Spa2FranchisePageView renders on the public /spa2/franchise page: the cream
// PageHero banner (eyebrow/title/subtitle), the teal stat-strip, the "Lợi thế"
// benefits grid, the "Mô hình" investment-model pricing cards (color dot,
// area/roomCount chips, investment price, perks checklist, "PHỔ BIẾN NHẤT"
// badge for the hot model) and the "Quy trình" numbered steps - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The application-form/model-details
// dialog interactive demo state on the public page is purely client-derived
// and is intentionally not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STAT: Omit<Spa2FranchiseStat, 'id'> = { n: '', l: '' };

const EMPTY_BENEFIT: Omit<Spa2FranchiseBenefit, 'id'> = {
  icon: 'solar:medal-star-bold-duotone',
  title: '',
  desc: '',
};

const EMPTY_MODEL: Omit<Spa2FranchiseModel, 'id'> = {
  name: '',
  area: '',
  investment: '',
  color: SPA2_TEAL,
  hot: false,
  roomCount: '',
  perks: [],
};

const EMPTY_STEP: Omit<Spa2FranchiseStep, 'id'> = { title: '', desc: '' };

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

// Mirrors the cream PageHero hero section rendered by Spa2FranchisePageView on
// the public page - eyebrow/title/subtitle over the standard cream/teal brand
// palette (kept lightweight/static, the public hero image is fixed and not
// part of the manageable banner).
function BannerPreview({ banner }: { banner: Spa2FranchiseBanner }) {
  return (
    <Box sx={{ bgcolor: SPA2_CREAM, py: { xs: 6, md: 8 }, textAlign: 'center', px: 3 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600, maxWidth: 480 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Simplified white-card equivalent of the public teal stat-strip (big number
// + label), used for the admin grid so multiple cards stay readable side by
// side.
function StatPreviewCard({ stat }: { stat: Omit<Spa2FranchiseStat, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, color: SPA2_TEAL }}>
        {stat.n || '—'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
        {stat.l || '(Chưa đặt nhãn)'}
      </Typography>
    </Card>
  );
}

// Mirrors one "Lợi thế" benefit card exactly as rendered in the public
// benefits grid: icon on top, title, desc, centered on a soft card.
function BenefitPreviewCard({ benefit }: { benefit: Omit<Spa2FranchiseBenefit, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Iconify
        icon={benefit.icon || 'solar:medal-star-bold-duotone'}
        width={44}
        sx={{ color: SPA2_TEAL, mb: 1.5 }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {benefit.title || '(Chưa đặt tiêu đề)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {benefit.desc}
      </Typography>
    </Card>
  );
}

// Mirrors one investment-model pricing card exactly as rendered in the
// public "Mô hình" grid: colored dot + name, area/roomCount chips, investment
// price in model.color, perks checklist, "PHỔ BIẾN NHẤT" badge + highlighted
// border for the hot model.
function ModelPreviewCard({ model }: { model: Omit<Spa2FranchiseModel, 'id'> }) {
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 4,
        overflow: 'hidden',
        border: model.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: model.hot ? '0 16px 40px rgba(46,139,122,0.18)' : 'none',
      }}
    >
      {model.hot && (
        <Box
          sx={{
            bgcolor: SPA2_TEAL,
            color: 'white',
            textAlign: 'center',
            py: 0.75,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          PHỔ BIẾN NHẤT
        </Box>
      )}
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: model.color }} />
          <Typography variant="h6" sx={{ color: SPA2_INK }}>
            {model.name || '(Chưa đặt tên)'}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={model.area || '—'}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary' }}
          />
          <Chip
            label={model.roomCount || '—'}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary' }}
          />
        </Stack>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 0.25 }}>
          Vốn đầu tư dự kiến
        </Typography>
        <Typography sx={{ fontWeight: 700, color: model.color, fontSize: 20, mb: 2 }}>
          {model.investment || '—'} đ
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.25}>
          {model.perks.map((p, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Stack key={idx} direction="row" spacing={1.5} alignItems="flex-start">
              <Iconify
                icon="solar:check-circle-bold"
                width={16}
                sx={{ color: SPA2_TEAL, flexShrink: 0, mt: '3px' }}
              />
              <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                {p}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

// Mirrors one numbered "Quy trình" step exactly as rendered in the public
// process stepper (circle number + title + desc); the connecting vertical
// line is omitted here since the admin list renders steps as independent
// cards rather than a single vertical stack.
function StepPreviewCard({ step, index }: { step: Omit<Spa2FranchiseStep, 'id'>; index: number }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
            {step.title || '(Chưa đặt tiêu đề)'}
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
            {step.desc}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows), matching the water
// therapy manage view's MiniListField convention - used here for the
// investment model's perks checklist.
function MiniListField({
  label,
  addLabel,
  items,
  onChangeItem,
  onAddItem,
  onRemoveItem,
}: {
  label: string;
  addLabel: string;
  items: string[];
  onChangeItem: (idx: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (idx: number) => void;
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        {label}
      </Typography>
      <Stack spacing={1}>
        {items.map((value, idx) => (
          <Stack
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TextField
              fullWidth
              size="small"
              value={value}
              onChange={(e) => onChangeItem(idx, e.target.value)}
            />
            <IconButton size="small" color="error" onClick={() => onRemoveItem(idx)}>
              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            </IconButton>
          </Stack>
        ))}
        <Button
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onAddItem}
          sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
        >
          {addLabel}
        </Button>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa2FranchiseManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2FranchiseBanner>(() => ({ ...spa2FranchiseBanner }));
  const [stats, setStats] = useState<Spa2FranchiseStat[]>(() =>
    spa2FranchiseStats.map((item) => ({ ...item }))
  );
  const [benefits, setBenefits] = useState<Spa2FranchiseBenefit[]>(() =>
    spa2FranchiseBenefits.map((item) => ({ ...item }))
  );
  const [models, setModels] = useState<Spa2FranchiseModel[]>(() =>
    spa2FranchiseModels.map((item) => ({ ...item, perks: [...item.perks] }))
  );
  const [steps, setSteps] = useState<Spa2FranchiseStep[]>(() =>
    spa2FranchiseSteps.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'stats' | 'benefits' | 'models' | 'steps' | 'preview'>(
    'banner'
  );
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Stats CRUD ----
  const [statDialog, setStatDialog] = useState(false);
  const [statEditId, setStatEditId] = useState<string | null>(null);
  const [statForm, setStatForm] = useState<Omit<Spa2FranchiseStat, 'id'>>(EMPTY_STAT);
  const [statDeleteId, setStatDeleteId] = useState<string | null>(null);

  const openCreateStat = () => {
    setStatForm(EMPTY_STAT);
    setStatEditId(null);
    setStatDialog(true);
  };
  const openEditStat = (item: Spa2FranchiseStat) => {
    const { id, ...rest } = item;
    setStatForm({ ...rest });
    setStatEditId(id);
    setStatDialog(true);
  };
  const submitStat = () => {
    const next: Omit<Spa2FranchiseStat, 'id'> = { ...statForm };
    if (statEditId) {
      setStats((prev) =>
        prev.map((item) => (item.id === statEditId ? { ...item, ...next } : item))
      );
    } else {
      setStats((prev) => [...prev, withId(next)]);
    }
    setStatDialog(false);
    markDirty();
  };
  const confirmDeleteStat = () => {
    setStats((prev) => prev.filter((item) => item.id !== statDeleteId));
    setStatDeleteId(null);
    markDirty();
  };
  const reorderStats = (next: Spa2FranchiseStat[]) => {
    setStats(next);
    markDirty();
  };

  // ---- Benefits CRUD ----
  const [benefitDialog, setBenefitDialog] = useState(false);
  const [benefitEditId, setBenefitEditId] = useState<string | null>(null);
  const [benefitForm, setBenefitForm] = useState<Omit<Spa2FranchiseBenefit, 'id'>>(EMPTY_BENEFIT);
  const [benefitDeleteId, setBenefitDeleteId] = useState<string | null>(null);

  const openCreateBenefit = () => {
    setBenefitForm(EMPTY_BENEFIT);
    setBenefitEditId(null);
    setBenefitDialog(true);
  };
  const openEditBenefit = (item: Spa2FranchiseBenefit) => {
    const { id, ...rest } = item;
    setBenefitForm({ ...rest });
    setBenefitEditId(id);
    setBenefitDialog(true);
  };
  const submitBenefit = () => {
    const next: Omit<Spa2FranchiseBenefit, 'id'> = { ...benefitForm };
    if (benefitEditId) {
      setBenefits((prev) =>
        prev.map((item) => (item.id === benefitEditId ? { ...item, ...next } : item))
      );
    } else {
      setBenefits((prev) => [...prev, withId(next)]);
    }
    setBenefitDialog(false);
    markDirty();
  };
  const confirmDeleteBenefit = () => {
    setBenefits((prev) => prev.filter((item) => item.id !== benefitDeleteId));
    setBenefitDeleteId(null);
    markDirty();
  };
  const reorderBenefits = (next: Spa2FranchiseBenefit[]) => {
    setBenefits(next);
    markDirty();
  };

  // ---- Models CRUD ----
  const [modelDialog, setModelDialog] = useState(false);
  const [modelEditId, setModelEditId] = useState<string | null>(null);
  const [modelForm, setModelForm] = useState<Omit<Spa2FranchiseModel, 'id'>>(EMPTY_MODEL);
  const [modelDeleteId, setModelDeleteId] = useState<string | null>(null);

  const openCreateModel = () => {
    setModelForm(EMPTY_MODEL);
    setModelEditId(null);
    setModelDialog(true);
  };
  const openEditModel = (item: Spa2FranchiseModel) => {
    const { id, ...rest } = item;
    setModelForm({ ...rest, perks: [...rest.perks] });
    setModelEditId(id);
    setModelDialog(true);
  };
  const submitModel = () => {
    const next: Omit<Spa2FranchiseModel, 'id'> = {
      ...modelForm,
      perks: modelForm.perks.map((p) => p.trim()).filter(Boolean),
    };
    if (modelEditId) {
      setModels((prev) =>
        prev.map((item) => (item.id === modelEditId ? { ...item, ...next } : item))
      );
    } else {
      setModels((prev) => [...prev, withId(next)]);
    }
    setModelDialog(false);
    markDirty();
  };
  const confirmDeleteModel = () => {
    setModels((prev) => prev.filter((item) => item.id !== modelDeleteId));
    setModelDeleteId(null);
    markDirty();
  };
  const reorderModels = (next: Spa2FranchiseModel[]) => {
    setModels(next);
    markDirty();
  };

  const updatePerk = (idx: number, value: string) => {
    setModelForm((p) => ({ ...p, perks: p.perks.map((perk, i) => (i === idx ? value : perk)) }));
  };
  const addPerk = () => setModelForm((p) => ({ ...p, perks: [...p.perks, ''] }));
  const removePerk = (idx: number) =>
    setModelForm((p) => ({ ...p, perks: p.perks.filter((_, i) => i !== idx) }));

  // ---- Steps CRUD ----
  const [stepDialog, setStepDialog] = useState(false);
  const [stepEditId, setStepEditId] = useState<string | null>(null);
  const [stepForm, setStepForm] = useState<Omit<Spa2FranchiseStep, 'id'>>(EMPTY_STEP);
  const [stepDeleteId, setStepDeleteId] = useState<string | null>(null);

  const openCreateStep = () => {
    setStepForm(EMPTY_STEP);
    setStepEditId(null);
    setStepDialog(true);
  };
  const openEditStep = (item: Spa2FranchiseStep) => {
    const { id, ...rest } = item;
    setStepForm({ ...rest });
    setStepEditId(id);
    setStepDialog(true);
  };
  const submitStep = () => {
    const next: Omit<Spa2FranchiseStep, 'id'> = { ...stepForm };
    if (stepEditId) {
      setSteps((prev) =>
        prev.map((item) => (item.id === stepEditId ? { ...item, ...next } : item))
      );
    } else {
      setSteps((prev) => [...prev, withId(next)]);
    }
    setStepDialog(false);
    markDirty();
  };
  const confirmDeleteStep = () => {
    setSteps((prev) => prev.filter((item) => item.id !== stepDeleteId));
    setStepDeleteId(null);
    markDirty();
  };
  const reorderSteps = (next: Spa2FranchiseStep[]) => {
    setSteps(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2FranchiseBanner });
    setStats(spa2FranchiseStats.map((item) => ({ ...item })));
    setBenefits(spa2FranchiseBenefits.map((item) => ({ ...item })));
    setModels(spa2FranchiseModels.map((item) => ({ ...item, perks: [...item.perks] })));
    setSteps(spa2FranchiseSteps.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('franchise.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.franchise')}
      publicPath={paths.spa2.franchise}
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
          label={t('franchise.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stats"
          label={t('franchise.stats_section')}
          icon={<Iconify icon="solar:chart-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="benefits"
          label={t('franchise.benefits_section')}
          icon={<Iconify icon="solar:medal-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="models"
          label={t('franchise.models_section')}
          icon={<Iconify icon="solar:buildings-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="steps"
          label={t('franchise.steps_section')}
          icon={<Iconify icon="solar:route-bold-duotone" width={20} />}
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
              title={t('franchise.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('franchise.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('franchise.banner_subtitle')}
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

      {/* Stats */}
      {tab === 'stats' && (
        <SectionCard
          title={t('franchise.stats_section')}
          icon="solar:chart-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateStat}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_stat_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {stats.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_stats')}
            </Typography>
          )}
          <Spa2SortableGrid items={stats} onReorder={reorderStats}>
            <Grid container spacing={2}>
              {stats.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <StatPreviewCard stat={item} />
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
                            onClick={() => openEditStat(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setStatDeleteId(item.id)}
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

      {/* Benefits */}
      {tab === 'benefits' && (
        <SectionCard
          title={t('franchise.benefits_section')}
          icon="solar:medal-star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateBenefit}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_benefit_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {benefits.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_benefits')}
            </Typography>
          )}
          <Spa2SortableGrid items={benefits} onReorder={reorderBenefits}>
            <Grid container spacing={2}>
              {benefits.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <BenefitPreviewCard benefit={item} />
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
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Models */}
      {tab === 'models' && (
        <SectionCard
          title={t('franchise.models_section')}
          icon="solar:buildings-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateModel}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_model_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {models.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_models')}
            </Typography>
          )}
          <Spa2SortableGrid items={models} onReorder={reorderModels}>
            <Grid container spacing={2}>
              {models.map((item) => (
                <Grid key={item.id} xs={12} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ModelPreviewCard model={item} />
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
                            onClick={() => openEditModel(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setModelDeleteId(item.id)}
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

      {/* Steps */}
      {tab === 'steps' && (
        <SectionCard
          title={t('franchise.steps_section')}
          icon="solar:route-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateStep}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_step_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {steps.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_steps')}
            </Typography>
          )}
          <Spa2SortableGrid items={steps} onReorder={reorderSteps}>
            <Grid container spacing={2}>
              {steps.map((item, idx) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <StepPreviewCard step={item} index={idx} />
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
                            onClick={() => openEditStep(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setStepDeleteId(item.id)}
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

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2FranchisePageView
            banner={banner}
            stats={stats}
            benefits={benefits}
            models={models}
            steps={steps}
          />
        </Box>
      )}

      {/* Stat add/edit dialog */}
      <Dialog open={statDialog} onClose={() => setStatDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {statEditId ? t('common.edit') : t('franchise.add_stat_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_stat_number')}
                  value={statForm.n}
                  onChange={(e) => setStatForm((p) => ({ ...p, n: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('franchise.form_stat_label')}
                  value={statForm.l}
                  onChange={(e) => setStatForm((p) => ({ ...p, l: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <StatPreviewCard stat={statForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStat}
            disabled={!statForm.n || !statForm.l}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {statEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!statDeleteId}
        onClose={() => setStatDeleteId(null)}
        title={t('franchise.stat_delete_title')}
        content={t('franchise.stat_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStat}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Benefit add/edit dialog */}
      <Dialog open={benefitDialog} onClose={() => setBenefitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {benefitEditId ? t('common.edit') : t('franchise.add_benefit_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_benefit_icon')}
                  value={benefitForm.icon}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:medal-star-bold-duotone"
                />
                <TextField
                  label={t('franchise.form_benefit_title')}
                  value={benefitForm.title}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('franchise.form_benefit_desc')}
                  value={benefitForm.desc}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, desc: e.target.value }))}
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
                <BenefitPreviewCard benefit={benefitForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBenefitDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitBenefit}
            disabled={!benefitForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {benefitEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!benefitDeleteId}
        onClose={() => setBenefitDeleteId(null)}
        title={t('franchise.benefit_delete_title')}
        content={t('franchise.benefit_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteBenefit}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Model add/edit dialog */}
      <Dialog open={modelDialog} onClose={() => setModelDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {modelEditId ? t('common.edit') : t('franchise.add_model_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_model_name')}
                  value={modelForm.name}
                  onChange={(e) => setModelForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('franchise.form_model_area')}
                    value={modelForm.area}
                    onChange={(e) => setModelForm((p) => ({ ...p, area: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('franchise.form_model_room_count')}
                    value={modelForm.roomCount}
                    onChange={(e) => setModelForm((p) => ({ ...p, roomCount: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('franchise.form_model_investment')}
                  value={modelForm.investment}
                  onChange={(e) => setModelForm((p) => ({ ...p, investment: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    label={t('franchise.form_model_color')}
                    value={modelForm.color}
                    onChange={(e) => setModelForm((p) => ({ ...p, color: e.target.value }))}
                    fullWidth
                  />
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      flexShrink: 0,
                      bgcolor: modelForm.color,
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                    }}
                  />
                </Stack>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!modelForm.hot}
                      onChange={(e) => setModelForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('franchise.form_model_hot')}
                />
                <MiniListField
                  label={t('franchise.form_model_perks')}
                  addLabel={t('franchise.add_perk_btn')}
                  items={modelForm.perks}
                  onChangeItem={updatePerk}
                  onAddItem={addPerk}
                  onRemoveItem={removePerk}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ModelPreviewCard model={modelForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModelDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitModel}
            disabled={!modelForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {modelEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!modelDeleteId}
        onClose={() => setModelDeleteId(null)}
        title={t('franchise.model_delete_title')}
        content={t('franchise.model_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteModel}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Step add/edit dialog */}
      <Dialog open={stepDialog} onClose={() => setStepDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {stepEditId ? t('common.edit') : t('franchise.add_step_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_step_title')}
                  value={stepForm.title}
                  onChange={(e) => setStepForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('franchise.form_step_desc')}
                  value={stepForm.desc}
                  onChange={(e) => setStepForm((p) => ({ ...p, desc: e.target.value }))}
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
                <StepPreviewCard
                  step={stepForm}
                  index={stepEditId ? steps.findIndex((s) => s.id === stepEditId) : steps.length}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStepDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStep}
            disabled={!stepForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {stepEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!stepDeleteId}
        onClose={() => setStepDeleteId(null)}
        title={t('franchise.step_delete_title')}
        content={t('franchise.step_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStep}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
