import type { Spa2PageKey } from 'src/api/spa2/types';

import { lazy } from 'react';

import { createDashboardSpa2Page } from 'src/sections/dashboard/spa2/create-dashboard-spa2-page';

// ----------------------------------------------------------------------

function lazySpa2Page(pageKey: Spa2PageKey) {
  return lazy(async () => ({ default: createDashboardSpa2Page(pageKey) }));
}

// Core pages
export const DashboardSpa2HomePage = lazySpa2Page('home');
export const DashboardSpa2AboutPage = lazySpa2Page('about');
export const DashboardSpa2ServicesPage = lazySpa2Page('services');
export const DashboardSpa2ServiceDetailsPage = lazySpa2Page('service-details');
export const DashboardSpa2TrainingPage = lazySpa2Page('training');
export const DashboardSpa2BlogPage = lazySpa2Page('blog');
export const DashboardSpa2BlogDetailsPage = lazySpa2Page('blog-details');
export const DashboardSpa2CareersPage = lazySpa2Page('careers');
export const DashboardSpa2CareerDetailsPage = lazySpa2Page('career-details');
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
      { element: <DashboardSpa2HomePage />, index: true },
      { path: 'about', element: <DashboardSpa2AboutPage /> },
      {
        path: 'services',
        children: [
          { element: <DashboardSpa2ServicesPage />, index: true },
          { path: ':slug', element: <DashboardSpa2ServiceDetailsPage /> },
        ],
      },
      { path: 'training', element: <DashboardSpa2TrainingPage /> },
      {
        path: 'blog',
        children: [
          { element: <DashboardSpa2BlogPage />, index: true },
          { path: ':slug', element: <DashboardSpa2BlogDetailsPage /> },
        ],
      },
      {
        path: 'careers',
        children: [
          { element: <DashboardSpa2CareersPage />, index: true },
          { path: ':id', element: <DashboardSpa2CareerDetailsPage /> },
        ],
      },
      { path: 'booking', element: <DashboardSpa2BookingPage /> },
      { path: 'contact', element: <DashboardSpa2ContactPage /> },
      { path: 'offers', element: <DashboardSpa2OffersPage /> },
      { path: 'feedback', element: <DashboardSpa2FeedbackPage /> },
      { path: 'promotions', element: <DashboardSpa2PromotionsPage /> },
      { path: 'branches', element: <DashboardSpa2BranchesPage /> },
      { path: 'account', element: <DashboardSpa2AccountPage /> },
      { path: 'partners', element: <DashboardSpa2PartnersPage /> },
      { path: 'treatments', element: <DashboardSpa2TreatmentsPage /> },
      { path: 'before-after', element: <DashboardSpa2BeforeAfterPage /> },
      { path: 'faq', element: <DashboardSpa2FaqPage /> },
      { path: 'policy', element: <DashboardSpa2PolicyPage /> },
      { path: 'gallery', element: <DashboardSpa2GalleryPage /> },
      { path: 'membership', element: <DashboardSpa2MembershipPage /> },
      { path: 'gift-card', element: <DashboardSpa2GiftCardPage /> },
      { path: 'wellness-package', element: <DashboardSpa2WellnessPackagePage /> },
      { path: 'skin-quiz', element: <DashboardSpa2SkinQuizPage /> },
      { path: 'corporate', element: <DashboardSpa2CorporatePage /> },
      { path: 'shop', element: <DashboardSpa2ShopPage /> },
      { path: 'sustainability', element: <DashboardSpa2SustainabilityPage /> },
      { path: 'events', element: <DashboardSpa2EventsPage /> },
      { path: 'referral', element: <DashboardSpa2ReferralPage /> },
      { path: 'app-download', element: <DashboardSpa2AppDownloadPage /> },
      { path: 'special-occasions', element: <DashboardSpa2SpecialOccasionsPage /> },
      { path: 'home-service', element: <DashboardSpa2HomeServicePage /> },
      { path: 'skin-diary', element: <DashboardSpa2SkinDiaryPage /> },
      { path: 'mindfulness', element: <DashboardSpa2MindfulnessPage /> },
      { path: 'medical-spa', element: <DashboardSpa2MedicalSpaPage /> },
      { path: 'spa-etiquette', element: <DashboardSpa2SpaEtiquettePage /> },
      { path: 'loyalty-rewards', element: <DashboardSpa2LoyaltyRewardsPage /> },
      { path: 'review', element: <DashboardSpa2ReviewPage /> },
      { path: 'seasonal-package', element: <DashboardSpa2SeasonalPackagePage /> },
      { path: 'nutrition', element: <DashboardSpa2NutritionPage /> },
      { path: 'consultation', element: <DashboardSpa2ConsultationPage /> },
      { path: 'vip-room', element: <DashboardSpa2VIPRoomPage /> },
      { path: 'package-builder', element: <DashboardSpa2PackageBuilderPage /> },
      { path: 'appointment', element: <DashboardSpa2AppointmentPage /> },
      { path: 'newsletter', element: <DashboardSpa2NewsletterPage /> },
      { path: 'press', element: <DashboardSpa2PressPage /> },
      { path: 'affiliate', element: <DashboardSpa2AffiliatePage /> },
      { path: 'spa-finder', element: <DashboardSpa2SpaFinderPage /> },
      { path: 'spa-menu', element: <DashboardSpa2SpaMenuPage /> },
      { path: 'ingredient-guide', element: <DashboardSpa2IngredientGuidePage /> },
      { path: 'skin-school', element: <DashboardSpa2SkinSchoolPage /> },
      { path: 'therapist-profile', element: <DashboardSpa2TherapistProfilePage /> },
      { path: 'sleep-wellness', element: <DashboardSpa2SleepWellnessPage /> },
      { path: 'prenatal-spa', element: <DashboardSpa2PrenatalSpaPage /> },
      { path: 'wellness-assessment', element: <DashboardSpa2WellnessAssessmentPage /> },
    ],
  },
];
