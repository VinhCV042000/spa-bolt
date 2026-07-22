import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2Services,
  spa2SkinQuizBanner,
  spa2SkinQuizResults,
  spa2SkinQuizQuestions,
  type Spa2AdjustableImage,
  type Spa2SkinQuizResult,
  type Spa2SkinQuizQuestion,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2ContentPageHero,
  Spa2SkinQuizPageView,
} from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2SkinQuizPageView renders on the public /spa2/skin-quiz page: the page
// banner, the quiz questions and the skin-type results (each result mapping
// to real spa2Services) - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The "banner" tab reuses Spa2ContentPageHero and the "preview" tab reuses
// Spa2SkinQuizPageView itself, fed with the in-progress edited state.
//
// IMPORTANT: the public quiz scores answers by tallying which OPTION INDEX
// (0-3) was picked most often across all 4 questions, then looks up
// results[topIndex] - so every question must keep exactly results.length
// options, in the same order as `results` (e.g. option 0 of every question
// should describe the same skin type as results[0]). The "questions" tab
// labels each option field with its matching result type to make this easy
// to keep in sync.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_QUESTION_FORM = { question: '', options: ['', '', '', ''] };
const EMPTY_RESULT_FORM = {
  type: '',
  desc: '',
  icon: 'solar:drop-bold-duotone',
  services: [] as string[],
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

function ResultPreviewCard({ type, desc, icon }: { type: string; desc: string; icon: string }) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ bgcolor: SPA2_TEAL, p: 2.5, color: 'white', textAlign: 'center' }}>
        <Iconify icon={icon || 'solar:drop-bold-duotone'} width={36} sx={{ mb: 1 }} />
        <Typography variant="subtitle1">Bạn có {type || 'kết quả'}</Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {desc || 'Mô tả kết quả...'}
        </Typography>
      </Box>
    </Box>
  );
}

export function Spa2SkinQuizManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2SkinQuizBanner,
    image: { ...spa2SkinQuizBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'questions' | 'results' | 'preview'>('banner');
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

  // ---- Questions ----
  const [questions, setQuestions] = useState<Spa2SkinQuizQuestion[]>(() =>
    spa2SkinQuizQuestions.map((q) => ({ ...q, options: [...q.options] }))
  );
  const [questionForm, setQuestionForm] = useState(EMPTY_QUESTION_FORM);
  const [questionDialog, setQuestionDialog] = useState(false);
  const [questionEditId, setQuestionEditId] = useState<string | null>(null);
  const [questionDeleteId, setQuestionDeleteId] = useState<string | null>(null);

  const openCreateQuestion = () => {
    setQuestionForm({ question: '', options: results.map(() => '') });
    setQuestionEditId(null);
    setQuestionDialog(true);
  };

  const openEditQuestion = (item: Spa2SkinQuizQuestion) => {
    setQuestionForm({ question: item.question, options: [...item.options] });
    setQuestionEditId(item.id);
    setQuestionDialog(true);
  };

  const submitQuestion = () => {
    const next = { question: questionForm.question, options: [...questionForm.options] };
    if (questionEditId) {
      setQuestions((prev) => prev.map((q) => (q.id === questionEditId ? { ...q, ...next } : q)));
    } else {
      setQuestions((prev) => [...prev, withId(next)]);
    }
    setQuestionDialog(false);
    markDirty();
  };

  const confirmDeleteQuestion = () => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionDeleteId));
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

  // ---- Results ----
  const [results, setResults] = useState<Spa2SkinQuizResult[]>(() =>
    spa2SkinQuizResults.map((r) => ({ ...r, services: [...r.services] }))
  );
  const [resultForm, setResultForm] = useState(EMPTY_RESULT_FORM);
  const [resultDialog, setResultDialog] = useState(false);
  const [resultEditId, setResultEditId] = useState<string | null>(null);
  const [resultDeleteId, setResultDeleteId] = useState<string | null>(null);

  const openCreateResult = () => {
    setResultForm(EMPTY_RESULT_FORM);
    setResultEditId(null);
    setResultDialog(true);
  };

  const openEditResult = (item: Spa2SkinQuizResult) => {
    setResultForm({
      type: item.type,
      desc: item.desc,
      icon: item.icon,
      services: [...item.services],
    });
    setResultEditId(item.id);
    setResultDialog(true);
  };

  const submitResult = () => {
    const next = {
      type: resultForm.type,
      desc: resultForm.desc,
      icon: resultForm.icon,
      services: [...resultForm.services],
    };
    if (resultEditId) {
      setResults((prev) => prev.map((r) => (r.id === resultEditId ? { ...r, ...next } : r)));
    } else {
      setResults((prev) => [...prev, withId(next)]);
    }
    setResultDialog(false);
    markDirty();
  };

  const confirmDeleteResult = () => {
    setResults((prev) => prev.filter((r) => r.id !== resultDeleteId));
    setResultDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SkinQuizBanner, image: { ...spa2SkinQuizBanner.image } });
    setQuestions(spa2SkinQuizQuestions.map((q) => ({ ...q, options: [...q.options] })));
    setResults(spa2SkinQuizResults.map((r) => ({ ...r, services: [...r.services] })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('skin_quiz.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.skin_quiz')}
      publicPath={paths.spa2.skinQuiz}
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
          label={t('skin_quiz.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="questions"
          label={t('skin_quiz.questions_section')}
          icon={<Iconify icon="solar:question-square-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="results"
          label={t('skin_quiz.results_section')}
          icon={<Iconify icon="solar:medal-ribbon-star-bold-duotone" width={20} />}
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
              title={t('skin_quiz.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('skin_quiz.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('skin_quiz.banner_image_help')}
                />
                <TextField
                  label={t('skin_quiz.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('skin_quiz.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('skin_quiz.banner_subtitle')}
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

      {/* Questions */}
      {tab === 'questions' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('skin_quiz.questions_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateQuestion}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('skin_quiz.add_question_btn')}
            </Button>
          </Stack>
          <Stack spacing={2}>
            {questions.map((item, idx) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={2}
                alignItems="flex-start"
                sx={{ p: 2, borderRadius: 2.5, bgcolor: SPA2_CREAM }}
              >
                <Stack spacing={0.25}>
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
                  <Typography sx={{ fontWeight: 600, mb: 1 }}>
                    Câu {idx + 1}: {item.question}
                  </Typography>
                  <Grid container spacing={1}>
                    {item.options.map((opt, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Grid key={i} xs={12} sm={6}>
                        <Typography variant="caption" color="text.disabled" display="block">
                          {results[i]?.type ?? `Lựa chọn ${i + 1}`}
                        </Typography>
                        <Typography variant="body2">{opt}</Typography>
                      </Grid>
                    ))}
                  </Grid>
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
                {t('skin_quiz.no_questions')}
              </Typography>
            )}
          </Stack>
        </Card>
      )}

      {/* Results */}
      {tab === 'results' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('skin_quiz.results_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateResult}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('skin_quiz.add_result_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {results.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <ResultPreviewCard type={item.type} desc={item.desc} icon={item.icon} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditResult(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setResultDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
                <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                  {item.services.map((s) => (
                    <Chip key={s} size="small" label={s} sx={{ bgcolor: SPA2_CREAM }} />
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SkinQuizPageView banner={banner} questions={questions} results={results} />
        </Box>
      )}

      {/* Question add/edit dialog */}
      <Dialog
        open={questionDialog}
        onClose={() => setQuestionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {questionEditId ? t('common.edit') : t('skin_quiz.add_question_btn')}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label={t('skin_quiz.form_question')}
              fullWidth
              multiline
              minRows={2}
              value={questionForm.question}
              onChange={(e) => setQuestionForm((p) => ({ ...p, question: e.target.value }))}
            />
            {results.map((r, i) => (
              <TextField
                key={r.id}
                label={`${t('skin_quiz.form_option')} (${r.type})`}
                fullWidth
                size="small"
                value={questionForm.options[i] ?? ''}
                onChange={(e) => {
                  const next = [...questionForm.options];
                  next[i] = e.target.value;
                  setQuestionForm((p) => ({ ...p, options: next }));
                }}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuestionDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitQuestion}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {questionEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!questionDeleteId}
        onClose={() => setQuestionDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteQuestion}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Result add/edit dialog */}
      <Dialog open={resultDialog} onClose={() => setResultDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{resultEditId ? t('common.edit') : t('skin_quiz.add_result_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('skin_quiz.form_result_type')}
                  fullWidth
                  size="small"
                  value={resultForm.type}
                  onChange={(e) => setResultForm((p) => ({ ...p, type: e.target.value }))}
                />
                <TextField
                  label={t('skin_quiz.form_result_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={resultForm.desc}
                  onChange={(e) => setResultForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <TextField
                  label={t('skin_quiz.form_result_icon')}
                  fullWidth
                  size="small"
                  value={resultForm.icon}
                  onChange={(e) => setResultForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:drop-bold-duotone"
                />
                <FormControl size="small" fullWidth>
                  <InputLabel>{t('skin_quiz.form_result_services')}</InputLabel>
                  <Select
                    multiple
                    value={resultForm.services}
                    label={t('skin_quiz.form_result_services')}
                    onChange={(e) => {
                      const value = e.target.value;
                      setResultForm((p) => ({
                        ...p,
                        services: typeof value === 'string' ? value.split(',') : value,
                      }));
                    }}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                  >
                    {spa2Services.map((s) => (
                      <MenuItem key={s.name} value={s.name}>
                        {s.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ResultPreviewCard
                  type={resultForm.type}
                  desc={resultForm.desc}
                  icon={resultForm.icon}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResultDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitResult}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {resultEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!resultDeleteId}
        onClose={() => setResultDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteResult}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
