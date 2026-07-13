export type Spa11Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export const SPA11_HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1920&q=80',
    alt: 'Moroccan hammam',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1920&q=80',
    alt: 'Zellige tile patterns',
  },
  {
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80',
    alt: 'Steam bath ritual',
  },
  {
    src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1920&q=80',
    alt: 'Argan oil treatment',
  },
];

export const SPA11_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1920&q=80',
  step1: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  step2: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
  step3: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  step4: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
  argan: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
};

export const TERRACOTTA = '#C24B2E';
export const ARGAN_GOLD = '#D4A017';
export const COBALT = '#1A3A6B';
export const CREAM_WARM = '#FDF3E3';

export const SPA11_STEPS = [
  {
    step: '01',
    arabic: 'الحمام',
    name: {
      vi: 'Taskheen — Xông hơi',
      en: 'Taskheen — Steam',
      fr: 'Taskheen — Vapeur',
      cn: 'Taskheen — 蒸汽',
      ar: 'تسخين — البخار',
    },
    description: {
      vi: 'Bước vào phòng hơi nóng ẩm 45°C trong 15 phút. Hơi thủy tinh mở lỗ chân lông, làm mềm da và chuẩn bị cho các bước tiếp theo.',
      en: 'Enter the humid steam room at 45°C for 15 minutes. Steam opens pores, softens skin and prepares for the following steps.',
      fr: 'Entrez dans le hammam humide à 45°C pendant 15 minutes. La vapeur ouvre les pores, adoucit la peau et prépare les étapes suivantes.',
      cn: '进入 45°C 的湿蒸房 15 分钟。蒸汽打开毛孔，软化肌肤，为接下来的步骤做准备。',
      ar: 'ادخل غرفة البخار الرطبة بدرجة حرارة 45 مئوية لمدة 15 دقيقة. يفتح البخار المسام ويلطف البشرة ويهيئها للخطوات التالية.',
    },
    color: TERRACOTTA,
    icon: '💨',
  },
  {
    step: '02',
    arabic: 'الكيس',
    name: {
      vi: 'Kessa — Tẩy da',
      en: 'Kessa — Exfoliation',
      fr: 'Kessa — Exfoliation',
      cn: 'Kessa — 去角质',
      ar: 'كيسة — التقشير',
    },
    description: {
      vi: 'Thợ kessa dùng găng tay thô kessa cạo nhẹ toàn thân theo vòng tròn. Hàng nghìn tế bào chết được lột ra — da non mịn màng lộ ra bên dưới.',
      en: 'The kessa master uses rough kessa gloves to gently scrub the whole body in circular motions. Thousands of dead cells are removed — revealing fresh smooth skin beneath.',
      fr: 'Le maître kessa utilise des gants kessa rugueux pour frotter délicatement tout le corps en mouvements circulaires. Des milliers de cellules mortes sont éliminées — révélant une peau neuve et lisse en dessous.',
      cn: 'Kessa 师傅用粗糙的 kessa 手套以画圈方式轻柔地擦拭全身。数千个死皮细胞被去除——露出下面光滑嫩白的新肌。',
      ar: 'يستخدم خبير الكيسة قفازات الكيسة الخشنة لفرك الجسم بالكامل بحركات دائرية لطيفة. تتم إزالة آلاف الخلايا الميتة — لتكشف عن بشرة جديدة ناعمة تحتها.',
    },
    color: ARGAN_GOLD,
    icon: '🤲',
  },
  {
    step: '03',
    arabic: 'الصابون',
    name: {
      vi: 'Beldi — Xà phòng đen',
      en: 'Beldi — Black Soap',
      fr: 'Beldi — Savon noir',
      cn: 'Beldi — 黑皂',
      ar: 'بلدي — الصابون الأسود',
    },
    description: {
      vi: 'Bôi xà phòng Beldi Morocco làm từ dầu olive và tinh dầu bạch đàn lên toàn thân, ủ 5 phút rồi rửa sạch. Kháng khuẩn tự nhiên, làm sạch sâu và dưỡng ẩm cùng lúc.',
      en: 'Apply Moroccan Beldi soap made from olive oil and eucalyptus essential oil over the whole body, leave 5 minutes then rinse. Naturally antibacterial, deeply cleansing and moisturising simultaneously.',
      fr: "Appliquez le savon Beldi marocain à base d'huile d'olive et d'huile essentielle d'eucalyptus sur tout le corps, laissez agir 5 minutes puis rincez. Antibactérien naturel, il nettoie en profondeur et hydrate en même temps.",
      cn: '将由橄榄油和桉树精油制成的摩洛哥 Beldi 黑皂涂抹全身，停留 5 分钟后冲洗。天然抗菌，在深层清洁的同时保湿。',
      ar: 'ضع صابون بلدي المغربي المصنوع من زيت الزيتون وزيت الأوكالبتوس على الجسم بالكامل، اتركه 5 دقائق ثم اشطفه. مضاد طبيعي للبكتيريا ينظف بعمق ويرطب في الوقت نفسه.',
    },
    color: '#4A3728',
    icon: '🧼',
  },
  {
    step: '04',
    arabic: 'أركان',
    name: {
      vi: 'Argan — Dưỡng kết thúc',
      en: 'Argan — Final nourishment',
      fr: 'Argan — Nutrition finale',
      cn: 'Argan — 最后滋养',
      ar: 'أركان — التغذية النهائية',
    },
    description: {
      vi: 'Thoa dầu argan nguyên chất Agadir lên toàn thân và mặt. Hoặc đắp mặt nạ rhassoul khoáng Atlas 10 phút cho da mịn và rạng rỡ. Kết thúc với trà bạc hà Marrakech.',
      en: 'Apply pure Agadir argan oil all over the body and face. Or apply Atlas rhassoul mineral clay mask for 10 minutes for smooth radiant skin. Finish with Marrakech mint tea.',
      fr: "Appliquez l'huile d'argan pure d'Agadir sur tout le corps et le visage. Ou appliquez un masque d'argile minérale rhassoul de l'Atlas pendant 10 minutes pour une peau lisse et éclatante. Terminez avec un thé à la menthe de Marrakech.",
      cn: '将纯正的 Agadir 阿甘油涂抹全身和面部。或敷上阿特拉斯 rhassoul 矿物泥膜 10 分钟，让肌肤光滑亮泽。最后享用马拉喀什薄荷茶。',
      ar: 'ضع زيت أركان النقي من أغادير على الجسم والوجه بالكامل. أو ضع قناع طين الغاسول المعدني من الأطلس لمدة 10 دقائق للحصول على بشرة ناعمة ومشرقة. اختم بشاي النعناع المراكشي.',
    },
    color: ARGAN_GOLD,
    icon: '✨',
  },
];

export const SPA11_PRODUCTS = [
  {
    name: {
      vi: 'Dầu Argan Agadir (100ml)',
      en: 'Agadir Argan Oil (100ml)',
      fr: "Huile d'argan d'Agadir (100ml)",
      cn: '阿甘油 Agadir（100ml）',
      ar: 'زيت أركان أغادير (100 مل)',
    },
    origin: {
      vi: 'Agadir, Maroc',
      en: 'Agadir, Morocco',
      fr: 'Agadir, Maroc',
      cn: '阿加迪尔，摩洛哥',
      ar: 'أغادير، المغرب',
    },
    price: { vi: '480.000₫', en: '480,000₫', fr: '480,000₫', cn: '480,000₫', ar: '480,000₫' },
    badge: { vi: 'Hữu cơ', en: 'Organic', fr: 'Bio', cn: '有机', ar: 'عضوي' },
  },
  {
    name: {
      vi: 'Xà phòng Beldi Fes (200g)',
      en: 'Beldi Soap Fes (200g)',
      fr: 'Savon Beldi de Fès (200g)',
      cn: 'Beldi 黑皂 Fes（200g）',
      ar: 'صابون بلدي فاس (200 غرام)',
    },
    origin: {
      vi: 'Fes, Maroc',
      en: 'Fes, Morocco',
      fr: 'Fès, Maroc',
      cn: '非斯，摩洛哥',
      ar: 'فاس، المغرب',
    },
    price: { vi: '220.000₫', en: '220,000₫', fr: '220,000₫', cn: '220,000₫', ar: '220,000₫' },
    badge: null,
  },
  {
    name: {
      vi: 'Đất sét Rhassoul Atlas (300g)',
      en: 'Atlas Rhassoul Clay (300g)',
      fr: "Argile Rhassoul de l'Atlas (300g)",
      cn: '阿特拉斯 Rhassoul 矿物泥（300g）',
      ar: 'طين الغاسول الأطلسي (300 غرام)',
    },
    origin: {
      vi: 'Dãy Atlas, Maroc',
      en: 'Atlas Mountains, Morocco',
      fr: "Montagnes de l'Atlas, Maroc",
      cn: '阿特拉斯山脉，摩洛哥',
      ar: 'جبال الأطلس، المغرب',
    },
    price: { vi: '350.000₫', en: '350,000₫', fr: '350,000₫', cn: '350,000₫', ar: '350,000₫' },
    badge: {
      vi: 'Tốt nhất',
      en: 'Best seller',
      fr: 'Meilleure vente',
      cn: '畅销',
      ar: 'الأكثر مبيعاً',
    },
  },
  {
    name: {
      vi: 'Bộ Hammam kit đầy đủ',
      en: 'Complete Hammam kit',
      fr: 'Kit Hammam complet',
      cn: '完整 Hammam 套装',
      ar: 'مجموعة الحمام الكاملة',
    },
    origin: {
      vi: 'Marrakech, Maroc',
      en: 'Marrakech, Morocco',
      fr: 'Marrakech, Maroc',
      cn: '马拉喀什，摩洛哥',
      ar: 'مراكش، المغرب',
    },
    price: { vi: '950.000₫', en: '950,000₫', fr: '950,000₫', cn: '950,000₫', ar: '950,000₫' },
    badge: {
      vi: 'Gift set',
      en: 'Gift set',
      fr: 'Coffret cadeau',
      cn: '礼品套装',
      ar: 'طقم هدايا',
    },
  },
];

export const SPA11_PACKAGES = {
  vi: [
    'Hammam Cơ bản (60 phút)',
    'Hammam + Argan Massage (90 phút)',
    'Hammam + Rhassoul + Massage (120 phút)',
    'Royal Hammam Trọn gói (150 phút)',
  ],
  en: [
    'Basic Hammam (60 min)',
    'Hammam + Argan Massage (90 min)',
    'Hammam + Rhassoul + Massage (120 min)',
    'Royal Hammam Full Package (150 min)',
  ],
  fr: [
    'Hammam de base (60 min)',
    "Hammam + Massage à l'argan (90 min)",
    'Hammam + Rhassoul + Massage (120 min)',
    'Forfait Royal Hammam complet (150 min)',
  ],
  cn: [
    '基础 Hammam（60 分钟）',
    'Hammam + 阿甘按摩（90 分钟）',
    'Hammam + Rhassoul + 按摩（120 分钟）',
    '皇家 Hammam 全套（150 分钟）',
  ],
  ar: [
    'حمام أساسي (60 دقيقة)',
    'حمام + تدليك بالأركان (90 دقيقة)',
    'حمام + غاسول + تدليك (120 دقيقة)',
    'حمام ملكي شامل (150 دقيقة)',
  ],
};
