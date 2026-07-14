// ----------------------------------------------------------------------
// Shared mock data for spa2 view + dashboard management pages.
// Both consumers import from here so the two sides stay in sync.
// ----------------------------------------------------------------------

import { SPA2_IMAGES, SPA2_SERVICE_META } from 'src/sections/spa2/spa2-data';

// ---------- Singletons ---------------------------------------------------

export type Spa2HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaBook: string;
  ctaExplore: string;
  heroImage: string;
};

export const SPA2_HOME_CONTENT: Spa2HomeContent = {
  heroEyebrow: 'Nature Spa & Wellness',
  heroTitle: 'Thư giãn giữa lòng thiên nhiên',
  heroSubtitle:
    'Không gian spa hiện đại lấy cảm hứng từ thiên nhiên, mang đến trải nghiệm chăm sóc toàn diện cho cơ thể và tâm hồn.',
  ctaBook: 'Đặt lịch ngay',
  ctaExplore: 'Khám phá dịch vụ',
  heroImage: SPA2_IMAGES.hero,
};

export type Spa2AboutContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  features: { title: string; desc: string; icon: string }[];
};

export const SPA2_ABOUT_CONTENT: Spa2AboutContent = {
  eyebrow: 'Về Nature Spa',
  title: 'Không gian chữa lành từ thiên nhiên',
  description:
    'Chúng tôi kết hợp tinh hoa thảo dược truyền thống với kỹ thuật massage hiện đại, đem đến hành trình chăm sóc trọn vẹn cho từng khách hàng.',
  image: SPA2_IMAGES.about,
  features: [
    { title: 'Thảo dược tự nhiên', desc: '100% nguyên liệu hữu cơ', icon: 'solar:leaf-bold-duotone' },
    { title: 'Chuyên gia tận tâm', desc: 'Đội ngũ 10+ năm kinh nghiệm', icon: 'solar:heart-pulse-bold-duotone' },
    { title: 'Kỹ thuật độc quyền', desc: 'Liệu trình đã được kiểm chứng', icon: 'solar:magic-stick-3-bold-duotone' },
  ],
};

export type Spa2ContactContent = {
  title: string;
  subtitle: string;
  ctaBook: string;
  ctaCall: string;
  phone: string;
  email: string;
  address: string;
};

export const SPA2_CONTACT_CONTENT: Spa2ContactContent = {
  title: 'Sẵn sàng cho hành trình chăm sóc?',
  subtitle:
    'Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn liệu trình phù hợp nhất với bạn.',
  ctaBook: 'Đặt lịch ngay',
  ctaCall: 'Gọi hotline',
  phone: '0901 234 567',
  email: 'hello@naturespa.vn',
  address: 'Q1, TP.HCM',
};

export type Spa2AccountContent = {
  greetingTitle: string;
  greetingSubtitle: string;
  defaultAvatar: string;
  menuItems: { key: string; label: string; icon: string }[];
};

export const SPA2_ACCOUNT_CONTENT: Spa2AccountContent = {
  greetingTitle: 'Xin chào, Khách hàng',
  greetingSubtitle: 'Quản lý thông tin cá nhân, đặt lịch và ưu đãi của bạn.',
  defaultAvatar: 'https://i.pravatar.cc/200?img=32',
  menuItems: [
    { key: 'profile', label: 'Hồ sơ', icon: 'solar:user-bold-duotone' },
    { key: 'bookings', label: 'Lịch đặt', icon: 'solar:calendar-bold-duotone' },
    { key: 'favorites', label: 'Yêu thích', icon: 'solar:heart-bold-duotone' },
    { key: 'rewards', label: 'Ưu đãi', icon: 'solar:gift-bold-duotone' },
  ],
};

// ---------- Collections --------------------------------------------------

export type Spa2ServiceItem = {
  slug: string;
  title: string;
  desc: string;
  duration: string;
  price: number;
  image: string;
  icon: string;
  benefits: string[];
  status: 'Đang hiển thị' | 'Bản nháp' | 'Ẩn';
};

export const SPA2_SERVICES: Spa2ServiceItem[] = [
  {
    slug: 'signature-massage',
    title: 'Signature Herbal Massage',
    desc: 'Massage toàn thân bằng thảo dược tươi, giúp lưu thông khí huyết và giải toả căng thẳng sâu.',
    duration: '90 phút',
    price: 1290000,
    image: SPA2_SERVICE_META[0].image,
    icon: SPA2_SERVICE_META[0].icon,
    benefits: ['Giảm căng cơ', 'Cân bằng năng lượng', 'Ngủ ngon hơn'],
    status: 'Đang hiển thị',
  },
  {
    slug: 'radiance-facial',
    title: 'Radiance Facial',
    desc: 'Chăm sóc da chuyên sâu với vitamin C và collagen thiên nhiên cho làn da rạng rỡ tức thì.',
    duration: '75 phút',
    price: 890000,
    image: SPA2_SERVICE_META[1].image,
    icon: SPA2_SERVICE_META[1].icon,
    benefits: ['Sáng da', 'Cấp ẩm sâu', 'Se khít lỗ chân lông'],
    status: 'Đang hiển thị',
  },
  {
    slug: 'body-detox',
    title: 'Body Detox Ritual',
    desc: 'Nghi thức thanh lọc cơ thể với muối biển và tinh dầu, giúp đào thải độc tố hiệu quả.',
    duration: '120 phút',
    price: 1690000,
    image: SPA2_SERVICE_META[2].image,
    icon: SPA2_SERVICE_META[2].icon,
    benefits: ['Detox', 'Săn chắc da', 'Thư giãn'],
    status: 'Đang hiển thị',
  },
  {
    slug: 'green-tea-ritual',
    title: 'Green Tea Ritual',
    desc: 'Liệu trình từ trà xanh chống oxy hoá, phục hồi và trẻ hoá làn da.',
    duration: '90 phút',
    price: 1190000,
    image: SPA2_SERVICE_META[3].image,
    icon: SPA2_SERVICE_META[3].icon,
    benefits: ['Chống lão hoá', 'Phục hồi', 'Se khít'],
    status: 'Bản nháp',
  },
  {
    slug: 'couple-escape',
    title: 'Couple Escape',
    desc: 'Trải nghiệm dành riêng cho cặp đôi trong phòng VIP với dịch vụ trọn gói.',
    duration: '150 phút',
    price: 2890000,
    image: SPA2_SERVICE_META[4].image,
    icon: SPA2_SERVICE_META[4].icon,
    benefits: ['Không gian riêng', 'Rượu vang', 'Quà tặng'],
    status: 'Đang hiển thị',
  },
  {
    slug: 'zen-mind',
    title: 'Zen Mind Meditation',
    desc: 'Kết hợp thiền, hương liệu và âm thanh chữa lành để tái tạo năng lượng tinh thần.',
    duration: '60 phút',
    price: 590000,
    image: SPA2_SERVICE_META[5].image,
    icon: SPA2_SERVICE_META[5].icon,
    benefits: ['Tĩnh tâm', 'Giảm stress', 'Cải thiện tập trung'],
    status: 'Đang hiển thị',
  },
];

export type Spa2BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  publishedAt: string;
  tags: string[];
  content: string;
  status: 'Đã đăng' | 'Bản nháp' | 'Chờ duyệt';
};

export const SPA2_POSTS: Spa2BlogPost[] = [
  {
    slug: 'ritual-thu-gian-cuoi-tuan',
    title: 'Nghi thức thư giãn cuối tuần tại nhà',
    excerpt: '5 bước đơn giản để tạo không gian spa tại nhà cho những ngày cuối tuần.',
    cover: SPA2_IMAGES.gallery1,
    author: 'Dr. Linh',
    publishedAt: '2025-02-14',
    tags: ['thư giãn', 'self-care'],
    content: 'Chuẩn bị không gian, chọn tinh dầu phù hợp, kết hợp âm nhạc và tắm nước ấm...',
    status: 'Đã đăng',
  },
  {
    slug: 'cham-soc-da-mua-lanh',
    title: 'Chăm sóc da mùa lạnh đúng cách',
    excerpt: 'Bí quyết giữ ẩm và bảo vệ da trong những ngày nhiệt độ giảm sâu.',
    cover: SPA2_IMAGES.gallery2,
    author: 'Dr. Han',
    publishedAt: '2025-01-20',
    tags: ['skincare', 'mùa lạnh'],
    content: 'Uống đủ nước, dùng kem dưỡng có ceramide, tránh nước quá nóng khi tắm...',
    status: 'Đã đăng',
  },
  {
    slug: 'thao-duoc-viet-trong-spa',
    title: 'Thảo dược Việt trong liệu trình spa',
    excerpt: 'Khám phá những loại thảo dược bản địa đang được các spa cao cấp ưa chuộng.',
    cover: SPA2_IMAGES.gallery3,
    author: 'Master Trang',
    publishedAt: '2025-02-05',
    tags: ['thảo dược', 'văn hoá'],
    content: 'Ngải cứu, sả, gừng, quế... mỗi loại mang một giá trị chữa lành riêng.',
    status: 'Chờ duyệt',
  },
  {
    slug: 'yoga-va-spa',
    title: 'Kết hợp Yoga và Spa để tái tạo năng lượng',
    excerpt: 'Vì sao ngày càng nhiều người chọn combo Yoga + Spa cho sức khoẻ toàn diện.',
    cover: SPA2_IMAGES.gallery4,
    author: 'Coach Minh',
    publishedAt: '2025-02-20',
    tags: ['yoga', 'wellness'],
    content: 'Yoga làm mềm cơ thể, spa giúp phục hồi — sự kết hợp hoàn hảo cho một buổi cuối tuần.',
    status: 'Bản nháp',
  },
];

// ---------- Helpers ------------------------------------------------------

export function findSpa2Service(slug: string) {
  return SPA2_SERVICES.find((s) => s.slug === slug);
}
export function findSpa2Post(slug: string) {
  return SPA2_POSTS.find((p) => p.slug === slug);
}
