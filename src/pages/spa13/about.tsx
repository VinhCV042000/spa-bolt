import { Helmet } from 'react-helmet-async';

import { Spa13AboutView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13AboutView />
    </>
  );
}
