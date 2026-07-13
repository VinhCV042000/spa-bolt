import { Helmet } from 'react-helmet-async';

import { Spa17SubBranchesPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Chi nhánh</title>
      </Helmet>
      <Spa17SubBranchesPageView />
    </>
  );
}
