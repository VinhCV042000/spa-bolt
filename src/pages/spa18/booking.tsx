import { Helmet } from 'react-helmet-async';

import { Spa18SubBookingPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Đặt lịch</title>
      </Helmet>
      <Spa18SubBookingPageView />
    </>
  );
}
