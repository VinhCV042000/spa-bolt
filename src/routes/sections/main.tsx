import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from 'src/layouts/main';
import { SimpleLayout } from 'src/layouts/simple';
import { useSpaNavData } from 'src/layouts/config-nav-spa';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

function SpaMainLayout() {
  const navData = useSpaNavData();

  return (
    <MainLayout data={{ nav: navData }}>
      <Outlet />
    </MainLayout>
  );
}

// ----------------------------------------------------------------------

const FaqsPage = lazy(() => import('src/pages/faqs'));
const PricingPage = lazy(() => import('src/pages/pricing'));
const PaymentPage = lazy(() => import('src/pages/payment'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
// Product
const ProductListPage = lazy(() => import('src/pages/product/list'));
const ProductDetailsPage = lazy(() => import('src/pages/product/details'));
const ProductCheckoutPage = lazy(() => import('src/pages/product/checkout'));
// Blog
const PostListPage = lazy(() => import('src/pages/post/list'));
const PostDetailsPage = lazy(() => import('src/pages/post/details'));
// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));
// Blank
const BlankPage = lazy(() => import('src/pages/blank'));
// Spa1 (landing variant)
const Spa1Page = lazy(() => import('src/pages/spa1'));
// Spa1 pages
const Spa1AboutPage = lazy(() => import('src/pages/spa1/about'));
const Spa1ServicesPage = lazy(() => import('src/pages/spa1/services'));
const Spa1ServiceDetailsPage = lazy(() => import('src/pages/spa1/service-details'));
const Spa1TrainingPage = lazy(() => import('src/pages/spa1/training'));
const Spa1BlogPage = lazy(() => import('src/pages/spa1/blog'));
const Spa1BlogDetailsPage = lazy(() => import('src/pages/spa1/blog-details'));
const Spa1CareersPage = lazy(() => import('src/pages/spa1/careers'));
const Spa1BookingPage = lazy(() => import('src/pages/spa1/booking'));
const Spa1ContactPage = lazy(() => import('src/pages/spa1/contact'));
const Spa1OffersPage = lazy(() => import('src/pages/spa1/offers'));
const Spa1FeedbackPage = lazy(() => import('src/pages/spa1/feedback'));
const Spa1PromotionsPage = lazy(() => import('src/pages/spa1/promotions'));
const Spa1BranchesPage = lazy(() => import('src/pages/spa1/branches'));
const Spa1AccountPage = lazy(() => import('src/pages/spa1/account'));
const Spa1PartnersPage = lazy(() => import('src/pages/spa1/partners'));
const Spa1TreatmentsPage = lazy(() => import('src/pages/spa1/treatments'));
const Spa1BeforeAfterPage = lazy(() => import('src/pages/spa1/before-after'));
const Spa1FaqPage = lazy(() => import('src/pages/spa1/faq'));
const Spa1PolicyPage = lazy(() => import('src/pages/spa1/policy'));
const Spa1GalleryPage = lazy(() => import('src/pages/spa1/gallery'));
// Spa2 (nature variant)
const Spa2Page = lazy(() => import('src/pages/spa2'));
const Spa2AboutPage = lazy(() => import('src/pages/spa2/about'));
const Spa2ServicesPage = lazy(() => import('src/pages/spa2/services'));
const Spa2ServiceDetailsPage = lazy(() => import('src/pages/spa2/service-details'));
const Spa2TrainingPage = lazy(() => import('src/pages/spa2/training'));
const Spa2BlogPage = lazy(() => import('src/pages/spa2/blog'));
const Spa2BlogDetailsPage = lazy(() => import('src/pages/spa2/blog-details'));
const Spa2CareersPage = lazy(() => import('src/pages/spa2/careers'));
const Spa2CareerDetailsPage = lazy(() => import('src/pages/spa2/career-details'));
const Spa2BookingPage = lazy(() => import('src/pages/spa2/booking'));
const Spa2ContactPage = lazy(() => import('src/pages/spa2/contact'));
const Spa2OffersPage = lazy(() => import('src/pages/spa2/offers'));
const Spa2FeedbackPage = lazy(() => import('src/pages/spa2/feedback'));
const Spa2PromotionsPage = lazy(() => import('src/pages/spa2/promotions'));
const Spa2BranchesPage = lazy(() => import('src/pages/spa2/branches'));
const Spa2AccountPage = lazy(() => import('src/pages/spa2/account'));
const Spa2PartnersPage = lazy(() => import('src/pages/spa2/partners'));
const Spa2TreatmentsPage = lazy(() => import('src/pages/spa2/treatments'));
const Spa2BeforeAfterPage = lazy(() => import('src/pages/spa2/before-after'));
const Spa2FaqPage = lazy(() => import('src/pages/spa2/faq'));
const Spa2PolicyPage = lazy(() => import('src/pages/spa2/policy'));
const Spa2GalleryPage = lazy(() => import('src/pages/spa2/gallery'));
// spa2-content-pages2
const Spa2MembershipPage = lazy(() => import('src/pages/spa2/membership'));
const Spa2ShopPage = lazy(() => import('src/pages/spa2/shop'));
const Spa2GiftCardPage = lazy(() => import('src/pages/spa2/gift-card'));
const Spa2SkinQuizPage = lazy(() => import('src/pages/spa2/skin-quiz'));
const Spa2AppDownloadPage = lazy(() => import('src/pages/spa2/app-download'));
const Spa2CorporatePage = lazy(() => import('src/pages/spa2/corporate'));
const Spa2ReferralPage = lazy(() => import('src/pages/spa2/referral'));
const Spa2SustainabilityPage = lazy(() => import('src/pages/spa2/sustainability'));
const Spa2EventsPage = lazy(() => import('src/pages/spa2/events'));
const Spa2WellnessPackagePage = lazy(() => import('src/pages/spa2/wellness-package'));
// spa2-content-pages3
const Spa2SpecialOccasionsPage = lazy(() => import('src/pages/spa2/special-occasions'));
const Spa2HomeServicePage = lazy(() => import('src/pages/spa2/home-service'));
const Spa2SkinDiaryPage = lazy(() => import('src/pages/spa2/skin-diary'));
const Spa2MindfulnessPage = lazy(() => import('src/pages/spa2/mindfulness'));
const Spa2MedicalSpaPage = lazy(() => import('src/pages/spa2/medical-spa'));
const Spa2SpaEtiquettePage = lazy(() => import('src/pages/spa2/spa-etiquette'));
const Spa2LoyaltyRewardsPage = lazy(() => import('src/pages/spa2/loyalty-rewards'));
const Spa2ReviewPage = lazy(() => import('src/pages/spa2/review'));
const Spa2SeasonalPackagePage = lazy(() => import('src/pages/spa2/seasonal-package'));
// spa2-content-pages4
const Spa2NutritionPage = lazy(() => import('src/pages/spa2/nutrition'));
const Spa2ConsultationPage = lazy(() => import('src/pages/spa2/consultation'));
const Spa2VIPRoomPage = lazy(() => import('src/pages/spa2/vip-room'));
const Spa2PackageBuilderPage = lazy(() => import('src/pages/spa2/package-builder'));
const Spa2AppointmentPage = lazy(() => import('src/pages/spa2/appointment'));
const Spa2NewsletterPage = lazy(() => import('src/pages/spa2/newsletter'));
const Spa2PressPage = lazy(() => import('src/pages/spa2/press'));
const Spa2AffiliatePage = lazy(() => import('src/pages/spa2/affiliate'));
const Spa2SpaFinderPage = lazy(() => import('src/pages/spa2/spa-finder'));
const Spa2SpaMenuPage = lazy(() => import('src/pages/spa2/spa-menu'));
// spa2-content-pages5
const Spa2IngredientGuidePage = lazy(() => import('src/pages/spa2/ingredient-guide'));
const Spa2SkinSchoolPage = lazy(() => import('src/pages/spa2/skin-school'));
const Spa2TherapistProfilePage = lazy(() => import('src/pages/spa2/therapist-profile'));
const Spa2SleepWellnessPage = lazy(() => import('src/pages/spa2/sleep-wellness'));
const Spa2PrenatalSpaPage = lazy(() => import('src/pages/spa2/prenatal-spa'));
const Spa2WellnessAssessmentPage = lazy(() => import('src/pages/spa2/wellness-assessment'));
// spa2-content-pages6
const Spa2MenSpaPage = lazy(() => import('src/pages/spa2/men-spa'));
const Spa2HairBeautyPage = lazy(() => import('src/pages/spa2/hair-beauty'));
const Spa2KidsSpaPage = lazy(() => import('src/pages/spa2/kids-spa'));
const Spa2AntiAgingPage = lazy(() => import('src/pages/spa2/anti-aging'));
const Spa2WaterTherapyPage = lazy(() => import('src/pages/spa2/water-therapy'));
const Spa2AyurvedaPage = lazy(() => import('src/pages/spa2/ayurveda'));
const Spa2SpaHotelPage = lazy(() => import('src/pages/spa2/spa-hotel'));
const Spa2CommunityPage = lazy(() => import('src/pages/spa2/community'));
// spa2-content-pages8
const Spa2VideoGuidePage = lazy(() => import('src/pages/spa2/video-guide'));
const Spa2FranchisePage = lazy(() => import('src/pages/spa2/franchise'));
const Spa2CertificateWallPage = lazy(() => import('src/pages/spa2/certificate-wall'));
const Spa2GroupBookingPage = lazy(() => import('src/pages/spa2/group-booking'));
// spa2-content-pages9
const Spa2PriceListPage = lazy(() => import('src/pages/spa2/price-list'));
const Spa2WaitListPage = lazy(() => import('src/pages/spa2/wait-list'));
const Spa2VoucherCheckPage = lazy(() => import('src/pages/spa2/voucher-check'));
const Spa2AccessibilityPage = lazy(() => import('src/pages/spa2/accessibility'));

// Spa3 (mediterranean variant)
const Spa3Page = lazy(() => import('src/pages/spa3'));
const Spa3AboutPage = lazy(() => import('src/pages/spa3/about'));
const Spa3ServicesPage = lazy(() => import('src/pages/spa3/services'));
const Spa3ServiceDetailsPage = lazy(() => import('src/pages/spa3/service-details'));
const Spa3TrainingPage = lazy(() => import('src/pages/spa3/training'));
const Spa3BlogPage = lazy(() => import('src/pages/spa3/blog'));
const Spa3BlogDetailsPage = lazy(() => import('src/pages/spa3/blog-details'));
const Spa3CareersPage = lazy(() => import('src/pages/spa3/careers'));
const Spa3CareerDetailsPage = lazy(() => import('src/pages/spa3/career-details'));
const Spa3BookingPage = lazy(() => import('src/pages/spa3/booking'));
const Spa3ContactPage = lazy(() => import('src/pages/spa3/contact'));
const Spa3OffersPage = lazy(() => import('src/pages/spa3/offers'));
const Spa3FeedbackPage = lazy(() => import('src/pages/spa3/feedback'));
const Spa3PromotionsPage = lazy(() => import('src/pages/spa3/promotions'));
const Spa3BranchesPage = lazy(() => import('src/pages/spa3/branches'));
const Spa3AccountPage = lazy(() => import('src/pages/spa3/account'));
const Spa3PartnersPage = lazy(() => import('src/pages/spa3/partners'));
const Spa3TreatmentsPage = lazy(() => import('src/pages/spa3/treatments'));
const Spa3BeforeAfterPage = lazy(() => import('src/pages/spa3/before-after'));
const Spa3FaqPage = lazy(() => import('src/pages/spa3/faq'));
const Spa3PolicyPage = lazy(() => import('src/pages/spa3/policy'));
const Spa3GalleryPage = lazy(() => import('src/pages/spa3/gallery'));
// Spa4 pages
const Spa4Page = lazy(() => import('src/pages/spa4'));
const Spa4AboutPage = lazy(() => import('src/pages/spa4/about'));
const Spa4ServicesPage = lazy(() => import('src/pages/spa4/services'));
const Spa4ServiceDetailsPage = lazy(() => import('src/pages/spa4/service-details'));
const Spa4TrainingPage = lazy(() => import('src/pages/spa4/training'));
const Spa4BlogPage = lazy(() => import('src/pages/spa4/blog'));
const Spa4BlogDetailsPage = lazy(() => import('src/pages/spa4/blog-details'));
const Spa4CareersPage = lazy(() => import('src/pages/spa4/careers'));
const Spa4BookingPage = lazy(() => import('src/pages/spa4/booking'));
const Spa4ContactPage = lazy(() => import('src/pages/spa4/contact'));
const Spa4OffersPage = lazy(() => import('src/pages/spa4/offers'));
const Spa4FeedbackPage = lazy(() => import('src/pages/spa4/feedback'));
const Spa4PromotionsPage = lazy(() => import('src/pages/spa4/promotions'));
const Spa4BranchesPage = lazy(() => import('src/pages/spa4/branches'));
const Spa4AccountPage = lazy(() => import('src/pages/spa4/account'));
const Spa4PartnersPage = lazy(() => import('src/pages/spa4/partners'));
const Spa4PackagesPage = lazy(() => import('src/pages/spa4/packages'));
const Spa4BeforeAfterPage = lazy(() => import('src/pages/spa4/before-after'));
const Spa4FaqPage = lazy(() => import('src/pages/spa4/faq'));
const Spa4PolicyPage = lazy(() => import('src/pages/spa4/policy'));
const Spa4GalleryPage = lazy(() => import('src/pages/spa4/gallery'));
// Spa5 pages
const Spa5Page = lazy(() => import('src/pages/spa5'));
const Spa5AboutPage = lazy(() => import('src/pages/spa5/about'));
const Spa5ServicesPage = lazy(() => import('src/pages/spa5/services'));
const Spa5ServiceDetailsPage = lazy(() => import('src/pages/spa5/service-details'));
const Spa5TrainingPage = lazy(() => import('src/pages/spa5/training'));
const Spa5BlogPage = lazy(() => import('src/pages/spa5/blog'));
const Spa5BlogDetailsPage = lazy(() => import('src/pages/spa5/blog-details'));
const Spa5CareersPage = lazy(() => import('src/pages/spa5/careers'));
const Spa5BookingPage = lazy(() => import('src/pages/spa5/booking'));
const Spa5ContactPage = lazy(() => import('src/pages/spa5/contact'));
const Spa5OffersPage = lazy(() => import('src/pages/spa5/offers'));
const Spa5FeedbackPage = lazy(() => import('src/pages/spa5/feedback'));
const Spa5PromotionsPage = lazy(() => import('src/pages/spa5/promotions'));
const Spa5BranchesPage = lazy(() => import('src/pages/spa5/branches'));
const Spa5AccountPage = lazy(() => import('src/pages/spa5/account'));
const Spa5PartnersPage = lazy(() => import('src/pages/spa5/partners'));
const Spa5PackagesPage = lazy(() => import('src/pages/spa5/packages'));
const Spa5BeforeAfterPage = lazy(() => import('src/pages/spa5/before-after'));
const Spa5FaqPage = lazy(() => import('src/pages/spa5/faq'));
const Spa5PolicyPage = lazy(() => import('src/pages/spa5/policy'));
const Spa5GalleryPage = lazy(() => import('src/pages/spa5/gallery'));
// Spa6 pages
const Spa6Page = lazy(() => import('src/pages/spa6'));
const Spa6AboutPage = lazy(() => import('src/pages/spa6/about'));
const Spa6ServicesPage = lazy(() => import('src/pages/spa6/services'));
const Spa6ServiceDetailsPage = lazy(() => import('src/pages/spa6/service-details'));
const Spa6TrainingPage = lazy(() => import('src/pages/spa6/training'));
const Spa6BlogPage = lazy(() => import('src/pages/spa6/blog'));
const Spa6BlogDetailsPage = lazy(() => import('src/pages/spa6/blog-details'));
const Spa6CareersPage = lazy(() => import('src/pages/spa6/careers'));
const Spa6BookingPage = lazy(() => import('src/pages/spa6/booking'));
const Spa6ContactPage = lazy(() => import('src/pages/spa6/contact'));
const Spa6OffersPage = lazy(() => import('src/pages/spa6/offers'));
const Spa6FeedbackPage = lazy(() => import('src/pages/spa6/feedback'));
const Spa6PromotionsPage = lazy(() => import('src/pages/spa6/promotions'));
const Spa6BranchesPage = lazy(() => import('src/pages/spa6/branches'));
const Spa6AccountPage = lazy(() => import('src/pages/spa6/account'));
const Spa6PartnersPage = lazy(() => import('src/pages/spa6/partners'));
const Spa6PackagesPage = lazy(() => import('src/pages/spa6/packages'));
const Spa6BeforeAfterPage = lazy(() => import('src/pages/spa6/before-after'));
const Spa6FaqPage = lazy(() => import('src/pages/spa6/faq'));
const Spa6PolicyPage = lazy(() => import('src/pages/spa6/policy'));
const Spa6GalleryPage = lazy(() => import('src/pages/spa6/gallery'));
// Spa7
const Spa7Page = lazy(() => import('src/pages/spa7'));
const Spa7AboutPage = lazy(() => import('src/pages/spa7/about'));
const Spa7ServicesPage = lazy(() => import('src/pages/spa7/services'));
const Spa7ServiceDetailsPage = lazy(() => import('src/pages/spa7/service-details'));
const Spa7TrainingPage = lazy(() => import('src/pages/spa7/training'));
const Spa7BlogPage = lazy(() => import('src/pages/spa7/blog'));
const Spa7BlogDetailsPage = lazy(() => import('src/pages/spa7/blog-details'));
const Spa7CareersPage = lazy(() => import('src/pages/spa7/careers'));
const Spa7CareerDetailsPage = lazy(() => import('src/pages/spa7/career-details'));
const Spa7BookingPage = lazy(() => import('src/pages/spa7/booking'));
const Spa7ContactPage = lazy(() => import('src/pages/spa7/contact'));
const Spa7OffersPage = lazy(() => import('src/pages/spa7/offers'));
const Spa7FeedbackPage = lazy(() => import('src/pages/spa7/feedback'));
const Spa7PromotionsPage = lazy(() => import('src/pages/spa7/promotions'));
const Spa7BranchesPage = lazy(() => import('src/pages/spa7/branches'));
const Spa7AccountPage = lazy(() => import('src/pages/spa7/account'));
const Spa7PartnersPage = lazy(() => import('src/pages/spa7/partners'));
const Spa7TreatmentsPage = lazy(() => import('src/pages/spa7/treatments'));
const Spa7BeforeAfterPage = lazy(() => import('src/pages/spa7/before-after'));
const Spa7FaqPage = lazy(() => import('src/pages/spa7/faq'));
const Spa7PolicyPage = lazy(() => import('src/pages/spa7/policy'));
const Spa7GalleryPage = lazy(() => import('src/pages/spa7/gallery'));
// Spa8
const Spa8Page = lazy(() => import('src/pages/spa8'));
const Spa8AboutPage = lazy(() => import('src/pages/spa8/about'));
const Spa8ServicesPage = lazy(() => import('src/pages/spa8/services'));
const Spa8ServiceDetailsPage = lazy(() => import('src/pages/spa8/service-details'));
const Spa8TrainingPage = lazy(() => import('src/pages/spa8/training'));
const Spa8BlogPage = lazy(() => import('src/pages/spa8/blog'));
const Spa8BlogDetailsPage = lazy(() => import('src/pages/spa8/blog-details'));
const Spa8CareersPage = lazy(() => import('src/pages/spa8/careers'));
const Spa8BookingPage = lazy(() => import('src/pages/spa8/booking'));
const Spa8ContactPage = lazy(() => import('src/pages/spa8/contact'));
const Spa8OffersPage = lazy(() => import('src/pages/spa8/offers'));
const Spa8FeedbackPage = lazy(() => import('src/pages/spa8/feedback'));
const Spa8PromotionsPage = lazy(() => import('src/pages/spa8/promotions'));
const Spa8BranchesPage = lazy(() => import('src/pages/spa8/branches'));
const Spa8AccountPage = lazy(() => import('src/pages/spa8/account'));
const Spa8PartnersPage = lazy(() => import('src/pages/spa8/partners'));
const Spa8PackagesPage = lazy(() => import('src/pages/spa8/packages'));
const Spa8BeforeAfterPage = lazy(() => import('src/pages/spa8/before-after'));
const Spa8FaqPage = lazy(() => import('src/pages/spa8/faq'));
const Spa8PolicyPage = lazy(() => import('src/pages/spa8/policy'));
const Spa8GalleryPage = lazy(() => import('src/pages/spa8/gallery'));
// Spa9 pages
const Spa9Page = lazy(() => import('src/pages/spa9'));
const Spa9AboutPage = lazy(() => import('src/pages/spa9/about'));
const Spa9ServicesPage = lazy(() => import('src/pages/spa9/services'));
const Spa9ServiceDetailsPage = lazy(() => import('src/pages/spa9/service-details'));
const Spa9TrainingPage = lazy(() => import('src/pages/spa9/training'));
const Spa9BlogPage = lazy(() => import('src/pages/spa9/blog'));
const Spa9BlogDetailsPage = lazy(() => import('src/pages/spa9/blog-details'));
const Spa9CareersPage = lazy(() => import('src/pages/spa9/careers'));
const Spa9BookingPage = lazy(() => import('src/pages/spa9/booking'));
const Spa9ContactPage = lazy(() => import('src/pages/spa9/contact'));
const Spa9OffersPage = lazy(() => import('src/pages/spa9/offers'));
const Spa9FeedbackPage = lazy(() => import('src/pages/spa9/feedback'));
const Spa9PromotionsPage = lazy(() => import('src/pages/spa9/promotions'));
const Spa9BranchesPage = lazy(() => import('src/pages/spa9/branches'));
const Spa9AccountPage = lazy(() => import('src/pages/spa9/account'));
const Spa9PartnersPage = lazy(() => import('src/pages/spa9/partners'));
const Spa9PackagesPage = lazy(() => import('src/pages/spa9/packages'));
const Spa9BeforeAfterPage = lazy(() => import('src/pages/spa9/before-after'));
const Spa9FaqPage = lazy(() => import('src/pages/spa9/faq'));
const Spa9PolicyPage = lazy(() => import('src/pages/spa9/policy'));
const Spa9GalleryPage = lazy(() => import('src/pages/spa9/gallery'));
// Spa10 pages
const Spa10Page = lazy(() => import('src/pages/spa10'));
const Spa10AboutPage = lazy(() => import('src/pages/spa10/about'));
const Spa10ServicesPage = lazy(() => import('src/pages/spa10/services'));
const Spa10ServiceDetailsPage = lazy(() => import('src/pages/spa10/service-details'));
const Spa10TrainingPage = lazy(() => import('src/pages/spa10/training'));
const Spa10BlogPage = lazy(() => import('src/pages/spa10/blog'));
const Spa10BlogDetailsPage = lazy(() => import('src/pages/spa10/blog-details'));
const Spa10CareersPage = lazy(() => import('src/pages/spa10/careers'));
const Spa10BookingPage = lazy(() => import('src/pages/spa10/booking'));
const Spa10ContactPage = lazy(() => import('src/pages/spa10/contact'));
const Spa10OffersPage = lazy(() => import('src/pages/spa10/offers'));
const Spa10FeedbackPage = lazy(() => import('src/pages/spa10/feedback'));
const Spa10PromotionsPage = lazy(() => import('src/pages/spa10/promotions'));
const Spa10BranchesPage = lazy(() => import('src/pages/spa10/branches'));
const Spa10AccountPage = lazy(() => import('src/pages/spa10/account'));
const Spa10PartnersPage = lazy(() => import('src/pages/spa10/partners'));
const Spa10PackagesPage = lazy(() => import('src/pages/spa10/packages'));
const Spa10BeforeAfterPage = lazy(() => import('src/pages/spa10/before-after'));
const Spa10FaqPage = lazy(() => import('src/pages/spa10/faq'));
const Spa10PolicyPage = lazy(() => import('src/pages/spa10/policy'));
const Spa10GalleryPage = lazy(() => import('src/pages/spa10/gallery'));
// Spa11
const Spa11Page = lazy(() => import('src/pages/spa11'));
const Spa11AboutPage = lazy(() => import('src/pages/spa11/about'));
const Spa11ServicesPage = lazy(() => import('src/pages/spa11/services'));
const Spa11ServiceDetailsPage = lazy(() => import('src/pages/spa11/service-details'));
const Spa11TrainingPage = lazy(() => import('src/pages/spa11/training'));
const Spa11BlogPage = lazy(() => import('src/pages/spa11/blog'));
const Spa11BlogDetailsPage = lazy(() => import('src/pages/spa11/blog-details'));
const Spa11CareersPage = lazy(() => import('src/pages/spa11/careers'));
const Spa11CareerDetailsPage = lazy(() => import('src/pages/spa11/career-details'));
const Spa11BookingPage = lazy(() => import('src/pages/spa11/booking'));
const Spa11ContactPage = lazy(() => import('src/pages/spa11/contact'));
const Spa11OffersPage = lazy(() => import('src/pages/spa11/offers'));
const Spa11FeedbackPage = lazy(() => import('src/pages/spa11/feedback'));
const Spa11PromotionsPage = lazy(() => import('src/pages/spa11/promotions'));
const Spa11BranchesPage = lazy(() => import('src/pages/spa11/branches'));
const Spa11AccountPage = lazy(() => import('src/pages/spa11/account'));
const Spa11PartnersPage = lazy(() => import('src/pages/spa11/partners'));
const Spa11TreatmentsPage = lazy(() => import('src/pages/spa11/treatments'));
const Spa11BeforeAfterPage = lazy(() => import('src/pages/spa11/before-after'));
const Spa11FaqPage = lazy(() => import('src/pages/spa11/faq'));
const Spa11PolicyPage = lazy(() => import('src/pages/spa11/policy'));
const Spa11GalleryPage = lazy(() => import('src/pages/spa11/gallery'));
// Spa12
const Spa12Page = lazy(() => import('src/pages/spa12'));
const Spa12AboutPage = lazy(() => import('src/pages/spa12/about'));
const Spa12ServicesPage = lazy(() => import('src/pages/spa12/services'));
const Spa12ServiceDetailsPage = lazy(() => import('src/pages/spa12/service-details'));
const Spa12TrainingPage = lazy(() => import('src/pages/spa12/training'));
const Spa12BlogPage = lazy(() => import('src/pages/spa12/blog'));
const Spa12BlogDetailsPage = lazy(() => import('src/pages/spa12/blog-details'));
const Spa12CareersPage = lazy(() => import('src/pages/spa12/careers'));
const Spa12BookingPage = lazy(() => import('src/pages/spa12/booking'));
const Spa12ContactPage = lazy(() => import('src/pages/spa12/contact'));
const Spa12OffersPage = lazy(() => import('src/pages/spa12/offers'));
const Spa12FeedbackPage = lazy(() => import('src/pages/spa12/feedback'));
const Spa12PromotionsPage = lazy(() => import('src/pages/spa12/promotions'));
const Spa12BranchesPage = lazy(() => import('src/pages/spa12/branches'));
const Spa12AccountPage = lazy(() => import('src/pages/spa12/account'));
const Spa12PartnersPage = lazy(() => import('src/pages/spa12/partners'));
const Spa12PackagesPage = lazy(() => import('src/pages/spa12/packages'));
const Spa12BeforeAfterPage = lazy(() => import('src/pages/spa12/before-after'));
const Spa12FaqPage = lazy(() => import('src/pages/spa12/faq'));
const Spa12PolicyPage = lazy(() => import('src/pages/spa12/policy'));
const Spa12GalleryPage = lazy(() => import('src/pages/spa12/gallery'));
// Spa13
const Spa13Page = lazy(() => import('src/pages/spa13'));
const Spa13AboutPage = lazy(() => import('src/pages/spa13/about'));
const Spa13ServicesPage = lazy(() => import('src/pages/spa13/services'));
const Spa13ServiceDetailsPage = lazy(() => import('src/pages/spa13/service-details'));
const Spa13TrainingPage = lazy(() => import('src/pages/spa13/training'));
const Spa13BlogPage = lazy(() => import('src/pages/spa13/blog'));
const Spa13BlogDetailsPage = lazy(() => import('src/pages/spa13/blog-details'));
const Spa13CareersPage = lazy(() => import('src/pages/spa13/careers'));
const Spa13BookingPage = lazy(() => import('src/pages/spa13/booking'));
const Spa13ContactPage = lazy(() => import('src/pages/spa13/contact'));
const Spa13OffersPage = lazy(() => import('src/pages/spa13/offers'));
const Spa13FeedbackPage = lazy(() => import('src/pages/spa13/feedback'));
const Spa13PromotionsPage = lazy(() => import('src/pages/spa13/promotions'));
const Spa13BranchesPage = lazy(() => import('src/pages/spa13/branches'));
const Spa13AccountPage = lazy(() => import('src/pages/spa13/account'));
const Spa13PartnersPage = lazy(() => import('src/pages/spa13/partners'));
const Spa13PackagesPage = lazy(() => import('src/pages/spa13/packages'));
const Spa13BeforeAfterPage = lazy(() => import('src/pages/spa13/before-after'));
const Spa13FaqPage = lazy(() => import('src/pages/spa13/faq'));
const Spa13PolicyPage = lazy(() => import('src/pages/spa13/policy'));
const Spa13GalleryPage = lazy(() => import('src/pages/spa13/gallery'));
// Spa14
const Spa14Page = lazy(() => import('src/pages/spa14'));
const Spa14AboutPage = lazy(() => import('src/pages/spa14/about'));
const Spa14ServicesPage = lazy(() => import('src/pages/spa14/services'));
const Spa14ServiceDetailsPage = lazy(() => import('src/pages/spa14/service-details'));
const Spa14TrainingPage = lazy(() => import('src/pages/spa14/training'));
const Spa14BlogPage = lazy(() => import('src/pages/spa14/blog'));
const Spa14BlogDetailsPage = lazy(() => import('src/pages/spa14/blog-details'));
const Spa14CareersPage = lazy(() => import('src/pages/spa14/careers'));
const Spa14CareerDetailsPage = lazy(() => import('src/pages/spa14/career-details'));
const Spa14BookingPage = lazy(() => import('src/pages/spa14/booking'));
const Spa14ContactPage = lazy(() => import('src/pages/spa14/contact'));
const Spa14OffersPage = lazy(() => import('src/pages/spa14/offers'));
const Spa14FeedbackPage = lazy(() => import('src/pages/spa14/feedback'));
const Spa14PromotionsPage = lazy(() => import('src/pages/spa14/promotions'));
const Spa14BranchesPage = lazy(() => import('src/pages/spa14/branches'));
const Spa14AccountPage = lazy(() => import('src/pages/spa14/account'));
const Spa14PartnersPage = lazy(() => import('src/pages/spa14/partners'));
const Spa14TreatmentsPage = lazy(() => import('src/pages/spa14/treatments'));
const Spa14BeforeAfterPage = lazy(() => import('src/pages/spa14/before-after'));
const Spa14FaqPage = lazy(() => import('src/pages/spa14/faq'));
const Spa14PolicyPage = lazy(() => import('src/pages/spa14/policy'));
const Spa14GalleryPage = lazy(() => import('src/pages/spa14/gallery'));
// Spa15
const Spa15Page = lazy(() => import('src/pages/spa15'));
const Spa15AboutPage = lazy(() => import('src/pages/spa15/about'));
const Spa15ServicesPage = lazy(() => import('src/pages/spa15/services'));
const Spa15ServiceDetailsPage = lazy(() => import('src/pages/spa15/service-details'));
const Spa15TrainingPage = lazy(() => import('src/pages/spa15/training'));
const Spa15BlogPage = lazy(() => import('src/pages/spa15/blog'));
const Spa15BlogDetailsPage = lazy(() => import('src/pages/spa15/blog-details'));
const Spa15CareersPage = lazy(() => import('src/pages/spa15/careers'));
const Spa15BookingPage = lazy(() => import('src/pages/spa15/booking'));
const Spa15ContactPage = lazy(() => import('src/pages/spa15/contact'));
const Spa15OffersPage = lazy(() => import('src/pages/spa15/offers'));
const Spa15FeedbackPage = lazy(() => import('src/pages/spa15/feedback'));
const Spa15PromotionsPage = lazy(() => import('src/pages/spa15/promotions'));
const Spa15BranchesPage = lazy(() => import('src/pages/spa15/branches'));
const Spa15AccountPage = lazy(() => import('src/pages/spa15/account'));
const Spa15PartnersPage = lazy(() => import('src/pages/spa15/partners'));
const Spa15PackagesPage = lazy(() => import('src/pages/spa15/packages'));
const Spa15BeforeAfterPage = lazy(() => import('src/pages/spa15/before-after'));
const Spa15FaqPage = lazy(() => import('src/pages/spa15/faq'));
const Spa15PolicyPage = lazy(() => import('src/pages/spa15/policy'));
const Spa15GalleryPage = lazy(() => import('src/pages/spa15/gallery'));
// Spa16
const Spa16Page = lazy(() => import('src/pages/spa16'));
const Spa16AboutPage = lazy(() => import('src/pages/spa16/about'));
const Spa16ServicesPage = lazy(() => import('src/pages/spa16/services'));
const Spa16ServiceDetailsPage = lazy(() => import('src/pages/spa16/service-details'));
const Spa16TrainingPage = lazy(() => import('src/pages/spa16/training'));
const Spa16BlogPage = lazy(() => import('src/pages/spa16/blog'));
const Spa16BlogDetailsPage = lazy(() => import('src/pages/spa16/blog-details'));
const Spa16CareersPage = lazy(() => import('src/pages/spa16/careers'));
const Spa16CareerDetailsPage = lazy(() => import('src/pages/spa16/career-details'));
const Spa16BookingPage = lazy(() => import('src/pages/spa16/booking'));
const Spa16ContactPage = lazy(() => import('src/pages/spa16/contact'));
const Spa16OffersPage = lazy(() => import('src/pages/spa16/offers'));
const Spa16FeedbackPage = lazy(() => import('src/pages/spa16/feedback'));
const Spa16PromotionsPage = lazy(() => import('src/pages/spa16/promotions'));
const Spa16BranchesPage = lazy(() => import('src/pages/spa16/branches'));
const Spa16AccountPage = lazy(() => import('src/pages/spa16/account'));
const Spa16PartnersPage = lazy(() => import('src/pages/spa16/partners'));
const Spa16TreatmentsPage = lazy(() => import('src/pages/spa16/treatments'));
const Spa16BeforeAfterPage = lazy(() => import('src/pages/spa16/before-after'));
const Spa16FaqPage = lazy(() => import('src/pages/spa16/faq'));
const Spa16PolicyPage = lazy(() => import('src/pages/spa16/policy'));
const Spa16GalleryPage = lazy(() => import('src/pages/spa16/gallery'));
// Spa17
const Spa17Page = lazy(() => import('src/pages/spa17'));
const Spa17AboutPage = lazy(() => import('src/pages/spa17/about'));
const Spa17ServicesPage = lazy(() => import('src/pages/spa17/services'));
const Spa17ServiceDetailsPage = lazy(() => import('src/pages/spa17/service-details'));
const Spa17TrainingPage = lazy(() => import('src/pages/spa17/training'));
const Spa17BlogPage = lazy(() => import('src/pages/spa17/blog'));
const Spa17BlogDetailsPage = lazy(() => import('src/pages/spa17/blog-details'));
const Spa17CareersPage = lazy(() => import('src/pages/spa17/careers'));
const Spa17CareerDetailsPage = lazy(() => import('src/pages/spa17/career-details'));
const Spa17BookingPage = lazy(() => import('src/pages/spa17/booking'));
const Spa17ContactPage = lazy(() => import('src/pages/spa17/contact'));
const Spa17OffersPage = lazy(() => import('src/pages/spa17/offers'));
const Spa17FeedbackPage = lazy(() => import('src/pages/spa17/feedback'));
const Spa17PromotionsPage = lazy(() => import('src/pages/spa17/promotions'));
const Spa17BranchesPage = lazy(() => import('src/pages/spa17/branches'));
const Spa17AccountPage = lazy(() => import('src/pages/spa17/account'));
const Spa17PartnersPage = lazy(() => import('src/pages/spa17/partners'));
const Spa17TreatmentsPage = lazy(() => import('src/pages/spa17/treatments'));
const Spa17BeforeAfterPage = lazy(() => import('src/pages/spa17/before-after'));
const Spa17FaqPage = lazy(() => import('src/pages/spa17/faq'));
const Spa17PolicyPage = lazy(() => import('src/pages/spa17/policy'));
const Spa17GalleryPage = lazy(() => import('src/pages/spa17/gallery'));
// Spa18
const Spa18Page = lazy(() => import('src/pages/spa18'));
const Spa18AboutPage = lazy(() => import('src/pages/spa18/about'));
const Spa18ServicesPage = lazy(() => import('src/pages/spa18/services'));
const Spa18ServiceDetailsPage = lazy(() => import('src/pages/spa18/service-details'));
const Spa18TrainingPage = lazy(() => import('src/pages/spa18/training'));
const Spa18BlogPage = lazy(() => import('src/pages/spa18/blog'));
const Spa18BlogDetailsPage = lazy(() => import('src/pages/spa18/blog-details'));
const Spa18CareersPage = lazy(() => import('src/pages/spa18/careers'));
const Spa18CareerDetailsPage = lazy(() => import('src/pages/spa18/career-details'));
const Spa18BookingPage = lazy(() => import('src/pages/spa18/booking'));
const Spa18ContactPage = lazy(() => import('src/pages/spa18/contact'));
const Spa18OffersPage = lazy(() => import('src/pages/spa18/offers'));
const Spa18FeedbackPage = lazy(() => import('src/pages/spa18/feedback'));
const Spa18PromotionsPage = lazy(() => import('src/pages/spa18/promotions'));
const Spa18BranchesPage = lazy(() => import('src/pages/spa18/branches'));
const Spa18AccountPage = lazy(() => import('src/pages/spa18/account'));
const Spa18PartnersPage = lazy(() => import('src/pages/spa18/partners'));
const Spa18TreatmentsPage = lazy(() => import('src/pages/spa18/treatments'));
const Spa18BeforeAfterPage = lazy(() => import('src/pages/spa18/before-after'));
const Spa18FaqPage = lazy(() => import('src/pages/spa18/faq'));
const Spa18PolicyPage = lazy(() => import('src/pages/spa18/policy'));
const Spa18GalleryPage = lazy(() => import('src/pages/spa18/gallery'));
// Spa19
const Spa19Page = lazy(() => import('src/pages/spa19'));
// Spa20
const Spa20Page = lazy(() => import('src/pages/spa20'));
// Spa21
const Spa21Page = lazy(() => import('src/pages/spa21'));
// Spa22
const Spa22Page = lazy(() => import('src/pages/spa22'));
// Spa23
const Spa23Page = lazy(() => import('src/pages/spa23'));
// Spa24
const Spa24Page = lazy(() => import('src/pages/spa24'));
// Spa25
const Spa25Page = lazy(() => import('src/pages/spa25'));
// Spa26
const Spa26Page = lazy(() => import('src/pages/spa26'));
// Spa27
const Spa27Page = lazy(() => import('src/pages/spa27'));
// Spa28
const Spa28Page = lazy(() => import('src/pages/spa28'));
// Spas listing
const SpasListingPage = lazy(() => import('src/pages/spas-listing'));
// Spa
const SpaAboutPage = lazy(() => import('src/pages/spa/about'));
const SpaServicesPage = lazy(() => import('src/pages/spa/services'));
const SpaServiceDetailsPage = lazy(() => import('src/pages/spa/service-details'));
const SpaTrainingPage = lazy(() => import('src/pages/spa/training'));
const SpaBlogPage = lazy(() => import('src/pages/spa/blog'));
const SpaBlogDetailsPage = lazy(() => import('src/pages/spa/blog-details'));
const SpaCareersPage = lazy(() => import('src/pages/spa/careers'));
const SpaOffersPage = lazy(() => import('src/pages/spa/offers'));
const SpaContactPage = lazy(() => import('src/pages/spa/contact'));
const SpaBookingPage = lazy(() => import('src/pages/spa/booking'));
const SpaGalleryPage = lazy(() => import('src/pages/spa/gallery'));
const SpaWellnessPage = lazy(() => import('src/pages/spa/wellness'));
const SpaMembershipPage = lazy(() => import('src/pages/spa/membership'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: <SpaMainLayout />,
        children: [
          {
            path: 'spa1',
            children: [
              { element: <Spa1Page />, index: true },
              { path: 'about', element: <Spa1AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa1ServicesPage />, index: true },
                  { path: ':slug', element: <Spa1ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa1TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa1BlogPage />, index: true },
                  { path: ':slug', element: <Spa1BlogDetailsPage /> },
                ],
              },
              { path: 'careers', element: <Spa1CareersPage /> },
              { path: 'booking', element: <Spa1BookingPage /> },
              { path: 'contact', element: <Spa1ContactPage /> },
              { path: 'offers', element: <Spa1OffersPage /> },
              { path: 'feedback', element: <Spa1FeedbackPage /> },
              { path: 'promotions', element: <Spa1PromotionsPage /> },
              { path: 'branches', element: <Spa1BranchesPage /> },
              { path: 'account', element: <Spa1AccountPage /> },
              { path: 'partners', element: <Spa1PartnersPage /> },
              { path: 'treatments', element: <Spa1TreatmentsPage /> },
              { path: 'before-after', element: <Spa1BeforeAfterPage /> },
              { path: 'faq', element: <Spa1FaqPage /> },
              { path: 'policy', element: <Spa1PolicyPage /> },
              { path: 'gallery', element: <Spa1GalleryPage /> },
            ],
          },
          {
            path: 'spa2',
            children: [
              { element: <Spa2Page />, index: true },
              { path: 'about', element: <Spa2AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa2ServicesPage />, index: true },
                  { path: ':slug', element: <Spa2ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa2TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa2BlogPage />, index: true },
                  { path: ':slug', element: <Spa2BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa2CareersPage />, index: true },
                  { path: ':id', element: <Spa2CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa2BookingPage /> },
              { path: 'contact', element: <Spa2ContactPage /> },
              { path: 'offers', element: <Spa2OffersPage /> },
              { path: 'feedback', element: <Spa2FeedbackPage /> },
              { path: 'promotions', element: <Spa2PromotionsPage /> },
              { path: 'branches', element: <Spa2BranchesPage /> },
              { path: 'account', element: <Spa2AccountPage /> },
              { path: 'partners', element: <Spa2PartnersPage /> },
              { path: 'treatments', element: <Spa2TreatmentsPage /> },
              { path: 'before-after', element: <Spa2BeforeAfterPage /> },
              { path: 'faq', element: <Spa2FaqPage /> },
              { path: 'policy', element: <Spa2PolicyPage /> },
              { path: 'gallery', element: <Spa2GalleryPage /> },
              // spa2-content-pages2
              { path: 'membership', element: <Spa2MembershipPage /> },
              { path: 'gift-card', element: <Spa2GiftCardPage /> },
              { path: 'wellness-package', element: <Spa2WellnessPackagePage /> },
              { path: 'skin-quiz', element: <Spa2SkinQuizPage /> },
              { path: 'corporate', element: <Spa2CorporatePage /> },
              { path: 'shop', element: <Spa2ShopPage /> },
              { path: 'sustainability', element: <Spa2SustainabilityPage /> },
              { path: 'events', element: <Spa2EventsPage /> },
              { path: 'referral', element: <Spa2ReferralPage /> },
              { path: 'app-download', element: <Spa2AppDownloadPage /> },
              // spa2-content-pages3
              { path: 'special-occasions', element: <Spa2SpecialOccasionsPage /> },
              { path: 'home-service', element: <Spa2HomeServicePage /> },
              { path: 'skin-diary', element: <Spa2SkinDiaryPage /> },
              { path: 'mindfulness', element: <Spa2MindfulnessPage /> },
              { path: 'medical-spa', element: <Spa2MedicalSpaPage /> },
              { path: 'spa-etiquette', element: <Spa2SpaEtiquettePage /> },
              { path: 'loyalty-rewards', element: <Spa2LoyaltyRewardsPage /> },
              { path: 'review', element: <Spa2ReviewPage /> },
              { path: 'seasonal-package', element: <Spa2SeasonalPackagePage /> },
              // spa2-content-pages4
              { path: 'nutrition', element: <Spa2NutritionPage /> },
              { path: 'consultation', element: <Spa2ConsultationPage /> },
              { path: 'vip-room', element: <Spa2VIPRoomPage /> },
              { path: 'package-builder', element: <Spa2PackageBuilderPage /> },
              { path: 'appointment', element: <Spa2AppointmentPage /> },
              { path: 'newsletter', element: <Spa2NewsletterPage /> },
              { path: 'press', element: <Spa2PressPage /> },
              { path: 'affiliate', element: <Spa2AffiliatePage /> },
              { path: 'spa-finder', element: <Spa2SpaFinderPage /> },
              { path: 'spa-menu', element: <Spa2SpaMenuPage /> },
              // spa2-content-pages5
              { path: 'ingredient-guide', element: <Spa2IngredientGuidePage /> },
              { path: 'skin-school', element: <Spa2SkinSchoolPage /> },
              { path: 'therapist-profile', element: <Spa2TherapistProfilePage /> },
              { path: 'sleep-wellness', element: <Spa2SleepWellnessPage /> },
              { path: 'prenatal-spa', element: <Spa2PrenatalSpaPage /> },
              { path: 'wellness-assessment', element: <Spa2WellnessAssessmentPage /> },
              // spa2-content-pages6
              { path: 'men-spa', element: <Spa2MenSpaPage /> },
              { path: 'hair-beauty', element: <Spa2HairBeautyPage /> },
              { path: 'kids-spa', element: <Spa2KidsSpaPage /> },
              { path: 'anti-aging', element: <Spa2AntiAgingPage /> },
              { path: 'water-therapy', element: <Spa2WaterTherapyPage /> },
              { path: 'ayurveda', element: <Spa2AyurvedaPage /> },
              { path: 'spa-hotel', element: <Spa2SpaHotelPage /> },
              { path: 'community', element: <Spa2CommunityPage /> },
              // spa2-content-pages8
              { path: 'franchise', element: <Spa2FranchisePage /> },
              { path: 'group-booking', element: <Spa2GroupBookingPage /> },
              { path: 'certificate-wall', element: <Spa2CertificateWallPage /> },
              { path: 'video-guide', element: <Spa2VideoGuidePage /> },
              // spa2-content-pages9
              { path: 'price-list', element: <Spa2PriceListPage /> },
              { path: 'wait-list', element: <Spa2WaitListPage /> },
              { path: 'voucher-check', element: <Spa2VoucherCheckPage /> },
              { path: 'accessibility', element: <Spa2AccessibilityPage /> },
            ],
          },
          {
            path: 'spa3',
            children: [
              { element: <Spa3Page />, index: true },
              { path: 'about', element: <Spa3AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa3ServicesPage />, index: true },
                  { path: ':slug', element: <Spa3ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa3TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa3BlogPage />, index: true },
                  { path: ':slug', element: <Spa3BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa3CareersPage />, index: true },
                  { path: ':id', element: <Spa3CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa3BookingPage /> },
              { path: 'contact', element: <Spa3ContactPage /> },
              { path: 'offers', element: <Spa3OffersPage /> },
              { path: 'feedback', element: <Spa3FeedbackPage /> },
              { path: 'promotions', element: <Spa3PromotionsPage /> },
              { path: 'branches', element: <Spa3BranchesPage /> },
              { path: 'account', element: <Spa3AccountPage /> },
              { path: 'partners', element: <Spa3PartnersPage /> },
              { path: 'treatments', element: <Spa3TreatmentsPage /> },
              { path: 'before-after', element: <Spa3BeforeAfterPage /> },
              { path: 'faq', element: <Spa3FaqPage /> },
              { path: 'policy', element: <Spa3PolicyPage /> },
              { path: 'gallery', element: <Spa3GalleryPage /> },
            ],
          },
          {
            path: 'spa4',
            children: [
              { element: <Spa4Page />, index: true },
              { path: 'about', element: <Spa4AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa4ServicesPage />, index: true },
                  { path: ':slug', element: <Spa4ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa4TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa4BlogPage />, index: true },
                  { path: ':slug', element: <Spa4BlogDetailsPage /> },
                ],
              },
              { path: 'careers', element: <Spa4CareersPage /> },
              { path: 'booking', element: <Spa4BookingPage /> },
              { path: 'contact', element: <Spa4ContactPage /> },
              { path: 'offers', element: <Spa4OffersPage /> },
              { path: 'feedback', element: <Spa4FeedbackPage /> },
              { path: 'promotions', element: <Spa4PromotionsPage /> },
              { path: 'branches', element: <Spa4BranchesPage /> },
              { path: 'account', element: <Spa4AccountPage /> },
              { path: 'partners', element: <Spa4PartnersPage /> },
              { path: 'packages', element: <Spa4PackagesPage /> },
              { path: 'before-after', element: <Spa4BeforeAfterPage /> },
              { path: 'faq', element: <Spa4FaqPage /> },
              { path: 'policy', element: <Spa4PolicyPage /> },
              { path: 'gallery', element: <Spa4GalleryPage /> },
            ],
          },
          {
            path: 'spa5',
            children: [
              { element: <Spa5Page />, index: true },
              { path: 'about', element: <Spa5AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa5ServicesPage />, index: true },
                  { path: ':slug', element: <Spa5ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa5TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa5BlogPage />, index: true },
                  { path: ':slug', element: <Spa5BlogDetailsPage /> },
                ],
              },
              { path: 'careers', element: <Spa5CareersPage /> },
              { path: 'booking', element: <Spa5BookingPage /> },
              { path: 'contact', element: <Spa5ContactPage /> },
              { path: 'offers', element: <Spa5OffersPage /> },
              { path: 'feedback', element: <Spa5FeedbackPage /> },
              { path: 'promotions', element: <Spa5PromotionsPage /> },
              { path: 'branches', element: <Spa5BranchesPage /> },
              { path: 'account', element: <Spa5AccountPage /> },
              { path: 'partners', element: <Spa5PartnersPage /> },
              { path: 'packages', element: <Spa5PackagesPage /> },
              { path: 'before-after', element: <Spa5BeforeAfterPage /> },
              { path: 'faq', element: <Spa5FaqPage /> },
              { path: 'policy', element: <Spa5PolicyPage /> },
              { path: 'gallery', element: <Spa5GalleryPage /> },
            ],
          },
          {
            path: 'spa6',
            children: [
              { element: <Spa6Page />, index: true },
              { path: 'about', element: <Spa6AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa6ServicesPage />, index: true },
                  { path: ':slug', element: <Spa6ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa6TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa6BlogPage />, index: true },
                  { path: ':slug', element: <Spa6BlogDetailsPage /> },
                ],
              },
              { path: 'careers', element: <Spa6CareersPage /> },
              { path: 'booking', element: <Spa6BookingPage /> },
              { path: 'contact', element: <Spa6ContactPage /> },
              { path: 'offers', element: <Spa6OffersPage /> },
              { path: 'feedback', element: <Spa6FeedbackPage /> },
              { path: 'promotions', element: <Spa6PromotionsPage /> },
              { path: 'branches', element: <Spa6BranchesPage /> },
              { path: 'account', element: <Spa6AccountPage /> },
              { path: 'partners', element: <Spa6PartnersPage /> },
              { path: 'packages', element: <Spa6PackagesPage /> },
              { path: 'before-after', element: <Spa6BeforeAfterPage /> },
              { path: 'faq', element: <Spa6FaqPage /> },
              { path: 'policy', element: <Spa6PolicyPage /> },
              { path: 'gallery', element: <Spa6GalleryPage /> },
            ],
          },
          {
            path: 'spa7',
            children: [
              { element: <Spa7Page />, index: true },
              { path: 'about', element: <Spa7AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa7ServicesPage />, index: true },
                  { path: ':slug', element: <Spa7ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa7TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa7BlogPage />, index: true },
                  { path: ':slug', element: <Spa7BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa7CareersPage />, index: true },
                  { path: ':id', element: <Spa7CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa7BookingPage /> },
              { path: 'contact', element: <Spa7ContactPage /> },
              { path: 'offers', element: <Spa7OffersPage /> },
              { path: 'feedback', element: <Spa7FeedbackPage /> },
              { path: 'promotions', element: <Spa7PromotionsPage /> },
              { path: 'branches', element: <Spa7BranchesPage /> },
              { path: 'account', element: <Spa7AccountPage /> },
              { path: 'partners', element: <Spa7PartnersPage /> },
              { path: 'treatments', element: <Spa7TreatmentsPage /> },
              { path: 'before-after', element: <Spa7BeforeAfterPage /> },
              { path: 'faq', element: <Spa7FaqPage /> },
              { path: 'policy', element: <Spa7PolicyPage /> },
              { path: 'gallery', element: <Spa7GalleryPage /> },
            ],
          },
          {
            path: 'spa8',
            children: [
              { element: <Spa8Page />, index: true },
              { path: 'about', element: <Spa8AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa8ServicesPage />, index: true },
                  { path: ':slug', element: <Spa8ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa8TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa8BlogPage />, index: true },
                  { path: ':slug', element: <Spa8BlogDetailsPage /> },
                ],
              },
              { path: 'careers', element: <Spa8CareersPage /> },
              { path: 'booking', element: <Spa8BookingPage /> },
              { path: 'contact', element: <Spa8ContactPage /> },
              { path: 'offers', element: <Spa8OffersPage /> },
              { path: 'feedback', element: <Spa8FeedbackPage /> },
              { path: 'promotions', element: <Spa8PromotionsPage /> },
              { path: 'branches', element: <Spa8BranchesPage /> },
              { path: 'account', element: <Spa8AccountPage /> },
              { path: 'partners', element: <Spa8PartnersPage /> },
              { path: 'packages', element: <Spa8PackagesPage /> },
              { path: 'before-after', element: <Spa8BeforeAfterPage /> },
              { path: 'faq', element: <Spa8FaqPage /> },
              { path: 'policy', element: <Spa8PolicyPage /> },
              { path: 'gallery', element: <Spa8GalleryPage /> },
            ],
          },
          {
            path: 'spa9',
            children: [
              { element: <Spa9Page />, index: true },
              { path: 'about', element: <Spa9AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa9ServicesPage />, index: true },
                  { path: ':slug', element: <Spa9ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa9TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa9BlogPage />, index: true },
                  { path: ':slug', element: <Spa9BlogDetailsPage /> },
                ],
              },
              { path: 'careers', element: <Spa9CareersPage /> },
              { path: 'booking', element: <Spa9BookingPage /> },
              { path: 'contact', element: <Spa9ContactPage /> },
              { path: 'offers', element: <Spa9OffersPage /> },
              { path: 'feedback', element: <Spa9FeedbackPage /> },
              { path: 'promotions', element: <Spa9PromotionsPage /> },
              { path: 'branches', element: <Spa9BranchesPage /> },
              { path: 'account', element: <Spa9AccountPage /> },
              { path: 'partners', element: <Spa9PartnersPage /> },
              { path: 'packages', element: <Spa9PackagesPage /> },
              { path: 'before-after', element: <Spa9BeforeAfterPage /> },
              { path: 'faq', element: <Spa9FaqPage /> },
              { path: 'policy', element: <Spa9PolicyPage /> },
              { path: 'gallery', element: <Spa9GalleryPage /> },
            ],
          },
          {
            path: 'spa10',
            children: [
              { element: <Spa10Page />, index: true },
              { path: 'about', element: <Spa10AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa10ServicesPage />, index: true },
                  { path: ':slug', element: <Spa10ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa10TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa10BlogPage />, index: true },
                  { path: ':slug', element: <Spa10BlogDetailsPage /> },
                ],
              },
              { path: 'careers', element: <Spa10CareersPage /> },
              { path: 'booking', element: <Spa10BookingPage /> },
              { path: 'contact', element: <Spa10ContactPage /> },
              { path: 'offers', element: <Spa10OffersPage /> },
              { path: 'feedback', element: <Spa10FeedbackPage /> },
              { path: 'promotions', element: <Spa10PromotionsPage /> },
              { path: 'branches', element: <Spa10BranchesPage /> },
              { path: 'account', element: <Spa10AccountPage /> },
              { path: 'partners', element: <Spa10PartnersPage /> },
              { path: 'packages', element: <Spa10PackagesPage /> },
              { path: 'before-after', element: <Spa10BeforeAfterPage /> },
              { path: 'faq', element: <Spa10FaqPage /> },
              { path: 'policy', element: <Spa10PolicyPage /> },
              { path: 'gallery', element: <Spa10GalleryPage /> },
            ],
          },
          {
            path: 'spa11',
            children: [
              { element: <Spa11Page />, index: true },
              { path: 'about', element: <Spa11AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa11ServicesPage />, index: true },
                  { path: ':slug', element: <Spa11ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa11TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa11BlogPage />, index: true },
                  { path: ':slug', element: <Spa11BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa11CareersPage />, index: true },
                  { path: ':id', element: <Spa11CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa11BookingPage /> },
              { path: 'contact', element: <Spa11ContactPage /> },
              { path: 'offers', element: <Spa11OffersPage /> },
              { path: 'feedback', element: <Spa11FeedbackPage /> },
              { path: 'promotions', element: <Spa11PromotionsPage /> },
              { path: 'branches', element: <Spa11BranchesPage /> },
              { path: 'account', element: <Spa11AccountPage /> },
              { path: 'partners', element: <Spa11PartnersPage /> },
              { path: 'treatments', element: <Spa11TreatmentsPage /> },
              { path: 'before-after', element: <Spa11BeforeAfterPage /> },
              { path: 'faq', element: <Spa11FaqPage /> },
              { path: 'policy', element: <Spa11PolicyPage /> },
              { path: 'gallery', element: <Spa11GalleryPage /> },
            ],
          },
          {
            path: 'spa12',
            element: <Spa12Page />,
            children: [
              { path: 'about', element: <Spa12AboutPage /> },
              { path: 'services', element: <Spa12ServicesPage /> },
              { path: 'services/:slug', element: <Spa12ServiceDetailsPage /> },
              { path: 'training', element: <Spa12TrainingPage /> },
              { path: 'blog', element: <Spa12BlogPage /> },
              { path: 'blog/:slug', element: <Spa12BlogDetailsPage /> },
              { path: 'careers', element: <Spa12CareersPage /> },
              { path: 'booking', element: <Spa12BookingPage /> },
              { path: 'contact', element: <Spa12ContactPage /> },
              { path: 'offers', element: <Spa12OffersPage /> },
              { path: 'feedback', element: <Spa12FeedbackPage /> },
              { path: 'promotions', element: <Spa12PromotionsPage /> },
              { path: 'branches', element: <Spa12BranchesPage /> },
              { path: 'account', element: <Spa12AccountPage /> },
              { path: 'partners', element: <Spa12PartnersPage /> },
              { path: 'packages', element: <Spa12PackagesPage /> },
              { path: 'before-after', element: <Spa12BeforeAfterPage /> },
              { path: 'faq', element: <Spa12FaqPage /> },
              { path: 'policy', element: <Spa12PolicyPage /> },
              { path: 'gallery', element: <Spa12GalleryPage /> },
            ],
          },
          {
            path: 'spa13',
            element: <Spa13Page />,
            children: [
              { path: 'about', element: <Spa13AboutPage /> },
              { path: 'services', element: <Spa13ServicesPage /> },
              { path: 'services/:slug', element: <Spa13ServiceDetailsPage /> },
              { path: 'training', element: <Spa13TrainingPage /> },
              { path: 'blog', element: <Spa13BlogPage /> },
              { path: 'blog/:slug', element: <Spa13BlogDetailsPage /> },
              { path: 'careers', element: <Spa13CareersPage /> },
              { path: 'booking', element: <Spa13BookingPage /> },
              { path: 'contact', element: <Spa13ContactPage /> },
              { path: 'offers', element: <Spa13OffersPage /> },
              { path: 'feedback', element: <Spa13FeedbackPage /> },
              { path: 'promotions', element: <Spa13PromotionsPage /> },
              { path: 'branches', element: <Spa13BranchesPage /> },
              { path: 'account', element: <Spa13AccountPage /> },
              { path: 'partners', element: <Spa13PartnersPage /> },
              { path: 'packages', element: <Spa13PackagesPage /> },
              { path: 'before-after', element: <Spa13BeforeAfterPage /> },
              { path: 'faq', element: <Spa13FaqPage /> },
              { path: 'policy', element: <Spa13PolicyPage /> },
              { path: 'gallery', element: <Spa13GalleryPage /> },
            ],
          },
          {
            path: 'spa14',
            children: [
              { element: <Spa14Page />, index: true },
              { path: 'about', element: <Spa14AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa14ServicesPage />, index: true },
                  { path: ':slug', element: <Spa14ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa14TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa14BlogPage />, index: true },
                  { path: ':slug', element: <Spa14BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa14CareersPage />, index: true },
                  { path: ':id', element: <Spa14CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa14BookingPage /> },
              { path: 'contact', element: <Spa14ContactPage /> },
              { path: 'offers', element: <Spa14OffersPage /> },
              { path: 'feedback', element: <Spa14FeedbackPage /> },
              { path: 'promotions', element: <Spa14PromotionsPage /> },
              { path: 'branches', element: <Spa14BranchesPage /> },
              { path: 'account', element: <Spa14AccountPage /> },
              { path: 'partners', element: <Spa14PartnersPage /> },
              { path: 'treatments', element: <Spa14TreatmentsPage /> },
              { path: 'before-after', element: <Spa14BeforeAfterPage /> },
              { path: 'faq', element: <Spa14FaqPage /> },
              { path: 'policy', element: <Spa14PolicyPage /> },
              { path: 'gallery', element: <Spa14GalleryPage /> },
            ],
          },
          {
            path: 'spa15',
            element: <Spa15Page />,
            children: [
              { path: 'about', element: <Spa15AboutPage /> },
              { path: 'services', element: <Spa15ServicesPage /> },
              { path: 'services/:slug', element: <Spa15ServiceDetailsPage /> },
              { path: 'training', element: <Spa15TrainingPage /> },
              { path: 'blog', element: <Spa15BlogPage /> },
              { path: 'blog/:slug', element: <Spa15BlogDetailsPage /> },
              { path: 'careers', element: <Spa15CareersPage /> },
              { path: 'booking', element: <Spa15BookingPage /> },
              { path: 'contact', element: <Spa15ContactPage /> },
              { path: 'offers', element: <Spa15OffersPage /> },
              { path: 'feedback', element: <Spa15FeedbackPage /> },
              { path: 'promotions', element: <Spa15PromotionsPage /> },
              { path: 'branches', element: <Spa15BranchesPage /> },
              { path: 'account', element: <Spa15AccountPage /> },
              { path: 'partners', element: <Spa15PartnersPage /> },
              { path: 'packages', element: <Spa15PackagesPage /> },
              { path: 'before-after', element: <Spa15BeforeAfterPage /> },
              { path: 'faq', element: <Spa15FaqPage /> },
              { path: 'policy', element: <Spa15PolicyPage /> },
              { path: 'gallery', element: <Spa15GalleryPage /> },
            ],
          },
          {
            path: 'spa16',
            children: [
              { element: <Spa16Page />, index: true },
              { path: 'about', element: <Spa16AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa16ServicesPage />, index: true },
                  { path: ':slug', element: <Spa16ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa16TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa16BlogPage />, index: true },
                  { path: ':slug', element: <Spa16BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa16CareersPage />, index: true },
                  { path: ':id', element: <Spa16CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa16BookingPage /> },
              { path: 'contact', element: <Spa16ContactPage /> },
              { path: 'offers', element: <Spa16OffersPage /> },
              { path: 'feedback', element: <Spa16FeedbackPage /> },
              { path: 'promotions', element: <Spa16PromotionsPage /> },
              { path: 'branches', element: <Spa16BranchesPage /> },
              { path: 'account', element: <Spa16AccountPage /> },
              { path: 'partners', element: <Spa16PartnersPage /> },
              { path: 'treatments', element: <Spa16TreatmentsPage /> },
              { path: 'before-after', element: <Spa16BeforeAfterPage /> },
              { path: 'faq', element: <Spa16FaqPage /> },
              { path: 'policy', element: <Spa16PolicyPage /> },
              { path: 'gallery', element: <Spa16GalleryPage /> },
            ],
          },
          {
            path: 'spa17',
            children: [
              { element: <Spa17Page />, index: true },
              { path: 'about', element: <Spa17AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa17ServicesPage />, index: true },
                  { path: ':slug', element: <Spa17ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa17TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa17BlogPage />, index: true },
                  { path: ':slug', element: <Spa17BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa17CareersPage />, index: true },
                  { path: ':id', element: <Spa17CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa17BookingPage /> },
              { path: 'contact', element: <Spa17ContactPage /> },
              { path: 'offers', element: <Spa17OffersPage /> },
              { path: 'feedback', element: <Spa17FeedbackPage /> },
              { path: 'promotions', element: <Spa17PromotionsPage /> },
              { path: 'branches', element: <Spa17BranchesPage /> },
              { path: 'account', element: <Spa17AccountPage /> },
              { path: 'partners', element: <Spa17PartnersPage /> },
              { path: 'treatments', element: <Spa17TreatmentsPage /> },
              { path: 'before-after', element: <Spa17BeforeAfterPage /> },
              { path: 'faq', element: <Spa17FaqPage /> },
              { path: 'policy', element: <Spa17PolicyPage /> },
              { path: 'gallery', element: <Spa17GalleryPage /> },
            ],
          },
          {
            path: 'spa18',
            children: [
              { element: <Spa18Page />, index: true },
              { path: 'about', element: <Spa18AboutPage /> },
              {
                path: 'services',
                children: [
                  { element: <Spa18ServicesPage />, index: true },
                  { path: ':slug', element: <Spa18ServiceDetailsPage /> },
                ],
              },
              { path: 'training', element: <Spa18TrainingPage /> },
              {
                path: 'blog',
                children: [
                  { element: <Spa18BlogPage />, index: true },
                  { path: ':slug', element: <Spa18BlogDetailsPage /> },
                ],
              },
              {
                path: 'careers',
                children: [
                  { element: <Spa18CareersPage />, index: true },
                  { path: ':id', element: <Spa18CareerDetailsPage /> },
                ],
              },
              { path: 'booking', element: <Spa18BookingPage /> },
              { path: 'contact', element: <Spa18ContactPage /> },
              { path: 'offers', element: <Spa18OffersPage /> },
              { path: 'feedback', element: <Spa18FeedbackPage /> },
              { path: 'promotions', element: <Spa18PromotionsPage /> },
              { path: 'branches', element: <Spa18BranchesPage /> },
              { path: 'account', element: <Spa18AccountPage /> },
              { path: 'partners', element: <Spa18PartnersPage /> },
              { path: 'treatments', element: <Spa18TreatmentsPage /> },
              { path: 'before-after', element: <Spa18BeforeAfterPage /> },
              { path: 'faq', element: <Spa18FaqPage /> },
              { path: 'policy', element: <Spa18PolicyPage /> },
              { path: 'gallery', element: <Spa18GalleryPage /> },
            ],
          },
          {
            path: 'spa19',
            element: <Spa19Page />,
          },
          {
            path: 'spa20',
            element: <Spa20Page />,
          },
          {
            path: 'spa21',
            element: <Spa21Page />,
          },
          {
            path: 'spa22',
            element: <Spa22Page />,
          },
          {
            path: 'spa23',
            element: <Spa23Page />,
          },
          {
            path: 'spa24',
            element: <Spa24Page />,
          },
          {
            path: 'spa25',
            element: <Spa25Page />,
          },
          {
            path: 'spa26',
            element: <Spa26Page />,
          },
          {
            path: 'spa27',
            element: <Spa27Page />,
          },
          {
            path: 'spa28',
            element: <Spa28Page />,
          },
          {
            path: 'spas-listing',
            element: <SpasListingPage />,
          },
          {
            path: 'about-us',
            element: <SpaAboutPage />,
          },
          {
            path: 'gioi-thieu',
            element: <SpaAboutPage />,
          },
          {
            path: 'services',
            children: [
              { element: <SpaServicesPage />, index: true },
              { path: ':slug', element: <SpaServiceDetailsPage /> },
            ],
          },
          {
            path: 'dich-vu',
            element: <SpaServicesPage />,
          },
          {
            path: 'training',
            element: <SpaTrainingPage />,
          },
          {
            path: 'dao-tao',
            element: <SpaTrainingPage />,
          },
          {
            path: 'blog',
            children: [
              { element: <SpaBlogPage />, index: true },
              { path: ':slug', element: <SpaBlogDetailsPage /> },
            ],
          },
          {
            path: 'careers',
            element: <SpaCareersPage />,
          },
          {
            path: 'tuyen-dung',
            element: <SpaCareersPage />,
          },
          {
            path: 'offers',
            element: <SpaOffersPage />,
          },
          {
            path: 'goi-uu-dai',
            element: <SpaOffersPage />,
          },
          {
            path: 'contact',
            element: <SpaContactPage />,
          },
          {
            path: 'contact-us',
            element: <SpaContactPage />,
          },
          {
            path: 'lien-he',
            element: <SpaContactPage />,
          },
          {
            path: 'booking-online',
            element: <SpaBookingPage />,
          },
          {
            path: 'dat-lich-online',
            element: <SpaBookingPage />,
          },
          {
            path: 'gallery',
            element: <SpaGalleryPage />,
          },
          {
            path: 'wellness-library',
            element: <SpaWellnessPage />,
          },
          {
            path: 'membership',
            element: <SpaMembershipPage />,
          },
          {
            path: 'faqs',
            element: <FaqsPage />,
          },
          {
            path: 'blank',
            element: <BlankPage />,
          },
          {
            path: 'product',
            children: [
              { element: <ProductListPage />, index: true },
              { path: 'list', element: <ProductListPage /> },
              { path: ':id', element: <ProductDetailsPage /> },
              { path: 'checkout', element: <ProductCheckoutPage /> },
            ],
          },
          {
            path: 'post',
            children: [
              { element: <PostListPage />, index: true },
              { path: 'list', element: <PostListPage /> },
              { path: ':title', element: <PostDetailsPage /> },
            ],
          },
        ],
      },
      {
        path: 'pricing',
        element: (
          <SimpleLayout>
            <PricingPage />
          </SimpleLayout>
        ),
      },
      {
        path: 'payment',
        element: (
          <SimpleLayout>
            <PaymentPage />
          </SimpleLayout>
        ),
      },
      {
        path: 'coming-soon',
        element: (
          <SimpleLayout content={{ compact: true }}>
            <ComingSoonPage />
          </SimpleLayout>
        ),
      },
      {
        path: 'maintenance',
        element: (
          <SimpleLayout content={{ compact: true }}>
            <MaintenancePage />
          </SimpleLayout>
        ),
      },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
