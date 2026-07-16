import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { SPA2_ACCOUNT_CONTENT } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';

import { SPA2_TEAL, SPA2_CREAM } from 'src/sections/spa2/spa2-pages-data';
import { Spa2SingletonEditor } from 'src/sections/dashboard/spa2/manage/spa2-singleton-editor';

const metadata = { title: `Quản lý Tài khoản | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2SingletonEditor
        config={{
          title: 'Quản lý trang Tài khoản',
          description: 'Chỉnh sửa lời chào, avatar mặc định và menu tài khoản khách hàng.',
          breadcrumbLabel: 'Tài khoản',
          publicPath: '/spa2/account',
          initial: SPA2_ACCOUNT_CONTENT,
          sections: [
            {
              title: 'Chào mừng',
              icon: 'solar:user-bold-duotone',
              fields: [
                { key: 'greetingTitle', label: 'Tiêu đề chào', type: 'text' },
                { key: 'greetingSubtitle', label: 'Mô tả', type: 'textarea' },
                { key: 'defaultAvatar', label: 'Ảnh avatar mặc định', type: 'text' },
              ],
            },
          ],
          renderPreview: (v) => (
            <Box sx={{ p: 3, bgcolor: SPA2_CREAM }}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <Avatar src={v.defaultAvatar} sx={{ width: 64, height: 64 }} />
                  <Box>
                    <Typography variant="h6">{v.greetingTitle}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {v.greetingSubtitle}
                    </Typography>
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  {v.menuItems?.map((m: any) => (
                    <Stack
                      key={m.key}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { bgcolor: `${SPA2_TEAL}0d` },
                      }}
                    >
                      <Iconify icon={m.icon} width={22} sx={{ color: SPA2_TEAL }} />
                      <Typography variant="body2">{m.label}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Card>
            </Box>
          ),
        }}
      />
    </>
  );
}
