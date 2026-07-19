import type { ReactNode } from 'react';

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
import { useTheme } from '@mui/material/styles';
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
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2Offers,
  spa2ComboOffers,
  spa2OffersBanner,
  type Spa2ComboStatus,
  SPA2_COMBO_CATEGORIES,
  SPA2_OFFER_REDEMPTIONS,
  type Spa2OfferRedemption,
  type Spa2AdjustableImage,
  type Spa2OfferPaymentStatus,
  type Spa2OfferRedemptionType,
  type Spa2OfferRedemptionStatus,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  Spa2Cta,
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';

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

// `expires` on a voucher is a free-text field (e.g. "31/12/2026", but also
// "Trọn năm 2026" / "Không giới hạn") - only attempt the strict dd/mm/yyyy
// shape, anything else is treated as "not a date" rather than guessed at.
const parseVNDate = (value: string): Date | null => {
  const m = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return null;
  const date = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return Number.isNaN(date.getTime()) ? null : date;
};

const isExpiringSoon = (value: string) => {
  const date = parseVNDate(value);
  if (!date) return false;
  const diffDays = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 30;
};

type ComboFilter = 'all' | string;

const EMPTY_COMBO_FORM = {
  name: '',
  category: SPA2_COMBO_CATEGORIES[0],
  status: 'Đang bán' as Spa2ComboStatus,
  servicesInput: '',
  originalPrice: 0,
  salePrice: 0,
  image: '',
  perksInput: '',
};

const COMBO_STATUS_OPTIONS: Spa2ComboStatus[] = ['Đang bán', 'Tạm dừng', 'Ngừng bán'];

const COMBO_STATUS_COLOR: Record<Spa2ComboStatus, 'success' | 'warning' | 'default'> = {
  'Đang bán': 'success',
  'Tạm dừng': 'warning',
  'Ngừng bán': 'default',
};

const REDEMPTION_STATUS_COLOR: Record<
  Spa2OfferRedemptionStatus,
  'info' | 'primary' | 'success' | 'error'
> = {
  new: 'info',
  confirmed: 'primary',
  used: 'success',
  cancelled: 'error',
};

const REDEMPTION_STATUS_LABEL: Record<Spa2OfferRedemptionStatus, string> = {
  new: 'Mới',
  confirmed: 'Đã xác nhận',
  used: 'Đã sử dụng',
  cancelled: 'Đã huỷ',
};

const REDEMPTION_STATUS_OPTIONS: Spa2OfferRedemptionStatus[] = [
  'new',
  'confirmed',
  'used',
  'cancelled',
];

const REDEMPTION_TYPE_LABEL: Record<Spa2OfferRedemptionType, string> = {
  combo: 'Combo',
  voucher: 'Voucher',
};

const PAYMENT_STATUS_COLOR: Record<Spa2OfferPaymentStatus, 'warning' | 'success' | 'default'> = {
  unpaid: 'warning',
  paid: 'success',
  refunded: 'default',
};

const PAYMENT_STATUS_LABEL: Record<Spa2OfferPaymentStatus, string> = {
  unpaid: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  refunded: 'Đã hoàn tiền',
};

type RedemptionStatusFilter = Spa2OfferRedemptionStatus | 'all';

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
  category,
  status,
}: {
  name: string;
  services: string[];
  originalPrice: number;
  salePrice: number;
  image: string;
  perks: string[];
  category?: string;
  status?: Spa2ComboStatus;
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
        {category && (
          <Chip
            size="small"
            label={category}
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: 'common.white',
              color: SPA2_TEAL_DARK,
              fontWeight: 700,
            }}
          />
        )}
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
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <Typography variant="h6" sx={{ color: SPA2_INK }}>
            {name || 'Tên combo'}
          </Typography>
          {status && (
            <Chip size="small" variant="soft" label={status} color={COMBO_STATUS_COLOR[status]} />
          )}
        </Stack>
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
          <Typography sx={{ color: 'text.disabled', textDecoration: 'line-through', fontSize: 14 }}>
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
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2OffersBanner,
    image: { ...spa2OffersBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'vouchers' | 'combos' | 'redemptions' | 'preview'>(
    'banner'
  );
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
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const table = useTable({ defaultRowsPerPage: 5 });
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_VOUCHER_FORM);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      vouchers.filter((o) => {
        const q = search.toLowerCase();
        const matchSearch = o.title.toLowerCase().includes(q) || o.code.toLowerCase().includes(q);
        const matchStatus =
          filterStatus === 'all' || (filterStatus === 'active' ? !!o.active : !o.active);
        return matchSearch && matchStatus;
      }),
    [vouchers, search, filterStatus]
  );

  const voucherCounts = useMemo(
    () => ({
      all: vouchers.length,
      active: vouchers.filter((v) => v.active).length,
      inactive: vouchers.filter((v) => !v.active).length,
      expiringSoon: vouchers.filter((v) => isExpiringSoon(v.expires)).length,
    }),
    [vouchers]
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
  const [comboForm, setComboForm] = useState(EMPTY_COMBO_FORM);
  const [comboDialog, setComboDialog] = useState(false);
  const [comboEditId, setComboEditId] = useState<string | null>(null);
  const [comboDeleteId, setComboDeleteId] = useState<string | null>(null);
  const [comboSearch, setComboSearch] = useState('');
  const [comboCategoryFilter, setComboCategoryFilter] = useState<ComboFilter>('all');
  const [comboStatusFilter, setComboStatusFilter] = useState<'all' | Spa2ComboStatus>('all');

  const openCreateCombo = () => {
    setComboForm(EMPTY_COMBO_FORM);
    setComboEditId(null);
    setComboDialog(true);
  };

  const openEditCombo = (c: ComboItem) => {
    setComboForm({
      name: c.name,
      category: c.category,
      status: c.status,
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
      category: comboForm.category,
      status: comboForm.status,
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

  const filteredCombos = useMemo(
    () =>
      combos.filter((c) => {
        const matchSearch = c.name.toLowerCase().includes(comboSearch.toLowerCase());
        const matchCategory = comboCategoryFilter === 'all' || c.category === comboCategoryFilter;
        const matchStatus = comboStatusFilter === 'all' || c.status === comboStatusFilter;
        return matchSearch && matchCategory && matchStatus;
      }),
    [combos, comboSearch, comboCategoryFilter, comboStatusFilter]
  );

  const comboCategoryCounts = useMemo(
    () =>
      ({
        all: combos.length,
        ...Object.fromEntries(
          SPA2_COMBO_CATEGORIES.map((cat): [string, number] => [
            cat,
            combos.filter((c) => c.category === cat).length,
          ])
        ),
      }) as Record<string, number>,
    [combos]
  );

  const comboStatusCounts = useMemo(
    () => ({
      all: combos.length,
      'Đang bán': combos.filter((c) => c.status === 'Đang bán').length,
      'Tạm dừng': combos.filter((c) => c.status === 'Tạm dừng').length,
      'Ngừng bán': combos.filter((c) => c.status === 'Ngừng bán').length,
    }),
    [combos]
  );

  // ---- Khách hàng đặt combo/voucher ----
  // Hai luồng nghiệp vụ khác nhau: đơn đặt combo (mua để đến sử dụng dịch vụ)
  // và khách dùng voucher (áp mã giảm giá vào một hoá đơn khác) - tách thành
  // hai view riêng biệt (bảng + KPI riêng), chuyển qua lại bằng Tabs phụ bên dưới.
  const [redemptions, setRedemptions] = useState<Spa2OfferRedemption[]>(SPA2_OFFER_REDEMPTIONS);
  const [redemptionView, setRedemptionView] = useState<Spa2OfferRedemptionType>('combo');
  const [redemptionSearch, setRedemptionSearch] = useState('');
  const [redemptionStatus, setRedemptionStatus] = useState<RedemptionStatusFilter>('all');
  const [viewRedemption, setViewRedemption] = useState<Spa2OfferRedemption | null>(null);
  const redemptionTable = useTable({ defaultRowsPerPage: 5 });

  const handleChangeRedemptionView = (view: Spa2OfferRedemptionType) => {
    setRedemptionView(view);
    setRedemptionStatus('all');
    setRedemptionSearch('');
    redemptionTable.onResetPage();
  };

  const redemptionsByView = useMemo(
    () => redemptions.filter((r) => r.type === redemptionView),
    [redemptions, redemptionView]
  );

  const filteredRedemptions = useMemo(
    () =>
      redemptionsByView.filter((r) => {
        const q = redemptionSearch.toLowerCase();
        const matchSearch =
          !q ||
          r.customer.toLowerCase().includes(q) ||
          r.phone.includes(redemptionSearch) ||
          r.itemName.toLowerCase().includes(q);
        const matchStatus = redemptionStatus === 'all' || r.status === redemptionStatus;
        return matchSearch && matchStatus;
      }),
    [redemptionsByView, redemptionSearch, redemptionStatus]
  );

  const redemptionCounts = useMemo(
    () => ({
      all: redemptionsByView.length,
      new: redemptionsByView.filter((r) => r.status === 'new').length,
      confirmed: redemptionsByView.filter((r) => r.status === 'confirmed').length,
      used: redemptionsByView.filter((r) => r.status === 'used').length,
      cancelled: redemptionsByView.filter((r) => r.status === 'cancelled').length,
    }),
    [redemptionsByView]
  );

  const handleSetRedemptionStatus = useCallback((id: number, status: Spa2OfferRedemptionStatus) => {
    setRedemptions((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    setViewRedemption((v) => (v?.id === id ? { ...v, status } : v));
  }, []);

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2OffersBanner, image: { ...spa2OffersBanner.image } });
    setVouchers(spa2Offers.map((o, i) => ({ ...o, id: i + 1, active: true })));
    setCombos(spa2ComboOffers.map((c) => withId({ ...c })));
    setRedemptions(SPA2_OFFER_REDEMPTIONS);
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
          top: 64,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
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
          value="redemptions"
          label="Khách hàng đặt combo/voucher"
          icon={<Iconify icon="solar:users-group-rounded-bold-duotone" width={20} />}
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
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack spacing={2} direction="row" sx={{ py: 2, px: 1 }}>
              {[
                {
                  key: 'all',
                  label: 'Tất cả',
                  value: voucherCounts.all,
                  icon: 'solar:ticket-sale-bold-duotone',
                },
                {
                  key: 'active',
                  label: t('offers.status_active'),
                  value: voucherCounts.active,
                  icon: 'solar:check-circle-bold-duotone',
                },
                {
                  key: 'inactive',
                  label: t('offers.status_inactive'),
                  value: voucherCounts.inactive,
                  icon: 'solar:close-circle-bold-duotone',
                },
              ].map((k) => (
                <Grid key={k.key} xs={6} md={2.4}>
                  <Card
                    onClick={() => {
                      setFilterStatus(k.key as 'all' | 'active' | 'inactive');
                      table.onResetPage();
                    }}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      width: 1,
                      minWidth: 180,
                      bgcolor: filterStatus === k.key ? `${SPA2_TEAL}12` : SPA2_CREAM,
                      transition: 'all .2s',
                      '&:hover': { borderColor: SPA2_TEAL },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        bgcolor: `${SPA2_TEAL}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon={k.icon} width={22} sx={{ color: SPA2_TEAL_DARK }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}>
                        {k.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {k.label}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
              <Card
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: SPA2_CREAM,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    bgcolor: `${SPA2_TEAL}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify
                    icon="solar:clock-circle-bold-duotone"
                    width={22}
                    sx={{ color: SPA2_TEAL_DARK }}
                  />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}>
                    {voucherCounts.expiringSoon}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sắp hết hạn
                  </Typography>
                </Box>
              </Card>
            </Stack>
          </Scrollbar>

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
                                icon={copied === item.code ? 'solar:check-bold' : 'solar:copy-bold'}
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
          <Stack spacing={2.5} sx={{ mb: 2.5 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <Card sx={{ bgcolor: SPA2_CREAM, height: '100%' }}>
                  <Typography
                    variant="overline"
                    sx={{ display: 'block', fontWeight: 700, px: 2, pt: 2 }}
                  >
                    Theo danh mục
                  </Typography>
                  <Scrollbar sx={{ minHeight: 108 }}>
                    <Stack
                      spacing={1}
                      direction="row"
                      divider={
                        <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                      }
                      sx={{ py: 2, px: 1 }}
                    >
                      <Spa2ListAnalytic
                        title="Tất cả"
                        total={comboCategoryCounts.all}
                        percent={100}
                        icon="solar:widget-5-bold-duotone"
                        color={SPA2_TEAL}
                        unitLabel="combo"
                        active={comboCategoryFilter === 'all'}
                        onClick={() => setComboCategoryFilter('all')}
                      />
                      {SPA2_COMBO_CATEGORIES.map((cat) => (
                        <Spa2ListAnalytic
                          key={cat}
                          title={cat}
                          total={comboCategoryCounts[cat] ?? 0}
                          percent={
                            comboCategoryCounts.all
                              ? ((comboCategoryCounts[cat] ?? 0) / comboCategoryCounts.all) * 100
                              : 0
                          }
                          icon="solar:tag-bold-duotone"
                          color={SPA2_TEAL_DARK}
                          unitLabel="combo"
                          active={comboCategoryFilter === cat}
                          onClick={() => setComboCategoryFilter(cat)}
                        />
                      ))}
                    </Stack>
                  </Scrollbar>
                </Card>
              </Grid>

              <Grid xs={12} md={6}>
                <Card sx={{ bgcolor: SPA2_CREAM, height: '100%' }}>
                  <Typography
                    variant="overline"
                    sx={{ display: 'block', fontWeight: 700, px: 2, pt: 2 }}
                  >
                    Theo trạng thái
                  </Typography>
                  <Scrollbar sx={{ minHeight: 108 }}>
                    <Stack
                      spacing={1}
                      direction="row"
                      divider={
                        <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                      }
                      sx={{ py: 2, px: 1 }}
                    >
                      <Spa2ListAnalytic
                        title="Tất cả"
                        total={comboStatusCounts.all}
                        percent={100}
                        icon="solar:widget-5-bold-duotone"
                        color={SPA2_TEAL}
                        unitLabel="combo"
                        active={comboStatusFilter === 'all'}
                        onClick={() => setComboStatusFilter('all')}
                      />
                      <Spa2ListAnalytic
                        title="Đang bán"
                        total={comboStatusCounts['Đang bán']}
                        percent={
                          comboStatusCounts.all
                            ? (comboStatusCounts['Đang bán'] / comboStatusCounts.all) * 100
                            : 0
                        }
                        icon="solar:check-circle-bold-duotone"
                        color="#22C55E"
                        unitLabel="combo"
                        active={comboStatusFilter === 'Đang bán'}
                        onClick={() => setComboStatusFilter('Đang bán')}
                      />
                      <Spa2ListAnalytic
                        title="Tạm dừng"
                        total={comboStatusCounts['Tạm dừng']}
                        percent={
                          comboStatusCounts.all
                            ? (comboStatusCounts['Tạm dừng'] / comboStatusCounts.all) * 100
                            : 0
                        }
                        icon="solar:pause-circle-bold-duotone"
                        color="#FFAB00"
                        unitLabel="combo"
                        active={comboStatusFilter === 'Tạm dừng'}
                        onClick={() => setComboStatusFilter('Tạm dừng')}
                      />
                      <Spa2ListAnalytic
                        title="Ngừng bán"
                        total={comboStatusCounts['Ngừng bán']}
                        percent={
                          comboStatusCounts.all
                            ? (comboStatusCounts['Ngừng bán'] / comboStatusCounts.all) * 100
                            : 0
                        }
                        icon="solar:close-circle-bold-duotone"
                        color="#637381"
                        unitLabel="combo"
                        active={comboStatusFilter === 'Ngừng bán'}
                        onClick={() => setComboStatusFilter('Ngừng bán')}
                      />
                    </Stack>
                  </Scrollbar>
                </Card>
              </Grid>
            </Grid>

            <TextField
              placeholder={t('offers.search_placeholder')}
              value={comboSearch}
              onChange={(e) => setComboSearch(e.target.value)}
              size="small"
              sx={{ width: { xs: '100%', sm: 320 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Grid container spacing={2.5}>
            {filteredCombos.map((c) => (
              <Grid key={c.id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Box sx={{ width: '100%', position: 'relative' }}>
                  <ComboPreviewCard
                    name={c.name}
                    services={c.services}
                    originalPrice={c.originalPrice}
                    salePrice={c.salePrice}
                    image={c.image}
                    perks={c.perks}
                    category={c.category}
                    status={c.status}
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
            {filteredCombos.length === 0 && (
              <Grid xs={12}>
                <Typography variant="body2" color="text.secondary">
                  {t('common.no_data')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </SectionCard>
      )}

      {/* Khách hàng đặt combo/voucher - hai luồng nghiệp vụ tách biệt */}
      {tab === 'redemptions' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="solar:users-group-rounded-bold-duotone"
                width={22}
                sx={{ color: SPA2_TEAL }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Khách hàng đặt combo/voucher
              </Typography>
            </Stack>
          </Box>

          {/* Chuyển đổi giữa 2 luồng: đơn đặt combo (cần lên lịch sử dụng)
              và khách dùng voucher (áp mã giảm giá vào hoá đơn khác) */}
          <Box sx={{ px: 2.5, pt: 2.5 }}>
            <Tabs
              value={redemptionView}
              onChange={(_, v) => handleChangeRedemptionView(v)}
              sx={{
                minHeight: 42,
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab
                value="combo"
                label={`Đơn đặt combo (${redemptions.filter((r) => r.type === 'combo').length})`}
                icon={<Iconify icon="solar:box-bold-duotone" width={18} />}
                iconPosition="start"
              />
              <Tab
                value="voucher"
                label={`Khách dùng voucher (${redemptions.filter((r) => r.type === 'voucher').length})`}
                icon={<Iconify icon="solar:ticket-sale-bold-duotone" width={18} />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* KPI */}
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack spacing={2} direction="row" sx={{ py: 2, px: 1 }}>
              {[
                {
                  key: 'all',
                  label: redemptionView === 'combo' ? 'Tổng đơn combo' : 'Tổng lượt dùng voucher',
                  value: redemptionCounts.all,
                  icon:
                    redemptionView === 'combo'
                      ? 'solar:box-bold-duotone'
                      : 'solar:ticket-sale-bold-duotone',
                },
                {
                  key: 'new',
                  label: REDEMPTION_STATUS_LABEL.new,
                  value: redemptionCounts.new,
                  icon: 'solar:bell-bing-bold-duotone',
                },
                {
                  key: 'confirmed',
                  label: REDEMPTION_STATUS_LABEL.confirmed,
                  value: redemptionCounts.confirmed,
                  icon: 'solar:check-circle-bold-duotone',
                },
                {
                  key: 'used',
                  label: REDEMPTION_STATUS_LABEL.used,
                  value: redemptionCounts.used,
                  icon: 'solar:diploma-bold-duotone',
                },
                {
                  key: 'cancelled',
                  label: REDEMPTION_STATUS_LABEL.cancelled,
                  value: redemptionCounts.cancelled,
                  icon: 'solar:close-circle-bold-duotone',
                },
              ].map((k) => (
                <Card
                  onClick={() => {
                    setRedemptionStatus(k.key as RedemptionStatusFilter);
                    redemptionTable.onResetPage();
                  }}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    width: 1,
                    minWidth: 220,
                    bgcolor: redemptionStatus === k.key ? `${SPA2_TEAL}12` : SPA2_CREAM,
                    transition: 'all .2s',
                    '&:hover': { borderColor: SPA2_TEAL },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: `${SPA2_TEAL}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={k.icon} width={22} sx={{ color: SPA2_TEAL_DARK }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}>
                      {k.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {k.label}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Scrollbar>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder={
                redemptionView === 'combo'
                  ? 'Tìm khách hàng, SĐT, combo...'
                  : 'Tìm khách hàng, SĐT, voucher...'
              }
              value={redemptionSearch}
              onChange={(e) => {
                setRedemptionSearch(e.target.value);
                redemptionTable.onResetPage();
              }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Box sx={{ px: 2.5 }}>
            <Tabs
              value={redemptionStatus}
              onChange={(_, v) => {
                setRedemptionStatus(v);
                redemptionTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${redemptionCounts.all})`} />
              <Tab value="new" label={`${REDEMPTION_STATUS_LABEL.new} (${redemptionCounts.new})`} />
              <Tab
                value="confirmed"
                label={`${REDEMPTION_STATUS_LABEL.confirmed} (${redemptionCounts.confirmed})`}
              />
              <Tab
                value="used"
                label={`${REDEMPTION_STATUS_LABEL.used} (${redemptionCounts.used})`}
              />
              <Tab
                value="cancelled"
                label={`${REDEMPTION_STATUS_LABEL.cancelled} (${redemptionCounts.cancelled})`}
              />
            </Tabs>
          </Box>

          {/* Bảng đơn đặt combo */}
          {redemptionView === 'combo' && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Combo đã đặt</TableCell>
                    <TableCell>Giá trị đơn</TableCell>
                    <TableCell>Thanh toán</TableCell>
                    <TableCell>Ngày đặt</TableCell>
                    <TableCell>Trạng thái xử lý</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRedemptions
                    .slice(
                      redemptionTable.page * redemptionTable.rowsPerPage,
                      redemptionTable.page * redemptionTable.rowsPerPage +
                        redemptionTable.rowsPerPage
                    )
                    .map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Stack>
                            <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                              {item.customer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.phone}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">{item.itemName}</Typography>
                            <Chip
                              size="small"
                              label={item.itemCode}
                              variant="outlined"
                              sx={{
                                mt: 0.5,
                                width: 'fit-content',
                                fontFamily: 'monospace',
                                fontSize: 11,
                              }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{ color: SPA2_TEAL_DARK }}
                          >
                            {formatVND(item.orderValue)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={PAYMENT_STATUS_LABEL[item.paymentStatus]}
                            color={PAYMENT_STATUS_COLOR[item.paymentStatus]}
                            variant="soft"
                          />
                        </TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={REDEMPTION_STATUS_LABEL[item.status]}
                            color={REDEMPTION_STATUS_COLOR[item.status]}
                            variant="soft"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                            {item.status === 'new' && (
                              <>
                                <Tooltip title="Xác nhận">
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => handleSetRedemptionStatus(item.id, 'confirmed')}
                                  >
                                    <Iconify icon="solar:check-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Huỷ">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleSetRedemptionStatus(item.id, 'cancelled')}
                                  >
                                    <Iconify icon="solar:close-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {item.status === 'confirmed' && (
                              <>
                                <Tooltip title="Đã sử dụng">
                                  <IconButton
                                    size="small"
                                    sx={{ color: SPA2_TEAL_DARK }}
                                    onClick={() => handleSetRedemptionStatus(item.id, 'used')}
                                  >
                                    <Iconify icon="solar:diploma-bold" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Huỷ">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleSetRedemptionStatus(item.id, 'cancelled')}
                                  >
                                    <Iconify icon="solar:close-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            <Tooltip title={t('common.view')}>
                              <IconButton size="small" onClick={() => setViewRedemption(item)}>
                                <Iconify icon="solar:eye-bold" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredRedemptions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                        {t('common.no_data')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Bảng khách dùng voucher */}
          {redemptionView === 'voucher' && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell>Voucher</TableCell>
                    <TableCell>Giá trị hoá đơn</TableCell>
                    <TableCell>Đã giảm</TableCell>
                    <TableCell>Thanh toán</TableCell>
                    <TableCell>Ngày dùng</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRedemptions
                    .slice(
                      redemptionTable.page * redemptionTable.rowsPerPage,
                      redemptionTable.page * redemptionTable.rowsPerPage +
                        redemptionTable.rowsPerPage
                    )
                    .map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          <Stack>
                            <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                              {item.customer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.phone}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">{item.itemName}</Typography>
                            <Chip
                              size="small"
                              label={item.itemCode}
                              variant="outlined"
                              color="primary"
                              sx={{
                                mt: 0.5,
                                width: 'fit-content',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                fontSize: 11,
                              }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell>{formatVND(item.orderValue)}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={700} color="error.main">
                            {item.discountAmount !== undefined
                              ? formatVND(item.discountAmount)
                              : '—'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={PAYMENT_STATUS_LABEL[item.paymentStatus]}
                            color={PAYMENT_STATUS_COLOR[item.paymentStatus]}
                            variant="soft"
                          />
                        </TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={REDEMPTION_STATUS_LABEL[item.status]}
                            color={REDEMPTION_STATUS_COLOR[item.status]}
                            variant="soft"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                            {item.status === 'new' && (
                              <>
                                <Tooltip title="Xác nhận">
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => handleSetRedemptionStatus(item.id, 'confirmed')}
                                  >
                                    <Iconify icon="solar:check-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Huỷ">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleSetRedemptionStatus(item.id, 'cancelled')}
                                  >
                                    <Iconify icon="solar:close-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            {item.status === 'confirmed' && (
                              <>
                                <Tooltip title="Đã sử dụng">
                                  <IconButton
                                    size="small"
                                    sx={{ color: SPA2_TEAL_DARK }}
                                    onClick={() => handleSetRedemptionStatus(item.id, 'used')}
                                  >
                                    <Iconify icon="solar:diploma-bold" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Huỷ">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleSetRedemptionStatus(item.id, 'cancelled')}
                                  >
                                    <Iconify icon="solar:close-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                            <Tooltip title={t('common.view')}>
                              <IconButton size="small" onClick={() => setViewRedemption(item)}>
                                <Iconify icon="solar:eye-bold" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredRedemptions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                        {t('common.no_data')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePaginationCustom
            count={filteredRedemptions.length}
            page={redemptionTable.page}
            rowsPerPage={redemptionTable.rowsPerPage}
            onPageChange={redemptionTable.onChangePage}
            onRowsPerPageChange={redemptionTable.onChangeRowsPerPage}
          />
        </Card>
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
                        category={c.category}
                        status={c.status}
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
        <DialogTitle>
          {editId !== null ? t('offers.form_edit') : t('offers.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <TextField
                  select
                  label={t('common.status')}
                  value={form.active ? 'active' : 'inactive'}
                  onChange={(e) => setForm((p) => ({ ...p, active: e.target.value === 'active' }))}
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
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
                  >
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
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
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
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label="Danh mục"
                    value={comboForm.category}
                    onChange={(e) => setComboForm((p) => ({ ...p, category: e.target.value }))}
                    fullWidth
                  >
                    {SPA2_COMBO_CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label={t('common.status')}
                    value={comboForm.status}
                    onChange={(e) =>
                      setComboForm((p) => ({ ...p, status: e.target.value as Spa2ComboStatus }))
                    }
                    fullWidth
                  >
                    {COMBO_STATUS_OPTIONS.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
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
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
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
                  category={comboForm.category}
                  status={comboForm.status}
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

      {/* Xem chi tiết - khách hàng đặt combo/voucher */}
      <Dialog
        open={!!viewRedemption}
        onClose={() => setViewRedemption(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          Chi tiết {viewRedemption ? REDEMPTION_TYPE_LABEL[viewRedemption.type] : ''} #
          {viewRedemption?.id}
        </DialogTitle>
        <DialogContent dividers>
          {viewRedemption && (
            <Stack spacing={1.5}>
              {(
                [
                  ['Khách hàng', viewRedemption.customer],
                  ['Điện thoại', viewRedemption.phone],
                  ['Loại', REDEMPTION_TYPE_LABEL[viewRedemption.type]],
                  [
                    viewRedemption.type === 'combo' ? 'Combo đã đặt' : 'Voucher',
                    viewRedemption.itemName,
                  ],
                  ['Mã', viewRedemption.itemCode],
                  [
                    viewRedemption.type === 'combo' ? 'Giá trị đơn' : 'Giá trị hoá đơn',
                    formatVND(viewRedemption.orderValue),
                  ],
                  ...(viewRedemption.type === 'voucher'
                    ? ([
                        [
                          'Đã giảm',
                          viewRedemption.discountAmount !== undefined
                            ? formatVND(viewRedemption.discountAmount)
                            : '—',
                        ],
                      ] as [string, string][])
                    : []),
                  ['Thanh toán', PAYMENT_STATUS_LABEL[viewRedemption.paymentStatus]],
                  [
                    viewRedemption.type === 'combo' ? 'Ngày đặt' : 'Ngày dùng',
                    viewRedemption.createdAt,
                  ],
                ] as [string, string][]
              ).map(([label, value]) => (
                <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                  {t('common.status')}:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewRedemption.status}
                  onChange={(e) =>
                    handleSetRedemptionStatus(
                      viewRedemption.id,
                      e.target.value as Spa2OfferRedemptionStatus
                    )
                  }
                  sx={{ flex: 1 }}
                >
                  {REDEMPTION_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {REDEMPTION_STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewRedemption(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
