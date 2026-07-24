import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
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
import LinearProgress from '@mui/material/LinearProgress';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2ReviewStats,
  spa2ReviewBanner,
  spa2ReviewAspects,
  type Spa2ReviewStats,
  type Spa2ReviewAspect,
  type Spa2ReviewBanner,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import {
  Spa2ReviewPageView,
  Spa2ContentPageHero3,
} from 'src/sections/spa2/view/spa2-content-pages3';
import {
  SPA2_INK,
  SPA2_TEAL,
  spa2Feedbacks,
  SPA2_CREAM_DARK,
  type Spa2FeedbackStatus,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2ReviewPageView renders on the public /spa2/review page: the page
// banner, the list of rating aspects shown in "Đánh giá chi tiết", and the
// community rating stats (average, total, per-star distribution) shown in
// the sidebar - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// Recent reviews in the sidebar reuse spa2Feedbacks (managed on the
// Feedbacks page) so they are not duplicated here. The "banner" tab reuses
// Spa2ContentPageHero3 and the "preview" tab reuses Spa2ReviewPageView
// itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

type ReviewItem = (typeof spa2Feedbacks)[number] & { id: number };

const REVIEW_STATUS_COLOR: Record<Spa2FeedbackStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

const REVIEW_STATUS_LABEL: Record<Spa2FeedbackStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
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

export function Spa2ReviewManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2ReviewBanner>(() => ({
    ...spa2ReviewBanner,
    image: { ...spa2ReviewBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'aspects' | 'stats' | 'reviews' | 'preview'>('banner');
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

  // ---- Aspects ----
  const [aspects, setAspects] = useState<Spa2ReviewAspect[]>(() =>
    spa2ReviewAspects.map((a) => ({ ...a }))
  );
  const updateAspect = (idx: number, label: string) => {
    setAspects((prev) => prev.map((a, i) => (i === idx ? { ...a, label } : a)));
    markDirty();
  };
  const updateAspectRating = (idx: number, sampleRating: number) => {
    setAspects((prev) => prev.map((a, i) => (i === idx ? { ...a, sampleRating } : a)));
    markDirty();
  };
  const addAspect = () => {
    setAspects((prev) => [...prev, withId({ label: '', sampleRating: 0 })]);
    markDirty();
  };
  const removeAspect = (idx: number) => {
    setAspects((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };
  const reorderAspects = (next: Spa2ReviewAspect[]) => {
    setAspects(next);
    markDirty();
  };

  // ---- Stats ----
  const [stats, setStats] = useState<Spa2ReviewStats>(() => ({
    ...spa2ReviewStats,
    distribution: spa2ReviewStats.distribution.map((d) => ({ ...d })),
  }));
  const updateStatsField = (key: 'average' | 'total', value: number) => {
    setStats((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateDistribution = (star: number, percent: number) => {
    setStats((prev) => ({
      ...prev,
      distribution: prev.distribution.map((d) => (d.star === star ? { ...d, percent } : d)),
    }));
    markDirty();
  };

  // ---- Reviews (moderation queue, reuses the shared spa2Feedbacks dataset) ----
  const [reviews, setReviews] = useState<ReviewItem[]>(() =>
    spa2Feedbacks.map((f, i) => ({ ...f, id: i + 1 }))
  );
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewFilterStatus, setReviewFilterStatus] = useState<Spa2FeedbackStatus | 'all'>('all');
  const [viewReview, setViewReview] = useState<ReviewItem | null>(null);

  const filteredReviews = reviews.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(reviewSearch.toLowerCase());
    const matchStatus = reviewFilterStatus === 'all' || r.status === reviewFilterStatus;
    return matchSearch && matchStatus;
  });

  const reviewCounts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
  };
  const reviewAverage = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const setReviewStatus = (id: number, status: Spa2FeedbackStatus) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setViewReview((v) => (v?.id === id ? { ...v, status } : v));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ReviewBanner, image: { ...spa2ReviewBanner.image } });
    setAspects(spa2ReviewAspects.map((a) => ({ ...a })));
    setStats({
      ...spa2ReviewStats,
      distribution: spa2ReviewStats.distribution.map((d) => ({ ...d })),
    });
    setReviews(spa2Feedbacks.map((f, i) => ({ ...f, id: i + 1 })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('review.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.review')}
      publicPath={paths.spa2.review}
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
          label={t('review.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="aspects"
          label={t('review.aspects_section')}
          icon={<Iconify icon="solar:checklist-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stats"
          label={t('review.stats_section')}
          icon={<Iconify icon="solar:chart-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reviews"
          label="Quản lý đánh giá"
          icon={<Iconify icon="solar:chat-round-dots-bold-duotone" width={20} />}
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
            <SectionCard title={t('review.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('review.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('review.banner_image_help')}
                />
                <TextField
                  label={t('review.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('review.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('review.banner_subtitle')}
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

      {/* Aspects */}
      {tab === 'aspects' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('review.aspects_section')}
              icon="solar:checklist-bold-duotone"
              action={
                <Button
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={addAspect}
                >
                  {t('review.add_aspect_btn')}
                </Button>
              }
            >
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}
              >
                {t('common.drag_hint')}
              </Typography>
              <Spa2SortableGrid items={aspects} onReorder={reorderAspects}>
                <Stack spacing={1.5}>
                  {aspects.map((a, idx) => (
                    <Spa2SortableItem key={a.id} id={a.id}>
                      {(sortable) => (
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            border: `1px solid ${SPA2_CREAM_DARK}`,
                            bgcolor: 'background.paper',
                          }}
                        >
                          <Spa2DragHandle sortable={sortable} />
                          <TextField
                            size="small"
                            fullWidth
                            label={t('review.form_aspect_label')}
                            value={a.label}
                            onChange={(e) => updateAspect(idx, e.target.value)}
                          />
                          <Rating
                            value={a.sampleRating}
                            size="small"
                            precision={1}
                            onChange={(_, v) => updateAspectRating(idx, v ?? 0)}
                            sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                          />
                          <IconButton size="small" color="error" onClick={() => removeAspect(idx)}>
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
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Stack spacing={2.5}>
                {aspects.map((a) => (
                  <Stack key={a.id} direction="row" alignItems="center" spacing={2}>
                    <Typography sx={{ fontSize: 13.5, color: SPA2_INK, minWidth: 160 }}>
                      {a.label || 'Tiêu chí đánh giá'}
                    </Typography>
                    <Rating
                      value={a.sampleRating}
                      size="small"
                      readOnly
                      sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                    />
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Stats */}
      {tab === 'stats' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('review.stats_section')} icon="solar:chart-bold-duotone">
              <Stack spacing={2}>
                <TextField
                  type="number"
                  label={t('review.form_average')}
                  fullWidth
                  size="small"
                  inputProps={{ step: 0.1, min: 0, max: 5 }}
                  value={stats.average}
                  onChange={(e) => updateStatsField('average', Number(e.target.value))}
                />
                <TextField
                  type="number"
                  label={t('review.form_total')}
                  fullWidth
                  size="small"
                  value={stats.total}
                  onChange={(e) => updateStatsField('total', Number(e.target.value))}
                />
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK, mt: 1 }}>
                  {t('review.distribution_section')}
                </Typography>
                {stats.distribution.map((row) => (
                  <Stack key={row.star} direction="row" spacing={1.5} alignItems="center">
                    <Typography sx={{ fontSize: 12, minWidth: 40 }}>{row.star} sao</Typography>
                    <TextField
                      type="number"
                      size="small"
                      fullWidth
                      inputProps={{ min: 0, max: 100 }}
                      value={row.percent}
                      onChange={(e) => updateDistribution(row.star, Number(e.target.value))}
                    />
                    <Typography sx={{ fontSize: 12, minWidth: 20 }}>%</Typography>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Stack alignItems="center" spacing={0.5} sx={{ mb: 2.5 }}>
                <Typography variant="h2" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                  {stats.average}
                </Typography>
                <Rating
                  value={stats.average}
                  readOnly
                  precision={0.1}
                  sx={{ '& .MuiRating-icon': { color: '#EF9F27' } }}
                />
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                  Từ {stats.total.toLocaleString('vi-VN')} đánh giá
                </Typography>
              </Stack>
              <Stack spacing={1}>
                {stats.distribution.map((row) => (
                  <Stack key={row.star} direction="row" spacing={1.5} alignItems="center">
                    <Typography sx={{ fontSize: 12, color: 'text.secondary', minWidth: 12 }}>
                      {row.star}
                    </Typography>
                    <Iconify icon="solar:star-bold" width={12} sx={{ color: '#EF9F27' }} />
                    <LinearProgress
                      variant="determinate"
                      value={row.percent}
                      sx={{
                        flex: 1,
                        height: 7,
                        borderRadius: 99,
                        bgcolor: SPA2_CREAM_DARK,
                        '& .MuiLinearProgress-bar': { bgcolor: '#EF9F27' },
                      }}
                    />
                    <Typography sx={{ fontSize: 12, color: 'text.secondary', minWidth: 30 }}>
                      {row.percent}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Reviews moderation — light view into the shared spa2Feedbacks dataset
          (full management lives on the Feedbacks page). */}
      {tab === 'reviews' && (
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                  {reviewCounts.all}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                  Tổng số đánh giá
                </Typography>
              </Card>
            </Grid>
            <Grid xs={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center' }}>
                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="center">
                  <Typography variant="h4" sx={{ color: '#EF9F27', fontWeight: 700 }}>
                    {reviewAverage.toFixed(1)}
                  </Typography>
                  <Iconify icon="solar:star-bold" width={18} sx={{ color: '#EF9F27' }} />
                </Stack>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                  Điểm trung bình
                </Typography>
              </Card>
            </Grid>
            <Grid xs={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'warning.main', fontWeight: 700 }}>
                  {reviewCounts.pending}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>Chờ duyệt</Typography>
              </Card>
            </Grid>
            <Grid xs={6} md={3}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 700 }}>
                  {reviewCounts.approved}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>Đã duyệt</Typography>
              </Card>
            </Grid>
          </Grid>

          <Card>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ p: 2, pb: 0 }}>
              {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
                <Chip
                  key={s}
                  label={`${s === 'all' ? t('common.all') : REVIEW_STATUS_LABEL[s]} (${reviewCounts[s]})`}
                  variant={reviewFilterStatus === s ? 'filled' : 'outlined'}
                  color={s === 'all' ? 'default' : REVIEW_STATUS_COLOR[s]}
                  onClick={() => setReviewFilterStatus(s)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>

            <Box sx={{ p: 2 }}>
              <TextField
                placeholder="Tìm theo tên khách hàng..."
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
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
            </Box>

            <Stack spacing={0} sx={{ px: 2, pb: 2 }}>
              {filteredReviews.map((r) => (
                <Stack
                  key={r.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  onClick={() => setViewReview(r)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    mb: 1.5,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Avatar src={r.avatar} sx={{ width: 44, height: 44 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle2">{r.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {r.role}
                      </Typography>
                    </Stack>
                    <Rating value={r.rating} readOnly size="small" sx={{ my: 0.25 }} />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      sx={{ display: 'block' }}
                    >
                      {r.service} — {r.comment}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={REVIEW_STATUS_LABEL[r.status]}
                    color={REVIEW_STATUS_COLOR[r.status]}
                    variant="soft"
                  />
                </Stack>
              ))}
              {filteredReviews.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                  <Iconify icon="solar:chat-round-dots-linear" width={40} sx={{ mb: 1 }} />
                  <Typography>Không tìm thấy đánh giá nào.</Typography>
                </Box>
              )}
            </Stack>
          </Card>
        </Stack>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2ReviewPageView banner={banner} ratingAspects={aspects} stats={stats} />
        </Box>
      )}

      {/* Review detail preview + moderation actions */}
      <Dialog open={!!viewReview} onClose={() => setViewReview(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Chi tiết đánh giá</DialogTitle>
        <DialogContent dividers>
          {viewReview && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Trạng thái:
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    size="small"
                    label={REVIEW_STATUS_LABEL[viewReview.status]}
                    color={REVIEW_STATUS_COLOR[viewReview.status]}
                    variant="soft"
                  />
                </Box>
              </Box>
              <Divider />
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={viewReview.avatar} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="subtitle1">{viewReview.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {viewReview.role}
                  </Typography>
                  <Rating value={viewReview.rating} readOnly size="small" />
                </Box>
              </Stack>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Dịch vụ:
                </Typography>
                <Typography variant="body2">{viewReview.service}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Nhận xét:
                </Typography>
                <Typography variant="body2">{viewReview.comment}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {viewReview?.status !== 'rejected' && (
            <Button
              color="error"
              onClick={() => viewReview && setReviewStatus(viewReview.id, 'rejected')}
            >
              {t('common.reject')}
            </Button>
          )}
          {viewReview?.status !== 'pending' && (
            <Button onClick={() => viewReview && setReviewStatus(viewReview.id, 'pending')}>
              Đặt lại chờ duyệt
            </Button>
          )}
          {viewReview?.status !== 'approved' && (
            <Button
              variant="contained"
              color="success"
              onClick={() => viewReview && setReviewStatus(viewReview.id, 'approved')}
            >
              {t('common.approve')}
            </Button>
          )}
          <Button onClick={() => setViewReview(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
