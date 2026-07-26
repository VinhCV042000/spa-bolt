import type {
  Spa2AffiliateTier,
  Spa2AffiliateStat,
  Spa2AffiliateStep,
  Spa2AdjustableImage,
  Spa2AffiliateBanner,
  Spa2AffiliateRegistration,
  Spa2AffiliateRegistrationStatus,
} from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
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
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2AffiliateTiers,
  spa2AffiliateStats,
  spa2AffiliateSteps,
  spa2AffiliateBanner,
  SPA2_AFFILIATE_REGISTRATIONS,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2AffiliatePageView } from 'src/sections/spa2/view/spa2-content-pages4';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2AffiliatePageView renders on the public /spa2/affiliate page: the page
// banner, the stat strip, the "how it works" steps and the commission-tier
// cards — read from and written back in the same shape as src/_mock/_spa2,
// the single source of truth shared with the public view. The application
// form on the public page is purely interactive UI (no admin-editable
// content) and is intentionally not mocked here, matching the project
// convention. Also manages the "Đăng ký tham gia" (affiliate program sign-up)
// submissions list, which is admin-only data (not rendered on the public page).
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STAT_FORM = { n: '', l: '' };
const EMPTY_STEP_FORM = { icon: 'solar:user-plus-bold-duotone', title: '', desc: '' };
const EMPTY_TIER_FORM = {
  name: '',
  commission: '',
  threshold: '',
  color: '#2E8B7A',
  hot: false,
};

type PerkRow = { id: string; value: string };

const REGISTRATION_STATUS_LABEL: Record<Spa2AffiliateRegistrationStatus, string> = {
  new: 'Mới',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

const REGISTRATION_STATUS_COLOR: Record<
  Spa2AffiliateRegistrationStatus,
  'info' | 'success' | 'error'
> = {
  new: 'info',
  approved: 'success',
  rejected: 'error',
};

const REGISTRATION_STATUS_OPTIONS: Spa2AffiliateRegistrationStatus[] = [
  'new',
  'approved',
  'rejected',
];

type RegistrationStatusFilter = Spa2AffiliateRegistrationStatus | 'all';

function PreviewFrame({ children }: { children: React.ReactNode }) {
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

function DragHint() {
  return (
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
      Kéo biểu tượng <Iconify icon="nimbus:drag-dots" width={12} /> để sắp xếp lại thứ tự hiển thị.
    </Typography>
  );
}

// Mirrors the single stat block from Spa2AffiliatePageView's "Stats" strip
// (white number + label on a teal background).
function AffiliateStatPreviewCard({ form }: { form: typeof EMPTY_STAT_FORM }) {
  return (
    <Box sx={{ p: 4, borderRadius: 3, bgcolor: SPA2_TEAL }}>
      <Stack alignItems="center" sx={{ color: 'white', textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {form.n || '—'}
        </Typography>
        <Typography sx={{ fontSize: 12, opacity: 0.8 }}>{form.l || '(Chưa đặt nhãn)'}</Typography>
      </Stack>
    </Box>
  );
}

// Mirrors a single "how it works" step card from Spa2AffiliatePageView,
// including the numbered badge (position within the list).
function AffiliateStepPreviewCard({
  form,
  index,
}: {
  form: typeof EMPTY_STEP_FORM;
  index: number;
}) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: '0 8px 24px rgba(31,42,40,0.05)',
        textAlign: 'center',
      }}
    >
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
          }}
        >
          <Iconify
            icon={form.icon || 'solar:user-plus-bold-duotone'}
            width={28}
            sx={{ color: 'white' }}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: 'calc(50% - 36px)',
            width: 22,
            height: 22,
            borderRadius: '50%',
            bgcolor: SPA2_INK,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {index + 1}
        </Box>
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75 }}>
        {form.title || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {form.desc || '—'}
      </Typography>
    </Card>
  );
}

// Mirrors a single commission-tier card from Spa2AffiliatePageView, including
// the "PHỔ BIẾN NHẤT" hot badge styling.
function AffiliateTierPreviewCard({
  form,
  perks,
}: {
  form: typeof EMPTY_TIER_FORM;
  perks: string[];
}) {
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 4,
        overflow: 'hidden',
        border: form.hot ? `2px solid ${SPA2_TEAL}` : `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: form.hot ? '0 20px 48px rgba(46,139,122,0.18)' : 'none',
      }}
    >
      {form.hot && (
        <Box
          sx={{
            bgcolor: SPA2_TEAL,
            color: 'white',
            textAlign: 'center',
            py: 0.75,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          PHỔ BIẾN NHẤT
        </Box>
      )}
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: form.color }} />
          <Typography variant="h5" sx={{ color: SPA2_INK }}>
            {form.name || '(Chưa đặt tên)'}
          </Typography>
        </Stack>
        <Typography sx={{ fontWeight: 700, color: form.color, fontSize: 32, mb: 0.25 }}>
          {form.commission || '—'}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 2 }}>
          hoa hồng · từ {form.threshold || '—'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.25} sx={{ mb: 3 }}>
          {perks.length === 0 ? (
            <Typography sx={{ fontSize: 13, color: 'text.disabled' }}>
              Chưa có quyền lợi nào.
            </Typography>
          ) : (
            perks.map((p, idx) => (
              <Stack key={`${idx}-${p}`} direction="row" spacing={1.5} alignItems="center">
                <Iconify
                  icon="solar:check-circle-bold"
                  width={15}
                  sx={{ color: form.color, flexShrink: 0 }}
                />
                <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{p}</Typography>
              </Stack>
            ))
          )}
        </Stack>
        <Button
          fullWidth
          disabled
          sx={{
            borderRadius: 99,
            py: 1.3,
            bgcolor: form.hot ? SPA2_TEAL : 'transparent',
            color: form.hot ? 'white' : SPA2_TEAL_DARK,
            border: form.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
            opacity: 0.85,
          }}
        >
          Đăng ký {form.name || '...'}
        </Button>
      </Box>
    </Card>
  );
}

export function Spa2AffiliateManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2AffiliateBanner>(() => ({
    ...spa2AffiliateBanner,
    image: { ...spa2AffiliateBanner.image },
  }));
  const [stats, setStats] = useState<Spa2AffiliateStat[]>(spa2AffiliateStats);
  const [steps, setSteps] = useState<Spa2AffiliateStep[]>(spa2AffiliateSteps);
  const [tiers, setTiers] = useState<Spa2AffiliateTier[]>(spa2AffiliateTiers);
  const [registrations, setRegistrations] = useState<Spa2AffiliateRegistration[]>(
    SPA2_AFFILIATE_REGISTRATIONS
  );
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'stats' | 'steps' | 'tiers' | 'registrations' | 'preview'
  >('banner');

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
    setBanner({ ...spa2AffiliateBanner, image: { ...spa2AffiliateBanner.image } });
    setStats(spa2AffiliateStats);
    setSteps(spa2AffiliateSteps);
    setTiers(spa2AffiliateTiers);
    setRegistrations(SPA2_AFFILIATE_REGISTRATIONS);
    setDirty(false);
  };

  // ---- Stats ----
  const [openStatForm, setOpenStatForm] = useState(false);
  const [editStatId, setEditStatId] = useState<string | null>(null);
  const [deleteStatId, setDeleteStatId] = useState<string | null>(null);
  const [statForm, setStatForm] = useState(EMPTY_STAT_FORM);

  const openCreateStat = () => {
    setStatForm(EMPTY_STAT_FORM);
    setEditStatId(null);
    setOpenStatForm(true);
  };
  const openEditStat = (stat: Spa2AffiliateStat) => {
    setStatForm({ n: stat.n, l: stat.l });
    setEditStatId(stat.id);
    setOpenStatForm(true);
  };
  const handleStatSubmit = useCallback(() => {
    if (editStatId !== null) {
      setStats((p) => p.map((x) => (x.id === editStatId ? { ...x, ...statForm } : x)));
    } else {
      setStats((p) => [...p, withId({ ...statForm })]);
    }
    setOpenStatForm(false);
    setDirty(true);
  }, [statForm, editStatId]);
  const handleStatDelete = useCallback(() => {
    setStats((p) => p.filter((x) => x.id !== deleteStatId));
    setDeleteStatId(null);
    setDirty(true);
  }, [deleteStatId]);
  const reorderStats = (next: Spa2AffiliateStat[]) => {
    setStats(next);
    setDirty(true);
  };

  // ---- Steps ----
  const [openStepForm, setOpenStepForm] = useState(false);
  const [editStepId, setEditStepId] = useState<string | null>(null);
  const [deleteStepId, setDeleteStepId] = useState<string | null>(null);
  const [stepForm, setStepForm] = useState(EMPTY_STEP_FORM);

  const openCreateStep = () => {
    setStepForm(EMPTY_STEP_FORM);
    setEditStepId(null);
    setOpenStepForm(true);
  };
  const openEditStep = (step: Spa2AffiliateStep) => {
    setStepForm({ icon: step.icon, title: step.title, desc: step.desc });
    setEditStepId(step.id);
    setOpenStepForm(true);
  };
  const handleStepSubmit = useCallback(() => {
    if (editStepId !== null) {
      setSteps((p) => p.map((x) => (x.id === editStepId ? { ...x, ...stepForm } : x)));
    } else {
      setSteps((p) => [...p, withId({ ...stepForm })]);
    }
    setOpenStepForm(false);
    setDirty(true);
  }, [stepForm, editStepId]);
  const handleStepDelete = useCallback(() => {
    setSteps((p) => p.filter((x) => x.id !== deleteStepId));
    setDeleteStepId(null);
    setDirty(true);
  }, [deleteStepId]);
  const reorderSteps = (next: Spa2AffiliateStep[]) => {
    setSteps(next);
    setDirty(true);
  };

  // ---- Tiers ----
  const [openTierForm, setOpenTierForm] = useState(false);
  const [editTierId, setEditTierId] = useState<string | null>(null);
  const [deleteTierId, setDeleteTierId] = useState<string | null>(null);
  const [tierForm, setTierForm] = useState(EMPTY_TIER_FORM);
  const [tierPerks, setTierPerks] = useState<PerkRow[]>([]);

  const openCreateTier = () => {
    setTierForm(EMPTY_TIER_FORM);
    setTierPerks([]);
    setEditTierId(null);
    setOpenTierForm(true);
  };
  const openEditTier = (tier: Spa2AffiliateTier) => {
    setTierForm({
      name: tier.name,
      commission: tier.commission,
      threshold: tier.threshold,
      color: tier.color,
      hot: !!tier.hot,
    });
    setTierPerks(tier.perks.map((p) => ({ id: uuidv4(), value: p })));
    setEditTierId(tier.id);
    setOpenTierForm(true);
  };
  const addTierPerk = () => {
    setTierPerks((prev) => [...prev, { id: uuidv4(), value: '' }]);
  };
  const updateTierPerk = (id: string, value: string) => {
    setTierPerks((prev) => prev.map((row) => (row.id === id ? { ...row, value } : row)));
  };
  const removeTierPerk = (id: string) => {
    setTierPerks((prev) => prev.filter((row) => row.id !== id));
  };
  const tierPerksPreview = tierPerks.map((row) => row.value.trim()).filter(Boolean);
  const handleTierSubmit = useCallback(() => {
    const next = {
      name: tierForm.name,
      commission: tierForm.commission,
      threshold: tierForm.threshold,
      color: tierForm.color,
      hot: tierForm.hot,
      perks: tierPerksPreview,
    };
    if (editTierId !== null) {
      setTiers((p) => p.map((x) => (x.id === editTierId ? { ...x, ...next } : x)));
    } else {
      setTiers((p) => [...p, withId(next)]);
    }
    setOpenTierForm(false);
    setDirty(true);
  }, [tierForm, tierPerksPreview, editTierId]);
  const handleTierDelete = useCallback(() => {
    setTiers((p) => p.filter((x) => x.id !== deleteTierId));
    setDeleteTierId(null);
    setDirty(true);
  }, [deleteTierId]);
  const reorderTiers = (next: Spa2AffiliateTier[]) => {
    setTiers(next);
    setDirty(true);
  };

  // ---- Đăng ký tham gia (registrations) ----
  const [registrationSearch, setRegistrationSearch] = useState('');
  const [registrationStatusFilter, setRegistrationStatusFilter] =
    useState<RegistrationStatusFilter>('all');
  const [viewRegistration, setViewRegistration] = useState<Spa2AffiliateRegistration | null>(null);
  const registrationTable = useTable({ defaultRowsPerPage: 5 });

  const filteredRegistrations = registrations.filter((r) => {
    const q = registrationSearch.toLowerCase();
    const matchSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.includes(registrationSearch);
    const matchStatus =
      registrationStatusFilter === 'all' || r.status === registrationStatusFilter;
    return matchSearch && matchStatus;
  });

  const registrationCounts = {
    all: registrations.length,
    new: registrations.filter((r) => r.status === 'new').length,
    approved: registrations.filter((r) => r.status === 'approved').length,
    rejected: registrations.filter((r) => r.status === 'rejected').length,
  };

  const handleSetRegistrationStatus = (id: number, status: Spa2AffiliateRegistrationStatus) => {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setViewRegistration((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  return (
    <Spa2ManageShell
      title={t('affiliate.page_title')}
      description="Banner, số liệu, các bước tham gia, cấp độ hoa hồng và đăng ký tham gia hiển thị trên trang Cộng tác viên công khai."
      breadcrumbLabel={t('nav.affiliate')}
      publicPath={paths.spa2.affiliate}
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
          label={t('affiliate.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stats"
          label={t('affiliate.stats_section')}
          icon={<Iconify icon="solar:chart-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="steps"
          label={t('affiliate.steps_section')}
          icon={<Iconify icon="solar:routing-2-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="tiers"
          label={t('affiliate.tiers_section')}
          icon={<Iconify icon="solar:medal-ribbon-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="registrations"
          label="Đăng ký tham gia"
          icon={<Iconify icon="solar:clipboard-list-bold-duotone" width={20} />}
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
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('affiliate.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('affiliate.banner_image_help')}
                />
                <TextField
                  label={t('affiliate.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('affiliate.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('affiliate.banner_subtitle')}
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
              <Spa2AffiliatePageView banner={banner} stats={stats} steps={steps} tiers={tiers} />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Stats */}
      {tab === 'stats' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateStat}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('affiliate.stat_add_btn')}
              </Button>
            </Stack>
            <DragHint />
            {stats.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Chưa có số liệu nào — nhấn &quot;Thêm số liệu&quot; để bắt đầu.
              </Typography>
            )}
          </Grid>
          <Grid xs={12}>
            <Spa2SortableGrid items={stats} onReorder={reorderStats}>
              <Grid container spacing={2}>
                {stats.map((stat) => (
                  <Grid key={stat.id} xs={6} sm={3}>
                    <Spa2SortableItem id={stat.id}>
                      {(sortable) => (
                        <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 0.5 }}
                          >
                            <Spa2DragHandle sortable={sortable} />
                            <Stack direction="row" spacing={0.5}>
                              <Tooltip title={t('common.edit')}>
                                <IconButton size="small" onClick={() => openEditStat(stat)}>
                                  <Iconify icon="solar:pen-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t('common.delete')}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => setDeleteStatId(stat.id)}
                                >
                                  <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Stack>
                          <Typography variant="h4" sx={{ color: SPA2_TEAL, fontWeight: 700, mb: 0.5 }}>
                            {stat.n}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                            {stat.l}
                          </Typography>
                        </Card>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                ))}
              </Grid>
            </Spa2SortableGrid>
          </Grid>
        </Grid>
      )}

      {/* Steps */}
      {tab === 'steps' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateStep}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('affiliate.step_add_btn')}
              </Button>
            </Stack>
            <DragHint />
            {steps.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Chưa có bước nào — nhấn &quot;Thêm bước&quot; để bắt đầu.
              </Typography>
            )}
          </Grid>
          <Grid xs={12}>
            <Spa2SortableGrid items={steps} onReorder={reorderSteps}>
              <Grid container spacing={2}>
                {steps.map((step, idx) => (
                  <Grid key={step.id} xs={12} sm={6} md={3}>
                    <Spa2SortableItem id={step.id}>
                      {(sortable) => (
                        <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <Spa2DragHandle sortable={sortable} />
                            <Chip
                              label={idx + 1}
                              size="small"
                              sx={{ bgcolor: SPA2_TEAL, color: 'white', fontWeight: 700 }}
                            />
                          </Stack>
                          <Iconify
                            icon={step.icon}
                            width={32}
                            sx={{ color: SPA2_TEAL, mb: 1, mx: 'auto' }}
                          />
                          <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{step.title}</Typography>
                          <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                            {step.desc}
                          </Typography>
                          <Stack direction="row" justifyContent="center" spacing={0.5}>
                            <Tooltip title={t('common.edit')}>
                              <IconButton size="small" onClick={() => openEditStep(step)}>
                                <Iconify icon="solar:pen-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('common.delete')}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeleteStepId(step.id)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Card>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                ))}
              </Grid>
            </Spa2SortableGrid>
          </Grid>
        </Grid>
      )}

      {/* Tiers */}
      {tab === 'tiers' && (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateTier}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('affiliate.tier_add_btn')}
              </Button>
            </Stack>
            <DragHint />
            {tiers.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Chưa có cấp độ nào — nhấn &quot;Thêm cấp độ&quot; để bắt đầu.
              </Typography>
            )}
          </Grid>
          <Grid xs={12}>
            <Spa2SortableGrid items={tiers} onReorder={reorderTiers}>
              <Grid container spacing={2}>
                {tiers.map((tier) => (
                  <Grid key={tier.id} xs={12} md={4}>
                    <Spa2SortableItem id={tier.id}>
                      {(sortable) => (
                        <Card
                          sx={{
                            p: 2.5,
                            borderRadius: 3,
                            height: '100%',
                            border: tier.hot ? `2px solid ${tier.color}` : undefined,
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 1 }}
                          >
                            <Spa2DragHandle sortable={sortable} />
                            <Stack direction="row" spacing={0.5}>
                              <Tooltip title={t('common.edit')}>
                                <IconButton size="small" onClick={() => openEditTier(tier)}>
                                  <Iconify icon="solar:pen-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t('common.delete')}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => setDeleteTierId(tier.id)}
                                >
                                  <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Box
                              sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: tier.color }}
                            />
                            <Typography variant="h6">{tier.name}</Typography>
                            {tier.hot && (
                              <Chip label={t('affiliate.tier_hot_label')} size="small" color="warning" />
                            )}
                          </Stack>
                          <Typography sx={{ fontWeight: 700, color: tier.color, fontSize: 24, mb: 0.25 }}>
                            {tier.commission}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.5 }}>
                            {t('affiliate.tier_threshold_prefix')} {tier.threshold}
                          </Typography>
                          <Stack spacing={0.5}>
                            {tier.perks.map((p) => (
                              <Stack key={p} direction="row" spacing={1} alignItems="center">
                                <Iconify
                                  icon="solar:check-circle-bold"
                                  width={14}
                                  sx={{ color: tier.color, flexShrink: 0 }}
                                />
                                <Typography sx={{ fontSize: 12.5 }}>{p}</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Card>
                      )}
                    </Spa2SortableItem>
                  </Grid>
                ))}
              </Grid>
            </Spa2SortableGrid>
          </Grid>
        </Grid>
      )}

      {/* Đăng ký tham gia */}
      {tab === 'registrations' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:clipboard-list-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Đăng ký tham gia
              </Typography>
            </Stack>
          </Box>

          <Card sx={{ m: 2.5, boxShadow: 'none', border: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Typography
              variant="caption"
              sx={{
                px: 2.5,
                pt: 2,
                display: 'block',
                color: 'text.secondary',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Theo trạng thái
            </Typography>
            <Scrollbar sx={{ minHeight: 108 }}>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2 }}
              >
                <Spa2ListAnalytic
                  title="Tất cả"
                  total={registrationCounts.all}
                  percent={100}
                  icon="solar:users-group-rounded-bold-duotone"
                  color={SPA2_TEAL}
                  unitLabel="đăng ký"
                  active={registrationStatusFilter === 'all'}
                  onClick={() => {
                    setRegistrationStatusFilter('all');
                    registrationTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={REGISTRATION_STATUS_LABEL.new}
                  total={registrationCounts.new}
                  percent={
                    registrationCounts.all
                      ? (registrationCounts.new / registrationCounts.all) * 100
                      : 0
                  }
                  icon="solar:bell-bold-duotone"
                  color="#3B82F6"
                  unitLabel="đăng ký"
                  active={registrationStatusFilter === 'new'}
                  onClick={() => {
                    setRegistrationStatusFilter('new');
                    registrationTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={REGISTRATION_STATUS_LABEL.approved}
                  total={registrationCounts.approved}
                  percent={
                    registrationCounts.all
                      ? (registrationCounts.approved / registrationCounts.all) * 100
                      : 0
                  }
                  icon="solar:check-circle-bold-duotone"
                  color={SPA2_TEAL}
                  unitLabel="đăng ký"
                  active={registrationStatusFilter === 'approved'}
                  onClick={() => {
                    setRegistrationStatusFilter('approved');
                    registrationTable.onResetPage();
                  }}
                />
                <Spa2ListAnalytic
                  title={REGISTRATION_STATUS_LABEL.rejected}
                  total={registrationCounts.rejected}
                  percent={
                    registrationCounts.all
                      ? (registrationCounts.rejected / registrationCounts.all) * 100
                      : 0
                  }
                  icon="solar:close-circle-bold-duotone"
                  color="#E53935"
                  unitLabel="đăng ký"
                  active={registrationStatusFilter === 'rejected'}
                  onClick={() => {
                    setRegistrationStatusFilter('rejected');
                    registrationTable.onResetPage();
                  }}
                />
              </Stack>
            </Scrollbar>
          </Card>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder="Tìm theo tên, email hoặc số điện thoại..."
              value={registrationSearch}
              onChange={(e) => {
                setRegistrationSearch(e.target.value);
                registrationTable.onResetPage();
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
              value={registrationStatusFilter}
              onChange={(_, v: RegistrationStatusFilter) => {
                setRegistrationStatusFilter(v);
                registrationTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${registrationCounts.all})`} />
              <Tab
                value="new"
                label={`${REGISTRATION_STATUS_LABEL.new} (${registrationCounts.new})`}
              />
              <Tab
                value="approved"
                label={`${REGISTRATION_STATUS_LABEL.approved} (${registrationCounts.approved})`}
              />
              <Tab
                value="rejected"
                label={`${REGISTRATION_STATUS_LABEL.rejected} (${registrationCounts.rejected})`}
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Người đăng ký</TableCell>
                  <TableCell>Kênh</TableCell>
                  <TableCell>Cấp độ đăng ký</TableCell>
                  <TableCell>Ngày đăng ký</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRegistrations
                  .slice(
                    registrationTable.page * registrationTable.rowsPerPage,
                    registrationTable.page * registrationTable.rowsPerPage +
                      registrationTable.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.email} · {item.phone}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.channel}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.tierName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.createdAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={REGISTRATION_STATUS_LABEL[item.status]}
                          color={REGISTRATION_STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'new' && (
                            <>
                              <Tooltip title="Duyệt đăng ký">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetRegistrationStatus(item.id, 'approved')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Từ chối đăng ký">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleSetRegistrationStatus(item.id, 'rejected')}
                                >
                                  <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <Tooltip title="Xem chi tiết">
                            <IconButton size="small" onClick={() => setViewRegistration(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredRegistrations.length === 0 && (
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
            count={filteredRegistrations.length}
            page={registrationTable.page}
            rowsPerPage={registrationTable.rowsPerPage}
            onPageChange={registrationTable.onChangePage}
            onRowsPerPageChange={registrationTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2AffiliatePageView banner={banner} stats={stats} steps={steps} tiers={tiers} />
        </Box>
      )}

      {/* Stat create / edit dialog */}
      <Dialog open={openStatForm} onClose={() => setOpenStatForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editStatId !== null ? t('affiliate.stat_form_edit') : t('affiliate.stat_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('affiliate.stat_form_value')}
                  value={statForm.n}
                  onChange={(e) => setStatForm((p) => ({ ...p, n: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('affiliate.stat_form_label')}
                  value={statForm.l}
                  onChange={(e) => setStatForm((p) => ({ ...p, l: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <AffiliateStatPreviewCard form={statForm} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleStatSubmit}
            disabled={!statForm.l}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editStatId !== null ? t('affiliate.stat_form_edit') : t('affiliate.stat_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Step create / edit dialog */}
      <Dialog open={openStepForm} onClose={() => setOpenStepForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editStepId !== null ? t('affiliate.step_form_edit') : t('affiliate.step_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('affiliate.step_form_icon')}
                  value={stepForm.icon}
                  onChange={(e) => setStepForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('affiliate.step_form_title')}
                  value={stepForm.title}
                  onChange={(e) => setStepForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('affiliate.step_form_desc')}
                  value={stepForm.desc}
                  onChange={(e) => setStepForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <AffiliateStepPreviewCard
                form={stepForm}
                index={
                  editStepId !== null
                    ? Math.max(
                        steps.findIndex((s) => s.id === editStepId),
                        0
                      )
                    : steps.length
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStepForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleStepSubmit}
            disabled={!stepForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editStepId !== null ? t('affiliate.step_form_edit') : t('affiliate.step_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tier create / edit dialog */}
      <Dialog open={openTierForm} onClose={() => setOpenTierForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editTierId !== null ? t('affiliate.tier_form_edit') : t('affiliate.tier_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('affiliate.tier_form_name')}
                  value={tierForm.name}
                  onChange={(e) => setTierForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('affiliate.tier_form_commission')}
                    value={tierForm.commission}
                    onChange={(e) => setTierForm((p) => ({ ...p, commission: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('affiliate.tier_form_threshold')}
                    value={tierForm.threshold}
                    onChange={(e) => setTierForm((p) => ({ ...p, threshold: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('affiliate.tier_form_color')}
                  value={tierForm.color}
                  onChange={(e) => setTierForm((p) => ({ ...p, color: e.target.value }))}
                  fullWidth
                />
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Quyền lợi
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                      onClick={addTierPerk}
                    >
                      Thêm quyền lợi
                    </Button>
                  </Stack>
                  {tierPerks.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Chưa có quyền lợi nào — nhấn &quot;Thêm quyền lợi&quot; để bắt đầu.
                    </Typography>
                  )}
                  <Stack spacing={1}>
                    {tierPerks.map((row) => (
                      <Stack key={row.id} direction="row" spacing={1} alignItems="center">
                        <TextField
                          fullWidth
                          size="small"
                          value={row.value}
                          onChange={(e) => updateTierPerk(row.id, e.target.value)}
                          placeholder="VD: Dashboard nâng cao"
                        />
                        <IconButton size="small" color="error" onClick={() => removeTierPerk(row.id)}>
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={tierForm.hot}
                      onChange={(e) => setTierForm((p) => ({ ...p, hot: e.target.checked }))}
                    />
                  }
                  label={t('affiliate.tier_form_hot')}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <AffiliateTierPreviewCard form={tierForm} perks={tierPerksPreview} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTierForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleTierSubmit}
            disabled={!tierForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editTierId !== null ? t('affiliate.tier_form_edit') : t('affiliate.tier_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Registration view-detail dialog */}
      <Dialog
        open={!!viewRegistration}
        onClose={() => setViewRegistration(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          Đăng ký #{viewRegistration?.id}
        </DialogTitle>
        <DialogContent dividers>
          {viewRegistration && (
            <Stack spacing={1.5}>
              {[
                ['Họ tên', viewRegistration.name],
                ['Email', viewRegistration.email],
                ['Số điện thoại', viewRegistration.phone],
                ['Kênh', viewRegistration.channel],
                ['Cấp độ đăng ký', viewRegistration.tierName],
                ['Ngày đăng ký', viewRegistration.createdAt],
              ].map(([label, value]) => (
                <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 130 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 130 }}>
                  Trạng thái:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewRegistration.status}
                  onChange={(e) =>
                    handleSetRegistrationStatus(
                      viewRegistration.id,
                      e.target.value as Spa2AffiliateRegistrationStatus
                    )
                  }
                  sx={{ flex: 1 }}
                >
                  {REGISTRATION_STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {REGISTRATION_STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewRegistration(null)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteStatId}
        onClose={() => setDeleteStatId(null)}
        title={t('affiliate.stat_delete_title')}
        content={t('affiliate.stat_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleStatDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteStepId}
        onClose={() => setDeleteStepId(null)}
        title={t('affiliate.step_delete_title')}
        content={t('affiliate.step_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleStepDelete}>
            {t('common.delete')}
          </Button>
        }
      />

      <ConfirmDialog
        open={!!deleteTierId}
        onClose={() => setDeleteTierId(null)}
        title={t('affiliate.tier_delete_title')}
        content={t('affiliate.tier_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleTierDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
