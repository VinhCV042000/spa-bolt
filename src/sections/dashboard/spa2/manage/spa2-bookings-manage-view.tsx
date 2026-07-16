import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
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

import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import {
  SPA2_BOOKINGS,
  type Spa2BookingItem,
  SPA2_BOOKING_PACKAGES,
  SPA2_BOOKING_BRANCHES,
  type Spa2BookingStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<Spa2BookingStatus, 'warning' | 'success' | 'error' | 'default'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'error',
  completed: 'default',
};

const STATUS_LABEL: Record<Spa2BookingStatus, string> = {
  pending: 'bookings.status_pending',
  confirmed: 'bookings.status_confirmed',
  cancelled: 'bookings.status_cancelled',
  completed: 'bookings.status_completed',
};

const STATUS_OPTIONS: Spa2BookingStatus[] = ['pending', 'confirmed', 'cancelled', 'completed'];

type StatusFilter = Spa2BookingStatus | 'all';

const formatVND = (n: number) => `${fCurrency(n)} ₫`;

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2BookingsManageView() {
  const { t } = useTranslate('spa2-manage');
  const statusLabel = (s: Spa2BookingStatus) => t(STATUS_LABEL[s]);

  const [items, setItems] = useState<Spa2BookingItem[]>(SPA2_BOOKINGS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [viewItem, setViewItem] = useState<Spa2BookingItem | null>(null);

  const filtered = useMemo(
    () =>
      items.filter((b) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          b.customer.toLowerCase().includes(q) ||
          b.service.toLowerCase().includes(q) ||
          b.phone.includes(search);
        const matchStatus = filterStatus === 'all' || b.status === filterStatus;
        const matchBranch = filterBranch === 'all' || b.branch === filterBranch;
        return matchSearch && matchStatus && matchBranch;
      }),
    [items, search, filterStatus, filterBranch]
  );

  const handleSetStatus = useCallback((id: number, status: Spa2BookingStatus) => {
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

  const packageBookingCount = (slug: string) =>
    items.filter((b) => b.packageSlug === slug && b.status !== 'cancelled').length;

  return (
    <Spa2ManageShell
      title={t('bookings.page_title')}
      description="Xác nhận, theo dõi và duyệt lịch hẹn của khách – dữ liệu đồng bộ với trang đặt lịch công khai."
      breadcrumbLabel={t('nav.bookings')}
      publicPath={paths.spa2.booking}
    >
      {/* KPI */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            key: 'all',
            label: t('common.all'),
            value: counts.all,
            icon: 'solar:calendar-bold-duotone',
          },
          {
            key: 'pending',
            label: statusLabel('pending'),
            value: counts.pending,
            icon: 'solar:hourglass-bold-duotone',
          },
          {
            key: 'confirmed',
            label: statusLabel('confirmed'),
            value: counts.confirmed,
            icon: 'solar:check-circle-bold-duotone',
          },
          {
            key: 'completed',
            label: statusLabel('completed'),
            value: counts.completed,
            icon: 'solar:diploma-bold-duotone',
          },
          {
            key: 'cancelled',
            label: statusLabel('cancelled'),
            value: counts.cancelled,
            icon: 'solar:close-circle-bold-duotone',
          },
        ].map((k) => (
          <Grid key={k.key} xs={6} md={2.4}>
            <Card
              onClick={() => setFilterStatus(k.key as StatusFilter)}
              sx={{
                p: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                border: `1px solid ${SPA2_TEAL_LIGHT}33`,
                bgcolor: filterStatus === k.key ? `${SPA2_TEAL}12` : 'background.paper',
                transition: 'all .2s',
                '&:hover': { borderColor: SPA2_TEAL },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  bgcolor: `${SPA2_TEAL}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon={k.icon} width={22} sx={{ color: SPA2_TEAL_DARK }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, lineHeight: 1 }}>
                  {k.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {k.label}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Main: bookings table */}
        <Grid xs={12} md={8}>
          <Card>
            <Box sx={{ p: 2, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
              <Tabs
                value={filterStatus}
                onChange={(_, v) => setFilterStatus(v)}
                variant="scrollable"
                sx={{
                  '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                  '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
                }}
              >
                <Tab value="all" label={`${t('common.all')} (${counts.all})`} />
                <Tab value="pending" label={`${statusLabel('pending')} (${counts.pending})`} />
                <Tab
                  value="confirmed"
                  label={`${statusLabel('confirmed')} (${counts.confirmed})`}
                />
                <Tab
                  value="completed"
                  label={`${statusLabel('completed')} (${counts.completed})`}
                />
                <Tab
                  value="cancelled"
                  label={`${statusLabel('cancelled')} (${counts.cancelled})`}
                />
              </Tabs>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ p: 2 }}>
              <TextField
                placeholder={t('bookings.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                select
                size="small"
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                sx={{ minWidth: 180 }}
                label="Chi nhánh"
              >
                <MenuItem value="all">Tất cả chi nhánh</MenuItem>
                {SPA2_BOOKING_BRANCHES.map((b) => (
                  <MenuItem key={b} value={b}>
                    {b}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('bookings.col_customer')}</TableCell>
                    <TableCell>{t('bookings.col_service')}</TableCell>
                    <TableCell>{t('bookings.col_datetime')}</TableCell>
                    <TableCell>{t('bookings.col_branch')}</TableCell>
                    <TableCell>{t('common.status')}</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack>
                          <Typography variant="subtitle2" sx={{ color: SPA2_TEAL_DARK }}>
                            {item.customer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.phone}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack>
                          <Typography variant="body2">{item.service}</Typography>
                          {item.packageSlug && (
                            <Chip
                              size="small"
                              label={
                                SPA2_BOOKING_PACKAGES.find((p) => p.slug === item.packageSlug)
                                  ?.name ?? item.packageSlug
                              }
                              sx={{
                                mt: 0.5,
                                width: 'fit-content',
                                bgcolor: SPA2_CREAM,
                                color: SPA2_TEAL_DARK,
                                fontSize: 11,
                              }}
                            />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.date}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.time}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Iconify
                            icon="solar:map-point-bold"
                            width={14}
                            sx={{ color: SPA2_TEAL }}
                          />
                          <Typography variant="body2">{item.branch}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={statusLabel(item.status)}
                          color={STATUS_COLOR[item.status]}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          {item.status === 'pending' && (
                            <>
                              <Tooltip title={t('bookings.action_confirm')}>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleSetStatus(item.id, 'confirmed')}
                                >
                                  <Iconify icon="solar:check-circle-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t('bookings.action_cancel')}>
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
                            <Tooltip title={t('bookings.action_complete')}>
                              <IconButton
                                size="small"
                                sx={{ color: SPA2_TEAL_DARK }}
                                onClick={() => handleSetStatus(item.id, 'completed')}
                              >
                                <Iconify icon="solar:diploma-bold" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title={t('common.view')}>
                            <IconButton size="small" onClick={() => setViewItem(item)}>
                              <Iconify icon="solar:eye-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                        Không có lịch hẹn phù hợp.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Side: booking packages (mirrors public booking page card layout) */}
        <Grid xs={12} md={4}>
          <Card sx={{ p: 3, border: `1px solid ${SPA2_TEAL_LIGHT}33` }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 1.5, color: SPA2_TEAL, fontWeight: 700 }}
            >
              Gói liệu trình
            </Typography>
            <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, mb: 2 }}>
              Gói bán chạy trên trang đặt lịch
            </Typography>
            <Stack spacing={1.5}>
              {SPA2_BOOKING_PACKAGES.map((p) => (
                <Box
                  key={p.slug}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: p.hot ? `1.5px solid ${SPA2_TEAL}` : `1px solid ${SPA2_TEAL_LIGHT}44`,
                    bgcolor: p.hot ? `${SPA2_TEAL}08` : 'transparent',
                    position: 'relative',
                  }}
                >
                  {p.hot && (
                    <Chip
                      label="HOT"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 10,
                        height: 20,
                      }}
                    />
                  )}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
                        {p.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {p.sessions} buổi
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                        {formatVND(p.price)}
                      </Typography>
                      <Chip
                        size="small"
                        label={`${packageBookingCount(p.slug)} đặt`}
                        sx={{
                          mt: 0.5,
                          bgcolor: `${SPA2_TEAL}15`,
                          color: SPA2_TEAL_DARK,
                          fontSize: 11,
                          height: 20,
                        }}
                      />
                    </Box>
                  </Stack>
                  <Divider sx={{ my: 1.5 }} />
                  <Stack spacing={0.5}>
                    {p.perks.slice(0, 3).map((perk) => (
                      <Stack key={perk} direction="row" spacing={0.75} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          width={12}
                          sx={{ color: SPA2_TEAL }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {perk}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* View detail dialog */}
      <Dialog open={!!viewItem} onClose={() => setViewItem(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {t('bookings.detail_title', { id: viewItem?.id })}
        </DialogTitle>
        <DialogContent dividers>
          {viewItem && (
            <Stack spacing={1.5}>
              {[
                [t('bookings.detail_customer'), viewItem.customer],
                [t('bookings.detail_phone'), viewItem.phone],
                [t('bookings.detail_service'), viewItem.service],
                [t('bookings.detail_date'), viewItem.date],
                [t('bookings.detail_time'), viewItem.time],
                [t('bookings.detail_branch'), viewItem.branch],
                [t('bookings.detail_note'), viewItem.note || '–'],
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
                  {t('bookings.detail_status')}:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={viewItem.status}
                  onChange={(e) =>
                    handleSetStatus(viewItem.id, e.target.value as Spa2BookingStatus)
                  }
                  sx={{ flex: 1 }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {statusLabel(s)}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewItem(null)}>{t('common.close')}</Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
