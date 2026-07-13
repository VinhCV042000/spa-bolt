import { Helmet } from 'react-helmet-async';

import { Spa13ServiceDetailsView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13ServiceDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Service Details — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13ServiceDetailsView />
    </>
  );
}
