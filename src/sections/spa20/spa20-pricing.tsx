import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import {
  GOLD,
  ROSE_GOLD,
  CHAMPAGNE,
  DEEP_PLUM,
  SPA20_PRICING,
} from 'src/sections/spa20/spa20-data';

export function Spa20Pricing() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${CHAMPAGNE}30 0%, #FFF 100%)`,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            GÓI DỊCH VỤ · PACKAGES
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 400,
              color: DEEP_PLUM,
              lineHeight: 1.2,
            }}
          >
            Chọn gói
            <Box
              component="span"
              sx={{
                background: `linear-gradient(90deg, ${ROSE_GOLD}, ${GOLD})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}
              phù hợp
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {SPA20_PRICING.map((plan) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={plan.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  background: plan.popular ? DEEP_PLUM : '#FFF',
                  borderRadius: 4,
                  border: plan.popular ? `2px solid ${ROSE_GOLD}` : `1px solid ${ROSE_GOLD}20`,
                  boxShadow: plan.popular
                    ? `0 20px 60px ${ROSE_GOLD}30`
                    : `0 4px 20px ${DEEP_PLUM}08`,
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 24px 60px ${ROSE_GOLD}${plan.popular ? '40' : '20'}`,
                  },
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: `linear-gradient(135deg, ${ROSE_GOLD}, ${GOLD})`,
                      color: '#FFF',
                      px: 3,
                      py: 0.75,
                      borderRadius: 5,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1,
                    }}
                  >
                    MOST POPULAR
                  </Box>
                )}

                <Typography
                  sx={{
                    color: plan.popular ? '#FFF' : DEEP_PLUM,
                    fontSize: 24,
                    fontWeight: 500,
                    mb: 1,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {plan.name}
                </Typography>

                <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      color: plan.popular ? ROSE_GOLD : GOLD,
                      fontSize: 36,
                      fontWeight: 600,
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    sx={{
                      color: plan.popular ? 'rgba(255,255,255,0.6)' : '#8A7A8A',
                      fontSize: 14,
                    }}
                  >
                    {plan.period}
                  </Typography>
                </Stack>

                <Stack spacing={2} sx={{ mb: 4 }}>
                  {plan.features.map((feature, index) => (
                    <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
                      <Iconify
                        icon="solar:check-circle-bold"
                        sx={{
                          color: plan.popular ? ROSE_GOLD : GOLD,
                          fontSize: 18,
                          mt: 0.25,
                        }}
                      />
                      <Typography
                        sx={{
                          color: plan.popular ? 'rgba(255,255,255,0.8)' : '#6A5A6A',
                          fontSize: 14,
                          lineHeight: 1.5,
                        }}
                      >
                        {feature}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  variant={plan.popular ? 'contained' : 'outlined'}
                  sx={{
                    background: plan.popular
                      ? `linear-gradient(135deg, ${ROSE_GOLD}, ${GOLD})`
                      : 'transparent',
                    color: plan.popular ? '#FFF' : ROSE_GOLD,
                    borderColor: ROSE_GOLD,
                    borderRadius: 50,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      background: plan.popular
                        ? `linear-gradient(135deg, ${GOLD}, ${ROSE_GOLD})`
                        : `${ROSE_GOLD}10`,
                      borderColor: GOLD,
                    },
                  }}
                >
                  Chọn gói này
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
