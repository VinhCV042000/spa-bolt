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
  spa2KidsServices,
  spa2KidsSpaBanner,
  type Spa2KidsService,
  spa2KidsSafetyBadges,
  type Spa2KidsSpaBanner,
  type Spa2KidsSafetyBadge,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2KidsSpaPageView } from 'src/sections/spa2/view/spa2-content-pages6';
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
// Spa2KidsSpaPageView renders on the public /spa2/kids-spa page: the pastel
// pink/blue/green gradient hero banner (emoji + eyebrow/title/subtitle/parent
// alert text), the safety-certification badge strip (icon + label,
// reorderable) and the kids/teen service grid (name/age range/price/duration/
// icon/desc/accent color, reorderable) - read from and written back in the
// same shape as src/_mock/_spa2, the single source of truth shared with the
// public view. The public page's booking dialog and the fixed "parent info"
// note card are purely client-derived / static demo content and are
// intentionally not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_BADGE: Omit<Spa2KidsSafetyBadge, 'id'> = {
  icon: 'solar:leaf-bold',
  label: '',
};

const EMPTY_SERVICE: Omit<Spa2KidsService, 'id'> = {
  name: '',
  ageRange: '',
  price: 0,
  duration: '',
  icon: 'solar:face-scan-circle-bold-duotone',
  desc: '',
  color: '#F48FB1',
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

// Mirrors the pastel gradient hero section rendered by Spa2KidsSpaPageView on
// the public page - big emoji, eyebrow/title/subtitle and the "parent can
// stay" alert text.
function BannerPreview({ banner }: { banner: Spa2KidsSpaBanner }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #F8BBD9 0%, #E1F5FE 50%, #E8F5E9 100%)',
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography sx={{ fontSize: 40, lineHeight: 1 }}>{banner.emoji}</Typography>
        <Typography variant="overline" sx={{ color: '#C2185B', letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
        <Chip
          label={banner.alertText || '(Chưa có ghi chú cho phụ huynh)'}
          sx={{
            bgcolor: '#E8F5E9',
            color: '#1B5E20',
            height: 'auto',
            py: 1,
            '& .MuiChip-label': { whiteSpace: 'normal' },
          }}
        />
      </Stack>
    </Box>
  );
}

// Mirrors one safety badge chip exactly as rendered in the public "certified
// safe" strip (icon + label pill) - see Spa2KidsSpaPageView.
function SafetyBadgePreviewCard({ badge }: { badge: Omit<Spa2KidsSafetyBadge, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Chip
        icon={<Iconify icon={badge.icon || 'solar:leaf-bold'} width={14} />}
        label={badge.label || '(Chưa đặt tên)'}
        sx={{
          bgcolor: 'common.white',
          color: SPA2_TEAL_DARK,
          border: `1px solid ${SPA2_CREAM_DARK}`,
          '& .MuiChip-icon': { color: SPA2_TEAL },
        }}
      />
    </Card>
  );
}

// Mirrors one service card exactly as rendered in the public "Trải nghiệm spa
// cho bé yêu" grid: colored top border, icon box, name + age/duration chips,
// desc and price + "Đặt cho bé" button - see Spa2KidsSpaPageView.
function ServicePreviewCard({ service }: { service: Omit<Spa2KidsService, 'id'> }) {
  const color = service.color || '#F48FB1';
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        borderTop: `4px solid ${color}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 3,
            bgcolor: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon={service.icon || 'solar:face-scan-circle-bold-duotone'} width={24} sx={{ color }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, mb: 0.25 }}>
            {service.name || '(Chưa đặt tên dịch vụ)'}
          </Typography>
          <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: 0.5 }}>
            <Chip
              label={service.ageRange || '—'}
              size="small"
              sx={{ bgcolor: `${color}15`, color, fontSize: 11, fontWeight: 600 }}
            />
            <Chip
              label={service.duration || '—'}
              size="small"
              sx={{ bgcolor: 'background.neutral', color: 'text.secondary', fontSize: 11 }}
            />
          </Stack>
        </Box>
      </Stack>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
        {service.desc}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 700, color, fontSize: 16 }}>
          {formatVND(service.price ?? 0)}
        </Typography>
        <Button
          size="small"
          disabled
          sx={{ borderRadius: 99, bgcolor: color, color: 'white', px: 2 }}
        >
          Đặt cho bé
        </Button>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2KidsSpaManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2KidsSpaBanner>(() => ({ ...spa2KidsSpaBanner }));
  const [badges, setBadges] = useState<Spa2KidsSafetyBadge[]>(() =>
    spa2KidsSafetyBadges.map((item) => ({ ...item }))
  );
  const [services, setServices] = useState<Spa2KidsService[]>(() =>
    spa2KidsServices.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'safety' | 'services' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'emoji' | 'eyebrow' | 'title' | 'subtitle' | 'alertText', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Safety badges CRUD ----
  const [badgeDialog, setBadgeDialog] = useState(false);
  const [badgeEditId, setBadgeEditId] = useState<string | null>(null);
  const [badgeForm, setBadgeForm] = useState<Omit<Spa2KidsSafetyBadge, 'id'>>(EMPTY_BADGE);
  const [badgeDeleteId, setBadgeDeleteId] = useState<string | null>(null);

  const openCreateBadge = () => {
    setBadgeForm(EMPTY_BADGE);
    setBadgeEditId(null);
    setBadgeDialog(true);
  };
  const openEditBadge = (item: Spa2KidsSafetyBadge) => {
    const { id, ...rest } = item;
    setBadgeForm({ ...rest });
    setBadgeEditId(id);
    setBadgeDialog(true);
  };
  const submitBadge = () => {
    const next: Omit<Spa2KidsSafetyBadge, 'id'> = { ...badgeForm };
    if (badgeEditId) {
      setBadges((prev) => prev.map((item) => (item.id === badgeEditId ? { ...item, ...next } : item)));
    } else {
      setBadges((prev) => [...prev, withId(next)]);
    }
    setBadgeDialog(false);
    markDirty();
  };
  const confirmDeleteBadge = () => {
    setBadges((prev) => prev.filter((item) => item.id !== badgeDeleteId));
    setBadgeDeleteId(null);
    markDirty();
  };
  const reorderBadges = (next: Spa2KidsSafetyBadge[]) => {
    setBadges(next);
    markDirty();
  };

  // ---- Services CRUD ----
  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceEditId, setServiceEditId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Spa2KidsService, 'id'>>(EMPTY_SERVICE);
  const [serviceDeleteId, setServiceDeleteId] = useState<string | null>(null);

  const openCreateService = () => {
    setServiceForm(EMPTY_SERVICE);
    setServiceEditId(null);
    setServiceDialog(true);
  };
  const openEditService = (item: Spa2KidsService) => {
    const { id, ...rest } = item;
    setServiceForm({ ...rest });
    setServiceEditId(id);
    setServiceDialog(true);
  };
  const submitService = () => {
    const next: Omit<Spa2KidsService, 'id'> = {
      ...serviceForm,
      price: Number(serviceForm.price),
    };
    if (serviceEditId) {
      setServices((prev) =>
        prev.map((item) => (item.id === serviceEditId ? { ...item, ...next } : item))
      );
    } else {
      setServices((prev) => [...prev, withId(next)]);
    }
    setServiceDialog(false);
    markDirty();
  };
  const confirmDeleteService = () => {
    setServices((prev) => prev.filter((item) => item.id !== serviceDeleteId));
    setServiceDeleteId(null);
    markDirty();
  };
  const reorderServices = (next: Spa2KidsService[]) => {
    setServices(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2KidsSpaBanner });
    setBadges(spa2KidsSafetyBadges.map((item) => ({ ...item })));
    setServices(spa2KidsServices.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('kids_spa.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.kids_spa')}
      publicPath={paths.spa2.kidsSpa}
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
          label={t('kids_spa.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="safety"
          label={t('kids_spa.safety_section')}
          icon={<Iconify icon="solar:shield-check-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="services"
          label={t('kids_spa.services_section')}
          icon={<Iconify icon="solar:heart-bold-duotone" width={20} />}
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
            <SectionCard title={t('kids_spa.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <TextField
                  label={t('kids_spa.banner_emoji')}
                  value={banner.emoji}
                  onChange={(e) => updateBanner('emoji', e.target.value)}
                  fullWidth
                  size="small"
                  helperText="🌸✨💆"
                />
                <TextField
                  label={t('kids_spa.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('kids_spa.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('kids_spa.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('kids_spa.banner_alert_text')}
                  value={banner.alertText}
                  onChange={(e) => updateBanner('alertText', e.target.value)}
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

      {/* Safety badges */}
      {tab === 'safety' && (
        <SectionCard
          title={t('kids_spa.safety_section')}
          icon="solar:shield-check-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateBadge}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('kids_spa.add_badge_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('kids_spa.drag_hint')}
          </Typography>
          {badges.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('kids_spa.no_badges')}
            </Typography>
          )}
          <Spa2SortableGrid items={badges} onReorder={reorderBadges}>
            <Grid container spacing={2}>
              {badges.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <SafetyBadgePreviewCard badge={item} />
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
                            onClick={() => openEditBadge(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setBadgeDeleteId(item.id)}
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

      {/* Services */}
      {tab === 'services' && (
        <SectionCard
          title={t('kids_spa.services_section')}
          icon="solar:heart-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateService}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('kids_spa.add_service_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('kids_spa.drag_hint')}
          </Typography>
          {services.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('kids_spa.no_services')}
            </Typography>
          )}
          <Spa2SortableGrid items={services} onReorder={reorderServices}>
            <Grid container spacing={2}>
              {services.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ServicePreviewCard service={item} />
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
                            onClick={() => openEditService(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setServiceDeleteId(item.id)}
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
          <Spa2KidsSpaPageView banner={banner} safetyBadges={badges} services={services} />
        </Box>
      )}

      {/* Safety badge add/edit dialog */}
      <Dialog open={badgeDialog} onClose={() => setBadgeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {badgeEditId ? t('common.edit') : t('kids_spa.add_badge_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('kids_spa.form_badge_icon')}
                  value={badgeForm.icon}
                  onChange={(e) => setBadgeForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:leaf-bold"
                />
                <TextField
                  label={t('kids_spa.form_badge_label')}
                  value={badgeForm.label}
                  onChange={(e) => setBadgeForm((p) => ({ ...p, label: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <SafetyBadgePreviewCard badge={badgeForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBadgeDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitBadge}
            disabled={!badgeForm.label}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {badgeEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!badgeDeleteId}
        onClose={() => setBadgeDeleteId(null)}
        title={t('kids_spa.badge_delete_title')}
        content={t('kids_spa.badge_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteBadge}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Service add/edit dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {serviceEditId ? t('common.edit') : t('kids_spa.add_service_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('kids_spa.form_service_name')}
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('kids_spa.form_service_age_range')}
                    value={serviceForm.ageRange}
                    onChange={(e) => setServiceForm((p) => ({ ...p, ageRange: e.target.value }))}
                    fullWidth
                    helperText="8–12 tuổi"
                  />
                  <TextField
                    label={t('kids_spa.form_service_duration')}
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <TextField
                    label={t('kids_spa.form_service_price')}
                    type="number"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('kids_spa.form_service_color')}
                    value={serviceForm.color}
                    onChange={(e) => setServiceForm((p) => ({ ...p, color: e.target.value }))}
                    fullWidth
                    helperText="#F48FB1"
                    InputProps={{
                      endAdornment: (
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            flexShrink: 0,
                            bgcolor: serviceForm.color || '#F48FB1',
                            border: `1px solid ${SPA2_CREAM_DARK}`,
                          }}
                        />
                      ),
                    }}
                  />
                </Stack>
                <TextField
                  label={t('kids_spa.form_service_icon')}
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:face-scan-circle-bold-duotone"
                />
                <TextField
                  label={t('kids_spa.form_service_desc')}
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm((p) => ({ ...p, desc: e.target.value }))}
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
        title={t('kids_spa.service_delete_title')}
        content={t('kids_spa.service_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteService}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
