import { Helmet } from 'react-helmet-async';

import { Spa11SubBookingPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Đặt lịch</title>
      </Helmet>
      <Spa11SubBookingPageView />
    </>
  );
}
