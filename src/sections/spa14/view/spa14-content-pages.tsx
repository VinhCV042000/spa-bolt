import { useParams } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import { Tab, Tabs, Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

import {
  SPA14_INK,
  spa14Faqs,
  SPA14_SAND,
  SPA14_OLIVE,
  SPA14_TERRA,
  spa14Offers,
  spa14Careers,
  spa14Gallery,
  spa14Branches,
  spa14Policies,
  spa14Services,
  spa14BlogPosts,
  spa14Feedbacks,
  spa14Treatments,
  spa14Promotions,
  SPA14_SAND_DARK,
  SPA14_TERRA_DARK,
  spa14ContactInfo,
  spa14Instructors,
  spa14JoinReasons,
  spa14ComboOffers,
  SPA14_TERRA_LIGHT,
  SPA14_PAGE_IMAGES,
  spa14BeforeAfters,
  spa14VideoReviews,
  spa14ServiceSteps,
  spa14QualityCerts,
  spa14Technologies,
  spa14CareersSlogan,
  spa14ExtraPartners,
  spa14BlogCategories,
  spa14Collaborations,
  spa14PartnerProfiles,
  spa14TrainingMission,
  spa14TrainingRoadmap,
  spa14BookingPackages,
  spa14TrainingPrograms,
  spa14GraduateShowcase,
  spa14WorkplaceGallery,
  spa14TreatmentProcess,
  spa14TreatmentExperts,
  spa14ServiceCategories,
  spa14PartnerCategories,
  spa14RecruitmentProcess,
  spa14InternalVideoThumb,
} from '../spa14-pages-data';

// ----------------------------------------------------------------------
// SHARED BUILDING BLOCKS – Nature/cream style with curved organic shapes
// ----------------------------------------------------------------------

const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

function Spa14SubPageHero({
  image,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: SPA14_SAND,
        pt: { xs: 10, md: 14 },
        pb: { xs: 12, md: 16 },
        overflow: 'hidden',
      }}
    >
      {/* organic circle */}
      <Box
        sx={{
          position: 'absolute',
          top: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: '50%',
          bgcolor: SPA14_TERRA_LIGHT,
          opacity: 0.12,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -120,
          left: -100,
          width: 320,
          height: 320,
          borderRadius: '50%',
          bgcolor: SPA14_OLIVE,
          opacity: 0.18,
        }}
      />

      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={7}>
            <Stack spacing={2.5}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Iconify icon="solar:sun-bold" sx={{ color: SPA14_TERRA }} />
                <Typography variant="overline" sx={{ color: SPA14_TERRA, letterSpacing: 3 }}>
                  {eyebrow}
                </Typography>
              </Stack>
              <Typography variant="h1" sx={{ color: SPA14_INK, fontWeight: 600, lineHeight: 1.1 }}>
                {title}
              </Typography>
              <Typography
                sx={{ color: 'text.secondary', fontSize: 18, lineHeight: 1.7, maxWidth: 560 }}
              >
                {subtitle}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
                <Button
                  component={RouterLink}
                  href={paths.spa14.booking}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 999,
                    bgcolor: SPA14_TERRA,
                    color: 'common.white',
                    '&:hover': { bgcolor: SPA14_TERRA_DARK },
                  }}
                  startIcon={<Iconify icon="solar:calendar-bold" />}
                >
                  Đặt lịch ngay
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.spa14.contact}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 999,
                    color: SPA14_TERRA_DARK,
                    border: `1.5px solid ${SPA14_TERRA}`,
                  }}
                >
                  Liên hệ tư vấn
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '4/5',
                borderRadius: '50% 50% 30% 30% / 30% 30% 20% 20%',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(46,139,122,0.25)',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Spa14SubSectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <Stack
      spacing={1.5}
      sx={{
        mb: 6,
        textAlign: align,
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      <Typography variant="overline" sx={{ color: SPA14_TERRA, letterSpacing: 3 }}>
        {eyebrow}
      </Typography>
      <Typography variant="h3" sx={{ color: SPA14_INK, fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ maxWidth: 720, color: 'text.secondary' }}>{subtitle}</Typography>
      )}
    </Stack>
  );
}

function Spa14SubSoftCard({ children, sx }: { children: React.ReactNode; sx?: any }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: 'common.white',
        border: `1px solid ${SPA14_SAND_DARK}`,
        boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
        height: '100%',
        transition: 'all .25s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px rgba(46,139,122,0.15)',
          borderColor: SPA14_TERRA_LIGHT,
        },
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function Spa14SubCta() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA14_SAND }}>
      <Container>
        <Card
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            color: 'common.white',
            background: `linear-gradient(135deg, ${SPA14_TERRA} 0%, ${SPA14_TERRA_DARK} 100%)`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 220,
              height: 220,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.08)',
            }}
          />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            sx={{ position: 'relative' }}
          >
            <Stack spacing={1}>
              <Typography variant="h3">Sẵn sàng cho hành trình xanh?</Typography>
              <Typography sx={{ opacity: 0.85 }}>
                Đặt lịch ngay hôm nay – tặng kèm trà thảo mộc & xông hơi đá muối.
              </Typography>
            </Stack>
            <Button
              component={RouterLink}
              href={paths.spa14.booking}
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 999,
                bgcolor: 'common.white',
                color: SPA14_TERRA_DARK,
                '&:hover': { bgcolor: SPA14_SAND },
              }}
            >
              Đặt lịch ngay
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}

function Spa14SubPageShell({ children }: { children: React.ReactNode }) {
  return <Box sx={{ bgcolor: 'background.default' }}>{children}</Box>;
}

// ======================================================================
// 1. ABOUT
// ======================================================================
// export function Spa14SubAboutPageView() {
//   const values = [
//     {
//       icon: 'solar:sun-bold-duotone',
//       title: 'Thiên nhiên',
//       desc: '100% nguyên liệu hữu cơ, không hóa chất độc hại.',
//     },
//     {
//       icon: 'solar:hand-heart-bold-duotone',
//       title: 'Tận tâm',
//       desc: 'Mỗi khách hàng là một câu chuyện chăm sóc riêng.',
//     },
//     {
//       icon: 'solar:medal-star-bold-duotone',
//       title: 'Chuyên môn',
//       desc: 'KTV đào tạo quốc tế, chứng chỉ CIDESCO.',
//     },
//     {
//       icon: 'solar:global-bold-duotone',
//       title: 'Bền vững',
//       desc: 'Bao bì tái chế, năng lượng mặt trời tại chi nhánh.',
//     },
//   ];
//   const milestones = [
//     { year: '2015', label: 'Thành lập tại TP.HCM' },
//     { year: '2018', label: 'Mở chi nhánh Hà Nội & Đà Nẵng' },
//     { year: '2021', label: 'Đạt chứng chỉ Eco-Spa quốc tế' },
//     { year: '2024', label: '25.000+ khách hàng tin yêu' },
//   ];

//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.about}
//         eyebrow="Về Imperial Vienna"
//         title="Hành trình mang thiên nhiên vào từng liệu trình"
//         subtitle="Chúng tôi tin rằng vẻ đẹp đích thực bắt nguồn từ sự cân bằng giữa cơ thể, tâm trí và thiên nhiên."
//       />

//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Spa14SubSectionTitle eyebrow="Giá trị cốt lõi" title="Bốn trụ cột của chúng tôi" />
//           <Grid container spacing={3}>
//             {values.map((v) => (
//               <Grid key={v.title} xs={12} sm={6} md={3}>
//                 <Spa14SubSoftCard>
//                   <Iconify icon={v.icon} width={48} sx={{ color: SPA14_TERRA, mb: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1, color: SPA14_INK }}>
//                     {v.title}
//                   </Typography>
//                   <Typography sx={{ color: 'text.secondary' }}>{v.desc}</Typography>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
//         <Container>
//           <Spa14SubSectionTitle eyebrow="Cột mốc" title="10 năm vun đắp" />
//           <Grid container spacing={3}>
//             {milestones.map((m) => (
//               <Grid key={m.year} xs={12} sm={6} md={3}>
//                 <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
//                   <Typography variant="h2" sx={{ color: SPA14_TERRA, fontWeight: 700 }}>
//                     {m.year}
//                   </Typography>
//                   <Typography sx={{ color: SPA14_INK, mt: 1 }}>{m.label}</Typography>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }
// ======================================================================
// 1. ABOUT
// ======================================================================
export function Spa14SubAboutPageView() {
  const { t } = useTranslate('spa14');
  const story = [
    'Imperial Vienna ra đời năm 2015 tại TP.HCM, khởi nguồn từ mong muốn mang những liệu pháp chăm sóc da và cơ thể an toàn, lành tính đến gần hơn với phụ nữ Việt – nơi thiên nhiên và khoa học cùng song hành.',
    'Từ một cơ sở nhỏ với 3 kỹ thuật viên, chúng tôi đã phát triển thành hệ thống 4 chi nhánh trên toàn quốc, đồng hành cùng hơn 25.000 khách hàng trong hành trình tìm lại sự cân bằng cho cơ thể và tâm trí.',
    'Mỗi sản phẩm, mỗi liệu trình tại Imperial Vienna đều được chọn lọc kỹ lưỡng từ nguyên liệu hữu cơ, kết hợp công nghệ chăm sóc da hiện đại từ châu Âu – để vẻ đẹp không chỉ nằm ở bề ngoài mà còn lan tỏa từ bên trong.',
  ];

  const visionMission = [
    {
      icon: 'solar:eye-bold-duotone',
      title: 'Tầm nhìn',
      desc: 'Trở thành hệ thống spa thiên nhiên hàng đầu Việt Nam – điểm đến tin cậy cho hành trình chăm sóc sức khỏe và vẻ đẹp bền vững của mọi phụ nữ.',
    },
    {
      icon: 'solar:heart-bold-duotone',
      title: 'Sứ mệnh',
      desc: 'Mang đến trải nghiệm chăm sóc toàn diện, an toàn và tận tâm – giúp khách hàng cân bằng cơ thể, tâm trí và kết nối sâu sắc hơn với thiên nhiên.',
    },
  ];

  const team = [
    {
      name: 'Nguyễn Thảo Vy',
      role: 'Nhà sáng lập & CEO',
      image: 'https://i.pravatar.cc/300?img=47',
      bio: 'Hơn 15 năm kinh nghiệm trong ngành chăm sóc sắc đẹp, chứng chỉ CIDESCO quốc tế.',
    },
    {
      name: 'Trần Minh Khôi',
      role: 'Giám đốc chuyên môn',
      image: 'https://i.pravatar.cc/300?img=12',
      bio: 'Chuyên gia trị liệu da với hơn 10 năm tu nghiệp tại Pháp và Hàn Quốc.',
    },
    {
      name: 'Phạm Hồng Nhi',
      role: 'Trưởng phòng đào tạo',
      image: 'https://i.pravatar.cc/300?img=32',
      bio: 'Đào tạo hơn 500 kỹ thuật viên đạt chuẩn quốc tế trong 8 năm qua.',
    },
    {
      name: 'Lê Gia Huy',
      role: 'Chuyên gia Detox & dinh dưỡng',
      image: 'https://i.pravatar.cc/300?img=14',
      bio: 'Cố vấn dinh dưỡng cho các liệu trình detox và chăm sóc body toàn diện.',
    },
  ];

  const certifications = [
    {
      icon: 'solar:medal-ribbon-star-bold-duotone',
      name: 'Eco-Spa Certified',
      org: 'Green Spa Network',
      year: '2021',
    },
    {
      icon: 'solar:verified-check-bold-duotone',
      name: 'CIDESCO International',
      org: 'CIDESCO',
      year: '2019',
    },
    {
      icon: 'solar:cup-star-bold-duotone',
      name: 'Top 10 Spa Việt Nam',
      org: 'Vietnam Beauty Awards',
      year: '2023',
    },
    {
      icon: 'solar:shield-check-bold-duotone',
      name: 'ISO 9001:2015',
      org: 'Bureau Veritas',
      year: '2022',
    },
  ];

  return (
    <Spa14SubPageShell>
      {/* Banner */}
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.about}
        eyebrow={t('pages.about.eyebrow')}
        title={t('pages.about.title')}
        subtitle={t('pages.about.subtitle')}
      />

      {/* Story thương hiệu */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: '30% 30% 50% 50% / 20% 20% 30% 30%',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(46,139,122,0.2)',
                  backgroundImage: `url(${SPA14_PAGE_IMAGES.about})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Spa14SubSectionTitle
                eyebrow="Câu chuyện"
                title="Thương hiệu của chúng tôi"
                align="left"
              />
              <Stack spacing={2.5}>
                {story.map((p, idx) => (
                  <Typography key={idx} sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                    {p}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Vision / Mission */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Định hướng" title="Tầm nhìn & Sứ mệnh" />
          <Grid container spacing={3}>
            {visionMission.map((v) => (
              <Grid key={v.title} xs={12} md={6}>
                <Spa14SubSoftCard sx={{ textAlign: 'center', py: 5 }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 2.5,
                      borderRadius: '50%',
                      bgcolor: SPA14_TERRA,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={v.icon} width={36} sx={{ color: 'common.white' }} />
                  </Box>
                  <Typography variant="h5" sx={{ color: SPA14_INK, mb: 1.5 }}>
                    {v.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', maxWidth: 420, mx: 'auto' }}>
                    {v.desc}
                  </Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Đội ngũ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa14SubSectionTitle
            eyebrow="Con người"
            title="Đội ngũ chuyên gia"
            subtitle="Mỗi liệu trình tại Imperial Vienna được thực hiện bởi những con người tận tâm và giàu kinh nghiệm."
          />
          <Grid container spacing={3}>
            {team.map((d) => (
              <Grid key={d.name} xs={12} sm={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={d.image}
                    sx={{
                      width: 96,
                      height: 96,
                      mx: 'auto',
                      mb: 2,
                      border: `3px solid ${SPA14_TERRA_LIGHT}`,
                    }}
                  />
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 0.5 }}>
                    {d.name}
                  </Typography>
                  <Typography
                    sx={{ color: SPA14_TERRA_DARK, fontSize: 14, fontWeight: 600, mb: 1.5 }}
                  >
                    {d.role}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{d.bio}</Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Chứng nhận / giải thưởng */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Vinh danh" title="Chứng nhận & giải thưởng" />
          <Grid container spacing={3}>
            {certifications.map((c) => (
              <Grid key={c.name} xs={12} sm={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={c.icon} width={48} sx={{ color: SPA14_TERRA, mb: 2 }} />
                  <Typography variant="subtitle1" sx={{ color: SPA14_INK, mb: 0.5 }}>
                    {c.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{c.org}</Typography>
                  <Chip
                    label={c.year}
                    size="small"
                    sx={{ mt: 1.5, bgcolor: SPA14_SAND_DARK, color: SPA14_TERRA_DARK }}
                  />
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 2. SERVICES
// ======================================================================
// export function Spa14SubServicesPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.services}
//         eyebrow="Dịch vụ"
//         title="Bộ sưu tập liệu pháp từ thiên nhiên"
//         subtitle="Mỗi liệu trình là một hành trình cảm nhận – kết hợp tinh hoa thảo mộc Việt và công nghệ hiện đại châu Âu."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={4}>
//             {spa14Services.map((s) => (
//               <Grid key={s.slug} xs={12} sm={6} md={4}>
//                 <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
//                   <Box
//                     sx={{
//                       height: 220,
//                       backgroundImage: `url(${s.image})`,
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                     }}
//                   />
//                   <Box sx={{ p: 3 }}>
//                     <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
//                       <Iconify icon={s.icon} sx={{ color: SPA14_TERRA }} width={28} />
//                       <Typography variant="h6" sx={{ color: SPA14_INK }}>
//                         {s.name}
//                       </Typography>
//                     </Stack>
//                     <Typography sx={{ color: 'text.secondary', mb: 2 }}>{s.short}</Typography>
//                     <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                       <Chip
//                         size="small"
//                         label={s.duration}
//                         sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
//                       />
//                       <Chip
//                         size="small"
//                         label={formatVND(s.price)}
//                         sx={{ bgcolor: SPA14_TERRA, color: 'white' }}
//                       />
//                     </Stack>
//                     <Button
//                       component={RouterLink}
//                       href={paths.spa14.serviceDetails(s.slug)}
//                       endIcon={<Iconify icon="solar:arrow-right-linear" />}
//                       sx={{ color: SPA14_TERRA_DARK, p: 0, '&:hover': { bgcolor: 'transparent' } }}
//                     >
//                       Xem chi tiết
//                     </Button>
//                   </Box>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }

export function Spa14SubServicesPageView() {
  const { t } = useTranslate('spa14');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let list = spa14Services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') {
      list = list.filter((s: any) => s.category === category);
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.services}
        eyebrow={t('pages.services.eyebrow')}
        title={t('pages.services.title')}
        subtitle={t('pages.services.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Bộ lọc */}
          <Spa14SubSoftCard sx={{ mb: 5 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} md={5}>
                <TextField
                  fullWidth
                  placeholder="Tìm kiếm dịch vụ..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="solar:magnifer-linear" sx={{ color: SPA14_TERRA }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={6} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Danh mục"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  {spa14ServiceCategories.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={6} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Sắp xếp"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                  <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Spa14SubSoftCard>

          {filtered.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 8 }}>
              Không tìm thấy dịch vụ phù hợp.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {paginated.map((s) => (
                <Grid key={s.slug} xs={12} sm={6} md={4}>
                  <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        height: 220,
                        backgroundImage: `url(${s.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box sx={{ p: 3 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                        <Iconify icon={s.icon} sx={{ color: SPA14_TERRA }} width={28} />
                        <Typography variant="h6" sx={{ color: SPA14_INK }}>
                          {s.name}
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: 'text.secondary', mb: 2 }}>{s.short}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          size="small"
                          label={s.duration}
                          sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
                        />
                        <Chip
                          size="small"
                          label={formatVND(s.price)}
                          sx={{ bgcolor: SPA14_TERRA, color: 'white' }}
                        />
                      </Stack>
                      <Button
                        component={RouterLink}
                        href={paths.spa14.serviceDetails(s.slug)}
                        endIcon={<Iconify icon="solar:arrow-right-linear" />}
                        sx={{
                          color: SPA14_TERRA_DARK,
                          p: 0,
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      >
                        Xem chi tiết
                      </Button>
                    </Box>
                  </Spa14SubSoftCard>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Phân trang */}
          {pageCount > 1 && (
            <Stack alignItems="center" sx={{ mt: 6 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, v) => setPage(v)}
                shape="rounded"
                sx={{
                  '& .Mui-selected': {
                    bgcolor: `${SPA14_TERRA} !important`,
                    color: 'white',
                  },
                }}
              />
            </Stack>
          )}
        </Container>
      </Box>
      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 3. SERVICE DETAILS
// ======================================================================
// export function Spa14SubServiceDetailsPageView() {
//   const { slug } = useParams<{ slug: string }>();
//   const service = spa14Services.find((s) => s.slug === slug) ?? spa14Services[0];

//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={service.image}
//         eyebrow="Dịch vụ"
//         title={service.name}
//         subtitle={service.short}
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={5}>
//             <Grid xs={12} md={8}>
//               <Spa14SubSectionTitle eyebrow="Mô tả" title="Trải nghiệm của bạn" align="left" />
//               <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
//                 Liệu trình {service.name.toLowerCase()} kéo dài {service.duration}, được thiết kế để
//                 mang lại sự thư giãn sâu cho cơ thể và tinh thần. Mỗi bước được thực hiện bởi kỹ
//                 thuật viên được đào tạo bài bản, sử dụng nguyên liệu hữu cơ chọn lọc.
//               </Typography>
//               <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
//                 Lợi ích chính
//               </Typography>
//               <Grid container spacing={2}>
//                 {service.benefits.map((b) => (
//                   <Grid key={b} xs={12} sm={6}>
//                     <Stack direction="row" spacing={1.5} alignItems="center">
//                       <Iconify icon="solar:check-circle-bold" sx={{ color: SPA14_TERRA }} />
//                       <Typography sx={{ color: SPA14_INK }}>{b}</Typography>
//                     </Stack>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//             <Grid xs={12} md={4}>
//               <Spa14SubSoftCard sx={{ position: 'sticky', top: 100 }}>
//                 <Typography variant="overline" sx={{ color: SPA14_TERRA }}>
//                   Từ
//                 </Typography>
//                 <Typography variant="h3" sx={{ color: SPA14_INK, mb: 1 }}>
//                   {formatVND(service.price)}
//                 </Typography>
//                 <Typography sx={{ color: 'text.secondary', mb: 3 }}>{service.duration}</Typography>
//                 <Button
//                   fullWidth
//                   component={RouterLink}
//                   href={paths.spa14.booking}
//                   size="large"
//                   sx={{
//                     borderRadius: 999,
//                     py: 1.5,
//                     bgcolor: SPA14_TERRA,
//                     color: 'white',
//                     '&:hover': { bgcolor: SPA14_TERRA_DARK },
//                   }}
//                 >
//                   Đặt lịch ngay
//                 </Button>
//                 <Divider sx={{ my: 3 }} />
//                 <Stack spacing={1.5}>
//                   <Stack direction="row" alignItems="center" spacing={1.5}>
//                     <Iconify icon="solar:phone-bold" sx={{ color: SPA14_TERRA }} />
//                     <Typography>{spa14ContactInfo.hotline}</Typography>
//                   </Stack>
//                   <Stack direction="row" alignItems="center" spacing={1.5}>
//                     <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA14_TERRA }} />
//                     <Typography>{spa14ContactInfo.workingHours}</Typography>
//                   </Stack>
//                 </Stack>
//               </Spa14SubSoftCard>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }

export function Spa14SubServiceDetailsPageView() {
  const { t } = useTranslate('spa14');
  const { slug } = useParams<{ slug: string }>();
  const service = spa14Services.find((s) => s.slug === slug) ?? spa14Services[0];

  const relatedFeedbacks = spa14Feedbacks.filter((f) =>
    f.service.toLowerCase().includes(service.name.split(' ')[0].toLowerCase())
  );
  const feedbacksToShow =
    relatedFeedbacks.length > 0 ? relatedFeedbacks : spa14Feedbacks.slice(0, 3);

  return (
    <Spa14SubPageShell>
      {/* Banner dịch vụ */}
      <Spa14SubPageHero
        image={service.image}
        eyebrow={t('pages.serviceDetails.eyebrow')}
        title={service.name}
        subtitle={service.short}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={8}>
              <Spa14SubSectionTitle eyebrow="Mô tả" title="Trải nghiệm của bạn" align="left" />
              <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                Liệu trình {service.name.toLowerCase()} kéo dài {service.duration}, được thiết kế để
                mang lại sự thư giãn sâu cho cơ thể và tinh thần. Mỗi bước được thực hiện bởi kỹ
                thuật viên được đào tạo bài bản, sử dụng nguyên liệu hữu cơ chọn lọc.
              </Typography>
              <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
                Lợi ích chính
              </Typography>
              <Grid container spacing={2}>
                {service.benefits.map((b) => (
                  <Grid key={b} xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Iconify icon="solar:check-circle-bold" sx={{ color: SPA14_TERRA }} />
                      <Typography sx={{ color: SPA14_INK }}>{b}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={12} md={4}>
              <Spa14SubSoftCard sx={{ position: 'sticky', top: 100 }}>
                <Typography variant="overline" sx={{ color: SPA14_TERRA }}>
                  Từ
                </Typography>
                <Typography variant="h3" sx={{ color: SPA14_INK, mb: 1 }}>
                  {formatVND(service.price)}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 3 }}>{service.duration}</Typography>
                <Button
                  fullWidth
                  component={RouterLink}
                  href={paths.spa14.booking}
                  size="large"
                  sx={{
                    borderRadius: 999,
                    py: 1.5,
                    bgcolor: SPA14_TERRA,
                    color: 'white',
                    '&:hover': { bgcolor: SPA14_TERRA_DARK },
                  }}
                >
                  Đặt lịch ngay
                </Button>
                <Divider sx={{ my: 3 }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:phone-bold" sx={{ color: SPA14_TERRA }} />
                    <Typography>{spa14ContactInfo.hotline}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA14_TERRA }} />
                    <Typography>{spa14ContactInfo.workingHours}</Typography>
                  </Stack>
                </Stack>
              </Spa14SubSoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quy trình - step timeline */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container maxWidth="md">
          <Spa14SubSectionTitle eyebrow="Quy trình" title="5 bước trải nghiệm" />
          <Stack spacing={0}>
            {spa14ServiceSteps.map((step, idx) => (
              <Stack key={step.title} direction="row" spacing={3}>
                <Stack alignItems="center" sx={{ minWidth: 56 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: SPA14_TERRA,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  {idx < spa14ServiceSteps.length - 1 && (
                    <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA14_TERRA_LIGHT, my: 0.5 }} />
                  )}
                </Stack>
                <Box sx={{ pb: 4 }}>
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 0.5 }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{step.desc}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Before/After */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Kết quả" title="Hình ảnh trước & sau" />
          <Grid container spacing={3}>
            {spa14BeforeAfters.slice(0, 2).map((ba) => (
              <Grid key={ba.title} xs={12} sm={6}>
                <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Grid container>
                    <Grid xs={6}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            height: 220,
                            backgroundImage: `url(${ba.before})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <Chip
                          label="TRƯỚC"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: 'rgba(31,42,40,0.8)',
                            color: 'white',
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid xs={6}>
                      <Box sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            height: 220,
                            backgroundImage: `url(${ba.after})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <Chip
                          label="SAU"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: SPA14_TERRA,
                            color: 'white',
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ p: 2.5 }}>
                    <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{ba.title}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {ba.note}
                    </Typography>
                  </Box>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Feedback liên quan */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Đánh giá" title="Khách hàng nói gì" />
          <Grid container spacing={3}>
            {feedbacksToShow.map((f) => (
              <Grid key={f.name} xs={12} sm={6} md={4}>
                <Spa14SubSoftCard>
                  <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography
                    sx={{ color: SPA14_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}
                  >
                    “{f.comment}”
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={f.avatar} />
                    <Stack>
                      <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {f.service}
                      </Typography>
                    </Stack>
                  </Stack>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Spa14SubSectionTitle eyebrow="FAQ" title="Câu hỏi thường gặp" />
          {spa14Faqs.slice(0, 4).map((f, idx) => (
            <Accordion
              key={f.q}
              defaultExpanded={idx === 0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: `1px solid ${SPA14_SAND_DARK}`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { borderColor: SPA14_TERRA_LIGHT },
              }}
            >
              <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 4. TRAINING
// ======================================================================
// export function Spa14SubTrainingPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.training}
//         eyebrow="Đào tạo"
//         title="Học viện Imperial Vienna Academy"
//         subtitle="Khóa học chuyên sâu cho kỹ thuật viên, chuyên gia chăm sóc da và quản lý spa."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Spa14SubSectionTitle eyebrow="Chương trình" title="Lộ trình từ căn bản đến nâng cao" />
//           <Grid container spacing={3}>
//             {spa14TrainingPrograms.map((p) => (
//               <Grid key={p.name} xs={12} md={4}>
//                 <Spa14SubSoftCard>
//                   <Chip
//                     label={p.level}
//                     size="small"
//                     sx={{ bgcolor: SPA14_SAND_DARK, color: SPA14_TERRA_DARK, mb: 2 }}
//                   />
//                   <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1 }}>
//                     {p.name}
//                   </Typography>
//                   <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                     <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA14_TERRA }} />
//                     <Typography sx={{ color: 'text.secondary' }}>{p.duration}</Typography>
//                   </Stack>
//                   <Typography sx={{ color: 'text.secondary', mb: 2 }}>{p.outcome}</Typography>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="h5" sx={{ color: SPA14_TERRA, mb: 2 }}>
//                     {formatVND(p.price)}
//                   </Typography>
//                   <Button
//                     fullWidth
//                     component={RouterLink}
//                     href={paths.spa14.contact}
//                     sx={{
//                       borderRadius: 999,
//                       bgcolor: SPA14_TERRA,
//                       color: 'white',
//                       '&:hover': { bgcolor: SPA14_TERRA_DARK },
//                     }}
//                   >
//                     Đăng ký tư vấn
//                   </Button>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }
export function Spa14SubTrainingPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      {/* Banner khóa học + Tiêu đề nổi bật + CTA */}
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.training}
        eyebrow={t('pages.training.eyebrow')}
        title={t('pages.training.title')}
        subtitle={t('pages.training.subtitle')}
      />
      <Box sx={{ pb: { xs: 4, md: 6 } }}>
        <Container sx={{ textAlign: 'center' }}>
          <Button
            component={RouterLink}
            href={paths.spa14.contact}
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 999,
              bgcolor: SPA14_TERRA,
              color: 'white',
              '&:hover': { bgcolor: SPA14_TERRA_DARK },
            }}
          >
            Đăng ký tư vấn
          </Button>
        </Container>
      </Box>

      {/* Giới thiệu học viện: sứ mệnh + video */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Grid container spacing={5} alignItems="center">
            <Grid xs={12} md={6}>
              <Spa14SubSectionTitle
                eyebrow="Sứ mệnh"
                title="Vì sao chọn Imperial Vienna Academy"
                align="left"
              />
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                {spa14TrainingMission}
              </Typography>
            </Grid>
            <Grid xs={12} md={6}>
              <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      height: 280,
                      backgroundImage: `url(${SPA14_PAGE_IMAGES.training})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(31,42,40,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="solar:play-bold" width={32} sx={{ color: SPA14_TERRA }} />
                    </Box>
                  </Box>
                </Box>
              </Spa14SubSoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Danh sách khóa học (giữ nguyên) */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Chương trình" title="Lộ trình từ căn bản đến nâng cao" />
          <Grid container spacing={3}>
            {spa14TrainingPrograms.map((p) => (
              <Grid key={p.name} xs={12} md={4}>
                <Spa14SubSoftCard>
                  <Chip
                    label={p.level}
                    size="small"
                    sx={{ bgcolor: SPA14_SAND_DARK, color: SPA14_TERRA_DARK, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1 }}>
                    {p.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA14_TERRA }} />
                    <Typography sx={{ color: 'text.secondary' }}>{p.duration}</Typography>
                  </Stack>
                  <Typography sx={{ color: 'text.secondary', mb: 2 }}>{p.outcome}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h5" sx={{ color: SPA14_TERRA, mb: 2 }}>
                    {formatVND(p.price)}
                  </Typography>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={paths.spa14.contact}
                    sx={{
                      borderRadius: 999,
                      bgcolor: SPA14_TERRA,
                      color: 'white',
                      '&:hover': { bgcolor: SPA14_TERRA_DARK },
                    }}
                  >
                    Đăng ký tư vấn
                  </Button>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Lộ trình học */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container maxWidth="md">
          <Spa14SubSectionTitle eyebrow="Lộ trình" title="Hành trình học tập 10 tuần" />
          <Stack spacing={0}>
            {spa14TrainingRoadmap.map((r, idx) => (
              <Stack key={r.stage} direction="row" spacing={3}>
                <Stack alignItems="center" sx={{ minWidth: 56 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: SPA14_TERRA,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  {idx < spa14TrainingRoadmap.length - 1 && (
                    <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA14_TERRA_LIGHT, my: 0.5 }} />
                  )}
                </Stack>
                <Box sx={{ pb: 4 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="h6" sx={{ color: SPA14_INK }}>
                      {r.stage}
                    </Typography>
                    <Chip
                      size="small"
                      label={r.duration}
                      sx={{ bgcolor: 'common.white', color: SPA14_TERRA_DARK }}
                    />
                  </Stack>
                  <Typography sx={{ color: 'text.secondary' }}>{r.desc}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Giảng viên */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Đội ngũ" title="Giảng viên" />
          <Grid container spacing={3}>
            {spa14Instructors.map((i) => (
              <Grid key={i.name} xs={12} sm={6} md={4}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={i.image}
                    sx={{
                      width: 96,
                      height: 96,
                      mx: 'auto',
                      mb: 2,
                      border: `3px solid ${SPA14_TERRA_LIGHT}`,
                    }}
                  />
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 0.5 }}>
                    {i.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 1.5 }}>
                    {i.experience}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                    {i.certs.map((c) => (
                      <Chip
                        key={c}
                        size="small"
                        label={c}
                        sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
                      />
                    ))}
                  </Stack>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Thành tựu học viên */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Thành tựu" title="Học viên nói gì" />
          <Grid container spacing={3}>
            {spa14GraduateShowcase.map((g) => (
              <Grid key={g.name} xs={12} sm={6}>
                <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 220,
                      backgroundImage: `url(${g.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ color: SPA14_TERRA_DARK, fontWeight: 700, mb: 1 }}>
                      {g.name}
                    </Typography>
                    <Typography sx={{ color: SPA14_INK, fontStyle: 'italic', mb: 1.5 }}>
                      “{g.review}”
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      — {g.student}
                    </Typography>
                  </Box>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 5. BLOG LIST
// ======================================================================
// export function Spa14SubBlogPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.blog}
//         eyebrow="Blog"
//         title="Cẩm nang chăm sóc bản thân"
//         subtitle="Chia sẻ kiến thức về dưỡng da, dinh dưỡng, yoga và lối sống lành mạnh."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={4}>
//             {spa14BlogPosts.map((p) => (
//               <Grid key={p.slug} xs={12} sm={6} md={3}>
//                 <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
//                   <Box
//                     sx={{
//                       height: 180,
//                       backgroundImage: `url(${p.cover})`,
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                     }}
//                   />
//                   <Box sx={{ p: 2.5 }}>
//                     <Chip
//                       size="small"
//                       label={p.category}
//                       sx={{ mb: 1.5, bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
//                     />
//                     <Typography
//                       variant="h6"
//                       sx={{ color: SPA14_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
//                     >
//                       <Link
//                         component={RouterLink}
//                         href={paths.spa14.blogDetails(p.slug)}
//                         sx={{
//                           color: 'inherit',
//                           textDecoration: 'none',
//                           '&:hover': { color: SPA14_TERRA },
//                         }}
//                       >
//                         {p.title}
//                       </Link>
//                     </Typography>
//                     <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 1.5 }}>
//                       {p.excerpt}
//                     </Typography>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
//                         {p.date}
//                       </Typography>
//                       <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>·</Typography>
//                       <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
//                         {p.readTime}
//                       </Typography>
//                     </Stack>
//                   </Box>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa14SubPageShell>
//   );
// }

// them moi
export function Spa14SubBlogPageView() {
  const { t } = useTranslate('spa14');
  const [highlight, ...rest] = spa14BlogPosts;
  const trending = [...spa14BlogPosts].slice(0, 3);

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.blog}
        eyebrow={t('pages.blog.eyebrow')}
        title={t('pages.blog.title')}
        subtitle={t('pages.blog.subtitle')}
      />

      {/* Highlight article */}
      {highlight && (
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container>
            <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
              <Grid container>
                <Grid xs={12} md={6}>
                  <Box
                    sx={{
                      minHeight: 280,
                      height: '100%',
                      backgroundImage: `url(${highlight.cover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <Box sx={{ p: { xs: 3, md: 5 } }}>
                    <Chip
                      label="Bài viết nổi bật"
                      sx={{ bgcolor: SPA14_TERRA, color: 'white', mb: 2 }}
                    />
                    <Typography variant="h4" sx={{ color: SPA14_INK, mb: 1.5 }}>
                      {highlight.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                      {highlight.excerpt}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: SPA14_TERRA, fontSize: 13 }}>
                        {highlight.author[0]}
                      </Avatar>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {highlight.author} · {highlight.date} · {highlight.readTime}
                      </Typography>
                    </Stack>
                    <Button
                      component={RouterLink}
                      href={paths.spa14.blogDetails(highlight.slug)}
                      endIcon={<Iconify icon="solar:arrow-right-linear" />}
                      sx={{
                        borderRadius: 999,
                        px: 3,
                        bgcolor: SPA14_TERRA,
                        color: 'white',
                        '&:hover': { bgcolor: SPA14_TERRA_DARK },
                      }}
                    >
                      Đọc bài viết
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Spa14SubSoftCard>
          </Container>
        </Box>
      )}

      <Box sx={{ pb: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={8}>
              <Grid container spacing={4}>
                {rest.map((p) => (
                  <Grid key={p.slug} xs={12} sm={6}>
                    <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                      <Box
                        sx={{
                          height: 180,
                          backgroundImage: `url(${p.cover})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <Box sx={{ p: 2.5 }}>
                        <Chip
                          size="small"
                          label={p.category}
                          sx={{ mb: 1.5, bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: SPA14_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
                        >
                          <Link
                            component={RouterLink}
                            href={paths.spa14.blogDetails(p.slug)}
                            sx={{
                              color: 'inherit',
                              textDecoration: 'none',
                              '&:hover': { color: SPA14_TERRA },
                            }}
                          >
                            {p.title}
                          </Link>
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 1.5 }}>
                          {p.excerpt}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                            {p.date}
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>·</Typography>
                          <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                            {p.readTime}
                          </Typography>
                        </Stack>
                      </Box>
                    </Spa14SubSoftCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Sidebar */}
            <Grid xs={12} md={4}>
              <Stack spacing={3}>
                <Spa14SubSoftCard>
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
                    Danh mục
                  </Typography>
                  <Stack spacing={1.5}>
                    {spa14BlogCategories.map((c) => (
                      <Stack
                        key={c.name}
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          py: 1,
                          borderBottom: `1px solid ${SPA14_SAND_DARK}`,
                          cursor: 'pointer',
                          '&:hover': { color: SPA14_TERRA },
                        }}
                      >
                        <Typography sx={{ color: SPA14_INK }}>{c.name}</Typography>
                        <Chip
                          size="small"
                          label={c.count}
                          sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Spa14SubSoftCard>

                <Spa14SubSoftCard>
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
                    Bài viết xu hướng
                  </Typography>
                  <Stack spacing={2}>
                    {trending.map((p, idx) => (
                      <Stack key={p.slug} direction="row" spacing={1.5} alignItems="center">
                        <Typography
                          variant="h5"
                          sx={{ color: SPA14_TERRA_LIGHT, fontWeight: 700, minWidth: 28 }}
                        >
                          {idx + 1}
                        </Typography>
                        <Link
                          component={RouterLink}
                          href={paths.spa14.blogDetails(p.slug)}
                          sx={{
                            color: SPA14_INK,
                            textDecoration: 'none',
                            fontSize: 14,
                            fontWeight: 600,
                            '&:hover': { color: SPA14_TERRA },
                          }}
                        >
                          {p.title}
                        </Link>
                      </Stack>
                    ))}
                  </Stack>
                </Spa14SubSoftCard>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 6. BLOG DETAILS
// ======================================================================
// export function Spa14SubBlogDetailsPageView() {
//   const { slug } = useParams<{ slug: string }>();
//   const post = spa14BlogPosts.find((p) => p.slug === slug) ?? spa14BlogPosts[0];

//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={post.cover}
//         eyebrow={post.category}
//         title={post.title}
//         subtitle={post.excerpt}
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
//             <Avatar sx={{ bgcolor: SPA14_TERRA }}>{post.author[0]}</Avatar>
//             <Stack>
//               <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{post.author}</Typography>
//               <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
//                 {post.date} · {post.readTime}
//               </Typography>
//             </Stack>
//           </Stack>
//           <Typography sx={{ color: SPA14_INK, lineHeight: 1.9, mb: 3 }}>
//             Chăm sóc bản thân là một hành trình dài hơi, không phải đích đến. Mỗi ngày dành ra 15–30
//             phút cho cơ thể và tâm trí có thể tạo ra sự khác biệt lớn theo thời gian.
//           </Typography>
//           <Typography variant="h5" sx={{ color: SPA14_TERRA_DARK, mb: 2 }}>
//             1. Bắt đầu từ những điều nhỏ nhất
//           </Typography>
//           <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
//             Một ly nước ấm vào buổi sáng, vài phút hít thở sâu, hoặc một bài kéo giãn nhẹ — đây là
//             những bước khởi đầu đơn giản nhưng mang lại hiệu quả bền vững.
//           </Typography>
//           <Typography variant="h5" sx={{ color: SPA14_TERRA_DARK, mb: 2 }}>
//             2. Lắng nghe cơ thể
//           </Typography>
//           <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
//             Cơ thể là người bạn trung thực nhất. Khi mệt mỏi, hãy nghỉ ngơi. Khi căng thẳng, hãy cho
//             phép bản thân được chăm sóc.
//           </Typography>
//           <Box sx={{ p: 3, borderLeft: `4px solid ${SPA14_TERRA}`, bgcolor: SPA14_SAND, my: 4 }}>
//             <Typography sx={{ color: SPA14_INK, fontStyle: 'italic' }}>
//               “Vẻ đẹp thực sự đến từ sự cân bằng giữa cơ thể, tâm trí và thiên nhiên.”
//             </Typography>
//           </Box>
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }

// them moi
export function Spa14SubBlogDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const post = spa14BlogPosts.find((p) => p.slug === slug) ?? spa14BlogPosts[0];
  const related = spa14BlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedService =
    spa14Services.find((s) => post.category.toLowerCase().includes(s.category)) ?? spa14Services[0];

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={post.cover}
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Avatar sx={{ bgcolor: SPA14_TERRA }}>{post.author[0]}</Avatar>
            <Stack>
              <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{post.author}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
                {post.date} · {post.readTime}
              </Typography>
            </Stack>
          </Stack>

          {/* Ảnh minh hoạ trong nội dung */}
          <Box
            sx={{
              height: { xs: 220, md: 360 },
              borderRadius: 4,
              mb: 4,
              backgroundImage: `url(${post.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <Typography sx={{ color: SPA14_INK, lineHeight: 1.9, mb: 3 }}>
            Chăm sóc bản thân là một hành trình dài hơi, không phải đích đến. Mỗi ngày dành ra 15–30
            phút cho cơ thể và tâm trí có thể tạo ra sự khác biệt lớn theo thời gian.
          </Typography>
          <Typography variant="h5" sx={{ color: SPA14_TERRA_DARK, mb: 2 }}>
            1. Bắt đầu từ những điều nhỏ nhất
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
            Một ly nước ấm vào buổi sáng, vài phút hít thở sâu, hoặc một bài kéo giãn nhẹ — đây là
            những bước khởi đầu đơn giản nhưng mang lại hiệu quả bền vững.
          </Typography>
          <Typography variant="h5" sx={{ color: SPA14_TERRA_DARK, mb: 2 }}>
            2. Lắng nghe cơ thể
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
            Cơ thể là người bạn trung thực nhất. Khi mệt mỏi, hãy nghỉ ngơi. Khi căng thẳng, hãy cho
            phép bản thân được chăm sóc.
          </Typography>
          <Box sx={{ p: 3, borderLeft: `4px solid ${SPA14_TERRA}`, bgcolor: SPA14_SAND, my: 4 }}>
            <Typography sx={{ color: SPA14_INK, fontStyle: 'italic' }}>
              “Vẻ đẹp thực sự đến từ sự cân bằng giữa cơ thể, tâm trí và thiên nhiên.”
            </Typography>
          </Box>

          {/* CTA dịch vụ liên quan */}
          <Spa14SubSoftCard
            sx={{
              mt: 5,
              background: `linear-gradient(135deg, ${SPA14_TERRA} 0%, ${SPA14_TERRA_DARK} 100%)`,
              color: 'white',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent="space-between"
            >
              <Stack spacing={0.5}>
                <Typography variant="overline" sx={{ opacity: 0.8 }}>
                  Gợi ý cho bạn
                </Typography>
                <Typography variant="h6">{relatedService.name}</Typography>
                <Typography sx={{ opacity: 0.85, fontSize: 14 }}>{relatedService.short}</Typography>
              </Stack>
              <Button
                component={RouterLink}
                href={paths.spa14.serviceDetails(relatedService.slug)}
                sx={{
                  borderRadius: 999,
                  px: 3,
                  bgcolor: 'common.white',
                  color: SPA14_TERRA_DARK,
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: SPA14_SAND },
                }}
              >
                Xem dịch vụ
              </Button>
            </Stack>
          </Spa14SubSoftCard>
        </Container>
      </Box>

      {/* Related posts */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Đọc thêm" title="Bài viết liên quan" />
          <Grid container spacing={4}>
            {related.map((p) => (
              <Grid key={p.slug} xs={12} sm={6} md={4}>
                <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: `url(${p.cover})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 2.5 }}>
                    <Chip
                      size="small"
                      label={p.category}
                      sx={{ mb: 1.5, bgcolor: 'common.white', color: SPA14_TERRA_DARK }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: SPA14_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
                    >
                      <Link
                        component={RouterLink}
                        href={paths.spa14.blogDetails(p.slug)}
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                          '&:hover': { color: SPA14_TERRA },
                        }}
                      >
                        {p.title}
                      </Link>
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                      {p.date} · {p.readTime}
                    </Typography>
                  </Box>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 7. CAREERS
// ======================================================================
// export function Spa14SubCareersPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.careers}
//         eyebrow="Tuyển dụng"
//         title="Cùng chúng tôi vun đắp hành trình xanh"
//         subtitle="Imperial Vienna luôn tìm kiếm những người yêu thiên nhiên và đam mê chăm sóc con người."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Spa14SubSectionTitle eyebrow="Vị trí đang tuyển" title="Cơ hội nghề nghiệp" />
//           <Stack spacing={2}>
//             {spa14Careers.map((c) => (
//               <Spa14SubSoftCard key={c.title}>
//                 <Stack
//                   direction={{ xs: 'column', md: 'row' }}
//                   spacing={2}
//                   alignItems={{ xs: 'flex-start', md: 'center' }}
//                   justifyContent="space-between"
//                 >
//                   <Stack spacing={1}>
//                     <Typography variant="h6" sx={{ color: SPA14_INK }}>
//                       {c.title}
//                     </Typography>
//                     <Stack direction="row" spacing={2} flexWrap="wrap">
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Iconify icon="solar:map-point-bold" sx={{ color: SPA14_TERRA }} width={16} />
//                         <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
//                           {c.location}
//                         </Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Iconify icon="solar:case-bold" sx={{ color: SPA14_TERRA }} width={16} />
//                         <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
//                           {c.type}
//                         </Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Iconify
//                           icon="solar:wallet-money-bold"
//                           sx={{ color: SPA14_TERRA }}
//                           width={16}
//                         />
//                         <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
//                           {c.salary}
//                         </Typography>
//                       </Stack>
//                     </Stack>
//                     <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
//                       {c.benefits.map((b) => (
//                         <Chip
//                           key={b}
//                           size="small"
//                           label={b}
//                           sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
//                         />
//                       ))}
//                     </Stack>
//                   </Stack>
//                   <Button
//                     component={RouterLink}
//                     href={paths.spa14.contact}
//                     sx={{
//                       borderRadius: 999,
//                       px: 3,
//                       bgcolor: SPA14_TERRA,
//                       color: 'white',
//                       '&:hover': { bgcolor: SPA14_TERRA_DARK },
//                     }}
//                   >
//                     Ứng tuyển
//                   </Button>
//                 </Stack>
//               </Spa14SubSoftCard>
//             ))}
//           </Stack>
//         </Container>
//       </Box>
//     </Spa14SubPageShell>
//   );
// }
export function Spa14SubCareersPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.careers}
        eyebrow={t('pages.careers.eyebrow')}
        title={spa14CareersSlogan}
        subtitle={t('pages.careers.subtitle')}
      />

      {/* Lý do gia nhập */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa14SubSectionTitle
            eyebrow="Vì sao chọn chúng tôi"
            title="Lý do gia nhập Imperial Vienna"
          />
          <Grid container spacing={3}>
            {spa14JoinReasons.map((r) => (
              <Grid key={r.text} xs={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={r.icon} width={40} sx={{ color: SPA14_TERRA, mb: 1.5 }} />
                  <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{r.text}</Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Danh sách vị trí */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Vị trí đang tuyển" title="Cơ hội nghề nghiệp" />
          <Stack spacing={2}>
            {spa14Careers.map((c, idx) => (
              <Spa14SubSoftCard key={c.title}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  justifyContent="space-between"
                >
                  <Stack spacing={1}>
                    <Typography variant="h6" sx={{ color: SPA14_INK }}>
                      {c.title}
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify
                          icon="solar:map-point-bold"
                          sx={{ color: SPA14_TERRA }}
                          width={16}
                        />
                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                          {c.location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify icon="solar:case-bold" sx={{ color: SPA14_TERRA }} width={16} />
                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                          {c.type}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify
                          icon="solar:wallet-money-bold"
                          sx={{ color: SPA14_TERRA }}
                          width={16}
                        />
                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                          {c.salary}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                      {c.benefits.map((b) => (
                        <Chip
                          key={b}
                          size="small"
                          label={b}
                          sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                  <Button
                    component={RouterLink}
                    href={paths.spa14.careerDetails(idx)}
                    sx={{
                      borderRadius: 999,
                      px: 3,
                      bgcolor: SPA14_TERRA,
                      color: 'white',
                      '&:hover': { bgcolor: SPA14_TERRA_DARK },
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </Stack>
              </Spa14SubSoftCard>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Văn hóa doanh nghiệp preview */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Văn hóa" title="Môi trường làm việc" />
          <Grid container spacing={2}>
            {spa14WorkplaceGallery.map((src) => (
              <Grid key={src} xs={6} md={3}>
                <Box
                  sx={{
                    aspectRatio: '4/3',
                    borderRadius: 3,
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// CAREER DETAILS (mới)
// ======================================================================
export function Spa14SubCareerDetailsPageView() {
  const { t } = useTranslate('spa14');
  const { index } = useParams<{ index: string }>();
  const job = spa14Careers[Number(index) || 0] ?? spa14Careers[0];
  const [appSubmitted, setAppSubmitted] = useState(false);

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.careers}
        eyebrow={t('pages.careerDetails.eyebrow')}
        title={job.title}
        subtitle={`${job.location} · ${job.type} · ${job.salary}`}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={7}>
              <Spa14SubSectionTitle
                eyebrow="Mô tả công việc"
                title="Yêu cầu & quyền lợi"
                align="left"
              />
              <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                Chúng tôi tìm kiếm ứng viên yêu nghề, có tinh thần cầu tiến và mong muốn phát triển
                sự nghiệp lâu dài trong ngành chăm sóc sắc đẹp tại {job.location}.
              </Typography>
              <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1.5 }}>
                Quyền lợi
              </Typography>
              <Stack spacing={1} sx={{ mb: 4 }}>
                {job.benefits.map((b) => (
                  <Stack key={b} direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:check-circle-bold" sx={{ color: SPA14_TERRA }} />
                    <Typography sx={{ color: SPA14_INK }}>{b}</Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Quy trình tuyển dụng */}
              <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
                Quy trình tuyển dụng
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {spa14RecruitmentProcess.map((p, idx) => (
                  <Stack key={p.step} direction="row" alignItems="center" spacing={1} flex={1}>
                    <Stack alignItems="center" spacing={1} sx={{ flex: 1, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: SPA14_TERRA,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA14_INK }}>
                        {p.step}
                      </Typography>
                    </Stack>
                    {idx < spa14RecruitmentProcess.length - 1 && (
                      <Iconify
                        icon="solar:arrow-right-linear"
                        sx={{ color: SPA14_TERRA_LIGHT, display: { xs: 'none', sm: 'block' } }}
                      />
                    )}
                  </Stack>
                ))}
              </Stack>
            </Grid>

            {/* Form ứng tuyển */}
            <Grid xs={12} md={5}>
              <Spa14SubSoftCard sx={{ position: 'sticky', top: 100 }}>
                {appSubmitted ? (
                  <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
                    <Iconify
                      icon="solar:check-circle-bold"
                      width={48}
                      sx={{ color: SPA14_TERRA }}
                    />
                    <Typography variant="h6" sx={{ color: SPA14_INK }}>
                      Đã gửi hồ sơ ứng tuyển!
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
                      Bộ phận nhân sự sẽ liên hệ bạn trong 3 ngày làm việc.
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
                      Ứng tuyển vị trí này
                    </Typography>
                    <Stack spacing={2}>
                      <TextField fullWidth label="Họ và tên" />
                      <TextField fullWidth label="Số điện thoại" />
                      <TextField fullWidth label="Email" />
                      <TextField fullWidth multiline rows={3} label="Giới thiệu bản thân" />
                      <Button
                        fullWidth
                        component="label"
                        sx={{
                          borderRadius: 2,
                          border: `1.5px dashed ${SPA14_TERRA}`,
                          color: SPA14_TERRA_DARK,
                          py: 1.5,
                        }}
                      >
                        Tải lên CV
                        <input type="file" hidden />
                      </Button>
                      <Button
                        fullWidth
                        size="large"
                        onClick={() => setAppSubmitted(true)}
                        sx={{
                          borderRadius: 999,
                          py: 1.5,
                          bgcolor: SPA14_TERRA,
                          color: 'white',
                          '&:hover': { bgcolor: SPA14_TERRA_DARK },
                        }}
                      >
                        Gửi hồ sơ ứng tuyển
                      </Button>
                    </Stack>
                  </>
                )}
              </Spa14SubSoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Văn hóa doanh nghiệp: Gallery + Video nội bộ */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle
            eyebrow="Văn hóa doanh nghiệp"
            title="Cuộc sống tại Imperial Vienna"
          />
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {spa14WorkplaceGallery.map((src) => (
              <Grid key={src} xs={6} md={3}>
                <Box
                  sx={{
                    aspectRatio: '4/3',
                    borderRadius: 3,
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden', maxWidth: 700, mx: 'auto' }}>
            <Box sx={{ position: 'relative', cursor: 'pointer' }}>
              <Box
                sx={{
                  height: 320,
                  backgroundImage: `url(${spa14InternalVideoThumb})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(31,42,40,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon="solar:play-bold" width={32} sx={{ color: SPA14_TERRA }} />
                </Box>
              </Box>
            </Box>
            <Typography sx={{ p: 2, color: SPA14_INK, fontWeight: 600, textAlign: 'center' }}>
              Video giới thiệu môi trường làm việc Imperial Vienna
            </Typography>
          </Spa14SubSoftCard>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 8. BOOKING
// ======================================================================
// export function Spa14SubBookingPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.booking}
//         eyebrow="Đặt lịch"
//         title="Đặt lịch online trong 1 phút"
//         subtitle="Chọn dịch vụ, chi nhánh và thời gian phù hợp – chúng tôi sẽ xác nhận trong vòng 15 phút."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           <Spa14SubSoftCard>
//             <Grid container spacing={2.5}>
//               <Grid xs={12} sm={6}>
//                 <TextField fullWidth label="Họ và tên" />
//               </Grid>
//               <Grid xs={12} sm={6}>
//                 <TextField fullWidth label="Số điện thoại" />
//               </Grid>
//               <Grid xs={12} sm={6}>
//                 <TextField fullWidth label="Email" />
//               </Grid>
//               <Grid xs={12} sm={6}>
//                 <TextField fullWidth select label="Chi nhánh">
//                   {spa14Branches.map((b) => (
//                     <MenuItem key={b.name} value={b.name}>
//                       {b.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid xs={12} sm={6}>
//                 <TextField fullWidth select label="Dịch vụ">
//                   {spa14Services.map((s) => (
//                     <MenuItem key={s.slug} value={s.slug}>
//                       {s.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid xs={12} sm={3}>
//                 <TextField fullWidth type="date" label="Ngày" InputLabelProps={{ shrink: true }} />
//               </Grid>
//               <Grid xs={12} sm={3}>
//                 <TextField fullWidth type="time" label="Giờ" InputLabelProps={{ shrink: true }} />
//               </Grid>
//               <Grid xs={12}>
//                 <TextField fullWidth multiline rows={3} label="Ghi chú" />
//               </Grid>
//               <Grid xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox sx={{ color: SPA14_TERRA, '&.Mui-checked': { color: SPA14_TERRA } }} />
//                   }
//                   label="Tôi đồng ý với chính sách bảo mật của Imperial Vienna"
//                 />
//               </Grid>
//               <Grid xs={12}>
//                 <Button
//                   fullWidth
//                   size="large"
//                   sx={{
//                     borderRadius: 999,
//                     py: 1.5,
//                     bgcolor: SPA14_TERRA,
//                     color: 'white',
//                     '&:hover': { bgcolor: SPA14_TERRA_DARK },
//                   }}
//                 >
//                   Xác nhận đặt lịch
//                 </Button>
//               </Grid>
//             </Grid>
//           </Spa14SubSoftCard>
//         </Container>
//       </Box>
//     </Spa14SubPageShell>
//   );
// }
function Spa14SubBookingConfirm({
  pkg,
  onBack,
}: {
  pkg: (typeof spa14BookingPackages)[number];
  onBack: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Spa14SubSoftCard sx={{ maxWidth: 560, mx: 'auto', textAlign: 'center' }}>
        <Iconify icon="solar:check-circle-bold" width={56} sx={{ color: SPA14_TERRA, mb: 2 }} />
        <Typography variant="h5" sx={{ color: SPA14_INK, mb: 1 }}>
          Đặt lịch thành công!
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Chúng tôi sẽ liên hệ xác nhận trong vòng 15 phút.
        </Typography>
        <Button onClick={onBack} sx={{ color: SPA14_TERRA_DARK }}>
          Quay lại chọn gói khác
        </Button>
      </Spa14SubSoftCard>
    );
  }

  return (
    <Spa14SubSoftCard sx={{ maxWidth: 560, mx: 'auto' }}>
      <Stack alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: SPA14_SAND,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Iconify icon="solar:calendar-bold" width={32} sx={{ color: SPA14_TERRA }} />
        </Box>
        <Typography variant="h5" sx={{ color: SPA14_INK }}>
          Xác nhận thông tin đặt lịch
        </Typography>
      </Stack>

      <Stack spacing={1.5} sx={{ mb: 3, p: 2.5, borderRadius: 2, bgcolor: SPA14_SAND }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>Gói dịch vụ</Typography>
          <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{pkg.name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>Số buổi</Typography>
          <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{pkg.sessions}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>Tổng tiền</Typography>
          <Typography sx={{ color: SPA14_TERRA, fontWeight: 700 }}>
            {formatVND(pkg.price)}
          </Typography>
        </Stack>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label="Họ và tên" />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label="Số điện thoại" />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField fullWidth type="date" label="Ngày" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField fullWidth type="time" label="Giờ" InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth multiline rows={2} label="Ghi chú" />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2}>
        <Button onClick={onBack} sx={{ color: 'text.secondary' }}>
          Quay lại
        </Button>
        <Button
          fullWidth
          size="large"
          onClick={() => setSubmitted(true)}
          sx={{
            borderRadius: 999,
            py: 1.5,
            bgcolor: SPA14_TERRA,
            color: 'white',
            '&:hover': { bgcolor: SPA14_TERRA_DARK },
          }}
        >
          Xác nhận đặt lịch
        </Button>
      </Stack>
    </Spa14SubSoftCard>
  );
}

export function Spa14SubBookingPageView() {
  const { t } = useTranslate('spa14');
  const [tab, setTab] = useState(spa14Services[0].category ?? 'massage');
  const [selectedPkg, setSelectedPkg] = useState<(typeof spa14BookingPackages)[number] | null>(
    null
  );

  const categories = useMemo(
    () => Array.from(new Set(spa14Services.map((s: any) => s.category))),
    []
  );
  const filteredServices = spa14Services.filter((s: any) => s.category === tab);

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.booking}
        eyebrow={t('pages.bookingPage.eyebrow')}
        title={t('pages.bookingPage.title')}
        subtitle={t('pages.bookingPage.subtitle')}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {selectedPkg ? (
            <Spa14SubBookingConfirm pkg={selectedPkg} onBack={() => setSelectedPkg(null)} />
          ) : (
            <>
              {/* Tabs theo dịch vụ */}
              <Spa14SubSectionTitle eyebrow="Dịch vụ" title="Chọn nhóm dịch vụ bạn quan tâm" />
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  mb: 5,
                  '& .MuiTabs-indicator': { bgcolor: SPA14_TERRA },
                  '& .Mui-selected': { color: `${SPA14_TERRA_DARK} !important` },
                }}
              >
                {categories.map((c) => (
                  <Tab key={c} value={c} label={c} sx={{ textTransform: 'capitalize' }} />
                ))}
              </Tabs>

              <Grid container spacing={3} sx={{ mb: 8 }}>
                {filteredServices.map((s) => (
                  <Grid key={s.slug} xs={12} sm={6} md={4}>
                    <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                      <Iconify icon={s.icon} width={36} sx={{ color: SPA14_TERRA, mb: 1.5 }} />
                      <Typography sx={{ color: SPA14_INK, fontWeight: 600, mb: 0.5 }}>
                        {s.name}
                      </Typography>
                      <Typography sx={{ color: SPA14_TERRA_DARK, fontWeight: 700, mb: 1 }}>
                        {formatVND(s.price)}
                      </Typography>
                      <Button
                        component={RouterLink}
                        href={paths.spa14.serviceDetails(s.slug)}
                        size="small"
                        sx={{ color: SPA14_TERRA_DARK }}
                      >
                        Xem chi tiết
                      </Button>
                    </Spa14SubSoftCard>
                  </Grid>
                ))}
              </Grid>

              {/* Card giá + Highlight gói hot */}
              <Spa14SubSectionTitle eyebrow="Gói liệu trình" title="Chọn gói phù hợp với bạn" />
              <Grid container spacing={3} alignItems="stretch">
                {spa14BookingPackages.map((p) => (
                  <Grid key={p.slug} xs={12} sm={6} md={3}>
                    <Spa14SubSoftCard
                      sx={{
                        position: 'relative',
                        textAlign: 'center',
                        border: p.hot ? `2px solid ${SPA14_TERRA}` : undefined,
                        transform: p.hot ? { md: 'scale(1.05)' } : undefined,
                      }}
                    >
                      {p.hot && (
                        <Chip
                          label="PHỔ BIẾN NHẤT"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -14,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: SPA14_TERRA,
                            color: 'white',
                            fontWeight: 700,
                          }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        sx={{ color: SPA14_INK, mt: p.hot ? 1.5 : 0, mb: 1 }}
                      >
                        {p.name}
                      </Typography>
                      <Typography variant="h4" sx={{ color: SPA14_TERRA, mb: 0.5 }}>
                        {formatVND(p.price)}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                        {p.sessions} buổi
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Stack spacing={1} sx={{ mb: 3, textAlign: 'left' }}>
                        {p.perks.map((perk) => (
                          <Stack key={perk} direction="row" spacing={1} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              width={16}
                              sx={{ color: SPA14_TERRA }}
                            />
                            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                              {perk}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        fullWidth
                        onClick={() => setSelectedPkg(p)}
                        sx={{
                          borderRadius: 999,
                          bgcolor: p.hot ? SPA14_TERRA : 'transparent',
                          color: p.hot ? 'white' : SPA14_TERRA_DARK,
                          border: p.hot ? 'none' : `1.5px solid ${SPA14_TERRA}`,
                          '&:hover': { bgcolor: SPA14_TERRA_DARK, color: 'white' },
                        }}
                      >
                        Chọn gói
                      </Button>
                    </Spa14SubSoftCard>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
      {!selectedPkg && <Spa14SubCta />}
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 9. CONTACT
// ======================================================================
export function Spa14SubContactPageView() {
  const { t } = useTranslate('spa14');
  const items = [
    { icon: 'solar:phone-bold', label: 'Hotline', value: spa14ContactInfo.hotline },
    { icon: 'solar:letter-bold', label: 'Email', value: spa14ContactInfo.email },
    { icon: 'solar:chat-round-dots-bold', label: 'Zalo', value: spa14ContactInfo.zalo },
    { icon: 'solar:map-point-bold', label: 'Trụ sở', value: spa14ContactInfo.address },
  ];
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.contact}
        eyebrow={t('pages.contact.eyebrow')}
        title={t('pages.contact.title')}
        subtitle={t('pages.contact.subtitle')}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={5}>
              <Stack spacing={2}>
                {items.map((i) => (
                  <Spa14SubSoftCard key={i.label}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: SPA14_SAND,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon={i.icon} sx={{ color: SPA14_TERRA }} width={24} />
                      </Box>
                      <Stack>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {i.label}
                        </Typography>
                        <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>
                          {i.value}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Spa14SubSoftCard>
                ))}
              </Stack>
            </Grid>
            <Grid xs={12} md={7}>
              <Spa14SubSoftCard>
                <Spa14SubSectionTitle eyebrow="Gửi lời nhắn" title="Form liên hệ" align="left" />
                <Grid container spacing={2}>
                  <Grid xs={12} sm={6}>
                    <TextField fullWidth label="Họ và tên" />
                  </Grid>
                  <Grid xs={12} sm={6}>
                    <TextField fullWidth label="Số điện thoại" />
                  </Grid>
                  <Grid xs={12}>
                    <TextField fullWidth label="Email" />
                  </Grid>
                  <Grid xs={12}>
                    <TextField fullWidth label="Chủ đề" />
                  </Grid>
                  <Grid xs={12}>
                    <TextField fullWidth multiline rows={4} label="Nội dung" />
                  </Grid>
                  <Grid xs={12}>
                    <Button
                      fullWidth
                      size="large"
                      sx={{
                        borderRadius: 999,
                        py: 1.5,
                        bgcolor: SPA14_TERRA,
                        color: 'white',
                        '&:hover': { bgcolor: SPA14_TERRA_DARK },
                      }}
                    >
                      Gửi lời nhắn
                    </Button>
                  </Grid>
                </Grid>
              </Spa14SubSoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 10. OFFERS
// ======================================================================
// export function Spa14SubOffersPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.offers}
//         eyebrow="Ưu đãi"
//         title="Gói ưu đãi dành riêng cho bạn"
//         subtitle="Tiết kiệm hơn, trải nghiệm trọn vẹn hơn với các ưu đãi thường niên."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa14Offers.map((o) => (
//               <Grid key={o.title} xs={12} sm={6} md={3}>
//                 <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
//                   <Box
//                     sx={{
//                       width: 88,
//                       height: 88,
//                       mx: 'auto',
//                       mb: 2,
//                       borderRadius: '50%',
//                       bgcolor: SPA14_TERRA,
//                       color: 'common.white',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontWeight: 700,
//                       fontSize: 20,
//                     }}
//                   >
//                     {o.discount}
//                   </Box>
//                   <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1 }}>
//                     {o.title}
//                   </Typography>
//                   <Typography sx={{ color: 'text.secondary', mb: 2 }}>{o.desc}</Typography>
//                   <Chip
//                     label={`MÃ: ${o.code}`}
//                     sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK, fontWeight: 700, mb: 1 }}
//                   />
//                   <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
//                     HSD: {o.expires}
//                   </Typography>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }

export function Spa14SubOffersPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.offers}
        eyebrow={t('pages.offers.eyebrow')}
        title={t('pages.offers.title')}
        subtitle={t('pages.offers.subtitle')}
      />

      {/* Voucher đơn lẻ (giữ nguyên) */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Voucher" title="Mã ưu đãi hiện có" />
          <Grid container spacing={3}>
            {spa14Offers.map((o) => (
              <Grid key={o.title} xs={12} sm={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 88,
                      height: 88,
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      bgcolor: SPA14_TERRA,
                      color: 'common.white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 20,
                    }}
                  >
                    {o.discount}
                  </Box>
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1 }}>
                    {o.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 2 }}>{o.desc}</Typography>
                  <Chip
                    label={`MÃ: ${o.code}`}
                    sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK, fontWeight: 700, mb: 1 }}
                  />
                  <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                    HSD: {o.expires}
                  </Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Card combo */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Combo" title="Gói combo tiết kiệm" />
          <Grid container spacing={4}>
            {spa14ComboOffers.map((c) => {
              const savePercent = Math.round((1 - c.salePrice / c.originalPrice) * 100);
              return (
                <Grid key={c.slug} xs={12} md={4}>
                  <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        sx={{
                          height: 200,
                          backgroundImage: `url(${c.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <Chip
                        label={`-${savePercent}%`}
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          bgcolor: SPA14_TERRA,
                          color: 'white',
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1.5 }}>
                        {c.name}
                      </Typography>
                      {/* So sánh lợi ích */}
                      <Stack spacing={0.75} sx={{ mb: 2 }}>
                        {c.services.map((s) => (
                          <Stack key={s} direction="row" spacing={1} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              width={16}
                              sx={{ color: SPA14_TERRA }}
                            />
                            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                              {s}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 2 }}>
                        <Typography variant="h5" sx={{ color: SPA14_TERRA }}>
                          {formatVND(c.salePrice)}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'text.disabled',
                            textDecoration: 'line-through',
                            fontSize: 14,
                          }}
                        >
                          {formatVND(c.originalPrice)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                        {c.perks.map((p) => (
                          <Chip
                            key={p}
                            size="small"
                            label={p}
                            sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
                          />
                        ))}
                      </Stack>
                      <Button
                        fullWidth
                        component={RouterLink}
                        href={paths.spa14.booking}
                        sx={{
                          borderRadius: 999,
                          py: 1.2,
                          bgcolor: SPA14_TERRA,
                          color: 'white',
                          '&:hover': { bgcolor: SPA14_TERRA_DARK },
                        }}
                      >
                        Mua ngay / Đặt lịch
                      </Button>
                    </Box>
                  </Spa14SubSoftCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 11. FEEDBACK
// ======================================================================
// export function Spa14SubFeedbackPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.feedback}
//         eyebrow="Cảm nhận khách hàng"
//         title="25.000+ khách hàng tin yêu"
//         subtitle="Mỗi đánh giá là động lực để chúng tôi không ngừng hoàn thiện."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa14Feedbacks.map((f) => (
//               <Grid key={f.name} xs={12} sm={6} md={4}>
//                 <Spa14SubSoftCard>
//                   <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
//                   <Typography sx={{ color: SPA14_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>
//                     “{f.comment}”
//                   </Typography>
//                   <Stack direction="row" spacing={2} alignItems="center">
//                     <Avatar src={f.avatar} />
//                     <Stack>
//                       <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.name}</Typography>
//                       <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
//                         {f.role} · {f.service}
//                       </Typography>
//                     </Stack>
//                   </Stack>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }

// them moi
export function Spa14SubFeedbackPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.feedback}
        eyebrow={t('pages.feedback.eyebrow')}
        title={t('pages.feedback.title')}
        subtitle={t('pages.feedback.subtitle')}
      />

      {/* Video review */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Video" title="Cảm nhận qua video" />
          <Grid container spacing={3}>
            {spa14VideoReviews.map((v) => (
              <Grid key={v.name} xs={12} sm={6} md={4}>
                <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden', cursor: 'pointer' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        height: 220,
                        backgroundImage: `url(${v.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(31,42,40,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255,255,255,0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon="solar:play-bold" width={28} sx={{ color: SPA14_TERRA }} />
                      </Box>
                    </Box>
                    <Chip
                      label={v.duration}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{v.name}</Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      {v.service}
                    </Typography>
                  </Box>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ pb: { xs: 8, md: 12 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Đánh giá" title="Tất cả phản hồi" />
          <Grid container spacing={3}>
            {spa14Feedbacks.map((f) => (
              <Grid key={f.name} xs={12} sm={6} md={4}>
                <Spa14SubSoftCard>
                  <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography
                    sx={{ color: SPA14_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}
                  >
                    “{f.comment}”
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={f.avatar} />
                    <Stack>
                      <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {f.role} · {f.service}
                      </Typography>
                    </Stack>
                  </Stack>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 12. PROMOTIONS
// ======================================================================
function Spa14SubCountdown({ endsAt }: { endsAt: string }) {
  const calc = () => {
    const diff = +new Date(endsAt) - +new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, ended: true };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
      ended: false,
    };
  };
  const [time, setTime] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt]);

  if (time.ended) {
    return <Chip label="Đã kết thúc" sx={{ bgcolor: 'grey.300', color: 'text.secondary' }} />;
  }

  const units = [
    { label: 'Ngày', value: time.d },
    { label: 'Giờ', value: time.h },
    { label: 'Phút', value: time.m },
    { label: 'Giây', value: time.s },
  ];

  return (
    <Stack direction="row" spacing={1.5}>
      {units.map((u) => (
        <Stack key={u.label} alignItems="center">
          <Box
            sx={{
              minWidth: 56,
              py: 1,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.15)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ color: 'common.white', fontWeight: 700 }}>
              {String(u.value).padStart(2, '0')}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', mt: 0.5 }}>
            {u.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

// export function Spa14SubPromotionsPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.promotions}
//         eyebrow="Khuyến mãi"
//         title="Sự kiện & khuyến mãi theo mùa"
//         subtitle="Cập nhật các chương trình giới hạn thời gian, ưu đãi cực sốc trong năm."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Stack spacing={4}>
//             {spa14Promotions.map((p, idx) => (
//               <Spa14SubSoftCard key={p.title} sx={{ p: 0, overflow: 'hidden' }}>
//                 <Grid container>
//                   <Grid xs={12} md={5} sx={{ order: { md: idx % 2 ? 2 : 1 } }}>
//                     <Box
//                       sx={{
//                         minHeight: 260,
//                         height: '100%',
//                         backgroundImage: `url(${p.image})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                       }}
//                     />
//                   </Grid>
//                   <Grid xs={12} md={7} sx={{ order: { md: idx % 2 ? 1 : 2 } }}>
//                     <Box sx={{ p: { xs: 3, md: 5 } }}>
//                       <Chip
//                         label={p.period}
//                         sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK, mb: 2 }}
//                       />
//                       <Typography variant="h4" sx={{ color: SPA14_INK, mb: 1.5 }}>
//                         {p.title}
//                       </Typography>
//                       <Typography
//                         sx={{ color: SPA14_TERRA_DARK, fontWeight: 700, fontSize: 22, mb: 1 }}
//                       >
//                         {p.price}
//                       </Typography>
//                       <Typography sx={{ color: 'text.secondary', mb: 3 }}>{p.save}</Typography>
//                       <Button
//                         component={RouterLink}
//                         href={paths.spa14.booking}
//                         sx={{
//                           borderRadius: 999,
//                           px: 4,
//                           bgcolor: SPA14_TERRA,
//                           color: 'white',
//                           '&:hover': { bgcolor: SPA14_TERRA_DARK },
//                         }}
//                       >
//                         Đăng ký ngay
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Spa14SubSoftCard>
//             ))}
//           </Stack>
//         </Container>
//       </Box>
//     </Spa14SubPageShell>
//   );
// }

export function Spa14SubPromotionsPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      {/* Banner dịch vụ */}
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.promotions}
        eyebrow={t('pages.promotions.eyebrow')}
        title={t('pages.promotions.title')}
        subtitle={t('pages.promotions.subtitle')}
      />

      {/* Flash sale countdown nổi bật cho khuyến mãi đầu tiên */}
      {spa14Promotions[0] && (
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container>
            <Card
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 6,
                color: 'common.white',
                background: `linear-gradient(135deg, ${SPA14_TERRA_DARK} 0%, ${SPA14_INK} 100%)`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                justifyContent="space-between"
              >
                <Stack spacing={1.5}>
                  <Chip
                    label="FLASH SALE"
                    sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', width: 'fit-content' }}
                  />
                  <Typography variant="h3">{spa14Promotions[0].title}</Typography>
                  <Typography sx={{ opacity: 0.85 }}>{spa14Promotions[0].save}</Typography>
                </Stack>
                <Spa14SubCountdown
                  endsAt={(spa14Promotions[0] as any).endsAt ?? '2026-12-31T23:59:59'}
                />
              </Stack>
            </Card>
          </Container>
        </Box>
      )}

      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container>
          <Stack spacing={4}>
            {spa14Promotions.map((p, idx) => (
              <Spa14SubSoftCard key={p.title} sx={{ p: 0, overflow: 'hidden' }}>
                <Grid container>
                  <Grid xs={12} md={5} sx={{ order: { md: idx % 2 ? 2 : 1 } }}>
                    <Box
                      sx={{
                        minHeight: 260,
                        height: '100%',
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </Grid>
                  <Grid xs={12} md={7} sx={{ order: { md: idx % 2 ? 1 : 2 } }}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                      <Chip
                        label={p.period}
                        sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK, mb: 2 }}
                      />
                      <Typography variant="h4" sx={{ color: SPA14_INK, mb: 1.5 }}>
                        {p.title}
                      </Typography>
                      <Typography
                        sx={{ color: SPA14_TERRA_DARK, fontWeight: 700, fontSize: 22, mb: 1 }}
                      >
                        {p.price}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 2 }}>{p.save}</Typography>
                      {(p as any).endsAt && (
                        <Box sx={{ mb: 3 }}>
                          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
                            Kết thúc sau:
                          </Typography>
                          <Box
                            sx={{
                              display: 'inline-block',
                              bgcolor: SPA14_TERRA_DARK,
                              p: 1.5,
                              borderRadius: 2,
                            }}
                          >
                            <Spa14SubCountdown endsAt={(p as any).endsAt} />
                          </Box>
                        </Box>
                      )}
                      <Button
                        component={RouterLink}
                        href={paths.spa14.booking}
                        sx={{
                          borderRadius: 999,
                          px: 4,
                          bgcolor: SPA14_TERRA,
                          color: 'white',
                          '&:hover': { bgcolor: SPA14_TERRA_DARK },
                        }}
                      >
                        Đăng ký ngay
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Spa14SubSoftCard>
            ))}
          </Stack>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 13. BRANCHES
// ======================================================================
// export function Spa14SubBranchesPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.branches}
//         eyebrow="Hệ thống"
//         title="4 chi nhánh trên toàn quốc"
//         subtitle="Tìm chi nhánh Imperial Vienna gần bạn nhất – mọi nơi đều cùng một chuẩn dịch vụ."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa14Branches.map((b) => (
//               <Grid key={b.name} xs={12} sm={6} md={6}>
//                 <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
//                   <Box
//                     sx={{
//                       height: 220,
//                       backgroundImage: `url(${b.image})`,
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                     }}
//                   />
//                   <Box sx={{ p: 3 }}>
//                     <Chip
//                       label={b.city}
//                       sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK, mb: 1.5 }}
//                     />
//                     <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
//                       {b.name}
//                     </Typography>
//                     <Stack spacing={1}>
//                       <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Iconify icon="solar:map-point-bold" sx={{ color: SPA14_TERRA }} width={18} />
//                         <Typography sx={{ color: 'text.secondary' }}>{b.address}</Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Iconify icon="solar:phone-bold" sx={{ color: SPA14_TERRA }} width={18} />
//                         <Typography sx={{ color: 'text.secondary' }}>{b.phone}</Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Iconify
//                           icon="solar:clock-circle-bold"
//                           sx={{ color: SPA14_TERRA }}
//                           width={18}
//                         />
//                         <Typography sx={{ color: 'text.secondary' }}>{b.hours}</Typography>
//                       </Stack>
//                     </Stack>
//                   </Box>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa14SubPageShell>
//   );
// }

export function Spa14SubBranchesPageView() {
  const { t } = useTranslate('spa14');
  const [activeCity, setActiveCity] = useState<string>(spa14Branches[0].city);
  const activeBranch = spa14Branches.find((b) => b.city === activeCity) ?? spa14Branches[0];

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.branches}
        eyebrow={t('pages.branches.eyebrow')}
        title={t('pages.branches.title')}
        subtitle={t('pages.branches.subtitle')}
      />

      {/* Map tổng + List location */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                <Typography sx={{ p: 2.5, pb: 0, color: SPA14_INK, fontWeight: 600 }}>
                  Chọn khu vực
                </Typography>
                <Stack divider={<Divider />} sx={{ mt: 1 }}>
                  {spa14Branches.map((b) => (
                    <Stack
                      key={b.city}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      onClick={() => setActiveCity(b.city)}
                      sx={{
                        p: 2.5,
                        cursor: 'pointer',
                        bgcolor: activeCity === b.city ? SPA14_SAND : 'transparent',
                        borderLeft:
                          activeCity === b.city
                            ? `3px solid ${SPA14_TERRA}`
                            : '3px solid transparent',
                        '&:hover': { bgcolor: SPA14_SAND },
                      }}
                    >
                      <Iconify
                        icon="solar:map-point-bold"
                        sx={{ color: activeCity === b.city ? SPA14_TERRA : 'text.disabled' }}
                      />
                      <Stack>
                        <Typography sx={{ color: SPA14_INK, fontWeight: 600, fontSize: 14 }}>
                          {b.city}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                          {b.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Spa14SubSoftCard>
            </Grid>

            {/* Map tổng (placeholder iframe embed theo branch đang chọn) */}
            <Grid xs={12} md={8}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 320, md: '100%' },
                  minHeight: 360,
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(31,42,40,0.08)',
                }}
              >
                <iframe
                  title="Imperial Vienna Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    activeBranch.address
                  )}&output=embed`}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Card chi nhánh + CTA đặt lịch theo location */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Chi nhánh" title="Tất cả địa điểm" />
          <Grid container spacing={3}>
            {spa14Branches.map((b) => (
              <Grid key={b.name} xs={12} sm={6} md={6}>
                <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 220,
                      backgroundImage: `url(${b.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Chip
                      label={b.city}
                      sx={{ bgcolor: 'common.white', color: SPA14_TERRA_DARK, mb: 1.5 }}
                    />
                    <Typography variant="h6" sx={{ color: SPA14_INK, mb: 2 }}>
                      {b.name}
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Iconify
                          icon="solar:map-point-bold"
                          sx={{ color: SPA14_TERRA }}
                          width={18}
                        />
                        <Typography sx={{ color: 'text.secondary' }}>{b.address}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Iconify icon="solar:phone-bold" sx={{ color: SPA14_TERRA }} width={18} />
                        <Typography sx={{ color: 'text.secondary' }}>{b.phone}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Iconify
                          icon="solar:clock-circle-bold"
                          sx={{ color: SPA14_TERRA }}
                          width={18}
                        />
                        <Typography sx={{ color: 'text.secondary' }}>{b.hours}</Typography>
                      </Stack>
                    </Stack>
                    <Button
                      fullWidth
                      component={RouterLink}
                      href={`${paths.spa14.booking}?branch=${encodeURIComponent(b.name)}`}
                      sx={{
                        borderRadius: 999,
                        bgcolor: SPA14_TERRA,
                        color: 'white',
                        '&:hover': { bgcolor: SPA14_TERRA_DARK },
                      }}
                    >
                      Đặt lịch tại {b.city}
                    </Button>
                  </Box>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 14. ACCOUNT
// ======================================================================
export function Spa14SubAccountPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.account}
        eyebrow={t('pages.account.eyebrow')}
        title={t('pages.account.title')}
        subtitle={t('pages.account.subtitle')}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                <Avatar
                  src="https://i.pravatar.cc/200?img=11"
                  sx={{ width: 88, height: 88, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6" sx={{ color: SPA14_INK }}>
                  Lê Minh Anh
                </Typography>
                <Chip label="Thẻ Gold" sx={{ bgcolor: SPA14_TERRA, color: 'white', my: 1.5 }} />
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: 'text.secondary' }}>Điểm tích lũy</Typography>
                    <Typography sx={{ color: SPA14_TERRA_DARK, fontWeight: 700 }}>3.250</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: 'text.secondary' }}>Lượt còn lại</Typography>
                    <Typography sx={{ color: SPA14_TERRA_DARK, fontWeight: 700 }}>
                      6 / 10
                    </Typography>
                  </Stack>
                </Stack>
              </Spa14SubSoftCard>
            </Grid>
            <Grid xs={12} md={8}>
              <Spa14SubSoftCard>
                <Spa14SubSectionTitle eyebrow="Lịch hẹn" title="Sắp tới" align="left" />
                <Stack spacing={2}>
                  {[
                    {
                      date: '02/07',
                      time: '15:00',
                      service: 'Facial Organic',
                      branch: 'Q1, TP.HCM',
                    },
                    {
                      date: '12/07',
                      time: '10:30',
                      service: 'Massage Thảo Dược',
                      branch: 'Q1, TP.HCM',
                    },
                    {
                      date: '24/07',
                      time: '18:00',
                      service: 'Detox Day 1/3',
                      branch: 'Q1, TP.HCM',
                    },
                  ].map((a) => (
                    <Stack
                      key={a.date + a.time}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ p: 2, borderRadius: 2, bgcolor: SPA14_SAND }}
                    >
                      <Box sx={{ minWidth: 64, textAlign: 'center' }}>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Ngày</Typography>
                        <Typography sx={{ fontWeight: 700, color: SPA14_TERRA_DARK }}>
                          {a.date}
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Stack flexGrow={1}>
                        <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>
                          {a.service}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {a.time} · {a.branch}
                        </Typography>
                      </Stack>
                      <Button size="small" sx={{ color: SPA14_TERRA_DARK }}>
                        Đổi lịch
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              </Spa14SubSoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 15. PARTNERS
// ======================================================================
// export function Spa14SubPartnersPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.partners}
//         eyebrow="Cộng sự"
//         title="Đối tác đồng hành"
//         subtitle="Hợp tác cùng các thương hiệu mỹ phẩm và thiết bị spa hàng đầu thế giới."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa14Partners.map((p) => (
//               <Grid key={p.name} xs={6} sm={4} md={2}>
//                 <Spa14SubSoftCard sx={{ textAlign: 'center', py: 4 }}>
//                   <Box
//                     sx={{
//                       width: 64,
//                       height: 64,
//                       mx: 'auto',
//                       mb: 1.5,
//                       borderRadius: '50%',
//                       bgcolor: SPA14_TERRA,
//                       color: 'white',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontWeight: 700,
//                     }}
//                   >
//                     {p.logo}
//                   </Box>
//                   <Typography sx={{ color: SPA14_INK, fontWeight: 600, fontSize: 14 }}>
//                     {p.name}
//                   </Typography>
//                   <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
//                     {p.country}
//                   </Typography>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa14SubPageShell>
//   );
// }

// them moi
export function Spa14SubPartnersPageView() {
  const { t } = useTranslate('spa14');
  const [selected, setSelected] = useState<any>(null);
  const allPartners = [...spa14PartnerProfiles, ...spa14ExtraPartners];

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.partners}
        eyebrow={t('pages.partners.eyebrow')}
        title={t('pages.partners.title')}
        subtitle={t('pages.partners.subtitle')}
      />

      {/* Logo đối tác - grid 4-6 cột */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Thương hiệu" title="Đối tác của chúng tôi" />
          <Grid container spacing={3}>
            {allPartners.map((p) => (
              <Grid key={p.name} xs={6} sm={4} md={2}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                  <Spa14SubSoftCard sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 1.5,
                        borderRadius: '50%',
                        bgcolor: SPA14_TERRA,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {p.logo}
                    </Box>
                    <Typography sx={{ color: SPA14_INK, fontWeight: 600, fontSize: 14 }}>
                      {p.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                      {p.country}
                    </Typography>
                  </Spa14SubSoftCard>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Đối tác chiến lược theo nhóm */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Phân loại" title="Đối tác chiến lược" />
          <Grid container spacing={3}>
            {spa14PartnerCategories.map((cat) => {
              const partnersInCat = allPartners.filter((p: any) => p.category === cat.key);
              return (
                <Grid key={cat.key} xs={12} sm={6} md={3}>
                  <Spa14SubSoftCard>
                    <Iconify icon={cat.icon} width={36} sx={{ color: SPA14_TERRA, mb: 1.5 }} />
                    <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1.5 }}>
                      {cat.label}
                    </Typography>
                    <Stack spacing={1}>
                      {partnersInCat.map((p: any) => (
                        <Typography key={p.name} sx={{ fontSize: 14, color: 'text.secondary' }}>
                          • {p.name}
                        </Typography>
                      ))}
                    </Stack>
                  </Spa14SubSoftCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Dự án hợp tác */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Hợp tác" title="Dự án nổi bật" />
          <Grid container spacing={3}>
            {spa14Collaborations.map((c) => (
              <Grid key={c.title} xs={12} sm={6} md={4}>
                <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 180,
                      backgroundImage: `url(${c.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 2.5 }}>
                    <Chip
                      size="small"
                      label={c.year}
                      sx={{ mb: 1.5, bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
                    />
                    <Typography sx={{ color: SPA14_INK, fontWeight: 600, mb: 0.5 }}>
                      {c.title}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      Cùng {c.partner}
                    </Typography>
                  </Box>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Chứng nhận */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Tiêu chuẩn" title="Chứng nhận" />
          <Grid container spacing={3}>
            {spa14QualityCerts.map((c) => (
              <Grid key={c.name} xs={12} sm={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={c.icon} width={44} sx={{ color: SPA14_TERRA, mb: 1.5 }} />
                  <Typography variant="h6" sx={{ color: SPA14_INK, mb: 0.5 }}>
                    {c.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{c.desc}</Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Trở thành đối tác - form */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Spa14SubSoftCard>
            <Spa14SubSectionTitle
              eyebrow="Hợp tác"
              title="Trở thành đối tác của Imperial Vienna"
              align="left"
            />
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label="Tên công ty" />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label="Người liên hệ" />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth label="Email" />
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField fullWidth select label="Lĩnh vực hợp tác">
                  {spa14PartnerCategories.map((c) => (
                    <MenuItem key={c.key} value={c.key}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid xs={12}>
                <TextField fullWidth multiline rows={3} label="Mô tả đề xuất hợp tác" />
              </Grid>
              <Grid xs={12}>
                <Button
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 999,
                    py: 1.5,
                    bgcolor: SPA14_TERRA,
                    color: 'white',
                    '&:hover': { bgcolor: SPA14_TERRA_DARK },
                  }}
                >
                  Gửi đề xuất hợp tác
                </Button>
              </Grid>
            </Grid>
          </Spa14SubSoftCard>
        </Container>
      </Box>

      {/* Modal chi tiết đối tác */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
        {selected && (
          <DialogContent sx={{ p: 4, position: 'relative' }}>
            <IconButton
              onClick={() => setSelected(null)}
              sx={{ position: 'absolute', top: 12, right: 12 }}
            >
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
            <Stack alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  bgcolor: SPA14_TERRA,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 24,
                }}
              >
                {selected.logo}
              </Box>
              <Typography variant="h5" sx={{ color: SPA14_INK }}>
                {selected.name}
              </Typography>
              <Chip
                label={`${selected.country} · Hợp tác từ ${selected.since}`}
                sx={{ bgcolor: SPA14_SAND, color: SPA14_TERRA_DARK }}
              />
            </Stack>
            <Typography
              sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2, textAlign: 'center' }}
            >
              {selected.desc}
            </Typography>
            {selected.expert && (
              <>
                <Divider sx={{ my: 2 }} />
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mb: 3 }}
                >
                  <Iconify icon="solar:user-bold" sx={{ color: SPA14_TERRA }} />
                  <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>
                    {selected.expert}
                  </Typography>
                </Stack>
              </>
            )}
            <Button
              fullWidth
              component={RouterLink}
              href={paths.spa14.booking}
              size="large"
              sx={{
                borderRadius: 999,
                py: 1.5,
                bgcolor: SPA14_TERRA,
                color: 'white',
                '&:hover': { bgcolor: SPA14_TERRA_DARK },
              }}
            >
              Đặt lịch ngay
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 16. TREATMENTS (gói liệu trình)
// ======================================================================
// export function Spa14SubTreatmentsPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.treatments}
//         eyebrow="Gói liệu trình"
//         title="Liệu trình chuyên sâu"
//         subtitle="Lộ trình được thiết kế cá nhân hóa cho từng vấn đề – đảm bảo kết quả rõ rệt."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa14Treatments.map((t) => (
//               <Grid key={t.name} xs={12} md={6}>
//                 <Spa14SubSoftCard>
//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="flex-start"
//                     sx={{ mb: 2 }}
//                   >
//                     <Stack>
//                       <Typography variant="h6" sx={{ color: SPA14_INK }}>
//                         {t.name}
//                       </Typography>
//                       <Typography sx={{ color: 'text.secondary' }}>{t.target}</Typography>
//                     </Stack>
//                     <Chip
//                       label={`${t.sessions} buổi`}
//                       sx={{ bgcolor: SPA14_TERRA, color: 'white' }}
//                     />
//                   </Stack>
//                   <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                     <Iconify icon="solar:calendar-bold" sx={{ color: SPA14_TERRA }} />
//                     <Typography sx={{ color: 'text.secondary' }}>
//                       Thời lượng: {t.duration}
//                     </Typography>
//                   </Stack>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography sx={{ color: SPA14_INK, mb: 1.5, fontWeight: 600 }}>
//                     Bao gồm:
//                   </Typography>
//                   <Stack spacing={1}>
//                     {t.includes.map((i) => (
//                       <Stack key={i} direction="row" spacing={1.5} alignItems="center">
//                         <Iconify
//                           icon="solar:check-circle-bold"
//                           sx={{ color: SPA14_TERRA }}
//                           width={18}
//                         />
//                         <Typography sx={{ color: 'text.secondary' }}>{i}</Typography>
//                       </Stack>
//                     ))}
//                   </Stack>
//                   <Divider sx={{ my: 2 }} />
//                   <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Typography variant="h5" sx={{ color: SPA14_TERRA }}>
//                       {formatVND(t.price)}
//                     </Typography>
//                     <Button
//                       component={RouterLink}
//                       href={paths.spa14.booking}
//                       sx={{
//                         borderRadius: 999,
//                         px: 3,
//                         bgcolor: SPA14_TERRA,
//                         color: 'white',
//                         '&:hover': { bgcolor: SPA14_TERRA_DARK },
//                       }}
//                     >
//                       Đăng ký
//                     </Button>
//                   </Stack>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }
export function Spa14SubTreatmentsPageView() {
  const { t } = useTranslate('spa14');
  const [search, setSearch] = useState('');

  const filtered = spa14Treatments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.treatments}
        eyebrow={t('pages.treatments.eyebrow')}
        title={t('pages.treatments.title')}
        subtitle={t('pages.treatments.subtitle')}
      />
      <Box sx={{ pb: { xs: 4, md: 6 } }}>
        <Container sx={{ textAlign: 'center' }}>
          <Button
            component={RouterLink}
            href={paths.spa14.booking}
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 999,
              bgcolor: SPA14_TERRA,
              color: 'white',
              '&:hover': { bgcolor: SPA14_TERRA_DARK },
            }}
          >
            Đặt lịch ngay
          </Button>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container>
          {/* Bộ lọc */}
          <TextField
            fullWidth
            placeholder="Tìm theo tên liệu trình hoặc vấn đề da..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 5, maxWidth: 480 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="solar:magnifer-linear" sx={{ color: SPA14_TERRA }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Danh sách treatment */}
          <Grid container spacing={3}>
            {filtered.map((d) => (
              <Grid key={d.name} xs={12} md={6}>
                <Spa14SubSoftCard>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 2 }}
                  >
                    <Stack>
                      <Typography variant="h6" sx={{ color: SPA14_INK }}>
                        {d.name}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{d.target}</Typography>
                    </Stack>
                    <Chip
                      label={`${d.sessions} buổi`}
                      sx={{ bgcolor: SPA14_TERRA, color: 'white' }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Iconify icon="solar:calendar-bold" sx={{ color: SPA14_TERRA }} />
                    <Typography sx={{ color: 'text.secondary' }}>
                      Thời lượng: {d.duration}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Typography sx={{ color: SPA14_INK, mb: 1.5, fontWeight: 600 }}>
                    Bao gồm:
                  </Typography>
                  <Stack spacing={1}>
                    {d.includes.map((i) => (
                      <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          sx={{ color: SPA14_TERRA }}
                          width={18}
                        />
                        <Typography sx={{ color: 'text.secondary' }}>{i}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" sx={{ color: SPA14_TERRA }}>
                      {formatVND(d.price)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa14.booking}
                      sx={{
                        borderRadius: 999,
                        px: 3,
                        bgcolor: SPA14_TERRA,
                        color: 'white',
                        '&:hover': { bgcolor: SPA14_TERRA_DARK },
                      }}
                    >
                      Đăng ký
                    </Button>
                  </Stack>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Quy trình điều trị */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container maxWidth="md">
          <Spa14SubSectionTitle eyebrow="Quy trình" title="4 bước điều trị chuẩn y khoa" />
          <Grid container spacing={3}>
            {spa14TreatmentProcess.map((p, idx) => (
              <Grid key={p.title} xs={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{ color: SPA14_TERRA_LIGHT, fontWeight: 700, mb: 1 }}
                  >
                    {idx + 1}
                  </Typography>
                  <Typography sx={{ color: SPA14_INK, fontWeight: 600, mb: 1 }}>
                    {p.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{p.desc}</Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 17. BEFORE-AFTER
// ======================================================================
// export function Spa14SubBeforeAfterPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.beforeAfter}
//         eyebrow="Trước & Sau"
//         title="Kết quả thực tế từ khách hàng"
//         subtitle="Hình ảnh được chia sẻ với sự đồng thuận của khách hàng – không qua chỉnh sửa."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa14BeforeAfters.map((ba) => (
//               <Grid key={ba.title} xs={12} sm={6}>
//                 <Spa14SubSoftCard sx={{ p: 0, overflow: 'hidden' }}>
//                   <Grid container>
//                     <Grid xs={6}>
//                       <Box sx={{ position: 'relative' }}>
//                         <Box
//                           sx={{
//                             height: 240,
//                             backgroundImage: `url(${ba.before})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center',
//                           }}
//                         />
//                         <Chip
//                           label="TRƯỚC"
//                           size="small"
//                           sx={{
//                             position: 'absolute',
//                             top: 12,
//                             left: 12,
//                             bgcolor: 'rgba(31,42,40,0.8)',
//                             color: 'white',
//                           }}
//                         />
//                       </Box>
//                     </Grid>
//                     <Grid xs={6}>
//                       <Box sx={{ position: 'relative' }}>
//                         <Box
//                           sx={{
//                             height: 240,
//                             backgroundImage: `url(${ba.after})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'center',
//                           }}
//                         />
//                         <Chip
//                           label="SAU"
//                           size="small"
//                           sx={{
//                             position: 'absolute',
//                             top: 12,
//                             left: 12,
//                             bgcolor: SPA14_TERRA,
//                             color: 'white',
//                           }}
//                         />
//                       </Box>
//                     </Grid>
//                   </Grid>
//                   <Box sx={{ p: 3 }}>
//                     <Typography variant="h6" sx={{ color: SPA14_INK, mb: 1 }}>
//                       {ba.title}
//                     </Typography>
//                     <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
//                       Thời gian: {ba.duration}
//                     </Typography>
//                     <Typography sx={{ color: SPA14_TERRA_DARK }}>{ba.note}</Typography>
//                   </Box>
//                 </Spa14SubSoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa14SubPageShell>
//   );
// }
function Spa14SubBeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <Box sx={{ position: 'relative', aspectRatio: '4/3', borderRadius: 3, overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${after})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: `${pos}%`,
          overflow: 'hidden',
          backgroundImage: `url(${before})`,
          backgroundSize: `${10000 / pos}% 100%`,
          backgroundPosition: 'left center',
        }}
      />
      <Chip
        label="TRƯỚC"
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          bgcolor: 'rgba(31,42,40,0.8)',
          color: 'white',
        }}
      />
      <Chip
        label="SAU"
        size="small"
        sx={{ position: 'absolute', top: 12, right: 12, bgcolor: SPA14_TERRA, color: 'white' }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: `${pos}%`,
          top: 0,
          bottom: 0,
          width: 3,
          bgcolor: 'common.white',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 8px rgba(0,0,0,0.4)',
        }}
      />
      <Slider
        value={pos}
        onChange={(_, v) => setPos(v as number)}
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '5%',
          width: '90%',
          color: 'common.white',
        }}
      />
    </Box>
  );
}

export function Spa14SubBeforeAfterPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.beforeAfter}
        eyebrow={t('pages.beforeAfter.eyebrow')}
        title={t('pages.beforeAfter.title')}
        subtitle={t('pages.beforeAfter.subtitle')}
      />

      {/* Slider before/after */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Trải nghiệm" title="Kéo để so sánh" />
          <Grid container spacing={4}>
            {spa14BeforeAfters.map((ba) => (
              <Grid key={ba.title} xs={12} sm={6}>
                <Spa14SubSoftCard sx={{ p: 2 }}>
                  <Spa14SubBeforeAfterSlider before={ba.before} after={ba.after} />
                  <Box sx={{ pt: 2 }}>
                    <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{ba.title}</Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      Thời gian: {ba.duration}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: SPA14_TERRA_DARK, mt: 0.5 }}>
                      {ba.note}
                    </Typography>
                  </Box>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Công nghệ sử dụng */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Công nghệ" title="Thiết bị & công nghệ độc quyền" />
          <Grid container spacing={3}>
            {spa14Technologies.map((d) => (
              <Grid key={d.name} xs={12} sm={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={d.icon} width={40} sx={{ color: SPA14_TERRA, mb: 1.5 }} />
                  <Typography sx={{ color: SPA14_INK, fontWeight: 600, mb: 1 }}>
                    {d.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{d.desc}</Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Chuyên gia phụ trách */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Đội ngũ" title="Chuyên gia phụ trách" />
          <Grid container spacing={3} justifyContent="center">
            {spa14TreatmentExperts.map((e) => (
              <Grid key={e.name} xs={12} sm={6} md={3}>
                <Spa14SubSoftCard sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={e.image}
                    sx={{
                      width: 88,
                      height: 88,
                      mx: 'auto',
                      mb: 1.5,
                      border: `3px solid ${SPA14_TERRA_LIGHT}`,
                    }}
                  />
                  <Typography sx={{ color: SPA14_INK, fontWeight: 600 }}>{e.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{e.role}</Typography>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Feedback khách hàng */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA14_SAND }}>
        <Container>
          <Spa14SubSectionTitle eyebrow="Đánh giá" title="Khách hàng nói gì" />
          <Grid container spacing={3}>
            {spa14Feedbacks.slice(0, 3).map((f) => (
              <Grid key={f.name} xs={12} sm={6} md={4}>
                <Spa14SubSoftCard>
                  <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography
                    sx={{ color: SPA14_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}
                  >
                    “{f.comment}”
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={f.avatar} />
                    <Stack>
                      <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {f.service}
                      </Typography>
                    </Stack>
                  </Stack>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Spa14SubSectionTitle eyebrow="FAQ" title="Câu hỏi thường gặp" />
          {spa14Faqs.slice(0, 4).map((f, idx) => (
            <Accordion
              key={f.q}
              defaultExpanded={idx === 0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: `1px solid ${SPA14_SAND_DARK}`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { borderColor: SPA14_TERRA_LIGHT },
              }}
            >
              <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <Spa14SubCta />
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 18. FAQ
// ======================================================================
// export function Spa14SubFaqPageView() {
//   return (
//     <Spa14SubPageShell>
//       <Spa14SubPageHero
//         image={SPA14_PAGE_IMAGES.faq}
//         eyebrow="FAQ"
//         title="Câu hỏi thường gặp"
//         subtitle="Mọi điều bạn cần biết trước khi đến với Imperial Vienna."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           {spa14Faqs.map((f, idx) => (
//             <Accordion
//               key={f.q}
//               defaultExpanded={idx === 0}
//               sx={{
//                 mb: 1.5,
//                 borderRadius: '12px !important',
//                 border: `1px solid ${SPA14_SAND_DARK}`,
//                 boxShadow: 'none',
//                 '&:before': { display: 'none' },
//                 '&.Mui-expanded': { borderColor: SPA14_TERRA_LIGHT },
//               }}
//             >
//               <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
//                 <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.q}</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
//               </AccordionDetails>
//             </Accordion>
//           ))}
//         </Container>
//       </Box>
//       <Spa14SubCta />
//     </Spa14SubPageShell>
//   );
// }
export function Spa14SubFaqPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.faq}
        eyebrow={t('pages.faq.eyebrow')}
        title={t('pages.faq.title')}
        subtitle={t('pages.faq.subtitle')}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {spa14Faqs.map((f, idx) => (
            <Accordion
              key={f.q}
              defaultExpanded={idx === 0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: `1px solid ${SPA14_SAND_DARK}`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { borderColor: SPA14_TERRA_LIGHT },
              }}
            >
              <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                <Typography sx={{ fontWeight: 600, color: SPA14_INK }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* CTA đăng ký */}
          <Spa14SubSoftCard
            sx={{
              mt: 5,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${SPA14_TERRA} 0%, ${SPA14_TERRA_DARK} 100%)`,
              color: 'white',
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Vẫn còn thắc mắc?
            </Typography>
            <Typography sx={{ opacity: 0.85, mb: 3 }}>
              Đội ngũ tư vấn của Imperial Vienna luôn sẵn sàng hỗ trợ bạn.
            </Typography>
            <Button
              component={RouterLink}
              href={paths.spa14.booking}
              sx={{
                borderRadius: 999,
                px: 4,
                bgcolor: 'common.white',
                color: SPA14_TERRA_DARK,
                '&:hover': { bgcolor: SPA14_SAND },
              }}
            >
              Đăng ký tư vấn
            </Button>
          </Spa14SubSoftCard>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 19. POLICY
// ======================================================================
export function Spa14SubPolicyPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.policy}
        eyebrow={t('pages.policy.eyebrow')}
        title={t('pages.policy.title')}
        subtitle={t('pages.policy.subtitle')}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            {spa14Policies.map((p) => (
              <Grid key={p.title} xs={12} sm={6}>
                <Spa14SubSoftCard>
                  <Typography variant="h6" sx={{ color: SPA14_TERRA_DARK, mb: 2 }}>
                    {p.title}
                  </Typography>
                  <Stack spacing={1}>
                    {p.items.map((i) => (
                      <Stack key={i} direction="row" spacing={1.5}>
                        <Iconify
                          icon="solar:sun-bold"
                          sx={{ color: SPA14_TERRA, mt: 0.5 }}
                          width={16}
                        />
                        <Typography sx={{ color: 'text.secondary' }}>{i}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Spa14SubSoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}

// ======================================================================
// 20. GALLERY
// ======================================================================
export function Spa14SubGalleryPageView() {
  const { t } = useTranslate('spa14');
  return (
    <Spa14SubPageShell>
      <Spa14SubPageHero
        image={SPA14_PAGE_IMAGES.gallery}
        eyebrow={t('pages.gallery.eyebrow')}
        title={t('pages.gallery.title')}
        subtitle={t('pages.gallery.subtitle')}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={2}>
            {spa14Gallery.map((src, idx) => (
              <Grid key={src} xs={12} sm={6} md={idx % 5 === 0 ? 8 : 4}>
                <Box
                  sx={{
                    aspectRatio: idx % 5 === 0 ? '16/9' : '4/5',
                    borderRadius: 4,
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform .3s',
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Spa14SubPageShell>
  );
}
