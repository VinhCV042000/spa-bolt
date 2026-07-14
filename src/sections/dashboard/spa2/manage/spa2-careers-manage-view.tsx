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

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { spa2Careers } from 'src/sections/spa2/spa2-pages-data';

// ─────────────────────────────────────────────────────────────────────────────

type Career = (typeof spa2Careers)[number] & { status: 'open' | 'closed'; applications?: number };

const JOB_TYPES = ['Toàn thời gian', 'Bán thời gian', 'Linh hoạt', 'Remote'];

const EMPTY_FORM = {
  title: '',
  location: '',
  type: 'Toàn thời gian',
  salary: '',
  benefits: '',
};

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2CareersManageView() {
  const { t } = useTranslate('spa2-manage');
  const [items, setItems] = useState<Career[]>(
    spa2Careers.map((c) => ({
      ...c,
      status: 'open' as const,
      applications: Math.floor(Math.random() * 20),
    }))
  );
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = items.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Career) => {
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
      setItems((p) => [...p, { ...next, id: newId, status: 'open', applications: 0 }]);
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
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={t('careers.page_title')}
        links={[
          { name: t('common.dashboard'), href: paths.dashboard.root },
          { name: t('common.spa2'), href: paths.dashboard.spa2.root },
          { name: t('nav.careers') },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            {t('careers.add_btn')}
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder={t('careers.search_placeholder')}
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
                <TableCell>{t('careers.col_position')}</TableCell>
                <TableCell>{t('careers.col_location')}</TableCell>
                <TableCell>{t('careers.col_type')}</TableCell>
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
                    <Box>
                      <Typography variant="subtitle2">{item.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.benefits.slice(0, 2).join(' · ')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Chip size="small" label={item.type} />
                  </TableCell>
                  <TableCell>{item.salary}</TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      {item.applications ?? 0}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={item.status === 'open' ? t('careers.status_open') : t('careers.status_closed')}
                      color={item.status === 'open' ? 'success' : 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title={item.status === 'open' ? t('common.disable') : t('common.enable')}>
                        <IconButton size="small" onClick={() => handleToggleStatus(item.id)}>
                          <Iconify
                            icon={
                              item.status === 'open'
                                ? 'solar:lock-bold'
                                : 'solar:lock-unlocked-bold'
                            }
                            color={item.status === 'open' ? 'warning.main' : 'success.main'}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('common.edit')}>
                        <IconButton size="small" onClick={() => openEdit(item)}>
                          <Iconify icon="solar:pen-bold" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('common.delete')}>
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
        <DialogTitle>
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
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title}>
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
    </DashboardContent>
  );
}
