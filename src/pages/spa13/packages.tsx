import { Helmet } from 'react-helmet-async';

import { Spa13PackagesView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13PackagesPage() {
  return (
    <>
      <Helmet>
        <title>Packages — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13PackagesView />
    </>
  );
}
