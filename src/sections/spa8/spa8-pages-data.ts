// ----------------------------------------------------------------------
// spa8 sub-pages – Ryokan Onsen theme (deep ink / gold / sakura / cream)
// Japanese hot spring spa with seasonal rituals, shiatsu, and zen aesthetics.
// ----------------------------------------------------------------------

export const INK = '#1A0A2E';
export const GOLD = '#C8A951';
export const SAKURA = '#FFB7C5';
export const CREAM = '#FFF8F0';
export const ONSEN_RED = '#C84B4B';
export const CHARCOAL = '#2D2A40';

export type Spa8Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export const SPA8_PAGE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
  about: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1600&q=80',
  services: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1600&q=80',
  serviceDetails: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1600&q=80',
  training: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80',
  blog: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1600&q=80',
  careers: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&q=80',
  booking: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
  contact: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1600&q=80',
  offers: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80',
  feedback: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1600&q=80',
  promotions: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80',
  branches: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80',
  account: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&q=80',
  partners: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80',
  packages: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1600&q=80',
  beforeAfter: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=1600&q=80',
  faq: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=80',
  policy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80',
  gallery: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80',
};

// ----------------------------------------------------------------------
// ABOUT CONTENT
// ----------------------------------------------------------------------

export const spa8AboutContent = {
  eyebrow: {
    vi: '私たちの物語',
    en: 'OUR STORY',
    fr: 'NOTRE HISTOIRE',
    cn: '我们的故事',
    ar: 'قصتنا',
  },
  title: {
    vi: 'Amaya Onsen',
    en: 'Amaya Onsen',
    fr: 'Amaya Onsen',
    cn: 'Amaya 温泉',
    ar: 'أمايا أونسن',
  },
  subtitle: {
    vi: 'Nơi lưu giữ tinh hoa Onsen Nhật Bản giữa lòng Việt Nam — không gian thiền tịnh, nước khoáng thiên nhiên và nghệ thuật Omotenashi.',
    en: 'Where the essence of Japanese Onsen lives in Vietnam — zen tranquility, natural mineral waters, and the art of Omotenashi.',
    fr: 'Où l\'essence de l\'Onsen japonais vit au Vietnam — quiétude zen, eaux minérales naturelles et l\'art de l\'Omotenashi.',
    cn: '在越南传承日本温泉精髓——禅意宁静、天然矿泉与日式待客之道。',
    ar: 'حيث جوهر أونسن الياباني يحيا في فيتنام — سكينة زن، مياه معدنية طبيعية وفن الضيافة اليابانية.',
  },
  story: {
    vi: 'Được thành lập năm 2018, Amaya Onsen mang đến trải nghiệm Ryokan truyền thống Nhật Bản ngay tại Sài Gòn.',
    en: 'Established in 2018, Amaya Onsen brings the traditional Japanese Ryokan experience right to Saigon.',
    fr: 'Fondé en 2018, Amaya Onsen apporte l\'expérience traditionnelle du Ryokan japonais directement à Saïgon.',
    cn: 'Amaya 温泉成立于2018年，将传统日式旅馆体验带到西贡。',
    ar: 'تأسس في عام 2018، يجلب أمايا أونسن تجربة الريوكان اليابانية التقليدية إلى سايغون.',
  },
  milestones: [
    { year: '2018', label: { vi: 'Khai trương', en: 'Opening', fr: 'Ouverture', cn: '开业', ar: 'الافتتاح' } },
    { year: '2020', label: { vi: 'Bể onsen ngoài trời', en: 'Outdoor onsen', fr: 'Onsen extérieur', cn: '露天温泉', ar: 'أونسن خارجي' } },
    { year: '2022', label: { vi: '20.000+ khách', en: '20,000+ guests', fr: '20 000+ clients', cn: '20,000+ 客人', ar: 'أكثر من 20,000 ضيف' } },
    { year: '2024', label: { vi: '5 chi nhánh', en: '5 branches', fr: '5 succursales', cn: '5 家分店', ar: '5 فروع' } },
  ],
  values: [
    {
      icon: 'solar:leaf-bold-duotone',
      title: { vi: 'Onsen Thiên Nhiên', en: 'Natural Onsen', fr: 'Onsen Naturel', cn: '天然温泉', ar: 'أونسن طبيعي' },
      desc: { vi: 'Nước khoáng nóng thiên nhiên 42°C giàu khoáng chất từ suối sâu.', en: 'Natural 42°C mineral-rich hot spring water from deep sources.', fr: 'Eau thermale naturelle à 42°C riche en minéraux de sources profondes.', cn: '来自深层水源的42°C天然富矿温泉水。', ar: 'مياه حارة طبيعية غنية بالمعادن بدرجة 42°م من مصادر عميقة.' },
    },
    {
      icon: 'solar:hand-stars-bold-duotone',
      title: { vi: 'Shiatsu Chính Tông', en: 'Authentic Shiatsu', fr: 'Shiatsu Authentique', cn: '正宗指压', ar: 'شياتسو أصيل' },
      desc: { vi: 'Kỹ thuật viên đào tạo bài bản từ Nhật Bản với chứng chỉ JSA.', en: 'Therapists trained in Japan with JSA certification.', fr: 'Thérapeutes formés au Japon avec certification JSA.', cn: '在日本受训并获JSA认证的治疗师。', ar: 'معالجون مدربون في اليابان مع شهادة JSA.' },
    },
    {
      icon: 'solar:sun-bold-duotone',
      title: { vi: 'Nghi Thức Mùa', en: 'Seasonal Rituals', fr: 'Rituels Saison', cn: '季节仪式', ar: 'طقوس موسمية' },
      desc: { vi: 'Trải nghiệm onsen theo bốn mùa: Haru, Natsu, Aki, Fuyu.', en: 'Experience onsen through four seasons: Haru, Natsu, Aki, Fuyu.', fr: 'Vivez l\'onsen à travers les quatre saisons: Haru, Natsu, Aki, Fuyu.', cn: '四季温泉体验：春、夏、秋、冬。', ar: 'تجربة الأونسن عبر الفصول الأربعة: هارو، ناتسو، أكي، فويو.' },
    },
    {
      icon: 'solar:heart-bold-duotone',
      title: { vi: 'Omotenashi', en: 'Omotenashi', fr: 'Omotenashi', cn: '日式款待', ar: 'أوموتيناشي' },
      desc: { vi: 'Phục vụ tận tâm, chu đáo — không gian nghỉ dưỡng như Ryokan Nhật.', en: 'Wholehearted hospitality — a Ryokan-like retreat experience.', fr: 'Hospitalité sincère — une expérience de retraite type Ryokan.', cn: '全心全意的待客之道——如日式旅馆般的休憩体验。', ar: 'ضيافة قلبية — تجربة استراحة على طراز الريوكان.' },
    },
  ],
  stats: [
    { icon: 'solar:users-group-rounded-bold-duotone', value: '25K+', label: { vi: 'Khách hàng', en: 'Guests', fr: 'Clients', cn: '客人', ar: 'ضيوف' } },
    { icon: 'solar:water-bold-duotone', value: '42°C', label: { vi: 'Nước onsen', en: 'Onsen water', fr: 'Eau onsen', cn: '温泉水', ar: 'مياه أونسن' } },
    { icon: 'solar:home-bold-duotone', value: '5', label: { vi: 'Chi nhánh', en: 'Branches', fr: 'Succursales', cn: '分店', ar: 'فروع' } },
    { icon: 'solar:star-bold-duotone', value: '4.9', label: { vi: 'Đánh giá', en: 'Rating', fr: 'Note', cn: '评分', ar: 'التقييم' } },
  ],
};

// ----------------------------------------------------------------------
// SERVICES
// ----------------------------------------------------------------------

export const spa8ServiceCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tout', cn: '全部', ar: 'الكل' } },
  { id: 'onsen', label: { vi: 'Onsen', en: 'Onsen', fr: 'Onsen', cn: '温泉', ar: 'أونسن' } },
  { id: 'shiatsu', label: { vi: 'Shiatsu', en: 'Shiatsu', fr: 'Shiatsu', cn: '指压', ar: 'شياتسو' } },
  { id: 'facial', label: { vi: 'Chăm sóc da', en: 'Facial', fr: 'Soin visage', cn: '面部护理', ar: 'العناية بالبشرة' } },
  { id: 'ritual', label: { vi: 'Nghi thức', en: 'Ritual', fr: 'Rituel', cn: '仪式', ar: 'طقوس' } },
];

export const spa8Services = [
  {
    id: 's1',
    slug: 'onsen-private',
    category: 'onsen',
    name: { vi: 'Onsen Riêng Tư', en: 'Private Onsen', fr: 'Onsen Privé', cn: '私人温泉', ar: 'أونسن خاص' },
    shortDesc: { vi: 'Bể onsen riêng 42°C với muối tắm hương liệu.', en: 'Private 42°C onsen with aromatherapy bath salts.', fr: 'Onsen privé à 42°C avec sels de bain aromathérapie.', cn: '42°C私人温泉配芳香浴盐。', ar: 'أونسن خاص بدرجة 42°م مع أملاح استحمام عطرية.' },
    duration: { vi: '45 phút', en: '45 min', fr: '45 min', cn: '45 分钟', ar: '45 دقيقة' },
    price: 850000,
    icon: 'solar:water-bold-duotone',
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  },
  {
    id: 's2',
    slug: 'family-onsen',
    category: 'onsen',
    name: { vi: 'Onsen Gia Đình', en: 'Family Onsen', fr: 'Onsen Familial', cn: '家庭温泉', ar: 'أونسن عائلي' },
    shortDesc: { vi: 'Bể lớn có vườn Nhật, phù hợp 3–4 người.', en: 'Large Japanese garden pool for 3–4 guests.', fr: 'Grand bassin jardin japonais pour 3–4 personnes.', cn: '带日式庭园的大池，适合3-4人。', ar: 'حوض كبير بحديقة يابانية لـ 3-4 ضيوف.' },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: 1600000,
    icon: 'solar:home-bold-duotone',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80',
  },
  {
    id: 's3',
    slug: 'shiatsu-classic',
    category: 'shiatsu',
    name: { vi: 'Shiatsu Cổ Điển', en: 'Classic Shiatsu', fr: 'Shiatsu Classique', cn: '经典指压', ar: 'شياتسو كلاسيكي' },
    shortDesc: { vi: 'Bấm huyệt терап pháp Nhật Bản truyền thống.', en: 'Traditional Japanese acupressure therapy.', fr: 'Thérapie d\'acupression japonaise traditionnelle.', cn: '传统日式指压疗法。', ar: 'علاج الضغط بالإبر الياباني التقليدي.' },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: 780000,
    icon: 'solar:hand-stars-bold-duotone',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
  },
  {
    id: 's4',
    slug: 'head-spa',
    category: 'shiatsu',
    name: { vi: 'Head Spa Nhật', en: 'Japanese Head Spa', fr: 'Head Spa Japonais', cn: '日式头部SPA', ar: 'سبا الرأس الياباني' },
    shortDesc: { vi: 'Gội đầu护理 scalp với massage đầu chuyên sâu.', en: 'Scalp care with deep head massage.', fr: 'Soin du cuir chevelu avec massage crânien profond.', cn: '头皮护理配深层头部按摩。', ar: 'العناية بفروة الرأس مع تدليك عميق للرأس.' },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: 680000,
    icon: 'solar:face-scan-circle-bold-duotone',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  },
  {
    id: 's5',
    slug: 'haru-ritual',
    category: 'ritual',
    name: { vi: 'Haru 春', en: 'Haru Spring Ritual', fr: 'Rituel Haru', cn: '春之仪式', ar: 'طقوس هارو' },
    shortDesc: { vi: 'Hoa anh đào & matcha — onsen mùa xuân Kyoto.', en: 'Cherry blossom & matcha — Kyoto spring onsen.', fr: 'Fleur de cerisier & matcha — onsen printanier de Kyoto.', cn: '樱花与抹茶——京都春日温泉。', ar: 'زهر الكرز والماتشا — أونسن ربيع كيوتو.' },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    price: 1200000,
    icon: 'solar:leaf-bold-duotone',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
  },
  {
    id: 's6',
    slug: 'fuyu-ritual',
    category: 'ritual',
    name: { vi: 'Fuyu 冬', en: 'Fuyu Winter Ritual', fr: 'Rituel Fuyu', cn: '冬之仪式', ar: 'طقوس فويو' },
    shortDesc: { vi: 'Yuzu onsen & massage đá ngọc — nghi thức đông đặc biệt.', en: 'Yuzu onsen & jade stone massage — special winter ritual.', fr: 'Onsen yuzu & massage pierre de jade — rituel hivernal spécial.', cn: '柚子温泉与玉石按摩——特别冬季仪式。', ar: 'يوزو أونسن وتدليك حجر اليشم — طقوس شتوية خاصة.' },
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    price: 1800000,
    icon: 'solar:snowflake-bold-duotone',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  },
];

// ----------------------------------------------------------------------
// TRAINING
// ----------------------------------------------------------------------

export const spa8TrainingPrograms = [
  {
    id: 't1',
    title: { vi: 'Shiatsu Cơ Bản', en: 'Basic Shiatsu', fr: 'Shiatsu Basique', cn: '基础指压', ar: 'شياتسو أساسي' },
    description: { vi: 'Khóa đào tạo shiatsu 4 tuần dành cho người mới.', en: '4-week shiatsu training for beginners.', fr: 'Formation shiatsu de 4 semaines pour débutants.', cn: '针对初学者的4周指压培训。', ar: 'تدريب شياتسو لمدة 4 أسابيع للمبتدئين.' },
    level: { vi: 'Cơ bản', en: 'Basic', fr: 'Basique', cn: '基础', ar: 'أساسي' },
    duration: { vi: '4 tuần', en: '4 weeks', fr: '4 semaines', cn: '4 周', ar: '4 أسابيع' },
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
  },
  {
    id: 't2',
    title: { vi: 'Onsen Therapist', en: 'Onsen Therapist', fr: 'Thérapeute Onsen', cn: '温泉理疗师', ar: 'معالج أونسن' },
    description: { vi: 'Chuyên gia quản lý bể onsen và liệu pháp khoáng.', en: 'Expert in onsen pool management and mineral therapy.', fr: 'Expert en gestion de bassins onsen et thérapie minérale.', cn: '温泉池管理与矿物疗法专家。', ar: 'خبير في إدارة أحواض الأونسن والعلاج المعدني.' },
    level: { vi: 'Trung cấp', en: 'Intermediate', fr: 'Intermédiaire', cn: '中级', ar: 'متوسط' },
    duration: { vi: '6 tuần', en: '6 weeks', fr: '6 semaines', cn: '6 周', ar: '6 أسابيع' },
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  },
  {
    id: 't3',
    title: { vi: 'Mushin Meditation', en: 'Mushin Meditation', fr: 'Méditation Mushin', cn: '无心冥想', ar: 'تأمل موشين' },
    description: { vi: 'Thiền định Nhật Bản và nghệ thuật chado trà đạo.', en: 'Japanese meditation and the art of chado tea ceremony.', fr: 'Méditation japonaise et l\'art de la cérémonie du thé chado.', cn: '日本冥想与茶道艺术。', ar: 'التأمل الياباني وفن حفل الشاي تشادو.' },
    level: { vi: 'Nâng cao', en: 'Advanced', fr: 'Avancé', cn: '高级', ar: 'متقدم' },
    duration: { vi: '8 tuần', en: '8 weeks', fr: '8 semaines', cn: '8 周', ar: '8 أسابيع' },
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
  },
];

export const spa8Instructors = [
  {
    name: 'Tanaka Yuki',
    title: { vi: 'Chuyên gia Shiatsu', en: 'Shiatsu Master', fr: 'Maître Shiatsu', cn: '指压大师', ar: 'أستاذ شياتسو' },
    bio: { vi: '20 năm kinh nghiệm, chứng chỉ JSA Tokyo.', en: '20 years experience, JSA Tokyo certified.', fr: '20 ans d\'expérience, certifié JSA Tokyo.', cn: '20年经验，东京JSA认证。', ar: '20 عامًا من الخبرة، معتمد من JSA طوكيو.' },
    avatar: 'https://i.pravatar.cc/300?img=33',
  },
  {
    name: 'Nguyễn Thị Lan',
    title: { vi: 'Chuyên gia Onsen', en: 'Onsen Specialist', fr: 'Spécialiste Onsen', cn: '温泉专家', ar: 'أخصائي أونسن' },
    bio: { vi: 'Đào tạo tại Beppu Onsen, Nhật Bản.', en: 'Trained at Beppu Onsen, Japan.', fr: 'Formé à Beppu Onsen, Japon.', cn: '在日本别府温泉受训。', ar: 'مدرب في بيبو أونسن، اليابان.' },
    avatar: 'https://i.pravatar.cc/300?img=45',
  },
  {
    name: 'Yamada Kenji',
    title: { vi: 'Thiền sư', en: 'Meditation Teacher', fr: 'Professeur de Méditation', cn: '冥想导师', ar: 'معلم التأمل' },
    bio: { vi: '15 năm thực hành thiền Zen và trà đạo.', en: '15 years practicing Zen meditation and chado.', fr: '15 ans de pratique de méditation Zen et chado.', cn: '15年禅修与茶道实践。', ar: '15 عامًا من ممارسة تأمل زن وتشادو.' },
    avatar: 'https://i.pravatar.cc/300?img=68',
  },
];

// ----------------------------------------------------------------------
// BLOG
// ----------------------------------------------------------------------

export const spa8BlogCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tout', cn: '全部', ar: 'الكل' } },
  { id: 'onsen', label: { vi: 'Onsen', en: 'Onsen', fr: 'Onsen', cn: '温泉', ar: 'أونسن' } },
  { id: 'wellness', label: { vi: 'Sức khỏe', en: 'Wellness', fr: 'Bien-être', cn: '健康', ar: 'العافية' } },
  { id: 'culture', label: { vi: 'Văn hóa', en: 'Culture', fr: 'Culture', cn: '文化', ar: 'الثقافة' } },
];

export const spa8BlogPosts = [
  {
    id: 'b1',
    slug: 'loi-ich-cua-onsen-nhat-ban',
    title: { vi: 'Lợi ích của Onsen Nhật Bản', en: 'Benefits of Japanese Onsen', fr: 'Bienfaits de l\'Onsen Japonais', cn: '日本温泉的益处', ar: 'فوائد أونسن الياباني' },
    excerpt: { vi: 'Khám phá những lợi ích sức khỏe từ nước khoáng nóng thiên nhiên.', en: 'Discover health benefits from natural hot mineral water.', fr: 'Découvrez les bienfaits pour la santé de l\'eau thermale naturelle.', cn: '探索天然温泉水的健康益处。', ar: 'اكتشف الفوائد الصحية لمياه الينابيع الحارة الطبيعية.' },
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
    category: { vi: 'Onsen', en: 'Onsen', fr: 'Onsen', cn: '温泉', ar: 'أونسن' },
    author: 'Tanaka Yuki',
    date: '15/05/2026',
    readTime: { vi: '6 phút', en: '6 min', fr: '6 min', cn: '6 分钟', ar: '6 دقائق' },
  },
  {
    id: 'b2',
    slug: 'shiat-su-kien-thuc-co-ban',
    title: { vi: 'Shiatsu: Kiến thức cơ bản', en: 'Shiatsu: Basic Knowledge', fr: 'Shiatsu: Connaissances de Base', cn: '指压：基础知识', ar: 'شياتسو: المعرفة الأساسية' },
    excerpt: { vi: 'Hiểu đúng về kỹ thuật bấm huyệt truyền thống Nhật Bản.', en: 'Understanding traditional Japanese acupressure technique.', fr: 'Comprendre la technique traditionnelle d\'acupression japonaise.', cn: '了解传统日式指压技术。', ar: 'فهم تقنية الضغط بالإبر اليابانية التقليدية.' },
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
    category: { vi: 'Sức khỏe', en: 'Wellness', fr: 'Bien-être', cn: '健康', ar: 'العافية' },
    author: 'Nguyễn Thị Lan',
    date: '02/06/2026',
    readTime: { vi: '8 phút', en: '8 min', fr: '8 min', cn: '8 分钟', ar: '8 دقائق' },
  },
  {
    id: 'b3',
    slug: 'trung-thu-tai-amaya-onsen',
    title: { vi: 'Trung thu tại Amaya Onsen', en: 'Autumn Moon at Amaya Onsen', fr: 'Lune d\'Automne à Amaya Onsen', cn: 'Amaya温泉的中秋', ar: 'قمر الخريف في أمايا أونسن' },
    excerpt: { vi: 'Trải nghiệm tsukimi — ngắm trăng thu bên bể onsen.', en: 'Experience tsukimi — moon viewing by the onsen.', fr: 'Vivez le tsukimi — contemplation de la lune près de l\'onsen.', cn: '体验月见——在温泉边赏月。', ar: 'تجربة تسوكيمي — مشاهدة القمر بجانب الأونسن.' },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
    category: { vi: 'Văn hóa', en: 'Culture', fr: 'Culture', cn: '文化', ar: 'الثقافة' },
    author: 'Yamada Kenji',
    date: '20/09/2026',
    readTime: { vi: '5 phút', en: '5 min', fr: '5 min', cn: '5 分钟', ar: '5 دقائق' },
  },
];

// ----------------------------------------------------------------------
// CAREERS
// ----------------------------------------------------------------------

export const spa8Careers = [
  {
    id: 'c1',
    title: { vi: 'KTV Shiatsu', en: 'Shiatsu Therapist', fr: 'Thérapeute Shiatsu', cn: '指压理疗师', ar: 'معالج شياتسو' },
    department: { vi: 'Spa', en: 'Spa', fr: 'Spa', cn: '水疗', ar: 'سبا' },
    location: { vi: 'TP.HCM', en: 'Ho Chi Minh City', fr: 'Hô Chi Minh-Ville', cn: '胡志明市', ar: 'مدينة هوشي منه' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
  },
  {
    id: 'c2',
    title: { vi: 'Quản lý Onsen', en: 'Onsen Manager', fr: 'Gestionnaire Onsen', cn: '温泉经理', ar: 'مدير أونسن' },
    department: { vi: 'Vận hành', en: 'Operations', fr: 'Exploitation', cn: '运营', ar: 'العمليات' },
    location: { vi: 'Hà Nội', en: 'Hanoi', fr: 'Hanoï', cn: '河内', ar: 'هانوي' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
  },
  {
    id: 'c3',
    title: { vi: 'Lễ tân Ryokan', en: 'Ryokan Receptionist', fr: 'Réceptionniste Ryokan', cn: '日式旅馆前台', ar: 'موظف استقبال الريوكان' },
    department: { vi: 'Dịch vụ khách hàng', en: 'Guest Services', fr: 'Services aux Clients', cn: '客户服务', ar: 'خدمة الضيوف' },
    location: { vi: 'Đà Nẵng', en: 'Da Nang', fr: 'Da Nang', cn: '岘港', ar: 'دانانغ' },
    type: { vi: 'Bán thời gian', en: 'Part-time', fr: 'Temps partiel', cn: '兼职', ar: 'دوام جزئي' },
  },
];

export const spa8CareerBenefits = [
  { icon: 'solar:wallet-money-bold-duotone', label: { vi: 'Lương cạnh tranh', en: 'Competitive salary', fr: 'Salaire compétitif', cn: '有竞争力的薪资', ar: 'راتب تنافسي' } },
  { icon: 'solar:airplane-bold-duotone', label: { vi: 'Du lịch Nhật Bản', en: 'Japan trips', fr: 'Voyages au Japon', cn: '日本旅行', ar: 'رحلات اليابان' } },
  { icon: 'solar:book-bookmark-bold-duotone', label: { vi: 'Đào tạo chuyên sâu', en: 'Intensive training', fr: 'Formation intensive', cn: '深度培训', ar: 'تدريب مكثف' } },
  { icon: 'solar:cup-star-bold-duotone', label: { vi: 'Thưởng hiệu suất', en: 'Performance bonus', fr: 'Prime de performance', cn: '绩效奖金', ar: 'مكافأة الأداء' } },
  { icon: 'solar:health-bold-duotone', label: { vi: 'Bảo hiểm sức khỏe', en: 'Health insurance', fr: 'Assurance santé', cn: '健康保险', ar: 'تأمين صحي' } },
  { icon: 'solar:leaf-bold-duotone', label: { vi: 'Giảm giá dịch vụ', en: 'Service discount', fr: 'Réduction services', cn: '服务折扣', ar: 'خصم الخدمات' } },
];

// ----------------------------------------------------------------------
// CONTACT
// ----------------------------------------------------------------------

export const spa8ContactInfo = {
  address: {
    vi: '188 Lê Lợi, Quận 1, TP.HCM',
    en: '188 Le Loi, District 1, HCMC',
    fr: '188 Le Loi, District 1, HCMC',
    cn: '胡志明市第一区黎利街188号',
    ar: '188 لو لو، الحي 1، مدينة هوشي منه',
  },
  phone: '1900 8888',
  email: 'onsen@amaya.vn',
  hours: {
    vi: '10:00 – 23:00 mỗi ngày',
    en: '10:00 AM – 11:00 PM daily',
    fr: '10h00 – 23h00 tous les jours',
    cn: '每天 10:00 – 23:00',
    ar: '10:00 – 23:00 يوميًا',
  },
};

// ----------------------------------------------------------------------
// BRANCHES
// ----------------------------------------------------------------------

export const spa8Branches = [
  {
    id: 'br1',
    name: 'Amaya Le Loi',
    address: {
      vi: '188 Lê Lợi, Quận 1, TP.HCM',
      en: '188 Le Loi, District 1, HCMC',
      fr: '188 Le Loi, District 1, HCMC',
      cn: '胡志明市第一区黎利街188号',
      ar: '188 لو لو، الحي 1، مدينة هوشي منه',
    },
    phone: '1900 8888',
    hours: '10:00 – 23:00',
    features: ['Onsen ngoài trời', 'Phòng thiền', 'Trà đạo'],
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  },
  {
    id: 'br2',
    name: 'Amaya Tay Ho',
    address: {
      vi: '99 Xuân Diệu, Tây Hồ, Hà Nội',
      en: '99 Xuan Dieu, Tay Ho, Hanoi',
      fr: '99 Xuan Dieu, Tay Ho, Hanoï',
      cn: '河内西湖区春条街99号',
      ar: '99 شوان دو، تاي هو، هانوي',
    },
    phone: '024 3719 8899',
    hours: '10:00 – 22:00',
    features: ['Bể gia đình', 'Vườn Nhật', 'Shiatsu'],
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80',
  },
  {
    id: 'br3',
    name: 'Amaya Da Nang',
    address: {
      vi: '88 Võ Nguyên Giáp, Sơn Trà, Đà Nẵng',
      en: '88 Vo Nguyen Giap, Son Tra, Da Nang',
      fr: '88 Vo Nguyen Giap, Son Tra, Da Nang',
      cn: '岘港山茶郡武元甲街88号',
      ar: '88 فو نويين جياب، سون ترا، دانانغ',
    },
    phone: '0236 3654 889',
    hours: '09:00 – 23:00',
    features: ['Onsen biển', 'Liệu trình mùa', 'Yoga'],
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
  },
  {
    id: 'br4',
    name: 'Amaya Nha Trang',
    address: {
      vi: '12 Trần Phú, Lộc Thọ, Nha Trang',
      en: '12 Tran Phu, Loc Tho, Nha Trang',
      fr: '12 Tran Phu, Loc Tho, Nha Trang',
      cn: '芽庄陈富街12号',
      ar: '12 تران فو، لوك ثو، نها ترانغ',
    },
    phone: '0258 3556 889',
    hours: '10:00 – 22:00',
    features: ['Onsen view biển', 'Nghi thức Fuyu', 'Head Spa'],
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=80',
  },
  {
    id: 'br5',
    name: 'Amaya Phu Quoc',
    address: {
      vi: '88 Trường Sa, Phú Quốc, Kiên Giang',
      en: '88 Truong Sa, Phu Quoc, Kien Giang',
      fr: '88 Truong Sa, Phu Quoc, Kien Giang',
      cn: '坚江省富国岛长沙街88号',
      ar: '88 ترونغ سا، فو كوك، كيين جيانغ',
    },
    phone: '0297 3654 889',
    hours: '09:00 – 23:00',
    features: ['Resort onsen', 'Bể vô cực', 'Thiền bình minh'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  },
];

// ----------------------------------------------------------------------
// GALLERY
// ----------------------------------------------------------------------

export const spa8Gallery = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80', caption: { vi: 'Bể onsen ngoài trời', en: 'Outdoor onsen', fr: 'Onsen extérieur', cn: '露天温泉', ar: 'أونسن خارجي' } },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80', caption: { vi: 'Vườn thiền', en: 'Zen garden', fr: 'Jardin zen', cn: '禅园', ar: 'حديقة زن' } },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80', caption: { vi: 'Hoa anh đào', en: 'Cherry blossoms', fr: 'Fleurs de cerisier', cn: '樱花', ar: 'زهر الكرز' } },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80', caption: { vi: 'Phòng nghỉ Ryokan', en: 'Ryokan lounge', fr: 'Salon Ryokan', cn: '日式旅馆休息室', ar: 'صالة الريوكان' } },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=80', caption: { vi: 'Nghi thức trà', en: 'Tea ceremony', fr: 'Cérémonie du thé', cn: '茶道', ar: 'حفل الشاي' } },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80', caption: { vi: 'Phòng shiatsu', en: 'Shiatsu room', fr: 'Salle shiatsu', cn: '指压房', ar: 'غرفة شياتسو' } },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80', caption: { vi: 'Lá phong đỏ', en: 'Red maple', fr: 'Érable rouge', cn: '红枫', ar: 'قيقب أحمر' } },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80', caption: { vi: 'Thiền định', en: 'Meditation', fr: 'Méditation', cn: '冥想', ar: 'تأمل' } },
];

// ----------------------------------------------------------------------
// FAQ
// ----------------------------------------------------------------------

export const spa8FaqCategories = [
  { id: 'all', label: { vi: 'Tất cả', en: 'All', fr: 'Tout', cn: '全部', ar: 'الكل' } },
  { id: 'onsen', label: { vi: 'Onsen', en: 'Onsen', fr: 'Onsen', cn: '温泉', ar: 'أونسن' } },
  { id: 'booking', label: { vi: 'Đặt lịch', en: 'Booking', fr: 'Réservation', cn: '预约', ar: 'الحجز' } },
  { id: 'policy', label: { vi: 'Chính sách', en: 'Policy', fr: 'Politique', cn: '政策', ar: 'السياسة' } },
];

export const spa8Faqs = [
  {
    id: 'f1',
    category: 'onsen',
    question: { vi: 'Nước onsen có tự nhiên không?', en: 'Is the onsen water natural?', fr: 'L\'eau de l\'onsen est-elle naturelle?', cn: '温泉水是天然的吗？', ar: 'هل مياه الأونسن طبيعية؟' },
    answer: { vi: 'Có, chúng tôi sử dụng nước khoáng nóng thiên nhiên 42°C giàu khoáng chất từ suối sâu 500m.', en: 'Yes, we use natural 42°C mineral-rich hot spring water from 500m deep sources.', fr: 'Oui, nous utilisons de l\'eau thermale naturelle à 42°C riche en minéraux de sources profondes de 500m.', cn: '是的，我们使用来自500米深水源的42°C天然富矿温泉水。', ar: 'نعم، نستخدم مياه حارة معدنية طبيعية بدرجة 42°م من مصادر عميقة 500 متر.' },
  },
  {
    id: 'f2',
    category: 'onsen',
    question: { vi: 'Tôi có thai có thể tắm onsen được không?', en: 'Can pregnant women use the onsen?', fr: 'Les femmes enceintes peuvent-elles utiliser l\'onsen?', cn: '孕妇可以泡温泉吗？', ar: 'هل يمكن للحوامل استخدام الأونسن؟' },
    answer: { vi: 'Phụ nữ mang thai dưới 3 tháng và trên 7 tháng không nên tắm onsen. Vui lòng tham khảo ý kiến bác sĩ.', en: 'Pregnant women under 3 months and over 7 months should not use onsen. Please consult your doctor.', fr: 'Les femmes enceintes de moins de 3 mois et plus de 7 mois ne devraient pas utiliser l\'onsen. Veuillez consulter votre médecin.', cn: '怀孕3个月以下和7个月以上的孕妇不宜泡温泉。请咨询医生。', ar: 'الحوامل أقل من 3 أشهر وأكثر من 7 أشهر لا يجب عليهن استخدام الأونسن. يرجى استشارة طبيبك.' },
  },
  {
    id: 'f3',
    category: 'booking',
    question: { vi: 'Tôi cần đặt lịch trước bao lâu?', en: 'How far in advance should I book?', fr: 'Combien de temps à l\'avance dois-je réserver?', cn: '需要提前多久预约？', ar: 'كم من الوقت مسبقًا يجب أن أحجز؟' },
    answer: { vi: 'Nên đặt lịch trước ít nhất 1 ngày. Cuối tuần và ngày lễ nên đặt trước 2–3 ngày.', en: 'Booking at least 1 day in advance is recommended. Weekends and holidays should be 2–3 days ahead.', fr: 'Il est recommandé de réserver au moins 1 jour à l\'avance. Les week-ends et jours fériés devraient être 2–3 jours à l\'avance.', cn: '建议至少提前1天预约。周末和节假日应提前2-3天。', ar: 'يُنصح بالحجز قبل يوم واحد على الأقل. عطلات نهاية الأسبوع والعطلات يجب أن تكون قبل 2-3 أيام.' },
  },
  {
    id: 'f4',
    category: 'policy',
    question: { vi: 'Có chính sách hoàn tiền không?', en: 'Is there a refund policy?', fr: 'Y a-t-il une politique de remboursement?', cn: '有退款政策吗？', ar: 'هل هناك سياسة استرداد الأموال؟' },
    answer: { vi: 'Hoàn 100% nếu hủy trước 24 giờ. Hủy trong vòng 24 giờ hoàn 50%.', en: '100% refund if cancelled 24 hours before. 50% refund if cancelled within 24 hours.', fr: 'Remboursement à 100% si annulé 24 heures avant. 50% si annulé dans les 24 heures.', cn: '提前24小时取消可全额退款。24小时内取消退款50%。', ar: 'استرداد 100% إذا ألغيت قبل 24 ساعة. 50% إذا ألغيت خلال 24 ساعة.' },
  },
  {
    id: 'f5',
    category: 'onsen',
    question: { vi: 'Cần chuẩn bị gì khi đến onsen?', en: 'What should I bring to the onsen?', fr: 'Que dois-je apporter à l\'onsen?', cn: '泡温泉需要带什么？', ar: 'ماذا يجب أن أحضر للأونسن؟' },
    answer: { vi: 'Amaya cung cấp yukata, khăn tắm và tiện nghi cơ bản. Bạn chỉ cần mang theo đồ bơi nếu muốn.', en: 'Amaya provides yukata, towels and basic amenities. You only need swimwear if preferred.', fr: 'Amaya fournit yukata, serviettes et commodités de base. Vous n\'avez besoin que d\'un maillot de bain si vous préférez.', cn: 'Amaya提供浴衣、毛巾和基本便利设施。您只需带泳衣（如果需要）。', ar: 'توفر أمايا اليوكاتا والمناشف والتسهيلات الأساسية. تحتاج فقط إلى ملابس السباحة إذا أردت.' },
  },
];

// ----------------------------------------------------------------------
// PACKAGES
// ----------------------------------------------------------------------

export const spa8Packages = [
  {
    id: 'p1',
    name: { vi: 'Gói Onsen Cơ Bản', en: 'Basic Onsen', fr: 'Onsen Basique', cn: '基础温泉套餐', ar: 'أونسن أساسي' },
    description: { vi: 'Trải nghiệm onsen cơ bản với shiatsu.', en: 'Basic onsen experience with shiatsu.', fr: 'Expérience onsen basique avec shiatsu.', cn: '基础温泉体验配指压。', ar: 'تجربة أونسن أساسية مع شياتسو.' },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    originalPrice: 1500000,
    price: 1200000,
    featured: false,
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  },
  {
    id: 'p2',
    name: { vi: 'Gói Ryokan', en: 'Ryokan Package', fr: 'Forfait Ryokan', cn: '日式旅馆套餐', ar: 'باقة الريوكان' },
    description: { vi: 'Trải nghiệm ryokan trọn vẹn: onsen + shiatsu + trà đạo.', en: 'Complete ryokan experience: onsen + shiatsu + tea ceremony.', fr: 'Expérience ryokan complète: onsen + shiatsu + cérémonie du thé.', cn: '完整日式旅馆体验：温泉+指压+茶道。', ar: 'تجربة ريوكان كاملة: أونسن + شياتسو + حفل الشاي.' },
    duration: { vi: '3 giờ', en: '3 hours', fr: '3 heures', cn: '3 小时', ar: '3 ساعات' },
    originalPrice: 2800000,
    price: 2200000,
    featured: true,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80',
  },
  {
    id: 'p3',
    name: { vi: 'Gói Nghi Thức Mùa', en: 'Seasonal Ritual', fr: 'Rituel Saison', cn: '季节仪式套餐', ar: 'طقوس موسمية' },
    description: { vi: 'Liệu trình theo mùa Haru/Natsu/Aki/Fuyu.', en: 'Seasonal ritual: Haru/Natsu/Aki/Fuyu.', fr: 'Rituel saisonnier: Haru/Natsu/Aki/Fuyu.', cn: '季节仪式：春夏秋冬。', ar: 'طقوس موسمية: هارو/ناتسو/أكي/فويو.' },
    duration: { vi: '2 giờ', en: '2 hours', fr: '2 heures', cn: '2 小时', ar: 'ساعتان' },
    originalPrice: 2200000,
    price: 1800000,
    featured: false,
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
  },
];

// ----------------------------------------------------------------------
// BEFORE/AFTER
// ----------------------------------------------------------------------

export const spa8BeforeAfters = [
  {
    id: 'ba1',
    treatment: { vi: 'Shiatsu Cổ Điển', en: 'Classic Shiatsu', fr: 'Shiatsu Classique', cn: '经典指压', ar: 'شياتسو كلاسيكي' },
    before: 'https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    testimonial: { vi: 'Giảm đau cổ vai gáy rõ rệt sau 5 buổi.', en: 'Neck and shoulder pain significantly reduced after 5 sessions.', fr: 'Douleur au cou et aux épaules considérablement réduite après 5 séances.', cn: '5次疗程后颈肩疼痛明显减轻。', ar: 'انخفاض كبير في ألم الرقبة والكتف بعد 5 جلسات.' },
    client: 'Minh Anh',
  },
  {
    id: 'ba2',
    treatment: { vi: 'Head Spa', en: 'Head Spa', fr: 'Head Spa', cn: '头部SPA', ar: 'سبا الرأس' },
    before: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    testimonial: { vi: 'Da đầu sạch, tóc mềm mại hơn hẳn.', en: 'Scalp is clean, hair is much softer.', fr: 'Le cuir chevelu est propre, les cheveux sont beaucoup plus doux.', cn: '头皮清爽，头发柔软许多。', ar: 'فروة الرأس نظيفة، الشعر أكثر نعومة.' },
    client: 'Thu Hà',
  },
  {
    id: 'ba3',
    treatment: { vi: 'Onsen Detox', en: 'Onsen Detox', fr: 'Detox Onsen', cn: '温泉排毒', ar: 'ديتوكس أونسن' },
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1517363898874-737b62a7db91?w=600&q=80',
    testimonial: { vi: 'Cảm giác nhẹ nhõm, da sáng hơn sau 3 tuần.', en: 'Feeling lighter, skin brighter after 3 weeks.', fr: 'Sensation de légèreté, peau plus lumineuse après 3 semaines.', cn: '感觉轻松，3周后皮肤更明亮。', ar: 'شعور بالخفة، بشرة أكثر إشراقًا بعد 3 أسابيع.' },
    client: 'Hoàng Nam',
  },
];

// ----------------------------------------------------------------------
// PROMOTIONS
// ----------------------------------------------------------------------

export const spa8Promotions = [
  {
    id: 'pr1',
    title: { vi: 'Hanami Season 春', en: 'Hanami Season', fr: 'Saison Hanami', cn: '花见季', ar: 'موسم هانامي' },
    description: { vi: 'Giảm 20% cho nghi thức Haru trong tháng 3–4.', en: '20% off Haru ritual in March–April.', fr: '20% de réduction sur le rituel Haru en mars-avril.', cn: '3-4月春之仪式八折优惠。', ar: 'خصم 20% على طقوس هارو في مارس-أبريل.' },
    discount: 20,
    validUntil: '30/04/2026',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=900&q=80',
  },
  {
    id: 'pr2',
    title: { vi: 'Onsen Đôi', en: 'Couples Onsen', fr: 'Onsen Couple', cn: '双人温泉', ar: 'أونسن للأزواج' },
    description: { vi: 'Ưu đãi 25% khi đặt bể onsen cho 2 người.', en: '25% off when booking onsen for 2.', fr: '25% de réduction pour une réservation onsen pour 2.', cn: '双人温泉预约七五折优惠。', ar: 'خصم 25% عند حجز الأونسن لشخصين.' },
    discount: 25,
    validUntil: '31/12/2026',
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  },
  {
    id: 'pr3',
    title: { vi: 'New Year Osechi', en: 'New Year Osechi', fr: 'Nouvel An Osechi', cn: '新年御节', ar: 'أوسيتشا رأس السنة' },
    description: { vi: 'Gói trải nghiệm năm mới với trà đạo và wagashi.', en: 'New Year experience package with tea ceremony and wagashi.', fr: 'Forfait Nouvel An avec cérémonie du thé et wagashi.', cn: '新年体验套餐配茶道与和菓子。', ar: 'باقة تجربة رأس السنة مع حفل الشاي وواغاشي.' },
    discount: 15,
    validUntil: '15/02/2026',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  },
];

// ----------------------------------------------------------------------
// FEEDBACKS
// ----------------------------------------------------------------------

export const spa8Feedbacks = [
  {
    id: 'fb1',
    name: 'Minh Anh',
    treatment: 'Shiatsu Classic',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=11',
    comment: {
      vi: 'Không gian thiền tịnh, shiatsu rất đúng kỹ thuật. Cảm thấy như đang ở Nhật Bản.',
      en: 'Zen atmosphere, shiatsu technique is spot on. Felt like being in Japan.',
      fr: 'Atmosphère zen, technique shiatsu parfaite. On se croirait au Japon.',
      cn: '禅意空间，指压技术精准。感觉像在日本一样。',
      ar: 'جو زن، تقنية شياتسو ممتازة. شعرت كأنني في اليابان.',
    },
    date: '12/05/2026',
  },
  {
    id: 'fb2',
    name: 'Hoàng Nam',
    treatment: 'Fuyu Winter Ritual',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?img=23',
    comment: {
      vi: 'Nghi thức mùa đông thật đặc biệt. Yuzu onsen ấm áp, trà miso thơm ngon.',
      en: 'Winter ritual is truly special. Warm yuzu onsen, delicious miso tea.',
      fr: 'Le rituel hivernal est vraiment spécial. Onsen yuzu chaud, thé miso délicieux.',
      cn: '冬季仪式真的特别。柚子温泉温暖，味噌茶香醇。',
      ar: 'طقوس الشتاء مميزة حقًا. يوزو أونسن دافئ، شاي ميسو لذيذ.',
    },
    date: '02/06/2026',
  },
  {
    id: 'fb3',
    name: 'Thu Hà',
    treatment: 'Head Spa',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?img=32',
    comment: {
      vi: 'Head spa thư giãn tuyệt vời. Massage đầu rất chuyên nghiệp.',
      en: 'Wonderful relaxing head spa. Very professional head massage.',
      fr: 'Head spa relaxant merveilleux. Massage crânien très professionnel.',
      cn: '头部SPA放松绝佳。头部按摩很专业。',
      ar: 'سبا رأس مريح رائع. تدليك رأس محترف جدًا.',
    },
    date: '20/06/2026',
  },
];

// ----------------------------------------------------------------------
// OFFERS
// ----------------------------------------------------------------------

export const spa8Offers = [
  {
    id: 'o1',
    title: { vi: 'Ưu đãi khách mới', en: 'New Guest Offer', fr: 'Offre Nouveau Client', cn: '新客优惠', ar: 'عرض للضيوف الجدد' },
    benefits: [
      { vi: 'Giảm 20% lần đầu tiên', en: '20% off first visit', fr: '20% réduction première visite', cn: '首次八折', ar: 'خصم 20% للزيارة الأولى' },
      { vi: 'Miễn phí trà matcha', en: 'Free matcha tea', fr: 'Thé matcha gratuit', cn: '免费抹茶', ar: 'شاي ماتشا مجاني' },
    ],
    featured: false,
    originalPrice: 1000000,
    price: 800000,
    isCustom: false,
    image: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  },
  {
    id: 'o2',
    title: { vi: 'Gói Đôi Kokoro', en: 'Kokoro Couples', fr: 'Couple Kokoro', cn: '双人套餐', ar: 'باقة كوكورو للأزواج' },
    benefits: [
      { vi: 'Onsen riêng 2 người', en: 'Private onsen for 2', fr: 'Onsen privé pour 2', cn: '双人私人温泉', ar: 'أونسن خاص لشخصين' },
      { vi: 'Shiatsu đôi', en: 'Couples shiatsu', fr: 'Shiatsu en couple', cn: '双人指压', ar: 'شياتسو للأزواج' },
      { vi: 'Trà đạo trải nghiệm', en: 'Tea ceremony experience', fr: 'Expérience cérémonie du thé', cn: '茶道体验', ar: 'تجربة حفل الشاي' },
    ],
    featured: true,
    originalPrice: 3500000,
    price: 2800000,
    isCustom: false,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80',
  },
  {
    id: 'o3',
    title: { vi: 'Thành viên Zen', en: 'Zen Membership', fr: 'Adhésion Zen', cn: '禅会员', ar: 'عضوية زن' },
    benefits: [
      { vi: 'Giảm 15% mọi dịch vụ', en: '15% off all services', fr: '15% sur tous les services', cn: '所有服务八五折', ar: 'خصم 15% على جميع الخدمات' },
      { vi: 'Ưu tiên đặt lịch', en: 'Priority booking', fr: 'Réservation prioritaire', cn: '预约优先', ar: 'حجز أولوي' },
    ],
    featured: false,
    originalPrice: 0,
    price: 0,
    isCustom: true,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
  },
];

// ----------------------------------------------------------------------
// PARTNERS
// ----------------------------------------------------------------------

export const spa8Partners = [
  { id: 'pt1', name: 'Shiseido Spa', logo: 'https://i.pravatar.cc/80?img=1', description: { vi: 'Mỹ phẩm cao cấp Nhật Bản', en: 'Premium Japanese cosmetics', fr: 'Cosmétiques japonais premium', cn: '日本高端化妆品', ar: 'مستحضرات تجميل يابانية فاخرة' } },
  { id: 'pt2', name: 'JSA Japan', logo: 'https://i.pravatar.cc/80?img=2', description: { vi: 'Hiệp hội Shiatsu Nhật Bản', en: 'Japan Shiatsu Association', fr: 'Association Japonaise de Shiatsu', cn: '日本指压协会', ar: 'جمعية الشياتسو اليابانية' } },
  { id: 'pt3', name: 'Beppu Onsen', logo: 'https://i.pravatar.cc/80?img=3', description: { vi: 'Đào tạo onsen Beppu', en: 'Beppu onsen training', fr: 'Formation onsen Beppu', cn: '别府温泉培训', ar: 'تدريب أونسن بيبو' } },
  { id: 'pt4', name: 'Ippodo Tea', logo: 'https://i.pravatar.cc/80?img=4', description: { vi: 'Trà matcha cao cấp', en: 'Premium matcha tea', fr: 'Thé matcha premium', cn: '高级抹茶', ar: 'شاي ماتشا فاخر' } },
];

// ----------------------------------------------------------------------
// POLICIES
// ----------------------------------------------------------------------

export const spa8Policies = [
  {
    id: 'pol1',
    title: { vi: 'Chính sách đặt lịch', en: 'Booking Policy', fr: 'Politique de Réservation', cn: '预约政策', ar: 'سياسة الحجز' },
    content: { vi: 'Đặt lịch qua website hoặc hotline. Hủy miễn phí trước 24 giờ. Đến trước giờ hẹn 15 phút để thay yukata.', en: 'Book via website or hotline. Free cancellation 24 hours before. Arrive 15 minutes early to change into yukata.', fr: 'Réservez via le site ou la hotline. Annulation gratuite 24h avant. Arrivez 15 min en avance pour enfiler le yukata.', cn: '通过网站或热线预约。提前24小时免费取消。提前15分钟到达更换浴衣。', ar: 'احجز عبر الموقع أو الخط الساخن. إلغاء مجاني قبل 24 ساعة. احضر قبل 15 دقيقة لارتداء اليوكاتا.' },
  },
  {
    id: 'pol2',
    title: { vi: 'Quy định onsen', en: 'Onsen Rules', fr: 'Règles Onsen', cn: '温泉规定', ar: 'قواعد الأونسن' },
    content: { vi: 'Không mặc đồ bơi trong bể onsen truyền thống (separate gender). Tắm sạch trước khi vào bể. Không sử dụng xà phòng trong bể onsen.', en: 'No swimwear in traditional onsen (separate gender). Cleanse before entering. No soap in the onsen pool.', fr: 'Pas de maillot de bain dans l\'onsen traditionnel (genres séparés). Se laver avant d\'entrer. Pas de savon dans le bassin onsen.', cn: '传统温泉内禁止穿泳衣（男女分开）。入池前先冲洗。池内禁止使用肥皂。', ar: 'لا ملابس سباحة في الأونسن التقليدي (فصل الجنسين). اغتسل قبل الدخول. لا صابون في حوض الأونسن.' },
  },
  {
    id: 'pol3',
    title: { vi: 'Chính sách bảo mật', en: 'Privacy Policy', fr: 'Politique de Confidentialité', cn: '隐私政策', ar: 'سياسة الخصوصية' },
    content: { vi: 'Thông tin khách hàng được bảo mật tuyệt đối. Không chia sẻ với bên thứ ba.', en: 'Guest information is strictly confidential. Not shared with third parties.', fr: 'Les informations des clients sont strictement confidentielles. Non partagées avec des tiers.', cn: '客人信息严格保密。不与第三方分享。', ar: 'معلومات الضيف سرية تمامًا. لا تُشارك مع أطراف ثالثة.' },
  },
];
