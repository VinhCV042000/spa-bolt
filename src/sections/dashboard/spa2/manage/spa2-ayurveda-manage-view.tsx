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
  spa2AyurvedaBanner,
  spa2AyurvedaTreatments,
  type Spa2AyurvedaBanner,
  spa2AyurvedaPhilosophies,
  type Spa2AyurvedaTreatment,
  type Spa2AyurvedaPhilosophy,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2AyurvedaPageView } from 'src/sections/spa2/view/spa2-content-pages6';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages6.tsx's
// Spa2AyurvedaPageView renders on the public /spa2/ayurveda page: the
// brown/terracotta gradient hero banner (emoji + eyebrow/title/subtitle), the
// treatment grid (icon/name/origin/duration/desc/price) and the "Triết lý"
// philosophy strip (icon + question/answer) - read from and written back in
// the same shape as src/_mock/_spa2, the single source of truth shared with
// the public view. The origin filter chips on the public page derive their
// list from a fixed, hardcoded ORIGINS array local to the public view and are
// intentionally not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_TREATMENT: Omit<Spa2AyurvedaTreatment, 'id'> = {
  name: '',
  origin: '',
  price: 0,
  duration: '',
  icon: 'solar:leaf-bold-duotone',
  desc: '',
};

const EMPTY_PHILOSOPHY: Omit<Spa2AyurvedaPhilosophy, 'id'> = {
  icon: '🪔',
  question: '',
  answer: '',
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

// Mirrors the brown/terracotta gradient hero section rendered by
// Spa2AyurvedaPageView on the public page - big emoji, eyebrow/title/
// subtitle, using the exact literal hero colors from the public view (this
// page has its own brown/orange palette, distinct from the teal brand
// tokens).
function BannerPreview({ banner }: { banner: Spa2AyurvedaBanner }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #3E2723 0%, #BF360C 50%, #E65100 100%)',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography sx={{ fontSize: 40, lineHeight: 1 }}>{banner.emoji}</Typography>
        <Typography variant="overline" sx={{ color: '#FFCC80', letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors one treatment card exactly as rendered in the public "Trị liệu"
// grid (see Spa2AyurvedaPageView): icon in a terracotta circle, name, origin
// + duration chips, desc, price and the "Đặt ngay" button.
function TreatmentPreviewCard({ treatment }: { treatment: Omit<Spa2AyurvedaTreatment, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: '#FBE9E7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify
            icon={treatment.icon || 'solar:leaf-bold-duotone'}
            width={26}
            sx={{ color: '#BF360C' }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, mb: 0.25 }}>
            {treatment.name || '(Chưa đặt tên)'}
          </Typography>
          <Stack direction="row" spacing={0.75}>
            <Chip
              label={treatment.origin || '—'}
              size="small"
              sx={{ bgcolor: '#FBE9E7', color: '#BF360C', fontSize: 11 }}
            />
            <Chip
              label={treatment.duration}
              size="small"
              sx={{ bgcolor: 'background.neutral', color: 'text.secondary', fontSize: 11 }}
            />
          </Stack>
        </Box>
      </Stack>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
        {treatment.desc}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 700, color: '#BF360C', fontSize: 16 }}>
          {formatVND(treatment.price ?? 0)}
        </Typography>
        <Button
          size="small"
          sx={{
            borderRadius: 99,
            bgcolor: '#BF360C',
            color: 'white',
            px: 2,
            fontSize: 12,
            '&:hover': { bgcolor: '#B71C1C' },
          }}
        >
          Đặt ngay
        </Button>
      </Stack>
    </Card>
  );
}

// Mirrors one "Triết lý" philosophy card exactly as rendered in the public
// philosophy section: large icon, question, answer, centered on a white
// card.
function PhilosophyPreviewCard({ philosophy }: { philosophy: Omit<Spa2AyurvedaPhilosophy, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        bgcolor: 'common.white',
        textAlign: 'center',
      }}
    >
      <Typography sx={{ fontSize: 44, lineHeight: 1, mb: 1.5 }}>
        {philosophy.icon || '🪔'}
      </Typography>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1 }}>
        {philosophy.question || '(Chưa đặt câu hỏi)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {philosophy.answer}
      </Typography>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2AyurvedaManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2AyurvedaBanner>(() => ({ ...spa2AyurvedaBanner }));
  const [treatments, setTreatments] = useState<Spa2AyurvedaTreatment[]>(() =>
    spa2AyurvedaTreatments.map((item) => ({ ...item }))
  );
  const [philosophies, setPhilosophies] = useState<Spa2AyurvedaPhilosophy[]>(() =>
    spa2AyurvedaPhilosophies.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'treatments' | 'philosophy' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'emoji' | 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Treatments CRUD ----
  const [treatmentDialog, setTreatmentDialog] = useState(false);
  const [treatmentEditId, setTreatmentEditId] = useState<string | null>(null);
  const [treatmentForm, setTreatmentForm] =
    useState<Omit<Spa2AyurvedaTreatment, 'id'>>(EMPTY_TREATMENT);
  const [treatmentDeleteId, setTreatmentDeleteId] = useState<string | null>(null);

  const openCreateTreatment = () => {
    setTreatmentForm(EMPTY_TREATMENT);
    setTreatmentEditId(null);
    setTreatmentDialog(true);
  };
  const openEditTreatment = (item: Spa2AyurvedaTreatment) => {
    const { id, ...rest } = item;
    setTreatmentForm({ ...rest });
    setTreatmentEditId(id);
    setTreatmentDialog(true);
  };
  const submitTreatment = () => {
    const next: Omit<Spa2AyurvedaTreatment, 'id'> = {
      ...treatmentForm,
      price: Number(treatmentForm.price),
    };
    if (treatmentEditId) {
      setTreatments((prev) =>
        prev.map((item) => (item.id === treatmentEditId ? { ...item, ...next } : item))
      );
    } else {
      setTreatments((prev) => [...prev, withId(next)]);
    }
    setTreatmentDialog(false);
    markDirty();
  };
  const confirmDeleteTreatment = () => {
    setTreatments((prev) => prev.filter((item) => item.id !== treatmentDeleteId));
    setTreatmentDeleteId(null);
    markDirty();
  };
  const reorderTreatments = (next: Spa2AyurvedaTreatment[]) => {
    setTreatments(next);
    markDirty();
  };

  // ---- Philosophies CRUD ----
  const [philosophyDialog, setPhilosophyDialog] = useState(false);
  const [philosophyEditId, setPhilosophyEditId] = useState<string | null>(null);
  const [philosophyForm, setPhilosophyForm] =
    useState<Omit<Spa2AyurvedaPhilosophy, 'id'>>(EMPTY_PHILOSOPHY);
  const [philosophyDeleteId, setPhilosophyDeleteId] = useState<string | null>(null);

  const openCreatePhilosophy = () => {
    setPhilosophyForm(EMPTY_PHILOSOPHY);
    setPhilosophyEditId(null);
    setPhilosophyDialog(true);
  };
  const openEditPhilosophy = (item: Spa2AyurvedaPhilosophy) => {
    const { id, ...rest } = item;
    setPhilosophyForm({ ...rest });
    setPhilosophyEditId(id);
    setPhilosophyDialog(true);
  };
  const submitPhilosophy = () => {
    const next: Omit<Spa2AyurvedaPhilosophy, 'id'> = { ...philosophyForm };
    if (philosophyEditId) {
      setPhilosophies((prev) =>
        prev.map((item) => (item.id === philosophyEditId ? { ...item, ...next } : item))
      );
    } else {
      setPhilosophies((prev) => [...prev, withId(next)]);
    }
    setPhilosophyDialog(false);
    markDirty();
  };
  const confirmDeletePhilosophy = () => {
    setPhilosophies((prev) => prev.filter((item) => item.id !== philosophyDeleteId));
    setPhilosophyDeleteId(null);
    markDirty();
  };
  const reorderPhilosophies = (next: Spa2AyurvedaPhilosophy[]) => {
    setPhilosophies(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2AyurvedaBanner });
    setTreatments(spa2AyurvedaTreatments.map((item) => ({ ...item })));
    setPhilosophies(spa2AyurvedaPhilosophies.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('ayurveda.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.ayurveda')}
      publicPath={paths.spa2.ayurveda}
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
          label={t('ayurveda.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="treatments"
          label={t('ayurveda.treatments_section')}
          icon={<Iconify icon="solar:hand-stars-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="philosophy"
          label={t('ayurveda.philosophy_section')}
          icon={<Iconify icon="solar:lightbulb-bold-duotone" width={20} />}
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
              title={t('ayurveda.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('ayurveda.banner_emoji')}
                  value={banner.emoji}
                  onChange={(e) => updateBanner('emoji', e.target.value)}
                  fullWidth
                  size="small"
                  helperText="🪔"
                />
                <TextField
                  label={t('ayurveda.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('ayurveda.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('ayurveda.banner_subtitle')}
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

      {/* Treatments */}
      {tab === 'treatments' && (
        <SectionCard
          title={t('ayurveda.treatments_section')}
          icon="solar:hand-stars-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateTreatment}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('ayurveda.add_treatment_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('ayurveda.drag_hint')}
          </Typography>
          {treatments.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('ayurveda.no_treatments')}
            </Typography>
          )}
          <Spa2SortableGrid items={treatments} onReorder={reorderTreatments}>
            <Grid container spacing={2}>
              {treatments.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <TreatmentPreviewCard treatment={item} />
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
                            onClick={() => openEditTreatment(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setTreatmentDeleteId(item.id)}
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

      {/* Philosophy */}
      {tab === 'philosophy' && (
        <SectionCard
          title={t('ayurveda.philosophy_section')}
          icon="solar:lightbulb-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreatePhilosophy}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('ayurveda.add_philosophy_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('ayurveda.drag_hint')}
          </Typography>
          {philosophies.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('ayurveda.no_philosophies')}
            </Typography>
          )}
          <Spa2SortableGrid items={philosophies} onReorder={reorderPhilosophies}>
            <Grid container spacing={2}>
              {philosophies.map((item) => (
                <Grid key={item.id} xs={12} sm={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <PhilosophyPreviewCard philosophy={item} />
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
                            onClick={() => openEditPhilosophy(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setPhilosophyDeleteId(item.id)}
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
          <Spa2AyurvedaPageView
            banner={banner}
            treatments={treatments}
            philosophies={philosophies}
          />
        </Box>
      )}

      {/* Treatment add/edit dialog */}
      <Dialog
        open={treatmentDialog}
        onClose={() => setTreatmentDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {treatmentEditId ? t('common.edit') : t('ayurveda.add_treatment_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('ayurveda.form_treatment_name')}
                  value={treatmentForm.name}
                  onChange={(e) => setTreatmentForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('ayurveda.form_treatment_origin')}
                    value={treatmentForm.origin}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, origin: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('ayurveda.form_treatment_price')}
                    type="number"
                    value={treatmentForm.price}
                    onChange={(e) =>
                      setTreatmentForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('ayurveda.form_treatment_duration')}
                    value={treatmentForm.duration}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('ayurveda.form_treatment_icon')}
                    value={treatmentForm.icon}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, icon: e.target.value }))}
                    fullWidth
                    helperText="solar:leaf-bold-duotone"
                  />
                </Stack>
                <TextField
                  label={t('ayurveda.form_treatment_desc')}
                  value={treatmentForm.desc}
                  onChange={(e) => setTreatmentForm((p) => ({ ...p, desc: e.target.value }))}
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
                <TreatmentPreviewCard treatment={treatmentForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTreatmentDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitTreatment}
            disabled={!treatmentForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {treatmentEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!treatmentDeleteId}
        onClose={() => setTreatmentDeleteId(null)}
        title={t('ayurveda.treatment_delete_title')}
        content={t('ayurveda.treatment_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTreatment}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Philosophy add/edit dialog */}
      <Dialog
        open={philosophyDialog}
        onClose={() => setPhilosophyDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {philosophyEditId ? t('common.edit') : t('ayurveda.add_philosophy_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('ayurveda.form_philosophy_icon')}
                  value={philosophyForm.icon}
                  onChange={(e) => setPhilosophyForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="🪔"
                />
                <TextField
                  label={t('ayurveda.form_philosophy_question')}
                  value={philosophyForm.question}
                  onChange={(e) => setPhilosophyForm((p) => ({ ...p, question: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('ayurveda.form_philosophy_answer')}
                  value={philosophyForm.answer}
                  onChange={(e) => setPhilosophyForm((p) => ({ ...p, answer: e.target.value }))}
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
                <PhilosophyPreviewCard philosophy={philosophyForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPhilosophyDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPhilosophy}
            disabled={!philosophyForm.question}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {philosophyEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!philosophyDeleteId}
        onClose={() => setPhilosophyDeleteId(null)}
        title={t('ayurveda.philosophy_delete_title')}
        content={t('ayurveda.philosophy_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePhilosophy}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
