import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Upload } from 'src/components/upload';
import { Iconify } from 'src/components/iconify';

import { SPA2_CREAM_DARK } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------
// Plain drag/drop + local-file-upload + URL image field — no focal point or
// zoom controls (unlike Spa2ImageField), for the many spa2 admin spots that
// just need a single flat image: gallery photos, before/after case shots,
// team member portraits, collaboration cover images, and similar.
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
  value: string;
  onChange: (next: string) => void;
  height?: number;
  helperText?: string;
  rounded?: boolean;
};

export function Spa2SimpleImageField({
  label,
  value,
  onChange,
  height = 180,
  helperText,
  rounded = false,
}: Props) {
  const openFileDialog = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        onChange(await fileToDataUrl(file));
      }
    };
    input.click();
  }, [onChange]);

  const handleDrop = useCallback(
    async (files: File[]) => {
      if (files[0]) {
        onChange(await fileToDataUrl(files[0]));
      }
    },
    [onChange]
  );

  return (
    <Stack spacing={1.25}>
      {label && (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">{label}</Typography>
          {value && (
            <Stack direction="row" spacing={0.25}>
              <Tooltip title="Đổi ảnh khác">
                <IconButton size="small" onClick={openFileDialog}>
                  <Iconify icon="solar:gallery-edit-bold" width={18} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xoá ảnh">
                <IconButton size="small" color="error" onClick={() => onChange('')}>
                  <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Stack>
      )}

      {value ? (
        <Box
          sx={{
            position: 'relative',
            height,
            borderRadius: rounded ? '50%' : 2,
            width: rounded ? height : '100%',
            mx: rounded ? 'auto' : 0,
            overflow: 'hidden',
            border: `1px solid ${SPA2_CREAM_DARK}`,
            backgroundImage: `url(${value})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        <Upload
          onDrop={handleDrop}
          accept={{ 'image/*': [] }}
          helperText="Kéo thả ảnh vào đây hoặc nhấn để chọn ảnh từ máy"
        />
      )}

      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          size="small"
          fullWidth
          label="Hoặc dán URL ảnh"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
        />
        {value && (
          <Button size="small" onClick={openFileDialog} sx={{ whiteSpace: 'nowrap' }}>
            Đổi ảnh
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
