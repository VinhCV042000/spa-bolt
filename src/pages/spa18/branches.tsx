import { Helmet } from 'react-helmet-async';

import { Spa18SubBranchesPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Chi nhánh</title>
      </Helmet>
      <Spa18SubBranchesPageView />
    </>
  );
}
