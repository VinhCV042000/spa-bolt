import type { Spa12Lang } from 'src/sections/spa12/spa12-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { CHAMPAGNE, DEEP_NAVY, PEARL_WHITE, SPA12_SIGNATURES } from 'src/sections/spa12/spa12-data';

export function Spa12Signatures() {
  const { t, currentLang } = useTranslate('spa12');
  const lang = currentLang.value as Spa12Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#070E1A' }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: CHAMPAGNE, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('signature.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, color: PEARL_WHITE, maxWidth: 480, mx: 'auto' }}
            >
              {t('signature.title')}{' '}
              <Box component="span" sx={{ color: CHAMPAGNE }}>
                {t('signature.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(249,246,238,0.4)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('signature.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA12_SIGNATURES.map((sig) => (
            <Grid key={sig.name.en} item xs={12} sm={6}>
              <Box component={m.div} variants={varFade({ distance: 40 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(212,175,55,0.1)',
                    transition: 'all 0.35s ease',
                    '&:hover': {
                      borderColor: sig.badgeColor,
                      transform: 'translateY(-6px)',
                      boxShadow: `0 24px 60px ${sig.badgeColor}15`,
                    },
                    '&:hover .sig-img': { transform: 'scale(1.06)' },
                  }}
                >
                  <Box
                    sx={{ height: 220, overflow: 'hidden', position: 'relative', flexShrink: 0 }}
                  >
                    <Box
                      className="sig-img"
                      component="img"
                      src={sig.image}
                      alt={sig.name[lang]}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'brightness(0.5) saturate(0.8)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to top, ${sig.color} 0%, transparent 60%)`,
                      }}
                    />
                    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                      <Chip
                        label={sig.badge[lang]}
                        size="small"
                        sx={{
                          bgcolor: sig.badgeColor,
                          color:
                            sig.color === DEEP_NAVY
                              ? DEEP_NAVY
                              : sig.textColor === CHAMPAGNE
                                ? '#1A0A00'
                                : '#FFF',
                          fontWeight: 800,
                          fontSize: 10,
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: 3.5,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: sig.color,
                    }}
                  >
                    <Stack spacing={1.5} sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ color: sig.textColor, fontWeight: 800 }}>
                        {sig.name[lang]}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: `${sig.textColor}99`, fontStyle: 'italic', fontWeight: 600 }}
                      >
                        {sig.tagline[lang]}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: `${sig.textColor}70`,
                          lineHeight: 1.7,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {sig.description[lang]}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mt: 2.5 }}
                    >
                      <Stack spacing={0.25}>
                        <Typography variant="caption" sx={{ color: `${sig.textColor}50` }}>
                          {sig.duration[lang]}
                        </Typography>
                        <Typography variant="h6" sx={{ color: sig.textColor, fontWeight: 900 }}>
                          {sig.price[lang]}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: `${sig.textColor}50`, fontSize: 10 }}
                        >
                          {t('signature.perSession')}
                        </Typography>
                      </Stack>
                      <Button
                        size="small"
                        sx={{
                          bgcolor: sig.badgeColor,
                          color: sig.color,
                          fontWeight: 800,
                          borderRadius: 2,
                          px: 2.5,
                          '&:hover': { bgcolor: `${sig.badgeColor}CC` },
                        }}
                      >
                        {t('signature.bookNow')}
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
