import { Helmet } from 'react-helmet-async';

import { Spa6AccountPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Member Account</title>
      </Helmet>
      <Spa6AccountPageView />
    </>
  );
}
