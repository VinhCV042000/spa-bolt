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

import { useTranslate } from 'src/locales';
import {
  SPA2_CAREERS,
  SPA2_JOIN_REASONS,
  SPA2_CAREER_SLOGAN,
  type Spa2CareerItem,
  SPA2_WORKPLACE_GALLERY,
  SPA2_RECRUITMENT_PROCESS,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────

const JOB_TYPES = ['Toàn thời gian', 'Bán thời gian', 'Linh hoạt', 'Remote'];

const EMPTY_FORM = {
  title: '',
  location: '',
  type: 'Toàn thời gian',
  salary: '',
  benefits: '',
};

type StatusFilter = 'all' | 'open' | 'closed';

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2CareersManageView() {
  const { t } = useTranslate('spa2-manage');
  const [items, setItems] = useState<Spa2CareerItem[]>(SPA2_CAREERS);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<StatusFilter>('all');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(
    () =>
      items.filter((c) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
        const matchStatus = statusTab === 'all' || c.status === statusTab;
        return matchSearch && matchStatus;
      }),
    [items, search, statusTab]
  );

  const counts = {
    all: items.length,
    open: items.filter((c) => c.status === 'open').length,
    closed: items.filter((c) => c.status === 'closed').length,
    applications: items.reduce((sum, c) => sum + (c.applications ?? 0), 0),
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Spa2CareerItem) => {
    setForm({
      title: item.title,
      location: item.location,
      type: item.type,
      salary: item.salary,
      benefits: item.benefits.join(', '),
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    const next = {
      title: form.title,
      location: form.location,
      type: form.type,
      salary: form.salary,
      benefits: form.benefits
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean),
    };
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...next } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [
        {
          ...next,
          id: newId,
          status: 'open',
          applications: 0,
          postedAt: new Date().toISOString().slice(0, 10),
        },
        ...p,
      ]);
    }
    setOpenForm(false);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
  }, [deleteId]);

  const handleToggleStatus = useCallback((id: number) => {
    setItems((p) =>
      p.map((x) => (x.id === id ? { ...x, status: x.status === 'open' ? 'closed' : 'open' } : x))
    );
  }, []);

  return (
    <Spa2ManageShell
      title={t('careers.page_title')}
      description={SPA2_CAREER_SLOGAN}
      breadcrumbLabel={t('nav.careers')}
      publicPath={paths.spa2.careers}
      actions={
        <Button
          onClick={openCreate}
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{
            borderRadius: 50,
            px: 2.5,
            bgcolor: 'common.white',
            color: SPA2_TEAL_DARK,
            fontWeight: 700,
            '&:hover': { bgcolor: SPA2_CREAM },
          }}
        >
          {t('careers.add_btn')}
        </Button>
      }
    >
      {/* KPI cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Tổng vị trí', value: counts.all, icon: 'solar:case-bold-duotone' },
          { label: 'Đang tuyển', value: counts.open, icon: 'solar:play-circle-bold-duotone' },
          { label: 'Đã đóng', value: counts.closed, icon: 'solar:pause-circle-bold-duotone' },
          {
            label: 'Hồ sơ ứng tuyển',
            value: counts.applications,
            icon: 'solar:users-group-rounded-bold-duotone',
          },
        ].map((k) => (
          <Grid key={k.label} xs={6} md={3}>
            <Card
              sx={{
                p: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                border: `1px solid ${SPA2_TEAL_LIGHT}33`,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: `${SPA2_TEAL}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon={k.icon} width={26} sx={{ color: SPA2_TEAL_DARK }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
                  {k.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {k.label}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Main: careers table */}
        <Grid xs={12} md={8}>
          <Card>
            <Box sx={{ p: 2, borderBottom: `1px solid ${SPA2_TEAL_LIGHT}22` }}>
              <Tabs
                value={statusTab}
                onChange={(_, v) => setStatusTab(v)}
                sx={{
                  '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                  '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
                }}
              >
                <Tab
                  value="all"
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{t('common.all')}</span>
                      <Chip size="small" label={counts.all} />
                    </Stack>
                  }
                />
                <Tab
                  value="open"
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{t('careers.status_open')}</span>
                      <Chip size="small" color="success" label={counts.open} />
                    </Stack>
                  }
                />
                <Tab
                  value="closed"
                  label={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>{t('careers.status_closed')}</span>
                      <Chip size="small" label={counts.closed} />
                    </Stack>
                  }
                />
              </Tabs>
            </Box>

            <Box sx={{ p: 2 }}>
              <TextField
                placeholder={t('careers.search_placeholder')}
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
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('careers.col_position')}</TableCell>
                    <TableCell>{t('careers.col_location')}</TableCell>
                    <TableCell>{t('careers.col_salary')}</TableCell>
                    <TableCell align="center">{t('careers.col_applications')}</TableCell>
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
                            {item.title}
                          </Typography>
                          <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} flexWrap="wrap">
                            <Chip
                              size="small"
                              label={item.type}
                              sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                            />
                            {item.benefits.slice(0, 2).map((b) => (
                              <Chip
                                key={b}
                                size="small"
                                variant="outlined"
                                label={b}
                                sx={{ borderColor: `${SPA2_TEAL}55`, color: 'text.secondary' }}
                              />
                            ))}
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Iconify
                            icon="solar:map-point-bold"
                            width={14}
                            sx={{ color: SPA2_TEAL }}
                          />
                          <Typography variant="body2">{item.location}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: SPA2_TEAL_DARK, fontWeight: 600 }}>
                          {item.salary}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          size="small"
                          label={item.applications ?? 0}
                          sx={{ bgcolor: `${SPA2_TEAL}15`, color: SPA2_TEAL_DARK, fontWeight: 700 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            item.status === 'open'
                              ? t('careers.status_open')
                              : t('careers.status_closed')
                          }
                          color={item.status === 'open' ? 'success' : 'default'}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                          <Tooltip
                            title={
                              item.status === 'open' ? t('common.disable') : t('common.enable')
                            }
                          >
                            <IconButton size="small" onClick={() => handleToggleStatus(item.id)}>
                              <Iconify
                                icon={
                                  item.status === 'open'
                                    ? 'solar:lock-bold'
                                    : 'solar:lock-unlocked-bold'
                                }
                                sx={{
                                  color: item.status === 'open' ? 'warning.main' : 'success.main',
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.edit')}>
                            <IconButton size="small" onClick={() => openEdit(item)}>
                              <Iconify icon="solar:pen-bold" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('common.delete')}>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => setDeleteId(item.id)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.disabled' }}>
                        Không có vị trí nào phù hợp.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Side: brand storytelling (mirrors public careers page) */}
        <Grid xs={12} md={4}>
          <Stack spacing={2}>
            <Card sx={{ p: 3, border: `1px solid ${SPA2_TEAL_LIGHT}33` }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: 1.5, color: SPA2_TEAL, fontWeight: 700 }}
              >
                Vì sao chọn chúng tôi
              </Typography>
              <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, mb: 2 }}>
                Lý do gia nhập Nature Spa
              </Typography>
              <Stack spacing={1.5}>
                {SPA2_JOIN_REASONS.map((r) => (
                  <Stack key={r.text} direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon={r.icon} width={22} sx={{ color: SPA2_TEAL }} />
                    <Typography variant="body2" sx={{ color: SPA2_TEAL_DARK, fontWeight: 500 }}>
                      {r.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>

            <Card sx={{ p: 3, border: `1px solid ${SPA2_TEAL_LIGHT}33` }}>
              <Typography
                variant="overline"
                sx={{ letterSpacing: 1.5, color: SPA2_TEAL, fontWeight: 700 }}
              >
                Quy trình
              </Typography>
              <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, mb: 2 }}>
                Quy trình tuyển dụng
              </Typography>
              <Stack spacing={1.5}>
                {SPA2_RECRUITMENT_PROCESS.map((p, i) => (
                  <Stack key={p.step} direction="row" spacing={1.5} alignItems="flex-start">
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ color: SPA2_TEAL_DARK, fontWeight: 600 }}>
                        {p.step}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {p.desc}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="overline"
                sx={{ letterSpacing: 1.5, color: SPA2_TEAL, fontWeight: 700 }}
              >
                Môi trường làm việc
              </Typography>
              <Grid container spacing={1} sx={{ mt: 0.5 }}>
                {SPA2_WORKPLACE_GALLERY.slice(0, 4).map((src) => (
                  <Grid key={src} xs={6}>
                    <Box
                      sx={{
                        aspectRatio: '4/3',
                        borderRadius: 1.5,
                        backgroundImage: `url(${src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Edit / create dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {editId !== null ? t('careers.form_edit') : t('careers.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('careers.form_title')}
              value={form.title}
              onChange={handleChange('title')}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('careers.form_location')}
                value={form.location}
                onChange={handleChange('location')}
                fullWidth
              />
              <TextField
                select
                label={t('careers.form_type')}
                value={form.type}
                onChange={handleChange('type')}
                fullWidth
              >
                {JOB_TYPES.map((jobType) => (
                  <MenuItem key={jobType} value={jobType}>
                    {jobType}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              label={t('careers.form_salary')}
              value={form.salary}
              onChange={handleChange('salary')}
              fullWidth
            />
            <TextField
              label={t('careers.form_benefits')}
              value={form.benefits}
              onChange={handleChange('benefits')}
              fullWidth
              multiline
              rows={2}
              helperText="Ngăn cách bằng dấu phẩy"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('careers.form_edit') : t('careers.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('careers.delete_title')}
        content={t('careers.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
