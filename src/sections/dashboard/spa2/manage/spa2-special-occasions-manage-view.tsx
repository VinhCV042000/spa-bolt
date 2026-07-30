import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
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
  spa2OccasionPackages,
  spa2OccasionCategories,
  type Spa2OccasionPackage,
  type Spa2AdjustableImage,
  type Spa2OccasionCategory,
  spa2SpecialOccasionsBanner,
  SPA2_OCCASION_BOOKINGS,
  type Spa2OccasionBooking,
  type Spa2SpecialOccasionsBanner,
  type Spa2OccasionBookingStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';
import {
  Spa2ContentPageHero3,
  Spa2SpecialOccasionsPageView,
} from 'src/sections/spa2/view/spa2-content-pages3';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2SpecialOccasionsPageView renders on the public /spa2/special-occasions
// page: the page banner and the 7-package catalog (bridal, birthday,
// bachelorette, anniversary, corporate-gift, postpartum) - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The "banner" tab reuses
// Spa2ContentPageHero3 and the "preview" tab reuses
// Spa2SpecialOccasionsPageView itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_PACKAGE_FORM = {
  category: 'wedding',
  icon: 'solar:gift-bold-duotone',
  label: '',
  title: '',
  color: '#2E8B7A',
  accent: '#F9F6F1',
  price: 0,
  duration: '',
  tag: '',
  image: '',
  desc: '',
};

type IncludeRow = { id: string; value: string };

const BOOKING_STATUS_LABEL: Record<Spa2OccasionBookingStatus, string> = {
  new: 'Mới',
  confirmed: 'Đã xác nhận',
  completed: 'Đã hoàn tất',
  cancelled: 'Đã huỷ',
};

const BOOKING_STATUS_COLOR: Record<
  Spa2OccasionBookingStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  confirmed: 'warning',
  completed: 'success',
  cancelled: 'error',
};

const BOOKING_STATUS_OPTIONS: Spa2OccasionBookingStatus[] = [
  'new',
  'confirmed',
  'completed',
  'cancelled',
];

type BookingStatusFilter = Spa2OccasionBookingStatus | 'all';

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

// Mirrors a single package's "quick view" SoftCard on the public page.
function PackagePreviewCard({
  icon,
  label,
  title,
  color,
  accent,
  price,
  duration,
  tag,
}: Spa2OccasionPackage) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        borderTop: `3px solid ${color}`,
        boxShadow: 'none',
        border: `1px solid ${SPA2_CREAM_DARK}`,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon={icon || 'solar:gift-bold-duotone'} width={20} sx={{ color }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
            {label || 'Nhãn gói'}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {title || 'Tên gói'}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontWeight: 700, color, fontSize: 14 }}>{formatVND(price)}</Typography>
        <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>{duration}</Typography>
      </Stack>
      {tag && (
        <Chip
          label={tag}
          size="small"
          sx={{ mt: 1.5, bgcolor: color, color: 'white', fontWeight: 600 }}
        />
      )}
    </Card>
  );
}

// Mirrors a single package's card exactly as rendered in the "Tất cả gói dịp
// đặc biệt" grid/list on the public page (see Spa2SpecialOccasionsPageView in
// src/sections/spa2/view/spa2-content-pages3.tsx): a soft card with a top
// color accent, icon + label + duration, a truncated description, then the
// price — no tag chip, no full "Bao gồm" breakdown (that's the detail view).
function PackageCardPreview({
  icon,
  label,
  color,
  accent,
  duration,
  desc,
  price,
}: Spa2OccasionPackage) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: '0 8px 24px rgba(31,42,40,0.05)',
        borderTop: `3px solid ${color}`,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon={icon || 'solar:gift-bold-duotone'} width={20} sx={{ color }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
            {label || 'Nhãn gói'}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{duration}</Typography>
        </Box>
      </Stack>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5, lineHeight: 1.6 }}>
        {(desc || 'Mô tả gói…').slice(0, 80)}...
      </Typography>
      <Typography sx={{ fontWeight: 700, color }}>{formatVND(price)}</Typography>
    </Card>
  );
}

function CheckItemPreview({ children }: { children: ReactNode }) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="flex-start">
      <Iconify
        icon="solar:check-circle-bold"
        width={15}
        sx={{ color: SPA2_TEAL, flexShrink: 0, mt: '2px' }}
      />
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.6 }}>
        {children}
      </Typography>
    </Stack>
  );
}

// Mirrors the full detailed package view (image + tag/title overlay, icon +
// title + desc, price + duration, "Bao gồm" checklist) exactly as rendered
// for the active tab on the public page.
function PackageDetailPreview({
  icon,
  label,
  title,
  color,
  accent,
  price,
  duration,
  tag,
  image,
  desc,
  includes,
}: Spa2OccasionPackage) {
  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          aspectRatio: '4/3',
          bgcolor: SPA2_CREAM_DARK,
          boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
        }}
      >
        {image && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 14, left: 14, right: 14 }}>
          {tag && (
            <Chip
              label={tag}
              size="small"
              sx={{ bgcolor: color, color: 'white', fontWeight: 700, mb: 0.75 }}
            />
          )}
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 17 }}>
            {title || 'Tên gói'}
          </Typography>
        </Box>
      </Box>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: `2px solid ${color}`,
          }}
        >
          <Iconify icon={icon || 'solar:gift-bold-duotone'} width={20} sx={{ color }} />
        </Box>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
          {title || 'Tên gói'}
        </Typography>
      </Stack>
      <Typography sx={{ color: 'text.secondary', fontSize: 13, lineHeight: 1.7 }}>
        {desc || 'Mô tả gói…'}
      </Typography>
      <Stack direction="row" spacing={1.5} alignItems="baseline">
        <Typography sx={{ fontWeight: 700, color, fontSize: 20 }}>{formatVND(price)}</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{duration}</Typography>
      </Stack>
      {label && (
        <Chip
          size="small"
          label={label}
          sx={{ alignSelf: 'flex-start', bgcolor: SPA2_CREAM_DARK, fontWeight: 600 }}
        />
      )}
      {includes.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 12.5 }}>
            Bao gồm:
          </Typography>
          <Stack spacing={0.75}>
            {includes.map((inc) => (
              <CheckItemPreview key={inc}>{inc}</CheckItemPreview>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
}

export function Spa2SpecialOccasionsManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SpecialOccasionsBanner>(() => ({
    ...spa2SpecialOccasionsBanner,
    image: { ...spa2SpecialOccasionsBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'categories' | 'packages' | 'bookings' | 'preview'>(
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

  // ---- Categories ----
  const [categories, setCategories] = useState<Spa2OccasionCategory[]>(() =>
    spa2OccasionCategories.map((c) => ({ ...c }))
  );
  const realCategories = useMemo(() => categories.filter((c) => c.value !== 'all'), [categories]);
  const updateCategory = (idx: number, patch: Partial<Spa2OccasionCategory>) => {
    setCategories((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
    markDirty();
  };
  const addCategory = () => {
    setCategories((prev) => [...prev, { value: `cat-${prev.length}`, label: '' }]);
    markDirty();
  };
  const removeCategory = (idx: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };
  const reorderCategories = (next: (Spa2OccasionCategory & { id: string })[]) => {
    const cleaned = next.map(({ id, ...rest }) => rest);
    setCategories((prev) => {
      const allEntry = prev.find((c) => c.value === 'all');
      return allEntry ? [allEntry, ...cleaned] : cleaned;
    });
    markDirty();
  };

  // ---- Packages ----
  const [packages, setPackages] = useState<Spa2OccasionPackage[]>(() =>
    spa2OccasionPackages.map((p) => ({ ...p, includes: [...p.includes] }))
  );
  const [packageFilter, setPackageFilter] = useState('all');
  const filteredPackages = useMemo(
    () =>
      packageFilter === 'all' ? packages : packages.filter((p) => p.category === packageFilter),
    [packages, packageFilter]
  );
  const [packageForm, setPackageForm] = useState(EMPTY_PACKAGE_FORM);
  const [packageIncludes, setPackageIncludes] = useState<IncludeRow[]>([]);
  const [packageDialog, setPackageDialog] = useState(false);
  const [packageEditId, setPackageEditId] = useState<string | null>(null);
  const [packageDeleteId, setPackageDeleteId] = useState<string | null>(null);
  const [packageViewItem, setPackageViewItem] = useState<Spa2OccasionPackage | null>(null);

  const openCreatePackage = () => {
    setPackageForm({ ...EMPTY_PACKAGE_FORM, category: realCategories[0]?.value ?? 'wedding' });
    setPackageIncludes([]);
    setPackageEditId(null);
    setPackageDialog(true);
  };
  const openEditPackage = (item: Spa2OccasionPackage) => {
    setPackageForm({
      category: item.category,
      icon: item.icon,
      label: item.label,
      title: item.title,
      color: item.color,
      accent: item.accent,
      price: item.price,
      duration: item.duration,
      tag: item.tag,
      image: item.image,
      desc: item.desc,
    });
    setPackageIncludes(item.includes.map((inc) => ({ id: uuidv4(), value: inc })));
    setPackageEditId(item.id);
    setPackageDialog(true);
  };
  const addPackageInclude = () => {
    setPackageIncludes((prev) => [...prev, { id: uuidv4(), value: '' }]);
  };
  const updatePackageInclude = (id: string, value: string) => {
    setPackageIncludes((prev) => prev.map((row) => (row.id === id ? { ...row, value } : row)));
  };
  const removePackageInclude = (id: string) => {
    setPackageIncludes((prev) => prev.filter((row) => row.id !== id));
  };
  const reorderPackageIncludes = (next: IncludeRow[]) => {
    setPackageIncludes(next);
  };
  const packageIncludesPreview = packageIncludes.map((row) => row.value.trim()).filter(Boolean);
  const previewPackage: Spa2OccasionPackage = {
    id: packageEditId ?? 'preview',
    category: packageForm.category,
    icon: packageForm.icon,
    label: packageForm.label,
    title: packageForm.title,
    color: packageForm.color,
    accent: packageForm.accent,
    price: Number(packageForm.price),
    duration: packageForm.duration,
    tag: packageForm.tag,
    image: packageForm.image,
    desc: packageForm.desc,
    includes: packageIncludesPreview,
  };
  const submitPackage = () => {
    const next = {
      category: packageForm.category,
      icon: packageForm.icon,
      label: packageForm.label,
      title: packageForm.title,
      color: packageForm.color,
      accent: packageForm.accent,
      price: Number(packageForm.price),
      duration: packageForm.duration,
      tag: packageForm.tag,
      image: packageForm.image,
      desc: packageForm.desc,
      includes: packageIncludesPreview,
    };
    if (packageEditId) {
      setPackages((prev) => prev.map((p) => (p.id === packageEditId ? { ...p, ...next } : p)));
    } else {
      setPackages((prev) => [...prev, withId(next)]);
    }
    setPackageDialog(false);
    markDirty();
  };
  const confirmDeletePackage = () => {
    setPackages((prev) => prev.filter((p) => p.id !== packageDeleteId));
    setPackageDeleteId(null);
    markDirty();
  };
  const reorderPackages = (next: Spa2OccasionPackage[]) => {
    if (packageFilter === 'all') {
      setPackages(next);
    } else {
      // Filtered view: splice the reordered subset back into its original
      // slots within the full list so packages outside the current filter
      // keep their relative position.
      const queue = [...next];
      const nextIds = new Set(next.map((p) => p.id));
      setPackages((prev) => prev.map((p) => (nextIds.has(p.id) ? queue.shift()! : p)));
    }
    markDirty();
  };

  // ---- Đặt gói dịp đặc biệt (bookings) ----
  const [bookings, setBookings] = useState<Spa2OccasionBooking[]>(SPA2_OCCASION_BOOKINGS);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatusFilter>('all');
  const [viewBooking, setViewBooking] = useState<Spa2OccasionBooking | null>(null);
  const bookingTable = useTable({ defaultRowsPerPage: 5 });

  const filteredBookings = bookings.filter((b) => {
    const q = bookingSearch.toLowerCase();
    const matchSearch =
      !q ||
      b.customer.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.packageTitle.toLowerCase().includes(q) ||
      b.phone.includes(bookingSearch);
    const matchStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    return matchSearch && matchStatus;
  });

  const bookingCounts = {
    all: bookings.length,
    new: bookings.filter((b) => b.status === 'new').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  const handleSetBookingStatus = (id: number, status: Spa2OccasionBookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setViewBooking((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SpecialOccasionsBanner, image: { ...spa2SpecialOccasionsBanner.image } });
    setCategories(spa2OccasionCategories.map((c) => ({ ...c })));
    setPackages(spa2OccasionPackages.map((p) => ({ ...p, includes: [...p.includes] })));
    setBookings(SPA2_OCCASION_BOOKINGS);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('special_occasions.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.special_occasions')}
      publicPath={paths.spa2.specialOccasions}
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
          label={t('special_occasions.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('special_occasions.categories_section')}
          icon={<Iconify icon="solar:folder-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="packages"
          label={t('special_occasions.packages_section')}
          icon={<Iconify icon="solar:gift-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="bookings"
          label="Đặt gói dịp đặc biệt"
          icon={<Iconify icon="solar:calendar-mark-bold-duotone" width={20} />}
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
              title={t('special_occasions.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('special_occasions.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('special_occasions.banner_image_help')}
                />
                <TextField
                  label={t('special_occasions.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('special_occasions.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('special_occasions.banner_subtitle')}
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
                <Spa2ContentPageHero3
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

      {/* Categories */}
      {tab === 'categories' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('special_occasions.categories_section')}
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addCategory}
            >
              {t('special_occasions.add_category_btn')}
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {categories
              .filter((c) => c.value === 'all')
              .map((c) => (
                <Stack key={c.value} direction="row" spacing={1.5} alignItems="center">
                  <Chip
                    size="small"
                    label={t('special_occasions.category_all_locked')}
                    sx={{ bgcolor: SPA2_CREAM_DARK, minWidth: 100 }}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label={t('special_occasions.form_category_label')}
                    value={c.label}
                    onChange={(e) =>
                      updateCategory(
                        categories.findIndex((cat) => cat.value === c.value),
                        { label: e.target.value }
                      )
                    }
                  />
                </Stack>
              ))}
            <Spa2SortableGrid
              items={realCategories.map((c) => ({ ...c, id: c.value }))}
              onReorder={reorderCategories}
            >
              <Stack spacing={1.5}>
                {realCategories.map((c) => (
                  <Spa2SortableItem key={c.value} id={c.value}>
                    {(sortable) => (
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Spa2DragHandle sortable={sortable} />
                        <Chip
                          size="small"
                          label={c.value}
                          sx={{ bgcolor: SPA2_CREAM_DARK, minWidth: 100 }}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          label={t('special_occasions.form_category_label')}
                          value={c.label}
                          onChange={(e) =>
                            updateCategory(
                              categories.findIndex((cat) => cat.value === c.value),
                              { label: e.target.value }
                            )
                          }
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() =>
                            removeCategory(categories.findIndex((cat) => cat.value === c.value))
                          }
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    )}
                  </Spa2SortableItem>
                ))}
              </Stack>
            </Spa2SortableGrid>
          </Stack>
        </Card>
      )}

      {/* Packages */}
      {tab === 'packages' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
            flexWrap="wrap"
            useFlexGap
            gap={1}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('special_occasions.packages_section')}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                select
                size="small"
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                {categories.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreatePackage}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('special_occasions.add_package_btn')}
              </Button>
            </Stack>
          </Stack>
          {packageFilter !== 'all' && (
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('special_occasions.reorder_filter_hint')}
            </Typography>
          )}
          <Spa2SortableGrid items={filteredPackages} onReorder={reorderPackages}>
            <Grid container spacing={2}>
              {filteredPackages.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box
                        onClick={() => setPackageViewItem(item)}
                        sx={{ position: 'relative', cursor: 'pointer' }}
                      >
                        <PackagePreviewCard {...item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Box onClick={(e) => e.stopPropagation()}>
                            <Spa2DragHandle
                              sortable={sortable}
                              sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                            />
                          </Box>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditPackage(item);
                            }}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPackageDeleteId(item.id);
                            }}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </Card>
      )}

      {/* Đặt gói dịp đặc biệt (bookings) */}
      {tab === 'bookings' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="solar:calendar-mark-bold-duotone"
                width={22}
                sx={{ color: SPA2_TEAL }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Đặt gói dịp đặc biệt
              </Typography>
            </Stack>
          </Box>

          {/* Thống kê */}
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack spacing={2} direction="row" sx={{ py: 2, px: 1 }}>
              <Spa2ListAnalytic
                title="Tất cả"
                total={bookingCounts.all}
                percent={100}
                icon="solar:calendar-mark-bold-duotone"
                color={SPA2_TEAL}
                unitLabel="lượt đặt"
                active={bookingStatusFilter === 'all'}
                onClick={() => {
                  setBookingStatusFilter('all');
                  bookingTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={BOOKING_STATUS_LABEL.new}
                total={bookingCounts.new}
                percent={bookingCounts.all ? (bookingCounts.new / bookingCounts.all) * 100 : 0}
                icon="solar:bell-bold-duotone"
                color="#2E90FA"
                unitLabel="lượt đặt"
                active={bookingStatusFilter === 'new'}
                onClick={() => {
                  setBookingStatusFilter('new');
                  bookingTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={BOOKING_STATUS_LABEL.confirmed}
                total={bookingCounts.confirmed}
                percent={
                  bookingCounts.all ? (bookingCounts.confirmed / bookingCounts.all) * 100 : 0
                }
                icon="solar:check-circle-bold-duotone"
                color="#F79009"
                unitLabel="lượt đặt"
                active={bookingStatusFilter === 'confirmed'}
                onClick={() => {
                  setBookingStatusFilter('confirmed');
                  bookingTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={BOOKING_STATUS_LABEL.completed}
                total={bookingCounts.completed}
                percent={
                  bookingCounts.all ? (bookingCounts.completed / bookingCounts.all) * 100 : 0
                }
                icon="solar:diploma-bold-duotone"
                color="#12B76A"
                unitLabel="lượt đặt"
                active={bookingStatusFilter === 'completed'}
                onClick={() => {
                  setBookingStatusFilter('completed');
                  bookingTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={BOOKING_STATUS_LABEL.cancelled}
                total={bookingCounts.cancelled}
                percent={
                  bookingCounts.all ? (bookingCounts.cancelled / bookingCounts.all) * 100 : 0
                }
                icon="solar:close-circle-bold-duotone"
                color="#F04438"
                unitLabel="lượt đặt"
                active={bookingStatusFilter === 'cancelled'}
                onClick={() => {
                  setBookingStatusFilter('cancelled');
                  bookingTable.onResetPage();
                }}
              />
            </Stack>
          </Scrollbar>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder="Tìm theo tên, SĐT, email hoặc tên gói..."
              value={bookingSearch}
              onChange={(e) => {
                setBookingSearch(e.target.value);
                bookingTable.onResetPage();
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
              value={bookingStatusFilter}
              onChange={(_, v: BookingStatusFilter) => {
                setBookingStatusFilter(v);
                bookingTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${bookingCounts.all})`} />
              <Tab value="new" label={`${BOOKING_STATUS_LABEL.new} (${bookingCounts.new})`} />
              <Tab
                value="confirmed"
                label={`${BOOKING_STATUS_LABEL.confirmed} (${bookingCounts.confirmed})`}
              />
              <Tab
                value="completed"
                label={`${BOOKING_STATUS_LABEL.completed} (${bookingCounts.completed})`}
              />
              <Tab
                value="cancelled"
                label={`${BOOKING_STATUS_LABEL.cancelled} (${bookingCounts.cancelled})`}
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Gói dịp đặc biệt</TableCell>
                  <TableCell>Ngày sự kiện</TableCell>
                  <TableCell>Ngày đặt</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings
                  .slice(
                    bookingTable.page * bookingTable.rowsPerPage,
                    bookingTable.page * bookingTable.rowsPerPage + bookingTable.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.phone} · {item.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Typography variant="body2">{item.packageTitle}</Typography>
                          <Chip
                            size="small"
                            label={item.packageId}
                            sx={{ bgcolor: SPA2_CREAM_DARK }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.eventDate}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.createdAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={BOOKING_STATUS_LABEL[item.status]}
                          color={BOOKING_STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => setViewBooking(item)}>
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredBookings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filteredBookings.length}
            page={bookingTable.page}
            rowsPerPage={bookingTable.rowsPerPage}
            onPageChange={bookingTable.onChangePage}
            onRowsPerPageChange={bookingTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SpecialOccasionsPageView banner={banner} packages={packages} />
        </Box>
      )}

      {/* Package add/edit dialog */}
      <Dialog open={packageDialog} onClose={() => setPackageDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {packageEditId ? t('common.edit') : t('special_occasions.add_package_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Spa2SimpleImageField
                  label={t('special_occasions.form_package_image')}
                  value={packageForm.image}
                  onChange={(v) => setPackageForm((p) => ({ ...p, image: v }))}
                  height={160}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label={t('special_occasions.form_package_category')}
                    fullWidth
                    size="small"
                    value={packageForm.category}
                    onChange={(e) => setPackageForm((p) => ({ ...p, category: e.target.value }))}
                  >
                    {realCategories.map((c) => (
                      <MenuItem key={c.value} value={c.value}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={t('special_occasions.form_icon')}
                    fullWidth
                    size="small"
                    value={packageForm.icon}
                    onChange={(e) => setPackageForm((p) => ({ ...p, icon: e.target.value }))}
                    helperText="solar:gift-bold-duotone"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('special_occasions.form_package_label')}
                    fullWidth
                    size="small"
                    value={packageForm.label}
                    onChange={(e) => setPackageForm((p) => ({ ...p, label: e.target.value }))}
                  />
                  <TextField
                    label={t('special_occasions.form_package_title')}
                    fullWidth
                    size="small"
                    value={packageForm.title}
                    onChange={(e) => setPackageForm((p) => ({ ...p, title: e.target.value }))}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('special_occasions.form_package_color')}
                    fullWidth
                    size="small"
                    value={packageForm.color}
                    onChange={(e) => setPackageForm((p) => ({ ...p, color: e.target.value }))}
                    helperText="#2E8B7A"
                  />
                  <TextField
                    label={t('special_occasions.form_package_accent')}
                    fullWidth
                    size="small"
                    value={packageForm.accent}
                    onChange={(e) => setPackageForm((p) => ({ ...p, accent: e.target.value }))}
                    helperText="#F9F6F1"
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('special_occasions.form_package_price')}
                    type="number"
                    fullWidth
                    size="small"
                    value={packageForm.price}
                    onChange={(e) =>
                      setPackageForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                  />
                  <TextField
                    label={t('special_occasions.form_package_duration')}
                    fullWidth
                    size="small"
                    value={packageForm.duration}
                    onChange={(e) => setPackageForm((p) => ({ ...p, duration: e.target.value }))}
                  />
                </Stack>
                <TextField
                  label={t('special_occasions.form_package_tag')}
                  fullWidth
                  size="small"
                  value={packageForm.tag}
                  onChange={(e) => setPackageForm((p) => ({ ...p, tag: e.target.value }))}
                />
                <TextField
                  label={t('special_occasions.form_package_desc')}
                  fullWidth
                  multiline
                  minRows={2}
                  value={packageForm.desc}
                  onChange={(e) => setPackageForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Nội dung gói (&quot;Bao gồm&quot;)
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                      onClick={addPackageInclude}
                    >
                      Thêm mục
                    </Button>
                  </Stack>
                  {packageIncludes.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Chưa có mục nào — nhấn &quot;Thêm mục&quot; để bắt đầu.
                    </Typography>
                  )}
                  <Spa2SortableGrid items={packageIncludes} onReorder={reorderPackageIncludes}>
                    <Stack spacing={1}>
                      {packageIncludes.map((row) => (
                        <Spa2SortableItem key={row.id} id={row.id}>
                          {(sortable) => (
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Spa2DragHandle sortable={sortable} />
                              <TextField
                                fullWidth
                                size="small"
                                value={row.value}
                                onChange={(e) => updatePackageInclude(row.id, e.target.value)}
                                placeholder="VD: Massage thư giãn 60 phút"
                              />
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removePackageInclude(row.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                              </IconButton>
                            </Stack>
                          )}
                        </Spa2SortableItem>
                      ))}
                    </Stack>
                  </Spa2SortableGrid>
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Xem trước dạng thẻ (trong danh sách gói)
                  </Typography>
                  <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                    <PackageCardPreview {...previewPackage} />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    Xem trước chi tiết (khi bấm vào gói)
                  </Typography>
                  <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                    <PackageDetailPreview {...previewPackage} />
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPackage}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {packageEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Package detail-view dialog (click a card in the list) */}
      <Dialog
        open={!!packageViewItem}
        onClose={() => setPackageViewItem(null)}
        maxWidth="xs"
        fullWidth
      >
        {packageViewItem && (
          <DialogContent sx={{ p: 3 }}>
            <IconButton
              onClick={() => setPackageViewItem(null)}
              sx={{ position: 'absolute', top: 10, right: 10 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <PackageDetailPreview {...packageViewItem} />
          </DialogContent>
        )}
      </Dialog>

      <ConfirmDialog
        open={!!packageDeleteId}
        onClose={() => setPackageDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePackage}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Booking view-detail dialog */}
      <Dialog open={!!viewBooking} onClose={() => setViewBooking(null)} maxWidth="xs" fullWidth>
        {viewBooking && (
          <>
            <DialogTitle>Chi tiết đặt gói</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Khách hàng
                  </Typography>
                  <Typography variant="subtitle2">{viewBooking.customer}</Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Số điện thoại
                    </Typography>
                    <Typography variant="body2">{viewBooking.phone}</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2">{viewBooking.email}</Typography>
                  </Box>
                </Stack>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Gói dịp đặc biệt
                  </Typography>
                  <Typography variant="body2">
                    {viewBooking.packageTitle} ({viewBooking.packageId})
                  </Typography>
                </Box>
                <Stack direction="row" spacing={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Ngày sự kiện
                    </Typography>
                    <Typography variant="body2">{viewBooking.eventDate}</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Ngày đặt
                    </Typography>
                    <Typography variant="body2">{viewBooking.createdAt}</Typography>
                  </Box>
                </Stack>
                {viewBooking.note && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Ghi chú
                    </Typography>
                    <Typography variant="body2">{viewBooking.note}</Typography>
                  </Box>
                )}
                <TextField
                  select
                  label="Trạng thái"
                  size="small"
                  fullWidth
                  value={viewBooking.status}
                  onChange={(e) =>
                    handleSetBookingStatus(
                      viewBooking.id,
                      e.target.value as Spa2OccasionBookingStatus
                    )
                  }
                >
                  {BOOKING_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {BOOKING_STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewBooking(null)}>{t('common.cancel')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Spa2ManageShell>
  );
}
