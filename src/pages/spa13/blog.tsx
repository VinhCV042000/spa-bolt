import { Helmet } from 'react-helmet-async';

import { Spa13BlogView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13BlogView />
    </>
  );
}
