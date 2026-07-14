import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { SPA2_TEAL } from 'src/sections/spa2/spa2-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────

export type ManageFieldType = 'text' | 'textarea' | 'number' | 'image' | 'select' | 'date';

export type ManageField = {
  key: string;
  label: string;
  type: ManageFieldType;
  options?: string[];
  required?: boolean;
  showInTable?: boolean;
};

export type ManageStatus = {
  value: string;
  color: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
};

export type Spa2ManageConfig = {
  title: string;
  breadcrumbLabel: string;
  addLabel: string;
  publicPath?: string;
  fields: ManageField[];
  seed: Record<string, any>[];
  statuses?: ManageStatus[];
  approvable?: boolean;
};

type Row = Record<string, any> & { id: number; status?: string };

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2GenericManageView({ config }: { config: Spa2ManageConfig }) {
  const seeded = useMemo<Row[]>(
    () => config.seed.map((row, i) => ({ id: i + 1, status: config.statuses?.[0]?.value, ...row })),
    [config]
  );

  const [items, setItems] = useState<Row[]>(seeded);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [viewRow, setViewRow] = useState<Row | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<{ el: HTMLElement; row: Row } | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const tableFields = config.fields.filter((f) => f.showInTable !== false).slice(0, 4);

  const filtered = items.filter((row) => {
    const q = search.trim().toLowerCase();
    const matchQ =
      !q || Object.values(row).some((v) => typeof v === 'string' && v.toLowerCase().includes(q));
    const matchS = statusFilter === 'all' || row.status === statusFilter;
    return matchQ && matchS;
  });

  const emptyForm = useMemo(() => {
    const f: Record<string, any> = {};
    config.fields.forEach((x) => {
      f[x.key] = '';
    });
    if (config.statuses?.length) f.status = config.statuses[0].value;
    return f;
  }, [config]);

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (row: Row) => {
    const f: Record<string, any> = { ...emptyForm };
    config.fields.forEach((x) => {
      f[x.key] = row[x.key] ?? '';
    });
    f.status = row.status ?? emptyForm.status;
    setForm(f);
    setEditId(row.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((prev) => prev.map((r) => (r.id === editId ? { ...r, ...form } : r)));
    } else {
      const newId = Math.max(0, ...items.map((r) => r.id)) + 1;
      setItems((prev) => [...prev, { id: newId, ...form }]);
    }
    setOpenForm(false);
  }, [editId, form, items]);

  const handleDelete = useCallback(() => {
    setItems((prev) => prev.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const handleApprove = (row: Row, value: string) => {
    setItems((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: value } : r)));
    setMenuAnchor(null);
  };

  const statusChip = (value?: string) => {
    if (!value || !config.statuses) return null;
    const s = config.statuses.find((x) => x.value === value);
    return <Chip size="small" label={value} color={s?.color ?? 'default'} variant="soft" />;
  };

  const renderCell = (field: ManageField, row: Row) => {
    const v = row[field.key];
    if (field.type === 'image' && v) {
      return <Avatar variant="rounded" src={v} sx={{ width: 44, height: 44 }} />;
    }
    if (field.type === 'textarea') {
      return (
        <Typography variant="body2" noWrap sx={{ maxWidth: 260 }}>
          {v}
        </Typography>
      );
    }
    return <Typography variant="body2">{String(v ?? '')}</Typography>;
  };

  return (
    <Spa2ManageShell
      title={config.title}
      breadcrumbLabel={config.breadcrumbLabel}
      publicPath={config.publicPath}
      description={`Quản lý dữ liệu · đồng bộ với trang public ${config.publicPath ?? ''}`}
      actions={
        <Button
          onClick={openCreate}
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            borderRadius: 50,
            px: 3,
            bgcolor: 'common.white',
            color: SPA2_TEAL,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          }}
        >
          {config.addLabel}
        </Button>
      }
    >
      <Card sx={{ borderRadius: 3 }}>
        <Stack direction="row" spacing={2} sx={{ p: 2 }} alignItems="center">
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
          {config.statuses && (
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                label="Trạng thái"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                {config.statuses.map((s) => (
                  <MenuItem key={s.value} value={s.value}>
                    {s.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Box sx={{ flex: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {filtered.length} / {items.length}
          </Typography>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableFields.map((f) => (
                  <TableCell key={f.key}>{f.label}</TableCell>
                ))}
                {config.statuses && <TableCell>Trạng thái</TableCell>}
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.id} hover>
                  {tableFields.map((f) => (
                    <TableCell key={f.key}>{renderCell(f, row)}</TableCell>
                  ))}
                  {config.statuses && <TableCell>{statusChip(row.status)}</TableCell>}
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title="Xem">
                        <IconButton size="small" onClick={() => setViewRow(row)}>
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>
                      </Tooltip>
                      {config.approvable && config.statuses && (
                        <Tooltip title="Duyệt">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={(e) => setMenuAnchor({ el: e.currentTarget, row })}
                          >
                            <Iconify icon="solar:check-circle-bold" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Sửa">
                        <IconButton size="small" onClick={() => openEdit(row)}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xoá">
                        <IconButton size="small" color="error" onClick={() => setDeleteId(row.id)}>
                          <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={tableFields.length + 2} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Không có dữ liệu
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Form dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId !== null ? 'Cập nhật' : config.addLabel}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {config.fields.map((f) => {
              if (f.type === 'select' && f.options) {
                return (
                  <FormControl key={f.key} fullWidth size="small">
                    <InputLabel>{f.label}</InputLabel>
                    <Select
                      label={f.label}
                      value={form[f.key] ?? ''}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    >
                      {f.options.map((o) => (
                        <MenuItem key={o} value={o}>
                          {o}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }
              return (
                <TextField
                  key={f.key}
                  label={f.label}
                  value={form[f.key] ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  fullWidth
                  multiline={f.type === 'textarea'}
                  rows={f.type === 'textarea' ? 3 : undefined}
                  type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                  InputLabelProps={f.type === 'date' ? { shrink: true } : undefined}
                />
              );
            })}
            {config.statuses && (
              <FormControl fullWidth size="small">
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  label="Trạng thái"
                  value={form.status ?? config.statuses[0].value}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                >
                  {config.statuses.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Huỷ</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editId !== null ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View dialog */}
      <Dialog open={!!viewRow} onClose={() => setViewRow(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Chi tiết</DialogTitle>
        <DialogContent dividers>
          {viewRow && (
            <Stack spacing={1.5}>
              {config.fields.map((f) => (
                <Box key={f.key}>
                  <Typography variant="caption" color="text.secondary">
                    {f.label}
                  </Typography>
                  {f.type === 'image' && viewRow[f.key] ? (
                    <Box
                      component="img"
                      src={viewRow[f.key]}
                      alt=""
                      sx={{
                        width: '100%',
                        maxHeight: 240,
                        objectFit: 'cover',
                        borderRadius: 1,
                        mt: 0.5,
                      }}
                    />
                  ) : (
                    <Typography variant="body2">{String(viewRow[f.key] ?? '')}</Typography>
                  )}
                </Box>
              ))}
              {config.statuses && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Trạng thái
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>{statusChip(viewRow.status)}</Box>
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewRow(null)}>Đóng</Button>
        </DialogActions>
      </Dialog>

      {/* Approve menu */}
      <Menu anchorEl={menuAnchor?.el} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {config.statuses?.map((s) => (
          <MenuItem
            key={s.value}
            onClick={() => menuAnchor && handleApprove(menuAnchor.row, s.value)}
          >
            <Iconify icon="solar:check-circle-bold" sx={{ mr: 1, color: `${s.color}.main` }} />
            {s.value}
          </MenuItem>
        ))}
      </Menu>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Xoá mục"
        content="Bạn có chắc chắn muốn xoá mục này không?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xoá
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
