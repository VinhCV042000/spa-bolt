import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
// spa2 public-site navigation.
//
// Unlike the generic `useSpaNavData()` (src/layouts/config-nav-spa.tsx),
// which is shared by every spa1/spa3-28 demo variant, this hook is specific
// to spa2 and covers every page under `paths.spa2.*` so it is reachable
// from in-site navigation instead of only via direct URL entry.
// ----------------------------------------------------------------------

export function useSpa2NavData() {
  return [
    {
      title: 'Trang chủ',
      path: paths.spa2.root,
      icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
    },
    {
      title: 'Dịch vụ & Liệu trình',
      path: paths.spa2.services,
      icon: <Iconify width={22} icon="solar:leaf-bold-duotone" />,
      children: [
        {
          subheader: 'Dịch vụ chính',
          items: [
            { title: 'Tất cả dịch vụ', path: paths.spa2.services },
            { title: 'Liệu trình', path: paths.spa2.treatments },
            { title: 'Thực đơn dịch vụ', path: paths.spa2.spaMenu },
            { title: 'Tạo gói dịch vụ', path: paths.spa2.packageBuilder },
            { title: 'Tư vấn', path: paths.spa2.consultation },
            { title: 'Phòng VIP', path: paths.spa2.vipRoom },
          ],
        },
        {
          subheader: 'Liệu trình chuyên biệt',
          items: [
            { title: 'Medical Spa', path: paths.spa2.medicalSpa },
            { title: 'Chống lão hóa', path: paths.spa2.antiAging },
            { title: 'Trị liệu nước', path: paths.spa2.waterTherapy },
            { title: 'Ayurveda', path: paths.spa2.ayurveda },
            { title: 'Spa cho bà bầu', path: paths.spa2.prenatalSpa },
            { title: 'Spa nam giới', path: paths.spa2.menSpa },
            { title: 'Tóc & Làm đẹp', path: paths.spa2.hairBeauty },
            { title: 'Spa trẻ em', path: paths.spa2.kidsSpa },
            { title: 'Giấc ngủ', path: paths.spa2.sleepWellness },
            { title: 'Mindfulness', path: paths.spa2.mindfulness },
            { title: 'Dinh dưỡng', path: paths.spa2.nutrition },
          ],
        },
      ],
    },
    {
      title: 'Về chúng tôi',
      path: paths.spa2.about,
      icon: <Iconify width={22} icon="solar:info-circle-bold-duotone" />,
      children: [
        {
          subheader: 'Giới thiệu',
          items: [
            { title: 'Giới thiệu', path: paths.spa2.about },
            { title: 'Đào tạo', path: paths.spa2.training },
            { title: 'Đội ngũ chuyên viên', path: paths.spa2.therapistProfile },
            { title: 'Chứng nhận', path: paths.spa2.certificateWall },
            { title: 'Chi nhánh', path: paths.spa2.branches },
            { title: 'Spa khách sạn', path: paths.spa2.spaHotel },
            { title: 'Phát triển bền vững', path: paths.spa2.sustainability },
            { title: 'Thư viện ảnh', path: paths.spa2.gallery },
          ],
        },
        {
          subheader: 'Kết nối',
          items: [
            { title: 'Tuyển dụng', path: paths.spa2.careers },
            { title: 'Cộng đồng', path: paths.spa2.community },
          ],
        },
      ],
    },
    {
      title: 'Chương trình & Ưu đãi',
      path: paths.spa2.offers,
      icon: <Iconify width={22} icon="solar:tag-price-bold-duotone" />,
      children: [
        {
          subheader: 'Ưu đãi & khuyến mãi',
          items: [
            { title: 'Ưu đãi', path: paths.spa2.offers },
            { title: 'Khuyến mãi', path: paths.spa2.promotions },
            { title: 'Gói theo mùa', path: paths.spa2.seasonalPackage },
            { title: 'Gói wellness', path: paths.spa2.wellnessPackage },
            { title: 'Thẻ quà tặng', path: paths.spa2.giftCard },
            { title: 'Kiểm tra voucher', path: paths.spa2.voucherCheck },
            { title: 'Dịp đặc biệt', path: paths.spa2.specialOccasions },
          ],
        },
        {
          subheader: 'Hội viên & tích điểm',
          items: [
            { title: 'Chương trình hội viên', path: paths.spa2.membership },
            { title: 'Khách hàng thân thiết', path: paths.spa2.loyaltyRewards },
            { title: 'Giới thiệu bạn bè', path: paths.spa2.referral },
            { title: 'Chương trình Affiliate', path: paths.spa2.affiliate },
          ],
        },
        {
          subheader: 'Doanh nghiệp & nhóm',
          items: [
            { title: 'Dịch vụ doanh nghiệp', path: paths.spa2.corporate },
            { title: 'Nhượng quyền', path: paths.spa2.franchise },
            { title: 'Đặt lịch nhóm', path: paths.spa2.groupBooking },
            { title: 'Spa tại nhà', path: paths.spa2.homeService },
          ],
        },
      ],
    },
    {
      title: 'Cộng đồng & Kiến thức',
      path: paths.spa2.blog,
      icon: <Iconify width={22} icon="solar:gallery-wide-bold-duotone" />,
      children: [
        {
          subheader: 'Blog & truyền thông',
          items: [
            { title: 'Blog', path: paths.spa2.blog },
            { title: 'Video hướng dẫn', path: paths.spa2.videoGuide },
            { title: 'Báo chí', path: paths.spa2.press },
            { title: 'Đăng ký bản tin', path: paths.spa2.newsletter },
            { title: 'Tải ứng dụng', path: paths.spa2.appDownload },
          ],
        },
        {
          subheader: 'Khám phá bản thân',
          items: [
            { title: 'Trắc nghiệm loại da', path: paths.spa2.skinQuiz },
            { title: 'Trường học về da', path: paths.spa2.skinSchool },
            { title: 'Nhật ký làn da', path: paths.spa2.skinDiary },
            { title: 'Hướng dẫn thành phần', path: paths.spa2.ingredientGuide },
            { title: 'Đánh giá wellness', path: paths.spa2.wellnessAssessment },
            { title: 'Tìm chuyên viên phù hợp', path: paths.spa2.spaFinder },
            { title: 'Quy tắc ứng xử tại spa', path: paths.spa2.spaEtiquette },
          ],
        },
      ],
    },
    {
      title: 'Hỗ trợ khách hàng',
      path: paths.spa2.contact,
      icon: <Iconify width={22} icon="solar:question-circle-bold-duotone" />,
      children: [
        {
          subheader: 'Hỗ trợ',
          items: [
            { title: 'Câu hỏi thường gặp', path: paths.spa2.faq },
            { title: 'Chính sách', path: paths.spa2.policy },
            { title: 'Liên hệ', path: paths.spa2.contact },
            { title: 'Hỗ trợ người khuyết tật', path: paths.spa2.accessibility },
            { title: 'Bảng giá', path: paths.spa2.priceList },
            { title: 'Danh sách chờ', path: paths.spa2.waitList },
            { title: 'Góp ý', path: paths.spa2.feedback },
            { title: 'Đánh giá khách hàng', path: paths.spa2.review },
            { title: 'Trước & Sau', path: paths.spa2.beforeAfter },
          ],
        },
        {
          subheader: 'Tài khoản & đặt lịch',
          items: [
            { title: 'Đặt lịch', path: paths.spa2.booking },
            { title: 'Lịch hẹn của tôi', path: paths.spa2.appointment },
            { title: 'Tài khoản', path: paths.spa2.account },
            { title: 'Đối tác', path: paths.spa2.partners },
            { title: 'Cửa hàng', path: paths.spa2.shop },
            { title: 'Sự kiện', path: paths.spa2.events },
          ],
        },
      ],
    },
    {
      title: 'Đặt lịch',
      path: paths.spa2.booking,
      icon: <Iconify width={22} icon="solar:calendar-add-bold-duotone" />,
    },
  ];
}
