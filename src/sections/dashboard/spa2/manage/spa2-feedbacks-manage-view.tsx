import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import { uuidv4 } from 'src/utils/uuidv4';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import { Table } from '@mui/material';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { spa2VideoReviews, spa2FeedbackBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { SPA2_INK , SPA2_TEAL, SPA2_CREAM, spa2Feedbacks, SPA2_TEAL_DARK } from 'src/sections/spa2/spa2-pages-data';
import {
  Spa2Cta,
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages the banner + moderation queue behind the public /spa2/feedback page
// (Spa2FeedbackPageView): only feedback with status 'approved' renders there,
// so Duyệt/Từ chối here directly controls what customers see. The video
// review thumbnails are read-only content sourced from src/_mock/_spa2.
// ─────────────────────────────────────────────────────────────────────────────

type FeedbackStatus = 'pending' | 'approved' | 'rejected';

type Feedback = (typeof spa2Feedbacks)[number] & { id: number };

type VideoItem = (typeof spa2VideoReviews)[number] & { id: string };

const STATUS_COLOR: Record<FeedbackStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_VIDEO: Omit<VideoItem, 'id'> = { name: '', service: '', thumbnail: '', duration: '' };

// Mirrors the public video-review card exactly (thumbnail + play overlay +
// duration chip + name/service) — reused both as the per-card inline preview
// in the "videos" tab and in the "Xem trước" full-page preview.
function VideoPreviewCard({ form }: { form: Omit<VideoItem, 'id'> }) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden', cursor: 'pointer' }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 220,
            bgcolor: SPA2_CREAM,
            backgroundImage: form.thumbnail ? `url(${form.thumbnail})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(31,42,40,0.25)',
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
        {form.duration && (
          <Chip
            label={form.duration}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
            }}
          />
        )}
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {form.name || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{form.service}</Typography>
      </Box>
    </Spa2SoftCard>
  );
}

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

export function Spa2FeedbacksManageView() {
  const { t } = useTranslate('spa2-manage');
  const statusLabel = (s: FeedbackStatus) => t(`feedbacks.status_${s}`);

  const [banner, setBanner] = useState(() => ({
    ...spa2FeedbackBanner,
    image: { ...spa2FeedbackBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'videos' | 'list' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2FeedbackBanner, image: { ...spa2FeedbackBanner.image } });
    setVideos(spa2VideoReviews.map((v) => withId({ ...v })));
    setDirty(false);
  };

  const [videos, setVideos] = useState<VideoItem[]>(() => spa2VideoReviews.map((v) => withId({ ...v })));
  const addVideo = () => {
    setVideos((prev) => [...prev, withId({ ...EMPTY_VIDEO })]);
    setDirty(true);
  };
  const updateVideo = (id: string, key: keyof Omit<VideoItem, 'id'>, value: string) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, [key]: value } : v)));
    setDirty(true);
  };
  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    setDirty(true);
  };

  const [items, setItems] = useState<Feedback[]>(
    spa2Feedbacks.map((f, i) => ({ ...f, id: i + 1 }))
  );
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FeedbackStatus | 'all'>('all');
  const [viewItem, setViewItem] = useState<Feedback | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const approvedFeedbacks = items.filter((f) => f.status === 'approved');

  const handleApprove = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status: 'approved' } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status: 'approved' } : v));
  }, []);

  const handleReject = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status: 'rejected' } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status: 'rejected' } : v));
  }, []);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const counts = {
    all: items.length,
    pending: items.filter((f) => f.status === 'pending').length,
    approved: items.filter((f) => f.status === 'approved').length,
    rejected: items.filter((f) => f.status === 'rejected').length,
  };

  return (
    <Spa2ManageShell
      title={t('feedbacks.page_title')}
      description="Banner và hàng chờ duyệt đánh giá hiển thị trên trang Đánh giá công khai."
      breadcrumbLabel={t('nav.feedbacks')}
      publicPath={paths.spa2.feedback}
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
          label={t('feedbacks.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="videos"
          label={t('feedbacks.videos_section')}
          icon={<Iconify icon="solar:videocamera-record-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('feedbacks.list_section')}
          icon={<Iconify icon="solar:chat-round-line-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('feedbacks.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('feedbacks.banner_image_help')}
                />
                <TextField
                  label={t('feedbacks.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('feedbacks.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('feedbacks.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <Spa2PageHero
                image={banner.image.url}
                imageStyle={banner.image}
                eyebrow={banner.eyebrow}
                title={banner.title}
                subtitle={banner.subtitle}
              />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Video cảm nhận khách hàng */}
      {tab === 'videos' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('feedbacks.videos_section')} ({videos.length})
            </Typography>
            <Button
              size="small"
              onClick={addVideo}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('feedbacks.video_add')}
            </Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2.5}>
            {videos.map((v) => (
              <Grid key={v.id} xs={12} md={6}>
                <Card
                  sx={{ p: 2, borderRadius: 3, bgcolor: SPA2_CREAM, border: `1px solid ${SPA2_CREAM}` }}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="flex-end">
                      <IconButton size="small" color="error" onClick={() => removeVideo(v.id)}>
                        <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                      </IconButton>
                    </Stack>
                    <Spa2ImageField
                      label={t('feedbacks.video_thumbnail')}
                      value={{ url: v.thumbnail, focalX: 50, focalY: 50, zoom: 100 }}
                      onChange={(img) => updateVideo(v.id, 'thumbnail', img.url)}
                      height={160}
                    />
                    <Stack direction="row" spacing={2}>
                      <TextField
                        size="small"
                        label={t('feedbacks.video_name')}
                        value={v.name}
                        onChange={(e) => updateVideo(v.id, 'name', e.target.value)}
                        fullWidth
                      />
                      <TextField
                        size="small"
                        label={t('feedbacks.video_service')}
                        value={v.service}
                        onChange={(e) => updateVideo(v.id, 'service', e.target.value)}
                        fullWidth
                      />
                    </Stack>
                    <TextField
                      size="small"
                      label={t('feedbacks.video_duration')}
                      value={v.duration}
                      onChange={(e) => updateVideo(v.id, 'duration', e.target.value)}
                      helperText={t('feedbacks.video_duration_help')}
                    />
                  </Stack>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    {t('common.preview_btn')}
                  </Typography>
                  <VideoPreviewCard form={v} />
                </Card>
              </Grid>
            ))}
            {videos.length === 0 && (
              <Grid xs={12}>
                <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                  <Iconify icon="solar:videocamera-record-linear" width={40} sx={{ mb: 1 }} />
                  <Typography>{t('feedbacks.videos_empty')}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      )}

      {/* Danh sách đánh giá */}
      {tab === 'list' && (
        <Card>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ p: 2, pb: 0 }}>
            {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
              <Chip
                key={s}
                label={`${s === 'all' ? t('common.all') : statusLabel(s)} (${counts[s]})`}
                variant={filterStatus === s ? 'filled' : 'outlined'}
                color={s === 'all' ? 'default' : STATUS_COLOR[s]}
                onClick={() => setFilterStatus(s)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>

          <Box sx={{ p: 2 }}>
            <TextField
              placeholder={t('feedbacks.search_placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('feedbacks.col_customer')}</TableCell>
                  <TableCell>{t('feedbacks.col_service')}</TableCell>
                  <TableCell>{t('feedbacks.col_rating')}</TableCell>
                  <TableCell sx={{ maxWidth: 240 }}>{t('feedbacks.col_content')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar src={item.avatar} sx={{ width: 36, height: 36 }} />
                        <Box>
                          <Typography variant="subtitle2">{item.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.role}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>
                      <Rating value={item.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 240 }}>
                      <Typography variant="body2" noWrap>
                        {item.comment}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={statusLabel(item.status)}
                        color={STATUS_COLOR[item.status]}
                        variant="soft"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        {item.status === 'pending' && (
                          <>
                            <Tooltip title={t('common.approve')}>
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleApprove(item.id)}
                              >
                                <Iconify icon="solar:check-circle-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('common.reject')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleReject(item.id)}
                              >
                                <Iconify icon="solar:close-circle-bold" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {item.status === 'rejected' && (
                          <Tooltip title={t('common.approve')}>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleApprove(item.id)}
                            >
                              <Iconify icon="solar:restart-bold" />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title={t('common.view')}>
                          <IconButton size="small" onClick={() => setViewItem(item)}>
                            <Iconify icon="solar:eye-bold" />
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
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Live preview of the whole page — mirrors Spa2FeedbackPageView exactly:
          hero + read-only video reviews + only approved feedback. */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />

          <Box sx={{ py: { xs: 8, md: 10 } }}>
            <Container>
              <Spa2SectionTitle eyebrow="Video" title="Cảm nhận qua video" />
              <Grid container spacing={3}>
                {videos.map((v) => (
                  <Grid key={v.id} xs={12} sm={6} md={4}>
                    <VideoPreviewCard form={v} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Box sx={{ pb: { xs: 8, md: 12 } }}>
            <Container>
              <Spa2SectionTitle eyebrow="Đánh giá" title="Tất cả phản hồi" />
              {approvedFeedbacks.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có đánh giá nào được duyệt.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {approvedFeedbacks.map((f) => (
                    <Grid key={f.id} xs={12} sm={6} md={4}>
                      <Spa2SoftCard>
                        <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                        <Typography
                          sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}
                        >
                          &ldquo;{f.comment}&rdquo;
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={f.avatar} />
                          <Stack>
                            <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
                              {f.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                              {f.role} · {f.service}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Spa2SoftCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>

          <Spa2Cta />
        </Box>
      )}

      {/* View detail */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('feedbacks.detail_title')}</DialogTitle>
        <DialogContent dividers>
          {viewItem && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('feedbacks.detail_status')}:
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    size="small"
                    label={statusLabel(viewItem.status)}
                    color={STATUS_COLOR[viewItem.status]}
                    variant="soft"
                  />
                </Box>
              </Box>
              <Divider />
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={viewItem.avatar} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="subtitle1">{viewItem.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {viewItem.role}
                  </Typography>
                  <Rating value={viewItem.rating} readOnly size="small" />
                </Box>
              </Stack>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('feedbacks.detail_service')}:
                </Typography>
                <Typography variant="body2">{viewItem.service}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {t('feedbacks.detail_comment')}:
                </Typography>
                <Typography variant="body2">{viewItem.comment}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {viewItem?.status === 'pending' && (
            <>
              <Button
                color="error"
                onClick={() => {
                  handleReject(viewItem.id);
                  setViewItem(null);
                }}
              >
                {t('common.reject')}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleApprove(viewItem.id);
                  setViewItem(null);
                }}
              >
                {t('common.approve')}
              </Button>
            </>
          )}
          <Button onClick={() => setViewItem(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('feedbacks.delete_title')}
        content={t('feedbacks.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
