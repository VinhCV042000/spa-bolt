import { Helmet } from 'react-helmet-async';

import { Spa6PartnersPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Partners</title>
      </Helmet>
      <Spa6PartnersPageView />
    </>
  );
}
