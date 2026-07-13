import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { PEARL, SILVER, LAVENDER, CHARCOAL, SPA21_PROCESS } from 'src/sections/spa21/spa21-data';

export function Spa21Process() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: '#FFF',
      }}
    >
      <Container component={MotionViewport} maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            sx={{
              color: LAVENDER,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
              mb: 2,
            }}
          >
            QUY TRÌNH · PROCESS
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 32, md: 44 },
              fontWeight: 300,
              color: CHARCOAL,
              lineHeight: 1.2,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Bốn bước
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              điều trị
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA21_PROCESS.map((step, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={step.step}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box sx={{ position: 'relative', textAlign: 'center', p: 3 }}>
                {/* Connector line */}
                {index < SPA21_PROCESS.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '45%',
                      right: { xs: '50%', md: -12 },
                      width: { xs: 1, md: 24 },
                      height: { xs: 40, md: 1 },
                      bgcolor: SILVER,
                      display: { xs: 'none', md: 'block' },
                      transform: 'translateX(50%)',
                      opacity: 0.3,
                    }}
                  />
                )}

                {/* Step circle */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: PEARL,
                    border: `2px solid ${LAVENDER}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: LAVENDER,
                      '& .step-icon': { color: '#FFF' },
                      '& .step-num': { color: '#FFF' },
                    },
                  }}
                >
                  <Iconify
                    icon={step.icon}
                    className="step-icon"
                    sx={{ color: LAVENDER, fontSize: 32 }}
                  />
                </Box>

                <Typography
                  sx={{
                    color: LAVENDER,
                    fontSize: 12,
                    fontWeight: 600,
                    mb: 1,
                    letterSpacing: 2,
                  }}
                >
                  BƯỚC {step.step}
                </Typography>
                <Typography
                  sx={{
                    color: CHARCOAL,
                    fontSize: 20,
                    fontWeight: 500,
                    mb: 1.5,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {step.title}
                </Typography>
                <Typography sx={{ color: '#6A6A7A', fontSize: 13, lineHeight: 1.7 }}>
                  {step.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
