import { Helmet } from 'react-helmet-async';

import { Spa9BookingPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Booking</title>
      </Helmet>
      <Spa9BookingPageView />
    </>
  );
}
