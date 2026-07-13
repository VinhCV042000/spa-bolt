import { Helmet } from 'react-helmet-async';

import { Spa10OffersPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Offers</title>
      </Helmet>
      <Spa10OffersPageView />
    </>
  );
}
