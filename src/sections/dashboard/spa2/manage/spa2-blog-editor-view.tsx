import type { ReactNode } from 'react';
import type { Spa2BlogPost, Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  SPA2_POSTS,
  findSpa2Post,
  SPA2_SERVICES,
  spa2UpsertPost,
  spa2DeletePost,
  SPA2_BLOG_CATEGORY_NAMES,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';

import {
  Spa2Cta,
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

// ----------------------------------------------------------------------
// Full editor for a single blog post (route: /dashboard/spa2/blog/:slug).
// Reads/writes the exact same Spa2BlogPost shape — and the same shared
// SPA2_POSTS array — as the list (Spa2BlogManageView) and the public pages
// (Spa2BlogPageView / Spa2BlogDetailsPageView), via spa2UpsertPost /
// spa2DeletePost, so edits made here are reflected everywhere else in the
// same session.
//
// Three tabs, mirroring the pattern in spa2-career-editor-view.tsx /
// spa2-service-editor-view.tsx (extended to a 3-way split for this view):
// - 'banner': hero-facing fields only (title/excerpt/cover/category), with
//   a live Spa2PageHero preview of exactly how the top of the page will
//   look.
// - 'baiviet': everything else (slug/status/author/dates/tags/content),
//   plus a right-side preview card: status/slug/tags at a glance, the
//   author/date/readtime meta row, and — the main part — a real,
//   scrollable rendering of the article body (dangerouslySetInnerHTML with
//   the EXACT same sx typography rules Spa2BlogDetailsPageView uses for its
//   content block), so this tab's preview genuinely shows what the content
//   will look like on the public page, not just a metadata summary.
// - 'preview': a full reconstruction of the public /spa2/blog/:slug page —
//   hero, author/date meta, full rich-text content, tags, "gợi ý dịch vụ"
//   CTA card and "Bài viết liên quan" grid — built from the CURRENT
//   (unsaved) `value` state, reusing Spa2PageHero/Spa2SoftCard/
//   Spa2SectionTitle/Spa2Cta from src/sections/spa2/view/spa2-content-pages
//   (the same leaf components Spa2BlogDetailsPageView renders), so the
//   admin preview can never visually drift from reality.
// ----------------------------------------------------------------------

type TabKey = 'banner' | 'baiviet' | 'preview';

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

// Spa2PageHero is built for a full page-width section (two-column Grid,
// CTA buttons, absolute organic shapes) — scaling it down keeps it legible
// inside the narrower sidebar preview card. Same pattern as PreviewFrame in
// spa2-service-editor-view.tsx / spa2-career-editor-view.tsx.
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

export function Spa2BlogEditorView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const original = findSpa2Post(slug) ?? SPA2_POSTS[0];
  const [value, setValue] = useState<Spa2BlogPost>({ ...original });
  const [tab, setTab] = useState<TabKey>('banner');
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  // Same lookups as Spa2BlogDetailsPageView, computed off the current
  // (possibly unsaved) form state instead of a route param, so the
  // 'preview' tab reflects in-progress edits.
  const related = SPA2_POSTS.filter((p) => p.slug !== value.slug).slice(0, 3);
  const relatedService =
    SPA2_SERVICES.find((s) => value.category.toLowerCase().includes(s.category)) ??
    SPA2_SERVICES[0];

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
      {/* Tabs */}
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
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
          label="Banner"
        />
        <Tab
          value="baiviet"
          icon={<Iconify icon="solar:pen-bold-duotone" width={20} />}
          iconPosition="start"
          label="Bài viết"
        />
        <Tab
          value="preview"
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
          label="Xem trước toàn trang"
        />
      </Tabs>

      {tab === 'banner' && (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1.15fr' },
          }}
        >
          {/* ── Banner fields: only what feeds the public page hero ──── */}
          <Stack spacing={2.5}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify
                  icon="solar:gallery-wide-bold-duotone"
                  width={22}
                  sx={{ color: SPA2_TEAL }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Banner đầu trang
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
                <Spa2ImageField
                  label="Ảnh cover"
                  value={coverImageValue(value)}
                  onChange={updateCoverImage}
                  height={200}
                  helperText="Kéo thả ảnh, dán URL, hoặc tải ảnh từ máy — kéo trên ảnh để chọn điểm lấy nét, chỉnh thanh trượt để phóng to."
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
            </Card>
          </Stack>

          {/* ── Preview: hero-only — exactly what renders at the top of the
            public page (Spa2PageHero), so it can never visually drift from
            reality. ── */}
          <Box>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Spa2PageHero
                  image={coverImageValue(value).url}
                  imageStyle={coverImageValue(value)}
                  eyebrow={value.category}
                  title={value.title}
                  subtitle={value.excerpt}
                />
              </PreviewFrame>
            </SectionCard>
          </Box>
        </Box>
      )}

      {tab === 'baiviet' && (
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
                <TextField
                  label="Tác giả"
                  size="small"
                  fullWidth
                  value={value.author}
                  onChange={(e) => update('author', e.target.value)}
                />
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

          {/* ── Preview: status/slug/tags at a glance, the author/date/
            readtime meta row, then — the main part — a real, scrollable
            rendering of the article body using the EXACT same sx typography
            rules and dangerouslySetInnerHTML approach as
            Spa2BlogDetailsPageView's content block, so this preview
            genuinely corresponds to the public page instead of just
            summarizing it. The related-service CTA and related-posts grid
            still live only in the 'Xem trước toàn trang' tab. ── */}
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
                  Xem trước bài viết
                </Typography>
              </Stack>

              <Stack spacing={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
                  <Chip
                    size="small"
                    label={value.status}
                    color={STATUS_COLOR[value.status]}
                    variant="soft"
                  />
                  <Chip
                    size="small"
                    label={value.slug ? `/${value.slug}` : 'Chưa có slug'}
                    variant="outlined"
                    sx={{ borderColor: SPA2_TEAL, color: SPA2_TEAL_DARK }}
                  />
                </Stack>

                {value.tags.length > 0 && (
                  <Stack direction="row" spacing={0.75} flexWrap="wrap">
                    {value.tags.map((d) => (
                      <Chip
                        key={d}
                        label={`#${d}`}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: SPA2_TEAL, color: SPA2_TEAL_DARK }}
                      />
                    ))}
                  </Stack>
                )}

                <Divider />

                {/* Meta tác giả/ngày — cùng thứ tự với trang public: hàng
                  meta ngay trước phần thân bài viết. */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: SPA2_TEAL }}>{value.author[0]}</Avatar>
                  <Stack>
                    <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                      {value.author}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
                      {value.date} · {value.readTime}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Nội dung bài viết — dựng bằng đúng sx rules và
                  dangerouslySetInnerHTML mà Spa2BlogDetailsPageView dùng
                  (src/sections/spa2/view/spa2-content-pages.tsx), chỉ giới
                  hạn chiều cao + cuộn vì đây là panel bên cạnh, không phải
                  tab xem trước toàn trang. */}
                <Box
                  sx={{
                    maxHeight: 560,
                    overflowY: 'auto',
                    pr: 1,
                    color: SPA2_INK,
                    '& p': { lineHeight: 1.9, color: 'text.secondary', mb: 2.5 },
                    '& h3': { color: SPA2_TEAL_DARK, mt: 1, mb: 1.5 },
                    '& blockquote': {
                      m: 0,
                      mb: 2.5,
                      p: 2.5,
                      borderLeft: `4px solid ${SPA2_TEAL}`,
                      bgcolor: SPA2_CREAM,
                      fontStyle: 'italic',
                    },
                    '& ul, & ol': { pl: 3, mb: 2.5, color: 'text.secondary' },
                    '& a': { color: SPA2_TEAL },
                  }}
                  dangerouslySetInnerHTML={{ __html: value.content }}
                />
              </Stack>
            </Card>
          </Box>
        </Box>
      )}

      {/* ── PREVIEW TAB — full-page reconstruction, same section order as
          Spa2BlogDetailsPageView (src/sections/spa2/view/spa2-content-pages.tsx),
          built from the current unsaved `value` instead of a route param ── */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Box sx={{ bgcolor: 'background.default' }}>
            <Spa2PageHero
              image={value.cover}
              imageStyle={{
                focalX: value.coverFocalX ?? 50,
                focalY: value.coverFocalY ?? 50,
                zoom: value.coverZoom ?? 100,
              }}
              eyebrow={value.category}
              title={value.title}
              subtitle={value.excerpt}
            />
            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Container maxWidth="md">
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                  <Avatar sx={{ bgcolor: SPA2_TEAL }}>{value.author[0]}</Avatar>
                  <Stack>
                    <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                      {value.author}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
                      {value.date} · {value.readTime}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Ảnh minh hoạ trong nội dung */}
                <Box
                  sx={{
                    height: { xs: 220, md: 360 },
                    borderRadius: 4,
                    mb: 4,
                    backgroundImage: `url(${value.cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                {/* Nội dung bài viết */}
                <Box
                  sx={{
                    color: SPA2_INK,
                    '& p': { lineHeight: 1.9, color: 'text.secondary', mb: 2.5 },
                    '& h3': { color: SPA2_TEAL_DARK, mt: 1, mb: 1.5 },
                    '& blockquote': {
                      m: 0,
                      mb: 2.5,
                      p: 2.5,
                      borderLeft: `4px solid ${SPA2_TEAL}`,
                      bgcolor: SPA2_CREAM,
                      fontStyle: 'italic',
                    },
                    '& ul, & ol': { pl: 3, mb: 2.5, color: 'text.secondary' },
                    '& a': { color: SPA2_TEAL },
                  }}
                  dangerouslySetInnerHTML={{ __html: value.content }}
                />

                {value.tags.length > 0 && (
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mb: 4 }}>
                    {value.tags.map((d) => (
                      <Chip
                        key={d}
                        label={`#${d}`}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: SPA2_TEAL, color: SPA2_TEAL_DARK }}
                      />
                    ))}
                  </Stack>
                )}

                {/* CTA dịch vụ liên quan */}
                <Spa2SoftCard
                  sx={{
                    mt: 5,
                    background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
                    color: 'white',
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        Gợi ý cho bạn
                      </Typography>
                      <Typography variant="h6">{relatedService.name}</Typography>
                      <Typography sx={{ opacity: 0.85, fontSize: 14 }}>
                        {relatedService.short}
                      </Typography>
                    </Stack>
                    <Button
                      component={RouterLink}
                      href={paths.spa2.serviceDetails(relatedService.slug)}
                      sx={{
                        borderRadius: 999,
                        px: 3,
                        bgcolor: 'common.white',
                        color: SPA2_TEAL_DARK,
                        whiteSpace: 'nowrap',
                        '&:hover': { bgcolor: SPA2_CREAM },
                      }}
                    >
                      Xem dịch vụ
                    </Button>
                  </Stack>
                </Spa2SoftCard>
              </Container>
            </Box>

            {/* Related posts */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
              <Container>
                <Spa2SectionTitle eyebrow="Đọc thêm" title="Bài viết liên quan" />
                <Grid container spacing={4}>
                  {related.map((p) => (
                    <Grid key={p.slug} xs={12} sm={6} md={4}>
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
                            sx={{ mb: 1.5, bgcolor: 'common.white', color: SPA2_TEAL_DARK }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ color: SPA2_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
                          >
                            <Link
                              component={RouterLink}
                              href={paths.spa2.blogDetails(p.slug)}
                              sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': { color: SPA2_TEAL },
                              }}
                            >
                              {p.title}
                            </Link>
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                            {p.date} · {p.readTime}
                          </Typography>
                        </Box>
                      </Spa2SoftCard>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
            <Spa2Cta />
          </Box>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
