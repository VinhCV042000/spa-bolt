import { Helmet } from 'react-helmet-async';

import { Spa8BookingPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Đặt lịch online</title>
      </Helmet>
      <Spa8BookingPageView />
    </>
  );
}
