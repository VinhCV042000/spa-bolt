import type { Spa2PageKey, Spa2PageParams } from 'src/api/spa2/types';

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { useSpa2PageData } from 'src/actions/spa2';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DashboardSpa2DataRenderer } from './dashboard-spa2-data-renderer';

// ----------------------------------------------------------------------

type Props = {
  pageKey: Spa2PageKey;
};

function resolveParams(
  pageKey: Spa2PageKey,
  routeParams: Record<string, string | undefined>
): Spa2PageParams {
  switch (pageKey) {
    case 'service-details':
    case 'blog-details':
      return { slug: routeParams.slug };
    case 'career-details':
      return { id: routeParams.id };
    default:
      return {};
  }
}

// ----------------------------------------------------------------------

export function DashboardSpa2PageView({ pageKey }: Props) {
  const routeParams = useParams();

  const params = useMemo(() => resolveParams(pageKey, routeParams), [pageKey, routeParams]);

  const { config, data, source, loading, isMock, refresh } = useSpa2PageData(pageKey, params);

  const dashboardPath =
    pageKey === 'home' ? `${paths.dashboard.spa2.root}` : `${paths.dashboard.spa2.root}/${pageKey}`;

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={config.title}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: config.title, href: dashboardPath },
        ]}
        action={<StackActions publicPath={config.publicPath(params)} onRefresh={() => refresh()} />}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {config.description && (
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" variant="outlined">
            {config.description}
          </Alert>
        </Box>
      )}

      {isMock && (
        <Alert
          severity="warning"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => refresh()}>
              Thử lại API
            </Button>
          }
        >
          Không thể kết nối API ({CONFIG.serverUrl || 'chưa cấu hình VITE_SERVER_URL'}). Đang hiển
          thị mock data.
        </Alert>
      )}

      {!isMock && source === 'api' && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Dữ liệu được tải từ API thành công.
        </Alert>
      )}

      {loading ? <StackSkeleton /> : <DashboardSpa2DataRenderer data={data} />}
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function StackActions({ publicPath, onRefresh }: { publicPath: string; onRefresh: () => void }) {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        variant="outlined"
        startIcon={<Iconify icon="solar:refresh-bold" />}
        onClick={onRefresh}
      >
        Làm mới
      </Button>
      <Button
        component={RouterLink}
        href={publicPath}
        variant="contained"
        startIcon={<Iconify icon="solar:eye-bold" />}
        target="_blank"
      >
        Xem trang public
      </Button>
    </Box>
  );
}

function StackSkeleton() {
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Skeleton variant="rounded" height={120} />
      <Skeleton variant="rounded" height={320} />
    </Box>
  );
}
