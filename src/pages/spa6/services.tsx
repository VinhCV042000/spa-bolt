import { Helmet } from 'react-helmet-async';

import { Spa6ServicesPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Treatments</title>
      </Helmet>
      <Spa6ServicesPageView />
    </>
  );
}
