// ----------------------------------------------------------------------
// spa24 – "Maison de Lumière" Luxury Couture Spa
// Palette: Onyx black, Champagne gold, Ivory, Bordeaux
// ----------------------------------------------------------------------

export const SPA24_ONYX = '#0B0B0F';
export const SPA24_ONYX_SOFT = '#15151C';
export const SPA24_GOLD = '#C9A86A';
export const SPA24_GOLD_LIGHT = '#E8D29A';
export const SPA24_IVORY = '#F5EFE4';
export const SPA24_BORDEAUX = '#5B1A2B';
export const SPA24_PEARL = '#EDE7DA';

export const SPA24_FONT_DISPLAY = '"Cormorant Garamond", "Playfair Display", Georgia, serif';
export const SPA24_FONT_BODY = '"Inter", -apple-system, sans-serif';
export const SPA24_FONT_SCRIPT = '"Pinyon Script", cursive';

export const SPA24_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=85',
  heroSide: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=85',
  manifesto: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=85',
  signature1: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=85',
  signature2: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=85',
  signature3: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=85',
  signature4: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=85',
  suite1: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=85',
  suite2: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85',
  suite3: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=85',
  gems: 'https://images.unsplash.com/photo-1599577180589-0a8a06a5d3a7?w=1200&q=85',
  sommelier: 'https://images.unsplash.com/photo-1564594985645-4427056e22e2?w=1200&q=85',
  chef1: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85',
  chef2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85',
  chef3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=85',
  chef4: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=85',
  atelier: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1400&q=85',
  press1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=85',
  press2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85',
  press3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=85',
};

export const SPA24_SIGNATURES = [
  {
    code: 'I',
    name: 'Lumière Diamant',
    subtitle: 'Nghi lễ kim cương 24K',
    duration: '180 phút',
    price: '12.800.000₫',
    desc: 'Liệu trình bột kim cương vi tinh thể kết hợp mặt nạ vàng 24K nguyên chất, đánh thức làn da như ánh trăng.',
    image: SPA24_IMAGES.signature1,
  },
  {
    code: 'II',
    name: 'Sérénité Saphir',
    subtitle: 'Đá quý xanh & dầu hoa anh thảo',
    duration: '150 phút',
    price: '9.600.000₫',
    desc: 'Massage đá saphir nóng lạnh xen kẽ trên cột sống năng lượng, đưa cơ thể vào trạng thái thiền sâu.',
    image: SPA24_IMAGES.signature2,
  },
  {
    code: 'III',
    name: 'Cocon de Soie',
    subtitle: 'Kén lụa & sữa ngọc trai Mikimoto',
    duration: '120 phút',
    price: '7.400.000₫',
    desc: 'Bọc toàn thân trong khăn lụa Hermès ấm với mặt nạ ngọc trai, sữa hạnh nhân và mật ong manuka UMF 25+.',
    image: SPA24_IMAGES.signature3,
  },
  {
    code: 'IV',
    name: 'Renaissance Or',
    subtitle: 'Tái tạo collagen ánh vàng',
    duration: '200 phút',
    price: '15.900.000₫',
    desc: 'Kết hợp vi kim vàng, ánh sáng LED đa tần và mặt nạ huyết tương — chuẩn mực haute-couture cho làn da.',
    image: SPA24_IMAGES.signature4,
  },
];

export const SPA24_SUITES = [
  {
    name: 'Suite Versailles',
    sqm: '85 m²',
    feature: 'Bồn đồng nguyên khối · sân thượng riêng',
    image: SPA24_IMAGES.suite1,
  },
  {
    name: 'Suite Champagne',
    sqm: '70 m²',
    feature: 'Bồn marble Carrara · lò sưởi đá ấm',
    image: SPA24_IMAGES.suite2,
  },
  {
    name: 'Suite Couple Royale',
    sqm: '110 m²',
    feature: '2 giường đôi · phòng xông hơi đôi · butler riêng',
    image: SPA24_IMAGES.suite3,
  },
];

export const SPA24_PILLARS = [
  {
    icon: 'solar:crown-star-bold-duotone',
    title: 'Riêng tư tuyệt đối',
    desc: 'Mỗi khách một tầng. Lối vào riêng. Không gặp khách khác trong suốt nghi lễ.',
  },
  {
    icon: 'solar:diamond-bold-duotone',
    title: 'Đá quý trị liệu',
    desc: 'Kim cương, saphir, ngọc trai, thạch anh hồng — sử dụng trực tiếp trong từng liệu trình.',
  },
  {
    icon: 'solar:wine-glass-bold-duotone',
    title: 'Sommelier hương liệu',
    desc: 'Chuyên gia mùi hương riêng pha chế công thức parfum thérapie cho mỗi khách.',
  },
  {
    icon: 'solar:medal-ribbons-star-bold-duotone',
    title: 'Forbes 5 sao',
    desc: 'Một trong 14 spa châu Á được Forbes Travel Guide trao 5 sao 3 năm liên tiếp.',
  },
];

export const SPA24_THERAPISTS = [
  {
    name: 'Madame Hélène Beaumont',
    title: 'Maître Spa · Paris',
    years: 22,
    image: SPA24_IMAGES.chef1,
  },
  { name: 'Aiko Tanaka', title: 'Kobido Master · Kyoto', years: 18, image: SPA24_IMAGES.chef2 },
  {
    name: 'Sofia Linden',
    title: 'Sommelière Hương · Grasse',
    years: 15,
    image: SPA24_IMAGES.chef3,
  },
  {
    name: 'Dr. Lê Minh Châu',
    title: 'Aesthetic Physician · MD',
    years: 20,
    image: SPA24_IMAGES.chef4,
  },
];

export const SPA24_PRESS = [
  { name: 'VOGUE', quote: 'Một biệt thự ánh sáng — nơi xa xỉ trở thành ngôn ngữ của sự tử tế.' },
  {
    name: 'CONDÉ NAST TRAVELER',
    quote: 'Top 5 luxury spa châu Á 2025 — đẳng cấp Maison đích thực.',
  },
  {
    name: "HARPER'S BAZAAR",
    quote: 'Maison de Lumière đã định nghĩa lại haute-couture cho ngành spa Việt.',
  },
];

export const SPA24_TESTIMONIALS = [
  {
    name: 'Bà Nguyễn Lan Phương',
    title: 'CEO · Diamond Group',
    avatar: SPA24_IMAGES.press1,
    quote:
      'Sau 11 năm trải nghiệm spa khắp châu Âu, tôi tìm thấy ngôi nhà của mình tại Maison de Lumière. Mỗi chi tiết đều thì thầm sự tinh tế.',
  },
  {
    name: 'Ms. Catherine Lévesque',
    title: 'Founder · Maison Lévesque Paris',
    avatar: SPA24_IMAGES.press2,
    quote:
      'Đẳng cấp ngang ngửa La Mer Spa Geneva. Sommelier hương liệu là một trải nghiệm tôi chưa từng thấy ở đâu khác.',
  },
  {
    name: 'Bà Đặng Thiên Hương',
    title: 'Collector · Art Patron',
    avatar: SPA24_IMAGES.press3,
    quote:
      'Không gian như một phòng triển lãm sống. Nghi lễ Lumière Diamant khiến tôi rơi nước mắt vì biết ơn chính cơ thể mình.',
  },
];

export const SPA24_JOURNEY = [
  {
    time: '00:00',
    title: 'Welcome Champagne',
    desc: 'Đón tiếp bằng Dom Pérignon Vintage và khăn lạnh ngâm hoa hồng Bulgaria.',
  },
  {
    time: '00:15',
    title: 'Tư vấn riêng',
    desc: 'Maître Spa phân tích da, sinh trắc và soạn nghi lễ cá nhân hóa.',
  },
  {
    time: '00:30',
    title: 'Phòng tắm nghi lễ',
    desc: 'Tắm sữa lừa Cleopatra, xông hơi đá muối Hồng Hà Himalaya.',
  },
  {
    time: '01:00',
    title: 'Nghi lễ chính',
    desc: 'Thực hiện bởi maître được chọn riêng, trên giường lụa ấm 38°C.',
  },
  {
    time: '03:00',
    title: 'Trà chiều Maison',
    desc: 'Trà Trắng Bạch Mao Ngân Châm cùng macaron Pierre Hermé.',
  },
  { time: '03:45', title: 'Tiễn khách', desc: 'Quà lưu niệm bằng pha lê Lalique khắc tên riêng.' },
];

export const SPA24_MEMBERSHIP = [
  {
    tier: 'OR',
    name: 'Membre Or',
    price: '180.000.000₫',
    period: '/ năm',
    featured: false,
    perks: [
      '12 nghi lễ Signature mỗi năm',
      'Champagne welcome mỗi lần đến',
      'Ưu tiên đặt suite cuối tuần',
      'Tặng spa kit Maison ($1,200 giá trị)',
    ],
  },
  {
    tier: 'DIAMANT',
    name: 'Membre Diamant',
    price: '420.000.000₫',
    period: '/ năm',
    featured: true,
    perks: [
      '24 nghi lễ không giới hạn loại',
      'Maître Spa cá nhân chuyên trách',
      'Suite Versailles dành riêng 6 lần/năm',
      'Sommelier hương liệu pha 4 chai parfum signature',
      'Concierge 24/7 · transfer Maybach',
    ],
  },
  {
    tier: 'PRIVÉ',
    name: 'Cercle Privé',
    price: 'Theo lời mời',
    period: '',
    featured: false,
    perks: [
      'Giới hạn 24 thành viên toàn cầu',
      'Truy cập tầng Privé tuyệt mật',
      'Bác sĩ thẩm mỹ cá nhân tháp tùng quốc tế',
      'Sự kiện riêng tại Paris · Kyoto · Capri',
    ],
  },
];

export const SPA24_FAQS = [
  {
    q: 'Maison de Lumière có nhận khách lẻ không?',
    a: 'Có. Chúng tôi chỉ phục vụ tối đa 12 khách mỗi ngày để đảm bảo trải nghiệm tuyệt đối riêng tư. Vui lòng đặt lịch trước ít nhất 7 ngày.',
  },
  {
    q: 'Quy trình tư vấn nghi lễ ra sao?',
    a: 'Maître Spa sẽ video-call 30 phút với quý khách trước ngày hẹn để hiểu nhu cầu, tiền sử và soạn nghi lễ cá nhân hóa.',
  },
  {
    q: 'Có chính sách bảo mật cho khách VIP?',
    a: 'NDA được ký với toàn bộ nhân viên. Suite có lối vào riêng. Tất cả thiết bị ghi hình bị vô hiệu hóa trong khuôn viên.',
  },
  {
    q: 'Maison có nhận đặt tour spa kết hợp Paris/Kyoto?',
    a: 'Có, dành riêng cho thành viên Diamant và Cercle Privé — bao gồm phi cơ riêng và biệt thự chỉ định.',
  },
];
