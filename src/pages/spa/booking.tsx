import { Helmet } from 'react-helmet-async';

import { SpaBookingPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Online booking</title>
      </Helmet>
      <SpaBookingPageView />
    </>
  );
}
