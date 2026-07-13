import { Helmet } from 'react-helmet-async';

import { Spa5BookingPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Réservation</title>
      </Helmet>
      <Spa5BookingPageView />
    </>
  );
}
