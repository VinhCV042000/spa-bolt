import { Helmet } from 'react-helmet-async';

import { Spa6OffersPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Special Offers</title>
      </Helmet>
      <Spa6OffersPageView />
    </>
  );
}
