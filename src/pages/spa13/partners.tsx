import { Helmet } from 'react-helmet-async';

import { Spa13PartnersView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13PartnersPage() {
  return (
    <>
      <Helmet>
        <title>Partners — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13PartnersView />
    </>
  );
}
