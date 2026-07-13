import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { Spa2PromotionsManageView } from 'src/sections/dashboard/spa2/manage';

const metadata = { title: `Quản lý Khuyến mãi | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2PromotionsManageView />
    </>
  );
}
