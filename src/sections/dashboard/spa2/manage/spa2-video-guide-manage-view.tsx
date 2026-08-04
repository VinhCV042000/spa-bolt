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

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2VideoGuidePageView } from 'src/sections/spa2/view/spa2-content-pages8';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  spa2VideoItems,
  SPA2_CREAM_DARK,
  type Spa2VideoItem,
  spa2VideoGuideBanner,
  type Spa2VideoGuideBanner,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages8.tsx's
// Spa2VideoGuidePageView renders on the public /spa2/video-guide page: the
// dark hero banner (eyebrow/title/subtitle) and the video grid (thumb/
// duration/category+icon/title/views) - read from and written back in the
// same shape as the spa2-pages-data barrel (which re-exports the underlying
// src/_mock/_spa2 mock data), the single source of truth shared with the
// public view. The category filter chips and the video-player dialog on the
// public page are purely client-derived interactive demo state, plus the
// trailing GradientCta is intentionally hardcoded there and not editable
// here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_VIDEO: Omit<Spa2VideoItem, 'id'> = {
  title: '',
  duration: '',
  category: '',
  views: '',
  thumb: '',
  icon: 'solar:play-bold',
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

// Mirrors the dark hero section rendered by Spa2VideoGuidePageView on the
// public page (see PageHero with dark=true in spa2-content-pages8.tsx) -
// eyebrow/title/subtitle over an ink-dark background.
function BannerPreview({ banner }: { banner: Spa2VideoGuideBanner }) {
  return (
    <Box
      sx={{
        bgcolor: SPA2_INK,
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors one video card exactly as rendered in the public "Thư viện video"
// grid (see Spa2VideoGuidePageView): thumb image with play-button overlay +
// duration chip, category chip with icon, title and views count.
function VideoPreviewCard({ video }: { video: Omit<Spa2VideoItem, 'id'> }) {
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 160,
            backgroundImage: `url(${video.thumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(31,42,40,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:play-bold" width={22} sx={{ color: SPA2_TEAL }} />
          </Box>
        </Box>
        <Chip
          label={video.duration || '0:00'}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            bgcolor: 'rgba(0,0,0,0.75)',
            color: 'white',
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Chip
          label={video.category || '—'}
          size="small"
          icon={<Iconify icon={video.icon || 'solar:play-bold'} width={13} />}
          sx={{
            mb: 1,
            bgcolor: SPA2_CREAM,
            color: SPA2_TEAL_DARK,
            '& .MuiChip-icon': { color: SPA2_TEAL },
          }}
        />
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, lineHeight: 1.4, mb: 1 }}>
          {video.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Stack direction="row" spacing={0.75} alignItems="center">
          <Iconify icon="solar:eye-bold" width={12} sx={{ color: 'text.disabled' }} />
          <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
            {video.views || '0'} lượt xem
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2VideoGuideManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2VideoGuideBanner>(() => ({ ...spa2VideoGuideBanner }));
  const [videos, setVideos] = useState<Spa2VideoItem[]>(() =>
    spa2VideoItems.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'videos' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Videos CRUD ----
  const [videoDialog, setVideoDialog] = useState(false);
  const [videoEditId, setVideoEditId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState<Omit<Spa2VideoItem, 'id'>>(EMPTY_VIDEO);
  const [videoDeleteId, setVideoDeleteId] = useState<string | null>(null);

  const openCreateVideo = () => {
    setVideoForm(EMPTY_VIDEO);
    setVideoEditId(null);
    setVideoDialog(true);
  };
  const openEditVideo = (item: Spa2VideoItem) => {
    const { id, ...rest } = item;
    setVideoForm({ ...rest });
    setVideoEditId(id);
    setVideoDialog(true);
  };
  const submitVideo = () => {
    const next: Omit<Spa2VideoItem, 'id'> = { ...videoForm };
    if (videoEditId) {
      setVideos((prev) =>
        prev.map((item) => (item.id === videoEditId ? { ...item, ...next } : item))
      );
    } else {
      setVideos((prev) => [...prev, withId(next)]);
    }
    setVideoDialog(false);
    markDirty();
  };
  const confirmDeleteVideo = () => {
    setVideos((prev) => prev.filter((item) => item.id !== videoDeleteId));
    setVideoDeleteId(null);
    markDirty();
  };
  const reorderVideos = (next: Spa2VideoItem[]) => {
    setVideos(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2VideoGuideBanner });
    setVideos(spa2VideoItems.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('video_guide.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.video_guide')}
      publicPath={paths.spa2.videoGuide}
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
          label={t('video_guide.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="videos"
          label={t('video_guide.videos_section')}
          icon={<Iconify icon="solar:videocamera-record-bold-duotone" width={20} />}
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
              title={t('video_guide.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('video_guide.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('video_guide.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('video_guide.banner_subtitle')}
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

      {/* Videos */}
      {tab === 'videos' && (
        <SectionCard
          title={t('video_guide.videos_section')}
          icon="solar:videocamera-record-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateVideo}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('video_guide.add_video_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('video_guide.drag_hint')}
          </Typography>
          {videos.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('video_guide.no_videos')}
            </Typography>
          )}
          <Spa2SortableGrid items={videos} onReorder={reorderVideos}>
            <Grid container spacing={2}>
              {videos.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <VideoPreviewCard video={item} />
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
                            onClick={() => openEditVideo(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setVideoDeleteId(item.id)}
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

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2VideoGuidePageView banner={banner} videos={videos} />
        </Box>
      )}

      {/* Video add/edit dialog */}
      <Dialog open={videoDialog} onClose={() => setVideoDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {videoEditId ? t('common.edit') : t('video_guide.add_video_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('video_guide.form_title')}
                  value={videoForm.title}
                  onChange={(e) => setVideoForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('video_guide.form_duration')}
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm((p) => ({ ...p, duration: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('video_guide.form_views')}
                    value={videoForm.views}
                    onChange={(e) => setVideoForm((p) => ({ ...p, views: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('video_guide.form_category')}
                  value={videoForm.category}
                  onChange={(e) => setVideoForm((p) => ({ ...p, category: e.target.value }))}
                  fullWidth
                />
                <Spa2SimpleImageField
                  label={t('video_guide.form_thumb')}
                  value={videoForm.thumb}
                  onChange={(url) => setVideoForm((p) => ({ ...p, thumb: url }))}
                />
                <TextField
                  label={t('video_guide.form_icon')}
                  value={videoForm.icon}
                  onChange={(e) => setVideoForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  helperText={t('video_guide.form_icon_helper')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <VideoPreviewCard video={videoForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitVideo}
            disabled={!videoForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {videoEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!videoDeleteId}
        onClose={() => setVideoDeleteId(null)}
        title={t('video_guide.video_delete_title')}
        content={t('video_guide.video_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteVideo}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
