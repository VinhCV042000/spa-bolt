import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
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
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2ReferralSteps,
  spa2ReferralBanner,
  spa2ReferralProgram,
  type Spa2ReferralStep,
  spa2ReferralLeaderboard,
  type Spa2ReferralProgram,
  type Spa2AdjustableImage,
  type Spa2ReferralLeaderboardEntry,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  Spa2ContentPageHero,
  Spa2ReferralPageView,
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
// Spa2ReferralPageView renders on the public /spa2/referral page: the page
// banner, the referral-code program card, the "3 bước đơn giản" steps and the
// monthly leaderboard - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The "banner" tab reuses Spa2ContentPageHero and the "preview" tab reuses
// Spa2ReferralPageView itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_STEP_FORM = { icon: 'solar:share-bold-duotone', title: '', desc: '' };
const EMPTY_LEADER_FORM = { name: '', refs: 0, earned: 0, avatar: '', highlight: false };

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

const REFERRAL_SHARE_CHANNELS = [
  { label: 'Zalo', icon: 'solar:chat-round-dots-bold' },
  { label: 'Facebook', icon: 'solar:share-bold' },
  { label: 'Sao chép link', icon: 'solar:link-bold' },
];

// Mirrors the referral-code section on the public page exactly: teal header
// card with the dashed, copyable code box + share-via row, followed by the
// separate 2-stat SoftCard grid below it (see Spa2ReferralPageView in
// src/sections/spa2/view/spa2-content-pages2.tsx).
function ProgramPreviewCard({
  code,
  rewardPerReferral,
  totalReferred,
  totalEarned,
}: Spa2ReferralProgram) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(code || '').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack spacing={2}>
      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          border: `2px solid ${SPA2_TEAL}`,
          boxShadow: '0 20px 48px rgba(46,139,122,0.18)',
        }}
      >
        <Box sx={{ bgcolor: SPA2_TEAL, p: 2.5, color: 'white', textAlign: 'center' }}>
          <Iconify icon="solar:users-group-rounded-bold-duotone" width={36} sx={{ mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Mã giới thiệu của bạn
          </Typography>
          <Typography sx={{ opacity: 0.85, fontSize: 12.5 }}>
            Chia sẻ để nhận {formatVND(rewardPerReferral)} / người
          </Typography>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              bgcolor: SPA2_CREAM,
              border: `1.5px dashed ${SPA2_TEAL}`,
              borderRadius: 3,
              p: 1.5,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                flex: 1,
                fontWeight: 700,
                fontSize: 18,
                color: SPA2_TEAL,
                letterSpacing: 2,
                textAlign: 'center',
              }}
            >
              {code || 'NSP-XXXXX'}
            </Typography>
            <IconButton
              size="small"
              onClick={copy}
              sx={{ bgcolor: SPA2_TEAL, color: 'white', '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              <Iconify icon={copied ? 'solar:check-circle-bold' : 'solar:copy-bold'} width={16} />
            </IconButton>
          </Box>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.25 }}>
            Chia sẻ qua:
          </Typography>
          <Stack direction="row" spacing={1}>
            {REFERRAL_SHARE_CHANNELS.map((s) => (
              <Button
                key={s.label}
                size="small"
                startIcon={<Iconify icon={s.icon} width={14} />}
                sx={{
                  flex: 1,
                  borderRadius: 99,
                  border: `1.5px solid ${SPA2_CREAM_DARK}`,
                  color: SPA2_INK,
                  fontSize: 11,
                  '&:hover': { bgcolor: SPA2_CREAM },
                }}
              >
                {s.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Card>

      <Grid container spacing={1.5}>
        <Grid xs={6}>
          <Spa2SoftCard sx={{ textAlign: 'center', py: 2 }}>
            <Iconify icon="solar:users-group-bold" width={26} sx={{ color: SPA2_TEAL, mb: 0.5 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 16, color: SPA2_TEAL }}>
              {totalReferred}
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              Người đã giới thiệu
            </Typography>
          </Spa2SoftCard>
        </Grid>
        <Grid xs={6}>
          <Spa2SoftCard sx={{ textAlign: 'center', py: 2 }}>
            <Iconify icon="solar:wallet-money-bold" width={26} sx={{ color: SPA2_TEAL, mb: 0.5 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 16, color: SPA2_TEAL }}>
              {formatVND(totalEarned)}
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
              Tổng thưởng nhận được
            </Typography>
          </Spa2SoftCard>
        </Grid>
      </Grid>
    </Stack>
  );
}

// Mirrors a single "3 bước đơn giản" SoftCard on the public page.
function StepPreviewCard({
  icon,
  title,
  desc,
  index,
}: {
  icon: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1.5,
        }}
      >
        <Iconify icon={icon || 'solar:share-bold-duotone'} width={24} sx={{ color: 'white' }} />
      </Box>
      <Chip
        label={`Bước ${index + 1}`}
        size="small"
        sx={{ mb: 1.25, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {title || 'Tiêu đề bước'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Spa2SoftCard>
  );
}

// Mirrors a single leaderboard row on the public page.
function LeaderboardPreviewRow({
  name,
  refs,
  earned,
  avatar,
  highlight,
}: {
  name: string;
  refs: number;
  earned: number;
  avatar: string;
  highlight?: boolean;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 2,
        bgcolor: highlight ? SPA2_CREAM : 'common.white',
        border: `1px solid ${SPA2_CREAM_DARK}`,
      }}
    >
      <Avatar
        src={avatar}
        sx={{ width: 34, height: 34, bgcolor: highlight ? SPA2_TEAL : undefined }}
      >
        {highlight ? 'B' : undefined}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{ fontWeight: 600, color: highlight ? SPA2_TEAL : SPA2_INK, fontSize: 13.5 }}
        >
          {name || 'Tên người dùng'}
          {highlight ? ' (Bạn)' : ''}
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
          {refs} người giới thiệu
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 13 }}>
        {formatVND(earned)}
      </Typography>
    </Stack>
  );
}

export function Spa2ReferralManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2ReferralBanner,
    image: { ...spa2ReferralBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'program' | 'steps' | 'leaderboard' | 'preview'>(
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

  // ---- Program ----
  const [program, setProgram] = useState<Spa2ReferralProgram>(() => ({ ...spa2ReferralProgram }));
  const updateProgram = (key: keyof Spa2ReferralProgram, value: string | number) => {
    setProgram((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Steps ----
  const [steps, setSteps] = useState<Spa2ReferralStep[]>(() =>
    spa2ReferralSteps.map((s) => ({ ...s }))
  );
  const [stepForm, setStepForm] = useState(EMPTY_STEP_FORM);
  const [stepDialog, setStepDialog] = useState(false);
  const [stepEditId, setStepEditId] = useState<string | null>(null);
  const [stepDeleteId, setStepDeleteId] = useState<string | null>(null);

  const openCreateStep = () => {
    setStepForm(EMPTY_STEP_FORM);
    setStepEditId(null);
    setStepDialog(true);
  };
  const openEditStep = (item: Spa2ReferralStep) => {
    setStepForm({ icon: item.icon, title: item.title, desc: item.desc });
    setStepEditId(item.id);
    setStepDialog(true);
  };
  const submitStep = () => {
    const next = { icon: stepForm.icon, title: stepForm.title, desc: stepForm.desc };
    if (stepEditId) {
      setSteps((prev) => prev.map((s) => (s.id === stepEditId ? { ...s, ...next } : s)));
    } else {
      setSteps((prev) => [...prev, withId(next)]);
    }
    setStepDialog(false);
    markDirty();
  };
  const confirmDeleteStep = () => {
    setSteps((prev) => prev.filter((s) => s.id !== stepDeleteId));
    setStepDeleteId(null);
    markDirty();
  };

  // ---- Leaderboard ----
  const [leaderboard, setLeaderboard] = useState<Spa2ReferralLeaderboardEntry[]>(() =>
    spa2ReferralLeaderboard.map((l) => ({ ...l }))
  );
  const [leaderForm, setLeaderForm] = useState(EMPTY_LEADER_FORM);
  const [leaderDialog, setLeaderDialog] = useState(false);
  const [leaderEditId, setLeaderEditId] = useState<string | null>(null);
  const [leaderDeleteId, setLeaderDeleteId] = useState<string | null>(null);

  const openCreateLeader = () => {
    setLeaderForm(EMPTY_LEADER_FORM);
    setLeaderEditId(null);
    setLeaderDialog(true);
  };
  const openEditLeader = (item: Spa2ReferralLeaderboardEntry) => {
    setLeaderForm({
      name: item.name,
      refs: item.refs,
      earned: item.earned,
      avatar: item.avatar,
      highlight: !!item.highlight,
    });
    setLeaderEditId(item.id);
    setLeaderDialog(true);
  };
  const submitLeader = () => {
    const next = { ...leaderForm };
    if (leaderEditId) {
      setLeaderboard((prev) => prev.map((l) => (l.id === leaderEditId ? { ...l, ...next } : l)));
    } else {
      setLeaderboard((prev) => [...prev, withId(next)]);
    }
    setLeaderDialog(false);
    markDirty();
  };
  const confirmDeleteLeader = () => {
    setLeaderboard((prev) => prev.filter((l) => l.id !== leaderDeleteId));
    setLeaderDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ReferralBanner, image: { ...spa2ReferralBanner.image } });
    setProgram({ ...spa2ReferralProgram });
    setSteps(spa2ReferralSteps.map((s) => ({ ...s })));
    setLeaderboard(spa2ReferralLeaderboard.map((l) => ({ ...l })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('referral.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.referral')}
      publicPath={paths.spa2.referral}
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
          label={t('referral.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="program"
          label={t('referral.program_section')}
          icon={<Iconify icon="solar:ticket-sale-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="steps"
          label={t('referral.steps_section')}
          icon={<Iconify icon="solar:list-check-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="leaderboard"
          label={t('referral.leaderboard_section')}
          icon={<Iconify icon="solar:ranking-bold-duotone" width={20} />}
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
              title={t('referral.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('referral.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('referral.banner_image_help')}
                />
                <TextField
                  label={t('referral.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('referral.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('referral.banner_subtitle')}
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

      {/* Program */}
      {tab === 'program' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('referral.program_section')}
              icon="solar:ticket-sale-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('referral.form_program_code')}
                  fullWidth
                  size="small"
                  value={program.code}
                  onChange={(e) => updateProgram('code', e.target.value)}
                  helperText="NSP-A7K92"
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('referral.form_program_reward')}
                    type="number"
                    size="small"
                    value={program.rewardPerReferral}
                    onChange={(e) => updateProgram('rewardPerReferral', Number(e.target.value))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('referral.form_program_discount')}
                    type="number"
                    size="small"
                    value={program.refereeDiscountPercent}
                    onChange={(e) =>
                      updateProgram('refereeDiscountPercent', Number(e.target.value))
                    }
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('referral.form_program_total_referred')}
                    type="number"
                    size="small"
                    value={program.totalReferred}
                    onChange={(e) => updateProgram('totalReferred', Number(e.target.value))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('referral.form_program_total_earned')}
                    type="number"
                    size="small"
                    value={program.totalEarned}
                    onChange={(e) => updateProgram('totalEarned', Number(e.target.value))}
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                <ProgramPreviewCard {...program} />
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Steps */}
      {tab === 'steps' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('referral.steps_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateStep}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('referral.add_step_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {steps.map((item, idx) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <StepPreviewCard
                    icon={item.icon}
                    title={item.title}
                    desc={item.desc}
                    index={idx}
                  />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
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
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Leaderboard */}
      {tab === 'leaderboard' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('referral.leaderboard_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateLeader}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('referral.add_leader_btn')}
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {leaderboard.map((item) => (
              <Stack key={item.id} direction="row" spacing={1} alignItems="center">
                <Box sx={{ flex: 1 }}>
                  <LeaderboardPreviewRow
                    name={item.name}
                    refs={item.refs}
                    earned={item.earned}
                    avatar={item.avatar}
                    highlight={item.highlight}
                  />
                </Box>
                <IconButton size="small" onClick={() => openEditLeader(item)}>
                  <Iconify icon="solar:pen-bold" width={16} />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => setLeaderDeleteId(item.id)}>
                  <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2ReferralPageView
            banner={banner}
            program={program}
            steps={steps}
            leaderboard={leaderboard}
          />
        </Box>
      )}

      {/* Step add/edit dialog */}
      <Dialog open={stepDialog} onClose={() => setStepDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{stepEditId ? t('common.edit') : t('referral.add_step_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={5}>
              <Stack spacing={2}>
                <TextField
                  label={t('referral.form_icon')}
                  fullWidth
                  size="small"
                  value={stepForm.icon}
                  onChange={(e) => setStepForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:share-bold-duotone"
                />
                <TextField
                  label={t('referral.form_step_title')}
                  fullWidth
                  size="small"
                  value={stepForm.title}
                  onChange={(e) => setStepForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('referral.form_step_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={stepForm.desc}
                  onChange={(e) => setStepForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={7}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <StepPreviewCard
                  icon={stepForm.icon}
                  title={stepForm.title}
                  desc={stepForm.desc}
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
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {stepEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!stepDeleteId}
        onClose={() => setStepDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStep}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Leaderboard add/edit dialog */}
      <Dialog open={leaderDialog} onClose={() => setLeaderDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{leaderEditId ? t('common.edit') : t('referral.add_leader_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('referral.form_leader_name')}
                  fullWidth
                  size="small"
                  value={leaderForm.name}
                  onChange={(e) => setLeaderForm((p) => ({ ...p, name: e.target.value }))}
                />
                <TextField
                  label={t('referral.form_leader_avatar')}
                  fullWidth
                  size="small"
                  value={leaderForm.avatar}
                  onChange={(e) => setLeaderForm((p) => ({ ...p, avatar: e.target.value }))}
                  helperText="https://i.pravatar.cc/60?img=11"
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('referral.form_leader_refs')}
                    type="number"
                    size="small"
                    value={leaderForm.refs}
                    onChange={(e) => setLeaderForm((p) => ({ ...p, refs: Number(e.target.value) }))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('referral.form_leader_earned')}
                    type="number"
                    size="small"
                    value={leaderForm.earned}
                    onChange={(e) =>
                      setLeaderForm((p) => ({ ...p, earned: Number(e.target.value) }))
                    }
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <FormControlLabel
                  control={
                    <Switch
                      checked={leaderForm.highlight}
                      onChange={(e) =>
                        setLeaderForm((p) => ({ ...p, highlight: e.target.checked }))
                      }
                    />
                  }
                  label={t('referral.form_leader_highlight')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <LeaderboardPreviewRow
                  name={leaderForm.name}
                  refs={leaderForm.refs}
                  earned={leaderForm.earned}
                  avatar={leaderForm.avatar}
                  highlight={leaderForm.highlight}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLeaderDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitLeader}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {leaderEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!leaderDeleteId}
        onClose={() => setLeaderDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteLeader}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
