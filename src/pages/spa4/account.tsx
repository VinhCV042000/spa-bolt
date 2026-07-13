import { Helmet } from 'react-helmet-async';

import { Spa4AccountPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Tài khoản</title>
      </Helmet>
      <Spa4AccountPageView />
    </>
  );
}
