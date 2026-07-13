import { Helmet } from 'react-helmet-async';

import { SpaOffersPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Offers</title>
      </Helmet>
      <SpaOffersPageView />
    </>
  );
}
