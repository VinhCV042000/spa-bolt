import { useParams } from 'react-router-dom';
import { Fragment, useMemo, useState, useEffect } from 'react';

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
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {
  Tab,
  Tabs,
  Alert,
  Table,
  Slider,
  Checkbox,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  FormControlLabel,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { spa2ImageBackgroundStyle } from '../spa2-image-utils';
import {
  SPA2_INK,
  spa2Team,
  spa2Faqs,
  SPA2_SAGE,
  SPA2_TEAL,
  SPA2_CREAM,
  spa2Offers,
  spa2Careers,
  spa2Gallery,
  spa2Branches,
  spa2Services,
  spa2BlogPosts,
  spa2Feedbacks,
  spa2AboutStory,
  SPA2_TEAL_DARK,
  spa2Treatments,
  spa2Promotions,
  spa2BlogBanner,
  spa2AboutBanner,
  SPA2_CREAM_DARK,
  SPA2_TEAL_LIGHT,
  spa2ContactInfo,
  spa2Instructors,
  spa2JoinReasons,
  spa2ComboOffers,
  SPA2_PAGE_IMAGES,
  spa2BeforeAfters,
  spa2VideoReviews,
  spa2ServiceSteps,
  spa2QualityCerts,
  spa2Technologies,
  spa2OffersBanner,
  spa2BookingBanner,
  spa2CareersBanner,
  spa2VisionMission,
  spa2ExtraPartners,
  spa2ContactBanner,
  spa2ServicesBanner,
  spa2Certifications,
  spa2Collaborations,
  spa2TrainingBanner,
  spa2FeedbackBanner,
  spa2AboutStoryImage,
  spa2PartnerProfiles,
  spa2TrainingMission,
  spa2TrainingRoadmap,
  spa2BookingPackages,
  spa2WorkplaceVideos,
  spa2TrainingPrograms,
  spa2GraduateShowcase,
  spa2WorkplaceGallery,
  spa2TreatmentProcess,
  spa2TreatmentExperts,
  spa2InternalVideoUrl,
  spa2PromotionsBanner,
  spa2FlashSale,
  spa2BranchesBanner,
  spa2AccountBanner,
  SPA2_ACCOUNT_CONTENT,
  spa2PartnersBanner,
  spa2TreatmentsBanner,
  spa2BeforeAfterBanner,
  spa2FaqBanner,
  spa2FaqCategories,
  spa2PolicyBanner,
  spa2PolicyArticles,
  spa2GalleryBanner,
  spa2ServiceCategories,
  spa2PartnerCategories,
  spa2RecruitmentProcess,
  spa2InternalVideoThumb,
  spa2TrainingMissionImage,
  computeSpa2BlogCategories,
} from '../spa2-pages-data';

// ----------------------------------------------------------------------
// SHARED BUILDING BLOCKS – Nature/cream style with curved organic shapes
// ----------------------------------------------------------------------

export const formatVND = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)}đ`;

export function Spa2PageHero({
  image,
  imageStyle,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  imageStyle?: { focalX?: number; focalY?: number; zoom?: number };
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: SPA2_CREAM,
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
          bgcolor: SPA2_TEAL_LIGHT,
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
          bgcolor: SPA2_SAGE,
          opacity: 0.18,
        }}
      />

      <Container sx={{ position: 'relative' }}>
        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={7}>
            <Stack spacing={2.5}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Iconify icon="solar:leaf-bold" sx={{ color: SPA2_TEAL }} />
                <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                  {eyebrow}
                </Typography>
              </Stack>
              <Typography variant="h1" sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1 }}>
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
                  href={paths.spa2.booking}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 999,
                    bgcolor: SPA2_TEAL,
                    color: 'common.white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                  startIcon={<Iconify icon="solar:calendar-bold" />}
                >
                  Đặt lịch ngay
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.spa2.contact}
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 999,
                    color: SPA2_TEAL_DARK,
                    border: `1.5px solid ${SPA2_TEAL}`,
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

export function Spa2SectionTitle({
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
      <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
        {eyebrow}
      </Typography>
      <Typography variant="h3" sx={{ color: SPA2_INK, fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ maxWidth: 720, color: 'text.secondary' }}>{subtitle}</Typography>
      )}
    </Stack>
  );
}

export function Spa2SoftCard({ children, sx }: { children: React.ReactNode; sx?: any }) {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: 'common.white',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        boxShadow: '0 10px 30px rgba(31,42,40,0.05)',
        height: '100%',
        transition: 'all .25s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px rgba(46,139,122,0.15)',
          borderColor: SPA2_TEAL_LIGHT,
        },
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

export function Spa2Cta() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: SPA2_CREAM }}>
      <Container>
        <Card
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            color: 'common.white',
            background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
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
              href={paths.spa2.booking}
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 999,
                bgcolor: 'common.white',
                color: SPA2_TEAL_DARK,
                '&:hover': { bgcolor: SPA2_CREAM },
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

function Spa2PageShell({ children }: { children: React.ReactNode }) {
  return <Box sx={{ bgcolor: 'background.default' }}>{children}</Box>;
}

// ======================================================================
// 1. ABOUT
// ======================================================================
// export function Spa2AboutPageView() {
//   const values = [
//     {
//       icon: 'solar:leaf-bold-duotone',
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
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.about}
//         eyebrow="Về Nature Spa"
//         title="Hành trình mang thiên nhiên vào từng liệu trình"
//         subtitle="Chúng tôi tin rằng vẻ đẹp đích thực bắt nguồn từ sự cân bằng giữa cơ thể, tâm trí và thiên nhiên."
//       />

//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Spa2SectionTitle eyebrow="Giá trị cốt lõi" title="Bốn trụ cột của chúng tôi" />
//           <Grid container spacing={3}>
//             {values.map((v) => (
//               <Grid key={v.title} xs={12} sm={6} md={3}>
//                 <Spa2SoftCard>
//                   <Iconify icon={v.icon} width={48} sx={{ color: SPA2_TEAL, mb: 2 }} />
//                   <Typography variant="h6" sx={{ mb: 1, color: SPA2_INK }}>
//                     {v.title}
//                   </Typography>
//                   <Typography sx={{ color: 'text.secondary' }}>{v.desc}</Typography>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
//         <Container>
//           <Spa2SectionTitle eyebrow="Cột mốc" title="10 năm vun đắp" />
//           <Grid container spacing={3}>
//             {milestones.map((m) => (
//               <Grid key={m.year} xs={12} sm={6} md={3}>
//                 <Spa2SoftCard sx={{ textAlign: 'center' }}>
//                   <Typography variant="h2" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
//                     {m.year}
//                   </Typography>
//                   <Typography sx={{ color: SPA2_INK, mt: 1 }}>{m.label}</Typography>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }
// ======================================================================
// 1. ABOUT
// ======================================================================
export function Spa2AboutPageView() {
  // Shared with the dashboard manage page (src/pages/dashboard/manage/spa2/about.tsx)
  // via src/_mock/_spa2 — keep this view reading from the same source.
  const story = spa2AboutStory;
  const visionMission = spa2VisionMission;
  const team = spa2Team;
  const certifications = spa2Certifications;

  return (
    <Spa2PageShell>
      {/* Banner */}
      <Spa2PageHero
        image={spa2AboutBanner.image.url}
        imageStyle={spa2AboutBanner.image}
        eyebrow={spa2AboutBanner.eyebrow}
        title={spa2AboutBanner.title}
        subtitle={spa2AboutBanner.subtitle}
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
                  ...spa2ImageBackgroundStyle(spa2AboutStoryImage),
                }}
              />
            </Grid>
            <Grid xs={12} md={7}>
              <Spa2SectionTitle
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
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Định hướng" title="Tầm nhìn & Sứ mệnh" />
          <Grid container spacing={3}>
            {visionMission.map((v) => (
              <Grid key={v.title} xs={12} md={6}>
                <Spa2SoftCard sx={{ textAlign: 'center', py: 5 }}>
                  {v.image?.url && (
                    <Box
                      sx={{
                        height: 160,
                        borderRadius: 3,
                        mb: 3,
                        ...spa2ImageBackgroundStyle(v.image),
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      mx: 'auto',
                      mb: 2.5,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={v.icon} width={36} sx={{ color: 'common.white' }} />
                  </Box>
                  <Typography variant="h5" sx={{ color: SPA2_INK, mb: 1.5 }}>
                    {v.title}
                  </Typography>
                  <Box
                    sx={{
                      color: 'text.secondary',
                      maxWidth: 420,
                      mx: 'auto',
                      '& p': { m: 0 },
                    }}
                    dangerouslySetInnerHTML={{ __html: v.desc }}
                  />
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Đội ngũ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa2SectionTitle
            eyebrow="Con người"
            title="Đội ngũ chuyên gia"
            subtitle="Mỗi liệu trình tại Nature Spa được thực hiện bởi những con người tận tâm và giàu kinh nghiệm."
          />
          <Grid container spacing={3}>
            {team.map((t) => (
              <Grid key={t.name} xs={12} sm={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={t.image}
                    alt={t.name}
                    slotProps={{
                      img: {
                        style: {
                          objectPosition: `${t.imageFocalX ?? 50}% ${t.imageFocalY ?? 50}%`,
                          transform: `scale(${(t.imageZoom ?? 100) / 100})`,
                        },
                      },
                    }}
                    sx={{
                      width: 96,
                      height: 96,
                      mx: 'auto',
                      mb: 2,
                      border: `3px solid ${SPA2_TEAL_LIGHT}`,
                    }}
                  />
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
                    {t.name}
                  </Typography>
                  <Typography
                    sx={{ color: SPA2_TEAL_DARK, fontSize: 14, fontWeight: 600, mb: 1.5 }}
                  >
                    {t.role}
                  </Typography>
                  <Box
                    sx={{ color: 'text.secondary', fontSize: 14, '& p': { m: 0 } }}
                    dangerouslySetInnerHTML={{ __html: t.bio }}
                  />
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Chứng nhận / giải thưởng */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Vinh danh" title="Chứng nhận & giải thưởng" />
          <Grid container spacing={3}>
            {certifications.map((c) => (
              <Grid key={c.name} xs={12} sm={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={c.icon} width={48} sx={{ color: SPA2_TEAL, mb: 2 }} />
                  <Typography variant="subtitle1" sx={{ color: SPA2_INK, mb: 0.5 }}>
                    {c.name}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{c.org}</Typography>
                  <Chip
                    label={c.year}
                    size="small"
                    sx={{ mt: 1.5, bgcolor: SPA2_CREAM_DARK, color: SPA2_TEAL_DARK }}
                  />
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 2. SERVICES
// ======================================================================
// export function Spa2ServicesPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.services}
//         eyebrow="Dịch vụ"
//         title="Bộ sưu tập liệu pháp từ thiên nhiên"
//         subtitle="Mỗi liệu trình là một hành trình cảm nhận – kết hợp tinh hoa thảo mộc Việt và công nghệ hiện đại châu Âu."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={4}>
//             {spa2Services.map((s) => (
//               <Grid key={s.slug} xs={12} sm={6} md={4}>
//                 <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
//                       <Iconify icon={s.icon} sx={{ color: SPA2_TEAL }} width={28} />
//                       <Typography variant="h6" sx={{ color: SPA2_INK }}>
//                         {s.name}
//                       </Typography>
//                     </Stack>
//                     <Typography sx={{ color: 'text.secondary', mb: 2 }}>{s.short}</Typography>
//                     <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                       <Chip
//                         size="small"
//                         label={s.duration}
//                         sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
//                       />
//                       <Chip
//                         size="small"
//                         label={formatVND(s.price)}
//                         sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
//                       />
//                     </Stack>
//                     <Button
//                       component={RouterLink}
//                       href={paths.spa2.serviceDetails(s.slug)}
//                       endIcon={<Iconify icon="solar:arrow-right-linear" />}
//                       sx={{ color: SPA2_TEAL_DARK, p: 0, '&:hover': { bgcolor: 'transparent' } }}
//                     >
//                       Xem chi tiết
//                     </Button>
//                   </Box>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }

export function Spa2ServicesPageView() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let list = spa2Services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
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
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2ServicesBanner.image.url}
        imageStyle={spa2ServicesBanner.image}
        eyebrow={spa2ServicesBanner.eyebrow}
        title={spa2ServicesBanner.title}
        subtitle={spa2ServicesBanner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {/* Bộ lọc */}
          <Spa2SoftCard sx={{ mb: 5 }}>
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
                        <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
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
                  {spa2ServiceCategories.map((c) => (
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
          </Spa2SoftCard>

          {filtered.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 8 }}>
              Không tìm thấy dịch vụ phù hợp.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {paginated.map((s) => (
                <Grid key={s.slug} xs={12} sm={6} md={4}>
                  <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                        <Iconify icon={s.icon} sx={{ color: SPA2_TEAL }} width={28} />
                        <Typography variant="h6" sx={{ color: SPA2_INK }}>
                          {s.name}
                        </Typography>
                      </Stack>
                      <Typography sx={{ color: 'text.secondary', mb: 2 }}>{s.short}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Chip
                          size="small"
                          label={s.duration}
                          sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                        />
                        <Chip
                          size="small"
                          label={formatVND(s.price)}
                          sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
                        />
                      </Stack>
                      <Button
                        component={RouterLink}
                        href={paths.spa2.serviceDetails(s.slug)}
                        endIcon={<Iconify icon="solar:arrow-right-linear" />}
                        sx={{ color: SPA2_TEAL_DARK, p: 0, '&:hover': { bgcolor: 'transparent' } }}
                      >
                        Xem chi tiết
                      </Button>
                    </Box>
                  </Spa2SoftCard>
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
                    bgcolor: `${SPA2_TEAL} !important`,
                    color: 'white',
                  },
                }}
              />
            </Stack>
          )}
        </Container>
      </Box>
      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 3. SERVICE DETAILS
// ======================================================================
// export function Spa2ServiceDetailsPageView() {
//   const { slug } = useParams<{ slug: string }>();
//   const service = spa2Services.find((s) => s.slug === slug) ?? spa2Services[0];

//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={service.image}
//         eyebrow="Dịch vụ"
//         title={service.name}
//         subtitle={service.short}
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={5}>
//             <Grid xs={12} md={8}>
//               <Spa2SectionTitle eyebrow="Mô tả" title="Trải nghiệm của bạn" align="left" />
//               <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
//                 Liệu trình {service.name.toLowerCase()} kéo dài {service.duration}, được thiết kế để
//                 mang lại sự thư giãn sâu cho cơ thể và tinh thần. Mỗi bước được thực hiện bởi kỹ
//                 thuật viên được đào tạo bài bản, sử dụng nguyên liệu hữu cơ chọn lọc.
//               </Typography>
//               <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
//                 Lợi ích chính
//               </Typography>
//               <Grid container spacing={2}>
//                 {service.benefits.map((b) => (
//                   <Grid key={b} xs={12} sm={6}>
//                     <Stack direction="row" spacing={1.5} alignItems="center">
//                       <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
//                       <Typography sx={{ color: SPA2_INK }}>{b}</Typography>
//                     </Stack>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//             <Grid xs={12} md={4}>
//               <Spa2SoftCard sx={{ position: 'sticky', top: 100 }}>
//                 <Typography variant="overline" sx={{ color: SPA2_TEAL }}>
//                   Từ
//                 </Typography>
//                 <Typography variant="h3" sx={{ color: SPA2_INK, mb: 1 }}>
//                   {formatVND(service.price)}
//                 </Typography>
//                 <Typography sx={{ color: 'text.secondary', mb: 3 }}>{service.duration}</Typography>
//                 <Button
//                   fullWidth
//                   component={RouterLink}
//                   href={paths.spa2.booking}
//                   size="large"
//                   sx={{
//                     borderRadius: 999,
//                     py: 1.5,
//                     bgcolor: SPA2_TEAL,
//                     color: 'white',
//                     '&:hover': { bgcolor: SPA2_TEAL_DARK },
//                   }}
//                 >
//                   Đặt lịch ngay
//                 </Button>
//                 <Divider sx={{ my: 3 }} />
//                 <Stack spacing={1.5}>
//                   <Stack direction="row" alignItems="center" spacing={1.5}>
//                     <Iconify icon="solar:phone-bold" sx={{ color: SPA2_TEAL }} />
//                     <Typography>{spa2ContactInfo.hotline}</Typography>
//                   </Stack>
//                   <Stack direction="row" alignItems="center" spacing={1.5}>
//                     <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} />
//                     <Typography>{spa2ContactInfo.workingHours}</Typography>
//                   </Stack>
//                 </Stack>
//               </Spa2SoftCard>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }

export function Spa2ServiceDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const service = spa2Services.find((s) => s.slug === slug) ?? spa2Services[0];

  const stepsToShow = service.steps && service.steps.length > 0 ? service.steps : spa2ServiceSteps;
  const beforeAftersToShow =
    service.beforeAfters && service.beforeAfters.length > 0
      ? service.beforeAfters
      : spa2BeforeAfters;
  const faqsToShow =
    service.faqs && service.faqs.length > 0
      ? service.faqs
      : spa2Faqs.filter((f) => f.published);

  const serviceFeedbacks =
    service.feedbacks && service.feedbacks.length > 0 ? service.feedbacks : [];
  const relatedFeedbacks = spa2Feedbacks.filter((f) =>
    f.service.toLowerCase().includes(service.name.split(' ')[0].toLowerCase())
  );
  const feedbacksToShow =
    serviceFeedbacks.length > 0
      ? serviceFeedbacks
      : relatedFeedbacks.length > 0
        ? relatedFeedbacks
        : spa2Feedbacks.slice(0, 3);

  const feedbackCarousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '24px' },
    },
  });

  return (
    <Spa2PageShell>
      {/* Banner dịch vụ */}
      <Spa2PageHero
        image={service.image}
        eyebrow="Dịch vụ"
        title={service.name}
        subtitle={service.short}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={8}>
              <Spa2SectionTitle eyebrow="Mô tả" title="Trải nghiệm của bạn" align="left" />
              <Box
                dangerouslySetInnerHTML={{ __html: service.description }}
                sx={{ '& p': { lineHeight: 1.8, color: 'text.secondary', mb: 2 } }}
              />
              <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                Lợi ích chính
              </Typography>
              <Grid container spacing={2}>
                {service.benefits.map((b) => (
                  <Grid key={b} xs={12} sm={6}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                      <Typography sx={{ color: SPA2_INK }}>{b}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid xs={12} md={4}>
              <Spa2SoftCard sx={{ position: 'sticky', top: 100 }}>
                <Typography variant="overline" sx={{ color: SPA2_TEAL }}>
                  Từ
                </Typography>
                <Typography variant="h3" sx={{ color: SPA2_INK, mb: 1 }}>
                  {formatVND(service.price)}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 3 }}>{service.duration}</Typography>
                <Button
                  fullWidth
                  component={RouterLink}
                  href={paths.spa2.booking}
                  size="large"
                  sx={{
                    borderRadius: 999,
                    py: 1.5,
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  Đặt lịch ngay
                </Button>
                <Divider sx={{ my: 3 }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:phone-bold" sx={{ color: SPA2_TEAL }} />
                    <Typography>{spa2ContactInfo.hotline}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} />
                    <Typography>{spa2ContactInfo.workingHours}</Typography>
                  </Stack>
                </Stack>
              </Spa2SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quy trình - step timeline */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="md">
          <Spa2SectionTitle eyebrow="Quy trình" title={`${stepsToShow.length} bước trải nghiệm`} />
          <Stack spacing={0}>
            {stepsToShow.map((step, idx) => (
              <Stack key={step.id || step.title} direction="row" spacing={3}>
                <Stack alignItems="center" sx={{ minWidth: 56 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
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
                  {idx < stepsToShow.length - 1 && (
                    <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }} />
                  )}
                </Stack>
                <Box sx={{ pb: 4 }}>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
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
          <Spa2SectionTitle eyebrow="Kết quả" title="Hình ảnh trước & sau" />
          <Grid container spacing={3}>
            {beforeAftersToShow.slice(0, 2).map((ba) => (
              <Grid key={ba.id || ba.title} xs={12} sm={6}>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ p: 2.5 }}>
                    <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{ba.title}</Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                      {ba.note}
                    </Typography>
                  </Box>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Feedback liên quan */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Đánh giá" title="Khách hàng nói gì" />
          <Carousel carousel={feedbackCarousel}>
            {feedbacksToShow.map((f) => (
              <Box key={f.name} sx={{ px: 1 }}>
                <Spa2SoftCard>
                  <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>
                    &ldquo;{f.comment}&rdquo;
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={f.avatar} />
                    <Stack>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {f.service}
                      </Typography>
                    </Stack>
                  </Stack>
                </Spa2SoftCard>
              </Box>
            ))}
          </Carousel>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
            <CarouselDotButtons
              variant="rounded"
              scrollSnaps={feedbackCarousel.dots.scrollSnaps}
              selectedIndex={feedbackCarousel.dots.selectedIndex}
              onClickDot={feedbackCarousel.dots.onClickDot}
            />
            <CarouselArrowBasicButtons
              {...feedbackCarousel.arrows}
              options={feedbackCarousel.options}
            />
          </Stack>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Spa2SectionTitle eyebrow="FAQ" title="Câu hỏi thường gặp" />
          {faqsToShow.slice(0, 4).map((f, idx) => (
            <Accordion
              key={f.id || f.q}
              defaultExpanded={idx === 0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { borderColor: SPA2_TEAL_LIGHT },
              }}
            >
              <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 4. TRAINING
// ======================================================================
// export function Spa2TrainingPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.training}
//         eyebrow="Đào tạo"
//         title="Học viện Nature Spa Academy"
//         subtitle="Khóa học chuyên sâu cho kỹ thuật viên, chuyên gia chăm sóc da và quản lý spa."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Spa2SectionTitle eyebrow="Chương trình" title="Lộ trình từ căn bản đến nâng cao" />
//           <Grid container spacing={3}>
//             {spa2TrainingPrograms.map((p) => (
//               <Grid key={p.name} xs={12} md={4}>
//                 <Spa2SoftCard>
//                   <Chip
//                     label={p.level}
//                     size="small"
//                     sx={{ bgcolor: SPA2_CREAM_DARK, color: SPA2_TEAL_DARK, mb: 2 }}
//                   />
//                   <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
//                     {p.name}
//                   </Typography>
//                   <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                     <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} />
//                     <Typography sx={{ color: 'text.secondary' }}>{p.duration}</Typography>
//                   </Stack>
//                   <Typography sx={{ color: 'text.secondary', mb: 2 }}>{p.outcome}</Typography>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="h5" sx={{ color: SPA2_TEAL, mb: 2 }}>
//                     {formatVND(p.price)}
//                   </Typography>
//                   <Button
//                     fullWidth
//                     component={RouterLink}
//                     href={paths.spa2.contact}
//                     sx={{
//                       borderRadius: 999,
//                       bgcolor: SPA2_TEAL,
//                       color: 'white',
//                       '&:hover': { bgcolor: SPA2_TEAL_DARK },
//                     }}
//                   >
//                     Đăng ký tư vấn
//                   </Button>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }
export function Spa2TrainingPageView() {
  return (
    <Spa2PageShell>
      {/* Banner khóa học + Tiêu đề nổi bật + CTA */}
      <Spa2PageHero
        image={spa2TrainingBanner.image.url}
        imageStyle={spa2TrainingBanner.image}
        eyebrow={spa2TrainingBanner.eyebrow}
        title={spa2TrainingBanner.title}
        subtitle={spa2TrainingBanner.subtitle}
      />
      <Box sx={{ pb: { xs: 4, md: 6 } }}>
        <Container sx={{ textAlign: 'center' }}>
          <Button
            component={RouterLink}
            href={paths.spa2.contact}
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 999,
              bgcolor: SPA2_TEAL,
              color: 'white',
              '&:hover': { bgcolor: SPA2_TEAL_DARK },
            }}
          >
            Đăng ký tư vấn
          </Button>
        </Container>
      </Box>

      {/* Giới thiệu học viện: sứ mệnh + video */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Grid container spacing={5} alignItems="center">
            <Grid xs={12} md={6}>
              <Spa2SectionTitle
                eyebrow="Sứ mệnh"
                title="Vì sao chọn Nature Spa Academy"
                align="left"
              />
              <Stack spacing={2.5}>
                {spa2TrainingMission.map((m, idx) => (
                  <Box
                    key={idx}
                    sx={{ color: 'text.secondary', lineHeight: 1.9, '& p': { m: 0 } }}
                    dangerouslySetInnerHTML={{ __html: m }}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid xs={12} md={6}>
              <Spa2SoftCard sx={{ p: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      height: 280,
                      ...spa2ImageBackgroundStyle(spa2TrainingMissionImage),
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
                      <Iconify icon="solar:play-bold" width={32} sx={{ color: SPA2_TEAL }} />
                    </Box>
                  </Box>
                </Box>
              </Spa2SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Danh sách khóa học (giữ nguyên) */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Chương trình" title="Lộ trình từ căn bản đến nâng cao" />
          <Grid container spacing={3}>
            {spa2TrainingPrograms.map((p) => (
              <Grid key={p.name} xs={12} md={4}>
                <Spa2SoftCard>
                  <Chip
                    label={p.level}
                    size="small"
                    sx={{ bgcolor: SPA2_CREAM_DARK, color: SPA2_TEAL_DARK, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
                    {p.name}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Iconify icon="solar:clock-circle-bold" sx={{ color: SPA2_TEAL }} />
                    <Typography sx={{ color: 'text.secondary' }}>{p.duration}</Typography>
                  </Stack>
                  <Box
                    sx={{ color: 'text.secondary', mb: 2, '& p': { m: 0 } }}
                    dangerouslySetInnerHTML={{ __html: p.outcome }}
                  />
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h5" sx={{ color: SPA2_TEAL, mb: 2 }}>
                    {formatVND(p.price)}
                  </Typography>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={paths.spa2.contact}
                    sx={{
                      borderRadius: 999,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    Đăng ký tư vấn
                  </Button>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Lộ trình học */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="md">
          <Spa2SectionTitle eyebrow="Lộ trình" title="Hành trình học tập 10 tuần" />
          <Stack spacing={0}>
            {spa2TrainingRoadmap.map((r, idx) => (
              <Stack key={r.stage} direction="row" spacing={3}>
                <Stack alignItems="center" sx={{ minWidth: 56 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
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
                  {idx < spa2TrainingRoadmap.length - 1 && (
                    <Box sx={{ width: 2, flexGrow: 1, bgcolor: SPA2_TEAL_LIGHT, my: 0.5 }} />
                  )}
                </Stack>
                <Box sx={{ pb: 4 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="h6" sx={{ color: SPA2_INK }}>
                      {r.stage}
                    </Typography>
                    <Chip
                      size="small"
                      label={r.duration}
                      sx={{ bgcolor: 'common.white', color: SPA2_TEAL_DARK }}
                    />
                  </Stack>
                  <Box
                    sx={{ color: 'text.secondary', '& p': { m: 0 } }}
                    dangerouslySetInnerHTML={{ __html: r.desc }}
                  />
                </Box>
              </Stack>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Giảng viên */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Đội ngũ" title="Giảng viên" />
          <Grid container spacing={3}>
            {spa2Instructors.map((i) => (
              <Grid key={i.name} xs={12} sm={6} md={4}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={i.image}
                    alt={i.name}
                    slotProps={{
                      img: {
                        style: {
                          objectPosition: `${i.imageFocalX ?? 50}% ${i.imageFocalY ?? 50}%`,
                          transform: `scale(${(i.imageZoom ?? 100) / 100})`,
                        },
                      },
                    }}
                    sx={{
                      width: 96,
                      height: 96,
                      mx: 'auto',
                      mb: 2,
                      border: `3px solid ${SPA2_TEAL_LIGHT}`,
                    }}
                  />
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
                    {i.name}
                  </Typography>
                  <Box
                    sx={{ color: 'text.secondary', fontSize: 14, mb: 1.5, '& p': { m: 0 } }}
                    dangerouslySetInnerHTML={{ __html: i.experience }}
                  />
                  <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                    {i.certs.map((c) => (
                      <Chip
                        key={c}
                        size="small"
                        label={c}
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                      />
                    ))}
                  </Stack>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Thành tựu học viên */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Thành tựu" title="Học viên nói gì" />
          <Grid container spacing={3}>
            {spa2GraduateShowcase.map((g) => (
              <Grid key={g.name} xs={12} sm={6}>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: 220,
                      backgroundImage: `url(${g.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ p: 3 }}>
                    <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, mb: 1 }}>
                      {g.name}
                    </Typography>
                    <Box
                      sx={{ color: SPA2_INK, fontStyle: 'italic', mb: 1.5, '& p': { m: 0 } }}
                      dangerouslySetInnerHTML={{ __html: g.review }}
                    />
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      — {g.student}
                    </Typography>
                  </Box>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 5. BLOG LIST
// ======================================================================
// export function Spa2BlogPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.blog}
//         eyebrow="Blog"
//         title="Cẩm nang chăm sóc bản thân"
//         subtitle="Chia sẻ kiến thức về dưỡng da, dinh dưỡng, yoga và lối sống lành mạnh."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={4}>
//             {spa2BlogPosts.map((p) => (
//               <Grid key={p.slug} xs={12} sm={6} md={3}>
//                 <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
//                       sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
//                     />
//                     <Typography
//                       variant="h6"
//                       sx={{ color: SPA2_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
//                     >
//                       <Link
//                         component={RouterLink}
//                         href={paths.spa2.blogDetails(p.slug)}
//                         sx={{
//                           color: 'inherit',
//                           textDecoration: 'none',
//                           '&:hover': { color: SPA2_TEAL },
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
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }

// them moi
export function Spa2BlogPageView() {
  const [highlight, ...rest] = spa2BlogPosts;
  const trending = [...spa2BlogPosts].slice(0, 3);
  const categories = computeSpa2BlogCategories(spa2BlogPosts);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filteredRest = useMemo(
    () => rest.filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase())),
    [rest, search]
  );

  const pageCount = Math.max(1, Math.ceil(filteredRest.length / perPage));
  const paginatedRest = filteredRest.slice((page - 1) * perPage, page * perPage);

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2BlogBanner.image.url}
        imageStyle={spa2BlogBanner.image}
        eyebrow={spa2BlogBanner.eyebrow}
        title={spa2BlogBanner.title}
        subtitle={spa2BlogBanner.subtitle}
      />

      {/* Highlight article */}
      {highlight && (
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container>
            <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                      sx={{ bgcolor: SPA2_TEAL, color: 'white', mb: 2 }}
                    />
                    <Typography variant="h4" sx={{ color: SPA2_INK, mb: 1.5 }}>
                      {highlight.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                      {highlight.excerpt}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: SPA2_TEAL, fontSize: 13 }}>
                        {highlight.author[0]}
                      </Avatar>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {highlight.author} · {highlight.date} · {highlight.readTime}
                      </Typography>
                    </Stack>
                    <Button
                      component={RouterLink}
                      href={paths.spa2.blogDetails(highlight.slug)}
                      endIcon={<Iconify icon="solar:arrow-right-linear" />}
                      sx={{
                        borderRadius: 999,
                        px: 3,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      Đọc bài viết
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Spa2SoftCard>
          </Container>
        </Box>
      )}

      <Box sx={{ pb: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Tìm kiếm bài viết..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                    </InputAdornment>
                  ),
                }}
              />

              {filteredRest.length === 0 ? (
                <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 8 }}>
                  Không tìm thấy bài viết phù hợp.
                </Typography>
              ) : (
                <Grid container spacing={4}>
                  {paginatedRest.map((p) => (
                    <Grid key={p.slug} xs={12} sm={6}>
                      <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                            sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                          />
                          <Typography
                            variant="h6"
                            sx={{ color: SPA2_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
                          >
                            <Link
                              component={RouterLink}
                              href={paths.spa2.blogDetails(p.slug)}
                              sx={{
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': { color: SPA2_TEAL },
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
                      </Spa2SoftCard>
                    </Grid>
                  ))}
                </Grid>
              )}

              {pageCount > 1 && (
                <Stack alignItems="center" sx={{ mt: 6 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(_, v) => setPage(v)}
                    shape="rounded"
                    sx={{
                      '& .Mui-selected': {
                        bgcolor: `${SPA2_TEAL} !important`,
                        color: 'white',
                      },
                    }}
                  />
                </Stack>
              )}
            </Grid>

            {/* Sidebar */}
            <Grid xs={12} md={4}>
              <Stack spacing={3}>
                <Spa2SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    Danh mục
                  </Typography>
                  <Stack spacing={1.5}>
                    {categories.map((c) => (
                      <Stack
                        key={c.name}
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          py: 1,
                          borderBottom: `1px solid ${SPA2_CREAM_DARK}`,
                          cursor: 'pointer',
                          '&:hover': { color: SPA2_TEAL },
                        }}
                      >
                        <Typography sx={{ color: SPA2_INK }}>{c.name}</Typography>
                        <Chip
                          size="small"
                          label={c.count}
                          sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Spa2SoftCard>

                <Spa2SoftCard>
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                    Bài viết xu hướng
                  </Typography>
                  <Stack spacing={2}>
                    {trending.map((p, idx) => (
                      <Stack key={p.slug} direction="row" spacing={1.5} alignItems="center">
                        <Typography
                          variant="h5"
                          sx={{ color: SPA2_TEAL_LIGHT, fontWeight: 700, minWidth: 28 }}
                        >
                          {idx + 1}
                        </Typography>
                        <Link
                          component={RouterLink}
                          href={paths.spa2.blogDetails(p.slug)}
                          sx={{
                            color: SPA2_INK,
                            textDecoration: 'none',
                            fontSize: 14,
                            fontWeight: 600,
                            '&:hover': { color: SPA2_TEAL },
                          }}
                        >
                          {p.title}
                        </Link>
                      </Stack>
                    ))}
                  </Stack>
                </Spa2SoftCard>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Spa2PageShell>
  );
}

// ======================================================================
// 6. BLOG DETAILS
// ======================================================================
// export function Spa2BlogDetailsPageView() {
//   const { slug } = useParams<{ slug: string }>();
//   const post = spa2BlogPosts.find((p) => p.slug === slug) ?? spa2BlogPosts[0];

//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={post.cover}
//         eyebrow={post.category}
//         title={post.title}
//         subtitle={post.excerpt}
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
//             <Avatar sx={{ bgcolor: SPA2_TEAL }}>{post.author[0]}</Avatar>
//             <Stack>
//               <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{post.author}</Typography>
//               <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
//                 {post.date} · {post.readTime}
//               </Typography>
//             </Stack>
//           </Stack>
//           <Typography sx={{ color: SPA2_INK, lineHeight: 1.9, mb: 3 }}>
//             Chăm sóc bản thân là một hành trình dài hơi, không phải đích đến. Mỗi ngày dành ra 15–30
//             phút cho cơ thể và tâm trí có thể tạo ra sự khác biệt lớn theo thời gian.
//           </Typography>
//           <Typography variant="h5" sx={{ color: SPA2_TEAL_DARK, mb: 2 }}>
//             1. Bắt đầu từ những điều nhỏ nhất
//           </Typography>
//           <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
//             Một ly nước ấm vào buổi sáng, vài phút hít thở sâu, hoặc một bài kéo giãn nhẹ — đây là
//             những bước khởi đầu đơn giản nhưng mang lại hiệu quả bền vững.
//           </Typography>
//           <Typography variant="h5" sx={{ color: SPA2_TEAL_DARK, mb: 2 }}>
//             2. Lắng nghe cơ thể
//           </Typography>
//           <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
//             Cơ thể là người bạn trung thực nhất. Khi mệt mỏi, hãy nghỉ ngơi. Khi căng thẳng, hãy cho
//             phép bản thân được chăm sóc.
//           </Typography>
//           <Box sx={{ p: 3, borderLeft: `4px solid ${SPA2_TEAL}`, bgcolor: SPA2_CREAM, my: 4 }}>
//             <Typography sx={{ color: SPA2_INK, fontStyle: 'italic' }}>
//               "Vẻ đẹp thực sự đến từ sự cân bằng giữa cơ thể, tâm trí và thiên nhiên."
//             </Typography>
//           </Box>
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }

// them moi
export function Spa2BlogDetailsPageView() {
  const { slug } = useParams<{ slug: string }>();
  const post = spa2BlogPosts.find((p) => p.slug === slug) ?? spa2BlogPosts[0];
  const related = spa2BlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedService =
    spa2Services.find((s) => post.category.toLowerCase().includes(s.category)) ?? spa2Services[0];

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={post.cover}
        imageStyle={{
          focalX: post.coverFocalX ?? 50,
          focalY: post.coverFocalY ?? 50,
          zoom: post.coverZoom ?? 100,
        }}
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Avatar sx={{ bgcolor: SPA2_TEAL }}>{post.author[0]}</Avatar>
            <Stack>
              <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{post.author}</Typography>
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

          {/* Nội dung bài viết — cùng dữ liệu với trang quản lý */}
          <Box
            sx={{
              color: SPA2_INK,
              '& p': { lineHeight: 1.9, color: 'text.secondary', mb: 2.5 },
              '& h3': { color: SPA2_TEAL_DARK, mt: 1, mb: 1.5 },
              '& blockquote': {
                m: 0,
                mb: 2.5,
                p: 2.5,
                borderLeft: `4px solid ${SPA2_TEAL}`,
                bgcolor: SPA2_CREAM,
                fontStyle: 'italic',
              },
              '& ul, & ol': { pl: 3, mb: 2.5, color: 'text.secondary' },
              '& a': { color: SPA2_TEAL },
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags.length > 0 && (
            <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mb: 4 }}>
              {post.tags.map((t) => (
                <Chip
                  key={t}
                  label={`#${t}`}
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: SPA2_TEAL, color: SPA2_TEAL_DARK }}
                />
              ))}
            </Stack>
          )}

          {/* CTA dịch vụ liên quan */}
          <Spa2SoftCard
            sx={{
              mt: 5,
              background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
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
                href={paths.spa2.serviceDetails(relatedService.slug)}
                sx={{
                  borderRadius: 999,
                  px: 3,
                  bgcolor: 'common.white',
                  color: SPA2_TEAL_DARK,
                  whiteSpace: 'nowrap',
                  '&:hover': { bgcolor: SPA2_CREAM },
                }}
              >
                Xem dịch vụ
              </Button>
            </Stack>
          </Spa2SoftCard>
        </Container>
      </Box>

      {/* Related posts */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Đọc thêm" title="Bài viết liên quan" />
          <Grid container spacing={4}>
            {related.map((p) => (
              <Grid key={p.slug} xs={12} sm={6} md={4}>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                      sx={{ mb: 1.5, bgcolor: 'common.white', color: SPA2_TEAL_DARK }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: SPA2_INK, mb: 1, fontSize: 16, lineHeight: 1.4 }}
                    >
                      <Link
                        component={RouterLink}
                        href={paths.spa2.blogDetails(p.slug)}
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                          '&:hover': { color: SPA2_TEAL },
                        }}
                      >
                        {p.title}
                      </Link>
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                      {p.date} · {p.readTime}
                    </Typography>
                  </Box>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 7. CAREERS
// ======================================================================
// export function Spa2CareersPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.careers}
//         eyebrow="Tuyển dụng"
//         title="Cùng chúng tôi vun đắp hành trình xanh"
//         subtitle="Nature Spa luôn tìm kiếm những người yêu thiên nhiên và đam mê chăm sóc con người."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Spa2SectionTitle eyebrow="Vị trí đang tuyển" title="Cơ hội nghề nghiệp" />
//           <Stack spacing={2}>
//             {spa2Careers.map((c) => (
//               <Spa2SoftCard key={c.title}>
//                 <Stack
//                   direction={{ xs: 'column', md: 'row' }}
//                   spacing={2}
//                   alignItems={{ xs: 'flex-start', md: 'center' }}
//                   justifyContent="space-between"
//                 >
//                   <Stack spacing={1}>
//                     <Typography variant="h6" sx={{ color: SPA2_INK }}>
//                       {c.title}
//                     </Typography>
//                     <Stack direction="row" spacing={2} flexWrap="wrap">
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Iconify icon="solar:map-point-bold" sx={{ color: SPA2_TEAL }} width={16} />
//                         <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
//                           {c.location}
//                         </Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Iconify icon="solar:case-bold" sx={{ color: SPA2_TEAL }} width={16} />
//                         <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
//                           {c.type}
//                         </Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={0.5} alignItems="center">
//                         <Iconify
//                           icon="solar:wallet-money-bold"
//                           sx={{ color: SPA2_TEAL }}
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
//                           sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
//                         />
//                       ))}
//                     </Stack>
//                   </Stack>
//                   <Button
//                     component={RouterLink}
//                     href={paths.spa2.contact}
//                     sx={{
//                       borderRadius: 999,
//                       px: 3,
//                       bgcolor: SPA2_TEAL,
//                       color: 'white',
//                       '&:hover': { bgcolor: SPA2_TEAL_DARK },
//                     }}
//                   >
//                     Ứng tuyển
//                   </Button>
//                 </Stack>
//               </Spa2SoftCard>
//             ))}
//           </Stack>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }
export function Spa2CareersPageView() {
  const { t } = useTranslate('spa2');
  const [openVideoUrl, setOpenVideoUrl] = useState('');

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2CareersBanner.image.url}
        imageStyle={spa2CareersBanner.image}
        eyebrow={spa2CareersBanner.eyebrow}
        title={spa2CareersBanner.title}
        subtitle={spa2CareersBanner.subtitle}
      />

      {/* Lý do gia nhập */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa2SectionTitle
            eyebrow={t('careers.reasonsEyebrow')}
            title={t('careers.reasonsTitle')}
          />
          <Grid container spacing={3}>
            {spa2JoinReasons.map((r) => (
              <Grid key={r.text} xs={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={r.icon} width={40} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                  <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{r.text}</Typography>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Danh sách vị trí */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle
            eyebrow={t('careers.positionsEyebrow')}
            title={t('careers.positionsTitle')}
          />
          <Stack spacing={2}>
            {spa2Careers.map((c) => (
              <Spa2SoftCard key={c.title}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  justifyContent="space-between"
                >
                  <Stack spacing={1}>
                    <Typography variant="h6" sx={{ color: SPA2_INK }}>
                      {c.title}
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify icon="solar:map-point-bold" sx={{ color: SPA2_TEAL }} width={16} />
                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                          {c.location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify icon="solar:case-bold" sx={{ color: SPA2_TEAL }} width={16} />
                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                          {c.type}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify
                          icon="solar:wallet-money-bold"
                          sx={{ color: SPA2_TEAL }}
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
                          sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                  <Button
                    component={RouterLink}
                    href={paths.spa2.careerDetails(c.id)}
                    sx={{
                      borderRadius: 999,
                      px: 3,
                      bgcolor: SPA2_TEAL,
                      color: 'white',
                      '&:hover': { bgcolor: SPA2_TEAL_DARK },
                    }}
                  >
                    {t('careers.viewDetails')}
                  </Button>
                </Stack>
              </Spa2SoftCard>
            ))}
            {spa2Careers.length === 0 && (
              <Typography sx={{ color: 'text.disabled', textAlign: 'center', py: 4 }}>
                {t('careers.noResults')}
              </Typography>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Văn hóa doanh nghiệp preview */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa2SectionTitle
            eyebrow={t('careers.cultureEyebrow')}
            title={t('careers.cultureTitle')}
          />
          <Grid container spacing={2}>
            {spa2WorkplaceGallery.map((img, idx) => (
              <Grid key={idx} xs={6} md={3}>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    borderRadius: 3,
                    backgroundImage: `url(${img.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </Grid>
            ))}
            {spa2WorkplaceVideos.map((video, idx) => {
              const hasVideo = !!video.videoUrl;
              return (
                <Grid key={`video-${idx}`} xs={6} md={3}>
                  <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                    <Box
                      sx={{ position: 'relative', cursor: hasVideo ? 'pointer' : 'default' }}
                      onClick={() => hasVideo && setOpenVideoUrl(video.videoUrl)}
                    >
                      <Box
                        sx={{
                          aspectRatio: '4/3',
                          ...spa2ImageBackgroundStyle(video.thumbnail),
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
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255,255,255,0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify icon="solar:play-bold" width={24} sx={{ color: SPA2_TEAL }} />
                        </Box>
                      </Box>
                    </Box>
                  </Spa2SoftCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Video môi trường làm việc - HTML5 player, only reachable when a video's
          videoUrl is non-empty; empty ones stay decorative/non-clickable above,
          mirroring the graceful-fallback convention used on the career details
          page's singular internal video. */}
      <Dialog open={!!openVideoUrl} onClose={() => setOpenVideoUrl('')} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, bgcolor: 'common.black', lineHeight: 0 }}>
          {openVideoUrl && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <Box
              component="video"
              controls
              autoPlay
              src={openVideoUrl}
              sx={{ width: '100%', display: 'block', maxHeight: '80vh' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Spa2PageShell>
  );
}

// ======================================================================
// CAREER DETAILS (mới)
// ======================================================================
export function Spa2CareerDetailsPageView() {
  const { t } = useTranslate('spa2');
  const { id } = useParams<{ id: string }>();
  const job = spa2Careers.find((c) => c.id === Number(id)) ?? spa2Careers[0];
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const hasInternalVideo = !!spa2InternalVideoUrl;

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={(job.image ?? spa2CareersBanner.image).url}
        imageStyle={job.image ?? spa2CareersBanner.image}
        eyebrow={spa2CareersBanner.eyebrow}
        title={job.title}
        subtitle={`${job.location} · ${job.type} · ${job.salary}`}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={7}>
              <Spa2SectionTitle
                eyebrow={t('careers.detailDescEyebrow')}
                title={t('careers.detailDescTitle')}
                align="left"
              />
              <Box
                sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8, '& p': { m: 0, mb: 1.5 } }}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
              <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                {t('careers.detailBenefitsTitle')}
              </Typography>
              <Stack spacing={1} sx={{ mb: 4 }}>
                {job.benefits.map((b) => (
                  <Stack key={b} direction="row" spacing={1.5} alignItems="center">
                    <Iconify icon="solar:check-circle-bold" sx={{ color: SPA2_TEAL }} />
                    <Typography sx={{ color: SPA2_INK }}>{b}</Typography>
                  </Stack>
                ))}
              </Stack>

              {/* Quy trình tuyển dụng */}
              <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                {t('careers.detailProcessTitle')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {spa2RecruitmentProcess.map((p, idx) => (
                  <Stack key={p.step} direction="row" alignItems="center" spacing={1} flex={1}>
                    <Stack alignItems="center" spacing={1} sx={{ flex: 1, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK }}>
                        {p.step}
                      </Typography>
                    </Stack>
                    {idx < spa2RecruitmentProcess.length - 1 && (
                      <Iconify
                        icon="solar:arrow-right-linear"
                        sx={{ color: SPA2_TEAL_LIGHT, display: { xs: 'none', sm: 'block' } }}
                      />
                    )}
                  </Stack>
                ))}
              </Stack>
            </Grid>

            {/* Form ứng tuyển */}
            <Grid xs={12} md={5}>
              <Spa2SoftCard sx={{ position: 'sticky', top: 100 }}>
                {appSubmitted ? (
                  <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
                    <Iconify icon="solar:check-circle-bold" width={48} sx={{ color: SPA2_TEAL }} />
                    <Typography variant="h6" sx={{ color: SPA2_INK }}>
                      {t('careers.submittedTitle')}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
                      {t('careers.submittedDesc')}
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                      {t('careers.applyTitle')}
                    </Typography>
                    <Stack spacing={2}>
                      <TextField fullWidth label={t('careers.formName')} />
                      <TextField fullWidth label={t('careers.formPhone')} />
                      <TextField fullWidth label={t('careers.formEmail')} />
                      <TextField fullWidth multiline rows={3} label={t('careers.formIntro')} />
                      <Button
                        fullWidth
                        component="label"
                        sx={{
                          borderRadius: 2,
                          border: `1.5px dashed ${SPA2_TEAL}`,
                          color: SPA2_TEAL_DARK,
                          py: 1.5,
                        }}
                      >
                        {t('careers.formUploadCv')}
                        <input type="file" hidden />
                      </Button>
                      <Button
                        fullWidth
                        size="large"
                        onClick={() => setAppSubmitted(true)}
                        sx={{
                          borderRadius: 999,
                          py: 1.5,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        {t('careers.formSubmit')}
                      </Button>
                    </Stack>
                  </>
                )}
              </Spa2SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Văn hóa doanh nghiệp: Gallery + Video nội bộ */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle
            eyebrow={t('careers.cultureDetailEyebrow')}
            title={t('careers.cultureDetailTitle')}
          />
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {spa2WorkplaceGallery.map((img, idx) => (
              <Grid key={idx} xs={6} md={3}>
                <Box
                  sx={{
                    aspectRatio: '4/3',
                    borderRadius: 3,
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Spa2SoftCard sx={{ p: 0, overflow: 'hidden', maxWidth: 700, mx: 'auto' }}>
            <Box
              sx={{ position: 'relative', cursor: hasInternalVideo ? 'pointer' : 'default' }}
              onClick={() => hasInternalVideo && setVideoOpen(true)}
            >
              <Box
                sx={{
                  height: 320,
                  backgroundImage: `url(${spa2InternalVideoThumb.url})`,
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
                  <Iconify icon="solar:play-bold" width={32} sx={{ color: SPA2_TEAL }} />
                </Box>
              </Box>
            </Box>
            <Typography sx={{ p: 2, color: SPA2_INK, fontWeight: 600, textAlign: 'center' }}>
              {t('careers.videoCaption')}
            </Typography>
          </Spa2SoftCard>
        </Container>
      </Box>

      {/* Video nội bộ - HTML5 player, only reachable when an admin has actually
          uploaded a video (spa2InternalVideoUrl non-empty); otherwise the thumbnail
          above stays purely decorative. */}
      <Dialog open={videoOpen} onClose={() => setVideoOpen(false)} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0, bgcolor: 'common.black', lineHeight: 0 }}>
          {hasInternalVideo && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <Box
              component="video"
              controls
              autoPlay
              src={spa2InternalVideoUrl}
              sx={{ width: '100%', display: 'block', maxHeight: '80vh' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Spa2PageShell>
  );
}

// ======================================================================
// 8. BOOKING
// ======================================================================
// export function Spa2BookingPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.booking}
//         eyebrow="Đặt lịch"
//         title="Đặt lịch online trong 1 phút"
//         subtitle="Chọn dịch vụ, chi nhánh và thời gian phù hợp – chúng tôi sẽ xác nhận trong vòng 15 phút."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           <Spa2SoftCard>
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
//                   {spa2Branches.map((b) => (
//                     <MenuItem key={b.name} value={b.name}>
//                       {b.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid xs={12} sm={6}>
//                 <TextField fullWidth select label="Dịch vụ">
//                   {spa2Services.map((s) => (
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
//                     <Checkbox sx={{ color: SPA2_TEAL, '&.Mui-checked': { color: SPA2_TEAL } }} />
//                   }
//                   label="Tôi đồng ý với chính sách bảo mật của Nature Spa"
//                 />
//               </Grid>
//               <Grid xs={12}>
//                 <Button
//                   fullWidth
//                   size="large"
//                   sx={{
//                     borderRadius: 999,
//                     py: 1.5,
//                     bgcolor: SPA2_TEAL,
//                     color: 'white',
//                     '&:hover': { bgcolor: SPA2_TEAL_DARK },
//                   }}
//                 >
//                   Xác nhận đặt lịch
//                 </Button>
//               </Grid>
//             </Grid>
//           </Spa2SoftCard>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }
function Spa2BookingConfirm({
  pkg,
  onBack,
}: {
  pkg: (typeof spa2BookingPackages)[number];
  onBack: () => void;
}) {
  const { t } = useTranslate('spa2');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Spa2SoftCard sx={{ maxWidth: 560, mx: 'auto', textAlign: 'center' }}>
        <Iconify icon="solar:check-circle-bold" width={56} sx={{ color: SPA2_TEAL, mb: 2 }} />
        <Typography variant="h5" sx={{ color: SPA2_INK, mb: 1 }}>
          {t('booking.successTitle')}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>{t('booking.successDesc')}</Typography>
        <Button onClick={onBack} sx={{ color: SPA2_TEAL_DARK }}>
          {t('booking.backToPackages')}
        </Button>
      </Spa2SoftCard>
    );
  }

  return (
    <Spa2SoftCard sx={{ maxWidth: 560, mx: 'auto' }}>
      <Stack alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: SPA2_CREAM,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Iconify icon="solar:calendar-bold" width={32} sx={{ color: SPA2_TEAL }} />
        </Box>
        <Typography variant="h5" sx={{ color: SPA2_INK }}>
          {t('booking.confirmTitle')}
        </Typography>
      </Stack>

      <Stack spacing={1.5} sx={{ mb: 3, p: 2.5, borderRadius: 2, bgcolor: SPA2_CREAM }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>
            {t('booking.confirmPackageLabel')}
          </Typography>
          <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{pkg.name}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>
            {t('booking.confirmSessionsLabel')}
          </Typography>
          <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{pkg.sessions}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ color: 'text.secondary' }}>{t('booking.confirmTotalLabel')}</Typography>
          <Typography sx={{ color: SPA2_TEAL, fontWeight: 700 }}>{formatVND(pkg.price)}</Typography>
        </Stack>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label={t('booking.formName')} />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField fullWidth label={t('booking.formPhone')} />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label={t('booking.formDate')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            fullWidth
            type="time"
            label={t('booking.formTime')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid xs={12}>
          <TextField fullWidth multiline rows={2} label={t('booking.formNote')} />
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2}>
        <Button onClick={onBack} sx={{ color: 'text.secondary' }}>
          {t('booking.backBtn')}
        </Button>
        <Button
          fullWidth
          size="large"
          onClick={() => setSubmitted(true)}
          sx={{
            borderRadius: 999,
            py: 1.5,
            bgcolor: SPA2_TEAL,
            color: 'white',
            '&:hover': { bgcolor: SPA2_TEAL_DARK },
          }}
        >
          {t('booking.confirmBtn')}
        </Button>
      </Stack>
    </Spa2SoftCard>
  );
}

export function Spa2BookingPageView() {
  const { t } = useTranslate('spa2');
  const [tab, setTab] = useState(spa2Services[0].category ?? 'massage');
  const [selectedPkg, setSelectedPkg] = useState<(typeof spa2BookingPackages)[number] | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(spa2Services.map((s: any) => s.category))),
    []
  );
  const filteredServices = spa2Services.filter((s: any) => s.category === tab);

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2BookingBanner.image.url}
        imageStyle={spa2BookingBanner.image}
        eyebrow={spa2BookingBanner.eyebrow}
        title={spa2BookingBanner.title}
        subtitle={spa2BookingBanner.subtitle}
      />

      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          {selectedPkg ? (
            <Spa2BookingConfirm pkg={selectedPkg} onBack={() => setSelectedPkg(null)} />
          ) : (
            <>
              {/* Tabs theo dịch vụ */}
              <Spa2SectionTitle
                eyebrow={t('booking.servicesEyebrow')}
                title={t('booking.servicesTitle')}
              />
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  mb: 5,
                  '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
                  '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
                }}
              >
                {categories.map((c) => (
                  <Tab key={c} value={c} label={c} sx={{ textTransform: 'capitalize' }} />
                ))}
              </Tabs>

              <Grid container spacing={3} sx={{ mb: 8 }}>
                {filteredServices.map((s) => (
                  <Grid key={s.slug} xs={12} sm={6} md={4}>
                    <Spa2SoftCard sx={{ textAlign: 'center' }}>
                      <Iconify icon={s.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                      <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 0.5 }}>
                        {s.name}
                      </Typography>
                      <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, mb: 1 }}>
                        {formatVND(s.price)}
                      </Typography>
                      <Button
                        component={RouterLink}
                        href={paths.spa2.serviceDetails(s.slug)}
                        size="small"
                        sx={{ color: SPA2_TEAL_DARK }}
                      >
                        {t('booking.viewDetails')}
                      </Button>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>

              {/* Card giá + Highlight gói hot */}
              <Spa2SectionTitle
                eyebrow={t('booking.packagesEyebrow')}
                title={t('booking.packagesTitle')}
              />
              <Grid container spacing={3} alignItems="stretch">
                {spa2BookingPackages.map((p) => (
                  <Grid key={p.slug} xs={12} sm={6} md={3}>
                    <Spa2SoftCard
                      sx={{
                        position: 'relative',
                        textAlign: 'center',
                        border: p.hot ? `2px solid ${SPA2_TEAL}` : undefined,
                        transform: p.hot ? { md: 'scale(1.05)' } : undefined,
                      }}
                    >
                      {p.hot && (
                        <Chip
                          label={t('booking.mostPopular')}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: -14,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: SPA2_TEAL,
                            color: 'white',
                            fontWeight: 700,
                          }}
                        />
                      )}
                      <Typography variant="h6" sx={{ color: SPA2_INK, mt: p.hot ? 1.5 : 0, mb: 1 }}>
                        {p.name}
                      </Typography>
                      <Typography variant="h4" sx={{ color: SPA2_TEAL, mb: 0.5 }}>
                        {formatVND(p.price)}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                        {p.sessions} {t('booking.sessionsSuffix')}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Stack spacing={1} sx={{ mb: 3, textAlign: 'left' }}>
                        {p.perks.map((perk) => (
                          <Stack key={perk} direction="row" spacing={1} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              width={16}
                              sx={{ color: SPA2_TEAL }}
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
                          bgcolor: p.hot ? SPA2_TEAL : 'transparent',
                          color: p.hot ? 'white' : SPA2_TEAL_DARK,
                          border: p.hot ? 'none' : `1.5px solid ${SPA2_TEAL}`,
                          '&:hover': { bgcolor: SPA2_TEAL_DARK, color: 'white' },
                        }}
                      >
                        {t('booking.selectPackage')}
                      </Button>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
      {!selectedPkg && <Spa2Cta />}
    </Spa2PageShell>
  );
}

// ======================================================================
// 9. CONTACT
// ======================================================================
export function Spa2ContactPageView() {
  const items = [
    { icon: 'solar:phone-bold', label: 'Hotline', value: spa2ContactInfo.hotline },
    { icon: 'solar:letter-bold', label: 'Email', value: spa2ContactInfo.email },
    { icon: 'solar:chat-round-dots-bold', label: 'Zalo', value: spa2ContactInfo.zalo },
    { icon: 'solar:map-point-bold', label: 'Trụ sở', value: spa2ContactInfo.address },
  ];
  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2ContactBanner.image.url}
        imageStyle={spa2ContactBanner.image}
        eyebrow={spa2ContactBanner.eyebrow}
        title={spa2ContactBanner.title}
        subtitle={spa2ContactBanner.subtitle}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={5}>
            <Grid xs={12} md={5}>
              <Stack spacing={2}>
                {items.map((i) => (
                  <Spa2SoftCard key={i.label}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: SPA2_CREAM,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify icon={i.icon} sx={{ color: SPA2_TEAL }} width={24} />
                      </Box>
                      <Stack>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {i.label}
                        </Typography>
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{i.value}</Typography>
                      </Stack>
                    </Stack>
                  </Spa2SoftCard>
                ))}
              </Stack>
            </Grid>
            <Grid xs={12} md={7}>
              <Spa2SoftCard>
                <Spa2SectionTitle eyebrow="Gửi lời nhắn" title="Form liên hệ" align="left" />
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
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      Gửi lời nhắn
                    </Button>
                  </Grid>
                </Grid>
              </Spa2SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Spa2PageShell>
  );
}

// ======================================================================
// 10. OFFERS
// ======================================================================
// export function Spa2OffersPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.offers}
//         eyebrow="Ưu đãi"
//         title="Gói ưu đãi dành riêng cho bạn"
//         subtitle="Tiết kiệm hơn, trải nghiệm trọn vẹn hơn với các ưu đãi thường niên."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa2Offers.map((o) => (
//               <Grid key={o.title} xs={12} sm={6} md={3}>
//                 <Spa2SoftCard sx={{ textAlign: 'center' }}>
//                   <Box
//                     sx={{
//                       width: 88,
//                       height: 88,
//                       mx: 'auto',
//                       mb: 2,
//                       borderRadius: '50%',
//                       bgcolor: SPA2_TEAL,
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
//                   <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
//                     {o.title}
//                   </Typography>
//                   <Typography sx={{ color: 'text.secondary', mb: 2 }}>{o.desc}</Typography>
//                   <Chip
//                     label={`MÃ: ${o.code}`}
//                     sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontWeight: 700, mb: 1 }}
//                   />
//                   <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
//                     HSD: {o.expires}
//                   </Typography>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }

export function Spa2OffersPageView() {
  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2OffersBanner.image.url}
        imageStyle={spa2OffersBanner.image}
        eyebrow={spa2OffersBanner.eyebrow}
        title={spa2OffersBanner.title}
        subtitle={spa2OffersBanner.subtitle}
      />

      {/* Voucher đơn lẻ (giữ nguyên) */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Voucher" title="Mã ưu đãi hiện có" />
          <Grid container spacing={3}>
            {spa2Offers.map((o) => (
              <Grid key={o.title} xs={12} sm={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 88,
                      height: 88,
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      bgcolor: SPA2_TEAL,
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
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
                    {o.title}
                  </Typography>
                  <Box
                    sx={{ color: 'text.secondary', mb: 2, '& p': { m: 0 } }}
                    dangerouslySetInnerHTML={{ __html: o.desc }}
                  />
                  <Chip
                    label={`MÃ: ${o.code}`}
                    sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, fontWeight: 700, mb: 1 }}
                  />
                  <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
                    HSD: {o.expires}
                  </Typography>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Card combo */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Combo" title="Gói combo tiết kiệm" />
          <Grid container spacing={4}>
            {spa2ComboOffers.map((c) => {
              const savePercent = Math.round((1 - c.salePrice / c.originalPrice) * 100);
              return (
                <Grid key={c.slug} xs={12} md={4}>
                  <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                        {c.name}
                      </Typography>
                      {/* So sánh lợi ích */}
                      <Stack spacing={0.75} sx={{ mb: 2 }}>
                        {c.services.map((s) => (
                          <Stack key={s} direction="row" spacing={1} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              width={16}
                              sx={{ color: SPA2_TEAL }}
                            />
                            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                              {s}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 2 }}>
                        <Typography variant="h5" sx={{ color: SPA2_TEAL }}>
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
                            sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                          />
                        ))}
                      </Stack>
                      <Button
                        fullWidth
                        component={RouterLink}
                        href={paths.spa2.booking}
                        sx={{
                          borderRadius: 999,
                          py: 1.2,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Mua ngay / Đặt lịch
                      </Button>
                    </Box>
                  </Spa2SoftCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 11. FEEDBACK
// ======================================================================
// export function Spa2FeedbackPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.feedback}
//         eyebrow="Cảm nhận khách hàng"
//         title="25.000+ khách hàng tin yêu"
//         subtitle="Mỗi đánh giá là động lực để chúng tôi không ngừng hoàn thiện."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa2Feedbacks.map((f) => (
//               <Grid key={f.name} xs={12} sm={6} md={4}>
//                 <Spa2SoftCard>
//                   <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
//                   <Typography sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>
//                     "{f.comment}"
//                   </Typography>
//                   <Stack direction="row" spacing={2} alignItems="center">
//                     <Avatar src={f.avatar} />
//                     <Stack>
//                       <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.name}</Typography>
//                       <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
//                         {f.role} · {f.service}
//                       </Typography>
//                     </Stack>
//                   </Stack>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }

// them moi
export function Spa2FeedbackPageView() {
  const approvedFeedbacks = spa2Feedbacks.filter((f) => f.status === 'approved');

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2FeedbackBanner.image.url}
        imageStyle={spa2FeedbackBanner.image}
        eyebrow={spa2FeedbackBanner.eyebrow}
        title={spa2FeedbackBanner.title}
        subtitle={spa2FeedbackBanner.subtitle}
      />

      {/* Video review */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Video" title="Cảm nhận qua video" />
          <Grid container spacing={3}>
            {spa2VideoReviews.map((v) => (
              <Grid key={v.name} xs={12} sm={6} md={4}>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden', cursor: 'pointer' }}>
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
                        <Iconify icon="solar:play-bold" width={28} sx={{ color: SPA2_TEAL }} />
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
                    <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{v.name}</Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      {v.service}
                    </Typography>
                  </Box>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ pb: { xs: 8, md: 12 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Đánh giá" title="Tất cả phản hồi" />
          <Grid container spacing={3}>
            {approvedFeedbacks.map((f) => (
              <Grid key={f.name} xs={12} sm={6} md={4}>
                <Spa2SoftCard>
                  <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>
                    &ldquo;{f.comment}&rdquo;
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={f.avatar} />
                    <Stack>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {f.role} · {f.service}
                      </Typography>
                    </Stack>
                  </Stack>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 12. PROMOTIONS
// ======================================================================
export function Spa2Countdown({ endsAt }: { endsAt: string }) {
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

// export function Spa2PromotionsPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.promotions}
//         eyebrow="Khuyến mãi"
//         title="Sự kiện & khuyến mãi theo mùa"
//         subtitle="Cập nhật các chương trình giới hạn thời gian, ưu đãi cực sốc trong năm."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Stack spacing={4}>
//             {spa2Promotions.map((p, idx) => (
//               <Spa2SoftCard key={p.title} sx={{ p: 0, overflow: 'hidden' }}>
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
//                         sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, mb: 2 }}
//                       />
//                       <Typography variant="h4" sx={{ color: SPA2_INK, mb: 1.5 }}>
//                         {p.title}
//                       </Typography>
//                       <Typography
//                         sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, fontSize: 22, mb: 1 }}
//                       >
//                         {p.price}
//                       </Typography>
//                       <Typography sx={{ color: 'text.secondary', mb: 3 }}>{p.save}</Typography>
//                       <Button
//                         component={RouterLink}
//                         href={paths.spa2.booking}
//                         sx={{
//                           borderRadius: 999,
//                           px: 4,
//                           bgcolor: SPA2_TEAL,
//                           color: 'white',
//                           '&:hover': { bgcolor: SPA2_TEAL_DARK },
//                         }}
//                       >
//                         Đăng ký ngay
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Spa2SoftCard>
//             ))}
//           </Stack>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }

export function Spa2PromotionsPageView() {
  const activePromotions = spa2Promotions.filter((p) => p.active);

  return (
    <Spa2PageShell>
      {/* Banner dịch vụ */}
      <Spa2PageHero
        image={spa2PromotionsBanner.image.url}
        imageStyle={spa2PromotionsBanner.image}
        eyebrow={spa2PromotionsBanner.eyebrow}
        title={spa2PromotionsBanner.title}
        subtitle={spa2PromotionsBanner.subtitle}
      />

      {/* Flash sale countdown - dedicated banner managed independently of the campaign list */}
      {spa2FlashSale.active && (
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Container>
            <Card
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 6,
                color: 'common.white',
                background: `linear-gradient(135deg, ${SPA2_TEAL_DARK} 0%, ${SPA2_INK} 100%)`,
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
                  <Typography variant="h3">{spa2FlashSale.title}</Typography>
                  <Typography sx={{ opacity: 0.85 }}>{spa2FlashSale.save}</Typography>
                </Stack>
                <Spa2Countdown endsAt={spa2FlashSale.endsAt} />
              </Stack>
            </Card>
          </Container>
        </Box>
      )}

      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container>
          <Stack spacing={4}>
            {activePromotions.map((p, idx) => (
              <Spa2SoftCard key={p.title} sx={{ p: 0, overflow: 'hidden' }}>
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
                        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, mb: 2 }}
                      />
                      <Typography variant="h4" sx={{ color: SPA2_INK, mb: 1.5 }}>
                        {p.title}
                      </Typography>
                      <Typography
                        sx={{ color: SPA2_TEAL_DARK, fontWeight: 700, fontSize: 22, mb: 1 }}
                      >
                        {p.price}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', mb: 2 }}>{p.save}</Typography>
                      {p.endsAt && (
                        <Box sx={{ mb: 3 }}>
                          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1 }}>
                            Kết thúc sau:
                          </Typography>
                          <Box
                            sx={{
                              display: 'inline-block',
                              bgcolor: SPA2_TEAL_DARK,
                              p: 1.5,
                              borderRadius: 2,
                            }}
                          >
                            <Spa2Countdown endsAt={p.endsAt} />
                          </Box>
                        </Box>
                      )}
                      <Button
                        component={RouterLink}
                        href={paths.spa2.booking}
                        sx={{
                          borderRadius: 999,
                          px: 4,
                          bgcolor: SPA2_TEAL,
                          color: 'white',
                          '&:hover': { bgcolor: SPA2_TEAL_DARK },
                        }}
                      >
                        Đăng ký ngay
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Spa2SoftCard>
            ))}
          </Stack>
        </Container>
      </Box>
    </Spa2PageShell>
  );
}

// ======================================================================
// 13. BRANCHES
// ======================================================================
// export function Spa2BranchesPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.branches}
//         eyebrow="Hệ thống"
//         title="4 chi nhánh trên toàn quốc"
//         subtitle="Tìm chi nhánh Nature Spa gần bạn nhất – mọi nơi đều cùng một chuẩn dịch vụ."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa2Branches.map((b) => (
//               <Grid key={b.name} xs={12} sm={6} md={6}>
//                 <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
//                       sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, mb: 1.5 }}
//                     />
//                     <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
//                       {b.name}
//                     </Typography>
//                     <Stack spacing={1}>
//                       <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Iconify icon="solar:map-point-bold" sx={{ color: SPA2_TEAL }} width={18} />
//                         <Typography sx={{ color: 'text.secondary' }}>{b.address}</Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Iconify icon="solar:phone-bold" sx={{ color: SPA2_TEAL }} width={18} />
//                         <Typography sx={{ color: 'text.secondary' }}>{b.phone}</Typography>
//                       </Stack>
//                       <Stack direction="row" spacing={1.5} alignItems="center">
//                         <Iconify
//                           icon="solar:clock-circle-bold"
//                           sx={{ color: SPA2_TEAL }}
//                           width={18}
//                         />
//                         <Typography sx={{ color: 'text.secondary' }}>{b.hours}</Typography>
//                       </Stack>
//                     </Stack>
//                   </Box>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }

export function Spa2BranchesPageView() {
  const [activeCity, setActiveCity] = useState<string>(spa2Branches[0].city);
  const activeBranch = spa2Branches.find((b) => b.city === activeCity) ?? spa2Branches[0];

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2BranchesBanner.image.url}
        imageStyle={spa2BranchesBanner.image}
        eyebrow={spa2BranchesBanner.eyebrow}
        title={spa2BranchesBanner.title}
        subtitle={spa2BranchesBanner.subtitle}
      />

      {/* Map tổng + List location */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
                <Typography sx={{ p: 2.5, pb: 0, color: SPA2_INK, fontWeight: 600 }}>
                  Chọn khu vực
                </Typography>
                <Stack divider={<Divider />} sx={{ mt: 1 }}>
                  {spa2Branches.map((b) => (
                    <Stack
                      key={b.city}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      onClick={() => setActiveCity(b.city)}
                      sx={{
                        p: 2.5,
                        cursor: 'pointer',
                        bgcolor: activeCity === b.city ? SPA2_CREAM : 'transparent',
                        borderLeft:
                          activeCity === b.city
                            ? `3px solid ${SPA2_TEAL}`
                            : '3px solid transparent',
                        '&:hover': { bgcolor: SPA2_CREAM },
                      }}
                    >
                      <Iconify
                        icon="solar:map-point-bold"
                        sx={{ color: activeCity === b.city ? SPA2_TEAL : 'text.disabled' }}
                      />
                      <Stack>
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 14 }}>
                          {b.city}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                          {b.name}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Spa2SoftCard>
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
                  title="Nature Spa Map"
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
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Chi nhánh" title="Tất cả địa điểm" />
          <Grid container spacing={3}>
            {spa2Branches.map((b) => (
              <Grid key={b.name} xs={12} sm={6} md={6}>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                      sx={{ bgcolor: 'common.white', color: SPA2_TEAL_DARK, mb: 1.5 }}
                    />
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 2 }}>
                      {b.name}
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Iconify icon="solar:map-point-bold" sx={{ color: SPA2_TEAL }} width={18} />
                        <Typography sx={{ color: 'text.secondary' }}>{b.address}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Iconify icon="solar:phone-bold" sx={{ color: SPA2_TEAL }} width={18} />
                        <Typography sx={{ color: 'text.secondary' }}>{b.phone}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Iconify
                          icon="solar:clock-circle-bold"
                          sx={{ color: SPA2_TEAL }}
                          width={18}
                        />
                        <Typography sx={{ color: 'text.secondary' }}>{b.hours}</Typography>
                      </Stack>
                    </Stack>
                    <Button
                      fullWidth
                      component={RouterLink}
                      href={`${paths.spa2.booking}?branch=${encodeURIComponent(b.name)}`}
                      sx={{
                        borderRadius: 999,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      Đặt lịch tại {b.city}
                    </Button>
                  </Box>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Spa2PageShell>
  );
}

// ======================================================================
// 14. ACCOUNT
// ======================================================================
export function Spa2AccountPageView() {
  const {
    memberName,
    avatar,
    membershipTier,
    loyaltyPoints,
    sessionsUsed,
    sessionsTotal,
    appointments,
  } = SPA2_ACCOUNT_CONTENT;

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2AccountBanner.image.url}
        imageStyle={spa2AccountBanner.image}
        eyebrow={spa2AccountBanner.eyebrow}
        title={spa2AccountBanner.title}
        subtitle={spa2AccountBanner.subtitle}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Spa2SoftCard sx={{ textAlign: 'center' }}>
                <Avatar src={avatar} sx={{ width: 88, height: 88, mx: 'auto', mb: 2 }} />
                <Typography variant="h6" sx={{ color: SPA2_INK }}>
                  {memberName}
                </Typography>
                <Chip label={membershipTier} sx={{ bgcolor: SPA2_TEAL, color: 'white', my: 1.5 }} />
                <Divider sx={{ my: 2 }} />
                <Stack spacing={1.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: 'text.secondary' }}>Điểm tích lũy</Typography>
                    <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
                      {loyaltyPoints.toLocaleString('vi-VN')}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: 'text.secondary' }}>Lượt còn lại</Typography>
                    <Typography sx={{ color: SPA2_TEAL_DARK, fontWeight: 700 }}>
                      {sessionsUsed} / {sessionsTotal}
                    </Typography>
                  </Stack>
                </Stack>
              </Spa2SoftCard>
            </Grid>
            <Grid xs={12} md={8}>
              <Spa2SoftCard>
                <Spa2SectionTitle eyebrow="Lịch hẹn" title="Sắp tới" align="left" />
                <Stack spacing={2}>
                  {appointments.map((a) => (
                    <Stack
                      key={a.date + a.time}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}
                    >
                      <Box sx={{ minWidth: 64, textAlign: 'center' }}>
                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Ngày</Typography>
                        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL_DARK }}>
                          {a.date}
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Stack flexGrow={1}>
                        <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                          {a.service}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                          {a.time} · {a.branch}
                        </Typography>
                      </Stack>
                      <Button size="small" sx={{ color: SPA2_TEAL_DARK }}>
                        Đổi lịch
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              </Spa2SoftCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Spa2PageShell>
  );
}

// ======================================================================
// 15. PARTNERS
// ======================================================================
// export function Spa2PartnersPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.partners}
//         eyebrow="Cộng sự"
//         title="Đối tác đồng hành"
//         subtitle="Hợp tác cùng các thương hiệu mỹ phẩm và thiết bị spa hàng đầu thế giới."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa2Partners.map((p) => (
//               <Grid key={p.name} xs={6} sm={4} md={2}>
//                 <Spa2SoftCard sx={{ textAlign: 'center', py: 4 }}>
//                   <Box
//                     sx={{
//                       width: 64,
//                       height: 64,
//                       mx: 'auto',
//                       mb: 1.5,
//                       borderRadius: '50%',
//                       bgcolor: SPA2_TEAL,
//                       color: 'white',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       fontWeight: 700,
//                     }}
//                   >
//                     {p.logo}
//                   </Box>
//                   <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 14 }}>
//                     {p.name}
//                   </Typography>
//                   <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
//                     {p.country}
//                   </Typography>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }

// them moi
export function Spa2PartnersPageView() {
  const [selected, setSelected] = useState<any>(null);
  const allPartners = [...spa2PartnerProfiles, ...spa2ExtraPartners];

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2PartnersBanner.image.url}
        imageStyle={spa2PartnersBanner.image}
        eyebrow={spa2PartnersBanner.eyebrow}
        title={spa2PartnersBanner.title}
        subtitle={spa2PartnersBanner.subtitle}
      />

      {/* Logo đối tác - grid 4-6 cột */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Thương hiệu" title="Đối tác của chúng tôi" />
          <Grid container spacing={3}>
            {allPartners.map((p) => (
              <Grid key={p.name} xs={6} sm={4} md={2}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => setSelected(p)}>
                  <Spa2SoftCard sx={{ textAlign: 'center', py: 4 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 1.5,
                        borderRadius: '50%',
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {p.logo}
                    </Box>
                    <Typography sx={{ color: SPA2_INK, fontWeight: 600, fontSize: 14 }}>
                      {p.name}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                      {p.country}
                    </Typography>
                  </Spa2SoftCard>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Đối tác chiến lược theo nhóm */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Phân loại" title="Đối tác chiến lược" />
          <Grid container spacing={3}>
            {spa2PartnerCategories.map((cat) => {
              const partnersInCat = allPartners.filter((p: any) => p.category === cat.key);
              return (
                <Grid key={cat.key} xs={12} sm={6} md={3}>
                  <Spa2SoftCard>
                    <Iconify icon={cat.icon} width={36} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                    <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1.5 }}>
                      {cat.label}
                    </Typography>
                    <Stack spacing={1}>
                      {partnersInCat.map((p: any) => (
                        <Typography key={p.name} sx={{ fontSize: 14, color: 'text.secondary' }}>
                          • {p.name}
                        </Typography>
                      ))}
                    </Stack>
                  </Spa2SoftCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Dự án hợp tác */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Hợp tác" title="Dự án nổi bật" />
          <Grid container spacing={3}>
            {spa2Collaborations.map((c) => (
              <Grid key={c.title} xs={12} sm={6} md={4}>
                <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
                      sx={{ mb: 1.5, bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
                    />
                    <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 0.5 }}>
                      {c.title}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      Cùng {c.partner}
                    </Typography>
                  </Box>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Chứng nhận */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Tiêu chuẩn" title="Chứng nhận" />
          <Grid container spacing={3}>
            {spa2QualityCerts.map((c) => (
              <Grid key={c.name} xs={12} sm={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={c.icon} width={44} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                  <Typography variant="h6" sx={{ color: SPA2_INK, mb: 0.5 }}>
                    {c.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{c.desc}</Typography>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Trở thành đối tác - form */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Spa2SoftCard>
            <Spa2SectionTitle
              eyebrow="Hợp tác"
              title="Trở thành đối tác của Nature Spa"
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
                  {spa2PartnerCategories.map((c) => (
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
                    bgcolor: SPA2_TEAL,
                    color: 'white',
                    '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  }}
                >
                  Gửi đề xuất hợp tác
                </Button>
              </Grid>
            </Grid>
          </Spa2SoftCard>
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
                  bgcolor: SPA2_TEAL,
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
              <Typography variant="h5" sx={{ color: SPA2_INK }}>
                {selected.name}
              </Typography>
              <Chip
                label={`${selected.country} · Hợp tác từ ${selected.since}`}
                sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
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
                  <Iconify icon="solar:user-bold" sx={{ color: SPA2_TEAL }} />
                  <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>
                    {selected.expert}
                  </Typography>
                </Stack>
              </>
            )}
            <Button
              fullWidth
              component={RouterLink}
              href={paths.spa2.booking}
              size="large"
              sx={{
                borderRadius: 999,
                py: 1.5,
                bgcolor: SPA2_TEAL,
                color: 'white',
                '&:hover': { bgcolor: SPA2_TEAL_DARK },
              }}
            >
              Đặt lịch ngay
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </Spa2PageShell>
  );
}

// ======================================================================
// 16. TREATMENTS (gói liệu trình)
// ======================================================================
// export function Spa2TreatmentsPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.treatments}
//         eyebrow="Gói liệu trình"
//         title="Liệu trình chuyên sâu"
//         subtitle="Lộ trình được thiết kế cá nhân hóa cho từng vấn đề – đảm bảo kết quả rõ rệt."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa2Treatments.map((t) => (
//               <Grid key={t.name} xs={12} md={6}>
//                 <Spa2SoftCard>
//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="flex-start"
//                     sx={{ mb: 2 }}
//                   >
//                     <Stack>
//                       <Typography variant="h6" sx={{ color: SPA2_INK }}>
//                         {t.name}
//                       </Typography>
//                       <Typography sx={{ color: 'text.secondary' }}>{t.target}</Typography>
//                     </Stack>
//                     <Chip
//                       label={`${t.sessions} buổi`}
//                       sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
//                     />
//                   </Stack>
//                   <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//                     <Iconify icon="solar:calendar-bold" sx={{ color: SPA2_TEAL }} />
//                     <Typography sx={{ color: 'text.secondary' }}>
//                       Thời lượng: {t.duration}
//                     </Typography>
//                   </Stack>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography sx={{ color: SPA2_INK, mb: 1.5, fontWeight: 600 }}>
//                     Bao gồm:
//                   </Typography>
//                   <Stack spacing={1}>
//                     {t.includes.map((i) => (
//                       <Stack key={i} direction="row" spacing={1.5} alignItems="center">
//                         <Iconify
//                           icon="solar:check-circle-bold"
//                           sx={{ color: SPA2_TEAL }}
//                           width={18}
//                         />
//                         <Typography sx={{ color: 'text.secondary' }}>{i}</Typography>
//                       </Stack>
//                     ))}
//                   </Stack>
//                   <Divider sx={{ my: 2 }} />
//                   <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Typography variant="h5" sx={{ color: SPA2_TEAL }}>
//                       {formatVND(t.price)}
//                     </Typography>
//                     <Button
//                       component={RouterLink}
//                       href={paths.spa2.booking}
//                       sx={{
//                         borderRadius: 999,
//                         px: 3,
//                         bgcolor: SPA2_TEAL,
//                         color: 'white',
//                         '&:hover': { bgcolor: SPA2_TEAL_DARK },
//                       }}
//                     >
//                       Đăng ký
//                     </Button>
//                   </Stack>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }
export function Spa2TreatmentsPageView() {
  const [search, setSearch] = useState('');

  const activeTreatments = spa2Treatments.filter((t) => t.active);
  const filtered = activeTreatments.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.target.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2TreatmentsBanner.image.url}
        imageStyle={spa2TreatmentsBanner.image}
        eyebrow={spa2TreatmentsBanner.eyebrow}
        title={spa2TreatmentsBanner.title}
        subtitle={spa2TreatmentsBanner.subtitle}
      />
      <Box sx={{ pb: { xs: 4, md: 6 } }}>
        <Container sx={{ textAlign: 'center' }}>
          <Button
            component={RouterLink}
            href={paths.spa2.booking}
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 999,
              bgcolor: SPA2_TEAL,
              color: 'white',
              '&:hover': { bgcolor: SPA2_TEAL_DARK },
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
                  <Iconify icon="solar:magnifer-linear" sx={{ color: SPA2_TEAL }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Danh sách treatment */}
          <Grid container spacing={3}>
            {filtered.map((t) => (
              <Grid key={t.name} xs={12} md={6}>
                <Spa2SoftCard>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 2 }}
                  >
                    <Stack>
                      <Typography variant="h6" sx={{ color: SPA2_INK }}>
                        {t.name}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{t.target}</Typography>
                    </Stack>
                    <Chip
                      label={`${t.sessions} buổi`}
                      sx={{ bgcolor: SPA2_TEAL, color: 'white' }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Iconify icon="solar:calendar-bold" sx={{ color: SPA2_TEAL }} />
                    <Typography sx={{ color: 'text.secondary' }}>
                      Thời lượng: {t.duration}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Typography sx={{ color: SPA2_INK, mb: 1.5, fontWeight: 600 }}>
                    Bao gồm:
                  </Typography>
                  <Stack spacing={1}>
                    {t.includes.map((i) => (
                      <Stack key={i} direction="row" spacing={1.5} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          sx={{ color: SPA2_TEAL }}
                          width={18}
                        />
                        <Typography sx={{ color: 'text.secondary' }}>{i}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" sx={{ color: SPA2_TEAL }}>
                      {formatVND(t.price)}
                    </Typography>
                    <Button
                      component={RouterLink}
                      href={paths.spa2.booking}
                      sx={{
                        borderRadius: 999,
                        px: 3,
                        bgcolor: SPA2_TEAL,
                        color: 'white',
                        '&:hover': { bgcolor: SPA2_TEAL_DARK },
                      }}
                    >
                      Đăng ký
                    </Button>
                  </Stack>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Quy trình điều trị */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container maxWidth="md">
          <Spa2SectionTitle eyebrow="Quy trình" title="4 bước điều trị chuẩn y khoa" />
          <Grid container spacing={3}>
            {spa2TreatmentProcess.map((p, idx) => (
              <Grid key={p.title} xs={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: SPA2_TEAL_LIGHT, fontWeight: 700, mb: 1 }}>
                    {idx + 1}
                  </Typography>
                  <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 1 }}>
                    {p.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{p.desc}</Typography>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 17. BEFORE-AFTER
// ======================================================================
// export function Spa2BeforeAfterPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.beforeAfter}
//         eyebrow="Trước & Sau"
//         title="Kết quả thực tế từ khách hàng"
//         subtitle="Hình ảnh được chia sẻ với sự đồng thuận của khách hàng – không qua chỉnh sửa."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container>
//           <Grid container spacing={3}>
//             {spa2BeforeAfters.map((ba) => (
//               <Grid key={ba.title} xs={12} sm={6}>
//                 <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
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
//                             bgcolor: SPA2_TEAL,
//                             color: 'white',
//                           }}
//                         />
//                       </Box>
//                     </Grid>
//                   </Grid>
//                   <Box sx={{ p: 3 }}>
//                     <Typography variant="h6" sx={{ color: SPA2_INK, mb: 1 }}>
//                       {ba.title}
//                     </Typography>
//                     <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
//                       Thời gian: {ba.duration}
//                     </Typography>
//                     <Typography sx={{ color: SPA2_TEAL_DARK }}>{ba.note}</Typography>
//                   </Box>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }
export function Spa2BeforeAfterSlider({ before, after }: { before: string; after: string }) {
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
        sx={{ position: 'absolute', top: 12, right: 12, bgcolor: SPA2_TEAL, color: 'white' }}
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

export function Spa2BeforeAfterPageView() {
  const approvedBeforeAfters = spa2BeforeAfters.filter((ba) => ba.status === 'approved');

  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2BeforeAfterBanner.image.url}
        imageStyle={spa2BeforeAfterBanner.image}
        eyebrow={spa2BeforeAfterBanner.eyebrow}
        title={spa2BeforeAfterBanner.title}
        subtitle={spa2BeforeAfterBanner.subtitle}
      />

      {/* Slider before/after */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Trải nghiệm" title="Kéo để so sánh" />
          <Grid container spacing={4}>
            {approvedBeforeAfters.map((ba) => (
              <Grid key={ba.title} xs={12} sm={6}>
                <Spa2SoftCard sx={{ p: 2 }}>
                  <Spa2BeforeAfterSlider before={ba.before} after={ba.after} />
                  <Box sx={{ pt: 2 }}>
                    <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{ba.title}</Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      Thời gian: {ba.duration}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: SPA2_TEAL_DARK, mt: 0.5 }}>
                      {ba.note}
                    </Typography>
                  </Box>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Công nghệ sử dụng */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Công nghệ" title="Thiết bị & công nghệ độc quyền" />
          <Grid container spacing={3}>
            {spa2Technologies.map((t) => (
              <Grid key={t.name} xs={12} sm={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Iconify icon={t.icon} width={40} sx={{ color: SPA2_TEAL, mb: 1.5 }} />
                  <Typography sx={{ color: SPA2_INK, fontWeight: 600, mb: 1 }}>{t.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{t.desc}</Typography>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Chuyên gia phụ trách */}
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container>
          <Spa2SectionTitle eyebrow="Đội ngũ" title="Chuyên gia phụ trách" />
          <Grid container spacing={3} justifyContent="center">
            {spa2TreatmentExperts.map((e) => (
              <Grid key={e.name} xs={12} sm={6} md={3}>
                <Spa2SoftCard sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={e.image}
                    sx={{
                      width: 88,
                      height: 88,
                      mx: 'auto',
                      mb: 1.5,
                      border: `3px solid ${SPA2_TEAL_LIGHT}`,
                    }}
                  />
                  <Typography sx={{ color: SPA2_INK, fontWeight: 600 }}>{e.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{e.role}</Typography>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Feedback khách hàng */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: SPA2_CREAM }}>
        <Container>
          <Spa2SectionTitle eyebrow="Đánh giá" title="Khách hàng nói gì" />
          <Grid container spacing={3}>
            {spa2Feedbacks.slice(0, 3).map((f) => (
              <Grid key={f.name} xs={12} sm={6} md={4}>
                <Spa2SoftCard>
                  <Rating value={f.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                  <Typography sx={{ color: SPA2_INK, lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>
                    &ldquo;{f.comment}&rdquo;
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={f.avatar} />
                    <Stack>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.name}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                        {f.service}
                      </Typography>
                    </Stack>
                  </Stack>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Spa2SectionTitle eyebrow="FAQ" title="Câu hỏi thường gặp" />
          {spa2Faqs
            .filter((f) => f.published)
            .slice(0, 4)
            .map((f, idx) => (
            <Accordion
              key={f.q}
              defaultExpanded={idx === 0}
              sx={{
                mb: 1.5,
                borderRadius: '12px !important',
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: 'none',
                '&:before': { display: 'none' },
                '&.Mui-expanded': { borderColor: SPA2_TEAL_LIGHT },
              }}
            >
              <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
                <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      <Spa2Cta />
    </Spa2PageShell>
  );
}

// ======================================================================
// 18. FAQ
// ======================================================================
// export function Spa2FaqPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.faq}
//         eyebrow="FAQ"
//         title="Câu hỏi thường gặp"
//         subtitle="Mọi điều bạn cần biết trước khi đến với Nature Spa."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           {spa2Faqs.map((f, idx) => (
//             <Accordion
//               key={f.q}
//               defaultExpanded={idx === 0}
//               sx={{
//                 mb: 1.5,
//                 borderRadius: '12px !important',
//                 border: `1px solid ${SPA2_CREAM_DARK}`,
//                 boxShadow: 'none',
//                 '&:before': { display: 'none' },
//                 '&.Mui-expanded': { borderColor: SPA2_TEAL_LIGHT },
//               }}
//             >
//               <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
//                 <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.q}</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
//               </AccordionDetails>
//             </Accordion>
//           ))}
//         </Container>
//       </Box>
//       <Spa2Cta />
//     </Spa2PageShell>
//   );
// }
// ======================================================================

// export function Spa2FaqPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.faq}
//         eyebrow="FAQ"
//         title="Câu hỏi thường gặp"
//         subtitle="Mọi điều bạn cần biết trước khi đến với Nature Spa."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           {spa2Faqs.map((f, idx) => (
//             <Accordion
//               key={f.q}
//               defaultExpanded={idx === 0}
//               sx={{
//                 mb: 1.5,
//                 borderRadius: '12px !important',
//                 border: `1px solid ${SPA2_CREAM_DARK}`,
//                 boxShadow: 'none',
//                 '&:before': { display: 'none' },
//                 '&.Mui-expanded': { borderColor: SPA2_TEAL_LIGHT },
//               }}
//             >
//               <AccordionSummary expandIcon={<Iconify icon="solar:alt-arrow-down-bold" />}>
//                 <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{f.q}</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{f.a}</Typography>
//               </AccordionDetails>
//             </Accordion>
//           ))}

//           {/* CTA đăng ký */}
//           <Spa2SoftCard
//             sx={{
//               mt: 5,
//               textAlign: 'center',
//               background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
//               color: 'white',
//             }}
//           >
//             <Typography variant="h5" sx={{ mb: 1 }}>
//               Vẫn còn thắc mắc?
//             </Typography>
//             <Typography sx={{ opacity: 0.85, mb: 3 }}>
//               Đội ngũ tư vấn của Nature Spa luôn sẵn sàng hỗ trợ bạn.
//             </Typography>
//             <Button
//               component={RouterLink}
//               href={paths.spa2.booking}
//               sx={{
//                 borderRadius: 999,
//                 px: 4,
//                 bgcolor: 'common.white',
//                 color: SPA2_TEAL_DARK,
//                 '&:hover': { bgcolor: SPA2_CREAM },
//               }}
//             >
//               Đăng ký tư vấn
//             </Button>
//           </Spa2SoftCard>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }

// ─────────────────────────────────────────────────────────────────────
// SHARED BLOCKS
// ─────────────────────────────────────────────────────────────────────

// function Spa2SectionTitle({
//   eyebrow,
//   title,
//   subtitle,
//   align = 'center',
// }: {
//   eyebrow: string;
//   title: string;
//   subtitle?: string;
//   align?: 'center' | 'left';
// }) {
//   return (
//     <Stack spacing={1} sx={{ mb: 4, textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start' }}>
//       <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
//         {eyebrow}
//       </Typography>
//       <Typography variant="h4" sx={{ color: SPA2_INK, fontWeight: 600 }}>
//         {title}
//       </Typography>
//       {subtitle && (
//         <Typography sx={{ color: 'text.secondary', maxWidth: 640 }}>{subtitle}</Typography>
//       )}
//     </Stack>
//   );
// }

// function Spa2SoftCard({ children, sx }: { children: React.ReactNode; sx?: object }) {
//   return (
//     <Card
//       sx={{
//         p: 3,
//         borderRadius: 4,
//         border: `1px solid ${SPA2_CREAM_DARK}`,
//         boxShadow: '0 8px 24px rgba(31,42,40,0.06)',
//         height: '100%',
//         transition: 'all .22s',
//         '&:hover': {
//           transform: 'translateY(-3px)',
//           boxShadow: '0 16px 36px rgba(46,139,122,0.13)',
//           borderColor: SPA2_TEAL_LIGHT,
//         },
//         ...sx,
//       }}
//     >
//       {children}
//     </Card>
//   );
// }

// ─────────────────────────────────────────────────────────────────────
// ======================================================================
// PAGE 1 – Spa2FaqPageView
// ======================================================================
// ─────────────────────────────────────────────────────────────────────

function FaqHelpfulVote({ idx }: { idx: number }) {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${SPA2_CREAM_DARK}` }}
    >
      <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
        Câu trả lời có hữu ích không?
      </Typography>
      <Button
        size="small"
        onClick={() => setVoted('yes')}
        startIcon={<Iconify icon="solar:like-bold" width={14} />}
        sx={{
          borderRadius: 99,
          px: 1.5,
          fontSize: 12,
          color: voted === 'yes' ? SPA2_TEAL_DARK : 'text.secondary',
          bgcolor: voted === 'yes' ? SPA2_CREAM : 'transparent',
          border: `1px solid ${voted === 'yes' ? SPA2_TEAL_LIGHT : 'divider'}`,
          '&:hover': { bgcolor: SPA2_CREAM, borderColor: SPA2_TEAL_LIGHT },
        }}
      >
        Có
      </Button>
      <Button
        size="small"
        onClick={() => setVoted('no')}
        startIcon={<Iconify icon="solar:dislike-bold" width={14} />}
        sx={{
          borderRadius: 99,
          px: 1.5,
          fontSize: 12,
          color: voted === 'no' ? SPA2_TEAL_DARK : 'text.secondary',
          bgcolor: voted === 'no' ? SPA2_CREAM : 'transparent',
          border: `1px solid ${voted === 'no' ? SPA2_TEAL_LIGHT : 'divider'}`,
          '&:hover': { bgcolor: SPA2_CREAM, borderColor: SPA2_TEAL_LIGHT },
        }}
      >
        Chưa
      </Button>
    </Stack>
  );
}

export function Spa2FaqPageView() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');

  const publishedFaqs = useMemo(() => spa2Faqs.filter((f) => f.published), []);

  const filtered = useMemo(() => {
    let list = publishedFaqs;
    if (cat !== 'all') list = list.filter((f) => f.cat === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }
    return list;
  }, [publishedFaqs, search, cat]);

  const stats = [
    { n: '98%', l: 'Khách hàng hài lòng' },
    { n: "15'", l: 'Phản hồi trung bình' },
    { n: '24/7', l: 'Hỗ trợ trực tuyến' },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          bgcolor: SPA2_CREAM,
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        {/* decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 360,
            height: 360,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL_LIGHT,
            opacity: 0.1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            opacity: 0.07,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${SPA2_PAGE_IMAGES.faq})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.06,
          }}
        />

        <Container sx={{ position: 'relative' }}>
          <Stack spacing={2.5} alignItems="center" sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant="overline"
              sx={{ color: SPA2_TEAL, letterSpacing: 3, textTransform: 'uppercase' }}
            >
              {spa2FaqBanner.eyebrow}
            </Typography>
            <Typography variant="h1" sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1 }}>
              {spa2FaqBanner.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 17, maxWidth: 520 }}>
              {spa2FaqBanner.subtitle}
            </Typography>

            {/* search bar */}
            <Box
              sx={{
                width: '100%',
                maxWidth: 560,
                bgcolor: 'common.white',
                borderRadius: 99,
                border: `1.5px solid ${SPA2_CREAM_DARK}`,
                px: 2.5,
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                boxShadow: '0 8px 24px rgba(46,139,122,0.12)',
              }}
            >
              <Iconify
                icon="solar:magnifer-linear"
                width={20}
                sx={{ color: SPA2_TEAL, flexShrink: 0 }}
              />
              <TextField
                fullWidth
                variant="standard"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ disableUnderline: true, sx: { fontSize: 15 } }}
                inputProps={{ 'aria-label': 'Tìm kiếm FAQ' }}
              />
              {search && (
                <IconButton size="small" onClick={() => setSearch('')} aria-label="Xóa">
                  <Iconify
                    icon="solar:close-circle-bold"
                    width={18}
                    sx={{ color: 'text.disabled' }}
                  />
                </IconButton>
              )}
            </Box>
          </Stack>

          {/* stats */}
          <Grid container spacing={2} justifyContent="center">
            {stats.map((s) => (
              <Grid key={s.l} xs={4} sm={2.5}>
                <Spa2SoftCard sx={{ textAlign: 'center', py: 2.5, px: 1 }}>
                  <Typography variant="h4" sx={{ color: SPA2_TEAL, fontWeight: 700 }}>
                    {s.n}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>
                    {s.l}
                  </Typography>
                </Spa2SoftCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Main content ── */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          {/* Category chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
            {spa2FaqCategories.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                icon={<Iconify icon={c.icon} width={15} />}
                onClick={() => setCat(c.value)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: cat === c.value ? SPA2_TEAL : 'transparent',
                  color: cat === c.value ? 'white' : 'text.secondary',
                  border: `1.5px solid ${cat === c.value ? SPA2_TEAL : SPA2_CREAM_DARK}`,
                  '& .MuiChip-icon': { color: cat === c.value ? 'white' : SPA2_TEAL },
                  '&:hover': {
                    bgcolor: cat === c.value ? SPA2_TEAL_DARK : SPA2_CREAM,
                    borderColor: SPA2_TEAL,
                  },
                  transition: 'all .15s',
                  height: 34,
                  borderRadius: 99,
                }}
              />
            ))}
          </Stack>

          {/* Result count */}
          {(search || cat !== 'all') && (
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 2 }}>
              Tìm thấy <strong style={{ color: SPA2_TEAL }}>{filtered.length}</strong> câu hỏi
              {cat !== 'all' &&
                ` trong danh mục "${spa2FaqCategories.find((c) => c.value === cat)?.label}"`}
            </Typography>
          )}

          {/* FAQ list */}
          {filtered.length === 0 ? (
            <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
              <Iconify icon="solar:magnifer-broken" width={48} sx={{ color: SPA2_CREAM_DARK }} />
              <Typography sx={{ color: 'text.secondary' }}>
                Không tìm thấy câu hỏi phù hợp.
              </Typography>
              <Button
                onClick={() => {
                  setSearch('');
                  setCat('all');
                }}
                sx={{ color: SPA2_TEAL }}
              >
                Xem tất cả câu hỏi
              </Button>
            </Stack>
          ) : (
            <Stack spacing={0}>
              {filtered.map((f, idx) => (
                <Accordion
                  key={`${f.cat}-${idx}`}
                  disableGutters
                  elevation={0}
                  sx={{
                    mb: 1.5,
                    borderRadius: '14px !important',
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    boxShadow: 'none',
                    overflow: 'hidden',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': {
                      borderColor: SPA2_TEAL_LIGHT,
                      boxShadow: `0 0 0 2px ${SPA2_TEAL_LIGHT}22`,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <Iconify icon="solar:alt-arrow-down-bold" sx={{ color: 'text.secondary' }} />
                    }
                    sx={{
                      px: 2,
                      py: 0.5,
                      bgcolor: 'common.white',
                      '&.Mui-expanded': { bgcolor: SPA2_CREAM },
                      '& .MuiAccordionSummary-content': { my: 1.5 },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          bgcolor: SPA2_CREAM,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          '.Mui-expanded &': { bgcolor: SPA2_TEAL },
                        }}
                      >
                        <Iconify
                          icon={f.icon}
                          width={17}
                          sx={{ color: SPA2_TEAL, '.Mui-expanded &': { color: 'white' } }}
                        />
                      </Box>
                      <Typography sx={{ fontWeight: 600, color: SPA2_INK, fontSize: 15 }}>
                        {f.q}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 2.5, pb: 2.5, bgcolor: 'common.white' }}>
                    <Box sx={{ pl: '46px' }}>
                      <Box
                        sx={{
                          borderLeft: `3px solid ${SPA2_TEAL_LIGHT}`,
                          pl: 2,
                        }}
                      >
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: 14 }}>
                          {f.a}
                        </Typography>
                        <Chip
                          size="small"
                          label={f.tag}
                          icon={<Iconify icon="solar:tag-bold" width={12} />}
                          sx={{
                            mt: 1.5,
                            bgcolor: SPA2_CREAM,
                            color: SPA2_TEAL_DARK,
                            '& .MuiChip-icon': { color: SPA2_TEAL },
                          }}
                        />
                        <FaqHelpfulVote idx={idx} />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}

          {/* Contact CTA */}
          <Card
            sx={{
              mt: 6,
              p: { xs: 3, md: 5 },
              borderRadius: 5,
              background: `linear-gradient(135deg, ${SPA2_TEAL} 0%, ${SPA2_TEAL_DARK} 100%)`,
              color: 'common.white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.07)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -60,
                left: -30,
                width: 220,
                height: 220,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.05)',
              }}
            />
            <Box sx={{ position: 'relative' }}>
              <Iconify
                icon="solar:chat-dots-bold-duotone"
                width={44}
                sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}
              />
              <Typography variant="h4" sx={{ mb: 1 }}>
                Chưa tìm thấy câu trả lời?
              </Typography>
              <Typography sx={{ opacity: 0.85, mb: 3, fontSize: 15 }}>
                Đội ngũ tư vấn sẵn sàng hỗ trợ bạn mọi lúc — phản hồi trong 15 phút.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
                <Button
                  href={`tel:${spa2ContactInfo.hotline.replace(/\s/g, '')}`}
                  startIcon={<Iconify icon="solar:phone-bold" />}
                  sx={{
                    borderRadius: 99,
                    px: 3,
                    py: 1.2,
                    bgcolor: 'common.white',
                    color: SPA2_TEAL_DARK,
                    '&:hover': { bgcolor: SPA2_CREAM },
                  }}
                >
                  {spa2ContactInfo.hotline}
                </Button>
                <Button
                  href="https://zalo.me/0909868868"
                  target="_blank"
                  startIcon={<Iconify icon="solar:chat-round-dots-bold" />}
                  sx={{
                    borderRadius: 99,
                    px: 3,
                    py: 1.2,
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                  }}
                >
                  Chat Zalo
                </Button>
                <Button
                  component={RouterLink}
                  href={paths.spa2.contact}
                  startIcon={<Iconify icon="solar:letter-bold" />}
                  sx={{
                    borderRadius: 99,
                    px: 3,
                    py: 1.2,
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                  }}
                >
                  Gửi email
                </Button>
              </Stack>
            </Box>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

// ======================================================================
// 19. POLICY
// ======================================================================
// export function Spa2PolicyPageView() {
//   return (
//     <Spa2PageShell>
//       <Spa2PageHero
//         image={SPA2_PAGE_IMAGES.policy}
//         eyebrow="Chính sách"
//         title="Quy định & chính sách"
//         subtitle="Minh bạch – công bằng – tôn trọng khách hàng là kim chỉ nam của Nature Spa."
//       />
//       <Box sx={{ py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="md">
//           <Grid container spacing={3}>
//             {spa2Policies.map((p) => (
//               <Grid key={p.title} xs={12} sm={6}>
//                 <Spa2SoftCard>
//                   <Typography variant="h6" sx={{ color: SPA2_TEAL_DARK, mb: 2 }}>
//                     {p.title}
//                   </Typography>
//                   <Stack spacing={1}>
//                     {p.items.map((i) => (
//                       <Stack key={i} direction="row" spacing={1.5}>
//                         <Iconify
//                           icon="solar:leaf-bold"
//                           sx={{ color: SPA2_TEAL, mt: 0.5 }}
//                           width={16}
//                         />
//                         <Typography sx={{ color: 'text.secondary' }}>{i}</Typography>
//                       </Stack>
//                     ))}
//                   </Stack>
//                 </Spa2SoftCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </Spa2PageShell>
//   );
// }

function PolSectionHeader({
  id,
  icon,
  title,
  article,
}: {
  id: string;
  icon: string;
  title: string;
  article: string;
}) {
  return (
    <Stack
      id={id}
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        mb: 3,
        pb: 1.5,
        borderBottom: `2px solid ${SPA2_CREAM_DARK}`,
        scrollMarginTop: 100,
      }}
    >
      <Iconify icon={icon} width={22} sx={{ color: SPA2_TEAL }} />
      <Typography variant="h6" sx={{ color: SPA2_INK, flex: 1 }}>
        {title}
      </Typography>
      <Chip
        size="small"
        label={article}
        sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK, border: `1px solid ${SPA2_CREAM_DARK}` }}
      />
    </Stack>
  );
}

function PolCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <Card
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `0.5px solid ${SPA2_CREAM_DARK}`,
        boxShadow: 'none',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: SPA2_CREAM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1.5,
        }}
      >
        <Iconify icon={icon} width={19} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Typography sx={{ fontWeight: 600, fontSize: 13, color: SPA2_INK, mb: 0.75 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.65 }}>
        {desc}
      </Typography>
    </Card>
  );
}

function PolListItem({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      component="li"
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
      sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}
    >
      <Iconify
        icon="solar:check-circle-bold"
        width={16}
        sx={{ color: SPA2_TEAL, flexShrink: 0, mt: '3px' }}
      />
      <Typography component="span" sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.7 }}>
        {children}
      </Typography>
    </Stack>
  );
}

function TimelineStep({ title, desc, last }: { title: string; desc: string; last?: boolean }) {
  return (
    <Stack direction="row" spacing={2}>
      <Stack alignItems="center" sx={{ width: 28, flexShrink: 0 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            mt: '4px',
            flexShrink: 0,
          }}
        />
        {!last && <Box sx={{ width: 2, flex: 1, bgcolor: SPA2_CREAM_DARK, my: '4px' }} />}
      </Stack>
      <Box sx={{ pb: last ? 0 : 2.5 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 13, color: SPA2_INK, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: 'text.secondary', lineHeight: 1.65 }}>
          {desc}
        </Typography>
      </Box>
    </Stack>
  );
}

export function Spa2PolicyPageView() {
  const [activeTab, setActiveTab] = useState(0);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const scrollTo = (id: string, idx: number) => {
    setActiveTab(idx);
    document.getElementById(`pol-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          bgcolor: SPA2_CREAM,
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL_LIGHT,
            opacity: 0.1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            bgcolor: SPA2_TEAL,
            opacity: 0.07,
          }}
        />

        <Container sx={{ position: 'relative' }}>
          <Grid container spacing={5} alignItems="center">
            <Grid xs={12} md={7}>
              <Stack spacing={2}>
                {/* version badge */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                    bgcolor: 'common.white',
                    border: `1px solid ${SPA2_CREAM_DARK}`,
                    borderRadius: 99,
                    px: 1.5,
                    py: 0.5,
                    width: 'fit-content',
                  }}
                >
                  <Iconify icon="solar:clock-circle-bold" width={13} sx={{ color: SPA2_TEAL }} />
                  <Typography sx={{ fontSize: 12, color: SPA2_TEAL_DARK }}>
                    {spa2PolicyBanner.versionLabel}
                  </Typography>
                </Box>
                <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                  {spa2PolicyBanner.eyebrow.toUpperCase()}
                </Typography>
                <Typography variant="h1" sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1 }}>
                  {spa2PolicyBanner.titleLines.map((line, idx) => (
                    <Fragment key={line}>
                      {idx > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}
                >
                  {spa2PolicyBanner.subtitle}
                </Typography>
              </Stack>
            </Grid>
            <Grid xs={12} md={5}>
              <Grid container spacing={2}>
                {spa2PolicyBanner.highlights.map((item) => (
                  <Grid key={item.label} xs={6}>
                    <Spa2SoftCard sx={{ textAlign: 'center', py: 3 }}>
                      <Iconify icon={item.icon} width={32} sx={{ color: SPA2_TEAL, mb: 1 }} />
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_INK, mb: 0.5 }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>
                        {item.sub}
                      </Typography>
                    </Spa2SoftCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Sticky nav tabs ── */}
      <Box
        sx={{
          position: 'sticky',
          top: 64,
          zIndex: 10,
          bgcolor: 'background.default',
          borderBottom: `1px solid ${SPA2_CREAM_DARK}`,
          boxShadow: '0 2px 8px rgba(31,42,40,0.06)',
        }}
      >
        <Container>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL, height: 2.5 },
              '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
              minHeight: 50,
            }}
          >
            {spa2PolicyArticles.map((n, idx) => (
              <Tab
                key={n.id}
                label={n.label}
                icon={<Iconify icon={n.icon} width={15} />}
                iconPosition="start"
                onClick={() => scrollTo(n.id, idx)}
                sx={{
                  minHeight: 50,
                  fontSize: 13,
                  gap: 0.5,
                  textTransform: 'none',
                  color: 'text.secondary',
                }}
              />
            ))}
          </Tabs>
        </Container>
      </Box>

      {/* ── Policy content ── */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          {/* Alert bar */}
          <Alert
            severity="info"
            icon={<Iconify icon="solar:info-circle-bold" />}
            sx={{
              mb: 5,
              borderRadius: 3,
              bgcolor: '#EBF5FF',
              color: '#0C447C',
              '& .MuiAlert-icon': { color: '#378ADD' },
            }}
          >
            Chính sách này áp dụng cho tất cả dịch vụ và giao dịch tại Nature Spa kể từ ngày
            01/07/2026. Các chính sách cũ hơn không còn hiệu lực.
          </Alert>

          {/* ── Điều 1: Đặt lịch ── */}
          <Box id="pol-booking" sx={{ mb: 6, scrollMarginTop: 130 }}>
            <PolSectionHeader
              id=""
              icon="solar:calendar-bold"
              title="Chính sách đặt lịch"
              article="Điều 1"
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={12} sm={4}>
                <PolCard
                  icon="solar:clock-circle-bold"
                  title="Thời gian đặt trước"
                  desc="Ngày thường: tối thiểu 2 giờ. Cuối tuần & lễ: trước 1 ngày để có khung giờ đẹp."
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <PolCard
                  icon="solar:device-mobile-bold"
                  title="Kênh đặt lịch"
                  desc="Website, app, hotline 1900 6789, Zalo hoặc trực tiếp tại quầy lễ tân."
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <PolCard
                  icon="solar:bell-bold"
                  title="Xác nhận & nhắc lịch"
                  desc="SMS + email xác nhận trong 15 phút. Nhắc tự động 2 giờ trước giờ hẹn."
                />
              </Grid>
            </Grid>
            <Alert
              icon={<Iconify icon="solar:info-circle-bold" />}
              severity="info"
              sx={{
                borderRadius: 2.5,
                bgcolor: '#EBF5FF',
                color: '#0C447C',
                '& .MuiAlert-icon': { color: '#378ADD' },
              }}
            >
              Vui lòng đến trước 10 phút để hoàn tất thủ tục lễ tân và thư giãn trước khi vào liệu
              trình.
            </Alert>
          </Box>

          <Divider sx={{ mb: 5, borderColor: SPA2_CREAM_DARK }} />

          {/* ── Điều 2: Hủy / đổi lịch ── */}
          <Box id="pol-cancel" sx={{ mb: 6, scrollMarginTop: 130 }}>
            <PolSectionHeader
              id=""
              icon="solar:close-circle-bold"
              title="Chính sách hủy & đổi lịch"
              article="Điều 2"
            />
            <TableContainer
              component={Card}
              sx={{
                borderRadius: 3,
                border: `0.5px solid ${SPA2_CREAM_DARK}`,
                boxShadow: 'none',
                mb: 2,
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: SPA2_CREAM }}>
                    {['Thời điểm hủy', 'Phí hủy', 'Hoàn tiền', 'Đổi lịch'].map((h) => (
                      <TableCell
                        key={h}
                        sx={{ fontWeight: 600, color: SPA2_TEAL_DARK, fontSize: 13 }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    ['Trước 24 giờ', 'Miễn phí', true, true],
                    ['Trước 4–24 giờ', 'Miễn phí', true, '1 lần'],
                    ['Trong vòng 4 giờ', '20% giá dịch vụ', '80%', false],
                    ['Không đến (no-show)', '50% giá dịch vụ', false, false],
                  ].map(([time, fee, refund, change], i) => (
                    <TableRow
                      key={i}
                      sx={{
                        '&:last-child td': { border: 0 },
                        '&:hover td': { bgcolor: SPA2_CREAM },
                      }}
                    >
                      <TableCell sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                        {time as string}
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>
                        {fee as string}
                      </TableCell>
                      <TableCell>
                        {refund === true ? (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              sx={{ color: SPA2_TEAL }}
                              width={16}
                            />
                            <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>100%</Typography>
                          </Stack>
                        ) : refund === false ? (
                          <Iconify
                            icon="solar:close-circle-bold"
                            sx={{ color: 'error.main' }}
                            width={16}
                          />
                        ) : (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              sx={{ color: SPA2_TEAL }}
                              width={16}
                            />
                            <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>
                              {refund as string}
                            </Typography>
                          </Stack>
                        )}
                      </TableCell>
                      <TableCell>
                        {change === true ? (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              sx={{ color: SPA2_TEAL }}
                              width={16}
                            />
                            <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>
                              Không giới hạn
                            </Typography>
                          </Stack>
                        ) : change === false ? (
                          <Iconify
                            icon="solar:close-circle-bold"
                            sx={{ color: 'error.main' }}
                            width={16}
                          />
                        ) : (
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Iconify
                              icon="solar:check-circle-bold"
                              sx={{ color: SPA2_TEAL }}
                              width={16}
                            />
                            <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>
                              {change as string}
                            </Typography>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Alert
              icon={<Iconify icon="solar:danger-triangle-bold" />}
              severity="warning"
              sx={{ borderRadius: 2.5 }}
            >
              Trường hợp khẩn cấp có giấy tờ chứng minh (bệnh viện, tai nạn…) sẽ được miễn phí hủy
              lịch theo từng trường hợp cụ thể.
            </Alert>
          </Box>

          <Divider sx={{ mb: 5, borderColor: SPA2_CREAM_DARK }} />

          {/* ── Điều 3: Hoàn tiền ── */}
          <Box id="pol-refund" sx={{ mb: 6, scrollMarginTop: 130 }}>
            <PolSectionHeader
              id=""
              icon="solar:refresh-bold"
              title="Chính sách hoàn tiền"
              article="Điều 3"
            />
            <Box sx={{ mb: 3 }}>
              {[
                {
                  t: 'Gửi yêu cầu hoàn tiền',
                  d: 'Qua hotline, Zalo hoặc quầy lễ tân. Cần cung cấp mã đơn hàng và lý do cụ thể.',
                },
                {
                  t: 'Xét duyệt trong 24 giờ',
                  d: 'Bộ phận CSKH xem xét và thông báo kết quả qua SMS và email đã đăng ký.',
                },
                {
                  t: 'Hoàn tiền trong 3–7 ngày làm việc',
                  d: 'Chuyển khoản về tài khoản gốc hoặc cộng điểm thưởng (tùy chọn của khách hàng).',
                },
                {
                  t: 'Xác nhận hoàn tất',
                  d: 'Email xác nhận kèm biên lai điện tử gửi về địa chỉ đã đăng ký.',
                  last: true,
                },
              ].map((s, i) => (
                <TimelineStep key={i} title={s.t} desc={s.d} last={s.last} />
              ))}
            </Box>
            <Alert
              icon={<Iconify icon="solar:check-circle-bold" />}
              severity="success"
              sx={{ borderRadius: 2.5 }}
            >
              Gói chưa sử dụng: hoàn 100%. Đã dùng một phần: hoàn theo tỷ lệ buổi còn lại. Voucher
              khuyến mãi không hoàn tiền mặt nhưng có thể đổi sang dịch vụ cùng giá trị.
            </Alert>
          </Box>

          <Divider sx={{ mb: 5, borderColor: SPA2_CREAM_DARK }} />

          {/* ── Điều 4: Thành viên ── */}
          <Box id="pol-member" sx={{ mb: 6, scrollMarginTop: 130 }}>
            <PolSectionHeader
              id=""
              icon="solar:crown-bold"
              title="Chính sách thành viên"
              article="Điều 4"
            />
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                {
                  label: 'Thẻ Bạc',
                  color: '#B4B2A9',
                  textColor: '#5F5E5A',
                  perks: [
                    'Từ 0đ chi tiêu',
                    'Giảm 5% mọi dịch vụ',
                    'Quà sinh nhật 200K',
                    '1đ / 10.000đ',
                  ],
                },
                {
                  label: 'Thẻ Vàng',
                  color: '#EF9F27',
                  textColor: '#854F0B',
                  perks: [
                    'Từ 10 triệu đ',
                    'Giảm 10% + ưu tiên giờ',
                    'Quà sinh nhật 500K',
                    '2đ / 10K cuối tuần',
                  ],
                },
                {
                  label: 'Thẻ Bạch Kim',
                  color: '#7F77DD',
                  textColor: '#534AB7',
                  perks: [
                    'Từ 30 triệu đ',
                    'Giảm 15% + concierge',
                    'Quà sinh nhật 1 triệu đ',
                    '3đ / 10K tháng sinh nhật',
                  ],
                },
              ].map((tier) => (
                <Grid key={tier.label} xs={12} sm={4}>
                  <Card
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: `0.5px solid ${SPA2_CREAM_DARK}`,
                      borderTop: `3px solid ${tier.color}`,
                      boxShadow: 'none',
                      height: '100%',
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 14, color: tier.textColor, mb: 1.5 }}
                    >
                      {tier.label}
                    </Typography>
                    <Stack component="ul" sx={{ listStyle: 'none', gap: 0.75 }}>
                      {tier.perks.map((p) => (
                        <PolListItem key={p}>{p}</PolListItem>
                      ))}
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack component="ul" sx={{ listStyle: 'none', gap: 1 }}>
              <PolListItem>
                Thẻ có hiệu lực 24 tháng, gia hạn tự động khi còn giao dịch trong 12 tháng gần nhất.
              </PolListItem>
              <PolListItem>
                Điểm tích lũy: 10.000đ = 1 điểm. 1 điểm = 1.000đ khi giảm trừ hóa đơn hoặc đổi quà.
              </PolListItem>
              <PolListItem>
                Chuyển nhượng thẻ cho người thân tối đa 1 lần, cần xác nhận bằng văn bản tại quầy.
              </PolListItem>
            </Stack>
          </Box>

          <Divider sx={{ mb: 5, borderColor: SPA2_CREAM_DARK }} />

          {/* ── Điều 5: Bảo mật ── */}
          <Box id="pol-privacy" sx={{ mb: 6, scrollMarginTop: 130 }}>
            <PolSectionHeader
              id=""
              icon="solar:lock-bold"
              title="Chính sách bảo mật thông tin"
              article="Điều 5"
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={12} sm={6}>
                <PolCard
                  icon="solar:database-bold"
                  title="Dữ liệu thu thập"
                  desc="Họ tên, SĐT, email, lịch sử dịch vụ, tình trạng da. Không thu thập CCCD hay thông tin tài chính nhạy cảm."
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <PolCard
                  icon="solar:shield-bold"
                  title="Bảo vệ dữ liệu"
                  desc="Mã hóa AES-256, máy chủ tại Việt Nam, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân."
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <PolCard
                  icon="solar:eye-closed-bold"
                  title="Không chia sẻ"
                  desc="Không bán hoặc chia sẻ thông tin với bên thứ ba khi chưa có sự đồng ý bằng văn bản của khách hàng."
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <PolCard
                  icon="solar:camera-slash-bold"
                  title="Hình ảnh khách hàng"
                  desc="Ảnh trước/sau chỉ sử dụng khi có biên bản đồng thuận ký tay. Có thể rút lại sự đồng ý bất kỳ lúc nào."
                />
              </Grid>
            </Grid>

            {/* Consent checkbox */}
            <Card
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: SPA2_CREAM,
                border: `1px solid ${SPA2_CREAM_DARK}`,
                boxShadow: 'none',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    sx={{ color: SPA2_TEAL, '&.Mui-checked': { color: SPA2_TEAL } }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: privacyAgreed ? SPA2_TEAL_DARK : 'text.secondary',
                      lineHeight: 1.65,
                    }}
                  >
                    Tôi đã đọc và đồng ý với chính sách bảo mật thông tin của Nature Spa. Tôi hiểu
                    rằng mình có thể yêu cầu xóa dữ liệu bất kỳ lúc nào qua{' '}
                    <Link href="mailto:privacy@naturespa.vn" sx={{ color: SPA2_TEAL }}>
                      privacy@naturespa.vn
                    </Link>
                    .
                  </Typography>
                }
              />
            </Card>
          </Box>

          <Divider sx={{ mb: 5, borderColor: SPA2_CREAM_DARK }} />

          {/* ── Điều 6: Sản phẩm ── */}
          <Box id="pol-product" sx={{ mb: 6, scrollMarginTop: 130 }}>
            <PolSectionHeader
              id=""
              icon="solar:leaf-bold"
              title="Chính sách sản phẩm & nguyên liệu"
              article="Điều 6"
            />
            <Stack component="ul" sx={{ listStyle: 'none', gap: 1.5 }}>
              <PolListItem>
                100% nguyên liệu hữu cơ, không paraben, không cồn biến tính, không thử nghiệm trên
                động vật.
              </PolListItem>
              <PolListItem>
                Sản phẩm nhập khẩu có đầy đủ CO, CQ và giấy phép lưu hành tại Việt Nam do Bộ Y tế
                cấp.
              </PolListItem>
              <PolListItem>
                Kiểm định lô hàng mỗi 6 tháng bởi bên thứ ba độc lập (SGS Vietnam) — kết quả công
                khai trên website.
              </PolListItem>
              <PolListItem>
                An toàn cho da nhạy cảm, phụ nữ mang thai (từ tam cá nguyệt 2) và trẻ trên 12 tuổi.
              </PolListItem>
              <PolListItem>
                Thành phần và nguồn gốc từng sản phẩm công khai tại bảng thông tin trong phòng trị
                liệu.
              </PolListItem>
              <PolListItem>
                Bao bì tái chế 100%, giảm thiểu nhựa dùng một lần, phù hợp chứng nhận Eco-Spa quốc
                tế.
              </PolListItem>
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>
                Chứng nhận hiện có:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                {[
                  { label: 'FDA Certified', icon: 'solar:verified-check-bold' },
                  { label: 'CE Mark', icon: 'solar:shield-check-bold' },
                  { label: 'ISO 9001:2015', icon: 'solar:medal-star-bold' },
                  { label: 'Eco-Spa 2021', icon: 'solar:leaf-bold' },
                  { label: 'CIDESCO', icon: 'solar:diploma-bold' },
                ].map((c) => (
                  <Chip
                    key={c.label}
                    label={c.label}
                    icon={<Iconify icon={c.icon} width={14} />}
                    size="small"
                    sx={{
                      bgcolor: SPA2_CREAM,
                      color: SPA2_TEAL_DARK,
                      border: `1px solid ${SPA2_CREAM_DARK}`,
                      '& .MuiChip-icon': { color: SPA2_TEAL },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ mb: 5, borderColor: SPA2_CREAM_DARK }} />

          {/* ── Điều 7: Khiếu nại ── */}
          <Box id="pol-dispute" sx={{ mb: 6, scrollMarginTop: 130 }}>
            <PolSectionHeader
              id=""
              icon="solar:bill-list-bold"
              title="Chính sách khiếu nại & giải quyết tranh chấp"
              article="Điều 7"
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid xs={12} sm={4}>
                <PolCard
                  icon="solar:chat-unread-bold"
                  title="Gửi khiếu nại"
                  desc="Hotline, email care@naturespa.vn hoặc form online. Cung cấp mã đơn và mô tả sự việc."
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <PolCard
                  icon="solar:clock-circle-bold"
                  title="Xử lý trong 48 giờ"
                  desc="Phản hồi sơ bộ trong 4 giờ làm việc. Giải quyết triệt để trong 5 ngày làm việc."
                />
              </Grid>
              <Grid xs={12} sm={4}>
                <PolCard
                  icon="solar:balance-bold"
                  title="Phán quyết cuối cùng"
                  desc="Nếu không đạt thỏa thuận, tranh chấp giải quyết tại TAND TP.HCM theo pháp luật Việt Nam."
                />
              </Grid>
            </Grid>
            <Alert
              icon={<Iconify icon="solar:info-circle-bold" />}
              severity="info"
              sx={{
                borderRadius: 2.5,
                bgcolor: '#EBF5FF',
                color: '#0C447C',
                '& .MuiAlert-icon': { color: '#378ADD' },
              }}
            >
              Khách hàng được bảo lưu quyền khiếu nại trong <strong>30 ngày</strong> kể từ ngày xảy
              ra sự việc. Nature Spa cam kết xử lý mọi phản ánh một cách trung thực và thiện chí.
            </Alert>
          </Box>

          {/* ── Bottom CTA ── */}
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 5,
              bgcolor: SPA2_INK,
              color: 'common.white',
              display: 'flex',
              alignItems: { md: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
            }}
          >
            <Stack spacing={0.75}>
              <Typography variant="h5">Còn thắc mắc về chính sách?</Typography>
              <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                Đội ngũ pháp lý và CSKH luôn sẵn sàng giải đáp mọi vấn đề.
              </Typography>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ flexShrink: 0 }}>
              <Button
                href={`tel:${spa2ContactInfo.hotline.replace(/\s/g, '')}`}
                startIcon={<Iconify icon="solar:phone-bold" />}
                sx={{
                  borderRadius: 99,
                  px: 3,
                  py: 1.2,
                  bgcolor: SPA2_TEAL,
                  color: 'white',
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                }}
              >
                {spa2ContactInfo.hotline}
              </Button>
              <Button
                component={RouterLink}
                href={paths.spa2.contact}
                startIcon={<Iconify icon="solar:letter-bold" />}
                sx={{
                  borderRadius: 99,
                  px: 3,
                  py: 1.2,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' },
                }}
              >
                Gửi yêu cầu
              </Button>
            </Stack>
          </Card>

          {/* Last updated footer */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mt: 4, pt: 3, borderTop: `1px solid ${SPA2_CREAM_DARK}` }}
          >
            <Iconify icon="solar:clock-circle-linear" width={14} sx={{ color: 'text.disabled' }} />
            <Typography sx={{ fontSize: 12, color: 'text.disabled' }}>
              Tài liệu này được cập nhật lần cuối vào 01/07/2026 · Nature Spa © 2015–2026 · Mọi
              quyền được bảo lưu.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// ======================================================================
// 20. GALLERY
// ======================================================================
export function Spa2GalleryPageView() {
  return (
    <Spa2PageShell>
      <Spa2PageHero
        image={spa2GalleryBanner.image.url}
        imageStyle={spa2GalleryBanner.image}
        eyebrow={spa2GalleryBanner.eyebrow}
        title={spa2GalleryBanner.title}
        subtitle={spa2GalleryBanner.subtitle}
      />
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={2}>
            {spa2Gallery.map((src, idx) => (
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
    </Spa2PageShell>
  );
}
