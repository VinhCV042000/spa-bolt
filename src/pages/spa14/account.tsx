import { Helmet } from 'react-helmet-async';

import { Spa14SubAccountPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Tài khoản</title>
      </Helmet>
      <Spa14SubAccountPageView />
    </>
  );
}
