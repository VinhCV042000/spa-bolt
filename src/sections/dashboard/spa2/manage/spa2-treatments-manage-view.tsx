import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
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

import { spa2Treatments } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type Treatment = (typeof spa2Treatments)[number] & { id: number; active?: boolean };

const EMPTY_FORM = {
  name: '',
  sessions: 8,
  duration: '2 tháng',
  price: 0,
  target: '',
  includes: '',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2TreatmentsManageView() {
  const [items, setItems] = useState<Treatment[]>(
    spa2Treatments.map((t, i) => ({ ...t, id: i + 1, active: true }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Treatment) => {
    setForm({
      name: item.name,
      sessions: item.sessions,
      duration: item.duration,
      price: item.price,
      target: item.target,
      includes: item.includes.join(', '),
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = {
      name: form.name,
      sessions: Number(form.sessions),
      duration: form.duration,
      price: Number(form.price),
      target: form.target,
      includes: form.includes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      active: true,
    };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...next, id: newId }]);
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
        heading="Quản lý Liệu trình"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Liệu trình' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Thêm liệu trình
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm kiếm liệu trình..."
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
                <TableCell>Tên liệu trình</TableCell>
                <TableCell>Mục tiêu</TableCell>
                <TableCell align="center">Số buổi</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell align="right">Giá (đ)</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.includes.slice(0, 2).join(' · ')}
                        {item.includes.length > 2 && ' ...'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.target}</TableCell>
                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={`${item.sessions} buổi`}
                      color="primary"
                      variant="soft"
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
                      <Tooltip title={item.active ? 'Dừng' : 'Kích hoạt'}>
                        <IconButton size="small" onClick={() => handleToggle(item.id)}>
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
        <DialogTitle>{editId !== null ? 'Cập nhật liệu trình' : 'Thêm liệu trình mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tên liệu trình *"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
            />
            <TextField
              label="Mục tiêu"
              value={form.target}
              onChange={handleChange('target')}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Số buổi"
                type="number"
                value={form.sessions}
                onChange={handleChange('sessions')}
                fullWidth
              />
              <TextField
                label="Thời gian"
                value={form.duration}
                onChange={handleChange('duration')}
                fullWidth
              />
            </Stack>
            <TextField
              label="Giá (đ)"
              type="number"
              value={form.price}
              onChange={handleChange('price')}
              fullWidth
            />
            <TextField
              label="Bao gồm (cách nhau bởi dấu phẩy)"
              value={form.includes}
              onChange={handleChange('includes')}
              fullWidth
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.name}>
            {editId !== null ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Xóa liệu trình"
        content="Bạn có chắc chắn muốn xóa liệu trình này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
