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
  },
  {
    id: 'f2',
    q: 'Sản phẩm sử dụng có an toàn cho da nhạy cảm?',
    a: 'Chúng tôi sử dụng 100% nguyên liệu hữu cơ, không cồn, không paraben, an toàn cho cả da nhạy cảm và phụ nữ mang thai.',
  },
  {
    id: 'f3',
    q: 'Có hỗ trợ thanh toán trả góp không?',
    a: 'Có. Nature Spa hỗ trợ trả góp 0% qua thẻ tín dụng của 12 ngân hàng đối tác.',
  },
  {
    id: 'f4',
    q: 'Tôi có thể đổi/hủy lịch không?',
    a: 'Bạn có thể đổi hoặc hủy lịch miễn phí trước 4 giờ so với giờ hẹn.',
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

const DEFAULT_BEFORE_AFTERS = [
  {
    id: 'ba1',
    title: 'Trị mụn – 8 buổi',
    before: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    duration: '2 tháng',
    note: 'Giảm 90% mụn viêm, da đều màu, lỗ chân lông se nhỏ.',
  },
  {
    id: 'ba2',
    title: 'Trẻ hóa da – 10 buổi',
    before: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    duration: '2 tháng',
    note: 'Nâng cơ, mờ nếp nhăn, da săn chắc tự nhiên.',
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

// ---------- Partners --------------------------------------------------

export const spa2PartnerProfiles = [
  {
    name: 'Comfort Zone',
    country: 'Italy',
    logo: 'CZ',
    specialty: 'Mỹ phẩm sinh học cao cấp',
    since: '2017',
    desc: 'Thương hiệu mỹ phẩm sinh học hàng đầu Ý, chuyên các dòng sản phẩm chống lão hóa và phục hồi da.',
    expert: 'Chuyên viên: Trần Minh Khôi',
  },
  {
    name: 'Thalgo',
    country: 'France',
    logo: 'TH',
    specialty: 'Liệu pháp tảo biển',
    since: '2018',
    desc: 'Tiên phong trong công nghệ tảo biển trị liệu, phục hồi và tái tạo làn da từ sâu bên trong.',
    expert: 'Chuyên viên: Phạm Hồng Nhi',
  },
  {
    name: 'Dermalogica',
    country: 'USA',
    logo: 'DG',
    specialty: 'Chăm sóc da chuyên sâu',
    since: '2016',
    desc: 'Thương hiệu skincare chuyên nghiệp được tin dùng bởi các spa cao cấp toàn cầu.',
    expert: 'Chuyên viên: Nguyễn Thảo Vy',
  },
  {
    name: 'Shiseido Pro',
    country: 'Japan',
    logo: 'SH',
    specialty: 'Công nghệ trẻ hóa Nhật Bản',
    since: '2019',
    desc: 'Công nghệ làm đẹp Nhật Bản với triết lý chăm sóc da bền vững, an toàn.',
    expert: 'Chuyên viên: Lê Gia Huy',
  },
  {
    name: 'Yon-Ka Paris',
    country: 'France',
    logo: 'YK',
    specialty: 'Aromatherapy thực vật',
    since: '2020',
    desc: 'Liệu pháp hương thơm từ tinh chất thực vật, cân bằng làn da và tinh thần.',
    expert: 'Chuyên viên: Trần Minh Khôi',
  },
  {
    name: 'Eminence Organic',
    country: 'Hungary',
    logo: 'EO',
    specialty: 'Mỹ phẩm hữu cơ',
    since: '2021',
    desc: '100% nguyên liệu hữu cơ, không hóa chất, an toàn cho mọi loại da.',
    expert: 'Chuyên viên: Phạm Hồng Nhi',
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

export const spa2PartnerCategories = [
  { key: 'cosmetics', label: 'Mỹ phẩm', icon: 'solar:flask-bold-duotone' },
  { key: 'equipment', label: 'Thiết bị', icon: 'solar:settings-bold-duotone' },
  { key: 'training', label: 'Đào tạo', icon: 'solar:book-bold-duotone' },
  { key: 'tech', label: 'Công nghệ', icon: 'solar:cpu-bolt-bold-duotone' },
];

export const spa2ExtraPartners = [
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

export const spa2Collaborations = [
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

export const spa2QualityCerts = [
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

// ---------- Feedback / Video reviews ---------------------------------

export const spa2Feedbacks = [
  {
    name: 'Minh Anh',
    role: 'Khách hàng VIP',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=11',
    comment:
      'Không gian xanh mát, tinh dầu thơm dịu, kỹ thuật viên rất chuyên nghiệp. Cảm thấy như đang đi nghỉ dưỡng giữa thiên nhiên.',
    service: 'Facial Organic',
  },
  {
    name: 'Thu Hà',
    role: 'Thành viên Premium',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=16',
    comment: 'Liệu trình trị mụn rõ rệt sau 4 buổi. Da đều màu hơn, mụn giảm gần như hoàn toàn.',
    service: 'Liệu trình trị mụn',
  },
  {
    name: 'Hoàng Nam',
    role: 'Khách hàng mới',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=23',
    comment: 'Lần đầu đi spa nhưng cảm giác rất thoải mái, đặc biệt là phòng xông đá muối.',
    service: 'Massage thảo dược',
  },
  {
    name: 'Bích Ngọc',
    role: 'Khách thân thiết',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=32',
    comment: 'Detox 3 ngày giúp mình giảm 2kg và cảm thấy nhẹ nhõm hẳn. Sẽ quay lại nhiều lần nữa.',
    service: 'Detox 3 ngày',
  },
  {
    name: 'Thanh Phương',
    role: 'Khách hàng',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=47',
    comment: 'Nhân viên thân thiện, không gian sạch sẽ, mùi hương dễ chịu suốt buổi.',
    service: 'Aromatherapy',
  },
  {
    name: 'Quốc Bảo',
    role: 'Khách hàng',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=51',
    comment: 'Gói đôi rất lãng mạn, vợ mình rất thích. Cảm ơn Nature Spa!',
    service: 'Spa đôi',
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

// ---------- Before / After ---------------------------------------------

export const spa2BeforeAfters = [
  {
    id: 1,
    title: 'Trị mụn – 8 buổi',
    before: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    duration: '2 tháng',
    note: 'Giảm 90% mụn viêm, da đều màu, lỗ chân lông se nhỏ.',
  },
  {
    id: 2,
    title: 'Trẻ hóa da – 10 buổi',
    before: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    duration: '2 tháng',
    note: 'Nâng cơ, mờ nếp nhăn, da săn chắc tự nhiên.',
  },
  {
    id: 3,
    title: 'Giảm béo – 12 buổi',
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1517363898874-737b62a7db91?w=600&q=80',
    duration: '3 tháng',
    note: 'Giảm 8cm vòng eo, săn chắc cơ bụng, không xâm lấn.',
  },
  {
    id: 4,
    title: 'Trắng sáng – 6 buổi',
    before: 'https://images.unsplash.com/photo-1516975698824-571cb39ceee6?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1531123414780-f3d9d2c46c6c?w=600&q=80',
    duration: '6 tuần',
    note: 'Tăng 2 tone, da đều màu, hết thâm sạm.',
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

// ---------- Treatments ---------------------------------------------------

export const spa2Treatments = [
  {
    id: 1,
    name: 'Liệu Trình Trẻ Hóa 10 Buổi',
    sessions: 10,
    duration: '2 tháng',
    price: 12900000,
    target: 'Da lão hóa, chùng nhão',
    includes: ['Facial Collagen', 'RF nâng cơ', 'Mặt nạ vàng 24K', 'Massage cổ vai gáy'],
  },
  {
    id: 2,
    name: 'Liệu Trình Trị Mụn 8 Buổi',
    sessions: 8,
    duration: '2 tháng',
    price: 7900000,
    target: 'Da mụn, lỗ chân lông to',
    includes: ['Lấy nhân mụn chuẩn y khoa', 'Ánh sáng sinh học', 'Peel nhẹ', 'Phục hồi cấp ẩm'],
  },
  {
    id: 3,
    name: 'Liệu Trình Giảm Béo 12 Buổi',
    sessions: 12,
    duration: '3 tháng',
    price: 14900000,
    target: 'Giảm mỡ bụng, đùi, eo',
    includes: ['Sóng RF tan mỡ', 'Massage dẫn lưu', 'Ủ thảo dược', 'Tư vấn dinh dưỡng'],
  },
  {
    id: 4,
    name: 'Liệu Trình Trắng Sáng 6 Buổi',
    sessions: 6,
    duration: '6 tuần',
    price: 6900000,
    target: 'Da xỉn màu, không đều',
    includes: ['Tế bào gốc', 'Mặt nạ ngọc trai', 'Vitamin C điện di', 'Mặt nạ lạnh'],
  },
];

// ---------- Branches -----------------------------------------------------

export const spa2Branches = [
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

export const spa2Promotions = [
  {
    title: 'Mùa hè xanh – Detox 3 ngày',
    period: '01/06 – 31/08/2026',
    price: '4.590.000đ',
    save: 'Tiết kiệm 1.200.000đ',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
  },
  {
    title: 'Trung Thu – Quà tặng vàng',
    period: '15/09 – 15/10/2026',
    price: 'Tặng kèm hộp trà sen',
    save: 'Giá trị 350.000đ',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  },
  {
    title: 'Black Friday Spa Day',
    period: '20/11 – 30/11/2026',
    price: 'Giảm đến 50%',
    save: 'Toàn bộ liệu trình',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
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

// ---------- FAQ / Policies / Gallery / Contact ----------------------------

export const spa2Faqs = [
  {
    id: 1,
    q: 'Tôi cần đặt lịch trước bao lâu?',
    a: 'Bạn nên đặt lịch trước ít nhất 2 giờ. Vào cuối tuần nên đặt trước 1 ngày để có khung giờ đẹp.',
  },
  {
    id: 2,
    q: 'Sản phẩm sử dụng có an toàn cho da nhạy cảm?',
    a: 'Chúng tôi sử dụng 100% nguyên liệu hữu cơ, không cồn, không paraben, an toàn cho cả da nhạy cảm và phụ nữ mang thai.',
  },
  {
    id: 3,
    q: 'Có hỗ trợ thanh toán trả góp không?',
    a: 'Có. Nature Spa hỗ trợ trả góp 0% qua thẻ tín dụng của 12 ngân hàng đối tác.',
  },
  {
    id: 4,
    q: 'Tôi có thể đổi/hủy lịch không?',
    a: 'Bạn có thể đổi hoặc hủy lịch miễn phí trước 4 giờ so với giờ hẹn.',
  },
  {
    id: 5,
    q: 'Có phòng riêng cho cặp đôi không?',
    a: 'Có 6 phòng VIP đôi tại các chi nhánh, kèm bồn tắm hoa và khu nghỉ riêng tư.',
  },
  {
    id: 6,
    q: 'Spa có chương trình thẻ thành viên không?',
    a: 'Có 3 hạng thẻ: Silver, Gold, Platinum với ưu đãi 5–15% và quà tặng sinh nhật.',
  },
];

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

export type Spa2CareerApplicationStatus =
  | 'new'
  | 'reviewing'
  | 'interview'
  | 'hired'
  | 'rejected';

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
const SPA2_SAMPLE_CV_PDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

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

// ============================== SPA2 - END ====================================
