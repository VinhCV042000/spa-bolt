import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { TEA, INK, JADE, RICE, CINNABAR, SPA19_IMAGES } from 'src/sections/spa19/spa19-data';

// ----------------------------------------------------------------------

const GALLERY_IMAGES = [
  { img: SPA19_IMAGES.gallery1, caption: 'Không gian thiền yên tĩnh' },
  { img: SPA19_IMAGES.gallery2, caption: 'Phòng tắm dược thảo' },
  { img: SPA19_IMAGES.gallery3, caption: 'Góc trà đạo cổ truyền' },
];

// ----------------------------------------------------------------------

export function Spa19Gallery() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: RICE }}>
      <Container component={MotionViewport} maxWidth="lg">
        {/* Header */}
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: JADE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              KHÔNG GIAN DƯỠNG SINH
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: INK,
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.15,
              }}
            >
              Gốc tre,{' '}
              <Box component="span" sx={{ color: CINNABAR }}>
                trầm hương,
              </Box>{' '}
              lặng lẽ an yên.
            </Typography>
          </Box>
        </Stack>

        {/* Gallery: 3 large images */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' },
            gap: 3,
          }}
        >
          {GALLERY_IMAGES.map((item) => (
            <Box
              key={item.img}
              component={m.div}
              variants={varFade({ distance: 40 }).inUp}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                aspectRatio: '3/4',
                cursor: 'pointer',
                border: `2px solid ${JADE}20`,
                '&:hover': {
                  '& img': { transform: 'scale(1.06)' },
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
                  background: 'linear-gradient(to top, rgba(44,62,80,0.85), transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 3,
                  opacity: 0,
                  transition: 'opacity 0.35s ease',
                }}
              >
                <Typography variant="body1" sx={{ color: RICE, fontWeight: 600 }}>
                  {item.caption}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Quote */}
        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{
            mt: 6,
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            bgcolor: INK,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              color: TEA,
              fontFamily: 'serif',
              fontStyle: 'italic',
              fontSize: { xs: 16, md: 20 },
              lineHeight: 1.8,
            }}
          >
            &ldquo;Tĩnh tại dưỡng sinh, phàm trần lặng lẽ — giữa phố thị ồn ào, tìm về gốc
            rễ.&rdquo;
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
