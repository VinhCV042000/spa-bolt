import { Helmet } from 'react-helmet-async';

import { Spa1BookingPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Online booking</title>
      </Helmet>
      <Spa1BookingPageView />
    </>
  );
}
