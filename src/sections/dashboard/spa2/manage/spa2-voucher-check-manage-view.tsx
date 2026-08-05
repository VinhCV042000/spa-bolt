import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2VoucherCheckPageView } from 'src/sections/spa2/view/spa2-content-pages9';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  spa2VoucherFaqs,
  SPA2_CREAM_DARK,
  spa2VoucherRecords,
  type Spa2VoucherFaq,
  spa2VoucherCheckBanner,
  type Spa2VoucherRecord,
  type Spa2VoucherCheckBanner,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages9.tsx's
// Spa2VoucherCheckPageView renders on the public /spa2/voucher-check page: the
// hero banner (eyebrow/title/subtitle), the small in-memory table of demo
// voucher codes the public lookup form matches against, and the FAQ
// accordion list below - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The lookup form's "nhập mã -> kiểm tra -> kết quả" interactive demo state
// on the public page is purely client-derived and intentionally not
// mocked/editable here.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_VOUCHER: Omit<Spa2VoucherRecord, 'id'> = {
  code: '',
  type: '',
  balance: 0,
  expiry: '',
};

const EMPTY_FAQ: Omit<Spa2VoucherFaq, 'id'> = {
  q: '',
  a: '',
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
    <Card sx={{ p: 3, borderRadius: 3 }}>
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

// Mirrors the cream hero section rendered by Spa2VoucherCheckPageView on the
// public page - eyebrow/title/subtitle over the SPA2_CREAM PageHero.
function BannerPreview({ banner }: { banner: Spa2VoucherCheckBanner }) {
  return (
    <Box sx={{ bgcolor: '#FBF7F0', py: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa2VoucherCheckManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2VoucherCheckBanner>(() => ({
    ...spa2VoucherCheckBanner,
  }));
  const [vouchers, setVouchers] = useState<Spa2VoucherRecord[]>(() =>
    spa2VoucherRecords.map((item) => ({ ...item }))
  );
  const [faqs, setFaqs] = useState<Spa2VoucherFaq[]>(() =>
    spa2VoucherFaqs.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'demo_codes' | 'faq' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Demo voucher codes CRUD ----
  const [voucherDialog, setVoucherDialog] = useState(false);
  const [voucherEditId, setVoucherEditId] = useState<string | null>(null);
  const [voucherForm, setVoucherForm] = useState<Omit<Spa2VoucherRecord, 'id'>>(EMPTY_VOUCHER);
  const [voucherDeleteId, setVoucherDeleteId] = useState<string | null>(null);

  const openCreateVoucher = () => {
    setVoucherForm(EMPTY_VOUCHER);
    setVoucherEditId(null);
    setVoucherDialog(true);
  };
  const openEditVoucher = (item: Spa2VoucherRecord) => {
    const { id, ...rest } = item;
    setVoucherForm({ ...rest });
    setVoucherEditId(id);
    setVoucherDialog(true);
  };
  const submitVoucher = () => {
    const next: Omit<Spa2VoucherRecord, 'id'> = {
      ...voucherForm,
      balance: Number(voucherForm.balance),
    };
    if (voucherEditId) {
      setVouchers((prev) =>
        prev.map((item) => (item.id === voucherEditId ? { ...item, ...next } : item))
      );
    } else {
      setVouchers((prev) => [...prev, withId(next)]);
    }
    setVoucherDialog(false);
    markDirty();
  };
  const confirmDeleteVoucher = () => {
    setVouchers((prev) => prev.filter((item) => item.id !== voucherDeleteId));
    setVoucherDeleteId(null);
    markDirty();
  };

  // ---- FAQ CRUD ----
  const [faqDialog, setFaqDialog] = useState(false);
  const [faqEditId, setFaqEditId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState<Omit<Spa2VoucherFaq, 'id'>>(EMPTY_FAQ);
  const [faqDeleteId, setFaqDeleteId] = useState<string | null>(null);

  const openCreateFaq = () => {
    setFaqForm(EMPTY_FAQ);
    setFaqEditId(null);
    setFaqDialog(true);
  };
  const openEditFaq = (item: Spa2VoucherFaq) => {
    const { id, ...rest } = item;
    setFaqForm({ ...rest });
    setFaqEditId(id);
    setFaqDialog(true);
  };
  const submitFaq = () => {
    const next: Omit<Spa2VoucherFaq, 'id'> = { ...faqForm };
    if (faqEditId) {
      setFaqs((prev) => prev.map((item) => (item.id === faqEditId ? { ...item, ...next } : item)));
    } else {
      setFaqs((prev) => [...prev, withId(next)]);
    }
    setFaqDialog(false);
    markDirty();
  };
  const confirmDeleteFaq = () => {
    setFaqs((prev) => prev.filter((item) => item.id !== faqDeleteId));
    setFaqDeleteId(null);
    markDirty();
  };
  const reorderFaqs = (next: Spa2VoucherFaq[]) => {
    setFaqs(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2VoucherCheckBanner });
    setVouchers(spa2VoucherRecords.map((item) => ({ ...item })));
    setFaqs(spa2VoucherFaqs.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('voucher_check.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.voucher_check')}
      publicPath={paths.spa2.voucherCheck}
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
          label={t('voucher_check.tab_banner')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="demo_codes"
          label={t('voucher_check.tab_demo_codes')}
          icon={<Iconify icon="solar:ticket-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="faq"
          label={t('voucher_check.tab_faq')}
          icon={<Iconify icon="solar:question-circle-bold-duotone" width={20} />}
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
              title={t('voucher_check.tab_banner')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('voucher_check.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('voucher_check.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('voucher_check.banner_subtitle')}
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
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Demo voucher codes */}
      {tab === 'demo_codes' && (
        <SectionCard
          title={t('voucher_check.tab_demo_codes')}
          icon="solar:ticket-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateVoucher}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('voucher_check.add_voucher_btn')}
            </Button>
          }
        >
          <Alert severity="info" sx={{ borderRadius: 2, mb: 2 }}>
            {t('voucher_check.demo_codes_hint')}
          </Alert>
          {vouchers.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('voucher_check.no_vouchers')}
            </Typography>
          )}
          {vouchers.length > 0 && (
            <TableContainer
              component={Box}
              sx={{ border: `1px solid ${SPA2_CREAM_DARK}`, borderRadius: 2 }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t('voucher_check.form_code')}</TableCell>
                    <TableCell>{t('voucher_check.form_type')}</TableCell>
                    <TableCell align="right">{t('voucher_check.form_balance')}</TableCell>
                    <TableCell>{t('voucher_check.form_expiry')}</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vouchers.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell sx={{ fontWeight: 700, color: SPA2_INK }}>{item.code}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{item.type}</TableCell>
                      <TableCell align="right" sx={{ color: SPA2_TEAL_DARK, fontWeight: 600 }}>
                        {formatVND(item.balance)}
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{item.expiry}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => openEditVoucher(item)}>
                          <Iconify icon="solar:pen-bold" width={16} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setVoucherDeleteId(item.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </SectionCard>
      )}

      {/* FAQ */}
      {tab === 'faq' && (
        <SectionCard
          title={t('voucher_check.tab_faq')}
          icon="solar:question-circle-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateFaq}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('voucher_check.add_faq_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('voucher_check.drag_hint')}
          </Typography>
          {faqs.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('voucher_check.no_faqs')}
            </Typography>
          )}
          <Spa2SortableGrid items={faqs} onReorder={reorderFaqs}>
            <Stack spacing={1.5}>
              {faqs.map((item) => (
                <Spa2SortableItem key={item.id} id={item.id}>
                  {(sortable) => (
                    <Card
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${SPA2_CREAM_DARK}`,
                        boxShadow: 'none',
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <Spa2DragHandle sortable={sortable} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
                            {item.q || '(Chưa đặt câu hỏi)'}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6, mt: 0.5 }}
                          >
                            {item.a}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={0.5}>
                          <IconButton size="small" onClick={() => openEditFaq(item)}>
                            <Iconify icon="solar:pen-bold" width={16} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setFaqDeleteId(item.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Card>
                  )}
                </Spa2SortableItem>
              ))}
            </Stack>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2VoucherCheckPageView banner={banner} vouchers={vouchers} faqs={faqs} />
        </Box>
      )}

      {/* Voucher add/edit dialog */}
      <Dialog open={voucherDialog} onClose={() => setVoucherDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {voucherEditId ? t('common.edit') : t('voucher_check.add_voucher_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('voucher_check.form_code')}
              value={voucherForm.code}
              onChange={(e) =>
                setVoucherForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))
              }
              fullWidth
              helperText="Ví dụ: NSP-A7K92"
            />
            <TextField
              label={t('voucher_check.form_type')}
              value={voucherForm.type}
              onChange={(e) => setVoucherForm((p) => ({ ...p, type: e.target.value }))}
              fullWidth
              helperText="Ví dụ: Thẻ quà tặng / Mã giảm giá 30%"
            />
            <TextField
              label={t('voucher_check.form_balance')}
              type="number"
              value={voucherForm.balance}
              onChange={(e) => setVoucherForm((p) => ({ ...p, balance: Number(e.target.value) }))}
              fullWidth
            />
            <TextField
              label={t('voucher_check.form_expiry')}
              value={voucherForm.expiry}
              onChange={(e) => setVoucherForm((p) => ({ ...p, expiry: e.target.value }))}
              fullWidth
              helperText="dd/mm/yyyy"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVoucherDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitVoucher}
            disabled={!voucherForm.code}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {voucherEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!voucherDeleteId}
        onClose={() => setVoucherDeleteId(null)}
        title={t('voucher_check.voucher_delete_title')}
        content={t('voucher_check.voucher_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteVoucher}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* FAQ add/edit dialog */}
      <Dialog open={faqDialog} onClose={() => setFaqDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {faqEditId ? t('common.edit') : t('voucher_check.add_faq_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('voucher_check.form_faq_question')}
              value={faqForm.q}
              onChange={(e) => setFaqForm((p) => ({ ...p, q: e.target.value }))}
              fullWidth
            />
            <TextField
              label={t('voucher_check.form_faq_answer')}
              value={faqForm.a}
              onChange={(e) => setFaqForm((p) => ({ ...p, a: e.target.value }))}
              fullWidth
              multiline
              minRows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFaqDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitFaq}
            disabled={!faqForm.q}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {faqEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!faqDeleteId}
        onClose={() => setFaqDeleteId(null)}
        title={t('voucher_check.faq_delete_title')}
        content={t('voucher_check.faq_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteFaq}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
