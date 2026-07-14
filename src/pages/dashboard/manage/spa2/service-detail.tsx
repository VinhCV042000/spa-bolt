import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { SPA2_SERVICES, findSpa2Service, type Spa2ServiceItem } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import { SPA2_TEAL } from 'src/sections/spa2/spa2-data';
import { Spa2ManageShell } from 'src/sections/dashboard/spa2/manage/spa2-manage-shell';

// ----------------------------------------------------------------------

const metadata = { title: `Chi tiết Dịch vụ | Spa2 - ${CONFIG.appName}` };

const STATUS_OPTIONS: Spa2ServiceItem['status'][] = ['Đang hiển thị', 'Bản nháp', 'Ẩn'];

export default function Page() {
  const { slug = '' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const original = findSpa2Service(slug) ?? SPA2_SERVICES[0];
  const [value, setValue] = useState<Spa2ServiceItem>({ ...original });
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const update = <K extends keyof Spa2ServiceItem>(k: K, v: Spa2ServiceItem[K]) =>
    setValue((prev) => ({ ...prev, [k]: v }));

  const handleSave = () => setSavedAt(new Date());
  const handleApprove = () => {
    update('status', 'Đang hiển thị');
    setSavedAt(new Date());
  };
  const handleDelete = () => navigate(paths.dashboard.spa2.services);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2ManageShell
        title={value.title || 'Chi tiết dịch vụ'}
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
          {/* Form */}
          <Stack spacing={2.5}>
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify
                  icon="solar:hand-stars-bold-duotone"
                  width={22}
                  sx={{ color: SPA2_TEAL }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
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
                  value={value.title}
                  onChange={(e) => update('title', e.target.value)}
                />
                <TextField
                  label="Mô tả"
                  size="small"
                  multiline
                  rows={3}
                  value={value.desc}
                  onChange={(e) => update('desc', e.target.value)}
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
                  value={value.benefits.join(', ')}
                  onChange={(e) =>
                    update(
                      'benefits',
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                />
                <TextField
                  label="Trạng thái"
                  size="small"
                  select
                  value={value.status}
                  onChange={(e) => update('status', e.target.value as Spa2ServiceItem['status'])}
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
                variant="soft"
                color="success"
                label={`Đã lưu ${savedAt.toLocaleTimeString('vi-VN')}`}
                icon={<Iconify icon="solar:check-circle-bold" width={14} />}
                sx={{ alignSelf: 'flex-start' }}
              />
            )}
          </Stack>

          {/* Preview */}
          <Box>
            <Card sx={{ p: 2.5, borderRadius: 3, position: 'sticky', top: 96, bgcolor: 'grey.50' }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Iconify icon="solar:eye-bold" width={20} sx={{ color: SPA2_TEAL }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Xem trước card dịch vụ
                </Typography>
              </Stack>
              <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={value.image}
                  alt={value.title}
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <Stack spacing={1.5} sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon={value.icon} width={22} sx={{ color: SPA2_TEAL }} />
                    <Typography variant="h6">{value.title}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {value.desc}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {value.benefits.map((b) => (
                      <Chip key={b} label={b} size="small" variant="soft" sx={{ mb: 0.5 }} />
                    ))}
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      {value.duration}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                      {value.price.toLocaleString('vi-VN')} đ
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Card>
          </Box>
        </Box>
      </Spa2ManageShell>
    </>
  );
}
