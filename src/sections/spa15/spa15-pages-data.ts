// ----------------------------------------------------------------------
// spa15 sub-pages – Japanese Onsen Ryokan theme (sumi / sakura / kinpaku / washi)
// Wabi-sabi wellness, traditional Japanese aesthetics
// ----------------------------------------------------------------------

export const SPA15_PAGE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80',
  services: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1600&q=80',
  serviceDetails: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
  training: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80',
  blog: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80',
  careers: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80',
  booking: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80',
  contact: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1600&q=80',
  offers: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1600&q=80',
  feedback: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1600&q=80',
  promotions: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
  branches: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1600&q=80',
  account: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80',
  partners: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1600&q=80',
  packages: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80',
  beforeAfter: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
  faq: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1600&q=80',
  policy: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1600&q=80',
  gallery: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1600&q=80',
};

// Services
export const spa15ServiceCategories = [
  { value: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tous', cn: '全部', ar: 'All' } },
  {
    value: 'shiatsu',
    label: { vi: 'Shiatsu', en: 'Shiatsu', fr: 'Shiatsu', cn: '指压', ar: 'Shiatsu' },
  },
  {
    value: 'facial',
    label: { vi: 'Facial', en: 'Facial', fr: 'Facial', cn: '面部护理', ar: 'Facial' },
  },
  { value: 'body', label: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体护理', ar: 'Body' } },
  { value: 'onsen', label: { vi: 'Onsen', en: 'Onsen', fr: 'Onsen', cn: '温泉', ar: 'Onsen' } },
];

export const formatVND = (n: number): string => `${new Intl.NumberFormat('vi-VN').format(n)}₫`;

export const getLang = (obj: Record<string, string>, lang: string): string =>
  obj[lang as keyof typeof obj] || obj.en || '';

export const spa15Services = [
  {
    slug: 'shiatsu-truyen-thong',
    category: 'shiatsu',
    name: {
      vi: 'Shiatsu Cổ Truyền',
      en: 'Traditional Shiatsu',
      fr: 'Shiatsu Traditionnel',
      cn: '传统指压',
      ar: 'Shiatsu التقليدي',
    },
    short: {
      vi: 'Bấm huyệt theo 12 kinh mạch Đông Á',
      en: 'Pressure point therapy on 12 meridians',
      fr: 'Thérapie sur 12 méridiens',
      cn: '按压12经络穴位',
      ar: 'علاج نقاط الضغط',
    },
    duration: 90,
    price: 1850000,
    icon: 'solar:hand-stars-bold-duotone',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    benefits: {
      vi: ['Giải tỏa khí trệ', 'Cân bằng âm dương', 'Giảm đau lưng', 'Thư giãn sâu'],
      en: ['Release blocked energy', 'Balance yin-yang', 'Back pain relief', 'Deep relaxation'],
      fr: ["Libérer l'énergie", 'Équilibre yin-yang', 'Soulager le dos', 'Relaxation profonde'],
      cn: ['疏通气滞', '平衡阴阳', '缓解背痛', '深度放松'],
      ar: ['تحرير الطاقة', 'توازن ين-يانغ', 'تخفيف آلام الظهر', 'استرخاء عميق'],
    },
  },
  {
    slug: 'anma-sumo',
    category: 'shiatsu',
    name: {
      vi: 'Anma Sumo',
      en: 'Anma Sumo Therapy',
      fr: 'Anma Sumo',
      cn: '相扑按摩',
      ar: 'Anma Sumo',
    },
    short: {
      vi: 'Kỹ thuật xoa bóp võ sĩ sumo',
      en: 'Traditional sumo wrestler massage',
      fr: 'Massage des lutteurs sumo',
      cn: '相扑力士按摩技术',
      ar: 'تدليك مصارعي السومو',
    },
    duration: 120,
    price: 2650000,
    icon: 'solar:body-bold-duotone',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
    benefits: {
      vi: ['Tái tạo cơ bắp', 'Giảm căng thẳng thể chất', 'Tăng sức bền', 'Hồi phục vận động viên'],
      en: ['Muscle regeneration', 'Physical stress relief', 'Endurance boost', 'Athletic recovery'],
      fr: [
        'Régénération musculaire',
        'Soulagement du stress',
        'Endurance',
        'Récupération sportive',
      ],
      cn: ['肌肉再生', '缓解身体压力', '增强耐力', '运动员恢复'],
      ar: ['تجديد العضلات', 'تخفيف التوتر الجسدي', 'تعزيز التحمل', 'تعافي الرياضيين'],
    },
  },
  {
    slug: 'geisha-facial',
    category: 'facial',
    name: {
      vi: 'Geisha Facial',
      en: 'Geisha Facial',
      fr: 'Soin Geisha',
      cn: '艺伎面部护理',
      ar: 'Geisha Facial',
    },
    short: {
      vi: 'Mặt nạ nhụy hoa anh đào, vàng 24K',
      en: 'Sakura blossom mask, 24K gold',
      fr: 'Masque sakura, or 24K',
      cn: '樱花面膜，24K金箔',
      ar: 'قناع الساكورا، ذهب 24K',
    },
    duration: 75,
    price: 2200000,
    icon: 'solar:face-scan-circle-bold-duotone',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    benefits: {
      vi: ['Trẻ hóa da', 'Sáng mịn', 'Dưỡng ẩm sâu', 'Gold 24K'],
      en: ['Anti-aging', 'Bright & smooth', 'Deep hydration', '24K gold'],
      fr: ['Anti-âge', 'Luminosité', 'Hydratation', 'Or 24K'],
      cn: ['抗衰老', '亮肤', '深层保湿', '24K金'],
      ar: ['مضاد للشيخوخة', 'إشراق البشرة', 'ترطيب عميق', 'ذهب 24K'],
    },
  },
  {
    slug: 'yuzu-body-scrub',
    category: 'body',
    name: {
      vi: 'Yuzu Body Scrub',
      en: 'Yuzu Body Scrub',
      fr: 'Gommage Yuzu',
      cn: '柚子身体磨砂',
      ar: 'Yuzu Body Scrub',
    },
    short: {
      vi: 'Muối biển, vỏ yuzu, mật ong manuka',
      en: 'Sea salt, yuzu peel, manuka honey',
      fr: 'Sel marin, yuzu, miel manuka',
      cn: '海盐、柚子皮、麦卢卡蜂蜜',
      ar: 'ملح البحر، يوزو، عسل مانوكا',
    },
    duration: 60,
    price: 1450000,
    icon: 'solar:leaf-bold-duotone',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    benefits: {
      vi: ['Tẩy tế bào chết', 'Da rạng rỡ', 'Vitamin C', 'Hương yuzu'],
      en: ['Exfoliation', 'Glowing skin', 'Vitamin C', 'Yuzu scent'],
      fr: ['Exfoliation', 'Peau lumineuse', 'Vitamine C', 'Senteur yuzu'],
      cn: ['去角质', '肌肤光泽', '维C', '柚子香'],
      ar: ['تقشير', 'بشرة متألقة', 'فيتامين سي', 'رائحة اليوزو'],
    },
  },
  {
    slug: 'matcha-cocoon',
    category: 'body',
    name: {
      vi: 'Matcha Cocoon',
      en: 'Matcha Cocoon',
      fr: 'Cocoon Matcha',
      cn: '抹茶裹肤',
      ar: 'Matcha Cocoon',
    },
    short: {
      vi: 'Đắp matcha Uji toàn thân, khăn lụa nóng',
      en: 'Full-body Uji matcha wrap, hot silk',
      fr: 'Enveloppement matcha, soie chaude',
      cn: '全身宇治抹茶裹敷，热丝绸巾',
      ar: 'تغطية كاملة بالماتشا',
    },
    duration: 90,
    price: 2050000,
    icon: 'solar:cup-hot-bold-duotone',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    benefits: {
      vi: ['Chống oxy hóa', 'Làm dịu viêm', 'Tái tạo da', 'Thư giãn'],
      en: ['Antioxidant', 'Anti-inflammatory', 'Skin renewal', 'Relaxation'],
      fr: ['Antioxydant', 'Anti-inflammatoire', 'Régénération', 'Détente'],
      cn: ['抗氧化', '抗炎', '肌肤再生', '放松'],
      ar: ['مضاد للأكسدة', 'مضاد للالتهاب', 'تجديد البشرة', 'استرخاء'],
    },
  },
  {
    slug: 'kintsugi-restorative',
    category: 'onsen',
    name: {
      vi: 'Kintsugi Restorative',
      en: 'Kintsugi Restorative',
      fr: 'Kintsugi Rajeunissant',
      cn: '金缮修复',
      ar: 'Kintsugi Restorative',
    },
    short: {
      vi: 'Onsen, shiatsu sâu, mặt nạ vàng kintsugi',
      en: 'Onsen, deep shiatsu, kintsugi gold mask',
      fr: 'Onsen, shiatsu, masque or kintsugi',
      cn: '温泉、深度指压、金缮金面膜',
      ar: 'أونسن، شياتسو، قناع ذهبي',
    },
    duration: 150,
    price: 3400000,
    icon: 'solar:magic-stick-3-bold-duotone',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
    benefits: {
      vi: ['Ngâm onsen', 'Shiatsu sâu', 'Mặt nạ vàng', 'Kintsugi healing'],
      en: ['Onsen soak', 'Deep shiatsu', 'Gold mask', 'Kintsugi healing'],
      fr: ['Bain onsen', 'Shiatsu profond', 'Masque or', 'Soin kintsugi'],
      cn: ['温泉浴', '深度指压', '金面膜', '金缮疗愈'],
      ar: ['حمام أونسن', 'شياتسو عميق', 'قناع ذهبي', 'شفاء كينتسوغي'],
    },
    isSignature: true,
  },
];

// Training Programs
export const spa15TrainingPrograms = [
  {
    slug: 'shiatsu-foundation',
    name: {
      vi: 'Shiatsu Foundation',
      en: 'Shiatsu Foundation',
      fr: 'Fondation Shiatsu',
      cn: '指压基础',
      ar: 'Shiatsu Foundation',
    },
    duration: { vi: '4 tuần', en: '4 weeks', fr: '4 semaines', cn: '4周', ar: '4 أسابيع' },
    level: { vi: 'Cơ bản', en: 'Beginner', fr: 'Débutant', cn: '初级', ar: 'مبتدئ' },
    price: 8500000,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    outcome: {
      vi: 'Chứng chỉ Shiatsu cấp 1',
      en: 'Level 1 Shiatsu Certificate',
      fr: 'Certificat Shiatsu Niveau 1',
      cn: '指压一级证书',
      ar: 'شهادة شيatsu مستوى 1',
    },
  },
  {
    slug: 'geisha-beauty-mastery',
    name: {
      vi: 'Geisha Beauty Mastery',
      en: 'Geisha Beauty Mastery',
      fr: 'Maîtrise Geisha',
      cn: '艺伎美颜精通',
      ar: 'Geisha Beauty Mastery',
    },
    duration: { vi: '8 tuần', en: '8 weeks', fr: '8 semaines', cn: '8周', ar: '8 أسابيع' },
    level: { vi: 'Nâng cao', en: 'Advanced', fr: 'Avancé', cn: '高级', ar: 'متقدم' },
    price: 15000000,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
    outcome: {
      vi: 'Chuyên gia facial Nhật Bản',
      en: 'Japanese Facial Specialist',
      fr: 'Spécialiste Facial Japonais',
      cn: '日式面部护理专家',
      ar: 'أخصائي وجه ياباني',
    },
  },
  {
    slug: 'onsen-therapy-certification',
    name: {
      vi: 'Onsen Therapy Certification',
      en: 'Onsen Therapy Certification',
      fr: 'Certification Onsen',
      cn: '温泉疗法认证',
      ar: 'Onsen Therapy Certification',
    },
    duration: { vi: '6 tuần', en: '6 weeks', fr: '6 semaines', cn: '6周', ar: '6 أسابيع' },
    level: { vi: 'Trung cấp', en: 'Intermediate', fr: 'Intermédiaire', cn: '中级', ar: 'متوسط' },
    price: 12000000,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
    outcome: {
      vi: 'Chứng nhận trị liệu onsen',
      en: 'Onsen Therapy Certification',
      fr: 'Certification Onsen',
      cn: '温泉疗法认证',
      ar: 'شهادة علاج أونسن',
    },
  },
];

// Blog Posts
export const spa15BlogCategories = [
  { name: 'Onsen', count: 4 },
  { name: 'Wabi-Sabi', count: 3 },
  { name: 'Shiatsu', count: 5 },
  { name: 'Tea Ceremony', count: 2 },
];

export const spa15BlogPosts = [
  {
    slug: 'wabi-sabi-beauty-philosophy',
    title: {
      vi: 'Triết lý Wabi-Sabi',
      en: 'Wabi-Sabi Beauty Philosophy',
      fr: 'Philosophie Wabi-Sabi',
      cn: '侘寂美学哲学',
      ar: 'فلسفة وابي-سابي',
    },
    excerpt: {
      vi: 'Tìm hiểu vẻ đẹp trong sự không hoàn hảo — triết lý Nhật Bản về nét đẹp khiêm nhường.',
      en: 'Finding beauty in imperfection — the Japanese philosophy of humble beauty.',
      fr: "Trouver la beauté dans l'imperfection — philosophie japonaise.",
      cn: '在不完美中发现美——日本谦逊之美哲学。',
      ar: 'إيجاد الجمال في النقص — فلسفة الجمال المتواضع.',
    },
    cover: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80',
    author: {
      vi: 'Aiko Tanaka',
      en: 'Aiko Tanaka',
      fr: 'Aiko Tanaka',
      cn: '田中爱子',
      ar: 'أيكو تاناكا',
    },
    date: '15/06/2024',
    category: 'Wabi-Sabi',
    readTime: '8 phút',
  },
  {
    slug: 'onsen-healing-minerals',
    title: {
      vi: 'Khoáng chất chữa lành trong Onsen',
      en: 'Healing Minerals in Onsen',
      fr: "Minéraux Guérisseurs de l'Onsen",
      cn: '温泉中的治愈矿物质',
      ar: 'المعادن الشافية في الأونسن',
    },
    excerpt: {
      vi: 'Tìm hiểu công dụng chữa lành của từng loại khoáng chất trong suối nước nóng Nhật Bản.',
      en: 'Discover the healing properties of minerals in Japanese hot springs.',
      fr: 'Découvrez les propriétés curatives des sources thermales.',
      cn: '了解日式温泉中矿物质的治愈特性。',
      ar: 'اكتشف خصائص المعادن الشفائية في الينابيع الساخنة.',
    },
    cover: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=900&q=80',
    author: {
      vi: 'Ren Fujimoto',
      en: 'Ren Fujimoto',
      fr: 'Ren Fujimoto',
      cn: '藤本莲',
      ar: 'رين فوجيموتو',
    },
    date: '22/06/2024',
    category: 'Onsen',
    readTime: '10 phút',
  },
  {
    slug: 'matcha-beauty-rituals',
    title: {
      vi: 'Nghi thức làm đẹp Matcha',
      en: 'Matcha Beauty Rituals',
      fr: 'Rituels Beauté Matcha',
      cn: '抹茶美容仪式',
      ar: 'طقوس الجمال بالماتشا',
    },
    excerpt: {
      vi: 'Cách Geisha sử dụng matcha để duy trì làn da không tuổi trong hàng thế kỷ.',
      en: 'How Geishas have used matcha for ageless skin for centuries.',
      fr: 'Comment les Geishas utilisent le matcha.',
      cn: '艺妓如何数百年来用抹茶保持不老肌肤。',
      ar: 'كيف استخدمت الجيشا الماتشا للحفاظ على بشرتها.',
    },
    cover: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    author: {
      vi: 'Hana Watanabe',
      en: 'Hana Watanabe',
      fr: 'Hana Watanabe',
      cn: '渡边花',
      ar: 'هانا واتانابي',
    },
    date: '05/07/2024',
    category: 'Tea Ceremony',
    readTime: '6 phút',
  },
];

// Careers
export const spa15Careers = [
  {
    slug: 'terapeuta-shiatsu',
    title: {
      vi: 'Terapeuta Shiatsu',
      en: 'Shiatsu Therapist',
      fr: 'Thérapeute Shiatsu',
      cn: '指压治疗师',
      ar: 'معالج Shiatsu',
    },
    location: {
      vi: 'TP.HCM / Hà Nội',
      en: 'HCMC / Hanoi',
      fr: 'HCMC / Hanoi',
      cn: '胡志明市/河内',
      ar: 'هوشي منه / هانوي',
    },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    salary: {
      vi: '15 – 25 triệu',
      en: '15 – 25 million VND',
      fr: '15 – 25 millions VND',
      cn: '1500-2500万越盾',
      ar: '15-25 مليون',
    },
    benefits: {
      vi: ['Đào tạo Nhật Bản', 'Bảo hiểm', 'Du lịch'],
      en: ['Japan training', 'Insurance', 'Travel'],
      fr: ['Formation Japon', 'Assurance', 'Voyage'],
      cn: ['日本培训', '保险', '旅游'],
      ar: ['تدريب اليابان', 'تأمين', 'سفر'],
    },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
  },
  {
    slug: 'onsen-specialist',
    title: {
      vi: 'Chuyên gia Onsen',
      en: 'Onsen Specialist',
      fr: 'Spécialiste Onsen',
      cn: '温泉专家',
      ar: 'أخصائي أونسن',
    },
    location: { vi: 'Đà Lạt', en: 'Da Lat', fr: 'Da Lat', cn: '大叻', ar: 'دالات' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    salary: {
      vi: '12 – 20 triệu',
      en: '12 – 20 million VND',
      fr: '12 – 20 millions VND',
      cn: '1200-2000万越盾',
      ar: '12-20 مليون',
    },
    benefits: {
      vi: ['Chứng chỉ Nhật', 'Bảo hiểm', 'Cơm trưa'],
      en: ['Japan Certificate', 'Insurance', 'Lunch'],
      fr: ['Certificat Japon', 'Assurance', 'Déjeuner'],
      cn: ['日本证书', '保险', '午餐'],
      ar: ['شهادة اليابان', 'تأمين', 'غداء'],
    },
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
  },
  {
    slug: 'tea-ceremony-master',
    title: {
      vi: 'Master Trà Đạo',
      en: 'Tea Ceremony Master',
      fr: 'Maître Cérémonie du Thé',
      cn: '茶道大师',
      ar: 'سيد حفل الشاي',
    },
    location: { vi: 'TP.HCM', en: 'HCMC', fr: 'HCMC', cn: '胡志明市', ar: 'هوشي منه' },
    type: {
      vi: 'Bán thời gian',
      en: 'Part-time',
      fr: 'Temps partiel',
      cn: '兼职',
      ar: 'دوام جزئي',
    },
    salary: {
      vi: 'Thỏa thuận',
      en: 'Negotiable',
      fr: 'Négociable',
      cn: '面议',
      ar: 'قابل للتفاوض',
    },
    benefits: {
      vi: ['Giờ linh hoạt', 'Môi trường zen', 'Matcha miễn phí'],
      en: ['Flexible hours', 'Zen environment', 'Free matcha'],
      fr: ['Horaires flexibles', 'Environnement zen', 'Matcha gratuit'],
      cn: ['灵活时间', '禅意环境', '免费抹茶'],
      ar: ['ساعات مرنة', 'بيئة زن', 'ماتشا مجاني'],
    },
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
  },
];

// Branches
export const spa15Branches = [
  {
    id: 'hcmc',
    city: {
      vi: 'TP. Hồ Chí Minh',
      en: 'Ho Chi Minh City',
      fr: 'Ho Chi Minh Ville',
      cn: '胡志明市',
      ar: 'هوشي منه',
    },
    name: {
      vi: 'Sakura Onsen Thảo Điền',
      en: 'Sakura Onsen Thao Dien',
      fr: 'Sakura Onsen Thao Dien',
      cn: '樱温泉Thảo Điền店',
      ar: 'ساكورا أونسن ثاو ديين',
    },
    address: {
      vi: '28 Nguyễn Văn Hưởng, Thảo Điền, TP.HCM',
      en: '28 Nguyen Van Huong, Thao Dien, HCMC',
      fr: '28 Nguyen Van Huong, Thao Dien, HCMC',
      cn: '胡志明市Thảo Điền阮文享街28号',
      ar: '28 Nguyễn Văn Hưởng، ثاو ديين',
    },
    phone: '+84 28 1234 5678',
    hours: {
      vi: '10:00 – 22:00',
      en: '10:00 AM – 10:00 PM',
      fr: '10h00 – 22h00',
      cn: '10:00 – 22:00',
      ar: '10:00 – 22:00',
    },
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
    features: {
      vi: ['Rotenburo ngoài trời', 'Phòng ryokan', 'Trà đạo'],
      en: ['Outdoor rotenburo', 'Ryokan rooms', 'Tea ceremony'],
      fr: ['Rotenburo extérieur', 'Chambres ryokan', 'Cérémonie du thé'],
      cn: ['露天温泉', '日式榻榻米房', '茶道'],
      ar: ['روتينبورو خارجي', 'غرف ريوكان', 'حفل الشاي'],
    },
  },
  {
    id: 'dalat',
    city: { vi: 'Đà Lạt', en: 'Da Lat', fr: 'Da Lat', cn: '大叻', ar: 'دالات' },
    name: {
      vi: 'Sakura Ryokan Đà Lạt',
      en: 'Sakura Ryokan Da Lat',
      fr: 'Sakura Ryokan Da Lat',
      cn: '大叻樱日式旅馆',
      ar: 'ساكورا ريوكان دالات',
    },
    address: {
      vi: '5 Đường Dan Kia, Đà Lạt',
      en: '5 Dan Kia Street, Da Lat',
      fr: '5 Rue Dan Kia, Da Lat',
      cn: '大叻丹基亚街5号',
      ar: '5 شارع دان كيا، دالات',
    },
    phone: '+84 263 123 4567',
    hours: {
      vi: '09:00 – 21:00',
      en: '9:00 AM – 9:00 PM',
      fr: '9h00 – 21h00',
      cn: '09:00 – 21:00',
      ar: '09:00 – 21:00',
    },
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
    features: {
      vi: ['Iwaburo đá núi lửa', 'Kinh ngắm trăng', 'Kaiseki'],
      en: ['Volcanic rock iwaburo', 'Moon-viewing deck', 'Kaiseki'],
      fr: ['Iwaburo volcanique', 'Plateau lunaire', 'Kaiseki'],
      cn: ['火山岩洞温泉', '赏月台', '怀石料理'],
      ar: ['إوابورو بركاني', 'منصة القمر', 'كايسيكي'],
    },
  },
  {
    id: 'kyoto',
    city: {
      vi: 'Kyoto, Nhật Bản',
      en: 'Kyoto, Japan',
      fr: 'Kyoto, Japon',
      cn: '日本京都',
      ar: 'كيوتو، اليابان',
    },
    name: {
      vi: 'Sakura Honke Kyoto',
      en: 'Sakura Honke Kyoto',
      fr: 'Sakura Honke Kyoto',
      cn: '京都樱本家',
      ar: 'ساكورا هونكي كيوتو',
    },
    address: {
      vi: '42 Hanamikoji, Gion, Kyoto, Japan',
      en: '42 Hanamikoji, Gion, Kyoto, Japan',
      fr: '42 Hanamikoji, Gion, Kyoto, Japon',
      cn: '日本京都祇园花见小路42号',
      ar: '42 هاناميكوجي، غيون، كيوتو',
    },
    phone: '+81 75 1234 5678',
    hours: {
      vi: '11:00 – 23:00',
      en: '11:00 AM – 11:00 PM',
      fr: '11h00 – 23h00',
      cn: '11:00 – 23:00',
      ar: '11:00 – 23:00',
    },
    image: 'https://images.unsplash.com/photo-1493976060389-6b8caa41e7fa?w=900&q=80',
    features: {
      vi: ['Ryokan 120 năm', 'Maiko trải nghiệm', 'Kaiseki Michelin'],
      en: ['120-year ryokan', 'Maiko experience', 'Michelin kaiseki'],
      fr: ['Ryokan 120 ans', 'Expérience Maiko', 'Kaiseki Michelin'],
      cn: ['120年历史旅店', '舞妓体验', '米其林怀石'],
      ar: ['ريوكان 120 سنة', 'تجربة مايكو', 'كايسيكي ميشلان'],
    },
  },
];

// Gallery
export const spa15Gallery = [
  {
    id: 'g1',
    src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
    category: 'onsen',
  },
  {
    id: 'g2',
    src: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=900&q=80',
    category: 'onsen',
  },
  {
    id: 'g3',
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
    category: 'treatment',
  },
  {
    id: 'g4',
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80',
    category: 'ryokan',
  },
  {
    id: 'g5',
    src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    category: 'nature',
  },
  {
    id: 'g6',
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80',
    category: 'nature',
  },
  {
    id: 'g7',
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
    category: 'treatment',
  },
  {
    id: 'g8',
    src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80',
    category: 'zen',
  },
];

// FAQs
export const spa15Faqs = [
  {
    id: 'q1',
    q: {
      vi: 'Cần đặt lịch trước bao lâu?',
      en: 'How far in advance should I book?',
      fr: "Combien de temps à l'avance?",
      cn: '需要提前多久预订？',
      ar: 'كم يجب الحجز مسبقًا؟',
    },
    a: {
      vi: 'Nên đặt lịch trước 1 ngày. Cuối tuần nên đặt trước 2-3 ngày.',
      en: 'Book 1 day in advance. Weekends: 2-3 days recommended.',
      fr: "Réservez 1 jour à l'avance. Weekends: 2-3 jours.",
      cn: '建议提前1天预订。周末建议提前2-3天。',
      ar: 'احجز قبل يوم واحد. عطلة نهاية الأسبوع: 2-3 أيام.',
    },
  },
  {
    id: 'q2',
    q: {
      vi: 'Onsen có phù hợp da nhạy cảm?',
      en: 'Is onsen suitable for sensitive skin?',
      fr: 'Onsen convient-il aux peaux sensibles?',
      cn: '温泉适合敏感肌吗？',
      ar: 'هل الأونسن مناسب للبشرة الحساسة؟',
    },
    a: {
      vi: 'Có. Nước onsen giàu khoáng chất tự nhiên, rất tốt cho da nhạy cảm.',
      en: 'Yes. Onsen water is rich in natural minerals, excellent for sensitive skin.',
      fr: "Oui. L'eau onsen est riche en minéraux naturels.",
      cn: '适合。温泉水富含天然矿物质，对敏感肌极佳。',
      ar: 'نعم. مياه الأونسن غنية بالمعادن الطبيعية.',
    },
  },
  {
    id: 'q3',
    q: {
      vi: 'Có chương trình thành viên không?',
      en: 'Is there a membership program?',
      fr: 'Y a-t-il un programme de fidélité?',
      cn: '有会员计划吗？',
      ar: 'هل هناك برنامج عضوية؟',
    },
    a: {
      vi: 'Có 3 hạng: Sakura, Hanami, Imperial với ưu đãi 10-20%.',
      en: 'Yes, 3 tiers: Sakura, Hanami, Imperial with 10-20% benefits.',
      fr: 'Oui, 3 niveaux: Sakura, Hanami, Imperial.',
      cn: '有3个等级：樱、花见、御，享10-20%优惠。',
      ar: 'نعم، 3 مستويات: ساكورا، هانامي، إمبريال.',
    },
  },
  {
    id: 'q4',
    q: {
      vi: 'Có phòng riêng cho gia đình?',
      en: 'Are there private family rooms?',
      fr: 'Y a-t-il des salles privées familiales?',
      cn: '有家庭私人房间吗？',
      ar: 'هل هناك غرف عائلية خاصة؟',
    },
    a: {
      vi: 'Có 6 phòng Ryokan riêng với onsen riêng, phù hợp gia đình 2-4 người.',
      en: 'Yes, 6 private Ryokan rooms with private onsen for 2-4 guests.',
      fr: 'Oui, 6 chambres Ryokan privées avec onsen.',
      cn: '有6间私人日式客房带私人温泉，适合2-4人家庭。',
      ar: 'نعم، 6 غرف ريوكان خاصة مع أونسن خاص.',
    },
  },
];

// Packages
export const spa15Packages = [
  {
    slug: 'sakura-escape',
    name: {
      vi: 'Sakura Escape',
      en: 'Sakura Escape',
      fr: 'Évasion Sakura',
      cn: '樱之旅',
      ar: 'Sakura Escape',
    },
    sessions: 3,
    price: 4500000,
    savings: 600000,
    perks: {
      vi: ['3 liệu trình', 'Trà đạo miễn phí'],
      en: ['3 treatments', 'Free tea ceremony'],
      fr: ['3 soins', 'Cérémonie du thé gratuite'],
      cn: ['3次疗程', '免费茶道'],
      ar: ['3 علاجات', 'حفل شاي مجاني'],
    },
  },
  {
    slug: 'hanami-journey',
    name: {
      vi: 'Hanami Journey',
      en: 'Hanami Journey',
      fr: 'Voyage Hanami',
      cn: '花见之旅',
      ar: 'Hanami Journey',
    },
    sessions: 6,
    price: 8500000,
    savings: 1800000,
    perks: {
      vi: ['6 liệu trình', 'Kaiseki tặng', 'Ưu đãi 15%'],
      en: ['6 treatments', 'Complimentary kaiseki', '15% discount'],
      fr: ['6 soins', 'Kaiseki offert', '15% réduction'],
      cn: ['6次疗程', '赠送怀石料理', '85折'],
      ar: ['6 علاجات', 'كايسيكي مجاني', 'خصم 15%'],
    },
    isPopular: true,
  },
  {
    slug: 'imperial-ryokan',
    name: {
      vi: 'Imperial Ryokan',
      en: 'Imperial Ryokan',
      fr: 'Ryokan Impérial',
      cn: '御用旅店',
      ar: 'Imperial Ryokan',
    },
    sessions: 12,
    price: 16900000,
    savings: 4500000,
    perks: {
      vi: ['12 liệu trình', 'Phòng ryokan VIP', 'Quản gia riêng'],
      en: ['12 treatments', 'VIP Ryokan room', 'Personal butler'],
      fr: ['12 soins', 'Chambre Ryokan VIP', 'Majordome personnel'],
      cn: ['12次疗程', 'VIP榻榻米房', '私人管家'],
      ar: ['12 علاج', 'غرفة ريوكان VIP', 'خدم شخصي'],
    },
  },
];

// Promotions
export const spa15Promotions = [
  {
    id: 'p1',
    title: {
      vi: 'Mùa hoa anh đào',
      en: 'Cherry Blossom Season',
      fr: 'Saison des Cerisiers',
      cn: '樱花季',
      ar: 'موسم الساكورا',
    },
    period: {
      vi: '01/03 – 30/04',
      en: 'March 1 – April 30',
      fr: '1 mars – 30 avril',
      cn: '3月1日-4月30日',
      ar: '1 مارس - 30 أبريل',
    },
    discount: '25%',
    save: {
      vi: 'Giảm 25% liệu trình Shiatsu',
      en: '25% off Shiatsu treatments',
      fr: '25% sur les soins Shiatsu',
      cn: '指压疗程75折',
      ar: 'خصم 25% على شياتسو',
    },
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
    endsAt: '2024-04-30T23:59:59',
  },
  {
    id: 'p2',
    title: {
      vi: 'Trăng thu Onsen',
      en: 'Autumn Moon Onsen',
      fr: "Lune d'Automne Onsen",
      cn: '秋月温泉',
      ar: 'قمر الخريف أونسن',
    },
    period: {
      vi: '15/09 – 15/11',
      en: 'Sep 15 – Nov 15',
      fr: '15 sept – 15 nov',
      cn: '9月15日-11月15日',
      ar: '15 سبتمبر - 15 نوفمبر',
    },
    discount: '20%',
    save: {
      vi: 'Giảm 20% gói Onsen',
      en: '20% off Onsen packages',
      fr: '20% sur les forfaits Onsen',
      cn: '温泉套餐8折',
      ar: 'خصم 20% على باقات أونسن',
    },
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=900&q=80',
    endsAt: '2024-11-15T23:59:59',
  },
];

// Feedbacks
export const spa15Feedbacks = [
  {
    id: 'f1',
    name: 'Linh Phạm',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=11',
    comment: {
      vi: 'Khoảnh khắc ngâm dưới hoa anh đào rơi là điều tôi sẽ không bao giờ quên. Như bước vào tranh ukiyo-e.',
      en: "The moment soaking under falling sakura petals is something I'll never forget. Like stepping into an ukiyo-e painting.",
      fr: 'Le moment sous les pétales de sakura est inoubliable. Comme dans une estampe ukiyo-e.',
      cn: '在飘落的樱花瓣下泡汤的那一刻永生难忘，仿佛走进了浮世绘。',
      ar: 'اللحظة تحت بتلات الساكورا لا تُنسى.',
    },
    service: 'Sakura Yu Onsen',
  },
  {
    id: 'f2',
    name: 'David Chen',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=54',
    comment: {
      vi: 'Shiatsu của master Aiko đã giải tỏa cơn đau lưng kinh niên 5 năm chỉ trong 2 buổi.',
      en: "Master Aiko's Shiatsu relieved my 5-year chronic back pain in just 2 sessions.",
      fr: 'Le Shiatsu de Maître Aiko a soulagé 5 ans de douleurs dorsales en 2 séances.',
      cn: 'Aiko大师的指压仅用2次疗程就缓解了我5年的慢性背痛。',
      ar: 'شياتسو السيدة أيكو خفف آلام ظهر 5 سنوات في جلستين فقط.',
    },
    service: 'Shiatsu Cổ Truyền',
  },
  {
    id: 'f3',
    name: 'Marie Lefèvre',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=32',
    comment: {
      vi: 'Kaiseki 9 món bên cạnh bồn yukimi giữa tuyết rơi — một bữa tối khó tin có thật ở Việt Nam.',
      en: '9-course kaiseki beside the yukimi onsen with snow falling — an unbelievable dinner in Vietnam.',
      fr: "Kaiseki 9 plats près de l'onsen yukimi avec neige — incroyable au Vietnam.",
      cn: '在雪景温泉旁享用9道怀石料理——在越南难以置信的晚餐体验。',
      ar: 'كايسيكي 9 أطباق بجانب أونسن يوكي مي — عشاء لا يُصدق.',
    },
    service: 'Imperial Ryokan Package',
  },
];

// Offers
export const spa15Offers = [
  {
    id: 'o1',
    title: {
      vi: 'Ưu đãi khách mới',
      en: 'New Guest Welcome',
      fr: 'Bienvenue Nouveaux Clients',
      cn: '新客优惠',
      ar: 'ترحيب الضيوف الجدد',
    },
    description: {
      vi: 'Giảm 30% liệu trình đầu tiên + Trà đạo miễn phí',
      en: '30% off first treatment + Complimentary tea ceremony',
      fr: '30% sur le premier soin + Cérémonie du thé offerte',
      cn: '首次疗程7折+赠送茶道体验',
      ar: 'خصم 30% على العلاج الأول + حفل شاي مجاني',
    },
    code: 'SAKURA30',
    expires: {
      vi: '31/12/2024',
      en: 'Dec 31, 2024',
      fr: '31 déc 2024',
      cn: '2024年12月31日',
      ar: '31 ديسمبر 2024',
    },
  },
  {
    id: 'o2',
    title: {
      vi: 'Combo Geisha Facial',
      en: 'Geisha Facial Combo',
      fr: 'Combo Soin Geisha',
      cn: '艺伎面部套餐',
      ar: 'باقة Geisha Facial',
    },
    description: {
      vi: 'Facial + Yuzu Scrub tiết kiệm 25%',
      en: 'Facial + Yuzu Scrub save 25%',
      fr: 'Facial + Gommage Yuzu économisez 25%',
      cn: '面部护理+柚子磨砂省25%',
      ar: 'وفر 25% على Facial + Yuzu',
    },
    code: 'GEISHA25',
    expires: {
      vi: '30/06/2024',
      en: 'Jun 30, 2024',
      fr: '30 juin 2024',
      cn: '2024年6月30日',
      ar: '30 يونيو 2024',
    },
  },
];

// Partners
export const spa15Partners = [
  { id: 'pt1', name: 'Shiseido Ginza', country: 'Japan', logo: 'SH', specialty: 'Skincare Luxury' },
  {
    id: 'pt2',
    name: 'Kobe Matcha House',
    country: 'Japan',
    logo: 'KM',
    specialty: 'Premium Matcha',
  },
  { id: 'pt3', name: 'Hinoki Master', country: 'Japan', logo: 'HM', specialty: 'Hinoki Wood' },
  {
    id: 'pt4',
    name: 'Kyoto Onsen Assoc.',
    country: 'Japan',
    logo: 'KO',
    specialty: 'Onsen Certification',
  },
];

// Before/After
export const spa15BeforeAfters = [
  {
    id: 'ba1',
    title: {
      vi: 'Shiatsu trị đau lưng – 4 buổi',
      en: 'Shiatsu Back Pain Relief – 4 sessions',
      fr: 'Shiatsu Soulagement Dos – 4 séances',
      cn: '指压治疗背痛 – 4次',
      ar: 'Shiatsu لآلام الظهر – 4 جلسات',
    },
    beforeImage: 'https://images.unsplash.com/photo-1571019613454-1f69971fe561?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544361677925-3e1c9e52b36b?w=600&q=80',
    duration: { vi: '2 tháng', en: '2 months', fr: '2 mois', cn: '2个月', ar: 'شهران' },
    note: {
      vi: 'Giảm 80% đau lưng, tư thế tốt hơn',
      en: '80% back pain reduction, improved posture',
      fr: '80% réduction douleur, posture améliorée',
      cn: '背痛减轻80%，体态改善',
      ar: 'تخفيف 80% من آلام الظهر',
    },
  },
  {
    id: 'ba2',
    title: {
      vi: 'Geisha Facial – 6 buổi',
      en: 'Geisha Facial – 6 sessions',
      fr: 'Soin Geisha – 6 séances',
      cn: '艺伎面部护理 – 6次',
      ar: 'Geisha Facial – 6 جلسات',
    },
    beforeImage: 'https://images.unsplash.com/photo-1522311840448-1ce6a0c98d57?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1529626144088-359d2b6a4195?w=600&q=80',
    duration: { vi: '6 tuần', en: '6 weeks', fr: '6 semaines', cn: '6周', ar: '6 أسابيع' },
    note: {
      vi: 'Da sáng mịn, giảm nếp nhăn',
      en: 'Bright smooth skin, reduced wrinkles',
      fr: 'Peau lumineuse, rides réduites',
      cn: '肌肤亮滑，皱纹减少',
      ar: 'بشرة مشرقة، تجاعيد أقل',
    },
  },
];

// About
export const spa15AboutStory = {
  vi: 'Sakura Onsen Ryokan ra đời năm 2018, mang trải nghiệm onsen truyền thống Nhật Bản đến Việt Nam với tinh thần wabi-sabi. Từ một ryokan nhỏ giữa rừng thông Đà Lạt, chúng tôi đã phát triển thành 3 cơ sở tại Việt Nam và 1 ryokan chính gốc tại Gion, Kyoto.',
  en: 'Sakura Onsen Ryokan was born in 2018, bringing authentic Japanese onsen experience to Vietnam with wabi-sabi spirit. From a small ryokan in Da Lat pine forest, we grew to 3 locations in Vietnam and our original ryokan in Gion, Kyoto.',
  fr: "Sakura Onsen Ryokan est né en 2018, apportant l'expérience authentique des onsen japonais au Vietnam avec l'esprit wabi-sabi.",
  cn: '樱温泉日式旅馆成立于2018年，将正宗日式温泉体验带到越南。从大叻松林中的一间小旅店，发展至今在越南有3家，京都祇园有1家本店。',
  ar: 'ساكورا أونسن ريولكن تأسست في 2018، جالبة تجربة أونسن يابانية أصيلة لفيتنام بروح وابي-سابي.',
};

export const spa15VisionMission = [
  {
    icon: 'solar:eye-bold-duotone',
    title: { vi: 'Tầm nhìn', en: 'Vision', fr: 'Vision', cn: '愿景', ar: 'الرؤية' },
    desc: {
      vi: 'Trở thành ryokan onsen hàng đầu Đông Nam Á — nơi kết nối văn hóa Nhật Bản với nghỉ dưỡng Việt Nam.',
      en: 'Become the leading onsen ryokan in Southeast Asia — connecting Japanese culture with Vietnamese wellness.',
      fr: 'Devenir le ryokan onsen leader en Asie du Sud-Est.',
      cn: '成为东南亚首屈一指的温泉旅店——连接日本文化与越南养生。',
      ar: 'أن نصبح ريولكن أونسن الرائد في جنوب شرق آسيا.',
    },
  },
  {
    icon: 'solar:heart-bold-duotone',
    title: { vi: 'Sứ mệnh', en: 'Mission', fr: 'Mission', cn: '使命', ar: 'المهمة' },
    desc: {
      vi: 'Mang trải nghiệm wabi-sabi chân thực — mỗi chi tiết là một câu chuyện, mỗi khoảnh khắc là một nghi thức.',
      en: 'Bring authentic wabi-sabi experience — every detail tells a story, every moment is a ritual.',
      fr: 'Offrir une expérience wabi-sabi authentique.',
      cn: '带来真实的侘寂体验——每个细节都是一个故事，每个瞬间都是仪式。',
      ar: 'تقديم تجربة وابي-سابي أصيلة.',
    },
  },
];

export const spa15Certifications = [
  { icon: 'solar:medal-ribbon-star-bold-duotone', name: 'Japan Onsen Association', year: '2019' },
  { icon: 'solar:verified-check-bold-duotone', name: 'JNTO Partner', year: '2020' },
  { icon: 'solar:cup-star-bold-duotone', name: 'Luxury Spa Asia 2023', year: '2023' },
  { icon: 'solar:shield-check-bold-duotone', name: 'ISO 9001:2015', year: '2021' },
];

// Contact Info
export const spa15ContactInfo = {
  hotline: '1900 7890',
  email: 'reserve@sakuraonsen.vn',
  zalo: '0909 888 999',
  address: {
    vi: '28 Nguyễn Văn Hưởng, Thảo Điền, TP.HCM',
    en: '28 Nguyen Van Huong, Thao Dien, HCMC',
    fr: '28 Nguyen Van Huong, Thao Dien, HCMC',
    cn: '胡志明市Thảo Điền阮文享街28号',
    ar: '28 Nguyễn Văn Hưởng، ثاو ديين',
  },
  workingHours: {
    vi: '10:00 – 22:00 mỗi ngày',
    en: '10:00 AM – 10:00 PM daily',
    fr: '10h00 – 22h00 tous les jours',
    cn: '每天10:00–22:00',
    ar: '10:00 – 22:00 يوميًا',
  },
};

// Booking Packages
export const spa15BookingPackages = [
  {
    slug: 'single',
    name: { vi: 'Đơn', en: 'Single', fr: 'Single', cn: '单次', ar: 'مفرد' },
    price: 1850000,
    sessions: 1,
    perks: {
      vi: ['1 liệu trình', 'Trà matcha'],
      en: ['1 treatment', 'Matcha tea'],
      fr: ['1 soin', 'Thé matcha'],
      cn: ['1次疗程', '抹茶'],
      ar: ['علاج واحد', 'شاي ماتشا'],
    },
  },
  {
    slug: 'sakura',
    name: { vi: 'Sakura', en: 'Sakura', fr: 'Sakura', cn: '樱', ar: 'ساكورا' },
    price: 4500000,
    sessions: 3,
    perks: {
      vi: ['3 liệu trình', 'Trà đạo'],
      en: ['3 treatments', 'Tea ceremony'],
      fr: ['3 soins', 'Cérémonie du thé'],
      cn: ['3次疗程', '茶道'],
      ar: ['3 علاجات', 'حفل الشاي'],
    },
    isPopular: true,
  },
  {
    slug: 'hanami',
    name: { vi: 'Hanami', en: 'Hanami', fr: 'Hanami', cn: '花见', ar: 'هانامي' },
    price: 8500000,
    sessions: 6,
    perks: {
      vi: ['6 liệu trình', 'Kaiseki tặng'],
      en: ['6 treatments', 'Complimentary kaiseki'],
      fr: ['6 soins', 'Kaiseki offert'],
      cn: ['6次疗程', '赠送怀石'],
      ar: ['6 علاجات', 'كايسيكي مجاني'],
    },
  },
  {
    slug: 'imperial',
    name: { vi: 'Imperial', en: 'Imperial', fr: 'Impérial', cn: '御', ar: 'إمبريال' },
    price: 16900000,
    sessions: 12,
    perks: {
      vi: ['12 liệu trình', 'Phòng ryokan VIP'],
      en: ['12 treatments', 'VIP Ryokan room'],
      fr: ['12 soins', 'Chambre Ryokan VIP'],
      cn: ['12次疗程', 'VIP榻榻米房'],
      ar: ['12 علاج', 'غرفة ريوكان VIP'],
    },
  },
];

// Policies
export const spa15Policies = [
  {
    title: {
      vi: 'Đặt lịch',
      en: 'Booking Policy',
      fr: 'Réservation',
      cn: '预订政策',
      ar: 'سياسة الحجز',
    },
    items: {
      vi: ['Đặt lịch qua website, hotline', 'Đến trước 15 phút', 'Hủy trước 6 giờ miễn phí'],
      en: ['Book via website or hotline', 'Arrive 15 mins early', 'Free cancellation 6 hrs prior'],
      fr: [
        'Réservez en ligne ou par téléphone',
        'Arrivez 15 min avant',
        'Annulation gratuite 6h avant',
      ],
      cn: ['网站或电话预订', '提前15分钟到', '提前6小时免费取消'],
      ar: ['احجز عبر الموقع أو الهاتف', 'احضر قبل 15 دقيقة', 'إلغاء مجاني قبل 6 ساعات'],
    },
  },
  {
    title: {
      vi: 'Bảo mật',
      en: 'Privacy Policy',
      fr: 'Confidentialité',
      cn: '隐私政策',
      ar: 'سياسة الخصوصية',
    },
    items: {
      vi: [
        'Thông tin khách được bảo mật',
        'Không chia sẻ bên thứ 3',
        'Hình ảnh dùng khi được phép',
      ],
      en: ['Guest info is encrypted', 'No third-party sharing', 'Photos used with consent'],
      fr: ['Infos cryptées', 'Pas de partage tiers', 'Photos avec consentement'],
      cn: ['客人信息加密', '不与第三方共享', '照片使用需同意'],
      ar: ['معلومات المشفرين', 'لا مشاركة مع أطراف ثالثة', 'الصور بموافقة'],
    },
  },
  {
    title: {
      vi: 'Hoàn tiền',
      en: 'Refund Policy',
      fr: 'Remboursement',
      cn: '退款政策',
      ar: 'سياسة الاسترداد',
    },
    items: {
      vi: ['Hoàn 100% nếu chưa dùng', 'Hoàn tỷ lệ buổi còn lại', 'Voucher không hoàn'],
      en: ['100% refund if unused', 'Pro-rated if partially used', 'Vouchers non-refundable'],
      fr: ['Remboursement 100% si non utilisé', 'Prorata si partiel', 'Bons non remboursables'],
      cn: ['未使用全额退款', '部分使用按比例', '代金券不退'],
      ar: [
        'استرداد 100% إذا لم يُستخدم',
        'متناسب إذا استُخدم جزئيًا',
        'القسائم غير قابلة للاسترداد',
      ],
    },
  },
];
