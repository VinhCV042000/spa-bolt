import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { CRYSTAL, AMETHYST, ROSE_QUARTZ, SPA17_GALLERY } from 'src/sections/spa17/spa17-data';

export function Spa17Gallery() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, ${CRYSTAL} 0%, #EDE7F6 50%, ${CRYSTAL} 100%)`,
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: AMETHYST,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            KHÔNG GIAN · 공간
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: '#2D2A4A',
              lineHeight: 1.2,
            }}
          >
            Thiền giữa
            <Box component="span" sx={{ color: ROSE_QUARTZ }}>
              {' '}
              phố thị
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {SPA17_GALLERY.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={isLarge ? 8 : 4}
                key={item.caption}
                component={m.div}
                variants={varFade({ distance: 40 }).inUp}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: isLarge ? 340 : 260,
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'scale(1.01)',
                      '& .gallery-caption': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                      '& .gallery-img': {
                        transform: 'scale(1.1)',
                      },
                    },
                    '&:hover::after': {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={item.img}
                    alt={item.caption}
                    className="gallery-img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(180deg, transparent 50%, ${AMETHYST}cc 100%)`,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                  <Box
                    className="gallery-caption"
                    sx={{
                      position: 'absolute',
                      bottom: 24,
                      left: 24,
                      right: 24,
                      opacity: 0.8,
                      transform: 'translateY(8px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Typography
                      sx={{
                        color: CRYSTAL,
                        fontSize: 18,
                        fontWeight: 500,
                        fontFamily: '"Noto Serif KR", serif',
                      }}
                    >
                      {item.caption}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Crystal tea bar intro */}
        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            mt: 6,
            p: { xs: 4, md: 6 },
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: 5,
            border: `1px solid ${AMETHYST}15`,
            textAlign: 'center',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Typography
                sx={{
                  color: '#2D2A4A',
                  fontSize: 22,
                  fontWeight: 500,
                  fontFamily: '"Noto Serif KR", serif',
                }}
              >
                Crystal Tea Bar
              </Typography>
              <Typography sx={{ color: '#8A88A8', fontSize: 14, mt: 0.5 }}>
                Trà nhân sâm, yuzu honey, omija berry — mỗi tách một năng lượng
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  background: `linear-gradient(135deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Trà miễn phí mỗi buổi
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
