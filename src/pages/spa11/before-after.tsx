import { Helmet } from 'react-helmet-async';

import { Spa11SubBeforeAfterPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Trước & Sau</title>
      </Helmet>
      <Spa11SubBeforeAfterPageView />
    </>
  );
}
