import { Helmet } from 'react-helmet-async';

import { Spa10BranchesPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Branches</title>
      </Helmet>
      <Spa10BranchesPageView />
    </>
  );
}
