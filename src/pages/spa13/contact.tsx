import { Helmet } from 'react-helmet-async';

import { Spa13ContactView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13ContactView />
    </>
  );
}
