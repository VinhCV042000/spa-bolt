import { Helmet } from 'react-helmet-async';

import { Spa10BlogPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Blog</title>
      </Helmet>
      <Spa10BlogPageView />
    </>
  );
}
