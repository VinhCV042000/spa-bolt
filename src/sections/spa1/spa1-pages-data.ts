import { SPA1_GOLD, SPA1_DARK, SPA1_DARK_ALT, SPA1_GOLD_SOFT } from 'src/sections/spa1/spa1-data';

export { SPA1_GOLD, SPA1_DARK, SPA1_DARK_ALT, SPA1_GOLD_SOFT };

export type Spa1Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';
export type LocalizedText = Record<Spa1Lang, string>;

// ----------------------------------------------------------------------
// IMAGES
// ----------------------------------------------------------------------

export const SPA1_PAGE_IMAGES = {
  aboutHero: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=80',
  servicesHero: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=80',
  serviceDetailHero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
  trainingHero: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1600&q=80',
  blogHero: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80',
  careersHero: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80',
  bookingHero: 'https://images.unsplash.com/photo-1611073615830-9f2f0508d72f?w=1600&q=80',
  contactHero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
  offersHero: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80',
  feedbackHero: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1600&q=80',
  promotionsHero: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=1600&q=80',
  branchesHero: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&q=80',
  accountHero: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&q=80',
  partnersHero: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80',
  treatmentHero: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=80',
  beforeAfterHero: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1600&q=80',
  faqHero: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1600&q=80',
  policyHero: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80',
  galleryHero: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=1600&q=80',
  // Thumbnails
  massage: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
  facial: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  body: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
  aroma: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
  hair: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=900&q=80',
  couple: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  gallery1: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=900&q=80',
  gallery2: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
  gallery3: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  gallery4: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80',
  gallery5: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
  gallery6: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
  blog1: 'https://images.unsplash.com/photo-1540555700479-4be289fbecef?w=900&q=80',
  blog2: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=900&q=80',
  blog3: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=80',
  beforeAfter1: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80',
  beforeAfter2: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80',
};

// ----------------------------------------------------------------------
// META (page titles & subtitles)
// ----------------------------------------------------------------------

export const spa1Meta = {
  about: {
    title: { vi: 'Về chúng tôi', en: 'About us', fr: 'À propos', cn: '关于我们', ar: 'من نحن' },
    subtitle: {
      vi: 'Luxe Spa mang đến trải nghiệm spa cao cấp, nơi nghệ thuật chăm sóc gặp gỡ sự tinh tế của phong cách sống hiện đại.',
      en: 'Luxe Spa delivers premium spa experiences where the art of care meets modern lifestyle sophistication.',
      fr: "Luxe Spa offre des expériences spa haut de gamme, où l'art du soin rencontre le raffinement du style de vie moderne.",
      cn: 'Luxe Spa 提供高端水疗体验，让护理艺术与现代生活的精致格调完美交融。',
      ar: 'يقدّم Luxe Spa تجارب سبا راقية، حيث يلتقي فنّ العناية برقيّ أسلوب الحياة العصري.',
    },
  },
  services: {
    title: { vi: 'Dịch vụ', en: 'Services', fr: 'Services', cn: '服务项目', ar: 'الخدمات' },
    subtitle: {
      vi: 'Các liệu trình cao cấp được thiết kế riêng cho từng nhu cầu: trẻ hóa, phục hồi, thư giãn và làm đẹp toàn diện.',
      en: 'Premium treatments tailored to your needs: rejuvenation, recovery, relaxation, and holistic beauty.',
      fr: 'Des soins haut de gamme adaptés à vos besoins : rajeunissement, récupération, relaxation et beauté holistique.',
      cn: '为您的需求量身定制的高端护理：焕活、修复、放松与全面美容。',
      ar: 'علاجات راقية مصمّمة وفق احتياجاتك: تجديد الشباب والتعافي والاسترخاء والجمال الشامل.',
    },
  },
  training: {
    title: { vi: 'Đào tạo', en: 'Training', fr: 'Formation', cn: '培训', ar: 'التدريب' },
    subtitle: {
      vi: 'Chương trình đào tạo chuyên nghiệp dành cho kỹ thuật viên spa theo tiêu chuẩn quốc tế.',
      en: 'Professional training programs for spa therapists meeting international standards.',
      fr: 'Des programmes de formation professionnels pour les thérapeutes spa selon les normes internationales.',
      cn: '为水疗理疗师提供符合国际标准的专业培训课程。',
      ar: 'برامج تدريب احترافية لأخصائيي السبا وفق المعايير الدولية.',
    },
  },
  blog: {
    title: { vi: 'Blog', en: 'Blog', fr: 'Blog', cn: '博客', ar: 'المدونة' },
    subtitle: {
      vi: 'Kiến thức chăm sóc sức khỏe, làm đẹp và phong cách sống từ đội ngũ chuyên gia.',
      en: 'Health, beauty, and lifestyle insights from our expert team.',
      fr: "Conseils santé, beauté et art de vivre par notre équipe d'experts.",
      cn: '来自我们专家团队的健康、美容与生活方式见解。',
      ar: 'رؤى حول الصحة والجمال وأسلوب الحياة من فريق خبرائنا.',
    },
  },
  careers: {
    title: { vi: 'Tuyển dụng', en: 'Careers', fr: 'Carrières', cn: '招聘', ar: 'الوظائف' },
    subtitle: {
      vi: 'Gia nhập đội ngũ Luxe Spa và phát triển sự nghiệp trong ngành chăm sóc sức khỏe và làm đẹp.',
      en: 'Join Luxe Spa and grow your career in wellness and beauty.',
      fr: 'Rejoignez Luxe Spa et développez votre carrière dans le bien-être et la beauté.',
      cn: '加入 Luxe Spa，在健康与美容行业发展您的事业。',
      ar: 'انضمّ إلى Luxe Spa وطوّر مسيرتك المهنية في مجال العافية والجمال.',
    },
  },
  booking: {
    title: { vi: 'Đặt lịch online', en: 'Online booking', fr: 'Réservation en ligne', cn: '在线预约', ar: 'الحجز عبر الإنترنت' },
    subtitle: {
      vi: 'Đặt lịch hẹn nhanh chóng, chọn dịch vụ và thời gian phù hợp chỉ trong vài bước.',
      en: 'Book an appointment quickly — select your service and preferred time in just a few steps.',
      fr: 'Réservez un rendez-vous rapidement — choisissez votre service et l’horaire idéal en quelques étapes.',
      cn: '快速预约——只需几步即可选择服务和理想时间。',
      ar: 'احجز موعدك بسرعة — اختر خدمتك والوقت المناسب في بضع خطوات.',
    },
  },
  contact: {
    title: { vi: 'Liên hệ', en: 'Contact', fr: 'Contact', cn: '联系我们', ar: 'اتصل بنا' },
    subtitle: {
      vi: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua hotline, email hoặc trực tiếp tại chi nhánh.',
      en: 'We are always ready to help. Reach us by phone, email, or visit our branch directly.',
      fr: 'Nous sommes toujours prêts à vous aider. Contactez-nous par téléphone, e-mail ou en visitant notre centre.',
      cn: '我们随时乐意为您服务。可通过电话、邮件或直接到店联系我们。',
      ar: 'نحن دائمًا مستعدون لمساعدتك. تواصل معنا عبر الهاتف أو البريد الإلكتروني أو بزيارة فرعنا مباشرة.',
    },
  },
  offers: {
    title: { vi: 'Gói ưu đãi', en: 'Special offers', fr: 'Offres spéciales', cn: '特别优惠', ar: 'عروض خاصة' },
    subtitle: {
      vi: 'Khám phá các gói combo tiết kiệm và ưu đãi đặc biệt dành riêng cho khách hàng thân thiết.',
      en: 'Discover money-saving combos and exclusive offers for our loyal clients.',
      fr: 'Découvrez des combos économiques et des offres exclusives pour nos clients fidèles.',
      cn: '探索超值套餐组合和专为忠实顾客准备的独家优惠。',
      ar: 'اكتشف باقات موفّرة وعروضًا حصرية لعملائنا المخلصين.',
    },
  },
  feedback: {
    title: { vi: 'Đánh giá khách hàng', en: 'Customer feedback', fr: 'Avis clients', cn: '顾客评价', ar: 'آراء العملاء' },
    subtitle: {
      vi: 'Những cảm nhận chân thực từ khách hàng sau khi trải nghiệm dịch vụ tại Luxe Spa.',
      en: 'Genuine reviews from clients after experiencing our services.',
      fr: 'Des avis authentiques de clients après avoir découvert nos services.',
      cn: '顾客在体验我们服务后的真实评价。',
      ar: 'تقييمات حقيقية من العملاء بعد تجربة خدماتنا.',
    },
  },
  promotions: {
    title: { vi: 'Khuyến mãi', en: 'Promotions', fr: 'Promotions', cn: '促销活动', ar: 'العروض الترويجية' },
    subtitle: {
      vi: 'Cập nhật các chương trình khuyến mãi mới nhất và ưu đãi theo mùa.',
      en: 'Stay updated with our latest seasonal promotions and limited-time deals.',
      fr: 'Restez informé de nos dernières promotions saisonnières et offres à durée limitée.',
      cn: '及时了解我们最新的季节性促销和限时优惠。',
      ar: 'ابقَ على اطّلاع بأحدث عروضنا الموسمية والصفقات محدودة الوقت.',
    },
  },
  branches: {
    title: { vi: 'Hệ thống chi nhánh', en: 'Branch system', fr: 'Réseau de centres', cn: '门店网络', ar: 'شبكة الفروع' },
    subtitle: {
      vi: 'Hệ thống chi nhánh Luxe Spa trải dài khắp thành phố, tiện lợi và dễ dàng tiếp cận.',
      en: 'Our branch network spans the city for your convenience and easy access.',
      fr: 'Notre réseau de centres s’étend à travers la ville pour votre confort et un accès facile.',
      cn: '我们的门店网络遍布全城，为您提供便利与轻松到达。',
      ar: 'تمتدّ شبكة فروعنا عبر المدينة لراحتك وسهولة الوصول.',
    },
  },
  account: {
    title: { vi: 'Tài khoản khách hàng', en: 'My account', fr: 'Mon compte', cn: '我的账户', ar: 'حسابي' },
    subtitle: {
      vi: 'Quản lý thông tin cá nhân, lịch sử dịch vụ và điểm tích lũy của bạn.',
      en: 'Manage your profile, service history, and loyalty points.',
      fr: 'Gérez votre profil, votre historique de services et vos points de fidélité.',
      cn: '管理您的个人资料、服务记录和积分。',
      ar: 'أدر ملفك الشخصي وسجلّ خدماتك ونقاط ولائك.',
    },
  },
  partners: {
    title: { vi: 'Cộng sự', en: 'Partners', fr: 'Partenaires', cn: '合作伙伴', ar: 'الشركاء' },
    subtitle: {
      vi: 'Những đối tác chiến lược đồng hành cùng Luxe Spa trên hành trình mang đến dịch vụ hoàn hảo.',
      en: 'Strategic partners who accompany Luxe Spa in delivering perfect services.',
      fr: 'Des partenaires stratégiques qui accompagnent Luxe Spa dans la livraison de services parfaits.',
      cn: '与 Luxe Spa 携手提供完美服务的战略合作伙伴。',
      ar: 'شركاء استراتيجيون يرافقون Luxe Spa في تقديم خدمات مثالية.',
    },
  },
  treatments: {
    title: { vi: 'Gói liệu trình', en: 'Treatment packages', fr: 'Forfaits de soins', cn: '疗程套餐', ar: 'باقات العلاج' },
    subtitle: {
      vi: 'Các gói liệu trình chuyên sâu được xây dựng bài bản theo lộ trình cá nhân hóa.',
      en: 'In-depth treatment packages built with personalized care pathways.',
      fr: 'Des forfaits de soins approfondis conçus avec des parcours de soin personnalisés.',
      cn: '采用个性化护理方案精心打造的深度疗程套餐。',
      ar: 'باقات علاج معمّقة مصمّمة بمسارات عناية مخصّصة.',
    },
  },
  beforeAfter: {
    title: { vi: 'Kết quả trước & sau', en: 'Before & after', fr: 'Avant & après', cn: '前后对比', ar: 'قبل وبعد' },
    subtitle: {
      vi: 'Hình ảnh thực tế minh chứng cho hiệu quả rõ rệt từ các liệu trình của chúng tôi.',
      en: 'Real images showcasing visible results from our treatments.',
      fr: 'Des images réelles montrant les résultats visibles de nos soins.',
      cn: '真实照片展示我们护理的显著效果。',
      ar: 'صور حقيقية تُظهر النتائج الواضحة لعلاجاتنا.',
    },
  },
  faq: {
    title: { vi: 'Câu hỏi thường gặp', en: 'FAQ', fr: 'FAQ', cn: '常见问题', ar: 'الأسئلة الشائعة' },
    subtitle: {
      vi: 'Giải đáp những thắc mắc phổ biến về dịch vụ, quy trình và chính sách.',
      en: 'Answers to common questions about our services, processes, and policies.',
      fr: 'Réponses aux questions courantes sur nos services, processus et politiques.',
      cn: '关于我们服务、流程和政策的常见问题解答。',
      ar: 'إجابات عن الأسئلة الشائعة حول خدماتنا وإجراءاتنا وسياساتنا.',
    },
  },
  policy: {
    title: { vi: 'Chính sách', en: 'Policies', fr: 'Politiques', cn: '政策条款', ar: 'السياسات' },
    subtitle: {
      vi: 'Các chính sách bảo mật, đổi lịch, hoàn tiền và quyền lợi khách hàng.',
      en: 'Privacy, rescheduling, refund, and customer rights policies.',
      fr: 'Politiques de confidentialité, de report, de remboursement et droits des clients.',
      cn: '隐私、改期、退款及顾客权益政策。',
      ar: 'سياسات الخصوصية وإعادة الجدولة والاسترداد وحقوق العملاء.',
    },
  },
  gallery: {
    title: { vi: 'Thư viện ảnh', en: 'Gallery', fr: 'Galerie', cn: '相册', ar: 'معرض الصور' },
    subtitle: {
      vi: 'Không gian sang trọng và các khoảnh khắc thư giãn tại Luxe Spa.',
      en: 'Luxurious spaces and relaxation moments at Luxe Spa.',
      fr: 'Espaces luxueux et moments de détente au Luxe Spa.',
      cn: 'Luxe Spa 的奢华空间与放松时刻。',
      ar: 'مساحات فاخرة ولحظات استرخاء في Luxe Spa.',
    },
  },
};

// ----------------------------------------------------------------------
// SERVICES
// ----------------------------------------------------------------------

export type Spa1Service = {
  slug: string;
  icon: string;
  image: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
  price: LocalizedText;
  outcomes: Record<Spa1Lang, string[]>;
  process: Record<Spa1Lang, string[]>;
};

export const spa1Services: Spa1Service[] = [
  {
    slug: 'massage-tri-lieu',
    icon: 'solar:hand-heart-bold',
    image: SPA1_PAGE_IMAGES.massage,
    title: { vi: 'Massage trị liệu', en: 'Therapeutic massage', fr: 'Massage thérapeutique', cn: '理疗按摩', ar: 'تدليك علاجي' },
    subtitle: { vi: 'Giải tỏa căng thẳng sâu', en: 'Deep tension relief', fr: 'Soulagement profond des tensions', cn: '深层舒缓紧张', ar: 'تخفيف التوتر العميق' },
    description: {
      vi: 'Liệu trình massage chuyên sâu kết hợp kỹ thuật phương Đông và phương Tây, giúp phục hồi cơ thể toàn diện.',
      en: 'Deep-tissue massage combining Eastern and Western techniques for complete body restoration.',
      fr: 'Massage des tissus profonds combinant des techniques orientales et occidentales pour une restauration corporelle complète.',
      cn: '深层组织按摩，融合东西方手法，全面恢复身体活力。',
      ar: 'تدليك عميق للأنسجة يجمع بين التقنيات الشرقية والغربية لاستعادة كاملة للجسم.',
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    price: { vi: '1.200.000 VNĐ', en: '$52', fr: '$52', cn: '$52', ar: '$52' },
    outcomes: {
      vi: ['Giảm đau lưng, vai gáy', 'Cải thiện tuần hoàn máu', 'Tăng chất lượng giấc ngủ'],
      en: ['Reduces back and neck pain', 'Improves blood circulation', 'Enhances sleep quality'],
      fr: ['Réduit les douleurs du dos et de la nuque', 'Améliore la circulation sanguine', 'Améliore la qualité du sommeil'],
      cn: ['缓解背部和颈部疼痛', '改善血液循环', '提升睡眠质量'],
      ar: ['يخفّف آلام الظهر والرقبة', 'يحسّن الدورة الدموية', 'يعزّز جودة النوم'],
    },
    process: {
      vi: [
        'Tư vấn tình trạng cơ thể',
        'Ngâm chân thảo dược',
        'Massage toàn thân 60 phút',
        'Thư giãn đá nóng 30 phút',
      ],
      en: [
        'Body condition consultation',
        'Herbal foot soak',
        '60-min full-body massage',
        '30-min hot stone relaxation',
      ],
      fr: [
        "Consultation de l'état du corps",
        'Bain de pieds aux herbes',
        'Massage complet du corps 60 min',
        'Relaxation aux pierres chaudes 30 min',
      ],
      cn: ['身体状况咨询', '草本泡脚', '60 分钟全身按摩', '30 分钟热石放松'],
      ar: [
        'استشارة حالة الجسم',
        'نقع القدمين بالأعشاب',
        'تدليك كامل للجسم 60 دقيقة',
        'استرخاء بالحجارة الساخنة 30 دقيقة',
      ],
    },
  },
  {
    slug: 'cham-soc-da-mat',
    icon: 'solar:face-scan-circle-bold',
    image: SPA1_PAGE_IMAGES.facial,
    title: { vi: 'Chăm sóc da mặt', en: 'Facial treatment', fr: 'Soin du visage', cn: '面部护理', ar: 'عناية بالوجه' },
    subtitle: { vi: 'Trẻ hóa & phục hồi', en: 'Rejuvenation & repair', fr: 'Rajeunissement & réparation', cn: '焕龄与修复', ar: 'تجديد وإصلاح' },
    description: {
      vi: 'Sử dụng mỹ phẩm cao cấp và công nghệ hiện đại để chăm sóc da mặt chuyên sâu.',
      en: 'Premium skincare products and modern technology for professional facial care.',
      fr: 'Produits de soin haut de gamme et technologie moderne pour des soins du visage professionnels.',
      cn: '采用高端护肤品和现代技术，提供专业面部护理。',
      ar: 'منتجات عناية راقية وتقنية حديثة لعناية احترافية بالوجه.',
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 分钟', ar: '75 دقيقة' },
    price: { vi: '1.500.000 VNĐ', en: '$65', fr: '$65', cn: '$65', ar: '$65' },
    outcomes: {
      vi: ['Da sáng đều màu', 'Giảm nếp nhăn rõ rệt', 'Se khít lỗ chân lông'],
      en: ['Even skin tone', 'Visible wrinkle reduction', 'Minimized pores'],
      fr: ['Teint uniforme', 'Réduction visible des rides', 'Pores resserrés'],
      cn: ['肤色均匀', '明显减少皱纹', '收缩毛孔'],
      ar: ['توحيد لون البشرة', 'تقليل واضح للتجاعيد', 'تضييق المسام'],
    },
    process: {
      vi: [
        'Phân tích da bằng máy',
        'Làm sạch sâu',
        'Đắp mặt nạ chuyên biệt',
        'Dưỡng ẩm & chống nắng',
      ],
      en: [
        'Skin analysis with device',
        'Deep cleansing',
        'Specialized mask application',
        'Moisturizing & SPF protection',
      ],
      fr: [
        'Analyse de la peau par appareil',
        'Nettoyage en profondeur',
        'Application d’un masque spécialisé',
        'Hydratation & protection SPF',
      ],
      cn: ['仪器肤质分析', '深层清洁', '专用面膜敟敷', '保湿与防晒'],
      ar: [
        'تحليل البشرة بالجهاز',
        'تنظيف عميق',
        'وضع قناع متخصص',
        'ترطيب وحماية من الشمس',
      ],
    },
  },
  {
    slug: 'lieu-trinh-body',
    icon: 'solar:user-heart-bold',
    image: SPA1_PAGE_IMAGES.body,
    title: { vi: 'Liệu trình body', en: 'Body treatment', fr: 'Soin du corps', cn: '身体护理', ar: 'عناية بالجسم' },
    subtitle: { vi: 'Chăm sóc toàn thân', en: 'Full-body care', fr: 'Soin du corps entier', cn: '全身护理', ar: 'عناية بالجسم بالكامل' },
    description: {
      vi: 'Tẩy tế bào chết, ủ trắng và dưỡng thể giúp làn da mịn màng, đều màu.',
      en: 'Exfoliation, whitening wrap, and body moisturizing for smooth, even skin.',
      fr: 'Exfoliation, enveloppement éclaircissant et hydratation du corps pour une peau lisse et uniforme.',
      cn: '去角质、美白裹敟及身体保湿，让肌肤光滑均匀。',
      ar: 'تقشير ولفائف تفتيح وترطيب للجسم لبشرة ناعمة ومتجانسة.',
    },
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    price: { vi: '1.800.000 VNĐ', en: '$78', fr: '$78', cn: '$78', ar: '$78' },
    outcomes: {
      vi: ['Da body mịn màng', 'Sáng đều tone da', 'Cấp ẩm chuyên sâu'],
      en: ['Silky smooth body skin', 'Even body tone', 'Deep hydration'],
      fr: ['Peau du corps soyeuse', 'Teint du corps uniforme', 'Hydratation profonde'],
      cn: ['身体肌肤柔滑', '身体肤色均匀', '深层补水'],
      ar: ['بشرة جسم ناعمة كالحرير', 'لون جسم متجانس', 'ترطيب عميق'],
    },
    process: {
      vi: [
        'Tẩy da chết bằng muối khoáng',
        'Ủ trắng tinh chất collagen',
        'Massage toàn thân',
        'Dưỡng thể cao cấp',
      ],
      en: [
        'Mineral salt exfoliation',
        'Collagen whitening wrap',
        'Full-body massage',
        'Premium body moisturizer',
      ],
      fr: [
        'Exfoliation au sel minéral',
        'Enveloppement éclaircissant au collagène',
        'Massage complet du corps',
        'Hydratant corporel haut de gamme',
      ],
      cn: ['矿物盐去角质', '胶原蛋白美白裹敟', '全身按摩', '高端身体保湿'],
      ar: [
        'تقشير بالملح المعدني',
        'لفائف تفتيح بالكولاجين',
        'تدليك كامل للجسم',
        'مرطّب جسم فاخر',
      ],
    },
  },
  {
    slug: 'aromatherapy',
    icon: 'solar:leaf-bold',
    image: SPA1_PAGE_IMAGES.aroma,
    title: { vi: 'Aromatherapy', en: 'Aromatherapy', fr: 'Aromathérapie', cn: '芳香疗法', ar: 'العلاج بالروائح' },
    subtitle: { vi: 'Trị liệu hương thơm', en: 'Scent healing', fr: 'Soin par les arômes', cn: '香薰疗愈', ar: 'الشفاء بالعطور' },
    description: {
      vi: 'Liệu pháp hương thơm sử dụng tinh dầu thiên nhiên giúp cân bằng tâm trí và thể chất.',
      en: 'Aromatic therapy using natural essential oils to balance mind and body.',
      fr: 'Thérapie aromatique utilisant des huiles essentielles naturelles pour équilibrer le corps et l’esprit.',
      cn: '运用天然精油的芳香疗法，平衡身心。',
      ar: 'علاج عطري يستخدم الزيوت الأساسية الطبيعية لتحقيق التوازن بين العقل والجسد.',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: { vi: '900.000 VNĐ', en: '$39', fr: '$39', cn: '$39', ar: '$39' },
    outcomes: {
      vi: ['Giảm stress & lo âu', 'Cải thiện tâm trạng', 'Cân bằng năng lượng'],
      en: ['Reduces stress & anxiety', 'Improves mood', 'Balances energy'],
      fr: ['Réduit le stress & l’anxiété', 'Améliore l’humeur', 'Équilibre l’énergie'],
      cn: ['减轻压力与焦虑', '改善情绪', '平衡能量'],
      ar: ['يخفّف التوتر والقلق', 'يحسّن المزاج', 'يوازن الطاقة'],
    },
    process: {
      vi: [
        'Chọn hương tinh dầu phù hợp',
        'Xông hơi thảo dược',
        'Massage nhẹ nhàng',
        'Thiền thư giãn',
      ],
      en: [
        'Select suitable essential oil',
        'Herbal steam',
        'Gentle massage',
        'Relaxation meditation',
      ],
      fr: [
        'Sélection de l’huile essentielle adaptée',
        'Vapeur aux herbes',
        'Massage doux',
        'Méditation de relaxation',
      ],
      cn: ['选择合适的精油', '草本蒸汽', '轻柔按摩', '放松冥想'],
      ar: [
        'اختيار الزيت الأساسي المناسب',
        'بخار بالأعشاب',
        'تدليك لطيف',
        'تأمّل للاسترخاء',
      ],
    },
  },
  {
    slug: 'cham-soc-toc',
    icon: 'solar:magic-stick-3-bold',
    image: SPA1_PAGE_IMAGES.hair,
    title: { vi: 'Chăm sóc tóc', en: 'Hair care', fr: 'Soin capillaire', cn: '秀发护理', ar: 'العناية بالشعر' },
    subtitle: { vi: 'Phục hồi & dưỡng bóng', en: 'Restore & shine', fr: 'Réparation & brillance', cn: '修复与亮泽', ar: 'إصلاح ولمعان' },
    description: {
      vi: 'Liệu trình phục hồi tóc hư tổn, cung cấp dưỡng chất giúp tóc bóng mượt từ gốc đến ngọn.',
      en: 'Hair restoration treatment that nourishes damaged hair from root to tip for brilliant shine.',
      fr: 'Soin réparateur qui nourrit les cheveux abîmés de la racine aux pointes pour une brillance éclatante.',
      cn: '修复受损发丝的疗程，从发根到发梢赋予营养，尽显耀人光泽。',
      ar: 'علاج لترميم الشعر يغذّي الشعر التالف من الجذور حتى الأطراف للمعان مبهر.',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: { vi: '800.000 VNĐ', en: '$35', fr: '$35', cn: '$35', ar: '$35' },
    outcomes: {
      vi: ['Tóc bóng mượt tự nhiên', 'Phục hồi tóc hư tổn', 'Giảm gãy rụng'],
      en: ['Natural hair shine', 'Damaged hair repair', 'Reduces breakage'],
      fr: ['Brillance naturelle des cheveux', 'Réparation des cheveux abîmés', 'Réduit la casse'],
      cn: ['自然发丝光泽', '修复受损发质', '减少断裂'],
      ar: ['لمعان طبيعي للشعر', 'إصلاح الشعر التالف', 'يقلّل تقصّف الشعر'],
    },
    process: {
      vi: ['Gội đầu thảo dược', 'Ủ dưỡng chất keratin', 'Massage da đầu', 'Sấy tạo kiểu'],
      en: ['Herbal shampoo', 'Keratin conditioning wrap', 'Scalp massage', 'Blow-dry styling'],
      fr: ['Shampoing aux herbes', 'Soin gainant à la kératine', 'Massage du cuir chevelu', 'Brushing coiffant'],
      cn: ['草本洗发', '角蛋白償发敟敟', '头皮按摩', '吹造造型'],
      ar: ['غسيل بالأعشاب', 'لفائف بالكيراتين', 'تدليك فروة الرأس', 'تجفيف وتصفيف'],
    },
  },
  {
    slug: 'couple-spa',
    icon: 'solar:heart-bold',
    image: SPA1_PAGE_IMAGES.couple,
    title: { vi: 'Couple Spa', en: 'Couple spa', fr: 'Spa en duo', cn: '情侣水疗', ar: 'سبا للأزواج' },
    subtitle: { vi: 'Trải nghiệm cùng nhau', en: 'Shared experience', fr: 'Expérience partagée', cn: '共同体验', ar: 'تجربة مشتركة' },
    description: {
      vi: 'Gói spa dành cho cặp đôi trong không gian riêng tư, lãng mạn với nến thơm và hoa tươi.',
      en: 'Couples spa package in a private, romantic setting with candles and fresh flowers.',
      fr: 'Forfait spa pour couples dans un cadre privé et romantique avec bougies et fleurs fraîches.',
      cn: '为情侣打造的水疗套餐，私密浪漫空间，配以香氛蜡烛与鲜花。',
      ar: 'باقة سبا للأزواج في أجواء خاصة ورومانسية مع الشموع والزهور الطازجة.',
    },
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    price: { vi: '3.500.000 VNĐ', en: '$150', fr: '$150', cn: '$150', ar: '$150' },
    outcomes: {
      vi: ['Thư giãn cùng người thương', 'Kết nối sâu hơn', 'Trải nghiệm lãng mạn'],
      en: ['Relax with your partner', 'Deeper connection', 'Romantic experience'],
      fr: ['Détente avec votre partenaire', 'Connexion plus profonde', 'Expérience romantique'],
      cn: ['与爱人共享放松', '更深的连结', '浪漫体验'],
      ar: ['استرخاء مع شريكك', 'تواصل أعمق', 'تجربة رومانسية'],
    },
    process: {
      vi: [
        'Welcome drink & hoa tươi',
        'Ngâm chân thảo dược đôi',
        'Massage đồng thời',
        'Trà & bánh ngọt sau liệu trình',
      ],
      en: [
        'Welcome drink & fresh flowers',
        'Dual herbal foot soak',
        'Simultaneous massage',
        'Tea & pastries post-treatment',
      ],
      fr: [
        'Boisson de bienvenue & fleurs fraîches',
        'Bain de pieds aux herbes en duo',
        'Massage simultané',
        'Thé & pâtisseries après le soin',
      ],
      cn: ['迎宾饮品与鲜花', '双人草本泡脚', '同步按摩', '疗程后茶点'],
      ar: [
        'مشروب ترحيبي وزهور طازجة',
        'نقع القدمين بالأعشاب للاثنين',
        'تدليك متزامن',
        'شاي ومعجنات بعد الجلسة',
      ],
    },
  },
];

// ----------------------------------------------------------------------
// TREATMENT PACKAGES (Gói liệu trình)
// ----------------------------------------------------------------------

export type Spa1Treatment = {
  name: LocalizedText;
  sessions: number;
  duration: LocalizedText;
  price: LocalizedText;
  popular?: boolean;
  benefits: Record<Spa1Lang, string[]>;
};

export const spa1Treatments: Spa1Treatment[] = [
  {
    name: { vi: 'Gói Trẻ hóa 4 buổi', en: '4-session Rejuvenation', fr: 'Forfait Rajeunissement 4 séances', cn: '焕龄四次套餐', ar: 'باقة تجديد الشباب 4 جلسات' },
    sessions: 4,
    duration: { vi: '75 phút/buổi', en: '75 min/session', fr: '75 min/séance', cn: '75 分钟/次', ar: '75 دقيقة/جلسة' },
    price: { vi: '4.800.000 VNĐ', en: '$208', fr: '$208', cn: '$208', ar: '$208' },
    benefits: {
      vi: [
        'Trẻ hóa da mặt toàn diện',
        'Giảm nếp nhăn & thâm nám',
        'Tặng 1 buổi chăm sóc da cơ bản',
      ],
      en: [
        'Complete facial rejuvenation',
        'Reduces wrinkles & dark spots',
        'Free 1 basic skincare session',
      ],
      fr: [
        'Rajeunissement complet du visage',
        'Réduit les rides & les taches',
        '1 séance de soin de base offerte',
      ],
      cn: ['全面面部焕龄', '减少皱纹与黄褐斑', '赠送 1 次基础护肤'],
      ar: [
        'تجديد كامل للوجه',
        'يقلّل التجاعيد والبقع الداكنة',
        'جلسة عناية أساسية مجانًا',
      ],
    },
  },
  {
    name: { vi: 'Gói Detox toàn thân', en: 'Full-body Detox', fr: 'Forfait Détox intégral', cn: '全身排毒套餐', ar: 'باقة تخليص الجسم من السموم' },
    sessions: 6,
    duration: { vi: '90 phút/buổi', en: '90 min/session', fr: '90 min/séance', cn: '90 分钟/次', ar: '90 دقيقة/جلسة' },
    price: { vi: '7.200.000 VNĐ', en: '$312', fr: '$312', cn: '$312', ar: '$312' },
    popular: true,
    benefits: {
      vi: ['Thải độc cơ thể', 'Giảm mỡ & cellulite', 'Cải thiện tuần hoàn', 'Tặng 2 buổi xông hơi'],
      en: [
        'Body detoxification',
        'Reduces fat & cellulite',
        'Improves circulation',
        'Free 2 sauna sessions',
      ],
      fr: [
        'Détoxification du corps',
        'Réduit la graisse & la cellulite',
        'Améliore la circulation',
        '2 séances de sauna offertes',
      ],
      cn: ['身体排毒', '减少脂肪与橘皮组织', '改善血液循环', '赠送 2 次桑拿'],
      ar: [
        'تخليص الجسم من السموم',
        'يقلّل الدهون والسيلوليت',
        'يحسّن الدورة الدموية',
        'جلستا ساونا مجانًا',
      ],
    },
  },
  {
    name: { vi: 'Gói VIP Platinum', en: 'VIP Platinum', fr: 'VIP Platinum', cn: 'VIP 铂金套餐', ar: 'باقة VIP بلاتينيوم' },
    sessions: 10,
    duration: { vi: '120 phút/buổi', en: '120 min/session', fr: '120 min/séance', cn: '120 分钟/次', ar: '120 دقيقة/جلسة' },
    price: { vi: '15.000.000 VNĐ', en: '$650', fr: '$650', cn: '$650', ar: '$650' },
    benefits: {
      vi: [
        'Combo facial + body + massage',
        'Kỹ thuật viên riêng',
        'Phòng VIP riêng biệt',
        'Tặng membership 6 tháng',
      ],
      en: [
        'Facial + body + massage combo',
        'Dedicated therapist',
        'Private VIP room',
        'Free 6-month membership',
      ],
      fr: [
        'Combo soin du visage + corps + massage',
        'Thérapeute dédié',
        'Salle VIP privée',
        'Adhésion de 6 mois offerte',
      ],
      cn: ['面部 + 身体 + 按摩组合', '专属理疗师', '独立 VIP 房间', '赠送 6 个月会员'],
      ar: [
        'جلسة وجه + جسم + تدليك',
        'أخصائي خاص',
        'غرفة VIP خاصة',
        'عضوية 6 أشهر مجانًا',
      ],
    },
  },
];

// ----------------------------------------------------------------------
// OFFERS (Gói ưu đãi)
// ----------------------------------------------------------------------

export type Spa1Offer = {
  title: LocalizedText;
  description: LocalizedText;
  discount: string;
  validUntil: LocalizedText;
  conditions: Record<Spa1Lang, string[]>;
};

export const spa1Offers: Spa1Offer[] = [
  {
    title: { vi: 'Ưu đãi khách hàng mới', en: 'New client offer', fr: 'Offre nouveau client', cn: '新顾客优惠', ar: 'عرض العملاء الجدد' },
    description: {
      vi: 'Giảm 30% cho lần đầu trải nghiệm bất kỳ dịch vụ nào tại Luxe Spa.',
      en: '30% off your first visit for any service at Luxe Spa.',
      fr: '30 % de réduction sur votre première visite pour tout service au Luxe Spa.',
      cn: '首次体验 Luxe Spa 任意服务享 7 折优惠。',
      ar: 'خصم 30% على زيارتك الأولى لأي خدمة في Luxe Spa.',
    },
    discount: '30%',
    validUntil: { vi: 'Không giới hạn', en: 'No expiration', fr: 'Sans expiration', cn: '无期限', ar: 'بلا انتهاء' },
    conditions: {
      vi: ['Áp dụng lần đầu', 'Không kết hợp khuyến mãi khác', 'Đặt lịch trước 24h'],
      en: ['First visit only', 'Cannot combine with other promos', 'Book 24h in advance'],
      fr: ['Première visite uniquement', 'Non cumulable avec d’autres promos', 'Réserver 24h à l’avance'],
      cn: ['仅限首次', '不可与其他优惠同享', '提前 24 小时预约'],
      ar: ['للزيارة الأولى فقط', 'لا يُجمع مع عروض أخرى', 'الحجز قبل 24 ساعة'],
    },
  },
  {
    title: { vi: 'Combo Couple Valentine', en: 'Valentine Couple Combo', fr: 'Combo Couple Saint-Valentin', cn: '情人节情侣套餐', ar: 'باقة عيد الحب للأزواج' },
    description: {
      vi: 'Trọn gói 2 người: massage + facial + trà chiều trong không gian riêng.',
      en: 'Package for 2: massage + facial + afternoon tea in private setting.',
      fr: 'Forfait pour 2 : massage + soin du visage + thé de l’après-midi dans un cadre privé.',
      cn: '双人套餐：按摩 + 面部护理 + 私密空间下午茶。',
      ar: 'باقة لشخصين: تدليك + عناية بالوجه + شاي بعد الظهر في أجواء خاصة.',
    },
    discount: '25%',
    validUntil: { vi: '28/02/2026', en: 'Feb 28, 2026', fr: '28 févr. 2026', cn: '2026年2月28日', ar: '28 فبراير 2026' },
    conditions: {
      vi: ['Đặt trước 48h', 'Áp dụng thứ 2 - thứ 6', 'Thanh toán một lần'],
      en: ['Book 48h ahead', 'Mon-Fri only', 'Single payment'],
      fr: ['Réserver 48h à l’avance', 'Du lundi au vendredi', 'Paiement unique'],
      cn: ['提前 48 小时预约', '仅限周一至周五', '一次性付款'],
      ar: ['الحجز قبل 48 ساعة', 'من الاثنين إلى الجمعة', 'دفعة واحدة'],
    },
  },
  {
    title: { vi: 'Gói sinh nhật đặc biệt', en: 'Birthday special', fr: 'Spécial anniversaire', cn: '生日特惠', ar: 'عرض عيد الميلاد' },
    description: {
      vi: 'Tặng 1 buổi massage miễn phí trong tháng sinh nhật khi mua gói liệu trình.',
      en: 'Free massage session in your birthday month when purchasing a treatment package.',
      fr: 'Une séance de massage offerte le mois de votre anniversaire à l’achat d’un forfait de soins.',
      cn: '购买疗程套餐，生日当月免费赠送 1 次按摩。',
      ar: 'جلسة تدليك مجانية في شهر ميلادك عند شراء باقة علاج.',
    },
    discount: 'FREE',
    validUntil: { vi: 'Trong tháng sinh nhật', en: 'During birthday month', fr: 'Pendant le mois d’anniversaire', cn: '生日当月', ar: 'خلال شهر الميلاد' },
    conditions: {
      vi: ['Xuất trình CMND/CCCD', 'Mua gói từ 5 triệu', 'Áp dụng 1 lần/năm'],
      en: ['Show valid ID', 'Purchase package from $220+', 'Once per year'],
      fr: ['Présenter une pièce d’identité', 'Forfait à partir de 220 $', 'Une fois par an'],
      cn: ['出示有效证件', '购买 220 美元以上套餐', '每年一次'],
      ar: ['إبراز هوية سارية', 'شراء باقة من 220 دولارًا فأكثر', 'مرة واحدة سنويًا'],
    },
  },
];

// ----------------------------------------------------------------------
// PROMOTIONS (Khuyến mãi)
// ----------------------------------------------------------------------

export type Spa1Promotion = {
  title: LocalizedText;
  badge: LocalizedText;
  description: LocalizedText;
  period: LocalizedText;
};

export const spa1Promotions: Spa1Promotion[] = [
  {
    title: { vi: 'Flash Sale mùa hè', en: 'Summer Flash Sale', fr: 'Vente flash d’été', cn: '夏季闪购', ar: 'تخفيضات الصيف الخاطفة' },
    badge: { vi: 'HOT', en: 'HOT', fr: 'HOT', cn: '热销', ar: 'الأكثر رواجًا' },
    description: {
      vi: 'Giảm đến 40% tất cả dịch vụ body và massage trong tuần lễ hè. Đặt ngay!',
      en: 'Up to 40% off all body and massage services during summer week. Book now!',
      fr: 'Jusqu’à 40 % de réduction sur tous les soins du corps et massages pendant la semaine d’été. Réservez vite !',
      cn: '夏季周期间所有身体和按摩服务低至 6 折。立即预约！',
      ar: 'خصم حتى 40% على جميع خدمات الجسم والتدليك خلال أسبوع الصيف. احجز الآن!',
    },
    period: { vi: '01/07 - 07/07/2026', en: 'Jul 1 - Jul 7, 2026', fr: '1 - 7 juil. 2026', cn: '2026年7月1日 - 7月7日', ar: '1 - 7 يوليو 2026' },
  },
  {
    title: { vi: 'Thứ 3 vàng - Facial 50%', en: 'Golden Tuesday - Facial 50%', fr: 'Mardi en or - Soin du visage 50%', cn: '黄金周二 - 面部护理五折', ar: 'الثلاثاء الذهبي - عناية الوجه 50%' },
    badge: { vi: 'MỖI TUẦN', en: 'WEEKLY', fr: 'HEBDO', cn: '每周', ar: 'أسبوعيًا' },
    description: {
      vi: 'Mỗi thứ 3 hàng tuần, giảm 50% dịch vụ chăm sóc da mặt cơ bản.',
      en: 'Every Tuesday, 50% off basic facial care services.',
      fr: 'Chaque mardi, 50 % de réduction sur les soins du visage de base.',
      cn: '每周二，基础面部护理服务享五折优惠。',
      ar: 'كل ثلاثاء، خصم 50% على خدمات العناية الأساسية بالوجه.',
    },
    period: { vi: 'Mỗi thứ 3', en: 'Every Tuesday', fr: 'Chaque mardi', cn: '每周二', ar: 'كل ثلاثاء' },
  },
  {
    title: { vi: 'Giới thiệu bạn - nhận quà', en: 'Refer & Earn', fr: 'Parrainez & gagnez', cn: '推荐有礼', ar: 'ادعُ صديقًا واربح' },
    badge: { vi: 'THƯỜNG XUYÊN', en: 'ONGOING', fr: 'EN CONTINU', cn: '长期', ar: 'مستمر' },
    description: {
      vi: 'Giới thiệu bạn bè, cả hai cùng nhận voucher 500.000 VNĐ cho lần tiếp theo.',
      en: 'Refer friends — both receive a $22 voucher for next visit.',
      fr: 'Parrainez des amis — vous recevez tous les deux un bon de 22 $ pour la prochaine visite.',
      cn: '推荐好友，双方均获赠 22 美元代金券，下次使用。',
      ar: 'ادعُ أصدقاءك — يحصل كلاكما على قسيمة بقيمة 22 دولارًا للزيارة التالية.',
    },
    period: { vi: 'Không giới hạn', en: 'No expiration', fr: 'Sans expiration', cn: '无期限', ar: 'بلا انتهاء' },
  },
];

// ----------------------------------------------------------------------
// BRANCHES (Hệ thống chi nhánh)
// ----------------------------------------------------------------------

export type Spa1Branch = {
  name: LocalizedText;
  address: LocalizedText;
  phone: string;
  hours: LocalizedText;
  mapUrl: string;
};

export const spa1Branches: Spa1Branch[] = [
  {
    name: { vi: 'Luxe Spa - Quận 1', en: 'Luxe Spa - District 1', fr: 'Luxe Spa - District 1', cn: 'Luxe Spa - 第一郡', ar: 'Luxe Spa - الدائرة 1' },
    address: {
      vi: '123 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM',
      en: '123 Nguyen Hue, Ben Nghe Ward, District 1, HCMC',
      fr: '123 Nguyen Hue, quartier Ben Nghe, District 1, Hô-Chi-Minh-Ville',
      cn: '胡志明市第一郡本义坊阮示街123号',
      ar: '123 نغوين هوي، حي بن نغي، الدائرة 1، مدينة هو تشي منه',
    },
    phone: '028 1234 5678',
    hours: { vi: '9:00 - 21:00 hàng ngày', en: '9:00 AM - 9:00 PM daily', fr: '9h00 - 21h00 tous les jours', cn: '每日 9:00 - 21:00', ar: '9:00 صباحًا - 9:00 مساءً يوميًا' },
    mapUrl: 'https://maps.google.com/?q=10.7731,106.7030',
  },
  {
    name: { vi: 'Luxe Spa - Quận 7', en: 'Luxe Spa - District 7', fr: 'Luxe Spa - District 7', cn: 'Luxe Spa - 第七郡', ar: 'Luxe Spa - الدائرة 7' },
    address: {
      vi: '456 Nguyễn Thị Thập, P. Tân Phong, Quận 7, TP.HCM',
      en: '456 Nguyen Thi Thap, Tan Phong Ward, District 7, HCMC',
      fr: '456 Nguyen Thi Thap, quartier Tan Phong, District 7, Hô-Chi-Minh-Ville',
      cn: '胡志明市第七郡新丰坊阮示十街456号',
      ar: '456 نغوين ثي ثاب، حي تان فونغ، الدائرة 7، مدينة هو تشي منه',
    },
    phone: '028 8765 4321',
    hours: { vi: '9:00 - 22:00 hàng ngày', en: '9:00 AM - 10:00 PM daily', fr: '9h00 - 22h00 tous les jours', cn: '每日 9:00 - 22:00', ar: '9:00 صباحًا - 10:00 مساءً يوميًا' },
    mapUrl: 'https://maps.google.com/?q=10.7379,106.7218',
  },
  {
    name: { vi: 'Luxe Spa - Thủ Đức', en: 'Luxe Spa - Thu Duc', fr: 'Luxe Spa - Thu Duc', cn: 'Luxe Spa - 首德', ar: 'Luxe Spa - ثو دوك' },
    address: {
      vi: '789 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức',
      en: '789 Vo Van Ngan, Linh Chieu Ward, Thu Duc City',
      fr: '789 Vo Van Ngan, quartier Linh Chieu, ville de Thu Duc',
      cn: '首德市靈昭坊武文银街789号',
      ar: '789 فو فان نغان، حي لين تشيو، مدينة ثو دوك',
    },
    phone: '028 5555 6666',
    hours: { vi: '8:30 - 21:30 hàng ngày', en: '8:30 AM - 9:30 PM daily', fr: '8h30 - 21h30 tous les jours', cn: '每日 8:30 - 21:30', ar: '8:30 صباحًا - 9:30 مساءً يوميًا' },
    mapUrl: 'https://maps.google.com/?q=10.8510,106.7720',
  },
];

// ----------------------------------------------------------------------
// FEEDBACK
// ----------------------------------------------------------------------

export type Spa1Feedback = {
  name: string;
  avatar: string;
  rating: number;
  service: LocalizedText;
  comment: LocalizedText;
  date: string;
};

export const spa1Feedbacks: Spa1Feedback[] = [
  {
    name: 'Nguyễn Thu Hà',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    service: { vi: 'Massage trị liệu', en: 'Therapeutic massage', fr: 'Massage thérapeutique', cn: '理疗按摩', ar: 'تدليك علاجي' },
    comment: {
      vi: 'Dịch vụ tuyệt vời, không gian sang trọng. Kỹ thuật viên rất chuyên nghiệp và tận tâm.',
      en: 'Excellent service, luxurious atmosphere. The therapist was very professional and dedicated.',
      fr: 'Service excellent, ambiance luxueuse. La thérapeute était très professionnelle et dévouée.',
      cn: '服务卓越，环境奢华。理疗师非常专业用心。',
      ar: 'خدمة ممتازة وأجواء فاخرة. كانت الأخصائية احترافية جدًا ومتفانية.',
    },
    date: '2026-05-15',
  },
  {
    name: 'Trần Minh Khoa',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    service: { vi: 'Couple Spa', en: 'Couple Spa', fr: 'Spa en duo', cn: '情侣水疗', ar: 'سبا للأزواج' },
    comment: {
      vi: 'Trải nghiệm hoàn hảo cho kỷ niệm ngày cưới. Sẽ quay lại thường xuyên!',
      en: 'Perfect experience for our anniversary. Will definitely come back!',
      fr: 'Expérience parfaite pour notre anniversaire de mariage. Nous reviendrons sûrement !',
      cn: '结婚纪念日的完美体验。一定会再来！',
      ar: 'تجربة مثالية لذكرى زواجنا. سنعود حتمًا!',
    },
    date: '2026-04-20',
  },
  {
    name: 'Lê Hoàng Yến',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 4,
    service: { vi: 'Chăm sóc da mặt', en: 'Facial treatment', fr: 'Soin du visage', cn: '面部护理', ar: 'عناية بالوجه' },
    comment: {
      vi: 'Da mình cải thiện rõ rệt sau 3 buổi. Rất hài lòng với quy trình tư vấn.',
      en: 'My skin improved significantly after 3 sessions. Very satisfied with the consultation process.',
      fr: 'Ma peau s’est nettement améliorée après 3 séances. Très satisfaite du processus de conseil.',
      cn: '3 次疗程后肤肤明显改善。对咨询流程非常满意。',
      ar: 'تحسّنت بشرتي بوضوح بعد 3 جلسات. راضية جدًا عن عملية الاستشارة.',
    },
    date: '2026-03-10',
  },
  {
    name: 'Phạm Đức Anh',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    service: { vi: 'Aromatherapy', en: 'Aromatherapy', fr: 'Aromathérapie', cn: '芳香疗法', ar: 'العلاج بالروائح' },
    comment: {
      vi: 'Cảm giác thư thái tuyệt đối. Mùi hương rất dễ chịu, giúp mình ngủ ngon hơn nhiều.',
      en: 'Absolutely relaxing experience. The scents are lovely and help me sleep much better.',
      fr: 'Expérience absolument relaxante. Les parfums sont agréables et m’aident à bien mieux dormir.',
      cn: '绝对放松的体验。香气思人，让我睡得更好。',
      ar: 'تجربة مريحة تمامًا. الروائح رائعة وتساعدني على النوم بشكل أفضل بكثير.',
    },
    date: '2026-02-28',
  },
];

// ----------------------------------------------------------------------
// PARTNERS (Cộng sự)
// ----------------------------------------------------------------------

export type Spa1Partner = {
  name: string;
  logo: string;
  description: LocalizedText;
  website: string;
};

export const spa1Partners: Spa1Partner[] = [
  {
    name: 'Dermalogica',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dermalogica_logo.svg/200px-Dermalogica_logo.svg.png',
    description: {
      vi: 'Thương hiệu mỹ phẩm chuyên nghiệp hàng đầu thế giới.',
      en: 'World-leading professional skincare brand.',
      fr: 'Marque de soins professionnels leader mondial.',
      cn: '世界领先的专业护肤品牌。',
      ar: 'علامة رائدة عالميًا في العناية الاحترافية بالبشرة.',
    },
    website: 'https://www.dermalogica.com',
  },
  {
    name: 'Elemis',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Elemis_logo.svg/200px-Elemis_logo.svg.png',
    description: {
      vi: 'Sản phẩm spa cao cấp từ Anh Quốc.',
      en: 'Premium British spa products.',
      fr: 'Produits spa britanniques haut de gamme.',
      cn: '来自英国的高端水疗产品。',
      ar: 'منتجات سبا بريطانية فاخرة.',
    },
    website: 'https://www.elemis.com',
  },
  {
    name: 'doTERRA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/DoTERRA_logo.png',
    description: {
      vi: 'Tinh dầu thiên nhiên chuẩn trị liệu.',
      en: 'Certified therapeutic-grade essential oils.',
      fr: 'Huiles essentielles de qualité thérapeutique certifiée.',
      cn: '认证疗用级天然精油。',
      ar: 'زيوت أساسية بدرجة علاجية معتمدة.',
    },
    website: 'https://www.doterra.com',
  },
  {
    name: 'Thalgo',
    logo: 'https://upload.wikimedia.org/wikipedia/fr/4/44/Thalgo_logo.png',
    description: {
      vi: 'Mỹ phẩm biển Pháp, chuyên gia chăm sóc da.',
      en: 'French marine cosmetics, skincare specialists.',
      fr: 'Cosmétiques marins français, spécialistes du soin de la peau.',
      cn: '法国海洋化妝品，护肤专家。',
      ar: 'مستحضرات تجميل بحرية فرنسية، خبراء العناية بالبشرة.',
    },
    website: 'https://www.thalgo.com',
  },
];

// ----------------------------------------------------------------------
// BEFORE-AFTER
// ----------------------------------------------------------------------

export type Spa1BeforeAfter = {
  title: LocalizedText;
  service: LocalizedText;
  sessions: number;
  beforeImage: string;
  afterImage: string;
  description: LocalizedText;
};

export const spa1BeforeAfters: Spa1BeforeAfter[] = [
  {
    title: { vi: 'Trị nám sau 6 buổi', en: 'Melasma treatment after 6 sessions', fr: 'Traitement du mélasma après 6 séances', cn: '6 次疗程后的黄褐斑治疗', ar: 'علاج الكلف بعد 6 جلسات' },
    service: { vi: 'Chăm sóc da mặt', en: 'Facial treatment', fr: 'Soin du visage', cn: '面部护理', ar: 'عناية بالوجه' },
    sessions: 6,
    beforeImage: SPA1_PAGE_IMAGES.beforeAfter1,
    afterImage: SPA1_PAGE_IMAGES.beforeAfter2,
    description: {
      vi: 'Giảm 70% vùng nám, da đều màu và sáng hơn rõ rệt.',
      en: '70% reduction in melasma, significantly more even and brighter skin.',
      fr: 'Réduction de 70 % du mélasma, peau nettement plus uniforme et lumineuse.',
      cn: '黄褐斑减少 70%，肤色明显更均匀、更亮白。',
      ar: 'انخفاض الكلف بنسبة 70%، بشرة أكثر تجانسًا وإشراقًا بوضوح.',
    },
  },
  {
    title: { vi: 'Phục hồi da sau mụn', en: 'Post-acne skin restoration', fr: 'Réparation de la peau après acné', cn: '痘后肌肤修复', ar: 'ترميم البشرة بعد حب الشباب' },
    service: { vi: 'Liệu trình body', en: 'Body treatment', fr: 'Soin du corps', cn: '身体护理', ar: 'عناية بالجسم' },
    sessions: 8,
    beforeImage: SPA1_PAGE_IMAGES.beforeAfter2,
    afterImage: SPA1_PAGE_IMAGES.beforeAfter1,
    description: {
      vi: 'Sẹo mụn mờ dần, bề mặt da mịn màng hơn sau 8 buổi trị liệu.',
      en: 'Acne scars faded, smoother skin surface after 8 treatment sessions.',
      fr: 'Cicatrices d’acné estompées, surface de la peau plus lisse après 8 séances.',
      cn: '痘疤逐渐淡化，8 次疗程后肌肤表面更光滑。',
      ar: 'باهتت ندوب حب الشباب، وأصبح سطح البشرة أنعم بعد 8 جلسات.',
    },
  },
];

// ----------------------------------------------------------------------
// FAQ
// ----------------------------------------------------------------------

export type Spa1Faq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export const spa1Faqs: Spa1Faq[] = [
  {
    question: {
      vi: 'Tôi nên đến trước giờ hẹn bao lâu?',
      en: 'How early should I arrive before my appointment?',
      fr: 'Combien de temps à l’avance dois-je arriver avant mon rendez-vous ?',
      cn: '我应该提前多久到达预约？',
      ar: 'كم يجب أن أصل مبكرًا قبل موعدي؟',
    },
    answer: {
      vi: 'Chúng tôi khuyến khích bạn đến sớm 15 phút để hoàn tất thủ tục và thư giãn trước liệu trình.',
      en: 'We recommend arriving 15 minutes early to complete registration and relax before your treatment.',
      fr: 'Nous vous recommandons d’arriver 15 minutes en avance pour finaliser l’enregistrement et vous détendre avant votre soin.',
      cn: '我们建议您提前 15 分钟到达，以便完成登记并在疗程前放松。',
      ar: 'نوصي بالوصول قبل 15 دقيقة لإكمال التسجيل والاسترخاء قبل العلاج.',
    },
  },
  {
    question: { vi: 'Có thể hủy hoặc đổi lịch không?', en: 'Can I cancel or reschedule?', fr: 'Puis-je annuler ou reporter ?', cn: '可以取消或改期吗？', ar: 'هل يمكنني الإلغاء أو إعادة الجدولة؟' },
    answer: {
      vi: 'Bạn có thể hủy hoặc đổi lịch miễn phí trước 24 giờ. Hủy muộn sẽ mất 30% phí dịch vụ.',
      en: 'Free cancellation or rescheduling up to 24 hours before. Late cancellations incur a 30% service fee.',
      fr: 'Annulation ou report gratuit jusqu’à 24 heures avant. Les annulations tardives entraînent des frais de 30 %.',
      cn: '提前 24 小时可免费取消或改期。逆期取消需收取 30% 服务费。',
      ar: 'إلغاء أو إعادة جدولة مجانًا حتى 24 ساعة قبل الموعد. الإلغاء المتأخر يترتّب عليه رسم 30% من الخدمة.',
    },
  },
  {
    question: { vi: 'Có chỗ đậu xe không?', en: 'Is parking available?', fr: 'Un parking est-il disponible ?', cn: '是否提供停车？', ar: 'هل يتوفر موقف للسيارات؟' },
    answer: {
      vi: 'Tất cả chi nhánh đều có bãi đậu xe miễn phí cho khách trong thời gian sử dụng dịch vụ.',
      en: 'All branches offer free parking for clients during their service time.',
      fr: 'Tous les centres offrent un parking gratuit aux clients pendant la durée de leur service.',
      cn: '所有门店均为顾客在服务期间提供免费停车。',
      ar: 'توفر جميع الفروع مواقف مجانية للعملاء أثناء فترة الخدمة.',
    },
  },
  {
    question: {
      vi: 'Liệu trình có phù hợp với phụ nữ mang thai?',
      en: 'Are treatments safe for pregnant women?',
      fr: 'Les soins sont-ils sûrs pour les femmes enceintes ?',
      cn: '疗程适合孕妇吗？',
      ar: 'هل العلاجات آمنة للحوامل؟',
    },
    answer: {
      vi: 'Một số liệu trình được thiết kế riêng cho mẹ bầu. Vui lòng tư vấn trước khi đặt lịch.',
      en: 'Some treatments are designed specifically for expectant mothers. Please consult before booking.',
      fr: 'Certains soins sont conçus spécifiquement pour les futures mamans. Veuillez consulter avant de réserver.',
      cn: '部分疗程专为准妈妈设计。预约前请先咨询。',
      ar: 'بعض العلاجات مصممة خصيصًا للأمهات الحوامل. يُرجى الاستشارة قبل الحجز.',
    },
  },
  {
    question: { vi: 'Thanh toán bằng hình thức nào?', en: 'What payment methods are accepted?', fr: 'Quels modes de paiement sont acceptés ?', cn: '接受哪些付款方式？', ar: 'ما طرق الدفع المقبولة؟' },
    answer: {
      vi: 'Chúng tôi chấp nhận tiền mặt, chuyển khoản, thẻ Visa/Mastercard và ví điện tử MoMo, ZaloPay.',
      en: 'We accept cash, bank transfer, Visa/Mastercard, and e-wallets (MoMo, ZaloPay).',
      fr: 'Nous acceptons les espèces, le virement bancaire, Visa/Mastercard et les portefeuilles électroniques (MoMo, ZaloPay).',
      cn: '我们接受现金、银行转账、Visa/Mastercard 及电子钱包（MoMo、ZaloPay）。',
      ar: 'نقبل النقد والتحويل البنكي وبطاقات Visa/Mastercard والمحافظ الإلكترونية (MoMo، ZaloPay).',
    },
  },
  {
    question: { vi: 'Có gói membership không?', en: 'Do you offer memberships?', fr: 'Proposez-vous des abonnements ?', cn: '是否提供会员套餐？', ar: 'هل تقدمون عضويات؟' },
    answer: {
      vi: 'Có! Chúng tôi có gói Silver, Gold và Platinum với nhiều ưu đãi hấp dẫn. Xem chi tiết tại trang Gói ưu đãi.',
      en: 'Yes! We offer Silver, Gold, and Platinum tiers with exclusive benefits. See our Offers page for details.',
      fr: 'Oui ! Nous proposons les niveaux Silver, Gold et Platinum avec des avantages exclusifs. Voir notre page Offres pour plus de détails.',
      cn: '是的！我们提供银、金和铂金会员等级，享独家权益。详情请见优惠页面。',
      ar: 'نعم! نقدم مستويات فضية وذهبية وبلاتينيوم بمزايا حصرية. راجع صفحة العروض للتفاصيل.',
    },
  },
];

// ----------------------------------------------------------------------
// POLICIES
// ----------------------------------------------------------------------

export type Spa1Policy = {
  title: LocalizedText;
  content: Record<Spa1Lang, string[]>;
};

export const spa1Policies: Spa1Policy[] = [
  {
    title: { vi: 'Chính sách đặt lịch & hủy lịch', en: 'Booking & cancellation policy', fr: 'Politique de réservation & d’annulation', cn: '预约与取消政策', ar: 'سياسة الحجز والإلغاء' },
    content: {
      vi: [
        'Đặt lịch online hoặc qua hotline trước ít nhất 2 giờ.',
        'Hủy miễn phí trước 24 giờ. Hủy muộn mất 30% phí dịch vụ.',
        'Không đến (no-show) mất 50% phí dịch vụ.',
        'Đổi lịch miễn phí tối đa 2 lần cho mỗi booking.',
      ],
      en: [
        'Book online or via hotline at least 2 hours in advance.',
        'Free cancellation 24 hours before. Late cancellation incurs 30% fee.',
        'No-show incurs 50% service fee.',
        'Free rescheduling up to 2 times per booking.',
      ],
      fr: [
        'Réservez en ligne ou par hotline au moins 2 heures à l’avance.',
        'Annulation gratuite 24 heures avant. Annulation tardive : frais de 30 %.',
        'Absence (no-show) : frais de 50 % du service.',
        'Report gratuit jusqu’à 2 fois par réservation.',
      ],
      cn: [
        '请提前至少 2 小时在线或通过热线预约。',
        '提前 24 小时可免费取消。逆期取消收取 30% 费用。',
        '未到场（no-show）收取 50% 服务费。',
        '每笔预约最多可免费改期 2 次。',
      ],
      ar: [
        'احجز عبر الإنترنت أو الخط الساخن قبل ساعتين على الأقل.',
        'إلغاء مجاني قبل 24 ساعة. الإلغاء المتأخر رسمه 30%.',
        'عدم الحضور يترتّب عليه 50% من رسم الخدمة.',
        'إعادة جدولة مجانية حتى مرتين لكل حجز.',
      ],
    },
  },
  {
    title: { vi: 'Chính sách hoàn tiền', en: 'Refund policy', fr: 'Politique de remboursement', cn: '退款政策', ar: 'سياسة الاسترداد' },
    content: {
      vi: [
        'Hoàn tiền 100% nếu dịch vụ chưa bắt đầu và hủy trước 24h.',
        'Hoàn 50% nếu đã sử dụng dưới 30% gói liệu trình.',
        'Không hoàn tiền cho gói đã sử dụng trên 50%.',
        'Thời gian hoàn tiền: 5-7 ngày làm việc qua hình thức thanh toán ban đầu.',
      ],
      en: [
        '100% refund if service has not started and canceled 24h before.',
        '50% refund if less than 30% of treatment package was used.',
        'No refund for packages used over 50%.',
        'Refund processing: 5-7 business days via original payment method.',
      ],
      fr: [
        'Remboursement à 100 % si le service n’a pas commencé et annulé 24h avant.',
        'Remboursement de 50 % si moins de 30 % du forfait a été utilisé.',
        'Aucun remboursement pour les forfaits utilisés à plus de 50 %.',
        'Délai de remboursement : 5 à 7 jours ouvrés via le mode de paiement d’origine.',
      ],
      cn: [
        '若服务尚未开始且提前 24 小时取消，全额退款。',
        '若疗程套餐使用不足 30%，退款 50%。',
        '套餐使用超过 50% 不予退款。',
        '退款处理：5-7 个工作日，原付款方式退回。',
      ],
      ar: [
        'استرداد 100% إذا لم تبدأ الخدمة وتم الإلغاء قبل 24 ساعة.',
        'استرداد 50% إذا تم استخدام أقل من 30% من باقة العلاج.',
        'لا يوجد استرداد للباقات المستخدمة بأكثر من 50%.',
        'مدة الاسترداد: 5-7 أيام عمل عبر طريقة الدفع الأصلية.',
      ],
    },
  },
  {
    title: { vi: 'Chính sách bảo mật thông tin', en: 'Privacy policy', fr: 'Politique de confidentialité', cn: '隐私政策', ar: 'سياسة الخصوصية' },
    content: {
      vi: [
        'Thông tin cá nhân được bảo mật tuyệt đối, không chia sẻ cho bên thứ 3.',
        'Dữ liệu sức khỏe chỉ dùng cho mục đích tư vấn dịch vụ.',
        'Khách hàng có quyền yêu cầu xóa dữ liệu bất kỳ lúc nào.',
        'Hệ thống bảo mật đạt tiêu chuẩn ISO 27001.',
      ],
      en: [
        'Personal information is strictly confidential and never shared with third parties.',
        'Health data is used solely for service consultation purposes.',
        'Clients may request data deletion at any time.',
        'Security system meets ISO 27001 standards.',
      ],
      fr: [
        'Les informations personnelles sont strictement confidentielles et jamais partagées avec des tiers.',
        'Les données de santé sont utilisées uniquement à des fins de conseil de service.',
        'Les clients peuvent demander la suppression de leurs données à tout moment.',
        'Le système de sécurité répond à la norme ISO 27001.',
      ],
      cn: [
        '个人信息严格保密，绝不与第三方共享。',
        '健康数据仅用于服务咨询目的。',
        '顾客可随时要求删除数据。',
        '安全系统符合 ISO 27001 标准。',
      ],
      ar: [
        'المعلومات الشخصية سرية تمامًا ولا تُشارك مع أي طرف ثالث.',
        'تُستخدم البيانات الصحية فقط لأغراض استشارة الخدمة.',
        'يحقّ للعملاء طلب حذف بياناتهم في أي وقت.',
        'يستوفي نظام الأمان معايير ISO 27001.',
      ],
    },
  },
];

// ----------------------------------------------------------------------
// BLOG POSTS
// ----------------------------------------------------------------------

export type Spa1BlogPost = {
  slug: string;
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  readTime: LocalizedText;
  body: Record<Spa1Lang, string[]>;
};

export const spa1BlogPosts: Spa1BlogPost[] = [
  {
    slug: 'bi-quyet-chon-lieu-trinh-phu-hop',
    image: SPA1_PAGE_IMAGES.blog1,
    category: { vi: 'Tư vấn', en: 'Advice', fr: 'Conseils', cn: '咨询', ar: 'نصائح' },
    title: {
      vi: 'Bí quyết chọn liệu trình spa phù hợp với tình trạng cơ thể',
      en: 'How to choose the right spa treatment for your body condition',
      fr: 'Comment choisir le soin spa adapté à l’état de votre corps',
      cn: '如何根据身体状况选择合适的水疗疗程',
      ar: 'كيف تختار علاج السبا المناسب لحالة جسمك',
    },
    excerpt: {
      vi: 'Hướng dẫn chi tiết giúp bạn lựa chọn dịch vụ phù hợp nhất theo nhu cầu.',
      en: 'Detailed guide to help you select the most suitable service for your needs.',
      fr: 'Guide détaillé pour vous aider à choisir le service le plus adapté à vos besoins.',
      cn: '详细指南，帮助您根据需求选择最合适的服务。',
      ar: 'دليل مفصّل يساعدك على اختيار الخدمة الأنسب لاحتياجاتك.',
    },
    readTime: { vi: '5 phút đọc', en: '5 min read', fr: '5 min de lecture', cn: '阅读 5 分钟', ar: 'قراءة 5 دقائق' },
    body: {
      vi: [
        'Trước khi đặt lịch, hãy xác định mục tiêu chính: thư giãn, giảm đau, hoặc làm đẹp.',
        'Nếu bạn thường xuyên ngồi văn phòng, massage trị liệu với lực vừa sẽ giúp giải tỏa áp lực cột sống.',
        'Với người có da nhạy cảm, nên chọn facial với sản phẩm organic và thử patch test trước.',
      ],
      en: [
        'Before booking, identify your main goal: relaxation, pain relief, or beauty enhancement.',
        'If you sit at a desk all day, medium-pressure therapeutic massage helps relieve spinal tension.',
        'For sensitive skin, choose organic facials and request a patch test first.',
      ],
      fr: [
        'Avant de réserver, définissez votre objectif principal : relaxation, soulagement de la douleur ou embellissement.',
        'Si vous travaillez au bureau toute la journée, un massage thérapeutique à pression moyenne soulage les tensions de la colonne.',
        'Pour les peaux sensibles, choisissez des soins du visage bio et demandez un test cutané au préalable.',
      ],
      cn: [
        '预约前，先明确主要目标：放松、缓痛或美容。',
        '若您整天伏案工作，中等力度的理疗按摩有助于缓解脊柱紧张。',
        '敏感肌肤请选择有机面部护理，并先进行斍贴测试。',
      ],
      ar: [
        'قبل الحجز، حدّد هدفك الرئيسي: الاسترخاء أو تخفيف الألم أو تعزيز الجمال.',
        'إذا كنت تجلس على المكتب طوال اليوم، فإن التدليك العلاجي متوسط الضغط يخفف توتر العمود الفقري.',
        'للبشرة الحساسة، اختر عناية وجه عضوية واطلب اختبار حساسية أولًا.',
      ],
    },
  },
  {
    slug: 'xu-huong-spa-2026',
    image: SPA1_PAGE_IMAGES.blog2,
    category: { vi: 'Xu hướng', en: 'Trends', fr: 'Tendances', cn: '趋势', ar: 'الاتجاهات' },
    title: {
      vi: 'Top 5 xu hướng spa đáng trải nghiệm năm 2026',
      en: 'Top 5 spa trends worth trying in 2026',
      fr: 'Top 5 des tendances spa à essayer en 2026',
      cn: '2026 年值得体验的五大水疗趋势',
      ar: 'أفضل 5 اتجاهات سبا تستحق التجربة في 2026',
    },
    excerpt: {
      vi: 'Từ công nghệ LED đến thiền chánh niệm kết hợp massage.',
      en: 'From LED technology to mindfulness meditation combined with massage.',
      fr: 'De la technologie LED à la méditation de pleine conscience combinée au massage.',
      cn: '从 LED 技术到正念冥想结合按摩。',
      ar: 'من تقنية LED إلى تأمل اليقظة الذهنية المدمج مع التدليك.',
    },
    readTime: { vi: '4 phút đọc', en: '4 min read', fr: '4 min de lecture', cn: '阅读 4 分钟', ar: 'قراءة 4 دقائق' },
    body: {
      vi: [
        'Liệu pháp ánh sáng LED giúp kích thích collagen và giảm viêm hiệu quả.',
        'Massage kết hợp thiền guided ngày càng phổ biến vì hiệu quả giảm stress toàn diện.',
        'CBD-infused products đang được ưa chuộng nhờ tác dụng chống viêm tự nhiên.',
      ],
      en: [
        'LED light therapy stimulates collagen and effectively reduces inflammation.',
        'Guided meditation massage is trending for its holistic stress-relief benefits.',
        'CBD-infused products are popular for their natural anti-inflammatory properties.',
      ],
      fr: [
        'La luminothérapie LED stimule le collagène et réduit efficacement l’inflammation.',
        'Le massage avec méditation guidée est tendance pour ses bienfaits anti-stress holistiques.',
        'Les produits infusés au CBD sont prisés pour leurs propriétés anti-inflammatoires naturelles.',
      ],
      cn: [
        'LED 光疗可刺激胶原蛋白并有效减轻炎症。',
        '结合引导冥想的按摩因其全面减压效果而日益流行。',
        'CBD 注入类产品因其天然抗炎特性而受青睐。',
      ],
      ar: [
        'العلاج بضوء LED يحفّز الكولاجين ويقلل الالتهاب بفعالية.',
        'تدليك التأمل الموجّه رائج لفوائده الشاملة في تخفيف التوتر.',
        'المنتجات المعززة بـ CBD رائجة لخصائصها المضادة للالتهاب الطبيعية.',
      ],
    },
  },
  {
    slug: 'cham-soc-da-mua-he',
    image: SPA1_PAGE_IMAGES.blog3,
    category: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soin de la peau', cn: '护肤', ar: 'العناية بالبشرة' },
    title: {
      vi: 'Hướng dẫn chăm sóc da chuyên sâu vào mùa hè',
      en: 'Summer intensive skincare guide',
      fr: 'Guide de soin intensif de la peau en été',
      cn: '夏季深度护肤指南',
      ar: 'دليل العناية المكثفة بالبشرة في الصيف',
    },
    excerpt: {
      vi: 'Bảo vệ và dưỡng da đúng cách khi thời tiết nóng ẩm.',
      en: 'Properly protect and nourish your skin in hot, humid weather.',
      fr: 'Protégez et nourrissez correctement votre peau par temps chaud et humide.',
      cn: '在炎热潮湿的天气中正确保护与滋养肌肤。',
      ar: 'احم بشرتك وغذّها بشكل صحيح في الطقس الحار الرطب.',
    },
    readTime: { vi: '6 phút đọc', en: '6 min read', fr: '6 min de lecture', cn: '阅读 6 分钟', ar: 'قراءة 6 دقائق' },
    body: {
      vi: [
        'Sử dụng kem chống nắng SPF50+ và bôi lại mỗi 2 giờ khi ra ngoài.',
        'Ưu tiên serum cấp ẩm nhẹ thay vì kem dưỡng đặc để tránh bí da.',
        'Facial tuần 1 lần giúp loại bỏ tế bào chết tích tụ do mồ hôi và bụi bẩn.',
      ],
      en: [
        'Use SPF50+ sunscreen and reapply every 2 hours when outdoors.',
        'Prefer lightweight hydrating serums over thick creams to avoid clogged pores.',
        'Weekly facials help remove dead cells accumulated from sweat and dust.',
      ],
      fr: [
        'Utilisez un écran solaire SPF50+ et réappliquez toutes les 2 heures à l’extérieur.',
        'Préférez des sérums hydratants légers aux crèmes épaisses pour éviter les pores obstrués.',
        'Un soin du visage hebdomadaire élimine les cellules mortes accumulées par la transpiration et la poussière.',
      ],
      cn: [
        '使用 SPF50+ 防晒霒，户外每 2 小时补涂一次。',
        '选择轻盈保湿精华而非厚重面霜，以免堵塞毛孔。',
        '每周一次面部护理有助于清除汗液和灰尘积累的死皮。',
      ],
      ar: [
        'استخدم واقي شمس SPF50+ وأعد تطبيقه كل ساعتين في الخارج.',
        'فضّل الأمصال المرطّبة الخفيفة على الكريمات السميكة لتجنّب انسداد المسام.',
        'العناية الأسبوعية بالوجه تساعد على إزالة الخلايا الميتة المتراكمة من العرق والغبار.',
      ],
    },
  },
];

// ----------------------------------------------------------------------
// TRAINING PROGRAMS
// ----------------------------------------------------------------------

export type Spa1Training = {
  title: LocalizedText;
  duration: LocalizedText;
  level: LocalizedText;
  description: LocalizedText;
  modules: Record<Spa1Lang, string[]>;
};

export const spa1TrainingPrograms: Spa1Training[] = [
  {
    title: { vi: 'Kỹ thuật viên Massage', en: 'Massage Therapist', fr: 'Thérapeute en massage', cn: '按摩理疗师', ar: 'أخصائي تدليك' },
    duration: { vi: '3 tháng', en: '3 months', fr: '3 mois', cn: '3 个月', ar: '3 أشهر' },
    level: { vi: 'Cơ bản - Nâng cao', en: 'Basic - Advanced', fr: 'Débutant - Avancé', cn: '初级 - 高级', ar: 'مبتدئ - متقدم' },
    description: {
      vi: 'Chương trình đào tạo toàn diện về kỹ thuật massage chuyên nghiệp.',
      en: 'Comprehensive training program for professional massage techniques.',
      fr: 'Programme de formation complet aux techniques de massage professionnelles.',
      cn: '全面的专业按摩技术培训课程。',
      ar: 'برنامج تدريبي شامل لتقنيات التدليك الاحترافية.',
    },
    modules: {
      vi: [
        'Giải phẫu cơ bản',
        'Kỹ thuật Sweden & Deep tissue',
        'Massage trị liệu cổ vai gáy',
        'Thực hành trên mô hình',
      ],
      en: [
        'Basic anatomy',
        'Swedish & Deep tissue techniques',
        'Neck-shoulder therapeutic massage',
        'Practice on models',
      ],
      fr: [
        'Anatomie de base',
        'Techniques suédoises & tissus profonds',
        'Massage thérapeutique nuque-épaules',
        'Pratique sur modèles',
      ],
      cn: ['基础解剖', '瑞典式与深层组织技术', '颈肩理疗按摩', '模特实践'],
      ar: [
        'تشريح أساسي',
        'تقنيات التدليك السويدي والأنسجة العميقة',
        'تدليك علاجي للرقبة والكتف',
        'التدريب على النماذج',
      ],
    },
  },
  {
    title: { vi: 'Chuyên viên Skincare', en: 'Skincare Specialist', fr: 'Spécialiste soin de la peau', cn: '护肤专员', ar: 'أخصائي العناية بالبشرة' },
    duration: { vi: '2 tháng', en: '2 months', fr: '2 mois', cn: '2 个月', ar: 'شهران' },
    level: { vi: 'Trung cấp', en: 'Intermediate', fr: 'Intermédiaire', cn: '中级', ar: 'متوسط' },
    description: {
      vi: 'Đào tạo chuyên sâu về phân tích da và quy trình chăm sóc da chuyên nghiệp.',
      en: 'In-depth training in skin analysis and professional skincare protocols.',
      fr: 'Formation approfondie à l’analyse de la peau et aux protocoles de soin professionnels.',
      cn: '深入培训肤质分析与专业护肤流程。',
      ar: 'تدريب معمّق في تحليل البشرة وبروتوكولات العناية الاحترافية.',
    },
    modules: {
      vi: [
        'Cấu trúc & phân loại da',
        'Quy trình facial chuyên nghiệp',
        'Sử dụng thiết bị công nghệ cao',
        'Tư vấn skincare routine',
      ],
      en: [
        'Skin structure & classification',
        'Professional facial procedures',
        'High-tech equipment operation',
        'Skincare routine consultation',
      ],
      fr: [
        'Structure & classification de la peau',
        'Procédures de soin du visage professionnelles',
        'Utilisation d’équipements high-tech',
        'Conseil en routine de soin',
      ],
      cn: ['肤肤结构与分类', '专业面部护理流程', '高科技设备操作', '护肤日常咨询'],
      ar: [
        'بنية البشرة وتصنيفها',
        'إجراءات العناية بالوجه الاحترافية',
        'تشغيل الأجهزة عالية التقنية',
        'استشارة روتين العناية بالبشرة',
      ],
    },
  },
  {
    title: { vi: 'Quản lý Spa', en: 'Spa Management', fr: 'Gestion de spa', cn: '水疗管理', ar: 'إدارة السبا' },
    duration: { vi: '1 tháng', en: '1 month', fr: '1 mois', cn: '1 个月', ar: 'شهر واحد' },
    level: { vi: 'Nâng cao', en: 'Advanced', fr: 'Avancé', cn: '高级', ar: 'متقدم' },
    description: {
      vi: 'Khóa học dành cho người muốn mở và vận hành spa chuyên nghiệp.',
      en: 'Course for those who want to open and run a professional spa.',
      fr: 'Cours pour ceux qui souhaitent ouvrir et gérer un spa professionnel.',
      cn: '面向想要开设和运营专业水疗中心人士的课程。',
      ar: 'دورة لمن يرغب في افتتاح وإدارة سبا احترافي.',
    },
    modules: {
      vi: [
        'Lập kế hoạch kinh doanh',
        'Quản lý nhân sự spa',
        'Marketing & branding',
        'Quản lý chất lượng dịch vụ',
      ],
      en: [
        'Business planning',
        'Spa staff management',
        'Marketing & branding',
        'Service quality management',
      ],
      fr: [
        'Planification d’entreprise',
        'Gestion du personnel de spa',
        'Marketing & image de marque',
        'Gestion de la qualité de service',
      ],
      cn: ['商业规划', '水疗人员管理', '营销与品牌建设', '服务质量管理'],
      ar: [
        'التخطيط للأعمال',
        'إدارة موظفي السبا',
        'التسويق وبناء العلامة',
        'إدارة جودة الخدمة',
      ],
    },
  },
];

// ----------------------------------------------------------------------
// CAREER OPENINGS
// ----------------------------------------------------------------------

export type Spa1Career = {
  title: LocalizedText;
  department: LocalizedText;
  type: LocalizedText;
  requirements: Record<Spa1Lang, string[]>;
};

export const spa1Careers: Spa1Career[] = [
  {
    title: { vi: 'Kỹ thuật viên Massage', en: 'Massage Therapist', fr: 'Thérapeute en massage', cn: '按摩理疗师', ar: 'أخصائي تدليك' },
    department: { vi: 'Dịch vụ', en: 'Services', fr: 'Services', cn: '服务', ar: 'الخدمات' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    requirements: {
      vi: [
        'Có chứng chỉ massage trị liệu',
        'Tối thiểu 1 năm kinh nghiệm',
        'Ngoại hình gọn gàng, thân thiện',
      ],
      en: [
        'Massage therapy certificate',
        'Minimum 1 year experience',
        'Well-groomed and friendly appearance',
      ],
      fr: [
        'Certificat de massothérapie',
        'Minimum 1 an d’expérience',
        'Apparence soignée et amicale',
      ],
      cn: ['持有理疗按摩证书', '至少 1 年经验', '仪容整洁、亲切友好'],
      ar: [
        'شهادة في العلاج بالتدليك',
        'خبرة لا تقل عن سنة واحدة',
        'مظهر أنيق وودود',
      ],
    },
  },
  {
    title: { vi: 'Chuyên viên chăm sóc da', en: 'Skincare Specialist', fr: 'Spécialiste soin de la peau', cn: '护肤专员', ar: 'أخصائي العناية بالبشرة' },
    department: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soin de la peau', cn: '护肤', ar: 'العناية بالبشرة' },
    type: { vi: 'Toàn thời gian', en: 'Full-time', fr: 'Temps plein', cn: '全职', ar: 'دوام كامل' },
    requirements: {
      vi: [
        'Tốt nghiệp chuyên ngành da liễu hoặc thẩm mỹ',
        'Sử dụng thành thạo thiết bị chăm sóc da',
        'Giao tiếp tốt',
      ],
      en: [
        'Dermatology or cosmetology graduate',
        'Proficient with skincare devices',
        'Good communication skills',
      ],
      fr: [
        'Diplômé en dermatologie ou cosmétologie',
        'Maîtrise des appareils de soin de la peau',
        'Bonne communication',
      ],
      cn: ['皮肤科或美容专业毕业', '熟练操作护肤设备', '良好的沟通能力'],
      ar: [
        'خريج تخصص الجلدية أو التجميل',
        'إتقان استخدام أجهزة العناية بالبشرة',
        'مهارات تواصل جيدة',
      ],
    },
  },
  {
    title: { vi: 'Lễ tân', en: 'Receptionist', fr: 'Réceptionniste', cn: '前台接待', ar: 'موظف استقبال' },
    department: { vi: 'Hành chính', en: 'Administration', fr: 'Administration', cn: '行政', ar: 'الإدارة' },
    type: { vi: 'Toàn thời gian / Bán thời gian', en: 'Full-time / Part-time', fr: 'Temps plein / Temps partiel', cn: '全职 / 兼职', ar: 'دوام كامل / دوام جزئي' },
    requirements: {
      vi: ['Ngoại hình ưa nhìn', 'Kỹ năng giao tiếp xuất sắc', 'Tiếng Anh giao tiếp cơ bản'],
      en: ['Pleasant appearance', 'Excellent communication skills', 'Basic conversational English'],
      fr: ['Apparence agréable', 'Excellentes compétences en communication', 'Anglais conversationnel de base'],
      cn: ['形象佳', '出色的沟通能力', '基础英语会话'],
      ar: ['مظهر لائق', 'مهارات تواصل ممتازة', 'إنجليزية محادثة أساسية'],
    },
  },
];

// ----------------------------------------------------------------------
// GALLERY
// ----------------------------------------------------------------------

export type Spa1GalleryItem = {
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
};

export const spa1Gallery: Spa1GalleryItem[] = [
  {
    image: SPA1_PAGE_IMAGES.gallery1,
    category: { vi: 'Không gian', en: 'Space', fr: 'Espace', cn: '空间', ar: 'المساحة' },
    title: { vi: 'Sảnh đón VIP', en: 'VIP reception lounge', fr: 'Salon d’accueil VIP', cn: 'VIP 接待大厅', ar: 'صالة استقبال كبار الشخصيات' },
    caption: {
      vi: 'Không gian đón tiếp sang trọng với ánh sáng vàng ấm và nội thất hiện đại.',
      en: 'Luxurious reception with warm golden lighting and modern furnishings.',
      fr: 'Accueil luxueux avec un éclairage doré chaleureux et un mobilier moderne.',
      cn: '奢华的接待空间，配以温暖的金色灯光和现代家具。',
      ar: 'استقبال فاخر بإضاءة ذهبية دافئة وأثاث عصري.',
    },
  },
  {
    image: SPA1_PAGE_IMAGES.gallery2,
    category: { vi: 'Trị liệu', en: 'Therapy', fr: 'Thérapie', cn: '理疗', ar: 'العلاج' },
    title: { vi: 'Phòng massage Platinum', en: 'Platinum massage room', fr: 'Salle de massage Platinum', cn: '铂金按摩房', ar: 'غرفة تدليك بلاتينيوم' },
    caption: {
      vi: 'Phòng riêng biệt với hệ thống âm thanh và ánh sáng điều chỉnh theo liệu trình.',
      en: 'Private room with sound and lighting systems adjusted per treatment.',
      fr: 'Salle privée avec systèmes de son et d’éclairage ajustés selon le soin.',
      cn: '私密房间，音响和灯光系统可根据疗程调节。',
      ar: 'غرفة خاصة بأنظمة صوت وإضاءة تُضبط حسب العلاج.',
    },
  },
  {
    image: SPA1_PAGE_IMAGES.gallery3,
    category: { vi: 'Chăm sóc da', en: 'Skincare', fr: 'Soin de la peau', cn: '护肤', ar: 'العناية بالبشرة' },
    title: { vi: 'Phòng facial công nghệ cao', en: 'High-tech facial room', fr: 'Salle de soin du visage high-tech', cn: '高科技面部护理室', ar: 'غرفة عناية بالوجه عالية التقنية' },
    caption: {
      vi: 'Trang bị đầy đủ thiết bị công nghệ mới nhất cho dịch vụ chăm sóc da.',
      en: 'Fully equipped with the latest technology for skincare services.',
      fr: 'Entièrement équipée des dernières technologies pour les soins de la peau.',
      cn: '配备最新技术的全套护肤设备。',
      ar: 'مجهزة بالكامل بأحدث التقنيات لخدمات العناية بالبشرة.',
    },
  },
  {
    image: SPA1_PAGE_IMAGES.gallery4,
    category: { vi: 'Aromatherapy', en: 'Aromatherapy', fr: 'Aromathérapie', cn: '芳香疗法', ar: 'العلاج العطري' },
    title: { vi: 'Khu vực xông hơi', en: 'Steam area', fr: 'Espace hammam', cn: '蒸汽区', ar: 'منطقة البخار' },
    caption: {
      vi: 'Khu xông hơi riêng tư với tinh dầu tự nhiên và hệ thống nhiệt độ chuẩn.',
      en: 'Private steam area with natural essential oils and calibrated temperature.',
      fr: 'Espace hammam privé avec huiles essentielles naturelles et température calibrée.',
      cn: '私密蒸汽区，配有天然精油和精准温控系统。',
      ar: 'منطقة بخار خاصة بزيوت عطرية طبيعية ودرجة حرارة مضبوطة.',
    },
  },
  {
    image: SPA1_PAGE_IMAGES.gallery5,
    category: { vi: 'Thư giãn', en: 'Relaxation', fr: 'Relaxation', cn: '放松', ar: 'الاسترخاء' },
    title: { vi: 'Phòng nghỉ sau liệu trình', en: 'Post-treatment rest room', fr: 'Salle de repos après soin', cn: '疗程后休息室', ar: 'غرفة الراحة بعد العلاج' },
    caption: {
      vi: 'Không gian yên tĩnh để khách thư giãn và thưởng trà sau khi kết thúc dịch vụ.',
      en: 'Quiet space for guests to relax and enjoy tea after their session.',
      fr: 'Espace calme pour se détendre et déguster un thé après la séance.',
      cn: '安静的空间，供宾客在疗程结束后放松并品茗。',
      ar: 'مساحة هادئة للضيوف للاسترخاء واحتساء الشاي بعد الجلسة.',
    },
  },
  {
    image: SPA1_PAGE_IMAGES.gallery6,
    category: { vi: 'Couple', en: 'Couple', fr: 'Couple', cn: '情侣', ar: 'الأزواج' },
    title: { vi: 'Suite dành cho cặp đôi', en: 'Couple suite', fr: 'Suite pour couple', cn: '情侣套房', ar: 'جناح للأزواج' },
    caption: {
      vi: 'Phòng đôi lãng mạn với bồn jacuzzi, nến thơm và rượu vang.',
      en: 'Romantic double room with jacuzzi, scented candles, and wine.',
      fr: 'Chambre double romantique avec jacuzzi, bougies parfumées et vin.',
      cn: '浪漫双人房，配有按摩浴缸、香薰蜡烛和美酒。',
      ar: 'غرفة مزدوجة رومانسية مع جاكوزي وشموع معطرة ونبيذ.',
    },
  },
];

// ----------------------------------------------------------------------
// CONTACT INFO
// ----------------------------------------------------------------------

export const spa1ContactInfo = {
  phone: '028 1234 5678',
  email: 'info@luxespa.vn',
  hotline: '1900 xxxx',
  workingHours: { vi: '9:00 - 21:00 hàng ngày', en: '9:00 AM - 9:00 PM daily', fr: '9h00 - 21h00 tous les jours', cn: '每日 9:00 - 21:00', ar: '9:00 - 21:00 يوميًا' },
  address: {
    vi: '123 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM',
    en: '123 Nguyen Hue, Ben Nghe Ward, District 1, HCMC',
    fr: '123 Nguyen Hue, quartier Ben Nghe, district 1, HCMC',
    cn: '胡志明市第一郡边艺坊阮惠街 123 号',
    ar: '123 نجوين هوي، حي بن نغي، المنطقة 1، مدينة هو تشي منه',
  },
  socials: {
    facebook: 'https://facebook.com/luxespa',
    instagram: 'https://instagram.com/luxespa',
    zalo: 'https://zalo.me/luxespa',
  },
};
