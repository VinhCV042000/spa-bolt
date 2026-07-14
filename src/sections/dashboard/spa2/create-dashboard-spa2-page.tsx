import type { Spa2PageKey } from 'src/api/spa2/types';

import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { getSpa2PageConfig } from 'src/api/spa2/pages-config';

import { DashboardSpa2PageView } from './view';

// ----------------------------------------------------------------------

export function createDashboardSpa2Page(pageKey: Spa2PageKey) {
  const config = getSpa2PageConfig(pageKey);

  return function DashboardSpa2Page() {
    return (
      <>
        <Helmet>
          <title>{`${config.title} | Spa2 Dashboard - ${CONFIG.appName}`}</title>
        </Helmet>

        <DashboardSpa2PageView pageKey={pageKey} />
      </>
    );
  };
};
