import type { Spa11Lang } from 'src/sections/spa11/spa11-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { COBALT, TERRACOTTA, ARGAN_GOLD, CREAM_WARM } from 'src/sections/spa11/spa11-data';

const PRODUCTS = [
  {
    name: {
      vi: 'Dầu Argan Tinh Khiết Agadir',
      en: 'Pure Agadir Argan Oil',
      fr: "Huile d'argan pure d'Agadir",
      cn: 'Agadir 纯正阿甘油',
      ar: 'زيت أركان أغادير النقي',
    },
    ml: '100ml',
    price: '890.000₫',
    desc: {
      vi: 'Cold-pressed từ hạt argan hữu cơ Agadir. Hàm lượng vitamin E cao nhất, không pha trộn, không chất bảo quản. Mùi hương hạt nhẹ đặc trưng.',
      en: 'Cold-pressed from organic Agadir argan kernels. Highest vitamin E content, unblended, no preservatives. Characteristic light nutty scent.',
      fr: "Pressée à froid à partir d'amandes d'argan biologiques d'Agadir. Teneur la plus élevée en vitamine E, non mélangée, sans conservateurs. Parfum léger et caractéristique de noisette.",
      cn: '以 Agadir 有机阿甘果仁冷压而成。维生素 E 含量最高，无调和，无防腐剂。独特的淡雅坚果香。',
      ar: 'معصور على البارد من حبوب أركان العضوية من أغادير. أعلى نسبة فيتامين E، غير مخلوط، دون مواد حافظة. رائحة جوزية خفيفة مميزة.',
    },
    badge: { vi: '100% thuần', en: '100% pure', fr: '100% pur', cn: '100% 纯正', ar: 'نقي 100%' },
    color: ARGAN_GOLD,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    uses: {
      vi: 'Tóc · Da mặt · Body',
      en: 'Hair · Face · Body',
      fr: 'Cheveux · Visage · Corps',
      cn: '头发 · 面部 · 身体',
      ar: 'الشعر · الوجه · الجسم',
    },
  },
  {
    name: {
      vi: 'Savon Beldi Xà Phòng Đen',
      en: 'Beldi Black Soap',
      fr: 'Savon noir Beldi',
      cn: 'Beldi 黑皂',
      ar: 'صابون بلدي الأسود',
    },
    ml: '400g',
    price: '350.000₫',
    desc: {
      vi: 'Xà phòng đen truyền thống từ oliu đen nghiền và eucalyptus. Làm mềm da, loại bỏ tế bào chết cực kỳ hiệu quả. Dùng với kessa để tẩy tốt nhất.',
      en: 'Traditional black soap from crushed black olives and eucalyptus. Softens skin, removes dead cells extremely effectively. Use with kessa for best exfoliation.',
      fr: "Savon noir traditionnel à base d'olives noires broyées et d'eucalyptus. Adoucit la peau, élimine les cellules mortes très efficacement. À utiliser avec le kessa pour une exfoliation optimale.",
      cn: '由碖碎黑橄榄和桉树制成的传统黑皂。软化肌肤，极其有效地去除死皮。配合 kessa 使用可达最佳去角质效果。',
      ar: 'صابون أسود تقليدي من الزيتون الأسود المطحون والأوكالبتوس. يلطف البشرة ويزيل الخلايا الميتة بفعالية عالية. استخدمه مع الكيسة لأفضل تقشير.',
    },
    badge: {
      vi: 'Truyền thống',
      en: 'Traditional',
      fr: 'Traditionnel',
      cn: '传统',
      ar: 'تقليدي',
    },
    color: '#3D3D3D',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
    uses: {
      vi: 'Body · Pre-kessa',
      en: 'Body · Pre-kessa',
      fr: 'Corps · Avant-kessa',
      cn: '身体 · Kessa 前',
      ar: 'الجسم · قبل الكيسة',
    },
  },
  {
    name: {
      vi: 'Đất Sét Rhassoul Atlas',
      en: 'Atlas Rhassoul Clay',
      fr: "Argile Rhassoul de l'Atlas",
      cn: '阿特拉斯 Rhassoul 矿泥',
      ar: 'طين الغاسول الأطلسي',
    },
    ml: '200g',
    price: '420.000₫',
    desc: {
      vi: 'Khai thác từ độ sâu 400m trong mỏ duy nhất ở Atlas. Giàu silica, magnesium, iron. Hút độc tố vượt trội, điều tiết bã nhờn, se khít lỗ chân lông.',
      en: 'Mined from 400m deep in the only deposit in Atlas. Rich in silica, magnesium, iron. Superior toxin absorption, regulates sebum, minimizes pores.',
      fr: "Extraite à 400m de profondeur dans l'unique gisement de l'Atlas. Riche en silice, magnésium et fer. Absorption supérieure des toxines, régule le sébum, resserre les pores.",
      cn: '从阿特拉斯唯一矿脱的 400 米深处开采。富含二氧化硅、镁、铁。卓越的毒素吸附力，调节皮脂，收缩毛孔。',
      ar: 'يُستخرج من عمق 400 متر في المنجم الوحيد في الأطلس. غني بالسيليكا والمغنيسيوم والحديد. امتصاص فائق للسموم، ينظم الدهون، يصغّر المسام.',
    },
    badge: {
      vi: 'Địa chất 360M năm',
      en: '360M year geology',
      fr: 'Géologie de 360M années',
      cn: '3.6 亿年地质',
      ar: 'جيولوجيا 360 مليون سنة',
    },
    color: TERRACOTTA,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    uses: {
      vi: 'Mặt nạ · Tóc · Body',
      en: 'Mask · Hair · Body',
      fr: 'Masque · Cheveux · Corps',
      cn: '面膜 · 头发 · 身体',
      ar: 'قناع · الشعر · الجسم',
    },
  },
  {
    name: {
      vi: 'Nước Hoa Hồng Kelaa',
      en: 'Kelaa Rose Water',
      fr: 'Eau de rose de Kelaa',
      cn: 'Kelaa 玫瑰水',
      ar: 'ماء ورد قلعة',
    },
    ml: '250ml',
    price: '280.000₫',
    desc: {
      vi: "Chưng cất từ hoa hồng Damascena Kelaa M'gouna — lễ hội hoa hồng Morocco mỗi tháng 5. Dùng toner sau khi tắm Hammam để khóa độ ẩm và dịu da.",
      en: "Distilled from Damascena Kelaa M'gouna roses — Morocco's rose festival every May. Use as toner after Hammam bath to lock moisture and soothe skin.",
      fr: "Distillée à partir des roses Damascena de Kelaa M'gouna — le festival des roses du Maroc chaque mai. À utiliser comme tonique après le bain de Hammam pour fixer l'hydratation et apaiser la peau.",
      cn: "萸取自 Kelaa M'gouna 大马士革玫瑰——摩洛哥每年五月的玫瑰节。Hammam 浴后用作肤水，锁住水分并舒缓肌肤。",
      ar: 'مقطر من ورود الدمشقي من قلعة مقونة — مهرجان الورد في المغرب كل مايو. استخدمه كتونر بعد حمام الحمام لحبس الرطوبة وتهدئة البشرة.',
    },
    badge: {
      vi: 'Đặc sản Kelaa',
      en: 'Kelaa specialty',
      fr: 'Spécialité de Kelaa',
      cn: 'Kelaa 特产',
      ar: 'منتج قلعة المميز',
    },
    color: COBALT,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
    uses: {
      vi: 'Toner · Xịt khoáng · Dưỡng da',
      en: 'Toner · Mist · Skincare',
      fr: 'Tonique · Brume · Soin',
      cn: '肤水 · 喷雾 · 护肤',
      ar: 'تونر · بخاخ · العناية بالبشرة',
    },
  },
];

export function Spa11Products() {
  const { currentLang } = useTranslate('spa11');
  const lang = currentLang.value as Spa11Lang;

  return (
    <Box
      component="section"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: CREAM_WARM, overflow: 'hidden' }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 9 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TERRACOTTA, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Bring Morocco home',
                    vi: 'Mang Morocco về nhà',
                    fr: 'Ramenez le Maroc chez vous',
                    cn: '把摩洛哥带回家',
                    ar: 'أحضر المغرب إلى منزلك',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 900, maxWidth: 440, mx: 'auto' }}>
              {
                (
                  {
                    en: 'Authentic ',
                    vi: 'Sản phẩm ',
                    fr: 'Produits ',
                    cn: '正宗 ',
                    ar: 'منتجات ',
                  } as const
                )[lang]
              }
              <Box component="span" sx={{ color: TERRACOTTA }}>
                {
                  (
                    {
                      en: 'Moroccan products',
                      vi: 'thuần Morocco',
                      fr: 'marocains authentiques',
                      cn: '摩洛哥产品',
                      ar: 'مغربية أصيلة',
                    } as const
                  )[lang]
                }
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto', lineHeight: 1.85 }}
            >
              {
                (
                  {
                    en: "All products directly imported from artisans and women's cooperatives in Marrakech, Agadir and Atlas — no middlemen.",
                    vi: 'Tất cả sản phẩm được nhập trực tiếp từ nghệ nhân và hợp tác xã phụ nữ tại Marrakech, Agadir và Atlas — không qua trung gian.',
                    fr: "Tous les produits sont importés directement des artisans et des coopératives de femmes de Marrakech, Agadir et l'Atlas — sans intermédiaire.",
                    cn: '所有产品均直接从马拉喀什、Agadir 和阿特拉斯的匠人与妇女合作社进口——无中间商。',
                    ar: 'جميع المنتجات مستوردة مباشرة من الحرفيين وتعاونيات النساء في مراكش وأغادير والأطلس — دون وسطاء.',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {PRODUCTS.map((p, idx) => (
            <Grid key={p.name.en} item xs={12} sm={6} md={3}>
              <Box
                component={m.div}
                variants={varFade({ distance: 40 }).inUp}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    bgcolor: 'white',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: `1px solid ${p.color}18`,
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 24px 60px ${p.color}15`,
                      borderColor: p.color,
                    },
                    '&:hover img': { transform: 'scale(1.06)' },
                  }}
                >
                  <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                    <Box
                      component="img"
                      src={p.image}
                      alt={p.name[lang]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'saturate(0.85)',
                      }}
                    />
                    <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                      <Chip
                        label={p.badge[lang]}
                        size="small"
                        sx={{ bgcolor: p.color, color: 'white', fontWeight: 700, fontSize: 10 }}
                      />
                    </Box>
                  </Box>
                  <Stack spacing={1.5} sx={{ p: 2.5, flexGrow: 1 }}>
                    <Stack spacing={0.5}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: '#1E0C05', fontWeight: 800, lineHeight: 1.3, fontSize: 14 }}
                      >
                        {p.name[lang]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: p.color, fontWeight: 600, fontSize: 11 }}
                      >
                        {p.ml} · {p.uses[lang]}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.65, fontSize: 12, flexGrow: 1 }}
                    >
                      {p.desc[lang]}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" sx={{ color: TERRACOTTA, fontWeight: 900 }}>
                        {p.price}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<Iconify icon="solar:cart-bold-duotone" width={14} />}
                        sx={{
                          bgcolor: `${p.color}12`,
                          color: p.color,
                          fontWeight: 700,
                          fontSize: 11,
                          borderRadius: 2,
                          '&:hover': { bgcolor: p.color, color: 'white' },
                        }}
                      >
                        {
                          (
                            { en: 'Buy', vi: 'Mua', fr: 'Acheter', cn: '购买', ar: 'شراء' } as const
                          )[lang]
                        }
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 5,
            p: 3.5,
            borderRadius: 4,
            bgcolor: `${TERRACOTTA}08`,
            border: `1px solid ${TERRACOTTA}20`,
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify
                icon="solar:verified-check-bold-duotone"
                width={20}
                sx={{ color: ARGAN_GOLD }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {
                  (
                    {
                      en: 'Authentically imported from Morocco',
                      vi: 'Nhập khẩu chính hãng từ Morocco',
                      fr: 'Importé authentiquement du Maroc',
                      cn: '正宗进口自摩洛哥',
                      ar: 'مستورد بشكل أصيل من المغرب',
                    } as const
                  )[lang]
                }
              </Typography>
            </Stack>
            <Box
              sx={{
                width: 1,
                height: 20,
                bgcolor: `${TERRACOTTA}20`,
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify icon="solar:box-bold-duotone" width={20} sx={{ color: ARGAN_GOLD }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {
                  (
                    {
                      en: 'Free shipping from 500,000₫',
                      vi: 'Freeship đơn từ 500.000₫',
                      fr: 'Livraison gratuite dès 500,000₫',
                      cn: '满 500,000₫ 免运费',
                      ar: 'شحن مجاني للطلبات من 500,000₫',
                    } as const
                  )[lang]
                }
              </Typography>
            </Stack>
            <Box
              sx={{
                width: 1,
                height: 20,
                bgcolor: `${TERRACOTTA}20`,
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Iconify icon="solar:refresh-bold-duotone" width={20} sx={{ color: ARGAN_GOLD }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {
                  (
                    {
                      en: '30-day returns',
                      vi: 'Đổi trả 30 ngày',
                      fr: 'Retours sous 30 jours',
                      cn: '30 天退换',
                      ar: 'إرجاع خلال 30 يوماً',
                    } as const
                  )[lang]
                }
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
