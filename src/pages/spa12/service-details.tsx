import { Helmet } from 'react-helmet-async';

import { Spa12ServiceDetailsPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Service Details</title>
      </Helmet>
      <Spa12ServiceDetailsPageView />
    </>
  );
}
