// ----------------------------------------------------------------------

export const SPA_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1920&q=80',
  about: 'https://plus.unsplash.com/premium_photo-1690388930694-b8f5afb3c5d0?w=800&q=80',
  service1: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  service2: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  service3: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  service4: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80',
  gallery1: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
  gallery2: 'https://plus.unsplash.com/premium_photo-1661723420804-00b2984d63d7?w=600&q=80',
  gallery3: 'https://plus.unsplash.com/premium_photo-1683133898135-e48e3c6743c5?w=600&q=80',
  gallery4: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  booking: 'https://plus.unsplash.com/premium_photo-1664049362569-e65216ceb8ba?w=1200&q=80',
};

// Hero carousel slides for spa1
export const SPA1_HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1920&q=80',
    alt: 'Luxury treatment room',
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80',
    alt: 'Massage therapy',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80',
    alt: 'Facial treatment',
  },
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
    alt: 'Wellness spa',
  },
];

// Static (non-translatable) metadata. Text content lives in `src/locales/langs/{lng}/spa.json`
// and is matched to these entries by index.

export const SPA_ABOUT_FEATURE_ICONS = [
  'solar:heart-bold-duotone',
  'solar:leaf-bold-duotone',
  'solar:shield-check-bold-duotone',
];

export const SPA_SERVICE_META = [
  { icon: 'solar:hand-stars-bold-duotone', image: SPA_IMAGES.service1 },
  { icon: 'solar:face-scan-circle-bold-duotone', image: SPA_IMAGES.service2 },
  { icon: 'solar:body-bold-duotone', image: SPA_IMAGES.service3 },
  { icon: 'solar:leaf-bold-duotone', image: SPA_IMAGES.service4 },
];

export const SPA_AMENITY_ICONS = [
  'solar:bath-bold-duotone',
  'solar:water-sun-bold-duotone',
  'solar:meditation-round-bold-duotone',
  'solar:leaf-bold-duotone',
];

export const SPA_PACKAGE_META = [
  { price: 890000, popular: false },
  { price: 1590000, popular: true },
  { price: 2890000, popular: false },
];

export const SPA_TESTIMONIAL_META = [
  { rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
];
