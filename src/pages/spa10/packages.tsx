import { Helmet } from 'react-helmet-async';

import { Spa10PackagesPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Packages</title>
      </Helmet>
      <Spa10PackagesPageView />
    </>
  );
}
