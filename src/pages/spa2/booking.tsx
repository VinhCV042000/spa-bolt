import { Helmet } from 'react-helmet-async';

import { Spa2BookingPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Đặt lịch</title>
      </Helmet>
      <Spa2BookingPageView />
    </>
  );
}
