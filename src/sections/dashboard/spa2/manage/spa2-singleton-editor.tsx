import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import { SPA2_TEAL } from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';

// ----------------------------------------------------------------------

export type SingletonFieldType = 'text' | 'textarea' | 'image' | 'number';

export type SingletonField = {
  key: string;
  label: string;
  type: SingletonFieldType;
  helper?: string;
};

export type SingletonSection = {
  title: string;
  icon?: string;
  fields: SingletonField[];
};

export type Spa2SingletonConfig<T extends Record<string, any>> = {
  title: string;
  description?: string;
  breadcrumbLabel: string;
  publicPath?: string;
  eyebrow?: string;
  initial: T;
  sections: SingletonSection[];
  renderPreview: (value: T) => ReactNode;
};

// ----------------------------------------------------------------------

export function Spa2SingletonEditor<T extends Record<string, any>>({
  config,
}: {
  config: Spa2SingletonConfig<T>;
}) {
  const [value, setValue] = useState<T>(config.initial);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [dirty, setDirty] = useState(false);

  const update = (key: string, v: any) => {
    setValue((prev) => ({ ...prev, [key]: v }));
    setDirty(true);
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setValue(config.initial);
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={config.title}
      description={config.description}
      breadcrumbLabel={config.breadcrumbLabel}
      publicPath={config.publicPath}
      eyebrow={config.eyebrow}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={!dirty}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            Khôi phục
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{
              borderRadius: 50,
              px: 3,
              bgcolor: 'common.white',
              color: SPA2_TEAL,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
            }}
          >
            Lưu thay đổi
          </Button>
        </>
      }
    >
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1.15fr' },
        }}
      >
        {/* Left: form */}
        <Stack spacing={2.5}>
          {config.sections.map((section) => (
            <Card key={section.title} sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                {section.icon && (
                  <Iconify icon={section.icon} width={22} sx={{ color: SPA2_TEAL }} />
                )}
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {section.title}
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {section.fields.map((field) => (
                  <TextField
                    key={field.key}
                    label={field.label}
                    helperText={field.helper}
                    value={value[field.key] ?? ''}
                    onChange={(e) => update(field.key, e.target.value)}
                    fullWidth
                    size="small"
                    multiline={field.type === 'textarea'}
                    rows={field.type === 'textarea' ? 3 : undefined}
                    type={field.type === 'number' ? 'number' : 'text'}
                  />
                ))}
              </Stack>
            </Card>
          ))}

          <Stack direction="row" alignItems="center" spacing={1}>
            {dirty && (
              <Chip
                size="small"
                variant="soft"
                color="warning"
                label="Có thay đổi chưa lưu"
                icon={<Iconify icon="solar:pen-bold" width={14} />}
              />
            )}
            {savedAt && !dirty && (
              <Chip
                size="small"
                variant="soft"
                color="success"
                label={`Đã lưu ${savedAt.toLocaleTimeString('vi-VN')}`}
                icon={<Iconify icon="solar:check-circle-bold" width={14} />}
              />
            )}
          </Stack>
        </Stack>

        {/* Right: preview */}
        <Box>
          <Card
            sx={{
              p: 2.5,
              borderRadius: 3,
              position: 'sticky',
              top: 96,
              bgcolor: 'grey.50',
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Iconify icon="solar:eye-bold" width={20} sx={{ color: SPA2_TEAL }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Xem trước trực tiếp
              </Typography>
            </Stack>
            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                maxHeight: '75vh',
                overflowY: 'auto',
              }}
            >
              {config.renderPreview(value)}
            </Box>
          </Card>
        </Box>
      </Box>
    </Spa2ManageShell>
  );
}
