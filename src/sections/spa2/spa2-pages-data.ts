// ----------------------------------------------------------------------
// spa2 sub-pages – Nature & Wellness theme (teal / cream / sage)
// Distinct from spa1 (dark luxury) – soft, organic, airy, eco-friendly.
//
// All sample/demo content lives in src/_mock/_spa2 (the single source of
// truth shared with the dashboard mock API in src/api/spa2/mock). This file
// re-exports that data under its historical names, plus the spa2 theme
// color tokens, so existing imports across the app keep working unchanged.
//
// IMPORTANT: do not import data back from src/_mock/_spa2 into new local
// consts here — that previously created an import cycle. Only theme tokens
// (colors) should be defined in this file.
// ----------------------------------------------------------------------

export {
  spa2Team,
  spa2Faqs,
  spa2Offers,
  spa2Careers,
  spa2Gallery,
  spa2Services,
  spa2Branches,
  spa2Partners,
  spa2Policies,
  spa2Feedbacks,
  spa2Treatments,
  spa2Promotions,
  spa2AboutStory,
  spa2ContactInfo,
  spa2ComboOffers,
  spa2JoinReasons,
  spa2Instructors,
  SPA2_PAGE_IMAGES,
  spa2ServiceSteps,
  spa2VideoReviews,
  spa2BeforeAfters,
  spa2QualityCerts,
  spa2Technologies,
  SPA2_SERVICE_META,
  SPA2_PACKAGE_META,
  type Spa2BlogPost,
  spa2VisionMission,
  spa2CareersSlogan,
  spa2ExtraPartners,
  spa2Certifications,
  spa2Collaborations,
  spa2PartnerProfiles,
  spa2BookingPackages,
  spa2TrainingMission,
  spa2TrainingRoadmap,
  spa2TrainingPrograms,
  spa2WorkplaceGallery,
  spa2GraduateShowcase,
  spa2TreatmentProcess,
  spa2TreatmentExperts,
  SPA2_TESTIMONIAL_META,
  spa2ServiceCategories,
  spa2PartnerCategories,
  spa2RecruitmentProcess,
  spa2InternalVideoThumb,
  SPA2_POSTS as spa2BlogPosts,
  SPA2_BLOG_CATEGORIES as spa2BlogCategories,
} from 'src/_mock/_spa2';

// ---------- Theme tokens ---------------------------------------------

export const SPA2_TEAL = '#2E8B7A';
export const SPA2_TEAL_DARK = '#1D6B5C';
export const SPA2_TEAL_LIGHT = '#5AB5A3';
export const SPA2_CREAM = '#F9F6F1';
export const SPA2_CREAM_DARK = '#EFE8DC';
export const SPA2_SAGE = '#A8C5B8';
export const SPA2_WARM = '#E8DDD3';
export const SPA2_INK = '#1F2A28';
export const SPA2_LEAF = '#7BAE96';

