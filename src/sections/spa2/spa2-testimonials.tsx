import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade } from 'src/components/animate';

import { SPA2_TEAL, SPA2_CREAM, SPA2_TESTIMONIAL_META } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

type TestimonialItem = { name: string; role: string; comment: string };

export function Spa2Testimonials({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa2');

  const testimonials = t('testimonials.items', { returnObjects: true }) as TestimonialItem[];

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: SPA2_CREAM, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', mb: 8 }}>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
              {t('testimonials.eyebrow')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2" sx={{ color: 'grey.900' }}>
              {t('testimonials.title')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {Array.isArray(testimonials) &&
            testimonials.map((item, idx) => {
              const meta = SPA2_TESTIMONIAL_META[idx] || SPA2_TESTIMONIAL_META[0];

              return (
                <Grid xs={12} sm={6} md={3} key={idx}>
                  <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        textAlign: 'center',
                      }}
                    >
                      <Stack spacing={2} alignItems="center">
                        <Avatar
                          src={meta.avatar}
                          alt={item.name}
                          sx={{ width: 56, height: 56, border: `2px solid ${SPA2_TEAL}` }}
                        />
                        <Rating
                          value={meta.rating}
                          readOnly
                          size="small"
                          sx={{ '& .MuiRating-iconFilled': { color: SPA2_TEAL } }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: 'grey.600', fontStyle: 'italic', lineHeight: 1.7 }}
                        >
                          &ldquo;{item.comment}&rdquo;
                        </Typography>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.500' }}>
                            {item.role}
                          </Typography>
                        </Box>
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
