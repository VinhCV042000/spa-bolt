import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
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

import { spa2Feedbacks } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type FeedbackStatus = 'pending' | 'approved' | 'rejected';

type Feedback = (typeof spa2Feedbacks)[number] & { id: number; status: FeedbackStatus };

const STATUS_COLOR: Record<FeedbackStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

const STATUS_LABEL: Record<FeedbackStatus, string> = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2FeedbacksManageView() {
  const [items, setItems] = useState<Feedback[]>(
    spa2Feedbacks.map((f, i) => ({
      ...f,
      id: i + 1,
      status: i < 2 ? 'approved' : ('pending' as FeedbackStatus),
    }))
  );
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<FeedbackStatus | 'all'>('all');
  const [viewItem, setViewItem] = useState<Feedback | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = items.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleApprove = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status: 'approved' } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status: 'approved' } : v));
  }, []);

  const handleReject = useCallback((id: number) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status: 'rejected' } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status: 'rejected' } : v));
  }, []);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const counts = {
    all: items.length,
    pending: items.filter((f) => f.status === 'pending').length,
    approved: items.filter((f) => f.status === 'approved').length,
    rejected: items.filter((f) => f.status === 'rejected').length,
  };

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Đánh giá"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Đánh giá' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
        {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
          <Chip
            key={s}
            label={`${s === 'all' ? 'Tất cả' : STATUS_LABEL[s]} (${counts[s]})`}
            variant={filterStatus === s ? 'filled' : 'outlined'}
            color={s === 'all' ? 'default' : STATUS_COLOR[s]}
            onClick={() => setFilterStatus(s)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm khách hàng, dịch vụ..."
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
                <TableCell>Khách hàng</TableCell>
                <TableCell>Dịch vụ</TableCell>
                <TableCell>Sao</TableCell>
                <TableCell sx={{ maxWidth: 240 }}>Nội dung</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar src={item.avatar} sx={{ width: 36, height: 36 }} />
                      <Box>
                        <Typography variant="subtitle2">{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.role}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>
                    <Rating value={item.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell sx={{ maxWidth: 240 }}>
                    <Typography variant="body2" noWrap>
                      {item.comment}
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
                              onClick={() => handleApprove(item.id)}
                            >
                              <Iconify icon="solar:check-circle-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Từ chối">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleReject(item.id)}
                            >
                              <Iconify icon="solar:close-circle-bold" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {item.status === 'rejected' && (
                        <Tooltip title="Duyệt lại">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleApprove(item.id)}
                          >
                            <Iconify icon="solar:restart-bold" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Xem chi tiết">
                        <IconButton size="small" onClick={() => setViewItem(item)}>
                          <Iconify icon="solar:eye-bold" />
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

      {/* View detail */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Chi tiết đánh giá</DialogTitle>
        <DialogContent dividers>
          {viewItem && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={viewItem.avatar} sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="subtitle1">{viewItem.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {viewItem.role}
                  </Typography>
                  <Rating value={viewItem.rating} readOnly size="small" />
                </Box>
              </Stack>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Dịch vụ:
                </Typography>
                <Typography variant="body2">{viewItem.service}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Nhận xét:
                </Typography>
                <Typography variant="body2">{viewItem.comment}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Trạng thái:
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    size="small"
                    label={STATUS_LABEL[viewItem.status]}
                    color={STATUS_COLOR[viewItem.status]}
                    variant="soft"
                  />
                </Box>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          {viewItem?.status === 'pending' && (
            <>
              <Button
                color="error"
                onClick={() => {
                  handleReject(viewItem.id);
                  setViewItem(null);
                }}
              >
                Từ chối
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  handleApprove(viewItem.id);
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

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Xóa đánh giá"
        content="Bạn có chắc muốn xóa đánh giá này?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
        }
      />
    </DashboardContent>
  );
}
