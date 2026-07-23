import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2AppDownloadQr,
  spa2AppDownloadHero,
  spa2AppDownloadStores,
  type Spa2AppDownloadQr,
  spa2AppDownloadScreens,
  spa2AppDownloadCompats,
  spa2AppDownloadReviews,
  spa2AppDownloadFeatures,
  type Spa2AppDownloadHero,
  type Spa2AppDownloadStore,
  type Spa2AppDownloadCompat,
  type Spa2AppDownloadReview,
  spa2AppDownloadRatingStats,
  type Spa2AppDownloadFeature,
  type Spa2AppDownloadRatingStat,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2AppDownloadPageView } from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2AppDownloadPageView renders on the public /spa2/app-download page: the
// dark hero copy, store badges + rating stats, feature grid, the phone-screen
// carousel images and the QR + OS-compatibility section - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The "preview" tab reuses
// Spa2AppDownloadPageView itself, fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_STORE_FORM = { icon: 'ic:baseline-apple', store: '', sub: 'Tải về trên' };
const EMPTY_STAT_FORM = { n: '', l: '' };
const EMPTY_FEATURE_FORM = { icon: 'solar:star-bold-duotone', title: '', desc: '' };
const EMPTY_COMPAT_FORM = { icon: 'ic:baseline-apple', label: '' };
const EMPTY_REVIEW_FORM = { name: '', service: '', rating: 5, avatar: '', comment: '' };

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
    <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
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

// Mirrors the dark hero copy + store badges + rating stats on the public page.
function HeroPreviewCard({
  hero,
  stores,
  ratingStats,
}: {
  hero: Spa2AppDownloadHero;
  stores: Spa2AppDownloadStore[];
  ratingStats: Spa2AppDownloadRatingStat[];
}) {
  return (
    <Box sx={{ bgcolor: SPA2_INK, borderRadius: 3, p: 3 }}>
      <Stack spacing={1.5}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {hero.eyebrow || 'Eyebrow'}
        </Typography>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
          {hero.title || 'Tiêu đề hero'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 13.5, lineHeight: 1.7 }}>
          {hero.subtitle || 'Mô tả ngắn…'}
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ pt: 1, gap: 1 }}>
          {stores.map((s) => (
            <Chip
              key={s.id}
              icon={<Iconify icon={s.icon} width={16} />}
              label={s.store || 'Store'}
              sx={{ bgcolor: 'white', color: SPA2_INK, fontWeight: 600 }}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={3} sx={{ pt: 1 }}>
          {ratingStats.map((s) => (
            <Box key={s.id}>
              <Typography sx={{ fontWeight: 700, color: SPA2_TEAL_LIGHT, fontSize: 16 }}>
                {s.n || '—'}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                {s.l || 'Nhãn'}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

// Mirrors a single feature SoftCard on the public page.
function FeaturePreviewCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Card
      sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 3,
          bgcolor: SPA2_CREAM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Iconify icon={icon || 'solar:star-bold-duotone'} width={24} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.5, fontSize: 14 }}>
        {title || 'Tên tính năng'}
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.6 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Card>
  );
}

// Mirrors the QR card + compatibility chips on the public page.
function QrPreviewCard({
  qr,
  compats,
}: {
  qr: Spa2AppDownloadQr;
  compats: Spa2AppDownloadCompat[];
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
        {qr.title || 'Tiêu đề QR'}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2, fontSize: 13 }}>
        {qr.subtitle || 'Mô tả ngắn…'}
      </Typography>
      <Box
        sx={{
          width: 100,
          height: 100,
          bgcolor: SPA2_CREAM,
          borderRadius: 3,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          border: `2px solid ${SPA2_TEAL}`,
        }}
      >
        <Iconify icon="solar:qr-code-bold" width={56} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Stack direction="row" spacing={1.5} justifyContent="center">
        {compats.map((c) => (
          <CompatChipPreview key={c.id} icon={c.icon} label={c.label} />
        ))}
      </Stack>
    </Card>
  );
}

// Mirrors a single OS-compatibility chip on the public page's QR card.
function CompatChipPreview({ icon, label }: { icon: string; label: string }) {
  return (
    <Chip
      icon={<Iconify icon={icon || 'ic:baseline-apple'} width={16} />}
      label={label || 'Nền tảng'}
      sx={{ bgcolor: SPA2_CREAM, color: SPA2_INK }}
    />
  );
}

// Mirrors a single store badge button exactly as rendered in the dark hero on
// the public page. Wrap in a dark swatch (see DarkSwatch below) so the white
// button and light text read correctly outside the hero tab.
function StoreBadgePreview({ icon, store, sub }: { icon: string; store: string; sub: string }) {
  return (
    <Button
      component="div"
      startIcon={<Iconify icon={icon || 'ic:baseline-apple'} width={22} />}
      sx={{
        borderRadius: 3,
        px: 2.5,
        py: 1.25,
        bgcolor: 'white',
        color: SPA2_INK,
        fontWeight: 600,
        pointerEvents: 'none',
      }}
    >
      <Stack sx={{ textAlign: 'left' }}>
        <Typography sx={{ fontSize: 10, lineHeight: 1, color: 'text.secondary' }}>
          {sub || 'Tải về trên'}
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{store || 'Store'}</Typography>
      </Stack>
    </Button>
  );
}

// Mirrors a single rating-stat number exactly as rendered in the dark hero on
// the public page.
function RatingStatPreview({ n, l }: { n: string; l: string }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, color: SPA2_TEAL_LIGHT, fontSize: 18 }}>
        {n || '—'}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{l || 'Nhãn'}</Typography>
    </Box>
  );
}

// Dark strip matching the hero's background, used to preview store badges /
// rating stats / phone screens outside the "hero" tab so the white button and
// light text read the same as on the public page.
function DarkSwatch({ children }: { children: ReactNode }) {
  return <Box sx={{ bgcolor: SPA2_INK, borderRadius: 3, p: 2.5 }}>{children}</Box>;
}

// Mirrors a single phone-screen slide exactly as rendered in the carousel on
// the public page (rounded "device" frame over the dark hero background).
function PhoneScreenPreview({ url }: { url: string }) {
  return (
    <DarkSwatch>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 160,
            aspectRatio: '9/19.5',
            borderRadius: '32px',
            border: '8px solid rgba(255,255,255,0.12)',
            overflow: 'hidden',
            boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
            bgcolor: url ? undefined : 'rgba(255,255,255,0.08)',
            ...(url && {
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }),
          }}
        />
      </Box>
    </DarkSwatch>
  );
}

// Mirrors a single review SoftCard on the public page.
function ReviewPreviewCard({ name, service, rating, avatar, comment }: Spa2AppDownloadReview) {
  return (
    <Card
      sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Rating value={rating} readOnly size="small" sx={{ mb: 1.5 }} />
      <Typography
        sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic', fontSize: 14 }}
      >
        &ldquo;{comment || 'Nhận xét của khách hàng…'}&rdquo;
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatar} />
        <Box>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
            {name || 'Tên khách hàng'}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
            {service || 'Dịch vụ'}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

export function Spa2AppDownloadManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [hero, setHero] = useState<Spa2AppDownloadHero>(() => ({ ...spa2AppDownloadHero }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<
    'hero' | 'stores' | 'features' | 'screens' | 'qr' | 'reviews' | 'preview'
  >('hero');
  const markDirty = () => setDirty(true);

  const updateHero = (key: keyof Spa2AppDownloadHero, value: string) => {
    setHero((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Store badges ----
  const [stores, setStores] = useState<Spa2AppDownloadStore[]>(() =>
    spa2AppDownloadStores.map((s) => ({ ...s }))
  );
  const [storeForm, setStoreForm] = useState(EMPTY_STORE_FORM);
  const [storeDialog, setStoreDialog] = useState(false);
  const [storeEditId, setStoreEditId] = useState<string | null>(null);
  const [storeDeleteId, setStoreDeleteId] = useState<string | null>(null);

  const openCreateStore = () => {
    setStoreForm(EMPTY_STORE_FORM);
    setStoreEditId(null);
    setStoreDialog(true);
  };
  const openEditStore = (item: Spa2AppDownloadStore) => {
    setStoreForm({ icon: item.icon, store: item.store, sub: item.sub });
    setStoreEditId(item.id);
    setStoreDialog(true);
  };
  const submitStore = () => {
    if (storeEditId) {
      setStores((prev) => prev.map((s) => (s.id === storeEditId ? { ...s, ...storeForm } : s)));
    } else {
      setStores((prev) => [...prev, withId(storeForm)]);
    }
    setStoreDialog(false);
    markDirty();
  };
  const confirmDeleteStore = () => {
    setStores((prev) => prev.filter((s) => s.id !== storeDeleteId));
    setStoreDeleteId(null);
    markDirty();
  };

  // ---- Rating stats ----
  const [ratingStats, setRatingStats] = useState<Spa2AppDownloadRatingStat[]>(() =>
    spa2AppDownloadRatingStats.map((s) => ({ ...s }))
  );
  const [statForm, setStatForm] = useState(EMPTY_STAT_FORM);
  const [statDialog, setStatDialog] = useState(false);
  const [statEditId, setStatEditId] = useState<string | null>(null);
  const [statDeleteId, setStatDeleteId] = useState<string | null>(null);

  const openCreateStat = () => {
    setStatForm(EMPTY_STAT_FORM);
    setStatEditId(null);
    setStatDialog(true);
  };
  const openEditStat = (item: Spa2AppDownloadRatingStat) => {
    setStatForm({ n: item.n, l: item.l });
    setStatEditId(item.id);
    setStatDialog(true);
  };
  const submitStat = () => {
    if (statEditId) {
      setRatingStats((prev) => prev.map((s) => (s.id === statEditId ? { ...s, ...statForm } : s)));
    } else {
      setRatingStats((prev) => [...prev, withId(statForm)]);
    }
    setStatDialog(false);
    markDirty();
  };
  const confirmDeleteStat = () => {
    setRatingStats((prev) => prev.filter((s) => s.id !== statDeleteId));
    setStatDeleteId(null);
    markDirty();
  };

  // ---- Features ----
  const [features, setFeatures] = useState<Spa2AppDownloadFeature[]>(() =>
    spa2AppDownloadFeatures.map((f) => ({ ...f }))
  );
  const [featureForm, setFeatureForm] = useState(EMPTY_FEATURE_FORM);
  const [featureDialog, setFeatureDialog] = useState(false);
  const [featureEditId, setFeatureEditId] = useState<string | null>(null);
  const [featureDeleteId, setFeatureDeleteId] = useState<string | null>(null);

  const openCreateFeature = () => {
    setFeatureForm(EMPTY_FEATURE_FORM);
    setFeatureEditId(null);
    setFeatureDialog(true);
  };
  const openEditFeature = (item: Spa2AppDownloadFeature) => {
    setFeatureForm({ icon: item.icon, title: item.title, desc: item.desc });
    setFeatureEditId(item.id);
    setFeatureDialog(true);
  };
  const submitFeature = () => {
    if (featureEditId) {
      setFeatures((prev) =>
        prev.map((f) => (f.id === featureEditId ? { ...f, ...featureForm } : f))
      );
    } else {
      setFeatures((prev) => [...prev, withId(featureForm)]);
    }
    setFeatureDialog(false);
    markDirty();
  };
  const confirmDeleteFeature = () => {
    setFeatures((prev) => prev.filter((f) => f.id !== featureDeleteId));
    setFeatureDeleteId(null);
    markDirty();
  };

  // ---- Phone screens ----
  const [screens, setScreens] = useState<string[]>(() => [...spa2AppDownloadScreens]);
  const [screenForm, setScreenForm] = useState('');
  const [screenDialog, setScreenDialog] = useState(false);
  const [screenEditIdx, setScreenEditIdx] = useState<number | null>(null);
  const [screenDeleteIdx, setScreenDeleteIdx] = useState<number | null>(null);

  const openCreateScreen = () => {
    setScreenForm('');
    setScreenEditIdx(null);
    setScreenDialog(true);
  };
  const openEditScreen = (idx: number) => {
    setScreenForm(screens[idx]);
    setScreenEditIdx(idx);
    setScreenDialog(true);
  };
  const submitScreen = () => {
    if (screenEditIdx !== null) {
      setScreens((prev) => prev.map((s, i) => (i === screenEditIdx ? screenForm : s)));
    } else {
      setScreens((prev) => [...prev, screenForm]);
    }
    setScreenDialog(false);
    markDirty();
  };
  const confirmDeleteScreen = () => {
    setScreens((prev) => prev.filter((_, i) => i !== screenDeleteIdx));
    setScreenDeleteIdx(null);
    markDirty();
  };

  // ---- QR ----
  const [qr, setQr] = useState<Spa2AppDownloadQr>(() => ({ ...spa2AppDownloadQr }));
  const updateQr = (key: keyof Spa2AppDownloadQr, value: string) => {
    setQr((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Compatibility chips ----
  const [compats, setCompats] = useState<Spa2AppDownloadCompat[]>(() =>
    spa2AppDownloadCompats.map((c) => ({ ...c }))
  );
  const [compatForm, setCompatForm] = useState(EMPTY_COMPAT_FORM);
  const [compatDialog, setCompatDialog] = useState(false);
  const [compatEditId, setCompatEditId] = useState<string | null>(null);
  const [compatDeleteId, setCompatDeleteId] = useState<string | null>(null);

  const openCreateCompat = () => {
    setCompatForm(EMPTY_COMPAT_FORM);
    setCompatEditId(null);
    setCompatDialog(true);
  };
  const openEditCompat = (item: Spa2AppDownloadCompat) => {
    setCompatForm({ icon: item.icon, label: item.label });
    setCompatEditId(item.id);
    setCompatDialog(true);
  };
  const submitCompat = () => {
    if (compatEditId) {
      setCompats((prev) => prev.map((c) => (c.id === compatEditId ? { ...c, ...compatForm } : c)));
    } else {
      setCompats((prev) => [...prev, withId(compatForm)]);
    }
    setCompatDialog(false);
    markDirty();
  };
  const confirmDeleteCompat = () => {
    setCompats((prev) => prev.filter((c) => c.id !== compatDeleteId));
    setCompatDeleteId(null);
    markDirty();
  };

  // ---- Reviews ----
  const [reviews, setReviews] = useState<Spa2AppDownloadReview[]>(() =>
    spa2AppDownloadReviews.map((r) => ({ ...r }))
  );
  const [reviewForm, setReviewForm] = useState(EMPTY_REVIEW_FORM);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewEditId, setReviewEditId] = useState<string | null>(null);
  const [reviewDeleteId, setReviewDeleteId] = useState<string | null>(null);

  const openCreateReview = () => {
    setReviewForm(EMPTY_REVIEW_FORM);
    setReviewEditId(null);
    setReviewDialog(true);
  };
  const openEditReview = (item: Spa2AppDownloadReview) => {
    setReviewForm({
      name: item.name,
      service: item.service,
      rating: item.rating,
      avatar: item.avatar,
      comment: item.comment,
    });
    setReviewEditId(item.id);
    setReviewDialog(true);
  };
  const submitReview = () => {
    const next = { ...reviewForm, rating: Number(reviewForm.rating) };
    if (reviewEditId) {
      setReviews((prev) => prev.map((r) => (r.id === reviewEditId ? { ...r, ...next } : r)));
    } else {
      setReviews((prev) => [...prev, withId(next)]);
    }
    setReviewDialog(false);
    markDirty();
  };
  const confirmDeleteReview = () => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewDeleteId));
    setReviewDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setHero({ ...spa2AppDownloadHero });
    setStores(spa2AppDownloadStores.map((s) => ({ ...s })));
    setRatingStats(spa2AppDownloadRatingStats.map((s) => ({ ...s })));
    setFeatures(spa2AppDownloadFeatures.map((f) => ({ ...f })));
    setScreens([...spa2AppDownloadScreens]);
    setQr({ ...spa2AppDownloadQr });
    setCompats(spa2AppDownloadCompats.map((c) => ({ ...c })));
    setReviews(spa2AppDownloadReviews.map((r) => ({ ...r })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('app_download.page_title')}
      description={hero.subtitle}
      breadcrumbLabel={t('nav.app_download')}
      publicPath={paths.spa2.appDownload}
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
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 64,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="hero"
          label={t('app_download.hero_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="stores"
          label={t('app_download.stores_section')}
          icon={<Iconify icon="solar:shop-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="features"
          label={t('app_download.features_section')}
          icon={<Iconify icon="solar:widget-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="screens"
          label={t('app_download.screens_section')}
          icon={<Iconify icon="solar:smartphone-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="qr"
          label={t('app_download.qr_section')}
          icon={<Iconify icon="solar:qr-code-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reviews"
          label={t('app_download.reviews_section')}
          icon={<Iconify icon="solar:chat-round-star-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Hero */}
      {tab === 'hero' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('app_download.hero_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('app_download.form_hero_eyebrow')}
                  value={hero.eyebrow}
                  onChange={(e) => updateHero('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('app_download.form_hero_title')}
                  value={hero.title}
                  onChange={(e) => updateHero('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('app_download.form_hero_subtitle')}
                  value={hero.subtitle}
                  onChange={(e) => updateHero('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <HeroPreviewCard hero={hero} stores={stores} ratingStats={ratingStats} />
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Stores + rating stats */}
      {tab === 'stores' && (
        <Stack spacing={3}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('app_download.stores_section')}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateStore}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('app_download.add_store_btn')}
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {stores.map((item) => (
                <Grid key={item.id} xs={12} sm={6}>
                  <Box sx={{ position: 'relative' }}>
                    <DarkSwatch>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <StoreBadgePreview icon={item.icon} store={item.store} sub={item.sub} />
                      </Box>
                    </DarkSwatch>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => openEditStore(item)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:pen-bold" width={14} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setStoreDeleteId(item.id)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                      </IconButton>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('app_download.rating_stats_section')}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateStat}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('app_download.add_stat_btn')}
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {ratingStats.map((item) => (
                <Grid key={item.id} xs={12} sm={4}>
                  <Box sx={{ position: 'relative' }}>
                    <DarkSwatch>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <RatingStatPreview n={item.n} l={item.l} />
                      </Box>
                    </DarkSwatch>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ position: 'absolute', top: 4, right: 4 }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => openEditStat(item)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:pen-bold" width={14} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setStatDeleteId(item.id)}
                        sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                      </IconButton>
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Stack>
      )}

      {/* Features */}
      {tab === 'features' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('app_download.features_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateFeature}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('app_download.add_feature_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {features.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <FeaturePreviewCard icon={item.icon} title={item.title} desc={item.desc} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditFeature(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setFeatureDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Phone screens */}
      {tab === 'screens' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('app_download.screens_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateScreen}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('app_download.add_screen_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {screens.map((url, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid key={idx} xs={12} sm={4}>
                <Box sx={{ position: 'relative' }}>
                  <PhoneScreenPreview url={url} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="center"
                    sx={{ position: 'absolute', bottom: 8, left: 0, right: 0 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditScreen(idx)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setScreenDeleteIdx(idx)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* QR + compatibility */}
      {tab === 'qr' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('app_download.qr_section')} icon="solar:qr-code-bold-duotone">
              <Stack spacing={2}>
                <Spa2SimpleImageField
                  label={t('app_download.form_qr_image')}
                  value={qr.image}
                  onChange={(v) => updateQr('image', v)}
                  height={160}
                  helperText={t('app_download.form_qr_image_help')}
                />
                <TextField
                  label={t('app_download.form_qr_title')}
                  value={qr.title}
                  onChange={(e) => updateQr('title', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('app_download.form_qr_subtitle')}
                  value={qr.subtitle}
                  onChange={(e) => updateQr('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <Divider />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle2">{t('app_download.compats_section')}</Typography>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="mingcute:add-line" width={16} />}
                    onClick={openCreateCompat}
                  >
                    {t('app_download.add_compat_btn')}
                  </Button>
                </Stack>
                <Stack spacing={1}>
                  {compats.map((item) => (
                    <Stack
                      key={item.id}
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      sx={{ p: 1.5, borderRadius: 2, border: `1px solid ${SPA2_CREAM_DARK}` }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <CompatChipPreview icon={item.icon} label={item.label} />
                      </Box>
                      <IconButton size="small" onClick={() => openEditCompat(item)}>
                        <Iconify icon="solar:pen-bold" width={14} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setCompatDeleteId(item.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Box sx={{ maxWidth: 320, mx: 'auto' }}>
                <QrPreviewCard qr={qr} compats={compats} />
              </Box>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Reviews */}
      {tab === 'reviews' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('app_download.reviews_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateReview}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('app_download.add_review_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {reviews.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <ReviewPreviewCard
                    id={item.id}
                    name={item.name}
                    service={item.service}
                    rating={item.rating}
                    avatar={item.avatar}
                    comment={item.comment}
                  />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditReview(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setReviewDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2AppDownloadPageView
            hero={hero}
            stores={stores}
            ratingStats={ratingStats}
            screens={screens}
            features={features}
            reviews={reviews}
            qr={qr}
            compats={compats}
          />
        </Box>
      )}

      {/* Store dialog */}
      <Dialog open={storeDialog} onClose={() => setStoreDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {storeEditId ? t('common.edit') : t('app_download.add_store_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('app_download.form_icon')}
                  fullWidth
                  size="small"
                  value={storeForm.icon}
                  onChange={(e) => setStoreForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="ic:baseline-apple"
                />
                <TextField
                  label={t('app_download.form_store_name')}
                  fullWidth
                  size="small"
                  value={storeForm.store}
                  onChange={(e) => setStoreForm((p) => ({ ...p, store: e.target.value }))}
                />
                <TextField
                  label={t('app_download.form_store_sub')}
                  fullWidth
                  size="small"
                  value={storeForm.sub}
                  onChange={(e) => setStoreForm((p) => ({ ...p, sub: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <DarkSwatch>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <StoreBadgePreview
                    icon={storeForm.icon}
                    store={storeForm.store}
                    sub={storeForm.sub}
                  />
                </Box>
              </DarkSwatch>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStoreDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStore}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {storeEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!storeDeleteId}
        onClose={() => setStoreDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStore}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Rating stat dialog */}
      <Dialog open={statDialog} onClose={() => setStatDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{statEditId ? t('common.edit') : t('app_download.add_stat_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('app_download.form_stat_number')}
                  fullWidth
                  size="small"
                  value={statForm.n}
                  onChange={(e) => setStatForm((p) => ({ ...p, n: e.target.value }))}
                  helperText="4.9★"
                />
                <TextField
                  label={t('app_download.form_stat_label')}
                  fullWidth
                  size="small"
                  value={statForm.l}
                  onChange={(e) => setStatForm((p) => ({ ...p, l: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <DarkSwatch>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <RatingStatPreview n={statForm.n} l={statForm.l} />
                </Box>
              </DarkSwatch>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitStat}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {statEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!statDeleteId}
        onClose={() => setStatDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteStat}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Feature dialog */}
      <Dialog open={featureDialog} onClose={() => setFeatureDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          {featureEditId ? t('common.edit') : t('app_download.add_feature_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={6}>
              <Stack spacing={2}>
                <TextField
                  label={t('app_download.form_icon')}
                  fullWidth
                  size="small"
                  value={featureForm.icon}
                  onChange={(e) => setFeatureForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:star-bold-duotone"
                />
                <TextField
                  label={t('app_download.form_feature_title')}
                  fullWidth
                  size="small"
                  value={featureForm.title}
                  onChange={(e) => setFeatureForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('app_download.form_feature_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={featureForm.desc}
                  onChange={(e) => setFeatureForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <FeaturePreviewCard
                  icon={featureForm.icon}
                  title={featureForm.title}
                  desc={featureForm.desc}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeatureDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitFeature}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {featureEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!featureDeleteId}
        onClose={() => setFeatureDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteFeature}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Screen dialog */}
      <Dialog open={screenDialog} onClose={() => setScreenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {screenEditIdx !== null ? t('common.edit') : t('app_download.add_screen_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Spa2SimpleImageField
                label={t('app_download.form_screen_image')}
                value={screenForm}
                onChange={setScreenForm}
                height={220}
              />
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <PhoneScreenPreview url={screenForm} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScreenDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitScreen}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {screenEditIdx !== null ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={screenDeleteIdx !== null}
        onClose={() => setScreenDeleteIdx(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteScreen}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Compatibility dialog */}
      <Dialog open={compatDialog} onClose={() => setCompatDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {compatEditId ? t('common.edit') : t('app_download.add_compat_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('app_download.form_icon')}
                  fullWidth
                  size="small"
                  value={compatForm.icon}
                  onChange={(e) => setCompatForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="ic:baseline-apple"
                />
                <TextField
                  label={t('app_download.form_compat_label')}
                  fullWidth
                  size="small"
                  value={compatForm.label}
                  onChange={(e) => setCompatForm((p) => ({ ...p, label: e.target.value }))}
                  helperText="iOS 14+"
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2, textAlign: 'center' }}>
                <CompatChipPreview icon={compatForm.icon} label={compatForm.label} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompatDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitCompat}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {compatEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!compatDeleteId}
        onClose={() => setCompatDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteCompat}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Review dialog */}
      <Dialog open={reviewDialog} onClose={() => setReviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {reviewEditId ? t('common.edit') : t('app_download.add_review_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('app_download.form_review_name')}
                  fullWidth
                  size="small"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm((p) => ({ ...p, name: e.target.value }))}
                />
                <TextField
                  label={t('app_download.form_review_service')}
                  fullWidth
                  size="small"
                  value={reviewForm.service}
                  onChange={(e) => setReviewForm((p) => ({ ...p, service: e.target.value }))}
                />
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('app_download.form_review_rating')}
                  </Typography>
                  <Rating
                    value={reviewForm.rating}
                    onChange={(_, v) => setReviewForm((p) => ({ ...p, rating: v ?? 0 }))}
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('app_download.form_review_avatar')}
                  value={reviewForm.avatar}
                  onChange={(v) => setReviewForm((p) => ({ ...p, avatar: v }))}
                  height={120}
                  rounded
                />
                <TextField
                  label={t('app_download.form_review_comment')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ReviewPreviewCard
                  id={reviewEditId ?? 'preview'}
                  name={reviewForm.name}
                  service={reviewForm.service}
                  rating={reviewForm.rating}
                  avatar={reviewForm.avatar}
                  comment={reviewForm.comment}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitReview}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {reviewEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmDialog
        open={!!reviewDeleteId}
        onClose={() => setReviewDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteReview}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
