import { Helmet } from 'react-helmet-async';

import { Spa8PolicyPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Chính sách</title>
      </Helmet>
      <Spa8PolicyPageView />
    </>
  );
}
