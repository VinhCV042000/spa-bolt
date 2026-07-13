import { Helmet } from 'react-helmet-async';

import { Spa3BookingPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Đặt lịch</title>
      </Helmet>
      <Spa3BookingPageView />
    </>
  );
}
