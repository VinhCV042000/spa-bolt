// ----------------------------------------------------------------------

export type Spa6Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

// Terra Heal Ayurvedic Wellness Colors
export const TERRACOTTA = '#C1440E';
export const FOREST = '#2D5016';
export const CREAM = '#F9F4ED';
export const DARK = '#1C1008';
export const BROWN = '#8B4513';
export const SAND = '#F5E6D3';
export const SAGE = '#5B7A3F';

// ----------------------------------------------------------------------

export const spa6AboutContent = {
  eyebrow: {
    vi: 'Về Terra Heal',
    en: 'About Terra Heal',
    fr: 'À propos de Terra Heal',
    cn: '关于 Terra Heal',
    ar: 'عن تيرا هيل',
  },
  title: {
    vi: 'Hành Trình Chữa Lành từ Thiên Nhiên',
    en: "Nature's Healing Journey",
    fr: 'Le Voyage de Guérison par la Nature',
    cn: '自然疗愈之旅',
    ar: 'رحلة الشفاء من الطبيعة',
  },
  description: {
    vi: 'Terra Heal được thành lập với sứ mệnh kết nối y học cổ truyền Á Đông và phương pháp trị liệu tự nhiên đương đại. Chúng tôi tin rằng cơ thể có khả năng tự chữa lành khi được hỗ trợ đúng cách. Mỗi liệu trình là một hành trình tìm lại cân bằng giữa body, mind và spirit.',
    en: 'Terra Heal was founded with a mission to connect Eastern traditional medicine with contemporary natural therapy methods. We believe the body has the ability to heal itself when properly supported. Each treatment is a journey to rediscover balance between body, mind, and spirit.',
    fr: "Terra Heal a été fondé avec pour mission de relier la médecine traditionnelle orientale aux méthodes de thérapie naturelle contemporaines. Nous croyons que le corps a la capacité de se guérir lui-même lorsqu'il est correctement soutenu. Chaque traitement est un voyage pour redécouvrir l'équilibre entre le corps, l'esprit et l'âme.",
    cn: 'Terra Heal 成立的使命是将东方传统医学与当代自然疗法相结合。我们相信，在正确的支持下，身体具有自愈能力。每一次疗程都是一段重新发现身心灵平衡的旅程。',
    ar: 'تأسس تيرا هيل بمهمة ربط الطب الشرقي التقليدي بطرق العلاج الطبيعي المعاصرة. نؤمن بأن الجسم لديه قدرة على الشفاء الذاتي عند دعمه بشكل صحيح. كل علاج هو رحلة لاستعادة التوازن بين الجسم والعقل والروح.',
  },
  stats: {
    years: { vi: '12+ Năm', en: '12+ Years', fr: '12+ Ans', cn: '12+ 年', ar: '12+ سنة' },
    guests: {
      vi: '5000+ Khách',
      en: '5000+ Guests',
      fr: '5000+ Clients',
      cn: '5000+ 客人',
      ar: '5000+ ضيف',
    },
    rituals: {
      vi: '25+ Liệu Trình',
      en: '25+ Rituals',
      fr: '25+ Rituels',
      cn: '25+ 疗程',
      ar: '25+ طقس',
    },
    branches: {
      vi: '5 Chi Nhánh',
      en: '5 Branches',
      fr: '5 Succursales',
      cn: '5 家分店',
      ar: '5 فروع',
    },
  },
  philosophy: {
    vi: 'Triết lý của chúng tôi kết hợp ba trụ cột: Ayurveda từ Ấn Độ, Shinrin-yoku từ Nhật Bản, và Boreh từ Bali. Mỗi liệu trình được thiết kế riêng theo Dosha của bạn.',
    en: 'Our philosophy combines three pillars: Ayurveda from India, Shinrin-yoku from Japan, and Boreh from Bali. Each treatment is personalized to your Dosha.',
    fr: "Notre philosophie combine trois piliers : l'Ayurveda de l'Inde, le Shinrin-yoku du Japon, et le Boreh de Bali. Chaque traitement est personnalisé selon votre Dosha.",
    cn: '我们的理念结合三大支柱：来自印度的阿育吠陀、来自日本的森林浴，以及来自巴厘岛的 Boreh。每次疗程都根据您的 Dosha 量身定制。',
    ar: 'تجمع فلسفتنا بين ثلاثة أعمدة: الأيورفيدا من الهند، وشينرين يوكو من اليابان، وبوريه من بالي. كل علاج مصمم خصيصًا حسب الدوشا الخاص بك.',
  },
};

// ----------------------------------------------------------------------

export const spa6ServiceCategories = [
  {
    id: 'ayurveda',
    title: {
      vi: 'Ayurveda',
      en: 'Ayurveda',
      fr: 'Ayurveda',
      cn: '阿育吠陀',
      ar: 'الأيورفيدا',
    },
    description: {
      vi: 'Liệu pháp truyền thống Ấn Độ',
      en: 'Traditional Indian therapy',
      fr: 'Thérapie indienne traditionnelle',
      cn: '印度传统疗法',
      ar: 'العلاج الهندي التقليدي',
    },
    icon: 'solar:yin-yang-bold-duotone',
    color: TERRACOTTA,
  },
  {
    id: 'nature',
    title: {
      vi: 'Thiên Nhiên',
      en: 'Nature',
      fr: 'Nature',
      cn: '自然',
      ar: 'الطبيعة',
    },
    description: {
      vi: 'Liệu pháp từ thiên nhiên',
      en: 'Nature-based therapies',
      fr: 'Thérapies basées sur la nature',
      cn: '自然疗法',
      ar: 'علاجات طبيعية',
    },
    icon: 'solar:leaf-bold-duotone',
    color: FOREST,
  },
  {
    id: 'retreat',
    title: {
      vi: 'Retreat',
      en: 'Retreat',
      fr: 'Retraite',
      cn: '静修',
      ar: 'الخلوة',
    },
    description: {
      vi: 'Chương trình chữa lành đa ngày',
      en: 'Multi-day healing programs',
      fr: 'Programmes de guérison de plusieurs jours',
      cn: '多日疗愈计划',
      ar: 'برامج شفاء متعددة الأيام',
    },
    icon: 'solar:sun-bold-duotone',
    color: BROWN,
  },
];

// ----------------------------------------------------------------------

export const spa6Services = [
  {
    id: 'abhyanga',
    slug: 'abhyanga-oil-ritual',
    title: {
      vi: 'Abhyanga Oil Ritual',
      en: 'Abhyanga Oil Ritual',
      fr: 'Abhyanga Oil Ritual',
      cn: 'Abhyanga 油疗仪式',
      ar: 'طقوس زيت أبهيانجا',
    },
    category: 'ayurveda',
    origin: {
      vi: 'Ayurveda — Ấn Độ',
      en: 'Ayurveda — India',
      fr: 'Ayurveda — Inde',
      cn: '阿育吠陀 — 印度',
      ar: 'الأيورفيدا — الهند',
    },
    description: {
      vi: 'Massage toàn thân bằng dầu thảo mộc ấm được chọn theo Dosha cá nhân. Kỹ thuật đẩy ngược chiều lông để kích thích tuần hoàn bạch huyết, đẩy toxin ra khỏi tế bào và nuôi dưỡng da từ sâu bên trong.',
      en: 'Full-body massage with warm herbal oils selected by your personal Dosha. Counter-grain strokes stimulate lymphatic flow, push toxins out of cells and deeply nourish the skin.',
      fr: 'Massage du corps entier aux huiles végétales chaudes choisies selon votre Dosha personnel. Les mouvements à contre-poil stimulent la circulation lymphatique, éliminent les toxines des cellules et nourrissent la peau en profondeur.',
      cn: '使用根据您个人体质（Dosha）选配的温热草本油进行全身按摩。逆毛流手法刺激淋巴循环，将毒素排出细胞，并由内而外深层滋养肌肤。',
      ar: 'تدليك للجسم بالكامل بزيوت عشبية دافئة مختارة حسب الدوشا الخاص بك. تحفّز الحركات العكسية تدفق اللمف وتطرد السموم من الخلايا وتغذّي البشرة من العمق.',
    },
    benefits: {
      vi: [
        'Giảm stress sâu',
        'Nuôi dưỡng da',
        'Thải độc bạch huyết',
        'Tăng tuần hoàn',
        'Cân bằng Dosha',
      ],
      en: [
        'Deep stress relief',
        'Skin nourishment',
        'Lymphatic detox',
        'Improved circulation',
        'Dosha balance',
      ],
      fr: [
        'Soulagement profond du stress',
        'Nourriture de la peau',
        'Détox lymphatique',
        'Circulation améliorée',
        'Équilibre Dosha',
      ],
      cn: ['深层减压', '滋养肌肤', '淋巴排毒', '改善循环', '平衡 Dosha'],
      ar: [
        'تخفيف عميق للتوتر',
        'تغذية البشرة',
        'إزالة سموم اللمف',
        'تحسين الدورة الدموية',
        'توازن الدوشا',
      ],
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    price: { vi: '950.000₫', en: '$38', fr: '38€', cn: '￥280', ar: '150 ر.س' },
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    icon: 'solar:sun-bold-duotone',
    color: TERRACOTTA,
  },
  {
    id: 'forest-bathing',
    slug: 'forest-bathing',
    title: {
      vi: 'Forest Bathing',
      en: 'Forest Bathing',
      fr: 'Forest Bathing',
      cn: '森林浴',
      ar: 'الاستحمام في الغابة',
    },
    category: 'nature',
    origin: {
      vi: 'Shinrin-yoku — Nhật Bản',
      en: 'Shinrin-yoku — Japan',
      fr: 'Shinrin-yoku — Japon',
      cn: '森林浴 — 日本',
      ar: 'شينرين يوكو — اليابان',
    },
    description: {
      vi: 'Tắm rừng trong không gian xanh mát với tinh dầu lá tre, hương thông và tiếng suối chảy. Thực hành thở sâu cùng âm nhạc tự nhiên, giảm cortisol hiệu quả và phục hồi hệ thần kinh tự chủ.',
      en: 'Forest bathing in a lush green space with bamboo leaf essential oil, pine fragrance and the sound of flowing water. Deep breathing practice with natural soundscapes, effectively reducing cortisol and restoring the autonomic nervous system.',
      fr: "Bain de forêt dans un espace verdoyant avec huile essentielle de feuille de bambou, parfum de pin et bruit de l'eau qui coule. Pratique de respiration profonde au son de la nature, réduisant efficacement le cortisol et restaurant le système nerveux autonome.",
      cn: '在郁郁葱葱的绿色空间中进行森林浴，伴有竹叶精油、松木香气与流水声。在自然音景中练习深呼吸，有效降低皮质醇并恢复自主神经系统。',
      ar: 'الاستحمام في الغابة في مساحة خضراء وارفة مع زيت أوراق الخيزران العطري ورائحة الصنوبر وصوت المياه الجارية. تمارين تنفّس عميق مع أصوات الطبيعة تقلّل الكورتيزول بفعالية وتعيد توازن الجهاز العصبي اللاإرادي.',
    },
    benefits: {
      vi: [
        'Giảm cortisol',
        'Phục hồi thần kinh',
        'Tăng miễn dịch',
        'Thư giãn sâu',
        'Kết nối thiên nhiên',
      ],
      en: [
        'Cortisol reduction',
        'Nervous system recovery',
        'Immunity boost',
        'Deep relaxation',
        'Nature connection',
      ],
      fr: [
        'Réduction du cortisol',
        'Récupération nerveuse',
        'Boost immunitaire',
        'Relaxation profonde',
        'Connexion à la nature',
      ],
      cn: ['降低皮质醇', '神经恢复', '增强免疫', '深层放松', '连接自然'],
      ar: [
        'تقليل الكورتيزول',
        'استعادة الجهاز العصبي',
        'تعزيز المناعة',
        'استرخاء عميق',
        'التواصل مع الطبيعة',
      ],
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 分钟', ar: '75 دقيقة' },
    price: { vi: '780.000₫', en: '$32', fr: '32€', cn: '￥230', ar: '120 ر.س' },
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    icon: 'solar:leaf-bold-duotone',
    color: FOREST,
  },
  {
    id: 'boreh-bali',
    slug: 'boreh-bali-ritual',
    title: {
      vi: 'Boreh Bali Ritual',
      en: 'Boreh Bali Ritual',
      fr: 'Boreh Bali Ritual',
      cn: 'Boreh 巴厘岛仪式',
      ar: 'طقوس بوريه بالي',
    },
    category: 'nature',
    origin: {
      vi: 'Boreh — Bali, Indonesia',
      en: 'Boreh — Bali, Indonesia',
      fr: 'Boreh — Bali, Indonésie',
      cn: 'Boreh — 印度尼西亚巴厘岛',
      ar: 'بوريه — بالي، إندونيسيا',
    },
    description: {
      vi: 'Hỗn hợp gia vị Bali truyền thống (đinh hương, gừng, nghệ, bã cà phê) đắp toàn thân, giúp tăng tuần hoàn, sưởi ấm cơ thể và thải độc mạnh mẽ. Kết thúc bằng tắm hoa và dưỡng thể với dầu dừa tinh khiết.',
      en: 'A blend of traditional Balinese spices (cloves, ginger, turmeric, coffee grounds) applied all over the body, boosting circulation, warming deep muscles and powerfully detoxifying. Concludes with a flower bath and coconut oil body moisturiser.',
      fr: "Un mélange d'épices balinaises traditionnelles (clous de girofle, gingembre, curcuma, marc de café) appliqué sur tout le corps, stimulant la circulation, ré, réchauffant les muscles profonds et détoxifiant puissamment. Se termine par un bain de fleurs et un soin du corps à l'huile de coco.",
      cn: '将传统巴厘岛香料（丁香、生姜、姜黄、咖啡渣）调和敷于全身，促进循环、温暖深层肌肉并强力排毒。最后以鲜花浴和纯椰子油身体护理收尾。',
      ar: 'مزيج من التوابل البالية التقليدية (القرنفل والزنجبيل والكركم وتفل القهوة) يوضع على الجسم بالكامل لتعزيز الدورة الدموية وتدفئة العضلات العميقة والتخلص من السموم بقوة. ينتهي بحمام أزهار وترطيب للجسم بزيت جوز الهند.',
    },
    benefits: {
      vi: ['Thải độc mạnh', 'Sưởi ấm sâu', 'Tăng tuần hoàn', 'Chống viêm', 'Dưỡng da'],
      en: [
        'Powerful detox',
        'Deep warming',
        'Circulation boost',
        'Anti-inflammatory',
        'Skin nourishment',
      ],
      fr: [
        'Détox puissante',
        'Réchauffement profond',
        'Boost circulatoire',
        'Anti-inflammatoire',
        'Nourriture de la peau',
      ],
      cn: ['强力排毒', '深层温暖', '促进循环', '抗炎', '滋养肌肤'],
      ar: [
        'إزالة سموم قوية',
        'تدفئة عميقة',
        'تعزيز الدورة الدموية',
        'مضاد للالتهابات',
        'تغذية البشرة',
      ],
    },
    duration: { vi: '100 phút', en: '100 min', fr: '100 min', cn: '100 分钟', ar: '100 دقيقة' },
    price: { vi: '1.100.000₫', en: '$45', fr: '45€', cn: '￥320', ar: '175 ر.س' },
    image: 'https://images.unsplash.com/photo-1611073615830-9f2f0508d72f?w=800&q=80',
    icon: 'solar:flower-bold-duotone',
    color: BROWN,
  },
  {
    id: 'herbal-steam',
    slug: 'herbal-steam-lodge',
    title: {
      vi: 'Herbal Steam Lodge',
      en: 'Herbal Steam Lodge',
      fr: 'Herbal Steam Lodge',
      cn: '草本蒸汽屋',
      ar: 'كوخ البخار العشبي',
    },
    category: 'ayurveda',
    origin: {
      vi: 'Xông hơi thảo mộc — Việt Nam',
      en: 'Herbal steam — Vietnam',
      fr: "Vapeur d'herbes — Vietnam",
      cn: '草本蒸汽 — 越南',
      ar: 'البخار العشبي — فيتنام',
    },
    description: {
      vi: 'Liệu pháp xông hơi toàn thân bằng 12 loại thảo dược quý: ngải cứu, sả, gừng, lá ổi, tía tô và bồ kết. Thanh lọc hô hấp, giải cảm, kháng viêm và tăng sức đề kháng.',
      en: 'Whole-body herbal steam therapy using 12 precious herbs: mugwort, lemongrass, ginger, guava leaf, perilla and blackberry lily. Cleanses the respiratory system, fights inflammation and boosts immunity.',
      fr: "Thérapie de vapeur d'herbes pour tout le corps utilisant 12 herbes précieuses : armoise, citronnelle, gingembre, feuille de goyave, périlla et lis. Purifie le système respiratoire, combat l'inflammation et renforce l'immunité.",
      cn: '采用 12 种珍贵草药（艾草、香茅、生姜、番石榴叶、紫苏与皂荚）进行全身草本蒸汽疗法。清洁呼吸系统、抗炎并增强免疫力。',
      ar: 'علاج بالبخار العشبي للجسم بالكامل باستخدام 12 عشبة ثمينة: الشيح والليمون العشبي والزنجبيل وأوراق الجوافة والبريلا وزنبق الزعفران. ينقّي الجهاز التنفسي ويكافح الالتهاب ويعزّز المناعة.',
    },
    benefits: {
      vi: ['Thanh lọc hô hấp', 'Kháng viêm', 'Tăng đề kháng', 'Giải cảm', 'Thải độc da'],
      en: [
        'Respiratory cleanse',
        'Anti-inflammatory',
        'Immunity boost',
        'Cold relief',
        'Skin detox',
      ],
      fr: [
        'Purification respiratoire',
        'Anti-inflammatoire',
        'Boost immunitaire',
        'Soulagement du rhume',
        'Détox cutanée',
      ],
      cn: ['清洁呼吸系统', '抗炎', '增强免疫', '缓解感冒', '肌肤排毒'],
      ar: [
        'تنقية الجهاز التنفسي',
        'مضاد للالتهابات',
        'تعزيز المناعة',
        'تخفيف نزلات البرد',
        'إزالة سموم البشرة',
      ],
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: { vi: '650.000₫', en: '$26', fr: '26€', cn: '￥190', ar: '100 ر.س' },
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    icon: 'solar:cloud-bold-duotone',
    color: SAGE,
  },
  {
    id: 'shirodhara',
    slug: 'shirodhara-therapy',
    title: {
      vi: 'Shirodhara Therapy',
      en: 'Shirodhara Therapy',
      fr: 'Shirodhara Therapy',
      cn: 'Shirodhara 疗法',
      ar: 'علاج شيروهارا',
    },
    category: 'ayurveda',
    origin: {
      vi: 'Ayurveda — Kerala, Ấn Độ',
      en: 'Ayurveda — Kerala, India',
      fr: 'Ayurveda — Kerala, Inde',
      cn: '阿育吠陀 — 印度喀拉拉',
      ar: 'الأيورفيدا — كيرالا، الهند',
    },
    description: {
      vi: 'Dầu ấm chảy liên tục lên trán (Ajna chakra) để thư giãn sâu hệ thần kinh và kích hoạt tuyến tùng. Kết hợp massage đầu với dầu dưỡng tóc, mang lại giấc ngủ sâu và sự bình an tâm trí.',
      en: 'Warm oil continuously flowing onto the forehead (Ajna chakra) to deeply relax the nervous system and activate the pineal gland. Combined with head massage and nourishing hair oil, bringing deep sleep and mental peace.',
      fr: "De l'huile chaude coule continuellement sur le front (chakra Ajna) pour détendre profondément le système nerveux et activer la glande pinéale. Combiné avec un massage de la tête et une huile nourrissante, apportant un sommeil profond et une paix mentale.",
      cn: '温热油持续流向前额（眉心轮）以深度放松神经系统并激活松果体。配合头部按摩和滋养发油，带来深层睡眠和心灵平静。',
      ar: 'زيت دافئ يتدفق باستمرار على الجبهة (شاكرا أجنا) لإرخاء الجهاز العصبي بعمق وتنشيط الغدة الصنوبرية. مقترن بتدليك الرأس وزيت مغذٍ للشعر، يجلب نومًا عميقًا وسكينة نفسية.',
    },
    benefits: {
      vi: ['Giấc ngủ sâu', 'Bình an tâm trí', 'Giảm đau đầu', 'Dưỡng tóc', 'Kích hoạt chakra'],
      en: [
        'Deep sleep',
        'Mental peace',
        'Headache relief',
        'Hair nourishment',
        'Chakra activation',
      ],
      fr: [
        'Sommeil profond',
        'Paix mentale',
        'Soulagement des maux de tête',
        'Nourriture des cheveux',
        'Activation des chakras',
      ],
      cn: ['深层睡眠', '心灵平静', '缓解头痛', '滋养秀发', '激活脉轮'],
      ar: ['نوم عميق', 'سلام نفسي', 'تخفيف الصداع', 'تغذية الشعر', 'تنشيط الشاكرات'],
    },
    duration: { vi: '45 phút', en: '45 min', fr: '45 min', cn: '45 分钟', ar: '45 دقيقة' },
    price: { vi: '850.000₫', en: '$34', fr: '34€', cn: '￥250', ar: '130 ر.س' },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    icon: 'solar:stars-bold-duotone',
    color: TERRACOTTA,
  },
  {
    id: 'pranayama-meditation',
    slug: 'pranayama-meditation',
    title: {
      vi: 'Pranayama & Thiền',
      en: 'Pranayama & Meditation',
      fr: 'Pranayama & Méditation',
      cn: '调息与冥想',
      ar: 'برانا ياما والتأمل',
    },
    category: 'ayurveda',
    origin: {
      vi: 'Yoga — Ấn Độ cổ đại',
      en: 'Yoga — Ancient India',
      fr: 'Yoga — Inde ancienne',
      cn: '瑜伽 — 古印度',
      ar: 'اليوجا — الهند القديمة',
    },
    description: {
      vi: 'Hướng dẫn thở theo phương pháp Pranayama kết hợp thiền định. Kỹ thuật thở được chọn theo Dosha để cân bằng Vayu trong cơ thể. Mỗi buổi kết thúc với âm thanh bowls và tinh dầu grounding.',
      en: 'Guided breathing using Pranayama methods combined with meditation. Breathing techniques selected by Dosha to balance Vayu in the body. Each session ends with singing bowls and grounding essential oils.',
      fr: 'Respiration guidée selon les méthodes Pranayama combinée à la méditation. Techniques de respiration sélectionnées selon le Dosha pour équilibrer le Vayu. Chaque séance se termine par des bols chantants et des huiles essentielles ancrantes.',
      cn: '使用调息法指导呼吸并结合冥想。根据 Dosha 选择呼吸技巧以平衡体内的 Vayu。每次课程以颂钵和接地精油结束。',
      ar: 'تنفس موجه باستخدام طرق برانا ياما مقترن بالتأمل. تقنيات تنفس مختارة حسب الدوشا لموازنة فايو في الجسم. تنتهي كل جلسة بأوعية غنائية وزيوت عطرية تثبت الأرض.',
    },
    benefits: {
      vi: ['Cân bằng Prana', 'Giảm lo âu', 'Tăng tập trung', 'Thư giãn tâm trí', 'Kết nối nội tâm'],
      en: [
        'Prana balance',
        'Anxiety reduction',
        'Improved focus',
        'Mental relaxation',
        'Inner connection',
      ],
      fr: [
        'Équilibre du Prana',
        "Réduction de l'anxiété",
        'Concentration améliorée',
        'Relaxation mentale',
        'Connexion intérieure',
      ],
      cn: ['平衡 Prana', '减少焦虑', '提升专注', '心灵放松', '内在连接'],
      ar: ['توازن البرانا', 'تقليل القلق', 'تحسين التركيز', 'استرخاء ذهني', 'اتصال داخلي'],
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: { vi: '550.000₫', en: '$22', fr: '22€', cn: '￥160', ar: '85 ر.س' },
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
    icon: 'solar:meditation-bold-duotone',
    color: FOREST,
  },
];

// ----------------------------------------------------------------------

export const spa6TrainingPrograms = [
  {
    id: 'ayurveda-fundamentals',
    title: {
      vi: 'Ayurveda Căn Bản',
      en: 'Ayurveda Fundamentals',
      fr: "Fondements de l'Ayurveda",
      cn: '阿育吠陀基础',
      ar: 'أساسيات الأيورفيدا',
    },
    duration: {
      vi: '4 tuần (Cuối tuần)',
      en: '4 weeks (Weekends)',
      fr: '4 semaines (Week-ends)',
      cn: '4 周（周末）',
      ar: '4 أسابيع (عطلات نهاية الأسبوع)',
    },
    description: {
      vi: 'Tìm hiểu về ba Dosha (Vata, Pitta, Kapha), cách xác định prakriti của bạn, và các nguyên tắc dinh dưỡng Ayurveda.',
      en: 'Learn about the three Doshas (Vata, Pitta, Kapha), how to identify your prakriti, and Ayurvedic nutrition principles.',
      fr: 'Découvrez les trois Doshas (Vata, Pitta, Kapha), comment identifier votre prakriti, et les principes nutritionnels ayurvédiques.',
      cn: '了解三种 Dosha（瓦塔、皮塔、卡法），如何识别您的原生体质，以及阿育吠陀营养原则。',
      ar: 'تعرف على الدوشا الثلاثة (فاتا، بيتا، كافا)، وكيفية تحديد براكريتي الخاص بك، ومبادئ التغذية الأيورفيدية.',
    },
    price: { vi: '4.500.000₫', en: '$180', fr: '180€', cn: '￥1,300', ar: '680 ر.س' },
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80',
  },
  {
    id: 'abhyanga-technician',
    title: {
      vi: 'Kỹ Thuật Viên Abhyanga',
      en: 'Abhyanga Technician',
      fr: 'Technicien Abhyanga',
      cn: 'Abhyanga 技师培训',
      ar: 'فني أبهيانجا',
    },
    duration: {
      vi: '8 tuần (Toàn thời gian)',
      en: '8 weeks (Full-time)',
      fr: '8 semaines (Temps plein)',
      cn: '8 周（全职）',
      ar: '8 أسابيع (دوام كامل)',
    },
    description: {
      vi: 'Đào tạo chuyên sâu về kỹ thuật massage Abhyanga truyền thống, bao gồm chọn dầu theo Dosha và các cử chỉ yến sa.',
      en: 'In-depth training in traditional Abhyanga massage techniques, including Dosha-specific oil selection and marma point gestures.',
      fr: "Formation approfondie aux techniques de massage Abhyanga traditionnel, y compris la sélection d'huiles selon le Dosha et les gestes des points marma.",
      cn: '深入学习传统 Abhyanga 按摩技术，包括根据 Dosha 选择精油和 marma 点手法。',
      ar: 'تدريب معمق في تقنيات تدليك أبهيانجا التقليدية، بما في ذلك اختيار الزيوت حسب الدوشا وإيماءات نقاط مارما.',
    },
    price: { vi: '15.000.000₫', en: '$600', fr: '600€', cn: '￥4,300', ar: '2,250 ر.س' },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
  },
  {
    id: 'holistic-wellness',
    title: {
      vi: 'Chuyên Gia Wellness Toàn Diện',
      en: 'Holistic Wellness Practitioner',
      fr: 'Praticien Bien-être Holistique',
      cn: '整体健康从业师',
      ar: 'ممارس العافية الشاملة',
    },
    duration: {
      vi: '12 tuần (Toàn thời gian)',
      en: '12 weeks (Full-time)',
      fr: '12 semaines (Temps plein)',
      cn: '12 周（全职）',
      ar: '12 أسبوعًا (دوام كامل)',
    },
    description: {
      vi: 'Chương trình toàn diện bao gồm Ayurveda, thiền, yoga, diet therapy và business skills. Bằng cấp được công nhận quốc tế.',
      en: 'Comprehensive program covering Ayurveda, meditation, yoga, diet therapy and business skills. Internationally recognized certification.',
      fr: "Programme complet couvrant l'Ayurveda, la méditation, le yoga, la diététique et les compétences commerciales. Certification internationalement reconnue.",
      cn: '综合课程涵盖阿育吠陀、冥想、瑜伽、饮食疗法和商业技能。国际认证。',
      ar: 'برنامج شامل يغطي الأيورفيدا والتأمل واليوجا والعلاج الغذائي ومهارات الأعمال. شهادة معترف بها دولياً.',
    },
    price: { vi: '28.000.000₫', en: '$1,120', fr: '1,120€', cn: '￥8,000', ar: '4,200 ر.س' },
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&q=80',
  },
];

export const spa6Instructors = [
  {
    name: 'Dr. Aruna Sharma',
    role: {
      vi: 'Bác sĩ Ayurveda',
      en: 'Ayurveda Physician',
      fr: 'Médecin Ayurvédique',
      cn: '阿育吠陀医师',
      ar: 'طبيب أيورفيدا',
    },
    bio: {
      vi: '20 năm kinh nghiệm, tốt nghiệp Gujarat Ayurved University, Ấn Độ',
      en: '20 years experience, Gujarat Ayurved University graduate, India',
      fr: "20 ans d'expérience, diplômée de Gujarat Ayurved University, Inde",
      cn: '20 年从业经验，毕业于印度古吉拉特阿育吠陀大学',
      ar: '20 عامًا من الخبرة، خريجة جامعة جوجارات للأيورفيدا، الهند',
    },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    name: 'Sensei Kenji Yamamoto',
    role: {
      vi: 'Hướng dẫn viên Forest Bathing',
      en: 'Forest Bathing Guide',
      fr: 'Guide Forest Bathing',
      cn: '森林浴向导',
      ar: 'مرشد الاستحمام في الغابة',
    },
    bio: {
      vi: 'Chứng nhận shinrin-yoku từ Nhật Bản, 15 năm hướng dẫn',
      en: 'Certified shinrin-yoku guide from Japan, 15 years guiding',
      fr: "Guide shinrin-yoku certifié du Japon, 15 ans d'encadrement",
      cn: '日本认証森林浴向导，15 年向导经验',
      ar: 'مرشد معتمد في شينرين يوكو من اليابان، 15 عامًا من الإرشاد',
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
  {
    name: 'Ibu Made Sari',
    role: {
      vi: 'Boreh Master',
      en: 'Boreh Master',
      fr: 'Maître Boreh',
      cn: 'Boreh 大师',
      ar: 'ماجستير بوريه',
    },
    bio: {
      vi: 'Thế hệ thứ 3 gia đình Boreh ở Ubud, Bali',
      en: '3rd generation Boreh family from Ubud, Bali',
      fr: '3ème génération de famille Boreh à Ubud, Bali',
      cn: '巴厘岛乌布 Boreh 家族第三代传人',
      ar: 'الجيل الثالث من عائلة بوريه في أوبود، بالي',
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
];

// ----------------------------------------------------------------------

export const spa6BlogCategories = [
  {
    id: 'ayurveda',
    label: { vi: 'Ayurveda', en: 'Ayurveda', fr: 'Ayurveda', cn: '阿育吠陀', ar: 'الأيورفيدا' },
  },
  {
    id: 'wellness',
    label: { vi: 'Wellness', en: 'Wellness', fr: 'Bien-être', cn: '健康', ar: 'العافية' },
  },
  {
    id: 'nutrition',
    label: { vi: 'Dinh dưỡng', en: 'Nutrition', fr: 'Nutrition', cn: '营养', ar: 'التغذية' },
  },
  {
    id: 'lifestyle',
    label: {
      vi: 'Lifestyle',
      en: 'Lifestyle',
      fr: 'Mode de vie',
      cn: '生活方式',
      ar: 'نمط الحياة',
    },
  },
];

export const spa6BlogPosts = [
  {
    id: 1,
    slug: 'understanding-your-dosha',
    title: {
      vi: 'Hiểu Về Dosha Của Bạn: Vata, Pitta, Kapha',
      en: 'Understanding Your Dosha: Vata, Pitta, Kapha',
      fr: 'Comprendre Votre Dosha: Vata, Pitta, Kapha',
      cn: '了解您的 Dosha：瓦塔、皮塔、卡法',
      ar: 'فهم الدوشا الخاص بك: فاتا، بيتا، كافا',
    },
    excerpt: {
      vi: 'Khám phá ba năng lượng căn bản chi phối cơ thể và tâm trí bạn theo y học Ayurveda cổ đại.',
      en: 'Discover the three fundamental energies that govern your body and mind according to ancient Ayurvedic medicine.',
      fr: 'Découvrez les trois énergies fondamentales qui régissent votre corps et votre esprit selon la médecine ayurvédique ancienne.',
      cn: '探索根据古老阿育吠陀医学支配您身心的三种基本能量。',
      ar: 'اكتشف الطاقات الأساسية الثلاث التي تحكم جسدك وعقلك حسب طب الأيورفيدا القديم.',
    },
    category: 'ayurveda',
    date: '2025-05-15',
    author: 'Dr. Aruna Sharma',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
  },
  {
    id: 2,
    slug: 'benefits-of-forest-bathing',
    title: {
      vi: 'Lợi Ích Của Forest Bathing Theo Nghiên Cứu Khoa Học',
      en: 'Benefits of Forest Bathing: Scientific Research',
      fr: 'Bienfaits du Forest Bathing: Recherche Scientifique',
      cn: '森林浴的益处：科学研究',
      ar: 'فوائد الاستحمام في الغابة: الأبحاث العلمية',
    },
    excerpt: {
      vi: 'Nghiên cứu từ Nhật Bản cho thấy tắm rừng giảm cortisol, tăng tế bào NK và cải thiện giấc ngủ.',
      en: 'Research from Japan shows forest bathing reduces cortisol, increases NK cells and improves sleep quality.',
      fr: 'Des recherches du Japon montrent que le bain de forêt réduit le cortisol, augmente les cellules NK et améliore la qualité du sommeil.',
      cn: '来自日本的研究表明，森林浴可降低皮质醇、增加 NK 细胞并改善睡眠质量。',
      ar: 'تظهر الأبحاث من اليابان أن الاستحمام في الغابة يقلل الكورتيزول ويزيد خلايا NK ويحسن جودة النوم.',
    },
    category: 'wellness',
    date: '2025-04-28',
    author: 'Sensei Kenji Yamamoto',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  },
  {
    id: 3,
    slug: 'sattvic-diet-guide',
    title: {
      vi: 'Hướng Dẫn Ăn Sattvic: Dinh Dưỡng Cho Tâm Trí',
      en: 'Sattvic Diet Guide: Nutrition for the Mind',
      fr: "Guide du Régime Sattvic: Nutrition pour l'Esprit",
      cn: '萨提瓦饮食指南：心灵营养',
      ar: 'دليل النظام الغذائي ساتفي: تغذية للعقل',
    },
    excerpt: {
      vi: 'Chế độ ăn Sattvic dựa trên thực phẩm thuần khiết, nhẹ nhàng, nuôi dưỡng cả cơ thể và tâm trí.',
      en: 'The Sattvic diet is based on pure, light foods that nourish both body and mind.',
      fr: "Le régime Sattvic est basé sur des aliments purs et légers qui nourrissent le corps et l'esprit.",
      cn: '萨提瓦饮食基于纯净、清淡的食物，滋养身心。',
      ar: 'يعتمد النظام الغذائي ساتفي على أطعمة نقية وخفيفة تغذي الجسم والعقل معاً.',
    },
    category: 'nutrition',
    date: '2025-04-10',
    author: 'Dr. Aruna Sharma',
    image: 'https://images.unsplash.com/photo-1490675936884-894fe5418652?w=800&q=80',
  },
];

// ----------------------------------------------------------------------

export const spa6Careers = [
  {
    id: 1,
    title: {
      vi: 'Therapist Abhyanga',
      en: 'Abhyanga Therapist',
      fr: 'Thérapeute Abhyanga',
      cn: 'Abhyanga 治疗师',
      ar: 'معالج أبهيانجا',
    },
    location: { vi: 'Hà Nội', en: 'Hanoi', fr: 'Hanoï', cn: '河内', ar: 'هانوي' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    description: {
      vi: 'Yêu cầu có chứng chỉ massage Ayurveda, ưu tiên có kinh nghiệm Abhyanga. Được đào tạo thêm.',
      en: 'Must have Ayurveda massage certification, Abhyanga experience preferred. Additional training provided.',
      fr: 'Doit avoir une certification de massage Ayurveda, expérience Abhyanga préférée. Formation supplémentaire fournie.',
      cn: '须持有阿育吠陀按摩认証，有 Abhyanga 经验者优先。提供额外培训。',
      ar: 'يجب أن يكون لديه شهادة تدليك أيورفيدا، خبرة أبهيانجا مفضلة. تدريب إضافي مقدّم.',
    },
  },
  {
    id: 2,
    title: {
      vi: 'Hướng Dẫn Viên Forest Bathing',
      en: 'Forest Bathing Guide',
      fr: 'Guide Forest Bathing',
      cn: '森林浴向导',
      ar: 'مرشد الاستحمام في الغابة',
    },
    location: { vi: 'Đà Lạt', en: 'Da Lat', fr: 'Da Lat', cn: '大叻', ar: 'دالات' },
    type: {
      vi: 'Bán thời gian',
      en: 'Part-time',
      fr: 'Temps partiel',
      cn: '兼职',
      ar: 'دوام جزئي',
    },
    description: {
      vi: 'Yêu cầu yêu thiên nhiên, có chứng chỉ shinrin-yoku hoặc sẵn sàng đào tạo. Vị trí ngoài trời.',
      en: 'Must love nature, shinrin-yoku certification preferred or willing to train. Outdoor position.',
      fr: 'Doit aimer la nature, certification shinrin-yoku préférée ou prêt à se former. Poste en extérieur.',
      cn: '须热爱自然，有森林浴认証者优先或愿意培训。户外职位。',
      ar: 'يجب أن يحب الطبيعة، شهادة شينرين يوكو مفضلة أو على استعداد للتدريب. وظيفة خارجية.',
    },
  },
  {
    id: 3,
    title: {
      vi: 'Quản Lý Retreat',
      en: 'Retreat Manager',
      fr: 'Gestionnaire de Retraite',
      cn: '静修经理',
      ar: 'مدير الخلوة',
    },
    location: {
      vi: 'TP.HCM',
      en: 'Ho Chi Minh City',
      fr: 'Hô Chi Minh-Ville',
      cn: '胡志明市',
      ar: 'مدينة هو تشي منه',
    },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    description: {
      vi: 'Quản lý hoạt động retreat, CSKH và team therapist. 3+ năm kinh nghiệm quản lý wellness.',
      en: 'Manage retreat operations, customer service and therapist team. 3+ years wellness management experience.',
      fr: "Gérer les opérations de retraite, le service client et l'équipe de thérapeutes. 3+ ans d'expérience en gestion du bien-être.",
      cn: '管理静修运营、客户服务和治疗师团队。3 年以上健康管理经验。',
      ar: 'إدارة عمليات الخلوة وخدمة العملاء وفريق المعالجين. 3+ سنوات خبرة في إدارة العافية.',
    },
  },
];

export const spa6CareerBenefits = [
  {
    icon: 'solar:heart-bold-duotone',
    text: {
      vi: 'Môi trường chữa lành',
      en: 'Healing environment',
      fr: 'Environnement guérisseur',
      cn: '治愈环境',
      ar: 'بيئة شفاء',
    },
  },
  {
    icon: 'solar:book-bold-duotone',
    text: {
      vi: 'Đào tạo liên tục',
      en: 'Continuous training',
      fr: 'Formation continue',
      cn: '持续培训',
      ar: 'تدريب مستمر',
    },
  },
  {
    icon: 'solar:health-bold-duotone',
    text: {
      vi: 'Liệu trình miễn phí',
      en: 'Free treatments',
      fr: 'Soins gratuits',
      cn: '免费疗程',
      ar: 'علاجات مجانية',
    },
  },
  {
    icon: 'solar:cup-bold-duotone',
    text: {
      vi: 'Commission hấp dẫn',
      en: 'Attractive commission',
      fr: 'Commission attractive',
      cn: '丰厚提成',
      ar: 'عمولة جذابة',
    },
  },
  {
    icon: 'solar:leaf-bold-duotone',
    text: {
      vi: 'Bữa ăn Sattvic',
      en: 'Sattvic meals',
      fr: 'Repas Sattvic',
      cn: '萨提瓦餐食',
      ar: 'وجبات ساتفية',
    },
  },
  {
    icon: 'solar:sun-bold-duotone',
    text: {
      vi: 'Cơ hội phát triển',
      en: 'Growth opportunities',
      fr: 'Opportunités de croissance',
      cn: '发展机会',
      ar: 'فرص نمو',
    },
  },
];

// ----------------------------------------------------------------------

export const spa6ContactInfo = {
  address: {
    vi: '123 Đường Yersin, Quận 1, TP.HCM',
    en: '123 Yersin Street, District 1, HCMC',
    fr: '123 Rue Yersin, District 1, HCMC',
    cn: '胡志明市第一郡耶尔森街123号',
    ar: '123 شارع ييرسين، المنطقة 1، مدينة هو تشي منه',
  },
  phone: '+84 28 3822 5566',
  email: 'hello@terraheal.vn',
  hours: {
    vi: '08:00 — 21:00 (Thứ 2-CN)',
    en: '08:00 AM — 09:00 PM (Mon-Sun)',
    fr: '08h00 — 21h00 (Lun-Dim)',
    cn: '上午8点 — 晚上9点（周一至周日）',
    ar: '08:00 — 21:00 (الإثنين-الأحد)',
  },
};

export const spa6Branches = [
  {
    id: 1,
    name: {
      vi: 'Terra Heal Quận 1',
      en: 'Terra Heal District 1',
      fr: 'Terra Heal Quartier 1',
      cn: 'Terra Heal 第一郡店',
      ar: 'تيرا هيل المنطقة 1',
    },
    address: {
      vi: '123 Đường Yersin, Quận 1, TP.HCM',
      en: '123 Yersin Street, District 1, HCMC',
      fr: '123 Rue Yersin, District 1, HCMC',
      cn: '胡志明市第一郡耶尔森街123号',
      ar: '123 شارع ييرسين، المنطقة 1، مدينة هو تشي منه',
    },
    phone: '+84 28 3822 5566',
    hours: {
      vi: '08:00 — 21:00',
      en: '08:00 AM — 09:00 PM',
      fr: '08h00 — 21h00',
      cn: '上午8点 — 晚上9点',
      ar: '08:00 — 21:00',
    },
    isMain: true,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
  {
    id: 2,
    name: {
      vi: 'Terra Heal Tây Hồ',
      en: 'Terra Heal Tay Ho',
      fr: 'Terra Heal Tay Ho',
      cn: 'Terra Heal 西湖店',
      ar: 'تيرا هيل تاي هو',
    },
    address: {
      vi: '45 Đường Xuân Diệu, Quận Tây Hồ, Hà Nội',
      en: '45 Xuan Dieu Street, Tay Ho District, Hanoi',
      fr: '45 Rue Xuan Dieu, Quartier Tay Ho, Hanoi',
      cn: '河内西湖郡春妙街45号',
      ar: '45 شارع شوان دييو، منطقة تاي هو، هانوي',
    },
    phone: '+84 24 3718 7766',
    hours: {
      vi: '08:00 — 21:00',
      en: '08:00 AM — 09:00 PM',
      fr: '08h00 — 21h00',
      cn: '上午8点 — 晚上9点',
      ar: '08:00 — 21:00',
    },
    isMain: false,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
  {
    id: 3,
    name: {
      vi: 'Terra Heal Đà Lạt',
      en: 'Terra Heal Da Lat',
      fr: 'Terra Heal Da Lat',
      cn: 'Terra Heal 大叻店',
      ar: 'تيرا هيل دالات',
    },
    address: {
      vi: '78 Đường Trần Phú, Đà Lạt',
      en: '78 Tran Phu Street, Da Lat',
      fr: '78 Rue Tran Phu, Da Lat',
      cn: '大叻陈富街78号',
      ar: '78 شارع تران فو، دالات',
    },
    phone: '+84 263 382 6688',
    hours: {
      vi: '07:00 — 22:00',
      en: '07:00 AM — 10:00 PM',
      fr: '07h00 — 22h00',
      cn: '上午7点 — 晚上10点',
      ar: '07:00 — 22:00',
    },
    isMain: false,
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
  },
  {
    id: 4,
    name: {
      vi: 'Terra Heal Vinhomes Riverside',
      en: 'Terra Heal Vinhomes Riverside',
      fr: 'Terra Heal Vinhomes Riverside',
      cn: 'Terra Heal Vinhomes 滨江',
      ar: 'تيرا هيل فينهومز ريفيرايد',
    },
    address: {
      vi: 'Tầng 2, Vincom Riverside, Thủ Đức, TP.HCM',
      en: '2F, Vincom Riverside, Thu Duc, HCMC',
      fr: '2ème étage, Vincom Riverside, Thu Duc, HCMC',
      cn: '胡志明市首添 Vincom 滨江2楼',
      ar: 'الطابق 2، فينكوم ريفيرايد، ثو دوك، مدينة هو تشي منه',
    },
    phone: '+84 28 3744 8899',
    hours: {
      vi: '09:00 — 20:00',
      en: '09:00 AM — 08:00 PM',
      fr: '09h00 — 20h00',
      cn: '上午9点 — 晚上8点',
      ar: '09:00 — 20:00',
    },
    isMain: false,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    id: 5,
    name: {
      vi: 'Terra Heal Retreat Center',
      en: 'Terra Heal Retreat Center',
      fr: 'Centre de Retraite Terra Heal',
      cn: 'Terra Heal 静修中心',
      ar: 'مركز خلوات تيرا هيل',
    },
    address: {
      vi: 'Khu nghỉ dưỡng Suối Giáng, Đà Lạt',
      en: 'Suoi Giang Retreat Area, Da Lat',
      fr: 'Zone de retraite Suoi Giang, Da Lat',
      cn: '大叻 Suoi Giang 静修区',
      ar: 'منطقة خلوة سووي جيانغ، دالات',
    },
    phone: '+84 263 382 0099',
    hours: {
      vi: '07:00 — 21:00',
      en: '07:00 AM — 09:00 PM',
      fr: '07h00 — 21h00',
      cn: '上午7点 — 晚上9点',
      ar: '07:00 — 21:00',
    },
    isMain: false,
    isRetreat: true,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
  },
];

// ----------------------------------------------------------------------

export const spa6Gallery = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    alt: {
      vi: 'Không gian chữa lành',
      en: 'Healing space',
      fr: 'Espace de guérison',
      cn: '治愈空间',
      ar: 'مساحة الشفاء',
    },
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    alt: {
      vi: 'Phòng Ayurveda',
      en: 'Ayurveda room',
      fr: 'Salle Ayurveda',
      cn: '阿育吠陀房间',
      ar: 'غرفة الأيورفيدا',
    },
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    alt: {
      vi: 'Liệu trình Abhyanga',
      en: 'Abhyanga treatment',
      fr: 'Soins Abhyanga',
      cn: 'Abhyanga 疗程',
      ar: 'علاج أبهيانجا',
    },
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    alt: {
      vi: 'Forest Bathing',
      en: 'Forest Bathing',
      fr: 'Forest Bathing',
      cn: '森林浴',
      ar: 'الاستحمام في الغابة',
    },
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1611073615830-9f2f0508d72f?w=800&q=80',
    alt: {
      vi: 'Boreh Bali',
      en: 'Boreh Bali',
      fr: 'Boreh Bali',
      cn: 'Boreh 巴厘岛',
      ar: 'بوريه بالي',
    },
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    alt: {
      vi: 'Xông hơi thảo mộc',
      en: 'Herbal steam',
      fr: "Vapeur d'herbes",
      cn: '草本蒸汽',
      ar: 'البخار العشبي',
    },
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80',
    alt: {
      vi: 'Retreat center',
      en: 'Retreat center',
      fr: 'Centre de retraite',
      cn: '静修中心',
      ar: 'مركز الخلوة',
    },
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    alt: {
      vi: 'Phòng thiền',
      en: 'Meditation room',
      fr: 'Salle de méditation',
      cn: '冥想室',
      ar: 'غرفة التأمل',
    },
  },
];

// ----------------------------------------------------------------------

export const spa6FaqCategories = [
  {
    id: 'dosha',
    label: {
      vi: 'Dosha & Ayurveda',
      en: 'Dosha & Ayurveda',
      fr: 'Dosha & Ayurveda',
      cn: 'Dosha 与阿育吠陀',
      ar: 'الدوشا والأيورفيدا',
    },
  },
  {
    id: 'treatments',
    label: { vi: 'Liệu trình', en: 'Treatments', fr: 'Soins', cn: '疗程', ar: 'العلاجات' },
  },
  {
    id: 'retreats',
    label: { vi: 'Retreat', en: 'Retreats', fr: 'Retraites', cn: '静修', ar: 'الخلوات' },
  },
  {
    id: 'booking',
    label: { vi: 'Đặt lịch', en: 'Booking', fr: 'Réservation', cn: '预约', ar: 'الحجز' },
  },
];

export const spa6Faqs = [
  {
    id: 1,
    category: 'dosha',
    question: {
      vi: 'Dosha là gì và tại sao nó quan trọng?',
      en: 'What is Dosha and why is it important?',
      fr: "Qu'est-ce que le Dosha et pourquoi est-il important?",
      cn: '什么是 Dosha？为什么它很重要？',
      ar: 'ما هو الدوشا ولماذا هو مهم؟',
    },
    answer: {
      vi: 'Dosha là ba năng lượng sinh học (Vata, Pitta, Kapha) chi phối mọi hoạt động trong cơ thể. Việc hiểu Dosha của bạn giúp chọn liệu trình và dinh dưỡng phù hợp.',
      en: 'Dosha refers to three biological energies (Vata, Pitta, Kapha) that govern all processes in the body. Understanding your Dosha helps select appropriate treatments and diet.',
      fr: "Le Dosha désigne trois énergies biologiques (Vata, Pitta, Kapha) qui régissent tous les processus du corps. Comprendre votre Dosha aide à choisir les traitements et l'alimentation appropriés.",
      cn: 'Dosha 指的是三种生物能量（瓦塔、皮塔、卡法），它们支配着身体的所有过程。了解您的 Dosha 有助于选择合适的疗程和饮食。',
      ar: 'يشير الدوشا إلى ثلاث طاقات بيولوجية (فاتا، بيتا، كافا) تحكم جميع عمليات الجسم. فهم الدوشا الخاص بك يساعد في اختيار العلاجات والنظام الغذائي المناسب.',
    },
  },
  {
    id: 2,
    category: 'treatments',
    question: {
      vi: 'Liệu trình Abhyanga có phù hợp với người mới?',
      en: 'Is Abhyanga treatment suitable for beginners?',
      fr: 'Le soins Abhyanga convient-il aux débutants?',
      cn: 'Abhyanga 疗程适合初学者吗？',
      ar: 'هل علاج أبهيانجا مناسب للمبتدئين؟',
    },
    answer: {
      vi: 'Abhyanga là liệu trình nền tảng của Ayurveda, rất phù hợp với mọi đối tượng. Dầu được chọn theo Dosha của bạn sau khi được tư vấn.',
      en: 'Abhyanga is a foundational Ayurvedic treatment, perfectly suitable for everyone. Oils are selected according to your Dosha after consultation.',
      fr: 'Abhyanga est un traitement ayurvédique fondamental, parfaitement adapté à tous. Les huiles sont sélectionnées selon votre Dosha après consultation.',
      cn: 'Abhyanga 是阿育吠陀的基础疗程，非常适合所有人。精油在咨询后根据您的 Dosha 选择。',
      ar: 'أبهيانجا هو علاج أيورفيدا أساسي مناسب تمامًا للجميع. تُختار الزيوت حسب الدوشا الخاص بك بعد الاستشارة.',
    },
  },
  {
    id: 3,
    category: 'retreats',
    question: {
      vi: 'Retreat Panchakarma khác gì với các gói khác?',
      en: 'How is Panchakarma retreat different from other packages?',
      fr: 'En quoi la retraite Panchakarma diffère-t-elle des autres forfaits?',
      cn: 'Panchakarma 静修与其他套餐有什么不同？',
      ar: 'كيف تختلف خلوة بانشاكارما عن الحزم الأخرى؟',
    },
    answer: {
      vi: 'Panchakarma là chương trình detox toàn diện 7 ngày theo y học Ayurveda cổ đại, bao gồm 5 bước thanh lọc sâu. Không khuyến nghị cho người mới hoặc phụ nữ mang thai.',
      en: 'Panchakarma is a comprehensive 7-day detox program based on ancient Ayurvedic medicine, including 5 deep purification steps. Not recommended for beginners or pregnant women.',
      fr: 'Panchakarma est un programme de détox complet de 7 jours basé sur la médecine ayurvédique ancienne, comprenant 5 étapes de purification profonde. Non recommandé pour les débutants ou les femmes enceintes.',
      cn: 'Panchakarma 是基于古老阿育吠陀医学的全面7天排毒计划，包含5个深层净化步骤。不建议初学者或孕妇参加。',
      ar: 'بانشاكارما هو برنامج إزالة سموم شامل لمدة 7 أيام قائم على طب الأيورفيدا القديم، يشمل 5 خطوات تنقية عميقة. غير موصى به للمبتدئين أو الحوامل.',
    },
  },
  {
    id: 4,
    category: 'booking',
    question: {
      vi: 'Cần chuẩn bị gì trước khi đến Terra Heal?',
      en: 'What should I prepare before visiting Terra Heal?',
      fr: 'Que dois-je préparer avant de visiter Terra Heal?',
      cn: '去 Terra Heal 之前需要准备什么？',
      ar: 'ماذا يجب أن أحضر قبل زيارة تيرا هيل؟',
    },
    answer: {
      vi: 'Không cần chuẩn bị gì đặc biệt. Chúng tôi sẽ tư vấn Dosha và chọn liệu trình phù hợp. Nên đến trước 15 phút để thư giãn.',
      en: 'No special preparation needed. We will consult on your Dosha and select the appropriate treatment. Arrive 15 minutes early to relax.',
      fr: "Aucune préparation spéciale nécessaire. Nous vous conseillerons sur votre Dosha et sélectionnerons le traitement approprié. Arrivez 15 minutes à l'avance pour vous détendre.",
      cn: '不需要特别准备。我们会咨询您的 Dosha 并选择合适的疗程。建议提前15分钟到达以放松身心。',
      ar: 'لا حاجة لتحضير خاص. سنقدم استشارة حول الدوشا الخاص بك ونختار العلاج المناسب. احضر قبل 15 دقيقة للاسترخاء.',
    },
  },
  {
    id: 5,
    category: 'treatments',
    question: {
      vi: 'Forest Bathing diễn ra như thế nào?',
      en: 'How does Forest Bathing work?',
      fr: 'Comment fonctionne le Forest Bathing?',
      cn: '森林浴如何进行？',
      ar: 'كيف يعمل الاستحمام في الغابة؟',
    },
    answer: {
      vi: 'Forest Bathing diễn ra trong không gian xanh của Terra Heal, không phải trong rừng tự nhiên. Hướng dẫn viên sẽ dẫn bạn qua các bước thở và thiền với âm thanh thiên nhiên.',
      en: "Forest Bathing takes place in Terra Heal's green space, not a natural forest. The guide will lead you through breathing and meditation steps with natural sounds.",
      fr: "Le Forest Bathing a lieu dans l'espace vert de Terra Heal, pas en forêt naturelle. Le guide vous guidera à travers les étapes de respiration et de méditation avec des sons naturels.",
      cn: '森林浴在 Terra Heal 的绿色空间进行，而非自然森林。向导将引导您配合自然声音进行呼吸和冥想步骤。',
      ar: 'يتم الاستحمام في الغابة في المساحة الخضراء لتيرا هيل، وليس في غابة طبيعية. سيقودك المرشد خلال خطوات التنفس والتأمل مع أصوات طبيعية.',
    },
  },
];

// ----------------------------------------------------------------------

export const spa6Packages = [
  {
    id: 'healing-weekend',
    name: {
      vi: 'Cuối Tuần Chữa Lành',
      en: 'Healing Weekend',
      fr: 'Week-end de Guérison',
      cn: '疗愈周末',
      ar: 'عطلة نهاية أسبوع للشفاء',
    },
    duration: {
      vi: '2 ngày 1 đêm',
      en: '2 days 1 night',
      fr: '2 jours 1 nuit',
      cn: '2 天 1 夜',
      ar: 'يومان وليلة',
    },
    price: { vi: '3.500.000₫', en: '$140', fr: '140€', cn: '￥1,000', ar: '525 ر.س' },
    popular: false,
    color: FOREST,
    description: {
      vi: 'Bước đầu tiên vào thế giới thiên nhiên trị liệu',
      en: 'Your first step into the world of natural therapy',
      fr: 'Votre premier pas dans le monde de la thérapie naturelle',
      cn: '踏入自然疗愈世界的第一步',
      ar: 'خطوتك الأولى إلى عالم العلاج الطبيعي',
    },
    includes: {
      vi: [
        '1 liệu trình Abhyanga (90 phút)',
        '1 buổi Yoga buổi sáng',
        'Bữa ăn chay organic 2 bữa',
        'Phòng ngủ giường đôi',
        'Tư vấn Dosha cá nhân',
      ],
      en: [
        '1 Abhyanga treatment (90 min)',
        '1 morning yoga session',
        '2 organic vegetarian meals',
        'Double room',
        'Personal Dosha consultation',
      ],
      fr: [
        '1 soin Abhyanga (90 min)',
        '1 séance de yoga matinale',
        '2 repas végétariens bio',
        'Chambre double',
        'Consultation Dosha personnalisée',
      ],
      cn: [
        '1 次 Abhyanga 疗程（90 分钟）',
        '1 次晨间瑜伽',
        '2 餐有机素食',
        '双人房',
        '个人 Dosha 咨询',
      ],
      ar: [
        'جلسة أبهيانجا واحدة (90 دقيقة)',
        'جلسة يوجا صباحية واحدة',
        'وجبتان نباتيتان عضويتان',
        'غرفة مزدوجة',
        'استشارة دوشا شخصية',
      ],
    },
  },
  {
    id: 'transformation-5day',
    name: {
      vi: 'Retreat Chuyển Hóa 5 Ngày',
      en: '5-Day Transformation Retreat',
      fr: 'Retraite Transformation 5 Jours',
      cn: '5 天蜕变静修',
      ar: 'خلوة التحول 5 أيام',
    },
    duration: {
      vi: '5 ngày 4 đêm',
      en: '5 days 4 nights',
      fr: '5 jours 4 nuits',
      cn: '5 天 4 夜',
      ar: '5 أيام و4 ليالٍ',
    },
    price: { vi: '12.500.000₫', en: '$500', fr: '500€', cn: '￥3,600', ar: '1,875 ر.س' },
    popular: true,
    color: TERRACOTTA,
    description: {
      vi: 'Chương trình chuyển hóa toàn diện được nhiều khách yêu thích',
      en: 'The comprehensive transformation program our guests love most',
      fr: 'Le programme de transformation complet que nos clients préfèrent',
      cn: '深受客人喜爱的全面蜕变计划',
      ar: 'برنامج التحول الشامل الأكثر تفضيلاً لدى ضيوفنا',
    },
    includes: {
      vi: [
        '5 liệu trình (tự chọn)',
        '2 buổi Forest Bathing',
        'Ăn 3 bữa/ngày chế độ Sattvic',
        'Phòng Deluxe có ban công',
        'Lớp học nấu ăn thảo dược',
        'Bộ sản phẩm terra mang về',
      ],
      en: [
        '5 treatments (your choice)',
        '2 Forest Bathing sessions',
        '3 Sattvic meals/day',
        'Deluxe room with balcony',
        'Herbal cooking class',
        'Terra take-home product kit',
      ],
      fr: [
        '5 soins (au choix)',
        '2 séances de Forest Bathing',
        '3 repas Sattvic/jour',
        'Chambre Deluxe avec balcon',
        'Cours de cuisine aux herbes',
        'Kit de produits terra à emporter',
      ],
      cn: [
        '5 次疗程（自选）',
        '2 次森林浴',
        '每日 3 餐萨提瓦饮食',
        '带阳台豪华房',
        '草本烹饪课',
        'terra 伴手礼产品套装',
      ],
      ar: [
        '5 جلسات (باختيارك)',
        'جلستا استحمام في الغابة',
        '3 وجبات ساتفية يومياً',
        'غرفة ديلوكس مع شرفة',
        'درس طبخ بالأعشاب',
        'مجموعة منتجات terra للمنزل',
      ],
    },
  },
  {
    id: 'panchakarma-7day',
    name: {
      vi: 'Panchakarma 7 Ngày',
      en: '7-Day Panchakarma',
      fr: 'Panchakarma 7 Jours',
      cn: '7 天五业排毒',
      ar: 'بانشاكارما 7 أيام',
    },
    duration: {
      vi: '7 ngày 6 đêm',
      en: '7 days 6 nights',
      fr: '7 jours 6 nuits',
      cn: '7 天 6 夜',
      ar: '7 أيام و6 ليالٍ',
    },
    price: { vi: '21.000.000₫', en: '$840', fr: '840€', cn: '￥6,000', ar: '3,150 ر.س' },
    popular: false,
    color: BROWN,
    description: {
      vi: 'Chương trình detox toàn diện theo y học Ayurveda cổ đại',
      en: 'Complete detox program based on ancient Ayurvedic medicine',
      fr: 'Programme de détox complet basé sur la médecine ayurvédique ancienne',
      cn: '基于古老阿育吠陀医学的全面排毒计划',
      ar: 'برنامج تخلص من السموم شامل قائم على طب الأيورفيدا القديم',
    },
    includes: {
      vi: [
        '7 liệu trình cao cấp hàng ngày',
        'Panchakarma đầy đủ 5 bước',
        'Chế độ ăn Ayurveda tùy chỉnh',
        'Phòng Suite riêng tư',
        'Thiền hàng ngày với thầy',
        'Tư vấn dinh dưỡng 6 tuần sau',
        'Bộ thảo dược tại nhà trọn gói',
      ],
      en: [
        '7 premium daily treatments',
        'Complete 5-step Panchakarma',
        'Custom Ayurvedic diet plan',
        'Private suite',
        'Daily meditation with master',
        '6-week post-retreat nutrition consult',
        'Full home herbal kit',
      ],
      fr: [
        '7 soins premium quotidiens',
        'Panchakarma complet en 5 étapes',
        'Plan alimentaire ayurvédique personnalisé',
        'Suite privée',
        'Méditation quotidienne avec un maître',
        'Suivi nutritionnel 6 semaines après',
        "Kit d'herbes complet à la maison",
      ],
      cn: [
        '每日 7 次高端疗程',
        '完整 5 步五业排毒',
        '定制阿育吠陀饮食计划',
        '私人套房',
        '每日与大师冥想',
        '静修后 6 周营养咨询',
        '全套居家草本包',
      ],
      ar: [
        '7 جلسات علاج فاخرة يومياً',
        'بانشاكارما كاملة من 5 خطوات',
        'خطة غذائية أيورفيدية مخصصة',
        'جناح خاص',
        'تأمل يومي مع معلّم',
        'استشارة تغذية لمدة 6 أسابيع بعد الخلوة',
        'مجموعة أعشاب منزلية كاملة',
      ],
    },
  },
];

// ----------------------------------------------------------------------

export const spa6BeforeAfters = [
  {
    id: 1,
    name: 'Mai, 35 tuổi',
    concern: {
      vi: 'Căng thẳng, rối loạn giấc ngủ',
      en: 'Stress, sleep disorder',
      fr: 'Stress, troubles du sommeil',
      cn: '压力、睡眠障碍',
      ar: 'التوتر، اضطراب النوم',
    },
    treatment: {
      vi: 'Abhyanga + Shirodhara (5 buổi)',
      en: 'Abhyanga + Shirodhara (5 sessions)',
      fr: 'Abhyanga + Shirodhara (5 séances)',
      cn: 'Abhyanga + Shirodhara（5 次）',
      ar: 'أبهيانجا + شيروهارا (5 جلسات)',
    },
    beforeImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&q=80',
    result: {
      vi: 'Giảm 70% lo âu, ngủ được 7 tiếng/đêm',
      en: '70% reduction in anxiety, sleeping 7 hours/night',
      fr: "Réduction de 70% de l'anxiété, 7h de sommeil/nuit",
      cn: '焦虑减少70%，每晚睡7小时',
      ar: 'انخفاض القلق بنسبة 70%، النوم 7 ساعات/ليل',
    },
  },
  {
    id: 2,
    name: 'Minh, 42 tuổi',
    concern: {
      vi: 'Đau lưng mãn tính, suy nhược',
      en: 'Chronic back pain, exhaustion',
      fr: 'Douleurs dorsales chroniques, épuisement',
      cn: '慢性背痛、衰弱',
      ar: 'آلام الظهر المزمنة، الإرهاق',
    },
    treatment: {
      vi: 'Boreh Bali + Herbal Steam (10 buổi)',
      en: 'Boreh Bali + Herbal Steam (10 sessions)',
      fr: "Boreh Bali + Vapeur d'herbes (10 séances)",
      cn: 'Boreh 巴厘岛 + 草本蒸汽（10 次）',
      ar: 'بوريه بالي + بخار عشبي (10 جلسات)',
    },
    beforeImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
    result: {
      vi: 'Hết đau lưng, tăng 5kg trọng lượng',
      en: 'Back pain gone, gained 5kg healthy weight',
      fr: 'Plus de douleurs, pris 5kg de poids santé',
      cn: '背痛消失，健康增重5公斤',
      ar: 'زوال آلام الظهر، زيادة 5 كجم وزن صحي',
    },
  },
  {
    id: 3,
    name: 'Lan, 28 tuổi',
    concern: {
      vi: 'Da xấu, mụn, mất tự tin',
      en: 'Poor skin, acne, low confidence',
      fr: 'Peau mauvaise, acné, faible confiance',
      cn: '皮肤差、痤疮、缺乏自信',
      ar: 'بشرة سيئة، حب الشباب، قلة ثقة',
    },
    treatment: {
      vi: 'Detox Ayurveda + Diet (3 tháng)',
      en: 'Ayurveda Detox + Diet (3 months)',
      fr: 'Détox Ayurveda + Régime (3 mois)',
      cn: '阿育吠陀排毒 + 饮食（3 个月）',
      ar: 'إزالة سموم أيورفيدا + نظام غذائي (3 أشهر)',
    },
    beforeImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80',
    afterImage: 'https://images.unsplash.com/photo-1611073615830-9f2f0508d72f?w=400&q=80',
    result: {
      vi: 'Da sáng mịn, hết mụn, tự tin hơn',
      en: 'Clear, radiant skin, acne gone, confident',
      fr: 'Peau claire et rayonnante, acné disparue, confiante',
      cn: '皮肤明亮光滑、痤疮消失、更自信',
      ar: 'بشرة صافية ومشرقة، زوال الحبوب، ثقة أكبر',
    },
  },
];

// ----------------------------------------------------------------------

export const spa6Promotions = [
  {
    id: 1,
    title: {
      vi: 'Đón Hè — Giảm 20%',
      en: 'Summer Welcome — 20% Off',
      fr: 'Bienvenue Été — 20% de Réduction',
      cn: '夏日迎宾 — 八折优惠',
      ar: 'ترحيب الصيف — خصم 20%',
    },
    description: {
      vi: 'Giảm 20% cho mọi liệu trình khi đặt lịch trong tháng 6.',
      en: '20% off all treatments when booking in June.',
      fr: "20% sur tous les soins lors d'une réservation en juin.",
      cn: '6 月预约所有疗程可享八折优惠。',
      ar: 'خصم 20% على جميع العلاجات عند الحجز في يونيو.',
    },
    code: 'SUMMER20',
    validUntil: '2025-06-30',
    color: TERRACOTTA,
  },
  {
    id: 2,
    title: {
      vi: 'Retreat Đôi — Tặng 1 Đêm',
      en: 'Couple Retreat — Free Night',
      fr: 'Retraite Couple — Nuit Gratuite',
      cn: '双人静修 — 送一晚',
      ar: 'خلوة للأزواج — ليلة مجانية',
    },
    treatment: {
      vi: 'Đặt retreat 5 ngày cho 2 người, được thêm 1 đêm miễn phí.',
      en: 'Book a 5-day retreat for 2, get 1 extra night free.',
      fr: 'Réservez une retraite de 5 jours pour 2, obtenez 1 nuit supplémentaire gratuite.',
      cn: '预订双人5天静修，赠送一晚。',
      ar: 'احجز خلوة 5 أيام لشخصين واحصل على ليلة إضافية مجانية.',
    },
    code: 'COUPLEFREE',
    validUntil: '2025-08-31',
    color: FOREST,
  },
  {
    id: 3,
    title: {
      vi: 'Dosha First — Tặng Dosha Test',
      en: 'Dosha First — Free Dosha Test',
      fr: 'Dosha First — Test Dosha Gratuit',
      cn: 'Dosha 首次 — 免费体质测试',
      ar: 'الدوشا أولاً — اختبار دوشا مجاني',
    },
    treatment: {
      vi: 'Khách hàng mới được tư vấn và test Dosha miễn phí (trị giá 500.000₫).',
      en: 'New clients receive a free Dosha consultation and test (worth $20).',
      fr: 'Les nouveaux clients reçoivent une consultation et un test Dosha gratuits (valeur 20€).',
      cn: '新客户可获得免费 Dosha 咨询和测试（价值￥140）。',
      ar: 'يحصل العملاء الجدد على استشارة واختبار دوشا مجاني (قيمة 80 ر.س).',
    },
    code: 'DOSHAFREE',
    validUntil: '2025-12-31',
    color: BROWN,
  },
];

// ----------------------------------------------------------------------

export const spa6Feedbacks = [
  {
    id: 1,
    name: 'Trần Lê Bảo Châu',
    role: {
      vi: 'Bác sĩ, Hà Nội',
      en: 'Doctor, Hanoi',
      fr: 'Médecin, Hanoï',
      cn: '医生，河内',
      ar: 'طبيبة، هانوي',
    },
    quote: {
      vi: 'Tôi đến Terra Heal trong tình trạng kiệt sức sau 3 năm COVID. Chương trình 5 ngày không chỉ phục hồi thể chất mà còn giúp tôi tái kết nối với bản thân.',
      en: 'I came to Terra Heal exhausted after 3 years of COVID work. The 5-day program not only restored my body but helped me reconnect with myself.',
      fr: "Je suis arrivée à Terra Heal épuisée après 3 ans de travail COVID. Le programme de 5 jours a restauré mon corps et m'a aidée à me reconnecter à moi-même.",
      cn: '经过三年的新冠抗疫工作，我带着精疲力竭来到 Terra Heal。这个5天的计划不仅修复了我的身体，还帮助我重新连接自我。',
      ar: 'جئت إلى تيرا هيل منهكة بعد 3 سنوات من عمل كوفيد. برنامج الـ5 أيام لم يستعد جسدي فحسب، بل ساعدني على إعادة التواصل مع ذاتي.',
    },
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    id: 2,
    name: 'Phạm Đức Minh',
    role: {
      vi: 'Kỹ sư xây dựng, TP.HCM',
      en: 'Civil Engineer, HCMC',
      fr: 'Ingénieur civil, HCMC',
      cn: '土木工程师，胡志明市',
      ar: 'مهندس مدني، مدينة هو تشي منه',
    },
    quote: {
      vi: 'Forest Bathing nghe có vẻ đơn giản nhưng tác động của nó rất sâu. Lần đầu tiên sau 5 năm, tôi ngủ được 8 tiếng không cần thuốc.',
      en: 'Forest Bathing sounds simple but its effects are deep. For the first time in 5 years, I slept 8 hours without medication.',
      fr: "Le Forest Bathing semble simple mais ses effets sont profonds. Pour la première fois en 5 ans, j'ai dormi 8 heures sans médicament.",
      cn: '森林浴听起来简单，但效果深远。五年来我第一次不服药连续睡了8个小时。',
      ar: 'يبدو الاستحمام في الغابة بسيطاً لكن تأثيره عميق. لأول مرة منذ 5 سنوات، نمت 8 ساعات بدون دواء.',
    },
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
  {
    id: 3,
    name: 'Lê Thị Thanh Mai',
    role: {
      vi: 'Giáo viên yoga, Đà Nẵng',
      en: 'Yoga Teacher, Da Nang',
      fr: 'Professeure de yoga, Da Nang',
      cn: '瑜伽老师，岘港',
      ar: 'مدربة يوجا، دا نانغ',
    },
    quote: {
      vi: 'Là người làm trong ngành wellness, tôi rất kỹ tính khi chọn spa. Terra Heal vượt quá kỳ vọng — Boreh Bali Ritual chuẩn như ở Ubud.',
      en: "As someone in wellness, I'm picky about spas. Terra Heal exceeded expectations — their Boreh Bali Ritual is authentic as Ubud.",
      fr: 'En tant que professionnelle du bien-être, je suis exigeante. Terra Heal a dépassé les attentes — leur Boreh Bali Ritual est authentique comme à Ubud.',
      cn: '作为从事健康行业的人，我对 spa 很挑剔。Terra Heal 超出预期——他们的 Boreh 巴厘岛仪式与乌布布一样地道。',
      ar: 'بصفتي عاملة في مجال العافية، أنا صارمة في اختيار السبا. تجاوز تيرا هيل التوقعات — طقوس بوريه بالي أصلية كما في أوبود.',
    },
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
  },
];

// ----------------------------------------------------------------------

export const spa6Offers = [
  {
    id: 1,
    title: {
      vi: 'Liệu Trình Thử Nghiệm',
      en: 'Trial Treatment',
      fr: 'Soins Découverte',
      cn: '体验疗程',
      ar: 'علاج تجريبي',
    },
    description: {
      vi: 'Thử nghiệm liệu trình với giá ưu đãi cho khách hàng mới.',
      en: 'Try treatments at a special price for new clients.',
      fr: 'Essayez les soins à prix spécial pour nouveaux clients.',
      cn: '新客户以优惠价格体验疗程。',
      ar: 'جرب العلاجات بسعر خاص للعملاء الجدد.',
    },
    price: { vi: '500.000₫', en: '$20', fr: '20€', cn: '￥140', ar: '75 ر.س' },
    originalPrice: { vi: '950.000₫', en: '$38', fr: '38€', cn: '￥280', ar: '150 ر.س' },
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
  },
  {
    id: 2,
    title: {
      vi: 'Combo 5 Liệu Trình',
      en: '5-Treatment Combo',
      fr: 'Combo 5 Soins',
      cn: '5 次疗程套餐',
      ar: 'باقة 5 علاجات',
    },
    description: {
      vi: 'Mua 5 liệu trình, tiết kiệm 25% và được tặng 1 liệu trình miễn phí.',
      en: 'Buy 5 treatments, save 25% and get 1 free treatment.',
      fr: 'Achetez 5 soins, économisez 25% et recevez 1 soin gratuit.',
      cn: '购买5次疗程，节省25%并赠送1次免费疗程。',
      ar: 'اشترِ 5 علاجات، وفّر 25% واحصل على علاج مجاني.',
    },
    price: { vi: '3.800.000₫', en: '$152', fr: '152€', cn: '￥1,080', ar: '570 ر.س' },
    originalPrice: { vi: '5.700.000₫', en: '$228', fr: '228€', cn: '￥1,680', ar: '855 ر.س' },
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80',
  },
  {
    id: 3,
    title: {
      vi: 'Member Terra',
      en: 'Terra Membership',
      fr: 'Adhésion Terra',
      cn: 'Terra 会员',
      ar: 'عضوية تيرا',
    },
    description: {
      vi: 'Thành viên Terra được ưu đãi 15% mọi liệu trình, ưu tiên đặt lịch và sử dụng không gian thiền.',
      en: 'Terra members get 15% off all treatments, priority booking, and meditation space access.',
      fr: "Les membres Terra ont 15% sur tous les soins, réservation prioritaire et accès à l'espace méditation.",
      cn: 'Terra 会员可享所有疗程15%折扣、优先预约及冥想空间使用。',
      ar: 'يحصل أعضاء تيرا على خصم 15% على جميع العلاجات، حجز أولوي، ووصول لمساحة التأمل.',
    },
    price: {
      vi: '2.000.000₫/năm',
      en: '$80/year',
      fr: '80€/an',
      cn: '￥560/年',
      ar: '300 ر.س/سنة',
    },
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
  },
];

// ----------------------------------------------------------------------

export const spa6Partners = [
  {
    id: 1,
    name: 'Ayurveda Association of India',
    logo: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=200&q=80',
    description: {
      vi: 'Đối tác đào tạo và chứng nhận',
      en: 'Training and certification partner',
      fr: 'Partenaire formation et certification',
      cn: '培训和认证伙伴',
      ar: 'شريك التدريب والاعتماد',
    },
  },
  {
    id: 2,
    name: 'Vietnam Yoga Federation',
    logo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80',
    description: {
      vi: 'Đối tác yoga và thiền',
      en: 'Yoga and meditation partner',
      fr: 'Partenaire yoga et méditation',
      cn: '瑜伽和冥想伙伴',
      ar: 'شريك اليوجا والتأمل',
    },
  },
  {
    id: 3,
    name: 'Organic Farm Da Lat',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
    description: {
      vi: 'Nhà cung cấp thảo dược organic',
      en: 'Organic herb supplier',
      fr: "Fournisseur d'herbes bio",
      cn: '有机草药供应商',
      ar: 'مورد الأعشاب العضوية',
    },
  },
  {
    id: 4,
    name: 'Wellness Tourism Association',
    logo: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=200&q=80',
    description: {
      vi: 'Thành viên hiệp hội du lịch wellness',
      en: 'Wellness tourism association member',
      fr: 'Membre association tourisme bien-être',
      cn: '健康旅游协会会员',
      ar: 'عضو جمعية السياحة العلاجية',
    },
  },
];

// ----------------------------------------------------------------------

export const spa6Policies = [
  {
    id: 'booking',
    title: {
      vi: 'Chính sách đặt lịch',
      en: 'Booking Policy',
      fr: 'Politique de Réservation',
      cn: '预约政策',
      ar: 'سياسة الحجز',
    },
    content: {
      vi: 'Vui lòng đến trước 15 phút. Hoãn lịch trước 24 giờ được hoàn phí. Hoãn lịch sau 24 giờ sẽ tính 50% phí liệu trình.',
      en: 'Please arrive 15 minutes early. Cancellations 24 hours in advance receive a full refund. Cancellations within 24 hours will be charged 50% of the treatment fee.',
      fr: "Veuillez arriver 15 minutes à l'avance. Les annulations 24h à l'avance sont entièrement remboursées. Les annulations moins de 24h seront facturées à 50%.",
      cn: '请提前15分钟到达。提前24小时取消可全额退款。24小时内取消将收取50%疗程费用。',
      ar: 'يرجى الحضور قبل 15 دقيقة. الإلغاء قبل 24 ساعة يسترد المبلغ بالكامل. الإلغاء خلال 24 ساعة يُحاسب بنسبة 50%.',
    },
  },
  {
    id: 'health',
    title: {
      vi: 'Chính sách sức khỏe',
      en: 'Health Policy',
      fr: 'Politique de Santé',
      cn: '健康政策',
      ar: 'سياسة الصحة',
    },
    content: {
      vi: 'Vui lòng thông báo cho chúng tôi về các vấn đề sức khỏe, dị ứng hoặc mang thai. Chúng tôi sẽ điều chỉnh liệu trình phù hợp với tình trạng của bạn.',
      en: 'Please inform us of any health issues, allergies, or pregnancy. We will adjust treatments to suit your condition.',
      fr: 'Veuillez nous informer de tout problème de santé, allergie ou grossesse. Nous adapterons les soins à votre condition.',
      cn: '请告知我们任何健康问题、过敏或怀孕情况。我们会根据您的状况调整疗程。',
      ar: 'يرجى إبلاغنا بأي مشاكل صحية أو حساسية أو حمل. سن调整 العلاجات لتناسب حالتك.',
    },
  },
  {
    id: 'retreat',
    title: {
      vi: 'Chính sách Retreat',
      en: 'Retreat Policy',
      fr: 'Politique de Retraite',
      cn: '静修政策',
      ar: 'سياسة الخلوة',
    },
    content: {
      vi: 'Để đạt hiệu quả tối đa, khách tham gia retreat được yêu cầu duy trì chế độ ăn và sinh hoạt theo hướng dẫn. Rời retreat giữa chừng sẽ không được hoàn phí.',
      en: 'For optimal results, retreat guests are asked to maintain the guided diet and lifestyle. Leaving the retreat early will not be refunded.',
      fr: 'Pour des résultats optimaux, les clients en retraite doivent suivre le régime et le mode de vie guidés. Quitter la retraite tôt ne sera pas remboursé.',
      cn: '为达到最佳效果，静修客人须保持指导饮食和生活方式。中途退出静修不予退款。',
      ar: 'للحصول على أفضل النتائج، يُطلب من ضيوف الخلوة اتباع النظام الغذائي ونمط الحياة الموجه. مغادرة الخلوة مبكرًا لن تُسترد.',
    },
  },
];
