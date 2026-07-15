import { useState, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import {
  SPA2_SERVICES,
  SPA2_SERVICE_CATEGORIES,
  type Spa2ServiceItem,
  type Spa2ServiceStatus,
} from 'src/_mock/_spa2';

import {
  SPA2_CREAM,
  SPA2_INK,
  SPA2_SAGE,
  SPA2_TEAL,
  SPA2_CREAM_DARK,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = SPA2_SERVICE_CATEGORIES.filter((c) => c.value !== 'all');

const STATUS_COLOR: Record<Spa2ServiceStatus, 'success' | 'default' | 'warning'> = {
  'Đang hiển thị': 'success',
  'Bản nháp': 'default',
  'Ẩn': 'warning',
};

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_FORM: Spa2ServiceItem = {
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
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2ServicesManageView() {
  const { t } = useTranslate('spa2-manage');
  const [items, setItems] = useState<Spa2ServiceItem[]>([...SPA2_SERVICES]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [openForm, setOpenForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [form, setForm] = useState<Spa2ServiceItem>(EMPTY_FORM);
  const [benefitsText, setBenefitsText] = useState('');

  const filtered = useMemo(() => {
    let list = items.filter(
    (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'all') list = list.filter((s) => s.category === category);
    return list;
  }, [items, search, category]);

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

  const openEdit = useCallback((item: Spa2ServiceItem) => {
    setForm(item);
    setBenefitsText(item.benefits.join(', '));
    setEditSlug(item.slug);
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
  }, [form, editSlug, benefitsText]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((s) => s.slug !== deleteSlug));
    setDeleteSlug(null);
  }, [deleteSlug]);

  const handleToggle = useCallback((slug: string) => {
    setItems((p) =>
      p.map((s) =>
        s.slug === slug
          ? { ...s, status: s.status === 'Đang hiển thị' ? 'Ẩn' : 'Đang hiển thị' }
          : s
      )
    );
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={t('services.page_title')}
        links={[
          { name: t('common.dashboard'), href: paths.dashboard.root },
          { name: t('common.spa2'), href: paths.dashboard.spa2.root },
          { name: t('nav.services') },
        ]}
        action={
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
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Editorial header */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          mb: 4,
          color: 'common.white',
          background: `linear-gradient(135deg, ${SPA2_TEAL_DARK} 0%, ${SPA2_TEAL} 55%, ${SPA2_TEAL_LIGHT} 100%)`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 260,
            height: 260,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: -40,
            width: 180,
            height: 180,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.06)',
          }}
        />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ md: 'center' }}
          justifyContent="space-between"
          sx={{ position: 'relative' }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Iconify icon="solar:leaf-bold" sx={{ color: 'common.white' }} />
              <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.9 }}>
                Nature Spa · Quản trị
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {t('services.page_title')}
            </Typography>
            <Typography sx={{ mt: 1, maxWidth: 620, opacity: 0.9 }}>
              Quản lý bộ sưu tập liệu pháp từ thiên nhiên – thêm, sửa, ẩn/hiện và xem trước.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            href={paths.spa2.services}
            target="_blank"
            startIcon={<Iconify icon="solar:eye-bold" />}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            Xem public
          </Button>
        </Stack>
      </Box>

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
              onChange={(e) => setSearch(e.target.value)}
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
              onChange={(e) => setCategory(e.target.value)}
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

      {/* Service cards grid (matches public view) */}
      <Grid container spacing={4}>
        {filtered.map((item) => (
          <Grid key={item.slug} xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 0,
                overflow: 'hidden',
                borderRadius: 4,
                bgcolor: 'common.white',
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
                height: '100%',
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

              <Box sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                  <Iconify icon={item.icon} sx={{ color: SPA2_TEAL }} width={28} />
                  <Typography variant="h6" sx={{ color: SPA2_INK }}>
                    {item.name}
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'text.secondary', mb: 2, minHeight: 44 }}>
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
                          icon={item.status === 'Đang hiển thị' ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
                          color={item.status === 'Đang hiển thị' ? 'warning.main' : 'success.main'}
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

      {/* Form dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: SPA2_CREAM, color: SPA2_INK, fontWeight: 700 }}>
          {editSlug ? t('services.form_edit') : t('services.add_btn')}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 3 }}>
          <Stack spacing={2}>
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
            <TextField
              label="Trạng thái"
              select
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as Spa2ServiceStatus }))}
              fullWidth
            >
              <MenuItem value="Đang hiển thị">Đang hiển thị</MenuItem>
              <MenuItem value="Bản nháp">Bản nháp</MenuItem>
              <MenuItem value="Ẩn">Ẩn</MenuItem>
            </TextField>
          </Stack>
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
    </DashboardContent>
  );
}
