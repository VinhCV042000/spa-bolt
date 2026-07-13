export type SpaLang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export type LocalizedText = Record<SpaLang, string>;

export type SpaService = {
  slug: string;
  icon: string;
  image: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
  price: LocalizedText;
  outcomes: Record<SpaLang, string[]>;
  process: Record<SpaLang, string[]>;
};

export type SpaPackage = {
  name: LocalizedText;
  caption: LocalizedText;
  price: LocalizedText;
  popular?: boolean;
  features: Record<SpaLang, string[]>;
};

export type SpaBlogPost = {
  slug: string;
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  readTime: LocalizedText;
  body: Record<SpaLang, string[]>;
};

export type SpaGalleryItem = {
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
};

export const SPA_PAGE_IMAGES = {
  aboutHero: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=80',
  servicesHero: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=80',
  trainingHero: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1600&q=80',
  careersHero: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80',
  contactHero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
  bookingHero: 'https://images.unsplash.com/photo-1611073615830-9f2f0508d72f?w=1600&q=80',
  galleryHero: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1600&q=80',
  wellnessHero: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
  membershipHero: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80',
  massage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
  facial: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  body: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
  aroma: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
  hair: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=900&q=80',
  couple: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  blog1: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  blog2: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
  blog3: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=80',
  gallery1: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
  gallery2: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
  gallery3: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  gallery4: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
  gallery5: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
  gallery6: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
};

export const spaMeta = {
  about: {
    title: { vi: 'Về chúng tôi', en: 'About us', fr: 'À propos', cn: '关于我们', ar: 'من نحن' },
    subtitle: {
      vi: 'Serenity Spa kết hợp trị liệu truyền thống, mỹ phẩm organic và dịch vụ cá nhân hóa để chăm sóc thân - tâm - trí.',
      en: 'Serenity Spa blends heritage therapies, organic skincare, and personalized service to care for body, mind, and mood.',
      fr: 'Serenity Spa allie thérapies traditionnelles, soins bio et service personnalisé pour prendre soin du corps, de l’esprit et de l’humeur.',
      cn: 'Serenity Spa 融合传统疗法、有机护肤和个性化服务，呵护您的身、心、情绪。',
      ar: 'يجمع Serenity Spa بين العلاجات التقليدية والعناية العضوية بالبشرة والخدمة الشخصية للعناية بالجسد والعقل والمزاج.',
    },
  },
  services: {
    title: { vi: 'Dịch vụ spa', en: 'Spa services', fr: 'Services du spa', cn: '水疗服务', ar: 'خدمات السبا' },
    subtitle: {
      vi: 'Danh mục liệu trình được thiết kế theo nhu cầu thư giãn, phục hồi, làm đẹp và chăm sóc chuyên sâu.',
      en: 'A curated menu for relaxation, recovery, beauty, and deeper therapeutic care.',
      fr: 'Un menu de soins conçu pour la détente, la récupération, la beauté et les soins thérapeutiques approfondis.',
      cn: '精心设计的疗程菜单，满足放松、恢复、美容和深层护理的需求。',
      ar: 'قائمة علاجات مصممة للاسترخاء والتعافي والجمال والعناية العلاجية المتعمقة.',
    },
  },
  training: {
    title: { vi: 'Đào tạo Serenity Academy', en: 'Serenity Academy training', fr: 'Formation Serenity Academy', cn: 'Serenity 学院培训', ar: 'تدريب أكاديمية Serenity' },
    subtitle: {
      vi: 'Chương trình đào tạo kỹ thuật viên spa, chăm sóc da và vận hành dịch vụ theo tiêu chuẩn 5 sao.',
      en: 'Training programs for spa therapists, skincare specialists, and five-star service operations.',
      fr: 'Programmes de formation pour thérapeutes spa, spécialistes des soins de la peau et opérations de service cinq étoiles.',
      cn: '面向水疗技师、护肤专家及五星级服务运营的培训课程。',
      ar: 'برامج تدريبية لأخصائيي السبا وخبراء العناية بالبشرة وعمليات الخدمة بمستوى خمس نجوم.',
    },
  },
  blog: {
    title: { vi: 'Blog chăm sóc sức khỏe', en: 'Wellness blog', fr: 'Blog bien-être', cn: '健康博客', ar: 'مدونة العافية' },
    subtitle: {
      vi: 'Kiến thức thực tế về thư giãn, chăm sóc da, dinh dưỡng và thói quen sống cân bằng.',
      en: 'Practical guidance on relaxation, skincare, nutrition, and balanced living.',
      fr: 'Des conseils pratiques sur la détente, les soins de la peau, la nutrition et un mode de vie équilibré.',
      cn: '关于放松、护肤、营养和均衡生活的实用指南。',
      ar: 'إرشادات عملية حول الاسترخاء والعناية بالبشرة والتغذية والحياة المتوازنة.',
    },
  },
  careers: {
    title: { vi: 'Tuyển dụng', en: 'Careers', fr: 'Carrières', cn: '招聘', ar: 'الوظائف' },
    subtitle: {
      vi: 'Gia nhập đội ngũ spa tận tâm, chuyên nghiệp và luôn học hỏi để tạo trải nghiệm đáng nhớ cho khách hàng.',
      en: 'Join a caring, professional team that keeps learning to create memorable guest experiences.',
      fr: 'Rejoignez une équipe attentionnée et professionnelle qui ne cesse d’apprendre pour créer des expériences mémorables.',
      cn: '加入一支用心、专业且不断学习的团队，为宾客创造难忘的体验。',
      ar: 'انضم إلى فريق محترف ومهتم لا يتوقف عن التعلم لخلق تجارب لا تُنسى للضيوف.',
    },
  },
  offers: {
    title: { vi: 'Gói ưu đãi', en: 'Special offers', fr: 'Offres spéciales', cn: '特别优惠', ar: 'عروض خاصة' },
    subtitle: {
      vi: 'Các combo chăm sóc được tối ưu theo mục tiêu, ngân sách và thời gian của từng khách hàng.',
      en: 'Care bundles optimized for each guest’s goals, budget, and available time.',
      fr: 'Des forfaits de soins optimisés selon les objectifs, le budget et le temps de chaque client.',
      cn: '根据每位宾客的目标、预算和时间优化的护理套餐。',
      ar: 'باقات عناية مُحسّنة وفقًا لأهداف كل ضيف وميزانيته ووقته المتاح.',
    },
  },
  contact: {
    title: { vi: 'Liên hệ Serenity Spa', en: 'Contact Serenity Spa', fr: 'Contacter Serenity Spa', cn: '联系 Serenity Spa', ar: 'تواصل مع Serenity Spa' },
    subtitle: {
      vi: 'Gửi yêu cầu tư vấn, xem bản đồ chỉ đường và kết nối nhanh với đội ngũ chăm sóc khách hàng.',
      en: 'Request a consultation, view directions, and connect with our guest care team.',
      fr: 'Demandez une consultation, consultez l’itinéraire et contactez notre équipe d’accueil.',
      cn: '预约咨询、查看路线，并快速联系我们的宾客服务团队。',
      ar: 'اطلب استشارة واطّلع على الاتجاهات وتواصل مع فريق خدمة الضيوف لدينا.',
    },
  },
  booking: {
    title: { vi: 'Đặt lịch online', en: 'Online booking', fr: 'Réservation en ligne', cn: '在线预约', ar: 'الحجز عبر الإنترنت' },
    subtitle: {
      vi: 'Chọn liệu trình, khung giờ mong muốn và để Serenity Spa chuẩn bị trải nghiệm thư giãn cho bạn.',
      en: 'Choose a treatment and preferred time so Serenity Spa can prepare your relaxing visit.',
      fr: 'Choisissez un soin et l’horaire souhaité pour que Serenity Spa prépare votre visite relaxante.',
      cn: '选择疗程和心仪的时间，让 Serenity Spa 为您准备一次放松的体验。',
      ar: 'اختر العلاج والوقت المفضل حتى يُجهّز Serenity Spa زيارتك المريحة.',
    },
  },
  gallery: {
    title: { vi: 'Gallery đa ngôn ngữ', en: 'Multilingual gallery', fr: 'Galerie multilingue', cn: '多语言图库', ar: 'معرض متعدد اللغات' },
    subtitle: {
      vi: 'Không gian, liệu trình và khoảnh khắc khách hàng được trình bày song ngữ Việt - Anh.',
      en: 'Spaces, treatments, and guest moments presented in Vietnamese and English.',
      fr: 'Espaces, soins et moments des clients présentés en plusieurs langues.',
      cn: '以多种语言呈现的空间、疗程和宾客瞬间。',
      ar: 'المساحات والعلاجات ولحظات الضيوف معروضة بعدة لغات.',
    },
  },
  wellness: {
    title: { vi: 'Thư viện wellness', en: 'Wellness library', fr: 'Bibliothèque bien-être', cn: '健康图书馆', ar: 'مكتبة العافية' },
    subtitle: {
      vi: 'Bộ gợi ý chăm sóc tại nhà sau liệu trình để duy trì năng lượng và làn da khỏe.',
      en: 'At-home care recommendations to maintain energy and healthy skin after each treatment.',
      fr: 'Des recommandations de soins à domicile pour maintenir l’énergie et une peau saine après chaque soin.',
      cn: '疗程后的居家护理建议，帮助保持活力和健康肌肤。',
      ar: 'توصيات للعناية المنزلية للحفاظ على الطاقة وبشرة صحية بعد كل علاج.',
    },
  },
  membership: {
    title: { vi: 'Hội viên Serenity Club', en: 'Serenity Club membership', fr: 'Adhésion Serenity Club', cn: 'Serenity Club 会员', ar: 'عضوية Serenity Club' },
    subtitle: {
      vi: 'Quyền lợi tích điểm, ưu tiên đặt lịch và chăm sóc định kỳ dành cho khách hàng thân thiết.',
      en: 'Rewards, priority booking, and recurring care for loyal guests.',
      fr: 'Récompenses, réservation prioritaire et soins réguliers pour les clients fidèles.',
      cn: '为忠实宾客提供积分奖励、优先预约和定期护理。',
      ar: 'مكافآت وحجز ذو أولوية وعناية دورية للضيوف الأوفياء.',
    },
  },
};

export const spaServices: SpaService[] = [
  {
    slug: 'massage-tri-lieu',
    icon: 'solar:hand-stars-bold-duotone',
    image: SPA_PAGE_IMAGES.massage,
    title: {
      vi: 'Massage trị liệu',
      en: 'Therapeutic massage',
      fr: 'Massage thérapeutique',
      cn: '理疗按摩',
      ar: 'تدليك علاجي',
    },
    subtitle: {
      vi: 'Giải phóng căng cơ và phục hồi năng lượng',
      en: 'Release muscle tension and restore energy',
      fr: 'Libérez les tensions musculaires et retrouvez votre énergie',
      cn: '释放肌肉紧张，恢复活力',
      ar: 'تخلص من شد العضلات واستعد طاقتك',
    },
    description: {
      vi: 'Kỹ thuật viên kết hợp massage Thái, Shiatsu, đá nóng và kéo giãn nhẹ để giảm mỏi vai gáy, lưng, chân và cải thiện tuần hoàn.',
      en: 'Therapists combine Thai massage, Shiatsu, hot stones, and gentle stretching to ease neck, back, and leg fatigue while improving circulation.',
      fr: 'Les thérapeutes combinent massage thaï, shiatsu, pierres chaudes et étirements doux pour soulager la nuque, le dos et les jambes tout en améliorant la circulation.',
      cn: '技师结合泰式按摩、指压、热石和轻柔拉伸，缓解颈肩、背部和腿部疲劳，并改善血液循环。',
      ar: 'يجمع المعالجون بين التدليك التايلاندي والشياتسو والأحجار الساخنة والتمدد اللطيف لتخفيف إجهاد الرقبة والظهر والساقين مع تحسين الدورة الدموية.',
    },
    duration: { vi: '60 - 90 phút', en: '60 - 90 minutes', fr: '60 - 90 minutes', cn: '60 - 90 分钟', ar: '60 - 90 دقيقة' },
    price: {
      vi: 'Từ 650.000đ',
      en: 'From 650,000 VND',
      fr: 'À partir de 650 000 VND',
      cn: '650,000 越南盾起',
      ar: 'من 650,000 دونغ',
    },
    outcomes: {
      vi: ['Giảm căng cơ sâu', 'Ngủ ngon hơn', 'Cơ thể nhẹ và linh hoạt hơn'],
      en: ['Deep muscle relief', 'Better sleep quality', 'Lighter and more flexible body'],
      fr: ['Soulagement musculaire profond', 'Meilleure qualité de sommeil', 'Corps plus léger et souple'],
      cn: ['深层肌肉舒缓', '改善睡眠质量', '身体更轻盈灵活'],
      ar: ['راحة عميقة للعضلات', 'نوم أفضل', 'جسم أخف وأكثر مرونة'],
    },
    process: {
      vi: [
        'Tư vấn vùng cần tập trung',
        'Làm ấm cơ bằng tinh dầu',
        'Massage chuyên sâu và kéo giãn',
        'Trà thảo mộc sau trị liệu',
      ],
      en: [
        'Consult target areas',
        'Warm muscles with essential oil',
        'Deep massage and stretching',
        'Herbal tea after treatment',
      ],
      fr: [
        'Consultation des zones ciblées',
        'Réchauffement des muscles à l’huile essentielle',
        'Massage profond et étirements',
        'Tisane après le soin',
      ],
      cn: ['咨询重点部位', '用精油温暖肌肉', '深层按摩与拉伸', '疗程后享用花草茶'],
      ar: [
        'استشارة المناطق المستهدفة',
        'تدفئة العضلات بالزيت العطري',
        'تدليك عميق وتمدد',
        'شاي عشبي بعد العلاج',
      ],
    },
  },
  {
    slug: 'cham-soc-da-mat',
    icon: 'solar:face-scan-circle-bold-duotone',
    image: SPA_PAGE_IMAGES.facial,
    title: { vi: 'Chăm sóc da mặt', en: 'Facial skincare', fr: 'Soin du visage', cn: '面部护理', ar: 'العناية بالوجه' },
    subtitle: {
      vi: 'Làm sạch, cấp ẩm và tái tạo làn da',
      en: 'Cleanse, hydrate, and renew the skin',
      fr: 'Nettoyer, hydrater et régénérer la peau',
      cn: '清洁、补水并焕活肌肤',
      ar: 'تنظيف وترطيب وتجديد البشرة',
    },
    description: {
      vi: 'Liệu trình facial phân tích tình trạng da, làm sạch sâu, tẩy tế bào chết dịu nhẹ, mask organic và massage nâng cơ.',
      en: 'A facial journey with skin analysis, deep cleansing, gentle exfoliation, organic masks, and lifting facial massage.',
      fr: 'Un soin du visage avec analyse de peau, nettoyage en profondeur, exfoliation douce, masques bio et massage liftant.',
      cn: '面部护理流程包括肤质分析、深层清洁、温和去角质、有机面膜和提拉按摩。',
      ar: 'رحلة عناية بالوجه تشمل تحليل البشرة والتنظيف العميق والتقشير اللطيف والأقنعة العضوية وتدليك الشد.',
    },
    duration: { vi: '45 - 75 phút', en: '45 - 75 minutes', fr: '45 - 75 minutes', cn: '45 - 75 分钟', ar: '45 - 75 دقيقة' },
    price: {
      vi: 'Từ 520.000đ',
      en: 'From 520,000 VND',
      fr: 'À partir de 520 000 VND',
      cn: '520,000 越南盾起',
      ar: 'من 520,000 دونغ',
    },
    outcomes: {
      vi: ['Da sạch thoáng và căng bóng', 'Giảm khô ráp', 'Tư vấn routine tại nhà'],
      en: ['Clear and glowing skin', 'Less dryness', 'At-home routine guidance'],
      fr: ['Peau nette et éclatante', 'Moins de sécheresse', 'Conseils de routine à domicile'],
      cn: ['肌肤清透有光泽', '减少干燥', '居家护理建议'],
      ar: ['بشرة نقية ومشرقة', 'جفاف أقل', 'إرشادات للروتين المنزلي'],
    },
    process: {
      vi: [
        'Soi da và tư vấn',
        'Làm sạch hai bước',
        'Xông hơi và lấy nhân mụn nếu cần',
        'Mask và massage nâng cơ',
      ],
      en: [
        'Skin scan and consultation',
        'Double cleanse',
        'Steam and extraction if needed',
        'Mask and lifting massage',
      ],
      fr: [
        'Diagnostic de peau et consultation',
        'Double nettoyage',
        'Vapeur et extraction si nécessaire',
        'Masque et massage liftant',
      ],
      cn: ['肤质检测与咨询', '双重清洁', '蒸面与必要时清痘', '面膜与提拉按摩'],
      ar: [
        'فحص البشرة والاستشارة',
        'تنظيف مزدوج',
        'البخار واستخراج الرؤوس عند الحاجة',
        'قناع وتدليك الشد',
      ],
    },
  },
  {
    slug: 'lieu-phap-body',
    icon: 'solar:body-bold-duotone',
    image: SPA_PAGE_IMAGES.body,
    title: { vi: 'Liệu pháp body', en: 'Body therapy', fr: 'Soin du corps', cn: '身体护理', ar: 'علاج الجسم' },
    subtitle: {
      vi: 'Detox, làm mịn và săn chắc cơ thể',
      en: 'Detox, smooth, and tone the body',
      fr: 'Détoxifier, lisser et raffermir le corps',
      cn: '排毒、嫩肤并紧致身体',
      ar: 'إزالة السموم وتنعيم وشد الجسم',
    },
    description: {
      vi: 'Tẩy tế bào chết toàn thân, body wrap khoáng chất, massage detox và dưỡng ẩm sâu giúp làn da mềm mại và săn chắc.',
      en: 'Full-body exfoliation, mineral body wrap, detox massage, and deep hydration leave skin soft and toned.',
      fr: 'Exfoliation du corps, enveloppement minéral, massage détox et hydratation profonde pour une peau douce et raffermie.',
      cn: '全身去角质、矿物裹体、排毒按摩和深层保湿，令肌肤柔滑紧致。',
      ar: 'تقشير كامل للجسم ولفّ معدني وتدليك لإزالة السموم وترطيب عميق يترك البشرة ناعمة ومشدودة.',
    },
    duration: { vi: '90 - 120 phút', en: '90 - 120 minutes', fr: '90 - 120 minutes', cn: '90 - 120 分钟', ar: '90 - 120 دقيقة' },
    price: {
      vi: 'Từ 980.000đ',
      en: 'From 980,000 VND',
      fr: 'À partir de 980 000 VND',
      cn: '980,000 越南盾起',
      ar: 'من 980,000 دونغ',
    },
    outcomes: {
      vi: ['Da mềm và đều màu', 'Giảm cảm giác nặng cơ thể', 'Tăng tuần hoàn ngoại vi'],
      en: ['Softer, more even skin', 'Less body heaviness', 'Improved peripheral circulation'],
      fr: ['Peau plus douce et uniforme', 'Sensation de légèreté', 'Meilleure circulation périphérique'],
      cn: ['肌肤柔滑均匀', '减轻身体沉重感', '改善末梢血液循环'],
      ar: ['بشرة أنعم وأكثر تجانسًا', 'إحساس أقل بثقل الجسم', 'تحسين الدورة الدموية الطرفية'],
    },
    process: {
      vi: ['Tẩy da chết bằng muối khoáng', 'Ủ body wrap', 'Massage detox', 'Dưỡng thể organic'],
      en: ['Mineral salt exfoliation', 'Body wrap cocoon', 'Detox massage', 'Organic body lotion'],
      fr: ['Exfoliation au sel minéral', 'Enveloppement corporel', 'Massage détox', 'Lait corporel bio'],
      cn: ['矿物盐去角质', '裹体包覆', '排毒按摩', '有机身体乳'],
      ar: ['تقشير بالملح المعدني', 'لفّ الجسم', 'تدليك لإزالة السموم', 'مرطب جسم عضوي'],
    },
  },
  {
    slug: 'aromatherapy',
    icon: 'solar:leaf-bold-duotone',
    image: SPA_PAGE_IMAGES.aroma,
    title: { vi: 'Aromatherapy', en: 'Aromatherapy', fr: 'Aromathérapie', cn: '芳香疗法', ar: 'العلاج بالروائح العطرية' },
    subtitle: {
      vi: 'Cân bằng cảm xúc bằng tinh dầu thiên nhiên',
      en: 'Balance emotions with natural essential oils',
      fr: 'Équilibrez vos émotions avec des huiles essentielles naturelles',
      cn: '用天然精油平衡情绪',
      ar: 'وازن مشاعرك بالزيوت العطرية الطبيعية',
    },
    description: {
      vi: 'Tinh dầu lavender, eucalyptus, citrus hoặc ylang-ylang được phối theo trạng thái cơ thể để hỗ trợ thư giãn và tập trung.',
      en: 'Lavender, eucalyptus, citrus, or ylang-ylang blends are selected for your body state to support relaxation and focus.',
      fr: 'Des mélanges de lavande, eucalyptus, agrumes ou ylang-ylang sont choisis selon votre état pour favoriser détente et concentration.',
      cn: '根据您的身体状态调配薰衣草、桉树、柑橘或依兰精油，帮助放松与专注。',
      ar: 'تُختار خلطات الخزامى والأوكالبتوس والحمضيات أو اليلانغ يلانغ حسب حالة جسمك لدعم الاسترخاء والتركيز.',
    },
    duration: { vi: '60 phút', en: '60 minutes', fr: '60 minutes', cn: '60 分钟', ar: '60 دقيقة' },
    price: {
      vi: 'Từ 590.000đ',
      en: 'From 590,000 VND',
      fr: 'À partir de 590 000 VND',
      cn: '590,000 越南盾起',
      ar: 'من 590,000 دونغ',
    },
    outcomes: {
      vi: ['Tâm trạng thư thái', 'Hơi thở sâu hơn', 'Giảm căng thẳng tinh thần'],
      en: ['Calmer mood', 'Deeper breathing', 'Reduced mental stress'],
      fr: ['Humeur apaisée', 'Respiration plus profonde', 'Moins de stress mental'],
      cn: ['心情更平静', '呼吸更深沉', '减轻精神压力'],
      ar: ['مزاج أكثر هدوءًا', 'تنفّس أعمق', 'تقليل التوتر الذهني'],
    },
    process: {
      vi: [
        'Chọn mùi hương theo nhu cầu',
        'Xông hương mở đầu',
        'Massage nhẹ toàn thân',
        'Hướng dẫn hít thở',
      ],
      en: [
        'Choose a scent for your needs',
        'Opening aroma diffusion',
        'Light full-body massage',
        'Guided breathing',
      ],
      fr: [
        'Choix d’un parfum selon vos besoins',
        'Diffusion d’arôme d’ouverture',
        'Massage léger du corps',
        'Respiration guidée',
      ],
      cn: ['根据需求选择香氛', '开场香氛扩散', '全身轻柔按摩', '引导式呼吸'],
      ar: [
        'اختيار رائحة حسب احتياجك',
        'نشر العطر الافتتاحي',
        'تدليك خفيف لكامل الجسم',
        'تنفّس موجّه',
      ],
    },
  },
  {
    slug: 'cham-soc-toc-da-dau',
    icon: 'solar:stars-bold-duotone',
    image: SPA_PAGE_IMAGES.hair,
    title: {
      vi: 'Chăm sóc tóc & da đầu',
      en: 'Hair & scalp ritual',
      fr: 'Rituel cheveux et cuir chevelu',
      cn: '头发与头皮护理',
      ar: 'طقوس العناية بالشعر وفروة الرأس',
    },
    subtitle: {
      vi: 'Thư giãn vùng đầu, cổ, vai và phục hồi da đầu',
      en: 'Relax the head, neck, shoulders, and restore scalp comfort',
      fr: 'Détendez la tête, la nuque, les épaules et apaisez le cuir chevelu',
      cn: '放松头部、颈部和肩部，舒缓头皮',
      ar: 'استرخِ الرأس والرقبة والكتفين وأعد الراحة لفروة الرأس',
    },
    description: {
      vi: 'Gội dưỡng sinh, massage huyệt đạo, ủ thảo mộc và chăm sóc tóc bằng sản phẩm dịu nhẹ cho cảm giác nhẹ đầu tức thì.',
      en: 'A wellness shampoo, acupressure massage, herbal steam, and gentle haircare products create immediate head-lightness.',
      fr: 'Un shampooing bien-être, un massage par acupression, une vapeur d’herbes et des produits doux procurent une sensation de légèreté immédiate.',
      cn: '养生洗发、穴位按摩、草本蒸薰和温和护发产品，带来即刻的轻盈感。',
      ar: 'شامبو صحي وتدليك بالضغط الإبري وبخار عشبي ومنتجات لطيفة للعناية بالشعر تمنح إحساسًا فوريًا بخفة الرأس.',
    },
    duration: { vi: '45 - 60 phút', en: '45 - 60 minutes', fr: '45 - 60 minutes', cn: '45 - 60 分钟', ar: '45 - 60 دقيقة' },
    price: {
      vi: 'Từ 420.000đ',
      en: 'From 420,000 VND',
      fr: 'À partir de 420 000 VND',
      cn: '420,000 越南盾起',
      ar: 'من 420,000 دونغ',
    },
    outcomes: {
      vi: ['Giảm mỏi đầu và vai gáy', 'Da đầu sạch thoáng', 'Tóc mềm mượt hơn'],
      en: ['Less head and shoulder fatigue', 'Clean, refreshed scalp', 'Softer hair feel'],
      fr: ['Moins de fatigue à la tête et aux épaules', 'Cuir chevelu propre et frais', 'Cheveux plus doux'],
      cn: ['减轻头部与肩颈疲劳', '头皮清爽洁净', '秀发更柔顺'],
      ar: ['إجهاد أقل في الرأس والكتفين', 'فروة رأس نظيفة ومنتعشة', 'شعر أكثر نعومة'],
    },
    process: {
      vi: ['Soi da đầu nhanh', 'Massage cổ vai gáy', 'Gội dưỡng sinh', 'Ủ tóc thảo mộc'],
      en: [
        'Quick scalp check',
        'Neck and shoulder massage',
        'Wellness shampoo',
        'Herbal hair mask',
      ],
      fr: [
        'Diagnostic rapide du cuir chevelu',
        'Massage nuque et épaules',
        'Shampooing bien-être',
        'Masque capillaire aux herbes',
      ],
      cn: ['快速头皮检测', '颈肩按摩', '养生洗发', '草本发膜'],
      ar: [
        'فحص سريع لفروة الرأس',
        'تدليك الرقبة والكتفين',
        'شامبو صحي',
        'قناع شعر عشبي',
      ],
    },
  },
  {
    slug: 'couple-vip-retreat',
    icon: 'solar:heart-bold-duotone',
    image: SPA_PAGE_IMAGES.couple,
    title: { vi: 'Couple VIP retreat', en: 'Couple VIP retreat', fr: 'Retraite VIP en couple', cn: '情侣 VIP 之旅', ar: 'استراحة VIP للأزواج' },
    subtitle: {
      vi: 'Không gian riêng cho cặp đôi hoặc bạn thân',
      en: 'A private suite for couples or close friends',
      fr: 'Une suite privée pour couples ou amis proches',
      cn: '为情侣或挚友打造的私密套房',
      ar: 'جناح خاص للأزواج أو الأصدقاء المقربين',
    },
    description: {
      vi: 'Phòng VIP riêng, liệu trình đôi, bồn jacuzzi, trà chiều healthy và quà tặng nhỏ cho dịp kỷ niệm.',
      en: 'Private VIP suite, side-by-side treatments, jacuzzi, healthy afternoon tea, and a small gift for special occasions.',
      fr: 'Suite VIP privée, soins en duo, jacuzzi, thé de l’après-midi sain et un petit cadeau pour les occasions spéciales.',
      cn: '私人 VIP 套房、双人疗程、按摩浴缸、健康下午茶，以及纪念日的小礼物。',
      ar: 'جناح VIP خاص وعلاجات ثنائية وجاكوزي وشاي عصر صحي وهدية صغيرة للمناسبات الخاصة.',
    },
    duration: { vi: '120 - 180 phút', en: '120 - 180 minutes', fr: '120 - 180 minutes', cn: '120 - 180 分钟', ar: '120 - 180 دقيقة' },
    price: {
      vi: 'Từ 2.490.000đ / 2 khách',
      en: 'From 2,490,000 VND / 2 guests',
      fr: 'À partir de 2 490 000 VND / 2 personnes',
      cn: '2,490,000 越南盾起 / 2 位宾客',
      ar: 'من 2,490,000 دونغ / ضيفان',
    },
    outcomes: {
      vi: ['Riêng tư và lãng mạn', 'Trải nghiệm trọn gói', 'Lưu giữ khoảnh khắc kỷ niệm'],
      en: ['Private and romantic', 'Complete retreat experience', 'Memorable celebration moments'],
      fr: ['Intime et romantique', 'Expérience complète', 'Moments de célébration mémorables'],
      cn: ['私密而浪漫', '完整的休憩体验', '难忘的纪念时刻'],
      ar: ['خصوصية ورومانسية', 'تجربة استراحة كاملة', 'لحظات احتفال لا تُنسى'],
    },
    process: {
      vi: ['Welcome drink', 'Xông hơi hoặc jacuzzi', 'Massage đôi', 'Trà chiều và quà tặng'],
      en: ['Welcome drink', 'Steam or jacuzzi', 'Couple massage', 'Afternoon tea and gift'],
      fr: ['Boisson de bienvenue', 'Sauna ou jacuzzi', 'Massage en duo', 'Thé de l’après-midi et cadeau'],
      cn: ['迎宾饮品', '蒸薰或按摩浴缸', '双人按摩', '下午茶与礼物'],
      ar: ['مشروب ترحيبي', 'بخار أو جاكوزي', 'تدليك ثنائي', 'شاي العصر وهدية'],
    },
  },
];

export const spaPackages: SpaPackage[] = [
  {
    name: { vi: 'Gói Thư giãn', en: 'Relax package', fr: 'Forfait Détente', cn: '放松套餐', ar: 'باقة الاسترخاء' },
    caption: { vi: 'Dành cho khách mới', en: 'For first-time guests', fr: 'Pour les nouveaux clients', cn: '适合首次到访的宾客', ar: 'للضيوف لأول مرة' },
    price: { vi: '890.000đ', en: '890,000 VND', fr: '890 000 VND', cn: '890,000 越南盾', ar: '890,000 دونغ' },
    features: {
      vi: [
        'Massage body 60 phút',
        'Xông hơi 30 phút',
        'Trà thảo mộc',
        'Tư vấn liệu trình tiếp theo',
      ],
      en: [
        '60-minute body massage',
        '30-minute steam',
        'Herbal tea',
        'Next-treatment consultation',
      ],
      fr: [
        'Massage corps de 60 minutes',
        'Sauna de 30 minutes',
        'Tisane',
        'Conseil pour le prochain soin',
      ],
      cn: ['60 分钟身体按摩', '30 分钟蒸薰', '花草茶', '下次疗程咨询'],
      ar: [
        'تدليك للجسم 60 دقيقة',
        'بخار 30 دقيقة',
        'شاي عشبي',
        'استشارة العلاج التالي',
      ],
    },
  },
  {
    name: { vi: 'Gói Tái tạo', en: 'Renew package', fr: 'Forfait Régénération', cn: '焕活套餐', ar: 'باقة التجديد' },
    caption: { vi: 'Được đặt nhiều nhất', en: 'Most booked', fr: 'Le plus réservé', cn: '预订最多', ar: 'الأكثر حجزًا' },
    price: { vi: '1.590.000đ', en: '1,590,000 VND', fr: '1 590 000 VND', cn: '1,590,000 越南盾', ar: '1,590,000 دونغ' },
    popular: true,
    features: {
      vi: [
        'Massage body 90 phút',
        'Facial organic 60 phút',
        'Body scrub',
        'Jacuzzi 45 phút',
        'Detox drink',
      ],
      en: [
        '90-minute body massage',
        '60-minute organic facial',
        'Body scrub',
        '45-minute jacuzzi',
        'Detox drink',
      ],
      fr: [
        'Massage corps de 90 minutes',
        'Soin du visage bio de 60 minutes',
        'Gommage corporel',
        'Jacuzzi de 45 minutes',
        'Boisson détox',
      ],
      cn: ['90 分钟身体按摩', '60 分钟有机面部护理', '身体磨砂', '45 分钟按摩浴缸', '排毒饮品'],
      ar: [
        'تدليك للجسم 90 دقيقة',
        'عناية عضوية بالوجه 60 دقيقة',
        'مقشر للجسم',
        'جاكوزي 45 دقيقة',
        'مشروب لإزالة السموم',
      ],
    },
  },
  {
    name: { vi: 'Gói Premium', en: 'Premium package', fr: 'Forfait Premium', cn: '尊享套餐', ar: 'الباقة المميزة' },
    caption: { vi: 'Trải nghiệm VIP', en: 'VIP experience', fr: 'Expérience VIP', cn: 'VIP 体验', ar: 'تجربة VIP' },
    price: { vi: '2.890.000đ', en: '2,890,000 VND', fr: '2 890 000 VND', cn: '2,890,000 越南盾', ar: '2,890,000 دونغ' },
    features: {
      vi: [
        'Liệu trình body 120 phút',
        'Facial cao cấp',
        'Aromatherapy riêng tư',
        'Phòng VIP',
        'Bữa nhẹ healthy',
        'Quà organic',
      ],
      en: [
        '120-minute body ritual',
        'Premium facial',
        'Private aromatherapy',
        'VIP suite',
        'Healthy light meal',
        'Organic gift',
      ],
      fr: [
        'Rituel corps de 120 minutes',
        'Soin du visage premium',
        'Aromathérapie privée',
        'Suite VIP',
        'Repas léger et sain',
        'Cadeau bio',
      ],
      cn: ['120 分钟身体护理', '高级面部护理', '私人芳香疗法', 'VIP 套房', '健康轻食', '有机礼物'],
      ar: [
        'طقوس للجسم 120 دقيقة',
        'عناية فاخرة بالوجه',
        'علاج عطري خاص',
        'جناح VIP',
        'وجبة خفيفة صحية',
        'هدية عضوية',
      ],
    },
  },
];

export const spaBlogPosts: SpaBlogPost[] = [
  {
    slug: 'chon-lieu-trinh-massage',
    image: SPA_PAGE_IMAGES.blog1,
    category: { vi: 'Massage', en: 'Massage', fr: 'Massage', cn: '按摩', ar: 'تدليك' },
    title: {
      vi: 'Cách chọn liệu trình massage phù hợp cơ thể',
      en: 'How to choose the right massage for your body',
      fr: 'Comment choisir le massage adapté à votre corps',
      cn: '如何选择适合身体的按摩疗程',
      ar: 'كيف تختار التدليك المناسب لجسمك',
    },
    excerpt: {
      vi: 'Phân biệt massage thư giãn, trị liệu, đá nóng và aromatherapy để đặt lịch đúng nhu cầu.',
      en: 'Understand relaxation, therapeutic, hot stone, and aromatherapy massage before booking.',
      fr: 'Comprenez les massages relaxant, thérapeutique, aux pierres chaudes et aromathérapie avant de réserver.',
      cn: '在预约前了解放松、理疗、热石和芳香按摩的区别。',
      ar: 'افهم تدليك الاسترخاء والعلاجي والأحجار الساخنة والعطري قبل الحجز.',
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', fr: '5 min de lecture', cn: '5 分钟阅读', ar: 'قراءة 5 دقائق' },
    body: {
      vi: [
        'Nếu bạn mỏi cơ sau khi làm việc lâu, hãy ưu tiên massage trị liệu với lực vừa đến sâu và có kéo giãn nhẹ.',
        'Nếu mục tiêu là ngủ ngon hoặc giảm stress, aromatherapy với tinh dầu lavender hoặc citrus sẽ phù hợp hơn.',
        'Hãy chia sẻ vùng đau, tiền sử chấn thương và mức lực mong muốn trước khi bắt đầu để kỹ thuật viên cá nhân hóa liệu trình.',
      ],
      en: [
        'If your muscles feel tired after long working hours, choose therapeutic massage with medium-to-deep pressure and gentle stretching.',
        'If your goal is better sleep or stress relief, aromatherapy with lavender or citrus oils may fit better.',
        'Share painful areas, previous injuries, and pressure preferences before the session so your therapist can personalize the treatment.',
      ],
      fr: [
        'Si vos muscles sont fatigués après de longues heures de travail, choisissez un massage thérapeutique avec une pression moyenne à profonde et des étirements doux.',
        'Si votre objectif est de mieux dormir ou de réduire le stress, l’aromathérapie aux huiles de lavande ou d’agrumes conviendra mieux.',
        'Indiquez les zones douloureuses, vos antécédents de blessures et la pression souhaitée avant la séance pour que votre thérapeute personnalise le soin.',
      ],
      cn: [
        '如果长时间工作后肌肉疲劳，建议选择中至深力度并配合轻柔拉伸的理疗按摩。',
        '如果目标是改善睡眠或缓解压力，使用薰衣草或柑橘精油的芳香按摩更合适。',
        '开始前请告知疼痛部位、受伤史和期望力度，让技师为您量身定制疗程。',
      ],
      ar: [
        'إذا شعرت بتعب العضلات بعد ساعات عمل طويلة، اختر التدليك العلاجي بضغط متوسط إلى عميق مع تمدد لطيف.',
        'إذا كان هدفك نومًا أفضل أو تخفيف التوتر، فقد يكون العلاج العطري بزيوت الخزامى أو الحمضيات أنسب.',
        'أخبر المعالج بالمناطق المؤلمة والإصابات السابقة ومستوى الضغط المرغوب قبل الجلسة لتخصيص العلاج.',
      ],
    },
  },
  {
    slug: 'routine-cham-soc-da-sau-facial',
    image: SPA_PAGE_IMAGES.blog2,
    category: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soins de la peau', cn: '护肤', ar: 'العناية بالبشرة' },
    title: {
      vi: 'Routine 48 giờ sau facial để da luôn căng bóng',
      en: 'A 48-hour post-facial routine for glowing skin',
      fr: 'Une routine de 48 heures après un soin du visage pour une peau éclatante',
      cn: '面部护理后 48 小时焕亮肌肤的护理流程',
      ar: 'روتين 48 ساعة بعد العناية بالوجه لبشرة مشرقة',
    },
    excerpt: {
      vi: 'Những điều nên và không nên làm sau facial để duy trì hiệu quả lâu hơn.',
      en: 'What to do and avoid after a facial to keep results longer.',
      fr: 'Ce qu’il faut faire et éviter après un soin du visage pour prolonger les résultats.',
      cn: '面部护理后应做和应避免的事项，让效果保持更久。',
      ar: 'ما يجب فعله وتجنبه بعد العناية بالوجه للحفاظ على النتائج لفترة أطول.',
    },
    readTime: { vi: '4 phút đọc', en: '4 min read', fr: '4 min de lecture', cn: '4 分钟阅读', ar: 'قراءة 4 دقائق' },
    body: {
      vi: [
        'Trong 24 giờ đầu, tránh tẩy da chết mạnh, xông hơi quá nóng hoặc thử sản phẩm active mới.',
        'Tập trung cấp ẩm, chống nắng kỹ và uống đủ nước để hỗ trợ hàng rào bảo vệ da phục hồi.',
        'Nếu da đang nhạy cảm, hãy dùng sữa rửa mặt dịu nhẹ và kem dưỡng phục hồi trong hai ngày tiếp theo.',
      ],
      en: [
        'During the first 24 hours, avoid strong exfoliation, excessive heat, or trying new active products.',
        'Focus on hydration, careful sun protection, and enough water to support the skin barrier.',
        'If your skin feels sensitive, use a gentle cleanser and barrier-repair moisturizer for the next two days.',
      ],
      fr: [
        'Pendant les 24 premières heures, évitez l’exfoliation intense, la chaleur excessive ou l’essai de nouveaux produits actifs.',
        'Privilégiez l’hydratation, une protection solaire soignée et une bonne hydratation pour soutenir la barrière cutanée.',
        'Si votre peau est sensible, utilisez un nettoyant doux et une crème réparatrice pendant les deux jours suivants.',
      ],
      cn: [
        '在最初 24 小时内，避免强力去角质、过度受热或尝试新的活性产品。',
        '注重补水、做好防晒并多喝水，以支持肌肤屏障修复。',
        '如果肌肤感觉敏感，接下来两天请使用温和洁面和修护保湿霉。',
      ],
      ar: [
        'خلال أول 24 ساعة، تجنب التقشير القوي أو الحرارة الزائدة أو تجربة منتجات فعّالة جديدة.',
        'ركّز على الترطيب والحماية الدقيقة من الشمس وشرب كمية كافية من الماء لدعم حاجز البشرة.',
        'إذا كانت بشرتك حساسة، استخدم غسولًا لطيفًا ومرطبًا مُصلحًا للحاجز خلال اليومين التاليين.',
      ],
    },
  },
  {
    slug: 'thien-va-hoi-tho',
    image: SPA_PAGE_IMAGES.blog3,
    category: { vi: 'Wellness', en: 'Wellness', fr: 'Bien-être', cn: '健康', ar: 'العافية' },
    title: {
      vi: '3 bài tập thở giúp thư giãn sau giờ làm',
      en: 'Three breathing practices after work',
      fr: 'Trois exercices de respiration pour se détendre après le travail',
      cn: '下班后助你放松的三种呼吸练习',
      ar: 'ثلاث تمارين تنفّس للاسترخاء بعد العمل',
    },
    excerpt: {
      vi: 'Các bài thở đơn giản có thể thực hiện tại nhà trước khi ngủ hoặc sau khi trị liệu.',
      en: 'Simple breathing exercises to practice at home before sleep or after treatment.',
      fr: 'Des exercices de respiration simples à pratiquer chez soi avant de dormir ou après un soin.',
      cn: '可在家中睡前或疗程后练习的简单呼吸法。',
      ar: 'تمارين تنفّس بسيطة يمكن ممارستها في المنزل قبل النوم أو بعد العلاج.',
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', fr: '6 min de lecture', cn: '6 分钟阅读', ar: 'قراءة 6 دقائق' },
    body: {
      vi: [
        'Thở hộp 4-4-4-4 giúp ổn định nhịp tim và đưa sự chú ý trở lại hiện tại.',
        'Thở 4-7-8 phù hợp trước khi ngủ vì kéo dài nhịp thở ra và làm dịu hệ thần kinh.',
        'Khi kết hợp với tinh dầu dịu nhẹ, hãy giữ nhịp thở chậm và quan sát cảm giác trong cơ thể.',
      ],
      en: [
        'Box breathing 4-4-4-4 helps steady heart rhythm and bring attention back to the present moment.',
        'The 4-7-8 method is useful before sleep because it lengthens the exhale and calms the nervous system.',
        'When pairing with gentle essential oils, keep the breath slow and notice sensations in the body.',
      ],
      fr: [
        'La respiration carrée 4-4-4-4 aide à stabiliser le rythme cardiaque et à ramener l’attention au moment présent.',
        'La méthode 4-7-8 est utile avant le sommeil car elle allonge l’expiration et apaise le système nerveux.',
        'En l’associant à des huiles essentielles douces, gardez une respiration lente et observez les sensations dans le corps.',
      ],
      cn: [
        '4-4-4-4 箱式呼吸有助于稳定心率，让注意力回到当下。',
        '4-7-8 呼吸法适合睡前使用，因为它延长呼气并安抚神经系统。',
        '搭配温和精油时，保持缓慢呼吸并觉察身体的感受。',
      ],
      ar: [
        'تنفّس الصندوق 4-4-4-4 يساعد على تثبيت نبض القلب وإعادة التركيز إلى اللحظة الحالية.',
        'طريقة 4-7-8 مفيدة قبل النوم لأنها تطيل الزفير وتهدّئ الجهاز العصبي.',
        'عند دمجها مع زيوت عطرية لطيفة، حافظ على تنفّس بطيء ولاحظ الأحاسيس في جسمك.',
      ],
    },
  },
];

export const spaGallery: SpaGalleryItem[] = [
  {
    image: SPA_PAGE_IMAGES.gallery1,
    category: { vi: 'Không gian', en: 'Space', fr: 'Espace', cn: '空间', ar: 'المساحة' },
    title: { vi: 'Sảnh đón Zen', en: 'Zen reception lounge', fr: 'Salon d’accueil Zen', cn: '禅意接待大堂', ar: 'صالة استقبال زِن' },
    caption: {
      vi: 'Ánh sáng ấm, hương trà thảo mộc và âm nhạc nhẹ giúp khách thư giãn ngay khi đến.',
      en: 'Warm light, herbal tea aroma, and gentle music help guests relax on arrival.',
      fr: 'Une lumière chaleureuse, un arôme de tisane et une musique douce détendent les clients dès leur arrivée.',
      cn: '温暖的灯光、草本茶香和轻柔音乐，让宾客一到达便放松下来。',
      ar: 'إضاءة دافئة وعبير شاي عشبي وموسيقى هادئة تساعد الضيوف على الاسترخاء فور وصولهم.',
    },
  },
  {
    image: SPA_PAGE_IMAGES.gallery2,
    category: { vi: 'Trị liệu', en: 'Therapy', fr: 'Thérapie', cn: '疗程', ar: 'العلاج' },
    title: { vi: 'Phòng massage riêng', en: 'Private massage room', fr: 'Salle de massage privée', cn: '私人按摩室', ar: 'غرفة تدليك خاصة' },
    caption: {
      vi: 'Mỗi phòng được chuẩn bị theo nhiệt độ, mùi hương và ánh sáng phù hợp từng liệu trình.',
      en: 'Each room is prepared with treatment-specific temperature, scent, and lighting.',
      fr: 'Chaque salle est préparée avec la température, le parfum et l’éclairage adaptés à chaque soin.',
      cn: '每个房间都根据疗程调配适宜的温度、香氛和灯光。',
      ar: 'كل غرفة مُهيّأة بدرجة حرارة ورائحة وإضاءة مناسبة لكل علاج.',
    },
  },
  {
    image: SPA_PAGE_IMAGES.gallery3,
    category: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soins de la peau', cn: '护肤', ar: 'العناية بالبشرة' },
    title: { vi: 'Facial organic', en: 'Organic facial ritual', fr: 'Rituel de soin du visage bio', cn: '有机面部护理', ar: 'طقوس عناية عضوية بالوجه' },
    caption: {
      vi: 'Sản phẩm dịu nhẹ, giàu chiết xuất thiên nhiên và phù hợp nhiều tình trạng da.',
      en: 'Gentle products rich in botanical extracts and suitable for many skin conditions.',
      fr: 'Des produits doux, riches en extraits botaniques et adaptés à de nombreux types de peau.',
      cn: '温和产品富含植物萄取，适合多种肌肤状况。',
      ar: 'منتجات لطيفة غنية بالمستخلصات النباتية ومناسبة لحالات بشرة متعددة.',
    },
  },
  {
    image: SPA_PAGE_IMAGES.gallery4,
    category: { vi: 'Aromatherapy', en: 'Aromatherapy', fr: 'Aromathérapie', cn: '芳香疗法', ar: 'العلاج بالروائح' },
    title: { vi: 'Tinh dầu cá nhân hóa', en: 'Personalized essential oils', fr: 'Huiles essentielles personnalisées', cn: '个性化精油', ar: 'زيوت عطرية مخصصة' },
    caption: {
      vi: 'Mùi hương được chọn theo trạng thái cơ thể: thư giãn, phục hồi hoặc tập trung.',
      en: 'Scents are chosen for your body state: relax, restore, or focus.',
      fr: 'Les parfums sont choisis selon votre état : détente, récupération ou concentration.',
      cn: '根据身体状态选择香氛：放松、恢复或专注。',
      ar: 'تُختار الروائح حسب حالة جسمك: الاسترخاء أو التعافي أو التركيز.',
    },
  },
  {
    image: SPA_PAGE_IMAGES.gallery5,
    category: { vi: 'VIP', en: 'VIP', fr: 'VIP', cn: 'VIP', ar: 'VIP' },
    title: { vi: 'Suite cặp đôi', en: 'Couple suite', fr: 'Suite pour couple', cn: '情侣套房', ar: 'جناح للأزواج' },
    caption: {
      vi: 'Không gian riêng cho dịp kỷ niệm, sinh nhật hoặc buổi hẹn thư giãn.',
      en: 'A private space for anniversaries, birthdays, or relaxing dates.',
      fr: 'Un espace privé pour les anniversaires, les fêtes ou les rendez-vous relaxants.',
      cn: '专为纪念日、生日或放松约会打造的私密空间。',
      ar: 'مساحة خاصة للذكرى السنوية أو أعياد الميلاد أو المواعيد المريحة.',
    },
  },
  {
    image: SPA_PAGE_IMAGES.gallery6,
    category: { vi: 'Đào tạo', en: 'Training', fr: 'Formation', cn: '培训', ar: 'التدريب' },
    title: { vi: 'Serenity Academy', en: 'Serenity Academy', fr: 'Serenity Academy', cn: 'Serenity 学院', ar: 'أكاديمية Serenity' },
    caption: {
      vi: 'Khu thực hành cho kỹ thuật viên với giáo trình tiêu chuẩn và phản hồi trực tiếp.',
      en: 'Practice rooms for therapists with structured curriculum and live feedback.',
      fr: 'Des salles de pratique pour les thérapeutes avec un programme structuré et un retour en direct.',
      cn: '为技师提供的实践空间，配备标准课程和现场反馈。',
      ar: 'قاعات تدريب للمعالجين مع منهج منظم وملاحظات فورية.',
    },
  },
];

export const spaTrainingPrograms = [
  {
    title: { vi: 'Kỹ thuật viên spa nền tảng', en: 'Foundation spa therapist', fr: 'Thérapeute spa débutant', cn: '基础水疗技师', ar: 'أخصائي سبا أساسي' },
    duration: { vi: '8 tuần', en: '8 weeks', fr: '8 semaines', cn: '8 周', ar: '8 أسابيع' },
    points: {
      vi: [
        'Giải phẫu cơ bản',
        'Massage body và foot',
        'Vệ sinh - an toàn',
        'Thực hành trên mẫu thật',
      ],
      en: [
        'Basic anatomy',
        'Body and foot massage',
        'Hygiene and safety',
        'Practice with real models',
      ],
      fr: [
        'Anatomie de base',
        'Massage corps et pieds',
        'Hygiène et sécurité',
        'Pratique sur modèles réels',
      ],
      cn: ['基础解剖', '身体与足部按摩', '卫生与安全', '真人模特实操'],
      ar: [
        'تشريح أساسي',
        'تدليك الجسم والقدمين',
        'النظافة والسلامة',
        'تدريب على نماذج حقيقية',
      ],
    },
  },
  {
    title: { vi: 'Chuyên viên chăm sóc da', en: 'Skincare specialist', fr: 'Spécialiste des soins de la peau', cn: '护肤专家', ar: 'أخصائي العناية بالبشرة' },
    duration: { vi: '6 tuần', en: '6 weeks', fr: '6 semaines', cn: '6 周', ar: '6 أسابيع' },
    points: {
      vi: ['Phân tích da', 'Facial organic', 'Routine tại nhà', 'Tư vấn khách hàng'],
      en: ['Skin analysis', 'Organic facial', 'At-home routines', 'Guest consultation'],
      fr: ['Analyse de la peau', 'Soin du visage bio', 'Routines à domicile', 'Conseil client'],
      cn: ['肤质分析', '有机面部护理', '居家护理', '客户咨询'],
      ar: ['تحليل البشرة', 'عناية عضوية بالوجه', 'روتين منزلي', 'استشارة الضيوف'],
    },
  },
  {
    title: { vi: 'Quản lý vận hành spa', en: 'Spa operations manager', fr: 'Responsable des opérations spa', cn: '水疗运营经理', ar: 'مدير عمليات السبا' },
    duration: { vi: '4 tuần', en: '4 weeks', fr: '4 semaines', cn: '4 周', ar: '4 أسابيع' },
    points: {
      vi: ['Quy trình dịch vụ', 'KPI và lịch hẹn', 'Quản lý tồn kho', 'Trải nghiệm khách hàng'],
      en: ['Service workflows', 'KPIs and scheduling', 'Inventory control', 'Guest experience'],
      fr: ['Processus de service', 'KPI et planning', 'Gestion des stocks', 'Expérience client'],
      cn: ['服务流程', 'KPI 与排期', '库存管理', '客户体验'],
      ar: ['سير عمل الخدمة', 'مؤشرات الأداء والجدولة', 'إدارة المخزون', 'تجربة الضيوف'],
    },
  },
];

export const spaCareerOpenings = [
  {
    role: { vi: 'Kỹ thuật viên massage', en: 'Massage therapist', fr: 'Masseur thérapeute', cn: '按摩技师', ar: 'معالج تدليك' },
    location: { vi: 'Quận 1, TP.HCM', en: 'District 1, HCMC', fr: 'District 1, Hô Chi Minh-Ville', cn: '胡志明市第一郡', ar: 'الدائرة 1، مدينة هو تشي منه' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
  },
  {
    role: { vi: 'Chuyên viên chăm sóc da', en: 'Skincare specialist', fr: 'Spécialiste des soins de la peau', cn: '护肤专家', ar: 'أخصائي العناية بالبشرة' },
    location: { vi: 'Quận 1, TP.HCM', en: 'District 1, HCMC', fr: 'District 1, Hô Chi Minh-Ville', cn: '胡志明市第一郡', ar: 'الدائرة 1، مدينة هو تشي منه' },
    type: { vi: 'Toàn thời gian / bán thời gian', en: 'Full-time / part-time', fr: 'Temps plein / temps partiel', cn: '全职 / 兼职', ar: 'دوام كامل / جزئي' },
  },
  {
    role: { vi: 'Tư vấn viên lễ tân', en: 'Guest consultant', fr: 'Conseiller d’accueil', cn: '前台顾问', ar: 'مستشار استقبال' },
    location: { vi: 'Quận 1, TP.HCM', en: 'District 1, HCMC', fr: 'District 1, Hô Chi Minh-Ville', cn: '胡志明市第一郡', ar: 'الدائرة 1، مدينة هو تشي منه' },
    type: { vi: 'Xoay ca', en: 'Shift-based', fr: 'Travail posté', cn: '轮班', ar: 'بنظام الورديات' },
  },
];

export const spaContactInfo = [
  {
    icon: 'solar:map-point-bold-duotone',
    label: { vi: 'Địa chỉ', en: 'Address', fr: 'Adresse', cn: '地址', ar: 'العنوان' },
    value: '88 Serenity Avenue, District 1, Ho Chi Minh City',
  },
  {
    icon: 'solar:phone-bold-duotone',
    label: { vi: 'Hotline', en: 'Hotline', fr: 'Hotline', cn: '热线', ar: 'الخط الساخن' },
    value: '+84 28 8888 6868',
  },
  {
    icon: 'solar:letter-bold-duotone',
    label: { vi: 'Email', en: 'Email', fr: 'E-mail', cn: '电子邮箱', ar: 'البريد الإلكتروني' },
    value: 'hello@serenityspa.vn',
  },
  {
    icon: 'solar:clock-circle-bold-duotone',
    label: { vi: 'Giờ mở cửa', en: 'Opening hours', fr: 'Heures d’ouverture', cn: '营业时间', ar: 'ساعات العمل' },
    value: '09:00 - 21:30',
  },
];
