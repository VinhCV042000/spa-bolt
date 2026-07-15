import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { SPA2_POSTS, type Spa2BlogPost, SPA2_BLOG_CATEGORIES } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────

type FormShape = Omit<Spa2BlogPost, 'status'>;

const STATUSES: Spa2BlogPost['status'][] = ['Đã đăng', 'Chờ duyệt', 'Bản nháp'];

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
  author: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  date: new Date().toLocaleDateString('vi-VN'),
  category: SPA2_BLOG_CATEGORIES[0]?.name ?? 'Skincare',
  readTime: '5 phút',
  tags: [],
  content: '',
});

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BlogManageView() {
  const [items, setItems] = useState<Spa2BlogPost[]>(() => SPA2_POSTS.map((p) => ({ ...p })));
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<'all' | Spa2BlogPost['status']>('all');
  const [openForm, setOpenForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [form, setForm] = useState<FormShape>(emptyForm);

  const counts = useMemo(
    () => ({
      all: items.length,
      'Đã đăng': items.filter((i) => i.status === 'Đã đăng').length,
      'Chờ duyệt': items.filter((i) => i.status === 'Chờ duyệt').length,
      'Bản nháp': items.filter((i) => i.status === 'Bản nháp').length,
    }),
    [items]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((p) => {
      const matchStatus = statusTab === 'all' || p.status === statusTab;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [items, search, statusTab]);

  const [featured, ...rest] = filtered;

  const openCreate = () => {
    setForm(emptyForm());
    setEditSlug(null);
    setOpenForm(true);
  };

  const openEdit = (p: Spa2BlogPost) => {
    const { status: _s, ...formData } = p;
    setForm({ ...formData });
    setEditSlug(p.slug);
    setOpenForm(true);
  };

  const handleField =
    <K extends keyof FormShape>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }) as FormShape);

  const handleSubmit = useCallback(() => {
    const finalSlug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-').slice(0, 80);
    const next: Spa2BlogPost = {
      ...form,
      slug: finalSlug,
      status: editSlug
        ? (items.find((x) => x.slug === editSlug)?.status ?? 'Bản nháp')
        : 'Bản nháp',
    };
    if (editSlug) {
      setItems((prev) => prev.map((x) => (x.slug === editSlug ? next : x)));
    } else {
      setItems((prev) => [next, ...prev]);
    }
    setOpenForm(false);
  }, [form, editSlug, items]);

  const handleDelete = useCallback(() => {
    setItems((prev) => prev.filter((x) => x.slug !== deleteSlug));
    setDeleteSlug(null);
  }, [deleteSlug]);

  const handleApprove = useCallback((slug: string) => {
    setItems((prev) => prev.map((x) => (x.slug === slug ? { ...x, status: 'Đã đăng' } : x)));
  }, []);

  const handleToDraft = useCallback((slug: string) => {
    setItems((prev) => prev.map((x) => (x.slug === slug ? { ...x, status: 'Bản nháp' } : x)));
  }, []);

  // ---- render ------------------------------------------------------------

  return (
    <Spa2ManageShell
      title="Quản lý Blog"
      eyebrow="Nature Spa · Cẩm nang chăm sóc"
      description="Quản lý toàn bộ bài viết trên trang Blog công khai — tạo mới, chỉnh sửa, duyệt và ẩn/hiện."
      breadcrumbLabel="Blog"
      publicPath={paths.spa2.blog}
      actions={
        <Button
          onClick={openCreate}
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            borderRadius: 50,
            px: 3,
            bgcolor: 'common.white',
            color: SPA2_TEAL,
            fontWeight: 600,
            '&:hover': { bgcolor: SPA2_CREAM },
          }}
        >
          Thêm bài viết
        </Button>
      }
    >
      <Grid container spacing={3}>
        {/* Main column */}
        <Grid xs={12} md={8}>
          <Card sx={{ p: 2, mb: 3, borderRadius: 3 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ sm: 'center' }}
              justifyContent="space-between"
            >
              <TextField
                size="small"
                placeholder="Tìm theo tiêu đề, tác giả, danh mục…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: { xs: '100%', sm: 320 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Tabs
                value={statusTab}
                onChange={(_, v) => setStatusTab(v)}
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
            </Stack>
          </Card>

          {/* Featured card mirrors public /spa2/blog hero layout */}
          {featured && (
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${SPA2_CREAM_DARK}`,
              }}
            >
              <Grid container>
                <Grid xs={12} sm={5}>
                  <Box
                    sx={{
                      minHeight: { xs: 200, sm: '100%' },
                      backgroundImage: `url(${featured.cover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={7}>
                  <Stack spacing={1.5} sx={{ p: { xs: 2.5, md: 3.5 } }}>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Nổi bật" sx={{ bgcolor: SPA2_TEAL, color: 'white' }} />
                      <Chip
                        label={featured.category}
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                      />
                      <Chip
                        size="small"
                        label={featured.status}
                        color={STATUS_COLOR[featured.status]}
                        variant="soft"
                      />
                    </Stack>
                    <Typography variant="h5" sx={{ color: SPA2_INK }}>
                      {featured.title}
                    </Typography>
                    <Typography color="text.secondary">{featured.excerpt}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 24, height: 24, bgcolor: SPA2_TEAL, fontSize: 12 }}>
                        {featured.author[0]}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {featured.author} · {featured.date} · {featured.readTime}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                      <Button
                        component={RouterLink}
                        href={paths.dashboard.spa2.blogDetails(featured.slug)}
                        startIcon={<Iconify icon="solar:pen-bold" />}
                        sx={{
                          borderRadius: 50,
                          px: 2.5,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        component={RouterLink}
                        href={paths.spa2.blogDetails(featured.slug)}
                        target="_blank"
                        variant="outlined"
                        startIcon={<Iconify icon="solar:eye-bold" />}
                        sx={{ borderRadius: 50, borderColor: SPA2_TEAL, color: SPA2_TEAL_DARK }}
                      >
                        Xem public
                      </Button>
                      {featured.status !== 'Đã đăng' ? (
                        <Button
                          onClick={() => handleApprove(featured.slug)}
                          startIcon={<Iconify icon="solar:check-circle-bold" />}
                          sx={{ borderRadius: 50, color: 'success.main' }}
                        >
                          Duyệt
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleToDraft(featured.slug)}
                          startIcon={<Iconify icon="solar:eye-closed-bold" />}
                          sx={{ borderRadius: 50, color: 'warning.main' }}
                        >
                          Chuyển nháp
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          )}

          {/* Grid mirrors public blog cards */}
          <Grid container spacing={3}>
            {rest.map((p) => (
              <Grid key={p.slug} xs={12} sm={6}>
                <Card
                  sx={{
                    p: 0,
                    overflow: 'hidden',
                    borderRadius: 3,
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: `url(${p.cover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                    }}
                  >
                    <Chip
                      size="small"
                      label={p.status}
                      color={STATUS_COLOR[p.status]}
                      variant="filled"
                      sx={{ position: 'absolute', top: 12, right: 12 }}
                    />
                  </Box>
                  <Stack spacing={1.25} sx={{ p: 2.5, flexGrow: 1 }}>
                    <Chip
                      size="small"
                      label={p.category}
                      sx={{ alignSelf: 'flex-start', bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ color: SPA2_INK, lineHeight: 1.4, minHeight: 44 }}
                    >
                      {p.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
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
                        <Tooltip title="Sửa nhanh">
                          <IconButton size="small" onClick={() => openEdit(p)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Trang chi tiết">
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
        </Grid>

        {/* Sidebar mirrors public blog sidebar */}
        <Grid xs={12} md={4}>
          <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
            <Card sx={{ p: 2.5, borderRadius: 3 }}>
              <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 2 }}>
                Danh mục
              </Typography>
              <Stack spacing={1}>
                {SPA2_BLOG_CATEGORIES.map((c) => {
                  const count = items.filter((p) => p.category === c.name).length;
                  return (
                    <Stack
                      key={c.name}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ py: 1, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}
                    >
                      <Typography sx={{ color: SPA2_INK }}>{c.name}</Typography>
                      <Chip
                        size="small"
                        label={count}
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                      />
                    </Stack>
                  );
                })}
              </Stack>
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

      {/* Quick create/edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editSlug ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
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
                {SPA2_BLOG_CATEGORIES.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
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
            <TextField
              label="Ảnh cover (URL)"
              size="small"
              value={form.cover}
              onChange={handleField('cover')}
              fullWidth
            />
            <TextField
              label="Slug (để trống sẽ tự tạo)"
              size="small"
              value={form.slug}
              onChange={handleField('slug')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editSlug ? 'Lưu thay đổi' : 'Tạo bài viết'}
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
    </Spa2ManageShell>
  );
}
