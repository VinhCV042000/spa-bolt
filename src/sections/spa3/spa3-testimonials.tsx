import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

import { SPA3_BROWN, SPA3_TERRA, SPA3_TESTIMONIAL_META } from 'src/sections/spa3/spa3-data';

// ----------------------------------------------------------------------

type TestimonialItem = { name: string; role: string; comment: string };

export function Spa3Testimonials({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa3');

  const testimonials = t('testimonials.items', { returnObjects: true }) as TestimonialItem[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA3_TERRA, letterSpacing: 3 }}>
              {t('testimonials.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: SPA3_BROWN }}>
              {t('testimonials.title')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {Array.isArray(testimonials) &&
            testimonials.map((item, idx) => {
              const meta = SPA3_TESTIMONIAL_META[idx] || SPA3_TESTIMONIAL_META[0];

              return (
                <Grid xs={12} md={4} key={idx}>
                  <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                    <Card
                      sx={{
                        height: '100%',
                        p: 4,
                        borderRadius: 2,
                        border: '1px solid rgba(199,91,57,0.1)',
                        boxShadow: 'none',
                        position: 'relative',
                      }}
                    >
                      <Iconify
                        icon="mingcute:quote-left-fill"
                        width={36}
                        sx={{ color: SPA3_TERRA, opacity: 0.2, mb: 2 }}
                      />

                      <Typography
                        variant="body1"
                        sx={{ color: 'grey.700', lineHeight: 1.8, mb: 3 }}
                      >
                        {item.comment}
                      </Typography>

                      <Divider sx={{ mb: 2 }} />

                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={meta.avatar} alt={item.name} sx={{ width: 48, height: 48 }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" sx={{ color: SPA3_BROWN }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.500' }}>
                            {item.role}
                          </Typography>
                        </Box>
                        <Rating
                          value={meta.rating}
                          readOnly
                          size="small"
                          sx={{ '& .MuiRating-iconFilled': { color: SPA3_TERRA } }}
                        />
                      </Stack>
                    </Card>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Box>
  );
}
