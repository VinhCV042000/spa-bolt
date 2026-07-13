import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { CRYSTAL, AMETHYST, ROSE_QUARTZ, SPA17_MASTERS } from 'src/sections/spa17/spa17-data';

export function Spa17Masters() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: CRYSTAL,
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
            THẦY THUỐC · 한의사
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
            Bậc thầy
            <Box component="span" sx={{ color: ROSE_QUARTZ }}>
              {' '}
              K-Beauty
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {SPA17_MASTERS.map((master, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={master.name}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover .master-img': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 20px 40px ${AMETHYST}25`,
                  },
                }}
              >
                {/* Avatar */}
                <Box
                  sx={{
                    position: 'relative',
                    width: 180,
                    height: 180,
                    mx: 'auto',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `3px solid ${AMETHYST}20`,
                    mb: 3,
                    background: '#FFF',
                  }}
                >
                  <Box
                    component="img"
                    src={master.img}
                    alt={master.name}
                    className="master-img"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'all 0.4s ease',
                    }}
                  />
                  {/* Crystal glow effect */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: -1,
                      borderRadius: '50%',
                      border: `2px solid transparent`,
                      background: `linear-gradient(135deg, ${AMETHYST}40, ${ROSE_QUARTZ}30) border-box`,
                      mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      animation: 'glow 3s ease-in-out infinite',
                      '@keyframes glow': {
                        '0%, 100%': { opacity: 0.6 },
                        '50%': { opacity: 1 },
                      },
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: '#2D2A4A',
                    fontSize: 18,
                    fontWeight: 500,
                    fontFamily: '"Noto Serif KR", serif',
                    mb: 0.5,
                  }}
                >
                  {master.name}
                </Typography>

                <Typography
                  sx={{
                    color: AMETHYST,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    mb: 1,
                  }}
                >
                  {master.role}
                </Typography>

                <Typography
                  sx={{
                    color: '#8A88A8',
                    fontSize: 13,
                  }}
                >
                  {master.specialty}
                </Typography>

                {/* Decorative orb */}
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: index % 2 === 0 ? AMETHYST : ROSE_QUARTZ,
                    mx: 'auto',
                    mt: 2,
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
