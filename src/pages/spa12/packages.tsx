import { Helmet } from 'react-helmet-async';

import { Spa12PackagesPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Packages</title>
      </Helmet>
      <Spa12PackagesPageView />
    </>
  );
}
