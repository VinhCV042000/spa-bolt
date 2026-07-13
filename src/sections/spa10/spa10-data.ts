export type Spa10Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export const SPA10_HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
    alt: 'Misty Nordic forest',
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
    alt: 'Pine forest sauna',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
    alt: 'Winter wellness',
  },
  {
    src: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1920&q=80',
    alt: 'Hot spring onsen',
  },
];

export const SPA10_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
  sauna: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  cold: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=800&q=80',
  forest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
};

export const NORDIC_BLUE = '#0B1D35';
export const TEAL = '#00C9A7';
export const ICE = '#EAF9F6';
export const SILVER = '#8EACBD';

export const SPA10_RITUALS = [
  {
    icon: '🔥',
    name: {
      vi: 'Eldur — Nghi lễ Sauna',
      en: 'Eldur — The Sauna Ritual',
      fr: 'Eldur — Le Rituel du Sauna',
      cn: 'Eldur — 桑拿仪式',
      ar: 'إلدور — طقس الساونا',
    },
    subtitle: {
      vi: 'Lửa · Hơi nóng · Bạch dương',
      en: 'Fire · Heat · Birch',
      fr: 'Feu · Chaleur · Bouleau',
      cn: '火 · 热 · 桦木',
      ar: 'نار · حرارة · البتولا',
    },
    description: {
      vi: 'Sauna bạch dương Phần Lan 80°C với bó lá bạch dương tươi (löyly). Đổ nước trên đá granite đỏ, hít thở hơi bạch dương tinh khiết trong 15-20 phút. Làm mở lỗ chân lông, thải độc qua mồ hôi và giải phóng endorphin.',
      en: 'Finnish birch sauna at 80°C with fresh birch leaf bundles (löyly). Pour water over red granite stones, breathe pure birch steam for 15–20 minutes. Opens pores, detoxes through sweat and releases endorphins.',
      fr: "Sauna finlandais au bouleau à 80°C avec des fagots de feuilles de bouleau fraîches (löyly). Versez de l'eau sur les pierres de granite rouge, respirez la pure vapeur de bouleau pendant 15 à 20 minutes. Ouvre les pores, détoxifie par la sueur et libère des endorphines.",
      cn: '80°C 的芬兰桦木桑拿，配以新鲜桦树叶束（löyly）。将水浇在红色花岗岩石上，呼吸纯净的桦木蒸汽 15-20 分钟。打开毛孔，通过排汗排毒并释放内啡肽。',
      ar: 'ساونا البتولا الفنلندية عند 80°C مع حزم أوراق البتولا الطازجة (لويلي). اسكب الماء على أحجار الجرانيت الأحمر، وتنفّس بخار البتولا النقي لمدة 15–20 دقيقة. يفتح المسام، ويزيل السموم عبر العرق ويطلق الإندورفين.',
    },
    duration: { vi: '20 phút', en: '20 min', fr: '20 min', cn: '20 分钟', ar: '20 دقيقة' },
    temp: '80°C',
    color: '#E85D04',
  },
  {
    icon: '❄️',
    name: {
      vi: 'Is — Cold Plunge',
      en: 'Is — The Cold Plunge',
      fr: 'Is — Le Bain Froid',
      cn: 'Is — 冷水浴',
      ar: 'إيس — الغطس البارد',
    },
    subtitle: {
      vi: 'Băng · Sốc nhiệt · Tái sinh',
      en: 'Ice · Thermal shock · Rebirth',
      fr: 'Glace · Choc thermique · Renaissance',
      cn: '冰 · 热冲击 · 重生',
      ar: 'جليد · صدمة حرارية · ولادة جديدة',
    },
    description: {
      vi: 'Ngâm trong bồn nước 4°C trong 2-3 phút sau sauna. Sốc nhiệt kích thích hệ thống miễn dịch, tăng tuần hoàn đột ngột, giải phóng norepinephrine và adrenalin — cảm giác "alive" tức thì. Điều mà người Bắc Âu gọi là "the best high".',
      en: 'Plunge into 4°C water for 2–3 minutes after the sauna. Thermal shock stimulates the immune system, surges circulation, releases norepinephrine and adrenalin — an immediate feeling of being "alive". What Nordics call "the best high".',
      fr: "Plongez dans une eau à 4°C pendant 2 à 3 minutes après le sauna. Le choc thermique stimule le système immunitaire, intensifie la circulation, libère de la noradrénaline et de l'adrénaline — une sensation immédiate d'être « vivant ». Ce que les Nordiques appellent « le meilleur high ».",
      cn: '桑拿后浸入 4°C 的冷水中 2-3 分钟。热冲击刺激免疫系统，骤然加速血液循环，释放去甲肾上腺素和肾上腺素——一种立刻“活过来”的感觉。北欧人称之为“最佳快感”。',
      ar: 'اغطس في ماء بدرجة 4°C لمدة 2–3 دقائق بعد الساونا. تحفّز الصدمة الحرارية جهاز المناعة، وتزيد الدورة الدموية فجأة، وتطلق النورإبينفرين والأدرينالين — شعور فوري بأنك "حيّ". وهو ما يسميه أهل الشمال "أفضل نشوة".',
    },
    duration: { vi: '3 phút', en: '3 min', fr: '3 min', cn: '3 分钟', ar: '3 دقائق' },
    temp: '4°C',
    color: '#0096C7',
  },
  {
    icon: '🌲',
    name: {
      vi: 'Skog — Tắm Rừng',
      en: 'Skog — Forest Bathing',
      fr: 'Skog — Bain de Forêt',
      cn: 'Skog — 森林浴',
      ar: 'سكوغ — حمام الغابة',
    },
    subtitle: {
      vi: 'Rừng · Phytoncide · Bình an',
      en: 'Forest · Phytoncide · Peace',
      fr: 'Forêt · Phytoncides · Paix',
      cn: '森林 · 植物杀菌素 · 宁静',
      ar: 'غابة · فيتونسيد · سلام',
    },
    description: {
      vi: 'Friluftsliv — "cuộc sống ngoài trời tự do" của người Na Uy. Đi bộ chậm trong vườn thông, hít thở phytoncide (kháng sinh tự nhiên của cây). Kéo dài 30 phút để cortisol giảm đáng kể, NK cells (tế bào diệt ung thư) tăng lên.',
      en: "Friluftsliv — Norway's 'free outdoor life'. Slow walk through pine forest, breathing phytoncides (trees' natural antibiotics). 30-minute session significantly lowers cortisol and raises NK (cancer-killing) cells.",
      fr: 'Friluftsliv — la « vie libre en plein air » de la Norvège. Marche lente à travers la forêt de pins, en respirant les phytoncides (les antibiotiques naturels des arbres). Une séance de 30 minutes abaisse significativement le cortisol et augmente les cellules NK (tueuses de cancer).',
      cn: 'Friluftsliv——挪威的“自由户外生活”。在松林中缓步而行，呼吸植物杀菌素（树木的天然抗生素）。30 分钟的疗程能显著降低皮质醇并提升 NK（抗癌）细胞。',
      ar: 'فريلوفتسليف — "الحياة الحرة في الهواء الطلق" في النرويج. تمشّ ببطء عبر غابة الصنوبر، متنفّسًا الفيتونسيدات (المضادات الحيوية الطبيعية للأشجار). جلسة من 30 دقيقة تخفض الكورتيزول بشكل ملحوظ وترفع خلايا NK (القاتلة للسرطان).',
    },
    duration: { vi: '30 phút', en: '30 min', fr: '30 min', cn: '30 分钟', ar: '30 دقيقة' },
    temp: '18°C',
    color: '#2D6A4F',
  },
];

export const SPA10_SERVICES = [
  {
    name: {
      vi: 'Birch Leaf Massage',
      en: 'Birch Leaf Massage',
      fr: 'Birch Leaf Massage',
      cn: 'Birch Leaf Massage',
      ar: 'Birch Leaf Massage',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: { vi: '850.000₫', en: '850,000₫', fr: '850,000₫', cn: '850,000₫', ar: '850,000₫' },
  },
  {
    name: {
      vi: 'Baltic Sea Salt Scrub',
      en: 'Baltic Sea Salt Scrub',
      fr: 'Baltic Sea Salt Scrub',
      cn: 'Baltic Sea Salt Scrub',
      ar: 'Baltic Sea Salt Scrub',
    },
    duration: { vi: '45 phút', en: '45 min', fr: '45 min', cn: '45 分钟', ar: '45 دقيقة' },
    price: { vi: '620.000₫', en: '620,000₫', fr: '620,000₫', cn: '620,000₫', ar: '620,000₫' },
  },
  {
    name: {
      vi: 'Nordic Pine Wrap',
      en: 'Nordic Pine Wrap',
      fr: 'Nordic Pine Wrap',
      cn: 'Nordic Pine Wrap',
      ar: 'Nordic Pine Wrap',
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 分钟', ar: '75 دقيقة' },
    price: { vi: '980.000₫', en: '980,000₫', fr: '980,000₫', cn: '980,000₫', ar: '980,000₫' },
  },
  {
    name: {
      vi: 'Aurora Full Ritual (Sauna + Ice + Forest)',
      en: 'Aurora Full Ritual (Sauna + Ice + Forest)',
      fr: 'Aurora Full Ritual (Sauna + Ice + Forest)',
      cn: 'Aurora Full Ritual (Sauna + Ice + Forest)',
      ar: 'Aurora Full Ritual (Sauna + Ice + Forest)',
    },
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    price: {
      vi: '1.850.000₫',
      en: '1,850,000₫',
      fr: '1,850,000₫',
      cn: '1,850,000₫',
      ar: '1,850,000₫',
    },
  },
  {
    name: {
      vi: 'Couples Nordic Escape',
      en: 'Couples Nordic Escape',
      fr: 'Couples Nordic Escape',
      cn: 'Couples Nordic Escape',
      ar: 'Couples Nordic Escape',
    },
    duration: { vi: '150 phút', en: '150 min', fr: '150 min', cn: '150 分钟', ar: '150 دقيقة' },
    price: {
      vi: '3.200.000₫',
      en: '3,200,000₫',
      fr: '3,200,000₫',
      cn: '3,200,000₫',
      ar: '3,200,000₫',
    },
  },
];

export const SPA10_RITUAL_OPTIONS = {
  vi: [
    'Eldur — Sauna Ritual',
    'Is — Cold Plunge',
    'Skog — Forest Bathing',
    'Aurora Full Ritual',
    'Couples Escape',
  ],
  en: [
    'Eldur — Sauna Ritual',
    'Is — Cold Plunge',
    'Skog — Forest Bathing',
    'Aurora Full Ritual',
    'Couples Escape',
  ],
  fr: [
    'Eldur — Sauna Ritual',
    'Is — Cold Plunge',
    'Skog — Forest Bathing',
    'Aurora Full Ritual',
    'Couples Escape',
  ],
  cn: [
    'Eldur — Sauna Ritual',
    'Is — Cold Plunge',
    'Skog — Forest Bathing',
    'Aurora Full Ritual',
    'Couples Escape',
  ],
  ar: [
    'Eldur — Sauna Ritual',
    'Is — Cold Plunge',
    'Skog — Forest Bathing',
    'Aurora Full Ritual',
    'Couples Escape',
  ],
};
