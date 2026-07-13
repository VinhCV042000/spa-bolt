// ----------------------------------------------------------------------
// spa22 — Aurora Beauty Lab
// Futuristic K-Beauty / holographic neon / editorial asymmetric magazine
// Distinct from prior spa pages: iridescent gradients on near-black,
// numbered horizontal-rhythm sections, oversized display serif + mono caps.
// ----------------------------------------------------------------------

export const AURORA_INK = '#0A0A12';
export const AURORA_INK_2 = '#13131E';
export const AURORA_LILAC = '#C8B6FF';
export const AURORA_MINT = '#7CF5C4';
export const AURORA_PEACH = '#FFB199';
export const AURORA_PINK = '#FF7AC6';
export const AURORA_CREAM = '#F5F0E6';

export const AURORA_GRADIENT =
  'linear-gradient(120deg,#FF7AC6 0%,#C8B6FF 35%,#7CF5C4 70%,#FFB199 100%)';

export const SPA22_HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1920&q=80',
    alt: 'Aurora beauty lab',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80',
    alt: 'Holographic treatment',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1920&q=80',
    alt: 'K-beauty ritual',
  },
  {
    src: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1920&q=80',
    alt: 'Glass skin lab',
  },
];

export const SPA22_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1920&q=80',
  heroSide: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  lab1: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
  lab2: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80',
  ritual1: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
  ritual2: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=900&q=80',
  ritual3: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80',
  ritual4: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=80',
  glow: 'https://images.unsplash.com/photo-1614859139871-72090ed0aaba?w=1600&q=80',
  capsule: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=80',
  team1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  team2: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  team3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  loyalty: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80',
};

export const SPA22_PROTOCOLS = [
  {
    no: '01',
    name: 'Holo Glass Skin',
    duration: '90 phút',
    price: '2.450.000₫',
    tech: 'LED Polychrome + Cryo Globe',
    desc: 'Liệu trình 7 bước trả lại bề mặt da phản chiếu ánh sáng — peptide nội bào và sóng RF mịn lỗ chân lông.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    accent: '#FF7AC6',
  },
  {
    no: '02',
    name: 'Aurora Lift',
    duration: '75 phút',
    price: '2.890.000₫',
    tech: 'HIFU 3D + Microcurrent',
    desc: 'Sóng siêu âm hội tụ 3 lớp + dòng vi điện tái cấu trúc — đường nét V-line trong một buổi duy nhất.',
    img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
    accent: '#C8B6FF',
  },
  {
    no: '03',
    name: 'Neon Hydra',
    duration: '60 phút',
    price: '1.890.000₫',
    tech: 'Oxygen Jet + Cooling Mask',
    desc: 'Bơm oxy nguyên chất + serum HA phân tử kép — căng mọng tức thì, độ ẩm tăng 218% sau buổi đầu.',
    img: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=900&q=80',
    accent: '#7CF5C4',
  },
  {
    no: '04',
    name: 'Solar Reset',
    duration: '105 phút',
    price: '3.250.000₫',
    tech: 'Picolaser + Exosome',
    desc: 'Picolaser bước sóng kép xoá nám sâu, exosome cá hồi tái sinh — kết thúc bằng mặt nạ vàng 24K.',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=80',
    accent: '#FFB199',
  },
];

export const SPA22_LAB = [
  { k: 'λ 415nm', v: 'Blue light kháng khuẩn — mụn viêm' },
  { k: 'λ 633nm', v: 'Red light tăng sinh collagen' },
  { k: '−18°C', v: 'Cryo globe se khít lỗ chân lông' },
  { k: '4 MHz', v: 'RF tần số trung tái cấu trúc' },
  { k: 'pH 5.5', v: 'Serum cân bằng màng acid' },
  { k: '0.45 µm', v: 'Micro-needle dẫn dưỡng chất' },
];

export const SPA22_TIMELINE = [
  {
    t: '00 min',
    step: { vi: 'CHECK-IN', en: 'CHECK-IN' },
    desc: {
      vi: 'Quét da AI VISIA — bản đồ 12 chỉ số sắc tố và độ ẩm.',
      en: 'AI VISIA skin scan — 12-point map of pigment and moisture levels.',
    },
  },
  {
    t: '10 min',
    step: { vi: 'CLEANSE', en: 'CLEANSE' },
    desc: {
      vi: 'Double cleansing với enzyme papain + sữa rửa LHA.',
      en: 'Double cleansing with papain enzyme + LHA cleanser.',
    },
  },
  {
    t: '25 min',
    step: { vi: 'TREATMENT', en: 'TREATMENT' },
    desc: {
      vi: 'Liệu trình công nghệ cao tuỳ chỉnh theo bản đồ da.',
      en: 'Custom high-tech treatment based on your skin map.',
    },
  },
  {
    t: '70 min',
    step: { vi: 'INFUSION', en: 'INFUSION' },
    desc: {
      vi: 'Mask LED hai cực + serum exosome thẩm thấu sâu.',
      en: 'Bipolar LED mask + deep-penetrating exosome serum.',
    },
  },
  {
    t: '90 min',
    step: { vi: 'GLOW', en: 'GLOW' },
    desc: {
      vi: 'Đo lại VISIA — báo cáo chênh lệch hiển thị tức thì.',
      en: 'Retake VISIA — before/after comparison displayed instantly.',
    },
  },
];

export const SPA22_CAPSULES = [
  { name: 'Aurora Serum', vol: '30ml', price: '1.450.000₫', tag: 'Niacinamide 10 + Tranexamic' },
  { name: 'Glass Essence', vol: '120ml', price: '980.000₫', tag: 'PHA + Centella' },
  { name: 'Cryo Mask', vol: '5 miếng', price: '650.000₫', tag: 'Peptide bio-cellulose' },
  { name: 'Solar Shield', vol: '50ml', price: '720.000₫', tag: 'SPF50+ PA++++ tone-up' },
];

export const SPA22_TEAM = [
  {
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    name: 'Dr. Han Ji-eun',
    role: 'Head Dermatologist · Seoul',
  },
  {
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    name: 'Lê Mai Anh',
    role: 'Lead Aesthetician · 12 năm',
  },
  {
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    name: 'Park So-young',
    role: 'LED Protocol Specialist',
  },
];

export const SPA22_PRESS = [
  { name: 'VOGUE', quote: '"Trải nghiệm K-beauty xa xỉ nhất Đông Nam Á."' },
  { name: 'ELLE', quote: '"Glass skin trong 90 phút — kết quả đo được."' },
  { name: 'HARPER\u2019S BAZAAR', quote: '"Phòng lab da đẹp tương lai đã đến Việt Nam."' },
  { name: 'L\u2019OFFICIEL', quote: '"Sự giao thoa hoàn hảo công nghệ và xa xỉ."' },
];

export const SPA22_FAQ = [
  {
    q: 'Liệu trình có phù hợp da nhạy cảm?',
    a: 'Có. Mọi protocol đều được tuỳ chỉnh dựa trên bản đồ VISIA cá nhân — bước sóng và cường độ điều chỉnh riêng.',
  },
  {
    q: 'Bao lâu thấy kết quả?',
    a: 'Glass skin và Hydra cho kết quả tức thì sau 1 buổi. Aurora Lift và Solar Reset thấy rõ sau 3–4 buổi.',
  },
  {
    q: 'Có thể kết hợp các liệu trình không?',
    a: 'Có. Đội ngũ bác sĩ sẽ xếp lịch giãn cách tối ưu để các liệu trình bổ trợ nhau.',
  },
  {
    q: 'Sản phẩm Aurora bán riêng được không?',
    a: 'Capsule line bán tại showroom và website chính thức — kèm tư vấn skincare routine miễn phí.',
  },
];

export const SPA22_MEMBERSHIP = [
  {
    tier: 'GLOW',
    price: '12.000.000₫',
    period: '6 tháng',
    perks: ['4 liệu trình tự chọn', 'Quét VISIA hàng tháng', '10% sản phẩm capsule'],
  },
  {
    tier: 'AURORA',
    price: '24.000.000₫',
    period: '12 tháng',
    perks: ['10 liệu trình + 2 signature', 'Phòng VIP riêng', '20% capsule + quà sinh nhật'],
    popular: true,
  },
  {
    tier: 'SOLAR',
    price: '48.000.000₫',
    period: '12 tháng',
    perks: [
      'Không giới hạn liệu trình cơ bản',
      'Bác sĩ riêng tư vấn 24/7',
      'Concierge & đặt lịch ưu tiên',
    ],
  },
];
