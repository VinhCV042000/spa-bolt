import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { SPA_TESTIMONIAL_META } from 'src/sections/spa/spa-data';

// ----------------------------------------------------------------------

type TestimonialItem = { name: string; role: string; content: string };

export function SpaTestimonials({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('spa');

  const testimonials = (t('testimonials.items', { returnObjects: true }) as TestimonialItem[]).map(
    (item, index) => ({ ...item, ...SPA_TESTIMONIAL_META[index] })
  );

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '32px' },
    },
  });

  return (
    <Box component="section" id="testimonials" sx={{ py: { xs: 8, md: 12 }, ...sx }} {...other}>
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center', maxWidth: 640, mx: 'auto' }}
        >
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              {t('testimonials.eyebrow')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography variant="h2">
              {t('testimonials.titleLead')}
              <Box component="span" sx={{ opacity: 0.4 }}>
                {' '}
                {t('testimonials.titleRest')}
              </Box>
            </Typography>
          </Box>
        </Stack>

        <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
          <Carousel carousel={carousel}>
            {testimonials.map((item) => (
              <Stack
                key={item.name}
                spacing={3}
                sx={{
                  p: 3,
                  height: 1,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: (theme) => theme.customShadows.card,
                }}
              >
                <Rating value={item.rating} readOnly size="small" />

                <Typography variant="body2" sx={{ color: 'text.secondary', flex: 1 }}>
                  &ldquo;{item.content}&rdquo;
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={item.avatar} alt={item.name} />
                  <Stack spacing={0.25}>
                    <Typography variant="subtitle2">{item.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {item.role}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Carousel>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 4 }}>
            <CarouselDotButtons
              variant="rounded"
              scrollSnaps={carousel.dots.scrollSnaps}
              selectedIndex={carousel.dots.selectedIndex}
              onClickDot={carousel.dots.onClickDot}
            />
            <CarouselArrowBasicButtons {...carousel.arrows} />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
