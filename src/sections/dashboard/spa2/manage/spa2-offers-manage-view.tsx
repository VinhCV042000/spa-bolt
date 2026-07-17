import type { ReactNode } from 'react';
import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
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

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { spa2Offers, spa2ComboOffers, spa2OffersBanner } from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { useTable } from 'src/components/table/use-table';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';
import {
  Spa2Cta,
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages.tsx's
// Spa2OffersPageView renders on the public /spa2/offers page: the page
// banner, the voucher grid (spa2Offers) and the combo package grid
// (spa2ComboOffers) - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The "banner" tab and the "preview" tab reuse Spa2PageHero/Spa2SoftCard/
// Spa2SectionTitle/Spa2Cta directly (same components the public page
// renders), and every add/edit dialog shows a live right-hand preview of
// the exact card being created, built from the same components.
// -----------------------------------------------------------------------------

type Voucher = (typeof spa2Offers)[number] & { id: number; active?: boolean };
type ComboItem = { id: string } & (typeof spa2ComboOffers)[number];

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_VOUCHER_FORM = {
  title: '',
  desc: '',
  code: '',
  discount: '',
  expires: '',
  active: true,
};

const formatVND = (n: number) => `${fCurrency(n)} VND`;

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

function VoucherPreviewCard({
  title,
  desc,
  code,
  discount,
  expires,
}: {
  title: string;
  desc: string;
  code: string;
  discount: string;
  expires: string;
}) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          width: 88,
          height: 88,
          mx: 'auto',
          mb: 2,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL,
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 20,
        }}
      >
        {discount || '—'}
      </Box>
      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
        {title || 'Tên ưu đãi'}
      </Typography>
      <Box
        sx={{ color: 'text.secondary', mb: 2, '& p': { m: 0 } }}
        dangerouslySetInnerHTML={{ __html: desc || '<p>Mô tả ưu đãi…</p>' }}
      />
      <Chip
        label={`MÃ: ${code || '—'}`}
        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontWeight: 700, mb: 1 }}
      />
      <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>HSD: {expires || '—'}</Typography>
    </Spa2SoftCard>
  );
}

function ComboPreviewCard({
  name,
  services,
  originalPrice,
  salePrice,
  image,
  perks,
}: {
  name: string;
  services: string[];
  originalPrice: number;
  salePrice: number;
  image: string;
  perks: string[];
}) {
  const savePercent = originalPrice > 0 ? Math.round((1 - salePrice / originalPrice) * 100) : 0;
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 200,
            bgcolor: SPA2_CREAM_DARK,
            backgroundImage: image ? `url(${image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Chip
          label={`-${Number.isFinite(savePercent) ? savePercent : 0}%`}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: SPA2_TEAL,
            color: 'white',
            fontWeight: 700,
          }}
        />
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
          {name || 'Tên combo'}
        </Typography>
        <Stack spacing={0.75} sx={{ mb: 2 }}>
          {services.length === 0 && (
            <Typography sx={{ fontSize: 14, color: 'text.disabled' }}>
              Chưa có dịch vụ nào trong combo.
            </Typography>
          )}
          {services.map((s) => (
            <Stack key={s} direction="row" spacing={1} alignItems="center">
              <Iconify icon="solar:check-circle-bold" width={16} sx={{ color: SPA2_TEAL }} />
              <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>{s}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ color: SPA2_TEAL }}>
            {formatVND(salePrice)}
          </Typography>
          <Typography
            sx={{ color: 'text.disabled', textDecoration: 'line-through', fontSize: 14 }}
          >
            {formatVND(originalPrice)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
          {perks.map((p) => (
            <Chip
              key={p}
              size="small"
              label={p}
              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
            />
          ))}
        </Stack>
        <Button
          fullWidth
          disabled
          sx={{
            borderRadius: 999,
            py: 1.2,
            bgcolor: SPA2_TEAL,
            color: 'white',
            '&.Mui-disabled': { bgcolor: SPA2_TEAL, color: 'white', opacity: 0.85 },
          }}
        >
          Mua ngay / Đặt lịch
        </Button>
      </Box>
    </Spa2SoftCard>
  );
}

// -----------------------------------------------------------------------------

export function Spa2OffersManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2OffersBanner,
    image: { ...spa2OffersBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'vouchers' | 'combos' | 'preview'>('banner');
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

  // ---- Vouchers ----
  const [vouchers, setVouchers] = useState<Voucher[]>(
    spa2Offers.map((o, i) => ({ ...o, id: i + 1, active: true }))
  );
  const [search, setSearch] = useState('');
  const table = useTable({ defaultRowsPerPage: 5 });
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_VOUCHER_FORM);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      vouchers.filter(
        (o) =>
          o.title.toLowerCase().includes(search.toLowerCase()) ||
          o.code.toLowerCase().includes(search.toLowerCase())
      ),
    [vouchers, search]
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_VOUCHER_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Voucher) => {
    setForm({
      title: item.title,
      desc: item.desc,
      code: item.code,
      discount: item.discount,
      expires: item.expires,
      active: item.active ?? true,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setVouchers((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = Math.max(0, ...vouchers.map((x) => x.id)) + 1;
      setVouchers((p) => [...p, { ...form, id: newId }]);
    }
    setOpenForm(false);
    markDirty();
  }, [form, editId, vouchers]);

  const handleDelete = useCallback(() => {
    setVouchers((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    markDirty();
  }, [deleteId]);

  const handleToggle = useCallback((id: number) => {
    setVouchers((p) => p.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
    markDirty();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  // ---- Combos ----
  const [combos, setCombos] = useState<ComboItem[]>(() =>
    spa2ComboOffers.map((c) => withId({ ...c }))
  );
  const [comboForm, setComboForm] = useState({
    name: '',
    servicesInput: '',
    originalPrice: 0,
    salePrice: 0,
    image: '',
    perksInput: '',
  });
  const [comboDialog, setComboDialog] = useState(false);
  const [comboEditId, setComboEditId] = useState<string | null>(null);
  const [comboDeleteId, setComboDeleteId] = useState<string | null>(null);

  const openCreateCombo = () => {
    setComboForm({
      name: '',
      servicesInput: '',
      originalPrice: 0,
      salePrice: 0,
      image: '',
      perksInput: '',
    });
    setComboEditId(null);
    setComboDialog(true);
  };

  const openEditCombo = (c: ComboItem) => {
    setComboForm({
      name: c.name,
      servicesInput: c.services.join(', '),
      originalPrice: c.originalPrice,
      salePrice: c.salePrice,
      image: c.image,
      perksInput: c.perks.join(', '),
    });
    setComboEditId(c.id);
    setComboDialog(true);
  };

  const comboServicesList = useMemo(
    () =>
      comboForm.servicesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    [comboForm.servicesInput]
  );
  const comboPerksList = useMemo(
    () =>
      comboForm.perksInput
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
    [comboForm.perksInput]
  );

  const submitCombo = () => {
    const next = {
      name: comboForm.name,
      slug: comboForm.name.toLowerCase().replace(/\s+/g, '-'),
      services: comboServicesList,
      originalPrice: Number(comboForm.originalPrice),
      salePrice: Number(comboForm.salePrice),
      image: comboForm.image,
      perks: comboPerksList,
    };
    if (comboEditId) {
      setCombos((prev) => prev.map((c) => (c.id === comboEditId ? { ...c, ...next } : c)));
    } else {
      setCombos((prev) => [...prev, withId(next)]);
    }
    setComboDialog(false);
    markDirty();
  };

  const confirmDeleteCombo = () => {
    setCombos((prev) => prev.filter((c) => c.id !== comboDeleteId));
    setComboDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2OffersBanner, image: { ...spa2OffersBanner.image } });
    setVouchers(spa2Offers.map((o, i) => ({ ...o, id: i + 1, active: true })));
    setCombos(spa2ComboOffers.map((c) => withId({ ...c })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('offers.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.offers')}
      publicPath={paths.spa2.offers}
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
          label={t('offers.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="vouchers"
          label={t('offers.vouchers_section')}
          icon={<Iconify icon="solar:ticket-sale-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="combos"
          label={t('offers.combos_section')}
          icon={<Iconify icon="solar:box-bold-duotone" width={20} />}
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
            <SectionCard title={t('offers.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('offers.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('offers.banner_image_help')}
                />
                <TextField
                  label={t('offers.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('offers.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('offers.banner_subtitle')}
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
                <Spa2PageHero
                  image={banner.image.url}
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

      {/* Vouchers */}
      {tab === 'vouchers' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ sm: 'center' }}
              justifyContent="space-between"
            >
              <TextField
                placeholder={t('offers.search_placeholder')}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  table.onResetPage();
                }}
                size="small"
                sx={{ width: { xs: '100%', sm: 280 } }}
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
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('offers.add_btn')}
              </Button>
            </Stack>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('offers.col_offer')}</TableCell>
                  <TableCell>{t('offers.col_code')}</TableCell>
                  <TableCell>{t('offers.col_discount')}</TableCell>
                  <TableCell>{t('offers.col_expires')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2">{item.title}</Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                            sx={{ maxWidth: 200, display: 'block' }}
                          >
                            {item.desc.replace(/<[^>]+>/g, ' ').trim()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Chip
                            size="small"
                            label={item.code}
                            variant="outlined"
                            color="primary"
                            sx={{ fontFamily: 'monospace', fontWeight: 700 }}
                          />
                          <Tooltip
                            title={copied === item.code ? t('common.copied') : t('common.copy')}
                          >
                            <IconButton size="small" onClick={() => handleCopy(item.code)}>
                              <Iconify
                                icon={
                                  copied === item.code ? 'solar:check-bold' : 'solar:copy-bold'
                                }
                                width={14}
                              />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} color="error.main">
                          {item.discount}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.expires}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            item.active ? t('offers.status_active') : t('offers.status_inactive')
                          }
                          color={item.active ? 'success' : 'default'}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          <Tooltip title={item.active ? t('common.disable') : t('common.enable')}>
                            <IconButton size="small" onClick={() => handleToggle(item.id)}>
                              <Iconify
                                icon={item.active ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
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
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      {t('common.no_data')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filtered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Combos */}
      {tab === 'combos' && (
        <SectionCard
          title={t('offers.combos_section')}
          icon="solar:box-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateCombo}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('offers.combo_add')}
            </Button>
          }
        >
          <Grid container spacing={2.5}>
            {combos.map((c) => (
              <Grid key={c.id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Box sx={{ width: '100%', position: 'relative' }}>
                  <ComboPreviewCard
                    name={c.name}
                    services={c.services}
                    originalPrice={c.originalPrice}
                    salePrice={c.salePrice}
                    image={c.image}
                    perks={c.perks}
                  />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      bgcolor: 'common.white',
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  >
                    <Tooltip title={t('common.edit')}>
                      <IconButton size="small" onClick={() => openEditCombo(c)}>
                        <Iconify icon="solar:pen-bold" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('common.delete')}>
                      <IconButton size="small" color="error" onClick={() => setComboDeleteId(c.id)}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Grid>
            ))}
            {combos.length === 0 && (
              <Grid xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {t('common.no_data')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </SectionCard>
      )}

      {/* Full-page live preview - pixel-for-pixel same layout/order as the public /spa2/offers page */}
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

            <Box sx={{ py: { xs: 8, md: 10 } }}>
              <Container>
                <Spa2SectionTitle eyebrow="Voucher" title="Mã ưu đãi hiện có" />
                <Grid container spacing={3}>
                  {vouchers.map((o) => (
                    <Grid key={o.id} xs={12} sm={6} md={3}>
                      <VoucherPreviewCard
                        title={o.title}
                        desc={o.desc}
                        code={o.code}
                        discount={o.discount}
                        expires={o.expires}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>

            <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
              <Container>
                <Spa2SectionTitle eyebrow="Combo" title="Gói combo tiết kiệm" />
                <Grid container spacing={4}>
                  {combos.map((c) => (
                    <Grid key={c.id} xs={12} md={4}>
                      <ComboPreviewCard
                        name={c.name}
                        services={c.services}
                        originalPrice={c.originalPrice}
                        salePrice={c.salePrice}
                        image={c.image}
                        perks={c.perks}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>

            <Spa2Cta />
          </Box>
        </Box>
      )}

      {/* Voucher dialog - left: edit, right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{editId !== null ? t('offers.form_edit') : t('offers.form_create')}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  select
                  label={t('common.status')}
                  value={form.active ? 'active' : 'inactive'}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, active: e.target.value === 'active' }))
                  }
                  fullWidth
                >
                  <MenuItem value="active">{t('offers.status_active')}</MenuItem>
                  <MenuItem value="inactive">{t('offers.status_inactive')}</MenuItem>
                </TextField>
                <TextField
                  label={t('offers.form_title')}
                  value={form.title}
                  onChange={handleChange('title')}
                  fullWidth
                />
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}>
                    {t('offers.form_desc')}
                  </Typography>
                  <Editor
                    value={form.desc}
                    onChange={(html) => setForm((p) => ({ ...p, desc: html }))}
                    placeholder={t('offers.form_desc')}
                    fullItem
                    sx={{ maxHeight: 240 }}
                  />
                </Box>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('offers.form_code')}
                    value={form.code}
                    onChange={handleChange('code')}
                    fullWidth
                    inputProps={{ style: { textTransform: 'uppercase' } }}
                  />
                  <TextField
                    label={t('offers.form_discount')}
                    value={form.discount}
                    onChange={handleChange('discount')}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('offers.form_expires')}
                  value={form.expires}
                  onChange={handleChange('expires')}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <VoucherPreviewCard
                  title={form.title}
                  desc={form.desc}
                  code={form.code}
                  discount={form.discount}
                  expires={form.expires}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title}>
            {editId !== null ? t('offers.form_edit') : t('offers.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('offers.delete_title')}
        content={t('offers.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      {/* Combo dialog - left: edit, right: live preview */}
      <Dialog open={comboDialog} onClose={() => setComboDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {comboEditId ? t('common.edit') : t('offers.combo_add')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('offers.combo_name')}
                  value={comboForm.name}
                  onChange={(e) => setComboForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('offers.combo_services')}
                  value={comboForm.servicesInput}
                  onChange={(e) => setComboForm((p) => ({ ...p, servicesInput: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                  helperText={t('common.comma_hint')}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('offers.combo_original_price')}
                    type="number"
                    value={comboForm.originalPrice}
                    onChange={(e) =>
                      setComboForm((p) => ({ ...p, originalPrice: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('offers.combo_sale_price')}
                    type="number"
                    value={comboForm.salePrice}
                    onChange={(e) =>
                      setComboForm((p) => ({ ...p, salePrice: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('common.image_url')}
                  value={comboForm.image}
                  onChange={(e) => setComboForm((p) => ({ ...p, image: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('offers.combo_perks')}
                  value={comboForm.perksInput}
                  onChange={(e) => setComboForm((p) => ({ ...p, perksInput: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                  helperText={t('common.comma_hint')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ComboPreviewCard
                  name={comboForm.name}
                  services={comboServicesList}
                  originalPrice={comboForm.originalPrice}
                  salePrice={comboForm.salePrice}
                  image={comboForm.image}
                  perks={comboPerksList}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComboDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitCombo}
            disabled={!comboForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!comboDeleteId}
        onClose={() => setComboDeleteId(null)}
        title={t('offers.combo_delete_title')}
        content={t('offers.combo_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteCombo}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
