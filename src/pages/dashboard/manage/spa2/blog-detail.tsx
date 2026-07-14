import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { SPA2_POSTS, findSpa2Post, type Spa2BlogPost } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import { SPA2_TEAL } from 'src/sections/spa2/spa2-data';
import { Spa2ManageShell } from 'src/sections/dashboard/spa2/manage/spa2-manage-shell';

const metadata = { title: `Chi tiết Bài viết | Spa2 - ${CONFIG.appName}` };

const STATUS_OPTIONS: Spa2BlogPost['status'][] = ['Đã đăng', 'Chờ duyệt', 'Bản nháp'];
const STATUS_COLOR: Record<Spa2BlogPost['status'], 'success' | 'warning' | 'default'> = {
  'Đã đăng': 'success',
  'Chờ duyệt': 'warning',
  'Bản nháp': 'default',
};

export default function Page() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const original = findSpa2Post(slug) ?? SPA2_POSTS[0];
  const [value, setValue] = useState<Spa2BlogPost>({ ...original });
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const update = <K extends keyof Spa2BlogPost>(k: K, v: Spa2BlogPost[K]) =>
    setValue((prev) => ({ ...prev, [k]: v }));

  const handleSave = () => setSavedAt(new Date());
  const handleApprove = () => {
    update('status', 'Đã đăng');
    setSavedAt(new Date());
  };
  const handleDelete = () => navigate(paths.dashboard.spa2.blog);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2ManageShell
        title={value.title || 'Bài viết'}
        eyebrow="Nature Spa · Bài viết"
        description={`Slug: /spa2/blog/${value.slug}`}
        breadcrumbLabel="Blog"
        publicPath={paths.spa2.blogDetails(value.slug)}
        actions={
          <>
            <Button
              onClick={handleApprove}
              startIcon={<Iconify icon="solar:check-circle-bold" />}
              sx={{
                borderRadius: 50,
                px: 2.5,
                color: 'common.white',
                border: '1.5px solid rgba(255,255,255,0.7)',
              }}
            >
              Duyệt & Đăng
            </Button>
            <Button
              onClick={handleSave}
              startIcon={<Iconify icon="solar:diskette-bold" />}
              sx={{ borderRadius: 50, px: 3, bgcolor: 'common.white', color: SPA2_TEAL }}
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
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1.1fr' },
          }}
        >
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
                  label="Slug"
                  size="small"
                  value={value.slug}
                  onChange={(e) => update('slug', e.target.value)}
                />
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
                <TextField
                  label="Ảnh cover"
                  size="small"
                  value={value.cover}
                  onChange={(e) => update('cover', e.target.value)}
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
                    label="Ngày đăng"
                    size="small"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={value.publishedAt}
                    onChange={(e) => update('publishedAt', e.target.value)}
                  />
                </Stack>
                <TextField
                  label="Tags (phân cách bằng dấu ,)"
                  size="small"
                  value={value.tags.join(', ')}
                  onChange={(e) =>
                    update(
                      'tags',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
                <TextField
                  label="Nội dung"
                  size="small"
                  multiline
                  rows={6}
                  value={value.content}
                  onChange={(e) => update('content', e.target.value)}
                />
                <TextField
                  label="Trạng thái"
                  size="small"
                  select
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

          <Box>
            <Card sx={{ p: 2.5, borderRadius: 3, position: 'sticky', top: 96, bgcolor: 'grey.50' }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify icon="solar:eye-bold" width={20} sx={{ color: SPA2_TEAL }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Xem trước bài viết
                </Typography>
              </Stack>
              <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={value.cover}
                  alt={value.title}
                  sx={{ width: '100%', height: 240, objectFit: 'cover' }}
                />
                <Stack spacing={1.5} sx={{ p: 3 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={value.status}
                      color={STATUS_COLOR[value.status]}
                      variant="soft"
                    />
                    <Typography variant="caption" color="text.secondary">
                      · {value.author} · {value.publishedAt}
                    </Typography>
                  </Stack>
                  <Typography variant="h5">{value.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.excerpt}
                  </Typography>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
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
                  <Divider />
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {value.content}
                  </Typography>
                </Stack>
              </Card>
            </Card>
          </Box>
        </Box>
      </Spa2ManageShell>
    </>
  );
}
