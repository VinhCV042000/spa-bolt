import { Helmet } from 'react-helmet-async';

import { Spa2AccountPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Tài khoản</title>
      </Helmet>
      <Spa2AccountPageView />
    </>
  );
}
