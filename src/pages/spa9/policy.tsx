import { Helmet } from 'react-helmet-async';

import { Spa9PolicyPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Policy</title>
      </Helmet>
      <Spa9PolicyPageView />
    </>
  );
}
