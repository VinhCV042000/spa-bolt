import type { ReactNode } from 'react';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Switch from '@mui/material/Switch';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2MembershipTiers,
  spa2MembershipBanner,
  SPA2_MEMBERSHIP_SIGNUPS,
  spa2MembershipCompareRows,
  type Spa2AdjustableImage,
  type Spa2MembershipTier,
  type Spa2MembershipSignup,
  type Spa2MembershipSignupStatus,
  type Spa2MembershipCompareRow,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  Spa2ContentPageHero,
  Spa2MembershipPageView,
} from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2MembershipPageView renders on the public /spa2/membership page: the
// page banner, the pricing tier cards + comparison table (spa2MembershipTiers/
// spa2MembershipCompareRows) and the member sign-up ledger - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The "banner" tab reuses
// Spa2ContentPageHero (the same hero the public page renders) and the
// "preview" tab reuses Spa2MembershipPageView itself, fed with the
// in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_TIER_FORM = {
  name: '',
  price: 0,
  color: '#2E8B7A',
  accent: '#F5F5F5',
  desc: '',
  perksInput: '',
  notIncludedInput: '',
  hot: false,
};

const EMPTY_SIGNUP_FORM: {
  customer: string;
  phone: string;
  email: string;
  tier: string;
  billing: 'monthly' | 'yearly';
  joinedAt: string;
  status: Spa2MembershipSignupStatus;
  note: string;
} = {
  customer: '',
  phone: '',
  email: '',
  tier: '',
  billing: 'monthly',
  joinedAt: new Date().toISOString().slice(0, 10),
  status: 'active',
  note: '',
};

const SIGNUP_STATUS_COLOR: Record<Spa2MembershipSignupStatus, 'success' | 'default' | 'error'> = {
  active: 'success',
  expired: 'default',
  cancelled: 'error',
};

type SignupStatusFilter = Spa2MembershipSignupStatus | 'all';

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

function TierPreviewCard({
  name,
  price,
  color,
  accent,
  desc,
  perks,
  notIncluded,
  hot,
}: {
  name: string;
  price: number;
  color: string;
  accent: string;
  desc: string;
  perks: string[];
  notIncluded: string[];
  hot: boolean;
}) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      {hot && (
        <Box
          sx={{
            bgcolor: SPA2_TEAL,
            color: 'white',
            textAlign: 'center',
            py: 0.75,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          PHỔ BIẾN NHẤT
        </Box>
      )}
      <Box sx={{ bgcolor: accent || SPA2_CREAM, p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              bgcolor: color || SPA2_TEAL,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon="solar:crown-bold" width={22} sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h6" sx={{ color: SPA2_INK, fontWeight: 700 }}>
            {name || 'Tên hạng thẻ'}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
          {desc || 'Mô tả hạng thẻ…'}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
          {price === 0 ? 'Miễn phí' : formatVND(price)}
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Stack spacing={1.25}>
          {perks.map((p) => (
            <Stack key={p} direction="row" spacing={1.5} alignItems="center">
              <Iconify
                icon="solar:check-circle-bold"
                width={16}
                sx={{ color: SPA2_TEAL, flexShrink: 0 }}
              />
              <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{p}</Typography>
            </Stack>
          ))}
          {notIncluded.map((p) => (
            <Stack key={p} direction="row" spacing={1.5} alignItems="center">
              <Iconify
                icon="solar:close-circle-bold"
                width={16}
                sx={{ color: 'text.disabled', flexShrink: 0 }}
              />
              <Typography sx={{ fontSize: 13.5, color: 'text.disabled' }}>{p}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Spa2SoftCard>
  );
}

function ComparePreviewTable({
  tiers,
  rows,
}: {
  tiers: Spa2MembershipTier[];
  rows: Spa2MembershipCompareRow[];
}) {
  const columns = (['silver', 'gold', 'platinum'] as const).map((key) => ({
    key,
    tier: tiers.find((t) => t.id === key),
  }));
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', minWidth: 420 }}>
        <Box component="thead">
          <Box component="tr" sx={{ bgcolor: SPA2_INK }}>
            <Box
              component="th"
              sx={{ p: 1.5, textAlign: 'left', color: 'white', fontSize: 12, fontWeight: 600 }}
            >
              Quyền lợi
            </Box>
            {columns.map((c) => (
              <Box
                component="th"
                key={c.key}
                sx={{
                  p: 1.5,
                  textAlign: 'center',
                  color: c.tier?.hot ? SPA2_TEAL_LIGHT : 'rgba(255,255,255,0.8)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {c.tier?.name ?? c.key}
              </Box>
            ))}
          </Box>
        </Box>
        <Box component="tbody">
          {rows.length === 0 && (
            <Box component="tr">
              <Box
                component="td"
                colSpan={4}
                sx={{ p: 2, textAlign: 'center', fontSize: 12.5, color: 'text.disabled' }}
              >
                Chưa có dòng so sánh nào.
              </Box>
            </Box>
          )}
          {rows.map((row, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box
              component="tr"
              key={i}
              sx={{ bgcolor: i % 2 ? SPA2_CREAM : 'white', '&:hover': { bgcolor: '#F0FAF8' } }}
            >
              <Box
                component="td"
                sx={{ p: 1.25, fontSize: 12.5, color: SPA2_INK, fontWeight: 500 }}
              >
                {row.feature || '—'}
              </Box>
              {(['silver', 'gold', 'platinum'] as const).map((key) => (
                <Box
                  component="td"
                  key={key}
                  sx={{
                    p: 1.25,
                    textAlign: 'center',
                    fontSize: 12.5,
                    color: row[key] === '—' ? 'text.disabled' : 'text.secondary',
                  }}
                >
                  {row[key] === '✓' ? (
                    <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                  ) : (
                    row[key] || '—'
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export function Spa2MembershipManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2MembershipBanner,
    image: { ...spa2MembershipBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'tiers' | 'signups' | 'preview'>('banner');
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

  // ---- Tiers ----
  const [tiers, setTiers] = useState<Spa2MembershipTier[]>(() =>
    spa2MembershipTiers.map((tItem) => ({ ...tItem }))
  );
  const [tierForm, setTierForm] = useState(EMPTY_TIER_FORM);
  const [tierDialog, setTierDialog] = useState(false);
  const [tierEditId, setTierEditId] = useState<string | null>(null);
  const [tierDeleteId, setTierDeleteId] = useState<string | null>(null);

  const openCreateTier = () => {
    setTierForm(EMPTY_TIER_FORM);
    setTierEditId(null);
    setTierDialog(true);
  };

  const openEditTier = (item: Spa2MembershipTier) => {
    setTierForm({
      name: item.name,
      price: item.price,
      color: item.color,
      accent: item.accent,
      desc: item.desc,
      perksInput: item.perks.join(', '),
      notIncludedInput: item.notIncluded.join(', '),
      hot: item.hot,
    });
    setTierEditId(item.id);
    setTierDialog(true);
  };

  const tierPerksList = useMemo(
    () =>
      tierForm.perksInput
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
    [tierForm.perksInput]
  );
  const tierNotIncludedList = useMemo(
    () =>
      tierForm.notIncludedInput
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean),
    [tierForm.notIncludedInput]
  );

  const submitTier = () => {
    const next = {
      name: tierForm.name,
      price: Number(tierForm.price),
      color: tierForm.color,
      accent: tierForm.accent,
      desc: tierForm.desc,
      perks: tierPerksList,
      notIncluded: tierNotIncludedList,
      hot: tierForm.hot,
    };
    if (tierEditId) {
      setTiers((prev) => prev.map((it) => (it.id === tierEditId ? { ...it, ...next } : it)));
    } else {
      setTiers((prev) => [...prev, withId(next)]);
    }
    setTierDialog(false);
    markDirty();
  };

  const confirmDeleteTier = () => {
    setTiers((prev) => prev.filter((it) => it.id !== tierDeleteId));
    setTierDeleteId(null);
    markDirty();
  };

  const tierStats = useMemo(
    () => ({
      total: tiers.length,
      hot: tiers.filter((it) => it.hot).length,
      free: tiers.filter((it) => it.price === 0).length,
    }),
    [tiers]
  );

  // ---- Compare table ----
  const [compareRows, setCompareRows] = useState<Spa2MembershipCompareRow[]>(() => [
    ...spa2MembershipCompareRows,
  ]);

  const updateCompareRow = (idx: number, key: keyof Spa2MembershipCompareRow, value: string) => {
    setCompareRows((prev) => prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row)));
    markDirty();
  };
  const addCompareRow = () => {
    setCompareRows((prev) => [...prev, { feature: '', silver: '', gold: '', platinum: '' }]);
    markDirty();
  };
  const removeCompareRow = (idx: number) => {
    setCompareRows((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };
  const moveCompareRow = (idx: number, direction: -1 | 1) => {
    setCompareRows((prev) => {
      const next = [...prev];
      const target = idx + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
    markDirty();
  };

  // ---- Signups ----
  const [signups, setSignups] = useState<Spa2MembershipSignup[]>(SPA2_MEMBERSHIP_SIGNUPS);
  const [signupFilter, setSignupFilter] = useState<SignupStatusFilter>('all');
  const [signupSearch, setSignupSearch] = useState('');
  const [signupDeleteId, setSignupDeleteId] = useState<number | null>(null);
  const [signupDetailId, setSignupDetailId] = useState<number | null>(null);
  const [signupCreateDialog, setSignupCreateDialog] = useState(false);
  const [signupForm, setSignupForm] = useState(EMPTY_SIGNUP_FORM);
  const table = useTable({ defaultRowsPerPage: 5 });

  const handleSetSignupStatus = useCallback((id: number, status: Spa2MembershipSignupStatus) => {
    setSignups((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    markDirty();
  }, []);

  const confirmDeleteSignup = () => {
    setSignups((prev) => prev.filter((s) => s.id !== signupDeleteId));
    if (signupDetailId === signupDeleteId) setSignupDetailId(null);
    setSignupDeleteId(null);
    markDirty();
  };

  const filteredSignups = useMemo(
    () =>
      signups.filter((s) => {
        const matchStatus = signupFilter === 'all' || s.status === signupFilter;
        const q = signupSearch.trim().toLowerCase();
        const matchSearch =
          !q || s.customer.toLowerCase().includes(q) || s.phone.toLowerCase().includes(q);
        return matchStatus && matchSearch;
      }),
    [signups, signupFilter, signupSearch]
  );

  const signupCounts = useMemo(
    () => ({
      all: signups.length,
      active: signups.filter((s) => s.status === 'active').length,
      expired: signups.filter((s) => s.status === 'expired').length,
      cancelled: signups.filter((s) => s.status === 'cancelled').length,
    }),
    [signups]
  );

  const signupDetail = useMemo(
    () => signups.find((s) => s.id === signupDetailId) ?? null,
    [signups, signupDetailId]
  );

  const openCreateSignup = () => {
    setSignupForm(EMPTY_SIGNUP_FORM);
    setSignupCreateDialog(true);
  };

  const submitCreateSignup = () => {
    const newId = Math.max(0, ...signups.map((s) => s.id)) + 1;
    setSignups((prev) => [
      ...prev,
      {
        id: newId,
        customer: signupForm.customer,
        phone: signupForm.phone,
        email: signupForm.email,
        tier: signupForm.tier,
        billing: signupForm.billing,
        joinedAt: signupForm.joinedAt,
        status: signupForm.status,
        note: signupForm.note,
      },
    ]);
    setSignupCreateDialog(false);
    markDirty();
  };

  const updateSignupDetail = (patch: Partial<Spa2MembershipSignup>) => {
    if (signupDetailId === null) return;
    setSignups((prev) => prev.map((s) => (s.id === signupDetailId ? { ...s, ...patch } : s)));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2MembershipBanner, image: { ...spa2MembershipBanner.image } });
    setTiers(spa2MembershipTiers.map((tItem) => ({ ...tItem })));
    setCompareRows([...spa2MembershipCompareRows]);
    setSignups(SPA2_MEMBERSHIP_SIGNUPS);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('membership.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.membership')}
      publicPath={paths.spa2.membership}
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
          label={t('membership.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tiers"
          label={t('membership.tiers_section')}
          icon={<Iconify icon="solar:crown-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="signups"
          label={t('membership.signups_section')}
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

      {/* Banner */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('membership.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('membership.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('membership.banner_image_help')}
                />
                <TextField
                  label={t('membership.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('membership.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('membership.banner_subtitle')}
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

      {/* Tiers */}
      {tab === 'tiers' && (
        <Stack spacing={3}>
          <Card sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
            >
              {t('membership.stat_overview')}
            </Typography>
            <Scrollbar sx={{ maxHeight: 120 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                spacing={2}
                sx={{ py: 1 }}
              >
                <Spa2ListAnalytic
                  icon="solar:crown-bold-duotone"
                  title={t('common.all')}
                  total={tierStats.total}
                  percent={100}
                  unitLabel={t('membership.unit_label')}
                />
                <Spa2ListAnalytic
                  icon="solar:star-bold-duotone"
                  title={t('membership.stat_hot')}
                  total={tierStats.hot}
                  percent={tierStats.total ? (tierStats.hot / tierStats.total) * 100 : 0}
                  unitLabel={t('membership.unit_label')}
                />
                <Spa2ListAnalytic
                  icon="solar:gift-bold-duotone"
                  title={t('membership.stat_free')}
                  total={tierStats.free}
                  percent={tierStats.total ? (tierStats.free / tierStats.total) * 100 : 0}
                  unitLabel={t('membership.unit_label')}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('membership.tiers_section')}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateTier}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('membership.add_tier_btn')}
              </Button>
            </Stack>
            <Grid container spacing={2.5}>
              {tiers.map((item) => (
                <Grid key={item.id} xs={12} md={4}>
                  <Box sx={{ position: 'relative' }}>
                    <TierPreviewCard {...item} />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: item.hot ? 40 : 8, right: 8 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => openEditTier(item)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:pen-bold" width={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setTierDeleteId(item.id)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Stack>
                  </Box>
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
                {t('membership.compare_section')}
              </Typography>
              <Button
                size="small"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={addCompareRow}
              >
                {t('membership.add_row_btn')}
              </Button>
            </Stack>
            <Grid container spacing={3}>
              <Grid xs={12} md={7}>
                <Stack spacing={1.5}>
                  {compareRows.map((row, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Stack key={idx} direction="row" spacing={1} alignItems="center">
                      <Stack spacing={0}>
                        <IconButton
                          size="small"
                          disabled={idx === 0}
                          onClick={() => moveCompareRow(idx, -1)}
                        >
                          <Iconify icon="solar:alt-arrow-up-bold" width={14} />
                        </IconButton>
                        <IconButton
                          size="small"
                          disabled={idx === compareRows.length - 1}
                          onClick={() => moveCompareRow(idx, 1)}
                        >
                          <Iconify icon="solar:alt-arrow-down-bold" width={14} />
                        </IconButton>
                      </Stack>
                      <TextField
                        size="small"
                        label={t('membership.compare_feature')}
                        value={row.feature}
                        onChange={(e) => updateCompareRow(idx, 'feature', e.target.value)}
                        sx={{ flex: 2 }}
                      />
                      <TextField
                        size="small"
                        label="Silver"
                        value={row.silver}
                        onChange={(e) => updateCompareRow(idx, 'silver', e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        size="small"
                        label="Gold"
                        value={row.gold}
                        onChange={(e) => updateCompareRow(idx, 'gold', e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <TextField
                        size="small"
                        label="Platinum"
                        value={row.platinum}
                        onChange={(e) => updateCompareRow(idx, 'platinum', e.target.value)}
                        sx={{ flex: 1 }}
                      />
                      <IconButton size="small" color="error" onClick={() => removeCompareRow(idx)}>
                        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid xs={12} md={5}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: 'block' }}
                >
                  {t('common.preview_btn')}
                </Typography>
                <Card sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 0, overflow: 'hidden' }}>
                  <ComparePreviewTable tiers={tiers} rows={compareRows} />
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Stack>
      )}

      {/* Signups */}
      {tab === 'signups' && (
        <Card>
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              spacing={2}
              sx={{ py: 2, px: 2 }}
            >
              <Spa2ListAnalytic
                icon="solar:users-group-rounded-bold-duotone"
                title={t('common.all')}
                total={signupCounts.all}
                percent={100}
                active={signupFilter === 'all'}
                onClick={() => setSignupFilter('all')}
                unitLabel={t('membership.unit_signup')}
              />
              <Spa2ListAnalytic
                icon="solar:check-circle-bold-duotone"
                title={t('membership.status_active')}
                total={signupCounts.active}
                percent={signupCounts.all ? (signupCounts.active / signupCounts.all) * 100 : 0}
                active={signupFilter === 'active'}
                onClick={() => setSignupFilter('active')}
                unitLabel={t('membership.unit_signup')}
              />
              <Spa2ListAnalytic
                icon="solar:clock-circle-bold-duotone"
                title={t('membership.status_expired')}
                total={signupCounts.expired}
                percent={signupCounts.all ? (signupCounts.expired / signupCounts.all) * 100 : 0}
                active={signupFilter === 'expired'}
                onClick={() => setSignupFilter('expired')}
                unitLabel={t('membership.unit_signup')}
              />
              <Spa2ListAnalytic
                icon="solar:close-circle-bold-duotone"
                title={t('membership.status_cancelled')}
                total={signupCounts.cancelled}
                percent={signupCounts.all ? (signupCounts.cancelled / signupCounts.all) * 100 : 0}
                active={signupFilter === 'cancelled'}
                onClick={() => setSignupFilter('cancelled')}
                unitLabel={t('membership.unit_signup')}
              />
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
                placeholder={t('membership.search_signup_placeholder')}
                value={signupSearch}
                onChange={(e) => {
                  setSignupSearch(e.target.value);
                  table.onResetPage();
                }}
                size="small"
                sx={{ width: { xs: '100%', sm: 280 } }}
              />
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateSignup}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('membership.add_signup_btn')}
              </Button>
            </Stack>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('membership.col_customer')}</TableCell>
                  <TableCell>{t('membership.col_phone')}</TableCell>
                  <TableCell>{t('membership.col_tier')}</TableCell>
                  <TableCell>{t('membership.col_billing')}</TableCell>
                  <TableCell>{t('membership.col_joined_at')}</TableCell>
                  <TableCell>{t('common.status')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSignups.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 5, color: 'text.disabled' }}>
                      {t('common.no_data')}
                    </TableCell>
                  </TableRow>
                )}
                {filteredSignups
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((s) => (
                    <TableRow
                      key={s.id}
                      hover
                      onClick={() => setSignupDetailId(s.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{s.customer}</TableCell>
                      <TableCell>{s.phone}</TableCell>
                      <TableCell>{s.tier}</TableCell>
                      <TableCell>
                        {s.billing === 'yearly'
                          ? t('membership.billing_yearly')
                          : t('membership.billing_monthly')}
                      </TableCell>
                      <TableCell>{s.joinedAt}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Select
                          size="small"
                          value={s.status}
                          onChange={(e) =>
                            handleSetSignupStatus(
                              s.id,
                              e.target.value as Spa2MembershipSignupStatus
                            )
                          }
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="active">
                            <Chip
                              size="small"
                              variant="soft"
                              color={SIGNUP_STATUS_COLOR.active}
                              label={t('membership.status_active')}
                            />
                          </MenuItem>
                          <MenuItem value="expired">
                            <Chip
                              size="small"
                              variant="soft"
                              color={SIGNUP_STATUS_COLOR.expired}
                              label={t('membership.status_expired')}
                            />
                          </MenuItem>
                          <MenuItem value="cancelled">
                            <Chip
                              size="small"
                              variant="soft"
                              color={SIGNUP_STATUS_COLOR.cancelled}
                              label={t('membership.status_cancelled')}
                            />
                          </MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                        <IconButton size="small" onClick={() => setSignupDetailId(s.id)}>
                          <Iconify icon="solar:eye-bold" width={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setSignupDeleteId(s.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            page={table.page}
            count={filteredSignups.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2MembershipPageView banner={banner} tiers={tiers} compareRows={compareRows} />
        </Box>
      )}

      {/* Tier add/edit dialog */}
      <Dialog open={tierDialog} onClose={() => setTierDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{tierEditId ? t('common.edit') : t('membership.add_tier_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('membership.form_name')}
                  fullWidth
                  size="small"
                  value={tierForm.name}
                  onChange={(e) => setTierForm((p) => ({ ...p, name: e.target.value }))}
                />
                <TextField
                  label={t('common.price_vnd')}
                  type="number"
                  fullWidth
                  size="small"
                  value={tierForm.price}
                  onChange={(e) => setTierForm((p) => ({ ...p, price: Number(e.target.value) }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('membership.form_color')}
                    type="color"
                    size="small"
                    value={tierForm.color}
                    onChange={(e) => setTierForm((p) => ({ ...p, color: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('membership.form_accent')}
                    type="color"
                    size="small"
                    value={tierForm.accent}
                    onChange={(e) => setTierForm((p) => ({ ...p, accent: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <TextField
                  label={t('common.description')}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  value={tierForm.desc}
                  onChange={(e) => setTierForm((p) => ({ ...p, desc: e.target.value }))}
                />
                <TextField
                  label={t('membership.form_perks')}
                  helperText={t('common.comma_hint')}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  value={tierForm.perksInput}
                  onChange={(e) => setTierForm((p) => ({ ...p, perksInput: e.target.value }))}
                />
                <TextField
                  label={t('membership.form_not_included')}
                  helperText={t('common.comma_hint')}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  value={tierForm.notIncludedInput}
                  onChange={(e) => setTierForm((p) => ({ ...p, notIncludedInput: e.target.value }))}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={tierForm.hot}
                      onChange={(e) => setTierForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('membership.form_hot')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <TierPreviewCard
                  name={tierForm.name}
                  price={Number(tierForm.price)}
                  color={tierForm.color}
                  accent={tierForm.accent}
                  desc={tierForm.desc}
                  perks={tierPerksList}
                  notIncluded={tierNotIncludedList}
                  hot={tierForm.hot}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTierDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitTier}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {tierEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!tierDeleteId}
        onClose={() => setTierDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTier}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!signupDeleteId}
        onClose={() => setSignupDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteSignup}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Add sign-up dialog */}
      <Dialog
        open={signupCreateDialog}
        onClose={() => setSignupCreateDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t('membership.add_signup_btn')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label={t('membership.col_customer')}
              fullWidth
              size="small"
              value={signupForm.customer}
              onChange={(e) => setSignupForm((p) => ({ ...p, customer: e.target.value }))}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('membership.col_phone')}
                fullWidth
                size="small"
                value={signupForm.phone}
                onChange={(e) => setSignupForm((p) => ({ ...p, phone: e.target.value }))}
              />
              <TextField
                label="Email"
                fullWidth
                size="small"
                value={signupForm.email}
                onChange={(e) => setSignupForm((p) => ({ ...p, email: e.target.value }))}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                select
                label={t('membership.col_tier')}
                fullWidth
                size="small"
                value={signupForm.tier}
                onChange={(e) => setSignupForm((p) => ({ ...p, tier: e.target.value }))}
              >
                {tiers.map((it) => (
                  <MenuItem key={it.id} value={it.name}>
                    {it.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label={t('membership.col_billing')}
                fullWidth
                size="small"
                value={signupForm.billing}
                onChange={(e) =>
                  setSignupForm((p) => ({
                    ...p,
                    billing: e.target.value as 'monthly' | 'yearly',
                  }))
                }
              >
                <MenuItem value="monthly">{t('membership.billing_monthly')}</MenuItem>
                <MenuItem value="yearly">{t('membership.billing_yearly')}</MenuItem>
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                type="date"
                label={t('membership.col_joined_at')}
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
                value={signupForm.joinedAt}
                onChange={(e) => setSignupForm((p) => ({ ...p, joinedAt: e.target.value }))}
              />
              <TextField
                select
                label={t('common.status')}
                fullWidth
                size="small"
                value={signupForm.status}
                onChange={(e) =>
                  setSignupForm((p) => ({
                    ...p,
                    status: e.target.value as Spa2MembershipSignupStatus,
                  }))
                }
              >
                <MenuItem value="active">{t('membership.status_active')}</MenuItem>
                <MenuItem value="expired">{t('membership.status_expired')}</MenuItem>
                <MenuItem value="cancelled">{t('membership.status_cancelled')}</MenuItem>
              </TextField>
            </Stack>
            <TextField
              label={t('common.note')}
              fullWidth
              multiline
              minRows={2}
              size="small"
              value={signupForm.note}
              onChange={(e) => setSignupForm((p) => ({ ...p, note: e.target.value }))}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSignupCreateDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitCreateSignup}
            disabled={!signupForm.customer}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sign-up detail dialog */}
      <Dialog open={!!signupDetail} onClose={() => setSignupDetailId(null)} maxWidth="sm" fullWidth>
        {signupDetail && (
          <>
            <DialogTitle>{t('membership.signup_detail_title')}</DialogTitle>
            <DialogContent>
              <Stack spacing={2.5} sx={{ mt: 0.5 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {signupDetail.customer.charAt(0).toUpperCase()}
                  </Box>
                  <Stack spacing={0.25}>
                    <Typography variant="h6">{signupDetail.customer}</Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      {signupDetail.phone}
                      {signupDetail.email ? ` · ${signupDetail.email}` : ''}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label={t('membership.col_tier')}
                    fullWidth
                    size="small"
                    value={signupDetail.tier}
                    onChange={(e) => updateSignupDetail({ tier: e.target.value })}
                  >
                    {tiers.map((it) => (
                      <MenuItem key={it.id} value={it.name}>
                        {it.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label={t('membership.col_billing')}
                    fullWidth
                    size="small"
                    value={signupDetail.billing}
                    onChange={(e) =>
                      updateSignupDetail({ billing: e.target.value as 'monthly' | 'yearly' })
                    }
                  >
                    <MenuItem value="monthly">{t('membership.billing_monthly')}</MenuItem>
                    <MenuItem value="yearly">{t('membership.billing_yearly')}</MenuItem>
                  </TextField>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ fontSize: 13, color: 'text.secondary', minWidth: 110 }}>
                    {t('membership.col_joined_at')}
                  </Typography>
                  <Typography sx={{ fontSize: 13.5 }}>{signupDetail.joinedAt}</Typography>
                </Stack>
                <TextField
                  select
                  label={t('common.status')}
                  fullWidth
                  size="small"
                  value={signupDetail.status}
                  onChange={(e) =>
                    updateSignupDetail({ status: e.target.value as Spa2MembershipSignupStatus })
                  }
                >
                  <MenuItem value="active">
                    <Chip
                      size="small"
                      variant="soft"
                      color={SIGNUP_STATUS_COLOR.active}
                      label={t('membership.status_active')}
                    />
                  </MenuItem>
                  <MenuItem value="expired">
                    <Chip
                      size="small"
                      variant="soft"
                      color={SIGNUP_STATUS_COLOR.expired}
                      label={t('membership.status_expired')}
                    />
                  </MenuItem>
                  <MenuItem value="cancelled">
                    <Chip
                      size="small"
                      variant="soft"
                      color={SIGNUP_STATUS_COLOR.cancelled}
                      label={t('membership.status_cancelled')}
                    />
                  </MenuItem>
                </TextField>
                <TextField
                  label={t('common.note')}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  value={signupDetail.note ?? ''}
                  onChange={(e) => updateSignupDetail({ note: e.target.value })}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                color="error"
                onClick={() => {
                  setSignupDeleteId(signupDetail.id);
                }}
              >
                {t('common.delete')}
              </Button>
              <Button
                variant="contained"
                onClick={() => setSignupDetailId(null)}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('common.close')}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Spa2ManageShell>
  );
}
