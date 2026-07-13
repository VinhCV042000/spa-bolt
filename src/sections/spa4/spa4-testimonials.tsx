import type { Spa4Lang } from 'src/sections/spa4/spa4-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA4_TESTIMONIALS } from 'src/sections/spa4/spa4-data';

// ----------------------------------------------------------------------

const JADE_GREEN = '#1B4332';
const ROSE_GOLD = '#C9956C';

export function Spa4Testimonials() {
  const { t, currentLang } = useTranslate('spa4');
  const lang = currentLang.value as Spa4Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAFAF7' }}>
      <Container component={MotionViewport}>
        <Stack spacing={1} alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ROSE_GOLD, letterSpacing: 3, fontWeight: 700 }}
            >
              {t('testimonials.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: JADE_GREEN }}>
              {t('testimonials.title')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA4_TESTIMONIALS.map((testimonial) => (
            <Grid key={testimonial.name} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 5,
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                    border: '1px solid',
                    borderColor: 'grey.100',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 16px 48px rgba(27,67,50,0.08)',
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Iconify
                    icon="solar:chat-round-bold-duotone"
                    width={40}
                    sx={{ color: '#E8F5E9', mb: 2 }}
                  />

                  <Stack direction="row" spacing={0.25} sx={{ mb: 2 }}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Iconify
                        key={i}
                        icon="solar:star-bold"
                        width={16}
                        sx={{ color: '#FFB800' }}
                      />
                    ))}
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.75,
                      fontStyle: 'italic',
                      flexGrow: 1,
                      mb: 3,
                    }}
                  >
                    &ldquo;{testimonial.comment[lang]}&rdquo;
                  </Typography>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.75,
                      bgcolor: '#E8F5E9',
                      color: JADE_GREEN,
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.5,
                      mb: 2.5,
                      fontSize: 12,
                      fontWeight: 600,
                      width: 'fit-content',
                    }}
                  >
                    <Iconify icon="solar:leaf-bold-duotone" width={14} />
                    {testimonial.service[lang]}
                  </Box>

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                    sx={{ borderTop: '1px solid', borderColor: 'grey.100', pt: 2.5 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: testimonial.avatarColor,
                        color: JADE_GREEN,
                        fontWeight: 800,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: JADE_GREEN }}>
                        {testimonial.name}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Iconify
                          icon="solar:map-point-bold-duotone"
                          width={12}
                          sx={{ color: 'text.disabled' }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {testimonial.location[lang]}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
