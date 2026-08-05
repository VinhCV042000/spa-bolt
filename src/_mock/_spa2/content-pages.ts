// ─────────────────────────────────────────────────────────────────────────────
// This generic "content page" (banner + services + packages + faqs + stats)
// system used to drive the remaining spa2 pages that didn't have a bespoke
// manage view yet, mirroring the /manage/services CRUD experience.
//
// NOTE: 'men-spa' / 'hair-beauty' / 'anti-aging' / 'water-therapy' /
// 'ayurveda' / 'spa-hotel' / 'community' / 'kids-spa' used to live here too,
// but they have since graduated to bespoke manage views
// (spa2-men-spa-manage-view.tsx / spa2-hair-beauty-manage-view.tsx /
// spa2-anti-aging-manage-view.tsx / spa2-water-therapy-manage-view.tsx /
// spa2-ayurveda-manage-view.tsx / spa2-spa-hotel-manage-view.tsx /
// spa2-community-manage-view.tsx / spa2-kids-spa-manage-view.tsx) backed by
// the shared src/_mock/_spa2/index.ts data that their public page views also
// consume — do not re-add these keys to this generic system. This file (and
// Spa2ContentPageManageView, which reads from it) is kept available but
// currently has no entries.
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

export type Spa2ContentPageKey = never;

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

export const SPA2_CONTENT_PAGES: Record<Spa2ContentPageKey, Spa2ContentPageData> = {};

export const SPA2_CONTENT_PAGE_KEYS = Object.keys(SPA2_CONTENT_PAGES) as Spa2ContentPageKey[];

// Wire public paths through paths.spa2 when they exist (fall back to inline
// string otherwise so this file stays decoupled from routes/paths ordering).
export function spa2ContentPublicPath(key: Spa2ContentPageKey): string {
  const p = (paths.spa2 as Record<string, unknown>)[
    key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  ];
  return typeof p === 'string' ? p : SPA2_CONTENT_PAGES[key].publicPath;
}
