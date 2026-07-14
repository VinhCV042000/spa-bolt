import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { SPA2_HOME_CONTENT } from 'src/_mock/_spa2';

import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_TEAL_LIGHT } from 'src/sections/spa2/spa2-data';
import { Spa2SingletonEditor } from 'src/sections/dashboard/spa2/manage/spa2-singleton-editor';

// ----------------------------------------------------------------------

const metadata = { title: `Quản lý Trang chủ | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2SingletonEditor
        config={{
          title: 'Quản lý Trang chủ',
          description: 'Chỉnh sửa nội dung hero, slogan và CTA hiển thị trên trang chủ Spa2.',
          breadcrumbLabel: 'Trang chủ',
          publicPath: '/spa2',
          initial: SPA2_HOME_CONTENT,
          sections: [
            {
              title: 'Nội dung Hero',
              icon: 'solar:home-2-bold-duotone',
              fields: [
                { key: 'heroEyebrow', label: 'Eyebrow', type: 'text' },
                { key: 'heroTitle', label: 'Tiêu đề chính', type: 'text' },
                { key: 'heroSubtitle', label: 'Mô tả ngắn', type: 'textarea' },
                { key: 'heroImage', label: 'Đường dẫn ảnh hero', type: 'text' },
              ],
            },
            {
              title: 'Nút hành động',
              icon: 'solar:cursor-square-bold-duotone',
              fields: [
                { key: 'ctaBook', label: 'CTA đặt lịch', type: 'text' },
                { key: 'ctaExplore', label: 'CTA khám phá', type: 'text' },
              ],
            },
          ],
          renderPreview: (v) => (
            <Box
              sx={{
                position: 'relative',
                minHeight: 460,
                display: 'flex',
                alignItems: 'center',
                px: 4,
                py: 6,
                color: 'common.white',
                background: `linear-gradient(135deg, ${SPA2_TEAL_DARK} 0%, ${SPA2_TEAL} 60%, ${SPA2_TEAL_LIGHT} 100%), url(${v.heroImage})`,
                backgroundBlendMode: 'multiply',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Stack spacing={2} sx={{ maxWidth: 480 }}>
                <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.9 }}>
                  {v.heroEyebrow}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.15 }}>
                  {v.heroTitle}
                </Typography>
                <Typography sx={{ opacity: 0.92 }}>{v.heroSubtitle}</Typography>
                <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
                  <Button
                    sx={{
                      borderRadius: 50,
                      px: 3,
                      bgcolor: 'common.white',
                      color: SPA2_TEAL,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                    }}
                  >
                    {v.ctaBook}
                  </Button>
                  <Button
                    sx={{
                      borderRadius: 50,
                      px: 3,
                      color: 'common.white',
                      border: '1.5px solid rgba(255,255,255,0.7)',
                      '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.1)' },
                    }}
                  >
                    {v.ctaExplore}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ),
        }}
      />
    </>
  );
}
