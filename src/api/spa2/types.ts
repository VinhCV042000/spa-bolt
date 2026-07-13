// ----------------------------------------------------------------------

export type Spa2PageParams = {
  slug?: string;
  id?: string;
};

export type Spa2DataSource = 'api' | 'mock';

export type Spa2PageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'service-details'
  | 'training'
  | 'blog'
  | 'blog-details'
  | 'careers'
  | 'career-details'
  | 'booking'
  | 'contact'
  | 'offers'
  | 'feedback'
  | 'promotions'
  | 'branches'
  | 'account'
  | 'partners'
  | 'treatments'
  | 'before-after'
  | 'faq'
  | 'policy'
  | 'gallery'
  | 'membership'
  | 'gift-card'
  | 'wellness-package'
  | 'skin-quiz'
  | 'corporate'
  | 'shop'
  | 'sustainability'
  | 'events'
  | 'referral'
  | 'app-download'
  | 'special-occasions'
  | 'home-service'
  | 'skin-diary'
  | 'mindfulness'
  | 'medical-spa'
  | 'spa-etiquette'
  | 'loyalty-rewards'
  | 'review'
  | 'seasonal-package'
  | 'nutrition'
  | 'consultation'
  | 'vip-room'
  | 'package-builder'
  | 'appointment'
  | 'newsletter'
  | 'press'
  | 'affiliate'
  | 'spa-finder'
  | 'spa-menu'
  | 'ingredient-guide'
  | 'skin-school'
  | 'therapist-profile'
  | 'sleep-wellness'
  | 'prenatal-spa'
  | 'wellness-assessment';

export type Spa2PageConfig = {
  key: Spa2PageKey;
  title: string;
  description?: string;
  endpoint: (params?: Spa2PageParams) => string;
  getMockData: (params?: Spa2PageParams) => unknown;
  publicPath: (params?: Spa2PageParams) => string;
};

export type Spa2PageDataResult<T = unknown> = {
  data: T;
  source: Spa2DataSource;
  loading: boolean;
  error: unknown;
};
