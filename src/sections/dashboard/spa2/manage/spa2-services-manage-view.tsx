import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
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

import { spa2Services, spa2ServiceCategories } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type Service = (typeof spa2Services)[number] & { active?: boolean };

const CATEGORIES = spa2ServiceCategories.filter((c) => c.value !== 'all');

const EMPTY_FORM = {
  slug: '',
  category: 'massage',
  name: '',
  short: '',
  duration: '',
  price: 0,
  icon: 'solar:hand-stars-bold-duotone',
  image: '',
  benefits: '',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2ServicesManageView() {
  const [items, setItems] = useState<Service[]>(spa2Services.map((s) => ({ ...s, active: true })));
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = useCallback(() => {
    setForm(EMPTY_FORM);
    setEditSlug(null);
    setOpenForm(true);
  }, []);

  const openEdit = useCallback((item: Service) => {
    setForm({
      slug: item.slug,
      category: item.category,
      name: item.name,
      short: item.short ?? '',
      duration: item.duration,
      price: item.price,
      icon: item.icon,
      image: item.image,
      benefits: item.benefits.join(', '),
    });
    setEditSlug(item.slug);
    setOpenForm(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const newItem: Service = {
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      category: form.category,
      name: form.name,
      short: form.short,
      duration: form.duration,
      price: Number(form.price),
      icon: form.icon,
      image: form.image,
      benefits: form.benefits
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean),
      active: true,
    };
    if (editSlug) {
      setItems((p) => p.map((s) => (s.slug === editSlug ? { ...s, ...newItem } : s)));
    } else {
      setItems((p) => [...p, newItem]);
    }
    setOpenForm(false);
  }, [form, editSlug]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((s) => s.slug !== deleteSlug));
    setDeleteSlug(null);
  }, [deleteSlug]);

  const handleToggle = useCallback((slug: string) => {
    setItems((p) => p.map((s) => (s.slug === slug ? { ...s, active: !s.active } : s)));
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Dịch vụ"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Dịch vụ' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Thêm dịch vụ
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm kiếm dịch vụ..."
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
                <TableCell>Dịch vụ</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell align="right">Giá (đ)</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.slug} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={item.image} sx={{ width: 48, height: 48, borderRadius: 1 }} />
                      <Box>
                        <Typography variant="subtitle2">{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.short}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category
                      }
                    />
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {item.price.toLocaleString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.active ? 'Hoạt động' : 'Dừng'}
                      color={item.active ? 'success' : 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title={item.active ? 'Dừng hoạt động' : 'Kích hoạt'}>
                        <IconButton size="small" onClick={() => handleToggle(item.slug)}>
                          <Iconify
                            icon={item.active ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
                            color={item.active ? 'warning.main' : 'success.main'}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton size="small" onClick={() => openEdit(item)}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setDeleteSlug(item.slug)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    Không có dịch vụ nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Form dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editSlug ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tên dịch vụ *"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
            />
            <TextField
              select
              label="Danh mục *"
              value={form.category}
              onChange={handleChange('category')}
              fullWidth
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                  {c.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Mô tả ngắn"
              value={form.short}
              onChange={handleChange('short')}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Thời gian (vd: 60 phút)"
                value={form.duration}
                onChange={handleChange('duration')}
                fullWidth
              />
              <TextField
                label="Giá (đ)"
                type="number"
                value={form.price}
                onChange={handleChange('price')}
                fullWidth
              />
            </Stack>
            <TextField
              label="URL ảnh"
              value={form.image}
              onChange={handleChange('image')}
              fullWidth
            />
            <TextField
              label="Lợi ích (cách nhau bởi dấu phẩy)"
              value={form.benefits}
              onChange={handleChange('benefits')}
              fullWidth
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.name}>
            {editSlug ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!deleteSlug}
        onClose={() => setDeleteSlug(null)}
        title="Xóa dịch vụ"
        content="Bạn có chắc chắn muốn xóa dịch vụ này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
