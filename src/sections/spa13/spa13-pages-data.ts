// Color palette
export const JUNGLE_GREEN = '#0D4A2A';
export const TROPICAL_GOLD = '#F7C948';
export const AMAZON_FLAME = '#E05D2A';
export const RIVER_CLAY = '#A0522D';
export const FRESH_LEAF = '#F0FFF4';
export const DEEP_FOREST = '#082415';
export const SUN_GLOW = '#FFB347';

const getLang = (obj: Record<string, string>, lang: string): string =>
  obj[lang as keyof typeof obj] || obj.en || '';

const formatVND = (n: number): string => `${new Intl.NumberFormat('vi-VN').format(n)}₫`;

// Services
export const SPA13_SERVICES = [
  {
    id: 'acai-scrub',
    name: {
      vi: 'Açaí Glow Scrub',
      en: 'Açaí Glow Scrub',
      fr: 'Açaí Glow Scrub',
      cn: 'Açaí Glow Scrub',
      ar: 'Açaí Glow Scrub',
    },
    description: {
      vi: 'Tẩy da chết toàn thân với quả açaí nguyên chất từ Pará. Kết hợp massage dầu dừa ấm và sữa tắm botanical.',
      en: 'Full-body exfoliation with pure açaí berries from Pará. Combined with warm coconut oil massage and botanical bath.',
      fr: "Gommage corporel aux baies açaí pures du Pará. Combiné avec un massage à l'huile de coco tiède et un bain botanique.",
      cn: '使用来自帕拉州的纯阿萨伊浆果进行全身去角质。结合温热椰子油按摩和草本浴。',
      ar: 'تقشير كامل للجسم بتوت الأساي النقي من بارا. مع تدليك بزيت جوز الهند الدافئ وحمام عشبي.',
    },
    duration: 60,
    price: 780000,
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80',
    category: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体', ar: 'جسم' },
    benefits: {
      vi: ['Tẩy tế bào chết', 'Làm sáng da', 'Kích thích tuần hoàn'],
      en: ['Exfoliation', 'Skin brightening', 'Circulation boost'],
      fr: ['Exfoliation', 'Éclaircissement', 'Stimulation circulatoire'],
      cn: ['去角质', '提亮肤色', '促进循环'],
      ar: ['تقشير', 'تفتيح البشرة', 'تنشيط الدورة'],
    },
  },
  {
    id: 'andiroba-massage',
    name: {
      vi: 'Andiroba Deep Massage',
      en: 'Andiroba Deep Massage',
      fr: 'Andiroba Deep Massage',
      cn: 'Andiroba Deep Massage',
      ar: 'Andiroba Deep Massage',
    },
    description: {
      vi: 'Massage sâu trị liệu với dầu andiroba nguyên chất. Giảm đau cơ, viêm khớp và stress tích tụ.',
      en: 'Therapeutic deep massage with pure andiroba oil. Relieves muscle pain, arthritis and accumulated stress.',
      fr: "Massage profond thérapeutique à l'huile d'andiroba pure. Soulage les douleurs musculaires, l'arthrite et le stress accumulé.",
      cn: '使用纯安迪罗巴油进行的深度治疗按摩。缓解肌肉疼痛、关节炎和积累的压力。',
      ar: 'تدليك علاجي عميق بزيت الأنديروبا النقي. يخفف آلام العضلات والتهاب المفاصل والتوتر المتراكم.',
    },
    duration: 90,
    price: 1100000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    category: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体', ar: 'جسم' },
    benefits: {
      vi: ['Giảm đau cơ', 'Chống viêm', 'Thư giãn sâu'],
      en: ['Muscle pain relief', 'Anti-inflammatory', 'Deep relaxation'],
      fr: ['Soulagement musculaire', 'Anti-inflammatoire', 'Relaxation profonde'],
      cn: ['缓解肌肉痛', '抗炎', '深层放松'],
      ar: ['تخفيف آلام العضلات', 'مضاد للالتهاب', 'استرخاء عميق'],
    },
  },
  {
    id: 'tucuma-wrap',
    name: {
      vi: 'Tucumã Botanical Wrap',
      en: 'Tucumã Botanical Wrap',
      fr: 'Tucumã Botanical Wrap',
      cn: 'Tucumã Botanical Wrap',
      ar: 'Tucumã Botanical Wrap',
    },
    description: {
      vi: 'Đắp bùn toàn thân với bơ tucumã giàu vitamin A. Dưỡng ẩm sâu cho da khô, nứt nẻ.',
      en: 'Full-body wrap with tucumã butter rich in vitamin A. Deep hydration for dry, cracked skin.',
      fr: 'Enveloppement corporel au beurre de tucumã riche en vitamine A. Hydratation profonde pour peau sèche et gercée.',
      cn: '使用富含维生素A的图库马脂进行全身裹敷。深层滋润干燥龟裂的肌肤。',
      ar: 'لف كامل للجسم بزبدة التوكوما الغنية بفيتامين أ. ترطيب عميق للبشرة الجافة والمتشققة.',
    },
    duration: 75,
    price: 950000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体', ar: 'جسم' },
    benefits: {
      vi: ['Dưỡng ẩm sâu', 'Phục hồi da', 'Vitamin A thiên nhiên'],
      en: ['Deep hydration', 'Skin repair', 'Natural vitamin A'],
      fr: ['Hydratation profonde', 'Réparation cutanée', 'Vitamine A naturelle'],
      cn: ['深层保湿', '修复肌肤', '天然维生素A'],
      ar: ['ترطيب عميق', 'إصلاح البشرة', 'فيتامين أ طبيعي'],
    },
  },
  {
    id: 'argila-detox',
    name: {
      vi: 'Argila Detox Ritual',
      en: 'Argila Detox Ritual',
      fr: 'Argila Detox Ritual',
      cn: 'Argila Detox Ritual',
      ar: 'Argila Detox Ritual',
    },
    description: {
      vi: 'Nghi thức detox với đất sét trắng Amazon. Thải độc qua da, cân bằng pH và bổ sung khoáng chất.',
      en: 'Detox ritual with Amazon white clay. Draws toxins, balances pH and replenishes minerals.',
      fr: "Rituel détox à l'argile blanche d'Amazonie. Draine les toxines, équilibre le pH et reconstitue les minéraux.",
      cn: '使用亚马逊白黏土的排毒仪式。排出毒素、平衡pH值并补充矿物质。',
      ar: 'طقوس إزالة السموم بالطين الأبيض الأمازوني. يسحب السموم ويوازن الحموضة ويغذي بالمعادن.',
    },
    duration: 90,
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=800&q=80',
    category: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体', ar: 'جسم' },
    benefits: {
      vi: ['Thải độc', 'Cân bằng pH', 'Bổ sung khoáng'],
      en: ['Detoxification', 'pH balance', 'Mineral boost'],
      fr: ['Détox', 'Équilibre pH', 'Apport minéral'],
      cn: ['排毒', '平衡pH', '矿物补给'],
      ar: ['إزالة السموم', 'توازن الحموضة', 'تمعدن'],
    },
    isSignature: true,
  },
  {
    id: 'selva-completa',
    name: {
      vi: 'Selva Completa Journey',
      en: 'Selva Completa Journey',
      fr: 'Selva Completa Journey',
      cn: 'Selva Completa Journey',
      ar: 'Selva Completa Journey',
    },
    description: {
      vi: 'Hành trình trọn vẹn Amazon: Açaí scrub + Andiroba massage + Tucumã wrap + Argila detox. Trải nghiệm đại ngàn trong 3 giờ.',
      en: 'Complete Amazon journey: Açaí scrub + Andiroba massage + Tucumã wrap + Argila detox. The full forest experience in 3 hours.',
      fr: "Voyage complet en Amazonie : Gommage açaí + massage andiroba + enveloppement tucumã + détox argila. L'expérience forestière totale en 3 heures.",
      cn: '完整的亚马逊之旅：阿萨伊去角质 + 安迪罗巴按摩 + 图库马裹敷 + 黏土排毒。3小时完整的森林体验。',
      ar: 'رحلة الأمازون الكاملة: تقشير أساي + تدليك أنديروبا + لف توكوما + إزالة سموم أرجيلا. تجربة الغابة الكاملة في 3 ساعات.',
    },
    duration: 180,
    price: 2800000,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    category: { vi: 'Retreat', en: 'Retreat', fr: 'Retraite', cn: '套餐', ar: 'retreat' },
    benefits: {
      vi: ['Trải nghiệm trọn vẹn', 'Tiết kiệm 600k', 'Tặng quà botanical'],
      en: ['Complete experience', 'Save 600k', 'Botanical gift'],
      fr: ['Expérience complète', 'Économisez 600k', 'Cadeau botanique'],
      cn: ['完整体验', '省600k', '赠送草本礼盒'],
      ar: ['تجربة كاملة', 'وفر 600 ألف', 'هدية عشبية'],
    },
    isSignature: true,
  },
  {
    id: 'copaiba-therapy',
    name: {
      vi: 'Copaíba Relief Therapy',
      en: 'Copaíba Relief Therapy',
      fr: 'Copaíba Relief Therapy',
      cn: 'Copaíba Relief Therapy',
      ar: 'Copaíba Relief Therapy',
    },
    description: {
      vi: 'Trị liệu với nhựa copaíba — "penicillin của rừng". Giảm đau mãn tính, viêm và đau khớp hiệu quả.',
      en: 'Therapy with copaíba resin — "forest penicillin". Effective for chronic pain, inflammation and joint pain.',
      fr: 'Thérapie à la résine de copaíba — "pénicilline de la forêt". Efficace pour les douleurs chroniques, l\'inflammation et les douleurs articulaires.',
      cn: '使用古巴香脂树脂治疗——"森林青霉素"。有效缓解慢性疼痛、炎症和关节痛。',
      ar: 'علاج براتنج الكوبايبا — "بنسلين الغابة". فعّال للآلام المزمنة والالتهاب وآلام المفاصل.',
    },
    duration: 75,
    price: 1350000,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5fbd966?w=800&q=80',
    category: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体', ar: 'جسم' },
    benefits: {
      vi: ['Giảm đau mãn tính', 'Chống viêm mạnh', 'Đau khớp'],
      en: ['Chronic pain relief', 'Strong anti-inflammatory', 'Joint pain'],
      fr: ['Soulagement chronic', 'Anti-inflammatoire fort', 'Douleurs articulaires'],
      cn: ['缓解慢性痛', '强力抗炎', '关节疼痛'],
      ar: ['تخفيف الآلام المزمنة', 'مضاد التهاب قوي', 'آلام المفاصل'],
    },
  },
];

// Training Programs
export const SPA13_TRAINING = [
  {
    id: 'basic-botanical',
    name: {
      vi: 'Amazon Botanical Basics',
      en: 'Amazon Botanical Basics',
      fr: 'Amazon Botanical Basics',
      cn: '亚马逊草本基础',
      ar: 'أساسيات نباتات الأمازون',
    },
    duration: { vi: '2 tuần', en: '2 weeks', fr: '2 semaines', cn: '2周', ar: 'أسبوعان' },
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  },
  {
    id: 'massage-therapy',
    name: {
      vi: 'Andiroba Massage Therapy',
      en: 'Andiroba Massage Therapy',
      fr: 'Andiroba Massage Therapy',
      cn: '安迪罗巴按摩疗法',
      ar: 'علاج تدليك الأنديروبا',
    },
    duration: { vi: '4 tuần', en: '4 weeks', fr: '4 semaines', cn: '4周', ar: '4 أسابيع' },
    price: 8500000,
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80',
  },
  {
    id: 'master-terapeuta',
    name: {
      vi: 'Master Terapeuta',
      en: 'Master Terapeuta',
      fr: 'Master Terapeuta',
      cn: '大师级治疗师',
      ar: 'معالج رئيسي',
    },
    duration: { vi: '8 tuần', en: '8 weeks', fr: '8 semaines', cn: '8周', ar: '8 أسابيع' },
    price: 15000000,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
];

// Blog Posts
export const SPA13_BLOGS = [
  {
    id: 'kayapo-secrets',
    title: {
      vi: 'Bí mật của người Kayapó',
      en: 'Secrets of the Kayapó',
      fr: 'Les secrets des Kayapó',
      cn: '卡雅波人的秘密',
      ar: 'أسرار الكايابو',
    },
    excerpt: {
      vi: 'Khám phá tri thức thảo dược hàng nghìn năm của người bản địa Kayapó...',
      en: "Discover the Kayapó people's millennia-old botanical wisdom...",
      fr: 'Découvrez la sagesse botanique millénaire du peuple Kayapó...',
      cn: '探索卡雅波人传承千年的草本智慧...',
      ar: 'اكتشف الحكمة النباتية التي يعود لها آلاف السنين لدى شعب الكايابو...',
    },
    date: '2024-03-15',
    category: { vi: 'Câu chuyện', en: 'Stories', fr: 'Histoires', cn: '故事', ar: 'قصص' },
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
  {
    id: 'acai-benefits',
    title: {
      vi: 'Açaí: Siêu thực vật Amazon',
      en: 'Açaí: Amazon Superfood',
      fr: "Açaí: Superfruit d'Amazonie",
      cn: '阿萨伊：亚马逊超级水果',
      ar: 'الأساي: السوبر فوود الأمازوني',
    },
    excerpt: {
      vi: 'Tại sao açaí được gọi là siêu thực phẩm mạnh nhất Amazon...',
      en: "Why açaí is called Amazon's most powerful superfood...",
      fr: "Pourquoi l'açaí est appelé le superaliment le plus puissant d'Amazonie...",
      cn: '为什么阿萨伊被称为亚马逊最强超级食物...',
      ar: 'لماذا يُسمى الأساي أقوى سوبر فوود في الأمازون...',
    },
    date: '2024-03-10',
    category: { vi: 'Mẹo', en: 'Tips', fr: 'Conseils', cn: '技巧', ar: 'نصائح' },
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80',
  },
  {
    id: 'rainforest-sustainability',
    title: {
      vi: 'Bền vững rừng mưa',
      en: 'Rainforest Sustainability',
      fr: 'Durabilité de la forêt',
      cn: '雨林可持续发展',
      ar: 'استدامة الغابة المطيرة',
    },
    excerpt: {
      vi: 'Chúng tôi bảo vệ Amazon ra sao qua từng liệu trình...',
      en: 'How we protect the Amazon through every treatment...',
      fr: "Comment nous protégeons l'Amazonie à travers chaque soin...",
      cn: '我们如何通过每个护理项目保护亚马逊...',
      ar: 'كيف نحمي الأمازون من خلال كل علاج...',
    },
    date: '2024-03-05',
    category: { vi: 'Tin tức', en: 'News', fr: 'Actualités', cn: '新闻', ar: 'أخبار' },
    image: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=800&q=80',
  },
];

// Careers
export const SPA13_CAREERS = [
  {
    id: 'terapeuta',
    title: {
      vi: 'Terapeuta Amazon',
      en: 'Amazon Terapeuta',
      fr: 'Terapeuta Amazon',
      cn: '亚马逊治疗师',
      ar: 'معالج الأمازون',
    },
    location: {
      vi: 'Hồ Chí Minh',
      en: 'Ho Chi Minh',
      fr: 'Ho Chi Minh',
      cn: '胡志明市',
      ar: 'هو تشي منه',
    },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
  },
  {
    id: 'front-desk',
    title: {
      vi: 'Tiếp tân Spa',
      en: 'Spa Receptionist',
      fr: 'Réceptionniste Spa',
      cn: 'Spa前台',
      ar: 'موظف استقبال',
    },
    location: { vi: 'Hà Nội', en: 'Ha Noi', fr: 'Hanoï', cn: '河内', ar: 'هانوي' },
    type: {
      vi: 'Bán thời gian',
      en: 'Part-time',
      fr: 'Temps partiel',
      cn: '兼职',
      ar: 'دوام جزئي',
    },
  },
  {
    id: 'manager',
    title: {
      vi: 'Quản lý chi nhánh',
      en: 'Branch Manager',
      fr: 'Responsable de succursale',
      cn: '分店经理',
      ar: 'مدير فرع',
    },
    location: { vi: 'Đà Nẵng', en: 'Da Nang', fr: 'Da Nang', cn: '岘港', ar: 'دانانغ' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
  },
];

// Branches
export const SPA13_BRANCHES = [
  {
    id: 'hcmc',
    name: {
      vi: 'Spa 13 Thảo Điền',
      en: 'Spa 13 Thao Dien',
      fr: 'Spa 13 Thao Dien',
      cn: 'Thảo Điền店',
      ar: 'Spa 13 ثاو ديين',
    },
    address: {
      vi: '26 Nguyễn Văn Hưởng, Thảo Điền, TP.HCM',
      en: '26 Nguyen Van Huong, Thao Dien, HCMC',
      fr: '26 Nguyen Van Huong, Thao Dien, HCMC',
      cn: '胡志明市Thảo Điền Nguyễn Văn Hưởng 26号',
      ar: '26 Nguyễn Văn Hưởng، ثاو ديين، هوشي منه',
    },
    phone: '+84 28 1234 5678',
    hours: {
      vi: '9:00 - 21:00',
      en: '9:00 AM - 9:00 PM',
      fr: '9h00 - 21h00',
      cn: '9:00 - 21:00',
      ar: '9:00 - 21:00',
    },
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
  {
    id: 'hanoi',
    name: {
      vi: 'Spa 13 Tây Hồ',
      en: 'Spa 13 Tay Ho',
      fr: 'Spa 13 Tay Ho',
      cn: '西湖店',
      ar: 'Spa 13 تاي هو',
    },
    address: {
      vi: '12 Xuân La, Tây Hồ, Hà Nội',
      en: '12 Xuan La, Tay Ho, Ha Noi',
      fr: '12 Xuan La, Tay Ho, Hanoï',
      cn: '河内西湖区春罗12号',
      ar: '12 Xuân La، تاي هو، هانوي',
    },
    phone: '+84 24 1234 5678',
    hours: {
      vi: '9:00 - 21:00',
      en: '9:00 AM - 9:00 PM',
      fr: '9h00 - 21h00',
      cn: '9:00 - 21:00',
      ar: '9:00 - 21:00',
    },
    image: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=800&q=80',
  },
  {
    id: 'manaus',
    name: {
      vi: 'Spa 13 Manaus — Brazil',
      en: 'Spa 13 Manaus — Brazil',
      fr: 'Spa 13 Manaus — Brésil',
      cn: '巴西马瑙斯店',
      ar: 'Spa 13 ماناوس — البرازيل',
    },
    address: {
      vi: 'Rua dos Andiros, 45, Centro, Manaus, AM, Brazil',
      en: 'Rua dos Andiros, 45, Centro, Manaus, AM, Brazil',
      fr: 'Rua dos Andiros, 45, Centro, Manaus, AM, Brésil',
      cn: '巴西亚马逊州马瑙斯市中心Andiros街45号',
      ar: 'Rua dos Andiros, 45, Centro, Manaus, AM, البرازيل',
    },
    phone: '+55 92 1234 5678',
    hours: {
      vi: '9:00 - 20:00',
      en: '9:00 AM - 8:00 PM',
      fr: '9h00 - 20h00',
      cn: '9:00 - 20:00',
      ar: '9:00 - 20:00',
    },
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  },
];

// Gallery
export const SPA13_GALLERY = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    category: 'spa',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&q=80',
    category: 'treatments',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    category: 'nature',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=800&q=80',
    category: 'treatments',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    category: 'nature',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1518531933037-91b2f5fbd966?w=800&q=80',
    category: 'spa',
  },
];

// FAQs
export const SPA13_FAQS = [
  {
    id: 'q1',
    question: {
      vi: 'Nguyên liệu từ đâu?',
      en: 'Where do ingredients come from?',
      fr: "D'où viennent les ingrédients?",
      cn: '原料来自哪里？',
      ar: 'من أين تأتي المكونات؟',
    },
    answer: {
      vi: '100% nguyên liệu từ nguồn bền vững tại Pará, Amazonas và Roraima, Brazil, chứng nhận IBAMA.',
      en: '100% ingredients from sustainable sources in Pará, Amazonas and Roraima, Brazil, IBAMA certified.',
      fr: '100% des ingrédients de sources durables à Pará, Amazonas et Roraima, Brésil, certifié IBAMA.',
      cn: '100%原料来自巴西帕拉州、亚马逊州和罗赖马州的可持续来源，获IBAMA认证。',
      ar: '100% من مصادر مستدامة في بارا وأمازوناس ورورايما، البرازيل، معتمد من IBAMA.',
    },
  },
  {
    id: 'q2',
    question: {
      vi: 'Mỗi booking có thực sự trồng cây?',
      en: 'Does each booking really plant a tree?',
      fr: 'Chaque réservation plante-t-elle vraiment un arbre?',
      cn: '每次预订真的种树吗？',
      ar: 'هل كل حجز يزرع شجرة حقًا؟',
    },
    answer: {
      vi: 'Đúng. Chúng tôi hợp tác với tổ chức One Tree Planted để trồng 1 cây tại Amazon cho mỗi booking.',
      en: 'Yes. We partner with One Tree Planted to plant 1 tree in the Amazon for each booking.',
      fr: 'Oui. Nous nous associons à One Tree Planted pour planter 1 arbre en Amazonie pour chaque réservation.',
      cn: '是的。我们与One Tree Planted合作，为每次预订在亚马逊种植一棵树。',
      ar: 'نعم. نتشارك مع One Tree Planted لزراعة شجرة واحدة في الأمازون لكل حجز.',
    },
  },
  {
    id: 'q3',
    question: {
      vi: 'Liệu trình phù hợp da nhạy cảm?',
      en: 'Are treatments suitable for sensitive skin?',
      fr: 'Les soins conviennent-ils aux peaux sensibles?',
      cn: '护理适合敏感肌吗？',
      ar: 'هل العلاجات مناسبة للبشرة الحساسة؟',
    },
    answer: {
      vi: 'Các liệu trình sử dụng nguyên liệu thiên nhiên 100% và có thể điều chỉnh cho da nhạy cảm.',
      en: 'Treatments use 100% natural ingredients and can be adjusted for sensitive skin.',
      fr: "Les soins utilisent 100% d'ingrédients naturels et peuvent être adaptés aux peaux sensibles.",
      cn: '护理使用100%天然成分，可根据敏感肌肤调整。',
      ar: 'العلاجات تستخدم مكونات طبيعية 100% ويمكن تعديلها للبشرة الحساسة.',
    },
  },
];

// Packages
export const SPA13_PACKAGES = [
  {
    id: 'discovery',
    name: {
      vi: 'Gói Khám Phá',
      en: 'Discovery Package',
      fr: 'Forfait Découverte',
      cn: '探索套餐',
      ar: 'باقة الاكتشاف',
    },
    sessions: 3,
    price: 2100000,
    savings: 240000,
  },
  {
    id: 'retreat',
    name: {
      vi: 'Gói Retreat',
      en: 'Retreat Package',
      fr: 'Forfait Retraite',
      cn: '静修套餐',
      ar: 'باقة retreat',
    },
    sessions: 6,
    price: 3900000,
    savings: 780000,
  },
  {
    id: 'jungle',
    name: {
      vi: 'Gói Jungle',
      en: 'Jungle Package',
      fr: 'Forfait Jungle',
      cn: '森林套餐',
      ar: 'باقة الغابة',
    },
    sessions: 12,
    price: 7200000,
    savings: 1800000,
  },
];

// Promotions
export const SPA13_PROMOTIONS = [
  {
    id: 'p1',
    title: {
      vi: 'Giảm 20% liệu trình đầu',
      en: '20% off first treatment',
      fr: '20% sur le premier soin',
      cn: '首次护理8折',
      ar: 'خصم 20% على العلاج الأول',
    },
    code: 'JUNGLE20',
    validUntil: '2024-12-31',
  },
  {
    id: 'p2',
    title: {
      vi: 'Mua 3 tặng 1 liệu trình',
      en: 'Buy 3 get 1 free',
      fr: 'Achetez 3, recevez 1 gratuit',
      cn: '买三送一',
      ar: 'اشتر 3 واحصل على 1 مجانًا',
    },
    code: 'AMAZON4',
    validUntil: '2024-12-31',
  },
];

// Feedbacks
export const SPA13_FEEDBACKS = [
  {
    id: 'f1',
    name: 'Lan Anh',
    rating: 5,
    comment: {
      vi: 'Trải nghiệm tuyệt vời! Da sáng hẳn sau Açaí Glow Scrub.',
      en: 'Amazing experience! My skin is so bright after the Açaí Glow Scrub.',
      fr: 'Expérience incroyable! Ma peau est si lumineuse après le gommage açaí.',
      cn: '太棒了！做完阿萨伊去角质后皮肤明显提亮了。',
      ar: 'تجربة رائعة! بشرتي مشرقة بعد تقشير الأساي.',
    },
    date: '2024-03-01',
  },
  {
    id: 'f2',
    name: 'Minh Tuấn',
    rating: 5,
    comment: {
      vi: 'Andiroba Massage trị đau lưng mãn tính hiệu quả. Highly recommend!',
      en: 'Andiroba Massage effectively treated my chronic back pain. Highly recommend!',
      fr: 'Le massage andiroba a soigné efficacement mes douleurs lombaires chroniques. Je recommande!',
      cn: '安迪罗巴按摩有效缓解了我的慢性背痛。强烈推荐！',
      ar: 'تدليك الأنديروبا عالج آلام ظهري المزمنة بفعالية. أنصح به بشدة!',
    },
    date: '2024-02-28',
  },
];

// Offers
export const SPA13_OFFERS = [
  {
    id: 'o1',
    title: {
      vi: 'Summer Amazon Escape',
      en: 'Summer Amazon Escape',
      fr: "Évasion Amazonienne d'Été",
      cn: '夏日亚马逊之旅',
      ar: 'هروب الأمازون الصيفي',
    },
    discount: '25%',
    description: {
      vi: 'Giảm 25% cho Selva Completa Journey từ 15/6 - 31/8',
      en: '25% off Selva Completa Journey from Jun 15 - Aug 31',
      fr: '25% sur Selva Completa du 15 juin au 31 août',
      cn: '6月15日至8月31日Selva Completa Journey立减25%',
      ar: 'خصم 25% على Selva Completa من 15 يونيو إلى 31 أغسطس',
    },
    validUntil: '2024-08-31',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
];

// Partners
export const SPA13_PARTNERS = [
  { id: 'pt1', name: 'One Tree Planted', logo: '' },
  { id: 'pt2', name: 'IBAMA Brazil', logo: '' },
  { id: 'pt3', name: 'Kayapó Reserve', logo: '' },
  { id: 'pt4', name: 'Amazon Watch', logo: '' },
];

// Before/After
export const SPA13_BEFORE_AFTER = [
  {
    id: 'ba1',
    treatment: {
      vi: 'Açaí Glow Scrub',
      en: 'Açaí Glow Scrub',
      fr: 'Açaí Glow Scrub',
      cn: 'Açaí Glow Scrub',
      ar: 'Açaí Glow Scrub',
    },
    beforeImage: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=400&q=80',
  },
];

export { getLang, formatVND };
