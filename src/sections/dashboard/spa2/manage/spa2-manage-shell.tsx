import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SPA2_TEAL, SPA2_TEAL_DARK, SPA2_TEAL_LIGHT } from 'src/sections/spa2/spa2-pages-data';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  breadcrumbLabel: string;
  publicPath?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function Spa2ManageShell({
  title,
  eyebrow = 'Nature Spa · Quản trị',
  description,
  breadcrumbLabel,
  publicPath,
  actions,
  children,
}: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={title}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Spa2', href: paths.dashboard.spa2.root },
          { name: breadcrumbLabel },
        ]}
        sx={{ mb: 3 }}
      />

      {/* Teal editorial header */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          mb: 3,
          color: 'common.white',
          background: `linear-gradient(135deg, ${SPA2_TEAL_DARK} 0%, ${SPA2_TEAL} 55%, ${SPA2_TEAL_LIGHT} 100%)`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 90% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 10% 90%, rgba(0,0,0,0.15), transparent 40%)',
            pointerEvents: 'none',
          }}
        />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ md: 'center' }}
          justifyContent="space-between"
          sx={{ position: 'relative' }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ width: 24, height: 2, bgcolor: 'common.white', borderRadius: 2 }} />
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
                {eyebrow}
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {description && (
              <Typography sx={{ mt: 1, maxWidth: 620, opacity: 0.9 }}>{description}</Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1.5}>
            {publicPath && (
              <Button
                component={RouterLink}
                href={publicPath}
                target="_blank"
                startIcon={<Iconify icon="solar:eye-bold" />}
                sx={{
                  borderRadius: 50,
                  px: 2.5,
                  color: 'common.white',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
                }}
              >
                Xem public
              </Button>
            )}
            {actions}
          </Stack>
        </Stack>
      </Box>

      {children}
    </DashboardContent>
  );
}

export const SPA2_MANAGE_ACCENT = SPA2_TEAL;
