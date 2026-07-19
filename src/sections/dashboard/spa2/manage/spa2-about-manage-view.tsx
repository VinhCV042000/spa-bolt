import type { ReactNode } from 'react';
import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2Team,
  spa2AboutStory,
  spa2AboutBanner,
  spa2VisionMission,
  spa2Certifications,
  spa2AboutStoryImage,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  spa2ImageBackgroundStyle,
  spa2CreateAdjustableImage,
} from 'src/sections/spa2/spa2-image-utils';
import {
  Spa2Cta,
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

type VisionItem = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  image?: Spa2AdjustableImage;
};

type TeamItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  imageFocalX?: number;
  imageFocalY?: number;
  imageZoom?: number;
  bio: string;
};

type CertItem = {
  id: string;
  icon: string;
  name: string;
  org: string;
  year: string;
};

const EMPTY_TEAM_MEMBER: TeamItem = { id: '', name: '', role: '', image: '', bio: '' };

const EMPTY_CERT: CertItem = {
  id: '',
  icon: 'solar:medal-ribbon-star-bold-duotone',
  name: '',
  org: '',
  year: '',
};

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const teamImageValue = (form: TeamItem): Spa2AdjustableImage => ({
  url: form.image,
  focalX: form.imageFocalX ?? 50,
  focalY: form.imageFocalY ?? 50,
  zoom: form.imageZoom ?? 100,
});

const applyTeamImage = (form: TeamItem, img: Spa2AdjustableImage): TeamItem => ({
  ...form,
  image: img.url,
  imageFocalX: img.focalX,
  imageFocalY: img.focalY,
  imageZoom: img.zoom,
});

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

function VisionPreviewCard({ form }: { form: VisionItem }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center', py: 5 }}>
      {form.image?.url && (
        <Box
          sx={{
            height: 160,
            borderRadius: 3,
            mb: 3,
            ...spa2ImageBackgroundStyle(form.image),
          }}
        />
      )}
      <Box
        sx={{
          width: 72,
          height: 72,
          mx: 'auto',
          mb: 2.5,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Iconify icon={form.icon} width={36} sx={{ color: 'common.white' }} />
      </Box>
      <Typography variant="h5" sx={{ color: SPA2_INK, mb: 1.5 }}>
        {form.title || '(Chưa đặt tiêu đề)'}
      </Typography>
      <Box
        sx={{ color: 'text.secondary', maxWidth: 420, mx: 'auto', '& p': { m: 0 } }}
        dangerouslySetInnerHTML={{ __html: form.desc }}
      />
    </Spa2SoftCard>
  );
}

function TeamPreviewCard({ form }: { form: TeamItem }) {
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
      <Typography sx={{ color: SPA2_TEAL_DARK, fontSize: 14, fontWeight: 600, mb: 1.5 }}>
        {form.role}
      </Typography>
      <Box
        sx={{ color: 'text.secondary', fontSize: 14, '& p': { m: 0 } }}
        dangerouslySetInnerHTML={{ __html: form.bio }}
      />
    </Spa2SoftCard>
  );
}

function CertPreviewCard({ form }: { form: CertItem }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Iconify icon={form.icon} width={48} sx={{ color: SPA2_TEAL, mb: 2 }} />
      <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 0.5 }}>
        {form.name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{form.org}</Typography>
      <Chip
        label={form.year}
        size="small"
        sx={{ mt: 1.5, bgcolor: SPA2_CREAM_DARK, color: SPA2_TEAL_DARK }}
      />
    </Spa2SoftCard>
  );
}

function StoryPreview({
  story,
  storyImage,
}: {
  story: string[];
  storyImage: Spa2AdjustableImage;
}) {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: '30% 30% 50% 50% / 20% 20% 30% 30%',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(46,139,122,0.2)',
                ...spa2ImageBackgroundStyle(storyImage),
              }}
            />
          </Grid>
          <Grid xs={12} md={7}>
            <Spa2SectionTitle
              eyebrow="Câu chuyện"
              title="Thương hiệu của chúng tôi"
              align="left"
            />
            <Stack spacing={2.5}>
              {story.map((p, idx) => (
                <Typography key={idx} sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                  {p}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type TabKey = 'banner' | 'story' | 'vision' | 'team' | 'certs' | 'preview';

const TAB_LABELS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'banner', label: 'Banner trang', icon: 'solar:gallery-wide-bold-duotone' },
  { key: 'story', label: 'Câu chuyện thương hiệu', icon: 'solar:info-circle-bold-duotone' },
  { key: 'vision', label: 'Tầm nhìn & Sứ mệnh', icon: 'solar:eye-bold-duotone' },
  { key: 'team', label: 'Đội ngũ chuyên gia', icon: 'solar:users-group-rounded-bold-duotone' },
  { key: 'certs', label: 'Chứng nhận & giải thưởng', icon: 'solar:medal-ribbon-star-bold-duotone' },
  { key: 'preview', label: 'Xem trước', icon: 'solar:eye-bold-duotone' },
];

// ----------------------------------------------------------------------

export function Spa2AboutManageView() {
  const theme = useTheme();
  const [banner, setBanner] = useState(() => ({
    ...spa2AboutBanner,
    image: { ...spa2AboutBanner.image },
  }));
  const [storyImage, setStoryImage] = useState<Spa2AdjustableImage>(() => ({
    ...spa2AboutStoryImage,
  }));
  const [story, setStory] = useState<string[]>(() => [...spa2AboutStory]);
  const [visionMission, setVisionMission] = useState<VisionItem[]>(() =>
    spa2VisionMission.map((v) => withId({ ...v, image: v.image ? { ...v.image } : undefined }))
  );
  const [team, setTeam] = useState<TeamItem[]>(() => spa2Team.map((t) => withId({ ...t })));
  const [certifications, setCertifications] = useState<CertItem[]>(() =>
    spa2Certifications.map((c) => withId({ ...c }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<TabKey>('banner');
  const markDirty = () => setDirty(true);

  // ---- Team dialog state ----
  const [teamDialog, setTeamDialog] = useState(false);
  const [teamEditIndex, setTeamEditIndex] = useState<number | null>(null);
  const [teamForm, setTeamForm] = useState<TeamItem>(EMPTY_TEAM_MEMBER);
  const [teamDeleteIndex, setTeamDeleteIndex] = useState<number | null>(null);

  // ---- Certification dialog state ----
  const [certDialog, setCertDialog] = useState(false);
  const [certEditIndex, setCertEditIndex] = useState<number | null>(null);
  const [certForm, setCertForm] = useState<CertItem>(EMPTY_CERT);
  const [certDeleteIndex, setCertDeleteIndex] = useState<number | null>(null);

  // ---- Banner ----
  const updateBanner = (key: keyof typeof banner, v: string) => {
    setBanner((prev) => ({ ...prev, [key]: v }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Story ----
  const updateStory = (idx: number, value: string) => {
    setStory((prev) => prev.map((p, i) => (i === idx ? value : p)));
    markDirty();
  };
  const addStory = () => {
    setStory((prev) => [...prev, '']);
    markDirty();
  };
  const removeStory = (idx: number) => {
    setStory((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };
  const updateStoryImage = (img: Spa2AdjustableImage) => {
    setStoryImage(img);
    markDirty();
  };

  // ---- Vision / Mission ----
  const updateVisionMission = (id: string, key: 'icon' | 'title' | 'desc', value: string) => {
    setVisionMission((prev) => prev.map((v) => (v.id === id ? { ...v, [key]: value } : v)));
    markDirty();
  };
  const updateVisionImage = (id: string, img: Spa2AdjustableImage) => {
    setVisionMission((prev) => prev.map((v) => (v.id === id ? { ...v, image: img } : v)));
    markDirty();
  };
  const toggleVisionImage = (id: string, enabled: boolean) => {
    setVisionMission((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, image: enabled ? spa2CreateAdjustableImage('') : undefined } : v
      )
    );
    markDirty();
  };
  const addVisionMission = () => {
    setVisionMission((prev) => [
      ...prev,
      withId<Omit<VisionItem, 'id'>>({ icon: 'solar:star-bold-duotone', title: '', desc: '' }),
    ]);
    markDirty();
  };
  const removeVisionMission = (id: string) => {
    setVisionMission((prev) => prev.filter((v) => v.id !== id));
    markDirty();
  };
  const reorderVisionMission = (next: VisionItem[]) => {
    setVisionMission(next);
    markDirty();
  };

  // ---- Team CRUD ----
  const openCreateTeam = () => {
    setTeamForm(EMPTY_TEAM_MEMBER);
    setTeamEditIndex(null);
    setTeamDialog(true);
  };
  const openEditTeam = (idx: number) => {
    setTeamForm(team[idx]);
    setTeamEditIndex(idx);
    setTeamDialog(true);
  };
  const submitTeam = () => {
    if (teamEditIndex !== null) {
      setTeam((prev) => prev.map((t, i) => (i === teamEditIndex ? teamForm : t)));
    } else {
      setTeam((prev) => [...prev, withId<Omit<TeamItem, 'id'>>({ ...teamForm })]);
    }
    setTeamDialog(false);
    markDirty();
  };
  const confirmDeleteTeam = () => {
    setTeam((prev) => prev.filter((_, i) => i !== teamDeleteIndex));
    setTeamDeleteIndex(null);
    markDirty();
  };
  const reorderTeam = (next: TeamItem[]) => {
    setTeam(next);
    markDirty();
  };

  // ---- Certification CRUD ----
  const openCreateCert = () => {
    setCertForm(EMPTY_CERT);
    setCertEditIndex(null);
    setCertDialog(true);
  };
  const openEditCert = (idx: number) => {
    setCertForm(certifications[idx]);
    setCertEditIndex(idx);
    setCertDialog(true);
  };
  const submitCert = () => {
    if (certEditIndex !== null) {
      setCertifications((prev) => prev.map((c, i) => (i === certEditIndex ? certForm : c)));
    } else {
      setCertifications((prev) => [...prev, withId<Omit<CertItem, 'id'>>({ ...certForm })]);
    }
    setCertDialog(false);
    markDirty();
  };
  const confirmDeleteCert = () => {
    setCertifications((prev) => prev.filter((_, i) => i !== certDeleteIndex));
    setCertDeleteIndex(null);
    markDirty();
  };
  const reorderCertifications = (next: CertItem[]) => {
    setCertifications(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2AboutBanner, image: { ...spa2AboutBanner.image } });
    setStoryImage({ ...spa2AboutStoryImage });
    setStory([...spa2AboutStory]);
    setVisionMission(
      spa2VisionMission.map((v) => withId({ ...v, image: v.image ? { ...v.image } : undefined }))
    );
    setTeam(spa2Team.map((t) => withId({ ...t })));
    setCertifications(spa2Certifications.map((c) => withId({ ...c })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title="Quản lý trang Giới thiệu"
      description="Banner, câu chuyện thương hiệu, tầm nhìn - sứ mệnh, đội ngũ và chứng nhận hiển thị trên trang Giới thiệu công khai."
      breadcrumbLabel="Giới thiệu"
      publicPath={paths.spa2.about}
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
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
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
      </Stack>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v: TabKey) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 64,
          zIndex: 1,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        {TAB_LABELS.map((t) => (
          <Tab
            key={t.key}
            value={t.key}
            icon={<Iconify icon={t.icon} width={20} />}
            iconPosition="start"
            label={t.label}
          />
        ))}
      </Tabs>

      {/* Banner - left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title="Banner trang" icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label="Ảnh banner"
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={240}
                  helperText="Ảnh hiển thị bên phải banner đầu trang Giới thiệu."
                />
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
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title="Xem trước" icon="solar:eye-bold-duotone">
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

      {/* Câu chuyện thương hiệu - left: edit, right: live preview (same block as public page) */}
      {tab === 'story' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title="Câu chuyện thương hiệu"
              icon="solar:info-circle-bold-duotone"
              action={
                <Button
                  size="small"
                  onClick={addStory}
                  startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                >
                  Thêm đoạn
                </Button>
              }
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label="Ảnh minh hoạ"
                  value={storyImage}
                  onChange={updateStoryImage}
                  height={240}
                />
                {story.map((paragraph, idx) => (
                  <Stack key={idx} direction="row" spacing={1} alignItems="flex-start">
                    <TextField
                      value={paragraph}
                      onChange={(e) => updateStory(idx, e.target.value)}
                      fullWidth
                      multiline
                      minRows={2}
                      size="small"
                      label={`Đoạn ${idx + 1}`}
                    />
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeStory(idx)}
                      disabled={story.length <= 1}
                      sx={{ mt: 0.5 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title="Xem trước" icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <StoryPreview story={story} storyImage={storyImage} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Tầm nhìn & Sứ mệnh */}
      {tab === 'vision' && (
        <SectionCard
          title="Tầm nhìn & Sứ mệnh"
          icon="solar:eye-bold-duotone"
          action={
            <Button
              size="small"
              onClick={addVisionMission}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              Thêm mục
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            Kéo biểu tượng <Iconify icon="nimbus:drag-dots" width={12} /> để sắp xếp lại thứ tự
            hiển thị.
          </Typography>
          <Spa2SortableGrid items={visionMission} onReorder={reorderVisionMission}>
            <Grid container spacing={2}>
              {visionMission.map((v) => (
                <Grid key={v.id} xs={12}>
                  <Spa2SortableItem id={v.id}>
                    {(sortable) => (
                      <Grid
                        container
                        spacing={2}
                        sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}
                      >
                        <Grid xs={12} md={7}>
                          <Stack spacing={1.5}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Spa2DragHandle sortable={sortable} />
                              <TextField
                                value={v.icon}
                                onChange={(e) =>
                                  updateVisionMission(v.id, 'icon', e.target.value)
                                }
                                size="small"
                                label="Icon"
                                fullWidth
                              />
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removeVisionMission(v.id)}
                                disabled={visionMission.length <= 1}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                              </IconButton>
                            </Stack>
                            <TextField
                              value={v.title}
                              onChange={(e) => updateVisionMission(v.id, 'title', e.target.value)}
                              size="small"
                              label="Tiêu đề"
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
                                value={v.desc}
                                onChange={(html) => updateVisionMission(v.id, 'desc', html)}
                                placeholder="Mô tả"
                                sx={{ maxHeight: 160 }}
                              />
                            </Box>
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={!!v.image}
                                  onChange={(e) => toggleVisionImage(v.id, e.target.checked)}
                                />
                              }
                              label={
                                <Typography variant="caption">Thêm ảnh nền cho mục này</Typography>
                              }
                            />
                            {v.image && (
                              <Spa2ImageField
                                value={v.image}
                                onChange={(img) => updateVisionImage(v.id, img)}
                                height={140}
                              />
                            )}
                          </Stack>
                        </Grid>
                        <Grid xs={12} md={5}>
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
                          >
                            Xem trước
                          </Typography>
                          <VisionPreviewCard form={v} />
                        </Grid>
                      </Grid>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Đội ngũ chuyên gia */}
      {tab === 'team' && (
        <SectionCard
          title="Đội ngũ chuyên gia"
          icon="solar:users-group-rounded-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateTeam}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              Thêm thành viên
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            Kéo biểu tượng <Iconify icon="nimbus:drag-dots" width={12} /> để sắp xếp lại thứ tự
            hiển thị.
          </Typography>
          <Spa2SortableGrid items={team} onReorder={reorderTeam}>
            <Grid container spacing={2}>
              {team.map((member, idx) => (
                <Grid key={member.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={member.id}>
                    {(sortable) => (
                      <Stack
                        spacing={1}
                        alignItems="center"
                        sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: SPA2_CREAM }}
                      >
                        <Spa2DragHandle sortable={sortable} sx={{ alignSelf: 'flex-end', mb: -1 }} />
                        <Box
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            border: `2px solid ${SPA2_TEAL_LIGHT}`,
                            bgcolor: SPA2_CREAM_DARK,
                            ...spa2ImageBackgroundStyle({
                              url: member.image,
                              focalX: member.imageFocalX ?? 50,
                              focalY: member.imageFocalY ?? 50,
                              zoom: member.imageZoom ?? 100,
                            }),
                          }}
                        />
                        <Typography variant="subtitle2" sx={{ color: SPA2_INK }}>
                          {member.name || '(Chưa đặt tên)'}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: SPA2_TEAL_DARK, fontWeight: 600 }}
                        >
                          {member.role}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Sửa">
                            <IconButton size="small" onClick={() => openEditTeam(idx)}>
                              <Iconify icon="solar:pen-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xoá">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setTeamDeleteIndex(idx)}
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

      {/* Chứng nhận & giải thưởng */}
      {tab === 'certs' && (
        <SectionCard
          title="Chứng nhận & giải thưởng"
          icon="solar:medal-ribbon-star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateCert}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              Thêm chứng nhận
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            Kéo biểu tượng <Iconify icon="nimbus:drag-dots" width={12} /> để sắp xếp lại thứ tự
            hiển thị.
          </Typography>
          <Spa2SortableGrid items={certifications} onReorder={reorderCertifications}>
            <Grid container spacing={2}>
              {certifications.map((cert, idx) => (
                <Grid key={cert.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={cert.id}>
                    {(sortable) => (
                      <Stack
                        spacing={1}
                        alignItems="center"
                        sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: SPA2_CREAM }}
                      >
                        <Spa2DragHandle sortable={sortable} sx={{ alignSelf: 'flex-end', mb: -1 }} />
                        <Iconify icon={cert.icon} width={36} sx={{ color: SPA2_TEAL }} />
                        <Typography variant="subtitle2" sx={{ color: SPA2_INK }}>
                          {cert.name || '(Chưa đặt tên)'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {cert.org}
                        </Typography>
                        <Chip label={cert.year} size="small" />
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Sửa">
                            <IconButton size="small" onClick={() => openEditCert(idx)}>
                              <Iconify icon="solar:pen-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xoá">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setCertDeleteIndex(idx)}
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

      {/* Team member dialog */}
      <Dialog open={teamDialog} onClose={() => setTeamDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {teamEditIndex !== null ? 'Sửa thành viên' : 'Thêm thành viên'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Họ tên"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label="Vai trò"
                  value={teamForm.role}
                  onChange={(e) => setTeamForm((p) => ({ ...p, role: e.target.value }))}
                  fullWidth
                />
                <Spa2ImageField
                  label="Ảnh đại diện"
                  value={teamImageValue(teamForm)}
                  onChange={(img) => setTeamForm((p) => applyTeamImage(p, img))}
                  height={200}
                  helperText="Kéo thả ảnh, dán URL, hoặc kéo trên ảnh để chọn điểm lấy nét khuôn mặt."
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
                  >
                    Tiểu sử
                  </Typography>
                  <Editor
                    value={teamForm.bio}
                    onChange={(html) => setTeamForm((p) => ({ ...p, bio: html }))}
                    placeholder="Tiểu sử"
                    sx={{ maxHeight: 200 }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                Xem trước
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <TeamPreviewCard form={teamForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTeamDialog(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={submitTeam}
            disabled={!teamForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {teamEditIndex !== null ? 'Lưu' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certification dialog */}
      <Dialog open={certDialog} onClose={() => setCertDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {certEditIndex !== null ? 'Sửa chứng nhận' : 'Thêm chứng nhận'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Icon"
                  value={certForm.icon}
                  onChange={(e) => setCertForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="Tên icon Solar (vd: solar:medal-ribbon-star-bold-duotone)"
                  fullWidth
                />
                <TextField
                  label="Tên chứng nhận"
                  value={certForm.name}
                  onChange={(e) => setCertForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label="Tổ chức cấp"
                  value={certForm.org}
                  onChange={(e) => setCertForm((p) => ({ ...p, org: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label="Năm"
                  value={certForm.year}
                  onChange={(e) => setCertForm((p) => ({ ...p, year: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                Xem trước
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <CertPreviewCard form={certForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertDialog(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={submitCert}
            disabled={!certForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {certEditIndex !== null ? 'Lưu' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={teamDeleteIndex !== null}
        onClose={() => setTeamDeleteIndex(null)}
        title="Xoá thành viên"
        content="Bạn có chắc muốn xoá thành viên này khỏi đội ngũ?"
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTeam}>
            Xoá
          </Button>
        }
      />

      <ConfirmDialog
        open={certDeleteIndex !== null}
        onClose={() => setCertDeleteIndex(null)}
        title="Xoá chứng nhận"
        content="Bạn có chắc muốn xoá chứng nhận này?"
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteCert}>
            Xoá
          </Button>
        }
      />

      {/* Live preview of the whole page with the current unsaved edits — mirrors Spa2AboutPageView exactly */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />

          {/* Story thương hiệu */}
          <StoryPreview story={story} storyImage={storyImage} />

          {/* Vision / Mission */}
          <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Định hướng" title="Tầm nhìn & Sứ mệnh" />
              <Grid container spacing={3}>
                {visionMission.map((v) => (
                  <Grid key={v.id} xs={12} md={6}>
                    <VisionPreviewCard form={v} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Đội ngũ */}
          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container>
              <Spa2SectionTitle
                eyebrow="Con người"
                title="Đội ngũ chuyên gia"
                subtitle="Mỗi liệu trình tại Nature Spa được thực hiện bởi những con người tận tâm và giàu kinh nghiệm."
              />
              <Grid container spacing={3}>
                {team.map((t) => (
                  <Grid key={t.id} xs={12} sm={6} md={3}>
                    <TeamPreviewCard form={t} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Chứng nhận / giải thưởng */}
          <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Vinh danh" title="Chứng nhận & giải thưởng" />
              <Grid container spacing={3}>
                {certifications.map((c) => (
                  <Grid key={c.id} xs={12} sm={6} md={3}>
                    <CertPreviewCard form={c} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Spa2Cta />
        </Box>
      )}
    </Spa2ManageShell>
  );
}
