import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { Spa2GenericManageView } from 'src/sections/dashboard/spa2/manage/spa2-generic-manage-view';
import { SPA2_MANAGE_CONFIGS } from 'src/sections/dashboard/spa2/manage/spa2-manage-configs';

const config = SPA2_MANAGE_CONFIGS['events'];
const metadata = { title: `${config.title} | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2GenericManageView config={config} />
    </>
  );
}
