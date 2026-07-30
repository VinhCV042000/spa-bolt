import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
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
import LinearProgress from '@mui/material/LinearProgress';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2SuperfoodTips,
  spa2NutritionPlans,
  spa2NutritionStats,
  spa2NutritionBanner,
  type Spa2SuperfoodTip,
  type Spa2NutritionPlan,
  type Spa2NutritionStat,
  type Spa2AdjustableImage,
  type Spa2NutritionBanner,
  SPA2_NUTRITION_CONSULTATION_BOOKINGS,
  type Spa2NutritionConsultationStatus,
  type Spa2NutritionConsultationBooking,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  Spa2ContentPageHero4,
  Spa2NutritionPageView,
} from 'src/sections/spa2/view/spa2-content-pages4';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  spa2NutritionQuizQuestions,
  type Spa2NutritionQuizQuestion,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2NutritionPageView renders on the public /spa2/nutrition page: the page
// banner, the stat tiles, the nutrition/detox program catalog, the superfood
// tip list and the quiz questions - read from and written back in the same
// shape as src/_mock/_spa2 / src/sections/spa2/spa2-pages-data, the single
// source of truth shared with the public view. The "banner" tab reuses the
// newly-exported Spa2ContentPageHero4 and the "preview" tab reuses
// Spa2NutritionPageView itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STAT_FORM = {
  n: '',
  l: '',
};

const EMPTY_PLAN_FORM = {
  name: '',
  price: 0,
  cal: '',
  icon: 'solar:leaf-bold-duotone',
  color: SPA2_TEAL,
  desc: '',
  includes: [] as string[],
};

const EMPTY_TIP_FORM = {
  food: '',
  icon: '🌿',
  benefit: '',
};

const EMPTY_QUIZ_FORM = {
  question: '',
  options: [] as string[],
};

const NUTRITION_BOOKING_STATUS_LABEL: Record<Spa2NutritionConsultationStatus, string> = {
  new: 'Mới',
  confirmed: 'Đã xác nhận',
  completed: 'Đã hoàn tất',
  cancelled: 'Đã huỷ',
};

const NUTRITION_BOOKING_STATUS_COLOR: Record<
  Spa2NutritionConsultationStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  confirmed: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const NUTRITION_BOOKING_STATUS_OPTIONS: Spa2NutritionConsultationStatus[] = [
  'new',
  'confirmed',
  'completed',
  'cancelled',
];

type NutritionBookingStatusFilter = Spa2NutritionConsultationStatus | 'all';

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

// Mirrors a single stat tile from the public teal stats band.
function StatPreviewCard({ n, l }: { n: string; l: string }) {
  return (
    <Box
      sx={{
        bgcolor: SPA2_TEAL,
        borderRadius: 3,
        py: 3,
        px: 2,
        textAlign: 'center',
        color: 'common.white',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        {n || '0'}
      </Typography>
      <Typography sx={{ fontSize: 12, opacity: 0.8 }}>{l || '—'}</Typography>
    </Box>
  );
}

// Mirrors a single plan SoftCard in the public catalog grid.
function PlanPreviewCard({ name, price, cal, icon, color, desc, includes }: Spa2NutritionPlan) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2.5,
          bgcolor: `${color}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Iconify icon={icon} width={24} sx={{ color }} />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
        {name || 'Tên chương trình'}
      </Typography>
      <Chip label={cal || '—'} size="small" sx={{ mb: 1, bgcolor: '#F5F5F5', fontSize: 11 }} />
      <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}>
        {desc || 'Mô tả chương trình...'}
      </Typography>
      <Stack spacing={0.5} sx={{ mb: 1.5 }}>
        {includes.slice(0, 3).map((inc) => (
          <Stack key={inc} direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:check-circle-bold" width={12} sx={{ color, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{inc}</Typography>
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ mb: 1.5 }} />
      <Typography sx={{ fontWeight: 700, color, fontSize: 15 }}>
        {new Intl.NumberFormat('vi-VN').format(price)}đ
      </Typography>
    </Card>
  );
}

// Mirrors a single superfood tip SoftCard in the public "Bí quyết" grid.
function TipPreviewCard({ icon, food, benefit }: { icon: string; food: string; benefit: string }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <Typography sx={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{icon || '🌿'}</Typography>
      <Box>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
          {food || 'Tên thực phẩm'}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6 }}>
          {benefit || 'Công dụng...'}
        </Typography>
      </Box>
    </Card>
  );
}

// Mirrors a single quiz question card in the public "Trắc nghiệm" section.
function QuizPreviewCard({ question, options }: { question: string; options: string[] }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontSize: 12, color: 'text.disabled', mb: 2 }}>Câu 1 / 1</Typography>
        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 3 }}>
          {question || 'Câu hỏi trắc nghiệm...'}
        </Typography>
        <Stack spacing={1.5}>
          {options.length > 0 ? (
            options.map((opt, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box
                key={idx}
                sx={{
                  py: 1.6,
                  px: 2.5,
                  borderRadius: 3,
                  border: `1.5px solid ${SPA2_CREAM_DARK}`,
                  color: SPA2_INK,
                  fontSize: 14,
                }}
              >
                {opt || 'Đáp án...'}
              </Box>
            ))
          ) : (
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              Chưa có đáp án nào.
            </Typography>
          )}
        </Stack>
      </Box>
    </Card>
  );
}

// KPI tile used on the "booking_stats" tab.
function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
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

export function Spa2NutritionManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2NutritionBanner>(() => ({
    ...spa2NutritionBanner,
    image: { ...spa2NutritionBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'stats' | 'plans' | 'tips' | 'quiz' | 'bookings' | 'booking_stats' | 'preview'
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

  // ---- Stats ----
  const [stats, setStats] = useState<Spa2NutritionStat[]>(() =>
    spa2NutritionStats.map((s) => ({ ...s }))
  );
  const [statForm, setStatForm] = useState(EMPTY_STAT_FORM);
  const [statDialog, setStatDialog] = useState(false);
  const [statEditId, setStatEditId] = useState<string | null>(null);
  const [statDeleteId, setStatDeleteId] = useState<string | null>(null);

  const openCreateStat = () => {
    setStatForm(EMPTY_STAT_FORM);
    setStatEditId(null);
    setStatDialog(true);
  };
  const openEditStat = (item: Spa2NutritionStat) => {
    setStatForm({ n: item.n, l: item.l });
    setStatEditId(item.id);
    setStatDialog(true);
  };
  const submitStat = () => {
    if (statEditId) {
      setStats((prev) => prev.map((s) => (s.id === statEditId ? { ...s, ...statForm } : s)));
    } else {
      setStats((prev) => [...prev, withId(statForm)]);
    }
    setStatDialog(false);
    markDirty();
  };
  const confirmDeleteStat = () => {
    setStats((prev) => prev.filter((s) => s.id !== statDeleteId));
    setStatDeleteId(null);
    markDirty();
  };
  const reorderStats = (next: Spa2NutritionStat[]) => {
    setStats(next);
    markDirty();
  };

  // ---- Plans ----
  const [plans, setPlans] = useState<Spa2NutritionPlan[]>(() =>
    spa2NutritionPlans.map((p) => ({ ...p, includes: [...p.includes] }))
  );
  const [planForm, setPlanForm] = useState(EMPTY_PLAN_FORM);
  const [planDialog, setPlanDialog] = useState(false);
  const [planEditId, setPlanEditId] = useState<string | null>(null);
  const [planDeleteId, setPlanDeleteId] = useState<string | null>(null);

  const openCreatePlan = () => {
    setPlanForm(EMPTY_PLAN_FORM);
    setPlanEditId(null);
    setPlanDialog(true);
  };
  const openEditPlan = (item: Spa2NutritionPlan) => {
    setPlanForm({
      name: item.name,
      price: item.price,
      cal: item.cal,
      icon: item.icon,
      color: item.color,
      desc: item.desc,
      includes: [...item.includes],
    });
    setPlanEditId(item.id);
    setPlanDialog(true);
  };
  const submitPlan = () => {
    const next = {
      name: planForm.name,
      price: Number(planForm.price),
      cal: planForm.cal,
      icon: planForm.icon,
      color: planForm.color,
      desc: planForm.desc,
      includes: planForm.includes.map((s) => s.trim()).filter(Boolean),
    };
    if (planEditId) {
      setPlans((prev) => prev.map((p) => (p.id === planEditId ? { ...p, ...next } : p)));
    } else {
      setPlans((prev) => [...prev, withId(next)]);
    }
    setPlanDialog(false);
    markDirty();
  };
  const confirmDeletePlan = () => {
    setPlans((prev) => prev.filter((p) => p.id !== planDeleteId));
    setPlanDeleteId(null);
    markDirty();
  };
  const updatePlanInclude = (idx: number, value: string) => {
    setPlanForm((p) => ({
      ...p,
      includes: p.includes.map((inc, i) => (i === idx ? value : inc)),
    }));
  };
  const addPlanInclude = () => {
    setPlanForm((p) => ({ ...p, includes: [...p.includes, ''] }));
  };
  const removePlanInclude = (idx: number) => {
    setPlanForm((p) => ({ ...p, includes: p.includes.filter((_, i) => i !== idx) }));
  };
  const reorderPlans = (next: Spa2NutritionPlan[]) => {
    setPlans(next);
    markDirty();
  };

  // ---- Superfood tips ----
  const [tips, setTips] = useState<Spa2SuperfoodTip[]>(() =>
    spa2SuperfoodTips.map((tp) => ({ ...tp }))
  );
  const [tipForm, setTipForm] = useState(EMPTY_TIP_FORM);
  const [tipDialog, setTipDialog] = useState(false);
  const [tipEditId, setTipEditId] = useState<string | null>(null);
  const [tipDeleteId, setTipDeleteId] = useState<string | null>(null);

  const openCreateTip = () => {
    setTipForm(EMPTY_TIP_FORM);
    setTipEditId(null);
    setTipDialog(true);
  };
  const openEditTip = (item: Spa2SuperfoodTip) => {
    setTipForm({ food: item.food, icon: item.icon, benefit: item.benefit });
    setTipEditId(item.id);
    setTipDialog(true);
  };
  const submitTip = () => {
    const next = { ...tipForm };
    if (tipEditId) {
      setTips((prev) => prev.map((tp) => (tp.id === tipEditId ? { ...tp, ...next } : tp)));
    } else {
      setTips((prev) => [...prev, withId(next)]);
    }
    setTipDialog(false);
    markDirty();
  };
  const confirmDeleteTip = () => {
    setTips((prev) => prev.filter((tp) => tp.id !== tipDeleteId));
    setTipDeleteId(null);
    markDirty();
  };
  const reorderTips = (next: Spa2SuperfoodTip[]) => {
    setTips(next);
    markDirty();
  };

  // ---- Quiz ----
  const [quiz, setQuiz] = useState<Spa2NutritionQuizQuestion[]>(() =>
    spa2NutritionQuizQuestions.map((q) => ({ ...q, options: [...q.options] }))
  );
  const [quizForm, setQuizForm] = useState(EMPTY_QUIZ_FORM);
  const [quizDialog, setQuizDialog] = useState(false);
  const [quizEditId, setQuizEditId] = useState<string | null>(null);
  const [quizDeleteId, setQuizDeleteId] = useState<string | null>(null);

  const openCreateQuiz = () => {
    setQuizForm(EMPTY_QUIZ_FORM);
    setQuizEditId(null);
    setQuizDialog(true);
  };
  const openEditQuiz = (item: Spa2NutritionQuizQuestion) => {
    setQuizForm({ question: item.question, options: [...item.options] });
    setQuizEditId(item.id);
    setQuizDialog(true);
  };
  const submitQuiz = () => {
    const next = {
      question: quizForm.question,
      options: quizForm.options.map((s) => s.trim()).filter(Boolean),
    };
    if (quizEditId) {
      setQuiz((prev) => prev.map((q) => (q.id === quizEditId ? { ...q, ...next } : q)));
    } else {
      setQuiz((prev) => [...prev, withId(next)]);
    }
    setQuizDialog(false);
    markDirty();
  };
  const confirmDeleteQuiz = () => {
    setQuiz((prev) => prev.filter((q) => q.id !== quizDeleteId));
    setQuizDeleteId(null);
    markDirty();
  };
  const reorderQuiz = (next: Spa2NutritionQuizQuestion[]) => {
    setQuiz(next);
    markDirty();
  };
  const updateQuizOption = (idx: number, value: string) => {
    setQuizForm((p) => ({
      ...p,
      options: p.options.map((opt, i) => (i === idx ? value : opt)),
    }));
  };
  const addQuizOption = () => {
    setQuizForm((p) => ({ ...p, options: [...p.options, ''] }));
  };
  const removeQuizOption = (idx: number) => {
    setQuizForm((p) => ({ ...p, options: p.options.filter((_, i) => i !== idx) }));
  };

  // ---- Đặt lịch tư vấn dinh dưỡng (bookings) ----
  const [bookings, setBookings] = useState<Spa2NutritionConsultationBooking[]>(
    SPA2_NUTRITION_CONSULTATION_BOOKINGS
  );
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] =
    useState<NutritionBookingStatusFilter>('all');
  const [bookingPlanFilter, setBookingPlanFilter] = useState('all');
  const [viewBooking, setViewBooking] = useState<Spa2NutritionConsultationBooking | null>(null);
  const bookingTable = useTable({ defaultRowsPerPage: 5 });

  const filteredBookings = bookings.filter((b) => {
    const q = bookingSearch.toLowerCase();
    const matchSearch =
      !q ||
      b.customer.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.planName.toLowerCase().includes(q) ||
      b.phone.includes(bookingSearch);
    const matchStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    const matchPlan = bookingPlanFilter === 'all' || b.planId === bookingPlanFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const handleSetBookingStatus = (id: number, status: Spa2NutritionConsultationStatus) => {
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

  // ---- Thống kê đặt lịch tư vấn (theo chương trình dinh dưỡng) ----
  const bookingPlanStats = useMemo(
    () =>
      plans.map((p) => {
        const inPlan = bookings.filter((b) => b.planId === p.id);
        const completed = inPlan.filter((b) => b.status === 'completed').length;
        const cancelled = inPlan.filter((b) => b.status === 'cancelled').length;
        const resolved = completed + cancelled;
        return {
          id: p.id,
          name: p.name,
          icon: p.icon,
          color: p.color,
          count: inPlan.length,
          new: inPlan.filter((b) => b.status === 'new').length,
          confirmed: inPlan.filter((b) => b.status === 'confirmed').length,
          completed,
          cancelled,
          completionRate: resolved ? Math.round((completed / resolved) * 100) : null,
        };
      }),
    [plans, bookings]
  );

  const mostRequestedPlan = useMemo(
    () => [...bookingPlanStats].sort((a, b) => b.count - a.count)[0] ?? null,
    [bookingPlanStats]
  );

  const bookingCompletionRate =
    bookingCounts.completed + bookingCounts.cancelled
      ? Math.round(
          (bookingCounts.completed / (bookingCounts.completed + bookingCounts.cancelled)) * 100
        )
      : null;

  const bookingCancellationRate = bookingCounts.all
    ? Math.round((bookingCounts.cancelled / bookingCounts.all) * 100)
    : null;

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2NutritionBanner, image: { ...spa2NutritionBanner.image } });
    setStats(spa2NutritionStats.map((s) => ({ ...s })));
    setPlans(spa2NutritionPlans.map((p) => ({ ...p, includes: [...p.includes] })));
    setTips(spa2SuperfoodTips.map((tp) => ({ ...tp })));
    setQuiz(spa2NutritionQuizQuestions.map((q) => ({ ...q, options: [...q.options] })));
    setBookings(SPA2_NUTRITION_CONSULTATION_BOOKINGS);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('nutrition.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.nutrition')}
      publicPath={paths.spa2.nutrition}
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
          label={t('nutrition.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stats"
          label={t('nutrition.stats_section')}
          icon={<Iconify icon="solar:chart-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="plans"
          label={t('nutrition.plans_section')}
          icon={<Iconify icon="solar:leaf-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tips"
          label={t('nutrition.tips_section')}
          icon={<Iconify icon="solar:medal-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="quiz"
          label={t('nutrition.quiz_section')}
          icon={<Iconify icon="solar:question-circle-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="bookings"
          label={t('nutrition.bookings_section')}
          icon={<Iconify icon="solar:calendar-mark-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="booking_stats"
          label={t('nutrition.booking_stats_section')}
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
              title={t('nutrition.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('nutrition.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('nutrition.banner_image_help')}
                />
                <TextField
                  label={t('nutrition.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('nutrition.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('nutrition.banner_subtitle')}
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
                <Spa2ContentPageHero4
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

      {/* Stats */}
      {tab === 'stats' && (
        <Card sx={{ p: 3, borderRadius: 3, bgcolor: SPA2_TEAL_DARK }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'common.white' }}>
              {t('nutrition.stats_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateStat}
              sx={{
                bgcolor: 'common.white',
                color: SPA2_TEAL_DARK,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
                borderRadius: 999,
              }}
            >
              {t('nutrition.add_stat_btn')}
            </Button>
          </Stack>
          <Spa2SortableGrid items={stats} onReorder={reorderStats}>
            <Grid container spacing={2}>
              {stats.map((s) => (
                <Grid key={s.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={s.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <StatPreviewCard n={s.n} l={s.l} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ color: 'common.white', bgcolor: 'rgba(255,255,255,0.15)' }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditStat(s)}
                            sx={{ color: 'common.white', bgcolor: 'rgba(255,255,255,0.15)' }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => setStatDeleteId(s.id)}
                            sx={{ color: 'common.white', bgcolor: 'rgba(255,255,255,0.15)' }}
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
        </Card>
      )}

      {/* Plans */}
      {tab === 'plans' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('nutrition.plans_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreatePlan}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('nutrition.add_plan_btn')}
            </Button>
          </Stack>
          <Spa2SortableGrid items={plans} onReorder={reorderPlans}>
            <Grid container spacing={2}>
              {plans.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <PlanPreviewCard {...item} />
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
                            onClick={() => openEditPlan(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setPlanDeleteId(item.id)}
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
        </Card>
      )}

      {/* Superfood tips */}
      {tab === 'tips' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('nutrition.tips_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateTip}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('nutrition.add_tip_btn')}
            </Button>
          </Stack>
          <Spa2SortableGrid items={tips} onReorder={reorderTips}>
            <Grid container spacing={2}>
              {tips.map((tp) => (
                <Grid key={tp.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={tp.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <TipPreviewCard icon={tp.icon} food={tp.food} benefit={tp.benefit} />
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
                            onClick={() => openEditTip(tp)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setTipDeleteId(tp.id)}
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
        </Card>
      )}

      {/* Quiz */}
      {tab === 'quiz' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('nutrition.quiz_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateQuiz}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('nutrition.add_quiz_btn')}
            </Button>
          </Stack>
          <Spa2SortableGrid items={quiz} onReorder={reorderQuiz}>
            <Stack spacing={1.5}>
              {quiz.map((item) => (
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
                          sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 13.5, mb: 0.75 }}
                        >
                          {item.question}
                        </Typography>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          {item.options.map((opt) => (
                            <Chip
                              key={opt}
                              label={opt}
                              size="small"
                              sx={{ bgcolor: 'background.neutral', fontSize: 11 }}
                            />
                          ))}
                        </Stack>
                      </Box>
                      <IconButton size="small" onClick={() => openEditQuiz(item)}>
                        <Iconify icon="solar:pen-bold" width={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setQuizDeleteId(item.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Stack>
                  )}
                </Spa2SortableItem>
              ))}
              {quiz.length === 0 && (
                <Typography sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center' }}>
                  {t('nutrition.no_quiz_questions')}
                </Typography>
              )}
            </Stack>
          </Spa2SortableGrid>
        </Card>
      )}

      {/* Đặt lịch tư vấn dinh dưỡng (bookings) */}
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
              {t('nutrition.bookings_section')}
            </Typography>
            <TextField
              select
              size="small"
              value={bookingPlanFilter}
              onChange={(e) => {
                setBookingPlanFilter(e.target.value);
                bookingTable.onResetPage();
              }}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="all">Tất cả chương trình</MenuItem>
              {plans.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Card sx={{ bgcolor: SPA2_TEAL_DARK, mb: 2.5 }}>
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
                  title={NUTRITION_BOOKING_STATUS_LABEL.new}
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
                  title={NUTRITION_BOOKING_STATUS_LABEL.confirmed}
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
                  title={NUTRITION_BOOKING_STATUS_LABEL.completed}
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
                  title={NUTRITION_BOOKING_STATUS_LABEL.cancelled}
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
            placeholder="Tìm theo khách hàng, SĐT, email hoặc chương trình..."
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
            onChange={(_, v: NutritionBookingStatusFilter) => {
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
            <Tab
              value="new"
              label={`${NUTRITION_BOOKING_STATUS_LABEL.new} (${bookingCounts.new})`}
            />
            <Tab
              value="confirmed"
              label={`${NUTRITION_BOOKING_STATUS_LABEL.confirmed} (${bookingCounts.confirmed})`}
            />
            <Tab
              value="completed"
              label={`${NUTRITION_BOOKING_STATUS_LABEL.completed} (${bookingCounts.completed})`}
            />
            <Tab
              value="cancelled"
              label={`${NUTRITION_BOOKING_STATUS_LABEL.cancelled} (${bookingCounts.cancelled})`}
            />
          </Tabs>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Chương trình quan tâm</TableCell>
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
                          <Typography variant="body2">{item.planName}</Typography>
                          <Chip
                            size="small"
                            label={item.planId}
                            sx={{ bgcolor: 'background.neutral', fontSize: 11 }}
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
                          label={NUTRITION_BOOKING_STATUS_LABEL[item.status]}
                          color={NUTRITION_BOOKING_STATUS_COLOR[item.status]}
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

      {/* Thống kê đặt lịch tư vấn — KPI tổng quan → phân bổ theo trạng thái (lọc nhanh)
          → bảng chi tiết theo từng chương trình dinh dưỡng */}
      {tab === 'booking_stats' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:calendar-mark-bold"
                label="Tổng lượt đặt lịch"
                value={bookingCounts.all}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:leaf-bold"
                label="Chương trình được quan tâm nhất"
                value={mostRequestedPlan?.name ?? '—'}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:check-circle-bold"
                label="Tỷ lệ hoàn tất"
                value={bookingCompletionRate === null ? '—' : `${bookingCompletionRate}%`}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:close-circle-bold"
                label="Tỷ lệ huỷ lịch"
                value={bookingCancellationRate === null ? '—' : `${bookingCancellationRate}%`}
              />
            </Grid>
          </Grid>

          <Card sx={{ bgcolor: SPA2_CREAM_DARK, borderRadius: 3, p: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
            >
              Phân bổ theo trạng thái
            </Typography>
            <Scrollbar sx={{ maxHeight: 120 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                spacing={2}
                sx={{ py: 1 }}
              >
                <Spa2ListAnalytic
                  icon="solar:calendar-mark-bold-duotone"
                  title="Tất cả"
                  total={bookingCounts.all}
                  percent={100}
                  active={bookingStatusFilter === 'all'}
                  onClick={() => setBookingStatusFilter('all')}
                />
                <Spa2ListAnalytic
                  icon="solar:bell-bold-duotone"
                  title={NUTRITION_BOOKING_STATUS_LABEL.new}
                  total={bookingCounts.new}
                  percent={bookingCounts.all ? (bookingCounts.new / bookingCounts.all) * 100 : 0}
                  active={bookingStatusFilter === 'new'}
                  onClick={() => setBookingStatusFilter('new')}
                />
                <Spa2ListAnalytic
                  icon="solar:phone-calling-bold-duotone"
                  title={NUTRITION_BOOKING_STATUS_LABEL.confirmed}
                  total={bookingCounts.confirmed}
                  percent={
                    bookingCounts.all ? (bookingCounts.confirmed / bookingCounts.all) * 100 : 0
                  }
                  active={bookingStatusFilter === 'confirmed'}
                  onClick={() => setBookingStatusFilter('confirmed')}
                />
                <Spa2ListAnalytic
                  icon="solar:check-circle-bold-duotone"
                  title={NUTRITION_BOOKING_STATUS_LABEL.completed}
                  total={bookingCounts.completed}
                  percent={
                    bookingCounts.all ? (bookingCounts.completed / bookingCounts.all) * 100 : 0
                  }
                  active={bookingStatusFilter === 'completed'}
                  onClick={() => setBookingStatusFilter('completed')}
                />
                <Spa2ListAnalytic
                  icon="solar:close-circle-bold-duotone"
                  title={NUTRITION_BOOKING_STATUS_LABEL.cancelled}
                  total={bookingCounts.cancelled}
                  percent={
                    bookingCounts.all ? (bookingCounts.cancelled / bookingCounts.all) * 100 : 0
                  }
                  active={bookingStatusFilter === 'cancelled'}
                  onClick={() => setBookingStatusFilter('cancelled')}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Chương trình dinh dưỡng</TableCell>
                    <TableCell align="center">Lượt đặt</TableCell>
                    <TableCell align="center">Mới / Đã xác nhận</TableCell>
                    <TableCell align="center">Hoàn tất / Huỷ</TableCell>
                    <TableCell sx={{ minWidth: 180 }}>Tỷ lệ hoàn tất</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookingPlanStats.map((p) => (
                    <TableRow key={p.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Iconify icon={p.icon} width={18} sx={{ color: p.color }} />
                          <Typography variant="body2">{p.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">{p.count}</TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={`${p.new}/${p.confirmed}`}
                          sx={{ bgcolor: 'background.neutral' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Box component="span" sx={{ fontSize: 13, color: 'success.main' }}>
                            {p.completed}
                          </Box>
                          <Box component="span" sx={{ fontSize: 13, color: 'error.main' }}>
                            {p.cancelled}
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {p.completionRate === null ? (
                          <Typography variant="caption" color="text.disabled">
                            —
                          </Typography>
                        ) : (
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <LinearProgress
                              variant="determinate"
                              value={p.completionRate}
                              sx={{
                                flex: 1,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: SPA2_CREAM_DARK,
                                '& .MuiLinearProgress-bar': { bgcolor: SPA2_TEAL },
                              }}
                            />
                            <Typography variant="caption" sx={{ minWidth: 34, fontWeight: 600 }}>
                              {p.completionRate}%
                            </Typography>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2NutritionPageView
            banner={banner}
            stats={stats}
            plans={plans}
            superfoodTips={tips}
            quiz={quiz}
          />
        </Box>
      )}

      {/* Stat add/edit dialog */}
      <Dialog open={statDialog} onClose={() => setStatDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{statEditId ? t('common.edit') : t('nutrition.add_stat_btn')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label={t('nutrition.form_stat_number')}
              fullWidth
              size="small"
              value={statForm.n}
              onChange={(e) => setStatForm((p) => ({ ...p, n: e.target.value }))}
            />
            <TextField
              label={t('nutrition.form_stat_label')}
              fullWidth
              multiline
              minRows={2}
              value={statForm.l}
              onChange={(e) => setStatForm((p) => ({ ...p, l: e.target.value }))}
            />
            <Typography variant="caption" color="text.secondary">
              {t('common.preview_btn')}
            </Typography>
            <StatPreviewCard n={statForm.n} l={statForm.l} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStat}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {statEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Plan add/edit dialog */}
      <Dialog open={planDialog} onClose={() => setPlanDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{planEditId ? t('common.edit') : t('nutrition.add_plan_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('nutrition.form_plan_name')}
                    fullWidth
                    size="small"
                    value={planForm.name}
                    onChange={(e) => setPlanForm((p) => ({ ...p, name: e.target.value }))}
                  />
                  <TextField
                    label={t('nutrition.form_plan_price')}
                    type="number"
                    fullWidth
                    size="small"
                    value={planForm.price}
                    onChange={(e) => setPlanForm((p) => ({ ...p, price: Number(e.target.value) }))}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('nutrition.form_plan_cal')}
                    fullWidth
                    size="small"
                    value={planForm.cal}
                    onChange={(e) => setPlanForm((p) => ({ ...p, cal: e.target.value }))}
                  />
                  <TextField
                    label={t('nutrition.form_plan_icon')}
                    fullWidth
                    size="small"
                    value={planForm.icon}
                    onChange={(e) => setPlanForm((p) => ({ ...p, icon: e.target.value }))}
                    helperText="solar:leaf-bold-duotone"
                  />
                  <TextField
                    label={t('nutrition.form_plan_color')}
                    fullWidth
                    size="small"
                    value={planForm.color}
                    onChange={(e) => setPlanForm((p) => ({ ...p, color: e.target.value }))}
                    helperText="#2E8B7A"
                  />
                </Stack>
                <TextField
                  label={t('nutrition.form_plan_desc')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={planForm.desc}
                  onChange={(e) => setPlanForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {t('nutrition.form_plan_includes')}
                  </Typography>
                  <Stack spacing={1}>
                    {planForm.includes.map((inc, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          fullWidth
                          value={inc}
                          onChange={(e) => updatePlanInclude(idx, e.target.value)}
                          placeholder={t('nutrition.form_plan_include_placeholder')}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removePlanInclude(idx)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addPlanInclude}
                    sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
                  >
                    {t('nutrition.add_plan_include_btn')}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <PlanPreviewCard
                  id={planEditId ?? 'preview'}
                  name={planForm.name}
                  price={planForm.price}
                  cal={planForm.cal}
                  icon={planForm.icon}
                  color={planForm.color}
                  desc={planForm.desc}
                  includes={planForm.includes.map((s) => s.trim()).filter(Boolean)}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPlanDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPlan}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {planEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tip add/edit dialog */}
      <Dialog open={tipDialog} onClose={() => setTipDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{tipEditId ? t('common.edit') : t('nutrition.add_tip_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('nutrition.form_tip_icon')}
                    size="small"
                    sx={{ width: 120 }}
                    value={tipForm.icon}
                    onChange={(e) => setTipForm((p) => ({ ...p, icon: e.target.value }))}
                  />
                  <TextField
                    label={t('nutrition.form_tip_food')}
                    fullWidth
                    size="small"
                    value={tipForm.food}
                    onChange={(e) => setTipForm((p) => ({ ...p, food: e.target.value }))}
                  />
                </Stack>
                <TextField
                  label={t('nutrition.form_tip_benefit')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={tipForm.benefit}
                  onChange={(e) => setTipForm((p) => ({ ...p, benefit: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <TipPreviewCard icon={tipForm.icon} food={tipForm.food} benefit={tipForm.benefit} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTipDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitTip}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {tipEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quiz question add/edit dialog */}
      <Dialog open={quizDialog} onClose={() => setQuizDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{quizEditId ? t('common.edit') : t('nutrition.add_quiz_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('nutrition.form_quiz_question')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={quizForm.question}
                  onChange={(e) => setQuizForm((p) => ({ ...p, question: e.target.value }))}
                />
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {t('nutrition.form_quiz_options')}
                  </Typography>
                  <Stack spacing={1}>
                    {quizForm.options.map((opt, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          fullWidth
                          value={opt}
                          onChange={(e) => updateQuizOption(idx, e.target.value)}
                          placeholder={t('nutrition.form_quiz_option_placeholder')}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeQuizOption(idx)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addQuizOption}
                    sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
                  >
                    {t('nutrition.add_quiz_option_btn')}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <QuizPreviewCard
                  question={quizForm.question}
                  options={quizForm.options.map((s) => s.trim()).filter(Boolean)}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuizDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitQuiz}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {quizEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking detail dialog */}
      <Dialog open={!!viewBooking} onClose={() => setViewBooking(null)} maxWidth="sm" fullWidth>
        {viewBooking && (
          <>
            <DialogTitle>Chi tiết đặt lịch tư vấn dinh dưỡng</DialogTitle>
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
                  label="Chương trình quan tâm"
                  value={`${viewBooking.planName} (${viewBooking.planId})`}
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
                      e.target.value as Spa2NutritionConsultationStatus
                    )
                  }
                >
                  {NUTRITION_BOOKING_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {NUTRITION_BOOKING_STATUS_LABEL[s]}
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

      <ConfirmDialog
        open={!!statDeleteId}
        onClose={() => setStatDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStat}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!planDeleteId}
        onClose={() => setPlanDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePlan}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!tipDeleteId}
        onClose={() => setTipDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTip}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!quizDeleteId}
        onClose={() => setQuizDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteQuiz}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
