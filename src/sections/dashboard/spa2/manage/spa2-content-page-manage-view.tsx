import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

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
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';
import {
  SPA2_CONTENT_PAGES,
  spa2ContentPublicPath,
  type Spa2ContentFaq,
  type Spa2ContentStatus,
  type Spa2ContentPackage,
  type Spa2ContentService,
  type Spa2ContentPageKey,
  type Spa2ContentPageData,
} from 'src/_mock/_spa2/content-pages';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Shared CRUD view for the 8 spa2 "content pages". Mirrors the /manage/services
// experience (banner editor + status-tabbed list + add/edit dialog + delete
// confirm + toggle publish) but generalised over services / packages / faqs.
// ─────────────────────────────────────────────────────────────────────────────

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const STATUS_LABEL: Record<Spa2ContentStatus, string> = {
  published: 'Đang hiển thị',
  draft: 'Bản nháp',
  hidden: 'Ẩn',
};

const STATUS_COLOR: Record<Spa2ContentStatus, 'success' | 'default' | 'warning'> = {
  published: 'success',
  draft: 'default',
  hidden: 'warning',
};

const STATUS_OPTIONS: Spa2ContentStatus[] = ['published', 'draft', 'hidden'];

type ListKind = 'services' | 'packages' | 'faqs';

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon={icon} width={22} sx={{ color: SPA2_TEAL }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Stack>
        {action}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Card>
  );
}

function KpiCard({ label, value, color }: { label: string; value: number | string; color?: string }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
      }}
    >
      <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1.5 }}>
        {label}
      </Typography>
      <Typography variant="h4" sx={{ color: color || SPA2_INK, mt: 0.5 }}>
        {value}
      </Typography>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Spa2ContentPageManageView({ pageKey }: { pageKey: Spa2ContentPageKey }) {
  const seed = SPA2_CONTENT_PAGES[pageKey];

  const [data, setData] = useState<Spa2ContentPageData>(() => JSON.parse(JSON.stringify(seed)));
  const [tab, setTab] = useState<'banner' | ListKind | 'preview'>('services');
  const [dirty, setDirty] = useState(false);
  const markDirty = () => setDirty(true);

  // ---- banner ----
  const updateBanner = (patch: Partial<Spa2ContentPageData['banner']>) => {
    setData((p) => ({ ...p, banner: { ...p.banner, ...patch } }));
    markDirty();
  };

  // ---- list state ----
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Spa2ContentStatus>('all');
  const [editing, setEditing] = useState<{ kind: ListKind; item: any } | null>(null);
  const [deleting, setDeleting] = useState<{ kind: ListKind; id: string } | null>(null);

  const listByKind = (kind: ListKind): any[] =>
    kind === 'services' ? data.services : kind === 'packages' ? data.packages : data.faqs;

  const activeList = tab === 'services' || tab === 'packages' || tab === 'faqs' ? tab : null;

  const filteredList = useMemo(() => {
    if (!activeList) return [];
    const arr = listByKind(activeList);
    const q = search.toLowerCase();
    return arr.filter((item: any) => {
      const text = activeList === 'faqs' ? `${item.q} ${item.a}` : `${item.name} ${item.desc}`;
      const matchSearch = !q || text.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeList, data, search, statusFilter]);

  const setList = (kind: ListKind, next: any[]) => {
    setData((p) => ({ ...p, [kind]: next }) as Spa2ContentPageData);
    markDirty();
  };

  const toggleStatus = (kind: ListKind, id: string) => {
    const next = listByKind(kind).map((it: any) =>
      it.id === id ? { ...it, status: it.status === 'published' ? 'hidden' : 'published' } : it
    );
    setList(kind, next);
  };

  const approve = (kind: ListKind, id: string) => {
    const next = listByKind(kind).map((it: any) =>
      it.id === id ? { ...it, status: 'published' } : it
    );
    setList(kind, next);
  };

  const removeItem = () => {
    if (!deleting) return;
    setList(
      deleting.kind,
      listByKind(deleting.kind).filter((it: any) => it.id !== deleting.id)
    );
    setDeleting(null);
  };

  const openCreate = (kind: ListKind) => {
    const blank =
      kind === 'services'
        ? { id: uid(), name: '', desc: '', price: 0, duration: '', icon: 'solar:hand-stars-bold-duotone', tags: [], status: 'draft' as Spa2ContentStatus }
        : kind === 'packages'
        ? { id: uid(), name: '', desc: '', price: 0, sessions: '', hot: false, status: 'draft' as Spa2ContentStatus }
        : { id: uid(), q: '', a: '', status: 'draft' as Spa2ContentStatus };
    setEditing({ kind, item: blank });
  };

  const saveEdit = () => {
    if (!editing) return;
    const list = listByKind(editing.kind);
    const exists = list.some((it: any) => it.id === editing.item.id);
    const next = exists
      ? list.map((it: any) => (it.id === editing.item.id ? editing.item : it))
      : [...list, editing.item];
    setList(editing.kind, next);
    setEditing(null);
  };

  const kpi = {
    services: data.services.length,
    packages: data.packages.length,
    faqs: data.faqs.length,
    published:
      data.services.filter((s) => s.status === 'published').length +
      data.packages.filter((p) => p.status === 'published').length +
      data.faqs.filter((f) => f.status === 'published').length,
  };

  const handleReset = () => {
    setData(JSON.parse(JSON.stringify(seed)));
    setDirty(false);
  };
  const handleSave = () => setDirty(false);

  return (
    <Spa2ManageShell
      title={`Quản lý ${data.title}`}
      description={data.banner.subtitle}
      breadcrumbLabel={data.title}
      publicPath={spa2ContentPublicPath(pageKey)}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={!dirty}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            Huỷ thay đổi
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{
              borderRadius: 50,
              px: 3,
              bgcolor: 'common.white',
              color: SPA2_TEAL,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
            }}
          >
            Lưu thay đổi
          </Button>
        </>
      }
    >
      {/* KPI row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={6} md={3}><KpiCard label="Dịch vụ" value={kpi.services} color={SPA2_TEAL_DARK} /></Grid>
        <Grid xs={6} md={3}><KpiCard label="Gói combo" value={kpi.packages} color={SPA2_TEAL_DARK} /></Grid>
        <Grid xs={6} md={3}><KpiCard label="FAQ" value={kpi.faqs} color={SPA2_TEAL_DARK} /></Grid>
        <Grid xs={6} md={3}><KpiCard label="Đang hiển thị" value={kpi.published} color="green" /></Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ px: 2, borderBottom: `1px solid ${SPA2_CREAM_DARK}` }}
        >
          <Tab value="banner" label="Banner" icon={<Iconify icon="solar:gallery-wide-bold" />} iconPosition="start" />
          <Tab value="services" label={`Dịch vụ (${data.services.length})`} icon={<Iconify icon="solar:hand-stars-bold" />} iconPosition="start" />
          <Tab value="packages" label={`Gói combo (${data.packages.length})`} icon={<Iconify icon="solar:box-bold" />} iconPosition="start" />
          <Tab value="faqs" label={`FAQ (${data.faqs.length})`} icon={<Iconify icon="solar:question-circle-bold" />} iconPosition="start" />
          <Tab value="preview" label="Xem trước" icon={<Iconify icon="solar:eye-bold" />} iconPosition="start" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tab === 'banner' && (
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <SectionCard title="Nội dung banner" icon="solar:pen-bold">
                  <Stack spacing={2}>
                    <TextField
                      label="Eyebrow"
                      value={data.banner.eyebrow}
                      onChange={(e) => updateBanner({ eyebrow: e.target.value })}
                    />
                    <TextField
                      label="Tiêu đề"
                      value={data.banner.title}
                      onChange={(e) => updateBanner({ title: e.target.value })}
                    />
                    <TextField
                      label="Mô tả"
                      multiline
                      minRows={3}
                      value={data.banner.subtitle}
                      onChange={(e) => updateBanner({ subtitle: e.target.value })}
                    />
                    <TextField
                      label="Ảnh nền (URL)"
                      value={data.banner.image}
                      onChange={(e) => updateBanner({ image: e.target.value })}
                    />
                  </Stack>
                </SectionCard>
              </Grid>
              <Grid xs={12} md={6}>
                <SectionCard title="Xem trước banner" icon="solar:eye-bold">
                  <Box
                    sx={{
                      position: 'relative',
                      height: 300,
                      borderRadius: 3,
                      overflow: 'hidden',
                      backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15)), url(${data.banner.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      color: 'common.white',
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography variant="overline" sx={{ letterSpacing: 3, color: 'rgba(255,255,255,0.85)' }}>
                      {data.banner.eyebrow}
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 0.5 }}>
                      {data.banner.title}
                    </Typography>
                    <Typography sx={{ opacity: 0.85, mt: 1, maxWidth: 480 }}>
                      {data.banner.subtitle}
                    </Typography>
                  </Box>
                </SectionCard>
              </Grid>
            </Grid>
          )}

          {activeList && (
            <>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                alignItems={{ md: 'center' }}
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Tabs
                  value={statusFilter}
                  onChange={(_, v) => setStatusFilter(v)}
                  sx={{ minHeight: 36 }}
                >
                  <Tab value="all" label={`Tất cả (${listByKind(activeList).length})`} />
                  {STATUS_OPTIONS.map((s) => (
                    <Tab
                      key={s}
                      value={s}
                      label={`${STATUS_LABEL[s]} (${listByKind(activeList).filter((it: any) => it.status === s).length})`}
                    />
                  ))}
                </Tabs>
                <Stack direction="row" spacing={1.5}>
                  <TextField
                    size="small"
                    placeholder="Tìm kiếm…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon="eva:search-fill" width={18} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={() => openCreate(activeList)}
                    sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
                  >
                    Thêm mới
                  </Button>
                </Stack>
              </Stack>

              <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        {activeList === 'faqs' ? (
                          <>
                            <TableCell>Câu hỏi</TableCell>
                            <TableCell>Trả lời</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Thao tác</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>Tên</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>{activeList === 'packages' ? 'Buổi' : 'Thời lượng'}</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="right">Thao tác</TableCell>
                          </>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredList.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                            Không có mục nào
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredList.map((it: any) => (
                        <TableRow key={it.id} hover>
                          {activeList === 'faqs' ? (
                            <>
                              <TableCell sx={{ fontWeight: 600, maxWidth: 260 }}>{it.q}</TableCell>
                              <TableCell sx={{ color: 'text.secondary', maxWidth: 380 }}>
                                <Typography variant="body2" noWrap>{it.a}</Typography>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                  <Iconify icon={it.icon || 'solar:box-bold'} width={22} sx={{ color: SPA2_TEAL }} />
                                  <Box>
                                    <Typography sx={{ fontWeight: 600 }}>{it.name}</Typography>
                                    {activeList === 'services' && it.tags?.length ? (
                                      <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                                        {it.tags.slice(0, 3).map((t: string) => (
                                          <Chip key={t} label={t} size="small" sx={{ bgcolor: SPA2_CREAM, fontSize: 11 }} />
                                        ))}
                                      </Stack>
                                    ) : null}
                                    {activeList === 'packages' && it.hot ? (
                                      <Chip label="HOT" size="small" color="error" sx={{ mt: 0.5, fontSize: 11 }} />
                                    ) : null}
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell sx={{ color: 'text.secondary', maxWidth: 320 }}>
                                <Typography variant="body2" noWrap>{it.desc}</Typography>
                              </TableCell>
                              <TableCell>{activeList === 'packages' ? it.sessions : it.duration}</TableCell>
                              <TableCell sx={{ fontWeight: 600, color: SPA2_TEAL_DARK }}>
                                {it.price ? formatVND(it.price) : 'Miễn phí'}
                              </TableCell>
                            </>
                          )}
                          <TableCell>
                            <Chip
                              size="small"
                              color={STATUS_COLOR[it.status as Spa2ContentStatus]}
                              label={STATUS_LABEL[it.status as Spa2ContentStatus]}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                              {it.status !== 'published' && (
                                <Tooltip title="Duyệt & hiển thị">
                                  <IconButton size="small" color="success" onClick={() => approve(activeList, it.id)}>
                                    <Iconify icon="solar:check-circle-bold" />
                                  </IconButton>
                                </Tooltip>
                              )}
                              <Tooltip title={it.status === 'published' ? 'Ẩn' : 'Hiện'}>
                                <IconButton size="small" onClick={() => toggleStatus(activeList, it.id)}>
                                  <Iconify icon={it.status === 'published' ? 'solar:eye-closed-bold' : 'solar:eye-bold'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Sửa">
                                <IconButton size="small" onClick={() => setEditing({ kind: activeList, item: { ...it } })}>
                                  <Iconify icon="solar:pen-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xoá">
                                <IconButton size="small" color="error" onClick={() => setDeleting({ kind: activeList, id: it.id })}>
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
              </Scrollbar>
            </>
          )}

          {tab === 'preview' && <PreviewBlock data={data} />}
        </Box>
      </Card>

      {/* Edit dialog */}
      <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editing?.kind === 'faqs' ? 'Câu hỏi thường gặp' : editing?.kind === 'packages' ? 'Gói combo' : 'Dịch vụ'}
        </DialogTitle>
        <DialogContent dividers>
          {editing && (
            <Stack spacing={2} sx={{ pt: 1 }}>
              {editing.kind === 'faqs' ? (
                <>
                  <TextField label="Câu hỏi" value={editing.item.q} onChange={(e) => setEditing({ ...editing, item: { ...editing.item, q: e.target.value } })} />
                  <TextField label="Trả lời" multiline minRows={4} value={editing.item.a} onChange={(e) => setEditing({ ...editing, item: { ...editing.item, a: e.target.value } })} />
                </>
              ) : (
                <>
                  <TextField label="Tên" value={editing.item.name} onChange={(e) => setEditing({ ...editing, item: { ...editing.item, name: e.target.value } })} />
                  <TextField label="Mô tả" multiline minRows={3} value={editing.item.desc} onChange={(e) => setEditing({ ...editing, item: { ...editing.item, desc: e.target.value } })} />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Giá (VND)"
                      type="number"
                      value={editing.item.price}
                      onChange={(e) => setEditing({ ...editing, item: { ...editing.item, price: Number(e.target.value) } })}
                      fullWidth
                    />
                    <TextField
                      label={editing.kind === 'packages' ? 'Số buổi' : 'Thời lượng'}
                      value={editing.kind === 'packages' ? editing.item.sessions : editing.item.duration}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          item:
                            editing.kind === 'packages'
                              ? { ...editing.item, sessions: e.target.value }
                              : { ...editing.item, duration: e.target.value },
                        })
                      }
                      fullWidth
                    />
                  </Stack>
                  {editing.kind === 'services' && (
                    <>
                      <TextField label="Icon (iconify)" value={editing.item.icon} onChange={(e) => setEditing({ ...editing, item: { ...editing.item, icon: e.target.value } })} />
                      <TextField
                        label="Tags (phẩy)"
                        value={(editing.item.tags || []).join(', ')}
                        onChange={(e) => setEditing({ ...editing, item: { ...editing.item, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) } })}
                      />
                    </>
                  )}
                </>
              )}
              <TextField
                select
                label="Trạng thái"
                value={editing.item.status}
                onChange={(e) => setEditing({ ...editing, item: { ...editing.item, status: e.target.value } })}
                SelectProps={{ native: true }}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                ))}
              </TextField>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Huỷ</Button>
          <Button variant="contained" onClick={saveEdit} sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Xoá mục"
        content="Bạn có chắc chắn muốn xoá mục này? Hành động không thể hoàn tác."
        action={
          <Button variant="contained" color="error" onClick={removeItem}>
            Xoá
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function PreviewBlock({ data }: { data: Spa2ContentPageData }) {
  const published = <S extends { status: Spa2ContentStatus }>(arr: S[]) =>
    arr.filter((x) => x.status === 'published');

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          minHeight: 260,
          p: 4,
          color: 'common.white',
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15)), url(${data.banner.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.9 }}>{data.banner.eyebrow}</Typography>
        <Typography variant="h3" sx={{ mt: 1, fontWeight: 600, maxWidth: 620 }}>{data.banner.title}</Typography>
        <Typography sx={{ mt: 1.5, opacity: 0.9, maxWidth: 560 }}>{data.banner.subtitle}</Typography>
        <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
          {data.stats.slice(0, 4).map((s) => (
            <Box key={s.l}>
              <Typography variant="h5">{s.n}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>{s.l}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {published(data.services).length > 0 && (
        <SectionCard title="Dịch vụ hiển thị" icon="solar:hand-stars-bold">
          <Grid container spacing={2}>
            {published(data.services).map((s: Spa2ContentService) => (
              <Grid xs={12} sm={6} md={4} key={s.id}>
                <Card sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, height: '100%' }}>
                  <Iconify icon={s.icon} width={28} sx={{ color: SPA2_TEAL, mb: 1 }} />
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{s.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{s.desc}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Chip size="small" label={s.duration} sx={{ bgcolor: SPA2_CREAM }} />
                    <Chip size="small" label={s.price ? formatVND(s.price) : 'Miễn phí'} sx={{ bgcolor: SPA2_TEAL, color: 'white' }} />
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      )}

      {published(data.packages).length > 0 && (
        <SectionCard title="Gói combo hiển thị" icon="solar:box-bold">
          <Grid container spacing={2}>
            {published(data.packages).map((p: Spa2ContentPackage) => (
              <Grid xs={12} sm={6} md={4} key={p.id}>
                <Card sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, height: '100%', position: 'relative' }}>
                  {p.hot && <Chip label="HOT" size="small" color="error" sx={{ position: 'absolute', top: 12, right: 12 }} />}
                  <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{p.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{p.desc}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Chip size="small" label={p.sessions} sx={{ bgcolor: SPA2_CREAM }} />
                    <Chip size="small" label={p.price ? formatVND(p.price) : 'Miễn phí'} sx={{ bgcolor: SPA2_TEAL, color: 'white' }} />
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </SectionCard>
      )}

      {published(data.faqs).length > 0 && (
        <SectionCard title="Câu hỏi thường gặp" icon="solar:question-circle-bold">
          <Stack spacing={1.5}>
            {published(data.faqs).map((f: Spa2ContentFaq) => (
              <Box key={f.id} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.q}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{f.a}</Typography>
              </Box>
            ))}
          </Stack>
        </SectionCard>
      )}
    </Stack>
  );
}
