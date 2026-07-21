import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
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
import { spa2FlashSale, spa2PromotionsBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2Countdown,
} from 'src/sections/spa2/view/spa2-content-pages';
import { SPA2_INK , SPA2_TEAL, SPA2_CREAM, spa2Promotions, SPA2_TEAL_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/promotions page (Spa2PromotionsPageView)
// renders: banner + the promotion campaigns list. Only `active` campaigns
// render publicly, so Tạm dừng here really hides the campaign from customers
// instead of being a dashboard-only cosmetic toggle. `endsAt` (optional ISO
// datetime) drives the flash-sale countdown shown for the first active promo.
// ─────────────────────────────────────────────────────────────────────────────

type Promotion = (typeof spa2Promotions)[number] & { id: number };

const EMPTY_FORM: Omit<Promotion, 'id'> = {
  title: '',
  period: '',
  price: '',
  save: '',
  image: '',
  active: true,
  endsAt: '',
};

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

function FlashSalePreviewCard({ form }: { form: typeof spa2FlashSale }) {
  if (!form.active) {
    return (
      <Typography variant="body2" color="text.secondary">
        Banner flash sale đang tắt — sẽ không hiển thị trên trang công khai.
      </Typography>
    );
  }
  return (
    <Card
      sx={{
        p: { xs: 4, md: 6 },
        borderRadius: 6,
        color: 'common.white',
        background: `linear-gradient(135deg, ${SPA2_TEAL_DARK} 0%, ${SPA2_INK} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
      >
        <Stack spacing={1.5}>
          <Chip
            label="FLASH SALE"
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', width: 'fit-content' }}
          />
          <Typography variant="h3">{form.title || '(Chưa đặt tên)'}</Typography>
          <Typography sx={{ opacity: 0.85 }}>{form.save}</Typography>
        </Stack>
        <Spa2Countdown endsAt={form.endsAt || '2026-12-31T23:59:59'} />
      </Stack>
    </Card>
  );
}

function PromotionPreviewCard({ form }: { form: Omit<Promotion, 'id'> }) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Grid container>
        <Grid xs={12} md={5}>
          <Box
            sx={{
              minHeight: 200,
              height: '100%',
              bgcolor: SPA2_CREAM,
              backgroundImage: form.image ? `url(${form.image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
        <Grid xs={12} md={7}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Chip label={form.period || '—'} sx={{ bgcolor: SPA2_CREAM, mb: 2 }} />
            <Typography variant="h5" sx={{ color: SPA2_INK, mb: 1 }}>
              {form.title || '(Chưa đặt tên)'}
            </Typography>
            <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, fontSize: 18, mb: 1 }}>
              {form.price}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>{form.save}</Typography>
            {form.endsAt && (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1 }}>
                  Kết thúc sau:
                </Typography>
                <Box
                  sx={{ display: 'inline-block', bgcolor: SPA2_TEAL_DARK, p: 1, borderRadius: 2 }}
                >
                  <Spa2Countdown endsAt={form.endsAt} />
                </Box>
              </Box>
            )}
            <Button
              disabled
              sx={{ borderRadius: 999, px: 3, bgcolor: SPA2_TEAL, color: 'white', opacity: 0.7 }}
            >
              Đăng ký ngay
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Spa2SoftCard>
  );
}

export function Spa2PromotionsManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2PromotionsBanner,
    image: { ...spa2PromotionsBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'flashsale' | 'list' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };

  const [flashSale, setFlashSale] = useState(() => ({ ...spa2FlashSale }));
  const updateFlashSale = (key: keyof typeof spa2FlashSale, value: string | boolean) => {
    setFlashSale((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2PromotionsBanner, image: { ...spa2PromotionsBanner.image } });
    setFlashSale({ ...spa2FlashSale });
    setDirty(false);
  };

  const [items, setItems] = useState<Promotion[]>(
    spa2Promotions.map((p, i) => ({ ...p, id: i + 1 }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Promotion, 'id'>>(EMPTY_FORM);

  const filtered = items.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  const activePromotions = items.filter((p) => p.active);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Promotion) => {
    setForm({
      title: item.title,
      period: item.period,
      price: item.price,
      save: item.save,
      image: item.image,
      active: item.active,
      endsAt: item.endsAt ?? '',
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = { ...form, endsAt: form.endsAt || undefined };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...next, id: newId }]);
    }
    setOpenForm(false);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const handleToggle = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
  }, []);

  return (
    <Spa2ManageShell
      title={t('promotions.page_title')}
      description="Banner, flash sale và danh sách chương trình khuyến mãi hiển thị trên trang Khuyến mãi công khai."
      breadcrumbLabel={t('nav.promotions')}
      publicPath={paths.spa2.promotions}
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
          label={t('promotions.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="flashsale"
          label={t('promotions.flashsale_section')}
          icon={<Iconify icon="solar:bolt-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('promotions.list_section')}
          icon={<Iconify icon="solar:tag-price-bold-duotone" width={20} />}
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
                  label={t('promotions.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('promotions.banner_image_help')}
                />
                <TextField
                  label={t('promotions.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('promotions.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('promotions.banner_subtitle')}
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

      {/* Flash sale - status first, left: edit, right: live preview */}
      {tab === 'flashsale' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <TextField
                  select
                  label={t('common.status')}
                  value={flashSale.active ? 'active' : 'inactive'}
                  onChange={(e) => updateFlashSale('active', e.target.value === 'active')}
                  fullWidth
                >
                  <MenuItem value="active">{t('promotions.status_running')}</MenuItem>
                  <MenuItem value="inactive">{t('promotions.status_paused')}</MenuItem>
                </TextField>
                <TextField
                  label={t('promotions.form_title')}
                  value={flashSale.title}
                  onChange={(e) => updateFlashSale('title', e.target.value)}
                  fullWidth
                />
                <TextField
                  label={t('promotions.form_save')}
                  value={flashSale.save}
                  onChange={(e) => updateFlashSale('save', e.target.value)}
                  fullWidth
                />
                <TextField
                  label={t('promotions.form_ends_at')}
                  type="datetime-local"
                  value={flashSale.endsAt}
                  onChange={(e) => updateFlashSale('endsAt', e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <FlashSalePreviewCard form={flashSale} />
          </Grid>
        </Grid>
      )}

      {/* Danh sách khuyến mãi */}
      {tab === 'list' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <TextField
              placeholder={t('promotions.search_placeholder')}
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
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('promotions.add_btn')}
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('promotions.col_campaign')}</TableCell>
                  <TableCell>{t('promotions.col_period')}</TableCell>
                  <TableCell>{t('promotions.col_price_save')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar src={item.image} variant="rounded" sx={{ width: 56, height: 40 }} />
                        <Typography variant="subtitle2">{item.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {item.price}
                      </Typography>
                      <Typography variant="caption" color="success.main">
                        {item.save}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.active ? t('promotions.status_running') : t('promotions.status_paused')}
                        color={item.active ? 'success' : 'default'}
                        variant="soft"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title={item.active ? t('common.disable') : t('common.enable')}>
                          <IconButton size="small" onClick={() => handleToggle(item.id)}>
                            <Iconify
                              icon={item.active ? 'solar:pause-bold' : 'solar:play-bold'}
                              color={item.active ? 'warning.main' : 'success.main'}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openEdit(item)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}>
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

      {/* Live preview of the whole page — mirrors Spa2PromotionsPageView exactly:
          hero + the dedicated flash-sale banner (if active) + campaign list. */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />

          {flashSale.active && (
            <Box sx={{ py: { xs: 6, md: 8 } }}>
              <Container>
                <FlashSalePreviewCard form={flashSale} />
              </Container>
            </Box>
          )}

          <Box sx={{ py: { xs: 4, md: 8 } }}>
            <Container>
              {activePromotions.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có chương trình khuyến mãi nào đang chạy.
                </Typography>
              ) : (
                <Stack spacing={4}>
                  {activePromotions.map((p, idx) => (
                    <Spa2SoftCard key={p.id} sx={{ p: 0, overflow: 'hidden' }}>
                      <Grid container>
                        <Grid xs={12} md={5} sx={{ order: { md: idx % 2 ? 2 : 1 } }}>
                          <Box
                            sx={{
                              minHeight: 260,
                              height: '100%',
                              backgroundImage: `url(${p.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                        </Grid>
                        <Grid xs={12} md={7} sx={{ order: { md: idx % 2 ? 1 : 2 } }}>
                          <Box sx={{ p: { xs: 3, md: 5 } }}>
                            <Chip label={p.period} sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, mb: 2 }} />
                            <Typography variant="h4" sx={{ color: SPA2_INK, mb: 1.5 }}>
                              {p.title}
                            </Typography>
                            <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, fontSize: 22, mb: 1 }}>
                              {p.price}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 2 }}>{p.save}</Typography>
                            {p.endsAt && (
                              <Box sx={{ mb: 3 }}>
                                <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
                                  Kết thúc sau:
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'inline-block',
                                    bgcolor: SPA2_TEAL_DARK,
                                    p: 1.5,
                                    borderRadius: 2,
                                  }}
                                >
                                  <Spa2Countdown endsAt={p.endsAt} />
                                </Box>
                              </Box>
                            )}
                            <Button
                              disabled
                              sx={{
                                borderRadius: 999,
                                px: 4,
                                bgcolor: SPA2_TEAL,
                                color: 'white',
                                opacity: 0.7,
                              }}
                            >
                              Đăng ký ngay
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Spa2SoftCard>
                  ))}
                </Stack>
              )}
            </Container>
          </Box>
        </Box>
      )}

      {/* Create / Edit dialog - left: form (status first), right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="xl" fullWidth>
        <DialogTitle>
          {editId !== null ? t('promotions.form_edit') : t('promotions.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={5}>
              <Stack spacing={2}>
                <TextField
                  select
                  label={t('common.status')}
                  value={form.active ? 'active' : 'inactive'}
                  onChange={(e) => setForm((p) => ({ ...p, active: e.target.value === 'active' }))}
                  fullWidth
                >
                  <MenuItem value="active">{t('promotions.status_running')}</MenuItem>
                  <MenuItem value="inactive">{t('promotions.status_paused')}</MenuItem>
                </TextField>
                <TextField
                  label={t('promotions.form_title')}
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('promotions.form_period')}
                  value={form.period}
                  onChange={(e) => setForm((p) => ({ ...p, period: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('promotions.form_price')}
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('promotions.form_save')}
                    value={form.save}
                    onChange={(e) => setForm((p) => ({ ...p, save: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('promotions.form_ends_at')}
                  type="datetime-local"
                  value={form.endsAt ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, endsAt: e.target.value }))}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <Spa2ImageField
                  label={t('common.image_url')}
                  value={{ url: form.image, focalX: 50, focalY: 50, zoom: 100 }}
                  onChange={(img) => setForm((p) => ({ ...p, image: img.url }))}
                  height={180}
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={7}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <PromotionPreviewCard form={form} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('promotions.form_edit') : t('promotions.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('promotions.delete_title')}
        content={t('promotions.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
