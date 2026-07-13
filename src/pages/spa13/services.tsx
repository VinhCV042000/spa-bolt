import { Helmet } from 'react-helmet-async';

import { Spa13ServicesView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13ServicesView />
    </>
  );
}
