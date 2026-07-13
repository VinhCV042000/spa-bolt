import { Helmet } from 'react-helmet-async';

import { Spa7SubAccountPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Tài khoản</title>
      </Helmet>
      <Spa7SubAccountPageView />
    </>
  );
}
