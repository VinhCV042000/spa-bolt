import type { Spa2ManageConfig } from './spa2-generic-manage-view';

// ─────────────────────────────────────────────────────────────────────────────
// Reusable status presets
const S_PUB = [
  { value: 'Bản nháp', color: 'default' as const },
  { value: 'Đang hiển thị', color: 'success' as const },
  { value: 'Ẩn', color: 'warning' as const },
];
const S_APV = [
  { value: 'Chờ duyệt', color: 'warning' as const },
  { value: 'Đã duyệt', color: 'success' as const },
  { value: 'Từ chối', color: 'error' as const },
];
const S_ORDER = [
  { value: 'Mới', color: 'info' as const },
  { value: 'Đang xử lý', color: 'warning' as const },
  { value: 'Hoàn tất', color: 'success' as const },
  { value: 'Đã huỷ', color: 'error' as const },
];

const img = (seed: string) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=400&q=60`;

// ─────────────────────────────────────────────────────────────────────────────

// NOTE: 'membership' / 'gift-card' / 'wellness-package' / 'skin-quiz' /
// 'corporate' / 'shop' / 'sustainability' / 'events' / 'referral' /
// 'app-download' / 'special-occasions' / 'home-service' / 'skin-diary' /
// 'mindfulness' / 'medical-spa' / 'spa-etiquette' / 'loyalty-rewards' /
// 'review' / 'seasonal-package' / 'nutrition' / 'consultation' /
// 'vip-room' / 'package-builder' / 'appointment' / 'newsletter' / 'press' /
// 'affiliate' / 'spa-finder' / 'spa-menu' / 'ingredient-guide' /
// 'skin-school' / 'therapist-profile' / 'sleep-wellness' / 'video-guide' /
// 'price-list' / 'wait-list' used to be
// generic flat-table configs here, but now have bespoke manage views (see
// spa2-membership-manage-view.tsx / spa2-gift-card-manage-view.tsx /
// spa2-wellness-package-manage-view.tsx / spa2-skin-quiz-manage-view.tsx /
// spa2-corporate-manage-view.tsx / spa2-shop-manage-view.tsx /
// spa2-sustainability-manage-view.tsx / spa2-events-manage-view.tsx /
// spa2-referral-manage-view.tsx / spa2-app-download-manage-view.tsx /
// spa2-special-occasions-manage-view.tsx / spa2-home-service-manage-view.tsx /
// spa2-skin-diary-manage-view.tsx / spa2-mindfulness-manage-view.tsx /
// spa2-medical-spa-manage-view.tsx / spa2-spa-etiquette-manage-view.tsx /
// spa2-loyalty-rewards-manage-view.tsx / spa2-review-manage-view.tsx /
// spa2-seasonal-package-manage-view.tsx / spa2-nutrition-manage-view.tsx /
// spa2-consultation-manage-view.tsx / spa2-vip-room-manage-view.tsx /
// spa2-package-builder-manage-view.tsx / spa2-appointment-manage-view.tsx /
// spa2-newsletter-manage-view.tsx / spa2-press-manage-view.tsx /
// spa2-affiliate-manage-view.tsx / spa2-spa-finder-manage-view.tsx /
// spa2-spa-menu-manage-view.tsx / spa2-ingredient-guide-manage-view.tsx /
// spa2-skin-school-manage-view.tsx / spa2-therapist-profile-manage-view.tsx /
// spa2-sleep-wellness-manage-view.tsx / spa2-prenatal-spa-manage-view.tsx /
// spa2-wellness-assessment-manage-view.tsx / spa2-franchise-manage-view.tsx /
// spa2-group-booking-manage-view.tsx / spa2-certificate-wall-manage-view.tsx /
// spa2-video-guide-manage-view.tsx / spa2-price-list-manage-view.tsx /
// spa2-wait-list-manage-view.tsx)
// that share their catalog data with the public pages via src/_mock/_spa2 -
// so they were removed from this map.

export const SPA2_MANAGE_CONFIGS: Record<string, Spa2ManageConfig> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // Remaining generic flat-table management pages: voucher-check · accessibility
  // ─────────────────────────────────────────────────────────────────────────────

  'voucher-check': {
    title: 'Quản lý Voucher & Thẻ quà tặng',
    breadcrumbLabel: 'Voucher & Thẻ quà',
    addLabel: 'Tạo voucher mới',
    publicPath: '/spa2/voucher-check',
    fields: [
      { key: 'code', label: 'Mã voucher', type: 'text', required: true },
      {
        key: 'type',
        label: 'Loại',
        type: 'select',
        options: [
          'Voucher dịch vụ',
          'Thẻ quà tặng',
          'Voucher giảm giá',
          'Voucher sinh nhật',
          'Voucher doanh nghiệp',
        ],
      },
      { key: 'value', label: 'Mệnh giá (VND)', type: 'number' },
      { key: 'balance', label: 'Số dư còn lại (VND)', type: 'number' },
      { key: 'expiry', label: 'Ngày hết hạn', type: 'date' },
      { key: 'issuedTo', label: 'Cấp cho', type: 'text' },
      { key: 'note', label: 'Ghi chú', type: 'textarea', showInTable: false },
    ],
    statuses: [
      { value: 'Còn hiệu lực', color: 'success' as const },
      { value: 'Đã dùng hết', color: 'default' as const },
      { value: 'Hết hạn', color: 'error' as const },
      { value: 'Đã thu hồi', color: 'warning' as const },
    ],
    seed: [
      {
        code: 'VCH-2026-001',
        type: 'Voucher dịch vụ',
        value: 500000,
        balance: 500000,
        expiry: '2027-06-30',
        issuedTo: 'Anna Nguyen',
        note: 'Tặng thành viên VIP',
        status: 'Còn hiệu lực',
      },
      {
        code: 'GIFT-BDAY-002',
        type: 'Voucher sinh nhật',
        value: 300000,
        balance: 300000,
        expiry: '2026-09-01',
        issuedTo: 'Minh Tran',
        note: 'Sinh nhật tháng 9',
        status: 'Còn hiệu lực',
      },
      {
        code: 'VCH-SALE-003',
        type: 'Voucher giảm giá',
        value: 200000,
        balance: 0,
        expiry: '2026-06-30',
        issuedTo: 'July Le',
        note: 'Flash sale tháng 6',
        status: 'Đã dùng hết',
      },
      {
        code: 'GIFTCARD-FPT',
        type: 'Voucher doanh nghiệp',
        value: 1000000,
        balance: 350000,
        expiry: '2025-12-31',
        issuedTo: 'Group FPT Software',
        note: 'Tặng nhân viên xuất sắc Q4',
        status: 'Hết hạn',
      },
    ],
  },

  accessibility: {
    title: 'Quản lý Tính năng Tiếp cận',
    breadcrumbLabel: 'Accessibility',
    addLabel: 'Thêm tính năng',
    publicPath: '/spa2/accessibility',
    fields: [
      { key: 'feature', label: 'Tính năng', type: 'text', required: true },
      {
        key: 'category',
        label: 'Nhóm',
        type: 'select',
        options: ['Vận động', 'Thị giác', 'Thính giác', 'Nhận thức', 'Hỗ trợ đặc biệt'],
      },
      { key: 'availability', label: 'Có tại', type: 'text' },
      { key: 'order', label: 'Thứ tự hiển thị', type: 'number', showInTable: false },
      { key: 'description', label: 'Mô tả chi tiết', type: 'textarea', showInTable: false },
    ],
    statuses: [
      { value: 'Đang cung cấp', color: 'success' as const },
      { value: 'Đang nâng cấp', color: 'warning' as const },
      { value: 'Tạm dừng', color: 'default' as const },
    ],
    seed: [
      {
        feature: 'Lối vào xe lăn',
        category: 'Vận động',
        availability: 'Tất cả chi nhánh',
        order: 1,
        description:
          'Toàn bộ khu vực không bậc thềm, đường dốc nhẹ dẫn vào, thang máy tại 2 chi nhánh nhiều tầng.',
        status: 'Đang cung cấp',
      },
      {
        feature: 'Giường massage điều chỉnh chiều cao',
        category: 'Vận động',
        availability: 'Tất cả chi nhánh',
        order: 2,
        description: 'Giường hạ/nâng điện tử từ 30–90 cm, phù hợp người khuyết tật vận động.',
        status: 'Đang cung cấp',
      },
      {
        feature: 'Hướng dẫn chữ nổi Braille',
        category: 'Thị giác',
        availability: 'Quận 1, Thảo Điền',
        order: 3,
        description: 'Menu dịch vụ và biển chỉ dẫn phòng có phiên bản chữ nổi Braille.',
        status: 'Đang nâng cấp',
      },
      {
        feature: 'Đồng hồ rung nhắc giờ liệu trình',
        category: 'Thính giác',
        availability: 'Tất cả chi nhánh',
        order: 4,
        description: 'Đồng hồ rung không dây cho khách khiếm thính, nhắc giờ bắt đầu và kết thúc.',
        status: 'Đang cung cấp',
      },
      {
        feature: 'Nhân viên hỗ trợ đặc biệt',
        category: 'Hỗ trợ đặc biệt',
        availability: 'Theo yêu cầu (đặt trước 48h)',
        order: 5,
        description: 'Đội ngũ được đào tạo chuyên sâu về hỗ trợ khách có nhu cầu đặc biệt.',
        status: 'Đang cung cấp',
      },
    ],
  },
};
