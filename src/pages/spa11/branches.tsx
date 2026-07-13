import { Helmet } from 'react-helmet-async';

import { Spa11SubBranchesPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Chi nhánh</title>
      </Helmet>
      <Spa11SubBranchesPageView />
    </>
  );
}
