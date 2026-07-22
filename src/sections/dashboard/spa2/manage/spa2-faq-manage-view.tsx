import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { spa2FaqBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SoftCard, Spa2FaqPageView } from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  spa2Faqs,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_PAGE_IMAGES,
  spa2FaqCategories,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/faq page (Spa2FaqPageView) renders:
// banner + the category chips + accordion list. spa2Faqs is also reused by
// the service-details fallback and the before/after page's FAQ teaser, so
// `published` here controls visibility everywhere, not just this one page.
// ─────────────────────────────────────────────────────────────────────────────

type Faq = (typeof spa2Faqs)[number];

const EMPTY_FORM = {
  cat: spa2FaqCategories[1]?.value ?? '',
  icon: '',
  q: '',
  a: '',
  tag: '',
  likes: 0,
  dislikes: 0,
};

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

function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: SPA2_CREAM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={20} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: SPA2_INK, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Card>
  );
}

export function Spa2FaqManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({ ...spa2FaqBanner }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'stats' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerStat = (index: number, key: 'n' | 'l', value: string) => {
    setBanner((prev) => ({
      ...prev,
      stats: prev.stats.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    }));
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
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter((f) => {
    const matchSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || f.cat === categoryFilter;
    return matchSearch && matchCategory;
  });
  const stats = useMemo(() => {
    const published = items.filter((f) => f.published).length;
    const totalLikes = items.reduce((sum, f) => sum + f.likes, 0);
    const totalDislikes = items.reduce((sum, f) => sum + f.dislikes, 0);
    const byCategory = spa2FaqCategories
      .filter((c) => c.value !== 'all')
      .map((c) => {
        const inCat = items.filter((f) => f.cat === c.value);
        return {
          ...c,
          count: inCat.length,
          likes: inCat.reduce((sum, f) => sum + f.likes, 0),
          dislikes: inCat.reduce((sum, f) => sum + f.dislikes, 0),
        };
      });
    return {
      total: items.length,
      published,
      hidden: items.length - published,
      totalLikes,
      totalDislikes,
      byCategory,
    };
  }, [items]);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleNumberChange =
    (field: 'likes' | 'dislikes') => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [field]: Math.max(0, parseInt(e.target.value, 10) || 0) }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Faq) => {
    setForm({
      cat: item.cat,
      icon: item.icon,
      q: item.q,
      a: item.a,
      tag: item.tag,
      likes: item.likes,
      dislikes: item.dislikes,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = (Math.max(0, ...items.map((x) => parseInt(x.id, 10))) + 1).toString();
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

  const handleMoveUp = useCallback((id: string) => {
    setItems((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx <= 0) return p;
      const next = [...p];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
    setDirty(true);
  }, []);

  const handleMoveDown = useCallback((id: string) => {
    setItems((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx >= p.length - 1) return p;
      const next = [...p];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
    setDirty(true);
  }, []);

  const handleToggle = useCallback((id: string) => {
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
          value="stats"
          label={t('faq.stats_section')}
          icon={<Iconify icon="solar:chart-2-bold-duotone" width={20} />}
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
            <Stack spacing={2.5}>
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
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  {t('faq.banner_stats')}
                </Typography>
                <Stack spacing={2}>
                  {banner.stats.map((s, i) => (
                    <Stack key={i} direction="row" spacing={1.5}>
                      <TextField
                        label={t('faq.banner_stat_number')}
                        value={s.n}
                        onChange={(e) => updateBannerStat(i, 'n', e.target.value)}
                        size="small"
                        sx={{ width: '40%' }}
                      />
                      <TextField
                        label={t('faq.banner_stat_label')}
                        value={s.l}
                        onChange={(e) => updateBannerStat(i, 'l', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <Box
                sx={{
                  position: 'relative',
                  bgcolor: SPA2_CREAM,
                  pt: 6,
                  pb: 6,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -60,
                    right: -60,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    bgcolor: SPA2_TEAL_LIGHT,
                    opacity: 0.1,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -40,
                    left: -30,
                    width: 130,
                    height: 130,
                    borderRadius: '50%',
                    bgcolor: SPA2_TEAL,
                    opacity: 0.07,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${SPA2_PAGE_IMAGES.faq})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.06,
                  }}
                />

                <Container sx={{ position: 'relative' }}>
                  <Stack spacing={1.5} alignItems="center" sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                      {banner.eyebrow}
                    </Typography>
                    <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600, mt: 1 }}>
                      {banner.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mt: 1, maxWidth: 420, mx: 'auto' }}>
                      {banner.subtitle}
                    </Typography>

                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: 400,
                        bgcolor: 'common.white',
                        borderRadius: 99,
                        border: `1.5px solid ${SPA2_CREAM_DARK}`,
                        px: 2,
                        py: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        boxShadow: '0 8px 24px rgba(46,139,122,0.12)',
                      }}
                    >
                      <Iconify
                        icon="solar:magnifer-linear"
                        width={16}
                        sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: 13, color: 'text.disabled' }}>
                        Nhập từ khóa tìm kiếm...
                      </Typography>
                    </Box>
                  </Stack>

                  <Grid container spacing={1.5} justifyContent="center">
                    {banner.stats.map((s) => (
                      <Grid key={s.l} xs={4}>
                        <Spa2SoftCard sx={{ textAlign: 'center', py: 1.5, px: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: SPA2_TEAL, fontWeight: 700 }}
                          >
                            {s.n}
                          </Typography>
                          <Typography sx={{ fontSize: 10, color: 'text.secondary', mt: 0.5 }}>
                            {s.l}
                          </Typography>
                        </Spa2SoftCard>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
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
                          onClick={() => handleMoveUp(item.id)}
                          disabled={index === 0}
                        >
                          <Iconify icon="eva:arrow-up-fill" width={14} />
                        </IconButton>
                        <Typography variant="caption" color="text.secondary">
                          {index + 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleMoveDown(item.id)}
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
                          <IconButton size="small" onClick={() => handleToggle(item.id)}>
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
                            onClick={() => setDeleteId(item.id)}
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

      {/* Thống kê — breakdown dạng Spa2ListAnalytic, giống tab "combo packages" của Offers */}
      {tab === 'stats' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={12} md={8}>
              <Card sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2, height: '100%' }}>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
                >
                  {t('faq.stat_by_category')}
                </Typography>
                <Scrollbar sx={{ maxHeight: 120 }}>
                  <Stack
                    direction="row"
                    divider={
                      <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                    }
                    spacing={2}
                    sx={{ py: 1 }}
                  >
                    <Spa2ListAnalytic
                      icon="solar:question-circle-bold-duotone"
                      title={t('common.all')}
                      total={stats.total}
                      percent={100}
                      active={categoryFilter === 'all'}
                      onClick={() => setCategoryFilter('all')}
                    />
                    {stats.byCategory.map((c) => (
                      <Spa2ListAnalytic
                        key={c.value}
                        icon={c.icon}
                        title={c.label}
                        total={c.count}
                        percent={stats.total ? (c.count / stats.total) * 100 : 0}
                        active={categoryFilter === c.value}
                        onClick={() => setCategoryFilter(c.value)}
                        secondaryLine={
                          <Stack direction="row" spacing={1}>
                            <Box component="span" sx={{ fontSize: 12, color: 'success.main' }}>
                              👍 {c.likes}
                            </Box>
                            <Box component="span" sx={{ fontSize: 12, color: 'error.main' }}>
                              👎 {c.dislikes}
                            </Box>
                          </Stack>
                        }
                      />
                    ))}
                  </Stack>
                </Scrollbar>
              </Card>
            </Grid>
            <Grid xs={6} md={2}>
              <StatCard
                icon="solar:eye-bold"
                label={t('faq.stat_visibility')}
                value={`${stats.published}/${stats.hidden}`}
              />
            </Grid>
            <Grid xs={6} md={2}>
              <StatCard
                icon="solar:like-bold"
                label={t('faq.stat_likes')}
                value={`${stats.totalLikes} / ${stats.totalDislikes}`}
              />
            </Grid>
          </Grid>
        </Stack>
      )}

      {/* Live preview — renders the exact same Spa2FaqPageView component as the public route,
          fed by the in-progress banner/items state, so the two are always in perfect parity. */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2FaqPageView banner={banner} faqs={items} />
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
                <Stack direction="row" spacing={2}>
                  <TextField
                    type="number"
                    label={t('faq.form_likes')}
                    value={form.likes}
                    onChange={handleNumberChange('likes')}
                    fullWidth
                  />
                  <TextField
                    type="number"
                    label={t('faq.form_dislikes')}
                    value={form.dislikes}
                    onChange={handleNumberChange('dislikes')}
                    fullWidth
                  />
                </Stack>
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
