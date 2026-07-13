import type { Spa14Lang } from 'src/sections/spa14/spa14-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { GARNET, EMERALD, ANTIQUE_GOLD, IMPERIAL_CREAM } from 'src/sections/spa14/spa14-data';

// ----------------------------------------------------------------------

const SISI_RITUALS = [
  {
    icon: 'solar:bath-bold-duotone',
    name: {
      vi: 'Tắm sữa hoàng gia',
      en: 'Royal milk bath',
      fr: 'Bain de lait royal',
      cn: '皇室牛奶浴',
      ar: 'حمام الحليب الملكي',
    },
    desc: {
      vi: 'Sisi nổi tiếng với làn da hoàn hảo nhờ tắm sữa tươi mỗi sáng. Chúng tôi tái hiện với sữa dê tươi nguyên chất và mật ong hoàng gia.',
      en: 'Sisi was renowned for flawless skin thanks to fresh milk baths each morning. We recreate with pure fresh goat milk and royal honey.',
      fr: 'Sissi était réputée pour sa peau parfaite grâce aux bains de lait frais chaque matin. Nous recréons avec du lait de chèvre frais pur et du miel royal.',
      cn: '茜茜以每天早晨的新鲜牛奶浴拥有完美肌肤而闻名。我们用纯新鲜山羊奶和皇家蜂蜜重现。',
      ar: 'اشتهرت سيسي ببشرتها المثالية بفضل حمامات الحليب الطازج كل صباح. نعيد إحياء ذلك بحليب الماعز الطازج النقي والعسل الملكي.',
    },
    duration: '30 min',
    color: IMPERIAL_CREAM,
  },
  {
    icon: 'solar:egg-bold-duotone',
    name: {
      vi: 'Mặt nạ trứng cút',
      en: 'Quail egg mask',
      fr: 'Masque aux œufs de caille',
      cn: '鹌鹑蛋面膜',
      ar: 'قناع بيض السمان',
    },
    desc: {
      vi: 'Trứng cút Áo giàu protein và vitamin B. Trộn với dầu oliu và mật ong tạo mặt nạ nuôi da sâu, da mềm mịn như nhung.',
      en: 'Austrian quail eggs rich in protein and vitamin B. Mixed with olive oil and honey creates deep nourishing mask, skin soft as velvet.',
      fr: "Les œufs de caille autrichiens riches en protéines et vitamine B. Mélangés à l'huile d'olive et au miel, ils créent un masque nourrissant profond, peau douce comme du velours.",
      cn: '奥地利鹌鹑蛋富含蛋白质和维生素B。与橄榄油和蜂蜜混合，制作深层滋养面膜，肌肤柔软如丝绒。',
      ar: 'بيض السمان النمساوي الغني بالبروتين وفيتامين ب. ممزوج بزيت الزيتون والعسل يُنشئ قناعًا مغذيًا عميقًا، بشرة ناعمة كالمخمل.',
    },
    duration: '20 min',
    color: ANTIQUE_GOLD,
  },
  {
    icon: 'solar:flower-bold-duotone',
    name: {
      vi: 'Dầu hoa hồng Bulgaria',
      en: 'Bulgarian rose oil',
      fr: 'Huile de rose bulgare',
      cn: '保加利亚玫瑰油',
      ar: 'زيت الورد البلغاري',
    },
    desc: {
      vi: 'Dầu hoa hồng Rosa damascena từ thung lũng Kazanlak — 3.500 kg cánh hoa để chiết xuất 1 kg tinh dầu. Mùi hương thanh khiết, da rạng rỡ.',
      en: 'Rosa damascena rose oil from Kazanlak Valley — 3,500 kg petals to extract 1 kg essential oil. Pure fragrance, glowing skin.',
      fr: "Huile de rose Rosa damascena de la vallée de Kazanlak — 3 500 kg de pétales pour extraire 1 kg d'huile essentielle. Parfum pur, peau lumineuse.",
      cn: '来自卡赞勒克谷的大马士革玫瑰油——3500公斤花瓣提取1公斤精油。纯净芳香，肌肤焕发光彩。',
      ar: 'زيت ورد روزا داماسينا من وادي كازانلاك — 3500 كجم بتلات لاستخراج 1 كجم زيت عطري. عطر نقي، بشرة مشرقة.',
    },
    duration: '15 min',
    color: GARNET,
  },
  {
    icon: 'solar:health-bold-duotone',
    name: {
      vi: 'Massage nhẹ nhàng Hofburg',
      en: 'Gentle Hofburg massage',
      fr: 'Massage doux Hofburg',
      cn: '霍夫堡轻柔按摩',
      ar: 'تدليك هوفبورغ اللطيف',
    },
    desc: {
      vi: 'Kỹ thuật effleurage nhẹ nhàng mà Sisi ưa thích — vuốt ve da theo hướng tim, thư giãn thần kinh, ngủ sâu sau buổi.',
      en: 'Gentle effleurage technique Sisi favored — skin strokes toward heart, nerve relaxation, deep sleep after session.',
      fr: "Technique d'effleurage douce que Sissi préférait — caresses de la peau vers le cœur, relaxation nerveuse, sommeil profond après la séance.",
      cn: '茜茜钟爱的轻抚按摩手法——向心脏方向轻抚肌肤、神经放松、疗程后深度睡眠。',
      ar: 'تقنية التمسيد اللطيفة التي فضلتها سيسي — ضربات البشرة نحو القلب، استرخاء الأعصاب، نوم عميق بعد الجلسة.',
    },
    duration: '45 min',
    color: EMERALD,
  },
];

// ----------------------------------------------------------------------

export function Spa14SisiRituals() {
  const { currentLang } = useTranslate('spa14');
  const lang = currentLang.value as Spa14Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0F0808' }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ANTIQUE_GOLD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {
                {
                  vi: 'NGHI LỄ CỦA HOÀNG HẬU',
                  en: "EMPRESS'S RITUALS",
                  fr: "RITUELS DE L'IMPÉRATRICE",
                  cn: '皇后仪式',
                  ar: 'طقوس الإمبراطورة',
                }[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: IMPERIAL_CREAM,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              {
                {
                  vi: 'Bí mật của',
                  en: 'Secrets of',
                  fr: 'Secrets de',
                  cn: '……的秘密',
                  ar: 'أسرار',
                }[lang]
              }{' '}
              <Box component="span" sx={{ color: ANTIQUE_GOLD }}>
                Elizabeth của Áo
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(250,240,230,0.5)',
                maxWidth: 520,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              {
                {
                  vi: 'Hoàng hậu Elisabeth (Sisi) nổi tiếng với vẻ đẹp vượt thời gian. Chúng tôi tái hiện các nghi lễ dưỡng da yêu thích của bà.',
                  en: 'Empress Elisabeth (Sisi) was renowned for her timeless beauty. We recreate her beloved skincare rituals.',
                  fr: "L'impératrice Élisabeth (Sissi) était réputée pour sa beauté intemporelle. Nous recréons ses rituels de soins préférés.",
                  cn: '伊丽莎白皇后（茜茜）以超越时光的美貌闻名。我们重现她钟爱的护肤仪式。',
                  ar: 'اشتهرت الإمبراطورة إليزابيث (سيسي) بجمالها الخالد. نعيد إحياء طقوس العناية بالبشرة المفضلة لديها.',
                }[lang]
              }
            </Typography>
          </Box>
        </Stack>

        {/* Rituals Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' },
            gap: 3,
          }}
        >
          {SISI_RITUALS.map((ritual, index) => (
            <Box
              key={ritual.name.en}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                bgcolor: '#1A0D0D',
                border: `1px solid ${ritual.color}20`,
                transition: 'all 0.35s ease',
                display: 'flex',
                gap: 3,
                '&:hover': {
                  borderColor: ritual.color,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 20px 50px ${ritual.color}10`,
                  '& .ritual-icon': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              {/* Icon */}
              <Box
                className="ritual-icon"
                sx={{
                  width: 64,
                  height: 64,
                  flexShrink: 0,
                  borderRadius: '50%',
                  bgcolor: `${ritual.color}15`,
                  border: `1px solid ${ritual.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.4s ease',
                }}
              >
                <Iconify icon={ritual.icon} width={28} sx={{ color: ritual.color }} />
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" sx={{ color: IMPERIAL_CREAM, fontWeight: 900 }}>
                    {ritual.name[lang]}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: ritual.color, fontFamily: 'monospace', fontWeight: 700 }}
                  >
                    {ritual.duration}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(250,240,230,0.55)', mt: 1, lineHeight: 1.85 }}
                >
                  {ritual.desc[lang]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom quote */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: { xs: 6, md: 10 },
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            bgcolor: '#2A1515',
            border: `1px solid ${ANTIQUE_GOLD}20`,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              color: ANTIQUE_GOLD,
              fontFamily: 'serif',
              fontStyle: 'italic',
              fontSize: { xs: 18, md: 22 },
              lineHeight: 1.7,
            }}
          >
            {
              {
                vi: '"Tôi muốn được tự do như một con chim, muốn sống cho chính mình, không phải vì người khác khen ngợi."',
                en: '"I want to be free as a bird, to live for myself, not for the praise of others."',
                fr: '"Je veux être libre comme un oiseau, vivre pour moi-même, non pour les louanges des autres."',
                cn: '"我想像鸟儿一样自由，为自己而活，而不是为了他人的赞美。"',
                ar: '"أريد أن أكون حرًا كطير، أعيش لنفسي، لا لمديح الآخرين."',
              }[lang]
            }
          </Typography>
          <Typography
            variant="overline"
            sx={{ color: GARNET, letterSpacing: 2, mt: 2, display: 'block' }}
          >
            — Empress Elisabeth of Austria
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
