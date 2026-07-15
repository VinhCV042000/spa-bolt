// ----------------------------------------------------------------------
// Shared mock data for spa2 view + dashboard management pages.
// Both consumers import from here so the two sides stay in sync.
// ----------------------------------------------------------------------

import { SPA2_IMAGES } from 'src/sections/spa2/spa2-data';

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

export type Spa2ServiceStatus = 'Đang hiển thị' | 'Bản nháp' | 'Ẩn';

export type Spa2ServiceCategory = {
  value: string;
  label: string;
};

export const SPA2_SERVICE_CATEGORIES: Spa2ServiceCategory[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'massage', label: 'Massage' },
  { value: 'facial', label: 'Facial' },
  { value: 'body', label: 'Body Care' },
  { value: 'couple', label: 'Spa Đôi' },
  { value: 'detox', label: 'Detox' },
];

export type Spa2ServiceStep = {
  id: string;
  title: string;
  desc: string;
};

export type Spa2BeforeAfter = {
  id: string;
  title: string;
  before: string;
  after: string;
  duration: string;
  note: string;
};

export type Spa2Feedback = {
  id: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
  comment: string;
  service: string;
};

export type Spa2Faq = {
  id: string;
  q: string;
  a: string;
};

export type Spa2ServiceItem = {
  id: string;
  slug: string;
  category: string;
  name: string;
  short: string;
  duration: string;
  price: number;
  image: string;
  icon: string;
  benefits: string[];
  status: Spa2ServiceStatus;
  steps: Spa2ServiceStep[];
  beforeAfters: Spa2BeforeAfter[];
  feedbacks: Spa2Feedback[];
  faqs: Spa2Faq[];
  gallery: string[];
};

const DEFAULT_STEPS = [
  { id: 's1', title: 'Tư vấn & thăm khám', desc: 'KTV đánh giá tình trạng da/cơ thể và tư vấn liệu trình phù hợp.' },
  { id: 's2', title: 'Làm sạch & chuẩn bị', desc: 'Tẩy trang, làm sạch sâu, xông hơi giúp lỗ chân lông giãn nở.' },
  { id: 's3', title: 'Thực hiện liệu trình chính', desc: 'Áp dụng kỹ thuật và sản phẩm chuyên biệt theo từng dịch vụ.' },
  { id: 's4', title: 'Phục hồi & dưỡng', desc: 'Đắp mặt nạ/dưỡng chất, massage thư giãn kết thúc liệu trình.' },
  { id: 's5', title: 'Tư vấn hậu phẫu', desc: 'Hướng dẫn chăm sóc tại nhà và lịch hẹn tái khám.' },
];

const DEFAULT_FAQS = [
  { id: 'f1', q: 'Tôi cần đặt lịch trước bao lâu?', a: 'Bạn nên đặt lịch trước ít nhất 2 giờ. Vào cuối tuần nên đặt trước 1 ngày để có khung giờ đẹp.' },
  { id: 'f2', q: 'Sản phẩm sử dụng có an toàn cho da nhạy cảm?', a: 'Chúng tôi sử dụng 100% nguyên liệu hữu cơ, không cồn, không paraben, an toàn cho cả da nhạy cảm và phụ nữ mang thai.' },
  { id: 'f3', q: 'Có hỗ trợ thanh toán trả góp không?', a: 'Có. Nature Spa hỗ trợ trả góp 0% qua thẻ tín dụng của 12 ngân hàng đối tác.' },
  { id: 'f4', q: 'Tôi có thể đổi/hủy lịch không?', a: 'Bạn có thể đổi hoặc hủy lịch miễn phí trước 4 giờ so với giờ hẹn.' },
];

const DEFAULT_FEEDBACKS = [
  { id: 'fb1', name: 'Minh Anh', role: 'Khách hàng VIP', rating: 5, avatar: 'https://i.pravatar.cc/150?img=11', comment: 'Không gian xanh mát, tinh dầu thơm dịu, kỹ thuật viên rất chuyên nghiệp.', service: 'Massage Thảo Dược' },
  { id: 'fb2', name: 'Thu Hà', role: 'Thành viên Premium', rating: 5, avatar: 'https://i.pravatar.cc/150?img=16', comment: 'Liệu trình rõ rệt sau 4 buổi. Da đều màu hơn, cảm thấy thư giãn tuyệt đối.', service: 'Facial Organic' },
  { id: 'fb3', name: 'Hoàng Nam', role: 'Khách hàng', rating: 4, avatar: 'https://i.pravatar.cc/150?img=33', comment: 'Dịch vụ tốt, không gian đẹp. Sẽ quay lại vào tháng sau.', service: 'Body Scrub & Wrap' },
];

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
];

const DEFAULT_BEFORE_AFTERS = [
  { id: 'ba1', title: 'Trị mụn – 8 buổi', before: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80', after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', duration: '2 tháng', note: 'Giảm 90% mụn viêm, da đều màu, lỗ chân lông se nhỏ.' },
  { id: 'ba2', title: 'Trẻ hóa da – 10 buổi', before: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80', after: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80', duration: '2 tháng', note: 'Nâng cơ, mờ nếp nhăn, da săn chắc tự nhiên.' },
];

export const SPA2_SERVICES: Spa2ServiceItem[] = [
  {
    id: '1',
    slug: 'herbal-massage',
    category: 'massage',
    name: 'Massage Thảo Dược',
    short: 'Thư giãn sâu với tinh dầu thảo mộc Việt.',
    duration: '60 phút',
    price: 690000,
    icon: 'solar:hand-stars-bold-duotone',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
    benefits: ['Giảm căng cơ', 'Lưu thông khí huyết', 'An thần dễ ngủ', 'Detox nhẹ'],
    status: 'Đang hiển thị',
    steps: DEFAULT_STEPS,
    beforeAfters: DEFAULT_BEFORE_AFTERS,
    feedbacks: DEFAULT_FEEDBACKS,
    faqs: DEFAULT_FAQS,
    gallery: DEFAULT_GALLERY,
  },
  {
    id: '2',
    slug: 'organic-facial',
    category: 'facial',
    name: 'Facial Organic',
    short: 'Cấp ẩm, phục hồi với nguyên liệu 100% hữu cơ.',
    duration: '75 phút',
    price: 890000,
    icon: 'solar:face-scan-circle-bold-duotone',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    benefits: ['Cấp ẩm chuyên sâu', 'Sáng da tự nhiên', 'Làm dịu mẩn đỏ', 'Giảm dấu hiệu lão hóa'],
    status: 'Đang hiển thị',
    steps: DEFAULT_STEPS,
    beforeAfters: DEFAULT_BEFORE_AFTERS,
    feedbacks: DEFAULT_FEEDBACKS,
    faqs: DEFAULT_FAQS,
    gallery: DEFAULT_GALLERY,
  },
  {
    id: '3',
    slug: 'body-scrub-wrap',
    category: 'body',
    name: 'Body Scrub & Wrap',
    short: 'Tẩy tế bào chết & ủ dưỡng toàn thân.',
    duration: '90 phút',
    price: 990000,
    icon: 'solar:body-bold-duotone',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    benefits: ['Da mịn màng', 'Săn chắc tự nhiên', 'Thải độc qua da', 'Mùi hương dễ chịu'],
    status: 'Đang hiển thị',
    steps: DEFAULT_STEPS,
    beforeAfters: DEFAULT_BEFORE_AFTERS,
    feedbacks: DEFAULT_FEEDBACKS,
    faqs: DEFAULT_FAQS,
    gallery: DEFAULT_GALLERY,
  },
  {
    id: '4',
    slug: 'aromatherapy',
    category: 'massage',
    name: 'Aromatherapy',
    short: 'Liệu pháp hương thơm Pháp – Nhật.',
    duration: '60 phút',
    price: 790000,
    icon: 'solar:leaf-bold-duotone',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
    benefits: ['Giảm stress', 'Cân bằng tinh thần', 'Cải thiện giấc ngủ'],
    status: 'Bản nháp',
    steps: DEFAULT_STEPS,
    beforeAfters: DEFAULT_BEFORE_AFTERS,
    feedbacks: DEFAULT_FEEDBACKS,
    faqs: DEFAULT_FAQS,
    gallery: DEFAULT_GALLERY,
  },
  {
    id: '5',
    slug: 'couples-spa',
    category: 'couple',
    name: 'Spa Đôi',
    short: 'Không gian riêng tư cho hai người.',
    duration: '120 phút',
    price: 1990000,
    icon: 'solar:heart-bold-duotone',
    image: 'https://plus.unsplash.com/premium_photo-1661574718355-82659c0c74cc?w=900&q=80',
    benefits: ['Phòng VIP riêng', 'Trà & trái cây', 'Bồn tắm hoa', 'Quà tặng cặp đôi'],
    status: 'Đang hiển thị',
    steps: DEFAULT_STEPS,
    beforeAfters: DEFAULT_BEFORE_AFTERS,
    feedbacks: DEFAULT_FEEDBACKS,
    faqs: DEFAULT_FAQS,
    gallery: DEFAULT_GALLERY,
  },
  {
    id: '6',
    slug: 'detox-cleanse',
    category: 'detox',
    name: 'Detox & Thanh Lọc',
    short: 'Chương trình thải độc cơ thể 3 ngày.',
    duration: '3 ngày',
    price: 4590000,
    icon: 'solar:magic-stick-3-bold-duotone',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    benefits: ['Thải độc gan', 'Giảm 1–3kg', 'Nâng cao đề kháng', 'Chuyên gia theo dõi'],
    status: 'Đang hiển thị',
    steps: DEFAULT_STEPS,
    beforeAfters: DEFAULT_BEFORE_AFTERS,
    feedbacks: DEFAULT_FEEDBACKS,
    faqs: DEFAULT_FAQS,
    gallery: DEFAULT_GALLERY,
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
