/**
 * Generate dashboard/spa2 page files.
 * Run: node scripts/generate-dashboard-spa2-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pagesDir = path.join(root, 'src/pages/dashboard/spa2');

const PAGE_MAP = {
  'index.tsx': 'home',
  'about.tsx': 'about',
  'services.tsx': 'services',
  'service-details.tsx': 'service-details',
  'training.tsx': 'training',
  'blog.tsx': 'blog',
  'blog-details.tsx': 'blog-details',
  'careers.tsx': 'careers',
  'career-details.tsx': 'career-details',
  'booking.tsx': 'booking',
  'contact.tsx': 'contact',
  'offers.tsx': 'offers',
  'feedback.tsx': 'feedback',
  'promotions.tsx': 'promotions',
  'branches.tsx': 'branches',
  'account.tsx': 'account',
  'partners.tsx': 'partners',
  'treatments.tsx': 'treatments',
  'before-after.tsx': 'before-after',
  'faq.tsx': 'faq',
  'policy.tsx': 'policy',
  'gallery.tsx': 'gallery',
  'membership.tsx': 'membership',
  'gift-card.tsx': 'gift-card',
  'wellness-package.tsx': 'wellness-package',
  'skin-quiz.tsx': 'skin-quiz',
  'corporate.tsx': 'corporate',
  'shop.tsx': 'shop',
  'sustainability.tsx': 'sustainability',
  'events.tsx': 'events',
  'referral.tsx': 'referral',
  'app-download.tsx': 'app-download',
  'special-occasions.tsx': 'special-occasions',
  'home-service.tsx': 'home-service',
  'skin-diary.tsx': 'skin-diary',
  'mindfulness.tsx': 'mindfulness',
  'medical-spa.tsx': 'medical-spa',
  'spa-etiquette.tsx': 'spa-etiquette',
  'loyalty-rewards.tsx': 'loyalty-rewards',
  'review.tsx': 'review',
  'seasonal-package.tsx': 'seasonal-package',
  'nutrition.tsx': 'nutrition',
  'consultation.tsx': 'consultation',
  'vip-room.tsx': 'vip-room',
  'package-builder.tsx': 'package-builder',
  'appointment.tsx': 'appointment',
  'newsletter.tsx': 'newsletter',
  'press.tsx': 'press',
  'affiliate.tsx': 'affiliate',
  'spa-finder.tsx': 'spa-finder',
  'spa-menu.tsx': 'spa-menu',
  'ingredient-guide.tsx': 'ingredient-guide',
  'skin-school.tsx': 'skin-school',
  'therapist-profile.tsx': 'therapist-profile',
  'sleep-wellness.tsx': 'sleep-wellness',
  'prenatal-spa.tsx': 'prenatal-spa',
  'wellness-assessment.tsx': 'wellness-assessment',
};

const template = (pageKey) => `import { createDashboardSpa2Page } from 'src/sections/dashboard/spa2/create-dashboard-spa2-page';

export default createDashboardSpa2Page('${pageKey}');
`;

fs.mkdirSync(pagesDir, { recursive: true });

Object.entries(PAGE_MAP).forEach(([filename, pageKey]) => {
  const filePath = path.join(pagesDir, filename);
  fs.writeFileSync(filePath, template(pageKey));
  console.log('Created', filePath);
});

console.log(`\nGenerated ${Object.keys(PAGE_MAP).length} dashboard spa2 pages.`);
