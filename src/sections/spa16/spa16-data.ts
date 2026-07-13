export const NIGHT = '#0E1A2B';
export const TERRA = '#C25B3F';
export const SAFFRON = '#E0A458';
export const SAND = '#F2E5D0';
export const JADE = '#1F6B5E';
export const ROSE = '#B85C7C';
export const COPPER = '#8A4B2A';

export const SPA16_HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=80',
    alt: 'Marrakech riad',
  },
  {
    src: 'https://images.unsplash.com/photo-1531001370480-c2740d83a09b?w=1920&q=80',
    alt: 'Moorish arch',
  },
  {
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80',
    alt: 'Hammam ritual',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1920&q=80',
    alt: 'Argan apothecary',
  },
];

export const SPA16_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1920&q=80',
  arch: 'https://images.unsplash.com/photo-1531001370480-c2740d83a09b?w=1600&q=80',
  hammam1: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
  hammam2: 'https://plus.unsplash.com/premium_photo-1727226750848-2725a1675575?w=900&q=80',
  hammam3: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=900&q=80',
  hammam4: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=900&q=80',
  riad1: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
  riad2: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
  riad3: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80',
  apothecary: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80',
  argan: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1600&q=80',
  courtyard: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1600&q=80',
  therapist1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  therapist2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  therapist3: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80',
  therapist4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
};

export const SPA16_HERITAGE = [
  {
    numeral: 'I',
    title: 'Hammam Cổ Đại',
    desc: 'Nghi lễ tắm hơi từ Marrakech 800 năm — nơi cộng đồng gặp gỡ, thanh tẩy thân và tâm.',
  },
  {
    numeral: 'II',
    title: 'Argan Vàng Lỏng',
    desc: 'Dầu argan ép lạnh từ rừng cây cổ Essaouira — di sản UNESCO do phụ nữ Berber gìn giữ.',
  },
  {
    numeral: 'III',
    title: 'Hương Liệu Souk',
    desc: 'Nhụy nghệ tây Taliouine, hoa hồng Damask thung lũng Kelaa và đất sét Rhassoul từ Atlas.',
  },
  {
    numeral: 'IV',
    title: 'Nghệ Thuật Zellige',
    desc: 'Gạch khảm thủ công Fez phủ tường — ánh sáng len qua kính màu trang trí mỗi giờ một sắc.',
  },
];

export const SPA16_HAMMAMS = [
  {
    img: SPA16_IMAGES.hammam1,
    name: 'Bayt al-Sakhin',
    sub: 'Phòng nóng — đá cẩm thạch Carrara',
    temp: '45°C',
    mineral: 'Hơi nước thảo mộc',
    desc: 'Phòng nóng truyền thống lát đá cẩm thạch trắng — mở lỗ chân lông cho nghi lễ Gommage savon noir.',
    color: TERRA,
  },
  {
    img: SPA16_IMAGES.hammam2,
    name: 'Bayt al-Wasat',
    sub: 'Phòng ấm — vòm zellige xanh',
    temp: '38°C',
    mineral: 'Tinh dầu cam đắng',
    desc: 'Vòm trần khảm 14.000 viên zellige — không gian chuyển tiếp để thân thể làm quen với hơi nóng.',
    color: JADE,
  },
  {
    img: SPA16_IMAGES.hammam3,
    name: 'Bayt al-Barid',
    sub: 'Phòng lạnh — bể nước hoa hồng',
    temp: '22°C',
    mineral: 'Cánh hoa Damask',
    desc: 'Bể nước lạnh rắc cánh hoa hồng Kelaa — co se mạch máu, làm săn da và kích hoạt tuần hoàn.',
    color: ROSE,
  },
  {
    img: SPA16_IMAGES.hammam4,
    name: 'Riad al-Najm',
    sub: 'Sân trời lộ thiên — ngắm sao',
    temp: '32°C',
    mineral: 'Muối Atlas hồng',
    desc: 'Bể nóng ngoài trời giữa sân riad — ngắm bầu trời sa mạc Sahara dưới mái vòm Berber.',
    color: NIGHT,
  },
];

export const SPA16_RITUALS = [
  {
    code: 'I',
    name: 'Gommage Savon Noir',
    duration: '60 phút',
    price: '1.450.000₫',
    desc: 'Tẩy tế bào chết với xà phòng đen olive và găng kessa — loại bỏ lớp sừng tích tụ, da mới mềm mịn.',
  },
  {
    code: 'II',
    name: 'Rhassoul Đất Sét Atlas',
    duration: '75 phút',
    price: '1.850.000₫',
    desc: 'Đắp đất sét núi lửa Atlas với nước hoa hồng — hút độc tố, khoáng hóa và làm sáng tone da.',
  },
  {
    code: 'III',
    name: 'Argan Royale',
    duration: '90 phút',
    price: '2.450.000₫',
    desc: 'Massage toàn thân với dầu argan vàng ép lạnh — chống lão hóa, dưỡng ẩm sâu cho da khô.',
  },
  {
    code: 'IV',
    name: 'Berber Body Wrap',
    duration: '90 phút',
    price: '2.200.000₫',
    desc: 'Quấn thảo mộc Saharan: bạc hà Atlas, nghệ tây, mật ong sa mạc — giảm viêm và làm dịu cơ.',
  },
  {
    code: 'V',
    name: 'Saffron Facial',
    duration: '75 phút',
    price: '2.650.000₫',
    desc: 'Mặt nạ nhụy nghệ tây Taliouine + sữa lừa — rạng rỡ, mờ thâm và cân bằng sắc tố không đều.',
  },
  {
    code: 'VI',
    name: 'Sultan Ceremony',
    duration: '180 phút',
    price: '4.800.000₫',
    desc: 'Nghi lễ hoàng gia: hammam ba phòng + gommage + rhassoul + argan massage + trà bạc hà cuối ngày.',
  },
];

export const SPA16_RIADS = [
  {
    img: SPA16_IMAGES.riad1,
    name: 'Riad Medina',
    size: '48m² · 2 khách',
    price: '6.200.000₫/đêm',
    feats: ['Sân hiên zellige riêng', 'Tầm nhìn vườn cam', 'Bồn đồng thủ công Fez'],
  },
  {
    img: SPA16_IMAGES.riad2,
    name: 'Riad Atlas',
    size: '62m² · 2 khách',
    price: '9.400.000₫/đêm',
    feats: ['Hammam mini riêng', 'Mái thượng ngắm sao', 'Bộ ấm trà bạc nguyên chất'],
  },
  {
    img: SPA16_IMAGES.riad3,
    name: 'Royal Kasbah',
    size: '110m² · 4 khách',
    price: '16.800.000₫/đêm',
    feats: ['Hai phòng ngủ canopy', 'Sân riad có hồ phun', 'Quản gia Berber 24/7'],
  },
];

export const SPA16_APOTHECARY = [
  {
    name: 'Dầu Argan Vàng',
    origin: 'Essaouira',
    use: 'Dưỡng ẩm sâu, chống lão hóa',
    price: '850.000₫ / 50ml',
  },
  {
    name: 'Đất Sét Rhassoul',
    origin: 'Núi Atlas',
    use: 'Mặt nạ thải độc, khoáng hóa',
    price: '420.000₫ / 200g',
  },
  {
    name: 'Nhụy Nghệ Tây',
    origin: 'Taliouine',
    use: 'Mặt nạ làm sáng, mờ thâm',
    price: '1.250.000₫ / 5g',
  },
  {
    name: 'Nước Hoa Hồng Kelaa',
    origin: 'Thung lũng Dades',
    use: 'Toner cân bằng, làm dịu',
    price: '380.000₫ / 250ml',
  },
  {
    name: 'Savon Noir Olive',
    origin: 'Marrakech',
    use: 'Tẩy da chết toàn thân',
    price: '320.000₫ / 200g',
  },
  {
    name: 'Muối Hồng Atlas',
    origin: 'Mỏ Atlas',
    use: 'Tắm khoáng, thư giãn cơ',
    price: '280.000₫ / 500g',
  },
];

export const SPA16_THERAPISTS = [
  {
    img: SPA16_IMAGES.therapist1,
    name: 'Yasmina El Fassi',
    role: 'Hammam Master · 20 năm',
    from: 'Fez',
  },
  {
    img: SPA16_IMAGES.therapist2,
    name: 'Layla Benali',
    role: 'Saffron Facialist · 16 năm',
    from: 'Marrakech',
  },
  {
    img: SPA16_IMAGES.therapist3,
    name: 'Hassan Ouazzani',
    role: 'Argan Therapist · 14 năm',
    from: 'Essaouira',
  },
  {
    img: SPA16_IMAGES.therapist4,
    name: 'Amina Tazi',
    role: 'Tea & Aromatic Master · 22 năm',
    from: 'Chefchaouen',
  },
];

export const SPA16_TESTIMONIALS = [
  {
    text: 'Sultan Ceremony 3 tiếng là chuyến du hành về Marrakech mà không cần lên máy bay. Mọi giác quan đều được chiều chuộng.',
    name: 'Trang Nguyễn',
    role: 'TP.HCM · Khách Kasbah',
  },
  {
    text: 'Gommage với savon noir loại bỏ cả năm căng thẳng. Da tôi chưa bao giờ mềm như vậy.',
    name: 'Sophie Laurent',
    role: 'Lyon · Spa journalist',
  },
  {
    text: 'Riad Atlas có hammam riêng — buổi sáng ngồi sân thượng uống trà bạc hà nhìn mặt trời mọc, không lời nào tả nổi.',
    name: 'Omar Khalil',
    role: 'Dubai · Khách thường niên',
  },
];
