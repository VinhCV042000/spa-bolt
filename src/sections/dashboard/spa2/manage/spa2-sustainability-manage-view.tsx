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

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2SustainabilityStats,
  spa2SustainabilityBanner,
  type Spa2AdjustableImage,
  type Spa2SustainabilityStat,
  spa2SustainabilityMilestones,
  spa2SustainabilityCommitments,
  type Spa2SustainabilityMilestone,
  type Spa2SustainabilityCommitment,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  Spa2ContentPageHero,
  Spa2SustainabilityPageView,
} from 'src/sections/spa2/view/spa2-content-pages2';
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
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2SustainabilityPageView renders on the public /spa2/sustainability page:
// the page banner, the teal "green stats" strip, the 6 green commitments grid
// and the green-milestones timeline - read from and written back in the same
// shape as src/_mock/_spa2, the single source of truth shared with the public
// view. The "banner" tab reuses Spa2ContentPageHero and the "preview" tab
// reuses Spa2SustainabilityPageView itself, fed with the in-progress edited
// state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STAT_FORM = { value: '', label: '' };
const EMPTY_COMMITMENT_FORM = {
  icon: 'solar:leaf-bold-duotone',
  title: '',
  desc: '',
  value: '',
  label: '',
};
const EMPTY_MILESTONE_FORM = { year: '', title: '', desc: '', pending: false };

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

// Mirrors the teal stats-strip item on the public page.
function StatPreviewItem({ value, label }: { value: string; label: string }) {
  return (
    <Box sx={{ bgcolor: SPA2_TEAL, borderRadius: 3, py: 3, px: 2, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}>
        {value || '0%'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
        {label || 'Nhãn chỉ số'}
      </Typography>
    </Box>
  );
}

// Mirrors the "6 cam kết xanh" SoftCard markup on the public page.
function CommitmentPreviewCard({
  icon,
  title,
  desc,
  value,
  label,
}: {
  icon: string;
  title: string;
  desc: string;
  value: string;
  label: string;
}) {
  return (
    <Spa2SoftCard>
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            bgcolor: SPA2_CREAM,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon={icon || 'solar:leaf-bold-duotone'} width={28} sx={{ color: SPA2_TEAL }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 20 }}>
            {value || '0%'}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{label || 'Nhãn'}</Typography>
        </Box>
      </Stack>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {title || 'Tiêu đề cam kết'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Spa2SoftCard>
  );
}

// Mirrors a single connected node of the "Các cột mốc xanh" timeline exactly
// as rendered on the public page (circle + connecting line + content). Used
// in the milestones tab's "Xem trước" panel, which chains every milestone
// together the same way src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2SustainabilityPageView does.
function MilestoneTimelineNode({
  year,
  title,
  desc,
  pending,
  isLast,
}: {
  year: string;
  title: string;
  desc: string;
  pending?: boolean;
  isLast: boolean;
}) {
  return (
    <Stack direction="row" spacing={2.5}>
      <Stack alignItems="center" sx={{ width: 72, flexShrink: 0 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: pending ? SPA2_CREAM_DARK : SPA2_TEAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: pending ? `2px dashed ${SPA2_TEAL}` : 'none',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 12, color: pending ? SPA2_TEAL : 'white' }}>
            {year || '20XX'}
          </Typography>
        </Box>
        {!isLast && <Box sx={{ width: 2, flex: 1, bgcolor: SPA2_CREAM_DARK, my: 0.5 }} />}
      </Stack>
      <Box sx={{ pb: isLast ? 0 : 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
            {title || 'Tên cột mốc'}
          </Typography>
          {pending && (
            <Chip
              label="Sắp đến"
              size="small"
              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
            />
          )}
        </Stack>
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
          {desc || 'Mô tả cột mốc…'}
        </Typography>
      </Box>
    </Stack>
  );
}

// Mirrors a single node of the "Các cột mốc xanh" timeline on the public page.
function MilestonePreviewCard({
  year,
  title,
  desc,
  pending,
}: {
  year: string;
  title: string;
  desc: string;
  pending?: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing={2.5}
      sx={{ p: 2, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}` }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: pending ? SPA2_CREAM_DARK : SPA2_TEAL,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: pending ? `2px dashed ${SPA2_TEAL}` : 'none',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 12, color: pending ? SPA2_TEAL : 'white' }}>
          {year || '20XX'}
        </Typography>
      </Box>
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
            {title || 'Tên cột mốc'}
          </Typography>
          {pending && (
            <Chip
              label="Sắp đến"
              size="small"
              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 11 }}
            />
          )}
        </Stack>
        <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.7 }}>
          {desc || 'Mô tả cột mốc…'}
        </Typography>
      </Box>
    </Stack>
  );
}

export function Spa2SustainabilityManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2SustainabilityBanner,
    image: { ...spa2SustainabilityBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'stats' | 'commitments' | 'milestones' | 'preview'>(
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

  // ---- Green stats ----
  const [stats, setStats] = useState<Spa2SustainabilityStat[]>(() =>
    spa2SustainabilityStats.map((s) => ({ ...s }))
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
  const openEditStat = (item: Spa2SustainabilityStat) => {
    setStatForm({ value: item.value, label: item.label });
    setStatEditId(item.id);
    setStatDialog(true);
  };
  const submitStat = () => {
    const next = { value: statForm.value, label: statForm.label };
    if (statEditId) {
      setStats((prev) => prev.map((s) => (s.id === statEditId ? { ...s, ...next } : s)));
    } else {
      setStats((prev) => [...prev, withId(next)]);
    }
    setStatDialog(false);
    markDirty();
  };
  const confirmDeleteStat = () => {
    setStats((prev) => prev.filter((s) => s.id !== statDeleteId));
    setStatDeleteId(null);
    markDirty();
  };

  // ---- Commitments ----
  const [commitments, setCommitments] = useState<Spa2SustainabilityCommitment[]>(() =>
    spa2SustainabilityCommitments.map((c) => ({ ...c }))
  );
  const [commitmentForm, setCommitmentForm] = useState(EMPTY_COMMITMENT_FORM);
  const [commitmentDialog, setCommitmentDialog] = useState(false);
  const [commitmentEditId, setCommitmentEditId] = useState<string | null>(null);
  const [commitmentDeleteId, setCommitmentDeleteId] = useState<string | null>(null);

  const openCreateCommitment = () => {
    setCommitmentForm(EMPTY_COMMITMENT_FORM);
    setCommitmentEditId(null);
    setCommitmentDialog(true);
  };
  const openEditCommitment = (item: Spa2SustainabilityCommitment) => {
    setCommitmentForm({
      icon: item.icon,
      title: item.title,
      desc: item.desc,
      value: item.value,
      label: item.label,
    });
    setCommitmentEditId(item.id);
    setCommitmentDialog(true);
  };
  const submitCommitment = () => {
    const next = {
      icon: commitmentForm.icon,
      title: commitmentForm.title,
      desc: commitmentForm.desc,
      value: commitmentForm.value,
      label: commitmentForm.label,
    };
    if (commitmentEditId) {
      setCommitments((prev) =>
        prev.map((c) => (c.id === commitmentEditId ? { ...c, ...next } : c))
      );
    } else {
      setCommitments((prev) => [...prev, withId(next)]);
    }
    setCommitmentDialog(false);
    markDirty();
  };
  const confirmDeleteCommitment = () => {
    setCommitments((prev) => prev.filter((c) => c.id !== commitmentDeleteId));
    setCommitmentDeleteId(null);
    markDirty();
  };

  // ---- Milestones ----
  const [milestones, setMilestones] = useState<Spa2SustainabilityMilestone[]>(() =>
    spa2SustainabilityMilestones.map((m) => ({ ...m }))
  );
  const [milestoneForm, setMilestoneForm] = useState(EMPTY_MILESTONE_FORM);
  const [milestoneDialog, setMilestoneDialog] = useState(false);
  const [milestoneEditId, setMilestoneEditId] = useState<string | null>(null);
  const [milestoneDeleteId, setMilestoneDeleteId] = useState<string | null>(null);

  const openCreateMilestone = () => {
    setMilestoneForm(EMPTY_MILESTONE_FORM);
    setMilestoneEditId(null);
    setMilestoneDialog(true);
  };
  const openEditMilestone = (item: Spa2SustainabilityMilestone) => {
    setMilestoneForm({
      year: item.year,
      title: item.title,
      desc: item.desc,
      pending: !!item.pending,
    });
    setMilestoneEditId(item.id);
    setMilestoneDialog(true);
  };
  const submitMilestone = () => {
    const next = {
      year: milestoneForm.year,
      title: milestoneForm.title,
      desc: milestoneForm.desc,
      pending: milestoneForm.pending,
    };
    if (milestoneEditId) {
      setMilestones((prev) => prev.map((m) => (m.id === milestoneEditId ? { ...m, ...next } : m)));
    } else {
      setMilestones((prev) => [...prev, withId(next)]);
    }
    setMilestoneDialog(false);
    markDirty();
  };
  const confirmDeleteMilestone = () => {
    setMilestones((prev) => prev.filter((m) => m.id !== milestoneDeleteId));
    setMilestoneDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SustainabilityBanner, image: { ...spa2SustainabilityBanner.image } });
    setStats(spa2SustainabilityStats.map((s) => ({ ...s })));
    setCommitments(spa2SustainabilityCommitments.map((c) => ({ ...c })));
    setMilestones(spa2SustainabilityMilestones.map((m) => ({ ...m })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('sustainability.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.sustainability')}
      publicPath={paths.spa2.sustainability}
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
          label={t('sustainability.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stats"
          label={t('sustainability.stats_section')}
          icon={<Iconify icon="solar:chart-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="commitments"
          label={t('sustainability.commitments_section')}
          icon={<Iconify icon="solar:leaf-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="milestones"
          label={t('sustainability.milestones_section')}
          icon={<Iconify icon="solar:map-point-wave-bold-duotone" width={20} />}
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
              title={t('sustainability.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('sustainability.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('sustainability.banner_image_help')}
                />
                <TextField
                  label={t('sustainability.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('sustainability.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('sustainability.banner_subtitle')}
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
                <Spa2ContentPageHero
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

      {/* Green stats */}
      {tab === 'stats' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('sustainability.stats_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateStat}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('sustainability.add_stat_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {stats.map((item) => (
              <Grid key={item.id} xs={6} sm={4} md={2}>
                <Box sx={{ position: 'relative' }}>
                  <StatPreviewItem value={item.value} label={item.label} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 6, right: 6 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditStat(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={12} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setStatDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={12} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Commitments */}
      {tab === 'commitments' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('sustainability.commitments_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateCommitment}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('sustainability.add_commitment_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {commitments.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <CommitmentPreviewCard
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    value={item.value}
                    label={item.label}
                  />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditCommitment(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setCommitmentDeleteId(item.id)}
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

      {/* Milestones */}
      {tab === 'milestones' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('sustainability.milestones_section')}
              icon="solar:map-point-wave-bold-duotone"
              action={
                <Button
                  size="small"
                  onClick={openCreateMilestone}
                  startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                >
                  {t('sustainability.add_milestone_btn')}
                </Button>
              }
            >
              {milestones.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {t('sustainability.no_milestones')}
                </Typography>
              )}
              <Stack spacing={2}>
                {milestones.map((item) => (
                  <Box key={item.id} sx={{ position: 'relative' }}>
                    <MilestonePreviewCard
                      year={item.year}
                      title={item.title}
                      desc={item.desc}
                      pending={item.pending}
                    />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => openEditMilestone(item)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:pen-bold" width={14} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setMilestoneDeleteId(item.id)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Box sx={{ p: 3, bgcolor: SPA2_CREAM }}>
                  {milestones.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      {t('sustainability.no_milestones')}
                    </Typography>
                  ) : (
                    <Stack spacing={0}>
                      {milestones.map((m, idx) => (
                        <MilestoneTimelineNode
                          key={m.id}
                          year={m.year}
                          title={m.title}
                          desc={m.desc}
                          pending={m.pending}
                          isLast={idx === milestones.length - 1}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SustainabilityPageView
            banner={banner}
            stats={stats}
            commitments={commitments}
            milestones={milestones}
          />
        </Box>
      )}

      {/* Stat add/edit dialog */}
      <Dialog open={statDialog} onClose={() => setStatDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {statEditId ? t('common.edit') : t('sustainability.add_stat_btn')}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label={t('sustainability.form_stat_value')}
              fullWidth
              size="small"
              value={statForm.value}
              onChange={(e) => setStatForm((p) => ({ ...p, value: e.target.value }))}
              helperText="100%"
            />
            <TextField
              label={t('sustainability.form_stat_label')}
              fullWidth
              size="small"
              value={statForm.label}
              onChange={(e) => setStatForm((p) => ({ ...p, label: e.target.value }))}
            />
            <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
              <StatPreviewItem value={statForm.value} label={statForm.label} />
            </Box>
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

      {/* Commitment add/edit dialog */}
      <Dialog
        open={commitmentDialog}
        onClose={() => setCommitmentDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {commitmentEditId ? t('common.edit') : t('sustainability.add_commitment_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('sustainability.form_icon')}
                  fullWidth
                  size="small"
                  value={commitmentForm.icon}
                  onChange={(e) => setCommitmentForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:leaf-bold-duotone"
                />
                <TextField
                  label={t('sustainability.form_commitment_title')}
                  fullWidth
                  size="small"
                  value={commitmentForm.title}
                  onChange={(e) => setCommitmentForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('sustainability.form_commitment_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={commitmentForm.desc}
                  onChange={(e) => setCommitmentForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('sustainability.form_commitment_value')}
                    size="small"
                    value={commitmentForm.value}
                    onChange={(e) => setCommitmentForm((p) => ({ ...p, value: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('sustainability.form_commitment_label')}
                    size="small"
                    value={commitmentForm.label}
                    onChange={(e) => setCommitmentForm((p) => ({ ...p, label: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <CommitmentPreviewCard
                  icon={commitmentForm.icon}
                  title={commitmentForm.title}
                  desc={commitmentForm.desc}
                  value={commitmentForm.value}
                  label={commitmentForm.label}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommitmentDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitCommitment}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {commitmentEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!commitmentDeleteId}
        onClose={() => setCommitmentDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteCommitment}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Milestone add/edit dialog */}
      <Dialog
        open={milestoneDialog}
        onClose={() => setMilestoneDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {milestoneEditId ? t('common.edit') : t('sustainability.add_milestone_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('sustainability.form_milestone_year')}
                  fullWidth
                  size="small"
                  value={milestoneForm.year}
                  onChange={(e) => setMilestoneForm((p) => ({ ...p, year: e.target.value }))}
                />
                <TextField
                  label={t('sustainability.form_milestone_title')}
                  fullWidth
                  size="small"
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('sustainability.form_milestone_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={milestoneForm.desc}
                  onChange={(e) => setMilestoneForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={milestoneForm.pending}
                      onChange={(e) =>
                        setMilestoneForm((p) => ({ ...p, pending: e.target.checked }))
                      }
                    />
                  }
                  label={t('sustainability.form_milestone_pending')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <MilestonePreviewCard
                  year={milestoneForm.year}
                  title={milestoneForm.title}
                  desc={milestoneForm.desc}
                  pending={milestoneForm.pending}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMilestoneDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitMilestone}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {milestoneEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!milestoneDeleteId}
        onClose={() => setMilestoneDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteMilestone}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
