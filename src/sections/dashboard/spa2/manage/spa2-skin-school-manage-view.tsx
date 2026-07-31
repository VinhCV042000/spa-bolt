import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2SkinSchoolQuiz,
  spa2SkinSchoolBanner,
  spa2SkinSchoolCourses,
  type Spa2SkinSchoolBanner,
  type Spa2SkinSchoolCourse,
  type Spa2SkinSchoolQuizQuestion,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SkinSchoolPageView } from 'src/sections/spa2/view/spa2-content-pages5';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages5.tsx's
// Spa2SkinSchoolPageView renders on the public /spa2/skin-school page: the
// dark-gradient hero banner (plain color, no image field), the course catalog
// (icon/level/lessons/duration/rating/price/topics, reorderable) and the quiz
// question bank (options + correct-answer index + explanation) - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The "Của tôi" (my courses) tab on the
// public page is purely client-derived interactive state (which courses the
// visitor has enrolled in) and is intentionally not mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const SKIN_SCHOOL_LEVELS = ['Cơ bản', 'Trung cấp', 'Nâng cao'];

const EMPTY_COURSE: Omit<Spa2SkinSchoolCourse, 'id'> = {
  title: '',
  level: SKIN_SCHOOL_LEVELS[0],
  lessons: 1,
  duration: '',
  icon: 'solar:book-bold-duotone',
  color: SPA2_TEAL,
  enrolled: 0,
  rating: 5,
  free: true,
  price: 0,
  topics: [],
};

const EMPTY_QUESTION: Omit<Spa2SkinSchoolQuizQuestion, 'id'> = {
  q: '',
  opts: ['', ''],
  correct: 0,
  explain: '',
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

// Mirrors the dark-gradient hero section rendered by Spa2SkinSchoolPageView on
// the public page - a plain-color background (no image field for this banner
// type), eyebrow/title/subtitle plus the course-count / free-count / cert
// badge chip row.
function BannerPreview({
  banner,
  coursesCount,
  freeCount,
}: {
  banner: Spa2SkinSchoolBanner;
  coursesCount: number;
  freeCount: number;
}) {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${SPA2_INK} 0%, #1a3d35 100%)`,
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ gap: 1 }}>
          <Chip
            label={`${coursesCount} khóa học`}
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
          />
          <Chip
            label={`${freeCount} khóa miễn phí`}
            sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 600 }}
          />
          <Chip
            label={banner.certBadgeLabel}
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

// Mirrors one course card exactly as rendered in the public "Tất cả khóa học"
// grid (see Spa2SkinSchoolPageView, ~line 590+): color-tinted header with
// icon/level/title, then lessons/duration/rating and the free badge or price.
function CoursePreviewCard({ course }: { course: Omit<Spa2SkinSchoolCourse, 'id'> }) {
  const color = course.color || SPA2_TEAL;
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2.5, bgcolor: `${color}12`, borderBottom: `3px solid ${color}` }}>
        <Iconify icon={course.icon || 'solar:book-bold-duotone'} width={32} sx={{ color, mb: 1 }} />
        <Chip
          label={course.level}
          size="small"
          sx={{ bgcolor: `${color}20`, color, fontSize: 11, mb: 1 }}
        />
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, lineHeight: 1.4 }}>
          {course.title || '(Chưa đặt tên)'}
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Iconify icon="solar:play-circle-bold" width={14} sx={{ color: 'text.secondary' }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {course.lessons} bài
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Iconify icon="solar:clock-circle-bold" width={14} sx={{ color: 'text.secondary' }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              {course.duration}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 1.5 }}>
          <Rating
            value={course.rating}
            readOnly
            size="small"
            precision={0.1}
            sx={{ fontSize: 13, '& .MuiRating-icon': { color: '#EF9F27' } }}
          />
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
            ({course.enrolled.toLocaleString()})
          </Typography>
        </Stack>
        {course.free ? (
          <Chip label="MIỄN PHÍ" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 700 }} />
        ) : (
          <Typography sx={{ fontWeight: 700, color, fontSize: 16 }}>
            {formatVND(course.price ?? 0)}
          </Typography>
        )}
      </Box>
    </Card>
  );
}

// Mirrors the lettered-option quiz card look of the public page (see
// Spa2SkinSchoolPageView, ~line 793+), highlighting the currently selected
// correct answer so admins can see exactly how it will render.
function QuestionPreviewCard({ q, opts, correct }: { q: string; opts: string[]; correct: number }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        bgcolor: 'common.white',
        p: 2.5,
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {q || 'Nội dung câu hỏi...'}
      </Typography>
      <Stack spacing={1}>
        {opts.map((opt, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Stack
            key={i}
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              p: 1.25,
              borderRadius: 2,
              border: `1.5px solid ${i === correct ? '#2E7D32' : SPA2_CREAM_DARK}`,
              bgcolor: i === correct ? '#E8F5E9' : 'transparent',
            }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: i === correct ? '#2E7D32' : SPA2_CREAM_DARK,
                color: i === correct ? 'common.white' : 'text.primary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {String.fromCharCode(65 + i)}
            </Box>
            <Typography variant="body2" sx={{ flex: 1 }}>
              {opt || `Lựa chọn ${i + 1}`}
            </Typography>
            {i === correct && (
              <Iconify icon="solar:check-circle-bold" width={18} sx={{ color: '#2E7D32' }} />
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa2SkinSchoolManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SkinSchoolBanner>(() => ({ ...spa2SkinSchoolBanner }));
  const [courses, setCourses] = useState<Spa2SkinSchoolCourse[]>(() =>
    spa2SkinSchoolCourses.map((c) => ({ ...c, topics: [...c.topics] }))
  );
  const [quiz, setQuiz] = useState<Spa2SkinSchoolQuizQuestion[]>(() =>
    spa2SkinSchoolQuiz.map((q) => ({ ...q, opts: [...q.opts] }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'courses' | 'quiz' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (
    key: 'eyebrow' | 'title' | 'subtitle' | 'certBadgeLabel',
    value: string
  ) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Courses CRUD ----
  const [courseDialog, setCourseDialog] = useState(false);
  const [courseEditId, setCourseEditId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<Omit<Spa2SkinSchoolCourse, 'id'>>(EMPTY_COURSE);
  const [courseDeleteId, setCourseDeleteId] = useState<string | null>(null);

  const openCreateCourse = () => {
    setCourseForm(EMPTY_COURSE);
    setCourseEditId(null);
    setCourseDialog(true);
  };
  const openEditCourse = (item: Spa2SkinSchoolCourse) => {
    const { id, ...rest } = item;
    setCourseForm({ ...rest, topics: [...rest.topics] });
    setCourseEditId(id);
    setCourseDialog(true);
  };
  const submitCourse = () => {
    const next: Omit<Spa2SkinSchoolCourse, 'id'> = {
      ...courseForm,
      lessons: Number(courseForm.lessons),
      enrolled: Number(courseForm.enrolled),
      rating: Number(courseForm.rating),
      price: courseForm.free ? undefined : Number(courseForm.price ?? 0),
      topics: courseForm.topics.map((topic) => topic.trim()).filter(Boolean),
    };
    if (courseEditId) {
      setCourses((prev) => prev.map((c) => (c.id === courseEditId ? { ...c, ...next } : c)));
    } else {
      setCourses((prev) => [...prev, withId(next)]);
    }
    setCourseDialog(false);
    markDirty();
  };
  const confirmDeleteCourse = () => {
    setCourses((prev) => prev.filter((c) => c.id !== courseDeleteId));
    setCourseDeleteId(null);
    markDirty();
  };
  const reorderCourses = (next: Spa2SkinSchoolCourse[]) => {
    setCourses(next);
    markDirty();
  };

  const updateCourseTopic = (idx: number, value: string) => {
    setCourseForm((p) => ({
      ...p,
      topics: p.topics.map((topic, i) => (i === idx ? value : topic)),
    }));
  };
  const addCourseTopic = () => setCourseForm((p) => ({ ...p, topics: [...p.topics, ''] }));
  const removeCourseTopic = (idx: number) =>
    setCourseForm((p) => ({ ...p, topics: p.topics.filter((_, i) => i !== idx) }));

  // ---- Quiz CRUD ----
  const [questionDialog, setQuestionDialog] = useState(false);
  const [questionEditId, setQuestionEditId] = useState<string | null>(null);
  const [questionForm, setQuestionForm] =
    useState<Omit<Spa2SkinSchoolQuizQuestion, 'id'>>(EMPTY_QUESTION);
  const [questionDeleteId, setQuestionDeleteId] = useState<string | null>(null);

  const openCreateQuestion = () => {
    setQuestionForm(EMPTY_QUESTION);
    setQuestionEditId(null);
    setQuestionDialog(true);
  };
  const openEditQuestion = (item: Spa2SkinSchoolQuizQuestion) => {
    setQuestionForm({
      q: item.q,
      opts: [...item.opts],
      correct: item.correct,
      explain: item.explain,
    });
    setQuestionEditId(item.id);
    setQuestionDialog(true);
  };
  const submitQuestion = () => {
    const opts = questionForm.opts.map((opt) => opt.trim()).filter(Boolean);
    const correct = Math.min(questionForm.correct, Math.max(opts.length - 1, 0));
    const next = { q: questionForm.q, opts, correct, explain: questionForm.explain };
    if (questionEditId) {
      setQuiz((prev) =>
        prev.map((qItem) => (qItem.id === questionEditId ? { ...qItem, ...next } : qItem))
      );
    } else {
      setQuiz((prev) => [...prev, withId(next)]);
    }
    setQuestionDialog(false);
    markDirty();
  };
  const confirmDeleteQuestion = () => {
    setQuiz((prev) => prev.filter((qItem) => qItem.id !== questionDeleteId));
    setQuestionDeleteId(null);
    markDirty();
  };
  const moveQuestion = (idx: number, direction: -1 | 1) => {
    setQuiz((prev) => {
      const next = [...prev];
      const target = idx + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    markDirty();
  };

  const updateOption = (idx: number, value: string) => {
    setQuestionForm((p) => ({ ...p, opts: p.opts.map((opt, i) => (i === idx ? value : opt)) }));
  };
  const addOption = () => setQuestionForm((p) => ({ ...p, opts: [...p.opts, ''] }));
  const removeOption = (idx: number) =>
    setQuestionForm((p) => {
      const opts = p.opts.filter((_, i) => i !== idx);
      // eslint-disable-next-line no-nested-ternary
      const correct = p.correct === idx ? 0 : p.correct > idx ? p.correct - 1 : p.correct;
      return { ...p, opts, correct };
    });

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SkinSchoolBanner });
    setCourses(spa2SkinSchoolCourses.map((c) => ({ ...c, topics: [...c.topics] })));
    setQuiz(spa2SkinSchoolQuiz.map((q) => ({ ...q, opts: [...q.opts] })));
    setDirty(false);
  };

  const freeCount = courses.filter((c) => c.free).length;

  return (
    <Spa2ManageShell
      title={t('skin_school.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.skin_school')}
      publicPath={paths.spa2.skinSchool}
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
          label={t('skin_school.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="courses"
          label={t('skin_school.courses_section')}
          icon={<Iconify icon="solar:notebook-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="quiz"
          label={t('skin_school.quiz_section')}
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

      {/* Banner - plain-color gradient hero, no image field */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('skin_school.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('skin_school.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('skin_school.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('skin_school.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('skin_school.banner_cert_badge')}
                  value={banner.certBadgeLabel}
                  onChange={(e) => updateBanner('certBadgeLabel', e.target.value)}
                  fullWidth
                  size="small"
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <BannerPreview
                  banner={banner}
                  coursesCount={courses.length}
                  freeCount={freeCount}
                />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Courses */}
      {tab === 'courses' && (
        <SectionCard
          title={t('skin_school.courses_section')}
          icon="solar:notebook-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateCourse}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('skin_school.add_course_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('skin_school.drag_hint')}
          </Typography>
          {courses.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('skin_school.no_courses')}
            </Typography>
          )}
          <Spa2SortableGrid items={courses} onReorder={reorderCourses}>
            <Grid container spacing={2}>
              {courses.map((c) => (
                <Grid key={c.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={c.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <CoursePreviewCard course={c} />
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
                            onClick={() => openEditCourse(c)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setCourseDeleteId(c.id)}
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
        </SectionCard>
      )}

      {/* Quiz */}
      {tab === 'quiz' && (
        <SectionCard
          title={t('skin_school.quiz_section')}
          icon="solar:question-square-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateQuestion}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('skin_school.add_question_btn')}
            </Button>
          }
        >
          <Stack spacing={2}>
            {quiz.map((item, idx) => (
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
                    disabled={idx === quiz.length - 1}
                    onClick={() => moveQuestion(idx, 1)}
                  >
                    <Iconify icon="solar:alt-arrow-down-bold" width={16} />
                  </IconButton>
                </Stack>
                <Box sx={{ flex: 1 }}>
                  <QuestionPreviewCard q={item.q} opts={item.opts} correct={item.correct} />
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
            {quiz.length === 0 && (
              <Typography variant="body2" color="text.disabled" sx={{ py: 3, textAlign: 'center' }}>
                {t('skin_school.no_questions')}
              </Typography>
            )}
          </Stack>
        </SectionCard>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SkinSchoolPageView banner={banner} courses={courses} quiz={quiz} />
        </Box>
      )}

      {/* Course add/edit dialog */}
      <Dialog open={courseDialog} onClose={() => setCourseDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {courseEditId ? t('common.edit') : t('skin_school.add_course_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('skin_school.form_course_title')}
                  value={courseForm.title}
                  onChange={(e) => setCourseForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label={t('skin_school.form_course_level')}
                    value={courseForm.level}
                    onChange={(e) => setCourseForm((p) => ({ ...p, level: e.target.value }))}
                    fullWidth
                  >
                    {SKIN_SCHOOL_LEVELS.map((lvl) => (
                      <MenuItem key={lvl} value={lvl}>
                        {lvl}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={t('skin_school.form_course_duration')}
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('skin_school.form_course_lessons')}
                    type="number"
                    value={courseForm.lessons}
                    onChange={(e) =>
                      setCourseForm((p) => ({ ...p, lessons: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('skin_school.form_course_icon')}
                    value={courseForm.icon}
                    onChange={(e) => setCourseForm((p) => ({ ...p, icon: e.target.value }))}
                    fullWidth
                    helperText="solar:book-bold-duotone"
                  />
                  <TextField
                    label={t('skin_school.form_course_color')}
                    value={courseForm.color}
                    onChange={(e) => setCourseForm((p) => ({ ...p, color: e.target.value }))}
                    fullWidth
                    helperText="#2E8B7A"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('skin_school.form_course_enrolled')}
                    type="number"
                    value={courseForm.enrolled}
                    onChange={(e) =>
                      setCourseForm((p) => ({ ...p, enrolled: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('skin_school.form_course_rating')}
                    type="number"
                    inputProps={{ step: 0.1, min: 0, max: 5 }}
                    value={courseForm.rating}
                    onChange={(e) =>
                      setCourseForm((p) => ({ ...p, rating: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={courseForm.free}
                        onChange={(e) => setCourseForm((p) => ({ ...p, free: e.target.checked }))}
                      />
                    }
                    label={t('skin_school.form_course_free')}
                  />
                  {!courseForm.free && (
                    <TextField
                      label={t('skin_school.form_course_price')}
                      type="number"
                      value={courseForm.price ?? 0}
                      onChange={(e) =>
                        setCourseForm((p) => ({ ...p, price: Number(e.target.value) }))
                      }
                      fullWidth
                    />
                  )}
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {t('skin_school.form_course_topics')}
                  </Typography>
                  <Stack spacing={1}>
                    {courseForm.topics.map((topic, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <TextField
                          size="small"
                          fullWidth
                          value={topic}
                          onChange={(e) => updateCourseTopic(idx, e.target.value)}
                          placeholder={t('skin_school.course_topic_placeholder')}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeCourseTopic(idx)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addCourseTopic}
                    sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
                  >
                    {t('skin_school.add_course_topic_btn')}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <CoursePreviewCard course={courseForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCourseDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitCourse}
            disabled={!courseForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {courseEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!courseDeleteId}
        onClose={() => setCourseDeleteId(null)}
        title={t('skin_school.course_delete_title')}
        content={t('skin_school.course_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteCourse}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Question add/edit dialog */}
      <Dialog
        open={questionDialog}
        onClose={() => setQuestionDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {questionEditId ? t('common.edit') : t('skin_school.add_question_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('skin_school.form_question')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={questionForm.q}
                  onChange={(e) => setQuestionForm((p) => ({ ...p, q: e.target.value }))}
                />
                <Stack spacing={1}>
                  <Typography variant="caption" color="text.secondary">
                    {t('skin_school.form_option')}
                  </Typography>
                  <Stack spacing={1}>
                    {questionForm.opts.map((opt, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <Chip
                          size="small"
                          label={String.fromCharCode(65 + idx)}
                          sx={{ minWidth: 28 }}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          value={opt}
                          onChange={(e) => updateOption(idx, e.target.value)}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          disabled={questionForm.opts.length <= 2}
                          onClick={() => removeOption(idx)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addOption}
                    sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
                  >
                    {t('skin_school.add_option_btn')}
                  </Button>
                </Stack>
                <TextField
                  select
                  label={t('skin_school.form_correct_option')}
                  value={questionForm.correct}
                  onChange={(e) =>
                    setQuestionForm((p) => ({ ...p, correct: Number(e.target.value) }))
                  }
                  fullWidth
                >
                  {questionForm.opts.map((opt, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <MenuItem key={idx} value={idx}>
                      {String.fromCharCode(65 + idx)} — {opt || `Lựa chọn ${idx + 1}`}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label={t('skin_school.form_explain')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={questionForm.explain}
                  onChange={(e) => setQuestionForm((p) => ({ ...p, explain: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <QuestionPreviewCard
                  q={questionForm.q}
                  opts={questionForm.opts}
                  correct={questionForm.correct}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuestionDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitQuestion}
            disabled={!questionForm.q}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {questionEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!questionDeleteId}
        onClose={() => setQuestionDeleteId(null)}
        title={t('skin_school.question_delete_title')}
        content={t('skin_school.question_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteQuestion}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
