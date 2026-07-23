import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2MedicalSpaBanner,
  spa2MedicalTreatments,
  type Spa2AdjustableImage,
  spa2MedicalSpaCategories,
  spa2MedicalSpaCredentials,
  type Spa2MedicalSpaBanner,
  type Spa2MedicalTreatment,
  type Spa2MedicalSpaCategory,
  type Spa2MedicalSpaCredential,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2ContentPageHero3,
  Spa2MedicalSpaPageView,
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
// Spa2MedicalSpaPageView renders on the public /spa2/medical-spa page: the
// page banner, the dark "credentials" trust bar, the treatment category
// filters and the medical-treatment catalog (with its detail dialog) - read
// from and written back in the same shape as src/_mock/_spa2, the single
// source of truth shared with the public view. The "banner" tab reuses
// Spa2ContentPageHero3 and the "preview" tab reuses Spa2MedicalSpaPageView
// itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_CREDENTIAL_FORM = { icon: 'solar:diploma-bold', text: '' };
const EMPTY_TREATMENT_FORM = {
  category: 'anti-aging',
  icon: 'solar:bolt-bold-duotone',
  name: '',
  price: 0,
  sessions: '',
  downtime: '',
  desc: '',
  certifications: '',
  before: '',
  after: '',
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

// Mirrors a single credential row in the dark trust bar under the hero.
function CredentialPreview({ icon, text }: { icon: string; text: string }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ bgcolor: SPA2_INK, borderRadius: 2, p: 1.5 }}
    >
      <Iconify icon={icon || 'solar:diploma-bold'} width={16} sx={{ color: '#5AB5A3' }} />
      <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
        {text || 'Nội dung chứng nhận'}
      </Typography>
    </Stack>
  );
}

// Mirrors a single treatment's quick-view SoftCard on the public page.
function TreatmentPreviewCard({
  icon,
  name,
  desc,
  price,
  sessions,
  downtime,
}: Spa2MedicalTreatment) {
  return (
    <Card
      sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 3,
          bgcolor: SPA2_CREAM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Iconify icon={icon || 'solar:bolt-bold-duotone'} width={24} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75, fontSize: 14 }}>
        {name || 'Tên liệu trình'}
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}>
        {(desc || 'Mô tả ngắn…').slice(0, 90)}
      </Typography>
      <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
        <Chip
          label={sessions || 'Số buổi'}
          size="small"
          sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary', fontSize: 11 }}
        />
        <Chip
          label={`Downtime: ${downtime || '—'}`}
          size="small"
          sx={{
            bgcolor: downtime === 'Không' ? '#E8F5E9' : '#FFF8EE',
            color: downtime === 'Không' ? '#2E7D32' : '#854F0B',
            fontSize: 11,
          }}
        />
      </Stack>
      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 14 }}>
        {formatVND(price)}
      </Typography>
    </Card>
  );
}

// Mirrors the full "Detail dialog" content exactly as rendered on the
// public page when a treatment card is clicked.
function TreatmentDetailPreview({
  icon,
  name,
  desc,
  price,
  sessions,
  downtime,
  certifications,
  before,
  after,
}: Spa2MedicalTreatment) {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
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
          <Iconify icon={icon || 'solar:bolt-bold-duotone'} width={24} sx={{ color: SPA2_TEAL }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: SPA2_INK }}>
            {name || 'Tên liệu trình'}
          </Typography>
          <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
            {certifications.map((c) => (
              <Chip
                key={c}
                label={c}
                size="small"
                sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
      <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2, fontSize: 13.5 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        {[
          { label: 'Số buổi', value: sessions },
          { label: 'Thời gian hồi phục', value: downtime },
        ].map((i) => (
          <Grid key={i.label} xs={6}>
            <Box sx={{ p: 1.5, bgcolor: SPA2_CREAM, borderRadius: 2 }}>
              <Typography sx={{ fontSize: 11, color: 'text.secondary', mb: 0.25 }}>
                {i.label}
              </Typography>
              <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 13 }}>
                {i.value || '—'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        {[
          {
            label: 'Trước điều trị',
            value: before,
            icon: 'solar:info-circle-bold',
            color: '#0C447C',
          },
          {
            label: 'Sau điều trị',
            value: after,
            icon: 'solar:check-circle-bold',
            color: SPA2_TEAL,
          },
        ].map((i) => (
          <Grid key={i.label} xs={6}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <Iconify icon={i.icon} width={15} sx={{ color: i.color, flexShrink: 0, mt: '2px' }} />
              <Box>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{i.label}</Typography>
                <Typography sx={{ fontSize: 12, color: SPA2_INK }}>{i.value || '—'}</Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontSize: 12 }}>
        Bắt buộc tư vấn bác sĩ 1-1 trước khi thực hiện bất kỳ liệu trình nào.
      </Alert>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            flex: 1,
            borderRadius: 99,
            py: 1.3,
            textAlign: 'center',
            bgcolor: SPA2_TEAL,
            color: 'white',
            fontSize: 13.5,
          }}
        >
          Đặt lịch tư vấn
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: SPA2_TEAL, whiteSpace: 'nowrap' }}>
          {formatVND(price)}
        </Typography>
      </Stack>
    </Box>
  );
}

export function Spa2MedicalSpaManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2MedicalSpaBanner>(() => ({
    ...spa2MedicalSpaBanner,
    image: { ...spa2MedicalSpaBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'credentials' | 'categories' | 'treatments' | 'preview'
  >('banner');
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

  // ---- Credentials ----
  const [credentials, setCredentials] = useState<Spa2MedicalSpaCredential[]>(() =>
    spa2MedicalSpaCredentials.map((c) => ({ ...c }))
  );
  const [credentialForm, setCredentialForm] = useState(EMPTY_CREDENTIAL_FORM);
  const [credentialDialog, setCredentialDialog] = useState(false);
  const [credentialEditId, setCredentialEditId] = useState<string | null>(null);
  const [credentialDeleteId, setCredentialDeleteId] = useState<string | null>(null);

  const openCreateCredential = () => {
    setCredentialForm(EMPTY_CREDENTIAL_FORM);
    setCredentialEditId(null);
    setCredentialDialog(true);
  };
  const openEditCredential = (item: Spa2MedicalSpaCredential) => {
    setCredentialForm({ icon: item.icon, text: item.text });
    setCredentialEditId(item.id);
    setCredentialDialog(true);
  };
  const submitCredential = () => {
    if (credentialEditId) {
      setCredentials((prev) =>
        prev.map((c) => (c.id === credentialEditId ? { ...c, ...credentialForm } : c))
      );
    } else {
      setCredentials((prev) => [...prev, withId(credentialForm)]);
    }
    setCredentialDialog(false);
    markDirty();
  };
  const confirmDeleteCredential = () => {
    setCredentials((prev) => prev.filter((c) => c.id !== credentialDeleteId));
    setCredentialDeleteId(null);
    markDirty();
  };

  // ---- Categories ----
  const [categories, setCategories] = useState<Spa2MedicalSpaCategory[]>(() =>
    spa2MedicalSpaCategories.map((c) => ({ ...c }))
  );
  const realCategories = useMemo(() => categories.filter((c) => c.value !== 'all'), [categories]);
  const updateCategory = (idx: number, patch: Partial<Spa2MedicalSpaCategory>) => {
    setCategories((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
    markDirty();
  };
  const addCategory = () => {
    setCategories((prev) => [...prev, { value: `cat-${prev.length}`, label: '' }]);
    markDirty();
  };
  const removeCategory = (idx: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };

  // ---- Treatments ----
  const [treatments, setTreatments] = useState<Spa2MedicalTreatment[]>(() =>
    spa2MedicalTreatments.map((d) => ({ ...d, certifications: [...d.certifications] }))
  );
  const [treatmentFilter, setTreatmentFilter] = useState('all');
  const filteredTreatments = useMemo(
    () =>
      treatmentFilter === 'all'
        ? treatments
        : treatments.filter((d) => d.category === treatmentFilter),
    [treatments, treatmentFilter]
  );
  const [treatmentForm, setTreatmentForm] = useState(EMPTY_TREATMENT_FORM);
  const [treatmentDialog, setTreatmentDialog] = useState(false);
  const [treatmentEditId, setTreatmentEditId] = useState<string | null>(null);
  const [treatmentDeleteId, setTreatmentDeleteId] = useState<string | null>(null);
  const [treatmentViewItem, setTreatmentViewItem] = useState<Spa2MedicalTreatment | null>(null);

  const openCreateTreatment = () => {
    setTreatmentForm({
      ...EMPTY_TREATMENT_FORM,
      category: realCategories[0]?.value ?? 'anti-aging',
    });
    setTreatmentEditId(null);
    setTreatmentDialog(true);
  };
  const openEditTreatment = (item: Spa2MedicalTreatment) => {
    setTreatmentForm({
      category: item.category,
      icon: item.icon,
      name: item.name,
      price: item.price,
      sessions: item.sessions,
      downtime: item.downtime,
      desc: item.desc,
      certifications: item.certifications.join('\n'),
      before: item.before,
      after: item.after,
    });
    setTreatmentEditId(item.id);
    setTreatmentDialog(true);
  };
  const treatmentCertsPreview = treatmentForm.certifications
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const submitTreatment = () => {
    const next = {
      category: treatmentForm.category,
      icon: treatmentForm.icon,
      name: treatmentForm.name,
      price: Number(treatmentForm.price),
      sessions: treatmentForm.sessions,
      downtime: treatmentForm.downtime,
      desc: treatmentForm.desc,
      certifications: treatmentCertsPreview,
      before: treatmentForm.before,
      after: treatmentForm.after,
    };
    if (treatmentEditId) {
      setTreatments((prev) => prev.map((d) => (d.id === treatmentEditId ? { ...d, ...next } : d)));
    } else {
      setTreatments((prev) => [...prev, withId(next)]);
    }
    setTreatmentDialog(false);
    markDirty();
  };
  const confirmDeleteTreatment = () => {
    setTreatments((prev) => prev.filter((d) => d.id !== treatmentDeleteId));
    setTreatmentDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2MedicalSpaBanner, image: { ...spa2MedicalSpaBanner.image } });
    setCredentials(spa2MedicalSpaCredentials.map((c) => ({ ...c })));
    setCategories(spa2MedicalSpaCategories.map((c) => ({ ...c })));
    setTreatments(
      spa2MedicalTreatments.map((d) => ({ ...d, certifications: [...d.certifications] }))
    );
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('medical_spa.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.medical_spa')}
      publicPath={paths.spa2.medicalSpa}
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
          label={t('medical_spa.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="credentials"
          label={t('medical_spa.credentials_section')}
          icon={<Iconify icon="solar:shield-check-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('medical_spa.categories_section')}
          icon={<Iconify icon="solar:folder-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="treatments"
          label={t('medical_spa.treatments_section')}
          icon={<Iconify icon="solar:cpu-bolt-bold-duotone" width={20} />}
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
              title={t('medical_spa.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('medical_spa.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('medical_spa.banner_image_help')}
                />
                <TextField
                  label={t('medical_spa.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('medical_spa.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('medical_spa.banner_subtitle')}
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

      {/* Credentials */}
      {tab === 'credentials' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <SectionCard
              title={t('medical_spa.credentials_section')}
              icon="solar:shield-check-bold-duotone"
              action={
                <Button
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={openCreateCredential}
                  sx={{ color: SPA2_TEAL }}
                >
                  {t('medical_spa.add_credential_btn')}
                </Button>
              }
            >
              <Stack spacing={1.5}>
                {credentials.map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${SPA2_CREAM_DARK}` }}
                  >
                    <Iconify icon={item.icon} width={20} sx={{ color: SPA2_TEAL }} />
                    <Typography sx={{ flex: 1, fontSize: 13, color: SPA2_INK }}>
                      {item.text}
                    </Typography>
                    <IconButton size="small" onClick={() => openEditCredential(item)}>
                      <Iconify icon="solar:pen-bold" width={16} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setCredentialDeleteId(item.id)}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={5}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Stack spacing={1} sx={{ bgcolor: SPA2_INK, borderRadius: 2, p: 2 }}>
                {credentials.map((item) => (
                  <CredentialPreview key={item.id} icon={item.icon} text={item.text} />
                ))}
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Categories */}
      {tab === 'categories' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('medical_spa.categories_section')}
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addCategory}
            >
              {t('medical_spa.add_category_btn')}
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {categories.map((c, idx) => (
              <Stack key={c.value} direction="row" spacing={1.5} alignItems="center">
                <Chip
                  size="small"
                  label={c.value === 'all' ? t('medical_spa.category_all_locked') : c.value}
                  sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  label={t('medical_spa.form_category_label')}
                  value={c.label}
                  onChange={(e) => updateCategory(idx, { label: e.target.value })}
                />
                {c.value !== 'all' && (
                  <IconButton size="small" color="error" onClick={() => removeCategory(idx)}>
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                )}
              </Stack>
            ))}
          </Stack>
        </Card>
      )}

      {/* Treatments */}
      {tab === 'treatments' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
            flexWrap="wrap"
            useFlexGap
            gap={1}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('medical_spa.treatments_section')}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                select
                size="small"
                value={treatmentFilter}
                onChange={(e) => setTreatmentFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                {categories.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateTreatment}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('medical_spa.add_treatment_btn')}
              </Button>
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            {filteredTreatments.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Box
                  onClick={() => setTreatmentViewItem(item)}
                  sx={{ position: 'relative', cursor: 'pointer' }}
                >
                  <TreatmentPreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditTreatment(item);
                      }}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTreatmentDeleteId(item.id);
                      }}
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

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2MedicalSpaPageView
            banner={banner}
            credentials={credentials}
            categories={categories}
            treatments={treatments}
          />
        </Box>
      )}

      {/* Credential dialog */}
      <Dialog
        open={credentialDialog}
        onClose={() => setCredentialDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {credentialEditId ? t('common.edit') : t('medical_spa.add_credential_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('medical_spa.form_icon')}
                  fullWidth
                  size="small"
                  value={credentialForm.icon}
                  onChange={(e) => setCredentialForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:diploma-bold"
                />
                <TextField
                  label={t('medical_spa.form_credential_text')}
                  fullWidth
                  size="small"
                  value={credentialForm.text}
                  onChange={(e) => setCredentialForm((p) => ({ ...p, text: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_INK, borderRadius: 2, p: 2 }}>
                <CredentialPreview icon={credentialForm.icon} text={credentialForm.text} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCredentialDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitCredential}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {credentialEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!credentialDeleteId}
        onClose={() => setCredentialDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteCredential}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Treatment add/edit dialog */}
      <Dialog
        open={treatmentDialog}
        onClose={() => setTreatmentDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {treatmentEditId ? t('common.edit') : t('medical_spa.add_treatment_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label={t('medical_spa.form_treatment_category')}
                    fullWidth
                    size="small"
                    value={treatmentForm.category}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, category: e.target.value }))}
                  >
                    {realCategories.map((c) => (
                      <MenuItem key={c.value} value={c.value}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={t('medical_spa.form_icon')}
                    fullWidth
                    size="small"
                    value={treatmentForm.icon}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, icon: e.target.value }))}
                    helperText="solar:bolt-bold-duotone"
                  />
                </Stack>
                <TextField
                  label={t('medical_spa.form_treatment_name')}
                  fullWidth
                  size="small"
                  value={treatmentForm.name}
                  onChange={(e) => setTreatmentForm((p) => ({ ...p, name: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('medical_spa.form_treatment_price')}
                    type="number"
                    fullWidth
                    size="small"
                    value={treatmentForm.price}
                    onChange={(e) =>
                      setTreatmentForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                  />
                  <TextField
                    label={t('medical_spa.form_treatment_sessions')}
                    fullWidth
                    size="small"
                    value={treatmentForm.sessions}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, sessions: e.target.value }))}
                  />
                  <TextField
                    label={t('medical_spa.form_treatment_downtime')}
                    fullWidth
                    size="small"
                    value={treatmentForm.downtime}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, downtime: e.target.value }))}
                  />
                </Stack>
                <TextField
                  label={t('medical_spa.form_treatment_desc')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={treatmentForm.desc}
                  onChange={(e) => setTreatmentForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <TextField
                  label={t('medical_spa.form_treatment_certifications')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={treatmentForm.certifications}
                  onChange={(e) =>
                    setTreatmentForm((p) => ({ ...p, certifications: e.target.value }))
                  }
                  helperText={t('medical_spa.form_treatment_certifications_help')}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('medical_spa.form_treatment_before')}
                    fullWidth
                    size="small"
                    value={treatmentForm.before}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, before: e.target.value }))}
                  />
                  <TextField
                    label={t('medical_spa.form_treatment_after')}
                    fullWidth
                    size="small"
                    value={treatmentForm.after}
                    onChange={(e) => setTreatmentForm((p) => ({ ...p, after: e.target.value }))}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <TreatmentDetailPreview
                  id={treatmentEditId ?? 'preview'}
                  category={treatmentForm.category}
                  icon={treatmentForm.icon}
                  name={treatmentForm.name}
                  price={treatmentForm.price}
                  sessions={treatmentForm.sessions}
                  downtime={treatmentForm.downtime}
                  desc={treatmentForm.desc}
                  certifications={treatmentCertsPreview}
                  before={treatmentForm.before}
                  after={treatmentForm.after}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTreatmentDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitTreatment}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {treatmentEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Treatment detail-view dialog (click a card in the list) */}
      <Dialog
        open={!!treatmentViewItem}
        onClose={() => setTreatmentViewItem(null)}
        maxWidth="sm"
        fullWidth
      >
        {treatmentViewItem && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setTreatmentViewItem(null)}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <TreatmentDetailPreview {...treatmentViewItem} />
          </DialogContent>
        )}
      </Dialog>

      <ConfirmDialog
        open={!!treatmentDeleteId}
        onClose={() => setTreatmentDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTreatment}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
