export type Spa8Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export const SPA8_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
  spring: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80',
  summer: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
  autumn: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  winter: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  onsen: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1200&q=80',
};

export const SPA8_HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
    alt: 'Misty forest onsen',
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1920&q=80',
    alt: 'Hot spring bath',
  },
  {
    src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&q=80',
    alt: 'Spring blossoms',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
    alt: 'Winter zen',
  },
];

export const SPA8_SEASONS = [
  {
    kanji: '春',
    romaji: 'Haru',
    name: {
      vi: 'Liệu Trình Mùa Xuân',
      en: 'Spring Ritual',
      fr: 'Rituel de Printemps',
      cn: '春季疗程',
      ar: 'طقوس الربيع',
    },
    subtitle: {
      vi: 'Hoa Anh Đào & Trà Xanh',
      en: 'Cherry Blossom & Matcha',
      fr: 'Fleur de Cerisier & Matcha',
      cn: '樱花与抹茶',
      ar: 'زهر الكرز والماتشا',
    },
    description: {
      vi: 'Nước tắm pha chiết xuất hoa anh đào và bột matcha Uji tươi. Massage toàn thân với dầu hoa anh đào và đắp mặt nạ lá tía tô Nhật. Hương thơm nhẹ nhàng của mùa xuân Kyoto.',
      en: 'Bath infused with cherry blossom extract and fresh Uji matcha. Full-body massage with cherry blossom oil and Japanese perilla leaf mask. The delicate fragrance of Kyoto spring.',
      fr: 'Bain infusé à l’extrait de fleur de cerisier et au matcha Uji frais. Massage complet à l’huile de fleur de cerisier et masque aux feuilles de périlla japonaise. Le parfum délicat du printemps de Kyoto.',
      cn: '浴池注入樱花精华与新鲜宇治抹茶。以樱花油全身按摩，敷日本紫苏叶面膜。京都春日的清雅芬芳。',
      ar: 'حمام مُشبَع بخلاصة زهر الكرز وماتشا أوجي الطازج. تدليك كامل للجسم بزيت زهر الكرز وقناع أوراق الشيزو الياباني. عبير ربيع كيوتو الرقيق.',
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    price: {
      vi: '1.200.000₫',
      en: '1,200,000₫',
      fr: '1,200,000₫',
      cn: '1,200,000₫',
      ar: '1,200,000₫',
    },
    color: '#FFB7C5',
    darkColor: '#8B3A52',
    available: {
      vi: 'Tháng 2 – 4',
      en: 'February – April',
      fr: 'Février – Avril',
      cn: '2 月 – 4 月',
      ar: 'فبراير – أبريل',
    },
  },
  {
    kanji: '夏',
    romaji: 'Natsu',
    name: {
      vi: 'Liệu Trình Mùa Hè',
      en: 'Summer Ritual',
      fr: 'Rituel d’Été',
      cn: '夏季疗程',
      ar: 'طقوس الصيف',
    },
    subtitle: {
      vi: 'Yuzu & Bạc Hà Nhật',
      en: 'Yuzu & Japanese Peppermint',
      fr: 'Yuzu & Menthe Japonaise',
      cn: '柚子与日本薄荷',
      ar: 'اليوزو والنعناع الياباني',
    },
    description: {
      vi: 'Tắm lạnh Yuzu làm mát sâu từ bên trong, tiếp nối massage đá lạnh Onyx và dưỡng ẩm gel tảo biển mát lạnh. Tươi mới và sảng khoái như gió biển Okinawa tháng 7.',
      en: 'Cold Yuzu bath deeply cools from within, followed by Onyx stone massage and refreshing seaweed gel moisturiser. Fresh and invigorating as the Okinawa sea breeze in July.',
      fr: 'Le bain froid au yuzu rafraîchit profondément de l’intérieur, suivi d’un massage aux pierres d’onyx et d’un soin hydratant au gel d’algues rafraîchissant. Aussi frais et vivifiant que la brise marine d’Okinawa en juillet.',
      cn: '冷柚子浴由内而外深层降温，随后进行黑玛瑙石按摩，并涂抹清凉海藻凝胶保湿。如七月冲绳海风般清新提神。',
      ar: 'حمام اليوزو البارد يبرّد بعمق من الداخل، يتبعه تدليك بحجر الأونيكس وترطيب بجل الأعشاب البحرية المنعش. منعش وحيوي كنسيم بحر أوكيناوا في يوليو.',
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 分钟', ar: '75 دقيقة' },
    price: {
      vi: '1.050.000₫',
      en: '1,050,000₫',
      fr: '1,050,000₫',
      cn: '1,050,000₫',
      ar: '1,050,000₫',
    },
    color: '#B8D4F0',
    darkColor: '#1A4A7A',
    available: {
      vi: 'Tháng 6 – 8',
      en: 'June – August',
      fr: 'Juin – Août',
      cn: '6 月 – 8 月',
      ar: 'يونيو – أغسطس',
    },
  },
  {
    kanji: '秋',
    romaji: 'Aki',
    name: {
      vi: 'Liệu Trình Mùa Thu',
      en: 'Autumn Ritual',
      fr: 'Rituel d’Automne',
      cn: '秋季疗程',
      ar: 'طقوس الخريف',
    },
    subtitle: {
      vi: 'Quế & Gừng Nhật',
      en: 'Cinnamon & Japanese Ginger',
      fr: 'Cannelle & Gingembre Japonais',
      cn: '肉桂与日本生姜',
      ar: 'القرفة والزنجبيل الياباني',
    },
    description: {
      vi: 'Nước tắm ấm pha quế Ceylon, gừng tươi và lá phong đỏ Nhật Bản. Massage nóng với đá phong thạch trắng và dầu ủ quả hồng Nhật. Cảm giác ấm áp và phong phú của mùa Koyo.',
      en: 'Warm bath infused with Ceylon cinnamon, fresh ginger and Japanese red maple leaves. Hot massage with white agate stones and Japanese persimmon conditioning oil. The warmth and richness of Koyo season.',
      fr: 'Bain chaud infusé à la cannelle de Ceylan, au gingembre frais et aux feuilles d’érable rouge japonais. Massage chaud aux pierres d’agate blanche et à l’huile nourrissante de kaki japonais. La chaleur et la richesse de la saison Koyo.',
      cn: '温浴注入锡兰肉桂、新鲜生姜与日本红枫叶。以白玛瑙石与日本柿子滋养油进行热石按摩。红叶季的温暖与丰盈。',
      ar: 'حمام دافئ مُشبَع بقرفة سيلان والزنجبيل الطازج وأوراق القيقب الأحمر الياباني. تدليك ساخن بأحجار العقيق الأبيض وزيت الكاكي الياباني المغذّي. دفء وثراء موسم الكويو.',
    },
    duration: { vi: '95 phút', en: '95 min', fr: '95 min', cn: '95 分钟', ar: '95 دقيقة' },
    price: {
      vi: '1.350.000₫',
      en: '1,350,000₫',
      fr: '1,350,000₫',
      cn: '1,350,000₫',
      ar: '1,350,000₫',
    },
    color: '#F4A460',
    darkColor: '#7A3B0A',
    available: {
      vi: 'Tháng 9 – 11',
      en: 'September – November',
      fr: 'Septembre – Novembre',
      cn: '9 月 – 11 月',
      ar: 'سبتمبر – نوفمبر',
    },
  },
  {
    kanji: '冬',
    romaji: 'Fuyu',
    name: {
      vi: 'Liệu Trình Mùa Đông',
      en: 'Winter Ritual',
      fr: 'Rituel d’Hiver',
      cn: '冬季疗程',
      ar: 'طقوس الشتاء',
    },
    subtitle: {
      vi: 'Yuzu Onsen & Bích Ngọc',
      en: 'Yuzu Onsen & Jade Stone',
      fr: 'Yuzu Onsen & Pierre de Jade',
      cn: '柚子温泉与玉石',
      ar: 'يوزو أونسن وحجر اليشم',
    },
    description: {
      vi: 'Liệu trình onsen đặc biệt nhất trong năm — ngâm trong bể Yuzu Onsen 42°C trong 20 phút, sau đó massage đá bích ngọc ấm, kết thúc với trà miso và wagashi truyền thống bên bếp lò.',
      en: 'The most special onsen ritual of the year — soak in 42°C Yuzu Onsen for 20 minutes, followed by warm jade stone massage, concluding with miso tea and traditional wagashi beside the hearth.',
      fr: 'Le rituel onsen le plus spécial de l’année — immersion dans le Yuzu Onsen à 42°C pendant 20 minutes, suivie d’un massage aux pierres de jade chaudes, et conclue par un thé au miso et des wagashi traditionnels près de l’âtre.',
      cn: '一年中最特别的温泉疗程——在 42°C 的柚子温泉中浸泡 20 分钟，随后进行温热玉石按摩，最后在炉边享用味噌茶与传统和菓子。',
      ar: 'أكثر طقوس الأونسن تميزًا في العام — انغماس في يوزو أونسن بدرجة 42°م لمدة 20 دقيقة، يتبعه تدليك بأحجار اليشم الدافئة، ويُختتم بشاي الميسو والواغاشي التقليدي بجانب الموقد.',
    },
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    price: {
      vi: '1.800.000₫',
      en: '1,800,000₫',
      fr: '1,800,000₫',
      cn: '1,800,000₫',
      ar: '1,800,000₫',
    },
    color: '#A8C5E8',
    darkColor: '#1A2A4A',
    available: {
      vi: 'Tháng 12 – 2',
      en: 'December – February',
      fr: 'Décembre – Février',
      cn: '12 月 – 2 月',
      ar: 'ديسمبر – فبراير',
    },
  },
];

export const SPA8_ONSEN_OPTIONS = [
  {
    type: {
      vi: 'Bể Riêng Tư (1–2 người)',
      en: 'Private Pool (1–2 guests)',
      fr: 'Bassin Privé (1–2 personnes)',
      cn: '私人湯池（1–2 位）',
      ar: 'حوض خاص (1–2 ضيوف)',
    },
    duration: {
      vi: '45 phút/buổi',
      en: '45 min/session',
      fr: '45 min/séance',
      cn: '45 分钟/场',
      ar: '45 دقيقة/جلسة',
    },
    price: {
      vi: '850.000₫',
      en: '850,000₫',
      fr: '850,000₫',
      cn: '850,000₫',
      ar: '850,000₫',
    },
    includes: {
      vi: [
        'Bể onsen riêng 42°C',
        'Trà matcha và bánh wagashi',
        'Yukata & khăn tắm',
        'Aromatherapy muối tắm',
      ],
      en: [
        'Private 42°C onsen',
        'Matcha tea & wagashi',
        'Yukata & bath towel',
        'Aromatherapy bath salts',
      ],
      fr: [
        'Onsen privé à 42°C',
        'Thé matcha & wagashi',
        'Yukata & serviette de bain',
        'Sels de bain aromathérapie',
      ],
      cn: ['42°C 私人温泉', '抹茶与和菓子', '浴衣与浴巾', '芳香疗法浴盐'],
      ar: [
        'أونسن خاص بدرجة 42°م',
        'شاي ماتشا وواغاشي',
        'يوكاتا ومنشفة استحمام',
        'أملاح استحمام عطرية',
      ],
    },
  },
  {
    type: {
      vi: 'Bể Gia Đình (3–4 người)',
      en: 'Family Pool (3–4 guests)',
      fr: 'Bassin Familial (3–4 personnes)',
      cn: '家庭湯池（3–4 位）',
      ar: 'حوض عائلي (3–4 ضيوف)',
    },
    duration: {
      vi: '60 phút/buổi',
      en: '60 min/session',
      fr: '60 min/séance',
      cn: '60 分钟/场',
      ar: '60 دقيقة/جلسة',
    },
    price: {
      vi: '1.600.000₫',
      en: '1,600,000₫',
      fr: '1,600,000₫',
      cn: '1,600,000₫',
      ar: '1,600,000₫',
    },
    includes: {
      vi: [
        'Bể lớn có vườn Nhật',
        'Trà Hojicha & chạp bàn nhẹ',
        'Yukata đủ số',
        'Muối Himalaya ngâm',
      ],
      en: [
        'Large pool with Japanese garden',
        'Hojicha tea & light snacks',
        'Yukata all sizes',
        'Himalayan bath salts',
      ],
      fr: [
        'Grand bassin avec jardin japonais',
        'Thé Hojicha & collations légères',
        'Yukata toutes tailles',
        'Sels de bain de l’Himalaya',
      ],
      cn: ['带日式庭园的大湯池', '焾茶与轻食', '各尺码浴衣', '喂马拉雅浴盐'],
      ar: [
        'حوض كبير مع حديقة يابانية',
        'شاي هوجيتشا ووجبات خفيفة',
        'يوكاتا بجميع المقاسات',
        'أملاح استحمام الهمالايا',
      ],
    },
  },
];

export const SPA8_SHIATSU_MENU = [
  {
    name: {
      vi: 'Shiatsu Cổ Điển',
      en: 'Classic Shiatsu',
      fr: 'Shiatsu Classique',
      cn: '经典指压',
      ar: 'شياتسو كلاسيكي',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: {
      vi: '780.000₫',
      en: '780,000₫',
      fr: '780,000₫',
      cn: '780,000₫',
      ar: '780,000₫',
    },
  },
  {
    name: {
      vi: 'Do-In (Khí công Nhật)',
      en: 'Do-In (Japanese Qigong)',
      fr: 'Do-In (Qigong Japonais)',
      cn: 'Do-In（日本气功）',
      ar: 'دو-إن (تشي كونغ ياباني)',
    },
    duration: { vi: '45 phút', en: '45 min', fr: '45 min', cn: '45 分钟', ar: '45 دقيقة' },
    price: {
      vi: '550.000₫',
      en: '550,000₫',
      fr: '550,000₫',
      cn: '550,000₫',
      ar: '550,000₫',
    },
  },
  {
    name: {
      vi: 'Amma Toàn Thân',
      en: 'Amma Full Body',
      fr: 'Amma Corps Entier',
      cn: '按摩全身',
      ar: 'أمّا لكامل الجسم',
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    price: {
      vi: '1.100.000₫',
      en: '1,100,000₫',
      fr: '1,100,000₫',
      cn: '1,100,000₫',
      ar: '1,100,000₫',
    },
  },
  {
    name: {
      vi: 'Head Spa (Gội đầu Nhật)',
      en: 'Head Spa (Japanese scalp)',
      fr: 'Head Spa (Cuir chevelu japonais)',
      cn: '头部 SPA（日式头皮）',
      ar: 'سبا الرأس (فروة الرأس اليابانية)',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: {
      vi: '680.000₫',
      en: '680,000₫',
      fr: '680,000₫',
      cn: '680,000₫',
      ar: '680,000₫',
    },
  },
];

export const SPA8_DURATION_OPTIONS = {
  vi: ['45 phút', '60 phút', '90 phút', '120 phút', '180 phút (Half Day)'],
  en: ['45 min', '60 min', '90 min', '120 min', '180 min (Half Day)'],
  fr: ['45 min', '60 min', '90 min', '120 min', '180 min (Demi-journée)'],
  cn: ['45 分钟', '60 分钟', '90 分钟', '120 分钟', '180 分钟（半日）'],
  ar: ['45 دقيقة', '60 دقيقة', '90 دقيقة', '120 دقيقة', '180 دقيقة (نصف يوم)'],
};
