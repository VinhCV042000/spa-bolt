import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { Spa2ServiceEditorView } from 'src/sections/dashboard/spa2/manage/spa2-service-editor-view';

const metadata = { title: `Chi tiết Dịch vụ | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2ServiceEditorView />
    </>
  );
}
