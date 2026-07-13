import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

type FaqItem = { question: string; answer: string };

export function SpaFaqs({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa');

  const faqs = t('faqs.items', { returnObjects: true }) as FaqItem[];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center', maxWidth: 640, mx: 'auto' }}
        >
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              {t('faqs.eyebrow')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2">
              {t('faqs.titleLead')}
              <Box component="span" sx={{ opacity: 0.4 }}>
                {' '}
                {t('faqs.titleRest')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Box
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          sx={{ maxWidth: 720, mx: 'auto' }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={faq.question}
              defaultExpanded={index === 0}
              sx={{
                bgcolor: 'background.paper',
                '&:before': { display: 'none' },
                '& + &': { mt: 1.5 },
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
