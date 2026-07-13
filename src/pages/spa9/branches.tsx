import { Helmet } from 'react-helmet-async';

import { Spa9BranchesPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Branches</title>
      </Helmet>
      <Spa9BranchesPageView />
    </>
  );
}
