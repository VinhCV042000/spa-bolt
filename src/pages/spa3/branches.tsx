import { Helmet } from 'react-helmet-async';

import { Spa3BranchesPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Chi nhánh</title>
      </Helmet>
      <Spa3BranchesPageView />
    </>
  );
}
