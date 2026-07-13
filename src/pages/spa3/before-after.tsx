import { Helmet } from 'react-helmet-async';

import { Spa3BeforeAfterPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Trước & Sau</title>
      </Helmet>
      <Spa3BeforeAfterPageView />
    </>
  );
}
