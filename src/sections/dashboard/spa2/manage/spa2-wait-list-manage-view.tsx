import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
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

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2WaitlistPageView } from 'src/sections/spa2/view/spa2-content-pages9';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  spa2WaitlistSlots,
  spa2WaitlistBanner,
  type Spa2WaitlistSlot,
  type Spa2WaitlistBanner,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages9.tsx's
// Spa2WaitlistPageView renders on the public /spa2/wait-list page: the hero
// banner (eyebrow/title/subtitle), the info alert (infoNote) and the list of
// full waitlist slots (service/branch/date/time/waiting count) - read from and
// written back in the same shape as src/_mock/_spa2, the single source of
// truth shared with the public view. The "Tham gia chờ" join flow and the
// flexible opt-in box on the public page are purely client-derived
// interactive demo state and are intentionally not mocked/editable here; the
// flexible box's service dropdown is derived automatically from the slots'
// `service` values.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_SLOT: Omit<Spa2WaitlistSlot, 'id'> = {
  service: '',
  branch: '',
  date: '',
  time: '',
  waiting: 0,
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

// Mirrors the hero + info-alert block rendered at the top of the public
// Spa2WaitlistPageView page: eyebrow/title/subtitle over a cream background,
// followed by the "thông báo ưu tiên" info alert (banner.infoNote).
function BannerPreview({ banner }: { banner: Spa2WaitlistBanner }) {
  return (
    <Box sx={{ bgcolor: 'background.neutral', py: { xs: 5, md: 6 }, px: 3 }}>
      <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 420 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
      <Alert severity="info" icon={<Iconify icon="solar:bell-bold" />} sx={{ borderRadius: 3 }}>
        {banner.infoNote}
      </Alert>
    </Box>
  );
}

// Mirrors one waitlist slot card exactly as rendered in the public list:
// calendar icon, service name, branch/date/time meta, "N người đang chờ"
// chip and the (here inert) "Tham gia chờ" button.
function SlotPreviewCard({ slot }: { slot: Omit<Spa2WaitlistSlot, 'id'> }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: 'background.neutral',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Iconify icon="solar:calendar-mark-bold" width={24} sx={{ color: SPA2_TEAL }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
            {slot.service || '(Chưa đặt tên dịch vụ)'}
          </Typography>
          <Stack direction="row" spacing={1.5} flexWrap="wrap">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Iconify icon="solar:map-point-bold" width={13} sx={{ color: SPA2_TEAL }} />
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                {slot.branch}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Iconify icon="solar:calendar-bold" width={13} sx={{ color: SPA2_TEAL }} />
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                {slot.date} · {slot.time}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Chip
          label={`${slot.waiting} người đang chờ`}
          size="small"
          sx={{ bgcolor: '#FEF3E2', color: '#854F0B' }}
        />
        <Button
          disabled
          sx={{
            borderRadius: 99,
            px: 2.5,
            bgcolor: SPA2_TEAL,
            color: 'white',
            flexShrink: 0,
            '&.Mui-disabled': { bgcolor: SPA2_TEAL, color: 'white', opacity: 0.6 },
          }}
        >
          Tham gia chờ
        </Button>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2WaitListManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2WaitlistBanner>(() => ({ ...spa2WaitlistBanner }));
  const [slots, setSlots] = useState<Spa2WaitlistSlot[]>(() =>
    spa2WaitlistSlots.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'slots' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: keyof Spa2WaitlistBanner, value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Slots CRUD ----
  const [slotDialog, setSlotDialog] = useState(false);
  const [slotEditId, setSlotEditId] = useState<string | null>(null);
  const [slotForm, setSlotForm] = useState<Omit<Spa2WaitlistSlot, 'id'>>(EMPTY_SLOT);
  const [slotDeleteId, setSlotDeleteId] = useState<string | null>(null);

  const openCreateSlot = () => {
    setSlotForm(EMPTY_SLOT);
    setSlotEditId(null);
    setSlotDialog(true);
  };
  const openEditSlot = (item: Spa2WaitlistSlot) => {
    const { id, ...rest } = item;
    setSlotForm({ ...rest });
    setSlotEditId(id);
    setSlotDialog(true);
  };
  const submitSlot = () => {
    const next: Omit<Spa2WaitlistSlot, 'id'> = {
      ...slotForm,
      waiting: Number(slotForm.waiting),
    };
    if (slotEditId) {
      setSlots((prev) =>
        prev.map((item) => (item.id === slotEditId ? { ...item, ...next } : item))
      );
    } else {
      setSlots((prev) => [...prev, withId(next)]);
    }
    setSlotDialog(false);
    markDirty();
  };
  const confirmDeleteSlot = () => {
    setSlots((prev) => prev.filter((item) => item.id !== slotDeleteId));
    setSlotDeleteId(null);
    markDirty();
  };
  const reorderSlots = (next: Spa2WaitlistSlot[]) => {
    setSlots(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2WaitlistBanner });
    setSlots(spa2WaitlistSlots.map((item) => ({ ...item })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('wait_list.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.wait_list')}
      publicPath={paths.spa2.waitList}
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
          label={t('wait_list.tab_banner')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="slots"
          label={t('wait_list.tab_slots')}
          icon={<Iconify icon="solar:clock-circle-bold-duotone" width={20} />}
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
            <SectionCard title={t('wait_list.tab_banner')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <TextField
                  label={t('wait_list.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('wait_list.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('wait_list.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
                <TextField
                  label={t('wait_list.banner_info_note')}
                  value={banner.infoNote}
                  onChange={(e) => updateBanner('infoNote', e.target.value)}
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
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Slots */}
      {tab === 'slots' && (
        <SectionCard
          title={t('wait_list.tab_slots')}
          icon="solar:clock-circle-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateSlot}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('wait_list.add_slot_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('wait_list.drag_hint')}
          </Typography>
          {slots.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('wait_list.no_slots')}
            </Typography>
          )}
          <Spa2SortableGrid items={slots} onReorder={reorderSlots}>
            <Stack spacing={2}>
              {slots.map((item) => (
                <Spa2SortableItem key={item.id} id={item.id}>
                  {(sortable) => (
                    <Box sx={{ position: 'relative' }}>
                      <SlotPreviewCard slot={item} />
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
                          onClick={() => openEditSlot(item)}
                          sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:pen-bold" width={14} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setSlotDeleteId(item.id)}
                          sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                        </IconButton>
                      </Stack>
                    </Box>
                  )}
                </Spa2SortableItem>
              ))}
            </Stack>
          </Spa2SortableGrid>
        </SectionCard>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2WaitlistPageView banner={banner} slots={slots} />
        </Box>
      )}

      {/* Slot add/edit dialog */}
      <Dialog open={slotDialog} onClose={() => setSlotDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {slotEditId ? t('common.edit') : t('wait_list.add_slot_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('wait_list.form_slot_service')}
                  value={slotForm.service}
                  onChange={(e) => setSlotForm((p) => ({ ...p, service: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('wait_list.form_slot_branch')}
                  value={slotForm.branch}
                  onChange={(e) => setSlotForm((p) => ({ ...p, branch: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('wait_list.form_slot_date')}
                    value={slotForm.date}
                    onChange={(e) => setSlotForm((p) => ({ ...p, date: e.target.value }))}
                    placeholder="dd/mm/yyyy"
                    fullWidth
                  />
                  <TextField
                    label={t('wait_list.form_slot_time')}
                    value={slotForm.time}
                    onChange={(e) => setSlotForm((p) => ({ ...p, time: e.target.value }))}
                    placeholder="hh:mm"
                    fullWidth
                  />
                </Stack>
                <TextField
                  label={t('wait_list.form_slot_waiting')}
                  type="number"
                  value={slotForm.waiting}
                  onChange={(e) => setSlotForm((p) => ({ ...p, waiting: Number(e.target.value) }))}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <SlotPreviewCard slot={slotForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSlotDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitSlot}
            disabled={!slotForm.service}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {slotEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!slotDeleteId}
        onClose={() => setSlotDeleteId(null)}
        title={t('wait_list.slot_delete_title')}
        content={t('wait_list.slot_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteSlot}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
