// Mock data for spa2 extended pages (content-pages2–5)
// Simplified snapshots aligned with public spa2 pages.

export const SPA2_EXTENDED_MOCKS = {
  membership: {
    tiers: [
      { id: 'silver', name: 'Silver', price: 0, perks: ['Giảm 5% mọi dịch vụ', 'Tích 1đ / 10.000đ'] },
      { id: 'gold', name: 'Gold', price: 990000, perks: ['Giảm 10%', '1 buổi check-up da / năm'], hot: true },
      { id: 'platinum', name: 'Platinum', price: 2990000, perks: ['Giảm 15%', 'Concierge riêng'] },
    ],
  },
  giftCard: {
    denominations: [200000, 500000, 1000000, 2000000, 5000000],
    designs: ['Nature', 'Birthday', 'Couple', 'Wellness'],
  },
  wellnessPackage: {
    items: [
      { name: 'Relax Day', duration: '4 giờ', price: 1890000, tag: 'Cơ bản' },
      { name: 'Detox Weekend', duration: '2 ngày', price: 4590000, tag: 'Phổ biến', hot: true },
      { name: 'Premium Retreat', duration: '3 ngày', price: 8990000, tag: 'Cao cấp' },
    ],
  },
  skinQuiz: {
    questions: [
      { id: 1, question: 'Loại da của bạn?', options: ['Khô', 'Dầu', 'Hỗn hợp', 'Nhạy cảm'] },
      { id: 2, question: 'Mục tiêu chính?', options: ['Dưỡng ẩm', 'Trị mụn', 'Chống lão hóa', 'Làm sáng'] },
    ],
    results: [
      { type: 'dry', recommendation: 'Facial Organic + Serum HA' },
      { type: 'oily', recommendation: 'Liệu trình trị mụn 5 buổi' },
    ],
  },
  corporate: {
    plans: [
      { name: 'Startup', employees: '10–30', price: 15000000 },
      { name: 'Business', employees: '30–100', price: 45000000 },
      { name: 'Enterprise', employees: '100+', price: 'Liên hệ' },
    ],
  },
  shop: {
    items: [
      { name: 'Serum Vitamin C', price: 890000, category: 'Skincare' },
      { name: 'Tinh dầu Lavender', price: 350000, category: 'Aromatherapy' },
      { name: 'Mặt nạ Collagen', price: 120000, category: 'Mask' },
    ],
  },
  sustainability: {
    commitments: [
      { title: '100% bao bì tái chế', progress: 85 },
      { title: 'Giảm rác thải nhựa', progress: 72 },
      { title: 'Nguồn nguyên liệu hữu cơ', progress: 90 },
    ],
  },
  events: {
    items: [
      { title: 'Workshop Skincare', date: '2026-08-15', seats: 20 },
      { title: 'Yoga & Meditation', date: '2026-08-22', seats: 15 },
      { title: 'Detox Talk', date: '2026-09-05', seats: 30 },
    ],
  },
  referral: {
    leaderboard: [
      { name: 'Lan Anh', referrals: 12, reward: 2400000 },
      { name: 'Hoàng Nam', referrals: 8, reward: 1600000 },
    ],
    rewardPerReferral: 200000,
  },
  appDownload: {
    features: ['Đặt lịch nhanh', 'Tích điểm thành viên', 'Theo dõi liệu trình', 'Ưu đãi độc quyền'],
    platforms: ['iOS', 'Android'],
  },
  specialOccasions: {
    packages: [
      { name: 'Sinh nhật VIP', price: 2990000, guests: 4 },
      { name: 'Kỷ niệm cặp đôi', price: 3490000, guests: 2 },
      { name: 'Team building spa', price: 8900000, guests: 10 },
    ],
  },
  homeService: {
    services: [
      { name: 'Massage tại nhà', duration: '90 phút', price: 990000 },
      { name: 'Facial mobile', duration: '75 phút', price: 890000 },
    ],
    areas: ['Quận 1', 'Quận 3', 'Quận 7', 'Thủ Đức'],
  },
  skinDiary: {
    entries: [
      { date: '2026-07-01', mood: 'good', note: 'Da mịn hơn sau liệu trình' },
      { date: '2026-07-08', mood: 'normal', note: 'Hơi khô do thời tiết' },
    ],
    metrics: ['Độ ẩm', 'Mụn', 'Đỏ', 'Độ sáng'],
  },
  mindfulness: {
    programs: [
      { name: 'Thiền 7 ngày', sessions: 7, price: 1290000 },
      { name: 'Breathwork', sessions: 4, price: 790000 },
    ],
  },
  medicalSpa: {
    treatments: [
      { name: 'Laser trị mụn', sessions: 5, price: 5990000 },
      { name: 'Microneedling', sessions: 3, price: 4500000 },
    ],
  },
  spaEtiquette: {
    rules: [
      { title: 'Đến trước 15 phút', desc: 'Chuẩn bị thư giãn trước liệu trình' },
      { title: 'Tắt điện thoại', desc: 'Giữ không gian yên tĩnh' },
      { title: 'Thông báo tình trạng sức khỏe', desc: 'Để KTV điều chỉnh phù hợp' },
    ],
  },
  loyaltyRewards: {
    catalog: [
      { name: 'Giảm 200K', points: 500 },
      { name: 'Facial miễn phí', points: 2000 },
      { name: 'Spa Đôi tặng', points: 5000 },
    ],
    userPoints: 2450,
  },
  review: {
    items: [
      { name: 'Minh Anh', rating: 5, service: 'Facial Organic', comment: 'Dịch vụ tuyệt vời!' },
      { name: 'Thu Hà', rating: 5, service: 'Massage Thảo Dược', comment: 'Rất thư giãn' },
    ],
    averageRating: 4.9,
    totalReviews: 1284,
  },
  seasonalPackage: {
    items: [
      { name: 'Mùa hè xanh', season: 'Hè 2026', price: 2490000, discount: 20 },
      { name: 'Thu thanh lọc', season: 'Thu 2026', price: 3190000, discount: 15 },
    ],
  },
  nutrition: {
    plans: [
      { name: 'Detox 3 ngày', calories: 1200, price: 890000 },
      { name: 'Balance 7 ngày', calories: 1600, price: 1890000 },
    ],
  },
  consultation: {
    consultants: [
      { name: 'BS. Trần Lan', specialty: 'Da liễu', slots: ['09:00', '14:00'] },
      { name: 'CN. Phạm Hồng', specialty: 'Spa trị liệu', slots: ['10:00', '15:30'] },
    ],
  },
  vipRoom: {
    rooms: [
      { name: 'Emerald Suite', capacity: 2, price: 3500000 },
      { name: 'Jade Pavilion', capacity: 4, price: 5900000 },
    ],
  },
  packageBuilder: {
    steps: ['Chọn dịch vụ', 'Chọn add-on', 'Chọn thời gian', 'Xác nhận'],
    baseServices: spa2ServiceNames(),
  },
  appointment: {
    upcoming: [
      { id: 'APT-101', service: 'Facial Organic', date: '2026-07-20', time: '10:00', status: 'confirmed' },
    ],
    past: [
      { id: 'APT-098', service: 'Massage Thảo Dược', date: '2026-07-08', time: '14:00', status: 'completed' },
    ],
  },
  newsletter: {
    subscribers: 8420,
    topics: ['Skincare tips', 'Ưu đãi tháng', 'Sự kiện wellness'],
  },
  press: {
    coverage: [
      { outlet: 'Harper\'s Bazaar VN', title: 'Top 10 spa thiên nhiên', date: '2026-05-01' },
      { outlet: 'CafeF', title: 'Xu hướng wellness 2026', date: '2026-04-15' },
    ],
    awards: ['Best Natural Spa 2025', 'Green Business Award 2024'],
  },
  affiliate: {
    tiers: [
      { name: 'Bronze', commission: '5%', minSales: 0 },
      { name: 'Silver', commission: '8%', minSales: 10 },
      { name: 'Gold', commission: '12%', minSales: 30 },
    ],
  },
  spaFinder: {
    branches: [
      { name: 'Nature Spa Q1', distance: '1.2 km', rating: 4.9 },
      { name: 'Nature Spa Q7', distance: '5.8 km', rating: 4.8 },
    ],
  },
  spaMenu: {
    sections: [
      { name: 'Massage', items: ['Herbal Massage', 'Aromatherapy', 'Hot Stone'] },
      { name: 'Facial', items: ['Organic Facial', 'Anti-aging', 'Acne Care'] },
    ],
  },
  ingredientGuide: {
    items: [
      { name: 'Hyaluronic Acid', benefit: 'Cấp ẩm sâu', safe: true },
      { name: 'Retinol', benefit: 'Chống lão hóa', safe: false },
      { name: 'Niacinamide', benefit: 'Làm sáng da', safe: true },
    ],
  },
  skinSchool: {
    courses: [
      { title: 'Skincare cơ bản', lessons: 8, duration: '2 tuần' },
      { title: 'Anti-aging nâng cao', lessons: 12, duration: '1 tháng' },
    ],
  },
  therapistProfile: {
    therapists: [
      { name: 'Nguyễn Thảo Vy', specialty: 'Facial', experience: '8 năm', rating: 4.9 },
      { name: 'Trần Minh Khôi', specialty: 'Massage', experience: '10 năm', rating: 5.0 },
    ],
  },
  sleepWellness: {
    programs: [
      { name: 'Sleep Reset 5 ngày', price: 1590000 },
      { name: 'Deep Rest Package', price: 2890000 },
    ],
    tips: ['Tắt màn hình 1h trước ngủ', 'Massage cổ vai buổi tối', 'Tinh dầu lavender'],
  },
  prenatalSpa: {
    services: [
      { name: 'Prenatal Massage', duration: '60 phút', trimester: '2–3' },
      { name: 'Gentle Facial', duration: '45 phút', trimester: '1–3' },
    ],
  },
  wellnessAssessment: {
    questions: [
      { id: 1, question: 'Mức stress hàng ngày?', scale: '1-10' },
      { id: 2, question: 'Chất lượng giấc ngủ?', scale: '1-10' },
    ],
    categories: ['Stress', 'Sleep', 'Nutrition', 'Skin', 'Energy'],
  },
};

function spa2ServiceNames() {
  return ['Massage Thảo Dược', 'Facial Organic', 'Body Scrub & Wrap', 'Aromatherapy'];
}
