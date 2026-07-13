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

import { spa2Offers } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type Offer = (typeof spa2Offers)[number] & { id: number; active?: boolean };

const EMPTY_FORM = {
  title: '',
  desc: '',
  code: '',
  discount: '',
  expires: '',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2OffersManageView() {
  const [items, setItems] = useState<Offer[]>(
    spa2Offers.map((o, i) => ({ ...o, id: i + 1, active: true }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = items.filter(
    (o) =>
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Offer) => {
    setForm({
      title: item.title,
      desc: item.desc,
      code: item.code,
      discount: item.discount,
      expires: item.expires,
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

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Ưu đãi & Mã giảm giá"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Ưu đãi' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            Tạo ưu đãi
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm ưu đãi, mã giảm giá..."
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
                <TableCell>Tên ưu đãi</TableCell>
                <TableCell>Mã code</TableCell>
                <TableCell>Giảm</TableCell>
                <TableCell>Hết hạn</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{item.title}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        sx={{ maxWidth: 200, display: 'block' }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Chip
                        size="small"
                        label={item.code}
                        variant="outlined"
                        color="primary"
                        sx={{ fontFamily: 'monospace', fontWeight: 700 }}
                      />
                      <Tooltip title={copied === item.code ? 'Đã sao chép!' : 'Copy'}>
                        <IconButton size="small" onClick={() => handleCopy(item.code)}>
                          <Iconify
                            icon={copied === item.code ? 'solar:check-bold' : 'solar:copy-bold'}
                            width={14}
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} color="error.main">
                      {item.discount}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.expires}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.active ? 'Đang dùng' : 'Tắt'}
                      color={item.active ? 'success' : 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title={item.active ? 'Tắt' : 'Bật'}>
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
        <DialogTitle>{editId !== null ? 'Cập nhật ưu đãi' : 'Tạo ưu đãi mới'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Tên ưu đãi *"
              value={form.title}
              onChange={handleChange('title')}
              fullWidth
            />
            <TextField
              label="Mô tả"
              value={form.desc}
              onChange={handleChange('desc')}
              fullWidth
              multiline
              rows={2}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Mã code"
                value={form.code}
                onChange={handleChange('code')}
                fullWidth
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
              <TextField
                label="Mức giảm (vd: -30%)"
                value={form.discount}
                onChange={handleChange('discount')}
                fullWidth
              />
            </Stack>
            <TextField
              label="Ngày hết hạn (vd: 31/12/2026)"
              value={form.expires}
              onChange={handleChange('expires')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title}>
            {editId !== null ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Xóa ưu đãi"
        content="Bạn có chắc muốn xóa ưu đãi này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
