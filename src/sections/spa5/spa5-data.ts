// ----------------------------------------------------------------------

export type Spa5Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export const SPA5_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1920&q=80',
  heroRight: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=900&q=80',
  ritual1: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
  ritual2: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80',
  ritual3: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
  ritual4: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  booking: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=1200&q=80',
};

export const SPA5_RITUALS = [
  {
    number: '01',
    title: {
      vi: 'Bain Thermal',
      en: 'Thermal Bath',
      fr: 'Bain Thermal',
      cn: '温泉浴',
      ar: 'حمام حراري',
    },
    subtitle: {
      vi: 'Liệu pháp nước nóng khoáng',
      en: 'Mineral hot spring therapy',
      fr: 'Thérapie aux eaux thermales minérales',
      cn: '矿物温泉疗法',
      ar: 'علاج بالينابيع المعدنية الساخنة',
    },
    description: {
      vi: 'Đắm mình trong bể nước khoáng nhiệt độ 38–42°C, giàu magie và canxi. Giúp giãn cơ sâu, cải thiện tuần hoàn và thải độc qua lỗ chân lông. Kết thúc với tắm lạnh kích thích theo phong cách spa Pháp cổ điển.',
      en: 'Immerse yourself in mineral thermal baths at 38–42°C, rich in magnesium and calcium. Deep muscle relaxation, improved circulation and pore-level detoxification. Concludes with a cold plunge in classic French spa tradition.',
      fr: 'Plongez dans des bains thermaux minéraux à 38–42°C, riches en magnésium et en calcium. Relaxation musculaire profonde, meilleure circulation et détoxification des pores. Se termine par un bain froid dans la pure tradition des spas français.',
      cn: '沉浸在 38–42°C 富含镁和钙的矿物温泉中。深层放松肌肉，促进血液循环，并通过毛孔排毒。最后以经典法式水疗传统的冷水浴收尾。',
      ar: 'انغمس في حمامات معدنية حرارية بدرجة 38–42°م، غنية بالمغنيسيوم والكالسيوم. استرخاء عميق للعضلات، تحسين الدورة الدموية وتنقية المسام. يُختتم بغطسة باردة على الطراز الفرنسي الكلاسيكي.',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 min', ar: '60 min' },
    price: { vi: '890.000₫', en: '890,000₫', fr: '890,000₫', cn: '890,000₫', ar: '890,000₫' },
    color: '#1A1A3E',
    accentColor: '#C9A84C',
    icon: 'solar:water-sun-bold-duotone',
  },
  {
    number: '02',
    title: {
      vi: 'Vinothérapie',
      en: 'Vinotherapy',
      fr: 'Vinothérapie',
      cn: '红酒疗法',
      ar: 'العلاج بالنبيذ',
    },
    subtitle: {
      vi: 'Liệu pháp rượu nho',
      en: 'Red wine grape therapy',
      fr: 'Thérapie au raisin et vin rouge',
      cn: '红葡萄酒葡萄疗法',
      ar: 'علاج بعنب النبيذ الأحمر',
    },
    description: {
      vi: 'Phương pháp trẻ hóa độc quyền từ vùng Bordeaux — sử dụng polyphenol nho đỏ và dầu hạt nho. Chống oxy hóa mạnh mẽ, phục hồi collagen, làm sáng và căng da toàn thân. Hương thơm ngây ngất của nho chín.',
      en: 'An exclusive rejuvenation method from Bordeaux — using red grape polyphenols and grape seed oil. Powerful antioxidant, collagen restoration, brightening and firming the entire body. The intoxicating aroma of ripe grapes.',
      fr: "Une méthode de rajeunissement exclusive de Bordeaux — à base de polyphénols de raisin rouge et d'huile de pépins de raisin. Puissant antioxydant, restauration du collagène, éclat et fermeté de tout le corps. L'arôme enivrant des raisins mûrs.",
      cn: '源自波尔多的专属焕活疗法——采用红葡萄多酚与葡萄籽油。强效抗氧化，修复胶原蛋白，使全身肌肤亮泽紧致。成熟葡萄的醉人芳香。',
      ar: 'طريقة تجديد حصرية من بوردو — باستخدام مادة البوليفينول من العنب الأحمر وزيت بذور العنب. مضاد قوي للأكسدة، يجدد الكولاجين، ويمنح الجسم كله إشراقًا وشدًّا. عبق العنب الناضج المُسكِر.',
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 min', ar: '90 min' },
    price: {
      vi: '1.290.000₫',
      en: '1,290,000₫',
      fr: '1,290,000₫',
      cn: '1,290,000₫',
      ar: '1,290,000₫',
    },
    color: '#3D0C11',
    accentColor: '#C9A84C',
    icon: 'solar:leaf-bold-duotone',
  },
  {
    number: '03',
    title: {
      vi: 'Thalassothérapie',
      en: 'Thalassotherapy',
      fr: 'Thalassothérapie',
      cn: '海洋疗法',
      ar: 'العلاج بمياه البحر',
    },
    subtitle: {
      vi: 'Liệu pháp biển sâu',
      en: 'Deep sea mineral therapy',
      fr: 'Thérapie minérale des grands fonds',
      cn: '深海矿物疗法',
      ar: 'علاج معدني من أعماق البحار',
    },
    description: {
      vi: 'Bùn và tảo biển từ biển Brittany kết hợp massage áp lực nước. Khoáng chất biển phục hồi da, tăng cường miễn dịch và điều hoà hormone. Trải nghiệm sự mạnh mẽ thanh lọc của đại dương ngay giữa lòng thành phố.',
      en: 'Seaweed and sea mud from Brittany combined with hydro-massage. Ocean minerals restore the skin, boost immunity and balance hormones. Experience the purifying power of the ocean in the heart of the city.',
      fr: "Algues et boue marine de Bretagne associées à un hydromassage. Les minéraux marins restaurent la peau, renforcent l'immunité et équilibrent les hormones. Découvrez la force purifiante de l'océan au cœur de la ville.",
      cn: '来自布列塔尼的海藻与海泥，结合水疗按摩。海洋矿物质修复肌肤、增强免疫力并平衡荷尔蒙。在城市中心感受海洋的净化力量。',
      ar: 'أعشاب وطين بحري من بريتاني مع تدليك مائي. تعيد المعادن البحرية حيوية البشرة وتعزز المناعة وتوازن الهرمونات. اختبر قوة المحيط المنقّية في قلب المدينة.',
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 min', ar: '75 min' },
    price: {
      vi: '1.050.000₫',
      en: '1,050,000₫',
      fr: '1,050,000₫',
      cn: '1,050,000₫',
      ar: '1,050,000₫',
    },
    color: '#0A2540',
    accentColor: '#C9A84C',
    icon: 'solar:stars-bold-duotone',
  },
  {
    number: '04',
    title: {
      vi: 'Bain de Boue',
      en: 'Mud Cocoon',
      fr: 'Bain de Boue',
      cn: '泥浆茧疗',
      ar: 'شرنقة الطين',
    },
    subtitle: {
      vi: 'Ủ bùn khoáng Pháp',
      en: 'French mineral clay wrap',
      fr: "Enveloppement à l'argile minérale",
      cn: '法式矿物泥裹敷',
      ar: 'لفّة الطين المعدني الفرنسي',
    },
    description: {
      vi: 'Đất sét kaolinite và illite từ Périgord Noir được làm ấm đến 42°C. Tác động nhiệt sâu giúp giảm đau khớp, thanh lọc gan thận, làm mềm và đều màu da toàn thân. Liệu trình được yêu thích nhất của chúng tôi.',
      en: 'Kaolinite and illite clay from Périgord Noir heated to 42°C. Deep thermal action reduces joint pain, cleanses liver and kidneys, softens and evens skin tone. Our most beloved treatment.',
      fr: 'Argile kaolinite et illite du Périgord Noir chauffée à 42°C. Une action thermique profonde soulage les douleurs articulaires, purifie le foie et les reins, adoucit et unifie le teint. Notre soin le plus apprécié.',
      cn: '来自佩里戈尔黑地区的高岭石与伊利石黏土，加热至 42°C。深层热力作用缓解关节疼痛，净化肝肾，柔润并均匀肤色。我们最受欢迎的疗程。',
      ar: 'طين الكاولينيت والإيليت من بيريغور نوار مُسخّن إلى 42°م. عمل حراري عميق يخفف آلام المفاصل، ينقّي الكبد والكلى، ويُنعّم البشرة ويوحّد لونها. أكثر علاجاتنا تفضيلًا.',
    },
    duration: { vi: '80 phút', en: '80 min', fr: '80 min', cn: '80 min', ar: '80 min' },
    price: {
      vi: '1.150.000₫',
      en: '1,150,000₫',
      fr: '1,150,000₫',
      cn: '1,150,000₫',
      ar: '1,150,000₫',
    },
    color: '#2C1810',
    accentColor: '#C9A84C',
    icon: 'solar:mountains-bold-duotone',
  },
];

export const SPA5_TREATMENTS = [
  {
    category: {
      vi: 'Thuỷ Liệu Pháp',
      en: 'Hydrotherapy',
      fr: 'Hydrothérapie',
      cn: '水疗法',
      ar: 'العلاج المائي',
    },
    items: [
      {
        name: {
          vi: 'Bain à remous (Jacuzzi trị liệu)',
          en: 'Bain à remous (Therapeutic jacuzzi)',
          fr: 'Bain à remous (Jacuzzi thérapeutique)',
          cn: '气泡浴（理疗按摩浴缸）',
          ar: 'حوض الدوامة (جاكوزي علاجي)',
        },
        duration: { vi: '30 phút', en: '30 min', fr: '30 min', cn: '30 min', ar: '30 min' },
        price: { vi: '450.000₫', en: '450,000₫', fr: '450,000₫', cn: '450,000₫', ar: '450,000₫' },
      },
      {
        name: {
          vi: 'Douche Vichy (Vòi hoa sen 7 vòi)',
          en: 'Douche Vichy (7-nozzle rain shower)',
          fr: 'Douche Vichy (douche pluie 7 jets)',
          cn: '维希淋浴（7喷头雨淋浴）',
          ar: 'دش فيشي (دش مطري بـ 7 فوهات)',
        },
        duration: { vi: '45 phút', en: '45 min', fr: '45 min', cn: '45 min', ar: '45 min' },
        price: { vi: '680.000₫', en: '680,000₫', fr: '680,000₫', cn: '680,000₫', ar: '680,000₫' },
      },
      {
        name: {
          vi: 'Circuit Thermal complet',
          en: 'Full Thermal Circuit',
          fr: 'Circuit Thermal complet',
          cn: '完整温泉循环',
          ar: 'دورة حرارية كاملة',
        },
        duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 min', ar: '120 min' },
        price: {
          vi: '1.500.000₫',
          en: '1,500,000₫',
          fr: '1,500,000₫',
          cn: '1,500,000₫',
          ar: '1,500,000₫',
        },
      },
    ],
  },
  {
    category: {
      vi: 'Massage & Soins',
      en: 'Massage & Body',
      fr: 'Massage & Soins du corps',
      cn: '按摩与身体护理',
      ar: 'تدليك والعناية بالجسم',
    },
    items: [
      {
        name: {
          vi: 'Massage Suédois classique',
          en: 'Classic Swedish Massage',
          fr: 'Massage Suédois classique',
          cn: '经典瑞典式按摩',
          ar: 'تدليك سويدي كلاسيكي',
        },
        duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 min', ar: '60 min' },
        price: { vi: '780.000₫', en: '780,000₫', fr: '780,000₫', cn: '780,000₫', ar: '780,000₫' },
      },
      {
        name: {
          vi: 'Hot Stone Ritual Lavande',
          en: 'Lavender Hot Stone Ritual',
          fr: 'Rituel aux pierres chaudes Lavande',
          cn: '薰衣草热石仪式',
          ar: 'طقوس الحجر الساخن باللافندر',
        },
        duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 min', ar: '90 min' },
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
          vi: 'Enveloppement Chocolat',
          en: 'Chocolate Body Wrap',
          fr: 'Enveloppement au chocolat',
          cn: '巧克力身体裹敷',
          ar: 'لفّة الشوكولاتة للجسم',
        },
        duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 min', ar: '75 min' },
        price: { vi: '950.000₫', en: '950,000₫', fr: '950,000₫', cn: '950,000₫', ar: '950,000₫' },
      },
    ],
  },
  {
    category: {
      vi: 'Soins Visage',
      en: 'Facial Treatments',
      fr: 'Soins du visage',
      cn: '面部护理',
      ar: 'علاجات الوجه',
    },
    items: [
      {
        name: {
          vi: 'Soin Caviar Prestige',
          en: 'Prestige Caviar Facial',
          fr: 'Soin Caviar Prestige',
          cn: '臻品鱼子酱面部护理',
          ar: 'علاج الوجه بالكافيار الفاخر',
        },
        duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 min', ar: '60 min' },
        price: {
          vi: '1.350.000₫',
          en: '1,350,000₫',
          fr: '1,350,000₫',
          cn: '1,350,000₫',
          ar: '1,350,000₫',
        },
      },
      {
        name: {
          vi: 'Peeling aux Acides de Fruits',
          en: 'Fruit Acid Peel',
          fr: 'Peeling aux acides de fruits',
          cn: '果酸焕肤',
          ar: 'تقشير بأحماض الفواكه',
        },
        duration: { vi: '45 phút', en: '45 min', fr: '45 min', cn: '45 min', ar: '45 min' },
        price: { vi: '790.000₫', en: '790,000₫', fr: '790,000₫', cn: '790,000₫', ar: '790,000₫' },
      },
      {
        name: {
          vi: "Masque à l'Argile Blanche",
          en: 'White Clay Mask Treatment',
          fr: "Soin masque à l'argile blanche",
          cn: '白泥面膜护理',
          ar: 'علاج بقناع الطين الأبيض',
        },
        duration: { vi: '50 phút', en: '50 min', fr: '50 min', cn: '50 min', ar: '50 min' },
        price: { vi: '680.000₫', en: '680,000₫', fr: '680,000₫', cn: '680,000₫', ar: '680,000₫' },
      },
    ],
  },
];

export const SPA5_TESTIMONIALS = [
  {
    name: 'Sophie Leclerc',
    role: {
      vi: 'Nhà thiết kế, Paris',
      en: 'Designer, Paris',
      fr: 'Designer, Paris',
      cn: '设计师，巴黎',
      ar: 'مصمّمة، باريس',
    },
    quote: {
      vi: 'Lumière Balnéo đưa tôi trở về cảm giác của những spa tắm khoáng ở Vichy. Bain Thermal của họ là hoàn hảo — nước, nhiệt độ, ánh sáng, mọi thứ đều được chú tâm đến từng chi tiết nhỏ nhất.',
      en: 'Lumière Balnéo took me back to the feeling of mineral spas in Vichy. Their Thermal Bath is perfection — water, temperature, lighting, everything is attended to in the smallest detail.',
      fr: "Lumière Balnéo m'a ramenée à la sensation des spas minéraux de Vichy. Leur Bain Thermal est une perfection — l'eau, la température, la lumière, tout est soigné dans le moindre détail.",
      cn: 'Lumière Balnéo 让我重温维希矿物温泉的感觉。他们的温泉浴堪称完美——水质、温度、灯光，每一个细节都悉心照料。',
      ar: 'أعادتني لوميير بالنيو إلى إحساس المنتجعات المعدنية في فيشي. حمامهم الحراري هو الكمال — الماء والحرارة والإضاءة، كل تفصيلة صغيرة تحظى بعناية.',
    },
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
  },
  {
    name: 'Nguyễn Hồng Nhung',
    role: {
      vi: 'CEO, TP.HCM',
      en: 'CEO, Ho Chi Minh City',
      fr: 'PDG, Hô Chi Minh-Ville',
      cn: '首席执行官，胡志明市',
      ar: 'الرئيسة التنفيذية، مدينة هو تشي منه',
    },
    quote: {
      vi: 'Vinothérapie là trải nghiệm tôi không thể tìm thấy ở bất kỳ đâu ở Việt Nam. Sau liệu trình, da tôi sáng và căng mịn đến mức bạn bè liên tục hỏi tôi bí quyết.',
      en: 'Vinotherapy is an experience I cannot find anywhere else in Vietnam. After the treatment, my skin glowed and felt so firm that friends kept asking my secret.',
      fr: "La Vinothérapie est une expérience que je ne trouve nulle part ailleurs au Vietnam. Après le soin, ma peau était si éclatante et ferme que mes amies n'arrêtaient pas de me demander mon secret.",
      cn: '红酒疗法是我在越南其他任何地方都找不到的体验。疗程结束后，我的肌肤光彩照人、紧致有弹性，朋友们不停地问我有什么秘诀。',
      ar: 'العلاج بالنبيذ تجربة لا أجدها في أي مكان آخر في فيتنام. بعد الجلسة، أصبحت بشرتي مشرقة ومشدودة لدرجة أن صديقاتي ظللن يسألنني عن سرّي.',
    },
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
  },
  {
    name: 'Marc Dubois',
    role: {
      vi: 'Kiến trúc sư, Lyon',
      en: 'Architect, Lyon',
      fr: 'Architecte, Lyon',
      cn: '建筑师，里昂',
      ar: 'مهندس معماري، ليون',
    },
    quote: {
      vi: 'Tôi đến đây mỗi tháng khi công tác tại Sài Gòn. Không gian mang đậm chất Pháp nhưng được diễn giải theo phong cách Đông Nam Á rất tinh tế. Đây là góc riêng tư của tôi ở thành phố này.',
      en: 'I come here every month when working in Saigon. The space is deeply French yet interpreted with a very refined Southeast Asian touch. This is my private corner in this city.',
      fr: "Je viens ici chaque mois lors de mes déplacements à Saïgon. L'espace est profondément français, mais réinterprété avec une touche sud-asiatique très raffinée. C'est mon coin privé dans cette ville.",
      cn: '每个月在西贡工作时我都会来这里。这个空间充满法式韵味，又以非常精致的东南亚风格演绎。这是我在这座城市里的私人角落。',
      ar: 'آتي إلى هنا كل شهر أثناء عملي في سايغون. المكان فرنسي الطابع بعمق، لكنه مصمّم بلمسة آسيوية جنوبية شرقية راقية جدًا. هذا ركني الخاص في هذه المدينة.',
    },
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
  },
];

export const SPA5_BOOKING_RITUALS = {
  vi: [
    'Bain Thermal (60 phút)',
    'Vinothérapie (90 phút)',
    'Thalassothérapie (75 phút)',
    'Bain de Boue (80 phút)',
    'Circuit Thermal Complet (120 phút)',
  ],
  en: [
    'Bain Thermal (60 min)',
    'Vinotherapy (90 min)',
    'Thalassotherapy (75 min)',
    'Mud Cocoon (80 min)',
    'Full Thermal Circuit (120 min)',
  ],
  fr: [
    'Bain Thermal (60 min)',
    'Vinothérapie (90 min)',
    'Thalassothérapie (75 min)',
    'Bain de Boue (80 min)',
    'Circuit Thermal complet (120 min)',
  ],
  cn: [
    '温泉浴（60 min）',
    '红酒疗法（90 min）',
    '海洋疗法（75 min）',
    '泥浆茧疗（80 min）',
    '完整温泉循环（120 min）',
  ],
  ar: [
    'حمام حراري (60 min)',
    'العلاج بالنبيذ (90 min)',
    'العلاج بمياه البحر (75 min)',
    'شرنقة الطين (80 min)',
    'دورة حرارية كاملة (120 min)',
  ],
};
