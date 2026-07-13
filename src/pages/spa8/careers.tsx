import { Helmet } from 'react-helmet-async';

import { Spa8CareersPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Tuyển dụng</title>
      </Helmet>
      <Spa8CareersPageView />
    </>
  );
}
