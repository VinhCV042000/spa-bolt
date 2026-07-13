import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
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

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { spa2BlogPosts, spa2BlogCategories } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type BlogPost = (typeof spa2BlogPosts)[number] & {
  id: number;
  status: 'published' | 'draft';
};

const EMPTY_FORM = {
  title: '',
  excerpt: '',
  cover: '',
  author: '',
  date: new Date().toLocaleDateString('vi-VN'),
  category: 'Skincare',
  readTime: '5 phút',
  slug: '',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BlogManageView() {
  const [items, setItems] = useState<BlogPost[]>(
    spa2BlogPosts.map((p, i) => ({ ...p, id: i + 1, status: 'published' as const }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: BlogPost) => {
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      cover: item.cover,
      author: item.author,
      date: item.date,
      category: item.category,
      readTime: item.readTime,
      slug: item.slug,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = {
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
      title: form.title,
      excerpt: form.excerpt,
      cover: form.cover,
      author: form.author,
      date: form.date,
      category: form.category,
      readTime: form.readTime,
    };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...next, id: newId, status: 'draft' }]);
    }
    setOpenForm(false);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const handleToggleStatus = useCallback((id: number) => {
    setItems((p) =>
      p.map((x) =>
        x.id === id ? { ...x, status: x.status === 'published' ? 'draft' : 'published' } : x
      )
    );
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Blog"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Blog' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Viết bài mới
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm kiếm bài viết..."
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
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bài viết</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Tác giả</TableCell>
                <TableCell>Ngày đăng</TableCell>
                <TableCell>Đọc</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ maxWidth: 260 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        src={item.cover}
                        sx={{ width: 48, height: 36, borderRadius: 1 }}
                        variant="rounded"
                      />
                      <Typography variant="subtitle2" noWrap>
                        {item.title}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={item.category} />
                  </TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.readTime}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.status === 'published' ? 'Đã đăng' : 'Nháp'}
                      color={item.status === 'published' ? 'success' : 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title={item.status === 'published' ? 'Chuyển nháp' : 'Đăng bài'}>
                        <IconButton size="small" onClick={() => handleToggleStatus(item.id)}>
                          <Iconify
                            icon={
                              item.status === 'published'
                                ? 'solar:eye-closed-bold'
                                : 'solar:send-bold'
                            }
                            color={item.status === 'published' ? 'warning.main' : 'success.main'}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton size="small" onClick={() => openEdit(item)}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}>
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

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId !== null ? 'Cập nhật bài viết' : 'Viết bài mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tiêu đề *"
              value={form.title}
              onChange={handleChange('title')}
              fullWidth
            />
            <TextField
              label="Tóm tắt"
              value={form.excerpt}
              onChange={handleChange('excerpt')}
              fullWidth
              multiline
              rows={2}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Tác giả"
                value={form.author}
                onChange={handleChange('author')}
                fullWidth
              />
              <TextField
                select
                label="Danh mục"
                value={form.category}
                onChange={handleChange('category')}
                fullWidth
              >
                {spa2BlogCategories.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Ngày đăng"
                value={form.date}
                onChange={handleChange('date')}
                fullWidth
              />
              <TextField
                label="Thời gian đọc"
                value={form.readTime}
                onChange={handleChange('readTime')}
                fullWidth
              />
            </Stack>
            <TextField
              label="URL ảnh bìa"
              value={form.cover}
              onChange={handleChange('cover')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title}>
            {editId !== null ? 'Cập nhật' : 'Lưu bản nháp'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Xóa bài viết"
        content="Bài viết này sẽ bị xóa vĩnh viễn."
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
