import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { spa2Gallery } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2GalleryManageView() {
  const { t } = useTranslate('spa2-manage');
  const [items, setItems] = useState<GalleryImage[]>(
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
  }, [addUrl, addCaption, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={t('gallery.page_title')}
        links={[
          { name: t('common.dashboard'), href: paths.dashboard.root },
          { name: t('common.spa2'), href: paths.dashboard.spa2.root },
          { name: t('nav.gallery') },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:gallery-add-bold" />}
            onClick={() => setOpenAdd(true)}
          >
            {t('gallery.add_btn')}
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {t('gallery.count', { count: items.length })}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ position: 'relative', '&:hover .actions': { opacity: 1 } }}>
              <CardMedia
                component="img"
                height={180}
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
                  bottom: 0,
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
          <Button variant="contained" onClick={handleAdd} disabled={!addUrl.trim()}>
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
    </DashboardContent>
  );
}
