import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
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
import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2SkinDiaryBanner,
  spa2SkinDiaryEntries,
  type Spa2SkinDiaryEntry,
  type Spa2AdjustableImage,
  type Spa2SkinDiaryBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2ContentPageHero3,
  Spa2SkinDiaryPageView,
} from 'src/sections/spa2/view/spa2-content-pages3';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2SkinDiaryPageView renders on the public /spa2/skin-diary page: the page
// banner and the tracked skin-metric entries (moisture/oiliness/sensitivity +
// note + service used) - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The "banner" tab reuses Spa2ContentPageHero3 and the "preview" tab reuses
// Spa2SkinDiaryPageView itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const SKIN_METRICS = [
  { key: 'moisture' as const, label: 'Độ ẩm', icon: 'solar:drop-bold', color: '#4FC3F7' },
  { key: 'oiliness' as const, label: 'Dầu nhờn', icon: 'solar:sun-bold', color: '#EF9F27' },
  { key: 'sensitivity' as const, label: 'Độ nhạy', icon: 'solar:shield-bold', color: '#E57373' },
];

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_ENTRY_FORM = {
  date: '',
  moisture: 60,
  oiliness: 50,
  sensitivity: 30,
  note: '',
  service: '',
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

// Mirrors a single history Card exactly as rendered in "Lịch sử theo dõi" on
// the public page (date + service chip + 3 metric mini-stats + note).
function EntryPreviewCard({
  date,
  moisture,
  oiliness,
  sensitivity,
  note,
  service,
  highlight = false,
}: Spa2SkinDiaryEntry & { highlight?: boolean }) {
  const values: Record<string, number> = { moisture, oiliness, sensitivity };
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: highlight ? SPA2_CREAM : 'common.white',
        border: `1px solid ${highlight ? SPA2_TEAL : SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <Box sx={{ minWidth: 90 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_TEAL_DARK }}>
            {date || '—'}
          </Typography>
          <Chip
            label={service || 'Dịch vụ'}
            size="small"
            sx={{ mt: 0.5, bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
          />
        </Box>
        <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
          {SKIN_METRICS.map((m) => (
            <Box key={m.key} sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{m.label}</Typography>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: m.color }}>
                {values[m.key]}%
              </Typography>
            </Box>
          ))}
        </Stack>
        <Typography
          sx={{ fontSize: 12, color: 'text.secondary', fontStyle: 'italic', maxWidth: 160 }}
        >
          &ldquo;{(note || 'Ghi chú cảm nhận…').slice(0, 50)}&rdquo;
        </Typography>
      </Stack>
    </Card>
  );
}

// Mirrors the "Tình trạng da hiện tại" SoftCard's progress-bar block for a
// single entry (used as the live preview in the add/edit dialog).
function EntryMetricsPreview({ moisture, oiliness, sensitivity }: Spa2SkinDiaryEntry) {
  const values: Record<string, number> = { moisture, oiliness, sensitivity };
  return (
    <Stack spacing={2}>
      {SKIN_METRICS.map((m) => (
        <Box key={m.key}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify icon={m.icon} width={16} sx={{ color: m.color }} />
              <Typography sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                {m.label}
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK }}>
              {values[m.key]}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={values[m.key]}
            sx={{
              height: 8,
              borderRadius: 99,
              bgcolor: SPA2_CREAM_DARK,
              '& .MuiLinearProgress-bar': { bgcolor: m.color, borderRadius: 99 },
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

export function Spa2SkinDiaryManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SkinDiaryBanner>(() => ({
    ...spa2SkinDiaryBanner,
    image: { ...spa2SkinDiaryBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'entries' | 'preview'>('banner');
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

  // ---- Entries ----
  const [entries, setEntries] = useState<Spa2SkinDiaryEntry[]>(() =>
    spa2SkinDiaryEntries.map((e) => ({ ...e }))
  );
  const [entryForm, setEntryForm] = useState(EMPTY_ENTRY_FORM);
  const [entryDialog, setEntryDialog] = useState(false);
  const [entryEditId, setEntryEditId] = useState<string | null>(null);
  const [entryDeleteId, setEntryDeleteId] = useState<string | null>(null);

  const openCreateEntry = () => {
    setEntryForm(EMPTY_ENTRY_FORM);
    setEntryEditId(null);
    setEntryDialog(true);
  };
  const openEditEntry = (item: Spa2SkinDiaryEntry) => {
    setEntryForm({
      date: item.date,
      moisture: item.moisture,
      oiliness: item.oiliness,
      sensitivity: item.sensitivity,
      note: item.note,
      service: item.service,
    });
    setEntryEditId(item.id);
    setEntryDialog(true);
  };
  const submitEntry = () => {
    if (entryEditId) {
      setEntries((prev) => prev.map((e) => (e.id === entryEditId ? { ...e, ...entryForm } : e)));
    } else {
      setEntries((prev) => [...prev, withId(entryForm)]);
    }
    setEntryDialog(false);
    markDirty();
  };
  const confirmDeleteEntry = () => {
    setEntries((prev) => prev.filter((e) => e.id !== entryDeleteId));
    setEntryDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SkinDiaryBanner, image: { ...spa2SkinDiaryBanner.image } });
    setEntries(spa2SkinDiaryEntries.map((e) => ({ ...e })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('skin_diary.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.skin_diary')}
      publicPath={paths.spa2.skinDiary}
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
          label={t('skin_diary.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="entries"
          label={t('skin_diary.entries_section')}
          icon={<Iconify icon="solar:notebook-bold-duotone" width={20} />}
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
              title={t('skin_diary.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('skin_diary.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('skin_diary.banner_image_help')}
                />
                <TextField
                  label={t('skin_diary.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('skin_diary.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('skin_diary.banner_subtitle')}
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
                <Spa2ContentPageHero3
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

      {/* Entries */}
      {tab === 'entries' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('skin_diary.entries_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateEntry}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('skin_diary.add_entry_btn')}
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {[...entries].reverse().map((item, idx) => (
              <Box key={item.id} sx={{ position: 'relative' }}>
                <EntryPreviewCard {...item} highlight={idx === 0} />
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <IconButton
                    size="small"
                    onClick={() => openEditEntry(item)}
                    sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                  >
                    <Iconify icon="solar:pen-bold" width={14} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setEntryDeleteId(item.id)}
                    sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                  </IconButton>
                </Stack>
              </Box>
            ))}
            {entries.length === 0 && (
              <Typography sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center' }}>
                {t('skin_diary.no_entries')}
              </Typography>
            )}
          </Stack>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SkinDiaryPageView banner={banner} entries={entries} />
        </Box>
      )}

      {/* Entry add/edit dialog */}
      <Dialog open={entryDialog} onClose={() => setEntryDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{entryEditId ? t('common.edit') : t('skin_diary.add_entry_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('skin_diary.form_entry_date')}
                    fullWidth
                    size="small"
                    value={entryForm.date}
                    onChange={(e) => setEntryForm((p) => ({ ...p, date: e.target.value }))}
                    helperText="dd/mm/yyyy"
                  />
                  <TextField
                    label={t('skin_diary.form_entry_service')}
                    fullWidth
                    size="small"
                    value={entryForm.service}
                    onChange={(e) => setEntryForm((p) => ({ ...p, service: e.target.value }))}
                  />
                </Stack>
                {SKIN_METRICS.map((m) => (
                  <Box key={m.key}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Iconify icon={m.icon} width={16} sx={{ color: m.color }} />
                        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{m.label}</Typography>
                      </Stack>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: m.color }}>
                        {entryForm[m.key]}%
                      </Typography>
                    </Stack>
                    <Slider
                      value={entryForm[m.key]}
                      onChange={(_, v) => setEntryForm((p) => ({ ...p, [m.key]: v as number }))}
                      sx={{ color: m.color }}
                    />
                  </Box>
                ))}
                <TextField
                  label={t('skin_diary.form_entry_note')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={entryForm.note}
                  onChange={(e) => setEntryForm((p) => ({ ...p, note: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <EntryMetricsPreview
                  id={entryEditId ?? 'preview'}
                  date={entryForm.date}
                  moisture={entryForm.moisture}
                  oiliness={entryForm.oiliness}
                  sensitivity={entryForm.sensitivity}
                  note={entryForm.note}
                  service={entryForm.service}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEntryDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitEntry}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {entryEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!entryDeleteId}
        onClose={() => setEntryDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteEntry}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
