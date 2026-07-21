import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { spa2FaqBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  SPA2_INK,
  SPA2_TEAL,
  spa2Faqs,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  spa2FaqCategories,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/faq page (Spa2FaqPageView) renders:
// banner + the category chips + accordion list. spa2Faqs is also reused by
// the service-details fallback and the before/after page's FAQ teaser, so
// `published` here controls visibility everywhere, not just this one page.
// ─────────────────────────────────────────────────────────────────────────────

type Faq = (typeof spa2Faqs)[number];

const EMPTY_FORM = { cat: spa2FaqCategories[1]?.value ?? '', icon: '', q: '', a: '', tag: '' };

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

function FaqPreviewCard({ form }: { form: { icon: string; q: string; a: string; tag: string } }) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      defaultExpanded
      sx={{
        borderRadius: '14px !important',
        border: `1px solid ${SPA2_CREAM}`,
        boxShadow: 'none',
        overflow: 'hidden',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<Iconify icon="solar:alt-arrow-down-bold" sx={{ color: 'text.secondary' }} />}
        sx={{ px: 2, py: 0.5, bgcolor: SPA2_CREAM }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              bgcolor: SPA2_TEAL,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Iconify
              icon={form.icon || 'solar:question-circle-bold'}
              width={17}
              sx={{ color: 'white' }}
            />
          </Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
            {form.q || '(Chưa đặt câu hỏi)'}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2.5, pb: 2.5, bgcolor: 'common.white' }}>
        <Box sx={{ pl: '46px' }}>
          <Box sx={{ borderLeft: `3px solid ${SPA2_TEAL_LIGHT}`, pl: 2 }}>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: 14 }}>
              {form.a}
            </Typography>
            {form.tag && (
              <Chip
                size="small"
                label={form.tag}
                icon={<Iconify icon="solar:tag-bold" width={12} />}
                sx={{ mt: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
              />
            )}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export function Spa2FaqManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({ ...spa2FaqBanner }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'preview'>('banner');
  const [previewCat, setPreviewCat] = useState('all');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2FaqBanner });
    setDirty(false);
  };

  const [items, setItems] = useState<Faq[]>(spa2Faqs);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );
  const previewItems = items.filter(
    (f) => f.published && (previewCat === 'all' || f.cat === previewCat)
  );

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Faq) => {
    setForm({ cat: item.cat, icon: item.icon, q: item.q, a: item.a, tag: item.tag });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...form, id: newId, published: true }]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  const handleMoveUp = useCallback((id: number) => {
    setItems((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx <= 0) return p;
      const next = [...p];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
    setDirty(true);
  }, []);

  const handleMoveDown = useCallback((id: number) => {
    setItems((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx >= p.length - 1) return p;
      const next = [...p];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
    setDirty(true);
  }, []);

  const handleToggle = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, published: !x.published } : x)));
    setDirty(true);
  }, []);

  const catLabel = (value: string) =>
    spa2FaqCategories.find((c) => c.value === value)?.label ?? value;

  return (
    <Spa2ManageShell
      title={t('faq.page_title')}
      description="Banner và danh sách câu hỏi thường gặp hiển thị trên trang FAQ công khai."
      breadcrumbLabel={t('nav.faq')}
      publicPath={paths.spa2.faq}
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
          label={t('faq.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('faq.list_section')}
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

      {/* Banner - left: edit, right: live preview */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <TextField
                  label={t('faq.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('faq.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('faq.banner_subtitle')}
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
              <Box
                sx={{
                  bgcolor: SPA2_CREAM,
                  py: 6,
                  textAlign: 'center',
                  px: 3,
                }}
              >
                <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                  {banner.eyebrow}
                </Typography>
                <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600, mt: 1 }}>
                  {banner.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mt: 1, maxWidth: 420, mx: 'auto' }}>
                  {banner.subtitle}
                </Typography>
              </Box>
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Danh sách câu hỏi */}
      {tab === 'list' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <TextField
              placeholder={t('faq.search_placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ width: 280 }}
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
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('faq.add_btn')}
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={40}>{t('faq.col_order')}</TableCell>
                  <TableCell>{t('faq.col_question')}</TableCell>
                  <TableCell sx={{ maxWidth: 280 }}>{t('faq.col_answer')}</TableCell>
                  <TableCell>{t('faq.col_category')}</TableCell>
                  <TableCell>{t('faq.col_visible')}</TableCell>
                  <TableCell align="right">{t('common.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((item, index) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack alignItems="center" spacing={0.5}>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveUp(Number(item.id))}
                          disabled={index === 0}
                        >
                          <Iconify icon="eva:arrow-up-fill" width={14} />
                        </IconButton>
                        <Typography variant="caption" color="text.secondary">
                          {index + 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveDown(Number(item.id))}
                          disabled={index === filtered.length - 1}
                        >
                          <Iconify icon="eva:arrow-down-fill" width={14} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 260 }}>
                      <Typography variant="subtitle2" noWrap>
                        {item.q}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 280 }}>
                      <Typography variant="body2" noWrap color="text.secondary">
                        {item.a}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip size="small" label={catLabel(item.cat)} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={item.published ? t('faq.status_visible') : t('faq.status_hidden')}
                        color={item.published ? 'success' : 'default'}
                        variant="soft"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                        <Tooltip title={item.published ? t('common.hidden') : t('common.visible')}>
                          <IconButton size="small" onClick={() => handleToggle(typeof item.id === 'string' ? parseInt(item.id, 10) : item.id)}>
                            <Iconify
                              icon={item.published ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
                              color={item.published ? 'warning.main' : 'success.main'}
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
                            onClick={() => setDeleteId(typeof item.id === 'string' ? parseInt(item.id, 10) : item.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Live preview — mirrors Spa2FaqPageView's bespoke hero + category chips + accordion list */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: SPA2_CREAM, py: { xs: 6, md: 8 }, textAlign: 'center', px: 3 }}>
            <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
              {banner.eyebrow}
            </Typography>
            <Typography variant="h3" sx={{ color: SPA2_INK, fontWeight: 600, mt: 1 }}>
              {banner.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 1, maxWidth: 480, mx: 'auto' }}>
              {banner.subtitle}
            </Typography>
          </Box>
          <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container maxWidth="md">
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3, gap: 1 }}>
                {spa2FaqCategories.map((c) => (
                  <Chip
                    key={c.value}
                    label={c.label}
                    icon={<Iconify icon={c.icon} width={15} />}
                    onClick={() => setPreviewCat(c.value)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: previewCat === c.value ? SPA2_TEAL : 'transparent',
                      color: previewCat === c.value ? 'white' : 'text.secondary',
                      border: `1.5px solid ${previewCat === c.value ? SPA2_TEAL : SPA2_CREAM}`,
                    }}
                  />
                ))}
              </Stack>
              {previewItems.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Không có câu hỏi nào đang hiển thị trong danh mục này.
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {previewItems.map((f) => (
                    <FaqPreviewCard
                      key={f.id}
                      form={{
                        icon: typeof f.icon === 'string' ? f.icon : '',
                        q: f.q,
                        a: f.a,
                        tag: typeof f.tag === 'string' ? f.tag : '',
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Container>
          </Box>
        </Box>
      )}

      {/* Create / Edit dialog - left: form, right: live preview */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editId !== null ? t('faq.form_edit') : t('faq.form_create')}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    label={t('faq.form_category')}
                    value={form.cat}
                    onChange={(e) => setForm((p) => ({ ...p, cat: e.target.value }))}
                    fullWidth
                  >
                    {spa2FaqCategories
                      .filter((c) => c.value !== 'all')
                      .map((c) => (
                        <MenuItem key={c.value} value={c.value}>
                          {c.label}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    label={t('faq.form_icon')}
                    value={form.icon}
                    onChange={handleChange('icon')}
                    fullWidth
                    placeholder="solar:calendar-bold"
                  />
                </Stack>
                <TextField
                  label={t('faq.form_question')}
                  value={form.q}
                  onChange={handleChange('q')}
                  fullWidth
                  multiline
                  rows={2}
                />
                <TextField
                  label={t('faq.form_answer')}
                  value={form.a}
                  onChange={handleChange('a')}
                  fullWidth
                  multiline
                  rows={4}
                />
                <TextField
                  label={t('faq.form_tag')}
                  value={form.tag}
                  onChange={handleChange('tag')}
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
                <FaqPreviewCard form={form} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.q || !form.a}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('faq.form_edit') : t('faq.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('faq.delete_title')}
        content={t('faq.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
