// ----------------------------------------------------------------------
// SPA5 - LUMIÈRE BALNÉO (FRENCH LUXURY SPA) - PAGE DATA
// Color scheme: NAVY #1A1A3E, GOLD #C9A84C, CREAM #F8F6F3, BURGUNDY #3D0C11
// ----------------------------------------------------------------------

export type Spa5Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export const NAVY = '#1A1A3E';
export const GOLD = '#C9A84C';
export const CREAM = '#F8F6F3';
export const BURGUNDY = '#3D0C11';
export const NAVY_LIGHT = '#E8E8F0';
export const INK = '#0D0D1A';

export const SPA5_PAGE_IMAGES = {
  about: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1200&q=80',
  services: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80',
  training: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  blog: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80',
  careers: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=1200&q=80',
  contact: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80',
  offers: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  branches: 'https://images.unsplash.com/photo-1560472355-536a03b6e503?w=1200&q=80',
  gallery: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80',
  feedback: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80',
  booking: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=1200&q=80',
  partners: 'https://images.unsplash.com/photo-1521737711860-e3fb16db23a3?w=1200&q=80',
  packages: 'https://images.unsplash.com/photo-1544161515-4ab6ce6d17c4?w=1200&q=80',
  beforeAfter: 'https://images.unsplash.com/photo-1570172619644-dfd03f5cf900?w=1200&q=80',
  promotions: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80',
};

// ----------------------------------------------------------------------
// ABOUT PAGE CONTENT
// ----------------------------------------------------------------------

export const spa5AboutContent = {
  eyebrow: {
    vi: 'VỀ CHÚNG TÔI',
    en: 'ABOUT US',
    fr: 'À PROPOS',
    cn: '关于我们',
    ar: 'معلومات عنا',
  },
  title: {
    vi: 'Lumière Balnéo',
    en: 'Lumière Balnéo',
    fr: 'Lumière Balnéo',
    cn: '光之泉疗养院',
    ar: 'لوميير بالنيو',
  },
  subtitle: {
    vi: 'Vẻ đẹp Pháp giữa lòng Sài Gòn',
    en: 'French beauty in the heart of Saigon',
    fr: 'La beauté française au cœur de Saïgon',
    cn: '西贡中心的法式美丽',
    ar: 'الجمال الفرنسي في قلب سايغون',
  },
  story: {
    vi: 'Được thành lập năm 2018, Lumière Balnéo mang đến trải nghiệm balnéothérapie (liệu pháp tắm khoáng) chuẩn Pháp đầu tiên tại Việt Nam. Chúng tôi kết hợp truyền thống spa balnéo Pháp với nguyên liệu thượng hạng từ Bordeaux, Brittany và Provence.',
    en: 'Founded in 2018, Lumière Balnéo brings the first authentic French balneotherapy experience to Vietnam. We combine traditional French balneotherapy with premium ingredients from Bordeaux, Brittany, and Provence.',
    fr: "Fondé en 2018, Lumière Balnéo offre la première expérience authentique de balnéothérapie française au Vietnam. Nous combinons la tradition balnéo française avec des ingrédients d'exception de Bordeaux, de la Bretagne et de Provence.",
    cn: '成立于2018年，光之泉疗养院为越南带来首个正宗法式温泉疗养体验。我们将法式温泉传统与来自波尔多、布列塔尼和普罗旺斯的顶级原料相结合。',
    ar: 'تأسست لوميير بالنيو عام 2018 لتقدم أول تجربة أصيلة للعلاج الحراري الفرنسي في فيتنام. نجمع بين تقاليد السبا الحراري الفرنسي ومكونات فاخرة من بوردو وبريتاني وبروفانس.',
  },
  values: [
    {
      icon: 'solar:crown-bold-duotone',
      title: { vi: 'Tinh Hoa Pháp', en: 'French Excellence', fr: 'Excellence Française', cn: '法式精粹', ar: 'التميز الفرنسي' },
      desc: {
        vi: 'Di sản spa balnéo Pháp trăm năm, được chuyển thể tinh tế cho khí hậu nhiệt đới Việt Nam.',
        en: 'A century of French balneotherapy heritage, delicately adapted for the Vietnamese tropical climate.',
        fr: "Un siècle d'héritage balnéo français, délicatement adapté au climat tropical vietnamien.",
        cn: '百年法式温泉疗养传承，精致融入越南热带气候。',
        ar: 'تراث فرنسي قرن من الزمان في العلاج الحراري، مُكيّف ببراعة للمناخ الاستوائي الفيتنامي.',
      },
    },
    {
      icon: 'solar:leaf-bold-duotone',
      title: { vi: 'Nguyên Liệu Thượng Hạng', en: 'Premium Ingredients', fr: 'Ingrédients Premium', cn: '顶级原料', ar: 'مكونات فاخرة' },
      desc: {
        vi: 'Nho đỏ Bordeaux, tảo biển Brittany, lavender Provence — chỉ những gì tinh khiết nhất.',
        en: 'Bordeaux red grapes, Brittany seaweed, Provence lavender — only the purest ingredients.',
        fr: 'Raisins rouges de Bordeaux, algues de Bretagne, lavande de Provence — uniquement le plus pur.',
        cn: '波尔多红葡萄、布列塔尼海藻、普罗旺斯薰衣草——只选最纯净的。',
        ar: 'عنب بوردو الأحمر، أعشاب بريتاني البحرية، لافندر بروفانس — فقط الأنقى.',
      },
    },
    {
      icon: 'solar:hand-stars-bold-duotone',
      title: { vi: 'Chuyên Gia Kỹ Thuật', en: 'Technical Expertise', fr: 'Expertise Technique', cn: '专业技术', ar: 'خبرة تقنية' },
      desc: {
        vi: 'Đội ngũ kỹ thuật viên được đào tạo theo chuẩn École des Thermes de Paris.',
        en: 'Our technicians are trained to the standards of École des Thermes de Paris.',
        fr: 'Nos techniciens sont formés selon les standards de l\'École des Thermes de Paris.',
        cn: '技师团队按照巴黎温泉学校标准培训。',
        ar: 'فنيونا مُدرَّبون وفق معايير مدرسة الحمامات الحرارية في باريس.',
      },
    },
  ],
  milestones: [
    { year: '2018', label: { vi: 'Khai trương cơ sở đầu tiên', en: 'First location opened', fr: 'Premier établissement ouvert', cn: '首家店开业', ar: 'افتتاح أول موقع' } },
    { year: '2020', label: { vi: 'Giải thưởng Spa Xuất Sắc', en: 'Excellence Spa Award', fr: 'Prix Excellence Spa', cn: '卓越水疗奖', ar: 'جائزة التميز' } },
    { year: '2022', label: { vi: 'Mở rộng 3 chi nhánh', en: 'Expanded to 3 locations', fr: '3 établissements', cn: '扩展至3家', ar: '3 فروع' } },
    { year: '2024', label: { vi: 'Đối tác thương hiệu Pháp', en: 'French brand partnership', fr: 'Partenariat marques françaises', cn: '法国品牌合作', ar: 'شراكة فرنسية' } },
  ],
  stats: [
    { value: '12+', label: { vi: 'Năm kinh nghiệm', en: 'Years experience', fr: 'Ans d\'expérience', cn: '年经验', ar: 'سنوات خبرة' }, icon: 'solar:medal-stars-bold-duotone' },
    { value: '25K+', label: { vi: 'Khách hàng', en: 'Clients served', fr: 'Clients servis', cn: '服务客户', ar: 'عميل' }, icon: 'solar:users-group-rounded-bold-duotone' },
    { value: '15+', label: { vi: 'Liệu trình độc quyền', en: 'Signature treatments', fr: 'Soins signature', cn: '独家疗程', ar: 'علاجات حصرية' }, icon: 'solar:star-shine-bold-duotone' },
  ],
};

// ----------------------------------------------------------------------
// SERVICES PAGE CONTENT
// ----------------------------------------------------------------------

export const spa5ServiceCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tous', cn: '全部', ar: 'الكل' } },
  { id: 'hydrotherapy', label: { vi: 'Thuỷ liệu', en: 'Hydrotherapy', fr: 'Hydrothérapie', cn: '水疗', ar: 'العلاج المائي' } },
  { id: 'massage', label: { vi: 'Massage', en: 'Massage', fr: 'Massage', cn: '按摩', ar: 'تدليك' } },
  { id: 'facial', label: { vi: 'Chăm sóc da', en: 'Facial', fr: 'Soins visage', cn: '面部护理', ar: 'العناية بالوجه' } },
  { id: 'body', label: { vi: 'Body', en: 'Body', fr: 'Corps', cn: '身体', ar: 'الجسم' } },
];

export const spa5Services = [
  {
    id: 'bain-thermal',
    slug: 'bain-thermal',
    category: 'hydrotherapy',
    name: { vi: 'Bain Thermal', en: 'Thermal Bath', fr: 'Bain Thermal', cn: '温泉浴', ar: 'حمام حراري' },
    shortDesc: {
      vi: 'Liệu pháp nước khoáng 38–42°C, giàu magie và canxi từ vùng Vichy.',
      en: 'Mineral thermal bath at 38–42°C, rich in magnesium and calcium from the Vichy region.',
      fr: 'Bain thermal minéral à 38–42°C, riche en magnésium et calcium de la région de Vichy.',
      cn: '来自维希地区的矿物温泉浴（38–42°C），富含镁和钙。',
      ar: 'حمام حراري معدني 38–42°م، غني بالمغنيسيوم والكالسيوم من منطقة فيشي.',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60分钟', ar: '60 دقيقة' },
    price: 890000,
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=800&q=80',
    icon: 'solar:water-sun-bold-duotone',
    color: NAVY,
  },
  {
    id: 'vinotherapie',
    slug: 'vinotherapie',
    category: 'body',
    name: { vi: 'Vinothérapie', en: 'Vinotherapy', fr: 'Vinothérapie', cn: '红酒疗法', ar: 'العلاج بالنبيذ' },
    shortDesc: {
      vi: 'Liệu pháp trẻ hóa từ polyphenol nho đỏ Bordeaux và dầu hạt nho.',
      en: 'Rejuvenation treatment using Bordeaux red grape polyphenols and grape seed oil.',
      fr: 'Soin rajeunissant aux polyphénols de raisin rouge de Bordeaux et huile de pépins de raisin.',
      cn: '采用波尔多红葡萄多酚与葡萄籽油的焕活疗法。',
      ar: 'علاج تجديد باستخدام البوليفينول من العنب الأحمر البورديلي وزيت بذور العنب.',
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90分钟', ar: '90 دقيقة' },
    price: 1290000,
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
    icon: 'solar:leaf-bold-duotone',
    color: BURGUNDY,
  },
  {
    id: 'thalassotherapie',
    slug: 'thalassotherapie',
    category: 'body',
    name: { vi: 'Thalassothérapie', en: 'Thalassotherapy', fr: 'Thalassothérapie', cn: '海洋疗法', ar: 'العلاج بمياه البحر' },
    shortDesc: {
      vi: 'Bùn và tảo biển Brittany kết hợp hydro-massage, khoáng chất biển phục hồi da.',
      en: 'Brittany seaweed and sea mud combined with hydro-massage, ocean minerals restore skin.',
      fr: 'Algues et boue marin de Bretagne combinées à l\'hydromassage, minéraux marins restaurent la peau.',
      cn: '布列塔尼海藻与海泥结合水疗按摩，海洋矿物质修复肌肤。',
      ar: 'أعشاب وطين بحري من بريتاني مع تدليك مائي، معادن البحر تستعيد البشرة.',
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75分钟', ar: '75 دقيقة' },
    price: 1050000,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    icon: 'solar:stars-bold-duotone',
    color: NAVY,
  },
  {
    id: 'bain-de-boue',
    slug: 'bain-de-boue',
    category: 'body',
    name: { vi: 'Bain de Boue', en: 'Mud Cocoon', fr: 'Bain de Boue', cn: '泥浆茧疗', ar: 'شرنقة الطين' },
    shortDesc: {
      vi: 'Đất sét kaolinite và illite từ Périgord Noir được làm ấm đến 42°C.',
      en: 'Kaolinite and illite clay from Périgord Noir heated to 42°C.',
      fr: 'Argile kaolinite et illite du Périgord Noir chauffée à 42°C.',
      cn: '来自佩里戈尔黑地区的高岭石与伊利石黏土，加热至42°C。',
      ar: 'طين الكاولينيت والإيليت من بيريغور نوار مُسخّن إلى 42°م.',
    },
    duration: { vi: '80 phút', en: '80 min', fr: '80 min', cn: '80分钟', ar: '80 دقيقة' },
    price: 1150000,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    icon: 'solar:mountains-bold-duotone',
    color: BURGUNDY,
  },
  {
    id: 'massage-suedois',
    slug: 'massage-suedois',
    category: 'massage',
    name: { vi: 'Massage Suédois', en: 'Swedish Massage', fr: 'Massage Suédois', cn: '瑞典式按摩', ar: 'تدليك سويدي' },
    shortDesc: {
      vi: 'Massage cổ điển với dầu lavender Provence, thư giãn sâu toàn thân.',
      en: 'Classic massage with Provence lavender oil, deep full-body relaxation.',
      fr: 'Massage classique à l\'huile de lavande de Provence, relaxation profonde du corps.',
      cn: '经典按摩配合普罗旺斯薰衣草精油，全身深度放松。',
      ar: 'تدليك كلاسيكي بزيت اللافندر البروفنسي، استرخاء عميق للجسم.',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60分钟', ar: '60 دقيقة' },
    price: 780000,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    icon: 'solar:hand-stars-bold-duotone',
    color: NAVY,
  },
  {
    id: 'soin-caviar',
    slug: 'soin-caviar',
    category: 'facial',
    name: { vi: 'Soin Caviar Prestige', en: 'Caviar Facial', fr: 'Soin Caviar Prestige', cn: '鱼子酱面部护理', ar: 'علاج الكافيار' },
    shortDesc: {
      vi: 'Tinh chất caviar đen Caspian, trẻ hóa cao cấp cho da trưởng thành.',
      en: 'Black Caspian caviar extract, premium anti-aging treatment for mature skin.',
      fr: 'Extrait de caviar noir de la Caspienne, soin anti-âge premium pour peau mature.',
      cn: '黑海鱼子酱精华，针对成熟肌肤的高端抗衰老护理。',
      ar: 'مستخلص كافيار بحر قزوين الأسود، علاج مضاد للشيخوخة فاخر للبشرة الناضجة.',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60分钟', ar: '60 دقيقة' },
    price: 1350000,
    image: 'https://images.unsplash.com/photo-1612817288484-cc8767bd2093?w=800&q=80',
    icon: 'solar:crown-bold-duotone',
    color: GOLD,
  },
];

// ----------------------------------------------------------------------
// TRAINING PAGE CONTENT
// ----------------------------------------------------------------------

export const spa5TrainingPrograms = [
  {
    id: 1,
    title: { vi: 'Balnéothérapie Fondamental', en: 'Balneotherapy Fundamentals', fr: 'Balnéothérapie Fondamentale', cn: '温泉疗养基础', ar: 'أساسيات العلاج الحراري' },
    duration: { vi: '3 tháng', en: '3 months', fr: '3 mois', cn: '3个月', ar: '3 أشهر' },
    level: { vi: 'Cơ bản', en: 'Basic', fr: 'Basique', cn: '基础', ar: 'أساسي' },
    description: {
      vi: 'Nhập môn balnéotherapy chuẩn Pháp — kỹ thuật thủy liệu, vận hành thiết bị, cơ sở học thuật.',
      en: 'Introduction to French balneotherapy — hydrotherapy techniques, equipment operation, academic foundations.',
      fr: 'Introduction à la balnéothérapie française — techniques d\'hydrothérapie, fonctionnement des équipements, bases académiques.',
      cn: '法式温泉疗养入门——水疗技术、设备操作、学术基础。',
      ar: 'مقدمة في العلاج الحراري الفرنسي — تقنيات العلاج المائي، تشغيل المعدات، الأسس الأكاديمية.',
    },
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=600&q=80',
  },
  {
    id: 2,
    title: { vi: 'Massage français Avancé', en: 'Advanced French Massage', fr: 'Massage Français Avancé', cn: '高级法式按摩', ar: 'تدليك فرنسي متقدم' },
    duration: { vi: '6 tháng', en: '6 months', fr: '6 mois', cn: '6个月', ar: '6 أشهر' },
    level: { vi: 'Nâng cao', en: 'Advanced', fr: 'Avancé', cn: '高级', ar: 'متقدم' },
    description: {
      vi: 'Massage cổ điển Pháp, kỹ thuật Vichy douche, body wrap chuyên sâu.',
      en: 'Classic French massage, Vichy douche technique, specialized body wraps.',
      fr: 'Massage classique français, technique de douche Vichy, enveloppements corporels spécialisés.',
      cn: '经典法式按摩、维希淋浴技术、专业身体包裹。',
      ar: 'التدليك الفرنسي الكلاسيكي، تقنية دش فيشي، لفات الجسم المتخصصة.',
    },
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    id: 3,
    title: { vi: 'Esthétique Médicale', en: 'Medical Esthetics', fr: 'Esthétique Médicale', cn: '医学美容', ar: 'الجمال الطبي' },
    duration: { vi: '9 tháng', en: '9 months', fr: '9 mois', cn: '9个月', ar: '9 أشهر' },
    level: { vi: 'Chuyên sâu', en: 'Expert', fr: 'Expert', cn: '专家', ar: 'خبير' },
    description: {
      vi: 'Khoa học da liễu, hóa mỹ phẩm, công nghệ thẩm mỹ không xâm lấn.',
      en: 'Dermatology science, cosmetic chemistry, non-invasive aesthetic technology.',
      fr: 'Science dermatologique, chimie cosmétique, technologie esthétique non invasive.',
      cn: '皮肤科学、化妆品化学、非侵入性美容技术。',
      ar: 'علم الأمراض الجلدية، كيمياء مستحضرات التجميل، تقنيات تجميل غير جراحية.',
    },
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
];

export const spa5Instructors = [
  {
    name: 'Dr. Marie Fontaine',
    title: { vi: 'Giám đốc Đào tạo', en: 'Training Director', fr: 'Directrice Pédagogique', cn: '培训总监', ar: 'مديرة التدريب' },
    bio: {
      vi: '20 năm kinh nghiệm, cựu giảng viên École des Thermes de Paris.',
      en: '20 years experience, former lecturer at École des Thermes de Paris.',
      fr: '20 ans d\'expérience, ancienne lectrice à l\'École des Thermes de Paris.',
      cn: '20年经验，巴黎温泉学校前讲师。',
      ar: '20 عامًا من الخبرة، محاضرة سابقة في مدرسة الحمامات الحرارية بباريس.',
    },
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
  },
  {
    name: 'Jean-Pierre Moreau',
    title: { vi: 'Chuyên gia Massage', en: 'Massage Expert', fr: 'Expert Massage', cn: '按摩专家', ar: 'خبير التدليك' },
    bio: {
      vi: 'Thạc sĩ kỹ thuật massage Pháp, huấn luyện viên đội tuyển Pháp.',
      en: 'Master in French massage techniques, trainer for French national team.',
      fr: 'Maître en techniques de massage français, entraîneur de l\'équipe de France.',
      cn: '法式按摩技术硕士，法国国家队教练。',
      ar: 'ماجستير في تقنيات التدليك الفرنسي، مدرب المنتخب الفرنسي.',
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    name: 'Sophie Chen',
    title: { vi: 'Chuyên gia Da Liễu', en: 'Dermatology Expert', fr: 'Experte Dermatologie', cn: '皮肤科专家', ar: 'خبيرة الأمراض الجلدية' },
    bio: {
      vi: 'Bác sĩ da liễu, chuyên gia hóa mỹ phẩm Pháp.',
      en: 'Dermatologist, French cosmetics expert.',
      fr: 'Dermatologue, experte en cosmétiques français.',
      cn: '皮肤科医生，法国化妆品专家。',
      ar: 'طبيبة أمراض جلدية، خبيرة مستحضرات التجميل الفرنسية.',
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
];

// ----------------------------------------------------------------------
// BLOG PAGE CONTENT
// ----------------------------------------------------------------------

export const spa5BlogCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tous', cn: '全部', ar: 'الكل' } },
  { id: 'skincare', label: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soins de la peau', cn: '护肤', ar: 'العناية بالبشرة' } },
  { id: 'wellness', label: { vi: 'Wellness', en: 'Wellness', fr: 'Bien-être', cn: '健康', ar: 'الصحة' } },
  { id: 'lifestyle', label: { vi: 'Lifestyle', en: 'Lifestyle', fr: 'Mode de vie', cn: '生活方式', ar: 'نمط الحياة' } },
];

export const spa5BlogPosts = [
  {
    id: 1,
    slug: 'balneotherapy-secrets',
    title: {
      vi: 'Bí mật Balnéothérapie: Nghệ Thuật Tắm Khoáng Pháp',
      en: 'Balneotherapy Secrets: The Art of French Thermal Bathing',
      fr: 'Les Secrets de la Balnéothérapie: L\'Art du Bain Thermal Français',
      cn: '温泉疗养的秘密：法式温泉浴艺术',
      ar: 'أسرار العلاج الحراري: فن الحمامات الحرارية الفرنسية',
    },
    excerpt: {
      vi: 'Khám phá các bước chuẩn của một liệu trình balnéotherapy chuẩn Pháp — từ tiền xử lý đến phục hồi.',
      en: 'Discover the standards of an authentic French balneotherapy treatment — from preparation to recovery.',
      fr: 'Découvrez les standards d\'un soin de balnéothérapie française authentique — de la préparation à la récupération.',
      cn: '探索正宗法式温泉疗养的标准流程——从准备到恢复。',
      ar: 'اكتشف معايير العلاج الحراري الفرنسي الأصيل — من التحضير إلى التعافي.',
    },
    category: { vi: 'Wellness', en: 'Wellness', fr: 'Bien-être', cn: '健康', ar: 'الصحة' },
    date: '15/06/2024',
    readTime: { vi: '7 phút', en: '7 min', fr: '7 min', cn: '7分钟', ar: '7 دقائق' },
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=800&q=80',
    author: 'Dr. Marie Fontaine',
  },
  {
    id: 2,
    slug: 'vinotherapy-benefits',
    title: {
      vi: 'Vinothérapie: Tại Sao Nho Đỏ Là Vẻ Đất Cho Da',
      en: 'Vinotherapy: Why Red Grapes Are a Skin Wonder',
      fr: 'Vinothérapie: Pourquoi le Raisin Rouge Est Miraculeux',
      cn: '红酒疗法：为什么红葡萄是肌肤奇迹',
      ar: 'العلاج بالنبيذ: لماذا يعتبر العنب الأحمر معجزة للبشرة',
    },
    excerpt: {
      vi: 'Polyphenol trong nho đỏ Bordeaux chống oxy hóa mạnh mẽ, phục hồi collagen tự nhiên.',
      en: 'Polyphenols in Bordeaux red grapes provide powerful antioxidant protection and natural collagen restoration.',
      fr: 'Les polyphénols du raisin rouge de Bordeaux offrent une protection antioxydante puissante et restaurent naturellement le collagène.',
      cn: '波尔多红葡萄中的多酚提供强效抗氧化保护，天然修复胶原蛋白。',
      ar: 'البوليفينول في العنب الأحمر البورديلي يوفر حماية مضادة للأكسدة قوية واستعادة الكولاجين الطبيعي.',
    },
    category: { vi: 'Skincare', en: 'Skincare', fr: 'Soins de la peau', cn: '护肤', ar: 'العناية بالبشرة' },
    date: '22/05/2024',
    readTime: { vi: '5 phút', en: '5 min', fr: '5 min', cn: '5分钟', ar: '5 دقائق' },
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
    author: 'Sophie Chen',
  },
  {
    id: 3,
    slug: 'french-spa-etiquette',
    title: {
      vi: 'Quy Tắc Spa Pháp: Những Điều Cần Biết',
      en: 'French Spa Etiquette: What You Need to Know',
      fr: 'L\'Étiquette du Spa Français: Ce Qu\'il Faut Savoir',
      cn: '法式SPA礼仪：须知事项',
      ar: 'آداب السبا الفرنسي: ما يجب معرفته',
    },
    excerpt: {
      vi: 'Nghi thức spa Pháp khác biệt — tìm hiểu để có trải nghiệm hoàn hảo.',
      en: 'French spa etiquette is unique — learn the essentials for a perfect experience.',
      fr: 'L\'étiquette des spas français est unique — apprenez l\'essentiel pour une expérience parfaite.',
      cn: '法式SPA礼仪独具特色——了解这些要点获得完美体验。',
      ar: 'آداب السبا الفرنسي فريدة — تعلم الأساسيات لتجربة مثالية.',
    },
    category: { vi: 'Lifestyle', en: 'Lifestyle', fr: 'Mode de vie', cn: '生活方式', ar: 'نمط الحياة' },
    date: '10/05/2024',
    readTime: { vi: '4 phút', en: '4 min', fr: '4 min', cn: '4分钟', ar: '4 دقائق' },
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
    author: 'Jean-Pierre Moreau',
  },
];

// ----------------------------------------------------------------------
// CAREERS PAGE CONTENT
// ----------------------------------------------------------------------

export const spa5Careers = [
  {
    id: 1,
    title: { vi: 'Kỹ Thuật Viên Balnéothérapie', en: 'Balneotherapy Technician', fr: 'Technicien Balnéothérapie', cn: '温泉疗养技师', ar: 'فني علاج حراري' },
    department: { vi: 'Thủy Liệu', en: 'Hydrotherapy', fr: 'Hydrothérapie', cn: '水疗', ar: 'العلاج المائي' },
    location: { vi: 'Quận 1, TP.HCM', en: 'District 1, HCMC', fr: 'Quartier 1, HCMC', cn: '胡志明市第一郡', ar: 'الحي 1، مدينة هوشي منه' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'بدوام كامل' },
    description: {
      vi: 'Phụ trách vận hành thiết bị thủy liệu, hỗ trợ khách hàng trong các liệu trình balnéotherapy.',
      en: 'Responsible for hydrotherapy equipment operation, assisting guests during balneotherapy treatments.',
      fr: 'Responsable du fonctionnement des équipements d\'hydrothérapie, assistance aux clients pendant les soins balnéo.',
      cn: '负责水疗设备运行，在温泉疗养疗程中协助客人。',
      ar: 'مسؤول عن تشغيل معدات العلاج المائي، مساعدة الضيوف أثناء علاجات العلاج الحراري.',
    },
  },
  {
    id: 2,
    title: { vi: 'Chuyên Viên Massage', en: 'Massage Therapist', fr: 'Masseur', cn: '按摩师', ar: 'معالج تدليك' },
    department: { vi: 'Massage & Body', en: 'Massage & Body', fr: 'Massage & Corps', cn: '按摩与身体', ar: 'التدليك والجسم' },
    location: { vi: 'Quận 7, TP.HCM', en: 'District 7, HCMC', fr: 'Quartier 7, HCMC', cn: '胡志明市第七郡', ar: 'الحي 7، مدينة هوشي منه' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'بدوام كامل' },
    description: {
      vi: 'Thực hiện các liệu trình massage chuẩn Pháp, body wrap và body scrub.',
      en: 'Perform French-style massage treatments, body wraps and body scrubs.',
      fr: 'Réaliser des soins de massage à la française, enveloppements et gommages corporels.',
      cn: '执行法式按摩疗程、身体包裹和身体磨砂。',
      ar: 'تنفيذ علاجات التدليك على الطراز الفرنسي، ولفات الجسم وتقشير الجسم.',
    },
  },
  {
    id: 3,
    title: { vi: 'Quản Lý Cơ Sở', en: 'Spa Manager', fr: 'Directeur Spa', cn: '水疗经理', ar: 'مدير سبا' },
    department: { vi: 'Quản lý', en: 'Management', fr: 'Direction', cn: '管理', ar: 'الإدارة' },
    location: { vi: 'Tất cả chi nhánh', en: 'All locations', fr: 'Tous les établissements', cn: '所有分店', ar: 'جميع الفروع' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'بدوام كامل' },
    description: {
      vi: 'Quản lý vận hành, đào tạo nhân viên, đảm bảo chất lượng dịch vụ chuẩn Pháp.',
      en: 'Operations management, staff training, ensuring French-standard service quality.',
      fr: 'Gestion des opérations, formation du personnel, garantie de la qualité de service française.',
      cn: '运营管理、员工培训、确保法式服务品质。',
      ar: 'إدارة العمليات، تدريب الموظفين، ضمان جودة الخدمة الفرنسية.',
    },
  },
];

export const spa5CareerBenefits = [
  { icon: 'solar:diploma-bold-duotone', label: { vi: 'Đào tạo Pháp', en: 'French Training', fr: 'Formation Française', cn: '法式培训', ar: 'تدريب فرنسي' } },
  { icon: 'solar:wallet-money-bold-duotone', label: { vi: 'Lương cạnh tranh', en: 'Competitive Salary', fr: 'Salaire Compétitif', cn: '有竞争力的薪资', ar: 'راتب تنافسي' } },
  { icon: 'solar:health-bold-duotone', label: { vi: 'Bảo hiểm y tế', en: 'Health Insurance', fr: 'Assurance Santé', cn: '医疗保险', ar: 'تأمين صحي' } },
  { icon: 'solar:calendar-bold-duotone', label: { vi: 'Nghỉ phép được lương', en: 'Paid Leave', fr: 'Congés Payés', cn: '带薪休假', ar: 'إجازة مدفوعة' } },
  { icon: 'solar:cup-star-bold-duotone', label: { vi: 'Tăng ca thưởng', en: 'Overtime Bonus', fr: 'Prime Heures Sup', cn: '加班奖金', ar: 'مكافأة العمل الإضافي' } },
  { icon: 'solar:users-group-rounded-bold-duotone', label: { vi: 'Môi trường chuyên nghiệp', en: 'Professional Team', fr: 'Équipe Professionnelle', cn: '专业团队', ar: 'فريق محترف' } },
];

// ----------------------------------------------------------------------
// CONTACT INFO
// ----------------------------------------------------------------------

export const spa5ContactInfo = {
  address: {
    vi: '12 Nguyễn Huệ, Quận 1, TP.HCM',
    en: '12 Nguyen Hue, District 1, HCMC',
    fr: '12 Nguyen Hue, Quartier 1, HCMC',
    cn: '胡志明市第一郡阮惠街12号',
    ar: '12 نغوين هوي، الحي 1، مدينة هوشي منه',
  },
  phone: '+84 28 3822 5588',
  email: 'contact@lumierebalneo.vn',
  hours: {
    vi: '09:00 – 21:00 (Thứ 2 – CN)',
    en: '09:00 – 21:00 (Mon – Sun)',
    fr: '09h00 – 21h00 (Lun – Dim)',
    cn: '09:00 – 21:00（周一至周日）',
    ar: '09:00 – 21:00 (الإثنين – الأحد)',
  },
  socials: [
    { icon: 'solar:facebook-bold-duotone', url: 'https://facebook.com/lumierebalneo' },
    { icon: 'solar:instagram-bold-duotone', url: 'https://instagram.com/lumierebalneo' },
    { icon: 'solar:youtube-bold-duotone', url: 'https://youtube.com/@lumierebalneo' },
  ],
};

// ----------------------------------------------------------------------
// BRANCHES
// ----------------------------------------------------------------------

export const spa5Branches = [
  {
    id: 1,
    name: 'Lumière Balnéo - Central',
    address: { vi: '12 Nguyễn Huệ, Q.1', en: '12 Nguyen Hue, D.1', fr: '12 Nguyen Hue, Q.1', cn: '阮惠街12号，第一郡', ar: '12 نغوين هوي، الحي 1' },
    phone: '+84 28 3822 5588',
    hours: '09:00 – 21:00',
    features: ['Thermal Pool', 'Vinotherapy Suite', 'Café Lumière'],
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=600&q=80',
  },
  {
    id: 2,
    name: 'Lumière Balnéo - Riverside',
    address: { vi: '45 Bến Vân Đồn, Q.4', en: '45 Ben Van Don, D.4', fr: '45 Ben Van Don, Q.4', cn: '文敦码头街45号，第四郡', ar: '45 بن فان دون، الحي 4' },
    phone: '+84 28 3843 6699',
    hours: '09:00 – 22:00',
    features: ['River View', 'Seaweed Therapy', 'Wine Bar'],
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80',
  },
  {
    id: 3,
    name: 'Lumière Balnéo - Garden',
    address: { vi: '88 Thảo Điền, Q.2', en: '88 Thao Dien, D.2', fr: '88 Thao Dien, Q.2', cn: '草甸街88号，第二郡', ar: '88 ثاو ديين، الحي 2' },
    phone: '+84 28 3740 8899',
    hours: '08:00 – 20:00',
    features: ['Garden Area', 'Outdoor Pool', 'Yoga Studio'],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
  {
    id: 4,
    name: 'Lumière Balnéo - Plaza',
    address: { vi: '101 Nguyễn Trãi, Q.5', en: '101 Nguyen Trai, D.5', fr: '101 Nguyen Trai, Q.5', cn: '阮追街101号，第五郡', ar: '101 نغوين تراي، الحي 5' },
    phone: '+84 28 3855 9988',
    hours: '10:00 – 21:00',
    features: ['Mall Location', 'Express Treatments', 'Boutique Shop'],
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
  },
  {
    id: 5,
    name: 'Lumière Balnéo - Eco',
    address: { vi: '77 Huỳnh Tấn Phát, Q.7', en: '77 Huynh Tan Phat, D.7', fr: '77 Huynh Tan Phat, Q.7', cn: '黄晋发街77号，第七郡', ar: '77 هوينه تان فات، الحي 7' },
    phone: '+84 28 5432 1122',
    hours: '08:00 – 19:00',
    features: ['Eco-Friendly', 'Organic Products', 'Meditation Room'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
];

// ----------------------------------------------------------------------
// GALLERY
// ----------------------------------------------------------------------

export const spa5Gallery = [
  { id: 1, src: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=800&q=80', caption: { vi: 'Bể Thermal chính', en: 'Main Thermal Pool', fr: 'Piscine Thermale Principale', cn: '主温泉池', ar: 'المسبح الحراري الرئيسي' } },
  { id: 2, src: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80', caption: { vi: 'Phòng Vinothérapie', en: 'Vinotherapy Suite', fr: 'Suite Vinothérapie', cn: '红酒疗法套房', ar: 'جناح العلاج بالنبيذ' } },
  { id: 3, src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', caption: { vi: 'Thalassothérapie', en: 'Thalassotherapy Area', fr: 'Zone Thalassothérapie', cn: '海洋疗法区', ar: 'منطقة العلاج بمياه البحر' } },
  { id: 4, src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', caption: { vi: 'Bain de Boue', en: 'Mud Bath', fr: 'Bain de Boue', cn: '泥浆浴', ar: 'حمام الطين' } },
  { id: 5, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', caption: { vi: 'Phòng massage', en: 'Massage Room', fr: 'Salle de Massage', cn: '按摩室', ar: 'غرفة التدليك' } },
  { id: 6, src: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&q=80', caption: { vi: 'Phòng nghỉ', en: 'Relaxation Lounge', fr: 'Salon de Détente', cn: '休息厅', ar: 'صالة الاسترخاء' } },
  { id: 7, src: 'https://images.unsplash.com/photo-1560472355-536a03b6e503?w=800&q=80', caption: { vi: 'Sảnh chính', en: 'Main Lobby', fr: 'Hall Principal', cn: '大堂', ar: 'البهو الرئيسي' } },
  { id: 8, src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', caption: { vi: 'Café Lumière', en: 'Café Lumière', fr: 'Café Lumière', cn: '光之咖啡馆', ar: 'مقهى لوميير' } },
];

// ----------------------------------------------------------------------
// FAQS
// ----------------------------------------------------------------------

export const spa5FaqCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tous', cn: '全部', ar: 'الكل' } },
  { id: 'booking', label: { vi: 'Đặt lịch', en: 'Booking', fr: 'Réservation', cn: '预约', ar: 'الحجز' } },
  { id: 'treatments', label: { vi: 'Liệu trình', en: 'Treatments', fr: 'Soins', cn: '疗程', ar: 'العلاجات' } },
  { id: 'membership', label: { vi: 'Thành viên', en: 'Membership', fr: 'Adhésion', cn: '会员', ar: 'العضوية' } },
];

export const spa5Faqs = [
  {
    id: 1,
    category: 'booking',
    question: {
      vi: 'Làm thế nào để đặt lịch tại Lumière Balnéo?',
      en: 'How do I book an appointment at Lumière Balnéo?',
      fr: 'Comment réserver un rendez-vous chez Lumière Balnéo?',
      cn: '如何在光之泉疗养院预约？',
      ar: 'كيف أحجز موعدًا في لوميير بالنيو؟',
    },
    answer: {
      vi: 'Bạn có thể đặt lịch qua website, gọi hotline +84 28 3822 5588, hoặc đến trực tiếp tại quầy tiếp tân. Chúng tôi khuyến nghị đặt trước 24 giờ để đảm bảo suất.',
      en: 'You can book via website, call hotline +84 28 3822 5588, or visit our reception desk. We recommend booking 24 hours in advance for guaranteed availability.',
      fr: 'Vous pouvez réserver via le site web, appeler le +84 28 3822 5588, ou venir directement à la réception. Nous recommandons de réserver 24h à l\'avance.',
      cn: '您可以通过网站、拨打热线+84 28 3822 5588或直接到前台预约。建议提前24小时预约以确保有位。',
      ar: 'يمكنك الحجز عبر الموقع أو الاتصال بالرقم +84 28 3822 5588 أو زيارة الاستقبال مباشرة. ننصح بالحجز قبل 24 ساعة.',
    },
  },
  {
    id: 2,
    category: 'treatments',
    question: {
      vi: 'Balneotherapy có phù hợp với tất cả mọi người?',
      en: 'Is balneotherapy suitable for everyone?',
      fr: 'La balnéothérapie convient-elle à tout le monde?',
      cn: '温泉疗养适合所有人吗？',
      ar: 'هل العلاج الحراري مناسب للجميع؟',
    },
    answer: {
      vi: 'Balneotherapy phù hợp hầu hết mọi người, nhưng phụ nữ mang thai, người có vấn đề tim mạch hoặc huyết áp cần tham khảo ý kiến bác sĩ. Chúng tôi có tư vấn sức khỏe trước mỗi liệu trình.',
      en: 'Balneotherapy suits most people, but pregnant women and those with cardiovascular or blood pressure issues should consult a doctor. We offer health consultations before each treatment.',
      fr: 'La balnéothérapie convient à la plupart des gens, mais les femmes enceintes et les personnes ayant des problèmes cardiovasculaires doivent consulter un médecin. Nous offrons des consultations santé.',
      cn: '温泉疗养适合大多数人，但孕妇及有心血管或血压问题者应咨询医生。每次疗程前我们提供健康咨询。',
      ar: 'العلاج الحراري مناسب لمعظم الناس، لكن يجب على الحوامل ومن يعانون من مشاكل القلب أو ضغط الدم استشارة الطبيب. نقدم استشارات صحية قبل كل علاج.',
    },
  },
  {
    id: 3,
    category: 'treatments',
    question: {
      vi: 'Tôi nên chuẩn bị gì trước khi đến spa?',
      en: 'What should I prepare before visiting the spa?',
      fr: 'Que dois-je préparer avant de venir au spa?',
      cn: '去SPA前应准备什么？',
      ar: 'ما الذي يجب تحضيره قبل زيارة السبا؟',
    },
    answer: {
      vi: 'Không cần chuẩn bị gì đặc biệt. Hãy đến trước 15 phút để thư giãn và làm quen không gian. Chúng tôi cung cấp áo choàng, khăn và tất cả đồ dụng cần thiết.',
      en: 'No special preparation needed. Arrive 15 minutes early to relax and acclimate. We provide robes, towels and all necessary amenities.',
      fr: 'Pas de préparation spéciale nécessaire. Venez 15 minutes à l\'avance pour vous détendre. Nous fournissons peignoirs, serviettes et tous les équipements.',
      cn: '无需特别准备。提前15分钟到达放松适应环境。我们提供浴袍、毛巾和所有必要设施。',
      ar: 'لا حاجة لتحضير خاص. احضر قبل 15 دقيقة للاسترخاء. نوفر البلاطات والمناشف وكل اللوازم اللازمة.',
    },
  },
  {
    id: 4,
    category: 'membership',
    question: {
      vi: 'Gói thành viên có những ưu đãi gì?',
      en: 'What are the membership benefits?',
      fr: 'Quels sont les avantages de l\'adhésion?',
      cn: '会员有哪些优惠？',
      ar: 'ما هي مزايا العضوية؟',
    },
    answer: {
      vi: 'Thành viên được giảm giá đến 25%, ưu tiên đặt lịch, quyền truy cập phòng Lounge riêng, và được mời các sự kiện độc quyền. Có 3 cấp độ: Silver, Gold, và Platinum.',
      en: 'Members enjoy up to 25% discount, priority booking, access to private Lounge, and invitations to exclusive events. Three tiers: Silver, Gold, and Platinum.',
      fr: 'Les membres profitent jusqu\'à 25% de réduction, réservation prioritaire, accès au salon privé, invitations aux événements exclusifs. Trois niveaux: Silver, Gold et Platinum.',
      cn: '会员享有最高25%折扣、预约优先、私人休息室使用权及独家活动邀请。分三个级别：银卡、金卡、白金卡。',
      ar: 'يحصل الأعضاء على خصم يصل إلى 25%، حجز أولوي، دخول الصالة الخاصة، ودعوات للفعاليات الحصرية. ثلاث مستويات: فضي وذهبي وبلاتيني.',
    },
  },
  {
    id: 5,
    category: 'booking',
    question: {
      vi: 'Chính sách hủy lịch như thế nào?',
      en: 'What is the cancellation policy?',
      fr: 'Quelle est la politique d\'annulation?',
      cn: '取消预约的政策是什么？',
      ar: 'ما هي سياسة الإلغاء؟',
    },
    answer: {
      vi: 'Hủy trước 24 giờ: hoàn tiền 100%. Hủy trong vòng 24 giờ: phí 50%. No-show: phí 100%. Liên hệ hotline để điều chỉnh.',
      en: 'Cancel 24 hours prior: 100% refund. Cancel within 24 hours: 50% fee. No-show: 100% fee. Contact hotline to reschedule.',
      fr: 'Annulation 24h avant: remboursement 100%. Annulation sous 24h: frais 50%. No-show: frais 100%. Contactez le hotline pour reporter.',
      cn: '提前24小时取消：100%退款。24小时内取消：收取50%费用。爽约：收取100%费用。联系热线改期。',
      ar: 'الإلغاء قبل 24 ساعة: استرداد 100%. الإلغاء خلال 24 ساعة: رسوم 50%. عدم الحضور: رسوم 100%. تواصل مع الخط الساخن لإعادة الجدولة.',
    },
  },
];

// ----------------------------------------------------------------------
// PACKAGES
// ----------------------------------------------------------------------

export const spa5Packages = [
  {
    id: 1,
    name: { vi: 'Bouquet Parisien', en: 'Parisian Bouquet', fr: 'Bouquet Parisien', cn: '巴黎花束', ar: 'باقة باريسية' },
    description: {
      vi: 'Trải nghiệm 3 liệu trình đặc trưng — Bain Thermal, Massage Suédois, Soin Visage cơ bản.',
      en: 'Experience 3 signature treatments — Thermal Bath, Swedish Massage, Basic Facial.',
      fr: 'Expérience 3 soins signature — Bain Thermal, Massage Suédois, Soin Visage basique.',
      cn: '体验3个招牌疗程——温泉浴、瑞典式按摩、基础面部护理。',
      ar: 'تجربة 3 علاجات مميزة — الحمام الحراري، التدليك السويدي، العناية بالوجه الأساسية.',
    },
    duration: { vi: '3 giờ', en: '3 hours', fr: '3 heures', cn: '3小时', ar: '3 ساعات' },
    originalPrice: 2670000,
    price: 2200000,
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=600&q=80',
  },
  {
    id: 2,
    name: { vi: 'Journée Royale', en: 'Royal Day', fr: 'Journée Royale', cn: '皇室一日', ar: 'يوم ملكي' },
    description: {
      vi: 'Ngày thảnh thơi hoàn chỉnh — Vinothérapie, Thalassothérapie, Soin Caviar, bữa trưa Pháp.',
      en: 'Complete relaxation day — Vinotherapy, Thalassotherapy, Caviar Facial, French lunch.',
      fr: 'Journée relaxante complète — Vinothérapie, Thalassothérapie, Soin Caviar, déjeuner français.',
      cn: '完美放松日——红酒疗法、海洋疗法、鱼子酱面部护理、法式午餐。',
      ar: 'يوم استرخاء كامل — العلاج بالنبيذ، العلاج بمياه البحر، العناية بالكافيار، غداء فرنسي.',
    },
    duration: { vi: '6 giờ', en: '6 hours', fr: '6 heures', cn: '6小时', ar: '6 ساعات' },
    originalPrice: 4500000,
    price: 3690000,
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80',
    featured: true,
  },
  {
    id: 3,
    name: { vi: 'Escapade Bordelaise', en: 'Bordeaux Escape', fr: 'Escapade Bordelaise', cn: '波尔多假期', ar: 'هروب بوردو' },
    description: {
      vi: 'Liệu trình nho đỏ trọn vẹn — Vinothérapie, Enveloppement Chocolat, Peel aux Fruits.',
      en: 'Complete grape therapy — Vinotherapy, Chocolate Wrap, Fruit Acid Peel.',
      fr: 'Cure de raisin complète — Vinothérapie, Enveloppement Chocolat, Peel aux Fruits.',
      cn: '完整葡萄疗程——红酒疗法、巧克力包裹、果酸焕肤。',
      ar: 'علاج العنب الكامل — العلاج بالنبيذ، لفة الشوكولاتة، تقشير الفواكه.',
    },
    duration: { vi: '4 giờ', en: '4 hours', fr: '4 heures', cn: '4小时', ar: '4 ساعات' },
    originalPrice: 3290000,
    price: 2790000,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
];

// ----------------------------------------------------------------------
// BEFORE/AFTER
// ----------------------------------------------------------------------

export const spa5BeforeAfters = [
  {
    id: 1,
    treatment: { vi: 'Vinothérapie (5 buổi)', en: 'Vinotherapy (5 sessions)', fr: 'Vinothérapie (5 séances)', cn: '红酒疗法（5次）', ar: 'العلاج بالنبيذ (5 جلسات)' },
    before: 'https://images.unsplash.com/photo-1570172619644-dfd03f5cf900?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1616394584738-fc6e91d5b1b8?w=600&q=80',
    testimonial: {
      vi: 'Da sáng hơn, lỗ chân lông se lại, độ đàn hồi cải thiện rõ rệt.',
      en: 'Brighter skin, tightened pores, significantly improved elasticity.',
      fr: 'Peau plus lumineuse, pores resserrés, élasticité nettement améliorée.',
      cn: '肌肤更明亮，毛孔收细，弹性明显改善。',
      ar: 'بشرة أشد إشراقًا، مسام أضيق، مرونة محسّنة بشكل ملحوظ.',
    },
    client: 'Minh Anh, 34',
  },
  {
    id: 2,
    treatment: { vi: 'Thalassothérapie (8 buổi)', en: 'Thalassotherapy (8 sessions)', fr: 'Thalassothérapie (8 séances)', cn: '海洋疗法（8次）', ar: 'العلاج بمياه البحر (8 جلسات)' },
    before: 'https://images.unsplash.com/photo-1612817288484-cc8767bd2093?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    testimonial: {
      vi: 'Cơ thể nhẹ nhõm, da mềm mại, giấc ngủ tốt hơn nhiều.',
      en: 'Body feels lighter, skin is softer, much better sleep quality.',
      fr: 'Corps plus léger, peau plus douce, meilleure qualité de sommeil.',
      cn: '身体轻盈，肌肤柔嫩，睡眠质量大为改善。',
      ar: 'الجسم أخف، البشرة أنعم، جودة النوم أفضل بكثير.',
    },
    client: 'Thị Hồng, 42',
  },
  {
    id: 3,
    treatment: { vi: 'Soin Caviar (6 buổi)', en: 'Caviar Facial (6 sessions)', fr: 'Soin Caviar (6 séances)', cn: '鱼子酱面部护理（6次）', ar: 'العناية بالكافيار (6 جلسات)' },
    before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1616394584738-fc6e91d5b1b8?w=600&q=80',
    testimonial: {
      vi: 'Nếp nhăn giảm rõ, da căng mịn, trông trẻ hơn 5 tuổi.',
      en: 'Wrinkles reduced visibly, skin firm and smooth, looks 5 years younger.',
      fr: 'Rides visiblement réduites, peau ferme et lisse, paraît 5 ans de moins.',
      cn: '皱纹明显减少，肌肤紧致光滑，看起来年轻了5岁。',
      ar: 'تجاعيد أقل وضوحًا، بشرة مشدودة وناعمة، أبدو أصغر بـ 5 سنوات.',
    },
    client: 'Thanh Tâm, 48',
  },
];

// ----------------------------------------------------------------------
// PROMOTIONS
// ----------------------------------------------------------------------

export const spa5Promotions = [
  {
    id: 1,
    title: { vi: 'Bastille Day Special', en: 'Bastille Day Special', fr: 'Spécial Fête Nationale', cn: '国庆日特惠', ar: 'عرض يوم باستيل' },
    discount: '25%',
    description: {
      vi: 'Giảm 25% mọi liệu trình từ 14–16/7. Mã: BASTILLE2024',
      en: '25% off all treatments from July 14–16. Code: BASTILLE2024',
      fr: '25% sur tous les soins du 14–16 juillet. Code: BASTILLE2024',
      cn: '7月14-16日所有疗程享25%折扣。代码：BASTILLE2024',
      ar: 'خصم 25% على جميع العلاجات 14–16 يوليو. الكود: BASTILLE2024',
    },
    validUntil: '16/07/2024',
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=600&q=80',
  },
  {
    id: 2,
    title: { vi: 'First Visit Offer', en: 'First Visit Offer', fr: 'Première Visite', cn: '首次光临优惠', ar: 'عرض الزيارة الأولى' },
    discount: '20%',
    description: {
      vi: 'Giảm 20% cho khách mới đăng ký thành viên ngay hôm nay.',
      en: '20% off for new members who sign up today.',
      fr: '20% pour les nouveaux membres qui s\'inscrivent aujourd\'hui.',
      cn: '新会员今天注册即享20%折扣。',
      ar: 'خصم 20% للأعضاء الجدد الذين يسجلون اليوم.',
    },
    validUntil: '31/12/2024',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80',
  },
  {
    id: 3,
    title: { vi: 'Couple Retreat', en: 'Couple Retreat', fr: 'Retraite Couple', cn: '情侣度假', ar: 'تراجع الأزواج' },
    discount: 'Buy 1 Get 1',
    description: {
      vi: 'Mua 1 liệu trình tặng 1 cho người yêu hàng Thứ 4.',
      en: 'Buy 1 treatment get 1 free for couples every Wednesday.',
      fr: 'Achetez 1 soin, offrez-en 1 pour les couples chaque mercredi.',
      cn: '每周三情侣买一送一。',
      ar: 'اشترِ علاجًا واحصل على واحد مجانًا للأزواج كل الأربعاء.',
    },
    validUntil: 'Tạm thời Wed only',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
];

// ----------------------------------------------------------------------
// FEEDBACKS
// ----------------------------------------------------------------------

export const spa5Feedbacks = [
  {
    id: 1,
    name: 'Catherine Nguyen',
    rating: 5,
    treatment: 'Vinothérapie',
    comment: {
      vi: 'Trải nghiệm tuyệt vời! Dịch vụ chuyên nghiệp, không gian sang trọng.',
      en: 'Amazing experience! Professional service, luxurious atmosphere.',
      fr: 'Expérience incroyable! Service professionnel, atmosphère luxueuse.',
      cn: '绝佳体验！专业服务，豪华氛围。',
      ar: 'تجربة رائعة! خدمة محترفة، أجواء فاخرة.',
    },
    date: '15/06/2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
  },
  {
    id: 2,
    name: 'Philippe Martin',
    rating: 5,
    treatment: 'Bain Thermal',
    comment: {
      vi: 'Như được trở lại Pháp! Nước khoáng chuẩn, nhiệt độ hoàn hảo.',
      en: 'Felt like being back in France! Authentic mineral water, perfect temperature.',
      fr: 'Comme être de retour en France! Eau minérale authentique, température parfaite.',
      cn: '就像回到了法国！纯正矿物质水，完美温度。',
      ar: 'وكأنني عدت إلى فرنسا! مياه معدنية أصيلة، حرارة مثالية.',
    },
    date: '10/06/2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
  },
  {
    id: 3,
    name: 'Lê Thu Hương',
    rating: 4,
    treatment: 'Soin Caviar',
    comment: {
      vi: 'da đẹp hơn hẳn sau 3 buổi. Sẽ quay lại tiếp.',
      en: 'Skin is much better after 3 sessions. Will definitely return.',
      fr: 'La peau est bien meilleure après 3 séances. Je reviendrai certainement.',
      cn: '3次疗程后皮肤好多了。一定会再来。',
      ar: 'البشرة أفضل بكثير بعد 3 جلسات. سأعود بالتأكيد.',
    },
    date: '02/06/2024',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
  },
];

// ----------------------------------------------------------------------
// OFFERS
// ----------------------------------------------------------------------

export const spa5Offers = [
  {
    id: 1,
    title: { vi: 'Wellness Month Pass', en: 'Wellness Month Pass', fr: 'Pass Bien-être Mensuel', cn: '健康月票', ar: 'اشتراك الصحة الشهري' },
    originalPrice: 8000000,
    price: 5500000,
    benefits: [
      { vi: 'Không giới hạn Bain Thermal', en: 'Unlimited Thermal Bath', fr: 'Bain Thermal illimité', cn: '温泉浴不限次', ar: 'حمام حراري غير محدود' },
      { vi: '2 liệu trình massage/tháng', en: '2 massage treatments/month', fr: '2 massages/mois', cn: '每月2次按摩', ar: '2 تدليك/شهر' },
      { vi: '10% giảm tất cả dịch vụ', en: '10% off all services', fr: '10% sur tous services', cn: '所有疗程享9折', ar: 'خصم 10% على جميع الخدمات' },
    ],
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=600&q=80',
  },
  {
    id: 2,
    title: { vi: 'Bridal Package', en: 'Bridal Package', fr: 'Forfait Mariée', cn: '新娘套餐', ar: 'باقة العروس' },
    originalPrice: 15000000,
    price: 10990000,
    benefits: [
      { vi: '6 buổi Vinothérapie', en: '6 Vinotherapy sessions', fr: '6 séances Vinothérapie', cn: '红酒疗法6次', ar: '6 جلسات علاج بالنبيذ' },
      { vi: '4 buổi Soin Caviar', en: '4 Caviar Facial sessions', fr: '4 séances Soin Caviar', cn: '鱼子酱护理4次', ar: '4 جلسات عناية بالكافيار' },
      { vi: 'Bữa trưa VIP', en: 'VIP lunch included', fr: 'Déjeuner VIP inclus', cn: '含VIP午餐', ar: 'غداء VIP مشمول' },
    ],
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80',
    featured: true,
  },
  {
    id: 3,
    title: { vi: 'Corporate Wellness', en: 'Corporate Wellness', fr: 'Bien-être Entreprise', cn: '企业健康套餐', ar: 'صحة الشركات' },
    originalPrice: 0,
    price: 0,
    isCustom: true,
    benefits: [
      { vi: 'Gói tùy chỉnh theo nhu cầu', en: 'Customizable package', fr: 'Forfait personnalisable', cn: '可定制套餐', ar: 'باقة قابلة للتخصيص' },
      { vi: 'Giá ưu đãi nhóm', en: 'Group discount pricing', fr: 'Tarif groupe', cn: '团体优惠价', ar: 'سعر خصم المجموعات' },
      { vi: 'Xuất hóa đơn VAT', en: 'VAT invoice provided', fr: 'Facture TVA fournie', cn: '提供增值税发票', ar: 'فاتورة ضريبية' },
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
];

// ----------------------------------------------------------------------
// PARTNERS
// ----------------------------------------------------------------------

export const spa5Partners = [
  {
    id: 1,
    name: 'Bioderma Paris',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
    description: {
      vi: 'Đối tác sản phẩm chăm sóc da chính hãng',
      en: 'Official skincare product partner',
      fr: 'Partenaire produits de soins officiel',
      cn: '官方护肤产品合作伙伴',
      ar: 'شريك منتجات العناية بالبشرة الرسمي',
    },
  },
  {
    id: 2,
    name: 'Vichy Thermal',
    logo: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=200&q=80',
    description: {
      vi: 'Nhà cung cấp nguyên liệu khoáng Pháp',
      en: 'French mineral ingredient supplier',
      fr: 'Fournisseur français d\'ingrédients minéraux',
      cn: '法国矿物质原料供应商',
      ar: 'مورد فرنسي للمكونات المعدنية',
    },
  },
  {
    id: 3,
    name: 'École des Thermes de Paris',
    logo: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=200&q=80',
    description: {
      vi: 'Đối tác đào tạo kỹ thuật balnéothérapie',
      en: 'Balneotherapy training partner',
      fr: 'Partenaire formation balnéothérapie',
      cn: '温泉疗养培训伙伴',
      ar: 'شريك التدريب على العلاج الحراري',
    },
  },
  {
    id: 4,
    name: 'Château de Beauté',
    logo: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=200&q=80',
    description: {
      vi: 'Thương hiệu mỹ phẩm Bordeaux cao cấp',
      en: 'Premium Bordeaux cosmetics brand',
      fr: 'Marque cosmétique bordelaise premium',
      cn: '波尔多高端化妆品品牌',
      ar: 'علامة تجاري بورديلية فاخرة',
    },
  },
];

// ----------------------------------------------------------------------
// POLICIES
// ----------------------------------------------------------------------

export const spa5Policies = [
  {
    id: 1,
    title: { vi: 'Chính sách quyền riêng tư', en: 'Privacy Policy', fr: 'Politique de Confidentialité', cn: '隐私政策', ar: 'سياسة الخصوصية' },
    content: {
      vi: 'Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng theo GDPR và luật pháp Việt Nam. Dữ liệu được lưu trữ an toàn và không chia sẻ với bên thứ ba.',
      en: 'We are committed to protecting your personal information under GDPR and Vietnamese law. Data is stored securely and not shared with third parties.',
      fr: 'Nous nous engageons à protéger vos données personnelles selon le RGPD et la loi vietnamienne. Les données sont stockées en toute sécurité et non partagées.',
      cn: '我们承诺按照GDPR和越南法律保护您的个人信息。数据安全存储，不与第三方共享。',
      ar: 'نلتزم بحماية معلوماتك الشخصية وفقًا للائحة حماية البيانات والقانون الفيتنامي. البيانات محفوظة بأمان ولا يتم مشاركتها.',
    },
  },
  {
    id: 2,
    title: { vi: 'Điều khoản sử dụng', en: 'Terms of Service', fr: 'Conditions d\'Utilisation', cn: '使用条款', ar: 'شروط الخدمة' },
    content: {
      vi: 'Việc sử dụng dịch vụ đồng nghĩa với việc bạn đồng ý với các điều khoản. Vui lòng đọc kỹ trước khi đặt lịch.',
      en: 'Using our services means you agree to our terms. Please read carefully before booking.',
      fr: 'L\'utilisation de nos services signifie que vous acceptez nos conditions. Veuillez lire attentivement.',
      cn: '使用我们的服务即表示您同意我们的条款。预约前请仔细阅读。',
      ar: 'استخدام خدماتنا يعني موافقتك على شروطنا. يرجى القراءة بعناية قبل الحجز.',
    },
  },
  {
    id: 3,
    title: { vi: 'Chính sách hoàn tiền', en: 'Refund Policy', fr: 'Politique de Remboursement', cn: '退款政策', ar: 'سياسة الاسترداد' },
    content: {
      vi: 'Hoàn tiền đầy đủ nếu hủy trước 24 giờ. Hủy trong 24 giờ chịu phí 50%. No-show không hoàn tiền.',
      en: 'Full refund if cancelled 24 hours prior. Within 24 hours: 50% fee. No-show: no refund.',
      fr: 'Remboursement total si annulé 24h avant. Sous 24h: frais 50%. No-show: pas de remboursement.',
      cn: '提前24小时取消全额退款。24小时内收取50%费用。爽约不退款。',
      ar: 'استرداد كامل إذا أُلغي قبل 24 ساعة. خلال 24 ساعة: رسوم 50%. عدم الحضور: لا استرداد.',
    },
  },
];
