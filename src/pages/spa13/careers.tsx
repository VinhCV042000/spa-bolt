import { Helmet } from 'react-helmet-async';

import { Spa13CareersView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13CareersPage() {
  return (
    <>
      <Helmet>
        <title>Careers — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13CareersView />
    </>
  );
}
