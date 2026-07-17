import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import {
  type Spa2Faq,
  SPA2_SERVICES,
  findSpa2Service,
  type Spa2Feedback,
  type Spa2ServiceItem,
  type Spa2ServiceStep,
  type Spa2BeforeAfter,
  type Spa2ServiceStatus,
} from 'src/_mock/_spa2';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';

import { Spa2ManageShell } from 'src/sections/dashboard/spa2/manage/spa2-manage-shell';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_SAGE,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
  spa2ContactInfo,
} from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: Spa2ServiceStatus[] = ['Đang hiển thị', 'Bản nháp', 'Ẩn'];

const CATEGORIES = [
  { value: 'massage', label: 'Massage' },
  { value: 'facial', label: 'Facial' },
  { value: 'body', label: 'Body Care' },
  { value: 'couple', label: 'Spa Đôi' },
  { value: 'detox', label: 'Detox' },
];

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

const genId = () => `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// ----------------------------------------------------------------------

type TabKey = 'info' | 'steps' | 'results' | 'reviews' | 'faq' | 'gallery' | 'preview';

const TAB_LABELS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'info', label: 'Thông tin', icon: 'solar:document-bold-duotone' },
  { key: 'steps', label: 'Quy trình', icon: 'solar:list-bold-duotone' },
  { key: 'results', label: 'Kết quả', icon: 'solar:gallery-bold-duotone' },
  { key: 'reviews', label: 'Đánh giá', icon: 'solar:chat-dots-bold-duotone' },
  { key: 'faq', label: 'FAQ', icon: 'solar:question-circle-bold-duotone' },
  { key: 'gallery', label: 'Thư viện', icon: 'solar:gallery-add-bold-duotone' },
  { key: 'preview', label: 'Xem trước', icon: 'solar:eye-bold-duotone' },
];

// ----------------------------------------------------------------------

export function Spa2ServiceEditorView() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const original = findSpa2Service(slug) ?? SPA2_SERVICES[0];
  const [value, setValue] = useState<Spa2ServiceItem>({ ...original });
  const [tab, setTab] = useState<TabKey>('info');
  const [benefitsText, setBenefitsText] = useState(value.benefits.join(', '));
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const update = useCallback(
    <K extends keyof Spa2ServiceItem>(k: K, v: Spa2ServiceItem[K]) =>
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
    update('status', 'Đang hiển thị');
    setSavedAt(new Date());
  }, [update]);

  const handleDelete = useCallback(() => navigate(paths.dashboard.spa2.services), [navigate]);

  const handleBack = useCallback(
    () => navigate(paths.dashboard.spa2.services),
    [navigate]
  );

  // ── Steps CRUD ──
  const addStep = useCallback(() => {
    const newStep: Spa2ServiceStep = { id: genId(), title: 'Bước mới', desc: '' };
    update('steps', [...value.steps, newStep]);
  }, [value.steps, update]);

  const updateStep = useCallback(
    (id: string, field: keyof Spa2ServiceStep, v: string) =>
      update(
        'steps',
        value.steps.map((s) => (s.id === id ? { ...s, [field]: v } : s))
      ),
    [value.steps, update]
  );

  const removeStep = useCallback(
    (id: string) =>
      update(
        'steps',
        value.steps.filter((s) => s.id !== id)
      ),
    [value.steps, update]
  );

  const moveStep = useCallback(
    (id: string, dir: -1 | 1) => {
      const idx = value.steps.findIndex((s) => s.id === id);
      if (idx < 0) return;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= value.steps.length) return;
      const arr = [...value.steps];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      update('steps', arr);
    },
    [value.steps, update]
  );

  // ── Before/After CRUD ──
  const addBeforeAfter = useCallback(() => {
    const item: Spa2BeforeAfter = {
      id: genId(),
      title: 'Kết quả mới',
      before: '',
      after: '',
      duration: '',
      note: '',
    };
    update('beforeAfters', [...value.beforeAfters, item]);
  }, [value.beforeAfters, update]);

  const updateBeforeAfter = useCallback(
    (id: string, field: keyof Spa2BeforeAfter, v: string) =>
      update(
        'beforeAfters',
        value.beforeAfters.map((b) => (b.id === id ? { ...b, [field]: v } : b))
      ),
    [value.beforeAfters, update]
  );

  const removeBeforeAfter = useCallback(
    (id: string) =>
      update(
        'beforeAfters',
        value.beforeAfters.filter((b) => b.id !== id)
      ),
    [value.beforeAfters, update]
  );

  // ── Feedbacks CRUD ──
  const addFeedback = useCallback(() => {
    const item: Spa2Feedback = {
      id: genId(),
      name: 'Khách hàng',
      role: '',
      rating: 5,
      avatar: '',
      comment: '',
      service: value.name,
    };
    update('feedbacks', [...value.feedbacks, item]);
  }, [value.feedbacks, value.name, update]);

  const updateFeedback = useCallback(
    (id: string, field: keyof Spa2Feedback, v: string | number) =>
      update(
        'feedbacks',
        value.feedbacks.map((f) => (f.id === id ? { ...f, [field]: v } : f))
      ),
    [value.feedbacks, update]
  );

  const removeFeedback = useCallback(
    (id: string) =>
      update(
        'feedbacks',
        value.feedbacks.filter((f) => f.id !== id)
      ),
    [value.feedbacks, update]
  );

  // ── FAQs CRUD ──
  const addFaq = useCallback(() => {
    const item: Spa2Faq = { id: genId(), q: 'Câu hỏi mới', a: '' };
    update('faqs', [...value.faqs, item]);
  }, [value.faqs, update]);

  const updateFaq = useCallback(
    (id: string, field: keyof Spa2Faq, v: string) =>
      update(
        'faqs',
        value.faqs.map((f) => (f.id === id ? { ...f, [field]: v } : f))
      ),
    [value.faqs, update]
  );

  const removeFaq = useCallback(
    (id: string) =>
      update(
        'faqs',
        value.faqs.filter((f) => f.id !== id)
      ),
    [value.faqs, update]
  );

  // ── Gallery ──
  const handleGalleryUpload = useCallback(
    async (files: File[]) => {
      const urls = await Promise.all(files.map(fileToDataUrl));
      update('gallery', [...value.gallery, ...urls]);
    },
    [value.gallery, update]
  );

  const removeGalleryImage = useCallback(
    (idx: number) =>
      update(
        'gallery',
        value.gallery.filter((_, i) => i !== idx)
      ),
    [value.gallery, update]
  );

  const moveGalleryImage = useCallback(
    (idx: number, dir: -1 | 1) => {
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= value.gallery.length) return;
      const arr = [...value.gallery];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      update('gallery', arr);
    },
    [value.gallery, update]
  );

  // ── Image upload for main image / before / after ──
  const handleSingleImage = useCallback(
    async (file: File, field: 'image' | 'before' | 'after', baId?: string) => {
      const url = await fileToDataUrl(file);
      if (field === 'image') {
        update('image', url);
      } else if (baId) {
        updateBeforeAfter(baId, field, url);
      }
    },
    [update, updateBeforeAfter]
  );

  // ----------------------------------------------------------------------

  return (
    <Spa2ManageShell
      title={value.name || 'Chi tiết dịch vụ'}
      eyebrow="Nature Spa · Chi tiết dịch vụ"
      description={`Slug: /spa2/services/${value.slug}`}
      breadcrumbLabel="Dịch vụ"
      publicPath={paths.spa2.serviceDetails(value.slug)}
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
            Quay lại danh sách
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
            Duyệt hiển thị
          </Button>
          <Button
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{ borderRadius: 50, px: 3, bgcolor: 'common.white', color: SPA2_TEAL }}
          >
            Lưu
          </Button>
        </>
      }
    >
      {savedAt && (
        <Chip
          size="small"
          color="success"
          label={`Đã lưu ${savedAt.toLocaleTimeString('vi-VN')}`}
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
          top: 65,
          zIndex: 10,
          bgcolor: 'background.paper',
          '& .MuiTab-root': { minHeight: 56, fontWeight: 600 },
          '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
          '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
        }}
      >
        {TAB_LABELS.map((t) => (
          <Tab
            key={t.key}
            value={t.key}
            icon={<Iconify icon={t.icon} width={20} />}
            iconPosition="start"
            label={t.label}
          />
        ))}
      </Tabs>

      {/* ── INFO TAB ── */}
      {tab === 'info' && (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
          <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Iconify icon="solar:document-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
                Thông tin dịch vụ
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <TextField
                select
                label="Trạng thái"
                size="small"
                value={value.status}
                onChange={(e) => update('status', e.target.value as Spa2ServiceStatus)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Slug"
                size="small"
                value={value.slug}
                onChange={(e) => update('slug', e.target.value)}
              />
              <TextField
                label="Tên dịch vụ"
                size="small"
                value={value.name}
                onChange={(e) => update('name', e.target.value)}
              />
              <TextField
                select
                label="Danh mục"
                size="small"
                value={value.category}
                onChange={(e) => update('category', e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Mô tả ngắn"
                size="small"
                multiline
                rows={2}
                value={value.short}
                onChange={(e) => update('short', e.target.value)}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Thời lượng"
                  size="small"
                  fullWidth
                  value={value.duration}
                  onChange={(e) => update('duration', e.target.value)}
                />
                <TextField
                  label="Giá (VND)"
                  size="small"
                  type="number"
                  fullWidth
                  value={value.price}
                  onChange={(e) => update('price', Number(e.target.value))}
                />
              </Stack>
              <TextField
                label="Icon (solar:*)"
                size="small"
                value={value.icon}
                onChange={(e) => update('icon', e.target.value)}
              />
              <TextField
                label="Lợi ích (phân cách bằng dấu ,)"
                size="small"
                multiline
                rows={2}
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
              />
            </Stack>
          </Card>

          {/* Image uploader */}
          <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Iconify icon="solar:gallery-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
                Ảnh đại diện
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            {value.image ? (
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    height: 240,
                    borderRadius: 3,
                    backgroundImage: `url(${value.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => update('image', '')}
                  sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.9)' }}
                >
                  <Iconify icon="solar:close-circle-bold" color="error" />
                </IconButton>
              </Box>
            ) : (
              <Upload
                onDrop={async (files) => {
                  if (files[0]) handleSingleImage(files[0], 'image');
                }}
                accept={{ 'image/*': [] }}
                helperText="Kéo thả hoặc nhấn để chọn ảnh"
              />
            )}
            {value.image && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<Iconify icon="solar:upload-bold" />}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = () => {
                    const f = input.files?.[0];
                    if (f) handleSingleImage(f, 'image');
                  };
                  input.click();
                }}
                sx={{ mt: 2, borderRadius: 999 }}
              >
                Đổi ảnh
              </Button>
            )}
          </Card>

          {/* Delete zone */}
          <Card sx={{ p: 2.5, borderRadius: 3, bgcolor: 'error.lighter' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="subtitle2" color="error.darker">
                  Xoá dịch vụ
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
                Xoá
              </Button>
            </Stack>
          </Card>
        </Box>
      )}

      {/* ── STEPS TAB ── */}
      {tab === 'steps' && (
        <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
              Quy trình ({value.steps.length})
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addStep}
              sx={{ color: SPA2_TEAL_DARK }}
            >
              Thêm bước
            </Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.5}>
            {value.steps.map((step, idx) => (
              <Card
                key={step.id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: SPA2_CREAM,
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                      fontSize: 14,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <TextField
                      size="small"
                      label="Tiêu đề"
                      value={step.title}
                      onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                    />
                    <TextField
                      size="small"
                      label="Mô tả"
                      multiline
                      rows={2}
                      value={step.desc}
                      onChange={(e) => updateStep(step.id, 'desc', e.target.value)}
                    />
                  </Stack>
                  <Stack direction="column">
                    <IconButton
                      size="small"
                      disabled={idx === 0}
                      onClick={() => moveStep(step.id, -1)}
                    >
                      <Iconify icon="solar:alt-arrow-up-bold" />
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={idx === value.steps.length - 1}
                      onClick={() => moveStep(step.id, 1)}
                    >
                      <Iconify icon="solar:alt-arrow-down-bold" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => removeStep(step.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Card>
            ))}
            {value.steps.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                <Iconify icon="solar:list-linear" width={40} sx={{ color: SPA2_SAGE, mb: 1 }} />
                <Typography>Chưa có bước nào. Nhấn &ldquo;Thêm bước&rdquo; để bắt đầu.</Typography>
              </Box>
            )}
          </Stack>
        </Card>
      )}

      {/* ── RESULTS TAB (Before/After) ── */}
      {tab === 'results' && (
        <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
              Hình ảnh trước & sau ({value.beforeAfters.length})
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addBeforeAfter}
              sx={{ color: SPA2_TEAL_DARK }}
            >
              Thêm kết quả
            </Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2.5}>
            {value.beforeAfters.map((ba) => (
              <Grid key={ba.id} xs={12} md={6}>
                <Card sx={{ p: 2, borderRadius: 3, border: `1px solid ${SPA2_CREAM_DARK}` }}>
                  <Stack spacing={1.5}>
                    <TextField
                      size="small"
                      label="Tiêu đề"
                      value={ba.title}
                      onChange={(e) => updateBeforeAfter(ba.id, 'title', e.target.value)}
                    />
                    <Stack direction="row" spacing={1.5}>
                      <TextField
                        size="small"
                        label="Thời gian"
                        value={ba.duration}
                        onChange={(e) => updateBeforeAfter(ba.id, 'duration', e.target.value)}
                      />
                    </Stack>
                    <Grid container spacing={1.5}>
                      <Grid xs={6}>
                        <Typography
                          variant="caption"
                          sx={{ color: SPA2_TEAL_DARK, mb: 0.5, display: 'block' }}
                        >
                          Ảnh TRƯỚC
                        </Typography>
                        {ba.before ? (
                          <Box sx={{ position: 'relative' }}>
                            <Box
                              sx={{
                                height: 140,
                                borderRadius: 2,
                                backgroundImage: `url(${ba.before})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: `1px solid ${SPA2_CREAM_DARK}`,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => updateBeforeAfter(ba.id, 'before', '')}
                              sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                bgcolor: 'rgba(255,255,255,0.9)',
                              }}
                            >
                              <Iconify icon="solar:close-circle-bold" color="error" width={16} />
                            </IconButton>
                          </Box>
                        ) : (
                          <Upload
                            onDrop={async (files) => {
                              if (files[0]) handleSingleImage(files[0], 'before', ba.id);
                            }}
                            accept={{ 'image/*': [] }}
                            sx={{ '& .MuiBox-root': { p: 2 } }}
                          />
                        )}
                      </Grid>
                      <Grid xs={6}>
                        <Typography
                          variant="caption"
                          sx={{ color: SPA2_TEAL_DARK, mb: 0.5, display: 'block' }}
                        >
                          Ảnh SAU
                        </Typography>
                        {ba.after ? (
                          <Box sx={{ position: 'relative' }}>
                            <Box
                              sx={{
                                height: 140,
                                borderRadius: 2,
                                backgroundImage: `url(${ba.after})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: `1px solid ${SPA2_CREAM_DARK}`,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => updateBeforeAfter(ba.id, 'after', '')}
                              sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                bgcolor: 'rgba(255,255,255,0.9)',
                              }}
                            >
                              <Iconify icon="solar:close-circle-bold" color="error" width={16} />
                            </IconButton>
                          </Box>
                        ) : (
                          <Upload
                            onDrop={async (files) => {
                              if (files[0]) handleSingleImage(files[0], 'after', ba.id);
                            }}
                            accept={{ 'image/*': [] }}
                            sx={{ '& .MuiBox-root': { p: 2 } }}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <TextField
                      size="small"
                      label="Ghi chú"
                      multiline
                      rows={2}
                      value={ba.note}
                      onChange={(e) => updateBeforeAfter(ba.id, 'note', e.target.value)}
                    />
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                      onClick={() => removeBeforeAfter(ba.id)}
                    >
                      Xoá
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
            {value.beforeAfters.length === 0 && (
              <Grid xs={12}>
                <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                  <Iconify
                    icon="solar:gallery-linear"
                    width={40}
                    sx={{ color: SPA2_SAGE, mb: 1 }}
                  />
                  <Typography>Chưa có kết quả nào.</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      )}

      {/* ── REVIEWS TAB ── */}
      {tab === 'reviews' && (
        <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
              Đánh giá khách hàng ({value.feedbacks.length})
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addFeedback}
              sx={{ color: SPA2_TEAL_DARK }}
            >
              Thêm đánh giá
            </Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.5}>
            {value.feedbacks.map((f) => (
              <Card
                key={f.id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: SPA2_CREAM,
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar src={f.avatar} sx={{ width: 48, height: 48, flexShrink: 0 }} />
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        size="small"
                        label="Tên"
                        value={f.name}
                        onChange={(e) => updateFeedback(f.id, 'name', e.target.value)}
                      />
                      <TextField
                        size="small"
                        label="Vai trò"
                        value={f.role}
                        onChange={(e) => updateFeedback(f.id, 'role', e.target.value)}
                      />
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Rating
                        value={f.rating}
                        onChange={(_, v) => updateFeedback(f.id, 'rating', v ?? 5)}
                        size="small"
                      />
                      <TextField
                        size="small"
                        label="Dịch vụ"
                        value={f.service}
                        onChange={(e) => updateFeedback(f.id, 'service', e.target.value)}
                        sx={{ flex: 1 }}
                      />
                    </Stack>
                    <TextField
                      size="small"
                      label="Bình luận"
                      multiline
                      rows={2}
                      value={f.comment}
                      onChange={(e) => updateFeedback(f.id, 'comment', e.target.value)}
                    />
                    <TextField
                      size="small"
                      label="URL Avatar"
                      value={f.avatar}
                      onChange={(e) => updateFeedback(f.id, 'avatar', e.target.value)}
                    />
                  </Stack>
                  <IconButton size="small" color="error" onClick={() => removeFeedback(f.id)}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Stack>
              </Card>
            ))}
            {value.feedbacks.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                <Iconify icon="solar:chat-linear" width={40} sx={{ color: SPA2_SAGE, mb: 1 }} />
                <Typography>Chưa có đánh giá nào.</Typography>
              </Box>
            )}
          </Stack>
        </Card>
      )}

      {/* ── FAQ TAB ── */}
      {tab === 'faq' && (
        <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
              Câu hỏi thường gặp ({value.faqs.length})
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addFaq}
              sx={{ color: SPA2_TEAL_DARK }}
            >
              Thêm câu hỏi
            </Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1.5}>
            {value.faqs.map((f) => (
              <Card
                key={f.id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: SPA2_CREAM,
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Iconify
                      icon="solar:question-circle-bold-duotone"
                      sx={{ color: SPA2_TEAL, mt: 0.5 }}
                    />
                    <TextField
                      size="small"
                      label="Câu hỏi"
                      fullWidth
                      value={f.q}
                      onChange={(e) => updateFaq(f.id, 'q', e.target.value)}
                    />
                    <IconButton size="small" color="error" onClick={() => removeFaq(f.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Stack>
                  <TextField
                    size="small"
                    label="Câu trả lời"
                    multiline
                    rows={2}
                    value={f.a}
                    onChange={(e) => updateFaq(f.id, 'a', e.target.value)}
                  />
                </Stack>
              </Card>
            ))}
            {value.faqs.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                <Iconify
                  icon="solar:question-circle-linear"
                  width={40}
                  sx={{ color: SPA2_SAGE, mb: 1 }}
                />
                <Typography>Chưa có câu hỏi nào.</Typography>
              </Box>
            )}
          </Stack>
        </Card>
      )}

      {/* ── GALLERY TAB ── */}
      {tab === 'gallery' && (
        <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
              Thư viện ảnh ({value.gallery.length})
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Upload
            multiple
            onDrop={handleGalleryUpload}
            accept={{ 'image/*': [] }}
            helperText="Kéo thả nhiều ảnh hoặc nhấn để chọn"
          />
          {value.gallery.length > 0 && (
            <Grid container spacing={1.5} sx={{ mt: 2 }}>
              {value.gallery.map((img, idx) => (
                <Grid key={idx} xs={6} sm={4} md={3}>
                  <Card
                    sx={{
                      p: 0,
                      borderRadius: 3,
                      overflow: 'hidden',
                      position: 'relative',
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                    }}
                  >
                    <Box
                      sx={{
                        height: 140,
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Stack direction="row" sx={{ position: 'absolute', top: 4, right: 4 }}>
                      <Tooltip title="Lên">
                        <IconButton
                          size="small"
                          disabled={idx === 0}
                          onClick={() => moveGalleryImage(idx, -1)}
                          sx={{ bgcolor: 'rgba(255,255,255,0.85)' }}
                        >
                          <Iconify icon="solar:alt-arrow-up-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xuống">
                        <IconButton
                          size="small"
                          disabled={idx === value.gallery.length - 1}
                          onClick={() => moveGalleryImage(idx, 1)}
                          sx={{ bgcolor: 'rgba(255,255,255,0.85)' }}
                        >
                          <Iconify icon="solar:alt-arrow-down-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xoá">
                        <IconButton
                          size="small"
                          onClick={() => removeGalleryImage(idx)}
                          sx={{ bgcolor: 'rgba(255,255,255,0.85)' }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" color="error" width={16} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Card>
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
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  height: 280,
                  backgroundImage: `url(${value.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Chip
                label={CATEGORIES.find((c) => c.value === value.category)?.label ?? value.category}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  color: SPA2_TEAL_DARK,
                  fontWeight: 600,
                }}
              />
            </Box>
            <Box sx={{ p: 4 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                <Iconify icon={value.icon} sx={{ color: SPA2_TEAL }} width={28} />
                <Typography variant="h5" sx={{ color: SPA2_INK }}>
                  {value.name}
                </Typography>
              </Stack>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>{value.short}</Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <Chip
                  size="small"
                  label={value.duration}
                  sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                />
                <Chip
                  size="small"
                  label={formatVND(value.price)}
                  sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
                />
                <Chip
                  size="small"
                  label={value.status}
                  color={value.status === 'Đang hiển thị' ? 'success' : 'default'}
                />
              </Stack>

              {value.benefits.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    Lợi ích chính
                  </Typography>
                  <Grid container spacing={1.5} sx={{ mb: 3 }}>
                    {value.benefits.map((b) => (
                      <Grid key={b} xs={12} sm={6}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Iconify
                            icon="solar:check-circle-bold"
                            sx={{ color: SPA2_TEAL }}
                            width={18}
                          />
                          <Typography sx={{ color: SPA2_INK, fontSize: 14 }}>{b}</Typography>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              <Divider sx={{ my: 2 }} />

              <Card
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: SPA2_CREAM,
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                }}
              >
                <Typography variant="overline" sx={{ color: SPA2_TEAL }}>
                  Từ
                </Typography>
                <Typography variant="h4" sx={{ color: SPA2_INK, mb: 0.5 }}>
                  {formatVND(value.price)}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>{value.duration}</Typography>
                <Button
                  fullWidth
                  component={RouterLink}
                  href={paths.spa2.booking}
                  size="large"
                  sx={{
                    borderRadius: 999,
                    py: 1.5,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  Đặt lịch ngay
                </Button>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:phone-bold" sx={{ color: SPA2_TEAL }} width={18} />
                    <Typography variant="body2">{spa2ContactInfo.hotline}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} width={18} />
                    <Typography variant="body2">{spa2ContactInfo.workingHours}</Typography>
                  </Stack>
                </Stack>
              </Card>
            </Box>
          </Card>

          {/* Steps preview */}
          {value.steps.length > 0 && (
            <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
              <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'center', alignItems: 'center' }}>
                <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                  Quy trình
                </Typography>
                <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                  {value.steps.length} bước trải nghiệm
                </Typography>
              </Stack>
              <Stack spacing={0}>
                {value.steps.map((step, idx) => (
                  <Stack key={step.id} direction="row" spacing={3}>
                    <Stack alignItems="center" sx={{ minWidth: 56 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      {idx < value.steps.length - 1 && (
                        <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }} />
                      )}
                    </Stack>
                    <Box sx={{ pb: 4 }}>
                      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
                        {step.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{step.desc}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Container>
          )}

          {/* Before/After preview */}
          {value.beforeAfters.length > 0 && (
            <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: SPA2_CREAM }}>
              <Container>
                <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'center', alignItems: 'center' }}>
                  <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                    Kết quả
                  </Typography>
                  <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                    Hình ảnh trước & sau
                  </Typography>
                </Stack>
                <Grid container spacing={3}>
                  {value.beforeAfters.map((ba) => (
                    <Grid key={ba.id} xs={12} sm={6}>
                      <Card
                        sx={{
                          p: 0,
                          overflow: 'hidden',
                          borderRadius: 4,
                          border: `1px solid ${SPA2_CREAM_DARK}`,
                        }}
                      >
                        <Grid container>
                          <Grid xs={6}>
                            <Box sx={{ position: 'relative' }}>
                              <Box
                                sx={{
                                  height: 200,
                                  backgroundImage: `url(${ba.before})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              />
                              <Chip
                                label="TRƯỚC"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 12,
                                  left: 12,
                                  bgcolor: 'rgba(31,42,40,0.8)',
                                  color: 'white',
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid xs={6}>
                            <Box sx={{ position: 'relative' }}>
                              <Box
                                sx={{
                                  height: 200,
                                  backgroundImage: `url(${ba.after})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              />
                              <Chip
                                label="SAU"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: 12,
                                  left: 12,
                                  bgcolor: SPA2_TEAL,
                                  color: 'white',
                                }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                        <Box sx={{ p: 2.5 }}>
                          <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                            {ba.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                            {ba.note}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          )}

          {/* Feedback preview */}
          {value.feedbacks.length > 0 && (
            <Box sx={{ py: { xs: 4, md: 6 } }}>
              <Container>
                <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'center', alignItems: 'center' }}>
                  <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                    Đánh giá
                  </Typography>
                  <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                    Khách hàng nói gì
                  </Typography>
                </Stack>
                <Grid container spacing={3}>
                  {value.feedbacks.map((f) => (
                    <Grid key={f.id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          p: 3,
                          borderRadius: 4,
                          border: `1px solid ${SPA2_CREAM_DARK}`,
                          height: '100%',
                        }}
                      >
                        <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                        <Typography
                          sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}
                        >
                          “{f.comment}”
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={f.avatar} />
                          <Stack>
                            <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>
                              {f.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                              {f.service}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          )}

          {/* FAQ preview */}
          {value.faqs.length > 0 && (
            <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: SPA2_CREAM }}>
              <Container maxWidth="md">
                <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'center', alignItems: 'center' }}>
                  <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                    FAQ
                  </Typography>
                  <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                    Câu hỏi thường gặp
                  </Typography>
                </Stack>
                {value.faqs.map((f, idx) => (
                  <Accordion
                    key={f.id}
                    defaultExpanded={idx === 0}
                    sx={{
                      mb: 1.5,
                      borderRadius: '12px !important',
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                      boxShadow: 'none',
                      '&:before': { display: 'none' },
                      '&.Mui-expanded': { borderColor: SPA2_TEAL_LIGHT },
                    }}
                  >
                    <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                        {f.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Container>
            </Box>
          )}

          {/* Gallery preview */}
          {value.gallery.length > 0 && (
            <Box sx={{ py: { xs: 4, md: 6 } }}>
              <Container>
                <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'center', alignItems: 'center' }}>
                  <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                    Thư viện
                  </Typography>
                  <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                    Hình ảnh dịch vụ
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {value.gallery.map((img, idx) => (
                    <Grid key={idx} xs={6} sm={4} md={3}>
                      <Card
                        sx={{
                          p: 0,
                          borderRadius: 3,
                          overflow: 'hidden',
                          border: `1px solid ${SPA2_CREAM_DARK}`,
                        }}
                      >
                        <Box
                          sx={{
                            height: 200,
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>
          )}
        </Box>
      )}
    </Spa2ManageShell>
  );
}
