import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

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
  SPA2_MEDICAL_CONSULTATION_BOOKINGS,
  type Spa2MedicalConsultationStatus,
  type Spa2MedicalConsultationBooking,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

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
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

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
  certifications: [] as string[],
  before: '',
  after: '',
};

const MEDICAL_BOOKING_STATUS_LABEL: Record<Spa2MedicalConsultationStatus, string> = {
  new: 'Mới',
  confirmed: 'Đã xác nhận',
  completed: 'Đã hoàn tất',
  cancelled: 'Đã huỷ',
};

const MEDICAL_BOOKING_STATUS_COLOR: Record<
  Spa2MedicalConsultationStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  confirmed: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const MEDICAL_BOOKING_STATUS_OPTIONS: Spa2MedicalConsultationStatus[] = [
  'new',
  'confirmed',
  'completed',
  'cancelled',
];

type MedicalBookingStatusFilter = Spa2MedicalConsultationStatus | 'all';

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
    'banner' | 'credentials' | 'categories' | 'treatments' | 'bookings' | 'preview'
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
  const reorderCredentials = (next: Spa2MedicalSpaCredential[]) => {
    setCredentials(next);
    markDirty();
  };

  // ---- Categories ----
  const [categories, setCategories] = useState<Spa2MedicalSpaCategory[]>(() =>
    spa2MedicalSpaCategories.map((c) => ({ ...c }))
  );
  const realCategories = useMemo(() => categories.filter((c) => c.value !== 'all'), [categories]);
  const allCategory = useMemo(() => categories.find((c) => c.value === 'all'), [categories]);
  const sortableCategories = useMemo(
    () => realCategories.map((c) => ({ ...c, id: c.value })),
    [realCategories]
  );
  const updateCategory = (value: string, patch: Partial<Spa2MedicalSpaCategory>) => {
    setCategories((prev) => prev.map((c) => (c.value === value ? { ...c, ...patch } : c)));
    markDirty();
  };
  const addCategory = () => {
    setCategories((prev) => [...prev, { value: `cat-${prev.length}`, label: '' }]);
    markDirty();
  };
  const removeCategory = (value: string) => {
    setCategories((prev) => prev.filter((c) => c.value !== value));
    markDirty();
  };
  const reorderCategories = (next: Array<Spa2MedicalSpaCategory & { id: string }>) => {
    setCategories((prev) => {
      const allEntry = prev.find((c) => c.value === 'all');
      const reordered = next.map((c) => ({ value: c.value, label: c.label }));
      return allEntry ? [allEntry, ...reordered] : reordered;
    });
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
      certifications: [...item.certifications],
      before: item.before,
      after: item.after,
    });
    setTreatmentEditId(item.id);
    setTreatmentDialog(true);
  };
  const treatmentCertsPreview = treatmentForm.certifications.map((s) => s.trim()).filter(Boolean);
  const addTreatmentCertification = () => {
    setTreatmentForm((p) => ({ ...p, certifications: [...p.certifications, ''] }));
  };
  const updateTreatmentCertification = (idx: number, value: string) => {
    setTreatmentForm((p) => ({
      ...p,
      certifications: p.certifications.map((c, i) => (i === idx ? value : c)),
    }));
  };
  const removeTreatmentCertification = (idx: number) => {
    setTreatmentForm((p) => ({
      ...p,
      certifications: p.certifications.filter((_, i) => i !== idx),
    }));
  };
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
  const reorderTreatments = (next: Spa2MedicalTreatment[]) => {
    setTreatments(next);
    markDirty();
  };

  // ---- Đặt lịch tư vấn (bookings) ----
  const [bookings, setBookings] = useState<Spa2MedicalConsultationBooking[]>(
    SPA2_MEDICAL_CONSULTATION_BOOKINGS
  );
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<MedicalBookingStatusFilter>('all');
  const [bookingTreatmentFilter, setBookingTreatmentFilter] = useState('all');
  const [viewBooking, setViewBooking] = useState<Spa2MedicalConsultationBooking | null>(null);
  const bookingTable = useTable({ defaultRowsPerPage: 5 });

  const filteredBookings = bookings.filter((b) => {
    const q = bookingSearch.toLowerCase();
    const matchSearch =
      !q ||
      b.customer.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.treatmentName.toLowerCase().includes(q) ||
      b.phone.includes(bookingSearch);
    const matchStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    const matchTreatment =
      bookingTreatmentFilter === 'all' || b.treatmentId === bookingTreatmentFilter;
    return matchSearch && matchStatus && matchTreatment;
  });

  const handleSetBookingStatus = (id: number, status: Spa2MedicalConsultationStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setViewBooking((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const bookingCounts = {
    all: bookings.length,
    new: bookings.filter((b) => b.status === 'new').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
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
    setBookings(SPA2_MEDICAL_CONSULTATION_BOOKINGS);
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
          value="bookings"
          label="Đặt lịch tư vấn"
          icon={<Iconify icon="solar:calendar-mark-bold-duotone" width={20} />}
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
              <Spa2SortableGrid items={credentials} onReorder={reorderCredentials}>
                <Stack spacing={1.5}>
                  {credentials.map((item) => (
                    <Spa2SortableItem key={item.id} id={item.id}>
                      {(sortable) => (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${SPA2_CREAM_DARK}` }}
                        >
                          <Spa2DragHandle sortable={sortable} />
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
                      )}
                    </Spa2SortableItem>
                  ))}
                </Stack>
              </Spa2SortableGrid>
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
            {allCategory && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Chip
                  size="small"
                  label={t('medical_spa.category_all_locked')}
                  sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  label={t('medical_spa.form_category_label')}
                  value={allCategory.label}
                  onChange={(e) => updateCategory('all', { label: e.target.value })}
                />
              </Stack>
            )}
            <Spa2SortableGrid items={sortableCategories} onReorder={reorderCategories}>
              <Stack spacing={1.5}>
                {sortableCategories.map((c) => (
                  <Spa2SortableItem key={c.id} id={c.id}>
                    {(sortable) => (
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Spa2DragHandle sortable={sortable} />
                        <Chip
                          size="small"
                          label={c.value}
                          sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          label={t('medical_spa.form_category_label')}
                          value={c.label}
                          onChange={(e) => updateCategory(c.value, { label: e.target.value })}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeCategory(c.value)}
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
          {treatmentFilter !== 'all' && (
            <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5 }}>
              {t('medical_spa.reorder_hint')}
            </Typography>
          )}
          {treatmentFilter === 'all' ? (
            <Spa2SortableGrid items={filteredTreatments} onReorder={reorderTreatments}>
              <Grid container spacing={2}>
                {filteredTreatments.map((item) => (
                  <Grid key={item.id} xs={12} sm={6} md={4}>
                    <Spa2SortableItem id={item.id}>
                      {(sortable) => (
                        <Box
                          onClick={() => setTreatmentViewItem(item)}
                          sx={{ position: 'relative', cursor: 'pointer' }}
                        >
                          <TreatmentPreviewCard {...item} />
                          <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{ position: 'absolute', top: 8, left: 8 }}
                          >
                            <Spa2DragHandle
                              sortable={sortable}
                              sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                            />
                          </Stack>
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
                      )}
                    </Spa2SortableItem>
                  </Grid>
                ))}
              </Grid>
            </Spa2SortableGrid>
          ) : (
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
          )}
        </Card>
      )}

      {/* Đặt lịch tư vấn (bookings) */}
      {tab === 'bookings' && (
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
              Đặt lịch tư vấn
            </Typography>
            <TextField
              select
              size="small"
              value={bookingTreatmentFilter}
              onChange={(e) => {
                setBookingTreatmentFilter(e.target.value);
                bookingTable.onResetPage();
              }}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="all">Tất cả liệu trình</MenuItem>
              {treatments.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Card sx={{ bgcolor: SPA2_CREAM, mb: 2.5 }}>
            <Scrollbar sx={{ minHeight: 108 }}>
              <Stack
                spacing={1}
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2, px: 1 }}
              >
                <Spa2ListAnalytic
                  title="Tất cả"
                  total={bookingCounts.all}
                  percent={100}
                  icon="solar:calendar-mark-bold-duotone"
                  color={SPA2_TEAL}
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'all'}
                  onClick={() => {
                    setBookingStatusFilter('all');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={MEDICAL_BOOKING_STATUS_LABEL.new}
                  total={bookingCounts.new}
                  percent={bookingCounts.all ? (bookingCounts.new / bookingCounts.all) * 100 : 0}
                  icon="solar:bell-bold-duotone"
                  color="#0C447C"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'new'}
                  onClick={() => {
                    setBookingStatusFilter('new');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={MEDICAL_BOOKING_STATUS_LABEL.confirmed}
                  total={bookingCounts.confirmed}
                  percent={
                    bookingCounts.all ? (bookingCounts.confirmed / bookingCounts.all) * 100 : 0
                  }
                  icon="solar:phone-calling-bold-duotone"
                  color="#FFAB00"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'confirmed'}
                  onClick={() => {
                    setBookingStatusFilter('confirmed');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={MEDICAL_BOOKING_STATUS_LABEL.completed}
                  total={bookingCounts.completed}
                  percent={
                    bookingCounts.all ? (bookingCounts.completed / bookingCounts.all) * 100 : 0
                  }
                  icon="solar:check-circle-bold-duotone"
                  color="#22C55E"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'completed'}
                  onClick={() => {
                    setBookingStatusFilter('completed');
                    bookingTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={MEDICAL_BOOKING_STATUS_LABEL.cancelled}
                  total={bookingCounts.cancelled}
                  percent={
                    bookingCounts.all ? (bookingCounts.cancelled / bookingCounts.all) * 100 : 0
                  }
                  icon="solar:close-circle-bold-duotone"
                  color="#637381"
                  unitLabel="lượt đặt"
                  active={bookingStatusFilter === 'cancelled'}
                  onClick={() => {
                    setBookingStatusFilter('cancelled');
                    bookingTable.onResetPage();
                  }}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <TextField
            placeholder="Tìm theo khách hàng, SĐT, email hoặc liệu trình..."
            value={bookingSearch}
            onChange={(e) => {
              setBookingSearch(e.target.value);
              bookingTable.onResetPage();
            }}
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <Tabs
            value={bookingStatusFilter}
            onChange={(_, v: MedicalBookingStatusFilter) => {
              setBookingStatusFilter(v);
              bookingTable.onResetPage();
            }}
            variant="scrollable"
            sx={{
              mb: 2,
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
            }}
          >
            <Tab value="all" label={`Tất cả (${bookingCounts.all})`} />
            <Tab value="new" label={`${MEDICAL_BOOKING_STATUS_LABEL.new} (${bookingCounts.new})`} />
            <Tab
              value="confirmed"
              label={`${MEDICAL_BOOKING_STATUS_LABEL.confirmed} (${bookingCounts.confirmed})`}
            />
            <Tab
              value="completed"
              label={`${MEDICAL_BOOKING_STATUS_LABEL.completed} (${bookingCounts.completed})`}
            />
            <Tab
              value="cancelled"
              label={`${MEDICAL_BOOKING_STATUS_LABEL.cancelled} (${bookingCounts.cancelled})`}
            />
          </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Liệu trình quan tâm</TableCell>
                  <TableCell>Ngày mong muốn</TableCell>
                  <TableCell>Ngày đặt</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings
                  .slice(
                    bookingTable.page * bookingTable.rowsPerPage,
                    bookingTable.page * bookingTable.rowsPerPage + bookingTable.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.phone} · {item.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                          <Typography variant="body2">{item.treatmentName}</Typography>
                          <Chip
                            size="small"
                            label={item.treatmentId}
                            sx={{ bgcolor: SPA2_CREAM, fontSize: 11 }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.preferredDate}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.createdAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={MEDICAL_BOOKING_STATUS_LABEL[item.status]}
                          color={MEDICAL_BOOKING_STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'new' && (
                            <>
                              <Tooltip title="Xác nhận lịch hẹn">
                                <IconButton
                                  size="small"
                                  sx={{ color: SPA2_TEAL_DARK }}
                                  onClick={() => handleSetBookingStatus(item.id, 'confirmed')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ lịch hẹn">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetBookingStatus(item.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {item.status === 'confirmed' && (
                            <>
                              <Tooltip title="Đánh dấu đã hoàn tất">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetBookingStatus(item.id, 'completed')}
                                >
                                  <Iconify icon="solar:diploma-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Huỷ lịch hẹn">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetBookingStatus(item.id, 'cancelled')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="Xem chi tiết">
                            <IconButton size="small" onClick={() => setViewBooking(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filteredBookings.length}
            page={bookingTable.page}
            rowsPerPage={bookingTable.rowsPerPage}
            onPageChange={bookingTable.onChangePage}
            onRowsPerPageChange={bookingTable.onChangeRowsPerPage}
          />
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
                <Stack spacing={1}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('medical_spa.form_treatment_certifications')}
                  </Typography>
                  <Stack spacing={1}>
                    {treatmentForm.certifications.map((cert, idx) => (
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          fullWidth
                          value={cert}
                          onChange={(e) => updateTreatmentCertification(idx, e.target.value)}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeTreatmentCertification(idx)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addTreatmentCertification}
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    {t('medical_spa.add_certification_btn')}
                  </Button>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {t('medical_spa.form_treatment_certifications_help')}
                  </Typography>
                </Stack>
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

      {/* Booking detail dialog */}
      <Dialog open={!!viewBooking} onClose={() => setViewBooking(null)} maxWidth="sm" fullWidth>
        {viewBooking && (
          <>
            <DialogTitle>Chi tiết đặt lịch tư vấn</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ pt: 0.5 }}>
                <TextField
                  label="Khách hàng"
                  value={viewBooking.customer}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Số điện thoại"
                    value={viewBooking.phone}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Email"
                    value={viewBooking.email}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <TextField
                  label="Liệu trình quan tâm"
                  value={`${viewBooking.treatmentName} (${viewBooking.treatmentId})`}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Ngày mong muốn"
                    value={viewBooking.preferredDate}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Ngày đặt"
                    value={viewBooking.createdAt}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <TextField
                  label="Ghi chú"
                  value={viewBooking.note || '—'}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  select
                  label="Trạng thái"
                  value={viewBooking.status}
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    handleSetBookingStatus(
                      viewBooking.id,
                      e.target.value as Spa2MedicalConsultationStatus
                    )
                  }
                >
                  {MEDICAL_BOOKING_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {MEDICAL_BOOKING_STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewBooking(null)}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Spa2ManageShell>
  );
}
