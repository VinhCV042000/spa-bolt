import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
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
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ─── Mock booking appointments ────────────────────────────────────────────────

type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

interface Booking {
  id: number;
  customer: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  branch: string;
  note: string;
  status: BookingStatus;
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    customer: 'Nguyễn Thị Lan',
    phone: '0901 234 567',
    service: 'Facial Organic',
    date: '14/07/2026',
    time: '09:00',
    branch: 'Quận 1',
    note: 'Da nhạy cảm',
    status: 'pending',
  },
  {
    id: 2,
    customer: 'Trần Minh Tuấn',
    phone: '0912 345 678',
    service: 'Massage Thảo Dược',
    date: '14/07/2026',
    time: '10:30',
    branch: 'Hồ Tây',
    note: '',
    status: 'confirmed',
  },
  {
    id: 3,
    customer: 'Lê Thị Hoa',
    phone: '0923 456 789',
    service: 'Spa Đôi',
    date: '15/07/2026',
    time: '14:00',
    branch: 'Quận 1',
    note: 'Kỷ niệm ngày cưới',
    status: 'confirmed',
  },
  {
    id: 4,
    customer: 'Phạm Văn Nam',
    phone: '0934 567 890',
    service: 'Detox 3 ngày',
    date: '16/07/2026',
    time: '09:00',
    branch: 'Đà Nẵng',
    note: 'Gói full 3 ngày',
    status: 'pending',
  },
  {
    id: 5,
    customer: 'Vũ Thị Mai',
    phone: '0945 678 901',
    service: 'Aromatherapy',
    date: '13/07/2026',
    time: '15:00',
    branch: 'Nha Trang',
    note: '',
    status: 'completed',
  },
  {
    id: 6,
    customer: 'Đỗ Văn Hùng',
    phone: '0956 789 012',
    service: 'Body Scrub & Wrap',
    date: '12/07/2026',
    time: '11:00',
    branch: 'Quận 1',
    note: '',
    status: 'cancelled',
  },
  {
    id: 7,
    customer: 'Bùi Thị Ngọc',
    phone: '0967 890 123',
    service: 'Facial Organic',
    date: '17/07/2026',
    time: '09:30',
    branch: 'Hồ Tây',
    note: 'Lần đầu',
    status: 'pending',
  },
  {
    id: 8,
    customer: 'Hoàng Văn Long',
    phone: '0978 901 234',
    service: 'Massage Thảo Dược',
    date: '17/07/2026',
    time: '13:00',
    branch: 'Đà Nẵng',
    note: '',
    status: 'confirmed',
  },
];

const STATUS_COLOR: Record<BookingStatus, 'warning' | 'success' | 'error' | 'default'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'error',
  completed: 'default',
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  cancelled: 'Đã huỷ',
  completed: 'Hoàn thành',
};

const STATUS_OPTIONS: BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BookingsManageView() {
  const [items, setItems] = useState<Booking[]>(MOCK_BOOKINGS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<BookingStatus | 'all'>('all');
  const [viewItem, setViewItem] = useState<Booking | null>(null);

  const filtered = items.filter((b) => {
    const matchSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    const matchStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSetStatus = useCallback((id: number, status: BookingStatus) => {
    setItems((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    setViewItem((v) => (v?.id === id ? { ...v, status } : v));
  }, []);

  const counts = {
    all: items.length,
    pending: items.filter((b) => b.status === 'pending').length,
    confirmed: items.filter((b) => b.status === 'confirmed').length,
    completed: items.filter((b) => b.status === 'completed').length,
    cancelled: items.filter((b) => b.status === 'cancelled').length,
  };

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Quản lý Đặt lịch"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: 'Đặt lịch' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Summary chips */}
      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
          <Chip
            key={s}
            label={`${s === 'all' ? 'Tất cả' : STATUS_LABEL[s]} (${counts[s]})`}
            variant={filterStatus === s ? 'filled' : 'outlined'}
            color={s === 'all' ? 'default' : (STATUS_COLOR[s] ?? 'default')}
            onClick={() => setFilterStatus(s)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder="Tìm khách hàng, dịch vụ, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ width: 320 }}
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
                <TableCell>Ngày / Giờ</TableCell>
                <TableCell>Chi nhánh</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">{item.customer}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{item.date}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.time}
                    </Typography>
                  </TableCell>
                  <TableCell>{item.branch}</TableCell>
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
                          <Tooltip title="Xác nhận">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleSetStatus(item.id, 'confirmed')}
                            >
                              <Iconify icon="solar:check-circle-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Huỷ">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleSetStatus(item.id, 'cancelled')}
                            >
                              <Iconify icon="solar:close-circle-bold" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {item.status === 'confirmed' && (
                        <Tooltip title="Đánh dấu hoàn thành">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleSetStatus(item.id, 'completed')}
                          >
                            <Iconify icon="solar:diploma-bold" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Xem chi tiết">
                        <IconButton size="small" onClick={() => setViewItem(item)}>
                          <Iconify icon="solar:eye-bold" />
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

      {/* View detail dialog */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Chi tiết đặt lịch #{viewItem?.id}</DialogTitle>
        <DialogContent dividers>
          {viewItem && (
            <Stack spacing={1.5}>
              {[
                ['Khách hàng', viewItem.customer],
                ['Điện thoại', viewItem.phone],
                ['Dịch vụ', viewItem.service],
                ['Ngày', viewItem.date],
                ['Giờ', viewItem.time],
                ['Chi nhánh', viewItem.branch],
                ['Ghi chú', viewItem.note || '–'],
              ].map(([label, value]) => (
                <Box key={label} sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                    {label}:
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {value}
                  </Typography>
                </Box>
              ))}
              <Divider />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 100 }}>
                  Trạng thái:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewItem.status}
                  onChange={(e) => handleSetStatus(viewItem.id, e.target.value as BookingStatus)}
                  sx={{ flex: 1 }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewItem(null)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
