import { Helmet } from 'react-helmet-async';

import { Spa14SubBranchesPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Chi nhánh</title>
      </Helmet>
      <Spa14SubBranchesPageView />
    </>
  );
}
