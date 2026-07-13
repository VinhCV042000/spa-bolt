import { Helmet } from 'react-helmet-async';

import { Spa9ServiceDetailsPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Service Details</title>
      </Helmet>
      <Spa9ServiceDetailsPageView />
    </>
  );
}
