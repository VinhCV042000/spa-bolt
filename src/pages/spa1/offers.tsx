import { Helmet } from 'react-helmet-async';

import { Spa1OffersPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Special offers</title>
      </Helmet>
      <Spa1OffersPageView />
    </>
  );
}
