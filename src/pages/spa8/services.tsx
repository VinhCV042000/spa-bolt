import { Helmet } from 'react-helmet-async';

import { Spa8ServicesPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Dịch vụ</title>
      </Helmet>
      <Spa8ServicesPageView />
    </>
  );
}
