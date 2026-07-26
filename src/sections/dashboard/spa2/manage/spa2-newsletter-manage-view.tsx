import type {
  Spa2AdjustableImage,
  Spa2NewsletterConfig,
  Spa2NewsletterBanner,
  Spa2NewsletterBenefit,
  Spa2NewsletterSubscriber,
  Spa2NewsletterSubscriberStatus,
} from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2NewsletterConfig,
  spa2NewsletterBanner,
  spa2NewsletterBenefits,
  SPA2_NEWSLETTER_SUBSCRIBERS,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

import { Spa2NewsletterPageView } from 'src/sections/spa2/view/spa2-content-pages4';
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
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages4.tsx's
// Spa2NewsletterPageView renders on the public /spa2/newsletter page: the page
// banner, the "you'll receive" benefit list and the welcome-gift/social-proof
// config (voucher amount, voucher code, subscriber count, satisfaction
// rating) — read from and written back in the same shape as src/_mock/_spa2,
// the single source of truth shared with the public view. The email/topic/
// frequency subscription form on the public page is purely interactive UI
// (no admin-editable content) and is intentionally not mocked here, matching
// the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_BENEFIT_FORM = { icon: 'solar:star-bold-duotone', title: '', desc: '' };

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// Mirrors a single benefit row in the "Bạn sẽ nhận được" list rendered by
// Spa2NewsletterPageView on the public /spa2/newsletter page.
function BenefitPreviewCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <Card sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 3,
            bgcolor: SPA2_CREAM,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon={icon || 'solar:star-bold-duotone'} width={22} sx={{ color: SPA2_TEAL }} />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.25 }}>
            {title || 'Tiêu đề lợi ích'}
          </Typography>
          <Typography sx={{ fontSize: 13.5, color: 'text.secondary', lineHeight: 1.6 }}>
            {desc || 'Mô tả ngắn…'}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

// Mirrors the welcome-gift alert, voucher chip and social-proof stats
// rendered by Spa2NewsletterPageView on the public /spa2/newsletter page,
// fed live from the config form as the admin edits it.
function ConfigPreviewCard({ config }: { config: Spa2NewsletterConfig }) {
  return (
    <Stack spacing={2}>
      <Alert severity="success" sx={{ borderRadius: 2.5, bgcolor: '#E8F5E9', color: '#1B5E20' }}>
        <Typography sx={{ fontWeight: 600, mb: 0.5 }}>🎁 Quà chào mừng</Typography>
        Đăng ký nhận ngay voucher <strong>{formatVND(config.welcomeGiftAmount)}</strong> cho lần
        đặt lịch đầu tiên từ bản tin.
      </Alert>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Mã áp dụng:</Typography>
        <Chip
          label={`Mã: ${config.voucherCode}`}
          sx={{
            bgcolor: SPA2_CREAM,
            color: SPA2_TEAL_DARK,
            fontWeight: 700,
            fontSize: 16,
            height: 40,
            px: 1,
          }}
        />
      </Stack>
      <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', bgcolor: SPA2_CREAM, boxShadow: 'none' }}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
          Cùng {config.subscriberCount.toLocaleString('vi-VN')}+ người đăng ký
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5 }}>
          Độ hài lòng bản tin: {config.satisfactionRating}/5 ⭐
        </Typography>
      </Card>
    </Stack>
  );
}

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

export function Spa2NewsletterManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2NewsletterBanner>(() => ({
    ...spa2NewsletterBanner,
    image: { ...spa2NewsletterBanner.image },
  }));
  const [benefits, setBenefits] = useState<Spa2NewsletterBenefit[]>(spa2NewsletterBenefits);
  const [config, setConfig] = useState<Spa2NewsletterConfig>(spa2NewsletterConfig);
  const [subscribers, setSubscribers] = useState<Spa2NewsletterSubscriber[]>(
    SPA2_NEWSLETTER_SUBSCRIBERS
  );
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'benefits' | 'config' | 'subscribers' | 'preview'>(
    'banner'
  );

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const updateConfig = (key: keyof Spa2NewsletterConfig, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [key]: key === 'voucherCode' ? value : Number(value),
    }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2NewsletterBanner, image: { ...spa2NewsletterBanner.image } });
    setBenefits(spa2NewsletterBenefits);
    setConfig(spa2NewsletterConfig);
    setSubscribers(SPA2_NEWSLETTER_SUBSCRIBERS);
    setDirty(false);
  };
  const reorderBenefits = (next: Spa2NewsletterBenefit[]) => {
    setBenefits(next);
    setDirty(true);
  };

  // ---- Người đăng ký (subscribers) ----
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [subscriberStatusFilter, setSubscriberStatusFilter] = useState<
    'all' | Spa2NewsletterSubscriberStatus
  >('all');
  const subscriberTable = useTable({ defaultRowsPerPage: 5 });

  const filteredSubscribers = subscribers.filter((s) => {
    const q = subscriberSearch.toLowerCase();
    const matchSearch =
      !q || s.email.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
    const matchStatus = subscriberStatusFilter === 'all' || s.status === subscriberStatusFilter;
    return matchSearch && matchStatus;
  });

  const subscriberCounts = {
    all: subscribers.length,
    active: subscribers.filter((s) => s.status === 'active').length,
    unsubscribed: subscribers.filter((s) => s.status === 'unsubscribed').length,
  };

  const now = new Date();
  const subscribersThisMonth = subscribers.filter((s) => {
    const d = new Date(s.subscribedAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
  const retentionRate = subscriberCounts.all
    ? Math.round((subscriberCounts.active / subscriberCounts.all) * 100)
    : 0;

  const handleToggleSubscriberStatus = (id: number) => {
    setSubscribers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'unsubscribed' : 'active' } : s
      )
    );
  };

  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_BENEFIT_FORM);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_BENEFIT_FORM);
    setEditId(null);
    setOpenForm(true);
  };
  const openEdit = (item: Spa2NewsletterBenefit) => {
    setForm({ icon: item.icon, title: item.title, desc: item.desc });
    setEditId(item.id);
    setOpenForm(true);
  };
  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setBenefits((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      setBenefits((p) => [...p, withId({ ...form })]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId]);
  const handleDelete = useCallback(() => {
    setBenefits((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  return (
    <Spa2ManageShell
      title={t('newsletter.page_title')}
      description="Banner, danh sách lợi ích và cấu hình quà tặng/số liệu hiển thị trên trang Bản tin công khai."
      breadcrumbLabel={t('nav.newsletter')}
      publicPath={paths.spa2.newsletter}
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
          label={t('newsletter.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="benefits"
          label={t('newsletter.benefits_section')}
          icon={<Iconify icon="solar:gift-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="config"
          label={t('newsletter.config_section')}
          icon={<Iconify icon="solar:settings-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="subscribers"
          label="Người đăng ký"
          icon={<Iconify icon="solar:user-rounded-bold-duotone" width={20} />}
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
                  label={t('newsletter.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('newsletter.banner_image_help')}
                />
                <TextField
                  label={t('newsletter.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('newsletter.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('newsletter.banner_subtitle')}
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
              <Spa2NewsletterPageView banner={banner} benefits={benefits} config={config} />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Benefits */}
      {tab === 'benefits' && (
        <Spa2SortableGrid items={benefits} onReorder={reorderBenefits}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={openCreate}
                  sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
                >
                  {t('newsletter.benefit_add_btn')}
                </Button>
              </Stack>
            </Grid>
            {benefits.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Spa2SortableItem id={item.id}>
                  {(sortable) => (
                    <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                      <Iconify icon={item.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1 }} />
                      <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
                      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                        {item.desc}
                      </Typography>
                      <Stack direction="row" justifyContent="center" spacing={0.5}>
                        <Spa2DragHandle sortable={sortable} />
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
                    </Card>
                  )}
                </Spa2SortableItem>
              </Grid>
            ))}
          </Grid>
        </Spa2SortableGrid>
      )}

      {/* Config */}
      {tab === 'config' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2.5}>
                <TextField
                  label={t('newsletter.config_gift_amount')}
                  type="number"
                  value={config.welcomeGiftAmount}
                  onChange={(e) => updateConfig('welcomeGiftAmount', e.target.value)}
                  InputProps={{ endAdornment: <InputAdornment position="end">đ</InputAdornment> }}
                  fullWidth
                />
                <TextField
                  label={t('newsletter.config_voucher_code')}
                  value={config.voucherCode}
                  onChange={(e) => updateConfig('voucherCode', e.target.value)}
                  fullWidth
                />
                <TextField
                  label={t('newsletter.config_subscriber_count')}
                  type="number"
                  value={config.subscriberCount}
                  onChange={(e) => updateConfig('subscriberCount', e.target.value)}
                  fullWidth
                />
                <TextField
                  label={t('newsletter.config_satisfaction_rating')}
                  type="number"
                  value={config.satisfactionRating}
                  onChange={(e) => updateConfig('satisfactionRating', e.target.value)}
                  inputProps={{ step: 0.1, min: 0, max: 5 }}
                  helperText={t('newsletter.config_satisfaction_rating_help')}
                  fullWidth
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <ConfigPreviewCard config={config} />
          </Grid>
        </Grid>
      )}

      {/* Subscribers */}
      {tab === 'subscribers' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="solar:user-rounded-bold-duotone"
                width={22}
                sx={{ color: SPA2_TEAL }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Người đăng ký nhận bản tin
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ p: 2.5 }}>
            <Card sx={{ bgcolor: SPA2_CREAM, mb: 2 }}>
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
                    total={subscriberCounts.all}
                    percent={100}
                    icon="solar:users-group-rounded-bold-duotone"
                    color={SPA2_TEAL}
                    unitLabel="người"
                    active={subscriberStatusFilter === 'all'}
                    onClick={() => {
                      setSubscriberStatusFilter('all');
                      subscriberTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title="Đang hoạt động"
                    total={subscriberCounts.active}
                    percent={
                      subscriberCounts.all
                        ? (subscriberCounts.active / subscriberCounts.all) * 100
                        : 0
                    }
                    icon="solar:check-circle-bold-duotone"
                    color="#22C55E"
                    unitLabel="người"
                    active={subscriberStatusFilter === 'active'}
                    onClick={() => {
                      setSubscriberStatusFilter('active');
                      subscriberTable.onResetPage();
                    }}
                  />
                  <Spa2ListAnalytic
                    title="Đã huỷ đăng ký"
                    total={subscriberCounts.unsubscribed}
                    percent={
                      subscriberCounts.all
                        ? (subscriberCounts.unsubscribed / subscriberCounts.all) * 100
                        : 0
                    }
                    icon="solar:close-circle-bold-duotone"
                    color="#637381"
                    unitLabel="người"
                    active={subscriberStatusFilter === 'unsubscribed'}
                    onClick={() => {
                      setSubscriberStatusFilter('unsubscribed');
                      subscriberTable.onResetPage();
                    }}
                  />
                </Stack>
              </Scrollbar>
            </Card>

            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify
                icon="solar:chart-2-bold-duotone"
                width={16}
                sx={{ color: SPA2_TEAL_DARK }}
              />
              <Typography variant="caption" color="text.secondary">
                Tổng hợp: tỷ lệ đang hoạt động <strong>{retentionRate}%</strong> trên tổng{' '}
                {subscriberCounts.all} người đăng ký · <strong>{subscribersThisMonth}</strong>{' '}
                người đăng ký mới trong tháng này
              </Typography>
            </Stack>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder="Tìm theo tên hoặc email..."
              value={subscriberSearch}
              onChange={(e) => {
                setSubscriberSearch(e.target.value);
                subscriberTable.onResetPage();
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
              value={subscriberStatusFilter}
              onChange={(_, v: 'all' | Spa2NewsletterSubscriberStatus) => {
                setSubscriberStatusFilter(v);
                subscriberTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab value="all" label={`Tất cả (${subscriberCounts.all})`} />
              <Tab value="active" label={`Đang hoạt động (${subscriberCounts.active})`} />
              <Tab
                value="unsubscribed"
                label={`Đã huỷ đăng ký (${subscriberCounts.unsubscribed})`}
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Người đăng ký</TableCell>
                  <TableCell>Nguồn</TableCell>
                  <TableCell>Ngày đăng ký</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubscribers
                  .slice(
                    subscriberTable.page * subscriberTable.rowsPerPage,
                    subscriberTable.page * subscriberTable.rowsPerPage +
                      subscriberTable.rowsPerPage
                  )
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.source}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.subscribedAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          variant="soft"
                          label={item.status === 'active' ? 'Đang hoạt động' : 'Đã huỷ đăng ký'}
                          color={item.status === 'active' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title={item.status === 'active' ? 'Huỷ đăng ký' : 'Kích hoạt lại'}>
                          <IconButton
                            size="small"
                            color={item.status === 'active' ? 'error' : 'success'}
                            onClick={() => handleToggleSubscriberStatus(item.id)}
                          >
                            <Iconify
                              icon={
                                item.status === 'active'
                                  ? 'solar:forbidden-circle-bold'
                                  : 'solar:check-circle-bold'
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredSubscribers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={filteredSubscribers.length}
            page={subscriberTable.page}
            rowsPerPage={subscriberTable.rowsPerPage}
            onPageChange={subscriberTable.onChangePage}
            onRowsPerPageChange={subscriberTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Live preview - full public page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Spa2NewsletterPageView banner={banner} benefits={benefits} config={config} />
        </Box>
      )}

      {/* Create / edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editId !== null
            ? t('newsletter.benefit_form_edit')
            : t('newsletter.benefit_form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('newsletter.benefit_form_icon')}
                  value={form.icon}
                  onChange={handleChange('icon')}
                  helperText={t('newsletter.benefit_form_icon_help')}
                  fullWidth
                />
                <TextField
                  label={t('newsletter.benefit_form_title')}
                  value={form.title}
                  onChange={handleChange('title')}
                  fullWidth
                />
                <TextField
                  label={t('newsletter.benefit_form_desc')}
                  value={form.desc}
                  onChange={handleChange('desc')}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <BenefitPreviewCard icon={form.icon} title={form.title} desc={form.desc} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null
              ? t('newsletter.benefit_form_edit')
              : t('newsletter.benefit_form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('newsletter.benefit_delete_title')}
        content={t('newsletter.benefit_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
