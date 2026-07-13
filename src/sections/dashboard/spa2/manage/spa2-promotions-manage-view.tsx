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

import { spa2Promotions } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type Promotion = (typeof spa2Promotions)[number] & { id: number; active?: boolean };

const EMPTY_FORM = {
  title: '',
  period: '',
  price: '',
  save: '',
  image: '',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2PromotionsManageView() {
  const [items, setItems] = useState<Promotion[]>(
    spa2Promotions.map((p, i) => ({ ...p, id: i + 1, active: true }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Promotion) => {
    setForm({
      title: item.title,
      period: item.period,
      price: item.price,
      save: item.save,
      image: item.image,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...form, id: newId, active: true }]);
    }
    setOpenForm(false);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const handleToggle = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Khuyến mãi"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Khuyến mãi' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Thêm khuyến mãi
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm kiếm khuyến mãi..."
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
                <TableCell>Chương trình</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Giá / Tiết kiệm</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={item.image} variant="rounded" sx={{ width: 56, height: 40 }} />
                      <Typography variant="subtitle2">{item.title}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {item.price}
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      {item.save}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.active ? 'Đang chạy' : 'Tạm dừng'}
                      color={item.active ? 'success' : 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title={item.active ? 'Tạm dừng' : 'Kích hoạt'}>
                        <IconButton size="small" onClick={() => handleToggle(item.id)}>
                          <Iconify
                            icon={item.active ? 'solar:pause-bold' : 'solar:play-bold'}
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
        <DialogTitle>{editId !== null ? 'Cập nhật khuyến mãi' : 'Thêm khuyến mãi mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tên chương trình *"
              value={form.title}
              onChange={handleChange('title')}
              fullWidth
            />
            <TextField
              label="Thời gian (vd: 01/06 – 31/08/2026)"
              value={form.period}
              onChange={handleChange('period')}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Mức giá / Ưu đãi"
                value={form.price}
                onChange={handleChange('price')}
                fullWidth
              />
              <TextField
                label="Tiết kiệm"
                value={form.save}
                onChange={handleChange('save')}
                fullWidth
              />
            </Stack>
            <TextField
              label="URL ảnh"
              value={form.image}
              onChange={handleChange('image')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title}>
            {editId !== null ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Xóa khuyến mãi"
        content="Bạn có chắc muốn xóa chương trình khuyến mãi này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
