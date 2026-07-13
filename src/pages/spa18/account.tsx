import { Helmet } from 'react-helmet-async';

import { Spa18SubAccountPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Tài khoản</title>
      </Helmet>
      <Spa18SubAccountPageView />
    </>
  );
}
