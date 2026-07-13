import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { TEA, INK, JADE, RICE, CINNABAR, LOTUS_PINK } from 'src/sections/spa19/spa19-data';

// ----------------------------------------------------------------------

const HERBS = [
  {
    icon: 'solar:leaf-bold-duotone',
    name: 'Trầm Hương',
    desc: 'Gỗ quý xông thiền — thanh lọc không gian, an thần sâu, kết nối tâm linh.',
    benefit: 'An thần · Thanh lọc',
    price: '550.000₫/10g',
    color: JADE,
  },
  {
    icon: 'solar:heart-pulse-bold-duotone',
    name: 'Nhân Sâm',
    desc: 'Sâm Hàn Quốc 6 năm tuổi — bồi bổ nguyên khí, tăng sinh lực, phục hồi sức khỏe.',
    benefit: 'Bồi bổ · Sinh lực',
    price: '1.200.000₫/50g',
    color: CINNABAR,
  },
  {
    icon: 'solar:fire-bold-duotone',
    name: 'Ngải Cứu',
    desc: 'Ngải cứu khô núi Sapa — sưởi ấm kinh lạc, mosa, tắm thảo dược, giảm đau.',
    benefit: 'Sưởi ấm · Giảm đau',
    price: '180.000₫/bó',
    color: TEA,
  },
  {
    icon: 'solar:leaf-bold-duotone',
    name: 'Đinh Hương',
    desc: 'Hoa đinh hương nguyên bông — xông hương, trà thuốc, kháng khuẩn tự nhiên.',
    benefit: 'Kháng khuẩn · Hương liệu',
    price: '320.000₫/30g',
    color: LOTUS_PINK,
  },
];

// ----------------------------------------------------------------------

export function Spa19Apothecary() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: INK }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TEA, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              DƯỢC LIỆU CỔ TRUYỀN
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: RICE,
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              Nhà thuốc{' '}
              <Box component="span" sx={{ color: JADE }}>
                Nam
              </Box>{' '}
              — mang về dưỡng sinh.
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(245,240,230,0.55)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              Dược liệu chuẩn Việt — tuyển chọn từ vườn thuốc gia truyền, đóng gói thủ công. Dùng
              tại nhà, hiệu quả bền lâu.
            </Typography>
          </Box>
        </Stack>

        {/* Herbs Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
            gap: 3,
          }}
        >
          {HERBS.map((herb) => (
            <Box
              key={herb.name}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                bgcolor: '#374551',
                border: `1px solid ${herb.color}30`,
                display: 'flex',
                gap: 3,
                transition: 'all 0.35s ease',
                '&:hover': {
                  borderColor: herb.color,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 16px 40px ${herb.color}10`,
                  '& .herb-icon': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              {/* Icon */}
              <Box
                className="herb-icon"
                sx={{
                  width: 56,
                  height: 56,
                  flexShrink: 0,
                  borderRadius: '50%',
                  bgcolor: `${herb.color}15`,
                  border: `1px solid ${herb.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.4s ease',
                }}
              >
                <Iconify icon={herb.icon} width={26} sx={{ color: herb.color }} />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ mb: 0.5 }}
                >
                  <Typography variant="h6" sx={{ color: RICE, fontWeight: 900 }}>
                    {herb.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: herb.color, fontFamily: 'monospace', fontWeight: 700 }}
                  >
                    {herb.price}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(245,240,230,0.65)', lineHeight: 1.85, mb: 1 }}
                >
                  {herb.desc}
                </Typography>
                <Typography variant="overline" sx={{ color: herb.color, letterSpacing: 1 }}>
                  {herb.benefit}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom note */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 6,
            p: 3,
            borderRadius: 2,
            bgcolor: '#3E4F5C',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(245,240,230,0.6)' }}>
            * Dược liệu tư vấn bởi Đông y sư. Không dùng thay thế thuốc kê đơn — tham khảo bác sĩ
            nếu đang điều trị bệnh.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
