import type { ReactNode } from 'react';
import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { spa2ContactInfo, spa2ContactBanner } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';
import { Spa2PageHero, Spa2SoftCard, Spa2SectionTitle } from 'src/sections/spa2/view/spa2-content-pages';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages.tsx's
// Spa2ContactPageView renders on the public /spa2/contact page: the page
// banner and the contact info cards (hotline/email/zalo/address) - read
// from and written back in the same shape as src/_mock/_spa2 (spa2ContactInfo
// + spa2ContactBanner), the single source of truth shared with the public
// view. The "banner"/"info" tabs reuse Spa2PageHero/Spa2SoftCard directly
// (same components the public page renders) so the right-hand live preview
// can never visually drift from reality.
// -----------------------------------------------------------------------------

type TabKey = 'banner' | 'info' | 'preview';

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

export function Spa2ContactManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2ContactBanner,
    image: { ...spa2ContactBanner.image },
  }));
  const [info, setInfo] = useState(() => ({ ...spa2ContactInfo }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<TabKey>('banner');
  const markDirty = () => setDirty(true);

  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  const updateInfo = (key: keyof typeof spa2ContactInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ContactBanner, image: { ...spa2ContactBanner.image } });
    setInfo({ ...spa2ContactInfo });
    setDirty(false);
  };

  // Matches Spa2ContactPageView's `items` exactly (same 4 fields, same order).
  const items = [
    { icon: 'solar:phone-bold', label: 'Hotline', value: info.hotline },
    { icon: 'solar:letter-bold', label: 'Email', value: info.email },
    { icon: 'solar:chat-round-dots-bold', label: 'Zalo', value: info.zalo },
    { icon: 'solar:map-point-bold', label: 'Trụ sở', value: info.address },
  ];

  const contactFormCard = (
    <Spa2SoftCard>
      <Spa2SectionTitle eyebrow="Gửi lời nhắn" title="Form liên hệ" align="left" />
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label="Họ và tên" disabled />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label="Số điện thoại" disabled />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth label="Email" disabled />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth label="Chủ đề" disabled />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth multiline rows={4} label="Nội dung" disabled />
        </Grid>
        <Grid xs={12}>
          <Button
            fullWidth
            size="large"
            disabled
            sx={{
              borderRadius: 999,
              py: 1.5,
              bgcolor: SPA2_TEAL,
              color: 'white',
              '&.Mui-disabled': { bgcolor: SPA2_TEAL, color: 'white', opacity: 0.85 },
            }}
          >
            Gửi lời nhắn
          </Button>
        </Grid>
      </Grid>
    </Spa2SoftCard>
  );

  return (
    <Spa2ManageShell
      title={t('contact.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.contact')}
      publicPath={paths.spa2.contact}
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
        onChange={(_, v: TabKey) => setTab(v)}
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
          label={t('contact.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="info"
          label={t('contact.info_section')}
          icon={<Iconify icon="solar:phone-bold-duotone" width={20} />}
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
            <SectionCard title={t('contact.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('contact.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('contact.banner_image_help')}
                />
                <TextField
                  label={t('contact.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('contact.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('contact.banner_subtitle')}
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
                <Spa2PageHero
                  image={banner.image.url}
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

      {/* Contact info - left: edit, right: live preview (same Spa2SoftCard cards as public page) */}
      {tab === 'info' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('contact.info_section')} icon="solar:phone-bold-duotone">
              <Grid container spacing={2.5}>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_hotline')}
                    value={info.hotline}
                    onChange={(e) => updateInfo('hotline', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:phone-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_email')}
                    value={info.email}
                    onChange={(e) => updateInfo('email', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:letter-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_zalo')}
                    value={info.zalo}
                    onChange={(e) => updateInfo('zalo', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:chat-round-dots-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    label={t('contact.form_working_hours')}
                    value={info.workingHours}
                    onChange={(e) => updateInfo('workingHours', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:clock-circle-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label={t('contact.form_address')}
                    value={info.address}
                    onChange={(e) => updateInfo('address', e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon="solar:map-point-bold"
                          width={18}
                          sx={{ color: SPA2_TEAL, mr: 1 }}
                        />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Stack spacing={2}>
                {items.map((i) => (
                  <Spa2SoftCard key={i.label}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: SPA2_CREAM,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Iconify icon={i.icon} sx={{ color: SPA2_TEAL }} width={24} />
                      </Box>
                      <Stack>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {i.label}
                        </Typography>
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                          {i.value}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Spa2SoftCard>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Full-page live preview - pixel-for-pixel same layout/order as the public /spa2/contact page */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Box sx={{ bgcolor: 'background.default' }}>
            <Spa2PageHero
              image={banner.image.url}
              imageStyle={banner.image}
              eyebrow={banner.eyebrow}
              title={banner.title}
              subtitle={banner.subtitle}
            />
            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Container>
                <Grid container spacing={5}>
                  <Grid xs={12} md={5}>
                    <Stack spacing={2}>
                      {items.map((i) => (
                        <Spa2SoftCard key={i.label}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                bgcolor: SPA2_CREAM,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Iconify icon={i.icon} sx={{ color: SPA2_TEAL }} width={24} />
                            </Box>
                            <Stack>
                              <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                                {i.label}
                              </Typography>
                              <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                                {i.value}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Spa2SoftCard>
                      ))}
                    </Stack>
                  </Grid>
                  <Grid xs={12} md={7}>
                    {contactFormCard}
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
