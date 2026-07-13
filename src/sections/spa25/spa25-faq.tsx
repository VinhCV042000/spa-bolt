import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  NEON_DARK,
  NEON_PINK,
  NEON_CYAN,
  NEON_GRAY,
  SPA25_FAQ,
  NEON_BLACK,
  NEON_WHITE,
} from 'src/sections/spa25/spa25-data';

export function Spa25Faq() {
  const { t } = useTranslate('spa25');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: NEON_BLACK,
      }}
    >
      <Container component={MotionViewport} maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade({ distance: 30 }).inUp}>
            <Typography
              sx={{
                color: NEON_CYAN,
                letterSpacing: 6,
                fontSize: 11,
                fontWeight: 600,
                mb: 2,
              }}
            >
              {t('faq.eyebrow')}
            </Typography>
          </m.div>
          <m.div variants={varFade({ distance: 40 }).inUp}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 32, md: 48 },
                fontWeight: 200,
                color: NEON_WHITE,
                fontFamily: '"Orbitron", "Inter", sans-serif',
              }}
            >
              {t('faq.title')}
              <Box
                component="span"
                sx={{
                  color: NEON_PINK,
                  fontWeight: 700,
                  textShadow: `0 0 30px ${NEON_PINK}60`,
                }}
              >
                {' '}
                {t('faq.titleAccent')}
              </Box>
            </Typography>
          </m.div>
        </Box>

        {/* FAQ Items */}
        <Stack spacing={2}>
          {SPA25_FAQ.map((item, index) => (
            <m.div key={item.q} variants={varFade({ distance: 30 }).inUp}>
              <Box
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                sx={{
                  p: 3,
                  background: openIndex === index ? NEON_DARK : 'transparent',
                  border: `1px solid ${openIndex === index ? NEON_CYAN : NEON_CYAN}30`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: NEON_CYAN,
                  },
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography
                    sx={{
                      color: NEON_WHITE,
                      fontSize: 15,
                      fontWeight: 500,
                      pr: 2,
                      fontFamily: '"Orbitron", sans-serif',
                    }}
                  >
                    {item.q}
                  </Typography>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${NEON_PINK}`,
                      color: NEON_PINK,
                      transition: 'all 0.3s ease',
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <Iconify icon="solar:add-linear" sx={{ fontSize: 18 }} />
                  </Box>
                </Stack>

                <AnimatePresence>
                  {openIndex === index && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <Box
                        sx={{
                          pt: 2,
                          mt: 2,
                          borderTop: `1px solid ${NEON_CYAN}20`,
                        }}
                      >
                        <Typography sx={{ color: NEON_GRAY, fontSize: 14, lineHeight: 1.8 }}>
                          {item.a}
                        </Typography>
                      </Box>
                    </m.div>
                  )}
                </AnimatePresence>
              </Box>
            </m.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
