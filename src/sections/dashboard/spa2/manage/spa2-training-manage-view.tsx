import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
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

import { spa2TrainingPrograms } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type TrainingProgram = (typeof spa2TrainingPrograms)[number] & {
  id: number;
  active?: boolean;
  enrolled?: number;
};

const LEVELS = ['Người mới', 'Trung cấp', 'Nâng cao'];

const LEVEL_COLOR: Record<string, 'info' | 'warning' | 'error'> = {
  'Người mới': 'info',
  'Trung cấp': 'warning',
  'Nâng cao': 'error',
};

const EMPTY_FORM = { name: '', duration: '', level: 'Người mới', price: 0, outcome: '' };

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2TrainingManageView() {
  const [items, setItems] = useState<TrainingProgram[]>(
    spa2TrainingPrograms.map((t, i) => ({
      ...t,
      id: i + 1,
      active: true,
      enrolled: [12, 8, 5][i] ?? 0,
    }))
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

  const openEdit = (item: TrainingProgram) => {
    setForm({
      name: item.name,
      duration: item.duration,
      level: item.level,
      price: item.price,
      outcome: item.outcome,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = { ...form, price: Number(form.price) };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...next, id: newId, active: true, enrolled: 0 }]);
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
        heading="Quản lý Đào tạo"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Đào tạo' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Thêm khóa học
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm khóa học..."
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
                <TableCell>Khóa học</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Cấp độ</TableCell>
                <TableCell align="right">Học phí (đ)</TableCell>
                <TableCell align="center">Học viên</TableCell>
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
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        sx={{ maxWidth: 240, display: 'block' }}
                      >
                        {item.outcome}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.level}
                      color={LEVEL_COLOR[item.level] ?? 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={600}>
                      {item.price.toLocaleString('vi-VN')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="primary.main" fontWeight={600}>
                      {item.enrolled ?? 0}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.active ? 'Đang tuyển' : 'Tạm đóng'}
                      color={item.active ? 'success' : 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title={item.active ? 'Tạm đóng' : 'Mở lại'}>
                        <IconButton size="small" onClick={() => handleToggle(item.id)}>
                          <Iconify
                            icon={item.active ? 'solar:lock-bold' : 'solar:lock-unlocked-bold'}
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
        <DialogTitle>{editId !== null ? 'Cập nhật khóa học' : 'Thêm khóa học mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tên khóa học *"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Thời gian"
                value={form.duration}
                onChange={handleChange('duration')}
                fullWidth
              />
              <TextField
                select
                label="Cấp độ"
                value={form.level}
                onChange={handleChange('level')}
                fullWidth
              >
                {LEVELS.map((l) => (
                  <MenuItem key={l} value={l}>
                    {l}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              label="Học phí (đ)"
              type="number"
              value={form.price}
              onChange={handleChange('price')}
              fullWidth
            />
            <TextField
              label="Kết quả đạt được"
              value={form.outcome}
              onChange={handleChange('outcome')}
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
        title="Xóa khóa học"
        content="Bạn có chắc muốn xóa khóa học này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
