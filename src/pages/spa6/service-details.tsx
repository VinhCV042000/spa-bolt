import { Helmet } from 'react-helmet-async';

import { Spa6ServiceDetailsPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Treatment Details</title>
      </Helmet>
      <Spa6ServiceDetailsPageView />
    </>
  );
}
