import type { Spa7Lang } from 'src/sections/spa7/spa7-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA7_TECHNOLOGIES } from 'src/sections/spa7/spa7-data';

// ----------------------------------------------------------------------

const PINK = '#F4A7B9';
const WHITE = '#FAFAFA';

export function Spa7Tech() {
  const { t, currentLang } = useTranslate('spa7');
  const lang = currentLang.value as Spa7Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#111111' }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: PINK, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('tech.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: WHITE, maxWidth: 480, mx: 'auto' }}
            >
              {t('tech.title')}{' '}
              <Box component="span" sx={{ color: PINK }}>
                {t('tech.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(250,250,250,0.45)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('tech.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA7_TECHNOLOGIES.map((tech, idx) => (
            <Grid key={tech.name.en} item xs={12} sm={6}>
              <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: idx % 2 === 0 ? 'row' : 'row-reverse' },
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: `${tech.color}50`,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 20px 60px ${tech.color}18`,
                    },
                    '&:hover .tech-img': { transform: 'scale(1.06)' },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: { xs: '100%', md: 200 },
                      height: { xs: 180, md: 'auto' },
                      overflow: 'hidden',
                      minHeight: { md: 240 },
                    }}
                  >
                    <Box
                      className="tech-img"
                      component="img"
                      src={tech.image}
                      alt={tech.name[lang]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'brightness(0.7) saturate(0.8)',
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box
                    sx={{
                      flex: 1,
                      p: 3.5,
                      bgcolor: '#181818',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Iconify icon={tech.icon} width={24} sx={{ color: tech.color }} />
                        <Chip
                          label={tech.badge}
                          size="small"
                          sx={{
                            bgcolor: `${tech.color}18`,
                            color: tech.color,
                            fontWeight: 700,
                            fontSize: 10,
                            border: `1px solid ${tech.color}30`,
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="h6"
                        sx={{ color: WHITE, fontWeight: 800, lineHeight: 1.3 }}
                      >
                        {tech.name[lang]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: tech.color, fontWeight: 600, fontStyle: 'italic' }}
                      >
                        {tech.tagline[lang]}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(250,250,250,0.5)',
                          lineHeight: 1.7,
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {tech.description[lang]}
                      </Typography>
                      <Button
                        size="small"
                        endIcon={<Iconify icon="solar:arrow-right-bold-duotone" />}
                        sx={{
                          color: tech.color,
                          p: 0,
                          justifyContent: 'flex-start',
                          fontWeight: 700,
                          fontSize: 13,
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      >
                        {t('tech.learnMore')}
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
