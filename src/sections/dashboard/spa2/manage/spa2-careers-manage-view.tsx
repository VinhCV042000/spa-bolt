import type { ReactNode } from 'react';
import type {
  Spa2CareerItem,
  Spa2CareerStatus,
  Spa2WorkplaceVideo,
  Spa2AdjustableImage,
  Spa2CareerApplication,
  Spa2CareerApplicationStatus,
} from 'src/_mock/_spa2';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  SPA2_CAREERS,
  spa2JoinReasons,
  spa2CareersBanner,
  spa2WorkplaceVideos,
  spa2WorkplaceGallery,
  spa2RecruitmentProcess,
  SPA2_CAREER_APPLICATIONS,
} from 'src/_mock/_spa2';

import { Upload } from 'src/components/upload';
import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// ----------------------------------------------------------------------
// Manages every content block src/sections/spa2/view/spa2-content-pages.tsx
// (Spa2CareersPageView / Spa2CareerDetailsPageView) renders on the public
// /spa2/careers pages: banner, join reasons, recruitment process, workplace
// gallery, and the job listings themselves — all read from and written back
// in the same shape as src/_mock/_spa2 (the single source of truth shared
// with the public view).
// ----------------------------------------------------------------------

type ReasonItem = { id: string; icon: string; text: string };
type ProcessItem = { id: string; step: string; desc: string };
type GalleryItem = { id: string; image: Spa2AdjustableImage };
type VideoItem = { id: string } & Spa2WorkplaceVideo;

const JOB_TYPES = ['Toàn thời gian', 'Bán thời gian', 'Linh hoạt', 'Remote'];

const EMPTY_FORM = {
  status: 'open' as Spa2CareerStatus,
  title: '',
  location: '',
  type: 'Toàn thời gian',
  salary: '',
  benefits: '',
  description: '',
};

type StatusFilter = 'all' | 'open' | 'closed';

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

// ---- Hồ sơ ứng tuyển (career applications) ----
const APPLICATION_STATUS_LABEL: Record<Spa2CareerApplicationStatus, string> = {
  new: 'Mới',
  reviewing: 'Đang xem xét',
  interview: 'Phỏng vấn',
  hired: 'Đã tuyển',
  rejected: 'Từ chối',
};

const APPLICATION_STATUS_COLOR: Record<
  Spa2CareerApplicationStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  reviewing: 'warning',
  interview: 'warning',
  hired: 'success',
  rejected: 'error',
};

const APPLICATION_STATUS_OPTIONS: Spa2CareerApplicationStatus[] = [
  'new',
  'reviewing',
  'interview',
  'hired',
  'rejected',
];

type ApplicationStatusFilter = Spa2CareerApplicationStatus | 'all';

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

// Mirrors one "Lý do gia nhập" icon+text card exactly as Spa2CareersPageView
// renders it (icon on top, centered bold text below).
function ReasonPreviewCard({ icon, text }: { icon: string; text: string }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center', bgcolor: 'common.white' }}>
      <Iconify
        icon={icon || 'solar:star-bold-duotone'}
        width={32}
        sx={{ color: SPA2_TEAL, mb: 1 }}
      />
      <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 14 }}>
        {text || '(Chưa có nội dung)'}
      </Typography>
    </Spa2SoftCard>
  );
}

// Mirrors one step of the "Quy trình tuyển dụng" row exactly as it renders on
// the career details page (Spa2CareerDetailsPageView, spa2-content-pages.tsx):
// numbered circle + step name, connected to the next step by a right-pointing
// arrow icon (hidden below `sm`, same as the public markup). `desc` isn't
// shown by the public row itself, but is surfaced here in muted text so
// admins can see the copy they're editing without opening the details page.
function ProcessStepPreview({
  step,
  desc,
  index,
  isLast,
}: {
  step: string;
  desc: string;
  index: number;
  isLast: boolean;
}) {
  return (
    <Stack key={index} direction="row" spacing={3}>
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
          {step || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{desc}</Typography>
      </Box>
    </Stack>
  );
}

// Mirrors the workplace-culture video card on the career details page:
// thumbnail background + centered play button + caption. `hasVideo` toggles
// only the caption/cursor - the thumbnail itself is shown either way, matching
// today's fallback behaviour when no video has been uploaded. Adapted to take
// one plural workplace-video item's props (thumbnail + title) instead of the
// old single shared thumbnail.
function CareerVideoPreviewCard({
  thumbnail,
  title,
  hasVideo,
}: {
  thumbnail: Spa2AdjustableImage;
  title: string;
  hasVideo: boolean;
}) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden', maxWidth: 420, mx: 'auto' }}>
      <Box sx={{ position: 'relative', cursor: hasVideo ? 'pointer' : 'default' }}>
        <Box
          sx={{
            height: 200,
            ...spa2ImageBackgroundStyle(thumbnail),
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(31,42,40,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:play-bold" width={28} sx={{ color: SPA2_TEAL }} />
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{ p: 1.5, color: SPA2_INK, fontWeight: 600, textAlign: 'center', fontSize: 13 }}
      >
        {title || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ pb: 1.5, color: 'text.secondary', textAlign: 'center', fontSize: 12 }}>
        {hasVideo ? 'Đã có video' : 'Chưa có video – chỉ hiển thị ảnh tĩnh'}
      </Typography>
    </Spa2SoftCard>
  );
}

// ----------------------------------------------------------------------

export function Spa2CareersManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2CareersBanner,
    image: { ...spa2CareersBanner.image },
  }));
  const [reasons, setReasons] = useState<ReasonItem[]>(() =>
    spa2JoinReasons.map((r) => withId({ ...r }))
  );
  const [process, setProcess] = useState<ProcessItem[]>(() =>
    spa2RecruitmentProcess.map((p) => withId({ ...p }))
  );
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    spa2WorkplaceGallery.map((image) => withId({ image: { ...image } }))
  );
  const [videos, setVideos] = useState<VideoItem[]>(() =>
    spa2WorkplaceVideos.map((v) => withId({ ...v, thumbnail: { ...v.thumbnail } }))
  );
  const [items, setItems] = useState<Spa2CareerItem[]>(SPA2_CAREERS);
  const [applications, setApplications] =
    useState<Spa2CareerApplication[]>(SPA2_CAREER_APPLICATIONS);

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'reasons' | 'positions' | 'process' | 'gallery' | 'applications' | 'preview'
  >('banner');
  const markDirty = () => setDirty(true);

  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<StatusFilter>('all');
  const table = useTable({ defaultRowsPerPage: 5 });
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // ---- Hồ sơ ứng tuyển (career applications) ----
  const [applicationSearch, setApplicationSearch] = useState('');
  const [applicationStatusFilter, setApplicationStatusFilter] =
    useState<ApplicationStatusFilter>('all');
  const [viewApplication, setViewApplication] = useState<Spa2CareerApplication | null>(null);
  const applicationTable = useTable({ defaultRowsPerPage: 5 });

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Reasons CRUD ----
  const updateReason = (id: string, key: 'icon' | 'text', value: string) => {
    setReasons((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
    markDirty();
  };
  const addReason = () => {
    setReasons((prev) => [...prev, withId({ icon: 'solar:star-bold-duotone', text: '' })]);
    markDirty();
  };
  const [reasonDeleteId, setReasonDeleteId] = useState<string | null>(null);
  const confirmDeleteReason = () => {
    setReasons((prev) => prev.filter((r) => r.id !== reasonDeleteId));
    setReasonDeleteId(null);
    markDirty();
  };
  const reorderReasons = (next: ReasonItem[]) => {
    setReasons(next);
    markDirty();
  };

  // ---- Recruitment process CRUD ----
  const updateProcessStep = (id: string, key: 'step' | 'desc', value: string) => {
    setProcess((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)));
    markDirty();
  };
  const addProcessStep = () => {
    setProcess((prev) => [...prev, withId({ step: '', desc: '' })]);
    markDirty();
  };
  const [processDeleteId, setProcessDeleteId] = useState<string | null>(null);
  const confirmDeleteProcess = () => {
    setProcess((prev) => prev.filter((p) => p.id !== processDeleteId));
    setProcessDeleteId(null);
    markDirty();
  };
  const reorderProcess = (next: ProcessItem[]) => {
    setProcess(next);
    markDirty();
  };

  // ---- Workplace gallery CRUD ----
  const addGalleryImage = () => {
    setGallery((prev) => [
      ...prev,
      withId({ image: { url: '', focalX: 50, focalY: 50, zoom: 100 } }),
    ]);
    markDirty();
  };
  const updateGalleryImage = (id: string, img: Spa2AdjustableImage) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, image: img } : g)));
    markDirty();
  };
  const [galleryDeleteId, setGalleryDeleteId] = useState<string | null>(null);
  const confirmDeleteGallery = () => {
    setGallery((prev) => prev.filter((g) => g.id !== galleryDeleteId));
    setGalleryDeleteId(null);
    markDirty();
  };
  const reorderGallery = (next: GalleryItem[]) => {
    setGallery(next);
    markDirty();
  };

  // ---- Workplace videos CRUD ----
  const addVideo = () => {
    setVideos((prev) => [
      ...prev,
      withId({
        title: '',
        thumbnail: { url: '', focalX: 50, focalY: 50, zoom: 100 },
        videoUrl: '',
      }),
    ]);
    markDirty();
  };
  const updateVideoTitle = (id: string, title: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, title } : v)));
    markDirty();
  };
  const updateVideoThumbnail = (id: string, thumbnail: Spa2AdjustableImage) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, thumbnail } : v)));
    markDirty();
  };
  const handleVideoFileUpload = useCallback((id: string, files: File[]) => {
    const file = files[0];
    if (!file) return;
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, videoUrl: URL.createObjectURL(file) } : v))
    );
    markDirty();
  }, []);
  const handleVideoFileRemove = (id: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, videoUrl: '' } : v)));
    markDirty();
  };
  const [videoDeleteId, setVideoDeleteId] = useState<string | null>(null);
  const confirmDeleteVideo = () => {
    setVideos((prev) => prev.filter((v) => v.id !== videoDeleteId));
    setVideoDeleteId(null);
    markDirty();
  };
  const reorderVideos = (next: VideoItem[]) => {
    setVideos(next);
    markDirty();
  };

  // ---- Job listings CRUD ----
  const filtered = useMemo(
    () =>
      items.filter((c) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
        const matchStatus = statusTab === 'all' || c.status === statusTab;
        return matchSearch && matchStatus;
      }),
    [items, search, statusTab]
  );

  const counts = {
    all: items.length,
    open: items.filter((c) => c.status === 'open').length,
    closed: items.filter((c) => c.status === 'closed').length,
    applications: items.reduce((sum, c) => sum + (c.applications ?? 0), 0),
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const formBenefits = useMemo(
    () =>
      form.benefits
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean),
    [form.benefits]
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = {
      status: form.status,
      title: form.title,
      location: form.location,
      type: form.type,
      salary: form.salary,
      benefits: formBenefits,
      description: form.description,
    };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [
        {
          ...next,
          id: newId,
          applications: 0,
          postedAt: new Date().toISOString().slice(0, 10),
        },
        ...p,
      ]);
    }
    setOpenForm(false);
    markDirty();
  }, [form, formBenefits, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    markDirty();
  }, [deleteId]);

  const handleToggleStatus = useCallback((id: number) => {
    setItems((p) =>
      p.map((x) => (x.id === id ? { ...x, status: x.status === 'open' ? 'closed' : 'open' } : x))
    );
    markDirty();
  }, []);

  // ---- Hồ sơ ứng tuyển ----
  const filteredApplications = useMemo(
    () =>
      applications.filter((a) => {
        const q = applicationSearch.toLowerCase();
        const matchSearch =
          !q ||
          a.name.toLowerCase().includes(q) ||
          a.jobTitle.toLowerCase().includes(q) ||
          a.phone.includes(applicationSearch) ||
          a.email.toLowerCase().includes(q);
        const matchStatus =
          applicationStatusFilter === 'all' || a.status === applicationStatusFilter;
        return matchSearch && matchStatus;
      }),
    [applications, applicationSearch, applicationStatusFilter]
  );

  const applicationCounts = {
    all: applications.length,
    new: applications.filter((a) => a.status === 'new').length,
    reviewing: applications.filter((a) => a.status === 'reviewing').length,
    interview: applications.filter((a) => a.status === 'interview').length,
    hired: applications.filter((a) => a.status === 'hired').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const handleSetApplicationStatus = useCallback(
    (id: number, status: Spa2CareerApplicationStatus) => {
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      setViewApplication((v) => (v?.id === id ? { ...v, status } : v));
    },
    []
  );

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2CareersBanner, image: { ...spa2CareersBanner.image } });
    setReasons(spa2JoinReasons.map((r) => withId({ ...r })));
    setProcess(spa2RecruitmentProcess.map((p) => withId({ ...p })));
    setGallery(spa2WorkplaceGallery.map((image) => withId({ image: { ...image } })));
    setVideos(spa2WorkplaceVideos.map((v) => withId({ ...v, thumbnail: { ...v.thumbnail } })));
    setItems(SPA2_CAREERS);
    setApplications(SPA2_CAREER_APPLICATIONS);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('careers.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.careers')}
      publicPath={paths.spa2.careers}
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
          label={t('careers.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reasons"
          label={t('careers.reasons_section')}
          icon={<Iconify icon="solar:star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="positions"
          label={t('careers.positions_section')}
          icon={<Iconify icon="solar:case-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="process"
          label={t('careers.process_section')}
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="gallery"
          label={t('careers.gallery_section')}
          icon={<Iconify icon="solar:gallery-add-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="applications"
          label="Hồ sơ ứng tuyển"
          icon={<Iconify icon="solar:document-text-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - left: edit form, right: live preview (real Spa2PageHero, same
          component the public page renders) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('careers.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('careers.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('careers.banner_image_help')}
                />
                <TextField
                  label={t('careers.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('careers.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('careers.banner_subtitle')}
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
                <Spa2PageHero
                  image={banner.image.url}
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

      {/* Lý do gia nhập */}
      {tab === 'reasons' && (
        <SectionCard
          title={t('careers.reasons_section')}
          icon="solar:star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={addReason}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('careers.reasons_add')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('common.drag_hint')}
          </Typography>
          {reasons.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('careers.reasons_empty')}
            </Typography>
          )}
          <Spa2SortableGrid items={reasons} onReorder={reorderReasons}>
            <Grid container spacing={2}>
              {reasons.map((r) => (
                <Grid key={r.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={r.id}>
                    {(sortable) => (
                      <Stack spacing={1} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setReasonDeleteId(r.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                        <TextField
                          value={r.icon}
                          onChange={(e) => updateReason(r.id, 'icon', e.target.value)}
                          size="small"
                          label={t('careers.reasons_icon')}
                          fullWidth
                        />
                        <TextField
                          value={r.text}
                          onChange={(e) => updateReason(r.id, 'text', e.target.value)}
                          size="small"
                          label={t('careers.reasons_text')}
                          fullWidth
                          multiline
                          minRows={2}
                        />
                        <Divider />
                        <Typography variant="caption" color="text.secondary">
                          {t('common.preview_btn')}
                        </Typography>
                        <ReasonPreviewCard icon={r.icon} text={r.text} />
                      </Stack>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Danh sách vị trí */}
      {tab === 'positions' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Iconify icon="solar:case-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {t('careers.positions_section')}
                </Typography>
              </Stack>
              <Button
                size="small"
                onClick={openCreate}
                startIcon={<Iconify icon="mingcute:add-line" width={16} />}
              >
                {t('careers.add_btn')}
              </Button>
            </Stack>
          </Box>

          {/* KPI cards */}
          <Grid container spacing={2} sx={{ p: 2.5 }}>
            {[
              { label: t('common.all'), value: counts.all, icon: 'solar:case-bold-duotone' },
              {
                label: t('careers.status_open'),
                value: counts.open,
                icon: 'solar:play-circle-bold-duotone',
              },
              {
                label: t('careers.status_closed'),
                value: counts.closed,
                icon: 'solar:pause-circle-bold-duotone',
              },
              {
                label: t('careers.col_applications'),
                value: counts.applications,
                icon: 'solar:users-group-rounded-bold-duotone',
              },
            ].map((k) => (
              <Grid key={k.label} xs={6} md={3}>
                <Card
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: SPA2_CREAM,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: `${SPA2_TEAL}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={k.icon} width={22} sx={{ color: SPA2_TEAL_DARK }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}>
                      {k.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {k.label}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ px: 2.5 }}>
            <Tabs
              value={statusTab}
              onChange={(_, v) => {
                setStatusTab(v);
                table.onResetPage();
              }}
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab
                value="all"
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{t('common.all')}</span>
                    <Chip size="small" label={counts.all} />
                  </Stack>
                }
              />
              <Tab
                value="open"
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{t('careers.status_open')}</span>
                    <Chip size="small" color="success" label={counts.open} />
                  </Stack>
                }
              />
              <Tab
                value="closed"
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{t('careers.status_closed')}</span>
                    <Chip size="small" label={counts.closed} />
                  </Stack>
                }
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 2 }}>
            <TextField
              placeholder={t('careers.search_placeholder')}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                table.onResetPage();
              }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('careers.col_position')}</TableCell>
                  <TableCell>{t('careers.col_location')}</TableCell>
                  <TableCell>{t('careers.col_salary')}</TableCell>
                  <TableCell align="center">{t('careers.col_applications')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.title}
                          </Typography>
                          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} flexWrap="wrap">
                            <Chip
                              size="small"
                              label={item.type}
                              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                            />
                            {item.benefits.slice(0, 2).map((b) => (
                              <Chip
                                key={b}
                                size="small"
                                variant="outlined"
                                label={b}
                                sx={{ borderColor: `${SPA2_TEAL}55`, color: 'text.secondary' }}
                              />
                            ))}
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Iconify
                            icon="solar:map-point-bold"
                            width={14}
                            sx={{ color: SPA2_TEAL }}
                          />
                          <Typography variant="body2">{item.location}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: SPA2_TEAL_DARK, fontWeight: 600 }}>
                          {item.salary}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={item.applications ?? 0}
                          sx={{ bgcolor: `${SPA2_TEAL}15`, color: SPA2_TEAL_DARK, fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            item.status === 'open'
                              ? t('careers.status_open')
                              : t('careers.status_closed')
                          }
                          color={item.status === 'open' ? 'success' : 'default'}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          <Tooltip
                            title={
                              item.status === 'open' ? t('common.disable') : t('common.enable')
                            }
                          >
                            <IconButton size="small" onClick={() => handleToggleStatus(item.id)}>
                              <Iconify
                                icon={
                                  item.status === 'open'
                                    ? 'solar:lock-bold'
                                    : 'solar:lock-unlocked-bold'
                                }
                                sx={{
                                  color: item.status === 'open' ? 'warning.main' : 'success.main',
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.edit')}>
                            <IconButton
                              size="small"
                              component={RouterLink}
                              href={paths.dashboard.spa2.careerDetails(item.id)}
                            >
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
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      {t('common.no_data')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filtered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Quy trình tuyển dụng - left: editable sortable list, right: one combined
          preview of every step together, reproducing the exact horizontal
          circles + arrow-connector row Spa2CareerDetailsPageView renders on the
          real /spa2/careers/:id page (NOT the vertical timeline used by the
          service editor's "steps" tab preview - that shape belongs to the
          service details page, a different real layout). Only the two-column
          arrangement (left=edit, right=preview) is shared with that tab. */}
      {tab === 'process' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <SectionCard
              title={t('careers.process_section')}
              icon="solar:routing-2-bold-duotone"
              action={
                <Button
                  size="small"
                  onClick={addProcessStep}
                  startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                >
                  {t('careers.process_add')}
                </Button>
              }
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 1.5 }}
              >
                {t('common.drag_hint')}
              </Typography>
              {process.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {t('careers.process_empty')}
                </Typography>
              )}
              <Spa2SortableGrid items={process} onReorder={reorderProcess}>
                <Stack spacing={1.5}>
                  {process.map((p, idx) => (
                    <Spa2SortableItem key={p.id} id={p.id}>
                      {(sortable) => (
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{ p: 1.5, borderRadius: 2, bgcolor: SPA2_CREAM }}
                        >
                          <Spa2DragHandle sortable={sortable} />
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: SPA2_TEAL,
                              color: 'common.white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {idx + 1}
                          </Box>
                          <TextField
                            value={p.step}
                            onChange={(e) => updateProcessStep(p.id, 'step', e.target.value)}
                            size="small"
                            label={t('careers.process_step')}
                            sx={{ flex: 1 }}
                          />
                          <TextField
                            value={p.desc}
                            onChange={(e) => updateProcessStep(p.id, 'desc', e.target.value)}
                            size="small"
                            label={t('careers.process_desc')}
                            sx={{ flex: 2 }}
                          />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setProcessDeleteId(p.id)}
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
              <PreviewFrame>
                <Box sx={{ py: 6, bgcolor: SPA2_CREAM }}>
                  <Container maxWidth="md">
                    <Spa2SectionTitle
                      eyebrow="Quy trình"
                      title={`${process.length} bước tuyển dụng`}
                    />
                    <Stack spacing={0}>
                      {process.map((p, idx) => (
                        <ProcessStepPreview
                          key={p.id}
                          step={p.step}
                          desc={p.desc}
                          index={idx}
                          isLast={idx === process.length - 1}
                        />
                      ))}
                    </Stack>
                    {process.length === 0 && (
                      <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                        {t('careers.process_empty')}
                      </Typography>
                    )}
                  </Container>
                </Box>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Môi trường làm việc */}
      {tab === 'gallery' && (
        <Stack spacing={3}>
          <SectionCard
            title={t('careers.gallery_section')}
            icon="solar:gallery-add-bold-duotone"
            action={
              <Button
                size="small"
                onClick={addGalleryImage}
                startIcon={<Iconify icon="mingcute:add-line" width={16} />}
              >
                {t('careers.gallery_add')}
              </Button>
            }
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              {t('common.drag_hint')}
            </Typography>
            {gallery.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {t('careers.gallery_empty')}
              </Typography>
            )}
            <Spa2SortableGrid items={gallery} onReorder={reorderGallery}>
              <Grid container spacing={2}>
                {gallery.map((g) => (
                  <Grid key={g.id} xs={12} sm={6} md={3}>
                    <Spa2SortableItem id={g.id}>
                      {(sortable) => (
                        <Stack spacing={1} sx={{ p: 1.5, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Spa2DragHandle sortable={sortable} />
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setGalleryDeleteId(g.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                            </IconButton>
                          </Stack>
                          <Spa2ImageField
                            value={g.image}
                            onChange={(img) => updateGalleryImage(g.id, img)}
                            height={130}
                            allowZoom={false}
                          />
                        </Stack>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                ))}
              </Grid>
            </Spa2SortableGrid>
          </SectionCard>

          {/* Video môi trường làm việc - reorderable list of workplace videos shown
              alongside the image gallery on the public /spa2/careers page. Each item
              keeps its own adjustable thumbnail + uploaded video file (object URL,
              kept only for this browser session) + title, mirroring the image
              gallery list above. */}
          <SectionCard
            title="Video môi trường làm việc"
            icon="solar:videocamera-record-bold-duotone"
            action={
              <Button
                size="small"
                onClick={addVideo}
                startIcon={<Iconify icon="mingcute:add-line" width={16} />}
              >
                Thêm video
              </Button>
            }
          >
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              {t('common.drag_hint')}
            </Typography>
            {videos.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Chưa có video nào. Nhấn &ldquo;Thêm video&rdquo; để bắt đầu.
              </Typography>
            )}
            <Spa2SortableGrid items={videos} onReorder={reorderVideos}>
              <Grid container spacing={2}>
                {videos.map((v) => (
                  <Grid key={v.id} xs={12} md={6}>
                    <Spa2SortableItem id={v.id}>
                      {(sortable) => (
                        <Stack spacing={1.5} sx={{ p: 1.5, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Spa2DragHandle sortable={sortable} />
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setVideoDeleteId(v.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                            </IconButton>
                          </Stack>
                          <Spa2ImageField
                            label="Ảnh thumbnail"
                            value={v.thumbnail}
                            onChange={(img) => updateVideoThumbnail(v.id, img)}
                            height={130}
                            allowZoom={false}
                          />
                          <TextField
                            value={v.title}
                            onChange={(e) => updateVideoTitle(v.id, e.target.value)}
                            size="small"
                            label="Tiêu đề video"
                            fullWidth
                          />
                          <Upload
                            onDrop={(files) => handleVideoFileUpload(v.id, files)}
                            accept={{ 'video/*': [] }}
                            helperText="Kéo thả video hoặc nhấn để chọn (không bắt buộc)"
                          />
                          {v.videoUrl && (
                            <Stack spacing={1}>
                              <Box
                                component="video"
                                controls
                                src={v.videoUrl}
                                sx={{
                                  width: '100%',
                                  maxHeight: 200,
                                  borderRadius: 2,
                                  bgcolor: 'common.black',
                                }}
                              />
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleVideoFileRemove(v.id)}
                                startIcon={<Iconify icon="solar:trash-bin-trash-bold" width={16} />}
                                sx={{ alignSelf: 'flex-start' }}
                              >
                                Xoá video
                              </Button>
                            </Stack>
                          )}
                          <Divider />
                          <Typography variant="caption" color="text.secondary">
                            {t('common.preview_btn')}
                          </Typography>
                          <CareerVideoPreviewCard
                            thumbnail={v.thumbnail}
                            title={v.title}
                            hasVideo={!!v.videoUrl}
                          />
                        </Stack>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                ))}
              </Grid>
            </Spa2SortableGrid>
          </SectionCard>
        </Stack>
      )}

      {/* Hồ sơ ứng tuyển - operational queue of candidates who applied through
          the public career details page form, independent of the job listings
          themselves (a candidate keeps their record even if the job is later
          closed or removed). */}
      {tab === 'applications' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="solar:document-text-bold-duotone"
                width={22}
                sx={{ color: SPA2_TEAL }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Hồ sơ ứng tuyển
              </Typography>
            </Stack>
          </Box>

          {/* KPI cards */}
          <Grid container spacing={2} sx={{ p: 2.5 }}>
            {[
              {
                key: 'all',
                label: t('common.all'),
                value: applicationCounts.all,
                icon: 'solar:document-text-bold-duotone',
              },
              {
                key: 'new',
                label: APPLICATION_STATUS_LABEL.new,
                value: applicationCounts.new,
                icon: 'solar:bell-bing-bold-duotone',
              },
              {
                key: 'reviewing',
                label: APPLICATION_STATUS_LABEL.reviewing,
                value: applicationCounts.reviewing,
                icon: 'solar:hourglass-bold-duotone',
              },
              {
                key: 'interview',
                label: APPLICATION_STATUS_LABEL.interview,
                value: applicationCounts.interview,
                icon: 'solar:users-group-two-rounded-bold-duotone',
              },
              {
                key: 'hired',
                label: APPLICATION_STATUS_LABEL.hired,
                value: applicationCounts.hired,
                icon: 'solar:check-circle-bold-duotone',
              },
              {
                key: 'rejected',
                label: APPLICATION_STATUS_LABEL.rejected,
                value: applicationCounts.rejected,
                icon: 'solar:close-circle-bold-duotone',
              },
            ].map((k) => (
              <Grid key={k.key} xs={6} sm={4} md={2}>
                <Card
                  onClick={() => {
                    setApplicationStatusFilter(k.key as ApplicationStatusFilter);
                    applicationTable.onResetPage();
                  }}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: applicationStatusFilter === k.key ? `${SPA2_TEAL}12` : SPA2_CREAM,
                    transition: 'all .2s',
                    '&:hover': { borderColor: SPA2_TEAL },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: `${SPA2_TEAL}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={k.icon} width={22} sx={{ color: SPA2_TEAL_DARK }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}>
                      {k.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {k.label}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ p: 2.5, pt: 0 }}>
            <TextField
              placeholder="Tìm theo tên, SĐT, email hoặc vị trí..."
              value={applicationSearch}
              onChange={(e) => {
                setApplicationSearch(e.target.value);
                applicationTable.onResetPage();
              }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ px: 2.5 }}>
            <Tabs
              value={applicationStatusFilter}
              onChange={(_, v: ApplicationStatusFilter) => {
                setApplicationStatusFilter(v);
                applicationTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`${t('common.all')} (${applicationCounts.all})`} />
              {APPLICATION_STATUS_OPTIONS.map((s) => (
                <Tab
                  key={s}
                  value={s}
                  label={`${APPLICATION_STATUS_LABEL[s]} (${applicationCounts[s]})`}
                />
              ))}
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ứng viên</TableCell>
                  <TableCell>Vị trí ứng tuyển</TableCell>
                  <TableCell>Ngày ứng tuyển</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
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
                        <Stack>
                          <Typography variant="body2">{item.jobTitle}</Typography>
                          <Chip
                            size="small"
                            label={`#${item.jobId}`}
                            sx={{
                              mt: 0.5,
                              width: 'fit-content',
                              bgcolor: SPA2_CREAM,
                              color: SPA2_TEAL_DARK,
                              fontSize: 11,
                            }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.createdAt}</Typography>
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
                          {item.status === 'new' && (
                            <Tooltip title="Đánh dấu đang xem xét">
                              <IconButton
                                size="small"
                                sx={{ color: SPA2_TEAL_DARK }}
                                onClick={() => handleSetApplicationStatus(item.id, 'reviewing')}
                              >
                                <Iconify icon="solar:hourglass-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {item.status === 'reviewing' && (
                            <Tooltip title="Mời phỏng vấn">
                              <IconButton
                                size="small"
                                sx={{ color: SPA2_TEAL_DARK }}
                                onClick={() => handleSetApplicationStatus(item.id, 'interview')}
                              >
                                <Iconify icon="solar:users-group-two-rounded-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {item.status === 'interview' && (
                            <Tooltip title="Đánh dấu đã tuyển">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleSetApplicationStatus(item.id, 'hired')}
                              >
                                <Iconify icon="solar:check-circle-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {(item.status === 'new' ||
                            item.status === 'reviewing' ||
                            item.status === 'interview') && (
                            <Tooltip title="Từ chối">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleSetApplicationStatus(item.id, 'rejected')}
                              >
                                <Iconify icon="solar:close-circle-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title={t('common.view')}>
                            <IconButton size="small" onClick={() => setViewApplication(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredApplications.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      {t('common.no_data')}
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

      {/* Job listing dialog - left: form fields, right: live Spa2SoftCard preview of the position row */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {editId !== null ? t('careers.form_edit') : t('careers.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  select
                  label={t('common.status')}
                  value={form.status}
                  onChange={handleChange('status')}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="open">{t('careers.status_open')}</MenuItem>
                  <MenuItem value="closed">{t('careers.status_closed')}</MenuItem>
                </TextField>
                <TextField
                  label={t('careers.form_title')}
                  value={form.title}
                  onChange={handleChange('title')}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('careers.form_location')}
                    value={form.location}
                    onChange={handleChange('location')}
                    fullWidth
                  />
                  <TextField
                    select
                    label={t('careers.form_type')}
                    value={form.type}
                    onChange={handleChange('type')}
                    fullWidth
                  >
                    {JOB_TYPES.map((jobType) => (
                      <MenuItem key={jobType} value={jobType}>
                        {jobType}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <TextField
                  label={t('careers.form_salary')}
                  value={form.salary}
                  onChange={handleChange('salary')}
                  fullWidth
                />
                <TextField
                  label={t('careers.form_benefits')}
                  value={form.benefits}
                  onChange={handleChange('benefits')}
                  fullWidth
                  multiline
                  rows={2}
                  helperText={t('common.comma_hint')}
                />
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                    {t('careers.form_description')}
                  </Typography>
                  <Editor
                    value={form.description}
                    onChange={(html) => setForm((p) => ({ ...p, description: html }))}
                    placeholder={t('careers.form_description')}
                    fullItem
                    sx={{ maxHeight: 320 }}
                  />
                </Stack>
              </Stack>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {t('common.preview_btn')}
              </Typography>
              <PreviewFrame>
                <Box sx={{ p: 2.5, bgcolor: SPA2_CREAM }}>
                  <Spa2SoftCard>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={2}
                      alignItems={{ xs: 'flex-start', md: 'center' }}
                      justifyContent="space-between"
                    >
                      <Stack spacing={1}>
                        <Typography variant="h6" sx={{ color: SPA2_INK }}>
                          {form.title || t('careers.form_title')}
                        </Typography>
                        <Stack direction="row" spacing={2} flexWrap="wrap">
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:map-point-bold"
                              sx={{ color: SPA2_TEAL }}
                              width={16}
                            />
                            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                              {form.location || t('careers.form_location')}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify icon="solar:case-bold" sx={{ color: SPA2_TEAL }} width={16} />
                            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                              {form.type}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:wallet-money-bold"
                              sx={{ color: SPA2_TEAL }}
                              width={16}
                            />
                            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                              {form.salary || t('careers.form_salary')}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                          {formBenefits.map((b) => (
                            <Chip
                              key={b}
                              size="small"
                              label={b}
                              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                            />
                          ))}
                        </Stack>
                      </Stack>
                      <Button
                        disabled
                        sx={{
                          borderRadius: 999,
                          px: 3,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&.Mui-disabled': { bgcolor: SPA2_TEAL, color: 'white', opacity: 0.85 },
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </Stack>
                  </Spa2SoftCard>
                </Box>
              </PreviewFrame>
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
            {editId !== null ? t('careers.form_edit') : t('careers.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('careers.delete_title')}
        content={t('careers.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!reasonDeleteId}
        onClose={() => setReasonDeleteId(null)}
        title={t('careers.reasons_delete_title')}
        content={t('careers.reasons_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteReason}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!processDeleteId}
        onClose={() => setProcessDeleteId(null)}
        title={t('careers.process_delete_title')}
        content={t('careers.process_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProcess}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!galleryDeleteId}
        onClose={() => setGalleryDeleteId(null)}
        title={t('careers.gallery_section')}
        content={t('careers.reasons_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteGallery}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!videoDeleteId}
        onClose={() => setVideoDeleteId(null)}
        title="Xoá video"
        content={t('careers.reasons_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteVideo}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Hồ sơ ứng tuyển - view detail dialog: left = candidate info + avatar photo
          + free status select (same pattern as the bookings/training requests
          dialogs), right = CV file preview (iframe for the typical PDF case, with
          a graceful empty-state when no CV has been uploaded). */}
      <Dialog
        open={!!viewApplication}
        onClose={() => setViewApplication(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>Hồ sơ #{viewApplication?.id}</DialogTitle>
        <DialogContent dividers>
          {viewApplication && (
            <Grid container spacing={3}>
              <Grid xs={12} md={5}>
                <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Avatar
                    src={viewApplication.avatar}
                    alt={viewApplication.name}
                    sx={{ width: 108, height: 108 }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
                    {viewApplication.name}
                  </Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {[
                    ['Điện thoại', viewApplication.phone],
                    ['Email', viewApplication.email],
                    ['Vị trí ứng tuyển', viewApplication.jobTitle],
                    ['Ngày ứng tuyển', viewApplication.createdAt],
                    ['Ghi chú', viewApplication.note || '–'],
                  ].map(([label, value]) => (
                    <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                        {label}:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {value}
                      </Typography>
                    </Box>
                  ))}
                  <Divider />
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                      {t('common.status')}:
                    </Typography>
                    <TextField
                      select
                      size="small"
                      value={viewApplication.status}
                      onChange={(e) =>
                        handleSetApplicationStatus(
                          viewApplication.id,
                          e.target.value as Spa2CareerApplicationStatus
                        )
                      }
                      sx={{ flex: 1 }}
                    >
                      {APPLICATION_STATUS_OPTIONS.map((s) => (
                        <MenuItem key={s} value={s}>
                          {APPLICATION_STATUS_LABEL[s]}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Stack>
              </Grid>

              <Grid xs={12} md={7}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: SPA2_INK }}>
                  Hồ sơ / CV
                </Typography>
                {viewApplication.cvUrl ? (
                  <Stack spacing={1.5}>
                    <Button
                      component="a"
                      href={viewApplication.cvUrl}
                      target="_blank"
                      rel="noopener"
                      size="small"
                      variant="outlined"
                      startIcon={<Iconify icon="solar:file-download-bold" width={16} />}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Mở trong tab mới
                    </Button>
                    <Box
                      component="iframe"
                      src={viewApplication.cvUrl}
                      title={`CV - ${viewApplication.name}`}
                      sx={{ width: '100%', height: 420, border: 'none', borderRadius: 1 }}
                    />
                  </Stack>
                ) : (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1.5}
                    sx={{
                      height: 420,
                      borderRadius: 1,
                      bgcolor: SPA2_CREAM,
                      border: `1px dashed ${SPA2_TEAL_LIGHT}`,
                    }}
                  >
                    <Iconify
                      icon="solar:file-corrupted-bold-duotone"
                      width={48}
                      sx={{ color: SPA2_TEAL_LIGHT }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Ứng viên chưa tải lên CV
                    </Typography>
                  </Stack>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewApplication(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>

      {/* Full-page live preview - same section order as the public /spa2/careers page:
          hero -> join reasons -> position list -> workplace gallery (no recruitment
          process section and no CTA on this page - that content lives on the career
          details page instead). Built from the real Spa2PageHero/Spa2SectionTitle/
          Spa2SoftCard leaf components so it can never visually drift from reality. */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Box sx={{ bgcolor: 'background.default' }}>
            <Spa2PageHero
              image={banner.image.url}
              imageStyle={banner.image}
              eyebrow={banner.eyebrow}
              title={banner.title}
              subtitle={banner.subtitle}
            />

            {/* Lý do gia nhập */}
            <Box sx={{ py: { xs: 8, md: 10 } }}>
              <Container>
                <Spa2SectionTitle
                  eyebrow="Vì sao chọn chúng tôi"
                  title="Lý do gia nhập Nature Spa"
                />
                <Grid container spacing={3}>
                  {reasons.map((r) => (
                    <Grid key={r.id} xs={6} md={3}>
                      <Spa2SoftCard sx={{ textAlign: 'center' }}>
                        <Iconify icon={r.icon} width={40} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{r.text}</Typography>
                      </Spa2SoftCard>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>

            {/* Danh sách vị trí */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
              <Container>
                <Spa2SectionTitle eyebrow="Vị trí đang tuyển" title="Cơ hội nghề nghiệp" />
                <Stack spacing={2}>
                  {items.map((c) => (
                    <Spa2SoftCard key={c.id}>
                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                        alignItems={{ xs: 'flex-start', md: 'center' }}
                        justifyContent="space-between"
                      >
                        <Stack spacing={1}>
                          <Typography variant="h6" sx={{ color: SPA2_INK }}>
                            {c.title}
                          </Typography>
                          <Stack direction="row" spacing={2} flexWrap="wrap">
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Iconify
                                icon="solar:map-point-bold"
                                sx={{ color: SPA2_TEAL }}
                                width={16}
                              />
                              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                                {c.location}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Iconify
                                icon="solar:case-bold"
                                sx={{ color: SPA2_TEAL }}
                                width={16}
                              />
                              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                                {c.type}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Iconify
                                icon="solar:wallet-money-bold"
                                sx={{ color: SPA2_TEAL }}
                                width={16}
                              />
                              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                                {c.salary}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                            {c.benefits.map((b) => (
                              <Chip
                                key={b}
                                size="small"
                                label={b}
                                sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                              />
                            ))}
                          </Stack>
                        </Stack>
                        <Button
                          component={RouterLink}
                          href={paths.spa2.careerDetails(c.id)}
                          sx={{
                            borderRadius: 999,
                            px: 3,
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            '&:hover': { bgcolor: SPA2_TEAL_DARK },
                          }}
                        >
                          Xem chi tiết
                        </Button>
                      </Stack>
                    </Spa2SoftCard>
                  ))}
                  {items.length === 0 && (
                    <Typography sx={{ color: 'text.disabled', textAlign: 'center', py: 4 }}>
                      Không có vị trí nào phù hợp.
                    </Typography>
                  )}
                </Stack>
              </Container>
            </Box>

            {/* Văn hóa doanh nghiệp */}
            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Container>
                <Spa2SectionTitle eyebrow="Văn hóa" title="Môi trường làm việc" />
                <Grid container spacing={2}>
                  {gallery.map((g) => (
                    <Grid key={g.id} xs={6} md={3}>
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '4/3',
                          borderRadius: 3,
                          backgroundImage: `url(${g.image.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </Grid>
                  ))}
                  {videos.map((v) => (
                    <Grid key={v.id} xs={6} md={3}>
                      <Box
                        sx={{
                          position: 'relative',
                          borderRadius: 3,
                          overflow: 'hidden',
                          aspectRatio: '4/3',
                          ...spa2ImageBackgroundStyle(v.thumbnail),
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            bgcolor: 'rgba(31,42,40,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: 'rgba(255,255,255,0.9)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Iconify icon="solar:play-bold" width={20} sx={{ color: SPA2_TEAL }} />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
