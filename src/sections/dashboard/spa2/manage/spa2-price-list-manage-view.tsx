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
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import { Spa2PriceListPageView } from 'src/sections/spa2/view/spa2-content-pages9';
import {
  SPA2_TEAL,
  spa2Services,
  SPA2_TEAL_DARK,
  spa2Treatments,
  SPA2_CREAM_DARK,
  spa2PriceListBanner,
  type Spa2PriceListBanner,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages the banner/copy fields rendered by src/sections/spa2/view/
// spa2-content-pages9.tsx's Spa2PriceListPageView on the public /spa2/
// price-list page: the teal hero (eyebrow/title/subtitle/print button label),
// the two category labels used to group items, and the VAT/disclaimer note
// shown in the info alert under the price table.
//
// Unlike most spa2 manage views, this page has NO item list of its own: the
// public page derives its price table by combining spa2Services and
// spa2Treatments (both separately managed via the Services and Treatments
// admin pages). This view intentionally does not duplicate or re-manage
// those items - it only edits the banner/copy and links admins over to the
// pages where line items and prices actually live.
// -----------------------------------------------------------------------------

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

// Mirrors the teal PageHero rendered by Spa2PriceListPageView on the public
// page - eyebrow/title/subtitle plus the print button, using the same teal
// brand tokens as the rest of the spa2 admin previews.
function BannerPreview({ banner }: { banner: Spa2PriceListBanner }) {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${SPA2_TEAL_DARK} 0%, ${SPA2_TEAL} 100%)`,
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, maxWidth: 460 }}>
          {banner.subtitle}
        </Typography>
        <Button
          startIcon={<Iconify icon="solar:printer-bold" />}
          sx={{
            borderRadius: 99,
            px: 3,
            bgcolor: 'common.white',
            color: SPA2_TEAL_DARK,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
          }}
        >
          {banner.printLabel || '(...)'}
        </Button>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function Spa2PriceListManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2PriceListBanner>(() => ({ ...spa2PriceListBanner }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  const updateBanner = (key: keyof Spa2PriceListBanner, value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2PriceListBanner });
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('price_list.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.price_list')}
      publicPath={paths.spa2.priceList}
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
          label={t('price_list.tab_banner')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
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
            <Stack spacing={3}>
              <Alert severity="info" sx={{ borderRadius: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {t('price_list.items_note_title')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {t('price_list.items_note_desc', {
                    servicesCount: spa2Services.length,
                    treatmentsCount: spa2Treatments.length,
                  })}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    component={RouterLink}
                    href={paths.dashboard.spa2.services}
                    size="small"
                    startIcon={<Iconify icon="solar:spa-bold-duotone" width={16} />}
                    sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}
                  >
                    {t('price_list.go_to_services')}
                  </Button>
                  <Button
                    component={RouterLink}
                    href={paths.dashboard.spa2.treatments}
                    size="small"
                    startIcon={<Iconify icon="solar:leaf-bold-duotone" width={16} />}
                    sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}
                  >
                    {t('price_list.go_to_treatments')}
                  </Button>
                </Stack>
              </Alert>

              <SectionCard
                title={t('price_list.tab_banner')}
                icon="solar:gallery-wide-bold-duotone"
              >
                <Stack spacing={2}>
                  <TextField
                    label={t('price_list.banner_eyebrow')}
                    value={banner.eyebrow}
                    onChange={(e) => updateBanner('eyebrow', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label={t('price_list.banner_title')}
                    value={banner.title}
                    onChange={(e) => updateBanner('title', e.target.value)}
                    fullWidth
                    multiline
                    minRows={2}
                  />
                  <TextField
                    label={t('price_list.banner_subtitle')}
                    value={banner.subtitle}
                    onChange={(e) => updateBanner('subtitle', e.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                  />
                  <TextField
                    label={t('price_list.print_label')}
                    value={banner.printLabel}
                    onChange={(e) => updateBanner('printLabel', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label={t('price_list.service_category_label')}
                    value={banner.serviceCategoryLabel}
                    onChange={(e) => updateBanner('serviceCategoryLabel', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label={t('price_list.treatment_category_label')}
                    value={banner.treatmentCategoryLabel}
                    onChange={(e) => updateBanner('treatmentCategoryLabel', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label={t('price_list.note_label')}
                    value={banner.note}
                    onChange={(e) => updateBanner('note', e.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                    helperText={t('price_list.note_helper')}
                  />
                </Stack>
              </SectionCard>
            </Stack>
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

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PriceListPageView banner={banner} />
        </Box>
      )}
    </Spa2ManageShell>
  );
}
