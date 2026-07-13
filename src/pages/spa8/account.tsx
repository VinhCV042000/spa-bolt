import { Helmet } from 'react-helmet-async';

import { Spa8AccountPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Tài khoản khách hàng</title>
      </Helmet>
      <Spa8AccountPageView />
    </>
  );
}
