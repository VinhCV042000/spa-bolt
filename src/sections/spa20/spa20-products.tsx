import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { GOLD, ROSE_GOLD, DEEP_PLUM, SPA20_PRODUCTS } from 'src/sections/spa20/spa20-data';

export function Spa20Products() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: DEEP_PLUM,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${ROSE_GOLD}20 0%, transparent 70%)`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '-3%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: ROSE_GOLD,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            SẢN PHẨM · PRODUCTS
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: 32, md: 44 },
              fontWeight: 400,
              color: '#FFF',
              lineHeight: 1.2,
            }}
          >
            Dưỡng chất
            <Box component="span" sx={{ color: ROSE_GOLD }}>
              {' '}
              cao cấp
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA20_PRODUCTS.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={product.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.08)',
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px rgba(183,110,121,0.3)`,
                  },
                }}
              >
                {product.bestseller && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: `linear-gradient(135deg, ${ROSE_GOLD}, ${GOLD})`,
                      color: '#FFF',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 5,
                      fontSize: 10,
                      fontWeight: 600,
                      zIndex: 2,
                    }}
                  >
                    Bestseller
                  </Box>
                )}
                <Box
                  component="img"
                  src={product.img}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <Box sx={{ p: 2.5 }}>
                  <Typography sx={{ color: ROSE_GOLD, fontSize: 11, fontWeight: 600, mb: 0.5 }}>
                    {product.brand}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#FFF',
                      fontSize: 16,
                      fontWeight: 500,
                      mb: 1,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography sx={{ color: '#A0A0A0', fontSize: 13, mb: 2 }}>
                    {product.benefit}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      sx={{
                        color: GOLD,
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      {product.price}
                    </Typography>
                    <Button
                      size="small"
                      sx={{
                        minWidth: 32,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: ROSE_GOLD,
                        color: '#FFF',
                        '&:hover': { bgcolor: GOLD },
                      }}
                    >
                      <Iconify icon="solar:cart-plus-bold" sx={{ fontSize: 16 }} />
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{
              borderColor: ROSE_GOLD,
              color: ROSE_GOLD,
              borderRadius: 50,
              px: 4,
              py: 1.5,
              '&:hover': { borderColor: '#FFF', color: '#FFF', bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            Xem tất cả sản phẩm
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
