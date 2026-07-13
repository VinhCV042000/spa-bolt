import { Helmet } from 'react-helmet-async';

import { Spa10BookingPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Book Now</title>
      </Helmet>
      <Spa10BookingPageView />
    </>
  );
}
