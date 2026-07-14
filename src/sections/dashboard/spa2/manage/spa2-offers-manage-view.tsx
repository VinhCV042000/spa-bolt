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

import { useTranslate } from 'src/locales';
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
  const { t } = useTranslate('spa2-manage');
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
        heading={t('offers.page_title')}
        links={[
          { name: t('common.dashboard'), href: paths.dashboard.root },
          { name: t('common.spa2'), href: paths.dashboard.spa2.root },
          { name: t('nav.offers') },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={openCreate}
          >
            {t('offers.add_btn')}
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Box sx={{ p: 2 }}>
          <TextField
            placeholder={t('offers.search_placeholder')}
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
                <TableCell>{t('offers.col_offer')}</TableCell>
                <TableCell>{t('offers.col_code')}</TableCell>
                <TableCell>{t('offers.col_discount')}</TableCell>
                <TableCell>{t('offers.col_expires')}</TableCell>
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
                      <Tooltip title={copied === item.code ? t('common.copied') : t('common.copy')}>
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
                      label={item.active ? t('offers.status_active') : t('offers.status_inactive')}
                      color={item.active ? 'success' : 'default'}
                      variant="soft"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
                      <Tooltip title={item.active ? t('common.disable') : t('common.enable')}>
                        <IconButton size="small" onClick={() => handleToggle(item.id)}>
                          <Iconify
                            icon={item.active ? 'solar:eye-closed-bold' : 'solar:eye-bold'}
                            color={item.active ? 'warning.main' : 'success.main'}
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
        <DialogTitle>{editId !== null ? t('offers.form_edit') : t('offers.form_create')}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label={t('offers.form_title')}
              value={form.title}
              onChange={handleChange('title')}
              fullWidth
            />
            <TextField
              label={t('offers.form_desc')}
              value={form.desc}
              onChange={handleChange('desc')}
              fullWidth
              multiline
              rows={2}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('offers.form_code')}
                value={form.code}
                onChange={handleChange('code')}
                fullWidth
                inputProps={{ style: { textTransform: 'uppercase' } }}
              />
              <TextField
                label={t('offers.form_discount')}
                value={form.discount}
                onChange={handleChange('discount')}
                fullWidth
              />
            </Stack>
            <TextField
              label={t('offers.form_expires')}
              value={form.expires}
              onChange={handleChange('expires')}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={!form.title}>
            {editId !== null ? t('offers.form_edit') : t('offers.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('offers.delete_title')}
        content={t('offers.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </DashboardContent>
  );
}
