import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import {
  SAND,
  CORAL,
  JUNGLE,
  BAMBOO,
  SUNSET,
  EMERALD,
  SPA18_IMAGES,
} from 'src/sections/spa18/spa18-data';

// ----------------------------------------------------------------------

const GALLERY_IMAGES = [
  { img: SPA18_IMAGES.gallery1, caption: 'Hòa mình vào rừng nhiệt đới' },
  { img: SPA18_IMAGES.gallery2, caption: 'Không gian thiền Bali' },
  { img: SPA18_IMAGES.gallery3, caption: 'Bồn tắm hoa nhiệt đới' },
  { img: SPA18_IMAGES.gallery4, caption: 'Liệu pháp đá nóng' },
  { img: SPA18_IMAGES.gallery5, caption: 'Villa Jungle Suite' },
  { img: SPA18_IMAGES.gallery6, caption: 'Trà bar thảo mộc' },
];

// ----------------------------------------------------------------------

export function Spa18Gallery() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: SAND }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: EMERALD, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              KHÔNG GIAN BALI
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: JUNGLE,
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              Đảo thiên đường,
              <Box component="span" sx={{ color: CORAL }}>
                {' '}
                ngay tại thành phố.
              </Box>
            </Typography>
          </Box>
        </Stack>

        {/* Gallery Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 2.5,
          }}
        >
          {GALLERY_IMAGES.map((item, index) => (
            <Box
              key={item.img}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                position: 'relative',
                borderRadius: 2.5,
                overflow: 'hidden',
                aspectRatio: '4/3',
                cursor: 'pointer',
                '&:hover': {
                  '& img': { transform: 'scale(1.08)' },
                  '& .overlay': { opacity: 1 },
                },
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.caption}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(27,67,50,0.7)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 2.5,
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                }}
              >
                <Typography variant="body2" sx={{ color: SAND, fontWeight: 600 }}>
                  {item.caption}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Decorative bottom */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 6,
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {[JUNGLE, BAMBOO, CORAL, SUNSET].map((color) => (
            <Box
              key={color}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: color,
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
