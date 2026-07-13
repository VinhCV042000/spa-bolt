import { Helmet } from 'react-helmet-async';

import { Spa12ServicesPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Services</title>
      </Helmet>
      <Spa12ServicesPageView />
    </>
  );
}
