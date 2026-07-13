import { Helmet } from 'react-helmet-async';

import { SpaServicesPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Services</title>
      </Helmet>
      <SpaServicesPageView />
    </>
  );
}
