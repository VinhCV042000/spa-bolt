import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
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
import { spa2BranchesBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Branches,
  SPA2_TEAL_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/branches page (Spa2BranchesPageView)
// renders: banner + the branch list (city selector + map embed both read
// live from this same array, so a new/renamed branch shows up there too).
// ─────────────────────────────────────────────────────────────────────────────

type Branch = (typeof spa2Branches)[number] & { id: number };

const EMPTY_FORM: Omit<Branch, 'id'> = {
  city: '',
  name: '',
  address: '',
  phone: '',
  hours: '',
  image: '',
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

function BranchPreviewCard({ form }: { form: Omit<Branch, 'id'> }) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          height: 220,
          bgcolor: SPA2_CREAM,
          backgroundImage: form.image ? `url(${form.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box sx={{ p: 3 }}>
        <Chip
          label={form.city || '—'}
          sx={{ bgcolor: 'common.white', color: SPA2_TEAL_DARK, mb: 1.5 }}
        />
        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
          {form.name || '(Chưa đặt tên)'}
        </Typography>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Iconify icon="solar:map-point-bold" sx={{ color: SPA2_TEAL }} width={18} />
            <Typography sx={{ color: 'text.secondary' }}>{form.address}</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Iconify icon="solar:phone-bold" sx={{ color: SPA2_TEAL }} width={18} />
            <Typography sx={{ color: 'text.secondary' }}>{form.phone}</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} width={18} />
            <Typography sx={{ color: 'text.secondary' }}>{form.hours}</Typography>
          </Stack>
        </Stack>
        <Button
          fullWidth
          disabled
          sx={{ borderRadius: 999, bgcolor: SPA2_TEAL, color: 'white', opacity: 0.7 }}
        >
          Đặt lịch tại {form.city || '...'}
        </Button>
      </Box>
    </Spa2SoftCard>
  );
}

// Mirrors the "Chọn khu vực" city selector + map embed section on the public
// page exactly, fed by whatever branch list is currently in dashboard state.
function BranchLocatorPreview({ branches }: { branches: Branch[] }) {
  const [activeCity, setActiveCity] = useState<string>(branches[0]?.city ?? '');
  const activeBranch = branches.find((b) => b.city === activeCity) ?? branches[0];

  if (!activeBranch) {
    return (
      <Typography variant="body2" color="text.secondary">
        Chưa có chi nhánh nào.
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid xs={12} md={4}>
        <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
          <Typography sx={{ p: 2.5, pb: 0, color: SPA2_INK, fontWeight: 600 }}>
            Chọn khu vực
          </Typography>
          <Stack divider={<Divider />} sx={{ mt: 1 }}>
            {branches.map((b) => (
              <Stack
                key={b.id}
                direction="row"
                spacing={1.5}
                alignItems="center"
                onClick={() => setActiveCity(b.city)}
                sx={{
                  p: 2.5,
                  cursor: 'pointer',
                  bgcolor: activeCity === b.city ? SPA2_CREAM : 'transparent',
                  borderLeft:
                    activeCity === b.city ? `3px solid ${SPA2_TEAL}` : '3px solid transparent',
                  '&:hover': { bgcolor: SPA2_CREAM },
                }}
              >
                <Iconify
                  icon="solar:map-point-bold"
                  sx={{ color: activeCity === b.city ? SPA2_TEAL : 'text.disabled' }}
                />
                <Stack>
                  <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 14 }}>
                    {b.city}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{b.name}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Spa2SoftCard>
      </Grid>
      <Grid xs={12} md={8}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: 320, md: '100%' },
            minHeight: 360,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(31,42,40,0.08)',
          }}
        >
          <iframe
            title="Nature Spa Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps?q=${encodeURIComponent(activeBranch.address)}&output=embed`}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export function Spa2BranchesManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2BranchesBanner,
    image: { ...spa2BranchesBanner.image },
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
    setBanner({ ...spa2BranchesBanner, image: { ...spa2BranchesBanner.image } });
    setDirty(false);
  };

  const [items, setItems] = useState<Branch[]>(spa2Branches.map((b, i) => ({ ...b, id: i + 1 })));
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Branch, 'id'>>(EMPTY_FORM);

  const filtered = items.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Branch) => {
    setForm({
      city: item.city,
      name: item.name,
      address: item.address,
      phone: item.phone,
      hours: item.hours,
      image: item.image,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...form, id: newId }]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  return (
    <Spa2ManageShell
      title={t('branches.page_title')}
      description="Banner và danh sách chi nhánh hiển thị trên trang Chi nhánh công khai."
      breadcrumbLabel={t('nav.branches')}
      publicPath={paths.spa2.branches}
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
          label={t('branches.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('branches.list_section')}
          icon={<Iconify icon="solar:shop-2-bold-duotone" width={20} />}
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
                  label={t('branches.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('branches.banner_image_help')}
                />
                <TextField
                  label={t('branches.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('branches.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('branches.banner_subtitle')}
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

      {/* Danh sách chi nhánh */}
      {tab === 'list' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <TextField
              placeholder={t('branches.search_placeholder')}
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
              {t('branches.add_btn')}
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('branches.col_branch')}</TableCell>
                  <TableCell>{t('branches.col_city')}</TableCell>
                  <TableCell>{t('branches.col_address')}</TableCell>
                  <TableCell>{t('branches.col_phone')}</TableCell>
                  <TableCell>{t('branches.col_hours')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar src={item.image} variant="rounded" sx={{ width: 48, height: 36 }} />
                        <Typography variant="subtitle2">{item.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell sx={{ maxWidth: 220 }}>
                      <Typography variant="body2" noWrap>
                        {item.address}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.hours}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openEdit(item)}>
                            <Iconify icon="solar:pen-bold" />
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

      {/* Live preview of the whole page — mirrors Spa2BranchesPageView exactly:
          hero + city-selector/map + branch card grid. */}
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
              <BranchLocatorPreview branches={items} />
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Chi nhánh" title="Tất cả địa điểm" />
              {items.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có chi nhánh nào.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {items.map((b) => (
                    <Grid key={b.id} xs={12} sm={6} md={6}>
                      <BranchPreviewCard form={b} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>
        </Box>
      )}

      {/* Create / Edit dialog - left: form, right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {editId !== null ? t('branches.form_edit') : t('branches.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('branches.form_name')}
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('branches.form_city')}
                    value={form.city}
                    onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('branches.form_address')}
                  value={form.address}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('branches.form_phone')}
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('branches.form_hours')}
                    value={form.hours}
                    onChange={(e) => setForm((p) => ({ ...p, hours: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <Spa2ImageField
                  label={t('branches.form_image')}
                  value={{ url: form.image, focalX: 50, focalY: 50, zoom: 100 }}
                  onChange={(img) => setForm((p) => ({ ...p, image: img.url }))}
                  height={180}
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
                <BranchPreviewCard form={form} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('branches.form_edit') : t('branches.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('branches.delete_title')}
        content={t('branches.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
