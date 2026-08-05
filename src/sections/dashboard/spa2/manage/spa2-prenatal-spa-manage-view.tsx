import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
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
  spa2PrenatalReasons,
  spa2PrenatalServices,
  spa2PrenatalSpaBanner,
  type Spa2PrenatalReason,
  type Spa2PrenatalService,
  spa2PrenatalSafetyBadges,
  type Spa2PrenatalSpaBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2PrenatalSpaPageView } from 'src/sections/spa2/view/spa2-content-pages5';
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
// Spa2PrenatalSpaPageView renders on the public /spa2/prenatal-spa page: the
// pink/purple/green gradient hero banner (emoji + eyebrow/title/subtitle + a
// disclaimer Alert), the yellow safety-badge chip strip, the service catalog
// (name/trimester/price/duration/icon/desc/safe, reorderable) and the 4-card
// "why choose" reasons grid - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The trimester filter-chip row on the public page is purely a client-side
// filter derived from each service's `trimester` string and is intentionally
// not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_SERVICE: Omit<Spa2PrenatalService, 'id'> = {
  name: '',
  trimester: '',
  price: 0,
  duration: '',
  icon: 'solar:heart-bold-duotone',
  desc: '',
  safe: true,
};

const EMPTY_REASON: Omit<Spa2PrenatalReason, 'id'> = {
  icon: 'solar:shield-check-bold-duotone',
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

// Mirrors the pink/purple/green gradient hero section rendered by
// Spa2PrenatalSpaPageView on the public page - big emoji, eyebrow/title/
// subtitle plus the disclaimer info Alert built from banner.disclaimerText.
function BannerPreview({ banner }: { banner: Spa2PrenatalSpaBanner }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #FCE4EC 0%, #F3E5F5 50%, #E8F5E9 100%)',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography sx={{ fontSize: 40, lineHeight: 1 }}>{banner.emoji}</Typography>
        <Typography variant="overline" sx={{ color: '#C2185B', letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h5" sx={{ color: SPA2_INK, fontWeight: 600, maxWidth: 420 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13, maxWidth: 400 }}>
          {banner.subtitle}
        </Typography>
        <Alert
          severity="info"
          sx={{ borderRadius: 3, bgcolor: '#E3F2FD', color: '#0C447C', maxWidth: 400 }}
        >
          <strong>Khuyến cáo:</strong> {banner.disclaimerText}
        </Alert>
      </Stack>
    </Box>
  );
}

// Mirrors one service card exactly as rendered in the public grid (see
// Spa2PrenatalSpaPageView, ~line 1797+): icon in a pink-tinted box, name +
// "An toàn" chip, trimester/duration chips, desc, price and a "Đặt lịch" CTA.
function ServicePreviewCard({ service }: { service: Omit<Spa2PrenatalService, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 3,
          bgcolor: '#FCE4EC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Iconify
          icon={service.icon || 'solar:heart-bold-duotone'}
          width={26}
          sx={{ color: '#C2185B' }}
        />
      </Box>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15, flex: 1 }}>
          {service.name || '(Chưa đặt tên)'}
        </Typography>
        {service.safe && (
          <Chip
            label="✅ An toàn"
            size="small"
            sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontSize: 11 }}
          />
        )}
      </Stack>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap">
        <Chip
          label={`Thai kỳ: ${service.trimester || '-'}`}
          size="small"
          sx={{ bgcolor: '#FCE4EC', color: '#C2185B', fontSize: 11 }}
        />
        <Chip
          label={service.duration}
          size="small"
          sx={{ bgcolor: 'background.neutral', color: 'text.secondary', fontSize: 11 }}
        />
      </Stack>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
        {service.desc}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 700, color: '#C2185B', fontSize: 16 }}>
          {formatVND(service.price ?? 0)}
        </Typography>
        <Button
          size="small"
          sx={{
            borderRadius: 99,
            bgcolor: '#C2185B',
            color: 'white',
            px: 2,
            '&:hover': { bgcolor: '#AD1457' },
          }}
        >
          Đặt lịch
        </Button>
      </Stack>
    </Card>
  );
}

// Mirrors one "why choose" reason card exactly as rendered on the public page
// (see Spa2PrenatalSpaPageView, ~line 1873+): centered icon/title/desc.
function ReasonPreviewCard({ reason }: { reason: Omit<Spa2PrenatalReason, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Iconify
        icon={reason.icon || 'solar:shield-check-bold-duotone'}
        width={40}
        sx={{ color: '#C2185B', mb: 1.5 }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {reason.title || '(Chưa đặt tiêu đề)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {reason.desc}
      </Typography>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2PrenatalSpaManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2PrenatalSpaBanner>(() => ({
    ...spa2PrenatalSpaBanner,
  }));
  const [services, setServices] = useState<Spa2PrenatalService[]>(() =>
    spa2PrenatalServices.map((s) => ({ ...s }))
  );
  const [safetyBadges, setSafetyBadges] = useState<string[]>(() => [...spa2PrenatalSafetyBadges]);
  const [reasons, setReasons] = useState<Spa2PrenatalReason[]>(() =>
    spa2PrenatalReasons.map((r) => ({ ...r }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'services' | 'safety' | 'reasons' | 'preview'>(
    'banner'
  );
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (
    key: 'emoji' | 'eyebrow' | 'title' | 'subtitle' | 'disclaimerText',
    value: string
  ) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Services CRUD ----
  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceEditId, setServiceEditId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Spa2PrenatalService, 'id'>>(EMPTY_SERVICE);
  const [serviceDeleteId, setServiceDeleteId] = useState<string | null>(null);

  const openCreateService = () => {
    setServiceForm(EMPTY_SERVICE);
    setServiceEditId(null);
    setServiceDialog(true);
  };
  const openEditService = (item: Spa2PrenatalService) => {
    const { id, ...rest } = item;
    setServiceForm({ ...rest });
    setServiceEditId(id);
    setServiceDialog(true);
  };
  const submitService = () => {
    const next: Omit<Spa2PrenatalService, 'id'> = {
      ...serviceForm,
      price: Number(serviceForm.price),
    };
    if (serviceEditId) {
      setServices((prev) => prev.map((s) => (s.id === serviceEditId ? { ...s, ...next } : s)));
    } else {
      setServices((prev) => [...prev, withId(next)]);
    }
    setServiceDialog(false);
    markDirty();
  };
  const confirmDeleteService = () => {
    setServices((prev) => prev.filter((s) => s.id !== serviceDeleteId));
    setServiceDeleteId(null);
    markDirty();
  };
  const reorderServices = (next: Spa2PrenatalService[]) => {
    setServices(next);
    markDirty();
  };

  // ---- Safety badges (plain string list) ----
  const updateSafetyBadge = (idx: number, value: string) => {
    setSafetyBadges((prev) => prev.map((b, i) => (i === idx ? value : b)));
    markDirty();
  };
  const addSafetyBadge = () => {
    setSafetyBadges((prev) => [...prev, '']);
    markDirty();
  };
  const removeSafetyBadge = (idx: number) => {
    setSafetyBadges((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };
  const reorderSafetyBadges = (next: { id: string; value: string }[]) => {
    setSafetyBadges(next.map((item) => item.value));
    markDirty();
  };

  // ---- Reasons CRUD ----
  const [reasonDialog, setReasonDialog] = useState(false);
  const [reasonEditId, setReasonEditId] = useState<string | null>(null);
  const [reasonForm, setReasonForm] = useState<Omit<Spa2PrenatalReason, 'id'>>(EMPTY_REASON);
  const [reasonDeleteId, setReasonDeleteId] = useState<string | null>(null);

  const openCreateReason = () => {
    setReasonForm(EMPTY_REASON);
    setReasonEditId(null);
    setReasonDialog(true);
  };
  const openEditReason = (item: Spa2PrenatalReason) => {
    const { id, ...rest } = item;
    setReasonForm({ ...rest });
    setReasonEditId(id);
    setReasonDialog(true);
  };
  const submitReason = () => {
    const next = { ...reasonForm };
    if (reasonEditId) {
      setReasons((prev) => prev.map((r) => (r.id === reasonEditId ? { ...r, ...next } : r)));
    } else {
      setReasons((prev) => [...prev, withId(next)]);
    }
    setReasonDialog(false);
    markDirty();
  };
  const confirmDeleteReason = () => {
    setReasons((prev) => prev.filter((r) => r.id !== reasonDeleteId));
    setReasonDeleteId(null);
    markDirty();
  };
  const reorderReasons = (next: Spa2PrenatalReason[]) => {
    setReasons(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2PrenatalSpaBanner });
    setServices(spa2PrenatalServices.map((s) => ({ ...s })));
    setSafetyBadges([...spa2PrenatalSafetyBadges]);
    setReasons(spa2PrenatalReasons.map((r) => ({ ...r })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('prenatal_spa.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.prenatal_spa')}
      publicPath={paths.spa2.prenatalSpa}
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
          label={t('prenatal_spa.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="services"
          label={t('prenatal_spa.services_section')}
          icon={<Iconify icon="solar:heart-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="safety"
          label={t('prenatal_spa.safety_section')}
          icon={<Iconify icon="solar:shield-check-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reasons"
          label={t('prenatal_spa.reasons_section')}
          icon={<Iconify icon="solar:users-group-bold-duotone" width={20} />}
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
              title={t('prenatal_spa.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('prenatal_spa.banner_emoji')}
                  value={banner.emoji}
                  onChange={(e) => updateBanner('emoji', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('prenatal_spa.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('prenatal_spa.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('prenatal_spa.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('prenatal_spa.banner_disclaimer')}
                  value={banner.disclaimerText}
                  onChange={(e) => updateBanner('disclaimerText', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
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

      {/* Services */}
      {tab === 'services' && (
        <SectionCard
          title={t('prenatal_spa.services_section')}
          icon="solar:heart-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateService}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('prenatal_spa.add_service_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('prenatal_spa.drag_hint')}
          </Typography>
          {services.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('prenatal_spa.no_services')}
            </Typography>
          )}
          <Spa2SortableGrid items={services} onReorder={reorderServices}>
            <Grid container spacing={2}>
              {services.map((s) => (
                <Grid key={s.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={s.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ServicePreviewCard service={s} />
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
                            onClick={() => openEditService(s)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setServiceDeleteId(s.id)}
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

      {/* Safety badges */}
      {tab === 'safety' && (
        <SectionCard
          title={t('prenatal_spa.safety_section')}
          icon="solar:shield-check-bold-duotone"
          action={
            <Button
              size="small"
              onClick={addSafetyBadge}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('prenatal_spa.add_badge_btn')}
            </Button>
          }
        >
          <Stack spacing={2}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              {t('prenatal_spa.drag_hint')}
            </Typography>
            <Stack spacing={1}>
              {safetyBadges.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  {t('prenatal_spa.no_badges')}
                </Typography>
              )}
              <Spa2SortableGrid
                items={safetyBadges.map((badge, idx) => ({ id: String(idx), value: badge }))}
                onReorder={reorderSafetyBadges}
              >
                <Stack spacing={1}>
                  {safetyBadges.map((badge, idx) => (
                    <Spa2SortableItem key={idx} id={String(idx)}>
                      {(sortable) => (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <TextField
                            size="small"
                            fullWidth
                            value={badge}
                            onChange={(e) => updateSafetyBadge(idx, e.target.value)}
                            placeholder={t('prenatal_spa.badge_placeholder')}
                          />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeSafetyBadge(idx)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                      )}
                    </Spa2SortableItem>
                  ))}
                </Stack>
              </Spa2SortableGrid>
            </Stack>
            <Divider />
            <Typography variant="caption" color="text.secondary">
              {t('common.preview_btn')}
            </Typography>
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: '#FFF9C4' }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {safetyBadges.map((badge, idx) => (
                  <Chip
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    label={badge || '(...)'}
                    sx={{ bgcolor: '#FFFDE7', color: '#5D4037', border: '1px solid #F9A825' }}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </SectionCard>
      )}

      {/* Reasons */}
      {tab === 'reasons' && (
        <SectionCard
          title={t('prenatal_spa.reasons_section')}
          icon="solar:users-group-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateReason}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('prenatal_spa.add_reason_btn')}
            </Button>
          }
        >
          {reasons.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('prenatal_spa.no_reasons')}
            </Typography>
          )}
          <Spa2SortableGrid items={reasons} onReorder={reorderReasons}>
            <Grid container spacing={2}>
              {reasons.map((r) => (
                <Grid key={r.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={r.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ReasonPreviewCard reason={r} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          justifyContent="center"
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditReason(r)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setReasonDeleteId(r.id)}
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
          <Spa2PrenatalSpaPageView
            banner={banner}
            services={services}
            safetyBadges={safetyBadges}
            reasons={reasons}
          />
        </Box>
      )}

      {/* Service add/edit dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {serviceEditId ? t('common.edit') : t('prenatal_spa.add_service_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('prenatal_spa.form_service_name')}
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('prenatal_spa.form_service_trimester')}
                    value={serviceForm.trimester}
                    onChange={(e) => setServiceForm((p) => ({ ...p, trimester: e.target.value }))}
                    fullWidth
                    helperText="2–3, Sau sinh..."
                  />
                  <TextField
                    label={t('prenatal_spa.form_service_duration')}
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('prenatal_spa.form_service_price')}
                    type="number"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('prenatal_spa.form_service_icon')}
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
                    fullWidth
                    helperText="solar:heart-bold-duotone"
                  />
                </Stack>
                <TextField
                  label={t('prenatal_spa.form_service_desc')}
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={serviceForm.safe}
                      onChange={(e) => setServiceForm((p) => ({ ...p, safe: e.target.checked }))}
                    />
                  }
                  label={t('prenatal_spa.form_service_safe')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ServicePreviewCard service={serviceForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitService}
            disabled={!serviceForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {serviceEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!serviceDeleteId}
        onClose={() => setServiceDeleteId(null)}
        title={t('prenatal_spa.service_delete_title')}
        content={t('prenatal_spa.service_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteService}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Reason add/edit dialog */}
      <Dialog open={reasonDialog} onClose={() => setReasonDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {reasonEditId ? t('common.edit') : t('prenatal_spa.add_reason_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('prenatal_spa.form_reason_icon')}
                  value={reasonForm.icon}
                  onChange={(e) => setReasonForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:shield-check-bold-duotone"
                />
                <TextField
                  label={t('prenatal_spa.form_reason_title')}
                  value={reasonForm.title}
                  onChange={(e) => setReasonForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('prenatal_spa.form_reason_desc')}
                  value={reasonForm.desc}
                  onChange={(e) => setReasonForm((p) => ({ ...p, desc: e.target.value }))}
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
                <ReasonPreviewCard reason={reasonForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReasonDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitReason}
            disabled={!reasonForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {reasonEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!reasonDeleteId}
        onClose={() => setReasonDeleteId(null)}
        title={t('prenatal_spa.reason_delete_title')}
        content={t('prenatal_spa.reason_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteReason}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
