import { Helmet } from 'react-helmet-async';

import { Spa6BranchesPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Our Locations</title>
      </Helmet>
      <Spa6BranchesPageView />
    </>
  );
}
