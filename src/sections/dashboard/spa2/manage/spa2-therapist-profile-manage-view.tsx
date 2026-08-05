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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2Therapists,
  type Spa2Therapist,
  SPA2_THERAPIST_REVIEWS,
  SPA2_THERAPIST_BOOKINGS,
  type Spa2TherapistReview,
  type Spa2TherapistBooking,
  spa2TherapistProfileBanner,
  type Spa2TherapistProfileBanner,
  type Spa2TherapistReviewStatus,
  type Spa2TherapistBookingStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2TherapistProfilePageView } from 'src/sections/spa2/view/spa2-content-pages5';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages5.tsx's
// Spa2TherapistProfilePageView renders on the public /spa2/therapist-profile
// page: the page banner (plain cream hero, no image) and the therapist
// roster - read from and written back in the same shape as src/_mock/_spa2,
// the single source of truth shared with the public view. The "banner" tab
// pairs the edit form with a scaled live preview and the "preview" tab
// reuses Spa2TherapistProfilePageView itself, fed with the in-progress
// edited state. The "recent reviews" card on the public page reuses the
// already-shared spa2Feedbacks mock and is intentionally not duplicated
// here, matching the project convention.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

type TherapistFormState = {
  name: string;
  role: string;
  avatar: string;
  exp: string;
  branch: string;
  rating: number;
  reviews: number;
  certs: string[];
  specialties: string[];
  bio: string;
  achievements: string[];
  gallery: string[];
  slots: string[];
};

const EMPTY_THERAPIST_FORM: TherapistFormState = {
  name: '',
  role: '',
  avatar: '',
  exp: '',
  branch: '',
  rating: 5,
  reviews: 0,
  certs: [],
  specialties: [],
  bio: '',
  achievements: [],
  gallery: ['', '', ''],
  slots: [],
};

type TherapistListKey = 'certs' | 'specialties' | 'achievements' | 'slots';

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

// KPI tile used on the "bookings" and "reviews" tabs.
function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: SPA2_CREAM_DARK,
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

// Mirrors the plain cream-bg hero section of the public Therapist Profile
// page (no image field for this banner type, unlike the consultation /
// nutrition banners).
function TherapistProfileHeroPreview({ banner }: { banner: Spa2TherapistProfileBanner }) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: SPA2_CREAM,
        pt: { xs: 6, md: 7 },
        pb: { xs: 5, md: 6 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: SPA2_TEAL_LIGHT,
          opacity: 0.1,
        }}
      />
      <Container sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h3" sx={{ color: SPA2_INK, fontWeight: 600, mt: 1, mb: 1.5 }}>
          {banner.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 460, mx: 'auto' }}>
          {banner.subtitle}
        </Typography>
      </Container>
    </Box>
  );
}

// Mirrors a single therapist card in the public horizontal selector row
// (always drawn in its "selected" teal styling since this is a static
// admin preview, not an interactive selector).
function TherapistSelectorPreviewCard({
  name,
  role,
  avatar,
}: {
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `2px solid ${SPA2_TEAL}`,
        boxShadow: 'none',
        textAlign: 'center',
        minWidth: 140,
        height: '100%',
      }}
    >
      <Avatar
        src={avatar}
        sx={{ width: 64, height: 64, mx: 'auto', mb: 1, border: `3px solid ${SPA2_TEAL}` }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_TEAL, fontSize: 13 }}>
        {name ? name.split(' ').pop() : 'Tên chuyên viên'}
      </Typography>
      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
        {role ? role.split(' ')[0] : 'Chức danh'}
      </Typography>
    </Card>
  );
}

// Mirrors the left-column profile SoftCard (avatar, name, role, rating,
// branch + exp, cert chips, achievements) of the public detail panel.
function TherapistDetailPreviewCard({
  avatar,
  name,
  role,
  rating,
  reviews,
  branch,
  exp,
  certs,
  achievements,
}: {
  avatar: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  branch: string;
  exp: string;
  certs: string[];
  achievements: string[];
}) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Avatar
        src={avatar}
        sx={{ width: 96, height: 96, mx: 'auto', mb: 1.5, border: `4px solid ${SPA2_TEAL_LIGHT}` }}
      />
      <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 0.25 }}>
        {name || 'Tên chuyên viên'}
      </Typography>
      <Typography sx={{ color: SPA2_TEAL, fontSize: 13, mb: 1 }}>{role || 'Chức danh'}</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
        sx={{ mb: 1.5 }}
      >
        <Rating
          value={rating}
          readOnly
          size="small"
          precision={0.1}
          sx={{ fontSize: 14, '& .MuiRating-icon': { color: '#EF9F27' } }}
        />
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>({reviews})</Typography>
      </Stack>
      <Stack spacing={0.75} sx={{ mb: 1.5 }}>
        {[
          { icon: 'solar:buildings-bold', text: branch || '—' },
          { icon: 'solar:calendar-bold', text: exp ? `${exp} kinh nghiệm` : '—' },
        ].map((i) => (
          <Stack
            key={i.icon}
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Iconify icon={i.icon} width={14} sx={{ color: SPA2_TEAL }} />
            <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>{i.text}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        flexWrap="wrap"
        justifyContent="center"
        sx={{ gap: 0.5, mb: achievements.length ? 1.5 : 0 }}
      >
        {certs.map((c) => (
          <Chip
            key={c}
            label={c}
            size="small"
            sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 10 }}
          />
        ))}
      </Stack>
      {achievements.length > 0 && (
        <Stack spacing={0.75} sx={{ textAlign: 'left' }}>
          {achievements.map((a) => (
            <Stack key={a} direction="row" spacing={1} alignItems="flex-start">
              <Iconify
                icon="solar:medal-star-bold"
                width={14}
                sx={{ color: '#EF9F27', flexShrink: 0, mt: '2px' }}
              />
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{a}</Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Card>
  );
}

// Small in-dialog CRUD list (add/edit/remove rows) used for certs /
// specialties / achievements / slots, matching the consultation manage
// view's ConsultantMiniListField convention.
function TherapistMiniListField({
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

export function Spa2TherapistProfileManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2TherapistProfileBanner>(() => ({
    ...spa2TherapistProfileBanner,
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'therapists' | 'bookings' | 'reviews' | 'preview'>(
    'banner'
  );
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Therapists ----
  const [therapists, setTherapists] = useState<Spa2Therapist[]>(() =>
    spa2Therapists.map((item) => ({
      ...item,
      certs: [...item.certs],
      specialties: [...item.specialties],
      achievements: [...item.achievements],
      gallery: [...item.gallery],
      slots: [...item.slots],
    }))
  );
  const [therapistForm, setTherapistForm] = useState<TherapistFormState>(EMPTY_THERAPIST_FORM);
  const [therapistDialog, setTherapistDialog] = useState(false);
  const [therapistEditId, setTherapistEditId] = useState<string | null>(null);
  const [therapistDeleteId, setTherapistDeleteId] = useState<string | null>(null);

  const openCreateTherapist = () => {
    setTherapistForm(EMPTY_THERAPIST_FORM);
    setTherapistEditId(null);
    setTherapistDialog(true);
  };
  const openEditTherapist = (item: Spa2Therapist) => {
    const gallery = [item.gallery[0] ?? '', item.gallery[1] ?? '', item.gallery[2] ?? ''];
    setTherapistForm({
      name: item.name,
      role: item.role,
      avatar: item.avatar,
      exp: item.exp,
      branch: item.branch,
      rating: item.rating,
      reviews: item.reviews,
      certs: [...item.certs],
      specialties: [...item.specialties],
      bio: item.bio,
      achievements: [...item.achievements],
      gallery,
      slots: [...item.slots],
    });
    setTherapistEditId(item.id);
    setTherapistDialog(true);
  };
  const submitTherapist = () => {
    const cleanList = (v: string[]) => v.map((s) => s.trim()).filter(Boolean);
    const next = {
      name: therapistForm.name,
      role: therapistForm.role,
      avatar: therapistForm.avatar,
      exp: therapistForm.exp,
      branch: therapistForm.branch,
      rating: Number(therapistForm.rating),
      reviews: Number(therapistForm.reviews),
      certs: cleanList(therapistForm.certs),
      specialties: cleanList(therapistForm.specialties),
      bio: therapistForm.bio,
      achievements: cleanList(therapistForm.achievements),
      gallery: therapistForm.gallery,
      slots: cleanList(therapistForm.slots),
    };
    if (therapistEditId) {
      setTherapists((prev) =>
        prev.map((item) => (item.id === therapistEditId ? { ...item, ...next } : item))
      );
    } else {
      setTherapists((prev) => [...prev, withId(next)]);
    }
    setTherapistDialog(false);
    markDirty();
  };
  const confirmDeleteTherapist = () => {
    setTherapists((prev) => prev.filter((item) => item.id !== therapistDeleteId));
    setTherapistDeleteId(null);
    markDirty();
  };
  const reorderTherapists = (next: Spa2Therapist[]) => {
    setTherapists(next);
    markDirty();
  };

  // ---- Therapist mini-lists (certs / specialties / achievements / slots) ----
  const addTherapistListItem = (key: TherapistListKey) => {
    setTherapistForm((p) => ({ ...p, [key]: [...p[key], ''] }));
  };
  const updateTherapistListItem = (key: TherapistListKey, idx: number, value: string) => {
    setTherapistForm((p) => {
      const nextList = [...p[key]];
      nextList[idx] = value;
      return { ...p, [key]: nextList };
    });
  };
  const removeTherapistListItem = (key: TherapistListKey, idx: number) => {
    setTherapistForm((p) => ({ ...p, [key]: p[key].filter((_, i) => i !== idx) }));
  };

  // ---- Therapist gallery (exactly 3 fixed image slots) ----
  const updateGalleryImage = (idx: number, url: string) => {
    setTherapistForm((p) => {
      const nextGallery = [...p.gallery];
      nextGallery[idx] = url;
      return { ...p, gallery: nextGallery };
    });
  };

  // ---- Đặt lịch với chuyên gia (bookings) ----
  const [bookings, setBookings] = useState<Spa2TherapistBooking[]>(() =>
    SPA2_THERAPIST_BOOKINGS.map((item) => ({ ...item }))
  );
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<
    Spa2TherapistBookingStatus | 'all'
  >('all');
  const [viewBooking, setViewBooking] = useState<Spa2TherapistBooking | null>(null);

  const BOOKING_STATUS_META: Record<
    Spa2TherapistBookingStatus,
    { label: string; color: 'warning' | 'info' | 'success' | 'error' }
  > = {
    pending: { label: t('therapist_profile.bookings_status_pending'), color: 'warning' },
    confirmed: { label: t('therapist_profile.bookings_status_confirmed'), color: 'info' },
    completed: { label: t('therapist_profile.bookings_status_completed'), color: 'success' },
    cancelled: { label: t('therapist_profile.bookings_status_cancelled'), color: 'error' },
  };

  const filteredBookings = bookings.filter((item) => {
    const q = bookingSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.customerName.toLowerCase().includes(q) ||
      item.therapistName.toLowerCase().includes(q) ||
      item.phone.includes(bookingSearch.trim());
    const matchStatus = bookingStatusFilter === 'all' || item.status === bookingStatusFilter;
    return matchSearch && matchStatus;
  });

  const bookingCounts = {
    all: bookings.length,
    pending: bookings.filter((item) => item.status === 'pending').length,
    confirmed: bookings.filter((item) => item.status === 'confirmed').length,
    completed: bookings.filter((item) => item.status === 'completed').length,
    cancelled: bookings.filter((item) => item.status === 'cancelled').length,
  };

  const setBookingStatus = (id: number, status: Spa2TherapistBookingStatus) => {
    setBookings((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    setViewBooking((prev) => (prev?.id === id ? { ...prev, status } : prev));
    markDirty();
  };

  // ---- Quản lý bình luận (reviews moderation) ----
  const [reviews, setReviews] = useState<Spa2TherapistReview[]>(() =>
    SPA2_THERAPIST_REVIEWS.map((item) => ({ ...item }))
  );
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewStatusFilter, setReviewStatusFilter] = useState<Spa2TherapistReviewStatus | 'all'>(
    'all'
  );
  const [viewReview, setViewReview] = useState<Spa2TherapistReview | null>(null);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

  const REVIEW_STATUS_META: Record<
    Spa2TherapistReviewStatus,
    { label: string; color: 'success' | 'warning' | 'default' }
  > = {
    published: { label: t('therapist_profile.reviews_status_published'), color: 'success' },
    pending: { label: t('therapist_profile.reviews_status_pending'), color: 'warning' },
    hidden: { label: t('therapist_profile.reviews_status_hidden'), color: 'default' },
  };

  const filteredReviews = reviews.filter((item) => {
    const q = reviewSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.customerName.toLowerCase().includes(q) ||
      item.therapistName.toLowerCase().includes(q);
    const matchStatus = reviewStatusFilter === 'all' || item.status === reviewStatusFilter;
    return matchSearch && matchStatus;
  });

  const reviewCounts = {
    all: reviews.length,
    published: reviews.filter((item) => item.status === 'published').length,
    pending: reviews.filter((item) => item.status === 'pending').length,
    hidden: reviews.filter((item) => item.status === 'hidden').length,
  };

  const reviewAverage = reviews.length
    ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
    : 0;

  const setReviewStatus = (id: number, status: Spa2TherapistReviewStatus) => {
    setReviews((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    setViewReview((prev) => (prev?.id === id ? { ...prev, status } : prev));
    markDirty();
  };

  const confirmDeleteReview = () => {
    setReviews((prev) => prev.filter((item) => item.id !== deleteReviewId));
    setViewReview((prev) => (prev?.id === deleteReviewId ? null : prev));
    setDeleteReviewId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2TherapistProfileBanner });
    setTherapists(
      spa2Therapists.map((item) => ({
        ...item,
        certs: [...item.certs],
        specialties: [...item.specialties],
        achievements: [...item.achievements],
        gallery: [...item.gallery],
        slots: [...item.slots],
      }))
    );
    setBookings(SPA2_THERAPIST_BOOKINGS.map((item) => ({ ...item })));
    setReviews(SPA2_THERAPIST_REVIEWS.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('therapist_profile.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.therapist_profile')}
      publicPath={paths.spa2.therapistProfile}
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
          top: 65,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="banner"
          label={t('therapist_profile.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="therapists"
          label={t('therapist_profile.therapists_section')}
          icon={<Iconify icon="solar:users-group-rounded-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="bookings"
          label={t('therapist_profile.bookings_section')}
          icon={<Iconify icon="solar:calendar-mark-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="reviews"
          label={t('therapist_profile.reviews_section')}
          icon={<Iconify icon="solar:chat-round-dots-bold-duotone" width={20} />}
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
              title={t('therapist_profile.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('therapist_profile.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('therapist_profile.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('therapist_profile.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <TherapistProfileHeroPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Therapists */}
      {tab === 'therapists' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('therapist_profile.therapists_section')}
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateTherapist}
              sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK }, borderRadius: 999 }}
            >
              {t('therapist_profile.add_therapist_btn')}
            </Button>
          </Stack>
          <Spa2SortableGrid items={therapists} onReorder={reorderTherapists}>
            <Grid container spacing={2}>
              {therapists.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <TherapistSelectorPreviewCard
                          name={item.name}
                          role={item.role}
                          avatar={item.avatar}
                        />
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
                            onClick={() => openEditTherapist(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setTherapistDeleteId(item.id)}
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
        </Card>
      )}

      {/* Đặt lịch với chuyên gia (bookings management) */}
      {tab === 'bookings' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:calendar-mark-bold-duotone"
                label={t('therapist_profile.bookings_stat_total')}
                value={bookingCounts.all}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:bell-bold-duotone"
                label={t('therapist_profile.bookings_stat_pending')}
                value={bookingCounts.pending}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:check-circle-bold-duotone"
                label={t('therapist_profile.bookings_stat_confirmed')}
                value={bookingCounts.confirmed}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:diploma-bold-duotone"
                label={t('therapist_profile.bookings_stat_completed')}
                value={bookingCounts.completed}
              />
            </Grid>
          </Grid>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              useFlexGap
              gap={1.5}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('therapist_profile.bookings_section')}
              </Typography>
              <TextField
                placeholder={t('therapist_profile.bookings_search_placeholder')}
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                size="small"
                sx={{ minWidth: 260 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap gap={1} sx={{ mb: 2.5 }}>
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
                <Chip
                  key={s}
                  label={`${s === 'all' ? t('common.all') : BOOKING_STATUS_META[s].label} (${bookingCounts[s]})`}
                  variant={bookingStatusFilter === s ? 'filled' : 'outlined'}
                  color={s === 'all' ? 'default' : BOOKING_STATUS_META[s].color}
                  onClick={() => setBookingStatusFilter(s)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>

            <Stack spacing={1.5}>
              {filteredBookings.map((item) => (
                <Stack
                  key={item.id}
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  sx={{ p: 2, borderRadius: 2, border: `1px solid ${SPA2_CREAM_DARK}` }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2">{item.customerName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.phone} · {item.service}
                    </Typography>
                  </Box>
                  <Box sx={{ minWidth: 170 }}>
                    <Typography variant="body2">{item.therapistName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.date} · {item.time}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={BOOKING_STATUS_META[item.status].label}
                    color={BOOKING_STATUS_META[item.status].color}
                    variant="soft"
                  />
                  <Stack direction="row" spacing={0.5}>
                    {item.status === 'pending' && (
                      <>
                        <Tooltip title={t('therapist_profile.bookings_action_confirm')}>
                          <IconButton
                            size="small"
                            sx={{ color: SPA2_TEAL_DARK }}
                            onClick={() => setBookingStatus(item.id, 'confirmed')}
                          >
                            <Iconify icon="solar:check-circle-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('therapist_profile.bookings_action_cancel')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setBookingStatus(item.id, 'cancelled')}
                          >
                            <Iconify icon="solar:close-circle-bold" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    {item.status === 'confirmed' && (
                      <>
                        <Tooltip title={t('therapist_profile.bookings_action_complete')}>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => setBookingStatus(item.id, 'completed')}
                          >
                            <Iconify icon="solar:diploma-bold" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('therapist_profile.bookings_action_cancel')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setBookingStatus(item.id, 'cancelled')}
                          >
                            <Iconify icon="solar:close-circle-bold" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title={t('therapist_profile.bookings_view_detail')}>
                      <IconButton size="small" onClick={() => setViewBooking(item)}>
                        <Iconify icon="solar:eye-bold" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              ))}
              {filteredBookings.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                  <Iconify icon="solar:calendar-mark-linear" width={40} sx={{ mb: 1 }} />
                  <Typography>{t('therapist_profile.bookings_empty')}</Typography>
                </Box>
              )}
            </Stack>
          </Card>
        </Stack>
      )}

      {/* Quản lý bình luận (reviews moderation) */}
      {tab === 'reviews' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:chat-round-dots-bold-duotone"
                label={t('therapist_profile.reviews_stat_total')}
                value={reviewCounts.all}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:star-bold-duotone"
                label={t('therapist_profile.reviews_stat_average')}
                value={reviewAverage.toFixed(1)}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:check-circle-bold-duotone"
                label={t('therapist_profile.reviews_stat_published')}
                value={reviewCounts.published}
              />
            </Grid>
            <Grid xs={6} md={3}>
              <StatCard
                icon="solar:bell-bold-duotone"
                label={t('therapist_profile.reviews_stat_pending')}
                value={reviewCounts.pending}
              />
            </Grid>
          </Grid>

          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              useFlexGap
              gap={1.5}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {t('therapist_profile.reviews_section')}
              </Typography>
              <TextField
                placeholder={t('therapist_profile.reviews_search_placeholder')}
                value={reviewSearch}
                onChange={(e) => setReviewSearch(e.target.value)}
                size="small"
                sx={{ minWidth: 260 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap gap={1} sx={{ mb: 2.5 }}>
              {(['all', 'published', 'pending', 'hidden'] as const).map((s) => (
                <Chip
                  key={s}
                  label={`${s === 'all' ? t('common.all') : REVIEW_STATUS_META[s].label} (${reviewCounts[s]})`}
                  variant={reviewStatusFilter === s ? 'filled' : 'outlined'}
                  color={s === 'all' ? 'default' : REVIEW_STATUS_META[s].color}
                  onClick={() => setReviewStatusFilter(s)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>

            <Stack spacing={0}>
              {filteredReviews.map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  onClick={() => setViewReview(item)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    mb: 1.5,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: SPA2_CREAM,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Iconify icon="solar:user-bold" width={22} sx={{ color: SPA2_TEAL }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="subtitle2">{item.customerName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        → {item.therapistName}
                      </Typography>
                    </Stack>
                    <Rating value={item.rating} readOnly size="small" sx={{ my: 0.25 }} />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      sx={{ display: 'block' }}
                    >
                      {item.comment}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={REVIEW_STATUS_META[item.status].label}
                    color={REVIEW_STATUS_META[item.status].color}
                    variant="soft"
                  />
                </Stack>
              ))}
              {filteredReviews.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                  <Iconify icon="solar:chat-round-dots-linear" width={40} sx={{ mb: 1 }} />
                  <Typography>{t('therapist_profile.reviews_empty')}</Typography>
                </Box>
              )}
            </Stack>
          </Card>
        </Stack>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2TherapistProfilePageView banner={banner} therapists={therapists} />
        </Box>
      )}

      {/* Therapist add/edit dialog */}
      <Dialog
        open={therapistDialog}
        onClose={() => setTherapistDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {therapistEditId ? t('common.edit') : t('therapist_profile.add_therapist_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('therapist_profile.form_name')}
                    fullWidth
                    size="small"
                    value={therapistForm.name}
                    onChange={(e) => setTherapistForm((p) => ({ ...p, name: e.target.value }))}
                  />
                  <TextField
                    label={t('therapist_profile.form_role')}
                    fullWidth
                    size="small"
                    value={therapistForm.role}
                    onChange={(e) => setTherapistForm((p) => ({ ...p, role: e.target.value }))}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('therapist_profile.form_branch')}
                    fullWidth
                    size="small"
                    value={therapistForm.branch}
                    onChange={(e) => setTherapistForm((p) => ({ ...p, branch: e.target.value }))}
                  />
                  <TextField
                    label={t('therapist_profile.form_exp')}
                    fullWidth
                    size="small"
                    value={therapistForm.exp}
                    onChange={(e) => setTherapistForm((p) => ({ ...p, exp: e.target.value }))}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('therapist_profile.form_rating')}
                    type="number"
                    fullWidth
                    size="small"
                    value={therapistForm.rating}
                    onChange={(e) =>
                      setTherapistForm((p) => ({ ...p, rating: Number(e.target.value) }))
                    }
                    inputProps={{ step: 0.1, min: 0, max: 5 }}
                  />
                  <TextField
                    label={t('therapist_profile.form_reviews')}
                    type="number"
                    fullWidth
                    size="small"
                    value={therapistForm.reviews}
                    onChange={(e) =>
                      setTherapistForm((p) => ({ ...p, reviews: Number(e.target.value) }))
                    }
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('therapist_profile.form_avatar')}
                  value={therapistForm.avatar}
                  onChange={(url) => setTherapistForm((p) => ({ ...p, avatar: url }))}
                  rounded
                />
                <TextField
                  label={t('therapist_profile.form_bio')}
                  value={therapistForm.bio}
                  onChange={(e) => setTherapistForm((p) => ({ ...p, bio: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TherapistMiniListField
                  label={t('therapist_profile.form_certs')}
                  addLabel={t('therapist_profile.add_item_btn')}
                  items={therapistForm.certs}
                  onChangeItem={(idx, value) => updateTherapistListItem('certs', idx, value)}
                  onAddItem={() => addTherapistListItem('certs')}
                  onRemoveItem={(idx) => removeTherapistListItem('certs', idx)}
                />
                <TherapistMiniListField
                  label={t('therapist_profile.form_specialties')}
                  addLabel={t('therapist_profile.add_item_btn')}
                  items={therapistForm.specialties}
                  onChangeItem={(idx, value) => updateTherapistListItem('specialties', idx, value)}
                  onAddItem={() => addTherapistListItem('specialties')}
                  onRemoveItem={(idx) => removeTherapistListItem('specialties', idx)}
                />
                <TherapistMiniListField
                  label={t('therapist_profile.form_achievements')}
                  addLabel={t('therapist_profile.add_item_btn')}
                  items={therapistForm.achievements}
                  onChangeItem={(idx, value) => updateTherapistListItem('achievements', idx, value)}
                  onAddItem={() => addTherapistListItem('achievements')}
                  onRemoveItem={(idx) => removeTherapistListItem('achievements', idx)}
                />
                <TherapistMiniListField
                  label={t('therapist_profile.form_slots')}
                  addLabel={t('therapist_profile.add_item_btn')}
                  items={therapistForm.slots}
                  onChangeItem={(idx, value) => updateTherapistListItem('slots', idx, value)}
                  onAddItem={() => addTherapistListItem('slots')}
                  onRemoveItem={(idx) => removeTherapistListItem('slots', idx)}
                />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    {t('therapist_profile.form_gallery')}
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    {[0, 1, 2].map((idx) => (
                      <Box key={idx} sx={{ flex: 1 }}>
                        <Spa2SimpleImageField
                          value={therapistForm.gallery[idx] ?? ''}
                          onChange={(url) => updateGalleryImage(idx, url)}
                          height={110}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    {t('therapist_profile.roster_preview_section')}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'background.neutral',
                      borderRadius: 3,
                      p: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <TherapistSelectorPreviewCard
                      name={therapistForm.name}
                      role={therapistForm.role}
                      avatar={therapistForm.avatar}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 1, display: 'block' }}
                  >
                    {t('therapist_profile.detail_preview_section')}
                  </Typography>
                  <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                    <TherapistDetailPreviewCard
                      avatar={therapistForm.avatar}
                      name={therapistForm.name}
                      role={therapistForm.role}
                      rating={therapistForm.rating}
                      reviews={therapistForm.reviews}
                      branch={therapistForm.branch}
                      exp={therapistForm.exp}
                      certs={therapistForm.certs.filter(Boolean)}
                      achievements={therapistForm.achievements.filter(Boolean)}
                    />
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTherapistDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitTherapist}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {therapistEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!therapistDeleteId}
        onClose={() => setTherapistDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteTherapist}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Booking detail dialog */}
      <Dialog open={!!viewBooking} onClose={() => setViewBooking(null)} maxWidth="sm" fullWidth>
        {viewBooking && (
          <>
            <DialogTitle>{t('therapist_profile.bookings_detail_title')}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ pt: 0.5 }}>
                <TextField
                  label={t('therapist_profile.bookings_col_customer')}
                  value={viewBooking.customerName}
                  fullWidth
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('therapist_profile.bookings_col_phone')}
                    value={viewBooking.phone}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label={t('therapist_profile.bookings_col_therapist')}
                    value={viewBooking.therapistName}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('therapist_profile.bookings_col_service')}
                    value={viewBooking.service}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label={t('therapist_profile.bookings_col_datetime')}
                    value={`${viewBooking.date} · ${viewBooking.time}`}
                    fullWidth
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
                <TextField
                  label={t('therapist_profile.bookings_detail_note')}
                  value={viewBooking.note || '—'}
                  fullWidth
                  multiline
                  minRows={2}
                  size="small"
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  select
                  label={t('therapist_profile.bookings_col_status')}
                  value={viewBooking.status}
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setBookingStatus(viewBooking.id, e.target.value as Spa2TherapistBookingStatus)
                  }
                >
                  {(['pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
                    <MenuItem key={s} value={s}>
                      {BOOKING_STATUS_META[s].label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewBooking(null)}>{t('common.close')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Review detail dialog + moderation actions */}
      <Dialog open={!!viewReview} onClose={() => setViewReview(null)} maxWidth="xs" fullWidth>
        {viewReview && (
          <>
            <DialogTitle>{t('therapist_profile.reviews_detail_title')}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {t('therapist_profile.bookings_col_status')}:
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      size="small"
                      label={REVIEW_STATUS_META[viewReview.status].label}
                      color={REVIEW_STATUS_META[viewReview.status].color}
                      variant="soft"
                    />
                  </Box>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1">{viewReview.customerName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {viewReview.therapistName}
                  </Typography>
                  <Rating value={viewReview.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {t('therapist_profile.reviews_col_comment')}:
                  </Typography>
                  <Typography variant="body2">{viewReview.comment}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {viewReview.date}
                </Typography>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={() => setDeleteReviewId(viewReview.id)}>
                {t('common.delete')}
              </Button>
              {viewReview.status !== 'hidden' && (
                <Button onClick={() => setReviewStatus(viewReview.id, 'hidden')}>
                  {t('therapist_profile.reviews_action_hide')}
                </Button>
              )}
              {viewReview.status !== 'published' && (
                <Button
                  variant="contained"
                  onClick={() => setReviewStatus(viewReview.id, 'published')}
                  sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
                >
                  {t('therapist_profile.reviews_action_publish')}
                </Button>
              )}
              <Button onClick={() => setViewReview(null)}>{t('common.close')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <ConfirmDialog
        open={!!deleteReviewId}
        onClose={() => setDeleteReviewId(null)}
        title={t('therapist_profile.reviews_delete_title')}
        content={t('therapist_profile.reviews_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteReview}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
