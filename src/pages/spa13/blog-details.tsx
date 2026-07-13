import { Helmet } from 'react-helmet-async';

import { Spa13BlogDetailsView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13BlogDetailsPage() {
  return (
    <>
      <Helmet>
        <title>Blog Details — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13BlogDetailsView />
    </>
  );
}
