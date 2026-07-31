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
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2MenFaqs,
  spa2MenPackages,
  spa2MenServices,
  spa2MenSpaStats,
  type Spa2MenFaq,
  spa2MenSpaBanner,
  type Spa2MenPackage,
  type Spa2MenService,
  type Spa2MenSpaStat,
  type Spa2MenSpaBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2MenSpaPageView } from 'src/sections/spa2/view/spa2-content-pages6';
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
// Spa2MenSpaPageView renders on the public /spa2/men-spa page: the dark SPA2_INK
// hero banner (eyebrow/title/subtitle, no image field for this banner type), the
// SPA2_TEAL stats strip (a fixed 4-tile band, edited inline rather than through
// full CRUD), the service menu grid, the membership package grid (one of which
// can be flagged "hot"/highlighted) and the FAQ accordion list - read from and
// written back in the same shape as src/_mock/_spa2, the single source of truth
// shared with the public view. The "Đã chọn: ..." toast on the public page is
// purely client-derived interactive state and is intentionally not editable
// here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_SERVICE: Omit<Spa2MenService, 'id'> = {
  name: '',
  price: 0,
  duration: '',
  icon: 'solar:face-scan-circle-bold-duotone',
  desc: '',
  tags: [],
};

const EMPTY_PACKAGE: Omit<Spa2MenPackage, 'id'> = {
  name: '',
  price: 0,
  sessions: '',
  desc: '',
  hot: false,
};

const EMPTY_FAQ: Omit<Spa2MenFaq, 'id'> = {
  q: '',
  a: '',
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

// Mirrors the dark SPA2_INK hero section rendered by Spa2MenSpaPageView on the
// public page - eyebrow/title/subtitle, no image field for this banner type.
function BannerPreview({ banner }: { banner: Spa2MenSpaBanner }) {
  return (
    <Box sx={{ bgcolor: SPA2_INK, py: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors the SPA2_TEAL stats strip directly below the hero on the public page.
function StatsPreviewStrip({ stats }: { stats: Spa2MenSpaStat[] }) {
  return (
    <Box sx={{ bgcolor: SPA2_TEAL, py: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        {stats.map((s) => (
          <Grid key={s.id} xs={6} sm={3}>
            <Stack alignItems="center" sx={{ color: 'white', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {s.n || '0'}
              </Typography>
              <Typography sx={{ fontSize: 11, opacity: 0.8 }}>{s.l || '—'}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Mirrors one service SoftCard exactly as rendered in the public "Menu Men's
// Spa" grid (see Spa2MenSpaPageView, ~line 400+): icon box, name, duration +
// tag chips, desc, price via formatVND and the "Đặt lịch" action.
function ServicePreviewCard({ service }: { service: Omit<Spa2MenService, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 3,
          bgcolor: '#EFE8DC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Iconify
          icon={service.icon || 'solar:face-scan-circle-bold-duotone'}
          width={24}
          sx={{ color: SPA2_TEAL }}
        />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
        {service.name || '(Chưa đặt tên)'}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
        <Chip
          label={service.duration || '—'}
          size="small"
          sx={{ bgcolor: '#EFE8DC', color: 'text.secondary', fontSize: 11 }}
        />
        {service.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontSize: 11 }}
          />
        ))}
      </Stack>
      <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5, lineHeight: 1.7 }}>
        {service.desc}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 15 }}>
          {formatVND(service.price)}
        </Typography>
        <Button
          size="small"
          sx={{
            borderRadius: 99,
            bgcolor: SPA2_TEAL,
            color: 'white',
            px: 1.75,
            pointerEvents: 'none',
            '&:hover': { bgcolor: SPA2_TEAL_DARK },
          }}
        >
          Đặt lịch
        </Button>
      </Stack>
    </Card>
  );
}

// Mirrors one package card exactly as rendered in the public "Gói định kỳ dành
// cho nam" grid (see Spa2MenSpaPageView, ~line 470+), including the
// hot/highlighted variant.
function PackagePreviewCard({ pkg }: { pkg: Omit<Spa2MenPackage, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: pkg.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: pkg.hot ? '0 16px 40px rgba(46,139,122,0.18)' : 'none',
        height: '100%',
      }}
    >
      {pkg.hot && (
        <Chip
          label="GIÁ TRỊ NHẤT"
          size="small"
          sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700, mb: 1.5 }}
        />
      )}
      <Typography sx={{ fontWeight: 700, color: SPA2_INK, fontSize: 15, mb: 0.5 }}>
        {pkg.name || '(Chưa đặt tên)'}
      </Typography>
      <Chip
        label={pkg.sessions || '—'}
        size="small"
        sx={{ mb: 1.5, bgcolor: '#EFE8DC', color: 'text.secondary' }}
      />
      <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5, lineHeight: 1.7 }}>
        {pkg.desc}
      </Typography>
      <Typography variant="h6" sx={{ color: SPA2_TEAL, mb: 1.5 }}>
        {formatVND(pkg.price)}
      </Typography>
      <Button
        fullWidth
        size="small"
        sx={{
          borderRadius: 99,
          py: 1,
          pointerEvents: 'none',
          bgcolor: pkg.hot ? SPA2_TEAL : 'transparent',
          color: pkg.hot ? 'white' : SPA2_TEAL_DARK,
          border: pkg.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
        }}
      >
        Đăng ký gói
      </Button>
    </Card>
  );
}

// Mirrors one FAQ accordion item as rendered in the public "Câu hỏi từ khách
// hàng nam" section (see Spa2MenSpaPageView, ~line 530+).
function FaqPreviewCard({ faq }: { faq: Omit<Spa2MenFaq, 'id'> }) {
  return (
    <Accordion
      defaultExpanded
      sx={{
        borderRadius: '12px !important',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
          {faq.q || 'Câu hỏi...'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: 13.5 }}>
          {faq.a || 'Câu trả lời...'}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

// ----------------------------------------------------------------------

export function Spa2MenSpaManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2MenSpaBanner>(() => ({ ...spa2MenSpaBanner }));
  const [stats, setStats] = useState<Spa2MenSpaStat[]>(() =>
    spa2MenSpaStats.map((s) => ({ ...s }))
  );
  const [services, setServices] = useState<Spa2MenService[]>(() =>
    spa2MenServices.map((s) => ({ ...s, tags: [...s.tags] }))
  );
  const [packages, setPackages] = useState<Spa2MenPackage[]>(() =>
    spa2MenPackages.map((p) => ({ ...p }))
  );
  const [faqs, setFaqs] = useState<Spa2MenFaq[]>(() => spa2MenFaqs.map((f) => ({ ...f })));

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'services' | 'packages' | 'faqs' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Stats (fixed-size, inline editor, no add/delete) ----
  const updateStat = (id: string, key: 'n' | 'l', value: string) => {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
    markDirty();
  };

  // ---- Services CRUD ----
  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceEditId, setServiceEditId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Spa2MenService, 'id'>>(EMPTY_SERVICE);
  const [serviceDeleteId, setServiceDeleteId] = useState<string | null>(null);

  const openCreateService = () => {
    setServiceForm(EMPTY_SERVICE);
    setServiceEditId(null);
    setServiceDialog(true);
  };
  const openEditService = (item: Spa2MenService) => {
    const { id, ...rest } = item;
    setServiceForm({ ...rest, tags: [...rest.tags] });
    setServiceEditId(id);
    setServiceDialog(true);
  };
  const submitService = () => {
    const next: Omit<Spa2MenService, 'id'> = {
      ...serviceForm,
      price: Number(serviceForm.price),
      tags: serviceForm.tags.map((tag) => tag.trim()).filter(Boolean),
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
  const reorderServices = (next: Spa2MenService[]) => {
    setServices(next);
    markDirty();
  };

  const updateServiceTag = (idx: number, value: string) => {
    setServiceForm((p) => ({ ...p, tags: p.tags.map((tag, i) => (i === idx ? value : tag)) }));
  };
  const addServiceTag = () => setServiceForm((p) => ({ ...p, tags: [...p.tags, ''] }));
  const removeServiceTag = (idx: number) =>
    setServiceForm((p) => ({ ...p, tags: p.tags.filter((_, i) => i !== idx) }));

  // ---- Packages CRUD ----
  const [packageDialog, setPackageDialog] = useState(false);
  const [packageEditId, setPackageEditId] = useState<string | null>(null);
  const [packageForm, setPackageForm] = useState<Omit<Spa2MenPackage, 'id'>>(EMPTY_PACKAGE);
  const [packageDeleteId, setPackageDeleteId] = useState<string | null>(null);

  const openCreatePackage = () => {
    setPackageForm(EMPTY_PACKAGE);
    setPackageEditId(null);
    setPackageDialog(true);
  };
  const openEditPackage = (item: Spa2MenPackage) => {
    const { id, ...rest } = item;
    setPackageForm({ ...rest });
    setPackageEditId(id);
    setPackageDialog(true);
  };
  const submitPackage = () => {
    const next: Omit<Spa2MenPackage, 'id'> = {
      ...packageForm,
      price: Number(packageForm.price),
    };
    if (packageEditId) {
      setPackages((prev) => prev.map((p) => (p.id === packageEditId ? { ...p, ...next } : p)));
    } else {
      setPackages((prev) => [...prev, withId(next)]);
    }
    setPackageDialog(false);
    markDirty();
  };
  const confirmDeletePackage = () => {
    setPackages((prev) => prev.filter((p) => p.id !== packageDeleteId));
    setPackageDeleteId(null);
    markDirty();
  };
  const reorderPackages = (next: Spa2MenPackage[]) => {
    setPackages(next);
    markDirty();
  };

  // ---- FAQs CRUD ----
  const [faqDialog, setFaqDialog] = useState(false);
  const [faqEditId, setFaqEditId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState<Omit<Spa2MenFaq, 'id'>>(EMPTY_FAQ);
  const [faqDeleteId, setFaqDeleteId] = useState<string | null>(null);

  const openCreateFaq = () => {
    setFaqForm(EMPTY_FAQ);
    setFaqEditId(null);
    setFaqDialog(true);
  };
  const openEditFaq = (item: Spa2MenFaq) => {
    setFaqForm({ q: item.q, a: item.a });
    setFaqEditId(item.id);
    setFaqDialog(true);
  };
  const submitFaq = () => {
    const next = { q: faqForm.q, a: faqForm.a };
    if (faqEditId) {
      setFaqs((prev) => prev.map((f) => (f.id === faqEditId ? { ...f, ...next } : f)));
    } else {
      setFaqs((prev) => [...prev, withId(next)]);
    }
    setFaqDialog(false);
    markDirty();
  };
  const confirmDeleteFaq = () => {
    setFaqs((prev) => prev.filter((f) => f.id !== faqDeleteId));
    setFaqDeleteId(null);
    markDirty();
  };
  const reorderFaqs = (next: Spa2MenFaq[]) => {
    setFaqs(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2MenSpaBanner });
    setStats(spa2MenSpaStats.map((s) => ({ ...s })));
    setServices(spa2MenServices.map((s) => ({ ...s, tags: [...s.tags] })));
    setPackages(spa2MenPackages.map((p) => ({ ...p })));
    setFaqs(spa2MenFaqs.map((f) => ({ ...f })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('men_spa.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.men_spa')}
      publicPath={paths.spa2.menSpa}
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
          label={t('men_spa.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="services"
          label={t('men_spa.services_section')}
          icon={<Iconify icon="solar:face-scan-circle-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="packages"
          label={t('men_spa.packages_section')}
          icon={<Iconify icon="solar:box-minimalistic-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="faqs"
          label={t('men_spa.faqs_section')}
          icon={<Iconify icon="solar:question-square-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner + stats */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <SectionCard
                title={t('men_spa.banner_section')}
                icon="solar:gallery-wide-bold-duotone"
              >
                <Stack spacing={2}>
                  <TextField
                    label={t('men_spa.banner_eyebrow')}
                    value={banner.eyebrow}
                    onChange={(e) => updateBanner('eyebrow', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label={t('men_spa.banner_title')}
                    value={banner.title}
                    onChange={(e) => updateBanner('title', e.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                  />
                  <TextField
                    label={t('men_spa.banner_subtitle')}
                    value={banner.subtitle}
                    onChange={(e) => updateBanner('subtitle', e.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                  />
                </Stack>
              </SectionCard>
              <SectionCard title={t('men_spa.stats_section')} icon="solar:chart-2-bold-duotone">
                <Stack spacing={2}>
                  {stats.map((s) => (
                    <Stack key={s.id} direction="row" spacing={2}>
                      <TextField
                        label={t('men_spa.form_stat_number')}
                        value={s.n}
                        onChange={(e) => updateStat(s.id, 'n', e.target.value)}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label={t('men_spa.form_stat_label')}
                        value={s.l}
                        onChange={(e) => updateStat(s.id, 'l', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </Stack>
                  ))}
                </Stack>
              </SectionCard>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <>
                  <BannerPreview banner={banner} />
                  <StatsPreviewStrip stats={stats} />
                </>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Services */}
      {tab === 'services' && (
        <SectionCard
          title={t('men_spa.services_section')}
          icon="solar:face-scan-circle-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateService}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('men_spa.add_service_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('men_spa.drag_hint')}
          </Typography>
          {services.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('men_spa.no_services')}
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

      {/* Packages */}
      {tab === 'packages' && (
        <SectionCard
          title={t('men_spa.packages_section')}
          icon="solar:box-minimalistic-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreatePackage}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('men_spa.add_package_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('men_spa.drag_hint')}
          </Typography>
          {packages.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('men_spa.no_packages')}
            </Typography>
          )}
          <Spa2SortableGrid items={packages} onReorder={reorderPackages}>
            <Grid container spacing={2}>
              {packages.map((p) => (
                <Grid key={p.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={p.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <PackagePreviewCard pkg={p} />
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
                            onClick={() => openEditPackage(p)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setPackageDeleteId(p.id)}
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

      {/* FAQs */}
      {tab === 'faqs' && (
        <SectionCard
          title={t('men_spa.faqs_section')}
          icon="solar:question-square-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateFaq}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('men_spa.add_faq_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('men_spa.drag_hint')}
          </Typography>
          {faqs.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('men_spa.no_faqs')}
            </Typography>
          )}
          <Spa2SortableGrid items={faqs} onReorder={reorderFaqs}>
            <Stack spacing={1.5}>
              {faqs.map((f) => (
                <Spa2SortableItem key={f.id} id={f.id}>
                  {(sortable) => (
                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                      <Spa2DragHandle sortable={sortable} sx={{ mt: 0.5 }} />
                      <Box sx={{ flex: 1 }}>
                        <FaqPreviewCard faq={f} />
                      </Box>
                      <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                        <IconButton size="small" onClick={() => openEditFaq(f)}>
                          <Iconify icon="solar:pen-bold" width={16} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => setFaqDeleteId(f.id)}>
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  )}
                </Spa2SortableItem>
              ))}
            </Stack>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2MenSpaPageView
            banner={banner}
            stats={stats}
            services={services}
            packages={packages}
            faqs={faqs}
          />
        </Box>
      )}

      {/* Service add/edit dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {serviceEditId ? t('common.edit') : t('men_spa.add_service_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('men_spa.form_service_name')}
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('men_spa.form_service_duration')}
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('men_spa.form_service_price')}
                    type="number"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('men_spa.form_service_icon')}
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:face-scan-circle-bold-duotone"
                />
                <TextField
                  label={t('men_spa.form_service_desc')}
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {t('men_spa.form_service_tags')}
                  </Typography>
                  <Stack spacing={1}>
                    {serviceForm.tags.map((tag, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          fullWidth
                          value={tag}
                          onChange={(e) => updateServiceTag(idx, e.target.value)}
                          placeholder={t('men_spa.service_tag_placeholder')}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeServiceTag(idx)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addServiceTag}
                    sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
                  >
                    {t('men_spa.add_service_tag_btn')}
                  </Button>
                </Stack>
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
        title={t('men_spa.service_delete_title')}
        content={t('men_spa.service_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteService}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Package add/edit dialog */}
      <Dialog open={packageDialog} onClose={() => setPackageDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {packageEditId ? t('common.edit') : t('men_spa.add_package_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('men_spa.form_package_name')}
                  value={packageForm.name}
                  onChange={(e) => setPackageForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('men_spa.form_package_sessions')}
                    value={packageForm.sessions}
                    onChange={(e) => setPackageForm((p) => ({ ...p, sessions: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('men_spa.form_package_price')}
                    type="number"
                    value={packageForm.price}
                    onChange={(e) =>
                      setPackageForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('men_spa.form_package_desc')}
                  value={packageForm.desc}
                  onChange={(e) => setPackageForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!packageForm.hot}
                      onChange={(e) => setPackageForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('men_spa.form_package_hot')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <PackagePreviewCard pkg={packageForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPackage}
            disabled={!packageForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {packageEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!packageDeleteId}
        onClose={() => setPackageDeleteId(null)}
        title={t('men_spa.package_delete_title')}
        content={t('men_spa.package_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePackage}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* FAQ add/edit dialog */}
      <Dialog open={faqDialog} onClose={() => setFaqDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {faqEditId ? t('common.edit') : t('men_spa.add_faq_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('men_spa.form_faq_question')}
                  value={faqForm.q}
                  onChange={(e) => setFaqForm((p) => ({ ...p, q: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('men_spa.form_faq_answer')}
                  value={faqForm.a}
                  onChange={(e) => setFaqForm((p) => ({ ...p, a: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={4}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <FaqPreviewCard faq={faqForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFaqDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitFaq}
            disabled={!faqForm.q}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {faqEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!faqDeleteId}
        onClose={() => setFaqDeleteId(null)}
        title={t('men_spa.faq_delete_title')}
        content={t('men_spa.faq_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteFaq}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
