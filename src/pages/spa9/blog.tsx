import { Helmet } from 'react-helmet-async';

import { Spa9BlogPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Blog</title>
      </Helmet>
      <Spa9BlogPageView />
    </>
  );
}
