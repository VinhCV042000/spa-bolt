import type { Spa2BlogPost, Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import {
  SPA2_POSTS,
  findSpa2Post,
  spa2UpsertPost,
  spa2DeletePost,
  SPA2_BLOG_CATEGORY_NAMES,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
import { SPA2_INK, SPA2_TEAL, SPA2_CREAM, SPA2_TEAL_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ----------------------------------------------------------------------
// Full editor for a single blog post (route: /dashboard/spa2/blog/:slug).
// Reads/writes the exact same Spa2BlogPost shape — and the same shared
// SPA2_POSTS array — as the list (Spa2BlogManageView) and the public pages
// (Spa2BlogPageView / Spa2BlogDetailsPageView), via spa2UpsertPost /
// spa2DeletePost, so edits made here are reflected everywhere else in the
// same session. The right-hand preview renders the actual rich-text content
// exactly like the public page does.
// ----------------------------------------------------------------------

const STATUS_OPTIONS: Spa2BlogPost['status'][] = ['Đã đăng', 'Chờ duyệt', 'Bản nháp'];
const STATUS_COLOR: Record<Spa2BlogPost['status'], 'success' | 'warning' | 'default'> = {
  'Đã đăng': 'success',
  'Chờ duyệt': 'warning',
  'Bản nháp': 'default',
};

const coverImageValue = (post: Spa2BlogPost): Spa2AdjustableImage => ({
  url: post.cover,
  focalX: post.coverFocalX ?? 50,
  focalY: post.coverFocalY ?? 50,
  zoom: post.coverZoom ?? 100,
});

export function Spa2BlogEditorView() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const original = findSpa2Post(slug) ?? SPA2_POSTS[0];
  const [value, setValue] = useState<Spa2BlogPost>({ ...original });
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const update = <K extends keyof Spa2BlogPost>(k: K, v: Spa2BlogPost[K]) =>
    setValue((prev) => ({ ...prev, [k]: v }));

  const updateCoverImage = (img: Spa2AdjustableImage) => {
    setValue((prev) => ({
      ...prev,
      cover: img.url,
      coverFocalX: img.focalX,
      coverFocalY: img.focalY,
      coverZoom: img.zoom,
    }));
  };

  const persist = (post: Spa2BlogPost) => {
    spa2UpsertPost(post);
    setSavedAt(new Date());
  };

  const handleSave = () => persist(value);
  const handleApprove = () => {
    const next = { ...value, status: 'Đã đăng' as const };
    setValue(next);
    persist(next);
  };
  const handleDelete = () => {
    spa2DeletePost(value.slug);
    navigate(paths.dashboard.spa2.blog);
  };
  const handleBack = () => navigate(paths.dashboard.spa2.blog);

  return (
    <Spa2ManageShell
      title={value.title || 'Bài viết'}
      eyebrow="Nature Spa · Bài viết"
      description={`Slug: /spa2/blog/${value.slug}`}
      breadcrumbLabel="Blog"
      publicPath={paths.spa2.blogDetails(value.slug)}
      actions={
        <>
          <Button
            onClick={handleBack}
            startIcon={<Iconify icon="solar:arrow-left-linear" />}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
            }}
          >
            Quay lại danh sách
          </Button>
          <Button
            onClick={handleApprove}
            startIcon={<Iconify icon="solar:check-circle-bold" />}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
            }}
          >
            Duyệt & Đăng
          </Button>
          <Button
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{
              borderRadius: 50,
              px: 3,
              bgcolor: 'common.white',
              color: SPA2_TEAL,
              '&:hover': { bgcolor: SPA2_CREAM },
            }}
          >
            Lưu
          </Button>
        </>
      }
    >
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1.15fr' },
        }}
      >
        {/* ── Editor ─────────────────────────────────────────────── */}
        <Stack spacing={2.5}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Iconify icon="solar:notebook-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Thông tin bài viết
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <TextField
                label="Tiêu đề"
                size="small"
                value={value.title}
                onChange={(e) => update('title', e.target.value)}
              />
              <TextField
                label="Tóm tắt"
                size="small"
                multiline
                rows={2}
                value={value.excerpt}
                onChange={(e) => update('excerpt', e.target.value)}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Slug"
                  size="small"
                  fullWidth
                  value={value.slug}
                  onChange={(e) => update('slug', e.target.value)}
                />
                <TextField
                  label="Trạng thái"
                  size="small"
                  select
                  fullWidth
                  value={value.status}
                  onChange={(e) => update('status', e.target.value as Spa2BlogPost['status'])}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Spa2ImageField
                label="Ảnh cover"
                value={coverImageValue(value)}
                onChange={updateCoverImage}
                height={200}
                helperText="Kéo thả ảnh, dán URL, hoặc tải ảnh từ máy — kéo trên ảnh để chọn điểm lấy nét, chỉnh thanh trượt để phóng to."
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Tác giả"
                  size="small"
                  fullWidth
                  value={value.author}
                  onChange={(e) => update('author', e.target.value)}
                />
                <TextField
                  label="Danh mục"
                  size="small"
                  select
                  fullWidth
                  value={value.category}
                  onChange={(e) => update('category', e.target.value)}
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
                  label="Ngày đăng (ISO)"
                  size="small"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={value.publishedAt}
                  onChange={(e) => {
                    const iso = e.target.value;
                    update('publishedAt', iso);
                    if (iso) {
                      const [y, m, d] = iso.split('-');
                      update('date', `${d}/${m}/${y}`);
                    }
                  }}
                />
                <TextField
                  label="Ngày hiển thị"
                  size="small"
                  fullWidth
                  value={value.date}
                  onChange={(e) => update('date', e.target.value)}
                />
                <TextField
                  label="Thời lượng đọc"
                  size="small"
                  fullWidth
                  value={value.readTime}
                  onChange={(e) => update('readTime', e.target.value)}
                />
              </Stack>
              <TextField
                label="Tags (phân cách bằng dấu ,)"
                size="small"
                value={value.tags.join(', ')}
                onChange={(e) =>
                  update(
                    'tags',
                    e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
              />
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: SPA2_INK }}>
                  Nội dung
                </Typography>
                <Editor
                  value={value.content}
                  onChange={(html) => update('content', html)}
                  placeholder="Viết nội dung bài viết…"
                  fullItem
                  sx={{ maxHeight: 480 }}
                />
              </Stack>
            </Stack>
          </Card>

          <Card sx={{ p: 2.5, borderRadius: 3, bgcolor: 'error.lighter' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle2" color="error.darker">
                  Xoá bài viết
                </Typography>
                <Typography variant="caption" color="error.dark">
                  Hành động không thể hoàn tác (mock).
                </Typography>
              </Box>
              <Button
                color="error"
                variant="outlined"
                onClick={handleDelete}
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              >
                Xoá
              </Button>
            </Stack>
          </Card>

          {savedAt && (
            <Chip
              size="small"
              variant="soft"
              color="success"
              label={`Đã lưu ${savedAt.toLocaleTimeString('vi-VN')}`}
              icon={<Iconify icon="solar:check-circle-bold" width={14} />}
              sx={{ alignSelf: 'flex-start' }}
            />
          )}
        </Stack>

        {/* ── Preview mirrors public /spa2/blog/:slug ─────────── */}
        <Box>
          <Card
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              position: 'sticky',
              top: 96,
              bgcolor: SPA2_CREAM,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2 }}>
              <Iconify icon="solar:eye-bold" width={20} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Xem trước (giống trang public)
              </Typography>
            </Stack>

            {/* Hero — teal overlay like Spa2PageHero */}
            <Box
              sx={{
                position: 'relative',
                height: 260,
                color: 'common.white',
                display: 'flex',
                alignItems: 'flex-end',
                p: 3,
                ...spa2ImageBackgroundStyle(coverImageValue(value)),
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(135deg, rgba(29,107,92,0.55), rgba(46,139,122,0.35))',
                }}
              />
              <Stack spacing={1} sx={{ position: 'relative' }}>
                <Chip
                  size="small"
                  label={value.category}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: SPA2_TEAL_DARK,
                    alignSelf: 'flex-start',
                  }}
                />
                <Typography variant="h5" sx={{ color: 'common.white' }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {value.excerpt}
                </Typography>
              </Stack>
            </Box>

            <Container maxWidth="md" sx={{ py: 4, bgcolor: 'background.paper' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: SPA2_TEAL }}>{value.author[0]}</Avatar>
                <Stack>
                  <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{value.author}</Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {value.date} · {value.readTime}
                    </Typography>
                    <Chip
                      size="small"
                      label={value.status}
                      color={STATUS_COLOR[value.status]}
                      variant="soft"
                      sx={{ height: 18 }}
                    />
                  </Stack>
                </Stack>
              </Stack>

              <Box
                sx={{
                  height: 200,
                  borderRadius: 2,
                  mb: 3,
                  ...spa2ImageBackgroundStyle(coverImageValue(value)),
                }}
              />

              <Box
                sx={{
                  color: SPA2_INK,
                  '& p': { lineHeight: 1.9, color: 'text.secondary', mb: 2 },
                  '& h3': { color: SPA2_TEAL_DARK, mt: 1, mb: 1.5 },
                  '& blockquote': {
                    m: 0,
                    mb: 2,
                    p: 2,
                    borderLeft: `4px solid ${SPA2_TEAL}`,
                    bgcolor: SPA2_CREAM,
                    fontStyle: 'italic',
                  },
                  '& ul, & ol': { pl: 3, mb: 2, color: 'text.secondary' },
                }}
                dangerouslySetInnerHTML={{ __html: value.content }}
              />

              {value.tags.length > 0 && (
                <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 2 }}>
                  {value.tags.map((t) => (
                    <Chip
                      key={t}
                      label={`#${t}`}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: SPA2_TEAL, color: SPA2_TEAL }}
                    />
                  ))}
                </Stack>
              )}
            </Container>
          </Card>
        </Box>
      </Box>
    </Spa2ManageShell>
  );
}
