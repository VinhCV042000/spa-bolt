import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2WellnessQuestions,
  type Spa2WellnessQuestion,
  spa2WellnessAssessmentBanner,
  type Spa2WellnessAssessmentBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2WellnessAssessmentPageView } from 'src/sections/spa2/view/spa2-content-pages5';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages5.tsx's
// Spa2WellnessAssessmentPageView renders on the public /spa2/wellness-assessment
// page: the cream-bg hero banner (eyebrow/title/subtitle) and the 6-item
// question bank driving the score sliders (id/label/icon/question) - read from
// and written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The slider VALUES (default scores state),
// the getRecommendations() algorithm and the SCORE_CONFIG() color-banding
// helper are pure interactive/demo logic on the public page and are
// intentionally not mocked/editable here - only banner and questions are.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_QUESTION: Omit<Spa2WellnessQuestion, 'id'> = {
  label: '',
  icon: 'solar:moon-bold',
  question: '',
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

// Mirrors the cream-bg hero section rendered by Spa2WellnessAssessmentPageView
// on the public page - overline eyebrow, h1 title, subtitle, centered.
function BannerPreview({ banner }: { banner: Spa2WellnessAssessmentBanner }) {
  return (
    <Box sx={{ bgcolor: SPA2_CREAM, py: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600, maxWidth: 420 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors one slider row's label + icon exactly as rendered in the public
// "Di chuyển thanh trượt để đánh giá" list (see Spa2WellnessAssessmentPageView),
// plus the question copy shown as the small caption underneath the slider.
function QuestionPreviewCard({ label, icon, question }: Omit<Spa2WellnessQuestion, 'id'>) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        bgcolor: 'common.white',
        p: 2,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Iconify icon={icon || 'solar:moon-bold'} width={18} sx={{ color: SPA2_TEAL }} />
        <Chip
          label={label || '(Chưa đặt tên)'}
          size="small"
          sx={{ bgcolor: `${SPA2_TEAL}15`, color: SPA2_TEAL_DARK, fontWeight: 600 }}
        />
      </Stack>
      <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
        {question || 'Nội dung câu hỏi...'}
      </Typography>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa2WellnessAssessmentManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2WellnessAssessmentBanner>(() => ({
    ...spa2WellnessAssessmentBanner,
  }));
  const [questions, setQuestions] = useState<Spa2WellnessQuestion[]>(() =>
    spa2WellnessQuestions.map((q) => ({ ...q }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'questions' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Questions CRUD ----
  const [questionDialog, setQuestionDialog] = useState(false);
  const [questionEditId, setQuestionEditId] = useState<string | null>(null);
  const [questionForm, setQuestionForm] =
    useState<Omit<Spa2WellnessQuestion, 'id'>>(EMPTY_QUESTION);
  const [questionDeleteId, setQuestionDeleteId] = useState<string | null>(null);

  const openCreateQuestion = () => {
    setQuestionForm(EMPTY_QUESTION);
    setQuestionEditId(null);
    setQuestionDialog(true);
  };
  const openEditQuestion = (item: Spa2WellnessQuestion) => {
    const { id, ...rest } = item;
    setQuestionForm({ ...rest });
    setQuestionEditId(id);
    setQuestionDialog(true);
  };
  const submitQuestion = () => {
    const next: Omit<Spa2WellnessQuestion, 'id'> = { ...questionForm };
    if (questionEditId) {
      setQuestions((prev) =>
        prev.map((item) => (item.id === questionEditId ? { ...item, ...next } : item))
      );
    } else {
      setQuestions((prev) => [...prev, withId(next)]);
    }
    setQuestionDialog(false);
    markDirty();
  };
  const confirmDeleteQuestion = () => {
    setQuestions((prev) => prev.filter((item) => item.id !== questionDeleteId));
    setQuestionDeleteId(null);
    markDirty();
  };
  const moveQuestion = (idx: number, direction: -1 | 1) => {
    setQuestions((prev) => {
      const next = [...prev];
      const target = idx + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2WellnessAssessmentBanner });
    setQuestions(spa2WellnessQuestions.map((q) => ({ ...q })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('wellness_assessment.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.wellness_assessment')}
      publicPath={paths.spa2.wellnessAssessment}
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
          label={t('wellness_assessment.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="questions"
          label={t('wellness_assessment.questions_section')}
          icon={<Iconify icon="solar:question-square-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - cream hero, eyebrow/title/subtitle only */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('wellness_assessment.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('wellness_assessment.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('wellness_assessment.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('wellness_assessment.banner_subtitle')}
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

      {/* Questions */}
      {tab === 'questions' && (
        <SectionCard
          title={t('wellness_assessment.questions_section')}
          icon="solar:question-square-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateQuestion}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('wellness_assessment.add_question_btn')}
            </Button>
          }
        >
          <Stack spacing={2}>
            {questions.map((item, idx) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={2}
                alignItems="flex-start"
                sx={{ p: 2, borderRadius: 2.5, bgcolor: 'background.neutral' }}
              >
                <Stack spacing={0.25} alignItems="center">
                  <Chip
                    size="small"
                    label={`#${idx + 1}`}
                    sx={{ bgcolor: 'common.white', fontWeight: 700, mb: 0.5 }}
                  />
                  <IconButton
                    size="small"
                    disabled={idx === 0}
                    onClick={() => moveQuestion(idx, -1)}
                  >
                    <Iconify icon="solar:alt-arrow-up-bold" width={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    disabled={idx === questions.length - 1}
                    onClick={() => moveQuestion(idx, 1)}
                  >
                    <Iconify icon="solar:alt-arrow-down-bold" width={16} />
                  </IconButton>
                </Stack>
                <Box sx={{ flex: 1 }}>
                  <QuestionPreviewCard
                    label={item.label}
                    icon={item.icon}
                    question={item.question}
                  />
                </Box>
                <Stack direction="row" spacing={0.5}>
                  <IconButton size="small" onClick={() => openEditQuestion(item)}>
                    <Iconify icon="solar:pen-bold" width={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setQuestionDeleteId(item.id)}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
            {questions.length === 0 && (
              <Typography variant="body2" color="text.disabled" sx={{ py: 3, textAlign: 'center' }}>
                {t('wellness_assessment.no_questions')}
              </Typography>
            )}
          </Stack>
        </SectionCard>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2WellnessAssessmentPageView banner={banner} questions={questions} />
        </Box>
      )}

      {/* Question add/edit dialog */}
      <Dialog
        open={questionDialog}
        onClose={() => setQuestionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {questionEditId ? t('common.edit') : t('wellness_assessment.add_question_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('wellness_assessment.form_label')}
              value={questionForm.label}
              onChange={(e) => setQuestionForm((p) => ({ ...p, label: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('wellness_assessment.form_icon')}
              value={questionForm.icon}
              onChange={(e) => setQuestionForm((p) => ({ ...p, icon: e.target.value }))}
              fullWidth
              helperText={t('wellness_assessment.form_icon_helper')}
            />
            <TextField
              label={t('wellness_assessment.form_question')}
              value={questionForm.question}
              onChange={(e) => setQuestionForm((p) => ({ ...p, question: e.target.value }))}
              fullWidth
              multiline
              minRows={3}
            />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <QuestionPreviewCard
                  label={questionForm.label}
                  icon={questionForm.icon}
                  question={questionForm.question}
                />
              </Box>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuestionDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitQuestion}
            disabled={!questionForm.label}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {questionEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!questionDeleteId}
        onClose={() => setQuestionDeleteId(null)}
        title={t('wellness_assessment.question_delete_title')}
        content={t('wellness_assessment.question_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteQuestion}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
