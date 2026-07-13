import { Helmet } from 'react-helmet-async';

import { Spa2BeforeAfterPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Trước & Sau</title>
      </Helmet>
      <Spa2BeforeAfterPageView />
    </>
  );
}
