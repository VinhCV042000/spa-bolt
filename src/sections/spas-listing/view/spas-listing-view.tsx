import type { SpasLang, SpaFilter } from 'src/sections/spas-listing/spas-listing-data';

import { useState } from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { ALL_SPAS, FILTER_LABELS } from 'src/sections/spas-listing/spas-listing-data';

// ----------------------------------------------------------------------

const FILTERS: SpaFilter[] = ['all', 'asian', 'european', 'nature', 'luxury', 'tech'];

export function SpasListingView() {
  const { currentLang } = useTranslate('spa');
  const lang = currentLang.value as SpasLang;
  const [activeFilter, setActiveFilter] = useState<SpaFilter>('all');

  const filtered =
    activeFilter === 'all' ? ALL_SPAS : ALL_SPAS.filter((s) => s.tags.includes(activeFilter));

  const pageTitle = {
    en: 'Explore all Spas',
    vi: 'Khám phá tất cả Spa',
    fr: 'Découvrez tous les spas',
    cn: '探索所有水疗',
    ar: 'استكشف جميع السبا',
  }[lang];
  const pageDesc = {
    en: '12 spas with entirely different styles and therapies — from Kyoto to Morocco, from the Amazon to Vienna.',
    vi: '12 spa với phong cách và liệu pháp hoàn toàn khác nhau — từ Kyoto đến Morocco, từ Amazon đến Vienna.',
    fr: '12 spas aux styles et thérapies totalement différents — de Kyoto au Maroc, de l\'Amazonie à Vienne.',
    cn: '12家风格与疗法迮然不同的水疗——从京都到摩洛哥，从亚马逊到维也纳。',
    ar: '12 سبا بأنماط وعلاجات مختلفة تمامًا — من كيوتو إلى المغرب، ومن الأمازون إلى فيينا.',
  }[lang];

  return (
    <Box sx={{ bgcolor: '#0A0A0A', minHeight: '100vh' }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          pt: 'calc(var(--layout-header-desktop-height) + 64px)',
          pb: 10,
          textAlign: 'center',
          background: 'linear-gradient(180deg, #111 0%, #0A0A0A 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Decorative gradient blobs */}
        {[
          { color: '#7C3AED', top: 30, left: 10 },
          { color: '#0891B2', top: 60, right: 15 },
          { color: '#059669', bottom: 10, left: 40 },
        ].map((blob, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${blob.color}18, transparent 70%)`,
              top: blob.top !== undefined ? `${blob.top}%` : undefined,
              bottom: (blob as any).bottom !== undefined ? `${(blob as any).bottom}%` : undefined,
              left: blob.left !== undefined ? `${blob.left}%` : undefined,
              right: (blob as any).right !== undefined ? `${(blob as any).right}%` : undefined,
              pointerEvents: 'none',
            }}
          />
        ))}

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={3} alignItems="center">
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: 5,
                fontWeight: 700,
                fontSize: 11,
              }}
            >
              SPA COLLECTION
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 36, md: 56 },
                fontWeight: 900,
                color: '#FAFAFA',
                lineHeight: 1.1,
                letterSpacing: -2,
              }}
            >
              {pageTitle}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 520,
                lineHeight: 1.85,
                fontSize: 16,
              }}
            >
              {pageDesc}
            </Typography>

            {/* Stats */}
            <Stack direction="row" spacing={4} sx={{ pt: 2 }}>
              {[
                { value: '12', label: { en: 'Spas', vi: 'Spa', fr: 'Spas', cn: '水疗', ar: 'سبا' }[lang] },
                { value: '8', label: { en: 'Countries', vi: 'Quốc gia', fr: 'Pays', cn: '国家', ar: 'دول' }[lang] },
                { value: '50+', label: { en: 'Treatments', vi: 'Liệu trình', fr: 'Soins', cn: '疗程', ar: 'علاجات' }[lang] },
              ].map(({ value, label }) => (
                <Stack key={label} alignItems="center">
                  <Typography variant="h4" sx={{ color: '#FAFAFA', fontWeight: 900 }}>
                    {value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}
                  >
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Filter + Grid */}
      <Container component={MotionViewport} maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Filter chips */}
        <Box component={m.div} variants={varFade({ distance: 20 }).inUp}>
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            justifyContent="center"
            sx={{ mb: { xs: 5, md: 8 } }}
          >
            {FILTERS.map((f) => (
              <Chip
                key={f}
                label={FILTER_LABELS[f][lang]}
                onClick={() => setActiveFilter(f)}
                sx={{
                  fontWeight: 700,
                  fontSize: 13,
                  px: 0.5,
                  height: 38,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  bgcolor: activeFilter === f ? '#FAFAFA' : 'rgba(255,255,255,0.06)',
                  color: activeFilter === f ? '#0A0A0A' : 'rgba(255,255,255,0.55)',
                  border: `1px solid`,
                  borderColor: activeFilter === f ? 'transparent' : 'rgba(255,255,255,0.08)',
                  '&:hover': {
                    bgcolor: activeFilter === f ? '#FAFAFA' : 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  },
                }}
              />
            ))}
            {activeFilter !== 'all' && (
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.3)', alignSelf: 'center', ml: 1 }}
              >
                {filtered.length} {{ en: 'results', vi: 'kết quả', fr: 'résultats', cn: '个结果', ar: 'نتائج' }[lang]}
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Cards grid */}
        <Grid container spacing={3}>
          {filtered.map((spa, idx) => (
            <Grid key={spa.id} item xs={12} sm={6} lg={4}>
              <Box
                component={m.div}
                variants={varFade({ distance: 30 }).inUp}
                transition={{ delay: idx * 0.04 }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: spa.bgColor,
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.35s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: `${spa.accentColor}50`,
                      boxShadow: `0 32px 80px ${spa.accentColor}15`,
                    },
                    '&:hover .card-img': { transform: 'scale(1.08)' },
                    '&:hover .card-cta': { opacity: 1 },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0 }}
                  >
                    <Box
                      className="card-img"
                      component="img"
                      src={spa.image}
                      alt={spa.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'brightness(0.7)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to top, ${spa.bgColor}CC 0%, transparent 60%)`,
                      }}
                    />

                    {/* Tag chips */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 14,
                        left: 14,
                        display: 'flex',
                        gap: 0.75,
                        flexWrap: 'wrap',
                      }}
                    >
                      {spa.tags.slice(0, 2).map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            px: 1.25,
                            py: 0.4,
                            borderRadius: 1.5,
                            bgcolor: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(6px)',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: spa.accentColor,
                              fontWeight: 700,
                              fontSize: 10,
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                            }}
                          >
                            {FILTER_LABELS[tag][lang]}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    {/* Badge */}
                    {spa.badge && (
                      <Box sx={{ position: 'absolute', top: 14, right: 14 }}>
                        <Chip
                          label={spa.badge[lang]}
                          size="small"
                          sx={{
                            bgcolor: spa.accentColor,
                            color: spa.bgColor,
                            fontWeight: 800,
                            fontSize: 10,
                            height: 22,
                          }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Stack spacing={1.5} sx={{ flex: 1 }}>
                      {/* Name + tagline */}
                      <Stack spacing={0.5}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: spa.textColor,
                            fontWeight: 800,
                            lineHeight: 1.3,
                            fontSize: { xs: 16, md: 17 },
                          }}
                        >
                          {spa.name}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            sx={{
                              width: 16,
                              height: 1.5,
                              bgcolor: spa.accentColor,
                              borderRadius: 1,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: spa.accentColor,
                              fontWeight: 700,
                              fontSize: 11,
                              textTransform: 'uppercase',
                              letterSpacing: 1,
                            }}
                          >
                            {spa.tagline[lang]}
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: `${spa.textColor}70`,
                          lineHeight: 1.7,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          flexGrow: 1,
                        }}
                      >
                        {spa.description[lang]}
                      </Typography>

                      {/* Concept tag */}
                      <Box
                        sx={{
                          display: 'inline-flex',
                          width: 'fit-content',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1.5,
                          bgcolor: `${spa.accentColor}12`,
                          border: `1px solid ${spa.accentColor}25`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: spa.accentColor, fontWeight: 700, fontSize: 11 }}
                        >
                          {spa.concept[lang]}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* CTA */}
                    <Box sx={{ mt: 2.5 }}>
                      <Button
                        className="card-cta"
                        component={Link}
                        to={spa.slug}
                        fullWidth
                        size="small"
                        endIcon={<Iconify icon="solar:arrow-right-bold-duotone" />}
                        sx={{
                          bgcolor: spa.accentColor,
                          color: spa.bgColor,
                          borderRadius: 2,
                          fontWeight: 800,
                          py: 1,
                          opacity: { xs: 1, md: 0 },
                          transition: 'opacity 0.25s ease',
                          '&:hover': { bgcolor: `${spa.accentColor}CC` },
                          fontSize: 13,
                        }}
                      >
                        {{ en: 'View Spa', vi: 'Xem Spa', fr: 'Voir le spa', cn: '查看水疗', ar: 'عرض السبا' }[lang]}
                      </Button>
                    </Box>
                  </Box>

                  {/* Palette strip */}
                  <Box sx={{ height: 3, display: 'flex', flexShrink: 0 }}>
                    {spa.palette.map((c) => (
                      <Box key={c} sx={{ flex: 1, bgcolor: c }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.3)' }}>
              {{ en: 'No matching spas found.', vi: 'Không tìm thấy spa phù hợp.', fr: 'Aucun spa correspondant.', cn: '未找到匹配的水疗。', ar: 'لم يتم العثور على سبا مطابق.' }[lang]}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
