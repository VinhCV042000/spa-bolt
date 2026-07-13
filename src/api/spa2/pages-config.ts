import { paths } from 'src/routes/paths';

import { getSpa2MockData } from './mock';
import { getSpa2Endpoint } from './endpoints';

import type { Spa2PageKey, Spa2PageConfig, Spa2PageParams } from './types';

// ----------------------------------------------------------------------

function publicPath(key: Spa2PageKey, params?: Spa2PageParams): string {
  switch (key) {
    case 'home':
      return paths.spa2.root;
    case 'about':
      return paths.spa2.about;
    case 'services':
      return paths.spa2.services;
    case 'service-details':
      return paths.spa2.serviceDetails(params?.slug ?? 'herbal-massage');
    case 'training':
      return paths.spa2.training;
    case 'blog':
      return paths.spa2.blog;
    case 'blog-details':
      return paths.spa2.blogDetails(params?.slug ?? 'skincare-tips');
    case 'careers':
      return paths.spa2.careers;
    case 'career-details':
      return paths.spa2.careerDetails(Number(params?.id ?? 1));
    case 'booking':
      return paths.spa2.booking;
    case 'contact':
      return paths.spa2.contact;
    case 'offers':
      return paths.spa2.offers;
    case 'feedback':
      return paths.spa2.feedback;
    case 'promotions':
      return paths.spa2.promotions;
    case 'branches':
      return paths.spa2.branches;
    case 'account':
      return paths.spa2.account;
    case 'partners':
      return paths.spa2.partners;
    case 'treatments':
      return paths.spa2.treatments;
    case 'before-after':
      return paths.spa2.beforeAfter;
    case 'faq':
      return paths.spa2.faq;
    case 'policy':
      return paths.spa2.policy;
    case 'gallery':
      return paths.spa2.gallery;
    case 'membership':
      return paths.spa2.membership;
    case 'gift-card':
      return paths.spa2.giftCard;
    case 'wellness-package':
      return paths.spa2.wellnessPackage;
    case 'skin-quiz':
      return paths.spa2.skinQuiz;
    case 'corporate':
      return paths.spa2.corporate;
    case 'shop':
      return paths.spa2.shop;
    case 'sustainability':
      return paths.spa2.sustainability;
    case 'events':
      return paths.spa2.events;
    case 'referral':
      return paths.spa2.referral;
    case 'app-download':
      return paths.spa2.appDownload;
    case 'special-occasions':
      return paths.spa2.specialOccasions;
    case 'home-service':
      return paths.spa2.homeService;
    case 'skin-diary':
      return paths.spa2.skinDiary;
    case 'mindfulness':
      return paths.spa2.mindfulness;
    case 'medical-spa':
      return paths.spa2.medicalSpa;
    case 'spa-etiquette':
      return paths.spa2.spaEtiquette;
    case 'loyalty-rewards':
      return paths.spa2.loyaltyRewards;
    case 'review':
      return paths.spa2.review;
    case 'seasonal-package':
      return paths.spa2.seasonalPackage;
    case 'nutrition':
      return paths.spa2.nutrition;
    case 'consultation':
      return paths.spa2.consultation;
    case 'vip-room':
      return paths.spa2.vipRoom;
    case 'package-builder':
      return paths.spa2.packageBuilder;
    case 'appointment':
      return paths.spa2.appointment;
    case 'newsletter':
      return paths.spa2.newsletter;
    case 'press':
      return paths.spa2.press;
    case 'affiliate':
      return paths.spa2.affiliate;
    case 'spa-finder':
      return paths.spa2.spaFinder;
    case 'spa-menu':
      return paths.spa2.spaMenu;
    case 'ingredient-guide':
      return paths.spa2.ingredientGuide;
    case 'skin-school':
      return paths.spa2.skinSchool;
    case 'therapist-profile':
      return paths.spa2.therapistProfile;
    case 'sleep-wellness':
      return paths.spa2.sleepWellness;
    case 'prenatal-spa':
      return paths.spa2.prenatalSpa;
    case 'wellness-assessment':
      return paths.spa2.wellnessAssessment;

    default:
      return `${paths.spa2.root}/${key}`;
  }
}

function definePage(key: Spa2PageKey, title: string, description?: string): Spa2PageConfig {
  return {
    key,
    title,
    description,
    endpoint: (params) => getSpa2Endpoint(key, params),
    getMockData: (params) => getSpa2MockData(key, params),
    publicPath: (params) => publicPath(key, params),
  };
}

// ----------------------------------------------------------------------

export const SPA2_PAGE_CONFIGS: Record<Spa2PageKey, Spa2PageConfig> = {
  home: definePage('home', 'Tổng quan', 'Dashboard quản lý trang chủ Nature Spa'),
  about: definePage('about', 'Giới thiệu'),
  services: definePage('services', 'Dịch vụ'),
  'service-details': definePage('service-details', 'Chi tiết dịch vụ'),
  training: definePage('training', 'Đào tạo'),
  blog: definePage('blog', 'Blog'),
  'blog-details': definePage('blog-details', 'Chi tiết bài viết'),
  careers: definePage('careers', 'Tuyển dụng'),
  'career-details': definePage('career-details', 'Chi tiết tuyển dụng'),
  booking: definePage('booking', 'Đặt lịch'),
  contact: definePage('contact', 'Liên hệ'),
  offers: definePage('offers', 'Ưu đãi'),
  feedback: definePage('feedback', 'Phản hồi'),
  promotions: definePage('promotions', 'Khuyến mãi'),
  branches: definePage('branches', 'Chi nhánh'),
  account: definePage('account', 'Tài khoản'),
  partners: definePage('partners', 'Đối tác'),
  treatments: definePage('treatments', 'Liệu trình'),
  'before-after': definePage('before-after', 'Before / After'),
  faq: definePage('faq', 'FAQ'),
  policy: definePage('policy', 'Chính sách'),
  gallery: definePage('gallery', 'Thư viện ảnh'),
  membership: definePage('membership', 'Thành viên'),
  'gift-card': definePage('gift-card', 'Thẻ quà tặng'),
  'wellness-package': definePage('wellness-package', 'Gói wellness'),
  'skin-quiz': definePage('skin-quiz', 'Quiz da'),
  corporate: definePage('corporate', 'Doanh nghiệp'),
  shop: definePage('shop', 'Cửa hàng'),
  sustainability: definePage('sustainability', 'Bền vững'),
  events: definePage('events', 'Sự kiện'),
  referral: definePage('referral', 'Giới thiệu bạn bè'),
  'app-download': definePage('app-download', 'Tải app'),
  'special-occasions': definePage('special-occasions', 'Dịp đặc biệt'),
  'home-service': definePage('home-service', 'Spa tại nhà'),
  'skin-diary': definePage('skin-diary', 'Nhật ký da'),
  mindfulness: definePage('mindfulness', 'Mindfulness'),
  'medical-spa': definePage('medical-spa', 'Medical Spa'),
  'spa-etiquette': definePage('spa-etiquette', 'Quy tắc spa'),
  'loyalty-rewards': definePage('loyalty-rewards', 'Điểm thưởng'),
  review: definePage('review', 'Đánh giá'),
  'seasonal-package': definePage('seasonal-package', 'Gói theo mùa'),
  nutrition: definePage('nutrition', 'Dinh dưỡng'),
  consultation: definePage('consultation', 'Tư vấn'),
  'vip-room': definePage('vip-room', 'Phòng VIP'),
  'package-builder': definePage('package-builder', 'Tạo gói'),
  appointment: definePage('appointment', 'Lịch hẹn'),
  newsletter: definePage('newsletter', 'Newsletter'),
  press: definePage('press', 'Báo chí'),
  affiliate: definePage('affiliate', 'Affiliate'),
  'spa-finder': definePage('spa-finder', 'Tìm spa'),
  'spa-menu': definePage('spa-menu', 'Menu spa'),
  'ingredient-guide': definePage('ingredient-guide', 'Thành phần'),
  'skin-school': definePage('skin-school', 'Trường da'),
  'therapist-profile': definePage('therapist-profile', 'KTV'),
  'sleep-wellness': definePage('sleep-wellness', 'Giấc ngủ'),
  'prenatal-spa': definePage('prenatal-spa', 'Spa bầu'),
  'wellness-assessment': definePage('wellness-assessment', 'Đánh giá wellness'),
};

export function getSpa2PageConfig(pageKey: Spa2PageKey): Spa2PageConfig {
  return SPA2_PAGE_CONFIGS[pageKey];
}

export const SPA2_PAGE_KEYS = Object.keys(SPA2_PAGE_CONFIGS) as Spa2PageKey[];
