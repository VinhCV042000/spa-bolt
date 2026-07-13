import { Helmet } from 'react-helmet-async';

import { Spa12OffersPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Offers</title>
      </Helmet>
      <Spa12OffersPageView />
    </>
  );
}
