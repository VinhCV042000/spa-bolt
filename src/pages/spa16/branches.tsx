import { Helmet } from 'react-helmet-async';

import { Spa16SubBranchesPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Chi nhánh</title>
      </Helmet>
      <Spa16SubBranchesPageView />
    </>
  );
}
