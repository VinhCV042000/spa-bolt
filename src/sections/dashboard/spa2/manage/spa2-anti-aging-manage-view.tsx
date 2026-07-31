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
import {
  spa2AgingConcerns,
  spa2AntiAgingBanner,
  spa2AntiAgingStages,
  type Spa2AgingConcern,
  type Spa2AntiAgingStage,
  type Spa2AntiAgingBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2AntiAgingPageView } from 'src/sections/spa2/view/spa2-content-pages6';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages6.tsx's
// Spa2AntiAgingPageView renders on the public /spa2/anti-aging page: the dark
// SPA2_INK hero banner (eyebrow/title/subtitle - the faint background image
// is fixed/not manageable), the age-stage roadmap (age/title/color/icon/desc
// + services checklist, reorderable) and the aging-concerns grid
// (concern/icon-emoji + treatment chips, reorderable) - read from and written
// back in the same shape as src/_mock/_spa2, the single source of truth
// shared with the public view. The public page's `activeAge` chip-selector
// state is purely client-derived interactive UI and is intentionally not
// duplicated here; the manage view just edits the plain `stages` /
// `concerns` arrays that view renders from.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STAGE: Omit<Spa2AntiAgingStage, 'id'> = {
  age: '',
  title: '',
  color: SPA2_TEAL,
  icon: 'solar:shield-bold-duotone',
  desc: '',
  services: [],
};

const EMPTY_CONCERN: Omit<Spa2AgingConcern, 'id'> = {
  concern: '',
  icon: '✨',
  treatments: [],
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

// Small in-dialog CRUD list (add/edit/remove rows) used for stage `services`
// and concern `treatments`, matching the therapist-profile manage view's
// TherapistMiniListField convention.
function AntiAgingMiniListField({
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

// Mirrors the dark SPA2_INK hero section of the public Anti-Aging page
// (eyebrow/title/subtitle only - the faint background image is fixed and
// not surfaced as an editable field here).
function AntiAgingHeroPreview({ banner }: { banner: Spa2AntiAgingBanner }) {
  return (
    <Box
      sx={{
        bgcolor: SPA2_INK,
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: 'common.white', fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, maxWidth: 460 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors the left-column stage-detail card of the public age-stage
// selector (icon in a colored box, age chip, title, desc, services
// checklist) - see Spa2AntiAgingPageView, ~line 1183+.
function StagePreviewCard({ stage }: { stage: Omit<Spa2AntiAgingStage, 'id'> }) {
  const color = stage.color || SPA2_TEAL;
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
        border: `2px solid ${color}30`,
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2.5,
          bgcolor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Iconify
          icon={stage.icon || 'solar:shield-bold-duotone'}
          width={28}
          sx={{ color: 'common.white' }}
        />
      </Box>
      <Chip
        label={stage.age || '—'}
        sx={{ bgcolor: color, color: 'common.white', fontWeight: 700, mb: 1.5 }}
      />
      <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 1 }}>
        {stage.title || '(Chưa đặt tên giai đoạn)'}
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 13, lineHeight: 1.7, mb: 2 }}>
        {stage.desc}
      </Typography>
      <Stack spacing={0.75}>
        {stage.services.map((s) => (
          <Stack key={s} direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:check-circle-bold" width={14} sx={{ color, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 13, color: SPA2_INK }}>{s}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

// Mirrors one concern card of the public "Chúng tôi giải quyết được gì?"
// grid (emoji + concern name + small treatment chips) - see
// Spa2AntiAgingPageView, ~line 1247+.
function ConcernPreviewCard({ concern }: { concern: Omit<Spa2AgingConcern, 'id'> }) {
  return (
    <Card sx={{ p: 2, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Typography sx={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>
          {concern.icon || '✨'}
        </Typography>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
            {concern.concern || '(Chưa đặt tên vấn đề)'}
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ gap: 0.5 }}>
            {concern.treatments.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  bgcolor: 'background.neutral',
                  color: 'text.secondary',
                  fontSize: 10,
                  height: 18,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2AntiAgingManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2AntiAgingBanner>(() => ({ ...spa2AntiAgingBanner }));
  const [stages, setStages] = useState<Spa2AntiAgingStage[]>(() =>
    spa2AntiAgingStages.map((s) => ({ ...s, services: [...s.services] }))
  );
  const [concerns, setConcerns] = useState<Spa2AgingConcern[]>(() =>
    spa2AgingConcerns.map((c) => ({ ...c, treatments: [...c.treatments] }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'stages' | 'concerns' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Stages CRUD ----
  const [stageDialog, setStageDialog] = useState(false);
  const [stageEditId, setStageEditId] = useState<string | null>(null);
  const [stageForm, setStageForm] = useState<Omit<Spa2AntiAgingStage, 'id'>>(EMPTY_STAGE);
  const [stageDeleteId, setStageDeleteId] = useState<string | null>(null);

  const openCreateStage = () => {
    setStageForm(EMPTY_STAGE);
    setStageEditId(null);
    setStageDialog(true);
  };
  const openEditStage = (item: Spa2AntiAgingStage) => {
    const { id, ...rest } = item;
    setStageForm({ ...rest, services: [...rest.services] });
    setStageEditId(id);
    setStageDialog(true);
  };
  const submitStage = () => {
    const next: Omit<Spa2AntiAgingStage, 'id'> = {
      ...stageForm,
      services: stageForm.services.map((s) => s.trim()).filter(Boolean),
    };
    if (stageEditId) {
      setStages((prev) => prev.map((s) => (s.id === stageEditId ? { ...s, ...next } : s)));
    } else {
      setStages((prev) => [...prev, withId(next)]);
    }
    setStageDialog(false);
    markDirty();
  };
  const confirmDeleteStage = () => {
    setStages((prev) => prev.filter((s) => s.id !== stageDeleteId));
    setStageDeleteId(null);
    markDirty();
  };
  const reorderStages = (next: Spa2AntiAgingStage[]) => {
    setStages(next);
    markDirty();
  };

  const updateStageService = (idx: number, value: string) => {
    setStageForm((p) => ({
      ...p,
      services: p.services.map((s, i) => (i === idx ? value : s)),
    }));
  };
  const addStageService = () => setStageForm((p) => ({ ...p, services: [...p.services, ''] }));
  const removeStageService = (idx: number) =>
    setStageForm((p) => ({ ...p, services: p.services.filter((_, i) => i !== idx) }));

  // ---- Concerns CRUD ----
  const [concernDialog, setConcernDialog] = useState(false);
  const [concernEditId, setConcernEditId] = useState<string | null>(null);
  const [concernForm, setConcernForm] = useState<Omit<Spa2AgingConcern, 'id'>>(EMPTY_CONCERN);
  const [concernDeleteId, setConcernDeleteId] = useState<string | null>(null);

  const openCreateConcern = () => {
    setConcernForm(EMPTY_CONCERN);
    setConcernEditId(null);
    setConcernDialog(true);
  };
  const openEditConcern = (item: Spa2AgingConcern) => {
    const { id, ...rest } = item;
    setConcernForm({ ...rest, treatments: [...rest.treatments] });
    setConcernEditId(id);
    setConcernDialog(true);
  };
  const submitConcern = () => {
    const next: Omit<Spa2AgingConcern, 'id'> = {
      ...concernForm,
      treatments: concernForm.treatments.map((d) => d.trim()).filter(Boolean),
    };
    if (concernEditId) {
      setConcerns((prev) => prev.map((c) => (c.id === concernEditId ? { ...c, ...next } : c)));
    } else {
      setConcerns((prev) => [...prev, withId(next)]);
    }
    setConcernDialog(false);
    markDirty();
  };
  const confirmDeleteConcern = () => {
    setConcerns((prev) => prev.filter((c) => c.id !== concernDeleteId));
    setConcernDeleteId(null);
    markDirty();
  };
  const reorderConcerns = (next: Spa2AgingConcern[]) => {
    setConcerns(next);
    markDirty();
  };

  const updateConcernTreatment = (idx: number, value: string) => {
    setConcernForm((p) => ({
      ...p,
      treatments: p.treatments.map((d, i) => (i === idx ? value : d)),
    }));
  };
  const addConcernTreatment = () =>
    setConcernForm((p) => ({ ...p, treatments: [...p.treatments, ''] }));
  const removeConcernTreatment = (idx: number) =>
    setConcernForm((p) => ({ ...p, treatments: p.treatments.filter((_, i) => i !== idx) }));

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2AntiAgingBanner });
    setStages(spa2AntiAgingStages.map((s) => ({ ...s, services: [...s.services] })));
    setConcerns(spa2AgingConcerns.map((c) => ({ ...c, treatments: [...c.treatments] })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('anti_aging.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.anti_aging')}
      publicPath={paths.spa2.antiAging}
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
          label={t('anti_aging.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stages"
          label={t('anti_aging.stages_section')}
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="concerns"
          label={t('anti_aging.concerns_section')}
          icon={<Iconify icon="solar:magnifer-bug-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - dark SPA2_INK hero, no image field */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('anti_aging.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('anti_aging.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('anti_aging.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('anti_aging.banner_subtitle')}
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
                <AntiAgingHeroPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Age-stage roadmap */}
      {tab === 'stages' && (
        <SectionCard
          title={t('anti_aging.stages_section')}
          icon="solar:routing-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateStage}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('anti_aging.add_stage_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('anti_aging.drag_hint')}
          </Typography>
          {stages.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('anti_aging.no_stages')}
            </Typography>
          )}
          <Spa2SortableGrid items={stages} onReorder={reorderStages}>
            <Grid container spacing={2}>
              {stages.map((s) => (
                <Grid key={s.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={s.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <StagePreviewCard stage={s} />
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
                            onClick={() => openEditStage(s)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setStageDeleteId(s.id)}
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

      {/* Aging concerns */}
      {tab === 'concerns' && (
        <SectionCard
          title={t('anti_aging.concerns_section')}
          icon="solar:magnifer-bug-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateConcern}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('anti_aging.add_concern_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('anti_aging.drag_hint')}
          </Typography>
          {concerns.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('anti_aging.no_concerns')}
            </Typography>
          )}
          <Spa2SortableGrid items={concerns} onReorder={reorderConcerns}>
            <Grid container spacing={2}>
              {concerns.map((c) => (
                <Grid key={c.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={c.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ConcernPreviewCard concern={c} />
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
                            onClick={() => openEditConcern(c)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setConcernDeleteId(c.id)}
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
          <Spa2AntiAgingPageView banner={banner} stages={stages} concerns={concerns} />
        </Box>
      )}

      {/* Stage add/edit dialog */}
      <Dialog open={stageDialog} onClose={() => setStageDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {stageEditId ? t('common.edit') : t('anti_aging.add_stage_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('anti_aging.form_stage_age')}
                    value={stageForm.age}
                    onChange={(e) => setStageForm((p) => ({ ...p, age: e.target.value }))}
                    fullWidth
                    helperText="25–35"
                  />
                  <TextField
                    label={t('anti_aging.form_stage_title')}
                    value={stageForm.title}
                    onChange={(e) => setStageForm((p) => ({ ...p, title: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <TextField
                    label={t('anti_aging.form_stage_color')}
                    value={stageForm.color}
                    onChange={(e) => setStageForm((p) => ({ ...p, color: e.target.value }))}
                    fullWidth
                    helperText="#2E8B7A"
                    InputProps={{
                      endAdornment: (
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            flexShrink: 0,
                            bgcolor: stageForm.color || SPA2_TEAL,
                            border: `1px solid ${SPA2_CREAM_DARK}`,
                          }}
                        />
                      ),
                    }}
                  />
                  <TextField
                    label={t('anti_aging.form_stage_icon')}
                    value={stageForm.icon}
                    onChange={(e) => setStageForm((p) => ({ ...p, icon: e.target.value }))}
                    fullWidth
                    helperText="solar:shield-bold-duotone"
                  />
                </Stack>
                <TextField
                  label={t('anti_aging.form_stage_desc')}
                  value={stageForm.desc}
                  onChange={(e) => setStageForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <AntiAgingMiniListField
                  label={t('anti_aging.form_stage_services')}
                  addLabel={t('anti_aging.add_stage_service_btn')}
                  items={stageForm.services}
                  onChangeItem={updateStageService}
                  onAddItem={addStageService}
                  onRemoveItem={removeStageService}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <StagePreviewCard stage={stageForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStageDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStage}
            disabled={!stageForm.age || !stageForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {stageEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!stageDeleteId}
        onClose={() => setStageDeleteId(null)}
        title={t('anti_aging.stage_delete_title')}
        content={t('anti_aging.stage_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStage}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Concern add/edit dialog */}
      <Dialog open={concernDialog} onClose={() => setConcernDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {concernEditId ? t('common.edit') : t('anti_aging.add_concern_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('anti_aging.form_concern_name')}
                    value={concernForm.concern}
                    onChange={(e) => setConcernForm((p) => ({ ...p, concern: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('anti_aging.form_concern_icon')}
                    value={concernForm.icon}
                    onChange={(e) => setConcernForm((p) => ({ ...p, icon: e.target.value }))}
                    sx={{ maxWidth: 160 }}
                    helperText="✨"
                  />
                </Stack>
                <AntiAgingMiniListField
                  label={t('anti_aging.form_concern_treatments')}
                  addLabel={t('anti_aging.add_concern_treatment_btn')}
                  items={concernForm.treatments}
                  onChangeItem={updateConcernTreatment}
                  onAddItem={addConcernTreatment}
                  onRemoveItem={removeConcernTreatment}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ConcernPreviewCard concern={concernForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConcernDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitConcern}
            disabled={!concernForm.concern}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {concernEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!concernDeleteId}
        onClose={() => setConcernDeleteId(null)}
        title={t('anti_aging.concern_delete_title')}
        content={t('anti_aging.concern_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteConcern}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
