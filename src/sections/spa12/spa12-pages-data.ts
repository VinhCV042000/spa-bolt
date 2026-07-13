import type { Spa12Lang } from './spa12-data';

// Color palette - Ultra luxury theme
export const CHAMPAGNE_GOLD = '#D4AF37';
export const DEEP_NAVY = '#0A1628';
export const PEARL_WHITE = '#F9F6EE';
export const ROSE_GOLD = '#B76E79';
export const DIAMOND_ICE = '#7ECEF4';
export const PLATINUM = '#E5E4E2';
export const MIDNIGHT = '#0D0520';

// Helper functions
export function getLang<T>(obj: { vi: T; en: T; fr: T; cn: T; ar: T }, lang: Spa12Lang): T {
  return obj[lang as keyof typeof obj] || obj.en;
}

export function formatVND(n: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(n)}₫`;
}

// Services data
export const SPA12_SERVICES = [
  {
    id: 'pearl-radiance',
    name: {
      vi: 'Pearl Radiance Facial',
      en: 'Pearl Radiance Facial',
      fr: 'Pearl Radiance Facial',
      cn: '珍珠焕采面部护理',
      ar: 'لؤلؤ راديانس فيشيال',
    },
    tagline: {
      vi: 'Ngọc trai Nhật Bản · Collagen · Enzyme',
      en: 'Japanese Pearl · Collagen · Enzyme',
      fr: 'Perle japonaise · Collagène · Enzyme',
      cn: '日本珍珠 · 胶原蛋白 · 酶',
      ar: 'لؤلؤ ياباني · كولاجين · إنزيم',
    },
    description: {
      vi: 'Mặt nạ bột ngọc trai mikimoto Nhật Bản kết hợp enzyme collagen cá hồi và serum chiết xuất caviar. Độ ẩm tăng 89%, da sáng rạng rỡ sau một buổi duy nhất.',
      en: 'Japanese mikimoto pearl powder mask combined with salmon collagen enzyme and caviar extract serum. 89% moisture increase, luminous skin after just one session.',
      fr: "Masque à la poudre de perle mikimoto japonaise associé à une enzyme de collagène de saumon et un sérum à l'extrait de caviar. Hydratation augmentée de 89 %.",
      cn: '日本御木本珍珠粉面膜结合三文鱼胶原蛋白酶和鱼子酱精华血清。保湿度提升89%。',
      ar: 'قناع مسحوق لؤلؤ ميكيموتو الياباني مع إنزيم كولاجين السلمون وسيروم خلاصة الكافيار. زيادة الترطيب بنسبة 89٪.',
    },
    price: 6800000,
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80',
    badge: { vi: 'Flagship', en: 'Flagship', fr: 'Produit phare', cn: '旗舰', ar: 'الرائد' },
    color: PEARL_WHITE,
    category: 'facial',
  },
  {
    id: 'gold-leaf',
    name: {
      vi: '24K Gold Leaf Facial',
      en: '24K Gold Leaf Facial',
      fr: '24K Gold Leaf Facial',
      cn: '24K金箔面部护理',
      ar: 'فيشيال رقائق الذهب 24 قيراط',
    },
    tagline: {
      vi: '24K Gold · Trẻ hóa · Nâng cơ',
      en: '24K Gold · Anti-age · Lifting',
      fr: '24K Gold · Anti-âge · Lifting',
      cn: '24K黄金 · 抗衰老 · 提拉紧致',
      ar: 'ذهب 24 قيراط · مكافحة الشيخوخة · شد البشرة',
    },
    description: {
      vi: 'Dát vàng lá 24K thật lên toàn mặt kết hợp massage nâng cơ, điện di iontophoresis và đắp mặt nạ vàng colloidal. Ion vàng ngấm sâu tái tạo tế bào và kích hoạt sản sinh collagen III.',
      en: 'Real 24K gold leaf applied over the entire face combined with lifting massage, iontophoresis electrophoresis and colloidal gold mask. Gold ions penetrate to regenerate cells.',
      fr: "Véritable feuille d'or 24K appliquée sur tout le visage, associée à un massage liftant, une iontophorèse et un masque à l'or colloïdal.",
      cn: '真正的24K金箔敷于整个面部，结合提拉按摩、离子导入电泳和胶体金面膜。',
      ar: 'رقائق ذهب حقيقية عيار 24 قيراطاً تُوضع على كامل الوجه مع تدليك مشدّ للبشرة.',
    },
    price: 9500000,
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    badge: {
      vi: 'Best seller',
      en: 'Best seller',
      fr: 'Meilleure vente',
      cn: '畅销',
      ar: 'الأكثر مبيعاً',
    },
    color: CHAMPAGNE_GOLD,
    category: 'facial',
  },
  {
    id: 'diamond-dermabrasion',
    name: {
      vi: 'Diamond Microdermabrasion',
      en: 'Diamond Microdermabrasion',
      fr: 'Diamond Microdermabrasion',
      cn: '钻石微晶磨皮',
      ar: 'تقشير الماس الدقيق',
    },
    tagline: {
      vi: 'Kim cương · Tái tạo da · Sẹo & Thâm',
      en: 'Diamond · Skin renewal · Scars & Pigmentation',
      fr: 'Diamant · Renouvellement cutané · Cicatrices & Pigmentation',
      cn: '钻石 · 肌肤焕新 · 疤痕与色斑',
      ar: 'الماس · تجديد البشرة · الندبات والتصبغات',
    },
    description: {
      vi: 'Mài mòn da bằng đầu kim cương tổng hợp kết hợp hút chân không, loại bỏ hoàn toàn lớp stratum corneum già và kích thích tái tạo. Hiệu quả tương đương laser CO2 nhưng không đau.',
      en: 'Skin abrasion with synthetic diamond tip combined with vacuum suction, completely removing the aged stratum corneum and stimulating renewal. Comparable results to CO2 laser but painless.',
      fr: 'Microdermabrasion à la pointe de diamant synthétique combinée à une aspiration sous vide, éliminant complètement la couche cornée vieillie.',
      cn: '采用合成钻石头进行肌肤磨削，结合真空吸引，彻底去除老化角质层并刺激更新。',
      ar: 'تقشير البشرة برأس ماسي اصطناعي مع شفط بالتفريغ، يزيل طبقة الجلد المتقرنة القديمة تماماً.',
    },
    price: 7200000,
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 分钟', ar: '75 دقيقة' },
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    badge: {
      vi: 'Tác động nhanh',
      en: 'Fast results',
      fr: 'Résultats rapides',
      cn: '快速见效',
      ar: 'نتائج سريعة',
    },
    color: DIAMOND_ICE,
    category: 'treatment',
  },
  {
    id: 'stem-cell',
    name: {
      vi: 'Stem Cell Rejuvenation',
      en: 'Stem Cell Rejuvenation',
      fr: 'Stem Cell Rejuvenation',
      cn: '干细胞再生护理',
      ar: 'تجديد الخلايا الجذعية',
    },
    tagline: {
      vi: 'Tế bào gốc thực vật · Epigenetics · Trẻ hóa thật',
      en: 'Plant stem cells · Epigenetics · True rejuvenation',
      fr: 'Cellules souches végétales · Épigénétique · Véritable rajeunissement',
      cn: '植物干细胞 · 表观遗传学 · 真正年轻化',
      ar: 'خلايا جذعية نباتية · علم التخلق · تجديد شباب حقيقي',
    },
    description: {
      vi: 'Liệu trình tái sinh tế bào gốc thực vật (chiết xuất từ táo Uttwiler Spätlauber Thụy Sĩ). Kích hoạt epigenetic để "bật lại" gen trẻ hóa, giảm 100% biểu hiện lão hóa trong 4 tuần.',
      en: 'Plant stem cell regeneration therapy (extracted from Swiss Uttwiler Spätlauber apples). Epigenetic activation to "switch on" rejuvenation genes.',
      fr: 'Thérapie de régénération par cellules souches végétales (extraites des pommes suisses Uttwiler Spätlauber).',
      cn: '植物干细胞再生疗法（提取自瑞士Uttwiler Spätlauber苹果）。通过表观遗传激活"重启"年轻化基因。',
      ar: 'علاج تجديد بالخلايا الجذعية النباتية (المستخلصة من تفاح أوتفيلر شبيتلاوبر السويسري).',
    },
    price: 15000000,
    duration: { vi: '150 phút', en: '150 min', fr: '150 min', cn: '150 分钟', ar: '150 دقيقة' },
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
    badge: {
      vi: 'Ultra Premium',
      en: 'Ultra Premium',
      fr: 'Ultra Premium',
      cn: '超级尊享',
      ar: 'فائقة الرقي',
    },
    color: PLATINUM,
    category: 'premium',
  },
  {
    id: 'caviar-luxury',
    name: {
      vi: 'Caviar Luxury Body Treatment',
      en: 'Caviar Luxury Body Treatment',
      fr: 'Caviar Luxury Body Treatment',
      cn: '鱼子酱奢华身体护理',
      ar: 'علاج الجسم الفاخر بالكافيار',
    },
    tagline: {
      vi: 'Caviar · Mật ong hoàng gia · Tinh chất vàng',
      en: 'Caviar · Royal jelly · Gold essence',
      fr: "Caviar · Gelée royale · Essence d'or",
      cn: '鱼子酱 · 蜂王浆 · 黄金精华',
      ar: 'الكافيار · غذاء ملكات النحل · جوهر الذهب',
    },
    description: {
      vi: 'Trị liệu body toàn thân với tinh chất caviar Beluga đắt nhất thế giới, mật ong hoàng gia và tinh chất vàng 24K. Da căng mướt, Trẻ hóa toàn diện.',
      en: "Full body treatment with the world's most expensive Beluga caviar extract, royal jelly and 24K gold essence. Comprehensive skin rejuvenation.",
      fr: "Traitement corporel complet avec l'extrait de caviar Beluga le plus cher du monde, gelée royale et essence d'or 24K.",
      cn: '全身护理采用世界上最昂贵的白鲸鱼子酱精华、蜂王浆和24K黄金精华。全面肌肤再生。',
      ar: 'علاج الجسم بالكامل مع مستخلص الكافيار بيلوجا الأغلى في العالم وغذاء ملكات النحل وجوهر الذهب عيار 24.',
    },
    price: 12000000,
    duration: { vi: '180 phút', en: '180 min', fr: '180 min', cn: '180 分钟', ar: '180 دقيقة' },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    badge: { vi: 'Exclusive', en: 'Exclusive', fr: 'Exclusif', cn: '独家', ar: 'حصري' },
    color: CHAMPAGNE_GOLD,
    category: 'body',
  },
  {
    id: 'diamond-ritual',
    name: {
      vi: 'Diamond Ritual Package',
      en: 'Diamond Ritual Package',
      fr: 'Diamond Ritual Package',
      cn: '钻石仪式套餐',
      ar: 'باقة طقوس الماس',
    },
    tagline: {
      vi: 'Full package · Private suite · Champagne',
      en: 'Full package · Private suite · Champagne',
      fr: 'Package complet · Suite privée · Champagne',
      cn: '全套护理 · 私人套房 · 香槟',
      ar: 'باقة كاملة · جناح خاص · شمبانيا',
    },
    description: {
      vi: 'Trải nghiệm 3 tiếng trong private suite với full body diamond scrub, gold facial, champagne và tráng miệng. Limousine đón đưa door-to-door.',
      en: '3-hour experience in private suite with full body diamond scrub, gold facial, champagne and dessert. Limousine door-to-door service.',
      fr: 'Expérience de 3 heures en suite privée avec gommage corps diamant, facial or, champagne et dessert.',
      cn: '私人套房3小时体验，包含钻石全身磨砂、黄金面部护理、香槟和甜点。豪华轿车门到门接送。',
      ar: 'تجربة 3 ساعات في جناح خاص مع تقشير الجسم بالماس وفيشيال الذهب والشمبانيا والحلوى.',
    },
    price: 25000000,
    duration: { vi: '180 phút', en: '180 min', fr: '180 min', cn: '180 分钟', ar: '180 دقيقة' },
    image: 'https://images.unsplash.com/photo-1600334129120-276ff4fb63d3?w=800&q=80',
    badge: { vi: 'VIP', en: 'VIP', fr: 'VIP', cn: 'VIP', ar: 'VIP' },
    color: DIAMOND_ICE,
    category: 'premium',
  },
];

// Training programs
export const SPA12_TRAINING = [
  {
    id: 1,
    title: {
      vi: 'Chuyên gia Pearl Treatment',
      en: 'Pearl Treatment Specialist',
      fr: 'Spécialiste Pearl Treatment',
      cn: '珍珠护理专家',
      ar: 'أخصائي علاج اللؤلؤ',
    },
    description: {
      vi: 'Đào tạo chuyên sâu về liệu pháp ngọc trai Nhật Bản, kỹ thuật massage và ứng dụng enzyme collagen. Chứng chỉ quốc tế.',
      en: 'Advanced training in Japanese pearl therapy, massage techniques and collagen enzyme application. International certification.',
      fr: "Formation avancée en thérapie de perle japonaise, techniques de massage et application d'enzyme de collagène.",
      cn: '日本珍珠疗法、按摩技术和胶原蛋白酶应用的高级培训。国际认证。',
      ar: 'تدريب متقدم في علاج اللؤلؤ الياباني وتقنيات التدليك وتطبيق إنزيم الكولاجين.',
    },
    duration: { vi: '3 tháng', en: '3 months', fr: '3 mois', cn: '3 个月', ar: '3 أشهر' },
    price: 25000000,
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
  },
  {
    id: 2,
    title: {
      vi: 'Master Gold Facial',
      en: 'Master Gold Facial',
      fr: 'Master Gold Facial',
      cn: '黄金面部护理大师',
      ar: 'ماستر فيشيال الذهب',
    },
    description: {
      vi: 'Kỹ thuật dát vàng 24K, iontophoresis và nâng cơ chuyên sâu. Giảng viên từ Thụy Sĩ.',
      en: '24K gold leaf application, iontophoresis and advanced lifting techniques. Instructors from Switzerland.',
      fr: "Application de feuille d'or 24K, ionophorèse et techniques de lifting avancées. Formateurs suisses.",
      cn: '24K金箔敷贴、离子导入和高级提拉技术。瑞士讲师。',
      ar: 'تطبيق رقائق الذهب عيار 24 وتقنيات الرفع المتقدمة. مدربون من سويسرا.',
    },
    duration: { vi: '2 tháng', en: '2 months', fr: '2 mois', cn: '2 个月', ar: 'شهران' },
    price: 35000000,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  },
  {
    id: 3,
    title: {
      vi: 'Diamond & Stem Cell Expert',
      en: 'Diamond & Stem Cell Expert',
      fr: 'Expert Diamant & Cellules Souches',
      cn: '钻石与干细胞专家',
      ar: 'خبير الماس والخلايا الجذعية',
    },
    description: {
      vi: 'Liệu pháp tái tạo da với kim cương và tế bào gốc. Công nghệ epigenetic tiên tiến nhất. Thực hành 100% trên khách VIP.',
      en: 'Skin renewal therapy with diamond and stem cells. Advanced epigenetic technology. 100% hands-on with VIP clients.',
      fr: 'Thérapie de renouvellement cutané au diamant et cellules souches. Technologie épigénétique avancée.',
      cn: '钻石和干细胞皮肤再生疗法。先进表观遗传技术。100% VIP客户实操。',
      ar: 'علاج تجديد البشرة بالماس والخلايا الجذعية. تقنية التخلق المتقدمة.',
    },
    duration: { vi: '4 tháng', en: '4 months', fr: '4 mois', cn: '4 个月', ar: '4 أشهر' },
    price: 50000000,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
  },
];

// Blog posts
export const SPA12_BLOG = [
  {
    id: 1,
    slug: 'science-behind-pearl-therapy',
    title: {
      vi: 'Khoa học đằng sau liệu pháp ngọc trai',
      en: 'The Science Behind Pearl Therapy',
      fr: 'La science derrière la thérapie à la perle',
      cn: '珍珠疗法背后的科学',
      ar: 'العلم وراء علاج اللؤلؤ',
    },
    excerpt: {
      vi: 'Khám phá công dụng kỳ diệu của ngọc trai mikimoto Nhật Bản trong việc tái tạo và trắng da.',
      en: 'Discover the miraculous benefits of Japanese mikimoto pearl in skin renewal and brightening.',
      fr: "Découvrez les bienfaits miraculeux de la perle mikimoto japonaise pour le renouvellement et l'éclaircissement de la peau.",
      cn: '探索日本御木本珍珠在皮肤再生和提亮方面的神奇功效。',
      ar: 'اكتشف الفوائد المذهلة للؤلؤ ميكيموتو الياباني في تجديد وتفتيح البشرة.',
    },
    content: {
      vi: 'Ngọc trai mikimoto chứa hơn 20 loại axit amin và khoáng chất quý giá...',
      en: 'Mikimoto pearl contains over 20 amino acids and precious minerals...',
      fr: 'La perle mikimoto contient plus de 20 acides aminés et minéraux précieux...',
      cn: '御木本珍珠含有20多种氨基酸和珍贵矿物质...',
      ar: 'لؤلؤ ميكيموتو يحتوي على أكثر من 20 حمضاً أمينياً ومعادناً ثمينة...',
    },
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80',
    date: '2025-01-15',
    author: 'Dr. Sophie Laurent',
  },
  {
    id: 2,
    slug: 'gold-leaf-anti-aging-revolution',
    title: {
      vi: 'Dát vàng 24K: Cuộc cách mạng chống lão hóa',
      en: '24K Gold Leaf: The Anti-Aging Revolution',
      fr: "Feuille d'or 24K : La révolution anti-âge",
      cn: '24K金箔：抗衰老革命',
      ar: 'رقائق الذهب عيار 24: ثورة مكافحة الشيخوخة',
    },
    excerpt: {
      vi: 'Tìm hiểu cách ion vàng thẩm thấu sâu vào da và kích hoạt sản sinh collagen tự nhiên.',
      en: 'Learn how gold ions penetrate deep into the skin and activate natural collagen production.',
      fr: "Découvrez comment les ions d'or pénètrent profondément dans la peau et activent la production naturelle de collagène.",
      cn: '了解金离子如何深层渗透肌肤并激活天然胶原蛋白生成。',
      ar: 'تعرف على كيفية تغلغل أيونات الذهب عميقاً في البشرة وتنشيط إنتاج الكولاجين الطبيعي.',
    },
    content: {
      vi: 'Vàng từ thời cổ đại Ai Cập đã được sử dụng trong chăm sóc sắc đẹp...',
      en: 'Gold has been used in beauty care since ancient Egyptian times...',
      fr: "L'or est utilisé dans les soins de beauté depuis l'Égypte ancienne...",
      cn: '自古埃及时代起，黄金就被用于美容护理...',
      ar: 'استُخدم الذهب في العناية بالجمال منذ مصر القديمة...',
    },
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    date: '2025-02-08',
    author: 'Dr. Antoine Beaumont',
  },
  {
    id: 3,
    slug: 'stem-cell-epigenetics-future',
    title: {
      vi: 'Tế bào gốc & Epigenetics: Tương lai của trẻ hóa',
      en: 'Stem Cells & Epigenetics: The Future of Rejuvenation',
      fr: "Cellules souches & Épigénétique : L'avenir du rajeunissement",
      cn: '干细胞与表观遗传学：年轻化的未来',
      ar: 'الخلايا الجذعية والتخلق: مستقبل تجديد الشباب',
    },
    excerpt: {
      vi: 'Công nghệ tế bào gốc thực vật đang thay đổi cách chúng ta chống lại lão hóa từ bên trong.',
      en: 'Plant stem cell technology is changing how we fight aging from within.',
      fr: "La technologie des cellules souches végétales change notre façon de lutter contre le vieillissement de l'intérieur.",
      cn: '植物干细胞技术正在改变我们从内部对抗衰老的方式。',
      ar: 'تقنية الخلايا الجذعية النباتية تغير طريقة مكافحتنا للشيخوخة من الداخل.',
    },
    content: {
      vi: 'Tế bào gốc thực vật từ táo Uttwiler Spätlauber Thụy Sĩ...',
      en: 'Plant stem cells from Swiss Uttwiler Spätlauber apples...',
      fr: 'Cellules souches végétales des pommes suisses Uttwiler Spätlauber...',
      cn: '来自瑞士Uttwiler Spätlauber苹果的植物干细胞...',
      ar: 'الخلايا الجذعية النباتية من تفاح أوتفيلر شبيتلاوبر السويسري...',
    },
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
    date: '2025-03-01',
    author: 'Dr. Marie Zimmermann',
  },
];

// Careers
export const SPA12_CAREERS = [
  {
    id: 1,
    title: {
      vi: 'Senior Pearl Specialist',
      en: 'Senior Pearl Specialist',
      fr: 'Spécialiste Pearl Senior',
      cn: '高级珍珠护理专家',
      ar: 'أخصائي لؤلؤ أول',
    },
    department: { vi: 'Điều trị', en: 'Treatment', fr: 'Traitement', cn: '治疗', ar: 'العلاج' },
    location: { vi: 'Hà Nội', en: 'Hanoi', fr: 'Hanoï', cn: '河内', ar: 'هانوي' },
    type: { vi: 'Full-time', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    salary: {
      vi: '25-35 triệu',
      en: '25-35M VND',
      fr: '25-35M VND',
      cn: '25-35百万',
      ar: '25-35 مليون',
    },
    description: {
      vi: 'Tối thiểu 3 năm kinh nghiệm với liệu pháp ngọc trai. Chứng chỉ quốc tế ưu tiên.',
      en: 'Minimum 3 years experience with pearl therapy. International certification preferred.',
      fr: "Minimum 3 ans d'expérience en thérapie à la perle. Certification internationale préférée.",
      cn: '至少3年珍珠护理经验。优先考虑国际认证。',
      ar: '3 سنوات خبرة على الأقل في علاج اللؤلؤ. شهادة دولية مفضلة.',
    },
  },
  {
    id: 2,
    title: {
      vi: 'Gold Facial Master',
      en: 'Gold Facial Master',
      fr: 'Maître Facial Or',
      cn: '黄金面部护理大师',
      ar: 'ماستر فيشيال الذهب',
    },
    department: { vi: 'Điều trị', en: 'Treatment', fr: 'Traitement', cn: '治疗', ar: 'العلاج' },
    location: {
      vi: 'TP.HCM',
      en: 'Ho Chi Minh City',
      fr: 'Hô Chi Minh-Ville',
      cn: '胡志明市',
      ar: 'مدينة هو تشي منه',
    },
    type: { vi: 'Full-time', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    salary: {
      vi: '30-45 triệu',
      en: '30-45M VND',
      fr: '30-45M VND',
      cn: '30-45百万',
      ar: '30-45 مليون',
    },
    description: {
      vi: 'Chuyên viên dát vàng 24K với tay nghề cao. Đã xử lý ít nhất 500 khách VIP.',
      en: 'Expert in 24K gold leaf application. Has treated at least 500 VIP clients.',
      fr: "Expert en application de feuille d'or 24K. A traité au moins 500 clients VIP.",
      cn: '24K金箔敷贴专家。已服务至少500名VIP客户。',
      ar: 'خبير في تطبيق رقائق الذهب عيار 24. عالج 500 عميل VIP على الأقل.',
    },
  },
  {
    id: 3,
    title: {
      vi: 'VIP Concierge Manager',
      en: 'VIP Concierge Manager',
      fr: 'Manager Conciergerie VIP',
      cn: 'VIP礼宾经理',
      ar: 'مدير كونسيرج VIP',
    },
    department: {
      vi: 'Dịch vụ khách hàng',
      en: 'Customer Service',
      fr: 'Service client',
      cn: '客户服务',
      ar: 'خدمة العملاء',
    },
    location: { vi: 'Hà Nội', en: 'Hanoi', fr: 'Hanoï', cn: '河内', ar: 'هانوي' },
    type: { vi: 'Full-time', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    salary: {
      vi: '20-30 triệu',
      en: '20-30M VND',
      fr: '20-30M VND',
      cn: '20-30百万',
      ar: '20-30 مليون',
    },
    description: {
      vi: 'Quản lý trải nghiệm khách VIP, phối hợp dịch vụ limousine, arranging private events.',
      en: 'Manage VIP client experience, coordinate limousine service, arrange private events.',
      fr: "Gérer l'expérience client VIP, coordonner le service limousine, organiser des événements privés.",
      cn: '管理VIP客户体验，协调豪华轿车服务，安排私人活动。',
      ar: 'إدارة تجربة عملاء VIP، تنسيق خدمة الليموزين، ترتيب الفعاليات الخاصة.',
    },
  },
];

// Branches
export const SPA12_BRANCHES = [
  {
    id: 1,
    name: {
      vi: 'Pearl Mansion Hà Nội',
      en: 'Pearl Mansion Hanoi',
      fr: 'Pearl Mansion Hanoï',
      cn: '河内珍珠公馆',
      ar: 'قصر اللؤلؤ هانوي',
    },
    address: {
      vi: 'Vincom Center, 72 Lê Thánh Tông, Hoàn Kiếm, Hà Nội',
      en: 'Vincom Center, 72 Le Thanh Tong, Hoan Kiem, Hanoi',
      fr: 'Vincom Center, 72 Le Thanh Tong, Hoan Kiem, Hanoï',
      cn: '河内还剑郡黎清宗72号Vincom中心',
      ar: 'فينكوم سنتر، 72 لي ثانه تونغ، هوان كيم، هانوي',
    },
    phone: '+84 24 3939 1212',
    hours: {
      vi: '9:00 - 21:00',
      en: '9:00 AM - 9:00 PM',
      fr: '9h00 - 21h00',
      cn: '9:00 - 21:00',
      ar: '9:00 - 21:00',
    },
    isFlagship: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  },
  {
    id: 2,
    name: {
      vi: 'Diamond Tower Saigon',
      en: 'Diamond Tower Saigon',
      fr: 'Diamond Tower Saigon',
      cn: '西贡钻石大厦',
      ar: 'برج الماس سايغون',
    },
    address: {
      vi: 'Landmark 81, 772 Điện Biên Phủ, Bình Thạnh, TP.HCM',
      en: 'Landmark 81, 772 Dien Bien Phu, Binh Thanh, Ho Chi Minh City',
      fr: 'Landmark 81, 772 Dien Bien Phu, Binh Thanh, Hô Chi Minh-Ville',
      cn: '胡志明市平盛郡奠边府772号地标81',
      ar: 'لاندمارك 81، 772 دين بن فو، بنه تانه، مدينة هو تشي منه',
    },
    phone: '+84 28 3939 1212',
    hours: {
      vi: '9:00 - 22:00',
      en: '9:00 AM - 10:00 PM',
      fr: '9h00 - 22h00',
      cn: '9:00 - 22:00',
      ar: '9:00 - 22:00',
    },
    isFlagship: false,
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80',
  },
  {
    id: 3,
    name: {
      vi: 'Gold House Đà Nẵng',
      en: 'Gold House Da Nang',
      fr: 'Gold House Da Nang',
      cn: '岘港黄金馆',
      ar: 'بيت الذهب دا نانغ',
    },
    address: {
      vi: 'InterContinental, 225 Sơn Trà, Mỹ An, Đà Nẵng',
      en: 'InterContinental, 225 Son Tra, My An, Da Nang',
      fr: 'InterContinental, 225 Son Tra, My An, Da Nang',
      cn: '岘港美安郡山茶225号洲际酒店',
      ar: 'إنتركونتيننتال، 225 سون ترا، مي آن، دا نانغ',
    },
    phone: '+84 236 3939 1212',
    hours: {
      vi: '10:00 - 20:00',
      en: '10:00 AM - 8:00 PM',
      fr: '10h00 - 20h00',
      cn: '10:00 - 20:00',
      ar: '10:00 - 20:00',
    },
    isFlagship: false,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  },
  {
    id: 4,
    name: {
      vi: 'Platinum Suite Nha Trang',
      en: 'Platinum Suite Nha Trang',
      fr: 'Platinum Suite Nha Trang',
      cn: '芽庄铂金套房',
      ar: 'جناح بلاتينيي نها ترانغ',
    },
    address: {
      vi: 'Vinpearl Resort, Vinpearl Land, Nha Trang',
      en: 'Vinpearl Resort, Vinpearl Land, Nha Trang',
      fr: 'Vinpearl Resort, Vinpearl Land, Nha Trang',
      cn: '芽庄珍珠岛Vinpearl度假村',
      ar: 'منتجع فينبرل، فينبرل لاند، نها ترانغ',
    },
    phone: '+84 258 3939 1212',
    hours: {
      vi: '9:00 - 19:00',
      en: '9:00 AM - 7:00 PM',
      fr: '9h00 - 19h00',
      cn: '9:00 - 19:00',
      ar: '9:00 - 19:00',
    },
    isFlagship: false,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
  },
  {
    id: 5,
    name: {
      vi: 'Private Villa Phuket',
      en: 'Private Villa Phuket',
      fr: 'Villa Privée Phuket',
      cn: '普吉岛私人别墅',
      ar: 'فيلا خاصة فوكيت',
    },
    address: {
      vi: 'Amanpuri Resort, Panwa Beach, Phuket, Thailand',
      en: 'Amanpuri Resort, Panwa Beach, Phuket, Thailand',
      fr: 'Amanpuri Resort, Panwa Beach, Phuket, Thaïlande',
      cn: '泰国普吉岛攀瓦海滩安曼普里度假村',
      ar: 'أمانبوري ريزورت، شاطئ بانوا، فوكيت، تايلاند',
    },
    phone: '+66 76 393 912',
    hours: {
      vi: '10:00 - 18:00',
      en: '10:00 AM - 6:00 PM',
      fr: '10h00 - 18h00',
      cn: '10:00 - 18:00',
      ar: '10:00 - 18:00',
    },
    isFlagship: false,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
  },
];

// Gallery items
export const SPA12_GALLERY = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    title: {
      vi: 'Không gian Pearl',
      en: 'Pearl Space',
      fr: 'Espace Pearl',
      cn: '珍珠空间',
      ar: 'فضاء اللؤلؤ',
    },
    category: 'interior',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80',
    title: {
      vi: 'Liệu trình cao cấp',
      en: 'Premium Treatment',
      fr: 'Traitement Premium',
      cn: '高级护理',
      ar: 'علاج فاخر',
    },
    category: 'treatment',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    title: {
      vi: '24K Gold Facial',
      en: '24K Gold Facial',
      fr: 'Facial Or 24K',
      cn: '24K黄金面部',
      ar: 'فيشيال الذهب 24',
    },
    category: 'treatment',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    title: {
      vi: 'Diamond Studio',
      en: 'Diamond Studio',
      fr: 'Studio Diamant',
      cn: '钻石工作室',
      ar: 'ستوديو الماس',
    },
    category: 'interior',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
    title: {
      vi: 'Stem Cell Lab',
      en: 'Stem Cell Lab',
      fr: 'Laboratoire Cellules Souches',
      cn: '干细胞实验室',
      ar: 'مختبر الخلايا الجذعية',
    },
    category: 'technology',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1600334129120-276ff4fb63d3?w=800&q=80',
    title: { vi: 'VIP Suite', en: 'VIP Suite', fr: 'Suite VIP', cn: 'VIP套房', ar: 'جناح VIP' },
    category: 'interior',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    title: {
      vi: 'Massage Room',
      en: 'Massage Room',
      fr: 'Salle de Massage',
      cn: '按摩室',
      ar: 'غرفة التدليك',
    },
    category: 'interior',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    title: {
      vi: 'Private Suite',
      en: 'Private Suite',
      fr: 'Suite Privée',
      cn: '私人套房',
      ar: 'جناح خاص',
    },
    category: 'interior',
  },
];

// FAQs
export const SPA12_FAQS = [
  {
    id: 1,
    question: {
      vi: 'Tại sao liệu pháp ngọc trai đắt đỏ như vậy?',
      en: 'Why is pearl therapy so expensive?',
      fr: 'Pourquoi la thérapie à la perle est-elle si coûteuse ?',
      cn: '为什么珍珠护理这么昂贵？',
      ar: 'لماذا علاج اللؤلؤ مكلف جداً؟',
    },
    answer: {
      vi: 'Chúng tôi sử dụng ngọc trai mikimoto Nhật Bản - loại ngọc trai cao cấp nhất thế giới với giá từ $500-2000/carats. Bột ngọc trai được chế biến đặc biệt để giữ nguyên 20 loại axit amin quý giá.',
      en: "We use Japanese mikimoto pearls - the world's highest grade pearls priced at $500-2000/carats. The pearl powder is specially processed to preserve 20 precious amino acids.",
      fr: 'Nous utilisons des perles mikimoto japonaises - les perles de la plus haute qualité au monde, au prix de 500-2000$/carats. La poudre de perle est spécialement traitée pour préserver 20 acides aminés précieux.',
      cn: '我们使用日本御木本珍珠——世界上最高等级的珍珠，价格为500-2000美元/克拉。珍珠粉经过特殊处理，保留了20种珍贵氨基酸。',
      ar: 'نستخدم لؤلؤ ميكيموتو الياباني - أعلى درجات اللؤلؤ في العالم بسعر 500-2000 دولار للقيراط. مسحوق اللؤلؤ معالج خصيصاً للحفاظ على 20 حمضاً أمينياً ثميناً.',
    },
  },
  {
    id: 2,
    question: {
      vi: 'Vàng 24K có thực sự tốt cho da không?',
      en: 'Is 24K gold actually good for the skin?',
      fr: "L'or 24K est-il vraiment bon pour la peau ?",
      cn: '24K黄金真的对皮肤好吗？',
      ar: 'هل الذهب عيار 24 جيد حقاً للبشرة؟',
    },
    answer: {
      vi: 'Có. Ion vàng có khả năng thẩm thấu sâu vào da, kích hoạt sản sinh collagen type III, giảm viêm và tăng cường tuần hoàn. Nền y học đã sử dụng vàng trong điều trị viêm khớp từ thập niên 1920.',
      en: 'Yes. Gold ions can penetrate deep into the skin, activate type III collagen production, reduce inflammation and enhance circulation. Medical science has used gold in arthritis treatment since the 1920s.',
      fr: "Oui. Les ions d'or peuvent pénétrer profondément dans la peau, activer la production de collagène de type III, réduire l'inflammation et améliorer la circulation.",
      cn: '是的。金离子可以深层渗透肌肤，激活III型胶原蛋白生成，减少炎症并促进循环。医学界自1920年代起就使用黄金治疗关节炎。',
      ar: 'نعم. أيونات الذهب يمكن أن تتغلغل عميقاً في البشرة، وتنشيط إنتاج الكولاجين من النوع الثالث، تقليل الالتهاب وتحسين الدورة الدموية.',
    },
  },
  {
    id: 3,
    question: {
      vi: 'Membership Diamond có thực sự unlimited không?',
      en: 'Is Diamond membership truly unlimited?',
      fr: "L'abonnement Diamond est-il vraiment illimité ?",
      cn: '钻石会员真的是无限次吗？',
      ar: 'هل عضوية الماس غير محدودة حقاً؟',
    },
    answer: {
      vi: 'Đúng. Thành viên Diamond được sử dụng không giới hạn tất cả dịch vụ, bao gồm cả các liệu trình Ultra Premium như Stem Cell. Chỉ giới hạn bởi thời gian đặt lịch và sức khỏe.',
      en: 'Yes. Diamond members get unlimited access to all services, including Ultra Premium treatments like Stem Cell. Only limited by booking availability and health conditions.',
      fr: 'Oui. Les membres Diamond ont un accès illimité à tous les services, y compris les traitements Ultra Premium comme Stem Cell.',
      cn: '是的。钻石会员可以无限次使用所有服务，包括干细胞等超高级疗程。仅受预约时间和健康状况限制。',
      ar: 'نعم. يحصل أعضاء الماس على وصول غير محدود لجميع الخدمات، بما في ذلك العلاجات الفائقة الرقي مثل الخلايا الجذعية.',
    },
  },
  {
    id: 4,
    question: {
      vi: 'Có cần nghỉ dưỡng sau điều trị không?',
      en: 'Is recovery time needed after treatment?',
      fr: 'Un temps de récupération est-il nécessaire après le traitement ?',
      cn: '治疗后需要休息吗？',
      ar: 'هل هناك حاجة لوقت تعافٍ بعد العلاج؟',
    },
    answer: {
      vi: 'Không. Tất cả liệu trình của chúng tôi được thiết kế zero downtime. Bạn có thể quay lại hoạt động bình thường ngay sau treatment. Ngoại trừ Diamond Microdermabrasion cần tránh nắng 24h.',
      en: 'No. All our treatments are designed with zero downtime. You can resume normal activities immediately. Except Diamond Microdermabrasion which requires 24h sun avoidance.',
      fr: "Non. Tous nos traitements sont conçus sans temps d'arrêt. Vous pouvez reprendre vos activités normales immédiatement.",
      cn: '不需要。我们所有疗程都设计为零恢复期。您可以立即恢复日常活动。钻石微晶磨皮除外，需24小时避阳。',
      ar: 'لا. جميع علاجاتنا مصممة بدون فترة توقف. يمكنك استئناف الأنشطة العادية فوراً.',
    },
  },
  {
    id: 5,
    question: {
      vi: 'Thời gian tối đa có thể booking là bao lâu?',
      en: 'How far in advance can I book?',
      fr: "Jusqu'à quand puis-je réserver à l'avance ?",
      cn: '最远可以提前多久预约？',
      ar: 'كم يمكنني الحجز مقدماً؟',
    },
    answer: {
      vi: 'Member Diamond: booking tối đa 90 ngày. Các member khác: 60 ngày. Guest (không member): 30 ngày. Riêng các liệu trình Ultra Premium cần booking trước ít nhất 7 ngày.',
      en: 'Diamond members: book up to 90 days ahead. Other members: 60 days. Guests (non-member): 30 days. Ultra Premium treatments require minimum 7 days advance booking.',
      fr: "Membres Diamond : réservez jusqu'à 90 jours à l'avance. Autres membres : 60 jours. Invités (non-membres) : 30 jours.",
      cn: '钻石会员：提前90天预约。其他会员：60天。非会员：30天。超高级疗程需至少提前7天预约。',
      ar: 'أعضاء الماس: الحجز حتى 90 يوماً مسبقاً. الأعضاء الآخرون: 60 يوماً. الضيوف: 30 يوماً.',
    },
  },
];

// Packages
export const SPA12_PACKAGES = [
  {
    id: 1,
    name: {
      vi: 'Pearl Discovery',
      en: 'Pearl Discovery',
      fr: 'Pearl Discovery',
      cn: '珍珠探索',
      ar: 'اكتشاف اللؤلؤ',
    },
    description: {
      vi: 'Trải nghiệm ngọc trai với 3 liệu trình signature. Phù hợp cho người mới bắt đầu.',
      en: 'Pearl experience with 3 signature treatments. Perfect for beginners.',
      fr: 'Expérience perle avec 3 soins signature. Parfait pour les débutants.',
      cn: '珍珠体验包含3个招牌疗程。适合初次体验者。',
      ar: 'تجربة اللؤلؤ مع 3 علاجات مميزة. مثالي للمبتدئين.',
    },
    price: 18000000,
    sessions: 3,
    validity: { vi: '6 tháng', en: '6 months', fr: '6 mois', cn: '6个月', ar: '6 أشهر' },
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
    color: PEARL_WHITE,
  },
  {
    id: 2,
    name: {
      vi: 'Gold Elegance',
      en: 'Gold Elegance',
      fr: 'Gold Elegance',
      cn: '黄金优雅',
      ar: 'أناقة الذهب',
    },
    description: {
      vi: '5 liệu trình cao cấp bao gồm 24K Gold Facial và Diamond Microdermabrasion. Quà tặng champagne kèm theo.',
      en: '5 premium treatments including 24K Gold Facial and Diamond Microdermabrasion. Champagne gift included.',
      fr: '5 soins premium dont Facial Or 24K et Diamond Microdermabrasion. Cadeau champagne inclus.',
      cn: '5个高级疗程包括24K黄金面部和钻石微晶磨皮。附赠香槟。',
      ar: '5 علاجات فاخرة تشمل فيشيال الذهب 24 وتقشير الماس. هدية شمبانيا مشمولة.',
    },
    price: 40000000,
    sessions: 5,
    validity: { vi: '9 tháng', en: '9 months', fr: '9 mois', cn: '9个月', ar: '9 أشهر' },
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    color: CHAMPAGNE_GOLD,
  },
  {
    id: 3,
    name: {
      vi: 'Diamond Excellence',
      en: 'Diamond Excellence',
      fr: 'Diamond Excellence',
      cn: '钻石卓越',
      ar: 'تميز الماس',
    },
    description: {
      vi: '10 liệu trình Ultra Premium bao gồm Stem Cell Rejuvenation. Tặng bộ sản phẩm Hermès trị giá 50 triệu.',
      en: '10 Ultra Premium treatments including Stem Cell Rejuvenation. Complimentary Hermès gift set worth 50M VND.',
      fr: "10 soins Ultra Premium dont Stem Cell Rejuvenation. Set cadeau Hermès d'une valeur de 50M VND.",
      cn: '10个超高级疗程包括干细胞再生。赠送价值5000万的爱马仕礼盒。',
      ar: '10 علاجات فائقة الرقي تشمل تجديد الخلايا الجذعية. هدية Hermès مجانية قيمتها 50 مليون.',
    },
    price: 120000000,
    sessions: 10,
    validity: { vi: '12 tháng', en: '12 months', fr: '12 mois', cn: '12个月', ar: '12 شهراً' },
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
    color: DIAMOND_ICE,
  },
];

// Promotions
export const SPA12_PROMOTIONS = [
  {
    id: 1,
    title: {
      vi: 'Grand Opening Diamond Tower',
      en: 'Grand Opening Diamond Tower',
      fr: 'Grande Ouverture Diamond Tower',
      cn: '钻石大厦盛大开业',
      ar: 'الافتتاح الكبير لبرج الماس',
    },
    description: {
      vi: 'Giảm 25% tất cả liệu trình trong tháng khai trương Diamond Tower Saigon.',
      en: '25% off all treatments during Diamond Tower Saigon opening month.',
      fr: "25% de réduction sur tous les soins pendant le mois d'ouverture de Diamond Tower Saigon.",
      cn: '钻石大厦西贡开业月所有疗程7.5折。',
      ar: 'خصم 25٪ على جميع العلاجات خلال شهر افتتاح برج الماس سايغون.',
    },
    discount: '25%',
    validUntil: '2025-12-31',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
  },
  {
    id: 2,
    title: {
      vi: 'Member Appreciation Week',
      en: 'Member Appreciation Week',
      fr: 'Semaine de Reconnaissance des Membres',
      cn: '会员感恩周',
      ar: 'أسبوع تقدير الأعضاء',
    },
    description: {
      vi: 'Thành viên hiện hữu được tặng 1 liệu trình Pearl Facial miễn phí khi giới thiệu bạn bè.',
      en: 'Existing members get 1 free Pearl Facial when referring friends.',
      fr: 'Les membres actuels reçoivent 1 Pearl Facial gratuit en parrainant des amis.',
      cn: '现有会员推荐朋友即可获赠1次珍珠面部护理。',
      ar: 'يحصل الأعضاء الحاليون على Pearl Facial مجاني عند إحالة الأصدقاء.',
    },
    discount: {
      vi: 'Tặng 1 session',
      en: 'Free 1 session',
      fr: '1 séance offerte',
      cn: '赠送1次',
      ar: 'جلسة مجانية',
    },
    validUntil: '2025-11-30',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  },
  {
    id: 3,
    title: {
      vi: 'Couples Diamond Ritual',
      en: 'Couples Diamond Ritual',
      fr: 'Rituel Diamant Couples',
      cn: '双人钻石仪式',
      ar: 'طقوس الماس للأزواج',
    },
    description: {
      vi: 'Giảm 30% khi đặt lịch Couples Diamond Ritual vào ngày Valentine.',
      en: "30% off when booking Couples Diamond Ritual on Valentine's Day.",
      fr: '30% de réduction sur le Rituel Diamant Couples le jour de la Saint-Valentin.',
      cn: '情人节预订双人钻石仪式享7折优惠。',
      ar: 'خصم 30٪ عند حجز طقوس الماس للأزواج في يوم الحبايب.',
    },
    discount: '30%',
    validUntil: '2026-02-14',
    image: 'https://images.unsplash.com/photo-1600334129120-276ff4fb63d3?w=600&q=80',
  },
];

// Feedbacks
export const SPA12_FEEDBACKS = [
  {
    id: 1,
    name: 'Trần Thanh Hằng',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
    service: 'Pearl Radiance Facial',
    comment: {
      vi: 'Liệu trình ngọc trai thực sự đáng giá. Da sáng lên ngay sau buổi đầu tiên. Staff chuyên nghiệp và không gian sang trọng.',
      en: 'The pearl therapy is truly worth it. Skin brightened after just the first session. Professional staff and luxurious space.',
      fr: "La thérapie à la perle en vaut vraiment la peine. La peau s'est éclaircie dès la première séance.",
      cn: '珍珠护理真的物有所值。第一次后皮肤就变亮了。员工专业，空间奢华。',
      ar: 'علاج اللؤلؤ يستحق حقاً. البشرة تفتحت بعد الجلسة الأولى. طاقم محترف ومساحة فاخرة.',
    },
    date: '2025-02-15',
  },
  {
    id: 2,
    name: 'Nguyễn Minh Đức',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    service: '24K Gold Leaf Facial',
    comment: {
      vi: 'Tôi đã thử nhiều spa cao cấp nhưng Gold Facial ở đây khác biệt hoàn toàn. Vàng thật 24K, kỹ thuật viên master level.',
      en: "I've tried many premium spas but the Gold Facial here is completely different. Real 24K gold, master level technicians.",
      fr: "J'ai essayé de nombreux spas haut de gamme mais le Facial Or ici est complètement différent.",
      cn: '我尝试过很多高级水疗，但这里的黄金面部护理完全不同。真正的24K黄金，大师级技师。',
      ar: 'جربت العديد من المنتتجعات الفاخرة لكن فيشيال الذهب هنا مختلف تماماً.',
    },
    date: '2025-01-20',
  },
  {
    id: 3,
    name: 'Lisa Nguyễn',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    service: 'Stem Cell Rejuvenation',
    comment: {
      vi: 'Diamond member đã 2 năm. Stem Cell therapy thực sự thay đổi làn da tôi. Giá cao nhưng kết quả xứng đáng.',
      en: 'Diamond member for 2 years. Stem Cell therapy truly transformed my skin. Expensive but results are worth it.',
      fr: 'Membre Diamond depuis 2 ans. La thérapie Stem Cell a vraiment transformé ma peau.',
      cn: '钻石会员2年了。干细胞疗法真的改变了我的皮肤。价格高但效果值得。',
      ar: 'عضو الماس لمدة سنتين. علاج الخلايا الجذعية حول بشرتي حقاً.',
    },
    date: '2025-03-05',
  },
];

// Offers
export const SPA12_OFFERS = [
  {
    id: 1,
    title: {
      vi: 'First Visit Pearl',
      en: 'First Visit Pearl',
      fr: 'Première Visite Pearl',
      cn: '首次珍珠体验',
      ar: 'زيارة اللؤلؤ الأولى',
    },
    description: {
      vi: 'Khách mới được 20% off Pearl Radiance Facial hoặc Diamond Microdermabrasion.',
      en: 'New clients get 20% off Pearl Radiance Facial or Diamond Microdermabrasion.',
      fr: 'Nouveaux clients : 20% de réduction sur Pearl Radiance Facial ou Diamond Microdermabrasion.',
      cn: '新客户享Pearl Radiance Facial或Diamond Microdermabrasion 8折优惠。',
      ar: 'العملاء الجدد يحصلون على خصم 20٪ على Pearl Radiance Facial أو Diamond Microdermabrasion.',
    },
    discount: '20%',
    code: 'FIRSTPEARL',
    validUntil: '2025-12-31',
  },
  {
    id: 2,
    title: {
      vi: 'Birthday Diamond',
      en: 'Birthday Diamond',
      fr: 'Anniversaire Diamant',
      cn: '生日钻石礼',
      ar: 'عيد ميلاد الماس',
    },
    description: {
      vi: 'Thành viên nhận 1 liệu trình miễn phí trong tháng sinh nhật. Diamond member được nâng cấp lên Stem Cell.',
      en: 'Members receive 1 free treatment during birthday month. Diamond members upgrade to Stem Cell.',
      fr: "Les membres reçoivent 1 soin gratuit pendant leur mois d'anniversaire.",
      cn: '会员生日月获赠1次免费疗程。钻石会员升级为干细胞疗程。',
      ar: 'يحصل الأعضاء على علاج مجاني واحد خلال شهر عيد ميلادهم.',
    },
    discount: {
      vi: 'Miễn phí 1 session',
      en: 'Free 1 session',
      fr: '1 séance gratuite',
      cn: '赠送1次',
      ar: 'جلسة مجانية',
    },
    code: 'BIRTHDAY',
    validUntil: '2025-12-31',
  },
  {
    id: 3,
    title: {
      vi: 'Diamond Referral',
      en: 'Diamond Referral',
      fr: 'Parrainage Diamant',
      cn: '钻石推荐奖励',
      ar: 'إحالة الماس',
    },
    description: {
      vi: 'Diamond member giới thiệu bạn bè, cả hai được 25% off lần đầu.',
      en: 'Diamond members refer friends, both get 25% off first visit.',
      fr: 'Les membres Diamond parrainent des amis, les deux obtiennent 25% de réduction.',
      cn: '钻石会员推荐朋友，双方首次均享75折优惠。',
      ar: 'أعضاء الماس يحيلون الأصدقاء، كلاهما يحصل على خصم 25٪.',
    },
    discount: '25%',
    code: 'DIAMONDREF',
    validUntil: '2025-12-31',
  },
];

// Partners
export const SPA12_PARTNERS = [
  {
    id: 1,
    name: { vi: 'Hermès', en: 'Hermès', fr: 'Hermès', cn: '爱马仕', ar: 'هيرميس' },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hermès_logo.svg/200px-Hermès_logo.svg.png',
    description: {
      vi: 'Đối tác quà tặng độc quyền cho Diamond member.',
      en: 'Exclusive gift partner for Diamond members.',
      fr: 'Partenaire cadeau exclusif pour les membres Diamond.',
      cn: '钻石会员独家礼品合作伙伴。',
      ar: 'شريك هدايا حصري لأعضاء الماس.',
    },
  },
  {
    id: 2,
    name: {
      vi: 'Dom Pérignon',
      en: 'Dom Pérignon',
      fr: 'Dom Pérignon',
      cn: '唐培里侬',
      ar: 'دوم برينيون',
    },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Dom_Perignon_logo.svg/200px-Dom_Perignon_logo.svg.png',
    description: {
      vi: 'Champagne phục vụ trong các liệu trình VIP.',
      en: 'Champagne served in VIP treatments.',
      fr: 'Champagne servi dans les soins VIP.',
      cn: 'VIP疗程中供的香槟。',
      ar: 'شمبانيا تُقدم في العلاجات VIP.',
    },
  },
  {
    id: 3,
    name: {
      vi: 'Four Seasons Hotels',
      en: 'Four Seasons Hotels',
      fr: 'Four Seasons Hotels',
      cn: '四季酒店',
      ar: 'فور سيزونز',
    },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Four_Seasons_logo.svg/200px-Four_Seasons_logo.svg.png',
    description: {
      vi: 'Ưu đãi đặc biệt cho khách Four Seasons.',
      en: 'Special offers for Four Seasons guests.',
      fr: 'Offres spéciales pour les clients Four Seasons.',
      cn: '四季酒店客人专享优惠。',
      ar: 'عروض خاصة لضيوف فور سيزونز.',
    },
  },
  {
    id: 4,
    name: {
      vi: 'Singapore Airlines',
      en: 'Singapore Airlines',
      fr: 'Singapore Airlines',
      cn: '新加坡航空',
      ar: 'الخطوط الجوية السنغافورية',
    },
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Singapore_Airlines_logo_2.svg/200px-Singapore_Airlines_logo_2.svg.png',
    description: {
      vi: 'Chương trình loyalty kết hợp với Suites class.',
      en: 'Combined loyalty program with Suites class.',
      fr: 'Programme de fidélité combiné avec la classe Suites.',
      cn: '与Suites舱位合作的忠诚计划。',
      ar: 'برنامج ولاء مشترك مع درجة الجناح.',
    },
  },
];

// Before/After
export const SPA12_BEFORE_AFTER = [
  {
    id: 1,
    service: 'Pearl Radiance Facial',
    beforeImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&q=80',
    caption: {
      vi: 'Da sáng mịn, giảm nám 60% sau 8 buổi',
      en: 'Bright smooth skin, 60% pigmentation reduction after 8 sessions',
      fr: 'Peau lumineuse et lisse, réduction de 60% de la pigmentation après 8 séances',
      cn: '肌肤明亮光滑，8次后色斑减少60%',
      ar: 'بشرة مشرقة ناعمة، انخفاض 60٪ في التصبغات بعد 8 جلسات',
    },
    duration: '8 weeks',
  },
  {
    id: 2,
    service: 'Stem Cell Rejuvenation',
    beforeImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    caption: {
      vi: 'Nếp nhăn giảm 80%, độ đàn hồi tăng 45%',
      en: 'Wrinkles reduced 80%, elasticity increased 45%',
      fr: 'Rides réduites de 80%, élasticité augmentée de 45%',
      cn: '皱纹减少80%，弹性增加45%',
      ar: 'انخفاض التجاعيد 80٪، زيادة المرونة 45٪',
    },
    duration: '12 weeks',
  },
  {
    id: 3,
    service: 'Diamond Microdermabrasion',
    beforeImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600334129120-276ff4fb63d3?w=400&q=80',
    caption: {
      vi: 'Sẹo mờ 70%, lỗ chân lông se nhỏ',
      en: 'Scars faded 70%, pores minimized',
      fr: 'Cicatrices effacées de 70%, pores minimisés',
      cn: '疤痕淡化70%，毛孔缩小',
      ar: 'تلاشي الندبات 70٪، تصغير المسام',
    },
    duration: '6 weeks',
  },
];
