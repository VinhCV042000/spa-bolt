import type { Spa9Lang } from './spa9-data';

// ----------------------------------------------------------------------
// COLOR PALETTE - Mediterranean Coastal
// ----------------------------------------------------------------------

export const AZURE = '#1B6CA8';
export const SUN = '#F5A623';
export const SAND = '#FDF5E6';
export const DARK = '#0A2840';
export const OLIVE = '#6B8E23';
export const TERRACOTTA = '#C84B4B';
export const WHITE = '#FFFFFF';

// ----------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------

function getLang<T extends Record<string, string>>(obj: T, lang: string): string {
  return obj[lang as Spa9Lang] || obj.en || '';
}

function formatVND(n: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(n)}₫`;
}

// ----------------------------------------------------------------------
// PAGE IMAGES
// ----------------------------------------------------------------------

export const SPA9_PAGE_IMAGES = {
  about: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80',
  services: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
  training: 'https://images.unsplash.com/photo-1544161515-6b31d7e3d0d3?w=1200&q=80',
  blog: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  careers: 'https://images.unsplash.com/photo-1521737711867-e55b00f7a836?w=1200&q=80',
  booking: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
  contact: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  offers: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=1200&q=80',
  feedback: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
  promotions: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80',
  branches: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  account: 'https://images.unsplash.com/photo-1544161515-6b31d7e3d0d3?w=1200&q=80',
  partners: 'https://images.unsplash.com/photo-1521737711867-e55b00f7a836?w=1200&q=80',
  packages: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
  beforeAfter: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=1200&q=80',
  faq: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  policy: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
  gallery: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
};

// ----------------------------------------------------------------------
// SERVICES DATA
// ----------------------------------------------------------------------

export const SPA9_SERVICES = [
  {
    id: 'roman-bath-ritual',
    slug: 'roman-bath-ritual',
    name: {
      vi: 'Roman Bath Ritual',
      en: 'Roman Bath Ritual',
      fr: 'Rituel du Bain Romain',
      cn: '罗马浴礼',
      ar: 'طقوس الحمام الروماني',
    },
    category: {
      vi: 'Tắm trị liệu',
      en: 'Hydrotherapy',
      fr: 'Hydrothérapie',
      cn: '水疗',
      ar: 'العلاج المائي',
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    price: 1100000,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    color: SUN,
    icon: 'solar:bath-bold-duotone',
    shortDesc: {
      vi: 'Nghi lễ tắm 3 bước La Mã cổ đại với Tepidarium, Caldarium, Frigidarium',
      en: 'Ancient Roman 3-stage bathing ritual with Tepidarium, Caldarium, Frigidarium',
      fr: 'Rituel romain antique en 3 étapes: Tepidarium, Caldarium, Frigidarium',
      cn: '古罗马三段式浴礼：温浴室、热浴室、冷浴室',
      ar: 'طقوس الاستحمام الروماني القديمة بثلاث مراحل',
    },
    fullDesc: {
      vi: 'Tái hiện nghi lễ tắm công cộng La Mã 3 bước cổ điển: Tepidarium (ấm, giãn cơ), Caldarium (nóng, mở lỗ chân lông), Frigidarium (lạnh, đóng và săn chắc). Kết thúc với dầu olive và xoa bóp theo phong cách gladiator. Trải nghiệm hoàn hảo cho thư giãn sâu và thanh lọc cơ thể.',
      en: 'Recreates the classic 3-stage Roman public bathing ritual: Tepidarium (warm, muscle relaxation), Caldarium (hot, pore-opening), Frigidarium (cold, toning and firming). Concludes with olive oil and gladiator-style massage. Perfect for deep relaxation and body purification.',
      fr: 'Recrée le rituel classique du bain public romain en 3 étapes: Tepidarium (détente musculaire), Caldarium (ouverture des pores), Frigidarium (tonification). Se termine par un massage à l\'huile d\'olive façon gladiateur.',
      cn: '重现经典的三段式古罗马公共浴礼：温浴室（温暖、放松肌肉）、热浴室（高温、舒张毛孔）、冷浴室（冷却、紧致塑形）。最后以橄榄油和角斗士式按摩收尾。',
      ar: 'يعيد إحياء طقوس الاستحمام الروماني العام الكلاسيكية بثلاث مراحل: تيبيداريوم وكالداريوم وفريجيداريوم.',
    },
    benefits: {
      vi: ['Thư giãn sâu', 'Thanh lọc cơ thể', 'Cải thiện tuần hoàn', 'Săn chắc da'],
      en: ['Deep relaxation', 'Body purification', 'Improved circulation', 'Skin toning'],
      fr: ['Relaxation profonde', 'Purification du corps', 'Circulation améliorée', 'Tonification'],
      cn: ['深度放松', '身体净化', '改善循环', '紧致肌肤'],
      ar: ['استرخاء عميق', 'تنقية الجسم', 'تحسين الدورة الدموية', 'شد البشرة'],
    },
  },
  {
    id: 'greek-olive-massage',
    slug: 'greek-olive-massage',
    name: {
      vi: 'Greek Olive Oil Massage',
      en: 'Greek Olive Oil Massage',
      fr: 'Massage à l\'Huile d\'Olive Grecque',
      cn: '希腊橄榄油按摩',
      ar: 'تدليك بزيت الزيتون اليوناني',
    },
    category: {
      vi: 'Massage trị liệu',
      en: 'Therapeutic Massage',
      fr: 'Massage Thérapeutique',
      cn: '治疗性按摩',
      ar: 'تدليك علاجي',
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 分钟', ar: '75 دقيقة' },
    price: 890000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    color: OLIVE,
    icon: 'solar:leaf-bold-duotone',
    shortDesc: {
      vi: 'Massage全身 với 100% dầu olive Kalamata extra-virgin',
      en: 'Full-body massage with 100% Kalamata extra-virgin olive oil',
      fr: 'Massage complet à l\'huile d\'olive vierge extra de Kalamata',
      cn: '采用100%卡拉马塔特级初榨橄榄油全身按摩',
      ar: 'تدليك كامل بزيت زيتون كالاماتا البكر الممتاز',
    },
    fullDesc: {
      vi: 'Massage toàn thân với 100% dầu olive Kalamata extra-virgin pha thêm tinh dầu hương thảo và hoa oải hương Provence. Kỹ thuật effleurage và petrissage Hy Lạp làm mềm da, thư giãn cơ và cải thiện tuần hoàn.',
      en: 'Full-body massage with 100% Kalamata extra-virgin olive oil blended with rosemary and Provence lavender essential oils. Greek effleurage and petrissage technique softens skin, relaxes muscles and improves circulation.',
      fr: 'Massage du corps entier à 100% d\'huile d\'olive vierge extra de Kalamata enrichie d\'huiles essentielles de romarin et de lavande de Provence.',
      cn: '采用100%卡拉马塔特级初榨橄榄油，调和迷迭香与普罗旺斯薰衣草精油进行全身按摩。',
      ar: 'تدليك كامل للجسم بزيت زيتون كالاماتا البكر الممتاز بنسبة 100% الممزوج بزيوت إكليل الجبل وخزامى بروفانس العطرية.',
    },
    benefits: {
      vi: ['Làm mềm da', 'Thư giãn cơ', 'Cải thiện tuần hoàn', 'Dưỡng ẩm sâu'],
      en: ['Softens skin', 'Relaxes muscles', 'Improves circulation', 'Deep hydration'],
      fr: ['Adoucit la peau', 'Détend les muscles', 'Améliore la circulation', 'Hydratation profonde'],
      cn: ['软化肌肤', '放松肌肉', '改善循环', '深度滋润'],
      ar: ['تنعيم البشرة', 'إرخاء العضلات', 'تحسين الدورة الدموية', 'ترطيب عميق'],
    },
  },
  {
    id: 'sea-salt-scrub',
    slug: 'mediterranean-sea-salt-scrub',
    name: {
      vi: 'Mediterranean Sea Salt Scrub',
      en: 'Mediterranean Sea Salt Scrub',
      fr: 'Gommage au Sel Marin Méditerranéen',
      cn: '地中海海盐磨砂',
      ar: 'تقشير ملح البحر المتوسط',
    },
    category: {
      vi: 'Tẩy tế bào chết',
      en: 'Exfoliation',
      fr: 'Exfoliation',
      cn: '去角质',
      ar: 'تقشير',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: 780000,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    color: AZURE,
    icon: 'solar:stars-bold-duotone',
    shortDesc: {
      vi: 'Tẩy tế bào chết với muối Fleur de Sel Camargue',
      en: 'Full-body exfoliation with Camargue Fleur de Sel',
      fr: 'Gommage complet à la fleur de sel de Camargue',
      cn: '使用卡马格盐之花全身去角质',
      ar: 'تقشير كامل بزهرة ملح كامارغ',
    },
    fullDesc: {
      vi: 'Tẩy tế bào chết toàn thân bằng muối Fleur de Sel thô Camargue pha trộn với dầu ô liu, mật ong Hy Lạp và chiết xuất quả lựu đỏ. Thải độc qua da, làm mềm và sáng đều màu da toàn thân.',
      en: 'Full-body exfoliation with coarse Camargue Fleur de Sel blended with olive oil, Greek honey and pomegranate extract. Skin detoxification, softening and even-toning the entire body.',
      fr: 'Exfoliation du corps entier à la fleur de sel brute de Camargue mélangée à l\'huile d\'olive, le miel grec et l\'extrait de grenade.',
      cn: '使用粗粒卡马格盐之花混合橄榄油、希腊蜂蜜与红石榴提取物进行全身去角质。',
      ar: 'تقشير كامل للجسم بزهرة ملح كامارغ الخشنة الممزوجة بزيت الزيتون والعسل اليوناني ومستخلص الرمان.',
    },
    benefits: {
      vi: ['Thải độc', 'Làm sáng da', 'Mềm mịn', 'Đều màu da'],
      en: ['Detoxification', 'Brightening', 'Softening', 'Even skin tone'],
      fr: ['Détox', 'Éclaircissant', 'Adoucissant', 'Teint uniforme'],
      cn: ['排毒', '提亮', '柔嫩', '均匀肤色'],
      ar: ['إزالة السموم', 'تفتيح', 'تنعيم', 'توحيد لون البشرة'],
    },
  },
  {
    id: 'volcanic-stone-thalasso',
    slug: 'volcanic-stone-thalasso',
    name: {
      vi: 'Volcanic Stone Thalasso',
      en: 'Volcanic Stone Thalasso',
      fr: 'Thalasso aux Pierres Volcaniques',
      cn: '火山石海洋疗法',
      ar: 'ثالاسو بالأحجار البركانية',
    },
    category: {
      vi: 'Liệu trình body',
      en: 'Body Treatment',
      fr: 'Soin du Corps',
      cn: '身体护理',
      ar: 'العناية بالجسم',
    },
    duration: { vi: '80 phút', en: '80 min', fr: '80 min', cn: '80 分钟', ar: '80 دقيقة' },
    price: 1050000,
    image: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=800&q=80',
    color: '#8B7355',
    icon: 'solar:mountains-bold-duotone',
    shortDesc: {
      vi: 'Đắp bùn tảo biển với đá núi lửa Santorini',
      en: 'Seaweed mud wrap with Santorini volcanic stones',
      fr: 'Enveloppement aux algues et pierres volcaniques de Santorin',
      cn: '海藻泥包裹配圣托里尼火山石',
      ar: 'لفّ بطين الأعشاب البحرية وأحجار سانتوريني البركانية',
    },
    fullDesc: {
      vi: 'Đắp toàn thân bùn tảo biển Địa Trung Hải ấm 40°C kết hợp với đá núi lửa Santorini đặt trên các huyệt chính. Khoáng biển Aegean ngấm sâu vào da trong 30 phút, sau đó rửa trôi bằng nước biển ấm và dưỡng ẩm dầu olive.',
      en: 'Warm Mediterranean seaweed mud wrap at 40°C combined with Santorini volcanic stones placed on key meridians. Aegean sea minerals penetrate the skin for 30 minutes, rinsed off with warm seawater and finished with olive oil moisturisation.',
      fr: 'Enveloppement à la boue d\'algues méditerranéennes chaude à 40°C, associé à des pierres volcaniques de Santorin sur les méridiens.',
      cn: '以40°C温热的地中海海藻泥进行全身包裹，并将圣托里尼火山石置于主要经络之上。',
      ar: 'لفّ كامل للجسم بطين أعشاب البحر المتوسطي الدافئ عند 40°م مع أحجار سانتوريني البركانية.',
    },
    benefits: {
      vi: ['Cung cấp khoáng chất', 'Thải độc', 'Dưỡng ẩm', 'Giảm đau cơ'],
      en: ['Mineral nourishment', 'Detox', 'Hydration', 'Muscle pain relief'],
      fr: ['Nourriture minérale', 'Détox', 'Hydratation', 'Soulagement musculaire'],
      cn: ['矿物滋养', '排毒', '补水', '缓解肌肉疼痛'],
      ar: ['تغذية بالمعادن', 'إزالة السموم', 'ترطيب', 'تخفيف آلام العضلات'],
    },
  },
  {
    id: 'aurora-facial',
    slug: 'aurora-mediterranean-facial',
    name: {
      vi: 'Aurora Mediterranean Facial',
      en: 'Aurora Mediterranean Facial',
      fr: 'Soin Visage Aurora Méditerranéen',
      cn: '晨曦地中海面部护理',
      ar: 'علاج الوجه أورورا المتوسطي',
    },
    category: {
      vi: 'Chăm sóc da mặt',
      en: 'Facial Care',
      fr: 'Soin Visage',
      cn: '面部护理',
      ar: 'العناية بالوجه',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: 950000,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    color: SUN,
    icon: 'solar:sun-bold-duotone',
    shortDesc: {
      vi: 'Chăm sóc da mặt với chiết xuất ô liu và nha đam',
      en: 'Facial treatment with olive extract and aloe vera',
      fr: 'Soin visage aux extraits d\'olive et d\'aloe vera',
      cn: '以橄榄提取物与芦荟进行面部护理',
      ar: 'علاج الوجه بمستخلص الزيتون والصبار',
    },
    fullDesc: {
      vi: 'Liệu trình chăm sóc da mặt cao cấp với chiết xuất ô liu Hy Lạp, nha đam và vitamin E từ dầu hạt nho. Bao gồm làm sạch sâu, tẩy tế bào chết nhẹ, massage mặt theo phong cách Hy Lạp, và mặt nạ dưỡng ẩm.',
      en: 'Premium facial treatment with Greek olive extract, aloe vera, and vitamin E from grapeseed oil. Includes deep cleansing, gentle exfoliation, Greek-style facial massage, and hydrating mask.',
      fr: 'Soin visage premium aux extraits d\'olive grecque, d\'aloe vera et de vitamine E. Nettoyage en profondeur, gommage doux, massage facial grec et masque hydratant.',
      cn: '采用希腊橄榄提取物、芦荟与葡萄籽油维生素E的高档面部护理。包括深层清洁、温和去角质、希腊式面部按摩与保湿面膜。',
      ar: 'علاج ممتاز للوجه بمستخلص الزيتون اليوناني والصبار وفيتامين هـ. يتضمن تنظيف عميق وتقشير لطيف وتدليك وجه يوناني وقناع مرطب.',
    },
    benefits: {
      vi: ['Dưỡng ẩm sâu', 'Làm sáng', 'Chống lão hóa', 'Phục hồi da'],
      en: ['Deep hydration', 'Brightening', 'Anti-aging', 'Skin restoration'],
      fr: ['Hydratation profonde', 'Éclaircissant', 'Anti-âge', 'Restauration cutanée'],
      cn: ['深度保湿', '提亮', '抗衰老', '肌肤修复'],
      ar: ['ترطيب عميق', 'تفتيح', 'مضاد للشيخوخة', 'استعادة البشرة'],
    },
  },
  {
    id: 'sunset-couples',
    slug: 'sunset-couples-retreat',
    name: {
      vi: 'Sunset Couples Retreat',
      en: 'Sunset Couples Retreat',
      fr: 'Retreat Couple au Coucher de Soleil',
      cn: '日落情侣静修',
      ar: 'تراجع الأزواج عند الغروب',
    },
    category: {
      vi: 'Dành cho đôi',
      en: 'Couples',
      fr: 'Couples',
      cn: '情侣',
      ar: 'للأزواج',
    },
    duration: { vi: '120 phút', en: '120 min', fr: '120 min', cn: '120 分钟', ar: '120 دقيقة' },
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    color: '#E07B38',
    icon: 'solar:heart-bold-duotone',
    shortDesc: {
      vi: 'Liệu trình dành cho đôi với ngâm bể riêng và massage song song',
      en: 'Couples treatment with private soaking pool and dual massage',
      fr: 'Soin couple avec bain privatif et massage duo',
      cn: '情侣疗程含私人浸泡池与双人按摩',
      ar: 'علاج للأزواج مع حوض نقع خاص وتدليك مزدوج',
    },
    fullDesc: {
      vi: 'Trải nghiệm lãng mạn cho hai người với bể ngâm hoàng hôn view biển, champagne, massage song song với dầu olive và tinh dầu hoa hồng, và bữa tối nhẹ Mediterranean.',
      en: 'Romantic experience for two with sunset ocean-view soaking pool, champagne, dual massage with olive oil and rose essential oil, and light Mediterranean dinner.',
      fr: 'Expérience romantique pour deux avec bain privatif vue mer, champagne, massage duo à l\'huile d\'olive et à la rose, et dîner léger méditerranéen.',
      cn: '双人浪漫体验，含海景观落日浸泡池、香槟、橄榄油与玫瑰精油双人按摩及地中海轻食晚餐。',
      ar: 'تجربة رومانسية لاثنين مع حوض نقع بإطلالة البحر والشامبانيا وتدليك مزدوج وعشاء متوسطي خفيف.',
    },
    benefits: {
      vi: ['Gắn kết tình cảm', 'Thư giãn cùng nhau', 'Trải nghiệm lãng mạn', 'Đầy đủ tiện nghi'],
      en: ['Bonding experience', 'Relax together', 'Romantic setting', 'Full amenities'],
      fr: ['Expérience de couple', 'Détente ensemble', 'Cadre romantique', 'Tout confort'],
      cn: ['增进感情', '共同放松', '浪漫氛围', '设施齐全'],
      ar: ['تجربة ربط', 'استرخاء معاً', 'أجواء رومانسية', 'مرافق كاملة'],
    },
  },
];

// ----------------------------------------------------------------------
// TRAINING DATA
// ----------------------------------------------------------------------

export const SPA9_TRAINING = [
  {
    id: 1,
    title: {
      vi: 'Chứng chỉ Thalassotherapy',
      en: 'Thalassotherapy Certification',
      fr: 'Certification Thalassothérapie',
      cn: '海洋疗法认证',
      ar: 'شهادة الثالاسوترابي',
    },
    duration: {
      vi: '3 tháng (120 giờ)',
      en: '3 months (120 hours)',
      fr: '3 mois (120 heures)',
      cn: '3个月（120小时）',
      ar: '3 أشهر (120 ساعة)',
    },
    level: {
      vi: 'Trung cấp',
      en: 'Intermediate',
      fr: 'Intermédiaire',
      cn: '中级',
      ar: 'متوسط',
    },
    price: 12000000,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    color: AZURE,
    description: {
      vi: 'Khóa học chuyên sâu về trị liệu biển: nguyên lý thalassotherapy, đặc tính nước biển, tảo và bùn biển, kỹ thuật đắp và ngâm.',
      en: 'In-depth course on sea therapy: thalassotherapy principles, seawater properties, algae and sea mud, wrap and soak techniques.',
      fr: 'Cours approfondi sur la thalassothérapie: principes, propriétés de l\'eau de mer, algues et boue marine.',
      cn: '海洋疗法深度课程：原理、海水特性、海藻与海泥、包裹与浸泡技术。',
      ar: 'دورة متعمقة في العلاج البحري: مبادئ الثالاسوترابي وخصائص ماء البحر والطحالب والطين البحري.',
    },
    modules: {
      vi: ['Nguyên lý Thalassotherapy', 'Hóa học nước biển', 'Tảo & Bùn biển', 'Kỹ thuật đắp & ngâm', 'Thực hành 40 giờ'],
      en: ['Thalassotherapy Principles', 'Seawater Chemistry', 'Algae & Sea Mud', 'Wrap & Soak Techniques', '40-hour Practice'],
      fr: ['Principes de Thalassothérapie', 'Chimie de l\'eau de mer', 'Algues & Boue marine', 'Techniques d\'enveloppement', '40h de Pratique'],
      cn: ['海洋疗法原理', '海水化学', '海藻与海泥', '包裹浸泡技术', '40小时实践'],
      ar: ['مبادئ الثالاسوترابي', 'كيمياء ماء البحر', 'الطحالب والطين البحري', 'تقنيات اللف والنقع', '40 ساعة تدريب'],
    },
  },
  {
    id: 2,
    title: {
      vi: 'Massage Hy Lạp Cổ Điển',
      en: 'Classical Greek Massage',
      fr: 'Massage Grec Classique',
      cn: '古希腊式按摩',
      ar: 'التدليك اليوناني الكلاسيكي',
    },
    duration: {
      vi: '2 tháng (80 giờ)',
      en: '2 months (80 hours)',
      fr: '2 mois (80 heures)',
      cn: '2个月（80小时）',
      ar: 'شهران (80 ساعة)',
    },
    level: {
      vi: 'Cơ bản',
      en: 'Foundation',
      fr: 'Fondamental',
      cn: '基础',
      ar: 'أساسي',
    },
    price: 8000000,
    image: 'https://images.unsplash.com/photo-1544161515-6b31d7e3d0d3?w=800&q=80',
    color: OLIVE,
    description: {
      vi: 'Học kỹ thuật massage Hy Lạp cổ điển với dầu olive: effleurage, petrissage, friction. Kết hợp trị liệu hương thảo.',
      en: 'Learn classical Greek massage techniques with olive oil: effleurage, petrissage, friction. Combined with aromatherapy.',
      fr: 'Apprendre les techniques de massage grec classique à l\'huile d\'olive: effleurage, pétrissage, friction.',
      cn: '学习使用橄榄油的古希腊按摩技法：抚摸、揉捏、摩擦。结合芳香疗法。',
      ar: 'تعلم تقنيات التدليك اليوناني الكلاسيكي بزيت الزيتون: التمسيد والعجن والاحتكاك.',
    },
    modules: {
      vi: ['Lịch sử massage Hy Lạp', 'Kỹ thuật effleurage', 'Kỹ thuật petrissage', 'Dầu olive & tinh dầu', 'Thực hành 30 giờ'],
      en: ['History of Greek Massage', 'Effleurage Techniques', 'Petrissage Techniques', 'Olive Oil & Essential Oils', '30-hour Practice'],
      fr: ['Histoire du massage grec', 'Techniques d\'effleurage', 'Techniques de pétrissage', 'Huile d\'olive & HE', '30h de Pratique'],
      cn: ['希腊按摩历史', '抚摸技法', '揉捏技法', '橄榄油与精油', '30小时实践'],
      ar: ['تاريخ التدليك اليوناني', 'تقنيات التمسيد', 'تقنيات العجن', 'زيت الزيتون والزيوت العطرية', '30 ساعة تدريب'],
    },
  },
  {
    id: 3,
    title: {
      vi: 'Liệu pháp Bể La Mã',
      en: 'Roman Bath Therapy',
      fr: 'Thérapie du Bain Romain',
      cn: '罗马浴疗法',
      ar: 'علاج الحمام الروماني',
    },
    duration: {
      vi: '1 tháng (40 giờ)',
      en: '1 month (40 hours)',
      fr: '1 mois (40 heures)',
      cn: '1个月（40小时）',
      ar: 'شهر واحد (40 ساعة)',
    },
    level: {
      vi: 'Nâng cao',
      en: 'Advanced',
      fr: 'Avancé',
      cn: '高级',
      ar: 'متقدم',
    },
    price: 6000000,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    color: SUN,
    description: {
      vi: 'Đào tạo chuyên sâu về nghi lễ tắm La Mã: Tepidarium, Caldarium, Frigidarium. Nhiệt trị liệu và nhiệt động học.',
      en: 'Advanced training on Roman bathing ritual: Tepidarium, Caldarium, Frigidarium. Thermotherapy and thermodynamics.',
      fr: 'Formation avancée sur le rituel du bain romain: Tepidarium, Caldarium, Frigidarium. Thérapie thermique.',
      cn: '罗马浴礼深度培训：温浴室、热浴室、冷浴室。热疗法与热力学。',
      ar: 'تدريب متقدم على طقوس الحمام الروماني: تيبيداريوم وكالداريوم وفريجيداريوم.',
    },
    modules: {
      vi: ['Lịch sử bể La Mã', 'Thiết kế bể nhiệt', 'Nhiệt trị liệu', 'Quy trình 3 bước', 'Thực hành 20 giờ'],
      en: ['History of Roman Baths', 'Thermal Pool Design', 'Thermotherapy', '3-Stage Protocol', '20-hour Practice'],
      fr: ['Histoire des bains romains', 'Conception des bains thermaux', 'Thermothérapie', 'Protocole 3 étapes', '20h de Pratique'],
      cn: ['罗马浴历史', '温泉池设计', '热疗法', '三段式流程', '20小时实践'],
      ar: ['تاريخ الحمامات الرومانية', 'تصميم المسابح الحرارية', 'العلاج الحراري', 'بروتوكول 3 مراحل', '20 ساعة تدريب'],
    },
  },
];

// ----------------------------------------------------------------------
// BLOG DATA
// ----------------------------------------------------------------------

export const SPA9_BLOG = [
  {
    id: 1,
    slug: 'secrets-of-mediterranean-longevity',
    title: {
      vi: 'Bí mật trường thọ Địa Trung Hải',
      en: 'Secrets of Mediterranean Longevity',
      fr: 'Les Secrets de la Longévité Méditerranéenne',
      cn: '地中海长寿秘诀',
      ar: 'أسرار طول العمر في البحر المتوسط',
    },
    excerpt: {
      vi: 'Khám phá cách người dân Địa Trung Hải sống thọ khỏe mạnh nhờ chế độ ăn, lối sống và trị liệu biển.',
      en: 'Discover how Mediterranean people live long and healthy through diet, lifestyle and sea therapy.',
      fr: 'Découvrez comment les Méditerranéens vivent longtemps grâce au régime, au mode de vie et à la thalassothérapie.',
      cn: '探索地中海人如何通过饮食、生活方式与海洋疗法实现健康长寿。',
      ar: 'اكتشف كيف يعيش سكان البحر المتوسط حياة طويلة وصحية.',
    },
    category: {
      vi: 'Lối sống',
      en: 'Lifestyle',
      fr: 'Mode de vie',
      cn: '生活方式',
      ar: 'نمط الحياة',
    },
    date: '2025-05-15',
    author: 'Dr. Elena Papadopoulos',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    readTime: { vi: '8 phút', en: '8 min', fr: '8 min', cn: '8 分钟', ar: '8 دقائق' },
  },
  {
    id: 2,
    slug: 'olive-oil-in-spa',
    title: {
      vi: 'Dầu Olive trong Spa: Từ Hy Lạp đến Thế giới',
      en: 'Olive Oil in Spa: From Greece to the World',
      fr: 'L\'Huile d\'Olive en Spa: De la Grèce au Monde',
      cn: '橄榄油与水疗：从希腊走向世界',
      ar: 'زيت الزيتون في المنتجعات الصحية',
    },
    excerpt: {
      vi: 'Tìm hiểu lịch sử và công dụng của dầu olive trong trị liệu spa, từ thời Hy Lạp cổ đại đến ngày nay.',
      en: 'Learn about the history and benefits of olive oil in spa treatments, from ancient Greece to modern day.',
      fr: 'Découvrez l\'histoire et les bienfaits de l\'huile d\'olive dans les soins spa, de la Grèce antique à nos jours.',
      cn: '了解橄榄油在水疗护理中的历史与功效，从古希腊至今。',
      ar: 'تعرف على تاريخ وفوائد زيت الزيتون في علاجات المنتجعات الصحية.',
    },
    category: {
      vi: 'Nguyên liệu',
      en: 'Ingredients',
      fr: 'Ingrédients',
      cn: '原料',
      ar: 'المكونات',
    },
    date: '2025-04-20',
    author: 'Marcus Aurelius',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    readTime: { vi: '6 phút', en: '6 min', fr: '6 min', cn: '6 分钟', ar: '6 دقائق' },
  },
  {
    id: 3,
    slug: 'roman-bathing-tradition',
    title: {
      vi: 'Truyền thống Tắm La Mã: Hơn 2000 Năm Lịch sử',
      en: 'Roman Bathing Tradition: Over 2000 Years of History',
      fr: 'La Tradition du Bain Romain: Plus de 2000 Ans d\'Histoire',
      cn: '罗马浴传统：两千年的历史',
      ar: 'تقليد الاستحمام الروماني: أكثر من 2000 عام من التاريخ',
    },
    excerpt: {
      vi: 'Khám phá nghi lễ tắm công cộng La Mã và cách chúng tôi tái hiện trải nghiệm cổ đại này.',
      en: 'Discover the Roman public bathing ritual and how we recreate this ancient experience.',
      fr: 'Découvrez le rituel du bain public romain et comment nous recréons cette expérience antique.',
      cn: '探索古罗马公共浴礼，以及我们如何重现这一古老体验。',
      ar: 'اكتشف طقوس الاستحمام الروماني العام وكيف نعيد إحياء هذه التجربة القديمة.',
    },
    category: {
      vi: 'Lịch sử',
      en: 'History',
      fr: 'Histoire',
      cn: '历史',
      ar: 'التاريخ',
    },
    date: '2025-03-10',
    author: 'Gaius Marius',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    readTime: { vi: '10 phút', en: '10 min', fr: '10 min', cn: '10 分钟', ar: '10 دقائق' },
  },
];

// ----------------------------------------------------------------------
// CAREERS DATA
// ----------------------------------------------------------------------

export const SPA9_CAREERS = [
  {
    id: 1,
    title: {
      vi: 'Thalassotherapy Specialist',
      en: 'Thalassotherapy Specialist',
      fr: 'Spécialiste en Thalassothérapie',
      cn: '海洋疗法专家',
      ar: 'أخصائي الثالاسوترابي',
    },
    department: {
      vi: 'Liệu trình',
      en: 'Treatments',
      fr: 'Soins',
      cn: '疗程',
      ar: 'العلاجات',
    },
    location: {
      vi: 'Hồ Chí Minh',
      en: 'Ho Chi Minh',
      fr: 'Ho Chi Minh',
      cn: '胡志明市',
      ar: 'هو تشي مينه',
    },
    type: {
      vi: 'Toàn thời gian',
      en: 'Full-time',
      fr: 'Temps plein',
      cn: '全职',
      ar: 'دوام كامل',
    },
    salary: {
      vi: '15-25 triệu/tháng',
      en: '15-25 million/month',
      fr: '15-25 millions/mois',
      cn: '1500-2500万越盾/月',
      ar: '15-25 مليون/شهر',
    },
    description: {
      vi: 'Chuyên gia trị liệu biển với kỹ năng đắp bùn tảo, tắm nhiệt và trị liệu nước biển.',
      en: 'Sea therapy specialist skilled in algae mud wrap, thermal bathing and seawater therapy.',
      fr: 'Spécialiste en thérapie marine, enveloppement aux algues, bains thermaux.',
      cn: '海洋疗法专家，擅长海藻泥包裹、温泉浴与海水疗法。',
      ar: 'أخصائي العلاج البحري ماهر في لف الطين الطحلبي والحمامات الحرارية.',
    },
  },
  {
    id: 2,
    title: {
      vi: 'Massage Therapist - Greek Style',
      en: 'Massage Therapist - Greek Style',
      fr: 'Kiné Massage Style Grec',
      cn: '希腊式按摩师',
      ar: 'معالج تدليك على الطراز اليوناني',
    },
    department: {
      vi: 'Massage',
      en: 'Massage',
      fr: 'Massage',
      cn: '按摩',
      ar: 'التدليك',
    },
    location: {
      vi: 'Đà Nẵng',
      en: 'Da Nang',
      fr: 'Da Nang',
      cn: '岘港',
      ar: 'دا نانغ',
    },
    type: {
      vi: 'Toàn thời gian',
      en: 'Full-time',
      fr: 'Temps plein',
      cn: '全职',
      ar: 'دوام كامل',
    },
    salary: {
      vi: '12-18 triệu/tháng',
      en: '12-18 million/month',
      fr: '12-18 millions/mois',
      cn: '1200-1800万越盾/月',
      ar: '12-18 مليون/شهر',
    },
    description: {
      vi: 'Thực hiện massage Hy Lạp với dầu olive, kỹ thuật effleurage và petrissage.',
      en: 'Perform Greek-style massage with olive oil, effleurage and petrissage techniques.',
      fr: 'Réaliser le massage grec à l\'huile d\'olive, techniques d\'effleurage et pétrissage.',
      cn: '执行使用橄榄油的希腊式按摩，掌握抚摸与揉捏技法。',
      ar: 'تنفيذ التدليك اليوناني بزيت الزيتون وتقنيات التمسيد والعجن.',
    },
  },
  {
    id: 3,
    title: {
      vi: 'Spa Receptionist',
      en: 'Spa Receptionist',
      fr: 'Réceptionniste Spa',
      cn: '水疗前台',
      ar: 'موظف استقبال المنتجع',
    },
    department: {
      vi: 'Tiền sảnh',
      en: 'Front Desk',
      fr: 'Réception',
      cn: '前台',
      ar: 'استقبال',
    },
    location: {
      vi: 'Hà Nội',
      en: 'Hanoi',
      fr: 'Hanoï',
      cn: '河内',
      ar: 'هانوي',
    },
    type: {
      vi: 'Bán thời gian',
      en: 'Part-time',
      fr: 'Temps partiel',
      cn: '兼职',
      ar: 'دوام جزئي',
    },
    salary: {
      vi: '6-9 triệu/tháng',
      en: '6-9 million/month',
      fr: '6-9 millions/mois',
      cn: '600-900万越盾/月',
      ar: '6-9 مليون/شهر',
    },
    description: {
      vi: 'Đón tiếp khách, đặt lịch, hỗ trợ thông tin dịch vụ và xử lý thanh toán.',
      en: 'Welcome guests, schedule bookings, provide service information and process payments.',
      fr: 'Accueil des clients, réservation, information sur les services et paiements.',
      cn: '迎接客人、预约 booking、提供服务咨询与处理付款。',
      ar: 'استقبال الضيوف وجدولة الحجوزات وتقديم معلومات الخدمة ومعالجة المدفوعات.',
    },
  },
];

// ----------------------------------------------------------------------
// BRANCHES DATA
// ----------------------------------------------------------------------

export const SPA9_BRANCHES = [
  {
    id: 1,
    name: {
      vi: 'Thalassa Saigon',
      en: 'Thalassa Saigon',
      fr: 'Thalassa Saigon',
      cn: '西贡海洋疗养中心',
      ar: 'ثالاسا سايغون',
    },
    address: {
      vi: 'Tầng 5, Vincom Center, 72 Lê Thánh Tôn, Q.1, TP.HCM',
      en: '5th Floor, Vincom Center, 72 Le Thanh Ton, D.1, HCMC',
      fr: '5ème étage, Vincom Center, 72 Le Thanh Ton, D.1, HCMC',
      cn: '胡志明市第一郡黎圣宗街72号Vincom中心5楼',
      ar: 'الطابق الخامس، فينكوم سنتر، 72 لي تون تون، المدينة الأولى، هوشي منه',
    },
    phone: '+84 28 3822 9111',
    email: 'saigon@thalassa.vn',
    hours: {
      vi: '08:00 - 22:00 (T2-CN)',
      en: '08:00 - 22:00 (Mon-Sun)',
      fr: '08h00 - 22h00 (Lun-Dim)',
      cn: '08:00 - 22:00（周一至周日）',
      ar: '08:00 - 22:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Bể nhiệt La Mã', 'Phòng massage VIP', 'Sky pool'],
      en: ['Roman thermal pools', 'VIP massage rooms', 'Sky pool'],
      fr: ['Piscines thermales romaines', 'Salles de massage VIP', 'Piscine sur le toit'],
      cn: ['罗马温泉池', 'VIP按摩房', '天空泳池'],
      ar: ['مسابح حرارية رومانية', 'غرف تدليك VIP', 'مسبح السماء'],
    },
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
  },
  {
    id: 2,
    name: {
      vi: 'Thalassa Da Nang',
      en: 'Thalassa Da Nang',
      fr: 'Thalassa Da Nang',
      cn: '岘港海洋疗养中心',
      ar: 'ثالاسا دا نانغ',
    },
    address: {
      vi: 'InterContinental Resort, Mỹ Khê, Đà Nẵng',
      en: 'InterContinental Resort, My Khe, Da Nang',
      fr: 'InterContinental Resort, My Khe, Da Nang',
      cn: '岘港美溪洲际度假酒店',
      ar: 'منتجع إنتركونتيننتال، ماي خي، دا نانغ',
    },
    phone: '+84 236 389 8888',
    email: 'danang@thalassa.vn',
    hours: {
      vi: '07:00 - 21:00 (T2-CN)',
      en: '07:00 - 21:00 (Mon-Sun)',
      fr: '07h00 - 21h00 (Lun-Dim)',
      cn: '07:00 - 21:00（周一至周日）',
      ar: '07:00 - 21:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['View biển trực tiếp', 'Bùn tảo biển', 'Nhà hàng Mediterraneo'],
      en: ['Direct ocean view', 'Seaweed mud therapy', 'Mediterraneo restaurant'],
      fr: ['Vue directe sur la mer', 'Boue aux algues', 'Restaurant Mediterraneo'],
      cn: ['直面海景', '海藻泥疗法', '地中海餐厅'],
      ar: ['إطلالة مباشرة على البحر', 'علاج طين الطحالب', 'مطعم متوسطي'],
    },
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  },
  {
    id: 3,
    name: {
      vi: 'Thalassa Hanoi',
      en: 'Thalassa Hanoi',
      fr: 'Thalassa Hanoï',
      cn: '河内海洋疗养中心',
      ar: 'ثالاسا هانوي',
    },
    address: {
      vi: 'Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội',
      en: 'Lotte Center, 54 Lieu Giai, Ba Dinh, Hanoi',
      fr: 'Lotte Center, 54 Lieu Giai, Ba Dinh, Hanoï',
      cn: '河内巴亭郡柳佳街54号乐天中心',
      ar: 'لوتي سنتر، 54 لييو غاي، با دينه، هانوي',
    },
    phone: '+84 24 7102 9999',
    email: 'hanoi@thalassa.vn',
    hours: {
      vi: '09:00 - 22:00 (T2-CN)',
      en: '09:00 - 22:00 (Mon-Sun)',
      fr: '09h00 - 22h00 (Lun-Dim)',
      cn: '09:00 - 22:00（周一至周日）',
      ar: '09:00 - 22:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Thermal suite', 'Floating therapy', 'Garden terrace'],
      en: ['Thermal suite', 'Floating therapy', 'Garden terrace'],
      fr: ['Suite thermale', 'Thérapie flottante', 'Terrasse-jardin'],
      cn: ['热疗套房', '漂浮疗法', '花园露台'],
      ar: ['جناح حراري', 'العلاج العائم', 'تراسة الحديقة'],
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    id: 4,
    name: {
      vi: 'Thalassa Nha Trang',
      en: 'Thalassa Nha Trang',
      fr: 'Thalassa Nha Trang',
      cn: '芽庄海洋疗养中心',
      ar: 'ثالاسا نا ترانغ',
    },
    address: {
      vi: 'Vinpearl Resort, Vinh Nguyen, Nha Trang',
      en: 'Vinpearl Resort, Vinh Nguyen, Nha Trang',
      fr: 'Vinpearl Resort, Vinh Nguyen, Nha Trang',
      cn: '芽庄永阮珍珠度假酒店',
      ar: 'منتجع فين بيرل، فين نجوين، نا ترانغ',
    },
    phone: '+84 258 359 8888',
    email: 'nhatrang@thalassa.vn',
    hours: {
      vi: '07:00 - 20:00 (T2-CN)',
      en: '07:00 - 20:00 (Mon-Sun)',
      fr: '07h00 - 20h00 (Lun-Dim)',
      cn: '07:00 - 20:00（周一至周日）',
      ar: '07:00 - 20:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Beachfront spa', 'Lagoon pool', 'Coral therapy'],
      en: ['Beachfront spa', 'Lagoon pool', 'Coral therapy'],
      fr: ['Spa en bord de mer', 'Piscine lagune', 'Thérapie corail'],
      cn: ['海滨水疗', '泻湖泳池', '珊瑚疗法'],
      ar: ['سبا على الشاطئ', 'مسبح اللاغون', 'العلاج بالمرجان'],
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    id: 5,
    name: {
      vi: 'Thalassa Phu Quoc',
      en: 'Thalassa Phu Quoc',
      fr: 'Thalassa Phu Quoc',
      cn: '富国岛海洋疗养中心',
      ar: 'ثالاسا فوكوك',
    },
    address: {
      vi: 'JW Marriott Resort, Bai Khem, Phu Quoc',
      en: 'JW Marriott Resort, Bai Khem, Phu Quoc',
      fr: 'JW Marriott Resort, Bai Khem, Phu Quoc',
      cn: '富国岛JW万豪度假酒店',
      ar: 'منتجع جي دبليو ماريوت، باي كيم، فوكوك',
    },
    phone: '+84 297 399 9999',
    email: 'phuquoc@thalassa.vn',
    hours: {
      vi: '07:00 - 21:00 (T2-CN)',
      en: '07:00 - 21:00 (Mon-Sun)',
      fr: '07h00 - 21h00 (Lun-Dim)',
      cn: '07:00 - 21:00（周一至周日）',
      ar: '07:00 - 21:00 (الإثنين-الأحد)',
    },
    features: {
      vi: ['Private beach', 'Sunset rituals', 'Island botanicals'],
      en: ['Private beach', 'Sunset rituals', 'Island botanicals'],
      fr: ['Plage privée', 'Rituels du coucher', 'Botaniques insulaires'],
      cn: ['私人海滩', '日落礼', '岛屿植物'],
      ar: ['شاطئ خاص', 'طقوس الغروب', 'نباتات جزيرية'],
    },
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  },
];

// ----------------------------------------------------------------------
// GALLERY DATA
// ----------------------------------------------------------------------

export const SPA9_GALLERY = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80',
    alt: {
      vi: 'Bể La Mã',
      en: 'Roman Baths',
      fr: 'Bains Romains',
      cn: '罗马浴池',
      ar: 'الحمامات الرومانية',
    },
    category: 'facilities',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    alt: {
      vi: 'Bể bơi Địa Trung Hải',
      en: 'Mediterranean Pool',
      fr: 'Piscine Méditerranéenne',
      cn: '地中海泳池',
      ar: 'المسبح المتوسطي',
    },
    category: 'facilities',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    alt: {
      vi: 'View biển',
      en: 'Ocean View',
      fr: 'Vue sur Mer',
      cn: '海景',
      ar: 'إطلالة على البحر',
    },
    category: 'exterior',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
    alt: {
      vi: 'Nguyên liệu tự nhiên',
      en: 'Natural Ingredients',
      fr: 'Ingrédients Naturels',
      cn: '天然原料',
      ar: 'مكونات طبيعية',
    },
    category: 'treatments',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    alt: {
      vi: 'Buổi trị liệu',
      en: 'Treatment Session',
      fr: 'Séance de Soin',
      cn: '疗程',
      ar: 'جلسة علاج',
    },
    category: 'treatments',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=1200&q=80',
    alt: {
      vi: 'Đá núi lửa',
      en: 'Volcanic Stones',
      fr: 'Pierres Volcaniques',
      cn: '火山石',
      ar: 'أحجار بركانية',
    },
    category: 'treatments',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1544161515-6b31d7e3d0d3?w=1200&q=80',
    alt: {
      vi: 'Phòng VIP',
      en: 'VIP Room',
      fr: 'Salle VIP',
      cn: 'VIP房',
      ar: 'غرفة VIP',
    },
    category: 'interior',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1521737711867-e55b00f7a836?w=1200&q=80',
    alt: {
      vi: 'Đội ngũ chuyên gia',
      en: 'Expert Team',
      fr: 'Équipe d\'Experts',
      cn: '专家团队',
      ar: 'فريق الخبراء',
    },
    category: 'team',
  },
];

// ----------------------------------------------------------------------
// FAQ DATA
// ----------------------------------------------------------------------

export const SPA9_FAQ = [
  {
    id: 1,
    question: {
      vi: 'Thalassotherapy là gì?',
      en: 'What is Thalassotherapy?',
      fr: 'Qu\'est-ce que la Thalassothérapie?',
      cn: '什么是海洋疗法？',
      ar: 'ما هي الثالاسوترابي؟',
    },
    answer: {
      vi: 'Thalassotherapy là phương pháp trị liệu sử dụng nước biển, tảo, bùn biển và các khoáng chất biển khác để cải thiện sức khỏe. Phương pháp này có nguồn gốc từ Địa Trung Hải.',
      en: 'Thalassotherapy is a therapeutic method using seawater, algae, sea mud and other marine minerals to improve health. This method originated from the Mediterranean.',
      fr: 'La thalassothérapie est une méthode thérapeutique utilisant l\'eau de mer, les algues, la boue marine et d\'autres minéraux marins.',
      cn: '海洋疗法是一种使用海水、海藻、海泥及其他海洋矿物质改善健康的治疗方法。源自地中海地区。',
      ar: 'الثالاسوترابي هي طريقة علاجية تستخدم ماء البحر والطحالب والطين البحري والمعادن البحرية الأخرى.',
    },
  },
  {
    id: 2,
    question: {
      vi: 'Dầu olive có tác dụng gì trong trị liệu spa?',
      en: 'What are the benefits of olive oil in spa treatments?',
      fr: 'Quels sont les bienfaits de l\'huile d\'olive en spa?',
      cn: '橄榄油在水疗中有什么作用？',
      ar: 'ما هي فوائد زيت الزيتون في علاجات المنتجعات الصحية؟',
    },
    answer: {
      vi: 'Dầu olive giàu vitamin E, antioxidant và axit béo omega-3, giúp dưỡng ẩm sâu, làm mềm da, chống lão hóa và phục hồi tóc.',
      en: 'Olive oil is rich in vitamin E, antioxidants and omega-3 fatty acids, providing deep hydration, skin softening, anti-aging and hair restoration.',
      fr: 'L\'huile d\'olive est riche en vitamine E, antioxydants et oméga-3, offrant une hydratation profonde, un adoucissement cutané, un anti-âge.',
      cn: '橄榄油富含维生素E、抗氧化剂与omega-3脂肪酸，能深层保湿、软化肌肤、抗衰老并修复头发。',
      ar: 'زيت الزيتون غني بفيتامين هـ ومضادات الأكسدة وأوميغا-3، يوفر ترطيبًا عميقًا وتنعيمًا للبشرة ومكافحة الشيخوخة.',
    },
  },
  {
    id: 3,
    question: {
      vi: 'Tôi cần chuẩn bị gì trước khi đến spa?',
      en: 'What should I prepare before coming to the spa?',
      fr: 'Que dois-je préparer avant de venir au spa?',
      cn: '来水疗前需要准备什么？',
      ar: 'ماذا يجب أن أحضر قبل المجيء إلى المنتجع الصحي؟',
    },
    answer: {
      vi: 'Bạn chỉ cần mang theo đồ bơi. Chúng tôi cung cấp khăn, dép spa, và mọi vật dụng cần thiết. Nên đến trước 15 phút để thư giãn.',
      en: 'Just bring your swimwear. We provide towels, spa slippers, and all necessary items. Arrive 15 minutes early to relax.',
      fr: 'Apportez simplement votre maillot de bain. Nous fournissons serviettes, chaussons et tout le nécessaire. Venez 15 min à l\'avance.',
      cn: '只需携带泳装。我们提供毛巾、水疗拖鞋及一切所需物品。建议提前15分钟到达以放松身心。',
      ar: 'أحضر فقط ملابس السباحة. نحن نوفر المناشف ونعال السبا وكل ما تحتاجه. احضر قبل 15 دقيقة للاسترخاء.',
    },
  },
  {
    id: 4,
    question: {
      vi: 'Tôi có thai có thể dùng dịch vụ không?',
      en: 'Can I use services during pregnancy?',
      fr: 'Puis-je utiliser les services pendant la grossesse?',
      cn: '怀孕期间可以使用服务吗？',
      ar: 'هل يمكنني استخدام الخدمات أثناء الحمل؟',
    },
    answer: {
      vi: 'Một số liệu trình phù hợp cho phụ nữ mang thai, như massage nhẹ nhàng với dầu ô liu organic. Vui lòng thông báo cho nhân viên trước.',
      en: 'Some treatments are suitable for pregnant women, like gentle massage with organic olive oil. Please inform our staff beforehand.',
      fr: 'Certains soins conviennent aux femmes enceintes, comme le massage doux à l\'huile d\'olive bio. Veuillez informer notre personnel.',
      cn: '部分疗程适合孕妇，如使用有机橄榄油的轻柔按摩。请提前告知我们的员工。',
      ar: 'بعض العلاجات مناسبة للحوامل، مثل التدليك اللطيف بزيت الزيتون العضوي. يرجى إبلاغ موظفينا مسبقًا.',
    },
  },
  {
    id: 5,
    question: {
      vi: 'Nghi lễ tắm La Mã khác gì tắm thường?',
      en: 'How is the Roman Bath Ritual different from regular bathing?',
      fr: 'En quoi le rituel du bain romain diffère-t-il du bain ordinaire?',
      cn: '罗马浴礼与普通洗浴有什么不同？',
      ar: 'كيف يختلف طقس الحمام الروماني عن الاستحمام العادي؟',
    },
    answer: {
      vi: 'Nghi lễ La Mã là quy trình 3 bước có kiểm soát nhiệt độ: Tepidarium (ấm), Caldarium (nóng), Frigidarium (lạnh). Kết hợp massage và dầu ô liu.',
      en: 'The Roman ritual is a 3-stage temperature-controlled process: Tepidarium (warm), Caldarium (hot), Frigidarium (cold). Combined with massage and olive oil.',
      fr: 'Le rituel romain est un processus en 3 étapes contrôlé en température: Tepidarium, Caldarium, Frigidarium. Avec massage et huile d\'olive.',
      cn: '罗马浴礼是控制温度的三段式流程：温浴室、热浴室、冷浴室。配合按摩与橄榄油。',
      ar: 'الطقوس الرومانية هي عملية من 3 مراحل ذات تحكم في درجة الحرارة: تيبيداريوم وكالداريوم وفريجيداريوم.',
    },
  },
];

// ----------------------------------------------------------------------
// PACKAGES DATA
// ----------------------------------------------------------------------

export const SPA9_PACKAGES = [
  {
    id: 1,
    name: {
      vi: 'Gói Khám Phá',
      en: 'Discovery Package',
      fr: 'Forfait Découverte',
      cn: '探索套餐',
      ar: 'باقة الاكتشاف',
    },
    subtitle: {
      vi: 'Dành cho người mới',
      en: 'For first-timers',
      fr: 'Pour les débutants',
      cn: '适合初次体验者',
      ar: 'للمبتدئين',
    },
    treatments: 3,
    validity: {
      vi: '30 ngày',
      en: '30 days',
      fr: '30 jours',
      cn: '30天',
      ar: '30 يوماً',
    },
    originalPrice: 3200000,
    price: 2500000,
    discount: 22,
    color: OLIVE,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    includes: {
      vi: ['Roman Bath Ritual', 'Greek Olive Massage', 'Mediterranean Facial'],
      en: ['Roman Bath Ritual', 'Greek Olive Massage', 'Mediterranean Facial'],
      fr: ['Rituel du Bain Romain', 'Massage à l\'Huile d\'Olive', 'Soin Visage Méditerranéen'],
      cn: ['罗马浴礼', '希腊橄榄油按摩', '地中海面部护理'],
      ar: ['طقوس الحمام الروماني', 'تدليك بزيت الزيتون', 'علاج الوجه المتوسطي'],
    },
  },
  {
    id: 2,
    name: {
      vi: 'Gói Sức Khỏe',
      en: 'Wellness Package',
      fr: 'Forfait Bien-Être',
      cn: '健康套餐',
      ar: 'باقة الصحة',
    },
    subtitle: {
      vi: 'Trị liệu biển toàn diện',
      en: 'Complete sea therapy',
      fr: 'Thérapie marine complète',
      cn: '全面海洋疗法',
      ar: 'علاج بحري شامل',
    },
    treatments: 5,
    validity: {
      vi: '60 ngày',
      en: '60 days',
      fr: '60 jours',
      cn: '60天',
      ar: '60 يوماً',
    },
    originalPrice: 5500000,
    price: 4200000,
    discount: 24,
    color: AZURE,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    includes: {
      vi: ['Roman Bath Ritual', 'Greek Olive Massage', 'Sea Salt Scrub', 'Volcanic Stone Thalasso', 'Aurora Facial'],
      en: ['Roman Bath Ritual', 'Greek Olive Massage', 'Sea Salt Scrub', 'Volcanic Stone Thalasso', 'Aurora Facial'],
      fr: ['Rituel du Bain Romain', 'Massage Olive', 'Gommage au Sel', 'Thalasso Pierres Volcaniques', 'Soin Visage Aurora'],
      cn: ['罗马浴礼', '希腊橄榄油按摩', '海盐磨砂', '火山石海洋疗法', '晨曦面部护理'],
      ar: ['طقوس الحمام الروماني', 'تدليك الزيتون', 'تقشير الملح', 'ثالاسو الأحجار البركانية', 'علاج الوجه أورورا'],
    },
  },
  {
    id: 3,
    name: {
      vi: 'Gói Sang Trọng',
      en: 'Luxury Package',
      fr: 'Forfait Luxe',
      cn: '奢华套餐',
      ar: 'باقة الفخامة',
    },
    subtitle: {
      vi: 'Trải nghiệm thượng lưu',
      en: 'Premium experience',
      fr: 'Expérience premium',
      cn: '高端体验',
      ar: 'تجربة فاخرة',
    },
    treatments: 8,
    validity: {
      vi: '90 ngày',
      en: '90 days',
      fr: '90 jours',
      cn: '90天',
      ar: '90 يوماً',
    },
    originalPrice: 9500000,
    price: 7200000,
    discount: 24,
    color: SUN,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    includes: {
      vi: ['Tất cả liệu trình Wellness', 'Sunset Couples Retreat', 'Private Roman Bath', 'Champagne & Canapés', 'VIP Lounge Access'],
      en: ['All Wellness treatments', 'Sunset Couples Retreat', 'Private Roman Bath', 'Champagne & Canapés', 'VIP Lounge Access'],
      fr: ['Tous les soins Bien-Être', 'Retreat Couple', 'Bain Romain Privé', 'Champagne & Canapés', 'Accès Salon VIP'],
      cn: ['所有健康套餐疗程', '日落情侣静修', '私人罗马浴', '香槟与小食', 'VIP休息室使用权'],
      ar: ['جميع علاجات الصحة', 'تراجع الأزواج', 'حمام روماني خاص', 'شمامباني ومقبلات', 'دخول صالة VIP'],
    },
  },
];

// ----------------------------------------------------------------------
// BEFORE/AFTER DATA
// ----------------------------------------------------------------------

export const SPA9_BEFORE_AFTER = [
  {
    id: 1,
    treatment: {
      vi: 'Mediterranean Sea Salt Scrub',
      en: 'Mediterranean Sea Salt Scrub',
      fr: 'Gommage au Sel Méditerranéen',
      cn: '地中海海盐磨砂',
      ar: 'تقشير ملح البحر المتوسط',
    },
    before: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=600&q=80',
    description: {
      vi: 'Da mịn màng, sáng rõ rệt sau 1 liệu trình',
      en: 'Skin is visibly smoother and brighter after 1 treatment',
      fr: 'La peau est nettement plus lisse et lumineuse après 1 soin',
      cn: '一次疗程后肌肤明显更光滑透亮',
      ar: 'البشرة أكثر نعومة وإشراقًا بشكل ملحوظ بعد جلسة واحدة',
    },
    duration: {
      vi: '1 buổi',
      en: '1 session',
      fr: '1 séance',
      cn: '1次',
      ar: 'جلسة واحدة',
    },
  },
  {
    id: 2,
    treatment: {
      vi: 'Greek Olive Oil Massage (10 buổi)',
      en: 'Greek Olive Oil Massage (10 sessions)',
      fr: 'Massage à l\'Huile d\'Olive (10 séances)',
      cn: '希腊橄榄油按摩（10次）',
      ar: 'تدليك بزيت الزيتون اليوناني (10 جلسات)',
    },
    before: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
    description: {
      vi: 'Da mềm, đàn hồi tốt, vết rạn giảm rõ',
      en: 'Skin is soft, elastic, stretch marks significantly reduced',
      fr: 'La peau est douce, élastique, vergetures nettement réduites',
      cn: '肌肤柔软有弹性，妊娠纹明显淡化',
      ar: 'البشرة ناعمة ومرنة وعلامات التمدد مخففة بشكل كبير',
    },
    duration: {
      vi: '10 buổi',
      en: '10 sessions',
      fr: '10 séances',
      cn: '10次',
      ar: '10 جلسات',
    },
  },
  {
    id: 3,
    treatment: {
      vi: 'Aurora Mediterranean Facial (6 buổi)',
      en: 'Aurora Mediterranean Facial (6 sessions)',
      fr: 'Soin Visage Aurora (6 séances)',
      cn: '晨曦地中海面部护理（6次）',
      ar: 'علاج الوجه أورورا (6 جلسات)',
    },
    before: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    description: {
      vi: 'Da mặt sáng, đều màu, lỗ chân lông nhỏ lại',
      en: 'Face is brighter, even-toned, pores are minimized',
      fr: 'Le visage est plus lumineux, teint unifié, pores resserrés',
      cn: '面部更透亮均匀，毛孔细腻',
      ar: 'الوجه أكثر إشراقًا وتوحّد لونه والمسام مصغّرة',
    },
    duration: {
      vi: '6 buổi',
      en: '6 sessions',
      fr: '6 séances',
      cn: '6次',
      ar: '6 جلسات',
    },
  },
];

// ----------------------------------------------------------------------
// PROMOTIONS DATA
// ----------------------------------------------------------------------

export const SPA9_PROMOTIONS = [
  {
    id: 1,
    title: {
      vi: 'Mùa Hè Địa Trung Hải',
      en: 'Mediterranean Summer',
      fr: 'Été Méditerranéen',
      cn: '地中海夏日',
      ar: 'صيف البحر المتوسط',
    },
    discount: 30,
    code: 'SUMMER25',
    validUntil: '2025-08-31',
    description: {
      vi: 'Giảm 30% cho mọi liệu trình Roman Bath Ritual trong mùa hè.',
      en: '30% off all Roman Bath Ritual treatments this summer.',
      fr: '30% de réduction sur tous les rituels du bain romain cet été.',
      cn: '夏日罗马浴礼疗程享七折优惠。',
      ar: 'خصم 30% على جميع علاجات طقوس الحمام الروماني هذا الصيف.',
    },
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    color: SUN,
  },
  {
    id: 2,
    title: {
      vi: 'Ngày Cặp Đôi',
      en: 'Couples Day',
      fr: 'Journée des Couples',
      cn: '情侣日',
      ar: 'يوم الأزواج',
    },
    discount: 25,
    code: 'COUPLE25',
    validUntil: '2025-12-31',
    description: {
      vi: 'Giảm 25% cho gói Sunset Couples Retreat khi đặt cho 2.',
      en: '25% off Sunset Couples Retreat package when booking for 2.',
      fr: '25% de réduction sur le forfait Couple au Coucher de Soleil.',
      cn: '双人预订日落情侣套餐享75折。',
      ar: 'خصم 25% على باقة تراجع الأزواج عند الحجز لشخصين.',
    },
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    color: '#E07B38',
  },
  {
    id: 3,
    title: {
      vi: 'Member Club',
      en: 'Member Club',
      fr: 'Club Membres',
      cn: '会员俱乐部',
      ar: 'نادي الأعضاء',
    },
    discount: 20,
    code: 'MEMBER20',
    validUntil: '2025-12-31',
    description: {
      vi: 'Thành viên Thalassa Club được giảm 20% mọi liệu trình quanh năm.',
      en: 'Thalassa Club members get 20% off all treatments all year round.',
      fr: 'Les membres du Club Thalassa bénéficient de 20% sur tous les soins.',
      cn: 'Thalassa Club会员全年所有疗程享受八折。',
      ar: 'أعضاء نادي ثالاسا يحصلون على خصم 20% على جميع العلاجات طوال العام.',
    },
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    color: AZURE,
  },
];

// ----------------------------------------------------------------------
// FEEDBACK DATA
// ----------------------------------------------------------------------

export const SPA9_FEEDBACK = [
  {
    id: 1,
    name: 'Nguyễn Thu Hương',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    treatment: {
      vi: 'Roman Bath Ritual',
      en: 'Roman Bath Ritual',
      fr: 'Rituel du Bain Romain',
      cn: '罗马浴礼',
      ar: 'طقوس الحمام الروماني',
    },
    date: '2025-06-15',
    comment: {
      vi: 'Trải nghiệm tuyệt vời! Nghi lễ La Mã độc đáo, chuyên viên tay nghề cao, không gian sang trọng. Nhất định sẽ quay lại.',
      en: 'Amazing experience! The Roman ritual is unique, staff is highly skilled, space is luxurious. Will definitely return.',
      fr: 'Expérience incroyable! Le rituel romain est unique, le personnel est qualifié, l\'espace est luxueux. Je reviendrai.',
      cn: '体验非常棒！罗马浴礼很独特，技师手法高超，环境奢华。一定会再来。',
      ar: 'تجربة رائعة! الطقوس الرومانية فريدة والموظفون مهرة والمكان فاخر. سأعود بالتأكيد.',
    },
  },
  {
    id: 2,
    name: 'Trần Minh Quốc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a706e886d8b?w=150&q=80',
    rating: 5,
    treatment: {
      vi: 'Greek Olive Massage',
      en: 'Greek Olive Massage',
      fr: 'Massage à l\'Huile d\'Olive',
      cn: '希腊橄榄油按摩',
      ar: 'تدليك الزيتون اليوناني',
    },
    date: '2025-05-28',
    comment: {
      vi: 'Massage với dầu olive thật tuyệt. Da mềm mượt sau khi done. Thích mùi hương thảo và oải hương nhẹ nhàng.',
      en: 'The olive oil massage was wonderful. Skin was silky smooth after. Loved the subtle rosemary and lavender scent.',
      fr: 'Le massage à l\'huile d\'olive était merveilleux. Peau soyeuse après. J\'ai adoré le parfum de romarin et lavande.',
      cn: '橄榄油按摩太棒了。做完后皮肤光滑细腻。喜欢淡淡的迷迭香与薰衣草香味。',
      ar: 'تدليك بزيت الزيتون رائع. البشرة حريرية بعد الجلسة. أحببت رائحة إكليل الجبل والخزامى الخفيفة.',
    },
  },
  {
    id: 3,
    name: 'Lê Thanh Mai',
    avatar: 'https://images.unsplash.com/photo-1438761681033-9461cf81e5c5?w=150&q=80',
    rating: 4,
    treatment: {
      vi: 'Sunset Couples Retreat',
      en: 'Sunset Couples Retreat',
      fr: 'Retreat Couple',
      cn: '日落情侣静修',
      ar: 'تراجع الأزواج',
    },
    date: '2025-04-20',
    comment: {
      vi: 'Đã cùng chồng trải nghiệm gói hoàng hôn tại chi nhánh Đà Nẵng. View biển đẹp, champagne ngon, massage thư giãn. Romantic!',
      en: 'Did the sunset package with my husband at Da Nang branch. Beautiful ocean view, good champagne, relaxing massage. Romantic!',
      fr: 'Nous avons fait le forfait coucher de soleil à Da Nang. Vue mer magnifique, bon champagne, massage relaxant. Romantique!',
      cn: '和丈夫在岘港分店体验了日落套餐。海景美丽，香槟好喝，按摩放松。太浪漫了！',
      ar: 'جربنا باقة الغروب مع زوجي في فرع دا نانغ. إطلالة بحرية جميلة وشامبانا لذيذة وتدليك مريح. رومانسي!',
    },
  },
];

// ----------------------------------------------------------------------
// OFFERS DATA
// ----------------------------------------------------------------------

export const SPA9_OFFERS = [
  {
    id: 1,
    title: {
      vi: 'Tặng Voucher 500.000₫',
      en: 'Free 500,000₫ Voucher',
      fr: 'Bon de 500 000₫ Offert',
      cn: '赠送50万越盾代金券',
      ar: 'قسيمة مجانية بقيمة 500,000₫',
    },
    subtitle: {
      vi: 'Khi đăng ký thành viên mới',
      en: 'When signing up as new member',
      fr: 'Lors de l\'inscription comme nouveau membre',
      cn: '新会员注册时',
      ar: 'عند التسجيل كعضو جديد',
    },
    description: {
      vi: 'Đăng ký thành viên Thalassa Club ngay hôm nay để nhận voucher trị giá 500.000₫ áp dụng cho lần sử dụng đầu tiên.',
      en: 'Sign up for Thalassa Club membership today to receive a 500,000₫ voucher for your first visit.',
      fr: 'Inscrivez-vous au Club Thalassa aujourd\'hui pour recevoir un bon de 500 000₫ pour votre première visite.',
      cn: '今日注册Thalassa Club会员，即获50万越盾代金券，首次使用时可用。',
      ar: 'سجّل في نادي ثالاسا اليوم للحصول على قسيمة بقيمة 500,000₫ لزيارتك الأولى.',
    },
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    color: AZURE,
  },
  {
    id: 2,
    title: {
      vi: 'Giảm 15% sinh nhật',
      en: '15% Birthday Discount',
      fr: '15% de Réduction Anniversaire',
      cn: '生日享85折',
      ar: 'خصم 15% عيد الميلاد',
    },
    subtitle: {
      vi: 'Trong tháng sinh nhật của bạn',
      en: 'During your birthday month',
      fr: 'Pendant votre mois d\'anniversaire',
      cn: '在您的生日月期间',
      ar: 'خلال شهر مولدك',
    },
    description: {
      vi: 'Thành viên được giảm 15% cho mọi liệu trình trong tháng sinh nhật. Quà tặng đặc biệt từ Thalassa!',
      en: 'Members get 15% off all treatments during their birthday month. Special gift from Thalassa!',
      fr: 'Les membres ont 15% sur tous les soins pendant leur mois d\'anniversaire. Cadeau spécial de Thalassa!',
      cn: '会员在生日月可享所有疗程85折。Thalassa特别礼物！',
      ar: 'يحصل الأعضاء على خصم 15% على جميع العلاجات خلال شهر مولدهم. هدية خاصة من ثالاسا!',
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    color: SUN,
  },
  {
    id: 3,
    title: {
      vi: 'Combo Bạn Bè - Mua 5 Tặng 1',
      en: 'Friends Combo - Buy 5 Get 1 Free',
      fr: 'Combo Amis - Achetez 5 Recevez 1 Gratuit',
      cn: '朋友套餐 - 买5送1',
      ar: 'عرض الأصدقاء - اشترِ 5 واحصل على 1 مجانًا',
    },
    subtitle: {
      vi: 'Ghé spa cùng nhóm bạn',
      en: 'Visit spa with your group',
      fr: 'Venez au spa en groupe',
      cn: '和朋友一起来水疗',
      ar: 'تفضّل إلى المنتجع مع مجموعتك',
    },
    description: {
      vi: 'Đặt lịch cho nhóm 5 người và người thứ 6 được miễn phí. Chia sẻ trải nghiệm thư giãn cùng bạn bè!',
      en: 'Book for a group of 5 and the 6th person is free. Share a relaxing experience with friends!',
      fr: 'Réservez pour un groupe de 5 et la 6ème personne est gratuite.',
      cn: '预订5人团队，第6人免费。与朋友分享放松体验！',
      ar: 'احجز لمجموعة من 5 أشهر والشخص السادس مجانًا. شارك تجربة الاسترخاء مع الأصدقاء!',
    },
    image: 'https://images.unsplash.com/photo-1521737711867-e55b00f7a836?w=800&q=80',
    color: OLIVE,
  },
];

// ----------------------------------------------------------------------
// PARTNERS DATA
// ----------------------------------------------------------------------

export const SPA9_PARTNERS = [
  {
    id: 1,
    name: {
      vi: 'Olive Oil Kalamata',
      en: 'Kalamata Olive Oil',
      fr: 'Huile d\'Olive Kalamata',
      cn: '卡拉马塔橄榄油',
      ar: 'زيت زيتون كالاماتا',
    },
    type: {
      vi: 'Nhà cung cấp nguyên liệu',
      en: 'Ingredients supplier',
      fr: 'Fournisseur d\'ingrédients',
      cn: '原料供应商',
      ar: 'مورد المكونات',
    },
    logo: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80',
    description: {
      vi: '100% dầu olive extra-virgin từ vùng Kalamata, Hy Lạp.',
      en: '100% extra-virgin olive oil from Kalamata, Greece.',
      fr: '100% huile d\'olive vierge extra de Kalamata, Grèce.',
      cn: '来自希腊卡拉马塔地区的100%特级初榨橄榄油。',
      ar: 'زيت زيتون بكر ممتاز 100% من كالاماتا، اليونان.',
    },
  },
  {
    id: 2,
    name: {
      vi: 'Fleur de Sel Camargue',
      en: 'Camargue Fleur de Sel',
      fr: 'Fleur de Sel de Camargue',
      cn: '卡马格盐之花',
      ar: 'زهرة ملح كامارغ',
    },
    type: {
      vi: 'Nhà cung cấp nguyên liệu',
      en: 'Ingredients supplier',
      fr: 'Fournisseur d\'ingrédients',
      cn: '原料供应商',
      ar: 'مورد المكونات',
    },
    logo: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=200&q=80',
    description: {
      vi: 'Muối biển cao cấp từ vùng Camargue, Pháp.',
      en: 'Premium sea salt from Camargue, France.',
      fr: 'Sel marin premium de Camargue, France.',
      cn: '来自法国卡马格地区的高级海盐。',
      ar: 'ملح بحري فاخر من كامارغ، فرنسا.',
    },
  },
  {
    id: 3,
    name: {
      vi: 'Essentia Aromatics',
      en: 'Essentia Aromatics',
      fr: 'Essentia Aromatics',
      cn: 'Essentia香薰',
      ar: 'إيسنتشيا أروماتيكس',
    },
    type: {
      vi: 'Đối tác tinh dầu',
      en: 'Essential oils partner',
      fr: 'Partenaire huiles essentielles',
      cn: '精油合作伙伴',
      ar: 'شريك الزيوت العطرية',
    },
    logo: 'https://images.unsplash.com/photo-1544161515-6b31d7e3d0d3?w=200&q=80',
    description: {
      vi: 'Tinh dầu organic từ lavender, rosemary và các thảo mộc Địa Trung Hải.',
      en: 'Organic essential oils from lavender, rosemary and Mediterranean herbs.',
      fr: 'Huiles essentielles bio de lavande, romarin et herbes méditerranéennes.',
      cn: '来自薰衣草、迷迭香与地中海草药的有机精油。',
      ar: 'زيوت عطرية عضوية من الخزامى وإكليل الجبل والأعشاب المتوسطية.',
    },
  },
  {
    id: 4,
    name: {
      vi: 'Thalassa Institute',
      en: 'Thalassa Institute',
      fr: 'Institut Thalassa',
      cn: 'Thalassa学院',
      ar: 'معهد ثالاسا',
    },
    type: {
      vi: 'Đối tác đào tạo',
      en: 'Training partner',
      fr: 'Partenaire formation',
      cn: '培训合作伙伴',
      ar: 'شريك التدريب',
    },
    logo: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=200&q=80',
    description: {
      vi: 'Viện nghiên cứu và đào tạo thalassotherapy hàng đầu Pháp.',
      en: 'Leading French research and training institute for thalassotherapy.',
      fr: 'Institut français de recherche et formation en thalassothérapie.',
      cn: '法国领先的海洋疗法研究与培训机构。',
      ar: 'معهد فرنسي رائد للبحث والتدريب في الثالاسوترابي.',
    },
  },
];

// ----------------------------------------------------------------------
// POLICY DATA
// ----------------------------------------------------------------------

export const SPA9_POLICY = [
  {
    id: 1,
    title: {
      vi: 'Chính sách Đặt lịch',
      en: 'Booking Policy',
      fr: 'Politique de Réservation',
      cn: '预约政策',
      ar: 'سياسة الحجز',
    },
    content: {
      vi: 'Vui lòng đặt lịch trước ít nhất 24 giờ. Miễn phí hủy lịch trước 6 giờ. Hủy trong vòng 6 giờ sẽ tính 30% giá trị liệu trình. Không đến (no-show) sẽ tính 100%.',
      en: 'Please book at least 24 hours in advance. Free cancellation up to 6 hours before. Cancellation within 6 hours incurs 30% of treatment value. No-show is charged 100%.',
      fr: 'Réservez au moins 24h à l\'avance. Annulation gratuite jusqu\'à 6h avant. Annulation sous 6h: 30% du soin. No-show: 100%.',
      cn: '请至少提前24小时预约。提前6小时取消免费。6小时内取消收取疗程价值30%。未到收取100%。',
      ar: 'يرجى الحجز قبل 24 ساعة على الأقل. الإلغاء مجاني قبل 6 ساعات. الإلغاء خلال 6 ساعات يتحمل 30% من قيمة العلاج. عدم الحضور يتحمل 100%.',
    },
  },
  {
    id: 2,
    title: {
      vi: 'Chính sách Thanh toán',
      en: 'Payment Policy',
      fr: 'Politique de Paiement',
      cn: '付款政策',
      ar: 'سياسة الدفع',
    },
    content: {
      vi: 'Chấp nhận thanh toán bằng tiền mặt, thẻ tín dụng (Visa, Master, JCB), và chuyển khoản. Voucher và gói liệu trình đã mua không được hoàn tiền.',
      en: 'We accept cash, credit cards (Visa, Master, JCB), and bank transfer. Vouchers and purchased packages are non-refundable.',
      fr: 'Nous acceptons espèces, cartes de crédit (Visa, Master, JCB) et virement. Les bons et forfaits ne sont pas remboursables.',
      cn: '接受现金、信用卡（Visa、Master、JCB）及银行转账支付。代金券与已购套餐不可退款。',
      ar: 'نقبل الدفع نقدًا وبالبطاقات الائتمانية (فيزا وماستر وجي سي بي) والتحويل البنكي. القسائم والباقات غير قابلة للاسترداد.',
    },
  },
  {
    id: 3,
    title: {
      vi: 'Chính sách Bảo mật',
      en: 'Privacy Policy',
      fr: 'Politique de Confidentialité',
      cn: '隐私政策',
      ar: 'سياسة الخصوصية',
    },
    content: {
      vi: 'Thông tin cá nhân của khách hàng được bảo mật theo quy định pháp luật. Chúng tôi không chia sẻ thông tin cho bên thứ ba khi không có sự đồng ý của khách.',
      en: 'Customer personal information is protected by law. We do not share information with third parties without customer consent.',
      fr: 'Les données personnelles sont protégées par la loi. Pas de partage avec des tiers sans consentement du client.',
      cn: '客户个人信息受法律保护。未经客户同意，我们不会向第三方透露信息。',
      ar: 'يتم حماية المعلومات الشخصية بموجب القانون. لا نشارك المعلومات مع أطراف ثالثة بدون موافقة العميل.',
    },
  },
];

// ----------------------------------------------------------------------
// EXPORTS
// ----------------------------------------------------------------------

export { getLang, formatVND };
