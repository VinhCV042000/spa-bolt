import { Helmet } from 'react-helmet-async';

import { Spa8OffersPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Gói ưu đãi</title>
      </Helmet>
      <Spa8OffersPageView />
    </>
  );
}
