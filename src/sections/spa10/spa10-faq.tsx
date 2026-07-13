import type { Spa10Lang } from 'src/sections/spa10/spa10-data';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { ICE, TEAL } from 'src/sections/spa10/spa10-data';

const FAQS = [
  {
    q: {
      vi: 'Tôi chưa bao giờ thử cold plunge. Liệu tôi có chịu được không?',
      en: "I've never tried cold plunge before. Can I handle it?",
      fr: "Je n'ai jamais essayé le bain froid. Vais-je le supporter ?",
      cn: '我从未尝试过冷水浴。我能承受吗？',
      ar: 'لم أجرّب الغطس البارد من قبل. هل أستطيع تحمّله؟',
    },
    a: {
      vi: 'Hoàn toàn có! 95% khách hàng lần đầu đều nghĩ họ không thể — và đều làm được. Hướng dẫn viên của chúng tôi sẽ chuẩn bị bạn bằng kỹ thuật thở Wim Hof trước khi xuống. Nhiệt độ có thể điều chỉnh từ 8°C → 4°C để phù hợp với mức độ của bạn. Cảm giác sau khi bước ra là lý do mọi người quay lại.',
      en: "Absolutely! 95% of first-time guests think they can't — and they all do. Our guide prepares you with Wim Hof breathing techniques before entering. Temperature can be adjusted from 8°C → 4°C to suit your level. The feeling after stepping out is why everyone comes back.",
      fr: "Absolument ! 95 % des nouveaux clients pensent qu'ils n'y arriveront pas — et ils y arrivent tous. Notre guide vous prépare avec les techniques de respiration Wim Hof avant l'entrée. La température peut être ajustée de 8°C → 4°C selon votre niveau. La sensation après en être sorti est la raison pour laquelle tout le monde revient.",
      cn: '当然可以！95% 的初次体验者都以为自己做不到——结果都做到了。我们的向导会在入水前用 Wim Hof 呼吸法帮你做准备。温度可从 8°C 调到 4°C 以适应你的水平。走出来后的感觉正是每个人都会回来的原因。',
      ar: 'بالتأكيد! 95% من الزوار لأول مرة يظنون أنهم لن يستطيعوا — وكلهم ينجحون. يهيّئك مرشدنا بتقنيات تنفّس فيم هوف قبل الدخول. يمكن تعديل الحرارة من 8°C → 4°C لتناسب مستواك. الشعور بعد الخروج هو سبب عودة الجميع.',
    },
  },
  {
    q: {
      vi: 'Tôi có vấn đề tim mạch. Tôi có thể tắm sauna không?',
      en: 'I have cardiovascular issues. Can I use the sauna?',
      fr: "J'ai des problèmes cardiovasculaires. Puis-je utiliser le sauna ?",
      cn: '我有心血管问题。我可以使用桑拿吗？',
      ar: 'لديّ مشاكل في القلب والأوعية الدموية. هل يمكنني استخدام الساونا؟',
    },
    a: {
      vi: 'Vui lòng tư vấn bác sĩ trước. Nói chung, người có bệnh tim kiểm soát tốt có thể dùng sauna nhẹ (70°C, thời gian ngắn) nhưng không nên thực hiện cold plunge đột ngột. Đội ngũ y tế của chúng tôi sẵn sàng tư vấn và điều chỉnh liệu trình phù hợp với tình trạng sức khỏe của bạn.',
      en: 'Please consult your doctor first. Generally, people with well-controlled heart conditions can use gentle sauna (70°C, shorter durations) but should avoid sudden cold plunge. Our medical team is ready to advise and adapt the program to your health condition.',
      fr: "Veuillez d'abord consulter votre médecin. En général, les personnes ayant une maladie cardiaque bien contrôlée peuvent utiliser un sauna doux (70°C, durées plus courtes) mais doivent éviter le bain froid soudain. Notre équipe médicale est prête à vous conseiller et à adapter le programme à votre état de santé.",
      cn: '请先咨询您的医生。一般来说，心脏状况控制良好的人可以使用温和的桑拿（70°C、较短时间），但应避免突然的冷水浴。我们的医疗团队随时为您提供建议，并根据您的健康状况调整疗程。',
      ar: 'يرجى استشارة طبيبك أولاً. بشكل عام، يمكن للأشخاص الذين تخضع حالتهم القلبية لسيطرة جيدة استخدام ساونا لطيفة (70°C، لمدد أقصر) لكن عليهم تجنّب الغطس البارد المفاجئ. فريقنا الطبي جاهز لتقديم المشورة وتكييف البرنامج مع حالتك الصحية.',
    },
  },
  {
    q: {
      vi: 'Phụ nữ có thai có tắm sauna được không?',
      en: 'Can pregnant women use the sauna?',
      fr: 'Les femmes enceintes peuvent-elles utiliser le sauna ?',
      cn: '孕妇可以使用桑拿吗？',
      ar: 'هل يمكن للحامل استخدام الساونا؟',
    },
    a: {
      vi: 'Không khuyến khích sau tuần 12, đặc biệt không dùng cold plunge trong suốt thai kỳ. Chúng tôi có các chương trình prenatal wellness riêng biệt với massage nhẹ nhàng, yoga prenatal và tắm thảo mộc an toàn được thiết kế dành riêng cho mẹ bầu.',
      en: 'Not recommended after week 12, and cold plunge is contraindicated throughout pregnancy. We have separate prenatal wellness programs with gentle massage, prenatal yoga and safe herbal baths specially designed for expectant mothers.',
      fr: 'Déconseillé après la 12e semaine, et le bain froid est contre-indiqué pendant toute la grossesse. Nous proposons des programmes de bien-être prénatal distincts avec massage doux, yoga prénatal et bains aux herbes sûrs, spécialement conçus pour les futures mamans.',
      cn: '怀孕 12 周后不建议使用，且整个孕期都禁止冷水浴。我们设有专门的产前健康项目，包括温和按摩、产前瑜伽和安全的草药浴，专为准妈妈设计。',
      ar: 'غير مُوصى به بعد الأسبوع الثاني عشر، والغطس البارد ممنوع طوال فترة الحمل. لدينا برامج عافية خاصة بما قبل الولادة تشمل التدليك اللطيف ويوغا ما قبل الولادة وحمامات أعشاب آمنة مصممة خصيصاً للأمهات الحوامل.',
    },
  },
  {
    q: {
      vi: 'Nên ăn trước hay sau khi tắm sauna?',
      en: 'Should I eat before or after the sauna?',
      fr: 'Dois-je manger avant ou après le sauna ?',
      cn: '我应该在桑拿前还是桑拿后进食？',
      ar: 'هل يجب أن آكل قبل الساونا أم بعدها؟',
    },
    a: {
      vi: 'Tốt nhất là nhẹ bụng: ăn nhẹ 1-2 tiếng trước. Tránh bữa ăn nặng 3 tiếng trước vì nhiệt độ cao khi no rất khó chịu và làm giảm hiệu quả. Sau liệu trình, cơ thể sẽ đói — đây là lúc tốt nhất để ăn vì khả năng hấp thụ dinh dưỡng tăng 30%.',
      en: 'Best is a light stomach: have a light snack 1-2 hours before. Avoid heavy meals 3 hours prior as high temperature when full is uncomfortable and reduces effectiveness. After the session, your body will be hungry — this is the best time to eat as nutrient absorption increases 30%.',
      fr: "L'idéal est d'avoir l'estomac léger : prenez une collation légère 1 à 2 heures avant. Évitez les repas lourds 3 heures avant, car la chaleur élevée est inconfortable l'estomac plein et réduit l'efficacité. Après la séance, votre corps aura faim — c'est le meilleur moment pour manger car l'absorption des nutriments augmente de 30 %.",
      cn: '最好是空腹轻盈：提前 1-2 小时吃点清淡的小食。提前 3 小时避免大餐，因为饱腹时高温会很不适并降低效果。疗程结束后，身体会感到饥饿——这是最佳进食时机，因为营养吸收会提高 30%。',
      ar: 'الأفضل أن تكون المعدة خفيفة: تناول وجبة خفيفة قبل ساعة إلى ساعتين. تجنّب الوجبات الثقيلة قبل 3 ساعات لأن الحرارة العالية مع امتلاء المعدة غير مريحة وتقلل الفعالية. بعد الجلسة سيشعر جسمك بالجوع — وهذا أفضل وقت للأكل لأن امتصاص العناصر الغذائية يزيد بنسبة 30%.',
    },
  },
  {
    q: {
      vi: 'Liệu trình bao lâu thì thấy kết quả rõ rệt?',
      en: 'How long until I see noticeable results?',
      fr: 'Combien de temps avant de voir des résultats notables ?',
      cn: '多久才能看到明显效果？',
      ar: 'كم من الوقت حتى أرى نتائج ملحوظة؟',
    },
    a: {
      vi: 'Sau buổi đầu tiên: ngủ sâu hơn, tinh thần sảng khoái. Sau 4 buổi (2 tuần): giảm căng thẳng đo được, da sáng hơn. Sau 3 tháng đều đặn: thay đổi thực sự về hệ miễn dịch, hormone và khả năng phục hồi stress. Người Phần Lan coi sauna như vitamin — không phải thuốc — hiệu quả tích lũy theo thời gian.',
      en: 'After the first session: deeper sleep, refreshed spirit. After 4 sessions (2 weeks): measurable stress reduction, brighter skin. After 3 regular months: real changes in immune system, hormones and stress resilience. Finns treat sauna like a vitamin — not medicine — with benefits that accumulate over time.',
      fr: "Après la première séance : sommeil plus profond, esprit revigoré. Après 4 séances (2 semaines) : réduction mesurable du stress, peau plus éclatante. Après 3 mois réguliers : de vrais changements du système immunitaire, des hormones et de la résistance au stress. Les Finlandais considèrent le sauna comme une vitamine — pas un médicament — dont les bienfaits s'accumulent avec le temps.",
      cn: '第一次疗程后：睡眠更深、精神焕发。4 次疗程（2 周）后：压力明显降低、肌肤更亮泽。坚持 3 个月后：免疫系统、激素和抗压能力发生真正的改变。芬兰人把桑拿当作维生素——而非药物——其益处随时间累积。',
      ar: 'بعد الجلسة الأولى: نوم أعمق وروح متجددة. بعد 4 جلسات (أسبوعان): انخفاض ملموس في التوتر وبشرة أكثر إشراقاً. بعد 3 أشهر منتظمة: تغييرات حقيقية في جهاز المناعة والهرمونات ومقاومة التوتر. يعامل الفنلنديون الساونا كفيتامين — لا كدواء — بفوائد تتراكم مع الوقت.',
    },
  },
  {
    q: {
      vi: 'Tôi có cần mang gì theo không?',
      en: 'Do I need to bring anything?',
      fr: 'Dois-je apporter quelque chose ?',
      cn: '我需要带什么东西吗？',
      ar: 'هل أحتاج إلى إحضار أي شيء؟',
    },
    a: {
      vi: 'Không cần mang gì cả — tất cả đã được chuẩn bị: khăn linen hữu cơ, dép birkenstock, áo dài spa, phòng thay đồ riêng tư, két an toàn và cả sản phẩm dưỡng da after-treatment. Chỉ cần mang theo bản thân sẵn sàng để trải nghiệm.',
      en: 'No need to bring anything — everything is prepared: organic linen towels, birkenstock slippers, spa robe, private changing room, safe deposit box and even after-treatment skincare products. Just bring yourself ready to experience.',
      fr: "Inutile d'apporter quoi que ce soit — tout est prévu : serviettes en lin biologique, sandales birkenstock, peignoir de spa, vestiaire privé, coffre-fort et même des produits de soin après-traitement. Venez simplement prêt à vivre l'expérience.",
      cn: '无需携带任何东西——一切都已备好：有机亚麻毛巾、birkenstock 拖鞋、水疗浴袍、私人更衣室、保险箱，甚至还有疗程后的护肤产品。只需带着准备好体验的自己前来即可。',
      ar: 'لا حاجة لإحضار أي شيء — كل شيء مُجهّز: مناشف كتان عضوية، نعال بيركنستوك، رداء سبا، غرفة تبديل خاصة، خزنة آمنة، وحتى منتجات العناية بالبشرة بعد العلاج. فقط أحضر نفسك مستعداً للتجربة.',
    },
  },
];

export function Spa10Faq() {
  const { currentLang } = useTranslate('spa10');
  const lang = currentLang.value as Spa10Lang;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#070F1A', overflow: 'hidden' }}>
      <Container component={MotionViewport} maxWidth="md">
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: TEAL, letterSpacing: 5, fontWeight: 700, fontSize: 11 }}
            >
              {
                (
                  {
                    en: 'Frequently asked questions',
                    vi: 'Câu hỏi thường gặp',
                    fr: 'Questions fréquentes',
                    cn: '常见问题',
                    ar: 'الأسئلة الشائعة',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: ICE, maxWidth: 380, mx: 'auto' }}
            >
              {
                (
                  {
                    en: 'Everything you need to know',
                    vi: 'Mọi điều bạn cần biết',
                    fr: 'Tout ce que vous devez savoir',
                    cn: '你需要知道的一切',
                    ar: 'كل ما تحتاج إلى معرفته',
                  } as const
                )[lang]
              }
            </Typography>
          </Box>
        </Stack>

        <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
          <Stack spacing={1.5}>
            {FAQS.map((faq, idx) => (
              <Box
                key={idx}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${open === idx ? TEAL : 'rgba(255,255,255,0.06)'}`,
                  transition: 'border-color 0.25s ease',
                  bgcolor: open === idx ? 'rgba(0,201,167,0.04)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <Box
                  onClick={() => setOpen(open === idx ? null : idx)}
                  sx={{ p: 3, cursor: 'pointer', userSelect: 'none' }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: open === idx ? ICE : 'rgba(234,249,246,0.7)',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        fontSize: 15,
                      }}
                    >
                      {faq.q[lang]}
                    </Typography>
                    <Box
                      sx={{
                        flexShrink: 0,
                        transform: open === idx ? 'rotate(45deg)' : 'rotate(0)',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      <Iconify
                        icon="solar:add-circle-bold-duotone"
                        width={22}
                        sx={{ color: open === idx ? TEAL : 'rgba(234,249,246,0.3)' }}
                      />
                    </Box>
                  </Stack>
                </Box>
                <AnimatePresence>
                  {open === idx && (
                    <Box
                      component={m.div}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      sx={{ overflow: 'hidden' }}
                    >
                      <Box sx={{ px: 3, pb: 3 }}>
                        <Box
                          sx={{
                            width: '100%',
                            height: '1px',
                            bgcolor: 'rgba(0,201,167,0.1)',
                            mb: 2.5,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(234,249,246,0.55)', lineHeight: 1.85 }}
                        >
                          {faq.a[lang]}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </AnimatePresence>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 6,
            p: 3.5,
            borderRadius: 4,
            bgcolor: 'rgba(0,201,167,0.05)',
            border: '1px solid rgba(0,201,167,0.12)',
            textAlign: 'center',
          }}
        >
          <Stack spacing={1} alignItems="center">
            <Typography variant="body1" sx={{ color: 'rgba(234,249,246,0.6)' }}>
              {
                (
                  {
                    en: 'Have more questions?',
                    vi: 'Còn câu hỏi khác?',
                    fr: 'D’autres questions ?',
                    cn: '还有其他问题？',
                    ar: 'هل لديك المزيد من الأسئلة؟',
                  } as const
                )[lang]
              }
            </Typography>
            <Typography variant="subtitle2" sx={{ color: TEAL, fontWeight: 700 }}>
              {
                (
                  {
                    en: 'Message Zalo/WhatsApp: 0909 123 456',
                    vi: 'Nhắn tin Zalo/WhatsApp: 0909 123 456',
                    fr: 'Message Zalo/WhatsApp : 0909 123 456',
                    cn: '发消息至 Zalo/WhatsApp：0909 123 456',
                    ar: 'راسلنا عبر Zalo/WhatsApp: 0909 123 456',
                  } as const
                )[lang]
              }
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
