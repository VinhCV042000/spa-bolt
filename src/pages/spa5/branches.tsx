import { Helmet } from 'react-helmet-async';

import { Spa5BranchesPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Établissements</title>
      </Helmet>
      <Spa5BranchesPageView />
    </>
  );
}
