import { Helmet } from 'react-helmet-async';

import { Spa8ContactPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Liên hệ</title>
      </Helmet>
      <Spa8ContactPageView />
    </>
  );
}
