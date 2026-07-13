import { Helmet } from 'react-helmet-async';

import { Spa10ServiceDetailsPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Service Details</title>
      </Helmet>
      <Spa10ServiceDetailsPageView />
    </>
  );
}
