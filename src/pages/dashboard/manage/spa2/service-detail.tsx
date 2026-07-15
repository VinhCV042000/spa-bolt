import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Grid from '@mui/material/Unstable_Grid2';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import {
  SPA2_SERVICES,
  findSpa2Service,
  type Spa2ServiceItem,
  type Spa2ServiceStatus,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import {
  SPA2_CREAM,
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM_DARK,
  SPA2_TEAL_DARK,
  SPA2_TEAL_LIGHT,
} from 'src/sections/spa2/spa2-pages-data';
import {
  spa2Faqs,
  spa2Feedbacks,
  spa2ServiceSteps,
  spa2BeforeAfters,
  spa2ContactInfo,
} from 'src/sections/spa2/spa2-pages-data';
import { Spa2ManageShell } from 'src/sections/dashboard/spa2/manage/spa2-manage-shell';

// ----------------------------------------------------------------------

const metadata = { title: `Chi tiết Dịch vụ | Spa2 - ${CONFIG.appName}` };

const STATUS_OPTIONS: Spa2ServiceStatus[] = ['Đang hiển thị', 'Bản nháp', 'Ẩn'];

const CATEGORIES = [
  { value: 'massage', label: 'Massage' },
  { value: 'facial', label: 'Facial' },
  { value: 'body', label: 'Body Care' },
  { value: 'couple', label: 'Spa Đôi' },
  { value: 'detox', label: 'Detox' },
];

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

// ----------------------------------------------------------------------

export default function Page() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const original = findSpa2Service(slug) ?? SPA2_SERVICES[0];
  const [value, setValue] = useState<Spa2ServiceItem>({ ...original });
  const [benefitsText, setBenefitsText] = useState(value.benefits.join(', '));
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const update = <K extends keyof Spa2ServiceItem>(k: K, v: Spa2ServiceItem[K]) =>
    setValue((prev) => ({ ...prev, [k]: v }));

  const handleSave = () => {
    const benefits = benefitsText
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);
    update('benefits', benefits);
    setSavedAt(new Date());
  };
  const handleApprove = () => {
    update('status', 'Đang hiển thị');
    setSavedAt(new Date());
  };
  const handleDelete = () => navigate(paths.dashboard.spa2.services);

  const relatedFeedbacks = spa2Feedbacks.filter((f) =>
    f.service.toLowerCase().includes(value.name.split(' ')[0].toLowerCase())
  );
  const feedbacksToShow =
    relatedFeedbacks.length > 0 ? relatedFeedbacks : spa2Feedbacks.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2ManageShell
        title={value.name || 'Chi tiết dịch vụ'}
        eyebrow="Nature Spa · Chi tiết dịch vụ"
        description={`Slug: /spa2/services/${value.slug}`}
        breadcrumbLabel="Dịch vụ"
        publicPath={paths.spa2.serviceDetails(value.slug)}
        actions={
          <>
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
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1.1fr' },
          }}
        >
          {/* ── Form ── */}
          <Stack spacing={2.5}>
            <Card sx={{ p: 3, borderRadius: 4, border: `1px solid ${SPA2_CREAM_DARK}` }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify icon="solar:hand-stars-bold-duotone" width={22} sx={{ color: SPA2_TEAL }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: SPA2_INK }}>
                  Thông tin dịch vụ
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
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
                  label="Ảnh"
                  size="small"
                  value={value.image}
                  onChange={(e) => update('image', e.target.value)}
                />
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
                <TextField
                  label="Trạng thái"
                  size="small"
                  select
                  value={value.status}
                  onChange={(e) => update('status', e.target.value as Spa2ServiceStatus)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Card>

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

            {savedAt && (
              <Chip
                size="small"
                color="success"
                label={`Đã lưu ${savedAt.toLocaleTimeString('vi-VN')}`}
                icon={<Iconify icon="solar:check-circle-bold" width={14} />}
                sx={{ alignSelf: 'flex-start' }}
              />
            )}
          </Stack>

          {/* ── Preview (matches public view) ── */}
          <Box>
            <Card
              sx={{
                p: 0,
                borderRadius: 4,
                overflow: 'hidden',
                position: 'sticky',
                top: 96,
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
              }}
            >
              {/* Hero image */}
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    height: 220,
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

              {/* Content */}
              <Box sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                  <Iconify icon={value.icon} sx={{ color: SPA2_TEAL }} width={28} />
                  <Typography variant="h6" sx={{ color: SPA2_INK }}>
                    {value.name}
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>{value.short}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
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
                </Stack>

                <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                  Lợi ích chính
                </Typography>
                <Grid container spacing={1.5} sx={{ mb: 3 }}>
                  {value.benefits.map((b) => (
                    <Grid key={b} xs={12} sm={6}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} width={18} />
                        <Typography sx={{ color: SPA2_INK, fontSize: 14 }}>{b}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Pricing card */}
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
          </Box>
        </Box>

        {/* ── Preview sections (matching public view) ── */}
        <Box sx={{ mt: 4 }}>
          {/* Process steps */}
          <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
            <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'center', alignItems: 'center' }}>
              <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                Quy trình
              </Typography>
              <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
                5 bước trải nghiệm
              </Typography>
            </Stack>
            <Stack spacing={0}>
              {spa2ServiceSteps.map((step, idx) => (
                <Stack key={step.title} direction="row" spacing={3}>
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
                    {idx < spa2ServiceSteps.length - 1 && (
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

          {/* Before/After */}
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
                {spa2BeforeAfters.slice(0, 2).map((ba) => (
                  <Grid key={ba.title} xs={12} sm={6}>
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
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{ba.title}</Typography>
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

          {/* Feedback */}
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
                {feedbacksToShow.map((f) => (
                  <Grid key={f.name} xs={12} sm={6} md={4}>
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
                          <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.name}</Typography>
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

          {/* FAQ */}
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
              {spa2Faqs.slice(0, 4).map((f, idx) => (
                <Accordion
                  key={f.q}
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
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Container>
          </Box>
        </Box>
      </Spa2ManageShell>
    </>
  );
}
