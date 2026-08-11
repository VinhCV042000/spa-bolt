import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { SPA2_INK, SPA2_TEAL, SPA2_CREAM } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

type ExploreLink = {
  icon: string;
  title: string;
  desc: string;
  href: string;
};

const EXPLORE_LINKS: ExploreLink[] = [
  {
    icon: 'solar:letter-bold',
    title: 'Đăng ký bản tin',
    desc: 'Nhận ưu đãi độc quyền và bí quyết chăm sóc da mỗi tuần qua email.',
    href: paths.spa2.newsletter,
  },
  {
    icon: 'solar:crown-bold',
    title: 'Chương trình hội viên',
    desc: 'Ưu đãi riêng, đặt lịch ưu tiên và nhiều quyền lợi dành cho hội viên.',
    href: paths.spa2.membership,
  },
  {
    icon: 'solar:medal-ribbon-star-bold-duotone',
    title: 'Khách hàng thân thiết',
    desc: 'Tích điểm mỗi lần sử dụng dịch vụ, đổi quà và nhận đặc quyền hấp dẫn.',
    href: paths.spa2.loyaltyRewards,
  },
  {
    icon: 'solar:card-search-bold-duotone',
    title: 'Tìm chuyên viên phù hợp',
    desc: 'Kết nối với chuyên viên trị liệu phù hợp nhất với nhu cầu của bạn.',
    href: paths.spa2.spaFinder,
  },
  {
    icon: 'solar:gift-bold',
    title: 'Thẻ quà tặng',
    desc: 'Món quà sức khỏe ý nghĩa dành cho người thân yêu, đặt mua chỉ vài phút.',
    href: paths.spa2.giftCard,
  },
  {
    icon: 'solar:document-text-bold',
    title: 'Thực đơn dịch vụ',
    desc: 'Xem đầy đủ bảng giá và mô tả từng liệu trình chăm sóc tại spa.',
    href: paths.spa2.spaMenu,
  },
  {
    icon: 'solar:heart-bold',
    title: 'Dịp đặc biệt',
    desc: 'Trọn bộ gói trải nghiệm cho sinh nhật, kỷ niệm và những khoảnh khắc đáng nhớ.',
    href: paths.spa2.specialOccasions,
  },
  {
    icon: 'solar:case-bold',
    title: 'Tuyển dụng',
    desc: 'Gia nhập đội ngũ chuyên viên spa chuyên nghiệp và phát triển sự nghiệp cùng chúng tôi.',
    href: paths.spa2.careers,
  },
];

export function Spa2ExploreMore({ sx, ...other }: BoxProps) {
  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SPA2_CREAM, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
              Khám phá thêm
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: 'grey.900' }}>
              Nhiều trải nghiệm đang chờ bạn
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography sx={{ maxWidth: 560, color: 'grey.600' }}>
              Từ ưu đãi hội viên đến quà tặng sức khỏe — khám phá mọi tiện ích spa2 dành cho bạn.
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {EXPLORE_LINKS.map((link) => (
            <Grid xs={12} sm={6} md={3} key={link.title}>
              <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                <Card
                  component={RouterLink}
                  href={link.href}
                  sx={{
                    height: '100%',
                    p: 3,
                    display: 'block',
                    borderRadius: 3,
                    textDecoration: 'none',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(46,139,122,0.12)',
                    },
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'rgba(46,139,122,0.1)',
                      }}
                    >
                      <Iconify icon={link.icon} width={24} sx={{ color: SPA2_TEAL }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ color: SPA2_INK }}>
                      {link.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'grey.600', lineHeight: 1.6 }}>
                      {link.desc}
                    </Typography>
                  </Stack>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
