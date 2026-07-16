import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { SPA2_CONTACT_CONTENT } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_TEAL_LIGHT } from 'src/sections/spa2/spa2-pages-data';
import { Spa2SingletonEditor } from 'src/sections/dashboard/spa2/manage/spa2-singleton-editor';

const metadata = { title: `Quản lý Liên hệ | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2SingletonEditor
        config={{
          title: 'Quản lý trang Liên hệ',
          description: 'Cập nhật thông tin liên hệ, CTA và địa chỉ hiển thị công khai.',
          breadcrumbLabel: 'Liên hệ',
          publicPath: '/spa2/contact',
          initial: SPA2_CONTACT_CONTENT,
          sections: [
            {
              title: 'Tiêu đề & CTA',
              icon: 'solar:chat-round-line-bold-duotone',
              fields: [
                { key: 'title', label: 'Tiêu đề', type: 'text' },
                { key: 'subtitle', label: 'Mô tả', type: 'textarea' },
                { key: 'ctaBook', label: 'CTA đặt lịch', type: 'text' },
                { key: 'ctaCall', label: 'CTA gọi điện', type: 'text' },
              ],
            },
            {
              title: 'Thông tin liên hệ',
              icon: 'solar:phone-bold-duotone',
              fields: [
                { key: 'phone', label: 'Số điện thoại', type: 'text' },
                { key: 'email', label: 'Email', type: 'text' },
                { key: 'address', label: 'Địa chỉ', type: 'text' },
              ],
            },
          ],
          renderPreview: (v) => (
            <Box
              sx={{
                p: 4,
                color: 'common.white',
                textAlign: 'center',
                background: `linear-gradient(135deg, ${SPA2_TEAL_DARK}, ${SPA2_TEAL}, ${SPA2_TEAL_LIGHT})`,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {v.title}
              </Typography>
              <Typography sx={{ opacity: 0.9, mb: 3, maxWidth: 480, mx: 'auto' }}>
                {v.subtitle}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  startIcon={<Iconify icon="solar:calendar-bold-duotone" />}
                  sx={{ borderRadius: 50, px: 3, bgcolor: 'common.white', color: SPA2_TEAL }}
                >
                  {v.ctaBook}
                </Button>
                <Button
                  startIcon={<Iconify icon="solar:phone-bold-duotone" />}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    color: 'common.white',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                  }}
                >
                  {v.ctaCall}
                </Button>
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                sx={{ pt: 3, opacity: 0.9 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Iconify icon="solar:phone-bold" width={16} />
                  <Typography variant="body2">{v.phone}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Iconify icon="solar:letter-bold" width={16} />
                  <Typography variant="body2">{v.email}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Iconify icon="solar:map-point-bold" width={16} />
                  <Typography variant="body2">{v.address}</Typography>
                </Stack>
              </Stack>
            </Box>
          ),
        }}
      />
    </>
  );
}
