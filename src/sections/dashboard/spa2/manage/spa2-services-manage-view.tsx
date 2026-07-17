import type { ReactNode } from 'react';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import {
  SPA2_SERVICES,
  spa2ServicesBanner,
  type Spa2ServiceItem,
  type Spa2ServiceStatus,
  SPA2_SERVICE_CATEGORIES,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  SPA2_INK,
  SPA2_SAGE,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';
import { Spa2Cta, Spa2PageHero, Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block src/sections/spa2/view/spa2-content-pages.tsx's
// Spa2ServicesPageView renders on the public /spa2/services page: the page
// banner and the service catalogue itself — read from and written back in
// the same shape as src/_mock/_spa2 (the single source of truth shared with
// the public view).
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = SPA2_SERVICE_CATEGORIES.filter((c) => c.value !== 'all');
const PER_PAGE = 6;

const STATUS_COLOR: Record<Spa2ServiceStatus, 'success' | 'default' | 'warning'> = {
  'Đang hiển thị': 'success',
  'Bản nháp': 'default',
  Ẩn: 'warning',
};

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_FORM: Spa2ServiceItem = {
  id: '',
  slug: '',
  category: 'massage',
  name: '',
  short: '',
  duration: '',
  price: 0,
  icon: 'solar:hand-stars-bold-duotone',
  image: '',
  benefits: [],
  status: 'Đang hiển thị',
  steps: [],
  beforeAfters: [],
  feedbacks: [],
  faqs: [],
  gallery: [],
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

function ServicePreviewCard({
  name,
  short,
  icon,
  image,
  duration,
  price,
}: {
  name: string;
  short: string;
  icon: string;
  image: string;
  duration: string;
  price: number;
}) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          height: 200,
          bgcolor: SPA2_CREAM_DARK,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <Iconify icon={icon || 'solar:hand-stars-bold-duotone'} sx={{ color: SPA2_TEAL }} width={28} />
          <Typography variant="h6" sx={{ color: SPA2_INK }}>
            {name || 'Tên dịch vụ'}
          </Typography>
        </Stack>
        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          {short || 'Mô tả ngắn của dịch vụ…'}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            size="small"
            label={duration || '—'}
            sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
          />
          <Chip
            size="small"
            label={formatVND(price)}
            sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
          />
        </Stack>
        <Button disabled endIcon={<Iconify icon="solar:arrow-right-linear" />} sx={{ p: 0 }}>
          Xem chi tiết
        </Button>
      </Box>
    </Spa2SoftCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2ServicesManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2ServicesBanner,
    image: { ...spa2ServicesBanner.image },
  }));
  const [items, setItems] = useState<Spa2ServiceItem[]>([...SPA2_SERVICES]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Spa2ServiceItem>(EMPTY_FORM);
  const [benefitsText, setBenefitsText] = useState('');

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'preview'>('banner');
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

  const filtered = useMemo(() => {
    let list = items.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'all') list = list.filter((s) => s.category === category);
    return list;
  }, [items, search, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleChange =
    (field: keyof Spa2ServiceItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = useCallback(() => {
    setForm(EMPTY_FORM);
    setBenefitsText('');
    setEditSlug(null);
    setOpenForm(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const benefits = benefitsText
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-');
    const newItem: Spa2ServiceItem = { ...form, slug, benefits };
    if (editSlug) {
      setItems((p) => p.map((s) => (s.slug === editSlug ? newItem : s)));
    } else {
      setItems((p) => [...p, newItem]);
    }
    setOpenForm(false);
    markDirty();
  }, [form, editSlug, benefitsText]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((s) => s.slug !== deleteSlug));
    setDeleteSlug(null);
    markDirty();
  }, [deleteSlug]);

  const handleToggle = useCallback((slug: string) => {
    setItems((p) =>
      p.map((s) =>
        s.slug === slug
          ? { ...s, status: s.status === 'Đang hiển thị' ? 'Ẩn' : 'Đang hiển thị' }
          : s
      )
    );
    markDirty();
  }, []);

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ServicesBanner, image: { ...spa2ServicesBanner.image } });
    setItems([...SPA2_SERVICES]);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('services.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.services')}
      publicPath={paths.spa2.services}
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
          label={t('services.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('services.list_section')}
          icon={<Iconify icon="solar:hand-stars-bold-duotone" width={20} />}
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
        <SectionCard title={t('services.banner_section')} icon="solar:gallery-wide-bold-duotone">
          <Grid container spacing={3}>
            <Grid xs={12} md={5}>
              <Spa2ImageField
                label={t('services.banner_image')}
                value={banner.image}
                onChange={updateBannerImage}
                height={220}
                helperText={t('services.banner_image_help')}
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('services.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('services.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('services.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Grid>
          </Grid>
        </SectionCard>
      )}

      {/* Danh sách dịch vụ */}
      {tab === 'list' && (
        <>
          {/* Filter bar */}
          <Card
            sx={{
              p: 2.5,
              mb: 4,
              borderRadius: 4,
              bgcolor: SPA2_CREAM,
              border: `1px solid ${SPA2_CREAM_DARK}`,
              boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder={t('services.search_placeholder')}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Danh mục"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  {SPA2_SERVICE_CATEGORIES.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Card>

          <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreate}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('services.add_btn')}
            </Button>
          </Stack>

          {/* Service cards grid (matches public view, uniform sizing) */}
          <Grid container spacing={4}>
            {paginated.map((item) => (
              <Grid key={item.slug} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    p: 0,
                    overflow: 'hidden',
                    borderRadius: 4,
                    bgcolor: 'common.white',
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all .25s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(46,139,122,0.15)',
                      borderColor: SPA2_TEAL_LIGHT,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        height: 220,
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Chip
                      label={
                        CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category
                      }
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        color: SPA2_TEAL_DARK,
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={item.status}
                      size="small"
                      color={STATUS_COLOR[item.status]}
                      sx={{ position: 'absolute', top: 12, right: 12 }}
                    />
                  </Box>

                  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                      <Iconify icon={item.icon} sx={{ color: SPA2_TEAL }} width={28} />
                      <Typography variant="h6" sx={{ color: SPA2_INK }}>
                        {item.name}
                      </Typography>
                    </Stack>
                    <Typography sx={{ color: 'text.secondary', mb: 2, minHeight: 44, flexGrow: 1 }}>
                      {item.short}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        size="small"
                        label={item.duration}
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                      />
                      <Chip
                        size="small"
                        label={formatVND(item.price)}
                        sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1} justifyContent="space-between">
                      <Button
                        component={RouterLink}
                        href={paths.dashboard.spa2.serviceDetails(item.slug)}
                        size="small"
                        startIcon={<Iconify icon="solar:pen-bold" />}
                        sx={{ color: SPA2_TEAL_DARK, p: 0, '&:hover': { bgcolor: 'transparent' } }}
                      >
                        Chỉnh sửa
                      </Button>
                      <Stack direction="row" spacing={0.5}>
                        <Tooltip title={item.status === 'Đang hiển thị' ? 'Ẩn' : 'Hiện'}>
                          <IconButton size="small" onClick={() => handleToggle(item.slug)}>
                            <Iconify
                              icon={
                                item.status === 'Đang hiển thị'
                                  ? 'solar:eye-closed-bold'
                                  : 'solar:eye-bold'
                              }
                              color={
                                item.status === 'Đang hiển thị' ? 'warning.main' : 'success.main'
                              }
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDeleteSlug(item.slug)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}

            {filtered.length === 0 && (
              <Grid xs={12}>
                <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 10 }}>
                  <Iconify icon="solar:leaf-linear" width={48} sx={{ color: SPA2_SAGE, mb: 2 }} />
                  <Typography>{t('common.no_data')}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          {pageCount > 1 && (
            <Stack alignItems="center" sx={{ mt: 4 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, v) => setPage(v)}
                shape="rounded"
                sx={{
                  '& .Mui-selected': {
                    bgcolor: `${SPA2_TEAL} !important`,
                    color: 'white',
                  },
                }}
              />
            </Stack>
          )}
        </>
      )}

      {/* Full-page live preview — pixel-for-pixel same layout/order as the public /spa2/services page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Box sx={{ bgcolor: 'background.default' }}>
            <Spa2PageHero
              image={banner.image.url}
              imageStyle={banner.image}
              eyebrow={banner.eyebrow}
              title={banner.title}
              subtitle={banner.subtitle}
            />
            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Container>
                <Grid container spacing={4}>
                  {paginated.map((item) => (
                    <Grid key={item.slug} xs={12} sm={6} md={4}>
                      <ServicePreviewCard
                        name={item.name}
                        short={item.short}
                        icon={item.icon}
                        image={item.image}
                        duration={item.duration}
                        price={item.price}
                      />
                    </Grid>
                  ))}
                  {filtered.length === 0 && (
                    <Grid xs={12}>
                      <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 8 }}>
                        Không tìm thấy dịch vụ phù hợp.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Container>
            </Box>
            <Spa2Cta />
          </Box>
        </Box>
      )}

      {/* Form dialog — left: edit, right: live preview of the card being created */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: SPA2_CREAM, color: SPA2_INK, fontWeight: 700 }}>
          {editSlug ? t('services.form_edit') : t('services.add_btn')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label="Trạng thái"
                  select
                  value={form.status}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, status: e.target.value as Spa2ServiceStatus }))
                  }
                  fullWidth
                >
                  <MenuItem value="Đang hiển thị">Đang hiển thị</MenuItem>
                  <MenuItem value="Bản nháp">Bản nháp</MenuItem>
                  <MenuItem value="Ẩn">Ẩn</MenuItem>
                </TextField>
                <TextField
                  label={t('services.form_name')}
                  value={form.name}
                  onChange={handleChange('name')}
                  fullWidth
                />
                <TextField
                  select
                  label={t('services.form_category')}
                  value={form.category}
                  onChange={handleChange('category')}
                  fullWidth
                >
                  {CATEGORIES.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label={t('services.form_short')}
                  value={form.short}
                  onChange={handleChange('short')}
                  fullWidth
                  multiline
                  rows={2}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('services.form_duration')}
                    value={form.duration}
                    onChange={handleChange('duration')}
                    fullWidth
                  />
                  <TextField
                    label={t('services.col_price')}
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('common.image_url')}
                  value={form.image}
                  onChange={handleChange('image')}
                  fullWidth
                />
                <TextField
                  label="Icon (solar:*)"
                  value={form.icon}
                  onChange={handleChange('icon')}
                  fullWidth
                />
                <TextField
                  label={t('services.form_benefits')}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ServicePreviewCard
                  name={form.name}
                  short={form.short}
                  icon={form.icon}
                  image={form.image}
                  duration={form.duration}
                  price={form.price}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenForm(false)} sx={{ borderRadius: 999 }}>
            {t('common.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name}
            sx={{ borderRadius: 999, bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editSlug ? t('services.form_edit') : t('services.add_btn')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteSlug}
        onClose={() => setDeleteSlug(null)}
        title={t('services.delete_title')}
        content={t('services.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
            />
    </Spa2ManageShell>
  );
}
