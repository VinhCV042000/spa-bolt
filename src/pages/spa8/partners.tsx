import { Helmet } from 'react-helmet-async';

import { Spa8PartnersPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Đối tác</title>
      </Helmet>
      <Spa8PartnersPageView />
    </>
  );
}
