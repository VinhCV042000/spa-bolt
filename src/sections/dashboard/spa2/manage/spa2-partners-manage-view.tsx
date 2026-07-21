import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
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
import { spa2PartnersBanner } from 'src/_mock/_spa2';

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
  SPA2_TEAL_DARK,
  spa2ExtraPartners,
  spa2PartnerProfiles,
  spa2PartnerCategories,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/partners page (Spa2PartnersPageView)
// renders that is driven by spa2PartnerProfiles: banner + the logo grid + the
// category-grouped list below it (spa2ExtraPartners stays static, matching
// the read-only "supplementary partner" role it already has on the page).
// ─────────────────────────────────────────────────────────────────────────────

type Partner = (typeof spa2PartnerProfiles)[number] & { id: number };

const EMPTY_FORM: Omit<Partner, 'id'> = {
  name: '',
  country: '',
  logo: '',
  specialty: '',
  since: '',
  desc: '',
  expert: '',
  category: spa2PartnerCategories[0]?.key ?? '',
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

function PartnerTileCard({ form }: { form: Omit<Partner, 'id'> }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center', py: 4 }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          mx: 'auto',
          mb: 1.5,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
        }}
      >
        {form.logo || '—'}
      </Box>
      <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 14 }}>
        {form.name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{form.country}</Typography>
    </Spa2SoftCard>
  );
}

export function Spa2PartnersManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2PartnersBanner,
    image: { ...spa2PartnersBanner.image },
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
    setBanner({ ...spa2PartnersBanner, image: { ...spa2PartnersBanner.image } });
    setDirty(false);
  };

  const [items, setItems] = useState<Partner[]>(
    spa2PartnerProfiles.map((p, i) => ({ ...p, id: i + 1 }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Partner, 'id'>>(EMPTY_FORM);

  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Partner) => {
    setForm({
      name: item.name,
      country: item.country,
      logo: item.logo,
      specialty: item.specialty,
      since: item.since,
      desc: item.desc,
      expert: item.expert,
      category: item.category,
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

  const allPartners = [...items, ...spa2ExtraPartners];

  return (
    <Spa2ManageShell
      title={t('partners.page_title')}
      description="Banner và danh sách đối tác hiển thị trên trang Đối tác công khai."
      breadcrumbLabel={t('nav.partners')}
      publicPath={paths.spa2.partners}
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
          label={t('partners.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('partners.list_section')}
          icon={<Iconify icon="solar:hand-shake-bold-duotone" width={20} />}
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
                  label={t('partners.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('partners.banner_image_help')}
                />
                <TextField
                  label={t('partners.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('partners.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('partners.banner_subtitle')}
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

      {/* Danh sách đối tác */}
      {tab === 'list' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <TextField
              placeholder={t('partners.search_placeholder')}
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
              {t('partners.add_btn')}
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('partners.col_partner')}</TableCell>
                  <TableCell>{t('partners.col_country')}</TableCell>
                  <TableCell>{t('partners.col_specialty')}</TableCell>
                  <TableCell>{t('partners.col_since')}</TableCell>
                  <TableCell>{t('partners.col_expert')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: 'primary.lighter',
                            color: 'primary.main',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.logo}
                        </Box>
                        <Box>
                          <Typography variant="subtitle2">{item.name}</Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                            sx={{ maxWidth: 180, display: 'block' }}
                          >
                            {item.desc}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={item.country} />
                    </TableCell>
                    <TableCell>{item.specialty}</TableCell>
                    <TableCell>{item.since}</TableCell>
                    <TableCell>{item.expert}</TableCell>
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

      {/* Live preview — mirrors Spa2PartnersPageView's logo grid + category groups */}
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
              <Spa2SectionTitle eyebrow="Thương hiệu" title="Đối tác của chúng tôi" />
              {allPartners.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có đối tác nào.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {allPartners.map((p) => (
                    <Grid key={p.name} xs={6} sm={4} md={2}>
                      <PartnerTileCard form={p} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Phân loại" title="Đối tác chiến lược" />
              <Grid container spacing={3}>
                {spa2PartnerCategories.map((cat) => {
                  const partnersInCat = allPartners.filter((p) => p.category === cat.key);
                  return (
                    <Grid key={cat.key} xs={12} sm={6} md={3}>
                      <Spa2SoftCard>
                        <Iconify icon={cat.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                          {cat.label}
                        </Typography>
                        <Stack spacing={1}>
                          {partnersInCat.length === 0 ? (
                            <Typography sx={{ fontSize: 13, color: 'text.disabled' }}>—</Typography>
                          ) : (
                            partnersInCat.map((p) => (
                              <Typography
                                key={p.name}
                                sx={{ fontSize: 14, color: 'text.secondary' }}
                              >
                                • {p.name}
                              </Typography>
                            ))
                          )}
                        </Stack>
                      </Spa2SoftCard>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Box>
        </Box>
      )}

      {/* Create / Edit dialog - left: form, right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editId !== null ? t('partners.form_edit') : t('partners.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('partners.form_name')}
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('partners.form_abbr')}
                    value={form.logo}
                    onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))}
                    sx={{ width: 140 }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('partners.form_country')}
                    value={form.country}
                    onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('partners.form_since')}
                    value={form.since}
                    onChange={(e) => setForm((p) => ({ ...p, since: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  select
                  label={t('partners.form_category')}
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  fullWidth
                >
                  {spa2PartnerCategories.map((cat) => (
                    <MenuItem key={cat.key} value={cat.key}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label={t('partners.form_specialty')}
                  value={form.specialty}
                  onChange={(e) => setForm((p) => ({ ...p, specialty: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('partners.form_desc')}
                  value={form.desc}
                  onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                />
                <TextField
                  label={t('partners.form_expert')}
                  value={form.expert}
                  onChange={(e) => setForm((p) => ({ ...p, expert: e.target.value }))}
                  fullWidth
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
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2, maxWidth: 220, mx: 'auto' }}>
                <PartnerTileCard form={form} />
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
            {editId !== null ? t('partners.form_edit') : t('partners.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('partners.delete_title')}
        content={t('partners.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
