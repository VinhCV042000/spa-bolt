import type { Spa13Lang } from 'src/sections/spa13/spa13-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { CLAY, FLAME, FRESH, JUNGLE, TROP_GOLD } from 'src/sections/spa13/spa13-data';

// ----------------------------------------------------------------------

const JOURNEY_STEPS = [
  {
    icon: 'solar:leaf-bold-duotone',
    title: {
      vi: 'Khởi đầu',
      en: 'Beginning',
      fr: 'Début',
      cn: '起点',
      ar: 'البداية',
    },
    subtitle: {
      vi: 'Đón tiếp & Thư giãn',
      en: 'Welcome & Relax',
      fr: 'Accueil & Détente',
      cn: '欢迎与放松',
      ar: 'الترحيب والاسترخاء',
    },
    desc: {
      vi: 'Trà Amazon chào đón — hỗn hợp cacao, quế và guarana. Nhạc rừng già phát nhẹ, hương thảo mộc lan toả.',
      en: 'Welcome Amazon tea — blend of cacao, cinnamon and guarana. Soft rainforest sounds, herbal aromas filling the air.',
      fr: "Thé Amazonie de bienvenue — mélange de cacao, cannelle et guarana. Sons doux de la forêt tropicale, arômes d'herbes emplissant l'air.",
      cn: '欢迎亚马逊茶——可可、肉桂和瓜拉纳混合。轻柔的雨林音响，草本香气弥漫。',
      ar: 'شاي الأمازون الترحيبي — مزيج من الكاكاو والقرفة والغوارانا. أصوات الغابة المطيرة الهادئة، روائح عشبية تملأ الجو.',
    },
    color: TROP_GOLD,
  },
  {
    icon: 'solar:shower-bold-duotone',
    title: {
      vi: 'Tẩy tế bào',
      en: 'Exfoliation',
      fr: 'Exfoliation',
      cn: '去角质',
      ar: 'تقشير',
    },
    subtitle: {
      vi: 'Açaí Glow Scrub',
      en: 'Açaí Glow Scrub',
      fr: 'Açaí Glow Scrub',
      cn: '阿萨伊焕采磨砂',
      ar: 'تقشير الأساي المضيء',
    },
    desc: {
      vi: 'Bột açaí trộn với dầu dừa và muối biển tẩy tế bào chết. Massage nhẹ nhàng, loại bỏ lớp sừng già, da sáng mịn.',
      en: 'Açaí powder mixed with coconut oil and sea salt exfoliates dead cells. Gentle massage, removing aged layers, skin glowing smooth.',
      fr: "La poudre d'açaí mélangée à l'huile de coco et au sel marin exfolie les cellules mortes. Massage doux, éliminant les couches agées, peau lisse et brillante.",
      cn: '阿萨伊粉混合椰子油和海盐去除死皮。轻柔按摩，去除老化角质，肌肤光滑焕亮。',
      ar: 'مسحوق الأساي الممزوج بزيت جوز الهند وملح البحر يُزيل الخلايا الميتة. تدليك لطيف، إزالة الطبقات القديمة، بشرة ناعمة ومشرقة.',
    },
    color: FLAME,
  },
  {
    icon: 'solar:health-bold-duotone',
    title: {
      vi: 'Liệu trình chính',
      en: 'Main Treatment',
      fr: 'Traitement principal',
      cn: '主要疗程',
      ar: 'العلاج الرئيسي',
    },
    subtitle: {
      vi: 'Andiroba Deep Massage',
      en: 'Andiroba Deep Massage',
      fr: 'Massage profond Andiroba',
      cn: '安迪罗巴深层按摩',
      ar: 'تدليك الأنديروبا العميق',
    },
    desc: {
      vi: 'Dầu andiroba nguyên chất từ Kayapó thấm sâu qua da. Massage 90 phút giảm viêm, phục hồi cơ, thư giãn toàn thân.',
      en: 'Pure andiroba oil from Kayapó penetrates deep through skin. 90-minute massage reduces inflammation, restores muscles, full body relaxation.',
      fr: "L'huile d'andiroba pure du peuple Kayapó pénètre profondément la peau. Massage de 90 minutes réduit l'inflammation, restaure les muscles, relaxation complète.",
      cn: '来自卡雅波人的纯安迪罗巴油深层渗透皮肤。90分钟按摩减轻炎症、修复肌肉、全身放松。',
      ar: 'زيت الأنديروبا النقي من الكايابو يتغلغل عميقًا عبر البشرة. تدليك 90 دقيقة يقلل الالتهاب، يستعيد العضلات، استرخاء كامل للجسم.',
    },
    color: JUNGLE,
  },
  {
    icon: 'solar:bath-bold-duotone',
    title: {
      vi: 'Đắp bùn',
      en: 'Clay Wrap',
      fr: "Enveloppement d'argile",
      cn: '黏土裹敷',
      ar: 'لف الطين',
    },
    subtitle: {
      vi: 'Argila Detox Body Mask',
      en: 'Argila Detox Body Mask',
      fr: 'Masque corporel Argila Detox',
      cn: '白黏土排毒体膜',
      ar: 'قناع الجسم المُزيل للسموم أرغيلا',
    },
    desc: {
      vi: 'Đất sét trắng Amazon từ lòng sông — khoáng chất nguyên sơ. Đắp 20 phút hút độc tố qua da, cân bằng pH.',
      en: 'White Amazon clay from the riverbed — pristine minerals. 20-minute wrap draws toxins through skin, balances pH.',
      fr: 'Argile blanche amazonienne du lit du fleuve — minéraux pristine. Enveloppement de 20 minutes attire les toxines à travers la peau, équilibre le pH.',
      cn: '来自河床的亚马逊白黏土——纯净矿物。20分钟裹敷通过皮肤吸出毒素，平衡pH。',
      ar: 'الطين الأبيض الأمازوني من قاع النهر — معادن نقية. لفّة 20 دقيقة تسحب السموم عبر البشرة، توازن درجة الحموضة.',
    },
    color: CLAY,
  },
  {
    icon: 'solar:cup-hot-bold-duotone',
    title: {
      vi: 'Kết thúc',
      en: 'Completion',
      fr: 'Conclusion',
      cn: '结束',
      ar: 'الختام',
    },
    subtitle: {
      vi: 'Trà cacao thảo mộc',
      en: 'Herbal cacao tea',
      fr: 'Thé cacao aux herbes',
      cn: '草本可可茶',
      ar: 'شاي الكاكاو العشبي',
    },
    desc: {
      vi: 'Trà cacao nóng, quế, hồi và thảo quả. Ngồi trong khu vườn nhiệt đới, hít thở không khí rừng già, cảm nhận sự tái sinh.',
      en: 'Hot cacao tea with cinnamon, star anise and cardamom. Sit in the tropical garden, breathe rainforest air, feel reborn.',
      fr: "Thé cacao chaud, cannelle, anis étoilé et cardamome. Asseyez-vous dans le jardin tropical, respirez l'air de la forêt, sentez-vous renaître.",
      cn: '热可可茶，加入肉桂、八角和豆蔻。坐在热带花园中，呼吸雨林空气，感受重生。',
      ar: 'شاي كاكاو ساخن مع قرفة وبادوان وحبهان. اجلس في الحديقة الاستوائية، تنفس هواء الغابة، شعر بالتجدد.',
    },
    color: TROP_GOLD,
  },
];

// ----------------------------------------------------------------------

export function Spa13Journey() {
  const { currentLang } = useTranslate('spa13');
  const lang = currentLang.value as Spa13Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#082A18' }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TROP_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {
                {
                  vi: 'HÀNH TRÌNH RỪNG GIÀ',
                  en: 'RAINFOREST JOURNEY',
                  fr: 'VOYAGE EN FORÊT',
                  cn: '雨林旅程',
                  ar: 'رحلة الغابة المطيرة',
                }[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: FRESH,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              {
                {
                  vi: 'Thử một lần,',
                  en: 'Just once,',
                  fr: 'Juste une fois,',
                  cn: '只需一次，',
                  ar: 'مرة واحدة فقط،',
                }[lang]
              }{' '}
              <Box component="span" sx={{ color: TROP_GOLD }}>
                {
                  {
                    vi: 'kết nối với thiên nhiên nguyên bản',
                    en: 'connect with ancient nature',
                    fr: 'connectez-vous à la nature ancienne',
                    cn: '与古老自然连接',
                    ar: 'تواصل مع الطبيعة الأصيلة',
                  }[lang]
                }
              </Box>
            </Typography>
          </Box>
        </Stack>

        {/* Journey Steps */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(5,1fr)' },
            gap: { xs: 3, md: 2 },
            position: 'relative',
          }}
        >
          {/* Horizontal connector */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 40,
              left: '10%',
              right: '10%',
              height: '2px',
              background: `linear-gradient(90deg, ${TROP_GOLD}40 0%, ${FLAME}40 50%, ${TROP_GOLD}40 100%)`,
            }}
          />

          {JOURNEY_STEPS.map((step, index) => (
            <Box
              key={step.title.en}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                position: 'relative',
                textAlign: 'center',
              }}
            >
              {/* Step circle */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3,
                  borderRadius: '50%',
                  bgcolor: 'rgba(0,0,0,0.3)',
                  border: `2px solid ${step.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: `0 0 30px ${step.color}30`,
                }}
              >
                <Iconify icon={step.icon} width={32} sx={{ color: step.color }} />
              </Box>

              {/* Content */}
              <Typography
                variant="caption"
                sx={{ color: step.color, letterSpacing: 2, fontWeight: 700 }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h6" sx={{ color: FRESH, fontWeight: 900, mt: 0.5 }}>
                {step.title[lang]}
              </Typography>
              <Typography variant="body2" sx={{ color: step.color, fontWeight: 600, mt: 0.5 }}>
                {step.subtitle[lang]}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(240,255,244,0.5)',
                  display: 'block',
                  mt: 1,
                  lineHeight: 1.7,
                }}
              >
                {step.desc[lang]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
