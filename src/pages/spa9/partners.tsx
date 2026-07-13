import { Helmet } from 'react-helmet-async';

import { Spa9PartnersPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Partners</title>
      </Helmet>
      <Spa9PartnersPageView />
    </>
  );
}
