// ─────────────────────────────────────────────────────────────────────────────
// Shared mock data for the one remaining spa2 "content page" (kids-spa).
//
// Each page is described by the same shape (banner + services + packages +
// faqs + stats) so a single dashboard manage view can drive all of them,
// mirroring the /manage/services CRUD experience.
//
// NOTE: 'men-spa' / 'hair-beauty' / 'anti-aging' / 'water-therapy' /
// 'ayurveda' / 'spa-hotel' / 'community' used to live here too, but they have
// since graduated to bespoke manage views (spa2-men-spa-manage-view.tsx /
// spa2-hair-beauty-manage-view.tsx / spa2-anti-aging-manage-view.tsx /
// spa2-water-therapy-manage-view.tsx / spa2-ayurveda-manage-view.tsx /
// spa2-spa-hotel-manage-view.tsx / spa2-community-manage-view.tsx) backed by
// the shared src/_mock/_spa2/index.ts data that their public page views also
// consume — do not re-add these keys to this generic system.
// ─────────────────────────────────────────────────────────────────────────────

import { paths } from 'src/routes/paths';

export type Spa2ContentStatus = 'published' | 'draft' | 'hidden';

export type Spa2ContentService = {
  id: string;
  name: string;
  desc: string;
  price: number;
  duration: string;
  icon: string;
  tags: string[];
  status: Spa2ContentStatus;
};

export type Spa2ContentPackage = {
  id: string;
  name: string;
  desc: string;
  price: number;
  sessions: string;
  hot?: boolean;
  status: Spa2ContentStatus;
};

export type Spa2ContentFaq = {
  id: string;
  q: string;
  a: string;
  status: Spa2ContentStatus;
};

export type Spa2ContentStat = { n: string; l: string };

export type Spa2ContentPageKey = 'kids-spa';

export type Spa2ContentPageData = {
  key: Spa2ContentPageKey;
  publicPath: string;
  title: string;
  navLabel: string;
  banner: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
  };
  accent: string;
  stats: Spa2ContentStat[];
  services: Spa2ContentService[];
  packages: Spa2ContentPackage[];
  faqs: Spa2ContentFaq[];
};

const IMG = {
  men: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80',
  hair: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
  kids: 'https://images.unsplash.com/photo-1596178060810-72660ee8d1ae?w=1200&q=80',
  antiAging: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80',
  water: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80',
  ayurveda: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  hotel: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1200&q=80',
  community: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
};

const svc = (
  id: string,
  name: string,
  price: number,
  duration: string,
  icon: string,
  desc: string,
  tags: string[]
): Spa2ContentService => ({
  id,
  name,
  price,
  duration,
  icon,
  desc,
  tags,
  status: 'published',
});

const pkg = (
  id: string,
  name: string,
  price: number,
  sessions: string,
  desc: string,
  hot = false
): Spa2ContentPackage => ({ id, name, price, sessions, desc, hot, status: 'published' });

const faq = (id: string, q: string, a: string): Spa2ContentFaq => ({
  id,
  q,
  a,
  status: 'published',
});

export const SPA2_CONTENT_PAGES: Record<Spa2ContentPageKey, Spa2ContentPageData> = {
  'kids-spa': {
    key: 'kids-spa',
    publicPath: '/spa2/kids-spa',
    title: 'Kids Spa',
    navLabel: 'Kids Spa',
    accent: '#F48FB1',
    banner: {
      eyebrow: 'SPA CHO TRẺ EM',
      title: 'Không gian spa an toàn cho các thiên thần nhỏ',
      subtitle: 'Sản phẩm 100% thiên nhiên, pH trung tính — được bác sĩ nhi khoa chứng nhận.',
      image: IMG.kids,
    },
    stats: [
      { n: '100%', l: 'Sản phẩm thiên nhiên' },
      { n: '5+', l: 'Tuổi có thể trải nghiệm' },
      { n: '6', l: 'Dịch vụ cho bé' },
      { n: '0', l: 'Hóa chất mạnh' },
    ],
    services: [
      svc(
        'k1',
        'Mini Facial Cho Bé',
        390000,
        '30 phút',
        'solar:face-scan-circle-bold-duotone',
        'Làm sạch nhẹ nhàng và dưỡng ẩm với sản phẩm 100% thiên nhiên, pH trung tính.',
        ['8–12 tuổi']
      ),
      svc(
        'k2',
        'Teen Skin Clear',
        590000,
        '45 phút',
        'solar:leaf-bold-duotone',
        'Kiểm soát dầu và mụn đầu đen giai đoạn dậy thì — không dùng hóa chất mạnh.',
        ['13–17 tuổi']
      ),
      svc(
        'k3',
        'Nail Art Cho Bé',
        290000,
        '45 phút',
        'solar:hand-heart-bold-duotone',
        'Sơn không độc hại, an toàn cho trẻ — màu sắc ngộ nghĩnh.',
        ['6–12 tuổi']
      ),
      svc(
        'k4',
        'Gội Đầu Thư Giãn',
        190000,
        '30 phút',
        'solar:magic-stick-3-bold-duotone',
        'Shampoo thảo mộc dành riêng cho trẻ, massage nhẹ nhàng.',
        ['5+ tuổi']
      ),
      svc(
        'k5',
        'Mẹ & Bé Spa Together',
        1290000,
        '90 phút',
        'solar:heart-bold-duotone',
        'Trải nghiệm spa song song — mẹ facial, bé nail — kỷ niệm đáng nhớ.',
        ['Mọi lứa tuổi']
      ),
      svc(
        'k6',
        'Birthday Princess Party',
        2490000,
        '120 phút',
        'solar:gift-bold-duotone',
        'Tiệc sinh nhật spa phong cách công chúa (nhóm 4+).',
        ['6–14 tuổi']
      ),
    ],
    packages: [
      pkg('kp1', 'Mommy & Me 4 buổi', 4590000, '4 lần', 'Combo mẹ & bé giá ưu đãi.'),
      pkg(
        'kp2',
        'Teen Clear Program',
        3990000,
        '6 lần',
        'Chương trình trị mụn dậy thì 3 tháng.',
        true
      ),
    ],
    faqs: [
      faq(
        'kf1',
        'Bé từ mấy tuổi có thể trải nghiệm?',
        'Từ 5 tuổi trở lên. Dịch vụ nail và gội đầu phù hợp cho bé nhỏ hơn với phụ huynh đi kèm.'
      ),
      faq(
        'kf2',
        'Sản phẩm dùng có an toàn không?',
        '100% sản phẩm hữu cơ, đã được kiểm định bởi bác sĩ nhi khoa.'
      ),
    ],
  },
};

export const SPA2_CONTENT_PAGE_KEYS = Object.keys(SPA2_CONTENT_PAGES) as Spa2ContentPageKey[];

// Wire public paths through paths.spa2 when they exist (fall back to inline
// string otherwise so this file stays decoupled from routes/paths ordering).
export function spa2ContentPublicPath(key: Spa2ContentPageKey): string {
  const p = (paths.spa2 as Record<string, unknown>)[
    key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  ];
  return typeof p === 'string' ? p : SPA2_CONTENT_PAGES[key].publicPath;
}
