import { Helmet } from 'react-helmet-async';

import { Spa8ServiceDetailsPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa8ServiceDetailsPageView />
    </>
  );
}
