import { Helmet } from 'react-helmet-async';

import { Spa13BeforeAfterView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13BeforeAfterPage() {
  return (
    <>
      <Helmet>
        <title>Results — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13BeforeAfterView />
    </>
  );
}
