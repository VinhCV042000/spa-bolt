// ----------------------------------------------------------------------
// Shared mock data for spa2 view + dashboard management pages.
//
// This is the single source of truth for ALL spa2 sample/demo content.
// src/sections/spa2/spa2-pages-data.ts (public view) and
// src/api/spa2/mock/index.ts (dashboard API mock) both read from here so
// the two sides stay in sync.
//
// IMPORTANT: this file must never import from src/sections/spa2 — doing so
// previously created an import cycle (spa2-pages-data <-> _mock/_spa2).
// ----------------------------------------------------------------------

// ---------- Page imagery & UI meta ---------------------------------------

export const SPA2_PAGE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80',
  services: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&q=80',
  service1: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  service2: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  service3: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  service4: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  service5: 'https://plus.unsplash.com/premium_photo-1661574718355-82659c0c74cc?w=600&q=80',
  serviceDetails: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=1600&q=80',
  training: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
  blog: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80',
  careers: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&q=80',
  booking: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
  contact: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1600&q=80',
  offers: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=80',
  feedback: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1600&q=80',
  promotions: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80',
  branches: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80',
  account: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&q=80',
  partners: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80',
  treatments: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1600&q=80',
  beforeAfter: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=1600&q=80',
  faq: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=80',
  policy: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
  gallery: 'https://images.unsplash.com/photo-1531112068337-3cd6d0d2b56b?w=1600&q=80',
  gallery1: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
  gallery2: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80',
  gallery3: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  gallery4: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  membership: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1600&q=80',
  giftCard: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&q=80',
  wellnessPackage: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=80',
  skinQuiz: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=80',
  corporate: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80',
  shop: 'https://images.unsplash.com/photo-1531112068337-3cd6d0d2b56b?w=1600&q=80',
};

export const SPA2_SERVICE_META = [
  { icon: 'solar:hand-stars-bold-duotone', image: SPA2_PAGE_IMAGES.service1 },
  { icon: 'solar:face-scan-circle-bold-duotone', image: SPA2_PAGE_IMAGES.service2 },
  { icon: 'solar:body-bold-duotone', image: SPA2_PAGE_IMAGES.service3 },
  { icon: 'solar:leaf-bold-duotone', image: SPA2_PAGE_IMAGES.service4 },
  { icon: 'solar:heart-bold-duotone', image: SPA2_PAGE_IMAGES.service5 },
  { icon: 'solar:magic-stick-3-bold-duotone', image: SPA2_PAGE_IMAGES.service1 },
];

export const SPA2_TESTIMONIAL_META = [
  { rating: 5, avatar: 'https://i.pravatar.cc/150?img=11' },
  { rating: 5, avatar: 'https://i.pravatar.cc/150?img=16' },
  { rating: 4, avatar: 'https://i.pravatar.cc/150?img=23' },
  { rating: 5, avatar: 'https://i.pravatar.cc/150?img=32' },
];

export const SPA2_PACKAGE_META = [
  { price: 790000, popular: false },
  { price: 1490000, popular: true },
  { price: 2690000, popular: false },
];

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
  heroImage: SPA2_PAGE_IMAGES.hero,
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

// ---------- Account banner (view + dashboard shared) ------------------------

export type Spa2AccountBanner = Spa2PageBanner;

export const spa2AccountBanner: Spa2AccountBanner = {
  image: { url: SPA2_PAGE_IMAGES.account, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Tài khoản',
  title: 'Khu vực thành viên',
  subtitle: 'Quản lý lịch hẹn, điểm thưởng và liệu trình của bạn.',
};

export type Spa2Appointment = {
  date: string;
  time: string;
  service: string;
  branch: string;
};

export type Spa2AccountContent = {
  memberName: string;
  avatar: string;
  membershipTier: string;
  loyaltyPoints: number;
  sessionsUsed: number;
  sessionsTotal: number;
  appointments: Spa2Appointment[];
};

export const SPA2_ACCOUNT_CONTENT: Spa2AccountContent = {
  memberName: 'Lê Minh Anh',
  avatar: 'https://i.pravatar.cc/200?img=11',
  membershipTier: 'Thẻ Gold',
  loyaltyPoints: 3250,
  sessionsUsed: 6,
  sessionsTotal: 10,
  appointments: [
    { date: '02/07', time: '15:00', service: 'Facial Organic', branch: 'Q1, TP.HCM' },
    { date: '12/07', time: '10:30', service: 'Massage Thảo Dược', branch: 'Q1, TP.HCM' },
    { date: '24/07', time: '18:00', service: 'Detox Day 1/3', branch: 'Q1, TP.HCM' },
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

export const spa2ServiceCategories = SPA2_SERVICE_CATEGORIES;

export const spa2ServiceSteps = [
  {
    id: 1,
    title: 'Tư vấn & thăm khám',
    desc: 'KTV đánh giá tình trạng da/cơ thể và tư vấn liệu trình phù hợp.',
  },
  {
    id: 2,
    title: 'Làm sạch & chuẩn bị',
    desc: 'Tẩy trang, làm sạch sâu, xông hơi giúp lỗ chân lông giãn nở.',
  },
  {
    id: 3,
    title: 'Thực hiện liệu trình chính',
    desc: 'Áp dụng kỹ thuật và sản phẩm chuyên biệt theo từng dịch vụ.',
  },
  {
    id: 4,
    title: 'Phục hồi & dưỡng',
    desc: 'Đắp mặt nạ/dưỡng chất, massage thư giãn kết thúc liệu trình.',
  },
  {
    id: 5,
    title: 'Tư vấn chăm sóc tại nhà',
    desc: 'Hướng dẫn duy trì kết quả và lịch tái khám phù hợp.',
  },
];

export type Spa2ServiceStep = {
  id: string;
  title: string;
  desc: string;
};
export type Spa2BeforeAfterStatus = 'pending' | 'approved' | 'rejected';

export type Spa2BeforeAfter = {
  id: string;
  title: string;
  before: string;
  after: string;
  duration: string;
  note: string;
  status: Spa2BeforeAfterStatus;
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
  cat: string;
  icon: string;
  tag: string;
  q: string;
  a: string;
  published: boolean;
  /** Helpful-vote counters shown in the FAQ manage view's stats tab. */
  likes: number;
  dislikes: number;
};

export type Spa2ServiceItem = {
  id: string;
  slug: string;
  category: string;
  name: string;
  short: string;
  /** HTML string produced by the rich-text editor; rendered verbatim on the public page. */
  description: string;
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
  {
    id: 's1',
    title: 'Tư vấn & thăm khám',
    desc: 'KTV đánh giá tình trạng da/cơ thể và tư vấn liệu trình phù hợp.',
  },
  {
    id: 's2',
    title: 'Làm sạch & chuẩn bị',
    desc: 'Tẩy trang, làm sạch sâu, xông hơi giúp lỗ chân lông giãn nở.',
  },
  {
    id: 's3',
    title: 'Thực hiện liệu trình chính',
    desc: 'Áp dụng kỹ thuật và sản phẩm chuyên biệt theo từng dịch vụ.',
  },
  {
    id: 's4',
    title: 'Phục hồi & dưỡng',
    desc: 'Đắp mặt nạ/dưỡng chất, massage thư giãn kết thúc liệu trình.',
  },
  { id: 's5', title: 'Tư vấn hậu phẫu', desc: 'Hướng dẫn chăm sóc tại nhà và lịch hẹn tái khám.' },
];

const DEFAULT_FAQS = [
  {
    id: 'f1',
    q: 'Tôi cần đặt lịch trước bao lâu?',
    a: 'Bạn nên đặt lịch trước ít nhất 2 giờ. Vào cuối tuần nên đặt trước 1 ngày để có khung giờ đẹp.',
    published: true,
    cat: 'booking',
    icon: 'solar:calendar-bold-duotone',
    tag: 'Booking',
    likes: 0,
    dislikes: 0,
  },
  {
    id: 'f2',
    q: 'Sản phẩm sử dụng có an toàn cho da nhạy cảm?',
    a: 'Chúng tôi sử dụng 100% nguyên liệu hữu cơ, không cồn, không paraben, an toàn cho cả da nhạy cảm và phụ nữ mang thai.',
    published: true,
    cat: 'product',
    icon: 'solar:leaf-bold-duotone',
    tag: 'Product',
    likes: 0,
    dislikes: 0,
  },
  {
    id: 'f3',
    q: 'Có hỗ trợ thanh toán trả góp không?',
    a: 'Có. Nature Spa hỗ trợ trả góp 0% qua thẻ tín dụng của 12 ngân hàng đối tác.',
    published: true,
    cat: 'payment',
    icon: 'solar:wallet-bold-duotone',
    tag: 'Payment',
    likes: 0,
    dislikes: 0,
  },
  {
    id: 'f4',
    q: 'Tôi có thể đổi/hủy lịch không?',
    a: 'Bạn có thể đổi hoặc hủy lịch miễn phí trước 4 giờ so với giờ hẹn.',
    published: true,
    cat: 'booking',
    icon: 'solar:calendar-bold-duotone',
    tag: 'Booking',
    likes: 1,
    dislikes: 0,
  },
];

const DEFAULT_FEEDBACKS = [
  {
    id: 'fb1',
    name: 'Minh Anh',
    role: 'Khách hàng VIP',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=11',
    comment: 'Không gian xanh mát, tinh dầu thơm dịu, kỹ thuật viên rất chuyên nghiệp.',
    service: 'Massage Thảo Dược',
  },
  {
    id: 'fb2',
    name: 'Thu Hà',
    role: 'Thành viên Premium',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=16',
    comment: 'Liệu trình rõ rệt sau 4 buổi. Da đều màu hơn, cảm thấy thư giãn tuyệt đối.',
    service: 'Facial Organic',
  },
  {
    id: 'fb3',
    name: 'Hoàng Nam',
    role: 'Khách hàng',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=33',
    comment: 'Dịch vụ tốt, không gian đẹp. Sẽ quay lại vào tháng sau.',
    service: 'Body Scrub & Wrap',
  },
];

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
];

const DEFAULT_BEFORE_AFTERS: Spa2BeforeAfter[] = [
  {
    id: 'ba1',
    title: 'Trị mụn – 8 buổi',
    before: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    duration: '2 tháng',
    note: 'Giảm 90% mụn viêm, da đều màu, lỗ chân lông se nhỏ.',
    status: 'approved',
  },
  {
    id: 'ba2',
    title: 'Trẻ hóa da – 10 buổi',
    before: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    duration: '2 tháng',
    note: 'Nâng cơ, mờ nếp nhăn, da săn chắc tự nhiên.',
    status: 'approved',
  },
];

export const SPA2_SERVICES: Spa2ServiceItem[] = [
  {
    id: '1',
    slug: 'herbal-massage',
    category: 'massage',
    name: 'Massage Thảo Dược',
    short: 'Thư giãn sâu với tinh dầu thảo mộc Việt.',
    description:
      '<p>Liệu trình Massage Thảo Dược kết hợp kỹ thuật bấm huyệt cổ truyền với tinh dầu chiết xuất từ sả, gừng và ngải cứu Việt Nam, giúp đả thông khí huyết và giải phóng căng cơ tích tụ sau nhiều ngày làm việc.</p>' +
      '<p>Kỹ thuật viên sẽ điều chỉnh lực tay theo thể trạng từng khách, ưu tiên các vùng vai, gáy và lưng dưới — nơi thường chịu áp lực nhiều nhất.</p>' +
      '<p>Kết thúc liệu trình, cơ thể được thư giãn toàn diện, tinh thần nhẹ nhõm và giấc ngủ sâu hơn trong những ngày tiếp theo.</p>',
    duration: '60 phút',
    price: 690000,
    icon: SPA2_SERVICE_META[0].icon,
    image: SPA2_SERVICE_META[0].image,
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
    description:
      '<p>Facial Organic sử dụng dưỡng chất chiết xuất từ nha đam, trà xanh và mật ong nguyên chất để làm sạch sâu, cấp ẩm và phục hồi hàng rào bảo vệ da tự nhiên.</p>' +
      '<p>Quy trình bao gồm tẩy tế bào chết nhẹ nhàng, xông hơi thảo dược và đắp mặt nạ theo từng loại da, giúp làm dịu các dấu hiệu kích ứng và mẩn đỏ.</p>' +
      '<p>Sau liệu trình, da sáng khỏe hơn rõ rệt, đều màu và mềm mại tự nhiên mà không cần trang điểm.</p>',
    duration: '75 phút',
    price: 890000,
    icon: SPA2_SERVICE_META[1].icon,
    image: SPA2_SERVICE_META[1].image,
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
    description:
      '<p>Body Scrub & Wrap bắt đầu bằng bước tẩy tế bào chết toàn thân bằng muối biển và cà phê rang xay, loại bỏ lớp da chết và kích thích tuần hoàn máu dưới da.</p>' +
      '<p>Tiếp theo, cơ thể được ủ dưỡng với hỗn hợp bùn khoáng và tinh dầu thiên nhiên trong khoảng 20 phút, giúp thẩm thấu dưỡng chất sâu vào từng lớp da.</p>' +
      '<p>Liệu trình khép lại với bước massage nhẹ nhàng, mang lại làn da mịn màng, săn chắc và một mùi hương dễ chịu lưu lại suốt cả ngày.</p>',
    duration: '90 phút',
    price: 990000,
    icon: SPA2_SERVICE_META[2].icon,
    image: SPA2_SERVICE_META[2].image,
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
    description:
      '<p>Aromatherapy kết hợp tinh dầu nhập khẩu từ Pháp và Nhật Bản, được pha chế riêng theo nhu cầu thư giãn hoặc phục hồi năng lượng của từng khách hàng.</p>' +
      '<p>Hương thơm lan tỏa trong suốt liệu trình giúp cân bằng hệ thần kinh, giảm căng thẳng và cải thiện chất lượng giấc ngủ về đêm.</p>' +
      '<p>Đây là lựa chọn lý tưởng cho những ai thường xuyên chịu áp lực công việc và cần một khoảng lặng để tái tạo tinh thần.</p>',
    duration: '60 phút',
    price: 790000,
    icon: SPA2_SERVICE_META[3].icon,
    image: SPA2_SERVICE_META[3].image,
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
    description:
      '<p>Spa Đôi mang đến một không gian riêng tư, ấm cúng dành cho hai người — lý tưởng cho các cặp đôi hoặc bạn bè muốn cùng nhau tận hưởng giây phút thư giãn.</p>' +
      '<p>Liệu trình bao gồm massage song song, ngâm bồn hoa và thưởng thức trà thảo mộc cùng trái cây tươi trong không gian được thiết kế riêng biệt.</p>' +
      '<p>Kết thúc buổi trải nghiệm, mỗi khách còn nhận được một món quà nhỏ như lời tri ân từ Nature Spa.</p>',
    duration: '120 phút',
    price: 1990000,
    icon: SPA2_SERVICE_META[4].icon,
    image: SPA2_SERVICE_META[4].image,
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
    description:
      '<p>Detox & Thanh Lọc là chương trình 3 ngày kết hợp chế độ dinh dưỡng thanh lọc, liệu pháp xông hơi thảo dược và massage bụng chuyên biệt nhằm hỗ trợ gan và hệ tiêu hóa.</p>' +
      '<p>Chuyên gia dinh dưỡng theo sát từng khách hàng trong suốt chương trình, điều chỉnh thực đơn detox phù hợp với thể trạng và mục tiêu cá nhân.</p>' +
      '<p>Sau 3 ngày, cơ thể nhẹ nhàng hơn, làn da tươi sáng và tinh thần tràn đầy năng lượng để bắt đầu một chu kỳ sống lành mạnh mới.</p>',
    duration: '3 ngày',
    price: 4590000,
    icon: SPA2_SERVICE_META[5].icon,
    image: SPA2_SERVICE_META[5].image,
    benefits: ['Thải độc gan', 'Giảm 1–3kg', 'Nâng cao đề kháng', 'Chuyên gia theo dõi'],
    status: 'Đang hiển thị',
    steps: DEFAULT_STEPS,
    beforeAfters: DEFAULT_BEFORE_AFTERS,
    feedbacks: DEFAULT_FEEDBACKS,
    faqs: DEFAULT_FAQS,
    gallery: DEFAULT_GALLERY,
  },
];

export const spa2Services = SPA2_SERVICES;

export type Spa2BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  coverFocalX?: number;
  coverFocalY?: number;
  coverZoom?: number;
  author: string;
  /** ISO date (yyyy-mm-dd), used for sorting & the editor date input */
  publishedAt: string;
  /** Localised display date (dd/mm/yyyy) used by the public blog */
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  /** HTML string produced by the rich-text editor; rendered verbatim on the public page. */
  content: string;
  status: 'Đã đăng' | 'Bản nháp' | 'Chờ duyệt';
};

export type Spa2BlogCategory = { name: string; count: number };

// Canonical, fixed list of blog categories offered in every category <select>
// (admin quick-dialog, full editor). Post counts are always derived from the
// live post list via `computeSpa2BlogCategories`, never hardcoded, so the
// public sidebar and the admin sidebar can never drift out of sync.
export const SPA2_BLOG_CATEGORY_NAMES = ['Aromatherapy', 'Skincare', 'Wellness', 'Mindfulness'];

export function computeSpa2BlogCategories(posts: Spa2BlogPost[]): Spa2BlogCategory[] {
  return SPA2_BLOG_CATEGORY_NAMES.map((name) => ({
    name,
    count: posts.filter((p) => p.category === name).length,
  }));
}

export const SPA2_POSTS: Spa2BlogPost[] = [
  {
    slug: 'ritual-thu-gian-cuoi-tuan',
    title: 'Nghi thức thư giãn cuối tuần tại nhà',
    excerpt: '5 bước đơn giản để tạo không gian spa tại nhà cho những ngày cuối tuần.',
    cover: SPA2_PAGE_IMAGES.gallery1,
    author: 'Dr. Linh',
    publishedAt: '2025-02-14',
    date: '14/02/2025',
    category: 'Aromatherapy',
    readTime: '5 phút',
    tags: ['thư giãn', 'self-care'],
    content:
      '<p>Chăm sóc bản thân không cần phải cầu kỳ hay tốn kém — chỉ cần một góc nhỏ yên tĩnh và vài nguyên liệu quen thuộc, bạn đã có thể tạo ra một buổi trị liệu tại gia trọn vẹn.</p>' +
      '<h3>1. Chuẩn bị không gian</h3>' +
      '<p>Dọn dẹp một góc phòng, tắt bớt đèn, thắp nến thơm hoặc đốt tinh dầu để tạo cảm giác thư thái ngay từ những phút đầu tiên.</p>' +
      '<h3>2. Chọn tinh dầu phù hợp</h3>' +
      '<p>Oải hương giúp an thần, cam bergamot giúp cân bằng cảm xúc, còn khuynh diệp giúp thông thoáng hô hấp — hãy chọn loại phù hợp với nhu cầu của bạn.</p>' +
      '<blockquote>“Chỉ 15–20 phút mỗi tuần cũng đủ để cơ thể và tâm trí được tái tạo.”</blockquote>' +
      '<p>Kết hợp thêm một bản nhạc nhẹ và một bồn nước ấm, nghi thức cuối tuần của bạn đã hoàn chỉnh.</p>',
    status: 'Đã đăng',
  },
  {
    slug: 'cham-soc-da-mua-lanh',
    title: 'Chăm sóc da mùa lạnh đúng cách',
    excerpt: 'Bí quyết giữ ẩm và bảo vệ da trong những ngày nhiệt độ giảm sâu.',
    cover: SPA2_PAGE_IMAGES.gallery2,
    author: 'Dr. Han',
    publishedAt: '2025-01-20',
    date: '20/01/2025',
    category: 'Skincare',
    readTime: '7 phút',
    tags: ['skincare', 'mùa lạnh'],
    content:
      '<p>Không khí hanh khô mùa lạnh khiến làn da dễ mất nước và bong tróc hơn bình thường. Một vài điều chỉnh nhỏ trong thói quen chăm sóc da có thể tạo khác biệt lớn.</p>' +
      '<h3>Uống đủ nước từ bên trong</h3>' +
      '<p>Duy trì 1.5–2 lít nước mỗi ngày giúp da giữ được độ đàn hồi tự nhiên, ngay cả khi thời tiết hanh khô.</p>' +
      '<h3>Chọn kem dưỡng có ceramide</h3>' +
      '<p>Ceramide giúp củng cố hàng rào bảo vệ da, hạn chế mất nước qua biểu bì — nên ưu tiên trong các sản phẩm dưỡng ẩm mùa lạnh.</p>' +
      '<p>Tránh tắm nước quá nóng và hạn chế tẩy tế bào chết quá thường xuyên để da không bị kích ứng thêm.</p>',
    status: 'Đã đăng',
  },
  {
    slug: 'thao-duoc-viet-trong-spa',
    title: 'Thảo dược Việt trong liệu trình spa',
    excerpt: 'Khám phá những loại thảo dược bản địa đang được các spa cao cấp ưa chuộng.',
    cover: SPA2_PAGE_IMAGES.gallery3,
    author: 'Master Trang',
    publishedAt: '2025-02-05',
    date: '05/02/2025',
    category: 'Wellness',
    readTime: '6 phút',
    tags: ['thảo dược', 'văn hoá'],
    content:
      '<p>Ngải cứu, sả, gừng, quế... mỗi loại thảo dược bản địa đều mang một giá trị chữa lành riêng, được cha ông ta sử dụng từ hàng trăm năm nay.</p>' +
      '<h3>Ngải cứu — làm ấm và giảm đau nhức</h3>' +
      '<p>Thường dùng trong các liệu trình chườm nóng, giúp thư giãn cơ bắp và lưu thông khí huyết.</p>' +
      '<h3>Sả & gừng — thanh lọc và giữ ấm cơ thể</h3>' +
      '<p>Kết hợp trong xông hơi hoặc ngâm chân, giúp cơ thể ấm lên và tinh thần sảng khoái hơn.</p>',
    status: 'Chờ duyệt',
  },
  {
    slug: 'yoga-va-spa',
    title: 'Kết hợp Yoga và Spa để tái tạo năng lượng',
    excerpt: 'Vì sao ngày càng nhiều người chọn combo Yoga + Spa cho sức khoẻ toàn diện.',
    cover: SPA2_PAGE_IMAGES.gallery4,
    author: 'Coach Minh',
    publishedAt: '2025-02-20',
    date: '20/02/2025',
    category: 'Mindfulness',
    readTime: '8 phút',
    tags: ['yoga', 'wellness'],
    content:
      '<p>Yoga làm mềm cơ thể, spa giúp phục hồi — sự kết hợp hoàn hảo cho một buổi cuối tuần tái tạo năng lượng toàn diện.</p>' +
      '<h3>Yoga chuẩn bị cơ thể</h3>' +
      '<p>Các động tác kéo giãn nhẹ nhàng giúp cơ bắp thả lỏng, sẵn sàng đón nhận liệu trình massage sâu hơn.</p>' +
      '<h3>Spa hoàn thiện quá trình phục hồi</h3>' +
      '<p>Sau buổi tập, một liệu trình massage hoặc xông hơi giúp đào thải axit lactic, giảm đau nhức và cải thiện giấc ngủ.</p>',
    status: 'Bản nháp',
  },
];

// Legacy aliases for the public spa2 view code (kept for backwards-compat).
export const spa2BlogPosts = SPA2_POSTS;
export const SPA2_BLOG_CATEGORIES: Spa2BlogCategory[] = computeSpa2BlogCategories(SPA2_POSTS);
export const spa2BlogCategories = SPA2_BLOG_CATEGORIES;

// ---------- Helpers ------------------------------------------------------

export function findSpa2Service(slug: string) {
  return SPA2_SERVICES.find((s) => s.slug === slug);
}
export function findSpa2Post(slug: string) {
  return SPA2_POSTS.find((p) => p.slug === slug);
}

// Mutators that write straight into the shared `SPA2_POSTS` array so the
// admin list, the admin editor, and the public blog pages always agree on
// the same in-memory data for the current session (no separate copies).
export function spa2UpsertPost(post: Spa2BlogPost) {
  const idx = SPA2_POSTS.findIndex((p) => p.slug === post.slug);
  if (idx >= 0) {
    SPA2_POSTS[idx] = post;
  } else {
    SPA2_POSTS.unshift(post);
  }
}

export function spa2DeletePost(slug: string) {
  const idx = SPA2_POSTS.findIndex((p) => p.slug === slug);
  if (idx >= 0) {
    SPA2_POSTS.splice(idx, 1);
  }
}

// ---------- Careers (view + dashboard shared) ----------------------------

export const spa2Careers: Array<{
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  benefits: string[];
  description: string;
  // Ảnh banner riêng cho tin tuyển dụng này (tuỳ chọn) - nếu không đặt, trang chi
  // tiết vị trí (spa2/careers/:id) sẽ dùng ảnh banner chung spa2CareersBanner.image.
  image?: Spa2AdjustableImage;
}> = [
  {
    id: 1,
    title: 'Kỹ thuật viên Spa cao cấp',
    location: 'TP.HCM / Hà Nội',
    type: 'Toàn thời gian',
    salary: '12 – 20 triệu',
    benefits: ['Đào tạo quốc tế', 'Bảo hiểm cao cấp', 'Du lịch hằng năm'],
    description:
      'Chúng tôi tìm kiếm ứng viên yêu nghề, có tinh thần cầu tiến và mong muốn phát triển sự nghiệp lâu dài trong ngành chăm sóc sắc đẹp.',
    image: {
      url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=80',
      focalX: 50,
      focalY: 50,
      zoom: 100,
    },
  },
  {
    id: 2,
    title: 'Chuyên viên tư vấn khách hàng',
    location: 'TP.HCM',
    type: 'Toàn thời gian',
    salary: '10 – 18 triệu',
    benefits: ['Hoa hồng hấp dẫn', 'Môi trường năng động', 'Lộ trình thăng tiến'],
    description:
      'Tư vấn dịch vụ phù hợp cho khách hàng, chăm sóc và duy trì mối quan hệ lâu dài, phối hợp cùng đội ngũ kỹ thuật để mang lại trải nghiệm tốt nhất.',
  },
  {
    id: 3,
    title: 'Quản lý chi nhánh',
    location: 'Đà Nẵng',
    type: 'Toàn thời gian',
    salary: 'Thỏa thuận',
    benefits: ['Cổ phần thưởng', 'Bảo hiểm gia đình', 'Đào tạo lãnh đạo'],
    description:
      'Điều hành hoạt động vận hành chi nhánh, quản lý đội ngũ nhân viên, đảm bảo chất lượng dịch vụ và mục tiêu doanh thu.',
  },
  {
    id: 4,
    title: 'Nhân viên Marketing nội dung',
    location: 'Remote / TP.HCM',
    type: 'Linh hoạt',
    salary: '8 – 15 triệu',
    benefits: ['Làm việc từ xa', 'Lương theo dự án', 'Workshop hàng tháng'],
    description:
      'Lên ý tưởng và sản xuất nội dung cho các kênh truyền thông của Nature Spa, phối hợp cùng đội ngũ thiết kế và vận hành chiến dịch quảng bá.',
  },
];

export type Spa2CareerStatus = 'open' | 'closed';

export type Spa2CareerItem = (typeof spa2Careers)[number] & {
  status: Spa2CareerStatus;
  applications: number;
  postedAt: string;
};

const CAREER_APPLICATIONS_SEED = [12, 7, 4, 9];
const CAREER_POSTED_SEED = ['2026-06-20', '2026-06-28', '2026-07-01', '2026-07-05'];

export const SPA2_CAREERS: Spa2CareerItem[] = spa2Careers.map((c, i) => ({
  ...c,
  status: 'open',
  applications: CAREER_APPLICATIONS_SEED[i] ?? 3,
  postedAt: CAREER_POSTED_SEED[i] ?? '2026-07-10',
}));

export const spa2CareersSlogan = 'Nơi đam mê làm đẹp gặp gỡ cơ hội phát triển';

export type Spa2CareersBanner = Spa2PageBanner;

export const spa2CareersBanner: Spa2CareersBanner = {
  image: { url: SPA2_PAGE_IMAGES.careers, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Tuyển dụng',
  title: spa2CareersSlogan,
  subtitle: 'Nature Spa luôn tìm kiếm những người yêu thiên nhiên và đam mê chăm sóc con người.',
};

export const spa2JoinReasons = [
  { icon: 'solar:wallet-money-bold-duotone', text: 'Thu nhập hấp dẫn' },
  { icon: 'solar:buildings-2-bold-duotone', text: 'Môi trường chuyên nghiệp' },
  { icon: 'solar:book-bookmark-bold-duotone', text: 'Đào tạo liên tục' },
  { icon: 'solar:chart-2-bold-duotone', text: 'Thăng tiến rõ ràng' },
];

export const spa2RecruitmentProcess = [
  { step: 'Ứng tuyển', desc: 'Gửi CV qua form hoặc email tuyển dụng.' },
  { step: 'Phỏng vấn', desc: 'Trao đổi trực tiếp với quản lý chi nhánh.' },
  { step: 'Đào tạo', desc: 'Tham gia khóa đào tạo nội bộ 1–2 tuần.' },
  { step: 'Nhận việc', desc: 'Chính thức gia nhập đội ngũ Nature Spa.' },
];

export const spa2WorkplaceGallery: Spa2AdjustableImage[] = [
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=900&q=80',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
].map((url) => ({ url, focalX: 50, focalY: 50, zoom: 100 }));

export const spa2InternalVideoThumb: Spa2AdjustableImage = {
  url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80',
  focalX: 50,
  focalY: 50,
  zoom: 100,
};

// Admin-uploaded internal culture video shown on the career details page play
// button. Empty string = no video uploaded yet, meaning the public page falls
// back to the decorative (non-clickable) thumbnail-only behaviour.
export const spa2InternalVideoUrl = '';

export type Spa2InternalVideo = { thumbnail: Spa2AdjustableImage; videoUrl: string };

export const spa2InternalVideo: Spa2InternalVideo = {
  thumbnail: spa2InternalVideoThumb,
  videoUrl: spa2InternalVideoUrl,
};

// Nhiều video môi trường làm việc (thay cho video đơn spa2InternalVideo phía trên,
// vẫn giữ lại để tương thích ngược). Hiển thị cùng khu vực với spa2WorkplaceGallery
// trên trang spa2/careers, mỗi video có ảnh thumbnail + tiêu đề + link video.
export type Spa2WorkplaceVideo = {
  title: string;
  thumbnail: Spa2AdjustableImage;
  videoUrl: string;
};

export const spa2WorkplaceVideos: Spa2WorkplaceVideo[] = [
  {
    title: 'Hậu trường Nature Spa',
    thumbnail: spa2InternalVideoThumb,
    videoUrl: spa2InternalVideoUrl,
  },
];

export const SPA2_CAREER_SLOGAN = spa2CareersSlogan;
export const SPA2_JOIN_REASONS = spa2JoinReasons;
export const SPA2_RECRUITMENT_PROCESS = spa2RecruitmentProcess;
export const SPA2_WORKPLACE_GALLERY = spa2WorkplaceGallery;
export const SPA2_INTERNAL_VIDEO_THUMB = spa2InternalVideoThumb;
export const SPA2_INTERNAL_VIDEO = spa2InternalVideo;
export const SPA2_WORKPLACE_VIDEOS = spa2WorkplaceVideos;

// ---------- Bookings (view + dashboard shared) --------------------------

export type Spa2BookingBanner = Spa2PageBanner;

export const spa2BookingBanner: Spa2BookingBanner = {
  image: { url: SPA2_PAGE_IMAGES.booking, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Đặt lịch',
  title: 'Đặt lịch online trong 1 phút',
  subtitle:
    'Chọn dịch vụ, chi nhánh và thời gian phù hợp – chúng tôi sẽ xác nhận trong vòng 15 phút.',
};

// ---------- Services banner (view + dashboard shared) -------------------

export type Spa2ServicesBanner = Spa2PageBanner;

export const spa2ServicesBanner: Spa2ServicesBanner = {
  image: { url: SPA2_PAGE_IMAGES.services, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Dịch vụ',
  title: 'Bộ sưu tập liệu pháp từ thiên nhiên',
  subtitle:
    'Mỗi liệu trình là một hành trình cảm nhận – kết hợp tinh hoa thảo mộc Việt và công nghệ hiện đại châu Âu.',
};

// ---------- Blog banner (view + dashboard shared) ------------------------

export type Spa2BlogBanner = Spa2PageBanner;

export const spa2BlogBanner: Spa2BlogBanner = {
  image: { url: SPA2_PAGE_IMAGES.blog, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Blog',
  title: 'Cẩm nang chăm sóc bản thân',
  subtitle: 'Chia sẻ kiến thức về dưỡng da, dinh dưỡng, yoga và lối sống lành mạnh.',
};

// ---------- Contact banner (view + dashboard shared) ----------------------

export type Spa2ContactBanner = Spa2PageBanner;

export const spa2ContactBanner: Spa2ContactBanner = {
  image: { url: SPA2_PAGE_IMAGES.contact, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Liên hệ',
  title: 'Chúng tôi luôn lắng nghe bạn',
  subtitle: 'Để lại lời nhắn, đội ngũ tư vấn sẽ phản hồi trong 30 phút (giờ hành chính).',
};

// ---------- Offers banner (view + dashboard shared) ------------------------

export type Spa2OffersBanner = Spa2PageBanner;

export const spa2OffersBanner: Spa2OffersBanner = {
  image: { url: SPA2_PAGE_IMAGES.offers, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Ưu đãi',
  title: 'Gói ưu đãi dành riêng cho bạn',
  subtitle: 'Tiết kiệm hơn, trải nghiệm trọn vẹn hơn với các ưu đãi thường niên.',
};

export const spa2BookingPackages = [
  {
    slug: 'goi-co-ban',
    name: 'Gói Cơ Bản',
    price: 690000,
    sessions: 1,
    hot: false,
    perks: ['1 liệu trình', 'Tư vấn da miễn phí'],
  },
  {
    slug: 'goi-bac',
    name: 'Gói Bạc',
    price: 2490000,
    sessions: 4,
    hot: false,
    perks: ['4 liệu trình', 'Trà thảo mộc', 'Ưu tiên giờ đẹp'],
  },
  {
    slug: 'goi-vang',
    name: 'Gói Vàng',
    price: 5990000,
    sessions: 10,
    hot: true,
    perks: [
      '10 liệu trình',
      'Tặng 1 buổi Aromatherapy',
      'Tư vấn dinh dưỡng',
      'Thẻ thành viên Gold',
    ],
  },
  {
    slug: 'goi-kim-cuong',
    name: 'Gói Kim Cương',
    price: 11900000,
    sessions: 20,
    hot: false,
    perks: ['20 liệu trình', 'Chuyên gia riêng', 'Spa đôi 1 buổi', 'Quà sinh nhật'],
  },
];

export const SPA2_BOOKING_PACKAGES = spa2BookingPackages;
export const SPA2_BOOKING_SERVICES = SPA2_SERVICES;

export type Spa2BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export type Spa2BookingItem = {
  id: number;
  customer: string;
  phone: string;
  service: string;
  packageSlug?: string;
  date: string;
  time: string;
  branch: string;
  note: string;
  status: Spa2BookingStatus;
};

export const SPA2_BOOKINGS: Spa2BookingItem[] = [
  {
    id: 1,
    customer: 'Nguyễn Thị Lan',
    phone: '0901 234 567',
    service: 'Facial Organic',
    packageSlug: 'goi-bac',
    date: '14/07/2026',
    time: '09:00',
    branch: 'Quận 1',
    note: 'Da nhạy cảm',
    status: 'pending',
  },
  {
    id: 2,
    customer: 'Trần Minh Tuấn',
    phone: '0912 345 678',
    service: 'Massage Thảo Dược',
    packageSlug: 'goi-co-ban',
    date: '14/07/2026',
    time: '10:30',
    branch: 'Hồ Tây',
    note: '',
    status: 'confirmed',
  },
  {
    id: 3,
    customer: 'Lê Thị Hoa',
    phone: '0923 456 789',
    service: 'Spa Đôi',
    packageSlug: 'goi-vang',
    date: '15/07/2026',
    time: '14:00',
    branch: 'Quận 1',
    note: 'Kỷ niệm ngày cưới',
    status: 'confirmed',
  },
  {
    id: 4,
    customer: 'Phạm Văn Nam',
    phone: '0934 567 890',
    service: 'Detox 3 ngày',
    packageSlug: 'goi-kim-cuong',
    date: '16/07/2026',
    time: '09:00',
    branch: 'Đà Nẵng',
    note: 'Gói full 3 ngày',
    status: 'pending',
  },
  {
    id: 5,
    customer: 'Vũ Thị Mai',
    phone: '0945 678 901',
    service: 'Aromatherapy',
    packageSlug: 'goi-co-ban',
    date: '13/07/2026',
    time: '15:00',
    branch: 'Nha Trang',
    note: '',
    status: 'completed',
  },
  {
    id: 6,
    customer: 'Đỗ Văn Hùng',
    phone: '0956 789 012',
    service: 'Body Scrub & Wrap',
    packageSlug: 'goi-bac',
    date: '12/07/2026',
    time: '11:00',
    branch: 'Quận 1',
    note: '',
    status: 'cancelled',
  },
  {
    id: 7,
    customer: 'Bùi Thị Ngọc',
    phone: '0967 890 123',
    service: 'Facial Organic',
    packageSlug: 'goi-vang',
    date: '17/07/2026',
    time: '09:30',
    branch: 'Hồ Tây',
    note: 'Lần đầu',
    status: 'pending',
  },
  {
    id: 8,
    customer: 'Hoàng Văn Long',
    phone: '0978 901 234',
    service: 'Massage Thảo Dược',
    packageSlug: 'goi-bac',
    date: '17/07/2026',
    time: '13:00',
    branch: 'Đà Nẵng',
    note: '',
    status: 'confirmed',
  },
];

export const SPA2_BOOKING_BRANCHES = ['Quận 1', 'Hồ Tây', 'Đà Nẵng', 'Nha Trang'];

// ---------- About / Team / Certifications ---------------------------------
// Single source of truth for the public "/spa2/about" page AND its dashboard
// manage page (src/pages/dashboard/manage/spa2/about.tsx) — both read these
// same arrays so the two sides never drift apart.

// An image with an editable focal point (framing) and zoom level, so admins
// can upload a local file or paste a URL, then fine-tune how it's cropped
// without needing an external image editor. `zoom` is a CSS background-size
// percentage (100 = fit, up to 200 = 2x zoomed in); `focalX`/`focalY` are
// CSS background-position percentages.
export type Spa2AdjustableImage = {
  url: string;
  focalX: number;
  focalY: number;
  zoom: number;
};

// Generic "page hero" shape reused by every spa2 sub-page that has an
// editable banner (About, Careers, Booking, ...): an adjustable image plus
// the eyebrow/title/subtitle copy shown in `Spa2PageHero`.
export type Spa2PageBanner = {
  image: Spa2AdjustableImage;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type Spa2AboutBanner = Spa2PageBanner;

export type Spa2AboutVisionMissionItem = {
  id?: string;
  icon: string;
  title: string;
  desc: string;
  image?: Spa2AdjustableImage;
};

export type Spa2AboutTeamMember = {
  id?: string;
  name: string;
  role: string;
  image: string;
  imageFocalX?: number;
  imageFocalY?: number;
  imageZoom?: number;
  bio: string;
};

export type Spa2AboutCertification = {
  id?: string;
  icon: string;
  name: string;
  org: string;
  year: string;
};

export const spa2AboutBanner: Spa2AboutBanner = {
  image: { url: SPA2_PAGE_IMAGES.about, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Về Nature Spa',
  title: 'Hành trình mang thiên nhiên vào từng liệu trình',
  subtitle:
    'Chúng tôi tin rằng vẻ đẹp đích thực bắt nguồn từ sự cân bằng giữa cơ thể, tâm trí và thiên nhiên.',
};

export const spa2AboutStoryImage: Spa2AdjustableImage = {
  url: SPA2_PAGE_IMAGES.about,
  focalX: 50,
  focalY: 50,
  zoom: 100,
};

export const spa2AboutStory: string[] = [
  'Nature Spa ra đời năm 2015 tại TP.HCM, khởi nguồn từ mong muốn mang những liệu pháp chăm sóc da và cơ thể an toàn, lành tính đến gần hơn với phụ nữ Việt – nơi thiên nhiên và khoa học cùng song hành.',
  'Từ một cơ sở nhỏ với 3 kỹ thuật viên, chúng tôi đã phát triển thành hệ thống 4 chi nhánh trên toàn quốc, đồng hành cùng hơn 25.000 khách hàng trong hành trình tìm lại sự cân bằng cho cơ thể và tâm trí.',
  'Mỗi sản phẩm, mỗi liệu trình tại Nature Spa đều được chọn lọc kỹ lưỡng từ nguyên liệu hữu cơ, kết hợp công nghệ chăm sóc da hiện đại từ châu Âu – để vẻ đẹp không chỉ nằm ở bề ngoài mà còn lan tỏa từ bên trong.',
];

export const spa2VisionMission: Spa2AboutVisionMissionItem[] = [
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

export const spa2Team: Spa2AboutTeamMember[] = [
  {
    id: '1',
    name: 'Nguyễn Thảo Vy',
    role: 'Nhà sáng lập & CEO',
    image: 'https://i.pravatar.cc/300?img=47',
    bio: 'Hơn 15 năm kinh nghiệm trong ngành chăm sóc sắc đẹp, chứng chỉ CIDESCO quốc tế.',
  },
  {
    id: '2',
    name: 'Trần Minh Khôi',
    role: 'Giám đốc chuyên môn',
    image: 'https://i.pravatar.cc/300?img=12',
    bio: 'Chuyên gia trị liệu da với hơn 10 năm tu nghiệp tại Pháp và Hàn Quốc.',
  },
  {
    id: '3',
    name: 'Phạm Hồng Nhi',
    role: 'Trưởng phòng đào tạo',
    image: 'https://i.pravatar.cc/300?img=32',
    bio: 'Đào tạo hơn 500 kỹ thuật viên đạt chuẩn quốc tế trong 8 năm qua.',
  },
  {
    id: '4',
    name: 'Lê Gia Huy',
    role: 'Chuyên gia Detox & dinh dưỡng',
    image: 'https://i.pravatar.cc/300?img=14',
    bio: 'Cố vấn dinh dưỡng cho các liệu trình detox và chăm sóc body toàn diện.',
  },
];

export const spa2Certifications: Spa2AboutCertification[] = [
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

// ---------- Partners banner (view + dashboard shared) ----------------------

export type Spa2PartnersBanner = Spa2PageBanner;

export const spa2PartnersBanner: Spa2PartnersBanner = {
  image: { url: SPA2_PAGE_IMAGES.partners, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Cộng sự',
  title: 'Đối tác đồng hành',
  subtitle: 'Hợp tác cùng các thương hiệu mỹ phẩm và thiết bị spa hàng đầu thế giới.',
};

// ---------- Partners --------------------------------------------------

// `category` matches a spa2PartnerCategories key ('cosmetics' | 'equipment' |
// 'training' | 'tech') and drives which "Đối tác chiến lược" group a partner
// appears in on the public page — the same value the dashboard form sets.
export type Spa2PartnerProfile = {
  name: string;
  country: string;
  logo: string;
  specialty: string;
  since: string;
  desc: string;
  expert: string;
  category: string;
};

export const spa2PartnerProfiles: Spa2PartnerProfile[] = [
  {
    name: 'Comfort Zone',
    country: 'Italy',
    logo: 'CZ',
    specialty: 'Mỹ phẩm sinh học cao cấp',
    since: '2017',
    desc: 'Thương hiệu mỹ phẩm sinh học hàng đầu Ý, chuyên các dòng sản phẩm chống lão hóa và phục hồi da.',
    expert: 'Chuyên viên: Trần Minh Khôi',
    category: 'cosmetics',
  },
  {
    name: 'Thalgo',
    country: 'France',
    logo: 'TH',
    specialty: 'Liệu pháp tảo biển',
    since: '2018',
    desc: 'Tiên phong trong công nghệ tảo biển trị liệu, phục hồi và tái tạo làn da từ sâu bên trong.',
    expert: 'Chuyên viên: Phạm Hồng Nhi',
    category: 'cosmetics',
  },
  {
    name: 'Dermalogica',
    country: 'USA',
    logo: 'DG',
    specialty: 'Chăm sóc da chuyên sâu',
    since: '2016',
    desc: 'Thương hiệu skincare chuyên nghiệp được tin dùng bởi các spa cao cấp toàn cầu.',
    expert: 'Chuyên viên: Nguyễn Thảo Vy',
    category: 'cosmetics',
  },
  {
    name: 'Shiseido Pro',
    country: 'Japan',
    logo: 'SH',
    specialty: 'Công nghệ trẻ hóa Nhật Bản',
    since: '2019',
    desc: 'Công nghệ làm đẹp Nhật Bản với triết lý chăm sóc da bền vững, an toàn.',
    expert: 'Chuyên viên: Lê Gia Huy',
    category: 'tech',
  },
  {
    name: 'Yon-Ka Paris',
    country: 'France',
    logo: 'YK',
    specialty: 'Aromatherapy thực vật',
    since: '2020',
    desc: 'Liệu pháp hương thơm từ tinh chất thực vật, cân bằng làn da và tinh thần.',
    expert: 'Chuyên viên: Trần Minh Khôi',
    category: 'cosmetics',
  },
  {
    name: 'Eminence Organic',
    country: 'Hungary',
    logo: 'EO',
    specialty: 'Mỹ phẩm hữu cơ',
    since: '2021',
    desc: '100% nguyên liệu hữu cơ, không hóa chất, an toàn cho mọi loại da.',
    expert: 'Chuyên viên: Phạm Hồng Nhi',
    category: 'cosmetics',
  },
];

export const spa2Partners = [
  { name: 'Comfort Zone', country: 'Italy', logo: 'CZ' },
  { name: 'Thalgo', country: 'France', logo: 'TH' },
  { name: 'Dermalogica', country: 'USA', logo: 'DG' },
  { name: 'Shiseido Pro', country: 'Japan', logo: 'SH' },
  { name: 'Yon-Ka Paris', country: 'France', logo: 'YK' },
  { name: 'Eminence Organic', country: 'Hungary', logo: 'EO' },
];

export type Spa2PartnerCategory = { key: string; label: string; icon: string };

export const spa2PartnerCategories: Spa2PartnerCategory[] = [
  { key: 'cosmetics', label: 'Mỹ phẩm', icon: 'solar:flask-bold-duotone' },
  { key: 'equipment', label: 'Thiết bị', icon: 'solar:settings-bold-duotone' },
  { key: 'training', label: 'Đào tạo', icon: 'solar:book-bold-duotone' },
  { key: 'tech', label: 'Công nghệ', icon: 'solar:cpu-bolt-bold-duotone' },
];

export const spa2ExtraPartners: Spa2PartnerProfile[] = [
  {
    name: 'Lumiere Tech',
    country: 'Germany',
    logo: 'LT',
    specialty: 'Máy RF & Laser',
    since: '2020',
    category: 'equipment',
    desc: 'Cung cấp thiết bị công nghệ cao cho liệu trình trẻ hóa và giảm béo.',
    expert: 'Phụ trách: Bộ phận kỹ thuật',
  },
  {
    name: 'CIDESCO Academy',
    country: 'Switzerland',
    logo: 'CA',
    specialty: 'Chứng chỉ quốc tế',
    since: '2019',
    category: 'training',
    desc: 'Đối tác đào tạo và cấp chứng chỉ CIDESCO cho đội ngũ KTV.',
    expert: 'Phụ trách: Phòng đào tạo',
  },
];

export type Spa2Collaboration = { title: string; partner: string; year: string; image: string };

export const spa2Collaborations: Spa2Collaboration[] = [
  {
    title: 'Ra mắt dòng sản phẩm Eco-Line',
    partner: 'Eminence Organic',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
  },
  {
    title: 'Trang bị máy RF thế hệ mới',
    partner: 'Lumiere Tech',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
  },
  {
    title: 'Chương trình đào tạo KTV chuẩn quốc tế',
    partner: 'CIDESCO Academy',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
  },
];

export type Spa2QualityCert = { name: string; desc: string; icon: string };

export const spa2QualityCerts: Spa2QualityCert[] = [
  {
    name: 'FDA',
    desc: 'Sản phẩm đạt chuẩn an toàn FDA Hoa Kỳ',
    icon: 'solar:shield-check-bold-duotone',
  },
  {
    name: 'CE',
    desc: 'Thiết bị đạt chuẩn an toàn Châu Âu',
    icon: 'solar:verified-check-bold-duotone',
  },
  {
    name: 'ISO 9001',
    desc: 'Hệ thống quản lý chất lượng quốc tế',
    icon: 'solar:medal-star-bold-duotone',
  },
  {
    name: 'Chứng chỉ thương hiệu',
    desc: 'Đối tác chính thức được các thương hiệu công nhận',
    icon: 'solar:hand-stars-bold-duotone',
  },
];

// ---------- Feedback banner (view + dashboard shared) ---------------------

export type Spa2FeedbackBanner = Spa2PageBanner;

export const spa2FeedbackBanner: Spa2FeedbackBanner = {
  image: { url: SPA2_PAGE_IMAGES.feedback, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Cảm nhận khách hàng',
  title: '25.000+ khách hàng tin yêu',
  subtitle: 'Mỗi đánh giá là động lực để chúng tôi không ngừng hoàn thiện.',
};

// ---------- Feedback / Video reviews ---------------------------------

// Only feedback with status 'approved' renders on the public /spa2/feedback
// page — moderation in the dashboard (Duyệt / Từ chối) directly controls
// what customers see, so the manage view and public view never drift apart.
export type Spa2FeedbackStatus = 'pending' | 'approved' | 'rejected';

export const spa2Feedbacks: {
  name: string;
  role: string;
  rating: number;
  avatar: string;
  comment: string;
  service: string;
  status: Spa2FeedbackStatus;
}[] = [
  {
    name: 'Minh Anh',
    role: 'Khách hàng VIP',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=11',
    comment:
      'Không gian xanh mát, tinh dầu thơm dịu, kỹ thuật viên rất chuyên nghiệp. Cảm thấy như đang đi nghỉ dưỡng giữa thiên nhiên.',
    service: 'Facial Organic',
    status: 'approved',
  },
  {
    name: 'Thu Hà',
    role: 'Thành viên Premium',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=16',
    comment: 'Liệu trình trị mụn rõ rệt sau 4 buổi. Da đều màu hơn, mụn giảm gần như hoàn toàn.',
    service: 'Liệu trình trị mụn',
    status: 'approved',
  },
  {
    name: 'Hoàng Nam',
    role: 'Khách hàng mới',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=23',
    comment: 'Lần đầu đi spa nhưng cảm giác rất thoải mái, đặc biệt là phòng xông đá muối.',
    service: 'Massage thảo dược',
    status: 'approved',
  },
  {
    name: 'Bích Ngọc',
    role: 'Khách thân thiết',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=32',
    comment: 'Detox 3 ngày giúp mình giảm 2kg và cảm thấy nhẹ nhõm hẳn. Sẽ quay lại nhiều lần nữa.',
    service: 'Detox 3 ngày',
    status: 'approved',
  },
  {
    name: 'Thanh Phương',
    role: 'Khách hàng',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=47',
    comment: 'Nhân viên thân thiện, không gian sạch sẽ, mùi hương dễ chịu suốt buổi.',
    service: 'Aromatherapy',
    status: 'pending',
  },
  {
    name: 'Quốc Bảo',
    role: 'Khách hàng',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=51',
    comment: 'Gói đôi rất lãng mạn, vợ mình rất thích. Cảm ơn Nature Spa!',
    service: 'Spa đôi',
    status: 'pending',
  },
];

export const spa2VideoReviews = [
  {
    name: 'Minh Anh',
    service: 'Facial Organic',
    thumbnail: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=900&q=80',
    duration: '1:24',
  },
  {
    name: 'Thu Hà',
    service: 'Liệu trình trị mụn',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    duration: '2:05',
  },
  {
    name: 'Bích Ngọc',
    service: 'Detox 3 ngày',
    thumbnail: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    duration: '1:48',
  },
];

// ---------- Before / After banner (view + dashboard shared) ----------------

export type Spa2BeforeAfterBanner = Spa2PageBanner;

export const spa2BeforeAfterBanner: Spa2BeforeAfterBanner = {
  image: { url: SPA2_PAGE_IMAGES.beforeAfter, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Trước & Sau',
  title: 'Kết quả thực tế từ khách hàng',
  subtitle: 'Hình ảnh được chia sẻ với sự đồng thuận của khách hàng – không qua chỉnh sửa.',
};

// ---------- Before / After ---------------------------------------------

// Only cases with status 'approved' render on the public /spa2/before-after
// page — moderation in the dashboard (Duyệt / Từ chối) directly controls what
// customers see, same discipline as spa2Feedbacks.

export const spa2BeforeAfters: Spa2BeforeAfter[] = [
  {
    id: '1',
    title: 'Trị mụn – 8 buổi',
    before: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    duration: '2 tháng',
    note: 'Giảm 90% mụn viêm, da đều màu, lỗ chân lông se nhỏ.',
    status: 'approved',
  },
  {
    id: '2',
    title: 'Trẻ hóa da – 10 buổi',
    before: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    duration: '2 tháng',
    note: 'Nâng cơ, mờ nếp nhăn, da săn chắc tự nhiên.',
    status: 'approved',
  },
  {
    id: '3',
    title: 'Giảm béo – 10 buổi',
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1517363898874-737b62a7db91?w=600&q=80',
    duration: '3 tháng',
    note: 'Giảm 8cm vòng eo, săn chắc cơ bụng, không xâm lấn.',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Trắng sáng – 6 buổi',
    before: 'https://images.unsplash.com/photo-1516975698824-571cb39ceee6?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1531123414780-f3d9d2c46c6c?w=600&q=80',
    duration: '6 tuần',
    note: 'Tăng 2 tone, da đều màu, hết thâm sạm.',
    status: 'pending',
  },
];

export const spa2Technologies = [
  {
    name: 'Máy RF đa cực',
    icon: 'solar:cpu-bolt-bold-duotone',
    desc: 'Nâng cơ, săn chắc da bằng sóng radio tần số cao.',
  },
  {
    name: 'Laser CO2 Fractional',
    icon: 'solar:bolt-bold-duotone',
    desc: 'Tái tạo bề mặt da, mờ sẹo và nếp nhăn.',
  },
  {
    name: 'Công nghệ HIFU',
    icon: 'solar:soundwave-bold-duotone',
    desc: 'Nâng cơ không xâm lấn bằng sóng siêu âm hội tụ.',
  },
  {
    name: 'Ánh sáng sinh học LED',
    icon: 'solar:lightbulb-bolt-bold-duotone',
    desc: 'Kháng viêm, phục hồi da bằng ánh sáng trị liệu độc quyền.',
  },
];

export const spa2TreatmentExperts = [
  {
    name: 'Trần Minh Khôi',
    role: 'Chuyên gia trị liệu da',
    image: 'https://i.pravatar.cc/300?img=12',
  },
  {
    name: 'Phạm Hồng Nhi',
    role: 'Chuyên gia công nghệ cao',
    image: 'https://i.pravatar.cc/300?img=32',
  },
];

export const spa2TreatmentProcess = [
  { title: 'Tư vấn', desc: 'Trao đổi nhu cầu, tiền sử da và mục tiêu điều trị.' },
  { title: 'Kiểm tra da', desc: 'Soi da chuyên sâu, đánh giá tình trạng bằng máy.' },
  { title: 'Điều trị', desc: 'Thực hiện liệu trình theo phác đồ cá nhân hóa.' },
  { title: 'Theo dõi', desc: 'Đánh giá kết quả định kỳ, điều chỉnh phác đồ nếu cần.' },
];

// ---------- Treatments banner (view + dashboard shared) ---------------------

export type Spa2TreatmentsBanner = Spa2PageBanner;

export const spa2TreatmentsBanner: Spa2TreatmentsBanner = {
  image: { url: SPA2_PAGE_IMAGES.treatments, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Gói liệu trình',
  title: 'Liệu trình chuyên sâu',
  subtitle: 'Lộ trình được thiết kế cá nhân hóa cho từng vấn đề – đảm bảo kết quả rõ rệt.',
};

// ---------- Treatments ---------------------------------------------------

// `active: false` hides a treatment from the public /spa2/treatments list —
// the dashboard's "Kích hoạt / Tắt" toggle directly controls this.
export type Spa2Treatment = {
  id: number;
  name: string;
  sessions: number;
  duration: string;
  price: number;
  target: string;
  includes: string[];
  active: boolean;
};

export const spa2Treatments: Spa2Treatment[] = [
  {
    id: 1,
    name: 'Liệu Trình Trẻ Hóa 10 Buổi',
    sessions: 10,
    duration: '2 tháng',
    price: 12900000,
    target: 'Da lão hóa, chùng nhão',
    includes: ['Facial Collagen', 'RF nâng cơ', 'Mặt nạ vàng 24K', 'Massage cổ vai gáy'],
    active: true,
  },
  {
    id: 2,
    name: 'Liệu Trình Trị Mụn 8 Buổi',
    sessions: 8,
    duration: '2 tháng',
    price: 7900000,
    target: 'Da mụn, lỗ chân lông to',
    includes: ['Lấy nhân mụn chuẩn y khoa', 'Ánh sáng sinh học', 'Peel nhẹ', 'Phục hồi cấp ẩm'],
    active: true,
  },
  {
    id: 3,
    name: 'Liệu Trình Giảm Béo 12 Buổi',
    sessions: 12,
    duration: '3 tháng',
    price: 14900000,
    target: 'Giảm mỡ bụng, đùi, eo',
    includes: ['Sóng RF tan mỡ', 'Massage dẫn lưu', 'Ủ thảo dược', 'Tư vấn dinh dưỡng'],
    active: true,
  },
  {
    id: 4,
    name: 'Liệu Trình Trắng Sáng 6 Buổi',
    sessions: 6,
    duration: '6 tuần',
    price: 6900000,
    target: 'Da xỉn màu, không đều',
    includes: ['Tế bào gốc', 'Mặt nạ ngọc trai', 'Vitamin C điện di', 'Mặt nạ lạnh'],
    active: true,
  },
];

// ---------- Branches banner (view + dashboard shared) ----------------------

export type Spa2BranchesBanner = Spa2PageBanner;

export const spa2BranchesBanner: Spa2BranchesBanner = {
  image: { url: SPA2_PAGE_IMAGES.branches, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Hệ thống',
  title: '4 chi nhánh trên toàn quốc',
  subtitle: 'Tìm chi nhánh Nature Spa gần bạn nhất – mọi nơi đều cùng một chuẩn dịch vụ.',
};

// ---------- Branches -----------------------------------------------------

export type Spa2Branch = {
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
};

export const spa2Branches: Spa2Branch[] = [
  {
    city: 'TP. Hồ Chí Minh',
    name: 'Nature Spa Quận 1',
    address: '45 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028 3822 9090',
    hours: '9:00 – 22:00 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80',
  },
  {
    city: 'Hà Nội',
    name: 'Nature Spa Hồ Tây',
    address: '88 Xuân Diệu, Tây Hồ, Hà Nội',
    phone: '024 3719 1199',
    hours: '9:00 – 22:00 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
  },
  {
    city: 'Đà Nẵng',
    name: 'Nature Spa Biển Mỹ Khê',
    address: '12 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
    phone: '0236 3654 789',
    hours: '8:00 – 23:00 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
  },
  {
    city: 'Nha Trang',
    name: 'Nature Spa Nha Trang',
    address: '5 Trần Phú, Lộc Thọ, Nha Trang',
    phone: '0258 3556 678',
    hours: '9:00 – 22:30 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1531112068337-3cd6d0d2b56b?w=900&q=80',
  },
];

// ---------- Offers / Promotions ------------------------------------------

export const spa2Offers = [
  {
    title: 'Ưu đãi khách mới',
    desc: 'Giảm 30% cho liệu trình đầu tiên + Trà thảo mộc miễn phí.',
    code: 'NEW30',
    discount: '-30%',
    expires: '31/12/2026',
  },
  {
    title: 'Combo Mẹ & Bé',
    desc: 'Massage cho mẹ + Chăm sóc da cho bé, tiết kiệm 25%.',
    code: 'MOMBABY',
    discount: '-25%',
    expires: '30/09/2026',
  },
  {
    title: 'Sinh nhật vàng',
    desc: 'Tặng voucher 500.000đ trong tháng sinh nhật của bạn.',
    code: 'BIRTHDAY',
    discount: '500K',
    expires: 'Trọn năm 2026',
  },
  {
    title: 'Giới thiệu bạn bè',
    desc: 'Bạn được giảm 20%, bạn của bạn cũng giảm 20%.',
    code: 'FRIEND20',
    discount: '-20%',
    expires: 'Không giới hạn',
  },
];

// ---------- Promotions banner (view + dashboard shared) --------------------

export type Spa2PromotionsBanner = Spa2PageBanner;

export const spa2PromotionsBanner: Spa2PromotionsBanner = {
  image: { url: SPA2_PAGE_IMAGES.promotions, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Khuyến mãi',
  title: 'Sự kiện & khuyến mãi theo mùa',
  subtitle: 'Cập nhật các chương trình giới hạn thời gian, ưu đãi cực sốc trong năm.',
};

// Only `active` promotions render on the public /spa2/promotions page, so
// tạm dừng (pause) in the dashboard actually hides the campaign from
// customers instead of being a purely cosmetic dashboard-only toggle.
// `endsAt` (ISO datetime) drives the flash-sale countdown when present.
export type Spa2Promotion = {
  title: string;
  period: string;
  price: string;
  save: string;
  image: string;
  active: boolean;
  endsAt?: string;
};

// Dedicated flash-sale banner shown at the top of /spa2/promotions — decoupled
// from the campaign list below (`spa2Promotions`) so admins can run a flash
// sale independent of any single listed promotion. `active` toggles the whole
// banner off; `endsAt` (ISO datetime) drives the Spa2Countdown.
export type Spa2FlashSale = {
  active: boolean;
  title: string;
  save: string;
  endsAt: string;
};

export const spa2FlashSale: Spa2FlashSale = {
  active: true,
  title: 'Mùa hè xanh – Detox 3 ngày',
  save: 'Tiết kiệm 1.200.000đ',
  endsAt: '2026-08-31T23:59:59',
};

export const spa2Promotions: Spa2Promotion[] = [
  {
    title: 'Mùa hè xanh – Detox 3 ngày',
    period: '01/06 – 31/08/2026',
    price: '4.590.000đ',
    save: 'Tiết kiệm 1.200.000đ',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
    active: true,
    endsAt: '2026-08-31T23:59:59',
  },
  {
    title: 'Trung Thu – Quà tặng vàng',
    period: '15/09 – 15/10/2026',
    price: 'Tặng kèm hộp trà sen',
    save: 'Giá trị 350.000đ',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    active: true,
  },
  {
    title: 'Black Friday Spa Day',
    period: '20/11 – 30/11/2026',
    price: 'Giảm đến 50%',
    save: 'Toàn bộ liệu trình',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
    active: true,
  },
];

// Danh mục + trạng thái combo - dùng cho thống kê ở manage/offers (tab "Gói combo ưu đãi").
export const SPA2_COMBO_CATEGORIES = ['Trẻ hoá', 'Cặp đôi', 'Thải độc'];
export type Spa2ComboStatus = 'Đang bán' | 'Tạm dừng' | 'Ngừng bán';

export const spa2ComboOffers = [
  {
    slug: 'combo-thanh-xuan',
    name: 'Combo Thanh Xuân',
    category: 'Trẻ hoá',
    status: 'Đang bán' as Spa2ComboStatus,
    services: ['Facial Organic', 'Massage Thảo Dược', 'Body Scrub'],
    originalPrice: 2570000,
    salePrice: 1890000,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    perks: ['Tiết kiệm 26%', 'Tặng trà thảo mộc', 'HSD 3 tháng'],
  },
  {
    slug: 'combo-doi-lua',
    name: 'Combo Đôi Lứa',
    category: 'Cặp đôi',
    status: 'Đang bán' as Spa2ComboStatus,
    services: ['Spa Đôi', 'Aromatherapy', 'Body Wrap'],
    originalPrice: 3570000,
    salePrice: 2790000,
    image: 'https://plus.unsplash.com/premium_photo-1661574718355-82659c0c74cc?w=900&q=80',
    perks: ['Tiết kiệm 22%', 'Phòng VIP riêng', 'Quà tặng cặp đôi'],
  },
  {
    slug: 'combo-detox-toan-dien',
    name: 'Combo Detox Toàn Diện',
    category: 'Thải độc',
    status: 'Tạm dừng' as Spa2ComboStatus,
    services: ['Detox 3 ngày', 'Massage Thảo Dược', 'Tư vấn dinh dưỡng'],
    originalPrice: 5970000,
    salePrice: 4290000,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    perks: ['Tiết kiệm 28%', 'Theo dõi 1-1', 'HSD 6 tháng'],
  },
];

// ---------- Training -------------------------------------------------

export interface Spa2TrainingProgram {
  name: string;
  duration: string;
  level: string;
  price: number;
  outcome: string;
}

export interface Spa2TrainingRoadmapStage {
  stage: string;
  duration: string;
  desc: string;
}

export interface Spa2TrainingInstructor {
  name: string;
  image: string;
  imageFocalX?: number;
  imageFocalY?: number;
  imageZoom?: number;
  experience: string;
  certs: string[];
}

export interface Spa2TrainingGraduate {
  name: string;
  image: string;
  imageFocalX?: number;
  imageFocalY?: number;
  imageZoom?: number;
  review: string;
  student: string;
}

export interface Spa2TrainingBanner {
  image: Spa2AdjustableImage;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export const spa2TrainingBanner: Spa2TrainingBanner = {
  image: { url: SPA2_PAGE_IMAGES.training, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Đào tạo',
  title: 'Học viện Nature Spa Academy',
  subtitle: 'Khóa học chuyên sâu cho kỹ thuật viên, chuyên gia chăm sóc da và quản lý spa.',
};

export const spa2TrainingMissionImage: Spa2AdjustableImage = {
  url: SPA2_PAGE_IMAGES.training,
  focalX: 50,
  focalY: 50,
  zoom: 100,
};

export const spa2TrainingPrograms: Spa2TrainingProgram[] = [
  {
    name: 'Khóa Massage Trị Liệu Cơ Bản',
    duration: '4 tuần',
    level: 'Người mới',
    price: 6900000,
    outcome: 'Chứng chỉ nội bộ, sẵn sàng đi làm tại các spa.',
  },
  {
    name: 'Khóa Facial Chuyên Sâu',
    duration: '6 tuần',
    level: 'Trung cấp',
    price: 9900000,
    outcome: 'Thành thạo 12 quy trình facial chuẩn quốc tế.',
  },
  {
    name: 'Khóa Quản Lý Spa',
    duration: '8 tuần',
    level: 'Nâng cao',
    price: 14900000,
    outcome: 'Kỹ năng vận hành, marketing & tài chính spa.',
  },
];

// Sứ mệnh học viện - nhiều đoạn nội dung (giống spa2AboutStory), mỗi đoạn có thể là
// văn bản thuần hoặc HTML ngắn do Editor sinh ra.
export const spa2TrainingMission: string[] = [
  'Đào tạo thế hệ kỹ thuật viên spa chuyên nghiệp, am hiểu thiên nhiên và tận tâm với khách hàng – chuẩn quốc tế, gốc Việt Nam.',
  'Mỗi học viên tốt nghiệp đều được trang bị tay nghề vững vàng, tư duy chăm sóc khách hàng tận tâm và cơ hội việc làm thực tế tại hệ thống Nature Spa.',
];

export const spa2TrainingRoadmap: Spa2TrainingRoadmapStage[] = [
  {
    stage: 'Nền tảng',
    duration: '2 tuần',
    desc: 'Giải phẫu da, nguyên tắc vệ sinh, đạo đức nghề.',
  },
  {
    stage: 'Kỹ thuật cơ bản',
    duration: '3 tuần',
    desc: 'Massage, facial cơ bản, thực hành trên mô hình.',
  },
  { stage: 'Chuyên sâu', duration: '3 tuần', desc: 'Công nghệ máy móc, liệu trình chuyên biệt.' },
  { stage: 'Thực tập', duration: '2 tuần', desc: 'Thực hành trực tiếp tại chi nhánh có giám sát.' },
];

export const spa2Instructors: Spa2TrainingInstructor[] = [
  {
    name: 'Th.S Đặng Thu Trang',
    image: 'https://i.pravatar.cc/300?img=45',
    experience: '12 năm đào tạo chuyên ngành Spa & Thẩm mỹ',
    certs: ['CIDESCO', 'CIBTAC'],
  },
  {
    name: 'BS. Hoàng Anh Tuấn',
    image: 'https://i.pravatar.cc/300?img=15',
    experience: '10 năm trong lĩnh vực da liễu thẩm mỹ',
    certs: ['Chứng chỉ Da liễu', 'ISO Trainer'],
  },
  {
    name: 'Nguyễn Thảo Vy',
    image: 'https://i.pravatar.cc/300?img=47',
    experience: '15 năm vận hành & đào tạo spa cao cấp',
    certs: ['CIDESCO', 'Master Trainer'],
  },
];

export const spa2GraduateShowcase: Spa2TrainingGraduate[] = [
  {
    name: 'Lớp KTV K12',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
    review: 'Khóa học giúp mình tự tin làm nghề ngay sau khi tốt nghiệp, kiến thức rất thực tế.',
    student: 'Trần Bảo Trâm',
  },
  {
    name: 'Lớp Quản Lý K5',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    review: 'Giảng viên tận tâm, chương trình bài bản, mình đã mở được spa riêng sau 1 năm.',
    student: 'Lê Quốc Huy',
  },
];

// ---------- FAQ banner (view + dashboard shared) -----------------------

export type Spa2FaqStat = { n: string; l: string };

export type Spa2FaqBanner = {
  eyebrow: string;
  title: string;
  subtitle: string;
  stats: Spa2FaqStat[];
};

export const spa2FaqBanner: Spa2FaqBanner = {
  eyebrow: 'Hỗ trợ khách hàng',
  title: 'Câu hỏi thường gặp',
  subtitle: 'Tìm câu trả lời nhanh hoặc liên hệ đội ngũ tư vấn — chúng tôi luôn sẵn sàng.',
  stats: [
    { n: '98%', l: 'Khách hàng hài lòng' },
    { n: "15'", l: 'Phản hồi trung bình' },
    { n: '24/7', l: 'Hỗ trợ trực tuyến' },
  ],
};

// ---------- FAQ / Policies / Gallery / Contact ----------------------------

export type Spa2FaqCategory = {
  value: string;
  label: string;
  icon: string;
};

export const spa2FaqCategories: Spa2FaqCategory[] = [
  { value: 'all', label: 'Tất cả', icon: 'solar:list-bold' },
  { value: 'booking', label: 'Đặt lịch', icon: 'solar:calendar-bold' },
  { value: 'service', label: 'Dịch vụ', icon: 'solar:spa-bold-duotone' },
  { value: 'payment', label: 'Thanh toán', icon: 'solar:card-bold' },
  { value: 'member', label: 'Thành viên', icon: 'solar:star-bold' },
  { value: 'product', label: 'Sản phẩm', icon: 'solar:leaf-bold' },
];

// `published: false` hides a FAQ from the public /spa2/faq page (and every
// other place spa2Faqs is reused, e.g. the before/after page's FAQ teaser) —
// the dashboard's "Hiện / Ẩn" toggle directly controls this.

export const spa2Faqs: Spa2Faq[] = [
  {
    id: '1',
    cat: 'booking',
    icon: 'solar:calendar-bold',
    q: 'Tôi cần đặt lịch trước bao lâu?',
    a: 'Ngày thường tối thiểu 2 giờ. Cuối tuần và lễ nên đặt trước 1 ngày để có khung giờ đẹp. Có thể đặt qua website, app, hotline 1900 6789 hoặc Zalo.',
    tag: 'Đặt lịch',
    published: true,
    likes: 128,
    dislikes: 4,
  },
  {
    id: '2',
    cat: 'booking',
    icon: 'solar:bell-bold',
    q: 'Tôi có nhận được nhắc nhở trước giờ hẹn không?',
    a: 'Hệ thống tự động gửi SMS và Zalo trước 2 giờ. Bạn cũng có thể xem và quản lý lịch hẹn trong ứng dụng Nature Spa.',
    tag: 'Đặt lịch',
    published: true,
    likes: 96,
    dislikes: 6,
  },
  {
    id: '3',
    cat: 'booking',
    icon: 'solar:close-circle-bold',
    q: 'Tôi có thể hủy hoặc đổi lịch không?',
    a: 'Hủy trước 4 giờ: miễn phí, hoàn 100%. Trong vòng 4 giờ: phí 20%. Không đến (no-show): phí 50%. Trường hợp khẩn cấp có giấy tờ sẽ được xem xét miễn phí.',
    tag: 'Đặt lịch',
    published: true,
    likes: 142,
    dislikes: 9,
  },
  {
    id: '4',
    cat: 'service',
    icon: 'solar:face-scan-circle-bold-duotone',
    q: 'Dịch vụ có an toàn cho da nhạy cảm không?',
    a: 'Tất cả sản phẩm 100% hữu cơ, không cồn, không paraben. An toàn cho da nhạy cảm, phụ nữ mang thai (từ tam cá nguyệt 2) và trẻ trên 12 tuổi. KTV tư vấn kỹ trước mỗi liệu trình.',
    tag: 'Dịch vụ',
    published: true,
    likes: 87,
    dislikes: 3,
  },
  {
    id: '5',
    cat: 'service',
    icon: 'solar:clock-circle-bold',
    q: 'Mỗi liệu trình kéo dài bao lâu?',
    a: 'Massage thảo dược 60 phút, Facial Organic 75 phút, Body Scrub & Wrap 90 phút, Spa Đôi 120 phút, Detox 3 ngày. Thời gian tư vấn đầu và cuối chưa tính vào.',
    tag: 'Dịch vụ',
    published: true,
    likes: 65,
    dislikes: 2,
  },
  {
    id: '6',
    cat: 'service',
    icon: 'solar:user-bold',
    q: 'Có cần chuẩn bị gì trước khi đến không?',
    a: 'Không cần chuẩn bị đặc biệt. Đến trước 10 phút để lễ tân tư vấn và điền phiếu đánh giá da sơ bộ. Tránh ăn quá no trước liệu trình massage.',
    tag: 'Dịch vụ',
    published: true,
    likes: 54,
    dislikes: 5,
  },
  {
    id: '7',
    cat: 'payment',
    icon: 'solar:card-bold',
    q: 'Hỗ trợ thanh toán trả góp không?',
    a: 'Có. Trả góp 0% lãi suất qua thẻ tín dụng của 15 ngân hàng đối tác (Vietcombank, BIDV, Techcombank, ACB…) cho hóa đơn từ 3 triệu đồng.',
    tag: 'Thanh toán',
    published: true,
    likes: 73,
    dislikes: 11,
  },
  {
    id: '8',
    cat: 'payment',
    icon: 'solar:recive-money-bold',
    q: 'Có thể hoàn tiền khi đổi ý không?',
    a: 'Gói chưa dùng: hoàn 100%. Đã dùng một phần: hoàn theo tỷ lệ buổi còn lại. Voucher khuyến mãi không hoàn tiền mặt nhưng có thể đổi sang dịch vụ cùng giá trị. Thời gian xử lý 3–7 ngày làm việc.',
    tag: 'Hoàn tiền',
    published: true,
    likes: 61,
    dislikes: 4,
  },
  {
    id: '9',
    cat: 'member',
    icon: 'solar:star-bold',
    q: 'Điểm tích lũy được quy đổi như thế nào?',
    a: '10.000đ = 1 điểm. 1 điểm = 1.000đ khi đổi quà hoặc giảm trừ hóa đơn. Điểm có hiệu lực 24 tháng. Thẻ Vàng nhân đôi điểm cuối tuần, Bạch Kim nhân ba trong tháng sinh nhật.',
    tag: 'Thành viên',
    published: true,
    likes: 102,
    dislikes: 3,
  },
  {
    id: '10',
    cat: 'member',
    icon: 'solar:crown-bold',
    q: 'Làm sao để nâng hạng thẻ thành viên?',
    a: 'Bạc: từ 0đ. Vàng: tổng chi 10 triệu đ. Bạch Kim: tổng chi 30 triệu đ. Hệ thống tự động nâng hạng và thông báo khi đủ điều kiện. Hạng giữ nguyên nếu còn giao dịch trong 12 tháng.',
    tag: 'Thành viên',
    published: true,
    likes: 58,
    dislikes: 2,
  },
  {
    id: '11',
    cat: 'product',
    icon: 'solar:leaf-bold',
    q: 'Sản phẩm có được kiểm định không?',
    a: 'Tất cả sản phẩm có đầy đủ CO, CQ và giấy phép Bộ Y tế. Kiểm định lô hàng mỗi 6 tháng bởi SGS Vietnam. Thành phần và nguồn gốc công khai tại phòng trị liệu và website.',
    tag: 'Sản phẩm',
    published: true,
    likes: 44,
    dislikes: 3,
  },
  {
    id: '12',
    cat: 'product',
    icon: 'solar:shield-check-bold',
    q: 'Có cam kết bảo đảm chất lượng không?',
    a: 'Có. Nature Spa bảo đảm kết quả theo phác đồ đã tư vấn. Nếu sau 3 buổi không có chuyển biến, KTV sẽ điều chỉnh liệu trình miễn phí hoặc hoàn tiền theo quy định.',
    tag: 'Sản phẩm',
    published: true,
    likes: 39,
    dislikes: 6,
  },
];

// ---------- Policy banner + hero highlights (view + dashboard shared) ------

export type Spa2PolicyHighlight = {
  icon: string;
  label: string;
  sub: string;
};

export type Spa2PolicyBanner = {
  eyebrow: string;
  titleLines: string[];
  subtitle: string;
  versionLabel: string;
  highlights: Spa2PolicyHighlight[];
};

export const spa2PolicyBanner: Spa2PolicyBanner = {
  eyebrow: 'Quy định & chính sách',
  titleLines: ['Minh bạch,', 'Công bằng,', 'Tôn trọng khách hàng.'],
  subtitle:
    'Mọi quy định đều được xây dựng để bảo vệ quyền lợi của bạn. Đọc kỹ để trải nghiệm tốt nhất tại Nature Spa.',
  versionLabel: 'Cập nhật 01/07/2026 · Phiên bản 3.2',
  highlights: [
    {
      icon: 'solar:shield-check-bold-duotone',
      label: 'Bảo mật tuyệt đối',
      sub: 'AES-256 · Nghị định 13/2023',
    },
    {
      icon: 'solar:diploma-bold-duotone',
      label: 'Chứng nhận ISO 9001',
      sub: 'Quản lý chất lượng quốc tế',
    },
    {
      icon: 'solar:hand-heart-bold-duotone',
      label: 'Cam kết hoàn tiền',
      sub: 'Hoàn 100% nếu chưa dùng',
    },
    {
      icon: 'solar:leaf-bold-duotone',
      label: 'Sản phẩm hữu cơ',
      sub: 'Kiểm định SGS Vietnam',
    },
  ],
};

// The sticky nav tabs on /spa2/policy — label/icon/article-number/order,
// fully editable from the policy manage view.
export type Spa2PolicyArticle = {
  id: string;
  label: string;
  icon: string;
  article: string;
};

export const spa2PolicyArticles: Spa2PolicyArticle[] = [
  { id: 'booking', label: 'Đặt lịch', icon: 'solar:calendar-bold', article: 'Điều 1' },
  { id: 'cancel', label: 'Hủy / Đổi lịch', icon: 'solar:close-circle-bold', article: 'Điều 2' },
  { id: 'refund', label: 'Hoàn tiền', icon: 'solar:refresh-bold', article: 'Điều 3' },
  { id: 'member', label: 'Thành viên', icon: 'solar:crown-bold', article: 'Điều 4' },
  { id: 'privacy', label: 'Bảo mật', icon: 'solar:lock-bold', article: 'Điều 5' },
  { id: 'product', label: 'Sản phẩm', icon: 'solar:leaf-bold', article: 'Điều 6' },
  { id: 'dispute', label: 'Khiếu nại', icon: 'solar:bill-list-bold', article: 'Điều 7' },
];

// ---------- Policy article BODY content (view + dashboard shared) --------
// Each article's body is one of a few recurring shapes seen across the 7
// clauses on /spa2/policy: info cards, a comparison table (cancel), a
// timeline (refund), membership tier cards (member), a plain bullet list
// (product), certification chips (product), and a trailing alert banner.
// A given article only fills in the shape(s) it actually uses; the public
// page and the policy manage view both render whichever fields are present.
export type Spa2PolicyCard = { icon: string; title: string; desc: string };
export type Spa2PolicyTimelineStep = { title: string; desc: string };
export type Spa2PolicyTableRow = { time: string; fee: string; refund: string; change: string };
export type Spa2PolicyTier = { label: string; color: string; textColor: string; perks: string[] };
export type Spa2PolicyCertChip = { label: string; icon: string };
export type Spa2PolicyAlert = { severity: 'info' | 'success' | 'warning'; text: string };

export type Spa2PolicyArticleContent = {
  id: string;
  title: string;
  cards?: Spa2PolicyCard[];
  tableRows?: Spa2PolicyTableRow[];
  timelineSteps?: Spa2PolicyTimelineStep[];
  tiers?: Spa2PolicyTier[];
  listItems?: string[];
  certChips?: Spa2PolicyCertChip[];
  alert?: Spa2PolicyAlert;
};

export const spa2PolicyArticleContent: Record<string, Spa2PolicyArticleContent> = {
  booking: {
    id: 'booking',
    title: 'Chính sách đặt lịch',
    cards: [
      {
        icon: 'solar:clock-circle-bold',
        title: 'Thời gian đặt trước',
        desc: 'Ngày thường: tối thiểu 2 giờ. Cuối tuần & lễ: trước 1 ngày để có khung giờ đẹp.',
      },
      {
        icon: 'solar:device-mobile-bold',
        title: 'Kênh đặt lịch',
        desc: 'Website, app, hotline 1900 6789, Zalo hoặc trực tiếp tại quầy lễ tân.',
      },
      {
        icon: 'solar:bell-bold',
        title: 'Xác nhận & nhắc lịch',
        desc: 'SMS + email xác nhận trong 15 phút. Nhắc tự động 2 giờ trước giờ hẹn.',
      },
    ],
    alert: {
      severity: 'info',
      text: 'Vui lòng đến trước 10 phút để hoàn tất thủ tục lễ tân và thư giãn trước khi vào liệu trình.',
    },
  },
  cancel: {
    id: 'cancel',
    title: 'Chính sách hủy & đổi lịch',
    tableRows: [
      { time: 'Trước 24 giờ', fee: 'Miễn phí', refund: '100%', change: 'Không giới hạn' },
      { time: 'Trước 4–24 giờ', fee: 'Miễn phí', refund: '100%', change: '1 lần' },
      { time: 'Trong vòng 4 giờ', fee: '20% giá dịch vụ', refund: '80%', change: 'Không' },
      { time: 'Không đến (no-show)', fee: '50% giá dịch vụ', refund: 'Không', change: 'Không' },
    ],
    alert: {
      severity: 'warning',
      text: 'Trường hợp khẩn cấp có giấy tờ chứng minh (bệnh viện, tai nạn…) sẽ được miễn phí hủy lịch theo từng trường hợp cụ thể.',
    },
  },
  refund: {
    id: 'refund',
    title: 'Chính sách hoàn tiền',
    timelineSteps: [
      {
        title: 'Gửi yêu cầu hoàn tiền',
        desc: 'Qua hotline, Zalo hoặc quầy lễ tân. Cần cung cấp mã đơn hàng và lý do cụ thể.',
      },
      {
        title: 'Xét duyệt trong 24 giờ',
        desc: 'Bộ phận CSKH xem xét và thông báo kết quả qua SMS và email đã đăng ký.',
      },
      {
        title: 'Hoàn tiền trong 3–7 ngày làm việc',
        desc: 'Chuyển khoản về tài khoản gốc hoặc cộng điểm thưởng (tùy chọn của khách hàng).',
      },
      {
        title: 'Xác nhận hoàn tất',
        desc: 'Email xác nhận kèm biên lai điện tử gửi về địa chỉ đã đăng ký.',
      },
    ],
    alert: {
      severity: 'success',
      text: 'Gói chưa sử dụng: hoàn 100%. Đã dùng một phần: hoàn theo tỷ lệ buổi còn lại. Voucher khuyến mãi không hoàn tiền mặt nhưng có thể đổi sang dịch vụ cùng giá trị.',
    },
  },
  member: {
    id: 'member',
    title: 'Chính sách thành viên',
    tiers: [
      {
        label: 'Thẻ Bạc',
        color: '#B4B2A9',
        textColor: '#5F5E5A',
        perks: ['Từ 0đ chi tiêu', 'Giảm 5% mọi dịch vụ', 'Quà sinh nhật 200K', '1đ / 10.000đ'],
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
    ],
    listItems: [
      'Thẻ có hiệu lực 24 tháng, gia hạn tự động khi còn giao dịch trong 12 tháng gần nhất.',
      'Điểm tích lũy: 10.000đ = 1 điểm. 1 điểm = 1.000đ khi giảm trừ hóa đơn hoặc đổi quà.',
      'Chuyển nhượng thẻ cho người thân tối đa 1 lần, cần xác nhận bằng văn bản tại quầy.',
    ],
  },
  privacy: {
    id: 'privacy',
    title: 'Chính sách bảo mật thông tin',
    cards: [
      {
        icon: 'solar:database-bold',
        title: 'Dữ liệu thu thập',
        desc: 'Họ tên, SĐT, email, lịch sử dịch vụ, tình trạng da. Không thu thập CCCD hay thông tin tài chính nhạy cảm.',
      },
      {
        icon: 'solar:shield-bold',
        title: 'Bảo vệ dữ liệu',
        desc: 'Mã hóa AES-256, máy chủ tại Việt Nam, tuân thủ Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.',
      },
      {
        icon: 'solar:eye-closed-bold',
        title: 'Không chia sẻ',
        desc: 'Không bán hoặc chia sẻ thông tin với bên thứ ba khi chưa có sự đồng ý bằng văn bản của khách hàng.',
      },
      {
        icon: 'solar:camera-slash-bold',
        title: 'Hình ảnh khách hàng',
        desc: 'Ảnh trước/sau chỉ sử dụng khi có biên bản đồng thuận ký tay. Có thể rút lại sự đồng ý bất kỳ lúc nào.',
      },
    ],
    alert: {
      severity: 'info',
      text: 'Khách hàng có quyền yêu cầu xem, chỉnh sửa hoặc xóa toàn bộ dữ liệu cá nhân bất kỳ lúc nào qua email privacy@naturespa.vn. Yêu cầu được xử lý trong vòng 7 ngày làm việc theo Nghị định 13/2023/NĐ-CP.',
    },
  },
  product: {
    id: 'product',
    title: 'Chính sách sản phẩm & nguyên liệu',
    listItems: [
      '100% nguyên liệu hữu cơ, không paraben, không cồn biến tính, không thử nghiệm trên động vật.',
      'Sản phẩm nhập khẩu có đầy đủ CO, CQ và giấy phép lưu hành tại Việt Nam do Bộ Y tế cấp.',
      'Kiểm định lô hàng mỗi 6 tháng bởi bên thứ ba độc lập (SGS Vietnam) — kết quả công khai trên website.',
      'An toàn cho da nhạy cảm, phụ nữ mang thai (từ tam cá nguyệt 2) và trẻ trên 12 tuổi.',
      'Thành phần và nguồn gốc từng sản phẩm công khai tại bảng thông tin trong phòng trị liệu.',
      'Bao bì tái chế 100%, giảm thiểu nhựa dùng một lần, phù hợp chứng nhận Eco-Spa quốc tế.',
    ],
    certChips: [
      { label: 'FDA Certified', icon: 'solar:verified-check-bold' },
      { label: 'CE Mark', icon: 'solar:shield-check-bold' },
      { label: 'ISO 9001:2015', icon: 'solar:medal-star-bold' },
      { label: 'Eco-Spa 2021', icon: 'solar:leaf-bold' },
      { label: 'CIDESCO', icon: 'solar:diploma-bold' },
    ],
  },
  dispute: {
    id: 'dispute',
    title: 'Chính sách khiếu nại & giải quyết tranh chấp',
    cards: [
      {
        icon: 'solar:chat-unread-bold',
        title: 'Gửi khiếu nại',
        desc: 'Hotline, email care@naturespa.vn hoặc form online. Cung cấp mã đơn và mô tả sự việc.',
      },
      {
        icon: 'solar:clock-circle-bold',
        title: 'Xử lý trong 48 giờ',
        desc: 'Phản hồi sơ bộ trong 4 giờ làm việc. Giải quyết triệt để trong 5 ngày làm việc.',
      },
      {
        icon: 'solar:balance-bold',
        title: 'Phán quyết cuối cùng',
        desc: 'Nếu không đạt thỏa thuận, tranh chấp giải quyết tại TAND TP.HCM theo pháp luật Việt Nam.',
      },
    ],
    alert: {
      severity: 'info',
      text: 'Khách hàng được bảo lưu quyền khiếu nại trong 30 ngày kể từ ngày xảy ra sự việc. Nature Spa cam kết xử lý mọi phản ánh một cách trung thực và thiện chí.',
    },
  },
};

export const spa2Policies = [
  {
    title: 'Chính sách đặt lịch',
    items: [
      'Đặt lịch qua website, hotline hoặc tại quầy.',
      'Vui lòng đến trước giờ hẹn 10 phút.',
      'Đổi/hủy lịch miễn phí trước 4 giờ.',
    ],
  },
  {
    title: 'Chính sách bảo mật',
    items: [
      'Mọi thông tin khách hàng được mã hóa và bảo mật tuyệt đối.',
      'Không chia sẻ thông tin với bên thứ ba khi chưa có sự đồng ý.',
      'Hình ảnh trước/sau chỉ được dùng khi khách đồng thuận bằng văn bản.',
    ],
  },
  {
    title: 'Chính sách hoàn tiền',
    items: [
      'Hoàn 100% nếu chưa sử dụng liệu trình.',
      'Hoàn theo tỷ lệ buổi còn lại nếu đã sử dụng một phần.',
      'Không hoàn tiền cho voucher khuyến mãi.',
    ],
  },
  {
    title: 'Chính sách thẻ thành viên',
    items: [
      'Thẻ có giá trị 12 tháng kể từ ngày kích hoạt.',
      'Có thể chuyển nhượng cho người thân (tối đa 1 lần).',
      'Tích điểm 1.000đ = 1 điểm, đổi quà tại quầy.',
    ],
  },
];

// ---------- Gallery banner (view + dashboard shared) -----------------------

export type Spa2GalleryBanner = Spa2PageBanner;

export const spa2GalleryBanner: Spa2GalleryBanner = {
  image: { url: SPA2_PAGE_IMAGES.gallery, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Gallery',
  title: 'Khoảnh khắc tại Nature Spa',
  subtitle: 'Không gian, sản phẩm và những cảm xúc được lưu giữ qua khung hình.',
};

export const spa2Gallery = [
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
  'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
  'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
  'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
  'https://images.unsplash.com/photo-1531112068337-3cd6d0d2b56b?w=900&q=80',
];

export const spa2ContactInfo = {
  hotline: '1900 6789',
  email: 'hello@naturespa.vn',
  zalo: '0909 868 868',
  address: '45 Nguyễn Huệ, Quận 1, TP.HCM',
  workingHours: '9:00 – 22:00 mỗi ngày',
};

// ---------- Đăng ký dịch vụ (admin-only operational data) ----------------
// Khách hàng để lại thông tin muốn đặt một dịch vụ cụ thể (khác với
// SPA2_BOOKINGS - đặt lịch theo gói/buổi hẹn cụ thể).

export type Spa2ServiceRegistrationStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled';

export type Spa2ServiceRegistration = {
  id: number;
  customer: string;
  phone: string;
  email: string;
  serviceSlug: string;
  serviceName: string;
  branch: string;
  note: string;
  createdAt: string;
  status: Spa2ServiceRegistrationStatus;
};

export const SPA2_SERVICE_REGISTRATIONS: Spa2ServiceRegistration[] = [
  {
    id: 1,
    customer: 'Nguyễn Thị Lan',
    phone: '0901 234 567',
    email: 'lan.nguyen@gmail.com',
    serviceSlug: 'herbal-massage',
    serviceName: 'Massage Thảo Dược',
    branch: 'Chi nhánh Quận 1',
    note: 'Muốn đặt buổi tối cuối tuần',
    createdAt: '2026-07-10',
    status: 'new',
  },
  {
    id: 2,
    customer: 'Trần Minh Khang',
    phone: '0912 345 678',
    email: 'khang.tran@gmail.com',
    serviceSlug: 'organic-facial',
    serviceName: 'Facial Organic',
    branch: 'Chi nhánh Quận 3',
    note: 'Da nhạy cảm, cần tư vấn trước',
    createdAt: '2026-07-11',
    status: 'contacted',
  },
  {
    id: 3,
    customer: 'Phạm Thu Hằng',
    phone: '0923 456 789',
    email: 'hang.pham@gmail.com',
    serviceSlug: 'couples-spa',
    serviceName: 'Spa Đôi',
    branch: 'Chi nhánh Đà Nẵng',
    note: 'Kỷ niệm ngày cưới',
    createdAt: '2026-07-12',
    status: 'confirmed',
  },
  {
    id: 4,
    customer: 'Lê Anh Tuấn',
    phone: '0934 567 890',
    email: 'tuan.le@gmail.com',
    serviceSlug: 'detox-cleanse',
    serviceName: 'Detox & Thanh Lọc',
    branch: 'Chi nhánh Quận 1',
    note: '',
    createdAt: '2026-07-13',
    status: 'new',
  },
  {
    id: 5,
    customer: 'Ngô Bảo Châu',
    phone: '0945 678 901',
    email: 'chau.ngo@gmail.com',
    serviceSlug: 'aromatherapy',
    serviceName: 'Aromatherapy',
    branch: 'Chi nhánh Quận 3',
    note: 'Khách quen, ưu tiên giờ sáng',
    createdAt: '2026-07-08',
    status: 'cancelled',
  },
];

// ---------- Đăng ký đào tạo (admin-only operational data) ----------------

export type Spa2TrainingRegistrationStatus = 'new' | 'contacted' | 'enrolled' | 'cancelled';

export type Spa2TrainingRegistration = {
  id: number;
  name: string;
  phone: string;
  email: string;
  programName: string;
  note: string;
  createdAt: string;
  status: Spa2TrainingRegistrationStatus;
};

export const SPA2_TRAINING_REGISTRATIONS: Spa2TrainingRegistration[] = [
  {
    id: 1,
    name: 'Đặng Thị Mai',
    phone: '0901 111 222',
    email: 'mai.dang@gmail.com',
    programName: 'Khóa Massage Trị Liệu Cơ Bản',
    note: 'Muốn học buổi tối',
    createdAt: '2026-07-05',
    status: 'new',
  },
  {
    id: 2,
    name: 'Vũ Hoàng Long',
    phone: '0912 222 333',
    email: 'long.vu@gmail.com',
    programName: 'Khóa Facial Chuyên Sâu',
    note: 'Đã có kinh nghiệm 1 năm',
    createdAt: '2026-07-06',
    status: 'contacted',
  },
  {
    id: 3,
    name: 'Trịnh Yến Nhi',
    phone: '0923 333 444',
    email: 'nhi.trinh@gmail.com',
    programName: 'Khóa Massage Trị Liệu Cơ Bản',
    note: '',
    createdAt: '2026-07-07',
    status: 'enrolled',
  },
  {
    id: 4,
    name: 'Bùi Quốc Huy',
    phone: '0934 444 555',
    email: 'huy.bui@gmail.com',
    programName: 'Khóa Facial Chuyên Sâu',
    note: 'Xin dời lịch khai giảng',
    createdAt: '2026-07-01',
    status: 'cancelled',
  },
];

// ---------- Hồ sơ ứng tuyển (admin-only operational data) ----------------

export type Spa2CareerApplicationStatus = 'new' | 'reviewing' | 'interview' | 'hired' | 'rejected';

export type Spa2CareerApplication = {
  id: number;
  name: string;
  phone: string;
  email: string;
  jobId: number;
  jobTitle: string;
  avatar: string;
  cvUrl: string;
  note: string;
  createdAt: string;
  status: Spa2CareerApplicationStatus;
};

// cvUrl: dùng file PDF mẫu công khai để minh hoạ chức năng xem trước CV trong
// popup quản lý hồ sơ ứng tuyển (bên trái thông tin/ảnh ứng viên, bên phải preview CV).
const SPA2_SAMPLE_CV_PDF =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const SPA2_CAREER_APPLICATIONS: Spa2CareerApplication[] = [
  {
    id: 1,
    name: 'Hồ Thị Kim Ngân',
    phone: '0901 555 666',
    email: 'ngan.ho@gmail.com',
    jobId: 1,
    jobTitle: 'Kỹ thuật viên Spa cao cấp',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80',
    cvUrl: SPA2_SAMPLE_CV_PDF,
    note: '3 năm kinh nghiệm tại spa 5 sao',
    createdAt: '2026-07-08',
    status: 'interview',
  },
  {
    id: 2,
    name: 'Đỗ Văn Phúc',
    phone: '0912 666 777',
    email: 'phuc.do@gmail.com',
    jobId: 2,
    jobTitle: 'Chuyên viên tư vấn khách hàng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    cvUrl: SPA2_SAMPLE_CV_PDF,
    note: '',
    createdAt: '2026-07-09',
    status: 'new',
  },
  {
    id: 3,
    name: 'Lương Thị Bích',
    phone: '0923 777 888',
    email: 'bich.luong@gmail.com',
    jobId: 3,
    jobTitle: 'Quản lý chi nhánh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80',
    cvUrl: SPA2_SAMPLE_CV_PDF,
    note: 'Từng quản lý chuỗi 3 chi nhánh',
    createdAt: '2026-07-04',
    status: 'reviewing',
  },
  {
    id: 4,
    name: 'Phan Đức Anh',
    phone: '0934 888 999',
    email: 'anh.phan@gmail.com',
    jobId: 4,
    jobTitle: 'Nhân viên Marketing nội dung',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80',
    cvUrl: SPA2_SAMPLE_CV_PDF,
    note: 'Portfolio TikTok 50k follower',
    createdAt: '2026-06-30',
    status: 'hired',
  },
  {
    id: 5,
    name: 'Trương Gia Bảo',
    phone: '0945 999 000',
    email: 'bao.truong@gmail.com',
    jobId: 1,
    jobTitle: 'Kỹ thuật viên Spa cao cấp',
    avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&q=80',
    cvUrl: '',
    note: 'Chưa có kinh nghiệm ngành spa',
    createdAt: '2026-06-28',
    status: 'rejected',
  },
];

// ---------- Khách hàng liên hệ (admin-only operational data) -------------

export type Spa2ContactSubmissionStatus = 'new' | 'replied' | 'closed';

export type Spa2ContactSubmission = {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: Spa2ContactSubmissionStatus;
};

export const SPA2_CONTACT_SUBMISSIONS: Spa2ContactSubmission[] = [
  {
    id: 1,
    name: 'Nguyễn Hải Yến',
    phone: '0901 123 456',
    email: 'yen.nguyen@gmail.com',
    subject: 'Hỏi về giá combo',
    message: 'Cho mình hỏi Combo Đôi Lứa còn ưu đãi không ạ?',
    createdAt: '2026-07-14',
    status: 'new',
  },
  {
    id: 2,
    name: 'Trần Bảo Ngọc',
    phone: '0912 234 567',
    email: 'ngoc.tran@gmail.com',
    subject: 'Góp ý dịch vụ',
    message: 'Nhân viên tư vấn rất nhiệt tình, cảm ơn spa nhiều.',
    createdAt: '2026-07-13',
    status: 'replied',
  },
  {
    id: 3,
    name: 'Lâm Quốc Việt',
    phone: '0923 345 678',
    email: 'viet.lam@gmail.com',
    subject: 'Hỏi lịch khai giảng khoá học',
    message: 'Khoá Facial Chuyên Sâu tháng 8 khai giảng ngày nào ạ?',
    createdAt: '2026-07-09',
    status: 'closed',
  },
];

// ---------- Khách hàng đặt combo / nhận voucher (admin-only) -------------

export type Spa2OfferRedemptionType = 'combo' | 'voucher';
export type Spa2OfferRedemptionStatus = 'new' | 'confirmed' | 'used' | 'cancelled';
export type Spa2OfferPaymentStatus = 'unpaid' | 'paid' | 'refunded';

export type Spa2OfferRedemption = {
  id: number;
  customer: string;
  phone: string;
  type: Spa2OfferRedemptionType;
  itemCode: string;
  itemName: string;
  // Combo: giá trị đơn hàng (giá bán combo). Voucher: giá trị hoá đơn được áp dụng voucher.
  orderValue: number;
  // Chỉ áp dụng cho voucher - số tiền/mức giảm thực tế đã áp dụng.
  discountAmount?: number;
  paymentStatus: Spa2OfferPaymentStatus;
  createdAt: string;
  status: Spa2OfferRedemptionStatus;
};

export const SPA2_OFFER_REDEMPTIONS: Spa2OfferRedemption[] = [
  {
    id: 1,
    customer: 'Đinh Thu Trang',
    phone: '0901 987 654',
    type: 'combo',
    itemCode: 'combo-thanh-xuan',
    itemName: 'Combo Thanh Xuân',
    orderValue: 1890000,
    paymentStatus: 'paid',
    createdAt: '2026-07-11',
    status: 'confirmed',
  },
  {
    id: 2,
    customer: 'Hoàng Minh Đức',
    phone: '0912 876 543',
    type: 'voucher',
    itemCode: 'NEW30',
    itemName: 'Ưu đãi khách mới',
    orderValue: 690000,
    discountAmount: 207000,
    paymentStatus: 'paid',
    createdAt: '2026-07-12',
    status: 'used',
  },
  {
    id: 3,
    customer: 'Vương Thị Kim',
    phone: '0923 765 432',
    type: 'combo',
    itemCode: 'combo-doi-lua',
    itemName: 'Combo Đôi Lứa',
    orderValue: 2790000,
    paymentStatus: 'unpaid',
    createdAt: '2026-07-13',
    status: 'new',
  },
  {
    id: 4,
    customer: 'Tạ Văn Sơn',
    phone: '0934 654 321',
    type: 'voucher',
    itemCode: 'BIRTHDAY',
    itemName: 'Sinh nhật vàng',
    orderValue: 990000,
    discountAmount: 500000,
    paymentStatus: 'refunded',
    createdAt: '2026-06-25',
    status: 'cancelled',
  },
  {
    id: 5,
    customer: 'Chu Bảo Trâm',
    phone: '0945 543 210',
    type: 'combo',
    itemCode: 'combo-detox-toan-dien',
    itemName: 'Combo Detox Toàn Diện',
    orderValue: 4290000,
    paymentStatus: 'unpaid',
    createdAt: '2026-07-14',
    status: 'new',
  },
];

// ---------- Membership banner + tiers (view + dashboard shared) ------------

export type Spa2MembershipBanner = Spa2PageBanner;

export const spa2MembershipBanner: Spa2MembershipBanner = {
  image: { url: SPA2_PAGE_IMAGES.membership, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Thành viên',
  title: 'Trở thành thành viên Nature Spa',
  subtitle: 'Tích điểm, nhận ưu đãi và trải nghiệm dịch vụ đẳng cấp cao hơn mỗi ngày.',
};

export type Spa2MembershipTier = {
  id: string;
  name: string;
  price: number;
  color: string;
  accent: string;
  desc: string;
  perks: string[];
  notIncluded: string[];
  hot: boolean;
};

export const spa2MembershipTiers: Spa2MembershipTier[] = [
  {
    id: 'silver',
    name: 'Silver',
    price: 0,
    color: '#9E9E9E',
    accent: '#F5F5F5',
    desc: 'Dành cho khách mới – bắt đầu hành trình chăm sóc sức khỏe.',
    perks: [
      'Giảm 5% mọi dịch vụ',
      'Tích 1đ / 10.000đ',
      'Quà sinh nhật 200K',
      'Đặt lịch ưu tiên',
      'Bản tin sức khỏe hàng tháng',
    ],
    notIncluded: [
      'Nhân đôi điểm cuối tuần',
      'Buổi check-up da miễn phí',
      'Concierge riêng',
      'Spa Đôi tặng thêm',
    ],
    hot: false,
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 990000,
    color: '#EF9F27',
    accent: '#FFF8EE',
    desc: 'Phổ biến nhất – dành cho những ai yêu thích dịch vụ chăm sóc đều đặn.',
    perks: [
      'Giảm 10% + ưu tiên giờ vàng',
      'Tích 2đ / 10.000đ cuối tuần',
      'Quà sinh nhật 500K',
      '1 buổi check-up da / năm',
      'Nhân đôi điểm cuối tuần',
      'Hỗ trợ 24/7 qua Zalo',
    ],
    notIncluded: ['Concierge riêng', 'Spa Đôi tặng thêm'],
    hot: true,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 2990000,
    color: '#7F77DD',
    accent: '#F3F2FF',
    desc: 'Trải nghiệm cao cấp nhất – dành cho thành viên VIP của Nature Spa.',
    perks: [
      'Giảm 15% + concierge riêng',
      'Tích 3đ / 10.000đ tháng SN',
      'Quà sinh nhật 1 triệu đ',
      '2 buổi check-up da / năm',
      'Nhân đôi điểm mọi ngày',
      '2 buổi Spa Đôi / năm',
      'Đường dây hotline riêng 24/7',
    ],
    notIncluded: [],
    hot: false,
  },
];

export type Spa2MembershipCompareRow = {
  feature: string;
  silver: string;
  gold: string;
  platinum: string;
};

export const spa2MembershipCompareRows: Spa2MembershipCompareRow[] = [
  { feature: 'Giảm giá dịch vụ', silver: '5%', gold: '10%', platinum: '15%' },
  {
    feature: 'Tích điểm',
    silver: '1đ/10K',
    gold: '2đ/10K (cuối tuần)',
    platinum: '3đ/10K (tháng SN)',
  },
  { feature: 'Quà sinh nhật', silver: '200.000đ', gold: '500.000đ', platinum: '1.000.000đ' },
  { feature: 'Buổi check-up da', silver: '—', gold: '1 buổi/năm', platinum: '2 buổi/năm' },
  { feature: 'Buổi Spa Đôi tặng', silver: '—', gold: '—', platinum: '2 buổi/năm' },
  { feature: 'Concierge riêng', silver: '—', gold: '—', platinum: '✓' },
  { feature: 'Ưu tiên giờ vàng', silver: '—', gold: '✓', platinum: '✓' },
  { feature: 'Hotline 24/7', silver: '—', gold: 'Zalo', platinum: 'Số riêng' },
];

export type Spa2MembershipSignupStatus = 'active' | 'expired' | 'cancelled';

export type Spa2MembershipSignup = {
  id: number;
  customer: string;
  phone: string;
  email?: string;
  tier: string;
  billing: 'monthly' | 'yearly';
  joinedAt: string;
  status: Spa2MembershipSignupStatus;
  note?: string;
};

export const SPA2_MEMBERSHIP_SIGNUPS: Spa2MembershipSignup[] = [
  {
    id: 1,
    customer: 'Phạm Thị Ngọc',
    phone: '0901 112 233',
    email: 'ngoc.pham@example.com',
    tier: 'Gold',
    billing: 'yearly',
    joinedAt: '2026-02-14',
    status: 'active',
    note: 'Khách quen, hay đặt lịch cuối tuần.',
  },
  {
    id: 2,
    customer: 'Lâm Quốc Huy',
    phone: '0912 223 344',
    email: 'huy.lam@example.com',
    tier: 'Platinum',
    billing: 'monthly',
    joinedAt: '2026-05-03',
    status: 'active',
    note: '',
  },
  {
    id: 3,
    customer: 'Đỗ Thu Hà',
    phone: '0923 334 455',
    email: 'ha.do@example.com',
    tier: 'Silver',
    billing: 'monthly',
    joinedAt: '2026-01-20',
    status: 'cancelled',
    note: 'Đã huỷ do chuyển sang chi nhánh khác.',
  },
  {
    id: 4,
    customer: 'Ngô Bảo Châu',
    phone: '0934 445 566',
    email: 'chau.ngo@example.com',
    tier: 'Gold',
    billing: 'monthly',
    joinedAt: '2025-06-11',
    status: 'expired',
    note: 'Chưa gia hạn sau khi hết hạn.',
  },
  {
    id: 5,
    customer: 'Vũ Minh Anh',
    phone: '0945 556 677',
    email: 'anh.vu@example.com',
    tier: 'Platinum',
    billing: 'yearly',
    joinedAt: '2026-06-30',
    status: 'active',
    note: 'Thành viên VIP, ưu tiên chăm sóc.',
  },
];

// ---------- Gift Card banner + catalog (view + dashboard shared) -----------

export type Spa2GiftCardBanner = Spa2PageBanner;

export const spa2GiftCardBanner: Spa2GiftCardBanner = {
  image: { url: SPA2_PAGE_IMAGES.giftCard, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Tặng quà',
  title: 'Thẻ quà tặng Nature Spa',
  subtitle: 'Món quà hoàn hảo cho người thân và bạn bè — trải nghiệm spa sang trọng, giao tận tay.',
};

export const spa2GiftCardDenominations: number[] = [200000, 500000, 1000000, 2000000, 5000000];

export type Spa2GiftCardDesign = { id: string; label: string; bg: string; emoji: string };

export const spa2GiftCardDesigns: Spa2GiftCardDesign[] = [
  {
    id: 'nature',
    label: 'Thiên nhiên',
    bg: 'linear-gradient(135deg, #2E8B7A 0%, #1D6B5C 100%)',
    emoji: '🌿',
  },
  {
    id: 'sakura',
    label: 'Hoa anh đào',
    bg: 'linear-gradient(135deg, #F48FB1 0%, #C2185B 100%)',
    emoji: '🌸',
  },
  {
    id: 'sunset',
    label: 'Hoàng hôn',
    bg: 'linear-gradient(135deg, #FFB74D 0%, #E64A19 100%)',
    emoji: '🌅',
  },
  {
    id: 'ocean',
    label: 'Đại dương',
    bg: 'linear-gradient(135deg, #4FC3F7 0%, #0277BD 100%)',
    emoji: '🌊',
  },
];

export type Spa2GiftCardOrderStatus = 'issued' | 'redeemed' | 'expired' | 'cancelled';

export type Spa2GiftCardOrder = {
  id: number;
  code: string;
  senderName: string;
  receiverName: string;
  receiverEmail: string;
  amount: number;
  designId: string;
  message: string;
  createdAt: string;
  status: Spa2GiftCardOrderStatus;
};

export const SPA2_GIFT_CARD_ORDERS: Spa2GiftCardOrder[] = [
  {
    id: 1,
    code: 'GIFT-1001',
    senderName: 'Nguyễn Văn An',
    receiverName: 'Nguyễn Thị Lan',
    receiverEmail: 'lan.nguyen@example.com',
    amount: 500000,
    designId: 'nature',
    message: 'Chúc mừng sinh nhật chị!',
    createdAt: '2026-07-10',
    status: 'issued',
  },
  {
    id: 2,
    code: 'GIFT-1002',
    senderName: 'Trần Thị Bích',
    receiverName: 'Trần Văn Cường',
    receiverEmail: 'cuong.tran@example.com',
    amount: 1000000,
    designId: 'sakura',
    message: 'Kỷ niệm ngày cưới của chúng ta.',
    createdAt: '2026-07-05',
    status: 'redeemed',
  },
  {
    id: 3,
    code: 'GIFT-1003',
    senderName: 'Lê Hoàng Dũng',
    receiverName: 'Lê Thị Mai',
    receiverEmail: 'mai.le@example.com',
    amount: 2000000,
    designId: 'sunset',
    message: 'Cảm ơn vì tất cả!',
    createdAt: '2026-06-18',
    status: 'issued',
  },
  {
    id: 4,
    code: 'GIFT-1004',
    senderName: 'Phạm Quốc Việt',
    receiverName: 'Phạm Thu Trang',
    receiverEmail: 'trang.pham@example.com',
    amount: 200000,
    designId: 'ocean',
    message: '',
    createdAt: '2025-11-02',
    status: 'expired',
  },
  {
    id: 5,
    code: 'GIFT-1005',
    senderName: 'Hoàng Thị Yến',
    receiverName: 'Hoàng Văn Nam',
    receiverEmail: 'nam.hoang@example.com',
    amount: 5000000,
    designId: 'nature',
    message: 'Quà Tết gửi anh trai.',
    createdAt: '2026-07-15',
    status: 'cancelled',
  },
];

export type Spa2GiftCardReason = { id: string; icon: string; title: string; desc: string };

export const spa2GiftCardReasons: Spa2GiftCardReason[] = [
  {
    id: 'meaningful',
    icon: 'solar:gift-bold-duotone',
    title: 'Quà tặng ý nghĩa',
    desc: 'Phù hợp mọi dịp: sinh nhật, lễ, Tết, kỷ niệm, thăng chức.',
  },
  {
    id: 'instant',
    icon: 'solar:send-bold-duotone',
    title: 'Giao tức thì qua email',
    desc: 'Thẻ điện tử gửi trong vài giây, không cần chờ ship.',
  },
  {
    id: 'valid-12m',
    icon: 'solar:clock-circle-bold-duotone',
    title: 'Hiệu lực 12 tháng',
    desc: 'Người nhận dùng linh hoạt trong vòng 1 năm kể từ ngày nhận.',
  },
  {
    id: 'all-branches',
    icon: 'solar:map-point-bold-duotone',
    title: 'Dùng ở mọi chi nhánh',
    desc: 'Áp dụng tại 4 chi nhánh: TP.HCM, Hà Nội, Đà Nẵng, Nha Trang.',
  },
];

// ---------- Wellness Package banner + catalog (view + dashboard shared) ----

export type Spa2WellnessPackageBanner = Spa2PageBanner;

export const spa2WellnessPackageBanner: Spa2WellnessPackageBanner = {
  image: { url: SPA2_PAGE_IMAGES.wellnessPackage, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Wellness',
  title: 'Gói nghỉ dưỡng & phục hồi sức khỏe',
  subtitle: 'Trọn gói từ sáng đến chiều — để cơ thể và tâm trí được hồi phục hoàn toàn.',
};

export type Spa2WellnessPackageItem = {
  id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
  includes: string[];
  tag: string;
  hot: boolean;
};

export const spa2WellnessPackages: Spa2WellnessPackageItem[] = [
  {
    id: 'relax-day',
    name: 'Relax Day',
    duration: '4 giờ',
    price: 1890000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    includes: [
      'Massage toàn thân 60p',
      'Facial cơ bản 45p',
      'Trà thảo mộc & snack',
      'Xông hơi đá muối 20p',
    ],
    tag: 'Cơ bản',
    hot: false,
  },
  {
    id: 'renewal-day',
    name: 'Renewal Day',
    duration: '6 giờ',
    price: 2990000,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    includes: [
      'Massage thảo dược 90p',
      'Facial Organic 75p',
      'Body Scrub 45p',
      'Trà & bữa nhẹ',
      'Xông hơi 30p',
    ],
    tag: 'Phổ biến',
    hot: true,
  },
  {
    id: 'retreat-day',
    name: 'Retreat Day',
    duration: '8 giờ',
    price: 4590000,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80',
    includes: [
      'Massage 120p',
      'Facial nâng cao 90p',
      'Body Wrap 60p',
      'Detox juice 500ml',
      'Bữa trưa healthy',
      'Phòng VIP cả ngày',
    ],
    tag: 'Cao cấp',
    hot: false,
  },
];

export type Spa2WellnessAddon = { id: string; name: string; price: number; icon: string };

export const spa2WellnessAddons: Spa2WellnessAddon[] = [
  { id: 'aromatherapy', name: 'Bổ sung Aromatherapy', price: 290000, icon: 'solar:leaf-bold' },
  { id: 'vip-room', name: 'Upgrade phòng VIP', price: 490000, icon: 'solar:crown-bold' },
  { id: 'detox-juice', name: 'Thêm Detox Juice Box', price: 190000, icon: 'solar:cup-bold' },
  { id: 'photo', name: 'Chụp ảnh kỷ niệm', price: 0, icon: 'solar:camera-bold' },
  { id: 'flowers', name: 'Bouquet hoa tươi', price: 390000, icon: 'solar:heart-bold' },
  { id: 'cake-card', name: 'Bánh & thiệp mừng', price: 250000, icon: 'solar:gift-bold' },
];

// ---------- Skin Quiz banner + questions + results (shared with dashboard
// "manage" view) ----------

export type Spa2SkinQuizBanner = Spa2PageBanner;

export const spa2SkinQuizBanner: Spa2SkinQuizBanner = {
  image: { url: SPA2_PAGE_IMAGES.skinQuiz, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Chăm sóc da',
  title: 'Trắc nghiệm loại da & liệu trình phù hợp',
  subtitle: '4 câu hỏi đơn giản — nhận gợi ý chăm sóc da được cá nhân hóa riêng cho bạn.',
};

export type Spa2SkinQuizQuestion = { id: string; question: string; options: string[] };

export const spa2SkinQuizQuestions: Spa2SkinQuizQuestion[] = [
  {
    id: 'q1',
    question: 'Da bạn có cảm giác thế nào vào buổi sáng?',
    options: [
      'Căng khô, bong tróc',
      'Dầu bóng toàn mặt',
      'Dầu vùng T, khô vùng má',
      'Bình thường, thoải mái',
    ],
  },
  {
    id: 'q2',
    question: 'Sau khi rửa mặt, da bạn cảm thấy?',
    options: ['Rất căng và khô', 'Vẫn còn nhờn', 'Căng ở má, nhờn ở mũi', 'Thoải mái, cân bằng'],
  },
  {
    id: 'q3',
    question: 'Bạn thường gặp vấn đề gì với da?',
    options: [
      'Da bong tróc, thiếu ẩm',
      'Lỗ chân lông to, mụn đầu đen',
      'Mụn vùng T, căng vùng má',
      'Thỉnh thoảng mẩn đỏ nhẹ',
    ],
  },
  {
    id: 'q4',
    question: 'Sau 4 giờ không chăm sóc, da bạn?',
    options: [
      'Khô rát, có đường nứt nhỏ',
      'Bóng dầu rõ rệt',
      'Bóng vùng trán, khô má',
      'Hầu như không thay đổi',
    ],
  },
];

// Index of each result matches the tally index (0-3) computed from the most
// frequently picked option position across all 4 questions - keep this array
// order unchanged, or the public quiz's scoring logic will point at the
// wrong result.
export type Spa2SkinQuizResult = {
  id: string;
  type: string;
  desc: string;
  services: string[];
  icon: string;
};

export const spa2SkinQuizResults: Spa2SkinQuizResult[] = [
  {
    id: 'dry',
    type: 'Da khô',
    desc: 'Da bạn thiếu độ ẩm và dầu tự nhiên. Cần liệu trình cấp ẩm chuyên sâu và phục hồi hàng rào bảo vệ da.',
    services: ['Facial Organic', 'Aromatherapy', 'Body Scrub & Wrap'],
    icon: 'solar:drop-bold-duotone',
  },
  {
    id: 'oily',
    type: 'Da dầu',
    desc: 'Tuyến bã nhờn hoạt động mạnh. Cần liệu trình kiểm soát dầu, làm sạch sâu và thu nhỏ lỗ chân lông.',
    services: ['Facial Organic', 'Body Scrub & Wrap', 'Detox & Thanh Lọc'],
    icon: 'solar:sun-bold-duotone',
  },
  {
    id: 'combination',
    type: 'Da hỗn hợp',
    desc: 'Vùng T dầu, vùng má khô — cần liệu trình cân bằng dầu nước và chăm sóc theo vùng.',
    services: ['Facial Organic', 'Aromatherapy', 'Massage Thảo Dược'],
    icon: 'solar:cloud-sun-bold-duotone',
  },
  {
    id: 'normal',
    type: 'Da thường',
    desc: 'Làn da lý tưởng — duy trì bằng liệu trình dưỡng ẩm và phòng ngừa lão hóa sớm.',
    services: ['Massage Thảo Dược', 'Aromatherapy', 'Spa Đôi'],
    icon: 'solar:star-bold-duotone',
  },
];

// ---------- Corporate wellness banner + benefits + plans + service
// channels (shared with dashboard "manage" view) ----------

export type Spa2CorporateBanner = Spa2PageBanner;

export const spa2CorporateBanner: Spa2CorporateBanner = {
  image: { url: SPA2_PAGE_IMAGES.corporate, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Doanh nghiệp',
  title: 'Chương trình Wellness cho doanh nghiệp',
  subtitle: 'Đầu tư vào sức khỏe nhân viên — nâng cao năng suất và giữ chân nhân tài.',
};

export type Spa2CorporateBenefit = { id: string; icon: string; title: string; desc: string };

export const spa2CorporateBenefits: Spa2CorporateBenefit[] = [
  {
    id: 'productivity',
    icon: 'solar:health-bold-duotone',
    title: 'Tăng năng suất',
    desc: 'Nhân viên khỏe mạnh làm việc hiệu quả hơn 25% theo nghiên cứu Harvard Business Review.',
  },
  {
    id: 'engagement',
    icon: 'solar:users-group-rounded-bold-duotone',
    title: 'Gắn kết đội ngũ',
    desc: 'Hoạt động chăm sóc sức khỏe chung giúp tăng sự gắn kết và tinh thần đồng đội.',
  },
  {
    id: 'sick-leave',
    icon: 'solar:chart-2-bold-duotone',
    title: 'Giảm nghỉ phép',
    desc: 'Doanh nghiệp đầu tư vào wellness giảm 30% ngày nghỉ ốm đau của nhân viên.',
  },
  {
    id: 'retention',
    icon: 'solar:medal-star-bold-duotone',
    title: 'Giữ chân nhân tài',
    desc: 'Phúc lợi sức khỏe là yếu tố quan trọng thứ 2 khi nhân viên chọn nơi làm việc.',
  },
];

export type Spa2CorporatePlan = {
  id: string;
  name: string;
  members: string;
  price: number;
  period: string;
  hot: boolean;
  perks: string[];
};

export const spa2CorporatePlans: Spa2CorporatePlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    members: '5–15 người',
    price: 3900000,
    period: 'tháng',
    hot: false,
    perks: [
      'Giảm 20% cho đội nhóm',
      'Đặt lịch theo nhóm',
      'Báo cáo sức khỏe hàng quý',
      'Hotline riêng',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    members: '16–50 người',
    price: 8900000,
    period: 'tháng',
    hot: true,
    perks: [
      'Giảm 25% cho đội nhóm',
      'Workshop sức khỏe 1 buổi/tháng',
      'Chuyên gia đến tận nơi 2 lần/năm',
      'Báo cáo sức khỏe hàng tháng',
      'Account manager riêng',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    members: '50+ người',
    price: 0,
    period: '',
    hot: false,
    perks: [
      'Giảm tối đa 35%',
      'Chương trình wellbeing tùy chỉnh',
      'Workshop không giới hạn',
      'Bác sĩ tư vấn hàng tháng',
      'Dashboard theo dõi online',
      'Hợp đồng SLA',
    ],
  },
];

export type Spa2CorporateServiceChannel = { id: string; label: string; items: string[] };

export const spa2CorporateServiceChannels: Spa2CorporateServiceChannel[] = [
  {
    id: 'office',
    label: 'Tại văn phòng',
    items: [
      'Massage vai gáy 20 phút tại bàn',
      'Workshop stress management',
      'Yoga nhẹ cho văn phòng',
      'Tư vấn dinh dưỡng tại chỗ',
      'Thiết lập góc thư giãn tại VP',
    ],
  },
  {
    id: 'spa',
    label: 'Tại spa',
    items: [
      'Spa Day theo nhóm (tối đa 20 người)',
      'Gói Retreat cuối tuần cho team',
      'Liệu trình chăm sóc da nhóm',
      'Detox package cho đội ngũ',
      'Bữa tiệc kết hợp spa',
    ],
  },
  {
    id: 'online',
    label: 'Online',
    items: [
      'Webinar sức khỏe hàng tháng',
      'Coaching 1-1 qua Zoom',
      'App theo dõi sức khỏe cá nhân',
      'Tư vấn da liễu trực tuyến',
      'Thư viện video yoga & thiền',
    ],
  },
];

// ---------- Shop banner + categories + products (shared with dashboard
// "manage" view) ----------

export type Spa2ShopBanner = Spa2PageBanner;

export const spa2ShopBanner: Spa2ShopBanner = {
  image: { url: SPA2_PAGE_IMAGES.shop, focalX: 50, focalY: 50, zoom: 100 },
  eyebrow: 'Cửa hàng',
  title: 'Sản phẩm hữu cơ Nature Spa',
  subtitle: 'Mang hương thơm và dưỡng chất thiên nhiên vào không gian sống của bạn.',
};

// 'all' is a public-page-only filter chip, not a real product category - the
// admin manage view excludes it from the per-product category select.
export type Spa2ShopCategory = { value: string; label: string };

export const spa2ShopCategories: Spa2ShopCategory[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'skincare', label: 'Skincare' },
  { value: 'essential-oil', label: 'Tinh dầu' },
  { value: 'bath', label: 'Tắm & Body' },
  { value: 'set', label: 'Bộ sản phẩm' },
];

export type Spa2ShopProduct = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
  category: string;
};

export const spa2ShopProducts: Spa2ShopProduct[] = [
  {
    id: 'tinh-dau-sa-gung',
    name: 'Tinh Dầu Sả Gừng',
    price: 290000,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80',
    tag: 'Bestseller',
    category: 'essential-oil',
  },
  {
    id: 'kem-duong-hoa-hong',
    name: 'Kem Dưỡng Hoa Hồng Hữu Cơ',
    price: 490000,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    tag: 'Mới',
    category: 'skincare',
  },
  {
    id: 'muoi-khoang-tam-lavender',
    name: 'Muối Khoáng Tắm Lavender',
    price: 180000,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&q=80',
    tag: '',
    category: 'bath',
  },
  {
    id: 'serum-te-bao-goc',
    name: 'Tinh Chất Serum Tế Bào Gốc',
    price: 890000,
    rating: 4.8,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
    tag: 'Hot',
    category: 'skincare',
  },
  {
    id: 'bo-cham-soc-da-kho',
    name: 'Bộ Chăm Sóc Da Khô (3 món)',
    price: 1290000,
    rating: 4.9,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&q=80',
    tag: 'Combo',
    category: 'set',
  },
  {
    id: 'tinh-dau-bac-ha-tram-tra',
    name: 'Tinh Dầu Bạc Hà & Tràm Trà',
    price: 220000,
    rating: 4.6,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80',
    tag: '',
    category: 'essential-oil',
  },
  {
    id: 'tay-da-chet-mat-ong-yen-mach',
    name: 'Tẩy Da Chết Mật Ong & Yến Mạch',
    price: 320000,
    rating: 4.7,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
    tag: '',
    category: 'bath',
  },
  {
    id: 'bo-wellness-gift-set',
    name: 'Bộ Wellness Gift Set',
    price: 2490000,
    rating: 5.0,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&q=80',
    tag: 'Gift',
    category: 'set',
  },
];

// ============================== SPA2 - END ====================================
