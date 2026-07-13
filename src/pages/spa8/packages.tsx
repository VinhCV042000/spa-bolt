import { Helmet } from 'react-helmet-async';

import { Spa8PackagesPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Gói liệu trình</title>
      </Helmet>
      <Spa8PackagesPageView />
    </>
  );
}
