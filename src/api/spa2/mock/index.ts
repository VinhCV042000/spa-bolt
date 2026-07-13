import type { Spa2PageParams } from 'src/api/spa2/types';

import { SPA2_EXTENDED_MOCKS } from 'src/api/spa2/mock/extended-pages';

import { SPA2_IMAGES } from 'src/sections/spa2/spa2-data';
import {
  spa2Faqs,
  spa2Team,
  spa2Offers,
  spa2Gallery,
  spa2Careers,
  spa2Branches,
  spa2Partners,
  spa2Services,
  spa2Policies,
  spa2BlogPosts,
  spa2Feedbacks,
  spa2AboutStory,
  spa2Treatments,
  spa2Promotions,
  spa2ContactInfo,
  spa2Instructors,
  spa2BeforeAfters,
  spa2VisionMission,
  spa2Certifications,
  spa2BookingPackages,
  spa2PartnerProfiles,
  spa2TrainingPrograms,
} from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

export function getSpa2HomeMock() {
  return {
    hero: SPA2_IMAGES.hero,
    services: spa2Services.slice(0, 4),
    team: spa2Team.slice(0, 3),
    stats: [
      { label: 'Dịch vụ', value: spa2Services.length },
      { label: 'Chi nhánh', value: spa2Branches.length },
      { label: 'Đánh giá', value: spa2Feedbacks.length },
      { label: 'Bài viết', value: spa2BlogPosts.length },
    ],
  };
}

export function getSpa2AboutMock() {
  return {
    story: spa2AboutStory,
    visionMission: spa2VisionMission,
    team: spa2Team,
    certifications: spa2Certifications,
  };
}

export function getSpa2ServicesMock() {
  return { items: spa2Services };
}

export function getSpa2ServiceDetailsMock(params?: Spa2PageParams) {
  const service = spa2Services.find((item) => item.slug === params?.slug) ?? spa2Services[0];

  return {
    item: service,
    related: spa2Services.filter((item) => item.slug !== service.slug).slice(0, 3),
  };
}

export function getSpa2TrainingMock() {
  return {
    programs: spa2TrainingPrograms,
    instructors: spa2Instructors,
  };
}

export function getSpa2BlogMock() {
  return { items: spa2BlogPosts };
}

export function getSpa2BlogDetailsMock(params?: Spa2PageParams) {
  const post = spa2BlogPosts.find((item) => item.slug === params?.slug) ?? spa2BlogPosts[0];

  return {
    item: post,
    related: spa2BlogPosts.filter((item) => item.slug !== post.slug).slice(0, 3),
  };
}

export function getSpa2CareersMock() {
  return { items: spa2Careers };
}

export function getSpa2CareerDetailsMock(params?: Spa2PageParams) {
  const id = Number(params?.id);
  const career = spa2Careers.find((item) => item.id === id) ?? spa2Careers[0];

  return { item: career };
}

export function getSpa2BookingMock() {
  return { packages: spa2BookingPackages };
}

export function getSpa2ContactMock() {
  return spa2ContactInfo;
}

export function getSpa2OffersMock() {
  return { items: spa2Offers };
}

export function getSpa2FeedbackMock() {
  return { items: spa2Feedbacks };
}

export function getSpa2PromotionsMock() {
  return { items: spa2Promotions };
}

export function getSpa2BranchesMock() {
  return { items: spa2Branches };
}

export function getSpa2AccountMock() {
  return {
    profile: {
      name: 'Nguyễn Minh Anh',
      email: 'minhanh@email.com',
      phone: '0901 234 567',
      membership: 'Gold',
      points: 2450,
      visits: 18,
    },
    recentBookings: [
      { id: 'BK-001', service: 'Facial Organic', date: '2026-07-08', status: 'completed' },
      { id: 'BK-002', service: 'Massage Thảo Dược', date: '2026-06-22', status: 'completed' },
      { id: 'BK-003', service: 'Spa Đôi', date: '2026-07-20', status: 'upcoming' },
    ],
  };
}

export function getSpa2PartnersMock() {
  return {
    profiles: spa2PartnerProfiles,
    partners: spa2Partners,
  };
}

export function getSpa2TreatmentsMock() {
  return { items: spa2Treatments };
}

export function getSpa2BeforeAfterMock() {
  return { items: spa2BeforeAfters };
}

export function getSpa2FaqMock() {
  return { items: spa2Faqs };
}

export function getSpa2PolicyMock() {
  return { items: spa2Policies };
}

export function getSpa2GalleryMock() {
  return { items: spa2Gallery };
}

// ----------------------------------------------------------------------

const EXTENDED_MOCK_GETTERS: Record<string, (params?: Spa2PageParams) => unknown> = {
  membership: () => SPA2_EXTENDED_MOCKS.membership,
  'gift-card': () => SPA2_EXTENDED_MOCKS.giftCard,
  'wellness-package': () => SPA2_EXTENDED_MOCKS.wellnessPackage,
  'skin-quiz': () => SPA2_EXTENDED_MOCKS.skinQuiz,
  corporate: () => SPA2_EXTENDED_MOCKS.corporate,
  shop: () => SPA2_EXTENDED_MOCKS.shop,
  sustainability: () => SPA2_EXTENDED_MOCKS.sustainability,
  events: () => SPA2_EXTENDED_MOCKS.events,
  referral: () => SPA2_EXTENDED_MOCKS.referral,
  'app-download': () => SPA2_EXTENDED_MOCKS.appDownload,
  'special-occasions': () => SPA2_EXTENDED_MOCKS.specialOccasions,
  'home-service': () => SPA2_EXTENDED_MOCKS.homeService,
  'skin-diary': () => SPA2_EXTENDED_MOCKS.skinDiary,
  mindfulness: () => SPA2_EXTENDED_MOCKS.mindfulness,
  'medical-spa': () => SPA2_EXTENDED_MOCKS.medicalSpa,
  'spa-etiquette': () => SPA2_EXTENDED_MOCKS.spaEtiquette,
  'loyalty-rewards': () => SPA2_EXTENDED_MOCKS.loyaltyRewards,
  review: () => SPA2_EXTENDED_MOCKS.review,
  'seasonal-package': () => SPA2_EXTENDED_MOCKS.seasonalPackage,
  nutrition: () => SPA2_EXTENDED_MOCKS.nutrition,
  consultation: () => SPA2_EXTENDED_MOCKS.consultation,
  'vip-room': () => SPA2_EXTENDED_MOCKS.vipRoom,
  'package-builder': () => SPA2_EXTENDED_MOCKS.packageBuilder,
  appointment: () => SPA2_EXTENDED_MOCKS.appointment,
  newsletter: () => SPA2_EXTENDED_MOCKS.newsletter,
  press: () => SPA2_EXTENDED_MOCKS.press,
  affiliate: () => SPA2_EXTENDED_MOCKS.affiliate,
  'spa-finder': () => SPA2_EXTENDED_MOCKS.spaFinder,
  'spa-menu': () => SPA2_EXTENDED_MOCKS.spaMenu,
  'ingredient-guide': () => SPA2_EXTENDED_MOCKS.ingredientGuide,
  'skin-school': () => SPA2_EXTENDED_MOCKS.skinSchool,
  'therapist-profile': () => SPA2_EXTENDED_MOCKS.therapistProfile,
  'sleep-wellness': () => SPA2_EXTENDED_MOCKS.sleepWellness,
  'prenatal-spa': () => SPA2_EXTENDED_MOCKS.prenatalSpa,
  'wellness-assessment': () => SPA2_EXTENDED_MOCKS.wellnessAssessment,
};

export function getSpa2MockData(pageKey: string, params?: Spa2PageParams): unknown {
  switch (pageKey) {
    case 'home':
      return getSpa2HomeMock();
    case 'about':
      return getSpa2AboutMock();
    case 'services':
      return getSpa2ServicesMock();
    case 'service-details':
      return getSpa2ServiceDetailsMock(params);
    case 'training':
      return getSpa2TrainingMock();
    case 'blog':
      return getSpa2BlogMock();
    case 'blog-details':
      return getSpa2BlogDetailsMock(params);
    case 'careers':
      return getSpa2CareersMock();
    case 'career-details':
      return getSpa2CareerDetailsMock(params);
    case 'booking':
      return getSpa2BookingMock();
    case 'contact':
      return getSpa2ContactMock();
    case 'offers':
      return getSpa2OffersMock();
    case 'feedback':
      return getSpa2FeedbackMock();
    case 'promotions':
      return getSpa2PromotionsMock();
    case 'branches':
      return getSpa2BranchesMock();
    case 'account':
      return getSpa2AccountMock();
    case 'partners':
      return getSpa2PartnersMock();
    case 'treatments':
      return getSpa2TreatmentsMock();
    case 'before-after':
      return getSpa2BeforeAfterMock();
    case 'faq':
      return getSpa2FaqMock();
    case 'policy':
      return getSpa2PolicyMock();
    case 'gallery':
      return getSpa2GalleryMock();
    default:
      return EXTENDED_MOCK_GETTERS[pageKey]?.(params) ?? { items: [] };
  }
}
