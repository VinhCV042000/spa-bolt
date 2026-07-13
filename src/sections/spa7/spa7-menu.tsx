import type { Spa7Lang } from 'src/sections/spa7/spa7-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { varFade, MotionViewport } from 'src/components/animate';

import { SPA7_MENU_ITEMS } from 'src/sections/spa7/spa7-data';

// ----------------------------------------------------------------------

const PINK = '#F4A7B9';
const WHITE = '#FAFAFA';

export function Spa7Menu() {
  const { t, currentLang } = useTranslate('spa7');
  const lang = currentLang.value as Spa7Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 14 }, bgcolor: '#0A0A0A' }}>
      <Container component={MotionViewport}>
        <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: PINK, letterSpacing: 4, fontWeight: 700, fontSize: 11 }}
            >
              {t('menu.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: WHITE }}>
              {t('menu.title')}{' '}
              <Box component="span" sx={{ color: PINK }}>
                {t('menu.titleHighlight')}
              </Box>
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(250,250,250,0.4)', maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}
            >
              {t('menu.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {SPA7_MENU_ITEMS.map((group) => (
            <Grid key={group.category.en} item xs={12} md={4}>
              <Box component={m.div} variants={varFade({ distance: 30 }).inUp}>
                <Box
                  sx={{
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.06)',
                    bgcolor: '#141414',
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  {/* Category header */}
                  <Box
                    sx={{
                      px: 3,
                      py: 2.5,
                      bgcolor: `${group.color}12`,
                      borderBottom: `1px solid ${group.color}20`,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box sx={{ width: 3, height: 20, bgcolor: group.color, borderRadius: 2 }} />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: group.color,
                          fontWeight: 700,
                          letterSpacing: 0.5,
                          textTransform: 'uppercase',
                          fontSize: 12,
                        }}
                      >
                        {group.category[lang]}
                      </Typography>
                    </Stack>
                  </Box>

                  <Stack
                    divider={<Divider sx={{ borderColor: 'rgba(255,255,255,0.04)' }} />}
                    sx={{ px: 3 }}
                  >
                    {group.items.map((item) => (
                      <Box
                        key={item.name.en}
                        sx={{
                          py: 2.5,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover .item-name': { color: PINK },
                          '&:hover .item-cta': { opacity: 1 },
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Stack spacing={0.5} sx={{ flex: 1 }}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              flexWrap="wrap"
                              useFlexGap
                            >
                              <Typography
                                className="item-name"
                                variant="body2"
                                sx={{
                                  color: WHITE,
                                  fontWeight: 600,
                                  transition: 'color 0.2s',
                                  lineHeight: 1.4,
                                }}
                              >
                                {item.name[lang]}
                              </Typography>
                              {item.badge && (
                                <Chip
                                  label={item.badge[lang]}
                                  size="small"
                                  sx={{
                                    bgcolor: `${group.color}20`,
                                    color: group.color,
                                    fontWeight: 700,
                                    fontSize: 9,
                                    height: 18,
                                  }}
                                />
                              )}
                            </Stack>
                            <Typography variant="caption" sx={{ color: 'rgba(250,250,250,0.3)' }}>
                              {item.duration[lang]}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="body2"
                            sx={{
                              color: group.color,
                              fontWeight: 800,
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                          >
                            {item.price[lang]}
                          </Typography>
                        </Stack>
                        <Button
                          className="item-cta"
                          size="small"
                          fullWidth
                          sx={{
                            mt: 1,
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            bgcolor: `${group.color}15`,
                            color: group.color,
                            borderRadius: 1.5,
                            fontWeight: 700,
                            fontSize: 11,
                            py: 0.75,
                          }}
                        >
                          {t('menu.bookNow')}
                        </Button>
                      </Box>
                    ))}
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
