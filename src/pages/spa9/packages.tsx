import { Helmet } from 'react-helmet-async';

import { Spa9PackagesPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Packages</title>
      </Helmet>
      <Spa9PackagesPageView />
    </>
  );
}
