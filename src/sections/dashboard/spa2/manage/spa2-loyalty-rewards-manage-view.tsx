import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
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

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2LoyaltyRewards,
  spa2LoyaltyEarnRules,
  type Spa2LoyaltyReward,
  type Spa2AdjustableImage,
  spa2LoyaltyRewardsBanner,
  spa2LoyaltyPointsBalance,
  type Spa2LoyaltyEarnRule,
  SPA2_LOYALTY_REDEMPTIONS,
  type Spa2LoyaltyRedemption,
  spa2LoyaltyRewardCategories,
  type Spa2LoyaltyRewardsBanner,
  type Spa2LoyaltyRewardCategory,
  type Spa2LoyaltyRedemptionStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import {
  Spa2ContentPageHero3,
  Spa2LoyaltyRewardsPageView,
} from 'src/sections/spa2/view/spa2-content-pages3';
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
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2LoyaltyRewardsPageView renders on the public /spa2/loyalty-rewards page:
// the page banner, the points balance + "how to earn more" tiles, the reward
// category filters and the reward catalog - read from and written back in the
// same shape as src/_mock/_spa2, the single source of truth shared with the
// public view. The "banner" tab reuses Spa2ContentPageHero3 and the "preview"
// tab reuses Spa2LoyaltyRewardsPageView itself, fed with the in-progress
// edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_REWARD_FORM = {
  category: 'service',
  icon: 'solar:leaf-bold',
  name: '',
  points: 0,
  image: '',
  stock: 0,
};

const REDEMPTION_STATUS_LABEL: Record<Spa2LoyaltyRedemptionStatus, string> = {
  new: 'Mới',
  approved: 'Đã duyệt',
  delivered: 'Đã giao',
  cancelled: 'Đã huỷ',
};

const REDEMPTION_STATUS_COLOR: Record<
  Spa2LoyaltyRedemptionStatus,
  'info' | 'warning' | 'success' | 'error'
> = {
  new: 'info',
  approved: 'warning',
  delivered: 'success',
  cancelled: 'error',
};

const REDEMPTION_STATUS_OPTIONS: Spa2LoyaltyRedemptionStatus[] = [
  'new',
  'approved',
  'delivered',
  'cancelled',
];

type RedemptionStatusFilter = Spa2LoyaltyRedemptionStatus | 'all';

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

// Mirrors a single reward SoftCard in the public catalog grid.
function RewardPreviewCard({ name, points, image, stock }: Spa2LoyaltyReward) {
  return (
    <Card
      sx={{
        p: 0,
        overflow: 'hidden',
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 120,
            backgroundImage: image ? `url(${image})` : undefined,
            bgcolor: SPA2_CREAM,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: SPA2_INK,
            color: 'white',
            borderRadius: 99,
            px: 1.25,
            py: 0.25,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Iconify icon="solar:star-bold" width={11} />
          <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{points} điểm</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 13 }}>
          {name || 'Tên phần thưởng'}
        </Typography>
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Còn lại: {stock}</Typography>
      </Box>
    </Card>
  );
}

export function Spa2LoyaltyRewardsManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2LoyaltyRewardsBanner>(() => ({
    ...spa2LoyaltyRewardsBanner,
    image: { ...spa2LoyaltyRewardsBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'points' | 'categories' | 'rewards' | 'redemptions' | 'preview'
  >('banner');
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

  // ---- Points + earn rules ----
  const [pointsBalance, setPointsBalance] = useState(spa2LoyaltyPointsBalance);
  const [earnRules, setEarnRules] = useState<Spa2LoyaltyEarnRule[]>(() =>
    spa2LoyaltyEarnRules.map((r) => ({ ...r }))
  );
  const updateEarnRule = (idx: number, patch: Partial<Spa2LoyaltyEarnRule>) => {
    setEarnRules((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
    markDirty();
  };
  const addEarnRule = () => {
    setEarnRules((prev) => [...prev, withId({ label: '', ratio: '' })]);
    markDirty();
  };
  const removeEarnRule = (idx: number) => {
    setEarnRules((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };
  const reorderEarnRules = (next: Spa2LoyaltyEarnRule[]) => {
    setEarnRules(next);
    markDirty();
  };

  // ---- Categories ----
  const [categories, setCategories] = useState<Spa2LoyaltyRewardCategory[]>(() =>
    spa2LoyaltyRewardCategories.map((c) => ({ ...c }))
  );
  const realCategories = useMemo(() => categories.filter((c) => c.value !== 'all'), [categories]);
  const updateCategory = (idx: number, patch: Partial<Spa2LoyaltyRewardCategory>) => {
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
  const reorderCategories = (next: (Spa2LoyaltyRewardCategory & { id: string })[]) => {
    const cleaned = next.map(({ id, ...rest }) => rest);
    setCategories((prev) => {
      const allEntry = prev.find((c) => c.value === 'all');
      return allEntry ? [allEntry, ...cleaned] : cleaned;
    });
    markDirty();
  };

  // ---- Rewards ----
  const [rewards, setRewards] = useState<Spa2LoyaltyReward[]>(() =>
    spa2LoyaltyRewards.map((r) => ({ ...r }))
  );
  const [rewardFilter, setRewardFilter] = useState('all');
  const filteredRewards = useMemo(
    () => (rewardFilter === 'all' ? rewards : rewards.filter((r) => r.category === rewardFilter)),
    [rewards, rewardFilter]
  );
  const [rewardForm, setRewardForm] = useState(EMPTY_REWARD_FORM);
  const [rewardDialog, setRewardDialog] = useState(false);
  const [rewardEditId, setRewardEditId] = useState<string | null>(null);
  const [rewardDeleteId, setRewardDeleteId] = useState<string | null>(null);

  const openCreateReward = () => {
    setRewardForm({ ...EMPTY_REWARD_FORM, category: realCategories[0]?.value ?? 'service' });
    setRewardEditId(null);
    setRewardDialog(true);
  };
  const openEditReward = (item: Spa2LoyaltyReward) => {
    setRewardForm({
      category: item.category,
      icon: item.icon,
      name: item.name,
      points: item.points,
      image: item.image,
      stock: item.stock,
    });
    setRewardEditId(item.id);
    setRewardDialog(true);
  };
  const submitReward = () => {
    const next = {
      category: rewardForm.category,
      icon: rewardForm.icon,
      name: rewardForm.name,
      points: Number(rewardForm.points),
      image: rewardForm.image,
      stock: Number(rewardForm.stock),
    };
    if (rewardEditId) {
      setRewards((prev) => prev.map((r) => (r.id === rewardEditId ? { ...r, ...next } : r)));
    } else {
      setRewards((prev) => [...prev, withId(next)]);
    }
    setRewardDialog(false);
    markDirty();
  };
  const confirmDeleteReward = () => {
    setRewards((prev) => prev.filter((r) => r.id !== rewardDeleteId));
    setRewardDeleteId(null);
    markDirty();
  };

  // ---- Đổi điểm thưởng (redemptions) ----
  const rewardById = useMemo(() => new Map(rewards.map((r) => [r.id, r])), [rewards]);
  const categoryLabelByValue = useMemo(
    () => new Map(categories.map((c) => [c.value, c.label])),
    [categories]
  );
  const [redemptions, setRedemptions] = useState<Spa2LoyaltyRedemption[]>(SPA2_LOYALTY_REDEMPTIONS);
  const [redemptionSearch, setRedemptionSearch] = useState('');
  const [redemptionStatusFilter, setRedemptionStatusFilter] =
    useState<RedemptionStatusFilter>('all');
  const [viewRedemption, setViewRedemption] = useState<Spa2LoyaltyRedemption | null>(null);
  const redemptionTable = useTable({ defaultRowsPerPage: 5 });

  const filteredRedemptions = useMemo(
    () =>
      redemptions.filter((r) => {
        const q = redemptionSearch.toLowerCase();
        const matchSearch =
          !q ||
          r.customer.toLowerCase().includes(q) ||
          r.phone.includes(redemptionSearch) ||
          r.rewardName.toLowerCase().includes(q);
        const matchStatus = redemptionStatusFilter === 'all' || r.status === redemptionStatusFilter;
        return matchSearch && matchStatus;
      }),
    [redemptions, redemptionSearch, redemptionStatusFilter]
  );

  const redemptionCounts = useMemo(
    () => ({
      all: redemptions.length,
      new: redemptions.filter((r) => r.status === 'new').length,
      approved: redemptions.filter((r) => r.status === 'approved').length,
      delivered: redemptions.filter((r) => r.status === 'delivered').length,
      cancelled: redemptions.filter((r) => r.status === 'cancelled').length,
    }),
    [redemptions]
  );

  const totalPointsRedeemed = useMemo(
    () =>
      redemptions
        .filter((r) => r.status !== 'cancelled')
        .reduce((sum, r) => sum + r.pointsUsed, 0),
    [redemptions]
  );

  const handleSetRedemptionStatus = (id: number, status: Spa2LoyaltyRedemptionStatus) => {
    setRedemptions((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setViewRedemption((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2LoyaltyRewardsBanner, image: { ...spa2LoyaltyRewardsBanner.image } });
    setPointsBalance(spa2LoyaltyPointsBalance);
    setEarnRules(spa2LoyaltyEarnRules.map((r) => ({ ...r })));
    setCategories(spa2LoyaltyRewardCategories.map((c) => ({ ...c })));
    setRewards(spa2LoyaltyRewards.map((r) => ({ ...r })));
    setRedemptions(SPA2_LOYALTY_REDEMPTIONS);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('loyalty_rewards.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.loyalty_rewards')}
      publicPath={paths.spa2.loyaltyRewards}
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
          label={t('loyalty_rewards.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="points"
          label={t('loyalty_rewards.points_section')}
          icon={<Iconify icon="solar:medal-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('loyalty_rewards.categories_section')}
          icon={<Iconify icon="solar:folder-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="rewards"
          label={t('loyalty_rewards.rewards_section')}
          icon={<Iconify icon="solar:gift-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="redemptions"
          label="Đổi điểm thưởng"
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
            <SectionCard
              title={t('loyalty_rewards.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('loyalty_rewards.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('loyalty_rewards.banner_image_help')}
                />
                <TextField
                  label={t('loyalty_rewards.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('loyalty_rewards.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('loyalty_rewards.banner_subtitle')}
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

      {/* Points + earn rules */}
      {tab === 'points' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={5}>
            <SectionCard
              title={t('loyalty_rewards.points_section')}
              icon="solar:medal-star-bold-duotone"
            >
              <TextField
                type="number"
                label={t('loyalty_rewards.form_points_balance')}
                fullWidth
                size="small"
                value={pointsBalance}
                onChange={(e) => {
                  setPointsBalance(Number(e.target.value));
                  markDirty();
                }}
                sx={{ mb: 2 }}
              />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK }}>
                  {t('loyalty_rewards.earn_rules_section')}
                </Typography>
                <Button
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={addEarnRule}
                >
                  {t('loyalty_rewards.add_earn_rule_btn')}
                </Button>
              </Stack>
              <Spa2SortableGrid items={earnRules} onReorder={reorderEarnRules}>
                <Stack spacing={1.5}>
                  {earnRules.map((rule, idx) => (
                    <Spa2SortableItem key={rule.id} id={rule.id}>
                      {(sortable) => (
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Spa2DragHandle sortable={sortable} />
                          <TextField
                            size="small"
                            fullWidth
                            label={t('loyalty_rewards.form_earn_label')}
                            value={rule.label}
                            onChange={(e) => updateEarnRule(idx, { label: e.target.value })}
                          />
                          <TextField
                            size="small"
                            fullWidth
                            label={t('loyalty_rewards.form_earn_ratio')}
                            value={rule.ratio}
                            onChange={(e) => updateEarnRule(idx, { ratio: e.target.value })}
                          />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeEarnRule(idx)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                      )}
                    </Spa2SortableItem>
                  ))}
                </Stack>
              </Spa2SortableGrid>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={7}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Card
                sx={{
                  p: 0,
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
                  color: 'white',
                }}
              >
                <Grid container>
                  <Grid xs={12} md={4}>
                    <Box sx={{ p: 3 }}>
                      <Typography sx={{ opacity: 0.8, fontSize: 13, mb: 1 }}>
                        Điểm tích lũy của bạn
                      </Typography>
                      <Typography variant="h2" sx={{ fontWeight: 700 }}>
                        {pointsBalance.toLocaleString('vi-VN')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12} md={8}>
                    <Box sx={{ p: 3 }}>
                      <Typography sx={{ opacity: 0.8, fontSize: 13, mb: 1.5 }}>
                        Cách kiếm thêm điểm
                      </Typography>
                      <Grid container spacing={1.5}>
                        {earnRules.map((rule) => (
                          <Grid key={rule.id} xs={6} sm={3}>
                            <Box
                              sx={{
                                bgcolor: 'rgba(255,255,255,0.12)',
                                borderRadius: 2,
                                p: 1.5,
                                textAlign: 'center',
                              }}
                            >
                              <Typography sx={{ fontSize: 11, opacity: 0.8, mb: 0.25 }}>
                                {rule.label || '—'}
                              </Typography>
                              <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                                {rule.ratio || '—'}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Categories */}
      {tab === 'categories' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('loyalty_rewards.categories_section')}
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addCategory}
            >
              {t('loyalty_rewards.add_category_btn')}
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {categories
              .filter((c) => c.value === 'all')
              .map((c) => (
                <Stack key={c.value} direction="row" spacing={1.5} alignItems="center">
                  <Chip
                    size="small"
                    label={t('loyalty_rewards.category_all_locked')}
                    sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                  />
                  <TextField
                    size="small"
                    fullWidth
                    label={t('loyalty_rewards.form_category_label')}
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
                          sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                        />
                        <TextField
                          size="small"
                          fullWidth
                          label={t('loyalty_rewards.form_category_label')}
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

      {/* Rewards */}
      {tab === 'rewards' && (
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
              {t('loyalty_rewards.rewards_section')}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                select
                size="small"
                value={rewardFilter}
                onChange={(e) => setRewardFilter(e.target.value)}
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
                onClick={openCreateReward}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('loyalty_rewards.add_reward_btn')}
              </Button>
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            {filteredRewards.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <RewardPreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, left: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditReward(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setRewardDeleteId(item.id)}
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
      )}

      {/* Đổi điểm thưởng (redemptions) */}
      {tab === 'redemptions' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="solar:clipboard-list-bold-duotone"
                width={22}
                sx={{ color: SPA2_TEAL }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Đổi điểm thưởng
              </Typography>
            </Stack>
          </Box>

          {/* KPI */}
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              spacing={1}
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2, px: 2.5 }}
            >
              <Spa2ListAnalytic
                title="Tất cả"
                total={redemptionCounts.all}
                percent={100}
                icon="solar:clipboard-list-bold-duotone"
                color={SPA2_TEAL}
                unitLabel="lượt đổi"
                active={redemptionStatusFilter === 'all'}
                onClick={() => {
                  setRedemptionStatusFilter('all');
                  redemptionTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={REDEMPTION_STATUS_LABEL.new}
                total={redemptionCounts.new}
                percent={
                  redemptionCounts.all ? (redemptionCounts.new / redemptionCounts.all) * 100 : 0
                }
                icon="solar:bell-bing-bold-duotone"
                color="#00B8D9"
                unitLabel="lượt đổi"
                active={redemptionStatusFilter === 'new'}
                onClick={() => {
                  setRedemptionStatusFilter('new');
                  redemptionTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={REDEMPTION_STATUS_LABEL.approved}
                total={redemptionCounts.approved}
                percent={
                  redemptionCounts.all
                    ? (redemptionCounts.approved / redemptionCounts.all) * 100
                    : 0
                }
                icon="solar:check-circle-bold-duotone"
                color="#FFAB00"
                unitLabel="lượt đổi"
                active={redemptionStatusFilter === 'approved'}
                onClick={() => {
                  setRedemptionStatusFilter('approved');
                  redemptionTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={REDEMPTION_STATUS_LABEL.delivered}
                total={redemptionCounts.delivered}
                percent={
                  redemptionCounts.all
                    ? (redemptionCounts.delivered / redemptionCounts.all) * 100
                    : 0
                }
                icon="solar:box-bold-duotone"
                color="#22C55E"
                unitLabel="lượt đổi"
                active={redemptionStatusFilter === 'delivered'}
                onClick={() => {
                  setRedemptionStatusFilter('delivered');
                  redemptionTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title={REDEMPTION_STATUS_LABEL.cancelled}
                total={redemptionCounts.cancelled}
                percent={
                  redemptionCounts.all
                    ? (redemptionCounts.cancelled / redemptionCounts.all) * 100
                    : 0
                }
                icon="solar:close-circle-bold-duotone"
                color="#637381"
                unitLabel="lượt đổi"
                active={redemptionStatusFilter === 'cancelled'}
                onClick={() => {
                  setRedemptionStatusFilter('cancelled');
                  redemptionTable.onResetPage();
                }}
              />
              <Spa2ListAnalytic
                title="Tổng điểm đã đổi"
                total={totalPointsRedeemed}
                percent={100}
                icon="solar:star-bold-duotone"
                color={SPA2_TEAL_DARK}
                unitLabel="điểm"
                secondaryLine={
                  <Typography variant="caption" color="text.disabled">
                    (không tính lượt đã huỷ)
                  </Typography>
                }
              />
            </Stack>
          </Scrollbar>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder="Tìm khách hàng, SĐT, phần thưởng..."
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
              value={redemptionStatusFilter}
              onChange={(_, v: RedemptionStatusFilter) => {
                setRedemptionStatusFilter(v);
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
                value="approved"
                label={`${REDEMPTION_STATUS_LABEL.approved} (${redemptionCounts.approved})`}
              />
              <Tab
                value="delivered"
                label={`${REDEMPTION_STATUS_LABEL.delivered} (${redemptionCounts.delivered})`}
              />
              <Tab
                value="cancelled"
                label={`${REDEMPTION_STATUS_LABEL.cancelled} (${redemptionCounts.cancelled})`}
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Phần thưởng</TableCell>
                  <TableCell>Điểm đã dùng</TableCell>
                  <TableCell>Ngày đổi</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRedemptions
                  .slice(
                    redemptionTable.page * redemptionTable.rowsPerPage,
                    redemptionTable.page * redemptionTable.rowsPerPage + redemptionTable.rowsPerPage
                  )
                  .map((item) => {
                    const rewardInfo = rewardById.get(item.rewardId);
                    return (
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
                            <Typography variant="body2">{item.rewardName}</Typography>
                            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 0.5 }}>
                              <Chip
                                size="small"
                                label={item.rewardId}
                                variant="outlined"
                                sx={{ fontFamily: 'monospace', fontSize: 11 }}
                              />
                              {rewardInfo && (
                                <Typography variant="caption" color="text.disabled">
                                  {categoryLabelByValue.get(rewardInfo.category) ??
                                    rewardInfo.category}{' '}
                                  · còn {rewardInfo.stock}
                                </Typography>
                              )}
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={700} sx={{ color: SPA2_TEAL_DARK }}>
                            {item.pointsUsed.toLocaleString('vi-VN')} điểm
                          </Typography>
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
                                <Tooltip title="Duyệt">
                                  <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() => handleSetRedemptionStatus(item.id, 'approved')}
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
                            {item.status === 'approved' && (
                              <>
                                <Tooltip title="Đã giao">
                                  <IconButton
                                    size="small"
                                    sx={{ color: SPA2_TEAL_DARK }}
                                    onClick={() => handleSetRedemptionStatus(item.id, 'delivered')}
                                  >
                                    <Iconify icon="solar:box-bold" />
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
                    );
                  })}
                {filteredRedemptions.length === 0 && (
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
            count={filteredRedemptions.length}
            page={redemptionTable.page}
            rowsPerPage={redemptionTable.rowsPerPage}
            onPageChange={redemptionTable.onChangePage}
            onRowsPerPageChange={redemptionTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2LoyaltyRewardsPageView
            banner={banner}
            pointsBalance={pointsBalance}
            earnRules={earnRules}
            categories={categories}
            rewards={rewards}
          />
        </Box>
      )}

      {/* Reward add/edit dialog */}
      <Dialog open={rewardDialog} onClose={() => setRewardDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {rewardEditId ? t('common.edit') : t('loyalty_rewards.add_reward_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label={t('loyalty_rewards.form_reward_category')}
                    fullWidth
                    size="small"
                    value={rewardForm.category}
                    onChange={(e) => setRewardForm((p) => ({ ...p, category: e.target.value }))}
                  >
                    {realCategories.map((c) => (
                      <MenuItem key={c.value} value={c.value}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={t('loyalty_rewards.form_icon')}
                    fullWidth
                    size="small"
                    value={rewardForm.icon}
                    onChange={(e) => setRewardForm((p) => ({ ...p, icon: e.target.value }))}
                    helperText="solar:leaf-bold"
                  />
                </Stack>
                <TextField
                  label={t('loyalty_rewards.form_reward_name')}
                  fullWidth
                  size="small"
                  value={rewardForm.name}
                  onChange={(e) => setRewardForm((p) => ({ ...p, name: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('loyalty_rewards.form_reward_points')}
                    type="number"
                    fullWidth
                    size="small"
                    value={rewardForm.points}
                    onChange={(e) =>
                      setRewardForm((p) => ({ ...p, points: Number(e.target.value) }))
                    }
                  />
                  <TextField
                    label={t('loyalty_rewards.form_reward_stock')}
                    type="number"
                    fullWidth
                    size="small"
                    value={rewardForm.stock}
                    onChange={(e) =>
                      setRewardForm((p) => ({ ...p, stock: Number(e.target.value) }))
                    }
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('loyalty_rewards.form_reward_image')}
                  value={rewardForm.image}
                  onChange={(url) => setRewardForm((p) => ({ ...p, image: url }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <RewardPreviewCard
                  id={rewardEditId ?? 'preview'}
                  category={rewardForm.category}
                  icon={rewardForm.icon}
                  name={rewardForm.name}
                  points={rewardForm.points}
                  image={rewardForm.image}
                  stock={rewardForm.stock}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRewardDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitReward}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {rewardEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!rewardDeleteId}
        onClose={() => setRewardDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteReward}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Xem chi tiết đổi điểm thưởng */}
      <Dialog
        open={!!viewRedemption}
        onClose={() => setViewRedemption(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          Chi tiết đổi điểm #{viewRedemption?.id}
        </DialogTitle>
        <DialogContent dividers>
          {viewRedemption && (
            <Stack spacing={1.5}>
              {(
                [
                  ['Khách hàng', viewRedemption.customer],
                  ['Điện thoại', viewRedemption.phone],
                  ['Phần thưởng', viewRedemption.rewardName],
                  ['Mã phần thưởng', viewRedemption.rewardId],
                  ['Điểm đã dùng', `${viewRedemption.pointsUsed.toLocaleString('vi-VN')} điểm`],
                  ['Ngày đổi', viewRedemption.createdAt],
                ] as [string, string][]
              ).map(([label, value]) => (
                <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                  {t('common.status')}:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewRedemption.status}
                  onChange={(e) =>
                    handleSetRedemptionStatus(
                      viewRedemption.id,
                      e.target.value as Spa2LoyaltyRedemptionStatus
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
