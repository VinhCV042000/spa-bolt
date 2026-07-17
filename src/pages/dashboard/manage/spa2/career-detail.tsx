import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { Spa2CareerEditorView } from 'src/sections/dashboard/spa2/manage/spa2-career-editor-view';

const metadata = { title: `Chi tiết Tuyển dụng | Spa2 - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Spa2CareerEditorView />
    </>
  );
}
