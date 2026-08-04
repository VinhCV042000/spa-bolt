import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';

import { useTranslate } from 'src/locales';
import {
  spa2Graduates,
  type Spa2Graduate,
  spa2CompletionPrograms,
  spa2CertificateWallBanner,
  type Spa2CompletionProgram,
  type Spa2CertificateWallBanner,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2CertificateWallPageView } from 'src/sections/spa2/view/spa2-content-pages8';
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
import { Spa2DragHandle, Spa2SortableGrid, Spa2SortableItem } from './spa2-sortable-grid';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages8.tsx's
// Spa2CertificateWallPageView renders on the public /spa2/certificate-wall
// page: the cream PageHero banner (eyebrow/title/subtitle), the "Chương
// trình" completion-program filter cards (icon/name/graduate count/color)
// and the "Tường vinh danh học viên" graduate wall (avatar/name/program/
// result/date) - read from and written back in the same shape as
// src/_mock/_spa2, the single source of truth shared with the public view.
// The "Tra cứu chứng nhận" name-lookup card and the click-to-filter-by-
// program interaction on the public page are purely client-derived
// interactive demo state and are intentionally not mocked/editable here.
// This page celebrates CUSTOMERS who completed wellness programs (a wall
// of fame with graduate photos/testimonials) - not business compliance
// certificates (ISO/HACCP).
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const EMPTY_PROGRAM: Omit<Spa2CompletionProgram, 'id'> = {
  name: '',
  graduates: 0,
  icon: 'solar:leaf-bold-duotone',
  color: '#2E8B7A',
};

const EMPTY_GRADUATE: Omit<Spa2Graduate, 'id'> = {
  name: '',
  program: '',
  date: '',
  avatar: '',
  result: '',
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

// Mirrors the cream PageHero hero section rendered by
// Spa2CertificateWallPageView on the public page - eyebrow/title/subtitle
// centered on the SPA2_CREAM background (a lightweight/static mirror; the
// public hero's decorative image and blob are omitted here).
function BannerPreview({ banner }: { banner: Spa2CertificateWallBanner }) {
  return (
    <Box sx={{ bgcolor: SPA2_CREAM, py: { xs: 6, md: 8 }, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center" sx={{ px: 3 }}>
        <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
          {banner.eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
          {banner.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, maxWidth: 480 }}>
          {banner.subtitle}
        </Typography>
      </Stack>
    </Box>
  );
}

// Mirrors one completion-program filter card exactly as rendered in the
// public "Chương trình" grid (see Spa2CertificateWallPageView): circular
// icon badge tinted by program.color at 15% opacity, name, graduate count
// in program.color, "học viên tốt nghiệp" label.
function ProgramPreviewCard({ program }: { program: Omit<Spa2CompletionProgram, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        border: `2px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          bgcolor: `${program.color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1.5,
        }}
      >
        <Iconify
          icon={program.icon || 'solar:leaf-bold-duotone'}
          width={28}
          sx={{ color: program.color }}
        />
      </Box>
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14, mb: 0.5 }}>
        {program.name || '(Chưa đặt tên)'}
      </Typography>
      <Typography sx={{ fontWeight: 700, color: program.color, fontSize: 22 }}>
        {program.graduates}
      </Typography>
      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>học viên tốt nghiệp</Typography>
    </Card>
  );
}

// Mirrors one graduate wall card exactly as rendered in the public "Tường
// vinh danh học viên" grid (see Spa2CertificateWallPageView): small
// medal-ribbon icon top-right, circular avatar (72px, teal-light border),
// name, program chip, quoted result text, completion date.
function GraduatePreviewCard({ graduate }: { graduate: Omit<Spa2Graduate, 'id'> }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 3,
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
        <Iconify icon="solar:medal-ribbons-star-bold" width={22} sx={{ color: '#EF9F27' }} />
      </Box>
      <Avatar
        src={graduate.avatar}
        sx={{ width: 72, height: 72, mx: 'auto', mb: 1.5, border: `3px solid ${SPA2_TEAL_LIGHT}` }}
      />
      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 14 }}>
        {graduate.name || '(Chưa đặt tên)'}
      </Typography>
      <Chip
        label={graduate.program || '—'}
        size="small"
        sx={{ mt: 0.75, mb: 1, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontSize: 10 }}
      />
      <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.6, mb: 0.5 }}>
        &ldquo;{graduate.result}&rdquo;
      </Typography>
      <Typography sx={{ fontSize: 11, color: 'text.disabled' }}>
        Hoàn thành {graduate.date}
      </Typography>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function Spa2CertificateWallManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState<Spa2CertificateWallBanner>(() => ({
    ...spa2CertificateWallBanner,
  }));
  const [programs, setPrograms] = useState<Spa2CompletionProgram[]>(() =>
    spa2CompletionPrograms.map((item) => ({ ...item }))
  );
  const [graduates, setGraduates] = useState<Spa2Graduate[]>(() =>
    spa2Graduates.map((item) => ({ ...item }))
  );

  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'programs' | 'graduates' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };

  // ---- Programs CRUD ----
  const [programDialog, setProgramDialog] = useState(false);
  const [programEditId, setProgramEditId] = useState<string | null>(null);
  const [programForm, setProgramForm] = useState<Omit<Spa2CompletionProgram, 'id'>>(EMPTY_PROGRAM);
  const [programDeleteId, setProgramDeleteId] = useState<string | null>(null);

  const openCreateProgram = () => {
    setProgramForm(EMPTY_PROGRAM);
    setProgramEditId(null);
    setProgramDialog(true);
  };
  const openEditProgram = (item: Spa2CompletionProgram) => {
    const { id, ...rest } = item;
    setProgramForm({ ...rest });
    setProgramEditId(id);
    setProgramDialog(true);
  };
  const submitProgram = () => {
    const next: Omit<Spa2CompletionProgram, 'id'> = {
      ...programForm,
      graduates: Number(programForm.graduates),
    };
    if (programEditId) {
      setPrograms((prev) =>
        prev.map((item) => (item.id === programEditId ? { ...item, ...next } : item))
      );
    } else {
      setPrograms((prev) => [...prev, withId(next)]);
    }
    setProgramDialog(false);
    markDirty();
  };
  const confirmDeleteProgram = () => {
    setPrograms((prev) => prev.filter((item) => item.id !== programDeleteId));
    setProgramDeleteId(null);
    markDirty();
  };
  const reorderPrograms = (next: Spa2CompletionProgram[]) => {
    setPrograms(next);
    markDirty();
  };

  // ---- Graduates CRUD ----
  const [graduateDialog, setGraduateDialog] = useState(false);
  const [graduateEditId, setGraduateEditId] = useState<string | null>(null);
  const [graduateForm, setGraduateForm] = useState<Omit<Spa2Graduate, 'id'>>(EMPTY_GRADUATE);
  const [graduateDeleteId, setGraduateDeleteId] = useState<string | null>(null);

  const openCreateGraduate = () => {
    setGraduateForm(EMPTY_GRADUATE);
    setGraduateEditId(null);
    setGraduateDialog(true);
  };
  const openEditGraduate = (item: Spa2Graduate) => {
    const { id, ...rest } = item;
    setGraduateForm({ ...rest });
    setGraduateEditId(id);
    setGraduateDialog(true);
  };
  const submitGraduate = () => {
    const next: Omit<Spa2Graduate, 'id'> = { ...graduateForm };
    if (graduateEditId) {
      setGraduates((prev) =>
        prev.map((item) => (item.id === graduateEditId ? { ...item, ...next } : item))
      );
    } else {
      setGraduates((prev) => [...prev, withId(next)]);
    }
    setGraduateDialog(false);
    markDirty();
  };
  const confirmDeleteGraduate = () => {
    setGraduates((prev) => prev.filter((item) => item.id !== graduateDeleteId));
    setGraduateDeleteId(null);
    markDirty();
  };
  const reorderGraduates = (next: Spa2Graduate[]) => {
    setGraduates(next);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2CertificateWallBanner });
    setPrograms(spa2CompletionPrograms.map((item) => ({ ...item })));
    setGraduates(spa2Graduates.map((item) => ({ ...item })));
    setDirty(false);
  };

  const programNameOptions = programs.map((p) => p.name);

  return (
    <Spa2ManageShell
      title={t('certificate_wall.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.certificate_wall')}
      publicPath={paths.spa2.certificateWall}
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
          label={t('certificate_wall.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="programs"
          label={t('certificate_wall.programs_section')}
          icon={<Iconify icon="solar:diploma-verified-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="graduates"
          label={t('certificate_wall.graduates_section')}
          icon={<Iconify icon="solar:medal-ribbons-star-bold-duotone" width={20} />}
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
              title={t('certificate_wall.banner_section')}
              icon="solar:gallery-wide-bold-duotone"
            >
              <Stack spacing={2}>
                <TextField
                  label={t('certificate_wall.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('certificate_wall.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('certificate_wall.banner_subtitle')}
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
                <BannerPreview banner={banner} />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Programs */}
      {tab === 'programs' && (
        <SectionCard
          title={t('certificate_wall.programs_section')}
          icon="solar:diploma-verified-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateProgram}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('certificate_wall.add_program_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('certificate_wall.drag_hint')}
          </Typography>
          {programs.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('certificate_wall.no_programs')}
            </Typography>
          )}
          <Spa2SortableGrid items={programs} onReorder={reorderPrograms}>
            <Grid container spacing={2}>
              {programs.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <ProgramPreviewCard program={item} />
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
                            onClick={() => openEditProgram(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setProgramDeleteId(item.id)}
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

      {/* Graduates */}
      {tab === 'graduates' && (
        <SectionCard
          title={t('certificate_wall.graduates_section')}
          icon="solar:medal-ribbons-star-bold-duotone"
          action={
            <Button
              size="small"
              onClick={openCreateGraduate}
              startIcon={<Iconify icon="mingcute:add-line" width={16} />}
            >
              {t('certificate_wall.add_graduate_btn')}
            </Button>
          }
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
            {t('certificate_wall.drag_hint')}
          </Typography>
          {graduates.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t('certificate_wall.no_graduates')}
            </Typography>
          )}
          <Spa2SortableGrid items={graduates} onReorder={reorderGraduates}>
            <Grid container spacing={2}>
              {graduates.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={3}>
                  <Spa2SortableItem id={item.id}>
                    {(sortable) => (
                      <Box sx={{ position: 'relative' }}>
                        <GraduatePreviewCard graduate={item} />
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
                            onClick={() => openEditGraduate(item)}
                            sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                          >
                            <Iconify icon="solar:pen-bold" width={14} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setGraduateDeleteId(item.id)}
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
          <Spa2CertificateWallPageView banner={banner} programs={programs} graduates={graduates} />
        </Box>
      )}

      {/* Program add/edit dialog */}
      <Dialog open={programDialog} onClose={() => setProgramDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {programEditId ? t('common.edit') : t('certificate_wall.add_program_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('certificate_wall.form_program_name')}
                  value={programForm.name}
                  onChange={(e) => setProgramForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('certificate_wall.form_program_graduates')}
                    type="number"
                    value={programForm.graduates}
                    onChange={(e) =>
                      setProgramForm((p) => ({ ...p, graduates: Number(e.target.value) }))
                    }
                    fullWidth
                  />
                  <TextField
                    label={t('certificate_wall.form_program_icon')}
                    value={programForm.icon}
                    onChange={(e) => setProgramForm((p) => ({ ...p, icon: e.target.value }))}
                    fullWidth
                    helperText="solar:leaf-bold-duotone"
                  />
                </Stack>
                <TextField
                  label={t('certificate_wall.form_program_color')}
                  value={programForm.color}
                  onChange={(e) => setProgramForm((p) => ({ ...p, color: e.target.value }))}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: programForm.color || '#2E8B7A',
                            border: `1px solid ${SPA2_CREAM_DARK}`,
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <ProgramPreviewCard program={programForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProgramDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitProgram}
            disabled={!programForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {programEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!programDeleteId}
        onClose={() => setProgramDeleteId(null)}
        title={t('certificate_wall.program_delete_title')}
        content={t('certificate_wall.program_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProgram}>
            {t('common.yes_delete')}
          </Button>
        }
      />

      {/* Graduate add/edit dialog */}
      <Dialog
        open={graduateDialog}
        onClose={() => setGraduateDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ color: SPA2_TEAL_DARK }}>
          {graduateEditId ? t('common.edit') : t('certificate_wall.add_graduate_btn')}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('certificate_wall.form_graduate_name')}
                  value={graduateForm.name}
                  onChange={(e) => setGraduateForm((p) => ({ ...p, name: e.target.value }))}
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    options={programNameOptions}
                    value={graduateForm.program}
                    onInputChange={(_, value) => setGraduateForm((p) => ({ ...p, program: value }))}
                    renderInput={(params) => (
                      <TextField {...params} label={t('certificate_wall.form_graduate_program')} />
                    )}
                  />
                  <TextField
                    label={t('certificate_wall.form_graduate_date')}
                    value={graduateForm.date}
                    onChange={(e) => setGraduateForm((p) => ({ ...p, date: e.target.value }))}
                    fullWidth
                    placeholder="dd/mm/yyyy"
                  />
                </Stack>
                <Spa2SimpleImageField
                  label={t('certificate_wall.form_graduate_avatar')}
                  value={graduateForm.avatar}
                  onChange={(url) => setGraduateForm((p) => ({ ...p, avatar: url }))}
                  rounded
                  height={120}
                />
                <TextField
                  label={t('certificate_wall.form_graduate_result')}
                  value={graduateForm.result}
                  onChange={(e) => setGraduateForm((p) => ({ ...p, result: e.target.value }))}
                  fullWidth
                  multiline
                  minRows={2}
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: 'background.neutral', borderRadius: 3, p: 2 }}>
                <GraduatePreviewCard graduate={graduateForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGraduateDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitGraduate}
            disabled={!graduateForm.name}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {graduateEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!graduateDeleteId}
        onClose={() => setGraduateDeleteId(null)}
        title={t('certificate_wall.graduate_delete_title')}
        content={t('certificate_wall.graduate_delete_content')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteGraduate}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
