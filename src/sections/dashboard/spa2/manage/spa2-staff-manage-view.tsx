import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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

import { spa2Team } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type Staff = (typeof spa2Team)[number] & { id: number };

const EMPTY_FORM = { name: '', role: '', image: '', bio: '' };

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2StaffManageView() {
  const [items, setItems] = useState<Staff[]>(spa2Team.map((s, i) => ({ ...s, id: i + 1 })));
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Staff) => {
    setForm({ name: item.name, role: item.role, image: item.image, bio: item.bio });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...form, id: newId }]);
    }
    setOpenForm(false);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Đội ngũ"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Đội ngũ' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Thêm nhân viên
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm theo tên, chức vụ..."
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
                <TableCell>Nhân viên</TableCell>
                <TableCell>Chức vụ</TableCell>
                <TableCell>Tiểu sử</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={item.image} sx={{ width: 44, height: 44 }} />
                      <Typography variant="subtitle2">{item.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell sx={{ maxWidth: 320 }}>
                    <Typography variant="body2" noWrap color="text.secondary">
                      {item.bio}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
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
        <DialogTitle>{editId !== null ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Họ và tên *"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
            />
            <TextField
              label="Chức vụ"
              value={form.role}
              onChange={handleChange('role')}
              fullWidth
            />
            <TextField
              label="URL ảnh đại diện"
              value={form.image}
              onChange={handleChange('image')}
              fullWidth
            />
            <TextField
              label="Tiểu sử"
              value={form.bio}
              onChange={handleChange('bio')}
              fullWidth
              multiline
              rows={3}
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
        title="Xóa nhân viên"
        content="Bạn có chắc muốn xóa nhân viên này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
