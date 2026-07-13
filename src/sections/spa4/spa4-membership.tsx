import type { Spa4Lang } from 'src/sections/spa4/spa4-data';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SPA4_MEMBERSHIPS } from 'src/sections/spa4/spa4-data';

// ----------------------------------------------------------------------

const JADE_GREEN = '#1B4332';
const ROSE_GOLD = '#C9956C';

export function Spa4Membership() {
  const { t, currentLang } = useTranslate('spa4');
  const lang = currentLang.value as Spa4Lang;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
      <Container component={MotionViewport}>
        <Stack spacing={1} alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography
              variant="overline"
              sx={{ color: ROSE_GOLD, letterSpacing: 3, fontWeight: 700 }}
            >
              {t('membership.label')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: JADE_GREEN }}>
              {t('membership.title')}
            </Typography>
          </Box>
          <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 440, mx: 'auto' }}>
              {t('membership.description')}
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {SPA4_MEMBERSHIPS.map((plan) => (
            <Grid key={plan.tier.en} item xs={12} md={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                sx={{ height: '100%' }}
              >
                <Box
                  sx={{
                    height: '100%',
                    borderRadius: 5,
                    border: '2px solid',
                    borderColor: plan.popular ? plan.color : 'grey.100',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    boxShadow: plan.popular ? `0 20px 60px ${plan.color}30` : 'none',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 24px 64px ${plan.color}25`,
                    },
                  }}
                >
                  {plan.popular && (
                    <Box
                      sx={{
                        bgcolor: plan.color,
                        color: 'white',
                        textAlign: 'center',
                        py: 0.75,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}
                    >
                      {t('membership.mostPopular')}
                    </Box>
                  )}

                  <Stack spacing={3} sx={{ p: 4, flexGrow: 1 }}>
                    <Stack spacing={1}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 3,
                          bgcolor: `${plan.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Iconify
                          icon="solar:diamond-bold-duotone"
                          width={24}
                          sx={{ color: plan.color }}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: JADE_GREEN }}>
                        {plan.tier[lang]}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {plan.description[lang]}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="baseline" spacing={0.5}>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: plan.color }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        {t('membership.perMonth')}
                      </Typography>
                    </Stack>

                    <List dense disablePadding sx={{ flexGrow: 1 }}>
                      {plan.features[lang].map((feature) => (
                        <ListItem key={feature} disablePadding sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <Iconify
                              icon="solar:check-circle-bold"
                              width={18}
                              sx={{ color: plan.color }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      fullWidth
                      variant={plan.popular ? 'contained' : 'outlined'}
                      size="large"
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 700,
                        ...(plan.popular
                          ? {
                              bgcolor: plan.color,
                              '&:hover': { bgcolor: plan.color, filter: 'brightness(0.9)' },
                            }
                          : {
                              borderColor: plan.color,
                              color: plan.color,
                              '&:hover': { borderColor: plan.color, bgcolor: `${plan.color}10` },
                            }),
                      }}
                    >
                      {t('membership.registerNow')}
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          component={m.div}
          variants={varFade({ distance: 20 }).inUp}
          sx={{ mt: 4, textAlign: 'center' }}
        >
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            {t('membership.noContract')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
