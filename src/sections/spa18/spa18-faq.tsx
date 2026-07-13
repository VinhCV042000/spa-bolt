import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SAND, CORAL, JUNGLE, BAMBOO, SUNSET, EMERALD } from 'src/sections/spa18/spa18-data';

// ----------------------------------------------------------------------

const FAQ_ITEMS = [
  {
    q: 'Balinese Blessing có phù hợp cho người mới lần đầu đi spa?',
    a: 'Rất phù hợp. Đây là liệu trình入门 của chúng tôi — massage nhẹ, tắm sữa dừa thơm, mặt nạ ngọc trai. Không áp lực, chỉ thư giãn.',
  },
  {
    q: 'Villa Lotus có tắm riêng không?',
    a: 'Có. Mỗi villa có hồ sen riêng + bồn tắm hoa outside + sauna mini. Bạn có thể book trọn gói hoặc theo giờ.',
  },
  {
    q: 'Dầu dừa dùng ở spa có phải dầu dừa thường?',
    a: 'Không. Chúng tôi dùng dầu dừa tươi ép nguội từ Dừa Bến Tre — nguyên chất, không pha, vitamin E cao. Mùi thơm tự nhiên, không gắt.',
  },
  {
    q: 'Tôi bị dị ứng frangipani, có thể thay thế hương liệu?',
    a: 'Có thể thay bằng mandarin hoặc ylang-ylang. Vui lòng báo trước khi đặt lịch — team sẽ chuẩn bị dầu phù hợp.',
  },
  {
    q: 'Jungle Renewal có đau không?',
    a: 'Không. Tắm bùn núi lửa nhẹ nhàng, không xát. Body scrub cà phê chỉ tẩy da chết bề mặt, không gây đỏ hay rát.',
  },
];

// ----------------------------------------------------------------------

export function Spa18Faq() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: JUNGLE }}>
      <Container component={MotionViewport} maxWidth="md">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: SUNSET, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              CÂU HỎI THƯỜNG GẶP
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: SAND,
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              Thắc mắc,{' '}
              <Box component="span" sx={{ color: CORAL }}>
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
                bgcolor: EMERALD,
                border: `1px solid ${BAMBOO}40`,
                transition: 'all 0.35s ease',
                '&:hover': {
                  borderColor: BAMBOO,
                  boxShadow: `0 8px 30px rgba(82,183,136,0.15)`,
                },
              }}
            >
              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: `${SUNSET}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: SUNSET, fontWeight: 900, fontSize: 14 }}>
                    Q{index + 1}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: SAND, fontWeight: 700, mb: 1 }}>{item.q}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(253,246,227,0.7)', lineHeight: 1.85 }}
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
            bgcolor: EMERALD,
            border: `1px solid ${SUNSET}30`,
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle2" sx={{ color: SUNSET }}>
            Còn thắc mắc khác?
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(253,246,227,0.6)', mt: 1, lineHeight: 1.8 }}
          >
            Liên hệ qua hotline hoặc chat với team Balinese concierge — sẵn sàng giải đáp mọi câu
            hỏi.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
