import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

// -----------------------------------------------------------------------------
// Thống kê dạng "vòng tròn tiến trình" - phỏng theo thiết kế
// src/sections/invoice/invoice-analytic.tsx (trang dashboard/invoice), điều chỉnh
// cho các danh sách spa2 (không có số tiền hoá đơn, thay bằng nhãn đơn vị/số liệu
// phụ tuỳ ngữ cảnh: "dịch vụ", "combo", v.v.). Có thể bấm để lọc danh sách, giữ
// nguyên phong cách 2 vòng CircularProgress lồng nhau + icon ở giữa.
// -----------------------------------------------------------------------------

type Spa2ListAnalyticProps = {
  icon: string;
  title: string;
  total: number;
  percent: number;
  color?: string;
  unitLabel?: string;
  secondaryLine?: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export function Spa2ListAnalytic({
  title,
  total,
  icon,
  color = '#2E8B7A',
  percent,
  unitLabel = 'mục',
  secondaryLine,
  active,
  onClick,
}: Spa2ListAnalyticProps) {
  const content = (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 180, px: 1 }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} width={32} sx={{ color, position: 'absolute' }} />

        <CircularProgress
          size={56}
          thickness={2}
          value={percent}
          variant="determinate"
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          size={56}
          value={100}
          thickness={3}
          variant="determinate"
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5} sx={{ textAlign: 'left' }}>
        <Typography variant="subtitle1">{title}</Typography>

        <Box component="span" sx={{ color: 'text.disabled', typography: 'body2' }}>
          {total} {unitLabel}
        </Box>

        {secondaryLine}
      </Stack>
    </Stack>
  );

  if (!onClick) return content;

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: 1,
        borderRadius: 1.5,
        py: 0.5,
        bgcolor: active ? `${color}14` : 'transparent',
        transition: 'background-color .2s',
        '&:hover': { bgcolor: `${color}0F` },
      }}
    >
      {content}
    </ButtonBase>
  );
}
