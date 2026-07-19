// ─────────────────────────────────────────────────────────────────────────────
// Shared mock data for the 8 spa2 "content pages" (men-spa, hair-beauty,
// kids-spa, anti-aging, water-therapy, ayurveda, spa-hotel, community).
//
// Each page is described by the same shape (banner + services + packages +
// faqs + stats) so a single dashboard manage view can drive all of them,
// mirroring the /manage/services CRUD experience.
// ─────────────────────────────────────────────────────────────────────────────

import { paths } from 'src/routes/paths';

export type Spa2ContentStatus = 'published' | 'draft' | 'hidden';

export type Spa2ContentService = {
  id: string;
  name: string;
  desc: string;
  price: number;
  duration: string;
  icon: string;
  tags: string[];
  status: Spa2ContentStatus;
};

export type Spa2ContentPackage = {
  id: string;
  name: string;
  desc: string;
  price: number;
  sessions: string;
  hot?: boolean;
  status: Spa2ContentStatus;
};

export type Spa2ContentFaq = {
  id: string;
  q: string;
  a: string;
  status: Spa2ContentStatus;
};

export type Spa2ContentStat = { n: string; l: string };

export type Spa2ContentPageKey =
  | 'men-spa'
  | 'hair-beauty'
  | 'kids-spa'
  | 'anti-aging'
  | 'water-therapy'
  | 'ayurveda'
  | 'spa-hotel'
  | 'community';

export type Spa2ContentPageData = {
  key: Spa2ContentPageKey;
  publicPath: string;
  title: string;
  navLabel: string;
  banner: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
  };
  accent: string;
  stats: Spa2ContentStat[];
  services: Spa2ContentService[];
  packages: Spa2ContentPackage[];
  faqs: Spa2ContentFaq[];
};

const IMG = {
  men: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80',
  hair: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
  kids: 'https://images.unsplash.com/photo-1596178060810-72660ee8d1ae?w=1200&q=80',
  antiAging: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80',
  water: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80',
  ayurveda: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  hotel: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&q=80',
  community: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
};

const svc = (
  id: string,
  name: string,
  price: number,
  duration: string,
  icon: string,
  desc: string,
  tags: string[]
): Spa2ContentService => ({
  id,
  name,
  price,
  duration,
  icon,
  desc,
  tags,
  status: 'published',
});

const pkg = (
  id: string,
  name: string,
  price: number,
  sessions: string,
  desc: string,
  hot = false
): Spa2ContentPackage => ({ id, name, price, sessions, desc, hot, status: 'published' });

const faq = (id: string, q: string, a: string): Spa2ContentFaq => ({
  id,
  q,
  a,
  status: 'published',
});

export const SPA2_CONTENT_PAGES: Record<Spa2ContentPageKey, Spa2ContentPageData> = {
  'men-spa': {
    key: 'men-spa',
    publicPath: '/spa2/men-spa',
    title: "Men's Spa",
    navLabel: "Men's Spa",
    accent: '#1D6B5C',
    banner: {
      eyebrow: 'SPA DÀNH CHO NAM',
      title: 'Chăm sóc bản thân không phân biệt giới tính',
      subtitle:
        'Liệu trình thiết kế riêng cho da và cơ thể nam — thư giãn, trẻ hóa và phục hồi năng lượng.',
      image: IMG.men,
    },
    stats: [
      { n: '40%', l: 'Khách hàng là nam' },
      { n: '4.9★', l: 'Đánh giá từ nam giới' },
      { n: '6', l: 'Dịch vụ chuyên biệt' },
      { n: '0', l: 'Phán xét' },
    ],
    services: [
      svc('m1', 'Deep Clean Facial For Men', 790000, '60 phút', 'solar:face-scan-circle-bold-duotone', 'Làm sạch sâu, kiểm soát dầu và thu nhỏ lỗ chân lông — dành riêng cho da nam.', ['Da dầu', 'Mụn đầu đen']),
      svc('m2', 'Sports Recovery Massage', 890000, '75 phút', 'solar:running-bold-duotone', 'Giải phóng cơ bắp căng cứng sau tập luyện bằng deep tissue massage chuyên biệt.', ['Thể thao', 'Đau cơ']),
      svc('m3', 'Executive Stress Relief', 1190000, '90 phút', 'solar:briefcase-bold-duotone', 'Massage toàn thân + facial + head massage — dành cho doanh nhân bận rộn.', ['Stress', 'Mệt mỏi']),
      svc('m4', 'Gentleman Grooming Package', 690000, '60 phút', 'solar:scissor-bold-duotone', 'Cạo râu cổ điển, chăm sóc da mặt và massage đầu thư giãn.', ['Grooming']),
      svc('m5', 'Anti-Aging For Men', 1090000, '75 phút', 'solar:star-shine-bold-duotone', 'Liệu trình chống lão hóa chuyên biệt cho cấu trúc da nam.', ['Lão hóa']),
      svc('m6', 'Detox Body For Men', 990000, '90 phút', 'solar:drop-bold-duotone', 'Tẩy da chết với muối biển + massage detox thải độc.', ['Detox']),
    ],
    packages: [
      pkg('mp1', 'Monthly Gentleman', 2990000, '1 lần/tháng', 'Facial + Grooming hàng tháng — duy trì làn da tươi trẻ, chuyên nghiệp.'),
      pkg('mp2', 'Executive Monthly', 4990000, '2 lần/tháng', 'Stress relief + Facial + Grooming — dành cho doanh nhân bận rộn.'),
      pkg('mp3', 'All-In Annual', 24900000, 'Không giới hạn', 'Tất cả dịch vụ men spa không giới hạn trong 12 tháng.', true),
    ],
    faqs: [
      faq('mf1', 'Nam giới có nên đi spa không?', 'Hoàn toàn có. Da nam dày hơn và tiết dầu nhiều hơn, cần được chăm sóc đúng cách.'),
      faq('mf2', 'Có thoải mái không khi là nam giới đến spa?', 'Nature Spa có phòng riêng, KTV chuyên biệt cho nam. Không gian hoàn toàn riêng tư.'),
      faq('mf3', 'Nên bắt đầu từ dịch vụ nào?', 'Gentleman Grooming Package hoặc Deep Clean Facial là lựa chọn lý tưởng cho lần đầu.'),
    ],
  },
  'hair-beauty': {
    key: 'hair-beauty',
    publicPath: '/spa2/hair-beauty',
    title: 'Hair & Beauty',
    navLabel: 'Hair & Beauty',
    accent: '#2E8B7A',
    banner: {
      eyebrow: 'CHĂM SÓC TÓC & DA ĐẦU',
      title: 'Suối nguồn sức khỏe cho mái tóc',
      subtitle: 'Liệu trình chuyên sâu cho tóc và da đầu — từ thảo dược tự nhiên đến công nghệ hiện đại.',
      image: IMG.hair,
    },
    stats: [
      { n: '6', l: 'Liệu trình chuyên sâu' },
      { n: '95%', l: 'Khách hài lòng' },
      { n: '4.8★', l: 'Đánh giá trung bình' },
      { n: '10+', l: 'Năm kinh nghiệm' },
    ],
    services: [
      svc('h1', 'Gội Đầu Thảo Mộc Cao Cấp', 290000, '45 phút', 'solar:magic-stick-3-bold-duotone', 'Gội sạch với thảo dược tự nhiên, massage da đầu kích thích tuần hoàn.', ['Gàu', 'Da đầu nhờn']),
      svc('h2', 'Deep Conditioning Treatment', 590000, '60 phút', 'solar:drop-bold-duotone', 'Ủ dưỡng chuyên sâu phục hồi mái tóc hư tổn, khô xơ và chẻ ngọn.', ['Tóc khô', 'Hư tổn']),
      svc('h3', 'Scalp Detox & Massage', 490000, '60 phút', 'solar:leaf-bold-duotone', 'Tẩy tế bào chết da đầu, làm sạch nang tóc và kích thích mọc tóc.', ['Rụng tóc']),
      svc('h4', 'Keratin Repair Treatment', 1290000, '90 phút', 'solar:stars-bold-duotone', 'Phục hồi keratin tóc bằng protein tự nhiên — tóc mềm mượt bền đến 6 tuần.', ['Tóc hư nặng']),
      svc('h5', 'Anti Hair Loss Program', 890000, '75 phút', 'solar:shield-bold-duotone', 'Liệu trình trị rụng tóc chuyên sâu: serum + massage + ánh sáng hồng ngoại.', ['Rụng tóc']),
      svc('h6', 'Scalp Hydration Facial', 690000, '60 phút', 'solar:snowflake-bold-duotone', 'Cấp ẩm sâu cho da đầu khô ngứa — kết hợp chiết xuất lô hội và dầu argan.', ['Da đầu khô']),
    ],
    packages: [
      pkg('hp1', 'Hair Care 3 tháng', 2790000, '4 lần', 'Combo gội + ủ + scalp massage định kỳ.'),
      pkg('hp2', 'Anti Loss Program', 6990000, '8 lần', 'Chương trình chống rụng tóc chuyên sâu 2 tháng.', true),
      pkg('hp3', 'Keratin Yearly', 12900000, '12 lần', 'Duy trì keratin quanh năm — mái tóc luôn mềm mượt.'),
    ],
    faqs: [
      faq('hf1', 'Bao lâu nên gội đầu chăm sóc chuyên sâu?', '2–4 tuần/lần tùy tình trạng tóc và da đầu.'),
      faq('hf2', 'Trị rụng tóc mất bao lâu thấy hiệu quả?', 'Trung bình 6–8 tuần sẽ thấy tóc con mọc lên rõ rệt.'),
    ],
  },
  'kids-spa': {
    key: 'kids-spa',
    publicPath: '/spa2/kids-spa',
    title: 'Kids Spa',
    navLabel: 'Kids Spa',
    accent: '#F48FB1',
    banner: {
      eyebrow: 'SPA CHO TRẺ EM',
      title: 'Không gian spa an toàn cho các thiên thần nhỏ',
      subtitle: 'Sản phẩm 100% thiên nhiên, pH trung tính — được bác sĩ nhi khoa chứng nhận.',
      image: IMG.kids,
    },
    stats: [
      { n: '100%', l: 'Sản phẩm thiên nhiên' },
      { n: '5+', l: 'Tuổi có thể trải nghiệm' },
      { n: '6', l: 'Dịch vụ cho bé' },
      { n: '0', l: 'Hóa chất mạnh' },
    ],
    services: [
      svc('k1', 'Mini Facial Cho Bé', 390000, '30 phút', 'solar:face-scan-circle-bold-duotone', 'Làm sạch nhẹ nhàng và dưỡng ẩm với sản phẩm 100% thiên nhiên, pH trung tính.', ['8–12 tuổi']),
      svc('k2', 'Teen Skin Clear', 590000, '45 phút', 'solar:leaf-bold-duotone', 'Kiểm soát dầu và mụn đầu đen giai đoạn dậy thì — không dùng hóa chất mạnh.', ['13–17 tuổi']),
      svc('k3', 'Nail Art Cho Bé', 290000, '45 phút', 'solar:hand-heart-bold-duotone', 'Sơn không độc hại, an toàn cho trẻ — màu sắc ngộ nghĩnh.', ['6–12 tuổi']),
      svc('k4', 'Gội Đầu Thư Giãn', 190000, '30 phút', 'solar:magic-stick-3-bold-duotone', 'Shampoo thảo mộc dành riêng cho trẻ, massage nhẹ nhàng.', ['5+ tuổi']),
      svc('k5', 'Mẹ & Bé Spa Together', 1290000, '90 phút', 'solar:heart-bold-duotone', 'Trải nghiệm spa song song — mẹ facial, bé nail — kỷ niệm đáng nhớ.', ['Mọi lứa tuổi']),
      svc('k6', 'Birthday Princess Party', 2490000, '120 phút', 'solar:gift-bold-duotone', 'Tiệc sinh nhật spa phong cách công chúa (nhóm 4+).', ['6–14 tuổi']),
    ],
    packages: [
      pkg('kp1', 'Mommy & Me 4 buổi', 4590000, '4 lần', 'Combo mẹ & bé giá ưu đãi.'),
      pkg('kp2', 'Teen Clear Program', 3990000, '6 lần', 'Chương trình trị mụn dậy thì 3 tháng.', true),
    ],
    faqs: [
      faq('kf1', 'Bé từ mấy tuổi có thể trải nghiệm?', 'Từ 5 tuổi trở lên. Dịch vụ nail và gội đầu phù hợp cho bé nhỏ hơn với phụ huynh đi kèm.'),
      faq('kf2', 'Sản phẩm dùng có an toàn không?', '100% sản phẩm hữu cơ, đã được kiểm định bởi bác sĩ nhi khoa.'),
    ],
  },
  'anti-aging': {
    key: 'anti-aging',
    publicPath: '/spa2/anti-aging',
    title: 'Anti-Aging',
    navLabel: 'Anti-Aging',
    accent: '#5AB5A3',
    banner: {
      eyebrow: 'CHỐNG LÃO HÓA',
      title: 'Trẻ hóa làn da từ tế bào',
      subtitle: 'Liệu trình chống lão hóa kết hợp công nghệ hiện đại và thành phần thiên nhiên cao cấp.',
      image: IMG.antiAging,
    },
    stats: [
      { n: '5', l: 'Giai đoạn tuổi' },
      { n: '15+', l: 'Công nghệ' },
      { n: '92%', l: 'Cải thiện nếp nhăn' },
      { n: '4.9★', l: 'Đánh giá' },
    ],
    services: [
      svc('a1', 'Preventive Youth Facial', 890000, '60 phút', 'solar:leaf-bold-duotone', 'Ngăn ngừa lão hóa sớm cho tuổi 20–30 — collagen boost, cấp ẩm sâu.', ['20–30 tuổi']),
      svc('a2', 'Collagen Renewal', 1290000, '75 phút', 'solar:star-shine-bold-duotone', 'Kích thích tái tạo collagen tự nhiên — giảm nếp nhăn đầu tiên.', ['30–40 tuổi']),
      svc('a3', 'Deep Wrinkle Erase', 1890000, '90 phút', 'solar:magic-stick-3-bold-duotone', 'Làm mờ nếp nhăn sâu bằng công nghệ RF + peptide cao cấp.', ['40–50 tuổi']),
      svc('a4', 'Golden Age Ritual', 2490000, '120 phút', 'solar:crown-bold-duotone', 'Liệu trình vàng dành cho làn da trưởng thành — nuôi dưỡng và trẻ hóa toàn diện.', ['50+ tuổi']),
      svc('a5', 'Neck & Décolleté Lift', 990000, '60 phút', 'solar:hand-shake-bold-duotone', 'Nâng cơ vùng cổ và ngực — thường bị bỏ quên trong routine chăm sóc.', ['Toàn tuổi']),
      svc('a6', 'Eye Rejuvenation', 690000, '45 phút', 'solar:eye-bold-duotone', 'Chăm sóc vùng mắt — giảm quầng thâm, bọng mắt và nếp nhăn.', ['Toàn tuổi']),
    ],
    packages: [
      pkg('ap1', 'Youth Preserve 6 tháng', 8990000, '12 lần', 'Duy trì làn da tươi trẻ định kỳ 2 tuần/lần.'),
      pkg('ap2', 'Total Rejuvenation', 19900000, '20 lần', 'Chương trình trẻ hóa toàn diện 10 tháng.', true),
    ],
    faqs: [
      faq('af1', 'Khi nào nên bắt đầu chống lão hóa?', 'Từ 25 tuổi trở lên. Phòng ngừa luôn hiệu quả hơn điều trị.'),
      faq('af2', 'Liệu trình có tác dụng ngay không?', 'Sau 1 buổi da căng mịn hơn; sau 4–6 buổi thấy nếp nhăn giảm rõ.'),
    ],
  },
  'water-therapy': {
    key: 'water-therapy',
    publicPath: '/spa2/water-therapy',
    title: 'Water Therapy',
    navLabel: 'Water Therapy',
    accent: '#00695C',
    banner: {
      eyebrow: 'THUỶ LIỆU PHÁP',
      title: 'Nước — nguồn sống của mọi liệu trình',
      subtitle: 'Bồn tắm khoáng, xông hơi thảo dược và liệu pháp nhiệt đá — chữa lành bằng nước.',
      image: IMG.water,
    },
    stats: [
      { n: '4', l: 'Loại liệu pháp' },
      { n: '38°', l: 'Nhiệt độ tối ưu' },
      { n: '45p', l: 'Ngâm mỗi buổi' },
      { n: '20+', l: 'Loại thảo dược' },
    ],
    services: [
      svc('w1', 'Bồn Tắm Khoáng Himalaya', 590000, '45 phút', 'solar:drop-bold-duotone', 'Ngâm mình trong nước muối hồng Himalaya giàu khoáng chất — detox và thư giãn.', ['Detox']),
      svc('w2', 'Bồn Tắm Sữa & Hoa Hồng', 790000, '45 phút', 'solar:flower-bold-duotone', 'Bồn tắm Cleopatra với sữa bò tươi, cánh hoa hồng và tinh dầu.', ['Dưỡng ẩm']),
      svc('w3', 'Xông Hơi Thảo Dược', 390000, '30 phút', 'solar:leaf-bold-duotone', 'Xông hơi với sả, gừng, lá bưởi và thảo mộc Việt — khai thông hô hấp.', ['Detox']),
      svc('w4', 'Liệu Pháp Đá Lạnh & Đá Nóng', 890000, '60 phút', 'solar:snowflake-bold-duotone', 'Kết hợp đá nóng giãn cơ, đá lạnh kích thích tuần hoàn.', ['Tuần hoàn']),
    ],
    packages: [
      pkg('wp1', 'Hydro Week', 2990000, '5 lần', 'Trọn gói 5 buổi thuỷ liệu pháp trong 1 tuần.'),
      pkg('wp2', 'Monthly Soak', 4990000, '8 lần', 'Ngâm khoáng định kỳ 2 lần/tuần trong 1 tháng.', true),
    ],
    faqs: [
      faq('wf1', 'Có nên ngâm khoáng khi cao huyết áp?', 'Cần tư vấn bác sĩ; nhiệt độ và thời gian sẽ điều chỉnh phù hợp.'),
      faq('wf2', 'Có tắm sau khi ngâm khoáng không?', 'Không nên tắm lại ngay — để khoáng thẩm thấu tối thiểu 4 tiếng.'),
    ],
  },
  ayurveda: {
    key: 'ayurveda',
    publicPath: '/spa2/ayurveda',
    title: 'Ayurveda',
    navLabel: 'Ayurveda',
    accent: '#8D6E63',
    banner: {
      eyebrow: 'Y HỌC CỔ TRUYỀN',
      title: 'Trí tuệ chữa lành từ 5000 năm',
      subtitle: 'Tinh hoa liệu pháp cổ truyền Ấn Độ, Trung Quốc, Thái Lan và Việt Nam.',
      image: IMG.ayurveda,
    },
    stats: [
      { n: '6', l: 'Liệu pháp cổ truyền' },
      { n: '5', l: 'Quốc gia nguồn gốc' },
      { n: '5000+', l: 'Năm lịch sử' },
      { n: '4.9★', l: 'Đánh giá' },
    ],
    services: [
      svc('ay1', 'Abhyanga Full Body Massage', 1190000, '90 phút', 'solar:hand-stars-bold-duotone', 'Massage toàn thân bằng dầu thảo dược ấm — kỹ thuật Ayurveda cân bằng 3 dosha.', ['Ấn Độ']),
      svc('ay2', 'Shirodhara (Rót Dầu Đầu)', 890000, '60 phút', 'solar:drop-bold-duotone', 'Rót dầu thảo dược ấm liên tục lên trán — giảm lo âu và mất ngủ sâu.', ['Ấn Độ']),
      svc('ay3', 'Tuina Therapeutic Massage', 890000, '75 phút', 'solar:lightning-bold-duotone', 'Massage y học cổ truyền Trung Quốc — điều hòa khí huyết.', ['Trung Quốc']),
      svc('ay4', 'Đông Y Herbal Bath', 690000, '60 phút', 'solar:leaf-bold-duotone', 'Ngâm trong bồn thuốc Đông Y với 20+ thảo dược truyền thống.', ['Việt Nam']),
      svc('ay5', 'Thai Yoga Massage', 1090000, '90 phút', 'solar:body-bold-duotone', 'Kết hợp yoga thụ động và ấn huyệt.', ['Thái Lan']),
      svc('ay6', 'Balinese Spirit Ritual', 1390000, '120 phút', 'solar:stars-bold-duotone', 'Nghi thức Bali đầy đủ: tẩy tế bào chết + massage + hoa + dầu thơm.', ['Indonesia']),
    ],
    packages: [
      pkg('ayp1', 'Dosha Balance Program', 5990000, '5 lần', 'Liệu trình cân bằng 3 dosha theo cá nhân hóa.'),
      pkg('ayp2', 'Around Asia Journey', 8990000, '5 lần', 'Trải nghiệm 5 liệu pháp cổ truyền của 5 quốc gia.', true),
    ],
    faqs: [
      faq('ayf1', 'Ayurveda là gì?', 'Hệ thống y học cổ truyền Ấn Độ 5000 năm, tập trung cân bằng cơ thể, tâm trí và tinh thần.'),
      faq('ayf2', 'Nên chọn liệu pháp nào đầu tiên?', 'Abhyanga hoặc Shirodhara là lựa chọn nhập môn tuyệt vời.'),
    ],
  },
  'spa-hotel': {
    key: 'spa-hotel',
    publicPath: '/spa2/spa-hotel',
    title: 'Spa Hotel',
    navLabel: 'Spa Hotel',
    accent: '#C39B77',
    banner: {
      eyebrow: 'SPA STAYCATION',
      title: 'Spa trọn gói cùng nghỉ dưỡng',
      subtitle: 'Kết hợp đêm nghỉ tại khách sạn đối tác 4–5★ với liệu trình spa cao cấp.',
      image: IMG.hotel,
    },
    stats: [
      { n: '10+', l: 'Khách sạn đối tác' },
      { n: '3', l: 'Gói staycation' },
      { n: '5★', l: 'Chuẩn dịch vụ' },
      { n: '4.9★', l: 'Đánh giá' },
    ],
    services: [],
    packages: [
      pkg('sp1', 'Spa Escape Weeknight', 3900000, '1 đêm', 'Phòng Superior + facial 60p + massage 60p + bữa sáng 2 người.'),
      pkg('sp2', 'Weekend Wellness Retreat', 7900000, '2 đêm', 'Phòng Deluxe + body ritual + anti-aging facial + yoga + xe đưa đón.', true),
      pkg('sp3', 'Luxury Detox Journey 3D2N', 14900000, '3 đêm', 'Suite view biển + spa không giới hạn + detox program + personal trainer.'),
    ],
    faqs: [
      faq('sf1', 'Có được đổi khách sạn đối tác không?', 'Có thể chọn theo danh sách 10+ khách sạn đối tác.'),
      faq('sf2', 'Trẻ em có được đi cùng không?', 'Có, một số gói hỗ trợ giường phụ miễn phí cho trẻ dưới 6 tuổi.'),
    ],
  },
  community: {
    key: 'community',
    publicPath: '/spa2/community',
    title: 'Community',
    navLabel: 'Community',
    accent: '#2E8B7A',
    banner: {
      eyebrow: 'CỘNG ĐỒNG',
      title: 'Nature Spa Community',
      subtitle: 'Chia sẻ hành trình chăm sóc sức khỏe, tham gia thử thách và kết nối cộng đồng.',
      image: IMG.community,
    },
    stats: [
      { n: '12k+', l: 'Thành viên' },
      { n: '150+', l: 'Bài chia sẻ/tuần' },
      { n: '8', l: 'Thử thách đang chạy' },
      { n: '4.9★', l: 'Đánh giá' },
    ],
    services: [
      svc('c1', 'Workshop Skincare Cơ Bản', 0, '2 giờ', 'solar:notebook-bold-duotone', 'Sự kiện hàng tháng miễn phí cho thành viên.', ['Workshop']),
      svc('c2', 'Yoga Sunrise Session', 150000, '60 phút', 'solar:sun-bold-duotone', 'Buổi yoga bình minh thứ 7 hàng tuần tại rooftop.', ['Yoga']),
      svc('c3', 'Meditation Circle', 0, '45 phút', 'solar:meditation-bold-duotone', 'Buổi thiền định nhóm mỗi tối chủ nhật.', ['Thiền']),
    ],
    packages: [
      pkg('cp1', '30 Days Wellness Challenge', 0, '30 ngày', 'Thử thách miễn phí — 30 ngày sống lành mạnh cùng cộng đồng.'),
      pkg('cp2', 'Nature Spa Membership', 990000, '12 tháng', 'Ưu đãi 10% mọi liệu trình + tham gia mọi sự kiện community.', true),
    ],
    faqs: [
      faq('cf1', 'Làm sao để tham gia cộng đồng?', 'Đăng ký tài khoản trên website hoặc app Nature Spa — hoàn toàn miễn phí.'),
      faq('cf2', 'Sự kiện community có tính phí không?', 'Phần lớn miễn phí; workshop chuyên sâu có thu phí nhỏ.'),
    ],
  },
};

export const SPA2_CONTENT_PAGE_KEYS = Object.keys(SPA2_CONTENT_PAGES) as Spa2ContentPageKey[];

// Wire public paths through paths.spa2 when they exist (fall back to inline
// string otherwise so this file stays decoupled from routes/paths ordering).
export function spa2ContentPublicPath(key: Spa2ContentPageKey): string {
  const p = (paths.spa2 as Record<string, unknown>)[
    key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  ];
  return typeof p === 'string' ? p : SPA2_CONTENT_PAGES[key].publicPath;
}
