import { Helmet } from 'react-helmet-async';

import { Spa16SubAccountPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Tài khoản</title>
      </Helmet>
      <Spa16SubAccountPageView />
    </>
  );
}
