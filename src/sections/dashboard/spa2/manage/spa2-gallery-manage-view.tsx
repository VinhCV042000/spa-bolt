import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { spa2GalleryBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2PageHero } from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_TEAL,
  spa2Gallery,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/gallery page (Spa2GalleryPageView)
// renders: banner + the masonry photo grid. spa2Gallery is a plain string[]
// of image URLs (the public page never shows a caption), so `caption` here is
// an admin-only label kept in local component state for easier browsing —
// it isn't part of the shared mock and has nothing to disconnect from.
// ─────────────────────────────────────────────────────────────────────────────

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
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

export function Spa2GalleryManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2GalleryBanner,
    image: { ...spa2GalleryBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'preview'>('banner');

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
    setBanner({ ...spa2GalleryBanner, image: { ...spa2GalleryBanner.image } });
    setDirty(false);
  };

  const [items, setItems] = useState<GalleryImage[]>(() =>
    spa2Gallery.map((url, i) => ({ id: i + 1, url, caption: `Ảnh ${i + 1}` }))
  );
  const [addUrl, setAddUrl] = useState('');
  const [addCaption, setAddCaption] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewUrl, setViewUrl] = useState<string | null>(null);

  const handleAdd = useCallback(() => {
    if (!addUrl.trim()) return;
    const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
    setItems((p) => [
      ...p,
      { id: newId, url: addUrl.trim(), caption: addCaption.trim() || `Ảnh ${newId}` },
    ]);
    setAddUrl('');
    setAddCaption('');
    setOpenAdd(false);
    setDirty(true);
  }, [addUrl, addCaption, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  return (
    <Spa2ManageShell
      title={t('gallery.page_title')}
      description="Banner và bộ sưu tập ảnh hiển thị trên trang Gallery công khai."
      breadcrumbLabel={t('nav.gallery')}
      publicPath={paths.spa2.gallery}
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
          label={t('gallery.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('gallery.list_section')}
          icon={<Iconify icon="solar:gallery-round-bold-duotone" width={20} />}
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
                  label={t('gallery.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('gallery.banner_image_help')}
                />
                <TextField
                  label={t('gallery.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('gallery.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('gallery.banner_subtitle')}
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

      {/* Bộ sưu tập ảnh */}
      {tab === 'list' && (
        <Card sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('gallery.count', { count: items.length })}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="solar:gallery-add-bold" />}
              onClick={() => setOpenAdd(true)}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('gallery.add_btn')}
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ position: 'relative', '&:hover .actions': { opacity: 1 } }}>
                  <CardMedia
                    component="img"
                    height={160}
                    image={item.url}
                    alt={item.caption}
                    sx={{ objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setViewUrl(item.url)}
                  />
                  <Box
                    className="actions"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 160,
                      bgcolor: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <Tooltip title={t('common.view')}>
                      <IconButton
                        sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' } }}
                        size="small"
                        onClick={() => setViewUrl(item.url)}
                      >
                        <Iconify icon="solar:eye-bold" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete')}>
                      <IconButton
                        sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' } }}
                        size="small"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" color="error.main" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {item.caption}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Live preview — mirrors Spa2GalleryPageView's hero + masonry grid */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />
          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container>
              <Grid container spacing={2}>
                {items.map((item, idx) => (
                  <Grid key={item.id} xs={12} sm={6} md={idx % 5 === 0 ? 8 : 4}>
                    <Box
                      sx={{
                        aspectRatio: idx % 5 === 0 ? '16/9' : '4/5',
                        borderRadius: 4,
                        backgroundImage: `url(${item.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform .3s',
                        cursor: 'pointer',
                        '&:hover': { transform: 'scale(1.02)' },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
      )}

      {/* Add dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('gallery.form_create')}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('gallery.form_url')}
              value={addUrl}
              onChange={(e) => setAddUrl(e.target.value)}
              fullWidth
              placeholder="https://images.unsplash.com/..."
            />
            <TextField
              label={t('gallery.form_caption')}
              value={addCaption}
              onChange={(e) => setAddCaption(e.target.value)}
              fullWidth
            />
            {addUrl && (
              <Box
                component="img"
                src={addUrl}
                alt="preview"
                sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 1 }}
                onError={(e: any) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!addUrl.trim()}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {t('gallery.add_btn')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View dialog */}
      <Dialog open={!!viewUrl} onClose={() => setViewUrl(null)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <Box
            component="img"
            src={viewUrl ?? ''}
            alt="full"
            sx={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewUrl(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('gallery.delete_title')}
        content={t('gallery.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
