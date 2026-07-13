export type Spa13Lang = 'en' | 'vi' | 'fr' | 'cn' | 'ar';

export const SPA13_HERO_SLIDES = [
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
    alt: 'Amazon rainforest',
  },
  {
    src: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1920&q=80',
    alt: 'Acai harvest',
  },
  {
    src: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=1920&q=80',
    alt: 'Amazon clay therapy',
  },
  {
    src: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1920&q=80',
    alt: 'Jungle botanicals',
  },
];

export const SPA13_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
  acai: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&q=80',
  andiroba: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
  tucuma: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  argila: 'https://images.unsplash.com/photo-1536237880829-dd873b2305cc?w=600&q=80',
};

export const JUNGLE = '#0D4A2A';
export const TROP_GOLD = '#F7C948';
export const FLAME = '#E05D2A';
export const CLAY = '#A0522D';
export const FRESH = '#F0FFF4';

export const SPA13_BOTANICALS = [
  {
    portuguese: 'Açaí',
    name: {
      vi: 'Quả Açaí Amazon',
      en: 'Amazon Açaí Berry',
      fr: "Baie d'açaí d'Amazonie",
      cn: '亚马逊阿萨伊浆果',
      ar: 'توت الأساي الأمازوني',
    },
    tribe: {
      vi: 'Người Caboclo, Pará',
      en: 'Caboclo people, Pará',
      fr: 'Peuple Caboclo, Pará',
      cn: '帕拉州的卡波克洛人',
      ar: 'شعب الكابوكلو، بارا',
    },
    benefit: {
      vi: 'Chống oxy hóa · Làm sáng · Trẻ hóa',
      en: 'Antioxidant · Brightening · Anti-aging',
      fr: 'Antioxydant · Éclaircissant · Anti-âge',
      cn: '抗氧化 · 提亮 · 抗衰老',
      ar: 'مضاد للأكسدة · تفتيح · مكافحة الشيخوخة',
    },
    description: {
      vi: 'Quả açaí từ rừng ngập mặn Pará chứa 10× antioxidant so với quả việt quất. Tẩy da açaí loại bỏ tế bào chết, kích thích tuần hoàn và làm đều màu da toàn thân.',
      en: 'Açaí berries from the Pará mangrove forests contain 10× more antioxidants than blueberries. Açaí exfoliation removes dead cells, stimulates circulation and evens skin tone all over.',
      fr: "Les baies d'açaí des forêts de mangroves du Pará contiennent 10× plus d'antioxydants que les myrtilles. L'exfoliation à l'açaí élimine les cellules mortes, stimule la circulation et unifie le teint sur tout le corps.",
      cn: '来自帕拉州红树林的阿萨伊浆果所含抗氧化物是蓝莓的10倍。阿萨伊去角质能去除死皮细胞、促进血液循环并均匀全身肤色。',
      ar: 'يحتوي توت الأساي من غابات المنغروف في بارا على مضادات أكسدة تفوق التوت الأزرق بعشر مرات. يزيل تقشير الأساي الخلايا الميتة وينشّط الدورة الدموية ويوحّد لون البشرة في كامل الجسم.',
    },
    color: '#4A1A6E',
    icon: '🫐',
    image: SPA13_IMAGES.acai,
  },
  {
    portuguese: 'Andiroba',
    name: {
      vi: 'Dầu Andiroba',
      en: 'Andiroba Oil',
      fr: "Huile d'andiroba",
      cn: '安迪罗巴油',
      ar: 'زيت الأنديروبا',
    },
    tribe: {
      vi: 'Người Kayapó, Xingu',
      en: 'Kayapó people, Xingu',
      fr: 'Peuple Kayapó, Xingu',
      cn: '辛古河的卡雅波人',
      ar: 'شعب الكايابو، شينغو',
    },
    benefit: {
      vi: 'Chống viêm · Phục hồi · Tái sinh',
      en: 'Anti-inflammatory · Recovery · Regeneration',
      fr: 'Anti-inflammatoire · Récupération · Régénération',
      cn: '抗炎 · 修复 · 再生',
      ar: 'مضاد للالتهاب · تعافٍ · تجديد',
    },
    description: {
      vi: 'Dầu andiroba — "nước chữa lành" của người Kayapó từ hạt cây Carapa guianensis. Chứa tetranortriterpenoids chống viêm mạnh nhất thiên nhiên, chữa lành vết thương da và massage sâu.',
      en: "Andiroba oil — the Kayapó people's 'healing water' from Carapa guianensis seeds. Contains the most powerful natural anti-inflammatory tetranortriterpenoids, heals skin wounds and deep massage.",
      fr: "L'huile d'andiroba — « l'eau guérisseuse » du peuple Kayapó issue des graines de Carapa guianensis. Elle contient les tétranortriterpénoïdes anti-inflammatoires naturels les plus puissants, soigne les plaies cutanées et permet un massage profond.",
      cn: '安迪罗巴油——卡雅波人取自卡拉帕树种子的“愈合之水”。富含自然界最强效的抗炎四去甲三萜类化合物，能愈合皮肤伤口并用于深层按摩。',
      ar: 'زيت الأنديروبا — “ماء الشفاء” لدى شعب الكايابو المستخرج من بذور كارابا غويانينسيس. يحتوي على أقوى مركبات التيترانورتريتيربينويد المضادة للالتهاب في الطبيعة، يشفي جروح البشرة ويُستخدم في التدليك العميق.',
    },
    color: JUNGLE,
    icon: '🌿',
    image: SPA13_IMAGES.andiroba,
  },
  {
    portuguese: 'Tucumã',
    name: {
      vi: 'Bơ Tucumã',
      en: 'Tucumã Butter',
      fr: 'Beurre de tucumã',
      cn: '图库马脂',
      ar: 'زبدة التوكوما',
    },
    tribe: {
      vi: 'Người Tikuna, Amazonas',
      en: 'Tikuna people, Amazonas',
      fr: 'Peuple Tikuna, Amazonas',
      cn: '亚马逊州的提库纳人',
      ar: 'شعب التيكونا، أمازوناس',
    },
    benefit: {
      vi: 'Dưỡng ẩm sâu · Vitamin A · Beta-carotene',
      en: 'Deep moisture · Vitamin A · Beta-carotene',
      fr: 'Hydratation profonde · Vitamine A · Bêta-carotène',
      cn: '深层保湿 · 维生素A · β-胡萝卜素',
      ar: 'ترطيب عميق · فيتامين أ · بيتا كاروتين',
    },
    description: {
      vi: 'Bơ tucumã từ quả cọ Astrocaryum tucuma — giàu beta-carotene cao nhất trong các loại bơ thực vật. Dưỡng ẩm và phục hồi da khô, nứt nẻ với kết cấu mịn mềm như lụa sau 1 ứng dụng.',
      en: 'Tucumã butter from Astrocaryum tucuma palm fruit — richest in beta-carotene among all plant butters. Moisturises and repairs dry, cracked skin with silk-smooth texture after 1 application.',
      fr: 'Le beurre de tucumã issu du fruit du palmier Astrocaryum tucuma — le plus riche en bêta-carotène parmi tous les beurres végétaux. Il hydrate et répare la peau sèche et gercée pour une texture douce comme la soie dès la première application.',
      cn: '图库马脂取自阿斯特罗石栗棕榈果实——是所有植物脂中β-胡萝卜素含量最高的。仅需一次使用即可滋润修复干裂肌肤，带来丝绸般柔滑的质感。',
      ar: 'زبدة التوكوما المستخرجة من ثمار نخيل أستروكاريوم توكوما — الأغنى بالبيتا كاروتين بين كل الزبدات النباتية. ترطّب وتُصلح البشرة الجافة والمتشققة لتمنحها ملمسًا حريريًا ناعمًا بعد استخدام واحد.',
    },
    color: TROP_GOLD,
    icon: '🌴',
    image: SPA13_IMAGES.tucuma,
  },
  {
    portuguese: 'Argila',
    name: {
      vi: 'Đất Sét Trắng Amazon',
      en: 'Amazon White Clay',
      fr: "Argile blanche d'Amazonie",
      cn: '亚马逊白黏土',
      ar: 'الطين الأبيض الأمازوني',
    },
    tribe: {
      vi: 'Người Yanomami, Roraima',
      en: 'Yanomami people, Roraima',
      fr: 'Peuple Yanomami, Roraima',
      cn: '罗赖马州的亚诺玛米人',
      ar: 'شعب اليانومامي، رورايما',
    },
    benefit: {
      vi: 'Thải độc · Hút bã nhờn · Khoáng hóa',
      en: 'Detox · Oil absorption · Mineralisation',
      fr: 'Détox · Absorption du sébum · Minéralisation',
      cn: '排毒 · 吸附油脂 · 矿物补给',
      ar: 'إزالة السموم · امتصاص الدهون · تمعدن',
    },
    description: {
      vi: 'Đất sét kaolin trắng từ lòng sông Amazon — khoáng chất nguyên sơ từ hàng triệu năm địa tầng. Đắp toàn thân 20 phút hút độc tố qua da, cân bằng pH và bổ sung vi khoáng.',
      en: 'White kaolin clay from the Amazon riverbed — pristine minerals from millions of years of sediment. 20-minute full-body wrap draws toxins through the skin, balances pH and replenishes trace minerals.',
      fr: "Argile kaolin blanche du lit du fleuve Amazone — des minéraux purs issus de millions d'années de sédiments. Une enveloppe corporelle de 20 minutes draine les toxines à travers la peau, équilibre le pH et reconstitue les oligo-éléments.",
      cn: '取自亚马逊河床的白高岭土——蕴含数百万年沉积形成的纯净矿物。20分钟全身裹敷可透过皮肤排出毒素、平衡pH值并补充微量矿物质。',
      ar: 'طين الكاولين الأبيض من قاع نهر الأمازون — معادن نقية تشكّلت عبر ملايين السنين من الرواسب. لفّة كاملة للجسم لمدة 20 دقيقة تسحب السموم عبر البشرة وتوازن درجة الحموضة وتعوّض المعادن النادرة.',
    },
    color: CLAY,
    icon: '🏔️',
    image: SPA13_IMAGES.argila,
  },
];

export const SPA13_TREATMENTS = [
  {
    name: {
      vi: 'Açaí Glow Scrub',
      en: 'Açaí Glow Scrub',
      fr: 'Açaí Glow Scrub',
      cn: 'Açaí Glow Scrub',
      ar: 'Açaí Glow Scrub',
    },
    duration: { vi: '60 phút', en: '60 min', fr: '60 min', cn: '60 分钟', ar: '60 دقيقة' },
    price: { vi: '780.000₫', en: '780,000₫', fr: '780,000₫', cn: '780,000₫', ar: '780,000₫' },
  },
  {
    name: {
      vi: 'Andiroba Deep Massage',
      en: 'Andiroba Deep Massage',
      fr: 'Andiroba Deep Massage',
      cn: 'Andiroba Deep Massage',
      ar: 'Andiroba Deep Massage',
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
      vi: 'Amazon Botanical Wrap',
      en: 'Amazon Botanical Wrap',
      fr: 'Amazon Botanical Wrap',
      cn: 'Amazon Botanical Wrap',
      ar: 'Amazon Botanical Wrap',
    },
    duration: { vi: '75 phút', en: '75 min', fr: '75 min', cn: '75 分钟', ar: '75 دقيقة' },
    price: { vi: '950.000₫', en: '950,000₫', fr: '950,000₫', cn: '950,000₫', ar: '950,000₫' },
  },
  {
    name: {
      vi: 'Argila Detox Ritual',
      en: 'Argila Detox Ritual',
      fr: 'Argila Detox Ritual',
      cn: 'Argila Detox Ritual',
      ar: 'Argila Detox Ritual',
    },
    duration: { vi: '90 phút', en: '90 min', fr: '90 min', cn: '90 分钟', ar: '90 دقيقة' },
    price: {
      vi: '1.200.000₫',
      en: '1,200,000₫',
      fr: '1,200,000₫',
      cn: '1,200,000₫',
      ar: '1,200,000₫',
    },
  },
  {
    name: {
      vi: 'Selva Completa (Full Amazon Journey)',
      en: 'Selva Completa (Full Amazon Journey)',
      fr: 'Selva Completa (Full Amazon Journey)',
      cn: 'Selva Completa (Full Amazon Journey)',
      ar: 'Selva Completa (Full Amazon Journey)',
    },
    duration: { vi: '180 phút', en: '180 min', fr: '180 min', cn: '180 分钟', ar: '180 دقيقة' },
    price: {
      vi: '2.800.000₫',
      en: '2,800,000₫',
      fr: '2,800,000₫',
      cn: '2,800,000₫',
      ar: '2,800,000₫',
    },
  },
];
