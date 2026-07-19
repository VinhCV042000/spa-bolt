import type { ReactNode } from 'react';

import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  SPA2_CAREERS,
  spa2JoinReasons,
  spa2CareersBanner,
  type Spa2CareerItem,
  spa2WorkplaceGallery,
  type Spa2CareerStatus,
  spa2InternalVideoThumb,
  spa2RecruitmentProcess,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';

import {
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';

// ----------------------------------------------------------------------
// Bespoke per-job editor for a single spa2 careers listing — the "detail"
// counterpart to the spa2-careers-manage-view.tsx list page, mirroring the
// "admin preview = real public component" pattern established in
// spa2-contact-manage-view.tsx: the right-hand info-tab preview and the
// full "preview" tab both compose Spa2PageHero/Spa2SoftCard/Spa2SectionTitle
// directly from src/sections/spa2/view/spa2-content-pages (the same leaf
// components Spa2CareerDetailsPageView renders on the public
// /spa2/careers/:id page), so the admin preview can never visually drift
// from reality. Reads/writes the same Spa2CareerItem shape as SPA2_CAREERS
// (src/_mock/_spa2), looked up by `.id` — matching the public view's lookup.
// ----------------------------------------------------------------------

const JOB_TYPES = ['Toàn thời gian', 'Bán thời gian', 'Linh hoạt', 'Remote'];

type TabKey = 'banner' | 'description' | 'preview';

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
    <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}`, height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon={icon} width={22} sx={{ color: SPA2_TEAL }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
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

// Mirrors the description block of Spa2CareerDetailsPageView (the public
// /spa2/careers/:id page) so the "Mô tả" tab's live preview never drifts
// from the real rendered section.
function DescriptionPreview({ description }: { description: string }) {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
      <Container>
        <Spa2SectionTitle eyebrow="Mô tả công việc" title="Yêu cầu & quyền lợi" align="left" />
        <Box
          sx={{
            color: 'text.secondary',
            mb: 3,
            lineHeight: 1.8,
            '& p': { m: 0, mb: 1.5 },
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Container>
    </Box>
  );
}

export function Spa2CareerEditorView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const original = SPA2_CAREERS.find((c) => c.id === Number(id)) ?? SPA2_CAREERS[0];

  const [value, setValue] = useState<Spa2CareerItem>({
    ...original,
    image: original.image ?? spa2CareersBanner.image,
  });
  const [tab, setTab] = useState<TabKey>('banner');
  const [benefitsText, setBenefitsText] = useState(value.benefits.join(', '));
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);

  const update = useCallback(
    <K extends keyof Spa2CareerItem>(k: K, v: Spa2CareerItem[K]) =>
      setValue((prev) => ({ ...prev, [k]: v })),
    []
  );

  const updateImage = useCallback(
    (img: Spa2AdjustableImage) => update('image', img),
    [update]
  );

  const resetImageToShared = useCallback(
    () => update('image', spa2CareersBanner.image),
    [update]
  );

  const handleSave = useCallback(() => {
    const benefits = benefitsText
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);
    update('benefits', benefits);
    setSavedAt(new Date());
  }, [benefitsText, update]);

  const handleStatusChange = useCallback(
    (status: Spa2CareerStatus) => {
      update('status', status);
      setSavedAt(new Date());
      setStatusAnchor(null);
    },
    [update]
  );

  const handleDelete = useCallback(() => navigate(paths.dashboard.spa2.careers), [navigate]);

  const handleBack = useCallback(() => navigate(paths.dashboard.spa2.careers), [navigate]);

  const statusLabel =
    value.status === 'open' ? t('careers.status_open') : t('careers.status_closed');

  return (
    <Spa2ManageShell
      title={value.title || t('careers.form_edit')}
      eyebrow="Nature Spa · Chi tiết tin tuyển dụng"
      description={`${value.location} · ${value.type} · ${value.salary}`}
      breadcrumbLabel={t('nav.careers')}
      publicPath={paths.spa2.careerDetails(value.id)}
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
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setStatusAnchor(event.currentTarget)
            }
            startIcon={
              <Iconify
                icon={
                  value.status === 'open' ? 'solar:check-circle-bold' : 'solar:close-circle-bold'
                }
              />
            }
            endIcon={<Iconify icon="solar:alt-arrow-down-linear" width={16} />}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            {statusLabel}
          </Button>
          <Menu
            anchorEl={statusAnchor}
            open={Boolean(statusAnchor)}
            onClose={() => setStatusAnchor(null)}
          >
            <MenuItem selected={value.status === 'open'} onClick={() => handleStatusChange('open')}>
              <Iconify
                icon="solar:check-circle-bold"
                width={18}
                sx={{ mr: 1, color: 'success.main' }}
              />
              {t('careers.status_open')}
            </MenuItem>
            <MenuItem
              selected={value.status === 'closed'}
              onClick={() => handleStatusChange('closed')}
            >
              <Iconify
                icon="solar:close-circle-bold"
                width={18}
                sx={{ mr: 1, color: 'text.disabled' }}
              />
              {t('careers.status_closed')}
            </MenuItem>
          </Menu>
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
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
          label="Banner"
        />
        <Tab
          value="description"
          icon={<Iconify icon="solar:document-text-bold-duotone" width={20} />}
          iconPosition="start"
          label="Mô tả"
        />
        <Tab
          value="preview"
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
          label={t('common.preview_btn')}
        />
      </Tabs>

      {/* ── BANNER TAB — left: title/location/type/salary (feed the hero), right: live Spa2PageHero preview ── */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard
              title={t('careers.form_title')}
              icon="solar:document-bold-duotone"
              action={
                <Chip
                  size="small"
                  label={statusLabel}
                  color={value.status === 'open' ? 'success' : 'default'}
                />
              }
            >
              <Stack spacing={2}>
                <Spa2ImageField
                  label="Ảnh banner"
                  value={value.image ?? spa2CareersBanner.image}
                  onChange={updateImage}
                  height={220}
                  helperText="Ảnh riêng cho tin tuyển dụng này. Nếu không đặt, trang chi tiết sẽ dùng ảnh banner chung của trang Tuyển dụng."
                />
                <Button
                  size="small"
                  onClick={resetImageToShared}
                  startIcon={<Iconify icon="solar:refresh-bold" width={16} />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Dùng ảnh banner chung
                </Button>
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
              </Stack>
            </SectionCard>
          </Grid>

          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Spa2PageHero
                  image={(value.image ?? spa2CareersBanner.image).url}
                  imageStyle={value.image ?? spa2CareersBanner.image}
                  eyebrow={spa2CareersBanner.eyebrow}
                  title={value.title || t('careers.form_title')}
                  subtitle={`${value.location} · ${value.type} · ${value.salary}`}
                />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* ── MÔ TẢ TAB — left: description editor + benefits + compact preview, right: live rendered preview + reasons/stats/delete ── */}
      {tab === 'description' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <SectionCard
                title={t('careers.form_description')}
                icon="solar:document-text-bold-duotone"
              >
                <Editor
                  value={value.description}
                  onChange={(html) => update('description', html)}
                  placeholder={t('careers.form_description')}
                  fullItem
                  sx={{ maxHeight: 420 }}
                />
              </SectionCard>

              <SectionCard title={t('careers.form_benefits')} icon="solar:star-bold-duotone">
                <TextField
                  label={t('careers.form_benefits')}
                  size="small"
                  multiline
                  rows={3}
                  fullWidth
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  helperText={t('common.comma_hint')}
                />
              </SectionCard>

              {/* Compact live preview — reuses the real Spa2SoftCard */}
              <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
                <Spa2SoftCard>
                  <Typography sx={{ fontWeight: 700, color: SPA2_INK, mb: 1 }}>
                    {value.title}
                  </Typography>
                  <Stack spacing={0.75} sx={{ mb: 1.5 }}>
                    {value.benefits.slice(0, 3).map((b) => (
                      <Stack key={b} direction="row" spacing={1} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          width={16}
                          sx={{ color: SPA2_TEAL }}
                        />
                        <Typography variant="body2" sx={{ color: SPA2_INK }}>
                          {b}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {value.location} · {value.type} · {value.salary}
                  </Typography>
                </Spa2SoftCard>
              </SectionCard>
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={3}>
              <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
                <PreviewFrame>
                  <DescriptionPreview description={value.description} />
                </PreviewFrame>
              </SectionCard>

              {/* Lý do gia nhập — global data, read-only here (edit in danh sách tuyển dụng) */}
              <SectionCard title={t('careers.reasons_section')} icon="solar:star-bold-duotone">
                <Stack spacing={1.5}>
                  {spa2JoinReasons.map((r) => (
                    <Stack
                      key={r.text}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ p: 1.25, borderRadius: 2, bgcolor: SPA2_CREAM }}
                    >
                      <Iconify icon={r.icon} width={20} sx={{ color: SPA2_TEAL, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: SPA2_INK }}>
                        {r.text}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </SectionCard>

              {/* Stats */}
              <SectionCard title="Thống kê" icon="solar:chart-2-bold-duotone">
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
                      label={statusLabel}
                      color={value.status === 'open' ? 'success' : 'default'}
                    />
                  </Box>
                </Stack>
              </SectionCard>

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
          </Grid>
        </Grid>
      )}

      {/* ── PREVIEW TAB — full-page, same section order as Spa2CareerDetailsPageView ── */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Box sx={{ bgcolor: 'background.default' }}>
            <Spa2PageHero
              image={(value.image ?? spa2CareersBanner.image).url}
              imageStyle={value.image ?? spa2CareersBanner.image}
              eyebrow={spa2CareersBanner.eyebrow}
              title={value.title}
              subtitle={`${value.location} · ${value.type} · ${value.salary}`}
            />

            <Box sx={{ py: { xs: 8, md: 12 } }}>
              <Container>
                <Grid container spacing={5}>
                  <Grid xs={12} md={7}>
                    <Spa2SectionTitle
                      eyebrow="Mô tả công việc"
                      title="Yêu cầu & quyền lợi"
                      align="left"
                    />
                    <Box
                      sx={{
                        color: 'text.secondary',
                        mb: 3,
                        lineHeight: 1.8,
                        '& p': { m: 0, mb: 1.5 },
                      }}
                      dangerouslySetInnerHTML={{ __html: value.description }}
                    />
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                      Quyền lợi
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 4 }}>
                      {value.benefits.map((b) => (
                        <Stack key={b} direction="row" spacing={1.5} alignItems="center">
                          <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                          <Typography sx={{ color: SPA2_INK }}>{b}</Typography>
                        </Stack>
                      ))}
                    </Stack>

                    {/* Quy trình tuyển dụng */}
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                      Quy trình tuyển dụng
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      {spa2RecruitmentProcess.map((p, idx) => (
                        <Stack
                          key={p.step}
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          flex={1}
                        >
                          <Stack
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
                          {idx < spa2RecruitmentProcess.length - 1 && (
                            <Iconify
                              icon="solar:arrow-right-linear"
                              sx={{ color: SPA2_TEAL_LIGHT, display: { xs: 'none', sm: 'block' } }}
                            />
                          )}
                        </Stack>
                      ))}
                    </Stack>
                  </Grid>

                  {/* Form ứng tuyển */}
                  <Grid xs={12} md={5}>
                    <Spa2SoftCard sx={{ position: 'sticky', top: 100 }}>
                      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                        Ứng tuyển vị trí này
                      </Typography>
                      <Stack spacing={2}>
                        <TextField fullWidth label="Họ và tên" disabled />
                        <TextField fullWidth label="Số điện thoại" disabled />
                        <TextField fullWidth label="Email" disabled />
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Giới thiệu bản thân"
                          disabled
                        />
                        <Button
                          fullWidth
                          disabled
                          sx={{
                            borderRadius: 2,
                            border: `1.5px dashed ${SPA2_TEAL}`,
                            color: SPA2_TEAL_DARK,
                            py: 1.5,
                            '&.Mui-disabled': {
                              border: `1.5px dashed ${SPA2_TEAL}`,
                              color: SPA2_TEAL_DARK,
                              opacity: 0.85,
                            },
                          }}
                        >
                          Tải lên CV
                        </Button>
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
                          Gửi hồ sơ ứng tuyển
                        </Button>
                      </Stack>
                    </Spa2SoftCard>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* Văn hóa doanh nghiệp: Gallery + Video nội bộ */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
              <Container>
                <Spa2SectionTitle eyebrow="Văn hóa doanh nghiệp" title="Cuộc sống tại Nature Spa" />
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {spa2WorkplaceGallery.map((img, idx) => (
                    <Grid key={idx} xs={6} md={3}>
                      <Box
                        sx={{
                          aspectRatio: '4/3',
                          borderRadius: 3,
                          backgroundImage: `url(${img.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden', maxWidth: 700, mx: 'auto' }}>
                  <Box sx={{ position: 'relative', cursor: 'pointer' }}>
                    <Box
                      sx={{
                        height: 320,
                        backgroundImage: `url(${spa2InternalVideoThumb.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(31,42,40,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255,255,255,0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon="solar:play-bold" width={32} sx={{ color: SPA2_TEAL }} />
                      </Box>
                    </Box>
                  </Box>
                  <Typography sx={{ p: 2, color: SPA2_INK, fontWeight: 600, textAlign: 'center' }}>
                    Video giới thiệu môi trường làm việc Nature Spa
                  </Typography>
                </Spa2SoftCard>
              </Container>
            </Box>
          </Box>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
