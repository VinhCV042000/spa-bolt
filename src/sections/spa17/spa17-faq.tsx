import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { CRYSTAL, AMETHYST, MIDNIGHT, ROSE_QUARTZ } from 'src/sections/spa17/spa17-data';

// ----------------------------------------------------------------------

const FAQ_ITEMS = [
  {
    q: 'Glass Skin Facial có đau không?',
    a: 'Hoàn toàn không đau. Liệu trình 10 bước K-beauty chỉ bao gồm double cleanse, exfoliate, ampoule, sheet mask và LED — tất cả đều nhẹ nhàng, thư giãn.',
  },
  {
    q: 'Tôi cần bao nhiêu buổi để thấy kết quả?',
    a: 'Glass Skin cho kết quả tức thì — da căng bóng ngay sau 1 buổi. Để duy trì lâu dài, khuyến nghị 4-6 buổi cách nhau 2 tuần.',
  },
  {
    q: 'Jjimjilbang có phù hợp người bị bệnh tim mạch?',
    a: 'Không. Sauna nhiệt cao không dành cho người bị tiền sử tim mạch, huyết áp cao hoặc mang thai. Vui lòng tư vấn trước khi đặt lịch.',
  },
  {
    q: 'Crystal Gua Sha có thật sự hiệu quả?',
    a: 'Có. Jade và Rose Quartz lạnh massage nâng cơ, giảm sưng và kích thích lưu thông. Hiệu quả tức thì sau mỗi buổi, kéo dài với liệu trình đều đặn.',
  },
  {
    q: 'Tôi có thể kết hợp nhiều liệu trình trong một ngày?',
    a: 'Có thể kết hợp Glass Skin + Crystal Gua Sha trong cùng ngày. Với Jjimjilbang, nên để riêng vì thời gian dài (120 phút).',
  },
];

// ----------------------------------------------------------------------

export function Spa17Faq() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#EEEDF5' }}>
      <Container component={MotionViewport} maxWidth="md">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: AMETHYST, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              CÂU HỎI THƯỜNG GẶP
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: MIDNIGHT,
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              Thắc mắc,{' '}
              <Box component="span" sx={{ color: ROSE_QUARTZ }}>
                giải đáp.
              </Box>
            </Typography>
          </Box>
        </Stack>

        {/* FAQ items */}
        <Stack spacing={3}>
          {FAQ_ITEMS.map((item, index) => (
            <Box
              key={item.q}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: '#FFF',
                boxShadow: '0 2px 12px rgba(154,123,184,0.08)',
                border: `1px solid rgba(154,123,184,0.1)`,
                transition: 'all 0.35s ease',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(154,123,184,0.15)',
                  borderColor: AMETHYST,
                },
              }}
            >
              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: `${AMETHYST}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: AMETHYST, fontWeight: 900, fontSize: 14 }}>
                    Q{index + 1}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: MIDNIGHT, fontWeight: 700, mb: 1 }}>{item.q}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(26,26,46,0.65)', lineHeight: 1.85 }}
                  >
                    {item.a}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* CTA */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 6,
            p: 4,
            borderRadius: 3,
            bgcolor: MIDNIGHT,
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle2" sx={{ color: CRYSTAL }}>
            Còn thắc mắc khác?
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(248,246,255,0.6)', mt: 1, lineHeight: 1.8 }}
          >
            Liên hệ trực tiếp qua hotline hoặc chat với team concierge — sẵn sàng giải đáp mọi câu
            hỏi.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
