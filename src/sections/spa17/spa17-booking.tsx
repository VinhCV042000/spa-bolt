import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { CRYSTAL, AMETHYST, ROSE_QUARTZ, SPA17_RITUALS } from 'src/sections/spa17/spa17-data';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#2D2A4A',
    borderRadius: 2.5,
    background: 'rgba(255,255,255,0.9)',
    '& fieldset': { borderColor: `${AMETHYST}30` },
    '&:hover fieldset': { borderColor: AMETHYST },
    '&.Mui-focused fieldset': { borderColor: ROSE_QUARTZ },
  },
  '& .MuiInputLabel-root': { color: '#8A88A8' },
  '& .MuiInputLabel-root.Mui-focused': { color: AMETHYST },
  '& .MuiSvgIcon-root': { color: AMETHYST },
};

export function Spa17Booking() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 16 },
        background: CRYSTAL,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative crystal shapes */}
      <Box
        sx={{
          position: 'absolute',
          right: -80,
          top: '30%',
          width: 280,
          height: 280,
          background: `linear-gradient(135deg, ${ROSE_QUARTZ}18 0%, ${AMETHYST}12 100%)`,
          borderRadius: '60% 40% 30% 70% / 60% 50% 40% 40%',
          transform: 'rotate(-20deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: -60,
          bottom: '20%',
          width: 180,
          height: 180,
          background: `linear-gradient(135deg, ${AMETHYST}12 0%, ${ROSE_QUARTZ}10 100%)`,
          borderRadius: '40% 60% 70% 30% / 40% 30% 70% 60%',
          transform: 'rotate(15deg)',
        }}
      />

      <Container component={MotionViewport} maxWidth="md" sx={{ position: 'relative' }}>
        <Stack spacing={2} sx={{ textAlign: 'center', mb: 6, alignItems: 'center' }}>
          <Typography
            sx={{
              color: AMETHYST,
              letterSpacing: 4,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            ĐẶT LỊCH · 예약
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: '"Noto Serif KR", serif',
              fontSize: { xs: 32, md: 48 },
              fontWeight: 300,
              color: '#2D2A4A',
              lineHeight: 1.2,
            }}
          >
            Bắt đầu hành trình{' '}
            <Box component="span" sx={{ color: AMETHYST }}>
              Glass Skin
            </Box>
          </Typography>
          <Typography sx={{ color: '#8A88A8', maxWidth: 480, lineHeight: 1.8, fontSize: 15 }}>
            Để lại thông tin, concierge team sẽ gọi xác nhận trong 30 phút — chuẩn bị không gian
            riêng và sản phẩm phù hợp cho bạn.
          </Typography>
        </Stack>

        <Box
          component={m.div}
          variants={varFade({ distance: 30 }).inUp}
          sx={{
            p: { xs: 3, md: 5 },
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: 5,
            border: `1px solid ${AMETHYST}20`,
            boxShadow: `0 8px 40px ${AMETHYST}10`,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Họ và tên" variant="outlined" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Số điện thoại" variant="outlined" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" variant="outlined" sx={fieldSx} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Nghi lễ"
                defaultValue=""
                variant="outlined"
                sx={fieldSx}
              >
                {SPA17_RITUALS.map((r) => (
                  <MenuItem key={r.name} value={r.name}>
                    {r.name} — {r.duration}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Ngày"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Giờ"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Ghi chú thêm (da nhạy cảm, lịch sử trị liệu, v.v.)"
                variant="outlined"
                sx={fieldSx}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ pt: 1 }}
              >
                <Button
                  size="large"
                  startIcon={<Iconify icon="solar:star-bold-duotone" />}
                  sx={{
                    background: `linear-gradient(135deg, ${AMETHYST} 0%, ${ROSE_QUARTZ} 100%)`,
                    color: CRYSTAL,
                    borderRadius: 50,
                    px: 5,
                    py: 1.5,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    boxShadow: `0 8px 24px ${AMETHYST}30`,
                    '&:hover': {
                      background: `linear-gradient(135deg, #8A6BA8 0%, #D4A0A8 100%)`,
                      boxShadow: `0 12px 32px ${AMETHYST}40`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Xác nhận đặt lịch
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<Iconify icon="solar:phone-bold-duotone" />}
                  sx={{
                    borderColor: `${AMETHYST}40`,
                    color: AMETHYST,
                    borderRadius: 50,
                    px: 5,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: AMETHYST,
                      bgcolor: `${AMETHYST}08`,
                    },
                  }}
                >
                  Gọi hotline
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          justifyContent="center"
          divider={
            <Box sx={{ width: { sm: '1px' }, height: { sm: 32 }, bgcolor: `${AMETHYST}25` }} />
          }
          sx={{ mt: 5, textAlign: 'center' }}
        >
          {[
            { i: 'solar:map-point-bold-duotone', l: '42 Nguyễn Huệ, Quận 1, TP.HCM' },
            { i: 'solar:phone-bold-duotone', l: '+84 917 17 17' },
            { i: 'solar:clock-circle-bold-duotone', l: '9:00 – 22:00 mỗi ngày' },
          ].map((c) => (
            <Stack
              key={c.l}
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="center"
            >
              <Iconify icon={c.i} width={20} sx={{ color: AMETHYST }} />
              <Typography sx={{ color: '#6A6890', fontSize: 13 }}>{c.l}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
