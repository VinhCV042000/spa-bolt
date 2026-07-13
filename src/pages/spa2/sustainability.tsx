import { Helmet } from 'react-helmet-async';

import { Spa2SustainabilityPageView } from 'src/sections/spa2/view/spa2-content-pages2';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | SustainabilityPage</title>
      </Helmet>
      <Spa2SustainabilityPageView />
    </>
  );
}
