import { Helmet } from 'react-helmet-async';

import { Spa7SubBookingPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Đặt lịch</title>
      </Helmet>
      <Spa7SubBookingPageView />
    </>
  );
}
