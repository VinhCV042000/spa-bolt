import type { Spa2SleepTip, Spa2SleepProgram, Spa2SleepWellnessBanner } from 'src/_mock/_spa2';

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
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import { spa2SleepTips, spa2SleepPrograms, spa2SleepWellnessBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SleepWellnessPageView } from 'src/sections/spa2/view/spa2-content-pages5';
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
// Spa2SleepWellnessPageView renders on the public /spa2/sleep-wellness page:
// the plain dark-indigo gradient banner, the "Ritual đêm" nightly timeline and
// the Sleep Wellness program catalog - read from and written back in the same
// shape as src/_mock/_spa2 / src/sections/spa2/spa2-pages-data, the single
// source of truth shared with the public view. The interactive sleep-score
// calculator on the public page is pure client-side UI (local component
// state) and is intentionally not editable here - the "preview" tab renders
// it live (with its own default local state) as part of the full page.
// -----------------------------------------------------------------------------

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_PROGRAM_FORM: Omit<Spa2SleepProgram, 'id'> = {
  name: '',
  price: 0,
  duration: '',
  icon: 'solar:moon-bold-duotone',
  color: '#3949AB',
  desc: '',
  includes: [],
};

const EMPTY_TIP_FORM: Omit<Spa2SleepTip, 'id'> = {
  time: '',
  emoji: '🌙',
  tip: '',
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

// Mirrors the dark indigo-gradient hero on the public page (banner tab preview).
function BannerPreview({ banner }: { banner: Spa2SleepWellnessBanner }) {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0D0D2B 0%, #1A237E 50%, #283593 100%)',
        py: { xs: 6, md: 8 },
        overflow: 'hidden',
      }}
    >
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontSize: 44, lineHeight: 1 }}>🌙</Typography>
          <Typography variant="overline" sx={{ color: '#9FA8DA', letterSpacing: 3 }}>
            {banner.eyebrow || 'EYEBROW'}
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: 'white', fontWeight: 600, lineHeight: 1.2, maxWidth: 480 }}
          >
            {banner.title || '(Chưa có tiêu đề)'}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, maxWidth: 420 }}>
            {banner.subtitle || '(Chưa có mô tả)'}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

// Mirrors a single program SoftCard in the public catalog grid.
function ProgramPreviewCard({
  name,
  price,
  duration,
  icon,
  color,
  desc,
  includes,
}: Omit<Spa2SleepProgram, 'id'>) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        borderTop: `4px solid ${color || SPA2_TEAL}`,
        boxShadow: 'none',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 3,
          bgcolor: `${color || SPA2_TEAL}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Iconify icon={icon || 'solar:moon-bold-duotone'} width={26} sx={{ color }} />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 16 }}>
        {name || 'Tên chương trình'}
      </Typography>
      <Chip
        label={duration || '—'}
        size="small"
        sx={{ mb: 1.5, bgcolor: '#F5F5F5', color: 'text.secondary' }}
      />
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
        {desc || 'Mô tả chương trình...'}
      </Typography>
      <Stack spacing={0.75} sx={{ mb: 3 }}>
        {includes.map((inc, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Stack key={idx} direction="row" spacing={1.5} alignItems="center">
            <Iconify icon="solar:check-circle-bold" width={15} sx={{ color, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{inc}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 700, color, fontSize: 18 }}>{formatVND(price)}</Typography>
        <Button
          disabled
          sx={{ borderRadius: 99, px: 3, bgcolor: color, color: 'white', opacity: 0.7 }}
        >
          Đặt ngay
        </Button>
      </Stack>
    </Card>
  );
}

// Mirrors the indigo circular time marker + connecting line of the public
// "Ritual đêm" timeline.
function TipTimelineMarker({ time, isLast }: { time: string; isLast: boolean }) {
  return (
    <Stack alignItems="center" sx={{ width: 48, flexShrink: 0 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: '#1A237E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 11, color: 'white', lineHeight: 1 }}>
          {time || '--:--'}
        </Typography>
      </Box>
      {!isLast && <Box sx={{ width: 2, flex: 1, minHeight: 24, bgcolor: '#9FA8DA', my: 0.5 }} />}
    </Stack>
  );
}

// Single-row preview of a tip used inside the add/edit dialog.
function TipPreviewRow({ time, emoji, tip }: Omit<Spa2SleepTip, 'id'>) {
  return (
    <Stack direction="row" spacing={2.5} sx={{ bgcolor: '#E8EAF6', borderRadius: 2, p: 2 }}>
      <TipTimelineMarker time={time} isLast />
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography sx={{ fontSize: 20 }}>{emoji || '🌙'}</Typography>
        <Typography sx={{ fontSize: 14, color: SPA2_INK, lineHeight: 1.6 }}>
          {tip || 'Nội dung gợi ý...'}
        </Typography>
      </Stack>
    </Stack>
  );
}

export function Spa2SleepWellnessManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SleepWellnessBanner>(() => ({
    ...spa2SleepWellnessBanner,
  }));
  const [programs, setPrograms] = useState<Spa2SleepProgram[]>(() =>
    spa2SleepPrograms.map((p) => ({ ...p, includes: [...p.includes] }))
  );
  const [tips, setTips] = useState<Spa2SleepTip[]>(() => spa2SleepTips.map((tp) => ({ ...tp })));

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'programs' | 'tips' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Programs ----
  const [programForm, setProgramForm] = useState<Omit<Spa2SleepProgram, 'id'>>(EMPTY_PROGRAM_FORM);
  const [programDialog, setProgramDialog] = useState(false);
  const [programEditId, setProgramEditId] = useState<string | null>(null);
  const [programDeleteId, setProgramDeleteId] = useState<string | null>(null);

  const openCreateProgram = () => {
    setProgramForm(EMPTY_PROGRAM_FORM);
    setProgramEditId(null);
    setProgramDialog(true);
  };
  const openEditProgram = (item: Spa2SleepProgram) => {
    setProgramForm({
      name: item.name,
      price: item.price,
      duration: item.duration,
      icon: item.icon,
      color: item.color,
      desc: item.desc,
      includes: [...item.includes],
    });
    setProgramEditId(item.id);
    setProgramDialog(true);
  };
  const submitProgram = () => {
    const next = {
      name: programForm.name,
      price: Number(programForm.price),
      duration: programForm.duration,
      icon: programForm.icon,
      color: programForm.color,
      desc: programForm.desc,
      includes: programForm.includes.map((s) => s.trim()).filter(Boolean),
    };
    if (programEditId) {
      setPrograms((prev) => prev.map((p) => (p.id === programEditId ? { ...p, ...next } : p)));
    } else {
      setPrograms((prev) => [...prev, withId(next)]);
    }
    setProgramDialog(false);
    markDirty();
  };
  const confirmDeleteProgram = () => {
    setPrograms((prev) => prev.filter((p) => p.id !== programDeleteId));
    setProgramDeleteId(null);
    markDirty();
  };
  const updateProgramInclude = (idx: number, value: string) => {
    setProgramForm((p) => ({
      ...p,
      includes: p.includes.map((inc, i) => (i === idx ? value : inc)),
    }));
  };
  const addProgramInclude = () => {
    setProgramForm((p) => ({ ...p, includes: [...p.includes, ''] }));
  };
  const removeProgramInclude = (idx: number) => {
    setProgramForm((p) => ({ ...p, includes: p.includes.filter((_, i) => i !== idx) }));
  };
  const reorderPrograms = (next: Spa2SleepProgram[]) => {
    setPrograms(next);
    markDirty();
  };

  // ---- Tips (nightly ritual timeline) ----
  const [tipForm, setTipForm] = useState<Omit<Spa2SleepTip, 'id'>>(EMPTY_TIP_FORM);
  const [tipDialog, setTipDialog] = useState(false);
  const [tipEditId, setTipEditId] = useState<string | null>(null);
  const [tipDeleteId, setTipDeleteId] = useState<string | null>(null);

  const openCreateTip = () => {
    setTipForm(EMPTY_TIP_FORM);
    setTipEditId(null);
    setTipDialog(true);
  };
  const openEditTip = (item: Spa2SleepTip) => {
    setTipForm({ time: item.time, emoji: item.emoji, tip: item.tip });
    setTipEditId(item.id);
    setTipDialog(true);
  };
  const submitTip = () => {
    const next = { ...tipForm };
    if (tipEditId) {
      setTips((prev) => prev.map((tp) => (tp.id === tipEditId ? { ...tp, ...next } : tp)));
    } else {
      setTips((prev) => [...prev, withId(next)]);
    }
    setTipDialog(false);
    markDirty();
  };
  const confirmDeleteTip = () => {
    setTips((prev) => prev.filter((tp) => tp.id !== tipDeleteId));
    setTipDeleteId(null);
    markDirty();
  };
  const reorderTips = (next: Spa2SleepTip[]) => {
    setTips(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SleepWellnessBanner });
    setPrograms(spa2SleepPrograms.map((p) => ({ ...p, includes: [...p.includes] })));
    setTips(spa2SleepTips.map((tp) => ({ ...tp })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('sleep_wellness.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('sleep_wellness.breadcrumb')}
      publicPath={paths.spa2.sleepWellness}
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
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="banner"
          label={t('sleep_wellness.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="programs"
          label={t('sleep_wellness.programs_section')}
          icon={<Iconify icon="solar:moon-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tips"
          label={t('sleep_wellness.tips_section')}
          icon={<Iconify icon="solar:clock-circle-bold-duotone" width={20} />}
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
            <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify
                  icon="solar:gallery-wide-bold-duotone"
                  width={22}
                  sx={{ color: SPA2_TEAL }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {t('sleep_wellness.banner_section')}
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <TextField
                  label={t('sleep_wellness.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('sleep_wellness.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('sleep_wellness.banner_subtitle')}
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
            <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify icon="solar:eye-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {t('common.preview_btn')}
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <PreviewFrame>
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Programs */}
      {tab === 'programs' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('sleep_wellness.programs_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateProgram}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('sleep_wellness.add_program_btn')}
            </Button>
          </Stack>
          {programs.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('sleep_wellness.no_programs')}
            </Typography>
          )}
          <Spa2SortableGrid items={programs} onReorder={reorderPrograms}>
            <Grid container spacing={2}>
              {programs.map((item) => (
                <Grid key={item.id} xs={12} md={6}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ProgramPreviewCard {...item} />
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
                            onClick={() => openEditProgram(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setProgramDeleteId(item.id)}
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
        </Card>
      )}

      {/* Tips (nightly ritual timeline) */}
      {tab === 'tips' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('sleep_wellness.tips_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateTip}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('sleep_wellness.add_tip_btn')}
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('sleep_wellness.drag_hint')}
          </Typography>
          {tips.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('sleep_wellness.no_tips')}
            </Typography>
          )}
          <Spa2SortableGrid items={tips} onReorder={reorderTips}>
            <Stack spacing={0}>
              {tips.map((tp, idx) => (
                <Spa2SortableItem key={tp.id} id={tp.id}>
                  {(sortable) => (
                    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ py: 0.5 }}>
                      <TipTimelineMarker time={tp.time} isLast={idx === tips.length - 1} />
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ flex: 1, pb: idx === tips.length - 1 ? 0 : 3, pt: 1 }}
                      >
                        <Typography sx={{ fontSize: 20 }}>{tp.emoji}</Typography>
                        <Typography
                          sx={{ fontSize: 14, color: SPA2_INK, lineHeight: 1.6, flex: 1 }}
                        >
                          {tp.tip}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} sx={{ pt: 1 }}>
                        <Spa2DragHandle sortable={sortable} />
                        <IconButton size="small" onClick={() => openEditTip(tp)}>
                          <Iconify icon="solar:pen-bold" width={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setTipDeleteId(tp.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  )}
                </Spa2SortableItem>
              ))}
            </Stack>
          </Spa2SortableGrid>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SleepWellnessPageView banner={banner} programs={programs} tips={tips} />
        </Box>
      )}

      {/* Program add/edit dialog */}
      <Dialog open={programDialog} onClose={() => setProgramDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {programEditId ? t('common.edit') : t('sleep_wellness.add_program_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('sleep_wellness.form_program_name')}
                    fullWidth
                    size="small"
                    value={programForm.name}
                    onChange={(e) => setProgramForm((p) => ({ ...p, name: e.target.value }))}
                  />
                  <TextField
                    label={t('sleep_wellness.form_program_price')}
                    type="number"
                    fullWidth
                    size="small"
                    value={programForm.price}
                    onChange={(e) =>
                      setProgramForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('sleep_wellness.form_program_duration')}
                    fullWidth
                    size="small"
                    value={programForm.duration}
                    onChange={(e) => setProgramForm((p) => ({ ...p, duration: e.target.value }))}
                  />
                  <TextField
                    label={t('sleep_wellness.form_program_icon')}
                    fullWidth
                    size="small"
                    value={programForm.icon}
                    onChange={(e) => setProgramForm((p) => ({ ...p, icon: e.target.value }))}
                    helperText="solar:moon-bold-duotone"
                  />
                  <TextField
                    label={t('sleep_wellness.form_program_color')}
                    fullWidth
                    size="small"
                    value={programForm.color}
                    onChange={(e) => setProgramForm((p) => ({ ...p, color: e.target.value }))}
                    helperText="#3949AB"
                  />
                </Stack>
                <TextField
                  label={t('sleep_wellness.form_program_desc')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={programForm.desc}
                  onChange={(e) => setProgramForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {t('sleep_wellness.form_program_includes')}
                  </Typography>
                  <Stack spacing={1}>
                    {programForm.includes.map((inc, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          fullWidth
                          value={inc}
                          onChange={(e) => updateProgramInclude(idx, e.target.value)}
                          placeholder={t('sleep_wellness.form_program_include_placeholder')}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeProgramInclude(idx)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addProgramInclude}
                    sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
                  >
                    {t('sleep_wellness.add_program_include_btn')}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ProgramPreviewCard
                  name={programForm.name}
                  price={programForm.price}
                  duration={programForm.duration}
                  icon={programForm.icon}
                  color={programForm.color}
                  desc={programForm.desc}
                  includes={programForm.includes.map((s) => s.trim()).filter(Boolean)}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProgramDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitProgram}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {programEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tip add/edit dialog */}
      <Dialog open={tipDialog} onClose={() => setTipDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{tipEditId ? t('common.edit') : t('sleep_wellness.add_tip_btn')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('sleep_wellness.form_tip_time')}
                size="small"
                sx={{ width: 140 }}
                value={tipForm.time}
                onChange={(e) => setTipForm((p) => ({ ...p, time: e.target.value }))}
                placeholder="21:00"
              />
              <TextField
                label={t('sleep_wellness.form_tip_emoji')}
                size="small"
                sx={{ width: 100 }}
                value={tipForm.emoji}
                onChange={(e) => setTipForm((p) => ({ ...p, emoji: e.target.value }))}
              />
            </Stack>
            <TextField
              label={t('sleep_wellness.form_tip_tip')}
              fullWidth
              multiline
              minRows={2}
              value={tipForm.tip}
              onChange={(e) => setTipForm((p) => ({ ...p, tip: e.target.value }))}
            />
            <Typography variant="caption" color="text.secondary">
              {t('common.preview_btn')}
            </Typography>
            <TipPreviewRow time={tipForm.time} emoji={tipForm.emoji} tip={tipForm.tip} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTipDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitTip}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {tipEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!programDeleteId}
        onClose={() => setProgramDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProgram}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!tipDeleteId}
        onClose={() => setTipDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTip}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
