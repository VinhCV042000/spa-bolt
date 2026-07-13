import { Helmet } from 'react-helmet-async';

import { Spa13OffersView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13OffersPage() {
  return (
    <>
      <Helmet>
        <title>Offers — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13OffersView />
    </>
  );
}
