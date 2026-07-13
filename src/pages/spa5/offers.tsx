import { Helmet } from 'react-helmet-async';

import { Spa5OffersPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Offres</title>
      </Helmet>
      <Spa5OffersPageView />
    </>
  );
}
