import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
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

import { spa2BeforeAfters } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type BAStatus = 'pending' | 'approved' | 'rejected';

type BeforeAfter = (typeof spa2BeforeAfters)[number] & { id: number; status: BAStatus };

const EMPTY_FORM = { title: '', before: '', after: '', duration: '', note: '' };

const STATUS_COLOR: Record<BAStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};
const STATUS_LABEL: Record<BAStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BeforeAfterManageView() {
  const [items, setItems] = useState<BeforeAfter[]>(
    spa2BeforeAfters.map((b, i) => ({
      ...b,
      id: i + 1,
      status: i < 2 ? 'approved' : ('pending' as BAStatus),
    }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<BeforeAfter | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: BeforeAfter) => {
    setForm({
      title: item.title,
      before: item.before,
      after: item.after,
      duration: item.duration,
      note: item.note,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...form, id: newId, status: 'pending' }]);
    }
    setOpenForm(false);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const handleSetStatus = useCallback((id: number, status: BAStatus) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status } : v));
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Before & After"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Before & After' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Thêm case
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm kiếm..."
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
                <TableCell>Liệu trình</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        component="img"
                        src={item.before}
                        sx={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 0.5 }}
                      />
                      <Iconify
                        icon="solar:arrow-right-bold"
                        width={14}
                        sx={{ color: 'text.disabled' }}
                      />
                      <Box
                        component="img"
                        src={item.after}
                        sx={{ width: 40, height: 32, objectFit: 'cover', borderRadius: 0.5 }}
                      />
                      <Typography variant="subtitle2" sx={{ ml: 0.5 }}>
                        {item.title}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell sx={{ maxWidth: 240 }}>
                    <Typography variant="body2" noWrap color="text.secondary">
                      {item.note}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={STATUS_LABEL[item.status]}
                      color={STATUS_COLOR[item.status]}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      {item.status === 'pending' && (
                        <>
                          <Tooltip title="Duyệt">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleSetStatus(item.id, 'approved')}
                            >
                              <Iconify icon="solar:check-circle-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Từ chối">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleSetStatus(item.id, 'rejected')}
                            >
                              <Iconify icon="solar:close-circle-bold" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="Xem">
                        <IconButton size="small" onClick={() => setViewItem(item)}>
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Sửa">
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

      {/* View dialog */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="md" fullWidth>
        <DialogTitle>{viewItem?.title}</DialogTitle>
        <DialogContent dividers>
          {viewItem && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                  Trước
                </Typography>
                <Box
                  component="img"
                  src={viewItem.before}
                  sx={{ width: '100%', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                  Sau
                </Typography>
                <Box component="img" src={viewItem.after} sx={{ width: '100%', borderRadius: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Thời gian:</strong> {viewItem.duration}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  <strong>Ghi chú:</strong> {viewItem.note}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {viewItem?.status === 'pending' && (
            <>
              <Button
                color="error"
                onClick={() => {
                  handleSetStatus(viewItem.id, 'rejected');
                  setViewItem(null);
                }}
              >
                Từ chối
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleSetStatus(viewItem.id, 'approved');
                  setViewItem(null);
                }}
              >
                Duyệt
              </Button>
            </>
          )}
          <Button onClick={() => setViewItem(null)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Form dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId !== null ? 'Cập nhật case' : 'Thêm case Before & After'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tiêu đề *"
              value={form.title}
              onChange={handleChange('title')}
              fullWidth
            />
            <TextField
              label="URL ảnh trước"
              value={form.before}
              onChange={handleChange('before')}
              fullWidth
            />
            <TextField
              label="URL ảnh sau"
              value={form.after}
              onChange={handleChange('after')}
              fullWidth
            />
            <TextField
              label="Thời gian liệu trình"
              value={form.duration}
              onChange={handleChange('duration')}
              fullWidth
            />
            <TextField
              label="Ghi chú kết quả"
              value={form.note}
              onChange={handleChange('note')}
              fullWidth
              multiline
              rows={2}
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
        title="Xóa case Before & After"
        content="Bạn có chắc muốn xóa case này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
