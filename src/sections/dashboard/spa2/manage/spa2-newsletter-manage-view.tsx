import type { Spa2AdjustableImage ,
  Spa2NewsletterConfig,
  Spa2NewsletterBanner,
  Spa2NewsletterBenefit} from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2NewsletterConfig,
  spa2NewsletterBanner,
  spa2NewsletterBenefits
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2NewsletterPageView } from 'src/sections/spa2/view/spa2-content-pages4';
import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

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
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'benefits' | 'config' | 'preview'>('banner');

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
    setDirty(false);
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
              <Card sx={{ p: 2.5, borderRadius: 3, textAlign: 'center', height: '100%' }}>
                <Iconify icon={item.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1 }} />
                <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{item.title}</Typography>
                <Typography sx={{ fontSize: 12.5, color: 'text.secondary', mb: 1.5 }}>
                  {item.desc}
                </Typography>
                <Stack direction="row" justifyContent="center" spacing={0.5}>
                  <Tooltip title={t('common.edit')}>
                    <IconButton size="small" onClick={() => openEdit(item)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('common.delete')}>
                    <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Config */}
      {tab === 'config' && (
        <Card sx={{ p: 3, borderRadius: 3, maxWidth: 520 }}>
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
          <Stack spacing={2} sx={{ pt: 1 }}>
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
