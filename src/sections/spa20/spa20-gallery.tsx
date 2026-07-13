import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';

import {
  GOLD,
  ROSE_GOLD,
  CHAMPAGNE,
  DEEP_PLUM,
  SPA20_GALLERY,
} from 'src/sections/spa20/spa20-data';

export function Spa20Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: `linear-gradient(180deg, #FFF 0%, ${CHAMPAGNE}30 100%)`,
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
            KẾT QUẢ · RESULTS
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
            Trước & Sau
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
              trị liệu
            </Box>
          </Typography>
        </Box>

        {/* Gallery selector */}
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 6 }}>
          {SPA20_GALLERY.map((item, index) => (
            <Button
              key={item.title}
              onClick={() => setActiveIndex(index)}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 50,
                bgcolor: activeIndex === index ? ROSE_GOLD : 'transparent',
                color: activeIndex === index ? '#FFF' : DEEP_PLUM,
                border: `1px solid ${activeIndex === index ? ROSE_GOLD : ROSE_GOLD}40`,
                fontWeight: 500,
                fontSize: 14,
                '&:hover': {
                  bgcolor: activeIndex === index ? GOLD : `${ROSE_GOLD}10`,
                  borderColor: ROSE_GOLD,
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Stack>

        {/* Before/After display */}
        <Grid
          container
          spacing={4}
          component={m.div}
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: `0 16px 40px ${DEEP_PLUM}15`,
              }}
            >
              <Box
                component="img"
                src={SPA20_GALLERY[activeIndex].beforeImg}
                alt="Before"
                sx={{
                  width: '100%',
                  height: { xs: 280, md: 400 },
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="solar:history-bold" sx={{ color: '#FFF', fontSize: 18 }} />
                  <Typography sx={{ color: '#FFF', fontSize: 14, fontWeight: 500 }}>
                    Trước trị liệu
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  background: DEEP_PLUM,
                  color: '#FFF',
                  px: 2,
                  py: 0.75,
                  borderRadius: 5,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                BEFORE
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: `0 16px 40px ${ROSE_GOLD}20`,
              }}
            >
              <Box
                component="img"
                src={SPA20_GALLERY[activeIndex].afterImg}
                alt="After"
                sx={{
                  width: '100%',
                  height: { xs: 280, md: 400 },
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="solar:like-bold" sx={{ color: ROSE_GOLD, fontSize: 18 }} />
                  <Typography sx={{ color: '#FFF', fontSize: 14, fontWeight: 500 }}>
                    Sau {SPA20_GALLERY[activeIndex].duration}
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: `linear-gradient(135deg, ${ROSE_GOLD}, ${GOLD})`,
                  color: '#FFF',
                  px: 2,
                  py: 0.75,
                  borderRadius: 5,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                AFTER ✓
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Treatment info */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 5,
            p: 3,
            background: '#FFF',
            borderRadius: 3,
            border: `1px solid ${ROSE_GOLD}20`,
          }}
        >
          <Typography
            sx={{
              color: DEEP_PLUM,
              fontSize: 18,
              fontWeight: 500,
              fontFamily: '"Playfair Display", serif',
              mb: 1,
            }}
          >
            {SPA20_GALLERY[activeIndex].treatment}
          </Typography>
          <Typography sx={{ color: '#8A7A8A', fontSize: 14 }}>
            Thời gian trị liệu: {SPA20_GALLERY[activeIndex].duration}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
