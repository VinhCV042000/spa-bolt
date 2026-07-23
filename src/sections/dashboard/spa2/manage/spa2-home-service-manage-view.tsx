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
import Accordion from '@mui/material/Accordion';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2HomeServices,
  spa2HomeServiceFaqs,
  spa2HomeServiceAreas,
  type Spa2HomeService,
  spa2HomeServiceBanner,
  spa2HomeServiceProcess,
  type Spa2HomeServiceFaq,
  type Spa2HomeServiceArea,
  type Spa2AdjustableImage,
  type Spa2HomeServiceBanner,
  type Spa2HomeServiceProcessStep,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2ContentPageHero3,
  Spa2HomeServicePageView,
} from 'src/sections/spa2/view/spa2-content-pages3';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2HomeServicePageView renders on the public /spa2/home-service page: the
// page banner, the coverage-area chips, the at-home service catalog, the
// 4-step process and the FAQ list - read from and written back in the same
// shape as src/_mock/_spa2, the single source of truth shared with the
// public view. The "banner" tab reuses Spa2ContentPageHero3 and the
// "preview" tab reuses Spa2HomeServicePageView itself, fed with the
// in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_AREA_FORM = { value: '', label: '', note: '' };
const EMPTY_SERVICE_FORM = {
  name: '',
  icon: 'solar:hand-stars-bold-duotone',
  price: 0,
  duration: '',
  desc: '',
  tag: '',
};
const EMPTY_PROCESS_FORM = { title: '', desc: '' };
const EMPTY_FAQ_FORM = { q: '', a: '' };

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

// Mirrors a single service SoftCard on the public page.
function ServicePreviewCard({ name, icon, price, duration, desc, tag }: Spa2HomeService) {
  return (
    <Card
      sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ mb: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 3,
            bgcolor: SPA2_CREAM,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify
            icon={icon || 'solar:hand-stars-bold-duotone'}
            width={24}
            sx={{ color: SPA2_TEAL }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
              {name || 'Tên dịch vụ'}
            </Typography>
            {tag && (
              <Chip
                label={tag}
                size="small"
                sx={{ bgcolor: SPA2_TEAL, color: 'white', fontSize: 10.5 }}
              />
            )}
          </Stack>
          <Chip
            label={duration || 'Thời lượng'}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 10.5 }}
          />
        </Box>
      </Stack>
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 15 }}>
        {formatVND(price)}
      </Typography>
    </Card>
  );
}

// Mirrors a single numbered "How it works" SoftCard on the public page.
function ProcessStepPreviewCard({
  index,
  title,
  desc,
}: {
  index: number;
  title: string;
  desc: string;
}) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        textAlign: 'center',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
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
          mx: 'auto',
          mb: 1.5,
        }}
      >
        {index}
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
        {title || 'Tiêu đề bước'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.6 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Card>
  );
}

// Mirrors a single FAQ Accordion item exactly as rendered on the public
// page (question header + expandable answer body).
function FaqPreviewCard({
  q,
  a,
  defaultExpanded = false,
}: {
  q: string;
  a: string;
  defaultExpanded?: boolean;
}) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        borderRadius: '12px !important',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        '&:before': { display: 'none' },
        '&.Mui-expanded': { borderColor: SPA2_TEAL_LIGHT },
      }}
    >
      <AccordionSummary
        expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}
        sx={{ '& .MuiAccordionSummary-content': { my: 1 } }}
      >
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 13.5 }}>
          {q || 'Câu hỏi…'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: 12.5 }}>
          {a || 'Câu trả lời…'}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

// Mirrors the teal "Khu vực phục vụ" coverage badge bar exactly as rendered
// right under the hero on the public page. When `activeOverride` is omitted
// the chips are clickable and manage their own active state, just like the
// public page; pass it to pin the preview to a specific area (dialog use).
function AreaBadgeBarPreview({
  areas,
  activeOverride,
}: {
  areas: Spa2HomeServiceArea[];
  activeOverride?: string;
}) {
  const [localActive, setLocalActive] = useState(activeOverride ?? areas[0]?.value ?? '');
  const active = activeOverride ?? localActive;
  const activeArea = areas.find((a) => a.value === active) ?? areas[areas.length - 1];
  return (
    <Box sx={{ py: 2, bgcolor: SPA2_TEAL, borderRadius: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ px: 2 }}
      >
        <Typography sx={{ color: 'white', fontSize: 13 }}>Khu vực phục vụ:</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {areas.map((a) => (
            <Chip
              key={a.value}
              label={a.label || 'Khu vực'}
              size="small"
              onClick={activeOverride ? undefined : () => setLocalActive(a.value)}
              sx={{
                cursor: activeOverride ? 'default' : 'pointer',
                bgcolor: a.value === active ? 'white' : 'rgba(255,255,255,0.2)',
                color: a.value === active ? SPA2_TEAL_DARK : 'white',
                fontWeight: a.value === active ? 700 : 400,
              }}
            />
          ))}
        </Stack>
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
          {activeArea?.note || 'Ghi chú khu vực…'}
        </Typography>
      </Stack>
    </Box>
  );
}

export function Spa2HomeServiceManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2HomeServiceBanner>(() => ({
    ...spa2HomeServiceBanner,
    image: { ...spa2HomeServiceBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'areas' | 'services' | 'process' | 'faq' | 'preview'>(
    'banner'
  );
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

  // ---- Coverage areas ----
  const [areas, setAreas] = useState<Spa2HomeServiceArea[]>(() =>
    spa2HomeServiceAreas.map((a) => ({ ...a }))
  );
  const [areaForm, setAreaForm] = useState(EMPTY_AREA_FORM);
  const [areaDialog, setAreaDialog] = useState(false);
  const [areaEditValue, setAreaEditValue] = useState<string | null>(null);
  const [areaDeleteValue, setAreaDeleteValue] = useState<string | null>(null);

  const openCreateArea = () => {
    setAreaForm(EMPTY_AREA_FORM);
    setAreaEditValue(null);
    setAreaDialog(true);
  };
  const openEditArea = (item: Spa2HomeServiceArea) => {
    setAreaForm({ value: item.value, label: item.label, note: item.note });
    setAreaEditValue(item.value);
    setAreaDialog(true);
  };
  const areaValueTaken =
    !!areaForm.value.trim() &&
    areas.some((a) => a.value === areaForm.value.trim() && a.value !== areaEditValue);
  const areaFormValid = !!areaForm.value.trim() && !!areaForm.label.trim() && !areaValueTaken;
  // The live preview reflects the in-progress form merged into the current
  // list (so the badge bar shows exactly what the public page will render),
  // whether creating a brand-new area or editing one already in the list.
  const areaPreviewList = areaEditValue
    ? areas.map((a) => (a.value === areaEditValue ? { ...areaForm } : a))
    : [...areas, { ...areaForm, value: areaForm.value.trim() || '__new__' }];
  const areaPreviewActive = areaEditValue || areaForm.value.trim() || '__new__';
  const submitArea = () => {
    if (!areaFormValid) return;
    if (areaEditValue) {
      setAreas((prev) => prev.map((a) => (a.value === areaEditValue ? { ...areaForm } : a)));
    } else {
      setAreas((prev) => [...prev, { ...areaForm }]);
    }
    setAreaDialog(false);
    markDirty();
  };
  const confirmDeleteArea = () => {
    setAreas((prev) => prev.filter((a) => a.value !== areaDeleteValue));
    setAreaDeleteValue(null);
    markDirty();
  };

  // ---- Services ----
  const [services, setServices] = useState<Spa2HomeService[]>(() =>
    spa2HomeServices.map((s) => ({ ...s }))
  );
  const [serviceForm, setServiceForm] = useState(EMPTY_SERVICE_FORM);
  const [serviceDialog, setServiceDialog] = useState(false);
  const [serviceEditId, setServiceEditId] = useState<string | null>(null);
  const [serviceDeleteId, setServiceDeleteId] = useState<string | null>(null);

  const openCreateService = () => {
    setServiceForm(EMPTY_SERVICE_FORM);
    setServiceEditId(null);
    setServiceDialog(true);
  };
  const openEditService = (item: Spa2HomeService) => {
    setServiceForm({
      name: item.name,
      icon: item.icon,
      price: item.price,
      duration: item.duration,
      desc: item.desc,
      tag: item.tag,
    });
    setServiceEditId(item.id);
    setServiceDialog(true);
  };
  const submitService = () => {
    const next = { ...serviceForm, price: Number(serviceForm.price) };
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

  // ---- Process steps ----
  const [process, setProcess] = useState<Spa2HomeServiceProcessStep[]>(() =>
    spa2HomeServiceProcess.map((p) => ({ ...p }))
  );
  const [processForm, setProcessForm] = useState(EMPTY_PROCESS_FORM);
  const [processDialog, setProcessDialog] = useState(false);
  const [processEditId, setProcessEditId] = useState<string | null>(null);
  const [processDeleteId, setProcessDeleteId] = useState<string | null>(null);

  const openCreateProcess = () => {
    setProcessForm(EMPTY_PROCESS_FORM);
    setProcessEditId(null);
    setProcessDialog(true);
  };
  const openEditProcess = (item: Spa2HomeServiceProcessStep) => {
    setProcessForm({ title: item.title, desc: item.desc });
    setProcessEditId(item.id);
    setProcessDialog(true);
  };
  const submitProcess = () => {
    if (processEditId) {
      setProcess((prev) =>
        prev.map((p) => (p.id === processEditId ? { ...p, ...processForm } : p))
      );
    } else {
      setProcess((prev) => [...prev, withId(processForm)]);
    }
    setProcessDialog(false);
    markDirty();
  };
  const confirmDeleteProcess = () => {
    setProcess((prev) => prev.filter((p) => p.id !== processDeleteId));
    setProcessDeleteId(null);
    markDirty();
  };

  // ---- FAQ ----
  const [faqs, setFaqs] = useState<Spa2HomeServiceFaq[]>(() =>
    spa2HomeServiceFaqs.map((f) => ({ ...f }))
  );
  const [faqForm, setFaqForm] = useState(EMPTY_FAQ_FORM);
  const [faqDialog, setFaqDialog] = useState(false);
  const [faqEditId, setFaqEditId] = useState<string | null>(null);
  const [faqDeleteId, setFaqDeleteId] = useState<string | null>(null);

  const openCreateFaq = () => {
    setFaqForm(EMPTY_FAQ_FORM);
    setFaqEditId(null);
    setFaqDialog(true);
  };
  const openEditFaq = (item: Spa2HomeServiceFaq) => {
    setFaqForm({ q: item.q, a: item.a });
    setFaqEditId(item.id);
    setFaqDialog(true);
  };
  const submitFaq = () => {
    if (faqEditId) {
      setFaqs((prev) => prev.map((f) => (f.id === faqEditId ? { ...f, ...faqForm } : f)));
    } else {
      setFaqs((prev) => [...prev, withId(faqForm)]);
    }
    setFaqDialog(false);
    markDirty();
  };
  const confirmDeleteFaq = () => {
    setFaqs((prev) => prev.filter((f) => f.id !== faqDeleteId));
    setFaqDeleteId(null);
    markDirty();
  };
  const reorderFaqs = (next: Spa2HomeServiceFaq[]) => {
    setFaqs(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2HomeServiceBanner, image: { ...spa2HomeServiceBanner.image } });
    setAreas(spa2HomeServiceAreas.map((a) => ({ ...a })));
    setServices(spa2HomeServices.map((s) => ({ ...s })));
    setProcess(spa2HomeServiceProcess.map((p) => ({ ...p })));
    setFaqs(spa2HomeServiceFaqs.map((f) => ({ ...f })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('home_service.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.home_service')}
      publicPath={paths.spa2.homeService}
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
          label={t('home_service.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="areas"
          label={t('home_service.areas_section')}
          icon={<Iconify icon="solar:map-point-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="services"
          label={t('home_service.services_section')}
          icon={<Iconify icon="solar:hand-stars-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="process"
          label={t('home_service.process_section')}
          icon={<Iconify icon="solar:list-check-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="faq"
          label={t('home_service.faq_section')}
          icon={<Iconify icon="solar:question-circle-bold-duotone" width={20} />}
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
              title={t('home_service.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('home_service.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('home_service.banner_image_help')}
                />
                <TextField
                  label={t('home_service.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('home_service.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('home_service.banner_subtitle')}
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

      {/* Coverage areas */}
      {tab === 'areas' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <SectionCard
              title={t('home_service.areas_section')}
              icon="solar:map-point-bold-duotone"
              action={
                <Button
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={openCreateArea}
                  sx={{ color: SPA2_TEAL }}
                >
                  {t('home_service.add_area_btn')}
                </Button>
              }
            >
              <Stack spacing={1.5}>
                {areas.map((item) => (
                  <Stack
                    key={item.value}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ p: 2, borderRadius: 2, border: `1px solid ${SPA2_CREAM_DARK}` }}
                  >
                    <Chip
                      label={item.label || 'Khu vực'}
                      sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 600 }}
                    />
                    <Typography sx={{ flex: 1, fontSize: 13, color: 'text.secondary' }}>
                      {item.note}
                    </Typography>
                    <IconButton size="small" onClick={() => openEditArea(item)}>
                      <Iconify icon="solar:pen-bold" width={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setAreaDeleteValue(item.value)}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </Stack>
                ))}
                {areas.length === 0 && (
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center' }}>
                    {t('home_service.no_areas')}
                  </Typography>
                )}
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={5}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <AreaBadgeBarPreview areas={areas} />
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Services */}
      {tab === 'services' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('home_service.services_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateService}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('home_service.add_service_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {services.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <ServicePreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
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
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Process steps */}
      {tab === 'process' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('home_service.process_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateProcess}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('home_service.add_process_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {process.map((item, idx) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <ProcessStepPreviewCard index={idx + 1} title={item.title} desc={item.desc} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditProcess(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setProcessDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* FAQ */}
      {tab === 'faq' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <SectionCard
              title={t('home_service.faq_section')}
              icon="solar:question-circle-bold-duotone"
              action={
                <Button
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={openCreateFaq}
                  sx={{ color: SPA2_TEAL }}
                >
                  {t('home_service.add_faq_btn')}
                </Button>
              }
            >
              <Spa2SortableGrid items={faqs} onReorder={reorderFaqs}>
                <Stack spacing={1.5}>
                  {faqs.map((item) => (
                    <Spa2SortableItem key={item.id} id={item.id}>
                      {(sortable) => (
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          spacing={1}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${SPA2_CREAM_DARK}`,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <Spa2DragHandle sortable={sortable} sx={{ mt: 0.25 }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 13.5, mb: 0.5 }}
                            >
                              {item.q}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.7 }}
                            >
                              {item.a}
                            </Typography>
                          </Box>
                          <IconButton size="small" onClick={() => openEditFaq(item)}>
                            <Iconify icon="solar:pen-bold" width={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setFaqDeleteId(item.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                      )}
                    </Spa2SortableItem>
                  ))}
                  {faqs.length === 0 && (
                    <Typography sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center' }}>
                      {t('home_service.no_faqs')}
                    </Typography>
                  )}
                </Stack>
              </Spa2SortableGrid>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={5}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Stack spacing={1.5} sx={{ p: 2, bgcolor: 'background.default' }}>
                  {faqs.map((item, idx) => (
                    <FaqPreviewCard
                      key={item.id}
                      q={item.q}
                      a={item.a}
                      defaultExpanded={idx === 0}
                    />
                  ))}
                </Stack>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2HomeServicePageView
            banner={banner}
            areas={areas}
            services={services}
            process={process}
            faqs={faqs}
          />
        </Box>
      )}

      {/* Area dialog */}
      <Dialog open={areaDialog} onClose={() => setAreaDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {areaEditValue ? t('common.edit') : t('home_service.add_area_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('home_service.form_area_value')}
                  fullWidth
                  size="small"
                  value={areaForm.value}
                  onChange={(e) => setAreaForm((p) => ({ ...p, value: e.target.value.trim() }))}
                  helperText={areaValueTaken ? t('home_service.form_area_value_taken') : 'hcm'}
                  error={areaValueTaken}
                  disabled={!!areaEditValue}
                />
                <TextField
                  label={t('home_service.form_area_label')}
                  fullWidth
                  size="small"
                  value={areaForm.label}
                  onChange={(e) => setAreaForm((p) => ({ ...p, label: e.target.value }))}
                />
                <TextField
                  label={t('home_service.form_area_note')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={areaForm.note}
                  onChange={(e) => setAreaForm((p) => ({ ...p, note: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 1 }}>
                <AreaBadgeBarPreview areas={areaPreviewList} activeOverride={areaPreviewActive} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAreaDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitArea}
            disabled={!areaFormValid}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {areaEditValue ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!areaDeleteValue}
        onClose={() => setAreaDeleteValue(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteArea}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Service dialog */}
      <Dialog open={serviceDialog} onClose={() => setServiceDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {serviceEditId ? t('common.edit') : t('home_service.add_service_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('home_service.form_icon')}
                  fullWidth
                  size="small"
                  value={serviceForm.icon}
                  onChange={(e) => setServiceForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:hand-stars-bold-duotone"
                />
                <TextField
                  label={t('home_service.form_service_name')}
                  fullWidth
                  size="small"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('home_service.form_service_price')}
                    type="number"
                    fullWidth
                    size="small"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                  />
                  <TextField
                    label={t('home_service.form_service_duration')}
                    fullWidth
                    size="small"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm((p) => ({ ...p, duration: e.target.value }))}
                  />
                </Stack>
                <TextField
                  label={t('home_service.form_service_tag')}
                  fullWidth
                  size="small"
                  value={serviceForm.tag}
                  onChange={(e) => setServiceForm((p) => ({ ...p, tag: e.target.value }))}
                />
                <TextField
                  label={t('home_service.form_service_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={serviceForm.desc}
                  onChange={(e) => setServiceForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ServicePreviewCard
                  id={serviceEditId ?? 'preview'}
                  name={serviceForm.name}
                  icon={serviceForm.icon}
                  price={serviceForm.price}
                  duration={serviceForm.duration}
                  desc={serviceForm.desc}
                  tag={serviceForm.tag}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setServiceDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitService}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {serviceEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!serviceDeleteId}
        onClose={() => setServiceDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteService}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Process dialog */}
      <Dialog open={processDialog} onClose={() => setProcessDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {processEditId ? t('common.edit') : t('home_service.add_process_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('home_service.form_process_title')}
                  fullWidth
                  size="small"
                  value={processForm.title}
                  onChange={(e) => setProcessForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('home_service.form_process_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={processForm.desc}
                  onChange={(e) => setProcessForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ProcessStepPreviewCard
                  index={
                    (processEditId
                      ? process.findIndex((p) => p.id === processEditId)
                      : process.length) + 1
                  }
                  title={processForm.title}
                  desc={processForm.desc}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProcessDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitProcess}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {processEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!processDeleteId}
        onClose={() => setProcessDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProcess}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* FAQ dialog */}
      <Dialog open={faqDialog} onClose={() => setFaqDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{faqEditId ? t('common.edit') : t('home_service.add_faq_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('home_service.form_faq_question')}
                  fullWidth
                  size="small"
                  value={faqForm.q}
                  onChange={(e) => setFaqForm((p) => ({ ...p, q: e.target.value }))}
                />
                <TextField
                  label={t('home_service.form_faq_answer')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={faqForm.a}
                  onChange={(e) => setFaqForm((p) => ({ ...p, a: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <FaqPreviewCard q={faqForm.q} a={faqForm.a} defaultExpanded />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFaqDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitFaq}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {faqEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!faqDeleteId}
        onClose={() => setFaqDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteFaq}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
