import { Helmet } from 'react-helmet-async';

import { Spa13PolicyView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13PolicyPage() {
  return (
    <>
      <Helmet>
        <title>Policy — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13PolicyView />
    </>
  );
}
