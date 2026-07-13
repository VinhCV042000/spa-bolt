import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  SAGE,
  GOLD,
  CRYSTAL,
  AMETHYST,
  MIDNIGHT,
  ROSE_QUARTZ,
} from 'src/sections/spa17/spa17-data';

// ----------------------------------------------------------------------

const MEMBERSHIPS = [
  {
    name: 'Crystal Starter',
    price: '3.500.000₫',
    period: '/tháng',
    sessions: '2 buổi',
    perks: [
      'Giảm 15% mọi liệu trình',
      '2 buổi Glass Skin Facial/tháng',
      'Món trà miễn phí khi đến',
      'Ưu tiên đặt lịch hotline',
    ],
    color: SAGE,
  },
  {
    name: 'Jade Elite',
    price: '6.800.000₫',
    period: '/tháng',
    sessions: '4 buổi',
    perks: [
      'Giảm 25% mọi liệu trình',
      '4 buổi tùy chọn/tháng',
      'Trà & healthy snack miễn phí',
      'Private lounge access',
      '1 Crystal Gua Sha tặng',
    ],
    color: AMETHYST,
    featured: true,
  },
  {
    name: 'Amethyst VIP',
    price: '12.500.000₫',
    period: '/tháng',
    sessions: '8 buổi',
    perks: [
      'Giảm 35% mọi liệu trình',
      '8 buổi premium/tháng',
      'Villa private access',
      'Concierge 24/7 riêng',
      'Workshop K-beauty miễn phí',
      'Quà tặng sinh nhật đặc biệt',
    ],
    color: ROSE_QUARTZ,
  },
];

// ----------------------------------------------------------------------

export function Spa17Membership() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: MIDNIGHT }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ROSE_QUARTZ, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              HỘI VIÊN ĐÁ QUÝ
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: CRYSTAL,
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              Đầu tư cho{' '}
              <Box component="span" sx={{ color: GOLD }}>
                làn da,
              </Box>{' '}
              đầu tư cho bản thân.
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(248,246,255,0.55)', maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}
            >
              Hội viên Crystal Glow trải nghiệm Korean luxury với ưu đãi độc quyền — Glass Skin dài
              lâu, not one-time glow.
            </Typography>
          </Box>
        </Stack>

        {/* Pricing Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {MEMBERSHIPS.map((plan) => (
            <Box
              key={plan.name}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: plan.featured ? '#252542' : '#1B1B32',
                border: plan.featured
                  ? `2px solid ${plan.color}`
                  : `1px solid rgba(155,123,184,0.15)`,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.35s ease',
                ...(plan.featured && {
                  transform: { md: 'scale(1.05)' },
                  boxShadow: `0 20px 60px ${plan.color}20`,
                }),
                '&:hover': {
                  borderColor: plan.color,
                  boxShadow: `0 16px 50px ${plan.color}15`,
                },
              }}
            >
              {/* Badge */}
              {plan.featured && (
                <Box
                  sx={{
                    alignSelf: 'flex-start',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: plan.color,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: MIDNIGHT, fontWeight: 700, fontSize: 10, letterSpacing: 1 }}
                  >
                    PHỔ BIẾN NHẤT
                  </Typography>
                </Box>
              )}

              {/* Name */}
              <Typography variant="h5" sx={{ color: CRYSTAL, fontWeight: 900, mb: 1 }}>
                {plan.name}
              </Typography>

              {/* Price */}
              <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 1 }}>
                <Typography variant="h3" sx={{ color: plan.color, fontWeight: 900 }}>
                  {plan.price}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(248,246,255,0.5)' }}>
                  {plan.period}
                </Typography>
              </Stack>

              <Typography variant="caption" sx={{ color: 'rgba(248,246,255,0.4)', mb: 3 }}>
                {plan.sessions} mỗi tháng
              </Typography>

              {/* Perks */}
              <Stack spacing={1.5} sx={{ flex: 1 }}>
                {plan.perks.map((perk) => (
                  <Stack key={perk} direction="row" spacing={1.5} alignItems="flex-start">
                    <Iconify
                      icon="solar:check-circle-bold"
                      width={18}
                      sx={{ color: plan.color, mt: 0.25 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: 'rgba(248,246,255,0.75)', lineHeight: 1.6 }}
                    >
                      {perk}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* CTA */}
              <Box
                component={m.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: plan.color,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    boxShadow: `0 8px 24px ${plan.color}40`,
                  },
                }}
              >
                <Typography sx={{ color: MIDNIGHT, fontWeight: 700 }}>Đăng ký ngay</Typography>
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
            bgcolor: 'rgba(155,123,184,0.08)',
            border: `1px solid rgba(155,123,184,0.2)`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(248,246,255,0.65)' }}>
            Hội viên có thể nâng cấp hoặc downgrade bất cứ lúc nào. Cam kết không phát sinh chi phí
            ẩn.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
