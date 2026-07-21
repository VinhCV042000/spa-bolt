import type { Spa2AdjustableImage, Spa2Appointment } from 'src/_mock/_spa2';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { uuidv4 } from 'src/utils/uuidv4';
import { spa2AccountBanner, SPA2_ACCOUNT_CONTENT } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import { SPA2_INK, SPA2_TEAL, SPA2_CREAM, SPA2_TEAL_DARK } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/account page (Spa2AccountPageView)
// renders: banner + profile card (name/avatar/tier/points/sessions) +
// upcoming-appointments list — all sourced from SPA2_ACCOUNT_CONTENT so admin
// edits here actually propagate to the public member area.
// ─────────────────────────────────────────────────────────────────────────────

type AppointmentItem = Spa2Appointment & { id: string };

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_APPOINTMENT: Omit<AppointmentItem, 'id'> = {
  date: '',
  time: '',
  service: '',
  branch: '',
};

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

function ProfilePreviewCard({
  form,
}: {
  form: Pick<
    typeof SPA2_ACCOUNT_CONTENT,
    'memberName' | 'avatar' | 'membershipTier' | 'loyaltyPoints' | 'sessionsUsed' | 'sessionsTotal'
  >;
}) {
  return (
    <Spa2SoftCard sx={{ textAlign: 'center' }}>
      <Avatar src={form.avatar} sx={{ width: 88, height: 88, mx: 'auto', mb: 2 }} />
      <Typography variant="h6" sx={{ color: SPA2_INK }}>
        {form.memberName || '(Chưa đặt tên)'}
      </Typography>
      <Chip
        label={form.membershipTier || '—'}
        sx={{ bgcolor: SPA2_TEAL, color: 'white', my: 1.5 }}
      />
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>Điểm tích lũy</Typography>
          <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
            {Number(form.loyaltyPoints || 0).toLocaleString('vi-VN')}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>Lượt còn lại</Typography>
          <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
            {form.sessionsUsed} / {form.sessionsTotal}
          </Typography>
        </Stack>
      </Stack>
    </Spa2SoftCard>
  );
}

function AppointmentsPreviewCard({ items }: { items: AppointmentItem[] }) {
  return (
    <Spa2SoftCard>
      <Spa2SectionTitle eyebrow="Lịch hẹn" title="Sắp tới" align="left" />
      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Chưa có lịch hẹn nào.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {items.map((a) => (
            <Stack
              key={a.id}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}
            >
              <Box sx={{ minWidth: 64, textAlign: 'center' }}>
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Ngày</Typography>
                <Typography sx={{ fontWeight: 700, color: SPA2_TEAL_DARK }}>
                  {a.date || '--/--'}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Stack flexGrow={1}>
                <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                  {a.service || '(Chưa đặt tên)'}
                </Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                  {a.time} · {a.branch}
                </Typography>
              </Stack>
              <Button size="small" sx={{ color: SPA2_TEAL_DARK }}>
                Đổi lịch
              </Button>
            </Stack>
          ))}
        </Stack>
      )}
    </Spa2SoftCard>
  );
}

export function Spa2AccountManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2AccountBanner,
    image: { ...spa2AccountBanner.image },
  }));
  const [profile, setProfile] = useState(() => ({
    memberName: SPA2_ACCOUNT_CONTENT.memberName,
    avatar: SPA2_ACCOUNT_CONTENT.avatar,
    membershipTier: SPA2_ACCOUNT_CONTENT.membershipTier,
    loyaltyPoints: SPA2_ACCOUNT_CONTENT.loyaltyPoints,
    sessionsUsed: SPA2_ACCOUNT_CONTENT.sessionsUsed,
    sessionsTotal: SPA2_ACCOUNT_CONTENT.sessionsTotal,
  }));
  const [appointments, setAppointments] = useState<AppointmentItem[]>(() =>
    SPA2_ACCOUNT_CONTENT.appointments.map((a) => withId({ ...a }))
  );
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'profile' | 'preview'>('banner');

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    setDirty(true);
  };
  const updateProfile = (key: keyof typeof profile, value: string | number) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const addAppointment = () => {
    setAppointments((prev) => [...prev, withId({ ...EMPTY_APPOINTMENT })]);
    setDirty(true);
  };
  const updateAppointment = (id: string, key: keyof Spa2Appointment, value: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, [key]: value } : a)));
    setDirty(true);
  };
  const removeAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    setDirty(true);
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({ ...spa2AccountBanner, image: { ...spa2AccountBanner.image } });
    setProfile({
      memberName: SPA2_ACCOUNT_CONTENT.memberName,
      avatar: SPA2_ACCOUNT_CONTENT.avatar,
      membershipTier: SPA2_ACCOUNT_CONTENT.membershipTier,
      loyaltyPoints: SPA2_ACCOUNT_CONTENT.loyaltyPoints,
      sessionsUsed: SPA2_ACCOUNT_CONTENT.sessionsUsed,
      sessionsTotal: SPA2_ACCOUNT_CONTENT.sessionsTotal,
    });
    setAppointments(SPA2_ACCOUNT_CONTENT.appointments.map((a) => withId({ ...a })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('account.page_title')}
      description="Banner, hồ sơ thành viên và lịch hẹn sắp tới hiển thị trên trang Tài khoản công khai."
      breadcrumbLabel={t('nav.account')}
      publicPath={paths.spa2.account}
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
          label={t('account.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="profile"
          label={t('account.profile_section')}
          icon={<Iconify icon="solar:user-id-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - left: edit, right: live preview (same Spa2PageHero as public page) */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('account.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={220}
                  helperText={t('account.banner_image_help')}
                />
                <TextField
                  label={t('account.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('account.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('account.banner_subtitle')}
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

      {/* Hồ sơ thành viên + lịch hẹn sắp tới */}
      {tab === 'profile' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {t('account.profile_section')}
                </Typography>
                <Stack spacing={2}>
                  <Spa2ImageField
                    label={t('account.form_avatar')}
                    value={{ url: profile.avatar, focalX: 50, focalY: 50, zoom: 100 }}
                    onChange={(img) => updateProfile('avatar', img.url)}
                    height={160}
                  />
                  <TextField
                    label={t('account.form_name')}
                    value={profile.memberName}
                    onChange={(e) => updateProfile('memberName', e.target.value)}
                    fullWidth
                  />
                  <TextField
                    label={t('account.form_tier')}
                    value={profile.membershipTier}
                    onChange={(e) => updateProfile('membershipTier', e.target.value)}
                    fullWidth
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label={t('account.form_points')}
                      type="number"
                      value={profile.loyaltyPoints}
                      onChange={(e) => updateProfile('loyaltyPoints', Number(e.target.value))}
                      fullWidth
                    />
                    <TextField
                      label={t('account.form_sessions_used')}
                      type="number"
                      value={profile.sessionsUsed}
                      onChange={(e) => updateProfile('sessionsUsed', Number(e.target.value))}
                      fullWidth
                    />
                    <TextField
                      label={t('account.form_sessions_total')}
                      type="number"
                      value={profile.sessionsTotal}
                      onChange={(e) => updateProfile('sessionsTotal', Number(e.target.value))}
                      fullWidth
                    />
                  </Stack>
                </Stack>
              </Card>

              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="subtitle1">
                    {t('account.appointments_section')} ({appointments.length})
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={addAppointment}
                    sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
                  >
                    {t('account.appointment_add')}
                  </Button>
                </Stack>
                {appointments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {t('account.appointments_empty')}
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {appointments.map((a) => (
                      <Card key={a.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Stack direction="row" justifyContent="flex-end">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => removeAppointment(a.id)}
                          >
                            <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                          </IconButton>
                        </Stack>
                        <Stack direction="row" spacing={1.5}>
                          <TextField
                            label={t('account.form_date')}
                            value={a.date}
                            onChange={(e) => updateAppointment(a.id, 'date', e.target.value)}
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label={t('account.form_time')}
                            value={a.time}
                            onChange={(e) => updateAppointment(a.id, 'time', e.target.value)}
                            fullWidth
                            size="small"
                          />
                        </Stack>
                        <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
                          <TextField
                            label={t('account.form_service')}
                            value={a.service}
                            onChange={(e) => updateAppointment(a.id, 'service', e.target.value)}
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label={t('account.form_branch')}
                            value={a.branch}
                            onChange={(e) => updateAppointment(a.id, 'branch', e.target.value)}
                            fullWidth
                            size="small"
                          />
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                )}
              </Card>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
              {t('common.preview_btn')}
            </Typography>
            <Stack spacing={3}>
              <ProfilePreviewCard form={profile} />
              <AppointmentsPreviewCard items={appointments} />
            </Stack>
          </Grid>
        </Grid>
      )}

      {/* Live preview of the whole page — mirrors Spa2AccountPageView exactly */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PageHero
            image={banner.image.url}
            imageStyle={banner.image}
            eyebrow={banner.eyebrow}
            title={banner.title}
            subtitle={banner.subtitle}
          />
          <Box sx={{ py: { xs: 8, md: 12 } }}>
            <Container>
              <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                  <ProfilePreviewCard form={profile} />
                </Grid>
                <Grid xs={12} md={8}>
                  <AppointmentsPreviewCard items={appointments} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
