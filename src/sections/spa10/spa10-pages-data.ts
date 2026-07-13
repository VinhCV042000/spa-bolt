import type { Spa10Lang } from './spa10-data';

// ----------------------------------------------------------------------
// COLOR PALETTE - Nordic Sauna & Cold Plunge
// ----------------------------------------------------------------------

export const NORDIC_BLUE = '#0B1D35';
export const TEAL = '#00C9A7';
export const ICE = '#EAF9F6';
export const SILVER = '#8EACBD';
export const FIRE = '#E85D04';
export const SNOW = '#7ECEF4';
export const WHITE = '#FFFFFF';

// ----------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------

function getLang<T extends Record<string, string>>(obj: T, lang: string): string {
  return obj[lang as Spa10Lang] || obj.en || '';
}

function formatVND(n: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(n)}₫`;
}

// ----------------------------------------------------------------------
// PAGE IMAGES
// ----------------------------------------------------------------------

export const SPA10_PAGE_IMAGES = {
  about: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  services: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  training: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  blog: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
  careers: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80',
  booking: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=1200&q=80',
  contact: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  offers: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  feedback: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
  promotions: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80',
  branches: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  account: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
  partners: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  packages: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=1200&q=80',
  beforeAfter: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
  faq: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
  policy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  gallery: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80',
};

// ----------------------------------------------------------------------
// SERVICES DATA
// ----------------------------------------------------------------------

export const SPA10_SERVICES = [
  {
    id: 'eldur-sauna-ritual',
    slug: 'eldur-sauna-ritual',
    name: {
      vi: 'Eldur — Nghi lễ Sauna',
      en: 'Eldur — The Sauna Ritual',
      fr: 'Eldur — Le Rituel du Sauna',
      cn: 'Eldur — 桑拿仪式',
      ar: 'إلدور — طقس الساونا',
    },
    category: {
      vi: 'Tắm nhiệt',
      en: 'Thermal Bath',
      fr: 'Bain Thermique',
      cn: '热浴',
      ar: 'الحمام الحراري',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: 850000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    color: FIRE,
    icon: 'solar:fire-bold-duotone',
    temp: '80°C',
    shortDesc: {
      vi: 'Sauna bạch dương Phần Lan 80°C với löyly (hơi bạch dương)',
      en: 'Finnish birch sauna at 80°C with löyly (birch steam)',
      fr: 'Sauna finlandais au bouleau à 80°C avec löyly',
      cn: '80°C 的芬兰桦木桑拿，配以 löyly（桦木蒸汽）',
      ar: 'ساونا البتولا الفنلندية عند 80°C مع لويلي',
    },
    fullDesc: {
      vi: 'Trải nghiệm sauna truyền thống Phần Lan với bó lá bạch dương tươi (löyly). Phòng gỗ bạch dương nung nóng đến 80°C, bạn sẽ đổ nước lên đá granite đỏ, tạo nên hơi nước thơm mát. Sauna mở lỗ chân lông, thải độc qua mồ hôi, giải phóng endorphin và mang lại cảm giác thư thái sâu.',
      en: 'Experience traditional Finnish sauna with fresh birch leaf bundles (löyly). Birch wood room heated to 80°C, you pour water over red granite stones creating aromatic steam. Sauna opens pores, detoxes through sweat, releases endorphins and brings deep relaxation.',
      fr: "Vivez le sauna finlandais traditionnel avec des fagots de feuilles de bouleau fraîches (löyly). La chambre en bois de bouleau chauffée à 80°C, vous versez de l'eau sur des pierres de granit rouge créant une vapeur aromatique.",
      cn: '体验传统的芬兰桑拿，配以新鲜桦树叶束（löyly）。桦木房加热至 80°C，您将水浇在红色花岗岩石上，营造出芳香蒸汽。桑拿打开毛孔，通过排汗排毒，释放内啡肽并带来深度放松。',
      ar: 'اختبر الساونا الفنلندية التقليدية مع حزم أوراق البتولا الطازجة (لويلي). غرفة خشب البتولا مدفأة لـ 80°C، تسكب الماء على أحجار الجرانيت الأحمر مُنشئًا بخارًا عطريًا.',
    },
    benefits: {
      vi: ['Thải độc qua mồ hôi', 'Mở lỗ chân lông', 'Giải phóng endorphin', 'Thư giãn sâu'],
      en: ['Detox through sweat', 'Open pores', 'Release endorphins', 'Deep relaxation'],
      fr: [
        'Détox par la sueur',
        'Ouvrir les pores',
        'Libérer des endorphines',
        'Relaxation profonde',
      ],
      cn: ['通过排汗排毒', '打开毛孔', '释放内啡肽', '深度放松'],
      ar: ['إزالة السموم عبر العرق', 'فتح المسام', 'إطلاق الإندورفين', 'استرخاء عميق'],
    },
  },
  {
    id: 'is-cold-plunge',
    slug: 'is-cold-plunge',
    name: {
      vi: 'Is — Cold Plunge',
      en: 'Is — The Cold Plunge',
      fr: 'Is — Le Bain Froid',
      cn: 'Is — 冷水浴',
      ar: 'إيس — الغطس البارد',
    },
    category: {
      vi: 'Tắm lạnh',
      en: 'Cold Therapy',
      fr: 'Thérapie par le Froid',
      cn: '冷疗',
      ar: 'العلاج البارد',
    },
    duration: { vi: '30 phút', en: '30 min', fr: '30 min', cn: '30 分钟', ar: '30 دقيقة' },
    price: 620000,
    image: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=800&q=80',
    color: SNOW,
    icon: 'solar:snowflake-bold-duotone',
    temp: '4°C',
    shortDesc: {
      vi: 'Ngâm nước lạnh 4°C sau sauna để sốc nhiệt và tái sinh',
      en: 'Cold plunge at 4°C after sauna for thermal shock and rebirth',
      fr: 'Plongeon à 4°C après le sauna pour choc thermique et renaissance',
      cn: '桑拿后浸入 4°C 冷水进行热冲击与重生',
      ar: 'غطس بارد عند 4°C بعد الساونا للصدمة الحرارية والبعث',
    },
    fullDesc: {
      vi: 'Ngâm trong bồn nước 4°C trong 2-3 phút sau sauna. Sốc nhiệt kích thích hệ thống miễn dịch, tăng tuần hoàn đột ngột, giải phóng norepinephrine và adrenalin — cảm giác "alive" tức thì. Điều mà người Bắc Âu gọi là "the best high".',
      en: 'Plunge into 4°C water for 2-3 minutes after sauna. Thermal shock stimulates the immune system, surges circulation, releases norepinephrine and adrenalin — an immediate feeling of being "alive". What Nordics call "the best high".',
      fr: "Plongez dans l'eau à 4°C pendant 2-3 minutes après le sauna. Le choc thermique stimule le système immunitaire, augmente la circulation, libère la noradrénaline et l'adrénaline.",
      cn: '桑拿后浸入 4°C 的冷水中 2-3 分钟。热冲击刺激免疫系统，骤然加速血液循环，释放去甲肾上腺素和肾上腺素——一种立刻“活过来”的感觉。',
      ar: 'اغطس في ماء بدرجة 4°C لمدة 2-3 دقائق بعد الساونا. الصدمة الحرارية تحفّز جهاز المناعة وتزيد الدورة الدموية وتطلق النورإبينفرين والأدرينالين.',
    },
    benefits: {
      vi: ['Kích thích miễn dịch', 'Tăng tuần hoàn', 'Tăng năng lượng', 'Săn chắc da'],
      en: ['Boost immunity', 'Increase circulation', 'Energy boost', 'Skin toning'],
      fr: ["Renforcer l'immunité", 'Augmenter la circulation', "Boost d'énergie", 'Tonification'],
      cn: ['增强免疫力', '促进循环', '提升能量', '紧致肌肤'],
      ar: ['تعزيز المناعة', 'زيادة الدورة الدموية', 'طاقة متجددة', 'شد البشرة'],
    },
  },
  {
    id: 'skog-forest-bathing',
    slug: 'skog-forest-bathing',
    name: {
      vi: 'Skog — Tắm Rừng',
      en: 'Skog — Forest Bathing',
      fr: 'Skog — Bain de Forêt',
      cn: 'Skog — 森林浴',
      ar: 'سكوغ — حمام الغابة',
    },
    category: {
      vi: 'Thiền thiên nhiên',
      en: 'Nature Meditation',
      fr: 'Méditation Nature',
      cn: '自然冥想',
      ar: 'تأمل الطبيعة',
    },
    duration: { vi: '45 phút', en: '45 min', fr: '45 min', cn: '45 分钟', ar: '45 دقيقة' },
    price: 750000,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    color: '#2D6A4F',
    icon: 'solar:leaf-bold-duotone',
    temp: '18°C',
    shortDesc: {
      vi: 'Friluftsliv — cuộc sống ngoài trời tự do của Na Uy',
      en: "Friluftsliv — Norway's free outdoor life",
      fr: 'Friluftsliv — vie libre en plein air norvégienne',
      cn: 'Friluftsliv——挪威的自由户外生活',
      ar: 'فريلوفتسليف — الحياة الحرة في الهواء الطلق النرويجية',
    },
    fullDesc: {
      vi: 'Friluftsliv — "cuộc sống ngoài trời tự do" của người Na Uy. Đi bộ chậm trong vườn thông, hít thở phytoncide (kháng sinh tự nhiên của cây). Kéo dài 30 phút để cortisol giảm đáng kể, NK cells (tế bào diệt ung thư) tăng lên.',
      en: 'Friluftsliv — Norway\'s "free outdoor life". Slow walk through pine forest, breathing phytoncides (trees\' natural antibiotics). 30-minute session significantly lowers cortisol and raises NK (cancer-killing) cells.',
      fr: 'Friluftsliv — la "vie libre en plein air" de la Norvège. Marche lente dans la forêt de pins, respirant les phytoncides. 30 minutes abaissent le cortisol et augmentent les cellules NK.',
      cn: 'Friluftsliv——挪威的"自由户外生活"。在松林中缓步而行，呼吸植物杀菌素。30 分钟的疗程能显著降低皮质醇并提升 NK 抗癌细胞。',
      ar: 'فريلوفتسليف — "الحياة الحرة في الهواء الطلق" النرويجية. مشي بطيء عبر غابة الصنوبر متنسّمًا الفيتونسيدات. 30 دقيقة تخفض الكورتيزول وترفع خلايا NK.',
    },
    benefits: {
      vi: ['Giảm cortisol', 'Tăng NK cells', 'Hít thở phytoncide', 'Bình an tâm trí'],
      en: ['Lower cortisol', 'Increase NK cells', 'Breathe phytoncides', 'Mental peace'],
      fr: ['Baisser le cortisol', 'Augmenter cellules NK', 'Respirer phytoncides', 'Paix mentale'],
      cn: ['降低皮质醇', '增强NK细胞', '呼吸植物杀菌素', '心境平和'],
      ar: ['خفض الكورتيزول', 'زيادة خلايا NK', 'تنفس الفيتونسيدات', 'سلام ذهني'],
    },
  },
  {
    id: 'birch-leaf-massage',
    slug: 'birch-leaf-massage',
    name: {
      vi: 'Birch Leaf Massage',
      en: 'Birch Leaf Massage',
      fr: 'Massage aux Feuilles de Bouleau',
      cn: '桦树叶按摩',
      ar: 'تدليك أوراق البتولا',
    },
    category: {
      vi: 'Massage trị liệu',
      en: 'Therapeutic Massage',
      fr: 'Massage Thérapeutique',
      cn: '治疗性按摩',
      ar: 'تدليك علاجي',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: 950000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    color: TEAL,
    icon: 'solar:leaf-bold-duotone',
    temp: '38°C',
    shortDesc: {
      vi: 'Massage với tinh dầu bạch dương Bắc Âu và muối biển Baltic',
      en: 'Massage with Nordic birch oil and Baltic sea salt',
      fr: "Massage à l'huile de bouleau nordique et sel de la Baltique",
      cn: '使用北欧桦木精油和波罗的海海盐按摩',
      ar: 'تدليك بزيت البتولا الشمالي وملح بحر البلطيق',
    },
    fullDesc: {
      vi: 'Massage toàn thân với tinh dầu bạch dương hữu cơ từ Scandinavia, kết hợp muối biển Baltic giàu khoáng. Kỹ thuật massage Thụy Điển (Swedish) với động tác effleurage và petrissage giúp thư giãn cơ, giảm căng thẳng và dưỡng ẩm da.',
      en: 'Full-body massage with organic birch oil from Scandinavia, combined with mineral-rich Baltic sea salt. Swedish massage technique with effleurage and petrissage strokes relaxes muscles, reduces stress and moisturizes skin.',
      fr: "Massage complet à l'huile de bouleau biologique de Scandinavie, combiné au sel marin riche en minéraux de la Baltique. Technique suédoise relaxe les muscles et hydrate la peau.",
      cn: '使用斯堪的纳维亚有机桦木精油，搭配富含矿物质的波罗的海海盐进行全身按摩。瑞典式按摩手法放松肌肉、减少压力并滋润肌肤。',
      ar: 'تدليك كامل بزيت البتولا العضوي من إسكندنافيا مع ملح بحر البلطيق الغني بالمعادن. تقنية السويدية ترخي العضلات وترطب البشرة.',
    },
    benefits: {
      vi: ['Thư giãn cơ', 'Dưỡng ẩm da', 'Giảm căng thẳng', 'Hương thơm bạch dương'],
      en: ['Muscle relaxation', 'Skin hydration', 'Stress reduction', 'Birch aroma'],
      fr: ['Relaxation musculaire', 'Hydratation', 'Réduction du stress', 'Arôme de bouleau'],
      cn: ['肌肉放松', '滋润肌肤', '减轻压力', '桦木芳香'],
      ar: ['ارتخاء العضلات', 'ترطيب البشرة', 'تخفيف التوتر', 'رائحة البتولا'],
    },
  },
  {
    id: 'aurora-full-ritual',
    slug: 'aurora-full-ritual',
    name: {
      vi: 'Aurora Full Ritual',
      en: 'Aurora Full Ritual',
      fr: 'Rituel Complet Aurora',
      cn: '极光完整仪式',
      ar: 'طقس أورورا الكامل',
    },
    category: {
      vi: 'Gói trải nghiệm',
      en: 'Experience Package',
      fr: 'Forfait Expérience',
      cn: '体验套餐',
      ar: 'باقة التجربة',
    },
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    price: 1850000,
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80',
    color: '#9D4EDD',
    icon: 'solar:star-bold-duotone',
    temp: '4-80°C',
    shortDesc: {
      vi: 'Trải nghiệm đầy đủ: Sauna + Cold Plunge + Forest Bathing',
      en: 'Complete experience: Sauna + Cold Plunge + Forest Bathing',
      fr: 'Expérience complète: Sauna + Bain Froid + Bain de Forêt',
      cn: '完整体验：桑拿 + 冷水浴 + 森林浴',
      ar: 'تجربة كاملة: ساونا + غطس بارد + حمام غابة',
    },
    fullDesc: {
      vi: 'Trải nghiệm trọn vẹn nghi lễ Bắc Âu: bắt đầu với 20 phút sauna bạch dương 80°C, tiếp theo là 3 phút cold plunge 4°C, và kết thúc với 30 phút forest bathing. Champagne và snack Bắc Âu được phục vụ sau liệu trình.',
      en: 'Complete Nordic ritual experience: start with 20 minutes of 80°C birch sauna, followed by 3 minutes of 4°C cold plunge, and finish with 30 minutes of forest bathing. Champagne and Nordic snacks served after.',
      fr: 'Expérience complète du rituel nordique: 20 min sauna, 3 min bain froid, 30 min bain de forêt. Champagne et snacks nordiques servis après.',
      cn: '完整的北欧仪式体验：以 20 分钟 80°C 桦木桑拿下手，接着 3 分钟 4°C 冷水浴，最后以 30 分钟森林浴结束。疗程后提供香槟和北欧小吃。',
      ar: 'تجربة طقس شمالي كاملة: 20 دقيقة ساونا، 3 دقائق غطس بارد، 30 دقيقة حمام غابة. يُقدّم الشامبانيا والوجبات الخفيفة الشمالية بعد الجلسة.',
    },
    benefits: {
      vi: ['Thải độc toàn thân', 'Tăng miễn dịch', 'Thư giãn sâu', 'Trải nghiệm Bắc Âu chuẩn'],
      en: ['Full body detox', 'Immune boost', 'Deep relaxation', 'Authentic Nordic experience'],
      fr: [
        'Détox corporelle',
        'Boost immunitaire',
        'Relaxation profonde',
        'Expérience nordique authentique',
      ],
      cn: ['全身排毒', '增强免疫', '深度放松', '正宗北欧体验'],
      ar: ['إزالة سموم كاملة', 'تعزيز المناعة', 'استرخاء عميق', 'تجربة شمالية أصيلة'],
    },
  },
  {
    id: 'couples-nordic-escape',
    slug: 'couples-nordic-escape',
    name: {
      vi: 'Couples Nordic Escape',
      en: 'Couples Nordic Escape',
      fr: 'Évasion Nordique en Couple',
      cn: '双人北欧逃离',
      ar: 'هروب شمالي للأزواج',
    },
    category: {
      vi: 'Dành cho đôi',
      en: 'Couples',
      fr: 'Couples',
      cn: '情侣',
      ar: 'للأزواج',
    },
    duration: { vi: '150 phút', en: '150 min', fr: '150 min', cn: '150 分钟', ar: '150 دقيقة' },
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    color: '#E07B38',
    icon: 'solar:heart-bold-duotone',
    temp: '4-80°C',
    shortDesc: {
      vi: 'Trải nghiệm Bắc Âu lãng mạn cho hai người',
      en: 'Romantic Nordic experience for two',
      fr: 'Expérience nordique romantique pour deux',
      cn: '双人浪漫北欧体验',
      ar: 'تجربة شمالية رومانسية لاثنين',
    },
    fullDesc: {
      vi: 'Trải nghiệm lãng mạn bắt đầu với private sauna cabin, cold plunge song song, massage song hành với tinh dầu bạch dương, và kết thúc với bữa tối nhẹ Nordic tapas cùng champagne dưới ánh nến.',
      en: 'Romantic experience starting with private sauna cabin, parallel cold plunge, simultaneous massage with birch oil, and finishing with Nordic tapas dinner and champagne by candlelight.',
      fr: 'Expérience romantique avec sauna privé, bain froid parallèle, massage simultané et dîner nordique aux chandelles.',
      cn: '浪漫体验以私人桑拿房开始，并行冷水浴，双人同时桦木精油按摩，最后在烛光下享用北欧小食晚餐与香槟。',
      ar: 'تجربة رومانسية تبدأ بSAUNA خاص وغطس بارد متوازن وتدليك مزدوج وعشاء نوردic على ضوء الشموع.',
    },
    benefits: {
      vi: ['Không gian riêng tư', 'Gắn kết tình cảm', 'Trải nghiệm lãng mạn', 'Đầy đủ tiện nghi'],
      en: ['Private space', 'Bonding experience', 'Romantic atmosphere', 'Full amenities'],
      fr: ['Espace privé', 'Expérience de couple', 'Atmosphère romantique', 'Tout confort'],
      cn: ['私密空间', '增进感情', '浪漫氛围', '设施齐全'],
      ar: ['مساحة خاصة', 'تجربة ربط', 'أجواء رومانسية', 'مرافق كاملة'],
    },
  },
];

// ----------------------------------------------------------------------
// TRAINING DATA
// ----------------------------------------------------------------------

export const SPA10_TRAINING = [
  {
    id: 1,
    title: {
      vi: 'Chứng chỉ Sauna Master',
      en: 'Sauna Master Certification',
      fr: 'Certification Maître Sauna',
      cn: '桑拿大师认证',
      ar: 'شهادة سيد الساونا',
    },
    duration: {
      vi: '2 tháng (80 giờ)',
      en: '2 months (80 hours)',
      fr: '2 mois (80 heures)',
      cn: '2个月（80小时）',
      ar: 'شهران (80 ساعة)',
    },
    level: {
      vi: 'Cơ bản',
      en: 'Foundation',
      fr: 'Fondamental',
      cn: '基础',
      ar: 'أساسي',
    },
    price: 8000000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    color: FIRE,
    description: {
      vi: 'Khóa học chuyên sâu về kỹ thuật sauna Phần Lan: nhiệt động học, löyly, quy trình an toàn và trải nghiệm khách hàng.',
      en: 'In-depth course on Finnish sauna techniques: thermodynamics, löyly, safety protocols and guest experience.',
      fr: 'Cours approfondi sur les techniques de sauna finlandais: thermodynamique, löyly, protocoles de sécurité.',
      cn: '芬兰桑拿技术深度课程：热力学、löyly、安全规程与客户体验。',
      ar: 'دورة متعمقة في تقنيات الساونا الفنلندية: الديناميكا الحرارية ولويلي وبروتوكولات السلامة.',
    },
    modules: {
      vi: [
        'Lịch sử Sauna Bắc Âu',
        'Nhiệt động học 80°C',
        'Kỹ thuật Löyly',
        'An toàn & Sức khỏe',
        'Thực hành 30 giờ',
      ],
      en: [
        'Nordic Sauna History',
        'Thermodynamics at 80°C',
        'Löyly Technique',
        'Safety & Health',
        '30-hour Practice',
      ],
      fr: [
        'Histoire du Sauna Nordique',
        'Thermodynamique à 80°C',
        'Technique Löyly',
        'Sécurité & Santé',
        '30h de Pratique',
      ],
      cn: ['北欧桑拿历史', '80°C热力学', 'Löyly技法', '安全与健康', '30小时实践'],
      ar: [
        'تاريخ الساونا الشمالية',
        'الديناميكا الحرارية عند 80°C',
        'تقنية لويلي',
        'السلامة والصحة',
        '30 ساعة تدريب',
      ],
    },
  },
  {
    id: 2,
    title: {
      vi: 'Cold Therapy Specialist',
      en: 'Cold Therapy Specialist',
      fr: 'Spécialiste Thérapie par le Froid',
      cn: '冷疗专家',
      ar: 'أخصائي العلاج البارد',
    },
    duration: {
      vi: '1 tháng (40 giờ)',
      en: '1 month (40 hours)',
      fr: '1 mois (40 heures)',
      cn: '1个月（40小时）',
      ar: 'شهر واحد (40 ساعة)',
    },
    level: {
      vi: 'Nâng cao',
      en: 'Advanced',
      fr: 'Avancé',
      cn: '高级',
      ar: 'متقدم',
    },
    price: 6000000,
    image: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=800&q=80',
    color: SNOW,
    description: {
      vi: 'Đào tạo chuyên sâu về liệu pháp lạnh: Wim Hof method, cold plunge, phản ứng sinh học và hướng dẫn khách.',
      en: 'Advanced training in cold therapy: Wim Hof method, cold plunge, biological responses and guest guidance.',
      fr: 'Formation avancée en thérapie par le froid: méthode Wim Hof, bain froid, réponses biologiques.',
      cn: '冷疗深度培训：Wim Hof 方法、冷水浴、生理反应与客户指导。',
      ar: 'تدريب متقدم في العلاج البارد: طريقة ويم هوف والغطس البارد والاستجابات البيولوجية.',
    },
    modules: {
      vi: [
        'Phương pháp Wim Hof',
        'Sinh lý lạnh',
        'Cold Plunge 4°C',
        'Hướng dẫn khách',
        'Thực hành 20 giờ',
      ],
      en: [
        'Wim Hof Method',
        'Cold Physiology',
        'Cold Plunge at 4°C',
        'Guest Guidance',
        '20-hour Practice',
      ],
      fr: [
        'Méthode Wim Hof',
        'Physiologie du Froid',
        'Bain Froid à 4°C',
        'Guidage Client',
        '20h de Pratique',
      ],
      cn: ['Wim Hof 方法', '冷生理学', '4°C 冷水浴', '客户指导', '20小时实践'],
      ar: ['طريقة ويم هوف', 'فسيولوجيا البرد', 'غطس بارد عند 4°C', 'توجيه الضيوف', '20 ساعة تدريب'],
    },
  },
  {
    id: 3,
    title: {
      vi: 'Forest Therapy Guide',
      en: 'Forest Therapy Guide',
      fr: 'Guide de Thérapie Forestière',
      cn: '森林疗法导师',
      ar: 'دليل العلاج بالغابة',
    },
    duration: {
      vi: '3 tháng (90 giờ)',
      en: '3 months (90 hours)',
      fr: '3 mois (90 heures)',
      cn: '3个月（90小时）',
      ar: '3 أشهر (90 ساعة)',
    },
    level: {
      vi: 'Trung cấp',
      en: 'Intermediate',
      fr: 'Intermédiaire',
      cn: '中级',
      ar: 'متوسط',
    },
    price: 10000000,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    color: '#2D6A4F',
    description: {
      vi: 'Làm chủ Friluftsliv và Shinrin-yoku: dẫn dắt thiền đi bộ, phytoncide, và kết nối thiên nhiên.',
      en: 'Master Friluftsliv and Shinrin-yoku: guiding walking meditation, phytoncides, and nature connection.',
      fr: 'Maîtriser Friluftsliv et Shinrin-yoku: méditation marchée, phytoncides, connexion nature.',
      cn: '掌握 Friluftsliv 与森林浴：引导步行冥想、植物杀菌素与自然连接。',
      ar: 'إتقان فريلوفتسليف وشينرين-يوكو: التأمل في المشي والفيتونسيدات والاتصال بالطبيعة.',
    },
    modules: {
      vi: [
        'Triết lý Friluftsliv',
        'Phytoncide & NK Cells',
        'Thiền đi bộ',
        'An toàn rừng',
        'Thực hành 40 giờ',
      ],
      en: [
        'Friluftsliv Philosophy',
        'Phytoncide & NK Cells',
        'Walking Meditation',
        'Forest Safety',
        '40-hour Practice',
      ],
      fr: [
        'Philosophie Friluftsliv',
        'Phytoncides & Cellules NK',
        'Méditation Marchée',
        'Sécurité Forêt',
        '40h de Pratique',
      ],
      cn: ['Friluftsliv 哲学', '植物杀菌素与NK细胞', '步行冥想', '森林安全', '40小时实践'],
      ar: [
        'فلسفة فريلوفتسليف',
        'الفيتونسيدات وخلايا NK',
        'تأمل المشي',
        'سلامة الغابة',
        '40 ساعة تدريب',
      ],
    },
  },
];

// ----------------------------------------------------------------------
// BLOG DATA
// ----------------------------------------------------------------------

export const SPA10_BLOG = [
  {
    id: 1,
    slug: 'science-of-sauna',
    title: {
      vi: 'Khoa học đằng sau Sauna Phần Lan',
      en: 'The Science Behind Finnish Sauna',
      fr: 'La Science du Sauna Finlandais',
      cn: '芬兰桑拿背后的科学',
      ar: 'علم الساونا الفنلندية',
    },
    excerpt: {
      vi: 'Khám phá các lợi ích khoa học已被 chứng minh của sauna: tim mạch, miễn dịch và sức khỏe tinh thần.',
      en: 'Discover the scientifically proven benefits of sauna: cardiovascular, immune and mental health.',
      fr: 'Découvrez les bienfaits scientifiquement prouvés du sauna: cardiovasculaire, immunité et santé mentale.',
      cn: '探索已被科学证实的桑拿益处：心血管、免疫与心理健康。',
      ar: 'اكتشف الفوائد العلمية المثبتة للساونا: القلب والأوعية الدموية والمناعة والصحة النفسية.',
    },
    category: {
      vi: 'Khoa học',
      en: 'Science',
      fr: 'Science',
      cn: '科学',
      ar: 'العلم',
    },
    date: '2025-06-10',
    author: 'Dr. Lars Eriksson',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    readTime: { vi: '10 phút', en: '10 min', fr: '10 min', cn: '10 分钟', ar: '10 دقائق' },
  },
  {
    id: 2,
    slug: 'wim-hof-method',
    title: {
      vi: 'Phương pháp Wim Hof & Cold Plunge',
      en: 'Wim Hof Method & Cold Plunge',
      fr: 'Méthode Wim Hof & Bain Froid',
      cn: 'Wim Hof 方法与冷水浴',
      ar: 'طريقة ويم هوف والغطس البارد',
    },
    excerpt: {
      vi: 'Học cách kết hợp hơi lạnh, thở và tư duy để tối ưu hóa sức khỏe.',
      en: 'Learn to combine cold exposure, breathing and mindset for optimal health.',
      fr: "Apprenez à combiner exposition au froid, respiration et état d'esprit.",
      cn: '学习如何结合冷暴露、呼吸和心态以获得最佳健康。',
      ar: 'تعرّف كيف تجمع بين التعرض للبرد والتنفس والعقلية للصحة المثلى.',
    },
    category: {
      vi: 'Kỹ thuật',
      en: 'Technique',
      fr: 'Technique',
      cn: '技术',
      ar: 'التقنية',
    },
    date: '2025-05-22',
    author: 'Mikael Svensson',
    image: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=800&q=80',
    readTime: { vi: '8 phút', en: '8 min', fr: '8 min', cn: '8 分钟', ar: '8 دقائق' },
  },
  {
    id: 3,
    slug: 'friluftsliv-philosophy',
    title: {
      vi: 'Friluftsliv: Triết lý户外 Na Uy',
      en: 'Friluftsliv: The Norwegian Outdoor Philosophy',
      fr: 'Friluftsliv: La Philosophie Norvégienne',
      cn: 'Friluftsliv：挪威户外哲学',
      ar: 'فريلوفتسليف: فلسفة الهواء الطلق النرويجية',
    },
    excerpt: {
      vi: 'Hiểu sâu về cuộc sống ngoài trời tự do và cách nó thay đổi cách Nordic nhìn thế giới.',
      en: 'Deep dive into "free outdoor life" and how it transforms the Nordic worldview.',
      fr: 'Plongée dans la "vie libre en plein air" et comment elle transforme la vision nordique.',
      cn: '深入了解"自由户外生活"及其如何改变北欧人的世界观。',
      ar: 'تعمّق في "الحياة الحرة في الهواء الطلق" وكيف تغيّر النظرة الشمالية للعالم.',
    },
    category: {
      vi: 'Lối sống',
      en: 'Lifestyle',
      fr: 'Mode de vie',
      cn: '生活方式',
      ar: 'نمط الحياة',
    },
    date: '2025-04-15',
    author: 'Ingrid Hansen',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    readTime: { vi: '7 phút', en: '7 min', fr: '7 min', cn: '7 分钟', ar: '7 دقائق' },
  },
];

// ----------------------------------------------------------------------
// CAREERS DATA
// ----------------------------------------------------------------------

export const SPA10_CAREERS = [
  {
    id: 1,
    title: {
      vi: 'Sauna Master',
      en: 'Sauna Master',
      fr: 'Maître Sauna',
      cn: '桑拿大师',
      ar: 'سيد الساونا',
    },
    department: {
      vi: 'Liệu trình nhiệt',
      en: 'Thermal Treatments',
      fr: 'Soins Thermiques',
      cn: '热疗',
      ar: 'العلاجات الحرارية',
    },
    location: {
      vi: 'Hà Nội',
      en: 'Hanoi',
      fr: 'Hanoï',
      cn: '河内',
      ar: 'هانوي',
    },
    type: {
      vi: 'Toàn thời gian',
      en: 'Full-time',
      fr: 'Temps plein',
      cn: '全职',
      ar: 'دوام كامل',
    },
    salary: {
      vi: '18-25 triệu/tháng',
      en: '18-25 million/month',
      fr: '18-25 millions/mois',
      cn: '1800-2500万越盾/月',
      ar: '18-25 مليون/شهر',
    },
    description: {
      vi: 'Quản lý phòng sauna, điều chỉnh nhiệt độ, tạo löyly và hướng dẫn khách.',
      en: 'Manage sauna room, adjust temperature, create löyly and guide guests.',
      fr: 'Gérer la salle de sauna, régler la température, créer le löyly et guider les clients.',
      cn: '管理桑拿房、调节温度、制作 löyly 并引导客人。',
      ar: 'إدارة غرفة الساونا وضبط درجة الحرارة وإنشاء لويلي وتوجيه الضيوف.',
    },
  },
  {
    id: 2,
    title: {
      vi: 'Cold Plunge Specialist',
      en: 'Cold Plunge Specialist',
      fr: 'Spécialiste Bain Froid',
      cn: '冷水浴专家',
      ar: 'أخصائي الغطس البارد',
    },
    department: {
      vi: 'Liệu pháp lạnh',
      en: 'Cold Therapy',
      fr: 'Thérapie par le Froid',
      cn: '冷疗',
      ar: 'العلاج البارد',
    },
    location: {
      vi: 'TP.HCM',
      en: 'Ho Chi Minh',
      fr: 'Ho Chi Minh',
      cn: '胡志明市',
      ar: 'هو تشي مينه',
    },
    type: {
      vi: 'Toàn thời gian',
      en: 'Full-time',
      fr: 'Temps plein',
      cn: '全职',
      ar: 'دوام كامل',
    },
    salary: {
      vi: '15-22 triệu/tháng',
      en: '15-22 million/month',
      fr: '15-22 millions/mois',
      cn: '1500-2200万越盾/月',
      ar: '15-22 مليون/شهر',
    },
    description: {
      vi: 'Hướng dẫn khách cold plunge, đảm bảo an toàn và tạo trải nghiệm tích cực.',
      en: 'Guide guests through cold plunge, ensure safety and create positive experience.',
      fr: 'Guider les clients dans le bain froid, assurer la sécurité et créer une expérience positive.',
      cn: '引导客人进行冷水浴，确保安全并创造积极体验。',
      ar: 'توجيه الضيوف في الغطس البارد وضمان السلامة وخلق تجربة إيجابية.',
    },
  },
  {
    id: 3,
    title: {
      vi: 'Forest Therapy Guide',
      en: 'Forest Therapy Guide',
      fr: 'Guide Thérapie Forestière',
      cn: '森林疗法导师',
      ar: 'دليل العلاج بالغابة',
    },
    department: {
      vi: 'Thiền thiên nhiên',
      en: 'Nature Meditation',
      fr: 'Méditation Nature',
      cn: '自然冥想',
      ar: 'تأمل الطبيعة',
    },
    location: {
      vi: 'Đà Lạt',
      en: 'Da Lat',
      fr: 'Da Lat',
      cn: '大叻',
      ar: 'دا لات',
    },
    type: {
      vi: 'Bán thời gian',
      en: 'Part-time',
      fr: 'Temps partiel',
      cn: '兼职',
      ar: 'دوام جزئي',
    },
    salary: {
      vi: '8-12 triệu/tháng',
      en: '8-12 million/month',
      fr: '8-12 millions/mois',
      cn: '800-1200万越盾/月',
      ar: '8-12 مليون/شهر',
    },
    description: {
      vi: 'Dẫn dắt forest bathing, thiền đi bộ và kết nối thiên nhiên.',
      en: 'Lead forest bathing sessions, walking meditation and nature connection.',
      fr: 'Mener des séances de bain de forêt, méditation marchée et connexion nature.',
      cn: '带领森林浴课程、步行冥想与自然连接。',
      ar: 'قيادة جلسات حمام الغابة والتأمل في المشي والاتصال بالطبيعة.',
    },
  },
];

// ----------------------------------------------------------------------
// BRANCHES DATA
// ----------------------------------------------------------------------

export const SPA10_BRANCHES = [
  {
    id: 1,
    name: {
      vi: 'Nordic Spa Hanoi',
      en: 'Nordic Spa Hanoi',
      fr: 'Nordic Spa Hanoï',
      cn: '北欧水疗河内',
      ar: 'نوردك سبا هانوي',
    },
    address: {
      vi: 'Tầng 6, Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội',
      en: '6th Floor, Lotte Center, 54 Lieu Giai, Ba Dinh, Hanoi',
      fr: '6ème étage, Lotte Center, 54 Lieu Giai, Ba Dinh, Hanoï',
      cn: '河内巴亭郡柳佳街54号乐天中心6楼',
      ar: 'الطابق السادس، لوتي سنتر، 54 لييو غاي، با دينه، هانوي',
    },
    phone: '+84 24 7103 8888',
    email: 'hanoi@nordicspa.vn',
    hours: {
      vi: '07:00 - 22:00 (T2-CN)',
      en: '07:00 - 22:00 (Mon-Sun)',
      fr: '07h00 - 22h00 (Lun-Dim)',
      cn: '07:00 - 22:00（周一至周日）',
      ar: '07:00 - 22:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Sauna cabin 20 chỗ', 'Cold plunge pool', 'Forest garden', 'Sky bar'],
      en: ['20-seat sauna cabin', 'Cold plunge pool', 'Forest garden', 'Sky bar'],
      fr: ['Cabine sauna 20 places', 'Bassin bain froid', 'Jardin forêt', 'Sky bar'],
      cn: ['20座桑拿房', '冷水浴池', '森林花园', '天际酒吧'],
      ar: ['كابينة ساونا 20 مقعد', 'حوض غطس بارد', 'حديقة غابة', 'بار سكاي'],
    },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  },
  {
    id: 2,
    name: {
      vi: 'Nordic Spa Saigon',
      en: 'Nordic Spa Saigon',
      fr: 'Nordic Spa Saigon',
      cn: '北欧水疗西贡',
      ar: 'نوردك سبا سايغون',
    },
    address: {
      vi: 'Tầng 8, Vincom Center, 72 Lê Thánh Tôn, Q.1, TP.HCM',
      en: '8th Floor, Vincom Center, 72 Le Thanh Ton, D.1, HCMC',
      fr: '8ème étage, Vincom Center, 72 Le Thanh Ton, D.1, HCMC',
      cn: '胡志明市第一郡黎圣宗街72号Vincom中心8楼',
      ar: 'الطابق الثامن، فينكوم سنتر، 72 لي تون تون، المدينة الأولى، هوشي منه',
    },
    phone: '+84 28 3823 9999',
    email: 'saigon@nordicspa.vn',
    hours: {
      vi: '08:00 - 22:00 (T2-CN)',
      en: '08:00 - 22:00 (Mon-Sun)',
      fr: '08h00 - 22h00 (Lun-Dim)',
      cn: '08:00 - 22:00（周一至周日）',
      ar: '08:00 - 22:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Private saunas', 'Ice pool 4°C', 'Birch massage suite', 'Nordic cafe'],
      en: ['Private saunas', 'Ice pool at 4°C', 'Birch massage suite', 'Nordic cafe'],
      fr: ['Saunas privés', 'Piscine glacée 4°C', 'Suite massage bouleau', 'Café nordique'],
      cn: ['私人桑拿', '4°C 冰池', '桦木按摩套房', '北欧咖啡厅'],
      ar: ['ساونات خاصة', 'مسبح جليدي 4°C', 'جناح تدليك البتولا', 'مقهى شمالي'],
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  },
  {
    id: 3,
    name: {
      vi: 'Nordic Spa Da Lat',
      en: 'Nordic Spa Da Lat',
      fr: 'Nordic Spa Da Lat',
      cn: '北欧水疗大叻',
      ar: 'نوردك سبا دا لات',
    },
    address: {
      vi: 'Ana Mandara Villas, Đồi 3/4, Tp. Đà Lạt',
      en: 'Ana Mandara Villas, Hill 3/4, Da Lat City',
      fr: 'Ana Mandara Villas, Colline 3/4, Da Lat',
      cn: '大叻市三四山 Ana Mandara 别墅',
      ar: 'أناماندارا فيلاس، تل 3/4، دا لات',
    },
    phone: '+84 263 355 8888',
    email: 'dalat@nordicspa.vn',
    hours: {
      vi: '06:00 - 21:00 (T2-CN)',
      en: '06:00 - 21:00 (Mon-Sun)',
      fr: '06h00 - 21h00 (Lun-Dim)',
      cn: '06:00 - 21:00（周一至周日）',
      ar: '06:00 - 21:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Pine forest bathing', 'Outdoor saunas', 'Natural cold spring', 'Mountain view'],
      en: ['Pine forest bathing', 'Outdoor saunas', 'Natural cold spring', 'Mountain view'],
      fr: [
        'Bain de forêt de pins',
        'Saunas en plein air',
        'Source froide naturelle',
        'Vue montagne',
      ],
      cn: ['松林浴', '户外桑拿', '天然冷泉', '山景'],
      ar: ['حمام غابة الصنوبر', 'ساونات خارجية', 'نبع بارد طبيعي', 'إطلالة جبلية'],
    },
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  },
  {
    id: 4,
    name: {
      vi: 'Nordic Spa Da Nang',
      en: 'Nordic Spa Da Nang',
      fr: 'Nordic Spa Da Nang',
      cn: '北欧水疗岘港',
      ar: 'نوردك سبا دا نانغ',
    },
    address: {
      vi: 'InterContinental Resort, Mỹ Khê, Đà Nẵng',
      en: 'InterContinental Resort, My Khe, Da Nang',
      fr: 'InterContinental Resort, My Khe, Da Nang',
      cn: '岘港美溪洲际度假酒店',
      ar: 'منتجع إنتركونتيننتال، ماي خي، دا نانغ',
    },
    phone: '+84 236 398 8888',
    email: 'danang@nordicspa.vn',
    hours: {
      vi: '07:00 - 21:00 (T2-CN)',
      en: '07:00 - 21:00 (Mon-Sun)',
      fr: '07h00 - 21h00 (Lun-Dim)',
      cn: '07:00 - 21:00（周一至周日）',
      ar: '07:00 - 21:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Beachfront saunas', 'Ocean cold plunge', 'Forest path', 'Sunset rituals'],
      en: ['Beachfront saunas', 'Ocean cold plunge', 'Forest path', 'Sunset rituals'],
      fr: [
        'Saunas en bord de mer',
        'Plongeon océanique',
        'Sentier forestier',
        'Rituels coucher de soleil',
      ],
      cn: ['海滨桑拿', '海洋冷水浴', '森林小径', '日落仪式'],
      ar: ['ساونات على الشاطئ', 'غطس محيطي', 'مسار غابي', 'طقوس الغروب'],
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    id: 5,
    name: {
      vi: 'Nordic Spa Phu Quoc',
      en: 'Nordic Spa Phu Quoc',
      fr: 'Nordic Spa Phu Quoc',
      cn: '北欧水疗富国岛',
      ar: 'نوردك سبا فوكوك',
    },
    address: {
      vi: 'JW Marriott Resort, Bãi Khem, Phú Quốc',
      en: 'JW Marriott Resort, Bai Khem, Phu Quoc',
      fr: 'JW Marriott Resort, Bai Khem, Phu Quoc',
      cn: '富国岛Bãi Khem JW万豪度假酒店',
      ar: 'منتجع جي دبليو ماريوت، باي كيم، فوكوك',
    },
    phone: '+84 297 399 9999',
    email: 'phuquoc@nordicspa.vn',
    hours: {
      vi: '07:00 - 21:00 (T2-CN)',
      en: '07:00 - 21:00 (Mon-Sun)',
      fr: '07h00 - 21h00 (Lun-Dim)',
      cn: '07:00 - 21:00（周一至周日）',
      ar: '07:00 - 21:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Tropical saunas', 'Sea cold plunge', 'Coconut forest', 'Island botanicals'],
      en: ['Tropical saunas', 'Sea cold plunge', 'Coconut forest', 'Island botanicals'],
      fr: ['Saunas tropicaux', 'Plongeon mer', 'Forêt de cocotiers', 'Botaniques insulaires'],
      cn: ['热带桑拿', '海水冷浴', '椰林', '岛屿植物'],
      ar: ['ساونات استوائية', 'غطس بحري', 'غابة جوز الهند', 'نباتات جزيرية'],
    },
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80',
  },
];

// ----------------------------------------------------------------------
// GALLERY DATA
// ----------------------------------------------------------------------

export const SPA10_GALLERY = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
    alt: {
      vi: 'Phòng Sauna',
      en: 'Sauna Room',
      fr: 'Chambre Sauna',
      cn: '桑拿房',
      ar: 'غرفة الساونا',
    },
    category: 'facilities',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=1200&q=80',
    alt: {
      vi: 'Bồn Cold Plunge',
      en: 'Cold Plunge Pool',
      fr: 'Bassin Bain Froid',
      cn: '冷水浴池',
      ar: 'حوض الغطس البارد',
    },
    category: 'facilities',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    alt: {
      vi: 'Rừng thông',
      en: 'Pine Forest',
      fr: 'Forêt de Pins',
      cn: '松林',
      ar: 'غابة الصنوبر',
    },
    category: 'exterior',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
    alt: {
      vi: 'Cảnh quan Bắc Âu',
      en: 'Nordic Landscape',
      fr: 'Paysage Nordique',
      cn: '北欧风光',
      ar: 'منظر شمالي',
    },
    category: 'exterior',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    alt: {
      vi: 'Buổi trị liệu',
      en: 'Treatment Session',
      fr: 'Séance de Soin',
      cn: '疗程',
      ar: 'جلسة علاج',
    },
    category: 'treatments',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80',
    alt: {
      vi: 'Hot spring',
      en: 'Hot Spring',
      fr: 'Source Chaude',
      cn: '温泉',
      ar: 'ينبوع حار',
    },
    category: 'facilities',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    alt: {
      vi: 'Biển Bắc',
      en: 'Nordic Sea',
      fr: 'Mer Nordique',
      cn: '北海',
      ar: 'البحر الشمالي',
    },
    category: 'exterior',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1521737711867-e55b00f7a836?w=1200&q=80',
    alt: {
      vi: 'Đội ngũ chuyên gia',
      en: 'Expert Team',
      fr: "Équipe d'Experts",
      cn: '专家团队',
      ar: 'فريق الخبراء',
    },
    category: 'team',
  },
];

// ----------------------------------------------------------------------
// FAQ DATA
// ----------------------------------------------------------------------

export const SPA10_FAQ = [
  {
    id: 1,
    question: {
      vi: 'Sauna an toàn không?',
      en: 'Is sauna safe?',
      fr: 'Le sauna est-il sans danger?',
      cn: '桑拿安全吗？',
      ar: 'هل الساونا آمنة؟',
    },
    answer: {
      vi: 'Sauna an toàn cho đại đa số người lớn khỏe mạnh. Thời gian tối đa nên là 15-20 phút mỗi phiên. Những người có vấn đề tim mạch, huyết áp thấp hoặc mang thai nên tham khảo ý kiến bác sĩ.',
      en: 'Sauna is safe for most healthy adults. Maximum time should be 15-20 minutes per session. People with heart conditions, low blood pressure or pregnancy should consult a doctor.',
      fr: 'Le sauna est sans danger pour la plupart des adultes en bonne santé. Temps max 15-20 min par session. Consultez un médecin si problèmes cardiaques, hypotension ou grossesse.',
      cn: '桑拿对大多数健康成年人来说是安全的。每次最长 15-20 分钟。有心脏问题、低血压或怀孕的人应咨询医生。',
      ar: 'الساونا آمنة لمعظم البالغين الأصحاء. الحد الأقصى 15-20 دقيقة للجلسة. من يعانون من مشاكل القلب أو انخفاض ضغط الدم أو الحمل يجب استشارة الطبيب.',
    },
  },
  {
    id: 2,
    question: {
      vi: 'Cold plunge có tốt cho sức khỏe không?',
      en: 'Is cold plunge good for health?',
      fr: 'Le bain froid est-il bon pour la santé?',
      cn: '冷水浴对健康有益吗？',
      ar: 'هل الغطس البارد مفيد للصحة؟',
    },
    answer: {
      vi: 'Cold plunge kích thích hệ miễn dịch, tăng tuần hoàn máu, giảm viêm và giải phóng endorphin. Nghiên cứu cho thấy tắm lạnh đều đặn có thể giảm nguy cơ bệnh tim mạch và tăng khả năng phục hồi.',
      en: 'Cold plunge stimulates the immune system, increases blood circulation, reduces inflammation and releases endorphins. Studies show regular cold exposure can reduce cardiovascular risk and enhance recovery.',
      fr: "Le bain froid stimule le système immunitaire, augmente la circulation, réduit l'inflammation. Des études montrent que l'exposition régulière au froid réduit les risques cardiovasculaires.",
      cn: '冷水浴刺激免疫系统、促进血液循环、减轻炎症并释放内啡肽。研究表明定期冷暴露可降低心血管风险并增强恢复。',
      ar: 'الغطس البارد يحفز جهاز المناعة ويزيد الدورة الدموية ويقلل الالتهاب. تشير الدراسات إلى أن التعرض المنتظم للبرد يقلل مخاطر القلب.',
    },
  },
  {
    id: 3,
    question: {
      vi: 'Tôi cần chuẩn bị gì trước khi đến spa?',
      en: 'What should I prepare before coming to the spa?',
      fr: 'Que dois-je préparer avant de venir au spa?',
      cn: '来水疗前需要准备什么？',
      ar: 'ماذا يجب أن أحضر قبل المجيء إلى المنتجع؟',
    },
    answer: {
      vi: 'Bạn chỉ cần mang theo đồ bơi. Chúng tôi cung cấp khăn, dép spa và mọi vật dụng cần thiết. Nên đến trước 15 phút để cơ thể thích nghi.',
      en: 'Just bring your swimwear. We provide towels, spa slippers and all necessary items. Arrive 15 minutes early to acclimate.',
      fr: "Apportez juste votre maillot de bain. Nous fournissons serviettes, chaussons et tout le nécessaire. Venez 15 min à l'avance.",
      cn: '只需携带泳装。我们提供毛巾、水疗拖鞋及一切所需物品。建议提前15分钟到达以适应。',
      ar: 'أحضر فقط ملابس السباحة. نحن نوفر المناشف ونعال السبا وكل ما تحتاجه. احضر قبل 15 دقيقة.',
    },
  },
  {
    id: 4,
    question: {
      vi: 'Forest bathing là gì?',
      en: 'What is forest bathing?',
      fr: "Qu'est-ce que le bain de forêt?",
      cn: '什么是森林浴？',
      ar: 'ما هو حمام الغابة؟',
    },
    answer: {
      vi: 'Forest bathing (Shinrin-yoku) là thói quen đi bộ chậm trong rừng, hít thở phytoncide từ cây. Được phát triển tại Nhật Bản năm 1980, giúp giảm stress và tăng cường miễn dịch tự nhiên.',
      en: 'Forest bathing (Shinrin-yoku) is the practice of slow walking through forests, breathing tree phytoncides. Developed in Japan in 1980, it helps reduce stress and boost natural immunity.',
      fr: "Le bain de forêt (Shinrin-yoku) est la marche lente en forêt, respirant les phytoncides. Développé au Japon en 1980, il réduit le stress et renforce l'immunité.",
      cn: '森林浴是一种在森林中缓步而行、呼吸树木植物杀菌素的习惯。1980年发源于日本，有助于减轻压力并增强天然免疫力。',
      ar: 'حمام الغابة هو المشي البطيء في الغابة وتنفس الفيتونسيدات من الأشجار. طُوّر في اليابان 1980 ويقلل التوتر ويعزز المناعة.',
    },
  },
  {
    id: 5,
    question: {
      vi: 'Tôi có thể kết hợp sauna và gym không?',
      en: 'Can I combine sauna and gym?',
      fr: 'Puis-je combiner sauna et salle de sport?',
      cn: '我可以结合桑拿和健身吗？',
      ar: 'هل يمكنني الجمع بين الساونا والجيم؟',
    },
    answer: {
      vi: 'Hoàn toàn! Sauna sau khi tập thể dục giúp thư giãn cơ, giảm đau và phục hồi nhanh hơn. Nên uống đủ nước trước và sau sauna.',
      en: 'Absolutely! Sauna after exercise helps relax muscles, reduce soreness and recover faster. Drink plenty of water before and after sauna.',
      fr: "Absolument! Le sauna après l'exercice détend les muscles, réduit les douleurs et accélère la récupération. Buvez beaucoup d'eau.",
      cn: '当然可以！运动后桑拿有助于放松肌肉、减轻酸痛并加快恢复。桑拿前后应多喝水。',
      ar: 'بالتأكيد! الساونا بعد التمرين ترخي العضلات وتقلل الألم وتسرّع التعافي. اشرب الكثير من الماء.',
    },
  },
];

// ----------------------------------------------------------------------
// PACKAGES DATA
// ----------------------------------------------------------------------

export const SPA10_PACKAGES = [
  {
    id: 1,
    name: {
      vi: 'Gói Khởi Đầu',
      en: 'Starter Package',
      fr: 'Forfait Initiation',
      cn: '入门套餐',
      ar: 'باقة البداية',
    },
    subtitle: {
      vi: 'Dành cho người mới',
      en: 'For first-timers',
      fr: 'Pour les débutants',
      cn: '适合初次体验者',
      ar: 'للمبتدئين',
    },
    treatments: 3,
    validity: {
      vi: '30 ngày',
      en: '30 days',
      fr: '30 jours',
      cn: '30天',
      ar: '30 يوماً',
    },
    originalPrice: 2400000,
    price: 1900000,
    discount: 21,
    color: TEAL,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    includes: {
      vi: ['Sauna Ritual', 'Cold Plunge', 'Birch Leaf Massage'],
      en: ['Sauna Ritual', 'Cold Plunge', 'Birch Leaf Massage'],
      fr: ['Rituel Sauna', 'Bain Froid', 'Massage Bouleau'],
      cn: ['桑拿仪式', '冷水浴', '桦树叶按摩'],
      ar: ['طقس الساونا', 'الغطس البارد', 'تدليك البتولا'],
    },
  },
  {
    id: 2,
    name: {
      vi: 'Gói Nordic Wellness',
      en: 'Nordic Wellness Package',
      fr: 'Forfait Bien-Être Nordique',
      cn: '北欧养生套餐',
      ar: 'باقة العافية الشمالية',
    },
    subtitle: {
      vi: 'Trải nghiệm đầy đủ Bắc Âu',
      en: 'Complete Nordic experience',
      fr: 'Expérience nordique complète',
      cn: '完整北欧体验',
      ar: 'تجربة شمالية كاملة',
    },
    treatments: 5,
    validity: {
      vi: '60 ngày',
      en: '60 days',
      fr: '60 jours',
      cn: '60天',
      ar: '60 يوماً',
    },
    originalPrice: 4800000,
    price: 3800000,
    discount: 21,
    color: FIRE,
    image: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=800&q=80',
    includes: {
      vi: ['Aurora Full Ritual', 'Sauna Ritual', 'Cold Plunge', 'Forest Bathing', 'Birch Massage'],
      en: ['Aurora Full Ritual', 'Sauna Ritual', 'Cold Plunge', 'Forest Bathing', 'Birch Massage'],
      fr: ['Rituel Aurora', 'Rituel Sauna', 'Bain Froid', 'Bain Forêt', 'Massage Bouleau'],
      cn: ['极光完整仪式', '桑拿仪式', '冷水浴', '森林浴', '桦木按摩'],
      ar: ['طقس أورورا', 'طقس الساونا', 'الغطس البارد', 'حمام الغابة', 'تدليك البتولا'],
    },
  },
  {
    id: 3,
    name: {
      vi: 'Gói Viking',
      en: 'Viking Package',
      fr: 'Forfait Viking',
      cn: '维京套餐',
      ar: 'باقة الفايكنغ',
    },
    subtitle: {
      vi: 'Trải nghiệm thượng lưu',
      en: 'Premium experience',
      fr: 'Expérience premium',
      cn: '高端体验',
      ar: 'تجربة فاخرة',
    },
    treatments: 8,
    validity: {
      vi: '90 ngày',
      en: '90 days',
      fr: '90 jours',
      cn: '90天',
      ar: '90 يوماً',
    },
    originalPrice: 8500000,
    price: 6800000,
    discount: 20,
    color: '#9D4EDD',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    includes: {
      vi: [
        'Tất cả Nordic Wellness',
        'Couples Nordic Escape',
        'Private Sauna',
        'Champagne & Nordic Tapas',
        'VIP Lounge',
      ],
      en: [
        'All Nordic Wellness',
        'Couples Nordic Escape',
        'Private Sauna',
        'Champagne & Nordic Tapas',
        'VIP Lounge',
      ],
      fr: [
        'Tout Bien-Être Nordique',
        'Évasion Couple',
        'Sauna Privé',
        'Champagne & Tapas',
        'Salon VIP',
      ],
      cn: ['所有北欧养生套餐', '双人北欧逃离', '私人桑拿', '香槟与北欧小食', 'VIP休息室'],
      ar: ['كل العافية الشمالية', 'هروب الأزواج', 'ساونا خاصة', 'شمامبانيا وتاباس', 'صالة VIP'],
    },
  },
];

// ----------------------------------------------------------------------
// BEFORE/AFTER DATA
// ----------------------------------------------------------------------

export const SPA10_BEFORE_AFTER = [
  {
    id: 1,
    treatment: {
      vi: 'Cold Plunge (4 tuần)',
      en: 'Cold Plunge (4 weeks)',
      fr: 'Bain Froid (4 semaines)',
      cn: '冷水浴（4周）',
      ar: 'غطس بارد (4 أسابيع)',
    },
    before: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=600&q=80',
    description: {
      vi: 'Da săn chắc, năng lượng tăng, ngủ ngon hơn',
      en: 'Skin tightened, energy increased, better sleep',
      fr: 'Peau raffermie, énergie augmentée, meilleur sommeil',
      cn: '肌肤紧致、精力增强、睡眠改善',
      ar: 'جلد مشدود وطاقة متزايدة ونوم أفضل',
    },
    duration: {
      vi: '4 tuần',
      en: '4 weeks',
      fr: '4 semaines',
      cn: '4周',
      ar: '4 أسابيع',
    },
  },
  {
    id: 2,
    treatment: {
      vi: 'Sauna + Cold Plunge (8 tuần)',
      en: 'Sauna + Cold Plunge (8 weeks)',
      fr: 'Sauna + Bain Froid (8 semaines)',
      cn: '桑拿 + 冷水浴（8周）',
      ar: 'ساونا + غطس بارد (8 أسابيع)',
    },
    before: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    description: {
      vi: 'Thải độc toàn thân, miễn dịch tăng, da sáng khỏe',
      en: 'Full body detox, immunity boosted, skin glowing',
      fr: 'Détox corporelle, immunité renforcée, peau rayonnante',
      cn: '全身排毒、免疫力提升、肌肤光泽',
      ar: 'إزالة سموم كاملة ومناعة معززة وبشرة متوهجة',
    },
    duration: {
      vi: '8 tuần',
      en: '8 weeks',
      fr: '8 semaines',
      cn: '8周',
      ar: '8 أسابيع',
    },
  },
  {
    id: 3,
    treatment: {
      vi: 'Forest Bathing (12 tuần)',
      en: 'Forest Bathing (12 weeks)',
      fr: 'Bain de Forêt (12 semaines)',
      cn: '森林浴（12周）',
      ar: 'حمام الغابة (12 أسبوعًا)',
    },
    before: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80',
    description: {
      vi: 'Cortisol giảm 40%, stress giảm, tinh thần bình an',
      en: 'Cortisol down 40%, stress reduced, mental calm',
      fr: 'Cortisol -40%, stress réduit, calme mental',
      cn: '皮质醇下降 40%、压力减轻、心境平和',
      ar: 'الكورتيزول -40% وتوتر مخفف وراحة نفسية',
    },
    duration: {
      vi: '12 tuần',
      en: '12 weeks',
      fr: '12 semaines',
      cn: '12周',
      ar: '12 أسبوعًا',
    },
  },
];

// ----------------------------------------------------------------------
// PROMOTIONS DATA
// ----------------------------------------------------------------------

export const SPA10_PROMOTIONS = [
  {
    id: 1,
    title: {
      vi: 'Mùa Đông Bắc Âu',
      en: 'Nordic Winter',
      fr: 'Hiver Nordique',
      cn: '北欧冬季',
      ar: 'شتاء الشمال',
    },
    discount: 25,
    code: 'NORDIC25',
    validUntil: '2025-12-31',
    description: {
      vi: 'Giảm 25% cho mọi liệu trình sauna trong mùa đông.',
      en: '25% off all sauna treatments this winter.',
      fr: '25% de réduction sur tous les soins sauna cet hiver.',
      cn: '冬季所有桑拿疗程享受75折。',
      ar: 'خصم 25% على جميع علاجات الساونا هذا الشتاء.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    color: SNOW,
  },
  {
    id: 2,
    title: {
      vi: 'Ngày Cặp Đôi',
      en: 'Couples Day',
      fr: 'Journée des Couples',
      cn: '情侣日',
      ar: 'يوم الأزواج',
    },
    discount: 20,
    code: 'COUPLE20',
    validUntil: '2025-12-31',
    description: {
      vi: 'Giảm 20% cho gói Couples Nordic Escape.',
      en: '20% off Couples Nordic Escape package.',
      fr: '20% sur le forfait Évasion Nordique en Couple.',
      cn: '双人北欧逃离套餐享80折。',
      ar: 'خصم 20% على باقة الهروب الشمالي للأزواج.',
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    color: '#E07B38',
  },
  {
    id: 3,
    title: {
      vi: 'Viking Club',
      en: 'Viking Club',
      fr: 'Club Viking',
      cn: '维京俱乐部',
      ar: 'نادي الفايكنغ',
    },
    discount: 15,
    code: 'VIKING15',
    validUntil: '2025-12-31',
    description: {
      vi: 'Thành viên Viking Club được giảm 15% mọi liệu trình quanh năm.',
      en: 'Viking Club members get 15% off all treatments all year round.',
      fr: 'Les membres du Club Viking ont 15% sur tous les soins.',
      cn: '维京俱乐部会员全年所有疗程享受85折。',
      ar: 'أعضاء نادي الفايكنغ يحصلون على خصم 15% على جميع العلاجات.',
    },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    color: FIRE,
  },
];

// ----------------------------------------------------------------------
// FEEDBACK DATA
// ----------------------------------------------------------------------

export const SPA10_FEEDBACK = [
  {
    id: 1,
    name: 'Nguyễn Minh Đức',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a706e886d8b?w=150&q=80',
    rating: 5,
    treatment: {
      vi: 'Aurora Full Ritual',
      en: 'Aurora Full Ritual',
      fr: 'Rituel Aurora',
      cn: '极光完整仪式',
      ar: 'طقس أورورا',
    },
    date: '2025-06-18',
    comment: {
      vi: 'Trải nghiệm sauna + cold plunge + forest bathing đáng nhớ đời. Cảm giác sau 3 phút trong nước 4°C đúng là "alive" như người Bắc Âu nói. Tuyệt vời!',
      en: 'Unforgettable sauna + cold plunge + forest bathing experience. The feeling after 3 minutes in 4°C water is truly "alive" as Nordics say. Amazing!',
      fr: 'Expérience inoubliable sauna + bain froid + forêt. La sensation après 3 min à 4°C est vraiment "vivante". Incroyable!',
      cn: '难忘的桑拿+冷水浴+森林浴体验。在 4°C 水中浸泡 3 分钟后的感觉真的像北欧人说的那样"活过来了"。太棒了！',
      ar: 'تجربة لا تُنسى: ساونا وغطس بارد وغابة. الشعور بعد 3 دقائق في 4°C هو حقًا "حيّ". مذهل!',
    },
  },
  {
    id: 2,
    name: 'Trần Thanh Hằng',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    treatment: {
      vi: 'Birch Leaf Massage',
      en: 'Birch Leaf Massage',
      fr: 'Massage Bouleau',
      cn: '桦树叶按摩',
      ar: 'تدليك البتولا',
    },
    date: '2025-05-25',
    comment: {
      vi: 'Massage với tinh dầu bạch dương thật tuyệt vời. Hương thơm nhẹ nhàng, da mềm mịn sau khi done. Tôi đã book thêm 3 buổi.',
      en: 'Birch oil massage was wonderful. Subtle fragrance, skin silky smooth after. I booked 3 more sessions.',
      fr: "Massage à l'huile de bouleau merveilleux. Parfum subtil, peau soyeuse après. J'ai réservé 3 séances supplémentaires.",
      cn: '桦木精油按摩太棒了。淡淡香味，做完后皮肤光滑细腻。我又预约了3次。',
      ar: 'تدليك زيت البتولا رائع. رائحة خفيفة وبشرة حريرية بعد. حجزت 3 جلسات إضافية.',
    },
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    avatar: 'https://images.unsplash.com/photo-1438761681033-9461cf81e5c5?w=150&q=80',
    rating: 5,
    treatment: {
      vi: 'Couples Nordic Escape',
      en: 'Couples Nordic Escape',
      fr: 'Évasion Nordique Couple',
      cn: '双人北欧逃离',
      ar: 'هروب الأزواج',
    },
    date: '2025-04-20',
    comment: {
      vi: 'Đã cùng vợ trải nghiệm gói couples tại chi nhánh Hà Nội. Private sauna, cold plunge song song, massage đôi và champagne. Lãng mạn quá!',
      en: 'Did the couples package with my wife at Hanoi branch. Private sauna, parallel cold plunge, dual massage and champagne. So romantic!',
      fr: 'Nous avons fait le forfait couple à Hanoï. Sauna privé, bain froid parallèle, massage duo et champagne. Très romantique!',
      cn: '和妻子在河内分店体验了情侣套餐。私人桑拿、并行冷水浴、双人按摩和香槟。太浪漫了！',
      ar: 'جربنا باقة الأزواج مع زوجتي في هانوي. ساونا خاصة وغطس بارد متوازي وتدليك مزدوج وشمامبانيا. رومانسي جدًا!',
    },
  },
];

// ----------------------------------------------------------------------
// OFFERS DATA
// ----------------------------------------------------------------------

export const SPA10_OFFERS = [
  {
    id: 1,
    title: {
      vi: 'Tặng Voucher 500.000₫',
      en: 'Free 500,000₫ Voucher',
      fr: 'Bon de 500 000₫ Offert',
      cn: '赠送50万越盾代金券',
      ar: 'قسيمة مجانية بقيمة 500,000₫',
    },
    subtitle: {
      vi: 'Khi đăng ký thành viên mới',
      en: 'When signing up as new member',
      fr: "Lors de l'inscription comme nouveau membre",
      cn: '新会员注册时',
      ar: 'عند التسجيل كعضو جديد',
    },
    description: {
      vi: 'Đăng ký thành viên Viking Club ngay hôm nay để nhận voucher trị giá 500.000₫.',
      en: 'Sign up for Viking Club membership today to receive a 500,000₫ voucher.',
      fr: "Inscrivez-vous au Club Viking aujourd'hui pour recevoir un bon de 500 000₫.",
      cn: '今日注册维京俱乐部会员，即获50万越盾代金券。',
      ar: 'سجّل في نادي الفايكنغ اليوم للحصول على قسيمة بقيمة 500,000₫.',
    },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    color: TEAL,
  },
  {
    id: 2,
    title: {
      vi: 'Giảm 15% sinh nhật',
      en: '15% Birthday Discount',
      fr: '15% de Réduction Anniversaire',
      cn: '生日享85折',
      ar: 'خصم 15% عيد الميلاد',
    },
    subtitle: {
      vi: 'Trong tháng sinh nhật của bạn',
      en: 'During your birthday month',
      fr: "Pendant votre mois d'anniversaire",
      cn: '在您的生日月期间',
      ar: 'خلال شهر مولدك',
    },
    description: {
      vi: 'Thành viên được giảm 15% cho mọi liệu trình trong tháng sinh nhật.',
      en: 'Members get 15% off all treatments during their birthday month.',
      fr: "Les membres ont 15% sur tous les soins pendant leur mois d'anniversaire.",
      cn: '会员在生日月可享所有疗程85折。',
      ar: 'يحصل الأعضاء على خصم 15% على جميع العلاجات خلال شهر مولدهم.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    color: '#E07B38',
  },
  {
    id: 3,
    title: {
      vi: 'Combo Bạn Bè - Mua 4 Tặng 1',
      en: 'Friends Combo - Buy 4 Get 1 Free',
      fr: 'Combo Amis - Achetez 4 Recevez 1 Gratuit',
      cn: '朋友套餐 - 买4送1',
      ar: 'عرض الأصدقاء - اشترِ 4 واحصل على 1 مجانًا',
    },
    subtitle: {
      vi: 'Ghé spa cùng nhóm bạn',
      en: 'Visit spa with your group',
      fr: 'Venez au spa en groupe',
      cn: '和朋友一起来水疗',
      ar: 'تفضّل إلى المنتجع مع مجموعتك',
    },
    description: {
      vi: 'Đặt lịch cho nhóm 4 người và người thứ 5 được miễn phí.',
      en: 'Book for a group of 4 and the 5th person is free.',
      fr: 'Réservez pour un groupe de 4 et la 5ème personne est gratuite.',
      cn: '预订4人团队，第5人免费。',
      ar: 'احجز لمجموعة من 4 أشخاص والشخص الخامس مجانًا.',
    },
    image: 'https://images.unsplash.com/photo-1521737711867-e55b00f7a836?w=800&q=80',
    color: '#2D6A4F',
  },
];

// ----------------------------------------------------------------------
// PARTNERS DATA
// ----------------------------------------------------------------------

export const SPA10_PARTNERS = [
  {
    id: 1,
    name: {
      vi: 'HARVIA Sauna Heaters',
      en: 'HARVIA Sauna Heaters',
      fr: 'Chauffages Sauna HARVIA',
      cn: 'HARVIA 桑拿炉',
      ar: 'سخانات ساونا هارفيا',
    },
    type: {
      vi: 'Nhà cung cấp thiết bị',
      en: 'Equipment supplier',
      fr: "Fournisseur d'équipements",
      cn: '设备供应商',
      ar: 'مورد المعدات',
    },
    logo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80',
    description: {
      vi: 'Lò sauna Harvia từ Phần Lan — thương hiệu số 1 thế giới.',
      en: "Harvia sauna stoves from Finland — world's #1 brand.",
      fr: 'Poêles de sauna Harvia de Finlande — marque n°1 mondiale.',
      cn: '来自芬兰的Harvia桑拿炉——全球第一品牌。',
      ar: 'مواقد ساونا هارفيا من فنلندا — العلامة التجارية رقم 1 عالميًا.',
    },
  },
  {
    id: 2,
    name: {
      vi: 'Nordic Birch Oil',
      en: 'Nordic Birch Oil',
      fr: 'Huile de Bouleau Nordique',
      cn: '北欧桦木油',
      ar: 'زيت البتولا الشمالي',
    },
    type: {
      vi: 'Nhà cung cấp nguyên liệu',
      en: 'Ingredients supplier',
      fr: "Fournisseur d'ingrédients",
      cn: '原料供应商',
      ar: 'مورد المكونات',
    },
    logo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&q=80',
    description: {
      vi: 'Tinh dầu bạch dương hữu cơ 100% từ Scandinavia.',
      en: '100% organic birch oil from Scandinavia.',
      fr: 'Huile de bouleau bio 100% de Scandinavie.',
      cn: '来自斯堪的纳维亚的100%有机桦木精油。',
      ar: 'زيت بتولا عضوي 100% من إسكندنافيا.',
    },
  },
  {
    id: 3,
    name: {
      vi: 'Baltic Sea Salts',
      en: 'Baltic Sea Salts',
      fr: 'Sels de la Baltique',
      cn: '波罗的海海盐',
      ar: 'أملاح بحر البلطيق',
    },
    type: {
      vi: 'Nhà cung cấp nguyên liệu',
      en: 'Ingredients supplier',
      fr: "Fournisseur d'ingrédients",
      cn: '原料供应商',
      ar: 'مورد المكونات',
    },
    logo: 'https://images.unsplash.com/photo-1580803834064-22b7f9bfc9c5?w=200&q=80',
    description: {
      vi: 'Muối biển giàu khoáng từ Biển Baltic.',
      en: 'Mineral-rich sea salt from the Baltic Sea.',
      fr: 'Sel marin riche en minéraux de la Baltique.',
      cn: '来自波罗的海的富含矿物质海盐。',
      ar: 'ملح بحري غني بالمعادن من بحر البلطيق.',
    },
  },
  {
    id: 4,
    name: {
      vi: 'Finnish Sauna Society',
      en: 'Finnish Sauna Society',
      fr: 'Société Finlandaise du Sauna',
      cn: '芬兰桑拿协会',
      ar: 'الجمعية الفنلندية للساونا',
    },
    type: {
      vi: 'Đối tác đào tạo',
      en: 'Training partner',
      fr: 'Partenaire formation',
      cn: '培训合作伙伴',
      ar: 'شريك التدريب',
    },
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
    description: {
      vi: 'Hiệp hội sauna Phần Lan — trung tâm đào tạo và chứng nhận.',
      en: 'Finnish Sauna Society — training and certification center.',
      fr: 'Société finlandaise du sauna — centre de formation et certification.',
      cn: '芬兰桑拿协会——培训与认证中心。',
      ar: 'جمعية الساونا الفنلندية — مركز التدريب والإصدار.',
    },
  },
];

// ----------------------------------------------------------------------
// POLICY DATA
// ----------------------------------------------------------------------

export const SPA10_POLICY = [
  {
    id: 1,
    title: {
      vi: 'Chính sách Đặt lịch',
      en: 'Booking Policy',
      fr: 'Politique de Réservation',
      cn: '预约政策',
      ar: 'سياسة الحجز',
    },
    content: {
      vi: 'Vui lòng đặt lịch trước ít nhất 24 giờ. Miễn phí hủy lịch trước 6 giờ. Hủy trong vòng 6 giờ sẽ tính 30% giá trị liệu trình. Không đến (no-show) sẽ tính 100%.',
      en: 'Please book at least 24 hours in advance. Free cancellation up to 6 hours before. Cancellation within 6 hours incurs 30% of treatment value. No-show is charged 100%.',
      fr: "Réservez au moins 24h à l'avance. Annulation gratuite jusqu'à 6h avant. Annulation sous 6h: 30% du soin. No-show: 100%.",
      cn: '请至少提前24小时预约。提前6小时取消免费。6小时内取消收取疗程价值30%。未到收取100%。',
      ar: 'يرجى الحجز قبل 24 ساعة على الأقل. الإلغاء مجاني قبل 6 ساعات. الإلغاء خلال 6 ساعات يتحمل 30%. عدم الحضور 100%.',
    },
  },
  {
    id: 2,
    title: {
      vi: 'Chính sách Thanh toán',
      en: 'Payment Policy',
      fr: 'Politique de Paiement',
      cn: '付款政策',
      ar: 'سياسة الدفع',
    },
    content: {
      vi: 'Chấp nhận thanh toán bằng tiền mặt, thẻ tín dụng (Visa, Master, JCB), và chuyển khoản. Voucher và gói liệu trình đã mua không được hoàn tiền.',
      en: 'We accept cash, credit cards (Visa, Master, JCB), and bank transfer. Vouchers and purchased packages are non-refundable.',
      fr: 'Nous acceptons espèces, cartes de crédit (Visa, Master, JCB) et virement. Les bons et forfaits ne sont pas remboursables.',
      cn: '接受现金、信用卡（Visa、Master、JCB）及银行转账支付。代金券与已购套餐不可退款。',
      ar: 'نقبل الدفع نقدًا وبالبطاقات (فيزا وماستر وجي سي بي) والتحويل. القسائم والباقات غير قابلة للاسترداد.',
    },
  },
  {
    id: 3,
    title: {
      vi: 'Chính sách Bảo mật',
      en: 'Privacy Policy',
      fr: 'Politique de Confidentialité',
      cn: '隐私政策',
      ar: 'سياسة الخصوصية',
    },
    content: {
      vi: 'Thông tin cá nhân của khách hàng được bảo mật theo quy định pháp luật. Chúng tôi không chia sẻ thông tin cho bên thứ ba khi không có sự đồng ý của khách.',
      en: 'Customer personal information is protected by law. We do not share information with third parties without customer consent.',
      fr: 'Les données personnelles sont protégées par la loi. Pas de partage avec des tiers sans consentement.',
      cn: '客户个人信息受法律保护。未经客户同意，我们不会向第三方透露信息。',
      ar: 'المعلومات الشخصية محمية قانونيًا. لا نشارك مع أطراف ثالثة بدون موافقة.',
    },
  },
];

// ----------------------------------------------------------------------
// EXPORTS
// ----------------------------------------------------------------------

export { getLang, formatVND };
