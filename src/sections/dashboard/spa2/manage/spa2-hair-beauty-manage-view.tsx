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
  spa2HairTips,
  spa2HairServices,
  type Spa2HairTip,
  spa2HairBeautyBanner,
  type Spa2HairService,
  type Spa2HairBeautyBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2HairBeautyPageView } from 'src/sections/spa2/view/spa2-content-pages6';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages6.tsx's
// Spa2HairBeautyPageView renders on the public /spa2/hair-beauty page: the
// cream-bg hero banner (eyebrow/title/subtitle only - the hero image is a
// fixed constant, not manageable), the hair/scalp service catalog
// (icon/name/duration/price/desc/concerns, reorderable) and the "6 thói quen
// bảo vệ mái tóc" tips list (icon + tip text, reorderable) - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The concern-filter chip row on the
// public page is a fixed, purely client-side filter and is intentionally not
// mocked/editable here, matching the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_SERVICE: Omit<Spa2HairService, 'id'> = {
  name: '',
  price: 0,
  duration: '',
  icon: 'solar:magic-stick-3-bold-duotone',
  desc: '',
  concerns: [],
};

const EMPTY_TIP: Omit<Spa2HairTip, 'id'> = {
  icon: '💧',
  tip: '',
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

// Mirrors the plain cream-bg PageHero rendered by Spa2HairBeautyPageView on
// the public page (see spa2-content-pages6.tsx's PageHero, non-dark mode) -
// the hero image itself is a fixed SPA2_PAGE_IMAGES constant and is
// intentionally not part of the manageable banner.
function BannerPreview({ banner }: { banner: Spa2HairBeautyBanner }) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: SPA2_CREAM,
        pt: { xs: 6, md: 7 },
        pb: { xs: 5, md: 6 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL_LIGHT,
          opacity: 0.1,
        }}
      />
      <Box sx={{ position: 'relative', textAlign: 'center', px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600, mt: 1, mb: 1.5 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 460, mx: 'auto' }}>
          {banner.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

// Mirrors a single service card exactly as rendered in the public service
// grid (see Spa2HairBeautyPageView, ~line 643+): icon in a cream box, name,
// duration chip + concern chips, description, price and the disabled
// "Đặt ngay" button (non-functional here since this is a static admin
// preview, not the interactive public page).
function ServicePreviewCard({ service }: { service: Omit<Spa2HairService, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 3,
          bgcolor: SPA2_CREAM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Iconify
          icon={service.icon || 'solar:magic-stick-3-bold-duotone'}
          width={26}
          sx={{ color: SPA2_TEAL }}
        />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
        {service.name || '(Chưa đặt tên)'}
      </Typography>
      <Stack direction="row" spacing={0.75} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
        <Chip
          label={service.duration || '—'}
          size="small"
          sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
        />
        {service.concerns.map((c) => (
          <Chip
            key={c}
            label={c}
            size="small"
            sx={{ bgcolor: '#E3F2FD', color: '#0C447C', fontSize: 11 }}
          />
        ))}
      </Stack>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
        {service.desc}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 16 }}>
          {formatVND(service.price ?? 0)}
        </Typography>
        <Button
          size="small"
          disabled
          sx={{
            borderRadius: 99,
            px: 2,
            '&.Mui-disabled': { bgcolor: SPA2_TEAL, color: 'common.white', opacity: 0.9 },
          }}
        >
          Đặt ngay
        </Button>
      </Stack>
    </Card>
  );
}

// Mirrors a single tip card in the public "6 thói quen bảo vệ mái tóc" grid
// (see Spa2HairBeautyPageView, ~line 717+): large icon + tip text on a white
// card over the cream section background.
function TipPreviewCard({ tip }: { tip: Omit<Spa2HairTip, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        bgcolor: 'common.white',
        height: '100%',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Typography sx={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>
          {tip.icon || '💡'}
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: SPA2_INK, lineHeight: 1.7 }}>
          {tip.tip || '(Chưa nhập nội dung)'}
        </Typography>
      </Stack>
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows) used for a service's
// `concerns` string array, matching the therapist-profile manage view's
// TherapistMiniListField convention.
function ConcernsMiniListField({
  label,
  addLabel,
  placeholder,
  items,
  onChangeItem,
  onAddItem,
  onRemoveItem,
}: {
  label: string;
  addLabel: string;
  placeholder?: string;
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
              placeholder={placeholder}
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

export function Spa2HairBeautyManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2HairBeautyBanner>(() => ({ ...spa2HairBeautyBanner }));
  const [services, setServices] = useState<Spa2HairService[]>(() =>
    spa2HairServices.map((s) => ({ ...s, concerns: [...s.concerns] }))
  );
  const [tips, setTips] = useState<Spa2HairTip[]>(() => spa2HairTips.map((item) => ({ ...item })));

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'services' | 'tips' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Services CRUD ----
  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceEditId, setServiceEditId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Spa2HairService, 'id'>>(EMPTY_SERVICE);
  const [serviceDeleteId, setServiceDeleteId] = useState<string | null>(null);

  const openCreateService = () => {
    setServiceForm(EMPTY_SERVICE);
    setServiceEditId(null);
    setServiceDialog(true);
  };
  const openEditService = (item: Spa2HairService) => {
    const { id, ...rest } = item;
    setServiceForm({ ...rest, concerns: [...rest.concerns] });
    setServiceEditId(id);
    setServiceDialog(true);
  };
  const submitService = () => {
    const next: Omit<Spa2HairService, 'id'> = {
      ...serviceForm,
      price: Number(serviceForm.price),
      concerns: serviceForm.concerns.map((c) => c.trim()).filter(Boolean),
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
  const reorderServices = (next: Spa2HairService[]) => {
    setServices(next);
    markDirty();
  };

  const updateConcern = (idx: number, value: string) => {
    setServiceForm((p) => ({
      ...p,
      concerns: p.concerns.map((c, i) => (i === idx ? value : c)),
    }));
  };
  const addConcern = () => setServiceForm((p) => ({ ...p, concerns: [...p.concerns, ''] }));
  const removeConcern = (idx: number) =>
    setServiceForm((p) => ({ ...p, concerns: p.concerns.filter((_, i) => i !== idx) }));

  // ---- Tips CRUD (inline, no dialog) ----
  const [tipDeleteId, setTipDeleteId] = useState<string | null>(null);

  const addTip = () => {
    setTips((prev) => [...prev, withId({ ...EMPTY_TIP })]);
    markDirty();
  };
  const updateTip = (id: string, key: 'icon' | 'tip', value: string) => {
    setTips((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
    markDirty();
  };
  const confirmDeleteTip = () => {
    setTips((prev) => prev.filter((item) => item.id !== tipDeleteId));
    setTipDeleteId(null);
    markDirty();
  };
  const reorderTips = (next: Spa2HairTip[]) => {
    setTips(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2HairBeautyBanner });
    setServices(spa2HairServices.map((s) => ({ ...s, concerns: [...s.concerns] })));
    setTips(spa2HairTips.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('hair_beauty.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.hair_beauty')}
      publicPath={paths.spa2.hairBeauty}
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
          label={t('hair_beauty.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="services"
          label={t('hair_beauty.services_section')}
          icon={<Iconify icon="solar:magic-stick-3-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tips"
          label={t('hair_beauty.tips_section')}
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

      {/* Banner - cream-bg hero, no image field (hero image is fixed) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('hair_beauty.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('hair_beauty.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('hair_beauty.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('hair_beauty.banner_subtitle')}
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

      {/* Services */}
      {tab === 'services' && (
        <SectionCard
          title={t('hair_beauty.services_section')}
          icon="solar:magic-stick-3-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateService}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('hair_beauty.add_service_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('hair_beauty.drag_hint')}
          </Typography>
          {services.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('hair_beauty.no_services')}
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

      {/* Tips */}
      {tab === 'tips' && (
        <Grid container spacing={3}>
          <Grid xs={12}>
            <SectionCard
              title={t('hair_beauty.tips_section')}
              icon="solar:lightbulb-bold-duotone"
              action={
                <Button
                  size="small"
                  onClick={addTip}
                  startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                >
                  {t('hair_beauty.add_tip_btn')}
                </Button>
              }
            >
              {tips.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ py: 3, textAlign: 'center' }}
                >
                  {t('hair_beauty.no_tips')}
                </Typography>
              )}
              <Spa2SortableGrid items={tips} onReorder={reorderTips}>
                <Stack spacing={1.5}>
                  {tips.map((item) => (
                    <Spa2SortableItem key={item.id} id={item.id}>
                      {(sortable) => (
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                          sx={{ p: 1.5, borderRadius: 2.5, bgcolor: 'background.neutral' }}
                        >
                          <Spa2DragHandle sortable={sortable} />
                          <TextField
                            label={t('hair_beauty.form_tip_icon')}
                            value={item.icon}
                            onChange={(e) => updateTip(item.id, 'icon', e.target.value)}
                            size="small"
                            sx={{ width: 96 }}
                          />
                          <TextField
                            label={t('hair_beauty.form_tip_text')}
                            value={item.tip}
                            onChange={(e) => updateTip(item.id, 'tip', e.target.value)}
                            fullWidth
                            multiline
                            minRows={2}
                            size="small"
                          />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setTipDeleteId(item.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                      )}
                    </Spa2SortableItem>
                  ))}
                </Stack>
              </Spa2SortableGrid>
            </SectionCard>
          </Grid>
          <Grid xs={12}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Box sx={{ bgcolor: SPA2_CREAM, p: 3 }}>
                  <Grid container spacing={2}>
                    {tips.map((item) => (
                      <Grid key={item.id} xs={12} sm={6} md={4}>
                        <TipPreviewCard tip={item} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2HairBeautyPageView banner={banner} services={services} tips={tips} />
        </Box>
      )}

      {/* Service add/edit dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {serviceEditId ? t('common.edit') : t('hair_beauty.add_service_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('hair_beauty.form_service_name')}
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('hair_beauty.form_service_duration')}
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('hair_beauty.form_service_price')}
                    type="number"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('hair_beauty.form_service_icon')}
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:magic-stick-3-bold-duotone"
                />
                <TextField
                  label={t('hair_beauty.form_service_desc')}
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <ConcernsMiniListField
                  label={t('hair_beauty.form_concerns')}
                  addLabel={t('hair_beauty.add_concern_btn')}
                  placeholder={t('hair_beauty.concern_placeholder')}
                  items={serviceForm.concerns}
                  onChangeItem={updateConcern}
                  onAddItem={addConcern}
                  onRemoveItem={removeConcern}
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
        title={t('hair_beauty.service_delete_title')}
        content={t('hair_beauty.service_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteService}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!tipDeleteId}
        onClose={() => setTipDeleteId(null)}
        title={t('hair_beauty.tip_delete_title')}
        content={t('hair_beauty.tip_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTip}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
