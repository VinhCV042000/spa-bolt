import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

import { useRef, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';

import { spa2ImageBackgroundStyle } from 'src/sections/spa2/spa2-image-utils';
import { SPA2_TEAL, SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

type Props = {
  label?: string;
  value: Spa2AdjustableImage;
  onChange: (next: Spa2AdjustableImage) => void;
  height?: number;
  helperText?: string;
  allowZoom?: boolean;
};

export function Spa2ImageField({
  label,
  value,
  onChange,
  height = 220,
  helperText,
  allowZoom = true,
}: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  const focalFromEvent = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    return {
      focalX: Math.min(100, Math.max(0, Math.round(x))),
      focalY: Math.min(100, Math.max(0, Math.round(y))),
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      onChange({ ...value, ...focalFromEvent(e) });
    },
    [onChange, value, focalFromEvent]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return;
      onChange({ ...value, ...focalFromEvent(e) });
    },
    [onChange, value, focalFromEvent]
  );

  const openFileDialog = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const url = await fileToDataUrl(file);
        onChange({ ...value, url });
      }
    };
    input.click();
  }, [onChange, value]);

  const handleDrop = useCallback(
    async (files: File[]) => {
      if (files[0]) {
        const url = await fileToDataUrl(files[0]);
        onChange({ ...value, url, focalX: 50, focalY: 50, zoom: 100 });
      }
    },
    [onChange, value]
  );

  const handleReset = useCallback(() => {
    onChange({ ...value, focalX: 50, focalY: 50, zoom: 100 });
  }, [onChange, value]);

  return (
    <Stack spacing={1.25}>
      {label && (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">{label}</Typography>
          {value.url && (
            <Stack direction="row" spacing={0.25}>
              <Tooltip title="Đổi ảnh khác">
                <IconButton size="small" onClick={openFileDialog}>
                  <Iconify icon="solar:gallery-edit-bold" width={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xoá ảnh">
                <IconButton size="small" color="error" onClick={() => onChange({ ...value, url: '' })}>
                  <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Stack>
      )}

      {value.url ? (
        <Box
          ref={boxRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          sx={{
            position: 'relative',
            height,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'crosshair',
            border: `1px solid ${SPA2_CREAM_DARK}`,
            userSelect: 'none',
            ...spa2ImageBackgroundStyle(value),
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: `${value.focalY}%`,
              left: `${value.focalX}%`,
              transform: 'translate(-50%, -50%)',
              width: 18,
              height: 18,
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 0 0 1.5px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'rgba(0,0,0,0.55)',
              pointerEvents: 'none',
            }}
          >
            <Typography variant="caption" sx={{ color: 'common.white' }}>
              Nhấn hoặc kéo trên ảnh để chọn điểm lấy nét
            </Typography>
          </Box>
        </Box>
      ) : (
        <Upload
          onDrop={handleDrop}
          accept={{ 'image/*': [] }}
          helperText="Kéo thả ảnh vào đây hoặc nhấn để chọn ảnh từ máy"
        />
      )}

      {value.url && allowZoom && (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Iconify icon="solar:magnifer-zoom-in-bold" width={18} sx={{ color: SPA2_TEAL }} />
          <Slider
            size="small"
            value={value.zoom}
            min={100}
            max={200}
            onChange={(_e, v) => onChange({ ...value, zoom: v as number })}
            sx={{ color: SPA2_TEAL }}
          />
          <Typography variant="caption" sx={{ minWidth: 38, color: 'text.secondary' }}>
            {value.zoom}%
          </Typography>
        </Stack>
      )}

      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          size="small"
          fullWidth
          label="Hoặc dán URL ảnh"
          value={value.url}
          onChange={(e) => onChange({ ...value, url: e.target.value })}
          placeholder="https://..."
        />
        {value.url && (
          <Button size="small" onClick={handleReset} sx={{ whiteSpace: 'nowrap' }}>
            Đặt lại khung hình
          </Button>
        )}
      </Stack>

      {helperText && (
        <Typography variant="caption" color="text.secondary">
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
