import type { Spa2ManageConfig } from './spa2-generic-manage-view';

// ─────────────────────────────────────────────────────────────────────────────

// NOTE: 'membership' / 'gift-card' / 'wellness-package' / 'skin-quiz' /
// 'corporate' / 'shop' / 'sustainability' / 'events' / 'referral' /
// 'app-download' / 'special-occasions' / 'home-service' / 'skin-diary' /
// 'mindfulness' / 'medical-spa' / 'spa-etiquette' / 'loyalty-rewards' /
// 'review' / 'seasonal-package' / 'nutrition' / 'consultation' /
// 'vip-room' / 'package-builder' / 'appointment' / 'newsletter' / 'press' /
// 'affiliate' / 'spa-finder' / 'spa-menu' / 'ingredient-guide' /
// 'skin-school' / 'therapist-profile' / 'sleep-wellness' / 'video-guide' /
// 'price-list' / 'wait-list' / 'voucher-check' / 'accessibility' used to be
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
// spa2-wait-list-manage-view.tsx / spa2-voucher-check-manage-view.tsx /
// spa2-accessibility-manage-view.tsx)
// that share their catalog data with the public pages via src/_mock/_spa2 -
// so they were removed from this map. Every spa2 page now has a bespoke
// manage view; this generic flat-table system (Spa2ManageConfig /
// Spa2GenericManageView) is kept available but currently has no entries.

export const SPA2_MANAGE_CONFIGS: Record<string, Spa2ManageConfig> = {};
