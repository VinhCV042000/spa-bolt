import { Helmet } from 'react-helmet-async';

import { Spa4BranchesPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Hệ thống chi nhánh</title>
      </Helmet>
      <Spa4BranchesPageView />
    </>
  );
}
