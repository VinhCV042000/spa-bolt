import { Helmet } from 'react-helmet-async';

import { Spa18SubBeforeAfterPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Trước & Sau</title>
      </Helmet>
      <Spa18SubBeforeAfterPageView />
    </>
  );
}
