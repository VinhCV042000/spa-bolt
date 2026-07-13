import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  NORDIC_GRAY,
  NORDIC_WHITE,
  NORDIC_CREAM,
  NORDIC_STONE,
  NORDIC_BLACK,
  SPA26_PRICING,
} from 'src/sections/spa26/spa26-data';

export function Spa26Pricing() {
  const { t } = useTranslate('spa26');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 20 },
        background: NORDIC_WHITE,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <m.div variants={varFade({ distance: 40 }).inUp}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography
              sx={{
                color: NORDIC_GRAY,
                letterSpacing: 4,
                fontSize: 10,
                fontWeight: 500,
                mb: 2,
              }}
            >
              {t('pricing.eyebrow')}
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 36, md: 48 },
                fontWeight: 300,
                color: NORDIC_BLACK,
                letterSpacing: -1.5,
              }}
            >
              {t('pricing.title')}
            </Typography>
          </Box>
        </m.div>

        {/* Pricing Table - Editorial Style */}
        <m.div variants={varFade({ distance: 40 }).inUp}>
          <Box sx={{ border: `1px solid ${NORDIC_STONE}20` }}>
            {/* Header Row */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '3fr 2fr 2fr' },
                borderBottom: `1px solid ${NORDIC_STONE}20`,
                background: NORDIC_CREAM,
                p: 2,
              }}
            >
              <Typography
                sx={{
                  color: NORDIC_GRAY,
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {t('pricing.columnPackage')}
              </Typography>
              <Typography
                sx={{
                  color: NORDIC_GRAY,
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {t('pricing.columnPrice')}
              </Typography>
              <Typography
                sx={{
                  color: NORDIC_GRAY,
                  fontSize: 10,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {t('pricing.columnNote')}
              </Typography>
            </Box>

            {/* Pricing Rows */}
            {SPA26_PRICING.map((pricing, index) => (
              <Box
                key={pricing.name}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '3fr 2fr 2fr' },
                  borderBottom:
                    index < SPA26_PRICING.length - 1 ? `1px solid ${NORDIC_STONE}15` : 'none',
                  p: { xs: 3, md: 3 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: NORDIC_CREAM,
                  },
                }}
              >
                <Typography
                  sx={{
                    color: NORDIC_BLACK,
                    fontSize: { xs: 16, md: 18 },
                    fontWeight: 400,
                  }}
                >
                  {pricing.name}
                </Typography>
                <Typography
                  sx={{
                    color: NORDIC_BLACK,
                    fontSize: { xs: 14, md: 16 },
                    fontWeight: 300,
                  }}
                >
                  {pricing.range}
                </Typography>
                <Typography
                  sx={{
                    color: NORDIC_GRAY,
                    fontSize: 12,
                    fontStyle: 'italic',
                  }}
                >
                  {pricing.note}
                </Typography>
              </Box>
            ))}
          </Box>
        </m.div>

        {/* Bottom Note */}
        <m.div variants={varFade({ distance: 30 }).inUp}>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography sx={{ color: NORDIC_GRAY, fontSize: 12 }}>{t('pricing.note')}</Typography>
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}
