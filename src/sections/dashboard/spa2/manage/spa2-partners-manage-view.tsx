import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
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
import { spa2PartnersBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  spa2QualityCerts,
  spa2ExtraPartners,
  spa2Collaborations,
  spa2PartnerProfiles,
  spa2PartnerCategories,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';
import { Spa2SimpleImageField } from './spa2-simple-image-field';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/partners page (Spa2PartnersPageView)
// renders: banner + full partner roster (spa2PartnerProfiles AND the
// previously-static spa2ExtraPartners are now both editable from one unified
// list) + the category groupings (spa2PartnerCategories) + featured projects
// (spa2Collaborations) + certifications (spa2QualityCerts).
// ─────────────────────────────────────────────────────────────────────────────

type Partner = (typeof spa2PartnerProfiles)[number] & { id: number };
type PartnerCategory = (typeof spa2PartnerCategories)[number];
type Collaboration = (typeof spa2Collaborations)[number] & { id: number };
type QualityCert = (typeof spa2QualityCerts)[number] & { id: number };

const EMPTY_PARTNER_FORM: Omit<Partner, 'id'> = {
  name: '',
  country: '',
  logo: '',
  specialty: '',
  since: '',
  desc: '',
  expert: '',
  category: spa2PartnerCategories[0]?.key ?? '',
};

const EMPTY_COLLAB_FORM: Omit<Collaboration, 'id'> = {
  title: '',
  partner: '',
  year: '',
  image: '',
};
const EMPTY_CERT_FORM: Omit<QualityCert, 'id'> = { name: '', desc: '', icon: '' };

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

function PartnerTileCard({ form }: { form: Omit<Partner, 'id'> }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center', py: 4 }}>
      <Box
        sx={{
          width: 64,
          height: 64,
          mx: 'auto',
          mb: 1.5,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
        }}
      >
        {form.logo || '—'}
      </Box>
      <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 14 }}>
        {form.name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{form.country}</Typography>
    </Spa2SoftCard>
  );
}

function CategoryPreviewCard({
  label,
  icon,
  count,
}: {
  label: string;
  icon: string;
  count?: number;
}) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center', py: 3 }}>
      <Iconify icon={icon || 'solar:folder-bold'} width={32} sx={{ color: SPA2_TEAL, mb: 1 }} />
      <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{label || '(Chưa đặt tên)'}</Typography>
      {count !== undefined && (
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>
          {count} đối tác
        </Typography>
      )}
    </Spa2SoftCard>
  );
}

function CollabPreviewCard({
  title,
  partner,
  year,
  image,
}: {
  title: string;
  partner: string;
  year: string;
  image: string;
}) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          height: 140,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          bgcolor: SPA2_CREAM,
        }}
      />
      <Box sx={{ p: 2 }}>
        <Chip
          size="small"
          label={year || '—'}
          sx={{ mb: 1, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
        />
        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }} noWrap>
          {title || '(Chưa đặt tên)'}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
          Cùng {partner || '—'}
        </Typography>
      </Box>
    </Spa2SoftCard>
  );
}

function CertPreviewCard({ name, icon, desc }: { name: string; icon: string; desc: string }) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Iconify icon={icon || 'solar:diploma-bold'} width={40} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5, fontSize: 16 }}>
        {name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{desc}</Typography>
    </Spa2SoftCard>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: SPA2_CREAM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={20} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: SPA2_INK, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Card>
  );
}

export function Spa2PartnersManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2PartnersBanner,
    image: { ...spa2PartnersBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'banner' | 'list' | 'categories' | 'collabs' | 'certs' | 'preview'
  >('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2PartnersBanner, image: { ...spa2PartnersBanner.image } });
    setDirty(false);
  };

  // ---- Partner roster (spa2PartnerProfiles + spa2ExtraPartners, unified) ----
  const [items, setItems] = useState<Partner[]>(() =>
    [...spa2PartnerProfiles, ...spa2ExtraPartners].map((p, i) => ({ ...p, id: i + 1 }))
  );
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all');
  const [openForm, setOpenForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Partner, 'id'>>(EMPTY_PARTNER_FORM);

  const filtered = items.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const openCreate = () => {
    setForm(EMPTY_PARTNER_FORM);
    setEditId(null);
    setOpenForm(true);
  };

  const openEdit = (item: Partner) => {
    setForm({
      name: item.name,
      country: item.country,
      logo: item.logo,
      specialty: item.specialty,
      since: item.since,
      desc: item.desc,
      expert: item.expert,
      category: item.category,
    });
    setEditId(item.id);
    setOpenForm(true);
  };

  const handleSubmit = useCallback(() => {
    if (editId !== null) {
      setItems((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    } else {
      const newId = Math.max(0, ...items.map((x) => x.id)) + 1;
      setItems((p) => [...p, { ...form, id: newId }]);
    }
    setOpenForm(false);
    setDirty(true);
  }, [form, editId, items]);

  const handleDelete = useCallback(() => {
    setItems((p) => p.filter((x) => x.id !== deleteId));
    setDeleteId(null);
    setDirty(true);
  }, [deleteId]);

  // ---- Categories (spa2PartnerCategories) ----
  const [categories, setCategories] = useState<PartnerCategory[]>(spa2PartnerCategories);
  const [catEditKey, setCatEditKey] = useState<string | null>(null);
  const [catForm, setCatForm] = useState({ key: '', label: '', icon: '' });
  const [catOpenCreate, setCatOpenCreate] = useState(false);
  const [catDeleteKey, setCatDeleteKey] = useState<string | null>(null);

  const openCatEdit = (cat: PartnerCategory) => {
    setCatForm(cat);
    setCatEditKey(cat.key);
    setCatOpenCreate(false);
  };
  const openCatCreate = () => {
    setCatForm({ key: '', label: '', icon: '' });
    setCatEditKey(null);
    setCatOpenCreate(true);
  };
  const handleCatSubmit = useCallback(() => {
    if (catEditKey !== null) {
      setCategories((p) => p.map((c) => (c.key === catEditKey ? { ...catForm } : c)));
    } else {
      setCategories((p) => [...p, { ...catForm }]);
    }
    setCatEditKey(null);
    setCatOpenCreate(false);
    setDirty(true);
  }, [catForm, catEditKey]);
  const handleCatDelete = useCallback(() => {
    if (!catDeleteKey) return;
    const remaining = categories.filter((c) => c.key !== catDeleteKey);
    const fallbackKey = remaining[0]?.key ?? '';
    setItems((p) =>
      p.map((x) => (x.category === catDeleteKey ? { ...x, category: fallbackKey } : x))
    );
    setCategories(remaining);
    setCatDeleteKey(null);
    setDirty(true);
  }, [catDeleteKey, categories]);

  // ---- Collaborations (spa2Collaborations) ----
  const [collabs, setCollabs] = useState<Collaboration[]>(() =>
    spa2Collaborations.map((c, i) => ({ ...c, id: i + 1 }))
  );
  const [collabOpenForm, setCollabOpenForm] = useState(false);
  const [collabEditId, setCollabEditId] = useState<number | null>(null);
  const [collabDeleteId, setCollabDeleteId] = useState<number | null>(null);
  const [collabForm, setCollabForm] = useState<Omit<Collaboration, 'id'>>(EMPTY_COLLAB_FORM);

  const openCollabCreate = () => {
    setCollabForm(EMPTY_COLLAB_FORM);
    setCollabEditId(null);
    setCollabOpenForm(true);
  };
  const openCollabEdit = (item: Collaboration) => {
    setCollabForm({ title: item.title, partner: item.partner, year: item.year, image: item.image });
    setCollabEditId(item.id);
    setCollabOpenForm(true);
  };
  const handleCollabSubmit = useCallback(() => {
    if (collabEditId !== null) {
      setCollabs((p) => p.map((x) => (x.id === collabEditId ? { ...x, ...collabForm } : x)));
    } else {
      const newId = Math.max(0, ...collabs.map((x) => x.id)) + 1;
      setCollabs((p) => [...p, { ...collabForm, id: newId }]);
    }
    setCollabOpenForm(false);
    setDirty(true);
  }, [collabForm, collabEditId, collabs]);
  const handleCollabDelete = useCallback(() => {
    setCollabs((p) => p.filter((x) => x.id !== collabDeleteId));
    setCollabDeleteId(null);
    setDirty(true);
  }, [collabDeleteId]);

  // ---- Certifications (spa2QualityCerts) ----
  const [certs, setCerts] = useState<QualityCert[]>(() =>
    spa2QualityCerts.map((c, i) => ({ ...c, id: i + 1 }))
  );
  const [certOpenForm, setCertOpenForm] = useState(false);
  const [certEditId, setCertEditId] = useState<number | null>(null);
  const [certDeleteId, setCertDeleteId] = useState<number | null>(null);
  const [certForm, setCertForm] = useState<Omit<QualityCert, 'id'>>(EMPTY_CERT_FORM);

  const openCertCreate = () => {
    setCertForm(EMPTY_CERT_FORM);
    setCertEditId(null);
    setCertOpenForm(true);
  };
  const openCertEdit = (item: QualityCert) => {
    setCertForm({ name: item.name, desc: item.desc, icon: item.icon });
    setCertEditId(item.id);
    setCertOpenForm(true);
  };
  const handleCertSubmit = useCallback(() => {
    if (certEditId !== null) {
      setCerts((p) => p.map((x) => (x.id === certEditId ? { ...x, ...certForm } : x)));
    } else {
      const newId = Math.max(0, ...certs.map((x) => x.id)) + 1;
      setCerts((p) => [...p, { ...certForm, id: newId }]);
    }
    setCertOpenForm(false);
    setDirty(true);
  }, [certForm, certEditId, certs]);
  const handleCertDelete = useCallback(() => {
    setCerts((p) => p.filter((x) => x.id !== certDeleteId));
    setCertDeleteId(null);
    setDirty(true);
  }, [certDeleteId]);

  // ---- Stats ----
  const stats = useMemo(() => {
    const byCategory = categories.map((c) => ({
      ...c,
      count: items.filter((p) => p.category === c.key).length,
    }));
    const countries = new Set(items.map((p) => p.country).filter(Boolean)).size;
    return {
      total: items.length,
      byCategory,
      collabs: collabs.length,
      certs: certs.length,
      countries,
    };
  }, [items, categories, collabs, certs]);

  return (
    <Spa2ManageShell
      title={t('partners.page_title')}
      description="Banner, danh sách đối tác, dự án hợp tác và chứng nhận hiển thị trên trang Đối tác công khai."
      breadcrumbLabel={t('nav.partners')}
      publicPath={paths.spa2.partners}
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
            {t('common.discard_changes')}
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
            {t('common.save_changes')}
          </Button>
        </>
      }
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        {dirty && (
          <Chip
            size="small"
            variant="soft"
            color="warning"
            label={t('common.unsaved_changes')}
            icon={<Iconify icon="solar:pen-bold" width={14} />}
          />
        )}
        {savedAt && !dirty && (
          <Chip
            size="small"
            variant="soft"
            color="success"
            label={t('common.saved_at', { time: savedAt.toLocaleTimeString('vi-VN') })}
            icon={<Iconify icon="solar:check-circle-bold" width={14} />}
          />
        )}
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, v: typeof tab) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 65,
          zIndex: 10,
          bgcolor: 'background.paper',
          '& .MuiTab-root': { minHeight: 56, fontWeight: 600 },
          '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
          '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
        }}
      >
        <Tab
          value="banner"
          label={t('partners.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="list"
          label={t('partners.list_section')}
          icon={<Iconify icon="solar:hand-shake-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('partners.categories_section')}
          icon={<Iconify icon="solar:folder-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="collabs"
          label={t('partners.collabs_section')}
          icon={<Iconify icon="solar:medal-ribbons-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="certs"
          label={t('partners.certs_section')}
          icon={<Iconify icon="solar:diploma-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('partners.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('partners.banner_image_help')}
                />
                <TextField
                  label={t('partners.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('partners.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('partners.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <PreviewFrame>
              <Spa2PageHero
                image={banner.image.url}
                imageStyle={banner.image}
                eyebrow={banner.eyebrow}
                title={banner.title}
                subtitle={banner.subtitle}
              />
            </PreviewFrame>
          </Grid>
        </Grid>
      )}

      {/* Danh sách đối tác chiến lược */}
      {tab === 'list' && (
        <Stack spacing={2.5}>
          {/* 1. KPI tổng quan - quét nhanh 4 chỉ số chính */}
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:hand-shake-bold-duotone"
                label={t('partners.stat_total')}
                value={stats.total}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:global-bold-duotone"
                label={t('partners.stat_countries')}
                value={stats.countries}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:medal-ribbons-star-bold"
                label={t('partners.stat_collabs')}
                value={stats.collabs}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:diploma-bold"
                label={t('partners.stat_certs')}
                value={stats.certs}
              />
            </Grid>
          </Grid>

          {/* 2. Phân bổ theo nhóm - bộ lọc chi tiết, đặt riêng để dễ thao tác */}
          <Card sx={{ bgcolor: SPA2_CREAM }}>
            <Typography variant="overline" sx={{ display: 'block', fontWeight: 700, px: 2, pt: 2 }}>
              {t('partners.stat_by_category')}
            </Typography>
            <Scrollbar sx={{ minHeight: 108 }}>
              <Stack
                spacing={1}
                direction="row"
                divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                sx={{ py: 2, px: 1 }}
              >
                <Spa2ListAnalytic
                  title={t('common.all')}
                  total={stats.total}
                  percent={100}
                  icon="solar:hand-shake-bold-duotone"
                  color={SPA2_TEAL}
                  unitLabel={t('partners.unit_label')}
                  active={categoryFilter === 'all'}
                  onClick={() => setCategoryFilter('all')}
                />
                {stats.byCategory.map((c) => (
                  <Spa2ListAnalytic
                    key={c.key}
                    title={c.label}
                    total={c.count}
                    percent={stats.total ? (c.count / stats.total) * 100 : 0}
                    icon={c.icon}
                    color={SPA2_TEAL_DARK}
                    unitLabel={t('partners.unit_label')}
                    active={categoryFilter === c.key}
                    onClick={() => setCategoryFilter(c.key)}
                  />
                ))}
              </Stack>
            </Scrollbar>
          </Card>

          {/* 3. Danh sách + tìm kiếm + thêm mới */}
          <Card>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              <TextField
                placeholder={t('partners.search_placeholder')}
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
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreate}
                sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
              >
                {t('partners.add_btn')}
              </Button>
            </Stack>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('partners.col_partner')}</TableCell>
                    <TableCell>{t('partners.col_country')}</TableCell>
                    <TableCell>{t('partners.categories_section')}</TableCell>
                    <TableCell>{t('partners.col_specialty')}</TableCell>
                    <TableCell>{t('partners.col_since')}</TableCell>
                    <TableCell>{t('partners.col_expert')}</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: 'primary.lighter',
                              color: 'primary.main',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {item.logo}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">{item.name}</Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              noWrap
                              sx={{ maxWidth: 180, display: 'block' }}
                            >
                              {item.desc}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={item.country} />
                      </TableCell>
                      <TableCell>
                        {categories.find((c) => c.key === item.category)?.label ?? item.category}
                      </TableCell>
                      <TableCell>{item.specialty}</TableCell>
                      <TableCell>{item.since}</TableCell>
                      <TableCell>{item.expert}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
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
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      )}

      {/* Đối tác chiến lược (danh mục nhóm) */}
      {tab === 'categories' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('partners.categories_hint')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCatCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('partners.categories_add_btn')}
            </Button>
          </Stack>
          <Box sx={{ p: 2, pt: 0 }}>
            <Grid container spacing={2}>
              {stats.byCategory.map((cat) => (
                <Grid key={cat.key} xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                  <Box sx={{ width: '100%', position: 'relative' }}>
                    <CategoryPreviewCard label={cat.label} icon={cat.icon} count={cat.count} />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'common.white',
                        borderRadius: 2,
                        boxShadow: 2,
                      }}
                    >
                      <Tooltip title={t('common.edit')}>
                        <IconButton size="small" onClick={() => openCatEdit(cat)}>
                          <Iconify icon="solar:pen-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('common.delete')}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setCatDeleteKey(cat.key)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Grid>
              ))}
              {stats.byCategory.length === 0 && (
                <Grid xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    {t('common.no_data')}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Card>
      )}

      {/* Dự án nổi bật */}
      {tab === 'collabs' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ p: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCollabCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('partners.collabs_add_btn')}
            </Button>
          </Stack>
          <Box sx={{ p: 2, pt: 0 }}>
            <Grid container spacing={2}>
              {collabs.map((c) => (
                <Grid key={c.id} xs={12} sm={6} md={4}>
                  <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        height: 140,
                        backgroundImage: `url(${c.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        bgcolor: SPA2_CREAM,
                      }}
                    />
                    <Box sx={{ p: 2 }}>
                      <Chip size="small" label={c.year} sx={{ mb: 1 }} />
                      <Typography variant="subtitle2" noWrap>
                        {c.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Cùng {c.partner}
                      </Typography>
                      <Stack direction="row" justifyContent="flex-end" spacing={0.5} sx={{ mt: 1 }}>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openCollabEdit(c)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setCollabDeleteId(c.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      )}

      {/* Chứng nhận */}
      {tab === 'certs' && (
        <Card>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ p: 2 }}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCertCreate}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
            >
              {t('partners.certs_add_btn')}
            </Button>
          </Stack>
          <Box sx={{ p: 2, pt: 0 }}>
            <Grid container spacing={2}>
              {certs.map((c) => (
                <Grid key={c.id} xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
                  <Box sx={{ width: '100%', position: 'relative' }}>
                    <CertPreviewCard name={c.name} icon={c.icon} desc={c.desc} />
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'common.white',
                        borderRadius: 2,
                        boxShadow: 2,
                      }}
                    >
                      <Tooltip title={t('common.edit')}>
                        <IconButton size="small" onClick={() => openCertEdit(c)}>
                          <Iconify icon="solar:pen-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('common.delete')}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setCertDeleteId(c.id)}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Grid>
              ))}
              {certs.length === 0 && (
                <Grid xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    {t('common.no_data')}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Card>
      )}

      {/* Live preview — mirrors Spa2PartnersPageView's full section stack */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />

          <Box sx={{ py: { xs: 8, md: 10 } }}>
            <Container>
              <Spa2SectionTitle eyebrow="Thương hiệu" title="Đối tác của chúng tôi" />
              {items.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Chưa có đối tác nào.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {items.map((p) => (
                    <Grid key={p.id} xs={6} sm={4} md={2}>
                      <PartnerTileCard form={p} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Phân loại" title="Đối tác chiến lược" />
              <Grid container spacing={3}>
                {categories.map((cat) => {
                  const partnersInCat = items.filter((p) => p.category === cat.key);
                  return (
                    <Grid key={cat.key} xs={12} sm={6} md={3}>
                      <Spa2SoftCard>
                        <Iconify icon={cat.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                        <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                          {cat.label}
                        </Typography>
                        <Stack spacing={1}>
                          {partnersInCat.length === 0 ? (
                            <Typography sx={{ fontSize: 13, color: 'text.disabled' }}>—</Typography>
                          ) : (
                            partnersInCat.map((p) => (
                              <Typography key={p.id} sx={{ fontSize: 14, color: 'text.secondary' }}>
                                • {p.name}
                              </Typography>
                            ))
                          )}
                        </Stack>
                      </Spa2SoftCard>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 10 } }}>
            <Container>
              <Spa2SectionTitle eyebrow="Hợp tác" title="Dự án nổi bật" />
              <Grid container spacing={3}>
                {collabs.map((c) => (
                  <Grid key={c.id} xs={12} sm={6} md={4}>
                    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          height: 180,
                          backgroundImage: `url(${c.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <Box sx={{ p: 2.5 }}>
                        <Chip
                          size="small"
                          label={c.year}
                          sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                        />
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 0.5 }}>
                          {c.title}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          Cùng {c.partner}
                        </Typography>
                      </Box>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
            <Container>
              <Spa2SectionTitle eyebrow="Tiêu chuẩn" title="Chứng nhận" />
              <Grid container spacing={3}>
                {certs.map((c) => (
                  <Grid key={c.id} xs={12} sm={6} md={3}>
                    <Spa2SoftCard sx={{ textAlign: 'center' }}>
                      <Iconify icon={c.icon} width={44} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
                        {c.name}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {c.desc}
                      </Typography>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Box>
      )}

      {/* Partner create/edit dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editId !== null ? t('partners.form_edit') : t('partners.form_create')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('partners.form_name')}
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('partners.form_abbr')}
                    value={form.logo}
                    onChange={(e) => setForm((p) => ({ ...p, logo: e.target.value }))}
                    sx={{ width: 140 }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('partners.form_country')}
                    value={form.country}
                    onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('partners.form_since')}
                    value={form.since}
                    onChange={(e) => setForm((p) => ({ ...p, since: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  select
                  label={t('partners.form_category')}
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  fullWidth
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.key} value={cat.key}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label={t('partners.form_specialty')}
                  value={form.specialty}
                  onChange={(e) => setForm((p) => ({ ...p, specialty: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('partners.form_desc')}
                  value={form.desc}
                  onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                />
                <TextField
                  label={t('partners.form_expert')}
                  value={form.expert}
                  onChange={(e) => setForm((p) => ({ ...p, expert: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2, maxWidth: 220, mx: 'auto' }}>
                <PartnerTileCard form={form} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {editId !== null ? t('partners.form_edit') : t('partners.form_create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category create/edit dialog */}
      <Dialog
        open={catOpenCreate || catEditKey !== null}
        onClose={() => {
          setCatOpenCreate(false);
          setCatEditKey(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {catEditKey !== null ? t('partners.categories_edit') : t('partners.categories_add_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('partners.form_category_key')}
                  value={catForm.key}
                  onChange={(e) => setCatForm((p) => ({ ...p, key: e.target.value }))}
                  disabled={catEditKey !== null}
                  fullWidth
                />
                <TextField
                  label={t('partners.col_label')}
                  value={catForm.label}
                  onChange={(e) => setCatForm((p) => ({ ...p, label: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('partners.col_icon')}
                  value={catForm.icon}
                  onChange={(e) => setCatForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  placeholder="solar:flask-bold-duotone"
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <CategoryPreviewCard
                  label={catForm.label}
                  icon={catForm.icon}
                  count={
                    catEditKey !== null
                      ? stats.byCategory.find((c) => c.key === catEditKey)?.count
                      : 0
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCatOpenCreate(false);
              setCatEditKey(null);
            }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            variant="contained"
            onClick={handleCatSubmit}
            disabled={!catForm.key || !catForm.label}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {catEditKey !== null ? t('partners.categories_edit') : t('partners.categories_add_btn')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Collaboration create/edit dialog */}
      <Dialog
        open={collabOpenForm}
        onClose={() => setCollabOpenForm(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {collabEditId !== null ? t('partners.collabs_edit') : t('partners.collabs_add_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Spa2SimpleImageField
                  label={t('partners.form_collab_image')}
                  value={collabForm.image}
                  onChange={(url) => setCollabForm((p) => ({ ...p, image: url }))}
                />
                <TextField
                  label={t('partners.form_collab_title')}
                  value={collabForm.title}
                  onChange={(e) => setCollabForm((p) => ({ ...p, title: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('partners.col_partner')}
                    value={collabForm.partner}
                    onChange={(e) => setCollabForm((p) => ({ ...p, partner: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('partners.form_collab_year')}
                    value={collabForm.year}
                    onChange={(e) => setCollabForm((p) => ({ ...p, year: e.target.value }))}
                    sx={{ width: 140 }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <CollabPreviewCard
                  title={collabForm.title}
                  partner={collabForm.partner}
                  year={collabForm.year}
                  image={collabForm.image}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCollabOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleCollabSubmit}
            disabled={!collabForm.title}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {collabEditId !== null ? t('partners.collabs_edit') : t('partners.collabs_add_btn')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certification create/edit dialog */}
      <Dialog open={certOpenForm} onClose={() => setCertOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {certEditId !== null ? t('partners.certs_edit') : t('partners.certs_add_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('partners.col_label')}
                  value={certForm.name}
                  onChange={(e) => setCertForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('partners.col_icon')}
                  value={certForm.icon}
                  onChange={(e) => setCertForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  placeholder="solar:shield-check-bold-duotone"
                />
                <TextField
                  label={t('common.description')}
                  value={certForm.desc}
                  onChange={(e) => setCertForm((p) => ({ ...p, desc: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <CertPreviewCard name={certForm.name} icon={certForm.icon} desc={certForm.desc} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertOpenForm(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleCertSubmit}
            disabled={!certForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {certEditId !== null ? t('partners.certs_edit') : t('partners.certs_add_btn')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title={t('partners.delete_title')}
        content={t('partners.delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('common.delete')}
          </Button>
        }
      />
      <ConfirmDialog
        open={!!catDeleteKey}
        onClose={() => setCatDeleteKey(null)}
        title={t('partners.categories_delete_title')}
        content={t('partners.categories_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleCatDelete}>
            {t('common.delete')}
          </Button>
        }
      />
      <ConfirmDialog
        open={!!collabDeleteId}
        onClose={() => setCollabDeleteId(null)}
        title={t('partners.collabs_delete_title')}
        content={t('partners.collabs_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleCollabDelete}>
            {t('common.delete')}
          </Button>
        }
      />
      <ConfirmDialog
        open={!!certDeleteId}
        onClose={() => setCertDeleteId(null)}
        title={t('partners.certs_delete_title')}
        content={t('partners.certs_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={handleCertDelete}>
            {t('common.delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
