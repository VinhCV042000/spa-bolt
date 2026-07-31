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
  spa2WaterTreatments,
  spa2WaterScienceFacts,
  spa2WaterTherapyBanner,
  type Spa2WaterTreatment,
  type Spa2WaterScienceFact,
  type Spa2WaterTherapyBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2WaterTherapyPageView } from 'src/sections/spa2/view/spa2-content-pages6';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages6.tsx's
// Spa2WaterTherapyPageView renders on the public /spa2/water-therapy page: the
// deep-blue/teal gradient hero banner (emoji + eyebrow/title/subtitle), the
// treatment grid (image/duration/name/desc/benefits/price) and the "Khoa học"
// science-fact strip (emoji + title/desc) - read from and written back in the
// same shape as src/_mock/_spa2, the single source of truth shared with the
// public view. The booking dialog's "chọn liệu pháp -> đặt lịch -> xác nhận"
// step flow on the public page is purely client-derived interactive demo
// state and is intentionally not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_TREATMENT: Omit<Spa2WaterTreatment, 'id'> = {
  name: '',
  price: 0,
  duration: '',
  image: '',
  desc: '',
  benefits: [],
};

const EMPTY_FACT: Omit<Spa2WaterScienceFact, 'id'> = {
  icon: '💧',
  title: '',
  desc: '',
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

// Mirrors the deep-blue/teal gradient hero section rendered by
// Spa2WaterTherapyPageView on the public page - big emoji, eyebrow/title/
// subtitle, using the exact literal hero colors from the public view (this
// page has its own blue palette, distinct from the teal brand tokens).
function BannerPreview({ banner }: { banner: Spa2WaterTherapyBanner }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0D47A1 0%, #00695C 100%)',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography sx={{ fontSize: 40, lineHeight: 1 }}>{banner.emoji}</Typography>
        <Typography variant="overline" sx={{ color: '#80DEEA', letterSpacing: 3 }}>
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

// Mirrors one treatment card exactly as rendered in the public "Các liệu
// pháp thủy trị liệu" grid (see Spa2WaterTherapyPageView): background image
// with bottom gradient + duration overlay, name, desc, benefit checklist,
// price and the "Đặt ngay" button.
function TreatmentPreviewCard({ treatment }: { treatment: Omit<Spa2WaterTreatment, 'id'> }) {
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: 180,
          backgroundImage: `url(${treatment.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 14 }}>
            {treatment.duration}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
          {treatment.name || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}>
          {treatment.desc}
        </Typography>
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {treatment.benefits.map((b, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Stack key={idx} direction="row" spacing={1} alignItems="center">
              <Iconify
                icon="solar:check-circle-bold"
                width={13}
                sx={{ color: SPA2_TEAL, flexShrink: 0 }}
              />
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{b}</Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontWeight: 700, color: '#0D47A1', fontSize: 15 }}>
            {formatVND(treatment.price ?? 0)}
          </Typography>
          <Button
            size="small"
            sx={{
              borderRadius: 99,
              bgcolor: '#0D47A1',
              color: 'white',
              px: 1.5,
              fontSize: 12,
              '&:hover': { opacity: 0.88 },
            }}
          >
            Đặt ngay
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

// Mirrors one "Khoa học" fact card exactly as rendered in the public science
// section: large emoji, title, desc, centered on a white card.
function ScienceFactPreviewCard({ fact }: { fact: Omit<Spa2WaterScienceFact, 'id'> }) {
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
      <Typography sx={{ fontSize: 48, lineHeight: 1, mb: 1.5 }}>{fact.icon || '💧'}</Typography>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {fact.title || '(Chưa đặt tiêu đề)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {fact.desc}
      </Typography>
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows), matching the therapist
// profile manage view's TherapistMiniListField convention - used here for
// the treatment's benefit checklist.
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

export function Spa2WaterTherapyManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2WaterTherapyBanner>(() => ({
    ...spa2WaterTherapyBanner,
  }));
  const [treatments, setTreatments] = useState<Spa2WaterTreatment[]>(() =>
    spa2WaterTreatments.map((item) => ({ ...item, benefits: [...item.benefits] }))
  );
  const [scienceFacts, setScienceFacts] = useState<Spa2WaterScienceFact[]>(() =>
    spa2WaterScienceFacts.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'treatments' | 'science' | 'preview'>('banner');
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
    useState<Omit<Spa2WaterTreatment, 'id'>>(EMPTY_TREATMENT);
  const [treatmentDeleteId, setTreatmentDeleteId] = useState<string | null>(null);

  const openCreateTreatment = () => {
    setTreatmentForm(EMPTY_TREATMENT);
    setTreatmentEditId(null);
    setTreatmentDialog(true);
  };
  const openEditTreatment = (item: Spa2WaterTreatment) => {
    const { id, ...rest } = item;
    setTreatmentForm({ ...rest, benefits: [...rest.benefits] });
    setTreatmentEditId(id);
    setTreatmentDialog(true);
  };
  const submitTreatment = () => {
    const next: Omit<Spa2WaterTreatment, 'id'> = {
      ...treatmentForm,
      price: Number(treatmentForm.price),
      benefits: treatmentForm.benefits.map((b) => b.trim()).filter(Boolean),
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
  const reorderTreatments = (next: Spa2WaterTreatment[]) => {
    setTreatments(next);
    markDirty();
  };

  const updateBenefit = (idx: number, value: string) => {
    setTreatmentForm((p) => ({
      ...p,
      benefits: p.benefits.map((b, i) => (i === idx ? value : b)),
    }));
  };
  const addBenefit = () => setTreatmentForm((p) => ({ ...p, benefits: [...p.benefits, ''] }));
  const removeBenefit = (idx: number) =>
    setTreatmentForm((p) => ({ ...p, benefits: p.benefits.filter((_, i) => i !== idx) }));

  // ---- Science facts CRUD ----
  const [factDialog, setFactDialog] = useState(false);
  const [factEditId, setFactEditId] = useState<string | null>(null);
  const [factForm, setFactForm] = useState<Omit<Spa2WaterScienceFact, 'id'>>(EMPTY_FACT);
  const [factDeleteId, setFactDeleteId] = useState<string | null>(null);

  const openCreateFact = () => {
    setFactForm(EMPTY_FACT);
    setFactEditId(null);
    setFactDialog(true);
  };
  const openEditFact = (item: Spa2WaterScienceFact) => {
    const { id, ...rest } = item;
    setFactForm({ ...rest });
    setFactEditId(id);
    setFactDialog(true);
  };
  const submitFact = () => {
    const next: Omit<Spa2WaterScienceFact, 'id'> = { ...factForm };
    if (factEditId) {
      setScienceFacts((prev) =>
        prev.map((item) => (item.id === factEditId ? { ...item, ...next } : item))
      );
    } else {
      setScienceFacts((prev) => [...prev, withId(next)]);
    }
    setFactDialog(false);
    markDirty();
  };
  const confirmDeleteFact = () => {
    setScienceFacts((prev) => prev.filter((item) => item.id !== factDeleteId));
    setFactDeleteId(null);
    markDirty();
  };
  const reorderFacts = (next: Spa2WaterScienceFact[]) => {
    setScienceFacts(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2WaterTherapyBanner });
    setTreatments(spa2WaterTreatments.map((item) => ({ ...item, benefits: [...item.benefits] })));
    setScienceFacts(spa2WaterScienceFacts.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('water_therapy.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.water_therapy')}
      publicPath={paths.spa2.waterTherapy}
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
          label={t('water_therapy.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="treatments"
          label={t('water_therapy.treatments_section')}
          icon={<Iconify icon="solar:hydrant-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="science"
          label={t('water_therapy.science_section')}
          icon={<Iconify icon="solar:test-tube-bold-duotone" width={20} />}
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
              title={t('water_therapy.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('water_therapy.banner_emoji')}
                  value={banner.emoji}
                  onChange={(e) => updateBanner('emoji', e.target.value)}
                  fullWidth
                  size="small"
                  helperText="💧"
                />
                <TextField
                  label={t('water_therapy.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('water_therapy.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('water_therapy.banner_subtitle')}
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
          title={t('water_therapy.treatments_section')}
          icon="solar:hydrant-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateTreatment}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('water_therapy.add_treatment_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('water_therapy.drag_hint')}
          </Typography>
          {treatments.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('water_therapy.no_treatments')}
            </Typography>
          )}
          <Spa2SortableGrid items={treatments} onReorder={reorderTreatments}>
            <Grid container spacing={2}>
              {treatments.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
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

      {/* Science facts */}
      {tab === 'science' && (
        <SectionCard
          title={t('water_therapy.science_section')}
          icon="solar:test-tube-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateFact}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('water_therapy.add_fact_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('water_therapy.drag_hint')}
          </Typography>
          {scienceFacts.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('water_therapy.no_facts')}
            </Typography>
          )}
          <Spa2SortableGrid items={scienceFacts} onReorder={reorderFacts}>
            <Grid container spacing={2}>
              {scienceFacts.map((item) => (
                <Grid key={item.id} xs={12} sm={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ScienceFactPreviewCard fact={item} />
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
                            onClick={() => openEditFact(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setFactDeleteId(item.id)}
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
          <Spa2WaterTherapyPageView
            banner={banner}
            treatments={treatments}
            scienceFacts={scienceFacts}
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
          {treatmentEditId ? t('common.edit') : t('water_therapy.add_treatment_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('water_therapy.form_treatment_name')}
                  value={treatmentForm.name}
                  onChange={(e) => setTreatmentForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('water_therapy.form_treatment_price')}
                    type="number"
                    value={treatmentForm.price}
                    onChange={(e) =>
                      setTreatmentForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('water_therapy.form_treatment_duration')}
                    value={treatmentForm.duration}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('water_therapy.form_treatment_image')}
                  value={treatmentForm.image}
                  onChange={(url) => setTreatmentForm((p) => ({ ...p, image: url }))}
                />
                <TextField
                  label={t('water_therapy.form_treatment_desc')}
                  value={treatmentForm.desc}
                  onChange={(e) => setTreatmentForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <MiniListField
                  label={t('water_therapy.form_treatment_benefits')}
                  addLabel={t('water_therapy.add_benefit_btn')}
                  items={treatmentForm.benefits}
                  onChangeItem={updateBenefit}
                  onAddItem={addBenefit}
                  onRemoveItem={removeBenefit}
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
        title={t('water_therapy.treatment_delete_title')}
        content={t('water_therapy.treatment_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTreatment}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Science fact add/edit dialog */}
      <Dialog open={factDialog} onClose={() => setFactDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {factEditId ? t('common.edit') : t('water_therapy.add_fact_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('water_therapy.form_fact_icon')}
                  value={factForm.icon}
                  onChange={(e) => setFactForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="🌡️"
                />
                <TextField
                  label={t('water_therapy.form_fact_title')}
                  value={factForm.title}
                  onChange={(e) => setFactForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('water_therapy.form_fact_desc')}
                  value={factForm.desc}
                  onChange={(e) => setFactForm((p) => ({ ...p, desc: e.target.value }))}
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
                <ScienceFactPreviewCard fact={factForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFactDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitFact}
            disabled={!factForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {factEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!factDeleteId}
        onClose={() => setFactDeleteId(null)}
        title={t('water_therapy.fact_delete_title')}
        content={t('water_therapy.fact_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteFact}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
