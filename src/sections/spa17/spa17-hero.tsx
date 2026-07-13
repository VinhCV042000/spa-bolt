import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import {
  GOLD,
  BLUSH,
  CRYSTAL,
  AMETHYST,
  ROSE_QUARTZ,
  SPA17_IMAGES,
} from 'src/sections/spa17/spa17-data';

export function Spa17Hero() {
  const { t } = useTranslate('spa17');
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        pt: 'calc(var(--layout-header-desktop-height))',
        background: `linear-gradient(135deg, ${BLUSH} 0%, ${CRYSTAL} 50%, #EDE7F6 100%)`,
      }}
    >
      {/* Decorative crystal shapes */}
      <Box
        sx={{
          position: 'absolute',
          right: -60,
          top: '15%',
          width: 280,
          height: 280,
          background: `linear-gradient(135deg, ${ROSE_QUARTZ}30 0%, ${AMETHYST}20 100%)`,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          animation: 'morph 8s ease-in-out infinite',
          '@keyframes morph': {
            '0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
            '50%': { borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%' },
            '100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '10%',
          bottom: '15%',
          width: 180,
          height: 180,
          background: `linear-gradient(135deg, ${AMETHYST}15 0%, ${ROSE_QUARTZ}10 100%)`,
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(5deg)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: '20%',
          bottom: '25%',
          width: 120,
          height: 120,
          background: `linear-gradient(135deg, ${GOLD}20 0%, ${ROSE_QUARTZ}15 100%)`,
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
            '50%': { transform: 'scale(1.1)', opacity: 0.8 },
          },
        }}
      />

      {/* Korean calligraphy style text */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 16, md: 48 },
          top: '18%',
          writingMode: 'vertical-rl',
          color: `${AMETHYST}25`,
          fontSize: { xs: 48, md: 96 },
          fontWeight: 200,
          letterSpacing: 8,
          zIndex: 1,
          fontFamily: '"Noto Serif KR", serif',
        }}
      >
        수정빛
      </Box>

      <Container
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
        >
          {/* Left content */}
          <Stack spacing={3} sx={{ flex: 1, maxWidth: { md: 560 } }}>
            <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 48,
                    height: '2px',
                    background: `linear-gradient(90deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                  }}
                />
                <Typography
                  sx={{
                    color: AMETHYST,
                    letterSpacing: 4,
                    fontWeight: 600,
                    fontSize: 11,
                    textTransform: 'uppercase',
                  }}
                >
                  {t('hero.eyebrow')}
                </Typography>
              </Stack>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 42, md: 64 },
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: '#2D2A4A',
                  fontFamily: '"Noto Serif KR", "Playfair Display", serif',
                }}
              >
                {t('hero.title')}
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    background: `linear-gradient(90deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  {t('hero.titleAccent')}
                </Box>
              </Typography>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Typography
                sx={{
                  color: '#5A5878',
                  maxWidth: 420,
                  lineHeight: 1.8,
                  fontSize: 15,
                }}
              >
                {t('hero.description')}
              </Typography>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  size="large"
                  startIcon={<Iconify icon="solar:star-bold-duotone" />}
                  sx={{
                    background: `linear-gradient(135deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                    color: CRYSTAL,
                    borderRadius: 50,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    boxShadow: `0 8px 24px ${AMETHYST}40`,
                    '&:hover': {
                      background: `linear-gradient(135deg, #8A6BA8 0%, #D4A0A8 100%)`,
                      boxShadow: `0 12px 32px ${AMETHYST}50`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {t('hero.ctaPrimary')}
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:teapot-bold-duotone" />}
                  sx={{
                    borderColor: `${AMETHYST}40`,
                    color: AMETHYST,
                    borderRadius: 50,
                    px: 4,
                    py: 1.5,
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: AMETHYST,
                      bgcolor: `${AMETHYST}08`,
                    },
                  }}
                >
                  {t('hero.ctaSecondary')}
                </Button>
              </Stack>
            </Box>

            <Box component={m.div} variants={varFade({ distance: 20 }).inUp} sx={{ pt: 3 }}>
              <Stack direction="row" spacing={4}>
                {(t('hero.stats', { returnObjects: true }) as string[]).map((s, index) => (
                  <Box key={`${s}-${index}`}>
                    <Typography
                      sx={{
                        background: `linear-gradient(135deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: 32,
                        fontWeight: 300,
                        fontFamily: 'serif',
                      }}
                    >
                      {['10', '7', '100+'][index]}
                    </Typography>
                    <Typography
                      sx={{ color: '#8A88A8', fontSize: 11, letterSpacing: 1.5, mt: 0.5 }}
                    >
                      {s.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Stack>

          {/* Right hero image */}
          <Box
            component={m.div}
            variants={varFade({ distance: 40 }).inLeft}
            sx={{
              position: 'relative',
              flex: 1,
              maxWidth: { md: 480 },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRadius: '40px 40px 80px 40px',
                overflow: 'hidden',
                boxShadow: `0 20px 60px ${AMETHYST}25, 0 8px 24px ${ROSE_QUARTZ}15`,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 60%, ${CRYSTAL}ee 100%)`,
                  zIndex: 1,
                },
              }}
            >
              <Box
                component="img"
                src={SPA17_IMAGES.hero}
                alt="Crystal Glow Spa"
                sx={{
                  width: '100%',
                  height: { xs: 420, md: 540 },
                  objectFit: 'cover',
                }}
              />
            </Box>
            {/* Floating crystal badge */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                left: -30,
                bgcolor: CRYSTAL,
                p: 2.5,
                borderRadius: 3,
                boxShadow: `0 12px 40px ${AMETHYST}20`,
                textAlign: 'center',
                zIndex: 3,
              }}
            >
              <Typography sx={{ color: AMETHYST, fontSize: 10, letterSpacing: 2, fontWeight: 600 }}>
                ĐỐI TÁC
              </Typography>
              <Typography sx={{ color: '#2D2A4A', fontSize: 14, fontWeight: 500, mt: 0.5 }}>
                Seoul Beauty Lab
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <Typography sx={{ color: AMETHYST, fontSize: 10, letterSpacing: 3, mb: 1 }}>
          SCROLL
        </Typography>
        <Box
          sx={{
            width: '1px',
            height: 40,
            background: `linear-gradient(180deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
            mx: 'auto',
          }}
        />
      </Box>
    </Box>
  );
}
