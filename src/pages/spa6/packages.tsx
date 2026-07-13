import { Helmet } from 'react-helmet-async';

import { Spa6PackagesPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Retreat Packages</title>
      </Helmet>
      <Spa6PackagesPageView />
    </>
  );
}
