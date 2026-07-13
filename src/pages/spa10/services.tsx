import { Helmet } from 'react-helmet-async';

import { Spa10ServicesPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Services</title>
      </Helmet>
      <Spa10ServicesPageView />
    </>
  );
}
