import type { Spa2AdjustableImage, Spa2BeforeAfterStatus } from 'src/_mock/_spa2';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
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
import TableContainer from '@mui/material/TableContainer';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { spa2BeforeAfterBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
  Spa2BeforeAfterSlider,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  spa2Faqs,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Feedbacks,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  spa2Technologies,
  spa2BeforeAfters,
  spa2TreatmentExperts,
  spa2TreatmentProcess,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/before-after page
// (Spa2BeforeAfterPageView) renders that is driven by spa2BeforeAfters: banner
// + the before/after slider grid. Only status 'approved' items render on the
// public page — the dashboard's Duyệt / Từ chối actions directly control this
// via a real, persisted `status` field (previously synthesized locally and
// never wired to the public page).
// ─────────────────────────────────────────────────────────────────────────────

type BeforeAfter = (typeof spa2BeforeAfters)[number];
type ProcessStep = (typeof spa2TreatmentProcess)[number] & { id: string };
type Technology = (typeof spa2Technologies)[number] & { id: number };
type Expert = (typeof spa2TreatmentExperts)[number] & { id: number };
type Feedback = (typeof spa2Feedbacks)[number] & { id: number; reply?: string; likeCount?: number };
type Faq = (typeof spa2Faqs)[number];

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_FORM = { title: '', before: '', after: '', duration: '', note: '' };
const EMPTY_TECH_FORM: Omit<Technology, 'id'> = { name: '', icon: '', desc: '' };
const EMPTY_EXPERT_FORM: Omit<Expert, 'id'> = { name: '', role: '', image: '' };
const EMPTY_FAQ_FORM: Omit<Faq, 'id' | 'published' | 'likes' | 'dislikes'> = {
  cat: '',
  icon: 'solar:question-circle-bold-duotone',
  tag: '',
  q: '',
  a: '',
};

const STATUS_COLOR: Record<Spa2BeforeAfterStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};
const STATUS_LABEL: Record<Spa2BeforeAfterStatus, string> = {
  pending: 'common.pending',
  approved: 'common.approved',
  rejected: 'common.rejected',
};

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

function BeforeAfterPreviewCard({
  form,
}: {
  form: { title: string; before: string; after: string; duration: string; note: string };
}) {
  return (
    <Spa2SoftCard sx={{ p: 2 }}>
      <Spa2BeforeAfterSlider before={form.before} after={form.after} />
      <Box sx={{ pt: 2 }}>
        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {form.title || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          Thời gian: {form.duration}
        </Typography>
        <Typography sx={{ fontSize: 14, color: SPA2_TEAL_DARK, mt: 0.5 }}>{form.note}</Typography>
      </Box>
    </Spa2SoftCard>
  );
}

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: string;
  action?: React.ReactNode;
  children: React.ReactNode;
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

function ProcessStepPreview({
  title,
  desc,
  index,
  isLast,
}: {
  title: string;
  desc: string;
  index: number;
  isLast: boolean;
}) {
  return (
    <Stack direction="row" spacing={3}>
      <Stack alignItems="center" sx={{ minWidth: 56 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
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
        {!isLast && <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }} />}
      </Stack>
      <Box sx={{ pb: 4 }}>
        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
          {title || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{desc}</Typography>
      </Box>
    </Stack>
  );
}

function TechPreviewCard({ form }: { form: { name: string; icon: string; desc: string } }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Iconify
        icon={form.icon || 'solar:cpu-bolt-bold-duotone'}
        width={40}
        sx={{ color: SPA2_TEAL, mb: 1.5 }}
      />
      <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 1 }}>
        {form.name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{form.desc}</Typography>
    </Spa2SoftCard>
  );
}

function TeamPreviewCard({ form }: { form: { name: string; role: string; image: string } }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Avatar
        src={form.image}
        sx={{ width: 88, height: 88, mx: 'auto', mb: 1.5, border: `3px solid ${SPA2_TEAL_LIGHT}` }}
      />
      <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
        {form.name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{form.role}</Typography>
    </Spa2SoftCard>
  );
}

function FaqPreviewCard({ form }: { form: { q: string; a: string } }) {
  return (
    <Accordion
      defaultExpanded
      sx={{
        borderRadius: '12px !important',
        border: `1px solid ${SPA2_CREAM}`,
        boxShadow: 'none',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
          {form.q || '(Chưa đặt câu hỏi)'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{form.a}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export function Spa2BeforeAfterManageView() {
  const { t } = useTranslate('spa2-manage');
  const statusLabel = (s: Spa2BeforeAfterStatus) => t(STATUS_LABEL[s]);

  const [banner, setBanner] = useState(() => ({
    ...spa2BeforeAfterBanner,
    image: { ...spa2BeforeAfterBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'list' | 'process' | 'tech' | 'team' | 'reviews' | 'faq' | 'preview'
  >('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2BeforeAfterBanner, image: { ...spa2BeforeAfterBanner.image } });
    setProcess(spa2TreatmentProcess.map((p) => withId({ ...p })));
    setDirty(false);
  };

  const [items, setItems] = useState<BeforeAfter[]>(spa2BeforeAfters);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Spa2BeforeAfterStatus>('all');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewItem, setViewItem] = useState<BeforeAfter | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const approvedItems = items.filter((b) => b.status === 'approved');

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: BeforeAfter) => {
    setForm({
      title: item.title,
      before: item.before,
      after: item.after,
      duration: item.duration,
      note: item.note,
    });
    setEditId(item.id.toString());
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = (Math.max(0, ...items.map((x) => parseInt(x.id, 10))) + 1).toString();
      setItems((p) => [...p, { ...form, id: newId, status: 'pending' }]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  const handleSetStatus = useCallback((id: string, status: Spa2BeforeAfterStatus) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status } : v));
    setDirty(true);
  }, []);

  const stats = useMemo(() => {
    const approved = items.filter((x) => x.status === 'approved').length;
    const pending = items.filter((x) => x.status === 'pending').length;
    const rejected = items.filter((x) => x.status === 'rejected').length;
    return { total: items.length, approved, pending, rejected };
  }, [items]);

  // ---- Quy trình điều trị (spa2TreatmentProcess, chia sẻ với Treatments) - inline sortable edit ----
  const [process, setProcess] = useState<ProcessStep[]>(() =>
    spa2TreatmentProcess.map((p) => withId({ ...p }))
  );
  const updateProcessStep = (id: string, key: 'title' | 'desc', value: string) => {
    setProcess((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    setDirty(true);
  };
  const addProcessStep = () => {
    setProcess((prev) => [...prev, withId({ title: '', desc: '' })]);
    setDirty(true);
  };
  const [processDeleteId, setProcessDeleteId] = useState<string | null>(null);
  const confirmDeleteProcess = () => {
    setProcess((prev) => prev.filter((p) => p.id !== processDeleteId));
    setProcessDeleteId(null);
    setDirty(true);
  };
  const reorderProcess = (next: ProcessStep[]) => {
    setProcess(next);
    setDirty(true);
  };

  // ---- Công nghệ (spa2Technologies) ----
  const [techs, setTechs] = useState<Technology[]>(() =>
    spa2Technologies.map((x, i) => ({ ...x, id: i + 1 }))
  );
  const [techOpenForm, setTechOpenForm] = useState(false);
  const [techEditId, setTechEditId] = useState<number | null>(null);
  const [techDeleteId, setTechDeleteId] = useState<number | null>(null);
  const [techForm, setTechForm] = useState<Omit<Technology, 'id'>>(EMPTY_TECH_FORM);

  const openTechCreate = () => {
    setTechForm(EMPTY_TECH_FORM);
    setTechEditId(null);
    setTechOpenForm(true);
  };
  const openTechEdit = (item: Technology) => {
    setTechForm({ name: item.name, icon: item.icon, desc: item.desc });
    setTechEditId(item.id);
    setTechOpenForm(true);
  };
  const handleTechSubmit = useCallback(() => {
    if (techEditId !== null) {
      setTechs((p) => p.map((x) => (x.id === techEditId ? { ...x, ...techForm } : x)));
    } else {
      const newId = Math.max(0, ...techs.map((x) => x.id)) + 1;
      setTechs((p) => [...p, { ...techForm, id: newId }]);
    }
    setTechOpenForm(false);
    setDirty(true);
  }, [techForm, techEditId, techs]);
  const handleTechDelete = useCallback(() => {
    setTechs((p) => p.filter((x) => x.id !== techDeleteId));
    setTechDeleteId(null);
    setDirty(true);
  }, [techDeleteId]);

  // ---- Đội ngũ chuyên gia (spa2TreatmentExperts) ----
  const [experts, setExperts] = useState<Expert[]>(() =>
    spa2TreatmentExperts.map((x, i) => ({ ...x, id: i + 1 }))
  );
  const [expertOpenForm, setExpertOpenForm] = useState(false);
  const [expertEditId, setExpertEditId] = useState<number | null>(null);
  const [expertDeleteId, setExpertDeleteId] = useState<number | null>(null);
  const [expertForm, setExpertForm] = useState<Omit<Expert, 'id'>>(EMPTY_EXPERT_FORM);

  const openExpertCreate = () => {
    setExpertForm(EMPTY_EXPERT_FORM);
    setExpertEditId(null);
    setExpertOpenForm(true);
  };
  const openExpertEdit = (item: Expert) => {
    setExpertForm({ name: item.name, role: item.role, image: item.image });
    setExpertEditId(item.id);
    setExpertOpenForm(true);
  };
  const handleExpertSubmit = useCallback(() => {
    if (expertEditId !== null) {
      setExperts((p) => p.map((x) => (x.id === expertEditId ? { ...x, ...expertForm } : x)));
    } else {
      const newId = Math.max(0, ...experts.map((x) => x.id)) + 1;
      setExperts((p) => [...p, { ...expertForm, id: newId }]);
    }
    setExpertOpenForm(false);
    setDirty(true);
  }, [expertForm, expertEditId, experts]);
  const handleExpertDelete = useCallback(() => {
    setExperts((p) => p.filter((x) => x.id !== expertDeleteId));
    setExpertDeleteId(null);
    setDirty(true);
  }, [expertDeleteId]);

  // ---- Đánh giá (spa2Feedbacks, chia sẻ với trang Đánh giá) ----
  const [reviews, setReviews] = useState<Feedback[]>(() =>
    spa2Feedbacks.map((x, i) => ({ ...x, id: i + 1, likeCount: 0 }))
  );
  const [reviewDetail, setReviewDetail] = useState<Feedback | null>(null);
  const [replyDraft, setReplyDraft] = useState('');

  const handleReviewSetStatus = useCallback((id: number, status: Feedback['status']) => {
    setReviews((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    setReviewDetail((v) => (v?.id === id ? { ...v, status } : v));
    setDirty(true);
  }, []);
  const handleReviewReact = useCallback((id: number) => {
    setReviews((p) =>
      p.map((x) => (x.id === id ? { ...x, likeCount: (x.likeCount ?? 0) + 1 } : x))
    );
    setReviewDetail((v) => (v?.id === id ? { ...v, likeCount: (v.likeCount ?? 0) + 1 } : v));
    setDirty(true);
  }, []);
  const openReviewDetail = (item: Feedback) => {
    setReviewDetail(item);
    setReplyDraft(item.reply ?? '');
  };
  const handleReviewReplySubmit = useCallback(() => {
    if (!reviewDetail) return;
    setReviews((p) => p.map((x) => (x.id === reviewDetail.id ? { ...x, reply: replyDraft } : x)));
    setReviewDetail((v) => (v ? { ...v, reply: replyDraft } : v));
    setDirty(true);
  }, [reviewDetail, replyDraft]);

  // ---- FAQ (spa2Faqs, chia sẻ với trang FAQ) ----
  const [faqItems, setFaqItems] = useState<Faq[]>(spa2Faqs);
  const [faqOpenForm, setFaqOpenForm] = useState(false);
  const [faqEditId, setFaqEditId] = useState<string | null>(null);
  const [faqDeleteId, setFaqDeleteId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState(EMPTY_FAQ_FORM);

  const handleFaqToggle = useCallback((id: string) => {
    setFaqItems((p) => p.map((x) => (x.id === id ? { ...x, published: !x.published } : x)));
    setDirty(true);
  }, []);
  const openFaqCreate = () => {
    setFaqForm(EMPTY_FAQ_FORM);
    setFaqEditId(null);
    setFaqOpenForm(true);
  };
  const openFaqEdit = (item: Faq) => {
    setFaqForm({ cat: item.cat, icon: item.icon, tag: item.tag, q: item.q, a: item.a });
    setFaqEditId(item.id);
    setFaqOpenForm(true);
  };
  const handleFaqSubmit = useCallback(() => {
    if (faqEditId !== null) {
      setFaqItems((p) => p.map((x) => (x.id === faqEditId ? { ...x, ...faqForm } : x)));
    } else {
      setFaqItems((p) => [
        ...p,
        { ...faqForm, id: uuidv4(), published: true, likes: 0, dislikes: 0 },
      ]);
    }
    setFaqOpenForm(false);
    setDirty(true);
  }, [faqForm, faqEditId]);
  const handleFaqDelete = useCallback(() => {
    setFaqItems((p) => p.filter((x) => x.id !== faqDeleteId));
    setFaqDeleteId(null);
    setDirty(true);
  }, [faqDeleteId]);

  return (
    <Spa2ManageShell
      title={t('before_after.page_title')}
      description="Banner và các ca trước/sau hiển thị trên trang Trước & Sau công khai."
      breadcrumbLabel={t('nav.before_after')}
      publicPath={paths.spa2.beforeAfter}
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
          label={t('before_after.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('before_after.list_section')}
          icon={<Iconify icon="solar:gallery-round-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="process"
          label={t('treatments.process_section')}
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tech"
          label={t('before_after.tech_section')}
          icon={<Iconify icon="solar:cpu-bolt-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="team"
          label={t('before_after.team_section')}
          icon={<Iconify icon="solar:users-group-rounded-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reviews"
          label={t('before_after.reviews_section')}
          icon={<Iconify icon="solar:star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="faq"
          label={t('nav.faq')}
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

      {/* Banner - left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('before_after.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('before_after.banner_image_help')}
                />
                <TextField
                  label={t('before_after.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('before_after.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('before_after.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <Spa2PageHero
                image={banner.image.url}
                imageStyle={banner.image}
                eyebrow={banner.eyebrow}
                title={banner.title}
                subtitle={banner.subtitle}
              />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Danh sách case trước/sau */}
      {tab === 'list' && (
        <Stack spacing={2.5}>
          <Card sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
            >
              {t('before_after.stat_by_status')}
            </Typography>
            <Scrollbar sx={{ maxHeight: 120 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                spacing={2}
                sx={{ py: 1 }}
              >
                <Spa2ListAnalytic
                  icon="solar:gallery-round-bold-duotone"
                  title={t('common.all')}
                  total={stats.total}
                  percent={100}
                  active={statusFilter === 'all'}
                  onClick={() => setStatusFilter('all')}
                />
                <Spa2ListAnalytic
                  icon="solar:check-circle-bold-duotone"
                  title={t('common.approved')}
                  total={stats.approved}
                  percent={stats.total ? (stats.approved / stats.total) * 100 : 0}
                  color="success"
                  active={statusFilter === 'approved'}
                  onClick={() => setStatusFilter('approved')}
                />
                <Spa2ListAnalytic
                  icon="solar:clock-circle-bold-duotone"
                  title={t('common.pending')}
                  total={stats.pending}
                  percent={stats.total ? (stats.pending / stats.total) * 100 : 0}
                  color="warning"
                  active={statusFilter === 'pending'}
                  onClick={() => setStatusFilter('pending')}
                />
                <Spa2ListAnalytic
                  icon="solar:close-circle-bold-duotone"
                  title={t('common.rejected')}
                  total={stats.rejected}
                  percent={stats.total ? (stats.rejected / stats.total) * 100 : 0}
                  color="error"
                  active={statusFilter === 'rejected'}
                  onClick={() => setStatusFilter('rejected')}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <Card>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              <TextField
                placeholder={t('before_after.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{ width: 280 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreate}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('before_after.add_btn')}
              </Button>
            </Stack>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('before_after.col_case')}</TableCell>
                    <TableCell>{t('before_after.col_duration')}</TableCell>
                    <TableCell>{t('before_after.col_note')}</TableCell>
                    <TableCell>{t('common.status')}</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Box
                            component="img"
                            src={item.before}
                            sx={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 0.5 }}
                          />
                          <Iconify
                            icon="solar:arrow-right-bold"
                            width={14}
                            sx={{ color: 'text.disabled' }}
                          />
                          <Box
                            component="img"
                            src={item.after}
                            sx={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 0.5 }}
                          />
                          <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                            {item.title}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell sx={{ maxWidth: 240 }}>
                        <Typography variant="body2" noWrap color="text.secondary">
                          {item.note}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={statusLabel(item.status)}
                          color={STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'pending' && (
                            <>
                              <Tooltip title={t('common.approve')}>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetStatus(item.id, 'approved')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t('common.reject')}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetStatus(item.id, 'rejected')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title={t('common.view')}>
                            <IconButton size="small" onClick={() => setViewItem(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.edit')}>
                            <IconButton size="small" onClick={() => openEdit(item)}>
                              <Iconify icon="solar:pen-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.delete')}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteId(item.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      )}

      {/* Quy trình điều trị (chia sẻ với trang Liệu trình) - inline sortable edit như Careers */}
      {tab === 'process' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('treatments.process_section')}
              icon="solar:routing-2-bold-duotone"
              action={
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={addProcessStep}
                  sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
                >
                  {t('treatments.process_add_btn')}
                </Button>
              }
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1.5, display: 'block' }}
              >
                {t('common.drag_hint')}
              </Typography>
              <Spa2SortableGrid items={process} onReorder={reorderProcess}>
                {process.map((step, idx) => (
                  <Spa2SortableItem key={step.id} id={step.id}>
                    {(sortable) => (
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="flex-start"
                        sx={{ bgcolor: SPA2_CREAM, borderRadius: 2, p: 1.5, mb: 1.5 }}
                      >
                        <Spa2DragHandle sortable={sortable} sx={{ mt: 1 }} />
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: 13,
                            flexShrink: 0,
                            mt: 0.5,
                          }}
                        >
                          {idx + 1}
                        </Box>
                        <Stack spacing={1} sx={{ flexGrow: 1 }}>
                          <TextField
                            size="small"
                            label={t('treatments.process_col_title')}
                            value={step.title}
                            onChange={(e) => updateProcessStep(step.id, 'title', e.target.value)}
                            fullWidth
                          />
                          <TextField
                            size="small"
                            label={t('treatments.process_col_desc')}
                            value={step.desc}
                            onChange={(e) => updateProcessStep(step.id, 'desc', e.target.value)}
                            fullWidth
                            multiline
                            rows={2}
                          />
                        </Stack>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setProcessDeleteId(step.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                ))}
              </Spa2SortableGrid>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Box sx={{ bgcolor: SPA2_CREAM, p: 3 }}>
                  <Spa2SectionTitle eyebrow="Quy trình" title="4 bước điều trị chuẩn y khoa" />
                  <Stack spacing={0}>
                    {process.map((p, idx) => (
                      <ProcessStepPreview
                        key={p.id}
                        title={p.title}
                        desc={p.desc}
                        index={idx}
                        isLast={idx === process.length - 1}
                      />
                    ))}
                  </Stack>
                </Box>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Công nghệ sử dụng */}
      {tab === 'tech' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ p: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openTechCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('before_after.tech_add_btn')}
            </Button>
          </Stack>
          <Box sx={{ p: 2, pt: 0 }}>
            <Grid container spacing={2}>
              {techs.map((tech) => (
                <Grid key={tech.id} xs={12} sm={6} md={4}>
                  <Box sx={{ position: 'relative' }}>
                    <TechPreviewCard form={tech} />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <Tooltip title={t('common.edit')}>
                        <IconButton
                          size="small"
                          onClick={() => openTechEdit(tech)}
                          sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:pen-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('common.delete')}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setTechDeleteId(tech.id)}
                          sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      )}

      {/* Đội ngũ chuyên gia */}
      {tab === 'team' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ p: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openExpertCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('before_after.team_add_btn')}
            </Button>
          </Stack>
          <Box sx={{ p: 2, pt: 0 }}>
            <Grid container spacing={2}>
              {experts.map((e) => (
                <Grid key={e.id} xs={12} sm={6} md={3}>
                  <Box sx={{ position: 'relative' }}>
                    <TeamPreviewCard form={e} />
                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <Tooltip title={t('common.edit')}>
                        <IconButton
                          size="small"
                          onClick={() => openExpertEdit(e)}
                          sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:pen-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('common.delete')}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setExpertDeleteId(e.id)}
                          sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      )}

      {/* Đánh giá khách hàng (chia sẻ với trang Đánh giá) */}
      {tab === 'reviews' && (
        <Card>
          <Stack sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('before_after.reviews_hint')}
            </Typography>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('before_after.col_reviewer')}</TableCell>
                  <TableCell>{t('before_after.col_rating')}</TableCell>
                  <TableCell>{t('before_after.col_comment')}</TableCell>
                  <TableCell align="center">{t('before_after.col_reactions')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar src={r.avatar} sx={{ width: 36, height: 36 }} />
                        <Box>
                          <Typography variant="subtitle2">{r.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {r.service}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Rating value={r.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 280 }}>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {r.comment}
                      </Typography>
                      {r.reply && (
                        <Typography variant="caption" sx={{ color: SPA2_TEAL_DARK }} noWrap>
                          ↳ {r.reply}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        size="small"
                        variant="soft"
                        icon={<Iconify icon="solar:heart-bold" width={14} />}
                        label={r.likeCount ?? 0}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          r.status === 'approved'
                            ? t('common.approved')
                            : r.status === 'rejected'
                              ? t('common.rejected')
                              : t('common.pending')
                        }
                        color={
                          r.status === 'approved'
                            ? 'success'
                            : r.status === 'rejected'
                              ? 'error'
                              : 'warning'
                        }
                        variant="soft"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        {r.status === 'pending' && (
                          <>
                            <Tooltip title={t('common.approve')}>
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleReviewSetStatus(r.id, 'approved')}
                              >
                                <Iconify icon="solar:check-circle-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('common.reject')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleReviewSetStatus(r.id, 'rejected')}
                              >
                                <Iconify icon="solar:close-circle-bold" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        <Tooltip title={t('common.view')}>
                          <IconButton size="small" onClick={() => openReviewDetail(r)}>
                            <Iconify icon="solar:eye-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* FAQ (chia sẻ với trang FAQ) */}
      {tab === 'faq' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('before_after.faq_hint')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openFaqCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('faq.add_btn')}
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('faq.col_question')}</TableCell>
                  <TableCell>{t('faq.col_visible')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faqItems.map((f) => (
                  <TableRow key={f.id} hover>
                    <TableCell sx={{ maxWidth: 480 }}>
                      <Typography variant="subtitle2" noWrap>
                        {f.q}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={f.published ? t('faq.status_visible') : t('faq.status_hidden')}
                        color={f.published ? 'success' : 'default'}
                        variant="soft"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title={f.published ? t('common.hidden') : t('common.visible')}>
                          <IconButton size="small" onClick={() => handleFaqToggle(f.id)}>
                            <Iconify
                              icon={f.published ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
                              color={f.published ? 'warning.main' : 'success.main'}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openFaqEdit(f)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setFaqDeleteId(f.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Live preview — mirrors Spa2BeforeAfterPageView's slider grid (approved only) */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />

          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container>
              <Spa2SectionTitle eyebrow="Trải nghiệm" title="Kéo để so sánh" />
              {approvedItems.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có ca nào được duyệt để hiển thị công khai.
                </Typography>
              ) : (
                <Grid container spacing={4}>
                  {approvedItems.map((ba) => (
                    <Grid key={ba.id} xs={12} sm={6}>
                      <BeforeAfterPreviewCard form={ba} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Công nghệ" title="Thiết bị & công nghệ độc quyền" />
              <Grid container spacing={3}>
                {techs.map((tc) => (
                  <Grid key={tc.id} xs={12} sm={6} md={3}>
                    <Spa2SoftCard sx={{ textAlign: 'center' }}>
                      <Iconify icon={tc.icon} width={40} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                      <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 1 }}>
                        {tc.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {tc.desc}
                      </Typography>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 10 } }}>
            <Container>
              <Spa2SectionTitle eyebrow="Đội ngũ" title="Chuyên gia phụ trách" />
              <Grid container spacing={3} justifyContent="center">
                {experts.map((e) => (
                  <Grid key={e.id} xs={12} sm={6} md={3}>
                    <Spa2SoftCard sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={e.image}
                        sx={{
                          width: 88,
                          height: 88,
                          mx: 'auto',
                          mb: 1.5,
                          border: `3px solid ${SPA2_TEAL_LIGHT}`,
                        }}
                      />
                      <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{e.name}</Typography>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {e.role}
                      </Typography>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Đánh giá" title="Khách hàng nói gì" />
              <Grid container spacing={3}>
                {reviews
                  .filter((f) => f.status === 'approved')
                  .slice(0, 3)
                  .map((f) => (
                    <Grid key={f.id} xs={12} sm={6} md={4}>
                      <Spa2SoftCard>
                        <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                        <Typography
                          sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}
                        >
                          &ldquo;{f.comment}&rdquo;
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={f.avatar} />
                          <Stack>
                            <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
                              {f.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                              {f.service}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Spa2SoftCard>
                    </Grid>
                  ))}
              </Grid>
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="md">
              <Spa2SectionTitle eyebrow="FAQ" title="Câu hỏi thường gặp" />
              {faqItems
                .filter((f) => f.published)
                .slice(0, 4)
                .map((f, idx) => (
                  <Accordion
                    key={f.id}
                    defaultExpanded={idx === 0}
                    sx={{
                      mb: 1.5,
                      borderRadius: '12px !important',
                      border: `1px solid ${SPA2_CREAM}`,
                      boxShadow: 'none',
                      '&:before': { display: 'none' },
                    }}
                  >
                    <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                        {f.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Container>
          </Box>
        </Box>
      )}

      {/* View dialog */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="md" fullWidth>
        <DialogTitle>{t('before_after.detail_title')}</DialogTitle>
        <DialogContent dividers>
          {viewItem && <BeforeAfterPreviewCard form={viewItem} />}
        </DialogContent>
        <DialogActions>
          {viewItem?.status === 'pending' && (
            <>
              <Button
                color="error"
                onClick={() => {
                  handleSetStatus(viewItem.id, 'rejected');
                  setViewItem(null);
                }}
              >
                {t('common.reject')}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleSetStatus(viewItem.id, 'approved');
                  setViewItem(null);
                }}
              >
                {t('common.approve')}
              </Button>
            </>
          )}
          <Button onClick={() => setViewItem(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>

      {/* Create / Edit dialog - left: form, right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {editId !== null ? t('before_after.form_edit') : t('before_after.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('before_after.form_title')}
                  value={form.title}
                  onChange={handleChange('title')}
                  fullWidth
                />
                <Spa2SimpleImageField
                  label={t('before_after.form_before')}
                  value={form.before}
                  onChange={(url) => setForm((p) => ({ ...p, before: url }))}
                  height={140}
                />
                <Spa2SimpleImageField
                  label={t('before_after.form_after')}
                  value={form.after}
                  onChange={(url) => setForm((p) => ({ ...p, after: url }))}
                  height={140}
                />
                <TextField
                  label={t('before_after.form_duration')}
                  value={form.duration}
                  onChange={handleChange('duration')}
                  fullWidth
                />
                <TextField
                  label={t('before_after.form_note')}
                  value={form.note}
                  onChange={handleChange('note')}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <BeforeAfterPreviewCard form={form} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('before_after.form_edit') : t('before_after.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('before_after.delete_title')}
        content={t('before_after.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!processDeleteId}
        onClose={() => setProcessDeleteId(null)}
        title={t('treatments.process_delete_title')}
        content={t('treatments.process_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProcess}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Technology create/edit dialog - left: form, right: live preview */}
      <Dialog open={techOpenForm} onClose={() => setTechOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {techEditId !== null ? t('before_after.tech_edit') : t('before_after.tech_add_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('partners.col_label')}
                  value={techForm.name}
                  onChange={(e) => setTechForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('partners.col_icon')}
                  value={techForm.icon}
                  onChange={(e) => setTechForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  placeholder="solar:cpu-bolt-bold-duotone"
                />
                <TextField
                  label={t('common.description')}
                  value={techForm.desc}
                  onChange={(e) => setTechForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <TechPreviewCard form={techForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTechOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleTechSubmit}
            disabled={!techForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {techEditId !== null ? t('before_after.tech_edit') : t('before_after.tech_add_btn')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!techDeleteId}
        onClose={() => setTechDeleteId(null)}
        title={t('before_after.tech_delete_title')}
        content={t('before_after.tech_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleTechDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Expert create/edit dialog - left: form, right: live preview */}
      <Dialog
        open={expertOpenForm}
        onClose={() => setExpertOpenForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {expertEditId !== null ? t('before_after.team_edit') : t('before_after.team_add_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Spa2SimpleImageField
                  label={t('before_after.form_expert_photo')}
                  value={expertForm.image}
                  onChange={(url) => setExpertForm((p) => ({ ...p, image: url }))}
                  height={140}
                  rounded
                />
                <TextField
                  label={t('partners.form_name')}
                  value={expertForm.name}
                  onChange={(e) => setExpertForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('before_after.form_expert_role')}
                  value={expertForm.role}
                  onChange={(e) => setExpertForm((p) => ({ ...p, role: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <TeamPreviewCard form={expertForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExpertOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleExpertSubmit}
            disabled={!expertForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {expertEditId !== null ? t('before_after.team_edit') : t('before_after.team_add_btn')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!expertDeleteId}
        onClose={() => setExpertDeleteId(null)}
        title={t('before_after.team_delete_title')}
        content={t('before_after.team_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleExpertDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Review detail dialog - full comment + Duyệt/Từ chối/Thích/Phản hồi */}
      <Dialog open={!!reviewDetail} onClose={() => setReviewDetail(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('before_after.review_detail_title')}</DialogTitle>
        <DialogContent dividers>
          {reviewDetail && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar src={reviewDetail.avatar} sx={{ width: 48, height: 48 }} />
                <Box>
                  <Typography variant="subtitle1">{reviewDetail.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {reviewDetail.role} · {reviewDetail.service}
                  </Typography>
                </Box>
              </Stack>
              <Rating value={reviewDetail.rating} readOnly />
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {reviewDetail.comment}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  label={
                    reviewDetail.status === 'approved'
                      ? t('common.approved')
                      : reviewDetail.status === 'rejected'
                        ? t('common.rejected')
                        : t('common.pending')
                  }
                  color={
                    reviewDetail.status === 'approved'
                      ? 'success'
                      : reviewDetail.status === 'rejected'
                        ? 'error'
                        : 'warning'
                  }
                  variant="soft"
                />
                <Button
                  size="small"
                  startIcon={<Iconify icon="solar:heart-bold" width={16} />}
                  onClick={() => handleReviewReact(reviewDetail.id)}
                  sx={{ color: SPA2_TEAL }}
                >
                  {t('before_after.react_btn')} ({reviewDetail.likeCount ?? 0})
                </Button>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography variant="subtitle2">{t('before_after.reply_label')}</Typography>
                <TextField
                  value={replyDraft}
                  onChange={(e) => setReplyDraft(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  placeholder={t('before_after.reply_placeholder')}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleReviewReplySubmit}
                  sx={{ alignSelf: 'flex-start', color: SPA2_TEAL, borderColor: SPA2_TEAL }}
                >
                  {t('before_after.reply_btn')}
                </Button>
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {reviewDetail?.status === 'pending' && (
            <>
              <Button
                color="error"
                onClick={() => handleReviewSetStatus(reviewDetail.id, 'rejected')}
              >
                {t('common.reject')}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleReviewSetStatus(reviewDetail.id, 'approved')}
              >
                {t('common.approve')}
              </Button>
            </>
          )}
          <Button onClick={() => setReviewDetail(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>

      {/* FAQ create/edit dialog - left: form, right: live preview */}
      <Dialog open={faqOpenForm} onClose={() => setFaqOpenForm(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{faqEditId !== null ? t('faq.form_edit') : t('faq.add_btn')}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={5}>
              <Stack spacing={2}>
                <TextField
                  label={t('faq.col_question')}
                  value={faqForm.q}
                  onChange={(e) => setFaqForm((p) => ({ ...p, q: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('faq.form_answer')}
                  value={faqForm.a}
                  onChange={(e) => setFaqForm((p) => ({ ...p, a: e.target.value }))}
                  fullWidth
                  multiline
                  rows={3}
                />
                <TextField
                  label={t('faq.form_category')}
                  value={faqForm.cat}
                  onChange={(e) => setFaqForm((p) => ({ ...p, cat: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('partners.col_icon')}
                  value={faqForm.icon}
                  onChange={(e) => setFaqForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  placeholder="solar:question-circle-bold-duotone"
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={7}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <FaqPreviewCard form={faqForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFaqOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleFaqSubmit}
            disabled={!faqForm.q}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {faqEditId !== null ? t('faq.form_edit') : t('faq.add_btn')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!faqDeleteId}
        onClose={() => setFaqDeleteId(null)}
        title={t('faq.delete_title')}
        content={t('faq.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleFaqDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
