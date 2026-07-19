import type { Spa2PageKey } from 'src/api/spa2/types';

import { lazy } from 'react';

import { createDashboardSpa2Page } from 'src/sections/dashboard/spa2/create-dashboard-spa2-page';

// ----------------------------------------------------------------------

function lazySpa2Page(pageKey: Spa2PageKey) {
  return lazy(async () => ({ default: createDashboardSpa2Page(pageKey) }));
}

// Management pages (CRUD admin views under src/pages/dashboard/manage/spa2)
const ManageSpa2ServicesPage = lazy(() => import('src/pages/dashboard/manage/spa2/services'));
const ManageSpa2TrainingPage = lazy(() => import('src/pages/dashboard/manage/spa2/training'));
const ManageSpa2BlogPage = lazy(() => import('src/pages/dashboard/manage/spa2/blog'));
const ManageSpa2CareersPage = lazy(() => import('src/pages/dashboard/manage/spa2/careers'));
const ManageSpa2BookingsPage = lazy(() => import('src/pages/dashboard/manage/spa2/bookings'));
const ManageSpa2OffersPage = lazy(() => import('src/pages/dashboard/manage/spa2/offers'));
const ManageSpa2FeedbacksPage = lazy(() => import('src/pages/dashboard/manage/spa2/feedbacks'));
const ManageSpa2PromotionsPage = lazy(() => import('src/pages/dashboard/manage/spa2/promotions'));
const ManageSpa2BranchesPage = lazy(() => import('src/pages/dashboard/manage/spa2/branches'));
const ManageSpa2PartnersPage = lazy(() => import('src/pages/dashboard/manage/spa2/partners'));
const ManageSpa2TreatmentsPage = lazy(() => import('src/pages/dashboard/manage/spa2/treatments'));
const ManageSpa2BeforeAfterPage = lazy(
  () => import('src/pages/dashboard/manage/spa2/before-after')
);
const ManageSpa2FaqPage = lazy(() => import('src/pages/dashboard/manage/spa2/faq'));
const ManageSpa2GalleryPage = lazy(() => import('src/pages/dashboard/manage/spa2/gallery'));

// Extended management pages
const ManageSpa2PolicyPage = lazy(() => import('src/pages/dashboard/manage/spa2/policy'));
const ManageSpa2MembershipPage = lazy(() => import('src/pages/dashboard/manage/spa2/membership'));
const ManageSpa2GiftCardPage = lazy(() => import('src/pages/dashboard/manage/spa2/gift-card'));
const ManageSpa2WellnessPackagePage = lazy(() => import('src/pages/dashboard/manage/spa2/wellness-package'));
const ManageSpa2SkinQuizPage = lazy(() => import('src/pages/dashboard/manage/spa2/skin-quiz'));
const ManageSpa2CorporatePage = lazy(() => import('src/pages/dashboard/manage/spa2/corporate'));
const ManageSpa2ShopPage = lazy(() => import('src/pages/dashboard/manage/spa2/shop'));
const ManageSpa2SustainabilityPage = lazy(() => import('src/pages/dashboard/manage/spa2/sustainability'));
const ManageSpa2EventsPage = lazy(() => import('src/pages/dashboard/manage/spa2/events'));
const ManageSpa2ReferralPage = lazy(() => import('src/pages/dashboard/manage/spa2/referral'));
const ManageSpa2AppDownloadPage = lazy(() => import('src/pages/dashboard/manage/spa2/app-download'));
const ManageSpa2SpecialOccasionsPage = lazy(() => import('src/pages/dashboard/manage/spa2/special-occasions'));
const ManageSpa2HomeServicePage = lazy(() => import('src/pages/dashboard/manage/spa2/home-service'));
const ManageSpa2SkinDiaryPage = lazy(() => import('src/pages/dashboard/manage/spa2/skin-diary'));
const ManageSpa2MindfulnessPage = lazy(() => import('src/pages/dashboard/manage/spa2/mindfulness'));
const ManageSpa2MedicalSpaPage = lazy(() => import('src/pages/dashboard/manage/spa2/medical-spa'));
const ManageSpa2SpaEtiquettePage = lazy(() => import('src/pages/dashboard/manage/spa2/spa-etiquette'));
const ManageSpa2LoyaltyRewardsPage = lazy(() => import('src/pages/dashboard/manage/spa2/loyalty-rewards'));
const ManageSpa2ReviewPage = lazy(() => import('src/pages/dashboard/manage/spa2/review'));
const ManageSpa2SeasonalPackagePage = lazy(() => import('src/pages/dashboard/manage/spa2/seasonal-package'));
const ManageSpa2NutritionPage = lazy(() => import('src/pages/dashboard/manage/spa2/nutrition'));
const ManageSpa2ConsultationPage = lazy(() => import('src/pages/dashboard/manage/spa2/consultation'));
const ManageSpa2VipRoomPage = lazy(() => import('src/pages/dashboard/manage/spa2/vip-room'));
const ManageSpa2PackageBuilderPage = lazy(() => import('src/pages/dashboard/manage/spa2/package-builder'));
const ManageSpa2AppointmentPage = lazy(() => import('src/pages/dashboard/manage/spa2/appointment'));
const ManageSpa2NewsletterPage = lazy(() => import('src/pages/dashboard/manage/spa2/newsletter'));
const ManageSpa2PressPage = lazy(() => import('src/pages/dashboard/manage/spa2/press'));
const ManageSpa2AffiliatePage = lazy(() => import('src/pages/dashboard/manage/spa2/affiliate'));
const ManageSpa2SpaFinderPage = lazy(() => import('src/pages/dashboard/manage/spa2/spa-finder'));
const ManageSpa2SpaMenuPage = lazy(() => import('src/pages/dashboard/manage/spa2/spa-menu'));
const ManageSpa2IngredientGuidePage = lazy(() => import('src/pages/dashboard/manage/spa2/ingredient-guide'));
const ManageSpa2SkinSchoolPage = lazy(() => import('src/pages/dashboard/manage/spa2/skin-school'));
const ManageSpa2TherapistProfilePage = lazy(() => import('src/pages/dashboard/manage/spa2/therapist-profile'));
const ManageSpa2SleepWellnessPage = lazy(() => import('src/pages/dashboard/manage/spa2/sleep-wellness'));
const ManageSpa2PrenatalSpaPage = lazy(() => import('src/pages/dashboard/manage/spa2/prenatal-spa'));
const ManageSpa2WellnessAssessmentPage = lazy(() => import('src/pages/dashboard/manage/spa2/wellness-assessment'));
const ManageSpa2MenSpaPage = lazy(() => import('src/pages/dashboard/manage/spa2/men-spa'));
const ManageSpa2HairBeautyPage = lazy(() => import('src/pages/dashboard/manage/spa2/hair-beauty'));
const ManageSpa2KidsSpaPage = lazy(() => import('src/pages/dashboard/manage/spa2/kids-spa'));
const ManageSpa2AntiAgingPage = lazy(() => import('src/pages/dashboard/manage/spa2/anti-aging'));
const ManageSpa2WaterTherapyPage = lazy(() => import('src/pages/dashboard/manage/spa2/water-therapy'));
const ManageSpa2AyurvedaPage = lazy(() => import('src/pages/dashboard/manage/spa2/ayurveda'));
const ManageSpa2SpaHotelPage = lazy(() => import('src/pages/dashboard/manage/spa2/spa-hotel'));
const ManageSpa2CommunityPage = lazy(() => import('src/pages/dashboard/manage/spa2/community'));

// New singleton + detail management pages
const ManageSpa2HomePage = lazy(() => import('src/pages/dashboard/manage/spa2/home'));
const ManageSpa2AboutPage = lazy(() => import('src/pages/dashboard/manage/spa2/about'));
const ManageSpa2ContactPage = lazy(() => import('src/pages/dashboard/manage/spa2/contact'));
const ManageSpa2AccountPage = lazy(() => import('src/pages/dashboard/manage/spa2/account'));
const ManageSpa2ServiceDetailPage = lazy(() => import('src/pages/dashboard/manage/spa2/service-detail'));
const ManageSpa2BlogDetailPage = lazy(() => import('src/pages/dashboard/manage/spa2/blog-detail'));
const ManageSpa2CareerDetailPage = lazy(() => import('src/pages/dashboard/manage/spa2/career-detail'));

// Core pages
export const DashboardSpa2HomePage = lazySpa2Page('home');
export const DashboardSpa2AboutPage = lazySpa2Page('about');
export const DashboardSpa2ServicesPage = lazySpa2Page('services');
export const DashboardSpa2ServiceDetailsPage = lazySpa2Page('service-details');
export const DashboardSpa2TrainingPage = lazySpa2Page('training');
export const DashboardSpa2BlogPage = lazySpa2Page('blog');
export const DashboardSpa2BlogDetailsPage = lazySpa2Page('blog-details');
export const DashboardSpa2CareersPage = lazySpa2Page('careers');
export const DashboardSpa2BookingPage = lazySpa2Page('booking');
export const DashboardSpa2ContactPage = lazySpa2Page('contact');
export const DashboardSpa2OffersPage = lazySpa2Page('offers');
export const DashboardSpa2FeedbackPage = lazySpa2Page('feedback');
export const DashboardSpa2PromotionsPage = lazySpa2Page('promotions');
export const DashboardSpa2BranchesPage = lazySpa2Page('branches');
export const DashboardSpa2AccountPage = lazySpa2Page('account');
export const DashboardSpa2PartnersPage = lazySpa2Page('partners');
export const DashboardSpa2TreatmentsPage = lazySpa2Page('treatments');
export const DashboardSpa2BeforeAfterPage = lazySpa2Page('before-after');
export const DashboardSpa2FaqPage = lazySpa2Page('faq');
export const DashboardSpa2PolicyPage = lazySpa2Page('policy');
export const DashboardSpa2GalleryPage = lazySpa2Page('gallery');

// Extended pages
export const DashboardSpa2MembershipPage = lazySpa2Page('membership');
export const DashboardSpa2GiftCardPage = lazySpa2Page('gift-card');
export const DashboardSpa2WellnessPackagePage = lazySpa2Page('wellness-package');
export const DashboardSpa2SkinQuizPage = lazySpa2Page('skin-quiz');
export const DashboardSpa2CorporatePage = lazySpa2Page('corporate');
export const DashboardSpa2ShopPage = lazySpa2Page('shop');
export const DashboardSpa2SustainabilityPage = lazySpa2Page('sustainability');
export const DashboardSpa2EventsPage = lazySpa2Page('events');
export const DashboardSpa2ReferralPage = lazySpa2Page('referral');
export const DashboardSpa2AppDownloadPage = lazySpa2Page('app-download');
export const DashboardSpa2SpecialOccasionsPage = lazySpa2Page('special-occasions');
export const DashboardSpa2HomeServicePage = lazySpa2Page('home-service');
export const DashboardSpa2SkinDiaryPage = lazySpa2Page('skin-diary');
export const DashboardSpa2MindfulnessPage = lazySpa2Page('mindfulness');
export const DashboardSpa2MedicalSpaPage = lazySpa2Page('medical-spa');
export const DashboardSpa2SpaEtiquettePage = lazySpa2Page('spa-etiquette');
export const DashboardSpa2LoyaltyRewardsPage = lazySpa2Page('loyalty-rewards');
export const DashboardSpa2ReviewPage = lazySpa2Page('review');
export const DashboardSpa2SeasonalPackagePage = lazySpa2Page('seasonal-package');
export const DashboardSpa2NutritionPage = lazySpa2Page('nutrition');
export const DashboardSpa2ConsultationPage = lazySpa2Page('consultation');
export const DashboardSpa2VIPRoomPage = lazySpa2Page('vip-room');
export const DashboardSpa2PackageBuilderPage = lazySpa2Page('package-builder');
export const DashboardSpa2AppointmentPage = lazySpa2Page('appointment');
export const DashboardSpa2NewsletterPage = lazySpa2Page('newsletter');
export const DashboardSpa2PressPage = lazySpa2Page('press');
export const DashboardSpa2AffiliatePage = lazySpa2Page('affiliate');
export const DashboardSpa2SpaFinderPage = lazySpa2Page('spa-finder');
export const DashboardSpa2SpaMenuPage = lazySpa2Page('spa-menu');
export const DashboardSpa2IngredientGuidePage = lazySpa2Page('ingredient-guide');
export const DashboardSpa2SkinSchoolPage = lazySpa2Page('skin-school');
export const DashboardSpa2TherapistProfilePage = lazySpa2Page('therapist-profile');
export const DashboardSpa2SleepWellnessPage = lazySpa2Page('sleep-wellness');
export const DashboardSpa2PrenatalSpaPage = lazySpa2Page('prenatal-spa');
export const DashboardSpa2WellnessAssessmentPage = lazySpa2Page('wellness-assessment');

// ----------------------------------------------------------------------

export const dashboardSpa2Routes = [
  {
    path: 'spa2',
    children: [
      { element: <ManageSpa2HomePage />, index: true },
      { path: 'about', element: <ManageSpa2AboutPage /> },
      {
        path: 'services',
        children: [
          { element: <ManageSpa2ServicesPage />, index: true },
          { path: ':slug', element: <ManageSpa2ServiceDetailPage /> },
        ],
      },
      { path: 'training', element: <ManageSpa2TrainingPage /> },
      {
        path: 'blog',
        children: [
          { element: <ManageSpa2BlogPage />, index: true },
          { path: ':slug', element: <ManageSpa2BlogDetailPage /> },
        ],
      },
      {
        path: 'careers',
        children: [
          { element: <ManageSpa2CareersPage />, index: true },
          { path: ':id', element: <ManageSpa2CareerDetailPage /> },
        ],
      },
      { path: 'booking', element: <ManageSpa2BookingsPage /> },
      { path: 'contact', element: <ManageSpa2ContactPage /> },
      { path: 'offers', element: <ManageSpa2OffersPage /> },
      { path: 'feedback', element: <ManageSpa2FeedbacksPage /> },
      { path: 'promotions', element: <ManageSpa2PromotionsPage /> },
      { path: 'branches', element: <ManageSpa2BranchesPage /> },
      { path: 'account', element: <ManageSpa2AccountPage /> },
      { path: 'partners', element: <ManageSpa2PartnersPage /> },
      { path: 'treatments', element: <ManageSpa2TreatmentsPage /> },
      { path: 'before-after', element: <ManageSpa2BeforeAfterPage /> },
      { path: 'faq', element: <ManageSpa2FaqPage /> },
      { path: 'policy', element: <ManageSpa2PolicyPage /> },
      { path: 'gallery', element: <ManageSpa2GalleryPage /> },
      { path: 'membership', element: <ManageSpa2MembershipPage /> },
      { path: 'gift-card', element: <ManageSpa2GiftCardPage /> },
      { path: 'wellness-package', element: <ManageSpa2WellnessPackagePage /> },
      { path: 'skin-quiz', element: <ManageSpa2SkinQuizPage /> },
      { path: 'corporate', element: <ManageSpa2CorporatePage /> },
      { path: 'shop', element: <ManageSpa2ShopPage /> },
      { path: 'sustainability', element: <ManageSpa2SustainabilityPage /> },
      { path: 'events', element: <ManageSpa2EventsPage /> },
      { path: 'referral', element: <ManageSpa2ReferralPage /> },
      { path: 'app-download', element: <ManageSpa2AppDownloadPage /> },
      { path: 'special-occasions', element: <ManageSpa2SpecialOccasionsPage /> },
      { path: 'home-service', element: <ManageSpa2HomeServicePage /> },
      { path: 'skin-diary', element: <ManageSpa2SkinDiaryPage /> },
      { path: 'mindfulness', element: <ManageSpa2MindfulnessPage /> },
      { path: 'medical-spa', element: <ManageSpa2MedicalSpaPage /> },
      { path: 'spa-etiquette', element: <ManageSpa2SpaEtiquettePage /> },
      { path: 'loyalty-rewards', element: <ManageSpa2LoyaltyRewardsPage /> },
      { path: 'review', element: <ManageSpa2ReviewPage /> },
      { path: 'seasonal-package', element: <ManageSpa2SeasonalPackagePage /> },
      { path: 'nutrition', element: <ManageSpa2NutritionPage /> },
      { path: 'consultation', element: <ManageSpa2ConsultationPage /> },
      { path: 'vip-room', element: <ManageSpa2VipRoomPage /> },
      { path: 'package-builder', element: <ManageSpa2PackageBuilderPage /> },
      { path: 'appointment', element: <ManageSpa2AppointmentPage /> },
      { path: 'newsletter', element: <ManageSpa2NewsletterPage /> },
      { path: 'press', element: <ManageSpa2PressPage /> },
      { path: 'affiliate', element: <ManageSpa2AffiliatePage /> },
      { path: 'spa-finder', element: <ManageSpa2SpaFinderPage /> },
      { path: 'spa-menu', element: <ManageSpa2SpaMenuPage /> },
      { path: 'ingredient-guide', element: <ManageSpa2IngredientGuidePage /> },
      { path: 'skin-school', element: <ManageSpa2SkinSchoolPage /> },
      { path: 'therapist-profile', element: <ManageSpa2TherapistProfilePage /> },
      { path: 'sleep-wellness', element: <ManageSpa2SleepWellnessPage /> },
      { path: 'prenatal-spa', element: <ManageSpa2PrenatalSpaPage /> },
      { path: 'wellness-assessment', element: <ManageSpa2WellnessAssessmentPage /> },
      { path: 'men-spa', element: <ManageSpa2MenSpaPage /> },
      { path: 'hair-beauty', element: <ManageSpa2HairBeautyPage /> },
      { path: 'kids-spa', element: <ManageSpa2KidsSpaPage /> },
      { path: 'anti-aging', element: <ManageSpa2AntiAgingPage /> },
      { path: 'water-therapy', element: <ManageSpa2WaterTherapyPage /> },
      { path: 'ayurveda', element: <ManageSpa2AyurvedaPage /> },
      { path: 'spa-hotel', element: <ManageSpa2SpaHotelPage /> },
      { path: 'community', element: <ManageSpa2CommunityPage /> },
    ],
  },
];
