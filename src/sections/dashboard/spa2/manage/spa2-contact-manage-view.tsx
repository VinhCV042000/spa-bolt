import type { ReactNode } from 'react';
import type {
  Spa2AdjustableImage,
  Spa2ContactSubmission,
  Spa2ContactSubmissionStatus,
} from 'src/_mock/_spa2';

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
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
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

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import { spa2ContactInfo, spa2ContactBanner, SPA2_CONTACT_SUBMISSIONS } from 'src/_mock/_spa2';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { useTable } from 'src/components/table/use-table';
import { TablePaginationCustom } from 'src/components/table/table-pagination-custom';

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
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages.tsx's
// Spa2ContactPageView renders on the public /spa2/contact page: the page
// banner and the contact info cards (hotline/email/zalo/address) - read
// from and written back in the same shape as src/_mock/_spa2 (spa2ContactInfo
// + spa2ContactBanner), the single source of truth shared with the public
// view. The "banner"/"info" tabs reuse Spa2PageHero/Spa2SoftCard directly
// (same components the public page renders) so the right-hand live preview
// can never visually drift from reality.
// -----------------------------------------------------------------------------

type TabKey = 'banner' | 'info' | 'submissions' | 'preview';

// ---------- Khách hàng liên hệ (contact form submissions) tab ----------

type SubmissionStatusFilter = Spa2ContactSubmissionStatus | 'all';

const SUBMISSION_STATUS_COLOR: Record<Spa2ContactSubmissionStatus, 'info' | 'success' | 'default'> =
  {
    new: 'info',
    replied: 'success',
    closed: 'default',
  };

const SUBMISSION_STATUS_LABEL: Record<Spa2ContactSubmissionStatus, string> = {
  new: 'Mới',
  replied: 'Đã trả lời',
  closed: 'Đã đóng',
};

const SUBMISSION_STATUS_OPTIONS: Spa2ContactSubmissionStatus[] = ['new', 'replied', 'closed'];

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

export function Spa2ContactManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2ContactBanner,
    image: { ...spa2ContactBanner.image },
  }));
  const [info, setInfo] = useState(() => ({ ...spa2ContactInfo }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<TabKey>('banner');
  const markDirty = () => setDirty(true);

  // ---- Khách hàng liên hệ (contact form submissions) ----
  const [submissions, setSubmissions] = useState<Spa2ContactSubmission[]>(SPA2_CONTACT_SUBMISSIONS);
  const [submissionSearch, setSubmissionSearch] = useState('');
  const [submissionStatusFilter, setSubmissionStatusFilter] =
    useState<SubmissionStatusFilter>('all');
  const [viewSubmission, setViewSubmission] = useState<Spa2ContactSubmission | null>(null);
  const submissionsTable = useTable({ defaultRowsPerPage: 5 });

  const filteredSubmissions = useMemo(
    () =>
      submissions.filter((s) => {
        const q = submissionSearch.toLowerCase();
        const matchSearch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.phone.includes(submissionSearch) ||
          s.email.toLowerCase().includes(q) ||
          s.subject.toLowerCase().includes(q) ||
          s.message.toLowerCase().includes(q);
        const matchStatus = submissionStatusFilter === 'all' || s.status === submissionStatusFilter;
        return matchSearch && matchStatus;
      }),
    [submissions, submissionSearch, submissionStatusFilter]
  );

  const handleSetSubmissionStatus = useCallback(
    (id: number, status: Spa2ContactSubmissionStatus) => {
      setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
      setViewSubmission((v) => (v?.id === id ? { ...v, status } : v));
    },
    []
  );

  const submissionCounts = {
    all: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    replied: submissions.filter((s) => s.status === 'replied').length,
    closed: submissions.filter((s) => s.status === 'closed').length,
  };

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  const updateInfo = (key: keyof typeof spa2ContactInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ContactBanner, image: { ...spa2ContactBanner.image } });
    setInfo({ ...spa2ContactInfo });
    setSubmissions(SPA2_CONTACT_SUBMISSIONS);
    setDirty(false);
  };

  // Matches Spa2ContactPageView's `items` exactly (same 4 fields, same order).
  const items = [
    { icon: 'solar:phone-bold', label: 'Hotline', value: info.hotline },
    { icon: 'solar:letter-bold', label: 'Email', value: info.email },
    { icon: 'solar:chat-round-dots-bold', label: 'Zalo', value: info.zalo },
    { icon: 'solar:map-point-bold', label: 'Trụ sở', value: info.address },
  ];

  const contactFormCard = (
    <Spa2SoftCard>
      <Spa2SectionTitle eyebrow="Gửi lời nhắn" title="Form liên hệ" align="left" />
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label="Họ và tên" disabled />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label="Số điện thoại" disabled />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth label="Email" disabled />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth label="Chủ đề" disabled />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth multiline rows={4} label="Nội dung" disabled />
        </Grid>
        <Grid xs={12}>
          <Button
            fullWidth
            size="large"
            disabled
            sx={{
              borderRadius: 999,
              py: 1.5,
              bgcolor: SPA2_TEAL,
              color: 'white',
              '&.Mui-disabled': { bgcolor: SPA2_TEAL, color: 'white', opacity: 0.85 },
            }}
          >
            Gửi lời nhắn
          </Button>
        </Grid>
      </Grid>
    </Spa2SoftCard>
  );

  return (
    <Spa2ManageShell
      title={t('contact.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.contact')}
      publicPath={paths.spa2.contact}
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
        onChange={(_, v: TabKey) => setTab(v)}
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
          label={t('contact.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="info"
          label={t('contact.info_section')}
          icon={<Iconify icon="solar:phone-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="submissions"
          label="Khách hàng liên hệ"
          icon={<Iconify icon="solar:chat-round-line-bold-duotone" width={20} />}
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
            <SectionCard title={t('contact.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('contact.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('contact.banner_image_help')}
                />
                <TextField
                  label={t('contact.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('contact.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('contact.banner_subtitle')}
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

      {/* Contact info - left: edit, right: live preview (same Spa2SoftCard cards as public page) */}
      {tab === 'info' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('contact.info_section')} icon="solar:phone-bold-duotone">
              <Grid container spacing={2.5}>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_hotline')}
                    value={info.hotline}
                    onChange={(e) => updateInfo('hotline', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:phone-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_email')}
                    value={info.email}
                    onChange={(e) => updateInfo('email', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:letter-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_zalo')}
                    value={info.zalo}
                    onChange={(e) => updateInfo('zalo', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:chat-round-dots-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_working_hours')}
                    value={info.workingHours}
                    onChange={(e) => updateInfo('workingHours', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:clock-circle-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label={t('contact.form_address')}
                    value={info.address}
                    onChange={(e) => updateInfo('address', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:map-point-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Stack spacing={2}>
                {items.map((i) => (
                  <Spa2SoftCard key={i.label}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: SPA2_CREAM,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Iconify icon={i.icon} sx={{ color: SPA2_TEAL }} width={24} />
                      </Box>
                      <Stack>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {i.label}
                        </Typography>
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{i.value}</Typography>
                      </Stack>
                    </Stack>
                  </Spa2SoftCard>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Khách hàng liên hệ - tin nhắn khách gửi qua form liên hệ công khai (dữ liệu vận hành, không đồng bộ với trang public) */}
      {tab === 'submissions' && (
        <Card>
          <Box sx={{ p: 2.5, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon="solar:chat-round-line-bold-duotone"
                width={22}
                sx={{ color: SPA2_TEAL }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Khách hàng liên hệ
              </Typography>
            </Stack>
          </Box>

          {/* KPI */}
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack spacing={2} direction="row" sx={{ py: 2, px: 1 }}>
              {[
                {
                  key: 'all',
                  label: 'Tất cả',
                  value: submissionCounts.all,
                  icon: 'solar:chat-round-dots-bold-duotone',
                },
                {
                  key: 'new',
                  label: SUBMISSION_STATUS_LABEL.new,
                  value: submissionCounts.new,
                  icon: 'solar:bell-bing-bold-duotone',
                },
                {
                  key: 'replied',
                  label: SUBMISSION_STATUS_LABEL.replied,
                  value: submissionCounts.replied,
                  icon: 'solar:check-circle-bold-duotone',
                },
                {
                  key: 'closed',
                  label: SUBMISSION_STATUS_LABEL.closed,
                  value: submissionCounts.closed,
                  icon: 'solar:close-circle-bold-duotone',
                },
              ].map((k) => (
                <Card
                  onClick={() => {
                    setSubmissionStatusFilter(k.key as SubmissionStatusFilter);
                    submissionsTable.onResetPage();
                  }}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    width: 1,
                    minWidth: 180,
                    bgcolor: submissionStatusFilter === k.key ? `${SPA2_TEAL}12` : SPA2_CREAM,
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
              ))}
            </Stack>
          </Scrollbar>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ px: 2.5, pb: 2 }}>
            <TextField
              placeholder="Tìm theo tên, số điện thoại, email, chủ đề, nội dung..."
              value={submissionSearch}
              onChange={(e) => {
                setSubmissionSearch(e.target.value);
                submissionsTable.onResetPage();
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
              value={submissionStatusFilter}
              onChange={(_, v: SubmissionStatusFilter) => {
                setSubmissionStatusFilter(v);
                submissionsTable.onResetPage();
              }}
              variant="scrollable"
              sx={{
                '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              }}
            >
              <Tab
                value="all"
                label="Tất cả"
                iconPosition="end"
                icon={
                  <Label
                    variant={(submissionStatusFilter === 'all' && 'filled') || 'soft'}
                    color="default"
                  >
                    {submissionCounts.all}
                  </Label>
                }
              />
              <Tab
                value="new"
                label={`${SUBMISSION_STATUS_LABEL.new}`}
                iconPosition="end"
                icon={
                  <Label
                    variant={(submissionStatusFilter === 'new' && 'filled') || 'soft'}
                    color="success"
                  >
                    {submissionCounts.new}
                  </Label>
                }
              />
              <Tab
                value="replied"
                label={`${SUBMISSION_STATUS_LABEL.replied}`}
                iconPosition="end"
                icon={
                  <Label
                    variant={(submissionStatusFilter === 'replied' && 'filled') || 'soft'}
                    color="info"
                  >
                    {submissionCounts.replied}
                  </Label>
                }
              />
              <Tab
                value="closed"
                label={`${SUBMISSION_STATUS_LABEL.closed}`}
                iconPosition="end"
                icon={
                  <Label
                    variant={(submissionStatusFilter === 'closed' && 'filled') || 'soft'}
                    color="error"
                  >
                    {submissionCounts.closed}
                  </Label>
                }
              />
            </Tabs>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell>Chủ đề</TableCell>
                  <TableCell>Nội dung</TableCell>
                  <TableCell>Ngày gửi</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubmissions
                  .slice(
                    submissionsTable.page * submissionsTable.rowsPerPage,
                    submissionsTable.page * submissionsTable.rowsPerPage +
                      submissionsTable.rowsPerPage
                  )
                  .map((s) => (
                    <TableRow key={s.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {s.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {s.phone}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {s.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{s.subject}</Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 240 }}>
                        <Tooltip title={s.message}>
                          <Typography variant="body2" noWrap>
                            {s.message}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{s.createdAt}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={SUBMISSION_STATUS_LABEL[s.status]}
                          color={SUBMISSION_STATUS_COLOR[s.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {s.status === 'new' && (
                            <Tooltip title="Đánh dấu đã trả lời">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleSetSubmissionStatus(s.id, 'replied')}
                              >
                                <Iconify icon="solar:check-circle-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {s.status !== 'closed' && (
                            <Tooltip title="Đóng">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleSetSubmissionStatus(s.id, 'closed')}
                              >
                                <Iconify icon="solar:close-circle-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Xem chi tiết">
                            <IconButton size="small" onClick={() => setViewSubmission(s)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                {filteredSubmissions.length === 0 && (
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
            count={filteredSubmissions.length}
            page={submissionsTable.page}
            rowsPerPage={submissionsTable.rowsPerPage}
            onPageChange={submissionsTable.onChangePage}
            onRowsPerPageChange={submissionsTable.onChangeRowsPerPage}
          />
        </Card>
      )}

      {/* Full-page live preview - pixel-for-pixel same layout/order as the public /spa2/contact page */}
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
            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Container>
                <Grid container spacing={5}>
                  <Grid xs={12} md={5}>
                    <Stack spacing={2}>
                      {items.map((i) => (
                        <Spa2SoftCard key={i.label}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                bgcolor: SPA2_CREAM,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Iconify icon={i.icon} sx={{ color: SPA2_TEAL }} width={24} />
                            </Box>
                            <Stack>
                              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                                {i.label}
                              </Typography>
                              <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                                {i.value}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Spa2SoftCard>
                      ))}
                    </Stack>
                  </Grid>
                  <Grid xs={12} md={7}>
                    {contactFormCard}
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      )}

      {/* Xem chi tiết tin nhắn liên hệ */}
      <Dialog
        open={!!viewSubmission}
        onClose={() => setViewSubmission(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          Chi tiết liên hệ #{viewSubmission?.id}
        </DialogTitle>
        <DialogContent dividers>
          {viewSubmission && (
            <Stack spacing={1.5}>
              {[
                ['Họ và tên', viewSubmission.name],
                ['Số điện thoại', viewSubmission.phone],
                ['Email', viewSubmission.email],
                ['Chủ đề', viewSubmission.subject],
                ['Ngày gửi', viewSubmission.createdAt],
              ].map(([label, value]) => (
                <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              ))}
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Nội dung:
                </Typography>
                <Typography variant="body2" fontWeight={500} sx={{ whiteSpace: 'pre-wrap' }}>
                  {viewSubmission.message}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                  Trạng thái:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewSubmission.status}
                  onChange={(e) =>
                    handleSetSubmissionStatus(
                      viewSubmission.id,
                      e.target.value as Spa2ContactSubmissionStatus
                    )
                  }
                  sx={{ flex: 1 }}
                >
                  {SUBMISSION_STATUS_OPTIONS.map((st) => (
                    <MenuItem key={st} value={st}>
                      {SUBMISSION_STATUS_LABEL[st]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewSubmission(null)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
