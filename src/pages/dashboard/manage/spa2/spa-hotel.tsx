import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { Spa2ContentPageManageView } from 'src/sections/dashboard/spa2/manage/spa2-content-page-manage-view';

const metadata = { title: `Quản lý spa-hotel | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2ContentPageManageView pageKey="spa-hotel" />
    </>
  );
}
