import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
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

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2MindfulnessBanner,
  spa2MindfulnessBenefits,
  spa2MindfulnessPrograms,
  type Spa2AdjustableImage,
  spa2MindfulnessChallenge,
  type Spa2MindfulnessBanner,
  type Spa2MindfulnessBenefit,
  type Spa2MindfulnessProgram,
  type Spa2MindfulnessChallenge,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2ContentPageHero3,
  Spa2MindfulnessPageView,
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
import { Spa2SimpleImageField } from './spa2-simple-image-field';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2MindfulnessPageView renders on the public /spa2/mindfulness page: the
// page banner, the science-of-mindfulness benefit grid, the weekly class
// catalog and the 7-day challenge card - read from and written back in the
// same shape as src/_mock/_spa2, the single source of truth shared with the
// public view. The "banner" tab reuses Spa2ContentPageHero3 and the
// "preview" tab reuses Spa2MindfulnessPageView itself, fed with the
// in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_BENEFIT_FORM = { icon: 'solar:brain-bold-duotone', title: '', desc: '' };
const EMPTY_PROGRAM_FORM = {
  name: '',
  duration: '',
  schedule: '',
  instructor: '',
  level: 'Mọi cấp độ',
  price: 0,
  image: '',
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

// Mirrors a single benefit SoftCard on the public page.
function BenefitPreviewCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        textAlign: 'center',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Iconify
        icon={icon || 'solar:brain-bold-duotone'}
        width={40}
        sx={{ color: SPA2_TEAL, mb: 1.5 }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75, fontSize: 14 }}>
        {title || 'Tiêu đề lợi ích'}
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.7 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Card>
  );
}

// Mirrors a single weekly-program card exactly as rendered on the public
// page (cover image + level chip + name + schedule/instructor + price).
function ProgramPreviewCard({
  name,
  duration,
  schedule,
  instructor,
  level,
  price,
  image,
}: Spa2MindfulnessProgram) {
  return (
    <Card
      sx={{ p: 0, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Box
        sx={{
          height: 140,
          bgcolor: SPA2_CREAM,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Chip
          label={level || 'Cấp độ'}
          size="small"
          sx={{ position: 'absolute', top: 10, right: 10, bgcolor: SPA2_INK, color: 'white' }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 14 }}>
          {name || 'Tên chương trình'}
        </Typography>
        <Stack spacing={0.5} sx={{ mb: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:clock-circle-bold" width={13} sx={{ color: SPA2_TEAL }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {duration || 'Thời lượng'} · {schedule || 'Lịch học'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:user-bold" width={13} sx={{ color: SPA2_TEAL }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {instructor || 'Giảng viên'}
            </Typography>
          </Stack>
        </Stack>
        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 14 }}>
          {price ? formatVND(price) : 'Miễn phí'}
        </Typography>
      </Box>
    </Card>
  );
}

// Mirrors the "Thử thách 7 ngày chánh niệm" card exactly as rendered on the
// public page (teal header + numbered day checklist + CTA button).
function ChallengePreviewCard({
  title,
  subtitle,
  buttonLabel,
  days,
  completedDays,
}: Spa2MindfulnessChallenge) {
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', border: `2px solid ${SPA2_TEAL}` }}>
      <Box sx={{ bgcolor: SPA2_TEAL, p: 2.5, color: 'white', textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 0.5 }}>
          {title || 'Tiêu đề thử thách'}
        </Typography>
        <Typography sx={{ opacity: 0.85, fontSize: 12.5 }}>{subtitle || 'Mô tả ngắn…'}</Typography>
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Stack spacing={1}>
          {days.map((d, i) => {
            const done = i < completedDays;
            return (
              <Stack
                key={d}
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: done ? SPA2_CREAM : 'transparent',
                  border: `1px solid ${done ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                }}
              >
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    bgcolor: done ? SPA2_TEAL : SPA2_CREAM_DARK,
                    color: done ? 'white' : 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </Box>
                <Typography sx={{ fontSize: 12.5, color: done ? SPA2_INK : 'text.secondary' }}>
                  {d}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
        <Button
          fullWidth
          sx={{
            mt: 2,
            borderRadius: 99,
            bgcolor: SPA2_TEAL,
            color: 'white',
            '&:hover': { bgcolor: SPA2_TEAL_DARK },
          }}
        >
          {buttonLabel || 'Nút kêu gọi hành động'}
        </Button>
      </Box>
    </Card>
  );
}

export function Spa2MindfulnessManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2MindfulnessBanner>(() => ({
    ...spa2MindfulnessBanner,
    image: { ...spa2MindfulnessBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'benefits' | 'programs' | 'challenge' | 'preview'>(
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

  // ---- Benefits ----
  const [benefits, setBenefits] = useState<Spa2MindfulnessBenefit[]>(() =>
    spa2MindfulnessBenefits.map((b) => ({ ...b }))
  );
  const [benefitForm, setBenefitForm] = useState(EMPTY_BENEFIT_FORM);
  const [benefitDialog, setBenefitDialog] = useState(false);
  const [benefitEditId, setBenefitEditId] = useState<string | null>(null);
  const [benefitDeleteId, setBenefitDeleteId] = useState<string | null>(null);

  const openCreateBenefit = () => {
    setBenefitForm(EMPTY_BENEFIT_FORM);
    setBenefitEditId(null);
    setBenefitDialog(true);
  };
  const openEditBenefit = (item: Spa2MindfulnessBenefit) => {
    setBenefitForm({ icon: item.icon, title: item.title, desc: item.desc });
    setBenefitEditId(item.id);
    setBenefitDialog(true);
  };
  const submitBenefit = () => {
    if (benefitEditId) {
      setBenefits((prev) =>
        prev.map((b) => (b.id === benefitEditId ? { ...b, ...benefitForm } : b))
      );
    } else {
      setBenefits((prev) => [...prev, withId(benefitForm)]);
    }
    setBenefitDialog(false);
    markDirty();
  };
  const confirmDeleteBenefit = () => {
    setBenefits((prev) => prev.filter((b) => b.id !== benefitDeleteId));
    setBenefitDeleteId(null);
    markDirty();
  };

  // ---- Programs ----
  const [programs, setPrograms] = useState<Spa2MindfulnessProgram[]>(() =>
    spa2MindfulnessPrograms.map((p) => ({ ...p }))
  );
  const [programForm, setProgramForm] = useState(EMPTY_PROGRAM_FORM);
  const [programDialog, setProgramDialog] = useState(false);
  const [programEditId, setProgramEditId] = useState<string | null>(null);
  const [programDeleteId, setProgramDeleteId] = useState<string | null>(null);

  const openCreateProgram = () => {
    setProgramForm(EMPTY_PROGRAM_FORM);
    setProgramEditId(null);
    setProgramDialog(true);
  };
  const openEditProgram = (item: Spa2MindfulnessProgram) => {
    setProgramForm({
      name: item.name,
      duration: item.duration,
      schedule: item.schedule,
      instructor: item.instructor,
      level: item.level,
      price: item.price,
      image: item.image,
    });
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

  // ---- Challenge ----
  const [challenge, setChallenge] = useState<Spa2MindfulnessChallenge>(() => ({
    ...spa2MindfulnessChallenge,
    days: [...spa2MindfulnessChallenge.days],
  }));
  const [daysText, setDaysText] = useState(spa2MindfulnessChallenge.days.join('\n'));
  const updateChallenge = (key: keyof Spa2MindfulnessChallenge, value: string | number) => {
    setChallenge((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateChallengeDays = (text: string) => {
    setDaysText(text);
    setChallenge((prev) => ({
      ...prev,
      days: text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    }));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2MindfulnessBanner, image: { ...spa2MindfulnessBanner.image } });
    setBenefits(spa2MindfulnessBenefits.map((b) => ({ ...b })));
    setPrograms(spa2MindfulnessPrograms.map((p) => ({ ...p })));
    setChallenge({ ...spa2MindfulnessChallenge, days: [...spa2MindfulnessChallenge.days] });
    setDaysText(spa2MindfulnessChallenge.days.join('\n'));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('mindfulness.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.mindfulness')}
      publicPath={paths.spa2.mindfulness}
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
          label={t('mindfulness.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="benefits"
          label={t('mindfulness.benefits_section')}
          icon={<Iconify icon="solar:leaf-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="programs"
          label={t('mindfulness.programs_section')}
          icon={<Iconify icon="solar:calendar-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="challenge"
          label={t('mindfulness.challenge_section')}
          icon={<Iconify icon="solar:medal-ribbons-star-bold-duotone" width={20} />}
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
              title={t('mindfulness.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('mindfulness.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('mindfulness.banner_image_help')}
                />
                <TextField
                  label={t('mindfulness.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('mindfulness.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('mindfulness.banner_subtitle')}
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

      {/* Benefits */}
      {tab === 'benefits' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('mindfulness.benefits_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateBenefit}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('mindfulness.add_benefit_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {benefits.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <BenefitPreviewCard icon={item.icon} title={item.title} desc={item.desc} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
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
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Programs */}
      {tab === 'programs' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('mindfulness.programs_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateProgram}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('mindfulness.add_program_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {programs.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <ProgramPreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditProgram(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setProgramDeleteId(item.id)}
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

      {/* Challenge */}
      {tab === 'challenge' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <SectionCard
              title={t('mindfulness.challenge_section')}
              icon="solar:medal-ribbons-star-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('mindfulness.form_challenge_title')}
                  value={challenge.title}
                  onChange={(e) => updateChallenge('title', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('mindfulness.form_challenge_subtitle')}
                  value={challenge.subtitle}
                  onChange={(e) => updateChallenge('subtitle', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('mindfulness.form_challenge_button')}
                  value={challenge.buttonLabel}
                  onChange={(e) => updateChallenge('buttonLabel', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('mindfulness.form_challenge_days')}
                  value={daysText}
                  onChange={(e) => updateChallengeDays(e.target.value)}
                  fullWidth
                  multiline
                  minRows={7}
                  helperText={t('mindfulness.form_challenge_days_help')}
                />
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 500, mb: 1 }}>
                    {t('mindfulness.form_challenge_completed', { count: challenge.completedDays })}
                  </Typography>
                  <Slider
                    value={challenge.completedDays}
                    min={0}
                    max={challenge.days.length}
                    step={1}
                    marks
                    onChange={(_, v) => updateChallenge('completedDays', v as number)}
                    sx={{ color: SPA2_TEAL }}
                  />
                </Box>
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={5}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <ChallengePreviewCard {...challenge} />
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2MindfulnessPageView
            banner={banner}
            benefits={benefits}
            programs={programs}
            challenge={challenge}
          />
        </Box>
      )}

      {/* Benefit dialog */}
      <Dialog open={benefitDialog} onClose={() => setBenefitDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {benefitEditId ? t('common.edit') : t('mindfulness.add_benefit_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('mindfulness.form_icon')}
                  fullWidth
                  size="small"
                  value={benefitForm.icon}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:brain-bold-duotone"
                />
                <TextField
                  label={t('mindfulness.form_benefit_title')}
                  fullWidth
                  size="small"
                  value={benefitForm.title}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('mindfulness.form_benefit_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={benefitForm.desc}
                  onChange={(e) => setBenefitForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <BenefitPreviewCard
                  icon={benefitForm.icon}
                  title={benefitForm.title}
                  desc={benefitForm.desc}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBenefitDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitBenefit}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {benefitEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!benefitDeleteId}
        onClose={() => setBenefitDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteBenefit}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Program dialog */}
      <Dialog open={programDialog} onClose={() => setProgramDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {programEditId ? t('common.edit') : t('mindfulness.add_program_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Spa2SimpleImageField
                  label={t('mindfulness.form_program_image')}
                  value={programForm.image}
                  onChange={(v) => setProgramForm((p) => ({ ...p, image: v }))}
                  height={140}
                />
                <TextField
                  label={t('mindfulness.form_program_name')}
                  fullWidth
                  size="small"
                  value={programForm.name}
                  onChange={(e) => setProgramForm((p) => ({ ...p, name: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('mindfulness.form_program_duration')}
                    fullWidth
                    size="small"
                    value={programForm.duration}
                    onChange={(e) => setProgramForm((p) => ({ ...p, duration: e.target.value }))}
                  />
                  <TextField
                    label={t('mindfulness.form_program_schedule')}
                    fullWidth
                    size="small"
                    value={programForm.schedule}
                    onChange={(e) => setProgramForm((p) => ({ ...p, schedule: e.target.value }))}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('mindfulness.form_program_instructor')}
                    fullWidth
                    size="small"
                    value={programForm.instructor}
                    onChange={(e) => setProgramForm((p) => ({ ...p, instructor: e.target.value }))}
                  />
                  <TextField
                    label={t('mindfulness.form_program_level')}
                    fullWidth
                    size="small"
                    value={programForm.level}
                    onChange={(e) => setProgramForm((p) => ({ ...p, level: e.target.value }))}
                  />
                </Stack>
                <TextField
                  label={t('mindfulness.form_program_price')}
                  type="number"
                  fullWidth
                  size="small"
                  value={programForm.price}
                  onChange={(e) => setProgramForm((p) => ({ ...p, price: Number(e.target.value) }))}
                  helperText={t('mindfulness.form_program_price_help')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ProgramPreviewCard
                  id={programEditId ?? 'preview'}
                  name={programForm.name}
                  duration={programForm.duration}
                  schedule={programForm.schedule}
                  instructor={programForm.instructor}
                  level={programForm.level}
                  price={programForm.price}
                  image={programForm.image}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProgramDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitProgram}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {programEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!programDeleteId}
        onClose={() => setProgramDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProgram}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
