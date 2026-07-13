import { Helmet } from 'react-helmet-async';

import { Spa2AffiliatePageView } from 'src/sections/spa2/view/spa2-content-pages4';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Affiliate</title>
      </Helmet>
      <Spa2AffiliatePageView />
    </>
  );
}
