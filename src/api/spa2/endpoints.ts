import type { Spa2PageParams } from './types';

// ----------------------------------------------------------------------

const SPA2_API = '/api/spa2';

export const spa2Endpoints = {
  home: `${SPA2_API}/home`,
  about: `${SPA2_API}/about`,
  services: `${SPA2_API}/services`,
  serviceDetails: (slug: string) => `${SPA2_API}/services/${slug}`,
  training: `${SPA2_API}/training`,
  blog: `${SPA2_API}/blog`,
  blogDetails: (slug: string) => `${SPA2_API}/blog/${slug}`,
  careers: `${SPA2_API}/careers`,
  careerDetails: (id: string) => `${SPA2_API}/careers/${id}`,
  booking: `${SPA2_API}/booking`,
  contact: `${SPA2_API}/contact`,
  offers: `${SPA2_API}/offers`,
  feedback: `${SPA2_API}/feedback`,
  promotions: `${SPA2_API}/promotions`,
  branches: `${SPA2_API}/branches`,
  account: `${SPA2_API}/account`,
  partners: `${SPA2_API}/partners`,
  treatments: `${SPA2_API}/treatments`,
  beforeAfter: `${SPA2_API}/before-after`,
  faq: `${SPA2_API}/faq`,
  policy: `${SPA2_API}/policy`,
  gallery: `${SPA2_API}/gallery`,
  membership: `${SPA2_API}/membership`,
  giftCard: `${SPA2_API}/gift-card`,
  wellnessPackage: `${SPA2_API}/wellness-package`,
  skinQuiz: `${SPA2_API}/skin-quiz`,
  corporate: `${SPA2_API}/corporate`,
  shop: `${SPA2_API}/shop`,
  sustainability: `${SPA2_API}/sustainability`,
  events: `${SPA2_API}/events`,
  referral: `${SPA2_API}/referral`,
  appDownload: `${SPA2_API}/app-download`,
  specialOccasions: `${SPA2_API}/special-occasions`,
  homeService: `${SPA2_API}/home-service`,
  skinDiary: `${SPA2_API}/skin-diary`,
  mindfulness: `${SPA2_API}/mindfulness`,
  medicalSpa: `${SPA2_API}/medical-spa`,
  spaEtiquette: `${SPA2_API}/spa-etiquette`,
  loyaltyRewards: `${SPA2_API}/loyalty-rewards`,
  review: `${SPA2_API}/review`,
  seasonalPackage: `${SPA2_API}/seasonal-package`,
  nutrition: `${SPA2_API}/nutrition`,
  consultation: `${SPA2_API}/consultation`,
  vipRoom: `${SPA2_API}/vip-room`,
  packageBuilder: `${SPA2_API}/package-builder`,
  appointment: `${SPA2_API}/appointment`,
  newsletter: `${SPA2_API}/newsletter`,
  press: `${SPA2_API}/press`,
  affiliate: `${SPA2_API}/affiliate`,
  spaFinder: `${SPA2_API}/spa-finder`,
  spaMenu: `${SPA2_API}/spa-menu`,
  ingredientGuide: `${SPA2_API}/ingredient-guide`,
  skinSchool: `${SPA2_API}/skin-school`,
  therapistProfile: `${SPA2_API}/therapist-profile`,
  sleepWellness: `${SPA2_API}/sleep-wellness`,
  prenatalSpa: `${SPA2_API}/prenatal-spa`,
  wellnessAssessment: `${SPA2_API}/wellness-assessment`,
};

export function getSpa2Endpoint(key: string, params?: Spa2PageParams): string {
  switch (key) {
    case 'service-details':
      return spa2Endpoints.serviceDetails(params?.slug ?? '');
    case 'blog-details':
      return spa2Endpoints.blogDetails(params?.slug ?? '');
    case 'career-details':
      return spa2Endpoints.careerDetails(params?.id ?? '');
    default:
      return `${SPA2_API}/${key === 'home' ? 'home' : key}`;
  }
}
