// Jade Blossom Spa - Pages Data
// Style: Jade green + Rose gold, Asian-inspired elegance

export const JADE = '#1B4332';
export const JADE_LIGHT = '#E8F5E9';
export const ROSE_GOLD = '#C9956C';
export const CREAM = '#FAFAF7';
export const INK = '#1A1A2E';
export const SAKURA = '#FFE4E6';

export type Spa4Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

// ----------------------------------------------------------------------
// PAGE IMAGES
// ----------------------------------------------------------------------

export const SPA4_PAGE_IMAGES = {
  about: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80',
  services: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  training: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80',
  blog: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80',
  careers: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=1200&q=80',
  contact: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
  offers: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  branches: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80',
  gallery: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80',
  feedback: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
  booking: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
  partners: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80',
  packages: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80',
  beforeAfter: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80',
  promotions: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80',
};

// ----------------------------------------------------------------------
// ABOUT PAGE
// ----------------------------------------------------------------------

export const spa4AboutContent = {
  eyebrow: { vi: 'VỀ CHÚNG TÔI', en: 'ABOUT US', fr: 'À PROPOS', cn: '关于我们', ar: 'من نحن' },
  title: {
    vi: 'Hành trình vẻ đẹp Á-Âu',
    en: 'Journey of Euro-Asian Beauty',
    fr: 'Le chemin de la beauté euro-asiatique',
    cn: '亚欧美学之旅',
    ar: 'رحلة الجمال الأوروبية الآسيوية',
  },
  story: {
    vi: 'Jade Blossom ra đời từ niềm đam mê kết hợp tri thức làm đẹp phương Đông với công nghệ tiên tiến phương Tây. Tên gọi gợi nhắc về ngọc bích — biểu tượng của sự tinh khiết và trường tồn — cùng tinh hoa hoa anh đào Nhật Bản.',
    en: 'Jade Blossom was born from a passion for combining Eastern beauty wisdom with advanced Western technology. Our name evokes jade — symbol of purity and longevity — alongside the essence of Japanese cherry blossoms.',
    fr: "Jade Blossom est né d'une passion pour combiner la sagesse beauté orientale avec la technologie occidentale avancée. Notre nom évoque le jade — symbole de pureté et longévité — aux côtés de l'essence des cerisiers japonais.",
    cn: 'Jade Blossom 诞生于将东方美容智慧与西方先进科技相结合的激情。我们的名字唤起玉石——纯洁与永恒的象征——以及日本樱花的精华。',
    ar: 'وُلدت Jade Blossom من شغف الجمع بين حكمة الجمال الشرقية والتكنولوجيا الغربية المتقدمة. اسمنا يستحضر اليشم — رمز النقاء والخلود — إلى جانب جوهر أزهار الكرز اليابانية.',
  },
  values: [
    {
      icon: 'solar:leaf-bold-duotone',
      title: {
        vi: 'Tinh Hoa Phương Đông',
        en: 'Eastern Essence',
        fr: 'Essence Orientale',
        cn: '东方精华',
        ar: 'جوهر الشرق',
      },
      desc: {
        vi: 'Kỹ thuật massage kinh lạc, đá ngọc bích, thảo dược truyền thống — kết tinh hàng ngàn năm văn hóa.',
        en: 'Meridian massage, jade stones, traditional herbs — crystallizing millennia of culture.',
        fr: 'Massage des méridiens, pierres de jade, herbes traditionnelles — cristallisant des millénaires de culture.',
        cn: '经络按摩、玉石、传统草药——凝结数千年的文化。',
        ar: 'تدليك خطوط الطاقة، أحجار اليشم، الأعشاب التقليدية — بلورة آلاف السنين من الثقافة.',
      },
    },
    {
      icon: 'solar:star-shine-bold-duotone',
      title: {
        vi: 'Công Nghệ Tiên Tiến',
        en: 'Advanced Technology',
        fr: 'Technologie Avancée',
        cn: '先进科技',
        ar: 'تكنولوجيا متقدمة',
      },
      desc: {
        vi: 'Trang thiết bị FDA-cleared, collagen nano, LED therapy — kết tinh khoa học hiện đại.',
        en: 'FDA-cleared equipment, nano collagen, LED therapy — crystallizing modern science.',
        fr: 'Équipement approuvé FDA, nano collagène, LED therapy — cristallisant la science moderne.',
        cn: 'FDA 认证设备、纳米胶原蛋白、 LED 光疗——凝结现代科学。',
        ar: 'معدات معتمدة من FDA، كولاجين نانو، علاج LED — بلورة العلم الحديث.',
      },
    },
    {
      icon: 'solar:flower-bold-duotone',
      title: {
        vi: 'Trải Nghiệm Thư Giãn',
        en: 'Relaxing Experience',
        fr: 'Expérience Détente',
        cn: '放松体验',
        ar: 'تجربة استرخاء',
      },
      desc: {
        vi: 'Không gian thiền Nhật Bản, trà đạo, hương liệu tự nhiên — nâng tầm mọi khoảnh khắc.',
        en: 'Japanese Zen space, tea ceremony, natural aromatherapy — elevating every moment.',
        fr: 'Espace zen japonais, cérémonie du thé, aromathérapie naturelle — sublimant chaque instant.',
        cn: '日式禅意空间、茶道、天然香薰——提升每一刻。',
        ar: 'فضاء زن ياباني، حفل الشاي، العلاج بالروائح الطبيعية — رفع كل لحظة.',
      },
    },
  ],
  milestones: [
    {
      year: '2012',
      label: { vi: 'Thành lập', en: 'Founded', fr: 'Fondation', cn: '成立', ar: 'التأسيس' },
    },
    {
      year: '2015',
      label: {
        vi: 'Mở chi nhánh 2',
        en: '2nd Branch',
        fr: '2e Succursale',
        cn: '第二家分店',
        ar: 'فرع ثانٍ',
      },
    },
    {
      year: '2018',
      label: {
        vi: 'Chứng nhận ISO',
        en: 'ISO Certified',
        fr: 'Certifié ISO',
        cn: 'ISO 认证',
        ar: 'شهادة ISO',
      },
    },
    {
      year: '2021',
      label: {
        vi: '100.000+ khách',
        en: '100K+ Clients',
        fr: '100K+ Clients',
        cn: '10万+ 客户',
        ar: 'أكثر من 100 ألف عميل',
      },
    },
    {
      year: '2024',
      label: {
        vi: 'Hệ thống 5 chi nhánh',
        en: '5 Branches',
        fr: '5 Succursales',
        cn: '5家分店',
        ar: '5 فروع',
      },
    },
  ],
  stats: [
    {
      value: '12+',
      label: {
        vi: 'Năm kinh nghiệm',
        en: 'Years Experience',
        fr: "Ans d'Expérience",
        cn: '年经验',
        ar: 'سنة خبرة',
      },
    },
    {
      value: '50+',
      label: { vi: 'Chuyên gia', en: 'Specialists', fr: 'Spécialistes', cn: '专家', ar: 'أخصائي' },
    },
    {
      value: '100K+',
      label: { vi: 'Khách hàng', en: 'Clients', fr: 'Clients', cn: '客户', ar: 'عميل' },
    },
    {
      value: '30+',
      label: {
        vi: 'Liệu trình độc quyền',
        en: 'Exclusive Treatments',
        fr: 'Soins Exclusifs',
        cn: '独家护理',
        ar: 'علاجات حصرية',
      },
    },
  ],
};

// ----------------------------------------------------------------------
// SERVICES PAGE
// ----------------------------------------------------------------------

export const spa4ServiceCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tous', cn: '全部', ar: 'الكل' } },
  {
    id: 'skincare',
    label: {
      vi: 'Chăm sóc da',
      en: 'Skincare',
      fr: 'Soin de la Peau',
      cn: '护肤',
      ar: 'العناية بالبشرة',
    },
  },
  {
    id: 'massage',
    label: { vi: 'Massage', en: 'Massage', fr: 'Massage', cn: '按摩', ar: 'تدليك' },
  },
  { id: 'body', label: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体', ar: 'الجسم' } },
  {
    id: 'hair',
    label: { vi: 'Tóc & Da đầu', en: 'Hair & Scalp', fr: 'Cheveux', cn: '头发', ar: 'الشعر' },
  },
];

export const spa4Services = [
  {
    id: 'kbeauty',
    category: 'skincare',
    title: {
      vi: 'K-Beauty Glow Ritual',
      en: 'K-Beauty Glow Ritual',
      fr: 'K-Beauty Glow Ritual',
      cn: 'K-Beauty 护理',
      ar: 'K-Beauty',
    },
    duration: 90,
    price: 1200000,
    badge: {
      vi: 'Bán chạy',
      en: 'Best Seller',
      fr: 'Meilleure Vente',
      cn: '热销',
      ar: 'الأكثر مبيعاً',
    },
    desc: {
      vi: '10 bước chăm sóc da Hàn Quốc chuyên sâu với double cleanse, exfoliate, sheet mask và LED therapy.',
      en: '10-step intensive Korean skincare with double cleanse, exfoliate, sheet mask and LED therapy.',
      fr: 'Soin coréen intensif en 10 étapes avec double nettoyage, gommage, masque et LED.',
      cn: '十步韩式深层护肤：双重清洁、去角质、面膜和 LED 光疗。',
      ar: 'عناية كورية مكثفة من 10 خطوات مع تنظيف مزدوج وتقشير وقناع وعلاج LED.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    id: 'jade',
    category: 'massage',
    title: {
      vi: 'Jade Stone Massage',
      en: 'Jade Stone Massage',
      fr: 'Massage Pierres de Jade',
      cn: '玉石按摩',
      ar: 'تدليك اليشم',
    },
    duration: 75,
    price: 980000,
    badge: { vi: 'Độc quyền', en: 'Exclusive', fr: 'Exclusif', cn: '独家', ar: 'حصري' },
    desc: {
      vi: 'Đá ngọc bích tự nhiên kết hợp massage kinh lạc, cân bằng khí huyết và thư giãn sâu.',
      en: 'Natural jade stones with meridian massage, balancing energy and deep relaxation.',
      fr: "Pierres de jade naturelles avec massage des méridiens, équilibrant l'énergie.",
      cn: '天然玉石结合经络按摩，平衡气血，深度放松。',
      ar: 'أحجار اليشم الطبيعية مع تدليك خطوط الطاقة لتحقيق التوازن والاسترخاء العميق.',
    },
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
  {
    id: 'sakura',
    category: 'body',
    title: {
      vi: 'Sakura Body Wrap',
      en: 'Sakura Body Wrap',
      fr: 'Enveloppement Sakura',
      cn: '樱花身体护理',
      ar: 'تغليف ساكورا',
    },
    duration: 110,
    price: 1450000,
    badge: { vi: 'Mới', en: 'New', fr: 'Nouveau', cn: '最新', ar: 'جديد' },
    desc: {
      vi: 'Tắm bùn núi lửa và tinh chất hoa anh đào Nhật Bản, tẩy da chết và dưỡng trắng.',
      en: 'Volcanic mud and Japanese cherry blossom essence, exfoliation and brightening.',
      fr: 'Boue volcanique et essence de fleur de cerisier, gommage et éclaircissant.',
      cn: '火山泥与日本樱花精华，去角质并提亮。',
      ar: 'طين بركاني وخلاصة أزهار الكرز اليابانية للتقشير والتفتيح.',
    },
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=600&q=80',
  },
  {
    id: 'scalp',
    category: 'hair',
    title: {
      vi: 'Scalp & Hair Detox',
      en: 'Scalp & Hair Detox',
      fr: 'Détox Cheveux',
      cn: '头皮排毒',
      ar: 'ديتوكس الشعر',
    },
    duration: 60,
    price: 750000,
    badge: null,
    desc: {
      vi: 'Dầu argan Morocco và gừng tươi, massage kích thích mọc tóc và phục hồi.',
      en: 'Moroccan argan oil and fresh ginger, stimulating growth and restoration.',
      fr: "Huile d'argan et gingembre frais, stimulant la croissance et la restauration.",
      cn: '摩洛哥坚果油与新鲜生姜，刺激生长并修复。',
      ar: 'زيت الأرغان المغربي والزنجبيل الطازج لتحفيز النمو والاستعادة.',
    },
    image: 'https://images.unsplash.com/photo-1522337360788-e8f1ba63931d?w=600&q=80',
  },
  {
    id: 'gold',
    category: 'skincare',
    title: {
      vi: 'Gold Collagen Facial',
      en: 'Gold Collagen Facial',
      fr: 'Soin Or Collagène',
      cn: '黄金胶原蛋白',
      ar: 'العناية بالذهب',
    },
    duration: 80,
    price: 1800000,
    badge: { vi: 'Premium', en: 'Premium', fr: 'Premium', cn: '尊享', ar: 'فاخر' },
    desc: {
      vi: 'Mặt nạ vàng 24K và collagen深海, phục hồi độ đàn hồi và trẻ hóa làn da.',
      en: '24K gold mask and deep-sea collagen, restoring elasticity and rejuvenating skin.',
      fr: "Masque or 24K et collagène des profondeurs, restaurant l'élasticité.",
      cn: '24K 黄金面膜和深海胶原蛋白，恢复弹性并年轻化。',
      ar: 'قناع ذهب 24K وكولاجين من أعماق البحر لاستعادة المرونة وتجديد الشباب.',
    },
    image: 'https://images.unsplash.com/photo-1570172619644-dfa03b9e74be?w=600&q=80',
  },
  {
    id: 'hotstone',
    category: 'massage',
    title: {
      vi: 'Oriental Hot Stone',
      en: 'Oriental Hot Stone',
      fr: 'Pierres Chaudes',
      cn: '东方热石',
      ar: 'أحجار ساخنة',
    },
    duration: 90,
    price: 1100000,
    badge: null,
    desc: {
      vi: 'Đá nóng núi lửa kết hợp tinh dầu thảo dược, thải độc và thư giãn cơ bắp.',
      en: 'Volcanic hot stones with herbal oils, detoxifying and relaxing muscles.',
      fr: 'Pierres chaudes volcaniques avec huiles herbales, détoxifiant et relaxant.',
      cn: '火山热石与草本精油，排毒并放松肌肉。',
      ar: 'أحجار بركانية ساخنة مع زيوت عشبية لإزالة السموم واسترخاء العضلات.',
    },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ff634c0a?w=600&q=80',
  },
];

// ----------------------------------------------------------------------
// TRAINING PAGE
// ----------------------------------------------------------------------

export const spa4TrainingPrograms = [
  {
    title: {
      vi: 'K-Beauty Masterclass',
      en: 'K-Beauty Masterclass',
      fr: 'Masterclass K-Beauty',
      cn: 'K-Beauty 大师班',
      ar: 'ماستر كلاس K-Beauty',
    },
    duration: { vi: '3 tháng', en: '3 months', fr: '3 mois', cn: '3个月', ar: '3 أشهر' },
    price: 15000000,
    desc: {
      vi: 'Học trọn bộ kỹ thuật 10-step Korean skincare, lý thuyết da liễu và thực hành.',
      en: 'Complete 10-step Korean skincare techniques, dermatology theory and practice.',
      fr: 'Techniques complètes 10 étapes, théorie dermatologique et pratique.',
      cn: '完整的十步韩式护肤技术、皮肤科理论和实践。',
      ar: 'تقنيات K-Beauty الكاملة، نظرية الأمراض الجلدية والممارسة.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    title: {
      vi: 'Massage Therapy Pro',
      en: 'Massage Therapy Pro',
      fr: 'Massage Pro',
      cn: '专业按摩',
      ar: 'تدليك احترافي',
    },
    duration: { vi: '6 tháng', en: '6 months', fr: '6 mois', cn: '6个月', ar: '6 أشهر' },
    price: 25000000,
    desc: {
      vi: 'Kỹ thuật massage Thụy Điển, Thái, đá nóng, kinh lạc — chứng nhận quốc tế.',
      en: 'Swedish, Thai, hot stone, meridian techniques — internationally certified.',
      fr: 'Suédois, Thaï, pierres chaudes, méridiens — certifié internationalement.',
      cn: '瑞典、泰式、热石、经络技术——国际认证。',
      ar: 'تقنيات السويدية والتايلاندية والأحجار الساخنة — شهادة دولية.',
    },
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
  {
    title: {
      vi: 'Spa Management',
      en: 'Spa Management',
      fr: 'Gestion Spa',
      cn: '水疗管理',
      ar: 'إدارة السبا',
    },
    duration: { vi: '2 tháng', en: '2 months', fr: '2 mois', cn: '2个月', ar: 'شهران' },
    price: 12000000,
    desc: {
      vi: 'Quản lý vận hành, marketing, CSKH — dành cho chủ spa và quản lý.',
      en: 'Operations, marketing, customer service — for spa owners and managers.',
      fr: 'Opérations, marketing, service client — pour propriétaires et managers.',
      cn: '运营、营销、客户服务——适合水疗店主和管理者。',
      ar: 'العمليات والتسويق وخدمة العملاء — لأصحاب ومديري السبا.',
    },
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80',
  },
];

export const spa4Instructors = [
  {
    name: 'Chị Minh Châu',
    title: 'K-Beauty Master',
    exp: '12 năm',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d4e0b0a1e5?w=400&q=80',
  },
  {
    name: 'Anh Tuấn',
    title: 'Massage Therapist',
    exp: '15 năm',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a0c89?w=400&q=80',
  },
  {
    name: 'Chị Lan Anh',
    title: 'Spa Director',
    exp: '10 năm',
    image: 'https://images.unsplash.com/photo-1594744803389-180a1d1546bf?w=400&q=80',
  },
];

// ----------------------------------------------------------------------
// BLOG PAGE
// ----------------------------------------------------------------------

export const spa4BlogPosts = [
  {
    id: 1,
    title: {
      vi: 'Giải mã K-Beauty: 10 bước thần thánh',
      en: 'Decoding K-Beauty: 10 Sacred Steps',
      fr: 'Décoder K-Beauty',
      cn: '解密 K-Beauty',
      ar: 'فك شفرة K-Beauty',
    },
    excerpt: {
      vi: 'Tại sao phụ nữ Hàn Quốc có làn da không tuổi? Bí mật nằm ở quy trình 10 bước chăm sóc da...',
      en: 'Why do Korean women have ageless skin? The secret lies in the 10-step skincare routine...',
      fr: 'Pourquoi les Coréennes ont-elles une peau sans âge? Le secret réside dans...',
      cn: '为什么韩国女性拥有不老肌肤？秘密在于十步护肤程序...',
      ar: 'لماذا تملك النساء الكوريات بشرة بدون عمر؟ السر يكمن في...',
    },
    slug: 'decoding_k_beauty_10_sacred_steps',
    author: 'Dr. Lars Eriksson',
    category: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soin', cn: '护肤', ar: 'العناية' },
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    readTime: '5 min',
  },
  {
    id: 2,
    title: {
      vi: 'Đá ngọc bích và năng lượng chữa lành',
      en: 'Jade Stones and Healing Energy',
      fr: 'Jade et Énergie',
      cn: '玉石与治愈能量',
      ar: 'اليشم وطاقة الشفاء',
    },
    excerpt: {
      vi: 'Ngọc bích không chỉ là trang sức — đá này còn có khả năng cân bằng năng lượng và thư giãn...',
      en: 'Jade is not just jewelry — this stone has the ability to balance energy and relax...',
      fr: "Le jade n'est pas qu'un bijou — cette pierre peut équilibrer l'énergie...",
      cn: '玉石不仅仅是首饰——这种石头还能平衡能量并放松...',
      ar: 'اليشم ليس مجرد مجوهرات — هذه الحجر لديها القدرة على موازنة الطاقة...',
    },
    slug: 'jade_stones_and_healing_energy',
    author: 'Mikael Svensson',
    category: { vi: 'Liệu pháp', en: 'Therapy', fr: 'Thérapie', cn: '疗法', ar: 'علاج' },
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
    readTime: '4 min',
  },
  {
    id: 3,
    title: {
      vi: 'Sakura: Hoa anh đào và bí quyết trắng da',
      en: 'Sakura: Cherry Blossom and Brightening Secrets',
      fr: 'Sakura et Éclat',
      cn: '樱花与美白秘诀',
      ar: 'ساكورا وأسرار التفتيح',
    },
    excerpt: {
      vi: 'Hoa anh đào chứa nhiều antioxidant, giúp bảo vệ da và làm sáng tự nhiên...',
      en: 'Cherry blossoms are rich in antioxidants, protecting skin and naturally brightening...',
      fr: 'Les fleurs de cerisier sont riches en antioxydants, protégeant et éclaircissant...',
      cn: '樱花富含抗氧化剂，保护肌肤并自然提亮...',
      ar: 'أزهار الكرز غنية بمضادات الأكسدة، تحمي البشرة وتفتحها بشكل طبيعي...',
    },
    slug: 'sakura_cherry_blossom_and_brightening_secrets',
    author: 'Ingrid Hansen',
    category: { vi: 'Nguyên liệu', en: 'Ingredients', fr: 'Ingrédients', cn: '成分', ar: 'مكونات' },
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1522337360788-e8f1ba63931d?w=600&q=80',
    readTime: '6 min',
  },
];

export const spa4BlogCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tous', cn: '全部', ar: 'الكل' } },
  {
    id: 'skincare',
    label: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soin', cn: '护肤', ar: 'العناية' },
  },
  {
    id: 'therapy',
    label: { vi: 'Liệu pháp', en: 'Therapy', fr: 'Thérapie', cn: '疗法', ar: 'علاج' },
  },
  {
    id: 'ingredients',
    label: { vi: 'Nguyên liệu', en: 'Ingredients', fr: 'Ingrédients', cn: '成分', ar: 'مكونات' },
  },
  { id: 'tips', label: { vi: 'Mẹo hay', en: 'Tips', fr: 'Conseils', cn: '技巧', ar: 'نصائح' } },
];

// ----------------------------------------------------------------------
// CAREERS PAGE
// ----------------------------------------------------------------------

export const spa4Careers = [
  {
    title: {
      vi: 'K-Beauty Specialist',
      en: 'K-Beauty Specialist',
      fr: 'Spécialiste K-Beauty',
      cn: 'K-Beauty 专家',
      ar: 'أخصائي K-Beauty',
    },
    location: { vi: 'Hà Nội', en: 'Hanoi', fr: 'Hanoï', cn: '河内', ar: 'هانوي' },
    type: { vi: 'Full-time', en: 'Full-time', fr: 'Temps Plein', cn: '全职', ar: 'دوام كامل' },
    salary: '15-25 triệu',
    desc: {
      vi: 'Tối thiểu 2 năm kinh nghiệm skincare, có chứng chỉ K-Beauty ưu tiên.',
      en: 'Minimum 2 years skincare experience, K-Beauty certification preferred.',
      fr: "Minimum 2 ans d'expérience, certification K-Beauty préférée.",
      cn: '至少2年护肤经验，有 K-Beauty 证书优先。',
      ar: 'خبرة سنتين على الأقل، شهادة K-Beauty مفضلة.',
    },
  },
  {
    title: {
      vi: 'Massage Therapist',
      en: 'Massage Therapist',
      fr: 'Massothérapeute',
      cn: '按摩师',
      ar: 'أخصائي تدليك',
    },
    location: {
      vi: 'TP.HCM',
      en: 'Ho Chi Minh City',
      fr: 'Hô Chi Minh',
      cn: '胡志明市',
      ar: 'هوشي منه',
    },
    type: { vi: 'Full-time', en: 'Full-time', fr: 'Temps Plein', cn: '全职', ar: 'دوام كامل' },
    salary: '12-20 triệu',
    desc: {
      vi: 'Chứng chỉ massage quốc tế, biết多种 kỹ thuật (Thụy Điển, Thái, đá nóng).',
      en: 'International massage certification, skilled in multiple techniques.',
      fr: 'Certification internationale, maîtrise de plusieurs techniques.',
      cn: '国际按摩证书，掌握多种技术。',
      ar: 'شهادة دولية، إتقان تقنيات متعددة.',
    },
  },
  {
    title: {
      vi: 'Receptionist',
      en: 'Receptionist',
      fr: 'Réceptionniste',
      cn: '前台',
      ar: 'موظف استقبال',
    },
    location: { vi: 'Đà Nẵng', en: 'Da Nang', fr: 'Da Nang', cn: '岣港', ar: 'دانانج' },
    type: { vi: 'Full-time', en: 'Full-time', fr: 'Temps Plein', cn: '全职', ar: 'دوام كامل' },
    salary: '8-12 triệu',
    desc: {
      vi: 'Giao tiếp tốt, biết tiếng Anh, có kinh nghiệm CSKH.',
      en: 'Good communication, English proficiency, customer service experience.',
      fr: 'Bonne communication, anglais, expérience service client.',
      cn: '良好沟通，英语熟练，有客服经验。',
      ar: 'تواصل جيد، إجادة الإنجليزية، خبرة خدمة العملاء.',
    },
  },
];

export const spa4CareerBenefits = [
  {
    icon: 'solar:money-bag-bold-duotone',
    label: {
      vi: 'Lương hấp dẫn',
      en: 'Attractive Salary',
      fr: 'Salaire Attractif',
      cn: '有吸引力的薪资',
      ar: 'راتب جذاب',
    },
  },
  {
    icon: 'solar:health-bold-duotone',
    label: {
      vi: 'Bảo hiểm sức khỏe',
      en: 'Health Insurance',
      fr: 'Assurance Santé',
      cn: '健康保险',
      ar: 'تأمين صحي',
    },
  },
  {
    icon: 'solar:diploma-bold-duotone',
    label: {
      vi: 'Đào tạo chuyên sâu',
      en: 'Professional Training',
      fr: 'Formation Pro',
      cn: '专业培训',
      ar: 'تدريب احترافي',
    },
  },
  {
    icon: 'solar:cup-star-bold-duotone',
    label: {
      vi: 'Thưởng hiệu suất',
      en: 'Performance Bonus',
      fr: 'Prime Performance',
      cn: '绩效奖金',
      ar: 'مكافأة الأداء',
    },
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    label: {
      vi: 'Môi trường thân thiện',
      en: 'Friendly Environment',
      fr: 'Environnement Sympa',
      cn: '友好环境',
      ar: 'بيئة ودية',
    },
  },
  {
    icon: 'solar:graph-up-bold-duotone',
    label: {
      vi: 'Cơ hội thăng tiến',
      en: 'Career Growth',
      fr: 'Évolution',
      cn: '晋升机会',
      ar: 'تطور مهني',
    },
  },
];

// ----------------------------------------------------------------------
// CONTACT PAGE
// ----------------------------------------------------------------------

export const spa4ContactInfo = {
  address: {
    vi: '42 Ngọc Khánh, Ba Đình, Hà Nội',
    en: '42 Ngoc Khanh, Ba Dinh, Hanoi',
    fr: '42 Ngoc Khanh, Ba Dinh, Hanoï',
    cn: '河内巴亭郡玉庆街42号',
    ar: '42 نغوك خان، با دينه، هانوي',
  },
  phone: '1900 1234',
  email: 'hello@jadeblossom.vn',
  hours: {
    vi: '08:00 - 21:00 (Thứ 2 - CN)',
    en: '08:00 - 21:00 (Mon - Sun)',
    fr: '08h00 - 21h00 (Lun - Dim)',
    cn: '08:00 - 21:00 (周一至周日)',
    ar: '08:00 - 21:00 (الاثنين - الأحد)',
  },
  socials: [
    { icon: 'solar:facebook-bold', url: 'https://facebook.com/jadeblossom' },
    { icon: 'solar:instagram-bold', url: 'https://instagram.com/jadeblossom' },
    { icon: 'solar:youtube-bold', url: 'https://youtube.com/jadeblossom' },
    { icon: 'solar:share-bold', url: 'https://tiktok.com/@jadeblossom' },
  ],
};

// ----------------------------------------------------------------------
// BRANCHES PAGE
// ----------------------------------------------------------------------

export const spa4Branches = [
  {
    name: {
      vi: 'Hà Nội - Ba Đình (HQ)',
      en: 'Hanoi - Ba Dinh (HQ)',
      fr: 'Hanoï - Ba Dinh (HQ)',
      cn: '河内巴亭（总部）',
      ar: 'هانوي - با دينه (المقر)',
    },
    address: {
      vi: '42 Ngọc Khánh, Ba Đình',
      en: '42 Ngoc Khanh, Ba Dinh',
      fr: '42 Ngoc Khanh, Ba Dinh',
      cn: '巴亭郡玉庆街42号',
      ar: '42 نغوك خان، با دينه',
    },
    phone: '1900 1234',
    hours: '08:00 - 21:00',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
    isHQ: true,
  },
  {
    name: {
      vi: 'TP.HCM - Quận 1',
      en: 'HCMC - District 1',
      fr: 'Hô Chi Minh - Quận 1',
      cn: '胡志明市第一郡',
      ar: 'هوشي منه - الحي 1',
    },
    address: {
      vi: '88 Đồng Khởi, Q.1',
      en: '88 Dong Khoi, D.1',
      fr: '88 Dong Khoi, D.1',
      cn: '同起街88号',
      ar: '88 دونغ خوي، الحي 1',
    },
    phone: '1900 1235',
    hours: '09:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80',
    isHQ: false,
  },
  {
    name: {
      vi: 'Đà Nẵng - Ngũ Hành Sơn',
      en: 'Da Nang - Ngu Hanh Son',
      fr: 'Da Nang - Ngu Hanh Son',
      cn: '岣港五行山',
      ar: 'دانانج - نجو هانه سون',
    },
    address: {
      vi: '156 Võ Nguyên Giáp',
      en: '156 Vo Nguyen Giap',
      fr: '156 Vo Nguyen Giap',
      cn: '武元甲路156号',
      ar: '156 فو نغوين جياب',
    },
    phone: '1900 1236',
    hours: '08:00 - 20:00',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    isHQ: false,
  },
  {
    name: {
      vi: 'Hải Phòng - Ngô Quyền',
      en: 'Hai Phong - Ngo Quyen',
      fr: 'Hai Phong - Ngo Quyen',
      cn: '海防吴权',
      ar: 'هاي فونغ - نغو كيين',
    },
    address: {
      vi: '28 Điện Biên Phủ',
      en: '28 Dien Bien Phu',
      fr: '28 Dien Bien Phu',
      cn: '奠边府路28号',
      ar: '28 ديين بين فو',
    },
    phone: '1900 1237',
    hours: '08:00 - 20:00',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    isHQ: false,
  },
  {
    name: {
      vi: 'Hà Nội - Cầu Giấy',
      en: 'Hanoi - Cau Giay',
      fr: 'Hanoï - Cau Giay',
      cn: '河内纸桥',
      ar: 'هانوي - كاو جي',
    },
    address: {
      vi: '210 Trần Duy Hưng',
      en: '210 Tran Duy Hung',
      fr: '210 Tran Duy Hung',
      cn: '陈维兴路210号',
      ar: '210 تران دوي هونغ',
    },
    phone: '1900 1238',
    hours: '08:00 - 21:00',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ff634c0a?w=600&q=80',
    isHQ: false,
  },
];

// ----------------------------------------------------------------------
// GALLERY PAGE
// ----------------------------------------------------------------------

export const spa4Gallery = [
  {
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    caption: {
      vi: 'Phòng K-Beauty',
      en: 'K-Beauty Room',
      fr: 'Salle K-Beauty',
      cn: 'K-Beauty 房间',
      ar: 'غرفة K-Beauty',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    caption: {
      vi: 'Liệu trình da',
      en: 'Facial Treatment',
      fr: 'Soin Visage',
      cn: '面部护理',
      ar: 'علاج الوجه',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
    caption: {
      vi: 'Khu vực nghỉ ngơi',
      en: 'Relaxation Lounge',
      fr: 'Lounge Détente',
      cn: '休息区',
      ar: 'منطقة الاسترخاء',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ff634c0a?w=800&q=80',
    caption: {
      vi: 'Massage VIP',
      en: 'VIP Massage',
      fr: 'Massage VIP',
      cn: 'VIP 按摩',
      ar: 'تدليك VIP',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80',
    caption: {
      vi: 'Không gian thiền',
      en: 'Zen Space',
      fr: 'Espace Zen',
      cn: '禅意空间',
      ar: 'فضاء زن',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80',
    caption: {
      vi: 'Liệu pháp body',
      en: 'Body Therapy',
      fr: 'Thérapie Corps',
      cn: '身体疗法',
      ar: 'علاج الجسم',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    caption: {
      vi: 'Khu tiếp đón',
      en: 'Reception',
      fr: 'Réception',
      cn: '接待区',
      ar: 'الاستقبال',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    caption: {
      vi: 'Phòng đá nóng',
      en: 'Hot Stone Room',
      fr: 'Salle Pierres Chaudes',
      cn: '热石房',
      ar: 'غرفة الأحجار الساخنة',
    },
  },
];

// ----------------------------------------------------------------------
// FAQ PAGE
// ----------------------------------------------------------------------

export const spa4Faqs = [
  {
    q: {
      vi: 'Jade Blossom có不同于其他 spa?',
      en: 'How is Jade Blossom different?',
      fr: 'Comment Jade Blossom est-il différent?',
      cn: 'Jade Blossom 有什么不同？',
      ar: 'ما الذي يميز Jade Blossom؟',
    },
    a: {
      vi: 'Chúng tôi kết hợp phương pháp truyền thống Á Đông với công nghệ tiên进 phương Tây, tạo nên trải nghiệm độc đáo và hiệu quả vượt trội.',
      en: 'We combine traditional Asian methods with advanced Western technology, creating a unique and superior experience.',
      fr: 'Nous combinons les méthodes asiatiques traditionnelles avec la technologie occidentale avancée.',
      cn: '我们将传统亚洲方法与先进西方科技相结合，创造独特卓越的体验。',
      ar: 'نجمع بين الطرق الآسيوية التقليدية والتكنولوجيا الغربية المتقدمة.',
    },
    category: { vi: 'Tổng quan', en: 'General', fr: 'Général', cn: '总览', ar: 'عام' },
  },
  {
    q: {
      vi: 'Cần bao lâu để thấy kết quả?',
      en: 'How long to see results?',
      fr: 'Combien de temps pour voir des résultats?',
      cn: '多久能看到效果？',
      ar: 'كم من الوقت لرؤية النتائج؟',
    },
    a: {
      vi: 'Phụ thuộc vào liệu trình. K-Beauty cho thấy kết quả ngay sau buổi đầu. Massage và body cần 3-5 buổi để cảm nhận rõ.',
      en: 'Depends on the treatment. K-Beauty shows results after the first session. Massage and body need 3-5 sessions.',
      fr: 'Dépend du soin. K-Beauty montre des résultats après la première séance.',
      cn: '取决于护理项目。K-Beauty 首次即见效。按摩和身体护理需3-5次。',
      ar: 'يعتمد على العلاج. K-Beauty تظهر النتائج بعد الجلسة الأولى.',
    },
    category: { vi: 'Liệu trình', en: 'Treatment', fr: 'Soins', cn: '护理', ar: 'علاج' },
  },
  {
    q: {
      vi: 'Có cần đặt lịch trước không?',
      en: 'Do I need to book in advance?',
      fr: "Dois-je réserver à l'avance?",
      cn: '需要提前预约吗？',
      ar: 'هل يجب الحجز مسبقاً؟',
    },
    a: {
      vi: 'Nên đặt lịch trước để đảm bảo slot phù hợp. Tuy nhiên, chúng tôi cũng chào đón khách walk-in nếu còn chỗ.',
      en: 'We recommend booking in advance. However, we also welcome walk-in guests if slots are available.',
      fr: "Nous recommandons de réserver à l'avance. Les walk-ins sont accueillis si disponible.",
      cn: '建议提前预约。如有空位也欢迎直接前来。',
      ar: 'ننصح بالحجز مسبقاً. نرحب أيضاً بالزوار المباشرين إذا توفرت الأماكن.',
    },
    category: { vi: 'Đặt lịch', en: 'Booking', fr: 'Réservation', cn: '预约', ar: 'الحجز' },
  },
  {
    q: {
      vi: 'Chính sách hoàn/hủy là gì?',
      en: 'What is the refund/cancellation policy?',
      fr: "Quelle est la politique d'annulation?",
      cn: '退款/取消政策是什么？',
      ar: 'ما هي سياسة الإلغاء؟',
    },
    a: {
      vi: 'Hủy trước 24h được hoàn 100%. Hủy trong vòng 24h hoàn 50%. Không hoàn nếu không đến.',
      en: 'Cancel 24h before for 100% refund. Within 24h for 50% refund. No show = no refund.',
      fr: 'Annulation 24h avant pour remboursement 100%. Dans 24h pour 50%.',
      cn: '提前24小时取消可全额退款。24小时内取消退50%。未到不退款。',
      ar: 'الإلغاء قبل 24 ساعة لاسترداد 100%. خلال 24 ساعة لاسترداد 50%.',
    },
    category: { vi: 'Chính sách', en: 'Policy', fr: 'Politique', cn: '政策', ar: 'سياسة' },
  },
  {
    q: {
      vi: 'Có membership không?',
      en: 'Do you offer memberships?',
      fr: 'Offrez-vous des abonnements?',
      cn: '有会员制度吗？',
      ar: 'هل لديكم عضويات؟',
    },
    a: {
      vi: 'Có 3 gói membership: Jade, Blossom và Sakura Gold với nhiều ưu đãi độc quyền.',
      en: 'Yes, we have 3 membership tiers: Jade, Blossom, and Sakura Gold with exclusive benefits.',
      fr: 'Oui, nous avons 3 formules: Jade, Blossom et Sakura Gold avec des avantages exclusifs.',
      cn: '是的，我们有三档会员：Jade、Blossom 和 Sakura Gold，享有专属权益。',
      ar: 'نعم، لدينا 3 مستويات عضوية: Jade و Blossom و Sakura Gold مع مزایا حصرية.',
    },
    category: { vi: 'Thành viên', en: 'Membership', fr: 'Abonnement', cn: '会员', ar: 'عضوية' },
  },
];

export const spa4FaqCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tous', cn: '全部', ar: 'الكل' } },
  {
    id: 'general',
    label: { vi: 'Tổng quan', en: 'General', fr: 'Général', cn: '总览', ar: 'عام' },
  },
  {
    id: 'treatment',
    label: { vi: 'Liệu trình', en: 'Treatment', fr: 'Soins', cn: '护理', ar: 'علاج' },
  },
  {
    id: 'booking',
    label: { vi: 'Đặt lịch', en: 'Booking', fr: 'Réservation', cn: '预约', ar: 'الحجز' },
  },
  {
    id: 'policy',
    label: { vi: 'Chính sách', en: 'Policy', fr: 'Politique', cn: '政策', ar: 'سياسة' },
  },
  {
    id: 'membership',
    label: { vi: 'Thành viên', en: 'Membership', fr: 'Abonnement', cn: '会员', ar: 'عضوية' },
  },
];

// ----------------------------------------------------------------------
// PACKAGES PAGE
// ----------------------------------------------------------------------

export const spa4Packages = [
  {
    name: {
      vi: 'Gói Cơ Bản',
      en: 'Basic Package',
      fr: 'Pack de Base',
      cn: '基础套餐',
      ar: 'باقة أساسية',
    },
    price: 2500000,
    sessions: 3,
    validity: { vi: '30 ngày', en: '30 days', fr: '30 jours', cn: '30天', ar: '30 يوماً' },
    treatments: ['K-Beauty Glow Ritual', 'Jade Stone Massage'],
    save: 15,
  },
  {
    name: {
      vi: 'Gói Chăm Sóc Da',
      en: 'Skincare Package',
      fr: 'Pack Soin Visage',
      cn: '护肤套餐',
      ar: 'باقة العناية',
    },
    price: 4500000,
    sessions: 5,
    validity: { vi: '60 ngày', en: '60 days', fr: '60 jours', cn: '60天', ar: '60 يوماً' },
    treatments: ['K-Beauty Glow Ritual', 'Gold Collagen Facial'],
    save: 20,
    popular: true,
  },
  {
    name: { vi: 'Gói VIP', en: 'VIP Package', fr: 'Pack VIP', cn: 'VIP 套餐', ar: 'باقة VIP' },
    price: 8000000,
    sessions: 10,
    validity: { vi: '90 ngày', en: '90 days', fr: '90 jours', cn: '90天', ar: '90 يوماً' },
    treatments: ['All services included'],
    save: 30,
    perks: {
      vi: ['Phòng VIP', 'Đồ uống cao cấp', 'Chuyên gia riêng'],
      en: ['VIP Room', 'Premium Drinks', 'Personal Specialist'],
      fr: ['Salle VIP', 'Boissons Premium', 'Spécialiste Personnel'],
      cn: ['VIP 房间', '高级饮品', '专属专家'],
      ar: ['غرفة VIP', 'مشروبات فاخرة', 'أخصائي خاص'],
    },
  },
];

// ----------------------------------------------------------------------
// BEFORE-AFTER PAGE
// ----------------------------------------------------------------------

export const spa4BeforeAfters = [
  {
    name: 'Minh Anh',
    age: 28,
    treatment: 'K-Beauty Glow Ritual',
    sessions: 5,
    beforeImage: 'https://images.unsplash.com/photo-1594824476967-48a5a1d4aaff?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1594744803389-180a1d1546bf?w=400&q=80',
    testimonial: {
      vi: 'Da mình sáng và căng hơn rõ rệt sau 5 buổi.',
      en: 'My skin is noticeably brighter and plumper after 5 sessions.',
      fr: 'Ma peau est nettement plus lumineuse et repulpée.',
      cn: '5次护理后，肌肤明显更亮更饱满。',
      ar: 'بشرتي أكثر إشراقاً وامتلاءً بشكل ملحوظ.',
    },
  },
  {
    name: 'Thu Hà',
    age: 35,
    treatment: 'Jade Stone Massage',
    sessions: 8,
    beforeImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1573496359142-b8d4e0b0a1e5?w=400&q=80',
    testimonial: {
      vi: 'Căng cơ vai gáy giảm hẳn, ngủ ngon hơn.',
      en: 'Shoulder tension significantly reduced, sleeping better.',
      fr: 'Tensions des épaules réduites, meilleur sommeil.',
      cn: '肩颈紧张明显减轻，睡眠更好。',
      ar: 'توتر الكتفين انخفض بشكل كبير، نوم أفضل.',
    },
  },
  {
    name: 'Bảo Ngọc',
    age: 24,
    treatment: 'Sakura Body Wrap',
    sessions: 6,
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    testimonial: {
      vi: 'Da body mịn màng, sáng màu hơn hẳn.',
      en: 'Body skin is smoother and noticeably brighter.',
      fr: 'La peau du corps est plus lisse et plus lumineuse.',
      cn: '身体肌肤更光滑、明显更亮。',
      ar: 'بشرة الجسم أنعم وأكثر إشراقاً بشكل ملحوظ.',
    },
  },
];

// ----------------------------------------------------------------------
// PROMOTIONS PAGE
// ----------------------------------------------------------------------

export const spa4Promotions = [
  {
    title: {
      vi: 'Flash Sale Tháng này',
      en: 'Monthly Flash Sale',
      fr: 'Vente Flash Mensuelle',
      cn: '月度闪购',
      ar: 'تخفيضات فلاش',
    },
    discount: 30,
    code: 'JADE30',
    validUntil: '2024-02-28',
    desc: {
      vi: 'Giảm 30% tất cả liệu trình skincare khi đặt lịch online.',
      en: '30% off all skincare treatments when booking online.',
      fr: '30% de réduction sur tous les soins visage en réservant en ligne.',
      cn: '在线预约所有护肤护理，享7折优惠。',
      ar: 'خصم 30% على جميع علاجات البشرة عند الحجز عبر الإنترنت.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    title: {
      vi: 'Combo Bạn Bè',
      en: 'Friends Combo',
      fr: 'Combo Amis',
      cn: '朋友组合',
      ar: 'مجموعة الأصدقاء',
    },
    discount: 25,
    code: 'FRIENDS25',
    validUntil: '2024-03-15',
    desc: {
      vi: 'Đi cùng 1 người bạn, cả hai đều được giảm 25%.',
      en: 'Bring a friend and both get 25% off.',
      fr: 'Venez avec un ami et bénéficiez tous les deux de 25% de réduction.',
      cn: '带一位朋友，两人均享75折。',
      ar: 'أحضر صديقاً وسيحصل كلاكما على خصم 25%.',
    },
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80',
  },
  {
    title: {
      vi: 'Thành Viên Mới',
      en: 'New Member',
      fr: 'Nouveau Membre',
      cn: '新会员',
      ar: 'عضو جديد',
    },
    discount: 40,
    code: 'NEW40',
    validUntil: '2024-12-31',
    desc: {
      vi: 'Tặng 40% giá trị thẻ membership khi đăng ký lần đầu.',
      en: 'Get 40% bonus on membership card for first-time signup.',
      fr: 'Obtenez 40% de bonus sur la carte membre pour la première inscription.',
      cn: '首次注册会员卡，获赠40%额外价值。',
      ar: 'احصل على مكافأة 40% على بطاقة العضوية عند التسجيل لأول مرة.',
    },
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
];

// ----------------------------------------------------------------------
// FEEDBACK PAGE
// ----------------------------------------------------------------------

export const spa4Feedbacks = [
  {
    name: 'Nguyễn Thu Hà',
    rating: 5,
    service: 'K-Beauty Glow Ritual',
    date: '2024-01-15',
    comment: {
      vi: 'Chị Minh Châu rất tận tâm, da mình cải thiện đáng kể.',
      en: 'Minh Chau is very dedicated, my skin has improved remarkably.',
      fr: "Minh Chau est très dévouée, ma peau s'est remarquablement améliorée.",
      cn: 'Minh Châu 很用心，我的皮肤改善显著。',
      ar: 'مينه تشاو متفانية جداً، بشرتي تحسنت بشكل ملحوظ.',
    },
    branch: { vi: 'Hà Nội', en: 'Hanoi', fr: 'Hanoï', cn: '河内', ar: 'هانوي' },
  },
  {
    name: 'Trần Bảo Ngọc',
    rating: 5,
    service: 'Jade Stone Massage',
    date: '2024-01-10',
    comment: {
      vi: 'Không gian yên tĩnh, đá ngọc thư giãn tuyệt vời.',
      en: 'Quiet space, the jade stones are wonderfully relaxing.',
      fr: 'Espace calme, les pierres de jade sont merveilleusement relaxantes.',
      cn: '环境安静，玉石放松效果极佳。',
      ar: 'مساحة هادئة، أحجار اليشم مريحة بشكل رائع.',
    },
    branch: { vi: 'TP.HCM', en: 'HCMC', fr: 'Hô Chi Minh', cn: '胡志明市', ar: 'هوشي منه' },
  },
  {
    name: 'Lê Minh Thư',
    rating: 5,
    service: 'Sakura Body Wrap',
    date: '2024-01-05',
    comment: {
      vi: 'Tắm bùn thật thư giãn, da mềm mượt sau liệu trình.',
      en: 'The mud bath is so relaxing, skin feels velvety after the treatment.',
      fr: 'Le bain de boue est si relaxant, la peau est veloutée.',
      cn: '泥浴非常放松，护理后肌肤丝滑。',
      ar: 'حمام الطين مريح جداً، البشرة متVELVET بعد العلاج.',
    },
    branch: { vi: 'Đà Nẵng', en: 'Da Nang', fr: 'Da Nang', cn: '岣港', ar: 'دانانج' },
  },
];

// ----------------------------------------------------------------------
// OFFERS PAGE
// ----------------------------------------------------------------------

export const spa4Offers = [
  {
    title: {
      vi: 'Ưu Đãi Đầu Tuần',
      en: 'Weekday Special',
      fr: 'Offre en Semaine',
      cn: '平日特惠',
      ar: 'عرض أيام الأسبوع',
    },
    discount: 20,
    desc: {
      vi: 'Giảm 20% tất cả dịch vụ từ Thứ 2 - Thứ 5.',
      en: '20% off all services Monday - Thursday.',
      fr: '20% de réduction sur tous les services du lundi au jeudi.',
      cn: '周一至周四所有服务8折。',
      ar: 'خصم 20% على جميع الخدمات من الاثنين إلى الخميس.',
    },
    icon: 'solar:calendar-bold-duotone',
  },
  {
    title: {
      vi: 'Ưu Đãi Sinh Nhật',
      en: 'Birthday Special',
      fr: 'Offre Anniversaire',
      cn: '生日特惠',
      ar: 'عرض عيد الميلاد',
    },
    discount: 50,
    desc: {
      vi: 'Giảm 50% một liệu trình bất kỳ trong tháng sinh nhật.',
      en: '50% off any one treatment during your birthday month.',
      fr: "50% de réduction sur un soin de votre choix pendant votre mois d'anniversaire.",
      cn: '生日当月享一次5折优惠。',
      ar: 'خصم 50% على علاج واحد في شهر عيد ميلادك.',
    },
    icon: 'solar:gift-bold-duotone',
  },
  {
    title: {
      vi: 'Ưu Đãi Giới Thiệu',
      en: 'Referral Bonus',
      fr: 'Bonus Parrainage',
      cn: '推荐奖励',
      ar: 'مكافأة الإحالة',
    },
    discount: 25,
    desc: {
      vi: 'Giới thiệu bạn bè, cả hai đều nhận voucher 25%.',
      en: 'Refer a friend and both receive a 25% voucher.',
      fr: 'Parrainez un ami et recevez tous les deux un bon de 25%.',
      cn: '推荐朋友，双方均获25%代金券。',
      ar: 'أحل صديقاً وكلاكما يحصل على قسيمة 25%.',
    },
    icon: 'solar:users-group-rounded-bold-duotone',
  },
];

// ----------------------------------------------------------------------
// PARTNERS PAGE
// ----------------------------------------------------------------------

export const spa4Partners = [
  {
    name: 'Innisfree',
    logo: 'https://images.unsplash.com/photo-1571781926295-81ab7ec9c1e8?w=200&q=80',
    type: {
      vi: 'Skincare Partner',
      en: 'Skincare Partner',
      fr: 'Partenaire Soin',
      cn: '护肤伙伴',
      ar: 'شريك العناية',
    },
  },
  {
    name: "L'Occitane",
    logo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=80',
    type: {
      vi: 'Body Care Partner',
      en: 'Body Care Partner',
      fr: 'Partenaire Corps',
      cn: '身体护理伙伴',
      ar: 'شريك الجسم',
    },
  },
  {
    name: 'Muji',
    logo: 'https://images.unsplash.com/photo-1585386959983-1a28d89d6a9c?w=200&q=80',
    type: {
      vi: 'Wellness Space',
      en: 'Wellness Space',
      fr: 'Espace Bien-être',
      cn: '健康空间',
      ar: 'فضاء العافية',
    },
  },
  {
    name: 'Samsung',
    logo: 'https://images.unsplash.com/photo-1583394838336-6a1c7c7b0a1c?w=200&q=80',
    type: {
      vi: 'Technology Partner',
      en: 'Technology Partner',
      fr: 'Partenaire Tech',
      cn: '科技伙伴',
      ar: 'شريك التقنية',
    },
  },
];

// ----------------------------------------------------------------------
// POLICIES PAGE
// ----------------------------------------------------------------------

export const spa4Policies = [
  {
    title: {
      vi: 'Chính sách đặt lịch',
      en: 'Booking Policy',
      fr: 'Politique de Réservation',
      cn: '预约政策',
      ar: 'سياسة الحجز',
    },
    content: {
      vi: 'Khách hàng nên đặt lịch trước 24h. Đặt lịch qua website, app, hotline. Hủy trước 24h được hoàn 100%.',
      en: 'Customers should book 24h in advance. Book via website, app, hotline. Cancel 24h before for 100% refund.',
      fr: "Les clients doivent réserver 24h à l'avance. Annulation 24h avant pour remboursement 100%.",
      cn: '客户应提前24小时预约。可通过网站、APP、热线预约。提前24小时取消可全额退款。',
      ar: 'يجب الحجز قبل 24 ساعة. الإلغاء قبل 24 ساعة لاسترداد 100%.',
    },
  },
  {
    title: {
      vi: 'Chính sách bảo mật',
      en: 'Privacy Policy',
      fr: 'Politique de Confidentialité',
      cn: '隐私政策',
      ar: 'سياسة الخصوصية',
    },
    content: {
      vi: 'Thông tin cá nhân được bảo mật và chỉ dùng để liên hệ, chăm sóc khách hàng.',
      en: 'Personal information is confidential and only used for communication and customer care.',
      fr: 'Les informations personnelles sont confidentielles et utilisées uniquement pour la communication.',
      cn: '个人信息保密，仅用于沟通和客户服务。',
      ar: 'المعلومات الشخصية سرية وتستخدم فقط للتواصل وخدمة العملاء.',
    },
  },
  {
    title: {
      vi: 'Chính sách thẻ thành viên',
      en: 'Membership Card Policy',
      fr: 'Politique Carte Membre',
      cn: '会员卡政策',
      ar: 'سياسة بطاقة العضوية',
    },
    content: {
      vi: 'Thẻ thành viên có giá trị 12 tháng, không hoàn tiền, có thể chuyển nhượng một lần.',
      en: 'Membership card is valid for 12 months, non-refundable, transferable once.',
      fr: 'La carte membre est valide 12 mois, non remboursable, transférable une fois.',
      cn: '会员卡有效期为12个月，不可退款，可转让一次。',
      ar: 'بطاقة العضوية صالحة لمدة 12 شهراً، غير قابلة للاسترداد، قابلة للتحويل مرة واحدة.',
    },
  },
];
