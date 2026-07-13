import { Helmet } from 'react-helmet-async';

import { Spa13BookingView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13BookingPage() {
  return (
    <>
      <Helmet>
        <title>Book Now — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13BookingView />
    </>
  );
}
