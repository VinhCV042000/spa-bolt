import type { ReactNode } from 'react';
import type {
  Spa2AdjustableImage,
  Spa2TrainingProgram,
  Spa2TrainingGraduate,
  Spa2TrainingInstructor,
  Spa2TrainingRoadmapStage,
} from 'src/_mock/_spa2';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { RouterLink } from 'src/routes/components';

import {
  spa2Instructors,
  spa2TrainingBanner,
  spa2TrainingMission,
  spa2TrainingRoadmap,
  spa2TrainingPrograms,
  spa2GraduateShowcase,
  spa2TrainingMissionImage,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';
import {
  Spa2Cta,
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// ----------------------------------------------------------------------
// Manages every content block that src/sections/spa2/view/spa2-content-pages.tsx
// (Spa2TrainingPageView) renders on the public /spa2/training page: banner,
// mission, programs, roadmap, instructors, graduate showcase. All data is
// read from - and written back in the same shape as - src/_mock/_spa2 (the
// single source of truth shared with the public view), so "Lưu thay đổi"
// here always stays consistent with what the public page displays. Every
// image field supports drag & drop, pasting a URL, uploading a local file,
// and adjusting the focal point / zoom (via Spa2ImageField).
// ----------------------------------------------------------------------

type ProgramItem = Spa2TrainingProgram & { id: string };
type RoadmapItem = Spa2TrainingRoadmapStage & { id: string };
type InstructorItem = Spa2TrainingInstructor & { id: string };
type GraduateItem = Spa2TrainingGraduate & { id: string };

type WithAdjustableImage = {
  image: string;
  imageFocalX?: number;
  imageFocalY?: number;
  imageZoom?: number;
};

const LEVELS = ['Người mới', 'Trung cấp', 'Nâng cao'];

const LEVEL_COLOR: Record<string, 'info' | 'warning' | 'error'> = {
  'Người mới': 'info',
  'Trung cấp': 'warning',
  'Nâng cao': 'error',
};

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

// Bridges the flat `image` + `imageFocalX/Y/Zoom` sibling fields used by list
// items (instructors, graduates) with the nested `Spa2AdjustableImage` shape
// that `Spa2ImageField` expects.
const imageFieldValue = (form: WithAdjustableImage): Spa2AdjustableImage => ({
  url: form.image,
  focalX: form.imageFocalX ?? 50,
  focalY: form.imageFocalY ?? 50,
  zoom: form.imageZoom ?? 100,
});

function applyImageField<T extends WithAdjustableImage>(form: T, img: Spa2AdjustableImage): T {
  return {
    ...form,
    image: img.url,
    imageFocalX: img.focalX,
    imageFocalY: img.focalY,
    imageZoom: img.zoom,
  };
}

const EMPTY_PROGRAM: Omit<ProgramItem, 'id'> = {
  name: '',
  duration: '',
  level: LEVELS[0],
  price: 0,
  outcome: '',
};

const EMPTY_ROADMAP: Omit<RoadmapItem, 'id'> = { stage: '', duration: '', desc: '' };

const EMPTY_INSTRUCTOR: Omit<InstructorItem, 'id'> = {
  name: '',
  image: '',
  imageFocalX: 50,
  imageFocalY: 50,
  imageZoom: 100,
  experience: '',
  certs: [],
};

const EMPTY_GRADUATE: Omit<GraduateItem, 'id'> = {
  name: '',
  image: '',
  imageFocalX: 50,
  imageFocalY: 50,
  imageZoom: 100,
  review: '',
  student: '',
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

function DragHint() {
  return (
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
      Kéo biểu tượng <Iconify icon="nimbus:drag-dots" width={12} /> để sắp xếp lại thứ tự hiển thị.
    </Typography>
  );
}

function InstructorAvatar({
  size,
  border,
  instructor,
}: {
  size: number;
  border?: boolean;
  instructor: { image: string; imageFocalX?: number; imageFocalY?: number; imageZoom?: number };
}) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        flexShrink: 0,
        bgcolor: SPA2_CREAM_DARK,
        border: border ? `2px solid ${SPA2_TEAL_LIGHT}` : undefined,
        ...spa2ImageBackgroundStyle({
          url: instructor.image,
          focalX: instructor.imageFocalX ?? 50,
          focalY: instructor.imageFocalY ?? 50,
          zoom: instructor.imageZoom ?? 100,
        }),
      }}
    />
  );
}

function ProgramPreviewCard({ form }: { form: Omit<ProgramItem, 'id'> }) {
  return (
    <Spa2SoftCard>
      <Chip
        label={form.level}
        size="small"
        sx={{ bgcolor: SPA2_CREAM_DARK, color: SPA2_TEAL_DARK, mb: 2 }}
      />
      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
        {form.name || '(Chưa đặt tên)'}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} />
        <Typography sx={{ color: 'text.secondary' }}>{form.duration}</Typography>
      </Stack>
      <Box
        sx={{ color: 'text.secondary', mb: 2, '& p': { m: 0 } }}
        dangerouslySetInnerHTML={{ __html: form.outcome }}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" sx={{ color: SPA2_TEAL, mb: 2 }}>
        {formatVND(form.price)}
      </Typography>
      <Button
        fullWidth
        disabled
        sx={{ borderRadius: 999, bgcolor: SPA2_TEAL, color: 'white', opacity: 0.7 }}
      >
        Đăng ký tư vấn
      </Button>
    </Spa2SoftCard>
  );
}

function InstructorPreviewCard({
  form,
}: {
  form: Omit<InstructorItem, 'id'> & { certsInput: string };
}) {
  const certs = form.certsInput
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Avatar
        src={form.image}
        alt={form.name}
        slotProps={{
          img: {
            style: {
              objectPosition: `${form.imageFocalX ?? 50}% ${form.imageFocalY ?? 50}%`,
              transform: `scale(${(form.imageZoom ?? 100) / 100})`,
            },
          },
        }}
        sx={{ width: 96, height: 96, mx: 'auto', mb: 2, border: `3px solid ${SPA2_TEAL_LIGHT}` }}
      />
      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
        {form.name || '(Chưa đặt tên)'}
      </Typography>
      <Box
        sx={{ color: 'text.secondary', fontSize: 14, mb: 1.5, '& p': { m: 0 } }}
        dangerouslySetInnerHTML={{ __html: form.experience }}
      />
      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
        {certs.map((c) => (
          <Chip key={c} size="small" label={c} sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }} />
        ))}
      </Stack>
    </Spa2SoftCard>
  );
}

function GraduatePreviewCard({ form }: { form: Omit<GraduateItem, 'id'> }) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          height: 220,
          bgcolor: SPA2_CREAM_DARK,
          ...spa2ImageBackgroundStyle({
            url: form.image,
            focalX: form.imageFocalX ?? 50,
            focalY: form.imageFocalY ?? 50,
            zoom: form.imageZoom ?? 100,
          }),
        }}
      />
      <Box sx={{ p: 3 }}>
        <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, mb: 1 }}>
          {form.name || '(Chưa đặt tên)'}
        </Typography>
        <Box
          sx={{ color: SPA2_INK, fontStyle: 'italic', mb: 1.5, '& p': { m: 0 } }}
          dangerouslySetInnerHTML={{ __html: form.review }}
        />
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>— {form.student}</Typography>
      </Box>
    </Spa2SoftCard>
  );
}

// ----------------------------------------------------------------------

export function Spa2TrainingManageView() {
  const [banner, setBanner] = useState(() => ({
    ...spa2TrainingBanner,
    image: { ...spa2TrainingBanner.image },
  }));
  const [missionImage, setMissionImage] = useState<Spa2AdjustableImage>(() => ({
    ...spa2TrainingMissionImage,
  }));
  const [mission, setMission] = useState(spa2TrainingMission);
  const [programs, setPrograms] = useState<ProgramItem[]>(() =>
    spa2TrainingPrograms.map((p) => withId({ ...p }))
  );
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(() =>
    spa2TrainingRoadmap.map((r) => withId({ ...r }))
  );
  const [instructors, setInstructors] = useState<InstructorItem[]>(() =>
    spa2Instructors.map((i) => withId({ ...i, certs: [...i.certs] }))
  );
  const [graduates, setGraduates] = useState<GraduateItem[]>(() =>
    spa2GraduateShowcase.map((g) => withId({ ...g }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'mission' | 'programs' | 'roadmap' | 'instructors' | 'graduates' | 'preview'
  >('banner');
  const markDirty = () => setDirty(true);

  // ---- Program dialog state ----
  const [programDialog, setProgramDialog] = useState(false);
  const [programEditId, setProgramEditId] = useState<string | null>(null);
  const [programForm, setProgramForm] = useState<Omit<ProgramItem, 'id'>>(EMPTY_PROGRAM);
  const [programDeleteId, setProgramDeleteId] = useState<string | null>(null);

  // ---- Roadmap dialog state ----
  const [roadmapDialog, setRoadmapDialog] = useState(false);
  const [roadmapEditId, setRoadmapEditId] = useState<string | null>(null);
  const [roadmapForm, setRoadmapForm] = useState<Omit<RoadmapItem, 'id'>>(EMPTY_ROADMAP);
  const [roadmapDeleteId, setRoadmapDeleteId] = useState<string | null>(null);

  // ---- Instructor dialog state ----
  const [instructorDialog, setInstructorDialog] = useState(false);
  const [instructorEditId, setInstructorEditId] = useState<string | null>(null);
  const [instructorForm, setInstructorForm] = useState<
    Omit<InstructorItem, 'id'> & { certsInput: string }
  >({ ...EMPTY_INSTRUCTOR, certsInput: '' });
  const [instructorDeleteId, setInstructorDeleteId] = useState<string | null>(null);

  // ---- Graduate dialog state ----
  const [graduateDialog, setGraduateDialog] = useState(false);
  const [graduateEditId, setGraduateEditId] = useState<string | null>(null);
  const [graduateForm, setGraduateForm] = useState<Omit<GraduateItem, 'id'>>(EMPTY_GRADUATE);
  const [graduateDeleteId, setGraduateDeleteId] = useState<string | null>(null);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Mission ----
  const updateMission = (value: string) => {
    setMission(value);
    markDirty();
  };
  const updateMissionImage = (img: Spa2AdjustableImage) => {
    setMissionImage(img);
    markDirty();
  };

  // ---- Programs CRUD ----
  const openCreateProgram = () => {
    setProgramForm(EMPTY_PROGRAM);
    setProgramEditId(null);
    setProgramDialog(true);
  };
  const openEditProgram = (item: ProgramItem) => {
    setProgramForm(item);
    setProgramEditId(item.id);
    setProgramDialog(true);
  };
  const submitProgram = () => {
    const next = { ...programForm, price: Number(programForm.price) };
    if (programEditId) {
      setPrograms((prev) => prev.map((p) => (p.id === programEditId ? { ...p, ...next } : p)));
    } else {
      setPrograms((prev) => [...prev, withId(next)]);
    }
    setProgramDialog(false);
    markDirty();
  };
  const confirmDeleteProgram = () => {
    setPrograms((prev) => prev.filter((p) => p.id !== programDeleteId));
    setProgramDeleteId(null);
    markDirty();
  };
  const reorderPrograms = (next: ProgramItem[]) => {
    setPrograms(next);
    markDirty();
  };

  // ---- Roadmap CRUD ----
  const openCreateRoadmap = () => {
    setRoadmapForm(EMPTY_ROADMAP);
    setRoadmapEditId(null);
    setRoadmapDialog(true);
  };
  const openEditRoadmap = (item: RoadmapItem) => {
    setRoadmapForm(item);
    setRoadmapEditId(item.id);
    setRoadmapDialog(true);
  };
  const submitRoadmap = () => {
    if (roadmapEditId) {
      setRoadmap((prev) =>
        prev.map((r) => (r.id === roadmapEditId ? { ...r, ...roadmapForm } : r))
      );
    } else {
      setRoadmap((prev) => [...prev, withId(roadmapForm)]);
    }
    setRoadmapDialog(false);
    markDirty();
  };
  const confirmDeleteRoadmap = () => {
    setRoadmap((prev) => prev.filter((r) => r.id !== roadmapDeleteId));
    setRoadmapDeleteId(null);
    markDirty();
  };
  const reorderRoadmap = (next: RoadmapItem[]) => {
    setRoadmap(next);
    markDirty();
  };

  // ---- Instructor CRUD ----
  const openCreateInstructor = () => {
    setInstructorForm({ ...EMPTY_INSTRUCTOR, certsInput: '' });
    setInstructorEditId(null);
    setInstructorDialog(true);
  };
  const openEditInstructor = (item: InstructorItem) => {
    setInstructorForm({
      name: item.name,
      image: item.image,
      imageFocalX: item.imageFocalX,
      imageFocalY: item.imageFocalY,
      imageZoom: item.imageZoom,
      experience: item.experience,
      certs: item.certs,
      certsInput: item.certs.join(', '),
    });
    setInstructorEditId(item.id);
    setInstructorDialog(true);
  };
  const submitInstructor = () => {
    const certs = instructorForm.certsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const next = {
      name: instructorForm.name,
      image: instructorForm.image,
      imageFocalX: instructorForm.imageFocalX,
      imageFocalY: instructorForm.imageFocalY,
      imageZoom: instructorForm.imageZoom,
      experience: instructorForm.experience,
      certs,
    };
    if (instructorEditId) {
      setInstructors((prev) =>
        prev.map((i) => (i.id === instructorEditId ? { ...i, ...next } : i))
      );
    } else {
      setInstructors((prev) => [...prev, withId(next)]);
    }
    setInstructorDialog(false);
    markDirty();
  };
  const confirmDeleteInstructor = () => {
    setInstructors((prev) => prev.filter((i) => i.id !== instructorDeleteId));
    setInstructorDeleteId(null);
    markDirty();
  };
  const reorderInstructors = (next: InstructorItem[]) => {
    setInstructors(next);
    markDirty();
  };

  // ---- Graduate CRUD ----
  const openCreateGraduate = () => {
    setGraduateForm(EMPTY_GRADUATE);
    setGraduateEditId(null);
    setGraduateDialog(true);
  };
  const openEditGraduate = (item: GraduateItem) => {
    setGraduateForm(item);
    setGraduateEditId(item.id);
    setGraduateDialog(true);
  };
  const submitGraduate = () => {
    if (graduateEditId) {
      setGraduates((prev) =>
        prev.map((g) => (g.id === graduateEditId ? { ...g, ...graduateForm } : g))
      );
    } else {
      setGraduates((prev) => [...prev, withId(graduateForm)]);
    }
    setGraduateDialog(false);
    markDirty();
  };
  const confirmDeleteGraduate = () => {
    setGraduates((prev) => prev.filter((g) => g.id !== graduateDeleteId));
    setGraduateDeleteId(null);
    markDirty();
  };
  const reorderGraduates = (next: GraduateItem[]) => {
    setGraduates(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2TrainingBanner, image: { ...spa2TrainingBanner.image } });
    setMissionImage({ ...spa2TrainingMissionImage });
    setMission(spa2TrainingMission);
    setPrograms(spa2TrainingPrograms.map((p) => withId({ ...p })));
    setRoadmap(spa2TrainingRoadmap.map((r) => withId({ ...r })));
    setInstructors(spa2Instructors.map((i) => withId({ ...i, certs: [...i.certs] })));
    setGraduates(spa2GraduateShowcase.map((g) => withId({ ...g })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title="Quản lý trang Đào tạo"
      description="Banner, sứ mệnh học viện, chương trình đào tạo, lộ trình học, giảng viên và thành tựu học viên hiển thị trên trang Đào tạo công khai."
      breadcrumbLabel="Đào tạo"
      publicPath={paths.spa2.training}
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
            Khôi phục
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
            Lưu thay đổi
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
            label="Có thay đổi chưa lưu"
            icon={<Iconify icon="solar:pen-bold" width={14} />}
          />
        )}
        {savedAt && !dirty && (
          <Chip
            size="small"
            variant="soft"
            color="success"
            label={`Đã lưu ${savedAt.toLocaleTimeString('vi-VN')}`}
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
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
          label="Banner trang"
        />
        <Tab
          value="mission"
          icon={<Iconify icon="solar:flag-bold-duotone" width={20} />}
          iconPosition="start"
          label="Sứ mệnh học viện"
        />
        <Tab
          value="programs"
          icon={<Iconify icon="solar:notebook-bold-duotone" width={20} />}
          iconPosition="start"
          label="Chương trình đào tạo"
        />
        <Tab
          value="roadmap"
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
          label="Lộ trình học"
        />
        <Tab
          value="instructors"
          icon={<Iconify icon="solar:users-group-rounded-bold-duotone" width={20} />}
          iconPosition="start"
          label="Giảng viên"
        />
        <Tab
          value="graduates"
          icon={<Iconify icon="solar:cup-star-bold-duotone" width={20} />}
          iconPosition="start"
          label="Thành tựu học viên"
        />
        <Tab
          value="preview"
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
          label="Xem trước"
        />
      </Tabs>

      {tab === 'banner' && (
        <SectionCard title="Banner trang" icon="solar:gallery-wide-bold-duotone">
          <Grid container spacing={3}>
            <Grid xs={12} md={5}>
              <Spa2ImageField
                label="Ảnh banner"
                value={banner.image}
                onChange={updateBannerImage}
                height={220}
                helperText="Kéo thả ảnh, dán URL hoặc tải ảnh từ máy. Kéo trên ảnh để chọn điểm lấy nét, chỉnh thanh trượt để phóng to."
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
                <TextField
                  label="Eyebrow (nhãn nhỏ trên tiêu đề)"
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Tiêu đề banner"
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label="Mô tả ngắn"
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Grid>
          </Grid>
        </SectionCard>
      )}

      {tab === 'mission' && (
        <SectionCard title="Sứ mệnh học viện" icon="solar:flag-bold-duotone">
          <Grid container spacing={3}>
            <Grid xs={12} md={5}>
              <Spa2ImageField
                label="Ảnh minh hoạ / video teaser"
                value={missionImage}
                onChange={updateMissionImage}
                height={200}
                helperText={'Hiển thị dạng thẻ có nút play ở mục "Vì sao chọn Nature Spa Academy".'}
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
                Nội dung sứ mệnh
              </Typography>
              <Editor
                value={mission}
                onChange={(html) => updateMission(html)}
                placeholder="Nội dung sứ mệnh"
                sx={{ maxHeight: 260 }}
              />
            </Grid>
          </Grid>
        </SectionCard>
      )}

      {tab === 'programs' && (
        <SectionCard
          title="Chương trình đào tạo"
          icon="solar:notebook-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateProgram}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              Thêm chương trình
            </Button>
          }
        >
          <DragHint />
          {programs.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Chưa có chương trình nào — nhấn &quot;Thêm chương trình&quot; để bắt đầu.
            </Typography>
          )}
          <Spa2SortableGrid items={programs} onReorder={reorderPrograms}>
            <Grid container spacing={2}>
              {programs.map((p) => (
                <Grid key={p.id} xs={12} md={4}>
                  <Spa2SortableItem id={p.id}>
                    {(sortable) => (
                      <Stack
                        spacing={1}
                        sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM, height: '100%' }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Sửa">
                              <IconButton size="small" onClick={() => openEditProgram(p)}>
                                <Iconify icon="solar:pen-bold" width={16} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xoá">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setProgramDeleteId(p.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                        <Chip
                          size="small"
                          label={p.level}
                          color={LEVEL_COLOR[p.level] ?? 'default'}
                          variant="soft"
                          sx={{ alignSelf: 'flex-start' }}
                        />
                        <Typography variant="subtitle2" sx={{ color: SPA2_INK }}>
                          {p.name || '(Chưa đặt tên)'}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Iconify
                            icon="solar:clock-circle-bold"
                            width={14}
                            sx={{ color: SPA2_TEAL }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {p.duration}
                          </Typography>
                        </Stack>
                        <Box
                          sx={{
                            flexGrow: 1,
                            fontSize: 12,
                            color: 'text.secondary',
                            '& p': { m: 0 },
                          }}
                          dangerouslySetInnerHTML={{ __html: p.outcome }}
                        />
                        <Divider />
                        <Typography variant="subtitle2" sx={{ color: SPA2_TEAL }}>
                          {formatVND(p.price)}
                        </Typography>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {tab === 'roadmap' && (
        <SectionCard
          title="Lộ trình học"
          icon="solar:routing-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateRoadmap}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              Thêm giai đoạn
            </Button>
          }
        >
          <DragHint />
          {roadmap.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Chưa có giai đoạn nào — nhấn &quot;Thêm giai đoạn&quot; để bắt đầu.
            </Typography>
          )}
          <Spa2SortableGrid items={roadmap} onReorder={reorderRoadmap}>
            <Stack spacing={1.5}>
              {roadmap.map((r, idx) => (
                <Spa2SortableItem key={r.id} id={r.id}>
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
                      <Box sx={{ flexGrow: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="subtitle2" sx={{ color: SPA2_INK }}>
                            {r.stage || '(Chưa đặt tên)'}
                          </Typography>
                          <Chip
                            size="small"
                            label={r.duration}
                            sx={{ bgcolor: 'common.white', color: SPA2_TEAL_DARK }}
                          />
                        </Stack>
                        <Box
                          sx={{ fontSize: 12, color: 'text.secondary', '& p': { m: 0 } }}
                          dangerouslySetInnerHTML={{ __html: r.desc }}
                        />
                      </Box>
                      <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Sửa">
                          <IconButton size="small" onClick={() => openEditRoadmap(r)}>
                            <Iconify icon="solar:pen-bold" width={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xoá">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setRoadmapDeleteId(r.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  )}
                </Spa2SortableItem>
              ))}
            </Stack>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {tab === 'instructors' && (
        <SectionCard
          title="Giảng viên"
          icon="solar:users-group-rounded-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateInstructor}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              Thêm giảng viên
            </Button>
          }
        >
          <DragHint />
          {instructors.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Chưa có giảng viên nào — nhấn &quot;Thêm giảng viên&quot; để bắt đầu.
            </Typography>
          )}
          <Spa2SortableGrid items={instructors} onReorder={reorderInstructors}>
            <Grid container spacing={2}>
              {instructors.map((ins) => (
                <Grid key={ins.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={ins.id}>
                    {(sortable) => (
                      <Stack
                        spacing={1}
                        alignItems="center"
                        sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: SPA2_CREAM }}
                      >
                        <Spa2DragHandle sortable={sortable} sx={{ alignSelf: 'flex-end', mb: -1 }} />
                        <InstructorAvatar size={64} border instructor={ins} />
                        <Typography variant="subtitle2" sx={{ color: SPA2_INK }}>
                          {ins.name || '(Chưa đặt tên)'}
                        </Typography>
                        <Box
                          sx={{ fontSize: 12, color: 'text.secondary', '& p': { m: 0 } }}
                          dangerouslySetInnerHTML={{ __html: ins.experience }}
                        />
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
                          {ins.certs.map((c) => (
                            <Chip key={c} size="small" label={c} sx={{ bgcolor: SPA2_CREAM_DARK }} />
                          ))}
                        </Stack>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Sửa">
                            <IconButton size="small" onClick={() => openEditInstructor(ins)}>
                              <Iconify icon="solar:pen-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xoá">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setInstructorDeleteId(ins.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {tab === 'graduates' && (
        <SectionCard
          title="Thành tựu học viên"
          icon="solar:cup-star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateGraduate}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              Thêm câu chuyện
            </Button>
          }
        >
          <DragHint />
          {graduates.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Chưa có câu chuyện nào — nhấn &quot;Thêm câu chuyện&quot; để bắt đầu.
            </Typography>
          )}
          <Spa2SortableGrid items={graduates} onReorder={reorderGraduates}>
            <Grid container spacing={2}>
              {graduates.map((g) => (
                <Grid key={g.id} xs={12} sm={6}>
                  <Spa2SortableItem id={g.id}>
                    {(sortable) => (
                      <Stack spacing={1} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Sửa">
                              <IconButton size="small" onClick={() => openEditGraduate(g)}>
                                <Iconify icon="solar:pen-bold" width={16} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xoá">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setGraduateDeleteId(g.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                        <Box
                          sx={{
                            height: 120,
                            borderRadius: 1.5,
                            bgcolor: SPA2_CREAM_DARK,
                            ...spa2ImageBackgroundStyle({
                              url: g.image,
                              focalX: g.imageFocalX ?? 50,
                              focalY: g.imageFocalY ?? 50,
                              zoom: g.imageZoom ?? 100,
                            }),
                          }}
                        />
                        <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                          {g.name || '(Chưa đặt tên)'}
                        </Typography>
                        <Box
                          sx={{
                            color: SPA2_INK,
                            fontStyle: 'italic',
                            fontSize: 14,
                            '& p': { m: 0 },
                          }}
                          dangerouslySetInnerHTML={{ __html: g.review }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          — {g.student}
                        </Typography>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {tab === 'preview' && (
        <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, overflow: 'hidden' }}>
          {/* Hero */}
          <Box sx={{ position: 'relative', overflow: 'hidden', px: 3, py: 5 }}>
            <Box
              sx={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 260,
                height: 260,
                borderRadius: '50%',
                bgcolor: SPA2_TEAL_LIGHT,
                opacity: 0.12,
              }}
            />
            <Grid container spacing={3} alignItems="center" sx={{ position: 'relative' }}>
              <Grid xs={12} md={7}>
                <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 2 }}>
                  {banner.eyebrow}
                </Typography>
                <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 700, mb: 1 }}>
                  {banner.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {banner.subtitle}
                </Typography>
              </Grid>
              <Grid xs={12} md={5}>
                <Box
                  sx={{
                    position: 'relative',
                    height: 170,
                    borderRadius: '50% 50% 30% 30% / 30% 30% 20% 20%',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(46,139,122,0.2)',
                    bgcolor: SPA2_CREAM_DARK,
                    ...spa2ImageBackgroundStyle(banner.image),
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Mission */}
            <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
              <Grid xs={12} md={7}>
                <Typography variant="subtitle1" sx={{ color: SPA2_INK, fontWeight: 700, mb: 1 }}>
                  Vì sao chọn Nature Spa Academy
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {mission}
                </Typography>
              </Grid>
              <Grid xs={12} md={5}>
                <Box
                  sx={{
                    position: 'relative',
                    height: 140,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: SPA2_CREAM_DARK,
                    ...spa2ImageBackgroundStyle(missionImage),
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
            </Grid>

            {/* Programs */}
            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              Chương trình đào tạo
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {programs.map((p) => (
                <Grid key={p.id} xs={12} sm={4}>
                  <Card sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                    <Chip
                      size="small"
                      label={p.level}
                      color={LEVEL_COLOR[p.level] ?? 'default'}
                      variant="soft"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="subtitle2">{p.name}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      {p.duration}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: SPA2_TEAL }}>
                      {formatVND(p.price)}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Roadmap */}
            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              Lộ trình học
            </Typography>
            <Stack spacing={0} sx={{ mb: 4 }}>
              {roadmap.map((r, idx) => (
                <Stack key={r.id} direction="row" spacing={2}>
                  <Stack alignItems="center" sx={{ minWidth: 30 }}>
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        bgcolor: SPA2_TEAL,
                        color: 'common.white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </Box>
                    {idx < roadmap.length - 1 && (
                      <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }} />
                    )}
                  </Stack>
                  <Box sx={{ pb: 2.5 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 700, color: SPA2_INK }}>
                        {r.stage}
                      </Typography>
                      <Chip
                        size="small"
                        label={r.duration}
                        sx={{ bgcolor: 'common.white', color: SPA2_TEAL_DARK }}
                      />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {r.desc}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>

            {/* Instructors */}
            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              Giảng viên
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {instructors.map((ins) => (
                <Grid key={ins.id} xs={6} sm={4}>
                  <Stack spacing={0.5} alignItems="center" sx={{ textAlign: 'center' }}>
                    <InstructorAvatar size={64} border instructor={ins} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      {ins.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ins.experience}
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
                      {ins.certs.map((c) => (
                        <Chip key={c} size="small" label={c} sx={{ bgcolor: SPA2_CREAM_DARK }} />
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            {/* Graduates */}
            <Typography variant="subtitle1" sx={{ mb: 1.5, color: SPA2_INK, fontWeight: 700 }}>
              Học viên nói gì
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {graduates.map((g) => (
                <Grid key={g.id} xs={12} sm={6}>
                  <Card sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
                    <Box
                      sx={{
                        height: 130,
                        bgcolor: SPA2_CREAM_DARK,
                        ...spa2ImageBackgroundStyle({
                          url: g.image,
                          focalX: g.imageFocalX ?? 50,
                          focalY: g.imageFocalY ?? 50,
                          zoom: g.imageZoom ?? 100,
                        }),
                      }}
                    />
                    <Box sx={{ p: 1.5 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, display: 'block' }}
                      >
                        {g.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        &ldquo;{g.review}&rdquo;
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        — {g.student}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* CTA */}
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                color: 'common.white',
                background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
              }}
            >
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Sẵn sàng cho hành trình xanh?
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Đặt lịch ngay hôm nay để bắt đầu khoá học cùng Nature Spa Academy.
              </Typography>
            </Card>
          </Box>
        </Box>
      )}

      {/* Program dialog */}
      <Dialog open={programDialog} onClose={() => setProgramDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {programEditId ? 'Sửa chương trình' : 'Thêm chương trình'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Tên chương trình"
                  value={programForm.name}
                  onChange={(e) => setProgramForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Thời lượng"
                    value={programForm.duration}
                    onChange={(e) => setProgramForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    select
                    label="Cấp độ"
                    value={programForm.level}
                    onChange={(e) => setProgramForm((p) => ({ ...p, level: e.target.value }))}
                    fullWidth
                  >
                    {LEVELS.map((l) => (
                      <MenuItem key={l} value={l}>
                        {l}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <TextField
                  label="Học phí (VNĐ)"
                  type="number"
                  value={programForm.price}
                  onChange={(e) => setProgramForm((p) => ({ ...p, price: Number(e.target.value) }))}
                  fullWidth
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
                  >
                    Kết quả đạt được
                  </Typography>
                  <Editor
                    value={programForm.outcome}
                    onChange={(html) => setProgramForm((p) => ({ ...p, outcome: html }))}
                    placeholder="Kết quả đạt được"
                    sx={{ maxHeight: 180 }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                Xem trước
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ProgramPreviewCard form={programForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProgramDialog(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={submitProgram}
            disabled={!programForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {programEditId ? 'Lưu' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Roadmap dialog */}
      <Dialog open={roadmapDialog} onClose={() => setRoadmapDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {roadmapEditId ? 'Sửa giai đoạn' : 'Thêm giai đoạn'}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tên giai đoạn"
              value={roadmapForm.stage}
              onChange={(e) => setRoadmapForm((p) => ({ ...p, stage: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Thời lượng"
              value={roadmapForm.duration}
              onChange={(e) => setRoadmapForm((p) => ({ ...p, duration: e.target.value }))}
              fullWidth
            />
            <Box>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
              >
                Mô tả
              </Typography>
              <Editor
                value={roadmapForm.desc}
                onChange={(html) => setRoadmapForm((p) => ({ ...p, desc: html }))}
                placeholder="Mô tả"
                sx={{ maxHeight: 160 }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoadmapDialog(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={submitRoadmap}
            disabled={!roadmapForm.stage}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {roadmapEditId ? 'Lưu' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Instructor dialog */}
      <Dialog
        open={instructorDialog}
        onClose={() => setInstructorDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {instructorEditId ? 'Sửa giảng viên' : 'Thêm giảng viên'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label="Ảnh đại diện"
                  value={imageFieldValue(instructorForm)}
                  onChange={(img) => setInstructorForm((p) => applyImageField(p, img))}
                  height={200}
                  helperText="Kéo thả ảnh, dán URL, hoặc tải ảnh từ máy — sau đó kéo trên ảnh để chọn điểm lấy nét khuôn mặt và chỉnh thanh trượt để phóng to."
                />
                <TextField
                  label="Họ tên"
                  value={instructorForm.name}
                  onChange={(e) => setInstructorForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
                  >
                    Kinh nghiệm
                  </Typography>
                  <Editor
                    value={instructorForm.experience}
                    onChange={(html) => setInstructorForm((p) => ({ ...p, experience: html }))}
                    placeholder="Kinh nghiệm"
                    sx={{ maxHeight: 160 }}
                  />
                </Box>
                <TextField
                  label="Chứng chỉ"
                  value={instructorForm.certsInput}
                  onChange={(e) => setInstructorForm((p) => ({ ...p, certsInput: e.target.value }))}
                  fullWidth
                  helperText="Cách nhau bởi dấu phẩy, ví dụ: CIDESCO, CIBTAC"
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                Xem trước
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <InstructorPreviewCard form={instructorForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInstructorDialog(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={submitInstructor}
            disabled={!instructorForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {instructorEditId ? 'Lưu' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Graduate dialog */}
      <Dialog open={graduateDialog} onClose={() => setGraduateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {graduateEditId ? 'Sửa câu chuyện' : 'Thêm câu chuyện'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Tên lớp học"
                  value={graduateForm.name}
                  onChange={(e) => setGraduateForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Spa2ImageField
                  label="Ảnh minh hoạ"
                  value={imageFieldValue(graduateForm)}
                  onChange={(img) => setGraduateForm((p) => applyImageField(p, img))}
                  height={180}
                  helperText="Kéo thả ảnh, dán URL, hoặc tải ảnh từ máy."
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
                  >
                    Cảm nhận
                  </Typography>
                  <Editor
                    value={graduateForm.review}
                    onChange={(html) => setGraduateForm((p) => ({ ...p, review: html }))}
                    placeholder="Cảm nhận"
                    sx={{ maxHeight: 160 }}
                  />
                </Box>
                <TextField
                  label="Tên học viên"
                  value={graduateForm.student}
                  onChange={(e) => setGraduateForm((p) => ({ ...p, student: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                Xem trước
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <GraduatePreviewCard form={graduateForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGraduateDialog(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={submitGraduate}
            disabled={!graduateForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {graduateEditId ? 'Lưu' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!programDeleteId}
        onClose={() => setProgramDeleteId(null)}
        title="Xoá chương trình"
        content="Bạn có chắc muốn xoá chương trình đào tạo này?"
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProgram}>
            Xoá
          </Button>
        }
      />

      <ConfirmDialog
        open={!!roadmapDeleteId}
        onClose={() => setRoadmapDeleteId(null)}
        title="Xoá giai đoạn"
        content="Bạn có chắc muốn xoá giai đoạn này khỏi lộ trình học?"
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteRoadmap}>
            Xoá
          </Button>
        }
      />

      <ConfirmDialog
        open={!!instructorDeleteId}
        onClose={() => setInstructorDeleteId(null)}
        title="Xoá giảng viên"
        content="Bạn có chắc muốn xoá giảng viên này?"
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteInstructor}>
            Xoá
          </Button>
        }
      />

      <ConfirmDialog
        open={!!graduateDeleteId}
        onClose={() => setGraduateDeleteId(null)}
        title="Xoá câu chuyện"
        content="Bạn có chắc muốn xoá câu chuyện thành tựu này?"
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteGraduate}>
            Xoá
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
