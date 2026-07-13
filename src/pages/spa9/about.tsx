import { Helmet } from 'react-helmet-async';

import { Spa9AboutPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | About</title>
      </Helmet>
      <Spa9AboutPageView />
    </>
  );
}
