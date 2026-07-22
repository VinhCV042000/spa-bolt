import type { ReactNode } from 'react';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2GiftCardBanner,
  spa2GiftCardReasons,
  spa2GiftCardDesigns,
  SPA2_GIFT_CARD_ORDERS,
  type Spa2AdjustableImage,
  spa2GiftCardDenominations,
  type Spa2GiftCardDesign,
  type Spa2GiftCardOrder,
  type Spa2GiftCardReason,
  type Spa2GiftCardOrderStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  Spa2ContentPageHero,
  Spa2GiftCardPageView,
} from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2GiftCardPageView renders on the public /spa2/gift-card page: the page
// banner, the denomination chips + card designs (spa2GiftCardDenominations/
// spa2GiftCardDesigns) and the issued gift-card order ledger - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The "banner" tab reuses
// Spa2ContentPageHero and the "preview" tab reuses Spa2GiftCardPageView
// itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_DESIGN_FORM = {
  label: '',
  colorFrom: '#2E8B7A',
  colorTo: '#1D6B5C',
  emoji: '🌿',
};

const EMPTY_REASON_FORM = {
  icon: 'solar:gift-bold-duotone',
  title: '',
  desc: '',
};

const ORDER_STATUS_COLOR: Record<
  Spa2GiftCardOrderStatus,
  'info' | 'success' | 'default' | 'error'
> = {
  issued: 'info',
  redeemed: 'success',
  expired: 'default',
  cancelled: 'error',
};

type OrderStatusFilter = Spa2GiftCardOrderStatus | 'all';

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

function DesignPreviewCard({ label, bg, emoji }: { label: string; bg: string; emoji: string }) {
  return (
    <Box
      sx={{
        background: bg,
        borderRadius: 3,
        p: 2.5,
        color: 'white',
        aspectRatio: '8/5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography
          sx={{ fontSize: 11, opacity: 0.75, letterSpacing: 2, textTransform: 'uppercase' }}
        >
          Nature Spa
        </Typography>
        <Typography sx={{ fontSize: 24 }}>{emoji}</Typography>
      </Stack>
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{label || 'Tên thiết kế'}</Typography>
    </Box>
  );
}

function ReasonPreviewCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Iconify
        icon={icon || 'solar:gift-bold-duotone'}
        width={44}
        sx={{ color: SPA2_TEAL, mb: 1.5 }}
      />
      <Typography sx={{ fontWeight: 600, mb: 0.75 }}>{title || 'Tiêu đề lý do'}</Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Spa2SoftCard>
  );
}

export function Spa2GiftCardManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2GiftCardBanner,
    image: { ...spa2GiftCardBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'catalog' | 'reasons' | 'orders' | 'preview'>('banner');
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

  // ---- Denominations ----
  const [denominations, setDenominations] = useState<number[]>([...spa2GiftCardDenominations]);

  const updateDenomination = (idx: number, value: number) => {
    setDenominations((prev) => prev.map((d, i) => (i === idx ? value : d)));
    markDirty();
  };
  const addDenomination = () => {
    setDenominations((prev) => [...prev, 0]);
    markDirty();
  };
  const removeDenomination = (idx: number) => {
    setDenominations((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };

  // ---- Designs ----
  const [designs, setDesigns] = useState<Spa2GiftCardDesign[]>(() =>
    spa2GiftCardDesigns.map((d) => ({ ...d }))
  );
  const [designForm, setDesignForm] = useState(EMPTY_DESIGN_FORM);
  const [designDialog, setDesignDialog] = useState(false);
  const [designEditId, setDesignEditId] = useState<string | null>(null);
  const [designDeleteId, setDesignDeleteId] = useState<string | null>(null);

  const openCreateDesign = () => {
    setDesignForm(EMPTY_DESIGN_FORM);
    setDesignEditId(null);
    setDesignDialog(true);
  };

  const openEditDesign = (item: Spa2GiftCardDesign) => {
    const match = item.bg.match(/#[0-9a-fA-F]{6}/g);
    setDesignForm({
      label: item.label,
      colorFrom: match?.[0] ?? '#2E8B7A',
      colorTo: match?.[1] ?? '#1D6B5C',
      emoji: item.emoji,
    });
    setDesignEditId(item.id);
    setDesignDialog(true);
  };

  const designBgPreview = `linear-gradient(135deg, ${designForm.colorFrom} 0%, ${designForm.colorTo} 100%)`;

  const submitDesign = () => {
    const next = {
      label: designForm.label,
      bg: designBgPreview,
      emoji: designForm.emoji,
    };
    if (designEditId) {
      setDesigns((prev) => prev.map((d) => (d.id === designEditId ? { ...d, ...next } : d)));
    } else {
      setDesigns((prev) => [...prev, withId(next)]);
    }
    setDesignDialog(false);
    markDirty();
  };

  const confirmDeleteDesign = () => {
    setDesigns((prev) => prev.filter((d) => d.id !== designDeleteId));
    setDesignDeleteId(null);
    markDirty();
  };

  // ---- Reasons ("why choose us") ----
  const [reasons, setReasons] = useState<Spa2GiftCardReason[]>(() =>
    spa2GiftCardReasons.map((r) => ({ ...r }))
  );
  const [reasonForm, setReasonForm] = useState(EMPTY_REASON_FORM);
  const [reasonDialog, setReasonDialog] = useState(false);
  const [reasonEditId, setReasonEditId] = useState<string | null>(null);
  const [reasonDeleteId, setReasonDeleteId] = useState<string | null>(null);

  const openCreateReason = () => {
    setReasonForm(EMPTY_REASON_FORM);
    setReasonEditId(null);
    setReasonDialog(true);
  };

  const openEditReason = (item: Spa2GiftCardReason) => {
    setReasonForm({ icon: item.icon, title: item.title, desc: item.desc });
    setReasonEditId(item.id);
    setReasonDialog(true);
  };

  const submitReason = () => {
    const next = { icon: reasonForm.icon, title: reasonForm.title, desc: reasonForm.desc };
    if (reasonEditId) {
      setReasons((prev) => prev.map((r) => (r.id === reasonEditId ? { ...r, ...next } : r)));
    } else {
      setReasons((prev) => [...prev, withId(next)]);
    }
    setReasonDialog(false);
    markDirty();
  };

  const confirmDeleteReason = () => {
    setReasons((prev) => prev.filter((r) => r.id !== reasonDeleteId));
    setReasonDeleteId(null);
    markDirty();
  };

  // ---- Orders ----
  const [orders, setOrders] = useState<Spa2GiftCardOrder[]>(SPA2_GIFT_CARD_ORDERS);
  const [orderFilter, setOrderFilter] = useState<OrderStatusFilter>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderDeleteId, setOrderDeleteId] = useState<number | null>(null);
  const [orderDetailId, setOrderDetailId] = useState<number | null>(null);
  const table = useTable({ defaultRowsPerPage: 5 });

  const handleSetOrderStatus = useCallback((id: number, status: Spa2GiftCardOrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    markDirty();
  }, []);

  const confirmDeleteOrder = () => {
    setOrders((prev) => prev.filter((o) => o.id !== orderDeleteId));
    if (orderDetailId === orderDeleteId) setOrderDetailId(null);
    setOrderDeleteId(null);
    markDirty();
  };

  const filteredOrders = useMemo(
    () =>
      orders.filter((o) => {
        const matchStatus = orderFilter === 'all' || o.status === orderFilter;
        const q = orderSearch.trim().toLowerCase();
        const matchSearch =
          !q ||
          o.code.toLowerCase().includes(q) ||
          o.senderName.toLowerCase().includes(q) ||
          o.receiverName.toLowerCase().includes(q) ||
          o.receiverEmail.toLowerCase().includes(q);
        return matchStatus && matchSearch;
      }),
    [orders, orderFilter, orderSearch]
  );

  const orderDetail = useMemo(
    () => orders.find((o) => o.id === orderDetailId) ?? null,
    [orders, orderDetailId]
  );

  const orderDetailDesign = useMemo(
    () => designs.find((d) => d.id === orderDetail?.designId) ?? designs[0],
    [designs, orderDetail]
  );

  const orderCounts = useMemo(
    () => ({
      all: orders.length,
      issued: orders.filter((o) => o.status === 'issued').length,
      redeemed: orders.filter((o) => o.status === 'redeemed').length,
      expired: orders.filter((o) => o.status === 'expired').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    }),
    [orders]
  );

  const totalIssuedAmount = useMemo(
    () => orders.filter((o) => o.status !== 'cancelled').reduce((sum, o) => sum + o.amount, 0),
    [orders]
  );

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2GiftCardBanner, image: { ...spa2GiftCardBanner.image } });
    setDenominations([...spa2GiftCardDenominations]);
    setDesigns(spa2GiftCardDesigns.map((d) => ({ ...d })));
    setReasons(spa2GiftCardReasons.map((r) => ({ ...r })));
    setOrders(SPA2_GIFT_CARD_ORDERS);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('gift_card.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.gift_card')}
      publicPath={paths.spa2.giftCard}
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
          top: 64,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="banner"
          label={t('gift_card.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="catalog"
          label={t('gift_card.catalog_section')}
          icon={<Iconify icon="solar:card-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reasons"
          label={t('gift_card.reasons_section')}
          icon={<Iconify icon="solar:question-circle-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="orders"
          label={t('gift_card.orders_section')}
          icon={<Iconify icon="solar:bill-list-bold-duotone" width={20} />}
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
              title={t('gift_card.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('gift_card.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('gift_card.banner_image_help')}
                />
                <TextField
                  label={t('gift_card.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('gift_card.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('gift_card.banner_subtitle')}
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
                <Spa2ContentPageHero
                  img={banner.image.url}
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

      {/* Catalog: denominations + designs */}
      {tab === 'catalog' && (
        <Stack spacing={3}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('gift_card.denominations_section')}
              </Typography>
              <Button
                size="small"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={addDenomination}
              >
                {t('gift_card.add_denomination_btn')}
              </Button>
            </Stack>
            <Grid container spacing={1.5}>
              {denominations.map((d, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid key={idx} xs={6} sm={4} md={2.4}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TextField
                      size="small"
                      type="number"
                      fullWidth
                      value={d}
                      onChange={(e) => updateDenomination(idx, Number(e.target.value))}
                      InputProps={{ endAdornment: 'đ' }}
                    />
                    <IconButton size="small" color="error" onClick={() => removeDenomination(idx)}>
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Card>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('gift_card.designs_section')}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateDesign}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('gift_card.add_design_btn')}
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {designs.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Box sx={{ position: 'relative' }}>
                    <DesignPreviewCard label={item.label} bg={item.bg} emoji={item.emoji} />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => openEditDesign(item)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:pen-bold" width={14} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setDesignDeleteId(item.id)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                      </IconButton>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      )}

      {/* Reasons ("why choose us") */}
      {tab === 'reasons' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('gift_card.reasons_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateReason}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('gift_card.add_reason_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {reasons.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <ReasonPreviewCard icon={item.icon} title={item.title} desc={item.desc} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditReason(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setReasonDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
            {reasons.length === 0 && (
              <Grid xs={12}>
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ py: 3, textAlign: 'center' }}
                >
                  {t('gift_card.no_reasons')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Card>
      )}

      {/* Orders */}
      {tab === 'orders' && (
        <Card>
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              spacing={2}
              sx={{ py: 2, px: 2 }}
            >
              <Spa2ListAnalytic
                icon="solar:bill-list-bold-duotone"
                title={t('common.all')}
                total={orderCounts.all}
                percent={100}
                active={orderFilter === 'all'}
                onClick={() => setOrderFilter('all')}
                unitLabel={t('gift_card.unit_order')}
                secondaryLine={
                  <Box component="span" sx={{ fontSize: 12, color: 'text.disabled' }}>
                    {formatVND(totalIssuedAmount)}
                  </Box>
                }
              />
              <Spa2ListAnalytic
                icon="solar:letter-unread-bold-duotone"
                title={t('gift_card.status_issued')}
                total={orderCounts.issued}
                percent={orderCounts.all ? (orderCounts.issued / orderCounts.all) * 100 : 0}
                active={orderFilter === 'issued'}
                onClick={() => setOrderFilter('issued')}
                unitLabel={t('gift_card.unit_order')}
              />
              <Spa2ListAnalytic
                icon="solar:check-circle-bold-duotone"
                title={t('gift_card.status_redeemed')}
                total={orderCounts.redeemed}
                percent={orderCounts.all ? (orderCounts.redeemed / orderCounts.all) * 100 : 0}
                active={orderFilter === 'redeemed'}
                onClick={() => setOrderFilter('redeemed')}
                unitLabel={t('gift_card.unit_order')}
              />
              <Spa2ListAnalytic
                icon="solar:clock-circle-bold-duotone"
                title={t('gift_card.status_expired')}
                total={orderCounts.expired}
                percent={orderCounts.all ? (orderCounts.expired / orderCounts.all) * 100 : 0}
                active={orderFilter === 'expired'}
                onClick={() => setOrderFilter('expired')}
                unitLabel={t('gift_card.unit_order')}
              />
              <Spa2ListAnalytic
                icon="solar:close-circle-bold-duotone"
                title={t('gift_card.status_cancelled')}
                total={orderCounts.cancelled}
                percent={orderCounts.all ? (orderCounts.cancelled / orderCounts.all) * 100 : 0}
                active={orderFilter === 'cancelled'}
                onClick={() => setOrderFilter('cancelled')}
                unitLabel={t('gift_card.unit_order')}
              />
            </Stack>
          </Scrollbar>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ px: 2, py: 1.5, borderTop: `1px dashed ${SPA2_CREAM_DARK}` }}
          >
            <TextField
              size="small"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder={t('gift_card.search_order_placeholder')}
              sx={{ maxWidth: 320 }}
              InputProps={{
                startAdornment: (
                  <Iconify
                    icon="eva:search-fill"
                    width={18}
                    sx={{ color: 'text.disabled', mr: 1 }}
                  />
                ),
              }}
            />
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('gift_card.col_code')}</TableCell>
                  <TableCell>{t('gift_card.col_sender')}</TableCell>
                  <TableCell>{t('gift_card.col_receiver')}</TableCell>
                  <TableCell>{t('common.price_vnd')}</TableCell>
                  <TableCell>{t('gift_card.col_created_at')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((o) => (
                    <TableRow
                      key={o.id}
                      hover
                      onClick={() => setOrderDetailId(o.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Chip size="small" label={o.code} sx={{ bgcolor: SPA2_CREAM }} />
                      </TableCell>
                      <TableCell>{o.senderName}</TableCell>
                      <TableCell>
                        {o.receiverName}
                        <Typography variant="caption" color="text.disabled" display="block">
                          {o.receiverEmail}
                        </Typography>
                      </TableCell>
                      <TableCell>{formatVND(o.amount)}</TableCell>
                      <TableCell>{o.createdAt}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Select
                          size="small"
                          value={o.status}
                          onChange={(e) =>
                            handleSetOrderStatus(o.id, e.target.value as Spa2GiftCardOrderStatus)
                          }
                          sx={{ minWidth: 130 }}
                        >
                          <MenuItem value="issued">
                            <Chip
                              size="small"
                              variant="soft"
                              color={ORDER_STATUS_COLOR.issued}
                              label={t('gift_card.status_issued')}
                            />
                          </MenuItem>
                          <MenuItem value="redeemed">
                            <Chip
                              size="small"
                              variant="soft"
                              color={ORDER_STATUS_COLOR.redeemed}
                              label={t('gift_card.status_redeemed')}
                            />
                          </MenuItem>
                          <MenuItem value="expired">
                            <Chip
                              size="small"
                              variant="soft"
                              color={ORDER_STATUS_COLOR.expired}
                              label={t('gift_card.status_expired')}
                            />
                          </MenuItem>
                          <MenuItem value="cancelled">
                            <Chip
                              size="small"
                              variant="soft"
                              color={ORDER_STATUS_COLOR.cancelled}
                              label={t('gift_card.status_cancelled')}
                            />
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                        <IconButton size="small" onClick={() => setOrderDetailId(o.id)}>
                          <Iconify icon="solar:eye-bold" width={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setOrderDeleteId(o.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                      <Typography variant="body2" color="text.disabled">
                        {t('gift_card.no_orders')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            page={table.page}
            count={filteredOrders.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2GiftCardPageView
            banner={banner}
            denominations={denominations}
            designs={designs}
            reasons={reasons}
          />
        </Box>
      )}

      {/* Design add/edit dialog */}
      <Dialog open={designDialog} onClose={() => setDesignDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{designEditId ? t('common.edit') : t('gift_card.add_design_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('gift_card.form_design_label')}
                  fullWidth
                  size="small"
                  value={designForm.label}
                  onChange={(e) => setDesignForm((p) => ({ ...p, label: e.target.value }))}
                />
                <TextField
                  label={t('gift_card.form_emoji')}
                  fullWidth
                  size="small"
                  value={designForm.emoji}
                  onChange={(e) => setDesignForm((p) => ({ ...p, emoji: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('gift_card.form_color_from')}
                    type="color"
                    size="small"
                    value={designForm.colorFrom}
                    onChange={(e) => setDesignForm((p) => ({ ...p, colorFrom: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('gift_card.form_color_to')}
                    type="color"
                    size="small"
                    value={designForm.colorTo}
                    onChange={(e) => setDesignForm((p) => ({ ...p, colorTo: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <DesignPreviewCard
                  label={designForm.label}
                  bg={designBgPreview}
                  emoji={designForm.emoji}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDesignDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitDesign}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {designEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!designDeleteId}
        onClose={() => setDesignDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteDesign}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Reason add/edit dialog */}
      <Dialog open={reasonDialog} onClose={() => setReasonDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{reasonEditId ? t('common.edit') : t('gift_card.add_reason_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('gift_card.form_reason_icon')}
                  fullWidth
                  size="small"
                  value={reasonForm.icon}
                  onChange={(e) => setReasonForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:gift-bold-duotone"
                />
                <TextField
                  label={t('gift_card.form_reason_title')}
                  fullWidth
                  size="small"
                  value={reasonForm.title}
                  onChange={(e) => setReasonForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('gift_card.form_reason_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={reasonForm.desc}
                  onChange={(e) => setReasonForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ReasonPreviewCard
                  icon={reasonForm.icon}
                  title={reasonForm.title}
                  desc={reasonForm.desc}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReasonDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitReason}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {reasonEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!reasonDeleteId}
        onClose={() => setReasonDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteReason}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Order detail dialog */}
      {orderDetail && (
        <Dialog open={!!orderDetail} onClose={() => setOrderDetailId(null)} maxWidth="sm" fullWidth>
          <DialogTitle>{t('gift_card.order_detail_title')}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 0.5 }}>
              <Grid xs={12} sm={5}>
                {orderDetailDesign && (
                  <DesignPreviewCard
                    label={orderDetailDesign.label}
                    bg={orderDetailDesign.bg}
                    emoji={orderDetailDesign.emoji}
                  />
                )}
              </Grid>
              <Grid xs={12} sm={7}>
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip size="small" label={orderDetail.code} sx={{ bgcolor: SPA2_CREAM }} />
                    <Typography variant="h6">{formatVND(orderDetail.amount)}</Typography>
                  </Stack>
                  <Divider />
                  <Stack spacing={0.25}>
                    <Typography variant="caption" color="text.disabled">
                      {t('gift_card.col_sender')}
                    </Typography>
                    <Typography variant="body2">{orderDetail.senderName}</Typography>
                  </Stack>
                  <Stack spacing={0.25}>
                    <Typography variant="caption" color="text.disabled">
                      {t('gift_card.col_receiver')}
                    </Typography>
                    <Typography variant="body2">{orderDetail.receiverName}</Typography>
                    <Typography variant="body2" color="text.disabled">
                      {orderDetail.receiverEmail}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.25}>
                    <Typography variant="caption" color="text.disabled">
                      {t('gift_card.form_message')}
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      &ldquo;{orderDetail.message}&rdquo;
                    </Typography>
                  </Stack>
                  <Stack spacing={0.25}>
                    <Typography variant="caption" color="text.disabled">
                      {t('gift_card.col_created_at')}
                    </Typography>
                    <Typography variant="body2">{orderDetail.createdAt}</Typography>
                  </Stack>
                  <Select
                    size="small"
                    value={orderDetail.status}
                    onChange={(e) =>
                      handleSetOrderStatus(
                        orderDetail.id,
                        e.target.value as Spa2GiftCardOrderStatus
                      )
                    }
                    sx={{ maxWidth: 180 }}
                  >
                    <MenuItem value="issued">
                      <Chip
                        size="small"
                        variant="soft"
                        color={ORDER_STATUS_COLOR.issued}
                        label={t('gift_card.status_issued')}
                      />
                    </MenuItem>
                    <MenuItem value="redeemed">
                      <Chip
                        size="small"
                        variant="soft"
                        color={ORDER_STATUS_COLOR.redeemed}
                        label={t('gift_card.status_redeemed')}
                      />
                    </MenuItem>
                    <MenuItem value="expired">
                      <Chip
                        size="small"
                        variant="soft"
                        color={ORDER_STATUS_COLOR.expired}
                        label={t('gift_card.status_expired')}
                      />
                    </MenuItem>
                    <MenuItem value="cancelled">
                      <Chip
                        size="small"
                        variant="soft"
                        color={ORDER_STATUS_COLOR.cancelled}
                        label={t('gift_card.status_cancelled')}
                      />
                    </MenuItem>
                  </Select>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button color="error" onClick={() => setOrderDeleteId(orderDetail.id)}>
              {t('common.delete')}
            </Button>
            <Button onClick={() => setOrderDetailId(null)}>{t('common.close')}</Button>
          </DialogActions>
        </Dialog>
      )}

      <ConfirmDialog
        open={!!orderDeleteId}
        onClose={() => setOrderDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteOrder}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
