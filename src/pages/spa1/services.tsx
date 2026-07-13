import { Helmet } from 'react-helmet-async';

import { Spa1ServicesPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Services</title>
      </Helmet>
      <Spa1ServicesPageView />
    </>
  );
}
