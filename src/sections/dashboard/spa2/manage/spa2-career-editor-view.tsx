import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import {
  SPA2_CAREERS,
  spa2CareersBanner,
  type Spa2CareerItem,
  type Spa2CareerStatus,
  spa2RecruitmentProcess,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ----------------------------------------------------------------------
// Bespoke per-job editor for a single spa2 careers listing — the "detail"
// counterpart to the spa2-careers-manage-view.tsx list page, mirroring the
// Spa2ServiceEditorView pattern (Spa2ManageShell + Tabs, with "Xem trước" as
// a real tab instead of a modal). Reads/writes the same Spa2CareerItem shape
// as SPA2_CAREERS (src/_mock/_spa2), which the public
// Spa2CareerDetailsPageView also renders from.
// ----------------------------------------------------------------------

const JOB_TYPES = ['Toàn thời gian', 'Bán thời gian', 'Linh hoạt', 'Remote'];

type TabKey = 'info' | 'preview';

export function Spa2CareerEditorView() {
  const { t } = useTranslate('spa2-manage');
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const original = SPA2_CAREERS.find((c) => c.id === Number(id)) ?? SPA2_CAREERS[0];

  const [value, setValue] = useState<Spa2CareerItem>({ ...original });
  const [tab, setTab] = useState<TabKey>('info');
  const [benefitsText, setBenefitsText] = useState(value.benefits.join(', '));
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const update = useCallback(
    <K extends keyof Spa2CareerItem>(k: K, v: Spa2CareerItem[K]) =>
      setValue((prev) => ({ ...prev, [k]: v })),
    []
  );

  const handleSave = useCallback(() => {
    const benefits = benefitsText
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);
    update('benefits', benefits);
    setSavedAt(new Date());
  }, [benefitsText, update]);

  const handleApprove = useCallback(() => {
    update('status', 'open');
    setSavedAt(new Date());
  }, [update]);

  const handleDelete = useCallback(() => navigate(paths.dashboard.spa2.careers), [navigate]);

  const handleBack = useCallback(
    () => navigate(paths.dashboard.spa2.careers),
    [navigate]
  );

  return (
    <Spa2ManageShell
      title={value.title || t('careers.form_edit')}
      eyebrow="Nature Spa · Chi tiết tin tuyển dụng"
      description={`${value.location} · ${value.type} · ${value.salary}`}
      breadcrumbLabel={t('nav.careers')}
      publicPath={paths.spa2.careers}
      actions={
        <>
          <Button
            onClick={handleBack}
            startIcon={<Iconify icon="solar:arrow-left-linear" />}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            {t('common.back_to_list')}
          </Button>
          <Button
            onClick={handleApprove}
            startIcon={<Iconify icon="solar:check-circle-bold" />}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
            }}
          >
            {t('careers.status_open')}
          </Button>
          <Button
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{ borderRadius: 50, px: 3, bgcolor: 'common.white', color: SPA2_TEAL }}
          >
            {t('common.save')}
          </Button>
        </>
      }
    >
      {savedAt && (
        <Chip
          size="small"
          color="success"
          label={t('common.saved_at', { time: savedAt.toLocaleTimeString('vi-VN') })}
          icon={<Iconify icon="solar:check-circle-bold" width={14} />}
          sx={{ mb: 2 }}
        />
      )}

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(_, v: TabKey) => setTab(v)}
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
          value="info"
          icon={<Iconify icon="solar:document-bold-duotone" width={20} />}
          iconPosition="start"
          label={t('careers.form_edit')}
        />
        <Tab
          value="preview"
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
          label={t('common.preview_btn')}
        />
      </Tabs>

      {/* ── INFO TAB ── */}
      {tab === 'info' && (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
          <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Iconify icon="solar:document-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
                {t('careers.form_title')}
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <TextField
                select
                label={t('common.status')}
                size="small"
                value={value.status}
                onChange={(e) => update('status', e.target.value as Spa2CareerStatus)}
              >
                <MenuItem value="open">{t('careers.status_open')}</MenuItem>
                <MenuItem value="closed">{t('careers.status_closed')}</MenuItem>
              </TextField>
              <TextField
                label={t('careers.form_title')}
                size="small"
                value={value.title}
                onChange={(e) => update('title', e.target.value)}
              />
              <TextField
                label={t('careers.form_location')}
                size="small"
                value={value.location}
                onChange={(e) => update('location', e.target.value)}
              />
              <TextField
                select
                label={t('careers.form_type')}
                size="small"
                value={value.type}
                onChange={(e) => update('type', e.target.value)}
              >
                {JOB_TYPES.map((jobType) => (
                  <MenuItem key={jobType} value={jobType}>
                    {jobType}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label={t('careers.form_salary')}
                size="small"
                value={value.salary}
                onChange={(e) => update('salary', e.target.value)}
              />
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                  {t('careers.form_description')}
                </Typography>
                <Editor
                  value={value.description}
                  onChange={(html) => update('description', html)}
                  placeholder={t('careers.form_description')}
                  fullItem
                  sx={{ maxHeight: 360 }}
                />
              </Stack>
              <TextField
                label={t('careers.form_benefits')}
                size="small"
                multiline
                rows={3}
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
                helperText={t('common.comma_hint')}
              />
            </Stack>
          </Card>

          <Stack spacing={3}>
            {/* Stats */}
            <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify
                  icon="solar:chart-2-bold-duotone"
                  width={22}
                  sx={{ color: SPA2_TEAL }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
                  Thống kê
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('careers.col_applications')}
                  </Typography>
                  <Chip
                    size="small"
                    label={value.applications ?? 0}
                    sx={{ bgcolor: `${SPA2_TEAL}15`, color: SPA2_TEAL_DARK, fontWeight: 700 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Ngày đăng
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {value.postedAt}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('common.status')}
                  </Typography>
                  <Chip
                    size="small"
                    label={value.status === 'open' ? t('careers.status_open') : t('careers.status_closed')}
                    color={value.status === 'open' ? 'success' : 'default'}
                  />
                </Box>
              </Stack>
            </Card>

            {/* Delete zone */}
            <Card sx={{ p: 2.5, borderRadius: 3, bgcolor: 'error.lighter' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="subtitle2" color="error.darker">
                    {t('careers.delete_title')}
                  </Typography>
                  <Typography variant="caption" color="error.dark">
                    Hành động không thể hoàn tác (mock).
                  </Typography>
                </Box>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleDelete}
                  startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                >
                  {t('common.delete')}
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Box>
      )}

      {/* ── PREVIEW TAB ── */}
      {tab === 'preview' && (
        <Box>
          <Card
            sx={{
              p: 0,
              borderRadius: 4,
              overflow: 'hidden',
              border: `1px solid ${SPA2_CREAM_DARK}`,
              boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: 240,
                bgcolor: SPA2_CREAM_DARK,
                ...spa2ImageBackgroundStyle(spa2CareersBanner.image),
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.65), rgba(0,0,0,0))',
                }}
              />
              <Stack
                spacing={0.75}
                sx={{ position: 'absolute', left: 24, right: 24, bottom: 20, color: 'common.white' }}
              >
                <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
                  {spa2CareersBanner.eyebrow}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {value.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {value.location} · {value.type} · {value.salary}
                </Typography>
              </Stack>
            </Box>
          </Card>

          <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
            <Grid container spacing={5}>
              <Grid xs={12}>
                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                  {t('careers.form_description')}
                </Typography>
                <Box
                  sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8, '& p': { m: 0, mb: 1.5 } }}
                  dangerouslySetInnerHTML={{ __html: value.description }}
                />

                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                  {t('careers.form_benefits').replace(' (cách nhau bởi dấu phẩy)', '')}
                </Typography>
                <Stack spacing={1} sx={{ mb: 4 }}>
                  {value.benefits.map((b) => (
                    <Stack key={b} direction="row" spacing={1.5} alignItems="center">
                      <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                      <Typography sx={{ color: SPA2_INK }}>{b}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                  {t('careers.process_section')}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {spa2RecruitmentProcess.map((p, idx) => (
                    <Stack
                      key={p.step}
                      alignItems="center"
                      spacing={1}
                      sx={{ flex: 1, textAlign: 'center' }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK }}>
                        {p.step}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
