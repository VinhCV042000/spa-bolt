import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2Events,
  type Spa2Event,
  spa2EventsBanner,
  spa2EventCategories,
  type Spa2EventCategory,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import {
  Spa2EventsPageView,
  Spa2ContentPageHero,
} from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2EventsPageView renders on the public /spa2/events page: the page
// banner, the category filter chips and the workshop/event catalog - read
// from and written back in the same shape as src/_mock/_spa2, the single
// source of truth shared with the public view. The "banner" tab reuses
// Spa2ContentPageHero and the "preview" tab reuses Spa2EventsPageView itself,
// fed with the in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_EVENT_FORM = {
  title: '',
  date: '',
  time: '',
  location: '',
  seats: 20,
  booked: 0,
  price: 0,
  image: '',
  category: 'workshop',
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

// Mirrors the exact event-card markup on the public /spa2/events page (image
// + price/free chip + sold-out overlay + date/location rows + seats-left
// progress bar) so the admin preview looks identical.
function EventPreviewCard({
  title,
  date,
  time,
  location,
  seats,
  booked,
  price,
  image,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  seats: number;
  booked: number;
  price: number;
  image: string;
}) {
  const pct = seats > 0 ? Math.round((booked / seats) * 100) : 0;
  const full = seats > 0 && booked >= seats;
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 140,
            bgcolor: SPA2_CREAM,
            backgroundImage: image ? `url(${image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Chip
          label={price ? formatVND(price) : 'Miễn phí'}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: price ? SPA2_TEAL : '#2E7D32',
            color: 'white',
            fontWeight: 700,
          }}
        />
        {full && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Chip label="HẾT CHỖ" sx={{ bgcolor: 'error.main', color: 'white', fontWeight: 700 }} />
          </Box>
        )}
      </Box>
      <Box sx={{ p: 1.75 }}>
        <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 1, fontSize: 13.5 }}>
          {title || 'Tên sự kiện'}
        </Typography>
        <Stack spacing={0.5} sx={{ mb: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:calendar-bold" width={13} sx={{ color: SPA2_TEAL }} />
            <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
              {date || 'DD/MM/YYYY'} · {time || 'Giờ'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon="solar:map-point-bold" width={13} sx={{ color: SPA2_TEAL }} />
            <Typography sx={{ fontSize: 11.5, color: 'text.secondary' }}>
              {location || 'Địa điểm'}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
            Chỗ trống: {Math.max(seats - booked, 0)}/{seats}
          </Typography>
          <Typography
            sx={{ fontSize: 11, color: pct >= 90 ? 'error.main' : SPA2_TEAL, fontWeight: 500 }}
          >
            {pct}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={Math.min(pct, 100)}
          sx={{
            height: 5,
            borderRadius: 99,
            bgcolor: SPA2_CREAM_DARK,
            '& .MuiLinearProgress-bar': { bgcolor: pct >= 90 ? 'error.main' : SPA2_TEAL },
          }}
        />
      </Box>
    </Spa2SoftCard>
  );
}

export function Spa2EventsManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2EventsBanner,
    image: { ...spa2EventsBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'categories' | 'events' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Categories ----
  const [categories, setCategories] = useState<Spa2EventCategory[]>(() =>
    spa2EventCategories.map((c) => ({ ...c }))
  );
  const realCategories = useMemo(() => categories.filter((c) => c.value !== 'all'), [categories]);

  const updateCategory = (idx: number, patch: Partial<Spa2EventCategory>) => {
    setCategories((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
    markDirty();
  };
  const addCategory = () => {
    setCategories((prev) => [...prev, { value: `cat-${prev.length}`, label: '' }]);
    markDirty();
  };
  const removeCategory = (idx: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };

  // ---- Events ----
  const [events, setEvents] = useState<Spa2Event[]>(() => spa2Events.map((e) => ({ ...e })));
  const [eventForm, setEventForm] = useState(EMPTY_EVENT_FORM);
  const [eventDialog, setEventDialog] = useState(false);
  const [eventEditId, setEventEditId] = useState<string | null>(null);
  const [eventDeleteId, setEventDeleteId] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState('all');

  const filteredEvents = useMemo(
    () => (eventFilter === 'all' ? events : events.filter((e) => e.category === eventFilter)),
    [events, eventFilter]
  );

  const openCreateEvent = () => {
    setEventForm({ ...EMPTY_EVENT_FORM, category: realCategories[0]?.value ?? 'workshop' });
    setEventEditId(null);
    setEventDialog(true);
  };
  const openEditEvent = (item: Spa2Event) => {
    setEventForm({
      title: item.title,
      date: item.date,
      time: item.time,
      location: item.location,
      seats: item.seats,
      booked: item.booked,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setEventEditId(item.id);
    setEventDialog(true);
  };
  const submitEvent = () => {
    const next = { ...eventForm };
    if (eventEditId) {
      setEvents((prev) => prev.map((e) => (e.id === eventEditId ? { ...e, ...next } : e)));
    } else {
      setEvents((prev) => [...prev, withId(next)]);
    }
    setEventDialog(false);
    markDirty();
  };
  const confirmDeleteEvent = () => {
    setEvents((prev) => prev.filter((e) => e.id !== eventDeleteId));
    setEventDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2EventsBanner, image: { ...spa2EventsBanner.image } });
    setCategories(spa2EventCategories.map((c) => ({ ...c })));
    setEvents(spa2Events.map((e) => ({ ...e })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('events.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.events')}
      publicPath={paths.spa2.events}
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
          value="banner"
          label={t('events.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('events.categories_section')}
          icon={<Iconify icon="solar:tag-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="events"
          label={t('events.events_section')}
          icon={<Iconify icon="solar:calendar-bold-duotone" width={20} />}
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
            <SectionCard title={t('events.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('events.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('events.banner_image_help')}
                />
                <TextField
                  label={t('events.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('events.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('events.banner_subtitle')}
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
                <Spa2ContentPageHero
                  img={banner.image.url}
                  imageStyle={banner.image}
                  eyebrow={banner.eyebrow}
                  title={banner.title}
                  subtitle={banner.subtitle}
                />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Categories */}
      {tab === 'categories' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('events.categories_section')}
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addCategory}
            >
              {t('events.add_category_btn')}
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {categories.map((c, idx) => (
              <Stack key={c.value} direction="row" spacing={1.5} alignItems="center">
                <Chip
                  size="small"
                  label={c.value === 'all' ? t('events.category_all_locked') : c.value}
                  sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  label={t('events.form_category_label')}
                  value={c.label}
                  onChange={(e) => updateCategory(idx, { label: e.target.value })}
                />
                {c.value !== 'all' && (
                  <IconButton size="small" color="error" onClick={() => removeCategory(idx)}>
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                )}
              </Stack>
            ))}
          </Stack>
        </Card>
      )}

      {/* Events */}
      {tab === 'events' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
            flexWrap="wrap"
            useFlexGap
            gap={1}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('events.events_section')}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                select
                size="small"
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                {categories.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateEvent}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('events.add_event_btn')}
              </Button>
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            {filteredEvents.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={4}>
                <Box sx={{ position: 'relative' }}>
                  <EventPreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditEvent(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setEventDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
            {filteredEvents.length === 0 && (
              <Grid xs={12}>
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ py: 3, textAlign: 'center' }}
                >
                  {t('events.no_events')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2EventsPageView banner={banner} categories={categories} events={events} />
        </Box>
      )}

      {/* Event add/edit dialog */}
      <Dialog open={eventDialog} onClose={() => setEventDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{eventEditId ? t('common.edit') : t('events.add_event_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Spa2SimpleImageField
                  label={t('events.form_event_image')}
                  value={eventForm.image}
                  onChange={(url) => setEventForm((p) => ({ ...p, image: url }))}
                  height={140}
                />
                <TextField
                  label={t('events.form_event_title')}
                  fullWidth
                  size="small"
                  value={eventForm.title}
                  onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  select
                  label={t('events.form_event_category')}
                  fullWidth
                  size="small"
                  value={eventForm.category}
                  onChange={(e) => setEventForm((p) => ({ ...p, category: e.target.value }))}
                >
                  {realCategories.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('events.form_event_date')}
                    size="small"
                    value={eventForm.date}
                    onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))}
                    sx={{ flex: 1 }}
                    helperText="20/07/2026"
                  />
                  <TextField
                    label={t('events.form_event_time')}
                    size="small"
                    value={eventForm.time}
                    onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))}
                    sx={{ flex: 1 }}
                    helperText="9:00 – 12:00"
                  />
                </Stack>
                <TextField
                  label={t('events.form_event_location')}
                  fullWidth
                  size="small"
                  value={eventForm.location}
                  onChange={(e) => setEventForm((p) => ({ ...p, location: e.target.value }))}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('events.form_event_seats')}
                    type="number"
                    size="small"
                    value={eventForm.seats}
                    onChange={(e) => setEventForm((p) => ({ ...p, seats: Number(e.target.value) }))}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('events.form_event_booked')}
                    type="number"
                    size="small"
                    value={eventForm.booked}
                    onChange={(e) =>
                      setEventForm((p) => ({ ...p, booked: Number(e.target.value) }))
                    }
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('common.price_vnd')}
                    type="number"
                    size="small"
                    value={eventForm.price}
                    onChange={(e) => setEventForm((p) => ({ ...p, price: Number(e.target.value) }))}
                    sx={{ flex: 1 }}
                    helperText={t('events.form_event_price_help')}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <EventPreviewCard {...eventForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEventDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitEvent}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {eventEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!eventDeleteId}
        onClose={() => setEventDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteEvent}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
