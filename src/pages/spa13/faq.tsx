import { Helmet } from 'react-helmet-async';

import { Spa13FaqView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13FaqPage() {
  return (
    <>
      <Helmet>
        <title>FAQ — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13FaqView />
    </>
  );
}
