import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { PEARL, SILVER, LAVENDER, CHARCOAL, SPA21_TREATMENTS } from 'src/sections/spa21/spa21-data';

export function Spa21Treatments() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: PEARL,
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
            TRỊ LIỆU · TREATMENTS
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
            Phác đồ
            <Box component="span" sx={{ color: LAVENDER, fontWeight: 500 }}>
              {' '}
              điều trị
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {SPA21_TREATMENTS.map((treatment) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={treatment.code}
              component={m.div}
              variants={varFade({ distance: 30 }).inUp}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 3,
                  background: '#FFF',
                  borderRadius: 1,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${SILVER}30`,
                  '&:hover': {
                    boxShadow: `0 12px 40px ${CHARCOAL}08`,
                    borderColor: LAVENDER,
                  },
                }}
              >
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  sx={{ mb: 2 }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 1,
                      background: PEARL,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon={treatment.icon} sx={{ color: LAVENDER, fontSize: 22 }} />
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      bgcolor: CHARCOAL,
                      color: '#FFF',
                      fontSize: 11,
                      fontWeight: 600,
                      borderRadius: 0.5,
                    }}
                  >
                    {treatment.code}
                  </Box>
                </Stack>

                {/* Content */}
                <Typography
                  sx={{
                    color: CHARCOAL,
                    fontSize: 18,
                    fontWeight: 500,
                    mb: 0.5,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {treatment.name}
                </Typography>
                <Typography
                  sx={{ color: LAVENDER, fontSize: 11, fontWeight: 600, mb: 1.5, letterSpacing: 1 }}
                >
                  {treatment.category.toUpperCase()}
                </Typography>

                <Typography sx={{ color: '#6A6A7A', fontSize: 13, lineHeight: 1.7, mb: 2 }}>
                  {treatment.desc}
                </Typography>

                {/* Footer */}
                <Box
                  sx={{
                    pt: 2,
                    borderTop: `1px solid ${SILVER}20`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Stack spacing={0.25}>
                    <Typography sx={{ color: '#8A8A9A', fontSize: 10 }}>
                      {treatment.duration}
                    </Typography>
                    <Typography sx={{ color: '#8A8A9A', fontSize: 10, fontStyle: 'italic' }}>
                      {treatment.sessions}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: LAVENDER, fontSize: 18, fontWeight: 600 }}>
                    {treatment.price}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
