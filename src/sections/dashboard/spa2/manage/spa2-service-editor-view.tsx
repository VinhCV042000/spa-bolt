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
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  type Spa2Faq,
  SPA2_SERVICES,
  findSpa2Service,
  type Spa2Feedback,
  type Spa2ServiceItem,
  type Spa2ServiceStep,
  type Spa2BeforeAfter,
  type Spa2ServiceStatus,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Editor } from 'src/components/editor';
import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import {
  Spa2Cta,
  Spa2PageHero,
  Spa2SoftCard,
  Spa2SectionTitle,
} from 'src/sections/spa2/view/spa2-content-pages';
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

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
// ----------------------------------------------------------------------
// Bespoke full-page editor for a single spa2 service — the "detail" counterpart
// to the spa2-services-manage-view.tsx list page, mirroring the "admin preview
// = real public component" pattern established in spa2-contact-manage-view.tsx
// (and spa2-career-editor-view.tsx): the right-hand info-tab preview and the
// full "preview" tab both compose Spa2PageHero/Spa2SoftCard/Spa2SectionTitle/
// Spa2Cta directly from src/sections/spa2/view/spa2-content-pages — the same
// leaf components Spa2ServiceDetailsPageView renders on the public
// /spa2/services/:slug page — so the admin preview can never visually drift
// from reality. Reads/writes the same Spa2ServiceItem shape as SPA2_SERVICES
// (src/_mock/_spa2), looked up by `.slug` — matching the public view's lookup.
//
// Spa2ServiceItem.image (and Spa2BeforeAfter.before/after) are stored as flat
// string URLs with no focal-point metadata in the shared type. To use
// Spa2ImageField (drag-drop + focal point + zoom) without changing that shared
// type/file, this view keeps the focal/zoom state in local sibling fields
// (imageFocalX/Y/Zoom, beforeFocalX/Y/Zoom, afterFocalX/Y/Zoom) and bridges
// them to/from Spa2AdjustableImage — the same pattern spa2-training-manage-view
// uses for its instructor/graduate photos.
// ----------------------------------------------------------------------

type BeforeAfterItem = Spa2BeforeAfter & {
  beforeFocalX?: number;
  beforeFocalY?: number;
  beforeZoom?: number;
  afterFocalX?: number;
  afterFocalY?: number;
  afterZoom?: number;
};

type ServiceForm = Omit<Spa2ServiceItem, 'beforeAfters'> & {
  imageFocalX?: number;
  imageFocalY?: number;
  imageZoom?: number;
  beforeAfters: BeforeAfterItem[];
};

type WithAdjustableImage = {
  image: string;
  imageFocalX?: number;
  imageFocalY?: number;
  imageZoom?: number;
};

const STATUS_OPTIONS: Spa2ServiceStatus[] = ['Đang hiển thị', 'Bản nháp', 'Ẩn'];

const STATUS_META: Record<Spa2ServiceStatus, { icon: string; color: string }> = {
  'Đang hiển thị': { icon: 'solar:check-circle-bold', color: 'success.main' },
  'Bản nháp': { icon: 'solar:pen-bold', color: 'warning.main' },
  Ẩn: { icon: 'solar:eye-closed-bold', color: 'text.disabled' },
};

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

// Rendering `short` verbatim (as Spa2PageHero's plain-text subtitle, exactly
// like the public Spa2ServiceDetailsPageView does) requires plain text, while
// editing it benefits from rich text. Strip tags for any plain-text slot so
// the live preview never shows raw markup.
const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Bridges the flat `image` + `imageFocalX/Y/Zoom` sibling fields with the
// nested `Spa2AdjustableImage` shape that `Spa2ImageField` expects.
const imageFieldValue = (form: WithAdjustableImage): Spa2AdjustableImage => ({
  url: form.image,
  focalX: form.imageFocalX ?? 50,
  focalY: form.imageFocalY ?? 50,
  zoom: form.imageZoom ?? 100,
});

function applyImageField<T extends WithAdjustableImage>(form: T, img: Spa2AdjustableImage): T {
  return {
    ...form,
    image: img.url,
    imageFocalX: img.focalX,
    imageFocalY: img.focalY,
    imageZoom: img.zoom,
  };
}

const beforeImageValue = (ba: BeforeAfterItem): Spa2AdjustableImage => ({
  url: ba.before,
  focalX: ba.beforeFocalX ?? 50,
  focalY: ba.beforeFocalY ?? 50,
  zoom: ba.beforeZoom ?? 100,
});

const applyBeforeImage = (ba: BeforeAfterItem, img: Spa2AdjustableImage): BeforeAfterItem => ({
  ...ba,
  before: img.url,
  beforeFocalX: img.focalX,
  beforeFocalY: img.focalY,
  beforeZoom: img.zoom,
});

const afterImageValue = (ba: BeforeAfterItem): Spa2AdjustableImage => ({
  url: ba.after,
  focalX: ba.afterFocalX ?? 50,
  focalY: ba.afterFocalY ?? 50,
  zoom: ba.afterZoom ?? 100,
});

const applyAfterImage = (ba: BeforeAfterItem, img: Spa2AdjustableImage): BeforeAfterItem => ({
  ...ba,
  after: img.url,
  afterFocalX: img.focalX,
  afterFocalY: img.focalY,
  afterZoom: img.zoom,
});

// ----------------------------------------------------------------------

type TabKey =
  | 'info'
  | 'description'
  | 'steps'
  | 'results'
  | 'reviews'
  | 'faq'
  | 'gallery'
  | 'preview';

const TAB_LABELS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'info', label: 'Banner', icon: 'solar:gallery-wide-bold-duotone' },
  { key: 'description', label: 'Mô tả', icon: 'solar:document-text-bold-duotone' },
  { key: 'steps', label: 'Quy trình', icon: 'solar:list-bold-duotone' },
  { key: 'results', label: 'Kết quả', icon: 'solar:gallery-bold-duotone' },
  { key: 'reviews', label: 'Đánh giá', icon: 'solar:chat-dots-bold-duotone' },
  { key: 'faq', label: 'FAQ', icon: 'solar:question-circle-bold-duotone' },
  { key: 'gallery', label: 'Thư viện', icon: 'solar:gallery-add-bold-duotone' },
  { key: 'preview', label: 'Xem trước', icon: 'solar:eye-bold-duotone' },
];

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

// Mirrors the public "Mô tả / Trải nghiệm của bạn" 2-column block exactly as
// Spa2ServiceDetailsPageView renders it (src/sections/spa2/view/spa2-content-pages.tsx):
// description + "Lợi ích chính" benefits grid (md=8) alongside a sticky
// price/contact card (md=4). Reused by both the description tab's right-column
// preview and the full combined "preview" tab so the two can never visually
// drift apart.
function Spa2ServiceMoTaPreview({
  description,
  benefits,
  price,
  duration,
}: {
  description: string;
  benefits: string[];
  price: number;
  duration: string;
}) {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Grid container spacing={5}>
          <Grid xs={12} md={8}>
            <Spa2SectionTitle eyebrow="Mô tả" title="Trải nghiệm của bạn" align="left" />
            <Box
              sx={{
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.8,
                '& p': { m: 0, mb: 1.5 },
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
              Lợi ích chính
            </Typography>
            <Grid container spacing={2}>
              {benefits.map((b) => (
                <Grid key={b} xs={12} sm={6}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                    <Typography sx={{ color: SPA2_INK }}>{b}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid xs={12} md={4}>
            <Spa2SoftCard sx={{ position: 'sticky', top: 100 }}>
              <Typography variant="overline" sx={{ color: SPA2_TEAL }}>
                Từ
              </Typography>
              <Typography variant="h3" sx={{ color: SPA2_INK, mb: 1 }}>
                {formatVND(price)}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 3 }}>{duration}</Typography>
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
              <Divider sx={{ my: 3 }} />
              <Stack spacing={1.5}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Iconify icon="solar:phone-bold" sx={{ color: SPA2_TEAL }} />
                  <Typography>{spa2ContactInfo.hotline}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} />
                  <Typography>{spa2ContactInfo.workingHours}</Typography>
                </Stack>
              </Stack>
            </Spa2SoftCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Compact before/after preview for a single result card — mirrors the public
// before/after card (image pair + title/duration) at a smaller scale, meant
// to sit directly beneath the edit fields for that same item.
function BeforeAfterPreviewCard({ ba }: { ba: BeforeAfterItem }) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Grid container>
        <Grid xs={6}>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                height: 100,
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
                top: 6,
                left: 6,
                height: 20,
                fontSize: 10,
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
                height: 100,
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
                top: 6,
                left: 6,
                height: 20,
                fontSize: 10,
                bgcolor: SPA2_TEAL,
                color: 'white',
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ p: 1.5 }}>
        <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 13 }}>
          {ba.title || '(Chưa đặt tiêu đề)'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{ba.duration}</Typography>
      </Box>
    </Spa2SoftCard>
  );
}

// Mirrors one public feedback card exactly (rating + comment + avatar/name/
// service) — reused both as the per-card inline preview in the reviews tab
// and as each carousel slide in the "all reviews" preview/public sections.
function FeedbackPreviewCard({ f }: { f: Spa2Feedback }) {
  return (
    <Spa2SoftCard>
      <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
      <Typography sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>
        &ldquo;{f.comment}&rdquo;
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={f.avatar} />
        <Stack>
          <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.name}</Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{f.service}</Typography>
        </Stack>
      </Stack>
    </Spa2SoftCard>
  );
}

// ----------------------------------------------------------------------

export function Spa2ServiceEditorView() {
  const theme = useTheme();
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const original = findSpa2Service(slug) ?? SPA2_SERVICES[0];
  const [value, setValue] = useState<ServiceForm>({
    ...original,
    beforeAfters: original.beforeAfters.map((b) => ({ ...b })),
  });
  const [tab, setTab] = useState<TabKey>('info');
  const [benefitsText, setBenefitsText] = useState(value.benefits.join(', '));
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);
  const feedbackCarousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '24px' },
    },
  });

  const update = useCallback(
    <K extends keyof ServiceForm>(k: K, v: ServiceForm[K]) =>
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

  const handleStatusChange = useCallback(
    (status: Spa2ServiceStatus) => {
      update('status', status);
      setSavedAt(new Date());
      setStatusAnchor(null);
    },
    [update]
  );

  const handleDelete = useCallback(() => navigate(paths.dashboard.spa2.services), [navigate]);

  const handleBack = useCallback(() => navigate(paths.dashboard.spa2.services), [navigate]);

  // ── Main image ──
  const updateMainImage = useCallback((img: Spa2AdjustableImage) => {
    setValue((prev) => applyImageField(prev, img));
  }, []);

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
      status: 'pending',
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

  const updateBeforeAfterImage = useCallback(
    (id: string, which: 'before' | 'after', img: Spa2AdjustableImage) =>
      update(
        'beforeAfters',
        value.beforeAfters.map((b) => {
          if (b.id !== id) return b;
          return which === 'before' ? applyBeforeImage(b, img) : applyAfterImage(b, img);
        })
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
    const item: Spa2Faq = {
      id: genId(), q: 'Câu hỏi mới', a: '',
      published: undefined,
      cat: '',
      icon: '',
      tag: undefined
    };
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

  // ── Gallery (kept as plain multi-upload — not part of the public service
  // details page, which renders no gallery block at all) ──
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

  const mainImageStyle = {
    focalX: value.imageFocalX ?? 50,
    focalY: value.imageFocalY ?? 50,
    zoom: value.imageZoom ?? 100,
  };

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
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setStatusAnchor(event.currentTarget)
            }
            startIcon={<Iconify icon={STATUS_META[value.status].icon} />}
            endIcon={<Iconify icon="solar:alt-arrow-down-linear" width={16} />}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            {value.status}
          </Button>
          <Menu
            anchorEl={statusAnchor}
            open={Boolean(statusAnchor)}
            onClose={() => setStatusAnchor(null)}
          >
            {STATUS_OPTIONS.map((s) => (
              <MenuItem key={s} selected={value.status === s} onClick={() => handleStatusChange(s)}>
                <Iconify
                  icon={STATUS_META[s].icon}
                  width={18}
                  sx={{ mr: 1, color: STATUS_META[s].color }}
                />
                {s}
              </MenuItem>
            ))}
          </Menu>
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
          top: 64,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
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

      {/* ── BANNER TAB (key kept as 'info') — left: banner-facing fields first
          (image/name/slug/short), operational fields in their own card below;
          right: compact live preview (real Spa2PageHero/Spa2SoftCard) ── */}
      {tab === 'info' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <Stack spacing={3}>
              <SectionCard
                title="Banner dịch vụ"
                icon="solar:gallery-wide-bold-duotone"
                action={
                  <Chip
                    size="small"
                    label={value.status}
                    color={value.status === 'Đang hiển thị' ? 'success' : 'default'}
                  />
                }
              >
                <Stack spacing={2}>
                  <Spa2ImageField
                    label="Ảnh đại diện"
                    value={imageFieldValue(value)}
                    onChange={updateMainImage}
                    height={200}
                    helperText="Kéo thả ảnh, dán URL hoặc tải ảnh từ máy. Kéo trên ảnh để chọn điểm lấy nét, chỉnh thanh trượt để phóng to."
                  />
                  <TextField
                    label="Tên dịch vụ"
                    size="small"
                    fullWidth
                    value={value.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                  <TextField
                    label="Slug"
                    size="small"
                    fullWidth
                    value={value.slug}
                    onChange={(e) => update('slug', e.target.value)}
                  />
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
                    >
                      Mô tả ngắn
                    </Typography>
                    <Editor
                      value={value.short}
                      onChange={(html) => update('short', html)}
                      placeholder="Mô tả ngắn"
                      sx={{ maxHeight: 220 }}
                    />
                  </Box>
                </Stack>
              </SectionCard>
            </Stack>
          </Grid>

          <Grid xs={12} md={5}>
            <Stack spacing={3}>
              {/* Compact live preview — reuses the real Spa2PageHero */}
              <SectionCard title="Xem trước" icon="solar:eye-bold-duotone">
                <PreviewFrame>
                  <Spa2PageHero
                    image={value.image}
                    imageStyle={mainImageStyle}
                    eyebrow="Dịch vụ"
                    title={value.name || 'Chi tiết dịch vụ'}
                    subtitle={stripHtml(value.short)}
                  />
                </PreviewFrame>
              </SectionCard>

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
            </Stack>
          </Grid>
        </Grid>
      )}

      {/* ── DESCRIPTION TAB — left: rich-text editor, right: live preview that
          mirrors the public "Mô tả / Trải nghiệm của bạn" block exactly ── */}
      {tab === 'description' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={5}>
            <Stack spacing={3}>
              <SectionCard title="Mô tả chi tiết" icon="solar:document-text-bold-duotone">
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 0.5, display: 'block' }}
                  >
                    Nội dung hiển thị ở mục &ldquo;Trải nghiệm của bạn&rdquo; trên trang công khai
                  </Typography>
                  <Editor
                    value={value.description}
                    onChange={(html) => update('description', html)}
                    placeholder="Mô tả chi tiết trải nghiệm dịch vụ"
                    sx={{ maxHeight: 400 }}
                  />
                </Box>
              </SectionCard>

              <SectionCard title="Thông tin vận hành" icon="solar:settings-bold-duotone">
                <Stack spacing={2}>
                  <TextField
                    select
                    label="Danh mục"
                    size="small"
                    fullWidth
                    value={value.category}
                    onChange={(e) => update('category', e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <MenuItem key={c.value} value={c.value}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    fullWidth
                    value={value.icon}
                    onChange={(e) => update('icon', e.target.value)}
                  />
                  <TextField
                    label="Lợi ích (phân cách bằng dấu ,)"
                    size="small"
                    fullWidth
                    multiline
                    rows={2}
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                  />
                </Stack>
              </SectionCard>
            </Stack>
          </Grid>
          <Grid xs={12} md={7}>
            <SectionCard title="Xem trước" icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Spa2ServiceMoTaPreview
                  description={value.description}
                  benefits={value.benefits}
                  price={value.price}
                  duration={value.duration}
                />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* ── STEPS TAB ── */}
      {tab === 'steps' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
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
                    <Typography>
                      Chưa có bước nào. Nhấn &ldquo;Thêm bước&rdquo; để bắt đầu.
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Card>
          </Grid>
          <Grid xs={12} md={5}>
            <SectionCard title="Xem trước" icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Box sx={{ py: 6, bgcolor: SPA2_CREAM }}>
                  <Container maxWidth="md">
                    <Spa2SectionTitle
                      eyebrow="Quy trình"
                      title={`${value.steps.length} bước trải nghiệm`}
                    />
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
                              <Box
                                sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }}
                              />
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
                      {value.steps.length === 0 && (
                        <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                          Chưa có bước nào để xem trước.
                        </Typography>
                      )}
                    </Stack>
                  </Container>
                </Box>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* ── RESULTS TAB (Before/After) — each edit card carries its own inline
          "Xem trước" preview directly beneath its fields (see
          spa2-careers-manage-view.tsx's `reasons` tab / ReasonPreviewCard for
          the reference idiom), replacing the old combined right-column list ── */}
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
                    <TextField
                      size="small"
                      label="Thời gian"
                      value={ba.duration}
                      onChange={(e) => updateBeforeAfter(ba.id, 'duration', e.target.value)}
                    />
                    <Grid container spacing={1.5}>
                      <Grid xs={12} sm={6}>
                        <Spa2ImageField
                          label="Ảnh TRƯỚC"
                          value={beforeImageValue(ba)}
                          onChange={(img) => updateBeforeAfterImage(ba.id, 'before', img)}
                          height={140}
                          allowZoom={false}
                        />
                      </Grid>
                      <Grid xs={12} sm={6}>
                        <Spa2ImageField
                          label="Ảnh SAU"
                          value={afterImageValue(ba)}
                          onChange={(img) => updateBeforeAfterImage(ba.id, 'after', img)}
                          height={140}
                          allowZoom={false}
                        />
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
                    <Divider />
                    <Typography variant="caption" color="text.secondary">
                      Xem trước
                    </Typography>
                    <BeforeAfterPreviewCard ba={ba} />
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

      {/* ── REVIEWS TAB — each edit card carries its own inline "Xem trước"
          preview directly beneath its fields, replacing the old combined
          right-column grid (same idiom as the results tab / careers reasons tab) ── */}
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
          <Grid container spacing={2.5}>
            {value.feedbacks.map((f) => (
              <Grid key={f.id} xs={12} md={6}>
                <Card
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
                  <Divider sx={{ my: 1.5 }} />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    Xem trước
                  </Typography>
                  <FeedbackPreviewCard f={f} />
                </Card>
              </Grid>
            ))}
            {value.feedbacks.length === 0 && (
              <Grid xs={12}>
                <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
                  <Iconify icon="solar:chat-linear" width={40} sx={{ color: SPA2_SAGE, mb: 1 }} />
                  <Typography>Chưa có đánh giá nào.</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      )}

      {/* ── FAQ TAB ── */}
      {tab === 'faq' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={7}>
            <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
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
          </Grid>
          <Grid xs={12} md={5}>
            <SectionCard title="Xem trước" icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Box sx={{ py: 6 }}>
                  <Container maxWidth="md">
                    <Spa2SectionTitle eyebrow="FAQ" title="Câu hỏi thường gặp" />
                    {value.faqs.slice(0, 4).map((f, idx) => (
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
                    {value.faqs.length === 0 && (
                      <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
                        Chưa có câu hỏi nào để xem trước.
                      </Typography>
                    )}
                  </Container>
                </Box>
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* ── GALLERY TAB — not part of the public service details page markup;
          kept as a simple, standalone media bin managed separately. ── */}
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

      {/* ── PREVIEW TAB — full-page, exact same section order as
          Spa2ServiceDetailsPageView: Hero → 2-col (description+benefits |
          sticky price card) → Steps → Before/After (max 2) → Feedback →
          FAQ (max 4) → Spa2Cta ── */}
      {tab === 'preview' && (
        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: `1px solid ${SPA2_CREAM_DARK}` }}>
          <Box sx={{ bgcolor: 'background.default' }}>
            <Spa2PageHero
              image={value.image}
              imageStyle={mainImageStyle}
              eyebrow="Dịch vụ"
              title={value.name || 'Chi tiết dịch vụ'}
              subtitle={stripHtml(value.short)}
            />

            <Spa2ServiceMoTaPreview
              description={value.description}
              benefits={value.benefits}
              price={value.price}
              duration={value.duration}
            />

            {/* Quy trình - step timeline */}
            {value.steps.length > 0 && (
              <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
                <Container maxWidth="md">
                  <Spa2SectionTitle
                    eyebrow="Quy trình"
                    title={`${value.steps.length} bước trải nghiệm`}
                  />
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
                            <Box
                              sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }}
                            />
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
              </Box>
            )}

            {/* Before/After (max 2, matching the public page) */}
            {value.beforeAfters.length > 0 && (
              <Box sx={{ py: { xs: 8, md: 12 } }}>
                <Container>
                  <Spa2SectionTitle eyebrow="Kết quả" title="Hình ảnh trước & sau" />
                  <Grid container spacing={3}>
                    {value.beforeAfters.slice(0, 2).map((ba) => (
                      <Grid key={ba.id} xs={12} sm={6}>
                        <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                          <Grid container>
                            <Grid xs={6}>
                              <Box sx={{ position: 'relative' }}>
                                <Box
                                  sx={{
                                    height: 220,
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
                                    height: 220,
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
                        </Spa2SoftCard>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </Box>
            )}

            {/* Feedback liên quan — carousel (same component the public
                Spa2ServiceDetailsPageView uses) so this preview never drifts
                from the real page's feedback section */}
            {value.feedbacks.length > 0 && (
              <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
                <Container>
                  <Spa2SectionTitle eyebrow="Đánh giá" title="Khách hàng nói gì" />
                  <Carousel carousel={feedbackCarousel}>
                    {value.feedbacks.map((f) => (
                      <Box key={f.id} sx={{ px: 1 }}>
                        <FeedbackPreviewCard f={f} />
                      </Box>
                    ))}
                  </Carousel>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 3 }}
                  >
                    <CarouselDotButtons
                      variant="rounded"
                      scrollSnaps={feedbackCarousel.dots.scrollSnaps}
                      selectedIndex={feedbackCarousel.dots.selectedIndex}
                      onClickDot={feedbackCarousel.dots.onClickDot}
                    />
                    <CarouselArrowBasicButtons
                      {...feedbackCarousel.arrows}
                      options={feedbackCarousel.options}
                    />
                  </Stack>
                </Container>
              </Box>
            )}

            {/* FAQ (max 4) */}
            {value.faqs.length > 0 && (
              <Box sx={{ py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md">
                  <Spa2SectionTitle eyebrow="FAQ" title="Câu hỏi thường gặp" />
                  {value.faqs.slice(0, 4).map((f, idx) => (
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

            <Spa2Cta />
          </Box>
        </Box>
      )}
    </Spa2ManageShell>
  );
}
