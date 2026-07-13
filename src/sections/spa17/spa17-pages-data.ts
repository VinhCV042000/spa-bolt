// ----------------------------------------------------------------------
// spa17 sub-pages – Crystal Glow theme (Korean K-Beauty crystal spa)
// Terracotta, saffron gold, night indigo & sand — Korean crystal spa palette.
// ----------------------------------------------------------------------

export const SPA17_TERRA = '#E8A5B8';
export const SPA17_TERRA_DARK = '#9B6B8F';
export const SPA17_TERRA_LIGHT = '#F4C7D3';
export const SPA17_SAND = '#F5EEF6';
export const SPA17_SAND_DARK = '#C9B8D4';
export const SPA17_OLIVE = '#8A6FBF';
export const SPA17_WARM = '#FBF5FA';
export const SPA17_INK = '#2A1B3D';
export const SPA17_TERRA_SOFT = '#F9DCE5';

export const SPA17_PAGE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80',
  services: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&q=80',
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
};

// Thêm field "category" cho spa17Services (chèn vào từng object hiện có), ví dụ:
// herbal-massage -> category: 'massage'
// organic-facial -> category: 'facial'
// body-scrub-wrap -> category: 'body'
// aromatherapy -> category: 'massage'
// couples-spa -> category: 'couple'
// detox-cleanse -> category: 'detox'

export const spa17ServiceCategories = [
  { value: 'all', label: 'Tất cả' },
  { value: 'massage', label: 'Massage' },
  { value: 'facial', label: 'Facial' },
  { value: 'body', label: 'Body Care' },
  { value: 'couple', label: 'Spa Đôi' },
  { value: 'detox', label: 'Detox' },
];

export const spa17ServiceSteps = [
  {
    title: 'Tư vấn & thăm khám',
    desc: 'KTV đánh giá tình trạng da/cơ thể và tư vấn liệu trình phù hợp.',
  },
  {
    title: 'Làm sạch & chuẩn bị',
    desc: 'Tẩy trang, làm sạch sâu, xông hơi giúp lỗ chân lông giãn nở.',
  },
  {
    title: 'Thực hiện liệu trình chính',
    desc: 'Áp dụng kỹ thuật và sản phẩm chuyên biệt theo từng dịch vụ.',
  },
  {
    title: 'Phục hồi & dưỡng',
    desc: 'Đắp mặt nạ/dưỡng chất, massage thư giãn kết thúc liệu trình.',
  },
  { title: 'Tư vấn chăm sóc tại nhà', desc: 'Hướng dẫn duy trì kết quả và lịch tái khám phù hợp.' },
];

export const spa17PartnerProfiles = [
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

export const spa17VideoReviews = [
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

export const spa17BlogCategories = [
  { name: 'Aromatherapy', count: 4 },
  { name: 'Skincare', count: 7 },
  { name: 'Wellness', count: 5 },
  { name: 'Mindfulness', count: 3 },
];

// Thêm endsAt (ISO) cho countdown vào từng object trong spa17Promotions:
// 'Mùa hè xanh' -> endsAt: '2026-08-31T23:59:59'
// 'Trung Thu' -> endsAt: '2026-10-15T23:59:59'
// 'Black Friday' -> endsAt: '2026-11-30T23:59:59'

export const spa17Services = [
  {
    slug: 'herbal-massage',
    category: 'massage',
    name: 'Massage Thảo Dược',
    short: 'Thư giãn sâu với tinh dầu thảo mộc Việt.',
    duration: '60 phút',
    price: 690000,
    icon: 'solar:hand-stars-bold-duotone',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
    benefits: ['Giảm căng cơ', 'Lưu thông khí huyết', 'An thần dễ ngủ', 'Detox nhẹ'],
  },
  {
    slug: 'organic-facial',
    category: 'facial',
    name: 'Facial Organic',
    short: 'Cấp ẩm, phục hồi với nguyên liệu 100% hữu cơ.',
    duration: '75 phút',
    price: 890000,
    icon: 'solar:face-scan-circle-bold-duotone',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    benefits: ['Cấp ẩm chuyên sâu', 'Sáng da tự nhiên', 'Làm dịu mẩn đỏ', 'Giảm dấu hiệu lão hóa'],
  },
  {
    slug: 'body-scrub-wrap',
    category: 'body',
    name: 'Body Scrub & Wrap',
    short: 'Tẩy tế bào chết & ủ dưỡng toàn thân.',
    duration: '90 phút',
    price: 990000,
    icon: 'solar:body-bold-duotone',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    benefits: ['Da mịn màng', 'Săn chắc tự nhiên', 'Thải độc qua da', 'Mùi hương dễ chịu'],
  },
  {
    slug: 'aromatherapy',
    category: 'massage',
    name: 'Aromatherapy',
    short: 'Liệu pháp hương thơm Pháp – Nhật.',
    duration: '60 phút',
    price: 790000,
    icon: 'solar:sun-bold-duotone',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
    benefits: ['Giảm stress', 'Cân bằng tinh thần', 'Cải thiện giấc ngủ'],
  },
  {
    slug: 'couples-spa',
    category: 'couple',
    name: 'Spa Đôi',
    short: 'Không gian riêng tư cho hai người.',
    duration: '120 phút',
    price: 1990000,
    icon: 'solar:heart-bold-duotone',
    image: 'https://plus.unsplash.com/premium_photo-1661574718355-82659c0c74cc?w=900&q=80',
    benefits: ['Phòng VIP riêng', 'Trà & trái cây', 'Bồn tắm hoa', 'Quà tặng cặp đôi'],
  },
  {
    slug: 'detox-cleanse',
    category: 'detox',
    name: 'Detox & Thanh Lọc',
    short: 'Chương trình thải độc cơ thể 3 ngày.',
    duration: '3 ngày',
    price: 4590000,
    icon: 'solar:magic-stick-3-bold-duotone',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    benefits: ['Thải độc gan', 'Giảm 1–3kg', 'Nâng cao đề kháng', 'Chuyên gia theo dõi'],
  },
];

export const spa17Treatments = [
  {
    name: 'Liệu Trình Trẻ Hóa 10 Buổi',
    sessions: 10,
    duration: '2 tháng',
    price: 12900000,
    target: 'Da lão hóa, chùng nhão',
    includes: ['Facial Collagen', 'RF nâng cơ', 'Mặt nạ vàng 24K', 'Massage cổ vai gáy'],
  },
  {
    name: 'Liệu Trình Trị Mụn 8 Buổi',
    sessions: 8,
    duration: '2 tháng',
    price: 7900000,
    target: 'Da mụn, lỗ chân lông to',
    includes: ['Lấy nhân mụn chuẩn y khoa', 'Ánh sáng sinh học', 'Peel nhẹ', 'Phục hồi cấp ẩm'],
  },
  {
    name: 'Liệu Trình Giảm Béo 12 Buổi',
    sessions: 12,
    duration: '3 tháng',
    price: 14900000,
    target: 'Giảm mỡ bụng, đùi, eo',
    includes: ['Sóng RF tan mỡ', 'Massage dẫn lưu', 'Ủ thảo dược', 'Tư vấn dinh dưỡng'],
  },
  {
    name: 'Liệu Trình Trắng Sáng 6 Buổi',
    sessions: 6,
    duration: '6 tuần',
    price: 6900000,
    target: 'Da xỉn màu, không đều',
    includes: ['Tế bào gốc', 'Mặt nạ ngọc trai', 'Vitamin C điện di', 'Mặt nạ lạnh'],
  },
];

export const spa17Branches = [
  {
    city: 'TP. Hồ Chí Minh',
    name: 'Crystal Glow Quận 1',
    address: '45 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028 3822 9090',
    hours: '9:00 – 22:00 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80',
  },
  {
    city: 'Hà Nội',
    name: 'Crystal Glow Hồ Tây',
    address: '88 Xuân Diệu, Tây Hồ, Hà Nội',
    phone: '024 3719 1199',
    hours: '9:00 – 22:00 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
  },
  {
    city: 'Đà Nẵng',
    name: 'Crystal Glow Biển Mỹ Khê',
    address: '12 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
    phone: '0236 3654 789',
    hours: '8:00 – 23:00 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
  },
  {
    city: 'Nha Trang',
    name: 'Crystal Glow Nha Trang',
    address: '5 Trần Phú, Lộc Thọ, Nha Trang',
    phone: '0258 3556 678',
    hours: '9:00 – 22:30 mỗi ngày',
    image: 'https://images.unsplash.com/photo-1531112068337-3cd6d0d2b56b?w=900&q=80',
  },
];

export const spa17Offers = [
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

export const spa17Promotions = [
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

export const spa17BlogPosts = [
  {
    slug: 'top-10-loai-tinh-dau-cho-giac-ngu-sau',
    title: 'Top 10 loại tinh dầu cho giấc ngủ sâu',
    excerpt: 'Tinh dầu thiên nhiên là chìa khóa để có giấc ngủ ngon, sâu và phục hồi trọn vẹn.',
    cover: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
    author: 'Lê Minh Anh',
    date: '12/05/2026',
    category: 'Aromatherapy',
    readTime: '6 phút',
  },
  {
    slug: 'cham-soc-da-mua-he-tu-thien-nhien',
    title: 'Chăm sóc da mùa hè từ thiên nhiên',
    excerpt: 'Bí quyết giữ làn da tươi mát, không bóng dầu trong những ngày oi bức.',
    cover: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    author: 'Trần Thu Hà',
    date: '02/06/2026',
    category: 'Skincare',
    readTime: '8 phút',
  },
  {
    slug: 'detox-co-the-trong-7-ngay',
    title: 'Detox cơ thể trong 7 ngày tại nhà',
    excerpt: 'Hướng dẫn chi tiết quy trình detox nhẹ nhàng, an toàn và hiệu quả.',
    cover: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    author: 'Phạm Hoàng Nam',
    date: '20/06/2026',
    category: 'Wellness',
    readTime: '10 phút',
  },
  {
    slug: 'yoga-va-thien-cho-nguoi-ban-ron',
    title: 'Yoga & thiền cho người bận rộn',
    excerpt: '15 phút mỗi ngày để tái tạo năng lượng và giữ tinh thần minh mẫn.',
    cover: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    author: 'Nguyễn Bích Ngọc',
    date: '01/07/2026',
    category: 'Mindfulness',
    readTime: '5 phút',
  },
];

export const spa17Careers = [
  {
    title: 'Kỹ thuật viên Spa cao cấp',
    location: 'TP.HCM / Hà Nội',
    type: 'Toàn thời gian',
    salary: '12 – 20 triệu',
    benefits: ['Đào tạo quốc tế', 'Bảo hiểm cao cấp', 'Du lịch hằng năm'],
  },
  {
    title: 'Chuyên viên tư vấn khách hàng',
    location: 'TP.HCM',
    type: 'Toàn thời gian',
    salary: '10 – 18 triệu',
    benefits: ['Hoa hồng hấp dẫn', 'Môi trường năng động', 'Lộ trình thăng tiến'],
  },
  {
    title: 'Quản lý chi nhánh',
    location: 'Đà Nẵng',
    type: 'Toàn thời gian',
    salary: 'Thỏa thuận',
    benefits: ['Cổ phần thưởng', 'Bảo hiểm gia đình', 'Đào tạo lãnh đạo'],
  },
  {
    title: 'Nhân viên Marketing nội dung',
    location: 'Remote / TP.HCM',
    type: 'Linh hoạt',
    salary: '8 – 15 triệu',
    benefits: ['Làm việc từ xa', 'Lương theo dự án', 'Workshop hàng tháng'],
  },
];

export const spa17TrainingPrograms = [
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

export const spa17AboutStory: string[] = [
  'Crystal Glow ra đời năm 2015 tại TP.HCM, khởi nguồn từ mong muốn mang những liệu pháp chăm sóc da và cơ thể an toàn, lành tính đến gần hơn với phụ nữ Việt – nơi thiên nhiên và khoa học cùng song hành.',
  'Từ một cơ sở nhỏ với 3 kỹ thuật viên, chúng tôi đã phát triển thành hệ thống 4 chi nhánh trên toàn quốc, đồng hành cùng hơn 25.000 khách hàng trong hành trình tìm lại sự cân bằng cho cơ thể và tâm trí.',
  'Mỗi sản phẩm, mỗi liệu trình tại Crystal Glow đều được chọn lọc kỹ lưỡng từ nguyên liệu hữu cơ, kết hợp công nghệ chăm sóc da hiện đại từ châu Âu – để vẻ đẹp không chỉ nằm ở bề ngoài mà còn lan tỏa từ bên trong.',
];

export const spa17VisionMission = [
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

export const spa17Team = [
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

export const spa17Certifications = [
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

export const spa17Partners = [
  { name: 'Comfort Zone', country: 'Italy', logo: 'CZ' },
  { name: 'Thalgo', country: 'France', logo: 'TH' },
  { name: 'Dermalogica', country: 'USA', logo: 'DG' },
  { name: 'Shiseido Pro', country: 'Japan', logo: 'SH' },
  { name: 'Yon-Ka Paris', country: 'France', logo: 'YK' },
  { name: 'Eminence Organic', country: 'Hungary', logo: 'EO' },
];

export const spa17Feedbacks = [
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
    comment: 'Gói đôi rất lãng mạn, vợ mình rất thích. Cảm ơn Crystal Glow!',
    service: 'Spa đôi',
  },
];

export const spa17BeforeAfters = [
  {
    title: 'Trị mụn – 8 buổi',
    before: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    duration: '2 tháng',
    note: 'Giảm 90% mụn viêm, da đều màu, lỗ chân lông se nhỏ.',
  },
  {
    title: 'Trẻ hóa da – 10 buổi',
    before: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    duration: '2 tháng',
    note: 'Nâng cơ, mờ nếp nhăn, da săn chắc tự nhiên.',
  },
  {
    title: 'Giảm béo – 12 buổi',
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1517363898874-737b62a7db91?w=600&q=80',
    duration: '3 tháng',
    note: 'Giảm 8cm vòng eo, săn chắc cơ bụng, không xâm lấn.',
  },
  {
    title: 'Trắng sáng – 6 buổi',
    before: 'https://images.unsplash.com/photo-1516975698824-571cb39ceee6?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1531123414780-f3d9d2c46c6c?w=600&q=80',
    duration: '6 tuần',
    note: 'Tăng 2 tone, da đều màu, hết thâm sạm.',
  },
];

export const spa17Faqs = [
  {
    q: 'Tôi cần đặt lịch trước bao lâu?',
    a: 'Bạn nên đặt lịch trước ít nhất 2 giờ. Vào cuối tuần nên đặt trước 1 ngày để có khung giờ đẹp.',
  },
  {
    q: 'Sản phẩm sử dụng có an toàn cho da nhạy cảm?',
    a: 'Chúng tôi sử dụng 100% nguyên liệu hữu cơ, không cồn, không paraben, an toàn cho cả da nhạy cảm và phụ nữ mang thai.',
  },
  {
    q: 'Có hỗ trợ thanh toán trả góp không?',
    a: 'Có. Crystal Glow hỗ trợ trả góp 0% qua thẻ tín dụng của 12 ngân hàng đối tác.',
  },
  {
    q: 'Tôi có thể đổi/hủy lịch không?',
    a: 'Bạn có thể đổi hoặc hủy lịch miễn phí trước 4 giờ so với giờ hẹn.',
  },
  {
    q: 'Có phòng riêng cho cặp đôi không?',
    a: 'Có 6 phòng VIP đôi tại các chi nhánh, kèm bồn tắm hoa và khu nghỉ riêng tư.',
  },
  {
    q: 'Spa có chương trình thẻ thành viên không?',
    a: 'Có 3 hạng thẻ: Silver, Gold, Platinum với ưu đãi 5–15% và quà tặng sinh nhật.',
  },
];

export const spa17Policies = [
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

export const spa17Gallery = [
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

export const spa17ContactInfo = {
  hotline: '1900 6789',
  email: 'hello@hammammarrakech.vn',
  zalo: '0909 868 868',
  address: '45 Nguyễn Huệ, Quận 1, TP.HCM',
  workingHours: '9:00 – 22:00 mỗi ngày',
};

// ---- Booking ----
export const spa17BookingPackages = [
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

// ---- Offers (combo) ----
export const spa17ComboOffers = [
  {
    slug: 'combo-thanh-xuan',
    name: 'Combo Thanh Xuân',
    services: ['Facial Organic', 'Massage Thảo Dược', 'Body Scrub'],
    originalPrice: 2570000,
    salePrice: 1890000,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    perks: ['Tiết kiệm 26%', 'Tặng trà thảo mộc', 'HSD 3 tháng'],
  },
  {
    slug: 'combo-doi-lua',
    name: 'Combo Đôi Lứa',
    services: ['Spa Đôi', 'Aromatherapy', 'Body Wrap'],
    originalPrice: 3570000,
    salePrice: 2790000,
    image: 'https://plus.unsplash.com/premium_photo-1661574718355-82659c0c74cc?w=900&q=80',
    perks: ['Tiết kiệm 22%', 'Phòng VIP riêng', 'Quà tặng cặp đôi'],
  },
  {
    slug: 'combo-detox-toan-dien',
    name: 'Combo Detox Toàn Diện',
    services: ['Detox 3 ngày', 'Massage Thảo Dược', 'Tư vấn dinh dưỡng'],
    originalPrice: 5970000,
    salePrice: 4290000,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
    perks: ['Tiết kiệm 28%', 'Theo dõi 1-1', 'HSD 6 tháng'],
  },
];

// ---- Careers detail ----
export const spa17CareersSlogan = 'Nơi đam mê làm đẹp gặp gỡ cơ hội phát triển';

export const spa17JoinReasons = [
  { icon: 'solar:wallet-money-bold-duotone', text: 'Thu nhập hấp dẫn' },
  { icon: 'solar:buildings-2-bold-duotone', text: 'Môi trường chuyên nghiệp' },
  { icon: 'solar:book-bookmark-bold-duotone', text: 'Đào tạo liên tục' },
  { icon: 'solar:chart-2-bold-duotone', text: 'Thăng tiến rõ ràng' },
];

export const spa17RecruitmentProcess = [
  { step: 'Ứng tuyển', desc: 'Gửi CV qua form hoặc email tuyển dụng.' },
  { step: 'Phỏng vấn', desc: 'Trao đổi trực tiếp với quản lý chi nhánh.' },
  { step: 'Đào tạo', desc: 'Tham gia khóa đào tạo nội bộ 1–2 tuần.' },
  { step: 'Nhận việc', desc: 'Chính thức gia nhập đội ngũ Crystal Glow.' },
];

export const spa17WorkplaceGallery = [
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=900&q=80',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
];

export const spa17InternalVideoThumb =
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80';

// ---- Training ----
export const spa17TrainingMission =
  'Đào tạo thế hệ kỹ thuật viên spa chuyên nghiệp, am hiểu thiên nhiên và tận tâm với khách hàng – chuẩn quốc tế, gốc Việt Nam.';

export const spa17TrainingRoadmap = [
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

export const spa17Instructors = [
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

export const spa17GraduateShowcase = [
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

// ---- Partners (extended) ----
export const spa17PartnerCategories = [
  { key: 'cosmetics', label: 'Mỹ phẩm', icon: 'solar:flask-bold-duotone' },
  { key: 'equipment', label: 'Thiết bị', icon: 'solar:settings-bold-duotone' },
  { key: 'training', label: 'Đào tạo', icon: 'solar:book-bold-duotone' },
  { key: 'tech', label: 'Công nghệ', icon: 'solar:cpu-bolt-bold-duotone' },
];
// Thêm field category vào spa17PartnerProfiles (mục trước):
// Comfort Zone -> category: 'cosmetics' | Thalgo -> 'cosmetics' | Dermalogica -> 'cosmetics'
// Shiseido Pro -> 'tech' | Yon-Ka Paris -> 'cosmetics' | Eminence Organic -> 'cosmetics'
// (thêm mới 2 đối tác thiết bị/đào tạo nếu muốn đa dạng category, ví dụ:)
export const spa17ExtraPartners = [
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

export const spa17Collaborations = [
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

export const spa17QualityCerts = [
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

// ---- Treatments process ----
export const spa17TreatmentProcess = [
  { title: 'Tư vấn', desc: 'Trao đổi nhu cầu, tiền sử da và mục tiêu điều trị.' },
  { title: 'Kiểm tra da', desc: 'Soi da chuyên sâu, đánh giá tình trạng bằng máy.' },
  { title: 'Điều trị', desc: 'Thực hiện liệu trình theo phác đồ cá nhân hóa.' },
  { title: 'Theo dõi', desc: 'Đánh giá kết quả định kỳ, điều chỉnh phác đồ nếu cần.' },
];

// ---- Before/After tech ----
export const spa17Technologies = [
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

export const spa17TreatmentExperts = [
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
