import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2LoyaltyRewards,
  spa2LoyaltyEarnRules,
  type Spa2AdjustableImage,
  spa2LoyaltyRewardsBanner,
  spa2LoyaltyPointsBalance,
  type Spa2LoyaltyReward,
  spa2LoyaltyRewardCategories,
  type Spa2LoyaltyEarnRule,
  type Spa2LoyaltyRewardsBanner,
  type Spa2LoyaltyRewardCategory,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

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

import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

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
  const [tab, setTab] = useState<'banner' | 'points' | 'categories' | 'rewards' | 'preview'>(
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
              <Stack spacing={1.5}>
                {earnRules.map((rule, idx) => (
                  <Stack key={rule.id} direction="row" spacing={1} alignItems="center">
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
                    <IconButton size="small" color="error" onClick={() => removeEarnRule(idx)}>
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
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
            {categories.map((c, idx) => (
              <Stack key={c.value} direction="row" spacing={1.5} alignItems="center">
                <Chip
                  size="small"
                  label={c.value === 'all' ? t('loyalty_rewards.category_all_locked') : c.value}
                  sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  label={t('loyalty_rewards.form_category_label')}
                  value={c.label}
                  onChange={(e) => updateCategory(idx, { label: e.target.value })}
                />
                {c.value !== 'all' && (
                  <IconButton size="small" color="error" onClick={() => removeCategory(idx)}>
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                )}
              </Stack>
            ))}
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
      <Dialog open={rewardDialog} onClose={() => setRewardDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {rewardEditId ? t('common.edit') : t('loyalty_rewards.add_reward_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
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
            <Grid xs={12} sm={5}>
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
    </Spa2ManageShell>
  );
}
