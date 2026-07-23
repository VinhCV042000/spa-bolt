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
  spa2EtiquetteDos,
  spa2EtiquetteDonts,
  spa2EtiquetteOffer,
  spa2EtiquetteGuides,
  type Spa2EtiquetteRule,
  spa2SpaEtiquetteBanner,
  type Spa2EtiquetteOffer,
  type Spa2EtiquetteGuide,
  type Spa2AdjustableImage,
  type Spa2SpaEtiquetteBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import {
  Spa2ContentPageHero3,
  Spa2SpaEtiquettePageView,
} from 'src/sections/spa2/view/spa2-content-pages3';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages3.tsx's
// Spa2SpaEtiquettePageView renders on the public /spa2/spa-etiquette page: the
// page banner, the 8-step first-timer guide grid, the Nên/Không nên (do/don't)
// lists and the first-timer offer card - read from and written back in the
// same shape as src/_mock/_spa2, the single source of truth shared with the
// public view. The "banner" tab reuses Spa2ContentPageHero3 and the "preview"
// tab reuses Spa2SpaEtiquettePageView itself, fed with the in-progress edited
// state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_GUIDE_FORM = { icon: 'solar:clock-circle-bold-duotone', title: '', desc: '' };

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

// Mirrors a single numbered step card in "8 điều nên biết khi đến spa".
function GuidePreviewCard({ icon, title, desc, index }: Spa2EtiquetteGuide & { index: number }) {
  return (
    <Card
      sx={{ p: 2.5, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}`, boxShadow: 'none' }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </Box>
        <Iconify
          icon={icon || 'solar:clock-circle-bold-duotone'}
          width={20}
          sx={{ color: SPA2_TEAL }}
        />
      </Stack>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, mb: 0.75, fontSize: 14 }}>
        {title || 'Tiêu đề bước'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {desc || 'Mô tả ngắn…'}
      </Typography>
    </Card>
  );
}

// Mirrors a single row in the Nên làm / Không nên cards.
function RulePreviewRow({
  text,
  positive,
  last,
}: {
  text: string;
  positive: boolean;
  last: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        px: 2.5,
        py: 1.5,
        bgcolor: positive ? '#F1F8E9' : '#FFF5F5',
        borderBottom: last ? 'none' : `1px solid ${positive ? '#E8F5E9' : '#FFEBEE'}`,
      }}
    >
      <Iconify
        icon={positive ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
        width={15}
        sx={{ color: positive ? '#2E7D32' : '#C62828', flexShrink: 0 }}
      />
      <Typography sx={{ fontSize: 13.5, color: SPA2_INK }}>{text || '—'}</Typography>
    </Stack>
  );
}

export function Spa2SpaEtiquetteManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2SpaEtiquetteBanner>(() => ({
    ...spa2SpaEtiquetteBanner,
    image: { ...spa2SpaEtiquetteBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'guides' | 'rules' | 'offer' | 'preview'>('banner');
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

  // ---- Guides ----
  const [guides, setGuides] = useState<Spa2EtiquetteGuide[]>(() =>
    spa2EtiquetteGuides.map((g) => ({ ...g }))
  );
  const [guideForm, setGuideForm] = useState(EMPTY_GUIDE_FORM);
  const [guideDialog, setGuideDialog] = useState(false);
  const [guideEditId, setGuideEditId] = useState<string | null>(null);
  const [guideDeleteId, setGuideDeleteId] = useState<string | null>(null);

  const openCreateGuide = () => {
    setGuideForm(EMPTY_GUIDE_FORM);
    setGuideEditId(null);
    setGuideDialog(true);
  };
  const openEditGuide = (item: Spa2EtiquetteGuide) => {
    setGuideForm({ icon: item.icon, title: item.title, desc: item.desc });
    setGuideEditId(item.id);
    setGuideDialog(true);
  };
  const submitGuide = () => {
    if (guideEditId) {
      setGuides((prev) => prev.map((g) => (g.id === guideEditId ? { ...g, ...guideForm } : g)));
    } else {
      setGuides((prev) => [...prev, withId(guideForm)]);
    }
    setGuideDialog(false);
    markDirty();
  };
  const confirmDeleteGuide = () => {
    setGuides((prev) => prev.filter((g) => g.id !== guideDeleteId));
    setGuideDeleteId(null);
    markDirty();
  };

  // ---- Rules (dos / donts) ----
  const [dos, setDos] = useState<Spa2EtiquetteRule[]>(() =>
    spa2EtiquetteDos.map((d) => ({ ...d }))
  );
  const [donts, setDonts] = useState<Spa2EtiquetteRule[]>(() =>
    spa2EtiquetteDonts.map((d) => ({ ...d }))
  );
  const updateRule = (list: 'dos' | 'donts', idx: number, text: string) => {
    const setter = list === 'dos' ? setDos : setDonts;
    setter((prev) => prev.map((r, i) => (i === idx ? { ...r, text } : r)));
    markDirty();
  };
  const addRule = (list: 'dos' | 'donts') => {
    const setter = list === 'dos' ? setDos : setDonts;
    setter((prev) => [...prev, withId({ text: '' })]);
    markDirty();
  };
  const removeRule = (list: 'dos' | 'donts', idx: number) => {
    const setter = list === 'dos' ? setDos : setDonts;
    setter((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };

  // ---- Offer ----
  const [offer, setOffer] = useState<Spa2EtiquetteOffer>(() => ({ ...spa2EtiquetteOffer }));
  const updateOffer = (key: keyof Spa2EtiquetteOffer, value: string) => {
    setOffer((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2SpaEtiquetteBanner, image: { ...spa2SpaEtiquetteBanner.image } });
    setGuides(spa2EtiquetteGuides.map((g) => ({ ...g })));
    setDos(spa2EtiquetteDos.map((d) => ({ ...d })));
    setDonts(spa2EtiquetteDonts.map((d) => ({ ...d })));
    setOffer({ ...spa2EtiquetteOffer });
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('spa_etiquette.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.spa_etiquette')}
      publicPath={paths.spa2.spaEtiquette}
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
          label={t('spa_etiquette.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="guides"
          label={t('spa_etiquette.guides_section')}
          icon={<Iconify icon="solar:checklist-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="rules"
          label={t('spa_etiquette.rules_section')}
          icon={<Iconify icon="solar:shield-check-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="offer"
          label={t('spa_etiquette.offer_section')}
          icon={<Iconify icon="solar:gift-bold-duotone" width={20} />}
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
              title={t('spa_etiquette.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('spa_etiquette.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('spa_etiquette.banner_image_help')}
                />
                <TextField
                  label={t('spa_etiquette.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('spa_etiquette.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('spa_etiquette.banner_subtitle')}
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
                <Spa2ContentPageHero3
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

      {/* Guides */}
      {tab === 'guides' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('spa_etiquette.guides_section')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={openCreateGuide}
              sx={{
                bgcolor: SPA2_TEAL,
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
                borderRadius: 999,
                px: 3,
              }}
            >
              {t('spa_etiquette.add_guide_btn')}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {guides.map((item, idx) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <GuidePreviewCard {...item} index={idx} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditGuide(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setGuideDeleteId(item.id)}
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

      {/* Rules (Nên / Không nên) */}
      {tab === 'rules' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('spa_etiquette.dos_section')}
              icon="solar:check-circle-bold-duotone"
              action={
                <Button
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => addRule('dos')}
                >
                  {t('spa_etiquette.add_rule_btn')}
                </Button>
              }
            >
              <Stack spacing={1.5}>
                {dos.map((d, idx) => (
                  <Stack key={d.id} direction="row" spacing={1} alignItems="center">
                    <TextField
                      size="small"
                      fullWidth
                      value={d.text}
                      onChange={(e) => updateRule('dos', idx, e.target.value)}
                    />
                    <IconButton size="small" color="error" onClick={() => removeRule('dos', idx)}>
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('spa_etiquette.donts_section')}
              icon="solar:close-circle-bold-duotone"
              action={
                <Button
                  size="small"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={() => addRule('donts')}
                >
                  {t('spa_etiquette.add_rule_btn')}
                </Button>
              }
            >
              <Stack spacing={1.5}>
                {donts.map((d, idx) => (
                  <Stack key={d.id} direction="row" spacing={1} alignItems="center">
                    <TextField
                      size="small"
                      fullWidth
                      value={d.text}
                      onChange={(e) => updateRule('donts', idx, e.target.value)}
                    />
                    <IconButton size="small" color="error" onClick={() => removeRule('donts', idx)}>
                      <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: '1.5px solid #A5D6A7',
                      boxShadow: 'none',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ bgcolor: '#2E7D32', p: 2, color: 'white' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Iconify icon="solar:check-circle-bold" width={20} />
                        <Typography sx={{ fontWeight: 600 }}>Nên làm</Typography>
                      </Stack>
                    </Box>
                    <Stack spacing={0}>
                      {dos.map((d, i) => (
                        <RulePreviewRow
                          key={d.id}
                          text={d.text}
                          positive
                          last={i === dos.length - 1}
                        />
                      ))}
                    </Stack>
                  </Card>
                </Grid>
                <Grid xs={12} md={6}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      border: '1.5px solid #FFCDD2',
                      boxShadow: 'none',
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ bgcolor: '#C62828', p: 2, color: 'white' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Iconify icon="solar:close-circle-bold" width={20} />
                        <Typography sx={{ fontWeight: 600 }}>Không nên</Typography>
                      </Stack>
                    </Box>
                    <Stack spacing={0}>
                      {donts.map((d, i) => (
                        <RulePreviewRow
                          key={d.id}
                          text={d.text}
                          positive={false}
                          last={i === donts.length - 1}
                        />
                      ))}
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Offer */}
      {tab === 'offer' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('spa_etiquette.offer_section')} icon="solar:gift-bold-duotone">
              <Stack spacing={2}>
                <TextField
                  label={t('spa_etiquette.form_offer_title')}
                  fullWidth
                  size="small"
                  value={offer.title}
                  onChange={(e) => updateOffer('title', e.target.value)}
                />
                <TextField
                  label={t('spa_etiquette.form_offer_description')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={offer.description}
                  onChange={(e) => updateOffer('description', e.target.value)}
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('spa_etiquette.form_offer_discount')}
                    fullWidth
                    size="small"
                    value={offer.discountLabel}
                    onChange={(e) => updateOffer('discountLabel', e.target.value)}
                  />
                  <TextField
                    label={t('spa_etiquette.form_offer_code')}
                    fullWidth
                    size="small"
                    value={offer.code}
                    onChange={(e) => updateOffer('code', e.target.value)}
                  />
                </Stack>
                <TextField
                  label={t('spa_etiquette.form_offer_button')}
                  fullWidth
                  size="small"
                  value={offer.buttonLabel}
                  onChange={(e) => updateOffer('buttonLabel', e.target.value)}
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <Card
                sx={{
                  borderRadius: 5,
                  border: `2px solid ${SPA2_TEAL}`,
                  boxShadow: '0 16px 40px rgba(46,139,122,0.15)',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ bgcolor: SPA2_TEAL, p: 3, color: 'white', textAlign: 'center' }}>
                  <Iconify icon="solar:gift-bold" width={36} sx={{ mb: 1 }} />
                  <Typography variant="h5">{offer.title || 'Tiêu đề ưu đãi'}</Typography>
                </Box>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    {offer.description || 'Mô tả ưu đãi…'}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: SPA2_CREAM,
                      border: `1.5px dashed ${SPA2_TEAL}`,
                      borderRadius: 3,
                      p: 2,
                      mb: 3,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 700, fontSize: 22, color: SPA2_TEAL, letterSpacing: 3 }}
                    >
                      {offer.code || 'CODE'}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderRadius: 99,
                      py: 1.4,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      textAlign: 'center',
                    }}
                  >
                    {offer.buttonLabel || 'Nút hành động'}
                  </Box>
                </Box>
              </Card>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2SpaEtiquettePageView
            banner={banner}
            guides={guides}
            dos={dos}
            donts={donts}
            offer={offer}
          />
        </Box>
      )}

      {/* Guide add/edit dialog */}
      <Dialog open={guideDialog} onClose={() => setGuideDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {guideEditId ? t('common.edit') : t('spa_etiquette.add_guide_btn')}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('spa_etiquette.form_icon')}
                  fullWidth
                  size="small"
                  value={guideForm.icon}
                  onChange={(e) => setGuideForm((p) => ({ ...p, icon: e.target.value }))}
                  helperText="solar:clock-circle-bold-duotone"
                />
                <TextField
                  label={t('spa_etiquette.form_guide_title')}
                  fullWidth
                  size="small"
                  value={guideForm.title}
                  onChange={(e) => setGuideForm((p) => ({ ...p, title: e.target.value }))}
                />
                <TextField
                  label={t('spa_etiquette.form_guide_desc')}
                  fullWidth
                  multiline
                  minRows={3}
                  value={guideForm.desc}
                  onChange={(e) => setGuideForm((p) => ({ ...p, desc: e.target.value }))}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <GuidePreviewCard
                  id={guideEditId ?? 'preview'}
                  icon={guideForm.icon}
                  title={guideForm.title}
                  desc={guideForm.desc}
                  index={
                    guideEditId ? guides.findIndex((g) => g.id === guideEditId) : guides.length
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGuideDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitGuide}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {guideEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!guideDeleteId}
        onClose={() => setGuideDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteGuide}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
