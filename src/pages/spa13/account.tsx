import { Helmet } from 'react-helmet-async';

import { Spa13AccountView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13AccountPage() {
  return (
    <>
      <Helmet>
        <title>My Account — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13AccountView />
    </>
  );
}
