import { Helmet } from 'react-helmet-async';

import { Spa9FaqPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | FAQ</title>
      </Helmet>
      <Spa9FaqPageView />
    </>
  );
}
