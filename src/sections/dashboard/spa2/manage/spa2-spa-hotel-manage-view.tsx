import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2HotelPartners,
  spa2SpaHotelBanner,
  type Spa2HotelPartner,
  spa2StaycationPackages,
  type Spa2SpaHotelBanner,
  type Spa2StaycationPackage,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SpaHotelPageView } from 'src/sections/spa2/view/spa2-content-pages6';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages6.tsx's
// Spa2SpaHotelPageView renders on the public /spa2/spa-hotel page: the dark
// hero banner (eyebrow/title/subtitle + badge chips), the staycation package
// grid (image/nights/hotel/spa/includes checklist/price/badge, reorderable)
// and the hotel partners strip (initials logo/name/stars/location,
// reorderable) - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The booking dialog's "chọn gói -> điền thông tin -> xác nhận" step flow on
// the public page is purely client-derived interactive demo state and is
// intentionally not mocked/editable here, matching the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const EMPTY_PACKAGE: Omit<Spa2StaycationPackage, 'id'> = {
  name: '',
  nights: 1,
  price: 0,
  image: '',
  hotel: '',
  spa: '',
  includes: [],
  badge: '',
};

const EMPTY_PARTNER: Omit<Spa2HotelPartner, 'id'> = {
  name: '',
  stars: 5,
  location: '',
  logo: '',
};

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

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

// Mirrors the dark hero rendered by Spa2SpaHotelPageView on the public page
// (see spa2-content-pages6.tsx, ~line 1767+): SPA2_INK background, overline,
// h1 title, subtitle and a row of badge chips. The background image overlay
// is a fixed SPA2_PAGE_IMAGES constant and is intentionally not part of the
// manageable banner.
function BannerPreview({ banner }: { banner: Spa2SpaHotelBanner }) {
  return (
    <Box
      sx={{
        bgcolor: SPA2_INK,
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL_LIGHT, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, maxWidth: 480 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}
        >
          {banner.badges.map((b, idx) => (
            <Chip
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              label={b}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

// Mirrors one staycation package card exactly as rendered in the public
// "Chọn kỳ nghỉ dưỡng của bạn" grid (see Spa2SpaHotelPageView, ~line 1820+):
// background image with bottom gradient + badge chip top-right + name/
// nights/hotel overlay text, then includes checklist with check icons,
// price in SPA2_TEAL and the "Đặt ngay" button.
function PackagePreviewCard({ pkg }: { pkg: Omit<Spa2StaycationPackage, 'id'> }) {
  return (
    <Card
      sx={{
        p: 0,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 220,
            backgroundImage: `url(${pkg.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          }}
        />
        {pkg.badge && (
          <Chip
            label={pkg.badge}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: SPA2_TEAL,
              color: 'white',
              fontWeight: 700,
            }}
          />
        )}
        <Box sx={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 15 }}>
            {pkg.name || '(Chưa đặt tên)'}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Chip
              label={`${pkg.nights} đêm`}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11 }}
            />
            <Chip
              label={pkg.hotel}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11 }}
            />
          </Stack>
        </Box>
      </Box>
      <Box sx={{ p: 2.5 }}>
        <Stack spacing={0.75} sx={{ mb: 2 }}>
          {pkg.includes.map((inc, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Stack key={idx} direction="row" spacing={1.5} alignItems="center">
              <Iconify
                icon="solar:check-circle-bold"
                width={13}
                sx={{ color: SPA2_TEAL, flexShrink: 0 }}
              />
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{inc}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ mb: 1.5 }} />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Giá 2 người</Typography>
            <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 16 }}>
              {formatVND(pkg.price ?? 0)}
            </Typography>
          </Box>
          <Button
            size="small"
            sx={{
              borderRadius: 99,
              bgcolor: SPA2_TEAL,
              color: 'white',
              px: 2,
              fontSize: 12,
              '&:hover': { bgcolor: SPA2_TEAL_DARK },
            }}
          >
            Đặt ngay
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

// Mirrors one hotel partner card exactly as rendered in the public "Khách
// sạn đối tác" strip (see Spa2SpaHotelPageView, ~line 1920+): circular
// initials avatar over SPA2_INK, name, star rating and location.
function PartnerPreviewCard({ partner }: { partner: Omit<Spa2HotelPartner, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        bgcolor: 'common.white',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          bgcolor: SPA2_INK,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 14,
          mx: 'auto',
          mb: 1.5,
        }}
      >
        {partner.logo || '??'}
      </Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK, lineHeight: 1.3 }}>
        {partner.name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
        {'⭐'.repeat(Math.max(0, Math.min(5, partner.stars || 0)))} · {partner.location}
      </Typography>
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows), matching the therapist
// profile manage view's TherapistMiniListField convention - used here for
// the package's includes checklist.
function MiniListField({
  label,
  addLabel,
  items,
  onChangeItem,
  onAddItem,
  onRemoveItem,
}: {
  label: string;
  addLabel: string;
  items: string[];
  onChangeItem: (idx: number, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (idx: number) => void;
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        {label}
      </Typography>
      <Stack spacing={1}>
        {items.map((value, idx) => (
          <Stack
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <TextField
              fullWidth
              size="small"
              value={value}
              onChange={(e) => onChangeItem(idx, e.target.value)}
            />
            <IconButton size="small" color="error" onClick={() => onRemoveItem(idx)}>
              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
            </IconButton>
          </Stack>
        ))}
        <Button
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onAddItem}
          sx={{ alignSelf: 'flex-start', color: SPA2_TEAL }}
        >
          {addLabel}
        </Button>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa2SpaHotelManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SpaHotelBanner>(() => ({
    ...spa2SpaHotelBanner,
    badges: [...spa2SpaHotelBanner.badges],
  }));
  const [packages, setPackages] = useState<Spa2StaycationPackage[]>(() =>
    spa2StaycationPackages.map((item) => ({ ...item, includes: [...item.includes] }))
  );
  const [partners, setPartners] = useState<Spa2HotelPartner[]>(() =>
    spa2HotelPartners.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'packages' | 'partners' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBadge = (idx: number, value: string) => {
    setBanner((prev) => ({
      ...prev,
      badges: prev.badges.map((b, i) => (i === idx ? value : b)),
    }));
    markDirty();
  };
  const addBadge = () => {
    setBanner((prev) => ({ ...prev, badges: [...prev.badges, ''] }));
    markDirty();
  };
  const removeBadge = (idx: number) => {
    setBanner((prev) => ({ ...prev, badges: prev.badges.filter((_, i) => i !== idx) }));
    markDirty();
  };

  // ---- Packages CRUD ----
  const [packageDialog, setPackageDialog] = useState(false);
  const [packageEditId, setPackageEditId] = useState<string | null>(null);
  const [packageForm, setPackageForm] = useState<Omit<Spa2StaycationPackage, 'id'>>(EMPTY_PACKAGE);
  const [packageDeleteId, setPackageDeleteId] = useState<string | null>(null);

  const openCreatePackage = () => {
    setPackageForm(EMPTY_PACKAGE);
    setPackageEditId(null);
    setPackageDialog(true);
  };
  const openEditPackage = (item: Spa2StaycationPackage) => {
    const { id, ...rest } = item;
    setPackageForm({ ...rest, includes: [...rest.includes] });
    setPackageEditId(id);
    setPackageDialog(true);
  };
  const submitPackage = () => {
    const next: Omit<Spa2StaycationPackage, 'id'> = {
      ...packageForm,
      nights: Number(packageForm.nights),
      price: Number(packageForm.price),
      includes: packageForm.includes.map((i) => i.trim()).filter(Boolean),
    };
    if (packageEditId) {
      setPackages((prev) =>
        prev.map((item) => (item.id === packageEditId ? { ...item, ...next } : item))
      );
    } else {
      setPackages((prev) => [...prev, withId(next)]);
    }
    setPackageDialog(false);
    markDirty();
  };
  const confirmDeletePackage = () => {
    setPackages((prev) => prev.filter((item) => item.id !== packageDeleteId));
    setPackageDeleteId(null);
    markDirty();
  };
  const reorderPackages = (next: Spa2StaycationPackage[]) => {
    setPackages(next);
    markDirty();
  };

  const updateInclude = (idx: number, value: string) => {
    setPackageForm((p) => ({
      ...p,
      includes: p.includes.map((i, idx2) => (idx2 === idx ? value : i)),
    }));
  };
  const addInclude = () => setPackageForm((p) => ({ ...p, includes: [...p.includes, ''] }));
  const removeInclude = (idx: number) =>
    setPackageForm((p) => ({ ...p, includes: p.includes.filter((_, i) => i !== idx) }));

  // ---- Partners CRUD ----
  const [partnerDialog, setPartnerDialog] = useState(false);
  const [partnerEditId, setPartnerEditId] = useState<string | null>(null);
  const [partnerForm, setPartnerForm] = useState<Omit<Spa2HotelPartner, 'id'>>(EMPTY_PARTNER);
  const [partnerDeleteId, setPartnerDeleteId] = useState<string | null>(null);

  const openCreatePartner = () => {
    setPartnerForm(EMPTY_PARTNER);
    setPartnerEditId(null);
    setPartnerDialog(true);
  };
  const openEditPartner = (item: Spa2HotelPartner) => {
    const { id, ...rest } = item;
    setPartnerForm({ ...rest });
    setPartnerEditId(id);
    setPartnerDialog(true);
  };
  const submitPartner = () => {
    const next: Omit<Spa2HotelPartner, 'id'> = {
      ...partnerForm,
      stars: Math.max(1, Math.min(5, Number(partnerForm.stars))),
    };
    if (partnerEditId) {
      setPartners((prev) =>
        prev.map((item) => (item.id === partnerEditId ? { ...item, ...next } : item))
      );
    } else {
      setPartners((prev) => [...prev, withId(next)]);
    }
    setPartnerDialog(false);
    markDirty();
  };
  const confirmDeletePartner = () => {
    setPartners((prev) => prev.filter((item) => item.id !== partnerDeleteId));
    setPartnerDeleteId(null);
    markDirty();
  };
  const reorderPartners = (next: Spa2HotelPartner[]) => {
    setPartners(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SpaHotelBanner, badges: [...spa2SpaHotelBanner.badges] });
    setPackages(spa2StaycationPackages.map((item) => ({ ...item, includes: [...item.includes] })));
    setPartners(spa2HotelPartners.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('spa_hotel.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.spa_hotel')}
      publicPath={paths.spa2.spaHotel}
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
          label={t('spa_hotel.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="packages"
          label={t('spa_hotel.packages_section')}
          icon={<Iconify icon="solar:bed-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="partners"
          label={t('spa_hotel.partners_section')}
          icon={<Iconify icon="solar:buildings-2-bold-duotone" width={20} />}
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
            <SectionCard
              title={t('spa_hotel.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('spa_hotel.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('spa_hotel.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('spa_hotel.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <MiniListField
                  label={t('spa_hotel.form_banner_badge')}
                  addLabel={t('spa_hotel.add_badge_btn')}
                  items={banner.badges}
                  onChangeItem={updateBadge}
                  onAddItem={addBadge}
                  onRemoveItem={removeBadge}
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Packages */}
      {tab === 'packages' && (
        <SectionCard
          title={t('spa_hotel.packages_section')}
          icon="solar:bed-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreatePackage}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('spa_hotel.add_package_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('spa_hotel.drag_hint')}
          </Typography>
          {packages.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('spa_hotel.no_packages')}
            </Typography>
          )}
          <Spa2SortableGrid items={packages} onReorder={reorderPackages}>
            <Grid container spacing={2}>
              {packages.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <PackagePreviewCard pkg={item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditPackage(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setPackageDeleteId(item.id)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Partners */}
      {tab === 'partners' && (
        <SectionCard
          title={t('spa_hotel.partners_section')}
          icon="solar:buildings-2-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreatePartner}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('spa_hotel.add_partner_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('spa_hotel.drag_hint')}
          </Typography>
          {partners.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('spa_hotel.no_partners')}
            </Typography>
          )}
          <Spa2SortableGrid items={partners} onReorder={reorderPartners}>
            <Grid container spacing={2}>
              {partners.map((item) => (
                <Grid key={item.id} xs={6} sm={4} md={2}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <PartnerPreviewCard partner={item} />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <Spa2DragHandle
                            sortable={sortable}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => openEditPartner(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setPartnerDeleteId(item.id)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}
                  </Spa2SortableItem>
                </Grid>
              ))}
            </Grid>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SpaHotelPageView banner={banner} packages={packages} partners={partners} />
        </Box>
      )}

      {/* Package add/edit dialog */}
      <Dialog open={packageDialog} onClose={() => setPackageDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {packageEditId ? t('common.edit') : t('spa_hotel.add_package_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('spa_hotel.form_package_name')}
                  value={packageForm.name}
                  onChange={(e) => setPackageForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('spa_hotel.form_package_nights')}
                    type="number"
                    value={packageForm.nights}
                    onChange={(e) =>
                      setPackageForm((p) => ({ ...p, nights: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('spa_hotel.form_package_price')}
                    type="number"
                    value={packageForm.price}
                    onChange={(e) =>
                      setPackageForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('spa_hotel.form_package_image')}
                  value={packageForm.image}
                  onChange={(url) => setPackageForm((p) => ({ ...p, image: url }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('spa_hotel.form_package_hotel')}
                    value={packageForm.hotel}
                    onChange={(e) => setPackageForm((p) => ({ ...p, hotel: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label={t('spa_hotel.form_package_spa')}
                    value={packageForm.spa}
                    onChange={(e) => setPackageForm((p) => ({ ...p, spa: e.target.value }))}
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('spa_hotel.form_package_badge')}
                  value={packageForm.badge}
                  onChange={(e) => setPackageForm((p) => ({ ...p, badge: e.target.value }))}
                  fullWidth
                  helperText="Best Value"
                />
                <MiniListField
                  label={t('spa_hotel.form_package_includes')}
                  addLabel={t('spa_hotel.add_include_btn')}
                  items={packageForm.includes}
                  onChangeItem={updateInclude}
                  onAddItem={addInclude}
                  onRemoveItem={removeInclude}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <PackagePreviewCard pkg={packageForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPackage}
            disabled={!packageForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {packageEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!packageDeleteId}
        onClose={() => setPackageDeleteId(null)}
        title={t('spa_hotel.package_delete_title')}
        content={t('spa_hotel.package_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePackage}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Partner add/edit dialog */}
      <Dialog open={partnerDialog} onClose={() => setPartnerDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {partnerEditId ? t('common.edit') : t('spa_hotel.add_partner_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('spa_hotel.form_partner_name')}
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('spa_hotel.form_partner_stars')}
                    type="number"
                    value={partnerForm.stars}
                    inputProps={{ min: 1, max: 5 }}
                    onChange={(e) =>
                      setPartnerForm((p) => ({ ...p, stars: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('spa_hotel.form_partner_logo')}
                    value={partnerForm.logo}
                    onChange={(e) => setPartnerForm((p) => ({ ...p, logo: e.target.value }))}
                    fullWidth
                    helperText="IC"
                  />
                </Stack>
                <TextField
                  label={t('spa_hotel.form_partner_location')}
                  value={partnerForm.location}
                  onChange={(e) => setPartnerForm((p) => ({ ...p, location: e.target.value }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <PartnerPreviewCard partner={partnerForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPartnerDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitPartner}
            disabled={!partnerForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {partnerEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!partnerDeleteId}
        onClose={() => setPartnerDeleteId(null)}
        title={t('spa_hotel.partner_delete_title')}
        content={t('spa_hotel.partner_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeletePartner}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
