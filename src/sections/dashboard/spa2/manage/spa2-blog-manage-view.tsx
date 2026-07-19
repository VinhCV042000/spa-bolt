import type { ReactNode } from 'react';
import type { Spa2BlogPost, Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { bgBlur, maxLine, varAlpha } from 'src/theme/styles';
import {
  SPA2_POSTS,
  spa2BlogBanner,
  spa2UpsertPost,
  spa2DeletePost,
  SPA2_BLOG_CATEGORY_NAMES,
  computeSpa2BlogCategories,
} from 'src/_mock/_spa2';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
import { Spa2PageHero, Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages the same post list — and the page banner — that
// src/sections/spa2/view/spa2-content-pages.tsx (Spa2BlogPageView) renders on
// the public /spa2/blog page. Every create/edit/approve/delete action also
// writes straight into the shared `SPA2_POSTS` array (via
// spa2UpsertPost/spa2DeletePost from src/_mock/_spa2), so the public pages and
// the full post editor (Spa2BlogEditorView, at /dashboard/spa2/blog/:slug)
// always see the same data within a session.
// ─────────────────────────────────────────────────────────────────────────────

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

type FormShape = Omit<Spa2BlogPost, 'status' | 'tags'> & { tagsInput: string };

const STATUSES: Spa2BlogPost['status'][] = ['Đã đăng', 'Chờ duyệt', 'Bản nháp'];
const PER_PAGE = 6;

const STATUS_COLOR: Record<Spa2BlogPost['status'], 'success' | 'warning' | 'default'> = {
  'Đã đăng': 'success',
  'Chờ duyệt': 'warning',
  'Bản nháp': 'default',
};

const emptyForm = (): FormShape => ({
  slug: '',
  title: '',
  excerpt: '',
  cover: '',
  coverFocalX: 50,
  coverFocalY: 50,
  coverZoom: 100,
  author: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  date: new Date().toLocaleDateString('vi-VN'),
  category: SPA2_BLOG_CATEGORY_NAMES[0] ?? 'Skincare',
  readTime: '5 phút',
  tagsInput: '',
  content: '',
});

const coverImageValue = (form: FormShape): Spa2AdjustableImage => ({
  url: form.cover,
  focalX: form.coverFocalX ?? 50,
  focalY: form.coverFocalY ?? 50,
  zoom: form.coverZoom ?? 100,
});

const applyCoverImage = (form: FormShape, img: Spa2AdjustableImage): FormShape => ({
  ...form,
  cover: img.url,
  coverFocalX: img.focalX,
  coverFocalY: img.focalY,
  coverZoom: img.zoom,
});

const coverBg = (p: {
  cover: string;
  coverFocalX?: number;
  coverFocalY?: number;
  coverZoom?: number;
}) =>
  spa2ImageBackgroundStyle({
    url: p.cover,
    focalX: p.coverFocalX ?? 50,
    focalY: p.coverFocalY ?? 50,
    zoom: p.coverZoom ?? 100,
  });

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BlogManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');
  const navigate = useNavigate();

  const [banner, setBanner] = useState(() => ({
    ...spa2BlogBanner,
    image: { ...spa2BlogBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'list' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  const [items, setItems] = useState<Spa2BlogPost[]>(() => SPA2_POSTS.map((p) => ({ ...p })));
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | Spa2BlogPost['status']>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title' | 'category'>('newest');
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [form, setForm] = useState<FormShape>(emptyForm);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  const counts = useMemo(
    () => ({
      all: items.length,
      'Đã đăng': items.filter((i) => i.status === 'Đã đăng').length,
      'Chờ duyệt': items.filter((i) => i.status === 'Chờ duyệt').length,
      'Bản nháp': items.filter((i) => i.status === 'Bản nháp').length,
    }),
    [items]
  );

  const categories = useMemo(() => computeSpa2BlogCategories(items), [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((p) => {
      const matchStatus = statusTab === 'all' || p.status === statusTab;
      const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchStatus && matchCategory && matchSearch;
    });
  }, [items, search, statusTab, categoryFilter]);

  // Spa2BlogPost has no views/readCount field, so the "most views" sort slot
  // falls back to sorting by title A-Z instead.
  const sortedItems = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case 'oldest':
        arr.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
        break;
      case 'title':
        arr.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
        break;
      case 'category':
        arr.sort(
          (a, b) =>
            a.category.localeCompare(b.category, 'vi') || a.title.localeCompare(b.title, 'vi')
        );
        break;
      case 'newest':
      default:
        arr.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
        break;
    }
    return arr;
  }, [filtered, sortBy]);

  // Uniform admin list — every filtered/sorted post goes through the same
  // grid + pagination, with no special enlarged "featured" treatment (mirrors
  // how spa2-services-manage-view.tsx paginates its own service card grid).
  const pageCount = Math.max(1, Math.ceil(sortedItems.length / PER_PAGE));
  const paginatedItems = sortedItems.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // The "preview" tab still mirrors the public /spa2/blog page pixel-for-pixel,
  // which keeps its own highlight-article + remaining-grid layout — so it
  // needs the old featured/rest split, paginated independently from the list
  // tab (clamped so an out-of-range page never renders an empty preview).
  const [featured, ...rest] = sortedItems;
  const previewPageCount = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const previewPage = Math.min(page, previewPageCount);
  const paginatedRest = rest.slice((previewPage - 1) * PER_PAGE, previewPage * PER_PAGE);

  const visibleSlugs = useMemo(() => paginatedItems.map((p) => p.slug), [paginatedItems]);
  const allVisibleSelected = visibleSlugs.length > 0 && visibleSlugs.every((s) => selected.has(s));

  const toggleSelect = useCallback((slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        visibleSlugs.forEach((s) => next.delete(s));
      } else {
        visibleSlugs.forEach((s) => next.add(s));
      }
      return next;
    });
  }, [allVisibleSelected, visibleSlugs]);

  const openCreate = () => {
    setForm(emptyForm());
    setEditSlug(null);
    setOpenForm(true);
  };

  const openEdit = (p: Spa2BlogPost) => {
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      cover: p.cover,
      coverFocalX: p.coverFocalX,
      coverFocalY: p.coverFocalY,
      coverZoom: p.coverZoom,
      author: p.author,
      publishedAt: p.publishedAt,
      date: p.date,
      category: p.category,
      readTime: p.readTime,
      tagsInput: p.tags.join(', '),
      content: p.content,
    });
    setEditSlug(p.slug);
    setOpenForm(true);
  };

  const handleField =
    <K extends keyof FormShape>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }) as FormShape);

  const handleSubmit = useCallback(() => {
    const finalSlug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-').slice(0, 80);
    const tags = form.tagsInput
      .split(',')
      .map((t2) => t2.trim())
      .filter(Boolean);
    const { tagsInput: _tagsInput, ...rest2 } = form;
    const next: Spa2BlogPost = {
      ...rest2,
      slug: finalSlug,
      tags,
      status: editSlug
        ? (items.find((x) => x.slug === editSlug)?.status ?? 'Bản nháp')
        : 'Bản nháp',
    };
    spa2UpsertPost(next);
    setOpenForm(false);
    markDirty();
    if (editSlug) {
      setItems((prev) => prev.map((x) => (x.slug === editSlug ? next : x)));
    } else {
      setItems((prev) => [next, ...prev]);
      // Brand-new post: jump straight into the full editor to write real content.
      navigate(paths.dashboard.spa2.blogDetails(next.slug));
    }
  }, [form, editSlug, items, navigate]);

  const handleDelete = useCallback(() => {
    if (deleteSlug) spa2DeletePost(deleteSlug);
    setItems((prev) => prev.filter((x) => x.slug !== deleteSlug));
    setDeleteSlug(null);
    markDirty();
  }, [deleteSlug]);

  const handleApprove = useCallback((slug: string) => {
    setItems((prev) => {
      const next = prev.map((x) => (x.slug === slug ? { ...x, status: 'Đã đăng' as const } : x));
      const updated = next.find((x) => x.slug === slug);
      if (updated) spa2UpsertPost(updated);
      return next;
    });
    markDirty();
  }, []);

  const handleToDraft = useCallback((slug: string) => {
    setItems((prev) => {
      const next = prev.map((x) => (x.slug === slug ? { ...x, status: 'Bản nháp' as const } : x));
      const updated = next.find((x) => x.slug === slug);
      if (updated) spa2UpsertPost(updated);
      return next;
    });
    markDirty();
  }, []);

  const handleBulkApprove = useCallback(() => {
    setItems((prev) => {
      const next = prev.map((x) =>
        selected.has(x.slug) ? { ...x, status: 'Đã đăng' as const } : x
      );
      next.filter((x) => selected.has(x.slug)).forEach((x) => spa2UpsertPost(x));
      return next;
    });
    markDirty();
    setSelected(new Set());
  }, [selected]);

  const handleBulkToDraft = useCallback(() => {
    setItems((prev) => {
      const next = prev.map((x) =>
        selected.has(x.slug) ? { ...x, status: 'Bản nháp' as const } : x
      );
      next.filter((x) => selected.has(x.slug)).forEach((x) => spa2UpsertPost(x));
      return next;
    });
    markDirty();
    setSelected(new Set());
  }, [selected]);

  const handleBulkDelete = useCallback(() => {
    selected.forEach((slug) => spa2DeletePost(slug));
    setItems((prev) => prev.filter((x) => !selected.has(x.slug)));
    setSelected(new Set());
    setBulkDeleteOpen(false);
    markDirty();
  }, [selected]);

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2BlogBanner, image: { ...spa2BlogBanner.image } });
    setDirty(false);
  };

  // ---- render ------------------------------------------------------------

  return (
    <Spa2ManageShell
      title="Quản lý Blog"
      eyebrow="Nature Spa · Cẩm nang chăm sóc"
      description={banner.subtitle}
      breadcrumbLabel="Blog"
      publicPath={paths.spa2.blog}
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
          label={t('blog.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('blog.list_section')}
          icon={<Iconify icon="solar:notebook-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner — left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('blog.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('blog.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('blog.banner_image_help')}
                />
                <TextField
                  label={t('blog.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('blog.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('blog.banner_subtitle')}
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

      {/* Danh sách bài viết */}
      {tab === 'list' && (
        <Stack direction="column">
          {/* Header */}
          <Stack direction="column">
            <Card sx={{ p: 2, mb: 3, borderRadius: 3 }}>
              <Tabs
                value={statusTab}
                onChange={(_, v) => {
                  setStatusTab(v);
                  setPage(1);
                }}
                variant="scrollable"
                sx={{
                  minHeight: 36,
                  '& .MuiTab-root': { minHeight: 36, textTransform: 'none', fontWeight: 600 },
                  '& .Mui-selected': { color: SPA2_TEAL_DARK },
                  '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                }}
              >
                <Tab
                  value="all"
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>Tất cả</span>
                      <Chip size="small" label={counts.all} />
                    </Stack>
                  }
                />
                {STATUSES.map((s) => (
                  <Tab
                    key={s}
                    value={s}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>{s}</span>
                        <Chip
                          size="small"
                          color={STATUS_COLOR[s]}
                          variant="soft"
                          label={counts[s]}
                        />
                      </Stack>
                    }
                  />
                ))}
              </Tabs>

              <Divider sx={{ my: 2 }} />

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ sm: 'center' }}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Checkbox
                    size="small"
                    checked={allVisibleSelected}
                    indeterminate={!allVisibleSelected && visibleSlugs.some((s) => selected.has(s))}
                    onChange={toggleSelectAll}
                    disabled={visibleSlugs.length === 0}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {selected.size > 0
                      ? `Đã chọn ${selected.size} bài viết`
                      : 'Chọn tất cả (trang này)'}
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  alignItems={{ sm: 'center' }}
                >
                  <TextField
                    size="small"
                    placeholder="Tìm theo tiêu đề, tác giả, danh mục…"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    sx={{ width: { xs: '100%', sm: 320 } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    select
                    size="small"
                    label="Sắp xếp"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value as 'newest' | 'oldest' | 'title' | 'category');
                      setPage(1);
                    }}
                    sx={{ width: { xs: '100%', sm: 220 } }}
                  >
                    <MenuItem value="newest">Mới nhất</MenuItem>
                    <MenuItem value="oldest">Cũ nhất</MenuItem>
                    <MenuItem value="title">Tiêu đề (A-Z)</MenuItem>
                    <MenuItem value="category">Danh mục (A-Z)</MenuItem>
                  </TextField>
                  <Button
                    onClick={openCreate}
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    sx={{
                      px: 3,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    Thêm bài viết
                  </Button>
                </Stack>
              </Stack>
            </Card>

            {selected.size > 0 && (
              <Card
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 3,
                  bgcolor: SPA2_CREAM,
                  border: `1px solid ${SPA2_TEAL}`,
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  alignItems={{ sm: 'center' }}
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                    Đã chọn {selected.size} bài viết
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Button
                      size="small"
                      onClick={handleBulkApprove}
                      startIcon={<Iconify icon="solar:check-circle-bold" />}
                      sx={{ borderRadius: 50, color: 'success.main' }}
                    >
                      Duyệt & đăng
                    </Button>
                    <Button
                      size="small"
                      onClick={handleBulkToDraft}
                      startIcon={<Iconify icon="solar:eye-closed-bold" />}
                      sx={{ borderRadius: 50, color: 'warning.main' }}
                    >
                      Chuyển về nháp
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => setBulkDeleteOpen(true)}
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                      sx={{ borderRadius: 50 }}
                    >
                      Xoá
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setSelected(new Set())}
                      sx={{ borderRadius: 50 }}
                    >
                      Bỏ chọn
                    </Button>
                  </Stack>
                </Stack>
              </Card>
            )}
          </Stack>
          <Grid container spacing={2}>
            {/* Main column */}
            <Grid xs={12} md={8}>
              <Grid container spacing={2} columns={12}>
                {paginatedItems.map((p) => (
                  <Grid key={p.slug} xs={12} sm={6}>
                    <Card
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                        }}
                      >
                        <Checkbox
                          size="small"
                          checked={selected.has(p.slug)}
                          onChange={() => toggleSelect(p.slug)}
                          sx={{
                            position: 'absolute',
                            zIndex: 1,
                            top: 8,
                            left: 8,
                            color: 'white',
                            bgcolor: 'rgba(0,0,0,0.28)',
                            borderRadius: 1,
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.4)' },
                            '&.Mui-checked': { color: SPA2_TEAL },
                          }}
                        />
                        <Chip
                          size="small"
                          label={p.status}
                          color={STATUS_COLOR[p.status]}
                          variant="filled"
                          sx={{ position: 'absolute', zIndex: 1, top: 12, right: 12 }}
                        />
                        <Image alt={p.title} src={p.cover} ratio="4/3" />
                      </Box>
                      <Stack spacing={1.25} sx={{ p: 2.5, flexGrow: 1 }}>
                        <Chip
                          size="small"
                          label={p.category}
                          sx={{
                            alignSelf: 'flex-start',
                            bgcolor: SPA2_CREAM,
                            color: SPA2_TEAL_DARK,
                          }}
                        />
                        <Link
                          component={RouterLink}
                          href={paths.dashboard.spa2.blogDetails(p.slug)}
                          sx={{
                            color: SPA2_INK,
                            textDecoration: 'none',
                            '&:hover': { color: SPA2_TEAL },
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ ...maxLine({ line: 2 }), lineHeight: 1.4, minHeight: 44 }}
                          >
                            {p.title}
                          </Typography>
                        </Link>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ...maxLine({ line: 2 }), minHeight: 40 }}
                        >
                          {p.excerpt}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {p.author} · {p.date} · {p.readTime}
                        </Typography>
                        <Divider sx={{ mt: 'auto' }} />
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={0.5}>
                            {p.status !== 'Đã đăng' ? (
                              <Tooltip title="Duyệt & đăng">
                                <IconButton size="small" onClick={() => handleApprove(p.slug)}>
                                  <Iconify icon="solar:check-circle-bold" color="success.main" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Chuyển về nháp">
                                <IconButton size="small" onClick={() => handleToDraft(p.slug)}>
                                  <Iconify icon="solar:eye-closed-bold" color="warning.main" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Xem public">
                              <IconButton
                                size="small"
                                component={RouterLink}
                                href={paths.spa2.blogDetails(p.slug)}
                                target="_blank"
                              >
                                <Iconify icon="solar:eye-bold" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title="Sửa nhanh (thông tin)">
                              <IconButton size="small" onClick={() => openEdit(p)}>
                                <Iconify icon="solar:pen-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Soạn nội dung đầy đủ">
                              <IconButton
                                size="small"
                                component={RouterLink}
                                href={paths.dashboard.spa2.blogDetails(p.slug)}
                                sx={{ color: SPA2_TEAL }}
                              >
                                <Iconify icon="solar:pen-new-square-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xoá">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => setDeleteSlug(p.slug)}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                ))}

                {filtered.length === 0 && (
                  <Grid xs={12}>
                    <Card sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                      <Iconify
                        icon="solar:notebook-bold-duotone"
                        width={48}
                        sx={{ color: SPA2_TEAL, mb: 1 }}
                      />
                      <Typography variant="h6" sx={{ color: SPA2_INK }}>
                        Không tìm thấy bài viết
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Thử đổi từ khoá hoặc tạo bài viết mới.
                      </Typography>
                    </Card>
                  </Grid>
                )}
              </Grid>

              {pageCount > 1 && (
                <Stack alignItems="center" sx={{ mt: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(_, v) => setPage(v)}
                    shape="rounded"
                    sx={{
                      '& .Mui-selected': {
                        bgcolor: `${SPA2_TEAL} !important`,
                        color: 'white',
                      },
                    }}
                  />
                </Stack>
              )}
            </Grid>

            {/* Sidebar mirrors public blog sidebar */}
            <Grid xs={12} md={4}>
              <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
                <Card sx={{ p: 2.5, borderRadius: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 2 }}>
                    Danh mục
                  </Typography>
                  <Grid container spacing={1.5}>
                    <Grid xs={12} md={6}>
                      <Card
                        onClick={() => {
                          setCategoryFilter('all');
                          setPage(1);
                        }}
                        sx={{
                          p: 1.5,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.25,
                          bgcolor: categoryFilter === 'all' ? `${SPA2_TEAL}12` : SPA2_CREAM,
                          transition: 'all .2s',
                          '&:hover': { borderColor: SPA2_TEAL },
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 1.5,
                            flexShrink: 0,
                            bgcolor: `${SPA2_TEAL}18`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify
                            icon="solar:notebook-bold-duotone"
                            width={20}
                            sx={{ color: SPA2_TEAL_DARK }}
                          />
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}
                          >
                            {items.length}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            Tất cả
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                    {categories.map((c) => (
                      <Grid key={c.name} xs={12} md={6}>
                        <Card
                          onClick={() => {
                            setCategoryFilter(c.name);
                            setPage(1);
                          }}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.25,
                            bgcolor: categoryFilter === c.name ? `${SPA2_TEAL}12` : SPA2_CREAM,
                            transition: 'all .2s',
                            '&:hover': { borderColor: SPA2_TEAL },
                          }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 1.5,
                              flexShrink: 0,
                              bgcolor: `${SPA2_TEAL}18`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Iconify
                              icon="solar:folder-bold-duotone"
                              width={20}
                              sx={{ color: SPA2_TEAL_DARK }}
                            />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}
                            >
                              {c.count}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {c.name}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Card>

                <Card sx={{ p: 2.5, borderRadius: 3 }}>
                  <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 2 }}>
                    Chờ duyệt gần đây
                  </Typography>
                  <Stack spacing={1.5}>
                    {items
                      .filter((p) => p.status === 'Chờ duyệt')
                      .slice(0, 4)
                      .map((p) => (
                        <Stack
                          key={p.slug}
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                          component={RouterLink}
                          href={paths.dashboard.spa2.blogDetails(p.slug)}
                          sx={{ textDecoration: 'none', '&:hover': { color: SPA2_TEAL } }}
                        >
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: 1.5,
                              flexShrink: 0,
                              backgroundImage: `url(${p.cover})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                          <Stack sx={{ minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              sx={{ color: SPA2_INK, fontWeight: 600 }}
                              noWrap
                            >
                              {p.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {p.author} · {p.date}
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                    {items.filter((p) => p.status === 'Chờ duyệt').length === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        Không có bài chờ duyệt.
                      </Typography>
                    )}
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      )}

      {/* Full-page live preview — pixel-for-pixel same layout/order as the public /spa2/blog page */}
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

            {featured && (
              <Box sx={{ py: { xs: 6, md: 8 } }}>
                <Container>
                  <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Grid container>
                      <Grid xs={12} md={6}>
                        <Box
                          sx={{
                            minHeight: 280,
                            height: '100%',
                            backgroundImage: `url(${featured.cover})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <Box sx={{ p: { xs: 3, md: 5 } }}>
                          <Chip
                            label="Bài viết nổi bật"
                            sx={{ bgcolor: SPA2_TEAL, color: 'white', mb: 2 }}
                          />
                          <Typography variant="h4" sx={{ color: SPA2_INK, mb: 1.5 }}>
                            {featured.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                            {featured.excerpt}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                            <Avatar
                              sx={{ width: 28, height: 28, bgcolor: SPA2_TEAL, fontSize: 13 }}
                            >
                              {featured.author[0]}
                            </Avatar>
                            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                              {featured.author} · {featured.date} · {featured.readTime}
                            </Typography>
                          </Stack>
                          <Button
                            disabled
                            endIcon={<Iconify icon="solar:arrow-right-linear" />}
                            sx={{
                              borderRadius: 999,
                              px: 3,
                              bgcolor: SPA2_TEAL,
                              color: 'white',
                              '&.Mui-disabled': {
                                bgcolor: SPA2_TEAL,
                                color: 'white',
                                opacity: 0.85,
                              },
                            }}
                          >
                            Đọc bài viết
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Spa2SoftCard>
                </Container>
              </Box>
            )}

            <Box sx={{ pb: { xs: 8, md: 12 } }}>
              <Container>
                <Grid container spacing={5}>
                  <Grid xs={12} md={8}>
                    <Grid container spacing={4}>
                      {paginatedRest.map((p) => (
                        <Grid key={p.slug} xs={12} sm={6}>
                          <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                            <Box
                              sx={{
                                height: 180,
                                backgroundImage: `url(${p.cover})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            />
                            <Box sx={{ p: 2.5 }}>
                              <Chip
                                size="small"
                                label={p.category}
                                sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                              />
                              <Typography
                                variant="h6"
                                sx={{ color: SPA2_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
                              >
                                {p.title}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 1.5 }}>
                                {p.excerpt}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                                  {p.date}
                                </Typography>
                                <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                                  ·
                                </Typography>
                                <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                                  {p.readTime}
                                </Typography>
                              </Stack>
                            </Box>
                          </Spa2SoftCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>

                  <Grid xs={12} md={4}>
                    <Stack spacing={3}>
                      <Spa2SoftCard>
                        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                          Danh mục
                        </Typography>
                        <Stack spacing={1.5}>
                          {categories.map((c) => (
                            <Stack
                              key={c.name}
                              direction="row"
                              justifyContent="space-between"
                              sx={{ py: 1, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}
                            >
                              <Typography sx={{ color: SPA2_INK }}>{c.name}</Typography>
                              <Chip
                                size="small"
                                label={c.count}
                                sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                              />
                            </Stack>
                          ))}
                        </Stack>
                      </Spa2SoftCard>
                    </Stack>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      )}

      {/* Quick create/edit dialog — left: edit, right: live preview; nội dung đầy đủ soạn ở trang riêng */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editSlug ? 'Chỉnh sửa thông tin bài viết' : 'Tạo bài viết mới'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                {!editSlug && (
                  <Typography variant="body2" color="text.secondary">
                    Điền thông tin cơ bản trước — sau khi tạo, bạn sẽ được chuyển sang trang soạn
                    thảo để viết nội dung đầy đủ.
                  </Typography>
                )}
                <TextField
                  label="Tiêu đề"
                  size="small"
                  value={form.title}
                  onChange={handleField('title')}
                  fullWidth
                />
                <TextField
                  label="Tóm tắt"
                  size="small"
                  multiline
                  rows={2}
                  value={form.excerpt}
                  onChange={handleField('excerpt')}
                  fullWidth
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Tác giả"
                    size="small"
                    fullWidth
                    value={form.author}
                    onChange={handleField('author')}
                  />
                  <TextField
                    select
                    label="Danh mục"
                    size="small"
                    fullWidth
                    value={form.category}
                    onChange={handleField('category')}
                  >
                    {SPA2_BLOG_CATEGORY_NAMES.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label="Ngày hiển thị"
                    size="small"
                    fullWidth
                    value={form.date}
                    onChange={handleField('date')}
                  />
                  <TextField
                    label="Thời lượng đọc"
                    size="small"
                    fullWidth
                    value={form.readTime}
                    onChange={handleField('readTime')}
                  />
                </Stack>
                <Spa2ImageField
                  label="Ảnh cover"
                  value={coverImageValue(form)}
                  onChange={(img) => setForm((p) => applyCoverImage(p, img))}
                  height={160}
                  helperText="Kéo thả ảnh, dán URL, hoặc tải ảnh từ máy — kéo trên ảnh để chọn điểm lấy nét."
                />
                <TextField
                  label="Tags"
                  size="small"
                  value={form.tagsInput}
                  onChange={handleField('tagsInput')}
                  fullWidth
                  helperText="Cách nhau bởi dấu phẩy, ví dụ: skincare, mùa lạnh"
                />
                <TextField
                  label="Slug (để trống sẽ tự tạo)"
                  size="small"
                  value={form.slug}
                  onChange={handleField('slug')}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                Xem trước
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 160,
                      bgcolor: SPA2_CREAM_DARK,
                      ...coverBg(form),
                    }}
                  />
                  <Box sx={{ p: 2.5 }}>
                    <Chip
                      size="small"
                      label={form.category || 'Danh mục'}
                      sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: SPA2_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
                    >
                      {form.title || 'Tiêu đề bài viết'}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 1.5 }}>
                      {form.excerpt || 'Tóm tắt bài viết…'}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                        {form.date}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>·</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                        {form.readTime}
                      </Typography>
                    </Stack>
                  </Box>
                </Spa2SoftCard>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editSlug ? 'Lưu thay đổi' : 'Tạo & soạn nội dung'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteSlug}
        onClose={() => setDeleteSlug(null)}
        title="Xoá bài viết?"
        content="Bài viết sẽ không còn hiển thị trên trang public. (mock)"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xoá
          </Button>
        }
      />

      <ConfirmDialog
        open={bulkDeleteOpen}
        onClose={() => setBulkDeleteOpen(false)}
        title={`Xoá ${selected.size} bài viết đã chọn?`}
        content="Các bài viết này sẽ không còn hiển thị trên trang public. (mock)"
        action={
          <Button variant="contained" color="error" onClick={handleBulkDelete}>
            Xoá
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
