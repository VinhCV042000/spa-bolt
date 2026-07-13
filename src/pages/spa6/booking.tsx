import { Helmet } from 'react-helmet-async';

import { Spa6BookingPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Book Now</title>
      </Helmet>
      <Spa6BookingPageView />
    </>
  );
}
