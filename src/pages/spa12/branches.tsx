import { Helmet } from 'react-helmet-async';

import { Spa12BranchesPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Branches</title>
      </Helmet>
      <Spa12BranchesPageView />
    </>
  );
}
