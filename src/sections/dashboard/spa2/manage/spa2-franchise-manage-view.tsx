import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2FranchiseSteps,
  spa2FranchiseStats,
  spa2FranchiseModels,
  spa2FranchiseBanner,
  spa2FranchiseBenefits,
  type Spa2FranchiseStep,
  type Spa2FranchiseStat,
  type Spa2FranchiseModel,
  type Spa2FranchiseBanner,
  type Spa2FranchiseBenefit,
  SPA2_FRANCHISE_APPLICATIONS,
  type Spa2FranchiseApplication,
  type Spa2FranchiseApplicationStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2FranchisePageView } from 'src/sections/spa2/view/spa2-content-pages8';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages8.tsx's
// Spa2FranchisePageView renders on the public /spa2/franchise page: the cream
// PageHero banner (eyebrow/title/subtitle), the teal stat-strip, the "Lợi thế"
// benefits grid, the "Mô hình" investment-model pricing cards (color dot,
// area/roomCount chips, investment price, perks checklist, "PHỔ BIẾN NHẤT"
// badge for the hot model) and the "Quy trình" numbered steps - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The application-form/model-details
// dialog interactive demo state on the public page is purely client-derived
// and is intentionally not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STAT: Omit<Spa2FranchiseStat, 'id'> = { n: '', l: '' };

const EMPTY_BENEFIT: Omit<Spa2FranchiseBenefit, 'id'> = {
  icon: 'solar:medal-star-bold-duotone',
  title: '',
  desc: '',
};

const EMPTY_MODEL: Omit<Spa2FranchiseModel, 'id'> = {
  name: '',
  area: '',
  investment: '',
  color: SPA2_TEAL,
  hot: false,
  roomCount: '',
  perks: [],
};

const EMPTY_STEP: Omit<Spa2FranchiseStep, 'id'> = { title: '', desc: '' };

const APPLICATION_STATUS_LABEL: Record<Spa2FranchiseApplicationStatus, string> = {
  pending: 'Chờ xử lý',
  contacted: 'Đã liên hệ',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

const APPLICATION_STATUS_COLOR: Record<
  Spa2FranchiseApplicationStatus,
  'warning' | 'info' | 'success' | 'error'
> = {
  pending: 'warning',
  contacted: 'info',
  approved: 'success',
  rejected: 'error',
};

const APPLICATION_STATUS_OPTIONS: Spa2FranchiseApplicationStatus[] = [
  'pending',
  'contacted',
  'approved',
  'rejected',
];

type ApplicationStatusFilter = Spa2FranchiseApplicationStatus | 'all';

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

// Mirrors the cream PageHero hero section rendered by Spa2FranchisePageView on
// the public page - eyebrow/title/subtitle over the standard cream/teal brand
// palette (kept lightweight/static, the public hero image is fixed and not
// part of the manageable banner).
function BannerPreview({ banner }: { banner: Spa2FranchiseBanner }) {
  return (
    <Box sx={{ bgcolor: SPA2_CREAM, py: { xs: 6, md: 8 }, textAlign: 'center', px: 3 }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600, maxWidth: 480 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Simplified white-card equivalent of the public teal stat-strip (big number
// + label), used for the admin grid so multiple cards stay readable side by
// side.
function StatPreviewCard({ stat }: { stat: Omit<Spa2FranchiseStat, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, color: SPA2_TEAL }}>
        {stat.n || '—'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
        {stat.l || '(Chưa đặt nhãn)'}
      </Typography>
    </Card>
  );
}

// Mirrors one "Lợi thế" benefit card exactly as rendered in the public
// benefits grid: icon on top, title, desc, centered on a soft card.
function BenefitPreviewCard({ benefit }: { benefit: Omit<Spa2FranchiseBenefit, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Iconify
        icon={benefit.icon || 'solar:medal-star-bold-duotone'}
        width={44}
        sx={{ color: SPA2_TEAL, mb: 1.5 }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {benefit.title || '(Chưa đặt tiêu đề)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {benefit.desc}
      </Typography>
    </Card>
  );
}

// Mirrors one investment-model pricing card exactly as rendered in the
// public "Mô hình" grid: colored dot + name, area/roomCount chips, investment
// price in model.color, perks checklist, "PHỔ BIẾN NHẤT" badge + highlighted
// border for the hot model.
function ModelPreviewCard({ model }: { model: Omit<Spa2FranchiseModel, 'id'> }) {
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 4,
        overflow: 'hidden',
        border: model.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: model.hot ? '0 16px 40px rgba(46,139,122,0.18)' : 'none',
      }}
    >
      {model.hot && (
        <Box
          sx={{
            bgcolor: SPA2_TEAL,
            color: 'white',
            textAlign: 'center',
            py: 0.75,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          PHỔ BIẾN NHẤT
        </Box>
      )}
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: model.color }} />
          <Typography variant="h6" sx={{ color: SPA2_INK }}>
            {model.name || '(Chưa đặt tên)'}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={model.area || '—'}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary' }}
          />
          <Chip
            label={model.roomCount || '—'}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: 'text.secondary' }}
          />
        </Stack>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 0.25 }}>
          Vốn đầu tư dự kiến
        </Typography>
        <Typography sx={{ fontWeight: 700, color: model.color, fontSize: 20, mb: 2 }}>
          {model.investment || '—'} đ
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.25}>
          {model.perks.map((p, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Stack key={idx} direction="row" spacing={1.5} alignItems="flex-start">
              <Iconify
                icon="solar:check-circle-bold"
                width={16}
                sx={{ color: SPA2_TEAL, flexShrink: 0, mt: '3px' }}
              />
              <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
                {p}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

// Mirrors one numbered "Quy trình" step exactly as rendered in the public
// process stepper (circle number + title + desc); the connecting vertical
// line is omitted here since the admin list renders steps as independent
// cards rather than a single vertical stack.
function StepPreviewCard({ step, index }: { step: Omit<Spa2FranchiseStep, 'id'>; index: number }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction="row" spacing={2}>
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
            flexShrink: 0,
          }}
        >
          {index + 1}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
            {step.title || '(Chưa đặt tiêu đề)'}
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
            {step.desc}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

// KPI tile used on the "application_stats" tab.
function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: SPA2_CREAM_DARK,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={20} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: SPA2_INK, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows), matching the water
// therapy manage view's MiniListField convention - used here for the
// investment model's perks checklist.
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

export function Spa2FranchiseManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2FranchiseBanner>(() => ({ ...spa2FranchiseBanner }));
  const [stats, setStats] = useState<Spa2FranchiseStat[]>(() =>
    spa2FranchiseStats.map((item) => ({ ...item }))
  );
  const [benefits, setBenefits] = useState<Spa2FranchiseBenefit[]>(() =>
    spa2FranchiseBenefits.map((item) => ({ ...item }))
  );
  const [models, setModels] = useState<Spa2FranchiseModel[]>(() =>
    spa2FranchiseModels.map((item) => ({ ...item, perks: [...item.perks] }))
  );
  const [steps, setSteps] = useState<Spa2FranchiseStep[]>(() =>
    spa2FranchiseSteps.map((item) => ({ ...item }))
  );
  const [applications, setApplications] = useState<Spa2FranchiseApplication[]>(() =>
    SPA2_FRANCHISE_APPLICATIONS.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    | 'banner'
    | 'stats'
    | 'benefits'
    | 'models'
    | 'steps'
    | 'applications'
    | 'application_stats'
    | 'preview'
  >('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Stats CRUD ----
  const [statDialog, setStatDialog] = useState(false);
  const [statEditId, setStatEditId] = useState<string | null>(null);
  const [statForm, setStatForm] = useState<Omit<Spa2FranchiseStat, 'id'>>(EMPTY_STAT);
  const [statDeleteId, setStatDeleteId] = useState<string | null>(null);

  const openCreateStat = () => {
    setStatForm(EMPTY_STAT);
    setStatEditId(null);
    setStatDialog(true);
  };
  const openEditStat = (item: Spa2FranchiseStat) => {
    const { id, ...rest } = item;
    setStatForm({ ...rest });
    setStatEditId(id);
    setStatDialog(true);
  };
  const submitStat = () => {
    const next: Omit<Spa2FranchiseStat, 'id'> = { ...statForm };
    if (statEditId) {
      setStats((prev) =>
        prev.map((item) => (item.id === statEditId ? { ...item, ...next } : item))
      );
    } else {
      setStats((prev) => [...prev, withId(next)]);
    }
    setStatDialog(false);
    markDirty();
  };
  const confirmDeleteStat = () => {
    setStats((prev) => prev.filter((item) => item.id !== statDeleteId));
    setStatDeleteId(null);
    markDirty();
  };
  const reorderStats = (next: Spa2FranchiseStat[]) => {
    setStats(next);
    markDirty();
  };

  // ---- Benefits CRUD ----
  const [benefitDialog, setBenefitDialog] = useState(false);
  const [benefitEditId, setBenefitEditId] = useState<string | null>(null);
  const [benefitForm, setBenefitForm] = useState<Omit<Spa2FranchiseBenefit, 'id'>>(EMPTY_BENEFIT);
  const [benefitDeleteId, setBenefitDeleteId] = useState<string | null>(null);

  const openCreateBenefit = () => {
    setBenefitForm(EMPTY_BENEFIT);
    setBenefitEditId(null);
    setBenefitDialog(true);
  };
  const openEditBenefit = (item: Spa2FranchiseBenefit) => {
    const { id, ...rest } = item;
    setBenefitForm({ ...rest });
    setBenefitEditId(id);
    setBenefitDialog(true);
  };
  const submitBenefit = () => {
    const next: Omit<Spa2FranchiseBenefit, 'id'> = { ...benefitForm };
    if (benefitEditId) {
      setBenefits((prev) =>
        prev.map((item) => (item.id === benefitEditId ? { ...item, ...next } : item))
      );
    } else {
      setBenefits((prev) => [...prev, withId(next)]);
    }
    setBenefitDialog(false);
    markDirty();
  };
  const confirmDeleteBenefit = () => {
    setBenefits((prev) => prev.filter((item) => item.id !== benefitDeleteId));
    setBenefitDeleteId(null);
    markDirty();
  };
  const reorderBenefits = (next: Spa2FranchiseBenefit[]) => {
    setBenefits(next);
    markDirty();
  };

  // ---- Models CRUD ----
  const [modelDialog, setModelDialog] = useState(false);
  const [modelEditId, setModelEditId] = useState<string | null>(null);
  const [modelForm, setModelForm] = useState<Omit<Spa2FranchiseModel, 'id'>>(EMPTY_MODEL);
  const [modelDeleteId, setModelDeleteId] = useState<string | null>(null);

  const openCreateModel = () => {
    setModelForm(EMPTY_MODEL);
    setModelEditId(null);
    setModelDialog(true);
  };
  const openEditModel = (item: Spa2FranchiseModel) => {
    const { id, ...rest } = item;
    setModelForm({ ...rest, perks: [...rest.perks] });
    setModelEditId(id);
    setModelDialog(true);
  };
  const submitModel = () => {
    const next: Omit<Spa2FranchiseModel, 'id'> = {
      ...modelForm,
      perks: modelForm.perks.map((p) => p.trim()).filter(Boolean),
    };
    if (modelEditId) {
      setModels((prev) =>
        prev.map((item) => (item.id === modelEditId ? { ...item, ...next } : item))
      );
    } else {
      setModels((prev) => [...prev, withId(next)]);
    }
    setModelDialog(false);
    markDirty();
  };
  const confirmDeleteModel = () => {
    setModels((prev) => prev.filter((item) => item.id !== modelDeleteId));
    setModelDeleteId(null);
    markDirty();
  };
  const reorderModels = (next: Spa2FranchiseModel[]) => {
    setModels(next);
    markDirty();
  };

  const updatePerk = (idx: number, value: string) => {
    setModelForm((p) => ({ ...p, perks: p.perks.map((perk, i) => (i === idx ? value : perk)) }));
  };
  const addPerk = () => setModelForm((p) => ({ ...p, perks: [...p.perks, ''] }));
  const removePerk = (idx: number) =>
    setModelForm((p) => ({ ...p, perks: p.perks.filter((_, i) => i !== idx) }));

  // ---- Steps CRUD ----
  const [stepDialog, setStepDialog] = useState(false);
  const [stepEditId, setStepEditId] = useState<string | null>(null);
  const [stepForm, setStepForm] = useState<Omit<Spa2FranchiseStep, 'id'>>(EMPTY_STEP);
  const [stepDeleteId, setStepDeleteId] = useState<string | null>(null);

  const openCreateStep = () => {
    setStepForm(EMPTY_STEP);
    setStepEditId(null);
    setStepDialog(true);
  };
  const openEditStep = (item: Spa2FranchiseStep) => {
    const { id, ...rest } = item;
    setStepForm({ ...rest });
    setStepEditId(id);
    setStepDialog(true);
  };
  const submitStep = () => {
    const next: Omit<Spa2FranchiseStep, 'id'> = { ...stepForm };
    if (stepEditId) {
      setSteps((prev) =>
        prev.map((item) => (item.id === stepEditId ? { ...item, ...next } : item))
      );
    } else {
      setSteps((prev) => [...prev, withId(next)]);
    }
    setStepDialog(false);
    markDirty();
  };
  const confirmDeleteStep = () => {
    setSteps((prev) => prev.filter((item) => item.id !== stepDeleteId));
    setStepDeleteId(null);
    markDirty();
  };
  const reorderSteps = (next: Spa2FranchiseStep[]) => {
    setSteps(next);
    markDirty();
  };

  // ---- Đăng ký nhượng quyền (applications) ----
  const [applicationSearch, setApplicationSearch] = useState('');
  const [applicationStatusFilter, setApplicationStatusFilter] =
    useState<ApplicationStatusFilter>('all');
  const [viewApplication, setViewApplication] = useState<Spa2FranchiseApplication | null>(null);
  const [deleteApplicationId, setDeleteApplicationId] = useState<string | null>(null);
  const applicationTable = useTable({ defaultRowsPerPage: 5 });

  const filteredApplications = applications.filter((item) => {
    const q = applicationSearch.toLowerCase();
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.phone.includes(applicationSearch);
    const matchStatus = applicationStatusFilter === 'all' || item.status === applicationStatusFilter;
    return matchSearch && matchStatus;
  });

  const handleSetApplicationStatus = (id: string, status: Spa2FranchiseApplicationStatus) => {
    setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    setViewApplication((prev) => (prev?.id === id ? { ...prev, status } : prev));
    markDirty();
  };

  const confirmDeleteApplication = () => {
    setApplications((prev) => prev.filter((item) => item.id !== deleteApplicationId));
    setDeleteApplicationId(null);
    markDirty();
  };

  const applicationCounts = {
    all: applications.length,
    pending: applications.filter((item) => item.status === 'pending').length,
    contacted: applications.filter((item) => item.status === 'contacted').length,
    approved: applications.filter((item) => item.status === 'approved').length,
    rejected: applications.filter((item) => item.status === 'rejected').length,
  };

  // ---- Thống kê tổng hợp đăng ký nhượng quyền (derived from applications) ----
  const applicationsThisMonth = useMemo(() => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return applications.filter((item) => item.submittedAt.startsWith(monthKey)).length;
  }, [applications]);

  const applicationCityStats = useMemo(() => {
    const map = new Map<
      string,
      {
        city: string;
        count: number;
        pending: number;
        contacted: number;
        approved: number;
        rejected: number;
      }
    >();
    applications.forEach((item) => {
      const entry = map.get(item.city) ?? {
        city: item.city,
        count: 0,
        pending: 0,
        contacted: 0,
        approved: 0,
        rejected: 0,
      };
      entry.count += 1;
      entry[item.status] += 1;
      map.set(item.city, entry);
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [applications]);

  const topRequestedCity = applicationCityStats[0] ?? null;

  const applicationApprovalRate =
    applicationCounts.approved + applicationCounts.rejected
      ? Math.round(
          (applicationCounts.approved / (applicationCounts.approved + applicationCounts.rejected)) *
            100
        )
      : null;

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2FranchiseBanner });
    setStats(spa2FranchiseStats.map((item) => ({ ...item })));
    setBenefits(spa2FranchiseBenefits.map((item) => ({ ...item })));
    setModels(spa2FranchiseModels.map((item) => ({ ...item, perks: [...item.perks] })));
    setSteps(spa2FranchiseSteps.map((item) => ({ ...item })));
    setApplications(SPA2_FRANCHISE_APPLICATIONS.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('franchise.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.franchise')}
      publicPath={paths.spa2.franchise}
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
          label={t('franchise.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stats"
          label={t('franchise.stats_section')}
          icon={<Iconify icon="solar:chart-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="benefits"
          label={t('franchise.benefits_section')}
          icon={<Iconify icon="solar:medal-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="models"
          label={t('franchise.models_section')}
          icon={<Iconify icon="solar:buildings-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="steps"
          label={t('franchise.steps_section')}
          icon={<Iconify icon="solar:route-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="applications"
          label={t('franchise.applications_section')}
          icon={<Iconify icon="solar:file-text-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="application_stats"
          label={t('franchise.application_stats_section')}
          icon={<Iconify icon="solar:chart-square-bold-duotone" width={20} />}
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
              title={t('franchise.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('franchise.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('franchise.banner_subtitle')}
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

      {/* Stats */}
      {tab === 'stats' && (
        <SectionCard
          title={t('franchise.stats_section')}
          icon="solar:chart-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateStat}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_stat_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {stats.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_stats')}
            </Typography>
          )}
          <Spa2SortableGrid items={stats} onReorder={reorderStats}>
            <Grid container spacing={2}>
              {stats.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <StatPreviewCard stat={item} />
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
                            onClick={() => openEditStat(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setStatDeleteId(item.id)}
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

      {/* Benefits */}
      {tab === 'benefits' && (
        <SectionCard
          title={t('franchise.benefits_section')}
          icon="solar:medal-star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateBenefit}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_benefit_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {benefits.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_benefits')}
            </Typography>
          )}
          <Spa2SortableGrid items={benefits} onReorder={reorderBenefits}>
            <Grid container spacing={2}>
              {benefits.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <BenefitPreviewCard benefit={item} />
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
                            onClick={() => openEditBenefit(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setBenefitDeleteId(item.id)}
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

      {/* Models */}
      {tab === 'models' && (
        <SectionCard
          title={t('franchise.models_section')}
          icon="solar:buildings-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateModel}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_model_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {models.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_models')}
            </Typography>
          )}
          <Spa2SortableGrid items={models} onReorder={reorderModels}>
            <Grid container spacing={2}>
              {models.map((item) => (
                <Grid key={item.id} xs={12} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ModelPreviewCard model={item} />
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
                            onClick={() => openEditModel(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setModelDeleteId(item.id)}
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

      {/* Steps */}
      {tab === 'steps' && (
        <SectionCard
          title={t('franchise.steps_section')}
          icon="solar:route-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateStep}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('franchise.add_step_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('franchise.drag_hint')}
          </Typography>
          {steps.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('franchise.no_steps')}
            </Typography>
          )}
          <Spa2SortableGrid items={steps} onReorder={reorderSteps}>
            <Grid container spacing={2}>
              {steps.map((item, idx) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <StepPreviewCard step={item} index={idx} />
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
                            onClick={() => openEditStep(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setStepDeleteId(item.id)}
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

      {/* Đăng ký nhượng quyền (applications submitted by prospective franchisees) */}
      {tab === 'applications' && (
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
              {t('franchise.applications_section')}
            </Typography>
          </Stack>

          <TextField
            placeholder={t('franchise.application_search_placeholder')}
            value={applicationSearch}
            onChange={(e) => {
              setApplicationSearch(e.target.value);
              applicationTable.onResetPage();
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
            value={applicationStatusFilter}
            onChange={(_, v: ApplicationStatusFilter) => {
              setApplicationStatusFilter(v);
              applicationTable.onResetPage();
            }}
            variant="scrollable"
            sx={{
              mb: 2,
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
            }}
          >
            <Tab value="all" label={`${t('common.all')} (${applicationCounts.all})`} />
            {APPLICATION_STATUS_OPTIONS.map((status) => (
              <Tab
                key={status}
                value={status}
                label={`${APPLICATION_STATUS_LABEL[status]} (${applicationCounts[status]})`}
              />
            ))}
          </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('franchise.application_col_contact')}</TableCell>
                  <TableCell>{t('franchise.application_col_city')}</TableCell>
                  <TableCell>{t('franchise.application_col_budget')}</TableCell>
                  <TableCell>{t('franchise.application_col_submitted_at')}</TableCell>
                  <TableCell>{t('franchise.application_col_status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications
                  .slice(
                    applicationTable.page * applicationTable.rowsPerPage,
                    applicationTable.page * applicationTable.rowsPerPage +
                      applicationTable.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.phone} · {item.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.city}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.budgetRange}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.submittedAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={APPLICATION_STATUS_LABEL[item.status]}
                          color={APPLICATION_STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'pending' && (
                            <Tooltip title={t('franchise.application_action_contact')}>
                              <IconButton
                                size="small"
                                sx={{ color: SPA2_TEAL_DARK }}
                                onClick={() => handleSetApplicationStatus(item.id, 'contacted')}
                              >
                                <Iconify icon="solar:phone-calling-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {(item.status === 'pending' || item.status === 'contacted') && (
                            <>
                              <Tooltip title={t('franchise.application_action_approve')}>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetApplicationStatus(item.id, 'approved')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t('franchise.application_action_reject')}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetApplicationStatus(item.id, 'rejected')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title={t('franchise.application_action_view')}>
                            <IconButton size="small" onClick={() => setViewApplication(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.delete')}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteApplicationId(item.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      {t('franchise.no_applications')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filteredApplications.length}
            page={applicationTable.page}
            rowsPerPage={applicationTable.rowsPerPage}
            onPageChange={applicationTable.onChangePage}
            onRowsPerPageChange={applicationTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Thống kê tổng hợp đăng ký nhượng quyền — derived entirely from the
          applications data above (NOT the same as the static "stats" tab,
          which holds fixed investment/company figures). */}
      {tab === 'application_stats' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:file-text-bold"
                label={t('franchise.application_stat_total')}
                value={applicationCounts.all}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:calendar-mark-bold"
                label={t('franchise.application_stat_this_month')}
                value={applicationsThisMonth}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:map-point-bold"
                label={t('franchise.application_stat_top_city')}
                value={topRequestedCity?.city ?? '—'}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:check-circle-bold"
                label={t('franchise.application_stat_approval_rate')}
                value={applicationApprovalRate === null ? '—' : `${applicationApprovalRate}%`}
              />
            </Grid>
          </Grid>

          <Card sx={{ bgcolor: SPA2_CREAM_DARK, borderRadius: 3, p: 2 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('franchise.application_stat_by_status')}
            </Typography>
            <Scrollbar sx={{ maxHeight: 120 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                spacing={2}
                sx={{ py: 1 }}
              >
                <Spa2ListAnalytic
                  icon="solar:file-text-bold-duotone"
                  title={t('common.all')}
                  total={applicationCounts.all}
                  percent={100}
                  active={applicationStatusFilter === 'all'}
                  onClick={() => setApplicationStatusFilter('all')}
                />
                {APPLICATION_STATUS_OPTIONS.map((status) => (
                  <Spa2ListAnalytic
                    key={status}
                    icon="solar:bell-bold-duotone"
                    title={APPLICATION_STATUS_LABEL[status]}
                    total={applicationCounts[status]}
                    percent={
                      applicationCounts.all
                        ? (applicationCounts[status] / applicationCounts.all) * 100
                        : 0
                    }
                    active={applicationStatusFilter === status}
                    onClick={() => setApplicationStatusFilter(status)}
                  />
                ))}
              </Stack>
            </Scrollbar>
          </Card>

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('franchise.application_stat_city_col')}</TableCell>
                    <TableCell align="center">{t('franchise.application_stat_count_col')}</TableCell>
                    <TableCell align="center">
                      {t('franchise.application_stat_pending_contacted_col')}
                    </TableCell>
                    <TableCell align="center">
                      {t('franchise.application_stat_approved_rejected_col')}
                    </TableCell>
                    <TableCell sx={{ minWidth: 180 }}>
                      {t('franchise.application_stat_approval_rate_col')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicationCityStats.map((city) => {
                    const resolved = city.approved + city.rejected;
                    const rate = resolved ? Math.round((city.approved / resolved) * 100) : null;
                    return (
                      <TableRow key={city.city} hover>
                        <TableCell>
                          <Typography variant="body2">{city.city}</Typography>
                        </TableCell>
                        <TableCell align="center">{city.count}</TableCell>
                        <TableCell align="center">
                          <Chip
                            size="small"
                            label={`${city.pending}/${city.contacted}`}
                            sx={{ bgcolor: 'background.neutral' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Box component="span" sx={{ fontSize: 13, color: 'success.main' }}>
                              {city.approved}
                            </Box>
                            <Box component="span" sx={{ fontSize: 13, color: 'error.main' }}>
                              {city.rejected}
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {rate === null ? (
                            <Typography variant="caption" color="text.disabled">
                              —
                            </Typography>
                          ) : (
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <LinearProgress
                                variant="determinate"
                                value={rate}
                                sx={{
                                  flex: 1,
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: SPA2_CREAM_DARK,
                                  '& .MuiLinearProgress-bar': { bgcolor: SPA2_TEAL },
                                }}
                              />
                              <Typography variant="caption" sx={{ minWidth: 34, fontWeight: 600 }}>
                                {rate}%
                              </Typography>
                            </Stack>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2FranchisePageView
            banner={banner}
            stats={stats}
            benefits={benefits}
            models={models}
            steps={steps}
          />
        </Box>
      )}

      {/* Stat add/edit dialog */}
      <Dialog open={statDialog} onClose={() => setStatDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {statEditId ? t('common.edit') : t('franchise.add_stat_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_stat_number')}
                  value={statForm.n}
                  onChange={(e) => setStatForm((p) => ({ ...p, n: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('franchise.form_stat_label')}
                  value={statForm.l}
                  onChange={(e) => setStatForm((p) => ({ ...p, l: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <StatPreviewCard stat={statForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStat}
            disabled={!statForm.n || !statForm.l}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {statEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!statDeleteId}
        onClose={() => setStatDeleteId(null)}
        title={t('franchise.stat_delete_title')}
        content={t('franchise.stat_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStat}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Benefit add/edit dialog */}
      <Dialog open={benefitDialog} onClose={() => setBenefitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {benefitEditId ? t('common.edit') : t('franchise.add_benefit_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_benefit_icon')}
                  value={benefitForm.icon}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText="solar:medal-star-bold-duotone"
                />
                <TextField
                  label={t('franchise.form_benefit_title')}
                  value={benefitForm.title}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('franchise.form_benefit_desc')}
                  value={benefitForm.desc}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, desc: e.target.value }))}
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
                <BenefitPreviewCard benefit={benefitForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBenefitDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitBenefit}
            disabled={!benefitForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {benefitEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!benefitDeleteId}
        onClose={() => setBenefitDeleteId(null)}
        title={t('franchise.benefit_delete_title')}
        content={t('franchise.benefit_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteBenefit}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Model add/edit dialog */}
      <Dialog open={modelDialog} onClose={() => setModelDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {modelEditId ? t('common.edit') : t('franchise.add_model_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_model_name')}
                  value={modelForm.name}
                  onChange={(e) => setModelForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('franchise.form_model_area')}
                    value={modelForm.area}
                    onChange={(e) => setModelForm((p) => ({ ...p, area: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('franchise.form_model_room_count')}
                    value={modelForm.roomCount}
                    onChange={(e) => setModelForm((p) => ({ ...p, roomCount: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('franchise.form_model_investment')}
                  value={modelForm.investment}
                  onChange={(e) => setModelForm((p) => ({ ...p, investment: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    label={t('franchise.form_model_color')}
                    value={modelForm.color}
                    onChange={(e) => setModelForm((p) => ({ ...p, color: e.target.value }))}
                    fullWidth
                  />
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      flexShrink: 0,
                      bgcolor: modelForm.color,
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                    }}
                  />
                </Stack>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!modelForm.hot}
                      onChange={(e) => setModelForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('franchise.form_model_hot')}
                />
                <MiniListField
                  label={t('franchise.form_model_perks')}
                  addLabel={t('franchise.add_perk_btn')}
                  items={modelForm.perks}
                  onChangeItem={updatePerk}
                  onAddItem={addPerk}
                  onRemoveItem={removePerk}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ModelPreviewCard model={modelForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModelDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitModel}
            disabled={!modelForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {modelEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!modelDeleteId}
        onClose={() => setModelDeleteId(null)}
        title={t('franchise.model_delete_title')}
        content={t('franchise.model_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteModel}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Step add/edit dialog */}
      <Dialog open={stepDialog} onClose={() => setStepDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {stepEditId ? t('common.edit') : t('franchise.add_step_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('franchise.form_step_title')}
                  value={stepForm.title}
                  onChange={(e) => setStepForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('franchise.form_step_desc')}
                  value={stepForm.desc}
                  onChange={(e) => setStepForm((p) => ({ ...p, desc: e.target.value }))}
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
                <StepPreviewCard
                  step={stepForm}
                  index={stepEditId ? steps.findIndex((s) => s.id === stepEditId) : steps.length}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStepDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStep}
            disabled={!stepForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {stepEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!stepDeleteId}
        onClose={() => setStepDeleteId(null)}
        title={t('franchise.step_delete_title')}
        content={t('franchise.step_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStep}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Application detail dialog */}
      <Dialog
        open={!!viewApplication}
        onClose={() => setViewApplication(null)}
        maxWidth="sm"
        fullWidth
      >
        {viewApplication && (
          <>
            <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
              {t('franchise.application_detail_title')}
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ pt: 0.5 }}>
                <TextField
                  label={t('franchise.application_col_contact')}
                  value={viewApplication.name}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('franchise.application_col_phone')}
                    value={viewApplication.phone}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label={t('franchise.application_col_email')}
                    value={viewApplication.email}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('franchise.application_col_city')}
                    value={viewApplication.city}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label={t('franchise.application_col_budget')}
                    value={viewApplication.budgetRange}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <TextField
                  label={t('franchise.application_col_submitted_at')}
                  value={viewApplication.submittedAt}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  label={t('franchise.application_form_message')}
                  value={viewApplication.message || '—'}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  select
                  label={t('franchise.application_col_status')}
                  value={viewApplication.status}
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    handleSetApplicationStatus(
                      viewApplication.id,
                      e.target.value as Spa2FranchiseApplicationStatus
                    )
                  }
                >
                  {APPLICATION_STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status} value={status}>
                      {APPLICATION_STATUS_LABEL[status]}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewApplication(null)}>{t('common.close')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <ConfirmDialog
        open={!!deleteApplicationId}
        onClose={() => setDeleteApplicationId(null)}
        title={t('franchise.application_delete_title')}
        content={t('franchise.application_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteApplication}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
