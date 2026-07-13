import { Helmet } from 'react-helmet-async';

import { Spa9ContactPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Contact</title>
      </Helmet>
      <Spa9ContactPageView />
    </>
  );
}
