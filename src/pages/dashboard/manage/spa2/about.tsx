import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

import { SPA2_ABOUT_CONTENT } from 'src/_mock/_spa2';
import { SPA2_TEAL, SPA2_TEAL_LIGHT } from 'src/sections/spa2/spa2-data';
import { Iconify } from 'src/components/iconify';
import { Spa2SingletonEditor } from 'src/sections/dashboard/spa2/manage/spa2-singleton-editor';

const metadata = { title: `Quản lý Giới thiệu | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2SingletonEditor
        config={{
          title: 'Quản lý trang Giới thiệu',
          description: 'Chỉnh sửa câu chuyện thương hiệu và điểm nổi bật của Nature Spa.',
          breadcrumbLabel: 'Giới thiệu',
          publicPath: '/spa2/about',
          initial: SPA2_ABOUT_CONTENT,
          sections: [
            {
              title: 'Câu chuyện',
              icon: 'solar:info-circle-bold-duotone',
              fields: [
                { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
                { key: 'title', label: 'Tiêu đề', type: 'text' },
                { key: 'description', label: 'Mô tả', type: 'textarea' },
                { key: 'image', label: 'Ảnh minh hoạ', type: 'text' },
              ],
            },
          ],
          renderPreview: (v) => (
            <Box sx={{ p: 3 }}>
              <Box
                component="img"
                src={v.image}
                alt=""
                sx={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 2, mb: 2 }}
              />
              <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 2 }}>
                {v.eyebrow}
              </Typography>
              <Typography variant="h5" sx={{ mt: 0.5, mb: 1.5 }}>
                {v.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                {v.description}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                {v.features?.map((f: any) => (
                  <Box
                    key={f.title}
                    sx={{
                      flex: 1,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${SPA2_TEAL_LIGHT}22`,
                      border: `1px solid ${SPA2_TEAL_LIGHT}66`,
                    }}
                  >
                    <Iconify icon={f.icon} width={22} sx={{ color: SPA2_TEAL, mb: 0.5 }} />
                    <Typography variant="subtitle2">{f.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {f.desc}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ),
        }}
      />
    </>
  );
}
