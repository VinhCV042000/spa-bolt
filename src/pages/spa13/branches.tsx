import { Helmet } from 'react-helmet-async';

import { Spa13BranchesView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13BranchesPage() {
  return (
    <>
      <Helmet>
        <title>Branches — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13BranchesView />
    </>
  );
}
