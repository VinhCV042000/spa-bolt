import type { Spa11Lang } from 'src/sections/spa11/spa11-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { COBALT, TERRACOTTA, ARGAN_GOLD, CREAM_WARM } from 'src/sections/spa11/spa11-data';

// ----------------------------------------------------------------------

const MASTERS = [
  {
    name: 'Fatima El Fassi',
    title: {
      vi: 'Nghệ nhân Kessa · 22 năm',
      en: 'Kessa Master · 22 years',
      fr: 'Maître Kessa · 22 ans',
      cn: 'Kessa 大师 · 22 年',
      ar: 'خبيرة الكيسة · 22 عاماً',
    },
    origin: {
      vi: 'Fes El-Bali, Maroc',
      en: 'Fes El-Bali, Morocco',
      fr: 'Fès El-Bali, Maroc',
      cn: '非斯老城，摩洛哥',
      ar: 'فاس البالي، المغرب',
    },
    quote: {
      vi: '"Kessa không chỉ là tẩy da — đó là nghệ thuật lắng nghe da thịt. Mỗi vòng xoa là một cuộc giao tiếp giữa tay tôi và làn da của bạn."',
      en: '"Kessa is not just exfoliation — it is the art of listening to the skin. Each circular stroke is a conversation between my hands and your skin."',
      fr: '« Le kessa n’est pas qu’une exfoliation — c’est l’art d’écouter la peau. Chaque mouvement circulaire est une conversation entre mes mains et votre peau. »',
      cn: '“Kessa 不仅仅是去角质——它是倾听肌肤的艺术。每一次画圈都是我的双手与你肌肤的对话。”',
      ar: '"الكيسة ليست مجرد تقشير — إنها فن الإصغاء إلى البشرة. كل حركة دائرية هي حوار بين يديّ وبشرتك."',
    },
    specialty: {
      vi: 'Kessa, Beldi',
      en: 'Kessa, Beldi',
      fr: 'Kessa, Beldi',
      cn: 'Kessa, Beldi',
      ar: 'Kessa, Beldi',
    },
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    color: TERRACOTTA,
  },
  {
    name: 'Hassan Benali',
    title: {
      vi: 'Thầy dầu Argan · 18 năm',
      en: 'Argan Oil Master · 18 years',
      fr: "Maître de l'huile d'argan · 18 ans",
      cn: '阿甘油大师 · 18 年',
      ar: 'خبير زيت أركان · 18 عاماً',
    },
    origin: {
      vi: 'Agadir, Souss-Massa',
      en: 'Agadir, Souss-Massa',
      fr: 'Agadir, Souss-Massa',
      cn: '阿加迪尔，Souss-Massa',
      ar: 'أغادير، سوس ماسة',
    },
    quote: {
      vi: '"Gia đình tôi trồng argan 4 thế hệ. Mỗi chai dầu tôi mang đến đây là 15kg quả argan thu hái bằng tay — tôi biết từng cây trong vườn."',
      en: '"My family has grown argan for 4 generations. Each bottle of oil I bring here is 15kg of hand-harvested argan fruit — I know every tree in the grove."',
      fr: '« Ma famille cultive l’argan depuis 4 générations. Chaque flacon d’huile que j’apporte ici représente 15 kg de fruits d’argan récoltés à la main — je connais chaque arbre du verger. »',
      cn: '“我的家族种植阿甘已四代。我带来的每一瓶油都是 15 公斤手工采收的阿甘果实——我认得果园里的每一棵树。”',
      ar: '"عائلتي تزرع الأركان منذ 4 أجيال. كل زجاجة زيت أحضرها هنا هي 15 كغ من ثمار الأركان المقطوفة يدوياً — أعرف كل شجرة في البستان."',
    },
    specialty: {
      vi: 'Argan, Massage',
      en: 'Argan, Massage',
      fr: 'Argan, Massage',
      cn: 'Argan, Massage',
      ar: 'Argan, Massage',
    },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    color: ARGAN_GOLD,
  },
  {
    name: 'Amina Tazi',
    title: {
      vi: 'Thợ đất Rhassoul · 15 năm',
      en: 'Rhassoul Clay Specialist · 15 years',
      fr: "Spécialiste de l'argile Rhassoul · 15 ans",
      cn: 'Rhassoul 矿泥专家 · 15 年',
      ar: 'أخصائية طين الغاسول · 15 عاماً',
    },
    origin: {
      vi: 'Dãy Atlas, Beni Mellal',
      en: 'Atlas Mountains, Beni Mellal',
      fr: "Montagnes de l'Atlas, Beni Mellal",
      cn: '阿特拉斯山脉，Beni Mellal',
      ar: 'جبال الأطلس، بني ملال',
    },
    quote: {
      vi: '"Đất rhassoul chúng tôi khai thác từ mỏ ở độ cao 2.000m trong dãy Atlas. Nó không phải đất — đó là lịch sử địa chất 360 triệu năm của Trái Đất."',
      en: '"The rhassoul clay we mine comes from a deposit at 2,000m in the Atlas Mountains. It is not mere earth — it is 360 million years of the planet\'s geological history."',
      fr: '« L’argile rhassoul que nous extrayons provient d’un gisement à 2 000 m dans les montagnes de l’Atlas. Ce n’est pas une simple terre — ce sont 360 millions d’années d’histoire géologique de la planète. »',
      cn: '“我们开采的 rhassoul 矿泥来自阿特拉斯山脉海拔 2,000 米的矿藏。它不是普通的泥土——而是地球 3.6 亿年的地质历史。”',
      ar: '"طين الغاسول الذي نستخرجه يأتي من منجم على ارتفاع 2000 متر في جبال الأطلس. إنه ليس مجرد تراب — بل هو 360 مليون عام من التاريخ الجيولوجي للكوكب."',
    },
    specialty: {
      vi: 'Rhassoul, Wrap',
      en: 'Rhassoul, Wrap',
      fr: 'Rhassoul, Wrap',
      cn: 'Rhassoul, Wrap',
      ar: 'Rhassoul, Wrap',
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    color: COBALT,
  },
];

const TESTIMONIALS = [
  {
    quote: {
      vi: '"Fatima kessa tôi — lớp da chết bong ra như giấy. Lần đầu tiên trong đời tôi thấy da mình thực sự sạch là gì."',
      en: '"Fatima kessa\'d me — dead skin peeled away like paper. For the first time in my life I understood what truly clean skin feels like."',
      fr: '« Fatima m’a fait le kessa — la peau morte se détachait comme du papier. Pour la première fois de ma vie, j’ai compris ce qu’est une peau vraiment propre. »',
      cn: '“Fatima 为我做了 kessa——死皮像纸一样剥落。这是我这辈子第一次明白什么是真正干净的肌肤。”',
      ar: '"فاطمة قامت بتقشيري — تقشّر الجلد الميت كالورق. لأول مرة في حياتي أدركت معنى البشرة النظيفة حقاً."',
    },
    author: 'Nguyễn Hà Linh',
    role: {
      vi: 'Marketing Director · 33 tuổi',
      en: 'Marketing Director · 33 years old',
      fr: 'Directrice marketing · 33 ans',
      cn: '市场总监 · 33 岁',
      ar: 'مديرة تسويق · 33 عاماً',
    },
    color: TERRACOTTA,
  },
  {
    quote: {
      vi: '"Dầu argan của Hassan — tôi không cần kem dưỡng ẩm suốt 3 ngày sau. Da mềm hơn bất kỳ sản phẩm luxury nào tôi đã dùng."',
      en: "\"Hassan's argan oil — I didn't need moisturiser for 3 days after. Softer than any luxury product I've ever used.\"",
      fr: '« L’huile d’argan de Hassan — je n’ai pas eu besoin de crème hydratante pendant 3 jours. Plus douce que n’importe quel produit de luxe que j’ai utilisé. »',
      cn: '“Hassan 的阿甘油——之后三天我都不需要保湿震。比我用过的任何奥华产品都要柔滑。”',
      ar: '"زيت أركان من حسن — لم أحتج إلى مرطب لمدة 3 أيام بعده. أنعم من أي منتج فاخر استخدمته على الإطلاق."',
    },
    author: 'Trần Bảo Châu',
    role: {
      vi: 'Luật sư · 41 tuổi',
      en: 'Lawyer · 41 years old',
      fr: 'Avocate · 41 ans',
      cn: '律师 · 41 岁',
      ar: 'محامية · 41 عاماً',
    },
    color: ARGAN_GOLD,
  },
];

export function Spa11Masters() {
  const { currentLang } = useTranslate('spa11');
  const lang = currentLang.value as Spa11Lang;

  return (
    <>
      {/* Masters section */}
      <Box
        component="section"
        sx={{ py: { xs: 8, md: 14 }, bgcolor: CREAM_WARM, overflow: 'hidden' }}
      >
        <Container component={MotionViewport} maxWidth="lg">
          <Stack
            spacing={2}
            alignItems="center"
            sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}
          >
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="overline"
                sx={{ color: TERRACOTTA, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
              >
                {
                  (
                    {
                      en: 'Traditional artisans',
                      vi: 'Nghệ nhân truyền thống',
                      fr: 'Artisans traditionnels',
                      cn: '传统匠人',
                      ar: 'حرفيون تقليديون',
                    } as const
                  )[lang]
                }
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, maxWidth: 460, mx: 'auto', lineHeight: 1.1 }}
              >
                {
                  (
                    {
                      en: 'The hands ',
                      vi: 'Những bàn tay ',
                      fr: 'Les mains ',
                      cn: '双手 ',
                      ar: 'الأيادي ',
                    } as const
                  )[lang]
                }
                <Box component="span" sx={{ color: TERRACOTTA }}>
                  {
                    (
                      {
                        en: 'preserving heritage',
                        vi: 'giữ gìn di sản',
                        fr: 'qui préservent le patrimoine',
                        cn: '守护传承',
                        ar: 'التي تحفظ التراث',
                      } as const
                    )[lang]
                  }
                </Box>
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', maxWidth: 540, mx: 'auto', lineHeight: 1.85 }}
              >
                {
                  (
                    {
                      en: 'Each of our artisans is the keeper of a specific Moroccan tradition — learned from parents, passed to children, with no manual.',
                      vi: 'Mỗi nghệ nhân của chúng tôi là người giữ lửa của một truyền thống Morocco cụ thể — học từ cha mẹ, truyền cho con cái, không có sách hướng dẫn nào.',
                      fr: "Chacun de nos artisans est le gardien d'une tradition marocaine spécifique — apprise des parents, transmise aux enfants, sans aucun manuel.",
                      cn: '我们的每位匠人都是某项特定摩洛哥传统的守护者——从父母那里学习，传给子女，没有任何手册。',
                      ar: 'كل حرفي من حرفيينا هو حارس لتقليد مغربي محدد — تعلّمه من الوالدين، ونقله للأبناء، دون أي دليل.',
                    } as const
                  )[lang]
                }
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3}>
            {MASTERS.map((master, idx) => (
              <Grid key={master.name} item xs={12} md={4}>
                <Box
                  component={m.div}
                  variants={varFade({ distance: idx % 2 === 0 ? -40 : 40, axis: 'x' }).in}
                >
                  <Box
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      bgcolor: 'white',
                      border: `1px solid ${master.color}18`,
                      transition: 'all 0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: master.color,
                        boxShadow: `0 32px 80px ${master.color}15`,
                      },
                      '&:hover .master-img': { transform: 'scale(1.06)' },
                    }}
                  >
                    {/* Photo */}
                    <Box sx={{ height: 260, overflow: 'hidden', position: 'relative' }}>
                      <Box
                        className="master-img"
                        component="img"
                        src={master.image}
                        alt={master.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          transition: 'transform 0.5s ease',
                          filter: 'brightness(0.85) saturate(0.9)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: `linear-gradient(to top, rgba(18,8,4,0.6) 0%, transparent 55%)`,
                        }}
                      />
                      {/* Origin badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 14,
                          left: 14,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          bgcolor: 'rgba(0,0,0,0.5)',
                          backdropFilter: 'blur(6px)',
                        }}
                      >
                        <Stack direction="row" spacing={0.75} alignItems="center">
                          <Iconify
                            icon="solar:map-point-bold-duotone"
                            width={12}
                            sx={{ color: master.color }}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: CREAM_WARM, fontWeight: 600, fontSize: 11 }}
                          >
                            {master.origin[lang]}
                          </Typography>
                        </Stack>
                      </Box>
                      {/* Specialty chip */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 14,
                          right: 14,
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          bgcolor: master.color,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: CREAM_WARM, fontWeight: 700, fontSize: 10 }}
                        >
                          {master.specialty[lang]}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3 }}>
                      <Stack spacing={1.75}>
                        <Stack spacing={0.25}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: '#1E0C05', lineHeight: 1.2 }}
                          >
                            {master.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: master.color, fontWeight: 700, fontSize: 12 }}
                          >
                            {master.title[lang]}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.75,
                            fontStyle: 'italic',
                            fontSize: 13,
                          }}
                        >
                          {master.quote[lang]}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Bottom accent */}
                    <Box sx={{ height: 3, bgcolor: master.color }} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials strip */}
      <Box
        component="section"
        sx={{
          py: { xs: 7, md: 10 },
          bgcolor: '#1E0C05',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Big Arabic char bg */}
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 500,
            fontWeight: 900,
            color: 'rgba(212,160,23,0.03)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: -20,
          }}
        >
          ح
        </Typography>

        <Container component={MotionViewport} maxWidth="lg">
          <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 7 }, textAlign: 'center' }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography
                variant="overline"
                sx={{ color: ARGAN_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
              >
                {
                  (
                    {
                      en: 'What guests say',
                      vi: 'Khách hàng nói gì',
                      fr: 'Ce que disent nos clients',
                      cn: '客人怎么说',
                      ar: 'ماذا يقول الضيوف',
                    } as const
                  )[lang]
                }
              </Typography>
            </Box>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: CREAM_WARM }}>
                {
                  (
                    {
                      en: 'Real experiences',
                      vi: 'Trải nghiệm thực',
                      fr: 'Expériences réelles',
                      cn: '真实体验',
                      ar: 'تجارب حقيقية',
                    } as const
                  )[lang]
                }
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={3}>
            {TESTIMONIALS.map((t) => (
              <Grid key={t.author} item xs={12} md={6}>
                <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                  <Box
                    sx={{
                      p: { xs: 3.5, md: 4.5 },
                      borderRadius: 4,
                      bgcolor: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${t.color}20`,
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: t.color,
                        bgcolor: `${t.color}05`,
                      },
                    }}
                  >
                    {/* Opening quote */}
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 20,
                        fontSize: 64,
                        fontWeight: 900,
                        color: t.color,
                        opacity: 0.18,
                        lineHeight: 1,
                      }}
                    >
                      &quot;
                    </Typography>
                    <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'rgba(253,243,227,0.7)',
                          lineHeight: 1.85,
                          fontStyle: 'italic',
                          fontSize: 15,
                          pt: 1,
                        }}
                      >
                        {t.quote[lang]}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            bgcolor: t.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: '#1E0C05', fontWeight: 800, fontSize: 13 }}
                          >
                            {t.author
                              .split(' ')
                              .map((w) => w[0])
                              .join('')
                              .slice(0, 2)}
                          </Typography>
                        </Box>
                        <Stack spacing={0.25}>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: CREAM_WARM, fontWeight: 800 }}
                          >
                            {t.author}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgba(253,243,227,0.4)', fontSize: 12 }}
                          >
                            {t.role[lang]}
                          </Typography>
                        </Stack>
                        {/* Stars */}
                        <Stack direction="row" spacing={0.3} sx={{ ml: 'auto' }}>
                          {[...Array(5)].map((_, i) => (
                            <Iconify
                              key={i}
                              icon="solar:star-bold-duotone"
                              width={14}
                              sx={{ color: ARGAN_GOLD }}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Final CTA */}
          <Box
            component={m.div}
            variants={varFade({ distance: 20 }).inUp}
            sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}
          >
            <Stack spacing={1.5} alignItems="center">
              <Typography
                sx={{ fontSize: 28, letterSpacing: 8, color: TERRACOTTA, fontWeight: 300 }}
              >
                بسم الله
              </Typography>
              <Button
                size="large"
                startIcon={<Iconify icon="solar:bath-bold-duotone" />}
                sx={{
                  bgcolor: TERRACOTTA,
                  color: CREAM_WARM,
                  borderRadius: 3,
                  px: 5,
                  py: 2,
                  fontWeight: 900,
                  fontSize: 16,
                  '&:hover': { bgcolor: '#A33D24' },
                }}
              >
                {
                  (
                    {
                      en: 'Book Hammam now',
                      vi: 'Đặt Hammam ngay',
                      fr: 'Réservez le Hammam maintenant',
                      cn: '立即预订 Hammam',
                      ar: 'احجز الحمام الآن',
                    } as const
                  )[lang]
                }
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
}
