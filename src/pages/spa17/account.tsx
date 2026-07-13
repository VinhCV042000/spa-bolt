import { Helmet } from 'react-helmet-async';

import { Spa17SubAccountPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Tài khoản</title>
      </Helmet>
      <Spa17SubAccountPageView />
    </>
  );
}
